# Local SEO findings: primesupplements.ro

Key: `local` | Specialist: claude-seo seo-local method (business-type detection, NAP extraction from HTML/schema/admin, local schema validation, GBP/citation/review signals) | Audit date: 2026-10-12

## Scope & method

**Business-type decision: online-only retailer with a registered office, NOT a hybrid.** Evidence:
- Shopify Admin (read-only GraphQL `shop` + `locations`): the only location is "Shop location" with `address1/city/zip/phone/latitude = null` (only `country: Romania`), `fulfillsOnlineOrders: true`, `localPickupSettingsV2: null` (local pickup never configured).
- Rendered HTML (home.html, pages/product.html, pages/page-contact.html): 0 occurrences of "ridicare", "pickup", "showroom", "magazin fizic"; only "Livrare gratuită la comenzile de peste 300 RON" (10x per page, announcement bar/USP strip).
- Terms page (shopify/pages.json, handle `termeni-și-condiții`): "Produsele vor fi livrate de către noi prin curier. Livrarea Produselor se poate efectua doar pe teritoriul României."
- ANAF registry (live, `POST https://webservicesp.anaf.ro/api/PlatitorTvaRest/v9/tva`, CUI 46260823): PRIME SPORT SUPPLEMENTS S.R.L., "JUD. SIBIU, ORŞ. CISNĂDIE, STR. IOAN VIRGIL ISPAS, NR.17A", postal code 555300, registered 2022-06-07, CAEN 4638 (wholesale), VAT payer (scpTVA = true). The address is a registered office in a residential street of a small town, not a retail point.

Consequence: Google Business Profile, Bing Places and Apple Business listings require in-person contact with customers at the address or at the customer's location; an online-only store without pickup is not eligible. Local-pack ranking is therefore out of scope for this business. What *does* matter from the local toolbox is **entity hygiene**: a complete, consistent NAP for the legal entity across the site, the Organization schema, the Shopify store profile (which feeds Shop app, invoices and Google Merchant Center) and the B2B store. Findings are kept proportionate to that.

**What was checked and how**
- NAP extraction from 34 local HTML copies ($R/home.html, $R/pages/*.html, $R/pages/products/*.html): counts of "Ispas", "0775286584", `tel:`, "PRIME SPORT SUPPLEMENTS SRL", "anpc.ro", LocalBusiness/Store/PostalAddress/telephone strings. Footer HTML block around "Informatii de contact" extracted raw.
- Contact page ($R/pages/page-contact.html, $R/parsed/pages_page-contact.json): visible text, `tel:`/`mailto:` links, iframes, map links, schema types, form presence.
- Legal pages ($R/shopify/pages.json, 11 pages): NAP variants in politica-de-cookies, termeni-și-condiții, politica-de-plata, politica-de-confidentialitate, politica-de-livrare, politica-de-retur.
- Organization schema ($R/theme/snippets__schema-organization.liquid; rendered copies $R/jsonld/*-0.jsonld on home, product, collection, article).
- Homepage FAQ/support hours ($R/theme/templates__index.json line 1047 `support_hours`).
- Despre noi page ($R/pages/page-despre-noi.html), 355 article bodies ($R/shopify/articles-bodies/*.txt) and the BlogGenAI JSON-LD in $R/pages/article.html for any address/location mention.
- B2B store ($R/pages/b2b.html, b2b-product.html): title, footer, social links.
- Shopify Admin read-only: `get-shop-info`, `shop.billingAddress`, `locations`.
- Live (throttled, external hosts, 12 requests): ANAF registry; Trustpilot profile; Judge.me public store pages (2 paths); TikTok @primesupplements and @primesupplements.ro (embedded JSON); Instagram and Facebook (both handle variants); YouTube @primesupplementsro; HEAD on the footer address link https://www.primesupplements.ro/cart/.
- `gbp_deprecation_lint.py --file --json` on page-contact.html and home.html: 0 findings (no retired GBP chat CTAs, no *.business.site references).

**Could not check**: existence/state of a Google Business Profile or Bing/Apple listing (no WebSearch; Google Maps/consent pages not fetchable), Trustpilot (403 "Verifying Connection"), Instagram (429) and Facebook (login wall) handle validity, Google review count, geo-grid ranks, citation directories beyond ANAF.

## Score

**26/100** (dimension breakdown using the seo-local weights: GBP signals 0/25 - none and not eligible; Reviews & reputation 8/20 - Judge.me product reviews exist but single platform, no structured data; Local on-page 10/20 - NAP visible site-wide with tel:/mailto but no hours, no county/postal code, address linked to the cart; NAP consistency & citations 5/15 - six name forms, four address forms, three phone forms, Shopify profile incomplete; Local schema 2/10 - Organization without address/telephone and with a wrong sameAs; Local links 1/10 - none detectable).
Rationale: the low score reflects weak entity hygiene, not a missing local strategy; for an online-only retailer the realistic ceiling is the entity/NAP/Organization dimension, and every item below is a cheap fix. Local pack visibility is not a goal for this business and should not be pursued (LOCAL-11).

## What works
- NAP (legal name, CUI, J-number, phone, e-mail, street address) is present in the footer of every page type checked (34/34 copies incl. products, collections, articles, legal and /ro-hu/ duplicates) and twice on /pages/contact.
- Phone and e-mail are real links on every page: `<a href="tel:0775286584">` and `<a href="mailto:contact@primesupplements.ro">` (click-to-call works on mobile).
- The address and company data match the official ANAF record (street, number, town, county, CUI, J32/1155/2022 = J2022001155327): there is no *wrong* address anywhere, only incomplete/variant formatting.
- Support hours are stated on the homepage ("Luni până Vineri: 8:00 - 18:00, timp mediu de răspuns 1h") and a contact form exists on /pages/contact.
- An `https://anpc.ro/` consumer-protection link is in the footer of every page; T&C and Retur pages reference ANPC and the 14-day withdrawal form with the full legal identity.
- Judge.me is installed and review counts are server-rendered on supplement pages (creatina-creapure 17, pure-isolate 13, turmeric 14, unt-de-migdale 7, glycerol 6, baton-proteic-capsuni 4, creatina-mono 2 = 63 reviews on 7 sampled supplements).
- Organization JSON-LD has a stable `@id` (https://primesupplements.ro/#organization), logo and `sameAs`, so the fixes below are additive, not a rewrite.
- No deprecated GBP features referenced (lint clean).

## Findings

### LOCAL-01 - Organization schema carries no address, telephone, e-mail, legalName or VAT ID on any of ~1,150 URLs
- **Severity**: High
- **Evidence**: `$R/theme/snippets__schema-organization.liquid` (rendered in `<head>` by layout/theme.liquid on every page; identical copies in `$R/jsonld/home-0.jsonld`, `product-*-0.jsonld`, `collection-pudra-0.jsonld`, `article-bcaa-0.jsonld`) contains only `name`, `url`, `logo`, `description`, `foundingDate`, `sameAs` and a `contactPoint` with `contactType` + `availableLanguage`. grep of the snippet for `telephone|email|address|legalName|vatID|taxID|hoursAvailable|areaServed` returns only line 19 (`availableLanguage`). Across all 34 rendered copies: `PostalAddress` = 0, `"telephone"` = 0, `LocalBusiness` = 0, `Store` = 0. Meanwhile the same data is printed as plain text in the footer of every page ("PRIME SPORT SUPPLEMENTS SRL / 46260823 ; J32/1155/2022 / 0775286584 / contact@primesupplements.ro / Cisnadie, Str. Ioan Virgil Ispas, Nr. 17A") and the registry confirms it (ANAF: Str. Ioan Virgil Ispas 17A, Orş. Cisnădie, SIBIU, 555300, VAT payer).
- **Affected scope**: every indexable URL (575 + 575 /ro-hu/ duplicates in the sitemap) plus the B2B store (no Organization schema at all).
- **Recommendation**: replace the snippet with a merchant-grade Organization block, typed `["Organization","OnlineStore"]` (Google's Organization documentation supports OnlineStore and the merchant properties; do **not** use LocalBusiness/Store, the business has no customer-facing premises - see LOCAL-11). Pull values from Shopify settings after fixing LOCAL-05 so there is a single source of truth:
```liquid
{%- comment -%} snippets/schema-organization.liquid {%- endcomment -%}
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": ["Organization", "OnlineStore"],
  "@id": "{{ shop.url }}/#organization",
  "name": "{{ shop.name | escape }}",
  "legalName": "PRIME SPORT SUPPLEMENTS S.R.L.",
  "alternateName": ["Prime Sport Supplements", "PRIME SPORT SUPPLEMENTS SRL"],
  "url": "{{ shop.url }}",
  "logo": { "@type": "ImageObject", "url": "https://primesupplements.ro/cdn/shop/files/logo-prime-supplements.png", "width": 300, "height": 100 },
  "image": "https://primesupplements.ro/cdn/shop/files/logo-prime-supplements.png",
  "description": "{{ shop.description | default: 'Magazin online de suplimente sportive și îmbrăcăminte MNX din Cisnădie, Sibiu. Livrare în toată România.' | escape }}",
  "foundingDate": "2022-06-07",
  "founder": { "@type": "Person", "name": "Marius Chera", "sameAs": ["https://www.linkedin.com/in/chera23"] },
  "vatID": "RO46260823",
  "taxID": "46260823",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "{{ shop.address.street | escape }}",
    "addressLocality": "{{ shop.address.city | escape }}",
    "addressRegion": "{{ shop.address.province | escape }}",
    "postalCode": "{{ shop.address.zip | escape }}",
    "addressCountry": "{{ shop.address.country_code }}"
  },
  "telephone": "{{ shop.phone | escape }}",
  "email": "contact@primesupplements.ro",
  "areaServed": { "@type": "Country", "name": "RO" },
  "contactPoint": [{
    "@type": "ContactPoint",
    "contactType": "customer service",
    "telephone": "{{ shop.phone | escape }}",
    "email": "contact@primesupplements.ro",
    "areaServed": "RO",
    "availableLanguage": ["ro"],
    "hoursAvailable": { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "08:00", "closes": "18:00" }
  }],
  "sameAs": [
    "https://www.facebook.com/primesupplementsro",
    "https://www.instagram.com/primesupplements_ro/",
    "https://www.tiktok.com/@primesupplements.ro",
    "https://www.youtube.com/@primesupplementsro"
  ]
}
</script>
```
  Expected rendered values after LOCAL-05: streetAddress "Str. Ioan Virgil Ispas, Nr. 17A", addressLocality "Cisnădie", addressRegion "Sibiu", postalCode "555300", addressCountry "RO", telephone "+40775286584". Optionally add `hasMerchantReturnPolicy` (14-day withdrawal window per Politica de retur; confirm `returnFees` with the merchant before publishing) so the Organization-level return policy applies to all products.
- **Falsifiability**: after deployment, Rich Results Test on https://primesupplements.ro/ shows an Organization entity with address, telephone, vatID; `curl -s https://primesupplements.ro/ | grep -c PostalAddress` returns 1 (not 0).
- **Leading indicator**: GSC "Merchant listings"/"Organization" structured data reports show 0 errors; Google Merchant Center "Business information" matches the site without manual edits; knowledge-panel candidate data (address, phone) appears consistently in AI assistants' answers about "Prime Supplements Cisnădie".
- **Effort**: S
- **Confidence**: 0.95

### LOCAL-02 - `sameAs` sends Google to the wrong TikTok account; Facebook/Instagram handles in schema differ from the footer; YouTube missing
- **Severity**: High
- **Evidence**: schema `sameAs` = `facebook.com/primesupplements.ro`, `instagram.com/primesupplements.ro`, `tiktok.com/@primesupplements`. Footer social links on every page = `facebook.com/primesupplementsro`, `instagram.com/primesupplements_ro/`, `tiktok.com/@primesupplements.ro`, `youtube.com/@primesupplementsro`. 0 of 3 schema URLs match the footer. Live verification (embedded page JSON): `@primesupplements` -> `uniqueId: primesupplements`, `followerCount: 3`, `videoCount: 1`, empty signature (an unrelated/abandoned handle); `@primesupplements.ro` -> `nickname: PrimeSupplements`, `followerCount: 4285`, `videoCount: 91`, signature "Suplimente de calitate destinate culturistilor si pasionatilor de fitness" (the real brand account). YouTube `@primesupplementsro` -> 200, title "Prime Supplements - YouTube" (real channel, absent from sameAs). Facebook (login wall, 200) and Instagram (429) could not be resolved; both have a `.ro` variant in schema vs a different variant in the footer, so at most one of each pair is right.
- **Affected scope**: every URL (Organization block is global); entity reconciliation for the brand in Google's knowledge graph and in AI answer engines.
- **Recommendation**: use the footer handles in `sameAs` (they are the merchant-maintained theme settings and the TikTok one is proven correct), add YouTube, and verify the Facebook and Instagram pairs in a browser before publishing (open both URLs; keep the one that shows the brand's posts). Then source the list from theme settings instead of hard-coding: `{{ settings.social_facebook }}`, `{{ settings.social_instagram }}`, `{{ settings.social_tiktok }}`, `{{ settings.social_youtube }}` (Impact exposes these setting ids in config/settings_schema.json; confirm exact keys there).
- **Falsifiability**: after the fix, `grep -o 'tiktok.com/@[a-z.]*' <(curl -s https://primesupplements.ro/)` returns only `@primesupplements.ro` (twice: schema + footer).
- **Leading indicator**: Google knowledge panel / "Prime Supplements" brand SERP shows the 4,285-follower TikTok and the YouTube channel in the social row.
- **Effort**: S
- **Confidence**: 0.9

### LOCAL-03 - Footer street address is a link to `https://www.primesupplements.ro/cart/#` on every page
- **Severity**: Medium
- **Evidence**: footer HTML (home.html, identical on all 34 copies): `<a href="https://www.primesupplements.ro/cart/#">Cisnadie, Str. Ioan Virgil Ispas, Nr. 17A</a>`. Live HEAD: `https://www.primesupplements.ro/cart/` -> 301 -> `https://primesupplements.ro/cart`. So the only address element on the site is an internal link to the cart page, via the www host (an extra redirect hop), on ~1,150 URLs, with the address text as anchor. Footer text is rich-text set in the Impact footer section (sections/footer.liquid `footer__block--text`), not in the Liquid file.
- **Affected scope**: all pages (footer); also inflates internal links to /cart (a robots-disallowed URL) by one per page.
- **Recommendation**: in Theme editor > Footer > "Informatii de contact" text block, remove the hyperlink from the address (or link it to `/pages/contact`). Do not link to a Google Maps pin (there is no customer-facing location). Write the address in full: "Str. Ioan Virgil Ispas nr. 17A, Cisnădie 555300, jud. Sibiu, România".
- **Falsifiability**: `grep -c 'primesupplements.ro/cart/#' home.html` = 0 after the change.
- **Leading indicator**: GSC Links report no longer lists /cart among the top internally linked pages.
- **Effort**: S
- **Confidence**: 0.95

### LOCAL-04 - NAP is written six different ways for the name, four for the address and three for the phone; one legal page names a company that does not exist
- **Severity**: Medium
- **Evidence** (source -> exact strings):
  - ANAF registry (truth): "PRIME SPORT SUPPLEMENTS S.R.L." / "JUD. SIBIU, ORŞ. CISNĂDIE, STR. IOAN VIRGIL ISPAS, NR.17A" / postal code 555300 / VAT payer.
  - Footer (all pages): "PRIME SPORT SUPPLEMENTS SRL" / "46260823 ; J32/1155/2022" / "0775286584" / "Cisnadie, Str. Ioan Virgil Ispas, Nr. 17A" (no diacritics, no county, no postal code, no country, CUI without the RO VAT prefix).
  - /pages/contact "Informații contact" block: no company name at all; "Adresa: Cisnadie, Str. Ioan Virgil Ispas, Nr. 17A / Telefon: 0775286584".
  - politica-de-cookies: **"Prime Supplements S.R.L., cu sediul în Cisnădie, Str. Ioan Virgil Ispas, Nr. 17A"** - this legal name does not exist in the registry; phone "0775 286 584"; "site-ul www.primesupplements.ro".
  - politica-de-plata, politica-de-livrare: "Telefon: 0775 286 584 / Adresă: Cisnădie, Str. Ioan Virgil Ispas, Nr. 17A / Website: www.primesupplements.ro" (www host, while the canonical host is non-www).
  - termeni-și-condiții, politica-de-confidentialitate, politica-de-retur: "PRIME SPORT SUPPLEMENTS S.R.L., cu sediul social în STR. IOAN VIRGIL ISPAS, NR.17A, Cisnădie, Sibiu" (county present, no postal code, no phone); T&C also says "PRIME SUPPLEMENTS nu este responsabil".
  - despre-noi: "Marius Chera a conceput firma PRIME SUPPLEMENTS in anul 2022".
  - Organization schema: name "Prime Supplements", no legalName.
  - Shopify shop profile: phone "+40775286584", zip 555300, province Sibiu, city "" (see LOCAL-05).
  - B2B store title/footer: "PRIME SPORT SUPPLEMENTS SRL / 46260823" (see LOCAL-06).
  Totals: name forms = 6 (Prime Supplements; PRIME SPORT SUPPLEMENTS SRL; PRIME SPORT SUPPLEMENTS S.R.L.; Prime Supplements S.R.L.; PRIME SUPPLEMENTS; PRIME SPORT SUPPLEMENTS SRL / 46260823); address forms = 4; phone forms = 3 (0775286584, 0775 286 584, +40775286584); postal code 555300 appears on 0 public pages; county "Sibiu" on 3 of 11 pages and 0 of the footer/contact.
- **Affected scope**: footer (all pages), /pages/contact, 6 legal pages, schema, B2B store.
- **Recommendation**: adopt one canonical NAP string and paste it everywhere (footer rich text, contact page, the "Contact" paragraph of the 6 legal pages, Organization schema, B2B footer): **"PRIME SPORT SUPPLEMENTS S.R.L. (Prime Supplements) · CUI RO46260823 · Reg. Com. J32/1155/2022 · Str. Ioan Virgil Ispas nr. 17A, Cisnădie 555300, jud. Sibiu, România · Tel. +40 775 286 584 · contact@primesupplements.ro"**. Fix the cookie policy's "Prime Supplements S.R.L." to the real legal name. Replace "www.primesupplements.ro" with "primesupplements.ro" in the three policy pages. Keep `tel:+40775286584` as the link target (E.164) while displaying "+40 775 286 584".
- **Falsifiability**: `grep -ril "Prime Supplements S.R.L." $R/shopify/pages.json` returns nothing; `grep -c 555300` on the live contact page > 0; the three phone spellings collapse to one across pages.json + footer.
- **Leading indicator**: AI assistants and Google's "About this result"/knowledge data return the legal name and the full address without variants; Merchant Center "Business information" verification passes on first attempt.
- **Effort**: S
- **Confidence**: 0.95

### LOCAL-05 - Shopify store profile address is incomplete (city empty, street without number) and the fulfilment location has no address at all
- **Severity**: Medium
- **Evidence**: Admin GraphQL `shop.billingAddress` = `{ address1: "Strada Ioan Virgil Ispas", address2: "", city: "", province: "Sibiu", provinceCode: "SB", zip: "555300", country: "Romania", phone: "+40775286584", company: null, latitude: 45.7680655, longitude: 24.1484982 }`. `locations.nodes[0]` = `{ name: "Shop location", isActive: true, fulfillsOnlineOrders: true, address: { address1: null, city: null, zip: null, phone: null, latitude: null, longitude: null, country: "Romania" }, localPickupSettingsV2: null }`. `get-shop-info`: store name "Prime Supplements", contact e-mail contact@primesupplements.ro, account e-mail a personal outlook.com address.
- **Affected scope**: everything that reads the store profile - order confirmation e-mails and invoices, Shop app merchant card, Google & YouTube channel / Merchant Center business info, shipping-origin rate calculation (origin location with no address), any future `{{ shop.address }}` Liquid output (the recommended source for LOCAL-01).
- **Recommendation**: Settings > General > Store details: address1 "Str. Ioan Virgil Ispas, Nr. 17A", city "Cisnădie", zip 555300, province Sibiu, company "PRIME SPORT SUPPLEMENTS S.R.L.". Settings > Locations > "Shop location": set the same address (rename to "Depozit Cisnădie") so the fulfilment origin is geocoded; leave local pickup OFF unless the merchant genuinely wants to receive customers (see LOCAL-11). Move the account e-mail to a company mailbox (notification hygiene, not SEO).
- **Falsifiability**: re-running the same GraphQL query returns a non-empty `city` for the shop and non-null `address1/zip` for the location.
- **Leading indicator**: Merchant Center shows no "business address" warnings; shipping rates stop defaulting to country-level origin.
- **Effort**: S
- **Confidence**: 0.95

### LOCAL-06 - The indexable B2B store presents a different entity: legal name + CUI as the brand, no address/phone, and social links pointing to Shopify's own accounts
- **Severity**: Medium
- **Evidence**: `$R/pages/b2b.html` `<title>` = "PRIME SPORT SUPPLEMENTS SRL / 46260823"; footer "© 2026 PRIME SPORT SUPPLEMENTS SRL / 46260823, Susținut de Shopify"; counts: Ispas = 0, 0775286584 = 0, `tel:`/`mailto:` = 0 on b2b.html and b2b-product.html. Social links on b2b.html: `http://facebook.com/shopify`, `http://instagram.com/shopify`, `https://tiktok.com/@shopify`, `https://www.youtube.com/shopify`, `https://x.com/shopify` (theme placeholder defaults never replaced). The B2B store is crawlable and indexable with no canonical to the main site (context file).
- **Affected scope**: b2b.primesupplements.ro (58 product URLs + pages), brand entity consolidation between the two domains.
- **Recommendation**: in the B2B store: set store name "Prime Supplements B2B", add the canonical NAP (LOCAL-04) to the footer with `tel:`/`mailto:` links, replace the five placeholder social URLs with the real handles (or remove them), and add an Organization block whose `@id` is the main site's `https://primesupplements.ro/#organization` with `parentOrganization`/`url` pointing to the main domain so both stores resolve to one entity. (Index/canonical handling of the B2B duplicates belongs to the technical/ecommerce findings.)
- **Falsifiability**: `curl -s https://b2b.primesupplements.ro/ | grep -c 'facebook.com/shopify'` = 0; the B2B footer contains "555300".
- **Leading indicator**: brand SERP for "prime sport supplements srl" shows the main site, not the B2B placeholder entity.
- **Effort**: S
- **Confidence**: 0.9

### LOCAL-07 - Reviews exist only inside the Judge.me widget: no aggregateRating/Review in any JSON-LD, single platform, no Google/Trustpilot presence found
- **Severity**: Medium
- **Evidence**: server-rendered `data-number-of-reviews` in product HTML: creatina-creapure 17, pure-isolate-2000g 13, turmeric-extract-80-caps 14, unt-de-migdale 7, glycerol-max-pump 6, baton-proteic-capsuni 4, creatina-monohidrat 2; 0 on all 7 sampled MNX apparel products and on instant-drink-frutilu; `data-average-rating="0.00"` everywhere (rating is injected client-side). `aggregateRating` count = 0 in all 16 product copies and in `snippets__schema-product-enhanced.liquid`; Judge.me's own rich-snippet JSON-LD is not in the HTML (context file). Homepage carousel ("Let customers speak for us", untranslated) renders `data-number-of-reviews="0"` server-side. Live: Trustpilot profile fetch blocked (403 anti-bot page; existence unverifiable), Judge.me public store page 404 at `/reviews/stores/primesupplements.ro` and `/reviews/stores/primesupplements1` (public reviews page not enabled). No link to Google reviews or any third-party review platform anywhere on the site. Per the plugin benchmark, consumers consult ~6 platforms and 74 % only trust reviews from the last 3 months; review *recency* cannot be assessed from the static HTML.
- **Affected scope**: 85 supplement products (reviews exist, not exposed to search), 100 MNX products (no reviews at all), homepage.
- **Recommendation**: (1) enable Judge.me "Rich snippets / structured data" (Judge.me > Settings > SEO) so `aggregateRating` + `review` are emitted, and, when the custom Product snippet is repaired (schema findings), merge `product.metafields.judgeme.rating`/`rating_count` (Judge.me writes `reviews.rating` and `reviews.rating_count` metafields) into the Product JSON-LD rather than keeping two Product blocks; (2) enable Judge.me's public store reviews page and its "All reviews" count badge in the header so the 60+ reviews are visible site-wide; (3) translate the carousel heading via Judge.me > Widgets > Text; (4) a second platform is optional for an online-only shop - if any is added, prefer Trustpilot (indexable, cited by AI assistants) over a GBP, which this business is not eligible for; (5) never gate reviews (Google fake-engagement policy).
- **Falsifiability**: Rich Results Test on /products/creatina-creapure shows a Product with aggregateRating (17 reviews) and no parse error.
- **Leading indicator**: GSC "Review snippets" report > 0 valid items; star ratings visible on product SERPs within 2-4 weeks.
- **Effort**: S
- **Confidence**: 0.85

### LOCAL-08 - Contact page has no H1, no meta description, no business hours, no company identity and no map/directions context; the support hours live only in a homepage FAQ accordion
- **Severity**: Low
- **Evidence**: `$R/parsed/pages_page-contact.json`: title "Contact", meta_description null, h1 [], h2 [], word_count 221; canonical https://primesupplements.ro/pages/contact; duplicated at https://primesupplements.ro/ro-hu/pages/contact (both in sitemap). Visible block: "Contacteaza-ne / Ai întrebări? / Informații contact / Adresa: Cisnadie, Str. Ioan Virgil Ispas, Nr. 17A / Telefon: 0775286584 / Email: contact@primesupplements.ro" + form; iframes = 0, Google Maps links = 0, hours = 0 ("Luni pânã Vineri" count on contact page = 0). The hours string exists only as `templates__index.json` line 1047 `"support_hours": "Serviciul nostru de relații cu clienții este disponibil de Luni pânã Vineri: 8:00 - 18:00"` (rendered on home.html and homepage-ro-hu.html only). Despre-noi also has no meta description and no H1 (context file).
- **Affected scope**: /pages/contact (+ /ro-hu/ copy), /pages/despre-noi.
- **Recommendation**: contact page: H1 "Contact Prime Supplements", meta description "Contactează Prime Supplements (PRIME SPORT SUPPLEMENTS S.R.L., Cisnădie, Sibiu): telefon +40 775 286 584, e-mail contact@primesupplements.ro, luni-vineri 8:00-18:00. Livrare în toată România." (under 155 chars); add the canonical NAP block (LOCAL-04) with the legal name and CUI, the support hours and response-time line copied from the homepage FAQ, the delivery scope ("livrăm doar în România, prin curier"), and the return/ANPC links. Do not embed a map: the address is a registered office, a map invites visits the business does not serve. No LocalBusiness markup; the Organization block (LOCAL-01) covers the entity.
- **Falsifiability**: parse_html.py on the live contact page returns a non-empty h1 and meta_description and the text contains "8:00 - 18:00".
- **Leading indicator**: GSC impressions/CTR for "prime supplements contact|telefon" queries rise; fewer "unde sunteți" questions via chat/e-mail.
- **Effort**: S
- **Confidence**: 0.9

### LOCAL-09 - Organization `foundingDate` "2020" contradicts the registry (2022-06-07) and the About page ("in anul 2022")
- **Severity**: Low
- **Evidence**: snippet line `"foundingDate": "2020"`; ANAF `data_inregistrare: 2022-06-07`, `nrRegCom: J2022001155327` (= J32/1155/2022 as printed in the footer); despre-noi text "Marius Chera a conceput firma PRIME SUPPLEMENTS in anul 2022".
- **Affected scope**: Organization block on every page.
- **Recommendation**: set `"foundingDate": "2022-06-07"` (or "2022" if the brand predates the company and the merchant wants the brand date - then state that on the About page too, so page and schema agree).
- **Falsifiability**: the live JSON-LD and the About page state the same year.
- **Leading indicator**: none directly; consistency check only.
- **Effort**: S
- **Confidence**: 0.9

### LOCAL-10 - `contactPoint.availableLanguage` claims Hungarian support and no `areaServed` is declared, while the site has no published Hungarian locale and delivers only inside Romania
- **Severity**: Low
- **Evidence**: snippet line 19 `"availableLanguage": ["Romanian", "Hungarian"]`; context file: Hungarian locale exists but is UNPUBLISHED, /ro-hu/ market serves Romanian content in RON; T&C: "Livrarea Produselor se poate efectua doar pe teritoriul României". No `areaServed` anywhere in the schema.
- **Affected scope**: Organization block on every page; market/hreflang configuration (owned by the technical findings).
- **Recommendation**: `"availableLanguage": ["ro"]` (BCP-47 code rather than the English word) until a Hungarian locale is actually published and staffed; add `"areaServed": {"@type": "Country", "name": "RO"}` at Organization level and on the ContactPoint; align the market setup with the T&C (either remove the "Ungaria" market or amend the delivery clause).
- **Falsifiability**: live JSON-LD shows `availableLanguage: ["ro"]` and `areaServed`.
- **Leading indicator**: none; prevents an inconsistent entity claim.
- **Effort**: S
- **Confidence**: 0.85

### LOCAL-11 - No Google Business Profile / Bing Places / Apple signals on the site, and the business is not eligible for them as an online-only store: do not create one
- **Severity**: Info
- **Evidence**: 0 Maps embeds, 0 place IDs, 0 GBP links, 0 Google-review widgets across all 34 copies; no opening hours for a physical location; Admin: single location with null address and `localPickupSettingsV2: null`; T&C: courier delivery only; ANAF CAEN 4638 (wholesale). Google's Business Profile guidelines require in-person contact with customers at the listed address or at their location during stated hours; a listing for a residential registered office with no visits is a policy violation and a suspension risk (duplicate/ineligible listings are the #2 negative factor in the plugin's Whitespark 2026 table). The existence of an already-created GBP could not be verified (no WebSearch; Google Maps not fetchable).
- **Affected scope**: whole business; also the B2B store.
- **Recommendation**: (a) if a GBP already exists for the Cisnădie address, either make it legitimately eligible (enable local pickup at the Cisnădie location with real staffed hours, and only then add `openingHoursSpecification` and a map) or close it; (b) otherwise invest the "local" budget in Google Merchant Center (free listings + Shopping tab, which is the local-intent surface for an online shop in Romania), the Organization block (LOCAL-01) and review structured data (LOCAL-07). Bing Places and Apple Business have the same eligibility rule; skip them. If the merchant ever opens a showroom or pickup point, revisit with a `Store` subtype in a separate LocalBusiness node linked via `parentOrganization` to `#organization` - not before.
- **Falsifiability**: the merchant confirms whether a GBP exists; if yes, check it has in-person service enabled; if no, no action.
- **Leading indicator**: Merchant Center product approval rate and "free listings" clicks instead of local-pack impressions.
- **Effort**: S
- **Confidence**: 0.8

### LOCAL-12 - No local authority/citation signals beyond the statutory registry; founder entity not linked; deprecated-GBP lint clean
- **Severity**: Info
- **Evidence**: 0 of 355 article bodies mention "Sibiu" or "Cisnădie"; 0 mentions of chambers of commerce, local press, sponsorships or local events on home/despre-noi/articles; the only external authority reference is `https://anpc.ro/` in the footer. The founder Marius Chera is named on despre-noi and as author in 335 articles with `www.linkedin.com/in/chera23` cited in 337 articles, but no `founder`/`Person` relation exists in the Organization block. `gbp_deprecation_lint.py` on contact + home: `"findings": []`.
- **Affected scope**: entity/E-E-A-T linkage (overlaps with content and GEO findings, not duplicated here).
- **Recommendation**: add `founder` (Person, sameAs LinkedIn) to the Organization block (already in the LOCAL-01 snippet) and link despre-noi to the author bio; local citations are not worth building for an online-only shop - the registry listing (ANAF/ONRC data is syndicated by listafirme.ro, termene.ro, risco.ro automatically) is sufficient and already matches the site. Only pursue local press/sponsorship (Sibiu gyms, competitions - Marius Chera is positioned as a bodybuilding coach) as part of digital PR, not as a local-pack tactic.
- **Falsifiability**: n/a (informational).
- **Leading indicator**: brand-name + founder-name co-mentions in AI answers.
- **Effort**: S
- **Confidence**: 0.8

### LOCAL-13 - Consumer-dispute links: only a generic `https://anpc.ro/` link in the footer; the ANPC SAL page is not linked
- **Severity**: Info
- **Evidence**: footer links on home.html: exactly one `href="https://anpc.ro/"`; no link to the ANPC SAL (alternative dispute resolution) page; T&C text: "vă puteți adresa și Autorității Naționale pentru Protecția Consumatorilor (ANPC) ... la adresele indicate pe ...". (The EU ODR platform was shut down in July 2025, so the former ODR link is no longer expected; verify the current ANPC guidance before changing.)
- **Affected scope**: footer on all pages; trust/compliance signal only, no ranking effect.
- **Recommendation**: link the ANPC SAL page (https://anpc.ro/ce-este-sal/) next to the existing ANPC link, using the official pictogram, as Romanian e-commerce practice requires; keep both links `rel="nofollow"`-free (they are statutory, not sponsored).
- **Falsifiability**: footer contains a link whose href contains "anpc.ro/ce-este-sal".
- **Leading indicator**: none.
- **Effort**: S
- **Confidence**: 0.6

## Limitations
- No WebSearch/DataForSEO: could not confirm whether a Google Business Profile, Bing Places or Apple listing already exists for "Prime Supplements" / "Prime Sport Supplements SRL", nor Google review count/rating, nor any geo-grid or local-pack position (irrelevant for an online-only store, but unverified).
- Trustpilot returned 403 (anti-bot) - presence/absence of a Trustpilot profile is unknown. Instagram (429) and Facebook (login wall) could not confirm which of the two handle variants is live; TikTok and YouTube were verified.
- Judge.me ratings are injected client-side; only review counts (not star averages or recency) were readable from static HTML.
- Review recency/velocity, owner responses and sentiment could not be assessed without rendering or the Judge.me API.
- Shopify Admin data was read-only (shop, locations); no settings were changed. Footer text and social handles are theme section settings (settings_data.json was not in the evidence set), so recommendations reference the Theme editor rather than Liquid files.
- Plugin fetch scripts (render_page.py, fetch_page.py) cannot run in this sandbox; all page analysis used the local copies plus 12 throttled curl requests to external hosts.
