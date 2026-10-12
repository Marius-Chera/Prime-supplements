# SXO (Search Experience Optimization) findings: primesupplements.ro

Key: `sxo` | Audit date: 2026-10-12 | Specialist: claude-seo `seo-sxo` method (SERP-backwards analysis, page-type taxonomy, user stories, persona scoring). The **SXO Gap Score** below is separate from the audit's SEO Health Score.

## Scope & method

What was checked
- 20 WebSearch queries run on 2026-10-12 (Romanian wording): `creatina`, `creatina monohidrata`, `creatina monohidrata pret`, `cea mai buna creatina`, `pudra proteica`, `proteine din zer`, `pre workout`, `suplimente pre workout`, `batoane proteice`, `arzator de grasimi`, `glutamina`, `suplimente culturism`, `prime supplements`, `primesupplements`, `prime supplements romania suplimente`, `prime whey proteina`, `creatina creapure`, `MNX haine sala tricou`, `site:primesupplements.ro`, `site:primesupplements.ro/ro-hu`, `site:b2b.primesupplements.ro`, plus 3 article-topic queries (`bcaa vs eaa diferente`, `efecte secundare glutamina`, `pre workout fara cofeina`) and 3 competitor page-type checks restricted to Romanian stores (gymbeam.ro, proteinshop.ro, bodyline.ro, supliments.ro, xtremelabs.ro, emag.ro, gnc.ro, decathlon.ro, drmax.ro, redis.ro, topsupliments.ro, bulk.com, primesupplements.ro) for `creatina`, `creatina monohidrata`, `pudra proteica`.
- Every result was classified with `$CLAUDE_PLUGIN_ROOT/skills/seo-sxo/references/page-type-taxonomy.md`; personas and user stories follow `persona-scoring.md` and `user-story-framework.md`.
- Target pages scored from local evidence (no live render possible): `$R/home.html` + `$R/parsed/home.json`; `$R/pages/collection.html` + `$R/parsed/pages_collection.json` (/collections/pudra-proteica); `$R/parsed/pages_collection-creatina.json`; `$R/pages/product-creatina-creapure.html` + `$R/parsed/pages_product-creatina-creapure.json`; `$R/pages/article.html` + `$R/parsed/pages_article.json` (/blogs/news/bcaa-vs-eaa-...); `$R/shopify/catalog-analysis.md`; `$R/shopify/articles-all.json` (keyword counts computed with a python one-off).
- 6 throttled live curl requests (2 s apart, Chrome UA) to verify legacy URLs found in the index and the B2B product page.

What could not be checked
- WebSearch is a US-indexed engine, not google.ro: it returns no PAA, ads, AI Overview, shopping grid or "related searches", and plain queries such as `creatina`, `creatina monohidrata pret`, `glutamina`, `pre workout`, `bcaa vs eaa diferente` returned Spanish/Portuguese/French/Italian pages. Romanian SERP composition was reconstructed from the queries that did return .ro results and from the store-restricted checks; positions are approximate.
- No Search Console, rank tracker or DataForSEO: impressions/clicks per page could not be confirmed. Plugin fetch/render scripts fail in this sandbox (proxy policy), so above-the-fold assessment uses the static HTML.

## Score

**SXO category score: 22/100.** In 11 Romanian commercial SERPs observed (pudra proteica, proteine din zer, suplimente pre workout, batoane proteice, arzator de grasimi, cea mai buna creatina, suplimente culturism, creatina creapure, prime whey, pre workout fara cofeina, bcaa vs eaa) primesupplements.ro never appeared; when the result set is restricted to Romanian stores, the domain surfaces only with 2026 blog posts for "creatina"/"creatina monohidrata" while gymbeam.ro, bodyline.ro and decathlon.ro rank with category and product pages. The brand name is not owned in search, legacy WooCommerce URLs are still indexed, the B2B store is indexed, and the three money-page templates (home, collection, product) fail the skeptical and price-comparing personas.

**SXO Gap Scores (page vs SERP expectation, 7 dimensions):** /collections/creatina vs "creatina monohidrata" = 38/100; /collections/pudra-proteica vs "pudra proteica" = 40/100; /blogs/news/bcaa-vs-eaa-... vs "bcaa vs eaa" = 35/100; /products/creatina-creapure vs "creatina creapure" = 58/100 (tables in the Persona section).

## What works

- The main store is indexed with Romanian, keyword-led titles on the important collections: `site:primesupplements.ro` returned "Pudra proteica pentru masa musculară" (/collections/pudra-proteica), "Suplimente Pre Workout pentru energie maximă", "Vitamine și minerale esențiale", "Despre noi - Prime Supplements", the EAA and Frutilu product pages.
- The domain can rank: two creatine articles (`/blogs/news/creatina-monohidrata-nitrox-no-stim-combining-supplements`, `/blogs/news/monohydrate-creatine-cum-sa-stii-daca-creatina`) appeared next to gymbeam.ro/decathlon.ro in the store-restricted "creatina monohidrata" set, and `/blogs/news/creatina-si-volumizarea-musculara-cum-sa-stii-daca-creatina` for "creatina".
- Product buy box is complete for a decision-stage buyer: "Preț redus 180,00 lei", "În stoc", "Produs în Uniunea Europeană", 2 variants (500g/100serv, 300g/60serv), "17 recenzii", "Adaugă în coș" + "Cumpără acum", site-wide bar "Livrare gratuită la comenzile de peste 300 RON", payment methods (Ramburs, Visa, Mastercard, ApplePay) in the FAQ.
- Collections already have filters (Doar în stoc, Preț, Cantitate) and 8 sort options, and the Impact theme's `main-collection` section can host description/rich-text blocks, so the fix is content, not development.
- The blog corpus is long-form (median 1529 words, 348/355 with tables, 338 citing studies) and already links products (median 10 product links/article): raw material that can be consolidated into category hubs instead of discarded.

## SERP observations (evidence log, 2026-10-12)

Page types use the taxonomy: Product, Category (Shopify collection / shop category = Landing/Product-list), Guide (Blog Post), Comparison, Forum, News/Advertorial, Marketplace.

| Query | Results returned (domain, page type) | Dominant type / consensus | primesupplements.ro present? |
|---|---|---|---|
| pudra proteica (open) | medlife.ro guide x2, drmax.ro product x2 (BioTechUSA, Dragon Superfoods), bzi.ro advertorial x2 (Bodyline), biogena.com guide x2, puterea.ro news | Guide/News 7 of 9 (informational-heavy, YMYL framing) | No |
| pudra proteica (RO stores only) | decathlon.ro category x3, drmax.ro category x1 + product x3, emag.ro filtered category, decathlon.ro product (Pro Nutrition WPI) | Category 5 / Product 4 | No (collection is indexed but absent) |
| proteine din zer | drmax.ro product x2 (ON Gold Standard), consilium.europa.eu pdf x2, nutrada.com wholesale, shutterstock x2, bulksupplements.com product, bulk.com product | Product 4 (B2C+B2B), noise 4 | No |
| suplimente pre workout | bulk.com/ro category, worldclass.ro guide x2, bulk.com product (fără cofeină), drmax.ro category x2, review paper x2, iherb blog | Category 3 / Guide 3 / Product 1 | No |
| batoane proteice | drmax.ro article, newsweek.ro, prosport.ro advertorial, catena.ro article, drmax.ro product (Nutramino), infocons.ro x2 (sugar/salt tests), worldclass.ro, bulk.com category | Guide/News 7 (consumer-protection tone), Product 1, Category 1 | No |
| arzator de grasimi | bulk.com category, drmax.ro product x2 (Weider), medlife.ro article x2, bzi.ro, newsweek.ro, worldclass.ro, antena3.ro | Mixed: Guide/News 6, Product 2, Category 1 | No |
| cea mai buna creatina | biogena.com guide, forum.softpedia.com x2 ("creatina", "creatina hcl pareri"), drmax.ro product x2 (Weider), bulksupplements.com product x2, medlife.ro article x2 | Guide/Forum 5, Product 4; no true Comparison page | No |
| suplimente culturism | evz.ro interview (Lucian Borza), bzi.ro advertorial (Bodyline), forum.softpedia.com, academic x3, wikipedia | Informational/News | No |
| creatina (RO stores only) | bulk.com guides x2 + product x2, gymbeam.ro product (Creapure), decathlon.ro product (Weider), bodyline.ro category ("Creatina Monohidrata Creapure® Pure Creatine Doar 89 Lei"), gymbeam.ro product (Bodylab24) | Product 5 / Category 1 / Guide 2 | Yes: blog post `/blogs/news/creatina-si-volumizarea-musculara-cum-sa-stii-daca-creatina` (page-type mismatch) |
| creatina monohidrata (RO stores only) | decathlon.ro product x4 (Creapure 300g x2, Weider, Pro Nutrition), gymbeam.ro product x3 (Mammut, GymBeam, Redcon1), gymbeam.ro category `/creatina-monohidrat?product_list_order=reviews_count` | Product 7 / Category 1 | Yes: 2 blog posts (`creatina-monohidrata-nitrox-no-stim-combining-supplements`, `monohydrate-creatine-cum-sa-stii-daca-creatina`), not /collections/creatina nor the 2 creatine products |
| creatina creapure | fitgeneration.es guide, drogasil/drogaraia .br product x3, 226ers blog, myprotein.es product, decathlon.es/.ie product x3 | Product 7 | No (no .ro result at all; the Creapure product page did not surface) |
| pre workout fara cofeina | bulk.com/ro product ("Dope pre-workout fără cofeină", 129 RON), doz.pl product, mercadolivre/buscape guides x3, lookfantastic product, darwin-nutrition comparison, kespro product, muziker product | Product 6 / Guide 3 | No (site has Nitrox NO-STIM product + 3 articles on this topic) |
| bcaa vs eaa diferente | nakednutrition.com brand blog x7 (locale copies), openfarma.it guide, fitadium.com guide/podcast | Blog Post 9 (brand blogs) | No (site article dated 2025-05-29, 517 words, 0 links) |
| efecte secundare glutamina | apollohospitals.com, decathlon.pt category x2, hola.com, ncbi.nlm.nih.gov x2, cochrane.org, thieme journal, USPTO patent | Medical/YMYL informational | No (site has 12 glutamine-titled articles incl. "Efecte secundare glutamină... 2026") |
| prime supplements | hari.ca (Hagen "Prime" bird supplement), patch.com (Prime Brands), Prime Nutrition (Blackstone Labs) x2, hellopharmacist "Prime", piscespets, 1800dtc "Prime Sports Nutrition" x2, ebay, NIH label | Name collision, 0 Romanian results | No |
| primesupplements | hari.ca, hellopharmacist, Wikipedia "Prime Supermarket", Alpha Prime Supps trademark, bodybuilding.com Prime Nutrition, Prime Biome spam x2, trustpilot "Puppy Prime" | Name collision | No |
| prime supplements romania suplimente | forbes.ro x4, economica.net x2, stirileprotv.ro, ipsos.com, financialintelligence.ro (market news) | News | No |
| prime whey proteina | shopping.truda.io aggregator ("proteina din zer prime supplements prime whey 1000g bourbon vanilla"), paris.cl (QNT Prime Whey) x2, drogasil/drogaraia "100% Whey Prime" x4, continente.pt (Prozis Prime Whey) x2, decathlon.de (QNT) | Product (other brands) | Only via a third-party aggregator, never the store's own product page |
| MNX haine sala tricou | MNX1 antibody vendors x8, Schneider Electric "MNx" | Unrelated | No |
| site:primesupplements.ro | / (home), **www.primesupplements.ro/categorie-produs/suplimente/**, **/categorie-produs/suplimente/?v=1eb2628f4187**, /products/eaa-aminoacizi-esentiali, /pages/despre-noi, **/collections/suplimente-pre-workout?v=1eb2628f4187**, /products/frutilu-instant-drink-sport-red-orange-10-g, /collections/prime-health, **/categorie-produs/suplimente/vitamine-si-minerale**, /collections/pudra-proteica | Index contains 4 legacy WooCommerce-era / parameter URLs out of 10 (one "about 626 days" old) | Yes |
| site:primesupplements.ro/ro-hu | termene.ro, bulksupplements.com/ro-hu, iherb, desertcart... (no site result) | - | No /ro-hu/ URL surfaced although 575 are in the sitemap |
| site:b2b.primesupplements.ro | https://b2b.primesupplements.ro/products/combat-pro "Combat PRO 500g/22 serv" (140 RON vs 170 RON, seller PRIME SPORT SUPPLEMENTS SRL) | Product | Yes: the wholesale store is indexed and surfaces to consumers |

Live verification (curl, 2026-10-12): `https://www.primesupplements.ro/categorie-produs/suplimente/` -> 301 `https://primesupplements.ro/collections/suplimente` -> 301 `/collections/suplimente-sala` (2 hops after the www hop); `/categorie-produs/suplimente/?v=1eb2628f4187` -> 301 `/collections/suplimente?v=1eb2628f4187` (parameter carried through); `/categorie-produs/suplimente/vitamine-si-minerale` -> 301 `/collections/vitamine-si-minerale`; `/collections/suplimente-pre-workout?v=1eb2628f4187` -> 200, title "Suplimente Pre Workout pentru energie maximă | Prime", canonical to the clean URL; `https://b2b.primesupplements.ro/products/combat-pro` -> 200, no noindex.

## Personas and user stories (derived from the SERP signals above)

| Persona | Journey stage | Derived from | Key questions |
|---|---|---|---|
| P1 **Începătorul la sală** (first supplement purchase) | Awareness -> Consideration | medlife.ro/biogena/drmax guides ranking for "pudra proteica", "cea mai buna creatina"; softpedia forum threads; evz interview "te ajută cam 10%" | Ce să iau prima dată? Monohidrat sau Creapure? Cât și când? |
| P2 **Comparatorul de preț** (knows what he wants) | Decision | bodyline.ro title "...Doar 89 Lei"; gymbeam category sorted by `reviews_count`; emag filtered category; decathlon multi-brand listings; price-comparison sites for "...pret" | Cât costă per porție? E în stoc? Livrare gratuită de la cât? Câte recenzii? |
| P3 **Consumatorul sceptic (siguranță)** | Consideration | infocons.ro sugar/salt tests and newsweek/puterea/stirileprotv "periculoase", "compozitia neverificata" for batoane/pudra; apollohospitals/ncbi/cochrane for glutamine side effects | Ce conține exact? Există analize de laborator? Unde e produs? Efecte secundare? |
| P4 **Atletul avansat / culturistul** | Decision | "creatina creapure" brand-grade queries; forum "creatina hcl pareri"; bulk.com "Dope fără cofeină" product ranking for evening training; Combat PRO result | Creapure sau micronizată? Pre-workout fără cofeină pentru seară? Stack-uri, dozare? |
| P5 **Clientul B2B (sală, magazin)** | Decision | nutrada.com wholesale result for "proteine din zer"; b2b.primesupplements.ro indexed | Preț en-gros, MOQ, cont B2B |

User stories (each cites its SERP signal)
1. As a **beginner** (P1), I want to know which creatine to buy and how to take it, because I am confused by monohidrat vs HCL vs Creapure, but I am blocked by an **information gap**: /collections/creatina has 3 cards and no guidance. *(Signal: "cea mai buna creatina" SERP = biogena guide + medlife + softpedia "creatina hcl pareri".)*
2. As a **price comparer** (P2), I want the cheapest trustworthy creatine per serving with free delivery, because every competitor shows price and review count in the SERP, but I am blocked by **price opacity**: no price/serving, "Preț redus" without a visible reference on the Creapure page, empty "Reduceri" collection. *(Signal: bodyline "Doar 89 Lei", gymbeam reviews_count sort.)*
3. As a **skeptical consumer** (P3), I want proof the powder is clean (sugar, heavy metals, additives), because the Romanian press frames supplements as unverified, but I am blocked by a **trust gap**: product pages show only "Produs în Uniunea Europeană"; TUV/IFS/HALAL appear only on /pages/despre-noi. *(Signal: infocons, newsweek, puterea results for batoane/pudra.)*
4. As an **evening trainer** (P4), I want a stim-free pre-workout, because caffeine ruins my sleep, but I am blocked by **page-type mismatch**: the query is answered by product pages (bulk.com "Dope fără cofeină") while the store spreads the topic over 3 articles and a product (Nitrox NO-STIM) whose title does not say "fără cofeină". *(Signal: "pre workout fara cofeina" SERP.)*
5. As a **gym owner** (P5), I want wholesale pricing, but as a consumer I am blocked by **channel confusion**: Google can serve me the B2B Combat PRO page (140 RON) instead of the retail page. *(Signal: site:b2b result.)*

## Persona scores (Relevance / Clarity / Trust / Action, 25 each)

Homepage `https://primesupplements.ro/` (evidence: hero text "PRIME SUPPLEMENTS Hardcore sports nutrition Vezi produse"; first product row "NOU - Haine MNX": "Stoc epuizat MNX Shaker 600 ml No reviews", "MNX Ribbed shorts Hammer, grey ... Stoc epuizat"; 13 H2; English strings "No reviews", "14 reviews", "Let customers speak for us"; title "Prime Supplements - Hardcore Sports Nutrition"; meta description without diacritics; H2 "Reduceri" links to an empty collection)

| Persona | Rel | Cla | Tru | Act | Total | Rating |
|---|---|---|---|---|---|---|
| P1 Începător | 10 | 8 | 12 | 14 | 44 | Needs work |
| P2 Comparator preț | 14 | 10 | 12 | 15 | 51 | Needs work |
| P3 Sceptic | 6 | 6 | 8 | 8 | 28 | Critical mismatch |
| P4 Avansat | 15 | 12 | 13 | 16 | 56 | Needs work |

Collection `/collections/pudra-proteica` (evidence: 5 products, word_count 591 mostly nav/footer, main content opens with "Filtre Sortează după ... Doar în stoc Preț Cantitate 2000g 3000g", collection description empty, CollectionPage schema `"description": ""`, H2s only "Alte categorii" and "Ghiduri și sfaturi utile", cards show "44 recenzii" / "14 reviews")

| Persona | Rel | Cla | Tru | Act | Total | Rating |
|---|---|---|---|---|---|---|
| P1 | 12 | 10 | 11 | 16 | 49 | Needs work |
| P2 | 13 | 12 | 11 | 16 | 52 | Needs work |
| P3 | 5 | 6 | 7 | 10 | 28 | Critical mismatch |
| P4 | 12 | 12 | 11 | 16 | 51 | Needs work |

Product `/products/creatina-creapure` (evidence: H1 "Creatine (Creapure®)" vs title "Creatina Creapure - Supliment pentru Performanță Fizică"; "Preț redus 180,00 lei", "Produs în Uniunea Europeană", "În stoc", 17 recenzii; CTA "Reprezinți o companie? Înregistrează-te în platforma B2B" placed directly under "Adaugă în coș"; "Customer Reviews" heading in English; educational H2s "Ce Este Creatina Creapure?", "Beneficiile...", "Cum Funcționează...", "Recomandări de Utilizare" sit below "S-ar putea să-ți placã" and reviews; breadcrumb "All Products"; no price per serving, no link/comparison to the 100-lei monohidrat product)

| Persona | Rel | Cla | Tru | Act | Total | Rating |
|---|---|---|---|---|---|---|
| P1 | 18 | 13 | 16 | 18 | 65 | Good |
| P2 | 14 | 12 | 15 | 18 | 59 | Needs work |
| P3 | 10 | 10 | 12 | 16 | 48 | Needs work |
| P4 | 20 | 15 | 17 | 19 | 71 | Good |

Article `/blogs/news/bcaa-vs-eaa-diferențe-și-beneficii-pentru-culturisti-ghid-complet` (evidence: "29 mai 2025 De Marius Chera", 517 body words, H3-only structure, 0 internal links, 0 product links, 0 external links, only "Te-ar putea interesa" H2, Article JSON-LD invalid per schema findings)

| Persona | Rel | Cla | Tru | Act | Total | Rating |
|---|---|---|---|---|---|---|
| P1 | 18 | 15 | 10 | 4 | 47 | Needs work |
| P2 | 6 | 8 | 8 | 3 | 25 | Critical mismatch |
| P3 | 8 | 10 | 8 | 3 | 29 | Critical mismatch |
| P4 | 14 | 14 | 9 | 4 | 41 | Needs work |

Weakest persona overall: **P3 Sceptic** (28/28/48/29): no lab/certification evidence on any money page. Systemic dimension: **Action on articles** (3-4/25) and **Trust** everywhere (max 17/25).

SXO Gap Score tables (Page type 15 / Depth 15 / UX 15 / Schema 15 / Media 15 / Authority 15 / Freshness 10)
- /collections/creatina vs "creatina monohidrata": 11 / 2 / 7 / 5 / 6 / 3 / 4 = **38**. SERP = product pages with price in title and review-sorted categories; the collection has 3 cards, 560 words of chrome, empty description, no comparison, no reviews aggregate.
- /collections/pudra-proteica vs "pudra proteica": 11 / 2 / 8 / 5 / 6 / 3 / 5 = **40**.
- /blogs/news/bcaa-vs-eaa-... vs "bcaa vs eaa": 12 / 4 / 6 / 3 / 6 / 3 / 1 = **35** (SERP = 1500+ word brand blogs with locale copies; page is 517 words, invalid Article schema, 2025 date, no sources).
- /products/creatina-creapure vs "creatina creapure": 14 / 11 / 10 / 4 / 9 / 7 / 3 = **58** (right type; loses on invalid Product JSON-LD (no rich result), English H1, no lab proof, no per-serving price).

## Findings

### SXO-01 Blog posts, not the creatine collection or products, are the pages Google associates with the creatine money terms
- Severity: High
- Evidence: Store-restricted SERP "creatina monohidrata" (2026-10-12): primesupplements.ro appears only with `/blogs/news/creatina-monohidrata-nitrox-no-stim-combining-supplements` and `/blogs/news/monohydrate-creatine-cum-sa-stii-daca-creatina`; competitors rank with `gymbeam.ro/creatina-monohidrat?product_list_order=reviews_count` (category), `gymbeam.ro/creatina-monohidrata-mammut-nutrition.html`, `.../creatina-monohidrata-gymbeam.html`, `.../creatina-monohidrata-redcon1.html`, `decathlon.ro/creatina-monohidrata-creapure-id_8601333.html` + 3 more decathlon product pages. "creatina": site surfaces with `/blogs/news/creatina-si-volumizarea-musculara-cum-sa-stii-daca-creatina`; competitors with `gymbeam.ro/creatina-creapure` (product), `bodyline.ro/cresterea-masei-musculare/creatina-monohidrata/` (category, title "...Doar 89 Lei"). The store's own `/collections/creatina` has 3 products (CollectionPage numberOfItems 3), 560 words incl. chrome, empty description, title "Creatina monohidrat pentru forță și performanță"; `/products/creatina-creapure` never surfaced even for "creatina creapure". 68 of 355 articles carry "creatin" in the title (80 in the handle), 19 handles contain "creapure", 42 handles end in -2..-5 (regenerated topics); `$R/shopify/articles-all.json`. The search engine's own summary flagged "Several 2026 blog posts from supplement sellers make exaggerated or inaccurate claims".
- Affected scope: the entire creatine cluster (collection, 4 creatine products, 68 articles) and, by the same pattern, protein (29 titles), fat burners (28), BCAA (13), pre-workout (13), glutamine (12).
- Recommendation: (1) Make `/collections/creatina` the hub: add 500-700 words of buying-guide content in `collection.description` (monohidrat vs Creapure, 3-5 g/zi, când se ia, micronizată, preț/porție), a 4-row comparison table of the store's creatine SKUs (gramaj, porții, preț/porție, Creapure da/nu), and the Judge.me aggregate for the collection; in the Impact theme add a `rich-text`/`custom-liquid` block under the product grid in `sections/main-collection.liquid` rather than above it. (2) Consolidate the 68 creatine articles into at most 8 pillar guides (ghid dozare, Creapure vs monohidrat, efecte secundare/mituri, creatina pentru femei, creatina și slăbit, creatina în călătorii, pauză/ciclare, creatina + pre-workout) and 301 the rest to the pillar or to the collection (Shopify Admin > URL redirects, bulk CSV). (3) In every remaining creatine article add a first-screen link "Vezi creatina monohidrat și Creapure în stoc" to `/collections/creatina` and a product card to the relevant SKU (metafield `article.metafields.custom.featured_product` rendered in `sections/main-article.liquid`). (4) Remove the duplicate `primesupplements1.myshopify.com` links so link equity goes to one URL.
- Falsifiability: after 8-12 weeks GSC "Performance > Pages" for queries containing "creatin" should show /collections/creatina and the 2 creatine products as the top URLs; if blog URLs still take >70 % of creatine impressions, the consolidation did not work.
- Leading indicator: GSC query report filtered "creatin": share of clicks landing on /collections/ or /products/ URLs (today, from the observed SERPs: 0 %).
- Effort: L
- Confidence: 0.85

### SXO-02 Collection pages are "filters + 3-5 cards" while the Romanian SERP rewards rich category pages (and guides)
- Severity: High
- Evidence: `/collections/pudra-proteica`: 5 products, word_count 591 (`$R/parsed/pages_collection.json`), `collection.description` empty (22 of 23 collections per audit context), CollectionPage JSON-LD `"description": ""`, main content starts with "Filtre Sortează după Recomandat ... Doar în stoc Preț Lei Cantitate 2000g 3000g", H2s only "Alte categorii" and "Ghiduri și sfaturi utile". The collection is indexed (site: result title "Pudra proteica pentru masa musculară") but absent from both the open "pudra proteica" SERP (medlife.ro guide, biogena.com guide x2, drmax.ro products, bzi.ro advertorials for Bodyline, puterea.ro) and the store-restricted one (decathlon.ro category x3 incl. "Pudră Proteică - Proteine din Zer și Vegetale", drmax.ro category "Proteine (pudre proteice)", emag.ro filtered category). Same pattern for `/collections/creatina` (3 products, 560 words) and `/collections/suplimente-pre-workout` (absent from "suplimente pre workout", where bulk.com/ro and drmax.ro category pages rank). The "Cantitate" filter exposes only "2000g, 3000g" although the collection sells 1 kg and 30 g items.
- Affected scope: 23 collections (all 185 products' category entry points).
- Recommendation: For each of the 12 category collections write 300-700 words of Romanian category copy answering the P1/P3 questions seen in the SERP (ce este, tipuri concentrat/izolat/vegetal, cum alegi, cât/când, siguranță, certificări TUV/IFS/HALAL) + 3-5 FAQs (keep FAQPage markup for AI/LLM readers only), add a comparison table of the SKUs (proteină/porție, preț/porție), show the collection-level review count, and cross-link the 2-3 best articles. Place a short intro (60-90 words) above the grid and the long block below it (Impact: `main-collection` "description" setting + a `rich-text` section after the grid). Fix the "Cantitate" filter: use the Search & Discovery app and map all variant weights (30g, 1000g, 2000g, 3000g).
- Falsifiability: if after the copy is live the collection still does not appear in the top 20 for its exact-match title query (GSC average position), the page is held back by authority, not content.
- Leading indicator: GSC impressions for the collection URL on queries "pudra proteica", "pudre proteice", "proteine", and dwell/scroll depth on the new block (Clarity).
- Effort: M
- Confidence: 0.85

### SXO-03 The brand name is not owned in search: "prime supplements" / "primesupplements" / "prime whey" return other companies
- Severity: High
- Evidence: "prime supplements": hari.ca (Hagen Prime bird vitamin), Prime Nutrition by Blackstone Labs x2, Prime Brands (patch.com), hellopharmacist "Prime", 1800dtc "Prime Sports Nutrition" x2, eBay, NIH label; 0 results for the Romanian store. "primesupplements": same plus Wikipedia "Prime Supermarket", Alpha Prime Supps trademark, Prime Biome spam. "prime supplements romania suplimente": only market news (forbes.ro x4, economica.net x2, stirileprotv.ro). "prime whey proteina": QNT Prime Whey (paris.cl x2, decathlon.de), Body Action "100% Whey Prime" x4, Prozis "Prime Whey" x2; the only Romanian hit is the aggregator `shopping.truda.io/product/proteina-din-zer-prime-supplements-prime-whey-1000g-bourbon-vanilla`, not the store. Contributing on-site signals: homepage title "Prime Supplements - Hardcore Sports Nutrition" (English tagline), Organization schema `foundingDate "2020"` while /pages/despre-noi says founded 2022 by Marius Chera, no telephone/address in schema, vendor "primesupplements1" on 64 products, no brand suffix in the title template.
- Affected scope: every navigational/brand query and all product-brand queries ("prime whey", "combat pro", "nitrox no-stim", "thermo core" all collide with foreign products).
- Recommendation: build the brand entity: (1) Title template `{{ page_title }} | Prime Supplements` (layout/theme.liquid) and homepage title "Prime Supplements România - Suplimente sportive produse în UE"; (2) one consistent Organization/OnlineStore schema with legalName "PRIME SPORT SUPPLEMENTS SRL", founder Marius Chera, foundingDate 2022, address Cisnădie, telephone +40775286584, sameAs (Facebook, Instagram, TikTok, LinkedIn chera23, Google Business Profile); (3) create a Google Business Profile for the Cisnădie address and a Merchant Center account so brand + product queries show the store's own listings; (4) rename products to carry the brand in the H1/title ("Prime Whey 2 kg - proteină din zer Prime Supplements"); (5) set vendor "Prime Supplements" on all 185 products; (6) seek 5-10 Romanian mentions (press, fitness YouTubers, Lucian Borza-type interviews) with the exact brand string "Prime Supplements România".
- Falsifiability: a monthly manual check of "prime supplements" on google.ro; failure = the store is not #1 with sitelinks within 3 months of the changes.
- Leading indicator: GSC branded query impressions and CTR; Knowledge Panel appearance.
- Effort: M
- Confidence: 0.8

### SXO-04 Legacy WooCommerce URLs (categorie-produs, ?v= cache-buster, www host) are still what Google shows for the site
- Severity: High
- Evidence: `site:primesupplements.ro` returned 10 results of which 4 are pre-migration or parameter URLs: `https://www.primesupplements.ro/categorie-produs/suplimente/`, `https://primesupplements.ro/categorie-produs/suplimente/?v=1eb2628f4187`, `https://primesupplements.ro/categorie-produs/suplimente/vitamine-si-minerale`, `https://primesupplements.ro/collections/suplimente-pre-workout?v=1eb2628f4187` (the search engine noted one result "about 626 days" old). Live: the www URL needs 3 redirects to reach content (www -> non-www -> `/collections/suplimente` -> `/collections/suplimente-sala`), the `?v=` parameter is carried through the 301 and the collection serves it with HTTP 200 (canonical to the clean URL, so a crawlable duplicate rather than an index duplicate).
- Affected scope: all former WooCommerce `/categorie-produs/...` and `/produs/...` URLs (count unknown; at least 3 observed) and any URL carrying `?v=` (WooCommerce geolocation cache-buster).
- Recommendation: (1) Export the old WooCommerce sitemap/GSC legacy URLs and load a complete one-hop redirect map in Shopify Admin > Online Store > Navigation > URL redirects (e.g. `/categorie-produs/suplimente/` -> `/collections/suplimente-sala`, `/categorie-produs/suplimente/vitamine-si-minerale` -> `/collections/vitamine-si-minerale`); redirects must point to the final URL, not to `/collections/suplimente`. (2) Shopify strips unknown parameters only in canonical; keep the canonical but add `?v=*` handling via the redirect map (`/collections/suplimente-pre-workout?v=1eb2628f4187` -> clean URL) for the observed values. (3) In GSC submit the main sitemap and use "Removals > Outdated content" for the www/legacy results; verify the www property too.
- Falsifiability: a `site:primesupplements.ro categorie-produs` check after 60 days should return 0 results; if legacy URLs persist, the redirects are not 301 or GSC removal was not requested.
- Leading indicator: GSC Pages report "Page with redirect" count going up then down; crawl stats for `categorie-produs`.
- Effort: S
- Confidence: 0.9

### SXO-05 The wholesale store b2b.primesupplements.ro is indexed and surfaces product pages with B2B prices to consumers
- Severity: High
- Evidence: `site:b2b.primesupplements.ro` returned `https://b2b.primesupplements.ro/products/combat-pro` "Combat PRO 500g/22 serv" showing "140 RON vs 170 RON", flavours, "pickup unavailable", seller PRIME SPORT SUPPLEMENTS SRL. Live HTTP 200, no noindex, no canonical to the main store; the B2B sitemap lists 58 product URLs with the same handles as the main store (audit context). A consumer landing on it sees a different price and no retail checkout flow; Google can also pick the B2B copy as canonical for the duplicated description.
- Affected scope: 58 B2B product URLs duplicating 58 retail products (31 % of the catalogue).
- Recommendation: Put the B2B store behind login (Shopify B2B "require customers to log in" / storefront password), add `<meta name="robots" content="noindex, nofollow">` to its `layout/theme.liquid`, remove it from any sitemap submission, and (if it must stay public) add `<link rel="canonical" href="https://primesupplements.ro/products/{{ product.handle }}">` on its product template. Keep `/pages/inregistrare-b2b` on the main domain as the only indexable B2B entry.
- Falsifiability: `site:b2b.primesupplements.ro` returns 0 results within 4-8 weeks; otherwise the noindex is not served on the pages Google fetched.
- Leading indicator: GSC coverage of the b2b property; Shopify B2B order source mix.
- Effort: S
- Confidence: 0.9

### SXO-06 Commercial head-term SERPs are dominated by pharmacies, medical publishers and marketplaces; the store competes with zero authority and no advertorial/PR footprint
- Severity: Medium
- Evidence: Recurrent ranking domains across the 11 commercial queries: drmax.ro (8 queries), medlife.ro (4), bulk.com/ro (5), decathlon.ro (3), gymbeam.ro (2), catena.ro, biogena.com, emag.ro, worldclass.ro, bzi.ro (2, advertorials for Bodyline: "Prima pagină » Magazin » Bodyline. Ce este pudra proteică?", "Body Line- Complex de vitamine..."), prosport.ro ("ADVERTORIAL. Beneficiile ... batoanelor proteice"), infocons.ro consumer tests, newsweek.ro. primesupplements.ro: 0 of 11. The domain is absent from the Common Crawl web graph (audit context) and no referring-domain data exists. The "batoane proteice" and "pudra proteica" SERPs are consumer-protection framed (InfoCons sugar 2-36 g/100 g, salt 0-1.3 g/100 g; "De ce sunt periculoase batoanele proteice"), i.e. Google serves trust content before shops.
- Affected scope: all category-level non-brand queries.
- Recommendation: (1) Mirror the competitor tactic with 4-6 Romanian advertorials/interviews per year (bzi.ro, prosport.ro, worldclass.ro style) that link to the collection hubs, authored by Marius Chera as "nutriționist certificat"; (2) publish a lab-transparency page (/pages/analize-de-laborator) with per-batch certificates for protein, creatine and bars, and link it from every product page (answers the InfoCons/newsweek framing); (3) create a comparison page "Cea mai bună creatină în 2026: monohidrat vs Creapure vs HCL" (Comparison page type, table + verdict) because that SERP has only guides, a forum and product pages and no structured comparison; (4) register the store on price aggregators that already index it (shopping.truda.io) and on compari.ro/price.ro.
- Falsifiability: no new referring domains in 6 months (Ahrefs/Moz free tiers) and no movement for the 11 queries would show the authority gap was not addressed.
- Leading indicator: referring domains count; GSC impressions on non-brand category queries.
- Effort: L
- Confidence: 0.75

### SXO-07 The homepage opens with an English slogan and a row of sold-out apparel, failing every supplement-buyer persona above the fold
- Severity: High
- Evidence: `$R/home.html` main content order: hero "PRIME SUPPLEMENTS Hardcore sports nutrition Vezi produse" -> category tiles -> "NOU - Haine MNX" with cards "Stoc epuizat MNX Shaker 600 ml No reviews Preț redus 30,00 lei", "MNX Ribbed shorts Hammer 3.0, white ... Stoc epuizat", "MNX Ribbed shorts Hammer, grey No reviews ... Stoc epuizat"; supplements ("Pudre proteice", "Pre Workout", "Cele mai vândute") only after that; H2 "Reduceri" section links to `/collections/reduceri` which has 0 products (audit context). Trust strings: "Livrare gratuită la comenzile de peste 300 RON" (announcement bar) and "Tehnologii de ultimã generație şi ingrediente de cea mai înaltă calitate" only; TUV/IFS/HALAL certifications exist only on /pages/despre-noi (site: snippet). Mixed language on the page: "No reviews", "14 reviews" next to "44 recenzii", "Let customers speak for us", title "Hardcore Sports Nutrition". Persona scores: P3 28/100, P1 44/100.
- Affected scope: homepage (the brand landing page for 100 % of navigational traffic).
- Recommendation: Reorder Impact sections: (1) hero with Romanian value proposition and 3 USPs ("Suplimente produse în UE", "Livrare gratuită peste 300 lei", "4,8/5 din 1 000+ recenzii" using the real Judge.me total), primary CTA "Vezi cele mai vândute" to a manual in-stock collection; (2) a "De ce Prime" trust strip with TUV/IFS/HALAL badges and a link to the lab certificates page; (3) best-selling supplements row (featured collection with "show only in-stock" or a manual collection curated weekly); (4) move "Haine MNX" below the supplement rows and hide sold-out variants; (5) remove the "Reduceri" section until the collection is populated (automatic collection rule: compare-at price > price); (6) translate Judge.me widget strings (Judge.me > Settings > Translations: "recenzii", "Nicio recenzie", "Ce spun clienții noștri").
- Falsifiability: Clarity recordings showing scroll past the MNX row before any click; if homepage -> collection click-through does not rise after the reorder, the issue is elsewhere.
- Leading indicator: Clarity "dead clicks" and scroll depth on the hero; Shopify "Sessions converted" from landing page = homepage.
- Effort: M
- Confidence: 0.8

### SXO-08 Product pages hide the educational content and the price logic that the decision-stage SERP expects, and distract with a B2B CTA
- Severity: Medium
- Evidence: `/products/creatina-creapure` (`$R/pages/product-creatina-creapure.html`): H1 "Creatine (Creapure®)" in English while title/meta say "Creatina Creapure"; "Preț redus 180,00 lei" with no price per serving (1,80 lei/porție) and no comparison with the store's own 100-lei `creatina-monohidrat-micronized-300g-fara-aroma`; "Reprezinți o companie? Înregistrează-te în platforma B2B" directly under "Adaugă în coș"; "Customer Reviews" heading in English; the four buyer-education H2s ("Ce Este Creatina Creapure?", "Beneficiile Creatinei Creapure", "Cum Funcționează...", "Recomandări de Utilizare") render after "S-ar putea să-ți placã", "Customer Reviews", "Cele mai vândute", "Categorii populare"; breadcrumb JSON-LD "All Products"; Product JSON-LD invalid on multi-line descriptions and AggregateOffer with "190,00" (schema findings), so none of the price/rating rich results that decathlon/gymbeam product results carry. Competitor SERP titles carry price ("Doar 89 Lei") and the Creapure brand; the store's product page never surfaced for "creatina creapure".
- Affected scope: 85 supplement product pages (template `sections/main-product.liquid`); the 100 MNX apparel pages have the same template with 0-word descriptions.
- Recommendation: (1) Romanian H1s ("Creatină Creapure® 500 g / 300 g"), keep brand in title; (2) add a "Preț per porție" line in `snippets/product-info.liquid` computed from `product.selected_or_first_available_variant.price | divided_by: servings_metafield`; (3) move the B2B link to the footer or a collapsible "Ești profesionist?" row; (4) move the description/education block above recommendations and reviews (Impact: section order in `templates/product.json`), add a 3-column "Care creatină ți se potrivește?" comparison linking the 3 creatine SKUs; (5) add a trust row (Produs în UE, lot testat - link certificat, retur 14 zile, livrare 24-48 h); (6) fix Product schema (Offer per variant, numeric price, priceValidUntil, hasMerchantReturnPolicy, shippingDetails, aggregateRating from Judge.me) so the SERP listing can show price and stars like competitors.
- Falsifiability: GSC "Merchant listings"/"Product snippets" enhancement reports show 0 valid items after the schema fix -> the fix is wrong; add-to-cart rate on the page does not change after moving the B2B CTA -> distraction hypothesis was wrong.
- Leading indicator: Product page CTR in GSC for product-name queries; add-to-cart rate (Shopify Analytics).
- Effort: M
- Confidence: 0.8

### SXO-09 355 machine-generated articles cannibalise each other and target transactional topics with informational pages
- Severity: High
- Evidence (`$R/shopify/articles-all.json`, `catalog-analysis.md`): titles containing creatin 68, protein/whey/izolat 29, fat-burner/slăbit 28, BCAA 13, pre-workout 13, glutamină 12; 46 titles contain "semne", 49 start with "Cum", 33 use "N semne/motive/greșeli" listicle framing, 279 contain 2025/2026, 24 contain "ghid"; 47 keyword groups cover 164 articles; 719 title pairs with similarity > 0.6; 42 handles end in -2..-5. Concrete collisions: "pre-workout fără cofeină" = 3 articles (`ce-este-un-pre-workout-fara-cofeina` 2025-05-26, `citicolina-ghid-pre-workout-fara-cafeina` 2026-03-15, `apa-de-cocos-nitrox-no-stim-antrenamente-seara` 2026-10-11) + the product Nitrox NO-STIM, while the SERP for that query is 6 product pages (bulk.com "Dope pre-workout fără cofeină" 129 RON, kespro, muziker) and 3 guides; "efecte secundare glutamina" = 2 near-identical handles (`glutamina-si-sanatatea-stomacului-efecte-secundare-glutamina-ghid-complet`, `glutamina-si-sanatatea-stomacului-cand-sa-iei-glutamina-semne`) against a medical SERP (apollohospitals, ncbi x2, cochrane); "bcaa vs eaa" = 517-word 2025 article with 0 links against 1500+ word brand blogs (nakednutrition x7 locales, openfarma.it, fitadium). 17 titles and 49 handles contain product names (Prime Whey, Combat PRO, Nitrox, Thermo Core, Crema de orez, Ready To Go...) so blog posts compete with their own product pages for product-name queries. Handles are auto-generated from English prompts (191 contain English fragments, e.g. `gymbeam-creatine-creatina-monohidrat-micronized-300g-fara-5` includes a competitor's brand). None of the 355 articles appeared in the 3 article-topic SERPs checked.
- Affected scope: 355 articles (the majority of the site's 1151 indexable URLs) and the collections/products they outrank internally.
- Recommendation: Content inventory with three buckets: KEEP & MERGE (one pillar per keyword group, 47 groups -> about 40 pillars, merge bodies, keep the best handle, 301 the others), REDIRECT (product-name posts -> the product page; "fără cofeină" posts -> a single guide that links the Nitrox NO-STIM product whose title should become "Nitrox NO-STIM - Pre-workout fără cofeină 660 g"), DELETE/NOINDEX (73-word L-carnitine post, English-titled unpublished drafts, -2..-5 regenerations). Stop the BlogGenAuto schedule until the inventory is done; rename handles that contain competitor brands (`gymbeam-...`). Add blog tags = collection names so each pillar sits in a tag hub linked from the collection.
- Falsifiability: GSC query report where >1 article receives impressions for the same query 8 weeks after consolidation means the merges were not redirected; blog share of total clicks should fall while collection/product clicks rise.
- Leading indicator: number of indexed /blogs/news/ URLs (GSC Pages) trending from 354 to ~60-80.
- Effort: L
- Confidence: 0.85

### SXO-10 Articles are dead ends for every decision-stage persona: no product path, weak author trust, stale dates
- Severity: Medium
- Evidence: BCAA vs EAA article: 0 internal links, 0 product links, 0 external links, only "Te-ar putea interesa" H2, "29 mai 2025 De Marius Chera" with no credential link, 517 words; Action scores 3-4/25 for all personas. Blog-wide: 112 articles have 0 collection links, 6 have 0 product links, 194 carry a dofollow "Powered by BlogGenAuto" footer link, every product link is duplicated to `primesupplements1.myshopify.com` (2582 links), author bio boilerplate repeats with contradictory facts ("8" vs "10 NPC PRO Cards", "15 ani" vs "18 ani"), Article JSON-LD is invalid (escape bug), 352 bodies start with a hard-coded English "Published: May 15, 2026" line. Blog index title "Ultimele articole", 11 per page, 33 pages deep, no tag hubs.
- Affected scope: 355 articles; blog index.
- Recommendation: In `sections/main-article.liquid` add (a) an author box rendering a real `/pages/marius-chera` page (credentials, LinkedIn, photo) and `author` metaobject, (b) a "Produse recomandate" block (2-3 product cards from an article metafield) after the second H2 and at the end, (c) a "Vezi categoria" link to the matching collection in the first 100 words, (d) visible "Actualizat la {{ article.updated_at }}". Strip the "Published:" line, the BlogGenAuto links and the myshopify links with a bulk body rewrite (Admin API `articleUpdate`). Fix the blog index: title "Blog Prime Supplements - ghiduri de suplimente", 24 per page, tag hubs per category.
- Falsifiability: article -> product click-through (GA4 event or Shopify "Sessions by landing page" -> "Added to cart") stays flat after the blocks are added.
- Leading indicator: assisted conversions from /blogs/ landing sessions; internal link clicks on the "Produse recomandate" block (Clarity).
- Effort: M
- Confidence: 0.8

### SXO-11 The MNX apparel line (54 % of the catalogue) has no searchable identity and is given homepage priority over supplements
- Severity: Medium
- Evidence: "MNX haine sala tricou" returns only MNX1 antibody vendors (biossusa, lsbio, biorbyt, abbexa) and a Schneider Electric "MNx" breaker; 100 MNX products, 93 with English titles ("MNX Hoodie Industrial, dusty rose"), description median 0 words, 89 without SEO title/description, 82 without GTIN, 22 out of stock everywhere, colour variants published as separate products (19 near-duplicate groups / 45 products); the homepage's first product row is "NOU - Haine MNX" with sold-out items.
- Affected scope: 100 products, /collections/haine-mnx, /collections/echipament-sala.
- Recommendation: Decide the role of MNX: if it is a brand, give it one brand landing page (`/collections/haine-mnx` with "MNX - haine de sală by Prime Supplements", 300 words, size guide, fabric, model photos) and target Romanian demand ("haine sala barbati", "tricouri sala", "pantaloni scurti sala", "hanorac sala") in titles/H1s; merge colour variants into one product with colour options; hide sold-out products from the homepage and set them to "draft" or noindex when stock is 0 for >60 days; if MNX is secondary, remove it from the hero area entirely.
- Falsifiability: GSC impressions for "mnx" + apparel queries remain 0 after 3 months of the brand page being live.
- Leading indicator: impressions on "haine sala"/"tricou sala" queries; MNX share of homepage clicks (Clarity heatmap).
- Effort: M
- Confidence: 0.7

### SXO-12 The /ro-hu/ market serves Hungarian searchers Romanian content in RON and is invisible anyway
- Severity: Medium
- Evidence: `site:primesupplements.ro/ro-hu` returned no site URL (termene.ro, bulksupplements.com/ro-hu, iherb noise) although 575 /ro-hu/ URLs are in the sitemap with hreflang `ro-HU`; the market has no Hungarian locale published and no HUF pricing (audit context; `$R/pages/homepage-ro-hu.html` is identical Romanian content). A Hungarian-intent searcher who did land there would get Romanian copy and lei: zero search experience value, while every URL is crawled twice.
- Affected scope: 575 duplicate URLs (50 % of the sitemap).
- Recommendation: Either (a) disable the Ungaria web presence subfolder until Hungarian translations (Translate & Adapt) and HUF are ready, or (b) publish the HU locale with translated collections/products first and keep articles ro-only. Do not keep an untranslated market live.
- Falsifiability: after disabling, Shopify should 301 /ro-hu/* to /*; if GSC still reports /ro-hu/ URLs indexed after 8 weeks the redirects did not deploy.
- Leading indicator: GSC "Duplicate, Google chose different canonical" count.
- Effort: S
- Confidence: 0.85

### SXO-13 Mixed-language UI and catalogue strings break clarity for Romanian personas on every template
- Severity: Low
- Evidence: Homepage/collection/product: "No reviews", "14 reviews" vs "44 recenzii" on adjacent cards, "Let customers speak for us", "Customer Reviews"; product H1 "Creatine (Creapure®)"; collection H1 "All Products"; breadcrumb "All Products"; title "Hardcore Sports Nutrition"; 96 English product titles; article bodies start with English "Published: May 15, 2026"; hard-coded "Tehnologii de ultimã generație" uses a wrong diacritic (ã instead of ă) in the announcement bar; homepage meta description has no diacritics.
- Affected scope: all templates (Judge.me widget strings), 96 products, 352 articles.
- Recommendation: Judge.me > Settings > Translations (ro); theme locale `locales/ro.json` for "All Products" -> "Toate produsele"; rename the `all` collection title; fix the announcement bar text; Romanian product titles with the English name as secondary ("Creatină Creapure® (Creatine)").
- Falsifiability: a grep of the rendered homepage for "reviews|Customer Reviews|Let customers" still returns matches.
- Leading indicator: none needed beyond the grep.
- Effort: S
- Confidence: 0.9

### SXO-14 Deal-seeking persona is routed to an empty "Reduceri" collection although 144 products have a strike-through price
- Severity: Medium
- Evidence: Homepage H2 "Reduceri" section links to `/collections/reduceri` (0 products, HTTP 200, indexable, title "Reduceri" - audit context, `$R/pages/collection-reduceri.html`); 144/185 products carry compareAtPrice; product cards show "Preț redus ... Economisește 20,00 lei". Price-comparison intent is strong in the observed SERPs (bodyline "Doar 89 Lei", gymbeam review-sorted category, price aggregators for "pret").
- Affected scope: 1 collection, homepage section, all 144 discounted products.
- Recommendation: Make "Reduceri" an automated collection (condition: Compare-at price > 0 / "Preț de comparație este mai mare decât prețul"), SEO title "Reduceri suplimente - oferte Prime Supplements", 80-word intro, sort by discount; until then remove the homepage section. Add "Economisești X %" badges (Impact theme setting) so the P2 persona sees the discount depth.
- Falsifiability: /collections/reduceri still returns 0 products or the homepage section still links to it.
- Leading indicator: clicks on the homepage "Reduceri" section (Clarity) and collection conversion rate.
- Effort: S
- Confidence: 0.9

### SXO-15 Three identical 185-product listings ("All Products", "Cele mai vândute", "Lansate recent") plus "11% TVA" and "Prime Health" compete for the generic "suplimente" entry point with no intent match
- Severity: Low
- Evidence: all 185 products sit in `all`, `cele-mai-vandute`, `lansate-recent` (audit context); `/collections/prime-health` appeared in the site: results with the bare title "Prime Health" (no keyword); `/collections/11-tva` is an internal tax grouping (15 products) that is indexable; the legacy `/categorie-produs/suplimente/` redirect chain ends at `/collections/suplimente-sala` ("Suplimente sală pentru performanță") so the inherited "suplimente" equity lands on yet another generic listing.
- Affected scope: 5 collections.
- Recommendation: Keep one generic hub (`/collections/suplimente-sala` as "Suplimente sportive - toate produsele Prime Supplements", with category tiles and 300 words), make `cele-mai-vandute` a real best-seller collection (sort by best-selling, limit via manual collection or Search & Discovery), rename "Prime Health" to "Vitamine, minerale și sănătate (Prime Health)", noindex `11-tva` and `lansate-recent` via the theme (`{% if collection.handle == '11-tva' %}<meta name="robots" content="noindex">{% endif %}` in theme.liquid) and remove them from navigation.
- Falsifiability: GSC shows the three generic listings still receiving impressions for the same queries after 8 weeks.
- Leading indicator: impressions split for "suplimente"-type queries across the 5 URLs.
- Effort: S
- Confidence: 0.8

### SXO-16 FAQPage markup on the homepage and creatine products has no SERP effect; keep it only as content
- Severity: Info
- Evidence: homepage FAQPage ("Articolul comandat nu este in stoc. De ce apare pe site?" ...) and `faq-schema-creatina.liquid` on 3 products; Google removed FAQ rich results for commercial sites (May 2026 per audit rules). The homepage FAQ answers logistics questions (stoc, retur, plată) that are useful for P2/P3 but are placed at the very bottom of a 630 KB page.
- Affected scope: homepage, 3 products.
- Recommendation: keep the visible FAQ, move the logistics answers into the product-page trust row, no schema work needed.
- Falsifiability: n/a (informational).
- Leading indicator: n/a.
- Effort: S
- Confidence: 0.9

## Limitations

- The search tool is a US-indexed engine, not google.ro: absolute positions, PAA, ads, AI Overviews, shopping units and "related searches" could not be observed; several bare Romanian queries returned Spanish/Portuguese/French/Italian pages (`creatina`, `creatina monohidrata pret`, `glutamina`, `pre workout`, `bcaa vs eaa diferente`, `creatina creapure`) and were complemented with qualified or store-restricted variants. "primesupplements.ro absent" therefore means absent from this engine's top results on 2026-10-12, which is strong but not conclusive evidence for google.ro.
- The `site:` operator was only partially honoured (the /ro-hu query returned unrelated domains), so index coverage counts are indicative.
- No Search Console, GA4, CrUX or rank-tracking data; persona scores and user stories are derived from result composition rather than PAA/ad copy as the framework prefers.
- Only one collection, one product and one article were scored in depth; the systemic patterns (empty descriptions, invalid schema, mixed language) were verified across the parsed files, but per-page scores for other URLs may differ.
- Pages were assessed from static HTML copies (`$R/`), not a rendered viewport; above-the-fold order is inferred from section order in the HTML.
