"""
Weekly scraper for https://posi.panorama-sg.com/
Extracts 4 headline stats from the homepage and writes to data/posi_stats.json.

POSI relaunched its homepage around a lifecycle-based journal database
(Core Collection / Global Benchmark / Lifecycle Rated / PSC Subject
Categories), replacing the older DOI-metadata / searchable-records /
avg-quality-score framing this scraper used to look for.

Stats tracked (keys match what the main homepage widget displays):
  core_collection             raw: 30      display: "30"
  global_benchmark             raw: "1,000" display: "1,000"
  lifecycle_rated              raw: 110     display: "110"
  psc_subject_categories       raw: 48      display: "48"
"""

import json
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
        "1,000" → "1,000"
        "30"    → "30"
        "250M+" → "250M+"
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
    #   "30 CORE COLLECTION"
    #   "1,000 GLOBAL BENCHMARK"
    #   "110 LIFECYCLE RATED"
    #   "48 PSC SUBJECT CATEGORIES"
    patterns = {
        "core_collection":       r"([\d,]+(?:\.\d+)?[MBKT]?\+?)\s+CORE\s+COLLECTION",
        "global_benchmark":      r"([\d,]+(?:\.\d+)?[MBKT]?\+?)\s+GLOBAL\s+BENCHMARK",
        "lifecycle_rated":       r"([\d,]+(?:\.\d+)?[MBKT]?\+?)\s+LIFECYCLE\s+RATED",
        "psc_subject_categories": r"([\d,]+(?:\.\d+)?[MBKT]?\+?)\s+PSC\s+SUBJECT\s+CATEGORIES",
    }

    labels = {
        "core_collection":       "Core Collection",
        "global_benchmark":      "Global Benchmark",
        "lifecycle_rated":       "Lifecycle Rated",
        "psc_subject_categories": "PSC Subject Categories",
    }

    stats = {}
    for key, pattern in patterns.items():
        m = re.search(pattern, flat)
        raw = m.group(1) if m else None
        stats[key] = {"raw": raw, "display": _fmt(raw)}
        status = raw if raw else "未找到"
        print(f"  {'[OK]' if raw else '[--]'} {labels[key]:<25} {status}")

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
        "core_collection": stats["core_collection"]["display"],
        "global_benchmark": stats["global_benchmark"]["display"],
        "lifecycle_rated": stats["lifecycle_rated"]["display"],
        "psc_subject_categories": stats["psc_subject_categories"]["display"],
    }

    root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    out_path = os.path.join(root_dir, "data", "posi_stats.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(result, f, indent=2, ensure_ascii=False)

    print(f"\n已写入: data/posi_stats.json")
    print(json.dumps(result, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
