# Schema / Structured Data — primesupplements.ro (audit 2026-10-12)

Key: `schema` (category weight 10 %). Specialist method: claude-seo `seo-schema` agent + skill (detect → validate per block → missing opportunities → generated JSON-LD). Paths: `$R` = /tmp/claude-0/-home-user-Prime-supplements/a8ac683f-a811-5bab-8ad5-3c2925806713/scratchpad/recon, `$A` = /home/user/Prime-supplements/primesupplements.ro-audit.

## Scope & method

What I checked
- Parsed every `<script type="application/ld+json">` block (Python `json.loads`) in all 31 local page copies: `$R/home.html`, `$R/pages/*.html` (articles, collections, pages, blog index, ro-hu homepage, B2B), `$R/pages/products/*.html` (13 products) — 95 blocks in total; script at `/tmp/claude-0/.../scratchpad/schema-work/validate_all.py`. Cross-checked the 16 raw extracts in `$R/jsonld/*.jsonld` and the `schema` arrays in `$R/parsed/*.json` (parse_html.py only keeps the blocks that parse, so it silently drops the invalid Product/Article blocks — do not use it alone to count schema).
- Microdata (`itemscope`) / RDFa (`typeof`) scan on every page: none used (one incidental `itemscope` inside an article body).
- Read the live theme sources for the structured-data path via a read-only Admin GraphQL theme-files query on theme 179784286583 (`layout/theme.liquid`, `snippets/schema-product-enhanced.liquid`, `schema-article.liquid`, `schema-collection.liquid`, `schema-organization.liquid`, `schema-breadcrumb-enhanced.liquid`, `faq-schema-creatina.liquid`, `microdata-schema.liquid`) plus the local `$R/theme/sections__main-product.liquid` (render calls at lines 112-114), `sections__main-article.liquid` (line 137), `sections__main-collection.liquid` (line 233), `templates__product.json` (Judge.me app blocks).
- Simulated the Liquid filter chain of the live snippets (`strip_html | truncate: 500 | escape`) in Python over the full catalog (`$R/shopify/products-p1..4.json`, 185 products / 395 variants) and over all 355 articles (`$R/shopify/articles-p1..8.json`) to quantify how many blocks are unparseable.
- Analysed the JSON-LD that the BlogGenAuto app embeds inside article bodies (347/355 bodies).
- Read-only Admin GraphQL checks: product 14971464450423 (baton-proteic-capsuni) metafields (Judge.me `reviews.rating`, `reviews.rating_count`, `judgeme.badge/widget`, `custom.short_description`), shop contact e-mail, billing address, policies.
- One live request: `curl -I https://primesupplements.ro/cdn/shop/files/logo-prime-supplements.png` → HTTP 404 (the Organization logo).
- Ran `schema_ecommerce_validate.py` (Google merchant-listing rules) on the only kind of Product block that parses today (`$R/jsonld/product-mnx-blue-1.jsonld`), on the invalid baton block, and on the proposed fix rendered for baton-proteic-capsuni (`$A/findings/schema-fixes/examples/baton-proteic-capsuni.product.jsonld`).

What I could not check
- Google Rich Results Test / Search Console enhancement reports (no API key, no GSC access). Liquid cannot be rendered in the sandbox, so the fixed snippets were validated through a hand-rendered example with real catalog values, not through Shopify's renderer.
- Instagram/TikTok profile existence (recon fetches returned empty/generic pages); VAT registration status; exact postal code — flagged as "verify" in the snippets.

## Score

**18 / 100.** Product JSON-LD is unparseable on 75/185 products (65 of the 85 supplements, i.e. the revenue products) and even the 110 blocks that parse are ineligible for merchant listings (AggregateOffer, "145,00" comma-decimal strings, no price/rating/return/shipping). Articles carry two conflicting Article entities (theme + BlogGenAuto) with myshopify-domain breadcrumbs and placeholder text; the Organization logo 404s and the entity has no NAP. The only things that currently work are the Organization/Breadcrumb skeleton and the FAQ blocks, which no longer produce a SERP feature.

## What works

- JSON-LD is the only format used (Google's preference); every block declares `@context: https://schema.org` and absolute URLs on the primary domain.
- An `Organization` node with a stable `@id` (`https://primesupplements.ro/#organization`), `sameAs` and `logo` object is emitted in `<head>` on every page (`layout/theme.liquid` line 15) — consistent across all 31 sampled pages.
- `BreadcrumbList` is present on every product page (16/16 valid), `CollectionPage + ItemList` on every collection (6/6 valid), `Article` with `mainEntityOfPage`, ISO-8601 dates and a 1200 px image on articles.
- `gtin` is emitted whenever the first variant has a barcode (188/395 variants have one); product images are limited to 5 and served at 1000 px.
- Judge.me already writes native `reviews.rating` / `reviews.rating_count` metafields on products (verified: baton-proteic-capsuni = 4.0 / 4), so star ratings can be added server-side without any new app.
- Shopify's maintained `{{ product | structured_data }}` snippet (`snippets/microdata-schema.liquid`) is still in the theme, only commented out — a zero-maintenance fallback exists.
- Homepage `FAQPage` answers are visible on the page (the FAQ section exists in the HTML), so that block at least matches on-page content.

## Findings

### SCHEMA-01 — Product JSON-LD is syntactically invalid on 75/185 products (76 % of supplements)
- **Severity:** Critical
- **Evidence:** `snippets/schema-product-enhanced.liquid` builds JSON by hand: `"description": "{{ product.description | strip_html | truncate: 500 | escape }}"`. Liquid `escape` encodes `& < > " '` only; it leaves `\n`, `\r`, `\t` and `\` untouched, so any description with a line break produces an unescaped control character inside a JSON string. Parse errors on the local copies: `pages/product.html` + `pages/products/baton-proteic-capsuni.html` "Invalid control character at: line 7 column 38 (char 212)", `product-creatina-creapure.html` (char 566), `glycerol-max-pump-500g-125-serv.html` (626), `instant-drink-frutilu-cola-10g.html` (372), `mnx-hoodie-industrial-dusty-rose.html` (216), `pure-isolate-2000g.html` (676), `turmeric-extract-80-caps.html` (218), `unt-de-migdale.html` (554). 9 of the 17 Product blocks in the sample are unparseable; the 8 that parse are MNX apparel with empty or one-line descriptions. `schema_ecommerce_validate.py $R/jsonld/product-baton-1.jsonld` → `Error: invalid JSON (Invalid control character at: line 7 column 38 (char 212))`. Replaying the exact filter chain over the catalog: **75/185 products** emit invalid JSON (65 supplements/food of 85, 10 MNX), 87 products have an empty description.
- **Affected scope:** 75 product URLs (× 2 with the `/ro-hu/` duplicates = 150 URLs); all of the best-selling supplements (creatina-creapure, pure-isolate, baton proteic, glycerol, frutilu, turmeric, unt de migdale...). Google drops the whole block, so these pages have no Product entity at all.
- **Recommendation:** Replace the snippet with `$A/findings/schema-fixes/snippets/schema-product-enhanced.liquid` (every value through `| json`, which encodes quotes, newlines, backslashes and Unicode). Minimal patch if you only want the parse fix today: `"description": {{ product.description | strip_html | strip_newlines | strip | truncate: 5000 | json }},` and the same `| json` treatment for `name`, `sku`, `gtin`, `category`, image URLs. Deploy on an unpublished duplicate of Impact, test with the Rich Results Test on `/products/baton-proteic-capsuni` and `/products/creatina-creapure`, then publish.
- **Falsifiability:** If after deployment the Rich Results Test still reports "Unparsable structured data" on those two URLs, or `curl … | python -c json.loads` on the block still throws, the fix failed.
- **Leading indicator:** GSC Enhancements → "Product snippets" / "Merchant listings": valid items should go from 0 to ~185 within 2-4 weeks of recrawl.
- **Effort:** S  **Confidence:** 0.98

### SCHEMA-02 — Even the Product blocks that parse are ineligible: AggregateOffer with comma-decimal strings, no per-variant Offer, no price
- **Severity:** High
- **Evidence:** Live snippet: `"offers": { "@type": "AggregateOffer", "lowPrice": "{{ product.price_min | money_without_currency | strip }}", "highPrice": …, "offerCount": "{{ product.variants.size }}" …}`. `money_without_currency` is locale-formatted, so the output is `"lowPrice": "8,50", "highPrice": "100,00"` (baton), `"145,00"` (MNX blue tee), `"100,00"/"180,00"` (creapure) — a comma decimal is not a number for Google. There is no `price`, no `priceCurrency` per variant, no `priceValidUntil`, no per-variant `availability`, and `availability` is the product-level `product.available` (a product with one sold-out variant still says InStock for every variant). Validator on the parseable MNX block (`$R/jsonld/product-mnx-blue-1.jsonld`): `[High] merchant-listing-offer-type: Merchant listings require offers.@type='Offer', not 'AggregateOffer'`, `[Medium] recommended-offer-price`, `[Medium] missing-return-policy`, `[Medium] missing-shipping-details`, `[Medium] recommended-product-description`. Google's merchant-listing documentation requires `Offer` (AggregateOffer is accepted only for product-snippet "price range" display and never for merchant listings). 106/185 products have more than one variant (395 variants total).
- **Affected scope:** 185/185 products (the 110 that parse today fail eligibility; the 75 of SCHEMA-01 fail parsing first).
- **Recommendation:** Use the v2 snippet: one `Offer` per `product.variants` entry with `"price": {{ variant.price | divided_by: 100.0 | json }}` (variant.price is in bani → `8.5`, `100.0`), `priceCurrency` from `localization.country.currency.iso_code`, `priceValidUntil` (next 31 Dec), `availability` from `variant.available`, `sku`, `gtin13` when the barcode has 13 digits, `itemCondition`, `url` with `?variant=`. Validator output on the rendered fix (`$A/findings/schema-fixes/examples/baton-proteic-capsuni.product.jsonld`):
  ```
  {"ok": true, "findings": [
    {"severity": "Medium", "rule": "missing-member-program", "message": "No MemberProgram or loyalty-tier pricing declared..."},   <- not applicable, the store has no loyalty programme
    {"severity": "Info",   "rule": "no-product-group", "message": "Consider ProductGroup if the product has size/colour variants..."}],
   "summary": {"critical": 0, "high": 0, "medium": 1, "info": 1}}
  ```
  (The validator also crashes on `priceSpecification` arrays — its own bug; the snippet therefore emits a single `UnitPriceSpecification` object, which is also what Google's strikethrough example uses.)
- **Falsifiability:** Rich Results Test on any product must list "Merchant listings" as eligible with per-variant prices such as `8.5 RON` / `100 RON`; if it still shows "price range" only or "Invalid number", the fix failed.
- **Leading indicator:** GSC "Merchant listings" report (valid items), then Shopping-tab impressions for product queries in GSC.
- **Effort:** S (snippet only)  **Confidence:** 0.95

### SCHEMA-03 — No aggregateRating/review in the markup although Judge.me has ratings on the products
- **Severity:** High
- **Evidence:** `aggregateRating` appears in none of the 17 product HTML copies. Judge.me is installed as app blocks (`templates/product.json`: `judge_me_reviews_preview_badge`, `judge_me_reviews_review_widget`) and only renders HTML badges (`<div class='jdgm-prev-badge' data-average-rating='4.00' data-number-of-reviews='4'>` on baton; other products in the sample carry 4.75/44, 4.77/13, 4.79/17, 5.00/7 — 124 shop reviews in total, `data-shop-reviews-count="124"`). The widget injects its rich snippet client-side only, and no `application/ld+json` with `jdgm` exists in the HTML. Admin GraphQL on product 14971464450423 confirms native metafields: `reviews.rating` = `{"scale_min":"1.0","scale_max":"5.0","value":"4.0"}` (type `rating`), `reviews.rating_count` = `4` (type `number_integer`), plus `judgeme.badge` / `judgeme.widget`.
- **Affected scope:** all reviewed products (every product with ≥1 Judge.me review; at least the 6 rating values seen in the sample) — star rich results are lost on each of them.
- **Recommendation:** Emit the rating server-side from the metafields (already in the v2 snippet):
  ```liquid
  {%- assign rating = product.metafields.reviews.rating.value -%}
  {%- assign rating_count = product.metafields.reviews.rating_count.value | default: 0 | plus: 0 -%}
  {%- if rating != blank and rating_count > 0 %}
  "aggregateRating": {"@type":"AggregateRating","ratingValue": {{ rating.rating | json }},"bestRating": {{ rating.scale_max | json }},"worstRating": {{ rating.scale_min | json }},"ratingCount": {{ rating_count | json }},"reviewCount": {{ rating_count | json }}},
  {%- endif %}
  ```
  Do not also enable Judge.me's "rich snippet" JSON-LD toggle (it would create a second Product entity). Optionally add the 3-5 most recent reviews as `review` items from the Judge.me widget metafield later.
- **Falsifiability:** Rich Results Test on `/products/baton-proteic-capsuni` shows "Review snippets: 1 valid item" with 4.0/4; if `aggregateRating` is absent or the test flags "rating missing on product", the metafield read failed.
- **Leading indicator:** GSC Enhancements → "Review snippets" valid items; CTR on product queries.
- **Effort:** S  **Confidence:** 0.9

### SCHEMA-04 — BlogGenAuto injects a second, conflicting JSON-LD graph into 347/355 article bodies (myshopify breadcrumbs, placeholder jobTitle)
- **Severity:** High
- **Evidence:** 344 bodies contain 4 blocks (Article + FAQPage + BreadcrumbList + Person) and 3 older ones a single `@graph` (Article + FAQPage + BreadcrumbList); only 8 bodies are clean. On `/blogs/news/citicolina-conexiune-musculara-rutina-antrenament-seara-travel-2026` the page therefore carries **two `Article` entities with the same headline** but: author `Person "Marius Chera , Nutriționist Certificat"` (body) vs `Organization "Prime Supplements"` (theme); two different descriptions; `datePublished` `2026-04-14T02:20:02.026Z` vs `2026-04-14T05:20:02+0300`; body breadcrumb last item `.../citicolina-conexiune-musculara-rutina-seara-2026` ≠ canonical `...-antrenament-seara-travel-2026` (32/347 breadcrumbs point to a URL that is not the article's). Across the blog: 265 body blocks contain `myshopify.com`; breadcrumb `item` URLs use `https://primesupplements1.myshopify.com` (532 ListItems) and `https://primesupplements1.com` (6) vs `https://primesupplements.ro` (188); publisher name `primesupplements1` (3); `Person.jobTitle` has 5 different values including the literal placeholder **"Professional title based on niche" (26 articles)**, "Expert Nutriție Sportivă & Biohacking" (41) / "… și Biohacking" (42), "Antrenor de culturism și nutriționist sportiv" (47); `Person.name` is "Marius Chera , Nutriționist Certificat" (333) — a title inside the name — with a second spelling without the space (2); no `@id`, no `sameAs` on any Person (344); author photo file is `author-photo-primesupplements1-myshopify-com.jpg`; `relatedLink` → `https://primesupplements1.myshopify.com/blogs/news` in the 3 old ones; 3 Articles have no image/logo.
- **Affected scope:** 347 articles (694 URLs with `/ro-hu/`), i.e. 98 % of the blog.
- **Recommendation:** Keep exactly one Article entity per page, emitted by the theme. Strip the in-body blocks with a one-off Admin API pass (regex `<script type="application/ld+json">[\s\S]*?</script>` on `article.body_html`, `articleUpdate` mutation; same job as the myshopify-link clean-up in task #7) and switch off "inject schema" in the BlogGenAuto settings so new posts stay clean. If the body FAQ sections are kept as visible content, that is fine — only the hidden JSON-LD goes. Then the theme's BlogPosting (SCHEMA-05 fix) carries the Person author with a real jobTitle and LinkedIn `sameAs`.
- **Falsifiability:** After the clean-up `grep -c 'application/ld+json' article.html` must be 2 (Organization + BlogPosting) on every article; the Rich Results Test must show one Article, author type Person.
- **Leading indicator:** Count of article bodies containing `"@type":"Article"` (currently 347) → 0; GSC "Article" enhancement errors (if any) disappear.
- **Effort:** M (script over 347 articles)  **Confidence:** 0.9

### SCHEMA-05 — Theme Article block: same `escape` bug, author is always an Organization, no publisher logo, headline not capped
- **Severity:** Medium
- **Evidence:** `snippets/schema-article.liquid`: `"description": "{{ article.excerpt_or_content | strip_html | truncate: 300 | escape }}"` → invalid JSON on `pages/article.html` (bcaa-vs-eaa, "Invalid control character at: line 6 column 19 (char 166)") and `pages/article-thin-lcarnitine.html` (char 433). Simulating the filter over all 355 articles: 6 articles (the hand-written ones without an excerpt: `bcaa-vs-eaa-…`, `cum-contribuie-l-carnitine-1000-…`, …) break; the 349 with a single-line BlogGenAuto excerpt parse — so the context's "2 of 2 sampled" was a skewed sample, but the bug is live for every future article whose excerpt contains a line break. Other defects: `"author": {"@type":"Organization","name":"Prime Supplements"}` although `article.author` is "Marius Chera , Nutriționist Certificat"/"Marius Chera" on 335/354 articles (E-E-A-T author signal thrown away); `publisher` has no `logo`; `image` is a bare string; `headline` is the full title (3 titles > 110 chars, max 134); dates use `%z` → `+0300` (valid ISO 8601 but Google's examples use `+03:00`); no `@id`, no `inLanguage`, generic `Article` instead of `BlogPosting`.
- **Affected scope:** 354 articles (theme block on all; unparseable on ≥ 6).
- **Recommendation:** Replace with `$A/findings/schema-fixes/snippets/schema-article.liquid`: `| json` everywhere, `BlogPosting`, author `Person` "Marius Chera" (`jobTitle`, `url` to /pages/despre-noi, `sameAs` LinkedIn) when `article.author contains 'Marius Chera'`, Organization author only for the 18 "primesupplements1" articles (and fix those author names in Admin), publisher with `logo` ImageObject, `image` ImageObject with width/height, `headline | truncate: 110`, `%:z` offsets, `wordCount`, `articleSection`, `keywords`. Rendered example that parses: `$A/findings/schema-fixes/examples/article-bcaa.example.jsonld`.
- **Falsifiability:** Rich Results Test on `/blogs/news/bcaa-vs-eaa-…` reports an Article with author.name "Marius Chera"; `json.loads` on the block succeeds.
- **Leading indicator:** GSC "Articles" enhancement report: 0 invalid items; appearance of the author entity in "Top stories"/Discover is not expected, but the article rich result (thumbnail/date) should show for the 354 URLs.
- **Effort:** S  **Confidence:** 0.9

### SCHEMA-06 — No hasMerchantReturnPolicy / shippingDetails, and the two policy pages disagree
- **Severity:** Medium
- **Evidence:** Validator on every parseable Product: `missing-return-policy`, `missing-shipping-details`. Neither Product nor Organization carries return/shipping data, so the "free returns"/"delivery by" annotations of merchant listings cannot show. The data exists on the site: `/pages/politica-de-retur` — 14-day withdrawal ("în decurs de maximum 14 zile de la data la care ne-ați comunicat retragerea"); `/pages/politica-de-livrare` — Cargus, "Livrare are costul de 20 RON", "Livrare GRATUITĂ pentru comenzile ce depășesc 300 RON", "livrate în 1-3 zile lucrătoare". But `/pages/termeni-și-condiții` says "Costul livrari este de 20 RON pentru comenziile mai mici de suma de 700 RON … peste 700 RON este gratuit" and "2 – 4 zile lucratoare" — a factual conflict that must be resolved before it is encoded (Google can cross-check Merchant Center shipping settings against markup).
- **Affected scope:** 185 products.
- **Recommendation:** Already in the v2 snippet on every Offer: `MerchantReturnPolicy` (applicableCountry RO, `MerchantReturnFiniteReturnWindow`, `merchantReturnDays: 14`, `ReturnByMail`, `returnFees` customer responsibility — confirm who pays, `merchantReturnLink`) and `OfferShippingDetails` (20 RON, DefinedRegion RO, handling 0-1 day, transit 1-3 days). The Organization v2 also publishes the return policy site-wide (`#return-policy`). Align the Terms page with the delivery page first (300 vs 700 RON threshold).
- **Falsifiability:** Rich Results Test → Merchant listings → "Shipping details" and "Return policy" listed as present; if GSC later reports "Return policy conflicts with Merchant Center", the numbers were wrong.
- **Leading indicator:** Merchant listing annotations visible in Shopping results for a brand query ("prime supplements creatina").
- **Effort:** S  **Confidence:** 0.85

### SCHEMA-07 — Product breadcrumb category is "All Products" (or "11% TVA") on every product
- **Severity:** Medium
- **Evidence:** `snippets/schema-breadcrumb-enhanced.liquid` uses `product.collections.first`. Shopify orders `product.collections` by title, every product is in "All Products" and "11% TVA" sorts before "A": position-2 names across the 16 sampled product pages = `{'All Products': 14, '11% TVA': 2}` (the 2 are creatina products that sit in the internal tax collection). Baton proteic is in `batoane-proteice`, `suplimente-sala`, `frontpage`, … but the crumb says `All Products → https://primesupplements.ro/collections/all`. Also hard-coded "Pagina principala" (the visible breadcrumb uses a different label), names passed through `escape`, and the product item lacks `item`.
- **Affected scope:** 185 products (170 "All Products", 15 "11% TVA").
- **Recommendation:** `$A/findings/schema-fixes/snippets/schema-breadcrumb-enhanced.liquid`: prefer the `collection` the visitor came from, otherwise the first collection whose handle is not in `all, frontpage, cele-mai-vandute, lansate-recent, 11-tva, reduceri`; `| json` on names; `item` on every ListItem. Long term, set `product.type` (SCHEMA-09) and build crumbs from it.
- **Falsifiability:** Rich Results Test on baton-proteic-capsuni shows `Acasă › Batoane Proteice › Baton proteic căpșuni`; if "All Products" still appears, the exclusion list is wrong.
- **Leading indicator:** SERP breadcrumb line for product URLs shows the category instead of "All Products" (site: query inspection).
- **Effort:** S  **Confidence:** 0.95

### SCHEMA-08 — Organization: logo URL returns 404, no telephone/e-mail/address/legal IDs, wrong language and founding date, dubious sameAs
- **Severity:** Medium
- **Evidence:** `snippets/schema-organization.liquid` hard-codes `"logo": {"url": "https://primesupplements.ro/cdn/shop/files/logo-prime-supplements.png"}` → `curl -I` today: `HTTP/2 404`. The real header logos are SVGs (`logo-prime-negru.svg`, `logo-site-alb.svg`), which Google does not accept for the logo rich result. `contactPoint` has no `telephone`; no `telephone`, `email`, `address`, `legalName`, `taxID`/`vatID` although the footer/contact page show "PRIME SPORT SUPPLEMENTS SRL, CUI 46260823, J32/1155/2022, 0775286584, contact@primesupplements.ro" and Admin has the billing address (Strada Ioan Virgil Ispas, Sibiu, 555300, +40775286584). `availableLanguage: ["Romanian","Hungarian"]` while the hu locale is unpublished. `foundingDate: "2020"` vs registration J32/1155/2022 and the About page ("a conceput firma PRIME SUPPLEMENTS in anul 2022"). `sameAs` lists `facebook.com/primesupplements.ro`, which returned a 1.5 KB error page in the social recon, whereas `facebook.com/primesupplementsro` returned a 65 KB profile. The B2B store emits a different Organization name (`PRIME SPORT SUPPLEMENTS SRL / 46260823`) for the same company. The snippet is also rendered as the very first element of `<head>`, before `<meta charset>`.
- **Affected scope:** site-wide (block on all 1 151 URLs).
- **Recommendation:** `$A/findings/schema-fixes/snippets/schema-organization.liquid`: `OnlineStore` subtype, `legalName`, `taxID 46260823` (+ `vatID RO46260823` only if VAT-registered), `telephone +40775286584`, `email`, full `PostalAddress` (Str. Ioan Virgil Ispas nr. 17A, Cisnădie, Sibiu, 555300, RO), `contactPoint` with phone and Mo-Fr 09-17 hours, `availableLanguage ["ro"]`, `founder` Person node, `foundingDate 2022`, site-wide `MerchantReturnPolicy`, logo from Settings → Brand (upload a PNG ≥ 112 px, e.g. 600×160) with fallback file `logo-prime-supplements-600x160.png`; move the render after `<meta charset="utf-8">`. Verify the Instagram/TikTok handles before publishing.
- **Falsifiability:** `curl -I` on the new logo URL returns 200 image/png; Rich Results Test → "Organization" shows logo, address and phone without warnings.
- **Leading indicator:** Knowledge panel / brand SERP shows the logo and "Customer service +40 775 286 584".
- **Effort:** S  **Confidence:** 0.9

### SCHEMA-09 — brand is hard-coded, category is empty, sku/gtin come from a single variant, barcodes missing on 207/395 variants
- **Severity:** Medium
- **Evidence:** `"brand": {"@type":"Brand","name":"Prime Supplements"}` on all 185 products including the 100 MNX apparel products (brand MNX). `product.vendor` cannot be used as-is: it is "primesupplements1" (the myshopify handle) on 64 products and "Prime Supplements" on 121 — the native Shopify markup on the B2B store already shows the consequence: `"brand": {"name": "primesupplements1"}`. `"category": "{{ product.type | escape }}"` renders `""` on 185/185 (productType empty on the whole catalog). `sku`/`gtin` are taken from `selected_or_first_available_variant` only: on baton the sku/gtin `6421766062509` is the 100 RON box while the AggregateOffer lowPrice is the 8.50 bar; the barcode is emitted as generic `gtin` instead of `gtin13` (all barcodes seen are EAN-13, prefix 642). 207/395 variants (86 products, 82 MNX) have no barcode, so no GTIN at all; 164 variants have sku == barcode.
- **Affected scope:** 185 products (brand/category), 86 products (no GTIN).
- **Recommendation:** Data first (task #5): set `vendor` = "Prime Supplements" for supplements and "MNX" for apparel, fill `productType` (Batoane proteice, Creatină, Proteine, Pre-workout, Îmbrăcăminte sport …), add EAN-13 barcodes to the 207 variants. The v2 snippet then uses `product.vendor` (with a temporary fallback that maps "primesupplements1" → "Prime Supplements"), `product.type` with fallback to the first non-generic collection title, and per-variant `sku` + `gtin13`.
- **Falsifiability:** Rich Results Test on an MNX product shows brand "MNX"; on baton both offers carry their own gtin13 (`6421766062509`, `6421766062462`).
- **Leading indicator:** Merchant Center / GSC "Merchant listings" warnings "Missing field gtin/brand" count → 0.
- **Effort:** M (data) + S (snippet)  **Confidence:** 0.9

### SCHEMA-10 — `escape` double-encodes `&`, `"`, `'` inside JSON strings and the description is cut at 500 chars
- **Severity:** Low
- **Evidence:** Liquid `escape` outputs HTML entities, so JSON strings contain literal `&amp;`, `&quot;`, `&#39;` (21 products have `&`/quotes in name or first 500 chars of description; 1 article title). Google would index "Hammer &amp; Co" as text. `truncate: 500` appends "..." and discards the rest of descriptions that are up to 303 words (median for supplements); Google reads up to ~5 000 characters.
- **Affected scope:** 21 products, 1 article (fidelity); 85 supplements (truncation).
- **Recommendation:** Covered by the `| json` rewrite (`strip_html | strip_newlines | strip | truncate: 5000 | json`); use the `custom.short_description` metafield when present (exists on baton).
- **Falsifiability:** No `&amp;` substring inside any `application/ld+json` block after deployment (`grep -c '&amp;' product.html` inside the script tags = 0).
- **Leading indicator:** n/a (quality).
- **Effort:** S  **Confidence:** 0.85

### SCHEMA-11 — CollectionPage: empty description, wrong numberOfItems, list truncated, no breadcrumb
- **Severity:** Low
- **Evidence:** `snippets/schema-collection.liquid` → `"description": ""` on 6/6 sampled collections (23/23 collections have empty descriptions except "Bauturi"); `"numberOfItems": {{ collection.products.size }}` returns the paginated page size — `All Products`: numberOfItems 24, listed 20, real count 195; `Haine MNX`: 24 / 20 / 100; `Reduceri`: 0 / 0. `limit: 20` on the loop while the page shows 24. No BreadcrumbList on collections, names through `escape`. CollectionPage/ItemList produce no rich result, hence Low.
- **Affected scope:** 23 collections (46 URLs).
- **Recommendation:** `$A/findings/schema-fixes/snippets/schema-collection.liquid`: `| json`, description fallback until the collections get real copy (task #4), `numberOfItems: collection.all_products_count`, positions offset by `current_page`, `BreadcrumbList` + `isPartOf #website`, collection image when set.
- **Falsifiability:** On `/collections/all` the block reports `numberOfItems: 195` and a non-empty description.
- **Leading indicator:** n/a.
- **Effort:** S  **Confidence:** 0.9

### SCHEMA-12 — No WebSite node on the homepage (site name / search endpoint)
- **Severity:** Low
- **Evidence:** `home.html` carries only Organization + FAQPage. The native `microdata-schema.liquid` would emit `WebSite` + `SearchAction` (`routes.search_url?q={search_term_string}`) on `index`, but it is commented out in `layout/theme.liquid` (`{%- comment -%}{%- render 'microdata-schema' -%}{%- endcomment -%}`). Google uses `WebSite.name`/`alternateName` for the site-name display in SERPs; the sitelinks search box itself was retired in November 2024, so the SearchAction has no SERP feature anymore.
- **Affected scope:** homepage (and the entity graph).
- **Recommendation:** Add `$A/findings/schema-fixes/snippets/schema-website.liquid` (`WebSite @id #website`, name "Prime Supplements", alternateName, `publisher → #organization`, SearchAction kept for completeness) and render it from `theme.liquid` right after `schema-organization`.
- **Falsifiability:** Rich Results Test on `/` lists a WebSite entity; brand SERP shows "Prime Supplements" as site name instead of the domain.
- **Leading indicator:** Site-name display on brand queries.
- **Effort:** S  **Confidence:** 0.8

### SCHEMA-13 — Entities are not linked (@id only on Organization), seller/publisher/author are duplicated inline nodes
- **Severity:** Low
- **Evidence:** Organization has `@id https://primesupplements.ro/#organization`, but `Product.offers.seller`, `Article.author`, `Article.publisher` are separate inline `Organization` objects without `@id`, so Google sees 2-3 unlinked "Prime Supplements" organisations per page; no `WebSite`/`WebPage` nodes; BlogGenAuto's Person has no `@id`; the B2B store's Organization has a different name. Product `@id …#product` is fine.
- **Affected scope:** all pages.
- **Recommendation:** The v2 snippets reference `{"@id": "https://primesupplements.ro/#organization"}` for seller/publisher, `#website` for `isPartOf`, `#return-policy`, `#logo`, and a stable Person `@id https://primesupplements.ro/pages/despre-noi#marius-chera` used by author, founder and (later) a ProfilePage on /pages/despre-noi.
- **Falsifiability:** A JSON-LD graph viewer (e.g. the Schema Markup Validator) shows one Organization node per page.
- **Leading indicator:** n/a.
- **Effort:** S  **Confidence:** 0.8

### SCHEMA-14 — Structured data on the /ro-hu/ duplicates points at the primary URLs
- **Severity:** Low
- **Evidence:** `pages/homepage-ro-hu.html` emits the identical Organization + FAQPage; on `/ro-hu/products/<handle>` the live snippet writes `"url": "{{ shop.url }}/products/{{ product.handle }}"` and `"@id": …#product` with the primary URL while the page is self-canonical to `/ro-hu/…` (hreflang ro-HU). 575 duplicate URLs therefore declare entities whose URL is another page.
- **Affected scope:** 575 `/ro-hu/` URLs.
- **Recommendation:** The v2 snippets use `canonical_url` and `request.origin`, which stay consistent whatever the international fix is; the real fix is removing the Hungary market web presence (international finding).
- **Falsifiability:** After the international fix, `/ro-hu/` URLs redirect or no longer exist; otherwise each entity `url` equals the page canonical.
- **Leading indicator:** n/a.
- **Effort:** S  **Confidence:** 0.8

### SCHEMA-15 — FAQPage on the homepage and on 3 creatina products; the product FAQ text is not visible on the page
- **Severity:** Info
- **Evidence:** `home.html` FAQPage with 5 questions (answers contain `<p>`/`<a>` HTML, allowed) — the questions are visible in the homepage FAQ section. `snippets/faq-schema-creatina.liquid` emits the same 8-question FAQPage on `creatina-monohidrat-micronized-300g-fara-aroma`, `creatina-creapure`, `creatine-ready-to-go-plicuri-prime-supplements` (handle-matched), but the question text (e.g. "Creatina monohidrata cauzeaza caderea parului?") does not appear anywhere in the visible HTML of `product-creatina-creapure.html` — markup that does not match on-page content violates Google's structured-data guidelines. 347 more FAQPage blocks live inside article bodies (avg 4.7 questions). Google removed FAQ rich results for all sites on 7 May 2026, so there is no SERP feature to gain or lose.
- **Affected scope:** homepage, 3 products, 347 articles.
- **Recommendation:** No removal needed and no new FAQPage. If the creatina block stays, render the same Q&A visibly on those 3 product pages (an accordion block in `templates/product.json`) so markup equals content; the article FAQ sections are visible already.
- **Falsifiability:** n/a (no rich result).
- **Leading indicator:** n/a.
- **Effort:** S  **Confidence:** 0.9

### SCHEMA-16 — The maintained Shopify markup (`microdata-schema`) is disabled; decide between native and custom and never run both
- **Severity:** Medium
- **Evidence:** `layout/theme.liquid` line 47: `{%- comment -%}{%- render 'microdata-schema' -%}{%- endcomment -%}`. `snippets/microdata-schema.liquid` (Impact 6) outputs `{{ product | structured_data }}` / `{{ article | structured_data }}` (maintained by Shopify, per-variant `Offer` with decimal prices and `availability`, brand = vendor), a BreadcrumbList using the current `collection`, and `WebSite` + `Organization` on `index`. What native markup looks like today can be seen on the B2B store (`$R/pages/b2b-product.html`): valid Product, but `"brand": "primesupplements1"`, `"category": ""`, `"@context": "http://schema.org/"`, relative `@id`, no aggregateRating, no return/shipping details.
- **Affected scope:** architecture decision for all 185 products / 354 articles.
- **Recommendation:** Trade-off: (a) re-enable `microdata-schema` and delete the three custom renders in `main-product.liquid` lines 112-114 and `main-article.liquid` line 137 — zero maintenance, Shopify fixes it when Google changes requirements, but no ratings, no return/shipping, brand follows the (currently wrong) vendor, and the Organization would be emitted twice (theme head + microdata index block) unless `schema-organization` is removed; (b) keep custom markup but replace it with the v2 files in `$A/findings/schema-fixes/snippets/` — full control (ratings from Judge.me metafields, merchant-listing fields, Person author), validated above, but it must be kept in sync with Google's documentation by the team. Recommended: (b) now, with `schema-website` replacing the native WebSite part; if the team has no developer, (a) after fixing vendor/type is the acceptable fallback. In both cases: exactly one Product and one Article entity per page.
- **Falsifiability:** `grep -c '"@type": "Product"'` (and the compact `"@type":"Product"`) on a product page = 1 after deployment.
- **Leading indicator:** GSC "Product snippets"/"Merchant listings" valid items trend.
- **Effort:** S  **Confidence:** 0.9

### SCHEMA-17 — The same product entities exist on b2b.primesupplements.ro with a different seller/brand
- **Severity:** Low
- **Evidence:** `$R/pages/b2b-product.html` (`/products/creatina-creapure` on the B2B store) emits native Product JSON-LD with `brand "primesupplements1"`, `@id "/products/creatina-creapure#product"`, Organization `"PRIME SPORT SUPPLEMENTS SRL / 46260823"`; the main store emits the same product name/description with brand "Prime Supplements" and Organization "Prime Supplements". 58 B2B product URLs share handles with the main store.
- **Affected scope:** 58 products on two domains.
- **Recommendation:** Schema side of the duplicate-content finding: noindex the B2B store (or password/customer-account gate it); if it must stay indexable, rename its Organization to the same `legalName`/`name` and set vendor properly so the entity data agree.
- **Falsifiability:** `site:b2b.primesupplements.ro` returns 0 results after noindex.
- **Leading indicator:** n/a.
- **Effort:** S  **Confidence:** 0.8

### SCHEMA-18 — Colour/flavour variants published as separate products prevent ProductGroup markup
- **Severity:** Low
- **Evidence:** Validator Info `no-product-group` on every MNX product; the catalogue has 19 near-duplicate title groups / 45 products (MNX colours, Frutilu flavours) as separate products, so `ProductGroup`/`variesBy`/`hasVariant` cannot be expressed and Google sees competing identical products.
- **Affected scope:** 45 products.
- **Recommendation:** Merge colour/flavour siblings into variants (catalogue task); afterwards Shopify's native `structured_data` emits ProductGroup automatically, or extend the v2 snippet with `ProductGroup` + `variesBy: ["https://schema.org/color"]`.
- **Falsifiability:** Rich Results Test shows a ProductGroup with hasVariant on an MNX tee.
- **Leading indicator:** n/a.
- **Effort:** M  **Confidence:** 0.75

### SCHEMA-19 — Sale prices (compare-at on 144/185 products) are not expressed; no priceValidUntil / itemCondition
- **Severity:** Low
- **Evidence:** Baton variants have `compareAtPrice 155.00/12.50` vs `price 100.00/8.50` in Admin, the page shows the strikethrough, but the markup has only `lowPrice/highPrice`. Google supports `UnitPriceSpecification` with `priceType: https://schema.org/StrikethroughPrice` for the "price drop"/strikethrough display; `priceValidUntil` and `itemCondition` are recommended fields currently absent.
- **Affected scope:** 144 products with compare-at prices; all 185 for the recommended fields.
- **Recommendation:** Included in the v2 snippet: `"priceSpecification": {"@type":"UnitPriceSpecification","priceType":"https://schema.org/StrikethroughPrice","price": compare_at, "priceCurrency": "RON"}` when `variant.compare_at_price > variant.price`, `priceValidUntil` next 31 Dec, `itemCondition NewCondition`.
- **Falsifiability:** Rich Results Test on baton shows price 100 RON with strikethrough 155 RON.
- **Leading indicator:** "Price drop" badge in Shopping/organic product results.
- **Effort:** S  **Confidence:** 0.85

### SCHEMA-20 — Missing schema opportunities tied to existing content (ProfilePage for the author, ContactPage, VideoObject)
- **Severity:** Low
- **Evidence:** 335 articles are signed by Marius Chera and /pages/despre-noi carries his bio ("primul antrenor roman … cardul PRO … NPC", J32/1155/2022 company data) but no Person/ProfilePage markup; /pages/contact has NAP in HTML but only the generic Organization block; product pages embed a YouTube gallery app block (`youtube_gallery_carousel_widget_block`) with no `VideoObject`.
- **Affected scope:** 2 pages + products with videos.
- **Recommendation:** Add a `ProfilePage` + `Person` (`@id …#marius-chera`, jobTitle, sameAs LinkedIn, knowsAbout) on /pages/despre-noi, `ContactPage` on /pages/contact, and `VideoObject` (name, description, thumbnailUrl, uploadDate, embedUrl) for product videos once the YouTube IDs are known. Do not add HowTo; FAQPage only as Info.
- **Falsifiability:** Rich Results Test on /pages/despre-noi shows ProfilePage.
- **Leading indicator:** Author knowledge panel / "Marius Chera" brand-query appearance.
- **Effort:** M  **Confidence:** 0.7

## Deliverables (fix files)

- `$A/findings/schema-fixes/snippets/schema-product-enhanced.liquid` — Product with per-variant Offer, ratings, return/shipping, brand/category logic.
- `$A/findings/schema-fixes/snippets/schema-breadcrumb-enhanced.liquid` — category crumb from a non-generic collection.
- `$A/findings/schema-fixes/snippets/schema-article.liquid` — BlogPosting with Person author "Marius Chera", publisher logo.
- `$A/findings/schema-fixes/snippets/schema-collection.liquid` — CollectionPage + ItemList + BreadcrumbList.
- `$A/findings/schema-fixes/snippets/schema-organization.liquid` — OnlineStore with NAP, IDs, return policy.
- `$A/findings/schema-fixes/snippets/schema-website.liquid` — homepage WebSite/SearchAction.
- `$A/findings/schema-fixes/examples/baton-proteic-capsuni.product.jsonld` — rendered with real Admin values (variants 55179979030903 "Cutie 12 buc x 55g" 100.00/155.00 RON, 55179979063671 "Baton 55g" 8.50/12.50 RON, GTINs 6421766062509 / 6421766062462, Judge.me 4.0 / 4) — validator `ok: true`, 0 Critical/High.
- `$A/findings/schema-fixes/examples/organization.example.jsonld`, `article-bcaa.example.jsonld` — parse OK.

Theme wiring (unpublished duplicate theme, task #6): upload the six snippets; in `layout/theme.liquid` move `{% render 'schema-organization' %}` below `<meta charset="utf-8">` and add `{% render 'schema-website' %}` after it; keep `microdata-schema` commented out (or go the native route per SCHEMA-16 and delete the custom renders); leave `main-product.liquid` lines 112-114 and `main-article.liquid` line 137 / `main-collection.liquid` line 233 as they are (same snippet names). Before publishing: upload a PNG logo in Settings → Brand, fix vendor/productType (task #5), verify VAT status, social handles and the shipping threshold (300 vs 700 RON).

## Limitations

- No access to Google's Rich Results Test, Search Console enhancement reports or Merchant Center, so eligibility is inferred from Google's documented requirements and the plugin validator (which ignores the EU energy-class rule, not applicable here, and crashes on `priceSpecification` arrays).
- Liquid could not be executed; the v2 snippets were checked by hand-rendering with real catalogue values. The `rating` metafield access path (`metafields.reviews.rating.value.rating`) follows Shopify's Liquid docs and was not executed.
- Catalog-wide counts (75/185 invalid Product, 6/355 invalid Article, 21 entity-fidelity cases) come from replaying the filter chain in Python on the Admin exports; the 17 product + 4 article live copies agree with the simulation (9/17 and 2/4 invalid).
- Judge.me metafields were verified on one product only; products without reviews will simply omit `aggregateRating`.
- Facebook/Instagram/TikTok `sameAs` correctness is inferred from recon fetch sizes, not from a logged-in check; postal code 555300 and the VAT prefix must be confirmed by the owner.
