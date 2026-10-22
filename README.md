# joshcrea-test

## PHP2Shell Impact Tracker

`app/index.html` is a self-contained web page that tracks which websites were affected by
PHP2Shell (CVE-2026-109618 and CVE-2026-109619), the critical PHP remote code execution flaws
disclosed on 21 October 2026.

- Status tallies for offline, maintenance, disrupted, recovering, at-risk and protected sites (click one to filter)
- Business category filter
- Search by company name or website address
- PHP version checker that compares a version against the patched releases (8.5.12, 8.4.27, 8.3.36, 8.2.35)

Open `app/index.html` in a browser; it needs no build step or server.

### Keeping it current

The dataset lives in `app/data.js`. Every entry cites a news or vendor source. A scheduled Claude
session rechecks the news every 6 hours, updates the data, validates it, commits to `master`,
and republishes the shared claude.ai copy. The page shows when the data was last checked and
last changed.

- `app/UPDATING.md`: the steps and sourcing rules each update follows
- `scripts/validate-data.mjs`: run `node scripts/validate-data.mjs` before committing data changes
- `scripts/build-artifact.py`: builds the claude.ai copy of the page
