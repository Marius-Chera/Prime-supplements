#!/usr/bin/env python3
"""Comparația săptămânală creatină: ultima săptămână față de „înainte” (baseline.json, 8 săptămâni).

Folosire:  python3 -I scripts/week_compare.py saptamani/<luni>/raw/rezultate_shopifyql.json

Citește fișierul brut scris de rularea săptămânală (rândurile ShopifyQL Q1–Q11, vezi collect_week.md)
și baseline.json (nemodificat). Tipărește: verificările de consistență, tabelul pe săptămâni,
verdictul față de min–max și media săptămânilor „după” (de la 19.10.2026).
Scris pe 12.11.2026, fiindcă scripturile vechi din runbook erau într-un folder temporar și s-au pierdut.
"""
import json
import os
import sys
from collections import defaultdict

HERE = os.path.dirname(os.path.abspath(__file__))
BASE = json.load(open(os.path.join(HERE, "..", "baseline.json"), encoding="utf-8"))
RAW = json.load(open(sys.argv[1], encoding="utf-8"))
AFTER_FROM = "2026-10-19"

# Împărțirea cpc / fără UTM a perioadei „înainte” (din collect_week.md, nu e în baseline.json)
SPLIT = {"cpc_4": (18.0, 7, 25), "noutm_4": (9.8, 2, 16), "cpc_A": (16.1, 6, 23), "noutm_A": (2.9, 0, 5),
         "cpc_store": (205.8, 109, 312), "noutm_store": (525.5, 427, 564)}


def rows(q):
    cols = RAW[q]["columns"]
    return [dict(zip(cols, r)) for r in RAW[q]["rows"]]


def by_week(q, val, cond=lambda r: True):
    out = defaultdict(float)
    for r in rows(q):
        if cond(r):
            out[r["week"]] += r[val]
    return out


weeks = sorted({r["week"] for r in rows("Q10")})
M = {}
M["google_4"] = by_week("Q2", "sessions", lambda r: r["referrer_name"] == "google")
M["google_AB"] = by_week("Q2", "sessions", lambda r: r["referrer_name"] == "google" and r["page"] in ("A", "B"))
M["cpc_4"] = by_week("Q2b", "sessions", lambda r: r["utm_medium"] == "cpc")
M["noutm_4"] = by_week("Q2b", "sessions", lambda r: r["utm_medium"] == "")
M["cpc_A"] = by_week("Q2b", "sessions", lambda r: r["utm_medium"] == "cpc" and r["page"] == "A")
M["noutm_A"] = by_week("Q2b", "sessions", lambda r: r["utm_medium"] == "" and r["page"] == "A")
M["google_store"] = by_week("Q7", "sessions", lambda r: r["referrer_name"] == "google")
M["cpc_store"] = by_week("Q7b", "sessions", lambda r: r["utm_medium"] == "cpc")
M["noutm_store"] = by_week("Q7b", "sessions", lambda r: r["utm_medium"] == "")
M["sessions_4"] = by_week("Q1", "sessions")
M["orders_creatine"] = by_week("Q5", "orders")
M["units_creatine"] = by_week("Q5", "quantity_ordered")
M["gross_creatine"] = by_week("Q5", "gross_sales")
M["orders_creatine_search"] = by_week("Q5b", "orders", lambda r: r["order_referrer_source"] == "search")
M["orders_creatine_social"] = by_week("Q5b", "orders", lambda r: r["order_referrer_source"] == "social")
M["orders_creatine_noref"] = by_week("Q5b", "orders", lambda r: r["order_referrer_source"] == "")
for p in ("A", "B", "RTG"):
    M[f"orders_{p}"] = by_week("Q3", "orders", lambda r, p=p: r["product"] == p)
    M[f"units_{p}"] = by_week("Q3", "quantity_ordered", lambda r, p=p: r["product"] == p)
    M[f"gross_{p}"] = by_week("Q3", "gross_sales", lambda r, p=p: r["product"] == p)
M["orders_store"] = by_week("Q9", "orders")
M["sessions_store"] = by_week("Q10", "sessions")
M["blog_sessions"] = by_week("Q11", "sessions")
M["blog_search"] = by_week("Q11", "sessions", lambda r: r["referrer_source"] == "search")
M["share_google"] = {w: M["google_4"][w] / M["google_store"][w] for w in weeks}
M["share_noutm"] = {w: M["noutm_4"][w] / M["noutm_store"][w] for w in weeks}
M["share_orders"] = {w: M["orders_creatine"][w] / M["orders_store"][w] for w in weeks}


def b(d, k):
    x = d[k]
    return (x["avg_week"], x["min_week"], x["max_week"])


P = BASE["pages"]
PR = BASE["products"]
ST = BASE["store"]["baseline"]
A, B_, R = "14971467268471", "15404872368503", "15410672075127"
AB_weekly = [x["sessions_search_google"] + y["sessions_search_google"] for x, y in zip(
    P["/products/creatina-creapure"]["weekly"], P["/products/creatina-monohidrat-micronized-300g-fara-aroma"]["weekly"])]
BL = {
    "google_4": b(P["_all_4"]["baseline"], "sessions_search_google"),
    "google_AB": (sum(AB_weekly) / len(AB_weekly), min(AB_weekly), max(AB_weekly)),
    "sessions_4": b(P["_all_4"]["baseline"], "sessions"),
    "share_google": b(ST, "creatine_pages_share_of_google_sessions"),
    "share_orders": b(ST, "creatine_orders_share_of_orders"),
    "orders_creatine": b(PR["_all_3_distinct_orders"]["baseline"], "orders"),
    "units_creatine": b(PR["_all_3_distinct_orders"]["baseline"], "units_ordered"),
    "gross_creatine": b(PR["_all_3_distinct_orders"]["baseline"], "gross_sales_ron"),
    "orders_creatine_search": b(PR["_all_3_distinct_orders"]["baseline"], "orders_from_search"),
    "orders_creatine_noref": b(PR["_all_3_distinct_orders"]["baseline"], "orders_no_referrer"),
    "orders_A": b(PR[A]["baseline"], "orders"), "units_A": b(PR[A]["baseline"], "units_ordered"),
    "gross_A": b(PR[A]["baseline"], "gross_sales_ron"),
    "orders_B": b(PR[B_]["baseline"], "orders"), "units_B": b(PR[B_]["baseline"], "units_ordered"),
    "gross_B": b(PR[B_]["baseline"], "gross_sales_ron"),
    "orders_RTG": b(PR[R]["baseline"], "orders"), "units_RTG": b(PR[R]["baseline"], "units_ordered"),
    "gross_RTG": b(PR[R]["baseline"], "gross_sales_ron"),
    "google_store": b(ST, "sessions_search_google"), "orders_store": b(ST, "orders"),
    "sessions_store": b(ST, "sessions"),
    "blog_sessions": b(P["_blog_creatine_articles"]["baseline"], "sessions"),
    "blog_search": b(P["_blog_creatine_articles"]["baseline"], "sessions_search"),
}
BL.update(SPLIT)

print("== Verificări de consistență ==")
ok = True
for w in weeks:
    q6 = sum(r["sessions"] for r in rows("Q6") if r["week"] == w)
    q1s = sum(r["sessions"] for r in rows("Q1") if r["week"] == w and r["referrer_source"] == "search")
    c1 = q6 == M["sessions_store"][w]
    c2 = M["google_4"][w] <= q1s
    c3 = M["cpc_4"][w] + M["noutm_4"][w] == M["google_4"][w]
    q7b = sum(r["sessions"] for r in rows("Q7b") if r["week"] == w)
    c4 = q7b == M["google_store"][w]
    ok &= c1 and c2 and c3 and c4
    print(w, "Q6=Q10", c1, "| Q2<=Q1", c2, "| Q2b=Q2", c3, "| Q7b=Q7", c4)
print("TOATE OK" if ok else "ATENȚIE: există nepotriviri")

last = weeks[-1]
after = [w for w in weeks if w >= AFTER_FROM]
print(f"\n== Tabel (ultima săptămână: {last}; săptămâni „după”: {', '.join(after)}) ==")
print("indicator | înainte medie (min–max) | " + " | ".join(weeks) + " | media „după” | verdict ultima săptămână")
for k in ["google_4", "noutm_4", "cpc_4", "noutm_A", "cpc_A", "google_AB", "share_google", "share_noutm", "sessions_4",
          "orders_creatine", "orders_creatine_search", "orders_creatine_noref", "orders_creatine_social",
          "units_creatine", "gross_creatine", "share_orders",
          "orders_A", "units_A", "gross_A", "orders_B", "units_B", "gross_B", "orders_RTG", "units_RTG", "gross_RTG",
          "google_store", "noutm_store", "cpc_store", "sessions_store", "orders_store", "blog_sessions", "blog_search"]:
    vals = [M[k].get(w, 0) for w in weeks]
    av = sum(M[k].get(w, 0) for w in after) / len(after)
    pct = k.startswith("share")
    f = (lambda v: f"{v * 100:.1f}%") if pct else (lambda v: f"{v:.2f}".rstrip("0").rstrip("."))
    if k in BL:
        m, lo, hi = BL[k]
        v = vals[-1]
        verdict = "PESTE MAXIM" if v > hi else ("sub minim" if v < lo else "în interval")
        base = f"{f(m)} ({f(lo)}–{f(hi)})"
    else:
        verdict, base = "–", "–"
    print(f"{k} | {base} | " + " | ".join(f(v) for v in vals) + f" | {f(av)} | {verdict}")
