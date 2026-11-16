// Lotul final „studio alb” pe tot catalogul de suplimente (cerut de Marius pe 16.11: „la toate pozele de pe site … enchant la calitate … simetric la toate”).
// Surse = pozele ORIGINALE din magazin (backup lot 1 + lot 2). Pași: copiere în in/ -> decupare AI (decupare_ai.py) -> stil_genius.py --imbunatatire 1
// Scrie magazin/lot-final/plan.json: [{id, handle, filename, src, out, opt}]
// Utilizare: node scripts/lot-final.mjs plan | node scripts/lot-final.mjs stil
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
import sharp from 'sharp';
const pas = process.argv[2];
const ROOT = 'magazin/lot-final';
const ALESE = [...range(1, 10), 12, ...range(14, 30), ...range(32, 41), ...range(43, 50), ...range(52, 65), 67, 68, 72, 74, ...range(76, 81),
  ...range(85, 89), ...range(91, 94), 97, 98, ...range(100, 108), ...range(114, 120)];
const FARA_REFLEXIE = new Set([1, 3, 24, 26]);            // batoane fotografiate „plutind”
const CUTII = new Set([2, 4, 25, 27, 65, 68, 103, 104, 105, 106, 107, 108]);
function range(a, b) { return Array.from({ length: b - a + 1 }, (_, i) => a + i); }
const slug = (f) => f.replace(/\.[^.]+$/, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

if (pas === 'plan') {
  const C = JSON.parse(fs.readFileSync('magazin/catalog/candidate-local.json', 'utf8'));
  const B = JSON.parse(fs.readFileSync('magazin/backup-index.json', 'utf8'));
  fs.mkdirSync(ROOT + '/in', { recursive: true });
  const plan = [];
  for (const nr of ALESE) {
    const c = C.find((x) => x.nr === nr);
    let opt = '';
    if (FARA_REFLEXIE.has(nr)) opt = '--lucios 0.5 --reflexie 0.0001';
    else if (CUTII.has(nr)) opt = '--lucios 0.5';
    plan.push({ id: c.id, handle: c.handle, filename: c.filename, src: c.local, opt, lot: 2, nr });
  }
  for (const b of B) {
    const filename = b.url.split('/').pop();
    let opt = '';
    if (filename === 'ALLMERCH14.png') opt = '--lucios 0.5 --reflexie 0.0001';
    else if (/^ALLMERCH(7|8|9|10|11|12|13)\.png$/.test(filename)) opt = '--lucios 0.5';
    plan.push({ id: b.id, handle: b.prod, filename, src: b.backup, opt, lot: 1 });
  }
  for (const p of plan) {
    p.in = `${ROOT}/in/${p.filename}`;
    p.cut = `${ROOT}/decupat/${slug(p.filename)}.png`;
    p.out = `${ROOT}/out/${p.filename}`;
    if (!fs.existsSync(p.in)) fs.copyFileSync(p.src, p.in);
  }
  fs.writeFileSync(ROOT + '/plan.json', JSON.stringify(plan, null, 1));
  console.log('plan', plan.length, 'lot1', plan.filter((p) => p.lot === 1).length, 'lot2', plan.filter((p) => p.lot === 2).length);
}

if (pas === 'stil') {
  const plan = JSON.parse(fs.readFileSync(ROOT + '/plan.json', 'utf8'));
  fs.mkdirSync(ROOT + '/out', { recursive: true });
  let n = 0;
  for (const p of plan) {
    const tmp = `${ROOT}/out/${slug(p.filename)}.tmp.jpg`;
    const args = ['run', '--no-project', '--with', 'pillow', '--with', 'numpy', '--with', 'scipy', 'python', '-I', '-X', 'utf8', 'scripts/stil_genius.py', p.cut, tmp, '--imbunatatire', '1', ...p.opt.split(' ').filter(Boolean)];
    execFileSync('uv', args, { stdio: 'ignore' });
    if (p.filename.toLowerCase().endsWith('.png')) await sharp(tmp).png({ compressionLevel: 9 }).toFile(p.out);
    else fs.copyFileSync(tmp, p.out);
    fs.unlinkSync(tmp);
    if (++n % 20 === 0) console.log(n);
  }
  console.log('stil gata', n);
}
