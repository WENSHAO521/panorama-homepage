"""
Weekly scraper for https://posi.panorama-sg.com/
Extracts 4 headline stats from the homepage and writes to data/posi_stats.json.

Stats tracked (keys match what the main homepage widget displays):
  doi_metadata_records        raw: 18358499   display: "18.4M"
  searchable_records          raw: "250M+"     display: "250M+"
  journal_records_indexed     raw: 22856       display: "22,856"
  avg_metadata_quality_score  raw: "86/100"    display: "86/100"
"""

import json
import math
import os
import re
import sys
from datetime import datetime, timezone

try:
    from playwright.sync_api import sync_playwright, TimeoutError as PlaywrightTimeout
except ImportError:
    print("[ERROR] playwright not installed. Run: pip install playwright && playwright install chromium")
    sys.exit(1)

URL = "https://posi.panorama-sg.com/"


def _fmt(raw: str | None) -> str | None:
    """Format a raw number string to a human-readable display form.

    Examples:
        "18,358,499" → "18.4M"
        "22,856"     → "22,856"
        "250M+"      → "250M+"
        "86/100"     → "86/100"
    """
    if raw is None:
        return None
    # Already in short form (e.g. "250M+", "86/100")
    if re.search(r"[A-Za-z/+]", raw):
        return raw
    n = int(raw.replace(",", ""))
    if n >= 1_000_000:
        return f"{n / 1_000_000:.1f}M"
    if n >= 1_000:
        return f"{n:,}"
    return str(n)


def extract_stats(body: str) -> dict:
    # Collapse all whitespace to single spaces; work in uppercase
    flat = re.sub(r"\s+", " ", body).upper()

    # Pattern: value immediately before the label in the page flow.
    # The POSI hero section reads: "<number>\n<LABEL TEXT>" so after flattening:
    #   "18,358,499 DOI METADATA RECORDS"
    #   "250M+ EXTERNAL SEARCHABLE RECORDS"
    #   "22,856 AUTO-DISCOVERED JOURNAL RECORDS"
    #   "Avg. MQS\n86/100" → "AVG. MQS 86/100"
    patterns = {
        "doi_metadata_records":       r"([\d,]+(?:\.\d+)?[MBKT]?\+?)\s+DOI\s+METADATA\s+RECORDS",
        "searchable_records":         r"([\d,]+(?:\.\d+)?[MBKT]?\+?)\s+(?:EXTERNAL\s+)?SEARCHABLE\s+RECORDS",
        "_posi_verified":             r"([\d,]+)\s+POSI\s+VERIFIED\s+JOURNAL\s+RECORDS",
        "_auto_discovered":           r"([\d,]+)\s+AUTO.DISCOVERED\s+JOURNAL\s+RECORDS",
        "avg_metadata_quality_score": r"AVG\.?\s*MQS\s+([\d]+/[\d]+)",
    }

    labels = {
        "doi_metadata_records":       "DOI Metadata Records",
        "searchable_records":         "Searchable Records",
        "_posi_verified":             "POSI Verified Journal Records",
        "_auto_discovered":           "Auto-discovered Journal Records",
        "avg_metadata_quality_score": "Avg. Metadata Quality Score",
    }

    stats = {}
    for key, pattern in patterns.items():
        m = re.search(pattern, flat)
        raw = m.group(1) if m else None
        stats[key] = {"raw": raw, "display": _fmt(raw)}
        status = raw if raw else "未找到"
        print(f"  {'[OK]' if raw else '[--]'} {labels[key]:<35} {status}")

    # Combine verified + auto-discovered into a single total
    verified_raw = stats.get("_posi_verified", {}).get("raw")
    auto_raw = stats.get("_auto_discovered", {}).get("raw")
    if verified_raw and auto_raw:
        total = int(verified_raw.replace(",", "")) + int(auto_raw.replace(",", ""))
        total_str = f"{total:,}"
        stats["journal_records_indexed"] = {"raw": total_str, "display": _fmt(total_str)}
        print(f"  [OK] {'Journal Records Indexed (total)':<35} {total_str} ({verified_raw} verified + {auto_raw} auto)")
    else:
        stats["journal_records_indexed"] = {"raw": None, "display": None}
        print(f"  [--] {'Journal Records Indexed (total)':<35} 未找到")

    return stats


def main():
    print(f"抓取 POSI 首页: {URL}")
    print("-" * 56)

    with sync_playwright() as pw:
        browser = pw.chromium.launch(args=["--no-sandbox", "--disable-dev-shm-usage"])
        page = browser.new_page(
            user_agent="Mozilla/5.0 (compatible; PanoramaBot/1.0; +https://panorama-sg.com)"
        )
        try:
            page.goto(URL, wait_until="domcontentloaded", timeout=45_000)
        except PlaywrightTimeout:
            print("[警告] domcontentloaded 超时，使用已加载内容继续...")

        # Allow JS to populate counters
        page.wait_for_timeout(4000)
        body = page.inner_text("body")
        browser.close()

    stats = extract_stats(body)

    result = {
        "last_updated": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "source_url": URL,
        "doi_metadata_records": stats["doi_metadata_records"]["display"],
        "searchable_records": stats["searchable_records"]["display"],
        "journal_records_indexed": stats["journal_records_indexed"]["display"],
        "avg_metadata_quality_score": stats["avg_metadata_quality_score"]["display"],
    }

    root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    out_path = os.path.join(root_dir, "data", "posi_stats.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(result, f, indent=2, ensure_ascii=False)

    print(f"\n已写入: data/posi_stats.json")
    print(json.dumps(result, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
