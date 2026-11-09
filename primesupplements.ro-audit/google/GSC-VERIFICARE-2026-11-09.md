# Search Console – verificarea programată din 09.11.2026 (doar citire)

Compară cu raportul complet din 26.10 (`SEARCH-CONSOLE-RAPORT-COMPLET-2026-10-26.md`, §10–11) și închide verificările promise în `DE-FACUT.md` punctele 14–15. Nimic nu a fost modificat în GSC, GA4, Ads, Shopify sau pe site.

**Cum s-a citit:** sesiunea Google din browserul încorporat al aplicației a expirat (Search Console cerea din nou parola, care nu se introduce de către Claude). Raportul a fost citit din Chrome-ul lui Marius (Claude in Chrome), unde al doilea cont Google (`authuser=1`) are acces la proprietate; GA4 și Google Ads la fel. Rețeta e în memoria `prime-gsc-built-in-browser.md` (actualizată azi). Date GSC: Pages actualizat 06.11, Shopping 08.11.

## 1. Tabelul „26.10 vs 09.11”

| Indicator | 26.10 | 09.11 | Evoluție |
|---|---:|---:|---|
| **Product snippets – validarea „Invalid price format highPrice/lowPrice”** (7 produse) | pornită 26.10 | **Passed** (0 produse) la ambele | ✅ închis |
| Product snippets valide | 82 | **94** | ✅ +12 |
| Product snippets – „Missing aggregateRating / review” | 41 | 49 | ↑ (produse noi fără recenzii; se rezolvă doar prin recenzii reale) |
| Merchant listings valide | 75 | **94** | ✅ +19 |
| Merchant listings – „Missing validFrom” (informativ) | 75 | 94 | – |
| **Cele 7 pagini cerute la indexare pe 26.10** | 4 neindexate | **7 din 7 „URL is on Google”** (URL Inspection) | ✅ închis |
| Pagini indexate | 821 | **609** | ↓ 212 – vezi §2 (scăderea e curățenie, nu pierdere) |
| … din care b2b.primesupplements.ro | ~110 | **7** (3 produse, 3 colecții, 1 pagină) | ✅ aproape dispărut |
| … din care account.primesupplements.ro/orders | 0 | 11 (blocate de robots, dar indexate) | nou, inofensiv |
| Neindexate (total) | 1.704 | 2.730 | ↑ vezi §2 (887 URL-uri de sistem blocate de robots.txt) |
| „Not found (404)” | 73 | **86** | ↑ 13 – 31 din cele vechi sunt deja 301 (așteaptă re-crawl); **noi: 12 pachete Reduceri puse în Draft + 1 tricou șters** (§3) |
| „Duplicate, Google chose different canonical” (/ro-hu/) | 417 | **312** (toate /ro-hu/: 211 articole, 87 produse, 10 colecții, 3 pagini) | ✅ −105 |
| „Discovered – currently not indexed” | 4 | **8** (toate pachete Black Friday noi, încă necrawlate) | normal |
| „Crawled – currently not indexed” | 201 | 314 | ↑ – 106 URL-uri `/cdn?…`, 106 b2b, 37 www WooCommerce, 23 /ro-hu/, 13 old; pagini reale doar 2 produse MNX + 1 articol (§2) |
| „Page with redirect” | 565 | 809 | ↑ – efectul celor 31 de redirecturi + ro-hu + www; corect |
| „Blocked by robots.txt” | – (nu era în top) | 887 | nou în listă: 489 `/services/login_with_shop`, 375 `account.*/orders`, 13 `/cart` – URL-uri de sistem Shopify, **nimic de făcut** |
| **Performance (web, 28 zile, 12.10–08.11)** | 699 clicuri / 37,1 K afișări / 13 zile (≈54 clicuri/zi) | **2.070 clicuri / 95,1 K afișări / CTR 2,2 % / poziția 7,9** (≈74 clicuri/zi) | ✅ +37 % clicuri/zi; CTR 1,9 → 2,2 %; poziția 7,8 → 7,9 |
| Search appearance – Product snippets (28 zile) | – | 567 clicuri / 25.852 afișări / CTR 2,2 % / poz. 10,0 | – |
| Search appearance – Merchant listings (28 zile) | 12 afișări / 1 clic în 13 zile | **20 afișări / 5 clicuri** / CTR 25 % / poz. 2,2 | ~la fel (ținta de 500+ e departe) |
| Search appearance – Review snippet | – | 5 clicuri / 269 afișări | – |
| Settings → Associations | GA4 + Merchant Center (seara: + Ads) | **Google Ads 819-012-5727, Google Analytics GA4 „Primesupplements - GA4”, Merchant Center „Prime Supplements”** – toate 3, fără cereri în așteptare | ✅ |
| GA4 → Reports → Search Console | legat 26.10, date în 24–48 h | **are date**: colecția „Search Console” (Queries + Google organic search traffic), 28 zile: 2.073 clicuri, 124.597 afișări, 795 pagini de intrare, 1.275 utilizatori activi, rata de implicare 74 % | ✅ |
| Google Ads – utilizatori | contact@, adelina.chera, adelina.fagaras (Admin) | aceiași 3 (tase70 nu există) | ✅ neschimbat |
| Settings → robots.txt | – | „2 files have critical errors” = `https://` și `http://b2b.primesupplements.ro/robots.txt` **Not fetched** (magazinul B2B în închidere) | așteptat; dispare după ștergerea CNAME-ului b2b |

## 2. Ce înseamnă scăderea de la 821 la 609 pagini indexate
Primele 500 citite din lista „Indexed” (609): 291 articole, 202 produse, 48 articole cu parametri, 19 colecții, 11 pagini, 11 `account.*/orders`, 9 colecții cu parametri, 7 b2b, 6 /ro-hu/, 2 policies. Au ieșit din index ~100 URL-uri B2B (26.10: ~110 → azi 7) și URL-uri /ro-hu/ – exact ce voiam. Conținutul real (articole + produse + colecții) e ~560 de pagini, stabil.

„Crawled – currently not indexed” (314): pagini reale doar `/products/mnx-golden-era-cotton-shorts-rosewood`, `/products/mnx-shorts-golden-era-2-0-red` (cele 2 haine MNX fără text – A5 din raport, pasul 9 din plan) și articolul `/blogs/news/cluster-insulin-bomb-zilele-cardio-forta`; restul sunt feed-uri `.atom`, colecții cu parametri de sortare, `/cdn?…`, b2b, www vechi, old.

## 3. Problema nouă: pachetele Reduceri dau 404 (12 URL-uri) + 1 tricou
GSC „Not found (404)”, ultimul crawl 6–7.11: `/products/pachet-mic-dejun-proteic-…`, `pachet-starter-incepator-…`, `pachet-set-hammer-3-0-…`, `pachet-set-antrenament-hammer-…`, `pachet-daily-fit-…`, `pachet-trio-crema-de-orez-3-arome`, `pachet-recuperare-eaa-glutamina-kyowa`, `pachet-rutina-zilnica-…`, `pachet-mix-9-batoane-proteice`, `pachet-starter-forta-…`, `pachet-pre-workout-power-nitrox-3d-creatina-creapure` și `tricou-sala-made-of-iron-bumbac-premium-negru`.

Verificat în Shopify (doar citire, 09.11): toate cele 12 pachete cu tag `reduceri` (create 18 și 22.10) sunt **Draft** (modificate 5–9.11), iar cele 11 pachete cu tag `pachet-black-friday` (30.10–15.11) sunt Active – deci pachetele Reduceri au fost scoase de pe site pe durata Black Friday (nu e notat în repo). Colecția `/collections/reduceri` e goală (products.json → 0). Tricoul „Made of Iron” nu mai există deloc în catalog (nici arhivat).

Efect SEO: pachetele Reduceri aveau titluri/meta/FAQ optimizate pe 18.10, iar colecția Reduceri avea 255 afișări la poziția 1,4 (raport 26.10). Dacă rămân Draft după 15.11, Google le scoate din index în câteva săptămâni.

**Decizie pentru Marius (după 15.11):**
- (a) pachetele Reduceri revin Active → 404-urile dispar singure la re-crawl; nimic de făcut; sau
- (b) rămân Draft/se șterg → 12 redirecturi 301 către pachetul Black Friday echivalent sau către `/collections/reduceri` (ca la A1–A3 din 26.10), plus 1 pentru tricoul Made of Iron → `/collections/haine-mnx`.

Nu s-a schimbat nimic: statusurile produselor nu se ating fără cererea proprietarului (regula din CLAUDE.md).

## 4. Ce s-a îmbunătățit, ce nu, ce urmează
**S-a îmbunătățit:** validările de preț Passed; +12 Product snippets și +19 Merchant listings valide; cele 7 pagini indexate; B2B aproape scos din index (110 → 7); duplicatele /ro-hu/ −25 %; clicurile +37 %/zi, CTR 2,2 %; toate 3 asocierile GSC în loc; GA4 primește datele Search Console.

**Nu s-a îmbunătățit / de urmărit:** Merchant listings tot ~20 afișări pe lună (ținta 500+ cere acțiunile din Merchant Center – pașii 18–19 din plan); „Missing aggregateRating” crește cu fiecare produs nou fără recenzii (strategia 4, recenzii Judge.me, încă în așteptare); 404 a crescut la 86 din cauza pachetelor puse în Draft; poziția medie 7,9 (ținta ≤ 6,5 depinde de pașii de după 1.12).

**Ce urmează (verificarea GSC 23.11):** 404 sub 50 (după re-crawl-ul celor 31 de redirecturi și decizia de la §3); /ro-hu/ sub 250; b2b → 0 după ștergerea CNAME-ului (magazinul se dezactivează 14.11; verificare 15.11); robots.txt b2b dispare din erori; Merchant listings; Performance 28 zile; crawl stats; linkuri. Memoria pentru citire: dacă browserul aplicației cere din nou parola, se citește din Chrome cu `authuser=1`.

Rămân la proprietar din 26.10: A7 (înregistrarea DNS `old.primesupplements.ro` încă răspunde 200 și e crawlată: 13 URL-uri `tag-produs` în „Crawled – not indexed”), G2 (mesajele GSC: azi 1 necitit), 2-Step Verification la adelina.fagaras@gmail.com în Ads.
