#!/usr/bin/env python3
"""
Scrape DPG Verhandlungen contributions for:
  - SOE 14: Focus Session: Physics of AI I
  - SOE 17: Focus Session: Physics of AI II

Output: dpg_ai_sessions.json

Requirements: pip install requests beautifulsoup4
"""

import json
import re
import time

import requests
from bs4 import BeautifulSoup

BASE_URL = "https://www.dpg-verhandlungen.de"
YEAR = "2026"
CONFERENCE = "dresden"
PART = "soe"
TARGET_SESSIONS = {14: "Focus Session: Physics of AI I", 17: "Focus Session: Physics of AI II"}
DELAY = 0.5  # seconds between requests


def fetch(session, url):
    time.sleep(DELAY)
    try:
        r = session.get(url, timeout=15)
        return r.text if r.status_code == 200 else None
    except requests.RequestException as e:
        print(f"  Error: {e}")
        return None


def parse_main_p(p):
    """
    Parse the main <p> that contains title, authors, and affiliations.
    Structure:
      <b>title</b> — •<span>Author1</span><sup>1</sup> and <span>Author2</span><sup>2</sup>
                   — <sup>1</sup>Affil1 — <sup>2</sup>Affil2
    The transition from authors to affiliations is the last <span> in the <p>.
    """
    title = None
    authors = []       # list of {"name": ..., "affil_ids": [...], "presenter": bool}
    affiliations = {}  # {id: affil_string}

    b = p.find("b")
    title = b.get_text(strip=True) if b else None

    nodes = list(p.children)
    b_idx = next((i for i, n in enumerate(nodes) if getattr(n, "name", None) == "b"), -1)
    if b_idx == -1:
        return title, authors, affiliations

    rest = nodes[b_idx + 1:]

    # Find index of last <span> — everything after it is the affiliation block
    last_span_idx = max(
        (i for i, n in enumerate(rest) if getattr(n, "name", None) == "span"),
        default=-1,
    )

    # --- Author section (up to and including the <sup> right after the last <span>) ---
    presenter_next = False
    current_author = None
    # We include sups that directly follow the last span (one sup per author)
    # Find the sup immediately after last_span_idx
    last_author_sup_idx = last_span_idx
    for i in range(last_span_idx + 1, len(rest)):
        node = rest[i]
        if getattr(node, "name", None) == "sup":
            last_author_sup_idx = i
            break
        if getattr(node, "name", None) == "span":
            break

    author_nodes = rest[: last_author_sup_idx + 1]
    affil_nodes = rest[last_author_sup_idx + 1:]

    for node in author_nodes:
        name = getattr(node, "name", None)
        if name is None:
            if "•" in str(node):
                presenter_next = True
        elif name == "span":
            current_author = {"name": node.get_text(strip=True), "affil_ids": [], "presenter": presenter_next}
            authors.append(current_author)
            presenter_next = False
        elif name == "sup" and current_author is not None:
            current_author["affil_ids"].append(node.get_text(strip=True))

    # --- Affiliation section: " — <sup>1</sup>Text — <sup>2</sup>Text" ---
    pending_id = None
    for node in affil_nodes:
        name = getattr(node, "name", None)
        if name == "sup":
            pending_id = node.get_text(strip=True)
        elif name is None and pending_id is not None:
            chunk = str(node).strip(" —\u2014").strip()
            if chunk:
                affiliations[pending_id] = chunk
                pending_id = None

    return title, authors, affiliations


def parse_contribution(html, url):
    soup = BeautifulSoup(html, "html.parser")

    # Session heading: first <h3> (e.g. "SOE 14.1: Hauptvortrag")
    h3s = soup.find_all("h3")
    session_heading = h3s[0].get_text(strip=True) if h3s else None

    # Date/time/room: second <h3>
    day_date = time_slot = room = None
    if len(h3s) >= 2:
        dt_text = h3s[1].get_text(strip=True)
        parts = [p.strip() for p in dt_text.split(",")]
        day_date = ", ".join(parts[:2]) if len(parts) >= 2 else parts[0]
        time_slot = parts[2] if len(parts) > 2 else None
        room = parts[3] if len(parts) > 3 else None

    # Main content <p>: the one that contains a <b> with the title
    title = authors = affiliations = None
    for p in soup.find_all("p"):
        if p.find("b") and "•" in p.get_text():
            title, authors, affiliations = parse_main_p(p)
            break

    # Abstract: <p> with long plain text, no <b> child, no <select> child
    abstract = None
    for p in soup.find_all("p"):
        if p.find("b") or p.find("select") or p.find("label"):
            continue
        text_len = len(p.get_text(strip=True))
        if text_len > 80:
            abstract = p.get_text(strip=True)
            break

    # Keywords: <p> containing <b>Keywords:</b>
    keywords = None
    for p in soup.find_all("p"):
        b = p.find("b")
        if b and "keyword" in b.get_text(strip=True).lower():
            keywords = p.get_text(strip=True).replace(b.get_text(strip=True), "").strip()
            break

    return {
        "url": url,
        "session_heading": session_heading,
        "title": title,
        "authors": authors,
        "affiliations": affiliations,
        "day_date": day_date,
        "time": time_slot,
        "room": room,
        "abstract": abstract,
        "keywords": keywords,
    }


def scrape_session(http, session_num, session_name):
    contributions = []
    contrib_num = 1
    misses = 0

    while misses < 3:
        url = (f"{BASE_URL}/year/{YEAR}/conference/{CONFERENCE}"
               f"/part/{PART}/session/{session_num}/contribution/{contrib_num}")
        html = fetch(http, url)
        if html is None:
            misses += 1
            contrib_num += 1
            continue
        misses = 0
        entry = parse_contribution(html, url)
        print(f"  [{PART.upper()} {session_num}.{contrib_num}] {entry.get('title', '(no title)')}")
        contributions.append(entry)
        contrib_num += 1

    return contributions


def main():
    http = requests.Session()
    http.headers["User-Agent"] = "Mozilla/5.0 (compatible; DPG-scraper/1.0)"

    results = {}
    for session_num, session_name in TARGET_SESSIONS.items():
        print(f"\nScraping SOE {session_num}: {session_name}")
        contributions = scrape_session(http, session_num, session_name)
        results[f"SOE {session_num}"] = {
            "name": session_name,
            "contributions": contributions,
        }
        print(f"  -> {len(contributions)} contributions")

    out_file = "dpg_ai_sessions.json"
    with open(out_file, "w", encoding="utf-8") as f:
        json.dump(results, f, ensure_ascii=False, indent=2)

    total = sum(len(v["contributions"]) for v in results.values())
    print(f"\nDone. {total} contributions saved to {out_file}")


if __name__ == "__main__":
    main()
