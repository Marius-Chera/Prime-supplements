// Chera Protocol – cele 6 programe digitale (200 lei) din programele lui Marius de pe claude.ai.
// Sursa brută: programe/sursa/programe-din-claude-ai.txt (copiată 27.10.2026).
// Curăță textul (fără nume de clienți, alți antrenori sau surse), apoi scrie pentru fiecare program:
//   programe/text/<handle>.txt (de trimis pe WhatsApp), programe/html/<handle>.html, programe/pdf/<handle>.pdf
// Rulează din folderul chera-coaching: node programe/genereaza-programe.mjs
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const src = readFileSync(path.join(here, "sursa", "programe-din-claude-ai.txt"), "utf8");

// blocurile din sursă: @@@@@ CHEIE
const blocks = {};
src.split(/^@@@@@ /m).slice(1).forEach(b => { const i = b.indexOf("\n"); blocks[b.slice(0, i).trim()] = b.slice(i + 1); });

// ziua de cvadriceps din split-ul avansat a fost refăcută separat; o înlocuim
blocks.SPLIT6 = blocks.SPLIT6.replace(/Sambata :\nCvadriceps[\s\S]*?(?=Duminica : pauza)/, blocks["SPLIT6-CVADRICEPS"].trim() + "\n\n");

const common = [
  [/^```.*$/gm, ""],
  [/ , /g, ", "], [/ ,/g, ","], [/ : /g, ": "], [/ :$/gm, ":"],
  [/streching/g, "stretching"], [/grutate/g, "greutate"], [/fsce pulls/g, "face pulls"], [/inxlinata/g, "inclinata"],
  [/reprtari/g, "repetari"], [/lente le negativ/g, "lente pe negativ"], [/post obosite/g, "post obosire"],
  [/aiceasi/g, "aceeasi"], [/A(\d)-?a serie/g, "A $1-a serie"], [/al (\d) lea/g, "al $1-lea"],
  [/greșți greutățile/g, "crești greutățile"], [/Day (\d)/g, "Ziua $1"], [/Back Full/g, "Spate complet"]
];
const fix = {
  BIKINI: [[/\nPe zilele de fesieri am pus[\s\S]*$/, "\n"]],
  CLASSIC: [
    [/ \(stil phil heath\)/, ""], [/executie perfecta ca nick walker,/, "executie perfecta,"],
    [/ \(obligatoriu acum pana in offseason[^)]*\)/, ""], [/, focus pe dorsalul inferior cum am facut la sala/, ", focus pe dorsalul inferior"],
    [/, cam 30kg este suficient/, ", greutate medie"], [/4 serii cu greutate de la 100kg in sus repetari 8-10/, "4 serii grele, 8-10 repetari"],
    [/, undeva la 5-6kg prima serie, apoi cresti greutatea minim 30kg chiar daca faci mai smucite/, ": prima serie cu gantere usoare, apoi cresti mult greutatea, chiar daca executia devine putin mai smucita"],
    [/cu 3 placi pe o parte/, "cu greutate medie"], [/: 100 kg pe bara, 4 serii/, ": greutate mare pe bara, 4 serii"],
    [/\nLa trapez am pus[^\n]*/, ""]
  ],
  MENS: [
    [/\(stil kai green vezi youtube\)/, ""], [/, iei greutati cat poti de mari peste 20kg,/, ", iei greutati cat poti de mari,"],
    [/spre exemplu: 20kg cate poti, 14kg cate poti, 8kg cate poti,/, "spre exemplu: greutatea maxima cate poti, -30% cate poti, -60% cate poti,"]
  ],
  HIT: [[/ - your choice/, ""]],
  SPLIT6: [], HIPERTROFIE5: []
};

const P = [
  { key: "BIKINI", handle: "program-bikini-fesieri", title: "Program Bikini", sub: "Fesieri de 3 ori pe săptămână · 6 zile", level: "Intermediar–avansat",
    intro: "E programul pe care îl folosesc cu fetele de bikini în offseason. Fesierii se lucrează de trei ori pe săptămână, fiecare zi cu 8 exerciții și alt accent: lanțul posterior luni, fesier și femural miercuri, fesier mediu și superior vineri. Umerii și spatele construiesc forma în V, iar sâmbăta închizi săptămâna cu circuit pentru partea de sus, abdomen și vacuum pentru talie." },
  { key: "CLASSIC", handle: "program-classic-physique-avansati", title: "Program Classic Physique", sub: "Avansați · sistem 3+1+2+1", level: "Avansat",
    intro: "Sistemul 3+1+2+1 pe care îl folosesc cu sportivii de Classic Physique: trei zile de antrenament, una de pauză, două de antrenament, una de pauză, apoi o iei de la capăt. Lucrăm ce se judecă pe scenă: spate gros și lat, umeri plini, piept superior și picioare cu volum, fără să pierzi talia. Ai inclus vacuum în fiecare dimineață și rutina de posing pentru cele 5 poze obligatorii." },
  { key: "MENS", handle: "program-mens-physique", title: "Program Men's Physique", sub: "Spate lat, umeri plini, talie mică · 5 zile", level: "Intermediar–avansat",
    intro: "Program de 5 zile pentru Men's Physique, construit pe ce vede arbitrul în boardshorts: lățimea spatelui, deltoidul lateral, pieptul superior și talia. Spatele se lucrează de două ori pe săptămână, o dată pe lățime și o dată pe grosime, iar umerii la fel. Picioarele rămân într-o singură zi, cât să fie proporționale." },
  { key: "SPLIT6", handle: "program-bodybuilding-avansat", title: "Program Bodybuilding Avansat", sub: "Pull · Push · Femural · Piept-umeri · Cvadriceps", level: "Avansat (peste 3 ani de sală)",
    intro: "Split de 5 zile pentru cei care au trecut de primii ani de sală și nu mai cresc doar adăugând serii. Volumul e moderat, intensitatea mare: pre-exhaust, rest pause, drop seturi mecanice și serii 6-12-25. Fiecare grupă mare are exercițiul ei de bază, unde urmărești progresia de la o săptămână la alta." },
  { key: "HIT", handle: "program-intensitate-maxima", title: "Program Intensitate Maximă", sub: "Volum redus · o serie de lucru dusă la capăt", level: "Intermediar–avansat",
    intro: "Pentru cei care au stagnat pe volum mare sau au puțin timp. La fiecare exercițiu faci încălzirea, apoi o singură serie de lucru dusă până la epuizare, cu tempo controlat și pauze lungi. Antrenamentele sunt scurte, dar fiecare serie contează. Notează greutățile: dacă nu urci în greutate sau repetări de la o săptămână la alta, nu ai mers destul de departe pe seria de lucru." },
  { key: "HIPERTROFIE5", handle: "program-hipertrofie-5-zile", title: "Program Hipertrofie", sub: "5 zile · masă musculară", level: "Intermediar",
    intro: "Program de 5 zile pentru masă musculară: piept, spate, umeri, picioare și o a doua zi de spate cu biceps. Folosește tehnici care cresc intensitatea fără să lungească antrenamentul: myo-reps, superserii, drop seturi mecanice și rest pause. E un program bun după primul an de sală, când vrei să construiești mai mult decât bazele." }
];

const RULES = [
  "Tempo: 4-0-1-0 înseamnă 4 secunde cobori, 0 pauză jos, 1 secundă urci, 0 pauză sus.",
  "Seria de activare și feeder-ul nu se duc la epuizare: pregătesc mușchiul și articulațiile pentru seriile de lucru.",
  "Notează greutatea și repetările la fiecare serie de lucru. Ținta e să urci ceva, puțin, de la o săptămână la alta.",
  "Rest pause: duci seria la epuizare, stai 10–15 secunde și mai faci câte repetări poți. Drop set: scazi greutatea fără pauză și continui.",
  "Dacă un exercițiu îți dă durere articulară (nu oboseală musculară), îl înlocuiești cu o variantă la aparat pentru aceeași grupă.",
  "Programul e pentru oameni sănătoși, fără accidentări. Nu înlocuiește consultul medical."
];

const esc = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const DAY = /^(✅\s*)?(Luni|Marti|Marți|Miercuri|Joi|Vineri|Sambata|Sâmbătă|Duminica|Duminică|Ziua \d+|Day \d+|ZILNIC)\b/i;
const GROUP = /^(Spate|Piept|Umeri|Brate|Biceps|Triceps|Femural|Cvadriceps|Picioare|ABDOMEN|TRICEPS|BICEPS|Triceps touch|Biceps touch|Pull|Push|Piept \+ Triceps touch|Spate2 \+ Biceps touch|Umeri \+ Piept|Umeri - Triceps|Spate \+ biceps|Piept, umeri, abdomen|Umeri \+ piept touch|Piept \/ Push|Spate complet|Ziua adițională de spate \+ biceps|Cvadriceps \(volum redus[^)]*\))\b.*$/;

function toHtml(text) {
  const out = [];
  let ex = false;
  for (const raw of text.split("\n")) {
    const l = raw.replace(/^✅/, "").trim();
    if (!l) continue;
    if (/^_{5,}$/.test(l)) continue;
    if (DAY.test(raw.trim())) { out.push(`<h2>${esc(l)}</h2>`); continue; }
    if (GROUP.test(l) && l.length < 60) { out.push(`<h3>${esc(l)}</h3>`); continue; }
    let m = l.match(/^(\d+)\.\s*(.*)$/) || l.match(/^Ex\s*([\d si]+):\s*(.*)$/i);
    if (m && !/^\d+\.\s*(mai|peste)/.test(l)) {
      out.push(`<p class="ex"><span class="n">${esc(m[1].trim())}</span>${m[2] ? `<b>${esc(m[2])}</b>` : ""}</p>`);
      continue;
    }
    out.push(`<p>${esc(l)}</p>`);
  }
  // „1.” urmat pe rândul următor de numele exercițiului: lipim numele în același rând
  return out.join("\n").replace(/<p class="ex"><span class="n">(\d+)<\/span><\/p>\n<p>(.*?)<\/p>/g, '<p class="ex"><span class="n">$1</span><b>$2</b></p>');
}

const font = f => pathToFileURL(path.join(here, "..", "brand", "fonts", f)).href;
const logo = readFileSync(path.join(here, "..", "brand", "logo", "stampila", "chera-protocol-stampila-linie-inchis.svg"), "utf8").replace(/ width="\d+" height="\d+"/, ' class="logo"');

for (const d of ["text", "html", "pdf"]) mkdirSync(path.join(here, d), { recursive: true });

for (const p of P) {
  let t = blocks[p.key];
  for (const [a, b] of [...common, ...(fix[p.key] || [])]) t = t.replace(a, b);
  t = t.replace(/\n{3,}/g, "\n\n").trim();
  p.text = t;
  writeFileSync(path.join(here, "text", `${p.handle}.txt`), `${p.title.toUpperCase()} – ${p.sub}\nChera Protocol · Marius Chera\n\n${t}\n`);

  const html = `<!doctype html><html lang="ro"><head><meta charset="utf-8"><title>${esc(p.title)} · Chera Protocol</title><style>
@font-face{font-family:BC;src:url(${font("BarlowCondensed-ExtraBold.ttf")});font-weight:800}
@font-face{font-family:BC;src:url(${font("BarlowCondensed-Bold.ttf")});font-weight:700}
@font-face{font-family:B;src:url(${font("Barlow-SemiBold.ttf")});font-weight:600}
@page{size:A4;margin:16mm 15mm 18mm}
*{box-sizing:border-box}body{margin:0;font:10.5pt/1.5 B,Arial,sans-serif;color:#141313;font-weight:600}
p{margin:0 0 4pt;font-weight:400;font-family:Arial,sans-serif}
.cover{background:#0e0d0d;color:#f5f1ec;padding:22mm 16mm 18mm;margin:-16mm -15mm 10mm;}
.logo{height:40px;width:auto;display:block;margin-bottom:26mm}
.cover .lv{font:700 10pt BC;letter-spacing:.2em;text-transform:uppercase;color:#e1251b;margin-bottom:4mm}
.cover h1{font:800 46pt/0.95 BC;text-transform:uppercase;margin:0 0 4mm}
.cover .sub{font:700 15pt BC;text-transform:uppercase;letter-spacing:.06em;color:#d8d2ca}
.cover .intro{font:400 11pt/1.55 Arial,sans-serif;color:#e9e4dd;margin-top:10mm;max-width:150mm}
.rules{border:2px solid #141313;padding:5mm 6mm;margin:0 0 8mm}
.rules h4{font:800 13pt BC;text-transform:uppercase;margin:0 0 2mm;letter-spacing:.04em}
.rules li{font:400 9.5pt/1.45 Arial,sans-serif;margin-bottom:1.5mm}
h2{font:800 20pt BC;text-transform:uppercase;background:#e1251b;color:#fff;padding:2mm 4mm;margin:8mm 0 3mm;break-after:avoid}
h3{font:800 13pt BC;text-transform:uppercase;letter-spacing:.05em;border-bottom:2px solid #141313;padding-bottom:1mm;margin:5mm 0 2mm;break-after:avoid}
.ex{margin:4mm 0 1.5mm;font-family:B;break-after:avoid}.ex .n{display:inline-block;min-width:7mm;font:800 13pt BC;color:#e1251b}
.ex b{font:600 10.5pt B}
.foot{margin-top:10mm;border-top:2px solid #141313;padding-top:3mm;font:400 8.5pt Arial;color:#555}
</style></head><body>
<section class="cover">${logo}<div class="lv">${esc(p.level)}</div><h1>${esc(p.title)}</h1><div class="sub">${esc(p.sub)}</div><p class="intro">${esc(p.intro)}</p></section>
<div class="rules"><h4>Cum citești programul</h4><ul>${RULES.map(r => `<li>${esc(r)}</li>`).join("")}</ul></div>
${toHtml(t)}
<p class="foot">Chera Protocol · Marius Chera · mariuschera.ro · Program pentru uz personal; nu se distribuie. Dacă vrei programul ajustat pe tine, cu check-in săptămânal, treci la Chera Protocol Coaching și îți scad prețul programului din prima lună.</p>
</body></html>`;
  const hp = path.join(here, "html", `${p.handle}.html`);
  writeFileSync(hp, html);
  const pdf = path.join(here, "pdf", `${p.handle}.pdf`);
  execFileSync(CHROME, ["--headless=new", "--disable-gpu", "--no-pdf-header-footer", `--print-to-pdf=${pdf}`, pathToFileURL(hp).href], { stdio: "ignore" });
  console.log(p.handle, t.length, "caractere");
}
writeFileSync(path.join(here, "programe.json"), JSON.stringify(P.map(({ text, ...m }) => m), null, 1));
