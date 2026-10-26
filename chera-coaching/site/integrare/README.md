# Pagina „Evaluare gratuită” – cum se integrează

Fișiere (în `chera-coaching/site/`):
- `evaluare.html` – pagina completă (stil + markup + logică). Conținutul chestionarului și matricea de recomandări sunt în blocul `<script>` (constantele `A_ITEMS`, `TIE_1`, `TIE_2`, `B_ITEMS`, `TYPES`, `DEFICIT`, `DOORS`); se modifică acolo, fără altă dependență.
- `CHESTIONAR-PROFIL-NEURO-print.html` → `CHESTIONAR-PROFIL-NEURO.pdf` – versiunea de hârtie, cu căsuțe de bifat și bloc de semnătură.
- `integrare/apps-script.gs` – receptorul care scrie evaluările într-un Google Sheet (și, opțional, trimite e-mail sau un webhook spre furnizorul de WhatsApp).

## 1. Până la magazinul Shopify (acum)
Pagina e publicată ca artefact privat (link în jurnal) ca să fie testată pe telefon. Trimiterea către Google Sheet e oprită (`CONFIG.SHEET_ENDPOINT` gol); rezultatul se vede pe ecran și se poate trimite manual pe WhatsApp cu butonul.

## 2. În Shopify (după ce magazinul există)
Varianta recomandată: **secțiune de temă + pagină**.
1. Online Store → Themes → tema activă → Edit code.
2. `sections/` → Add a new section → nume `evaluare-neuro`. Lipește tot conținutul din `evaluare.html` (fără linia `<meta name="claude:viewport-fit-sides">`), apoi adaugă la final:
   ```liquid
   {% schema %}
   { "name": "Evaluare neuro", "settings": [], "presets": [{ "name": "Evaluare neuro" }] }
   {% endschema %}
   ```
3. `templates/` → Add a new template → Page → nume `evaluare` (JSON). Pune în el doar secțiunea `evaluare-neuro` (fără antetul/subsolul temei dacă vrem pagina curată; altfel rămân).
4. Online Store → Pages → Add page → titlu „Evaluare gratuită”, Theme template: `page.evaluare`, handle `/pages/evaluare`.
5. În `evaluare.html` → `CONFIG`: `WHATSAPP_NUMBER` = numărul dedicat al firmei (format internațional, fără +), `SHEET_ENDPOINT` = URL-ul Web App din pasul 3 de mai jos.
6. Butonul „Ușa ta” din rezultat se leagă la produsele reale: în `DOORS` se adaugă `href` către `/pages/elite`, `/products/chera-protocol-coaching`, `/collections/programe` (de completat după ce există).

Alternativă rapidă: Pages → Add page → editorul de conținut în modul `<>` (HTML) → lipește conținutul. Merge, dar editorul Shopify poate rescrie unele atribute; secțiunea de temă e mai sigură.

## 3. Google Sheet (5 minute, o singură dată)
1. Google Sheet nou „Chera Protocol – Evaluări” (pe contul firmei).
2. Extensii → Apps Script → lipește `integrare/apps-script.gs` → Salvează.
3. Deploy → New deployment → Web app → Execute as: Me → Who has access: Anyone → Deploy → copiază URL-ul.
4. Rulează `setup()` o dată (creează antetul). Pune URL-ul în `CONFIG.SHEET_ENDPOINT`.
5. Test: o evaluare completă de pe telefon → rândul apare în foaie.
Opțional în script: `NOTIFY_EMAIL` (e-mail la fiecare evaluare) și `WHATSAPP_WEBHOOK` (când furnizorul de WhatsApp are webhook de intrare, lead-ul ajunge direct în inbox cu eticheta profilului).

## 4. WhatsApp
- Până la API: butonul „Scrie-mi pe WhatsApp” deschide `wa.me/<număr>` cu textul precompletat (profil + scoruri). Antrenorul răspunde din aplicația WhatsApp Business.
- Cu API (Wati/Respond.io): webhook-ul din Apps Script creează contactul cu eticheta `[neurotip]-[deficit]` și declanșează șablonul de bun venit; conversația apare în inbox-ul echipei.

## 5. Ce se schimbă ușor
- Textele rezultatului: `TYPES` (cine ești / antrenament / dietă) și `DEFICIT` (dietă / suplimente / stil de viață / atenționare).
- Pragurile: în `balance()` (15 și 22) și în `dominant()` (diferența ≤ 2 = profil mixt).
- Ordinea afirmațiilor: amestecată determinist (`seededShuffle`); schimbă seed-ul ca să schimbi ordinea.
- Numărul de afirmații pe ecran: `PER_PAGE`.

## 6. PDF-ul completabil (câmpuri de formular)
- Fișier: `site/CHESTIONAR-PROFIL-NEURO-completabil.pdf` (câmpuri de text, grupuri de selecție cu o singură alegere pe rând, bife de acord, fișa antrenorului; buton „Calculeaza scorul” care funcționează în Acrobat/Foxit, nu în Chrome/telefon). Salvarea: din aplicația de PDF (Acrobat Reader, Foxit, Chrome: descarcă/salvează; pe telefon: „Salvează” sau „Trimite” din vizualizator).
- Regenerare după orice schimbare în `CHESTIONAR-PROFIL-NEURO-print.html`:
  1. `chrome --headless=new --dump-dom <print.html>` → extrage blocul `<script id="rects">` în `site/tools/rects.json` (comanda exactă e în JURNAL 27.10).
  2. `chrome --headless=new --print-to-pdf=CHESTIONAR-PROFIL-NEURO.pdf <print.html>`.
  3. `cd site/tools && node make-fillable.mjs` (pdf-lib + fontkit, Arial încorporat pentru diacritice). `node_modules/` nu se comite.
