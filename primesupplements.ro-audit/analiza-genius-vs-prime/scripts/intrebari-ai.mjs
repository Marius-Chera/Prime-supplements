// 20 de întrebări de client, trimise la Gemini API cu Google Search grounding (cheia gratuită GEMINI_API_KEY de pe PC).
// Numără mențiunile (în text) și citările (în sursele de grounding) pentru fiecare site. Nu simulează nimic.
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
const OUT = fileURLToPath(new URL('../date/', import.meta.url));
export const INTREBARI = [
  'De unde cumpăr proteină whey bună în România?',
  'Care este cel mai bun magazin online de suplimente sportive din România?',
  'Creatină monohidrat la preț bun în România, ce recomanzi?',
  'Ce proteină whey românească îmi recomanzi?',
  'Cel mai bun pre-workout disponibil în România?',
  'Unde găsesc creatină Creapure în România?',
  'Ce aminoacizi EAA sau BCAA să cumpăr în România?',
  'Recomandă-mi un izolat proteic din zer bun, de cumpărat online în România.',
  'Magazin de suplimente sportive cu livrare rapidă în România',
  'Ce suplimente să iau la sală ca începător și de unde le cumpăr în România?',
  'Branduri românești de suplimente sportive de încredere',
  'Omega-3 bun pentru sportivi, de unde cumpăr în România?',
  'Gainer pentru masă musculară, ce recomanzi în România?',
  'Magazin de suplimente sportive în Sibiu',
  'Genius Nutrition sau Prime Supplements, care e mai bun?',
  'Proteină whey cu raport bun calitate-preț în România 2026',
  'Ce cremă de orez să cumpăr în România?',
  'Suplimente sportive cu reduceri și livrare gratuită în România',
  'Ce vitamine pentru sportivi recomanzi, de cumpărat din România?',
  'Care sunt cele mai bune magazine online de proteine din România?',
];
const KEY = process.env.GEMINI_API_KEY; if (!KEY) { console.error('Lipsește GEMINI_API_KEY'); process.exit(1); }
const MODELS = ['gemini-3.5-flash', 'gemini-3.5-flash-lite'];
const sleep = ms => new Promise(r => setTimeout(r, ms));
const rez = [];
for (const [i, q] of INTREBARI.entries()) {
  let out = null;
  for (const m of MODELS) for (let t = 0; t < 3 && !out; t++) {
    const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent`, { method: 'POST',
      headers: { 'x-goog-api-key': KEY, 'content-type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: q + ' Răspunde în română.' }] }], ...(process.env.FARA_CAUTARE ? {} : { tools: [{ google_search: {} }] }) }) });
    if (r.ok) { const j = await r.json(); out = { model: m, j }; break; }
    console.error(i + 1, m, r.status); await sleep(r.status === 429 ? 30000 : 8000);
  }
  if (!out) { rez.push({ nr: i + 1, intrebare: q, eroare: true }); continue; }
  const c = out.j.candidates?.[0]; const text = (c?.content?.parts || []).map(p => p.text || '').join('');
  const surse = (c?.groundingMetadata?.groundingChunks || []).map(g => ({ titlu: g.web?.title, uri: g.web?.uri }));
  const m = (re) => (text.match(re) || []).length;
  rez.push({ nr: i + 1, intrebare: q, model: out.model, cautari: c?.groundingMetadata?.webSearchQueries || [],
    genius_mentiuni: m(/genius\s*nutrition|geniusnutrition/gi), prime_mentiuni: m(/prime\s*supplements|primesupplements/gi),
    genius_sursa: surse.filter(s => /genius/i.test((s.titlu || '') + s.uri)).length, prime_sursa: surse.filter(s => /primesupplements|prime supplements/i.test((s.titlu || '') + s.uri)).length,
    surse_titluri: surse.map(s => s.titlu), raspuns: text });
  console.error(i + 1, out.model, 'G', rez.at(-1).genius_mentiuni, 'P', rez.at(-1).prime_mentiuni);
  fs.writeFileSync(`${OUT}intrebari-ai-gemini${process.env.FARA_CAUTARE ? '-fara-cautare' : ''}.json`, JSON.stringify({ data: new Date().toISOString(), metoda: process.env.FARA_CAUTARE ? 'Gemini API FĂRĂ căutare (memoria modelului), fără context de cont' : 'Gemini API + google_search grounding', rez }, null, 1));
  await sleep(7000);
}
