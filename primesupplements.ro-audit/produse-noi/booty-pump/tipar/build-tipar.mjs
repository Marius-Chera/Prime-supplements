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
  { slug: 'pink-lemonade', name: 'PINK LEMONADE', ro: 'limonadă roz', en: 'pink lemonade', ean: '400202630001' },
  { slug: 'fructe-de-padure', name: 'FOREST FRUITS', ro: 'fructe de pădure', en: 'forest fruits', ean: '400202630002' },
];


// ---- EAN-13 intern Prime (seria 400..., ca la haine; blocul 4002026 3000x) ----
function eanCheck(d12){let t=0;for(let i=0;i<12;i++)t+=+d12[i]*(i%2?3:1);return String((10-t%10)%10);}
const LCODE=['0001101','0011001','0010011','0111101','0100011','0110001','0101111','0111011','0110111','0001011'];
const GCODE=LCODE.map(c=>c.split('').map(b=>b==='1'?'0':'1').reverse().join(''));
const RCODE=LCODE.map(c=>c.split('').map(b=>b==='1'?'0':'1').join(''));
const PARITY=['LLLLLL','LLGLGG','LLGGLG','LLGGGL','LGLLGG','LGGLLG','LGGGLL','LGLGLG','LGLGGL','LGGLGL'];
function eanSvg(code){
  const d=code.split('').map(Number), par=PARITY[d[0]];
  let bits='101';for(let i=1;i<=6;i++)bits+=(par[i-1]==='L'?LCODE:GCODE)[d[i]];bits+='01010';for(let i=7;i<=12;i++)bits+=RCODE[d[i]];bits+='101';
  const m=1.6,q=11*m,W=bits.length*m+2*q,H=62,guard=new Set([0,1,2,45,46,47,48,49,92,93,94]);
  let r='';for(let i=0;i<bits.length;i++)if(bits[i]==='1')r+='<rect x="'+(q+i*m).toFixed(2)+'" y="0" width="'+m+'" height="'+(guard.has(i)?H+6:H)+'"/>';
  const t=(x,str,anchor)=>'<text x="'+x+'" y="'+(H+15)+'" font-size="14" font-family="Arial" text-anchor="'+anchor+'" letter-spacing="2.2">'+str+'</text>';
  return '<svg xmlns="http://www.w3.org/2000/svg" width="'+W+'" height="'+(H+18)+'" viewBox="0 0 '+W+' '+(H+18)+'"><rect width="100%" height="100%" fill="#fff"/><g fill="#000">'+r+'</g>'+t(q-4,code[0],'end')+t(q+3*m+21*m,code.slice(1,7),'middle')+t(q+50*m+21*m,code.slice(7),'middle')+'</svg>';
}

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

.side{position:absolute;top:0;width:${SIDE_W}px;height:${DH}px;padding:22px 36px 0;font-size:12px;line-height:1.3}
.side.l{left:0}.side.r{left:${SIDE_W + FRONT_W}px}
.side .bar{height:5px;margin-bottom:8px}
.side h4{font-size:12.5px;font-weight:800;letter-spacing:.5px;margin:5px 0 1px;color:${RED}}
.side p{margin:0 0 2px}
.side b{font-weight:700}
.side hr{border:0;border-top:1.5px solid ${INK};margin:6px 0}
table{width:100%;border-collapse:collapse;font-size:12px;line-height:1.2}
td,th{padding:2px 3px;border-bottom:1px solid #f4cfdc;text-align:left}
th{font-weight:800;color:#fff;background:linear-gradient(100deg,${RED},#f2557f);border:0}
td:nth-child(n+2),th:nth-child(n+2){text-align:right;white-space:nowrap;width:70px}
.addr{display:flex;gap:8px;align-items:flex-start;margin-top:3px}
.ico{flex:none;width:16px;height:16px;fill:${RED}}
.foot{display:flex;gap:12px;align-items:center;margin-top:6px}
.bc{flex:none;background:#fff;padding:4px 6px}
.soc{display:flex;gap:12px;font-size:11.5px;font-weight:600;margin-top:5px;align-items:center}
.soc span{display:flex;gap:4px;align-items:center;white-space:nowrap}
.rec{display:flex;gap:8px;align-items:center}
.rec svg{width:30px;height:30px}
.cert{display:flex;gap:6px}
.cert div{width:44px;height:44px;border:1.5px solid ${INK};border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:9.5px;font-weight:800;text-align:center;line-height:1}

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
<div class="slug">BOOTY PUMP · ${f.name} · etichetă ${TRIM_W} × ${TRIM_H} mm + bleed ${BLEED} mm · SIMULARE (dimensiuni de confirmat cu tipografia; RGB – conversie CMYK la tipografie; bilingv RO/EN ca la produsele actuale) · Prime Sport Supplements</div>
<div class="trim"><div class="scaler">
  <div class="bleedbg"></div>

  <div class="side l">
    <div class="bar grad"></div>
    <h4 style="margin-top:0">(RO) BOOTY PUMP – PRE-WORKOUT FĂRĂ STIMULENTE</h4>
    <p><b>Supliment alimentar pentru adulți, sub formă de pulbere</b>, cu aminoacizi, creatină și electroliți. Cu arome și îndulcitor. Aromă: ${f.ro}. Fără cafeină.</p>
    <p><b>Mod de administrare:</b> se amestecă 27 g (aproximativ 2 măsuri) din produsul <b>BOOTY PUMP</b> cu 350–400 ml de apă. Se recomandă o porție pe zi, cu 20–30 de minute înainte de antrenament; în zilele fără antrenament, o porție în timpul zilei.</p>
    <p><b>Ingrediente:</b> dextrină ciclică (HBCD), L-citrulină, creatină monohidrată, glicerol (pulbere 65 %), taurină, citrat trisodic, citrat de potasiu, acidifiant (acid citric), arome, citicolină, îndulcitor (sucraloză), colorant (concentrat de sfeclă roșie).</p>
    <h4>(EN) BOOTY PUMP – STIM-FREE PRE-WORKOUT</h4>
    <p><b>Food supplement for adults, in powder form</b>, with amino acids, creatine and electrolytes. With flavourings and sweetener. Flavour: ${f.en}. Caffeine free.</p>
    <p><b>Directions for use:</b> mix 27 g (approximately 2 scoops) of <b>BOOTY PUMP</b> with 350–400 ml of water. It is recommended to consume one serving per day, 20–30 minutes before workout; on rest days, one serving during the day.</p>
    <p><b>Ingredients:</b> cyclic dextrin (HBCD), L-citrulline, creatine monohydrate, glycerol (65 % powder), taurine, trisodium citrate, potassium citrate, acidity regulator (citric acid), flavourings, citicoline, sweetener (sucralose), colour (concentrated beetroot).</p>
    <p style="margin-top:4px"><b>Creatina</b> crește performanța fizică în exerciții scurte, de mare intensitate, repetate (efect benefic la un aport zilnic de 3 g). / <b>Creatine</b> increases physical performance in successive bursts of short-term, high intensity exercise (beneficial effect with a daily intake of 3 g).</p>
    <hr>
    <div class="addr"><svg class="ico" viewBox="0 0 24 24"><path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/></svg><div><b>Fabricat pentru: / Manufactured for: Prime Sport Supplements SRL</b><br>Street Ioan Virgil Ispas, 17A, 555300 Cisnadie – jud. Sibiu, Romania</div></div>
    <div class="addr"><svg class="ico" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="none" stroke="#ec1e24" stroke-width="2"/><ellipse cx="12" cy="12" rx="4" ry="10" fill="none" stroke="#ec1e24" stroke-width="2"/><path d="M2 12h20M4 7h16M4 17h16" stroke="#ec1e24" stroke-width="1.6"/></svg><div><b>www.primesupplements.ro</b></div></div>
    <div class="foot" style="justify-content:space-between"><div style="font-size:11.5px">Fabricat în UE în unitate certificată ISO și HACCP /<br>Made in the EU in an ISO and HACCP certified facility.</div><div class="cert"><div>ISO<br>9001</div><div>HACCP</div></div></div>
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
      <tr><th>Valori nutriționale / Nutrition facts</th><th>27 g</th><th>100 g</th></tr>
      <tr><td colspan="3" style="font-size:11.5px">Porție / Serving size: 27 g (2 măsuri / scoops) · Porții / Servings: 18</td></tr>
      <tr><td>Dextrină ciclică / Cyclic dextrin (HBCD)</td><td>10 g</td><td>37 g</td></tr>
      <tr><td>L-citrulină / L-citrulline</td><td>6 g</td><td>22,2 g</td></tr>
      <tr><td>Creatină monohidrată / Creatine monohydrate</td><td>3 g</td><td>11,1 g</td></tr>
      <tr><td>Glicerol pulbere 65 % / Glycerol 65 % powder</td><td>3 g</td><td>11,1 g</td></tr>
      <tr><td>Taurină / Taurine</td><td>1,5 g</td><td>5,6 g</td></tr>
      <tr><td>Citicolină / Citicoline</td><td>500 mg</td><td>1852 mg</td></tr>
      <tr><td>Sodiu / Sodium</td><td>300 mg</td><td>1111 mg</td></tr>
      <tr><td>Potasiu / Potassium</td><td>200 mg (10 %*)</td><td>741 mg (37 %*)</td></tr>
    </table>
    <p style="font-size:11.5px;margin-top:2px">*VNR / NRV – valoarea nutrițională de referință / nutrient reference value.</p>
    <p><b>(RO) Condiții de păstrare:</b> a se păstra în loc răcoros, ferit de lumină, umiditate și căldură excesivă. A se consuma de preferință înainte de data înscrisă pe ambalaj. <b>Atenționări!</b> A nu se depăși doza recomandată pentru consumul zilnic! Maximum 1 porție pe zi. Suplimentele alimentare nu înlocuiesc o dietă variată și echilibrată și un mod de viață sănătos! A nu se lăsa la îndemâna și la vederea copiilor mici! Nu se recomandă persoanelor sub 18 ani și femeilor în perioada de sarcină sau alăptare!</p>
    <p><b>(EN) Storage conditions:</b> store in a cool place, away from light, moisture and excessive heat. Best before date on the packaging. <b>Warnings:</b> do not exceed the recommended daily dose! Maximum 1 serving per day. Food supplements do not replace a varied and balanced diet and a healthy lifestyle! Keep out of reach and sight of young children! Not recommended for persons under 18, pregnant or breastfeeding women!</p>
    <div class="soc"><span><svg class="ico" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11"/><path fill="#fff" d="M13.2 19v-6h2l.3-2.4h-2.3V9.1c0-.7.2-1.1 1.2-1.1h1.2V5.9a16 16 0 0 0-1.8-.1c-1.8 0-3 1.1-3 3.1v1.7h-2V13h2v6z"/></svg>Prime Supplements</span><span><svg class="ico" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="6"/><circle cx="12" cy="12" r="4.5" fill="none" stroke="#fff" stroke-width="2"/><circle cx="17.5" cy="6.5" r="1.3" fill="#fff"/></svg>Primesupplements_ro</span><span><svg class="ico" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11"/><path fill="#fff" d="M10 8.5v7l6-3.5z"/></svg>Prime Supplements</span></div>
    <div class="foot" style="justify-content:space-between">
      <div>
      <div class="rec" style="margin-top:6px"><svg viewBox="0 0 40 40"><path d="M20 3l7 12h-4l-3-5-3 5h-4zM5 31l7-12 2 3.4-4 6.6h6v4H7zM35 31l-3.5 2H23v-4h6l-4-6.6 2-3.4z" fill="#232323"/><text x="20" y="27" font-size="9" font-weight="800" text-anchor="middle" fill="#232323">1</text><text x="20" y="39.5" font-size="7" font-weight="800" text-anchor="middle" fill="#232323">PET</text></svg><svg viewBox="0 0 40 40"><circle cx="27" cy="6" r="3.2" fill="#232323"/><path d="M24 11h6l2 12h-3l-1 13h-4l-1-13h-1zM5 19h14l-2 17H8z" fill="#232323"/><path d="M15 9l-5 9" stroke="#232323" stroke-width="2"/></svg><div style="font-size:11px;line-height:1.3"><b>Lot / Exp.:</b> vezi ambalajul / see packaging<br><b>Cantitate netă / Net weight: 500 g</b></div></div></div>
      <div class="bc">${eanSvg(f.ean + eanCheck(f.ean))}</div>
    </div>
  </div>
</div></div>
</body></html>`;

const chrome = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
for (const f of FLAVOURS) {
  console.log(f.slug, 'EAN', f.ean + eanCheck(f.ean));
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
