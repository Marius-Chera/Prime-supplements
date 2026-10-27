// Chera Protocol – generatorul logoului. Text transformat în contururi (fără dependență de fonturi).
// Rulează: node brand/genereaza-logo.mjs   (din folderul chera-coaching)
import { createRequire } from "node:module";
import { writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(path.join(here, "../site/tools/package.json"));
const opentype = require("opentype.js");

const F = (n) => opentype.loadSync(path.join(here, "fonts", n));
const XB = F("BarlowCondensed-ExtraBold.ttf");
const BD = F("BarlowCondensed-Bold.ttf");
const SB = F("Barlow-SemiBold.ttf");

const RED = "#e1251b", INK = "#0e0d0d", PAPER = "#f5f1ec";
const out = path.join(here, "logo");
mkdirSync(out, { recursive: true });

// text → contur, cu tracking (în em) și kerning
function text(font, str, size, tracking = 0) {
  const scale = size / font.unitsPerEm;
  const glyphs = font.stringToGlyphs(str);
  let x = 0, d = "";
  glyphs.forEach((g, i) => {
    d += g.getPath(x, 0, size).toPathData(2);
    x += g.advanceWidth * scale;
    if (i < glyphs.length - 1) x += font.getKerningValue(g, glyphs[i + 1]) * scale + tracking * size;
  });
  const cap = (font.tables.os2.sCapHeight || font.unitsPerEm * 0.7) * scale;
  // lățimea vizuală: fără spațiul lateral al ultimei litere
  const last = glyphs[glyphs.length - 1], bb = last.getBoundingBox();
  const width = x - last.advanceWidth * scale + bb.x2 * scale;
  const first = glyphs[0].getBoundingBox();
  return { d, width, cap, left: first.x1 * scale };
}
const g = (t, dx, dy, fill) => `<path transform="translate(${(dx - t.left).toFixed(2)} ${dy.toFixed(2)})" fill="${fill}" d="${t.d}"/>`;

// ===== Monograma: placă cu colțuri teșite, „C” + „P” =====
function mark(size, { bg = INK, c = PAPER, p = RED, border = RED } = {}) {
  const S = 512, k = 64, bw = 10;
  const oct = (o) => `M${k + o} ${o} H${S - k - o} L${S - o} ${k + o} V${S - k - o} L${S - k - o} ${S - o} H${k + o} L${o} ${S - k - o} V${k + o} Z`;
  const C = text(XB, "C", 330), P = text(XB, "P", 330);
  const gap = 14, total = C.width + gap + P.width;
  const x0 = (S - total) / 2, base = S / 2 + C.cap / 2 - 8;
  const bar = `<rect x="${x0.toFixed(1)}" y="${(base + 26).toFixed(1)}" width="${total.toFixed(1)}" height="16" fill="${p}"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${S} ${S}" width="${size}" height="${size}">
  ${bg === "transparent" ? `<path d="${oct(0)} ${oct(bw)}" fill="${border}" fill-rule="evenodd"/>` : `<path d="${oct(0)}" fill="${border}"/><path d="${oct(bw)}" fill="${bg}"/>`}
  ${g(C, x0, base, c)}${g(P, x0 + C.width + gap, base, p)}${bar}
</svg>`;
}

// ===== Logo orizontal: monogramă + CHERA PROTOCOL + linie de subtitlu =====
function horizontal({ fg = PAPER, red = RED, markBg = INK, tagline = true } = {}) {
  const H = 220, mS = 220;
  const A = text(XB, "CHERA", 132, 0.02), B = text(XB, "PROTOCOL", 132, 0.02);
  const sp = 30, gx = mS + 54;
  const tag = text(SB, "ONLINE COACHING · MARIUS CHERA", 30, 0.16);
  const base = tagline ? 128 : 160;
  const wordW = A.width + sp + B.width;
  const W = Math.ceil(gx + Math.max(wordW, tag.width) + 4);
  const markSvg = mark(mS, { bg: markBg, c: markBg === "transparent" ? fg : (markBg === "#ffffff" ? INK : PAPER), p: red, border: red }).replace(/<svg[^>]*>/, `<svg x="0" y="0" width="${mS}" height="${mS}" viewBox="0 0 512 512">`);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
  ${markSvg}
  ${g(A, gx, base, fg)}${g(B, gx + A.width + sp, base, red)}
  ${tagline ? `<rect x="${gx}" y="${base + 22}" width="${wordW.toFixed(1)}" height="5" fill="${red}"/>${g(tag, gx, base + 72, fg)}` : ""}
</svg>`;
}

// ===== Logo vertical: monogramă deasupra, CHERA mare, PROTOCOL potrivit la aceeași lățime =====
function vertical({ fg = PAPER, red = RED, markBg = INK } = {}) {
  const A = text(XB, "CHERA", 220, 0.03);
  // PROTOCOL: același tracking relativ, dimensiune aleasă ca să aibă exact lățimea lui CHERA
  let size = 120, B = text(XB, "PROTOCOL", size, 0.12);
  for (let i = 0; i < 30; i++) { size *= A.width / B.width; B = text(XB, "PROTOCOL", size, 0.12); }
  const tag = text(SB, "ONLINE COACHING · MARIUS CHERA", 30, 0.16);
  const W = Math.ceil(Math.max(A.width, tag.width) + 80), mS = 240;
  const cx = (w) => (W - w) / 2;
  const y1 = mS + 60 + A.cap, y2 = y1 + 30 + B.cap, y3 = y2 + 34, y4 = y3 + 62;
  const H = Math.ceil(y4 + 30);
  const markSvg = mark(mS, { bg: markBg, c: markBg === "transparent" ? fg : (markBg === "#ffffff" ? INK : PAPER), p: red, border: red }).replace(/<svg[^>]*>/, `<svg x="${cx(mS)}" y="0" width="${mS}" height="${mS}" viewBox="0 0 512 512">`);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
  ${markSvg}
  ${g(A, cx(A.width), y1, fg)}${g(B, cx(B.width), y2, red)}
  <rect x="${cx(A.width).toFixed(1)}" y="${y3}" width="${A.width.toFixed(1)}" height="6" fill="${red}"/>
  ${g(tag, cx(tag.width), y4, fg)}
</svg>`;
}

// ===== Wordmark simplu (pentru antetul site-ului) =====
function wordmark({ fg = PAPER, red = RED } = {}) {
  const A = text(XB, "CHERA", 100, 0.06), B = text(XB, "PROTOCOL", 100, 0.06), sp = 26;
  const W = Math.ceil(A.width + sp + B.width + 2), H = Math.ceil(A.cap + 4);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">${g(A, 0, A.cap, fg)}${g(B, A.width + sp, A.cap, red)}</svg>`;
}

const files = {
  "chera-protocol-marca.svg": mark(512),
  "chera-protocol-marca-deschis.svg": mark(512, { bg: PAPER, c: INK, p: RED, border: RED }),
  "chera-protocol-orizontal-inchis.svg": horizontal(),
  "chera-protocol-orizontal-deschis.svg": horizontal({ fg: INK, markBg: INK }),
  "chera-protocol-vertical-inchis.svg": vertical(),
  "chera-protocol-vertical-deschis.svg": vertical({ fg: INK, markBg: INK }),
  "chera-protocol-wordmark-inchis.svg": wordmark(),
  "chera-protocol-wordmark-deschis.svg": wordmark({ fg: INK }),
  "chera-protocol-orizontal-alb.svg": horizontal({ fg: "#ffffff", red: "#ffffff", markBg: "transparent" }),
  "chera-protocol-orizontal-negru.svg": horizontal({ fg: INK, red: INK, markBg: "#ffffff" })
};
for (const [n, s] of Object.entries(files)) writeFileSync(path.join(out, n), s);
console.log("SVG:", Object.keys(files).length, "în", out);
