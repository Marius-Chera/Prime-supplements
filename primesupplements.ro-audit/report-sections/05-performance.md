## 5. Performanță și Core Web Vitals

**Scor specialist (la momentul auditului):** 40/100 — un singur specialist (performance, evaluare statică, incertitudine ±10 puncte în lipsa datelor lab/field): stratul de platformă este sănătos (HTTP/2 + Cloudflare, brotli, Early Hints, TTFB 316 ms, cache CDN de 1 an, imagini responsive, `fetchpriority="high"` pe hero și lazy-loading sub fold), dar fiecare dintre cele ~1.151 URL-uri cară ~170 KB de JavaScript inline în `<head>` (27–65 % din fiecare document), 20 de scripturi externe (12 extensii de aplicații, ~350 KB brotli), două foi de stil Google Fonts cross-origin render-blocking injectate de Fontify peste fontul Barlow deja preîncărcat de temă, un script parser-blocking plasat înainte de `<meta charset>` și o homepage de 630 KB / ~2.900 elemente cu o secțiune featured-collection duplicată; pe un Android mediu aceste tipare produc de regulă LCP mobil de 3–4,5 s și INP peste 200 ms (estimare, nu măsurătoare). **Scor combinat: 40/100** (un singur specialist alimentează secțiunea).

**Scor estimat după remedierile din 12.10.2026:** 41/100 — pe magazinul live nu s-a schimbat nimic relevant pentru performanță (remedierile de azi au vizat SEO titles/metas, vendor, productType, taxonomie, alt text); în tema de test nepublicată „Impact – SEO fixes 2026-10-12” (id 193875083639) `<meta charset>` și viewport-ul sunt acum primele elemente din `<head>` (PERFORMANCE-02) și scripturile/JSON-LD-ul injectate de BlogGenAuto în corpurile celor 354 de articole devin inerte la randare (parte din PERFORMANCE-13), ceea ce aduce ~1 punct după publicare; toate pârghiile mari (Fontify, stiva de aplicații, secțiunile duplicate de pe homepage, imaginile hero/banner) rămân deschise.

### Ce funcționează

- HTTP/2 prin Cloudflare, compresie brotli (homepage 630.667 B brut → 82.466 B pe fir, raport 7,6:1), `content-encoding: br` pe toate asset-urile temei, `cache-control: public, max-age=31557600` pe asset-urile CDN, `cf-cache-status: HIT` pe imagini și scripturi.
- TTFB 0,316 s și descărcare completă a HTML-ului în 0,737 s măsurate de la un edge din SUA (`server-timing: processing;dur=354 ... db;dur=90, render;dur=223`), adică bine sub pragul „good” de 0,8 s; se trimit HTTP 103 Early Hints cu `Link: rel=preload` pentru `pandectes-rules.js`, `theme.css`, `bss-custom.css` și ambele CSS-uri Google Fonts, plus `preconnect` către cdn.shopify.com și fonts.googleapis.com.
- Payload-ul temei este mic: `theme.css` 27.223 B br, `theme.js` 34.746 B br, `vendor.min.js` 21.056 B br, `bss-custom.css` 192 B; `theme.js`/`vendor.min.js` sunt `type="module"` (deferred implicit). Există UN SINGUR script clasic sincron (`pandectes-rules.js`, 6.544 B br).
- Imagini responsive: pe homepage 110/127 `<img>` au `srcset`, 108/127 au `sizes`, 110/127 au `width`+`height`; 100/127 sunt `loading="lazy"`; imaginea slide-ului hero este `loading="eager" fetchpriority="high"` cu variantă mobilă `<picture><source media="(max-width: 699px)">` (`header-mobile.jpg`); cardurile de produs încarcă lazy tot în afara primului rând. CDN-ul Shopify negociază automat WebP (hero 2800 px: 322.050 B JPEG → 210.712 B WebP; mobil 800 px: 142.253 B → 82.528 B).
- Pagina de produs: imaginea din galerie a variantei selectate este `loading="eager" fetchpriority="high"` cu `width="4000" height="4000"` (fără CLS) și un srcset în 20 de trepte (200–3200 px) cu lanț `sizes` corect (`(max-width: 740px) calc(100vw - 40px), (max-width: 999px) calc(100vw - 64px), min(730px, 40vw)`); thumbnail-urile folosesc `widths: '80,160'` / 56–192.
- Fonturile temei (Barlow n4/n7/i4/i7) sunt self-hosted pe CDN-ul de fonturi Shopify ca woff2 cu `font-display: fallback`, iar cele două fețe principale sunt preîncărcate.
- CSS-ul necritic este deja non-blocking: `country-flags.css` folosește modelul `media="print" onload="this.media='all'"`, iar `customer-referral.css` (Secomapp) este `rel="preload" as="style"` cu swap la onload.
- 12 din cele 20 de scripturi externe au `defer`, 4 `async`; loader-ul Judge.me are doar 3.095 B br și amână bundle-ul widget-ului.

### Constatări

#### PERFORMANCE-01 — Aplicația Fontify injectează două foi de stil Google Fonts render-blocking (Poppins cu toate cele 18 variante + Bebas Neue) și suprascrie cu `!important` fontul Barlow deja preîncărcat de temă, rezultând trei familii de fonturi pe fiecare pagină

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| High | OPEN | S | 0.9 |

**Dovezi:** `$R/home.html` bytes 56.383–57.747, în `<head>`: blocul `<!-- BEGIN app block: shopify://apps/fontify/blocks/app-embed/334490e2-... -->` conține `<link rel="preconnect" href="https://cdn.nitroapps.co" crossorigin="">`, `<link rel="preconnect" href="https://fonts.googleapis.com">`, `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bebas+Neue:wght@400&display=swap" />`, un `<link rel="prefetch" ... as="style" />` pentru același CSS, `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" />`, încă un `prefetch`, apoi:

```html
<style id="nitro-fontify">h1,h2,h3,h4,h5,h6,.h0,.text-gradient,.h3{ font-family: 'Bebas Neue' !important; } p,a,li{ font-family: 'Poppins' !important; }</style>
```

urmat de un bloc inline `fontify-scripts` de 5.550 B. Bloc identic pe product, collection și article (`$R/perf/fonts.txt`). GET live al CSS-ului Poppins cu UA Chrome: 21.893 B, **54 de reguli `@font-face`** (18 variante × 3 subseturi unicode-range latin / latin-ext / devanagari), 54 URL-uri woff2 distincte pe fonts.gstatic.com; un woff2 latin 400 = 8.404 B. CSS Bebas Neue: 856 B, 2 fețe. Diacriticele românești (ă â î ș ț) sunt în latin-ext, deci fiecare greutate folosită costă 2 fișiere (latin + latin-ext). Tema declară simultan 6 reguli `@font-face` Barlow (`font-display: fallback`) și preîncarcă două dintre ele pe fiecare pagină (`<link rel="preload" href="//primesupplements.ro/cdn/fonts/barlow/barlow_n7.691d1d1...woff2" as="font" ...>` și `barlow_n4.038c60d...woff2`); variabilele CSS ale temei sunt `--heading-font-family: Barlow, sans-serif; --text-font-family: Barlow, sans-serif`. Pentru că regulile `!important` ale Fontify câștigă, Barlow este descărcat forțat prin preload, dar folosit doar de elementele neacoperite de `h*/p/a/li` (de ex. cele 733 `<span>` de preț/etichetă de pe homepage), deci pagina randează trei familii. Header-ul HTTP `Link` (103 + 200) preîncarcă ambele CSS-uri Google Fonts `as=style`, ridicându-le prioritatea peste asset-urile temei; **nu există** `preconnect` către `fonts.gstatic.com` (0 apariții pe orice pagină), gazda care servește fișierele, în timp ce `cdn.nitroapps.co` este preconectat fără ca vreo resursă să fie cerută de acolo. `font-display` mixt: Barlow `fallback`, fonturile Google `swap` → textul poate fi pictat în fallback, re-așezat în Barlow și din nou în Poppins (două swap-uri = risc de layout shift pe fiecare bloc de text).

**Impact / pagini afectate:** toate template-urile, ~1.151 URL-uri indexabile (575 ×2 cu /ro-hu/). Lanțul critic de randare conține două CSS-uri cross-origin plus un handshake DNS/TLS suplimentar spre fonts.gstatic.com; pe articole, H1-ul în Bebas Neue poate fi chiar elementul LCP (vezi PERFORMANCE-13).

**Recomandare:**
1. Preferat (efort S, fără cod): Online Store > Themes > Customize > Theme settings > Typography: alegeți **Poppins** (body) și **Bebas Neue** (headings) din biblioteca de fonturi Shopify (ambele există). Impact emite atunci `@font-face` de pe `fonts.shopifycdn.com` doar pentru greutățile folosite, păstrează logica `<link rel="preload" as="font">` și setarea `font-display`, iar cascada `!important` dispare. Apoi **dezinstalați Fontify** (elimină 2 stylesheet-uri cross-origin render-blocking, 2 link-uri `prefetch`, preconnect-ul `cdn.nitroapps.co` și scriptul inline de 5,5 KB). Tema de test preconectează deja `fonts.shopifycdn.com` (`theme-fixes/layout/theme.liquid`, linia 76), deci varianta aceasta se potrivește cu ce urmează să fie publicat.
2. Dacă magazinul insistă să păstreze Fontify: restrângeți cererea Google Fonts la greutățile folosite efectiv de temă (`family=Poppins:wght@400;500;600;700` → 12 fețe în loc de 54, CSS ~5 KB), adăugați în theme.liquid, deasupra blocului app:

```html
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

eliminați duplicatele `rel="prefetch"` și setați fonturile temei pe un system stack, ca Barlow să nu mai fie declarat/preîncărcat.
3. În oricare variantă ștergeți `<link rel="dns-prefetch" href="https://productreviews.shopifycdn.com">` (aplicația Shopify Product Reviews a fost retrasă; nu se încarcă nimic de pe acea gazdă) — hint-ul este încă prezent și în tema de test (linia 77).

**Cum verificăm (falsificabilitate):** un run WebPageTest/Lighthouse după schimbare trebuie să arate zero cereri către fonts.googleapis.com și fonts.gstatic.com, nicio cerere `barlow_*.woff2`, iar auditul „Eliminate render-blocking resources” să nu listeze niciun CSS de fonturi; dacă oricare apare, remedierea a eșuat.

**Indicator timpuriu:** cererile de fonturi pe pagină scad de la 2 CSS + ≥6 woff2 de pe 3 gazde la ≤4 woff2 de pe o singură gazdă; `document.fonts.size` în DevTools ≤ 4; contribuția CLS a nodurilor de text dispare din panoul Performance.

#### PERFORMANCE-02 — `pandectes-rules.js`, singurul script clasic sincron, este plasat înainte de `<meta charset>` și împinge declarația charset dincolo de primii 1.024 de bytes

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Medium | READY (tema de test – de publicat) | S | 0.85 |

**Dovezi:** `$R/home.html` începe cu blocul JSON-LD Organization (bytes 44–~1.000), apoi `<script src="//primesupplements.ro/cdn/shop/files/pandectes-rules.js?v=5266668933134717877"></script>` (fără `async`/`defer`, atributul src la byte 1.022) și abia apoi `<meta charset="utf-8">` la **byte 1.078** (măsurat cu `bytes.find` pe `$R/home.html`); specificația HTML și auditul Lighthouse „charset” cer declarația în primii 1.024 de bytes, altfel parserul poate fi nevoit să re-decodeze. Scriptul are 6.544 B br, `cf-cache-status: HIT`, este preîncărcat prin header-ul `Link` (`<//primesupplements.ro/cdn/shop/files/pandectes-rules.js...>; as="script"; rel="preload"`), deci descărcarea se suprapune cu TLS, dar execuția lui blochează în continuare parsarea restului de ~169 KB de `<head>`. Mix de scripturi pe pagină (`analyze.py`): `defer: 12, async: 3, sync+module: 3 (modules are deferred), sync: 1 (this file), async+module: 1`.

**Impact / pagini afectate:** fiecare pagină (head-ul este identic pe toate template-urile).

**Recomandare:** Verificare: în `theme-fixes/layout/theme.liquid` `<meta charset="utf-8">` și `<meta name="viewport">` sunt acum primii copii ai `<head>` (liniile 14–15, cu comentariul „charset must sit in the first 1024 bytes”), iar `{% render 'schema-organization' %}` și `<script src="{{ 'pandectes-rules.js' | file_url }}"></script>` au coborât la liniile 66–67, după title și meta description. După publicarea temei rulați `curl -s https://primesupplements.ro/ | head -c 1024 | grep -c 'meta charset'` (așteptat 1). Rămâne opțional: mutarea scriptului Pandectes imediat după viewport și înaintea snippet-ului schema-organization, conform ordinii-țintă a specialistului (`<meta charset>` → viewport → pandectes-rules.js → title/meta → preconnect/preload → CSS), păstrând scriptul sincron (Pandectes trebuie să blocheze pixelii înainte de consimțământ) și preload-ul existent din Early Hints.

**Cum verificăm (falsificabilitate):** `curl -s https://primesupplements.ro/ | head -c 1024 | grep -c 'meta charset'` returnează 1; Lighthouse „Properly defines charset” trece. Dacă după publicare comanda returnează 0, tema publicată nu este cea de test.

**Indicator timpuriu:** offset-ul în bytes al `<meta charset>` < 200.

#### PERFORMANCE-03 — `<head>` de ~170 KB cu 60 de scripturi inline (133–145 KB de JavaScript inline) pe fiecare template, 27 %–65 % din fiecare document

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| High | OPEN | M | 0.85 |

**Dovezi (analyze.py):**

| template | HTML bytes | `<head>` bytes | pondere head | `<script>` în head | JS inline bytes |
|---|---|---|---|---|---|
| home | 630,667 | 171,229 | 27 % | 60 | 143,057 |
| product | 344,857 | 170,064 | 49 % | 60 | 145,078 |
| collection | 310,839 | 172,693 | 55 % | 60 | 144,763 |
| article | 251,128 | 163,326 | 65 % | 60 | 133,545 |

Cele mai mari blocuri inline (bytes, identice pe toate paginile): `window.jdgmSettings={...}` **30.839** (setări Judge.me, inclusiv 533 B `widget_gdpr_statement`, 410 B `qna_widget_flow_gdpr_statement`, 392 B `write_review_flow_gdpr_statement`), loader-ul web-pixels-manager 14.376–24.648, `window.mktr` themarketer **19.347–19.738** (273 de referințe `window.mktr`, executat sincron), `window.PandectesSettings` **16.498**, Shopify asyncLoad/Monorail 6.568–7.069, Secomapp `uppromote-mess` 6.517, Fontify 5.550, `estimatorConfig` 3.932–6.337, blocker Judge.me 2.437, snippet Clarity. JSON/LD-JSON inline are doar 2–6 KB, deci greutatea este JS executabil, nu date.

**Impact / pagini afectate:** fiecare pagină; cele 60 de scripturi din head trebuie parsate înainte de primul byte din `<body>`, întârziind descoperirea hero/LCP pe toate cele ~1.151 URL-uri.

**Recomandare:**
1. Dezinstalați sau puneți pe pauză aplicațiile care nu-și mai justifică costul (fiecare eliminare șterge config-ul inline și scriptul extern): Estimator (estimator de livrare, `estimatorConfig` pe fiecare pagină, inclusiv blog), Secomapp Affiliate/UpPromote (`uppromote-mess` + `core.min.js` + `customer-referral.js` + CSS) dacă programul de afiliere nu este activ, BlogGenAuto `tracking.js`, Pop Convert, Fontify (vezi PERFORMANCE-01).
2. themarketer: înlocuiți snippet-ul inline sincron de 19,7 KB cu loader-ul async al furnizorului sau încărcați-l prin GTM după consimțământ:

```html
<script async src="https://t.themarketer.com/t/j/...">
```

3. Judge.me: dezactivați din setările aplicației widget-urile nefolosite (Q&A, caruselul de recenzii pe paginile non-produs, „Verified badge” etc.), ceea ce micșorează `jdgmSettings`; Judge.me oferă și „Load widget JS only on product pages” pentru magazinele care nu afișează badge-uri de recenzii în altă parte.
4. Pandectes: păstrați, dar `PandectesSettings` (16,5 KB) se poate reduce limitând traducerile bannerului la `ro` în dashboard-ul aplicației.
Efect așteptat: `<head>` de la ~170 KB la <70 KB, numărul de scripturi din head de la 60 la ~25.

**Cum verificăm (falsificabilitate):** `python3 analyze.py home.html` după modificări raportează `head_bytes < 80000` și `script_inline < 30`; dacă nu, aplicațiile încă injectează config-uri inline.

**Indicator timpuriu:** Lighthouse „Reduce JavaScript execution time” / TBT în lab; CrUX INP p75 de îndată ce raportul Core Web Vitals din GSC are date.

#### PERFORMANCE-04 — 20 de scripturi externe pe pagină, 12 dintre ele extensii de aplicații (~350 KB brotli), plus 8 web pixels: costul pe main thread apare pe fiecare template, inclusiv pe articolele de blog

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| High | OPEN | M | 0.8 |

**Dovezi:** `$R/perf/scripts.txt` listează 20 de scripturi externe pe homepage (set identic pe product/collection/article). Dimensiuni de transfer (`$R/perf/asset-sizes-part2.txt` + HEAD-uri live, brotli): Koala upsell gift `gifts-embed.js` **120.286 B**, Shopify `portable-wallets.ro.js` 78.457 B, Dondy WhatsApp `ChatBubble.js` 64.499 B, `theme.js` 34.746, `perf-kit` 26.401, `vendor.min.js` 21.056, es-modules-shim ~15.000 (din context), Judge.me `loader.js` 3.095 (apoi încarcă bundle-ul widget-ului de pe cdn.judge.me), `standard-actions.js` 4.462, Pop Convert `main.js` 302 (loader), loader GTM 1.555 (apoi containerul), plus Secomapp `core.min.js` + `customer-referral.js`, Estimator `estimator-init.js`, BlogGenAuto `tracking.js` (încărcat **de două ori**: head offset 136.323 și body offset 628.908), `load_feature`, `origin_trials`, `preloads.js`, `shop-js cart-sync`. Pixeli: config-ul web-pixels-manager listează **6 pixeli APP + 2 CUSTOM** (Microsoft Clarity projectId `tepopueyt5`, Simprosys, Facebook (12 referințe), TikTok (5), Pinterest (2), Klaviyo (2), themarketer) și GTM. Chat bubble, pop-up-ul de cadou și Pop Convert injectează DOM după load (surse clasice de CLS târziu și INP). Gazde terțe atinse la prima vizită: primesupplements.ro, cdn.shopify.com, fonts.googleapis.com, fonts.gstatic.com, cdn.judge.me/cdn1/api/cdnwidget, www.googletagmanager.com, www.clarity.ms, t.themarketer.com, monorail-edge.shopifysvc.com (+ gazdele pixelilor prin GTM/WPM).

**Impact / pagini afectate:** toate template-urile; articolele de blog (354 ×2 URL-uri) cară întreaga stivă comercială (Koala gifts, WhatsApp, Estimator, Judge.me) deși nimic din ea nu se randează acolo.

**Recomandare:**
1. Theme editor > App embeds: opriți embed-urile care nu sunt necesare site-wide; pentru Koala Upsell Gift folosiți opțiunea aplicației „load only on product/cart pages” sau înlocuiți-o cu un mesaj nativ al temei în cart drawer; încărcați bula de chat Dondy la primul scroll/interacțiune (aplicația are setare de „delay”) sau înlocuiți-o cu un link simplu `https://wa.me/40775286584` în footer (zero JS).
2. Eliminați `tracking.js` BlogGenAuto duplicat (o copie este app embed, cealaltă este în secțiunea footer `custom_liquid`/app block) și dezinstalați aplicația dacă tracking-ul blogului nu este folosit.
3. Consolidați tag-urile de marketing: păstrați Facebook/TikTok/Pinterest ca pixeli nativi de canal Shopify (încărcați lazy de pixel manager) și renunțați la tag-urile duplicate din GTM, sau invers, nu ambele; rulați Clarity prin GTM doar cu trigger de consimțământ.
4. Păstrați scripturile de platformă Shopify (perf-kit, portable-wallets, es-modules-shim), dar rețineți că `portable-wallets.ro.js` (78 KB) există doar pentru că butoanele dinamice de checkout sunt active pe paginile de produs; dacă butonul „Buy with Shop Pay” rămâne, costul este intenționat.
Țintă: ≤ 10 scripturi externe și < 200 KB brotli de JS terț pe template-urile article/collection.

**Cum verificăm (falsificabilitate):** `grep -c '<script src' page.html` ≤ 12 pe un articol de blog; Lighthouse „Third-party usage” total < 300 ms de main thread pe throttling mobil.

**Indicator timpuriu:** Lighthouse TBT, CrUX INP p75 (raportul Core Web Vitals din GSC, odată populat).

#### PERFORMANCE-05 — Homepage: 630 KB HTML, ~2.944 elemente DOM, 41 de carduri de produs din 7 secțiuni featured-collection, inclusiv o secțiune „Cele mai vândute” duplicată care randează aceleași 6 produse de două ori

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| High | OPEN | S | 0.9 |

**Dovezi:** `$R/theme/templates__index.json`: 25 de secțiuni, dintre care **7 `featured-collection`** (haine-mnx, pudra-proteica, prime-health, suplimente-pre-workout, lansate-recent, cele-mai-vandute, cele-mai-vandute), fiecare cu `products_count: 6`, 4 pe rând pe desktop, plus o secțiune `featured-product` cu 13 blocuri, slideshow, image-link-blocks, collection-list, media-grid, hot-spots, before-after, press, multiple-images-with-text, revealed-image-on-scroll, blog-posts, faq, 2 secțiuni `apps`. Dimensiuni randate (split pe secțiuni în analyze.py): `featured_collection_NFyp6g` 40.663 B și `featured_collection_bt96pP` 40.655 B randează **exact** `/products/baton-proteic-capsuni, creatina-creapure, eaa-aminoacizi-esentiali, prime-whey-1000g, prime-whey-2000g, pure-isolate-2000g` (seturi identice: True); celelalte cinci colecții adaugă 31–38 KB fiecare. 41 de elemente `<product-card>` = 230.844 B (37 % din pagină, 5.625 B per card), dar doar **32 de produse distincte** (`prime-whey-2000g`, `prime-whey-1000g`, `pure-isolate-2000g` apar de 3×; `creatina-creapure`, `eaa-aminoacizi-esentiali`, `baton-proteic-capsuni` de 2×), pentru că `lansate-recent` și `cele-mai-vandute` conțin amândouă toate cele 185 de produse. Per card: 1,83 `<img>` (imagine secundară la hover activată, `product-card__image--secondary` cu srcset propriu în 12 trepte), un `<quick-buy-drawer>` (29 pe pagină), 2.174 B de text `srcset`; totaluri pe pagină: 1.239 candidați srcset (130.366 B de atribut `srcset`), 106 `<svg>` inline (43.711 B; `icon-quick-buy-cart` repetat de 37×, chevron-uri 11×/6×/5×), 62 de blocuri `<style>` (44.377 B de CSS per secțiune), `<div>` 770, `<span>` 733, `<button>` 128, 58.334 B de whitespace (9 %), 127 de comentarii HTML. Estimare DOM 2.944 elemente (Lighthouse semnalează > 1.500; layout-ul mobil Impact randează oricum toate cardurile desktop). `/ro-hu/` este o copie byte-identică de 631.838 B. JSON-LD-ul de pe homepage are doar 3.623 B, deci datele structurate nu sunt cauza.

**Impact / pagini afectate:** homepage (/ și /ro-hu/), URL-ul cel mai legat intern și cel mai vizitat; timpul de randare server `render;dur=223` ms este și el dat de acest template.

**Recomandare (doar din theme editor, efort S):**
1. Ștergeți secțiunea `featured_collection_bt96pP` (duplicat al `NFyp6g`): −40,6 KB, −6 carduri, −12 imagini, −6 quick-buy drawers.
2. Scoateți `lansate-recent` de pe homepage (este aceeași colecție automată de 185 de produse ca `cele-mai-vandute`) sau reduceți `products_count` la 4 pentru colecțiile rămase și activați caruselul pe mobil („stack products” = false): țintă ≤ 4 featured collections / ≤ 20 de carduri.
3. Theme settings > Product cards: dezactivați „Show secondary image on hover” (−~35 imagini și ~45 KB de markup srcset) și „Quick buy” pe secțiunile de homepage (−29 drawers, −37 iconițe inline de coș).
4. Păstrați secțiunea FAQ, dar comasați `press`, `before-after-image`, `hot-spots` și `revealed-image-on-scroll` (imagini de marketing sub fold) într-un singur `multiple-images-with-text`.
Așteptat: HTML homepage ~630 KB → ~380 KB, DOM < 1.800, LCP neafectat, dar costul de parse/style/layout pe mobil aproximativ înjumătățit.

**Cum verificăm (falsificabilitate):** `grep -c '<product-card' home.html` ≤ 24 și nicio pereche de secțiuni `featured-collection` cu același handle `collection` în `templates/index.json`.

**Indicator timpuriu:** Lighthouse „Avoid an excessive DOM size” trece (< 1.500 noduri) și rândul HTML din „Avoid enormous network payloads” < 400 KB.

#### PERFORMANCE-06 — Amprenta Judge.me este încărcată pe fiecare template (inclusiv blog și colecții): 30,8 KB setări inline, 14,5 KB CSS render-blocking, 4 blocuri style, 1.104 apariții de markup `jdgm-` pe homepage

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Medium | OPEN | S | 0.8 |

**Dovezi:** apariții `jdgm-`: home 1.104, product 492, collection 195, article 120. Blocuri `<script>` inline Judge.me: 3 pe pagină = 34.988 B; blocuri `<style>` cu reguli jdgm: 4 (7.181 B) pe home, 3 (6.974 B) pe product; `<link rel="stylesheet" ... judgeme-775/assets/shopify_v2.css media="all">` = 14.513 B br, render-blocking, prezent și pe paginile de articol, unde nu se randează niciun widget de recenzii. Secțiunea `apps` `1752713175620cb137` de pe homepage = 22.354 B: caruselul „featured” Judge.me (`<h2 class='jdgm-carousel-title'>Let customers speak for us</h2>`, 15 imagini de recenzii, 5 blocuri style); fiecare dintre cele 41 de carduri de produs poartă un placeholder `jdgm-prev-badge`. Hint-uri `dns-prefetch` pentru cdn.judge.me, cdn1.judge.me, api.judge.me; bundle-ul widget-ului este preluat de pe cdn.judge.me după `loader.js` (3.095 B br).

**Impact / pagini afectate:** toate template-urile; cel mai greu pe homepage și pe paginile de produs.

**Recomandare:** Judge.me dashboard > Settings > „Widget loading”: activați „Only load widgets on pages where they are used” / dezactivați widget-ul Q&A și tab-ul flotant „Reviews”; limitați CSS-ul blocului de aplicație la template-urile de produs (Judge.me permite mutarea CSS-ului în theme app block în loc de embed global); pe homepage păstrați caruselul doar dacă este above the fold, altfel randați-l lazy prin wrapper-ul Impact „reveal on scroll”; traduceți titlul caruselului în aplicație („Let customers speak for us” → „Ce spun clienții noștri”). Expunerea JSON-LD-ului cu rating pe paginile de produs, cerută de specialist în aceeași constatare, este deja rezolvată în tema de test (`schema-product-enhanced.liquid` citește `aggregateRating` din metafield-urile Judge.me — vezi secțiunea 4).

**Cum verificăm (falsificabilitate):** pe `/blogs/news/<articol>` HTML-ul nu conține linkul `shopify_v2.css` și numărul de apariții `jdgm-` este < 20.

**Indicator timpuriu:** cererile CSS render-blocking pe pagină scad de la 5 la 2 (theme.css + bss-custom.css).

#### PERFORMANCE-07 — Imaginea LCP de pe homepage (slide 1 din slideshow, `header-desktop.jpg` / `header-mobile.jpg`) are 211 KB WebP pe desktop și 83 KB WebP pentru varianta mobilă de 800 px și nu este preîncărcată, deși este descoperită abia după ~170 KB de scripturi din head

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Medium | OPEN | S | 0.75 |

**Dovezi:** `$R/home.html`, secțiunea `slideshow` (`autoplay="6"`, 3 blocuri slide, `transition="fade_with_text"`): `<picture><source media="(max-width: 699px)" srcset="header-mobile.jpg?width=400 400w ... 1200w"><img src="header-desktop.jpg?v=1747640020&width=2800" srcset="200w ... 2800w" sizes="100vw" width/height set, loading="eager" fetchpriority="high">`. HEAD live: `header-desktop.jpg&width=2800` = 322.050 B JPEG / **210.712 B WebP** (cu Accept de browser), `&width=1600` = 181.249 B JPEG, `header-mobile.jpg&width=800` = 142.253 B JPEG / **82.528 B WebP** (foarte mult pentru 800 px, adică o sursă zgomotoasă sau exportată la calitate mare; variantele 1600/800 au răspuns `cf-cache-status: MISS`, deci sunt rar cerute). Niciun `<link rel="preload" as="image">` pentru hero, nici în HTML, nici în header-ul `Link` (care preîncarcă 5 asset-uri CSS/JS, dar nicio imagine). Element LCP estimat pe acest template: `<img>`-ul de pe slide-1; pe telefoane de 390 px / DPR 3 browserul alege varianta mobilă de 1200 px (~120+ KB WebP).

**Impact / pagini afectate:** / și /ro-hu/.

**Recomandare:** (a) Re-exportați `header-desktop.jpg` la maximum 2000 px, calitate ~72, și `header-mobile.jpg` la 1000 px (țintă ≤ 110 KB WebP desktop, ≤ 45 KB mobil); încărcați ca JPEG, CDN-ul convertește. (b) Adăugați un preload responsive în `layout/theme.liquid` pentru template-ul index (poate intra în tema de test înainte de publicare):

```liquid
{% if template.name == 'index' %}<link rel="preload" as="image" imagesrcset="{{ 'header-mobile.jpg' | file_img_url: '800x' }} 800w, ..." imagesizes="100vw" media="(max-width: 699px)">{% endif %}
```

(plus echivalentul desktop) sau, mai simplu, folosiți setarea Impact „preload hero image” dacă versiunea instalată o expune. (c) Dezactivați autoplay-ul slideshow-ului sau setați-l la ≥ 8 s, ca slide-ul LCP să nu fie schimbat înainte de paint pe dispozitive lente (vezi și PERFORMANCE-14).

**Cum verificăm (falsificabilitate):** Lighthouse „Largest Contentful Paint element” = imaginea slide-1, cu „Resource load delay” < 300 ms și transfer al imaginii < 120 KB.

**Indicator timpuriu:** bytes ai imaginii LCP în insight-ul PSI „Improve image delivery”.

#### PERFORMANCE-08 — Pagini de colecție: bannerul parallax cu `sizes="130vw"` dintr-o sursă de 4000 × 2667 cere varianta de 2600 px pe desktop (298 KB WebP) și 1600 px pe telefoane (151 KB WebP)

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Medium | OPEN | S | 0.8 |

**Dovezi:** `$R/pages/collection.html`, secțiunea `template--25112931467639__banner`: `<img src="HILA_13_13_31_59_0798.jpg?v=1749720141&width=4000" srcset="200w ... 3200w" sizes="130vw" width="4000" height="2667" loading="eager" fetchpriority="high">` în containerul parallax Impact (`parallax: True` în markup-ul înconjurător). Cu `130vw`, un viewport de 1920 px rezolvă la 2.496 px → candidatul de 2600 px; un telefon de 390 px DPR 3 rezolvă la 1.521 px → 1600 px. HEAD live (Accept webp): width 2600 = **298.324 B**, width 1600 = **151.166 B**, width 4000 (fallback `src`) = 895.457 B JPEG. Element LCP estimat pe template-urile de colecție: acest banner (deasupra grilei de produse; 5 carduri de produs în primul chunk al grilei, fiecare cu imagine secundară).

**Impact / pagini afectate:** 23 de colecții ×2 (/ro-hu/) care folosesc secțiunea banner (`pudra-proteica` auditată; `collection-all.html`, `collection-creatina.html` etc. folosesc același `templates__collection.json`).

**Recomandare:** în setările secțiunii banner dezactivați „Parallax” (Impact emite atunci `sizes="100vw"`, reducând lățimea cerută cu 23 %) sau micșorați înălțimea secțiunii astfel încât imaginea să fie decupată; re-încărcați bannerul la 2400 px lățime, calitate ~70 (țintă ≤ 150 KB WebP desktop); pentru mobil adăugați o „Mobile image” separată în secțiune (Impact o suportă) la 1000 px. Păstrați `fetchpriority="high"`.

**Cum verificăm (falsificabilitate):** `<img>`-ul bannerului are `sizes="100vw"` și cea mai mare variantă cerută este < 160 KB în network panel la 1920 px.

**Indicator timpuriu:** dimensiunea resursei LCP pe URL-urile de colecție în PSI.

#### PERFORMANCE-09 — Fallback-ul `src` al galeriei de produs indică randarea de 4000 px (600 KB WebP / 977 KB JPEG) și fiecare imagine din galerie este referențiată de 8 ori în HTML

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Low | OPEN | S | 0.7 |

**Dovezi:** `$R/pages/product.html`: `<img src="//primesupplements.ro/cdn/shop/files/01_box_BATONPROTEIC_strawberry_front.jpg?v=1749666742&width=4000" ... srcset up to 3200w, sizes="(max-width: 740px) calc(100vw - 40px), (max-width: 999px) calc(100vw - 64px), min(730px, 40vw)">`. HEAD live al acelui URL `src`: 977.771 B JPEG, 599.536 B WebP. Browserele moderne respectă `srcset`/`sizes` (desktop DPR 2 → 1600 px; telefon DPR 3 → 1200 px), deci fișierul de 4000 px este descărcat doar de clienții care ignoră `srcset` (unele scrapere, WebView-uri vechi, fetcher-ele pentru image SERP) sau de utilizatorii care fac zoom; `width="4000" height="4000"` apare și pe thumbnail-urile de 56–192 px. 8 `<img>` referențiază cele două imagini de produs (main, thumbnail, variant-media, swatch), plus o secțiune de recomandări `featured_collection_cq8VYt` de 40 KB cu 6 carduri.

**Impact / pagini afectate:** 185 de produse ×2.

**Recomandare:** în `snippets/product-gallery` (nu este în dump; este randat din `sections/main-product.liquid`) limitați fallback-ul `image_url: width:` la 2000:

```liquid
image | image_url: width: 2000
```

și lista `widths` la `'200,...,2000,2400'`; încărcați fotografiile de produs la ≤ 2500 px (sursele JPEG au 4000 px, ~1 MB). Păstrați thumbnail-urile așa cum sunt.

**Cum verificăm (falsificabilitate):** `grep -c 'width=4000' product.html` = 0.

**Indicator timpuriu:** bytes transferați când Googlebot-Image preia galeria de produs (GSC crawl stats, dimensiunea răspunsurilor „Image”).

#### PERFORMANCE-10 — Imagini fără `width`/`height` (CLS) injectate de aplicații și Liquid custom: 17 pe homepage, 3 pe produs, 2 pe colecție, 3 pe articol

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Low | OPEN | S | 0.8 |

**Dovezi (analyze.py `img_with_wh`):** home 110/127, product 24/27, collection 21/23, article 6/9. Cazuri concrete: pagina de produs `<img src="https://cdn.shopify.com/s/files/1/0917/5138/3415/files/europe-flag-icon.webp?v=1765984894" alt="Steag UE" class="eu-flag" />` (blocul de preț B2B BSS, fără dimensiuni, fără srcset); footer `custom_liquid_c8cJ96` (13.146 B pe produs, 8.449 B pe home): `<img src=".../logo-anpc-sol.aa50985c.png" alt="ANPC SOL" style="height: 50px;">` și `logo-anpc-sal...png` fără `width` (înălțimea fixată doar prin stil inline, lățimea necunoscută până la decodare); corpul articolului `<img src="https://cdn.shopify.com/s/files/1/0917/5138/3415/files/silicoane-mai-mari.png?v=1773333647">` fără dimensiuni, fără `srcset`, servit la mărimea originală; fotografiile de recenzii din caruselul Judge.me (15) pe homepage fără dimensiuni până la încărcarea CSS-ului widget-ului.

**Impact / pagini afectate:** toate template-urile (footer), toate produsele (iconița steag), articolele cu imagini încărcate în corp.

**Recomandare:** în Liquid-ul custom din footer adăugați `width="120" height="50"` explicit (cu raportul intrinsec real) și `loading="lazy"`; în setările BSS B2B dezactivați steagul UE sau adăugați dimensiuni prin CSS-ul custom al aplicației:

```css
.eu-flag{width:24px;height:16px}
```

în BlogGenAuto / editorul de articole inserați imaginile întotdeauna prin Shopify Files cu `width`/`height` (editorul rich-text Shopify le adaugă când imaginea este încărcată prin editor, nu lipită ca URL extern). Notă: scriptul `blog-cleanup/clean.py` pregătit azi nu adaugă dimensiuni imaginilor din corp (în `cleanup-report.json` nu există o astfel de intrare), deci punctul rămâne deschis și după importul Matrixify.

**Cum verificăm (falsificabilitate):** analyze.py `img_with_wh == img_count` pe paginile de produs și de articol.

**Indicator timpuriu:** CLS p75 în CrUX când va fi disponibil; Lighthouse „Image elements do not have explicit width and height” trece.

#### PERFORMANCE-11 — Hint-uri de resurse și tag-uri redundante sau duplicate: `country-flags.css` legat de 3×, BlogGenAuto `tracking.js` de 2×, CSS Google Fonts și ca `stylesheet` și ca `prefetch`, `preconnect` nefolosit către cdn.nitroapps.co, `dns-prefetch` învechit către productreviews.shopifycdn.com, `preconnect` duplicat către cdn.shopify.com în header-ul Link, `preconnect` lipsă către fonts.gstatic.com

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Low | OPEN | S | 0.9 |

**Dovezi:** analyze.py: `country-flags link count: 3` (offset-uri în body 187.211 / 199.169 / 618.445, fiecare cu `media="print" onload=...`), `bloggenauto tracking.js count: 2` (head + body), `rel="prefetch"` ×2 pentru cele două CSS-uri de fonturi deja încărcate ca stylesheet, `<link rel="preconnect" href="https://cdn.nitroapps.co" crossorigin="">` cu 0 resurse de pe acea gazdă, `<link rel="dns-prefetch" href="https://productreviews.shopifycdn.com">` (aplicație Shopify retrasă), header `Link:` `<https://cdn.shopify.com>; rel="preconnect", <https://cdn.shopify.com>; rel="preconnect"; crossorigin` (ambele variante, HTML-ul o repetă pe prima), `fonts.gstatic.com` referențiat de 0 ori. 9 link-uri de hint pe fiecare pagină, 4 dintre ele inutile. Tema de test păstrează neschimbate `dns-prefetch`-ul către productreviews.shopifycdn.com (`theme-fixes/layout/theme.liquid`, linia 77) și `preconnect`-ul către cdn.shopify.com (linia 75).

**Impact / pagini afectate:** fiecare pagină.

**Recomandare:** eliminați cele trei randări suplimentare ale `country-flags.css` (snippet-ul localization selector este randat în header, în drawer-ul mobil și în footer; randați stylesheet-ul o singură dată în `layout/theme.liquid` sau lăsați snippet-ul `localization-selector` din Impact să se protejeze cu `{% unless country_flags_loaded %}`), ștergeți al doilea embed BlogGenAuto și curățați hint-urile conform PERFORMANCE-01 — ideal direct în tema de test, înainte de publicare. Sloturile de conexiune ale browserului și prioritățile HTTP/2 sunt finite; preconnect-urile nefolosite costă DNS/TLS pe mobil.

**Cum verificăm (falsificabilitate):** `grep -c country-flags.css page.html` = 1; `grep -c tracking.js` ≤ 1.

**Indicator timpuriu:** numărul de cereri la o încărcare rece (în prezent ~75+ cereri pe homepage, din inspecția markup-ului).

#### PERFORMANCE-12 — Blocuri de aplicații orfane care nu se randează pe nicio pagină (embed-ul `pagefly-ai-page-builder` pe toate cele 4 template-uri, `youtube_gallery_carousel_widget_block` pe homepage și produs)

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Low | OPEN | S | 0.95 |

**Dovezi:** comentarii HTML în output-ul randat: `<!-- Failed to render app block "pagefly-ai-page-builder": app block path "shopify://apps/pagefly-ai-page-builder/blocks/app-embed/83e179f7-..." -->` pe home, product, collection, article și /ro-hu/; `<!-- Failed to render app block "youtube_gallery_carousel_widget_block_VUYNWw": app block path "shopify://apps/youtube-gallery/blocks/carousel-widget-block/2073..." -->` pe home (secțiunea apps `1773543102ef58f575`) și product (`PNnybF`). Ambele aplicații sunt dezinstalate, dar blocurile lor rămân în `config/settings_data.json` / `templates/index.json` / `templates/product.json`, lăsând o secțiune `apps` goală (`section section-blends section-full`) cu cele două blocuri `<style>` ale ei în DOM.

**Impact / pagini afectate:** toate paginile (embed PageFly), homepage + 185 de produse (bloc YouTube).

**Recomandare:** Theme editor: ștergeți secțiunea „Apps” goală de pe homepage și blocul YouTube din template-ul de produs; Theme settings > App embeds: eliminați intrarea PageFly (sau curățați `settings_data.json` > `current.blocks`). Zero bytes de valoare, iar referințele atârnate vor strica secțiunea „apps” din theme editor când ID-ul de bloc PageFly va fi refolosit. Tema de test este un duplicat al temei live, deci moștenește aceleași blocuri orfane: curățarea trebuie făcută în ambele sau imediat după publicare.

**Cum verificăm (falsificabilitate):** `grep -c 'Failed to render app block' page.html` = 0.

**Indicator timpuriu:** n/a (igienă).

#### PERFORMANCE-13 — Template de articol: `<head>` este 65 % din document, imaginea featured (candidat LCP) nu are `fetchpriority="high"`, imaginile din corp nu au `sizes`, iar generatorul BlogGen adaugă 12 blocuri `<style>` în body și un al doilea set JSON-LD

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Low | OPEN | S (temă) / M (354 corpuri) | 0.75 |

**Dovezi:** `$R/pages/article.html`: 251.128 B în total, head 163.326 B; imaginea featured `<img src=".../articles/HILA_13_16_35_43_2090_...jpg?v=1773333702&width=1500" srcset="200w ... 1500w" sizes="(max-width: 1149px) 100vw, 1000px" width="1500" height="1000" loading eager>` fără `fetchpriority`; două imagini în corp `HILA_13_14...jpg` / `HILA_13_13...jpg` cu `width="4000" height="2667"` și `srcset`, dar **fără `sizes`** (browserul presupune 100vw → over-fetch pe desktop), un PNG fără nicio dimensiune; `<style>` în body: 12; blocuri `application/ld+json`: 2 (temă + copia încorporată de BlogGen); 88 `<li>`, 85 `<a>` într-un DOM de 758 elemente (DOM-ul în sine este în regulă). Template-ul de articol încarcă și întreaga stivă de aplicații comerciale (PERFORMANCE-04). Stare parțială: în tema de test `sections/main-article.liquid` (liniile 110–115) face inerte la randare JSON-LD-ul și scripturile din corp (`<script type="application/ld+json">` → `<script type="text/plain" data-disabled="ld+json">`), iar curățarea pregătită pentru Matrixify (`blog-cleanup/cleanup-report.json`) elimină 1.379 blocuri ld+json și 347 scripturi din cele 355 de corpuri — dar nici tema de test, nici `clean.py` nu adaugă `fetchpriority` sau `sizes` și nu elimină cele 12 blocuri `<style>` inline, de aceea starea rămâne OPEN.

**Impact / pagini afectate:** 354 de articole ×2.

**Recomandare:** în `sections/main-article.liquid` randați imaginea featured cu `fetchpriority: 'high'` și `loading: 'eager'` când `section.settings.show_featured_image` este activ (poate intra în tema de test înainte de publicare); eliminați `<style>`-urile inline BlogGen și JSON-LD-ul duplicat în pasul de curățare a blogului (extindeți `clean.py` cu eliminarea `<style>` înainte de importul Matrixify; responsabili content/schema); adăugați `sizes="(max-width: 1149px) 100vw, 1000px"` imaginilor din corp (editorul Shopify îl omite; un filtru Liquid mic pe `article.content` sau scriptul de curățare îl poate adăuga).

**Cum verificăm (falsificabilitate):** pagina de articol are `img_fetchpriority_high == 1` și numărul de `<style>` din body este 0.

**Indicator timpuriu:** LCP pe URL-urile de articol în PSI (elementul LCP trebuie să fie imaginea featured, nu un bloc de text).

#### PERFORMANCE-14 — Slideshow cu autoplay (6 s) și carusel media al produsului featured cu autoplay și înălțime adaptivă pe homepage

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Low | OPEN | S | 0.7 |

**Dovezi:** `<slideshow-carousel ... transition="fade_with_text" autoplay="6">` cu 3 blocuri slide (fiecare slide un `<picture>` complet cu 12–19 candidați) și `<media-carousel desktop-mode="carousel_thumbnails_left" adaptive-height ... autoplay id="product-gallery-14971469562231-template--24912812704119__featured-product">` (`adaptive-height` înseamnă că înălțimea caruselului se schimbă per media → layout shift la fiecare avans automat). `templates__index.json`: slideshow `autoplay: true`.

**Impact / pagini afectate:** homepage.

**Recomandare:** Theme editor: Slideshow > dezactivați „Autoplay” (sau setați ≥ 8 s), Featured product > dezactivați „Autoplay” / „Adaptive height”; schimbarea respectă și utilizatorii cu `prefers-reduced-motion`.

**Cum verificăm (falsificabilitate):** `grep -c 'autoplay' home.html` = 0.

**Indicator timpuriu:** CLS p75 pe homepage.

#### PERFORMANCE-15 — CSS inline per secțiune (62 de blocuri `<style>`, 44 KB) și duplicarea iconițelor SVG inline (106 SVG-uri, 43,7 KB) pe homepage

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Low | OPEN | M | 0.7 |

**Dovezi:** analyze.py: `style_tags: 62`, `inline_css_bytes: 44,377` (în head 19.836 B de `@font-face` Barlow + variabile CSS; în body 56 de blocuri scoped pe secțiune de tipul `#shopify-section-... { --section-background-hash: ...; } #shopify-section-... + * { --previous-section-background-hash: ... }`, emise de două ori per secțiune), `inline_svg_count: 106`, `inline_svg_bytes: 43,711`, cele mai repetate: `icon-quick-buy-cart` ×37, `icon-chevron-right-small` ×11, `icon-chevron-bottom-small` ×6. Pagina de produs: 39 style tags / 33 KB, 55 SVG-uri / 23,8 KB. Bytes-ii sunt în HTML-ul comprimat brotli (ieftini pe fir), dar fiecare `<style>` forțează o recalculare a stilurilor și fiecare SVG inline este un subarbore DOM (119 elemente `<path>` pe homepage).

**Impact / pagini afectate:** toate template-urile, proporțional cu numărul de secțiuni.

**Recomandare:** rezolvată în mare parte de PERFORMANCE-05 (mai puține secțiuni/carduri). Pentru iconițe, `snippets/icon.liquid` din Impact poate fi înlocuit cu un sprite SVG definit o singură dată în `layout/theme.liquid`:

```html
<svg><use href="#icon-quick-buy-cart">
```

este o schimbare de cod în temă (M) și merită făcută doar după curățarea secțiunilor.

**Cum verificăm (falsificabilitate):** pe homepage numărul de `<svg>` < 50 și numărul de `<style>` < 35.

**Indicator timpuriu:** numărul de noduri din Lighthouse „Avoid an excessive DOM size”.

#### PERFORMANCE-16 — Răspunsul serverului și caching-ul HTML sunt sănătoase, dar timpul de randare este dat de template (Info)

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Info | OPEN | S | 0.9 |

**Dovezi:** GET live pe `/`: `http=200 size_download=82466 ttfb=0.316s total=0.737s tls=0.216s`; `server-timing: processing;dur=354;desc="gc:33", db;dur=90, db_async;dur=112, render;dur=223, edge;desc="IAD", pageType;desc="index", compressionLevel;desc="5", compressionTime;dur=11, earlyhints`; `cf-cache-status: DYNAMIC` (HTML-ul nu este niciodată cache-uit la edge pe Shopify; normal); HTTP 103 Early Hints cu 5 preload-uri + 3 preconnect-uri. Cele 223 ms de randare Liquid pentru 25 de secțiuni / 41 de carduri sunt cea mai mare componentă server-side; vizitatorii din România sunt serviți de un edge european Shopify/Cloudflare, deci TTFB-ul din teren ar trebui să fie la sau sub această valoare.

**Impact / pagini afectate:** toate paginile (constatare informativă, fără problemă de remediat separat).

**Recomandare:** nicio acțiune dincolo de PERFORMANCE-05; re-măsurați `server-timing` după eliminarea secțiunilor duplicate și redundante (așteptat `render` < 150 ms pe homepage).

**Cum verificăm (falsificabilitate):** `curl -sI https://primesupplements.ro/ | grep server-timing` arată `render;dur` < 150.

**Indicator timpuriu:** TTFB p75 în CrUX / GSC.

#### PERFORMANCE-17 — Scripturile de platformă Shopify (`portable-wallets.ro.js` 78 KB, `perf-kit` 26 KB, `es-modules-shim` 15 KB, `standard-actions.js` 4 KB, `shop-js cart-sync`) sunt prezente pe fiecare template (Info)

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Info | OPEN | S | 0.9 |

**Dovezi:** `$R/perf/asset-sizes-part2.txt`: `78457 br portable-wallets.ro.js`, `26401 br shopify-perf-kit-3.10.1.min.js`, `4462 br standard-actions.js`, `329 br loader.init-shop-cart-sync.ro-RO.esm.js`; din fișierul de context: es-modules-shim 15 KB (async, necesar doar pentru că Impact folosește un `importmap` și Shopify injectează polyfill-ul pentru browsere vechi). Toate sunt `defer`/`async`/`module`, deci nu blochează randarea, dar adaugă ~125 KB brotli (~400 KB parsați) de lucru pe main thread după load, inclusiv pe paginile de blog care nu au checkout.

**Impact / pagini afectate:** toate paginile.

**Recomandare:** acceptați; singura pârghie este Settings > Checkout / Payments: dezactivarea „Dynamic checkout buttons” (butoanele Shop Pay / Apple Pay de pe paginile de produs) elimină `portable-wallets`, dar este o decizie de business, nu un fix de performanță. Păstrați perf-kit (este RUM-ul Shopify și va popula raportul propriu „Web performance”, singura sursă de date CWV disponibilă azi magazinului în afară de GSC).

**Cum verificăm (falsificabilitate):** n/a.

**Indicator timpuriu:** Shopify admin > Online Store > raportul „Web performance” (LCP/CLS/INP bazat pe RUM) după ce perf-kit a strâns 28 de zile de date.

### Ce nu am putut măsura

- **Core Web Vitals lab sau field** — PageSpeed Insights (cota anonimă epuizată, HTTP 429), CrUX, GSC și Lighthouse/Chromium au fost toate indisponibile în sandbox (fără cheie API Google; proxy-ul sandbox-ului re-termină TLS și Chromium nu îl poate accepta, iar scripturile plugin-ului care preiau singure URL-uri sunt refuzate de politica de proxy), deci nu există valori LCP/INP/CLS, TBT, waterfall de cereri sau profil de main thread. Fiecare afirmație despre „elementul LCP” și „costul pe main thread” este o inferență statică; scorul are ±10 puncte incertitudine și trebuie re-bazat pe raportul Shopify „Web performance” sau pe datele CWV din GSC imediat ce oricare are 28 de zile de trafic.
- **TTFB** — măsurat o singură dată, de la un edge din SUA (`IAD`), cu curl (fără reutilizarea conexiunii din browser) și în limita de 15 cereri live, cu 2 s pauză; indică sănătatea serverului, nu experiența utilizatorilor din România.
- **`layout/theme.liquid`** — nu era în dump-ul temei disponibil specialistului (`$R/theme/` avea 15 fișiere); recomandările despre ordinea din head se bazează pe HTML-ul randat și pe structura cunoscută a Impact (fișierul temei de test, `theme-fixes/layout/theme.liquid`, a fost folosit aici doar pentru starea PERFORMANCE-02 și a hint-urilor).
- **Totalul de bytes al fișierelor Barlow** — nu a fost măsurat (URL-urile de preload nu au fost preluate, pentru a respecta bugetul de cereri live); greutățile Poppins efectiv descărcate de un browser depind de ce greutăți folosesc selectorii suprascriși (așteptat 400/500/600/700), nu de cele 54 de fețe declarate.
- **Dimensiunile imaginilor** — măsurate cu un header `Accept` de Chrome (WebP); browserele mai noi pot primi AVIF la dimensiuni ceva mai mici.
- **Template-ul de produs** — evaluat pe un singur supliment (baton-proteic-capsuni); paginile MNX de îmbrăcăminte cu 24–39 de imagini vor fi mai grele în galerie, dar împart același head și aceeași stivă de aplicații.
