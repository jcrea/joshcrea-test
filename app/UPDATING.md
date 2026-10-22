# Updating the tracker

A scheduled Claude session follows these steps every 6 hours. A person can follow them too.

All data lives in `app/data.js`. Change the page itself (`app/index.html`) only when the data needs a field it doesn't have yet.

## 1. Research

Search the news for PHP2Shell (CVE-2026-109618, CVE-2026-109619) developments since the `checked` timestamp in `app/data.js`. Look for:

- Organisations that took sites offline, entered maintenance, or had services disrupted
- Organisations listed here that are back online, patched, or now protected
- Hosts, platforms and software newly reported as exploitable, patched or shielded
- Confirmed breaches or active exploitation of named organisations
- Changes to the patched PHP versions or official guidance

## 2. Rules for entries

- **Every change needs a source.** Add the article to `sources` (short key, outlet name, https URL), then cite that key. Never add or change an entry from memory or guesswork.
- **Use the reported status, not an inferred one.** If an outlet says a site is back, mark it `protected` only if it is also reported as patched. Otherwise use `recovering`.
- **Mark single-source or unconfirmed claims** with `"unconfirmed": true` and say why in the note. Remove the flag once a second outlet confirms the claim.
- **Never name a specific organisation as breached or vulnerable** unless a source says so. "At risk" is for software, platforms and groups named in advisories.
- **Don't delete entries.** Update the status and note instead, so people searching for a company still find it.
- Keep notes to one or two plain sentences and include the date when it matters ("Back online 23 Oct after patching.").
- Reuse the existing categories where possible. Add a new one only when nothing fits.

Statuses: `offline`, `maintenance`, `disrupted`, `recovering`, `at-risk`, `protected`.

## 3. Timestamps

- Set `checked` to the current UTC time on every run, even when nothing else changed.
- Set `updated` to the current UTC time only when an entry or source changed.

## 4. Validate and publish

```sh
node scripts/validate-data.mjs
```

Fix every error it reports before committing. Then:

1. Commit `app/data.js` (and any other changed files) to `master` and push. Summarise the changes in the commit message, e.g. "Tracker update: 3 sites back online, 2 added".
2. Rebuild the artifact copy and republish it to https://claude.ai/artifact/4gGDQyZUaMinZztfkuYz1L:

   ```sh
   python3 scripts/build-artifact.py /path/to/scratch/php2shell-tracker.html
   ```

   Publish that file to the artifact URL with `app/data.js` attached as `data.js`.
