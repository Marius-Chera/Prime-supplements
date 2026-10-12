## 6. Imagini

**Scor specialist (la momentul auditului):** 42/100 — un singur specialist (seo-images, pondere 5 % din scorul total): mecanica de livrare e în mare parte corectă (negocierea WebP pe CDN-ul Shopify confirmată live, `srcset`/`sizes` și `width`/`height` pe imaginile temei, lazy-loading nativ, `fetchpriority="high"` pe hero) și ține categoria departe de podea, dar SEO-ul de imagine e aproape zero: 493/493 imagini de produs fără alt stocat (fallback pe titlul brut, deci același alt pe toate imaginile unui produs și caption-uri goale în sitemap), hero-ul, logo-ul, tile-urile de categorie și toate bannerele de colecție cu `alt=""`, 40 % din fișierele de produs cu nume de aparat/WhatsApp/WordPress, 327/354 imagini de blog PNG-uri generate AI numite cu timestamp sau cu promptul întreg, `og:image` pe `http://` pe fiecare pagină. **Scor combinat: 42/100** (un singur specialist alimentează secțiunea).

**Scor estimat după remedierile din 12.10.2026:** 56/100 pe magazinul live — s-a închis singura constatare High care atingea toate cele 185 de produse: 493/493 alt-uri descriptive în română, distincte, scrise după imaginea reală (IMAGES-01, implicit și IMAGES-14 pentru produse; caption-urile din sitemap și feed-urile canalelor se umplu la următoarea regenerare). Neschimbate: hero/logo/tile-uri și bannerele cu `alt=""` (IMAGES-02/03), numele de fișier, imaginile blogului, over-fetch-ul pe bannere, markup-ul cardurilor. `og:image` pe https (IMAGES-06) și Product JSON-LD valid cu array-ul `image` (IMAGES-05/17) stau în tema de test nepublicată „Impact – SEO fixes 2026-10-12” (id 193875083639) — după publicare ~62/100; după alt-urile din Content → Files (IMAGES-02/03, efort S) și eliminarea prezenței web `/ro-hu` ~72/100.

### Ce funcționează

- Negocierea de conținut a CDN-ului Shopify confirmată live: `01_BATONPROTEIC_strawberry_front.jpg?width=1200` → `image/webp` 51.082 B cu Accept avif/webp vs `image/jpeg` 104.226 B (-51 %); Creapure 39.414 B vs 88.569 B (-55 %); hero `header-desktop.jpg?width=2800` 210.712 B vs 322.050 B. `vary: Accept`, `cache-control: public, max-age=31557600`, cache Cloudflare în față (`cf-cache-status: HIT`).
- Fiecare `<img>` randat de temă (110/127 pe homepage, toate cardurile de produs, galeria, bannerele) are `srcset` (până la 18 candidați, 200w-2800w/3200w), un `sizes` adaptat layout-ului și atribute `width`/`height` (CLS-safe). 100/127 imagini de pe homepage folosesc `loading="lazy"` nativ; hero-ul are `loading="eager" fetchpriority="high" sizes="100vw"` și un crop mobil art-directed `<picture><source media="(max-width: 699px)">` (`header-mobile.jpg` 1200x1600).
- Galeria de produs: prima imagine `loading="eager" fetchpriority="high"`, restul `loading="lazy"`; thumbnail-urile folosesc `sizes="(max-width: 699px) 56px, 64px"` cu `widths: '80,160'` pentru mini-cart (`sections__main-product.liquid` linia 78).
- `snippets__product-card.liquid` încarcă eager doar primele 3 carduri (logica `position`, liniile 19/79-82) și marchează imaginea de hover cu `fetchpriority: 'low'` (linia 91).
- Packshot-urile de produs sunt 1:1, pe fundal alb, la rezoluție mare (82 la 4000x4000, 49 la 3500x3500): eligibile pentru Google Shopping / Google Images fără re-fotografiere.
- 336/355 imagini principale de articol au alt; 2167/2210 imagini din corpul articolelor au alt; cardurile de articol de pe `/blogs/news` au `width`/`height`/`srcset`/`sizes`.
- Există intrări în sitemap-ul de imagini pentru toate cele 185 produse și 354 articole (`<image:title>` = titlul produsului/articolului).
- Product JSON-LD custom (`schema-product-enhanced`) listează fiecare imagine de produs la `width=1000` (ex. `product-baton-1.jsonld`: 2 din 2 imagini) — atunci când blocul se parsează (vezi constatările SCHEMA).

### Constatări

#### IMAGES-01 — 493/493 imagini de produs fără alt text stocat; fallback-ul storefront-ului dă fiecărei imagini a unui produs același titlu brut

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| High | FIXED (live 12.10.2026) | M | 0.95 |

**Dovezi:** `$R/shopify/products-all.json`: 185 produse, 493 imagini, `images_without_alt` = 493 (100 %), 185/185 produse cu *toate* imaginile fără alt; nodurile brute din API (`products-p1..p4.json`) au `altText` = `''` pe 493/493. Pe storefront `image_tag` cade pe titlul produsului, deci alt-ul randat e titlul verbatim: `$R/pages/product-creatina-creapure.html` img #3-#9 toate `alt="Creatine (Creapure®)"`, inclusiv tabelul nutrițional `creapure.jpg` (603x883); homepage img #96-#103: patru imagini diferite (`01_PRIMECLUSTER_Pineapple`, `_Raspberry`, `_StrawberryKiwi`, `cluster_specificatii.jpg`) toate `alt="Cluster Insulin Bomb 1kg/33serv"`. 41 produse au ≥ 4 imagini cu același alt (`prime-whey-2000g` 14 imagini, `prime-whey-1000g` 11, `pure-isolate-2000g` 8, `shaker-premium-accesorizat-500-ml` 7). Aroma nu apare niciodată în alt, deși e în numele fișierului (`01_PRIMEPUREISOLATE_bourbonvanilla_2000g_front.jpg` → alt „Pure Isolate 2kg/74 serv”). Alt-ul stocat gol se propagă în sitemap-ul de imagini (`child1.xml`: `<image:caption></image:caption>` 185/185) și în fiecare feed de canal (Google & YouTube, aplicația Shop, Facebook) care citește `altText`.

**Impact / pagini afectate:** 185/185 produse, 493 imagini (MNX 314, suplimente 179), ambele seturi `/products/` și `/ro-hu/products/`.

**Recomandare:** Verificare: `applied/alt-text-plan.json` conține 493 rânduri (`media_id`, `handle`, `position`, `alt`) cu 493 alt-uri distincte din 493, de 86-125 caractere (mediană 116), scrise după imaginea reală — ex. `creatina-creapure` poziția 1 „Creatine (Creapure®) de la Prime, tub negru de 500 g cu etichetă roșu-negru și sigla Creapure, vedere din față”, poziția 2 „… listată pe site-ul oficial creapure.com ca producător partener din România”; `cluster-insulin-bomb-1000g` poziția 4 „Tabel cu valori nutriționale Cluster Insulin Bomb 1kg/33serv per porție de 30 g și per 100 g: carbohidrați, creatină, EAA”; `pure-isolate-2000g` poziția 1 „… aromă Bourbon Vanilla, 2000 g, văzută din față”; jurnalul aplicării: `applied/logs/alt-text-all.json`. Proprietarul confirmă în Admin → Products → (produs) → Media → „Alt text” sau cu `curl -s https://primesupplements.ro/products/creatina-creapure | grep -o 'alt="[^"]*"'` (două alt-uri diferite). Rămâne: (1) la următoarea regenerare a sitemap-ului, `<image:caption>` trebuie să devină nevid; (2) pentru produsele noi se aplică șabloanele specialistului (aromă + gramaj + vedere, 10-125 caractere, fără keyword stuffing; pentru infografice „Tabel nutrițional și mod de administrare {Produs} {gramaj}”); (3) opțional, întărirea temei ca un alt gol să nu mai ajungă niciodată în HTML:

```liquid
{%- comment -%} snippets/product-card.liquid, linia 87 (imaginea principală a cardului) {%- endcomment -%}
alt: product.featured_media.alt | default: product.title
{%- comment -%} snippet-ul galeriei de produs {%- endcomment -%}
alt: media.alt | default: product.title
```

Evitați aplicațiile de auto-alt care ștampilează „{title} – Prime Supplements” pe fiecare imagine: reproduc exact problema de azi.

**Cum verificăm (falsificabilitate):** un export nou de produse arată `images_without_alt` 0/493; `curl` pe `/products/creatina-creapure` arată două alt-uri diferite pentru cele două imagini din galerie; `child1.xml` arată `<image:caption>` nevid.

**Indicator timpuriu:** GSC → Performance → tip de căutare „Image”: afișările pe interogări de produs cresc în 4-8 săptămâni; avertismentele `image_link` din Merchant Center dispar.

#### IMAGES-02 — Hero-ul homepage (imaginea LCP), logo-ul și cele șase tile-uri de categorie se livrează cu `alt=""`

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| High | OPEN | S | 0.95 |

**Dovezi:** `$R/parsed/home.json`: 24/127 imagini cu alt gol. Above the fold: `logo-prime-negru.svg` (#0) și `logo-site-alb.svg` (#1, #124) `alt=""` — logo-ul din header este link-ul către homepage, deci fără un `aria-label` pe ancoră (neverificabil în export) link-ul nu are nume accesibil; `header-desktop.jpg` 2800x1000 (#2, `loading="eager" fetchpriority="high"`, candidatul LCP) `alt=""`; `<source>`-ul mobil `header-mobile.jpg` 1200x1600 nu are nici el alt (alt-ul stă pe `<img>`). Cele șase tile-uri de categorie cu link, `pre-workout.jpg`, `shoturi.jpg`, `dailyvitamin.jpg`, `accesorii.jpg`, `aminoacizi.jpg`, `pure.jpg` (1200x1400, #3-#8), toate `alt=""`. Identic pe `$R/parsed/pages_homepage-ro-hu.json` (24/127). Hero-ul e și imaginea pe care Google o alege cel mai probabil pentru homepage în Discover/Images și nu are niciun echivalent text.

**Impact / pagini afectate:** `/` și `/ro-hu/` (2 URL-uri, 24 imagini fiecare); logo-urile se repetă pe fiecare pagină a site-ului (3 per pagină: 2 variante în header + footer).

**Recomandare:** Nimic aplicat — remedierea din 12.10 a acoperit doar imaginile de produs, nu fișierele din Shopify Files. Fiind active din Content → Files referențiate de setările secțiunilor, fix-ul e de date, nu de cod: Admin → Content → Files → fișier → „Alt text”: `logo-prime-negru.svg` / `logo-site-alb.svg` → „Prime Supplements – suplimente nutritive și echipament MNX”; `header-desktop.jpg` + `header-mobile.jpg` → descrierea vizualului (ex. „Sportiv în sală cu Prime Whey și shaker Prime Supplements”); tile-uri → „Pre-workout Prime Supplements – categoria pre-antrenament”, „Shot-uri lichide Prime Supplements”, „Vitamine zilnice – Daily Vitamin”, „Accesorii fitness: shakere, centuri, prosoape”, „Aminoacizi EAA și BCAA”, „Pure Isolate – izolat proteic”. `image_tag` din tema Impact preia automat alt-ul fișierului; dacă secțiunea tile-urilor are un câmp „image alt”, se completează acolo.

**Cum verificăm (falsificabilitate):** `grep -o '<img[^>]*header-desktop[^>]*>' home.html | grep -o 'alt="[^"]*"'` întoarce un alt nevid; numărul de imagini cu alt gol pe `/` scade de la 24 la ≤ 3 (doar imaginile „reveal” pur decorative).

**Indicator timpuriu:** Lighthouse Accessibility „Image elements have [alt]” trece; afișări GSC Image pe interogări de brand.

#### IMAGES-03 — Bannerele de colecție, tile-ul promo și banda lifestyle „1.jpg/2.jpg/3.jpg” au alt gol și nume de fișier de aparat foto pe fiecare șablon

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Medium | OPEN | S | 0.9 |

**Dovezi:** `$R/parsed/pages_collection*.json`: 7-8 imagini cu alt gol per pagină de colecție. Bannere cu `fetchpriority="high"` și `alt=""`: `HILA_13_13_31_59_0798.jpg` 4000x2667 (`/collections/pudra-proteica`), `ER4A4759_fd9dfd90-....jpg` 5472x3648 (`/collections/haine-mnx`). Tile-ul promo din grilă `promotion-produt.jpg` 1600x1000 `alt=""` (typo în numele fișierului). Banda din footer `1.jpg`, `2.jpg`, `3.jpg` (1500x1800, `loading="lazy"`, `alt=""`) apare pe homepage (#48-#50), pe fiecare pagină de produs (`$R/parsed/pages_product*.json`: 6 alt-uri goale fiecare = 2 logo-uri header + 1/2/3.jpg + logo footer) și pe fiecare pagină de colecție. Tot pe homepage: `prime-health-d.jpg` 3200x1600 (#63), galeria „shop the look” `01_PRIME_COMBAT_PRO_Mango_660g_front_e21f38cf...jpg` 4000x2806, `HILA_13_15_25_20_1666.jpg`, `HILA_13_12_43_04_0431.jpg`, `HILA_13_12_37_10_0397.jpg`, `HILA_13_12_58_08_0530.jpg`, `image00001_4ccb020e-....jpg` 6000x4000, `after4d.jpg`, `shop-the-look.jpg` (#88-#95), `reveal-scroll-d.jpg`/`reveal-m.jpg` (#104-#105) — toate `alt=""`. Pagina Despre noi: `HILA_13_14_11_19_1089.png`, `HILA_13_12_29_40_0332.png` (4000 px, eager); Contact: `HILA_13_14_10_38_1061.png` `alt=""`.

**Impact / pagini afectate:** 23 pagini de colecție (×2 cu `/ro-hu/`), 185 pagini de produs (×2), home (×2), 3 pagini de magazin: 3-8 imagini de temă cu alt gol per pagină; ~20 fișiere distincte din Files.

**Recomandare:** Nimic aplicat. Content → Files → alt text pentru fiecare fișier (română, descriptiv: „Sportivă pregătind un shake cu Prime Whey în sală”); fundalurile pur decorative (`reveal-scroll-d.jpg`, `reveal-m.jpg`) rămân cu alt gol **și** primesc `role="presentation"` în Liquid-ul secțiunii, ca auditoarele să nu le mai semnaleze. Re-încărcați, când e convenabil, cadrele lifestyle folosite des cu nume descriptive lowercase (`prime-whey-antrenament-sala.jpg`) — Shopify nu poate redenumi fișiere pe loc. Imaginile de colecție au `altText` gol în Admin (fapt din recon), deci alt-ul se completează și în Products → Collections → (colecție) → Image.

**Cum verificăm (falsificabilitate):** `grep -c 'alt=""' pages/collection.html` scade de la 8 la ≤ 2 (logo-urile rămân până la IMAGES-02).

**Indicator timpuriu:** scorul de accesibilitate; fără KPI SEO direct (nu sunt imagini de produs).

#### IMAGES-04 — 40 % din fișierele imaginilor de produs au nume de aparat foto, WhatsApp, derivate WordPress sau UUID; 89 % conțin majuscule sau underscore

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Medium | OPEN | L | 0.85 |

**Dovezi:** din cele 493 nume de fișier din `all-product-images.json`: 99 nume de aparat/telefon/export (`DSC05906-scaled-1.avif`, `DSC09702.avif`, `IMG_14951.jpg`, `IMG_14921.jpg` pe `prosop-negru`, `WhatsApp-Image-2024-04-27-at-14.14.20_17940299.jpg` ×3 pe `shaker-premium-accesorizat-500-ml`, `WhatsAppImage2026-04-29at12.41.28.jpg` pe `prime-shaker-customised`, `HILA_13_14_30_17_1208_a883964f-....jpg`, `image00001_...jpg`, `ALLMERCH321.jpg`, `ALL_MERCH_3_03.jpg`, `174E1E0F-65E4-4D6C-9261-2EC8E985AF48.jpg`, `187304_ochi.jpg`); 92 derivate WordPress (`-scaled`, `-1540x2048`, `-jpg.webp`, `-jpg.avif`, ex. `DSC05913-scaled-1-1540x2048.avif`, `HAMMER-SHORTS-3.0-BLACK-11-jpg.webp`, `INDUSTRIAL-HOODIE-DUSTY-ROSE-4-jpg_2bb22ad9-....avif`); 29 nume cu sufix UUID de re-upload Shopify (`01_PRIME_CREATINE_Creapure_500g_front_508a0239-fe0e-4167-9d15-12bc1a93fc8c.jpg` — imaginea principală a celui mai vândut produs); 441/493 conțin majuscule, 165 underscore. Packshot-urile de suplimente urmează o convenție internă (`01_PRIMEPUREISOLATE_bourbonvanilla_2000g_front.jpg`) informativă, dar fără cuvinte-cheie în română („creatina”, „proteina” nu apar în niciun nume). Aceleași nume sunt URL-ul afișat de Google Images și `<image:loc>` expus de sitemap.

**Impact / pagini afectate:** 493 imagini de produs (MNX 314 — aproape toate în stil DSC/HILA/EDGE-HOODIE — suplimente 179).

**Recomandare:** Nimic aplicat; Shopify nu redenumește fișiere, deci incremental: (a) pentru orice încărcare *nouă* `prime-<produs>-<aroma>-<gramaj>-<vedere>.jpg`, lowercase, cratime, ASCII (`prime-pure-isolate-bourbon-vanilla-2kg-fata.jpg`, `mnx-hanorac-industrial-dusty-rose-fata.jpg`); (b) re-upload (apoi ștergerea media vechi) doar pentru cele ~30 best-seller-uri + cele 9 infografice de rezoluție mică din IMAGES-09, re-introducând la upload alt-ul din `applied/alt-text-plan.json` (alt-ul e legat de `media_id`, deci se pierde la ștergere); (c) niciodată derivate WordPress (`-scaled`, `-1540x2048`) — se încarcă JPEG-ul original și CDN-ul redimensionează.

**Cum verificăm (falsificabilitate):** ponderea numelor care se potrivesc cu `^(DSC|IMG_|WhatsApp|HILA_|ALL_?MERCH|image0000|[0-9A-F-]{36})` scade sub 10 % în următorul export.

**Indicator timpuriu:** afișări Google Images pentru „creatina creapure” / „pure isolate” cu packshot-ul produsului.

#### IMAGES-05 — Sitemap de imagini: doar imaginea principală (185 din 493), caption-uri goale, imaginile colecțiilor lipsesc și fiecare imagine e listată de două ori prin `/ro-hu/`

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Medium | PENDING (acțiune proprietar) | S | 0.9 |

**Dovezi:** `$R/sitemaps/child1.xml`: 185 blocuri `<image:image>` = exact unul per produs (37,5 % din cele 493 imagini); `<image:caption></image:caption>` gol pe 185/185 (Shopify umple caption-ul din `altText`, gol la data auditului — IMAGES-01); `<image:title>` = titlul produsului; `<image:loc>` trimite la fișierul original de pe `cdn.shopify.com/s/files/1/0917/5138/3415/files/…jpg?v=…` fără `width=` (185/185), care pentru packshot-urile 4000x4000 înseamnă 423.802 B WebP (`01_BATONPROTEIC_strawberry_front.jpg` original, HEAD live). `child2.xml` (colecții): 0 intrări de imagine, deși colecțiile au imagini (`/collections/pudra-proteica` og:image = `/cdn/shop/collections/01_PRIME_WHEY_bourbon_vanilla_2000g_front_af73df8a-….jpg`). `child5.xml` (articole): 354 intrări de imagine, `<image:caption>` absent. `child7.xml` și `child11.xml` (gemenii `/ro-hu/`) repetă identic cele 185 + 354 valori `<image:loc>` sub URL-urile `/ro-hu/…` (diff-ul celor două liste de loc = 0 linii), deci Google primește două asocieri de pagină pentru fiecare imagine.

**Impact / pagini afectate:** 539 intrări de imagine (185 produse + 354 articole) ×2 sitemap-uri; 308 imagini de produs niciodată listate.

**Recomandare:** Sitemap-urile de produse/articole sunt generate de Shopify și nu se editează; cele trei pârghii au stări diferite: (1) `altText` completat live pe 493/493 (IMAGES-01) → caption-urile se umplu la următoarea regenerare — Verificare: `curl -s https://primesupplements.ro/sitemap_products_1.xml?from=…` trebuie să arate `<image:caption>` nevid; (2) Product JSON-LD valid cu tot array-ul `image` stă în tema de test (`theme-fixes/snippets/schema-product-enhanced.liquid`, filtrul `json` în locul lui `escape`) — după publicare Google poate descoperi imaginile 2-14 ale fiecărui produs; (3) eliminarea prezenței web `/ro-hu` (`gid://shopify/MarketWebPresence/73400189303`, `webPresenceDelete` validat, neexecutat — modificare a setărilor de vânzare, decizie a proprietarului) sau noindex pe ea (TECH) înjumătățește asocierile duplicate. `<image:loc>` la dimensiunea originală e acceptabil pentru Google Images (preferă versiunea cea mai mare).

**Cum verificăm (falsificabilitate):** după regenerare, sitemap-ul de produse are caption-uri nevide; GSC → Sitemaps arată „Images discovered” apropiat de numărul URL-urilor de produs; după ștergerea `/ro-hu`, `sitemap.xml` listează 7 sitemap-uri copil în loc de 13.

**Indicator timpuriu:** afișări GSC Image per URL de produs.

#### IMAGES-06 — Meta tag-uri Open Graph / Twitter: schemă `http://`, dimensiuni declarate nepotrivite, `twitter:image:alt` gol, fallback la imaginea homepage-ului

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Medium | READY (tema de test – de publicat) | S | 0.9 |

**Dovezi:** `$R/home.html`: `<meta property="og:image" content="http://primesupplements.ro/cdn/shop/files/prime-supplements.jpg?v=1747657200&width=2048">` cu `og:image:secure_url` https și `og:image:width/height` 1200x628, deși URL-ul cere o randare de 2048 px. Live: `curl -I http://primesupplements.ro/cdn/shop/files/prime-supplements.jpg?…` → `301 Moved Permanently` → https (orice scraper trebuie să urmeze un redirect; fetcher-ele mai vechi WhatsApp/LinkedIn renunță la preview). Pagina de produs `product-creatina-creapure.html`: `og:image` http, `og:image:width="4000" og:image:height="4000"`, dar URL-ul e `width=2048` (dimensiune declarată ≠ servită; Facebook folosește dimensiunea declarată pentru layout); `twitter:image` e un crop central 1200x1200; `twitter:image:alt=""` pe toate tipurile de pagină (home, produs, colecție, articol). `collection-reduceri.html` cade pe `prime-supplements.jpg` generic (colecția nu are imagine); og:image-ul articolului e fișierul de aparat `HILA_13_16_35_43_2090_cc4beccf-….jpg`. Cauza: snippet-ul custom `snippets/social-meta-tags.liquid`.

**Impact / pagini afectate:** toate cele ~1151 URL-uri (fiecare pagină emite snippet-ul).

**Recomandare:** Verificare: `theme-fixes/snippets/social-meta-tags.liquid` din tema de test emite `content="https:{{ page_image | image_url: width: 2048 }}"` pe `og:image`, `og:image:secure_url` și `twitter:image`, iar `twitter:image:alt` = `{{ page_image.alt | escape }}` — pe produse acum nevid, pentru că alt-urile au fost completate live (IMAGES-01). După publicare: `curl -s https://primesupplements.ro/ | grep -o '<meta property="og:image" content="[^"]*"'` începe cu `https://`. Rămâne (neacoperit de tema de test): `og:image:width/height` ies în continuare din `page_image.width/height` (4000x4000 declarat pentru 2048 px servit); lipsesc crop-ul 1200x630 și `og:image:type`; pe home/colecții `twitter:image:alt` rămâne gol până la IMAGES-02/03. Expresiile specialistului pentru pasul următor în același snippet:

```liquid
{{ image | image_url: width: 1200, height: 630, crop: 'center' }}
{{ url | prepend: 'https:' }}
<meta name="twitter:image:alt" content="{{ page_image.alt | default: page_title | escape }}">
```

cu `og:image:width` 1200 / `og:image:height` 630 potrivite și `og:image:type` `image/jpeg` (`image_url` întoarce URL protocol-relativ, de aceea `prepend: 'https:'`; packshot-urile pe fundal alb se decupează sigur la 1200x630). Dați colecției „Reduceri” și celorlalte 7 colecții fără imagine o imagine de colecție, ca preview-ul OG să nu fie bannerul generic.

**Cum verificăm (falsificabilitate):** og:image pe `/` începe cu `https://`; Facebook Sharing Debugger nu arată avertisment de redirect și folosește imaginea 1200x630; `twitter:image:alt` nevid.

**Indicator timpuriu:** CTR-ul preview-urilor din Facebook/WhatsApp (sesiuni referral din social în GA4).

#### IMAGES-07 — Imaginile din corpul articolelor (șablon BlogGenAuto): fără `width`/`height`, 43 alt-uri goale, thumbnail-uri de produs aduse la originalul de 4000 px, alt-uri cu cuvinte-cheie și an

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Medium | OPEN | M | 0.85 |

**Dovezi:** `$R/shopify/articles-p1.json` (primele 50 articole, 185 `<img>` în corp): atribute `width`/`height` pe 0/185 (fiecare imagine e dimensionată doar prin `style="width: 120px; height: 120px; object-fit: cover"` sau `max-width:100%; height:auto`, deci browserul nu poate rezerva spațiu înainte de încărcare → CLS pe fiecare articol); `alt=""` pe 45/185 (la nivel de site 43/2210 conform `articles-all.json`); `loading="lazy"` pe 139/185. Cardurile de produs din articol referă fișierul original fără parametru de dimensiune, ex. `article-2026-citicolina.html` img #5: `src="https://cdn.shopify.com/s/files/1/0917/5138/3415/files/01_NITRO_Ice_Blueberry_660g_front.jpg?v=1749666698"` afișat la 120x120 px — originalul 4000x4000 al unui packshot comparabil cântărește 423.802 B WebP (HEAD live pe `01_BATONPROTEIC_strawberry_front.jpg`), adică ~400 KB pentru un thumbnail de 120 px, repetat pentru fiecare produs legat (mediană 3 carduri per articol). Calitatea alt-urilor: șiruri cu prefix de cuvânt-cheie și an (`"Nitrox NO-STIM supliment pre-workout fără cafeină pentru rutina perfectă de antrenament de seară în 2026"`, 17/185 conțin 2025/2026), alt-ul pozei autorului `"Marius Chera , Nutritionist &amp; Bodybuilding Coach"` repetat de 41×, `"Pure Isolate 2kg/74 serv"` de 6×. `silicoane-mai-mari.png` pe `/blogs/news/bcaa-vs-eaa-…` are `alt=""` și fără dimensiuni.

**Impact / pagini afectate:** 354 articole, 2210 imagini în corp (×2 cu `/ro-hu/`).

**Recomandare:** Nimic aplicat pe imagini; corpurile curățate pregătite (`blog-cleanup/cleaned-bodies.tar.gz`, import blocat, de făcut de proprietar prin Matrixify) ating doar poza autorului: `blog-cleanup/clean.py` înlocuiește `alt="Marius Chera , Nutritionist &amp; Bodybuilding Coach"` cu `alt="Marius Chera, antrenor de culturism și nutriționist sportiv"` (`author_alt_fixed` = 346 în `cleanup-report.json`) și doar numără alt-urile goale (`img_empty_alt` = 46; comentariul din script: „leave for now (handled by image task)”). De făcut în șablonul BlogGenAuto sau într-o trecere regex peste cele 354 corpuri (aceeași foaie Matrixify „Blog Posts: ID, Body HTML” sau `articleUpdate` din Admin API): (1) `&width=240` (2× din 120 px) la URL-urile cardurilor de produs și `&width=1200` la imaginile hero/din corp; (2) `width="120" height="120"` potrivite cu caseta randată; (3) alt = nume produs + formă (`"Nitrox NO-STIM 660 g – pre-workout fără cofeină"`), fără an, fără adjective de marketing; (4) completarea celor 43 alt-uri goale (lista în `articles-all.json` → `body_images_without_alt`).

**Cum verificăm (falsificabilitate):** pe un re-export, verificarea de tip `grep -c 'files/01_[^"]*\.jpg?v=[0-9]*"' articles-bodies/*.txt` → 0 thumbnail-uri de produs fără `width=`; lista de elemente CLS din Lighthouse nu mai conține `.article__body img`.

**Indicator timpuriu:** ponderea CLS „good” în CrUX pentru `/blogs/news/*` odată ce există date de teren; LCP-ul articolului (imaginea principală) neafectat.

#### IMAGES-08 — Imaginile principale ale articolelor: 19 fără alt, 327/354 sunt PNG-uri generate AI cu nume de timestamp sau cu promptul întreg, fără `fetchpriority` pe imaginea LCP

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Medium | OPEN | S | 0.85 |

**Dovezi:** `articles-all.json`: 355/355 au imagine principală, 19 fără alt (`ce-este-un-pre-workout-fara-cofeina`, `cum-te-ajuta-combat-pro-sa-ti-cresti-masa-musculara`, `cum-contribuie-l-carnitine-1000-la-arderea-grasimilor`, `glycerolul-secretul-culturistilor-…`, `bcaa-vs-eaa-diferențe-și-beneficii-…`, `water-out-tinctura-…`, `gymbeam-creatine-creatina-monohidrat-micronized-300g-fara`, `vitamine-b12-90-zile-vitamina-d3-k2`, `gainer-prime-whey-2000g-seasonal-protein`, `mass-gainer-prime-whey-1000g-protein-cooking`, `citicolina-ghid-pre-workout-fara-cafeina`, `citicolina-conexiune-musculara-…-travel-2026`, `intra-workout-dozaj-optim-…`, `tricou-sala-cele-mai-bune-tricouri-yoga`, `creatine-benefits-creatina-creapure-…`, `proteina-isolate-whey-emperor-mass_3000g-…`, `dextrina-ciclica-intra-workout-…`, `creatina-si-volumizarea-musculara-cum-sa-stii-…`, `creatina-si-volumizarea-musculara-secretele-absorbtiei-…`); fără alt, tema cade pe titlul articolului (`article.html` img #3 alt = H1-ul). Numele din `child5.xml`: 327 PNG / 27 JPG; 287 urmează `blog-<slug>-<timestamp de 13 cifre>.png` (`blog-l-carnitine-1000-80-caps-travel-weight-loss-tips-1791673322733.png`), 4 sunt promptul AI literal (`genereaza-un-flacon-de-pre-workout-pe-masa-pe-care-sa-scrie-no-caffeine-pre-workout-dar-sa-nu-fie-brandurit-…-si-o-stic.png`, 209 caractere; `generaza-o-imagine-grafica-cu-o-creatina-intr-o-piramida-a-suplimentelor-ea-fiind-in-top-ul-acesteia.png` pe articolul citicolina), 8 nume de aparat (`HILA_…`). Livrarea rămâne WebP (live: randarea PNG de 1376 px → `image/webp` 105.356 B), deci sursa PNG doar umflă stocarea și fetch-ul la dimensiune originală. Markup-ul imaginii principale (`article.html` img #3): `width="1500" height="1000" sizes="(max-width: 1149px) 100vw, 1000px"`, fără `loading` (corect), dar **fără `fetchpriority="high"`**, deși e elementul LCP al articolului.

**Impact / pagini afectate:** 354 articole (×2 cu `/ro-hu/`).

**Recomandare:** Nimic aplicat: `title_tag`/`description_tag` au fost rescrise pe 354 articole, dar alt-ul imaginii principale nu a fost atins, iar `theme-fixes/sections/main-article.liquid` din tema de test deleagă randarea imaginii snippet-ului `article-banner` (nemodificat), deci `fetchpriority` lipsește și acolo. De făcut: alt text pentru cele 19 articole în editorul de articole (română, descrie imaginea, nu titlul: „Flacon de pre-workout fără cofeină Nitrox NO-STIM pe masă lângă căști și o sticlă de apă”); configurarea BlogGenAuto (sau a pasului de upload) să exporte JPEG calitate 80, ≤ 1600 px, numit `prime-blog-<subiect>.jpg`, și să nu mai folosească promptul ca nume de fișier; în snippet-ul `article-banner` (randarea imaginii principale) `fetchpriority: 'high'` pe primul `image_tag`.

**Cum verificăm (falsificabilitate):** `articles-all.json` → `featured_image_alt` true pe 355/355; numele noi din sitemap nu se mai potrivesc cu `-[0-9]{13}\.png$`; `grep fetchpriority article.html` lovește imaginea principală.

**Indicator timpuriu:** LCP-ul Lighthouse al unui URL de articol se îmbunătățește cu întârzierea de descoperire a imaginii (~100-300 ms).

#### IMAGES-09 — 9 imagini secundare de produs (tabele nutriționale/infografice) sunt sub 1000 px și se upscalează într-o galerie de 730 px; 57 produse au o singură imagine

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Medium | OPEN | M | 0.85 |

**Dovezi:** `all-product-images.json`: imagini sub 1000 px lățime: `water_out.jpg` 487x914 (`water-out-120-caps`), `creapure.jpg` 603x883 (`creatina-creapure`, al doilea cel mai legat produs — randată ca imaginea #2 din galerie cu `sizes="… min(730px, 40vw)"`, deci pe un desktop 2× browserul are nevoie de ~1460 px și primește 603), `thermo_core.jpg` 823x1107, `nitrox3D.jpg` 733x958, `pure_isolate.jpg` 900x951, `unt_migdale.jpg` 979x856 și cele trei `WhatsApp-Image-2024-04-27-…jpg` de 800x800 pe `shaker-premium-accesorizat-500-ml` (singurele lui fotografii). Google Images și Merchant Center preferă ≥ 1200 px pe latura lungă. Separat, 57/185 produse au exact o imagine (53 suplimente, ex. `turmeric-extract-80-caps`, `vitamina-d3-k2`) — fără etichetă spate, fără cadru de scară/lifestyle, deci `additional_image_link` din Shopping e gol și Google Images are un singur candidat per produs.

**Impact / pagini afectate:** 9 imagini pe 8 produse; 57 produse cu o singură imagine.

**Recomandare:** Nimic aplicat (alt-urile noi descriu și aceste imagini, dar rezoluția rămâne). Re-exportați cele 6 infografice nutriționale/de specificații la ≥ 1600 px (sunt layout-uri vector/text: re-randare, nu upscale) și re-încărcați-le cu nume descriptive (IMAGES-04); re-fotografiați shaker-ul pe alb la ≥ 1500 px. Adăugați cel puțin o imagine de etichetă/spate celor 53 de suplimente cu o singură imagine (pipeline-ul de packshot 4000x4000 există deja: `01_…_front.jpg` sugerează că variantele `_back`/`_label` sunt disponibile).

**Cum verificăm (falsificabilitate):** nicio imagine de produs sub 1000 px în următorul export; produse cu o singură imagine < 20.

**Indicator timpuriu:** avertismente de calitate a imaginii în Merchant Center; afișări Google Images per produs.

#### IMAGES-10 — Over-fetch pe bannere: bannerele de colecție folosesc `sizes="130vw"` pe fișiere de aparat de 4000-5472 px; randarea hero-ului e de 210 KB WebP; imaginea shop-the-look are sursă de 6000x4000

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Medium | OPEN | S | 0.8 |

**Dovezi:** `collection.html`: `<img src="…HILA_13_13_31_59_0798.jpg?…&width=4000" alt="" width="4000" height="2667" fetchpriority="high" sizes="130vw">` cu srcset până la 3200w (bannerul parallax din Impact); la un viewport de 1920 px, 130vw = 2496 px → browserul alege candidatul 2600w: HEAD live `…&width=2600` → `image/webp` 298.324 B, cu prioritate mare, pe fiecare pagină de colecție (`collection-haine-mnx.html`: `ER4A4759_….jpg` 5472x3648, același markup). Hero-ul homepage `header-desktop.jpg?width=2800` = 210.712 B WebP (322.050 B JPEG) la `sizes="100vw"` — peste ținta de 200 KB pentru hero; pe mobil `<source>` servește `header-mobile.jpg` până la 1200w (OK). „Shop the look” `image00001_4ccb020e-….jpg` 6000x4000 cu `sizes="(max-width: 999px) 100vw, 1000px"` → candidatul 2000w pe ecrane 2× = 338.594 B WebP pentru o imagine sub fold, lazy, cu `alt=""`. Galeria de produs: srcset până la 3200w pentru un slot de `min(730px, 40vw)` → telefoanele 3× cer randări de 2200w+ ale packshot-urilor 4000x4000 (nemăsurat).

**Impact / pagini afectate:** 23 pagini de colecție (×2), `/` (×2), 185 galerii de produs.

**Recomandare:** Nimic în tema de test (nu conține `main-collection.liquid`). În blocul de banner din `sections/main-collection.liquid` (și în secțiunea „image banner” din Impact) setați `sizes="100vw"` (sau dezactivați parallax-ul, care forțează 130vw) și limitați `widths` la `'400,600,800,1000,1200,1600,2000'`; re-exportați hero-ul la 2000 px / calitate 75 (țintă ≤ 150 KB WebP) și imaginea shop-the-look la 2000 px; în snippet-ul galeriei limitați lista `widths` la 2000. Păstrați `fetchpriority="high"` doar pe bannerul LCP.

**Cum verificăm (falsificabilitate):** HEAD pe candidatul de banner ales pe un desktop de 1920 px (`width=2000`) ≤ 180 KB; Lighthouse „Properly size images” nu mai listează niciun banner.

**Indicator timpuriu:** LCP pe `/collections/*` în Lighthouse/CrUX.

#### IMAGES-11 — Homepage-ul repetă aceleași imagini de produs de trei ori și poartă 130 KB de markup `srcset` (21 % din HTML-ul de 630 KB)

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Low | OPEN | S | 0.8 |

**Dovezi:** `home.html`: 127 `<img>`, 115 atribute `srcset` totalizând 130.481 bytes; aceleași produse featured apar în trei secțiuni (`ALL_MERCH_3_03.jpg`, `ALL_MERCH_3_01.jpg`, `ALL_MERCH_3_17_…jpg`, `ALL_MERCH_3_15.jpg`, `01_PRIMEPUREISOLATE_bourbonvanilla…`, `01_PRIMEPUREISOLATE_caffeelatte…`, `creapure.jpg`, fiecare de 2-3×: indecșii parsați #19-#22, #64-#67, #76-#79). `snippets/product-card.liquid` linia 87 emite `widths: '200,300,400,500,600,700,800,1000,1200,1400,1600,1800'` (12 candidați) pentru imaginea principală **și** pentru cea de hover (linia 91), adică 24 URL-uri per card, deși cardul are cel mult ~460 px lățime (`sizes` → `calc((100vw - 96px) / 4 …)`).

**Impact / pagini afectate:** `/`, `/ro-hu/` și fiecare pagină de colecție/produs care randează carduri (homepage-ul de 630 KB și paginile de produs de 345 KB sunt în mare parte acest markup).

**Recomandare:** Nimic în tema de test. Tăiați `widths` la `'300,400,600,800,1000,1200'` (acoperă DPR 3× la 400 px) în `product-card.liquid` liniile 87 și 91; arătați fiecare produs o singură dată pe homepage (înlocuiți una dintre cele trei secțiuni featured-collection cu un bloc de categorii/blog). Economie estimată ~60-70 KB necomprimat pe homepage, ~15 KB pe paginile de produs.

**Cum verificăm (falsificabilitate):** `grep -o 'srcset="[^"]*"' home.html | wc -c` < 70.000.

**Indicator timpuriu:** intervalul TTFB → DOMContentLoaded în Lighthouse; dimensiunea de transfer a HTML-ului.

#### IMAGES-12 — O a doua imagine `fetchpriority="high" loading="eager"` stă sub fold pe homepage (secțiunea featured product)

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Low | OPEN | S | 0.8 |

**Dovezi:** `home.html` are 3 imagini `fetchpriority="high"`: hero-ul (#2) și `01_PRIMECLUSTER_Pineapple_1000g_front.jpg?width=4000` (indexul parsat #96 din 127, `loading="eager" fetchpriority="high"`, sursă 4000x4000, `sizes="(max-width: 740px) calc(100vw - 40px), (max-width: 999px) calc(100vw - 64px), min(730px, 40vw)"`) randată de secțiunea „featured product” plasată după ~95 alte imagini; a treia e în `<picture>` pentru hero-ul mobil. Imaginea Cluster concurează cu hero-ul și cu Google Fonts (render-blocking) pentru lățime de bandă în primele 2 s, deși nu e vizibilă.

**Impact / pagini afectate:** `/`, `/ro-hu/`.

**Recomandare:** Nimic în tema de test. În secțiunea featured-product (Impact `featured-product` / snippet-ul de galerie partajat) transmiteți `loading: 'lazy'` și omiteți `fetchpriority` când `section.index > 2`; sau mutați secțiunea Cluster în primul ecran, dacă e oferta-hero intenționată.

**Cum verificăm (falsificabilitate):** `grep -c 'fetchpriority="high"' home.html` = 1 (plus sursa din `<picture>`).

**Indicator timpuriu:** „LCP resource load delay” al hero-ului în Lighthouse.

#### IMAGES-13 — Imagini injectate de aplicații fără dimensiuni sau lazy-loading nativ (carusel/poze de recenzie Judge.me, insignele ANPC, steagul UE)

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Low | OPEN | S | 0.85 |

**Dovezi:** `parsed/home.json`: 17 imagini fără `width`/`height`, 15 dintre ele `lazy_method: js-generic` = caruselul Judge.me „Let customers speak for us” (`<img class='jdgm-carousel-item__product-image' alt='Crema de Orez Creamy Rice Salted Caramel 1kg Prime' data-src='…/2_eca46c98-…_70x70.jpg' data-src-retina='…_140x140.jpg'/>` — stil de URL legacy `_70x70`, fără `width`/`height`, fără `src`, deci spațiul nu e rezervat până rulează scriptul widget-ului); pagini de produs: 2 poze de recenzie Judge.me (`data-src='https://review-images.judgeme.com/…'`), steagul UE `<img src="…/europe-flag-icon.webp" alt="Steag UE" class="eu-flag" />` (fără dimensiuni, fără lazy, 1 request în plus pe fiecare pagină de produs) și în footer `logo-anpc-sol…png` / `logo-anpc-sal…png` (`style="height: 50px;"`, fără `width`/`height`, fără `loading="lazy"`) pe fiecare pagină.

**Impact / pagini afectate:** fiecare pagină (insignele din footer), `/` și `/ro-hu/` (15 imagini de carusel), 185 pagini de produs (steag + poze de recenzie).

**Recomandare:** Nimic în tema de test (nu conține `footer.liquid`). Footer: adăugați `width="…" height="50" loading="lazy" decoding="async"` celor două insigne ANPC în `sections/footer.liquid`; pagina de produs: dați steagului UE `width`/`height` explicite (e într-un bloc snippet/metafield) și `loading="lazy"`; Judge.me: activați „lazy load images with native loading” în setările widget-ului, dacă există, altfel acceptați (terță parte). Nu e o problemă de ranking, ci igienă CLS.

**Cum verificăm (falsificabilitate):** `parsed/home.json` no_wh ≤ 15 (doar Judge.me rămâne); pagina de produs no_wh ≤ 2.

**Indicator timpuriu:** CLS în Lighthouse.

#### IMAGES-14 — Acolo unde există alt text, e titlul brut al produsului cu șiruri de merchandising, erori de spațiere și formulări în engleză

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Low | FIXED (live 12.10.2026) | S | 0.9 |

**Dovezi:** alt-uri de fallback observate în `home.html` / paginile de produs: `"Prime Whey 2kg/66serv"`, `"Pre Workout Nitrox 3D , 500g (25 Serviri)"` (spațiu înainte de virgulă), `"Pre Workout Fără Stimulente Nitrox NO-STIM , 660g "` (spațiu final), `"MNX Hoodie ManiaX *LIMITED*"`, `"MNX Men's lightweight hoodie Aesthetic, black"`, `"Creatine (Creapure®)"`, `"Cluster Insulin Bomb 1kg/33serv"`. Alt-urile cardurilor de blog moștenesc titlurile cu prefix de cuvânt-cheie: `"l-carnitine - L-carnitina ieftină vs premium: Semne că pierzi progresul în vacanță"`, `"omega 3 - Cum să alegi crema de orez pentru absorbție maximă: Semne de alarmă"` (`blog-index.html` img #3-#4). Din cauza celor 19 grupuri de titluri aproape duplicate (culorile MNX publicate ca produse separate), același alt apare pe URL-uri de produs diferite.

**Impact / pagini afectate:** toate imaginile de produs până la IMAGES-01; 354 carduri de blog.

**Recomandare:** Verificare: partea de produse e rezolvată de IMAGES-01 — cele 493 alt-uri din `applied/alt-text-plan.json` sunt distincte, în română, descriu imaginea (aromă, ambalaj, unghi) și nu mai au niciunul dintre artefactele de spațiere (0 cu ` ,`, 0 cu spațiu final, 0 cu an); ex. `prime-whey-2000g` poziția 2 „Prime Whey 2kg/66serv în tub negru, aromă Strawberry Cheesecake, fața etichetei cu desen de cheesecake cu căpșuni”, `mnx-hoodie-industrial-dusty-rose` poziția 2 „MNX Hoodie Industrial, dusty rose văzut din spate, cu logo X brodat ton pe ton pe umăr și glugă lăsată pe spate”. Confirmare: `curl -s https://primesupplements.ro/ | grep -o 'alt="[^"]*"' | sort | uniq -c` (niciun alt repetat pe imagini diferite). Rămâne: 72 alt-uri încă includ forma de catalog „2kg/66serv” și 9 includ `*LIMITED*`, pentru că încep cu titlul produsului — se curăță odată cu titlurile (constatare ONPAGE/ECOMMERCE); cardurile de blog — `title_tag`-urile rescrise pe 354 articole nu schimbă alt-ul, pentru că fallback-ul temei (`blog-post-card.liquid`) folosește `article.title` (H1-ul), nu metafield-ul; setați alt explicit în editorul de articole pentru imaginea principală și eliminați prefixul `"<cuvânt-cheie> - "` din titluri (constatare CONTENT), ceea ce curăță și alt-urile.

**Cum verificăm (falsificabilitate):** niciun atribut alt de pe paginile de produs nu conține ` ,`, spațiu final sau `*` ca artefact, și `/serv` dispare odată cu titlurile; niciun alt de card de blog nu începe cu `"<cuvânt> - "`.

**Indicator timpuriu:** n/a (calitate).

#### IMAGES-15 — Formatul și compresia sunt gestionate de CDN-ul Shopify; încărcarea surselor AVIF/PNG nu aduce nimic (și AVIF nu e livrat niciodată)

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Info | OPEN | S | 0.95 |

**Dovezi:** 260/493 imagini de produs sunt încărcate ca `.avif` (toate articolele MNX), 37 `.png` (33 packshot-uri de suplimente, ex. `ALLMERCH7.png` 3500x3500), 14 `.webp`, 182 `.jpg`. Live: `XFORCE-HOODIE-23-A.avif?width=1500` cu `Accept: image/avif,image/webp` → `content-type: image/webp` 107.118 B; doar cu `Accept: image/webp` → WebP identic. CDN-ul transcodează orice sursă în WebP pentru browserele moderne și JPEG altfel; nu servește AVIF browserelor capabile de AVIF, deci încărcările AVIF costă doar calitate (dublă codare lossy: AVIF din WordPress → WebP Shopify). Pe Shopify nu sunt necesare fallback-uri `<picture>` pe tip. Header-ele de cache sunt corecte (`max-age=31557600`, Cloudflare HIT).

**Impact / pagini afectate:** la nivel de catalog; fără defect la nivel de pagină.

**Recomandare:** regulă de proces, nimic de aplicat retroactiv: încărcați originalele ca JPEG de calitate mare (calitate 85-90, ≤ 3000 px); nu pre-convertiți în AVIF/WebP; PNG doar pentru grafică cu transparență. Fără modificare de temă.

**Cum verificăm (falsificabilitate):** n/a (informativ).

**Indicator timpuriu:** n/a.

#### IMAGES-16 — `decoding="async"` nu e folosit pe nicio imagine

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Info | OPEN | S | 0.7 |

**Dovezi:** `grep -c 'decoding=' home.html` = 0 din 127 `<img>`; la fel pe paginile de produs și de colecție (apelurile `image_tag` din tema Impact nu transmit `decoding`).

**Impact / pagini afectate:** toate paginile.

**Recomandare:** Nimic în tema de test. Adăugați `decoding: 'async'` apelurilor `image_tag` pentru imaginile non-LCP în `product-card.liquid` (liniile 87, 91) și `blog-post-card.liquid` (linia 41). Beneficiu minor pe thread-ul principal la grilele lungi de carduri (`/collections/all`: 52 imagini).

**Cum verificăm (falsificabilitate):** `grep -c 'decoding="async"' pages/collection-all.html` > 40.

**Indicator timpuriu:** INP/TBT pe paginile de colecție.

#### IMAGES-17 — Oportunitate Google Images / Shopping: packshot-urile sunt eligibile, dar semnalele care le-ar clasa lipsesc

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Medium | OPEN | M | 0.8 |

**Dovezi:** activele sunt corecte (packshot-uri 1:1 pe fundal alb la 3500-4000 px, îmbrăcăminte 4:5 la 1500x1875), dar: Product JSON-LD invalid pe suplimentele cu descrieri pe mai multe linii (7/13 eșantionate, constatare SCHEMA), deci array-ul `image` nu e citit; `altText` gol → fără caption în sitemap, fără alt în feed-urile canalelor; nume de fișier de aparat/non-românești; fără caption vizibil/`<figcaption>` sau `title` de imagine; culorile MNX sunt produse separate, deci aceleași fotografii lifestyle stau pe 19 grupuri de URL-uri aproape duplicate (45 produse); imaginea de colecție (folosită ca og:image) nu e în sitemap; 57 produse cu o singură imagine. Google Images și listările gratuite din Merchant Center folosesc alt-ul, textul înconjurător, numele fișierului și `image` din datele structurate ca semnale principale — toate patru slabe la data auditului.

**Impact / pagini afectate:** 185 produse.

**Recomandare:** secvența specialistului, cu starea fiecărui pas: (1) import alt (IMAGES-01) — **făcut live**; (2) fix SCHEMA (Product JSON-LD valid cu array-ul `image` complet și `Offer` per variantă, `theme-fixes/snippets/schema-product-enhanced.liquid`) — **în tema de test, de publicat**; (3) IMAGES-04 nume de fișier pentru top seller-i — deschis; (4) fuzionarea culorilor MNX într-un singur produs cu imagini per variantă (constatare ECOMMERCE) — deschis; (5) a doua imagine pentru suplimentele cu o singură imagine (IMAGES-09) — deschis. Apoi re-trimiteți sitemap-ul de produse în GSC și urmăriți tipul de căutare „Images”.

**Cum verificăm (falsificabilitate):** GSC Performance filtrat pe Search type = Image arată > 0 clicuri pe interogări de produs non-brand în 8 săptămâni de la fix-urile alt + schema.

**Indicator timpuriu:** Rich Results Test pe `/products/creatina-creapure` arată Product cu toate imaginile listate.

### Ce nu am putut măsura

- **Metricile de laborator (LCP/CLS/INP)** — fără cotă PageSpeed Insights/CrUX și fără browser headless în sandbox (scripturile plugin-ului care descarcă URL-uri eșuează prin proxy); dimensiunile în bytes provin din `curl -I` pe randările exacte pe care le selectează markup-ul, nu dintr-un waterfall real.
- **`product-gallery.liquid`, `social-meta-tags.liquid` (versiunea live) și secțiunea image-banner** — nu erau în exportul temei; comportamentul lor a fost auditat doar din HTML-ul randat (versiunea de test a `social-meta-tags.liquid` din `theme-fixes/` a fost citită abia la sinteză).
- **Statisticile imaginilor din corpul articolelor** (width/height, parametrul de dimensiune din URL, lungimea alt-ului) — din primele 50 de articole (`articles-p1.json`, 185 imagini); numerele la nivel de site (2210 imagini în corp, 43 fără alt, 19 imagini principale fără alt) vin din `articles-all.json` / `catalog-analysis.md`.
- **Clasamentele Google Images și diagnosticele Merchant Center** — fără acces DataForSEO/GMC.
- **Cererile live** — limitate la 15 (throttling 2 s, bot protection cu 429): au confirmat comportamentul CDN pe 6 active distincte; toate celelalte dimensiuni sunt deduse din markup-ul srcset/sizes. `aria-label`-ul ancorei logo-ului din header nu a putut fi verificat.
