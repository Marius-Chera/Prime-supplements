// Chera Protocol – logoul ales (27.10.2026): „Ștampila”. Familia completă, text în contururi.
// Rulează din folderul chera-coaching: node brand/genereaza-stampila.mjs
import { createRequire } from "node:module";
import { writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(path.join(here, "../site/tools/package.json"));
const opentype = require("opentype.js");
const F = (n) => opentype.loadSync(path.join(here, "fonts", n));
const XB = F("BarlowCondensed-ExtraBold.ttf"), SB = F("Barlow-SemiBold.ttf");
const RED = "#e1251b", INK = "#0e0d0d", PAPER = "#f5f1ec";
const out = path.join(here, "logo", "stampila");
mkdirSync(out, { recursive: true });

function text(font, str, size, tracking = 0) {
  const scale = size / font.unitsPerEm, glyphs = font.stringToGlyphs(str);
  let x = 0, d = "";
  glyphs.forEach((g, i) => {
    d += g.getPath(x, 0, size).toPathData(2);
    x += g.advanceWidth * scale;
    if (i < glyphs.length - 1) x += font.getKerningValue(g, glyphs[i + 1]) * scale + tracking * size;
  });
  const cap = (font.tables.os2.sCapHeight || font.unitsPerEm * 0.7) * scale;
  const last = glyphs[glyphs.length - 1], bb = last.getBoundingBox();
  return { d, width: x - last.advanceWidth * scale + bb.x2 * scale, cap, left: glyphs[0].getBoundingBox().x1 * scale };
}
const put = (t, dx, dy, fill) => `<path transform="translate(${(dx - t.left).toFixed(2)} ${dy.toFixed(2)})" fill="${fill}" d="${t.d}"/>`;
const svg = (W, H, body, extra = "") => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}"${extra}>${body}</svg>`;
const frame = (W, H, fg, fr, inset) => `<rect x="${fr / 2}" y="${fr / 2}" width="${W - fr}" height="${H - fr}" fill="none" stroke="${fg}" stroke-width="${fr}"/><rect x="${inset}" y="${inset}" width="${W - inset * 2}" height="${H - inset * 2}" fill="none" stroke="${fg}" stroke-width="2"/>`;

// 1) Ștampila principală (verticală) – varianta aleasă
function principal({ fg, red, knock, fill = "none" }) {
  const A = text(XB, "CHERA", 168, 0.08), B = text(XB, "PROTOCOL", 70, 0.2), tag = text(SB, "ONLINE COACHING · MARIUS CHERA", 22, 0.18);
  const W = Math.ceil(Math.max(A.width, B.width) + 120), fr = 10, inset = 22;
  const y1 = 40 + A.cap, bandY = y1 + 26, bandH = B.cap + 36, y3 = bandY + bandH + 46, H = Math.ceil(y3 + 34);
  return svg(W, H, `${fill !== "none" ? `<rect width="${W}" height="${H}" fill="${fill}"/>` : ""}${frame(W, H, fg, fr, inset)}
  ${put(A, (W - A.width) / 2, y1, fg)}
  <rect x="${inset}" y="${bandY}" width="${W - inset * 2}" height="${bandH}" fill="${red}"/>
  ${put(B, (W - B.width) / 2, bandY + 18 + B.cap, knock)}
  ${put(tag, (W - tag.width) / 2, y3, fg)}`);
}

// 2) Ștampila pe un rând (antet site, semnătură e-mail): [CHERA | PROTOCOL pe roșu]
function linie({ fg, red, knock, fill = "none" }) {
  const A = text(XB, "CHERA", 120, 0.08), B = text(XB, "PROTOCOL", 120, 0.08);
  const fr = 8, inset = 18, padX = 30, padY = 26, gap = 24, bandPadX = 26;
  const innerH = A.cap + padY * 2, H = Math.ceil(innerH + inset * 2);
  const xA = inset + padX, bandX = xA + A.width + gap, bandW = B.width + bandPadX * 2;
  const W = Math.ceil(bandX + bandW + inset);
  const base = inset + padY + A.cap;
  return svg(W, H, `${fill !== "none" ? `<rect width="${W}" height="${H}" fill="${fill}"/>` : ""}${frame(W, H, fg, fr, inset - 6)}
  ${put(A, xA, base, fg)}
  <rect x="${bandX}" y="${inset}" width="${bandW.toFixed(1)}" height="${innerH}" fill="${red}"/>
  ${put(B, bandX + bandPadX, base, knock)}`);
}

// 3) Ștampila pătrată (favicon, avatar, aplicații): chenar dublu, CP, bandă roșie
function patrat({ fg, red, knock, fill = "none" }) {
  const S = 512, fr = 18, inset = 40;
  const CP = text(XB, "CP", 300, 0.04), P = text(XB, "PROTOCOL", 46, 0.24);
  const bandH = 92, bandY = S - inset - bandH, base = inset + (bandY - inset) / 2 + CP.cap / 2 + 4;
  return svg(S, S, `${fill !== "none" ? `<rect width="${S}" height="${S}" fill="${fill}"/>` : ""}${frame(S, S, fg, fr, inset - 12)}
  ${put(CP, (S - CP.width) / 2, base, fg)}
  <rect x="${inset - 12}" y="${bandY}" width="${S - (inset - 12) * 2}" height="${bandH + 12 - 1}" fill="${red}"/>
  ${put(P, (S - P.width) / 2, bandY + bandH / 2 + 6 + P.cap / 2, knock)}`);
}

const sets = {
  inchis: { fg: PAPER, red: RED, knock: INK },
  deschis: { fg: INK, red: RED, knock: PAPER },
  alb: { fg: "#ffffff", red: "#ffffff", knock: RED },      // pentru peste roșu sau poze
  negru: { fg: INK, red: INK, knock: "#ffffff" }           // imprimare într-o culoare
};
for (const [k, c] of Object.entries(sets)) {
  writeFileSync(path.join(out, `chera-protocol-stampila-${k}.svg`), principal(c));
  writeFileSync(path.join(out, `chera-protocol-stampila-linie-${k}.svg`), linie(c));
  writeFileSync(path.join(out, `chera-protocol-stampila-patrat-${k}.svg`), patrat(c));
}
// versiuni cu fundal plin (favicon/avatar se văd pe orice)
writeFileSync(path.join(out, "chera-protocol-stampila-patrat-plin.svg"), patrat({ ...sets.inchis, fill: INK }));
// antetul temei: pe un rând, culori pentru fundal închis, fără dimensiuni fixe
writeFileSync(path.join(out, "_antet.svg"), linie(sets.inchis).replace(/ width="\d+" height="\d+"/, ' class="brand-stamp" role="img" aria-label="Chera Protocol"'));
console.log("ștampila: fișiere în", out);
