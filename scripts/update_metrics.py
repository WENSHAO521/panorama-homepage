"""
Scrapes per-journal citation metrics from https://posi.panorama-sg.com/
(the "Citation" tab on each journal's POSI profile) and writes them to
all_journals_metrics.json.

Replaces the previous OpenAlex-API-based scraper: POSI's own Citation
panel already aggregates OpenAlex + Crossref citation data per journal
(PCI, PCS, h-index, Total Citations), so a direct OpenAlex API call is
no longer needed. Only journals in POSI's "PSG Collection" (Core
Collection) have a profile page; journals not yet indexed there are
recorded as null.
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

# OJS route slug (matches journalUrl / journals.json) -> POSI journal slug
# (posi.panorama-sg.com/journal/<slug>/). Only journals currently in POSI's
# PSG Core Collection are listed; others aren't indexed there yet.
JOURNALS = {
    "afs": "afs",                # AI & Future Society
    "jesa": "jesa",               # Journal of Engineering Systems and Applications
    "files": "grhas",             # Global Review of Humanities, Arts, and Society (GRHAS)
    "HealthNexus": "hnex",        # Health Nexus
    "jlpcs": "jlpcs",             # Journal of Law, Psychology, and Communication Studies
    "pemr": "pear",               # PoliEcoM Administration Review
    "rggd": "rggd",               # Rural Governance and Green Development
    "Resonance": "rjgms",         # Resonance: Journal of Global Music Studies
    "Silence": "silence",         # Silence
    "tts": "tts",                 # Three Teachings Studies
    "jscc": "jscc",               # Journal of Social Cognition and Communication
    "csgs": "csgs",               # Climate Sustainability & Global Systems
}

# Each metric is matched independently: young journals often don't have a
# PCS figure yet (it needs a multi-year Crossref citation window), so PCS
# must stay optional instead of making the whole panel fail to parse.
FIELD_PATTERNS = {
    "pci": r"PCI\s*([\d.]+)",
    "pcs": r"PCS\s*([\d.]+)",
    "h_index": r"h-index\s*(\d+)",
    "total_citations": r"Total Citations\s*(\d+)",
}


def parse_citation_panel(text: str) -> dict | None:
    values = {}
    for key, pattern in FIELD_PATTERNS.items():
        m = re.search(pattern, text, re.IGNORECASE)
        values[key] = m.group(1) if m else None

    # Require at least the core metrics (PCI, h-index, Total Citations); PCS may be absent.
    if values["pci"] is None or values["h_index"] is None or values["total_citations"] is None:
        return None

    return {
        "pci": float(values["pci"]),
        "pcs": float(values["pcs"]) if values["pcs"] is not None else None,
        "h_index": int(values["h_index"]),
        "total_citations": int(values["total_citations"]),
    }


def fetch_journal(page, posi_slug: str) -> dict | None:
    url = f"https://posi.panorama-sg.com/journal/{posi_slug}/"
    response = page.goto(url, wait_until="domcontentloaded", timeout=30_000)
    if response is None or response.status == 404:
        return None

    page.wait_for_timeout(2000)  # let client-side render populate the page

    clicked = page.evaluate(
        """() => {
            const btn = Array.from(document.querySelectorAll('button[role=tab]'))
                .find(b => b.textContent.trim() === 'Citation');
            if (btn) { btn.click(); return true; }
            return false;
        }"""
    )
    if not clicked:
        return None

    page.wait_for_timeout(1000)
    panel = page.query_selector("[role=tabpanel]")
    if not panel:
        return None
    return parse_citation_panel(panel.inner_text())


def update_all_journals_metrics():
    print("启动 Panorama 集团期刊矩阵 POSI 指标同步...")
    print("-" * 50)

    aggregated_metrics = {
        "last_updated": datetime.now(timezone.utc).strftime("%Y-%m-%d"),
        "source_url": "https://posi.panorama-sg.com/",
    }

    with sync_playwright() as pw:
        browser = pw.chromium.launch(args=["--no-sandbox", "--disable-dev-shm-usage"])
        page = browser.new_page(
            user_agent="Mozilla/5.0 (compatible; PanoramaBot/1.0; +https://panorama-sg.com)"
        )

        for journal_path, posi_slug in JOURNALS.items():
            try:
                stats = fetch_journal(page, posi_slug)
                if stats:
                    aggregated_metrics[journal_path] = stats
                    print(
                        f"[成功] {journal_path:<15} PCI={stats['pci']} PCS={stats['pcs']} "
                        f"h-index={stats['h_index']} citations={stats['total_citations']}"
                    )
                else:
                    aggregated_metrics[journal_path] = None
                    print(f"[未收录] {journal_path:<13} POSI 暂无该期刊数据 (/journal/{posi_slug}/)")
            except PlaywrightTimeout:
                aggregated_metrics[journal_path] = None
                print(f"[超时] {journal_path:<15} 页面加载超时")
            except Exception as e:
                aggregated_metrics[journal_path] = None
                print(f"[异常] {journal_path:<15} 请求失败: {str(e)[:80]}")

        browser.close()

    print("-" * 50)

    # 寻址到仓库根目录，输出 JSON 文件
    root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    output_path = os.path.join(root_dir, "all_journals_metrics.json")

    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(aggregated_metrics, f, indent=4, ensure_ascii=False)

    print(f"同步流程完成，数据已持久化至: all_journals_metrics.json")


if __name__ == "__main__":
    update_all_journals_metrics()
