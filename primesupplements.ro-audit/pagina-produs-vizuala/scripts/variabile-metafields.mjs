// Tipărește variabilele pentru metafieldsSet din date/<handle>.json + inventar.json (doar citește fișiere locale).
// Rulare: node pagina-produs-vizuala/scripts/variabile-metafields.mjs [--doar-curiozitati] h1 h2 ...
//   implicit: prime.pagina_vizuala (fără câmpul curiozitati) + prime.curiozitati (dacă există)
//   --doar-curiozitati: doar prime.curiozitati (pentru produsele care au deja pagina vizuală scrisă)
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const ids = Object.fromEntries(JSON.parse(readFileSync(join(root, 'inventar.json'), 'utf8')).produse.map(([h, id]) => [h, id]));
const doarCur = process.argv.includes('--doar-curiozitati');
const metafields = [];
for (const h of process.argv.slice(2).filter(a => !a.startsWith('--'))) {
  const d = JSON.parse(readFileSync(join(root, 'date', h + '.json'), 'utf8'));
  if (!ids[h]) throw new Error('fără ID în inventar: ' + h);
  const ownerId = `gid://shopify/Product/${ids[h]}`;
  const { curiozitati, ...pagina } = d;
  if (!doarCur) metafields.push({ ownerId, namespace: 'prime', key: 'pagina_vizuala', type: 'json', value: JSON.stringify(pagina) });
  if (curiozitati) metafields.push({ ownerId, namespace: 'prime', key: 'curiozitati', type: 'json', value: JSON.stringify(curiozitati) });
}
process.stdout.write(JSON.stringify({ metafields }));
