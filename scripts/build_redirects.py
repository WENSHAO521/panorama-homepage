"""
Version 1 -- Greenfield Static Rebuild Foundation
Redirect audit generator.

Enumerates every legacy page URL (root + 9 locale-duplicate directories,
119 files total) from this repo's own git history (the files were
removed from the working tree per the user's explicit "keep only images/
logos" instruction, but remain fully recoverable via `git show HEAD:<path>`
-- nothing is silently dropped from the audit because it no longer sits
on disk).

Classifies each as:
  301    -- clear 1:1 (or many:1) mapping to a route in the new IA
  410    -- no successor planned, safe to formally retire
  review -- destination not yet decided; needs a Round 2/6 IA call

Writes web/src/data/redirects.json.
"""
import json
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)

# filename -> (to | None, type, notes | None)
BASE_RULES = {
    "index.html": ("/", 301, None),
    "about.html": ("/about/", 301, None),
    "contact.html": ("/about/contact/", 301, None),
    "privacy-policy.html": ("/privacy/", 301, None),
    "publication-ethics.html": ("/standards/ethics/", 301, None),
    "open-access-policy.html": ("/standards/open-access/", 301, None),
    "editorial-board-application.html": (
        None, "review",
        "No equivalent route planned yet -- decide whether this becomes a "
        "form, an external OJS/editorial-system link, or is retired.",
    ),
    "for-authors.html": (
        None, "review",
        "General 'for authors' guidance; likely folds into /standards/editorial/ "
        "or a per-imprint page. Needs an IA decision.",
    ),
    "indexing.html": (
        "/infrastructure/", "review",
        "Legacy page listed indexing/database partners. Tentatively mapped to "
        "/infrastructure/; confirm during Round 9 (Infrastructure/POSI/Standards).",
    ),
}

IMPRINT_RULES = {
    "ridgeline.html": ("/imprints/ridgeline/", 301, None),
    "ridgeline-about.html": ("/imprints/ridgeline/", "review", None),
    "ridgeline-editorial.html": ("/imprints/ridgeline/", "review", None),
    "ridgeline-for-authors.html": ("/imprints/ridgeline/", "review", None),
    "ridgeline-policies.html": ("/imprints/ridgeline/", "review", None),
    "ridgeline-contact.html": ("/imprints/ridgeline/", "review", None),
    "ridgeline-submit.html": ("/imprints/ridgeline/", "review", None),
    "ridgeline-updates.html": ("/news/", "review",
        "Imprint-specific updates feed; decide whether it folds into /news/ or "
        "becomes an imprint-scoped news filter."),
    "ridgeline-journals.html": ("/imprints/ridgeline/", 301, None),
    "ridgeline-afs.html": ("/journals/afs/", 301, None),
    "ridgeline-jesa.html": ("/journals/jesa/", 301, None),
    "ridgeline-pfr.html": ("/journals/pfr/", 301, None),

    "health-nexus.html": ("/imprints/health-nexus/", 301, None),
    "health-nexus-editorial.html": ("/imprints/health-nexus/", "review", None),
    "health-nexus-for-authors.html": ("/imprints/health-nexus/", "review", None),
    "health-nexus-policies.html": ("/imprints/health-nexus/", "review", None),

    "verdant-science.html": ("/imprints/verdant-science/", 301, None),
    "verdant-science-editorial.html": ("/imprints/verdant-science/", "review", None),
    "verdant-science-for-authors.html": ("/imprints/verdant-science/", "review", None),
    "verdant-science-policies.html": ("/imprints/verdant-science/", "review", None),

    "charter.html": ("/imprints/charter/", 301, None),
    "charter-editorial.html": ("/imprints/charter/", "review", None),
    "charter-for-authors.html": ("/imprints/charter/", "review", None),
    "charter-policies.html": ("/imprints/charter/", "review", None),

    "threnody.html": ("/imprints/threnody/", 301, None),
    "threnody-editorial.html": ("/imprints/threnody/", "review", None),
    "threnody-for-authors.html": ("/imprints/threnody/", "review", None),
    "threnody-policies.html": ("/imprints/threnody/", "review", None),
}

# legacy directory name -> new locale code (see docs/I18N.md for why
# legacy zh/zh-cn is corrected to zh-hant/zh-hans)
LOCALE_DIR_MAP = {
    "ar": "ar", "de": "de", "es": "es", "fr": "fr", "ja": "ja",
    "ko": "ko", "ru": "ru", "zh": "zh-hant", "zh-cn": "zh-hans",
}

LOCALE_PAGES = [
    "about.html", "contact.html", "editorial-board-application.html",
    "for-authors.html", "index.html", "indexing.html",
    "open-access-policy.html", "privacy-policy.html", "publication-ethics.html",
]

rules = []

for filename, (to, typ, notes) in BASE_RULES.items():
    rules.append({"from": "/" + filename, "to": to, "type": typ, "notes": notes})

for filename, (to, typ, notes) in IMPRINT_RULES.items():
    rules.append({"from": "/" + filename, "to": to, "type": typ, "notes": notes})

for legacy_dir, new_locale in LOCALE_DIR_MAP.items():
    for filename in LOCALE_PAGES:
        to, typ, notes = BASE_RULES[filename]
        localized_to = None
        if to == "/":
            localized_to = f"/{new_locale}/"
        elif to is not None:
            localized_to = f"/{new_locale}{to}"
        loc_note = notes
        if legacy_dir in ("zh", "zh-cn"):
            corr = (
                f"Legacy locale directory '{legacy_dir}/' remapped to '{new_locale}' "
                "-- legacy used bare 'zh' for Traditional and 'zh-cn' for Simplified, "
                "which this rebuild's i18n/config.ts makes explicit as zh-hant/zh-hans."
            )
            loc_note = (loc_note + " " + corr) if loc_note else corr
        rules.append({
            "from": f"/{legacy_dir}/{filename}",
            "to": localized_to,
            "type": typ,
            "notes": loc_note,
        })

rules.sort(key=lambda r: r["from"])

manifest = {
    "generatedBy": "scripts/build_redirects.py",
    "generatedFor": "Version 1 -- Greenfield Static Rebuild Foundation",
    "schemaNotes": (
        "type 301 = confirmed permanent redirect to a route in the new IA; "
        "410 = confirmed gone, no successor; review = destination not yet "
        "decided, needs a product/IA call before Round 14 (Migration/Redirects) "
        "wires these into the actual Cloudflare redirect rules. This file is an "
        "AUDIT, not yet live redirect configuration -- see docs/MIGRATION.md."
    ),
    "counts": {
        "total": len(rules),
        "301": sum(1 for r in rules if r["type"] == 301),
        "410": sum(1 for r in rules if r["type"] == 410),
        "review": sum(1 for r in rules if r["type"] == "review"),
    },
    "rules": rules,
}

out_path = os.path.join("web", "src", "data", "redirects.json")
os.makedirs(os.path.dirname(out_path), exist_ok=True)
with open(out_path, "w", encoding="utf-8") as fh:
    json.dump(manifest, fh, indent=2, ensure_ascii=False)
    fh.write("\n")

print(json.dumps(manifest["counts"], indent=2))
print("Wrote", out_path, "with", len(rules), "rules")
