// Prețuri publice (/products/<handle>.js) pentru 10 perechi echivalente. Doar citire, 1 cerere / 1,5 s.
import fs from 'node:fs'; import { fileURLToPath } from 'node:url';
const D = fileURLToPath(new URL('../date/', import.meta.url));
const PERECHI = [
  ['Whey 2 kg', 'whey-x5-2000g-61serv', 'prime-whey-2000g'],
  ['Izolat din zer 2 kg', 'isolate-x5-2000g-60serv', 'pure-isolate-2000g'],
  ['Creatină monohidrat', 'creatine-monohydrate-400g', 'creatina-monohidrat-micronized-300g-fara-aroma'],
  ['Creatină Creapure', 'creapure', 'creatina-creapure'],
  ['Pre-workout', 'warcry-pump-400g-20-serv', 'nitrox'],
  ['EAA', 'eaa-x5-360g-30-serv', 'eaa-aminoacizi-esentiali'],
  ['BCAA', 'bcaa-x5-360g-26serv', 'recovery-bcaa-500g'],
  ['Omega-3', 'omega-3-90-softgels', 'omega-3'],
  ['Vitamina D3+K2', 'vitamin-d3-k2-60caps-60serv', 'vitamina-d3-k2'],
  ['Vitamina C', 'vitamin-c-60-tabs-60-serv', 'vitamin-c-1000-80-caps'],
];
const O = { genius: 'https://geniusnutrition.ro', prime: 'https://primesupplements.ro' };
const strip = h => (h || '').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ');
const out = [];
for (const [cat, g, p] of PERECHI) { const row = { cat };
  for (const [site, h] of [['genius', g], ['prime', p]]) {
    try { const r = await fetch(`${O[site]}/products/${h}.js`, { headers: { 'user-agent': 'Mozilla/5.0 Chrome/131' } }); const j = await r.json();
      const txt = strip(j.description);
      row[site] = { handle: h, title: j.title, vendor: j.vendor, available: j.available,
        variante: j.variants.map(v => ({ t: v.title, pret: v.price / 100, pretVechi: v.compare_at_price ? v.compare_at_price / 100 : null, stoc: v.available, sku: v.sku, barcode: !!v.barcode })),
        portii: (txt.match(/(\d{1,3})\s*(porții|portii|serviri|doze|servings)/i) || [])[1] || (j.title.match(/(\d{1,3})\s*serv/i) || [])[1] || null,
        cuvinteDescriere: (txt.match(/[\p{L}\d]+/gu) || []).length, imagini: j.images.length };
    } catch (e) { row[site] = { handle: h, eroare: e.message }; }
    await new Promise(r => setTimeout(r, 1500)); }
  out.push(row); }
fs.writeFileSync(D + 'preturi-10-perechi.json', JSON.stringify(out, null, 1));
for (const r of out) console.log(r.cat, '|', ['genius', 'prime'].map(s => r[s].eroare ? 'ERR' : `${r[s].title} ${r[s].variante[0].pret} (${r[s].variante[0].pretVechi ?? '-'}) porții:${r[s].portii} cuv:${r[s].cuvinteDescriere}`).join(' || '));
