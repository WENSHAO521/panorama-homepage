# OAI Crawl Notes (Panorama + External Journals)

For Panorama-owned journals, use **BASE-style single endpoint harvesting** by default (lowest CF surface):
- Endpoint: `https://journals.panorama-sg.com/index.php/index/oai`
- Use `set=<journal_slug>` per request

## Recommended command (Panorama)
```powershell
./scripts/fetch-selected-recent-articles.ps1 \
  -BaseUrl "https://journals.panorama-sg.com/index.php" \
  -JournalSlugs @("AFS","CSGS","HealthNexus") \
  -RequestDelaySeconds 6
```

The script now supports `-HarvestMode base|set|endpoint`:
- `base` (default): one request flow against `index/oai`, then in-script filter by journal slug/set.
- `set`: `index/oai` with `set=<slug>` per journal.
- `endpoint`: legacy per-journal `/$slug/oai`.

## External journal runtime options
Both scripts support:
- `-UserAgent`
- `-Referer`
- `-Cookie`

Example:
```powershell
./scripts/fetch-selected-recent-articles.ps1 \
  -OaiEndpoint "https://example-journal.org/index.php/index/oai" \
  -JournalSlugs @("journalA") \
  -UserAgent "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" \
  -Referer "https://example-journal.org/" \
  -Cookie "cf_clearance=..."
```

## Important
- Respect target site Terms of Use and robots policies.
- Prefer official APIs/OAI endpoints whenever available.
- Keep request delay enabled to avoid triggering anti-bot rules.


Example (explicit BASE mode):
```powershell
./scripts/fetch-selected-recent-articles.ps1 -HarvestMode base -OaiEndpoint "https://journals.panorama-sg.com/index.php/index/oai"
```
