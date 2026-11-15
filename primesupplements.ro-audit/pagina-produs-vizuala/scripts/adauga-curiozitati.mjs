// Îmbină câmpul `curiozitati` din fișierul dat ({handle: {titlu, intro, sectiuni, surse}}) în date/<handle>.json.
// Rulare: node pagina-produs-vizuala/scripts/adauga-curiozitati.mjs <fisier.json>   (doar fișiere locale)
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const dir = join(dirname(fileURLToPath(import.meta.url)), '..', 'date');
const src = JSON.parse(readFileSync(process.argv[2], 'utf8'));
for (const [h, cur] of Object.entries(src)) {
  const f = join(dir, h + '.json');
  if (!existsSync(f)) { console.log(`✗ ${h}: lipsește date/${h}.json`); continue; }
  const d = JSON.parse(readFileSync(f, 'utf8'));
  d.curiozitati = cur;
  writeFileSync(f, JSON.stringify(d, null, 2) + '\n');
  console.log(`✓ ${h}`);
}
