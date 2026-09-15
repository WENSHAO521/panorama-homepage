# Asset Audit

This is the completed migration audit recorded in
[`web/src/data/assets-manifest.json`](../web/src/data/assets-manifest.json).
The legacy asset directories (`assets/`, `Homepage Image/`, `QKFM/`, and
the root favicons) were read during migration, then their approved copies
were verified in `web/public/` and `web/src/assets/`. The former
`Homepage Image/` files were replaced with optimized, stable JPEG assets under
`web/public/images/publishing/journal-heroes/`; external references should use
those new paths.

The inventory below remains useful for provenance, licensing review, and
future asset replacement decisions. It is a record of the migration rather
than a command to re-copy files from the retired legacy directories.

## Counts

| Status | Count | Meaning |
|---|---|---|
| preserve | 43 | Official/brand/factual asset, migrated as-is |
| review | 39 | Migrated and usable, but needs licensing / optimization / art-direction-fit confirmation before production use |
| replace | 0 | Reserved for assets a future round explicitly supersedes — none identified yet |
| archive | 0 | None found warranting historical-only retention |
| discard | 1 | Exact duplicate, not migrated |
| **Total** | **83 files, 35.49 MB** | |

## Classification by category

| Category | Examples | Destination |
|---|---|---|
| `corporate-logo` | PSG wordmark (4K SVG), `logo.svg`/`logo-dark.svg`, 5 PSG platform marks (Books/Journals/POSI/Research Institute/Editorial Directory) | `public/brand/psg/` |
| `imprint-logo` | 5 imprints × light/dark SVG | `public/brand/imprints/<slug>/` |
| `partner-logo` | Taoist Association of Korea, one unidentified library mark | `public/partners/` |
| `indexing-logo` | Crossref, DOI Foundation, Dimensions, Google Scholar, ISNI, ISSN, LOCKSS/CLOCKSS, OpenAIRE, OpenAlex, PKP, Semantic Scholar, ZDB, Zenodo, BASE, PLOS OA, CJWK | `public/indexes/` |
| `journal-cover` | 24 journal covers (see docs/DATA-MODEL.md for the id↔cover mapping) | `public/journals/covers/` |
| `corporate-image` | 5 imprint 4K wallpapers, 7 optimized per-journal hero photos, 1 editorial stock photo | `public/images/publishing/`, `public/images/corporate/` |
| `favicon` | `favicon.svg`, `favicon.png` | `public/favicon/` |
| `other` | `screen.png` (unclear purpose — not migrated) | not migrated |

## Flagged items (need a human decision before production use)

- **`assets/logos/screen.png`** — status `review`, category `other`,
  **not copied** into `public/`. No reference to it was found anywhere
  in the audited legacy HTML. Confirm an owner/use case before Round 3,
  otherwise it should move to `discard`.
- **`assets/logos/journals-logo.svg`** — 223 KB, implausible for a
  vector mark (indicates embedded raster data). Migrated as-is to
  `public/brand/psg/platforms/` but flagged `review`; re-export as an
  optimized vector before shipping.
- **5 imprint wallpapers + 7 journal homepage photos + 1 editorial
  stock photo** — all `review`; the journal homepage photos are now
  optimized JPEG derivatives. Licensing
  chain-of-custody was not confirmed during this audit (no license
  file or attribution record was found in the legacy repository).
  Migrated so later rounds have real imagery to lay out against, but
  **do not ship to production** until rights are confirmed — re-encode
  to WebP/AVIF at that point too.
- **24 journal covers** — same "usable now, confirm rights before
  production" status as above, plus two known data-quality issues
  carried forward verbatim rather than silently fixed (see
  docs/DATA-MODEL.md): `PEMR`'s cover file is named `REMR.png`, and
  `GRHAS`'s cover file is named `GRAHS.png`.
- **`QKFM/panorama-scholarly-group-uppercase-wordmark-4k.svg`** vs.
  **`QKFM/Taoist Association of Korea.png`** — the wordmark is the
  sole copy of that asset (kept, `preserve`); the Taoist Association
  mark is an exact duplicate of `assets/logos/taoist-association-korea-logo.png`
  and was **not** migrated a second time (status `discard`) — the
  `assets/logos/` copy is canonical.
- **Partner identity gaps.** `QKFM/library-logo.png` carries no
  identifying text anywhere in the legacy repository. It was migrated
  (status `review`) but `web/src/data/partners.json` explicitly labels
  it "Unidentified library partner" and instructs against displaying
  it until identified — see docs/DATA-MODEL.md. Likewise `CJWK.png`'s
  real organisation name/URL could not be confirmed.

## Logo decision (Version 2)

Two candidate PSG logo assets exist in `public/brand/psg/`:

- `logo.svg` / `logo-dark.svg` — a square (400×400) "PSG" monogram with
  baked-in `<text>` elements ("PSG" + "PANORAMA SCHOLARLY GROUP") in a
  generic Arial-family font, filled with `#E30613`/`#CC0000` (a red not
  present anywhere in the approved Midnight Navy/Warm Paper/Academic
  Blue/Deep Teal/Gold palette) and a source-code comment literally
  describing it as "typical of German design" — every signal here
  (off-palette colour, unstyled system font, a comment describing a
  generic aesthetic rather than a brand rationale) reads as a
  placeholder asset, not an approved production mark.
- `panorama-scholarly-group-uppercase-wordmark-4k.svg` — a proper
  minimalist uppercase wordmark ("PANORAMA" bold + "SCHOLARLY" regular
  + "GROUP" italic, monochrome greys `#111111`/`#5E5E5E`/`#929292`),
  already identified in the Round 1 asset manifest as "Highest-priority
  brand asset."

**Decision**: `components/ui/Logo.astro` uses the wordmark, not the
monogram, as the site's only logo (header and footer). The monogram is
left in `public/` (not deleted — still an approved-for-preservation
asset per the Round 1 manifest) but is not used in Version 2; a real
design review of it is recommended before any future use.

**A real technical problem with the wordmark, found and fixed, not
silently worked around:** its `viewBox="0 0 3840 2160"` is far taller
than the actual text it contains (the three words sit on one baseline
near vertical-centre, at font-sizes far smaller than the 2160px canvas
height) — rendered at a typical header height via `<img>`, this would
show mostly the empty margin and a nearly invisible sliver of text.
`Logo.astro` inlines the file's raw SVG markup (`?raw` import of a copy
kept at `web/src/assets/brand/wordmark.svg` for Vite's benefit — the
original in `public/` is untouched) and rewrites only the `viewBox`
attribute to `"0 930 3840 320"`, cropping to the real ink bounding box.
**No shape, colour, typography, or spacing in the mark itself was
changed** — this is a presentation-layer crop, the same kind of
adjustment as setting `object-position` on a photograph, not a
redesign of the logo (which project brief §10 explicitly prohibits).

**A second real problem, found via visual QA screenshots at 320/360px
and fixed:** the wordmark's cropped aspect ratio is an unusually wide
~12:1. Sizing it by a fixed *height* (typical for a header logo) made
its automatic minimum width (a CSS flexbox rule for elements with a
definite aspect ratio) wider than small phone viewports, causing real
horizontal overflow. Fixed by sizing the logo by *width* instead
(7.5rem mobile / 10rem ≥480px / 12.5rem ≥1024px), letting height follow
the aspect ratio automatically. See docs/HOMEPAGE.md for the full bug
list and docs/NAVIGATION.md.

**No dark-background variant of the wordmark exists** (its fills are
fixed dark greys, not `currentColor`), and none was invented. This is
exactly why the footer stays on a light surface (`--surface-secondary`)
rather than the inverse/navy surface a footer might otherwise
default to — see `components/global/Footer.astro`'s own comment.

## Homepage image-usage classification (project brief §46)

| Asset | Where used | Status |
|---|---|---|
| PSG wordmark (cropped, see above) | Header, footer | **approved** — PSG's own primary brand mark |
| 5 imprint logos (`brand/imprints/*/`) | Homepage imprint tiles | **approved** — official imprint marks (Round 1 manifest: preserve) |
| 5 featured journal covers (`journals/covers/*.png`) | Homepage featured-journals cards | **review-required** — status unchanged from the Round 1 manifest (copyright/continued-use not confirmed); used here because project brief §24 explicitly expects covers on journal cards, and §46 permits `review-required` imagery when classified as such, distinct from §20's stronger "no `review`-status imagery" rule for the *hero* specifically |
| Imprint wallpapers, per-journal homepage photography, editorial stock photo | **not used anywhere in Version 2** | n/a — excluded from the hero specifically per project brief §20; no other homepage section calls for full photography |
| Hero visual | Homepage hero | **owned/generated** — inline SVG built from already-approved token colours, not an image file at all |

## Asset categories not requested by the brief but discovered

None beyond the eight categories in project brief §7 (`corporate-logo`,
`imprint-logo`, `journal-cover`, `corporate-image`, `partner-logo`,
`indexing-logo`, `icon`, `illustration`, `favicon`, `other`) were
needed — every real file fit one of `corporate-logo`, `imprint-logo`,
`journal-cover`, `corporate-image`, `partner-logo`, `indexing-logo`,
`favicon`, or `other`. No `icon` (UI icon set) or `illustration`
category assets exist in the legacy repository.
