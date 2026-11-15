// Verifică fișierele pagina-produs-vizuala/date/<handle>.json înainte de orice scriere în Shopify.
// Rulare: node pagina-produs-vizuala/scripts/valideaza-pagina-vizuala.mjs pagina-produs-vizuala/date [--permite-de-verificat]
// Iese cu cod 1 dacă există erori. Nu scrie nimic nicăieri.
// Dacă lângă JSON există <handle>.eticheta.txt (textul etichetei / tabelului nutrițional), fiecare cifră
// din badge, cifre, card_formula și intro trebuie să apară în etichetă (fără valori inventate).
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const dir = process.argv[2] && !process.argv[2].startsWith('--') ? process.argv[2] : join(here, '..', 'date');
const allowTodo = process.argv.includes('--permite-de-verificat');
const claims = JSON.parse(readFileSync(join(here, '..', 'mentiuni-autorizate.json'), 'utf8'));
const norm = s => s.toLowerCase().replace(/\s+/g, ' ').trim();
const allowed = new Set(Object.values(claims.mentiuni).flat().map(norm));

function texts(o, path = '', out = []) {
  if (typeof o === 'string') out.push([path, o]);
  else if (Array.isArray(o)) o.forEach((v, i) => texts(v, `${path}[${i}]`, out));
  else if (o && typeof o === 'object') for (const [k, v] of Object.entries(o)) {
    if (['handle', 'sursa_datelor', 'de_verificat', 'varianta', 'tema', 'url', 'surse'].includes(k)) continue;
    texts(v, path ? `${path}.${k}` : k, out);
  }
  return out;
}

const INTERZISE = [
  /vindec/i, /trateaz/i, /\bpreven|\bprevin/i, /\bboal/i, /slăbi|slabi/i, /arde (grăsim|grasim)/i, /detox/i,
  /anabolic/i, /catabol/i, /hormon/i, /testosteron/i, /garant/i, /miracul/i, /revoluționar|revolutionar/i,
  /superior/i, /cel mai bun/i, /clinic/i, /imbatabil/i, /absorbție rapidă|absorbtie rapida/i, /recuperare rapidă|recuperare rapida/i
];
const ENGLEZA = /\b(the|and|with|per serving|your|for|free|added|sugar|serving|flavou?r|best|premium)\b/i;
const EFECT = /(stimuleaz|susține|ajută|favorizează|stimulează|accelerează|reduce|îmbunătățește|crește|protejează|contribuie)/i;
const OBLIGATORII = ['titlu', 'intro', 'badge', 'etichete', 'cifre', 'carduri_ingrediente'];

// O propoziție cu „contribuie la” e acceptată dacă e identică cu o mențiune autorizată sau dacă
// unește două mențiuni autorizate ale aceluiași nutrient („X contribuie la A și la B.”).
function claimOk(s) {
  if (allowed.has(norm(s))) return true;
  const m = s.match(/^(.+?) contribuie la (.+?) și la (.+?)\.?$/);
  return !!m && allowed.has(norm(`${m[1]} contribuie la ${m[2]}.`)) && allowed.has(norm(`${m[1]} contribuie la ${m[3]}.`.replace(/\.\.$/, '.')));
}

let total = 0, cuErori = 0;
for (const f of readdirSync(dir).filter(n => n.endsWith('.json'))) {
  total++;
  const errs = [], warns = [];
  let d;
  try { d = JSON.parse(readFileSync(join(dir, f), 'utf8')); } catch (e) { console.log(`✗ ${f}: JSON invalid (${e.message})`); cuErori++; continue; }

  for (const k of OBLIGATORII) if (d[k] == null || d[k] === '' || (Array.isArray(d[k]) && !d[k].length)) errs.push(`lipsește ${k}`);
  if (Array.isArray(d.cifre) && d.cifre.length !== 4) errs.push(`cifre: trebuie exact 4 (are ${d.cifre.length})`);
  if (Array.isArray(d.badge) && (d.badge.length < 2 || d.badge.length > 5)) errs.push('badge: 2–5 elemente');
  if (Array.isArray(d.etichete) && (d.etichete.length < 3 || d.etichete.length > 8)) errs.push('etichete: 3–8 elemente');
  const carduri = d.carduri_ingrediente?.carduri || [];
  if (carduri.length < 3 || carduri.length > 9) errs.push('carduri_ingrediente: 3–9 carduri');
  carduri.forEach((c, i) => { if (!c.cod || c.cod.length > 4) errs.push(`carduri[${i}].cod: 1–4 caractere`); });
  if ((d.titlu || '').length > 90) errs.push('titlu: max 90 de caractere');
  if ((d.intro || '').length > 600) errs.push('intro: max 600 de caractere');
  if (((d.intro || '').match(/\[\[/g) || []).length !== ((d.intro || '').match(/\]\]/g) || []).length) errs.push('intro: [[ ]] neperechi');

  if (d.tema != null && !['rosu','albastru','verde','mov','portocaliu','roz'].includes(d.tema)) errs.push('tema: rosu | albastru | verde | mov | portocaliu | roz');
  if (d.imagine && !String(d.imagine.url || '').startsWith('https://cdn.shopify.com/')) errs.push('imagine.url: doar poze din Shopify Files (cdn.shopify.com)');
  if (d.imagine && !d.imagine.alt) errs.push('imagine.alt: text alternativ obligatoriu');
  // „Curiozități” (15.11.2026): 300–400 de cuvinte (intro + întrebări + răspunsuri), 3–6 întrebări H3 care se termină cu „?”,
  // un singur titlu (H2), surse doar de pe PubMed / EUR-Lex / EFSA. Cuvintele interzise și mențiunile se verifică mai jos,
  // pe toate textele, ca la restul paginii. Lipsa secțiunii = avertisment (eroare cu --cere-curiozitati).
  const cur = d.curiozitati;
  if (!cur) (process.argv.includes('--cere-curiozitati') ? errs : warns).push('lipsește curiozitati');
  else {
    const sec = cur.sectiuni || [];
    const cuv = s => (String(s || '').match(/[\p{L}\d][\p{L}\d’'-]*/gu) || []).length;
    const n = cuv(cur.intro) + sec.reduce((a, s) => a + cuv(s.intrebare) + cuv(s.raspuns), 0);
    if (n < 300 || n > 400) errs.push(`curiozitati: ${n} cuvinte (trebuie 300–400)`);
    if (!cur.titlu || cur.titlu.length > 80) errs.push('curiozitati.titlu: obligatoriu, max 80 de caractere');
    if (sec.length < 3 || sec.length > 6) errs.push(`curiozitati.sectiuni: 3–6 (are ${sec.length})`);
    sec.forEach((s, i) => {
      if (!/\?$/.test((s.intrebare || '').trim())) errs.push(`curiozitati.sectiuni[${i}].intrebare: trebuie să fie o întrebare (se termină cu „?”)`);
      if ((s.intrebare || '').length > 110) errs.push(`curiozitati.sectiuni[${i}].intrebare: max 110 caractere`);
      const first = String(s.raspuns || '').split(/(?<=[.!?])\s/)[0];
      if (cuv(first) > 40) warns.push(`curiozitati.sectiuni[${i}]: prima frază are ${cuv(first)} cuvinte (răspunsul direct trebuie să fie scurt)`);
    });
    for (const [i, s] of (cur.surse || []).entries()) {
      if (!/^https:\/\/(pubmed\.ncbi\.nlm\.nih\.gov|eur-lex\.europa\.eu|www\.efsa\.europa\.eu|efsa\.onlinelibrary\.wiley\.com|doi\.org)\//.test(s.url || '')) errs.push(`curiozitati.surse[${i}]: doar PubMed, EUR-Lex, EFSA sau DOI (${s.url})`);
      if (!s.text) errs.push(`curiozitati.surse[${i}].text lipsă`);
    }
    const curTxt = [cur.intro, ...sec.map(s => s.raspuns)].join(' ');
    if (/\d+(?:[.,]\d+)?\s?(%|mg|g\b|µg|mcg|kcal|ani|de ani)/.test(curTxt) && !(cur.surse || []).length) warns.push('curiozitati: are cifre, dar nicio sursă (cifrele care nu vin de pe etichetă trebuie să aibă sursă PubMed/EUR-Lex)');
    if (/furnizor|fabric[aă] (din|de la)|producător(ul)? /i.test(curTxt)) errs.push('curiozitati: fără furnizor sau fabrică');
  }

  const all = texts(d);
  const joined = all.map(([, t]) => t).join(' ');
  // „DE VERIFICAT” într-un text afișat = blocant; lista de_verificat = goluri interne (nu se afișează), doar avertisment.
  if (!allowTodo && /DE VERIFICAT/.test(joined)) errs.push('DE VERIFICAT rămas într-un text afișat clienților');
  for (const x of d.de_verificat || []) warns.push(`de completat (intern): ${x}`);
  if (joined.length > 200 && !/[ăâîșț]/i.test(joined)) errs.push('fără diacritice: textul trebuie scris cu ă, â, î, ș, ț');
  if (/[şţŞŢ]/.test(joined)) warns.push('ş/ţ cu sedilă: folosește ș/ț cu virgulă');
  for (const [p, t] of all) {
    for (const r of INTERZISE) if (r.test(t)) errs.push(`${p}: cuvânt interzis (${r.source}) în „${t.slice(0, 80)}”`);
    if (ENGLEZA.test(t.replace(/\b(Cherry|Pear|Creapure|Kyowa)\b/g, ''))) warns.push(`${p}: posibil text în engleză: „${t.slice(0, 80)}”`);
    if (/[¹²³]|Ã|â€/.test(t)) errs.push(`${p}: caractere stricate (encoding) în „${t.slice(0, 60)}”`);
    for (const s of t.split(/(?<=\.)\s+/)) {
      if (/contribuie la|crește performanța/i.test(s) && !claimOk(s)) errs.push(`${p}: mențiune de sănătate care nu e în mentiuni-autorizate.json: „${s}”`);
      // Ingrediente fără mențiune autorizată (BCAA, leucină, glutamină…) + verb de efect = eroare.
      // Comparația ignoră diacriticele și terminația (leucină / leucina / leucinei).
      if (claimOk(s)) continue;
      const plain = s.normalize('NFD').replace(/[̀-ͯ]/g, '');
      for (const n of claims.fara_mentiuni_autorizate) {
        const stem = n.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[ae]$/i, '');
        if (new RegExp(`\\b${stem}`, 'i').test(plain) && EFECT.test(s)) errs.push(`${p}: efect atribuit unui ingredient fără mențiune autorizată (${n}): „${s}”`);
      }
    }
  }

  const lbl = join(dir, basename(f, '.json') + '.eticheta.txt');
  if (existsSync(lbl)) {
    const L = readFileSync(lbl, 'utf8').replace(/\s+/g, ' ');
    const surse = [...(d.badge || []), ...(d.cifre || []).map(c => c.valoare), ...(d.card_formula?.randuri || []).map(r => r.valoare), d.intro || ''];
    for (const s of surse) for (const n of String(s).match(/\d+(?:[.,]\d+)?/g) || []) {
      if (!L.includes(n)) errs.push(`cifra „${n}” (din „${String(s).slice(0, 50)}”) nu apare în ${basename(lbl)}`);
    }
  } else warns.push(`lipsește ${basename(lbl)}: cifrele nu au fost comparate cu eticheta`);

  const ok = !errs.length;
  if (!ok) cuErori++;
  console.log(`${ok ? '✓' : '✗'} ${f}${errs.length ? `: ${errs.length} erori` : ''}${warns.length ? `, ${warns.length} avertismente` : ''}`);
  for (const e of errs) console.log(`   EROARE  ${e}`);
  for (const w of warns) console.log(`   atenție ${w}`);
}
console.log(`\n${total} fișiere, ${cuErori} cu erori.`);
process.exit(cuErori ? 1 : 0);
