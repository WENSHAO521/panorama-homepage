# External Journal Crawl (Cloudflare) Notes

When crawling **other publishers' journals**, the fix is in the crawler request profile (not this website's `robots.txt`).

## Recommended runtime options
Both scripts now support:
- `-UserAgent`
- `-Referer`
- `-Cookie`

Example:
```powershell
./scripts/fetch-journal-descriptions.ps1 \
  -UserAgent "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" \
  -Referer "https://www.google.com/" \
  -Cookie "cf_clearance=..."
```

```powershell
./scripts/fetch-selected-recent-articles.ps1 \
  -BaseUrl "https://example-journal.org/index.php" \
  -UserAgent "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" \
  -Referer "https://example-journal.org/" \
  -Cookie "cf_clearance=..."
```

## Important
- Respect target site Terms of Use and robots policies.
- Prefer official APIs/OAI endpoints whenever available.
- Keep request delay enabled to avoid triggering anti-bot rules.
