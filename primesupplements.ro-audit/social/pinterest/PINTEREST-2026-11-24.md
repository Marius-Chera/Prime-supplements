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

## Ce rămâne
1. **Revendicarea site-ului** (deblochează RSS automat din blog, statistici pe domeniu, numele brandului pe pinurile de pe site). Două variante:
   - **aplicația gratuită „Pinterest” pentru Shopify** (o propune și Pinterest la onboarding): revendică singură site-ul, aduce toate produsele ca pinuri de produs (catalog) și pune eticheta Pinterest – trebuie „da” de la Marius (aplicație nouă cu permisiuni pe magazin);
   - sau marcajul în `<head>` al temei live: `<meta name="p:domain_verify" content="0301458a3b7e71f2cc1c64959e6f2106"/>` (tema live nu se poate scrie prin API; doar din editorul de cod).
2. După revendicare: Setări → Creează Pinuri în masă → **RSS** `https://primesupplements.ro/blogs/news.atom` pe panoul „Nutriție sportivă și suplimente” → fiecare articol nou devine pin automat.
3. **Instagram → Pinterest** (Setări → Link către Pinterest → Instagram): postările IG se publică automat ca pinuri; cere login Instagram (Marius).
4. Articole noi până la revendicare: rulezi din nou `build-lista.mjs` + `make-pins.ps1 -Only <handle>` și un CSV doar cu ele.
5. Peste 2–3 săptămâni: statisticile Pinterest (afișări, clicuri) + GA4 pe `utm_source=pinterest`.
