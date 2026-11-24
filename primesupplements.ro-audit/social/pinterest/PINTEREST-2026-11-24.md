# Pinterest – contul Prime Supplements (24.11.2026)

Profil: https://ro.pinterest.com/primesupplementsro/

## Decizia
- Marius a făcut contul cu **contact@** și e logat în Google Chrome (real).
- **Fără Zernio pentru Pinterest:** în Zernio sunt deja 2 conturi (FB + IG), al treilea ar costa. Pinterest se lucrează direct (Claude in Chrome + încărcare în masă din CSV, gratuit). Înlocuiește planul „Pinterest legat în Zernio” din DE-FACUT #38 / Prime Vizibilitate.
- Scop: trafic și SEO (Pinterest e motor de căutare vizual; fiecare pin duce la un articol de blog, cu UTM `utm_source=pinterest&utm_medium=social&utm_campaign=pin-articole`).

## Ce s-a făcut pe 24.11.2026 (Claude, din Chrome)
- **Cont business** (Marius: „Da, apasă” la Condițiile Pinterest Business). Tip: comerciant / magazin online; țara România; site primesupplements.ro; domeniu „Sănătate și fitness”; obiectiv: trafic pe site; reclame: nu.
- **Profil:** nume „Prime Supplements – Nutriție sportivă”; utilizator **primesupplementsro** (era `prime4319`; `primesupplements` e al unui cont străin de wellness, nu al nostru); site https://primesupplements.ro; poza `chatgpt-ads/profil-img/logo-A-negru.png`; despre: „Brand românesc de nutriție sportivă. Proteine din zer (Prime Whey, Pure Isolate), creatină Creapure®, aminoacizi EAA și cremă de orez instant. Aici găsești rețete cu proteine, ghiduri despre suplimente și idei de antrenament și nutriție. Livrare în toată România.”
- **8 panouri publice** (cu descrieri pe cuvinte-cheie): Cremă de orez și ovăz – mic dejun · Proteine din zer – ghid · Creatină – ghid complet · Rețete cu proteine · Nutriție sportivă și suplimente · Vitamine și minerale · Antrenament la sală · Produse Prime Supplements (gol deocamdată – pentru pinuri de produs).
- **162 de pinuri** (toate articolele publicate de pe blog), imagini verticale 1000×1500: poza articolului, logo alb, eticheta categoriei cu roșu, titlul alb pe negru, bara roșie „Citește ghidul complet → primesupplements.ro”.
  - Generare: `build-lista.mjs` (lista din exportul GraphQL al articolelor → `pinuri-articole/lista.json`, cu panoul ales după etichete) → `make-pins.ps1` (.NET; pozele sursă și pinurile stau în `D:\Proiecte Claude\Prime Supplements\_pinterest\`, în afara repo-ului) → urcate în Shopify Files ca `pinterest-pin-001.jpg` … `162.jpg` (CDN `https://cdn.shopify.com/s/files/1/0917/5138/3415/files/`, toate verificate 200) → `build-csv.mjs` → `pinuri-articole/pinterest-articole.csv`.
  - CSV încărcat în Pinterest (Setări → Importă conținut → Creează Pinuri în masă) la 24.11: „Încărcare reușită”, procesare ~2 ore; erorile vin pe e-mail la contact@.
  - **Program:** 6 pinuri/zi la 08, 11, 14, 17, 19, 21 (ora României), **25.11 → 21.12.2026**; panourile alternează, prioritatea: cremă de orez → proteine → creatină → rețete → suplimente → vitamine → antrenament (articolele cele mai noi întâi).

## Pinuri de produs (24.11, la cererea lui Marius „fă acum”)
- **81 de pinuri de produs**: toate produsele active, publicate și în stoc, **fără haine** (tricouri, maiouri, hanorace, pantaloni, MNX, seturile Hammer). Imagine 1000×1500: packshotul întreg pe alb, logo, tipul produsului cu roșu, numele pe negru, bara roșie „Vezi produsul → primesupplements.ro”. Link direct spre produs cu `utm_campaign=pin-produse`; descrierea e descrierea SEO a produsului + „Comandă pe primesupplements.ro, livrare în toată România.” (verificată: fără promisiuni de slăbire sau vindecare).
- Scripturi: `build-produse.mjs` (export GraphQL produse → `pinuri-produse/lista.json`, prioritate: cremă de orez → Prime Whey / Pure Isolate / pachete starter → creatină → restul) → `make-pins-produse.ps1` (pozele și pinurile în `D:\Proiecte Claude\Prime Supplements\_pinterest\`) → Shopify Files `pinterest-produs-001…081.jpg` (toate 200) → `build-csv-produse.mjs` → `pinuri-produse/pinterest-produse.csv`.
- Încărcat 24.11 („Încărcare reușită”), panoul **„Produse Prime Supplements”**, **3 pe zi la 10:00, 16:00 și 20:30**, **25.11 → 21.12** (orele nu se suprapun cu pinurile de articole). Total pe zi: 9 pinuri (6 articole + 3 produse) + postările de pe Instagram.

## Pinuri pentru haine (24.11, la cererea lui Marius „fă și pentru haine”)
- **84 de pinuri**: toate hainele active și în stoc (tricouri, maiouri, hanorace, pantaloni de trening, pantaloni scurți, seturile Hammer; Prime + MNX). Poza (pe model) umple partea de sus (crop spre partea de sus), dedesubt tipul cu roșu și numele pe negru, bara „Vezi produsul”. Link cu `utm_campaign=pin-haine`.
- Panou nou **„Haine de sală Prime”** (al 9-lea panou), **3 pe zi la 12:30, 18:00 și 22:00**, **25.11 → 22.12**. Ordinea alternează: haine Prime, hanorace, tricouri/maiouri, restul.
- Scripturi: `build-produse.mjs --haine` → `pinuri-haine/lista.json`; `make-pins-produse.ps1 -Lista pinuri-haine -Cover`; Shopify Files `pinterest-haine-001…084.jpg` (toate 200); `build-csv-produse.mjs --haine` → `pinuri-haine/pinterest-haine.csv`. Încărcat 24.11 („Încărcare reușită”).
- **Total pe zi acum: 12 pinuri** (6 articole + 3 produse + 3 haine) + postările de pe Instagram.

## ⚠️ Limita de 100 de pinuri programate (descoperită 24.11 seara)
- Pinterest ține **cel mult 100 de pinuri programate odată**. Din cele 327 trimise au intrat doar **primele 100 de articole** (25.11 → 11.12, 6/zi); restul (~60 de articole, toate produsele și toate hainele) au fost refuzate fără să fie publicate (profilul avea 0 pinuri). Secțiunile de mai sus despre produse și haine descriu deci ce s-a trimis, nu ce e programat.
- 24.11, la cererea lui Marius („postează acum măcar 10”): **10 pinuri publicate imediat** din cele refuzate (4 articole pe panouri diferite; 3 produse: cremă de orez, Pure Isolate, Creapure; 3 haine: hanorac Prime Squad, hanorac MNX Edge, maiou MNX), fișier `pinterest-acum-10.csv` (CSV fără „Publish date” = publicare imediată). Verificat pe profil: 10 pinuri.
- În `lista.json` (articole/produse/haine): `programat_pinterest: true` = deja în programarea Pinterest; `postat_acum` = publicat imediat. Restul = **coada** (217 pinuri: 60 de articole, 78 de produse, 79 de haine – după corecția la exact 100 de articole programate), de urcat pe măsură ce se eliberează locuri în programare, amestecând articole, produse și haine.
- **Automat (Marius, 24.11: „Săptămânal, automat”):** sarcina programată **`pinterest-coada-saptamanala`** (aplicația Claude de pe PC, Scheduled; **lunea la ~9:13**, prima rulare pe 30.11; rulează doar cu aplicația deschisă, altfel la următoarea pornire). Citește câte pinuri sunt programate (N), apoi `node build-csv-coada.mjs --free <100−N−2>` → `coada/pinterest-coada.csv` (produs, haină, articol pe rând, pe locurile libere dintr-o grilă de 12 ore pe zi, fără să se suprapună cu cele programate) → încarcă CSV-ul în Pinterest → doar după „Încărcare reușită” rulează `node build-csv-coada.mjs --confirm` (marchează în lista.json) → JURNAL, commit + push. Salvată în modul Bypass permissions (ca sesiunea).

## Aplicația Pinterest pentru Shopify (24.11, cu „da” de la Marius)
- Instalată (`apps/pinterest-4`); Marius a autorizat contul în fereastra Pinterest; în Pinterest → Link către Pinterest apare asociat magazinul `primesupplements1.myshopify.com`.
- **Configurarea nu se poate termina:** „Advertising is not available for your account – Your Pinterest account is in a country where Pinterest does not yet offer ads”. Aplicația cere cont de reclame pentru catalog și marcaj → **în România nu sincronizează produsele și nu revendică site-ul.** Aplicația a rămas instalată (de decis de Marius: o dezinstalăm, nu folosește la nimic acum).

## Revendicarea site-ului prin marcaj (24.11)
- DNS-ul domeniului e la kemo.services (fără acces) → marcajul în temă.
- Pus în copia nepublicată **„Prime – schema articole + FAQ (24.11)” (`194436792695`)**, în `snippets/social-meta-tags.liquid`, după `og:locale` (snippetul era identic cu tema live, MD5 eae31d78…): `<meta name="p:domain_verify" content="0301458a3b7e71f2cc1c64959e6f2106"/>`. Verificat în previzualizare.
- **Intră pe site când Marius publică această copie** (oricum așteaptă publicarea pentru schema articole + FAQ). Apoi: Pinterest → Setări → Link către Pinterest → Site-uri → Revendică → „Adaugă un marcaj HTML” → primesupplements.ro.

## Revendicare + RSS (24.11, după publicarea copiei de temă)
- Marius a publicat copia „Prime – schema articole + FAQ (24.11)” din altă sesiune, deci marcajul `p:domain_verify` e live. **Site-ul primesupplements.ro e revendicat** (Pinterest: „Conectat – Ești gata!”, `domain_verified: true`). Marcajul Pinterest pentru conversii, propus după revendicare, NU a fost instalat: pe site există deja pixel Pinterest, iar un al doilea ar dubla urmărirea.
- **RSS nu merge:** `https://primesupplements.ro/blogs/news.atom` → „Fluxul RSS are un format necunoscut” (Shopify dă doar Atom; Pinterest vrea RSS 2.0).

## Ce rămâne
1. ~~Revendicarea site-ului~~ făcută pe 24.11.
2. **Articolele noi** intră prin CSV (de exemplu lunar): export nou al articolelor → `build-lista.mjs` → `make-pins.ps1 -Only <handle>` → urcare în Files → CSV doar cu ele.
3. ~~Instagram → Pinterest~~ **legat pe 24.11** (Marius s-a logat și a aprobat): „Conectat la @primesupplements_ro”, publicare automată pornită, pe panoul **„Produse Prime Supplements”**. Panoul gol „Social”, creat automat de Pinterest la conectare, a fost șters pe 24.11 cu acordul lui Marius (avea 0 pinuri); au rămas cele 8 panouri.
4. Aplicația Pinterest din Shopify: instalată, dar fără folos în RO. **Marius (24.11): rămâne instalată deocamdată.**
5. Peste 2–3 săptămâni: statisticile Pinterest (afișări, clicuri) + GA4 pe `utm_source=pinterest`.
