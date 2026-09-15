# Homepage

Version 2 replaced the Round 1 "foundation prototype" placeholder at
`/` with the real homepage (`web/src/pages/index.astro`). The token/
layout specimens it used to link to still exist at `/specimen/*`, now
opted out of the global Header/Footer shell (`showChrome={false}` on
`BaseLayout`) so they stay pure token demonstrations.

## Section-by-section

| Section | Component | Data source |
|---|---|---|
| Hero | `components/homepage/Hero.astro` | `getAllImprints()` (for the five ring colours) |
| Group structure | `components/homepage/InstitutionAreas.astro` + `InstitutionArea.astro` | `site.ts` → `corporateStructure.divisions` |
| Publishing network | `components/homepage/ImprintGrid.astro` + `ImprintCard.astro` | `getAllImprints()` |
| Journal network | `components/homepage/FeaturedJournals.astro` + `JournalCard.astro` | `getFeaturedJournals()` |
| Research & infrastructure | `components/homepage/ResearchInfrastructure.astro` + `InfrastructureCard.astro` | `site.ts` → `externalSystems` |
| Books | inline in `index.astro` | `books.json` (empty) |
| News | inline in `index.astro` | `news` Content Collection (empty) |
| Standards & integrity | `components/homepage/StandardsSection.astro` | hard-coded route list (see file comment for why) |
| Closing | inline in `index.astro` | — |

## Hero

No photograph. Every piece of PSG photography audited in Round 1
(`docs/ASSET-AUDIT.md`) is status `review` (licensing not confirmed),
and project brief §20 explicitly prohibits treating `review`-status
imagery as production-approved for the hero specifically. The visual
is an inline SVG of five overlapping rings, one per imprint, coloured
with the real `--imprint-*` tokens — "one group, five imprints" made
literal, at zero extra image requests and no licensing risk.

**Headline iteration** (visible in `git log`/this doc, not silently
overwritten): the first draft used `--fs-display` (sized for a 1-3
word statement) for the full 7-word headline, which produced an
awkward near-one-word-per-line wrap on desktop — found by inspecting
an actual rendered screenshot, not assumed. Fixed by switching to
`--fs-h1` and a plain-rem `max-width` (46rem) instead of a `ch`-based
one (`ch` scales with the heading's own huge font-size, which fought
the fix). Verified by re-screenshotting.

## Featured journal selection

`Journal.featured` (`web/src/types/journal.ts`) is an explicit,
documented curation flag — not an editorial ranking, and stated as
such in the section's own lede copy. Exactly one journal per imprint,
each chosen only from journals with **both** a confirmed real ISSN
**and** no known data-quality flag (project brief §55: don't let a
homepage selection surface an unresolved inconsistency like the
PEMR/REMR or GRHAS/GRAHS filename mismatches documented in
`docs/DATA-MODEL.md`):

| Imprint | Featured journal | Why |
|---|---|---|
| Ridgeline | AI & Future Society (AFS) | Real ISSN, no flags, topical |
| Health Nexus | Health Nexus (HN) | Real ISSN, shares the imprint name |
| Verdant Science | Climate Sustainability & Global Systems (CSGS) | Real ISSN, no flags |
| Charter | Journal of Law, Psychology & Communication Studies (JLPCS) | Real ISSN, broad interdisciplinary scope |
| Threnody | Three Teachings Studies (TTS) | Real ISSN, no flags (GRHAS/Silence/Resonance also qualify by ISSN, but GRHAS carries a known filename mismatch) |

## Books / News empty states

`books.json` is `[]` (no legacy book records exist — see
`docs/DATA-MODEL.md`) and the `news` Content Collection has zero
entries. Project brief §26/§28 explicitly forbid fabricating either.
Both sections render a plain-text explanation of *why* they're empty
plus a link to the section's own route (which repeats the same honest
empty-state) — not omitted entirely, so the group-structure/footer
navigation stays consistent (a "Books" and "News" link that goes
nowhere would be worse than one that explains itself).

## Standards & integrity

No third-party compliance logos (COPE, DOAJ, Crossref, etc.) —
membership/compliance status with any of them was not confirmed during
the Version 1 audit, and project brief §27 explicitly prohibits
displaying such marks without verification. The four links point at
real existing routes; "Peer Review" and "Research Integrity" (named in
the brief) are treated as concepts covered within Editorial
Standards/Publication Ethics rather than given invented routes of
their own.

## Layout bugs found and fixed during visual QA

Screenshots were actually rendered and inspected (project brief §50 —
"do not merely generate them"), not just produced. Real issues found
this way, each with a code comment at the fix site:

1. **Logo overflow at 320/360px** — the wordmark's cropped aspect ratio
   (~12:1) sized by a fixed height produced a fixed minimum width via
   flexbox's automatic-minimum-size rule, wider than the viewport.
   Fixed by sizing the logo by width (responsive per breakpoint)
   instead of height. See `components/ui/Logo.astro`.
2. **Header overflow at exactly 1024px** — 7 primary nav items plus
   logo plus utility controls didn't fit in the reference width from
   project brief §8/§30. Fixed by tightening nav-item padding and
   header row/utility gaps. See `components/navigation/DesktopNav.astro`,
   `components/global/Header.astro`.
3. **Homepage overflow at 320/360px** — `.hero__row`'s grid had no
   explicit `grid-template-columns` on mobile, so its implicit column
   sized to content's max-content instead of the viewport. Fixed with
   `grid-template-columns: minmax(0, 1fr)`. See `components/homepage/Hero.astro`.
4. **Awkward hero headline wrap** — see Hero section above.
5. **Language switcher linked to a 404** — `LanguageSwitcher.astro`'s
   code comment said non-English locales link to `/`, but the actual
   code called `localizePath('/', locale.code)`, producing `/ja/`
   (a page that doesn't exist — Version 1 built no translated pages).
   Caught by `tests/interaction-check.mjs`, not visual inspection —
   an argument for keeping both kinds of check. Fixed to literally link
   to `/`.
6. **External-link icon detached from wrapped text** — `ExternalLink.astro`
   used `display: inline-flex`, which put the arrow icon on the first
   line of a wrapped multi-word label (e.g. "Panorama Research
   Institute" in a narrow footer column) instead of after the last
   word. Fixed by switching to plain `display: inline` so the icon
   flows as part of the same text run.
7. **Footer column heading broke mid-word at 1024px** — 5 footer
   columns at 1024px left too little room for "INFRASTRUCTURE" as one
   word, and `reset.css`'s global `overflow-wrap: break-word` split it
   ("INFRASTRU" / "CTURE"). Fixed by raising the 5-column breakpoint to
   1280px (3 columns from 768-1279px instead).
8. **`.split` primitive misused for heading+single-button rows** — the
   shared `.split` component (`web/src/styles/layout.css`) is tuned for
   narrow-label/wide-content (`minmax(200px,1fr) minmax(0,2.4fr)`);
   using it for "heading + one button" rows (Books, News, Featured
   Journals headers) squeezed the heading into an unnecessarily narrow
   column at tablet width and was the direct cause of bug #7's sibling
   in `ResearchInfrastructure.astro` ("infrastructure" wrapping
   mid-word at 768px). Fixed by giving each of these three sections its
   own plain flex row or a dedicated 3:2 grid instead of reusing `.split`.

## Verified, not assumed

- `npm run build` — 0 errors.
- `npm run test:browser` — 67 (route × width) combinations, including
  the homepage at all of 320/360/390/430/768/1024/1280/1440/1728/1920px:
  0 overflow, 0 console/page errors, 0 navigation errors.
- `npm run test:interaction` — 31 checks covering mega-menu open/close/
  Escape/keyboard/exclusivity, language selector, mobile nav open/
  nested-accordion/close, and every footer link resolving: all pass.
- Screenshots at every required width plus every header/mobile-nav
  state were rendered with real Chromium and visually inspected (not
  just generated) — see docs/DEPLOYMENT.md / docs/ARCHITECTURE.md for
  the note on which Chromium build this environment used.
