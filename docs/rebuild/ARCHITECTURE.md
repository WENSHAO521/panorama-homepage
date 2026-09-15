# Architecture — Round 1

## 1. What the legacy stack actually is

This matters because it's the strongest argument for a from-scratch
rebuild rather than incremental refactor, so it's worth stating
precisely instead of taking "old site, needs a redesign" on faith:

- **119 static HTML files**, hand-authored, each carrying its own full
  `<head>` (hreflang block, OG tags, JSON-LD) copy-pasted per page.
- **A single 11,495-line `site.js`** that does far more than
  progressive enhancement: it renders the header, the footer, the
  mobile nav drawer, the language switcher, search, and — on several
  pages — page body content, all via client-side `innerHTML`
  injection. `index.html`'s actual `<body>` in git HEAD is a full
  header/hero/footer markup block; on other pages, sections are
  rendered by `site.js` fetching `data/*.json` at runtime
  (`announcements.json`, `posi_stats.json`) and building DOM nodes with
  string concatenation.
- **5 separate hand-maintained CSS files** (`institutional.css` 1,482
  lines, `imprint-nav.css`, `nexus-brand.css`, `ridgeline-home.css`,
  plus a 3-line Tailwind `input.css` stub with a `tailwind.config.js`
  that appears disconnected from the shipped pages) — no shared token
  layer between them; colors and pixel values are repeated per file.
- **i18n via directory duplication**: `/ar/`, `/de/`, `/es/`, `/fr/`,
  `/ja/`, `/ko/`, `/ru/`, `/zh/`, `/zh-cn/` each hand-copy only **9 of
  the ~30 page templates** (about, contact, editorial-board-application,
  for-authors, index, indexing, open-access-policy, privacy-policy,
  publication-ethics) — full parity was never reached, and every
  string change on the English page requires manually finding and
  editing 9 duplicate files.
- **No build-time page generation**: `package.json`'s only scripts are
  a Tailwind CSS build (`tailwindcss -i input.css -o main.css`, output
  not referenced by any page) and an i18n page generator script.
  There's no SSG, no component system, no templating — every shared
  fragment (header, footer, nav) exists only as a string inside
  `site.js`, not as a file you can open and edit directly.
- **No CI/build gate**: `.github/workflows/` contains two data-fetch
  crons (`open_infra_tracker.yml`, `selected_recent_articles.yml`) that
  auto-commit JSON data updates — there is no workflow that builds,
  lints, or type-checks the site itself.

None of this is a criticism of the people who built it — it's a
reasonable shape for a site that grew page-by-page without ever
pausing to add tooling. But it is precisely the profile the project
brief asked to leave behind: zero component reuse at the file level,
zero design tokens, presentation logic trapped inside a monolithic
JS file, and an i18n strategy that can't reach full coverage by
construction. See `docs/rebuild/ROUND-1-FOUNDATION-REPORT.md` §3 for
the full discard list.

## 2. New stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Astro 7** (static output) | Content-heavy, SEO-critical, mostly-static site; ships zero JS by default; real file-based components replace the string-built header/footer/nav; islands architecture available for the few genuinely interactive widgets (search, language switcher) without hydrating the whole page. |
| Language | **TypeScript, strict mode** | `web/tsconfig.json` extends `astro/tsconfigs/strict`. Content shapes (journal, imprint, locale) get real types instead of untyped JSON blobs walked with string keys, as `site.js` does today. |
| Styling | **Plain CSS + custom properties**, no framework | See §4. Tailwind is dropped — the legacy repo already shows the failure mode (a `tailwind.config.js` and build script that don't actually wire into any shipped page) and a utility-class soup works against, not for, an editorial/typographic design language. |
| i18n | **Astro's built-in i18n router** | `astro.config.mjs` declares all 10 locales with English as the unprefixed default; see §5. |
| Content | **Astro Content Collections** (schema TBD, Round 2) | Journals, imprints, policies, and news become typed, validated content entries instead of hand-copied HTML per language. |
| Deployment | **Cloudflare Pages**, static output | No adapter needed for a static build; matches the existing `panorama-sg.com` DNS/CDN setup implied by the canonical URLs already in the legacy `<head>` blocks. No `wrangler.toml` exists yet — added when Round 4+ needs Pages Functions (e.g. a contact form) beyond pure static hosting. |
| CMS | **Deferred** (Payload CMS + PostgreSQL, per brief) | Not started in Round 1. Content model (Round 2) must exist before a CMS schema makes sense. |

Node 22.12.0 (this machine) satisfies Astro 7's `engines` requirement
(`node >=22.12.0`). One transitive dependency (`undici@8.10.2`, pulled
in by Astro's tooling) requests `>=22.19.0` and prints an `EBADENGINE`
warning; it is a non-fatal warning, not a build error, and does not
appear in `npm audit` — noted here rather than hidden, and worth a
Node bump before Round 2 to clear the noise.

### Why Astro over the alternatives

- **Next.js/Nuxt**: pulls in a full SPA-capable client runtime by
  default; this site's brief explicitly wants "least JavaScript" and
  no client-side hydration for what is fundamentally 100+ mostly-static
  documents. Fighting a React/Vue runtime back down to zero-JS is more
  work than starting from a framework that defaults to zero-JS.
- **Eleventy/plain SSG**: no first-class TypeScript component model or
  built-in i18n router; would need bolting on both, which Astro already
  ships.
- **Hand-rolled build script** (closer to what exists today, just with
  templating added): rejected — it's exactly the shape that produced
  the current 11K-line `site.js`. A real framework's opinions (file-based
  routing, typed content collections, i18n config) are the thing
  preventing the next five years of ad hoc growth the brief is trying
  to avoid.

## 3. Repository layout

The new project lives in `web/`, **alongside** the untouched legacy
static site at the repo root, not replacing it in place. This is a
deliberate Round 1 decision, not an oversight:

- The legacy site is (per its own canonical URLs and CI crons) live
  production content. Round 1's brief is foundation work, explicitly
  **not** "make the homepage" — deleting or overwriting root-level
  files before there is a real replacement would take the live site
  down for no benefit.
- Keeping `web/` separate lets `npm run build` inside it be validated
  in complete isolation from the legacy toolchain (which has its own
  unrelated `package.json`/Tailwind setup at the repo root).
- The cutover (root becomes the Astro `dist/` output, legacy files are
  retired) is scheduled explicitly as **Round 14 (Migration /
  Redirects)** in the roadmap — not implied, not silent.

```
web/
  astro.config.mjs       locales, site URL, trailing-slash policy
  tsconfig.json          strict TS, "@/*" path alias to src/
  package.json           astro, @astrojs/check, typescript
  public/
    favicon.svg           copied from legacy root (preserve)
    favicon.png           copied from legacy root (preserve)
  src/
    i18n/
      config.ts           locale table: code, BCP-47 tag, label, LTR/RTL
    layouts/
      BaseLayout.astro    <head> contract only — no header/footer/nav yet
    styles/
      tokens.css          primitive + semantic design tokens
      reset.css           modern accessibility-aware reset
      base.css            focus, skip-link, selection, RTL logical-property baseline
      typography.css      fluid type scale, font stacks, multilingual overrides
      layout.css          containers, editorial row/split primitives
      utilities.css       small, deliberately short utility set
    pages/
      index.astro          foundation-prototype landing (not the homepage)
      specimen/
        typography.astro
        color.astro
        spacing.astro
        grid.astro
```

No `src/components/` yet — there is nothing to componentize until
Round 4 (Global Shell) designs a real header/footer/nav. No
`src/content/` collections yet — that's Round 2 (Information
Architecture & Content Model), which must fix the journal/imprint/page
schema before collections can be typed correctly.

## 4. CSS architecture

Six files, loaded in this fixed order (via `BaseLayout.astro`'s
frontmatter imports, which Astro bundles per-page):

1. `reset.css` — normalizes browser defaults.
2. `tokens.css` — every primitive and semantic custom property. Two
   layers on purpose: primitives (`--p-*`, raw values) are never
   referenced outside this file; everything else (component CSS, page
   CSS, other token files) references only semantic names
   (`--surface-primary`, `--text-muted`, `--imprint-ridgeline`, …).
   This is what makes a future re-theme or accent swap a one-file edit
   instead of a grep-and-replace across the codebase — the exact
   problem `institutional.css` has today (hex values repeated inline
   throughout its 1,482 lines).
3. `base.css` — focus-visible, skip-link, selection color, logical-property
   RTL baseline. Cross-cutting, not component-specific.
4. `typography.css` — the fluid type scale and multilingual font-stack
   overrides (see `DESIGN-FOUNDATION.md` §Typography).
5. `layout.css` — the container/grid primitives (see §Grid System
   below) plus the `row`/`split`/`divider`/`stack` editorial primitives
   that stand in for a card grid.
6. `utilities.css` — intentionally small (a dozen classes). This is
   not a utility-first framework; most composition happens in
   component/page-scoped `<style>` blocks using the tokens directly.

**Token discipline**: no component or page CSS should contain a raw
hex value or an arbitrary pixel number for spacing/radius/font-size.
Every specimen page built in Round 1 follows this rule already — check
`web/src/pages/specimen/*.astro` for the pattern to continue.

## 5. Internationalisation architecture

```ts
// web/src/i18n/config.ts
locales: en (default, unprefixed), zh-hans, zh-hant, ja, ko,
         de, fr, es, ru, ar (rtl: true)
```

- **English is canonical and unprefixed** (`/about/`), matching the
  brief. Every other locale is prefixed (`/ja/about/`), configured via
  Astro's native i18n routing (`astro.config.mjs`,
  `prefixDefaultLocale: false`) rather than the legacy approach of
  fully duplicated sibling directories per language.
- **Locale metadata is a typed table**, not a set of `if (lang ===
  'ar')` string checks scattered through a 11K-line file: each locale
  carries its BCP-47 tag (for `<html lang>` and `hreflang`) and
  writing direction, so RTL is a data property (`getLocale(code).dir`)
  the layout reads once, not a class name (`html.lang-ar`) that every
  stylesheet has to know to check.
- **`zh` vs `zh-hans`/`zh-hant` naming**: the legacy site uses bare
  `/zh/` (Traditional, confirmed via its own `hreflang="zh-Hant"`
  self-reference) and `/zh-cn/` (Simplified, `hreflang="zh-Hans"`) as
  folder names. The new architecture uses `zh-hant`/`zh-hans` folder
  names directly so the URL and the BCP-47 tag agree — the legacy
  `/zh/` → Traditional mapping is exactly the kind of thing a new
  contributor gets wrong by guessing, which is reason enough to fix it
  now while there are zero pages built on the new URLs yet.
- **Coverage gap inherited as a fact, not a bug to silently fix here**:
  the legacy site only ever localized 9 of ~30 templates per language.
  Round 2's content model must decide whether every route requires
  every locale, or whether a documented fallback-to-English behavior
  per page type is acceptable — this is a content/product decision,
  not something to default silently in Round 1.
- **RTL is built in from day one**, not bolted on: `base.css` uses
  logical properties (`margin-inline`, `padding-inline`) throughout
  instead of `margin-left`/`right`, so `dir="rtl"` on `<html>` (driven
  by `getLocale(code).dir`, see `BaseLayout.astro`) requires no
  separate RTL stylesheet. `typography.css` has explicit `:root[dir='rtl']`
  overrides (drop Latin letter-spacing/tracking, adjust line-height for
  Arabic's taller glyphs) — validated live in `specimen/typography.astro`,
  which renders an actual Arabic paragraph in `dir="rtl"`.
- **No translation resource loader yet.** `BaseLayout.astro` hard-codes
  English strings ("Skip to content" etc.) — Round 11 (Multilingual
  System) is where a real string-resource mechanism (Astro i18n
  `t()`-style helper, or content-collection-backed translations) gets
  built. Round 1 only had to prove the *routing/direction/typography*
  contract holds, not ship translated content.
- **hreflang/canonical** are generated in `BaseLayout.astro` from the
  same `locales` table (one `<link rel="alternate">` per locale plus
  `x-default`), so adding an 11th locale later is a one-line change to
  `config.ts`, not a hunt through every page's hand-written `<head>`
  block the way the legacy site works today.

## 6. Accessibility strategy (baseline, Round 1)

- Skip link, real focus-visible ring (`base.css`), logical-property RTL
  support — see above.
- `prefers-reduced-motion` respected at two layers independently
  (`reset.css` zeroes animation/transition durations; `tokens.css`
  zeroes the motion duration tokens components will use) so a
  component author can't accidentally reintroduce motion by not
  reading `reset.css`.
- Semantic heading hierarchy enforced by convention in the specimens
  (`h1`→`h6` map directly to the type scale, not "any tag can look like
  an h2").
- `lang` and `dir` are set on `<html>` per-locale from real data
  (`getLocale`), not inferred from a CSS class as the legacy
  `html.lang-ja` pattern does.
- Full WCAG 2.2 AA audit (screen-reader pass, keyboard-trap check on
  interactive components, form accessibility) is deferred to Round 12
  — there are no interactive components or forms yet to audit.

## 7. SEO strategy (baseline, Round 1)

`BaseLayout.astro` establishes the contract every future page inherits:
title, meta description, canonical, full hreflang set incl.
`x-default`, Open Graph, Twitter card, and an `Organization` JSON-LD
block. Deferred to later rounds, once real content exists to describe:
`WebSite` search-action schema, `BreadcrumbList`, `Periodical`/
`ScholarlyArticle`/`Book` schema per content type (Round 2 content
model decides which page types exist before their schema can be
written correctly), and `sitemap.xml`/`robots.txt` generation (the
legacy root-level `robots.txt`/`sitemap.xml`/`generate_sitemap.py` are
reference material for this, not carried over as-is).

## 8. Performance strategy (baseline, Round 1)

- Astro static output: the 5 built pages ship **zero** page-level
  JavaScript (confirmed — `web/dist/**/*.html` contains no `<script>`
  besides the inline JSON-LD, which is `is:inline` and not a bundle).
- No client framework runtime, no hydration directives used anywhere
  yet — there is nothing on these pages that needs to be interactive.
- Google Fonts are `preconnect`-ed but not yet loaded (no `<link
  rel="stylesheet">` to a font CSS file exists yet, since font family
  choice is still provisional per `DESIGN-FOUNDATION.md`) — deliberately
  deferred rather than guessing a font URL now and re-paying a
  render-blocking request for it later when the choice changes.
- Full Lighthouse ≥95×4 measurement is deferred to Round 13 (Performance
  / QA), once there's an actual homepage to measure — a 5-route
  specimen shell will trivially score near-perfect and would not be a
  meaningful signal yet.

## 9. Deployment compatibility

Static `astro build` output (`web/dist/`) is directly Cloudflare
Pages-compatible with no adapter. No Pages project/`wrangler.toml` was
created in Round 1 — there is nothing worth deploying yet (a 5-page
token specimen), and doing so would risk confusion with the live
`panorama-sg.com` Pages deployment this repo's `origin` remote implies.
Wiring an actual preview deployment is a Round 4/5 concern once real
pages exist.
