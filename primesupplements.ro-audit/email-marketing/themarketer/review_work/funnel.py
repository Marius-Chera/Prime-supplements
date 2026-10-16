# recipients/month, series-unique click rate, click->order ; scenarios: prudent, base, doc
rows = [
 ("Welcome",            (90,0.10,0.15),  (120,0.13,0.15), (160,0.25,0.20)),
 ("Abandon checkout",   (10,0.12,0.25),  (20,0.15,0.25),  (35,0.40,0.28)),
 ("Abandon cos",        (70,0.08,0.15),  (100,0.10,0.15), (110,0.20,0.20)),
 ("Abandon navigare",   (100,0.05,0.08), (120,0.056,0.08),(120,0.06,0.12)),
 ("Client nou",         (10,0.08,0.15),  (20,0.10,0.15),  (35,0.25,0.20)),
 ("Client existent",    (60,0.05,0.15),  (90,0.05,0.15),  (90,0.08,0.20)),
 ("Reaprovizionare",    (100,0.06,0.20), (140,0.08,0.20), (170,0.15,0.28)),
 ("Recastigare",        (60,0.04,0.10),  (90,0.05,0.12),  (90,0.08,0.20)),
]
fixed = {"VIP + stoc revenit":(0.5,1.0,2.0), "SMS":(0.3,0.7,2.0)}
camp = [
 ("Newsletter duminica", (1200*4.3,0.005,0.03), (1600*4.3,0.007,0.04), (1900*4.3,0.010,0.07)),
 ("Campanie segmentata", (2.5*650,0.015,0.05),  (3*650,0.02,0.065),    (4*650,0.025,0.08)),
]
tot=[0,0,0]
print(f"{'Sursa':24s} {'prudent':>8s} {'baza':>8s} {'doc':>8s}")
for name,*sc in rows+camp:
    v=[r*c*k for (r,c,k) in sc]
    for i in range(3): tot[i]+=v[i]
    print(f"{name:24s} " + " ".join(f"{x:8.1f}" for x in v))
for name,v in fixed.items():
    for i in range(3): tot[i]+=v[i]
    print(f"{name:24s} " + " ".join(f"{x:8.1f}" for x in v))
print(f"{'TOTAL last-click':24s} " + " ".join(f"{x:8.1f}" for x in tot))
print(f"{'cu prima atingere x1.25':24s} " + " ".join(f"{x*1.25:8.1f}" for x in tot))
# dedup haircut 15% for overlapping flows (same buyer counted in welcome+cart etc.)
print(f"{'doc dupa dedup -15%':24s} {'':8s} {'':8s} {tot[2]*0.85:8.1f}")
