"""
Refreshes data/articles.json with the latest published articles across the
Panorama Scholarly Group journal portfolio, sourced from the Crossref REST
API (https://api.crossref.org/journals/{issn}/works) rather than by
crawling the OJS journal pages directly. Crossref has no Cloudflare
challenge and already carries everything the homepage needs (title,
authors, abstract, DOI, and the canonical article landing-page URL), so
this replaces the previous PowerShell HTML scraper.

Journals whose ISSN is still "Pending" have no Crossref-registered DOIs
yet and are skipped automatically.
"""

import json
import os
import random
import re
import time
from datetime import date, datetime, timezone

import requests

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
JOURNALS_PATH = os.path.join(ROOT_DIR, "data", "journals.json")
OUTPUT_PATH = os.path.join(ROOT_DIR, "data", "articles.json")

ROWS_PER_JOURNAL = 5
POOL_LIMIT = 60
SELECTED_LIMIT = 18
REQUEST_DELAY_SECONDS = 1


def load_active_journals():
    with open(JOURNALS_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)
    journals = []
    for j in data.get("journals", []):
        issn = j.get("issn", "")
        if not issn or issn == "Pending":
            continue
        journals.append({
            "title": j.get("title", ""),
            "slug": j.get("slug") or j.get("journalUrl", "").rstrip("/").split("/")[-1],
            "issn": issn,
            "journalUrl": j.get("journalUrl", ""),
        })
    return journals


def strip_jats(value):
    if not value:
        return ""
    text = re.sub(r"</?jats:[^>]+>", "", value)
    text = re.sub(r"\s+", " ", text).strip()
    return text


def format_authors(author_list):
    names = []
    for a in author_list or []:
        family = (a.get("family") or "").strip()
        given = (a.get("given") or "").strip()
        if family and given:
            names.append(f"{family}, {given}")
        elif family or given:
            names.append(family or given)
    return names


def date_parts_to_iso(node):
    if not node:
        return ""
    parts = node.get("date-parts", [[]])
    if not parts or not parts[0]:
        return ""
    p = parts[0]
    y = p[0] if len(p) > 0 else None
    m = p[1] if len(p) > 1 else 1
    d = p[2] if len(p) > 2 else 1
    if not y:
        return ""
    try:
        return date(y, m, d).isoformat()
    except ValueError:
        return f"{y:04d}"


def normalize_item(item, journal):
    doi = item.get("DOI", "")
    title_list = item.get("title") or []
    title = title_list[0] if title_list else ""
    if not title or not doi:
        return None

    published = date_parts_to_iso(item.get("published") or item.get("issued"))
    url = ((item.get("resource") or {}).get("primary") or {}).get("URL") or f"https://doi.org/{doi}"
    volume = item.get("volume", "")
    issue_no = item.get("issue", "")
    issue = f"Vol. {volume}, No. {issue_no}" if (volume or issue_no) else ""

    return {
        "title": title,
        "authors": format_authors(item.get("author")),
        "journal": journal["title"],
        "journalSlug": journal["slug"],
        "journalUrl": journal["journalUrl"],
        "issue": issue,
        "pages": item.get("page", ""),
        "publishedAt": published,
        "url": url,
        "doi": doi,
        "abstract": strip_jats(item.get("abstract", "")),
    }


def fetch_journal_works(journal, email):
    base_url = f"https://api.crossref.org/journals/{journal['issn']}/works"
    params = {
        "sort": "published",
        "order": "desc",
        "rows": ROWS_PER_JOURNAL,
    }
    if email:
        params["mailto"] = email

    resp = requests.get(base_url, params=params, timeout=30)
    resp.raise_for_status()
    payload = resp.json()
    items = payload.get("message", {}).get("items", [])

    records = []
    for item in items:
        record = normalize_item(item, journal)
        if record:
            records.append(record)
    return records


def build_payload(records):
    today = date.today()

    def sort_key(r):
        try:
            return datetime.fromisoformat(r["publishedAt"])
        except (ValueError, TypeError):
            return datetime.min

    eligible = [r for r in records if not r["publishedAt"] or sort_key(r).date() <= today]
    future_excluded = len(records) - len(eligible)

    dedup = {}
    for r in eligible:
        dedup[r["doi"]] = r
    pool = sorted(dedup.values(), key=sort_key, reverse=True)[:POOL_LIMIT]

    seed = int(today.strftime("%Y%m%d"))
    rng = random.Random(seed)
    selected = pool[:]
    rng.shuffle(selected)
    selected = selected[:SELECTED_LIMIT]

    return {
        "harvestedAt": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "sourcePublisher": "Panorama Scholarly Group",
        "metadataSource": "Crossref REST API (api.crossref.org/journals/{issn}/works)",
        "selectionMode": "daily-random-from-recent-panorama-publications",
        "randomSeed": seed,
        "totalRecordsHarvested": len(records),
        "futureRecordsExcluded": future_excluded,
        "recentPoolLimit": POOL_LIMIT,
        "recentPoolSize": len(pool),
        "selectedArticleCount": len(selected),
        "articles": selected,
    }


def main():
    email = os.environ.get("CROSSREF_EMAIL", "")
    if not email:
        print("[warning] CROSSREF_EMAIL not set; requests will not use Crossref's polite pool.")

    journals = load_active_journals()
    print(f"Fetching latest works for {len(journals)} journals with assigned ISSNs...")

    all_records = []
    for journal in journals:
        try:
            records = fetch_journal_works(journal, email)
            print(f"[ok] {journal['slug']:<12} {len(records)} records")
            all_records.extend(records)
        except Exception as e:
            print(f"[skip] {journal['slug']:<12} request failed: {str(e)[:80]}")
        time.sleep(REQUEST_DELAY_SECONDS)

    if not all_records:
        print("No records harvested from Crossref; leaving existing data/articles.json untouched.")
        return

    payload = build_payload(all_records)

    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        json.dump(payload, f, ensure_ascii=False, indent=2)
        f.write("\n")

    print(f"Wrote {payload['selectedArticleCount']} selected articles "
          f"from {payload['totalRecordsHarvested']} harvested records to {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
