"""
Version 1 -- Greenfield Static Rebuild Foundation
Asset audit + migration script.

Reads the preserved legacy asset directories (assets/, Homepage Image/,
QKFM/, root favicons) -- none of which were deleted when the legacy
HTML/CSS/JS was removed -- classifies every file, and COPIES (never
moves, never deletes, never edits) files with status "preserve" or
"review" into the new destination structure under web/public/.

Writes web/src/data/assets-manifest.json (schema: originalPath, newPath,
filename, category, format, dimensions, fileSize, status, notes).

Re-runnable at any time; original files are opened read-only.
"""
import json
import os
import shutil
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)

PUBLIC = os.path.join("web", "public")
MANIFEST_OUT = os.path.join("web", "src", "data", "assets-manifest.json")

# ---------------------------------------------------------------------------
# Classification tables (facts gathered from the legacy repo before its
# HTML/CSS/JS were removed; see docs/LEGACY-AUDIT.md)
# ---------------------------------------------------------------------------

INDEXING_LOGOS = {
    "Crossref.svg", "DNB.svg", "DOI_Foundation.png", "Dimensions.png",
    "Google_Scholar.png", "ISNI.png", "ISSN.png", "LOCKSS.png", "CLOCKSS.png",
    "OpenAIRE.svg", "OpenAlex.png", "PKP.svg", "Semantic_Scholar.png",
    "ZDB.gif", "Zenodo.svg", "BASE.png", "oa-plos-transparent.svg",
    "CJWK.png",
}

PARTNER_LOGOS = {
    "library-logo.png", "Taoist Association of Korea.png",
    "taoist-association-korea-logo.png",
}

JOURNAL_COVERS = {
    "AFS.png", "CPRT.png", "CRoPT.png", "CSGS.png", "CSSR.png", "FSSS.png",
    "GGSR.png", "GRAHS.png", "HNCBT.png", "HNDH.png", "HealthNexus.png",
    "IRELS.png", "JDES.png", "JESA.png", "JLPCS.png", "JPOII.png",
    "JSCC.png", "PFR.png", "REMR.png", "RESONANCE.png", "RGGD.png",
    "SES.png", "Silence.png", "TTS.png",
}

PSG_PLATFORM_LOGOS = {
    "books-logo.svg": "books", "books-logo-light.svg": "books",
    "journals-logo.svg": "journals", "journals-logo-light.svg": "journals",
    "posi-logo.svg": "posi", "posi-logo-light.svg": "posi",
    "research-institute-logo.svg": "research-institute",
    "editorial-directory-logo.png": "editorial-directory",
    "editorial-directory-logo-transparent.png": "editorial-directory",
}

IMPRINT_SLUGS = {
    "ridgeline": "ridgeline", "health-nexus": "health-nexus",
    "verdant-science": "verdant-science", "charter": "charter",
    "threnody": "threnody",
}

DUPLICATES = {
    "QKFM/Taoist Association of Korea.png": "assets/logos/taoist-association-korea-logo.png",
    "QKFM/panorama-scholarly-group-uppercase-wordmark-4k.svg": "QKFM/panorama-scholarly-group-uppercase-wordmark-4k.svg",
}

entries = []


def imprint_slug_from_nexus_filename(filename):
    for slug in IMPRINT_SLUGS:
        if filename.startswith(slug + "-logo"):
            return slug
    return None


def classify(rel, filename, size_kb):
    """Returns (status, category, dest_subdir, notes)."""

    if rel == "QKFM/Taoist Association of Korea.png":
        return ("discard", "other", None,
                "Exact duplicate of assets/logos/taoist-association-korea-logo.png. "
                "Canonical copy lives under assets/logos/; this copy is not migrated.")

    if rel == "QKFM/panorama-scholarly-group-uppercase-wordmark-4k.svg":
        return ("preserve", "corporate-logo", "brand/psg",
                "Primary PSG uppercase wordmark, 4K vector. Only copy of this file "
                "(QKFM/ and formerly-duplicated locations both resolve here).")

    if filename == "screen.png":
        return ("review", "other", None,
                "Purpose unclear from filename alone; not referenced by any legacy "
                "page discovered during the audit. Not migrated pending confirmation "
                "-- archive if no owner claims it before Round 2.")

    if filename == "journals-logo.svg" and size_kb > 100:
        return ("review", "corporate-logo", "brand/psg/platforms",
                "SVG is %.0f KB -- unusually large for a vector mark, indicates "
                "embedded raster data. Migrated as-is; re-export as optimized "
                "vector before production use." % size_kb)

    if rel.startswith("assets/logos/"):
        if filename in PSG_PLATFORM_LOGOS:
            return ("preserve", "corporate-logo", "brand/psg/platforms",
                    "PSG platform/division mark (%s)." % PSG_PLATFORM_LOGOS[filename])
        if filename in PARTNER_LOGOS:
            return ("preserve", "partner-logo", "partners",
                    "Third-party partner mark; usage governed by that partner's own brand guidelines.")
        return ("preserve", "corporate-logo", "brand/psg",
                "Official PSG corporate mark.")

    if rel.startswith("assets/nexus/"):
        slug = imprint_slug_from_nexus_filename(filename)
        return ("preserve", "imprint-logo", "brand/imprints/" + (slug or "misc"),
                "Official imprint mark for %s." % (slug or "unknown imprint"))

    if rel.startswith("assets/wallpapers/"):
        return ("review", "corporate-image", "images/publishing",
                "4K full-bleed imprint wallpaper (%.1f MB). Licensing chain-of-custody "
                "not confirmed; migrated for layout/placeholder use only -- re-encode "
                "to WebP/AVIF and confirm rights before shipping to production."
                % (size_kb / 1024))

    if rel.startswith("Homepage Image/"):
        return ("review", "corporate-image", "images/publishing",
                "Per-journal homepage/hero photography (%.1f KB). Licensing not "
                "confirmed; migrated for placeholder use, needs WebP/AVIF re-encode "
                "and art-direction fit check before production use." % size_kb)

    if filename in INDEXING_LOGOS:
        return ("preserve", "indexing-logo", "indexes",
                "Third-party indexing/archiving partner mark. Not PSG IP -- display "
                "for factual indexing purposes only, do not restyle.")

    if filename in PARTNER_LOGOS:
        return ("preserve", "partner-logo", "partners",
                "Third-party partner/institutional mark. Usage governed by partner's own brand guidelines.")

    if filename in JOURNAL_COVERS:
        return ("review", "journal-cover", "journals/covers",
                "Journal cover artwork (%.0f KB). Copyright ownership/continued-use "
                "confirmation pending; migrated so Round 6 (journals) has real cover "
                "art to lay out against -- convert to WebP/AVIF with responsive sizes "
                "before production." % size_kb)

    if filename == "Scholarly_Integrity.jpg":
        return ("review", "corporate-image", "images/corporate",
                "Editorial stock photograph. License terms not confirmed before reuse.")

    return ("review", "other", None, "Unclassified asset -- needs manual review before reuse.")


def scan(dirs):
    for d in dirs:
        if not os.path.isdir(d):
            continue
        for root, _, files in os.walk(d):
            for f in files:
                path = os.path.join(root, f)
                rel = path.replace("\\", "/")
                size_kb = round(os.path.getsize(path) / 1024, 1)
                ext = os.path.splitext(f)[1].lower().lstrip(".")
                dims = None
                if ext in ("jpg", "jpeg", "png", "gif", "webp"):
                    try:
                        with Image.open(path) as im:
                            dims = list(im.size)
                    except Exception:
                        dims = None

                status, category, dest_subdir, notes = classify(rel, f, size_kb)

                new_path = None
                if status in ("preserve", "review") and dest_subdir:
                    new_path = "web/public/" + dest_subdir + "/" + f
                    dest_dir = os.path.join(PUBLIC, *dest_subdir.split("/"))
                    os.makedirs(dest_dir, exist_ok=True)
                    shutil.copy2(path, os.path.join(dest_dir, f))

                entries.append({
                    "originalPath": rel,
                    "newPath": new_path,
                    "filename": f,
                    "category": category,
                    "format": ext,
                    "dimensions": dims,
                    "fileSizeKb": size_kb,
                    "status": status,
                    "notes": notes,
                })


scan(["assets", "Homepage Image", "QKFM"])

for f, notes in [
    ("favicon.svg", "Official favicon, vector. Site-wide."),
    ("favicon.png", "Official favicon, raster fallback."),
]:
    if os.path.exists(f):
        size_kb = round(os.path.getsize(f) / 1024, 1)
        ext = os.path.splitext(f)[1].lstrip(".")
        dims = None
        if ext == "png":
            try:
                with Image.open(f) as im:
                    dims = list(im.size)
            except Exception:
                pass
        dest_dir = os.path.join(PUBLIC, "favicon")
        os.makedirs(dest_dir, exist_ok=True)
        shutil.copy2(f, os.path.join(dest_dir, f))
        entries.append({
            "originalPath": f,
            "newPath": "web/public/favicon/" + f,
            "filename": f,
            "category": "favicon",
            "format": ext,
            "dimensions": dims,
            "fileSizeKb": size_kb,
            "status": "preserve",
            "notes": notes,
        })

entries.sort(key=lambda e: (e["status"] != "preserve", e["category"], e["originalPath"]))

manifest = {
    "generatedBy": "scripts/build_assets_manifest.py",
    "generatedFor": "Version 1 -- Greenfield Static Rebuild Foundation",
    "schemaNotes": (
        "status: preserve = official/brand/factual asset, migrated as-is; "
        "review = migrated and usable but needs licensing/optimization/fit "
        "confirmation before production use; discard = duplicate or superseded, "
        "not migrated. 'replace' is reserved for assets a future round explicitly "
        "supersedes with new artwork -- none identified yet."
    ),
    "counts": {
        "total": len(entries),
        "preserve": sum(1 for e in entries if e["status"] == "preserve"),
        "review": sum(1 for e in entries if e["status"] == "review"),
        "replace": sum(1 for e in entries if e["status"] == "replace"),
        "archive": sum(1 for e in entries if e["status"] == "archive"),
        "discard": sum(1 for e in entries if e["status"] == "discard"),
    },
    "totalSizeMb": round(sum(e["fileSizeKb"] for e in entries) / 1024, 2),
    "assets": entries,
}

os.makedirs(os.path.dirname(MANIFEST_OUT), exist_ok=True)
with open(MANIFEST_OUT, "w", encoding="utf-8") as fh:
    json.dump(manifest, fh, indent=2, ensure_ascii=False)
    fh.write("\n")

print(json.dumps(manifest["counts"], indent=2))
print("Total size MB:", manifest["totalSizeMb"])
print("Wrote", MANIFEST_OUT, "with", len(entries), "entries")
