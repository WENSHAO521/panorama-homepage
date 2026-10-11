# Design System Foundation

Version 1 established the token system and base components (no
homepage, header, footer, or mega menu design yet). Version 2 (Global
Shell + Homepage) added shadow tokens, real self-hosted fonts, and the
production Header/Footer/homepage components — both are reflected
below. Full rationale and the WCAG contrast math behind the original
values lives in `docs/rebuild/DESIGN-FOUNDATION.md` (Round 1's original
working notes); this document is the current, authoritative summary.

## Token architecture

`web/src/styles/tokens.css`, two layers by design:

1. **Primitive** (`--p-*`) — raw values. Never referenced directly by
   a component or page.
2. **Semantic** (`--surface-*`, `--text-*`, `--border-*`, `--brand-*`,
   `--interactive-*`, `--imprint-*`) — meaning-based aliases; every
   component/page references these only. A future re-theme is a
   one-file edit.

| Domain | Primitive examples | Semantic examples |
|---|---|---|
| Colour | `--p-paper-50`, `--p-navy-950`, `--p-blue-600`, `--p-gold-500/700` | `--surface-primary`, `--text-primary`, `--brand-primary`, `--interactive-default` |
| Spacing (4px base) | `--p-space-0` … `--p-space-11` (0 to 160px) | *(no separate semantic layer — spacing rarely needs re-mapping; components use `--p-space-*` directly, consistent with the existing codebase)* |
| Radius | `--p-radius-button` 10px, `--p-radius-surface` 12px, `--p-radius-card` 16px, `--p-radius-feature` 24px, `--p-radius-pill` 999px (tags/status only) | — |
| Border | `--p-border-hairline` 1px, `--p-border-strong` 2px | `--border-subtle`, `--border-strong` |
| Motion | `--p-duration-fast/base/slow`, `--p-ease-standard/decelerate` | forced to 0ms under `prefers-reduced-motion: reduce` |
| Z-index | `--p-z-base` … `--p-z-skip-link` (0 to 1000) | — |
| Layout | `--p-measure-reading` 68ch, `--p-container-narrow/wide/max/ultra` | `.container-reading` / `.container-wide` / `.container-narrow` / `.container-full-bleed` |
| Shadow (Version 2) | `--p-shadow-sm`, `--p-shadow-md` — two shadows, site-wide, deliberately restrained per §Shadows below | `--shadow-raised` (sticky header, open dropdown panels), `--shadow-overlay` (reserved; not currently used) |

Shape values match the brief's requested scale exactly (small 8-ish →
`--p-radius-button` 10px is the closest functional analogue used for
buttons; surface 12px, card 16px, large-container 20–24px →
`--p-radius-feature` 24px). No pill-shaped elements outside tags/status
labels.

## Colour

### Japanese Editorial Minimalism (current)

Warm, restrained, low-chroma. Kinari (unbleached silk) is the canvas,
Unohana the card stock, Fukamidori (deep green) the single group brand
hue, with Kincha gold for rules and ornaments only. Primitives live in
`web/src/styles/tokens.css`; components reference semantic tokens only.
The legacy primitive names (`--p-navy-*`, `--p-tetsu-*`, `--p-teal-*`,
`--p-blue-*`, `--p-biwa-*`) are kept as aliases onto the new palette so
older selectors cannot re-introduce retired hues.

| Role | Value | Semantic token | Contrast |
|---|---|---|---|
| Page background | `#F6F3EA` | `--surface-primary` | — |
| Card background | `#FCFBF7` | `--surface-raised` / `--surface-card` | — |
| Secondary band | `#ECECE4` | `--surface-secondary` / `--surface-feature` | — |
| Primary text | `#272B29` | `--text-primary` | 12.9:1 on page |
| Secondary text | `#59635E` | `--text-secondary` | 5.6:1 on page, 5.3:1 on band |
| Muted text | `#646C67` | `--text-muted` | 4.9:1 on page, 4.6:1 on band |
| Border | `#D8D9CF` | `--border-subtle` | — |
| Group primary | `#23473E` | `--brand-primary`, `--interactive-default`, `--text-link` | 9.3:1 on page; white on it 10.3:1 |
| Primary hover / inverse surface | `#17362E` | `--brand-primary-hover`, `--interactive-hover`, `--surface-inverse` | Kinari on it 11.8:1 |
| Decorative gold | `#AD9061` | `--brand-accent` | 2.7:1 — rules/ornaments only, never text |
| Gold label (light) | `#7A6440` | `--text-accent` | 5.1:1 on page |
| Gold label (dark) | `#CDBA92` | `--text-accent-inverse` | 6.6:1 on `#17362E` |

There is no dark mode on this site (`color-scheme: light`), so none was
added.

### Imprint themes

Each imprint page root carries `data-imprint-theme="<slug>"`; the theme
tokens are defined only under that attribute in
`web/src/styles/imprint-themes.css`, so they cannot leak into group
pages. Page components map their local palette variables
(`--ridge-*`, `--hn-*`, `--verdant-*`/`--vs-*`, `--charter-*`/`--cs-*`,
`--th-*`) onto these tokens instead of hard-coding hex. Reading areas
stay on the warm group neutrals; brand colour is for heroes, headings,
CTAs, labels, numerals, rules and tint bands. Journal covers and imprint
logos are images and are never recoloured.

| Imprint | Primary | Tint | Deep field | Light-on-deep | Supporting | Primary on Kinari |
|---|---|---|---|---|---|---|
| Ridgeline | `#304C64` | `#EBF0F4` | `#1E3142` | `#A9BED1` | `#3E5F8A` (logo blue) | 8.1:1 |
| Health Nexus | `#2E696D` | `#E6F1EF` | `#1C4346` | `#9CCBC6` | `#9E5A4E` (muted coral) | 5.6:1 |
| Verdant Science | `#3F654B` | `#EBF0E6` | `#263F2E` | `#B5C9A9` | `#85593A` (soil) | 6.0:1 |
| Charter | `#754551` | `#F5EBEB` | `#472A32` | `#DDBAC1` | `#A8803F` / `#7A5A2A` (logo gold) | 6.9:1 |
| Threnody | `#664F70` | `#F1EBF2` | `#3A2D41` | `#CDBDD4` | `#93764C` (logo bronze) | 6.5:1 |

White text on each primary is ≥6.2:1, `#59635E` body text is ≥5.3:1 on
each tint, and every light-on-deep pair is ≥6:1. The official logo marks
(`public/brand/imprints/*`) were checked first: the suggested primaries
match each page's existing hue family, and the logo colours are kept as
each theme's supporting accent.

The group-level `--imprint-<slug>` tokens (used by the homepage imprint
tiles and `imprints.json` `accent` references) resolve to the same
primaries.

## Typography

**Source Serif 4** (display/editorial) + **Inter** (interface/body),
now actually loaded (Version 2, project brief §7) via
`@fontsource-variable/source-serif-4` and `@fontsource-variable/inter`
— self-hosted npm packages, not a Google Fonts `<link>`. Each is
imported as its `wght.css` entry only (the weight-axis variable file,
non-italic; the design never uses italic) in `BaseLayout.astro`.

**Why self-hosted over a Google Fonts `<link>`:** no external DNS/TLS
handshake at all (the earlier placeholder-only
`<link rel="preconnect">` to `fonts.googleapis.com`/`fonts.gstatic.com`
has been removed, since it's now dead weight), full control over
exactly which weight axis loads, and no dependency on a third-party
CDN's availability for a page to render its own type correctly.

**CLS**: Fontsource sets `font-display: swap` on every `@font-face` it
generates, so text is never invisible while the font downloads (no
FOIT). A manual `<link rel="preload">` for the specific font file was
considered and rejected: Astro/Vite content-hashes the built font
asset path, so a hand-written preload `href` would need regenerating
every build — `swap` gets the CLS benefit without that fragility.

**Script coverage — a real finding, not assumed:** each `wght.css`
file bundles *all* of that family's Google/Adobe-published Unicode
subsets (Latin, Cyrillic, Vietnamese, Greek, etc.) as separate
`@font-face` blocks scoped by `unicode-range` — the browser fetches
only the subset a given page's text actually uses, so importing the
full file costs nothing extra on an English-only page today. This
means **Inter Variable now covers Cyrillic natively**, which let
Version 1's `:root[lang='ru']` fallback override in
`typography.css` be removed (real Inter renders Russian correctly,
no substitution needed). CJK and Arabic remain **not** covered by
either family — the existing Noto-family fallback rules in
`typography.css` for those scripts are unchanged and still necessary.

Fallback stacks and a 12-step fluid `clamp()` type scale exist in
`web/src/styles/typography.css`, proven live at
`/specimen/typography/` against Latin, German compounds, Simplified
Chinese, and Arabic RTL body copy.

**A real bug found and fixed via visual QA** (not assumed correct):
the homepage hero originally set its headline to `--fs-display`
(sized for a short 1-3 word statement) for a full 7-word sentence,
producing an awkward near-one-word-per-line wrap at desktop widths.
Fixed to `--fs-h1` with a plain-rem `max-width`. See docs/HOMEPAGE.md.

## Shadows

Two shadow tokens only (`--p-shadow-sm`/`--shadow-raised`,
`--p-shadow-md`/`--shadow-overlay`), per project brief §34 ("use
sparingly... prefer border/tonal surface difference/very subtle shadow
over floating card stacks"). In practice, Version 2 uses
`--shadow-raised` in exactly two places: the sticky header after
scroll, and open dropdown/mega-menu panels (both need to visually
separate from content now sitting behind them). Every card on the
homepage (imprint tiles, journal cards) uses a `1px` border
(`--border-subtle`) instead of a shadow — no Material-style elevation
anywhere in the codebase.

## Base components

`web/src/components/ui/`:

| Component | Purpose |
|---|---|
| `Container.astro` | width primitive — `wide` / `reading` / `narrow` / `full-bleed`, mapped to the container classes in `layout.css` |
| `Section.astro` | vertical rhythm + surface primitive (`primary`/`secondary`/`inverse`), spacing from `--p-space-*` |
| `Button.astro` | renders `<a>` when `href` is given, `<button>` otherwise; `primary`/`secondary`/`ghost` variants, real `:focus-visible` ring, an `external` prop (Version 2), and inverse-surface colour overrides so it also works on the dark `.row--inverse` section |
| `Logo.astro` | PSG wordmark — see docs/ASSET-AUDIT.md §Logo decision for which asset and why |
| `VisuallyHidden.astro` | accessible-but-visually-hidden wrapper |
| `SkipLink.astro` | thin wrapper over the global `.skip-link` style, takes a localized label |
| `ExternalLink.astro` (Version 2) | marks a link to an independent PSG subdomain: new tab, "(opens in a new tab)" label, arrow icon |
| `SectionHeading.astro` (Version 2) | eyebrow + heading + optional lede, used by every homepage section for one consistent rhythm |

**Version 2 additions** (see docs/NAVIGATION.md and docs/HOMEPAGE.md
for full detail):

- `components/global/`: `Header.astro`, `Footer.astro` — the real
  global shell, now rendered on every page via `BaseLayout.astro`.
- `components/navigation/`: `DesktopNav.astro`, `MegaMenu.astro`,
  `MobileMenu.astro`, `LanguageSwitcher.astro`.
- `components/homepage/`: `Hero.astro`, `InstitutionArea(s).astro`,
  `ImprintCard.astro`/`ImprintGrid.astro`, `JournalCard.astro`/
  `FeaturedJournals.astro`, `InfrastructureCard.astro`/
  `ResearchInfrastructure.astro`, `StandardsSection.astro`.

Still reserved/empty, each with a `README.md` explaining what belongs
there and which round populates it: `components/layout/`,
`components/editorial/`, `components/journal/`, `components/imprint/`,
`components/book/`, `components/news/`.
