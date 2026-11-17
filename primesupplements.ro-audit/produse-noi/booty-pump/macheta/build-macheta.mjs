// Macheta Booty Pump: flacon alb (forma EAA / NitroX 3D) + eticheta desfasurata, pe 2 arome.
// Ruleaza: node build-macheta.mjs  -> HTML + PNG (Chrome headless) in acest folder.
import { readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const logoSrc = readFileSync(join(here, '../../../agenti/GHID-RECEPTII-img/logo-prime-alb.svg'), 'utf8');

const RED = '#ec1e24', PINK = '#f6a5c0', PINK_L = '#fde4ec', INK = '#232323';
const FLAVOURS = [
  { slug: 'pink-lemonade', name: 'PINK LEMONADE', ro: 'limonadă roz' },
  { slug: 'fructe-de-padure', name: 'FOREST FRUITS', ro: 'fructe de pădure' },
];

// Logo Prime: literele PRIME + simbolul in degrade rosu -> roz deschis, sloganul gri inchis.
function logo(id, width) {
  let s = logoSrc
    .replace('<svg ', `<svg width="${width}" `)
    .replace(/\.cls-1\{fill:#fff;\}/, `.${id}-t{fill:${INK};}`)
    .replace(/\.cls-2\{fill:#ec1e24;\}/, `.${id}-g{fill:url(#${id}-grad);}`)
    .replace('<defs>', `<defs><linearGradient id="${id}-grad" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="226.77" y2="57.52"><stop offset="0" stop-color="${RED}"/><stop offset=".55" stop-color="#f2557f"/><stop offset="1" stop-color="${PINK}"/></linearGradient>`);
  let n = 0; // primele doua poligoane = simbolul
  s = s.replace(/<polygon ([^>]*)class="cls-1"/g, (m, a) => (n++ < 2 ? `<polygon ${a}class="${id}-g"` : m));
  return s.replace(/class="cls-1"/g, `class="${id}-t"`).replace(/class="cls-2"/g, `class="${id}-g"`).replace(/id="Layer_1"/, '');
}

const FONT = `<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">`;

const css = `
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:Poppins,Arial,sans-serif;color:${INK}}
.grad{background:linear-gradient(100deg,${RED} 0%,#f2557f 55%,${PINK} 100%);}
.gtext{background:linear-gradient(100deg,${RED} 0%,#f2557f 60%,${PINK} 100%);-webkit-background-clip:text;background-clip:text;color:transparent}
.front{position:relative;width:600px;height:560px;background:#fff;overflow:hidden;flex:none}
.front .shape1{position:absolute;left:250px;top:-40px;width:420px;height:420px;background:${PINK_L};transform:skewX(-22deg)}
.front .lines{position:absolute;right:30px;top:200px;width:110px;height:40px;background:repeating-linear-gradient(-60deg,${PINK} 0 2px,transparent 2px 9px);opacity:.8}
.front .vert{position:absolute;left:28px;top:330px;transform:rotate(-90deg);transform-origin:left top;font-size:15px;font-weight:700;letter-spacing:1px;white-space:nowrap;z-index:3}
.front .vert span{font-weight:400;color:#b06a85}
.front .logo{position:absolute;left:58px;top:30px}
.front .pill{position:absolute;right:34px;top:38px;color:#fff;font-size:15px;letter-spacing:2px;padding:6px 16px;transform:skewX(-15deg)}
.front .pill b{display:inline-block;transform:skewX(15deg);font-weight:700}
.front .t1{position:absolute;left:54px;top:88px;font-size:100px;line-height:1;font-weight:900;letter-spacing:-1px;color:${INK}}
.front .t2{position:absolute;left:54px;top:178px;font-size:112px;line-height:1;font-weight:900;letter-spacing:-1px}
.front .sub{position:absolute;left:58px;top:296px;font-size:13.5px;font-weight:700;letter-spacing:2.5px;white-space:nowrap}
.front .badges{position:absolute;left:56px;top:322px;display:flex;gap:7px;z-index:3}
.front .badge{border:1.5px solid ${PINK};border-radius:6px;padding:4px 7px;font-size:9.5px;line-height:1.15;font-weight:600;text-align:center;background:#fff}
.front .badge b{display:block;font-size:15px;font-weight:800;color:${RED}}
.front .splash{position:absolute;left:0;bottom:0;width:600px;height:236px;object-fit:cover;object-position:50% 80%;mix-blend-mode:multiply;z-index:1}
.front .flav{position:absolute;right:26px;bottom:20px;text-align:right;font-weight:900;font-size:24px;line-height:1;color:#fff;letter-spacing:.5px;text-shadow:0 2px 10px rgba(110,0,40,.55),0 0 2px rgba(110,0,40,.5);z-index:3}
.front .day{position:absolute;right:32px;top:106px;text-align:right;font-size:13px;line-height:1.25;font-weight:800;letter-spacing:2px;color:#9a6d7e;z-index:3}
.front .day b{display:block;font-size:19px;font-weight:900;letter-spacing:1px}
.front .flav small{display:block;font-weight:600;font-size:12px;letter-spacing:2px;margin-top:3px}
`;

const front = (id, f) => `
<div class="front">
  <div class="shape1"></div>
  <div class="lines"></div>
  <img class="splash" src="splash-${f.slug}.png" alt="">
  <div class="vert">500g <span>/ 18 SERVINGS</span></div>
  <div class="logo">${logo(id, 210)}</div>
  <div class="pill grad"><b>PRE-WORKOUT</b></div>
  <div class="t1">BOOTY</div>
  <div class="t2 gtext">PUMP</div>
  <div class="sub gtext">STIM-FREE PUMP · 0 MG CAFFEINE · ELECTROLYTES</div>
  <div class="badges">
    <div class="badge"><b>6 g</b>L-CITRULLINE</div>
    <div class="badge"><b>3 g</b>CREATINE</div>
    <div class="badge"><b>3 g</b>GLYCEROL 65%</div>
    <div class="badge"><b>10 g</b>CYCLIC DEXTRIN</div>
    <div class="badge"><b>500 mg</b>CITICOLINE</div>
  </div>
  <div class="day">MADE FOR<b style="color:${RED}">LEG &amp; GLUTE</b>DAYS</div>
  <div class="flav">${f.name}<small>FLAVOUR</small></div>
</div>`;

const jarDiv = (id, f, left) => `
<div class="shadow" style="left:${left - 50}px"></div>
<div class="jar" style="left:${left}px">
  <div class="lid"></div><div class="neck"></div>
  <div class="body"><div class="label">${front(id, f)}</div><div class="shade"></div></div>
</div>`;

// ---------- 1. flacoanele (ambele arome) ----------
const jar = `<!doctype html><html><head><meta charset="utf-8">${FONT}<style>${css}
body{width:2000px;height:1200px;background:radial-gradient(ellipse at 50% 35%,#ffffff 0%,#fdf2f6 55%,#f7dce6 100%);position:relative;overflow:hidden}
.floor{position:absolute;left:0;right:0;top:996px;bottom:0;background:linear-gradient(#f1cfdc,#f8e3ea)}
.shadow{position:absolute;top:975px;width:700px;height:60px;border-radius:50%;background:radial-gradient(ellipse,rgba(110,50,75,.42),rgba(110,50,75,0) 70%);z-index:1}
.jar{position:absolute;top:180px;width:600px;height:816px;z-index:2;-webkit-box-reflect:below 0 linear-gradient(transparent 80%,rgba(255,255,255,.28))}
.lid{position:absolute;left:-6px;top:0;width:612px;height:150px;border-radius:26px 26px 10px 10px;
 background:linear-gradient(90deg,transparent 16%,rgba(255,255,255,.95) 18.5%,transparent 22%,transparent 77%,rgba(255,255,255,.7) 79%,transparent 82%),
 linear-gradient(90deg,#b4b4ba 0%,#e3e3e7 5%,#fafafb 12%,#fff 20%,#ececf0 36%,#f3f3f5 58%,#fdfdfd 72%,#d9d9de 88%,#acacb3 100%);
 box-shadow:inset 0 -10px 14px -8px rgba(60,40,50,.35)}
.lid:before{content:"";position:absolute;inset:18px 0 0 0;background:repeating-linear-gradient(90deg,rgba(0,0,0,.045) 0 3px,rgba(255,255,255,.25) 3px 4px,transparent 4px 9px)}
.lid:after{content:"";position:absolute;left:0;right:0;top:0;height:20px;border-radius:26px 26px 0 0;background:linear-gradient(#fff 0%,#fff 40%,#e2e2e6 100%);box-shadow:0 1px 0 rgba(0,0,0,.08)}
.neck{position:absolute;left:8px;top:150px;width:584px;height:28px;background:linear-gradient(90deg,#a9a9b0,#e9e9ed 12%,#fff 19%,#d9d9de 45%,#e8e8ec 75%,#a7a7ae);box-shadow:inset 0 8px 10px -6px rgba(40,25,35,.35)}
.body{position:absolute;left:0;top:176px;width:600px;height:640px;border-radius:14px 14px 70px 70px/14px 14px 34px 34px;
 background:linear-gradient(90deg,#b5b5bc 0%,#e2e2e7 5%,#fcfcfd 13%,#fff 20%,#f1f1f4 36%,#ebebef 56%,#f8f8fa 72%,#dcdce1 88%,#afafb6 100%);overflow:hidden}
.label{position:absolute;left:0;top:38px;width:600px;height:560px}
.shade{position:absolute;left:0;top:0;width:600px;height:100%;pointer-events:none;
 background:linear-gradient(90deg,rgba(40,25,35,.40) 0%,rgba(40,25,35,.13) 5%,rgba(255,255,255,0) 11%,rgba(255,255,255,0) 15%,rgba(255,255,255,.72) 17.5%,rgba(255,255,255,.78) 18.6%,rgba(255,255,255,0) 21.5%,rgba(255,255,255,.22) 25%,rgba(255,255,255,0) 31%,rgba(0,0,0,0) 62%,rgba(255,255,255,.38) 79%,rgba(255,255,255,0) 83%,rgba(40,25,35,.15) 92%,rgba(40,25,35,.44) 100%)}
.shade:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(40,25,35,.10) 0,rgba(0,0,0,0) 4%,rgba(0,0,0,0) 90%,rgba(40,25,35,.18) 100%)}
.cap{position:absolute;left:0;right:0;bottom:24px;text-align:center;font-size:17px;color:#9a6d7e;letter-spacing:1px}
</style></head><body>
<div class="floor"></div>
${jarDiv('a', FLAVOURS[0], 280)}
${jarDiv('b', FLAVOURS[1], 1120)}
<div class="cap">MACHETĂ Booty Pump v2 · flacon alb, forma EAA / NitroX 3D · 500 g · Pink Lemonade și Forest Fruits · nu e pentru tipar</div>
</body></html>`;

// ---------- 2. eticheta desfasurata (Pink Lemonade) ----------
const flat = (f) => `<!doctype html><html><head><meta charset="utf-8">${FONT}<style>${css}
body{width:1600px;height:700px;background:#eee;padding:40px 50px}
.sheet{display:flex;width:1500px;height:560px;background:#fff;box-shadow:0 2px 12px rgba(0,0,0,.15);position:relative}
.side{width:450px;height:560px;padding:28px 30px;font-size:10.5px;line-height:1.45;position:relative;border-left:1px dashed #f2b8cb;border-right:1px dashed #f2b8cb}
.side h4{font-size:12px;font-weight:800;letter-spacing:1px;margin:9px 0 3px}
.side .bar{height:5px;margin-bottom:12px}
table{width:100%;border-collapse:collapse;font-size:11px}
td,th{padding:3px 4px;border-bottom:1px solid #f4cfdc;text-align:left}
th{font-weight:800;border-bottom:2px solid ${RED}}
td:last-child,th:last-child{text-align:right;white-space:nowrap}
.ean{margin-top:14px;display:flex;gap:14px;align-items:flex-end}
.ean .bc{width:150px;height:62px;background:repeating-linear-gradient(90deg,#222 0 2px,#fff 2px 4px,#222 4px 5px,#fff 5px 8px);position:relative}
.ean .bc:after{content:"EAN-13 de alocat";position:absolute;left:0;right:0;bottom:-15px;text-align:center;font-size:9px;background:#fff}
.note{position:absolute;left:50px;top:614px;font-size:13px;color:#777}
</style></head><body>
<div class="sheet">
  <div class="side">
    <div class="bar grad"></div>
    <h4 style="margin-top:0">SUPLIMENT ALIMENTAR</h4>
    <p>pentru adulți, sub formă de pulbere, cu aminoacizi, creatină și electroliți. Cu arome și îndulcitor. Aromă: ${f.ro}. <b>Fără cafeină.</b></p>
    <h4>INGREDIENTE</h4>
    <p>dextrină ciclică (HBCD), L-citrulină, creatină monohidrată, glicerol (pulbere 65 %), taurină, citrat trisodic, citrat de potasiu, acidifiant (acid citric), arome, citicolină, îndulcitor (sucraloză), colorant (concentrat de sfeclă roșie).</p>
    <h4>MOD DE ADMINISTRARE</h4>
    <p>1 porție (2 măsuri ≈ 27 g) în 350–400 ml de apă, cu 20–30 de minute înainte de antrenament. În zilele fără antrenament: 1 porție în timpul zilei. <b>Maximum 1 porție pe zi.</b></p>
    <h4>ATENȚIONĂRI</h4>
    <p>A nu se depăși doza zilnică recomandată. Suplimentele alimentare nu înlocuiesc o dietă variată și echilibrată și un stil de viață sănătos. Nu este destinat copiilor; nu se recomandă persoanelor sub 18 ani și femeilor însărcinate sau care alăptează. A nu se lăsa la îndemâna copiilor. A se păstra la loc uscat și răcoros.</p>
  </div>
  ${front('f', f)}
  <div class="side">
    <div class="bar grad"></div>
    <h4 style="margin-top:0">PER PORȚIE (≈ 27 g)</h4>
    <table>
      <tr><th>Ingredient</th><th>per porție</th></tr>
      <tr><td>Dextrină ciclică (HBCD)</td><td>10 g</td></tr>
      <tr><td>L-citrulină</td><td>6 g</td></tr>
      <tr><td>Creatină monohidrată</td><td>3 g</td></tr>
      <tr><td>Glicerol pulbere 65 % (glicerol 1,95 g)</td><td>3 g</td></tr>
      <tr><td>Taurină</td><td>1,5 g</td></tr>
      <tr><td>Citicolină</td><td>500 mg</td></tr>
      <tr><td>Sodiu</td><td>300 mg</td></tr>
      <tr><td>Potasiu</td><td>200 mg (10 % VNR)</td></tr>
    </table>
    <p style="margin-top:8px">Valoarea energetică și tabelul nutrițional complet: de la fabrică.</p>
    <p style="margin-top:6px">Creatina crește performanța fizică în exerciții scurte, de mare intensitate, repetate. Efectul benefic se obține la un aport zilnic de 3 g de creatină.</p>
    <div class="ean"><div class="bc"></div><div style="font-size:10px">500 g · 18 porții<br>Lot / Expiră: vezi capacul<br>Fabricat în UE</div></div>
  </div>
</div>
<div class="note">MACHETĂ – nu e pentru tipar. Eticheta desfășurată: lateral stânga (informații RO) · față · lateral dreapta (tabel).</div>
</body></html>`;

const out = [["macheta-flacoane.html", jar, 2000, 1200], ['eticheta-desfasurata-pink-lemonade.html', flat(FLAVOURS[0]), 1600, 700]];
const chrome = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
for (const [html, content, w, h] of out) {
  writeFileSync(join(here, html), content);
  const png = html.replace('.html', '.png');
  execFileSync(chrome, ['--headless=new', '--disable-gpu', '--hide-scrollbars', `--window-size=${w},${h}`, '--virtual-time-budget=8000',
    `--screenshot=${join(here, png)}`, 'file:///' + join(here, html).replace(/\\/g, '/')], { stdio: 'ignore' });
  console.log('scris', png);
}
