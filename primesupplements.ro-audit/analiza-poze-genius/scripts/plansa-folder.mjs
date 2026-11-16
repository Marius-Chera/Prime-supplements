// Planșă înainte/după generică: node scripts/plansa-folder.mjs "<folder original>" <folder demo> "<titlu>"
// Perechi: original <nume>.jpg/.png  ->  <demo>/<slug>-dupa.jpg (slug = nume cu litere mici și cratime, ca în decupare_ai.py)
import sharp from 'sharp';
import fs from 'node:fs';
const [, , SRC, OUT, TITLU = 'Înainte | după'] = process.argv;
const files = fs.readdirSync(SRC).filter((f) => /\.(png|jpe?g)$/i.test(f)).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
const slug = (f) => f.replace(/\.[^.]+$/, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const S = 330, G = 10, pairW = 2 * S + G, cols = 3, H = S + 26;
const t = [];
for (const [k, f] of files.entries()) {
  const x = (k % cols) * (pairW + 30) + 20, y = Math.floor(k / cols) * (H + 16) + 66;
  t.push({ input: await sharp(SRC + '/' + f).resize(S).toBuffer(), left: x, top: y });
  t.push({ input: await sharp(`${OUT}/${slug(f)}-dupa.jpg`).resize(S).toBuffer(), left: x + S + G, top: y });
  t.push({ input: Buffer.from(`<svg width="${pairW}" height="24"><text x="0" y="17" font-family="Arial" font-size="14" fill="#222">${k + 1}. ${f} — înainte | după</text></svg>`), left: x, top: y + S + 2 });
}
const W = cols * (pairW + 30) + 10, HH = Math.ceil(files.length / cols) * (H + 16) + 76;
t.push({ input: Buffer.from(`<svg width="${W}" height="56"><text x="20" y="38" font-family="Arial" font-size="24" font-weight="bold" fill="#111">${TITLU}</text></svg>`), left: 0, top: 0 });
await sharp({ create: { width: W, height: HH, channels: 3, background: '#e9ebef' } }).composite(t).jpeg({ quality: 82 }).toFile(`${OUT}/PLANSA-INAINTE-DUPA.jpg`);
console.log('ok', files.length);
