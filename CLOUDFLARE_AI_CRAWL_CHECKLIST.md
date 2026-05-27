# Cloudflare AI Crawl Checklist

If OpenAI crawlers are still blocked after `robots.txt` allows them, the block is usually from Cloudflare WAF/Bot controls rather than robots rules.

## 1) Create explicit allow rules (highest priority)
In Cloudflare WAF custom rules, add an `Allow` rule for verified OpenAI bot signals and place it above managed challenge/block rules.

Suggested expression pattern:
- Match known OpenAI crawler user agents (`GPTBot`, `OAI-SearchBot`, `ChatGPT-User`).
- Prefer Cloudflare bot verification fields when available in your plan.

## 2) Disable challenge features for crawler paths
For these paths, disable JS challenge and browser integrity checks if they are causing non-browser crawler failures:
- `/robots.txt`
- `/sitemap.xml`
- `/llms.txt`
- content pages (`/`, `/journals.html`, `/about.html`)

## 3) Rate limit by behavior, not by crawler UA
Avoid hard blocks on "unknown browser" for read-only GET traffic on public pages.

## 4) Re-test from edge
After rule changes, verify:
- `https://panorama-sg.com/robots.txt` returns `200`
- `https://panorama-sg.com/llms.txt` returns `200`
- `https://panorama-sg.com/sitemap.xml` returns `200`

## 5) Keep policy files in repo root
For static hosting behind Cloudflare, root-level files are easiest for crawlers:
- `robots.txt`
- `llms.txt`
