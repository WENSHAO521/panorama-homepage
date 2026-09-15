# Architecture

Panorama Scholarly Group corporate website rebuild. This document
describes what was actually built in `web/`, not aspirational design.
Originally written for Version 1 (Greenfield Static Rebuild
Foundation); updated for Version 2 (Global Shell + Homepage) where
noted below.

## Technology stack

**Astro 7 (static output) + TypeScript strict + plain CSS custom
properties + Astro's built-in i18n router + Astro Content
Collections.** No Tailwind CSS was added: the legacy repo already had
an (unused — see docs/LEGACY-AUDIT.md) Tailwind setup, and Round 1
found no case where a utility-class framework would out-perform the
token-driven plain-CSS approach for a static, five-imprint, ten-locale
editorial site — utility classes tend to fight token discipline rather
than reinforce it. No React/Preact: nothing in Version 1 needs
client-side state. No CMS, no database, no backend — static output
only, per the project brief's hard architectural constraint (§2).

```
GitHub (source of truth)
   -> Astro build (web/)
   -> static HTML / CSS / minimal JS  (web/dist/)
   -> Cloudflare Pages
   -> panorama-sg.com
```

## Directory layout

```
web/
  src/
    components/
      ui/            Container, Section, Button, Logo, VisuallyHidden, SkipLink,
                     ExternalLink, SectionHeading (built)
      global/        Header.astro, Footer.astro (Version 2 -- the real global shell)
      navigation/    DesktopNav, MegaMenu, MobileMenu, LanguageSwitcher (Version 2)
      homepage/      Hero, InstitutionArea(s), ImprintCard/Grid, JournalCard,
                     FeaturedJournals, InfrastructureCard, ResearchInfrastructure,
                     StandardsSection (Version 2 -- see docs/HOMEPAGE.md)
      layout/ editorial/ journal/ imprint/ book/ news/
                     still reserved/empty — each has a README.md explaining what
                     belongs there and which round builds it
    scripts/
      nav-behavior.ts  ~90 lines of vanilla JS enhancing <details>/<dialog>
                       (exclusive mega menus, Escape, click-outside, sticky
                       header) -- see docs/NAVIGATION.md
    layouts/
      BaseLayout.astro      <head> contract: SEO, hreflang, JSON-LD, favicon, skip link
      PageLayout.astro      BaseLayout + heading, used by routing-architecture stub pages
      EditorialLayout.astro BaseLayout + byline/date, for news + long-form profile pages
      PolicyLayout.astro    BaseLayout + effective-date, for legal/governance pages
    pages/                  see docs/INFORMATION-ARCHITECTURE.md for the full route list
    content.config.ts       Content Collections: news, pages, policies (all empty — see docs/DATA-MODEL.md)
    content/
      news/ pages/ policies/   empty, README.md per folder
    data/
      site.ts              org facts (name, email, address) -- taken verbatim from legacy JSON-LD
      navigation.ts         single source of truth for primary/utility/footer nav
      journals.json          24 journals, real data from legacy data/journals.json
      imprints.json           5 imprints
      books.json              [] -- no legacy book records found, none fabricated
      partners.json           19 partner/indexing entries
      redirects.json         118-rule legacy-URL audit (301/410/review)
      assets-manifest.json   83-entry asset audit (see docs/ASSET-AUDIT.md)
    i18n/
      config.ts             locale table (code, BCP47, dir, isDefault) -- pre-existing, kept
      utils.ts               localizePath, hreflangAlternates helpers
      locales/*.ts            10 real UI-string dictionaries (skip link, search, language, menu, close, read more)
    lib/
      seo/                   canonicalUrl/pageTitle, organizationJsonLd
      content/                getAllJournals/getJournalBySlug/getJournalsByImprint, imprint equivalents
    styles/
      reset.css tokens.css base.css typography.css layout.css utilities.css
    types/                  Journal, Imprint, Book, Partner, NavItem, RedirectRule
  public/
    brand/psg/ brand/psg/platforms/ brand/imprints/<slug>/
    images/publishing/ images/corporate/
    journals/covers/
    partners/ indexes/ favicon/
  tests/
    _helpers.mjs           shared setup/teardown for the three scripts below
    browser-check.mjs      real-Chromium responsive/console-error QA (see §Validation below)
    interaction-check.mjs  real-Chromium pointer/keyboard interaction QA (Version 2)
    visual-qa.mjs          screenshot capture for manual visual review (Version 2)
```

Every directory under `components/` and `content/` that has no files
yet carries a `README.md` stating its purpose and which round
populates it — satisfying "every directory must have a clear purpose"
without inventing placeholder components nobody asked for yet.

## Global shell and homepage (Version 2)

`BaseLayout.astro` now renders the real `Header`/`Footer` on every
page by default (`showChrome={false}` opts a page out — used only by
the `/specimen/*` token demos, which predate the shell). Full detail:
docs/NAVIGATION.md (header/mega-menu/mobile-nav/footer architecture)
and docs/HOMEPAGE.md (homepage section-by-section, including bugs
found and fixed during real-browser visual QA).

## Legacy separation

`web/` has zero import, dependency, or reference to any legacy file.
Confirmed by:
- `web/package.json` dependencies: `astro` only; devDependencies:
  `@astrojs/check`, `playwright`, `typescript` only.
- No file under `web/src` imports anything from outside `web/`.
- The legacy HTML/CSS/JS no longer exists on the local filesystem at
  all (deleted per explicit instruction, kept in git history) — it
  cannot be imported even by accident.
- A full source-text search of `web/src` for the legacy filenames
  (`site.js`, `institutional.css`, `imprint-nav`, `nexus-brand`,
  `ridgeline-home`, `tailwind.config`) returns no matches.

## CSS architecture

Six files, loaded in a fixed order by `BaseLayout.astro`:
`reset.css`, `tokens.css`, `base.css`, `typography.css`, `layout.css`,
`utilities.css`. Two-layer token discipline: primitive tokens
(`--p-*`) hold raw values and are referenced only by semantic tokens;
every component/page references semantic tokens only
(`--surface-primary`, `--text-primary`, `--brand-primary`,
`--imprint-ridgeline`, etc.) — see docs/DESIGN-SYSTEM.md for the full
token table and rationale.

## Internationalisation

Astro's native i18n router (`astro.config.mjs`) is already configured
for all 10 locales with English unprefixed
(`routing.prefixDefaultLocale: false`). Version 1 builds pages only
for English — no other locale has translated page content yet (project
brief §16: "do not translate the entire website yet") — but the
locale table, UI-string dictionaries, hreflang generation, and RTL
(`dir="rtl"` for Arabic, driven by real locale data rather than a CSS
class) are all real and exercised by `BaseLayout.astro`. Full detail:
docs/I18N.md.

## Accessibility baseline

Real skip link (`SkipLink.astro`, localized per locale), a single
`:focus-visible` ring defined once in the token/base layer (not
reimplemented per component), semantic landmark (`<main id="main">`),
`lang`/`dir` set from the locale table rather than inferred, and
`prefers-reduced-motion` respected at the token layer
(`web/src/styles/tokens.css`). **Not verified**: a full WCAG 2.2 AA
audit (screen reader pass, keyboard-trap testing, forms) — there are
still no interactive components or forms to audit against; that's
Round 12.

## SEO baseline

`BaseLayout.astro` sets: title template, meta description, `robots`
meta (overridable per page — used by `/search/`), canonical URL, full
hreflang set (all 10 locales + `x-default`), Open Graph tags, Twitter
card, and `Organization` JSON-LD built from real org facts
(`web/src/data/site.ts`, sourced from the legacy site's own JSON-LD).
`Periodical`/`ScholarlyArticle`/`Book`/`BreadcrumbList` schema and
`sitemap.xml`/`robots.txt` generation are deliberately not built yet —
adding them now would mean fabricating schema properties for content
types that don't have real per-page data yet, which project brief §25
explicitly prohibits. Deferred to Round 12.

## Performance baseline

As of Version 2, the site ships exactly one small first-party script
(`web/src/scripts/nav-behavior.ts`, ~90 lines, no dependencies) for the
header/mobile-nav interaction described in docs/NAVIGATION.md — still
no client framework runtime, no hydration directives, no third-party
script of any kind. Fonts are now self-hosted (`@fontsource-variable/
inter` and `@fontsource-variable/source-serif-4`, weight-axis-only,
non-italic files) rather than the Version 1 placeholder
`<link rel="preconnect">`-only state — see docs/DESIGN-SYSTEM.md
§Typography for why self-hosted over a Google Fonts `<link>`, and for
the `font-display: swap` / CLS reasoning. A full Lighthouse pass is
still deferred to Round 13 (real content for journals/imprints beyond
the homepage's curated selection isn't laid out yet).

## OJS boundary and external PSG systems

`journals.panorama-sg.com` (OJS), `research.panorama-sg.com`,
`posi.panorama-sg.com`, `books.panorama-sg.com`,
`profiles.panorama-sg.com`, and `credentials.panorama-sg.com`
(the last two discovered in the legacy site's own JSON-LD `sameAs`
list, not previously documented) are independent systems. The
corporate site links to them (`web/src/data/site.ts` →
`externalSystems`, used on `/research/` and `/infrastructure/`) and
never depends on them to render its own core pages — every route in
Version 1 builds and serves from static data/content committed to this
repo. No runtime fetch to any of these systems exists anywhere in
`web/src`.

## Validation performed

```
web> npm install            -> succeeds, 0 vulnerabilities (1 non-fatal
                                EBADENGINE warning, see docs/DEPLOYMENT.md)
web> npm run build           -> astro check: 0 errors, 0 warnings, 16 hints (ts(6385)
                                "'z' is deprecated" notices from astro:content's
                                re-exported zod -- informational, not a defect)
                                astro build: 53 pages built
web> npm run test:browser     -> real Chromium (see note below), 20 routes;
                                homepage swept at all of 320/360/390/430/768/
                                1024/1280/1440/1728/1920px, every other route
                                at 390/768/1440 = 67 checks: PASS -- no
                                navigation errors, no HTTP >= 400, no
                                horizontal overflow, no console/page errors
web> npm run test:interaction -> real Chromium, 31 checks: desktop mega-menu
                                open/close/click-outside/Escape/keyboard/
                                exclusivity, language selector open + href
                                correctness, mobile nav open/nested-accordion/
                                close, homepage error/overflow check, every
                                footer link resolving (<400): all PASS
```

**Browser QA note**: this machine has a Playwright Chromium build
cached from a different project/version than the one pinned in
`web/package.json`, and `npx playwright install` cannot reach
`cdn.playwright.dev` from this network (request timeout — the same
restriction Round 1 hit in its sandbox). `web/tests/browser-check.mjs`
falls back to the cached build automatically (logs which executable it
used) rather than skip real-browser verification. This is a real
Chromium process actually rendering each page, not a static-HTML
heuristic — the only caveat is a version mismatch between that cached
build and the repo's pinned Playwright version, which does not affect
the validity of the layout/overflow/console-error checks it ran.

## Deployment

See docs/DEPLOYMENT.md.
