# Migration

Version 1 explicitly does **not** migrate bulk content (project brief
§31). This document records how legacy page URLs are redirected to the
new site and which destinations still need an IA decision.

## What exists today

[`scripts/build_redirects.py`](../scripts/build_redirects.py)
enumerates all 119 legacy page URLs from git history, classifies each
into `web/src/data/redirects.json`, and generates the live Cloudflare
Pages rules in `web/public/_redirects` from it:

| Type | Count | Served as | Meaning |
|---|---|---|---|
| `301` | 73 | 301 | Clear mapping to a route in the new IA |
| `410` | 0 | — | None yet formally retired — see below |
| `review` | 45 | 302 | Tentative destination, not yet confirmed |
| **Total** | **118** | | (`404.html` excluded — not a redirect target) |

Each rule is emitted for both `foo.html` and the extensionless `/foo`
that Cloudflare Pages also served. Legacy `index.html` rules are skipped
where Pages already serves the same directory, and `/zh/*` and
`/zh-cn/*` catch-alls send anything else to `/zh-hant/` and
`/zh-hans/`. `review` rules are 302s so browsers don't cache a
destination that may still change; promote one to `301` in the script
once it is confirmed and regenerate.

Never edit `_redirects` by hand. After changing the script:

```
python scripts/build_redirects.py
cd web && npm run build && npm run test:redirects
```

`test:redirects` fails if any rule points at a page missing from
`dist/` or shadows a built page; CI runs it on every push.

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

Each has a tentative destination so no legacy URL 404s, served as a 302:

- **`for-authors.html`** (English + 9 locales) → `/standards/editorial/`.
  Could instead become its own route or link out to OJS.
- **`editorial-board-application.html`** (English + 9 locales) →
  `/about/contact/`. Could become a form, an OJS link, or be retired.
- **`indexing.html`** (English + 9 locales) → `/infrastructure/`; confirm it covers
  what the legacy indexing page listed.
- **14 imprint sub-pages** (`*-editorial`, `*-policies`, `*-contact`,
  `*-submit`, and `*-for-authors` for Ridgeline and Verdant Science) →
  their parent `/imprints/<slug>/`, since no matching sub-route exists.
- `ridgeline-updates.html` → `/news/`; an imprint-scoped news filter
  would be the alternative.

## What's classified `301` with confidence

- All 5 imprint index pages → `/imprints/<slug>/`, and imprint
  sub-pages whose route now exists: `ridgeline-about.html` →
  `/imprints/ridgeline/about/`, `ridgeline-journals.html` →
  `/imprints/ridgeline/journals/`, and `*-for-authors.html` →
  `/imprints/<slug>/for-authors/` for Charter, Health Nexus and Threnody.
- The 3 Ridgeline journal pages (`ridgeline-afs.html` etc.) → the
  journal's own OJS site (`https://journals.panorama-sg.com/<slug>`),
  since the new site has no per-journal pages.
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

## Still to decide

1. Confirm or change each `review` destination above, then promote it
   to `301` (or `410`) in the script.
2. Decide the legacy repository's own fate (still present in git
   history) — whether to keep a `legacy-reference` tag/branch or let
   git history alone serve that purpose.
