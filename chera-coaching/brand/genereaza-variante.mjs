// Chera Protocol – 5 variante alternative de logo (text în contururi).
// Rulează din folderul chera-coaching: node brand/genereaza-variante.mjs
import { createRequire } from "node:module";
import { writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(path.join(here, "../site/tools/package.json"));
const opentype = require("opentype.js");
const F = (n) => opentype.loadSync(path.join(here, "fonts", n));
const XB = F("BarlowCondensed-ExtraBold.ttf"), BD = F("BarlowCondensed-Bold.ttf"), SB = F("Barlow-SemiBold.ttf");
const RED = "#e1251b", INK = "#0e0d0d", PAPER = "#f5f1ec";
const out = path.join(here, "logo", "variante");
mkdirSync(out, { recursive: true });

function text(font, str, size, tracking = 0) {
  const scale = size / font.unitsPerEm, glyphs = font.stringToGlyphs(str);
  let x = 0, d = ""; const items = [];
  glyphs.forEach((g, i) => {
    const adv = g.advanceWidth * scale;
    items.push({ g, x, adv });
    d += g.getPath(x, 0, size).toPathData(2);
    x += adv;
    if (i < glyphs.length - 1) x += font.getKerningValue(g, glyphs[i + 1]) * scale + tracking * size;
  });
  const cap = (font.tables.os2.sCapHeight || font.unitsPerEm * 0.7) * scale;
  const last = glyphs[glyphs.length - 1], bb = last.getBoundingBox();
  const width = x - last.advanceWidth * scale + bb.x2 * scale;
  return { d, width, cap, left: glyphs[0].getBoundingBox().x1 * scale, items, size, font };
}
const put = (t, dx, dy, fill) => `<path transform="translate(${(dx - t.left).toFixed(2)} ${dy.toFixed(2)})" fill="${fill}" d="${t.d}"/>`;
const svg = (W, H, body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">${body}</svg>`;
function cp(cx, cy, size, c, p, gap = 0.04) {
  const C = text(XB, "C", size), P = text(XB, "P", size), gp = gap * size, total = C.width + gp + P.width;
  const x0 = cx - total / 2, base = cy + C.cap / 2;
  return { body: put(C, x0, base, c) + put(P, x0 + C.width + gp, base, p), total, x0, base, cap: C.cap };
}

// ---- 1. SCUT ----
function scut({ fg, red, plate }) {
  const W = 420, H = 500;
  const sh = (o) => `M${210} ${o} L${420 - o} ${60 + o * 0.6} V${250} C${420 - o} ${370} ${320} ${450 - o * 0.4} ${210} ${500 - o} C${100} ${450 - o * 0.4} ${o} ${370} ${o} ${250} V${60 + o * 0.6} Z`;
  const m = cp(210, 205, 190, PAPER, red);
  const band = text(XB, "PROTOCOL", 44, 0.22);
  const name = text(XB, "CHERA", 64, 0.12);
  const body = `<path d="${sh(0)}" fill="${red}"/><path d="${sh(12)}" fill="${plate}"/>
  ${put(name, 210 - name.width / 2, 92, PAPER)}${m.body}
  <rect x="58" y="${m.base + 30}" width="304" height="62" fill="${red}"/>${put(band, 210 - band.width / 2, m.base + 30 + 31 + band.cap / 2, PAPER)}`;
  // lockup orizontal: scut + text
  const A = text(XB, "CHERA", 120, 0.02), B = text(XB, "PROTOCOL", 120, 0.02), tag = text(SB, "ONLINE COACHING · MARIUS CHERA", 28, 0.16);
  const sw = 168, sh2 = 200, gx = sw + 44, LW = Math.ceil(gx + Math.max(A.width + 26 + B.width, tag.width) + 4), LH = sh2;
  const lock = svg(LW, LH, `<svg x="0" y="0" width="${sw}" height="${sh2}" viewBox="0 0 420 500">${body}</svg>
    ${put(A, gx, 112, fg)}${put(B, gx + A.width + 26, 112, red)}<rect x="${gx}" y="132" width="${(A.width + 26 + B.width).toFixed(1)}" height="5" fill="${red}"/>${put(tag, gx, 178, fg)}`);
  return { emblem: svg(W, H, body), lockup: lock };
}

// ---- 2. DISC (placă de greutate) ----
function disc({ fg, red, plate }) {
  const S = 520, c = S / 2, R = 250, r = 182, mid = (R + r) / 2;
  const top = text(XB, "CHERA PROTOCOL", 46, 0.14), bot = text(XB, "ONLINE COACHING", 40, 0.14);
  const ring = (t, isTop) => {
    const rb = mid - t.cap / 2, total = t.width / rb;
    return t.items.map(({ g, x, adv }) => {
      const p = g.getPath(0, 0, t.size).toPathData(2); if (!p) return "";
      const center = (x + adv / 2) / rb;
      if (isTop) { const ang = (-total / 2 + center) * 180 / Math.PI; return `<path fill="${PAPER}" transform="rotate(${ang.toFixed(3)} ${c} ${c}) translate(${(c - adv / 2).toFixed(2)} ${(c - rb).toFixed(2)})" d="${p}"/>`; }
      const ang = (total / 2 - center) * 180 / Math.PI; return `<path fill="${PAPER}" transform="rotate(${ang.toFixed(3)} ${c} ${c}) translate(${(c - adv / 2).toFixed(2)} ${(c + rb + t.cap).toFixed(2)})" d="${p}"/>`;
    }).join("");
  };
  const m = cp(c, c, 200, PAPER, red, 0.03);
  const dot = (a) => `<circle cx="${(c + mid * Math.cos(a)).toFixed(1)}" cy="${(c + mid * Math.sin(a)).toFixed(1)}" r="7" fill="${PAPER}"/>`;
  const body = `<circle cx="${c}" cy="${c}" r="${R}" fill="${red}"/><circle cx="${c}" cy="${c}" r="${r}" fill="${plate}"/>
  <circle cx="${c}" cy="${c}" r="${r - 14}" fill="none" stroke="${red}" stroke-width="3"/>
  ${ring(top, true)}${ring(bot, false)}${dot(0)}${dot(Math.PI)}${m.body}
  <rect x="${(c - m.total / 2).toFixed(1)}" y="${(m.base + 18).toFixed(1)}" width="${m.total.toFixed(1)}" height="10" fill="${red}"/>`;
  const A = text(XB, "CHERA", 120, 0.02), B = text(XB, "PROTOCOL", 120, 0.02);
  const dS = 200, gx = dS + 44, LW = Math.ceil(gx + A.width + 26 + B.width + 4);
  const lock = svg(LW, dS, `<svg x="0" y="0" width="${dS}" height="${dS}" viewBox="0 0 ${S} ${S}">${body}</svg>${put(A, gx, 100 + A.cap / 2, fg)}${put(B, gx + A.width + 26, 100 + A.cap / 2, red)}`);
  return { emblem: svg(S, S, body), lockup: lock };
}

// ---- 3. ETICHETĂ ----
function eticheta({ fg, red }) {
  const A = text(XB, "CHERA", 150, 0.02), B = text(XB, "PROTOCOL", 92, 0.12), tag = text(SB, "ONLINE COACHING · MARIUS CHERA", 26, 0.16);
  const pad = 18, boxH = B.cap + pad * 2, boxW = B.width + pad * 2.4, gap = 22;
  const W = Math.ceil(A.width + gap + boxW), H = Math.ceil(A.cap + 70);
  const by = A.cap - boxH; // caseta aliniată la baza lui CHERA
  const body = `${put(A, 0, A.cap, fg)}<rect x="${(A.width + gap).toFixed(1)}" y="${by.toFixed(1)}" width="${boxW.toFixed(1)}" height="${boxH.toFixed(1)}" fill="${red}"/>
  ${put(B, A.width + gap + (boxW - B.width) / 2, by + pad + B.cap, PAPER)}${put(tag, 0, A.cap + 52, fg)}`;
  const m = cp(256, 256, 300, PAPER, PAPER, 0.04);
  const emblem = svg(512, 512, `<rect width="512" height="512" fill="${red}"/>${m.body}<rect x="${(256 - m.total / 2).toFixed(1)}" y="${(m.base + 26).toFixed(1)}" width="${m.total.toFixed(1)}" height="14" fill="${INK}"/>`);
  return { emblem, lockup: svg(W, H, body) };
}

// ---- 4. MINIMAL ----
function minimal({ fg, red }) {
  const S = 512, m = cp(256, 256, 250, PAPER, PAPER, 0.05);
  const emblem = svg(S, S, `<circle cx="256" cy="256" r="256" fill="${red}"/>${m.body}`);
  const A = text(BD, "CHERA PROTOCOL", 92, 0.22), tag = text(SB, "ONLINE COACHING · MARIUS CHERA", 22, 0.32);
  const eS = 150, gx = eS + 40, W = Math.ceil(gx + Math.max(A.width, tag.width) + 4), H = Math.max(eS, Math.ceil(58 + A.cap / 2 + 62 + 12));
  const lock = svg(W, H, `<svg x="0" y="0" width="${eS}" height="${eS}" viewBox="0 0 512 512">${emblem.replace(/<\/?svg[^>]*>/g, "")}</svg>
    ${put(A, gx, 58 + A.cap / 2, fg)}<rect x="${gx}" y="${(58 + A.cap / 2 + 20).toFixed(1)}" width="64" height="5" fill="${red}"/>${put(tag, gx, 58 + A.cap / 2 + 62, fg)}`);
  return { emblem, lockup: lock };
}

// ---- 5. ȘTAMPILĂ ----
function stampila({ fg, red, bg }) {
  const A = text(XB, "CHERA", 168, 0.08), B = text(XB, "PROTOCOL", 70, 0.2), tag = text(SB, "ONLINE COACHING · MARIUS CHERA", 22, 0.18);
  const W = Math.ceil(Math.max(A.width, B.width) + 120), fr = 10, inset = 22;
  const y1 = 40 + A.cap, bandY = y1 + 26, bandH = B.cap + 36, y3 = bandY + bandH + 46;
  const H = Math.ceil(y3 + 34);
  const body = `<rect x="${fr / 2}" y="${fr / 2}" width="${W - fr}" height="${H - fr}" fill="none" stroke="${fg}" stroke-width="${fr}"/>
  <rect x="${inset}" y="${inset}" width="${W - inset * 2}" height="${H - inset * 2}" fill="none" stroke="${fg}" stroke-width="2"/>
  ${put(A, (W - A.width) / 2, y1, fg)}
  <rect x="${inset}" y="${bandY}" width="${W - inset * 2}" height="${bandH}" fill="${red}"/>
  ${put(B, (W - B.width) / 2, bandY + 18 + B.cap, bg)}
  ${put(tag, (W - tag.width) / 2, y3, fg)}`;
  return { emblem: svg(W, H, body), lockup: null };
}

const V = [
  ["1-scut", scut], ["2-disc", disc], ["3-eticheta", eticheta], ["4-minimal", minimal], ["5-stampila", stampila]
];
for (const [name, fn] of V) {
  for (const [mode, col] of [["inchis", { fg: PAPER, red: RED, plate: INK, bg: INK }], ["deschis", { fg: INK, red: RED, plate: INK, bg: PAPER }]]) {
    const r = fn(col);
    writeFileSync(path.join(out, `chera-${name}-embl-${mode}.svg`), r.emblem);
    if (r.lockup) writeFileSync(path.join(out, `chera-${name}-orizontal-${mode}.svg`), r.lockup);
  }
}
console.log("variante scrise în", out);
