import requests
import json
import os
from datetime import datetime
import time

# Journals with confirmed ISSNs — keyed by the same slug used in journals.json
JOURNALS = {
    "AFS":         {"title": "AI & Future Society",                              "issn": "3053-4011"},
    "JESA":        {"title": "Journal of Engineering Systems & Applications",    "issn": "3053-478X"},
    "CSGS":        {"title": "Climate Sustainability & Global Systems",          "issn": "3054-9663"},
    "RGGD":        {"title": "Rural Governance & Green Development",             "issn": "3053-7282"},
    "HealthNexus": {"title": "Health Nexus",                                     "issn": "3053-7037"},
    "PEMR":        {"title": "PoliEcoM Administration Review",                   "issn": "3053-3597"},
    "JLPCS":       {"title": "Journal of Law, Psychology & Communication",       "issn": "3052-9654"},
    "JSCC":        {"title": "Journal of Social Cognition and Communication",    "issn": "3054-6958"},
    "Silence":     {"title": "Silence",                                          "issn": "3054-4386"},
    "GRHAS":       {"title": "Global Review of Humanities, Arts & Society",      "issn": "3052-539X"},
    "TTS":         {"title": "Three Teachings Studies",                          "issn": "3053-6553"},
    "Resonance":   {"title": "Resonance: Journal of Global Music Studies",       "issn": "3053-4410"},
}


def _headers(email: str) -> dict:
    if email:
        return {"User-Agent": f"PanoramaOpenInfraBot/1.0 (mailto:{email})"}
    return {"User-Agent": "PanoramaOpenInfraBot/1.0"}


def fetch_crossref(issn: str, email: str) -> dict:
    """Query Crossref Journals API.

    Returns indexed status and DOI counts registered under this ISSN.
    """
    url = f"https://api.crossref.org/journals/{issn}"
    try:
        r = requests.get(url, headers=_headers(email), timeout=20)
        if r.status_code == 404:
            return {"indexed": False}
        r.raise_for_status()
        msg = r.json().get("message", {})
        counts = msg.get("counts", {})
        return {
            "indexed": True,
            "total_dois": counts.get("total-dois", 0),
            "current_dois": counts.get("current-dois", 0),
            "publisher": msg.get("publisher", ""),
        }
    except Exception as exc:
        return {"indexed": None, "error": str(exc)[:120]}


def fetch_doaj(issn: str, email: str) -> dict:
    """Query DOAJ search API by ISSN.

    Returns whether the journal is indexed in DOAJ and whether it holds the DOAJ Seal.
    """
    url = f"https://doaj.org/api/search/journals/issn%3A{issn}"
    try:
        r = requests.get(url, headers=_headers(email), timeout=20)
        r.raise_for_status()
        data = r.json()
        if data.get("total", 0) == 0:
            return {"indexed": False}
        admin = data["results"][0].get("admin", {})
        return {
            "indexed": admin.get("in_doaj", False),
            "seal": admin.get("seal", False),
        }
    except Exception as exc:
        return {"indexed": None, "error": str(exc)[:120]}


def main():
    email = os.environ.get("OPENALEX_EMAIL", "")
    if not email:
        print("[警告] 未检测到 OPENALEX_EMAIL 环境变量，将以匿名模式请求。")

    result = {
        "last_updated": datetime.utcnow().strftime("%Y-%m-%d"),
        "source": "Crossref Journals API + DOAJ Search API",
        "journals": {},
    }

    print("启动 Panorama 集团期刊 Open Infrastructure 状态同步...")
    print("-" * 56)

    for journal_id, info in JOURNALS.items():
        issn = info["issn"]
        print(f"[{journal_id:<14}] ISSN {issn}")

        crossref_data = fetch_crossref(issn, email)
        time.sleep(0.6)

        doaj_data = fetch_doaj(issn, email)
        time.sleep(0.6)

        result["journals"][journal_id] = {
            "issn": issn,
            "crossref": crossref_data,
            "doaj": doaj_data,
        }

        cr_status = "已收录" if crossref_data.get("indexed") else ("未收录" if crossref_data.get("indexed") is False else "查询失败")
        dj_status = "已收录" if doaj_data.get("indexed") else ("未收录" if doaj_data.get("indexed") is False else "查询失败")
        print(f"  Crossref: {cr_status}  |  DOAJ: {dj_status}")

    print("-" * 56)

    root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    out_path = os.path.join(root_dir, "data", "open_infra_status.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(result, f, indent=2, ensure_ascii=False)

    print(f"同步完成，数据已写入: data/open_infra_status.json")


if __name__ == "__main__":
    main()
