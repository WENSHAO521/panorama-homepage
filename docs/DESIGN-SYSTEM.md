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
| Colour | `--p-paper-50`, `--p-forest-900`, `--p-navy-950`, `--p-blue-600`, `--p-gold-300/500/700` | `--surface-primary`, `--text-primary`, `--brand-primary`, `--interactive-default` |
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

The current corporate palette uses Warm Paper (`--p-paper-*`) as the
reading surface and Ink Green (`--p-forest-*`) as PSG's primary
institutional colour. Midnight Navy (`--p-navy-*`) remains a secondary
academic tone for illustration and supporting visual structure, while
Academic Blue (`--p-blue-*`) remains available for conventional inline
links. UI interaction states (navigation, controls, focus and primary
actions) use Ink Green so the global shell reads as one coherent brand
system. Muted Stone (`--p-stone-*`) supplies borders, while restrained
Gold provides editorial accents: `--text-accent` uses `#7A5A22` on
light paper, `--text-accent-inverse` uses the lighter `#D0B46A` on
Ink Green inverse surfaces, and `--brand-accent` remains `#A9843C`
for decorative use. The core pairings were checked against WCAG 2.2 AA
with relative luminance rather than selected by eye.

**Five imprint accents** (subordinate to the PSG corporate identity,
used only for imprint-scoped UI, never replacing the core palette):

| Imprint | Accent | Token |
|---|---|---|
| Ridgeline | Slate blue `#2B4C7E` | `--imprint-ridgeline` |
| Health Nexus | Muted crimson `#7A2E3A` | `--imprint-health-nexus` |
| Verdant Science | Deep green `#2F5D3A` | `--imprint-verdant-science` |
| Charter | Ochre `#8A5A20` | `--imprint-charter` |
| Threnody | Muted plum `#5B3A5E` | `--imprint-threnody` |

`web/src/data/imprints.json`'s `accent` field stores the **token
reference** (`"var(--imprint-ridgeline)"`), not a raw hex — so a future
re-theme changes one CSS file, not five JSON entries.

**Update (Version 2, project brief §47):** the accents are now placed
next to the real imprint logos on the homepage's imprint tiles
(`components/homepage/ImprintCard.astro` — a 3px accent top border
over a light card, `ImprintGrid.astro`'s section) and verified via
real-Chromium screenshot (see docs/HOMEPAGE.md). No clash found: the
logos themselves are near-black/dark-grey text marks (see
docs/ASSET-AUDIT.md §Logo decision), so an accent-coloured border
above them reads as a clean identification stripe rather than
competing with the logo's own colour. The logos were not altered to
"match" the accents — only the surrounding card UI was designed around
them, per the brief's own instruction.

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
