// Amprenta textelor afișate (pentru verificarea scrierii pe PILOT): același algoritm rulează în browser pe .ppv.
// Rulare: node pagina-produs-vizuala/scripts/amprente.mjs h1 h2 ...  → {handle: hash}
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const dir = join(dirname(fileURLToPath(import.meta.url)), '..', 'date');
const n = s => String(s).normalize('NFC').replace(/\s+/g, ' ').trim();
const h = a => { let x = 5381; for (const c of a.map(n).join('|')) x = ((x * 33) ^ c.codePointAt(0)) >>> 0; return x.toString(36); };
const out = {};
for (const k of process.argv.slice(2)) {
  const d = JSON.parse(readFileSync(join(dir, k + '.json'), 'utf8'));
  const c = d.curiozitati || {};
  const a = [d.titlu, d.intro.replace(/\[\[|\]\]/g, ''), ...(d.card_puncte?.puncte || []),
    ...(d.carduri_ingrediente?.carduri || []).flatMap(x => [x.titlu, x.text]),
    ...(d.arome || []).flatMap(x => [x.nume, x.nota]),
    c.titlu, c.intro, ...(c.sectiuni || []).flatMap(s => [s.intrebare, ...String(s.raspuns).split(' ¶ ')])];
  out[k] = h(a.filter(v => v != null && v !== ''));
}
console.log(JSON.stringify(out));
