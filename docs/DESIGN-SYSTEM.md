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
Unohana the card stock, Sumi (ink) the single group brand colour, with
Shu (vermilion) for links and small labels and Kincha gold for rules and
ornaments only. Primitives live in `web/src/styles/tokens.css`;
components reference semantic tokens only. The legacy primitive names
(`--p-navy-*`, `--p-tetsu-*`, `--p-teal-*`, `--p-blue-*`, `--p-biwa-*`)
are kept as aliases onto the new palette so older selectors cannot
re-introduce retired hues. (The earlier Fukamidori deep-green brand colour
was replaced by Sumi + Shu so the group colour no longer competes with the
green imprint hues.)

| Role | Value | Semantic token | Contrast |
|---|---|---|---|
| Page background | `#F7F3EC` | `--surface-primary` | — |
| Card background | `#FDFBF6` | `--surface-raised` / `--surface-card` | — |
| Secondary band | `#EDE6DA` | `--surface-secondary` / `--surface-feature` | — |
| Primary text | `#2B2724` | `--text-primary` | 13.4:1 on page |
| Secondary text | `#62594F` | `--text-secondary` | 6.2:1 on page, 5.5:1 on band |
| Muted text | `#6B6156` | `--text-muted` | 5.5:1 on page, 4.9:1 on band |
| Border | `#DDD5C7` | `--border-subtle` | — |
| Group primary (buttons) | `#2B2724` | `--brand-primary` | 13.4:1 on page; Kinari on it 13.4:1 |
| Primary hover / inverse surface | `#1F1B19` | `--brand-primary-hover`, `--surface-inverse` | Kinari on it 15.5:1 |
| Link / small label (Shu) | `#A04A35` | `--interactive-default`, `--text-link`, `--text-accent` | 5.4:1 on page, 4.8:1 on band |
| Link hover | `#843826` | `--interactive-hover`, `--text-link-hover` | 7.4:1 on page |
| Shu label (dark) | `#E8A894` | `--text-accent-inverse` | 8.5:1 on `#1F1B19` |
| Decorative gold | `#AD9061` | `--brand-accent` | 2.7:1 — rules/ornaments only, never text |

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
CTAs, labels, numerals, rules and tint bands. Journal covers are images and are
never recoloured; the imprint logo marks keep their letterforms and only
the accent fill was softened to match the palette (2026 revision).

| Imprint | Primary | Tint | Deep field | Light-on-deep | Supporting | Primary on Kinari |
|---|---|---|---|---|---|---|
| Ridgeline (縹 hanada) | `#46647F` | `#E7E9E8` | `#354452` | `#C6CED2` | `#557AA3` / `#3E5F8A` (logo blue) | 5.6:1 |
| Health Nexus (青磁 seiji) | `#346A66` | `#E5EAE5` | `#2B4744` | `#C1D0CB` | `#A35E4F` / `#92503F` (muted coral) | 5.6:1 |
| Verdant Science (老竹 oitake) | `#4B6A45` | `#E8EAE1` | `#384732` | `#C8D0C1` | `#9C6A45` / `#85593A` (soil) | 5.5:1 |
| Charter (小豆 azuki) | `#8A5562` | `#EFE7E4` | `#5B3B42` | `#DAC9CA` | `#A8803F` / `#7A5A2A` (logo gold) | 5.3:1 |
| Threnody (濡羽 nureba, ink black) | `#2E3236` | `#ECEBE8` | `#25282B` | `#C9C6C0` | `#93764C` / `#765C38` (logo bronze) | 11.7:1 |

White text on each primary is ≥5.7:1, `#62594F` body text is ≥5.3:1 on each
tint, and every light-on-deep pair is ≥6:1. Primaries were softened in the
2026 revision (lower saturation, Japanese traditional colour families);
Threnody is the one imprint whose colour is ink itself, with the logo bronze
carrying its accents (kickers, rules, buttons).

The group-level `--imprint-<slug>` tokens (used by the homepage imprint
tiles and `imprints.json` `accent` references) resolve to the same
primaries.

## Actions (buttons and links)

One shared system in `web/src/styles/actions.css`, driven by `--p-action-*`
and `--p-link-*` tokens. Group pages and imprint pages keep their own
colours; geometry and type are global.

| Tier | Markup | Spec |
|---|---|---|
| Primary button | `data-action="primary"` | 44px high, 8px radius, 14px / 600, sentence case, trailing arrow that nudges 3px on hover/focus |
| Secondary button | `data-action="secondary"` | Same box, 1px border at 65% of the text colour, 7% tint on hover (works on paper, bands and dark surfaces because it uses `currentColor`) |
| Text link | `.action-link` (or a listed per-page class) | 14px / 500, 1px underline at 45% that goes solid on hover, trailing arrow, 28px minimum target |

Rules: uppercase and wide letter-spacing are for eyebrows only and never for
anything clickable; no clickable text under 14px; navigation items are not
actions and keep their own style; the focus ring is 2px with a 3px offset.
New links should use `.action-link`. The explicit class list in
`actions.css` exists only so the older hand-written per-imprint link classes
share the same treatment (it uses native CSS nesting, so it is written once).

## Motion

Restrained and shared (`web/src/styles/motion.css`, `web/src/scripts/reveal.ts`).

| What | How |
|---|---|
| Scroll reveal | Content blocks of below-the-fold `<main>` sections fade up once (700ms, staggered 70ms). The hidden "before" state is applied by JS, so no-JS visitors see everything |
| Hero copy (secondary and imprint pages) | The block holding the `h1` rises in, children staggered, 560ms, CSS only (`:has(> h1)`) |
| Journal covers | 3px lift on hover (hover-capable devices only) |
| Research band map | The two office markers pulse twice, then rest |
| Publishing hero | The five imprint-coloured rings fade in one after another, once |

Rules: only `transform` and `opacity`; no layout properties; played once; everything
sits behind `prefers-reduced-motion: no-preference` (reduced-motion visitors get no
animation and no hidden state); decorative layers (wallpapers, textures, aria-hidden
art, positioned or sticky elements) are never animated; use `backwards`, not `both`,
as the animation fill so an element's own hover states still work afterwards.
Measured on production builds: CLS equal to or lower than before on all sampled
pages (home 0), no extra JS file, hidden-after-scroll elements 0.

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

### Small type floor

No visible text is set below **11px for uppercase labels** or **12px for
everything else**. Use the tokens instead of ad-hoc rem values:

| Token | Size | Use |
|---|---|---|
| `--fs-label` | 11px (`0.6875rem`) | dense uppercase labels: eyebrows, section bars, table heads, footer group titles; keep tracking at or below `0.16em` |
| `--fs-caption` | 12–13px (fluid) | sentence-case small text: captions, meta values, footer links and addresses, counters |

Measured across 46 routes at 1280px and 400px: text elements below the
floor went from 3,664 to 0. New CSS should reference these tokens rather than
writing `font-size: 0.6rem`.

### CJK headlines

Chinese and Japanese titles have no spaces, so browsers break them mid-word.
Wrap any heading text in `<PhraseText text={...} />` (done for every `h1`–`h3`
that renders a single expression, plus the layouts). It splits the title into
clauses after punctuation, makes each clause one unit, and offers wrap points
only at real word boundaries (`Intl.Segmenter`); single-character function
words stay attached to a neighbouring word. CSS (`word-break: keep-all`,
`.phrase`) forbids every other break. Across zh-Hans, zh-Hant and ja at four
widths, 2,322 heading line breaks were checked: no breaks inside Chinese
words; the few remaining Japanese cases are long katakana loanwords that are
wider than the line by themselves.

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
