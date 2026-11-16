# Aplicația eMAG (Prime eMAG): plan pentru faza 1 (16.11.2026)

Cererea: brief-ul lui Marius din 16.11, cu completarea „aplicatie tot in shopify !”.
Starea: **plan propus, așteaptă confirmarea lui Marius. Nu s-a scris încă niciun cod.**

## Ce exista deja în repo
Nu există nicio integrare eMAG anterioară. eMAG apare doar ca nume de concurent, în analizele SEO și AI.
Se refolosește modelul aplicațiilor proprii care merg deja: Prime Afiliați și Total Admin (Prime Expediere). Ambele sunt aplicații încorporate în Admin Shopify, create în Dev Dashboard pe contul lui Marius, cu Cloudflare Worker + D1 pe contul Prime și deploy prin `scripts/wr.mjs`.

## Ce spune documentația eMAG (v4.5.2, citită pe 16.11)
- **Adrese:** `https://marketplace-api.emag.ro/api-3/`, cu autentificare HTTP Basic. Apelurile sunt acceptate doar de pe IP-urile din whitelist, iar userul trebuie să aibă drepturi API.
- **Limite:** 12 cereri/s pentru comenzi și 3 cereri/s, cumulat, pentru restul. La depășire vine HTTP 429, iar cererile invalide se numără și ele. Se acceptă maximum 4000 de elemente pe cerere. Fiecare răspuns trebuie să aibă `isError: false`. Apelurile nu se programează la ore fixe.
- **eMAG recomandă** logarea tuturor apelurilor și răspunsurilor timp de 30 de zile.
- **Callback-urile** vin de pe IP-urile 43.131.5.30, 91.206.37.14 și 46.174.144.128. Lista oficială e la `/public-ips.json`.
- **Ce callback-uri există:** comenzi noi, anulări, retururi noi și schimbări de status la retur (Nou, Confirmat, Primit), status AWB și documentație aprobată.
- **Statusurile comenzii:** 1 Nouă, 2 În procesare, 3 Pregătită, 4 Finalizată, 0 Anulată, 5 Returnată.
- **Tipul comenzii:** 2 = livrată de eMAG, 3 = livrată de noi. `order/read` întoarce implicit doar tipul 3, deci tipul 2 se cere separat.
- **Plata:** 1 ramburs, 2 transfer bancar, 3 card online.
- **Acknowledge:** e singura cale prin care comanda trece în „În procesare” și oprește notificările eMAG. Se folosește doar la comenzile tip 3.
- **`order/save`:** comanda se poate edita doar în statusurile 2 și 3. La salvare se trimit TOATE câmpurile citite. O comandă finalizată se poate doar storna.
- **Factura către client:** `order/attachments/save` cu `type: 1` și un URL către PDF (se acceptă doar PDF).
- **AWB:**
  - `awb/save` cere expeditor, destinatar, colete, ramburs și `courier_account_id`.
  - Conturile de curier se citesc cu `courier_accounts/read`.
  - Eticheta se descarcă cu `awb/read_pdf` (A4/A5/A6/ZPL), doar pentru AWB-urile emise prin API.
  - Comanda are câmpul `enforced_vendor_courier_accounts`: dacă vine ca listă goală, AWB-ul nu se poate emite din Marketplace.
- **Retururi (RMA):** `rma/read`, cu statusurile 1 Incomplet, 2 Nou, 3 Confirmat, 4 Refuzat, 5 Anulat, 6 Primit, 7 Finalizat.
- **Facturile de comision:**
  - Categoriile se citesc cu `invoice/categories` (de ex. `FC` = Commission).
  - Facturile se citesc cu `invoice/read`, pe `date_start`/`date_end`, cu paginare de până la 1000 pe pagină.
  - Datele primite: număr, dată, storno, furnizor, client, linii, total fără TVA, TVA, total cu TVA, monedă și termen de plată.
  - **API-ul nu dă link de PDF.** Aplicația va afișa datele și va genera din ele o pagină printabilă. PDF-ul original rămâne în contul eMAG.

## Arhitectura propusă
1. **Interfața**, în Admin Shopify:
   - O aplicație încorporată nouă, „Prime eMAG”, în Dev Dashboard, pe contul lui Marius.
   - Secțiunile apar în meniul din stânga (`ui-nav-menu`): Comenzi, Retururi, Facturi eMAG, Jurnal, Setări.
   - Interfața e în română și merge pe telefon, inclusiv în aplicația Shopify Mobile.
2. **Serverul:** un Cloudflare Worker + o bază D1, pe contul Prime, cu repo privat pe GitHub-ul lui Marius.
   - Aplicația **nu cere nicio permisiune pe datele magazinului** (zero scopes), deci nu poate citi și nu poate scrie comenzi, produse sau stoc în Shopify. Shopify e folosit doar pentru login și pentru afișare.
3. **IP-ul fix:** Cloudflare Workers nu au IP de ieșire fix, iar eMAG cere whitelist.
   - Soluția: un VPS mic (Hetzner, ~4–5 €/lună, IP fix) pe care rulează doar un **releu**.
   - Releul primește cereri semnate de la Worker (cheie secretă + HMAC) și le trimite mai departe doar către `marketplace-api.emag.ro`. Nu are bază de date și nu păstrează nimic.
   - IP-ul acestui VPS e cel trimis la eMAG pentru whitelist.
4. **Callback-urile** ajung direct pe Worker, prin HTTPS public. Se acceptă doar cele venite de pe IP-urile eMAG și cu un token secret în URL.
   - La callback, comanda se citește cu `order/read` după ID, se salvează, apoi se face acknowledge, dacă setarea e pornită.
5. **Polling de rezervă:** la ~5 minute, la secunde „nerotunde”, se citesc comenzile cu status 1 și cele cu `modifiedAfter` = ultima sincronizare minus 10 minute. Retururile se citesc la 15 minute.
6. **Comutatoarele de siguranță**, din Setări (toate oprite la început):
   - scrieri eMAG (comutatorul general);
   - acknowledge automat;
   - schimbare status;
   - AWB;
   - atașare factură.
   În dezvoltare se folosește un client eMAG fals (mock), cu comenzi de test.
7. **Jurnalul:** fiecare apel eMAG (metodă, endpoint, durată, `isError`, mesaje, fără parolă) se păstrează 30 de zile. O pagină separată arată erorile și sincronizările eșuate.
8. **GDPR:** datele clienților se păstrează doar cât e nevoie (propunere: anonimizare la 90 de zile după finalizare), iar în jurnal nu intră adrese.

Alternativa cu totul pe VPS (Node + SQLite + Caddy) e posibilă, dar cere întreținerea unui server întreg: actualizări, backup, HTTPS. Varianta cu releu păstrează totul ca la celelalte aplicații, iar pe VPS rămâne un program de ~50 de linii.

## Ce setează Marius în contul eMAG
1. Creează un user cu drepturi API, separat de userul lui personal. Parola o pune el în Setările aplicației.
2. Trimite IP-ul VPS-ului către eMAG pentru whitelist, la suport sau la account manager. IP-ul îl dau după ce creăm VPS-ul.
3. Pune URL-urile de callback, pe care i le dau în etapa (b): comenzi noi, anulări, retururi și status AWB.

## Etapele
- **(a)** Conexiune + citire comenzi + dashboard, doar citire:
  - filtre pe status, dată, plată și tip;
  - detaliul comenzii;
  - marcajul pentru termenul de expediere: până la 15:00 pleacă azi, după 15:00 pleacă mâine;
  - picking list printabil.
- **(b)** Callback + acknowledge (comutator) + notificări (sunet + badge, plus canalul ales).
- **(c)** Facturile de comision: listă, filtru pe lună, total, export CSV/Excel, sincronizare zilnică și butonul „Sincronizează acum”.
- **(d)** Statusuri (cu confirmare), atașarea facturii (PDF încărcat sau link) și AWB din eMAG cu eticheta PDF (doar la buton, cu confirmare).

## Întrebări deschise
1. Aplicație separată („Prime eMAG”) sau secțiune nouă în Total Admin? Recomandarea e aplicația separată, conform brief-ului.
2. Ești de acord cu VPS-ul-releu, ~4–5 €/lună, creat de tine pe contul tău (Hetzner sau altul)?
3. Pe ce canal vrei notificarea suplimentară: Telegram, e-mail sau niciuna?
4. Cum faci acum factura și AWB-ul pentru comenzile eMAG (Oblio? Cargus din WebExpress? curierul eMAG?). E nevoie de răspuns înainte de etapa (d).
5. Câte comenzi eMAG ai pe lună, aproximativ, și vinzi și prin „livrat de eMAG” (tipul 2)?
6. Îți convine anonimizarea datelor clienților la 90 de zile?
