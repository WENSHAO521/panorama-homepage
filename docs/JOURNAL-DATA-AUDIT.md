# Journal & Imprint Data Audit — Version 3 (Round 6)

Source files: `web/src/data/journals.json` (25 records), `web/src/data/imprints.json` (5 records).

This audit inspects internal consistency of the existing dataset before any
journal-facing UI is built (project brief §3). It classifies each anomaly as
`confirmed`, `probable-error`, `requires-review`, or `legacy-alias`, per the
brief's taxonomy. **No record has been edited as a result of this audit** —
anomalies already flagged in the data's own `note` fields are carried
forward unchanged; nothing here is a silent correction.

## Summary

- 25 journal records: 24 `active`, 1 `retired` (GPPGR).
- Matches the "24 journals" figure already asserted in `site.ts`,
  `navigation.ts`, and the homepage.
- 5 imprint records, all referenced by at least one journal.
- No hard blockers: every anomaly found was already self-documented in the
  source data's `note` field from a prior round. This audit adds
  cross-checking and classification, not new discoveries.

## Per-field consistency check

| Field | Result |
|---|---|
| `id` | All unique. Casing is inconsistent by design (`PFR`, `HNDH`, `Silence`, `Res`, `CRoPT`) — these are the publisher's own OJS path segments/abbreviations, not a normalized scheme. Carried as-is: **confirmed**, not an error, since `journalUrl` path segments match this casing per journal (see below). |
| `slug` | All unique, all lowercase, all URL-safe. Independent of `id` (e.g. `id: "Res"` → `slug: "resonance"`, `id: "CRoPT"` → `slug: "cropt"`). This is intentional and correct: `slug` is the corporate-site routing key; `id` mirrors the OJS abbreviation. |
| title | All unique, all non-empty. |
| `shortTitle` | Two records have `shortTitle: null` (`Silence`, `Res`/Resonance) — both are single-word or already-short titles where an abbreviation wouldn't add information. **confirmed**, not missing data. |
| `issn` | 11 of 24 active journals have `issn: null` (PFR, HNDH, HNCBT, FSSS, SES, CSSR, IRELS, JPOII, GGSR, CPRT, JDES). No `eissn` field is populated on any record. **requires-review** as a publishing-standards matter (these should acquire ISSNs), but **not a data-entry defect** — nothing suggests a null should instead hold a real, unrecorded value. Rendered as absent, never as `ISSN: —` (project brief §23). |
| `imprint` | All 24 active + 1 retired record resolve to one of the 5 `imprints.json` `id` values. No orphaned imprint references. |
| `disciplines` | See taxonomy section below. |
| `status` | Only two values in use: `active` (24), `retired` (1 — GPPGR). The `forthcoming`/`archived` values allowed by the TypeScript union are unused; no forthcoming or archived journals exist in this dataset. |
| journal URL | See cross-check section below. |
| cover path | See cross-check section below. |
| open access | `openAccess: true` on all 25 records, including the retired GPPGR. No record claims OA falsely relative to any counter-evidence in the dataset — see §63 zero-inference policy below. |
| publication frequency | Not present in the dataset at all (no `frequency` field on any record). Not fabricated; simply omitted from the UI everywhere. |

## Cross-checks: journal URL ↔ slug ↔ cover filename ↔ title ↔ short title

Two confirmed mismatches, both **already flagged by name in the source
data's own `note` field** prior to this audit:

### 1. PEMR / REMR — `probable-error` (cover filename mismatch)

- `id`: `PEMR`, `slug`: `pemr`, title: "PoliEcoM Administration Review"
- `cover`: `/journals/covers/REMR.png`
- `journalUrl`: `.../index.php/PEMR` (consistent with `id`)
- The physical file at `web/public/journals/covers/REMR.png` exists; no
  `PEMR.png` file exists in that directory.
- Nothing in `id`, `slug`, or `title` produces the string "REMR" — it isn't
  an acronym of "PoliEcoM Administration Review" either (that would be
  "PAR" or "PMAR"). This looks like a leftover filename from an earlier
  journal title/abbreviation that was later renamed to PEMR without the
  image being re-exported/renamed to match.
- **Action taken: none.** The existing `note` field already carries this
  forward for publisher confirmation. Cover renders correctly today
  because the JSON path points at the real file — only the *filename*
  is inconsistent with the journal's own identifiers, which is a
  housekeeping/traceability risk, not a broken link.

### 2. GRHAS / GRAHS / "files" — `probable-error` (cover filename) + `requires-review` (URL path segment)

- `id`: `GRHAS`, `slug`: `grhas`, title: "Global Review of Humanities, Arts, & Society"
- `cover`: `/journals/covers/GRAHS.png` (letters transposed relative to `GRHAS`)
- `journalUrl`: `.../index.php/files` — the OJS path segment is the literal
  word "files", not an abbreviation of the title at all (expected
  something like `GRHAS` or `grhas`, matching every sibling journal's
  pattern of `id`-or-`slug`-as-path-segment).
- The cover filename mismatch is the same class of issue as PEMR/REMR
  (transposed letters, likely an earlier working title's initialism).
  The URL path segment ("files") is a different and more serious
  question: it suggests either (a) the journal was set up under a
  placeholder/internal OJS path that was never renamed before going
  live, or (b) "files" is intentional for a reason not visible in this
  dataset (e.g. a shared/merged OJS section). Both need publisher
  confirmation before this is treated as final.
- **Action taken: none.** Existing `note` field already flags both
  points; this audit confirms no additional inconsistency and doesn't
  guess which explanation is correct.

No other journal shows a slug/id/cover/URL mismatch. All other 22 active
journals have a cover filename and URL path segment that trace cleanly back
to `id` (case-insensitively) or an unambiguous abbreviation of the title.

## Additional records reviewed (not in the brief's example list)

### 3. GPPGR (retired) — `legacy-alias` relationship to GGSR

- `status: "retired"`, `cover: null`, kept in the dataset (not hard-deleted)
  specifically so `/journals/gppgr/` can render a "merged into GGSR"
  notice instead of 404ing.
- The record's own `note` states GGSR succeeds GPPGR's governance scope.
  This is **not** a `legacyAliases` relationship in the schema sense (GGSR
  does not list GPPGR as an alias, and the two have different `id`/`slug`
  pairs, different ISSNs — GGSR has none recorded, GPPGR has none either) —
  it is an editorial succession between two distinct journal records.
  Classified as `legacy-alias` at the **conceptual** level (a retired title
  whose scope lives on under a new title) while remaining two separate,
  non-merged data records. The journal detail page must make this
  succession explicit rather than just marking GPPGR retired in isolation
  (see docs/JOURNALS.md).

### 4. "Health Nexus" (journal, id `HN`) vs. "Health Nexus" (imprint) — `confirmed`, flagged by source data

- The journal's own `note` field already states: "Journal title is
  identical to the imprint name... kept as-is pending confirmation this is
  intentional." This audit finds no evidence either way and makes no
  correction. The journal detail and imprint pages must visually
  distinguish "Health Nexus (imprint)" from "Health Nexus (journal)" per
  project brief §30, since a visitor cannot be expected to infer the
  distinction from the name alone.

### 5. `submissionUrl` field — `requires-review` (mechanically derived, not independently verified)

- Every record's `submissionUrl` is exactly `journalUrl + "/submission"`.
  This is a suffix pattern applied uniformly, not a value captured
  per-journal from the publisher. Project brief §22 explicitly prohibits
  the corporate site from guessing submission routes ("Corporate site
  should not guess submission URLs") and §68's zero-fabrication policy
  extends to inferred operational details.
- **Decision: `submissionUrl` is present in the schema and data but is not
  surfaced as a CTA anywhere in Version 3.** The journal detail page's
  primary CTA is "Visit Journal Website" → `journalUrl` only (brief §22).
  This is a UI decision, not a data correction — the field is left in the
  dataset untouched in case a future round confirms these URLs are
  actually correct and wants to expose them.

## Discipline taxonomy audit (project brief §61)

All discipline strings across all 25 records, checked for casing/plural/
synonym drift (the brief's own worked examples — "Public Administration" vs.
"Public administration", "Environmental Science" vs. "Environmental
Sciences" — were checked for and **not found** in this dataset):

```
Arts, Computational Social Science, Dance Studies, Digital Health,
Education, Engineering, Environmental Science, Food Science, Governance,
Humanities, Law, Medical AI, Medicine, Multidisciplinary, Music,
Philosophy, Political Science, Public Policy, Religious Studies,
Sociology, Sport Science, Technology
```

22 distinct values, each used consistently (no near-duplicate casing,
pluralization, or synonym pairs). **No normalization applied** — there is
nothing to normalize. This audit is recorded so a future data update that
introduces a near-duplicate (e.g. someone later adding "Environmental
Sciences") can be checked against this baseline.

One cross-imprint note, not an error: `RGGD` (imprint: `verdant-science`)
carries the discipline `Governance`, which is also part of the `charter`
imprint's stated scope ("Policy, Law & Governance"). This is a legitimate
interdisciplinary journal (Rural Governance & Green Development), not a
misfiled imprint assignment — its primary discipline (`Environmental
Science`) matches Verdant Science's scope, and `Governance` is a secondary
cross-cutting discipline. Directory discipline filters must therefore be
non-exclusive (a journal can appear under more than one discipline filter
value), which the filter implementation in Version 3 does (see
docs/JOURNALS.md).

## Status taxonomy audit (project brief §62)

Only two machine values are used: `active`, `retired`. No arbitrary
human-readable variants (`"Current"`, `"Live"`, etc.) exist anywhere in the
dataset — the machine value and the directory's human-readable label are
already cleanly separated. The `forthcoming`/`archived` values in the
TypeScript union remain unused placeholders for future records; Version 3
does not invent data to populate them.

## Schema decision

The existing `Journal` type (`web/src/types/journal.ts`) already covers
every field with real data: `id`, `slug`, `title`, `shortTitle`, `imprint`,
`disciplines`, `issn`, `status`, `openAccess`, `description`, `cover`,
`journalUrl`, `submissionUrl`, `note`, `featured`. Per project brief §4
("do not add fields whose data is unknown merely to make the model appear
comprehensive"), Version 3 does **not** add `eissn`, `frequency`, or
`languages` — no record has this data, and the recommended schema in the
brief is explicitly a *ceiling*, not a requirement. `legacyAliases` is also
not added: GPPGR/GGSR is an editorial succession between two live records,
not an alias resolving to one canonical record (see §3 above), so the field
would not correctly model the relationship anyway.

The only schema change in Version 3 is additive and non-breaking: the
`status` union already includes `'forthcoming' | 'archived'` for future use
even though no current record uses them — left as-is, not removed, since
removing them would be a speculative narrowing with no data-driven reason
either way.

## Cover licensing status

Unchanged from Version 2: all 24 active-journal covers remain classified
`review-required` pending final licensing confirmation (see
docs/ASSET-AUDIT.md). Using them in the Version 3 journal directory and
detail pages does not change or imply their licensing status — this is
development/staging use, not a publication decision.
