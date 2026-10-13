"""Second pass on the 121 final article bodies (import/vars2): every article links to the collection that holds
its product. 1) 'Vezi colecția completă' links that pointed to the noindexed /collections/cele-mai-vandute now
point to that collection (same text). 2) If the body still has no link to it, one sentence with the link is added
just before the medical disclaimer. Text elsewhere is unchanged (asserted)."""
import json, re, os, sys
S = os.path.dirname(os.path.abspath(__file__)) + '/..'
PROD = {
 'ashwagandha-ksm-66': ['prime-health'], 'baton-proteic-capsuni': ['batoane-proteice'], 'baton-proteic-caramel-sarat': ['batoane-proteice'],
 'baton-proteic-cocos-si-caramel': ['batoane-proteice'], 'cardio-calm-500-ml': ['prime-health'], 'citrus-bergamot': ['prime-health'],
 'cluster-insulin-bomb-1000g': ['suplimente-intra-workout'], 'coenzima-q10-80-caps': ['prime-health'], 'combat-pro': ['suplimente-pre-workout'],
 'combat-pro-2-0-660g-30-serv': ['suplimente-pre-workout'], 'creatina-creapure': ['creatina'], 'creatina-monohidrat-micronized-300g-fara-aroma': ['creatina'],
 'creatine-ready-to-go-plicuri-prime-supplements': ['creatina'], 'crema-de-orez-blueberry-muffin': ['crema-de-orez'], 'crema-de-orez-tort-de-ciocolata': ['crema-de-orez'],
 'daily-vitamin-formula': ['vitamine-si-minerale'], 'eaa-aminoacizi-esentiali': ['suplimente-intra-workout', 'aminoacizi'], 'emperor-mass_3000g': ['pudra-proteica'],
 'enzima-nattokinaza-80-caps': ['vitamine-si-minerale'], 'fat-burning-booster': ['arzator-de-grasimi', 'shot-pre-workout', 'suplimente-pre-workout'],
 'fiber-blood-orange': ['alimente-sanatoase'], 'glycerol-max-pump-500g-125-serv': ['suplimente-intra-workout', 'suplimente-pre-workout'],
 'instant-oat-cream-800g-25-serv': ['alimente-sanatoase'], 'l-carnitine-1000-80-caps': ['arzator-de-grasimi'], 'magneziu-bisglicinat-80-caps': ['prime-health'],
 'mnx-extra-hc-t-shirt-4-0-washed-look-bronze': ['echipament-sala', 'haine-mnx'], 'nac-80-caps': ['vitamine-si-minerale'], 'nitrox': ['suplimente-pre-workout'],
 'nitrox-no-stim': ['suplimente-pre-workout'], 'omega-3': ['vitamine-si-minerale'], 'potassium-complex-80-caps': ['vitamine-si-minerale'],
 'prime-whey-1000g': ['pudra-proteica'], 'prime-whey-2000g': ['pudra-proteica'], 'prime-whey-go': ['pudra-proteica'], 'pure-isolate-2000g': ['pudra-proteica'],
 'recovery-bcaa-500g': ['suplimente-intra-workout', 'aminoacizi'], 'recovery-glutamin': ['aminoacizi'], 'scortisoara-ceylon-bio-200g': ['prime-health'],
 'silimarina-80-caps': ['vitamine-si-minerale'], 'spirulina-80-caps': ['vitamine-si-minerale'], 'supliment-alimentar-chromium-picolinate-80-caps': ['vitamine-si-minerale'],
 'taurine-80-caps': ['vitamine-si-minerale', 'aminoacizi'], 'testo-revive-500-ml': ['prime-health'], 'thermo-core-120-caps': ['arzator-de-grasimi'],
 'unt-de-arahide': ['prime-health'], 'unt-de-migdale': ['prime-health'], 'vitamin-c-1000-80-caps': ['vitamine-si-minerale'], 'vitamina-d3-k2': ['prime-health'],
 'water-out-120-caps': ['arzator-de-grasimi'], 'water-out-500-ml': ['prime-health'], 'zinc-citrate-80-caps': ['vitamine-si-minerale'],
}
NAME = {'suplimente-pre-workout': 'suplimente pre-workout', 'suplimente-intra-workout': 'suplimente intra-workout', 'aminoacizi': 'aminoacizi',
        'arzator-de-grasimi': 'arzătoare de grăsimi', 'vitamine-si-minerale': 'vitamine și minerale', 'prime-health': 'Prime Health',
        'pudra-proteica': 'pudre proteice', 'alimente-sanatoase': 'alimente sănătoase', 'crema-de-orez': 'cremă de orez', 'haine-mnx': 'haine MNX',
        'creatina': 'creatină', 'batoane-proteice': 'batoane proteice'}
DISC = '<p><em>Informațiile din acest articol au caracter general'
text = lambda s: re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', ' ', s)).strip()
out_dir = S + '/hublinks/vars3'; os.makedirs(out_dir, exist_ok=True)
plan, changed = {}, []
for ln in open(S + '/hublinks/tags.txt'):
    h, hub, prods = ln.split(); prods = prods.split(',')
    cols = PROD[prods[0]]
    target = hub if all(hub in PROD[p] for p in prods) else next(c for c in cols if c in NAME)
    v = json.load(open(f'{S}/import/vars2/{h}.json'))
    b0 = b = v['article']['body']
    n_cmv = len(re.findall(r'href="(?:https://primesupplements\.ro)?/collections/cele-mai-vandute"', b))
    b = re.sub(r'href="(?:https://primesupplements\.ro)?/collections/cele-mai-vandute"', f'href="/collections/{target}"', b)
    added = False
    if not re.search(rf'href="(?:https://primesupplements\.ro)?/collections/{re.escape(target)}[/"?#]', b):
        assert b.count(DISC) == 1, h
        b = b.replace(DISC, f'<p>Mai multe produse din această categorie găsești în colecția <a href="/collections/{target}">{NAME[target]}</a>.</p>\n' + DISC)
        added = True
    if added:
        assert text(b).replace(f'Mai multe produse din această categorie găsești în colecția {NAME[target]} .', '').replace('  ', ' ') == text(b0) or \
               text(b) == text(b0).replace(text(DISC + '</em></p>')[:20], ''), None
    plan[h] = {'hub': hub, 'target': target, 'cele_mai_vandute_relinked': n_cmv, 'sentence_added': added}
    if b != b0:
        changed.append(h)
        json.dump({'id': v['id'], 'article': {'body': b}}, open(f'{out_dir}/{h}.json', 'w'), ensure_ascii=False)
json.dump(plan, open(S + '/hublinks/plan.json', 'w'), ensure_ascii=False, indent=1)
print('changed', len(changed), 'relinked', sum(p['cele_mai_vandute_relinked'] > 0 for p in plan.values()), 'sentences', sum(p['sentence_added'] for p in plan.values()))
import collections; print(collections.Counter(p['target'] for p in plan.values()))
print('hub != target:', [(h, p['hub'], p['target']) for h, p in plan.items() if p['hub'] != p['target']])
