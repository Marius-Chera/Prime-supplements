/**
 * Chera Protocol – receptor pentru evaluare (Google Apps Script, Web App)
 * Primește POST-ul din evaluare.html (CONFIG.SHEET_ENDPOINT) și scrie un rând în foaia "Evaluari".
 *
 * Instalare (5 minute):
 * 1. Creează un Google Sheet nou „Chera Protocol – Evaluări”. Extensii → Apps Script. Lipește acest cod.
 * 2. Deploy → New deployment → Type: Web app → Execute as: Me → Who has access: Anyone → Deploy.
 * 3. Copiază URL-ul Web App și pune-l în evaluare.html la CONFIG.SHEET_ENDPOINT.
 * 4. Rulează o dată funcția setup() din editor (creează antetul). Fă o evaluare de test și verifică rândul.
 * Opțional: NOTIFY_EMAIL trimite un e-mail la fiecare evaluare; WHATSAPP_WEBHOOK trimite datele spre
 * furnizorul de WhatsApp (Wati/Respond.io) când există un webhook de intrare.
 */
const SHEET_NAME = "Evaluari";
const NOTIFY_EMAIL = "";        // ex. "contact@mariuschera.ro"; gol = fără e-mail
const WHATSAPP_WEBHOOK = "";    // URL de webhook al furnizorului de WhatsApp; gol = nimic

const HEADER = ["ts","name","phone","email","city","goal","years","sleep","caffeine","days","code","type","dom","mixed","deficit","level","allHigh",
  "A_D","A_A","A_G","A_S","B_D","B_A","B_G","B_S","consentWa","consentGdpr","ansA","ansT","ansB","ua"];

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
      p.ts || new Date().toISOString(), p.name || "", "'" + (p.phone || ""), p.email || "", p.city || "", p.goal || "",
      p.years || "", p.sleep || "", p.caffeine || "", p.days || "",
      p.code || "", p.type || "", p.dom || "", p.mixed ? "da" : "nu", p.deficit || "", p.level || "", p.allHigh ? "da" : "nu",
      sA.D || "", sA.A || "", sA.G || "", sA.S || "", sB.D || "", sB.A || "", sB.G || "", sB.S || "",
      p.consentWa ? "da" : "nu", p.consentGdpr ? "da" : "nu",
      JSON.stringify(p.ansA || {}), JSON.stringify(p.ansT || {}), JSON.stringify(p.ansB || {}), p.ua || ""
    ]);
    if (NOTIFY_EMAIL) {
      MailApp.sendEmail(NOTIFY_EMAIL, "Evaluare nouă: " + (p.name || "") + " · " + (p.code || ""),
        "Nume: " + p.name + "\nTelefon: " + p.phone + "\nOraș: " + p.city + "\nObiectiv: " + p.goal +
        "\nProfil: " + p.code + " (" + p.type + ", deficit " + p.deficit + ", nivel " + p.level + ")" +
        "\nNatura D/A/G/S: " + [sA.D, sA.A, sA.G, sA.S].join("/") + "\nEchilibru D/A/G/S: " + [sB.D, sB.A, sB.G, sB.S].join("/"));
    }
    if (WHATSAPP_WEBHOOK) {
      UrlFetchApp.fetch(WHATSAPP_WEBHOOK, { method: "post", contentType: "application/json", payload: JSON.stringify(p), muteHttpExceptions: true });
    }
    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput("Chera Protocol – receptor evaluare: OK");
}
