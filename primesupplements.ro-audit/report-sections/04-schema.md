## 4. Date structurate (Schema.org / JSON-LD)

**Scor specialist (la momentul auditului):** 18/100 — un singur specialist (seo-schema, pondere 10 % din scorul total): Product JSON-LD este neparsabil pe 75/185 produse (65 din cele 85 de suplimente, adică exact produsele care aduc venit), iar cele 110 blocuri care se parsează sunt neeligibile pentru merchant listings (AggregateOffer, prețuri „145,00” cu virgulă zecimală, fără price/rating/retur/livrare); articolele poartă două entități Article contradictorii (temă + BlogGenAuto) cu breadcrumb-uri pe domeniul myshopify și text placeholder; logo-ul din Organization răspunde 404 și entitatea nu are NAP; funcționează doar scheletul Organization/BreadcrumbList și blocurile FAQ, care nu mai produc niciun rich result. **Scor combinat: 18/100** (un singur specialist alimentează secțiunea).

**Scor estimat după remedierile din 12.10.2026:** 22/100 pe magazinul live — s-au corectat doar datele din Admin pe care markup-ul le citește (vendor „Prime Supplements”/„MNX”, `productType` pe 195 produse → `category` nu mai e gol, descrieri pe 17 colecții → `CollectionPage.description` nu mai e gol, 17 autori re-atribuiți din „primesupplements1” în „Marius Chera”), dar snippet-urile live emit în continuare JSON invalid, AggregateOffer cu virgulă și brand hard-codat; toate cele cinci snippet-uri JSON-LD rescrise (Product, Article, Collection, Organization + WebSite, Breadcrumb), mutarea blocului Organization după `<meta charset>` și neutralizarea JSON-LD-ului injectat în corpurile articolelor stau în tema de test nepublicată „Impact – SEO fixes 2026-10-12” (id 193875083639) — după publicare estimăm ~75/100, iar după încărcarea fișierului de logo, importul corpurilor curățate (Matrixify), eliminarea prezenței web `/ro-hu` și noindex pe B2B ~85/100.

### Ce funcționează

- JSON-LD este singurul format folosit (preferința Google): toate cele 95 de blocuri din cele 31 de copii locale declară `@context: https://schema.org` și URL-uri absolute pe domeniul principal; fără Microdata/RDFa (un singur `itemscope` incidental într-un corp de articol).
- Un nod `Organization` cu `@id` stabil (`https://primesupplements.ro/#organization`), `sameAs` și obiect `logo` este emis în `<head>` pe fiecare pagină (`layout/theme.liquid`, linia 15) — consistent pe toate cele 31 de pagini eșantionate.
- `BreadcrumbList` este prezent pe fiecare pagină de produs (16/16 valide), `CollectionPage + ItemList` pe fiecare colecție (6/6 valide), `Article` cu `mainEntityOfPage`, date ISO-8601 și imagine de 1200 px pe articole.
- `gtin` este emis ori de câte ori prima variantă are cod de bare (188/395 variante îl au); imaginile de produs sunt limitate la 5 și servite la 1000 px.
- Judge.me scrie deja metafield-urile native `reviews.rating` / `reviews.rating_count` pe produse (verificat: baton-proteic-capsuni = 4.0 / 4), deci stelele pot fi adăugate server-side fără nicio aplicație nouă.
- Snippet-ul întreținut de Shopify `{{ product | structured_data }}` (`snippets/microdata-schema.liquid`) este încă în temă, doar comentat — există un fallback cu zero mentenanță.
- Răspunsurile `FAQPage` de pe homepage sunt vizibile în pagină (secțiunea FAQ există în HTML), deci cel puțin acel bloc corespunde conținutului.

### Constatări

#### SCHEMA-01 — Product JSON-LD este sintactic invalid pe 75/185 produse (76 % din suplimente) pentru că `escape` nu codifică newline-urile

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Critical | READY (tema de test – de publicat) | S | 0.98 |

**Dovezi:** `snippets/schema-product-enhanced.liquid` construiește JSON-ul manual: `"description": "{{ product.description | strip_html | truncate: 500 | escape }}"`. Filtrul Liquid `escape` codifică doar `& < > " '` și lasă `\n`, `\r`, `\t` și `\` neatinse, deci orice descriere cu line break produce un caracter de control neescapat într-un string JSON. Erori de parsare pe copiile locale: `pages/product.html` + `pages/products/baton-proteic-capsuni.html` „Invalid control character at: line 7 column 38 (char 212)”, `product-creatina-creapure.html` (char 566), `glycerol-max-pump-500g-125-serv.html` (626), `instant-drink-frutilu-cola-10g.html` (372), `mnx-hoodie-industrial-dusty-rose.html` (216), `pure-isolate-2000g.html` (676), `turmeric-extract-80-caps.html` (218), `unt-de-migdale.html` (554). 9 din cele 17 blocuri Product din eșantion sunt neparsabile; cele 8 care se parsează sunt articole MNX cu descriere goală sau pe o singură linie. `schema_ecommerce_validate.py $R/jsonld/product-baton-1.jsonld` → `Error: invalid JSON (Invalid control character at: line 7 column 38 (char 212))`. Rejucarea lanțului exact de filtre peste catalog (`$R/shopify/products-p1..4.json`, 185 produse / 395 variante): **75/185 produse** emit JSON invalid (65 suplimente/alimente din 85, 10 MNX); 87 produse au descriere goală.

**Impact / pagini afectate:** 75 URL-uri de produs (×2 cu duplicatele `/ro-hu/` = 150 URL-uri), inclusiv toate suplimentele best-seller (creatina-creapure, pure-isolate, baton proteic, glycerol, frutilu, turmeric, unt de migdale). Google aruncă întregul bloc, deci aceste pagini nu au nicio entitate Product.

**Recomandare:** Verificare: în tema de test, `theme-fixes/snippets/schema-product-enhanced.liquid` trece fiecare valoare prin `| json` (linia 34: `"description": {{ plain_description | json }}`), iar testul offline `theme-fixes/test_render.py` (python-liquid cu stub-uri pentru filtrele Shopify) cere ca fiecare bloc `<script>` randat să se parseze ca JSON. După publicare, rulați Rich Results Test pe `/products/baton-proteic-capsuni` și `/products/creatina-creapure`; pe previzualizare folosiți tab-ul „Cod” cu sursa paginii, pentru că robots.txt blochează `/*?*preview_theme_id=*`. Patch-ul minimal al specialistului, dacă s-ar porni de la snippet-ul vechi:

```liquid
"description": {{ product.description | strip_html | strip_newlines | strip | truncate: 5000 | json }},
```

cu același tratament `| json` pentru `name`, `sku`, `gtin`, `category` și URL-urile de imagine. Nu mai rămâne nimic de făcut în afară de publicarea temei.

**Cum verificăm (falsificabilitate):** Dacă după publicare Rich Results Test raportează în continuare „Unparsable structured data” pe cele două URL-uri, sau `curl … | python -c json.loads` pe bloc tot aruncă excepție, remedierea a eșuat.

**Indicator timpuriu:** GSC Enhancements → „Product snippets” / „Merchant listings”: elementele valide trebuie să treacă de la 0 la ~185 în 2–4 săptămâni de la recrawl.

#### SCHEMA-02 — Chiar și blocurile Product care se parsează sunt neeligibile: AggregateOffer cu stringuri cu virgulă zecimală, fără Offer per variantă, fără price

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| High | READY (tema de test – de publicat) | S | 0.95 |

**Dovezi:** Snippet-ul live: `"offers": { "@type": "AggregateOffer", "lowPrice": "{{ product.price_min | money_without_currency | strip }}", "highPrice": …, "offerCount": "{{ product.variants.size }}" …}`. `money_without_currency` este formatat după locale, deci rezultatul este `"lowPrice": "8,50", "highPrice": "100,00"` (baton), `"145,00"` (tricou MNX blue), `"100,00"/"180,00"` (creapure) — virgula zecimală nu este număr pentru Google. Nu există `price`, nici `priceCurrency` per variantă, nici `priceValidUntil`, nici `availability` per variantă; `availability` este `product.available` la nivel de produs (un produs cu o variantă epuizată declară InStock pentru toate). Validatorul pe blocul MNX parsabil (`$R/jsonld/product-mnx-blue-1.jsonld`): `[High] merchant-listing-offer-type: Merchant listings require offers.@type='Offer', not 'AggregateOffer'`, `[Medium] recommended-offer-price`, `[Medium] missing-return-policy`, `[Medium] missing-shipping-details`, `[Medium] recommended-product-description`. Documentația Google pentru merchant listings cere `Offer` (AggregateOffer este acceptat doar pentru afișarea „price range” în product snippets, niciodată pentru merchant listings). 106/185 produse au mai multe variante (395 variante în total).

**Impact / pagini afectate:** 185/185 produse (cele 110 care se parsează azi pică la eligibilitate; cele 75 din SCHEMA-01 pică mai întâi la parsare).

**Recomandare:** Verificare: snippet-ul din tema de test emite câte un `Offer` pentru fiecare intrare din `product.variants`, cu `"price": {{ variant.price | divided_by: 100.0 | json }}` (linia 67; `variant.price` este în bani → `8.5`, `100.0`), `priceCurrency` (68), `priceValidUntil` (69), `itemCondition` (70), `availability` din `variant.available` (71), `sku` (73), `gtin` (76), `url` cu `?variant=` (65) și `seller` legat de `#organization` (78). Rezultatul validatorului pe varianta randată de specialist cu valori reale din Admin (`$A/findings/schema-fixes/examples/baton-proteic-capsuni.product.jsonld`: variantele 55179979030903 „Cutie 12 buc x 55g” 100.00/155.00 RON și 55179979063671 „Baton 55g” 8.50/12.50 RON, GTIN 6421766062509 / 6421766062462, Judge.me 4.0 / 4):

```
{"ok": true, "findings": [
  {"severity": "Medium", "rule": "missing-member-program", "message": "No MemberProgram or loyalty-tier pricing declared..."},   <- not applicable, the store has no loyalty programme
  {"severity": "Info",   "rule": "no-product-group", "message": "Consider ProductGroup if the product has size/colour variants..."}],
 "summary": {"critical": 0, "high": 0, "medium": 1, "info": 1}}
```

(Validatorul crapă pe array-uri `priceSpecification` — bug propriu; de aceea snippet-ul emite un singur obiect `UnitPriceSpecification`, ca în exemplul Google pentru strikethrough.) `priceCurrency` vine din `localization.country.currency.iso_code`, deci rămâne RON cât timp piața Ungaria nu are monedă proprie.

**Cum verificăm (falsificabilitate):** Rich Results Test pe orice produs trebuie să listeze „Merchant listings” ca eligibil, cu prețuri per variantă de tipul `8.5 RON` / `100 RON`; dacă afișează doar „price range” sau „Invalid number”, remedierea a eșuat.

**Indicator timpuriu:** Raportul GSC „Merchant listings” (elemente valide), apoi afișări în tab-ul Shopping pentru interogări de produs în GSC.

#### SCHEMA-03 — Lipsește aggregateRating/review din markup, deși Judge.me are rating-uri pe produse

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| High | READY (tema de test – de publicat) | S | 0.9 |

**Dovezi:** `aggregateRating` nu apare în niciuna dintre cele 17 copii HTML de produs. Judge.me este instalat ca app blocks (`templates/product.json`: `judge_me_reviews_preview_badge`, `judge_me_reviews_review_widget`) și randează doar badge-uri HTML (`<div class='jdgm-prev-badge' data-average-rating='4.00' data-number-of-reviews='4'>` pe baton; alte produse din eșantion au 4.75/44, 4.77/13, 4.79/17, 5.00/7 — 124 recenzii la nivel de magazin, `data-shop-reviews-count="124"`). Widget-ul injectează rich snippet-ul doar client-side; nu există niciun `application/ld+json` cu `jdgm` în HTML. Admin GraphQL pe produsul 14971464450423 confirmă metafield-urile native: `reviews.rating` = `{"scale_min":"1.0","scale_max":"5.0","value":"4.0"}` (tip `rating`), `reviews.rating_count` = `4` (tip `number_integer`), plus `judgeme.badge` / `judgeme.widget`.

**Impact / pagini afectate:** Toate produsele cu ≥1 recenzie Judge.me (cel puțin cele 6 valori de rating văzute în eșantion) — rich result-ul cu stele este pierdut pe fiecare dintre ele.

**Recomandare:** Verificare: snippet-ul din tema de test emite `aggregateRating` din metafield-uri (linia 52); produsele fără recenzii omit pur și simplu blocul. Logica specialistului, preluată în v2:

```liquid
{%- assign rating = product.metafields.reviews.rating.value -%}
{%- assign rating_count = product.metafields.reviews.rating_count.value | default: 0 | plus: 0 -%}
{%- if rating != blank and rating_count > 0 %}
"aggregateRating": {"@type":"AggregateRating","ratingValue": {{ rating.rating | json }},"bestRating": {{ rating.scale_max | json }},"worstRating": {{ rating.scale_min | json }},"ratingCount": {{ rating_count | json }},"reviewCount": {{ rating_count | json }}},
{%- endif %}
```

Nu activați și toggle-ul „rich snippet” JSON-LD din Judge.me (ar crea o a doua entitate Product). Opțional, mai târziu, adăugați cele 3–5 recenzii recente ca elemente `review` din metafield-ul de widget Judge.me. Calea `metafields.reviews.rating.value.rating` urmează documentația Liquid Shopify, dar nu a putut fi executată în sandbox — verificați-o pe previzualizare.

**Cum verificăm (falsificabilitate):** Rich Results Test pe `/products/baton-proteic-capsuni` arată „Review snippets: 1 valid item” cu 4.0/4; dacă `aggregateRating` lipsește sau testul semnalează „rating missing on product”, citirea metafield-ului a eșuat.

**Indicator timpuriu:** GSC Enhancements → „Review snippets” elemente valide; CTR pe interogările de produs.

#### SCHEMA-04 — BlogGenAuto injectează un al doilea graf JSON-LD contradictoriu în 347/355 corpuri de articol (breadcrumb-uri myshopify, jobTitle placeholder)

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| High | PENDING (acțiune proprietar) | M | 0.9 |

**Dovezi:** 344 corpuri conțin 4 blocuri (Article + FAQPage + BreadcrumbList + Person) și 3 mai vechi un singur `@graph` (Article + FAQPage + BreadcrumbList); doar 8 corpuri sunt curate. Pe `/blogs/news/citicolina-conexiune-musculara-rutina-antrenament-seara-travel-2026` pagina poartă **două entități `Article` cu același headline**, dar: autor `Person "Marius Chera , Nutriționist Certificat"` (corp) vs `Organization "Prime Supplements"` (temă); două descrieri diferite; `datePublished` `2026-04-14T02:20:02.026Z` vs `2026-04-14T05:20:02+0300`; ultimul element din breadcrumb-ul din corp `.../citicolina-conexiune-musculara-rutina-seara-2026` ≠ canonical `...-antrenament-seara-travel-2026` (32/347 breadcrumb-uri indică un URL care nu este al articolului). La nivel de blog: 265 blocuri din corp conțin `myshopify.com`; URL-urile `item` din breadcrumb folosesc `https://primesupplements1.myshopify.com` (532 ListItem) și `https://primesupplements1.com` (6) vs `https://primesupplements.ro` (188); publisher `primesupplements1` (3); `Person.jobTitle` are 5 valori diferite, inclusiv placeholder-ul literal **„Professional title based on niche” (26 articole)**, „Expert Nutriție Sportivă & Biohacking” (41) / „… și Biohacking” (42), „Antrenor de culturism și nutriționist sportiv” (47); `Person.name` este „Marius Chera , Nutriționist Certificat” (333) — titlu în interiorul numelui — plus o a doua grafie fără spațiu (2); niciun `@id`, niciun `sameAs` pe vreun Person (344); fișierul foto al autorului este `author-photo-primesupplements1-myshopify-com.jpg`; `relatedLink` → `https://primesupplements1.myshopify.com/blogs/news` în cele 3 vechi; 3 Article fără imagine/logo.

**Impact / pagini afectate:** 347 articole (694 URL-uri cu `/ro-hu/`), adică 98 % din blog.

**Recomandare:** Stare mixtă: paliativul este READY, remedierea durabilă este PENDING. (1) În tema de test, `sections/main-article.liquid` neutralizează blocurile la randare: `<script type="application/ld+json">` → `<script type="text/plain" data-disabled="ld+json">` (linia 112), `<script>` → `type="text/plain" data-disabled="inline"` (113), linkurile `https://primesupplements1.myshopify.com` → relative (110–111), linkul bloggenauto.com → `rel="nofollow sponsored noopener"` (114–115); după publicare, HTML-ul livrat are o singură entitate Article. (2) Rămâne pentru proprietar: corpurile curățate pentru toate cele 355 de articole sunt pregătite (`blog-cleanup/cleaned-bodies.tar.gz`, `blog-cleanup/cleanup-report.json`, `blog-cleanup/matrixify-blog-posts.csv.gz`, script `blog-cleanup/clean.py`): elimină 1.379 blocuri JSON-LD încorporate, 347 scripturi, 194 linkuri „Powered by BlogGenAuto”, 534 prețuri hard-codate, 533 linii de urgență, rescrie 2.582 linkuri myshopify, retrogradează 26 H1-uri suplimentare și normalizează caseta de autor; importul în bloc a fost blocat de politica de integrare a mediului — aplicați cu Matrixify (foaia Blog Posts: ID, Body HTML) sau cu un script Admin API de ~20 linii (`articleUpdate`, regex `<script type="application/ld+json">[\s\S]*?</script>` pe `article.body_html`). (3) Dezactivați „inject schema” în setările BlogGenAuto, altfel fiecare articol nou vine din nou cu grafuri duplicate. Secțiunile FAQ vizibile din corp pot rămâne — doar JSON-LD-ul ascuns pleacă; blocul Article al temei (SCHEMA-05) preia autorul Person cu jobTitle real și `sameAs` LinkedIn.

**Cum verificăm (falsificabilitate):** După curățare, `grep -c 'application/ld+json' article.html` trebuie să fie 2 (Organization + Article) pe fiecare articol; Rich Results Test trebuie să arate un singur Article, cu autor de tip Person.

**Indicator timpuriu:** Numărul de corpuri de articol care conțin `"@type":"Article"` (acum 347) → 0; erorile „Article” din GSC (dacă apar) dispar.

#### SCHEMA-05 — Blocul Article al temei: același bug `escape` (invalid pe ≥ 6 articole), autorul este mereu Organization, fără logo de publisher, headline neplafonat

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Medium | READY (tema de test – de publicat) | S | 0.9 |

**Dovezi:** `snippets/schema-article.liquid`: `"description": "{{ article.excerpt_or_content | strip_html | truncate: 300 | escape }}"` → JSON invalid pe `pages/article.html` (bcaa-vs-eaa, „Invalid control character at: line 6 column 19 (char 166)”) și `pages/article-thin-lcarnitine.html` (char 433). Simularea filtrului peste toate cele 355 de articole: 6 articole (cele scrise manual, fără excerpt: `bcaa-vs-eaa-…`, `cum-contribuie-l-carnitine-1000-…`, …) se rup; cele 349 cu excerpt BlogGenAuto pe o singură linie se parsează — deci „2 din 2 eșantionate” din context era un eșantion distorsionat, dar bug-ul este live pentru orice articol viitor al cărui excerpt conține un line break. Alte defecte: `"author": {"@type":"Organization","name":"Prime Supplements"}` deși `article.author` este „Marius Chera , Nutriționist Certificat”/„Marius Chera” pe 335/354 articole (semnalul E-E-A-T de autor este aruncat); `publisher` fără `logo`; `image` ca string simplu; `headline` este titlul complet (3 titluri > 110 caractere, max 134); datele folosesc `%z` → `+0300` (ISO 8601 valid, dar exemplele Google folosesc `+03:00`); fără `@id`, fără `inLanguage`, `Article` generic în loc de `BlogPosting`.

**Impact / pagini afectate:** 354 articole (blocul temei pe toate; neparsabil pe ≥ 6).

**Recomandare:** Verificare: snippet-ul din tema de test (`theme-fixes/snippets/schema-article.liquid`) trece totul prin `| json`, derivă autorul din `article.author` (split la virgulă, linia 13), emite `Person` „Marius Chera” cu `jobTitle` „Nutriționist certificat” (linia 20), `url` către `/pages/despre-noi` (60) și `sameAs` LinkedIn (58); Organization doar când autorul este gol, „primesupplements1” sau „Prime Supplements” (linia 15) — iar cele 17 articole cu autor „primesupplements1” au fost re-atribuite live lui „Marius Chera” pe 12.10.2026 (`applied/articles-plan.json`); `publisher` cu `logo` ImageObject (70), `image` ImageObject (44–45), `headline | truncate: 110` (31), offset-uri `%:z` (35–36), `inLanguage` (37), `wordCount` (38), `articleSection` (40). Tipul rămâne `Article` (nu `BlogPosting`) — ambele sunt acceptate pentru rich result-ul de articol. Exemplu randat care se parsează: `$A/findings/schema-fixes/examples/article-bcaa.example.jsonld`. Rămâne de publicat tema.

**Cum verificăm (falsificabilitate):** Rich Results Test pe `/blogs/news/bcaa-vs-eaa-…` raportează un Article cu author.name „Marius Chera”; `json.loads` pe bloc reușește.

**Indicator timpuriu:** Raportul GSC „Articles”: 0 elemente invalide; apariția rich result-ului de articol (thumbnail/dată) pentru cele 354 URL-uri (Top stories/Discover nu sunt așteptate).

#### SCHEMA-06 — Fără hasMerchantReturnPolicy / shippingDetails, iar cele două pagini de politici se contrazic la pragul de livrare gratuită

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Medium | READY (tema de test – de publicat) | S | 0.85 |

**Dovezi:** Validatorul pe fiecare Product parsabil: `missing-return-policy`, `missing-shipping-details`. Nici Product, nici Organization nu poartă date de retur/livrare, deci adnotările „free returns”/„delivery by” din merchant listings nu pot apărea. Datele există pe site: `/pages/politica-de-retur` — retragere în 14 zile („în decurs de maximum 14 zile de la data la care ne-ați comunicat retragerea”); `/pages/politica-de-livrare` — Cargus, „Livrare are costul de 20 RON”, „Livrare GRATUITĂ pentru comenzile ce depășesc 300 RON”, „livrate în 1-3 zile lucrătoare”. Dar `/pages/termeni-și-condiții` spune „Costul livrari este de 20 RON pentru comenziile mai mici de suma de 700 RON … peste 700 RON este gratuit” și „2 – 4 zile lucratoare” — un conflict factual care trebuie rezolvat înainte de codificare (Google poate verifica markup-ul față de setările de livrare din Merchant Center).

**Impact / pagini afectate:** 185 produse.

**Recomandare:** Verificare: fiecare `Offer` din snippet-ul de test poartă `hasMerchantReturnPolicy` (linia 79; `merchantReturnDays` 14, linia 84; `merchantReturnLink` → `/pages/politica-de-retur`, linia 87) și `shippingDetails` (linia 89; 20 RON, gratuit ≥ 300 RON, linia 93) — valorile specialistului: `MerchantReturnPolicy` (applicableCountry RO, `MerchantReturnFiniteReturnWindow`, `ReturnByMail`, `returnFees` în sarcina clientului) și `OfferShippingDetails` (DefinedRegion RO, handling 0–1 zi, tranzit 1–3 zile). Rămâne de făcut (proprietar), înainte de publicare: aliniați `/pages/termeni-și-condiții` (700 RON, 2–4 zile) cu `/pages/politica-de-livrare` (300 RON, 1–3 zile), confirmați cine plătește transportul la retur (`returnFees`) și, dacă există cont Merchant Center, că setările de livrare de acolo spun același lucru.

**Cum verificăm (falsificabilitate):** Rich Results Test → Merchant listings → „Shipping details” și „Return policy” apar ca prezente; dacă GSC raportează ulterior „Return policy conflicts with Merchant Center”, cifrele au fost greșite.

**Indicator timpuriu:** Adnotările de merchant listing vizibile în rezultatele Shopping pentru o interogare de brand („prime supplements creatina”).

#### SCHEMA-07 — Categoria din breadcrumb-ul de produs este „All Products” (sau colecția internă „11% TVA”) pe fiecare produs

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Medium | READY (tema de test – de publicat) | S | 0.95 |

**Dovezi:** `snippets/schema-breadcrumb-enhanced.liquid` folosește `product.collections.first`. Shopify ordonează `product.collections` după titlu, fiecare produs este în „All Products”, iar „11% TVA” se sortează înainte de „A”: numele de pe poziția 2 în cele 16 pagini de produs eșantionate = `{'All Products': 14, '11% TVA': 2}` (cele 2 sunt produse creatină aflate în colecția internă de TVA). Baton proteic este în `batoane-proteice`, `suplimente-sala`, `frontpage`, … dar crumb-ul spune `All Products → https://primesupplements.ro/collections/all`. În plus: „Pagina principala” hard-codat (breadcrumb-ul vizibil folosește altă etichetă), numele trecute prin `escape`, iar elementul de produs nu are `item`.

**Impact / pagini afectate:** 185 produse (170 „All Products”, 15 „11% TVA”).

**Recomandare:** Verificare: snippet-ul din tema de test (`theme-fixes/snippets/schema-breadcrumb-enhanced.liquid`, liniile 8–19) sare peste `all,cele-mai-vandute,lansate-recent,11-tva,frontpage,reduceri`, ia prima colecție reală a produsului, altfel colecția curentă dacă nu e utilitară, pune `| json` pe nume și `item` pe fiecare ListItem. Pe termen lung, `productType` este acum completat live (12.10.2026), deci crumb-urile pot fi construite din `product.type` (SCHEMA-09). Rămâne de publicat tema.

**Cum verificăm (falsificabilitate):** Rich Results Test pe baton-proteic-capsuni arată `Acasă › Batoane Proteice › Baton proteic căpșuni`; dacă „All Products” mai apare, lista de excludere este greșită.

**Indicator timpuriu:** Linia de breadcrumb din SERP pentru URL-urile de produs arată categoria în loc de „All Products” (inspecție cu interogare `site:`).

#### SCHEMA-08 — Organization: logo-ul răspunde 404, fără telefon/e-mail/adresă/identificatori legali, limbă și dată de înființare greșite, sameAs dubios

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Medium | READY (tema de test – de publicat) | S | 0.9 |

**Dovezi:** `snippets/schema-organization.liquid` hard-codează `"logo": {"url": "https://primesupplements.ro/cdn/shop/files/logo-prime-supplements.png"}` → `curl -I` azi: `HTTP/2 404`. Logo-urile reale din header sunt SVG (`logo-prime-negru.svg`, `logo-site-alb.svg`), pe care Google nu le acceptă pentru rich result-ul de logo. `contactPoint` nu are `telephone`; lipsesc `telephone`, `email`, `address`, `legalName`, `taxID`/`vatID`, deși footerul și pagina de contact arată „PRIME SPORT SUPPLEMENTS SRL, CUI 46260823, J32/1155/2022, 0775286584, contact@primesupplements.ro”, iar Admin are adresa de facturare (Strada Ioan Virgil Ispas, Sibiu, 555300, +40775286584). `availableLanguage: ["Romanian","Hungarian"]` în timp ce locale-ul hu este nepublicat. `foundingDate: "2020"` vs înregistrarea J32/1155/2022 și pagina Despre noi („a conceput firma PRIME SUPPLEMENTS in anul 2022”). `sameAs` listează `facebook.com/primesupplements.ro`, care a returnat o pagină de eroare de 1,5 KB în recon-ul social, în timp ce `facebook.com/primesupplementsro` a returnat un profil de 65 KB. Magazinul B2B emite alt nume de Organization (`PRIME SPORT SUPPLEMENTS SRL / 46260823`) pentru aceeași firmă. Snippet-ul este randat ca primul element din `<head>`, înainte de `<meta charset>`.

**Impact / pagini afectate:** Site-wide (blocul este pe toate cele 1.151 URL-uri).

**Recomandare:** Verificare: snippet-ul din tema de test (`theme-fixes/snippets/schema-organization.liquid`) emite `OnlineStore` (linia 18), `legalName` „PRIME SPORT SUPPLEMENTS SRL” (21), `taxID` (33), `telephone` (34, 50), `PostalAddress` Cisnădie (37–39), `foundingDate: "2022"` (32), `availableLanguage: ["ro"]` (52), `sameAs` → `facebook.com/primesupplementsro`, `instagram.com/primesupplements_ro`, `tiktok.com/@primesupplements.ro` (57–59), plus `WebSite` + `SearchAction` pe homepage (64–71); în `layout/theme.liquid` randarea este la linia 66, după `<meta charset="utf-8">` (linia 14). **Atenție, rămâne de făcut înainte de publicare:** snippet-ul de test păstrează `"url": "https://primesupplements.ro/cdn/shop/files/logo-prime-supplements.png"` (300×100, liniile 24–29) — exact URL-ul care răspunde 404 azi. Proprietarul trebuie să încarce un PNG de ≥ 112 px (de ex. 300×100 sau 600×160, ca recomandarea specialistului `logo-prime-supplements-600x160.png`) cu exact acest nume în Content → Files, sau să seteze logo-ul în Settings → Brand și să ajusteze snippet-ul; verificați și statutul de plătitor de TVA (`vatID RO46260823` doar dacă este cazul), handle-urile Instagram/TikTok și codul poștal 555300.

**Cum verificăm (falsificabilitate):** `curl -I` pe noul URL de logo returnează 200 image/png; Rich Results Test → „Organization” arată logo, adresă și telefon fără avertismente.

**Indicator timpuriu:** Knowledge panel / SERP de brand arată logo-ul și „Customer service +40 775 286 584”.

#### SCHEMA-09 — brand hard-codat pentru toate produsele (greșit pentru 100 articole MNX), category gol, sku/gtin dintr-o singură variantă, 207/395 variante fără cod de bare

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Medium | READY (tema de test – de publicat) | M (date) + S (snippet) | 0.9 |

**Dovezi:** `"brand": {"@type":"Brand","name":"Prime Supplements"}` pe toate cele 185 de produse, inclusiv cele 100 de articole de îmbrăcăminte MNX (brand MNX). `product.vendor` nu putea fi folosit ca atare: era „primesupplements1” (handle-ul myshopify) pe 64 de produse și „Prime Supplements” pe 121 — markup-ul nativ de pe magazinul B2B arată deja consecința: `"brand": {"name": "primesupplements1"}`. `"category": "{{ product.type | escape }}"` randa `""` pe 185/185 (productType gol pe tot catalogul). `sku`/`gtin` sunt luate doar din `selected_or_first_available_variant`: pe baton sku/gtin `6421766062509` este cutia de 100 RON, în timp ce lowPrice din AggregateOffer este batonul de 8,50; codul de bare este emis ca `gtin` generic, nu `gtin13` (toate codurile văzute sunt EAN-13, prefix 642). 207/395 variante (86 produse, 82 MNX) nu au cod de bare, deci niciun GTIN; 164 variante au sku == barcode.

**Impact / pagini afectate:** 185 produse (brand/category), 86 produse (fără GTIN).

**Recomandare:** Verificare: partea de date este FIXED live pe 12.10.2026 (`applied/products-plan.json`): `vendor` = „Prime Supplements” (108) / „MNX” (87), `productType` pe 195 produse (Proteine, Creatină, Batoane proteice, Tricouri, Hanorace …) și categoria din Shopify Standard Product Taxonomy (de ex. hb-1-9-6-3 Creatine, aa-1-1-2-2 T-shirts) — deci chiar snippet-ul live emite acum `category` nevid. Snippet-ul de test ia `brand` din `product.vendor` (liniile 13, 41), `category` din `product.type` (43) și `sku`/`gtin` per variantă (73, 76); emite `gtin` generic, nu `gtin13` — acceptat de Google pentru EAN-13, rafinare opțională. Rămâne pentru proprietar: coduri EAN-13 pentru cele 207 variante (86 produse, 82 MNX) acolo unde producătorul le-a alocat; pentru articolele MNX fără GTIN de fabrică lăsați câmpul gol (nu inventați coduri — Google tratează lipsa ca avertisment, nu ca eroare).

**Cum verificăm (falsificabilitate):** Rich Results Test pe un produs MNX arată brand „MNX”; pe baton ambele oferte poartă propriul gtin (`6421766062509`, `6421766062462`).

**Indicator timpuriu:** Numărul avertismentelor „Missing field gtin/brand” din Merchant Center / GSC „Merchant listings” → 0.

#### SCHEMA-10 — `escape` dublu-codifică `&`, `"`, `'` în stringurile JSON, iar descrierea este tăiată la 500 de caractere

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Low | READY (tema de test – de publicat) | S | 0.85 |

**Dovezi:** Filtrul Liquid `escape` produce entități HTML, deci stringurile JSON conțin literal `&amp;`, `&quot;`, `&#39;` (21 produse au `&`/ghilimele în nume sau în primele 500 de caractere ale descrierii; 1 titlu de articol). Google ar indexa „Hammer &amp; Co” ca text. `truncate: 500` adaugă „...” și aruncă restul descrierilor de până la 303 cuvinte (mediana la suplimente); Google citește până la ~5.000 de caractere.

**Impact / pagini afectate:** 21 produse, 1 articol (fidelitate); 85 suplimente (trunchiere).

**Recomandare:** Verificare: acoperit de rescrierea cu `| json` din tema de test (linia 34, `plain_description | json`); lanțul recomandat de specialist este `strip_html | strip_newlines | strip | truncate: 5000 | json`. Opțional, folosiți metafield-ul `custom.short_description` când există (există pe baton) — nu este încă citit de snippet-ul de test.

**Cum verificăm (falsificabilitate):** Niciun substring `&amp;` în vreun bloc `application/ld+json` după publicare (`grep -c '&amp;' product.html` în interiorul tagurilor script = 0).

**Indicator timpuriu:** n/a (calitate).

#### SCHEMA-11 — CollectionPage: descriere goală, numberOfItems greșit, listă trunchiată la 20, fără breadcrumb

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Low | READY (tema de test – de publicat) | S | 0.9 |

**Dovezi:** `snippets/schema-collection.liquid` → `"description": ""` pe 6/6 colecții eșantionate (23/23 colecții aveau descrieri goale, cu excepția „Bauturi”); `"numberOfItems": {{ collection.products.size }}` returnează dimensiunea paginii: `All Products`: numberOfItems 24, listate 20, real 195; `Haine MNX`: 24 / 20 / 100; `Reduceri`: 0 / 0. `limit: 20` pe buclă în timp ce pagina afișează 24. Fără BreadcrumbList pe colecții, nume trecute prin `escape`. CollectionPage/ItemList nu produc niciun rich result, de aici Low.

**Impact / pagini afectate:** 23 colecții (46 URL-uri).

**Recomandare:** Verificare: datele sunt FIXED live — 17 colecții de categorie au primit pe 12.10.2026 o descriere de 3 paragrafe (`descriptionHtml`) și toate cele 23 titluri/descrieri SEO (`applied/collections-plan.json`), deci `description` nu mai este gol nici cu snippet-ul vechi. Snippet-ul de test (`theme-fixes/snippets/schema-collection.liquid`): `| json`, `numberOfItems: collection.products_count` (linia 30 — numărul real, nu pagina), `limit: 24` (32, egal cu pagina), `BreadcrumbList` (46–48), `isPartOf #website` (24), `primaryImageOfPage` din imaginea colecției (26). Propunerea specialistului decala și pozițiile cu `current_page` — verificați `?page=2`. Notă: `/collections/all` devine `noindex,follow` în tema de test, deci testați pe o colecție de categorie, de ex. `/collections/pudra-proteica`.

**Cum verificăm (falsificabilitate):** Pe `/collections/all` blocul raportează `numberOfItems: 195` și o descriere nevidă.

**Indicator timpuriu:** n/a.

#### SCHEMA-12 — Fără nod WebSite pe homepage (nume de site / endpoint de căutare)

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Low | READY (tema de test – de publicat) | S | 0.8 |

**Dovezi:** `home.html` poartă doar Organization + FAQPage. `microdata-schema.liquid` nativ ar emite `WebSite` + `SearchAction` (`routes.search_url?q={search_term_string}`) pe `index`, dar este comentat în `layout/theme.liquid` (`{%- comment -%}{%- render 'microdata-schema' -%}{%- endcomment -%}`). Google folosește `WebSite.name`/`alternateName` pentru afișarea numelui site-ului în SERP; caseta de căutare sitelinks a fost retrasă în noiembrie 2024, deci SearchAction nu mai are feature în SERP.

**Impact / pagini afectate:** Homepage (și graful de entități).

**Recomandare:** Verificare: tema de test emite `WebSite` (`@id #website`, `publisher → #organization`) + `SearchAction` pe homepage din interiorul `schema-organization.liquid` (liniile 64–71), nu dintr-un snippet separat cum propunea specialistul (`$A/findings/schema-fixes/snippets/schema-website.liquid`); `microdata-schema` rămâne comentat (theme.liquid, linia 88), deci WebSite nu este dublat. Rămâne de publicat tema.

**Cum verificăm (falsificabilitate):** Rich Results Test pe `/` listează o entitate WebSite; SERP-ul de brand arată „Prime Supplements” ca nume de site în loc de domeniu.

**Indicator timpuriu:** Afișarea numelui de site la interogările de brand.

#### SCHEMA-13 — Entitățile nu sunt legate (@id doar pe Organization); seller/publisher/author sunt noduri inline duplicate

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Low | READY (tema de test – de publicat) | S | 0.8 |

**Dovezi:** Organization are `@id https://primesupplements.ro/#organization`, dar `Product.offers.seller`, `Article.author`, `Article.publisher` sunt obiecte `Organization` inline separate, fără `@id`, deci Google vede 2–3 organizații „Prime Supplements” nelegate pe fiecare pagină; nu există noduri `WebSite`/`WebPage`; Person-ul din BlogGenAuto nu are `@id`; Organization de pe magazinul B2B are alt nume. `@id …#product` pe Product este în regulă.

**Impact / pagini afectate:** Toate paginile.

**Recomandare:** Verificare: în tema de test `seller` din fiecare Offer este `{ "@type": "Organization", "@id": <shop.url>/#organization }` (linia 78 din snippet-ul Product), `author`/`publisher` din Article referă `#organization` (liniile 61–68), CollectionPage are `isPartOf → #website` (24), iar Organization/WebSite declară `#organization`/`#website`. Nefăcut încă: `@id` stabil pentru Person (`https://primesupplements.ro/pages/despre-noi#marius-chera`, refolosit de author, founder și viitorul ProfilePage din SCHEMA-20) și id-urile `#return-policy` / `#logo` din propunerea specialistului; numele Organization de pe B2B rămâne diferit (SCHEMA-17).

**Cum verificăm (falsificabilitate):** Un vizualizator de graf JSON-LD (de ex. Schema Markup Validator) arată un singur nod Organization per pagină.

**Indicator timpuriu:** n/a.

#### SCHEMA-14 — Datele structurate de pe duplicatele `/ro-hu/` indică URL-urile principale

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Low | PENDING (acțiune proprietar) | S | 0.8 |

**Dovezi:** `pages/homepage-ro-hu.html` emite exact același Organization + FAQPage; pe `/ro-hu/products/<handle>` snippet-ul live scrie `"url": "{{ shop.url }}/products/{{ product.handle }}"` și `"@id": …#product` cu URL-ul principal, în timp ce pagina este self-canonical către `/ro-hu/…` (hreflang ro-HU). 575 URL-uri duplicate declară deci entități al căror URL este altă pagină.

**Impact / pagini afectate:** 575 URL-uri `/ro-hu/`.

**Recomandare:** Remedierea reală este eliminarea prezenței web a pieței Ungaria (constatarea internațională TECH-01): mutația `webPresenceDelete` pe `gid://shopify/MarketWebPresence/73400189303` a fost validată pe 12.10.2026, dar NU executată — schimbă setările de vânzare, deci este decizia proprietarului (Settings → Markets → Ungaria → Domains and languages). Snippet-urile din tema de test construiesc în continuare URL-urile din `shop.url | append: product.url` (linia 17), deci pe `/ro-hu/` entitățile indică tot URL-ul principal — ținta corectă dacă `/ro-hu/` dispare; dacă piața rămâne, treceți la `canonical_url`/`request.origin` cum propunea specialistul, ca fiecare entitate să egaleze canonical-ul paginii.

**Cum verificăm (falsificabilitate):** După remedierea internațională, URL-urile `/ro-hu/` redirecționează sau nu mai există; altfel, fiecare `url` de entitate trebuie să egaleze canonical-ul paginii.

**Indicator timpuriu:** n/a.

#### SCHEMA-15 — FAQPage pe homepage și pe 3 produse creatină; textul FAQ al produselor nu este vizibil în pagină (fără feature SERP din mai 2026)

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Info | OPEN | S | 0.9 |

**Dovezi:** `home.html` are FAQPage cu 5 întrebări (răspunsurile conțin HTML `<p>`/`<a>`, permis) — întrebările sunt vizibile în secțiunea FAQ a homepage-ului. `snippets/faq-schema-creatina.liquid` emite același FAQPage cu 8 întrebări pe `creatina-monohidrat-micronized-300g-fara-aroma`, `creatina-creapure`, `creatine-ready-to-go-plicuri-prime-supplements` (potrivire pe handle), dar textul întrebărilor (de ex. „Creatina monohidrata cauzeaza caderea parului?”) nu apare nicăieri în HTML-ul vizibil din `product-creatina-creapure.html` — markup care nu corespunde conținutului din pagină încalcă ghidul Google pentru date structurate. Alte 347 blocuri FAQPage trăiesc în corpurile articolelor (în medie 4,7 întrebări). Google a eliminat rich result-urile FAQ pentru toate site-urile pe 7 mai 2026, deci nu există niciun feature SERP de câștigat sau pierdut.

**Impact / pagini afectate:** Homepage, 3 produse, 347 articole.

**Recomandare:** Nu este nevoie de eliminare și nu adăugați FAQPage nou. `faq-schema-creatina.liquid` nu a fost atins în tema de test. Dacă blocul creatină rămâne, randați aceleași întrebări-răspunsuri vizibil pe cele 3 pagini de produs (un bloc accordion în `templates/product.json`), astfel încât markup-ul să egaleze conținutul; secțiunile FAQ din articole sunt deja vizibile. Nu recomandăm HowTo.

**Cum verificăm (falsificabilitate):** n/a (fără rich result).

**Indicator timpuriu:** n/a.

#### SCHEMA-16 — Markup-ul întreținut de Shopify (`microdata-schema`) este dezactivat; alegeți nativ sau custom v2, niciodată ambele

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Medium | READY (tema de test – de publicat) | S | 0.9 |

**Dovezi:** `layout/theme.liquid`, linia 47: `{%- comment -%}{%- render 'microdata-schema' -%}{%- endcomment -%}`. `snippets/microdata-schema.liquid` (Impact 6) emite `{{ product | structured_data }}` / `{{ article | structured_data }}` (întreținute de Shopify, `Offer` per variantă cu prețuri zecimale și `availability`, brand = vendor), un BreadcrumbList din `collection`-ul curent și `WebSite` + `Organization` pe `index`. Cum arată markup-ul nativ azi se vede pe magazinul B2B (`$R/pages/b2b-product.html`): Product valid, dar `"brand": "primesupplements1"`, `"category": ""`, `"@context": "http://schema.org/"`, `@id` relativ, fără aggregateRating, fără retur/livrare.

**Impact / pagini afectate:** Decizie de arhitectură pentru toate cele 185 produse / 354 articole.

**Recomandare:** Decizia este luată în tema de test: varianta (b) — markup custom v2 (cele cinci snippet-uri rescrise), `microdata-schema` rămâne comentat (theme.liquid, linia 88), iar apelurile din `main-product.liquid` (liniile 112–114), `main-article.liquid` (137) și `main-collection.liquid` (233) păstrează aceleași nume de snippet. Compromisul documentat de specialist: (a) re-activarea `microdata-schema` + ștergerea celor trei randări custom — zero mentenanță, Shopify adaptează când Google schimbă cerințele, dar fără rating-uri, fără retur/livrare, brand după vendor și Organization emis de două ori (head + bloc index) dacă `schema-organization` nu e scos; (b) custom v2 — control complet (rating-uri din metafield-urile Judge.me, câmpuri de merchant listing, autor Person), validat, dar echipa trebuie să-l țină sincron cu documentația Google. Dacă echipa rămâne fără dezvoltator, (a) este fallback-ul acceptabil acum că vendor/productType sunt corectate. În ambele cazuri: exact o entitate Product și una Article per pagină.

**Cum verificăm (falsificabilitate):** `grep -c '"@type": "Product"'` (și forma compactă `"@type":"Product"`) pe o pagină de produs = 1 după publicare.

**Indicator timpuriu:** Trendul elementelor valide din GSC „Product snippets”/„Merchant listings”.

#### SCHEMA-17 — Aceleași entități de produs există pe b2b.primesupplements.ro cu alt seller/brand

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Low | PENDING (acțiune proprietar) | S | 0.8 |

**Dovezi:** `$R/pages/b2b-product.html` (`/products/creatina-creapure` pe magazinul B2B) emite Product JSON-LD nativ cu `brand "primesupplements1"`, `@id "/products/creatina-creapure#product"`, Organization `"PRIME SPORT SUPPLEMENTS SRL / 46260823"`; magazinul principal emite același nume/descriere de produs cu brand „Prime Supplements” și Organization „Prime Supplements”. 58 URL-uri de produs B2B împart handle-urile cu magazinul principal.

**Impact / pagini afectate:** 58 produse pe două domenii.

**Recomandare:** Latura schema a constatării de conținut duplicat (TECH-02): puneți magazinul B2B pe noindex (sau parolă / conturi de client) — acțiune a proprietarului pe celălalt magazin, neexecutată. Dacă trebuie să rămână indexabil, aliniați numele Organization (tema de test declară deja `legalName` „PRIME SPORT SUPPLEMENTS SRL” pe magazinul principal, deci jumătate din potrivire există) și setați vendor-ul corect și pe B2B, ca datele de entitate să coincidă.

**Cum verificăm (falsificabilitate):** `site:b2b.primesupplements.ro` returnează 0 rezultate după noindex.

**Indicator timpuriu:** n/a.

#### SCHEMA-18 — Variantele de culoare/aromă publicate ca produse separate împiedică markup-ul ProductGroup

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Low | OPEN | M | 0.75 |

**Dovezi:** Validatorul dă Info `no-product-group` pe fiecare produs MNX; catalogul are 19 grupuri de titluri aproape duplicate / 45 produse (culori MNX, arome Frutilu) publicate ca produse separate, deci `ProductGroup`/`variesBy`/`hasVariant` nu pot fi exprimate și Google vede produse identice concurente.

**Impact / pagini afectate:** 45 produse.

**Recomandare:** Nimic executat (consolidare de catalog, decizie editorială). Unificați frații de culoare/aromă în variante ale unui singur produs; după aceea `structured_data` nativ al Shopify emite ProductGroup automat, sau extindeți snippet-ul de test cu `ProductGroup` + `variesBy: ["https://schema.org/color"]` și `hasVariant` pe variantele rezultate. Păstrați redirecturi 301 de la handle-urile vechi.

**Cum verificăm (falsificabilitate):** Rich Results Test arată un ProductGroup cu hasVariant pe un tricou MNX.

**Indicator timpuriu:** n/a.

#### SCHEMA-19 — Prețurile reduse (compare-at pe 144/185 produse) nu sunt exprimate; fără priceValidUntil / itemCondition

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Low | OPEN | S | 0.85 |

**Dovezi:** Variantele batonului au `compareAtPrice 155.00/12.50` vs `price 100.00/8.50` în Admin, pagina afișează prețul tăiat, dar markup-ul are doar `lowPrice/highPrice`. Google acceptă `UnitPriceSpecification` cu `priceType: https://schema.org/StrikethroughPrice` pentru afișarea „price drop”/strikethrough; `priceValidUntil` și `itemCondition` sunt câmpuri recomandate absente.

**Impact / pagini afectate:** 144 produse cu compare-at; toate cele 185 pentru câmpurile recomandate.

**Recomandare:** Parțial READY: snippet-ul de test emite `priceValidUntil` (linia 69) și `itemCondition` (70) pe fiecare Offer. Rămâne OPEN partea principală: snippet-ul de test nu conține `StrikethroughPrice`. Adăugați în fiecare Offer, când `variant.compare_at_price > variant.price`:

```json
"priceSpecification": {"@type":"UnitPriceSpecification","priceType":"https://schema.org/StrikethroughPrice","price": compare_at, "priceCurrency": "RON"}
```

(un singur obiect, nu array — validatorul plugin-ului crapă pe array-uri, iar exemplul Google folosește un obiect; `priceValidUntil` la următorul 31 decembrie, `itemCondition NewCondition`). Sunt ~10 linii Liquid care pot intra în tema de test înainte de publicare.

**Cum verificăm (falsificabilitate):** Rich Results Test pe baton arată prețul 100 RON cu 155 RON tăiat.

**Indicator timpuriu:** Badge-ul „Price drop” în rezultatele Shopping/organice de produs.

#### SCHEMA-20 — Oportunități de schema legate de conținut existent: ProfilePage pentru autor, ContactPage, VideoObject

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Low | OPEN | M | 0.7 |

**Dovezi:** 335 articole sunt semnate de Marius Chera și `/pages/despre-noi` poartă biografia lui („primul antrenor roman … cardul PRO … NPC”, datele firmei J32/1155/2022), dar fără markup Person/ProfilePage; `/pages/contact` are NAP în HTML, dar doar blocul generic Organization; paginile de produs încorporează un app block de galerie YouTube (`youtube_gallery_carousel_widget_block`) fără `VideoObject`.

**Impact / pagini afectate:** 2 pagini + produsele cu video.

**Recomandare:** Nimic în tema de test. Adăugați `ProfilePage` + `Person` (`@id …#marius-chera`, jobTitle, sameAs LinkedIn, knowsAbout) pe `/pages/despre-noi` — autorul din snippet-ul Article de test trimite deja `url` către `/pages/despre-noi`, deci ProfilePage închide bucla de entitate (SCHEMA-13); `ContactPage` pe `/pages/contact`; `VideoObject` (name, description, thumbnailUrl, uploadDate, embedUrl) pentru videoclipurile de produs odată ce ID-urile YouTube sunt cunoscute. Fără HowTo; FAQPage doar ca Info.

**Cum verificăm (falsificabilitate):** Rich Results Test pe `/pages/despre-noi` arată ProfilePage.

**Indicator timpuriu:** Knowledge panel de autor / apariția entității la interogările de brand „Marius Chera”.

### Ce nu am putut măsura

- **Rich Results Test, rapoartele de Enhancements din Search Console și Merchant Center** — fără cheie API Google și fără acces GSC în sandbox; eligibilitatea a fost dedusă din cerințele documentate de Google și din validatorul plugin-ului `schema_ecommerce_validate.py` (care ignoră regula EU energy-class, neaplicabilă aici, și crapă pe array-uri `priceSpecification`).
- **Randarea Liquid** — specialistul nu a putut executa Liquid; snippet-urile v2 au fost verificate prin randare manuală cu valori reale de catalog, iar ulterior prin `theme-fixes/test_render.py` (python-liquid cu stub-uri de filtre), nu prin renderer-ul Shopify. Calea de metafield `metafields.reviews.rating.value.rating` urmează documentația Shopify, dar nu a fost executată.
- **Numărătorile la nivel de catalog** (75/185 Product invalide, 6/355 Article invalide, 21 cazuri de fidelitate a entităților) provin din rejucarea lanțului de filtre în Python pe exporturile Admin; cele 17 copii live de produs și 4 de articol concordă cu simularea (9/17 și 2/4 invalide).
- **Metafield-urile Judge.me** au fost verificate pe un singur produs (14971464450423); produsele fără recenzii vor omite pur și simplu `aggregateRating`.
- **Profilurile Facebook/Instagram/TikTok din `sameAs`** sunt deduse din dimensiunea răspunsurilor de recon (1,5 KB pagină de eroare vs 65 KB profil), nu dintr-o verificare autentificată; codul poștal 555300 și prefixul de TVA (`RO46260823`) trebuie confirmate de proprietar.
- **Verificări live** limitate la o singură cerere (`curl -I` pe logo → 404): scripturile plugin-ului care descarcă URL-uri eșuează prin proxy-ul sandbox-ului, nu există headless browser, iar magazinul răspunde 429 la rafale — toate celelalte constatări sunt din copiile locale (`$R/pages/*.html`, `$R/jsonld/*.jsonld`, `$R/theme/*`, `$R/shopify/*`).
