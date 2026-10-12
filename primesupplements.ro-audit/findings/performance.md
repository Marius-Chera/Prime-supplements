# Performance & Core Web Vitals - primesupplements.ro (audit 2026-10-12)

## Scope & method

What was checked (static assessment, no lab/field CWV data available):

- Rendered HTML of the four main templates from the local recon copies: `$R/home.html` (630,667 B), `$R/pages/product.html` (/products/baton-proteic-capsuni, 344,857 B), `$R/pages/collection.html` (/collections/pudra-proteica, 310,839 B), `$R/pages/article.html` (/blogs/news/bcaa-vs-eaa-..., 251,128 B) plus `$R/pages/homepage-ro-hu.html` (631,838 B) for parity. `$R` = `/tmp/claude-0/-home-user-Prime-supplements/a8ac683f-a811-5bab-8ad5-3c2925806713/scratchpad/recon`.
- A custom parser (`$S/perfwork/analyze.py`, written for this audit) measured per page: head/body split, script count and loading mode (sync/async/defer/module), inline script bytes by type, `<style>` blocks, `@font-face` declarations, `<link>` hints, `<img>` attributes (loading, fetchpriority, srcset, sizes, width/height, alt), srcset candidate counts, inline SVG count/bytes, section sizes (split on `id="shopify-section-..."`), Judge.me markup density (`jdgm-` occurrences), third-party hosts, DOM element estimate (count of opening tags in `<body>`).
- Theme sources: `$R/theme/snippets__product-card.liquid`, `$R/theme/sections__main-product.liquid`, `$R/theme/templates__index.json`, `$R/theme/templates__collection.json`, `$R/theme/templates__product.json`. `layout__theme.liquid` was NOT present in `$R/theme/` (only `theme-files-raw.json` with 15 files); the `<head>` was therefore audited from the rendered HTML.
- Asset sizes: `$R/perf/asset-sizes-part2.txt` (HEAD transfer sizes from the recon phase), `$R/perf/scripts.txt`, `$R/perf/styles.txt`, `$R/perf/fonts.txt`.
- Live checks (15 throttled requests to the store, 2 s apart, Chrome 130 UA, no 429 encountered): one GET of `/` with timing and response headers (Link / Early Hints / server-timing), HEAD of the homepage hero (`header-desktop.jpg` at width 2800 and 1600, `header-mobile.jpg` at 800), the product LCP image (`01_box_BATONPROTEIC_strawberry_front.jpg` at width 4000), the collection banner (`HILA_13_13_31_59_0798.jpg` at 4000/2600/1600), `pandectes-rules.js`, `theme.js`, `vendor.min.js`, Koala `gifts-embed.js`, Judge.me `loader.js`; image HEADs were repeated with a Chrome `Accept: image/avif,image/webp,...` header to measure what browsers actually receive from the Shopify CDN. Four requests to Google (Poppins CSS, Bebas Neue CSS, one Poppins woff2).

What could NOT be checked: no PageSpeed Insights / Lighthouse / CrUX (anonymous PSI quota exhausted, no API key, no Chromium behind the sandbox proxy), therefore no LCP / INP / CLS values, no main-thread timing, no real request waterfall. All statements about LCP elements, main-thread cost and layout shift are static inferences and are flagged with confidence values. TTFB was measured once from a US vantage point (Shopify edge `IAD`), not from Romania.

## Score

**40 / 100** (uncertainty roughly +/-10 because no lab or field CWV data exists).

Rationale: the platform layer is sound (HTTP/2 + Cloudflare, brotli, Early Hints, 316 ms TTFB, 1-year CDN caching, modern Impact theme with responsive images, `fetchpriority="high"` on the hero and lazy-loading below the fold), but the store carries a heavy app/third-party layer on every one of its ~1,151 URLs: ~170 KB of inline JavaScript in `<head>` (27-65 % of each document), 20 external scripts (12 app extensions, ~350 KB brotli), two render-blocking cross-origin Google Fonts stylesheets injected by the Fontify app on top of the theme's own preloaded Barlow fonts, a parser-blocking script placed before `<meta charset>`, and a 630 KB / ~2,900-element homepage with a duplicated featured-collection section. On a mid-range Android device these patterns typically produce mobile LCP of 3-4.5 s and INP above 200 ms; this is an estimate, not a measurement.

## What works

- HTTP/2 over Cloudflare, brotli compression (homepage 630,667 B raw -> 82,466 B on the wire, 7.6:1), `content-encoding: br` on all theme assets, `cache-control: public, max-age=31557600` on CDN assets, `cf-cache-status: HIT` on images and scripts.
- TTFB 0.316 s and total HTML download 0.737 s measured from a US edge (`server-timing: processing;dur=354 ... db;dur=90, render;dur=223`), i.e. well inside the 0.8 s "good" threshold; HTTP 103 Early Hints are sent with `Link: rel=preload` for `pandectes-rules.js`, `theme.css`, `bss-custom.css` and both Google Fonts CSS, plus `preconnect` to cdn.shopify.com and fonts.googleapis.com.
- Theme payload is small: `theme.css` 27,223 B br, `theme.js` 34,746 B br, `vendor.min.js` 21,056 B br, `bss-custom.css` 192 B; `theme.js`/`vendor.min.js` are `type="module"` (deferred by default). Only ONE classic synchronous script exists (`pandectes-rules.js`, 6,544 B br).
- Responsive images: on the homepage 110/127 `<img>` have `srcset`, 108/127 have `sizes`, 110/127 have `width`+`height`; 100/127 are `loading="lazy"`; the hero slide image is `loading="eager" fetchpriority="high"` with a `<picture><source media="(max-width: 699px)">` mobile variant (`header-mobile.jpg`); product cards lazy-load everything except the first row. The Shopify CDN auto-negotiates WebP (hero 2800 px: 322,050 B JPEG -> 210,712 B WebP; mobile 800 px: 142,253 B -> 82,528 B).
- Product page: the selected variant's gallery image is `loading="eager" fetchpriority="high"` with `width="4000" height="4000"` (CLS-safe) and a 20-step srcset (200-3200 px) with a correct `sizes` chain (`(max-width: 740px) calc(100vw - 40px), (max-width: 999px) calc(100vw - 64px), min(730px, 40vw)`); thumbnails use `widths: '80,160'` / `56-192`.
- Theme fonts (Barlow n4/n7/i4/i7) are self-hosted on the Shopify font CDN as woff2 with `font-display: fallback`, and the two main faces are preloaded.
- Non-critical CSS is already non-blocking: `country-flags.css` uses the `media="print" onload="this.media='all'"` pattern and Secomapp `customer-referral.css` is `rel="preload" as="style"` with onload swap.
- 12 of the 20 external scripts carry `defer`, 4 `async`; the Judge.me loader is only 3,095 B br and defers the widget bundle.

## Findings

### PERFORMANCE-01 - Fontify app injects two render-blocking Google Fonts stylesheets (Poppins with all 18 variants + Bebas Neue) and overrides the theme's already-preloaded Barlow with `!important`, producing a triple font stack on every page
- **Severity:** High
- **Evidence:**
  - `$R/home.html` bytes 56,383-57,747, inside `<head>`: `<!-- BEGIN app block: shopify://apps/fontify/blocks/app-embed/334490e2-... --><link rel="preconnect" href="https://cdn.nitroapps.co" crossorigin=""><link rel="preconnect" href="https://fonts.googleapis.com"> <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bebas+Neue:wght@400&display=swap" /> <link rel="prefetch" href="...Bebas+Neue..." as="style" /> <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" /> <link rel="prefetch" href="...Poppins..." as="style" /> <style id="nitro-fontify">h1,h2,h3,h4,h5,h6,.h0,.text-gradient,.h3{ font-family: 'Bebas Neue' !important; } p,a,li{ font-family: 'Poppins' !important; }</style>` followed by a 5,550 B inline `fontify-scripts` block. Identical block on product, collection and article pages (`$R/perf/fonts.txt`).
  - Live GET of the Poppins CSS with a Chrome UA: 21,893 B, **54 `@font-face` rules** (18 weight/style variants x 3 unicode-range subsets latin / latin-ext / devanagari), 54 distinct woff2 URLs on fonts.gstatic.com; one latin 400 woff2 = 8,404 B. Bebas Neue CSS: 856 B, 2 faces. Romanian diacritics (ă â î ș ț) sit in the latin-ext range, so every weight that is used costs 2 files (latin + latin-ext).
  - The theme simultaneously declares 6 Barlow `@font-face` rules (`font-display: fallback`) and preloads two of them on every page: `<link rel="preload" href="//primesupplements.ro/cdn/fonts/barlow/barlow_n7.691d1d1...woff2" as="font" ...>` and `barlow_n4.038c60d...woff2`; theme CSS variables are `--heading-font-family: Barlow, sans-serif; --text-font-family: Barlow, sans-serif`. Because Fontify's `!important` rules win, Barlow is force-downloaded by the preloads yet used only by elements not matched by `h*/p/a/li` (e.g. the 733 `<span>` price/label elements on the homepage), so the page renders three families.
  - The HTTP `Link` header (103 + 200) preloads both Google Fonts CSS `as=style`, raising their priority above theme assets. There is **no** `preconnect` to `fonts.gstatic.com` (0 occurrences in any page), the host that serves the actual font files, so font fetching needs an extra DNS + TLS handshake on the critical path while `cdn.nitroapps.co` is preconnected without any resource ever being requested from it.
  - Mixed `font-display`: Barlow `fallback`, Google fonts `swap` -> text can paint in a fallback, re-flow to Barlow, then re-flow again when Poppins arrives (two swaps = layout-shift risk on every text block).
- **Affected scope:** every template, all ~1,151 indexable URLs (575 x2 with /ro-hu/).
- **Recommendation (Shopify-feasible, theme settings first):**
  1. Preferred (effort S, no code): Online Store > Themes > Customize > Theme settings > Typography: choose **Poppins** (body) and **Bebas Neue** (headings) from Shopify's built-in font library (both are in it). Impact then emits `@font-face` from `fonts.shopifycdn.com` for only the weights it uses, keeps its existing `<link rel="preload" as="font">` logic and `font-display` setting, and the `!important` cascade disappears. Then **uninstall Fontify** (removes 2 cross-origin render-blocking stylesheets, 2 `prefetch` links, the `cdn.nitroapps.co` preconnect and the 5.5 KB inline script).
  2. If the shop insists on keeping Fontify: shrink the Google Fonts request to the weights actually used by the theme (`family=Poppins:wght@400;500;600;700` -> 12 faces instead of 54, CSS ~5 KB), add `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` in theme.liquid above the app block, remove the `rel="prefetch"` duplicates, and set the theme fonts to a system stack so Barlow is no longer declared/preloaded.
  3. Either way remove the obsolete `<link rel="dns-prefetch" href="https://productreviews.shopifycdn.com">` (Shopify Product Reviews app was retired; nothing is loaded from that host).
- **Falsifiability:** a WebPageTest/Lighthouse run after the change should show zero requests to fonts.googleapis.com and fonts.gstatic.com, no `barlow_*.woff2` requests, and the "Eliminate render-blocking resources" audit must not list a fonts CSS.
- **Leading indicator:** font requests per page drop from 2 CSS + >=6 woff2 across 3 hosts to <=4 woff2 from one host; `document.fonts.size` in DevTools <= 4; CLS contribution from text nodes disappears in the Performance panel.
- **Effort:** S
- **Confidence:** 0.9

### PERFORMANCE-02 - `pandectes-rules.js` is the only classic synchronous script and it is placed before `<meta charset>`, pushing the charset declaration past the first 1,024 bytes
- **Severity:** Medium
- **Evidence:** `$R/home.html` starts with the Organization JSON-LD block (bytes 44-~1,000), then `<script src="//primesupplements.ro/cdn/shop/files/pandectes-rules.js?v=5266668933134717877"></script>` (no `async`/`defer`, src attribute at byte 1,022) and only then `<meta charset="utf-8">` at **byte 1,078** (measured with `bytes.find` on `$R/home.html`) (the HTML spec and Lighthouse "charset" audit require the declaration within the first 1,024 bytes; otherwise the parser may have to re-decode). The script is 6,544 B br, `cf-cache-status: HIT`, preloaded by the `Link` header (`<//primesupplements.ro/cdn/shop/files/pandectes-rules.js...>; as="script"; rel="preload"`) so the download overlaps TLS, but its execution still blocks parsing of the remaining ~169 KB of `<head>`. Per-page script mix from `analyze.py`: `defer: 12, async: 3, sync+module: 3 (modules are deferred), sync: 1 (this file), async+module: 1`.
- **Affected scope:** every page (the head is identical on all templates).
- **Recommendation:** In `layout/theme.liquid` move `<meta charset="utf-8">` and `<meta name="viewport">` to be the first children of `<head>`, then the Pandectes script (Pandectes requires an early synchronous placement to block pixels before consent; keep it synchronous but after charset), then the schema-organization snippet (JSON-LD does not need to be first). Target order: `<meta charset>` -> viewport -> pandectes-rules.js -> title/meta -> preconnects/preloads -> CSS. Keep the existing Early Hints preload.
- **Falsifiability:** `curl -s https://primesupplements.ro/ | head -c 1024 | grep -c 'meta charset'` returns 1; Lighthouse "Properly defines charset" passes.
- **Leading indicator:** `<meta charset>` byte offset < 200.
- **Effort:** S
- **Confidence:** 0.85

### PERFORMANCE-03 - ~170 KB `<head>` with 60 inline scripts (133-145 KB of inline JavaScript) on every template, 27 % to 65 % of each document
- **Severity:** High
- **Evidence (analyze.py):**
  | template | HTML bytes | `<head>` bytes | head share | head `<script>` | inline JS bytes |
  |---|---|---|---|---|---|
  | home | 630,667 | 171,229 | 27 % | 60 | 143,057 |
  | product | 344,857 | 170,064 | 49 % | 60 | 145,078 |
  | collection | 310,839 | 172,693 | 55 % | 60 | 144,763 |
  | article | 251,128 | 163,326 | 65 % | 60 | 133,545 |
  Largest inline blocks (bytes, identical on all pages): `window.jdgmSettings={...}` **30,839** (Judge.me settings incl. 533 B `widget_gdpr_statement`, 410 B `qna_widget_flow_gdpr_statement`, 392 B `write_review_flow_gdpr_statement`), web-pixels-manager loader 14,376-24,648, `window.mktr` themarketer tracking **19,347-19,738** (273 `window.mktr` references, executed synchronously), `window.PandectesSettings` **16,498**, Shopify asyncLoad/Monorail 6,568-7,069, Secomapp `uppromote-mess` 6,517, Fontify 5,550, `estimatorConfig` 3,932-6,337, Judge.me blocker 2,437, Clarity snippet. Inline JSON/LD-JSON is only 2-6 KB, so the weight is executable JS, not data.
- **Affected scope:** every page; the 60 head scripts must be parsed before the first byte of `<body>` is seen, delaying hero/LCP discovery on all ~1,151 URLs.
- **Recommendation:**
  1. Uninstall or pause apps that no longer earn their keep (each removal deletes its inline config + its external script): Estimator (shipping estimator, `estimatorConfig` on every page incl. blog), Secomapp Affiliate/UpPromote (`uppromote-mess` + `core.min.js` + `customer-referral.js` + CSS) unless the affiliate program is active, BlogGenAuto `tracking.js`, Pop Convert, Fontify (see 01).
  2. themarketer: replace the 19.7 KB synchronous inline snippet with the vendor's async loader (`<script async src="https://t.themarketer.com/t/j/...">`) or load it through GTM after consent.
  3. Judge.me: in the app's settings disable unused widgets (Q&A, review carousel on non-product pages, "Verified badge" etc.) which shrinks `jdgmSettings`; Judge.me also offers "Load widget JS only on product pages" for stores that do not show review badges elsewhere.
  4. Pandectes: keep, but the 16.5 KB `PandectesSettings` can be reduced by trimming the banner translations to `ro` only in the app dashboard.
  Expected effect: `<head>` from ~170 KB to <70 KB, head script count from 60 to ~25.
- **Falsifiability:** `python3 analyze.py home.html` after changes reports `head_bytes < 80000` and `script_inline < 30`.
- **Leading indicator:** Lighthouse "Reduce JavaScript execution time" / TBT in lab; CrUX INP p75 once GSC CWV report has data.
- **Effort:** M
- **Confidence:** 0.85

### PERFORMANCE-04 - 20 external scripts per page, 12 of them app extensions (~350 KB brotli), plus 8 web pixels: the main-thread cost lands on every template including blog articles
- **Severity:** High
- **Evidence:** `$R/perf/scripts.txt` lists 20 external scripts on the homepage (identical set on product/collection/article). Measured transfer sizes (`$R/perf/asset-sizes-part2.txt` + live HEADs, brotli): Koala upsell gift `gifts-embed.js` **120,286 B**, Shopify `portable-wallets.ro.js` 78,457 B, Dondy WhatsApp `ChatBubble.js` 64,499 B, `theme.js` 34,746, `perf-kit` 26,401, `vendor.min.js` 21,056, es-modules-shim ~15,000 (context), Judge.me `loader.js` 3,095 (then loads the widget bundle from cdn.judge.me), `standard-actions.js` 4,462, Pop Convert `main.js` 302 (loader), GTM loader 1,555 (then the container), plus Secomapp `core.min.js` + `customer-referral.js`, Estimator `estimator-init.js`, BlogGenAuto `tracking.js` (loaded **twice**: head offset 136,323 and body offset 628,908), `load_feature`, `origin_trials`, `preloads.js`, `shop-js cart-sync`. Pixels: the web-pixels-manager config lists **6 APP pixels + 2 CUSTOM pixels** (Microsoft Clarity projectId `tepopueyt5`, Simprosys, Facebook (12 references), TikTok (5), Pinterest (2), Klaviyo (2), themarketer) and GTM. Chat bubble, gift pop-up and Pop Convert all inject DOM after load (classic late-CLS and INP sources). Third-party hosts touched on first view: primesupplements.ro, cdn.shopify.com, fonts.googleapis.com, fonts.gstatic.com, cdn.judge.me/cdn1/api/cdnwidget, www.googletagmanager.com, www.clarity.ms, t.themarketer.com, monorail-edge.shopifysvc.com (+ pixel hosts via GTM/WPM).
- **Affected scope:** all templates; blog articles (354 x2 URLs) carry the full commerce stack (Koala gifts, WhatsApp, Estimator, Judge.me) although none of it renders there.
- **Recommendation:**
  1. Theme editor > App embeds: switch off embeds that are not needed site-wide; for Koala Upsell Gift use the app's "load only on product/cart pages" option or replace with a theme-native cart-drawer message; load the Dondy chat bubble on first scroll/interaction (the app has a "delay" setting) or replace it with a plain `https://wa.me/40775286584` link in the footer (zero JS).
  2. Remove the duplicated BlogGenAuto `tracking.js` (one copy is an app embed, the other is in the footer section `custom_liquid`/app block) and uninstall it if the blog tracking is unused.
  3. Consolidate marketing tags: keep Facebook/TikTok/Pinterest as Shopify-native channel pixels (loaded lazily by the pixel manager) and drop the duplicate GTM-side tags, or the reverse, not both; run Clarity through GTM with a consent trigger only.
  4. Keep Shopify platform scripts (perf-kit, portable-wallets, es-modules-shim) but note that `portable-wallets.ro.js` (78 KB) only exists because dynamic checkout buttons are enabled on product pages; if the "Buy with Shop Pay" button is kept, that cost is intentional.
  Target: <= 10 external scripts and < 200 KB brotli of third-party JS on article/collection templates.
- **Falsifiability:** `grep -c '<script src' page.html` <= 12 on a blog article; Lighthouse "Third-party usage" total < 300 ms main-thread time on mobile throttling.
- **Leading indicator:** Lighthouse TBT, CrUX INP p75 (GSC Core Web Vitals report, once populated).
- **Effort:** M
- **Confidence:** 0.8

### PERFORMANCE-05 - Homepage: 630 KB HTML, ~2,944 DOM elements, 41 product cards from 7 featured-collection sections, including a duplicated "Cele mai vandute" section rendering the same 6 products twice
- **Severity:** High
- **Evidence:**
  - `$R/theme/templates__index.json` order: 25 sections, of which **7 `featured-collection`** (haine-mnx, pudra-proteica, prime-health, suplimente-pre-workout, lansate-recent, cele-mai-vandute, cele-mai-vandute), each `products_count: 6`, 4 per row desktop, plus a `featured-product` section with 13 blocks, slideshow, image-link-blocks, collection-list, media-grid, hot-spots, before-after, press, multiple-images-with-text, revealed-image-on-scroll, blog-posts, faq, 2 `apps` sections.
  - Rendered sizes (analyze.py section split): `featured_collection_NFyp6g` 40,663 B and `featured_collection_bt96pP` 40,655 B both render **exactly** `/products/baton-proteic-capsuni, creatina-creapure, eaa-aminoacizi-esentiali, prime-whey-1000g, prime-whey-2000g, pure-isolate-2000g` (identical sets: True); the other five collections add 31-38 KB each. 41 `<product-card>` elements = 230,844 B (37 % of the page, 5,625 B per card) but only **32 distinct products** (`prime-whey-2000g`, `prime-whey-1000g`, `pure-isolate-2000g` appear 3x; `creatina-creapure`, `eaa-aminoacizi-esentiali`, `baton-proteic-capsuni` 2x) because `lansate-recent` and `cele-mai-vandute` both contain all 185 products (context: "All 185 products sit in all / cele-mai-vandute / lansate-recent").
  - Per card: 1.83 `<img>` (secondary hover image enabled, `product-card__image--secondary` with its own 12-step srcset), a `<quick-buy-drawer>` (29 drawers on the page), 2,174 B of `srcset` strings; page totals: 1,239 srcset candidates (130,366 B of `srcset` attribute text), 106 inline `<svg>` (43,711 B; the `icon-quick-buy-cart` SVG is repeated 37x, chevrons 11x/6x/5x), 62 `<style>` blocks (44,377 B of per-section CSS), `<div>` 770, `<span>` 733, `<button>` 128, 58,334 B of whitespace (9 %), 127 HTML comments.
  - DOM estimate 2,944 elements (Lighthouse flags > 1,500; the mobile Impact layout still renders every desktop card). `/ro-hu/` is a byte-identical 631,838 B copy.
  - The JSON-LD on the homepage is only 3,623 B, so structured data is not the cause.
- **Affected scope:** homepage (/ and /ro-hu/), the most-linked and most-visited URL; server render time `render;dur=223` ms is also driven by this template.
- **Recommendation (theme editor only, effort S):**
  1. Delete section `featured_collection_bt96pP` (duplicate of `NFyp6g`): -40.6 KB, -6 cards, -12 images, -6 quick-buy drawers.
  2. Drop `lansate-recent` from the homepage (it is the same 185-product automatic collection as `cele-mai-vandute`) or reduce `products_count` to 4 for the remaining collections and enable "stack products"=false carousel on mobile: target <= 4 featured collections / <= 20 cards.
  3. Theme settings > Product cards: turn off "Show secondary image on hover" (-~35 images and ~45 KB of srcset markup) and "Quick buy" on the homepage sections (-29 drawers, -37 inline cart icons).
  4. Keep the FAQ section but fold the `press`, `before-after-image`, `hot-spots` and `revealed-image-on-scroll` sections that carry marketing images below the fold into one `multiple-images-with-text`.
  Expected: homepage HTML ~630 KB -> ~380 KB, DOM < 1,800, LCP unaffected but parse/style/layout cost roughly halved on mobile.
- **Falsifiability:** `grep -c '<product-card' home.html` <= 24 and no two `featured-collection` sections with the same `collection` handle in `templates/index.json`.
- **Leading indicator:** Lighthouse "Avoid an excessive DOM size" passes (< 1,500 nodes) and "Avoid enormous network payloads" HTML row < 400 KB.
- **Effort:** S
- **Confidence:** 0.9

### PERFORMANCE-06 - Judge.me footprint is loaded on every template (incl. blog and collections): 30.8 KB inline settings, 14.5 KB render-blocking CSS, 4 style blocks, 1,104 `jdgm-` markup occurrences on the homepage
- **Severity:** Medium
- **Evidence:** `jdgm-` occurrences: home 1,104, product 492, collection 195, article 120. Judge.me inline `<script>` blocks: 3 per page = 34,988 B; `<style>` blocks with jdgm rules: 4 (7,181 B) on home, 3 (6,974 B) on product; `<link rel="stylesheet" ... judgeme-775/assets/shopify_v2.css media="all">` = 14,513 B br, render-blocking, present on article pages where no review widget renders. Homepage `apps` section `1752713175620cb137` = 22,354 B: the Judge.me "featured carousel" (`<h2 class='jdgm-carousel-title'>Let customers speak for us</h2>`, 15 review images, 5 style blocks); 41 product cards each carry a `jdgm-prev-badge` placeholder. `dns-prefetch` hints for cdn.judge.me, cdn1.judge.me, api.judge.me; the widget bundle itself is fetched from cdn.judge.me after `loader.js` (3,095 B br).
- **Affected scope:** all templates; heaviest on the homepage and product pages.
- **Recommendation:** Judge.me dashboard > Settings > "Widget loading": enable "Only load widgets on pages where they are used" / disable the Q&A widget and the floating "Reviews" tab; scope the app block CSS to product templates (Judge.me supports moving the CSS into the theme app block instead of the global embed); on the homepage keep the carousel only if it is above the fold, otherwise lazy-render it via the Impact "reveal on scroll" wrapper; translate the carousel title in the app ("Let customers speak for us" -> "Ce spun clientii nostri"). Also expose the Judge.me rich-snippet JSON-LD on product pages (currently absent, see schema findings) so the review markup at least earns stars.
- **Falsifiability:** on `/blogs/news/<article>` the HTML contains no `shopify_v2.css` link and `jdgm-` count < 20.
- **Leading indicator:** render-blocking CSS requests per page from 5 to 2 (theme.css + bss-custom.css).
- **Effort:** S
- **Confidence:** 0.8

### PERFORMANCE-07 - Homepage LCP image (slideshow slide 1, `header-desktop.jpg` / `header-mobile.jpg`) is 211 KB WebP on desktop and 83 KB WebP for an 800 px mobile variant, and is not preloaded although it is discovered only after ~170 KB of head scripts
- **Severity:** Medium
- **Evidence:** `$R/home.html` section `slideshow` (`autoplay="6"`, 3 slide blocks, `transition="fade_with_text"`): `<picture><source media="(max-width: 699px)" srcset="header-mobile.jpg?width=400 400w ... 1200w"><img src="header-desktop.jpg?v=1747640020&width=2800" srcset="200w ... 2800w" sizes="100vw" width/height set, loading="eager" fetchpriority="high">`. Live HEAD: `header-desktop.jpg&width=2800` = 322,050 B JPEG / **210,712 B WebP** (with browser Accept), `&width=1600` = 181,249 B JPEG, `header-mobile.jpg&width=800` = 142,253 B JPEG / **82,528 B WebP** (very heavy for 800 px, i.e. a noisy or high-quality-exported source; `last-modified` on the 1600/800 variants was `cf-cache-status: MISS`, so those sizes are rarely requested). No `<link rel="preload" as="image">` for the hero in HTML or in the `Link` header (the header preloads 5 CSS/JS assets but no image). Estimated LCP element on this template: slide-1 `<img>`; on 390 px/DPR 3 phones the browser picks the 1200 px mobile variant (~120+ KB WebP).
- **Affected scope:** / and /ro-hu/.
- **Recommendation:** (a) Re-export `header-desktop.jpg` at 2000 px max, quality ~72, and `header-mobile.jpg` at 1000 px (target <= 110 KB desktop WebP, <= 45 KB mobile); upload as JPEG, the CDN converts. (b) Add a responsive preload in `layout/theme.liquid` for the index template: `{% if template.name == 'index' %}<link rel="preload" as="image" imagesrcset="{{ 'header-mobile.jpg' | file_img_url: '800x' }} 800w, ..." imagesizes="100vw" media="(max-width: 699px)">{% endif %}` (and the desktop equivalent) or, simpler, request Shopify's Impact "preload hero image" setting if the installed version exposes it. (c) Set slideshow autoplay off or >= 8 s so the LCP slide is not swapped before paint on slow devices.
- **Falsifiability:** Lighthouse "Largest Contentful Paint element" = slide-1 image with "Resource load delay" < 300 ms and image transfer < 120 KB.
- **Leading indicator:** LCP image bytes in the PSI "Improve image delivery" insight.
- **Effort:** S
- **Confidence:** 0.75 (LCP element inferred statically)

### PERFORMANCE-08 - Collection pages: parallax banner image with `sizes="130vw"` from a 4000 x 2667 source requests the 2600 px variant on desktop (298 KB WebP) and 1600 px on phones (151 KB WebP)
- **Severity:** Medium
- **Evidence:** `$R/pages/collection.html` section `template--25112931467639__banner`: `<img src="HILA_13_13_31_59_0798.jpg?v=1749720141&width=4000" srcset="200w ... 3200w" sizes="130vw" width="4000" height="2667" loading="eager" fetchpriority="high">` wrapped in the Impact parallax container (`parallax: True` in the surrounding markup). With `130vw` a 1920 px viewport resolves to 2,496 px -> 2600 px candidate; a 390 px DPR-3 phone resolves to 1,521 px -> 1600 px. Live HEAD (Accept webp): width 2600 = **298,324 B**, width 1600 = **151,166 B**, width 4000 (src fallback) = 895,457 B JPEG. Estimated LCP element for collection templates: this banner image (above the product grid; 5 product cards per page in the first grid chunk, each with secondary image).
- **Affected scope:** 23 collections x 2 (/ro-hu/) that use the banner section (the audited `pudra-proteica`; `collection-all.html`, `collection-creatina.html` etc. use the same template `templates__collection.json`).
- **Recommendation:** In the banner section settings disable "Parallax" (Impact then emits `sizes="100vw"`, cutting the requested width by 23 %) or reduce the section height so the image is cropped; re-upload the banner at 2400 px wide, quality ~70 (target <= 150 KB desktop WebP); for mobile add a separate "Mobile image" in the section (Impact supports it) at 1000 px. Keep `fetchpriority="high"`.
- **Falsifiability:** collection banner `<img>` has `sizes="100vw"` and the largest requested variant is < 160 KB in the network panel at 1920 px.
- **Leading indicator:** LCP resource size on collection URLs in PSI.
- **Effort:** S
- **Confidence:** 0.8

### PERFORMANCE-09 - Product gallery `src` fallback points at the 4000 px rendition (600 KB WebP / 977 KB JPEG) and each gallery image is referenced 8 times in the HTML
- **Severity:** Low
- **Evidence:** `$R/pages/product.html`: `<img src="//primesupplements.ro/cdn/shop/files/01_box_BATONPROTEIC_strawberry_front.jpg?v=1749666742&width=4000" ... srcset up to 3200w, sizes="(max-width: 740px) calc(100vw - 40px), (max-width: 999px) calc(100vw - 64px), min(730px, 40vw)">`. Live HEAD of that `src` URL: 977,771 B JPEG, 599,536 B WebP. Modern browsers honour `srcset`/`sizes` (desktop DPR 2 -> 1600 px; phone DPR 3 -> 1200 px), so the 4000 px file is downloaded only by clients that ignore `srcset` (some scrapers, older WebViews, image SERP fetchers) or by users who zoom; `width="4000" height="4000"` is used on the 56-192 px thumbnails as well. 8 `<img>` reference the two product images (main, thumbnail, variant-media, swatch), plus a 40 KB `featured_collection_cq8VYt` recommendation section with 6 cards.
- **Affected scope:** 185 products x 2.
- **Recommendation:** In `snippets/product-gallery` (not in the dump; it is rendered from `sections/main-product.liquid`) cap the `image_url: width:` fallback at 2000 (`image | image_url: width: 2000`) and the `widths` list at `'200,...,2000,2400'`; upload product photos at <= 2500 px (the source JPEGs are 4000 px, ~1 MB). Keep thumbnails as they are.
- **Falsifiability:** `grep -c 'width=4000' product.html` = 0.
- **Leading indicator:** bytes transferred when Googlebot-Image fetches the product gallery (GSC crawl stats "Image" response size).
- **Effort:** S
- **Confidence:** 0.7

### PERFORMANCE-10 - Images without `width`/`height` (CLS) injected by apps and custom Liquid: 17 on the homepage, 3 on product, 2 on collection, 3 on article
- **Severity:** Low
- **Evidence (analyze.py `img_with_wh`):** home 110/127, product 24/27, collection 21/23, article 6/9. Concrete offenders: product page `<img src="https://cdn.shopify.com/s/files/1/0917/5138/3415/files/europe-flag-icon.webp?v=1765984894" alt="Steag UE" class="eu-flag" />` (BSS B2B price block, no dimensions, no srcset); footer `custom_liquid_c8cJ96` (13,146 B on product, 8,449 B on home): `<img src=".../logo-anpc-sol.aa50985c.png" alt="ANPC SOL" style="height: 50px;">` and `logo-anpc-sal...png` with no `width` (height fixed by inline style only, width unknown until decode); article body `<img src="https://cdn.shopify.com/s/files/1/0917/5138/3415/files/silicoane-mai-mari.png?v=1773333647">` with no dimensions, no `srcset`, served at original size; Judge.me carousel review photos (15) on the homepage without dimensions until the widget CSS loads.
- **Affected scope:** all templates (footer), all products (flag icon), articles with in-body uploads.
- **Recommendation:** in the footer custom Liquid add explicit `width="120" height="50"` (use the real intrinsic ratio) and `loading="lazy"`; in BSS B2B settings disable the EU flag or add dimensions via the app's custom CSS (`.eu-flag{width:24px;height:16px}`); in BlogGenAuto / the article editor always insert images through Shopify Files with `width`/`height` (Shopify's rich-text editor adds them when the image is uploaded via the editor rather than pasted as an external URL).
- **Falsifiability:** analyze.py `img_with_wh == img_count` for product and article pages.
- **Leading indicator:** CLS p75 in CrUX once available; Lighthouse "Image elements do not have explicit width and height" passes.
- **Effort:** S
- **Confidence:** 0.8

### PERFORMANCE-11 - Redundant and duplicated resource hints and tags: `country-flags.css` linked 3x, BlogGenAuto `tracking.js` 2x, Google Fonts CSS both `stylesheet` and `prefetch`, unused `preconnect` to cdn.nitroapps.co, obsolete `dns-prefetch` to productreviews.shopifycdn.com, duplicate `preconnect` to cdn.shopify.com in the Link header, missing `preconnect` to fonts.gstatic.com
- **Severity:** Low
- **Evidence:** analyze.py: `country-flags link count: 3` (body offsets 187,211 / 199,169 / 618,445, each `media="print" onload=...`), `bloggenauto tracking.js count: 2` (head + body), `rel="prefetch"` x2 for the two fonts CSS already loaded as stylesheets, `<link rel="preconnect" href="https://cdn.nitroapps.co" crossorigin="">` with 0 resources from that host, `<link rel="dns-prefetch" href="https://productreviews.shopifycdn.com">` (retired Shopify app), `Link:` header `<https://cdn.shopify.com>; rel="preconnect", <https://cdn.shopify.com>; rel="preconnect"; crossorigin` (both variants, the HTML repeats the first), `fonts.gstatic.com` referenced 0 times. 9 hint links in total on each page, 4 of them pointless.
- **Affected scope:** every page.
- **Recommendation:** remove the three extra `country-flags.css` renders (the localization selector snippet is rendered in header, mobile drawer and footer; render the stylesheet once in `layout/theme.liquid` or let Impact's `localization-selector` snippet guard with `{% unless country_flags_loaded %}`), delete the second BlogGenAuto embed, and clean the hints as described in PERFORMANCE-01. Browser connection slots and HTTP/2 priority are finite; unused preconnects cost DNS/TLS work on mobile.
- **Falsifiability:** `grep -c country-flags.css page.html` = 1; `grep -c tracking.js` <= 1.
- **Leading indicator:** request count on a cold load (currently ~75+ requests on the homepage by inspection of the markup).
- **Effort:** S
- **Confidence:** 0.9

### PERFORMANCE-12 - Orphaned app blocks fail to render on every page (`pagefly-ai-page-builder` app embed on all 4 templates, `youtube_gallery_carousel_widget_block` on homepage and product)
- **Severity:** Low
- **Evidence:** HTML comments in the rendered output: `<!-- Failed to render app block "pagefly-ai-page-builder": app block path "shopify://apps/pagefly-ai-page-builder/blocks/app-embed/83e179f7-..." -->` on home, product, collection, article and /ro-hu/; `<!-- Failed to render app block "youtube_gallery_carousel_widget_block_VUYNWw": app block path "shopify://apps/youtube-gallery/blocks/carousel-widget-block/2073..." -->` on home (apps section `1773543102ef58f575`) and product (`PNnybF`). Both apps are uninstalled but their blocks remain in `config/settings_data.json` / `templates/index.json` / `templates/product.json`, leaving an empty `apps` section (`section section-blends section-full`) with its two `<style>` blocks in the DOM.
- **Affected scope:** all pages (PageFly embed), homepage + 185 products (YouTube block).
- **Recommendation:** Theme editor: delete the empty "Apps" section on the homepage and the YouTube block on the product template; Theme settings > App embeds: remove the PageFly entry (or `settings_data.json` > `current.blocks` cleanup). Zero bytes of value, and the dangling references will break the theme-editor "apps" section once PageFly's block ID is reused.
- **Falsifiability:** `grep -c 'Failed to render app block' page.html` = 0.
- **Leading indicator:** n/a (hygiene).
- **Effort:** S
- **Confidence:** 0.95

### PERFORMANCE-13 - Article template: `<head>` is 65 % of the document, the featured image (LCP candidate) is not `fetchpriority="high"`, in-body images lack `sizes`, and the BlogGen generator adds 12 body `<style>` blocks and a second JSON-LD set
- **Severity:** Low
- **Evidence:** `$R/pages/article.html`: 251,128 B total, head 163,326 B; featured image `<img src=".../articles/HILA_13_16_35_43_2090_...jpg?v=1773333702&width=1500" srcset="200w ... 1500w" sizes="(max-width: 1149px) 100vw, 1000px" width="1500" height="1000" loading eager>` with no `fetchpriority`; two in-body `HILA_13_14...jpg` / `HILA_13_13...jpg` images `width="4000" height="2667"` with `srcset` but **no `sizes`** (browser assumes 100vw -> over-fetch on desktop), one PNG without any dimensions; `<style>` in body: 12; `application/ld+json` blocks: 2 (theme + BlogGen's embedded copy); 88 `<li>`, 85 `<a>` in a 758-element DOM (the DOM itself is fine). The article template also loads the full commerce app stack (PERFORMANCE-04).
- **Affected scope:** 354 articles x 2.
- **Recommendation:** in `sections/main-article.liquid` render the featured image with `fetchpriority: 'high'` and `loading: 'eager'` when `section.settings.show_featured_image`; strip the BlogGen inline `<style>` and duplicate JSON-LD during the blog clean-up task (content/schema owners); add `sizes="(max-width: 1149px) 100vw, 1000px"` to body images (Shopify's editor omits it; a small Liquid filter on `article.content` or the clean-up script can add it).
- **Falsifiability:** article page `img_fetchpriority_high == 1`, body `<style>` count 0.
- **Leading indicator:** LCP on article URLs in PSI (LCP element should be the featured image, not a text block).
- **Effort:** S (theme) / M (354 bodies)
- **Confidence:** 0.75

### PERFORMANCE-14 - Autoplaying slideshow (6 s) and autoplaying featured-product media carousel on the homepage
- **Severity:** Low
- **Evidence:** `<slideshow-carousel ... transition="fade_with_text" autoplay="6">` with 3 slide blocks (each slide a full `<picture>` with 12-19 candidates) and `<media-carousel desktop-mode="carousel_thumbnails_left" adaptive-height ... autoplay id="product-gallery-14971469562231-template--24912812704119__featured-product">` (`adaptive-height` means the carousel height changes per media -> layout shift on each auto-advance). `templates__index.json`: slideshow `autoplay: true`.
- **Affected scope:** homepage.
- **Recommendation:** Theme editor: Slideshow > disable "Autoplay" (or >= 8 s), Featured product > disable "Autoplay" / "Adaptive height"; this also respects `prefers-reduced-motion` users.
- **Falsifiability:** `grep -c 'autoplay' home.html` = 0.
- **Leading indicator:** CLS p75 on the homepage.
- **Effort:** S
- **Confidence:** 0.7

### PERFORMANCE-15 - Inline per-section CSS (62 `<style>` blocks, 44 KB) and inline SVG icon duplication (106 SVGs, 43.7 KB) on the homepage
- **Severity:** Low
- **Evidence:** analyze.py: `style_tags: 62`, `inline_css_bytes: 44,377` (head 19,836 B of Barlow `@font-face` + CSS variables, body 56 section-scoped blocks such as `#shopify-section-... { --section-background-hash: ...; } #shopify-section-... + * { --previous-section-background-hash: ... }` emitted twice per section), `inline_svg_count: 106`, `inline_svg_bytes: 43,711`, most repeated: `icon-quick-buy-cart` x37, `icon-chevron-right-small` x11, `icon-chevron-bottom-small` x6. Product page: 39 style tags / 33 KB, 55 SVGs / 23.8 KB. These bytes are inside the brotli-compressed HTML (cheap on the wire) but each `<style>` forces style recalculation and each inline SVG is a DOM subtree (119 `<path>` elements on the homepage).
- **Affected scope:** all templates, proportional to section count.
- **Recommendation:** mostly solved by PERFORMANCE-05 (fewer sections/cards). For the icons, Impact's `snippets/icon.liquid` can be swapped for an SVG sprite (`<svg><use href="#icon-quick-buy-cart">`) defined once in `layout/theme.liquid`; this is a theme-code change (M) and only worth doing after the section cleanup.
- **Falsifiability:** homepage `<svg>` count < 50, `<style>` count < 35.
- **Leading indicator:** Lighthouse "Avoid an excessive DOM size" node count.
- **Effort:** M
- **Confidence:** 0.7

### PERFORMANCE-16 - Server response and HTML caching are healthy but render time is template-driven (Info)
- **Severity:** Info
- **Evidence:** live GET of `/`: `http=200 size_download=82466 ttfb=0.316s total=0.737s tls=0.216s`; `server-timing: processing;dur=354;desc="gc:33", db;dur=90, db_async;dur=112, render;dur=223, edge;desc="IAD", pageType;desc="index", compressionLevel;desc="5", compressionTime;dur=11, earlyhints`; `cf-cache-status: DYNAMIC` (HTML is never edge-cached on Shopify; normal); HTTP 103 Early Hints with 5 preloads + 3 preconnects. 223 ms of Liquid render for 25 sections / 41 cards is the largest server-side component; Romanian visitors are served from a European Shopify/Cloudflare edge, so field TTFB should be at or below this.
- **Affected scope:** all pages.
- **Recommendation:** no action beyond PERFORMANCE-05; re-measure `server-timing` after removing the duplicate and redundant sections (expect `render` < 150 ms on the homepage).
- **Falsifiability:** `curl -sI https://primesupplements.ro/ | grep server-timing` shows `render;dur` < 150.
- **Leading indicator:** TTFB p75 in CrUX / GSC.
- **Effort:** S
- **Confidence:** 0.9

### PERFORMANCE-17 - Shopify platform scripts (`portable-wallets.ro.js` 78 KB, `perf-kit` 26 KB, `es-modules-shim` 15 KB, `standard-actions.js` 4 KB, `shop-js cart-sync`) are present on every template (Info)
- **Severity:** Info
- **Evidence:** `$R/perf/asset-sizes-part2.txt`: `78457 br portable-wallets.ro.js`, `26401 br shopify-perf-kit-3.10.1.min.js`, `4462 br standard-actions.js`, `329 br loader.init-shop-cart-sync.ro-RO.esm.js`; context file: es-modules-shim 15 KB (async, needed only because Impact uses an `importmap` and Shopify injects the polyfill for old browsers). All are `defer`/`async`/`module`, so they do not block rendering, but they add ~125 KB brotli (~400 KB parsed) of main-thread work after load, including on blog pages that have no checkout.
- **Affected scope:** all pages.
- **Recommendation:** accept; the only lever is Settings > Checkout / Payments: disabling "Dynamic checkout buttons" (Shop Pay / Apple Pay buttons on product pages) removes `portable-wallets`, which is a business decision rather than a performance fix. Keep perf-kit (it is Shopify's RUM and will populate Shopify's own Web Vitals report, the only CWV data source available to the store today besides GSC).
- **Falsifiability:** n/a.
- **Leading indicator:** Shopify admin > Online Store > "Web performance" report (Shopify's RUM-based LCP/CLS/INP) once perf-kit has gathered 28 days of data.
- **Effort:** S
- **Confidence:** 0.9

## Prioritised fix order (Shopify-feasible)

1. Theme settings only, same day: delete the duplicate "Cele mai vandute" section and trim featured collections (05); switch Poppins/Bebas Neue to the Shopify font library and uninstall Fontify (01); disable slideshow/carousel autoplay (14); remove orphaned app blocks (12); disable banner parallax and re-export hero/banner images (07, 08).
2. App housekeeping, 1-2 days: uninstall/scope Estimator, Secomapp affiliate, BlogGenAuto tracking, Pop Convert; restrict Koala gift and Dondy chat to product/cart or load on interaction; consolidate pixels (03, 04); Judge.me widget scoping (06).
3. Theme code (on the unpublished duplicate theme the audit workflow already plans): reorder `<head>` so `<meta charset>` precedes `pandectes-rules.js` (02); single `country-flags.css` render and hint cleanup (11); `fetchpriority` on article featured image and gallery width cap (09, 13); dimensions on custom-liquid images (10); optional icon sprite (15).

Estimated LCP element per template (static inference): home = slideshow slide-1 `<img>` (`header-desktop.jpg` / `header-mobile.jpg`); product = selected-variant gallery image (`01_box_BATONPROTEIC_strawberry_front.jpg`, eager + fetchpriority high); collection = banner `<img>` `HILA_13_13_31_59_0798.jpg` (parallax, 130vw); article = featured image `HILA_13_16_35_43_2090...jpg` (1500 px, eager, no fetchpriority) or, if it is pushed below the fold by the sticky header + announcement bar on small phones, the H1 text block rendered in Bebas Neue (which then depends on the Google Fonts chain in 01).

## Limitations

- No lab or field Core Web Vitals: PageSpeed Insights (anonymous quota exhausted), CrUX, GSC and Lighthouse/Chromium were all unavailable in this sandbox, so no LCP/INP/CLS values, no TBT, no request waterfall and no main-thread profile exist. Every "LCP element" and "main-thread cost" statement above is a static inference; the score carries roughly +/-10 points of uncertainty and should be re-based on Shopify's Web performance report or GSC CWV data as soon as either has 28 days of traffic.
- TTFB was measured once, from a US edge (`IAD`), with curl (no browser connection reuse); it indicates server health, not Romanian user experience.
- `layout/theme.liquid` was not in the theme dump (`$R/theme/` holds 15 files); head-order recommendations are based on the rendered HTML and on Impact's known structure.
- Font-file byte totals for Barlow were not measured (the preload URLs were not fetched to stay within the live-request budget); Poppins weights actually fetched by a browser depend on which weights the overridden selectors use (expected 400/500/600/700), not on the 54 declared faces.
- Image transfer sizes were measured with a Chrome `Accept` header (WebP); AVIF may be served to newer browsers at somewhat smaller sizes.
- The product template was assessed on one supplement product (baton-proteic-capsuni); MNX apparel pages with 24-39 images (context) will be heavier in the gallery but share the same head and app stack.
