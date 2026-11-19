// Proteina noua Prime 2 kg – eticheta de tipar (SIMULARE, fara fisa tehnica), design inspirat din Creamy Rice.
// Ruleaza: node build-tipar.mjs  -> eticheta-proteina-2kg-<aroma>.pdf (vector, bleed 3 mm, semne de taiere) + -600dpi.png
// Dimensiunea etichetei: dupa randarea „Prime Whey [2000g][170x485]” din D:\Prime Supplements\Randari Produse.
import { readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const logoSrc = readFileSync(join(here, '../../../agenti/GHID-RECEPTII-img/logo-prime-alb.svg'), 'utf8');

const TRIM_W = 485, TRIM_H = 170, BLEED = 3, MARGIN = 12;
const PAGE_W = TRIM_W + 2 * MARGIN, PAGE_H = TRIM_H + 2 * MARGIN;
const PXMM = 560 / 105; // aceeasi scara de design ca la Booty Pump (12 px ≈ 6,4 pt)
const DH = TRIM_H * PXMM, DW = TRIM_W * PXMM, FRONT_W = 900, SIDE_W = (DW - FRONT_W) / 2, BL = BLEED * PXMM;
const K = (TRIM_W * 96 / 25.4) / DW;

const RED = '#ec1e24', INK = '#1d1d1d';
const PRODUCT = 'COMPLETE PROTEIN'; // numele produsului (Marius, 19.11.2026)
const SERV_G = 30, SERVINGS = Math.floor(2000 / SERV_G); // portie presupusa 30 g -> 66 portii
const FLAVOURS = [
  { slug: 'chocolate-cake', a: 'CHOCOLATE', b: 'CAKE', c1: '#4a2717', c2: '#8a5a3b', ro: 'tort de ciocolată', en: 'chocolate cake', ean: '400202640001' },
  { slug: 'caffe-latte-macchiato', a: 'CAFFE LATTE', b: 'MACCHIATO', c1: '#5b3a24', c2: '#b0814f', ro: 'caffe latte macchiato', en: 'caffe latte macchiato', ean: '400202640002' },
  { slug: 'vanilla-cereal-milkshake', a: 'VANILLA CEREAL', b: 'MILKSHAKE', c1: '#c98a1b', c2: '#e3b75a', ro: 'milkshake de vanilie cu cereale', en: 'vanilla cereal milkshake', ean: '400202640003' },
  { slug: 'forest-fruits-cake', a: 'FOREST FRUITS', b: 'CAKE', c1: '#8e1846', c2: '#c4486f', ro: 'tort cu fructe de pădure', en: 'forest fruits cake', ean: '400202640004' },
];

// ---- EAN-13 intern Prime (seria 400..., blocul 4002026 4000x) ----
function eanCheck(d12) { let t = 0; for (let i = 0; i < 12; i++) t += +d12[i] * (i % 2 ? 3 : 1); return String((10 - t % 10) % 10); }
const LCODE = ['0001101', '0011001', '0010011', '0111101', '0100011', '0110001', '0101111', '0111011', '0110111', '0001011'];
const GCODE = LCODE.map(c => c.split('').map(b => b === '1' ? '0' : '1').reverse().join(''));
const RCODE = LCODE.map(c => c.split('').map(b => b === '1' ? '0' : '1').join(''));
const PARITY = ['LLLLLL', 'LLGLGG', 'LLGGLG', 'LLGGGL', 'LGLLGG', 'LGGLLG', 'LGGGLL', 'LGLGLG', 'LGLGGL', 'LGGLGL'];
function eanSvg(code) {
  const d = code.split('').map(Number), par = PARITY[d[0]];
  let bits = '101'; for (let i = 1; i <= 6; i++) bits += (par[i - 1] === 'L' ? LCODE : GCODE)[d[i]]; bits += '01010'; for (let i = 7; i <= 12; i++) bits += RCODE[d[i]]; bits += '101';
  const m = 1.6, q = 11 * m, W = bits.length * m + 2 * q, H = 66, guard = new Set([0, 1, 2, 45, 46, 47, 48, 49, 92, 93, 94]);
  let r = ''; for (let i = 0; i < bits.length; i++) if (bits[i] === '1') r += `<rect x="${(q + i * m).toFixed(2)}" y="0" width="${m}" height="${guard.has(i) ? H + 6 : H}"/>`;
  const t = (x, s, a) => `<text x="${x}" y="${H + 15}" font-size="14" font-family="Arial" text-anchor="${a}" letter-spacing="2.2">${s}</text>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H + 18}" viewBox="0 0 ${W} ${H + 18}"><rect width="100%" height="100%" fill="#fff"/><g fill="#000">${r}</g>${t(q - 4, code[0], 'end')}${t(q + 24 * m, code.slice(1, 7), 'middle')}${t(q + 71 * m, code.slice(7), 'middle')}</svg>`;
}

function logo(id, width) {
  return logoSrc.replace('<svg ', `<svg width="${width}" `)
    .replace(/\.cls-1\{fill:#fff;\}/, `.${id}-t{fill:${INK};}`).replace(/\.cls-2\{fill:#ec1e24;\}/, `.${id}-g{fill:${RED};}`)
    .replace(/class="cls-1"/g, `class="${id}-t"`).replace(/class="cls-2"/g, `class="${id}-g"`).replace(/id="Layer_1"/, '');
}
function cropMarks() {
  const L = 6, G = BLEED + 1; let out = '';
  for (const x of [MARGIN, MARGIN + TRIM_W]) for (const y of [MARGIN, MARGIN + TRIM_H]) {
    out += `<div class="mark" style="left:${x === MARGIN ? x - G - L : x + G}mm;top:${y - 0.05}mm;width:${L}mm;height:0.1mm"></div>`;
    out += `<div class="mark" style="left:${x - 0.05}mm;top:${y === MARGIN ? y - G - L : y + G}mm;width:0.1mm;height:${L}mm"></div>`;
  }
  return out;
}

// pictograme desenate (linie neagra, ca pe Creamy Rice)
const IC = {
  protein: `<svg viewBox="0 0 40 40"><path d="M8 24c0-8 6-14 13-14 5 0 9 3 9 8 0 7-7 12-15 12-4 0-7-2-7-6z" fill="none" stroke="#1d1d1d" stroke-width="2.4" stroke-linecap="round"/><path d="M14 22l4 3 7-8" fill="none" stroke="#1d1d1d" stroke-width="2.4" stroke-linecap="round"/></svg>`,
  timer: `<svg viewBox="0 0 40 40"><circle cx="22" cy="23" r="11" fill="none" stroke="#1d1d1d" stroke-width="2.4"/><path d="M22 23v-6M19 8h6M22 8v4M4 17h7M2 23h7M4 29h7" stroke="#1d1d1d" stroke-width="2.4" stroke-linecap="round"/></svg>`,
  cream: `<svg viewBox="0 0 40 40"><path d="M6 22h28c0 7-6 11-14 11S6 29 6 22z" fill="none" stroke="#1d1d1d" stroke-width="2.4"/><path d="M11 21c0-5 4-8 9-8s9 3 9 8M16 13c0-3 2-5 4-5" fill="none" stroke="#1d1d1d" stroke-width="2.4" stroke-linecap="round"/></svg>`,
  muscle: `<svg viewBox="0 0 40 40"><path d="M7 30c2-9 5-14 9-16l2-5 5 1-1 5 5 4c5 1 7 5 6 10-3 2-8 2-12 1H7z" fill="none" stroke="#1d1d1d" stroke-width="2.4" stroke-linejoin="round"/></svg>`,
};

const doodles = `<svg class="doodle" viewBox="0 0 900 907" fill="none" stroke="#1d1d1d" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M140 470c-40 40-45 95-10 140 15 20 30 32 50 40"/><path d="M170 640l14 12-18 6"/>
  <path d="M670 330c25 20 35 45 32 75"/><path d="M705 330l12-14M717 348l18-6M717 368l18 2"/>
  <path d="M120 370l10 18M145 355l4 20M170 348l-2 20"/>
  <path d="M600 610c30 5 55-8 68-32"/>
</svg>`;

const html = (f) => `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&family=Permanent+Marker&family=Caveat:wght@600;700&display=swap" rel="stylesheet">
<style>
@page{size:${PAGE_W}mm ${PAGE_H}mm;margin:0}
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:${PAGE_W}mm;height:${PAGE_H}mm;background:#fff;-webkit-print-color-adjust:exact;print-color-adjust:exact}
body{font-family:Poppins,Arial,sans-serif;color:${INK};position:relative;overflow:hidden}
.mark{position:absolute;background:#000}
.slug{position:absolute;left:${MARGIN + 12}mm;bottom:2.5mm;font-size:6pt;color:#000;font-family:Arial,sans-serif}
.trim{position:absolute;left:${MARGIN}mm;top:${MARGIN}mm;width:${TRIM_W}mm;height:${TRIM_H}mm}
.scaler{position:absolute;left:0;top:0;width:${DW}px;height:${DH}px;zoom:${K}}
.bleedbg{position:absolute;left:${-BL}px;top:${-BL}px;right:${-BL}px;bottom:${-BL}px;background:#fff}

.side{position:absolute;top:0;width:${SIDE_W}px;height:${DH}px;padding:44px 50px 0;font-size:15.5px;line-height:1.38}
.side.l{left:0}.side.r{left:${SIDE_W + FRONT_W}px}
.side .ttl{display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:14px}
.side .ttl .mk{font-family:'Permanent Marker',cursive;font-size:64px;line-height:.9}
.side .ttl .nm{font-weight:900;font-size:22px;letter-spacing:1px;margin-top:4px}
.side h4{font-size:16.5px;font-weight:800;letter-spacing:.5px;margin:8px 0 2px;color:${RED}}
.side p{margin:0 0 3px}
.side b{font-weight:700}
.side hr{border:0;border-top:1.5px solid ${INK};margin:10px 0}
table{width:100%;border-collapse:collapse;font-size:15.5px;line-height:1.25}
td,th{padding:3px 4px;border-bottom:1px solid #ddd;text-align:left}
th{font-weight:800;color:#fff;background:${INK}}
td:nth-child(n+2),th:nth-child(n+2){text-align:right;white-space:nowrap;width:90px}
.ph{color:#999}
.addr{display:flex;gap:8px;align-items:flex-start;margin-top:4px}
.ico{flex:none;width:17px;height:17px;fill:${RED}}
.foot{display:flex;gap:14px;align-items:center;margin-top:10px;justify-content:space-between}
.soc{display:flex;gap:16px;font-size:12.5px;font-weight:600;margin-top:10px}
.soc span{display:flex;gap:5px;align-items:center;white-space:nowrap}
.rec{display:flex;gap:8px;align-items:center}
.rec svg{width:34px;height:34px}
.cert{display:flex;gap:6px}
.cert div{width:50px;height:50px;border:1.5px solid ${INK};border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:800;text-align:center;line-height:1}
.bc{flex:none;background:#fff;padding:4px 6px}

.front{position:absolute;left:${SIDE_W}px;top:0;width:${FRONT_W}px;height:${DH}px;overflow:visible;clip-path:inset(${-BL}px 0 ${-BL}px 0)}
.front .logo{position:absolute;left:0;right:0;top:46px;display:flex;justify-content:center}
.front .brush{position:absolute;left:0;right:0;top:104px;text-align:center;font-family:'Permanent Marker',cursive;font-size:222px;line-height:1;letter-spacing:4px;color:${INK}}
.front .food{position:absolute;left:95px;top:188px;width:640px;height:490px;object-fit:contain;mix-blend-mode:multiply}
.front .doodle{position:absolute;left:0;top:0;width:900px;height:907px}
.front .name{position:absolute;left:40px;width:660px;top:688px;text-align:center;font-weight:900;font-size:50px;letter-spacing:-.5px;white-space:nowrap;letter-spacing:.5px;line-height:1}
.front .flav{position:absolute;left:40px;width:660px;top:750px;white-space:nowrap;text-align:center;font-size:32px;letter-spacing:1px;line-height:1}
.front .flav b{font-weight:800}.front .flav span{font-weight:400}
.front .net{position:absolute;left:44px;top:770px;transform:rotate(-90deg);transform-origin:left top;font-size:46px;font-weight:300;white-space:nowrap;line-height:1}
.front .feats{position:absolute;left:682px;top:560px;display:flex;flex-direction:column;gap:12px;font-family:Caveat,cursive;font-weight:700;font-size:28px;line-height:.95}
.front .feats div{display:flex;align-items:center;gap:8px}
.front .feats svg{width:38px;height:38px;flex:none}
.front .serv{position:absolute;left:190px;bottom:${-BL}px;width:360px;height:${120 + BL}px;background:${INK};clip-path:polygon(18% 0,82% 0,100% 100%,0 100%);color:#fff;text-align:center;padding-top:10px}
.front .serv b{display:block;font-size:62px;font-weight:800;line-height:1}
.front .serv span{font-size:16px;letter-spacing:2px;font-weight:500}
</style></head><body>
${cropMarks()}
<div class="slug">VARIANTA CREMA (îmbunătățită) · PRIME ${PRODUCT} 2000 g · ${f.a} ${f.b} · etichetă ${TRIM_W} × ${TRIM_H} mm (după Prime Whey 2 kg) + bleed ${BLEED} mm · SIMULARE fără fișă tehnică (porție presupusă ${SERV_G} g) · RGB · bilingv RO/EN</div>
<div class="trim"><div class="scaler">
  <div class="bleedbg"></div>

  <div class="side l">
    <div class="ttl"><div><div class="mk">PRIME</div><div class="nm">${PRODUCT}</div></div>${logo('l', 190)}</div>
    <h4>(RO) PRIME ${PRODUCT} – ${f.a} ${f.b}</h4>
    <p><b>Supliment alimentar pentru adulți, sub formă de pulbere, cu proteine.</b> Cu arome și îndulcitor. Aromă: ${f.ro}.</p>
    <p><b>Mod de administrare:</b> se amestecă ${SERV_G} g (aproximativ 1 măsură) cu 250–300 ml de apă sau lapte. Se recomandă 1–2 porții pe zi, după antrenament sau între mese.</p>
    <p><b>Ingrediente:</b> <span class="ph">concentrat proteic din zer (<b>lapte</b>), …, arome, îndulcitor … – conform fișei tehnice.</span></p>
    <h4>(EN) PRIME ${PRODUCT} – ${f.a} ${f.b}</h4>
    <p><b>Food supplement for adults, in powder form, with protein.</b> With flavourings and sweetener. Flavour: ${f.en}.</p>
    <p><b>Directions for use:</b> mix ${SERV_G} g (approximately 1 scoop) with 250–300 ml of water or milk. It is recommended to consume 1–2 servings per day, after workout or between meals.</p>
    <p><b>Ingredients:</b> <span class="ph">whey protein concentrate (<b>milk</b>), …, flavourings, sweetener … – as per technical sheet.</span></p>
    <p style="margin-top:6px">Proteinele contribuie la creșterea și menținerea masei musculare. / Protein contributes to a growth in and maintenance of muscle mass.</p>
    <hr>
    <div class="addr"><svg class="ico" viewBox="0 0 24 24"><path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/></svg><div><b>Fabricat pentru: / Manufactured for: Prime Sport Supplements SRL</b><br>Street Ioan Virgil Ispas, 17A, 555300 Cisnadie – jud. Sibiu, Romania</div></div>
    <div class="addr"><svg class="ico" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="none" stroke="#ec1e24" stroke-width="2"/><ellipse cx="12" cy="12" rx="4" ry="10" fill="none" stroke="#ec1e24" stroke-width="2"/><path d="M2 12h20M4 7h16M4 17h16" stroke="#ec1e24" stroke-width="1.6"/></svg><div><b>www.primesupplements.ro</b></div></div>
    <div class="foot"><div style="font-size:12.5px">Fabricat în UE în unitate certificată ISO și HACCP /<br>Made in the EU in an ISO and HACCP certified facility.</div><div class="cert"><div>ISO<br>9001</div><div>HACCP</div></div></div>
  </div>

  <div class="front">
    <div class="logo">${logo('f', 200)}</div>
    <div class="brush">PRIME</div>
    <img class="food" src="../poze/${f.slug}.png" alt="">
    ${doodles}
    <div class="net">Net WT 2000 g</div>
    <div class="name">${PRODUCT}</div>
    <div class="flav"><b style="color:${f.c1}">${f.a}</b> <span style="color:${f.c2}">${f.b}</span></div>
    <div class="feats">
      <div>${IC.protein}Rich in<br>protein</div>
      <div>${IC.timer}Mixes in<br>seconds</div>
      <div>${IC.cream}Smooth, creamy<br>taste</div>
      <div>${IC.muscle}For muscle<br>growth*</div>
    </div>
    <div class="serv"><b>${SERVINGS}</b><span>SERVINGS</span></div>
  </div>

  <div class="side r">
    <table>
      <tr><th>Valori nutriționale / Nutrition facts</th><th>${SERV_G} g</th><th>100 g</th></tr>
      <tr><td colspan="3">Porție / Serving size: ${SERV_G} g (1 măsură / scoop) · Porții / Servings: ${SERVINGS}</td></tr>
      <tr><td>Valoare energetică / Energy</td><td class="ph">… kJ / … kcal</td><td class="ph">… kJ / … kcal</td></tr>
      <tr><td>Grăsimi / Fat</td><td class="ph">… g</td><td class="ph">… g</td></tr>
      <tr><td>&nbsp;– din care acizi grași saturați / of which saturates</td><td class="ph">… g</td><td class="ph">… g</td></tr>
      <tr><td>Glucide / Carbohydrate</td><td class="ph">… g</td><td class="ph">… g</td></tr>
      <tr><td>&nbsp;– din care zaharuri / of which sugars</td><td class="ph">… g</td><td class="ph">… g</td></tr>
      <tr><td><b>Proteine / Protein</b></td><td class="ph">… g</td><td class="ph">… g</td></tr>
      <tr><td>Sare / Salt</td><td class="ph">… g</td><td class="ph">… g</td></tr>
    </table>
    <p style="font-size:12px;margin-top:3px;color:#777">Valorile se completează din fișa tehnică a producătorului.</p>
    <p style="margin-top:6px"><b>(RO) Condiții de păstrare:</b> a se păstra în loc răcoros, ferit de lumină, umiditate și căldură excesivă. A se consuma de preferință înainte de data înscrisă pe ambalaj. <b>Alergeni:</b> conține <b>lapte</b>. <b>Atenționări!</b> A nu se depăși doza recomandată pentru consumul zilnic! Suplimentele alimentare nu înlocuiesc o dietă variată și echilibrată și un mod de viață sănătos! A nu se lăsa la îndemâna și la vederea copiilor mici!</p>
    <p><b>(EN) Storage conditions:</b> store in a cool place, away from light, moisture and excessive heat. Best before date on the packaging. <b>Allergens:</b> contains <b>milk</b>. <b>Warnings:</b> do not exceed the recommended daily dose! Food supplements do not replace a varied and balanced diet and a healthy lifestyle! Keep out of reach and sight of young children!</p>
    <p style="font-size:12px">*Proteinele contribuie la creșterea masei musculare. / Protein contributes to a growth in muscle mass.</p>
    <div class="soc"><span><svg class="ico" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11"/><path fill="#fff" d="M13.2 19v-6h2l.3-2.4h-2.3V9.1c0-.7.2-1.1 1.2-1.1h1.2V5.9a16 16 0 0 0-1.8-.1c-1.8 0-3 1.1-3 3.1v1.7h-2V13h2v6z"/></svg>Prime Supplements</span><span><svg class="ico" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="6"/><circle cx="12" cy="12" r="4.5" fill="none" stroke="#fff" stroke-width="2"/><circle cx="17.5" cy="6.5" r="1.3" fill="#fff"/></svg>Primesupplements_ro</span><span><svg class="ico" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11"/><path fill="#fff" d="M10 8.5v7l6-3.5z"/></svg>Prime Supplements</span></div>
    <div class="foot">
      <div class="rec"><svg viewBox="0 0 40 40"><path d="M20 3l7 12h-4l-3-5-3 5h-4zM5 31l7-12 2 3.4-4 6.6h6v4H7zM35 31l-3.5 2H23v-4h6l-4-6.6 2-3.4z" fill="#232323"/><text x="20" y="27" font-size="9" font-weight="800" text-anchor="middle" fill="#232323">1</text><text x="20" y="39.5" font-size="7" font-weight="800" text-anchor="middle" fill="#232323">PET</text></svg><svg viewBox="0 0 40 40"><circle cx="27" cy="6" r="3.2" fill="#232323"/><path d="M24 11h6l2 12h-3l-1 13h-4l-1-13h-1zM5 19h14l-2 17H8z" fill="#232323"/><path d="M15 9l-5 9" stroke="#232323" stroke-width="2"/></svg><div style="font-size:12px;line-height:1.35"><b>Lot / Exp.:</b> vezi ambalajul / see packaging<br><b>Cantitate netă / Net weight: 2000 g</b></div></div>
      <div class="bc">${eanSvg(f.ean + eanCheck(f.ean))}</div>
    </div>
  </div>
</div></div>
</body></html>`;

const chrome = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
for (const f of FLAVOURS.filter(x => x.slug === 'chocolate-cake')) {
  const base = `eticheta-proteina-2kg-${f.slug}-varianta-crema`, file = join(here, base + '.html');
  console.log(f.slug, 'EAN', f.ean + eanCheck(f.ean));
  writeFileSync(file, html(f));
  const url = 'file:///' + file.replace(/\\/g, '/');
  execFileSync(chrome, ['--headless=new', '--disable-gpu', '--no-pdf-header-footer', '--virtual-time-budget=10000', `--print-to-pdf=${join(here, base + '.pdf')}`, url], { stdio: 'ignore' });
  execFileSync(chrome, ['--headless=new', '--disable-gpu', '--hide-scrollbars', `--window-size=${Math.round(PAGE_W * 96 / 25.4)},${Math.round(PAGE_H * 96 / 25.4)}`,
    `--force-device-scale-factor=${600 / 96}`, '--virtual-time-budget=10000', `--screenshot=${join(here, base + '-600dpi.png')}`, url], { stdio: 'ignore' });
}
