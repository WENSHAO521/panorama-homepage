# Legacy Repository Audit

Version 1 — Greenfield Static Rebuild Foundation. This audit covers the
legacy `panorama-sg.com` codebase as it existed at commit `6f08c31`
(the repo's `HEAD` at the start of this rebuild). Per the user's
explicit instruction, the legacy HTML/CSS/JS/data/scripts have since
been **deleted from the local working tree** (image and logo assets
were kept — see docs/ASSET-AUDIT.md) as a plain filesystem delete, not
committed or pushed. Every fact below was gathered either before that
deletion or via `git show HEAD:<path>`, so nothing here is guessed —
the legacy content remains fully recoverable from git history if ever
needed as reference.

## Existing Architecture

- **119 HTML pages.** 38 at the repository root (corporate pages,
  5 imprint pages × ~6-8 sub-pages each, 3 sitewide policy pages, plus
  `404.html`) and 9 locale-duplicate directories (`ar/ de/ es/ fr/ ja/
  ko/ ru/ zh/ zh-cn/`) holding **9 files each** (81 files) — always the
  same 9 templates (`about`, `contact`, `editorial-board-application`,
  `for-authors`, `index`, `indexing`, `open-access-policy`,
  `privacy-policy`, `publication-ethics`), never the imprint or
  journal pages. 38 + 81 = 119, confirmed via
  `git ls-tree -r HEAD --name-only`.
- **Language structure**: directory duplication, not a routing layer.
  `zh/` is Traditional Chinese and `zh-cn/` is Simplified — an
  ambiguous pairing corrected in the new site's locale codes
  (`zh-hant`/`zh-hans`, see docs/I18N.md). Only 9 of the ~30 distinct
  page templates that exist in English were ever localized.
- **JavaScript**: one 11,495-line `site.js` (hand-rolled; renders
  header, footer, nav, and parts of page content via client-side
  `innerHTML` injection) plus a separate 1,020-line `imprint-nav.js`
  for the five imprint pages' navigation.
- **CSS architecture**: five uncoordinated files with no shared token
  layer — `institutional.css` (1,482 lines), `imprint-nav.css` (467),
  `ridgeline-home.css` (316), `nexus-brand.css` (252), `input.css` (3
  lines — a Tailwind entry file whose only real output, `main.css`,
  was git-ignored and not shipped, meaning the Tailwind build script in
  `package.json` was disconnected from what the site actually served).
- **Asset directories**: `assets/` (logos, imprint marks, 4K
  wallpapers), `Homepage Image/` (7 per-journal hero photos), `QKFM/`
  (indexing/database marks, partner marks, 24 journal covers) — 83
  files, 35.49 MB total. Full detail: docs/ASSET-AUDIT.md.
- **Build system**: `package.json` had exactly two scripts —
  `tailwindcss -i ./input.css -o ./main.css --minify` (build) and
  `node scripts/generate-lang-pages.mjs` (`build:i18n`, the locale-
  duplication generator). No lint, no type-check, no test, no CI build
  gate of any kind.
- **Deployment assumptions**: no `wrangler.toml`, `_redirects`,
  `_headers`, or any other Cloudflare config file exists anywhere in
  git history — deployment was Cloudflare-Pages-dashboard-configured
  (pointing at this GitHub repo), not repo-defined. Git remote:
  `github.com/WENSHAO521/panorama-homepage`, branch `main`. Two GitHub
  Actions workflows exist (`.github/workflows/open_infra_tracker.yml`,
  `selected_recent_articles.yml`) — scheduled Playwright-based scrapers
  that write into `data/*.json`, unrelated to the site build/deploy
  itself. See docs/DEPLOYMENT.md.

## Problems

- **Duplicated pages / duplicated multilingual content.** The 9-file
  locale-directory pattern means every one of those 9 templates exists
  in 10 near-identical copies (1 English + 9 locale) that must be
  hand-edited in lockstep — a maintenance hazard the new i18n
  architecture (Astro's built-in i18n router + a single content source
  per page) eliminates by construction. See docs/I18N.md.
- **Oversized scripts.** `site.js` at 11,495 lines is a single
  monolithic file mixing routing, DOM rendering, and content data for
  the entire site — no module boundaries, so any page-content bug risks
  a whole-site regression.
- **Obsolete structures.** Five independent CSS files with no shared
  variable/token layer means the same color or spacing value is
  hand-typed in multiple places with no guarantee of consistency (the
  brief's §21 "do not spread arbitrary hex values" is exactly this
  failure mode). The new tokens.css (docs/DESIGN-SYSTEM.md) replaces
  this with one two-layer token file.
- **Hard-coded content.** Journal/imprint copy lives inline in each
  HTML file's markup rather than in structured data — the new
  `journals.json`/`imprints.json` (docs/DATA-MODEL.md) is a direct fix.
- **Inconsistent components.** No shared header/footer/nav component —
  `site.js` renders markup by string injection per page, and the five
  imprint pages additionally load a *second*, separate nav
  implementation (`imprint-nav.js`/`.css`) that doesn't share code with
  the sitewide one.
- **Dead/unclear assets.** `assets/logos/screen.png` (unclear purpose,
  no reference found anywhere in the audited HTML) and
  `assets/logos/journals-logo.svg` (223 KB — implausible for a vector
  mark, indicates embedded raster data). Both flagged in
  docs/ASSET-AUDIT.md rather than silently carried forward or dropped.
- **Accessibility risks.** No skip link, no consistent focus-visible
  treatment, and heading hierarchy correctness could not be verified
  without a page-by-page audit (out of scope for this repository audit
  — see docs/ARCHITECTURE.md §Accessibility Baseline for what the new
  foundation establishes instead).
- **SEO problems.** `input.css`'s disconnected build output
  (`main.css` never shipped) implies the site's actual visual styling
  and its declared build pipeline had already drifted apart before
  this rebuild — a sign the repository's own tooling was not being
  exercised. No canonical/hreflang strategy beyond directory placement.
- **Responsive problems.** Not independently re-verified here (the
  legacy HTML no longer exists on disk to open in a browser) — flagged
  as **Not verified** rather than assumed.
- **Maintenance risks.** Two full navigation implementations
  (`site.js` sitewide, `imprint-nav.js` for imprints) that must be kept
  in sync by hand; a build script (`tailwindcss ...`) whose output was
  git-ignored and evidently not the CSS actually served, so `npm run
  build` had stopped being a meaningful project health signal.

## Redirect / URL Audit

All 119 legacy page URLs (118 excluding `404.html`, which isn't a
redirect target) were classified 301 / 410 / review and written to
`web/src/data/redirects.json` by `scripts/build_redirects.py` — see
docs/MIGRATION.md for the counts and the classification rules.
