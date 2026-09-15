# Design Foundation — Round 1

Direction: **Editorial Institutional Modernism.** Academic authority,
restraint, precise hierarchy, generous whitespace, long-term durability.
Not "impressive," not "modern SaaS" — credible in the way a serious
university press or a Nature Portfolio property is credible.

This document is the encoding of that direction into tokens and rules.
Round 3 (Design System) is where it gets tested against real
components and, where needed, revised — nothing here is locked.

## 1. Explicitly rejected visual language (checklist)

Carried over verbatim from the project brief as an enforceable list,
because "we'll know it when we see it" is not enforceable and a
checklist is:

- ❌ SaaS/startup/Web3/tech-homepage visual language
- ❌ Neon or blue-purple gradients, glassmorphism, glowing borders,
  floating glass cards
- ❌ 3D globes, "AI brain" imagery, neural-network backgrounds, particle
  animation
- ❌ Dashboard-style KPI walls or meaningless stat grids
- ❌ Icon-per-section, icon-per-link decoration
- ❌ **Decorative arrows of any kind** — no `→`, `↗`, `›`, chevrons on
  cards, "Read more →", "Learn more →". Clickability is communicated
  through typography, hover state, background, border, spacing, and
  cursor — never an appended glyph. Icons are reserved for genuine
  functional controls only: search, menu, close, accordion,
  language selector.
- ❌ Cards-everywhere. No `CARD / CARD / CARD / CARD` grid as the
  default content unit — see §4.

`web/src/pages/specimen/*.astro` (Round 1's only shipped pages) contain
zero arrows, zero icons-as-decoration, and zero card grids, by
construction — worth stating so this isn't just an aspiration on paper.

## 2. Typography strategy

### Direction

| Role | Family | Rationale |
|---|---|---|
| Display / Editorial (h1–h4) | **Source Serif 4** | Open (SIL OFL), variable font, designed specifically for long-form reading and editorial contexts (it's a Source Serif descendant tuned for exactly this use), wide Latin + Cyrillic coverage. |
| Interface / Body | **Inter** | Open (SIL OFL), variable font, excellent hinting at small sizes, the de facto standard for interface legibility, wide language coverage including Cyrillic and extended Latin (German/French/Spanish diacritics). |

Both are provisional pending Round 3 validation against real page
compositions — this round only validates the *scale and mechanism*,
not the final family choice.

### Multilingual evaluation

Neither Source Serif 4 nor Inter ships usable CJK or Arabic glyphs.
Rather than let the browser silently fall through to whatever default
serif/sans the OS picks (inconsistent weight and x-height across
platforms), `typography.css` defines explicit per-script overrides:

| Script | Body family | Display family | Notes |
|---|---|---|---|
| Latin (en, de, fr, es) | Inter | Source Serif 4 | German compound nouns handled by measure being `ch`-based, not px-fixed — see §3. |
| Cyrillic (ru) | Inter, Noto Sans | Source Serif 4, Noto Serif | Inter's Cyrillic coverage is good; Noto Sans is the fallback if a future weight/style gap appears. |
| Simplified/Traditional Chinese | Noto Sans SC/TC | Noto Serif SC/TC | Letter-spacing forced to `0` on CJK headings — Latin-tuned negative tracking (`--ls-tight: -0.01em`) actively breaks CJK glyph rhythm. |
| Japanese | Noto Sans JP | Noto Serif JP | Same tracking rule as CJK above. |
| Korean | Noto Sans KR | Noto Serif KR | Same tracking rule. (Legacy site loads `Pretendard` for Korean; Noto Sans KR is proposed here for one consistent Noto family across all CJK rather than a fourth distinct typeface — revisit in Round 3 if Pretendard's fit is preferred.) |
| Arabic | Noto Sans Arabic, Cairo | Noto Serif Arabic | `dir="rtl"` forces `letter-spacing: 0` (tracking is meaningless in Arabic) and increases body line-height to `1.85` (Arabic diacritics/ascenders need more leading than Latin's `1.65`). Validated live in `specimen/typography.astro`. |

**Loading strategy**: not yet implemented — `BaseLayout.astro`
`preconnect`s to Google Fonts but does not load a stylesheet, because
locking a `<link>` to specific Source Serif 4 / Inter weights now would
mean re-paying that render-blocking cost when Round 3 finalizes actual
weights used. When it is wired up: `font-display: swap`, variable-font
single-file loading (one `.woff2` per family covering the full weight
range instead of 4 static-weight files), and `<link rel="preload"
as="font">` for the body face only (display serif can tolerate a swap;
body text appearing late causes more layout shift).

**Licensing**: Source Serif 4, Inter, and every Noto family are SIL
Open Font License — no attribution requirement, safe for commercial
use, self-hostable (removing the Google Fonts runtime dependency
entirely is a legitimate Round 3+ option once weights are final).

**Accessibility**: both primary faces have real, distinguishable
italic and bold masters (not synthetic/faux-bold, which fails at small
sizes and on some screen-reader-adjacent assistive tech that flags
synthetic emphasis). Minimum body size is `--fs-body` ≈ 16–17px fluid,
never below WCAG's 16px-equivalent recommendation for primary reading
text.

### Type scale mechanism

Fully fluid (`clamp()`), not fixed-per-breakpoint. Twelve steps from
`--fs-caption` to `--fs-display`, defined once in
`web/src/styles/typography.css` and demonstrated live in
`specimen/typography.astro`, including a **worst-case long academic
title** ("Journal of Comparative Regional Policy, Trauma Recovery, and
Long-Term Institutional Governance in Post-Conflict Societies") to
confirm it wraps cleanly rather than overflowing at any width.

## 3. Colour strategy

New semantic system, no legacy hex values carried over. (For contrast:
the legacy `institutional.css` system was forest-green/gold on aged
paper — `--ink: #0A3D2F`, `--gold: #DDC393` — explicitly *not* reused,
per the brief's "don't just swap colors" instruction; the new palette
below was derived independently from the Editorial Institutional
Modernism brief, not by adjusting the old one.)

| Token | Value | Role |
|---|---|---|
| `--surface-primary` | Warm paper `#FAF9F6` | Default reading surface |
| `--surface-inverse` | Midnight navy `#0B1B2B` | Dark sections |
| `--text-primary` | Ink `#16191C` | Body/heading text |
| `--text-link` | Academic blue `#1F4E79` | Links/interactive |
| `--brand-primary` | Navy `#0B1B2B` | Primary brand surface |
| `--brand-secondary` | Deep teal `#0F3D3E` | Secondary brand surface |
| `--brand-accent` | Restrained gold `#A9843C` | **Decorative/large-text only** — see below |

### WCAG 2.2 AA validation

Computed via relative-luminance contrast ratio (WCAG formula), not
eyeballed — see `web/src/pages/specimen/color.astro` for the live,
rendered version of this table:

| Pairing | Ratio | Result |
|---|---|---|
| `--text-primary` on `--surface-primary` | 16.8:1 | AA + AAA |
| `--text-secondary` on `--surface-primary` | 10.1:1 | AA + AAA |
| `--text-muted` on `--surface-primary` | 5.9:1 | AA |
| `--text-inverse` on `--surface-inverse` | 16.5:1 | AA + AAA |
| `--interactive-default` (academic blue) on `--surface-primary` | 8.2:1 | AA + AAA |
| White text on each of the 5 imprint accents (solid fill) | 5.6:1 – 9.5:1 | AA + AAA |
| Each imprint accent as text on `--surface-primary` | 5.6:1 – 9.0:1 | AA (normal text) |
| `--brand-accent` (gold) as **body text** on `--surface-primary` | 3.3:1 | **Fails AA-normal.** Passes AA-large (≥3:1) only. |

The gold accent is real and kept — but constrained by rule, not just
convention: `--text-accent` (`#7A5A22`, 6.0:1) is the AA-safe variant
for any small text use (labels, "overline" eyebrows); the brighter
`--brand-accent` (`#A9843C`) is reserved for large text (≥24px/≥19px
bold), decorative underlines, or fills — never for a paragraph or a
small caption. This distinction is enforced by having two separate
tokens rather than one, so "just use the gold" can't silently produce
an inaccessible paragraph.

### Imprint accent system

One accent per scholarly brand, each independently AA-validated
(table above) rather than picked for visual variety alone:

| Imprint | Scope | Accent |
|---|---|---|
| Ridgeline | Technology, Engineering & AI | Slate blue `#2B4C7E` |
| Health Nexus | Medicine & Health Sciences | Muted crimson `#7A2E3A` |
| Verdant Science | Sustainability, Environment & Life Sciences | Deep green `#2F5D3A` |
| Charter | Policy, Law & Civic Studies | Ochre `#8A5A20` |
| Threnody | Humanities & Cultural Studies | Muted plum `#5B3A5E` |

Provisional — ratified in Round 3 against the actual imprint logos
(`assets/nexus/*.svg`, preserved per `ASSET-PRESERVATION.md`) once
those are placed alongside these accents to check for clash or
insufficient differentiation.

## 4. Not a card-based site

The default content unit is the **editorial row** (`.row` +
`.container-wide`, `web/src/styles/layout.css`), not a card:
full-width horizontal sections separated by thin `.divider` hairlines,
composed with `.split` (asymmetric two-column, collapsing to one column
under 768px) or `.stack` (vertical rhythm) rather than a repeating grid
of bordered, shadowed boxes.

Rounded corners are kept — the brief is explicit that PSG wants to
retain them — but scoped as a **detail**, sized by what it's applied
to, not a blanket design language:

| Use | Radius token | Value |
|---|---|---|
| Buttons | `--p-radius-button` | 10px |
| Small surfaces | `--p-radius-surface` | 12px |
| Cards (where an actual card is the right pattern — e.g. a journal
  directory entry, not a generic content block) | `--p-radius-card` | 16px |
| Large image / feature | `--p-radius-feature` | 24px |
| Pills | `--p-radius-pill` | 999px, **tags/status/category only** — the primary nav must never become a pill row |

## 5. Grid system

Two independent width systems — this is the single most important
layout decision in Round 1, so it's stated twice (once here, once in
`ARCHITECTURE.md` §4) on purpose:

- **`.container-wide`** (max `1440px`) governs page/section layout —
  where a hero, a full-width imprint band, or a footer sits.
- **`.container-reading`** (max `68ch`) governs continuous prose — an
  editorial paragraph never stretches to the width of the page layout
  regardless of viewport, because a 1440px-wide line of body text is
  unreadable.
- **`.container-narrow`** (max `720px`) sits between the two, for
  content that's more than a paragraph but shouldn't claim full layout
  width (e.g. a single-column form or a pull-quote block).
- **`.container-full-bleed`** (100vw) for sections that intentionally
  break out to the viewport edge (an inverse-surface band, a full-width
  divider strip).

A component picks whichever container fits *that content*, not
whichever the page happens to be using elsewhere — a hero can be full
bleed while the paragraph inside it is reading-measure. Demonstrated
live, all four side by side, in `specimen/grid.astro`.

**No mechanical 12-column grid import** (Bootstrap-style fixed gutters
across a 12-unit grid). For an editorial layout with asymmetric
compositions (label column + wide content column, pull quotes, footnote
rails), forcing everything into fractions of 12 fights the content
more than it helps; `.split`'s `minmax(200px, 1fr) minmax(0, 2.4fr)`
track sizing is content-driven instead. Multi-column composition
beyond `.split`/`.stack` is built per-component with native CSS Grid as
real page designs arrive in Round 3+.

### Reference breakpoints

| Width | Role |
|---|---|
| 390px | Mobile reference |
| 768px | Tablet |
| 1024px | Small laptop |
| 1440px | Desktop reference (`.container-wide` max) |
| 1728px+ | Large desktop — full-bleed sections dominate; wide container stays capped rather than stretching indefinitely |

## 6. Responsive architecture (composition, not shrinking)

Responsiveness is defined *in* the token/layout layer from Round 1,
not deferred to "make desktop, then squeeze": the fluid type scale
(`clamp()`), the `ch`-based reading measure, and `.split`'s
single-column collapse below 768px all mean a component built against
these primitives is responsive by construction. Specific stress cases
already validated in the specimens (`specimen/typography.astro`):
worst-case long academic journal titles (English), German compound
nouns (measure is character-based, not px, so it isn't a special case
to handle separately), Simplified Chinese body copy, and Arabic RTL
body copy with correct line-height and zero letter-spacing.

Not yet stress-tested (flagged honestly rather than silently skipped):
navigation overflow behavior and long imprint names in a nav context —
there is no navigation component yet to test against (Round 4).
