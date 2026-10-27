/**
 * Chera Protocol – receptor pentru evaluare (Google Apps Script, Web App)
 * Primește POST-ul din evaluare.html (CONFIG.SHEET_ENDPOINT), scrie un rând în foaia "Evaluari",
 * trimite rezultatul pe e-mail lui Marius la fiecare evaluare și, dacă omul a ales e-mail, îi trimite și lui rezultatul.
 *
 * Instalare (5 minute, din contul Google al firmei):
 * 1. Google Sheet nou „Chera Protocol – Evaluări”. Extensii → Apps Script. Lipește acest cod. Completează NOTIFY_EMAIL.
 * 2. Deploy → New deployment → Web app → Execute as: Me → Who has access: Anyone → Deploy. Copiază URL-ul.
 * 3. Pune URL-ul în evaluare.html la CONFIG.SHEET_ENDPOINT.
 * 4. Rulează o dată setup() din editor (creează antetul). Fă o evaluare de test.
 * WhatsApp: până la API (Wati/Respond.io), omul care alege WhatsApp îți scrie el primul (butonul wa.me) sau îi scrii tu
 * din aplicația WhatsApp Business, cu numărul din e-mailul de notificare. Cu API, completează WHATSAPP_WEBHOOK.
 */
const SHEET_NAME = "Evaluari";
const NOTIFY_EMAIL = "";        // OBLIGATORIU: adresa ta, ex. "contact@mariuschera.ro"
const FROM_NAME = "Marius Chera · Chera Protocol";
const WHATSAPP_WEBHOOK = "";    // URL de webhook al furnizorului de WhatsApp; gol = nimic

const HEADER = ["ts","name","phone","email","city","goal","channel","years","sleep","caffeine","days","code","type","dom","mixed","deficit","level","allHigh",
  "A_D","A_A","A_G","A_S","B_D","B_A","B_G","B_S","consentWa","consentGdpr","summary","ansA","ansT","ansB","ua"];

function setup() {
  const sh = sheet_();
  if (sh.getLastRow() === 0) sh.appendRow(HEADER);
  sh.setFrozenRows(1);
}

function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  return ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
}

function doPost(e) {
  try {
    const p = JSON.parse(e.postData.contents || "{}");
    const sh = sheet_();
    if (sh.getLastRow() === 0) sh.appendRow(HEADER);
    const sA = p.scoresA || {}, sB = p.scoresB || {};
    sh.appendRow([
      p.ts || new Date().toISOString(), p.name || "", "'" + (p.phone || ""), p.email || "", p.city || "", p.goal || "", p.channel || "",
      p.years || "", p.sleep || "", p.caffeine || "", p.days || "",
      p.code || "", p.type || "", p.dom || "", p.mixed ? "da" : "nu", p.deficit || "", p.level || "", p.allHigh ? "da" : "nu",
      sA.D || "", sA.A || "", sA.G || "", sA.S || "", sB.D || "", sB.A || "", sB.G || "", sB.S || "",
      p.consentWa ? "da" : "nu", p.consentGdpr ? "da" : "nu", p.summary || "",
      JSON.stringify(p.ansA || {}), JSON.stringify(p.ansT || {}), JSON.stringify(p.ansB || {}), p.ua || ""
    ]);

    const goalText = { scena: "vrea să urce pe scenă", sportiv: "vrea să arate ca un sportiv, fără concurs", start: "începe de la zero" }[p.goal] || p.goal;
    const channelText = p.channel === "email" ? "e-mail" : "WhatsApp";

    // 1) notificare către Marius, la fiecare evaluare
    if (NOTIFY_EMAIL) {
      const body =
        "Evaluare nouă · " + (p.name || "") + " · profil " + (p.code || "") + "\n\n" +
        "Telefon: " + (p.phone || "") + "\nE-mail: " + (p.email || "") + "\nOraș: " + (p.city || "") + "\n" +
        "Obiectiv: " + goalText + "\nVrea răspunsul pe: " + channelText + "\n" +
        "Ani de sală: " + p.years + " · Somn: " + p.sleep + " · Cafea: " + p.caffeine + " · Antrenamente/săpt.: " + p.days + "\n\n" +
        "Natura D/A/G/S: " + [sA.D, sA.A, sA.G, sA.S].join(" / ") + (p.mixed ? " (profil mixt)" : "") + "\n" +
        "Echilibru D/A/G/S: " + [sB.D, sB.A, sB.G, sB.S].join(" / ") + " · deficit " + p.deficit + " (" + p.level + ")" + (p.allHigh ? " · toate ridicate" : "") + "\n\n" +
        "WhatsApp: https://wa.me/" + String(p.phone || "").replace(/^0/, "40") + "\n\n" +
        "---- Rezultatul afișat omului ----\n" + (p.summary || "");
      MailApp.sendEmail({ to: NOTIFY_EMAIL, subject: "Evaluare nouă: " + (p.name || "") + " · " + (p.code || "") + " · " + channelText, body: body, name: FROM_NAME });
    }

    // 2) rezultatul către om, dacă a ales e-mail
    if (p.channel === "email" && p.email && NOTIFY_EMAIL) {
      const html =
        "<div style=\"font-family:Arial,sans-serif;max-width:640px;margin:0 auto;color:#141212\">" +
        "<div style=\"background:#0e0d0d;color:#fff;padding:20px 24px\"><div style=\"font-size:14px;letter-spacing:.1em;text-transform:uppercase;color:#e1251b;font-weight:bold\">Chera Protocol</div><div style=\"font-size:24px;font-weight:bold;margin-top:6px\">Profilul tău neuro</div></div>" +
        "<div style=\"padding:24px;line-height:1.6;font-size:16px\">" +
        "<p>Salut, " + (p.name || "") + "!</p><p>Ai completat evaluarea. Mai jos ai rezultatul, iar în cel mult 24 de ore îți scriu eu cu planul de pornire.</p>" +
        "<pre style=\"white-space:pre-wrap;font-family:Arial,sans-serif;background:#f4f1ee;padding:16px;border-radius:6px\">" + String(p.summary || "").replace(/</g, "&lt;") + "</pre>" +
        "<p>Dacă vrei să-mi scrii tu primul, pe WhatsApp: <a href=\"https://wa.me/" + WHATSAPP_NUMBER_ + "\">+" + WHATSAPP_NUMBER_ + "</a>.</p>" +
        "<p>Marius Chera<br>www.mariuschera.ro</p>" +
        "<p style=\"font-size:12px;color:#777\">Profilul neuro este un profil de preferințe și de stare, folosit pentru a alege antrenamentul, nutriția și suplimentele. Nu este un test medical.</p>" +
        "</div></div>";
      MailApp.sendEmail({ to: p.email, subject: "Profilul tău neuro Chera Protocol: " + (p.code || ""), htmlBody: html, name: FROM_NAME, replyTo: NOTIFY_EMAIL });
    }

    // 3) WhatsApp prin API (când există)
    if (WHATSAPP_WEBHOOK) {
      UrlFetchApp.fetch(WHATSAPP_WEBHOOK, { method: "post", contentType: "application/json", payload: JSON.stringify(p), muteHttpExceptions: true });
    }
    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) })).setMimeType(ContentService.MimeType.JSON);
  }
}

const WHATSAPP_NUMBER_ = "40757911908"; // același număr ca în evaluare.html CONFIG.WHATSAPP_NUMBER

function doGet() {
  return ContentService.createTextOutput("Chera Protocol – receptor evaluare: OK");
}
