# CLUSTER: Semantic clustering & content architecture (blog + collections) — primesupplements.ro

Audit date: 2026-10-12. Specialist: seo-cluster (hub-and-spoke / SERP-overlap method). Key: `cluster`.

## Scope & method

**Checked**
- Shopify Admin exports: `$R/shopify/articles-all.json` (355 articles: handle, title, words, product_link_targets, collection_links, tags), `$R/shopify/articles-p1..p8.json` (raw bodies, used to extract every `/collections/` and `/blogs/news/` href inside article bodies), `$R/shopify/products-all.json` (185 products with their collections), `$R/shopify/catalog-analysis.md` (pre-computed duplicate/keyword groups).
- Theme source: `$R/theme/templates__collection.json`, `templates__article.json`, `sections__main-collection.liquid`, `sections__main-blog.liquid`, `sections__main-article.liquid`.
- Rendered pages: `$R/pages/collection*.html` (5 collections), `$R/pages/article*.html` (3 articles), `$R/pages/blog-index.html`, `$R/home.html`, `$R/sitemaps/all-urls.txt` (23 collection URLs).
- Own scripts (scratchpad `cluster/`): `cluster_analysis.py` (article -> hub mapping by handle keyword, title keyword and linked-product collections; product coverage), `kw_groups.py` (decomposes every handle into `<keyword head>-<embedded product handle>-<English angle>`), title-intent x hub grouping, in-blog link graph (in/out degree per article).
- WebSearch (9 queries, Romanian): `creatina beneficii`, `cand se ia creatina dimineata sau seara`, `glutamina beneficii efecte secundare`, `l carnitina slabit pareri`, `arzatoare de grasimi eficiente`, `izolat proteic vs concentrat proteic`, `bcaa vs eaa diferente`, `pudra proteica pentru masa musculara`, `site:primesupplements.ro creatina`.

**Could not check**: Search volumes / true top-10 SERPs (no DataForSEO, WebSearch is US-biased and does not honour `site:` reliably, so pairwise SERP-overlap scores are qualitative, not counted); GSC impressions per article; whether the `custom.seo_text` collection metafield is populated (would need an Admin API read). No live requests were needed: every fact below comes from the local evidence files.

## Score

**24 / 100** (Content Architecture).
Rationale: 355 articles (~530k words) exist but sit on top of 13 hubs that have zero text, zero hub->spoke links and zero taxonomy; the blog itself is 78 creatine articles for 3 products, 42 literal regenerations and handles whose keyword has no relation to the title. The raw material (volume, product links, a prepared seo_text section in the theme) is there, which keeps this above 15.

## What works

- Volume and depth: 354 published articles, median 1529 words, 348 with tables, 338 cite studies (`catalog-analysis.md`).
- 349/355 articles already link to products (1602 product links) and 243/355 link to at least one collection in the body (446 links), so spoke->product and partial spoke->hub plumbing exists.
- The three "creatina" products receive 142 article links; aminoacizi products 102; fiber 92 — the money pages for the strongest hubs are well fed.
- The article graph is dense (1146 distinct article->article edges, median 3 inbound) even if unplanned.
- The collection template already contains a disabled `rich-text` section bound to `{{ collection.metafields.custom.seo_text | metafield_tag }}` (`templates__collection.json` line 218-230) and a `blog-posts` section titled "Ghiduri și sfaturi utile": the theme hooks for hub content and hub->spoke links exist and only need to be wired.
- The theme's blog template supports tag filtering (`sections__main-blog.liquid` lines 73-90, `show_tags`), so an editorial hub per topic can be created with tags alone.
- Hand-written 2025 articles (`bcaa-vs-eaa-...`, `ce-este-un-pre-workout-fara-cofeina`, `water-out-tinctura-...`) target real, distinct queries.

## Hub map (article -> hub assignment, 355 articles)

Assignment rule: keyword in handle head, else keyword in handle/title, else collection of the linked product. Full per-article map: scratchpad `cluster/hub_map.json`.

| Hub (collection) | Products in hub | Articles mapped | Article words | Products linked from >=1 article | Article links to hub products | Body links to the hub collection |
|---|---|---|---|---|---|---|
| /collections/creatina | 3 | 78 | 115,757 | 3/3 | 142 | 100 (50 articles) |
| /collections/aminoacizi | 4 | 51 | 74,544 | 4/4 | 102 | 86 |
| /collections/vitamine-si-minerale | 13 | 51 | 79,359 | 11/13 | 92 | **0** |
| /collections/arzator-de-grasimi | 4 | 44 | 65,704 | 4/4 | 78 | 82 |
| /collections/prime-health | 13 | 34 | 50,608 | 11/13 | 64 | 20 |
| /collections/pudra-proteica | 5 | 31 | 46,708 | 5/5 | 68 | 32 |
| /collections/crema-de-orez | 7 | 25 | 37,861 | 4/7 | 10 | **0** |
| /collections/alimente-sanatoase (fibre) | 2 | 23 | 35,429 | 2/2 | 92 | 86 |
| /collections/suplimente-pre-workout | 7 | 10 | 14,340 | 7/7 | 54 | **0** |
| /collections/suplimente-intra-workout | 4 | 5 | 7,145 | 4/4 | 62 | **0** |
| /collections/batoane-proteice | 4 | 0 | 0 | 3/4 | 6 | **0** |
| /collections/bauturi | 19 | 0 | 0 | **0/19** | **0** | **0** |
| /collections/haine-mnx | 87 | 1 | 1,351 | 1/87 | 2 | 0 |
| orphan / no hub | — | 2 | — | — | — | — |
| (generic) /collections/cele-mai-vandute | 185 | — | — | — | — | 40 |

Orphans: `cum-te-ajuta-combat-pro-sa-ti-cresti-masa-musculara` (pre-workout product, no keyword), `glycerolul-secretul-culturistilor-profesionisti-pentru-un-antrenament-eficient`. 77 articles match more than one hub (handle keyword from one topic, product from another — see CLUSTER-04).

## Findings

### CLUSTER-01 — Every commercial hub is an empty page: 0 words of hub content on 23/23 collections while a prepared `seo_text` section sits disabled in the template
- **Severity:** High
- **Evidence:** `$R/pages/collection.html` (/collections/pudra-proteica), `collection-creatina.html`, `collection-haine-mnx.html`, `collection-all.html`: no `collection__description` element renders any text ("collection description text: NONE"). Admin data: 22/23 collections have an empty description, "Bauturi" has "Bauturi Sport" (2 words). `snippets__schema-collection.liquid` therefore emits `"description": ""`. In `$R/theme/templates__collection.json` the section `rich_text_e4zxV9` (type `rich-text`, order position 7) contains `"content": "{{ collection.metafields.custom.seo_text | metafield_tag }}"` and `"disabled": true` — someone built the hub-text hook and never switched it on. Result: 530k words of spokes point at pillars that contain nothing but a product grid; the pillar keyword of every cluster ("creatina", "pudra proteica", "arzatoare de grasimi", "aminoacizi"...) has no page on the site that explains it.
- **Affected scope:** 13 commercial hubs (23 collection URLs, x2 with /ro-hu/).
- **Recommendation:** (1) In `templates/collection.json` set `"disabled": false` on `rich_text_e4zxV9` and move it directly under `main` in `order` (or keep it below the grid but add a 2-sentence intro in the banner). (2) Create the metafield definition `custom.seo_text` (rich text) if it does not exist and write 350-600 words per hub: what the category is, who it is for, how to choose (form, dose, timing), the 3-6 products, and 4-8 links to the kept spokes (CLUSTER-03) with keyword anchors. Draft order: creatina, pudra-proteica, aminoacizi, arzator-de-grasimi, vitamine-si-minerale, prime-health, pre-workout, intra-workout, crema-de-orez, alimente-sanatoase, batoane, bauturi. (3) Also fill `collection.description` with the first paragraph so the CollectionPage schema and Shopify's default meta fallback stop being empty. Liquid to render the section only when text exists:
```liquid
{%- assign seo_text = collection.metafields.custom.seo_text | metafield_tag -%}
{%- if seo_text != blank -%}
<section class="container collection-seo-text prose"><h2 class="h3">Ghid {{ collection.title }}</h2>{{ seo_text }}</section>
{%- endif -%}
```
- **Falsifiability:** If, after publishing, `curl -s https://primesupplements.ro/collections/creatina | grep -c 'collection-seo-text'` is 0 or the CollectionPage JSON-LD still has `"description": ""`, the fix did not ship.
- **Leading indicator:** GSC: impressions for the 13 collection URLs on non-brand category queries ("creatina", "pudra proteica") within 4-6 weeks; word count of collection pages > 300.
- **Effort:** M (theme flag S; 13 texts M)
- **Confidence:** 0.95

### CLUSTER-02 — Hubs do not link to their spokes: every collection shows the same 3 latest blog posts, so the creatina hub links to oat-cream and L-carnitine articles and to none of its 78 creatina articles
- **Severity:** High
- **Evidence:** `templates__collection.json` section `blog_posts_VYj9G8` (type `blog-posts`, block `blog_TeK4Cm` with `"blog": "news"`) renders the newest posts of the single blog with no per-collection filter. Rendered proof: `collection.html`, `collection-creatina.html`, `collection-haine-mnx.html`, `collection-all.html` all contain exactly the same 3 article hrefs: `/blogs/news/l-carnitine-1000-80-caps-travel-weight-loss-tips`, `/blogs/news/instant-oat-cream-800g-25-serv-mindful-eating-practices-2`, `/blogs/news/omega-3-crema-de-orez-blueberry-muffin` (heading "Ghiduri și sfaturi utile"). The homepage shows the same 3. So hub->spoke links = 0 for all 13 hubs; the mandatory "pillar links to every spoke" rule of the hub-spoke model fails for 355/355 spokes.
- **Affected scope:** 23 collections, 355 articles.
- **Recommendation:** Replace the generic block with a per-collection curated list. Create metafield `custom.guides` (type `list.article_reference`, 4-8 articles per hub = the kept spokes from the cluster plan) and render it in the existing `blog-posts` section (fallback to tag match). Note: `blogs.news.articles` in Liquid is capped at the 50 newest articles, so a tag-based loop alone cannot reach a 355-article blog — the metafield list is required.
```liquid
{%- assign guides = collection.metafields.custom.guides.value -%}
{%- if guides != blank -%}
  <h2 class="h3">Ghiduri {{ collection.title | downcase }}</h2>
  <div class="blog-posts scroll-area bleed md:unbleed">
  {%- for article in guides limit: 8 -%}{%- render 'blog-post-card', article: article -%}{%- endfor -%}
  </div>
{%- endif -%}
```
Also add the same 4-8 links as plain text anchors inside the `seo_text` (CLUSTER-01) so the links exist in body content, not only in a card carousel.
- **Falsifiability:** `grep -o '/blogs/news/[^"]*' collection-creatina.html | sort -u` must list creatina articles only and differ from `collection-haine-mnx.html`.
- **Leading indicator:** Internal-link report (Screaming Frog or `parse_html.py`): each kept spoke gains >=1 inbound link from its hub; crawl depth of kept spokes <= 2 from home.
- **Effort:** M
- **Confidence:** 0.95

### CLUSTER-03 — Creatina cluster: 78 articles (115,757 words) for 3 products cover ~15 intents, each intent written 3-11 times
- **Severity:** High
- **Evidence:** Title-intent grouping over the 78 creatina-hub articles (scratchpad `cluster/intent_groups.json`): "rezultate in N zile/saptamani" 11, "semne ca ai nevoie de creatina" 7, "calitate/puritate/ieftin vs premium" 7, "dimineata sau seara / cand se ia" 7, "stagnare/plafonare a fortei" 6, "pe varste / dupa 40 de ani" 6, "calatorii/deplasare" 5, "hidratare + creatina" 5, "rutina de dimineata" 5, "pauza de creatina" 3, "absorbtie" 3. Literal near-duplicates: `creatina-si-volumizarea-musculara-cum-sa-stii-daca-creatina` ("Cum să știi dacă creatina este potrivită pentru tine: Ghid 2026") vs `monohydrate-creatine-cum-sa-stii-daca-creatina` ("...potrivită pentru tine în 2026") title ratio 0.96; `before-and-after-creatine-creatina-monohidrat-micronized-300g-fara` ("Momentul optim pentru doza de creatină: Dimineața sau seara în 2026?") vs `creatine-gummies-creatina-monohidrat-micronized-300g-fara-4` ("Momentul Optim pentru Creatină: Dimineața sau Seara în Sezonul 2026?") vs `creatine-monohydrate-cand-sa-iei-creatina-dimineata` ("Dimineața vs Seara: Când să iei creatină..."); `creatine-kinase-creatina-creapure-future-trends-in` ("Greșeala de Puritate ... 85%") vs `-2` ("Greșeala de dozare ... 85%"). Three pages for the same query split links and let Google pick a different one each time; WebSearch for "cand se ia creatina dimineata sau seara" shows a weak SERP (forum.softpedia + English spam pages), i.e. one consolidated Romanian page can rank, three cannot.
- **Affected scope:** 78 articles -> keep 17 spokes, re-assign 7 to other hubs, 301 ~54.
- **Recommendation:** Consolidation map (keep = most inbound links / most recent / Romanian handle; merge unique sections from the redirected ones; 301 via Shopify "URL redirects", keep the kept article's handle or rename it with the auto-redirect option):

| Intent (spoke keyword) | KEEP | 301 -> keep |
|---|---|---|
| când se ia creatina (dimineața/seara) | `creatine-monohydrate-cand-sa-iei-creatina-dimineata` | `before-and-after-creatine-creatina-monohidrat-micronized-300g-fara`, `creatine-gummies-creatina-monohidrat-micronized-300g-fara-4`, `creatine-benefits-creatina-monohidrat-micronized-300g-fara-2`, `magneziu-creatina-creapure-morning-vs-evening`, `creatina-si-volumizarea-musculara-rutina-dimineata-creatina-optimizare-sezoniera` |
| dozaj optim creatina | `best-creatine-monohydrate-dozaj-optim-creatina-rezultate-2026` | `creatine-kinase-creatina-creapure-future-trends-in-2`, `creatine-monohydrate-side-effects-cum-sa-iei-corect-suplimentele` |
| când apar rezultatele | `creatina-si-volumizarea-musculara-cand-apar-rezultate-creatina-30` | `creatine-pastile-creatina-monohidrat-micronized-300g-fara`, `before-and-after-creatine-creatine-ready-to-go-plicuri-2` |
| pauza de creatina | `pure-creatine-cand-sa-iei-pauza-de` | `gymbeam-creatine-creatine-ready-to-go-plicuri`, `creatine-side-effects-creatine-ready-to-go-plicuri-2` |
| semne că ai nevoie / e potrivită | `creatina-si-volumizarea-musculara-cum-sa-stii-daca-creatina` | `monohydrate-creatine-cum-sa-stii-daca-creatina`, `creatine-benefits-creatina-creapure-understanding-dosage-recommend`, `creatine-monohydrate-semne-corp-nevoie-creatina-hidratare`, `creatine-kinase-creatina-creapure-understanding-dosage-recommend`, `creatine-side-effects-creatina-creapure-signs-your-body` |
| creatina ieftina vs Creapure (calitate, etichete) | `creatine-pastile-creatina-creapure-seasonal-supplementation-adjus` | `creatine-kinase-creatina-creapure-future-trends-in`, `before-and-after-creatine-creatina-creapure-bioavailability-why-absorption`, `creatina-si-volumizarea-musculara-de-ce-calitatea-creatinei-conteaza`, `creatine-side-effects-creatine-ready-to-go-plicuri`, `monohydrate-creatine-benefits-secrete-etichete-creatina-eficienta-maxima`, `creatine-kinase-creatina-creapure-bioavailability-why-absorption` |
| tipuri de creatina (pudra/plicuri/pastile) | `creatine-pastile-creatine-ready-to-go-plicuri` | `creatine-side-effects-creatine-ready-to-go-plicuri-3`, `creatine-ready-to-go-plicuri-prime-supplements-how-to-transition-between-supp` |
| creatina si hidratare | `creatine-monohydrate-creatina-monohidrat-micronized-300g-fara` | `creatine-benefits-creatina-monohidrat-micronized-300g-fara-3` |
| creatina in calatorii | `gymbeam-creatine-creatina-monohidrat-micronized-300g-fara` (12 inbound; rename to `creatina-in-calatorii`) | `gymbeam-creatine-creatina-monohidrat-micronized-300g-fara-3`, `creatine-kinase-creatine-ready-to-go-plicuri` |
| stagnarea fortei / plafonare | `creatine-creatina-creapure-combining-supplements-with` (11 inbound) | `creatina-si-volumizarea-musculara-stagnarea-fortei-cand-sa-ceri`, `creatine-pastile-creatina-creapure-how-to-evaluate`, `creatine-pastile-creatina-creapure-combining-supplements-with`, `creatine-pastile-creatina-creapure-how-to-read`, `micronized-creatine-monohydrate-plafonare-fizica-creatina-combinatii-suplimente`, `monohydrate-creatine-5-semne-stagnare-forta-creatina`, `creatine-gummies-creatina-creapure-how-to-read`, `creatine-gummies-creatina-monohidrat-micronized-300g-fara-2` |
| creatina pe varste / dupa 40 | `creatine-powder-de-ce-nu-vezi-rezultate` | `creatine-kinase-creatina-creapure-supplements-and-food`, `creatine-monohydrate-creatina-creapure-how-to-evaluate`, `creatine-benefits-creatina-monohidrat-micronized-300g-fara`, `creatine-gummies-creatina-monohidrat-micronized-300g-fara-3` |
| cum combini creatina | `gymbeam-creatine-creatina-monohidrat-micronized-300g-fara-2` (rename `cum-combini-creatina`) | `creatine-gummies-creatina-monohidrat-micronized-300g-fara` ("de ce esueaza rutina"), `gymbeam-creatine-creatina-monohidrat-micronized-300g-fara-4`, `gymbeam-creatine-creatina-monohidrat-micronized-300g-fara-5` |
| creatina masa musculara / forta: mituri | `creatine-side-effects-creatina-monohidrat-micronized-300g-fara` | `creatine-benefits-creatina-monohidrat-micronized-300g-fara-4`, `creatina-si-volumizarea-musculara-ce-iau-expertii-forta-mituri`, `omega-3-creatina-monohidrat-micronized-300g-fara`, `creapure-creatine-monohydrate-moduri-maximizare-forta-creatina-alimente`, `creatine-monohydrate-creatina-performanta-stiinta-2026` |
| termen lung / depozitare | `creatine-ready-to-go-plicuri-prime-supplements-budget-smart-supplementation-s` | `...-budget-smart-supplementation-s-2`, `creatine-gummies-creatine-ready-to-go-plicuri` |
| absorbtie | `creatina-si-volumizarea-musculara-secretele-absorbtiei-creatinei-optimizare-rezultate` | — |
| product spoke: Creapure | `creatine-monohydrate-creatina-creapure-signs-your-body` | `creatine-monohydrate-creatina-creapure-debunking-common-supplement` (unpublished EN draft: delete) |
| product spoke: Ready To Go plicuri | `creatine-ready-to-go-plicuri-prime-supplements-how-to-store-supplements-prope` | `before-and-after-creatine-creatine-ready-to-go-plicuri-4`, `before-and-after-creatine-creatine-ready-to-go-plicuri`, `before-and-after-creatine-creatine-ready-to-go-plicuri-3`, `creatine-ready-to-go-plicuri-prime-supplements-supplements-for-seasonal-welln` |
| re-assign to other hubs | `creatina-monohidrata-baton-proteic-capsuni-how-to` -> batoane; `creatina-monohidratata-nac-80-caps-debunking-common`, `creatina-liver-protect-500-ml-understanding` -> prime-health; `creatina-monohidrata-nitrox-no-stim-combining-supplements` -> pre-workout; `creatina-monohidratata-crema-de-orez-biscuiti-cu` -> crema-de-orez; `creatina-pure-isolate-2000g-most-common` -> pudra-proteica; `creatina-citrulina-intraworkout-90-zile-carbohidrati-intra-workout` -> intra-workout | |

Pillar: the collection `/collections/creatina` with the seo_text guide (CLUSTER-01) linking to the 17 spokes; each spoke links to the hub with anchor "creatină monohidrată" / "creatină Creapure" and to 2-3 sibling spokes.
- **Falsifiability:** After the redirects, `site:primesupplements.ro "dimineața sau seara" creatină` should return one blog URL; the redirect CSV must contain ~54 rows with `/blogs/news/` sources returning 301 (check with `curl -sI`).
- **Leading indicator:** GSC query "cand se ia creatina" shows a single URL with rising position within 6-8 weeks; cannibalisation report (queries with >1 ranking URL) for "creatin*" drops to 0.
- **Effort:** L
- **Confidence:** 0.9

### CLUSTER-04 — The same intent-level cannibalisation repeats in every hub: 26 intent x hub groups with >= 4 articles each; the pre-computed "47 keyword groups" are headline-template groups, not topics
- **Severity:** High
- **Evidence:** The `primary_keyword_guess` groups in `catalog-analysis.md` ("de ce strategia" 9, "cum sa stii" 8, "protocolul complet de" 8, "6 semne ca" 8, "dozajul optim de" 7...) are the first words of templated headlines and mix unrelated products (e.g. "de ce strategia" contains zinc, gainer, taurina, fiber, water-out, omega-3, ficat, creatina). Re-grouping by topic entity x intent gives the real cannibalisation sets (>=4 articles): prime-health "semne ca ai nevoie" 8, intra-workout "hidratare" 7, aminoacizi "semne" 6 / "combinatii" 6 / "rezultate in N zile" 6 / "dozaj" 4, arzator-de-grasimi "rezultate" 6 / "semne" 5 / "calitate ieftin vs premium" 5, prime-health "rezultate" 5 / "cand se ia" 4, crema-de-orez "calitate" 5 / "rutina matinala" 4 / "semne" 4, vitamine "rezultate" 4, plus the 11 creatina groups in CLUSTER-03. Concrete pairs outside creatina: `fat-burner-thermo-core-120-caps-weight` ("Secretele arzătoarelor de grăsimi: 40% mai multă eficiență") vs `fat-burner-fat-burning-booster-weight-loss-2` ("...50% Mai Multă Eficiență prin Abonamente"); `l-carnitine-thermo-core-120-caps-travel` vs `l-carnitine-1000-80-caps-travel-weight-loss-tips` (both "ieftin vs premium ... în vacanță"); `l-carnitine-fat-burning-booster-meal-replacement` vs `l-carnitine-thermo-core-120-caps-meal` (both "Rutina matinală cu arzătoare de grăsimi"); `fat-burner-pareri-water-out-120-caps-motivation` vs `-2` ("Ce recomandă/iau experții pentru retenția de apă"); `l-glutamina-eaa-aminoacizi-esentiali-bioavailability-why` vs `l-glutamina-recovery-bcaa-500g-bioavailability-why` ("Greșeala de absorbție a aminoacizilor pe care 85% o fac", title ratio 0.86); `instant-oat-cream-800g-25-serv-whole-foods-vs-processed-compa` vs `-2` (both "Rutina matinală cu ovăz"); `fiber-blood-orange-building-balanced-meals` vs `-2` ("Secretele Absorbției Fibrelor: 40% / 50%").
- **Affected scope:** ~160 articles outside the creatina hub; across the blog roughly 355 -> 110-130 surviving spokes.
- **Recommendation:** Apply the same keep/301 procedure per hub (plan table below gives the kept spoke set). Rule of thumb used: one article per (hub x intent) where intent in {ce este/beneficii, dozaj & cand se ia, efecte secundare/contraindicatii, rezultate & cat dureaza, cum alegi/calitate, combinatii, pe varste, calatorii, produs X ghid}. Before deleting, pull GSC "pages" for the last 3 months and keep the URL with clicks when the group has any.
- **Falsifiability:** Count of article pairs with title similarity > 0.6 (`catalog-analysis.md` lists 719) falls below 100 after consolidation.
- **Leading indicator:** Number of GSC queries with 2+ ranking blog URLs trends to 0; average position of the kept URL improves after the 301s settle (4-8 weeks).
- **Effort:** L
- **Confidence:** 0.85

### CLUSTER-05 — 42 handles ending in -2/-3/-4/-5 are regenerations of the same product x angle brief (same product, same English angle, near-identical titles) and should be merged into their base article
- **Severity:** High
- **Evidence:** `catalog-analysis.md` "All numeric-suffix handles" (42) and "Numeric-suffix handles vs their base article": body Jaccard 0.008-0.065 (texts are re-written, not copied) but the brief is identical: `instant-oat-cream-800g-25-serv-*` x10 regenerations (healthy-cooking-methods, healthy-eating-for-busy-people, mindful-eating-practices, seasonal-eating-benefits, gut-healthy-food-choices, healthy-food-swaps-that-work, whole-foods-vs-processed-compa...), `fiber-blood-orange-*` x8, `creatine-benefits-creatina-monohidrat-...` -2/-3/-4, `creatine-gummies-...` -2/-3/-4, `gymbeam-creatine-...` -2/-3/-4/-5, `before-and-after-creatine-creatine-ready-to-go-plicuri` -2/-3/-4, `acetyl-l-carnitine-l-carnitine-1000-80-caps` -2/-3/-4, `acetyl-l-carnitine-15-reducere-pachet-thermo-core` -2/-3, `l-carnitine-15-reducere-pachet-thermo-core` -2/-3, `l-carnitine-pareri-l-carnitine-1000-80-caps` -2/-3, `creatine-side-effects-creatine-ready-to-go-plicuri` -2/-3, `fat-burner-pareri-water-out-120-caps-motivation-2`, `fat-burner-fat-burning-booster-weight-loss-2`, `fat-burner-x10-pareri-fat-burning-booster-weight-loss-2`, `creatine-kinase-creatina-creapure-future-trends-in-2`, `creatine-ready-to-go-plicuri-prime-supplements-budget-smart-supplementation-s-2`. Shopify appends `-2` only when the generator re-submits the same handle, i.e. BlogGenAuto re-ran the same brief 2-5 times. Root cause: the app's keyword queue was re-run monthly (publishing bursts 2026-05: 127, -06: 71, -07: 27, -08: 29, -09: 31).
- **Affected scope:** 42 articles (~62,000 words).
- **Recommendation:** For each series keep the base handle (or the one with most inbound links: e.g. `gymbeam-creatine-creatina-monohidrat-micronized-300g-fara` has 12 inbound), move any unique H2 into it, then 301 the suffixed handles to the kept one. Import as CSV in Shopify Admin > Navigation > URL redirects (`Redirect from,Redirect to`). Pause/uninstall BlogGenAuto's auto-publish queue before doing this, otherwise the -6 will appear next month.
- **Falsifiability:** `grep -c -- '-[2-5]$' <(curl -s https://primesupplements.ro/sitemap_blogs_1.xml | grep -o 'blogs/news/[^<]*')` returns 0 after the change; all 42 old URLs answer 301.
- **Leading indicator:** Blog pages in sitemap drop from 354 to ~310 immediately; crawl stats show fewer "Duplicate, Google chose different canonical" in GSC Pages report.
- **Effort:** M
- **Confidence:** 0.9

### CLUSTER-06 — Article URLs carry a keyword that is unrelated to the title and the content: 246/355 handles are `<English keyword>-<product handle>-<English angle>`; 101 start with an English keyword; in 30 the handle topic and the title topic point to different hubs and in 72 the embedded product belongs to a different hub than the title
- **Severity:** Medium
- **Evidence:** `cluster/handle_parts.json`. Pattern examples: `creatine-gummies-creatina-creapure-how-to-read` = "Epuizarea Musculară: Când să te Îngrijorezi și Cum să Alegi Creatina" (no gummies, nothing about reading); `creatine-kinase-creatina-creapure-supplements-and-food` = "Creatina pe Vârste" (creatine kinase is a blood enzyme, a medical query); `fat-burner-pareri-water-out-120-caps-healthy` = "De ce strategia ta de gustări sănătoase eșuează"; `magneziu-bisglicinat-prime-whey-2000g-future-trends` = "Pudre proteice pentru stagnarea musculară"; `omega-3-combat-pro-how-long-until` = "Pre-Workout și Hrana"; `magneziu-l-treonat-shaker-premium-accesorizat-500-ml` = "Ghidul Shaker-elor Fitness"; `potasiul-si-retentia-de-apa-...` is in neither hub cleanly. Keyword heads repeat as pure US-English search terms: `creatine-gummies` x6, `creatine-kinase` x6, `before-and-after-creatine` x6, `creatine-pastile` x6, `acetyl-l-carnitine` x8, `fat-burner-x10(-pareri)` x8 (X10 is not a Prime product). 34 titles contain no topic entity at all (e.g. "Provocările de slăbit în grup", "De ce strategia ta de nutriție la restaurant eșuează"). URL words are a minor ranking signal, but the bigger cost is that the URL, the title and the H1 never agree on one Romanian query, so none of the three can be used to decide the article's target keyword, and the English fragments show in SERP breadcrumbs.
- **Affected scope:** ~250 articles; of these ~110 will survive consolidation.
- **Recommendation:** For the kept spokes only, rename the handle to the Romanian target query (`cand-se-ia-creatina`, `creatina-pauza`, `glutamina-efecte-secundare`, `l-carnitina-slabit`, `izolat-vs-concentrat-proteic`...) using Shopify's "create URL redirect" checkbox on handle change; do not touch handles of articles that will be 301'd anyway. Rewrite the title to start with the same query. Keep handles ASCII (two current handles contain diacritics: `bcaa-vs-eaa-diferențe-și-beneficii-...`, `water-out-tinctura-soluția-naturala-...`).
- **Falsifiability:** For each kept spoke, the handle's first 2-3 words appear verbatim in the title (script check); 0 handles with non-ASCII.
- **Leading indicator:** CTR on blog URLs in GSC rises (cleaner breadcrumb/URL in SERP).
- **Effort:** M
- **Confidence:** 0.8

### CLUSTER-07 — 13 articles use competitor brand names as the target keyword (GymBeam x7, Optimum Nutrition / Gold Standard x3, Dr Max, Farmacia Tei, MyProtein) without comparing anything
- **Severity:** Medium
- **Evidence:** handles `gymbeam-creatine-creatina-monohidrat-micronized-300g-fara` (+ -2..-5), `gymbeam-creatine-creatine-ready-to-go-plicuri`, `gainer-gymbeam-prime-whey-2000g-protein-myths`, `proteina-on-whey-gold-standard-prime-whey-go-protein-for`, `proteina-whey-gold-standard-prime-whey-2000g-reading-protein`, `proteina-whey-optimum-nutrition-emperor-mass_3000g-protein-for-recovery`, `magneziu-bisglicinat-dr-max-liver-protect-500-ml-supplements`, `nac-farmacia-tei-greseli-depozitare-n-acetilcisteina-preventie`, `my-protein-ghid-rezultate-combinatii-izolat-proteic`. Titles: "Cum să iei Creatină în Călătorii", "Descoperă Puterea Prime Whey" — the brand appears only in the URL. "gymbeam creatine" is a navigational query for gymbeam.ro; such pages cannot rank and the URL implies a comparison that does not exist.
- **Affected scope:** 13 articles.
- **Recommendation:** Either drop the brand from the handle when consolidating (most of these are already in the 301 lists above), or deliberately build 2-3 real comparison spokes under the hubs ("Creatină Prime vs GymBeam: compoziție, preț per porție, Creapure") with a comparison table — those can rank for "X vs Y" queries and are legitimate commercial-intent spokes.
- **Falsifiability:** 0 handles matching `gymbeam|optimum|gold-standard|dr-max|farmacia-tei|my-protein` unless the page has an H2 comparison table.
- **Leading indicator:** none expected from the removal; for real comparison pages: impressions on "prime supplements vs ..." queries.
- **Effort:** S
- **Confidence:** 0.85

### CLUSTER-08 — Spoke->hub links reach only 7 of 13 hubs; 112 articles have no collection link; vitamine-si-minerale (51 articles), crema-de-orez (25), pre-workout (10), intra-workout (5), batoane and bauturi receive 0 body links; 40 links go to the generic "cele-mai-vandute"
- **Severity:** High
- **Evidence:** Body hrefs extracted from `articles-p*.json`: `/collections/creatina` 100, `aminoacizi` 86, `alimente-sanatoase` 86, `arzator-de-grasimi` 82, `cele-mai-vandute` 40, `pudra-proteica` 32, `prime-health` 20, all others 0 (total 446 in 243 articles; 112 articles with 0). The header/footer menu does link to all 17 collections from every page (`article.html`: 17 collection hrefs x2) but those are sitewide navigation links, not contextual. Every article also carries 534 `/cart/` add-to-cart links and the whole link set duplicated on `primesupplements1.myshopify.com` (2582 links), so the hub link is the one link type that is missing.
- **Affected scope:** 355 articles / 6 hubs with zero inbound body links.
- **Recommendation:** (1) Template-level: in `sections/main-article.liquid` render one hub link from a metafield so every article links to its hub without editing bodies:
```liquid
{%- assign hub = article.metafields.custom.hub_collection.value -%}
{%- if hub -%}
<p class="article__hub-link">Vezi toate produsele din categoria <a href="{{ hub.url }}">{{ hub.title }}</a>.</p>
{%- endif -%}
```
(2) Body-level (during consolidation): replace the `cele-mai-vandute` links with the specific hub and add one keyword-anchor hub link in the intro paragraph. (3) Bulk-set `custom.hub_collection` from `cluster/hub_map.json` via the Admin API (metafieldsSet) — read-only now, to be done in the fix phase.
- **Falsifiability:** Re-run the href extraction: every hub has >= number-of-its-spokes inbound body/template links; 0 articles without a hub link.
- **Leading indicator:** Collection pages' inbound internal links (Screaming Frog "Inlinks") grow from ~2 (menu) to 10-80.
- **Effort:** M
- **Confidence:** 0.9

### CLUSTER-09 — Product coverage is upside-down: 5 products absorb 234 article links while 31 of 85 supplements (all 19 Frutilu drinks, 3 of 7 crema de orez flavours, collagen, turmeric, magnesium citrate) have 0, and 8 articles link to two products that no longer exist
- **Severity:** Medium
- **Evidence:** Distinct products linked from articles: 55 of 185. Top: `creatina-monohidrat-micronized-300g-fara-aroma` 50 articles, `creatina-creapure` 46, `fiber-blood-orange` 46, `creatine-ready-to-go-plicuri-prime-supplements` 46, `instant-oat-cream-800g-25-serv` 46. Zero-link supplements: `complete-collagen`, `magnesium-citrate-80-caps`, `turmeric-extract-80-caps`, `unt-de-caju`, `crema-de-orez-fara-aroma`, `crema-de-orez-caramel-sarat`, `crema-de-orez-sirop-de-artar`, `baton-proteic-ciocolata-fructe-de-padure`, all 19 `instant-drink-frutilu-*` / `frutilu-instant-drink-*` + `pachet-mix-arome-bautura-instant-frutilu-...` (the whole bauturi hub). Ghost targets: `15-reducere-pachet-thermo-core-water-out-1-14-august` (a dated August promo bundle) linked by 6 articles and embedded in 12 handles (`*-15-reducere-pachet-thermo-core*`), `liver-protect-500-ml` linked by 2. 100 MNX apparel products: 1 article (`tricou-sala-cele-mai-bune-tricouri-yoga`).
- **Affected scope:** 31 supplements + 99 MNX products without any editorial support; 8 articles with links to 404/redirected products.
- **Recommendation:** Fill gaps with one buying-guide spoke per hub that lists all its products (bauturi: "Băuturi instant fără zahăr Frutilu: arome, când le folosești"; crema-de-orez: "Crema de orez: arome, mod de preparare, pre/post antrenament"; batoane: "Batoane proteice Prime: comparație pe aromă/macros"). Replace the `15-reducere-pachet...` and `liver-protect-500-ml` links with `/collections/arzator-de-grasimi` and the current liver product. MNX apparel does not need blog spokes; it needs the collection text (CLUSTER-01).
- **Falsifiability:** Product-coverage script shows 0 supplement products with 0 article links and 0 links to handles absent from `products-all.json`.
- **Leading indicator:** Internal "Inlinks" per product page >= 2 for every supplement.
- **Effort:** M
- **Confidence:** 0.9

### CLUSTER-10 — No blog taxonomy: 5 tags on 9 articles (346 untagged), the theme's tag filter renders five near-empty hubs, and the only browse path is 33 pages of chronological pagination
- **Severity:** Medium
- **Evidence:** `catalog-analysis.md`: tags `preworkout` 3, `arderea grasimilor` 2, `longevitate` 2, `sanatate` 2, `aminoacizi` 1; `blog-index.html` renders `/blogs/news/tagged/aminoacizi|arderea-grasimilor|longevitate|preworkout|sanatate` as the filter bar (so `/tagged/aminoacizi` is an indexable page with 1 article). `sections__main-blog.liquid` paginates `blog.articles` 11 per page -> 33 pages; `templates__article.json` has only `main-article`, `comments`, `navigation` (no related-articles section; the "Articole Similare" text seen in bodies is injected by BlogGenAuto). Google cannot discover topical grouping from the site structure; page 20+ of the blog is 20 clicks from home.
- **Affected scope:** 354 articles, blog index.
- **Recommendation:** Tag every surviving article with exactly one hub tag using the hub names (`creatina`, `proteine`, `aminoacizi`, `arzatoare-de-grasimi`, `vitamine-minerale`, `prime-health`, `pre-workout`, `intra-workout`, `crema-de-orez`, `fibre`, `batoane`, `bauturi`) and remove the 5 current tags. `/blogs/news/tagged/<hub>` then becomes the editorial hub: link it from the collection `seo_text` ("Toate ghidurile despre creatină") and link the collection from the tagged page intro (the tag page uses the same `main-blog` section; add a small Liquid map `tag -> collection url`). Raise `articles_per_page` to 24. Keep the tag count at 12 so no thin tag pages are created.
- **Falsifiability:** 0 articles without tags; `blog.all_tags.size` == 12; each tagged page lists >= 5 articles.
- **Leading indicator:** Crawl depth report: 95% of blog URLs at depth <= 3.
- **Effort:** S (tags) + S (Liquid)
- **Confidence:** 0.9

### CLUSTER-11 — Article-to-article linking is generated, not planned: 22 articles have 0 inbound article links, 132 have < 3, 41% of edges cross hubs, 7 articles link out to nothing, 2 links point to non-existent handles
- **Severity:** Medium
- **Evidence:** In-blog graph from `articles-p*.json`: 1146 distinct article->article edges, 678 same-hub, 468 cross-hub; in-degree median 3, max 13 (`protine-whey-isolate-refacere-musculara-semne-deficit-proteic`). 0-inbound (22): `bcaa-vs-eaa-diferențe-și-beneficii-pentru-culturisti-ghid-complet`, `ce-este-un-pre-workout-fara-cofeina`, `water-out-tinctura-soluția-naturala-...`, `protein-izolat-vs-concentrat-proteic-ghid`, `vitamine-b12-90-zile-vitamina-d3-k2`, `alpha-booster-testosterone-ce-spun-studiile-tincturi-potenta`, `reglarea-tensiunii-din-plante-...`, `glycerolul-secretul-culturistilor-...`, `cum-te-ajuta-combat-pro-...`, `tricou-sala-cele-mai-bune-tricouri-yoga`, `cum-contribuie-l-carnitine-1000-la-arderea-grasimilor`, `nac-1000-mg-transformare-obiceiuri-sanatoase-nac-energie`, `protectie-ficat-eroare-protectie-ficat-sportivi-peste`, `magneziu-glicinat-coenzima-q10-80-caps-debunking`, `taurina-beneficii-recovery-bcaa-500g-how-long`, `apa-de-cocos-nitrox-no-stim-antrenamente-seara`, `creatine-kinase-creatina-creapure-bioavailability-why-absorption`, `l-carnitine-1000-80-caps-travel-weight-loss-tips`, `omega-3-crema-de-orez-blueberry-muffin`, `instant-oat-cream-800g-25-serv-mindful-eating-practices-2`, `gainer-gymbeam-prime-whey-2000g-protein-myths`, `creatine-monohydrate-creatina-creapure-debunking-common-supplement`. Broken targets: `/blogs/news/ovaz-instant-secrete-nutritie-crema-ovaz-energy` (real handle ends `-energie`) and `/blogs/news/instant-oat-cream-800g-25-serv-healthy-eating-on-budget` (real: `-on-a-budget`). Notably the 0-inbound set contains the best hand-written articles (bcaa-vs-eaa, izolat-vs-concentrat, pre-workout fara cofeina).
- **Affected scope:** 355 articles; 2 broken links.
- **Recommendation:** Add a theme-level related-articles block to `templates/article.json` (Impact ships a `blog-posts`/"featured blog" section; render 3-4 articles sharing the hub tag, or a `custom.related_articles` list), so every spoke gets >= 3 inbound links from siblings regardless of body content. Fix the 2 broken hrefs. When consolidating, re-point links that targeted redirected handles to the kept handle (avoid 1474 links passing through 301s).
- **Falsifiability:** In-degree script: 0 articles with < 3 inbound; 0 hrefs to handles not in `articles-all.json`.
- **Leading indicator:** Orphan count in Screaming Frog crawl = 0.
- **Effort:** M
- **Confidence:** 0.9

### CLUSTER-12 — Glutamine: 16 articles for one product (`recovery-glutamin`), 4 of them under the handle prefix `glutamina-si-sanatatea-stomacului-` although none is about stomach health
- **Severity:** Medium
- **Evidence:** `glutamina-si-sanatatea-stomacului-efecte-secundare-glutamina-ghid-complet` ("Efecte secundare glutamină"), `...-suplimente-recuperare-virste-glutamina-2026` ("Suplimentele de recuperare pe vârste"), `...-cand-sa-iei-glutamina-semne` ("Când să iei glutamină"), `...-combinatii-glutamina-suplimente-2026-etape` ("Combinații de glutamină") + 12 `*-recovery-glutamin-*` articles (`glutamina-recovery-glutamin-signs-your-body` "6 Simptome Ascunse ale Recuperării Lente", `l-glutamina-beneficii-recovery-glutamin-future-trends-in` "6 Semne că recuperarea ta are nevoie de glutamină", `aminoacizi-esentiali-recovery-glutamin-morning-vs-evening` "Când să Iei Glutamina", `taurina-recovery-glutamin-supplements-and-hydration` "Când se ia glutamina pentru hidratare", `bcaa-recovery-glutamin-how-to-store` "depozitare a glutaminei", `bcaa-recovery-glutamin-natural-vs-synthetic`, `taurina-beneficii-recovery-glutamin-debunking-common-supplement` "calitatea glutaminei"...). Three of them answer "când să iei glutamina". The real query "glutamina si sanatatea stomacului / glutamina intestin" (the only intestinal-health angle the SERP cares about, see darwin-nutrition result) is not covered by any of the four.
- **Affected scope:** 16 articles -> keep 4.
- **Recommendation:** Keep: `glutamina-si-sanatatea-stomacului-efecte-secundare-glutamina-ghid-complet` (rename `glutamina-efecte-secundare`), `glutamina-si-sanatatea-stomacului-cand-sa-iei-glutamina-semne` (rename `cand-se-ia-glutamina`, merge `aminoacizi-esentiali-recovery-glutamin-morning-vs-evening` + `taurina-recovery-glutamin-supplements-and-hydration` + `glutamina-recovery-glutamin-signs-your-body` + `l-glutamina-beneficii-recovery-glutamin-future-trends-in`), `glutamina-si-sanatatea-stomacului-combinatii-glutamina-suplimente-2026-etape` (rename `glutamina-combinatii`), and write one new `glutamina-pentru-intestin-si-digestie` spoke (the actual stomach-health query). 301 the remaining 12 to the closest kept spoke; `bcaa-recovery-glutamin-how-to-store` -> product page `/products/recovery-glutamin`.
- **Falsifiability:** `grep -c glutamin sitemap_blogs_1.xml` <= 5.
- **Leading indicator:** GSC: "glutamina" queries map to one URL each.
- **Effort:** M
- **Confidence:** 0.85

### CLUSTER-13 — "protein-a" / "protine" series: the pudra-proteica hub's most-linked spokes carry misspelt keyword handles, and the hub has no "izolat vs concentrat" / "cum alegi proteina" pillar-level spoke that is linked
- **Severity:** Low
- **Evidence:** `protein-a-ghid-izolat-proteic-performanta-2026` (9 inbound), `protein-a-cum-sa-stii-daca-timing`, `protine-whey-isolate-refacere-musculara-semne-deficit-proteic` (13 inbound, the most-linked article in the blog), `proteina-cum-alegi-pudra-proteica-calitate`. "protein-a" and "protine" are tokenisation errors of "proteina". The hand-written `protein-izolat-vs-concentrat-proteic-ghid` (1552 w, 2026-08-19) targets the one query whose SERP is weak (WebSearch "izolat proteic vs concentrat proteic": top results are nutrada.com B2B blogs in 7 languages and nakednutrition.com/pl) yet it has 0 inbound links. Timing intent is written 3 times (`protein-a-cum-sa-stii-daca-timing`, `whey-isolate-proteina-prime-whey-go-protein-timing`, `whey-protein-isolate-rutina-matinala-...`).
- **Affected scope:** 31 pudra-proteica articles -> keep 10.
- **Recommendation:** Rename the two misspelt handles with redirects (`ghid-izolat-proteic`, `semne-deficit-proteic`); promote `protein-izolat-vs-concentrat-proteic-ghid` to a top-of-hub spoke linked from the collection text and from every kept protein spoke; keep one timing article (`whey-isolate-proteina-prime-whey-go-protein-timing`, rename `cand-se-ia-proteina`) and 301 the other two.
- **Falsifiability:** No handle matching `^protein-a-|^protine-`.
- **Leading indicator:** `izolat-vs-concentrat` URL gains impressions for "izolat vs concentrat" within 6 weeks.
- **Effort:** S
- **Confidence:** 0.8

### CLUSTER-14 — Four hubs have no or almost no spokes while four products with the most articles are over-served: bauturi (19 products / 0 articles), batoane (4 / 0), intra-workout (4 / 5), pre-workout (7 / 10) vs L-carnitine 1000 (28 articles), oat cream (22), fiber (21)
- **Severity:** Medium
- **Evidence:** Hub map table above; embedded-product counts from `handle_parts.json`: `l-carnitine-1000-80-caps` 28, `creatina-monohidrat-...` 22, `instant-oat-cream-800g-25-serv` 22, `fiber-blood-orange` 21, `creatina-creapure` 18, `creatine-ready-to-go-plicuri` 16. The crema-de-orez hub (7 products: cremă de orez fără aromă, caramel sărat, sirop de arțar, blueberry muffin, biscuiți...) gets 25 articles of which 22 are about "ovăz instant", i.e. about one product in a different sub-category; the crema de orez products themselves get 10 links in total. Pre-workout, the hub with the most products after vitamins (7), has 10 articles of which only 1 embeds a product.
- **Affected scope:** 4 hubs under-served, 3 products over-served.
- **Recommendation:** Content gap list (one spoke each, 1200-1800 words, Romanian query in handle): bauturi — `bauturi-instant-fara-zahar-frutilu-ghid`, `electroliti-si-hidratare-la-sala`; batoane — `batoane-proteice-ghid-comparatie`, `baton-proteic-inainte-sau-dupa-antrenament`; intra-workout — `ce-este-intra-workout`, `dextrina-ciclica-vs-maltodextrina`, `carbohidrati-intra-workout-dozaj`; pre-workout — `pre-workout-ce-este-si-cum-se-ia`, `pre-workout-fara-cofeina` (exists: `ce-este-un-pre-workout-fara-cofeina`, extend from 950 w), `beta-alanina-beneficii`, `citrulina-beneficii`, `pre-workout-efecte-secundare`; crema-de-orez — `crema-de-orez-ce-este-si-cum-se-prepara`, `crema-de-orez-vs-ovaz-instant`. Stop producing L-carnitine/oat-cream/fiber articles.
- **Falsifiability:** Every hub has >= 3 spokes and >= 1 spoke that links every product of the hub.
- **Leading indicator:** Non-brand impressions for "pre workout", "intra workout", "batoane proteice", "bauturi instant fara zahar" appear in GSC.
- **Effort:** M
- **Confidence:** 0.85

### CLUSTER-15 — The 2025 hand-written articles are the only ones with clean, distinct intents, and they are the least linked: one is a 73-word stub, two have diacritics in the handle, two belong to no hub
- **Severity:** Low
- **Evidence:** `cum-contribuie-l-carnitine-1000-la-arderea-grasimilor` 73 words (the only article < 300 words), 0 inbound; `bcaa-vs-eaa-diferențe-și-beneficii-pentru-culturisti-ghid-complet` 517 words, non-ASCII handle, 0 inbound, although "bcaa vs eaa" is a comparison query whose SERP is entirely English (WebSearch: setforset, strengthlog, adamkempfitness, bodybuilding.com, myprotein.ae — no Romanian page); `water-out-tinctura-soluția-naturala-...` 2816 words, non-ASCII handle, 0 inbound; `ce-este-un-pre-workout-fara-cofeina` 950 w, 0 inbound; `glycerolul-...` and `cum-te-ajuta-combat-pro-...` mapped to no hub.
- **Affected scope:** 6 articles.
- **Recommendation:** Expand `bcaa-vs-eaa` to 1500+ words with a comparison table and make it the aminoacizi hub's lead spoke (rename to `bcaa-vs-eaa`, redirect the diacritic URL); redirect the 73-word L-carnitine stub to the kept `l-carnitina-slabit` spoke; rename `water-out-tinctura-...` to ASCII; tag glycerol and Combat PRO articles into pre-workout and link them from the pre-workout hub text.
- **Falsifiability:** 0 published articles < 300 words; 0 non-ASCII handles.
- **Leading indicator:** "bcaa vs eaa" impressions in GSC.
- **Effort:** S
- **Confidence:** 0.85

### CLUSTER-16 — 279/355 titles are date-stamped ("în 2026", "în sezonul 2026", "de toamnă") so the generator will re-create every intent again in 2027; the "updated" path is not used (29/355 updated after publish)
- **Severity:** Low
- **Evidence:** `catalog-analysis.md` "Year 2025/2026 in title: 279"; seasonal variants already coexist: `before-and-after-creatine-creatine-ready-to-go-plicuri` ("...în Sezonul Rece 2026") vs `creatine-ready-to-go-plicuri-prime-supplements-supplements-for-seasonal-welln` ("...în sezonul 2026") vs `gymbeam-creatine-...-5` ("...de Toamnă"). Only 29 articles were ever updated after publication.
- **Affected scope:** 279 titles.
- **Recommendation:** Evergreen titles for kept spokes (drop the year; keep `dateModified` honest by updating in place); set an editorial rule "one URL per intent, refreshed yearly" and disable BlogGenAuto's automatic topic queue.
- **Falsifiability:** Titles containing a year < 20 after the rewrite.
- **Leading indicator:** Number of new blog URLs per month <= 4.
- **Effort:** S
- **Confidence:** 0.8

### CLUSTER-17 — SERP reality check: head terms belong to pharmacies/medical publishers; the winnable targets are Romanian long-tail intents, which is exactly where the blog has 3-11 competing URLs each
- **Severity:** Info
- **Evidence:** WebSearch (US-biased tool, qualitative): "creatina beneficii" -> medlife.ro, drmax.ro, catena.ro, antena3.ro (paid content); "pudra proteica pentru masa musculara" -> drmax.ro (category + products), medlife.ro, decathlon.ro; "arzatoare de grasimi eficiente" -> catena.ro category/products, bulk.com/ro; "l carnitina slabit pareri" -> bzi.ro advertorials, substack, worldclass.ro; "cand se ia creatina dimineata sau seara" -> forum.softpedia + English spam, no Romanian authority; "izolat proteic vs concentrat proteic" -> nutrada.com (B2B ingredient blog) x7 languages; "bcaa vs eaa diferente" -> only English pages; "glutamina beneficii efecte secundare" -> no Romanian page in the top results (hola.com, decathlon.pt, pubmed). `site:primesupplements.ro creatina` returned 0 primesupplements.ro URLs (the tool does not honour `site:`; treat as unverified, confirm in GSC). Head terms: collections must carry them (CLUSTER-01), with the pharmacy domains as the realistic ceiling (positions 5-10). Long-tail: one strong Romanian page per intent can take the top 3.
- **Affected scope:** Strategy.
- **Recommendation:** Target map used in the cluster plan: hubs = head terms (creatină, pudră proteică, arzătoare de grăsimi, aminoacizi, vitamine și minerale, pre-workout, intra-workout, cremă de orez, batoane proteice, băuturi instant); spokes = long-tail intents with weak SERPs (când se ia X, X dimineața sau seara, X efecte secundare, X vs Y, X pentru slăbit păreri, cât durează până apar rezultatele). Do not write more "beneficii" articles against medlife/drmax; write the comparison and dosing pages they do not have.
- **Falsifiability:** GSC query report after 8 weeks: kept long-tail spokes in top 10 for their handle query.
- **Leading indicator:** Impressions on "X vs Y" / "cand se ia" queries.
- **Effort:** —
- **Confidence:** 0.6

## Cluster plan (hub-and-spoke)

Intent legend: C = commercial (hub/category), I = informational, Cmp = commercial comparison. Spoke handles listed are the ones to KEEP (existing) or CREATE (new, marked *). Everything else in the hub is 301'd to the nearest kept spoke per CLUSTER-03/04/05/12.

| Cluster | Intent | Hub URL (pillar) | Spoke handles (keep / *create) | Action |
|---|---|---|---|---|
| Creatină | C hub + I spokes | /collections/creatina (+ seo_text "Creatină monohidrată: ghid complet", 500 w) | `creatine-monohydrate-cand-sa-iei-creatina-dimineata`, `best-creatine-monohydrate-dozaj-optim-creatina-rezultate-2026`, `creatina-si-volumizarea-musculara-cand-apar-rezultate-creatina-30`, `pure-creatine-cand-sa-iei-pauza-de`, `creatina-si-volumizarea-musculara-cum-sa-stii-daca-creatina`, `creatine-pastile-creatina-creapure-seasonal-supplementation-adjus`, `creatine-pastile-creatine-ready-to-go-plicuri`, `creatine-monohydrate-creatina-monohidrat-micronized-300g-fara`, `gymbeam-creatine-creatina-monohidrat-micronized-300g-fara` (rename), `creatine-creatina-creapure-combining-supplements-with`, `creatine-powder-de-ce-nu-vezi-rezultate`, `gymbeam-creatine-creatina-monohidrat-micronized-300g-fara-2` (rename), `creatine-side-effects-creatina-monohidrat-micronized-300g-fara`, `creatine-ready-to-go-plicuri-prime-supplements-budget-smart-supplementation-s`, `creatina-si-volumizarea-musculara-secretele-absorbtiei-creatinei-optimizare-rezultate`, `creatine-monohydrate-creatina-creapure-signs-your-body`, `creatine-ready-to-go-plicuri-prime-supplements-how-to-store-supplements-prope`; *`creatina-efecte-secundare` (missing: no RO article answers it directly), *`creatina-prime-vs-gymbeam` (Cmp) | Keep 17, create 2, re-assign 7, 301 ~54; rename kept handles to RO queries |
| Pudră proteică | C hub + I/Cmp | /collections/pudra-proteica | `protein-izolat-vs-concentrat-proteic-ghid`, `protein-a-ghid-izolat-proteic-performanta-2026` (rename), `protine-whey-isolate-refacere-musculara-semne-deficit-proteic` (rename), `proteina-cum-alegi-pudra-proteica-calitate`, `whey-isolate-proteina-doza-optima-izolat-proteic-refacere`, `whey-isolate-proteina-prime-whey-go-protein-timing` (rename `cand-se-ia-proteina`), `izolat-proteic-din-zer-prime-whey-2000g-plant-vs`, `proteina-isolate-whey-emperor-mass_3000g-complete-protein-guide` (gainer), `mass-gainer-prime-whey-1000g-protein-cooking`, `weight-gainer-prime-whey-1000g-how-much`; *`cata-proteina-pe-zi-masa-musculara` | Keep 10, create 1, 301 21 |
| Aminoacizi (BCAA/EAA/glutamină/taurină) | C hub + I/Cmp | /collections/aminoacizi | `bcaa-vs-eaa-diferențe-...` (rewrite+rename `bcaa-vs-eaa`), `aminoacizi-suplimente-eaa-aminoacizi-esentiali-supplements-for` (EAA dozaj), `branched-chain-amino-acids-cum-sa-combini-aminoacizii-esentiali`, `aminoacizi-recovery-bcaa-500g-how-to` (BCAA studii), `bcaa-ce-este-recovery-bcaa-500g-complete-beginner`, glutamină x3 (CLUSTER-12), *`glutamina-pentru-intestin-si-digestie`, `aminoacizi-taurine-80-caps-budget-smart` (taurină efecte secundare), `l-glutamina-taurine-80-caps-natural-vs` (taurină beneficii), `bcaa-ce-este-taurine-80-caps-supplements-for` (30 zile taurină) | Keep 11, create 1, 301 40 |
| Arzătoare de grăsimi / L-carnitină / Water Out | C hub + I | /collections/arzator-de-grasimi | `acetyl-l-carnitine-l-carnitine-1000-80-caps` (8 săptămâni, rename `l-carnitina-rezultate`), `l-carnitine-pareri-l-carnitine-1000-80-caps-2` (rename `l-carnitina-slabit-pareri`), `l-carnitine-pareri-l-carnitine-1000-80-caps-3` (cum știi dacă e potrivită), `omega-3-3-6-9-l-carnitine-1000-80-caps` (dozaj L-carnitină, rename), `fat-burner-x10-thermo-core-120-caps-weight` (termen lung), `acetyl-l-carnitine-15-reducere-pachet-thermo-core-3` (cum alegi un arzător), `l-carnitine-15-reducere-pachet-thermo-core` (combinații), `water-out-tinctura-soluția-naturala-...` (rename ASCII), `ceai-diuretic-sfatul-medicului-cauze-retentie-apa`, `l-carnitine-pentru-slabit-water-out-120-caps-weight` (când se iau diureticele); *`arzatoare-de-grasimi-efecte-secundare`, *`thermo-core-ghid` | Keep 10, create 2, 301 34 |
| Vitamine și minerale | C hub + I | /collections/vitamine-si-minerale | `magneziu-bisglicinat-cum-iti-dai-seama-daca` (11 inbound), `magneziu-bisglicinat-80-caps-natural-vs-synthetic-supplemen` (30 zile magneziu), `zinc-citrat-dozaj-optim-zinc-imunitate-evaluare`, `zinc-citrat-cum-sa-stii-daca-zincul`, `vitamine-b12-90-zile-vitamina-d3-k2`, `magneziu-l-treonat-vitamina-d3-k2-supplements-and` (când se ia D3+K2), `coenzima-q10-rezultate-coenzima-q10-asteptari-vs`, `beneficii-omega-3-omega-3-how-to-store`, `magneziu-glicinat-daily-vitamin-formula-natural-vs` (multivitamine), `magneziu-l-threonate-vitamin-c-1000-80-caps`, `magneziu-l-threonate-supliment-alimentar-chromium-picolinate-80`; *`magneziu-bisglicinat-vs-citrat`, *`vitamina-d3-k2-dozaj` | Keep 11, create 2, 301 ~28, re-assign 12 (oat/orez/unt/protein/shaker articles to their hubs) |
| Prime Health (ficat, inimă, NAC, spirulină, ashwagandha, testosteron) | C hub + I | /collections/prime-health | `psv-nac-administrarea-n-acetilcisteinei-dimineata-seara`, `nac-600mg-semne-nevoie-nac-rezultate-reale`, `nac-600-mg-cum-sa-combini-n-acetilcisteina`, `protectie-ficat-dozaj-silimarina-protectie-ficat-studii`, `detox-ficat-protocol-regenerare-hepatica-sportivi-2026`, `hipertensiune-arteriala-semne-nevoie-suplimente-inima-dozaj`, `hibiscus-si-tensiunea-arteriala-cat-timp-rezultate-suplimente-naturale`, `colesterol-7-semne-colesterol-marit-ghid`, `prospect-spirulina-cum-sa-alegi-spirulina-de`, `adevarul-despre-spirulina-90-zile-spirulina-evaluare-studii`, `omega-3-beneficii-ashwagandha-ksm-66-age-specific`, `bisglicinat-de-magneziu-ashwagandha-ksm-66-how-long`, `alpha-booster-testosterone-ce-spun-studiile-tincturi-potenta`, `scortisoara-ceylon-scortisoara-ieftina-vs-ceylon-diferenta`, `citicolina-ghid-pre-workout-fara-cafeina` (-> pre-workout) | Keep 14, 301 20 |
| Pre-workout | C hub + I | /collections/suplimente-pre-workout | `ce-este-un-pre-workout-fara-cofeina` (extend), `pre-workout-suplimente-pre-antrenament-calitate-vs`, `beta-alanina-cum-sa-citesti-eticheta-suplimente`, `pudra-sfecla-rosie-30-de-zile-cu-pre`, `havok-pre-workout-ghid-depanare-rutina-suplimente-pre`, `glycerolul-secretul-culturistilor-...`, `cum-te-ajuta-combat-pro-sa-ti-cresti-masa-musculara`, `creatina-monohidrata-nitrox-no-stim-combining-supplements`; *`pre-workout-ce-este-cum-se-ia`, *`pre-workout-efecte-secundare`, *`citrulina-beneficii` | Keep 8, create 3, 301 4 |
| Intra-workout | C hub + I | /collections/suplimente-intra-workout | `dextrina-ciclica-intra-workout-cum-sa-alegi-carbohidratii-intra`, `creatina-citrulina-intraworkout-90-zile-carbohidrati-intra-workout`, `apa-de-cocos-intra-workout-secretele-absorbtiei-carbohidratilor-intra-workout`, `omega-3-beneficii-cluster-insulin-bomb-1000g-signs`; *`ce-este-intra-workout`, *`dextrina-ciclica-vs-maltodextrina` | Keep 4, create 2, 301 2 |
| Cremă de orez & alimente sport (unt arahide/migdale) | C hub + I | /collections/crema-de-orez | `omega-3-crema-de-orez-blueberry-muffin`, `omega-9-6-3-crema-de-orez-tort-de`, `crema-orez-transforma-antrenamente-crema-orez-blueberry`, `unt-de-migdale-reteta-unt-de-migdale-rezultate-reale`, `omega-3-3-6-9-unt-de-arahide-supplements-for`; *`crema-de-orez-ce-este-cum-se-prepara`, *`crema-de-orez-vs-ovaz-instant` | Keep 5, create 2, 301 ~5 |
| Ovăz instant & fibre (alimente sănătoase) | C hub + I | /collections/alimente-sanatoase | ovăz: `ovaz-instant-secrete-nutritie-crema-ovaz-energie`, `instant-oat-cream-800g-25-serv-gut-healthy-food-choices` (digestie), `instant-oat-cream-800g-25-serv-healthy-cooking-methods` (când se consumă), `instant-oat-cream-800g-25-serv-healthy-eating-for-busy-people` (ieftin vs premium); fibre: `beneficile-consumului-de-fibre-suplimente-fibre-rezultate-reale-mituri`, `fiber-blood-orange-healthy-snacking-strategies` (dozaj), `fiber-blood-orange-understanding-macronutrients` (simptome lipsă), `fiber-blood-orange-anti-inflammatory-foods-guide`, `digestie-suplimente-fibre-alimentatie-rezultate-maxime` | Keep 9, 301 36 |
| Batoane proteice | C hub + Cmp | /collections/batoane-proteice | `creatina-monohidrata-baton-proteic-capsuni-how-to` (rename), `magneziu-glicinat-baton-proteic-cocos-si-caramel` (rename), `omega-3-6-9-baton-proteic-caramel-sarat-seasonal` (rename); *`batoane-proteice-ghid-comparatie` | Keep 3 (re-assigned), create 1 |
| Băuturi instant Frutilu | C hub + I | /collections/bauturi | *`bauturi-instant-fara-zahar-frutilu-ghid`, *`electroliti-si-hidratare-la-sala` (links to all 19 drinks) | Create 2 |
| Haine MNX | C only | /collections/haine-mnx | `tricou-sala-cele-mai-bune-tricouri-yoga` | Collection text only; no blog spokes needed |

Totals: 355 -> ~105 kept + ~21 new = ~126 spokes across 12 hubs; ~225 URLs 301'd; 1 unpublished draft deleted. Word budget: kept spokes already 1200-1800 words (median 1529) — matches spoke spec; hubs get 350-600 words of seo_text (a collection page with a product grid does not need the 2500-word pillar spec; the long-form pillar role is taken by the lead spoke of each hub).

## Internal link matrix (rules + adjacency pattern)

Mandatory:
1. hub -> every kept spoke: via `custom.guides` list rendered in the collection `blog-posts` section (CLUSTER-02) AND as text anchors inside `custom.seo_text` (CLUSTER-01).
2. spoke -> hub: template link from `custom.hub_collection` (CLUSTER-08) AND one in-body anchor in the first 150 words with the head term ("creatină monohidrată", "pudră proteică", "arzătoare de grăsimi").
3. spoke -> 2-3 products of the hub (already present in 349/355 articles; remove the duplicate myshopify-domain copies — other specialist's scope).

Recommended:
4. spoke <-> 2-3 sibling spokes of the same hub, in-body, keyword anchors (replace the generated "Articole Similare" lists); theme related-articles block filtered by hub tag as a safety net (CLUSTER-11).
5. hub -> tag page `/blogs/news/tagged/<hub>` ("Toate ghidurile despre X") and tag page -> hub (CLUSTER-10).

Optional:
6. Cross-hub bridges only where the topic is real: creatină <-> intra-workout (creatină + carbohidrați), aminoacizi <-> pudră proteică (BCAA vs proteină completă), arzătoare <-> pre-workout (stimulente), vitamine <-> prime-health (magneziu/stres).

Adjacency pattern (JSON, one hub shown; the same shape applies to each row of the plan table):
```json
{"hub":"/collections/creatina","links":[
 {"from":"hub","to":"creatine-monohydrate-cand-sa-iei-creatina-dimineata","type":"mandatory","anchor":"când se ia creatina"},
 {"from":"creatine-monohydrate-cand-sa-iei-creatina-dimineata","to":"hub","type":"mandatory","anchor":"creatină monohidrată"},
 {"from":"creatine-monohydrate-cand-sa-iei-creatina-dimineata","to":"best-creatine-monohydrate-dozaj-optim-creatina-rezultate-2026","type":"recommended","anchor":"dozajul optim de creatină"},
 {"from":"creatine-monohydrate-cand-sa-iei-creatina-dimineata","to":"pure-creatine-cand-sa-iei-pauza-de","type":"recommended","anchor":"pauza de creatină"},
 {"from":"creatine-monohydrate-cand-sa-iei-creatina-dimineata","to":"/products/creatina-monohidrat-micronized-300g-fara-aroma","type":"product","anchor":"creatină monohidrată micronizată 300 g"},
 {"from":"creatine-monohydrate-cand-sa-iei-creatina-dimineata","to":"creatina-citrulina-intraworkout-90-zile-carbohidrati-intra-workout","type":"optional","anchor":"creatină cu carbohidrați intra-workout"}
]}
```
Validation targets after implementation: every kept spoke >= 3 inbound (hub + 2 siblings), 0 orphans, every hub >= 300 words, no two kept spokes with the same (hub x intent).

## Limitations

- SERP overlap is qualitative: the WebSearch tool is US-biased, returned Spanish/Portuguese/English pages for Romanian queries and did not honour `site:`; pairwise shared-URL counts could not be computed, so cluster groupings are based on title/handle/product evidence plus 9 qualitative SERP reads. Verify with GSC query->page data before executing the 301 list.
- Keyword volumes are unavailable (no DataForSEO/Keywords Everywhere); "winnable" judgements rest on SERP composition only.
- Hub assignment is rule-based (keyword in handle/title, collection of linked product); 77 articles matched more than one hub and were resolved by handle precedence; expect ~5% of assignments to need manual correction (examples listed in CLUSTER-06).
- Whether `collection.metafields.custom.seo_text` already holds text could not be verified without an Admin API read; the rendered pages show no such text, so either the metafield is empty or the section is disabled (it is `disabled: true`).
- No GSC/GA data: the keep/301 choice inside each intent group used inbound links, recency and handle quality as proxies; swap the kept URL for whichever one has clicks when GSC is available.
