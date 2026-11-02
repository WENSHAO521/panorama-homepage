# Site data feeds (articles and announcements)

The homepage, `/news/` and the search catalogue read two committed JSON files:

| File | Script | Sources |
| --- | --- | --- |
| `web/src/data/articles.json` | `web/scripts/fetch-articles.mjs` | each journal's OAI-PMH endpoint, `https://journals.panorama-sg.com/{journal}/oai` |
| `web/src/data/announcements.json` | `web/scripts/fetch-announcements.mjs` | research. and posi. announcements, the books. notice banner, each journal's OJS announcements (Atom feed, then list HTML, then headless browser) |

`.github/workflows/weekly-site-data.yml` runs both every Monday at 02:10 UTC
(and on demand from the Actions tab), commits changed files to `main`, and
then fails the run if any source was blocked or errored.

## Behaviour

- **Nothing new, no commit.** A file is rewritten only when its content
  changes; `generatedAt` alone no longer produces a commit.
- **A failed source keeps its old data.** A journal whose OAI or
  announcements could not be read keeps its previous entries until the next
  good run, so one blocked host never empties a section of the site.
- **Failures are visible.** Each script appends unreadable sources to the
  file named by `SITE_DATA_REPORT`. The last workflow step lists them in the
  run summary and turns the run red when there is at least one. Journals that
  simply have no articles or announcements yet are not failures.
- **OAI errors are detected.** `<error code="noRecordsMatch">` counts as an
  empty journal; any other OAI error code is a failure.

## Cloudflare bot pass

The `panorama-sg.com` hosts sit behind Cloudflare, which started serving the
"Just a moment..." challenge (HTTP 403) to GitHub Actions runners in the run of
2026-10-26. From then until this fix, articles stayed at the 2026-10-19 harvest
and only the research. announcements refreshed.

When the `SITE_DATA_BOT_TOKEN` secret is set, the scripts send
`X-Panorama-Bot: <token>` on every request to a `panorama-sg.com` host (plain
`fetch` and the Playwright browser alike) and to no other host. A Cloudflare
rule lets requests carrying that header skip the challenge.

### Setup

1. Generate a long random token, e.g. `openssl rand -hex 32`.
2. GitHub: *Settings → Secrets and variables → Actions → New repository
   secret*, name `SITE_DATA_BOT_TOKEN`, value the token.
3. Cloudflare, zone `panorama-sg.com`: *Security → Security rules → Create
   rule → Custom rule*.
   - Name: `Site data bot pass`
   - Expression:
     `any(http.request.headers["x-panorama-bot"][*] eq "<token>")`
   - Action: **Skip** — all remaining custom rules, rate limiting rules,
     managed rules and Super Bot Fight Mode rules; under more components also
     Browser Integrity Check, Security Level, User Agent Blocking and Zone
     Lockdown.
   - Place it first in the list and deploy.
4. If the zone is on the Free plan with **Bot Fight Mode** on, no rule can
   skip it. Check *Security → Events* for one of the challenged requests: if
   the service is Bot Fight Mode, turn it off (*Security → Bots*) or move to a
   plan with Super Bot Fight Mode, which the rule above can skip.
5. Run *Actions → Weekly scholarly site data refresh → Run workflow*. A green
   run whose summary says "All sources harvested" confirms the pass works.

Rotate the token by updating the secret and the rule expression together.
