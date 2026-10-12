# E-commerce SEO findings: primesupplements.ro (key: ecommerce)

Audit date: 2026-10-12. Specialist: claude-seo `seo-ecommerce` method (product data hygiene, product page checklist, Product schema vs Google merchant-listing rules, collection architecture, Merchant Center / UCP readiness). Data source: Shopify Admin export + on-page analysis (static); no DataForSEO Merchant data available.

## Scope & method

Checked:
- Full catalogue dataset `$R/shopify/products-all.json` (185 active products, 395 variants) and the raw pages `$R/shopify/products-p1..p4.json` (variant-level SKU/barcode/price/compare-at/availability), `$R/shopify/catalog-analysis.md`, `$R/shopify/pages.json` (shipping/return/payment policy bodies), `$R/shopify/articles-all.json` (3201 product links in 355 articles, link targets).
- Theme source: `$R/theme/templates__product.json`, `templates__collection.json`, `templates__index.json`, `snippets__product-info.liquid`, `snippets__product-card.liquid`, `snippets__vendor.liquid`, `sections__main-product.liquid`, `sections__main-collection.liquid`.
- Product page HTML (local copies): `$R/pages/product.html` (baton-proteic-capsuni), `product-creatina-creapure.html`, `products/mnx-classic-t-shirt-golden-era-blue.html`, `products/turmeric-extract-80-caps.html`, `products/instant-drink-frutilu-cola-10g.html`; parsed JSON in `$R/parsed/`; JSON-LD blocks in `$R/jsonld/`.
- Collection HTML: `collection.html` (pudra-proteica), `collection-all.html`, `collection-haine-mnx.html`, `collection-reduceri.html`, `collection-11tva.html`; sitemap collection list `$R/sitemaps/all-urls.txt`; `$R/home.html` navigation; `$R/pages/homepage-ro-hu.html`; `$R/ucp.json`.
- Validator: `schema_ecommerce_validate.py $R/jsonld/product-mnx-blue-1.jsonld --json` (merchant-listing rules).
- 5 throttled live requests (saved under scratchpad `ecommerce-live/live1-5.html`): `/collections/all?filter.v.availability=1`, `/collections/all?sort_by=price-ascending`, `/collections/vendors?q=primesupplements1`, `/products/mnx-workout-top-hammer-3-0-white` (out of stock), `/ro-hu/products/baton-proteic-capsuni`.

Could not check: Google Merchant Center account/feed status and disapprovals, Google Shopping / emag.ro marketplace listings (no DataForSEO, no WebSearch in this agent), Judge.me review counts for the whole catalogue (only the sampled pages), Shopify "Search & Discovery" filter/complementary configuration, the product `category` (standard taxonomy) field (not included in the export), variant option names (export has no `options`; only visible from HTML: MNX pages expose a single "Size" option).

## Score

**30/100** (skill weights: schema completeness 25% -> 10, title & meta 15% -> 35, image optimisation 20% -> 30, content quality 20% -> 35, internal linking 10% -> 30, technical 10% -> 55).
Rationale: the store cannot earn product rich results or a clean Merchant Center feed today (invalid JSON-LD on multi-line descriptions, AggregateOffer with "145,00" prices, empty product type on 185/185, wrong vendor on 64, invalid GTINs, 79 products with an empty meta description, /ro-hu duplicates showing ex-VAT prices). The foundations are good (Shopify, Judge.me reviews server-rendered, policy pages exist, faceted URLs canonicalise correctly, UCP profile live), so most fixes are data entry plus two Liquid snippets.

## What works

- Faceted and sorted collection URLs canonicalise to the clean collection URL (live: `?filter.v.availability=1` and `?sort_by=price-ascending` both carry `<link rel="canonical" href="https://primesupplements.ro/collections/all">`); pagination uses `?page=N` with `rel="next"`.
- Out-of-stock product pages emit `"availability": "https://schema.org/OutOfStock"` and show "Stoc epuizat" (live4), in-stock pages "În stoc" / "Doar 2 unități rămase" (low-stock threshold 5 configured in `templates__product.json`).
- Judge.me reviews are server-rendered in the product HTML (`jdgm-rev__body` x4 on baton-proteic-capsuni, x5 on creatina-creapure); store-wide badge on the homepage: 431 reviews, 4.87 average.
- Every supplement sits in at least one real category collection (0 products only in automated collections); 69/85 supplement titles carry the pack size (300g, 80 caps, 500 ml).
- Featured images are large enough for Shopping (none below 1024 px; 81 products at 1500x1875, 43 at 4000x4000); files are AVIF.
- Shipping, return and payment policy pages exist with concrete values (free shipping over 300 RON, 20 RON otherwise, Cargus, 1-3 working days; 14-day withdrawal; Netopia card, transfer, cash on delivery).
- UCP profile `/.well-known/ucp` is valid and current (version 2026-08-25; checkout, cart, order, fulfillment, discount, catalog.search/lookup; MCP endpoint; permalink `https://primesupplements.ro/buy`; Google Pay, Shop Pay handlers).
- Related/complementary product slots, "Cele mai vândute" carousel and "Categorii populare" exist on every product page; 19 category collections are linked from the mega-menu on every page.

## Findings

### ECOMMERCE-01 - Product JSON-LD is ineligible for merchant listings on every product (invalid JSON on multi-line descriptions, AggregateOffer with comma prices)
- Severity: Critical
- Evidence: `$R/jsonld/product-baton-1.jsonld` fails `json.load` with `Invalid control character at: line 7 column 38` because `snippets__schema-product-enhanced.liquid` writes `"description": "{{ product.description | strip_html | truncate: 500 | escape }}"` (escape does not encode newlines; the baton description starts "Mod de administrare\nDupă cum..."). Context sample: 7/13 Product blocks invalid, all supplements with multi-line descriptions. On syntactically valid blocks (MNX, empty description) the validator still fails: `schema_ecommerce_validate.py product-mnx-blue-1.jsonld` -> `"ok": false`, High `merchant-listing-offer-type` ("offers.@type='Offer', not 'AggregateOffer'"), Medium `recommended-offer-price`, `missing-return-policy`, `missing-shipping-details`, `recommended-product-description`; the block carries `"lowPrice": "145,00"` (comma decimal, not a number), `"category": ""`, `"gtin": "10028802"` (not a valid GTIN, see ECOMMERCE-05), `"brand": "Prime Supplements"` hard-coded on an MNX garment. No `aggregateRating`/`review` anywhere (`grep '"aggregateRating"'` over product.html, product-creatina-creapure.html, home.html = 0) although Judge.me data is on the page. The theme's native `{{ product | structured_data }}` is commented out in `layout/theme.liquid`.
- Affected scope: all 185 products (x2 with /ro-hu duplicates = 370 URLs).
- Recommendation: replace the hand-built snippet with Shopify's maintained output plus a merchant-listing extension. Minimal safe version of `snippets/schema-product-enhanced.liquid`:
```liquid
{%- liquid
  assign cat = product.type | default: product.collections.first.title
  assign brand = product.vendor
  if product.vendor == 'primesupplements1' or product.vendor == blank
    assign brand = 'Prime Supplements'
  endif
-%}
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": {{ shop.url | append: product.url | append: '#product' | json }},
  "name": {{ product.title | json }},
  "description": {{ product.description | strip_html | truncate: 5000 | json }},
  "url": {{ shop.url | append: product.url | json }},
  "image": {{ product.images | map: 'src' | json }},
  "brand": {"@type": "Brand", "name": {{ brand | json }}},
  "category": {{ cat | json }},
  {%- if product.metafields.reviews.rating_count.value > 0 %}
  "aggregateRating": {"@type": "AggregateRating", "ratingValue": {{ product.metafields.reviews.rating.value.rating | json }}, "reviewCount": {{ product.metafields.reviews.rating_count.value | json }}},
  {%- endif %}
  "offers": [
  {%- for v in product.variants %}
    {
      "@type": "Offer",
      "url": {{ shop.url | append: v.url | json }},
      "sku": {{ v.sku | json }},
      {%- if v.barcode.size == 13 %}"gtin13": {{ v.barcode | json }},{% elsif v.barcode.size == 8 %}"gtin8": {{ v.barcode | json }},{% endif %}
      "price": {{ v.price | divided_by: 100.0 | json }},
      "priceCurrency": {{ cart.currency.iso_code | json }},
      "priceValidUntil": "{{ 'now' | date: '%Y' | plus: 1 }}-12-31",
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "{% if v.available %}https://schema.org/InStock{% else %}https://schema.org/OutOfStock{% endif %}",
      "shippingDetails": {"@type": "OfferShippingDetails", "shippingRate": {"@type": "MonetaryAmount", "value": {% if v.price >= 30000 %}0{% else %}20{% endif %}, "currency": "RON"}, "shippingDestination": {"@type": "DefinedRegion", "addressCountry": "RO"}, "deliveryTime": {"@type": "ShippingDeliveryTime", "handlingTime": {"@type": "QuantitativeValue", "minValue": 0, "maxValue": 1, "unitCode": "DAY"}, "transitTime": {"@type": "QuantitativeValue", "minValue": 1, "maxValue": 3, "unitCode": "DAY"}}},
      "hasMerchantReturnPolicy": {"@type": "MerchantReturnPolicy", "applicableCountry": "RO", "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow", "merchantReturnDays": 14, "returnMethod": "https://schema.org/ReturnByMail", "returnFees": "https://schema.org/ReturnFeesCustomerResponsibility", "merchantReturnLink": "https://primesupplements.ro/pages/politica-de-retur"}
    }{% unless forloop.last %},{% endunless %}
  {%- endfor %}
  ]
}
</script>
```
  Use the `json` filter everywhere (it escapes newlines and quotes), never `escape`. Alternative with less code: re-enable `{% render 'microdata-schema' %}` in theme.liquid (Shopify's `structured_data` emits one Offer per variant with numeric prices) and keep only the shipping/return/aggregateRating additions in a small snippet. Only emit gtin when the barcode passes a GS1 check digit (see ECOMMERCE-05).
- Falsifiability: Rich Results Test on `/products/baton-proteic-capsuni` shows a parsable Product with "Merchant listings" eligible; `python -c "json.load(...)"` on the block succeeds for all 185 products; Search Console "Merchant listings" report appears with 0 "Invalid" items.
- Leading indicator: GSC Enhancements > Merchant listings / Product snippets valid-item count within 2-4 weeks of deploy.
- Effort: M. Confidence: 0.95.

### ECOMMERCE-02 - The /ro-hu duplicate market shows prices WITHOUT 21% VAT in RON (82,64 lei vs 100,00 lei) on indexable pages and in JSON-LD
- Severity: High
- Evidence: live `/ro-hu/products/baton-proteic-capsuni` (200, self-canonical `https://primesupplements.ro/ro-hu/products/baton-proteic-capsuni`, hreflang ro-HU) renders `82,64 lei` / `128,10 lei` / `8,26 lei` where the primary page renders `100,00 lei` / `155,00 lei` / `8,50 lei` (100 / 1.21 = 82.64); its Product JSON-LD says `"price":"82.64"`, `"lowPrice": "7,02"`, `"highPrice": "82,64"`, `"priceCurrency": "RON"`. Homepage duplicate `$R/pages/homepage-ro-hu.html`: `206,61 lei`, `165,29 lei`, `396,69 lei`, `16,53 lei` vs `250,00`, `200,00`, `480,00`, `20,00 lei` on `$R/home.html`. Root cause: the "Ungaria" market (subfolder /ro-hu, no HU locale, no HUF) is sold with tax excluded for a non-RO destination while all content is Romanian and the currency stays RON. 575 URLs (every product, collection, page, article) exist in this cheaper-looking variant and are in the sitemap.
- Affected scope: 185 products + 23 collections + 354 articles under /ro-hu/ (575 URLs); Merchant Center price-mismatch risk for every product if Google crawls the /ro-hu/ URL; Romanian shoppers landing on /ro-hu/ see a price 17.4% lower than checkout.
- Recommendation: in Shopify Admin > Settings > Markets, either remove the Ungaria market's web presence (subfolder) so /ro-hu/ 301s to the primary URLs, or (if Hungary is a real target) publish the `hu` locale with translated content, HUF pricing and "include tax in prices" per the HU tax registration; add Hungary-specific hreflang only then. Until then, add `noindex` for `request.locale`/market Ungaria pages via `{% if localization.country.iso_code == 'HU' %}<meta name="robots" content="noindex">{% endif %}` in theme.liquid and make the /ro-hu/ canonical point to the primary URL. Submit only primary-domain URLs to Merchant Center (feed URL field = `product.url` without market prefix).
- Falsifiability: after the change, `curl -I https://primesupplements.ro/ro-hu/products/baton-proteic-capsuni` returns 301 (or the page is noindex and canonical to the primary URL) and the sitemap index drops the 575 /ro-hu/ entries.
- Leading indicator: GSC Pages report "Duplicate without user-selected canonical" / "Alternate page with proper canonical tag" counts for /ro-hu/ falling to 0; Merchant Center "Price mismatch" diagnostics at 0.
- Effort: S. Confidence: 0.95.

### ECOMMERCE-03 - productType is empty on 185/185 products, so category is missing from schema, feeds, filters and type pages
- Severity: High
- Evidence: `products-all.json`: `productType` values `(empty)=185`; schema snippet outputs `"category": ""` (product-mnx-blue-1.jsonld); collection facets expose only `filter.v.price`, `filter.v.availability`, `filter.p.m.custom.cantitate`, `filter.p.m.custom.aroma` (collection-all.html) and no product-type or brand facet; the Shopify Google & YouTube channel maps `product_type` from this field (and `google_product_category` from the standard category, not present in the export). Tags do the work instead (97 tags, e.g. `Îmbrăcăminte`=99, `Suplimente`=52, `bauturi`=19, with case duplicates `Pre-Workout`/`pre-workout`).
- Affected scope: 185 products (100 MNX apparel, 85 supplements/food).
- Recommendation: fill `Product type` and the standard `Product category` in bulk (Matrixify/CSV export, columns `Type` and `Product Category`). Proposed taxonomy (type -> Google category):
  - Pudră proteică (whey/izolat); Creatină; Aminoacizi (BCAA/EAA/glutamină); Pre-workout; Intra-workout; Shot energizant; Arzător de grăsimi; Vitamine și minerale; Supliment pentru sănătate (NAC, Q10, ashwagandha, silimarină, nattokinază, Omega-3) -> Health & Beauty > Health Care > Fitness & Nutrition > Vitamins & Supplements (Google id 5702)
  - Baton proteic -> Food Items > Snack Foods; Cremă de orez / Instant oat cream -> Food Items > Grains, Rice & Cereal; Unt de arahide/migdale/caju -> Food Items > Condiments & Sauces > Nut butters; Băutură instant Frutilu -> Beverages > Drink Mixes (Food, Beverages & Tobacco > Beverages > Powdered Beverage Mixes)
  - Tricou / Tricou oversized / Maiou stringer / Hanorac / Pantaloni de trening / Pantaloni scurți / Jersey -> Apparel & Accessories > Clothing > Shirts & Tops | Activewear | Pants | Shorts
  - Shaker; Prosop; Centură; Șapcă -> Sporting Goods > Exercise & Fitness > ... / Apparel Accessories > Hats
  Then expose "Tip produs" and "Brand" filters in Search & Discovery and switch the schema `category` to `product.type`.
- Falsifiability: `/products.json?limit=250` shows a non-empty `product_type` on all 185; `/collections/types?q=Creatină` returns products; Merchant Center item attributes show product_type.
- Leading indicator: number of products with empty Type in Admin = 0; Search & Discovery filter "Tip produs" visible on /collections/all.
- Effort: M (185 rows). Confidence: 0.95.

### ECOMMERCE-04 - Vendor/brand data is wrong: the myshopify handle "primesupplements1" is the vendor of 64 products and MNX garments are branded "Prime Supplements"
- Severity: High
- Evidence: vendor split from the export: `('primesupplements1','sup')=57`, `('primesupplements1','mnx')=7`, `('Prime Supplements','mnx')=93`, `('Prime Supplements','sup')=28`. Live `/collections/vendors?q=primesupplements1` -> 200, `<title>primesupplements1`, H1 "primesupplements1", "64 produse", self-canonical and indexable. The string `primesupplements1` appears 25-31 times in every product HTML (`grep -o primesupplements1 product.html | wc -l` = 31) through app/UCP URLs; the vendor block is disabled in `templates__product.json` so shoppers do not see it, but feeds and `snippets__vendor.liquid` (`url_for_vendor`) do. Schema brand is hard-coded "Prime Supplements" for all products including 100 MNX items and the 19 Frutilu drinks (third-party brand).
- Affected scope: 64 products with the wrong vendor string; 100 MNX + 19 Frutilu with a wrong brand in schema and feed.
- Recommendation: set `Vendor` = "Prime Supplements" for own-brand supplements, "MNX" for the 100 MNX garments, "Frutilu" for the 19 instant drinks, and keep Prime-branded apparel (`maiou-stringer`, `t-shirt-drop-shoulder-muscle`, `hanorac-prime-squad`, 13 items only in echipament-sala) as "Prime Supplements". Make the schema read `product.vendor`. Create manual brand collections `/collections/mnx`, `/collections/frutilu` so the vendor snippet links to them instead of `/collections/vendors?q=`. Add `Disallow: /collections/vendors` and `/collections/types` in `robots.txt.liquid` only after the brand collections exist.
- Falsifiability: `/collections/vendors?q=primesupplements1` shows "0 produse"; `products-all.json` vendor distribution has no `primesupplements1`.
- Leading indicator: Admin product list filtered by Vendor = primesupplements1 returns 0.
- Effort: S. Confidence: 0.95.

### ECOMMERCE-05 - GTIN coverage and validity: 207/395 variants have no barcode, 27 of the 188 barcodes fail the GS1 check digit, and invalid codes are published as `gtin`
- Severity: High
- Evidence: variants without barcode 207 across 86 products (81 fully, 5 partially; 82 MNX + `prosop-negru` 1/1, `prime-whey-go` 7/14, `prime-shaker-customised` 1/1, `pachet-mix-arome-...frutilu` 1/1). Barcode length distribution: 13 digits = 157, 8 digits = 28, 12 digits = 3. Check-digit validation: 27 invalid, e.g. `mnx-classic-t-shirt-golden-era-blue` `10028802`/`10028804`, `mnx-hardcore-mesh-shorts-grey` `60053002..04` (internal article numbers, not GS1), `unt-de-caju` `6427616427536`, `shaker-premium-accesorizat-500-ml` `400082644617`, `prime-whey-go` `642176606347` (12 digits, a truncated EAN-13). SKU hygiene: 164/395 variants have `sku == barcode` (the EAN is stored twice), 56 non-numeric SKUs, SKU `40111001` duplicated on 2 variants, 7 variants with no SKU (`prime-whey-go`). The schema prints `"gtin": "10028802"` (product-mnx-blue-1.jsonld), which Merchant Center flags as "Invalid value [gtin]".
- Affected scope: 86 products without GTIN, ~27 variants with invalid GTIN, 164 variants with SKU=EAN.
- Recommendation: (1) for MNX/Prime custom apparel and the customised shaker, leave Barcode empty and set `identifier_exists = false` plus `mpn` (the current 8-digit codes) in the Google channel metafields; (2) correct the 3 twelve-digit and `unt-de-caju` codes against the supplier's GS1 record; (3) buy GS1 Romania GTINs for own-brand supplements that lack them; (4) use the internal code (e.g. `PS-CRE-300`) as SKU and keep the EAN only in Barcode; (5) in Liquid, emit `gtin13` only when `v.barcode.size == 13`.
- Falsifiability: a GS1 check-digit script over `/products.json` returns 0 invalid; Merchant Center diagnostics show no "Invalid value [gtin]" / "Missing value [gtin]" warnings.
- Leading indicator: count of variants with 8/12-digit barcodes = 0.
- Effort: M. Confidence: 0.9.

### ECOMMERCE-06 - SEO title/description coverage: 105 products without SEO title, 79 with an EMPTY meta description, 12 with dosage text as meta, 47/80 SEO titles over 60 chars
- Severity: High
- Evidence: missing SEO title 105/185 (89 MNX), missing SEO description 104/185. Because `description` is empty on 78 MNX items, the fallback yields no meta at all: 79 products with no seo_description AND 0 description words (`<meta name="description">` absent in `products/mnx-classic-t-shirt-golden-era-blue.html`, parsed `meta_description: None`). 12 supplements fall back to the dosage text: `baton-proteic-capsuni`, `baton-proteic-caramel-sarat`, `testo-revive-500-ml`, `cardio-calm-500-ml`, `complete-collagen`, `magnesium-citrate-80-caps`, `nac-80-caps`, `turmeric-extract-80-caps`, `zinc-citrate-80-caps`, `scortisoara-ceylon-bio-200g`, `baton-proteic-cocos-si-caramel`, `baton-proteic-ciocolata-fructe-de-padure` (meta = "Mod de administrare După cum este necesar..."). Of the 80 SEO titles set, 47 exceed 60 chars (39 exceed 70, max 92) and 35/81 SEO descriptions exceed 160 chars (max 221). Title tag template is bare `{{ page_title }}` so 105 products show only the product name ("Turmeric extract 80 caps").
- Affected scope: 185 products (104 without any usable meta, 47 with truncated titles).
- Recommendation: bulk-fill with these templates (keep 50-60 / 140-155 chars):
  - Supplements: `{{Produs}} {{Gramaj/Caps}} - {{Beneficiu principal}} | Prime Supplements` e.g. "Turmeric Extract 80 capsule - Curcumină 95% cu Piperină | Prime Supplements"; meta: "{{Produs}} {{gramaj}}, {{doză/serviri}}. {{2 beneficii}}. Produs în UE, livrare 24-72h, gratuită peste 300 lei. Comandă online de la Prime Supplements."
  - MNX apparel: `{{Articol RO}} MNX {{Model}} {{Culoare RO}} - Îmbrăcăminte de sală | Prime Supplements` e.g. "Tricou MNX Golden Era albastru - Tricou de sală din bumbac | Prime Supplements"; meta: "Tricou de sală MNX {{Model}}, {{material}}, mărimi S/M-XXL/3XL. Livrare rapidă în România, retur 14 zile."
  - Frutilu: `Băutură instant Frutilu {{Aromă}} 10 g fără zahăr | Prime Supplements`.
  Change `layout/theme.liquid` title to `{{ page_title }}{% unless page_title contains shop.name %} | {{ shop.name }}{% endunless %}` so the brand suffix is automatic.
- Falsifiability: `products-all.json` rebuild shows `seo_title` and `seo_description` non-empty on 185/185, 0 titles > 60 chars; no product page without `<meta name="description">`.
- Leading indicator: GSC average CTR on product URLs; count of products with blank SEO fields in Admin bulk editor.
- Effort: M. Confidence: 0.95.

### ECOMMERCE-07 - Product content model is broken: the description field holds dosage/ingredients that are never displayed, the 4 metafield tabs are mostly empty, and 102 products have < 50 words
- Severity: High
- Evidence: `templates__product.json` disables the `description` block and the "Descriere" collapsible block (`"disabled": true`), and renders a `tabs` section bound to `product.metafields.custom.beneficii_cheie / despre_produs / ingrediente / detalii_produs` plus a rich-text section bound to `custom.seo_produs`. Result: "Mod de administrare" is absent from the visible text of `product.html` (present only in meta/og/JSON-LD), while tab contents measured in HTML are: baton-proteic-capsuni Beneficii 0 words / Despre 0 / Ingrediente 103 / Detalii 0; turmeric 0/0/20/0; MNX Golden Era blue 0/40/0/0; Frutilu cola 0/53/0/0; creatina-creapure 211/0/4/4 ("Greutate: 500g Serviri: 100"). Empty tabs still render as empty accordions. Catalogue: description < 50 words on 102 products (89 MNX), < 150 on 119, < 300 on 140; MNX median 0 words, supplements median 303. Only some supplements carry the long `seo_produs` text (H2s "Ce Este Creatina Creapure?", "Recomandări de Utilizare" on creapure, glycerol, pure-isolate, unt-de-migdale). No nutrition-facts table, no allergen line, no per-serving dose table on any sampled page; no FAQ except 3 creatina products.
- Affected scope: 185 products; 100 MNX with 0-60 words; ~13 supplements under 150 words.
- Recommendation: define a content model per product type and fill the metafields (CSV import): supplements = Despre produs (120-200 words, unique), Beneficii cheie (bullets), Ingrediente (list) + `custom.valori_nutritionale` table (per serving/100 g, as HTML table), Mod de administrare (move the current description text here), Alergeni, Pentru cine, FAQ (3-5 Q&A, text only); MNX = Material și croială, Ghid mărimi (table), Îngrijire, Detalii (bumbac %, gramaj, print); Frutilu = Preparare, Ingrediente, Valori nutriționale. In `snippets/product-info.liquid`/tabs section wrap each tab in `{% if block.settings.content != blank %}` so empty tabs disappear. Re-enable the native `description` block (or move dosage into a "Mod de administrare" tab) so the text that feeds the meta/JSON-LD is also visible.
- Falsifiability: `desc_words`/metafield word counts > 150 on all supplements and > 60 on all MNX; no `<details>` tab with empty body in product HTML.
- Leading indicator: median product-page visible word count (currently 741-1651 incl. boilerplate) and share of products with all 4 tabs filled.
- Effort: L. Confidence: 0.9.

### ECOMMERCE-08 - 45 products are colour/flavour duplicates published as separate products instead of variants (19 groups)
- Severity: Medium
- Evidence: catalog-analysis near-duplicate groups: "mnx extra t shirt basic" (black/grey/white), "mnx workout top hammer 3 0" (white/black/grey), "mnx ribbed shorts hammer" (black/white/grey), "mnx cotton t shirt basix" (3), "mnx shorts golden era 2 0" (3), "mnx stringer golden era 2 0" (3), Frutilu flavour sets (chocolate/cola/mango; green-apple/orange; ice-tea peach/lemon; watermelon/strawberry), "water out" (120 caps vs 500 ml, legitimately different), etc. MNX pages expose only a "Size:" option (`<legend class="text-subdued">Size:` in mnx-classic-t-shirt-golden-era-blue.html), so colour is not a variant dimension; 58 variants are "Default Title". Frutilu pages are single-variant with 2,50 lei and 96-122-char titles that differ only by flavour.
- Affected scope: 45 products / 19 groups (about 26 MNX, 14 Frutilu, 5 other).
- Recommendation: for MNX, merge each colour family into one product with options Colour x Size (keeps URLs via Shopify's automatic 301 when a product is deleted only if you create a URL redirect: add redirects from each old handle to the parent `?variant=` URL) and add a `ProductGroup` with `hasVariant` in the schema (the validator also flags `no-product-group`); for Frutilu keep separate products if each flavour has its own EAN and search demand ("frutilu cola"), but shorten titles to "Frutilu Cola 10 g - băutură instant fără zahăr" and add a flavour switcher (linked products via metafield `custom.arome_asociate`) on each page. Keep the baton flavours separate (distinct EANs, distinct queries).
- Falsifiability: number of near-duplicate title groups in the rebuilt dataset drops below 8; redirects exist for every merged handle (`/products/mnx-extra-t-shirt-basic-grey` -> 301).
- Leading indicator: GSC impressions per MNX family consolidate on one URL; "Duplicate, Google chose different canonical" count in GSC.
- Effort: L. Confidence: 0.8.

### ECOMMERCE-09 - Titles and H1s: 17 titles over 60 chars (max 122), 96 English titles on a Romanian store, 19 titles without diacritics, H1 differs from SEO title on key products
- Severity: Medium
- Evidence: titles > 60 chars: 17, all supplements, 14 of them Frutilu ("Bautura Instant cu Gust de Ceai cu Piersici Frutilu Ice Tea Peach, 10g (pentru 1.5L) – Fara Zahar, cu Stevia si Vitamina C" = 122 chars; `nitrox-no-stim` 62). English titles 96 (93 MNX: "MNX Extra T-shirt basic, black", "MNX Sleeveless basketball jersey, cool gray"). 19 supplement titles use ASCII "Bautura/Fara/Pudra". H1 = product title (product-info.liquid `when 'title'` -> `<h1>{{ product.title }}</h1>`), so `/products/creatina-creapure` has H1 "Creatine (Creapure®)" vs SEO title "Creatina Creapure - Supliment pentru Performanță Fizică"; `/products/creatina-monohidrat-micronized-300g-fara-aroma` has two H1s ("CREATINE MONOHYDRATE 300g/60serv" + a second H1 inside the seo_produs rich text). 16 supplements lack the size in the title (`Baton proteic căpșuni`, `Unt de Migdale`, `Creatine Ready To Go`) although the variant titles carry it ("Cutie 12 buc x 55g" / "Baton 55g").
- Affected scope: 185 titles/H1s; 17 over-length, 96 English, 19 without diacritics, 2 H1s on at least 1 page.
- Recommendation: product title pattern `[Produs RO] [Brand/Linie] [Gramaj/Caps/Serviri]` (title = what shows on cards, cart and feed; the SEO title can add the benefit). Examples: "Creatină Creapure 300 g / 500 g", "Tricou MNX Extra Basic negru", "Frutilu Cola 10 g". Keep the long marketing phrase for the SEO title/meta. In the seo_produs rich text, demote the first heading to H2.
- Falsifiability: no title > 60 chars in `/products.json`; `parse_html.py` shows exactly 1 H1 on every product page.
- Leading indicator: share of titles containing diacritics and Romanian nouns.
- Effort: M. Confidence: 0.85.

### ECOMMERCE-10 - 30 products are out of stock on every variant (22 MNX, 8 supplements) yet remain indexable, in the sitemap and linked from the blog, with no back-in-stock capture
- Severity: Medium
- Evidence: `available_any=false` on 30 products: supplements `vitamina-d3-k2`, `zinc-citrate-80-caps`, `sapca-prime`, `baton-proteic-ciocolata-fructe-de-padure`, `water-out-500-ml`, `shaker-premium-accesorizat-500-ml`, `instant-oat-cream-800g-25-serv`, `enzima-nattokinaza-80-caps` and 22 MNX (e.g. `mnx-workout-top-hammer-3-0-white/black/grey`, `mnx-ribbed-shorts-hammer-black/white/grey`). Live `/products/mnx-workout-top-hammer-3-0-white`: 200, self-canonical, "Stoc epuizat" x3, schema OutOfStock, no "Anunță-mă"/notify form. 96/395 variants are unavailable; 57 available products hold <= 5 units in total. `instant-oat-cream-800g-25-serv` is linked from 23 blog articles while out of stock. All 30 remain in `cele-mai-vandute` and `lansate-recent` (automated collections with no availability rule); whether they sort after in-stock items could not be verified from the export.
- Affected scope: 30 product URLs (60 with /ro-hu), 96 variants.
- Recommendation: decide per product: (a) returning stock -> keep indexable, add a back-in-stock block (Shopify Inbox/Klaviyo "Anunță-mă"), move "Stoc epuizat" items to the end of collections (Admin > collection sort "Best selling" already pushes OOS down, or enable "Hide out of stock" in Search & Discovery filters only), add "Produse similare disponibile" above the fold; (b) discontinued colours (MNX Hammer 3.0 whites, Ribbed Shorts Hammer v1) -> unpublish and 301 (`/products/mnx-ribbed-shorts-hammer-black` -> `/products/mnx-ribbed-shorts-hammer-3-0-black`); (c) `instant-oat-cream-800g-25-serv` restock or replace the 23 blog links.
- Falsifiability: `available_any=false` count < 10 in a rebuilt dataset; every remaining OOS page shows a notify form; 0 blog links to OOS products.
- Leading indicator: Admin inventory "0 available" product count; GSC clicks landing on OOS URLs.
- Effort: S. Confidence: 0.9.

### ECOMMERCE-11 - Compare-at "discounts" on 144/185 products (120 with every variant permanently struck through) and an empty "Reduceri" collection: Omnibus-directive and Merchant Center sale-price risk
- Severity: Medium
- Evidence: products with any compareAtPrice 144 (77 MNX, 67 supplements); 120 products have ALL variants with compareAt > price (permanent sale); 269 discounted variants: discount median 10%, p75 20%, max 74% (distribution: 10-19% 169 variants, 20-29% 34, 50-59% 16, 30-39% 12, 40-49% 11, 60-69% 6, 70%+ 1); 65 variants have compareAt == price (renders no strike-through but pollutes feeds). Example: `baton-proteic-capsuni` cutie 100,00 lei vs 155,00 lei (-35%). Meanwhile `/collections/reduceri` (in the sitemap, nav-less, 200, title "Reduceri") contains 0 products. A disabled "SUPER Black Friday ... -50%" Liquid block still sits in `templates__product.json`.
- Affected scope: 144 products / 269 variants; 1 empty indexable collection.
- Recommendation: Romanian OUG 58/2022 (EU Omnibus) requires the reference price to be the lowest price of the previous 30 days; a year-round compare-at is not a "prior price". Either remove compare-at from the 120 permanent-sale products (keep it for time-boxed promotions and store the 30-day-low in a metafield shown next to the price), or document the prior price. Clean the 65 compareAt==price values. Make `reduceri` an automated collection with condition "Compare at price is greater than 0" plus "Price is less than compare at" (Shopify condition: `compare_at_price > price` via "Compare-at price is not empty"), add SEO title/description, or delete the collection and 301 it to `/collections/all`. In Merchant Center use `sale_price` + `sale_price_effective_date` only for real promotions.
- Falsifiability: `/collections/reduceri` lists products or redirects; count of products with permanent compare-at drops to those in an active promotion; no variant with compareAt == price.
- Leading indicator: Merchant Center "Misrepresentation"/"Sale price" warnings = 0; ANPC complaints = 0.
- Effort: S. Confidence: 0.8.

### ECOMMERCE-12 - Collection architecture: 23 flat collections, 5 utility collections indexable, two overlapping apparel categories (99 vs 87, 86 shared), no goal/brand/garment-type sub-categories, all descriptions empty
- Severity: High
- Evidence: sitemap lists 23 collections including `all` (185 products, title "All Products"), `cele-mai-vandute` (185, every product), `lansate-recent` (185, every product), `frontpage` (1), `reduceri` (0), `11-tva` (15 products: crema de orez, unt, isolate, emperor mass, scortisoara; an internal VAT grouping named "11% TVA"). Apparel: `echipament-sala` 99 (nav label "Îmbrăcăminte") vs `haine-mnx` 87 with 86 in both; the 13 es-only items are Prime-branded garments; `accesorii-sala` 6. Supplements: `suplimente-sala` 52 is a generic bucket (12 of the 13 `prime-health` products are also in it); `prime-health` 13 vs `vitamine-si-minerale` 13 (0 overlap, same "health capsules" intent); `creatina` 3, `pudra-proteica` 5, `batoane-proteice` 4, `aminoacizi` 4, `shot-pre-workout` 2, `alimente-sanatoase` 2. No collection by goal (masă musculară, slăbire, energie/focus, recuperare, sănătate), by brand (MNX, Frutilu, Creapure) or by garment type (tricouri, maiouri/stringere, hanorace, pantaloni, pantaloni scurți, jersey) although the MNX range has 100 items. All descriptions empty; collection banner "Cel mai vândut" references `baton-proteic-ciocolata-portocale`, which is not an active product (0 occurrences in collection.html); the collection template's SEO rich-text section bound to `collection.metafields.custom.seo_text` is `"disabled": true`; 8 collections have no SEO title/description. The mega-menu links 17 collections flat (plus Despre noi/Contact).
- Affected scope: 23 collection URLs (46 with /ro-hu); 100 apparel and 85 supplement products.
- Recommendation (proposal):
  1. Hubs: `/collections/suplimente` (rename suplimente-sala, add 300-word intro), `/collections/imbracaminte` (rename echipament-sala; keep haine-mnx as the MNX brand hub or 301 it into `/collections/mnx`), `/collections/alimente` (crema de orez, unt, batoane, bauturi).
  2. Sub-categories (automated by Type/Tag): Proteine, Creatină, Aminoacizi, Pre-workout, Intra-workout, Arzătoare de grăsimi, Vitamine și minerale, Sănătate (merge prime-health into it), Băuturi instant; apparel: Tricouri, Maiouri & stringere, Hanorace, Pantaloni, Pantaloni scurți, Accesorii; brand: MNX, Frutilu.
  3. Goal pages (manual, with 300-500 words + FAQ): Masă musculară, Slăbire și definire, Energie și focus, Recuperare, Sănătate și imunitate; women/men apparel if the range supports it.
  4. Utility collections: `noindex` `cele-mai-vandute`, `lansate-recent`, `frontpage` (Liquid: `{% if collection.handle == 'cele-mai-vandute' or ... %}<meta name="robots" content="noindex">`); rename/delete `11-tva` (or noindex); fix or delete `reduceri`; keep `all` indexable only with a real description, otherwise canonical it to `/collections/suplimente`.
  5. Enable the seo_text rich-text section and write 150-300 words per collection; set SEO titles with the pattern "{{Categorie}} - {{beneficiu}} | Prime Supplements"; fix the banner featured product.
- Falsifiability: sitemap_collections lists only categories with >= 2 products and a description; `/collections/cele-mai-vandute` is noindex; GSC shows impressions on the new goal/brand pages.
- Leading indicator: number of indexable collections with a non-empty description (target 100%).
- Effort: L. Confidence: 0.9.

### ECOMMERCE-13 - Faceted navigation is thin (price, availability, 2 custom metafields) and crawlable; vendor/type query pages are indexable
- Severity: Low
- Evidence: `collection-all.html` facet form (`method="GET" action="/collections/all"`) exposes `filter.v.price.gte/lte`, `filter.v.availability`, `filter.p.m.custom.aroma` (6), `filter.p.m.custom.cantitate` (6); `collection.html` (pudra-proteica) has only cantitate + price + availability; no brand, type, goal, size or colour facets (MNX sizes are variant options but no `filter.v.option.size` facet is enabled). Live: filtered and sorted URLs are 200 with canonical to the clean URL (good). `/collections/vendors?q=primesupplements1` is 200, self-canonical, indexable (64 produse). robots.txt is Shopify default (does not block `?filter.` or `sort_by`).
- Affected scope: 23 collections; 1 vendor page indexable.
- Recommendation: after ECOMMERCE-03/04, enable Type, Brand, Size (`filter.v.option.size`), Goal (tag or metafield) facets in Search & Discovery; keep Shopify's canonical behaviour; add to `robots.txt.liquid`: `Disallow: /collections/vendors`, `Disallow: /collections/types`, `Disallow: /*?*filter.`, `Disallow: /*sort_by=` (Shopify-supported pattern) to save crawl budget on the 370+ product URLs.
- Falsifiability: facet form on /collections/all lists Tip produs / Brand / Mărime; `curl -I "/collections/vendors?q=x"` is blocked in robots.txt and returns noindex.
- Leading indicator: GSC crawl stats share of `?filter.` URLs.
- Effort: S. Confidence: 0.8.

### ECOMMERCE-14 - No visible breadcrumb on product or collection pages; BreadcrumbList JSON-LD points every product to "All Products"
- Severity: Medium
- Evidence: `grep -i breadcrumb product.html` finds nothing outside JSON-LD; `$R/jsonld/product-baton-2.jsonld` = Pagina principala > "All Products" (`/collections/all`) > Baton proteic căpșuni because `schema-breadcrumb-enhanced.liquid` uses `product.collections.first` and `all` is the first collection for every product (185/185 in `all`). Collection pages (collection.html, collection-all.html) have no breadcrumb either. `sections__main-product.liquid` renders only `schema-breadcrumb-enhanced`, no visual nav.
- Affected scope: 185 product pages + 23 collections.
- Recommendation: add `snippets/breadcrumbs.liquid` rendered at the top of `main-product` and `main-collection`:
```liquid
{%- liquid
  assign skip = 'all,cele-mai-vandute,lansate-recent,frontpage,11-tva,reduceri' | split: ','
  assign crumb = nil
  for c in product.collections
    unless skip contains c.handle
      assign crumb = c
      break
    endunless
  endfor
-%}
<nav class="breadcrumbs text-sm" aria-label="Breadcrumb">
  <a href="{{ routes.root_url }}">Acasă</a>
  {%- if crumb %} › <a href="{{ crumb.url }}">{{ crumb.title }}</a>{% endif %} › <span aria-current="page">{{ product.title }}</span>
</nav>
```
  and build the BreadcrumbList from the same `crumb` (prefer a `custom.categorie_principala` metafield when set, so Creatină beats Suplimente). Use Romanian "Acasă" instead of "Pagina principala".
- Falsifiability: Rich Results Test shows BreadcrumbList Home > Creatină > Creatina Creapure; visible breadcrumb present in raw HTML.
- Leading indicator: GSC breadcrumb rich-result valid items = 185.
- Effort: S. Confidence: 0.95.

### ECOMMERCE-15 - Cross-sell is client-side only: product pages expose just 6-7 product links in raw HTML; complementary block has no data; section titles carry typos and English
- Severity: Medium
- Evidence: distinct `/products/` hrefs in raw HTML: 6 (baton, creapure), 7 (MNX, turmeric, Frutilu) - these come from the server-rendered "Cele mai vândute" carousel; `<product-recommendations ... intent="complementary" limit="3">` and `intent="related" limit="4">` are filled by JS after load; the complementary title "Merge perfect cu" never appears in HTML (0 occurrences on 5 pages) so no complementary products are configured in Search & Discovery. Headings: "S-ar putea să-ți placã" (ã instead of ă), "Customer Reviews" (English Judge.me heading), "Arzătoare de grãsimi" in the collection list; "Categorii populare" shows the same 3 collections (vitamine-si-minerale, arzator-de-grasimi, suplimente-sala) on every product and every collection page.
- Affected scope: 185 product pages; 23 collection pages.
- Recommendation: add a server-rendered "Din aceeași categorie" grid (`{% for p in crumb.products limit: 8 %}` using the breadcrumb collection, excluding the current product) so crawlers and the UCP/LLM readers get real links; configure complementary products per product line in Search & Discovery (creatină + shaker, whey + crema de orez, pre-workout + glicerol); fix the typos in the section settings; translate the Judge.me widget title ("Recenzii clienți") in the Judge.me app settings; make "Categorii populare" contextual (apparel on MNX pages).
- Falsifiability: raw HTML of a product page contains >= 14 distinct `/products/` links; "Merge perfect cu" renders with 3 products.
- Leading indicator: internal links per product URL in a Screaming Frog crawl (target >= 15).
- Effort: S. Confidence: 0.85.

### ECOMMERCE-16 - Reviews exist (431 store-wide) but are invisible to search: no aggregateRating/review markup, rating block disabled, English widget text
- Severity: Medium
- Evidence: homepage `jdgm-all-reviews-rating` "4.87 stars", "431 reviews"; product badges: baton-proteic-capsuni 4 reviews / 4.00, creatina-creapure 17 / 5.00, turmeric-extract-80-caps 44 / 4.75, MNX Golden Era blue 0, Frutilu cola 0. The theme's `rating` block is `"disabled": true` in `templates__product.json`, the Judge.me preview badge app block is used instead; `"aggregateRating"` absent from all sampled HTML (Judge.me's rich-snippet JSON-LD option off, and the custom Product snippet does not read `product.metafields.reviews.rating`). Review widget configured with `"review_data": "sample_data"` and `"empty_state": "empty_widget"` (shows the empty widget on 0-review products such as all MNX/Frutilu).
- Affected scope: 185 products; the ~30 with reviews lose star snippets today; ~119 (100 MNX + 19 Frutilu) show an empty review widget.
- Recommendation: add `aggregateRating` from `product.metafields.reviews.rating.value.rating` / `reviews.rating_count` (Judge.me syncs these) into the Product block (see ECOMMERCE-01) and ensure Judge.me's own JSON-LD stays off to avoid two Product entities; translate the widget; set `empty_state` to "hide" for 0-review products or prompt "Fii primul care lasă o recenzie"; run post-purchase review requests for MNX and Frutilu (0 reviews).
- Falsifiability: Rich Results Test shows review snippet on `/products/turmeric-extract-80-caps` (44 reviews, 4.75).
- Leading indicator: GSC "Review snippets" valid items; share of products with >= 1 review (currently unknown beyond the sample).
- Effort: S. Confidence: 0.85.

### ECOMMERCE-17 - Product images: 0/493 images have alt text and 57 products have a single image (53 supplements)
- Severity: Medium
- Evidence: `images_without_alt` = 493/493, all 185 products; `image_count == 1` on 57 products (53 supplements, e.g. `citrus-bergamot`, `ashwagandha-ksm-66`, `vitamina-d3-k2`, `omega-3`, all 80-caps items); product page HTML shows 24-39 `<img>` with 6 empty alt each (the theme uses `image.alt`). Sizes are fine (min 1024 px, 81 at 1500x1875, 43 at 4000x4000, AVIF). Filenames are descriptive (`GOLDEN-ERA-TSHIRT-Blue-4.avif`).
- Affected scope: 185 products / 493 images; 57 single-image products.
- Recommendation: bulk alt via CSV (`Image Alt Text` column) with the pattern "{{Titlu produs}} - {{tip imagine: față/etichetă/valori nutriționale/spate}} - Prime Supplements"; add at least a label/nutrition-facts image and a lifestyle image to the 53 single-image supplements (Shopping listings with 3+ images get the "multiple images" treatment and the label photo doubles as the nutrition content source).
- Falsifiability: `images_without_alt` = 0; products with `image_count >= 3` >= 150.
- Leading indicator: Merchant Center "additional_image_link" coverage; Google Images impressions in GSC.
- Effort: M. Confidence: 0.95.

### ECOMMERCE-18 - Google Merchant Center readiness: the policy facts exist on pages but not in product data; 8 feed-blocking attributes are missing or wrong
- Severity: High
- Evidence: policy pages: `politica-de-livrare` (163 words: free shipping > 300 RON, 20 RON, Cargus, 24-72 h / 1-3 working days), `politica-de-retur` (1122 words: 14-day withdrawal, return cost borne by customer), `politica-de-plata` (Netopia Visa/Mastercard, transfer, ramburs, prices in RON incl. VAT). Not present as `shippingDetails`/`hasMerchantReturnPolicy` in any Product block (validator Medium x2). Feed-level gaps from the dataset: `product_type` empty 185; `brand` wrong on 64 + 119; `gtin` missing on 207 variants / invalid on 27; `description` empty on 78 MNX (GMC requires a description); titles in English on 96; 30 products OutOfStock; price mismatch on the /ro-hu alternates (ECOMMERCE-02); no `google_product_category` (field not in export, likely empty). Product names such as "Testo Revive", "Fat Burning Booster Shot", "Water Out", "Thermo Core" need claims-safe descriptions under Google's healthcare/supplements policy (unverified against the live account).
- Affected scope: all 185 products for the Shopping feed; 8 attribute families.
- Recommendation: in this order: (1) fix the Product schema (ECOMMERCE-01) and add the shipping/return blocks with the values above; also configure shipping and returns in Merchant Center (or Search Console's shipping/returns settings) so page-level schema is not mandatory; (2) fill Type/Category/Vendor/GTIN/alt/descriptions (03-07, 17); (3) in the Google & YouTube channel map `description` to the "Despre produs" metafield for MNX, set `identifier_exists=false` for custom apparel, exclude the 30 OOS products only if discontinued; (4) rewrite the 4 "stimulant/weight-loss" product descriptions without disease/treatment claims; (5) use primary-domain URLs only (never /ro-hu/).
- Falsifiability: Merchant Center diagnostics: 0 disapproved items, 0 "Missing value [description]", 0 "Invalid value [gtin]", shipping and returns shown in Shopping listings.
- Leading indicator: Merchant Center "Active items" = 185 within 2 weeks of feed submission.
- Effort: M. Confidence: 0.85.

### ECOMMERCE-19 - Blog-to-product linking is misrouted: 2582 links to primesupplements1.myshopify.com, 534 add-to-cart links, 130/185 products never linked, 16 links to dead products
- Severity: High
- Evidence: `articles-all.json`: product_links 3201 across 355 articles (median 10 per article, max 15, 6 articles with 0); `myshopify_links` 2582 in 349 articles (every product link is emitted twice: primary domain + myshopify domain, the latter 301s and leaks link equity through a redirect), `cart_links` 534 in 349 articles (`/cart/add` style links that create nothing indexable). Distinct products linked: 55 of 185; never linked: 130 (99 of 100 MNX; 31 supplements incl. all 19 Frutilu drinks, 3 `crema-de-orez-*`, `complete-collagen`, `magnesium-citrate-80-caps`, `turmeric-extract-80-caps`, `centura-hardcore`). Dead targets: `15-reducere-pachet-thermo-core-water-out-1-14-august` (12 links, an expired August bundle) and `liver-protect-500-ml` (4 links). Top targets: creatina-monohidrat-micronized 25 articles, creatina-creapure 23, fiber-blood-orange 23, creatine-ready-to-go 23, instant-oat-cream (out of stock) 23. Collection links: 446 total, 0 distinct handles recoverable from the text bodies.
- Affected scope: 349 articles; 130 products with zero editorial links; 16 dead links.
- Recommendation: one-off bulk edit of article bodies (Matrixify export/import or Admin API): replace `https://primesupplements1.myshopify.com/` with `https://primesupplements.ro/`, de-duplicate identical hrefs in the same paragraph, drop `/cart/add` links, redirect or replace the 2 dead targets; then build a link map so every supplement is linked from >= 3 topically related articles (the blog already covers creatină, whey, glutamină, L-carnitină, citicolină) and every MNX family from the training/lifestyle posts; add 2-3 collection links per article (category + goal page).
- Falsifiability: `myshopify_links` = 0 and `cart_links` = 0 in a rebuilt `articles-all.json`; distinct linked products >= 150; 0 links to inactive handles.
- Leading indicator: Screaming Frog inlinks count per product URL from `/blogs/` (target >= 3 for supplements).
- Effort: M. Confidence: 0.95.

### ECOMMERCE-20 - Tags and handles are inconsistent (97 tags with case/plural duplicates, underscore handle, mixed handle patterns)
- Severity: Low
- Evidence: 97 distinct tags; case duplicate `Pre-Workout`/`pre-workout`; the same 4 bars carry `Batoane Proteice`, `baton`, `baton proteic`; `Îmbrăcăminte` 99 vs `Haine MNX` 5; brand-ish tags (`combat`, `combat pro`, `whey`, `unt`). Handles: `emperor-mass_3000g` (underscore), `frutilu-instant-drink-strawberry-10-g` vs `instant-drink-frutilu-mango-10g` vs `instant-drink-frutilu-lemon` (three patterns in one range), `creatine-ready-to-go-plicuri-prime-supplements`, 346 tags not used by any facet.
- Affected scope: 185 products; 97 tags.
- Recommendation: reduce tags to a controlled vocabulary used by automated collections and facets (goal: `obiectiv:masa`, `obiectiv:slabire`; form: `forma:capsule`; brand: `brand:mnx`); do not rename handles now (each rename needs a 301; only fix `emperor-mass_3000g` and the Frutilu set when titles are rewritten, with "Create URL redirect" ticked).
- Falsifiability: tag count <= 40 with no case duplicates.
- Leading indicator: automated collections driven by tags populate correctly.
- Effort: S. Confidence: 0.8.

### ECOMMERCE-21 - Variant naming is inconsistent and leaks into cart, feeds and UCP (`Cutie 12 buc x 55g` / `Baton 55g` / `55g`; product name repeated inside variant titles; dual sizes)
- Severity: Low
- Evidence: top variant titles: `L/XL` 64, `Default Title` 58, `S/M` 55, `XXL/3XL` 29, `M` 22, `XL` 22, `L` 20, `S` 16; same product line uses `Cutie 12 buc x 55g` + `Baton 55g` (căpșuni, cocos) but `Cutie 12 buc x 55g` + `55g` (caramel sărat); `creatina-creapure` variants are `Creatine (Creapure®) 500g/100serv` / `... 300g/60serv` (product name repeated); 2 option sets for MNX (`S/M`, `L/XL`, `XXL/3XL` on some, `S`..`2XL` on others) so a Size facet would show 9 values.
- Affected scope: 395 variants.
- Recommendation: option name "Cantitate" with values "Baton 55 g" / "Cutie 12 x 55 g"; "Gramaj" with "300 g (60 serviri)"; a single size scale per garment type; `variant_title` feeds Shopping's `size` attribute.
- Falsifiability: all variant titles follow the pattern in `/products.json`.
- Leading indicator: Merchant Center `size` attribute coverage on apparel.
- Effort: S. Confidence: 0.8.

### ECOMMERCE-22 - Collection page template defects: fixed "Alte categorii", banner featured product missing, blog block on every collection, 24 products per page with 185-product collections
- Severity: Low
- Evidence: `templates__collection.json`: banner `featured_product: baton-proteic-ciocolata-portocale` (not an active handle, "Cel mai vândut" renders nothing: 0 matches in collection.html), `collection_list` block fixed to vitamine-si-minerale / arzator-de-grasimi / suplimente-sala with heading "Arzătoare de grãsimi", `rich_text` SEO section disabled, `products_per_page: 24` (all/cele-mai-vandute/lansate-recent paginate 8 pages deep), a promotion image block for "Nitrox NO-STIM" injected at position 4 of every collection grid, blog block "Ghiduri și sfaturi utile" showing the 3 latest posts regardless of category. H1 of pudra-proteica is "Pudre Proteice" while the title is "Pudra proteica pentru masa musculară"; `/collections/creatina` H1 "Creatina".
- Affected scope: 23 collections.
- Recommendation: per-collection template suffixes already exist (`pime-health`, `aminoaicizi`, `accesori` - fix the typos) - use them to vary "Alte categorii" (siblings), make the blog block pull a tagged blog (needs article tags), raise products_per_page to 48 for apparel, remove the stale featured product or point to an in-stock bestseller, enable the SEO text section, align H1 with the SEO title keyword ("Creatină monohidrat și Creapure").
- Falsifiability: collection HTML shows a non-empty "Cel mai vândut" card and a category-specific "Alte categorii".
- Leading indicator: none beyond manual check.
- Effort: S. Confidence: 0.85.

### ECOMMERCE-23 - UCP profile is live and well-formed; agent commerce quality is capped by the product data above
- Severity: Info
- Evidence: `$R/ucp.json`: `version 2026-08-25`, `supported_versions` 2026-04-08 and 2026-01-23, service `dev.ucp.shopping` over `mcp` at `https://primesupplements1.myshopify.com/api/ucp/mcp` (plus `embedded`), capabilities checkout, fulfillment (shipping only), discount, cart, order, catalog.search, catalog.lookup, `dev.shopify.catalog`, identity_linking (Shop accounts), permalink endpoint `https://primesupplements.ro/buy`; payment handlers Google Pay (merchant id 16708973830884969730), Shopify card, Shop Pay. `catalog.search` relies on title/type/vendor/description, which are empty or English on most products (ECOMMERCE-03/04/06/07).
- Affected scope: store-level.
- Recommendation: no protocol change needed; Merchant Center + clean product data unlock AI Mode / agent purchases; when the /ro-hu market is removed, re-check that `supported_versions` URLs resolve.
- Falsifiability: `ucp_check.py https://primesupplements.ro --probe-endpoints` (run outside this sandbox) reports all endpoints reachable.
- Leading indicator: orders with source "agent"/UCP in Shopify.
- Effort: S. Confidence: 0.9.

### ECOMMERCE-24 - Marketplace and competitor landscape could not be measured (no Merchant/SERP data); context only
- Severity: Info
- Evidence: no DataForSEO/Merchant API; WebSearch unavailable to this agent. The context file lists Romanian competitors (gymbeam.ro, proteinshop.ro, bodyline.ro, supliments.ro, xtremelabs.ro, gnc.ro, redis.ro, emag.ro). Prime Supplements' own catalogue prices (RON): supplements 2,50-480,00, MNX 20,00-319,00; the brand runs a separate B2B store (b2b.primesupplements.ro) that is itself indexable: its sitemap lists 57 product URLs with the same handles as the retail store, and `$R/pages/b2b-product.html` renders an empty `<title>` with wholesale prices visible (105,00 lei / 155,00 lei), so wholesale pages can compete with and leak pricing from the retail product pages.
- Affected scope: strategy only.
- Recommendation: before investing in Shopping ads, verify in Merchant Center "Competitive visibility" and Google's price-competitiveness report for creatină/whey; consider an emag.ro Marketplace seller account for the own-brand supplements (emag dominates "creatina monohidrat" transactional SERPs in Romania) with the primary domain in the seller profile; keep marketplace titles identical to the site titles once ECOMMERCE-09 is done; make b2b.primesupplements.ro noindex to avoid the wholesale catalogue competing with the retail pages.
- Falsifiability: n/a (needs live SERP/Shopping data).
- Leading indicator: brand-name SERP (`prime supplements creatina`) shows the primesupplements.ro product above marketplaces.
- Effort: S. Confidence: 0.5.

## Product-data remediation plan (Shopify Admin, in order)

| Step | Field | Scope | Rule / template | Effort |
|---|---|---|---|---|
| 1 | Vendor | 64 wrong + 119 misbranded | Prime Supplements / MNX / Frutilu | S |
| 2 | Product type + standard category | 185 | taxonomy in ECOMMERCE-03 | M |
| 3 | Barcode / SKU | 86 products, 27 invalid | GS1-valid EAN or empty + `identifier_exists=false`; SKU internal code | M |
| 4 | SEO title / description | 105 / 104 | templates in ECOMMERCE-06, 50-60 / 140-155 chars | M |
| 5 | Image alt | 493 images | "{{Titlu}} - {{tip imagine}} - Prime Supplements" | M |
| 6 | Metafields custom.* (4 tabs + seo_produs + valori_nutritionale) | 185 (priority: 85 supplements, then 100 MNX) | content model in ECOMMERCE-07 | L |
| 7 | Titles | 17 long, 96 English, 19 ASCII | "[Produs RO] [Linie] [Gramaj]" | M |
| 8 | Compare-at | 120 permanent + 65 equal | remove or document 30-day-low | S |
| 9 | OOS products | 30 | restock / notify block / 301 | S |
| 10 | Tags | 97 -> ~40 | controlled vocabulary | S |

## Page-template improvements (Impact theme, unpublished duplicate theme first)

1. Replace `schema-product-enhanced.liquid` (ECOMMERCE-01) with `json`-filtered output, per-variant Offer, shippingDetails, hasMerchantReturnPolicy, aggregateRating from `reviews.*` metafields; or re-enable `microdata-schema`.
2. Add `breadcrumbs.liquid` + category-aware BreadcrumbList (ECOMMERCE-14).
3. Hide empty metafield tabs; re-enable description/"Mod de administrare"; add nutrition table block (ECOMMERCE-07).
4. Server-rendered "Din aceeași categorie" grid; fix "S-ar putea să-ți placã", "Arzătoare de grãsimi", translate "Customer Reviews" (ECOMMERCE-15/16).
5. Collection template: enable `seo_text` section, contextual "Alte categorii", fix banner featured product, 48 per page for apparel (ECOMMERCE-22).
6. `theme.liquid`: brand suffix in title; noindex for utility collections and for the Ungaria market until it is removed (ECOMMERCE-02/12).
7. `robots.txt.liquid`: disallow `/collections/vendors`, `/collections/types`, `*?*filter.`, `*sort_by=` (ECOMMERCE-13).

## Limitations

- No Merchant Center, Shopping, GSC or marketplace data; Shopping readiness is inferred from the dataset and Google's documented requirements.
- Judge.me review counts are known only for the 5 sampled products and the homepage badge (431 total); the per-product distribution across 185 products is unknown.
- The product export lacks `options`, `category` (standard taxonomy), variant weights and Google channel metafields; statements about option names come from the HTML of sampled pages.
- Live checks limited to 5 requests (bot protection); all other evidence is from local copies dated 2026-10-12.
- Collection sort order and Search & Discovery settings (complementary products, hide OOS) were not readable from the export.
