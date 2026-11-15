// Scor SEO + AI (din 100 fiecare) pentru pagina vizuală + „Curiozități” a fiecărui produs (cerut de Marius pe 16.11.2026:
// „toate textele din tema pilot … SEO 100 din 100 și AI 100 din 100”). Același spirit ca blog-automation/scor-articol.mjs,
// adaptat la secțiunea de produs (nu are cuprins, autor sau tabel). Doar citește fișiere locale.
// Rulare: node pagina-produs-vizuala/scripts/scor-pagina-vizuala.mjs [handle ...]   (fără handle = toate din date/)
//         --sub100  afișează doar produsele sub 100 la oricare scor
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dir = join(root, 'date');
const titluri = Object.fromEntries(JSON.parse(readFileSync(join(root, 'inventar.json'), 'utf8')).produse.map(([h, , t]) => [h, t]));
const fara = s => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
const STOP = new Set(['prime', 'supliment', 'alimentar', 'extract', 'de', 'din', 'cu', 'enzima', 'bautura', 'instant', 'tinctura', 'plante', 'baton', 'proteic', 'unt', 'pachet', 'mix', 'arome']);
// cuvântul-cheie: primul cuvânt cu sens din titlul Shopify (ex. „Taurină 1000 mg – …” → taurin); excepții explicite mai jos
const CHEIE = {"citrus-bergamot":"bergamot", "vitamina-d3-k2":"d3", "vitamin-c-1000-80-caps":"vitamina c", "magneziu-bisglicinat-80-caps":"bisglicinat", "creatina-creapure":"creapure", "eaa-aminoacizi-esentiali":"eaa", "nitrox":"nitrox", "omega-3":"omega-3", "pure-isolate-2000g":"izolat", "recovery-bcaa-500g":"bcaa", "combat-pro":"combat pro", "unt-de-migdale":"migdale", "prime-whey-1000g":"whey", "prime-whey-2000g":"whey", "cluster-bomb-1000g":"cluster", "nitrox-no-stim":"no-stim", "fiber-blood-orange":"fiber", "creatina-monohidrat-micronized-300g-fara-aroma":"creatin", "ashwagandha-ksm-66":"ashwagandha", "combat-pro-2-0-660g-30-serv":"combat pro", "recovery-glutamin":"glutamin", "emperor-mass_3000g":"emperor", "prime-whey-go":"whey go", "creatine-ready-to-go-plicuri-prime-supplements":"creatin", "instant-oat-cream-800g-25-serv":"ovaz", "glycerol-max-pump-500g-125-serv":"glycerol", "nac-80-caps":"nac", "l-carnitine-1000-80-caps":"carnitin", "coenzima-q10-80-caps":"q10", "potassium-complex-80-caps":"potasiu", "zinc-citrate-80-caps":"zinc", "magnesium-citrate-80-caps":"magneziu", "supliment-alimentar-chromium-picolinate-80-caps":"crom", "taurine-80-caps":"taurin", "turmeric-extract-80-caps":"turmeric", "daily-vitamin-formula":"vitamin", "spirulina-80-caps":"spirulin", "silimarina-80-caps":"silimarin", "enzima-nattokinaza-80-caps":"nattokinaz", "scortisoara-ceylon-bio-200g":"scortisoar", "water-out-120-caps":"water out", "thermo-core-120-caps":"thermo core", "complete-collagen":"colagen", "testo-revive-500-ml":"testo revive", "cardio-calm-500-ml":"cardio calm", "water-out-500-ml":"water out", "energy-pump":"energy pump", "fat-burning-booster":"fat burning", "unt-de-arahide":"arahide", "unt-de-caju":"caju"};
const cheie = h => {
  if (CHEIE[h]) return CHEIE[h];
  if (/^baton/.test(h)) return 'baton'; if (/frutilu/.test(h)) return 'frutilu'; if (/^crema-de-orez/.test(h)) return 'crema de orez';
  const w = fara(titluri[h] || h).split(/[^a-z0-9]+/).filter(x => x && !STOP.has(x) && !/^\d/.test(x));
  return (w[0] || '').replace(/(a|e|i|ul|ului)$/,'').slice(0, 9);
};
const files = readdirSync(dir).filter(f => f.endsWith('.json'));
const toate = Object.fromEntries(files.map(f => [f.slice(0, -5), JSON.parse(readFileSync(join(dir, f), 'utf8'))]));
const cuv = s => (String(s || '').match(/[\p{L}\d][\p{L}\d’'-]*/gu) || []).length;
const prima = s => String(s || '').split(/(?<=[.!?])\s+/)[0];
// texte folosite de mai multe produse (intro Curiozități, întrebări, primele fraze ale răspunsurilor)
const folosit = {};
for (const [h, d] of Object.entries(toate)) {
  const c = d.curiozitati || {};
  for (const t of [c.intro, ...(c.sectiuni || []).flatMap(s => [s.intrebare, prima(s.raspuns)])]) if (t) (folosit[fara(t)] ||= new Set()).add(h);
}
const scor = reguli => { let total = 0; const lipsuri = []; for (const [p, ok, de] of reguli) ok ? total += p : lipsuri.push(`-${p}: ${de}`); return { total, lipsuri }; };

function evalueaza(h) {
  const d = toate[h]; const c = d.curiozitati || {}; const sec = c.sectiuni || []; const k = cheie(h);
  const are = s => !!k && fara(s).includes(k);
  const curTxt = [c.intro, ...sec.map(s => s.raspuns)].join(' ');
  const surse = c.surse || [];
  const pubmed = surse.filter(s => /pubmed\.ncbi\.nlm\.nih\.gov\/\d+/.test(s.url)).length;
  const oficiale = surse.filter(s => /eur-lex\.europa\.eu|efsa\.europa\.eu/.test(s.url)).length;
  const dubluri = [c.intro, ...sec.flatMap(s => [s.intrebare, prima(s.raspuns)])].filter(t => t && cuv(t) >= 5 && folosit[fara(t)]?.size > 1);
  const cifre = (curTxt.match(/\b\d+(?:[.,]\d+)?\s?(%|g\b|mg|µg|ml|kcal|kj|zile|porții|capsule|de|ani|ori)/gi) || []).length;
  const n = cuv(c.intro) + sec.reduce((a, s) => a + cuv(s.intrebare) + cuv(s.raspuns), 0); // ca în validator
  const seo = scor([
    [15, (d.titlu || '').length <= 90 && are(d.titlu), `titlul paginii nu conține cuvântul-cheie „${k}” sau are peste 90 de caractere`],
    [10, are(prima(String(d.intro || '').replace(/\[\[|\]\]/g, ''))) || are(String(d.intro || '').slice(0, 160)), `cuvântul-cheie „${k}” lipsește din începutul introducerii`],
    [10, are(c.titlu), `titlul „Curiozități” (H2) nu conține „${k}”`],
    [10, (d.imagine?.alt || '').length >= 30, 'textul alternativ al pozei lipsește sau are sub 30 de caractere'],
    [10, n >= 300 && n <= 400, `Curiozități are ${n} cuvinte (300–400)`],
    [10, sec.length >= 3 && sec.length <= 6 && sec.every(s => /\?$/.test(s.intrebare.trim())), 'întrebările nu sunt 3–6 sau nu se termină cu „?”'],
    [10, sec.some(s => are(s.intrebare)), `nicio întrebare H3 nu conține „${k}”`],
    [10, dubluri.length === 0, `texte identice cu ale altor produse: ${dubluri.map(t => '„' + t.slice(0, 40) + '…”').join(', ')}`],
    [10, (d.card_puncte?.puncte || []).length >= 4 && (d.carduri_ingrediente?.carduri || []).length >= 3, 'sub 4 puncte sau sub 3 carduri de ingrediente'],
    [5, (d.badge || []).length >= 2 && (d.etichete || []).length >= 3, 'prea puține badge-uri sau etichete'],
  ]);
  const ai = scor([
    [20, sec.every(s => cuv(prima(s.raspuns)) <= 25), `răspunsuri care nu încep cu o frază scurtă și directă: ${sec.filter(s => cuv(prima(s.raspuns)) > 25).map(s => '„' + s.intrebare + '”').join(', ')}`],
    [15, /(^|[^\p{L}])(este|sunt|înseamnă|e un|e o|are)(?![\p{L}])/iu.test(prima(sec[0]?.raspuns) + ' ' + (c.intro || '')), 'lipsește o definiție clară („X este…”) în intro sau în primul răspuns'],
    [15, surse.length >= 2 && (!/\b(studiu|studii|recenzi|meta-analiz|analiză din|cercet)/i.test(curTxt) || pubmed >= 1), 'surse prea puține sau studii pomenite fără link PubMed'],
    [15, cifre >= 6, `prea puține cifre concrete în Curiozități (${cifre}, minim 6)`],
    [10, are(c.intro) || are(prima(sec[0]?.raspuns)), `introducerea Curiozităților nu numește produsul/ingredientul („${k}”)`],
    [10, !/contribuie la/.test(JSON.stringify(d)) || surse.some(s => /2012\/432/.test(s.url)), 'mențiune de sănătate fără link spre Regulamentul (UE) 432/2012'],
    [10, oficiale >= 1 || pubmed >= 2, 'nicio sursă oficială (EUR-Lex/EFSA) și sub 2 studii PubMed'],
    [5, sec.length >= 4, `doar ${sec.length} întrebări (minim 4 pentru AI)`],
  ]);
  return { h, cheie: k, seo: seo.total, ai: ai.total, lipsuri: [...seo.lipsuri.map(x => 'SEO ' + x), ...ai.lipsuri.map(x => 'AI ' + x)] };
}

// Tab-ul „Beneficii cheie” vizual (câmpul „beneficii”, 16.11.2026): scor separat, SEO + AI din 100.
function evalBen(h) {
  const d = toate[h]; const b = d.beneficii; if (!b) return null; const k = cheie(h);
  const are = t => !!k && fara(t).includes(k);
  const car = b.carduri || [];
  const txt = [b.intro, b.conditie, ...car.flatMap(c => [c.titlu, c.text]), ...(b.de_ce?.puncte || []), ...(b.pasi || []).flatMap(p => [p.titlu, p.text]), b.nota].join(' ');
  const n = cuv([b.titlu, txt].join(' '));
  const cifre = (txt.match(/\b\d+(?:[.,]\d+)?\s?(%|g\b|mg|µg|ml|kcal|zile|capsule|de)/gi) || []).length;
  const surse = b.surse || [];
  const seo = scor([
    [20, (b.titlu || '').length <= 70 && are(b.titlu), `titlul (H2) nu conține „${k}” sau are peste 70 de caractere`],
    [15, are(prima(b.intro)), `prima frază din intro nu numește produsul („${k}”)`],
    [15, car.length >= 3 && car.length <= 6 && car.every(c => (c.titlu || '').length <= 28), '3–6 carduri, cu titluri de cel mult 28 de caractere'],
    [10, car.every(c => (c.text || '').length <= 160), 'texte de card peste 160 de caractere'],
    [10, (b.cifre || []).length === 3, 'trebuie exact 3 cifre mari'],
    [10, (b.pasi || []).length >= 3, 'sub 3 pași „Cum îl iei”'],
    [10, are(b.de_ce?.titlu) || /\?$/.test(b.de_ce?.titlu || ''), 'titlul „De ce” nu numește produsul și nu e întrebare'],
    [10, n >= 90 && n <= 260, `${n} cuvinte (90–260)`],
  ]);
  const ai = scor([
    [20, cuv(prima(b.intro)) <= 30, 'prima frază din intro are peste 30 de cuvinte'],
    [20, car.every(c => !/contribuie la/.test(c.text) || c.mentiune_autorizata), 'card cu mențiune fără marcajul mentiune_autorizata'],
    [20, !/contribuie la/.test(txt) || surse.some(x => /2012\/432/.test(x.url)), 'mențiuni fără link spre Regulamentul (UE) 432/2012'],
    [20, cifre >= 5, `prea puține cifre (${cifre}, minim 5)`],
    [20, /doz|VNR|capsule pe zi/i.test(b.conditie + ' ' + b.nota) && (!/(studiu|studii|recenzi|meta-analiz)/i.test(txt) || surse.some(x => /pubmed/.test(x.url))), 'lipsește condiția de doză sau un studiu e fără link PubMed'],
  ]);
  return { seo: seo.total, ai: ai.total, lipsuri: [...seo.lipsuri.map(x => 'BEN SEO ' + x), ...ai.lipsuri.map(x => 'BEN AI ' + x)] };
}

const args = process.argv.slice(2).filter(a => !a.startsWith('--'));
const sub = process.argv.includes('--sub100');
const rez = (args.length ? args : Object.keys(toate)).map(h => { const r = evalueaza(h); const b = evalBen(h); if (b) { r.ben = b; r.lipsuri.push(...b.lipsuri); } return r; });
for (const r of rez) {
  const okB = !r.ben || (r.ben.seo === 100 && r.ben.ai === 100);
  if (sub && r.seo === 100 && r.ai === 100 && okB) continue;
  console.log(`${r.seo === 100 && r.ai === 100 && okB ? '✓' : '✗'} ${r.h} [${r.cheie}]  SEO ${r.seo}  AI ${r.ai}${r.ben ? `  | Beneficii: SEO ${r.ben.seo}  AI ${r.ben.ai}` : ''}`);
  for (const l of r.lipsuri) console.log('   ' + l);
}
const ok = rez.filter(r => r.seo === 100 && r.ai === 100 && (!r.ben || (r.ben.seo === 100 && r.ben.ai === 100))).length;
console.log(`\n${ok}/${rez.length} produse cu SEO 100 și AI 100.`);
