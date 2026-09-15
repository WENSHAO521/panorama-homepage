# Information Architecture

## Corporate structure

```
Panorama Scholarly Group                         (Group)
├── Scholarly Publishing                         (Division)
│   ├── Ridgeline                                 (Imprint)
│   ├── Health Nexus                              (Imprint)
│   ├── Verdant Science                           (Imprint)
│   ├── Charter                                   (Imprint)
│   └── Threnody                                  (Imprint)
│       └── 24 Journals                           (Journal), each belonging to exactly one imprint
├── Panorama Research Institute                   (Division / independent Platform at research.panorama-sg.com)
├── Scholarly Infrastructure                      (Division; POSI is an independent Platform at posi.panorama-sg.com)
└── Partnerships                                  (cross-cutting, not a separate route tree)
```

Encoded as data, not just prose: `web/src/data/site.ts`
(`corporateStructure`), `web/src/data/imprints.json` (5 imprints),
`web/src/data/journals.json` (24 journals, each with an `imprint`
foreign key). `Journal.imprint` is a required field precisely so a
journal can never be orphaned from — or visually confused with — its
imprint or the Group itself. Books (`web/src/data/books.json`, see
docs/DATA-MODEL.md) are a fifth entity type, distinct from Journal, and
Platforms/Projects (OJS, POSI, Research Institute, Books, Profiles,
Credentials) are tracked as `externalSystems`, never rendered as if
they were PSG sub-organisations.

## Route map

Built in Version 1 (English/default locale; static, real data-backed):

| Route | Source |
|---|---|
| `/` | Real homepage (Version 2) — see docs/HOMEPAGE.md. The Round 1 token/layout specimens moved to `/specimen/*`, opted out of the global shell. |
| `/publishing/` | lists all 5 imprints |
| `/journals/` | lists 23 active journals (1 retired journal excluded from the listing but its page still resolves) |
| `/journals/<slug>/` | one static page per journal (24 total, incl. the retired one with a retirement notice) |
| `/imprints/` | lists all 5 imprints |
| `/imprints/<slug>/` | one static page per imprint (5 total), listing its active journals |
| `/books/` | empty-state page (no book records exist yet) |
| `/research/` | links to `research.panorama-sg.com` |
| `/infrastructure/` | links to `posi.panorama-sg.com`, lists indexing/archiving partners |
| `/standards/` | professional standards overview linking to Editorial Standards, Publication Ethics, Open Access Policy, and Accessibility |
| `/standards/editorial/` | editorial standards for journals, books, and scholarly works |
| `/standards/ethics/` | placeholder (redirect target for legacy `publication-ethics.html`) |
| `/standards/open-access/` | placeholder (redirect target for legacy `open-access-policy.html`) |
| `/news/` | empty-state page (news Content Collection has 0 entries) |
| `/news/<slug>/` | dynamic route wired to the `news` Content Collection; resolves 0 pages today by construction |
| `/about/` | index linking to the 2 sub-pages below |
| `/about/governance/` | placeholder |
| `/about/contact/` | real contact email + registered address (from legacy JSON-LD) |
| `/privacy/` | placeholder (redirect target for legacy `privacy-policy.html`) |
| `/terms/` | placeholder — **no legacy equivalent exists**, stated explicitly rather than fabricated |
| `/accessibility/` | placeholder — explicitly states a real statement can't be published before the Round 12 audit runs |
| `/search/` | placeholder, `noindex` — not implemented (project brief §32) |

Every route above renders via `PageLayout`/`EditorialLayout`/`PolicyLayout`
over `BaseLayout`, which as of Version 2 wraps every page in the real
`Header`/`Footer` (see docs/NAVIGATION.md) — so every route in this
table gained working global navigation "for free" once the shell was
built, without any of these page files changing.

## Navigation data

Single source of truth: `web/src/data/navigation.ts`. As of Version 2:

- `primaryNav` — the 7 header items (Publishing, Research,
  Infrastructure, Books, Standards, News, About). Four carry `children`
  and render as mega-menu dropdowns; see docs/NAVIGATION.md for the
  full per-category content and why "Index" doesn't appear anywhere.
- `utilityNav` — Journals, Search (Language is handled by
  `web/src/i18n/config.ts`'s locale table via `LanguageSwitcher.astro`,
  not a nav-item array).
- `footerGroups` — 5 titled groups for the footer (Publishing,
  Research, Infrastructure, Standards, Group) — replaces the flat
  `footerNav` placeholder from Version 1, which nothing had consumed
  yet.
- `legalNav` — Privacy/Terms/Accessibility, used only in the footer's
  legal line.

No component hard-codes a nav label or path — `Header.astro`,
`Footer.astro`, `DesktopNav.astro`, and `MobileMenu.astro` all read
from this one file.
