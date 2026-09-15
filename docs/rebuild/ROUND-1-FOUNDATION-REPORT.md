# ROUND 1 — Greenfield Foundation Report

Panorama Scholarly Group (PSG) website rebuild. This round establishes
foundation only: repository audit, asset preservation, and a new
Astro/TypeScript technical + design foundation. No page design, no
header/footer/nav, no homepage. Full detail lives in the companion
documents; this report is the entry point and the audit trail.

Companion documents: [`ASSET-PRESERVATION.md`](./ASSET-PRESERVATION.md) ·
[`ARCHITECTURE.md`](./ARCHITECTURE.md) ·
[`DESIGN-FOUNDATION.md`](./DESIGN-FOUNDATION.md) ·
[`ROADMAP.md`](./ROADMAP.md) · [`../../assets-manifest.json`](../../assets-manifest.json)

## 1. Executive Summary

The legacy `panorama-sg.com` codebase is 119 static HTML files sharing
a single 11,495-line hand-rolled `site.js` that renders header, footer,
navigation, and parts of page content via client-side `innerHTML`
injection, styled by five uncoordinated CSS files with no shared token
layer, and localized via directory duplication that only ever reached
9 of ~30 templates per language. This is a reasonable outcome for a
site that grew page-by-page, but it is exactly the profile this
rebuild's brief asked to leave behind.

Round 1 did not modify, restyle, or refactor any of that legacy
code. Instead it: (a) audited and classified the entire repository
into Preserve / Reference / Discard; (b) inventoried all 83 real
asset files into a generated, re-runnable manifest with per-file
preserve/review/archive/reject status; (c) stood up a brand-new Astro
7 + TypeScript-strict project in `web/` with zero legacy CSS/JS/component
dependency; (d) built a complete design-token, typography, layout, and
i18n/RTL foundation, proven live in four specimen pages plus a
foundation-prototype landing page; (e) validated the result with a
clean `npm run build` (0 errors, 0 warnings, 0 hints, 0 npm audit
vulnerabilities) and live HTTP checks against the built output.

One important finding surfaced during the audit and is carried as
**Risk R1** below: the working tree contains a large uncommitted
change (119 files, ~42,600 lines removed) that predates this session
and strips every legacy page's `<body>` down to just its `<img>` tags.
It was not made by this round's work, was not relied on for any Round 1
deliverable, and was not reverted or committed — it needs the user's
decision before Round 2 proceeds.

## 2. Current Repository Audit

See `ARCHITECTURE.md` §1 for the full technical breakdown. Headline
facts:

- 119 HTML pages, 5 CSS files (1,482 + 467 + 252 + 316 + 3 lines), one
  11,495-line `site.js`, no build/template system.
- i18n via 9 sibling directories (`ar/ de/ es/ fr/ ja/ ko/ ru/ zh/
  zh-cn/`), each holding only 9 of ~30 page templates.
- `package.json` has two scripts (Tailwind build, i18n page generator);
  no lint, no type-check, no test, no CI build gate. `.github/workflows/`
  holds only two data-fetch crons.
- Asset directories: `assets/` (logos, imprint marks, wallpapers),
  `Homepage Image/` (per-journal hero photos), `QKFM/` (indexer marks,
  journal covers, partner logos) — 83 files, 35.49 MB total.
- Git remote: `github.com/WENSHAO521/panorama-homepage`, branch `main`.
  No `wrangler.toml`/Cloudflare Pages config present in-repo (implies
  dashboard-configured deployment).

## 3. Preserve / Reference / Discard Matrix

| Category | Contents | Disposition |
|---|---|---|
| **Preserve** | PSG wordmark & logo (`QKFM/panorama-scholarly-group-uppercase-wordmark-4k.svg`, `assets/logos/*`), 5 imprint logos (`assets/nexus/*`), favicons, third-party indexer marks (Crossref, DOI Foundation, etc. — with their own brand-guideline caveat), partner marks (Taoist Association of Korea, library-logo) | Carried forward unchanged. See `ASSET-PRESERVATION.md`. |
| **Reference only** | `data/*.json` (journals, announcements, articles, POSI stats), legacy HTML body text/copy, organisation facts (Hong Kong registered address, contact email, sub-brand scope descriptions), existing URL structure, `robots.txt`/`sitemap.xml`/`generate_sitemap.py` | Read for Round 2 content modeling; not carried over as code or markup. |
| **Discard** | All 5 legacy CSS files, `site.js` in full, `imprint-nav.js`, every HTML file's markup/structure, the Tailwind setup (`tailwind.config.js`, `input.css` — disconnected from shipped output already), the directory-duplication i18n mechanism, `manifest.json`'s theme color (`#CC0000`, not part of the new palette) | Zero of this is imported, referenced, or extended by `web/`. Not yet deleted from disk — see §17 and Round 14. |
| **Review (assets)** | 4K imprint wallpapers, per-journal homepage photography, 24 journal-cover graphics, 1 editorial stock photo — see `ASSET-PRESERVATION.md` | Usable pending licensing confirmation, re-encoding, and/or an art-direction fit decision (Round 3). |
| **Reject** | `QKFM/Taoist Association of Korea.png` (exact duplicate of `assets/logos/taoist-association-korea-logo.png`) | Do not carry forward; keep the `assets/logos/` copy as canonical. |

## 4. Asset Inventory

Generated by [`scripts/build_assets_manifest.py`](../../scripts/build_assets_manifest.py)
into [`assets-manifest.json`](../../assets-manifest.json) (repo root).
Read-only script — no original file was moved, renamed, or deleted.

| Status | Count |
|---|---|
| preserve | 42 |
| review | 40 |
| archive | 0 |
| reject | 1 |
| **Total** | **83 files, 35.49 MB** |

Two items specifically flagged for follow-up: `assets/logos/journals-logo.svg`
(223 KB — implausibly large for a vector mark, likely embedded raster
data) and `assets/logos/screen.png` (unclear purpose, unconfirmed
usage). Full per-file detail in `ASSET-PRESERVATION.md`.

## 5. Technology Decision

**Astro 7 (static output) + TypeScript strict + plain CSS custom
properties + Astro's built-in i18n router**, deployed to Cloudflare
Pages as a static build. Full rationale, including why Next.js/Nuxt
and a hand-rolled build script were both rejected, in `ARCHITECTURE.md`
§2. CMS (Payload + PostgreSQL, per brief) is explicitly deferred — no
content model exists yet for a CMS schema to serve.

## 6. Architecture Decision

New project lives in `web/`, alongside the untouched legacy static
site at the repo root — not replacing it in place. Rationale (the
legacy site is live production content; deleting it before a real
replacement exists would take the site down for nothing) and the
planned cutover point (Round 14) are in `ARCHITECTURE.md` §3. Full
directory layout also in `ARCHITECTURE.md` §3.

## 7. CSS Architecture

Six files (`reset.css`, `tokens.css`, `base.css`, `typography.css`,
`layout.css`, `utilities.css`), loaded in that fixed order via
`BaseLayout.astro`. Two-layer token discipline (primitive `--p-*`
values, referenced only by semantic tokens; everything else references
semantic tokens only) so a future re-theme is a one-file edit. Detail
in `ARCHITECTURE.md` §4.

## 8. Design Token Architecture

Primitive tokens for color, spacing (4px base scale), radius (5-step,
buttons through feature images, pill reserved for tags/status),
border-width, motion (respecting `prefers-reduced-motion`), z-index,
and three independent container widths. Semantic tokens layer surface,
text, border, brand, interactive, and imprint-accent roles on top.
Full token file: `web/src/styles/tokens.css`. Full rationale and WCAG
contrast validation: `DESIGN-FOUNDATION.md` §3.

## 9. Grid System

Two independent width systems on purpose — `.container-wide` (max
1440px, layout) and `.container-reading` (max 68ch, prose) are never
conflated, plus `.container-narrow` (720px) and `.container-full-bleed`
(100vw). No mechanical 12-column import; asymmetric composition via
content-driven `.split`/`.stack` primitives instead. Reference
breakpoints: 390 / 768 / 1024 / 1440 / 1728+. Full detail and rationale
for rejecting a Bootstrap-style grid: `DESIGN-FOUNDATION.md` §5.

## 10. Typography Strategy

Provisional direction: Source Serif 4 (display/editorial) + Inter
(interface/body), both open-licensed variable fonts. Full multilingual
evaluation table (Latin, Cyrillic, Simplified/Traditional Chinese,
Japanese, Korean, Arabic) with per-script family overrides and tracking
rules, fluid 12-step `clamp()` type scale, loading-strategy plan (not
yet implemented — deliberately deferred pending Round 3 weight
finalization), and licensing confirmation: `DESIGN-FOUNDATION.md` §2.
Live proof, including a worst-case long academic title, German
compounds, Simplified Chinese, and Arabic RTL body copy: `web/src/pages/specimen/typography.astro`.

## 11. Colour Strategy

New semantic palette (Warm Paper / Midnight Navy / Ink / Academic Blue
/ Deep Teal / Muted Stone / restrained Gold), independently derived —
not a recolor of the legacy forest-green/gold system. Full WCAG 2.2 AA
contrast table (every pairing computed via relative-luminance formula,
not eyeballed) and the two-token gold-accent split (AA-safe small-text
variant vs. large-text/decorative-only variant) in
`DESIGN-FOUNDATION.md` §3. Five imprint accents, each independently
contrast-validated, in the same section. Live proof:
`web/src/pages/specimen/color.astro`.

## 12. Internationalisation Strategy

Astro native i18n routing, English canonical/unprefixed, 9 other
locales prefixed, RTL (Arabic) built into the type/layout layer from
day one via logical CSS properties rather than a bolt-on RTL
stylesheet. Locale metadata is a typed table (`web/src/i18n/config.ts`),
not string checks scattered through JS. `zh-hans`/`zh-hant` folder
naming corrects the legacy site's ambiguous bare `/zh/` (Traditional)
vs. `/zh-cn/` (Simplified) scheme. Coverage-gap decision (legacy only
localized 9/30 templates) explicitly deferred to Round 2 as a
content/product decision, not silently resolved here. Full detail:
`ARCHITECTURE.md` §5.

## 13. Accessibility Baseline

Skip link, real `:focus-visible` ring (single source of truth, no
per-component reimplementation), `prefers-reduced-motion` respected at
both the reset layer and the token layer independently, semantic
heading hierarchy in the specimens, `lang`/`dir` set from real locale
data rather than inferred from a CSS class. Full WCAG 2.2 AA audit
(screen reader, keyboard traps, forms) explicitly deferred to Round 12
— there are no interactive components or forms yet to audit against.
Detail: `ARCHITECTURE.md` §6.

## 14. SEO Baseline

`BaseLayout.astro` establishes title template, meta description,
canonical, full hreflang set (all 10 locales + `x-default`), Open
Graph, Twitter card, and `Organization` JSON-LD. `WebSite`/`BreadcrumbList`/
per-content-type schema (`Periodical`, `ScholarlyArticle`, `Book`) and
sitemap generation are deferred until Round 2's content model defines
what page types actually exist. Detail: `ARCHITECTURE.md` §7.

## 15. Performance Baseline

Confirmed zero page-level JavaScript in the built output (`web/dist/**/*.html`
has no bundled `<script>` — only an `is:inline` JSON-LD block). No
client framework runtime, no hydration directives used. Font loading
deliberately not wired up yet (avoids paying a render-blocking cost for
a family/weight choice that's still provisional). Full Lighthouse
measurement deferred to Round 13, once real pages exist to measure —
scoring a 5-route token specimen would not be a meaningful signal.
Detail: `ARCHITECTURE.md` §8.

## 16. Risks

- **R1 — Uncommitted working-tree state predating this session
  (unresolved, needs user decision).** All 119 legacy HTML files carry
  an uncommitted modification (`git status`/`git diff` confirm; file
  mtimes cluster within ~13 minutes of each other, same day as this
  session) that reduces every page's `<body>` to only its `<img>`
  tags — a ~42,600-line net removal. This was **not** made by this
  round's work: Round 1 never wrote to any legacy HTML file. It may be
  intentional prep the user (or a script) ran before this conversation
  started, or it may be accidental. It was **not** committed or
  reverted here — the original content is still fully recoverable via
  `git show HEAD:<file>` or `git checkout -- <file>` since nothing is
  staged or committed. **Action needed**: confirm intent, then either
  commit it (if deliberate) or restore it (`git checkout -- .` for
  tracked HTML files) before Round 2, which needs trustworthy legacy
  page content as reference material.
- **R2 — Font choice still provisional.** Shipping Source Serif 4 +
  Inter without Round 3 sign-off risks a rework if the design system
  round finds a fit problem against real imprint logos/covers.
- **R3 — Imprint accent colors unvalidated against real logos.** The
  five accents pass WCAG in isolation but haven't been placed next to
  `assets/nexus/*.svg` yet to check for hue clash.
- **R4 — Heavy legacy imagery (wallpapers, homepage photos, journal
  covers) has no confirmed licensing chain-of-custody.** Flagged
  `review`, not `preserve`, specifically because reuse without that
  confirmation is a legal, not just technical, risk.
- **R5 — `EBADENGINE` warning** from a transitive dependency
  (`undici@8.10.2` wants Node ≥22.19.0; this machine runs 22.12.0).
  Non-fatal today; worth a Node bump before it becomes fatal in a later
  Astro/tooling update.
- **R6 — No real-browser responsive verification.** See §18 — the
  sandbox's network egress blocks the Playwright browser-binary CDN,
  so 390/768/1024/1440/1728/1920 were checked by static CSS audit and
  HTTP response, not actual rendered screenshots.

## 17. Technical Debt Removed

Nothing was deleted from disk in Round 1 (per the brief's "audit
first, don't delete first" instruction) — so precisely: **zero lines
of legacy CSS/JS were imported into the new project**, meaning the
debt is architecturally excluded going forward even though it still
physically exists on disk pending Round 14's migration/cutover. The
new `web/` project has no dependency, import, or reference to
`institutional.css`, `site.js`, `imprint-nav.js/css`, `nexus-brand.css`,
`ridgeline-home.css`, `input.css`, or `tailwind.config.js` — confirmed
by `web/package.json`'s dependency list (`astro`, `@astrojs/check`,
`typescript` only) and by every specimen page's frontmatter imports.

## 18. Decisions Still Requiring Approval

1. **Resolve R1** (uncommitted legacy working-tree state) before Round
   2 begins.
2. Confirm Source Serif 4 / Inter as final type families, or flag
   alternatives to evaluate in Round 3.
3. Confirm the five provisional imprint accent colors, or request
   different hues before they're load-bearing in Round 3+ components.
4. Decide the i18n coverage policy for Round 11 (does every route need
   every locale, or is a documented per-page-type fallback acceptable).
5. Decide the fate of the four "review" photography categories in
   `ASSET-PRESERVATION.md` (wallpapers, homepage photos, journal
   covers, editorial stock) — keep-and-re-encode vs. retire, pending
   licensing confirmation either way.
6. Confirm Cloudflare Pages as the deployment target (implied by the
   existing domain setup, not yet explicitly re-confirmed for this
   rebuild).

## 19. Round 2 Handoff

Round 2 (Information Architecture & Content Model) can start once
Decision 1 above (§18) is resolved. It should consume, as reference
material only: `data/*.json` (journals, announcements, articles, POSI
stats), the legacy page inventory (119 files, listed in §2), and the
organisation facts embedded in the legacy `<head>` JSON-LD blocks
(registered address, sameAs URLs for the other PSG properties). It
should produce: Astro Content Collection schemas for every page type,
and the i18n-coverage decision from §18.4. It should **not** yet
produce any rendered page — that starts at Round 5.

## 20. 10+ Round Rebuild Roadmap

See [`ROADMAP.md`](./ROADMAP.md) for the full 15-round plan with
per-round done-criteria and sequencing rationale. Summary:

1. Greenfield Foundation *(this round)* · 2. Information Architecture
& Content Model · 3. Design System · 4. Global Shell · 5. Homepage ·
6. Publishing/Journals/Imprints · 7. Books · 8. Research Institute ·
9. Infrastructure/POSI/Standards · 10. About/Partnerships/News/Policies
· 11. Multilingual System · 12. SEO/Structured Data/Accessibility ·
13. Performance/QA/Responsive Testing · 14. Migration/Redirects ·
15. Production Release Gate.

---

## Validation Results (supporting detail for §15/§16)

```
web> npm install          → 0 vulnerabilities (after pinning astro@^7.3.2,
                              which patches 10 advisories present in the
                              initially-scaffolded 5.x line)
web> npm run build         → astro check: 0 errors, 0 warnings, 0 hints
                              astro build: 5 pages built in 857ms
                              output: static, web/dist/
web> npm run preview        → all 5 routes (/,  /specimen/typography/,
                              /specimen/color/, /specimen/spacing/,
                              /specimen/grid/) return HTTP 200
static audit of web/dist/   → no hard-coded widths/min-widths ≥300px that
                              could overflow at the 390px reference width;
                              viewport meta present
```

**Not completed**: rendered-browser screenshots at 390/768/1024/1440/
1728/1920. Playwright's browser-binary download (`cdn.playwright.dev`)
timed out in this sandbox, whose network egress appears limited to the
npm registry. This is reported as incomplete, not papered over — see
Risk R6. Recommended before Round 2 sign-off: run `npx playwright
install chromium` and a real responsive check from an environment with
open network egress, or open `web/dist/` in an actual browser and
resize manually.
