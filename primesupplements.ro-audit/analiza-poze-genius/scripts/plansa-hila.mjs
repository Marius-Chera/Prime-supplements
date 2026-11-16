// Planșă înainte/după pentru pozele din D:\Prime Supplements\Produse noi hila (doar local, nimic urcat).
import sharp from 'sharp';
import fs from 'node:fs';
const DIR = 'D:/Prime Supplements/Produse noi hila/';
const S = 380, G = 12, pairW = 2 * S + G, cols = 3, H = S + 26;
const t = [];
for (let i = 1; i <= 15; i++) {
  const src = DIR + (i === 1 ? 'ALL MERCH.png' : `ALL MERCH${i}.png`);
  const k = i - 1, x = (k % cols) * (pairW + 30) + 20, y = Math.floor(k / cols) * (H + 20) + 70;
  t.push({ input: await sharp(src).resize(S).toBuffer(), left: x, top: y });
  t.push({ input: await sharp(`demo/hila/all-merch${i}-dupa.jpg`).resize(S).toBuffer(), left: x + S + G, top: y });
  t.push({ input: Buffer.from(`<svg width="${pairW}" height="24"><text x="0" y="17" font-family="Arial" font-size="15" fill="#222">${i}. ${src.split('/').pop()} — înainte | după</text></svg>`), left: x, top: y + S + 2 });
}
const W = cols * (pairW + 30) + 10, HH = 5 * (H + 20) + 80;
t.push({ input: Buffer.from(`<svg width="${W}" height="60"><text x="20" y="40" font-family="Arial" font-size="26" font-weight="bold" fill="#111">Produse noi – test stil „studio alb” (decupare AI locală + script), 16.11.2026</text></svg>`), left: 0, top: 0 });
await sharp({ create: { width: W, height: HH, channels: 3, background: '#e9ebef' } }).composite(t).jpeg({ quality: 84 }).toFile('demo/hila/PLANSA-INAINTE-DUPA.jpg');
console.log('ok');
