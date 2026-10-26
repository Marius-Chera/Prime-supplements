// Adaugă câmpuri de formular (text, radio, checkbox) peste PDF-ul randat de Chrome,
// pe baza pozițiilor extrase din HTML (rects.json). Rulează: node make-fillable.mjs
// Intrări: ../CHESTIONAR-PROFIL-NEURO.pdf (static) + rects.json. Ieșire: ../CHESTIONAR-PROFIL-NEURO-completabil.pdf
import { PDFDocument, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import { readFileSync, writeFileSync } from "node:fs";

const IN = "../CHESTIONAR-PROFIL-NEURO.pdf";
const OUT = "../CHESTIONAR-PROFIL-NEURO-completabil.pdf";
const rects = JSON.parse(readFileSync("rects.json", "utf8"));

const pdf = await PDFDocument.load(readFileSync(IN));
const form = pdf.getForm();
pdf.registerFontkit(fontkit);
const font = await pdf.embedFont(readFileSync("C:/Windows/Fonts/arial.ttf"), { subset: false });
const pages = pdf.getPages();
const RED = rgb(0.882, 0.145, 0.106), INK = rgb(0.067, 0.067, 0.067), WHITE = rgb(1, 1, 1);

// CSS px → PDF pt, cu originea jos-stânga
function box(r) {
  const page = pages[r.page];
  const { width: PW, height: PH } = page.getSize();
  const sx = PW / r.pw, sy = PH / r.ph;
  return { page, x: r.x * sx, y: PH - (r.y + r.h) * sy, w: r.w * sx, h: r.h * sy };
}

// text fields
for (const r of rects.filter(r => r.kind === "text")) {
  const b = box(r);
  const tf = form.createTextField("t_" + r.name);
  tf.addToPage(b.page, { x: b.x, y: b.y + 1, width: b.w, height: Math.max(b.h - 1, 12), borderWidth: 0, backgroundColor: undefined, textColor: INK, font });
  tf.setFontSize(r.name.startsWith("scor") ? 14 : 10);
}

// radio groups (o singură alegere pe rând)
const groups = new Map();
for (const r of rects.filter(r => r.kind === "radio")) {
  if (!groups.has(r.name)) groups.set(r.name, []);
  groups.get(r.name).push(r);
}
for (const [name, opts] of groups) {
  const rg = form.createRadioGroup("r_" + name);
  for (const r of opts) {
    const b = box(r);
    rg.addOptionToPage(String(r.value), b.page, { x: b.x, y: b.y, width: b.w, height: b.h, borderWidth: 1.2, borderColor: INK, backgroundColor: WHITE, textColor: RED });
  }
}

// checkboxes (acorduri)
for (const r of rects.filter(r => r.kind === "check")) {
  const b = box(r);
  const cb = form.createCheckBox("c_" + r.name);
  cb.addToPage(b.page, { x: b.x, y: b.y, width: b.w, height: b.h, borderWidth: 1.2, borderColor: INK, backgroundColor: WHITE, textColor: RED });
}

// JavaScript la nivel de document (Acrobat/Foxit): calculează scorurile în fișa antrenorului.
// Scor1..4 = Runda 1 (D, A, G, S); scor5..8 = Runda 2.
const js = `
function cpScore(prefix, from, to) { var s = 0; for (var i = from; i <= to; i++) { var f = this.getField("r_" + prefix + i); if (f && f.value !== "Off") s += Number(f.value) || 0; } return s; }
function cpCalc() {
  var a = [cpScore("A",1,8), cpScore("A",9,16), cpScore("A",17,24), cpScore("A",25,32)];
  var b = [cpScore("B",1,8), cpScore("B",9,16), cpScore("B",17,24), cpScore("B",25,32)];
  for (var i = 0; i < 4; i++) { var f1 = this.getField("t_scor" + (i+1)); if (f1) f1.value = a[i]; var f2 = this.getField("t_scor" + (i+5)); if (f2) f2.value = b[i]; }
  var names = ["D","A","G","S"]; var top = 0; for (var k = 1; k < 4; k++) if (a[k] > a[top]) top = k;
  var t1 = cpScore("T",33,33) + cpScore("T",35,35), t2 = cpScore("T",34,34) + cpScore("T",36,36);
  var u1 = cpScore("T",37,37) + cpScore("T",39,39), u2 = cpScore("T",38,38) + cpScore("T",40,40);
  var type = names[top] === "D" ? (t1 >= t2 ? "1A" : "1B") : names[top] === "A" ? (u2 > u1 ? "2B" : "2A") : names[top] === "G" ? "2B" : "3";
  var nt = this.getField("t_neurotip"); if (nt && !nt.value) nt.value = type;
  var topB = 0; for (var m = 1; m < 4; m++) if (b[m] > b[topB]) topB = m;
  var lvl = b[topB] >= 22 ? "pe minus" : b[topB] >= 15 ? "de sustinut" : "in regula";
  var df = this.getField("t_deficit"); if (df && !df.value) df.value = (b[topB] >= 15 ? names[topB] + " " : "") + lvl;
}
`;
pdf.addJavaScript("cheraProtocol", js);

// buton „Calculează scorul” pe ultima pagină (Acrobat/Foxit; în Chrome/telefon se completează manual)
const last = pages[pages.length - 1];
const btn = form.createButton("b_calc");
btn.addToPage("Calculeaza scorul (Acrobat)", last, { x: 400, y: 40, width: 150, height: 22, borderWidth: 0, backgroundColor: RED, textColor: WHITE, font });
// acțiunea butonului: pdf-lib nu expune direct JS pe buton; setăm dicționarul manual
import { PDFName, PDFString } from "pdf-lib";
const widget = btn.acroField.getWidgets()[0];
const action = pdf.context.obj({ Type: "Action", S: "JavaScript", JS: PDFString.of("cpCalc();") });
widget.dict.set(PDFName.of("A"), action);

form.updateFieldAppearances(font);
writeFileSync(OUT, await pdf.save());
console.log("ok", OUT, "fields:", form.getFields().length);
