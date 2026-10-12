## 8. E-commerce și date de produs

**Scor specialist (la momentul auditului):** 30/100 — un singur specialist (seo-ecommerce; ponderi: completitudine schema 25 % → 10, titlu & meta 15 % → 35, optimizare imagini 20 % → 30, calitate conținut 20 % → 35, linking intern 10 % → 30, tehnic 10 % → 55): magazinul nu putea obține nici rich results de produs, nici un feed Merchant Center curat (JSON-LD invalid pe descrierile multi-linie, AggregateOffer cu „145,00”, `productType` gol pe 185/185, vendor greșit pe 64, GTIN-uri invalide publicate ca `gtin`, 79 produse fără meta descriere, duplicatele `/ro-hu/` cu prețuri fără TVA), deși fundația (Shopify, recenzii Judge.me randate server-side, pagini de politici cu valori concrete, canonical corect pe fațete, profil UCP live) este bună. **Scor combinat: 30/100** (un singur specialist alimentează secțiunea).

**Scor estimat după remedierile din 12.10.2026:** 46/100 pe magazinul live — s-au închis constatările „de date” (SEO title/description în română pe 195 produse, vendor „Prime Supplements”/„MNX”, `productType` + categorie din Shopify Standard Product Taxonomy pe 195, alt descriptiv pe 493/493 imagini, descrieri de 3 paragrafe pe 17 colecții-categorie + SEO title/description pe 23 colecții); Product JSON-LD valid cu `Offer` per variantă, `shippingDetails`, `hasMerchantReturnPolicy`, `aggregateRating` din Judge.me, breadcrumb pe categorie și `noindex` pe colecțiile utilitare/vendors/types stau în tema de test nepublicată „Impact – SEO fixes 2026-10-12” (id 193875083639) → ~64/100 după publicare; GTIN-urile, modelul de conținut al produselor, restructurarea colecțiilor, eliminarea pieței `/ro-hu/`, importul corpurilor de articol curățate și configurarea Merchant Center rămân la proprietar → ~72/100.

### Ce funcționează

- URL-urile de colecție filtrate și sortate canonicalizează la URL-ul curat (live: `?filter.v.availability=1` și `?sort_by=price-ascending` poartă ambele `<link rel="canonical" href="https://primesupplements.ro/collections/all">`); paginarea folosește `?page=N` cu `rel="next"`.
- Paginile de produs epuizat emit `"availability": "https://schema.org/OutOfStock"` și afișează „Stoc epuizat” (live4); paginile în stoc „În stoc” / „Doar 2 unități rămase” (prag de stoc redus 5, configurat în `templates__product.json`).
- Recenziile Judge.me sunt randate server-side în HTML-ul produsului (`jdgm-rev__body` ×4 pe baton-proteic-capsuni, ×5 pe creatina-creapure); badge la nivel de magazin pe homepage: 431 recenzii, medie 4.87.
- Fiecare supliment se află în cel puțin o colecție-categorie reală (0 produse doar în colecții automate); 69/85 titluri de suplimente conțin gramajul (300g, 80 caps, 500 ml).
- Imaginile principale sunt suficient de mari pentru Shopping (niciuna sub 1024 px; 81 produse la 1500×1875, 43 la 4000×4000); fișiere AVIF, nume de fișier descriptive (`GOLDEN-ERA-TSHIRT-Blue-4.avif`).
- Paginile de politici de livrare, retur și plată există cu valori concrete (livrare gratuită peste 300 RON, altfel 20 RON, Cargus, 1-3 zile lucrătoare; retragere 14 zile; Netopia card, transfer, ramburs).
- Profilul UCP `/.well-known/ucp` este valid și actual (versiunea 2026-08-25; checkout, cart, order, fulfillment, discount, catalog.search/lookup; endpoint MCP; permalink `https://primesupplements.ro/buy`; handlere Google Pay, Shop Pay).
- Sloturile de produse related/complementary, caruselul „Cele mai vândute” și „Categorii populare” există pe fiecare pagină de produs; 19 colecții-categorie sunt linkate din mega-meniu pe fiecare pagină.

### Constatări

#### ECOMMERCE-01 — Product JSON-LD este neeligibil pentru merchant listings pe fiecare produs (JSON invalid pe descrierile multi-linie, AggregateOffer cu prețuri cu virgulă, fără price/livrare/retur/rating)

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Critical | READY (tema de test – de publicat) | M | 0.95 |

**Dovezi:** `$R/jsonld/product-baton-1.jsonld` pică la `json.load` cu `Invalid control character at: line 7 column 38`, pentru că `snippets__schema-product-enhanced.liquid` scrie `"description": "{{ product.description | strip_html | truncate: 500 | escape }}"` (`escape` nu codifică newline-urile; descrierea batonului începe cu „Mod de administrare\nDupă cum…”). Eșantion: 7/13 blocuri Product invalide, toate suplimente cu descrieri multi-linie. Pe blocurile sintactic valide (MNX, descriere goală) validatorul pică oricum: `schema_ecommerce_validate.py product-mnx-blue-1.jsonld` → `"ok": false`, High `merchant-listing-offer-type` („offers.@type='Offer', not 'AggregateOffer'”), Medium `recommended-offer-price`, `missing-return-policy`, `missing-shipping-details`, `recommended-product-description`; blocul conține `"lowPrice": "145,00"` (virgulă zecimală, nu număr), `"category": ""`, `"gtin": "10028802"` (GTIN invalid, vezi ECOMMERCE-05), `"brand": "Prime Supplements"` hard-codat pe un articol MNX. Niciun `aggregateRating`/`review` (`grep '"aggregateRating"'` pe product.html, product-creatina-creapure.html, home.html = 0), deși datele Judge.me sunt în pagină. `{{ product | structured_data }}` nativ este comentat în `layout/theme.liquid`.

**Impact / pagini afectate:** toate cele 185 produse (×2 cu duplicatele `/ro-hu/` = 370 URL-uri): nicio eligibilitate pentru merchant listings / product snippets.

**Recomandare:** Verificare: în tema de test „Impact – SEO fixes 2026-10-12” (id 193875083639), `snippets/schema-product-enhanced.liquid` a fost rescris cu filtrul `json`, `Offer` per variantă cu preț numeric, `priceValidUntil`, `availability`, `sku`/`gtin`, `hasMerchantReturnPolicy` (14 zile, RO), `shippingDetails` (20 RON / gratuit ≥ 300 RON), `aggregateRating` din metafield-urile Judge.me și `brand` din `product.vendor` (fișiere în `theme-fixes/`). Proprietarul previzualizează tema, publică, apoi rulează Rich Results Test pe `/products/baton-proteic-capsuni` și `/products/mnx-classic-t-shirt-golden-era-blue`. Rămâne: curățarea GTIN-urilor (ECOMMERCE-05), altfel snippet-ul nou publică în continuare coduri invalide. Varianta minimă propusă de specialist, pentru referință:

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

Folosiți filtrul `json` peste tot (codifică newline-uri și ghilimele), niciodată `escape`. Alternativa cu mai puțin cod: reactivați `{% render 'microdata-schema' %}` în theme.liquid (`structured_data` al Shopify emite un Offer per variantă cu prețuri numerice) și păstrați doar adaosurile de livrare/retur/aggregateRating într-un snippet mic. Emiteți `gtin` doar când codul de bare trece verificarea cifrei de control GS1.

**Cum verificăm (falsificabilitate):** Rich Results Test pe `/products/baton-proteic-capsuni` arată un Product parsabil cu „Merchant listings” eligibil; `python -c "json.load(...)"` reușește pe blocul tuturor celor 185 produse; raportul GSC „Merchant listings” apare cu 0 elemente „Invalid”. Dacă după publicare blocul tot nu se parsează, remedierea a eșuat.

**Indicator timpuriu:** GSC Enhancements → Merchant listings / Product snippets: numărul de elemente valide, la 2-4 săptămâni de la publicare.

#### ECOMMERCE-02 — Piața duplicat `/ro-hu/` afișează prețuri FĂRĂ TVA 21 % în RON (82,64 lei vs 100,00 lei) pe pagini indexabile și în JSON-LD

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| High | PENDING (acțiune proprietar) | S | 0.95 |

**Dovezi:** live `/ro-hu/products/baton-proteic-capsuni` (200, self-canonical `https://primesupplements.ro/ro-hu/products/baton-proteic-capsuni`, hreflang ro-HU) randează `82,64 lei` / `128,10 lei` / `8,26 lei` unde pagina principală randează `100,00 lei` / `155,00 lei` / `8,50 lei` (100 / 1.21 = 82.64); Product JSON-LD-ul său spune `"price":"82.64"`, `"lowPrice": "7,02"`, `"highPrice": "82,64"`, `"priceCurrency": "RON"`. Duplicatul homepage `$R/pages/homepage-ro-hu.html`: `206,61 lei`, `165,29 lei`, `396,69 lei`, `16,53 lei` față de `250,00`, `200,00`, `480,00`, `20,00 lei` în `$R/home.html`. Cauza: piața „Ungaria” (subfolder /ro-hu, fără locale HU, fără HUF) vinde cu taxele excluse pentru o destinație non-RO, dar tot conținutul este românesc și moneda rămâne RON. 575 URL-uri (toate produsele, colecțiile, paginile, articolele) există în această variantă aparent mai ieftină și sunt în sitemap.

**Impact / pagini afectate:** 185 produse + 23 colecții + 354 articole sub `/ro-hu/` (575 URL-uri); risc de „price mismatch” în Merchant Center pentru fiecare produs dacă Google crawlează URL-ul `/ro-hu/`; cumpărătorii români care aterizează pe `/ro-hu/` văd un preț cu 17,4 % mai mic decât la checkout.

**Recomandare:** Pregătit, dar neexecutat: `webPresenceDelete` pentru `gid://shopify/MarketWebPresence/73400189303` a fost validat (vezi `remediation-status.md`) — este o modificare a setărilor de vânzare, deci decizia aparține proprietarului. Pași: în Shopify Admin > Settings > Markets, fie eliminați prezența web (subfolder) a pieței Ungaria, astfel încât `/ro-hu/` să facă 301 către URL-urile principale, fie (dacă Ungaria este o țintă reală) publicați locale-ul `hu` cu conținut tradus, prețuri HUF și „include tax in prices” conform înregistrării fiscale HU; adăugați hreflang specific Ungariei doar atunci. Paliativul propus de specialist nu se află în tema de test (lista de `noindex` din `theme.liquid` acoperă doar colecțiile utilitare și template-urile de sistem), deci până la decizie se poate adăuga în `theme.liquid`:

```liquid
{% if localization.country.iso_code == 'HU' %}<meta name="robots" content="noindex">{% endif %}
```

și canonical-ul `/ro-hu/` îndreptat spre URL-ul principal. Trimiteți în Merchant Center doar URL-uri de pe domeniul principal (câmpul URL din feed = `product.url` fără prefix de piață).

**Cum verificăm (falsificabilitate):** după modificare, `curl -I https://primesupplements.ro/ro-hu/products/baton-proteic-capsuni` întoarce 301 (sau pagina este noindex cu canonical la URL-ul principal) și indexul sitemap pierde cele 575 intrări `/ro-hu/`. Dacă URL-ul tot răspunde 200 self-canonical cu `82,64 lei`, nu s-a făcut nimic.

**Indicator timpuriu:** GSC Pages: „Duplicate without user-selected canonical” / „Alternate page with proper canonical tag” pentru `/ro-hu/` scad la 0; diagnosticele Merchant Center „Price mismatch” la 0.

#### ECOMMERCE-03 — `productType` era gol pe 185/185 produse: categoria lipsea din schema, feed-uri, filtre și paginile de tip

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| High | FIXED (live 12.10.2026) | M | 0.95 |

**Dovezi:** `products-all.json`: valori `productType` `(empty)=185`; snippet-ul de schema emitea `"category": ""` (product-mnx-blue-1.jsonld); fațetele colecțiilor expun doar `filter.v.price`, `filter.v.availability`, `filter.p.m.custom.cantitate`, `filter.p.m.custom.aroma` (collection-all.html), fără fațetă de tip de produs sau brand; canalul Shopify Google & YouTube mapează `product_type` din acest câmp (și `google_product_category` din categoria standard, absentă din export). Tag-urile făceau munca în loc (97 tag-uri, ex. `Îmbrăcăminte`=99, `Suplimente`=52, `bauturi`=19, cu duplicate de majuscule `Pre-Workout`/`pre-workout`).

**Impact / pagini afectate:** 185 produse (100 articole MNX, 85 suplimente/alimente): schema, feed Shopping, fațete și `/collections/types` fără categorie.

**Recomandare:** Verificare: pe 12.10.2026 s-a setat prin Admin API `productType` pe 195 produse (Proteine, Creatină, Aminoacizi, Pre-workout & intra-workout, Arzătoare de grăsimi, Vitamine, Minerale, Suplimente din plante, Suplimente pentru sănătate, Colagen, Omega-3, Gainer, Batoane proteice, Cremă de orez și ovăz, Băuturi instant, Fibre și digestie, Unt de nuci și semințe, Tricouri, Hanorace, Pantaloni, Pantaloni scurți, Pantaloni de trening, Maiouri, Șepci, Shakere, Accesorii sală, Pachete) și categoria din Shopify Standard Product Taxonomy pe toate 195 (ex. hb-1-9-6-3 Creatine, hb-1-9-6-8 Protein Supplements, fb-2-11-9 Rice, aa-1-1-2-2 T-shirts); plan în `applied/products-plan.json`. Proprietarul confirmă în Admin > Products (coloana Type nu mai are valori goale) și cu `/products.json?limit=250`. Rămâne de făcut: activarea fațetei „Tip produs” (și „Brand”) în aplicația Search & Discovery — setare de aplicație, acțiune a proprietarului; snippet-ul din tema de test citește deja `product.type` pentru `category`.

**Cum verificăm (falsificabilitate):** `/products.json?limit=250` arată `product_type` nevid pe toate cele 185; `/collections/types?q=Creatină` întoarce produse; atributele din Merchant Center arată `product_type`. Dacă vreun produs activ are Type gol, remedierea este incompletă.

**Indicator timpuriu:** numărul de produse cu Type gol în Admin = 0; fațeta „Tip produs” vizibilă pe `/collections/all`.

#### ECOMMERCE-04 — Datele de vendor/brand erau greșite: handle-ul myshopify „primesupplements1” era vendor pe 64 produse, iar articolele MNX purtau brandul „Prime Supplements”

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| High | FIXED (live 12.10.2026) | S | 0.95 |

**Dovezi:** distribuția vendor din export: `('primesupplements1','sup')=57`, `('primesupplements1','mnx')=7`, `('Prime Supplements','mnx')=93`, `('Prime Supplements','sup')=28`. Live `/collections/vendors?q=primesupplements1` → 200, `<title>primesupplements1`, H1 „primesupplements1”, „64 produse”, self-canonical și indexabil. Șirul `primesupplements1` apare de 25-31 ori în fiecare HTML de produs (`grep -o primesupplements1 product.html | wc -l` = 31) prin URL-urile de aplicații/UCP; blocul vendor este dezactivat în `templates__product.json`, deci cumpărătorii nu-l văd, dar feed-urile și `snippets__vendor.liquid` (`url_for_vendor`) da. Brandul din schema era hard-codat „Prime Supplements” pentru toate produsele, inclusiv 100 articole MNX și cele 19 băuturi Frutilu (brand terț).

**Impact / pagini afectate:** 64 produse cu vendor greșit; 100 MNX + 19 Frutilu cu brand greșit în schema și feed; 1 pagină de vendor indexabilă.

**Recomandare:** Verificare: pe 12.10.2026 `vendor` a fost setat la „Prime Supplements” (108 produse) sau „MNX” (87) pe toate cele 195 produse (`applied/products-plan.json`); în tema de test, `brand` din Product JSON-LD se citește din `product.vendor`, iar template-urile `vendors`/`types` primesc `noindex,follow`. Proprietarul confirmă în Admin > Products filtrând după Vendor = primesupplements1 (0 rezultate). Rămâne: decizia pentru cele 19 băuturi Frutilu (specialistul recomanda vendor „Frutilu” dacă este brand terț; azi poartă „Prime Supplements”); crearea colecțiilor manuale de brand `/collections/mnx`, `/collections/frutilu`, astfel încât snippet-ul vendor să trimită la ele în loc de `/collections/vendors?q=`; `Disallow: /collections/vendors` și `/collections/types` în `robots.txt.liquid` doar după ce colecțiile de brand există.

**Cum verificăm (falsificabilitate):** `/collections/vendors?q=primesupplements1` arată „0 produse”; distribuția vendor din `products-all.json` nu mai conține `primesupplements1`. Dacă vreun produs mai are vendor-ul myshopify, remedierea este incompletă.

**Indicator timpuriu:** lista de produse din Admin filtrată pe Vendor = primesupplements1 întoarce 0.

#### ECOMMERCE-05 — Acoperire și validitate GTIN: 207/395 variante fără cod de bare, 27 din 188 coduri pică la cifra de control GS1, codurile invalide sunt publicate ca `gtin`; SKU = EAN pe 164 variante

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| High | PENDING (acțiune proprietar) | M | 0.9 |

**Dovezi:** variante fără cod de bare: 207 pe 86 produse (81 complet, 5 parțial; 82 MNX + `prosop-negru` 1/1, `prime-whey-go` 7/14, `prime-shaker-customised` 1/1, `pachet-mix-arome-...frutilu` 1/1). Distribuția lungimii codurilor: 13 cifre = 157, 8 cifre = 28, 12 cifre = 3. Validarea cifrei de control: 27 invalide, ex. `mnx-classic-t-shirt-golden-era-blue` `10028802`/`10028804`, `mnx-hardcore-mesh-shorts-grey` `60053002..04` (numere de articol interne, nu GS1), `unt-de-caju` `6427616427536`, `shaker-premium-accesorizat-500-ml` `400082644617`, `prime-whey-go` `642176606347` (12 cifre, un EAN-13 trunchiat). Igiena SKU: 164/395 variante au `sku == barcode` (EAN-ul este stocat de două ori), 56 SKU-uri non-numerice, SKU `40111001` duplicat pe 2 variante, 7 variante fără SKU (`prime-whey-go`). Schema tipărește `"gtin": "10028802"` (product-mnx-blue-1.jsonld), pe care Merchant Center îl marchează „Invalid value [gtin]”.

**Impact / pagini afectate:** 86 produse fără GTIN, ~27 variante cu GTIN invalid, 164 variante cu SKU = EAN; afectează feed-ul Shopping și `Offer.gtin` pe toate paginile.

**Recomandare:** Acțiune a proprietarului (datele GS1 nu pot fi inventate): (1) pentru articolele MNX/Prime personalizate și shaker-ul customizat, lăsați Barcode gol și setați `identifier_exists = false` plus `mpn` (codurile actuale de 8 cifre) în metafield-urile canalului Google; (2) corectați cele 3 coduri de 12 cifre și `unt-de-caju` după fișa GS1 a furnizorului; (3) cumpărați GTIN-uri GS1 România pentru suplimentele proprii care nu au; (4) folosiți codul intern (ex. `PS-CRE-300`) ca SKU și păstrați EAN-ul doar în Barcode; (5) în Liquid, emiteți `gtin13` doar când `v.barcode.size == 13` — snippet-ul din tema de test emite `sku`/`gtin` din variantă, dar validitatea GS1 depinde de curățarea datelor.

**Cum verificăm (falsificabilitate):** un script de cifră de control GS1 peste `/products.json` întoarce 0 invalide; diagnosticele Merchant Center nu mai arată „Invalid value [gtin]” / „Missing value [gtin]”. Dacă `/products/mnx-classic-t-shirt-golden-era-blue` mai publică `10028802` ca gtin, constatarea rămâne deschisă.

**Indicator timpuriu:** numărul de variante cu coduri de 8/12 cifre = 0.

#### ECOMMERCE-06 — Acoperire titlu/descriere SEO: 105 produse fără titlu SEO, 79 cu meta descriere GOALĂ, 12 cu text de dozare ca meta, 47/80 titluri SEO peste 60 de caractere

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| High | FIXED (live 12.10.2026) | M | 0.95 |

**Dovezi:** titlu SEO lipsă 105/185 (89 MNX), descriere SEO lipsă 104/185. Pentru că `description` este goală pe 78 articole MNX, fallback-ul nu produce nicio meta: 79 produse fără seo_description ȘI 0 cuvinte în descriere (`<meta name="description">` absent în `products/mnx-classic-t-shirt-golden-era-blue.html`, parsat `meta_description: None`). 12 suplimente cad pe textul de dozare: `baton-proteic-capsuni`, `baton-proteic-caramel-sarat`, `testo-revive-500-ml`, `cardio-calm-500-ml`, `complete-collagen`, `magnesium-citrate-80-caps`, `nac-80-caps`, `turmeric-extract-80-caps`, `zinc-citrate-80-caps`, `scortisoara-ceylon-bio-200g`, `baton-proteic-cocos-si-caramel`, `baton-proteic-ciocolata-fructe-de-padure` (meta = „Mod de administrare După cum este necesar...”). Din cele 80 de titluri SEO setate, 47 depășesc 60 de caractere (39 depășesc 70, max 92) și 35/81 descrieri SEO depășesc 160 (max 221). Template-ul de titlu este `{{ page_title }}` gol, deci 105 produse afișau doar numele („Turmeric extract 80 caps”).

**Impact / pagini afectate:** 185 produse (104 fără nicio meta utilizabilă, 47 cu titluri trunchiate).

**Recomandare:** Verificare: pe 12.10.2026 `seo.title` + `seo.description` au fost rescrise în română pe 195 produse (45-60 / 120-158 caractere, sufix „ | Prime Supplements” unde încape, fără afirmații de sănătate neconforme UE); plan în `applied/products-plan.json`. Proprietarul verifică în Admin > Products > Search engine listing pe `turmeric-extract-80-caps` și pe un articol MNX, apoi cu `curl -s https://primesupplements.ro/products/mnx-classic-t-shirt-golden-era-blue | grep -o '<meta name="description"[^>]*>'`. Sufixul automat de brand este în tema de test (`layout/theme.liquid`, template de titlu cu suffix și override pe homepage) — se activează la publicare; varianta propusă de specialist:

```liquid
{{ page_title }}{% unless page_title contains shop.name %} | {{ shop.name }}{% endunless %}
```

Șabloanele folosite pentru rescriere urmează modelele specialistului: suplimente `{{Produs}} {{Gramaj/Caps}} - {{Beneficiu principal}} | Prime Supplements` (ex. „Turmeric Extract 80 capsule - Curcumină 95% cu Piperină | Prime Supplements”); MNX `{{Articol RO}} MNX {{Model}} {{Culoare RO}} - Îmbrăcăminte de sală | Prime Supplements`; Frutilu `Băutură instant Frutilu {{Aromă}} 10 g fără zahăr | Prime Supplements`.

**Cum verificăm (falsificabilitate):** `products-all.json` reconstruit arată `seo_title` și `seo_description` nevide pe 185/185, 0 titluri > 60 caractere; nicio pagină de produs fără `<meta name="description">`. Orice produs activ cu meta descriere absentă sau care începe cu „Mod de administrare” infirmă remedierea.

**Indicator timpuriu:** CTR mediu GSC pe URL-urile de produs; numărul de produse cu câmpuri SEO goale în editorul bulk din Admin = 0.

#### ECOMMERCE-07 — Modelul de conținut al produsului este stricat: câmpul description conține dozare/ingrediente niciodată afișate, cele 4 tab-uri din metafield-uri sunt în mare parte goale, 102 produse au < 50 de cuvinte, fără tabel nutrițional

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| High | OPEN | L | 0.9 |

**Dovezi:** `templates__product.json` dezactivează blocul `description` și blocul pliabil „Descriere” (`"disabled": true`) și randează o secțiune `tabs` legată de `product.metafields.custom.beneficii_cheie / despre_produs / ingrediente / detalii_produs` plus o secțiune rich-text legată de `custom.seo_produs`. Rezultat: „Mod de administrare” lipsește din textul vizibil al `product.html` (prezent doar în meta/og/JSON-LD), iar conținutul tab-urilor măsurat în HTML este: baton-proteic-capsuni Beneficii 0 cuvinte / Despre 0 / Ingrediente 103 / Detalii 0; turmeric 0/0/20/0; MNX Golden Era blue 0/40/0/0; Frutilu cola 0/53/0/0; creatina-creapure 211/0/4/4 („Greutate: 500g Serviri: 100”). Tab-urile goale se randează ca acordeoane goale. Catalog: descriere < 50 cuvinte pe 102 produse (89 MNX), < 150 pe 119, < 300 pe 140; mediană MNX 0 cuvinte, suplimente 303. Doar unele suplimente au textul lung `seo_produs` (H2 „Ce Este Creatina Creapure?”, „Recomandări de Utilizare” pe creapure, glycerol, pure-isolate, unt-de-migdale). Niciun tabel cu valori nutriționale, nicio linie de alergeni, niciun tabel de doză per porție pe paginile eșantionate; FAQ doar pe 3 produse creatină.

**Impact / pagini afectate:** 185 produse; 100 MNX cu 0-60 cuvinte; ~13 suplimente sub 150 de cuvinte. Remedierile din 12.10.2026 (meta, alt, vendor, type) nu ating conținutul vizibil al produselor.

**Recomandare:** definiți un model de conținut per tip de produs și umpleți metafield-urile (import CSV): suplimente = Despre produs (120-200 cuvinte, unic), Beneficii cheie (bullet-uri), Ingrediente (listă) + tabel `custom.valori_nutritionale` (per porție/100 g, ca tabel HTML), Mod de administrare (mutați aici textul actual din description), Alergeni, Pentru cine, FAQ (3-5 Q&A, text simplu); MNX = Material și croială, Ghid mărimi (tabel), Îngrijire, Detalii (bumbac %, gramaj, print); Frutilu = Preparare, Ingrediente, Valori nutriționale. În `snippets/product-info.liquid`/secțiunea tabs împachetați fiecare tab în `{% if block.settings.content != blank %}` ca tab-urile goale să dispară. Reactivați blocul nativ `description` (sau mutați dozarea într-un tab „Mod de administrare”) ca textul care alimentează meta/JSON-LD să fie și vizibil. Prioritate: cele 85 de suplimente, apoi cele 100 MNX.

**Cum verificăm (falsificabilitate):** `desc_words`/numărul de cuvinte din metafield-uri > 150 pe toate suplimentele și > 60 pe toate MNX; niciun tab `<details>` cu corp gol în HTML-ul produsului.

**Indicator timpuriu:** mediana cuvintelor vizibile pe pagina de produs (acum 741-1651 incl. boilerplate) și ponderea produselor cu toate cele 4 tab-uri completate.

#### ECOMMERCE-08 — 45 produse sunt duplicate de culoare/aromă publicate ca produse separate în loc de variante (19 grupuri)

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Medium | OPEN | L | 0.8 |

**Dovezi:** grupurile cvasi-duplicate din catalog-analysis: „mnx extra t shirt basic” (black/grey/white), „mnx workout top hammer 3 0” (white/black/grey), „mnx ribbed shorts hammer” (black/white/grey), „mnx cotton t shirt basix” (3), „mnx shorts golden era 2 0” (3), „mnx stringer golden era 2 0” (3), seturile de arome Frutilu (chocolate/cola/mango; green-apple/orange; ice-tea peach/lemon; watermelon/strawberry), „water out” (120 caps vs 500 ml, legitim diferite) etc. Paginile MNX expun o singură opțiune „Size:” (`<legend class="text-subdued">Size:` în mnx-classic-t-shirt-golden-era-blue.html), deci culoarea nu este o dimensiune de variantă; 58 variante sunt „Default Title”. Paginile Frutilu sunt mono-variantă la 2,50 lei, cu titluri de 96-122 caractere care diferă doar prin aromă.

**Impact / pagini afectate:** 45 produse / 19 grupuri (circa 26 MNX, 14 Frutilu, 5 altele); ×2 cu `/ro-hu/`.

**Recomandare:** pentru MNX, unificați fiecare familie de culori într-un singur produs cu opțiunile Culoare × Mărime (URL-urile se păstrează doar dacă creați redirecturi: de la fiecare handle vechi la URL-ul părinte `?variant=`; ștergerea unui produs nu generează 301 automat) și adăugați un `ProductGroup` cu `hasVariant` în schema (validatorul semnalează și `no-product-group`); pentru Frutilu păstrați produse separate dacă fiecare aromă are propriul EAN și cerere de căutare („frutilu cola”), dar scurtați titlurile la „Frutilu Cola 10 g - băutură instant fără zahăr” și adăugați un selector de aromă (produse legate prin metafield `custom.arome_asociate`) pe fiecare pagină. Păstrați aromele de baton separate (EAN-uri distincte, interogări distincte). Nimic nu a fost executat pe 12.10.2026 — decizie de catalog.

**Cum verificăm (falsificabilitate):** numărul grupurilor de titluri cvasi-duplicate din setul reconstruit scade sub 8; există redirecturi pentru fiecare handle unificat (`/products/mnx-extra-t-shirt-basic-grey` → 301).

**Indicator timpuriu:** impresiile GSC per familie MNX se consolidează pe un singur URL; numărul „Duplicate, Google chose different canonical” în GSC.

#### ECOMMERCE-09 — Titluri și H1: 17 titluri peste 60 de caractere (max 122), 96 titluri în engleză pe un magazin românesc, 19 fără diacritice, H1 diferit de titlul SEO pe produse-cheie

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Medium | OPEN | M | 0.85 |

**Dovezi:** titluri > 60 caractere: 17, toate suplimente, 14 dintre ele Frutilu („Bautura Instant cu Gust de Ceai cu Piersici Frutilu Ice Tea Peach, 10g (pentru 1.5L) – Fara Zahar, cu Stevia si Vitamina C” = 122 caractere; `nitrox-no-stim` 62). Titluri în engleză 96 (93 MNX: „MNX Extra T-shirt basic, black”, „MNX Sleeveless basketball jersey, cool gray”). 19 titluri de suplimente folosesc ASCII „Bautura/Fara/Pudra”. H1 = titlul produsului (product-info.liquid `when 'title'` → `<h1>{{ product.title }}</h1>`), deci `/products/creatina-creapure` are H1 „Creatine (Creapure®)” față de titlul SEO „Creatina Creapure - Supliment pentru Performanță Fizică”; `/products/creatina-monohidrat-micronized-300g-fara-aroma` are două H1 („CREATINE MONOHYDRATE 300g/60serv” + un al doilea H1 în rich-text-ul seo_produs). 16 suplimente nu au gramajul în titlu (`Baton proteic căpșuni`, `Unt de Migdale`, `Creatine Ready To Go`), deși titlurile variantelor îl poartă („Cutie 12 buc x 55g” / „Baton 55g”).

**Impact / pagini afectate:** 185 titluri/H1; 17 prea lungi, 96 în engleză, 19 fără diacritice, 2 H1 pe cel puțin 1 pagină. Titlurile SEO (`<title>`) au fost rescrise pe 12.10.2026, dar `product.title` (H1, carduri, coș, feed) rămâne neschimbat.

**Recomandare:** model de titlu de produs `[Produs RO] [Brand/Linie] [Gramaj/Caps/Serviri]` (titlul = ce apare pe carduri, în coș și în feed; titlul SEO poate adăuga beneficiul). Exemple: „Creatină Creapure 300 g / 500 g”, „Tricou MNX Extra Basic negru”, „Frutilu Cola 10 g”. Păstrați fraza lungă de marketing pentru titlul SEO/meta. În rich-text-ul seo_produs, retrogradați primul heading la H2. Rescrierea titlurilor brute nu modifică handle-urile (nu se pierd URL-uri).

**Cum verificăm (falsificabilitate):** niciun titlu > 60 caractere în `/products.json`; `parse_html.py` arată exact 1 H1 pe fiecare pagină de produs.

**Indicator timpuriu:** ponderea titlurilor cu diacritice și substantive românești.

#### ECOMMERCE-10 — 30 produse sunt epuizate pe toate variantele (22 MNX, 8 suplimente), dar rămân indexabile, în sitemap și linkate din blog, fără captare „anunță-mă”

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Medium | OPEN | S | 0.9 |

**Dovezi:** `available_any=false` pe 30 produse: suplimente `vitamina-d3-k2`, `zinc-citrate-80-caps`, `sapca-prime`, `baton-proteic-ciocolata-fructe-de-padure`, `water-out-500-ml`, `shaker-premium-accesorizat-500-ml`, `instant-oat-cream-800g-25-serv`, `enzima-nattokinaza-80-caps` și 22 MNX (ex. `mnx-workout-top-hammer-3-0-white/black/grey`, `mnx-ribbed-shorts-hammer-black/white/grey`). Live `/products/mnx-workout-top-hammer-3-0-white`: 200, self-canonical, „Stoc epuizat” ×3, schema OutOfStock, fără formular „Anunță-mă”/notify. 96/395 variante indisponibile; 57 produse disponibile au ≤ 5 unități în total. `instant-oat-cream-800g-25-serv` este linkat din 23 articole de blog în timp ce este epuizat. Toate cele 30 rămân în `cele-mai-vandute` și `lansate-recent` (colecții automate fără regulă de disponibilitate); dacă se sortează după cele în stoc nu s-a putut verifica din export.

**Impact / pagini afectate:** 30 URL-uri de produs (60 cu `/ro-hu/`), 96 variante; trafic editorial trimis către o pagină fără posibilitate de cumpărare.

**Recomandare:** decizie per produs: (a) stoc care revine → păstrați indexabil, adăugați un bloc back-in-stock (Shopify Inbox/Klaviyo „Anunță-mă”), mutați articolele „Stoc epuizat” la finalul colecțiilor (sortarea „Best selling” din Admin împinge deja OOS în jos, sau activați „Hide out of stock” doar în filtrele Search & Discovery), adăugați „Produse similare disponibile” deasupra fold-ului; (b) culori discontinuate (MNX Hammer 3.0 white, Ribbed Shorts Hammer v1) → depublicați și 301 (`/products/mnx-ribbed-shorts-hammer-black` → `/products/mnx-ribbed-shorts-hammer-3-0-black`); (c) `instant-oat-cream-800g-25-serv` → reaprovizionare sau înlocuirea celor 23 linkuri din blog (corpurile curățate pregătite în `blog-cleanup/` nu schimbă ținta acestor linkuri).

**Cum verificăm (falsificabilitate):** `available_any=false` < 10 într-un set reconstruit; fiecare pagină OOS rămasă afișează formular de notificare; 0 linkuri din blog către produse OOS.

**Indicator timpuriu:** numărul de produse „0 available” în inventarul Admin; clickuri GSC care aterizează pe URL-uri OOS.

#### ECOMMERCE-11 — „Reduceri” compare-at pe 144/185 produse (120 cu toate variantele tăiate permanent) și o colecție „Reduceri” goală: risc Omnibus și de sale-price în Merchant Center

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Medium | OPEN | S | 0.8 |

**Dovezi:** produse cu orice compareAtPrice 144 (77 MNX, 67 suplimente); 120 produse au TOATE variantele cu compareAt > price (reducere permanentă); 269 variante reduse: discount median 10 %, p75 20 %, max 74 % (distribuție: 10-19 % 169 variante, 20-29 % 34, 50-59 % 16, 30-39 % 12, 40-49 % 11, 60-69 % 6, 70 %+ 1); 65 variante au compareAt == price (nu randează tăietură, dar poluează feed-urile). Exemplu: `baton-proteic-capsuni` cutie 100,00 lei vs 155,00 lei (-35 %). Între timp `/collections/reduceri` (în sitemap, fără link din navigație, 200, titlu „Reduceri”) conține 0 produse. Un bloc Liquid dezactivat „SUPER Black Friday ... -50%” stă încă în `templates__product.json`.

**Impact / pagini afectate:** 144 produse / 269 variante; 1 colecție goală indexabilă (pe live; în tema de test `reduceri` primește `noindex,follow`, iar titlul/descrierea SEO ale colecției au fost rescrise pe 12.10.2026 — prețurile compare-at nu au fost atinse).

**Recomandare:** OUG 58/2022 (Omnibus UE) cere ca prețul de referință să fie cel mai mic preț din ultimele 30 de zile; un compare-at permanent nu este un „preț anterior”. Fie eliminați compare-at de pe cele 120 produse în reducere permanentă (păstrați-l pentru promoții limitate în timp și stocați minimul pe 30 de zile într-un metafield afișat lângă preț), fie documentați prețul anterior. Curățați cele 65 valori compareAt == price. Faceți `reduceri` o colecție automată cu condiția „Compare at price is greater than 0” plus „Price is less than compare at” (condiție Shopify: `compare_at_price > price` via „Compare-at price is not empty”), sau ștergeți colecția și faceți 301 la `/collections/all`. În Merchant Center folosiți `sale_price` + `sale_price_effective_date` doar pentru promoții reale.

**Cum verificăm (falsificabilitate):** `/collections/reduceri` listează produse sau redirecționează; numărul produselor cu compare-at permanent scade la cele dintr-o promoție activă; nicio variantă cu compareAt == price.

**Indicator timpuriu:** avertismente Merchant Center „Misrepresentation”/„Sale price” = 0; reclamații ANPC = 0.

#### ECOMMERCE-12 — Arhitectura colecțiilor: 23 colecții plate, 5 colecții utilitare indexabile, două categorii de îmbrăcăminte suprapuse (99 vs 87, 86 comune), fără subcategorii pe obiectiv/brand/tip de articol, toate descrierile goale

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| High | OPEN | L | 0.9 |

**Dovezi:** sitemap-ul listează 23 colecții, inclusiv `all` (185 produse, titlu „All Products”), `cele-mai-vandute` (185, toate), `lansate-recent` (185, toate), `frontpage` (1), `reduceri` (0), `11-tva` (15 produse: cremă de orez, unt, isolate, emperor mass, scorțișoară; grupare internă de TVA numită „11% TVA”). Îmbrăcăminte: `echipament-sala` 99 (etichetă în meniu „Îmbrăcăminte”) vs `haine-mnx` 87, cu 86 în ambele; cele 13 articole doar în es sunt haine Prime. Suplimente: `suplimente-sala` 52 este un coș generic (12 din cele 13 produse `prime-health` sunt și în el); `prime-health` 13 vs `vitamine-si-minerale` 13 (0 suprapunere, aceeași intenție „capsule pentru sănătate”); `creatina` 3, `pudra-proteica` 5, `batoane-proteice` 4, `aminoacizi` 4, `shot-pre-workout` 2, `alimente-sanatoase` 2. Nicio colecție pe obiectiv (masă musculară, slăbire, energie/focus, recuperare, sănătate), pe brand (MNX, Frutilu, Creapure) sau pe tip de articol (tricouri, maiouri/stringere, hanorace, pantaloni, pantaloni scurți, jersey), deși gama MNX are 100 articole. Toate descrierile goale; bannerul „Cel mai vândut” referă `baton-proteic-ciocolata-portocale`, care nu este produs activ (0 apariții în collection.html); secțiunea rich-text SEO legată de `collection.metafields.custom.seo_text` este `"disabled": true`; 8 colecții fără titlu/descriere SEO. Mega-meniul leagă 17 colecții plat (plus Despre noi/Contact).

**Impact / pagini afectate:** 23 URL-uri de colecție (46 cu `/ro-hu/`); 100 produse de îmbrăcăminte și 85 suplimente. Progres parțial pe 12.10.2026: 23 colecții au titlu + descriere SEO rescrise și 17 colecții-categorie au descriere de 3 paragrafe în `descriptionHtml` (`applied/collections-plan.json`) — FIXED; `noindex,follow` pentru `all`, `cele-mai-vandute`, `lansate-recent`, `11-tva`, `frontpage`, `reduceri` este în tema de test — READY; restructurarea (punctele 1-3) nu a început.

**Recomandare (propunere):**
  1. Hub-uri: `/collections/suplimente` (redenumiți suplimente-sala, adăugați intro de 300 cuvinte), `/collections/imbracaminte` (redenumiți echipament-sala; păstrați haine-mnx ca hub de brand MNX sau 301 către `/collections/mnx`), `/collections/alimente` (cremă de orez, unt, batoane, băuturi).
  2. Subcategorii (automate după Type/Tag — `productType` este acum completat): Proteine, Creatină, Aminoacizi, Pre-workout, Intra-workout, Arzătoare de grăsimi, Vitamine și minerale, Sănătate (absorbiți prime-health), Băuturi instant; îmbrăcăminte: Tricouri, Maiouri & stringere, Hanorace, Pantaloni, Pantaloni scurți, Accesorii; brand: MNX, Frutilu.
  3. Pagini pe obiectiv (manuale, 300-500 cuvinte + FAQ): Masă musculară, Slăbire și definire, Energie și focus, Recuperare, Sănătate și imunitate; femei/bărbați dacă gama permite.
  4. Colecții utilitare: Verificare după publicarea temei — `curl -s https://primesupplements.ro/collections/cele-mai-vandute | grep -o '<meta name="robots"[^>]*>'` arată `noindex,follow`; propunerea Liquid a specialistului: `{% if collection.handle == 'cele-mai-vandute' or ... %}<meta name="robots" content="noindex">{% endif %}`; redenumiți/ștergeți `11-tva` (sau noindex); reparați sau ștergeți `reduceri`; păstrați `all` indexabil doar cu descriere reală, altfel canonical la `/collections/suplimente`.
  5. Verificare: descrierile apar în bannerul colecției pe `/collections/pudra-proteica`; activați în plus secțiunea rich-text `seo_text` dacă doriți text sub grilă; titlurile SEO urmează deja modelul „{{Categorie}} - {{beneficiu}} | Prime Supplements”; reparați produsul recomandat din banner.

**Cum verificăm (falsificabilitate):** sitemap_collections listează doar categorii cu ≥ 2 produse și descriere; `/collections/cele-mai-vandute` este noindex; GSC arată impresii pe noile pagini de obiectiv/brand.

**Indicator timpuriu:** numărul colecțiilor indexabile cu descriere nevidă (țintă 100 %).

#### ECOMMERCE-13 — Navigarea fațetată este subțire (preț, disponibilitate, 2 metafield-uri custom) și crawlabilă; paginile de interogare vendor/type sunt indexabile

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Low | READY (tema de test – de publicat) | S | 0.8 |

**Dovezi:** formularul de fațete din `collection-all.html` (`method="GET" action="/collections/all"`) expune `filter.v.price.gte/lte`, `filter.v.availability`, `filter.p.m.custom.aroma` (6), `filter.p.m.custom.cantitate` (6); `collection.html` (pudra-proteica) are doar cantitate + preț + disponibilitate; fără fațete de brand, tip, obiectiv, mărime sau culoare (mărimile MNX sunt opțiuni de variantă, dar nicio fațetă `filter.v.option.size` nu este activată). Live: URL-urile filtrate și sortate răspund 200 cu canonical la URL-ul curat (bine). `/collections/vendors?q=primesupplements1` este 200, self-canonical, indexabil (64 produse). robots.txt este default-ul Shopify (nu blochează `?filter.` sau `sort_by`) — notă: TECH-26 arată că default-ul Shopify 2026 blochează deja `/collections/*sort_by*` și `/collections/*filter*&*filter*` (multi-filtru), dar nu `/collections/vendors` și `/collections/types`.

**Impact / pagini afectate:** 23 colecții; 1 pagină de vendor indexabilă (+ `/collections/types?q=`).

**Recomandare:** Verificare: în tema de test, `layout/theme.liquid` emite `noindex,follow` pe template-urile `vendors` și `types` — după publicare, `curl -s "https://primesupplements.ro/collections/vendors?q=primesupplements1" | grep -o '<meta name="robots"[^>]*>'` trebuie să arate noindex. Rămâne la proprietar: după ECOMMERCE-03/04 (date deja completate), activați fațetele Tip produs, Brand, Mărime (`filter.v.option.size`), Obiectiv (tag sau metafield) în Search & Discovery; păstrați comportamentul canonical al Shopify; opțional, în `robots.txt.liquid` regulile propuse de specialist:

```
Disallow: /collections/vendors
Disallow: /collections/types
Disallow: /*?*filter.
Disallow: /*sort_by=
```

(ultimele două sunt în mare parte acoperite de default-ul Shopify 2026; adăugați doar primele două, și doar după ce colecțiile de brand din ECOMMERCE-04 există).

**Cum verificăm (falsificabilitate):** formularul de fațete de pe /collections/all listează Tip produs / Brand / Mărime; `curl -I "/collections/vendors?q=x"` este blocat în robots.txt și/sau întoarce noindex.

**Indicator timpuriu:** ponderea URL-urilor `?filter.` în GSC Crawl stats.

#### ECOMMERCE-14 — Fără breadcrumb vizibil pe paginile de produs și de colecție; BreadcrumbList JSON-LD trimite fiecare produs la „All Products”

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Medium | READY (tema de test – de publicat) | S | 0.95 |

**Dovezi:** `grep -i breadcrumb product.html` nu găsește nimic în afara JSON-LD; `$R/jsonld/product-baton-2.jsonld` = Pagina principala > „All Products” (`/collections/all`) > Baton proteic căpșuni, pentru că `schema-breadcrumb-enhanced.liquid` folosește `product.collections.first`, iar `all` este prima colecție pentru fiecare produs (185/185 în `all`). Paginile de colecție (collection.html, collection-all.html) nu au breadcrumb nici ele. `sections__main-product.liquid` randează doar `schema-breadcrumb-enhanced`, fără navigație vizuală.

**Impact / pagini afectate:** 185 pagini de produs + 23 colecții: niciun semnal de ierarhie pentru utilizatori, breadcrumb rich result cu categoria greșită.

**Recomandare:** Verificare: în tema de test, `snippets/schema-breadcrumb-enhanced.liquid` sare peste colecțiile utilitare, iar `schema-collection.liquid` adaugă BreadcrumbList pe colecții — după publicare, Rich Results Test pe `/products/creatina-creapure` trebuie să arate Acasă > Creatină > Creatina Creapure. Rămâne (nu este în tema de test): breadcrumb-ul vizibil. Snippet-ul propus de specialist, `snippets/breadcrumbs.liquid`, randat în capul `main-product` și `main-collection`:

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

Construiți BreadcrumbList din același `crumb` (preferați un metafield `custom.categorie_principala` când există, ca Creatină să bată Suplimente). Folosiți „Acasă” în loc de „Pagina principala”.

**Cum verificăm (falsificabilitate):** Rich Results Test arată BreadcrumbList Home > Creatină > Creatina Creapure; breadcrumb vizibil prezent în HTML-ul brut. Dacă după publicare JSON-LD-ul tot indică „All Products”, snippet-ul nu a fost preluat.

**Indicator timpuriu:** elemente valide breadcrumb în GSC = 185.

#### ECOMMERCE-15 — Cross-sell-ul este doar client-side: paginile de produs expun 6-7 linkuri de produs în HTML-ul brut; blocul complementar nu are date; titlurile secțiunilor au greșeli de tipar și engleză

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Medium | OPEN | S | 0.85 |

**Dovezi:** href-uri `/products/` distincte în HTML-ul brut: 6 (baton, creapure), 7 (MNX, turmeric, Frutilu) — provin din caruselul „Cele mai vândute” randat server-side; `<product-recommendations ... intent="complementary" limit="3">` și `intent="related" limit="4">` se umplu prin JS după încărcare; titlul complementar „Merge perfect cu” nu apare niciodată în HTML (0 apariții pe 5 pagini), deci nu sunt configurate produse complementare în Search & Discovery. Headinguri: „S-ar putea să-ți placã” (ã în loc de ă), „Customer Reviews” (heading Judge.me în engleză), „Arzătoare de grãsimi” în lista de colecții; „Categorii populare” arată aceleași 3 colecții (vitamine-si-minerale, arzator-de-grasimi, suplimente-sala) pe fiecare produs și pe fiecare colecție.

**Impact / pagini afectate:** 185 pagini de produs; 23 pagini de colecție — crawlerele și cititorii UCP/LLM văd doar 6-7 linkuri interne de produs per pagină.

**Recomandare:** adăugați o grilă „Din aceeași categorie” randată server-side (`{% for p in crumb.products limit: 8 %}` folosind colecția din breadcrumb, excluzând produsul curent), ca crawlerele și cititorii UCP/LLM să primească linkuri reale; configurați produse complementare per linie în Search & Discovery (creatină + shaker, whey + cremă de orez, pre-workout + glicerol); corectați tiparul în setările secțiunilor („S-ar putea să-ți placă”, „Arzătoare de grăsimi”); traduceți titlul widgetului Judge.me („Recenzii clienți”) în setările aplicației; faceți „Categorii populare” contextual (îmbrăcăminte pe paginile MNX). Nicio acțiune pe 12.10.2026.

**Cum verificăm (falsificabilitate):** HTML-ul brut al unei pagini de produs conține ≥ 14 linkuri `/products/` distincte; „Merge perfect cu” se randează cu 3 produse.

**Indicator timpuriu:** linkuri interne per URL de produs într-un crawl Screaming Frog (țintă ≥ 15).

#### ECOMMERCE-16 — Recenziile există (431 la nivel de magazin), dar sunt invizibile pentru căutare: fără markup aggregateRating/review, blocul rating dezactivat, text de widget în engleză, widget gol pe produsele fără recenzii

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Medium | READY (tema de test – de publicat) | S | 0.85 |

**Dovezi:** homepage `jdgm-all-reviews-rating` „4.87 stars”, „431 reviews”; badge-uri pe produse: baton-proteic-capsuni 4 recenzii / 4.00, creatina-creapure 17 / 5.00, turmeric-extract-80-caps 44 / 4.75, MNX Golden Era blue 0, Frutilu cola 0. Blocul `rating` al temei este `"disabled": true` în `templates__product.json`, în loc se folosește app block-ul Judge.me preview badge; `"aggregateRating"` lipsește din tot HTML-ul eșantionat (opțiunea rich-snippet JSON-LD a Judge.me oprită, iar snippet-ul Product custom nu citește `product.metafields.reviews.rating`). Widgetul de recenzii este configurat cu `"review_data": "sample_data"` și `"empty_state": "empty_widget"` (arată widgetul gol pe produsele cu 0 recenzii, adică toate MNX/Frutilu).

**Impact / pagini afectate:** 185 produse; cele ~30 cu recenzii pierd azi stelele în SERP; ~119 (100 MNX + 19 Frutilu) afișează un widget de recenzii gol.

**Recomandare:** Verificare: snippet-ul Product din tema de test emite `aggregateRating` din metafield-urile Judge.me (`reviews.rating` / `reviews.rating_count`, verificat: baton-proteic-capsuni = 4.0 / 4) — după publicare, Rich Results Test pe `/products/turmeric-extract-80-caps` trebuie să arate review snippet 44 recenzii / 4.75. Rămâne la proprietar (setări de aplicație Judge.me): asigurați-vă că JSON-LD-ul propriu Judge.me rămâne oprit (altfel două entități Product), traduceți widgetul („Recenzii clienți”), setați `empty_state` pe „hide” pentru produsele cu 0 recenzii sau un îndemn „Fii primul care lasă o recenzie”; porniți cererile de recenzie post-cumpărare pentru MNX și Frutilu (0 recenzii).

**Cum verificăm (falsificabilitate):** Rich Results Test arată review snippet pe `/products/turmeric-extract-80-caps` (44 recenzii, 4.75); dacă apar două entități Product, JSON-LD-ul Judge.me a fost pornit în paralel.

**Indicator timpuriu:** elemente valide „Review snippets” în GSC; ponderea produselor cu ≥ 1 recenzie (necunoscută dincolo de eșantion).

#### ECOMMERCE-17 — Imagini de produs: 0/493 imagini aveau alt text și 57 produse au o singură imagine (53 suplimente)

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Medium | FIXED (live 12.10.2026) | M | 0.95 |

**Dovezi:** `images_without_alt` = 493/493, toate cele 185 produse; `image_count == 1` pe 57 produse (53 suplimente, ex. `citrus-bergamot`, `ashwagandha-ksm-66`, `vitamina-d3-k2`, `omega-3`, toate articolele de 80 caps); HTML-ul paginii de produs arată 24-39 `<img>` cu câte 6 alt goale (tema folosește `image.alt`). Dimensiunile sunt bune (min 1024 px, 81 la 1500×1875, 43 la 4000×4000, AVIF). Numele fișierelor sunt descriptive (`GOLDEN-ERA-TSHIRT-Blue-4.avif`).

**Impact / pagini afectate:** 185 produse / 493 imagini (alt — rezolvat); 57 produse cu o singură imagine (rămâne).

**Recomandare:** Verificare: pe 12.10.2026 s-a scris `alt` descriptiv în română pentru 493/493 imagini de produs, după imaginea reală (ambalaj, aromă, unghi, purtat/întins); plan în `applied/alt-text-plan.json`. Proprietarul confirmă în Admin > Products > Media (câmpul Alt text) și cu `curl -s https://primesupplements.ro/products/creatina-creapure | grep -o 'alt="[^"]*"' | sort -u`. Modelul specialistului „{{Titlu produs}} - {{tip imagine: față/etichetă/valori nutriționale/spate}} - Prime Supplements” a fost urmat în spirit (descriere a imaginii, nu titlul brut). Rămâne: adăugați cel puțin o imagine de etichetă/valori nutriționale și una lifestyle la cele 53 suplimente cu o singură imagine (listările Shopping cu 3+ imagini primesc tratamentul „multiple images”, iar fotografia etichetei dublează ca sursă pentru conținutul nutrițional din ECOMMERCE-07).

**Cum verificăm (falsificabilitate):** `images_without_alt` = 0 într-un export reconstruit; produse cu `image_count >= 3` ≥ 150. Orice imagine de produs cu alt gol pe live infirmă partea FIXED.

**Indicator timpuriu:** acoperirea `additional_image_link` în Merchant Center; impresii Google Images în GSC.

#### ECOMMERCE-18 — Pregătirea pentru Google Merchant Center: faptele din politici există pe pagini, dar nu în datele de produs; 8 familii de atribute care blochează feed-ul lipsesc sau sunt greșite

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| High | PENDING (acțiune proprietar) | M | 0.85 |

**Dovezi:** pagini de politici: `politica-de-livrare` (163 cuvinte: livrare gratuită > 300 RON, 20 RON, Cargus, 24-72 h / 1-3 zile lucrătoare), `politica-de-retur` (1122 cuvinte: retragere 14 zile, costul returului suportat de client), `politica-de-plata` (Netopia Visa/Mastercard, transfer, ramburs, prețuri în RON cu TVA). Nu există ca `shippingDetails`/`hasMerchantReturnPolicy` în niciun bloc Product (validator Medium ×2). Lacune la nivel de feed din set: `product_type` gol 185; `brand` greșit pe 64 + 119; `gtin` lipsă pe 207 variante / invalid pe 27; `description` goală pe 78 MNX (GMC cere descriere); titluri în engleză pe 96; 30 produse OutOfStock; price mismatch pe alternativele `/ro-hu/` (ECOMMERCE-02); fără `google_product_category` (câmp absent din export, probabil gol). Nume de produse precum „Testo Revive”, „Fat Burning Booster Shot”, „Water Out”, „Thermo Core” au nevoie de descrieri fără afirmații sub politica Google pentru healthcare/suplimente (neverificat pe contul live).

**Impact / pagini afectate:** toate cele 185 produse pentru feed-ul Shopping; 8 familii de atribute. Stare pe familii după 12.10.2026: `product_type` + categoria standard FIXED, `brand`/vendor FIXED, livrare/retur în schema READY (tema de test), `gtin` PENDING (ECOMMERCE-05), `/ro-hu/` PENDING (ECOMMERCE-02), descrieri MNX / titluri engleze / OOS OPEN (ECOMMERCE-07/09/10).

**Recomandare:** în această ordine, acțiuni ale proprietarului: (1) publicați tema de test (schema Product cu livrare/retur, ECOMMERCE-01) și configurați în paralel livrarea și retururile în Merchant Center (sau în setările de livrare/retur din Search Console), ca schema de pagină să nu fie obligatorie; (2) completați GTIN/descrierile (05, 07) — Type/Categorie/Vendor/alt sunt deja făcute (03, 04, 17); (3) în canalul Google & YouTube mapați `description` la metafield-ul „Despre produs” pentru MNX, setați `identifier_exists=false` pentru articolele personalizate, excludeți cele 30 produse OOS doar dacă sunt discontinuate; (4) rescrieți descrierile celor 4 produse „stimulant/slăbire” fără afirmații de boală/tratament; (5) folosiți doar URL-uri de pe domeniul principal (niciodată `/ro-hu/`).

**Cum verificăm (falsificabilitate):** diagnostice Merchant Center: 0 articole respinse, 0 „Missing value [description]”, 0 „Invalid value [gtin]”, livrare și retur afișate în listările Shopping.

**Indicator timpuriu:** „Active items” în Merchant Center = 185 în 2 săptămâni de la trimiterea feed-ului.

#### ECOMMERCE-19 — Linkingul blog → produs este deviat: 2582 linkuri către primesupplements1.myshopify.com, 534 linkuri de adăugare în coș, 130/185 produse niciodată linkate, 16 linkuri către produse moarte

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| High | READY (tema de test – de publicat) | M | 0.95 |

**Dovezi:** `articles-all.json`: product_links 3201 în 355 articole (mediană 10 per articol, max 15, 6 articole cu 0); `myshopify_links` 2582 în 349 articole (fiecare link de produs este emis de două ori: domeniul principal + domeniul myshopify, acesta din urmă face 301 și scurge link equity printr-un redirect), `cart_links` 534 în 349 articole (linkuri de tip `/cart/add` care nu creează nimic indexabil). Produse distincte linkate: 55 din 185; niciodată linkate: 130 (99 din 100 MNX; 31 suplimente incl. toate cele 19 băuturi Frutilu, 3 `crema-de-orez-*`, `complete-collagen`, `magnesium-citrate-80-caps`, `turmeric-extract-80-caps`, `centura-hardcore`). Ținte moarte: `15-reducere-pachet-thermo-core-water-out-1-14-august` (12 linkuri, un pachet expirat din august) și `liver-protect-500-ml` (4 linkuri). Ținte principale: creatina-monohidrat-micronized 25 articole, creatina-creapure 23, fiber-blood-orange 23, creatine-ready-to-go 23, instant-oat-cream (epuizat) 23. Linkuri de colecție: 446 în total, 0 handle-uri distincte recuperabile din corpuri.

**Impact / pagini afectate:** 349 articole; 130 produse cu zero linkuri editoriale; 16 linkuri moarte.

**Recomandare:** Verificare (paliativ READY): `sections/main-article.liquid` din tema de test rescrie la randare linkurile `https://primesupplements1.myshopify.com` în linkuri relative — după publicare, `curl -s https://primesupplements.ro/blogs/news/<handle> | grep -c myshopify` trebuie să fie 0. Remedierea durabilă este PENDING: corpurile curățate pentru toate cele 355 articole sunt pregătite (`blog-cleanup/cleaned-bodies.tar.gz`, `blog-cleanup/cleanup-report.json`, script `blog-cleanup/clean.py`; rescriu 2.582 linkuri myshopify, elimină 534 prețuri hard-codate și 194 linkuri „Powered by BlogGenAuto”), importul în bloc fiind blocat de politica de integrare a mediului — aplicați cu Matrixify (foaia Blog Posts: ID, Body HTML) sau un script Admin API de ~20 linii. Rămâne OPEN, editorial: de-duplicarea href-urilor identice din același paragraf, eliminarea linkurilor `/cart/add`, redirecționarea/înlocuirea celor 2 ținte moarte, apoi o hartă de linkuri ca fiecare supliment să fie linkat din ≥ 3 articole tematice (blogul acoperă deja creatină, whey, glutamină, L-carnitină, citicolină) și fiecare familie MNX din postările de antrenament/lifestyle; 2-3 linkuri de colecție per articol (categorie + pagină de obiectiv).

**Cum verificăm (falsificabilitate):** `myshopify_links` = 0 și `cart_links` = 0 într-un `articles-all.json` reconstruit; produse distincte linkate ≥ 150; 0 linkuri către handle-uri inactive.

**Indicator timpuriu:** număr de inlinks per URL de produs din `/blogs/` în Screaming Frog (țintă ≥ 3 pentru suplimente).

#### ECOMMERCE-20 — Tag-urile și handle-urile sunt inconsecvente (97 tag-uri cu duplicate de majuscule/plural, handle cu underscore, trei modele de handle în gama Frutilu)

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Low | OPEN | S | 0.8 |

**Dovezi:** 97 tag-uri distincte; duplicat de majuscule `Pre-Workout`/`pre-workout`; aceleași 4 batoane poartă `Batoane Proteice`, `baton`, `baton proteic`; `Îmbrăcăminte` 99 vs `Haine MNX` 5; tag-uri de tip brand (`combat`, `combat pro`, `whey`, `unt`). Handle-uri: `emperor-mass_3000g` (underscore), `frutilu-instant-drink-strawberry-10-g` vs `instant-drink-frutilu-mango-10g` vs `instant-drink-frutilu-lemon` (trei modele într-o singură gamă), `creatine-ready-to-go-plicuri-prime-supplements`; 346 tag-uri nefolosite de nicio fațetă.

**Impact / pagini afectate:** 185 produse; 97 tag-uri; colecțiile automate și fațetele pe tag nu pot fi construite fiabil.

**Recomandare:** reduceți tag-urile la un vocabular controlat folosit de colecțiile automate și de fațete (obiectiv: `obiectiv:masa`, `obiectiv:slabire`; formă: `forma:capsule`; brand: `brand:mnx`) — cu `productType` completat pe 12.10.2026, multe tag-uri de categorie devin redundante și pot fi șterse; nu redenumiți handle-urile acum (fiecare redenumire cere un 301; corectați doar `emperor-mass_3000g` și setul Frutilu atunci când rescrieți titlurile, cu „Create URL redirect” bifat).

**Cum verificăm (falsificabilitate):** număr de tag-uri ≤ 40, fără duplicate de majuscule.

**Indicator timpuriu:** colecțiile automate bazate pe tag-uri se populează corect.

#### ECOMMERCE-21 — Denumirea variantelor este inconsecventă și se scurge în coș, feed-uri și UCP (`Cutie 12 buc x 55g` / `Baton 55g` / `55g`; numele produsului repetat în titlul variantei; două scale de mărimi)

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Low | OPEN | S | 0.8 |

**Dovezi:** cele mai frecvente titluri de variantă: `L/XL` 64, `Default Title` 58, `S/M` 55, `XXL/3XL` 29, `M` 22, `XL` 22, `L` 20, `S` 16; aceeași linie de produs folosește `Cutie 12 buc x 55g` + `Baton 55g` (căpșuni, cocos) dar `Cutie 12 buc x 55g` + `55g` (caramel sărat); variantele `creatina-creapure` sunt `Creatine (Creapure®) 500g/100serv` / `... 300g/60serv` (numele produsului repetat); 2 seturi de opțiuni pentru MNX (`S/M`, `L/XL`, `XXL/3XL` pe unele, `S`..`2XL` pe altele), deci o fațetă de mărime ar arăta 9 valori.

**Impact / pagini afectate:** 395 variante; atributul `size` din Shopping și `catalog.search` din UCP primesc valori neuniforme.

**Recomandare:** nume de opțiune „Cantitate” cu valorile „Baton 55 g” / „Cutie 12 x 55 g”; „Gramaj” cu „300 g (60 serviri)”; o singură scală de mărimi per tip de articol; `variant_title` alimentează atributul `size` din Shopping. Se face odată cu rescrierea titlurilor (ECOMMERCE-09) și, pentru MNX, odată cu unificarea culorilor (ECOMMERCE-08).

**Cum verificăm (falsificabilitate):** toate titlurile de variantă urmează modelul în `/products.json`.

**Indicator timpuriu:** acoperirea atributului `size` în Merchant Center pe îmbrăcăminte.

#### ECOMMERCE-22 — Defecte ale template-ului de colecție: „Alte categorii” fixe, produs recomandat din banner lipsă, bloc de blog generic pe fiecare colecție, 24 produse pe pagină la colecții de 185, H1 ≠ titlu

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Low | OPEN | S | 0.85 |

**Dovezi:** `templates__collection.json`: banner `featured_product: baton-proteic-ciocolata-portocale` (handle inactiv, „Cel mai vândut” nu randează nimic: 0 potriviri în collection.html), bloc `collection_list` fixat pe vitamine-si-minerale / arzator-de-grasimi / suplimente-sala cu heading „Arzătoare de grãsimi”, secțiunea `rich_text` SEO dezactivată, `products_per_page: 24` (all/cele-mai-vandute/lansate-recent paginează 8 pagini în adâncime), un bloc de imagine promoțională pentru „Nitrox NO-STIM” injectat pe poziția 4 în fiecare grilă de colecție, bloc de blog „Ghiduri și sfaturi utile” cu ultimele 3 postări indiferent de categorie. H1 al pudra-proteica este „Pudre Proteice” în timp ce titlul este „Pudra proteica pentru masa musculară”; `/collections/creatina` H1 „Creatina”.

**Impact / pagini afectate:** 23 colecții (paginile utilitare cu 8 pagini de paginare primesc `noindex` în tema de test; restul defectelor nu au fost atinse).

**Recomandare:** sufixele de template per colecție există deja (`pime-health`, `aminoaicizi`, `accesori` — corectați tiparul) — folosiți-le ca „Alte categorii” să varieze (colecții surori), faceți blocul de blog să tragă un blog etichetat (necesită tag-uri pe articole), ridicați products_per_page la 48 pentru îmbrăcăminte, eliminați produsul recomandat inactiv sau indicați un bestseller în stoc, activați secțiunea de text SEO dacă descrierea din banner nu ajunge, aliniați H1 cu cuvântul-cheie din titlul SEO („Creatină monohidrat și Creapure”).

**Cum verificăm (falsificabilitate):** HTML-ul colecției arată un card „Cel mai vândut” nevid și „Alte categorii” specifice categoriei.

**Indicator timpuriu:** niciunul dincolo de verificarea manuală.

#### ECOMMERCE-23 — Profilul UCP este live și bine format; calitatea comerțului prin agenți este plafonată de datele de produs de mai sus

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Info | OPEN | S | 0.9 |

**Dovezi:** `$R/ucp.json`: `version 2026-08-25`, `supported_versions` 2026-04-08 și 2026-01-23, serviciu `dev.ucp.shopping` peste `mcp` la `https://primesupplements1.myshopify.com/api/ucp/mcp` (plus `embedded`), capabilități checkout, fulfillment (doar shipping), discount, cart, order, catalog.search, catalog.lookup, `dev.shopify.catalog`, identity_linking (conturi Shop), endpoint permalink `https://primesupplements.ro/buy`; handlere de plată Google Pay (merchant id 16708973830884969730), card Shopify, Shop Pay. `catalog.search` se bazează pe title/type/vendor/description, care la data auditului erau goale sau în engleză pe majoritatea produselor (ECOMMERCE-03/04/06/07); type și vendor au fost completate pe 12.10.2026, titlurile brute și descrierile nu.

**Impact / pagini afectate:** la nivel de magazin; informativ.

**Recomandare:** nicio modificare de protocol; Merchant Center + date de produs curate (ECOMMERCE-05/07/09/18) deblochează AI Mode / cumpărăturile prin agenți; când piața `/ro-hu/` este eliminată, re-verificați că URL-urile din `supported_versions` răspund.

**Cum verificăm (falsificabilitate):** `ucp_check.py https://primesupplements.ro --probe-endpoints` (rulat în afara acestui sandbox) raportează toate endpoint-urile accesibile.

**Indicator timpuriu:** comenzi cu sursa „agent”/UCP în Shopify.

#### ECOMMERCE-24 — Peisajul de marketplace și competitori nu a putut fi măsurat (fără date Merchant/SERP); magazinul B2B duplică 57 produse retail cu prețuri en-gros vizibile

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Info | PENDING (acțiune proprietar) | S | 0.5 |

**Dovezi:** fără DataForSEO/Merchant API; WebSearch indisponibil pentru acest agent. Fișierul de context listează competitorii români (gymbeam.ro, proteinshop.ro, bodyline.ro, supliments.ro, xtremelabs.ro, gnc.ro, redis.ro, emag.ro). Prețurile din catalogul Prime Supplements (RON): suplimente 2,50-480,00, MNX 20,00-319,00; brandul are un magazin B2B separat (b2b.primesupplements.ro) care este el însuși indexabil: sitemap-ul lui listează 57 URL-uri de produs cu aceleași handle-uri ca magazinul retail, iar `$R/pages/b2b-product.html` randează un `<title>` gol cu prețurile en-gros vizibile (105,00 lei / 155,00 lei), deci paginile wholesale pot concura cu paginile de produs retail și pot scurge prețurile.

**Impact / pagini afectate:** strategic; 57 URL-uri de produs B2B (ex. `https://b2b.primesupplements.ro/products/baton-proteic-capsuni`).

**Recomandare:** acțiune a proprietarului pe celălalt magazin (listată în `remediation-status.md`: noindex/parolă pe B2B; vezi și TECH-02): faceți b2b.primesupplements.ro noindex (sau protejat cu parolă) ca să nu concureze catalogul en-gros cu paginile retail. Înainte de a investi în Shopping ads, verificați în Merchant Center „Competitive visibility” și raportul de competitivitate a prețurilor pentru creatină/whey; luați în calcul un cont de seller pe emag.ro Marketplace pentru suplimentele proprii (emag domină SERP-urile tranzacționale „creatina monohidrat” în România), cu domeniul principal în profilul de seller; păstrați titlurile de marketplace identice cu cele de pe site după ECOMMERCE-09.

**Cum verificăm (falsificabilitate):** n/a pentru partea de piață (necesită date live SERP/Shopping); pentru B2B: URL-urile de produs de pe b2b.primesupplements.ro întorc noindex sau 401.

**Indicator timpuriu:** SERP-ul de brand („prime supplements creatina”) arată produsul de pe primesupplements.ro deasupra marketplace-urilor și a magazinului B2B.

### Ce nu am putut măsura

- Merchant Center, Google Shopping, GSC și date de marketplace: fără cheie Google API, fără DataForSEO, fără WebSearch pentru agentul seo-ecommerce — pregătirea pentru Shopping este dedusă din setul de date Shopify și din cerințele documentate ale Google, nu din diagnosticele contului.
- Numărul de recenzii Judge.me este cunoscut doar pentru cele 5 produse eșantionate și badge-ul de pe homepage (431 în total); distribuția per produs pe cele 185 produse este necunoscută.
- Exportul de produse nu conține `options`, `category` (taxonomia standard, completată abia pe 12.10.2026), greutățile variantelor și metafield-urile canalului Google; afirmațiile despre numele opțiunilor provin din HTML-ul paginilor eșantionate (MNX expune doar „Size”).
- Verificările live au fost limitate la 5 cereri (protecție anti-bot, 429 „Verifying your connection...”); toate celelalte dovezi provin din copiile locale datate 2026-10-12.
- Ordinea de sortare a colecțiilor și setările Search & Discovery (produse complementare, „hide out of stock”, fațete) nu au putut fi citite din export; fără browser headless în sandbox, blocurile `product-recommendations` umplute prin JS au fost evaluate doar după HTML-ul brut.
- Fără PageSpeed Insights/CrUX (cotă anonimă epuizată, HTTP 429) și fără Playwright, impactul de performanță al widgeturilor de recenzii/cross-sell nu a fost măsurat (vezi secțiunea 5).
