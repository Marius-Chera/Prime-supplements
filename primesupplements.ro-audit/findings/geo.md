# GEO / AI Search Readiness: primesupplements.ro (audit 2026-10-12)

Category: AI Search Readiness (10%). Specialist: seo-geo (claude-seo 2.4.2 method: crawler access, llms.txt, passage citability, entity/brand signals, platform readiness). Framed per Google's AI optimization guide: "optimizing for generative AI search is still SEO" (developers.google.com/search/docs/fundamentals/ai-optimization-guide, 2026-05-15, updated 2026-07-10). Scores below are heuristics, not Google-internal signals.

## Scope & method

Checked (local evidence under $R = /tmp/claude-0/-home-user-Prime-supplements/a8ac683f-a811-5bab-8ad5-3c2925806713/scratchpad/recon):
- AI crawler access: $S/tech/live/robots.txt (Shopify default, `User-agent: *` / `Allow: /`), plus 2 new throttled live fetches of /products/creatina-creapure with UA `OAI-SearchBot/1.0` and `Claude-SearchBot/1.0` (saved in $S/geo-live/*.hdr, *.html). Homepage HEAD for Link/License headers; /rsl.xml; /llms.txt headers. Earlier UA tests from the context file (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot = 200) re-used, not repeated.
- llms.txt / llms-full.txt / agents.md: $R/llms.txt (4414 B), $R/agents.md (4371 B), $R/pages/llms-full.txt (4419 B), $R/ucp.json.
- Passage citability: extracted main-content text of $R/pages/product-creatina-creapure.html and $R/pages/collection-creatina.html (parsed JSON in $R/parsed/pages_*.json); 5 article bodies from $R/shopify/articles-bodies/: creatine-monohydrate-cand-sa-iei-creatina-dimineata, best-creatine-monohydrate-dozaj-optim-creatina-rezultate-2026, creatine-kinase-creatina-creapure-bioavailability-why-absorption, proteina-cum-alegi-pudra-proteica-calitate, bcaa-vs-eaa-diferențe-și-beneficii-pentru-culturisti-ghid-complet (the live /blogs/news article sample). Blog-wide shape statistics computed over all 355 bodies and $R/shopify/articles-all.json (dates, link targets, JSON-LD types, author strings).
- Entity clarity: $R/theme/snippets__schema-organization.liquid, snippets__schema-article.liquid, snippets__faq-schema-creatina.liquid, $R/jsonld/*.jsonld, embedded JSON-LD inside article bodies ($R/pages/article-2026-citicolina.html), footer social links in $R/home.html, $R/pages/page-despre-noi.html, brand-string counts across pages/theme/bodies.
- Brand mentions: YouTube results page for "prime supplements" romania (parsed ytInitialData), ro.wikipedia REST for Marius_Chera. Plugin scorer content_quality.py run on one article and on the Creapure description.
Could not check: Wikidata/en.wikipedia (Wikimedia API 429 "too many requests" on the shared proxy IP, 2 attempts), Reddit (search.json 403), Trustpilot (403 "Verifying Connection"), Instagram/Facebook/LinkedIn handle validity (bot-walled), live SERP/AI Overview presence for Romanian queries (no WebSearch / DataForSEO), Bing index / IndexNow status (no Bing Webmaster), Search Console "Search generative AI" setting (no GSC access).

## Score

**50 / 100** (GEO readiness heuristic; dimension breakdown: Citability 40, Structural readability 60, Multi-modal 50, Authority & brand 38, Technical accessibility 75; weights 25/20/15/20/20).
Rationale: technically everything is server-rendered and every search-citability crawler gets 200, and the blog has answer-first bullets, question headings, tables and FAQ blocks; but the content that AI systems would quote is undermined by decorative "sources" (every ncbi/WHO/Mayo/Healthline link points to a homepage), fabricated freshness lines, a split/contradictory brand and author entity, and money pages (collections) that contain no quotable sentence at all.

## What works

- Server-side rendered HTML: the full product copy ("Ce Este Creatina Creapure?" block) is present in the raw response served to `OAI-SearchBot` and `Claude-SearchBot` (both HTTP 200, text/html, $S/geo-live/OAI-SearchBot.html, Claude-SearchBot.html); no JS dependency for main content.
- robots.txt allows every AI crawler (no bot-specific rules); Googlebot eligibility floor is met (indexable, no nosnippet/max-snippet restrictions seen in parsed meta_robots).
- Blog structure is already AI-friendly in shape: 350/355 bodies have >=3 question-style lines, 347 have a table, 354 have lists, 311 have a visible "Întrebări frecvente" section, 321 open with a "Key Takeaways" bullet block (answer-first pattern).
- Author byline with a credential is displayed on 335/354 articles (theme `show_author: true`, `show_date: true` in templates__article.json) and a Person JSON-LD with a LinkedIn URL is embedded in 344 articles.
- The brand has a real YouTube channel (@primesupplementsro) with 13 of the first 20 results for "prime supplements" romania being its own videos (Marius Chera, Cosmin Bostan, Vlad Cozma, Prime Podcast episodes). YouTube mentions are the strongest third-party correlate of AI citations (Ahrefs, 2025-12-12, r~0.737).
- Homepage FAQPage (5 order/returns questions) is visible on the page (5/5 questions found outside <script>), so that block is at least honest markup.
- Shopify's agent layer (UCP discovery, MCP endpoint, Link rel="ucp", `rel="buy"` cart links) is live, which covers agentic commerce even though it is not a citation lever.

## Findings

### GEO-01 — Every "source" link in the blog points to a homepage, so 338 articles claim studies they never cite
- Severity: High
- Evidence: $R/shopify/articles-all.json `external_link_targets`: ncbi.nlm.nih.gov 326 links, all exactly `https://www.ncbi.nlm.nih.gov` (0 PubMed/PMC IDs); healthline.com 276, mayoclinic.org 257, who.int 235, fda.gov 67, webmd.com 66, wikipedia.org 20: 100% homepage-only (path length <= 1). Body scan of 355 files: only 12 contain a primary-study identifier (PubMed/PMID/PMC/doi.org/"et al."), while `mentions_studies_or_sources` is true for 338 and 275 bodies attribute claims to "conform Healthline" / "Potrivit studiilor citate de Healthline". Example passage (creatine-kinase-creatina-creapure-bioavailability-why-absorption.txt): "Deși creatina este unul dintre cele mai studiate suplimente conform Healthline, ..." with the link going to healthline.com root.
- Affected scope: 338/354 published articles (the whole BlogGenAuto corpus); every YMYL health claim on the site.
- Recommendation: Replace homepage links with the actual primary source for each claim (PubMed/PMC URL with PMID, or the EFSA/ANSVSA page for authorised claims), e.g. creatine dosing -> Kreider RB et al., ISSN position stand, J Int Soc Sports Nutr 2017;14:18 (PMC5469049); creatine timing -> Antonio J, Ciccone V, JISSN 2013;10:36 (PMC3750511). Add the citation inline next to the number it supports ("3–5 g/zi (Kreider et al., 2017)"), and strip unsupported links rather than keep decorative ones. Do this first for the 25 creatina/proteina articles that carry most product links, then batch the rest via the Admin API (`articleUpdate`) with a reviewed source table.
- Falsifiability: after the fix, `grep -c 'ncbi.nlm.nih.gov/pmc\|pubmed.ncbi' ` over article bodies should be > 0 for every article that mentions "studii"; a sample of 20 AI answers (ChatGPT/Perplexity/AI Mode) for the article topics should quote primesupplements.ro with the specific figure.
- Leading indicator: number of articles whose outbound links resolve to a document with the cited claim (target: 100% of articles mentioning "studiu").
- Effort: L. Confidence: 0.95

### GEO-02 — Freshness signals are fabricated: hard-coded "Published:" lines disagree with Shopify dates, "Updated" always equals "Published", and 267/354 articles are older than 90 days
- Severity: High
- Evidence: 348/354 bodies begin with an English literal "Published: <Month D, YYYY> | Updated: <same date>" (first sentence in 348; `body_starts_with_published` 351). Comparing that date with Shopify `publishedAt`: 315 mismatch (219 are 1 day earlier, 52 are 7 days earlier, 44 are 30 days earlier). "Updated" equals "Published" in 348/348. Shopify `updatedAt` date differs from `publishedAt` in only 29 articles (no refresh program). Age at 2026-10-12: 87 articles <= 90 days, 219 at 91–180 days, 48 > 180 days. 279/355 titles contain "2025"/"2026" and 352 bodies say "în 2026" although content is generic. Two Article JSON-LD blocks per page carry different dates/authors: BlogGenAI block `datePublished 2026-04-14T02:20:02.026Z` author Person "Marius Chera , Nutriționist Certificat"; theme block (snippets__schema-article.liquid) `2026-04-14T05:20:02+0300` author Organization "Prime Supplements" (verified in $R/pages/article-2026-citicolina.html, 6 ld+json blocks).
- Affected scope: 348 articles (visible text) + 344 (duplicate Article schema).
- Recommendation: (1) Strip the "Published/Updated/By/Share Post" text lines from article bodies (regex on the first <p>/<div> emitted by BlogGenAuto) and let the Impact theme's article-banner render `article.published_at` and the real author; (2) emit ONE Article JSON-LD: keep the theme snippet but set `"author": {"@type":"Person","@id":"https://primesupplements.ro/pages/marius-chera#person"}` and `"dateModified": article.updated_at`, and stop BlogGenAuto from injecting JSON-LD (app setting or post-process); (3) start a real refresh cycle: re-edit the 30 highest-linked creatina/proteina articles each quarter with new data and a visible "Actualizat la" date tied to `updated_at`; (4) remove year-baiting from titles where the content is evergreen (Google's helpful-content guide lists "faking publication-date freshness" as a warning sign).
- Falsifiability: `article.published_at` and the visible date differ on 0 articles; Rich Results / Schema validator shows one Article per URL; share of articles with updated_at > published_at + 30 days rises above 30%.
- Leading indicator: count of articles whose `updatedAt` is within the last 90 days.
- Effort: M. Confidence: 0.95

### GEO-03 — 22 of 23 collection pages have zero descriptive text, so the category "money pages" have nothing an AI system can quote
- Severity: High
- Evidence: /collections/creatina ($R/pages/collection-creatina.html): H1 "Creatina", then filter/sort UI, 3 product cards, "Alte categorii", "Ghiduri și sfaturi utile"; extracted main text has 0 sentences; parsed `word_count` 560 is entirely chrome/footer. CollectionPage JSON-LD `"description": ""` (snippets__schema-collection.liquid). Context file: all 23 collections have empty descriptions except "Bauturi" ("Bauturi Sport"). Title tag "Creatina monohidrat pentru forță și performanță" and meta "Alege creatina ideală..." promise a guide that the page does not contain.
- Affected scope: 22 collections x2 (/ro-hu/ duplicates) = 44 URLs; the pages that should answer "ce creatină să aleg", "cea mai bună proteină" etc.
- Recommendation: Add a 120–180-word answer-first description to each collection (Shopify Admin > Collection > Description, or a metafield rendered above the grid in sections/main-collection.liquid with `collection.description`), opening with a definitional sentence and the concrete differences between the products, plus a 3–5 row comparison table (product, form, serving, price per serving). Worked example for /collections/creatina (ready to paste, prices from the live page):

  > **Creatina monohidrat** este cel mai studiat supliment pentru forță și masă musculară: poziția oficială a International Society of Sports Nutrition (Kreider et al., 2017, J Int Soc Sports Nutr 14:18) arată că 3–5 g pe zi cresc rezervele de fosfocreatină din mușchi și performanța în eforturi scurte și intense, fără efecte adverse la persoane sănătoase. Prime Supplements are trei produse cu creatină: **Creatine (Creapure®)** 500 g/100 porții sau 300 g/60 porții (de la 100 lei), creatină monohidrat produsă în Germania de AlzChem și ambalată în UE, cu puritate verificată lot cu lot; **Creatine Monohydrate** micronizată 300 g/60 porții (93 lei), aceeași moleculă, la cel mai mic preț pe porție; și **Creatine Ready To Go**, plicuri efervescente cu o doză per plic (de la 4,40 lei/plic) pentru deplasări. Cum alegi: Creapure® dacă vrei trasabilitate maximă, varianta micronizată pentru cel mai bun raport preț/porție, plicurile dacă uiți doza acasă. Doza este aceeași pentru toate: 3–5 g zilnic, cu o masă, fără pauze.

  Then a table (Produs | Formă | Porții | Preț/porție | Pentru cine) and 3 question H2s ("Creapure sau creatină monohidrat obișnuită?", "Câtă creatină pe zi?", "Când se ia?") each answered in the first 40 words with the study cited.
- Falsifiability: collection pages' extracted main text > 120 words with at least one "X este..." sentence; CollectionPage.description non-empty; AI answers for "cea mai bună creatină" cite /collections/creatina rather than an article.
- Leading indicator: number of collections with description >= 100 words (target 23/23).
- Effort: M. Confidence: 0.95

### GEO-04 — Product pages (Creapure sample) bury the definition 1,100 words down, duplicate the copy twice, use an English H1 and make unauthorised health claims with no source
- Severity: Medium
- Evidence: $R/pages/product-creatina-creapure.html: H1 "Creatine (Creapure®)" (English) while title is "Creatina Creapure - Supliment pentru Performanță Fizică"; the first content block is 10 "Beneficii cheie" bullets rendered twice (accordion + tab copy: plugin content_quality.py repetition_score 40, flag "repetitive", 1,239 tokens / 400 unique); claims include "Efecte neuroprotectori ... tratarea bolilor neurodegenerative", "Echilibrarea nivelului de zahăr din sânge ... sensibilității la insulină", "Sprijin pentru sănătatea creierului", each introduced by "Există dovezi" / "Unele studii sugerează" with no citation. The only definitional sentence ("Creatina Creapure este o formă purificată de creatină monohidrat...") sits under H2 "Ce Este Creatina Creapure?" after the reviews/recommendations widgets (~1,100 words into the page). Dosage ("3-5 grame pe zi") is in the last-but-one section. No datePublished/dateModified, no author, no "Produs în UE"/lot/certificate evidence beyond a badge. Brand name alternates "PRIME Supplements" (4) and "Prime Supplements" (16) on the same page.
- Affected scope: 85 supplement products (same main-product.liquid layout); 3 creatina products carry the same pattern.
- Recommendation: (1) Move a 60–80-word answer block directly under the price: "Creatine (Creapure®) este creatină monohidrat micronizată produsă de AlzChem (Germania), cu puritate certificată conform specificației Creapure®; 500 g = 100 porții de 5 g; doza: 3–5 g/zi cu o masă; produs în UE." (2) Replace EU-non-compliant disease claims (neurodegenerative, blood sugar) with the EFSA-authorised wording ("Creatina crește performanța fizică în cazul exercițiilor repetate, de intensitate mare și scurtă durată", Reg. (EU) 432/2012) and cite it; keep cognitive claims only with a study link. (3) Render the description once (choose accordion OR tabs in product-info.liquid). (4) Romanian H1 via product title ("Creatină Creapure® 500 g") with the English name as alternate text. (5) Add a visible, dated "Verificat de Marius Chera, nutriționist sportiv" line linked to the author page (GEO-06).
- Falsifiability: product main text has a "X este ..." sentence within the first 80 words; repetition_score < 15; no disease-claim phrases ("tratarea bolilor", "zahăr din sânge") remain on supplement pages.
- Leading indicator: share of supplement product pages with an answer block above the fold (target 85/85).
- Effort: M. Confidence: 0.85

### GEO-05 — The Organization entity is split: schema sameAs handles differ from the footer's, YouTube is missing, and the brand is written 6 different ways
- Severity: High
- Evidence: snippets__schema-organization.liquid sameAs = facebook.com/primesupplements.ro, instagram.com/primesupplements.ro, tiktok.com/@primesupplements. Footer/social links actually present in $R/home.html = facebook.com/primesupplementsro, instagram.com/primesupplements_ro/, tiktok.com/@primesupplements.ro, youtube.com/@primesupplementsro: 3 of 3 sameAs handles differ from the clickable ones, and the YouTube channel (verified live: channel "Prime Supplements" @primesupplementsro with Marius Chera videos and "Prime Podcast") is absent from sameAs. No `legalName` ("PRIME SPORT SUPPLEMENTS SRL", CUI 46260823), no `address`, no `telephone` (contactPoint has none), no `founder`, no `vatID`; `availableLanguage` lists "Hungarian" although the hu locale is unpublished; description has no diacritics. Name variants per page: home.html "Prime Supplements" 13, "PRIME SUPPLEMENTS" 1, "PRIME SPORT SUPPLEMENTS" 1, "primesupplements1" 19, "Prime Health" 3; despre-noi "PRIME SUPPLEMENTS" 3 + "PRIME Supplements" 1 + "Prime Supplements" 9; article bodies: "Prime Supplements" 180 files, "PRIME SUPPLEMENTS" 4, "Prime Health" 10. Tagline "Hardcore Sports Nutrition" (English) is the homepage title. No Wikidata/Wikipedia entity (ro.wikipedia Marius_Chera 404; brand lookup rate-limited).
- Affected scope: site-wide (Organization block is in <head> of every page, 1,151 URLs).
- Recommendation: Rewrite snippets/schema-organization.liquid (one entity, consistent with footer and Contact page):
```liquid
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": ["Organization","OnlineStore"],
  "@id": "https://primesupplements.ro/#organization",
  "name": "Prime Supplements",
  "legalName": "PRIME SPORT SUPPLEMENTS SRL",
  "alternateName": ["PRIME Supplements","Prime Sport Supplements"],
  "url": "https://primesupplements.ro/",
  "logo": {"@type":"ImageObject","url":"https://primesupplements.ro/cdn/shop/files/logo-prime-supplements.png","width":300,"height":100},
  "description": "Brand românesc de suplimente sportive (creatină, proteine, aminoacizi, pre-workout) și îmbrăcăminte MNX, fondat în 2020 la Sibiu de Marius Chera.",
  "foundingDate": "2020",
  "founder": {"@id": "https://primesupplements.ro/pages/marius-chera#person"},
  "address": {"@type":"PostalAddress","streetAddress":"Str. Ioan Virgil Ispas Nr. 17A","addressLocality":"Cisnădie","addressRegion":"Sibiu","addressCountry":"RO"},
  "telephone": "+40775286584",
  "email": "contact@primesupplements.ro",
  "vatID": "RO46260823",
  "contactPoint": {"@type":"ContactPoint","contactType":"customer service","telephone":"+40775286584","email":"contact@primesupplements.ro","availableLanguage":["ro"]},
  "sameAs": [
    "https://www.youtube.com/@primesupplementsro",
    "https://www.facebook.com/primesupplementsro",
    "https://www.instagram.com/primesupplements_ro/",
    "https://www.tiktok.com/@primesupplements.ro"
  ]
}
</script>
```
  Verify each handle in a browser before shipping (the footer set is the one customers click, so it is the likelier correct set) and use the same spelling "Prime Supplements" in copy, titles and product brand; retire "Prime Health" unless it is a real sub-brand (then give it its own Brand entity). Apply for a Wikidata item (legal entity + founder) once the author page exists.
- Falsifiability: Rich Results/Schema validator shows one Organization with sameAs == footer links; `grep -c "primesupplements.ro\b" sameAs` 0 mismatches; Google's Knowledge Panel/AI Mode answers for "Prime Supplements" show the Sibiu company, not an unrelated "Prime" brand.
- Leading indicator: brand-name variant count across pages (target: 1 marketing name + 1 legal name).
- Effort: S. Confidence: 0.9

### GEO-06 — The author entity "Marius Chera" has four identities, no author page, contradictory credentials and a Person schema with only a LinkedIn URL
- Severity: High
- Evidence: Shopify author strings: "Marius Chera , Nutriționist Certificat" 325 (comma-space artifact rendered verbatim: "By: Marius Chera , Nutriționist Certificat"), "primesupplements1" 17, "Marius Chera" 10, "Sorin Cristea" 2. No author page exists (sitemap pages: contact, politica-*, inregistrare-b2b, despre-noi, thank-you, creatina-custom); despre-noi mentions "Marius" once, home 0, contact 0; no LinkedIn link on despre-noi. Embedded Person JSON-LD (344 articles): `jobTitle "Expert Nutriție Sportivă & Biohacking"`, `url` LinkedIn only, no `sameAs`, no `knowsAbout`, no `affiliation`, no `hasCredential`; bio boilerplate repeated in 345 articles with contradictions: "8 NPC PRO Cards" (325) vs "10 NPC PRO Cards" (8+), "18 ani de experiență" vs "15 ani" (context file), "medaliat internațional" vs "multiplu medaliat". The credential "Nutriționist Certificat" names no certifying body. Theme Article schema says the author is the Organization (snippets__schema-article.liquid lines 14-18), contradicting the Person in the body. ro.wikipedia has no article (REST 404).
- Affected scope: 354 articles (YMYL "Who" test), every product page that could carry an expert review.
- Recommendation: (1) Create /pages/marius-chera (About the author) with photo, verifiable credentials (which certification, FRCF lecturer role, competition record), links to YouTube channel videos, LinkedIn, press; mark it up with Person (`@id` .../pages/marius-chera#person, `sameAs` [LinkedIn, YouTube, Instagram], `hasCredential`, `worksFor` the Organization @id, `knowsAbout` ["creatină","nutriție sportivă","culturism"]). (2) Normalise the Shopify author field to "Marius Chera" on the 325+17+10 articles (Admin API `articleUpdate`, `author.name`), and show the credential in the theme byline instead of in the name string. (3) Replace the 345 boilerplate bios with a short 2-line bio pulled from the page (one source of truth) and link "Despre autor". (4) In snippets__schema-article.liquid set author to the Person @id (see GEO-02). (5) "Sorin Cristea" and "primesupplements1" articles: attribute to the real author or to the Organization explicitly.
- Falsifiability: `author` distinct values on published articles == 1 or 2 real names; /pages/marius-chera returns 200 with Person schema; Article.author.@id resolves to it.
- Leading indicator: number of articles whose Article.author is a Person with an on-site profile URL (target 354).
- Effort: M. Confidence: 0.9

### GEO-07 — The first passage of most articles is boilerplate or a price widget, not the answer
- Severity: Medium
- Evidence: 348 bodies start with "Published: ... | Updated: ... By: ... Share Post" (English UI strings: "Share Post" 349, "Key Takeaways" 321, "Table of Contents" 37) before any Romanian sentence; 120/355 bodies contain a product card ("În limita stocului disponibil", "Cumpără Acum", "Vezi Produsul →") inside the first 200 words (e.g. creatine-monohydrate-cand-sa-iei-creatina-dimineata: after the ToC the first paragraph is interrupted by "Creatine Ready To Go 110.00 lei ⚡ În limita stocului disponibil"). The first paragraph of the sampled top article is a throat-clearer ("Dilema momentului optim ... a fost subiectul multor dezbateri ... cercetările recente din 2025 și 2026 au adus claritate") that answers nothing. ~44% of AI citations come from the first 30% of a page (SE Ranking), so the extractable opening matters most.
- Affected scope: 348 articles (boilerplate opening), 120 (price widget in opening).
- Recommendation: Drop the literal date/share lines (theme renders them), rename "Key Takeaways" to "Pe scurt" and keep it as the first block, move the first product card below the second H2, and rewrite the intro paragraph to answer the title question in the first 40–60 words. Worked example for "Dimineața vs Seara: Când să iei creatină pentru rezultate" (replace the current first paragraph):

  > **Pe scurt:** creatina funcționează prin saturarea rezervelor din mușchi, nu prin ora la care o iei; 3–5 g luate zilnic, la aceeași oră, dau aceleași rezultate dimineața sau seara. Singura diferență măsurată este mică și ține de antrenament: în studiul lui Antonio și Ciccone (J Int Soc Sports Nutr 2013;10:36), 19 culturiști care au luat 5 g imediat după antrenament au câștigat ceva mai multă masă slabă decât cei care au luat-o înainte. Regula practică: dacă te antrenezi dimineața, ia creatina după antrenament, cu micul dejun; dacă te antrenezi seara, ia-o la cină, cu carbohidrați. În zilele libere, oricând, cu o masă. Mai jos găsești ce spun studiile, ce faci în primele 30 de zile și cum eviți disconfortul gastric.

  Then keep the existing H2s but make each one a question answered in its first sentence.
- Falsifiability: first 60 words of each article body contain no "Published"/"Share" tokens and at least one declarative sentence with a number; product widgets appear only after word 300.
- Leading indicator: share of articles whose first 200 words contain "În limita stocului" (target 0).
- Effort: M. Confidence: 0.9

### GEO-08 — Hidden FAQPage markup on the creatina products: 8 Q&As exist only in JSON-LD, not on the page
- Severity: Medium
- Evidence: snippets__faq-schema-creatina.liquid emits FAQPage with 8 questions ("Ce este creatina monohidrata?", "Creatina monohidrata cauzeaza caderea parului?", "Trebuie sa fac pauze de la creatina monohidrata?" ...) on 3 creatina products; in $R/pages/product-creatina-creapure.html the strings "caderea parului" and "Trebuie sa fac pauze" occur 2 and 1 times inside <script> and 0 times outside it. Questions/answers are written without diacritics. FAQ rich results were retired (May 2026), so the only effect left is a structured-data guideline violation (markup for content not visible).
- Affected scope: 3 products (x2 with /ro-hu/).
- Recommendation: Render the same 8 Q&As as a visible "Întrebări frecvente despre creatină" accordion in main-product.liquid (with diacritics, each answer 40–70 words, dosage from the ISSN stand, hair-loss answer citing the 2009 van der Merwe study and the 2021 Antonio et al. review that found no causal evidence), then either keep the FAQPage block (now honest) or drop it; the visible Q&As become citable passages for queries like "creatina cade parul".
- Falsifiability: each FAQ question string appears >= 1 time outside <script> on the product page.
- Leading indicator: visible FAQ blocks on supplement products (target: all 85, product-type aware).
- Effort: S. Confidence: 0.9

### GEO-09 — Unattributed statistics in the answer blocks ("până la 60%", "99.99%", "82% standardul de aur")
- Severity: Medium
- Evidence: Key Takeaways bullets: "Consumul de creatine monohydrate alături de carbohidrați și proteine îmbunătățește rata de absorbție cu până la 60%" (cand-sa-iei-creatina-dimineata), "O concentrație de 82% proteine reprezintă standardul de aur ... în 2026" and "o proteina whey ieftină poate avea o puritate de doar 60-70%" (proteina-cum-alegi-pudra-proteica-calitate), "puritate de 99.99%" / "Variabilă (adesea <98%)" table (creatine-kinase-...-why-absorption), "Da (250% VNR)". None has a source next to it; the 60% figure looks like a garbled version of Green et al. 1996 (Am J Physiol; about 60% greater muscle creatine accumulation when 5 g creatine was taken with ~93 g simple carbohydrate four times a day), a different claim, and the article links no source. AI systems prefer stats with attribution; unverifiable numbers on YMYL pages are a low-trust signal.
- Affected scope: the 321 articles with Key Takeaways (pattern-wide), at least 4 of 5 sampled.
- Recommendation: For every number in a "Pe scurt" block add the source in brackets (author, year, journal) or convert it to a qualitative statement; replace invented thresholds ("82% standardul de aur") with the product's own label data ("Prime Whey: 82 g proteină/100 g, conform etichetei").
- Falsifiability: a random sample of 20 Key Takeaways numbers can each be traced to a linked document.
- Leading indicator: % of numeric claims with an adjacent citation (target > 90%).
- Effort: M. Confidence: 0.85

### GEO-10 — Auto-generated clinical FAQ questions push a supplement shop into medical territory AI systems will not cite it for
- Severity: Medium
- Evidence: FAQ lines in creatine-kinase-creatina-creapure-bioavailability-why-absorption.txt: "Cât de ridicate sunt nivelurile de CK în distrofia musculară?", "Ce analize indică pierderea masei musculare?", "Care sunt nivelurile normale de CK pentru femei în funcție de vârstă?"; mixed-language "Este creatina 100% safe?" (best-creatine-monohydrate-dozaj-optim...); article titles like "Cum Combat PRO 2.0 Transformă Pre-Antrenamentele în Sesiuni de Pierdere a Grăsimii și Creștere a Puterii Mentale". These are generated from keyword lists (the creatine-kinase topic is a lab test, not a supplement) and answered without medical authorship.
- Affected scope: at least the 8 "creatine-kinase"/"creatine side effects" articles; pattern present in 311 FAQ sections.
- Recommendation: Prune FAQ items that answer diagnostic/lab questions; keep questions a sports-nutrition coach can legitimately answer (dosage, timing, stacking, side effects with sources) and add the consult-a-doctor line where relevant. Retire or 410 the creatine-kinase lab-test articles and redirect to the creatina guide.
- Falsifiability: no FAQ question on the blog contains "distrofia", "analize", "niveluri normale" without a cited clinical source and medical reviewer.
- Leading indicator: number of FAQ questions outside sports-nutrition scope (target 0).
- Effort: S. Confidence: 0.8

### GEO-11 — AI-generation footprint with no "How" disclosure: BlogGenAI markers, 194 "Powered by BlogGenAuto" links, "Scaled by KEMO"
- Severity: Medium
- Evidence: 347/355 bodies contain a "BlogGenAI" HTML comment; 194 carry a visible dofollow "Powered by BlogGenAuto" link to bloggenauto.com (194 external links); 351 use inline styles; publishing bursts of up to 10 articles/day (2026-05: 127 articles). Footer of every page: "© 2026, Prime Supplements. Scaled by KEMO". No statement anywhere on how articles are produced or reviewed. Google's helpful-content guidance asks for "How" disclosure where readers would ask, and its spam policy covers scaled content abuse; third-party answer engines rank unreviewed mass content lower.
- Affected scope: 347 articles + site footer.
- Recommendation: Remove the "Powered by BlogGenAuto" links (bulk regex on body_html), delete the HTML markers, and add a one-line editorial policy on the author page and the blog index ("Articolele sunt redactate cu asistență AI și verificate de Marius Chera, nutriționist sportiv; ultima verificare: <date>"), with the reviewer date bound to `updated_at`.
- Falsifiability: `grep -l BlogGenAuto articles-bodies/*.txt | wc -l` = 0; blog index shows an editorial policy link.
- Leading indicator: articles with a visible reviewer + date (target 354).
- Effort: S. Confidence: 0.85

### GEO-12 — "primesupplements1" leaks as a brand alias into AI corpora (vendor, author, 2,582 article links)
- Severity: Medium
- Evidence: vendor "primesupplements1" on 64/185 products (shown on product pages 19–31 times each, e.g. 31 in product-creatina-creapure.html, 23 in collection-creatina.html); author "primesupplements1" on 17 articles; 2,582 in-body links to primesupplements1.myshopify.com in 349 articles (1,602 product, 534 /cart/, 446 collection). Answer engines that fetch the myshopify.com URL get a 301 to the primary domain, but the entity name "primesupplements1" is now text on ~every page.
- Affected scope: 185 products, 349 articles.
- Recommendation: Set vendor = "Prime Supplements" (supplements) or "MNX" (apparel) via bulk edit; set author to "Marius Chera"; rewrite the myshopify links to relative primary-domain URLs (Admin API body_html replace `https://primesupplements1.myshopify.com` -> `https://primesupplements.ro`, drop the /cart/ add links).
- Falsifiability: `grep -c primesupplements1` on any rendered page = 0.
- Leading indicator: pages containing the string "primesupplements1" (target 0).
- Effort: S. Confidence: 0.95

### GEO-13 — The /ro-hu/ mirror doubles every citable URL and splits citation signals
- Severity: Medium
- Evidence: 575 URLs duplicated under /ro-hu/ (1,151 sitemap URLs), identical Romanian text, RON prices, each self-canonical with hreflang ro / ro-HU / x-default (context file; verified for the homepage pair in $R/parsed/pages_homepage-ro-hu.json). AI retrieval (query fan-out, Perplexity/ChatGPT fetchers) treats /ro-hu/products/creatina-creapure as a distinct document competing with /products/creatina-creapure.
- Affected scope: 575 URL pairs.
- Recommendation: Owned by TECH (disable the Hungary web presence subfolder or canonicalise /ro-hu/ to the root until the hu locale is published). From the GEO side: never link /ro-hu/ URLs from articles, and keep sameAs/Organization `url` on the root.
- Falsifiability: AI answers and Perplexity citations only ever show root URLs.
- Leading indicator: /ro-hu/ URLs in sitemap (target 0 while hu is unpublished).
- Effort: S. Confidence: 0.85

### GEO-14 — Bot-protection challenge (HTTP 429 "Verifying your connection...") can hit user-triggered AI fetchers at answer time
- Severity: Medium
- Evidence: Context file: the store answers 429 with a page titled "Verifying your connection..." after request bursts; Bytespider gets 429 by default. User-triggered fetchers (ChatGPT-User, Perplexity-User, Claude-User, Google-Agent) fetch a page at the moment a user asks; a challenge page means the citation is dropped for that answer. Search crawlers verified fine today (OAI-SearchBot and Claude-SearchBot 200 on a single throttled request).
- Affected scope: all pages, intermittent.
- Recommendation: In Shopify Admin > Settings > (Cloudflare/bot protection) and in Cloudflare if a custom WAF is in front, ensure "verified bots" (Cloudflare's list includes OAI-SearchBot, ChatGPT-User, PerplexityBot, Perplexity-User, ClaudeBot, Claude-User, Google-Agent) are exempt from the JS challenge; monitor 429 counts by UA in Shopify's bot-traffic report.
- Falsifiability: 20 consecutive fetches with UA "Perplexity-User" 2 s apart never return 429.
- Leading indicator: weekly 429 count for AI UAs (target ~0).
- Effort: S. Confidence: 0.55

### GEO-15 — Topic cannibalisation: 47 keyword groups / 164 articles and 42 regenerated "-2..-5" handles give AI retrieval many weak passages instead of one strong answer
- Severity: Low
- Evidence: catalog-analysis.md "Primary-keyword groups": "de ce strategia" 9 articles, "cum sa stii" 8, "protocolul complet de" 8, "6 semne ca" 8, "dozajul optim de" 7; 4 "glutamina-si-sanatatea-stomacului-*" articles; 42 handles end in -2/-3/-4/-5; 719 title pairs with similarity > 0.6; creatina timing alone has "cand-sa-iei-creatina-dimineata", "momentul optim pentru", "morning-vs-evening" variants.
- Affected scope: 164 articles.
- Recommendation: For each of the top 15 commercial questions (creatină dozaj, creatină timing, creatină efecte secundare, proteină alegere, BCAA vs EAA, glutamină, L-carnitină, arzătoare) keep one canonical guide, 301 the regenerated duplicates to it, and link the guide from the matching collection description (GEO-03).
- Falsifiability: for each question, only one primesupplements.ro URL appears in AI Mode/Perplexity citations.
- Leading indicator: number of -2..-5 handles still live (target 0).
- Effort: L. Confidence: 0.8

### GEO-16 — llms.txt, llms-full.txt and agents.md are Shopify's generic agent-instructions file, not a content index (Info: Google ignores llms.txt)
- Severity: Info
- Evidence: $R/llms.txt (4,414 B), $R/agents.md (4,371 B) and $R/pages/llms-full.txt (4,419 B) are the same "Agent Instructions — Prime Supplements" markdown (differences are one mirror sentence); content: shop.app/SKILL.md promotion, UCP endpoints, generic `/products/{handle}.json` routes, two policy links; zero product, category or article entries; the text includes "openclaw-like manner". Live headers: HTTP 200, `content-type: text/markdown`. Per Google's AI optimization guide (2026-06-15 note) llms.txt "will neither harm nor help" Google Search; no major answer engine has confirmed consuming it (SE Ranking 2025: 1 of top-50 AI-cited domains had one; OtterlyAI: 0.1% of AI-bot hits).
- Affected scope: 3 files.
- Recommendation: No citation value to chase. If Shopify's agent settings allow customising the agent instructions, add a short "Key facts" section (brand, legal name, Sibiu, founder, 3 category URLs, author page, editorial policy) for non-Google agents; otherwise leave it. Do not spend effort on a hand-made llms.txt.
- Falsifiability: n/a (presence-only check).
- Leading indicator: none; report presence only.
- Effort: S. Confidence: 0.95

### GEO-17 — No machine-readable licensing/usage signals (no RSL, no Content-Signal, no License Link header)
- Severity: Info
- Evidence: /rsl.xml -> 404 (application/xml); homepage headers contain Link rel=preconnect/preload/ucp only; no `License`/`Content-Signal` headers; robots.txt has no AI directives. With 354 articles and YMYL content, the site has no stated terms for AI training vs. search use.
- Affected scope: site-wide.
- Recommendation: Optional, licensing preference not visibility: if the owner wants to allow search citation but not training, add `User-agent: GPTBot`, `ClaudeBot`, `CCBot`, `Google-Extended`, `Applebot-Extended` Disallow rules via Shopify's robots.txt.liquid template while keeping OAI-SearchBot, Claude-SearchBot, PerplexityBot, Googlebot allowed; publish an RSL 1.0 file if a licensing stance is adopted. Report each bot by the capability it governs; this changes nothing for Google Search/AI Overviews.
- Falsifiability: robots.txt lines per bot match the chosen policy.
- Leading indicator: n/a.
- Effort: S. Confidence: 0.9

### GEO-18 — Platform readiness (not measured; qualitative)
- Severity: Info
- Evidence/assessment per platform:
  - Google AI Overviews / AI Mode (Romanian, available in Romania since Google's 2025 language expansion): eligibility floor met (indexable, snippets allowed, Googlebot 200); the Search Console "Search generative AI" control (default include) could not be verified (no GSC access). AIO is ranking-correlated, so the site's classic weaknesses (no collection text, cannibalised articles, split entity) cap it; AI Mode weights freshness/entity authority, where GEO-02/05/06 hurt most. For YMYL supplement queries Google shows AI Overviews with health disclaimers and favours medical/institutional sources (ncbi, who, healthline are exactly the domains this blog links to but never cites specifically), so a shop is cited mainly for product facts (price, form, serving, certification) and expert-reviewed dosage guidance, not for clinical claims.
  - ChatGPT (search): OAI-SearchBot 200 verified; top cited sources are Wikipedia/Reddit-heavy (Profound 2025-06-05); brand has no Wikipedia/Wikidata entity and Reddit presence could not be checked (403).
  - Perplexity: PerplexityBot 200 (context); Reddit/community validation unknown; the /ro-hu/ mirror and myshopify links risk odd citations.
  - Bing Copilot: Bing indexation and IndexNow not verifiable (Shopify has no native IndexNow; use Bing Webmaster Tools submission).
- Recommendation: Measure after fixes: a monthly 30-query panel (Romanian: "cea mai bună creatină", "creatina creapure pareri", "cand se ia creatina", "prime supplements pareri", ...) run in AI Mode, ChatGPT, Perplexity and Copilot, logging whether primesupplements.ro is cited and which URL.
- Falsifiability: panel results over 3 months.
- Leading indicator: citation share on the panel.
- Effort: S. Confidence: 0.6

## Limitations
- No live SERP/AI-answer measurement (no WebSearch or DataForSEO AI-visibility tools in this agent); platform readiness is qualitative.
- Wikimedia (Wikidata/en.wikipedia) brand lookups returned 429 on the shared proxy; ro.wikipedia "Marius Chera" = 404 is confirmed; Reddit (403), Trustpilot (403 challenge), Instagram/Facebook/LinkedIn handle validity could not be verified, so the "correct" social handle set must be confirmed by the owner.
- content_quality.py is tuned for English AI-phrasing patterns; its 81–83 scores on Romanian text are not meaningful and were not used for scoring.
- Live store requests were limited to 5 (2 UA tests, homepage HEAD, /rsl.xml, /llms.txt HEAD); everything else is from the 2026-10-12 local evidence set.
- GEO-14 (429 challenge) is inferred from the recon notes, not reproduced against AI user agents.
