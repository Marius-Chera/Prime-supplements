// Planșă de contact (miniaturi cu etichetă) pentru analiza vizuală internă.
// Utilizare: node scripts/planse.mjs genius|prime [coloane] [latura]
import fs from 'node:fs';
import sharp from 'sharp';
const site = process.argv[2] || 'genius';
const cols = +process.argv[3] || 8;
const S = +process.argv[4] || 300;
const poze = JSON.parse(fs.readFileSync(`date/${site}-poze.json`, 'utf8'));
const rows = Math.ceil(poze.length / cols);
const H = S + 22;
const tiles = [];
for (const [i, p] of poze.entries()) {
  const img = await sharp(p.fisier).flatten({ background: '#ff00ff' }).resize(S, S, { fit: 'contain', background: '#ff00ff' }).png().toBuffer();
  const label = Buffer.from(`<svg width="${S}" height="22"><rect width="100%" height="100%" fill="#222"/><text x="4" y="15" font-size="12" font-family="Arial" fill="#fff">${i + 1}. ${p.handle.slice(0, 32)} #${p.idx}</text></svg>`);
  tiles.push({ input: img, left: (i % cols) * S, top: Math.floor(i / cols) * H });
  tiles.push({ input: label, left: (i % cols) * S, top: Math.floor(i / cols) * H + S });
}
await sharp({ create: { width: cols * S, height: rows * H, channels: 3, background: '#888' } }).composite(tiles).jpeg({ quality: 85 }).toFile(`decupaje/plansa-${site}.jpg`);
console.log('ok', poze.length);
