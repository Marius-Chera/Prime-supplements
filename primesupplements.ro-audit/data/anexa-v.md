## Anexa V. Verificarea adversarială (13.10.2026)

Fiecare raport de specialist a fost reluat de doi verificatori independenți, care nu au văzut concluziile celuilalt:

- **reproduce**: refac dovada pe site-ul live (13.10.2026) și în datele capturate, cifră cu cifră;
- **impact**: judecă efectul real în Google, siguranța remedierii propuse și dacă remedierile din runda 2 țin pe site-ul live.

O constatare este **confirmată** când ambii verificatori o confirmă, **parțial confirmată** când cel puțin unul corectează severitatea, dovada sau recomandarea, și **infirmată** când verificatorul „reproduce” o infirmă (sau „impact” o infirmă fără ca „reproduce” să o confirme). Severitățile propuse de verificatori sunt în `data/specialist-results.json`; tabelul de constatări păstrează severitatea specialistului.

**Rezultat:** 287 constatări verificate: 101 confirmate, 179 parțial confirmate, 7 infirmate. Severitate ridicată la 0, coborâtă la 134: verificatorii au judecat și starea de după runda 2, deci multe probleme deja remediate primesc o severitate mai mică, iar când cei doi verificatori propun severități diferite se păstrează cea mai mică.

**Remedierile din runda 2, verificate live:** 265 țin, 85 țin parțial, 6 nu țineau la momentul verificării (toate tratate, vezi mai jos); 218 verificări nu se aplicau (constatări fără remediere în runda 2).

| Specialist | Constatări | Confirmate | Parțial | Infirmate | Neverificate | Scor specialist (12.10) | Scorul verificatorului „impact” (13.10, după runda 2) |
|---|---|---|---|---|---|---|---|
| technical | 28 | 13 | 15 | 0 | 0 | 52 | 66 |
| schema | 20 | 10 | 10 | 0 | 0 | 18 | 30 |
| sitemap | 15 | 8 | 7 | 0 | 0 | 52 | 76 |
| international | 10 | 3 | 7 | 0 | 0 | 30 | 80 |
| cluster | 17 | 7 | 10 | 0 | 0 | 24 | 57 |
| content | 18 | 10 | 8 | 0 | 0 | 29 | 58 |
| images | 17 | 5 | 11 | 1 | 0 | 42 | 70 |
| performance | 17 | 2 | 15 | 0 | 0 | 40 | 45 |
| geo | 18 | 5 | 12 | 1 | 0 | 50 | 66 |
| sxo | 16 | 4 | 11 | 1 | 0 | 22 | 42 |
| ecommerce | 24 | 11 | 13 | 0 | 0 | 30 | 55 |
| authority | 16 | 4 | 11 | 1 | 0 | 18 | 27 |
| local | 13 | 5 | 8 | 0 | 0 | 26 | 48 |
| visual | 5 | 1 | 4 | 0 | 0 | 48 | 62 |
| shopify-config | 8 | 1 | 6 | 1 | 0 | 45 | 72 |
| onpage | 28 | 8 | 20 | 0 | 0 | 36 | 72 |
| agentic | 17 | 4 | 11 | 2 | 0 | 58 | 68 |

Infirmate: IMAGES-17, GEO-14, SXO-14, AUTHORITY-04, SHOPIFY-08, AGENTIC-10, AGENTIC-17.

Cu ponderile din capitolul de început, scorurile verificatorilor (Tehnic 66, Conținut 58, On-page 72, Schema 30, Performanță 45, AI Search 66, Imagini 70) dau 14,52 + 13,34 + 14,40 + 3,00 + 4,50 + 6,60 + 3,50 = **59,86 ≈ 60/100**, adică aceeași valoare ca estimarea live din capitolul de început.

### Constatări infirmate și de ce

- **SHOPIFY-08** (partea de SEO): Shopify pune singur `noindex,nofollow` pe produsele cu starea „Nelistat”, deci ele nu sunt indexabile. Rămâne doar partea practică: pachetul Thermo Core + Water Out, nelistat, este încă recomandat în 2 articole (la proprietar). Cele 2 pachete Creapure sunt în starea Ciornă, nu „nelistate”; formularea din `round2-status.md` a fost corectată.
- **AGENTIC-10**: tema folosește titlul produsului ca text alternativ când câmpul alt din Admin este gol, deci fotografiile de produs aveau deja nume în arborele de accesibilitate. Alt-urile au fost oricum completate în runda 1.
- **AGENTIC-17**: constatarea descria o limită a mediului de test (overlay-urile nu au putut fi randate), nu o problemă observată pe site.
- **IMAGES-17**: era o constatare-umbrelă care repeta IMAGES-01, -04, -05 și -09.
- **AUTHORITY-04**: dovezile descriau mediul de audit (lipsa cheilor Moz/Bing și a accesului GSC/GA4), nu site-ul. Rămâne o limită a auditului, nu o problemă a magazinului.
- **SXO-14**: secțiunea „Reduceri” de pe homepage nu duce la colecția goală `/collections/reduceri`, ci la „Cele mai vândute”. Eticheta înșelătoare a secțiunii rămâne de schimbat de proprietar (`OWNER-HANDOVER.md`).
- **GEO-14** (constatarea specialistului GEO): blocarea fetcherelor AI de către protecția anti-bot nu a fost reprodusă cu niciun user-agent de AI; paginile 429 salvate în audit provin din rafalele de cereri ale mediului de audit. Perechea AGENTIC-03 rămâne doar ca risc de urmărit în loguri, nu ca defect constatat.

### Remedieri din runda 2 care nu țineau la verificare și ce s-a făcut

- **ECOMMERCE-01 / SCHEMA-01**: descrierile scrise în runda 2 aveau rânduri noi între paragrafe, iar tema live (filtrul `escape`) producea astfel JSON-LD Product invalid. Descrierile au fost rescrise fără rând nou între taguri, cu același text și aceeași afișare. Acum blocul Product este valid live pe 188/188 pagini de produs.
- **TECHNICAL-13**: un articol păstrat (`cum-alegi-crema-de-orez`) avea încă linkuri myshopify și JSON-LD BlogGenAuto, pentru că importul corpurilor nu se terminase. După import, toate cele 121 de articole au fost verificate pe storefront (§4 din `round2-status.md`).
- **AGENTIC-05**: robots.txt-ul temei de test copia paragraful Shopify adresat agenților AI (shop.app, ToS, e-mail). Paragraful a fost scos.
- **SHOPIFY-08**: formularea „nelistate” pentru pachetele în Ciornă a fost corectată.

### Probleme noi semnalate de verificatori și tratate

- **Article JSON-LD invalid pe tema live**: rezumatele vechi aveau rânduri noi. Cele 121 de articole au acum un rezumat de o linie, iar blocul Article este valid live.
- **Breadcrumb-ul de produs**: tema live alege prima colecție a produsului, adică „Cele mai vândute”, care acum este noindex. Tema de test alege prima colecție reală (READY-R2); până la publicarea ei, breadcrumb-ul live rămâne neschimbat.
- **Linkul „Înregistrare B2B” din footer** ducea pe `b2b.primesupplements.ro`. Acum duce la `/pages/inregistrare-b2b` pe domeniul principal (live).
- **Două identități de autor** (două profiluri LinkedIn diferite; Organization în JSON-LD și Person în corp): linkurile LinkedIn au fost scoase din corpuri, iar autorul trimite la `/pages/autor-marius-chera`. Autorul Person cu `@id` este în tema de test.
- **FAQPage ascuns** pe produsele cu creatină (afirmații de sănătate neautorizate, fără diacritice): nu mai este emis (tema de test). Tot în tema de test: `og:locale` = `ro_RO`, iar logo-ul Organization/publisher este mutat de pe un PNG care răspunde 404.
- **Recomandarea GSC → Removals** pentru URL-urile vechi a fost retrasă: pentru URL-uri redirecționate contrazice ghidul Google, iar Google actualizează singur rezultatele prin 301.
- **Google Business Profile / Bing Places**: magazinul este exclusiv online, deci nu este eligibil (LOCAL-11), iar un profil pe adresa sediului riscă suspendarea. Toate recomandările de acest fel au fost scoase din raport (TECH-16, AUTHORITY-02, -09, -11, SXO-03).
- **„Nutriționist certificat”**: credențiala nu poate fi verificată. Recomandările care o foloseau citează acum credențiala reală, „antrenor de culturism”.
- **Facebook**: verificatorul a semnalat că forma `facebook.com/primesupplementsro` (din footer și din `sameAs`) dădea eroare la redirecționarea spre login. Dovezile salvate în audit arată însă invers: forma fără punct se încarcă. Proprietarul confirmă adresa paginii înainte de publicarea temei (`OWNER-HANDOVER.md`).
- **Comentariile „Failed to render app block”** din tema live (aplicații dezinstalate) dispar la publicarea temei de test, care nu le mai referențiază.

### Lotul al treilea (conținut, clustere, AI Search, on-page) și ce s-a corectat după el

- **Regresie din runda 2, corectată:** etichetele interne de lucru (`hub:`, `intent:`, `produs:`) plus „Blog 2025” apăreau ca 180 de butoane de filtrare pe `/blogs/news`, fiecare cu o pagină `/tagged/` indexabilă (CLUSTER-10). Acum fiecare articol are o singură etichetă de temă în română, iar bara afișează 11 teme (verificat live).
- **„Textul de produs randat de două ori” (GEO-04):** tab-urile de produs apar o dată ca acordeon pentru mobil și o dată ca tab-uri pentru desktop, iar CSS-ul ascunde una dintre ele. Este structura temei, nu un text dublat de noi, și nu se vede de două ori. Secțiunea SEO de jos (`custom.seo_produs`, pe 81 de produse) repetă cel mult câteva propoziții din „Despre produs” (doar 1 produs din 81 depășește 60 % asemănare). FIXED-R2 rămâne.
- **Mențiunile obligatorii pe pagina de produs (CONTENT-03):** pe cele 49 de suplimente apar vizibil în tab-ul „Despre produs”. Singurul produs pe alt șablon (`creatina-monohidrat-micronized-300g-fara-aroma`, unde „Despre produs” este text fix al temei) le are acum în „Detalii produs”.
- **Ghidurile din colecții (CLUSTER-02):** colecția Intra-workout are acum propria listă. Pe Pudră proteică și Aminoacizi, comparațiile `izolat-vs-concentrat-proteic` și `bcaa-vs-eaa`, care nu aveau niciun link intern, sunt primele în listă. Lista Pre-workout conține doar ghiduri de pre-workout.
- **Tema de test:** nu mai emite un al doilea meta robots pe resursele ascunse cu `seo.hidden` (Shopify le dă deja `noindex,nofollow`). Datele structurate ale autorului nu mai trimit la un profil LinkedIn care nu apare pe pagina de autor.
- **Statusuri corectate:** CONTENT-16 / CLUSTER-15 trec din OPEN în PARȚIAL (stub-ul redirecționat, handle-uri ASCII, autor pe articolele vechi). Verificările CLUSTER-05 / CLUSTER-12 caută acum în `sitemap_articles_1.xml` (`sitemap_blogs_1.xml` listează doar blogul).
- **Rămân la proprietar** (`OWNER-HANDOVER.md` §3):
  - titlul și meta-descrierea homepage-ului din Preferințe (se pot aplica live azi, API-ul nu le expune);
  - titlul „Înainte/după”;
  - certificările din „Despre noi”;
  - expertiza medicală pe cele 16 articole Prime Health;
  - suprapunerea `creatina-efecte-secundare` / `creatina-si-retentia-de-apa` înainte de publicarea ciornelor;
  - linkurile spre pachetul promoțional nelistat.
- **Rămân muncă editorială** (raportate, neatinse):
  - articolele păstrate nu citează surse primare; „studiile arată” apare fără link în aproximativ 90 de corpuri, iar cele 11 ciorne au surse;
  - 26 de articole nu primesc niciun link din alte articole; blocul de articole asemănătoare ar fi o schimbare de design;
  - titlurile de secțiune în stil generator („Top 5 Probleme…”);
  - stilurile inline ale generatorului din 55 de corpuri, care țin aspectul cardurilor.
- **Info:**
  - fotografia autorului are în numele fișierului „primesupplements1-myshopify-com”;
  - alt-urile imaginilor de produs folosesc încă numele englezești de dinainte de redenumire;
  - arhiva blogului are acum 21 de pagini (6 articole pe pagină), nu 33 cum scria raportul din 12.10.

### Reconcilieri și limite

- **Recenzii**: numărul de referință este **431 de recenzii Judge.me, medie 4,87**, citit live pe 13.10.2026 din caruselul de pe homepage (`data-number-of-reviews='431'`). 124 era contorul recenziilor despre magazin (nu despre produse) din widget, iar „60+” era o formulare din text. Raportul folosește 431.
- **SERP**: căutările pe care se bazează SXO-03, SXO-06, SXO-11 și partea de SERP din SXO-01/02 au fost făcute cu un motor indexat în SUA, nu pe google.ro. Încrederea în aceste constatări este redusă. Ele trebuie validate în Google Search Console și manual pe google.ro (`hl=ro`, `gl=ro`).
- **Autoritate**: AUTHORITY-01, -02 și partea de măsurare din -04 numărau de trei ori aceeași cauză (lipsa datelor off-site). În plan sunt tratate ca o singură acțiune.
- **Severități:** verificatorii propun Info în loc de Medium/Low pentru GEO-16 / AGENTIC-04 (llms.txt / agents.md generic, ignorat de Google) și GEO-17 (Content-Signal). Severitățile propuse de verificatori sunt înregistrate în `data/specialist-results.json`; tabelul de constatări păstrează severitatea specialistului, iar diferențele sunt sintetizate aici.
