# Google Search Console – raport complet (26 octombrie 2026)

**Proprietate:** `sc-domain:primesupplements.ro` (acoperă și `www.`, `b2b.`, `old.`, `account.`). Cont: contact@primesupplements.ro. Proprietatea există din **12.10.2026**, deci datele de performanță acoperă doar **11–23 octombrie (13 zile)**. Citit din browserul aplicației Claude pe 26.10.2026, ora 02:00–03:00; nimic modificat în Search Console, Shopify sau pe site.

**Ce mai există în repo (nu se reia aici):** `seo/AUDIT-CAUTARI-2026-10-23.md` §3 (prima citire GSC, 11 zile), `seo/AUDIT-SEO-COMPLET-2026-10-25.md` (auditul complet al site-ului, top 10 priorități), `seo/PLAN-DUPA-BLACK-FRIDAY-2026.md` (20 de pași, start 1.12.2026; decizia proprietarului: nimic nu se fixează înainte), `PAGESPEED-2026-10-13.md` (remedierea PSI pe temă), `ACTION-PLAN.md` (lista rapoartelor GSC de urmărit). Acest raport este **prima trecere completă prin toate rapoartele GSC** și completează planul de după Black Friday cu ce arată Google efectiv.

**Cum se folosește:** secțiunea 10 este „scriptul” de executat: fiecare acțiune are dovada din GSC, unde se face, cum se verifică și dacă poate fi făcută acum sau intră în planul din decembrie. Secțiunile 1–9 sunt datele brute, ca să poată fi citite și de altă sesiune/AI fără acces la GSC.

---

## 1. Rezumat executiv (ce arată Google despre site)

1. **Sănătatea tehnică e bună:** 0 acțiuni manuale, 0 probleme de securitate, HTTPS 214/214, Core Web Vitals 199 URL-uri „bune” / 0 slabe pe mobil și desktop, sitemap citit cu succes, robots.txt valid.
2. **Indexul e poluat:** 821 pagini indexate, dar ~14 % sunt magazinul **B2B** (în primele 500 de URL-uri indexate: 43 produse + 13 colecții + 10 pagini + home/cart/policies b2b) și câteva `/ro-hu/` și `account.primesupplements.ro/orders`. Sitemap-ul principal are doar **390 de URL-uri** (210 produse, 151 articole, 18 colecții, 9 pagini, 1 blog, 1 agentic).
3. **1.704 pagini neindexate**, din care **aproape toate sunt intenționate sau moștenite**: 565 „Page with redirect” (ro-hu, www vechi, bloguri consolidate), 417 duplicate `/ro-hu/` (toate; vor dispărea pentru că redirectul e acum activ), 194 alternative cu canonical corect, 124 blocate de robots (login/checkout), 59 duplicate www cu parametri WooCommerce.
4. **Probleme reale de indexare, puține dar concrete:** 21 de articole de blog care răspund **404** (handle-uri cu sufix `-2026` fără redirect), 6 URL-uri de produs **trunchiate** linkate de undeva (`/products/prime-whey-`, `/products/creatine-ready` etc.), 2 produse MNX dispărute fără redirect, 4 pagini noi „Discovered – not indexed” (3 articole + 1 produs).
5. **Trafic:** 699 clicuri, 37.100 afișări, CTR 1,9 %, poziție medie 7,8. **87 % din clicuri de pe telefon.** Doar **234 de clicuri** vin prin „Product snippets”, **1 clic** prin „Merchant listings” (deși Merchant Center are 428 de produse aprobate), **13 clicuri** din Google Images.
6. **Marca domină:** ~140 de clicuri pe variante „prime supplements/prime whey/prime nutrition”; cea mai bună căutare generică rămâne **„crema de orez”** (66 clicuri, poziția 1,6). Termenii comerciali mari sunt pe pagina 2–5: „pudra proteica” 22,5, „creatina creapure” 17,1, „eaa aminoacizi” 19,6, „whey protein isolate” 9,8, „suplimente sala” 51, „omega 3” 57, „colagen hidrolizat” 35, „silimarina” 34.
7. **Pagini cu afișări mari și CTR aproape zero (titlu/descriere/snippet de reparat):** `/products/daily-vitamin-formula` 1.470 afișări, 2 clicuri (0,1 %), poziția 6,7 pe căutarea în engleză „vitamins”; `/collections/pudra-proteica` 1.775 afișări, 0,8 %; `/collections/suplimente-pre-workout` 1.120 afișări, 0,4 %; `/blogs/news/ceai-diuretic-...` 1.859 afișări, 0,8 %; `/blogs/news/cum-se-ia-creatina` 1.005 afișări, 0,8 %; `/collections/vitamine-si-minerale` 392 afișări, **0 clicuri la poziția 1,4**.
8. **Date structurate:** produsele sunt valide (82 Product snippets, 75 Merchant listings, 109 Breadcrumbs, 41 Review snippets, 1 Profile page), dar cu avertismente: 41 produse fără `aggregateRating`/`review` (nu au recenzii), 7 produse cu „Invalid price format” la `highPrice`/`lowPrice` (nu mai există în HTML-ul actual – probabil date vechi), 75 oferte fără `validFrom`. **Merchant Center nu e asociat cu Search Console** (GSC oferă butonul „Associate account” pentru contul 5540809866).
9. **Linkuri externe aproape inexistente:** 53 de linkuri de pe 5 site-uri (mataroa.blog 25, cylex.ro 8, youtube.com 5, creapure.com 4, deschis.ro 2). Linkurile interne cele mai numeroase merg spre politici și login (footer), nu spre produse.
10. **Crawl:** 8.050 de cereri în 90 de zile, 330 ms răspuns mediu; 13 % din cereri sunt redirecturi, 4 % 404; **b2b.primesupplements.ro primește 613 cereri (8 %)**, `old.primesupplements.ro` 54 (DNS mort acum, dar încă linkat de undeva). **AdsBot 16 %** din crawl.
11. **Generative AI (AI Overviews / AI Mode):** 5.580 afișări în 13 zile pe 313 pagini (pudra-proteica 323, articole D3+K2 315, cum-se-ia-creatina 273, scorțișoară 264, homepage 238). Site-ul este citat, dar pe subiecte informaționale, nu comerciale.
12. **PageSpeed Insights (26.10, Lighthouse 13.5):** mobil 76 homepage / 72 colecție / 82 produs / 68 articol; desktop 98 / 89 / 99 / 95; Accesibilitate 100, SEO 100, Bune practici 96 peste tot. Datele reale (CrUX) pe homepage: LCP 1,4 s, INP 128 ms, CLS 0 – **trecut**. Problema de laborator rămasă: LCP 8,3 s pe colecție și articol (imaginea principală), JavaScript terț.

---

## 2. Indexare – „Pages” (ultima actualizare 19.10.2026)

| Stare | Pagini |
|---|---:|
| Indexate | **821** |
| Neindexate | **1.704** (11 motive) |
| „Indexate, dar blocate de robots.txt” (de îmbunătățit) | 6 |
| Videoclipuri indexate | 0 din 7 |

### 2.1 Ce conține indexul (primele 500 din 821, în ordinea ultimei accesări)
| Gazdă / tip | URL-uri | Observație |
|---|---:|---|
| primesupplements.ro /blogs/news/ | 193 (+34 cu parametri `?page=`/tag) | blogul e cel mai mare bloc |
| primesupplements.ro /products/ | 156 | |
| primesupplements.ro /collections/ | 21 (+4 cu `?page=`) | |
| primesupplements.ro /pages/ + policies + home | 12 | |
| **b2b.primesupplements.ro** | **69** (43 produse, 13 colecții, 10 pagini, home, cart, policies) | extrapolat la 821: ~110 URL-uri B2B în index |
| account.primesupplements.ro/orders?… | 6 | pagini de cont ale clienților (blocate de robots, dar indexate fără conținut) |
| /ro-hu/ | 4 | rămășițe |
| /account/login | 1 | |

### 2.2 Motivele de neindexare, cu toate exemplele citite

**Page with redirect – 565** (sursă: site; prima detectare 13.10). Din 500 de rânduri citite:
- `/ro-hu/…` 147 (produse, articole, colecții, pagini) – redirectul 301 către varianta fără `/ro-hu/` este **activ** (verificat live 26.10: `/ro-hu/products/creatina-creapure` → 301). Corect, se curăță singur.
- `www.primesupplements.ro/produs/…`, `/categorie-produs/…`, `/shop/`, `?add-to-cart=`, `?attribute_pa_aroma=` 225 – URL-uri WooCommerce vechi; www → 301 către apex **cu parametrii păstrați** (ex. `/collections/creatina?category-view-mode=list&orderby=price`). Corect.
- Articole de blog 44 – consolidarea blogului (355 → 151) a creat 301-uri (ex. `taurina-beneficii-recovery-bcaa-500g-how-long` → `/blogs/news/aminoacizi-rezultate-in-cat-timp`). Corect.
- Colecții redenumite 9: `aminoacizi-suplimente`, `accesorii`, `shoturi`, `suplimente`, `pre-workout`, `arzatoare-de-grasimi`, `intra-workout`, `pudre-proteice`, `imbracaminte`. Corect.
- Parametri de sortare WooCommerce pe colecții Shopify 73 (`?orderby=`, `?category-view-mode=`, `?product_col_large=`, `?v=1eb2628f4187`) – vin din linkuri vechi; Shopify le redirecționează. Corect.
- `http://` 2. Corect.

**Alternate page with proper canonical tag – 194** (toate rândurile):
- 125 URL-uri cu parametri: `orderby` 90, `category-view-mode` 65, `product_col_large` 55, `add-to-cart` 43, `v=` 20, `attribute_pa_aroma` 5, căutare internă `_pos/_psq/_ss` 2, afiliere `sca_ref` 2, `gclid/gad_*` 1, `variant=` 1.
- **40 URL-uri b2b.primesupplements.ro** cu `?_pos&_sid&_ss=r` (căutarea internă B2B) – Google le-a canonicalizat; semn că B2B e crawlat intens.
- 27 www vechi cu parametri, `/shop`, `/ro-hu/collections/cele-mai-vandute?page=1`.
- Concluzie: canonicalele funcționează; nimic de reparat, dar arată de unde vine crawl-ul irosit (parametri WooCommerce și B2B).

**Blocked by robots.txt – 124** (toate rândurile): `account.primesupplements.ro/orders?…` 49, `/services/login_with_shop/authorize?…` 48 (embed-ul „Login with Shop” generează linkuri unice), `/cart/add|change|clear|update`, `/checkout(s)`, `/account/*`, `/sf_private_access_tokens`, `/search/suggest` (b2b), www `/cart/?remove_item=`. **Toate intenționate** (robots.txt Shopify). Nimic de făcut.

**Not found (404) – 73** (toate rândurile) – **aici sunt problemele reale:**
- **21 articole de blog care nu mai există**, handle-uri cu sufix `-2026` sau variante greșite: `magneziu-l-treonat-monitorizare-arzatoare-grasimi-2026`, `l-glutamina-beneficii-recuperare-musculara-2026`, `whey-isolate-proteina-ghid-dozare-refacere-musculara-2026`, `zinc-citrat-beneficii-imunitate-stres-2026`, `creatine-kinase-greseala-dozare-creatina-2026`, `instant-oat-cream-800g-25-serv-healthy-eating-on-budget`, `nac-farmacia-tei-greseli-depozitare`, `glutamina-beneficii-si-taurina-rezultate-reale-2026`, `before-and-after-creatine-timing-2026`, `zinc-citrat-hidratare-protocol-imunitate-2026`, `creatina-si-volumizarea-musculara-ghid-rutina-2026`, `nac-600-mg-stivuire-imunitate-ghid-2026`, `ovaz-instant-secrete-nutritie-crema-ovaz-energy` (articolul real e `…-energie`), `branched-chain-amino-acids-eaa-rezultate-maxime-2026`, `l-carnitine-pareri-ghid-metabolism-slabit-2026`, `creatine-side-effects-creatina-monohidrat-masa-musculara-2026`, `creatina-citrulina-intraworkout-performanta-2026`, `creatine-benefits-strategia-hidratare-creatina-2026`, `creatine-side-effects-ghid-ciclare-pauze-2026`, `citicolina-conexiune-musculara-rutina-seara-2026`, `detox-ficat-alternativa-naturala-sportivi-2026`. Nu apar în `applied/blog-consolidation.json`; sunt handle-uri intermediare (din curățarea de pe 15–16.10, înainte de consolidare) sau linkuri interne greșite. **Acțiune:** 21 redirecturi 301 către articolul păstrat pe același subiect + verificare că niciun articol live nu mai linkează spre ele.
- **6 URL-uri de produs trunchiate** (link rupt undeva – probabil în corpuri de articole sau în e-mailuri/social): `/products/creatine-ready`, `/products/ashwagandha`, `/products/combat-pro-`, `/collections/crema-de-`, `/products/prime-whey-`, `/products/zinc-citrate-80`. **Acțiune:** redirecturi către produsul corect + găsirea sursei (GSC → URL Inspection → „Referring page”).
- **Produse dispărute fără redirect:** `/products/mnx-hoodie-edge-melange-grey` (+ varianta ro-hu), `/ro-hu/products/t-shirt-body-tight`. **Acțiune:** redirect către culoarea/produsul supraviețuitor sau colecția `haine-mnx`.
- 36 URL-uri WooCommerce vechi care nu au regulă: `*/feed/` (RSS pe categorii/produse: pudre-proteice, vitamine-si-minerale, batoane-proteice, alimente-sanatoase, creatina, suplimente, produs/vitamin-c, produs/ashwagandha), `/politica-de-cookies/`, `/politica-de-confidentialitate/`, `/despre-noi/`, `/ana-maria-bugan/`, `/wp-content/plugins/…`, `/wp-admin/admin-ajax.php`, `/product-category/…`, `/categorie-produs/suplimente/pudre-proteice/?…` (sub-categoria nested `suplimente/pudre-proteice` nu are regulă; `suplimente/creatina` are). **Acțiune (opțional, ieftin):** 5 reguli: `/categorie-produs/suplimente/pudre-proteice` → `/collections/pudra-proteica`, `/politica-de-cookies` → `/pages/politica-de-cookies`, `/politica-de-confidentialitate` → `/pages/politica-de-confidentialitate`, `/despre-noi` → `/pages/despre-noi`, `/product-category/suplimente` → `/collections/suplimente-sala`. Restul (feed, wp-admin) rămân 404, e normal.
- Gunoi din scripturi (ignorat): `/b`, `/cdn`, `/contact`, `/wpm`, `/${t}`, `/v1/produce`, `/ro-hu/cart`.

**Duplicate without user-selected canonical – 59**: toate `www.primesupplements.ro/categorie-produs/{creatina, pre-workout, imbracaminte, pudre-proteice, arzatoare-de-grasimi, shoturi, batoane-proteice, vitamine-si-minerale}/?category-view-mode…`. Live 26.10 răspund 301, deci vor trece la „Page with redirect”. Nimic de făcut.

**Excluded by ‘noindex’ tag – 52**: pagini de tag ale blogului (`/blogs/news/tagged/*`, inclusiv `?page=`), `/collections/lansate-recent`, `/pages/thank-you`, `customer_authentication`, 30 de pagini de login B2B (`b2b…/customer_authentication/login?return_to=…`), ro-hu `cele-mai-vandute/reduceri/lansate-recent`, și 4 produse: `liver-protect-500-ml` (acum 301 → prime-health, draft), `tricou-sala-built-in-the-city-bumbac-premium-negru` (acum 404), `15-reducere-pachet-thermo-core-water-out-1-14-august` (301 → `pachet-duo-capsule-thermo-core-water-out`), `fiber-creatina-creapure®` (301 → `pachet-fiber-creatina-creapure`). Totul intenționat. **Acțiune mică:** redirect pentru tricoul dispărut.

**Soft 404 – 14**: 13 × `old.primesupplements.ro/cgi-sys/suspendedpage.cgi?…` (pagina „cont suspendat” a vechiului hosting) + 1 `old…/categorie-produs/prime-health/?add-to-cart=…`. `old.primesupplements.ro` nu mai rezolvă DNS (verificat), dar Google încă găsește linkuri spre el (54 de cereri de crawl în 90 de zile). **Acțiune:** dacă subdomeniul mai e în DNS-ul registrarului, să fie șters sau redirecționat către apex; de căutat sursa linkurilor (probabil descrieri vechi YouTube/Facebook).

**Blocked due to other 4xx – 1**: `/.well-known/shopify/monorail/unstable/produce_batch` (endpoint de analytics Shopify). Ignorat.

**Duplicate, Google chose different canonical than user – 417**: **toate 417 sunt `/ro-hu/`** (242 articole + 43 cu parametri, 116 produse, 11 colecții, 4 pagini, 1 account), ultima accesare 12–13.10, adică înainte de redirect. Se vor goli singure în 4–8 săptămâni. Indicator de urmărit: numărul scade.

**Crawled – currently not indexed – 201** (toate rândurile):
- 107 fișiere `/cdn/shop/files/*.avif` (imagini produse MNX, haine) și `/cdn/shop/t/2|t/6/assets/*.js` (theme.js, vendor.min.js, photoswipe) – Google încearcă să indexeze resurse; normal, ignorat.
- 18 `old.primesupplements.ro/tag-produs/…` + 3 `/categorie-produs/…` (vezi Soft 404).
- 27 www vechi cu parametri + 1 `/produs/prime-bodybuilding-classic-pants/?attribute_pa_marime=l`.
- 17 fluxuri `.atom`: `/collections/{alimente-sanatoase, suplimente-intra-workout, all, pudra-proteica, suplimente-pre-workout, haine-mnx}.atom`, `/blogs/news.atom`, `/blogs/news/tagged/{arzatoare-de-grasimi, preworkout}.atom`, b2b 3, ro-hu 5. Normal pentru Shopify; ignorat.
- 9 articole `/ro-hu/blogs/…`, `/ro-hu/collections/cele-mai-vandute?page=3`.
- **b2b**: 4 produse + 5 JS.
- **3 articole reale fără index:** `cand-se-ia-coenzima-q10-dimineata-masa-grasimi`, `faza-de-incarcare-creatina-formula-eticheta`, `izolat-proteic-intoleranta-lactoza-trebuie-sa-stii` – de verificat conținut/duplicat intern și de cerut indexarea.
- **2 produse reale fără index:** `mnx-golden-era-cotton-shorts-rosewood`, `mnx-shorts-golden-era-2-0-red` (haine cu conținut subțire).
- `/llms.txt`, `/llms-full.txt`, `/agents.md` (fișiere pentru agenți AI; normal să nu fie indexate), `/collections/lansate-recent?page=2`.

**Discovered – currently not indexed – 4**: `/blogs/news/ce-este-un-pre-workout-fara-cofeina`, `/blogs/news/cum-alegi-creatina`, `/blogs/news/cum-te-ajuta-combat-pro-sa-ti-cresti-masa-musculara`, `/products/tricou-gym-supradimensionat-lejer-roz-pastel-prime`. **Acțiune:** URL Inspection → Request indexing pentru toate 4 (și linkuri interne spre ele).

**Indexed, though blocked by robots.txt – 6**: `account.primesupplements.ro/orders?locale=ro&region_country=RO&buyer_flags=…` (6 variante). Pagini de cont (noul domeniu de conturi Shopify) indexate fără conținut. Sursa: probabil linkuri din e-mailuri de comandă/footer. Impact mic; nu se poate pune noindex (găzduit de Shopify). De urmărit; dacă cresc, se raportează la Shopify.

### 2.3 Sitemaps
| Sitemap | Tip | Trimis | Citit | Stare | Pagini |
|---|---|---|---|---|---:|
| `https://primesupplements.ro/sitemap.xml` | index | 13.10.2026 | 24.10.2026 | Success | 388 |
| `https://www.primesupplements.ro/sitemap.rss` | RSS | 24.01.2025 | 10.06.2025 | Couldn't fetch | 51 |

Conținut live (26.10): `sitemap_products_1.xml` 210, `sitemap_articles_1.xml` 151, `sitemap_collections_1.xml` 18, `sitemap_pages_1.xml` 9, `sitemap_blogs_1.xml` 1, `sitemap_agentic_discovery.xml` 1 = **390**. **Acțiune:** șterge sitemap-ul RSS vechi din GSC (curățenie); nimic altceva.

### 2.4 Removals, Video
- Removals: nicio cerere în ultimele 6 luni (corect: nu folosim Removals pentru URL-uri redirecționate).
- Video indexing: 7 pagini cu video neindexat, motiv „Video isn't on a watch page”: 7 produse MNX (`mnx-extra-t-shirt-hc-2-0-limited-black`, `mnx-extra-t-shirt-basic-vivid-red`, `mnx-workout-top-hammer-3-0-white`, `mnx-t-shirt-edge-black`, `mnx-ribbed-shorts-hammer-white`, `mnx-stringer-tank-top-edge-black`, `mnx-classic-t-shirt-golden-era-2-0-white-red`) care încorporează același YouTube `viBNjJPIEBw` (autoplay, mute, loop). Normal pentru pagini de produs; nimic de făcut.

---

## 3. Performanță în căutare (Web, 11–23.10.2026)

### 3.1 Totaluri și segmente
| Indicator | Valoare |
|---|---|
| Clicuri | **699** |
| Afișări | **37.100** |
| CTR mediu | **1,9 %** |
| Poziție medie | **7,8** |
| Interogări distincte | 1.000 (limita raportului) |
| Pagini cu afișări | 667 |

| Dispozitiv | Clicuri | Afișări | CTR | Poziție |
|---|---:|---:|---:|---:|
| Mobil | 606 | 28.668 | 2,1 % | 7,2 |
| Desktop | 89 | 8.180 | 1,1 % | 9,8 |
| Tabletă | 4 | 212 | 1,9 % | 7,5 |

| Țară | Clicuri | Afișări | Poziție |
|---|---:|---:|---:|
| România | 619 | 32.710 | 7,6 |
| Germania | 23 | 792 | 6,7 |
| Italia | 11 | 429 | 7,2 |
| Moldova | 9 | 432 | 6,1 |
| Marea Britanie | 8 | 462 | 6,9 |
| Austria | 7 | 226 | 6,4 |
| Franța 4, Spania 2, Belgia 2, **Ungaria 2 (28 afișări)** | | | |

Observație: diaspora (DE, IT, UK, AT, FR, ES, BE) = ~55 de clicuri, 8 % – argument pentru livrare în UE afișată clar, nu pentru piața Ungaria (28 de afișări).

| Zi | Clicuri | Afișări | CTR | Poziție |
|---|---:|---:|---:|---:|
| 14.10 | 69 | 3.157 | 2,2 % | 6,6 |
| 15.10 | 49 | 2.801 | 1,7 % | 8,7 |
| 16.10 | 50 | 2.728 | 1,8 % | 8,8 |
| 17.10 | 39 | 2.718 | 1,4 % | 8,7 |
| 18.10 | 66 | 3.102 | 2,1 % | 7,6 |
| 19.10 | 76 | 3.500 | 2,2 % | 7,2 |
| 20.10 | 75 | 3.775 | 2,0 % | 7,3 |
| 21.10 | 61 | 3.361 | 1,8 % | 7,9 |
| 22.10 | 59 | 3.351 | 1,8 % | 8,2 |
| 23.10 | 41 | 3.006 | 1,4 % | 8,6 |

Afișările cresc (2.700 → 3.300–3.800/zi), clicurile stagnează la 40–75/zi: site-ul apare mai des, dar nu convinge în SERP (titluri, descrieri, snippet-uri, poziții 6–9).

| Aspect în căutare (Search appearance) | Clicuri | Afișări | CTR | Poziție |
|---|---:|---:|---:|---:|
| Product snippets | 234 | 11.078 | 2,1 % | 10,3 |
| Review snippet | 2 | 91 | 2,2 % | 20,8 |
| **Merchant listings** | **1** | **12** | 8,3 % | 2,1 |

**Merchant listings = 12 afișări în 13 zile.** Cu 428 de produse aprobate în Merchant Center, listările gratuite (Shopping tab, caruselele de produse) practic nu ne afișează. Cauze probabile (de verificat în Merchant Center, nu în GSC): titluri de feed slabe (vezi E12 în planul de după Black Friday), lipsa GTIN pe pachete, prețuri necompetitive la termenii-cap, lipsa recenziilor de produs în Google (Judge.me → Google Shopping reviews, verificare programată ~02.11).

### 3.2 Google Images (Search type: Image)
13 clicuri, 6.850 afișări, CTR 0,2 %, poziție 26,7. Interogări: „magneziu bisglicinat” 546 afișări (poziția 32,7), „creatina monohidrata” 311 (8,0), „creatina” 299 (17,6), „coenzima q10” 95. Pagini: `creatina-monohidrat-micronized-300g-fara-aroma` 940 afișări (14,7), `magneziu-bisglicinat-80-caps` 892 (32,6), `vitamina-d3-k2` 211 (51), `coenzima-q10-80-caps` 183 (20,8), `prime-whey-2000g` 110 (26,4), `ashwagandha-ksm-66` 135 (43,7). Packshot-urile apar, dar departe; alt-urile și numele de fișier (IMAGES-04/09 din audit) și imaginile „în context” (persoană + produs) ar urca pozițiile.

### 3.3 Generative AI features (beta): 5.580 afișări, 313 pagini
Top: `/collections/pudra-proteica` 323, `cand-se-ia-vitamina-d3-k2` 315, `cum-se-ia-creatina` 273, `scortisoara-ceylon-…` 264, `/` 238, `cata-proteina-trebuie-zi-…` 223, `ceai-diuretic-…` 193, `creatina-si-proteina-impreuna` 149, `/products/thermo-core-120-caps` 149, `in-cat-timp-face-efect-creatina` 122. Google îl citează pe Prime în AI Overviews pe întrebări „cum/când se ia”. Setarea „Search generative AI: Include” e activă (corect).

### 3.4 Interogări – ce aduce clicuri (clicuri / afișări / CTR / poziție)
**Marcă (~140 clicuri):** prime supplements 39/425/9,2 %/2,5 · prime nutrition 12/59/1,6 · primesupplements 11/53/1,8 · proteina prime 6/23/1,0 · prime supliment 6/10/1,5 · prime 5/1.043/0,5 %/4,5 · prime omega 3 5/162/7,0 · prime whey 5/34/1,7 · prime whey protein 5/28/1,5 · prime protein 5/20/1,2 · prime suplimente 3/28/1,0 · prime crema de orez 3/13 · prime health 3/6 · marius chera 3/20/4,5 · prime supplement 3/15 · mnx 2/25/3,7 · combat pro 2/15/1,2 · prime store 2/13 · prime creatine 2/3 · thermocore 8/503/1,6 %/2,7 · thermo core 2/208/1 %/2,7 · water out 2/23/8,9 · alpha booster pastile 3/71/5,5 · alpha booster prospect 2/56/4,6 · fat burner x10 pareri 4/19/1,9 · fat burner x10 2/70/4,6.
- Atenție: **„prime” 1.043 afișări, CTR 0,5 %** și **„thermocore” 503 afișări, CTR 1,6 % la poziția 2,7** – produsul propriu cu CTR mic pe propriul nume: titlul/snippet-ul paginii Thermo Core trebuie să spună clar „Thermo Core – arzător de grăsimi Prime, 120 capsule, preț” și să aibă stele.

**Generic cu clicuri:** crema de orez 66/1.323/5 %/1,6 · adevarul despre spirulina 10/206/3,3 · fat burner pareri 4/53/2,8 · burner 3/71/4,4 · cel mai puternic ceai diuretic 3/65/2,9 · taurina contraindicatii 3/25/7,8 · magneziu bisglicinat forum 3/14/2,0 · ceai diuretic 2/354/0,6 %/9,3 · preworkout 2/142/1,4 %/11,5 · ceaiuri diuretice 2/70/6,8 · cel mai bun magneziu forum 2/67/7,7 · crema de orez lidl 2/48/9,3 · l glutamina forum 2/26/6,1 · cand se ia glutamina 2/25/8,2 · pre workout 1/194/0,5 %/12,9 · cea mai buna spirulina de pe piata 1/145/4,9 · crema orez 1/112/2,1 · citrus bergamot 1/108/4,8 · cum se ia creatina 1/87/6,4 · unt de arahide beneficii 1/85/8,0 · l carnitina slabit forum 1/62/3,9 · diuretice naturale 1/60/10,8 · cand se ia vitamina d3 cu k2 1/45/6,2 · dextrina 1/45/8,7 · cluster dextrin 1/37/4,4 · citrat de zinc 1/31/7,1 · suplimente 1/26/9,1 · pantaloni bodybuilding 1/21/2,1 · creatina monohidrata 1/13/6,3.

### 3.5 Interogări cu afișări și ZERO clicuri (lista de lucru pentru titluri, snippet-uri și conținut) – afișări / poziție
- **Comerciale, poziții 1–10 (CTR de reparat):** termocore 45/1,8 · termo core 21/1,0 · cardiocalm 19/1,7 · proteina prime whey 11/1,3 · daily vitamine 11/2,8 · magazin suplimente sibiu 7/1,6 · prime store sibiu 7/1,7 · fiber 74/4,8 · glycerol 56/5,9 · alpha booster 61/5,5 · shot pre workout 31/4,6 · intraworkout 35/4,8 · magneziu bisglicinat 300 mg 23/5,7 · creatina 18/5,9 · proteine 14/5,7 · whey protein 14/6,1 · crema de orez instant 10/5,2 · maiou stringer 4/2,5 · frutilu 4/3,0 · pantalon bodybuilding 16/1,5.
- **Comerciale, poziții 8–15 (aproape de prima pagină):** whey protein isolate 106/9,8 · nattokinaza 142/8,0 · bergamota 156/10,9 · unt de migdale 262/10,1 · creatine monohydrate 65/10 · creatina plicuri 47/9,1 · dextrina ciclica 48/8,0 · magneziu glicinat beneficii 48/9,8 · zinc citrat 27/8,3 · whey isolate protein 29/10,8 · magazin suplimente sportive 28/11,2 · intra workout 41/10,8 · gainer masa musculara 20/9,5 · whey 2kg 18/8,7 · cream of rice 18/8,5 · proteina 1kg 16/9,1 · whey isolate 15/11,9 · magazin suplimente 17/12,7 · baton proteic capsuni 19/11,3 · omega 3 prime 25/9,8 · centura sala 9/8,4 · colagen peptan 23/10,1 · crom picolinat 15/10,4 · magnesium citrate 17/11,8 · proteina si creatina 14/11,6 · cea mai buna creatina monohidrata 4/10,2.
- **Comerciale mari, pagina 2–6 (nevoie de pagini dedicate + autoritate):** vitamins 1.436/6,5 (interogare EN; pagina `daily-vitamin-formula` are titlu englezesc) · eaa aminoacizi 149/19,6 · unt de arahide 122/30,1 · colagen hidrolizat 88/35,6 · **pudra proteica 81/22,5** · **suplimente sala 78/51,1** · omega 3 59/57,5 · **creatina creapure 51/17,1** · eaa 48/29,6 · creapure 47/19,7 · silimarina 46/33,9 · fat burner 42/15,4 · unt de caju 38/21,4 · bcaa beneficii 38/25,7 · aminoacizi eaa 32/26,6 · bcaa 32/35 · creatina monohidrata beneficii 30/40,9 · pre workout fara cofeina 28/27,6 · taurina 25/38 · isolate protein 21/17 · creatina monohidrata creapure 19/15,2 · ashwagandha ksm-66 19/25,3 · arzator de grasimi 19/32,6 · creatina monohidrata micronizata 18/16,2 · pudra de proteine 15/34 · proteina pudra 14/35,1 · ovaz instant 14/24,1 · gustari proteice 13/27,4 · arzatoare de grasimi 11/26,7 · proteina din zer izolat 11/37,1 · proteina whey isolate 10/24,1 · proteina izolata 10/39,9 · pudre proteice 9/18,1 · proteina whey 5/23,2 · izolat proteic de zer 6/21 · baton proteic 7/19,7 · shaker 600ml 10/15.
- **Informaționale cu volum (blog):** ceaiuri pentru eliminarea apei din organism 144/8,4 · l glutamina contraindicatii 78/8,3 · adevarul despre coenzima q10 77/11 · unt de migdale lidl 71/7,2 · cata creatina se ia pe zi 44/7,8 · cand se ia creatina 33/11,9 · scortisoara cassia sau ceylon 34/7,0 · beneficii creatina 26/54,5 · creatina afecteaza ficatul 24/54,2 · ce este bcaa 15/49,3 · la ce ajuta creatina 17/35,9 · creatina ce este 19/42,1 · taurina ce este 7/34 · ce este silimarina 11/32 · magneziu pentru somn 6/43,5 · cand se ia magneziu dimineata sau seara 9/40,1.

### 3.6 Pagini – pozițiile produselor (clicuri / afișări / CTR / poziție)
| Produs | Clicuri | Afișări | CTR | Poziție |
|---|---:|---:|---:|---:|
| prime-whey-1000g | 19 | 420 | 4,5 % | 4,9 |
| thermo-core-120-caps | 14 | 1.079 | 1,3 % | 3,2 |
| glycerol-max-pump-500g-125-serv | 9 | 174 | 5,2 % | 5,7 |
| citrus-bergamot | 8 | 571 | 1,4 % | 8,5 |
| omega-3 | 7 | 395 | 1,8 % | 19,6 |
| creatina-creapure | 7 | 233 | 3,0 % | 12,0 |
| crema-de-orez-fara-aroma | 6 | 296 | 2,0 % | 7,4 |
| cluster-insulin-bomb-1000g | 6 | 65 | 9,2 % | 5,0 |
| combat-pro | 4 | 63 | 6,3 % | 5,7 |
| prime-whey-2000g | 3 | 163 | 1,8 % | 7,1 |
| energy-pump | 3 | 142 | 2,1 % | 7,8 |
| nitrox-no-stim | 3 | 107 | 2,8 % | 13,3 |
| water-out-120-caps | 3 | 75 | 4,0 % | 6,4 |
| **daily-vitamin-formula** | 2 | **1.470** | **0,1 %** | 6,7 |
| pure-isolate-2000g | 2 | 109 | 1,8 % | 15,9 |
| ashwagandha-ksm-66 | 2 | 65 | 3,1 % | 18,5 |
| water-out-500-ml | 2 | 64 | 3,1 % | 13,8 |
| complete-collagen | 1 | 277 | 0,4 % | 20,9 |
| magneziu-bisglicinat-80-caps | 1 | 240 | 0,4 % | 8,7 |
| enzima-nattokinaza-80-caps | 1 | 237 | 0,4 % | 8,5 |
| eaa-aminoacizi-esentiali | 1 | 149 | 0,7 % | 24,3 |
| fiber-blood-orange | 1 | 125 | 0,8 % | 5,2 |
| nac-80-caps | 1 | 99 | 1,0 % | 13,0 |
| prime-whey-go | 1 | 51 | 2,0 % | 5,6 |
| combat-pro-2-0-660g-30-serv | 1 | 48 | 2,1 % | 5,4 |
| cardio-calm-500-ml | 1 | 61 | 1,6 % | 7,5 |
| prime-bodybuilding-classic-pants | 1 | 52 | 1,9 % | 1,7 |
| potassium-complex-80-caps | 1 | 38 | 2,6 % | 16,7 |
| vitamina-d3-k2 | 1 | 31 | 3,2 % | 6,5 |
| centura-hardcore | 1 | 19 | 5,3 % | 5,8 |
| maieu-fitness-barbati-edge-prime-negru | 1 | 20 | 5,0 % | 4,4 |
| t-shirt-drop-shoulder-muscle | 1 | 14 | 7,1 % | 21,5 |
| instant-drink-frutilu-pineapple-10g / red-orange | 1+1 | 6+5 | | 39–48 |
| unt-de-migdale | 0 | 505 | 0 % | 11,2 |
| unt-de-arahide | 0 | 389 | 0 % | 16,8 |
| creatina-monohidrat-micronized-300g-fara-aroma | 0 | 365 | 0 % | 8,2 |
| silimarina-80-caps | 0 | 244 | 0 % | 37,0 |
| creatine-ready-to-go-plicuri-prime-supplements | 0 | 110 | 0 % | 8,2 |
| baton-proteic-cocos-si-caramel | 0 | 96 | 0 % | 7,4 |
| magnesium-citrate-80-caps | 0 | 81 | 0 % | 7,8 |
| crema-de-orez-biscuiti-cu-crema | 0 | 76 | 0 % | 4,5 |

Notă: `prime-whey-1000g?currency=RON&country=RO&variant=…&utm_source=google&utm_medium=cpc&utm_campaign=Google Shopping&stkn=…` apare ca pagină separată cu 3 afișări – URL-ul de Shopping cu parametri a fost indexat (canonicalul îl rezolvă, dar arată că feedul trimite URL-uri cu `stkn`).

### 3.7 Pagini – pozițiile colecțiilor
| Colecție | Clicuri | Afișări | CTR | Poziție |
|---|---:|---:|---:|---:|
| crema-de-orez | 77 | 1.929 | 4,0 % | 2,6 |
| pudra-proteica | 14 | 1.775 | 0,8 % | 5,9 |
| haine-mnx | 7 | 44 | 15,9 % | 8,2 |
| suplimente-pre-workout | 5 | 1.120 | 0,4 % | 6,2 |
| prime-health | 4 | 103 | 3,9 % | 3,7 |
| echipament-sala | 3 | 207 | 1,4 % | 2,0 |
| creatina | 2 | 111 | 1,8 % | 5,5 |
| suplimente-sala | 1 | 377 | 0,3 % | 9,1 |
| reduceri | 1 | 255 | 0,4 % | 1,4 |
| shot-pre-workout | 1 | 139 | 0,7 % | 7,0 |
| suplimente-intra-workout | 1 | 105 | 1,0 % | 5,5 |
| alimente-sanatoase | 1 | 86 | 1,2 % | 4,6 |
| batoane-proteice | 1 | 78 | 1,3 % | 6,2 |
| bauturi | 1 | 24 | 4,2 % | 4,8 |
| **vitamine-si-minerale** | **0** | **392** | 0 % | **1,4** |
| aminoacizi | 0 | 279 | 0 % | 3,2 |
| suplimente-sala?page=3 | 0 | 255 | 0 % | 1,8 |
| all | 0 | 115 | 0 % | 1,9 |
| arzator-de-grasimi | 0 | 94 | 0 % | 32,9 |
| accesorii-sala | 0 | 76 | 0 % | 8,9 |

Pozițiile 1–3 cu 0 clicuri (vitamine-si-minerale, aminoacizi, all, suplimente-sala?page=3, reduceri) sunt în principal **sitelink-uri pe căutări de marcă** – afișări „gratuite” care nu produc clicuri; nu sunt poziții reale pe „vitamine”. Pozițiile reale pe termenii generici sunt cele din §3.5.

### 3.8 Pagini – blogul (ce aduce și ce nu)
Clicuri: fat-burner-x10-pareri 22 · cand-se-ia-vitamina-d3-k2 16 (1.429 afișări, CTR 1,1 %) · epa-dha-explicate 16 · cum-se-prepara-crema-de-orez 15 · ceai-diuretic 14 (1.859 afișări, 0,8 %) · creatina-si-proteina-impreuna ~12 · magneziu-bisglicinat-cum-iti-dai-seama 11 · adevarul-despre-spirulina 10 · taurina-doza-si-cand-se-ia 10 · scortisoara-ceylon 9 (812 afișări, 1,1 %) · prospect-spirulina 9 · cum-se-ia-creatina 8 (1.005 afișări, 0,8 %) · glutamina-si-sanatatea-stomacului 8 · alpha-booster-testosterone 7 · beneficii-omega-3-coenzima-q10 7 · proteina-din-zer-vs-vegetala 7 · fat-burner-x10-thermo-core 6 · ovaz-si-balonare 6 · cand-se-ia-nac 6 · cand-se-ia-proteina 5 · gatit-cu-pudra-proteica 5.
Zero clicuri cu afișări: magneziu-seara-somn 546 (8,4) · creatina-si-retentia-de-apa 452 (6,1) · cata-proteina-trebuie-zi 872 (5,5; 2 clicuri) · pre-workout-ce-este 219 · aminoacizi-esentiali-ce-sunt 177 (10,8) · bcaa-vs-eaa 162 (15,5) · ce-este-taurina 156 (16,6) · bcaa-ce-sunt 153 (32,9) · ce-este-creatina 122 (28,1).
Ancorele `#…` ale articolelor (ceai-diuretic ×4 a câte ~580 afișări, spirulina ×4, scorțișoară ×5, fat-burner ×3, l-carnitine ×4, alpha-booster ×4) apar ca rânduri separate: Google folosește cuprinsul (jump links) – semn bun că structura H2/cuprins e citită.

---

## 4. Experiență: Core Web Vitals, HTTPS, PageSpeed

### 4.1 GSC
- **Core Web Vitals (CrUX, 21.10):** mobil 199 URL-uri bune / 0 de îmbunătățit / 0 slabe; desktop la fel. Trecut pe date reale.
- **HTTPS (25.10):** 214 URL-uri HTTPS, 0 non-HTTPS.
- CrUX homepage (PSI 26.10): LCP 1,4 s · INP 128 ms · CLS 0 · FCP 1,1 s → **Core Web Vitals Assessment: Passed**.

### 4.2 PageSpeed Insights, laborator (26.10.2026, 02:17, Lighthouse 13.5.0, Moto G Power, Slow 4G)
| Pagină | Mobil: Perf | FCP | LCP | TBT | CLS | SI | Desktop: Perf | LCP |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| `/` | **76** | 2,6 s | 4,6 s | 150 ms | 0,003 | 4,4 s | **98** | 0,9 s |
| `/collections/pudra-proteica` | **72** | 2,3 s | **8,3 s** | 0 ms | 0,003 | 3,6 s | **89** | 2,1 s |
| `/products/prime-whey-2000g` | **82** | 2,6 s | 4,1 s | 110 ms | 0,01 | 3,3 s | **99** | 0,9 s |
| `/blogs/news/cum-se-ia-creatina` | **68** | 3,0 s | **8,3 s** | 60 ms | 0,003 | 4,3 s | **95** | 1,4 s |

Accesibilitate **100**, SEO **100**, Bune practici **96** (toate paginile; Best Practices pierde la: „Browser errors were logged to the console”, CSP, HSTS, COOP, Trusted Types – antete pe care Shopify nu le lasă configurabile). Agentic Browsing 5/5 pe home/colecție/articol, **3/4 pe produs** („WebMCP schemas are invalid”, „1 form missing annotations” – formularul de adăugare în coș).

Diagnostice repetate pe mobil (toate paginile): „More than 4 preconnect”, cache terț 25–26 KiB, JavaScript nefolosit 83–88 KiB, CSS nefolosit 23–33 KiB, minify JS 3 KiB, „Forced reflow”, DOM mare, „3rd parties”. Specific: homepage – execuție JS 1,3 s, main-thread 5,5 s, 13 task-uri lungi, **payload 3.280 KiB**; produs – payload 2.837 KiB, 3 animații necompuse, main-thread 4,3 s; colecție – imagini 48 KiB de optimizat, LCP 8,3 s (imaginea de banner/primul card încărcată târziu); articol – render-blocking 300 ms, imagini 73 KiB, „Image elements do not have explicit width and height” (imaginile din corpul articolelor, IMAGES-07 din audit), 4 task-uri lungi.

Comparativ cu 13.10 (tema live înainte de remediere: 64 mobil homepage): +12 puncte pe homepage, Accesibilitate 76 → 100, SEO 92 → 100. Ce a rămas e în special **LCP pe colecție și articol** și **greutatea JavaScript-ului terț** (Judge.me, theMarketer, Clarity, pixeli) – decizia proprietarului în PAGESPEED-2026-10-13 §5 / pasul 10 din planul de după Black Friday.

---

## 5. Shopping și îmbunătățiri (date structurate, 24.10.2026)

| Raport | Valide | Invalide | Avertismente |
|---|---:|---:|---|
| Product snippets | 82 | 0 | „Missing field aggregateRating” 41 · „Missing field review” 41 · „Invalid price format in highPrice (offers)” 7 · „Invalid price format in lowPrice (offers)” 7 |
| Merchant listings | 75 | 0 | „Missing field validFrom (in offers)” 75 |
| Breadcrumbs | 109 | 0 | – |
| Review snippets | 41 | 0 | – |
| Profile page | 1 | 0 | – (pagina de autor) |
| Merchant opportunities | – | – | **„Associate Search Console with your Merchant Center account – Prime Supplements (5540809866)”: neasociat** |

- Cele 7 produse cu „Invalid price format” `highPrice`/`lowPrice`: `baton-proteic-ciocolata-fructe-de-padure`, `mnx-extra-t-shirt-basic-grey`, `tricou-sala-suffer-to-dominate-bumbac-premium-negru`, `mnx-ribbed-shorts-hammer-3-0-white`, `t-shirt-drop-shoulder-muscle`, `tricou-oversized-barbati-hammer-3-0-prime-negru`, `instant-drink-frutilu-watermelon-10g`. **Verificat live 26.10:** HTML-ul actual nu mai conține `lowPrice`/`highPrice` deloc (JSON-LD emite `Offer` per variantă cu `price: 100.0`), deci avertismentul e din crawl-uri vechi (tema de dinainte de 16.10). **Acțiune:** Rich Results Test pe 2 dintre ele, apoi „Validate fix” în GSC.
- „Missing aggregateRating/review” pe 41 de produse = produsele fără recenzii Judge.me. Se rezolvă doar prin recenzii reale (strategia 4, fluxul de cerere de recenzie – aprobare în așteptare).
- „Missing validFrom” e informativ (Google îl cere doar pentru oferte cu perioadă); se poate adăuga `priceValidFrom`/`validFrom` în snippet-ul de schemă când se lucrează la temă (opțional).
- 82 Product snippets și 75 Merchant listings valide dintr-un sitemap cu 210 produse: ~130 de produse nu au fost încă re-crawlate cu schema nouă sau sunt haine/variante fără afișări. Indicator de urmărit: ambele cresc spre ~185.

---

## 6. Linkuri (26.10)

**Externe: 53 în total, 5 domenii.**
| Site | Linkuri | Ce este |
|---|---:|---|
| mataroa.blog | 25 | blog personal (un afiliat?) cu ancora „discount 10 la produsele prime supplements cu codul daniel10” |
| cylex.ro | 8 | director de firme |
| youtube.com | 5 | descrieri video |
| **creapure.com** | 4 | lista oficială de branduri Creapure® – cel mai valoros link |
| deschis.ro | 2 | director |

Top pagini linkate: `/` 23, `/products/creatina-creapure` 10, `creatina-monohidrat-micronized-300g-fara-aroma` 4, `creatine-ready-to-go-plicuri-prime-supplements` 4, `pure-isolate-2000g` 3. Ancore: „https www primesupplements ro”, „read the original article”, „descoperă creatine ready to go”.
Concluzie: autoritatea externă este practic zero (AUTHORITY-01/02 din audit; programul P1–P3). Afiliații linkează cu cod de reducere (bine ca vânzări, slab ca SEO).

**Interne: 24.537.** Top linkate: `/collections/arzator-de-grasimi` 887, `/collections/vitamine-si-minerale` 865, `/account/login` 759, `/pages/politica-de-retur` 744, `politica-de-cookies` 743, `politica-de-plata` 742, `/collections/batoane-proteice` 740, `/blogs/news` 727, `politica-de-confidentialitate` 726, `/` 722. Meniul și footerul domină; produsele-cheie (Whey 2 kg, Creapure, Pure Isolate) nu apar în top 10 → blocul „Citește și”/„Produse recomandate” din plan (pașii 5 și 15) are rost și pentru linkuri interne.

---

## 7. Statistici de crawl (ultimele 90 de zile, 21.10)

| Indicator | Valoare |
|---|---|
| Cereri de crawl | 8.050 |
| Descărcat | 678 MB |
| Timp mediu de răspuns | 330 ms (bun) |

| Gazdă | Cereri | Stare |
|---|---:|---|
| primesupplements.ro | 7.167 | OK |
| **b2b.primesupplements.ro** | **613** | OK |
| www.primesupplements.ro | 217 | OK (redirecturi) |
| old.primesupplements.ro | 54 | **„Problems last week”** (DNS/host) |
| account.primesupplements.ro | 3 | OK |

După răspuns: 200 → 82 %, **301 → 13 %**, **404 → 4 %**, inaccesibil < 1 %, robots indisponibil < 1 %. După scop: refresh 91 %, discovery 9 %. După tip: HTML 57 %, altele 16 %, imagini 13 %, JavaScript 7 %, CSS < 1 %. După Googlebot: smartphone 43 %, **AdsBot 16 %** (verificarea paginilor de destinație Google Ads), imagini 14 %, resurse de pagină 13 %, desktop 12 %.

---

## 8. Securitate, acțiuni manuale, setări
- Manual actions: **No issues detected**. Security issues: **No issues detected**.
- Settings: proprietar verificat; utilizatori „Prime Supplements”; **Associations: niciuna** (nici Merchant Center, nici Google Ads, nici YouTube, nici GA4); Change of address: nu; Bulk data export (BigQuery): nu; **AI controls → Search generative AI: Include**; robots.txt: „All files are valid”; proprietate adăugată 12.10.2026.
- 4 mesaje necitite în GSC (clopoțel) – de deschis de proprietar (de obicei: confirmarea proprietății, sitemap, primele rapoarte).

---

## 9. Ce NU este problemă (fals-pozitive, ca să nu se piardă timp)
- 124 „Blocked by robots.txt”, 1 „other 4xx”, fluxurile `.atom`, fișierele `/cdn/…`, `llms.txt`/`agents.md`, `/services/login_with_shop`, `account.primesupplements.ro/orders` – toate normale pentru Shopify.
- 417 duplicate `/ro-hu/` și 565 „Page with redirect” – consecința corectă a redirecturilor; se golesc singure. **Nu** se folosește Removals.
- 59 „Duplicate without canonical” www – deja 301.
- „Video isn't on a watch page” – paginile de produs cu video încorporat; normal.
- Ancorele `#…` din performanță – nu sunt pagini duplicate.

---

## 10. SCRIPTUL DE ACȚIUNI (ce trebuie rezolvat și îmbunătățit, în ordine)

Legendă: **[ACUM]** = igienă fără impact pe vânzări, se poate face oricând (inclusiv înainte de Black Friday, cu acordul proprietarului); **[DEC]** = intră în `PLAN-DUPA-BLACK-FRIDAY-2026.md` (pasul indicat) sau e amânat prin decizia din 25.10; **[DECIZIE]** = proprietarul decide.

### A. Indexare și redirecturi
| # | Problema (dovada GSC) | Acțiunea concretă | Unde | Verificare | Când |
|---|---|---|---|---|---|
| A1 | 21 articole 404 cu handle `-2026`/greșit (Pages → Not found) | 21 reguli „Redirect from → to” spre articolul păstrat pe același subiect (ex. `…creatine-kinase-greseala-dozare-creatina-2026` → `/blogs/news/cum-se-ia-creatina`; `…ovaz-instant-…-energy` → `…-energie`; lista completă în §2.2). Apoi caută în corpurile articolelor live linkuri către aceste handle-uri și corectează-le. | Shopify → Online Store → Navigation → URL redirects (import CSV) + Admin API `articleUpdate` pentru linkuri | `curl -I` pe fiecare → 301; GSC „Not found” scade la < 50 în 3–4 săptămâni; Validate fix | **[ACUM]** |
| A2 | 6 URL-uri de produs trunchiate 404 | Redirecturi: `/products/creatine-ready` → `/products/creatine-ready-to-go-plicuri-prime-supplements`; `/products/ashwagandha` → `/products/ashwagandha-ksm-66`; `/products/combat-pro-` → `/products/combat-pro`; `/collections/crema-de-` → `/collections/crema-de-orez`; `/products/prime-whey-` → `/products/prime-whey-2000g`; `/products/zinc-citrate-80` → `/products/zinc-citrate-80-caps`. Sursa: GSC URL Inspection → „Referring page” pe fiecare; dacă e un articol sau un e-mail theMarketer, corectează linkul. | Shopify URL redirects; GSC URL Inspection | 301 live; dispar din 404 | **[ACUM]** |
| A3 | 2 produse MNX dispărute (404) + 1 tricou noindex devenit 404 | `/products/mnx-hoodie-edge-melange-grey` → hoodie-ul Edge rămas (sau `/collections/haine-mnx`); `/products/t-shirt-body-tight` → `/collections/haine-mnx`; `/products/tricou-sala-built-in-the-city-bumbac-premium-negru` → tricoul echivalent sau `/collections/haine-mnx` | Shopify URL redirects | 301 live | **[ACUM]** |
| A4 | 36 URL-uri WooCommerce fără regulă (404) | 5 reguli noi: `/categorie-produs/suplimente/pudre-proteice` → `/collections/pudra-proteica`; `/politica-de-cookies` → `/pages/politica-de-cookies`; `/politica-de-confidentialitate` → `/pages/politica-de-confidentialitate`; `/despre-noi` → `/pages/despre-noi`; `/product-category/suplimente` → `/collections/suplimente-sala`. `*/feed/`, `wp-admin`, `wp-content` rămân 404. | Shopify URL redirects (completează `applied/redirects/legacy-redirects.csv`) | 301 live | **[ACUM]** |
| A5 | 4 pagini „Discovered – not indexed” + 3 articole „Crawled – not indexed” + 2 produse MNX | URL Inspection → Request indexing pentru: `ce-este-un-pre-workout-fara-cofeina`, `cum-alegi-creatina`, `cum-te-ajuta-combat-pro-…`, `tricou-gym-supradimensionat-lejer-roz-pastel-prime`, `cand-se-ia-coenzima-q10-dimineata-masa-grasimi`, `faza-de-incarcare-creatina-formula-eticheta`, `izolat-proteic-intoleranta-lactoza-trebuie-sa-stii`; adaugă câte 2–3 linkuri interne din articole/colecții înrudite spre fiecare. Pentru `mnx-golden-era-cotton-shorts-rosewood` și `mnx-shorts-golden-era-2-0-red`: descriere de 100+ cuvinte, titlu SEO, alt (igiena hainelor MNX, pasul 9 din plan). | GSC (max ~10 cereri/zi) + Shopify | în 2 săptămâni apar în „Indexed” | **[ACUM]** pentru cereri; textele **[DEC]** |
| A6 | **~110 URL-uri b2b.primesupplements.ro în index**, 613 cereri de crawl, 40 canonicalizate, 30 pagini de login | Decizia din plan (pasul 3, întrebarea 1): parolă pe storefront-ul B2B sau `noindex` + canonical către magazinul principal; apoi, în GSC, nimic (Removals nu, se curăță singur). Până la decizie: nimic. | Shopify (magazinul B2B) → Preferences → password / temă | `site:b2b.primesupplements.ro` → 0 în 6–8 săptămâni; crawl b2b → 0 | **[DEC – pasul 3]** |
| A7 | `old.primesupplements.ro`: 54 cereri, 13 soft 404, 21 „crawled” | Verifică la registrar dacă înregistrarea DNS `old` mai există: dacă da, șterge-o sau redirecționeaz-o 301 către `primesupplements.ro`. Caută sursa linkurilor (descrieri YouTube, Facebook, Google Business vechi, e-mailuri). | DNS / conturi sociale | cereri de crawl `old` → 0 | **[ACUM – verificare]** |
| A8 | `www.primesupplements.ro/` încă primește 424 afișări; 217 cereri de crawl | Nimic de schimbat (301 corect). Opțional: în GSC, URL Inspection pe `https://www.primesupplements.ro/` ca să grăbești actualizarea canonicalului. | GSC | afișările www scad | **[ACUM]** |
| A9 | Sitemap RSS vechi „Couldn't fetch” | Șterge `https://www.primesupplements.ro/sitemap.rss` din GSC → Sitemaps. | GSC | lista are doar `sitemap.xml` | **[ACUM]** |
| A10 | `/search` are 111 afișări (poziția 1,3) deși are `noindex,follow` (verificat live) | Nimic: Google îl va scoate; e un sitelink de marcă. De urmărit că dispare în 4 săptămâni. | – | – | – |
| A11 | 4 URL-uri `/ro-hu/` încă indexate; 417 duplicate | Nimic acum (redirectul merge). Dacă piața Ungaria se dezactivează (pasul 4 din plan), dispar complet. | – | „Duplicate, Google chose different canonical” → 0 | **[DEC – pasul 4]** |

### B. CTR și snippet-uri (cel mai rapid câștig de clicuri, fără schimbări de structură)
| # | Problema | Acțiunea concretă | Când |
|---|---|---|---|
| B1 | `/products/daily-vitamin-formula`: 1.470 afișări, 2 clicuri, poziția 6,7 – apare pe „vitamins” (EN) | Titlu SEO și H1 în română: „Daily Vitamin Formula – multivitamine și minerale, 60 capsule \| Prime Supplements”; meta-descriere cu doza, preț, „livrare 24–48 h”; verifică că pagina are text românesc în primele 300 de cuvinte. Țintă CTR ≥ 1,5 %. | **[DEC – pasul 7/8]** (texte produse, decembrie) |
| B2 | `/collections/pudra-proteica`: 1.775 afișări, CTR 0,8 %, poziția 5,9; `suplimente-pre-workout` 1.120 afișări, 0,4 %; `suplimente-sala` 377, 0,3 % | Titluri și meta-descrieri de colecție cu beneficiul + număr de produse + preț „de la” + „produs în România”; H1 fără denumiri vechi („Pudre Proteice”). Este exact pasul 11 din plan (titluri de colecție), de prioritizat după afișări: pudra-proteica, suplimente-pre-workout, suplimente-sala, creatina, vitamine-si-minerale. | **[DEC – pasul 11]** |
| B3 | Thermo Core: „thermocore” 503 afișări CTR 1,6 % la poziția 2,7; „termocore” 45, „termo core” 21 cu 0 clicuri; pagina 1.079 afișări, 1,3 % | Titlu: „Thermo Core – arzător de grăsimi termogenic, 120 capsule \| Prime”; meta cu ingrediente-cheie și preț; stele (recenzii) pe pagină; FAQ „cum se ia”. Același tratament pentru Cardio Calm („cardiocalm” 19 afișări, 0 clicuri, poziția 1,7), Alpha Booster (61 afișări, poziția 5,5), Glycerol („glycerol” 56, poziția 5,9), Fiber („fiber” 74, poziția 4,8). | **[DEC – pasul 7/8]** |
| B4 | Articole cu 800–1.900 afișări și CTR < 1,2 %: ceai-diuretic (1.859), cand-se-ia-vitamina-d3-k2 (1.429), cum-se-ia-creatina (1.005), cata-proteina-trebuie-zi (872), scortisoara-ceylon (812), magneziu-seara-somn (546, 0 clicuri), creatina-si-retentia-de-apa (452, 0) | Rescrie titlul SEO ca răspuns direct + an/format („Când se ia vitamina D3 cu K2: dimineața, cu masa – ghid 2026”), meta-descriere cu răspunsul în prima propoziție; primele 2 rânduri ale articolului = răspunsul (featured snippet). | **[DEC – pasul 14 (blog)]**; titlurile pot fi **[ACUM]** cu aprobarea proprietarului (nu schimbă URL-uri) |
| B5 | Pagini pe poziții 1–3 cu 0 clicuri (vitamine-si-minerale 392, aminoacizi 279, all 115, reduceri 255) | Sunt sitelink-uri de marcă. Nimic de reparat la pagini; dar `reduceri` cu 255 afișări merită titlu „Reduceri suplimente – pachete cu până la 15 %” în loc de generic. | **[DEC – pasul 11]** |

### C. Poziții pe termenii comerciali (unde se joacă creșterea)
| # | Termen (afișări / poziție) | Pagina care ar trebui să ranke | Ce lipsește (din GSC + audit) | Când |
|---|---|---|---|---|
| C1 | pudra proteica 81/22,5 · pudra de proteine 15/34 · proteina pudra 14/35 · pudre proteice 9/18 | `/collections/pudra-proteica` | ghidul de categorie (`custom.seo_text`) neafișat de temă; titlu; FAQ; linkuri din articolele „proteina” (31 de articole) spre colecție | **[DEC – pașii 11–12]** |
| C2 | creatina creapure 51/17,1 · creapure 47/19,7 · creatina monohidrata creapure 19/15,2 | `/products/creatina-creapure` (poziția 12,0; 10 linkuri externe de la creapure.com – avantaj unic) | FAQ + tabel comparativ Creapure vs monohidrat; colecție dedicată „Creapure” (pasul 12); stele; linkuri interne din cele 17 articole creatină | **[DEC – pașii 7, 12]** |
| C3 | whey protein isolate 106/9,8 · whey isolate protein 29/10,8 · isolate protein 21/17 · izolat proteic de zer 6/21 · proteina izolata 10/40 | `/products/pure-isolate-2000g` (poziția 15,9) | pagina nu are textul comercial; colecție „izolat proteic” (pasul 12); articolul `whey-isolate-protein-secretele-…` (poziția 10,4) să linkeze produsul în primul ecran | **[DEC]** |
| C4 | eaa aminoacizi 149/19,6 · eaa 48/29,6 · aminoacizi eaa 32/26,6 · bcaa* 100+/25–50 | `/products/eaa-aminoacizi-esentiali` (poziția 24,3), `/collections/aminoacizi` | același set: text, FAQ, comparație EAA vs BCAA pe pagina de produs, linkuri din cele 4 articole EAA/BCAA | **[DEC]** |
| C5 | omega 3 59/57,5 · supliment omega 3 13/42 · omega 3 capsule 9/28 · colagen hidrolizat 88/35,6 · silimarina 46/34 · unt de arahide 122/30 · unt de migdale 262/10,1 · nattokinaza 142/8,0 · bergamota 156/10,9 | produsele Prime Health și alimente | termenii cu farmacii în top: țintă realistă poziția 5–10; pagini cu „ce conține / doza / studii”, stele, preț/porție; `unt-de-migdale` și `nattokinaza` sunt deja la 8–11 → primele de împins | **[DEC – pasul 7]** |
| C6 | suplimente sala 78/51 · magazin suplimente sportive 28/11,2 · magazin suplimente 17/12,7 · magazin suplimente sibiu 7/1,6 · prime store sibiu 7/1,7 | `/` și `/collections/suplimente-sala` | pagina „Despre noi”/local Sibiu-Cisnădie (LOCAL-*), mențiuni locale; homepage cu H1 pe „magazin de suplimente din România” | **[DEC – pașii 16–17]** |
| C7 | pre workout 194/12,9 · preworkout 142/11,5 · pre workout fara cofeina 28/27,6 · shot pre workout 31/4,6 · intra workout 41/10,8 | `/collections/suplimente-pre-workout` (6,2), `/collections/shot-pre-workout` (7,0), `/products/nitrox-no-stim` (13,3) | CTR 0,4 % pe colecție → titlu/meta; „fără cofeină” = pagină/colecție dedicată (Nitrox No Stim + articolul citicolină) | **[DEC]** |
| C8 | crema de orez 1.323/1,6 (deja #1) · cream of rice 18/8,5 · crema de orez instant 10/5,2 · crema de orez proteica 10/8,7 · crema de orez lidl 48/9,3 | `/collections/crema-de-orez` | textul „cream of rice / instant / proteică” pe colecție (aprobare din 23.10 în așteptare); comparație cu Lidl în articol | **[DECIZIE – aprobare text]** |

### D. Date structurate și Shopping
| # | Problema | Acțiunea | Când |
|---|---|---|---|
| D1 | Merchant Center **neasociat** cu GSC | GSC → Merchant opportunities → „Associate account” (Prime Supplements 5540809866); confirmă și în Merchant Center → Settings → Linked accounts. Dă rapoartele „Merchant listings” complete și semnalele de magazin în GSC. Fără risc. | **[ACUM]** (clic de proprietar) |
| D2 | Merchant listings: 12 afișări / 1 clic în 13 zile | Nu e GSC: în Merchant Center → verifică titlurile feedului (E12: titlu SEO ca titlu de feed, Simprosys), GTIN pe pachete (pasul 19), recenziile Judge.me → Google (verificare 02.11), statusul „Free listings” pe toate produsele. | **[DEC – pașii 18–19]**; verificările **[ACUM]** |
| D3 | 7 produse „Invalid price format highPrice/lowPrice” | HTML-ul actual nu mai are câmpurile → Rich Results Test pe `baton-proteic-ciocolata-fructe-de-padure` și `t-shirt-drop-shoulder-muscle`; dacă e curat, GSC → Product snippets → avertisment → „Validate fix”. | **[ACUM]** |
| D4 | 41 produse fără aggregateRating/review | Doar prin recenzii reale: fluxul de cerere de recenzie Judge.me (strategia 4, în așteptare), nu markup fără recenzii. | **[DECIZIE]** |
| D5 | 75 oferte fără `validFrom` | Opțional, la următoarea intervenție pe `schema-product-enhanced.liquid`: `priceValidFrom`/`validFrom` = data publicării. | **[DEC – când se atinge tema]** |
| D6 | URL cu `stkn=`/`utm` din Google Shopping indexat | Canonicalul rezolvă; în Simprosys verifică să nu trimită `stkn` în `link`. | **[DEC – pasul 18]** |
| D7 | Doar 82/75 produse cu snippet valid din 210 | Nimic de făcut; crește cu re-crawl-ul. Indicator săptămânal. | – |

### E. Performanță (PageSpeed) – ce mai e de câștigat
| # | Constatare | Acțiune | Când |
|---|---|---|---|
| E1 | LCP 8,3 s pe colecție și articol (mobil, laborator); CrUX real e „bun” | Colecție: imaginea de banner / primul card cu `fetchpriority="high"`, dimensiuni `width`/`height`, `srcset` ≤ 800 px pentru mobil; articol: imaginea principală a articolului cu `fetchpriority="high"` și `loading="eager"`, iar imaginile din corp cu `width`/`height` (IMAGES-07). | **[DEC – pasul 10, temă]** |
| E2 | JavaScript terț: main-thread 4–5,5 s, payload 2,8–3,3 MB, 83–88 KiB JS nefolosit | Decizia din PAGESPEED-2026-10-13 §5: Judge.me doar pe produs, theMarketer după acord (06.11), Clarity după acord (făcut), pixeli o singură dată. | **[DEC – pasul 10]** |
| E3 | „More than 4 preconnect” pe toate paginile | Lista `preconnect` din `theme.liquid`/aplicații: păstrează cdn.shopify.com + 2 critice. | **[DEC – temă]** |
| E4 | Agentic Browsing 3/4 pe produs (WebMCP schema invalidă, formularul de coș fără adnotări) | Nou (Lighthouse 13.5): verifică snippet-ul WebMCP/UCP al temei (`agents.md`, `.well-known/ucp`) – formularul „Adaugă în coș” are nevoie de adnotări WebMCP valide. Impact SEO zero azi; relevant pentru agenți AI. | **[DEC – când se atinge tema]** |
| E5 | Best Practices 96: erori în consolă | Deschide consola pe produs și homepage și notează erorile (de obicei aplicații terțe); raportează furnizorului. | **[ACUM – diagnostic]** |

### F. Autoritate și linkuri
| # | Constatare | Acțiune | Când |
|---|---|---|---|
| F1 | 53 linkuri externe, 5 domenii; creapure.com dă 4 | Programul P1–P3 din audit (comparatoare, Trustpilot, eMAG brand page, presa locală Sibiu, parteneri Creapure/KSM-66/Kyowa cu pagini de „where to buy”); pasul 16–17 din plan. | **[DEC]** |
| F2 | mataroa.blog 25 linkuri cu „cod daniel10” | Verifică blogul (afiliat?). Dacă e afiliat, linkurile ar trebui `rel="sponsored"` pe site-ul lui (cerința Google); nu e nimic de făcut pe site-ul nostru. | **[DECIZIE – informativ]** |
| F3 | Linkuri interne: footer/politici domină; produsele-cheie lipsesc din top | Blocul „Citește și” pe produse + „Produse recomandate” în articole (pașii 5 și 15); breadcrumb vizibil. | **[DEC]** |

### G. Setări GSC și monitorizare
| # | Acțiune | Când |
|---|---|---|
| G1 | Asociază Merchant Center (D1) și, dacă există, contul Google Ads și canalul YouTube (Settings → Associations). | **[ACUM]** |
| G2 | Citește cele 4 mesaje din GSC. | **[ACUM]** |
| G3 | Raport GSC săptămânal (programul (d) din ACTION-PLAN): Pages (404, Discovered, Duplicate ro-hu, b2b), Performance (termenii din §3.5, CTR pe paginile din B1–B4), Enhancements (Product snippets/Merchant listings valide), Links, Crawl (b2b/old). Rutină cloud existentă sau una nouă, luni dimineața. | **[DECIZIE]** |
| G4 | Opțional: Bulk data export către BigQuery (gratuit în limitele free tier) pentru a păstra istoricul complet, nu doar 16 luni și 1.000 de rânduri. | **[DECIZIE]** |

---

## 11. Indicatori de urmărit (de unde pornim azi, 26.10.2026)
| Indicator | Azi | Țintă 8 săptămâni |
|---|---|---|
| Clicuri / zi (web) | 40–75 | 120+ |
| CTR mediu | 1,9 % | 3 % |
| Poziție medie | 7,8 | ≤ 6,5 |
| Clicuri non-brand pe `/collections/` + `/products/` | ~150 / 13 zile | ×2 |
| Merchant listings: afișări / 13 zile | 12 | 500+ |
| Pagini indexate b2b | ~110 | 0 (după decizie) |
| „Not found (404)” | 73 | < 40 (doar wp/feed) |
| „Duplicate, Google chose different canonical” (/ro-hu) | 417 | < 50 |
| Product snippets valide / Merchant listings valide | 82 / 75 | 150 / 150 |
| Linkuri externe (domenii) | 5 | 15 |
| PSI mobil: home / colecție / produs / articol | 76 / 72 / 82 / 68 | 85 / 80 / 85 / 80 |
| Afișări Generative AI / 13 zile | 5.580 | 10.000 (cu pagini comerciale în top) |

---

## 12. Metodă și limite
- Citit din interfața GSC (nu din API): tabelele au fost extinse la 500 de rânduri; „Page with redirect” are 565 (citite 500), „Indexed” 821 (citite 500), interogări 1.000 (citite toate), pagini 667 (citite 500).
- Perioada de performanță e de doar 13 zile (proprietate nouă); cifrele devin stabile după 4–8 săptămâni. Nu există date Discover/News.
- PageSpeed: API-ul avea cota zilnică epuizată; s-a folosit pagespeed.web.dev (aceeași versiune Lighthouse 13.5.0), câte o rulare pe pagină, mobil + desktop.
- Nimic modificat. Toate acțiunile de mai sus așteaptă acordul proprietarului; cele marcate [ACUM] sunt doar igienă (redirecturi, cereri de indexare, asociere Merchant Center, ștergere sitemap RSS) și nu schimbă nimic vizibil pe site.
