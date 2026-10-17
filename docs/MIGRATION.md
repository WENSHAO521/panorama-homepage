# Migration

Version 1 explicitly does **not** migrate bulk content (project brief
§31). This document records what the redirect audit found and what a
later round (Round 14, per `docs/rebuild/ROADMAP.md`) still needs to
decide before any of it goes live.

## What exists today

[`scripts/build_redirects.py`](../scripts/build_redirects.py)
enumerates all 119 legacy page URLs from git history and classifies
each into `web/src/data/redirects.json`:

| Type | Count | Meaning |
|---|---|---|
| `301` | 69 | Clear mapping to a route in the new IA |
| `410` | 0 | None yet formally retired — see below |
| `review` | 49 | Destination not yet decided |
| **Total** | **118** | (`404.html` excluded — not a redirect target) |

This is an **audit artifact**, not live redirect configuration. No
`_redirects` file, Cloudflare Pages redirect rule, or `astro.config.mjs`
redirect entry has been created from it yet — per project brief §29
("do not implement all redirects yet").

## Why 0 are marked `410`

Nothing was confidently classified as "safe to formally kill" during
this audit. Every legacy URL either has a clear successor (`301`) or
its successor is genuinely undecided (`review`) — including the
apparent "for-authors"/"editorial-board-application"/"indexing"
templates, which might become real pages, might fold into an existing
page, or might be intentionally retired. Marking any of them `410`
without that decision would risk silently dropping a historically
indexed URL, which the brief explicitly prohibits (§29).

## What's classified `review` and why

- **9 locale × `for-authors.html` / `editorial-board-application.html`
  / `indexing.html`** (27 of the 49) — same 3 base templates whose
  English destination is itself undecided (see below), multiplied
  across all 9 non-English locales.
- **English `for-authors.html` / `editorial-board-application.html`
  / `indexing.html`** (3) — no equivalent route exists yet in the new
  IA; each needs an IA decision (fold into `/standards/editorial/`?
  become its own route? link out to OJS?).
- **19 imprint sub-pages** (`*-about`, `*-editorial`,
  `*-for-authors`, `*-policies`, `*-contact`, `*-submit` per imprint,
  where they exist) — all tentatively point at their parent
  `/imprints/<slug>/` page, but whether each becomes a real section of
  that page or its own route is a Round 6 IA decision, not resolved
  here.
- `ridgeline-updates.html` — tentatively `/news/`, but whether
  imprint-specific updates fold into the general news feed or need
  their own filtered view is undecided.

## What's classified `301` with confidence

- All 5 imprint index pages → `/imprints/<slug>/`.
- The 3 Ridgeline journal pages that map 1:1 to a specific journal
  (`ridgeline-afs.html` → `/journals/afs/`, etc.) and
  `ridgeline-journals.html` → `/imprints/ridgeline/`.
- `index.html` → `/`, `about.html` → `/about/`, `contact.html` →
  `/about/contact/`, `privacy-policy.html` → `/privacy/`,
  `publication-ethics.html` → `/standards/ethics/`,
  `open-access-policy.html` → `/standards/open-access/` — and the same
  6 templates repeated for each of the 9 locale directories, retargeted
  to that locale's prefix (e.g. `/ar/about.html` → `/ar/about/`).

## Legacy `zh`/`zh-cn` correction

`zh/*.html` targets are remapped to `/zh-hant/...` and `zh-cn/*.html`
to `/zh-hans/...` — not a 1:1 string rename — because the legacy
scheme's bare `zh` (Traditional) vs. `zh-cn` (Simplified) pairing is
ambiguous without prior knowledge. See docs/I18N.md.

## What Round 14 still needs to do

1. Resolve the 49 `review` rules into either `301` or `410` (an IA
   decision, not a technical one).
2. Decide the actual redirect **mechanism** — Cloudflare Pages
   `_redirects` file (simple, static, recommended given the static
   Astro output) vs. `astro.config.mjs` `redirects` config (works at
   build time, produces real HTML meta-refresh/301 pages) vs. a
   Cloudflare dashboard rule set (not version-controlled — avoid, per
   "GitHub is the source of truth", project brief §2).
3. Re-verify each `301` target actually exists and returns 200 before
   cutover (some, like `/standards/editorial/`, are still placeholder
   content pages today — verified to resolve, not verified to be
   *finished* content).
4. Decide the legacy repository's own fate (still present in git
   history; the working tree already reflects the "images/logos only"
   state per explicit instruction) — whether to keep it as a
   `legacy-reference` tag/branch or let git history alone serve that
   purpose.
