// Checks app/data.js before it is committed. Exits non-zero on any problem.
import { readFileSync } from "node:fs";
import vm from "node:vm";

const file = new URL("../app/data.js", import.meta.url);
const ctx = { window: {} };
vm.runInNewContext(readFileSync(file, "utf8"), ctx);
const data = ctx.window.PHP2SHELL_DATA;

const STATUSES = ["offline", "maintenance", "disrupted", "recovering", "at-risk", "protected"];
const errors = [];
const fail = msg => errors.push(msg);

if (!data) fail("window.PHP2SHELL_DATA is not set");
else {
  for (const key of ["checked", "updated"]) {
    if (!/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\dZ$/.test(data[key] ?? "")) fail(`${key} must be an ISO UTC timestamp like 2026-10-22T06:00:00Z`);
  }
  if (data.updated > data.checked) fail("updated cannot be later than checked");

  for (const [key, src] of Object.entries(data.sources ?? {})) {
    if (!src.name) fail(`source "${key}" has no name`);
    if (!/^https:\/\/[^\s]+$/.test(src.url ?? "")) fail(`source "${key}" needs an https URL`);
  }

  const seen = new Set();
  (data.sites ?? []).forEach((s, i) => {
    const at = `sites[${i}] (${s.name ?? "unnamed"})`;
    for (const f of ["name", "category", "country", "status", "note", "source"]) {
      if (typeof s[f] !== "string" || !s[f].trim()) fail(`${at} is missing ${f}`);
    }
    if (typeof s.domain !== "string") fail(`${at} domain must be a string ("" if unknown)`);
    if (s.domain && !/^[a-z0-9.-]+\.[a-z]{2,}$/.test(s.domain)) fail(`${at} domain "${s.domain}" should be a bare hostname`);
    if (!STATUSES.includes(s.status)) fail(`${at} status "${s.status}" is not one of ${STATUSES.join(", ")}`);
    if (s.source && !data.sources?.[s.source]) fail(`${at} cites unknown source "${s.source}"`);
    if ("unconfirmed" in s && s.unconfirmed !== true) fail(`${at} unconfirmed should be true or omitted`);
    const id = s.name?.toLowerCase();
    if (seen.has(id)) fail(`${at} is a duplicate`);
    seen.add(id);
  });
  if (!data.sites?.length) fail("sites is empty");
}

if (errors.length) {
  console.error(errors.map(e => `✗ ${e}`).join("\n"));
  process.exit(1);
}
console.log(`✓ ${data.sites.length} sites, ${Object.keys(data.sources).length} sources, checked ${data.checked}`);
