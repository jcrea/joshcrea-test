# joshcrea-test

## PHP2Shell Impact Tracker

`app/index.html` is a self-contained web page that tracks which websites were affected by
PHP2Shell (CVE-2026-109618 and CVE-2026-109619), the critical PHP remote code execution flaws
disclosed on 21 October 2026.

- Status tallies for offline, maintenance, disrupted, recovering, at-risk and protected sites (click one to filter)
- Business category filter
- Search by company name or website address
- PHP version checker that compares a version against the patched releases (8.5.12, 8.4.27, 8.3.36, 8.2.35)

Open `app/index.html` in a browser; it needs no build step or server. The dataset is in the
`SITES` array inside the page. Every entry cites a news or vendor source and reflects reporting
from 21 October 2026, so statuses may be out of date.
