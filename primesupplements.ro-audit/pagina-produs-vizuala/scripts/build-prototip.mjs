// Construiește prototip-recovery-bcaa.html din sursa HTML + date/recovery-bcaa-500g.json.
// Rulare: node pagina-produs-vizuala/scripts/build-prototip.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = readFileSync(join(root, 'prototip-recovery-bcaa.sursa.html'), 'utf8');
const data = JSON.stringify(JSON.parse(readFileSync(join(root, 'date', 'recovery-bcaa-500g.json'), 'utf8')), null, 2).replace(/</g, '\\u003c');
// CSS-ul secțiunii e pus inline, ca fișierul HTML să meargă singur (dublu-click, trimis pe telefon etc.).
const css = readFileSync(join(root, 'liquid', 'assets', 'prime-pagina-vizuala.css'), 'utf8');
const out = src
  .replace('<link rel="stylesheet" href="liquid/assets/prime-pagina-vizuala.css">', () => `<style>\n${css}\n</style>`)
  .replace('__DATA__', () => data);
writeFileSync(join(root, 'prototip-recovery-bcaa.html'), out);
console.log('scris prototip-recovery-bcaa.html');
