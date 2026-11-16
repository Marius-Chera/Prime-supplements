// Ambalează un fișier binar într-un PNG (3 octeți pe pixel, RGB, alfa 255), ca să poată fi
// încărcat în panoul de browser prin <img crossOrigin> + canvas (unde fetch e blocat de CSP).
// Primii 4 pixeli (12 octeți) conțin lungimea fișierului (uint32 big-endian) + 8 octeți zero.
// Utilizare: node bytes-to-png.mjs <fișier> <ieșire.png>
import fs from 'node:fs';
import zlib from 'node:zlib';

const [inp, out] = process.argv.slice(2);
const data = fs.readFileSync(inp);
const header = Buffer.alloc(12);
header.writeUInt32BE(data.length, 0);
const payload = Buffer.concat([header, data]);
const W = 256;
const pixels = Math.ceil(payload.length / 3);
const H = Math.ceil(pixels / W);
const raw = Buffer.alloc(H * (1 + W * 4));
for (let y = 0; y < H; y++) {
  raw[y * (1 + W * 4)] = 0; // filtru none
  for (let x = 0; x < W; x++) {
    const i = (y * W + x) * 3;
    const o = y * (1 + W * 4) + 1 + x * 4;
    raw[o] = payload[i] ?? 0;
    raw[o + 1] = payload[i + 1] ?? 0;
    raw[o + 2] = payload[i + 2] ?? 0;
    raw[o + 3] = 255;
  }
}
const crcTable = Array.from({ length: 256 }, (_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});
const crc = (buf) => {
  let c = 0xffffffff;
  for (const b of buf) c = crcTable[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
};
const chunk = (type, body) => {
  const len = Buffer.alloc(4); len.writeUInt32BE(body.length);
  const tb = Buffer.concat([Buffer.from(type), body]);
  const c = Buffer.alloc(4); c.writeUInt32BE(crc(tb));
  return Buffer.concat([len, tb, c]);
};
const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(W, 0); ihdr.writeUInt32BE(H, 4);
ihdr[8] = 8; ihdr[9] = 6; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0; // 8 biți, RGBA
const png = Buffer.concat([
  Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
  chunk('IHDR', ihdr), chunk('IDAT', zlib.deflateSync(raw, { level: 9 })), chunk('IEND', Buffer.alloc(0)),
]);
fs.writeFileSync(out, png);
console.log(`${inp}: ${data.length} octeți -> ${out} (${W}x${H}, ${png.length} octeți)`);
