#!/usr/bin/env python3
"""Construiește saptamani/<luni>/raw/rezultate_shopifyql.json din fișierul săptămânii trecute plus rândurile săptămânii noi.

Folosire: python3 -I scripts/add_week.py <fisier_vechi.json> <randuri_noi.json> <fisier_nou.json>

<randuri_noi.json> = {"rulat": "...", "interval": "...", "nota": "...",
                      "noi": {"Q1": [[...], ...], ...},          # rândurile săptămânii noi, în formatul fișierului vechi
                      "totaluri_vechi": {"Q10": {"2026-10-12": 4064, ...}, ...}}  # opțional: totalurile pe săptămână citite acum
                                                                                   # (prima coloană numerică), pentru a verifica
                                                                                   # că săptămânile vechi nu au fost revizuite
Păstrează doar cheile Q*; restul (note, extra) nu se copiază. Scris pe 26.11.2026.
"""
import json
import sys
from collections import defaultdict

old = json.load(open(sys.argv[1], encoding="utf-8"))
new = json.load(open(sys.argv[2], encoding="utf-8"))
out = {"rulat": new["rulat"], "interval": new["interval"], "nota": new["nota"]}
for q, v in old.items():
    if not q.startswith("Q"):
        continue
    width = len(v["columns"])
    add = new["noi"][q]
    assert all(len(r) == width for r in add), (q, v["columns"])
    out[q] = {"columns": v["columns"], "rows": v["rows"] + add}
ok = True
for q, tot in new.get("totaluri_vechi", {}).items():
    cols = old[q]["columns"]
    i = cols.index("sessions") if "sessions" in cols else cols.index("orders")
    s = defaultdict(float)
    for r in old[q]["rows"]:
        s[r[0]] += r[i]
    for w, t in tot.items():
        same = abs(s[w] - t) < 0.005
        ok &= same
        if not same:
            print("REVIZUIT", q, w, "vechi", s[w], "acum", t)
print("săptămânile vechi: identice" if ok else "ATENȚIE: Shopify a revizuit săptămâni vechi")
json.dump(out, open(sys.argv[3], "w", encoding="utf-8"), ensure_ascii=False, indent=1)
