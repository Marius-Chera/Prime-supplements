# Images: image SEO and image performance — primesupplements.ro

Audit date: 2026-10-12. Specialist key: `images` (5% of the health score). Evidence root `$R` = `/tmp/claude-0/-home-user-Prime-supplements/a8ac683f-a811-5bab-8ad5-3c2925806713/scratchpad/recon`.

## Scope & method

Checked:
- Full catalogue image inventory from the Shopify Admin export: `$R/shopify/products-all.json` (185 products, `image_count`, `images_without_alt`, `featured_image_w/h`) and the raw pages `$R/shopify/products-p1..p4.json` (every image node: URL, `altText`, width, height). Extracted to `/tmp/claude-0/-home-user-Prime-supplements/a8ac683f-a811-5bab-8ad5-3c2925806713/scratchpad/all-product-images.json` (493 images).
- Blog image inventory: `$R/shopify/articles-all.json` (355 articles: `featured_image`, `featured_image_alt`, `body_images`, `body_images_without_alt`) and raw `$R/shopify/articles-p1.json` (185 body `<img>` tags inspected for alt, width/height, loading).
- Rendered pages: `$R/home.html`, `$R/pages/homepage-ro-hu.html`, `$R/pages/product*.html`, `$R/pages/products/*.html` (13), `$R/pages/collection*.html` (6), `$R/pages/article*.html` (3), `$R/pages/blog-index.html`, `$R/pages/page-*.html`; plus the parse_html.py output `$R/parsed/*.json` (24 pages: `images[].alt/width/height/loading/lazy_method`).
- Theme source: `$R/theme/snippets__product-card.liquid`, `sections__main-product.liquid`, `sections__main-collection.liquid`, `snippets__blog-post-card.liquid`, `sections__main-article.liquid` (the `product-gallery` and `social-meta-tags` snippets are not in the dump; their output was audited from the rendered HTML).
- Sitemaps: `$R/sitemaps/child1.xml` (products, 185 image entries), `child5.xml` (articles, 354), `child2.xml` (collections), `child3.xml` (pages), and the `/ro-hu/` twins `child7.xml`/`child11.xml`.
- 15 throttled live `curl -I` requests (2 s apart, Chrome UA) to the Shopify CDN to confirm content negotiation (Accept: image/avif,image/webp vs image/jpeg), byte sizes of the renditions the pages actually request, the original (no `width=`) files referenced by the sitemap, an AVIF-source file, an article PNG, and the `http://` OG image.

Could not check: real LCP/CLS (no PageSpeed/CrUX quota, no Playwright), Google Images rankings (no DataForSEO), Merchant Center image disapprovals (no GMC access), the theme's `product-gallery.liquid` and `social-meta-tags.liquid` source (not exported).

## Score

**42 / 100.** Delivery mechanics are mostly right (Shopify CDN WebP negotiation, `srcset`/`sizes`, `width`/`height` on theme images, native lazy-loading, `fetchpriority="high"` on the hero) and keep the category off the floor.
Image *SEO* is close to zero: 493/493 product images have no stored alt text (storefront falls back to the bare product title, so every image of a product carries the same alt and the sitemap captions are empty), the homepage hero, logo, category tiles and every collection banner have `alt=""`, 40% of product files carry camera/WhatsApp/WordPress names, 327/354 blog images are AI-generated PNGs named with timestamps or the full generation prompt, and the OG image is emitted over `http://` on every page.

## What works

- Shopify CDN content negotiation confirmed live: `01_BATONPROTEIC_strawberry_front.jpg?width=1200` → `image/webp` 51,082 B with Accept avif/webp vs `image/jpeg` 104,226 B (-51%); Creapure 39,414 B vs 88,569 B (-55%); hero `header-desktop.jpg?width=2800` 210,712 B vs 322,050 B. `vary: Accept`, `cache-control: public, max-age=31557600`, Cloudflare cache in front (`cf-cache-status: HIT`).
- Every theme-rendered `<img>` (110/127 on the homepage, all product cards, gallery, banners) has `srcset` (up to 18 candidates 200w-2800w/3200w), a layout-aware `sizes` attribute and `width`/`height` attributes (CLS-safe). 100/127 homepage images use native `loading="lazy"`; the hero has `loading="eager" fetchpriority="high" sizes="100vw"` and a `<picture><source media="(max-width: 699px)">` art-directed mobile crop (`header-mobile.jpg` 1200x1600).
- Product gallery: first image `loading="eager" fetchpriority="high"`, all others `loading="lazy"`; thumbnails use `sizes="(max-width: 699px) 56px, 64px"` with `widths: '80,160'` for the mini cart (snippets in `sections__main-product.liquid` line 78).
- `snippets__product-card.liquid` eagerly loads only the first 3 cards (`position` logic, lines 19/79-82) and marks the hover image `fetchpriority: 'low'` (line 91).
- Product packshots are 1:1, white background, high resolution (82 at 4000x4000, 49 at 3500x3500): eligible for Google Shopping / Google Images without re-shooting.
- 336/355 article featured images have alt text; 2167/2210 blog body images have alt; article cards on `/blogs/news` have `width`/`height`/`srcset`/`sizes`.
- Image sitemap entries exist for all 185 products and 354 articles (`<image:title>` = product/article title).
- Custom Product JSON-LD (`schema-product-enhanced`) lists every product image at `width=1000` (e.g. `product-baton-1.jsonld`: 2 of 2 images) — when the block parses (see SCHEMA findings).

## Findings

### IMAGES-01 — 493/493 product images have no stored alt text; the storefront fallback makes every image of a product carry the identical bare title
- **Severity:** High
- **Evidence:** `$R/shopify/products-all.json`: 185 products, 493 images, `images_without_alt` = 493 (100%), 185/185 products with *all* images lacking alt. Raw API nodes (`products-p1..p4.json`): `altText` is `''` on 493/493. On the storefront Shopify's `image_tag` falls back to the product title, so the rendered alt is the title verbatim: `$R/pages/product-creatina-creapure.html` img #3-#9 all `alt="Creatine (Creapure®)"` including the nutrition-table image `creapure.jpg` (603x883); homepage img #96-#103: four different images (`01_PRIMECLUSTER_Pineapple`, `_Raspberry`, `_StrawberryKiwi`, `cluster_specificatii.jpg`) all `alt="Cluster Insulin Bomb 1kg/33serv"`. 41 products have ≥4 images sharing one alt (`prime-whey-2000g` 14 images, `prime-whey-1000g` 11, `pure-isolate-2000g` 8, `shaker-premium-accesorizat-500-ml` 7). Flavour is never in the alt although it is in the file name (`01_PRIMEPUREISOLATE_bourbonvanilla_2000g_front.jpg` → alt "Pure Isolate 2kg/74 serv"). The empty stored alt also propagates to the image sitemap (`child1.xml`: `<image:caption></image:caption>` 185/185) and to every sales channel feed (Google & YouTube channel, Shop app, Facebook) that reads `altText`.
- **Affected scope:** 185/185 products, 493 images, both `/products/` and `/ro-hu/products/` URL sets; 100 MNX apparel (314 images) and 85 supplements (179 images).
- **Recommendation:** Populate `altText` with a descriptive Romanian alt per image (10-125 chars, flavour + size + view, no stuffing). Templates (fill from title/variant/file name):
  - Pudră proteică / gainer: `"{Produs} {aromă}, {gramaj} ({serviri} serviri) – pudră proteică Prime Supplements, flacon vedere din față"` → `"Pure Isolate Bourbon Vanilla, 2 kg (74 serviri) – izolat proteic din zer Prime Supplements, flacon vedere din față"`.
  - Creatină / aminoacizi / pre-workout: `"{Produs} {aromă sau 'fără aromă'}, {gramaj} ({serviri} serviri) – {categorie} Prime Supplements"` → `"Creatină Creapure fără aromă, 500 g (100 serviri) – creatină monohidrat Prime Supplements"`, `"Nitrox 3D Cherry, 500 g (25 serviri) – pre-workout Prime Supplements"`.
  - Capsule / shot-uri: `"{Produs}, {n} capsule – supliment {beneficiu scurt} Prime Supplements, flacon"` → `"Vitamina D3 + K2, 80 capsule – supliment pentru oase și imunitate Prime Supplements, flacon"`; `"Fat Burning Booster Shot fructe de pădure, 25 ml – shot termogenic Prime Supplements"`.
  - Batoane / alimente: `"Baton proteic cu căpșuni, 55 g – Prime Supplements"` and for the box image `"Cutie 12 batoane proteice cu căpșuni – Prime Supplements"`; `"Unt de migdale 100% natural, 600 g – Prime Supplements, borcan"`.
  - Imagini secundare informative (tabel nutrițional, specificații): `"Tabel nutrițional și mod de administrare {Produs} {gramaj}"` (e.g. `creapure.jpg`, `cluster_specificatii.jpg`, `unt_migdale.jpg`, `water_out.jpg`, `thermo_core.jpg`, `nitrox3D.jpg`, `pure_isolate.jpg`).
  - MNX apparel: `"{Tip articol} MNX {model}, {culoare} – {gen}, vedere din {față|spate|lateral}"` → `"Hanorac MNX Industrial, dusty rose – bărbați, vedere din față"`, `"Tricou MNX Classic Golden Era 2.0, alb-roșu – vedere din spate (model)"`.
  Bulk-fix paths (pick one): (1) **Products CSV**: Admin → Products → Export → fill the `Image Alt Text` column (one row per `Image Src`/`Image Position`) → Import with "Overwrite products with matching handles"; alt is matched by `Image Src`, nothing else changes. (2) **Admin GraphQL** `productUpdateMedia(productId, media:[{id, alt}])` or `fileUpdate(files:[{id, alt}])`, ≤100 media per call → 5-6 calls for 493 images (not run during this audit). (3) Matrixify "Products / Image Alt Text" sheet. Avoid auto-alt apps that stamp `"{title} – Prime Supplements"` on every image: that reproduces today's duplicate-alt problem. Optionally harden the theme so an empty alt never ships: in `snippets/product-card.liquid` line 87 add `alt: product.featured_media.alt | default: product.title`, and in the gallery snippet `alt: media.alt | default: product.title`.
- **Falsifiability:** Re-run `python3 -I -c "..."` over a fresh products export: `images_without_alt` must be 0/493; `curl -s https://primesupplements.ro/products/creatina-creapure | grep -o 'alt="[^"]*"'` must show two different alts for the two gallery images; `child1.xml` must show non-empty `<image:caption>`.
- **Leading indicator:** GSC → Performance → Search type "Image": impressions for product queries rise within 4-8 weeks; Merchant Center "image_link" warnings disappear.
- **Effort:** M (data work, ~493 strings; 1-2 days with a spreadsheet).
- **Confidence:** 0.95

### IMAGES-02 — Homepage hero (LCP image), logo and the six category tiles ship with `alt=""`
- **Severity:** High
- **Evidence:** `$R/parsed/home.json`: 24/127 images with empty alt. Above the fold: `logo-prime-negru.svg` (#0) and `logo-site-alb.svg` (#1, #124) `alt=""` — the header logo is the home link, so unless the anchor carries an aria-label (not verifiable in the export) the link has no accessible name; `header-desktop.jpg` 2800x1000 (#2, `loading="eager" fetchpriority="high"`, the LCP candidate) `alt=""`; the mobile `<source>` `header-mobile.jpg` 1200x1600 has no alt either (alt lives on the `<img>`). Six linked category tiles `pre-workout.jpg`, `shoturi.jpg`, `dailyvitamin.jpg`, `accesorii.jpg`, `aminoacizi.jpg`, `pure.jpg` (1200x1400, #3-#8) all `alt=""`. Identical on `$R/parsed/pages_homepage-ro-hu.json` (24/127). The hero is also the image Google is most likely to pick for the homepage in Discover/Images and it currently has no text equivalent.
- **Affected scope:** `/` and `/ro-hu/` (2 URLs, 24 images each); the logo images repeat on every page of the site (3 per page: 2 header variants + footer).
- **Recommendation:** These are Shopify Files assets referenced by section settings, so the fix is data, not code: Admin → Content → Files → open each file → "Alt text": `logo-prime-negru.svg` / `logo-site-alb.svg` → `"Prime Supplements – suplimente nutritive și echipament MNX"`; `header-desktop.jpg` + `header-mobile.jpg` → describe the visual (e.g. `"Sportiv în sală cu Prime Whey și shaker Prime Supplements"`); tiles → `"Pre-workout Prime Supplements – categoria pre-antrenament"`, `"Shot-uri lichide Prime Supplements"`, `"Vitamine zilnice – Daily Vitamin"`, `"Accesorii fitness: shakere, centuri, prosoape"`, `"Aminoacizi EAA și BCAA"`, `"Pure Isolate – izolat proteic"`. The Impact theme's `image_tag` picks up the file alt automatically. If the tiles' section has an "image alt" field, fill it there instead.
- **Falsifiability:** `grep -o '<img[^>]*header-desktop[^>]*>' home.html | grep -o 'alt="[^"]*"'` returns a non-empty alt; the parsed count of empty-alt images on `/` drops from 24 to ≤3 (purely decorative reveal images).
- **Leading indicator:** Lighthouse accessibility "Image elements have [alt]" passes; GSC Image impressions for brand queries.
- **Effort:** S (10 file edits in Content → Files).
- **Confidence:** 0.95

### IMAGES-03 — Collection banners, the promo tile and the "1.jpg/2.jpg/3.jpg" lifestyle strip have empty alt and camera file names on every template
- **Severity:** Medium
- **Evidence:** `$R/parsed/pages_collection*.json`: 7-8 empty-alt images per collection page. Banner images with `fetchpriority="high"` and `alt=""`: `HILA_13_13_31_59_0798.jpg` 4000x2667 (`/collections/pudra-proteica`), `ER4A4759_fd9dfd90-....jpg` 5472x3648 (`/collections/haine-mnx`). Promo tile inside the grid `promotion-produt.jpg` 1600x1000 `alt=""` (typo in file name). Footer strip `1.jpg`, `2.jpg`, `3.jpg` (1500x1800, `loading="lazy"`, `alt=""`) is rendered on the homepage (#48-#50), on every product page (`$R/parsed/pages_product*.json`: 6 empty-alt each = 2 header logos + 1/2/3.jpg + footer logo) and on every collection page. Homepage also: `prime-health-d.jpg` 3200x1600 (#63), the "shop the look" gallery `01_PRIME_COMBAT_PRO_Mango_660g_front_e21f38cf...jpg` 4000x2806, `HILA_13_15_25_20_1666.jpg`, `HILA_13_12_43_04_0431.jpg`, `HILA_13_12_37_10_0397.jpg`, `HILA_13_12_58_08_0530.jpg`, `image00001_4ccb020e-....jpg` 6000x4000, `after4d.jpg`, `shop-the-look.jpg` (#88-#95), `reveal-scroll-d.jpg`/`reveal-m.jpg` (#104-#105) — all `alt=""`. About page `HILA_13_14_11_19_1089.png`, `HILA_13_12_29_40_0332.png` (4000 px, eager) and contact `HILA_13_14_10_38_1061.png` `alt=""`.
- **Affected scope:** 23 collection pages (×2 with `/ro-hu/`), 185 product pages (×2), home (×2), 3 store pages: 3-8 empty-alt theme images per page; ~20 distinct Files assets.
- **Recommendation:** Content → Files → alt text for each asset (Romanian, descriptive: `"Sportivă pregătind un shake cu Prime Whey în sală"`); mark truly decorative backgrounds (`reveal-scroll-d.jpg`, `reveal-m.jpg`) as decorative by leaving alt empty *and* adding `role="presentation"` in the section Liquid, so auditors stop flagging them. Re-upload the frequently used lifestyle shots with descriptive lowercase names (`prime-whey-antrenament-sala.jpg`) when convenient — Shopify cannot rename files in place.
- **Falsifiability:** `grep -c 'alt=""' pages/collection.html` drops from 8 to ≤2 (logos remain until IMAGES-02 is done).
- **Leading indicator:** Accessibility score; no SEO KPI (these images are not product images).
- **Effort:** S
- **Confidence:** 0.9

### IMAGES-04 — 40% of product image files carry camera, WhatsApp, WordPress-derivative or UUID names; 89% contain upper-case or underscores
- **Severity:** Medium
- **Evidence:** From the 493 file names in `all-product-images.json`: 99 camera/phone/export names (`DSC05906-scaled-1.avif`, `DSC09702.avif`, `IMG_14951.jpg`, `IMG_14921.jpg` on `prosop-negru`, `WhatsApp-Image-2024-04-27-at-14.14.20_17940299.jpg` ×3 on `shaker-premium-accesorizat-500-ml`, `WhatsAppImage2026-04-29at12.41.28.jpg` on `prime-shaker-customised`, `HILA_13_14_30_17_1208_a883964f-....jpg`, `image00001_...jpg`, `ALLMERCH321.jpg`, `ALL_MERCH_3_03.jpg`, `174E1E0F-65E4-4D6C-9261-2EC8E985AF48.jpg`, `187304_ochi.jpg`); 92 WordPress derivative names (`-scaled`, `-1540x2048`, `-jpg.webp`, `-jpg.avif`, e.g. `DSC05913-scaled-1-1540x2048.avif`, `HAMMER-SHORTS-3.0-BLACK-11-jpg.webp`, `INDUSTRIAL-HOODIE-DUSTY-ROSE-4-jpg_2bb22ad9-....avif`); 29 names with a Shopify duplicate-upload UUID suffix (`01_PRIME_CREATINE_Creapure_500g_front_508a0239-fe0e-4167-9d15-12bc1a93fc8c.jpg` — the hero image of the best-selling product); 441/493 contain upper-case letters, 165 contain underscores. The supplement packshots follow an internal naming convention (`01_PRIMEPUREISOLATE_bourbonvanilla_2000g_front.jpg`) that is informative but not keyworded in Romanian ("creatina", "proteina" never appear in a file name). The same names are what Google Images shows as the image URL and what the sitemap `<image:loc>` exposes.
- **Affected scope:** 493 product images (MNX apparel 314 — nearly all DSC/HILA/EDGE-HOODIE-style — supplements 179).
- **Recommendation:** Shopify does not rename files; do it incrementally: (a) for every *new* upload use `prime-<produs>-<aroma>-<gramaj>-<vedere>.jpg` lowercase, hyphens, ASCII (`prime-pure-isolate-bourbon-vanilla-2kg-fata.jpg`, `mnx-hanorac-industrial-dusty-rose-fata.jpg`); (b) re-upload (then delete the old media) only for the 30 best-selling products + the 9 low-resolution infographics in IMAGES-09, keeping the alt from IMAGES-01; (c) never upload WordPress derivatives (`-scaled`, `-1540x2048`) — upload the original JPEG and let the CDN resize.
- **Falsifiability:** Share of file names matching `^(DSC|IMG_|WhatsApp|HILA_|ALL_?MERCH|image0000|[0-9A-F-]{36})` falls below 10% in the next export.
- **Leading indicator:** Google Images impressions for `creatina creapure` / `pure isolate` queries with the product packshot.
- **Effort:** L (re-uploads) / S (naming rule going forward)
- **Confidence:** 0.85

### IMAGES-05 — Image sitemap: only the featured image (185 of 493), captions empty, collection images absent, and every image listed twice via `/ro-hu/`
- **Severity:** Medium
- **Evidence:** `$R/sitemaps/child1.xml`: 185 `<image:image>` blocks = exactly one per product (37.5% of the 493 images); `<image:caption></image:caption>` empty on 185/185 (Shopify fills the caption from `altText`, which is empty — see IMAGES-01); `<image:title>` = product title; `<image:loc>` points to the original file on `cdn.shopify.com/s/files/1/0917/5138/3415/files/…jpg?v=…` with no `width=` (185/185), which for the 4000x4000 packshots is 423,802 B WebP (`01_BATONPROTEIC_strawberry_front.jpg` original, live HEAD). `child2.xml` (collections): 0 image entries although collections have images (`/collections/pudra-proteica` og:image = `/cdn/shop/collections/01_PRIME_WHEY_bourbon_vanilla_2000g_front_af73df8a-….jpg`). `child5.xml` (articles): 354 image entries, `<image:caption>` absent. `child7.xml` and `child11.xml` (the `/ro-hu/` twins) repeat the identical 185 + 354 `<image:loc>` values under the `/ro-hu/…` page URLs (diff of the two loc lists = 0 lines), so Google receives two page associations for every image.
- **Affected scope:** 539 image entries (185 products + 354 articles) ×2 sitemaps; 308 product images never listed.
- **Recommendation:** The product/article sitemaps are generated by Shopify and cannot be edited; the levers are: (1) fill `altText` (IMAGES-01) so `<image:caption>` is populated; (2) keep all product images in the Product JSON-LD `image` array (already done) **and make the JSON-LD valid** (SCHEMA finding: `escape` does not escape newlines) so Google can discover images 2-14 per product; (3) remove the `/ro-hu/` web presence or noindex it (TECH finding) which also halves the duplicate image associations; (4) accept that the original-size `<image:loc>` is fine for Google Images (it prefers the largest version).
- **Falsifiability:** After alt text import, `curl -s https://primesupplements.ro/sitemap_products_1.xml?from=…` shows non-empty captions; GSC → Sitemaps shows "Images discovered" close to the number of product URLs.
- **Leading indicator:** GSC Image search impressions per product URL.
- **Effort:** S (depends on IMAGES-01 and the SCHEMA fix)
- **Confidence:** 0.9

### IMAGES-06 — Open Graph / Twitter image tags: `http://` scheme, mismatched declared dimensions, empty `twitter:image:alt`, fallback to the homepage image
- **Severity:** Medium
- **Evidence:** `$R/home.html`: `<meta property="og:image" content="http://primesupplements.ro/cdn/shop/files/prime-supplements.jpg?v=1747657200&width=2048">` with `og:image:secure_url` https and `og:image:width/height` 1200x628 while the URL requests a 2048-px rendition. Live: `curl -I http://primesupplements.ro/cdn/shop/files/prime-supplements.jpg?…` → `301 Moved Permanently` → https (every scraper has to follow a redirect; some, e.g. older WhatsApp/LinkedIn fetchers, drop the preview). Product page `product-creatina-creapure.html`: `og:image` http, `og:image:width="4000" og:image:height="4000"` but the URL is `width=2048` (declared size ≠ served size; Facebook uses the declared size for layout); `twitter:image` is a 1200x1200 centre crop; `twitter:image:alt=""` on every page type (home, product, collection, article). `collection-reduceri.html` og:image falls back to the generic `prime-supplements.jpg` (collection has no image); article og:image is the camera-named `HILA_13_16_35_43_2090_cc4beccf-….jpg`. Root cause is the custom `snippets/social-meta-tags.liquid` (listed in audit-context as the source of the `http:` scheme).
- **Affected scope:** All ~1151 URLs (every page emits the snippet).
- **Recommendation:** In `snippets/social-meta-tags.liquid`: build the URL with `{{ image | image_url: width: 1200, height: 630, crop: 'center' }}`, output it with an explicit `https:` prefix (`{{ url | prepend: 'https:' }}` when the filter returns a protocol-relative URL), set `og:image:width` 1200 / `og:image:height` 630 to match, `og:image:type` `image/jpeg`, and `twitter:image:alt` = `{{ page_image.alt | default: page_title | escape }}`. For products, keep a 1200x630 crop of the packshot (white background crops safely). Give the "Reduceri" and the other 7 collections without an image a collection image so the OG preview is not the generic brand banner.
- **Falsifiability:** `curl -s https://primesupplements.ro/ | grep -o '<meta property="og:image" content="[^"]*"'` starts with `https://`; Facebook Sharing Debugger shows no "redirect" warning and the preview uses the 1200x630 image; `twitter:image:alt` non-empty.
- **Leading indicator:** Share-preview CTR from Facebook/WhatsApp (GA4 referral sessions from social).
- **Effort:** S (one snippet, on the unpublished duplicate theme)
- **Confidence:** 0.9

### IMAGES-07 — Blog body images (BlogGenAuto template): no `width`/`height`, 43 empty alts, product thumbnails fetched at the 4000-px original, keyword-year alts
- **Severity:** Medium
- **Evidence:** `$R/shopify/articles-p1.json` (first 50 articles, 185 body `<img>`): `width`/`height` attributes on 0/185 (every image is sized by inline `style="width: 120px; height: 120px; object-fit: cover"` or `max-width:100%; height:auto`, so the browser cannot reserve space before the image loads → CLS on every article); `alt=""` on 45/185 (site-wide 43/2210 per `articles-all.json`); `loading="lazy"` on 139/185. The in-article product cards reference the original file with no size parameter, e.g. `article-2026-citicolina.html` img #5: `src="https://cdn.shopify.com/s/files/1/0917/5138/3415/files/01_NITRO_Ice_Blueberry_660g_front.jpg?v=1749666698"` displayed at 120x120 px — the original 4000x4000 rendition of a comparable packshot weighs 423,802 B WebP (live HEAD on `01_BATONPROTEIC_strawberry_front.jpg`), i.e. ~400 KB for a 120-px thumbnail, repeated for each linked product (median 3 product cards per article). Alt quality: keyword-prefixed, year-stamped strings (`"Nitrox NO-STIM supliment pre-workout fără cafeină pentru rutina perfectă de antrenament de seară în 2026"`, 17/185 contain 2025/2026), the author photo alt `"Marius Chera , Nutritionist &amp; Bodybuilding Coach"` repeated 41×, and `"Pure Isolate 2kg/74 serv"` 6×. One article body image `silicoane-mai-mari.png` on `/blogs/news/bcaa-vs-eaa-…` has `alt=""` and no dimensions.
- **Affected scope:** 354 articles, 2210 body images (×2 with `/ro-hu/`).
- **Recommendation:** Fix the BlogGenAuto article template (or post-process bodies in bulk via the Admin API `articleUpdate`): (1) append `&width=240` (2× of 120 px) to product-card image URLs and `&width=1200` to hero/in-body images; (2) add `width`/`height` attributes matching the rendered box (`width="120" height="120"`); (3) alt = product name + form (`"Nitrox NO-STIM 660 g – pre-workout fără cofeină"`), no year, no marketing adjectives; (4) author photo alt `"Marius Chera, nutriționist certificat"` once; (5) fill the 43 empty alts (list in `articles-all.json` → `body_images_without_alt`).
- **Falsifiability:** `grep -c 'files/01_[^"]*\.jpg?v=[0-9]*"' articles-bodies/*.txt`-style check on a re-export: 0 product thumbnails without `width=`; CLS element list in Lighthouse no longer shows `.article__body img`.
- **Leading indicator:** CrUX CLS "good" share for `/blogs/news/*` once field data exists; article LCP (featured image) unaffected.
- **Effort:** M (template change + one bulk regex pass over 354 bodies)
- **Confidence:** 0.85

### IMAGES-08 — Article featured images: 19 without alt, 327/354 are PNG AI renders named with timestamps or the full generation prompt, no `fetchpriority` on the LCP image
- **Severity:** Medium
- **Evidence:** `articles-all.json`: 355/355 have a featured image, 19 lack alt (`ce-este-un-pre-workout-fara-cofeina`, `cum-te-ajuta-combat-pro-sa-ti-cresti-masa-musculara`, `cum-contribuie-l-carnitine-1000-la-arderea-grasimilor`, `glycerolul-secretul-culturistilor-…`, `bcaa-vs-eaa-diferențe-și-beneficii-…`, `water-out-tinctura-…`, `gymbeam-creatine-creatina-monohidrat-micronized-300g-fara`, `vitamine-b12-90-zile-vitamina-d3-k2`, `gainer-prime-whey-2000g-seasonal-protein`, `mass-gainer-prime-whey-1000g-protein-cooking`, `citicolina-ghid-pre-workout-fara-cafeina`, `citicolina-conexiune-musculara-…-travel-2026`, `intra-workout-dozaj-optim-…`, `tricou-sala-cele-mai-bune-tricouri-yoga`, `creatine-benefits-creatina-creapure-…`, `proteina-isolate-whey-emperor-mass_3000g-…`, `dextrina-ciclica-intra-workout-…`, `creatina-si-volumizarea-musculara-cum-sa-stii-…`, `creatina-si-volumizarea-musculara-secretele-absorbtiei-…`); when alt is missing the theme falls back to the article title (`article.html` img #3 alt = the H1). Sitemap `child5.xml` image names: 327 PNG / 27 JPG; 287 follow `blog-<slug>-<13-digit timestamp>.png` (`blog-l-carnitine-1000-80-caps-travel-weight-loss-tips-1791673322733.png`), 4 are the literal AI prompt (`genereaza-un-flacon-de-pre-workout-pe-masa-pe-care-sa-scrie-no-caffeine-pre-workout-dar-sa-nu-fie-brandurit-…-si-o-stic.png`, 209 chars; `generaza-o-imagine-grafica-cu-o-creatina-intr-o-piramida-a-suplimentelor-ea-fiind-in-top-ul-acesteia.png` on the citicolina article), 8 are camera names (`HILA_…`). Delivery is still WebP (live: the 1376-px PNG rendition → `image/webp` 105,356 B), so the PNG source only inflates storage and the original-size fetch. Featured image markup (`article.html` img #3): `width="1500" height="1000" sizes="(max-width: 1149px) 100vw, 1000px"`, no `loading` (correct) but **no `fetchpriority="high"`** although it is the article LCP element.
- **Affected scope:** 354 articles (×2 with `/ro-hu/`).
- **Recommendation:** Add alt text to the 19 articles in the article editor (Romanian, describes the image, not the title: `"Flacon de pre-workout fără cofeină Nitrox NO-STIM pe masă lângă căști și o sticlă de apă"`). Configure BlogGenAuto (or the upload step) to export JPEG at quality 80, ≤1600 px, named `prime-blog-<subiect>.jpg`, and to stop using the prompt as file name. In `sections/main-article.liquid` (the featured-image render, not in the dump) add `fetchpriority: 'high'` to the first `image_tag`.
- **Falsifiability:** `articles-all.json` → `featured_image_alt` true on 355/355; new sitemap image names no longer match `-[0-9]{13}\.png$`; `grep fetchpriority article.html` returns a hit on the featured image.
- **Leading indicator:** Lighthouse LCP for an article URL improves by the image's discovery delay (~100-300 ms).
- **Effort:** S (alts, Liquid) / M (image pipeline)
- **Confidence:** 0.85

### IMAGES-09 — 9 secondary product images (nutrition tables/infographics) are below 1000 px and are upscaled in a 730-px gallery; 57 products have a single image
- **Severity:** Medium
- **Evidence:** `all-product-images.json`: images under 1000 px wide: `water_out.jpg` 487x914 (`water-out-120-caps`), `creapure.jpg` 603x883 (`creatina-creapure`, the #2 best-linked product — rendered as gallery image #2 with `sizes="… min(730px, 40vw)"`, so on a 2× desktop the browser needs ~1460 px and gets 603), `thermo_core.jpg` 823x1107, `nitrox3D.jpg` 733x958, `pure_isolate.jpg` 900x951, `unt_migdale.jpg` 979x856, and the three 800x800 `WhatsApp-Image-2024-04-27-…jpg` on `shaker-premium-accesorizat-500-ml` (its only product photos). Google Images and Merchant Center prefer ≥1200 px on the long side. Separately, 57/185 products have exactly one image (53 supplements, e.g. `turmeric-extract-80-caps`, `vitamina-d3-k2`) — no back-label, no scale/lifestyle shot, so Shopping `additional_image_link` is empty and Google Images has one candidate per product.
- **Affected scope:** 9 images on 8 products; 57 single-image products.
- **Recommendation:** Re-export the 6 nutrition/spec infographics at ≥1600 px (they are vector/text layouts, so re-render, do not upscale) and re-upload with descriptive names; re-shoot the shaker on white at ≥1500 px. Add at least a label/back image to the 53 single-image supplements (the 4000x4000 packshot pipeline already exists: `01_…_front.jpg` suggests `_back`/`_label` variants are available).
- **Falsifiability:** No product image under 1000 px in the next export; single-image products < 20.
- **Leading indicator:** Merchant Center image quality warnings; Google Images impressions per product.
- **Effort:** M
- **Confidence:** 0.85

### IMAGES-10 — Over-fetch on banners: collection banners use `sizes="130vw"` on 4000-5472 px camera files; homepage hero rendition is 210 KB WebP; shop-the-look image is a 6000x4000 source
- **Severity:** Medium
- **Evidence:** `collection.html`: `<img src="…HILA_13_13_31_59_0798.jpg?…&width=4000" alt="" width="4000" height="2667" fetchpriority="high" sizes="130vw">` with srcset up to 3200w (Impact's parallax banner); on a 1920-px viewport 130vw = 2496 px → the browser selects the 2600w candidate: live HEAD `…&width=2600` → `image/webp` 298,324 B, with high priority, on every collection page (`collection-haine-mnx.html`: `ER4A4759_….jpg` 5472x3648, same markup). Homepage hero `header-desktop.jpg?width=2800` = 210,712 B WebP (322,050 B JPEG) at `sizes="100vw"` — above the 200 KB hero target of the images skill; on mobile the `<source>` serves `header-mobile.jpg` up to 1200w (OK). "Shop the look" `image00001_4ccb020e-….jpg` 6000x4000 with `sizes="(max-width: 999px) 100vw, 1000px"` → 2000w candidate on 2× screens = 338,594 B WebP for a below-the-fold, lazily loaded, `alt=""` image. Product gallery: srcset up to 3200w for a slot of `min(730px, 40vw)` → 3× phones request 2200w+ renditions of the 4000x4000 packshots (not measured).
- **Affected scope:** 23 collection pages (×2), `/` (×2), 185 product galleries.
- **Recommendation:** In `sections/main-collection.liquid` banner block (and the Impact "image banner" section) set `sizes="100vw"` (or disable parallax, which is what forces 130vw) and cap `widths` at `'400,600,800,1000,1200,1600,2000'`; re-export the hero at 2000 px / quality 75 (target ≤ 150 KB WebP) and the shop-the-look image at 2000 px; for the gallery, cap the widths list at 2000 in the gallery snippet. Keep `fetchpriority="high"` only on the LCP banner.
- **Falsifiability:** HEAD of the selected banner candidate on a 1920-px desktop (`width=2000`) ≤ 180 KB; Lighthouse "Properly size images" lists no banner.
- **Leading indicator:** LCP on `/collections/*` in Lighthouse/CrUX.
- **Effort:** S
- **Confidence:** 0.8

### IMAGES-11 — Homepage repeats the same product images three times and carries 130 KB of `srcset` markup (21% of the 630 KB HTML)
- **Severity:** Low
- **Evidence:** `home.html`: 127 `<img>`, 115 `srcset` attributes totalling 130,481 bytes; the same featured products appear in three sections (`ALL_MERCH_3_03.jpg`, `ALL_MERCH_3_01.jpg`, `ALL_MERCH_3_17_…jpg`, `ALL_MERCH_3_15.jpg`, `01_PRIMEPUREISOLATE_bourbonvanilla…`, `01_PRIMEPUREISOLATE_caffeelatte…`, `creapure.jpg` each 2-3×: parsed indexes #19-#22, #64-#67, #76-#79). `snippets/product-card.liquid` line 87 emits `widths: '200,300,400,500,600,700,800,1000,1200,1400,1600,1800'` (12 candidates) for the primary *and* the hover image (line 91), i.e. 24 URLs per card, while the card is at most ~460 px wide (`sizes` → `calc((100vw - 96px) / 4 …)`).
- **Affected scope:** `/`, `/ro-hu/`, and every collection/product page that renders cards (the 630 KB homepage and 345 KB product pages are mostly this markup).
- **Recommendation:** Trim the card `widths` to `'300,400,600,800,1000,1200'` (covers 3× DPR at 400 px) in `product-card.liquid` lines 87 and 91; show each product once on the homepage (replace one of the three featured-collection sections with a category/blog block). Expected HTML saving ~60-70 KB uncompressed on the homepage, ~15 KB on product pages.
- **Falsifiability:** `grep -o 'srcset="[^"]*"' home.html | wc -c` < 70,000.
- **Leading indicator:** TTFB-to-DOMContentLoaded gap in Lighthouse; HTML transfer size.
- **Effort:** S
- **Confidence:** 0.8

### IMAGES-12 — A second `fetchpriority="high" loading="eager"` image sits below the fold on the homepage (featured product section)
- **Severity:** Low
- **Evidence:** `home.html` has 3 `fetchpriority="high"` images: the hero (#2) and `01_PRIMECLUSTER_Pineapple_1000g_front.jpg?width=4000` (parsed index #96 of 127, `loading="eager" fetchpriority="high"`, 4000x4000 source, `sizes="(max-width: 740px) calc(100vw - 40px), (max-width: 999px) calc(100vw - 64px), min(730px, 40vw)"`) rendered by the "featured product" section placed after ~95 other images; the third is inside a `<picture>` for the mobile hero. The Cluster image competes with the hero and the render-blocking Google Fonts for bandwidth during the first 2 s although it is not visible.
- **Affected scope:** `/`, `/ro-hu/`.
- **Recommendation:** In the featured-product section (Impact `featured-product` / the shared gallery snippet) pass `loading: 'lazy'` and omit `fetchpriority` when `section.index > 2`; or move the Cluster section into the first screen if it is meant to be the hero offer.
- **Falsifiability:** `grep -c 'fetchpriority="high"' home.html` = 1 (plus the `<picture>` source).
- **Leading indicator:** Hero LCP resource load delay in Lighthouse.
- **Effort:** S
- **Confidence:** 0.8

### IMAGES-13 — App-injected images without dimensions or native lazy-loading (Judge.me carousel/review photos, ANPC badges, EU flag)
- **Severity:** Low
- **Evidence:** `parsed/home.json`: 17 images without `width`/`height`, 15 of them `lazy_method: js-generic` = the Judge.me "Let customers speak for us" carousel (`<img class='jdgm-carousel-item__product-image' alt='Crema de Orez Creamy Rice Salted Caramel 1kg Prime' data-src='…/2_eca46c98-…_70x70.jpg' data-src-retina='…_140x140.jpg'/>` — legacy `_70x70` URL style, no `width`/`height`, no `src`, so the space is not reserved until the widget script runs); product pages: 2 Judge.me review photos (`data-src='https://review-images.judgeme.com/…'`), the EU flag `<img src="…/europe-flag-icon.webp" alt="Steag UE" class="eu-flag" />` (no dimensions, no lazy, 1 extra request on every product page), and the footer `logo-anpc-sol…png` / `logo-anpc-sal…png` (`style="height: 50px;"`, no `width`/`height`, no `loading="lazy"`) on every page.
- **Affected scope:** Every page (footer badges), `/` and `/ro-hu/` (15 carousel images), 185 product pages (flag + review photos).
- **Recommendation:** Footer: add `width="…" height="50" loading="lazy" decoding="async"` to the two ANPC badges in `sections/footer.liquid`; product page: give the EU flag explicit `width`/`height` (it is in a snippet/metafield block) and `loading="lazy"`; Judge.me: enable "lazy load images with native loading" in the widget settings if available, else accept (third-party). None of this is an SEO ranking issue; it is CLS hygiene.
- **Falsifiability:** `parsed/home.json` no_wh count ≤ 15 (only Judge.me left); product page no_wh ≤ 2.
- **Leading indicator:** CLS in Lighthouse.
- **Effort:** S
- **Confidence:** 0.85

### IMAGES-14 — Where alt text exists it is the raw product title with merchandising strings, spacing errors and English wording
- **Severity:** Low
- **Evidence:** Fallback alts observed in `home.html` / product pages: `"Prime Whey 2kg/66serv"`, `"Pre Workout Nitrox 3D , 500g (25 Serviri)"` (space before comma), `"Pre Workout Fără Stimulente Nitrox NO-STIM , 660g "` (trailing space), `"MNX Hoodie ManiaX *LIMITED*"`, `"MNX Men's lightweight hoodie Aesthetic, black"`, `"Creatine (Creapure®)"`, `"Cluster Insulin Bomb 1kg/33serv"`. Blog card alts inherit the keyword-prefixed titles: `"l-carnitine - L-carnitina ieftină vs premium: Semne că pierzi progresul în vacanță"`, `"omega 3 - Cum să alegi crema de orez pentru absorbție maximă: Semne de alarmă"` (`blog-index.html` img #3-#4). Because 19 near-duplicate title groups exist (MNX colours published as separate products), the same alt string appears across different product URLs.
- **Affected scope:** All product images until IMAGES-01 is done; 354 blog cards.
- **Recommendation:** Resolved by IMAGES-01 for products (explicit alts in Romanian). For blog featured images, set alt explicitly in the article editor instead of relying on the title fallback; strip the `"<keyword> - "` prefix pattern from titles (CONTENT finding) which also cleans the alts.
- **Falsifiability:** No alt attribute on product pages contains `/serv`, ` ,` or `*`.
- **Leading indicator:** n/a (quality).
- **Effort:** S (covered by IMAGES-01)
- **Confidence:** 0.9

### IMAGES-15 — Format and compression are handled by the Shopify CDN; uploading AVIF/PNG sources buys nothing (and AVIF is never delivered)
- **Severity:** Info
- **Evidence:** 260/493 product images are uploaded as `.avif` (all MNX apparel), 37 as `.png` (33 supplement packshots, e.g. `ALLMERCH7.png` 3500x3500), 14 `.webp`, 182 `.jpg`. Live: `XFORCE-HOODIE-23-A.avif?width=1500` with `Accept: image/avif,image/webp` → `content-type: image/webp` 107,118 B; with `Accept: image/webp` only → identical WebP. The CDN transcodes every source to WebP for modern browsers and JPEG otherwise; it does not serve AVIF to AVIF-capable browsers, so the AVIF uploads only cost quality (double lossy encode: WordPress AVIF → Shopify WebP). No `<picture>` type fallbacks are needed on Shopify. Cache headers are correct (`max-age=31557600`, Cloudflare HIT).
- **Affected scope:** Catalogue-wide; no page-level defect.
- **Recommendation:** Upload originals as high-quality JPEG (quality 85-90, ≤ 3000 px) going forward; do not pre-convert to AVIF/WebP; keep PNG only for graphics with transparency. No theme change.
- **Falsifiability:** n/a (informational).
- **Leading indicator:** n/a.
- **Effort:** S
- **Confidence:** 0.95

### IMAGES-16 — `decoding="async"` is not used on any image
- **Severity:** Info
- **Evidence:** `grep -c 'decoding=' home.html` = 0 of 127 `<img>`; same on product and collection pages (Impact theme's `image_tag` calls do not pass `decoding`).
- **Affected scope:** All pages.
- **Recommendation:** Add `decoding: 'async'` to the `image_tag` calls for non-LCP images in `product-card.liquid` (lines 87, 91) and `blog-post-card.liquid` (line 41). Minor main-thread benefit on long card grids (`/collections/all`: 52 images).
- **Falsifiability:** `grep -c 'decoding="async"' pages/collection-all.html` > 40.
- **Leading indicator:** INP/TBT on collection pages.
- **Effort:** S
- **Confidence:** 0.7

### IMAGES-17 — Google Images / Shopping opportunity: packshots are eligible but the signals that would rank them are missing
- **Severity:** Medium
- **Evidence:** Assets are right (1:1 white-background packshots at 3500-4000 px, 4:5 apparel at 1500x1875), but: product JSON-LD is invalid on supplements with multi-line descriptions (7/13 sampled, SCHEMA finding) so the `image` array is not read; `altText` empty → no caption in the image sitemap, no alt in channel feeds; file names non-Romanian/camera; no visible caption/`<figcaption>` or image `title`; MNX colour variants are separate products so identical lifestyle photos sit on 19 near-duplicate URL groups (45 products); the collection image (used as og:image) is not listed in the sitemap; 57 products with one image. Google Images and the Merchant Center free listings use alt, surrounding text, file name and structured-data `image` as the main signals — all four are weak here.
- **Affected scope:** 185 products.
- **Recommendation:** Sequence: IMAGES-01 alt import → SCHEMA fix (valid Product JSON-LD with the full `image` array and per-variant `Offer`) → IMAGES-04 naming for top sellers → merge MNX colour variants into one product with variant images (ECOMMERCE finding) → add a second image to single-image supplements. Then submit the product sitemap in GSC and watch the "Images" search type.
- **Falsifiability:** GSC Performance filtered by Search type = Image shows > 0 clicks for non-brand product queries within 8 weeks of the alt + schema fixes.
- **Leading indicator:** Rich Results Test on `/products/creatina-creapure` shows the Product with all images listed.
- **Effort:** M (aggregate)
- **Confidence:** 0.8

## Limitations

- Lab metrics (LCP/CLS/INP) could not be measured: no PageSpeed/CrUX quota, no browser; byte sizes come from `curl -I` on the exact renditions the markup selects, not from a real waterfall.
- The theme's `product-gallery.liquid`, `social-meta-tags.liquid` and the image-banner section were not in the theme export; their behaviour was audited from the rendered HTML only.
- Article body-image statistics (width/height, URL size parameter, alt length) are from the first 50 articles (`articles-p1.json`, 185 images); site-wide counts (2210 body images, 43 without alt, 19 featured without alt) come from `articles-all.json` / `catalog-analysis.md`.
- Google Images rankings and Merchant Center diagnostics were not available (no DataForSEO/GMC access).
- The 15 live requests confirmed CDN behaviour on 6 distinct assets; all other sizes are inferred from the srcset/sizes markup.
