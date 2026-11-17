# Audit de viteză primesupplements.ro (17.11.2026)

**Doar citire.** Nu s-a schimbat nimic pe site, în temă sau în Shopify. Continuă `PAGESPEED-2026-10-13.md` (remedierile din octombrie) și `analiza-genius-vs-prime/RAPORT.md` §3.4 (comparația din 16.11).

Surse:
1. **Utilizatori reali:** raportul Core Web Vitals din Search Console (date CrUX, actualizat 9.11).
2. **Laborator:** Lighthouse 13.6, rulat local pe 10 pagini × mobil și desktop × 3 rulări, cu mediana. Rezultatele sunt în `rezultate.json` și `mediane.csv`, iar rapoartele complete ale primei rulări în `lighthouse/*.json.gz` (se deschid în Lighthouse Viewer). Scriptul: `analiza-genius-vs-prime/scripts/viteza-prime.mjs`.

API-ul PageSpeed avea cota zilnică epuizată, iar pagespeed.web.dev nu a terminat analiza în browserul aplicației.

## 1. Verdict

- **Pentru Google, site-ul trece testul.** În Search Console toate cele **257 de URL-uri sunt „bune”** (0 slabe, 0 de îmbunătățit), atât pe mobil, cât și pe desktop. „No issues detected in the last 90 days”. Grupurile: homepage (134 de URL-uri), produse (95), colecții (19), pagini (9).
- **Desktop:** 92–100 la toate paginile.
- **Mobil (laborator, 4G lent simulat):** 71–88. Scorul e ținut jos de greutatea paginii (2,2–3,4 MB, 250–320 de cereri) și de JavaScript, nu de server: TTFB-ul median este 30–130 ms.
- **PERFORMANCE-02** (`pandectes-rules.js` înaintea `<meta charset>`) **nu mai este o problemă.** Scriptul vine acum după `<meta charset>`, iar codarea este trimisă și în antetul HTTP (`Content-Type: text/html; charset=utf-8`). Cei ~21 KB dinaintea charset-ului sunt scriptul Shopify `exit_interstitial`, pe care nu îl controlăm.

## 2. Medianele (3 rulări)

| Pagina | Mobil | LCP mobil | TBT mobil | Desktop | CLS desktop |
|---|---|---|---|---|---|
| Homepage | 74 | 3,4 s | 626 ms | 99 | 0,020 |
| Colecție proteine | 76 | 5,1 s | 234 ms | 96 | 0,002 |
| Colecție pre-workout | 75 | 6,1 s | 153 ms | 96 | 0,036 |
| Produs whey | 80 | 3,6 s | 378 ms | 92 | **0,170** |
| Produs creatină | 73 | 2,9 s | 424 ms | 99 | 0,011 |
| Produs Nitrox | 75 | 2,9 s | 380 ms | 100 | 0,007 |
| Articol | 83 | 2,9 s | 276 ms | 99 | 0,044 |
| Blog | 88 | 3,6 s | 237 ms | 99 | 0,021 |
| Căutare | 73 | 6,0 s | 232 ms | 95 | 0,005 |
| Coș (gol) | 71 | **11,7 s** | 213 ms | 100 | 0,022 |

Față de 16.11 (comparația cu Genius), diferențele sunt de ordinul zgomotului dintre rulări: homepage 68 → 74, whey 78 → 80, creatină 88 → 73, articol 86 → 83.

## 3. Ce încetinește, în ordinea impactului

### 3.1 Google tag încărcat de două ori: pixelul vechi „SIMPROSYS” (E2, deschis din 16.10)
- Pe fiecare pagină, `gtag/js?id=G-DX0F0N485Q` (194 KB) și `gtag/js?id=AW-16853658606` (166 KB) se descarcă **de două ori**: o dată prin pixelul aplicației Simprosys (id 2240348535, cu GA4 și Google Ads pornite) și o dată prin pixelul personalizat vechi „SIMPROSYS” (id 228721015, `LAX`, cu scopul doar „vânzare de date”). Rezultă **~360 KB în plus** pe fiecare pagină.
- Riscuri: conversii GA4 și Google Ads posibil numărate de două ori. Pixelul vechi pornește și fără acord (în România „vânzarea de date” nu cere consimțământ în Shopify).
- **Soluția există deja:** textul pentru extensie de la E2 în `SETARI-VANZARI-2026-10-16.md` (deconectare, nu ștergere, cu codul salvat ca rezervă). Cere câteva minute, din Shopify → Setări → Evenimente clienți.

### 3.2 JavaScript pe mobil (TBT 150–630 ms)
- Cel mai mult timp de procesor îl iau documentul însuși (2,5–3,4 s: scripturile inline ale temei și ale aplicațiilor, plus parsarea unui DOM mare), Judge.me `loader.js` (0,4–1,1 s), Shopify perf-kit și pixelii (`/cdn/wpm`, 0,3 s), `theme.js` (0,25–0,35 s), chatul Shopify Inbox (`agent-runtime`, 0,1–0,2 s) și Pandectes core (0,1 s).
- **DOM mare:** 6.000 de elemente pe homepage și ~4.900 pe produse (recomandat sub 1.500). Vine din meniu (mobil și desktop), secțiunile homepage-ului și caruselul Judge.me. Pentru a-l reduce trebuie schimbată structura paginii, deci designul, care rămâne la decizia ta.

### 3.3 Greutatea paginii (2,2–3,4 MB pe mobil)
- Scripturi ~1,2 MB (102 fișiere), imagini 0,3–1,0 MB (pe homepage 48 de imagini).
- Shopify preîncarcă ~370 KB de cod de checkout (`checkout-web/...js`) cu prioritate mică. Vine de la Shopify, nu din temă.
- Facebook `fbevents.js` (97 KB) se încarcă și fără acord. Nu trimite evenimente până la acord (verificat 16.11).
- Imaginile sunt în regulă: au `fetchpriority=high` pe LCP și sunt descoperite din HTML. Economiile posibile sunt mici: 30–40 KB pe bannerul colecției și pe poza de ședință de pe whey.

### 3.4 CLS 0,17 pe pagina whey, desktop (laborator)
- Selectorul de arome (`variant_picker`) se mută când se încarcă fontul **Poppins 400** (`poppins-400-latin.woff2` și `-latin-ext`). Fontul de rezervă are alte dimensiuni.
- Utilizatorii reali nu au problema (CLS bun în Search Console), dar e singurul CLS peste 0,1.
- Soluție posibilă, fără schimbare de aspect: `preload` pentru `poppins-400-latin.woff2` sau un font de rezervă cu `size-adjust` potrivit pe Poppins. Se face pe o copie a temei, iar tu o publici.

### 3.5 Coșul gol pe mobil: LCP 11,7 s (laborator)
- Pe coșul gol, cel mai mare element vizibil este **textul bannerului Pandectes**, care apare târziu (după scripturile de consimțământ). Nu e o problemă reală: un client care ajunge în coș a acceptat sau a refuzat deja cookie-urile și are produse în coș. Nu cere nicio acțiune.

### 3.6 Colecțiile și căutarea: LCP 5–6 s (laborator)
- Imaginea LCP (bannerul colecției) se încarcă repede. Întârzierea vine din lanțul simulat de rețea, ocupată de cele ~300 de cereri. Primul pas care ajută aici e 3.1. După aceea, Judge.me și chatul.

## 4. Recomandări

| # | Ce | Cine | Efort | Efect |
|---|---|---|---|---|
| 1 | **E2: deconectezi pixelul personalizat vechi „SIMPROSYS”** (textul pentru extensie e în SETARI-VANZARI E2) | tu, prin extensie | minute | −360 KB pe pagină, conversii corecte, nimic înainte de acord |
| 2 | Font Poppins 400: `preload` sau rezervă cu `size-adjust` (CLS whey) | eu, pe copie de temă | mic | CLS desktop sub 0,1 |
| 3 | Judge.me: widgetul de recenzii încărcat doar la scroll (dacă aplicația permite) sau înlocuirea lui (deja amânată după 20–25.12, vezi `APLICATII-DE-CLONAT`) | decizia ta | mediu | −0,4–1 s de procesor pe mobil |
| 4 | DOM-ul homepage-ului (6.000 de elemente) | decizia ta (design) | mare | TBT mai mic pe homepage |

Nu e nimic urgent: Google vede site-ul ca rapid. Punctul 1 e cel care merită făcut acum, pentru date corecte în reclame.
