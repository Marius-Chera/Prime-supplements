# Own creatine presence audit — primesupplements.ro (read-only)

Date: 15.10.2026, ~18:00 EEST. Scope: PRODUCT A `creatina-creapure` (gid://shopify/Product/14971467268471), PRODUCT B `creatina-monohidrat-micronized-300g-fara-aroma` (gid://shopify/Product/15404872368503), COLLECTION `creatina` (gid://shopify/Collection/671131369847), blog gid://shopify/Blog/116352287095, calendar, reviews, technical.
Sources: live HTML re-fetched with curl at 18:04 (saved under `live/audit/`), Admin API 2026-01 reads, `top50/final/*.json` (today's applied baseline), `calendar_current.txt`, sitemaps, robots.txt, 126 live article pages (`live/articles/`), Admin bodies of the 16 published creatine articles (`live/audit/article_bodies_{1,2,3}.json`). Nothing was changed in the store.

## 0. Executive summary (what matters most)

1. **Product B is structurally handicapped by its template.** `product.creatina2` has no „Descriere” block and its „Despre produs” tab is a hard-coded page (`/pages/creatina-custom`, Page 704641139063, via `custom.despre_produs_custom`). So the compliant `descriptionHtml` (3 677 chars) and `custom.despre_produs` are invisible, and the full mandatory disclaimer („Supliment alimentar… A nu se lăsa la îndemâna și la vederea copiilor mici…”) is NOT visible anywhere on page B. Visible unique copy on B ≈ 820 words vs ≈ 1 400 on A. The hard-coded block also carries marketing wording („Hardcore Sports Nutrition”, „Fără aditivi”, „ingrediente de umplutură”) and an H2 in capitals. Fix = template/section decision for the owner (switch B to the default product template, or add the „Descriere” block and route the tab to `custom.despre_produs`).
2. **`/pages/creatina-custom` is a live, indexable, thin duplicate** (85 words, self-canonical, in the pages sitemap, SEO title „Creatină monohidrată micronizată – un singur ingredient | Prime”) competing with product B for „creatină monohidrată micronizată”. Hide from search (noindex/`seo.hidden`) — unpublishing would probably break the tab.
3. **The 11 older creatine articles (Apr–Jul 2026) are non-compliant and are our main organic creatine content.** Every one uses „forță”, „masă musculară”, „recuperare”, „energie”, „cognitiv/creier”, loading phases of 20 g/zi, „sigură”, „cea mai pură”, „puritate testată de terți”, „Descoperă Creatina de Puritate Farmaceutică →” etc.; `cum-se-ia-creatina` answers „Care firmă de suplimente are cea mai bună creatină?” with self-praise; two titles carry claims („…beneficii pentru masă musculară…”, „…de ce scade forța și cum ajută”). They link to the products through hard-coded cards that still show the OLD English product names („CREATINE MONOHYDRATE 300g/60serv”, „Creatine (Creapure®)”) with „Cumpără Acum / Vezi Produsul →” anchors, up to 13 links to one product per article. The two September guides (`creatina-creapure-ghid`, `plicuri-creatina-ready-to-go`) are near-compliant. A compliance rewrite of the 11 (claims, cards, anchors, alts, titles) is the single biggest content job.
4. **Reviews**: A = 5.0 (18) — fine, review bodies are server-rendered; B = 3.0 (2): the 1-star „review” is a question („Are certificare GMP sau NSF?”) from an unverified visitor and the 5-star has body „.”. That 3.0 is in B's JSON-LD `aggregateRating` → 3-star rich result risk. Needs Judge.me housekeeping + review requests to B buyers. Widget strings are in English („Customer Reviews”, „Based on 18 reviews”, „Write a review”).
5. **Collection page is thin by design** (69 words) and the stored `custom.seo_text` is an OLD non-compliant text (forță, masă, recuperare, cognitiv, HCL, capsule, „dovedite științific”) that the theme does not render — replace or delete it so it can never be surfaced. The banner mentions the Ready To Go sachets without linking them.
6. Product pages: no link to https://www.creapure.com (allowed), no links to any guide, no FAQPage/ProductGroup schema (theme), the SEO section sits below three cross-sell sections and the reviews, A has only two images (500 g front + creapure.com screenshot; no 300 g tub, no RO back label, no powder/scoop shot) and lacks the Shopify category attributes and `google_product_category` that B has.
7. Technical base is clean: 200 + self-canonical for both products and the collection, both in `sitemap_products_1.xml` with image entries, collection in `sitemap_collections_1.xml`, robots.txt blocks sort/multi-filter crawl traps, sort/filter/in-collection/variant URLs canonicalise correctly, `lang=ro`, no hreflang (single market), Organization + Product + BreadcrumbList + CollectionPage/ItemList JSON-LD present. Store data on both products = today's reviewed baseline (`top50/final`), nothing drifted.

---

## 1. Live page audit

### 1.1 PRODUCT A — https://primesupplements.ro/products/creatina-creapure

| Item | Value |
|---|---|
| HTTP / canonical | 200, `https://primesupplements.ro/products/creatina-creapure` (self) |
| `<title>` | „Creatină Creapure® monohidrată 300/500 g \| Prime Supplements” — 60 chars ✓ |
| meta description | „Creatină Creapure®: pulbere cu un singur ingredient, creatină monohidrată Creapure®. Tub de 300 g (60 de porții) sau 500 g (100 de porții), 3–5 g pe zi.” — 152 chars ✓ |
| robots meta / lang / hreflang | none (indexable) / `ro` / none |
| OG | og:title = product title (not SEO title), og:type product, og:url self, og:image 500 g front, product:price:amount „180,00” RON (first variant = 500 g), twitter:card summary_large_image |
| H1 | „Creatină monohidrat micronizată Creapure®” |
| Heading order | H1 → (inside collapsed „Descriere” = descriptionHtml) H2 Pe scurt, H2 Ingrediente, H3 Cantități declarate, H2 Detalii produs → (tabs) H3 Cantități declarate ×2 (desktop tabs + mobile accordion both render) → H2 S-ar putea să-ți placă → H2 Customer Reviews (Judge.me, English) → H2 Cele mai vândute → H2 Categorii populare → **SEO section**: H2 „Creatină Creapure®: un singur ingredient, în tub de 300 g sau 500 g”, H3 Ce este Creapure®, H3 Cum o folosești, H3 Pentru cine este, H3 Creapure® sau celelalte forme de creatină Prime, H3 Întrebări frecvente |
| Word counts | Descriere 454 · Tab 1 Beneficii cheie 109 · Tab 2 Despre produs 200 · Tab 3 Ingrediente 61 · Tab 4 Detalii produs 79 · SEO section 491 · whole `<main>` 2 387 (incl. duplicated mobile accordion and cross-sell) |
| Content links | `/collections/creatina` (Despre, anchor „creatină monohidrată”); `/products/creatina-monohidrat-micronized-300g-fara-aroma` and `/products/creatine-ready-to-go-plicuri-prime-supplements` (SEO section). **No** link to creapure.com, **no** link to any guide. Nav/footer link the collection (5 hrefs in page). |
| JSON-LD | (1) `@graph` Organization+OnlineStore (legalName, VAT, address, founder, contactPoint, sameAs); (2) `Product`: name, description = stripped descriptionHtml (2 886 chars), 2 images, brand, category „Creatină”, `aggregateRating` 5.0/18, 2 `Offer`s (variant url, English variant name, price, priceValidUntil 2027-10-15, InStock, sku+gtin per offer, seller, `hasMerchantReturnPolicy` 14 d, `shippingDetails` 20 RON, 0–1 d handling, 1–3 d transit); **no product-level sku/gtin** (only per offer), no `ProductGroup/hasVariant`, no `Review` items; (3) `BreadcrumbList` Pagina principală › Creatină › product. **No FAQPage** (theme-only). |
| Alt texts (media) | ✓ „Creatină Creapure® Prime Supplements, tub negru de 500 g cu 100 de porții și etichetă roșu cu negru, din față” / „Captură de pe creapure.com: Prime Supplements, România, listat cu produsul Creatina, tub de 500 g made of Creapure®”. 26 `<img>` in main, 0 empty alts. |
| Judge.me | badge + full widget server-rendered (review texts in HTML, 5/18 visible, paginated) ✓; headings/strings in English. |
| Forbidden strings | 0 hits for purest / Pro Nutrition / Dej / competitor brands; 0 cedilla diacritics in main. |

### 1.2 PRODUCT B — https://primesupplements.ro/products/creatina-monohidrat-micronized-300g-fara-aroma

| Item | Value |
|---|---|
| HTTP / canonical | 200, self |
| `<title>` | „Creatină monohidrată micronizată 300 g \| Prime Supplements” — 58 chars ✓ |
| meta description | „Creatină monohidrată micronizată fără aromă: tub de 300 g, 60 de porții de 5 g, 5000 mg creatină pe porție, un singur ingredient, măsură inclusă.” — 145 chars ✓ |
| robots / lang / hreflang | none / `ro` / none |
| OG | og:title = product title, og:type product, price „93,00” RON, og:image front |
| H1 | „Creatină monohidrat micronizată – fără aromă, 300 g” |
| Heading order | H1 → H2 „CREATINĂ MONOHIDRATĂ MICRONIZATĂ” (hard-coded tab, capitals) → H3 Cantități declarate → (mobile duplicate) H2 „CREATINĂ MONOHIDRATĂ MICRONIZATĂ”, H3 Cantități declarate → H2 S-ar putea să-ți placă → H2 Customer Reviews → H2 Cele mai vândute → H2 Categorii populare → **SEO section**: H2 „Creatină monohidrată micronizată: 5000 mg pe porție, fără aromă”, H3 Ce înseamnă creatină micronizată, H3 Cum o prepari, H3 Trei forme de creatină Prime: cum alegi, H3 Întrebări frecvente |
| Template | `product.creatina2` — **no „Descriere” block**; Tab 2 renders Page 704641139063 („Creatina custom”, handle `creatina-custom`, template `creatina-despre-produs`, empty body, content hard-coded in the section). |
| Word counts | Descriere — **not rendered** (descriptionHtml 3 677 chars invisible) · Tab 1 Beneficii cheie 107 · Tab 2 Despre produs **86 (hard-coded; `custom.despre_produs` not shown)** · Tab 3 Ingrediente 61 · Tab 4 Detalii produs 138 · SEO section 425 · `<main>` 1 658 |
| Hard-coded Tab 2 text | „PRIME Supplements® · Hardcore Sports Nutrition / CREATINĂ MONOHIDRATĂ MICRONIZATĂ / Un singur ingredient. Pentru rutina ta de antrenament. / … fără arome, aditivi sau ingrediente de umplutură. / Micronizată · Fără aromă · Fără aditivi · 100% Creatină monohidrată. O formulă simplă… / 300 g / 60 de porții …” + link „platforma B2B” → `/pages/inregistrare-b2b` + image alt „Creatină monohidrată micronizată PRIME Supplements, 300 g”. |
| Visible legal text | Visible: „a nu se depăși doza recomandată pentru consumul zilnic”, „nu se recomandă copiilor și femeilor în perioada de sarcină sau alăptare”, „Suplimentele alimentare nu înlocuiesc o dietă variată…” (SEO section). **Not visible**: „Supliment alimentar.” lead-in and „A nu se lăsa la îndemâna și la vederea copiilor mici.” (they live only in descriptionHtml/despre_produs). |
| Content links | hard-coded tab → `/pages/inregistrare-b2b`; SEO section → `/products/creatina-creapure`, `/products/creatine-ready-to-go-plicuri-prime-supplements`. **No visible link to `/collections/creatina`** (the one in despre_produs is not rendered; breadcrumb/nav only). No guide links. |
| JSON-LD | Organization graph; `Product` with 3 images, product-level sku+gtin 6421766064107, category „Creatină”, `aggregateRating` **3.0/2**, 1 Offer 93 RON (+return/shipping details); BreadcrumbList. No FAQPage. |
| Alt texts (media) | ✓ 3 descriptive alts (front / back label RO+EN / side label). 28 `<img>` in main, 0 empty. |
| Judge.me | widget rendered; shows the 1-star „Are certificare GMP sau NSF?” and the „.” 5-star; data-product-title still „CREATINE MONOHYDRATE 300g/60serv” (stale Judge.me product title). |
| Forbidden strings | 0 hits; 0 cedillas. |

### 1.3 COLLECTION — https://primesupplements.ro/collections/creatina

| Item | Value |
|---|---|
| HTTP / canonical | 200, self |
| `<title>` | „Creatină monohidrată: pudră și plicuri \| Prime Supplements” — 58 ✓ |
| meta description | 154 chars ✓ |
| OG | og:title „Creatină” (collection title), og:type website, og:image collection image |
| H1 / headings | H1 „Creatină” → H2 „Alte categorii” → H2 „Ghiduri și sfaturi utile”. No other text headings. |
| Banner description | 2 `<p>`, 40 + 29 = **69 words** ✓ (≤ 80). Links A („creatină Creapure®”) and B („creatină monohidrată micronizată fără aromă”); **Ready To Go sachets are named but not linked**. |
| Grid | 3 active products (A, B, Ready To Go). |
| Guides section | 3 cards: `ce-este-creatina`, `cum-se-ia-creatina`, `in-cat-timp-face-efect-creatina`; their image alts are old AI patterns: „creatine side effects - Creatina pentru Masă Musculară: Ce Spune Știința vs Mituri în 2026”, „best creatine monohydrate - Dozajul optim de creatină pentru rezultate maxime în 2026”, „creatina si volumizarea musculara - 30 de zile cu creatină: Când apar primele rezultate în 2026” (English keywords + claims, shown on the collection page). |
| JSON-LD | Organization graph; `CollectionPage` (description truncated mid-word „…Respectă”), `ItemList` 3 items, `BreadcrumbList`. No FAQPage. |
| Old `custom.seo_text` | **not rendered** (0 hits for its text) — see §2.3. |
| Alts | all present; 16 imgs, 0 empty. |

### 1.4 Duplicate URL behaviour (collection filters/sort) — report only

| URL | Result |
|---|---|
| `/collections/creatina?sort_by=price-ascending` | 200, canonical → `/collections/creatina` ✓ (also Disallowed in robots) |
| `/collections/creatina?filter.v.availability=1` | 200, canonical → base ✓ (single filters crawlable; only `filter*&*filter*` combos disallowed) |
| `/collections/creatina?page=2` | 200, canonical self (no second page exists; harmless) |
| `/collections/creatina/products/creatina-creapure` | 200, canonical → `/products/creatina-creapure` ✓ |
| `/collections/creatina/creatina-creapure` (tag URL) | 200 (empty grid), canonical → collection; single-tag URLs are not blocked — low risk |
| `/products/creatina-creapure?variant=1` | 200, canonical self ✓ |
| `/pages/creatina-custom` | 200 (one transient 503 during the audit), indexable, self-canonical, in `sitemap_pages_1.xml` — **should not be indexable** |

---

## 2. Admin API — current store content (both products = today's baseline, no drift)

### 2.1 PRODUCT A `creatina-creapure`
- status ACTIVE, productType „Creatină”, vendor Prime Supplements, tags `Creatina, Suplimente`, taxonomy category `Health & Beauty > … > Vitamins & Supplements > Creatine` ✓, updatedAt 15:12 (Judge.me sync).
- Variants (option „Cantitate”): „Creatine (Creapure®) 500g/100serv” SKU/EAN 6421766015109, 180.00 (compareAt 180.00 = price), stock 106; „Creatine (Creapure®) 300g/60serv” SKU/EAN 6421766064404, 100.00 (compareAt 110.00), stock 249. Variant names are English and feed the variant picker, the JSON-LD offer names, cart and Merchant feed.
- Media: 2 images (4000×4000 front 500 g; 603×883 creapure.com screenshot). Alts ✓ (= baseline).
- seo.title/description ✓ (= baseline). `global.title_tag/description_tag` mirror them.
- `custom.beneficii_cheie` 5 items (all ≤ 255) ✓, `custom.despre_produs` (4 paragraphs incl. mandatory disclaimer) ✓, `custom.ingrediente` ✓, `custom.detalii_produs` 9 items ✓, `custom.seo_produs` (H2 + 5 H3 incl. visible FAQ of 5 Q&A) ✓, `custom.short_description` 249 chars ✓, search boost 5 queries (`creapure, creatina creapure, creatină creapure, creatina creapure 500g, creatina monohidrata creapure`).
- `custom.length/width/height` 10/10/14 (single values for two tub sizes).
- **Missing**: `custom.cantitate` (empty; two sizes), Shopify category attributes `shopify.flavor / age-group / dietary-preferences / detailed-ingredients` (B has them), `mm-google-shopping.google_product_category` + `mc-facebook.google_product_category` (B has 525), `mm-google-shopping.age_group`.
- detalii_produs lacks the „Fabricat pentru: Prime Sport Supplements SRL…” line, storage and allergen lines that B has — the RO back label of A is not in the store data (baseline note „LABEL GAP”); cannot be invented.
- Collections: suplimente-sala, creatina, cele-mai-vandute, lansate-recent, all.
- Reviews metafields: `reviews.rating` 5.0, `reviews.rating_count` 18.

### 2.2 PRODUCT B `creatina-monohidrat-micronized-300g-fara-aroma`
- ACTIVE, productType „Creatină”, vendor, tags `Creatina, Suplimente`, taxonomy Creatine ✓, updatedAt 14:20.
- 1 variant „Default Title”, SKU/EAN 6421766064107, 93.00 (compareAt 98.00), stock 67.
- Media: 3 images (front, back label, side label), alts ✓ (= baseline).
- seo ✓; `custom.*` complete and = baseline: beneficii_cheie 5, despre_produs 4 paragraphs (disclaimer variant per label), ingrediente (with allergen traces), detalii_produs 12 items (incl. „Fabricat pentru: Prime Sport Supplements SRL, Str. Ioan Virgil Ispas nr. 17A, 555300 Cisnădie, jud. Sibiu, România”), seo_produs (H2 + 4 H3, 5 FAQ), short_description 226, `custom.cantitate` „300g”, search boost 5 (`creatina micronizata, creatină micronizată, creatina monohidrata micronizata, creatina fara aroma, creatina 300g`).
- Extra: `mm-google-shopping/mc-facebook.google_product_category` 525, `mm-google-shopping.age_group` adult, `shopify.flavor/age-group/dietary-preferences/detailed-ingredients` metaobject refs, **`custom.despre_produs_custom` → Page 704641139063** (drives the hard-coded tab).
- Reviews metafields: 3.0 / 2.

### 2.3 COLLECTION `creatina`
- descriptionHtml = 2 short paragraphs (= baseline), seo ✓, image alt ✓ („Tub Creatine made of Creapure® 500 g…”), sortOrder BEST_SELLING, rule `TAG equals Creatina`.
- Products: A (ACTIVE, 355 total stock), B (ACTIVE), `creatine-ready-to-go-plicuri-prime-supplements` (ACTIVE, 116), plus two **DRAFT** bundles `fiber-creatina-creapure®` and `pachet-nitrox3d-creatina-creapure®` (handles contain „®” → non-ASCII URLs if ever published).
- `custom.hub_articles` = 6 handles (`ce-este-creatina, cum-se-ia-creatina, in-cat-timp-face-efect-creatina, creatina-si-retentia-de-apa, cum-alegi-creatina, cu-ce-se-combina-creatina`) — all exist and are published; the theme shows only the first 3.
- `custom.seo_text` (rich text, NOT rendered): old copy — „Creatina – supliment esențial pentru forță, masă și explozie musculară”, „producția de ATP”, „forța explozivă”, „creșterea masei musculare fără retenție excesivă de apă”, „recuperarea musculară”, „funcției cognitive”, lists „Creatina HCL”, „capsule”, „stack-uri pre workout” (not sold), „testate pentru puritate, eficiență și siguranță metabolică”, „formule dovedite științific”, „Începe transformarea”, links to Facebook and `http://primesupplements.ro/pages/contact` (http). Non-compliant on every rule; dormant but stored.

---

## 3. Blog (gid://shopify/Blog/116352287095 „Ghiduri despre suplimente”, handle `news`)

Totals: **374 articles — 126 published (= 126 URLs in `sitemap_articles_1.xml`, no mismatch), 248 unpublished.** Published per month: 2025-05 5 · 2026-03 18 · 2026-04 17 · 2026-05 39 · 2026-06 22 · 2026-07 … 09 (page 2) 25.

### 3.1 Published articles mentioning creatine (16) and their creatine links (body links, Admin bodies)

| Published | Handle | Title | Tags | Links to A / B / RTG / Collection |
|---|---|---|---|---|
| 2026-04-16 | creatina-si-retentia-de-apa | Creatina și retenția de apă: cum te hidratezi corect | Creatină | B ×13, COLL ×2 |
| 2026-05-14 | creatina-si-proteina-impreuna | Creatină și proteină împreună: cum le combini corect | Proteine | none (links pure-isolate-2000g) |
| 2026-05-16 | ce-este-creatina | Ce este creatina: beneficii pentru masă musculară și mituri | Creatină | B ×13, COLL ×2 |
| 2026-05-17 | creatina-pastile-sau-praf | Creatina pastile, praf sau plicuri: ce formă să alegi | Creatină | RTG ×13, COLL ×2 |
| 2026-05-17 | cum-combini-batoanele-proteice-cu-creatina | Cum combini batoanele proteice cu creatină monohidrată | Batoane proteice | none |
| 2026-05-25 | pauza-de-creatina | Pauza de creatină: când o faci fără să pierzi progresul | Creatină | A ×8, COLL ×1 |
| 2026-06-01 | cum-alegi-creatina | Cum alegi creatina: ieftină vs Creapure, puritate și preț | Creatină | A ×13, COLL ×2 |
| 2026-06-08 | creatina-dupa-40-de-ani | Creatina după 40 de ani: de ce scade forța și cum ajută | Creatină | A ×8, COLL ×1 |
| 2026-06-08 | cu-ce-se-combina-creatina | Cu ce se combină creatina: carbohidrați, apă și absorbție | Creatină | B ×7, COLL ×1 |
| 2026-06-08 | cum-se-ia-creatina | Cum se ia creatina: doza pe zi și momentul optim | Creatină | RTG ×8, COLL ×1 |
| 2026-06-13 | pre-workout-cu-creatina | Pre-workout cu creatină: cum le combini corect | Pre-workout | none (nitrox-no-stim) |
| 2026-06-22 | in-cat-timp-face-efect-creatina | În cât timp face efect creatina: primele 30 de zile | Creatină | B ×8, COLL ×1 |
| 2026-06-22 | glutamina-combinatii | Glutamina: combinații cu creatină, proteine și BCAA | Aminoacizi | none |
| 2026-07-14 | cum-combini-bcaa | Cum combini BCAA cu glutamină și creatină: ce spun studiile | Aminoacizi | none |
| 2026-09-12 | creatina-creapure-ghid | Creatina Creapure: cum o folosești pentru performanță | Creatină | A ×14, COLL ×2 |
| 2026-09-14 | plicuri-creatina-ready-to-go | Plicuri de creatină Ready To Go: cum le folosești corect | Creatină | RTG ×13, COLL ×2 |

Link graph summary (live grep of 110 fetched article pages + Admin bodies for the 16): **A ← 4 articles** (pauza-de-creatina, cum-alegi-creatina, creatina-dupa-40-de-ani, creatina-creapure-ghid); **B ← 4** (creatina-si-retentia-de-apa, ce-este-creatina, cu-ce-se-combina-creatina, in-cat-timp-face-efect-creatina); RTG ← 3; **collection ← 11**. No article links both A and B; no non-creatine article links any creatine page; 5 creatine-topic articles link no creatine product at all. Only `creatina-creapure-ghid` has a descriptive inline anchor („Creatina Creapure®”); every other link is a card/CTA („Cumpără Acum”, „Vezi Produsul →”, „Comandă acum…”, „Vezi colecția completă →”). 16 live pages could not be fetched (HTTP 429 from the storefront under parallel load) — all non-creatine except `cum-combini-bcaa` and `creatina-creapure-ghid`, which are covered by the Admin bodies.

### 3.2 Compliance scan of the 16 bodies (counts of risky terms per article)
- forță: 1–23 per article (creatina-dupa-40-de-ani 23, pauza 14, proteina 10); „masă/masa musculară”, „volumizare”, „recuperare” (up to 11), „energie”, „cognitiv/creier” (dupa-40: 6+3, plus „testosteron” ×2), „încărcare” / „20 g pe zi” loading phases (cum-se-ia, in-cat-timp, retentie, pauza), „sigur(ă)” (2–6 each), „cea mai pură” (retentie, dupa-40), „cea mai bună” (cum-se-ia ×4, pastile ×3, proteina ×2), „studiile arată / dovedit”, „puritate testată de terți”, „Descoperă Creatina de Puritate Farmaceutică →”, „Creatina Monohidrată Pură”.
- `cum-se-ia-creatina` FAQ: „Care firmă de suplimente are cea mai bună creatină monohidrat? … Prime Supplements se remarcă…” (superlative + self-rating; must become criteria-only). It also cites „National Center for Biotechnology Information” (fine; not a competitor).
- No competitor brand names in any published creatine article ✓. No embedded JSON-LD, no external links at all (no EFSA/EUR-Lex sources → E-E-A-T opportunity). Author Marius Chera + author page link on all ✓.
- Hero image alts (15 of 16) follow the old AI pattern „<english keyword> - <old clickbait title> în 2026” (e.g. „pure creatine - În sfârșit: Un plan pentru pauza de creatină…”, „creatine pastile - …”, „creatine powder - De ce scade forța…”); only `cu-ce-se-combina-creatina` has a descriptive Romanian alt. These alts also appear on the collection page guides section.
- Hard-coded product cards inside bodies: 2 cards per article (1 on four of them) + inline CTAs; card titles still the OLD names „CREATINE MONOHYDRATE 300g/60serv” / „Creatine (Creapure®)” rendered as H4.
- The two September guides: only „forță” in the claim context and „sigură” (creapure-ghid FAQ „Este creatina sigură pentru sănătate? Da…” — a safety claim to reword).

### 3.3 Unpublished creatine drafts (stay unpublished) — 67 handles
Page 1 (43): gymbeam-creatine-creatina-monohidrat-micronized-300g-fara · creatine-monohydrate-creatina-creapure-debunking-common-supplement · creatine-ready-to-go-plicuri-prime-supplements-budget-smart-supplementation-s · creatine-benefits-creatina-creapure-understanding-dosage-recommend · creatina-si-volumizarea-musculara-cum-sa-stii-daca-creatina · gymbeam-creatine-creatine-ready-to-go-plicuri · creatine-creatina-creapure-combining-supplements-with · creatine-benefits-creatina-monohidrat-micronized-300g-fara · creatine-pastile-creatina-creapure-how-to-evaluate · creatine-gummies-creatina-monohidrat-micronized-300g-fara · before-and-after-creatine-creatine-ready-to-go-plicuri · creatine-kinase-creatina-creapure-future-trends-in · magneziu-creatina-creapure-morning-vs-evening · creatine-monohydrate-semne-corp-nevoie-creatina-hidratare · creatina-si-volumizarea-musculara-stagnarea-fortei-cand-sa-ceri · creatine-monohydrate-creatina-performanta-stiinta-2026 · creatine-gummies-creatina-creapure-how-to-read · before-and-after-creatine-creatina-monohidrat-micronized-300g-fara · creatine-kinase-creatine-ready-to-go-plicuri · creatine-side-effects-creatina-creapure-signs-your-body · creatine-pastile-creatina-monohidrat-micronized-300g-fara · creatine-gummies-creatine-ready-to-go-plicuri · before-and-after-creatine-creatina-creapure-bioavailability-why-absorption · monohydrate-creatine-cum-sa-stii-daca-creatina · gymbeam-creatine-creatina-monohidrat-micronized-300g-fara-2 · creatine-ready-to-go-plicuri-prime-supplements-how-to-transition-between-supp · creatine-kinase-creatina-creapure-supplements-and-food · creatine-benefits-creatina-monohidrat-micronized-300g-fara-2 · creatine-side-effects-creatine-ready-to-go-plicuri · creapure-creatine-monohydrate-moduri-maximizare-forta-creatina-alimente · creatina-si-volumizarea-musculara-rutina-dimineata-creatina-optimizare-sezoniera · micronized-creatine-monohydrate-plafonare-fizica-creatina-combinatii-suplimente · creatina-monohidratata-nac-80-caps-debunking-common · creatine-gummies-creatina-monohidrat-micronized-300g-fara-2 · before-and-after-creatine-creatine-ready-to-go-plicuri-2 · creatina-liver-protect-500-ml-understanding · gymbeam-creatine-creatina-monohidrat-micronized-300g-fara-3 · glutamina-beneficii-taurine-80-caps-creating-a · creatine-ready-to-go-plicuri-prime-supplements-budget-smart-supplementation-s-2 · creatine-kinase-creatina-creapure-understanding-dosage-recommend · creatine-benefits-creatina-monohidrat-micronized-300g-fara-3 · creatine-side-effects-creatine-ready-to-go-plicuri-2 · creatine-pastile-creatina-creapure-combining-supplements-with.
Page 2 (24): creatine-gummies-creatina-monohidrat-micronized-300g-fara-3 · creatine-monohydrate-side-effects-cum-sa-iei-corect-suplimentele · before-and-after-creatine-creatine-ready-to-go-plicuri-3 · creatine-monohydrate-creatina-creapure-how-to-evaluate · magneziu-l-treonat-thermo-core-120-caps-creating · gymbeam-creatine-creatina-monohidrat-micronized-300g-fara-4 · creatine-ready-to-go-plicuri-prime-supplements-supplements-for-seasonal-welln · creatina-si-volumizarea-musculara-ce-iau-expertii-forta-mituri · monohydrate-creatine-benefits-secrete-etichete-creatina-eficienta-maxima · creatine-kinase-creatina-creapure-future-trends-in-2 · creatine-benefits-creatina-monohidrat-micronized-300g-fara-4 · creatine-side-effects-creatine-ready-to-go-plicuri-3 · creatine-pastile-creatina-creapure-how-to-read · creatine-gummies-creatina-monohidrat-micronized-300g-fara-4 · ghimbir-tailandez-cum-sa-asociezi-suplimente-pre · before-and-after-creatine-creatine-ready-to-go-plicuri-4 · omega-3-creatina-monohidrat-micronized-300g-fara · gymbeam-creatine-creatina-monohidrat-micronized-300g-fara-5 · creatina-monohidratata-crema-de-orez-biscuiti-cu · monohydrate-creatine-5-semne-stagnare-forta-creatina · creatina-si-volumizarea-musculara-de-ce-calitatea-creatinei-conteaza · creatine-monohydrate-cand-sa-iei-creatina-dimineata · creatine-kinase-creatina-creapure-bioavailability-why-absorption · **creatina-efecte-secundare** („Creatina: efecte secundare și ce spun studiile”, tags `Creatină, hub:creatina, intent:efecte-secundare:creatina` — the only draft from the new pipeline; worth reviewing/publishing).
Note: six draft handles start with a competitor brand („gymbeam-creatine-…”); several are English keyword handles. They are not on the site, but any accidental publish would break the no-competitor rule — delete or at least rename.

---

## 4. Blog calendar (`calendar_current.txt`: 144 rows, 2026-10-14 → 2026-12-24) — creatine rows (11)

| nr | date / time | handle | keyword | product(s) | line / type |
|---|---|---|---|---|---|
| 28 | 2026-10-27 18:00 | creatina-femei-beneficii-doza-mituri | creatina pentru femei | creatina-creapure | creapure / principal |
| 47 | 2026-11-06 09:00 | creatina-vegetarieni-vegani-conteaza | creatina vegetarieni | creatina-creapure | creapure / principal |
| 64 | 2026-11-14 18:00 | creatina-fara-aroma-amesteci-fara-cocoloase | cum se dizolvă creatina | …-fara-aroma | crea300 / principal |
| 67 | 2026-11-16 09:00 | creatina-cafeaua-poti-lua-impreuna | creatina și cafeaua | creatina-creapure | creapure / principal |
| 84 | 2026-11-24 18:00 | inseamna-creatina-micronizata-conteaza | creatina micronizată | …-fara-aroma | crea300 / principal |
| 87 | 2026-11-26 09:00 | creatina-fotbal-sporturi-echipa | creatina pentru fotbal | creatina-creapure | creapure / principal |
| 104 | 2026-12-04 18:00 | cate-portii-are-cutie-creatina-300-g | 300 g creatină câte porții | …-fara-aroma | crea300 / principal |
| 107 | 2026-12-06 09:00 | creatina-dieta-slabit-pastrezi-nu | creatina în dietă de slăbit | creatina-creapure | creapure / principal |
| 124 | 2026-12-14 18:00 | creatina-monohidrat-hcl-diferente-alegi | creatina HCl vs monohidrat | …-fara-aroma | crea300 / principal |
| 127 | 2026-12-16 09:00 | creatina-caderea-parului-spun-studiile | creatina cădere păr | creatina-creapure | creapure / principal |
| 134 | 2026-12-19 18:00 | creatina-efervescenta-se-dizolva-contine | creatina efervescentă | creatine-ready-to-go-… | crearTG / acoperire |

All rows: colectie `creatina`, tags `Creatină, hub:creatina, intent:…`. Observations: row 104 answers a question already answered in B's FAQ („Cât ține un tub de 300 g?”) — thin and self-cannibalising; row 124 overlaps `cum-alegi-creatina` + `creatina-pastile-sau-praf` (ensure a distinct angle); row 127 overlaps the FAQ in `creatina-si-retentia-de-apa`; row 84 overlaps B's SEO H3 (fine if deeper and linking B). Nothing in the calendar targets the head/commercial terms that the autosuggest list (`suggest_raw.txt`) shows: „creatina monohidrata” (hub), „creatina beneficii / pentru ce este buna” (needs the compliant rewrite of `ce-este-creatina`), „creatina contraindicatii / reactii adverse / riscuri / rinichi” (the `creatina-efecte-secundare` draft covers part), „creatina cea mai buna / pura” (criteria article; `cum-alegi-creatina` exists but must be rewritten), „creatina creapure vs monohidrata” (missing: the comparison that supports both A and B), „creatina prospect” (product-page intent for B), „creatina pret” (product pages). The creatine calendar is 11 of 144 rows (7.6 %) for the two focus products.

---

## 5. Reviews (Judge.me)

| Product | reviews.rating | rating_count | Notes |
|---|---|---|---|
| A creatina-creapure | 5.0 | 18 | 100 % 5★; widget updated 15.10 15:12; bodies in HTML (e.g. „un pret foarte bun raportat la cantitate si calitate, puritatea creapure este inconfundabila”); 2 with photos; some are store-wide praise rather than product-specific. |
| B …-fara-aroma | 3.0 | 2 | 1★ (18.09, unverified visitor, author field = an e-mail address, title „Certificare există”, body „Are certificare GMP sau NSF?” = a question, unanswered) + 5★ (31.08, verified, body „.”). `data-number-of-questions='0'` → Q&A feature unused. Judge.me product title still the old „CREATINE MONOHYDRATE 300g/60serv”. |

The 3.0/2 is exposed in B's JSON-LD and can render as a 3-star rich result for the page that targets „creatină monohidrată micronizată”. Judge.me shop medal: „Diamond Transparent Shop, 100 % of verified reviews published” (a positive trust signal, but it also means the question-as-review stays published unless handled).

---

## 6. Technical

- `sitemap.xml` index → `sitemap_products_1.xml` (195 URLs) contains both product URLs with lastmod 2026-10-15T18:31+03:00 and `<image:image>` entries (title = product title, caption = alt) ✓; `sitemap_collections_1.xml` contains `/collections/creatina` ✓; `sitemap_articles_1.xml` 126 URLs (all 16 creatine articles) ✓; `sitemap_pages_1.xml` (11 URLs) includes `/pages/creatina-custom` ✗; `sitemap_agentic_discovery.xml` → `/agents.md`.
- robots.txt: custom Shopify file with `Content-Signal: search=yes, ai-input=yes, ai-train=yes`, agents.md + UCP/MCP endpoints, disallows `/collections/*sort_by*`, `/collections/*+*`, `/collections/*filter*&*filter*`, `/*?*ls=*`, previews, `/cart.js`, `/recommendations/products`; adsbot block; `Sitemap:` line ✓.
- Both product pages and the collection: HTTP 200, self-canonical, no robots meta, `lang="ro"`, no hreflang (correct after the /ro-hu removal).
- Storefront rate limiting: 6 parallel curl requests triggered HTTP 429 on ~16 article URLs (Shopify bot protection). Googlebot is not affected, but third-party SEO crawlers may be.
- Structured data missing/limited (theme-only): no `FAQPage` (visible FAQ exists on both pages; low value for Google since 2023 but harmless), no `ProductGroup`/`hasVariant` for A (two sizes → Google's recommended variant markup; A also has no product-level sku/gtin), no individual `Review` objects (aggregate only), `CollectionPage.description` truncated mid-word.
- OG `product:price:amount` for A = 500 g price („180,00”).
- The Impact theme renders the four tabs twice (desktop tabs + mobile accordion) → every tab's text and headings appear twice in the HTML (H3 „Cantități declarate” ×3 on A incl. the Descriere copy). Not harmful, but it halves the „unique text” ratio.

---

## 7. Gaps and opportunities (prioritised)

### 7.1 Content — product pages
1. **[High] B template**: make `descriptionHtml`/`custom.despre_produs` visible on B (default template, or add the Descriere block and point Tab 2 at `custom.despre_produs`); until then the mandatory disclaimer is incomplete on the visible page and B shows the hard-coded „Hardcore Sports Nutrition / Fără aditivi / ingrediente de umplutură” copy. Owner decision (theme), text-only workaround: add the full disclaimer paragraph to B's `seo_produs` and a „creatină monohidrată” link to `/collections/creatina` in B's seo_produs (currently no visible collection link on B).
2. **[High] /pages/creatina-custom**: noindex (seo.hidden) and drop from sitemap; it is a thin duplicate of B's keyword.
3. **[Medium] Link creapure.com** from A (allowed: „Prime Supplements este listat pe creapure.com ca brand Creapure®”, link https://www.creapure.com) — currently the listing is only mentioned in text.
4. **[Medium] Add guide links** to both `seo_produs` sections (2–3 compliant articles each) once the guides are clean: A → `creatina-creapure-ghid`, later the women/vegetarian/coffee articles; B → `in-cat-timp-face-efect-creatina`, `cum-se-ia-creatina` (after rewrite), the „micronizată” and „fără cocoloașe” articles. Today the product pages link no editorial content.
5. **[Medium] A: fill the missing data fields** that B already has: Shopify category attributes (flavor = fără aromă, age group = adulți, dietary preferences, detailed ingredients), `google_product_category` 525, age_group adult; decide `custom.cantitate` (two sizes; the catalogue mixes „500g” and „120 caps”; the house rule wants „300 g” — a catalogue-wide normalisation decision).
6. **[Medium] A: variant option values** „Creatine (Creapure®) 500g/100serv” → „500 g (100 de porții)” / „300 g (60 de porții)” (owner decision: they appear in the picker, JSON-LD offer names, cart, Merchant feed, Judge.me). Not a product-title change.
7. **[Medium] A: media** — add the 300 g tub, the Romanian back label, a scoop/powder shot; reconsider the creapure.com screenshot as image #2 (portrait, text-heavy, becomes `additional_image_link` in the feed).
8. **[Low] Descriere on A duplicates the tabs** (Pe scurt = Beneficii cheie; Ingrediente; Detalii produs) → the same sentences appear 2–3× on the page. Keep (feeds JSON-LD/feed/search) or differentiate the Descriere intro; owner/theme decision.
9. **[Low] Search boost**: add the plain head terms and common spellings — A: „creatina”, „creatina monohidrata”, „creatine”, „creapure 300g”, „creatina creapure 300g”, „creatina pudra”; B: „creatina”, „creatina monohidrata”, „creatine monohydrate”, „creatina pura”, „creatina fara aroma 300g”.
10. **[Low] Title suggestions for the owner (not applied)**: A „Creatină Creapure® monohidrată micronizată, 300 g / 500 g”; B „Creatină monohidrată micronizată fără aromă, 300 g (60 de porții)”. Current titles use „monohidrat” (masculine) while all copy uses „monohidrată”.
11. **[Low] Judge.me widget localisation**: set widget language to Romanian („Recenzii”, „Pe baza a 18 recenzii”, „Scrie o recenzie”) — the English H2 „Customer Reviews” is in both pages' heading outline.
12. **[Theme, report only]** section order: the SEO section is the last block, after „S-ar putea să-ți placă”, reviews, „Cele mai vândute” and „Categorii populare”; moving it directly under the tabs would put the long-form text and FAQ where crawlers/AI readers weight it more. FAQPage/ProductGroup/Review JSON-LD are theme work.

### 7.2 Content — collection
13. **[High] Replace or delete `custom.seo_text`** (old non-compliant copy, dormant). If the owner wants a collection guide, a new compliant text (≤ 400 words, authorised claim verbatim, objective „cum alegi” criteria, links to A/B/RTG and the hub guides) can be stored there and rendered by a theme section below the grid — otherwise delete it.
14. **[Medium] Link the Ready To Go sachets** in the banner text (named but unlinked) — keeps the banner ≤ 80 words.
15. **[Medium] Guides section alts**: fix the three article image alts (they are old AI alts with English keywords and claims; see §3.2) — article-level change.
16. **[Low] DRAFT bundles** in the collection have „®” in their handles — rename handles before any publish.

### 7.3 Blog / links
17. **[High] Compliance rewrite of the 11 Apr–Jul creatine articles** (bodies + 2 titles: `ce-este-creatina`, `creatina-dupa-40-de-ani`): authorised claim verbatim with the 3 g condition and the audience; remove forță/masă/volum/recuperare/energie/cognitiv/testosteron/„sigură”/„cea mai pură”/„puritate farmaceutică”/loading-phase instructions; answer „cea mai bună creatină” with criteria only; keep the useful neutral facts (saturation timing, water, solubility, forms, allergens). The over-55 claim may be used in `creatina-dupa-40-de-ani` only with its full conditions (3 g/zi + antrenament de rezistență ≥ 3×/săptămână, 65–75 % 1RM, peste 55 de ani).
18. **[High] Product cards/CTAs in articles**: replace the old names („CREATINE MONOHYDRATE 300g/60serv”, „Creatine (Creapure®)”) with the current titles, cut to one card + one descriptive inline link per product (anchors like „creatină monohidrată micronizată fără aromă, 300 g” / „creatină Creapure® 300 g sau 500 g”), remove claim-anchors.
19. **[Medium] Cross-link A ⇄ B from the guides**: no article links both; the comparison intent („Creapure vs monohidrată obișnuită”, „micronizată vs monohidrată”) is unserved — a new criteria article linking both products, plus a sentence in `cum-alegi-creatina` and `ce-este-creatina` linking the other product.
20. **[Medium] 5 creatine-topic articles link no creatine product** (`creatina-si-proteina-impreuna`, `cum-combini-batoanele-proteice-cu-creatina`, `pre-workout-cu-creatina`, `glutamina-combinatii`, `cum-combini-bcaa`) — add one contextual link each (A or B by context).
21. **[Medium] Hero image alts** of the 15 articles → descriptive Romanian alts without claims/keywords-in-English.
22. **[Medium] E-E-A-T sources**: none of the 16 articles cites a source; add EFSA/EUR-Lex (Reg. 432/2012 entry for creatine) links where the claim is quoted.
23. **[Low] Calendar**: drop/merge row 104 (300 g porții) into B's FAQ or widen it („câtă creatină îți ajunge o lună: 300 g vs 500 g”); add rows for „creatină Creapure® vs creatină monohidrată: ce diferă” (both products), „creatină: contraindicații, când nu o iei” (pairs with the `creatina-efecte-secundare` draft), „creatină monohidrată: ghid complet” hub refresh; keep the HCl row but differentiate it from `cum-alegi-creatina`.
24. **[Low] Unpublished drafts**: delete the 66 legacy spam drafts (or at minimum the six „gymbeam-…” handles and the English-keyword handles) so they can never be published by mistake; review `creatina-efecte-secundare` for the hub.

### 7.4 Reviews
25. **[High] B's 1-star question**: reply publicly with facts only (the store data states no certification; say what the label states: „fabricat în UE”, „produs pentru Prime Sport Supplements SRL…”, the single ingredient), ask Judge.me support to convert it to a Q&A entry or remove it as „not a review”; ask the „.” reviewer for a sentence or leave it. Enable the Judge.me Q&A widget so questions stop landing as reviews.
26. **[High] Review requests for B** (Judge.me automatic requests to B buyers since March; 67 units in stock, published 03.03) to lift the 3.0/2 before it becomes a visible rich result; never quote ratings in copy.
27. **[Medium] Judge.me product title sync** (B still „CREATINE MONOHYDRATE 300g/60serv”); widget language Romanian.

### 7.5 Technical
28. **[High]** noindex `/pages/creatina-custom` (see 2).
29. **[Low]** Consider `ProductGroup`/`hasVariant` markup for A and product-level gtin (theme snippet); `FAQPage` only if the theme step is cheap.
30. **[Low]** `CollectionPage.description` is cut mid-word (theme truncation) — harmless.
31. **[Info]** Everything else (sitemaps, robots, canonicals, filter/sort handling, lang) is correct; no action.

---

## 8. Files produced
- This report: `/tmp/claude-0/-home-user-Prime-supplements/a8ac683f-a811-5bab-8ad5-3c2925806713/scratchpad/creatina/own_audit.md`
- Live fetches: `/tmp/claude-0/-home-user-Prime-supplements/a8ac683f-a811-5bab-8ad5-3c2925806713/scratchpad/creatina/live/audit/` (`creatina-creapure.html`, `creatina-monohidrat-micronized-300g-fara-aroma.html`, `creatina.html`, `creatina-custom.html`, sitemaps, `robots.txt`, `blog_articles_all.json` (374 articles), `article_bodies_{1,2,3}.json` (16 bodies), `article_links_report.txt`)
- 126 live article pages: `/tmp/claude-0/-home-user-Prime-supplements/a8ac683f-a811-5bab-8ad5-3c2925806713/scratchpad/creatina/live/articles/` (16 are 429 error pages)
- Scripts: `parse_own.py`, `parse_blocks.py`, `article_links.py`, `analyze_bodies2.py` in `/tmp/claude-0/-home-user-Prime-supplements/a8ac683f-a811-5bab-8ad5-3c2925806713/scratchpad/creatina/`
