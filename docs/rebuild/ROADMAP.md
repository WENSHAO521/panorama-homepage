# PSG Greenfield Rebuild — Roadmap

15 rounds. Each round has a single-sentence definition of done; a round
is not "complete enough," it's done or it isn't. No round jumps ahead
of the one before it (e.g. no page design before the content model
exists; no CMS before the content model is validated by real pages).

| Round | Name | Done when |
|---|---|---|
| **1** | **Greenfield Foundation** *(this round)* | Legacy audited and classified; assets inventoried; Astro + TS + token/typography/layout/i18n/a11y foundation exists and builds clean with zero legacy CSS/JS/component dependency. |
| 2 | Information Architecture & Content Model | Every page type (journal, imprint, policy, news item, book, person, partner…) has a defined schema (Astro Content Collection) validated against real legacy content pulled via reference-only material — not yet rendered as pages. |
| 3 | Design System | Round 1 tokens ratified against real compositions; a real component library exists (buttons, tags, nav item, form field, journal-directory entry) — still no full pages. |
| 4 | Global Shell — Header / Navigation / Search / Footer | The shell renders correctly across all 10 locales (incl. RTL) and all reference breakpoints, with real search and language-switcher behavior; no page content yet, shell only. |
| 5 | Homepage | Homepage ships against the Round 2 content model and Round 3/4 system, English only. |
| 6 | Publishing / Journals / Imprints | Journal directory + all 5 imprint hub pages ship, backed by real content collections, English only. |
| 7 | Books | Books/imprint-books section ships. |
| 8 | Research Institute | Panorama Research Institute section ships. |
| 9 | Infrastructure / POSI / Standards | POSI, Scholarly Index, Open Data, Research Tools pages ship. |
| 10 | About / Partnerships / News / Policies | Remaining institutional pages ship — about, partnerships, news, all policy documents. |
| 11 | Multilingual System | Real translation-resource pipeline built; at minimum the Round 2 "which pages need full parity" decision is implemented for every locale declared in Round 1's `i18n/config.ts`. |
| 12 | SEO / Structured Data / Accessibility | Full JSON-LD schema set per content type; full WCAG 2.2 AA audit (screen reader pass, keyboard trap check, forms) across every shipped page. |
| 13 | Performance / QA / Responsive Testing | Lighthouse ≥95 across Performance/Accessibility/Best-Practices/SEO on real pages, at every reference breakpoint, verified in an actual browser (not just static analysis). |
| 14 | Migration / Redirects | Legacy root-level static site retired; `web/` output takes over the domain; every legacy URL either continues to resolve or 301s correctly; legacy HTML/CSS/JS deleted from the repo (moved to git history, not disk). |
| 15 | Production Release Gate | Final go/no-go: build clean, all prior rounds' PASS criteria still hold, stakeholder sign-off on content accuracy. |

## Why this order

- **Content model (2) before Design System (3)**: a component library
  designed against guessed content shapes gets rebuilt once real
  journal/imprint data shows up with fields nobody planned for.
- **Design System (3) before Global Shell (4)**: the header/footer need
  real buttons, nav-item, and tag components to be built *from*, not
  bespoke one-off markup that then has to be reconciled with the system
  later.
- **Global Shell (4) before any page (5–10)**: every page needs the
  same header/footer/nav; building a page before the shell exists means
  redoing that page's chrome once the shell lands.
- **Multilingual System (11) after the English content exists (5–10)**:
  translating pages that don't exist yet, or that are still changing
  shape, means retranslating. The Round 1 i18n *architecture* (routing,
  RTL, typography) is proven early precisely so it doesn't block later
  rounds — but the *content* pipeline waits for stable English content.
- **SEO/Structured Data/A11y (12) and Performance/QA (13) after content
  is real (5–10)**: schema.org types and Lighthouse scores are only
  meaningful measured against actual pages, not a placeholder.
- **Migration (14) last, before the release gate**: nothing about the
  live site changes until there is a complete, audited replacement for
  all of it.

## Explicit non-goals for this roadmap

- The collective site does not reimplement OJS (`journals.panorama-sg.com`
  keeps operating independently — see project brief §2).
- No round compresses two or more rounds together to "move faster."
  If a future round's own report proposes merging steps, that's a
  decision to surface explicitly to the user, not to make silently.

## Immediate next step

Round 2 cannot start until the open decisions in
`ROUND-1-FOUNDATION-REPORT.md` §19 are resolved — most importantly the
uncommitted working-tree state described in Risk R1, since Round 2's
content-model work needs a trustworthy source for the legacy page
content it's modeling from.
