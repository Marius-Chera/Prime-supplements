# Microsoft Merchant Center – pași pregătiți, 23.10.2026

**Stare (23.10.2026, după-amiază): FĂCUT, așteaptă aprobarea Microsoft.** Contul Microsoft Advertising **PRIME SPORT SUPPLEMENTS SRL (G145RDYP)** a fost creat cu contul Microsoft contact@primesupplements.ro, fără campanie și fără metodă de plată („Configurați plata mai târziu”). Moneda contului e EUR (RON nu există în listă), iar codul de TVA e necompletat. Magazinul Microsoft Merchant Center **„Prime Supplements” (storeId 50105172)** a fost creat prin import din Google Merchant Center 5540809866 (cont Google contact@primesupplements.ro, cu toate permisiunile bifate), cu contact contact@primesupplements.ro. Importul zilnic e activat (12:00 ora Pacificului, adică ~22:00 în România); primul import a fost pornit manual pe 23.10. Aprobarea durează până la 3 zile lucrătoare. Un alt cont Microsoft Ads, creat de proprietar cu marius.chera@gmail.com, rămâne nefolosit (fără campanii).


## De ce
- ChatGPT și Copilot se bazează pe Bing. Pe Bing nu apărem la „proteina whey”, „creatina” și nici la „crema de orez” (audit §5).
- **Listările gratuite de produse** (Bing Shopping, „Product listings”) sunt disponibile și în **România**, conform listei de piețe Microsoft Advertising. Produsele apar cu preț și stoc în tab-ul Shopping de pe Bing și pot fi folosite de Copilot.
- Avem deja tot ce trebuie: Bing Webmaster Tools configurat pe 23.10, cu contul Microsoft **contact@primesupplements.ro**, și feedul Google (Simprosys, 428 de produse aprobate în Merchant Center 5540809866).

## Pașii proprietarului (20–30 de minute, plus aprobarea Microsoft de până la 3 zile lucrătoare)

### 1. Contul Microsoft Advertising
1. Intri pe **ads.microsoft.com** → „Sign up now”, cu **același cont Microsoft ca la Bing Webmaster Tools (contact@primesupplements.ro)**. Este important: altfel domeniul verificat nu apare la pasul 2.
2. Completezi: numele legal PRIME SPORT SUPPLEMENTS SRL, telefonul, țara România, moneda RON, fusul orar București.
3. Accepți termenii Microsoft Advertising.
4. La „Import or create campaign” alegi **skip** (fără campanie).
5. Completezi datele firmei și cele fiscale (CUI 46260823), apoi salvezi.
6. **Datele de plată: le sari** („skip”/„later”). Fără campanie plătită nu se cheltuie nimic. Nu porni nicio campanie.

### 2. Magazinul în Microsoft Merchant Center
1. În Microsoft Advertising: **Tools → Microsoft Merchant Center → Create store**. Dacă opțiunea lipsește, se cere activarea de la suportul Microsoft Advertising.
2. Completezi:
   - Store name: **Prime Supplements**
   - Domain validation: **„Validated via Bing Webmaster Tools”** (primesupplements.ro e deja verificat acolo)
   - Destination URL: **https://primesupplements.ro**
   - Store description: „Suplimente pentru sport Prime: proteină din zer, creatină Creapure®, cremă de orez, aminoacizi și vitamine.”
   - SSL checkout: **Yes**
   - Aggregators: nu le bloca
   - Limba notificărilor: engleză sau română, cum preferi
3. Save. Starea poate fi „Approval pending” până la 3 zile lucrătoare (examinare manuală). Dacă domeniul nu apare în listă, aștepți câteva ore; după 24 de ore se scrie suportului.

### 3. Produsele: import din Google Merchant Center
1. După aprobare: **Import → Import from Google Merchant Center** (Google Import).
2. Te conectezi cu contul Google care vede Merchant Center **5540809866**. Alegi contul și feedul Simprosys (431 de produse), cu țara **RO** și limba **ro**.
3. Programare: **zilnic** (ex. 06:00), ca prețurile și stocul să rămână la zi.
4. Pornești primul import și notezi câte produse sunt acceptate și câte respinse.

**Alternativa:** aplicația Simprosys poate trimite feedul direct în Microsoft Merchant Center, dar poate cere alt plan. Se verifică doar la citirea E12 (Simprosys), care e încă deschisă. Pornim cu importul din Google, care e gratuit și nu atinge Simprosys.

### 4. Listările gratuite
În Merchant Center (Microsoft), la setările magazinului, verifici că **„Product listings” / „Free listings”** e activat pentru magazin. Pe unele conturi e pornit automat. Nu creezi campanii Shopping (ar costa).

## Ce fac eu după ce îmi spui că e gata (doar citire)
- Verific în Microsoft Merchant Center produsele acceptate și respinse și motivele. Respingerile probabile sunt aceleași ca la Google: tricourile MNX, din cauza imaginii.
- Verific pe Bing Shopping căutările „prime whey”, „crema de orez prime” și „creatina creapure” după 1–2 săptămâni.
- Trec rezultatul în JURNAL și în auditul de căutări.

## Ce NU se face
- Nicio campanie plătită și niciun buget.
- **UET tag** (scriptul Microsoft de măsurare): nu e necesar, pentru că domeniul e validat prin Bing Webmaster Tools. Ar adăuga cod pe site și ar cere o mențiune în politica de cookie-uri.
- Microsoft Clarity: decizie separată (audit §11).

## Verificare 24.10.2026 (doar citire, nimic trimis)
Magazinul „Prime Supplements” (50105172) din contul G145RDYP: **431 de produse**, **0 active**, **337 în așteptare** și **94 respinse**. Ultimul import: 24.10, 01:06. Încă nicio afișare și niciun clic.
- **În așteptare (normal, revine singur):** 278 așteaptă verificarea imaginilor de către Microsoft, iar 59 sunt în verificare manuală. Niciun supliment nu e respins.
- **Respinse, toate din greșeală (filtru automat):**
  - **93 de haine MNX și Prime** (tricouri, maiouri, hanorace, pantaloni) marcate „Conținut care instigă la ură”. Probabil din titluri ca „Suffer to Dominate”, „Hammer”, „Arnold Era” sau din imagini;
  - **4 produse** marcate „Vitamine și suplimente”: 3 shakere (Prime cu compartimente 500 ml, MNX 600 ml, Prime 600 ml) și Glycerol Max Pump 500 g. Unul dintre ele e marcat și „Farmacie – rețete”.
- **Ce se poate face:** pentru fiecare grup, Diagnostice → „Solicitați revizuirea pentru toți”, motivul „Clasificare incorectă”. Formularul cere o confirmare în numele firmei („M-am asigurat că ofertele mele de produs sunt conforme cu politicile…”). Microsoft avertizează că prea multe contestații fără modificări îi pot limita pe viitor, deci se trimite **o singură dată pe grup**. Nu s-a trimis nimic: așteaptă „da”-ul proprietarului.
- **Mesajul roșu „Aveți nevoie de o metodă de plată…”** se referă doar la reclamele plătite. Listările gratuite nu au nevoie de card, deci nu adăugăm nicio metodă de plată.
- De verificat din nou după ~28.10 (3 zile lucrătoare): câte produse sunt active și dacă apar pe Bing Shopping.
