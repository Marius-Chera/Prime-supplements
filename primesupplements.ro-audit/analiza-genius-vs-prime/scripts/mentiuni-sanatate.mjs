// Caută formulări de sănătate riscante (Reg. UE 1924/2006) în descrierile publice (/products/<h>.js). 1 cerere / 3 s.
import fs from 'node:fs'; import { fileURLToPath } from 'node:url';
const D = fileURLToPath(new URL('../date/', import.meta.url));
const O = { genius: 'https://geniusnutrition.ro', prime: 'https://primesupplements.ro' };
const H = { genius: ['whey-x5-2000g-61serv','isolate-x5-2000g-60serv','creatine-monohydrate-400g','creapure','warcry-pump-400g-20-serv','eaa-x5-360g-30-serv','bcaa-x5-360g-26serv','omega-3-90-softgels','vitamin-d3-k2-60caps-60serv','vitamin-c-60-tabs-60-serv','warcry-shredz-300g-30-serv','heavy-180caps','ashwagandha-90caps','super-greens-300g-30serv','collagen-x5-360g'],
  prime: ['prime-whey-2000g','pure-isolate-2000g','creatina-monohidrat-micronized-300g-fara-aroma','creatina-creapure','nitrox','eaa-aminoacizi-esentiali','recovery-bcaa-500g','omega-3','vitamina-d3-k2','vitamin-c-1000-80-caps','fat-burning-booster','l-carnitine-1000-80-caps','ashwagandha-ksm-66','daily-vitamin-formula','complete-collagen'] };
const RISC = /(arde(rea)? (de )?gr[aă]simi|ardere a gr[aă]similor|sl[aă]bi(re|t|re rapid)|pierd(ere|e) [îi]n greutate|topește|detox|vindec|trateaz[aă]|previne|cre[sș]te(rea)? (nivelul de )?testosteron|testosteron|anabolic|imunitat|anti-?cancer|anti-?inflamat|reduce stresul|anxietat|libido|metabolism(ul)? accelerat|accelereaz[aă] metabolismul|cre[sș]tere muscular[aă] rapid|garantat|100% sigur|fără efecte adverse)/gi;
const out = {};
for (const site of ['genius', 'prime']) for (const h of H[site]) {
  try { const r = await fetch(`${O[site]}/products/${h}.js`, { headers: { 'user-agent': 'Mozilla/5.0 Chrome/131' } });
    if (r.status !== 200) { out[`${site}:${h}`] = { status: r.status }; } else { const j = await r.json(); const t = (j.description || '').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ');
      const hits = []; let m; while ((m = RISC.exec(t))) hits.push(t.slice(Math.max(0, m.index - 70), m.index + 90));
      out[`${site}:${h}`] = { status: 200, title: j.title, n: hits.length, ex: hits.slice(0, 6) }; }
  } catch (e) { out[`${site}:${h}`] = { err: e.message }; }
  await new Promise(r => setTimeout(r, 3000)); }
fs.writeFileSync(D + 'mentiuni-sanatate.json', JSON.stringify(out, null, 1)); console.log('GATA');
