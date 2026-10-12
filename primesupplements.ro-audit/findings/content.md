# Content Quality & E-E-A-T: primesupplements.ro

Key: `content` (Content Quality category, 23% of health score). Audit date 2026-10-12. Specialist method: claude-seo `seo-content` agent + skill (Sept 2025 QRG, E-E-A-T framework and scoring guide, Who/How/Why test). $R = `/tmp/claude-0/-home-user-Prime-supplements/a8ac683f-a811-5bab-8ad5-3c2925806713/scratchpad/recon`, $A = `/home/user/Prime-supplements/primesupplements.ro-audit`.

## Scope & method

What was checked:
- Blog (355 articles in /blogs/news, 354 published): `$R/shopify/articles-all.json` (per-article metrics), `$R/shopify/catalog-analysis.md`, raw HTML bodies in `$R/shopify/articles-p1..p8.json` (parsed for embedded JSON-LD, H1s, styles, scripts, link attributes), plain-text bodies in `$R/shopify/articles-bodies/*.txt` (corpus-wide regex scans of all 355; 15 bodies read in full or head+tail: the 3 thin 2025 pieces, 2 long 2025 pieces, 3 "primesupplements1"/March 2026 pieces, median May 2026 pieces, a regenerated "-2" pair, YMYL pieces on cholesterol, blood pressure, testosterone, diuretics, the unpublished English draft, the apparel piece, and two October 2026 pieces). Live page HTML: `$R/pages/article.html`, `article-thin-lcarnitine.html`, `article-2026-citicolina.html`, plus one throttled live fetch of `/blogs/news/apa-de-cocos-nitrox-no-stim-antrenamente-seara` (saved to scratchpad `content-scores/live-article-apa-de-cocos.html`, HTTP 200, 272 KB).
- Plugin scripts (local input): `content_quality.py --json`, `content_humanize.py --json`, `content_verify.py --json` on 12 bodies (results in scratchpad `content-scores/`); `metadata_template.py --pairs-file` on the 81 products that have an SEO description.
- Products (185): `$R/shopify/products-all.json` + raw `descriptionHtml` from `products-p1..p4.json` (word counts, ingredient/nutrition/dosage/warning/disclaimer detection, duplicate descriptions); product page HTML (`$R/pages/product.html`, `product-creatina-creapure.html`, `products/*.html`) for trust signals.
- Collections (23): six collection HTML pages, `templates/collection.json`, `sections/main-collection.liquid`; About page `$R/pages/page-despre-noi.html`; `$R/shopify/pages.json` (11 pages); theme sources in `$R/theme/`.

What could not be checked: Search Console / traffic (no credentials), live SERP overlap of the cannibalising articles (no WebSearch in this agent), medical accuracy beyond plausibility checks (no clinical reviewer), the truth of the author's credentials (no public register consulted). `content_quality.py` uses an English filler/AI-phrase lexicon, so its 79-87/100 scores on Romanian text only measure density/repetition and are reported as such.

## Score

**29 / 100** (Content Quality). Internal E-E-A-T model: Experience 4/20, Expertise 7/25, Authoritativeness 5/25, Trustworthiness 13/30 = **29**, i.e. the "Very low E-E-A-T" band (0-29) of the scoring guide.
Rationale: 98% of the blog is unreviewed generator output on YMYL topics whose "sources" are homepage links, published under an unverifiable credential with inconsistent facts; the catalogue is half empty (102 products < 50 words, 23/23 collections with no copy). The things that are good (length, structure, legal pages, reviews) do not offset policy exposure.

## What works

- Article structure is consistent and scannable: median 1,529 words (p25 1,416 / p75 1,620), median 16 H2 + 24 H3, tables in 348/355, FAQ block in 344/355, key-takeaways block in 321/355; average sentence length 18-21 words with 19-25% of sentences over 25 words (fine for Romanian).
- Bodies are not literal copies of each other: max 5-word-shingle Jaccard between any two articles is 0.083 (catalog-analysis.md), so the duplication problem is intent/topic, not text.
- Internal linking volume is high: 5,702 internal links (median 17 per article), 114 distinct products linked, 446 collection links.
- The six 2025 articles (no BlogGenAI marker) show first-hand product knowledge, e.g. `glycerolul-secretul-...` cites a Journal of Strength and Conditioning Research study by name; `water-out-tinctura-...` (2,816 words) explains every ingredient.
- Core supplement descriptions are substantial: creatina-creapure 600 words, pure-isolate-2000g 653, thermo-core-120-caps 747, max 988; 36/85 supplements list ingredients, 32/85 have nutrition values.
- Product metadata is not templated: `metadata_template.py` on 81 pairs → `site_risk: low`, `templated_ratio: 0.0`, only 19 `brand-suffix-in-description` flags.
- Trust basics exist: Judge.me reviews render on product pages (17 reviews on creatina-creapure, 4 on baton-proteic-capsuni), legal pages are real (termeni-și-condiții 3,952 words, politica-de-confidentialitate 2,132, politica-de-retur 1,122), contact page carries NAP, HTTPS.
- `content_humanize.py` found 0 invisible/watermark characters in all 12 scanned bodies.

## Findings

### CONTENT-01 — Blog is scaled, unreviewed generator output on YMYL topics (scaled content abuse exposure)
- Severity: **Critical**
- Evidence:
  - 347/355 bodies contain the `BlogGenAI` HTML comment, 347 carry injected JSON-LD, 312 `<style>` blocks, 309 `onclick=` handlers, 347 non-JSON-LD `<script>` tags (`articles-p*.json` body parse). App extension `bloggenauto` (tracking.js) is in the homepage HTML.
  - Velocity: 2026-05 = 127 articles (ISO week 20: 46, W21: 40, W22: 36), 2026-06 = 71; 10 on 2026-05-15, 9 on 2026-05-18, 8 on four other days; 7/day on ten further days (catalog-analysis.md velocity tables).
  - Identical template on every page: "Key Takeaways" (English label) 321/355, "Share / Post" English buttons 349/355, "Top 5 probleme pe care X le rezolvă" 299/355, FAQ 344/355, in-body product price card "⚡ În limita stocului disponibil" 348/355 (533 cards, median 2 per article), arrow CTAs ("Cumpără Acum →", "Comandă acum →") 1,825 in total, median 6 per article, "Parte dintr-o colecție" box 241/355.
  - Unfilled prompt placeholders reached production: the embedded `Person` JSON-LD has `"jobTitle": "Professional title based on niche"` in **26** published articles (15 of them in Sept 2026, e.g. `intra-workout-dozaj-optim-carbohidrati-combatere-stres`, `taurina-ce-este-recovery-bcaa-500g-how-to`, `creatine-side-effects-creatine-ready-to-go-plicuri`, `proteina-whey-isolate-prime-whey-go-budget-protein`).
  - Language leaks: 349/355 bodies open with an English "Published: May 15, 2026 | Updated: ..." line; a published article has an English title (`fat-burner-x10-pareri-l-carnitine-1000-80-caps`: "Exploring the Science Behind L-Carnitine 1000: How It Transforms Fat..."); an all-English draft exists unpublished (`creatine-monohydrate-creatina-creapure-debunking-common-supplement`, "Buy Now / While supplies last"); 191 handles contain English prompt fragments (`-healthy-eating-for-busy-people`, `-debunking-common`, `-signs-your-body`).
  - Topic drift from automation: `tricou-sala-cele-mai-bune-tricouri-yoga` (1,346 words on yoga T-shirts, bylined "Nutriționist Certificat", citing Healthline for "hainele care ne fac să ne simțim bine pot îmbunătăți performanța").
  - No first-hand signals in any sampled 2026 body: no original photos, no athlete case studies, no lab/COA data, no "I tested"; `content_quality.py` cannot flag this (English lexicon) and scored the sampled 2026 bodies 79-87 purely on density.
  - Who/How/Why test: Who = unverifiable (see CONTENT-04); How = no disclosure that content is AI-generated; Why = every article is a product sales page (348/355 with buy buttons).
- Affected scope: 347 of 354 published articles (98%), i.e. 31% of all 1,151 sitemap URLs (x2 with /ro-hu/ duplicates).
- Recommendation:
  1. Stop BlogGenAuto auto-publishing today (Apps → BlogGenAuto → pause schedule). Do not uninstall yet (its tracking.js/CSS are referenced by bodies).
  2. Triage all 347 generated articles into three buckets using the cluster map in CONTENT-05: **keep & rewrite** (~110-130 best-performing or best-fitting per topic), **merge + 301** (~190), **delete + 301 to the nearest pillar/collection** (anything with no distinct intent, e.g. the yoga T-shirt piece). Shopify: changing a handle or deleting an article requires a manual URL redirect (Online Store → Navigation → URL redirects; bulk CSV import supported).
  3. For every kept article: human editorial pass by the named author (facts, sources, dosage, safety), remove generator chrome (price cards, 6 CTAs, "Top 5 probleme", English labels), add a "Cum scriem" disclosure line (e.g. "Articol redactat cu asistență AI și verificat de Marius Chera la data de ...").
  4. Set a publishing cadence humans can review (max 4-6 per week).
- Falsifiability: if Google's scaled-content classification were not a risk, a site: query would show all 354 articles indexed with impressions; a Search Console "Pages" report showing mass "Crawled – currently not indexed" on /blogs/news/ or a manual action notice confirms the problem.
- Leading indicator: GSC indexed-page count for `/blogs/news/*` and impressions per article 4-8 weeks after triage; share of articles with ≥1 click.
- Effort: L. Confidence: 0.9.

### CONTENT-02 — All "scientific sources" are homepage links; no real citation exists in the blog
- Severity: **High** (YMYL expertise/trust)
- Evidence (body HTML parse of 355 articles):
  - `ncbi.nlm.nih.gov` is linked 330 times — **330/330 go to `https://www.ncbi.nlm.nih.gov`** (0 to `/pmc/articles/` or `/pubmed/`). `healthline.com` 276/276 → root, `mayoclinic.org` 258/258 → root, `who.int` 236/236 → root. 0 `doi.org` or PMID references in 355 bodies; EFSA mentioned once; ANSVSA/Ministerul Sănătății never.
  - Typical phrasing: "Conform studiilor publicate de NCBI, viteza cu care corpul poate procesa proteinele dictează rata de recuperare" (`izolat-proteic-emperor-mass_3000g-protein-for-muscle`); "Studiile recente de pe NCBI arată că extractul de bergamotă nu doar că scade LDL-ul..." (`colesterol-7-semne-colesterol-marit-ghid`); "Potrivit Mayo Clinic, acestea ajută la reducerea oboselii" (`apa-de-cocos-nitrox-no-stim-antrenamente-seara`).
  - 848 paragraphs mention "studii/cercetări"; 315 (37%) contain no link at all; the other 63% link to a homepage.
  - Invented statistics presented as results: stat cards "38% Reducere LDL / 25% Scădere Trigliceride / 42% Creștere HDL / 100% Ingrediente Naturale" (`colesterol-7-semne-...`), "% Reducere/Scădere/Creștere" cards in 47 articles, "cu până la N%" in 58, "N% dintre" in 37 bodies, 19 titles with a percentage ("Greșeala de Puritate a Creatinei pe care 85% dintre Sportivi o fac în 2026", "Eroarea în protecția ficatului pe care 75% dintre sportivii de peste 35 de ani o fac").
  - `content_verify.py` returned `claim_count: 0` on all 12 bodies (English-only claim detector), so this was established by direct inspection.
- Affected scope: 347 articles; every article that touches a health outcome.
- Recommendation: for each kept article replace homepage links with a numbered "Surse" list of specific, checkable references (PubMed ID / DOI / EFSA opinion number; e.g. creatine: Kreider et al. 2017 ISSN position stand, doi:10.1186/s12970-017-0173-z). Delete every unsourced percentage and stat card. Add an editorial rule: no "studiile arată" without a link to the study. Keep external links `rel="noopener"` (not nofollow) to real sources.
- Falsifiability: if the links were real citations, the URL list would contain article-level paths; the parse shows 100% root URLs.
- Leading indicator: count of `/pmc/`, `/pubmed/`, `doi.org`, `efsa.europa.eu` links in article bodies (target ≥3 per YMYL article); count of "%" stat cards (target 0 unsourced).
- Effort: L. Confidence: 0.95.

### CONTENT-03 — Health/medical claims without disclaimers, safety information or medical review
- Severity: **High**
- Evidence (corpus scan of 355 bodies):
  - A "nu înlocuiește / nu substituie" disclaimer appears in **8/355**; "consultă (un) medic" in 32/355; the EU-mandatory supplement wording ("supliment alimentar", "dietă variată și echilibrată") in 17/355.
  - Topics touched without those safeguards: colesterol 62 articles, tensiune arterială 56, diabet 32, depresie/anxietate 33, sarcină/alăptare 20, copii 20, cancer 5; verbs "tratează/tratament" 46, "vindec-" 15, "previne bolile/cancer/diabet" 25.
  - Examples: `colesterol-7-semne-colesterol-marit-ghid` tells readers bergamot "acționează similar cu statinele naturale, dar fără efectele secundare", "inhibă enzima HMG-CoA reductaza", "nu provoacă dureri musculare sau oboseală, fiind o opțiune excelentă pentru utilizarea pe termen lung", and offers a "Tabel valori colesterol" with diagnostic thresholds; `hibiscus-si-tensiunea-arteriala-...` claims "inhibarea naturală a enzimei de conversie a angiotensinei (ACE)"; `alpha-booster-testosterone-...` claims extracts "modula axa hipotalamo-hipofizo-testiculară"; `ceai-diuretic-sfatul-medicului-...` (title "Sfatul medicului", author field `primesupplements1`) recommends "cure de 10-14 zile" of diuretics; `gymbeam-creatine-...-5` recommends a 20 g/day loading phase with no renal caveat.
  - Two titles claim physician advice ("Sfatul medicului: ...", "Sfatul Medicului: De Ce Nu Funcționează Suplimentele Pentru Inimă...") while no physician is named anywhere on the site.
  - Product pages: warnings text on 15/85 supplements, disclaimer 11/85, dosage 28/85 (raw `descriptionHtml` scan); product page HTML has 0 hits for "Avertismente", "nu înlocuiește", "ANSVSA/notificare" (`product.html`, `product-creatina-creapure.html`).
- Affected scope: ~200+ articles with disease/condition vocabulary; 85 supplement products.
- Recommendation:
  - Theme: add a fixed disclaimer block to `sections/main-article.liquid` (after the content, before `schema-article`) and to the product description tab in `snippets/product-info.liquid`, e.g.
    ```liquid
    {%- if blog.handle == 'news' -%}
    <aside class="prose text-subdued text-sm" data-disclaimer>
      <p>Informațiile din acest articol au scop educativ și nu înlocuiesc sfatul medicului sau al farmacistului. Suplimentele alimentare nu țin locul unei diete variate și echilibrate și al unui stil de viață sănătos. Consultă medicul înainte de a folosi suplimente dacă ai o afecțiune, urmezi un tratament, ești însărcinată sau alăptezi. A nu se depăși doza zilnică recomandată. A nu se lăsa la îndemâna copiilor.</p>
    </aside>
    {%- endif -%}
    ```
  - Editorial: strip treatment/cure/disease-prevention language; keep only health claims permitted for the ingredient (EU Regulation 1924/2006 authorised-claims register; e.g. creatine: "increases physical performance in successive bursts of short-term, high-intensity exercise" at 3 g/day); add contraindications paragraph to every YMYL article; retitle the two "Sfatul medicului" pieces or have a named physician review them.
  - Product template: mandatory "Avertismente" and "Mod de administrare" fields (metafields `custom.warnings`, `custom.dosage`) rendered on every supplement.
- Falsifiability: a rater applying the QRG YMYL "Lowest" criteria would find pages giving medical advice without qualifications; absence of the disclaimer is a binary check.
- Leading indicator: % of articles/products with the disclaimer block (target 100%); count of "tratează/vindecă/previne boala" phrases (target 0).
- Effort: M (theme) + L (editorial). Confidence: 0.9.

### CONTENT-04 — Author identity is unverifiable and internally inconsistent; no author page; 18 articles authored by the store handle
- Severity: **High**
- Evidence:
  - Shopify `author` field values: "Marius Chera , Nutriționist Certificat" 325, "primesupplements1" 18 (the myshopify handle, e.g. `vitamine-b12-90-zile-vitamina-d3-k2`, `ceai-diuretic-sfatul-medicului-cauze-retentie-apa`, `psv-nac-administrarea-n-acetilcisteinei-dimineata-seara`, `tricou-sala-cele-mai-bune-tricouri-yoga`, `crema-orez-transforma-antrenamente-crema-orez-blueberry`), "Marius Chera" 10, "Sorin Cristea" 2 (no bio anywhere for Sorin Cristea). The theme prints `article.author` as plain text (`snippets/blog-post-card.liquid` line 86, `article-banner`): no link, no author page exists in `pages.json`.
  - The credential "Nutriționist Certificat" is in 336 bodies and 325 author fields but no certificate issuer, number, year or institution is given anywhere; the About page describes Marius Chera only as "unul dintre cei mai cunoscuți antrenori de culturism" and never as a nutritionist.
  - Bio facts drift between generations of the boilerplate: "18 ani de experiență" (346 bodies) vs "15 ani experiență" (3, the 2025 articles re-stamped in March 2026); "8 NPC PRO Cards" (340) vs "10 NPC PRO Cards" (8); "Lector la cursurile de instructori din cadrul FRCF" (333) absent from the About page; embedded `Person.jobTitle` has 6 different values ("Antrenor de culturism și nutriționist sportiv" 47, "Expert Nutriție Sportivă și Biohacking" 42, "Expert Nutriție Sportivă & Biohacking" 41, "Expert Nutriție Sportivă & Antrenor Culturism" 35, "Nutriționist Sportiv & Antrenor Culturism" 12, placeholder "Professional title based on niche" 26).
  - Two Article entities with different authors on the same page: BlogGenAuto's embedded Article says `author: Person "Marius Chera , Nutriționist Certificat"`, the theme's `schema-article` (rendered inside `<main>` by `main-article.liquid`) says `author: Organization "Prime Supplements"` (`article-2026-citicolina.html`).
  - Company facts conflict: About page and bio say the company was "conceput în anul 2022" (J32/1155/2022 agrees); homepage Organization JSON-LD says `"foundingDate": "2020"` (`$R/home.html`).
  - The author box is identical boilerplate in 345 articles ("Specializat în online coaching, aplică tehnici de Biohacking și Anti-aging..." verbatim in 345 bodies; 333 and 325 for the other two sentences): it adds no page-specific expertise signal.
- Affected scope: all 355 articles; About page; Organization schema.
- Recommendation:
  1. Create `/pages/marius-chera` (author page): photo, full name, exact credential with issuer and year ("Nutriționist certificat – [instituție], [an], certificat nr. ..."), FRCF lecturer evidence, competition record, list of coached athletes with verifiable placements, media mentions, LinkedIn/Instagram, and a "Cum scriem articolele" process statement (AI-assisted drafting + human review + source policy). Add `Person` JSON-LD with `sameAs`, `jobTitle`, `alumniOf`/`hasCredential`.
  2. Theme: in `snippets/article-banner.liquid` / `blog-post-card.liquid` wrap `{{ article.author }}` in `<a href="/pages/marius-chera" rel="author">`; drop the credential from the author string (set Shopify author to "Marius Chera" on all 325+10 articles) and render the credential from the author page instead.
  3. Reassign the 18 `primesupplements1` articles and the 2 "Sorin Cristea" ones to a real reviewer (or add a Sorin Cristea bio).
  4. One canonical bio with one set of facts (years, cards, lecturer role); fix `foundingDate` to 2022 in `snippets/schema-organization.liquid`.
  5. Remove the 26 placeholder jobTitles (they disappear when the embedded JSON-LD is stripped, see CONTENT-11).
- Falsifiability: if credentials were verifiable, a reader could find the issuing body; today no page on the site names one.
- Leading indicator: author page live and linked from 100% of bylines; 0 articles with author "primesupplements1"; 1 bio variant.
- Effort: M. Confidence: 0.9.

### CONTENT-05 — Topic cannibalisation: regenerated series and product-anchored clusters compete for the same intent
- Severity: **High**
- Evidence:
  - 42 handles end in -2/-3/-4/-5 forming 28 regenerated series, each tied to one product and one prompt, e.g. `gymbeam-creatine-creatina-monohidrat-micronized-300g-fara` ×5 (2026-03-12 → 2026-09-13; titles "Cum să iei Creatină în Călătorii", "Creatina în Călătorii: Așteptări Realiste", "De ce Strategia ta de Creatină Eșuează", "Cum să Maximizezi Antrenamentele de Toamnă cu Creatina"), `creatine-benefits-creatina-monohidrat-...` ×4, `creatine-gummies-creatina-monohidrat-...` ×4, `before-and-after-creatine-creatine-ready-to-go-plicuri` ×4, `acetyl-l-carnitine-l-carnitine-1000-80-caps` ×4, and 23 pairs such as `instant-oat-cream-800g-25-serv-mindful-eating-practices` ("Mâncatul conștient cu ovăz: Tot ce trebuie să știi în 2026") vs `-2` ("Alimentația conștientă cu ovăz: Tot ce trebuie să știi în 2026"), `fiber-blood-orange-building-balanced-meals` ("Secretele Absorbției Fibrelor: Cum să obții cu 40% mai multă energie") vs `-2` ("...cu 50% Mai Multe Beneficii").
  - Title-level: 68 titles about creatină, 44 about fibre/ovăz/crema de orez, 35 about l-carnitină/arzătoare/slăbit, 26 BCAA/EAA, 24 proteină/izolat/gainer; 47 three-word keyword groups cover 164 articles; 719 title pairs with similarity > 0.6; the prefix "De ce strategia ta de ..." is used 9 times, "6 semne că ai nevoie ..." 4 times.
  - Handle anchors per product: instant-oat-cream-800g-25-serv 22 articles, fiber-blood-orange 21, creatina-monohidrat-micronized-300g-fara 18, creatina-creapure 18, creatine-ready-to-go-plicuri 16, thermo-core 16, magneziu 14, prime-whey 12, eaa-aminoacizi 12, recovery-glutamin 12, l-carnitine-1000 11, water-out 11, recovery-bcaa-500g 11.
  - Body texts are not copies (max Jaccard 0.083), so the issue is many pages for one query, not duplicate text; the blog has no hub pages to disambiguate (346/355 untagged).
- Affected scope: ≥164 articles in overlapping groups; ~73 creatine articles alone.
- Recommendation (consolidation map; survivor = most complete/most linked, others 301 to it; move unique facts into the survivor):
  | Cluster (articles today) | Pillar to keep/create | Spokes to keep (max) | Merge/301 |
  |---|---|---|---|
  | Creatină (73: monohidrat 18, Creapure 18, Ready-to-Go 16, generic 21) | "Creatină monohidrat: ghid complet (dozare, timing, siguranță, mituri)" | dozare & încărcare; dimineața vs seara; pauze/ciclare; creatină în călătorii; creatină și hidratare/retenție; efecte secundare & rinichi; Creapure vs monohidrat; creatină pe vârste; creatină pentru femei (9) | gymbeam-creatine ×5 → 1 "călătorii"; creatine-benefits ×4 + creatine-gummies ×4 → timing/rutină; before-and-after ×4 + creatine-side-effects ×3 → siguranță/rezultate; remaining ~50 → pillar |
  | Fibre (21 fiber-blood-orange) | "Fibre prebiotice (inulină + acacia): ghid" | digestie/balonare; glicemie & pofte; energie; antiinflamator; buget; combinații (6) | all 7 "-2" pairs → base; ~8 others → pillar |
  | Ovăz instant (22) | "Crema de ovăz instant: ghid de utilizare" | mic dejun/rutină; rețete; digestie (3) | 7 pairs → base; rest → pillar |
  | Arzătoare & L-carnitină (47: thermo-core 16, l-carnitine 11, fat-burning-booster 10, pareri 10) | "Arzătoare de grăsimi: ce funcționează (și ce nu)" + "L-carnitină: doză, timing, rezultate" | ieftin vs premium; pe vârste; 8/12 săptămâni jurnal; combinații; monitorizare (5) | acetyl-l-carnitine ×4, l-carnitine-pareri ×3, l-carnitine-15-reducere ×3, acetyl-15-reducere ×3, fat-burner ×2, x10-pareri ×2 → spokes |
  | Water Out / retenție (11 + 2 diuretic) | "Retenția de apă: cauze și diuretice naturale" | contraindicații; sportivi/definire (2) | fat-burner-pareri-water-out ×2 → pillar |
  | Glutamină (16), BCAA/EAA (25), Taurină (10), Magneziu (14), Zinc (7), NAC (9), Whey/Isolate/Gainer (19) | one pillar each | 2-3 each | rest → pillar |
  Target: ~120-140 surviving articles. Change handles only when merging (Shopify auto-creates the redirect when "Create a URL redirect" is ticked on handle change).
- Falsifiability: GSC "Queries" for e.g. "creatina in calatorii" currently shows several /blogs/news/ URLs alternating; after consolidation one URL should hold the impressions.
- Leading indicator: number of /blogs/news/ URLs receiving impressions for the same top query (target 1); articles with ≥1 click / total.
- Effort: L. Confidence: 0.85.

### CONTENT-06 — Product descriptions missing or thin: 102 products under 50 words, including the blog's most-linked product
- Severity: **High**
- Evidence (`products-all.json`, raw `descriptionHtml`):
  - 102/185 products < 50 words, 119 < 150, 140 < 300; MNX apparel median 0 words (80/100 MNX have an empty description; material/size info present on only 19/100); supplements median 303.
  - Supplements with empty/near-empty descriptions: `nitrox` (0 words), `creatina-monohidrat-micronized-300g-fara-aroma` (0 words; it is the product linked from 25 articles), `prime-shaker-customised` 0, `instant-drink-frutilu-watermelon-10g` 0, `-pineapple-10g` 0, `frutilu-instant-drink-strawberry-10-g` 0, `-sport-red-orange-10-g` 0, `instant-drink-frutilu-green-apple-10g` 19, `-ice-tea-peach-10g` 23, `-ice-tea-lemon-10g` 23, `pachet-mix-arome-...-set-degustare` 14, `unt-de-caju` 37, `sapca-prime` 31, `prosop-negru` 55, `scortisoara-ceylon-bio-200g` 88.
  - Structure gaps on the 85 supplements: ingredients 36, nutrition values 32, dosage 28, warnings 15, disclaimer 11, benefits copy 46. 12 descriptions *start* with "Mod de administrare"/"Ingrediente", so with 104 products lacking an SEO description the meta falls back to dosage text (live: `product.html` `<meta name="description" content="Mod de administrare După cum este necesar în ceea ce privește compoziția di...">`).
  - Page-level trust: product HTML shows 0 occurrences of "Valori nutritive", "Avertismente", "ANSVSA", lot/expiry, TUV/IFS/HALAL (the certifications are claimed on the About page only).
- Affected scope: 102 products below 50 words (89 MNX, 13 supplements); 85 supplements for the structure gaps.
- Recommendation: adopt one description template per type and fill via metafields so the theme renders consistent tabs (`snippets/product-info.liquid` already has collapsible blocks):
  - Supplements: Ce este & pentru cine (60-80 w) → Beneficii (only EU-authorised claims) → Ingrediente + tabel nutrițional per porție (metafield `custom.nutrition_table`, rich text or JSON) → Mod de administrare → Avertismente → Certificări (link to certificate PDFs) → FAQ 3-5 (from the article cluster) → write SEO description separately (never dosage).
  - MNX apparel: material & gramaj, croi/fit, model height/size worn, îngrijire, mărimi + ghid mărimi, origine/producție, 80-150 words + unique first paragraph per model (colour variants: see CONTENT-07).
  - Priority order: creatina-monohidrat-micronized-300g-fara-aroma, nitrox, the 4 empty Frutilu flavours, then the 80 empty MNX pages.
- Falsifiability: products with 0-word descriptions cannot be ranked for anything but their name; GSC impressions for those handles will be near zero.
- Leading indicator: products < 150 words (target 0); products with nutrition table (target 85/85).
- Effort: L. Confidence: 0.95.

### CONTENT-07 — Duplicate and near-duplicate product content (variants published as separate products, cloned descriptions)
- Severity: **Medium**
- Evidence:
  - Identical descriptions: `prime-whey-1000g`, `prime-whey-2000g`, `prime-whey-go` (same first 400 chars); `mnx-hoodie-industrial-bronze` = `mnx-hoodie-industrial-dusty-rose`.
  - 19 near-duplicate title groups / 45 products: MNX colourways (`mnx-extra-t-shirt-basic-black/-grey/-white`, `mnx-workout-top-hammer-3-0-white/-black/-grey`, `mnx-ribbed-shorts-hammer-black/-white/-grey`, ...) and Frutilu flavours (19 Frutilu products; 14 of them carry ~270-320-word descriptions that follow one template: "🥭 GUST INTENS DE MANGO • CU STEVIA • FARA ZAHAR..." vs "🥤 GUST INCONFUNDABIL DE COLA • CU STEVIA • FARA ZAHAR...", same section order "De ce sa alegi...").
  - SEO descriptions: 31/81 end with a brand CTA ("Alegeți PRIME Supplements pentru produse de calitate superioară!" 12, "...pentru rezultate excelente!" 7, "...pentru rezultate optime!" 5, "Alegeți PRIME Apparel pentru calitate superioară!" 4, "...pentru produse de calitate!" 3); `metadata_template.py`: 19 `brand-suffix-in-description` flags, site risk low.
  - The B2B store republishes the same handles/descriptions (context fact), compounding duplication.
- Affected scope: 45 products in title groups + 5 with cloned descriptions + 19 Frutilu.
- Recommendation: (a) merge MNX colourways into one product with a Colour option (Impact theme supports colour swatches); if the business insists on separate products, write a unique first paragraph per colour and set `rel=canonical` to the primary colour via the theme (`{% if product.metafields.custom.canonical_handle %}`); (b) same for Frutilu flavours or give each flavour real differentiation (taste notes, use case, ingredient differences, nutrition per flavour); (c) rewrite the three Prime Whey descriptions around size/use case (1 kg trial, 2 kg value, Go sachets); (d) drop the "Alegeți PRIME Supplements..." sentence from SEO descriptions and use the 40 chars for a benefit/USP.
- Falsifiability: Google picks one colour URL as canonical for the group; GSC "Duplicate, Google chose different canonical" entries for MNX handles would confirm.
- Leading indicator: number of MNX/Frutilu URLs reported as duplicates in GSC (target 0).
- Effort: M. Confidence: 0.85.

### CONTENT-08 — All 23 collection pages have no editorial content (thin category pages)
- Severity: **High**
- Evidence: 23/23 collections have an empty description (only "Bauturi" has two words, "Bauturi Sport"); collection pages' main content is 343-971 words of nav + product-card text only (`collection-creatina.html` 490 words, `collection.html` /pudra-proteica 517, `collection-reduceri.html` 343 with 0 products); `schema-collection.liquid` emits `"description": ""`. Root cause is data, not theme: `templates/collection.json` → section `banner` (type `collection-banner`) has `"show_collection_description": true`, so text entered in Admin → Collections → Description renders immediately (no theme change needed). 8 collections also lack SEO title/description (context).
- Affected scope: 23 collections (46 URLs with /ro-hu/), the main category landing pages for every commercial query (creatină, pudră proteică, arzătoare, aminoacizi, pre-workout...).
- Recommendation: write 150-300 words per category collection (13 real categories: creatina, pudra-proteica, aminoacizi, arzator-de-grasimi, suplimente-pre-workout, suplimente-intra-workout, batoane-proteice, vitamine-si-minerale, prime-health, crema-de-orez, bauturi, haine-mnx, accesorii-sala), structure: 1 intro paragraph (what the category is, who it is for, how Prime formulates it) above the grid + "Cum alegi" guide + 3 FAQ + links to the pillar article below the grid (Impact "rich text"/"FAQ" section added to `templates/collection.json` or a metafield rendered by `main-collection.liquid`). Example for `creatina`: "Creatina monohidrat Prime Supplements: Creapure® 500 g, monohidrat micronizat 300 g și plicuri Ready-to-Go. Dozare 3-5 g/zi, fără fază de încărcare obligatorie... [link la ghidul complet]". Do not write copy for `all`, `cele-mai-vandute`, `lansate-recent`, `11-tva`, `frontpage` (candidates for noindex, per technical findings). Remove or populate `reduceri` (0 products).
- Falsifiability: if category copy were irrelevant, competitors' category pages (gymbeam.ro, proteinshop.ro) would also be text-free; they carry 200-600 words.
- Leading indicator: collections with ≥150 words (target 13/13); impressions for category queries per collection URL.
- Effort: M. Confidence: 0.95.

### CONTENT-09 — In-body link hygiene: 2,582 myshopify links, 534 add-to-cart deep links, 194 dofollow "Powered by BlogGenAuto" links, links to dead promo products
- Severity: **High**
- Evidence (body HTML parse):
  - 2,582 links to `primesupplements1.myshopify.com` in 349 articles (1,602 product, 534 cart, 446 collection); every product link exists twice (primary domain + myshopify), e.g. live page: 27 myshopify occurrences.
  - 534 add-to-cart links of the form `https://primesupplements1.myshopify.com/cart/55180000756087:1` (variant-ID deep links, `target="_blank"`; /cart is disallowed in robots.txt) – they break if a variant is re-created and bypass the product page.
  - 194 articles end with `<a href="https://bloggenauto.com" target="_blank" rel="noopener" style="color: #9aa0a6;...">Powered by BlogGenAuto</a>` (live fetch confirmed; no `nofollow`/`sponsored`; `#9aa0a6` low-contrast grey on white). Google's link-spam policy lists "widely distributed links in the footers or templates of various sites" and requires `rel="sponsored"`/`nofollow` for such widget links; 194 identical outbound links is also an obvious footprint of automation.
  - 353 articles use `target="_blank"` on internal links; 309 have inline `onclick` share handlers.
  - Links to products that no longer exist: `15-reducere-pachet-thermo-core-water-out-1-14-august` (expired August promo bundle) from 12 articles, `liver-protect-500-ml` from 4.
  - 6 articles (the 2025 set) link to no product at all; 112 link to no collection; MNX apparel (100 products) is linked from one article.
- Affected scope: 349 articles.
- Recommendation: one scripted body clean-up (Admin GraphQL `articleUpdate`, run on a backup/export first, never on the live set without review): rewrite `primesupplements1.myshopify.com/products/...` → `/products/...` and drop the duplicate anchor; replace `/cart/<id>:1` buttons with a product-page link; delete the "Powered by BlogGenAuto" anchor (or at minimum add `rel="sponsored nofollow"`); remove `target="_blank"` on internal links; repoint the 16 dead-product links to the live replacement (`thermo-core-120-caps` / `water-out-120-caps`); add 1-2 contextual links per article to the relevant collection and, where relevant, to MNX.
- Falsifiability: fetch any article and grep for `myshopify.com` and `bloggenauto.com`; both should return 0 after the fix.
- Leading indicator: count of myshopify/cart/bloggenauto anchors in article bodies (target 0).
- Effort: M. Confidence: 0.95.

### CONTENT-10 — Date integrity: a hard-coded, English "Published:" line contradicts the real publish date on 315 articles; no genuine update signal
- Severity: **Medium**
- Evidence: 349/355 bodies open with `Published: <Month> <d>, 2026 | Updated: <same date>`; the hard-coded date differs from Shopify `publishedAt` on **315/349** (e.g. `apa-de-cocos-nitrox-no-stim-antrenamente-seara`: body `<time datetime="2026-09-11">September 11, 2026</time>` while the theme prints `<time>11 oct. 2026</time>` and the embedded Article JSON-LD says 2026-10-11 – three dates on one page). "Updated:" always equals "Published:" (0 real update signals); only 29 articles have `updatedAt` > `publishedAt`, and those are the 2025 pieces whose only change was the bio swap ("Actualizat: 12 martie 2026"). The theme's own date is correct and localised.
- Affected scope: 349 articles.
- Recommendation: delete the generator's date/byline/share header from every body (same clean-up script as CONTENT-09); keep only the theme byline; when an article is genuinely revised, update `article.published_at` is wrong – instead show `article.updated_at` via a metafield `custom.last_reviewed` rendered as "Verificat medical la ..." and map it to `dateModified` in `schema-article.liquid`.
- Falsifiability: visible dates on a page should match `datePublished` in its JSON-LD; today they do not.
- Leading indicator: articles with conflicting dates (target 0).
- Effort: S (with the script). Confidence: 0.9.

### CONTENT-11 — Generator-injected markup in bodies: duplicate H1s, in-body JSON-LD duplicating theme schema, invented breadcrumb categories, inline CSS/JS
- Severity: **Medium**
- Evidence: 347 bodies embed Article + FAQPage (median 5 Q) + BreadcrumbList + Person JSON-LD (`has_ldjson_in_body` 347), which coexist with the theme's `schema-article` so each page carries two Article entities (Person author vs Organization author, see CONTENT-04). 26 bodies contain an `<h1>` (25 identical to the title → two H1s on the page; live `apa-de-cocos` page shows `<h1 class="h0">` + in-body `<h1>` with the same text; 17 of the 26 were published in Sept 2026, so the defect is recent and ongoing). Embedded BreadcrumbList names categories that do not exist as pages ("Nutriție Sportivă" 94, "Nutriție și Sănătate" 22, "Nutriție și Suplimente" 21, "Sănătate Digestivă" 13) and in 32 articles the last breadcrumb item URL is a slug that does not exist (e.g. `.../citicolina-conexiune-musculara-rutina-seara-2026` for the article at `.../citicolina-conexiune-musculara-rutina-antrenament-seara-travel-2026`). 312 bodies carry `<style>` blocks, 285 inline `font-size ≤ 12px`, 243 contain emoji, 347 contain non-JSON-LD `<script>` tags. FAQPage has no SERP feature since May 2026 (Info only).
- Affected scope: 347 articles.
- Recommendation: strip all `<script>`, `<style>` and the breadcrumb/H1 header from bodies in the clean-up script; let the theme own schema (fix `schema-article.liquid` per the schema specialist, author → Person linked to the author page); keep FAQ as visible HTML only.
- Falsifiability: `grep -c '<script' body` should be 0; one H1 per page.
- Leading indicator: pages with >1 H1 (target 0); articles with JSON-LD inside body (target 0).
- Effort: S-M. Confidence: 0.9.

### CONTENT-12 — Titles are year-stamped, over-long and clickbait-patterned; 311 teasers are truncated with "..."
- Severity: **Medium**
- Evidence: 279/355 titles contain "2026" (0 contain 2025; they go stale on 2027-01-01 and are already "last year" for evergreen topics); 245 > 65 chars (median 69, 6 > 100, max 134: "Cum să Transformi Bioflavonoidele și Ceaiul Verde în Aliați Puternici în Lupta împotriva Grăsimilor: Ghida Completa pentru Thermo Core" – note the typo "Ghida"); title tag = page title with no brand suffix. Patterns: "Semne că/ale ..." 44, "Cum să ..." 38, "Ghid(ul) complet" 24, "Aprobat/Recomandat de experți" 21, "Secretul/Secretele" 20, "% in title" 19, "Greșeala/Eroarea ... pe care ... o fac" 10, "În sfârșit: ..." 9, "ieftin vs premium" 7; 36 titles embed a product name. Related-article and About-page teasers are hard-truncated at ~55 chars with "..." in 311 bodies ("Cum să asociezi suplimentele pre-workout fără stimulent...").
- Affected scope: 355 articles (+ blog index cards, homepage "Informații utile" block).
- Recommendation: title rule for rewrites: ≤ 60 chars, primary keyword first, no year unless the content is dated (e.g. a 2026 product launch), no unsourced numbers, no "experții/secretul"; e.g. "Cum să iei creatina: doză, moment, pauze" instead of "De ce Strategia ta de Creatină Eșuează în 2026 (și Soluția)". Fix the truncated teasers by writing a real excerpt (Shopify `article.excerpt`, currently empty on 6 and auto-truncated elsewhere) ≤ 160 chars.
- Falsifiability: GSC CTR per title pattern; year-stamped titles drop impressions in Q1 2027.
- Leading indicator: titles > 60 chars (target < 10%); titles with a year (target < 5%).
- Effort: M. Confidence: 0.8.

### CONTENT-13 — Slugs contain English prompt fragments, competitor brand names, product SKUs and numeric suffixes
- Severity: **Medium**
- Evidence: 191 handles contain English fragments (`-protein-for-muscle`, `-how-to-store-supplements-prope`, `-whole-foods-vs-processed-compa` – several are cut mid-word); 10 handles contain competitor brands never mentioned in the title or body as a comparison (`gymbeam-creatine-...` ×6, `proteina-on-whey-gold-standard-prime-whey-go-...`, `proteina-whey-gold-standard-prime-whey-2000g-...`, `proteina-whey-optimum-nutrition-emperor-mass_3000g-...`, `gainer-gymbeam-prime-whey-2000g-protein-myths`; "GymBeam" appears in 22 bodies); handles carry pack sizes (`-800g-25-serv`, `_3000g`, `-120-caps`); 42 end in -2..-5; 2 are non-ASCII (`bcaa-vs-eaa-diferențe-și-...`, `water-out-tinctura-soluția-...`); 1 is 85 chars.
- Affected scope: ~230 articles.
- Recommendation: do not mass-rename (each rename costs a redirect and link equity); fix slugs only for articles that survive consolidation and get rewritten, using ≤ 5 Romanian words (`/blogs/news/creatina-in-calatorii`), with "Create a URL redirect" ticked; remove competitor names unless the article is an honest comparison.
- Falsifiability: n/a (hygiene); confirm via GSC that redirected URLs stop receiving impressions.
- Leading indicator: share of surviving articles with Romanian ≤ 5-word slugs.
- Effort: M (bundled with CONTENT-05). Confidence: 0.8.

### CONTENT-14 — No topical hubs or taxonomy: 346/355 articles untagged, blog titled "Ultimele articole", 33 paginated pages
- Severity: **Medium**
- Evidence: 5 tags in total (`preworkout` 3, `arderea grasimilor` 2, `longevitate` 2, `sanatate` 2, `aminoacizi` 1); one blog, `<h1>Ultimele articole</h1>`, 11 posts per page → ~33 pages deep; no category pages, so the breadcrumb categories invented by the generator (CONTENT-11) have no real counterpart; collections do not link to the articles about their products; `sections/main-blog.liquid` supports an intro text (`section.settings.content`) that is empty.
- Affected scope: blog index + 355 articles.
- Recommendation: create 8-10 tags matching the pillars in CONTENT-05 (creatina, proteine, arzatoare-de-grasimi, aminoacizi, fibre-si-digestie, vitamine-minerale, pre-workout, sanatate-cardiovasculara, retete), apply them in bulk, expose `/blogs/news/tagged/<tag>` hubs in the blog header and footer, write a 100-150-word intro per hub via a tag-specific section, rename the blog title to "Ghiduri de nutriție sportivă"; link each collection to its pillar article and vice-versa.
- Falsifiability: tag hubs with impressions in GSC; crawl depth of articles ≤ 3.
- Leading indicator: articles reachable within 3 clicks from home (target 100%).
- Effort: M. Confidence: 0.85.

### CONTENT-15 — About page and brand trust content are weak: no H1, unverifiable certifications, conflicting founding year, missing team
- Severity: **Medium**
- Evidence: `page-despre-noi.html` – 718 words, no `<h1>` (only an `<h2>Informații utile</h2>` from the blog block), most copy without diacritics ("piata", "sustine", "cunosti"), claims "Certificările cuprind ... TUV, IFS, HALAL, Cologne List for Athletes" with no certificate numbers, PDFs or manufacturer name; no team, no photos, no address on the page; founding stated as 2022 vs `foundingDate` 2020 in the homepage Organization JSON-LD; `pages.json`: contact, despre-noi, thank-you, creatina-custom, inregistrare-b2b have 0-2 words of CMS body (section-built), `thank-you` is indexable; `creatina-custom` 277 words without H1.
- Affected scope: About, Contact, Thank-you, Creatina custom pages; Organization entity.
- Recommendation: rebuild `/pages/despre-noi` with an H1 ("Despre Prime Supplements"), the legal entity + address + CUI block, founding year 2022, production partner/certifications with links to the certificates (Cologne List® listing URL if real), team section (Marius Chera with the author-page link, Sorin Cristea), photos of real facilities/athletes, and a "Cum formulăm produsele" paragraph; fix `foundingDate`; noindex `thank-you`.
- Falsifiability: a rater looking for "who is responsible for the site" should find a named, verifiable entity and people on the About page.
- Leading indicator: About page has H1, address, certificate links (binary).
- Effort: S-M. Confidence: 0.9.

### CONTENT-16 — Legacy human-written articles are thin or orphaned from the catalogue
- Severity: **Low**
- Evidence: `cum-contribuie-l-carnitine-1000-la-arderea-grasimilor` 73 words (`content_quality.py`: 68/100, flags `thin-content`, `low-density`), `glycerolul-secretul-...` 472 words, `bcaa-vs-eaa-...` 517 words (72/100, `low-density`); all six 2025 articles have 0 product links and 0 external links; 2 have 0 internal links; 2 have non-ASCII handles. These are the only pieces without the BlogGenAI marker and the best candidates for genuine "Experience" content.
- Affected scope: 6 articles.
- Recommendation: expand the three thin ones to 900-1,200 words with first-hand material (athlete protocols, photos, COA), add product and collection links, keep the old handles (or redirect the two non-ASCII ones to ASCII slugs).
- Falsifiability: content_quality.py re-run should drop the `thin-content` flag.
- Leading indicator: words and internal links on these 6 URLs.
- Effort: S. Confidence: 0.9.

### CONTENT-17 — English and non-localised UI strings inside content
- Severity: **Low**
- Evidence: "Key Takeaways" 321 bodies, "Share / Post" 349, "Table of Contents" 37, "Published:/Updated:/By:" 349, "Buy Now / While supplies last" in the English draft; homepage title "Prime Supplements - Hardcore Sports Nutrition" and Judge.me heading "Let customers speak for us" (context); 96 product titles in English (93 MNX, e.g. "MNX Ribbed shorts Hammer 3.0, black").
- Affected scope: 349 articles, homepage, 96 products.
- Recommendation: localise labels in the clean-up script ("Pe scurt", "Cuprins"); Romanian product titles for MNX ("Pantaloni scurți MNX Hammer 3.0, negru") keeping the English model name; translate the Judge.me heading in the app settings.
- Falsifiability: grep for the English labels returns 0.
- Leading indicator: count of English UI strings in bodies.
- Effort: S. Confidence: 0.85.

### CONTENT-18 — Image content signals: missing alt on 19 featured and 43 body images; 493/493 product images without alt
- Severity: **Low** (content view; the images specialist owns the full finding)
- Evidence: `featured_image_alt` false on 19 articles; 43/2,210 body images without alt; 493/493 product images without alt across 185 products (catalog-analysis.md); article body images are generator-supplied generic visuals (no original product/athlete photography observed in sampled bodies).
- Affected scope: 19 + 43 article images, 185 products.
- Recommendation: alt text = product name + variant for product images (bulk via CSV/Admin API `productUpdateMedia`); for kept articles replace stock visuals with original photos (label close-ups, scoops, athletes) which also feed the Experience signal.
- Falsifiability: images_without_alt count in products-all.json.
- Leading indicator: product images with alt (target 100%).
- Effort: M. Confidence: 0.9.

## Prioritised content actions (summary)
1. Pause BlogGenAuto; run the body clean-up script (CONTENT-09/10/11/17) on an export, review, then apply.
2. Publish the author page + consistent bio + disclaimer block + process disclosure (CONTENT-03/04).
3. Consolidate clusters per the map (CONTENT-05/13/14), redirecting merged URLs; retag survivors and build hubs.
4. Rewrite survivors with real citations and no stat cards (CONTENT-02), evergreen titles (CONTENT-12).
5. Fill the 13 category collection descriptions (CONTENT-08) and the 102 thin product pages, starting with creatina-monohidrat and nitrox (CONTENT-06/07).
6. Rebuild About page (CONTENT-15); expand the 2025 articles with first-hand material (CONTENT-16); fix image alts (CONTENT-18).

## Limitations
- No Search Console, analytics or SERP data: impact is inferred from content properties, not measured; indexation of the 354 articles is unknown.
- Plugin scorers (`content_quality.py`, `content_verify.py`, `content_humanize.py`) use English lexicons; their numbers are reported but the Romanian-language assessment relies on direct reading and regex scans. All scores here are heuristics, not Google signals.
- 15 of 355 bodies were read in full/part; corpus-wide numbers come from deterministic scans of all 355, but qualitative judgements are sampled.
- Medical accuracy was assessed for plausibility and sourcing only; a clinician should review YMYL pieces before republication. Credentials (NPC PRO cards, FRCF lecturer, "Nutriționist Certificat") were not verified against any registry.
- One live request was made (apa-de-cocos article); everything else is from the 2026-10-12 local evidence set.
