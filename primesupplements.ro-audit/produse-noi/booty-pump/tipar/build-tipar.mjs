// Booty Pump – eticheta pentru tipar (SIMULARE, pana vine cutitul/dimensiunea reala de la tipografie).
// Ruleaza: node build-tipar.mjs
//  -> eticheta-booty-pump-<aroma>.html / .pdf (vector, fonturi incorporate, bleed 3 mm, semne de taiere)
//  -> eticheta-booty-pump-<aroma>-600dpi.png (previzualizare la 600 dpi)
// Dimensiunile se schimba din TRIM_W / TRIM_H; designul se scaleaza singur.
import { readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const logoSrc = readFileSync(join(here, '../../../agenti/GHID-RECEPTII-img/logo-prime-alb.svg'), 'utf8');

// ---- dimensiuni (mm) – PRESUPUSE, de confirmat cu Sunimprof / Pro Nutrition ----
const TRIM_W = 335, TRIM_H = 105, BLEED = 3, MARGIN = 12;
const PAGE_W = TRIM_W + 2 * MARGIN, PAGE_H = TRIM_H + 2 * MARGIN;
// designul e desenat in px cu inaltimea etichetei = 560 px
const DH = 560, PXMM = DH / TRIM_H, DW = TRIM_W * PXMM, FRONT_W = 600, SIDE_W = (DW - FRONT_W) / 2, BL = BLEED * PXMM;
const CSSPX_PER_MM = 96 / 25.4, K = (TRIM_W * CSSPX_PER_MM) / DW;

const RED = '#ec1e24', PINK = '#f6a5c0', PINK_L = '#fde4ec', INK = '#232323', MUTE = '#8f5f72';
const FLAVOURS = [
  { slug: 'pink-lemonade', name: 'PINK LEMONADE', ro: 'limonadă roz' },
  { slug: 'fructe-de-padure', name: 'FOREST FRUITS', ro: 'fructe de pădure' },
];

function logo(id, width) {
  let s = logoSrc
    .replace('<svg ', `<svg width="${width}" `)
    .replace(/\.cls-1\{fill:#fff;\}/, `.${id}-t{fill:${INK};}`)
    .replace(/\.cls-2\{fill:#ec1e24;\}/, `.${id}-g{fill:url(#${id}-grad);}`)
    .replace('<defs>', `<defs><linearGradient id="${id}-grad" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="226.77" y2="57.52"><stop offset="0" stop-color="${RED}"/><stop offset=".55" stop-color="#f2557f"/><stop offset="1" stop-color="${PINK}"/></linearGradient>`);
  let n = 0;
  s = s.replace(/<polygon ([^>]*)class="cls-1"/g, (m, a) => (n++ < 2 ? `<polygon ${a}class="${id}-g"` : m));
  return s.replace(/class="cls-1"/g, `class="${id}-t"`).replace(/class="cls-2"/g, `class="${id}-g"`).replace(/id="Layer_1"/, '');
}

function cropMarks() {
  const L = 6, G = BLEED + 1; // lungimea semnului si distanta fata de linia de taiere (mm)
  let out = '';
  for (const x of [MARGIN, MARGIN + TRIM_W]) for (const y of [MARGIN, MARGIN + TRIM_H]) {
    const left = x === MARGIN, top = y === MARGIN;
    out += `<div class="mark" style="left:${left ? x - G - L : x + G}mm;top:${y - 0.05}mm;width:${L}mm;height:0.1mm"></div>`;
    out += `<div class="mark" style="left:${x - 0.05}mm;top:${top ? y - G - L : y + G}mm;width:0.1mm;height:${L}mm"></div>`;
  }
  return out;
}

const html = (f) => `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
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
.grad{background:linear-gradient(100deg,${RED} 0%,#f2557f 55%,${PINK} 100%)}
.gtext{background:linear-gradient(100deg,${RED} 0%,#f2557f 60%,${PINK} 100%);-webkit-background-clip:text;background-clip:text;color:transparent}

.side{position:absolute;top:0;width:${SIDE_W}px;height:${DH}px;padding:30px 40px 0;font-size:13.5px;line-height:1.36}
.side.l{left:0}.side.r{left:${SIDE_W + FRONT_W}px}
.side .bar{height:6px;margin-bottom:12px}
.side h4{font-size:14px;font-weight:800;letter-spacing:1px;margin:8px 0 1px}
.side b{font-weight:700}
table{width:100%;border-collapse:collapse;font-size:13.5px}
td,th{padding:2.5px 4px;border-bottom:1px solid #f4cfdc;text-align:left}
th{font-weight:800;border-bottom:2px solid ${RED}}
td:last-child,th:last-child{text-align:right;white-space:nowrap}
.foot{display:flex;gap:18px;align-items:flex-end;margin-top:10px}
.bc{width:180px;height:92px;border:1.5px dashed #999;display:flex;align-items:center;justify-content:center;text-align:center;font-size:11px;color:#777;flex:none}
.lotbox{border:1.5px solid ${INK};padding:6px 10px;font-size:12.5px;line-height:1.5;flex:none}

.front{position:absolute;left:${SIDE_W}px;top:0;width:${FRONT_W}px;height:${DH}px;overflow:visible;clip-path:inset(${-BL}px 0 ${-BL}px 0)}
.front .shape1{position:absolute;left:250px;top:-60px;width:420px;height:440px;background:${PINK_L};transform:skewX(-22deg)}
.front .lines{position:absolute;right:30px;top:200px;width:110px;height:40px;background:repeating-linear-gradient(-60deg,${PINK} 0 2px,transparent 2px 9px);opacity:.8}
.front .vert{position:absolute;left:12px;top:352px;transform:rotate(-90deg);transform-origin:left top;white-space:nowrap;z-index:3;font-weight:800;line-height:1}
.front .vert .q{font-size:32px;letter-spacing:.5px}
.front .vert span:not(.q){font-size:15px;font-weight:500;color:${MUTE};margin-left:6px}
.front .logo{position:absolute;left:58px;top:30px}
.front .pill{position:absolute;right:34px;top:38px;color:#fff;font-size:15px;letter-spacing:2px;padding:6px 16px;transform:skewX(-15deg)}
.front .pill b{display:inline-block;transform:skewX(15deg);font-weight:700}
.front .t1{position:absolute;left:58px;top:88px;font-size:100px;line-height:1;font-weight:900;letter-spacing:-1px;color:${INK}}
.front .t2{position:absolute;left:58px;top:178px;font-size:112px;line-height:1;font-weight:900;letter-spacing:-1px}
.front .day{position:absolute;right:32px;top:106px;text-align:right;font-size:13px;line-height:1.25;font-weight:800;letter-spacing:2px;color:${MUTE};z-index:3}
.front .day b{display:block;font-size:19px;font-weight:900;letter-spacing:1px;color:${RED}}
.front .sub{position:absolute;left:62px;top:296px;font-size:13.5px;font-weight:700;letter-spacing:2.5px;white-space:nowrap}
.front .badges{position:absolute;left:60px;top:322px;display:flex;gap:7px;z-index:3}
.front .badge{border:1.5px solid ${PINK};border-radius:6px;padding:4px 7px;font-size:10px;line-height:1.15;font-weight:600;text-align:center;background:#fff}
.front .badge b{display:block;font-size:15px;font-weight:800;color:${RED}}
.front .splash{position:absolute;left:0;bottom:${-BL}px;width:${FRONT_W}px;height:${236 + BL}px;object-fit:cover;object-position:50% 80%;mix-blend-mode:multiply;z-index:1}
.front .flav{position:absolute;right:26px;bottom:20px;text-align:right;font-weight:900;font-size:24px;line-height:1;color:#fff;letter-spacing:.5px;text-shadow:0 2px 10px rgba(110,0,40,.55),0 0 2px rgba(110,0,40,.5);z-index:3}
.front .flav small{display:block;font-weight:600;font-size:12px;letter-spacing:2px;margin-top:3px}
</style></head><body>
${cropMarks()}
<div class="slug">BOOTY PUMP · ${f.name} · etichetă ${TRIM_W} × ${TRIM_H} mm + bleed ${BLEED} mm · SIMULARE (dimensiuni de confirmat cu tipografia; RGB – conversie CMYK la tipografie) · Prime Sport Supplements</div>
<div class="trim"><div class="scaler">
  <div class="bleedbg"></div>

  <div class="side l">
    <div class="bar grad"></div>
    <h4 style="margin-top:0">SUPLIMENT ALIMENTAR</h4>
    <p>pentru adulți, sub formă de pulbere, cu aminoacizi, creatină și electroliți. Cu arome și îndulcitor. Aromă: ${f.ro}. <b>Fără cafeină.</b></p>
    <h4>INGREDIENTE</h4>
    <p>dextrină ciclică (HBCD), L-citrulină, creatină monohidrată, glicerol (pulbere 65 %), taurină, citrat trisodic, citrat de potasiu, acidifiant (acid citric), arome, citicolină, îndulcitor (sucraloză), colorant (concentrat de sfeclă roșie).</p>
    <h4>MOD DE ADMINISTRARE</h4>
    <p>1 porție (2 măsuri ≈ 27 g) în 350–400 ml de apă, cu 20–30 de minute înainte de antrenament. În zilele fără antrenament: 1 porție în timpul zilei. <b>Maximum 1 porție pe zi.</b></p>
    <h4>ATENȚIONĂRI</h4>
    <p>A nu se depăși doza zilnică recomandată. Suplimentele alimentare nu înlocuiesc o dietă variată și echilibrată și un stil de viață sănătos. Nu este destinat copiilor; nu se recomandă persoanelor sub 18 ani și femeilor însărcinate sau care alăptează. A nu se lăsa la îndemâna copiilor.</p>
    <h4>PĂSTRARE</h4>
    <p>La loc uscat și răcoros, ferit de lumină. A se închide bine după utilizare.</p>
  </div>

  <div class="front">
    <div class="shape1"></div>
    <div class="lines"></div>
    <img class="splash" src="../macheta/splash-${f.slug}.png" alt="">
    <div class="vert"><span class="q">500 g</span><span>/ 18 SERVINGS</span></div>
    <div class="logo">${logo('f', 210)}</div>
    <div class="pill grad"><b>PRE-WORKOUT</b></div>
    <div class="t1">BOOTY</div>
    <div class="t2 gtext">PUMP</div>
    <div class="day">MADE FOR<b>LEG &amp; GLUTE</b>DAYS</div>
    <div class="sub gtext">STIM-FREE PUMP · 0 MG CAFFEINE · ELECTROLYTES</div>
    <div class="badges">
      <div class="badge"><b>6 g</b>L-CITRULLINE</div>
      <div class="badge"><b>3 g</b>CREATINE</div>
      <div class="badge"><b>3 g</b>GLYCEROL 65%</div>
      <div class="badge"><b>10 g</b>CYCLIC DEXTRIN</div>
      <div class="badge"><b>500 mg</b>CITICOLINE</div>
    </div>
    <div class="flav">${f.name}<small>FLAVOUR</small></div>
  </div>

  <div class="side r">
    <div class="bar grad"></div>
    <table>
      <tr><th>Per porție (≈ 27 g)</th><th>cantitate</th></tr>
      <tr><td>Dextrină ciclică (HBCD)</td><td>10 g</td></tr>
      <tr><td>L-citrulină</td><td>6 g</td></tr>
      <tr><td>Creatină monohidrată</td><td>3 g</td></tr>
      <tr><td>Glicerol pulbere 65 % (din care glicerol 1,95 g)</td><td>3 g</td></tr>
      <tr><td>Taurină</td><td>1,5 g</td></tr>
      <tr><td>Citicolină</td><td>500 mg</td></tr>
      <tr><td>Sodiu</td><td>300 mg</td></tr>
      <tr><td>Potasiu</td><td>200 mg (10 % VNR*)</td></tr>
    </table>
    <p style="margin-top:4px;font-size:12px">*VNR – valoarea nutrițională de referință.</p>
    <p style="margin-top:6px">Creatina crește performanța fizică în exerciții scurte, de mare intensitate, repetate. Efectul benefic se obține la un aport zilnic de 3 g de creatină.</p>
    <p style="margin-top:6px"><b>Distribuitor:</b> PRIME SPORT SUPPLEMENTS S.R.L., Str. Ioan Virgil Ispas nr. 17A, Cisnădie, jud. Sibiu, România · primesupplements.ro · Fabricat în UE.</p>
    <div class="foot">
      <div class="bc">EAN-13<br>de alocat</div>
      <div class="lotbox">LOT: ____________<br>A se consuma de preferință<br>înainte de: ____________</div>
      <div style="font-size:12.5px;line-height:1.35"><b>Cantitate netă:</b><br>500 g · 18 porții</div>
    </div>
  </div>
</div></div>
</body></html>`;

const chrome = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
for (const f of FLAVOURS) {
  const base = `eticheta-booty-pump-${f.slug}`;
  const file = join(here, base + '.html');
  writeFileSync(file, html(f));
  const url = 'file:///' + file.replace(/\\/g, '/');
  execFileSync(chrome, ['--headless=new', '--disable-gpu', '--no-pdf-header-footer', '--virtual-time-budget=10000',
    `--print-to-pdf=${join(here, base + '.pdf')}`, url], { stdio: 'ignore' });
  const wpx = Math.round(PAGE_W * CSSPX_PER_MM), hpx = Math.round(PAGE_H * CSSPX_PER_MM);
  execFileSync(chrome, ['--headless=new', '--disable-gpu', '--hide-scrollbars', `--window-size=${wpx},${hpx}`,
    `--force-device-scale-factor=${600 / 96}`, '--virtual-time-budget=10000', `--screenshot=${join(here, base + '-600dpi.png')}`, url], { stdio: 'ignore' });
  console.log('scris', base, '.pdf + -600dpi.png');
}
