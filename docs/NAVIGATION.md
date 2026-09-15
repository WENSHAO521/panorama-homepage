# Navigation Architecture

## Data

Single source of truth: `web/src/data/navigation.ts`. Three exports:

- `primaryNav` — the 8 header items. Four (`Publishing`,
  `Infrastructure`, `Standards`, `About`) carry `children` and become
  mega-menu dropdowns; `Research`, `Books`, and `News` stay plain links.
  `children` is either one flat array of leaf links (a single-column
  dropdown) or an array of grouping nodes that each have their own
  `children` (a multi-column mega menu) — `MegaMenu.astro` and
  `MobileMenu.astro` both detect which shape they were given at
  render time (see either file's frontmatter).
- `footerGroups` — 5 titled groups for the footer. Deliberately
  **separate** from `primaryNav`, not derived from it: the footer's
  groupings and labels are optimized for footer scanning, while the
  header's Books/News have no footer sub-items. A shared tree would
  compromise one of the two navigation contexts.
- `legalNav` — Privacy/Terms/Accessibility, used only in the footer's
  legal line.

`NavItem` (`web/src/types/navigation.ts`) has an `external?: boolean`
flag. Every item with `external: true` renders through
`components/ui/ExternalLink.astro` (inline links) or
`Button.astro`'s `external` prop (CTA buttons) — both add
`target="_blank" rel="noopener noreferrer"`, a visually-hidden "(opens
in a new tab)" suffix, and an arrow icon. Nothing determines
"external" by sniffing the URL at render time; it's a data decision,
made once, in `navigation.ts`.

## Why "Index" doesn't appear anywhere

Early planning (and this project's own brief, in an earlier round)
mentioned a fourth infrastructure platform called "Index" alongside
POSI/Profiles/Credentials. It does not appear in `externalSystems`
(`web/src/data/site.ts`), because that table is built only from the
legacy site's own `Organization` JSON-LD `sameAs` list (the one
verified source of PSG's real subdomains) — which lists `journals`,
`books`, `research`, `posi`, `profiles`, `credentials`, and nothing
called `index`. Project brief §25 ("only show verified services") and
§11 ("only where verified by the current repository") both apply
directly: adding an `index.panorama-sg.com` link would be fabricating
a URL. It's omitted from the header mega menu, the homepage
infrastructure section, and the footer alike, consistently.

## Component architecture

```
components/global/Header.astro       logo, desktop nav, utility controls, mobile trigger, sticky-scroll state
components/global/Footer.astro       5 link groups + legal line
components/navigation/DesktopNav.astro   primary nav, >=1024px
components/navigation/MegaMenu.astro     dropdown panel content (1 or 2 columns)
components/navigation/MobileMenu.astro   <dialog>-based full-screen panel, <1024px
components/navigation/LanguageSwitcher.astro  10-locale dropdown, reused in both header and mobile panel
web/src/scripts/nav-behavior.ts       ~90 lines of vanilla JS enhancement (see below)
```

## Why `<details>` and `<dialog>`, not a JS dropdown library

Both elements provide most of what project brief §12/§13 asks for
*natively*: `<summary>` gives pointer + keyboard (Enter/Space)
activation and a real open/closed state for free; `<dialog>` (opened
via `.showModal()`) natively traps focus, closes on Escape, and
returns focus to the invoker. `web/src/scripts/nav-behavior.ts` adds
only what neither element does on its own:

1. Exclusive mega menus (opening one closes the others).
2. Click-outside-closes for `<details>` (native for `<dialog>`, not
   for `<details>`).
3. Escape closes an open `<details>` (native for `<dialog>`).
4. Mobile `<dialog>` open/close wiring plus a scroll lock.
5. A subtle sticky-header shadow state via `IntersectionObserver` on a
   1px sentinel (not a scroll listener).

## The `[hidden]`/`display` bug class — and how this codebase avoids it

Project brief §12/§55 both flag that prior work hit bugs where an
element's `[hidden]`-attribute default visibility fought an unscoped
CSS `display` rule. This codebase's discipline against that:

- No interactive panel anywhere uses the `hidden` attribute. Every one
  is a `<details>` or `<dialog>`, whose native open/closed visibility
  is driven by the `open` attribute.
- Every CSS rule that sets `display` on a collapsible panel is scoped
  to the open state specifically — `details[open] > .panel { display:
  ...; }` or `dialog[open] { display: ...; }` — never a bare
  `.panel { display: ...; }` that would override the browser's default
  closed-state hiding. See the header comments in
  `DesktopNav.astro`, `MobileMenu.astro`, and `LanguageSwitcher.astro`
  for the specific rules.
- The one deliberate exception (`dialog.mobile-nav { display: none
  !important }` at `>=1024px` in `MobileMenu.astro`) is documented
  inline as an intentional force-hide, with its one known limitation
  (a resize mid-open doesn't release the scroll lock) stated rather
  than silently accepted.

## Language selector honesty

See `docs/I18N.md` and `docs/HOMEPAGE.md` — the selector is fully
built and lists all 10 real locale names, but non-English entries link
to `/` (the canonical English homepage), not a locale-prefixed page,
because Version 1 built no translated pages. This was actually gotten
wrong once during this round (the code called `localizePath()`,
producing a 404-bound `/ja/`, contradicting its own header comment)
and only caught by `tests/interaction-check.mjs`'s explicit href
assertion — not by visual inspection, since a broken link doesn't look
different from a working one in a screenshot. Fixed; see
`docs/HOMEPAGE.md` bug list.
