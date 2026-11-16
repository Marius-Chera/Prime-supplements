# SEO săptămânal în Prime Vizibilitate: etapa 1, doar analiză (17.11.2026)

**Cerut de Marius pe 17.11:** un instrument în aplicația Prime Vizibilitate care să lucreze săptămânal la SEO, cu ținta „100/100 pe nișa noastră” și „cel mai complet site de pe piață”. Etapa 1 înseamnă doar analiză. **Nu s-a scris cod, nu s-a instalat nimic și nu s-a schimbat nimic în Shopify.** Urmează OK-ul lui Marius.

**Ce exista deja și NU se reface** (instrumentul doar le folosește):
- auditul SEO complet din 25.10 (`seo/AUDIT-SEO-COMPLET-2026-10-25.md`): tehnicul e „bun”, iar punctul slab e autoritatea;
- analiza Genius vs Prime din 16.11 (`analiza-genius-vs-prime/RAPORT.md`): tehnic suntem la 7,6/10, ei la 6,5/10; ei au marca, recenziile și descrieri mai lungi;
- planul SEO de după 1.12 (`seo/PLAN-DUPA-BLACK-FRIDAY-2026.md`): pașii 1–20. Pasul 1 („măsurătoarea de referință”) și pasul 2 („igienă on-page”) sunt exact ce ar automatiza instrumentul;
- scorul de 100 SEO + 100 AI pentru fiecare articol (`blog-automation/scor-articol.mjs`, regula din 13.11), refolosit aici pentru blog;
- rutina de blog din cloud, care scrie deja articolele. Instrumentul **nu** scrie articole în paralel cu ea: doar propune subiecte în aceeași coadă;
- coada de rescriere a articolelor de pe pozițiile 8–20 (`seo/OPORTUNITATI-POZITII-8-20-2026-11-16.md`).

---

## 1. Ce face aplicația acum

| | |
|---|---|
| **Tehnologie** | Cloudflare Worker `prime-indexare` (TypeScript), pe contul Cloudflare Prime, planul gratuit. Datele stau în Cloudflare KV (`STATE`), nu în D1, iar cheile sunt criptate AES-256-GCM. Interfața e o singură pagină HTML, încorporată în Shopify Admin prin App Bridge. |
| **Cum rulează** | Pe server, nu local: un cron la fiecare 15 minute, plus un planificator care pornește modulele după orar și face câte un pas mic pe rulare, din cauza limitelor Cloudflare de cereri. Se poate porni și manual, din aplicație. |
| **Shopify** | Aplicație din Dev Dashboard (id 447981223937), **fără niciun scope**, deci nu citește și nu scrie nimic din Admin. Citește doar paginile publice, `sitemap.xml` și `products.json` (pentru feed-ul Compari). |
| **Google** | Search Console API, cu un cont de serviciu cu acces doar de citire; Chrome UX Report pentru viteza reală; verificarea indexării (URL Inspection). |
| **Alte integrări** | Bing URL Submission, Gemini cu căutare Google (nivel plătit), OpenAI (opțional), Zernio (Facebook/Instagram) și sitemap-urile publice ale concurenților (Genius, GymBeam, Nutriland, Pro Nutrition). |
| **Module** | indexare Bing (zilnic); Search Console (luni): oportunități pe pozițiile 8–20, CTR slab, canibalizare, idei, 20 de cuvinte urmărite; indexare Google (zilnic); panelul AI (luni); social (orar); sănătatea site-ului (zilnic pe 10 pagini-cheie, duminică pe tot sitemap-ul: H1, titlu, JSON-LD, Product/Offer, Organization, linkuri rupte și redirecturi); viteza (luni); concurența (duminică: pagini noi în sitemap-uri); **raportul săptămânal** (luni) și alertele. |

**Concluzie:** aproximativ 60 % din măsurători există deja. Lipsesc trei lucruri: scorul compus, auditul on-page complet pe produs și colecție (descriere, secțiuni, alt, linkuri interne, meta) și coada de propuneri cu aprobare.

## 2. Se poate? **DA, cu o limită clară**

- **Da** pentru partea care ține de noi: tehnic, on-page, date structurate și acoperirea subiectelor. Toate se măsoară automat, săptămânal, și pot ajunge la 100, pentru că depind doar de ce publicăm noi. Arhitectura actuală (cron + planificator + KV + raport) le duce fără server nou și fără cost fix.
- **Parțial** pentru rezultatele din Google și din asistenții AI: poziții, clicuri și mențiuni. Le măsurăm și le urmărim săptămânal, dar **nimeni nu poate garanta 100** acolo. Depind de Google, de concurență și de autoritatea mărcii: recenzii, mențiuni și vechime, adică exact zona în care Genius e mai puternic (vezi analiza din 16.11).
- **Limite tehnice, toate ocolibile:**
  - Lighthouse nu rulează într-un Worker, așa că folosim **PageSpeed Insights API**, gratuit, care rulează Lighthouse la Google.
  - Google nu are un API gratuit pentru volumul cuvintelor-cheie. Folosim afișările din Search Console (cererea reală pentru noi) și harta subiectelor din sitemap-urile concurenților. Keyword Planner cere cont Google Ads și aprobare pentru API, așa că nu-l recomand acum.
  - KV gratuit are o limită de 1.000 de scrieri pe zi. Un audit complet pe aproximativ 400 de pagini, pe bucăți, încape, dar dacă ne apropiem de limită mutăm istoricul în D1 (gratuit, 100.000 de scrieri pe zi).

## 3. Ce înseamnă „100/100”: scorul intern propus

Nu există un scor oficial pe nișă, așa că propun **două numere separate**, ca să nu ne mințim singuri:

### A. „Scor Prime” de execuție (0–100): ce depinde de noi. Ținta e 100.
| Parte | Puncte | Ce se măsoară (pe fiecare pagină, apoi media ponderată după trafic) | Poate ajunge la 100? |
|---|---|---|---|
| **Tehnic** | 20 | status 200; canonical către sine; noindex doar unde trebuie; pagina e în sitemap; robots.txt; fără linkuri rupte; fără lanțuri de redirect și fără linkuri interne spre redirecturi; Lighthouse SEO = 100 (PSI); Core Web Vitals trecute pe datele reale (CrUX) | **Da.** Azi suntem aproape: Lighthouse SEO 100, CWV trecute (LCP 1,2 s, INP 121 ms, CLS 0). |
| **On-page** | 30 | titlu de 30–60 de caractere, cu cuvântul principal; meta description de 120–160; un singur H1; descriere unică (fără dubluri interne) și completă pe produs: **ingrediente/compoziție, mod de administrare, pentru cine e, avertismente, întrebări frecvente**, cu un prag minim de cuvinte pe tip de produs; alt pe toate imaginile; cel puțin 3 linkuri interne relevante (produs → ghid, ghid → produs); colecții cu text și H1 pe cuvântul căutat | **Da.** Ține doar de texte. |
| **Date structurate** | 20 | Product + Offer (preț, stoc) + Brand + AggregateRating (Judge.me) pe produse; BreadcrumbList; Organization; Article pe blog; FAQPage acolo unde întrebările sunt vizibile pe pagină; JSON-LD fără erori | **Da.** Avem deja Product/Offer pe 214 din 214. *Atenție:* din 2023, Google afișează FAQ în rezultate doar pentru site-uri guvernamentale și medicale, deci FAQPage ajută la AI și la claritate, nu la stele în Google. |
| **Acoperirea subiectelor** | 20 | harta subiectelor de pe nișă (din sitemap-urile și titlurile/H1-urile concurenților + căutările noastre din Search Console, grupate pe teme); % din teme unde avem o pagină bună; scorul articolelor (`scor-articol.mjs`); cât de proaspete sunt paginile importante | **Practic da**, dar ținta se mișcă: când concurenții adaugă subiecte, scade, iar raportul ne spune exact ce lipsește. |
| **Încredere vizibilă pe site** | 10 | recenzii pe produsele-cheie (număr și notă din schema); pagini de firmă complete (Despre noi, contact, politici, magazinul fizic); autor/expert pe ghiduri | **Parțial.** Paginile, da. Numărul de recenzii crește doar cu fluxul real Judge.me, fără recenzii false. |

### B. „Scor de rezultat” (urmărit, fără țintă garantată)
- Search Console: clicuri, afișări și CTR față de CTR-ul așteptat pe poziție; poziția medie pe cele 20 de cuvinte urmărite; câte cuvinte sunt în top 3 și în top 10; săptămâna asta față de săptămâna trecută și față de acum 4 săptămâni.
- Indexare: câte pagini importante sunt indexate în Google și în Bing.
- Asistenți AI: mențiunile Prime în panelul de 20 de întrebări (azi Gemini 5/20, ChatGPT aproape 0).
- **Aici nu promit 100.** Ținta e creșterea de la o săptămână la alta. Scorul A e cauza, scorul B e efectul.

## 4. Cum ar arăta rularea săptămânală

Totul intră în planificatorul existent (cronul de la 15 minute), fără infrastructură nouă:

| Când (ora României) | Ce |
|---|---|
| duminică 02:00 → | crawl-ul complet existent, extins cu auditul on-page pe fiecare produs, colecție, pagină și articol |
| duminică 12:00 | concurența, extinsă: titlurile și H1-urile paginilor noi → harta subiectelor (fără să copiem textele lor) |
| luni 06:00 | Search Console (există) + PageSpeed Insights pe 10 șabloane-cheie (homepage, 2 colecții, 4 produse, blog, articol, pagină) + CrUX |
| luni 08:00 | **calculul scorului** A + B, salvat în istoric, cu diferența față de săptămâna trecută pe fiecare parte |
| luni 08:30 | **lista de taskuri**: problemele ordonate după impact = (trafic/afișări ale paginii × puncte pierdute) ÷ efort |
| luni 09:00 | **propunerile** (Gemini): titluri, meta, secțiunile lipsă din descrieri, FAQ, subiecte de articol. Plafon de circa 10 produse și 3 subiecte pe săptămână (fără generare în masă). Intră în coada „În așteptare”. |
| luni 09:30 | raportul săptămânal existent primește secțiunea „Scor SEO” și e-mailul de luni |

**În aplicație, un tab nou „Scor SEO”:** scorul total și pe părți, cu grafic pe săptămâni; taskurile săptămânii (bifezi ce s-a rezolvat, iar scorul le verifică singur la rularea următoare); coada de propuneri, cu varianta veche alături de cea nouă și butoanele *Aprobă / Editează / Respinge*.

**Reguli puse în cod, nu doar promise:**
- **Nimic nu se publică automat.** O propunere ajunge pe site doar după click-ul tău pe „Aprobă”. În prima variantă nici atunci: o aplic eu sau o aplici tu (copiere), pentru că aplicația nu are drept de scriere.
- Tema: doar pe o copie nepublicată. Codul refuză orice temă cu rolul `main`.
- Aplicația nu cere niciodată scope-uri pentru comenzi, checkout, plăți, prețuri, stocuri, facturi sau AWB, iar fără scope-urile acestea nici nu le poate atinge. Nu atinge Fluxsales sau Primesupplements App.
- **Filtru de conformitate UE** înainte ca o propunere să apară în coadă: lista de cuvinte interzise (tratează, vindecă, previne boli, detoxifiere, arde grăsimi, slăbire, anxietate etc.) + tabelul mențiunilor autorizate pe nutrient din Reg. 432/2012 (de exemplu, magneziul „contribuie la reducerea oboselii”). O propunere care pică filtrul apare roșie și nu se poate aproba fără editare.
- Concurenții: citim doar adrese, titluri și H1-uri ca să aflăm **subiectele**; textele lor nu ajung nici în prompt, nici în propuneri.
- Fără black-hat: nu generăm recenzii, nu cumpărăm linkuri, nu facem keyword stuffing (filtrul verifică și densitatea cuvântului-cheie) și avem plafon săptămânal de propuneri.

## 5. Acces, chei și costuri

| Ce | Stare | Ce trebuie făcut |
|---|---|---|
| Search Console API (cont de serviciu, citire) | **există** | – |
| Chrome UX Report | **există** | – |
| **PageSpeed Insights API** | lipsește | în același proiect Google Cloud „Prime Vizibilitate”: Enable API + adăugat în restricția cheii CrUX existente (o fac eu în Chrome, ca pe 16.11). Gratuit, 25.000 de cereri pe zi. |
| Gemini (plătit) și OpenAI | **există** | – |
| **Shopify Admin, citire**: `read_products`, `read_content` (blog și pagini), opțional `read_themes` | lipsesc (aplicația are 0 scope-uri) | eu pregătesc versiunea nouă în Dev Dashboard, iar tu dai „Install/Update” ca să accepți permisiunile (circa 2 minute). Fără ele, auditul merge doar din HTML-ul public: merge, dar fără alt-ul exact pe fiecare imagine, fără metafield-urile paginii vizuale și fără câmpurile SEO separate. |
| Shopify Admin, scriere: `write_products`, `write_content`, `write_themes` | **NU acum** | doar în etapa opțională 7, dacă vrei ca butonul „Aprobă” să aplice direct. Tot cu aprobarea ta la fiecare propunere, cu valoarea veche păstrată pentru revenire și cu tema doar pe o copie nepublicată. |
| Google Ads Keyword Planner | nu recomand | cere cont Ads și aprobare de API, iar afișările din Search Console sunt suficiente. |

**Costuri estimate:** Cloudflare 0 lei (dacă depășim limitele gratuite, Workers Paid costă 5 $/lună, dar nu cred că e cazul); PageSpeed 0; Gemini pentru propuneri circa 5–20 lei/lună. **Total: circa 0–25 lei pe lună.**

## 6. Efort și ordinea propusă

| Etapă | Ce | Efort (sesiuni de lucru Claude) | Pașii tăi |
|---|---|---|---|
| 1 | Analiza (acest document) | gata | OK-ul tău |
| 2 | **Scorul A + B din date publice**: audit on-page din HTML + `products.json`, PageSpeed, calculul scorului, istoricul și tab-ul „Scor SEO”. Prima măsurătoare = referința (pasul 1 din planul de după 1.12) | 1–2 | – |
| 3 | Scope-uri de **citire** Shopify: alt-uri exacte, metafield-uri, câmpuri SEO, verificarea secțiunilor din descrieri | 1 | Install/Update (2 min) |
| 4 | Lista de taskuri ordonată după impact + secțiunea din raportul și e-mailul de luni | 1 | – |
| 5 | Coada de propuneri (Gemini) cu filtrul UE și butoanele de aprobare; aplicarea o fac eu sau tu, manual | 1–2 | aprobi propunerile săptămânal (circa 15 min) |
| 6 | Harta subiectelor față de concurenți și subiectele lipsă, trimise în coada de blog existentă | 1–2 | – |
| 7 | *(opțional, mai târziu)* „Aprobă” aplică direct, cu scope-uri de scriere, revenire și temă doar pe copie | 1 | aprobi permisiunile |

**Ordinea:** 2 → 4 → 3 → 5 → 6 → (7). Etapa 2 dă scorul real, ca să vedem de unde pornim, iar etapa 4 îl transformă în taskuri. Abia apoi vin propunerile automate. În total sunt circa 6–9 sesiuni de lucru. **Primul scor real poate fi gata luni, 23.11, dacă dai OK acum la etapa 2.**

**Atenție la calendar:** Late Black Friday e pe 25–27.11. Etapele 2–4 doar citesc și nu ating site-ul, deci nu se suprapun cu campania. Primele propuneri (etapa 5) le-aș programa după 27.11, ca să nu schimbăm texte în timpul campaniei.

---
**Stare:** se așteaptă OK-ul lui Marius înainte de orice linie de cod.

---

## Etapa 2: făcută pe 17.11.2026 (Marius: „Da, începe etapa 2”)

**Ce s-a construit** (Worker `prime-indexare`, versiunea ed4ec8a7; codul e în `src/m/onpage.ts`, `src/m/scor.ts` și `test/onpage.test.ts`, cu 35/35 de teste):
- **Auditul fiecărei pagini**, în verificarea completă de duminică, pe toate paginile din sitemap. Verifică: titlul, meta description, H1-ul din conținut, canonical, noindex, textul paginii, alt-ul imaginilor, linkurile interne (spre ghiduri și spre produse), secțiunile produsului (ingrediente, mod de administrare, pentru cine, avertismente, întrebări frecvente) și schema (Organization, BreadcrumbList, Product/Offer/Brand, Article + autor, CollectionPage, FAQPage acolo unde sunt întrebări vizibile). Textul unui produs se măsoară din descrierea Shopify (`products.json` public), cu pragul de 300 de cuvinte. Pragurile pentru celelalte pagini: colecție 400 de cuvinte, articol 800, pagină 150.
- **PageSpeed Insights (Lighthouse, mobil)** pe cele 10 pagini-cheie, duminică la 10:00. API-ul e activat pe 17.11 de Claude în proiectul Google „Prime Vizibilitate” și adăugat pe cheia „Prime Vizibilitate CrUX”.
- **Scorul Prime**, luni la 08:00, înainte de raportul de la 09:00. Fiecare verificare are o pondere. O pagină cântărește 1 + log10(1 + afișările ei din Google), deci paginile văzute contează mai mult, dar nicio pagină nu e ignorată. Părțile încă nemăsurate nu scad scorul: se rescalează și apar ca „nemăsurat”.
  - **Tehnic (20):** 6 puncte din verificările pe pagină, 3 pentru linkurile rupte, 2 pentru linkurile spre redirecturi, 4 pentru Lighthouse SEO, 4 pentru Core Web Vitals reale și 1 pentru robots.txt.
  - **On-page (30)** și **date structurate (20):** media ponderată a verificărilor pe pagină.
  - **Acoperire (20, provizoriu până la etapa 6):** 14 puncte pentru căutările importante (cele 20 de cuvinte urmărite + căutările cu cel puțin 150 de afișări) care au o pagină dedicată în titlu/H1; 6 puncte pentru articolele cu trafic actualizate în ultimele 12 luni.
  - **Încredere (10):** 5 puncte pentru produsele cu recenzii în schema, 3 pentru paginile firmei care răspund, 2 pentru articolele cu autor.
- **Indicele de rezultat (0–100, fără țintă garantată):** 30 de puncte pentru cuvintele urmărite în top 10, 20 pentru cele în top 3, 20 pentru CTR față de cel așteptat pe poziție, 15 pentru mențiunile în AI față de liderul pieței și 15 pentru tendința clicurilor de la o săptămână la alta.
- **Tab nou „Scor SEO”** în aplicație: scorul și diferența față de data trecută, scorul pe părți cu componentele, **lista „unde pierdem puncte”** (verificare → câte pagini → puncte pierdute → paginile cele mai văzute), paginile de lucrat primele, căutările fără pagină dedicată, tabelul PageSpeed și istoricul. Scorul apare și în Panou și în raportul de luni. Dacă scade cu mai mult de 2 puncte, aplicația dă alertă.

**Calibrare pe pagini reale (17.11, înainte de deploy):** auditul n-a dat alarme false pe Prime Whey, Creatina Creapure, Proteine, Creatină, un articol, homepage și Despre noi. Lipsurile reale găsite (sunt deja în planul de după 1.12):
- produsele nu au niciun link spre un ghid de pe blog (pasul 13, „Citește și”);
- schema FAQPage lipsește pe produse, colecții și articole, deși întrebările frecvente sunt vizibile;
- articolele nu au BreadcrumbList;
- homepage-ul nu are H1 în conținut, iar meta description are 174 de caractere;
- creatina Creapure: 4 din 31 de imagini fără alt.

**Prima măsurătoare (referința):** pornită pe 17.11 la 00:45. Verificarea completă durează câteva ore, apoi rulează PageSpeed și scorul.
