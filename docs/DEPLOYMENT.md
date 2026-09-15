# Deployment

## What exists today (legacy, documented not assumed)

No `wrangler.toml`, `_redirects`, `_headers`, or any other Cloudflare
config file exists anywhere in this repository's git history —
confirmed by searching `git ls-tree -r HEAD --name-only` for those
filenames. This means the legacy site's Cloudflare Pages deployment
was **dashboard-configured** (a Cloudflare Pages project pointed at
`github.com/WENSHAO521/panorama-homepage`, branch `main`, presumably
with a build command and output directory set in the Cloudflare UI,
not in-repo). The exact build command/output directory Cloudflare was
using could not be determined from the repository alone —
**Not verified**.

Two GitHub Actions workflows exist (`.github/workflows/`) — both are
scheduled Playwright/Python scrapers that write into `data/*.json`
(POSI stats, recent articles); neither builds or deploys the site.

## What Version 1 establishes

```
GitHub (github.com/WENSHAO521/panorama-homepage, branch main)
   -> cd web && npm install && npm run build
   -> web/dist/  (static HTML/CSS, zero page-level JS beyond one
                  is:inline JSON-LD script per page)
   -> Cloudflare Pages (static asset hosting)
   -> panorama-sg.com
```

`web/` is a self-contained Astro project:

```
web> npm run build     # astro check && astro build -> web/dist/
web> npm run preview    # serves web/dist/ locally for smoke-testing
web> npm run check      # astro check only (type-check, no build)
web> npm run test:browser  # real-Chromium responsive/console QA (see docs/ARCHITECTURE.md)
```

No backend, no database, no server runtime is required to serve
`web/dist/` — it is plain static files, satisfying the project brief's
hard architectural constraint (§2) and the "core pages must remain
available even if OJS/research/APIs are offline" requirement (§4):
nothing in `web/dist/` makes a runtime fetch to anything.

## Recommended Cloudflare Pages configuration (not yet applied)

- **Root directory**: `web/`
- **Build command**: `npm install && npm run build`
- **Output directory**: `web/dist`
- **Node version**: pin explicitly (see Risks below)

This is a recommendation for Round 14 to apply via the Cloudflare
dashboard or an in-repo `wrangler.toml`, matching the existing
dashboard-configured pattern unless the user prefers to move
configuration into git (the latter would be more consistent with "GitHub
is the source of truth", project brief §2, and is worth raising as a
decision rather than assuming).

## Risks / open items

- **Node version pin.** This machine runs Node v22.12.0; one
  transitive dependency (`undici`, pulled in by Astro's tooling) warns
  it wants Node ≥22.19.0 (`EBADENGINE`). Non-fatal today (`npm install`
  and `npm run build` both succeed), but should be resolved — either
  bump the local/CI Node version or confirm Cloudflare Pages' build
  image already satisfies it — before it becomes a hard failure in a
  future Astro/tooling update.
- **Redirect mechanism not yet chosen or applied** — see
  docs/MIGRATION.md. Cutting over DNS/Cloudflare Pages to `web/dist/`
  before that is resolved would 404 every legacy URL with a `301`
  classification, let alone the 49 still `review`.
- **Legacy repository root vs. `web/` root.** The legacy site's config
  implied the repository root was the Cloudflare Pages build root.
  Round 14's Cloudflare config change (root directory → `web/`) is a
  deployment-configuration change that needs to happen in the same
  cutover window as the redirect rules, not before (or the old site
  goes down with no redirects in place) and not long after (or the new
  `web/dist/` sits built but unpublished).
- **This deployment was not actually performed** as part of Version 1
  — no Cloudflare account access exists in this environment. Everything
  in this document above the "Risks" heading is either a verified local
  build fact or an explicit recommendation, never a claim that
  deployment happened.
