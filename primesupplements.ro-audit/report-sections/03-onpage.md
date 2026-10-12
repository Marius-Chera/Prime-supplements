## 3. SEO on-page (titluri, meta descrieri, H1, linkuri interne)

**Scor specialist (la momentul auditului):** 36/100 — un singur specialist alimentează secțiunea (`onpage`, pondere 20% din scorul de sănătate): metadate lipsă pe mai mult de jumătate din catalog (105/185 produse fără titlu SEO, 104/185 fără meta, 79 fără niciun tag `<meta name="description">`), șablon de titlu fără brand, H1 pe homepage = logo, 9/23 colecții și 11/11 pagini fără câmpuri SEO, un blog de 354 articole accesibil doar printr-o paginare prev/next de 33 de pagini și 2.582 linkuri către hostname-ul myshopify.com; peste 30 îl țin canonicalele self-referencing de peste tot, cele 335/354 titluri SEO de articol setate manual și blocurile de cross-link de pe paginile de produs.

**Scor estimat după remedierile din 12.10.2026:** 60/100 — pe live au fost rescrise titlurile și meta-urile SEO pe 185 produse (45-60 / 133-158 caractere, 184 cu sufix de brand, 0 care încep cu „Descoperiți”), 23 colecții, 354 articole (45-60 caractere, 0 cu „2026”) și 11 pagini, alt pe 493/493 imagini de produs, vendor și autor corectați; în tema de test (nepublicată) sunt gata sufixul de brand din `<title>`, titlul/meta homepage, `noindex,follow` pe colecțiile utilitare, og:image pe https, breadcrumb JSON-LD care sare peste „All Products” și neutralizarea la randare a linkurilor myshopify — fără publicarea temei scorul live este ≈54. Rămân deschise H1-urile de produs și de articol (ONPAGE-06, ONPAGE-11), descoperirea blogului (ONPAGE-15), H1/og:title pe colecții, diacriticele din H1/meniuri și dublura `/ro-hu/`.

### Ce funcționează

- `<link rel="canonical">` este self-referencing pe toate cele 24 pagini parsate și pe cele două pagini paginate verificate live (`/collections/all?page=2` → canonical `.../collections/all?page=2`, cu `rel=prev/next`).
- 0 `<title>` exact duplicate între cele 185 produse și 0 între cele 354 titluri SEO de articol; 0 meta descrieri de articol duplicate.
- 335/354 articole au un titlu SEO setat manual și 336/354 o meta descriere setată manual (mediana 157 caractere, min 101); doar 18 cad pe fallback.
- Un singur H1 pe 22 din 24 pagini parsate (excepții: 2 H1 pe creatina-monohidrat, 0 H1 pe cele trei pagini construite din secțiuni).
- hreflang (`x-default`, `ro`, `ro-HU`) și tagurile OG/Twitter sunt emise pe fiecare șablon (`snippets__social-meta-tags.liquid`).
- Homepage-ul linkează 36 de produse, paginile de produs au blocurile „Cele mai vândute” + „Categorii populare”; 20 din 23 colecții sunt accesibile din header/footer.
- Linkarea articol→articol există (1.474 linkuri, mediana 3 de ieșire per articol), iar ancorele din articole sunt titluri descriptive (0 ancore generice „click aici”).
- `<html lang="ro">` este corect pe toate paginile; titlurile paginate primesc sufixul „– Pagina N”, deci nu sunt duplicate exacte.

### Constatări

#### ONPAGE-01 — 105/185 produse fără titlu SEO: `<title>` era numele brut al produsului

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| High | FIXED (live 12.10.2026) | M | 0.95 |

**Dovezi:** `$R/shopify/products-all.json`: `seo_title == ""` pe 105 rânduri (16 suplimente/accesorii, 89 articole MNX). Exemple randate (`$R/parsed/pages_product.json`, `pages_products_turmeric-extract-80-caps.json`, `pages_products_mnx-classic-t-shirt-golden-era-blue.json`): `<title>Baton proteic căpșuni</title>` (21 caractere), `<title>Turmeric extract 80 caps</title>` (24), `<title>MNX classic T-shirt Golden Era, blue</title>` (36). Șablonul `$R/theme/layout__theme.liquid` linia 20: `<title>{% if page_title == blank %}{{ shop.name }}{% else %}{{ page_title }}…</title>` nu adaugă nimic. 16 titluri efective au sub 25 de caractere. Listele complete: Anexa A1 (16 suplimente) și A2 (89 MNX) din `findings/onpage.md`.

**Impact / pagini afectate:** 105 URL-uri de produs (×2 cu `/ro-hu/`), 57% din catalog; snippet-uri SERP fără beneficiu, gramaj sau brand.

**Recomandare:** Verificare: `applied/products-plan.json` (185 rânduri) arată `seo_title` de 45-60 caractere pe toate, 184/185 cu sufixul „| Prime Supplements”, 0 duplicate — ex. `baton-proteic-capsuni` → „Baton proteic căpșuni – 20 g proteine | Prime Supplements” (57), `turmeric-extract-80-caps` → „Turmeric Extract 80 caps – cu piperină | Prime Supplements” (58), `mnx-classic-t-shirt-golden-era-blue` → „Tricou MNX Golden Era albastru | Prime Supplements” (50). Proprietarul confirmă în Admin → Products → (produs) → Search engine listing sau cu `curl -s https://primesupplements.ro/products/baton-proteic-capsuni | grep -o '<title>[^<]*'`. Rămâne: tiparul specialistului (suplimente `"{Produs} {gramaj/porții} – {beneficiu principal}"`, îmbrăcăminte `"{Tip articol} MNX {model} {culoare} – {material}"`, ≤ 55 caractere înainte de sufix) se aplică și produselor noi; tema de test adaugă brandul doar titlurilor fără brand de ≤ 40 caractere, deci titlurile noi se scriu cu sufix.

**Cum verificăm (falsificabilitate):** `products-all.json` reconstruit din Admin arată `seo_title` nevid pe 185/185 și niciun `<title>` sub 30 de caractere într-un crawl.

**Indicator timpuriu:** GSC → Pages: afișări și CTR pe cele 105 URL-uri în 4-6 săptămâni; `site:primesupplements.ro "MNX"` arată titlurile noi în SERP.

#### ONPAGE-02 — 104/185 produse fără meta descriere; 79 livrate fără niciun `<meta name="description">`, 12 cu text de dozare

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| High | FIXED (live 12.10.2026) | M | 0.95 |

**Dovezi:** `seo_description == ""` pe 104 produse (16 suplimente, 88 MNX). `page_description` cade pe descrierea produsului (`theme.liquid` liniile 22-24 o tipăresc doar `if page_description`). 79 din 104 au descriere goală (`desc_words == 0`, 78 MNX + 1) → fără tag meta (confirmat: `pages_products_mnx-classic-t-shirt-golden-era-blue.json` META(0), `og:description` absent). 12 cad pe text de dozare/ingrediente: `pages_product.json` META(320) „Mod de administrare După cum este necesar în ceea ce privește compoziția dietei… Ingrediente Matrice proteică (concentrat proteic din zer…”; `pages_products_turmeric-extract-80-caps.json` META(320) „Mod de administrare Se administrează 1 capsulă pe zi…”. Alte 13 cad pe alt text din corp (emperor-mass_3000g, unt-de-caju, sapca-prime + 10 MNX). Liste: Anexele A3-A7.

**Impact / pagini afectate:** 104 produse (56% din catalog); aceleași șiruri alimentau `og:description` și `twitter:description`.

**Recomandare:** Verificare: `applied/products-plan.json` → `seo_description` de 133-158 caractere pe 185/185, 0 duplicate, niciuna care începe cu „Mod de administrare” (ex. baton-proteic-capsuni: „Baton proteic căpșuni, 55 g cu 20 g proteine per baton, în glazură de ciocolată albă…”, 155). Confirmare: `curl -s https://primesupplements.ro/products/mnx-classic-t-shirt-golden-era-blue | grep -o '<meta name="description"[^>]*>'`. Rămâne: (1) plasa de siguranță din temă pentru produsele viitoare — tema de test tipărește `<meta name="description">` doar `if seo_description != blank` și nu include fallback-ul pe categorie/preț propus în ONPAGE-03; (2) mutarea blocului „Mod de administrare / Ingrediente” sub un paragraf de prezentare în cele 12 descrieri, pentru că `twitter:description` este încă `product.description | truncatewords: 140` și în tema de test (ONPAGE-19).

**Cum verificăm (falsificabilitate):** Crawl → `<meta name="description">` de 70-160 caractere pe 185/185 produse și niciuna care începe cu „Mod de administrare”.

**Indicator timpuriu:** CTR în GSC pe URL-urile de produs; snippet-urile Bing/Google nu mai arată liste de ingrediente.

#### ONPAGE-03 — Șablonul de titlu nu adaugă sufixul de brand, iar cele 80 de titluri scrise manual folosesc trei grafii ale brandului

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| High | READY (tema de test – de publicat) | S | 0.95 |

**Dovezi:** `layout__theme.liquid` linia 20 randează doar `{{ page_title }}`. Doar 33/185 titluri efective de produs conțin brandul (18%). Dintre cele 80 titluri SEO setate: `| PRIME Supplements` ×16, `| PrimeSupplements` ×15 (gama Frutilu), `| Prime Supplements` ×1, 47 fără brand (Anexa A11); articole: `- PRIME Supplements` (lcarnitine), 3/335 conțin brandul; colecții `| Prime Supplements` ×1. Titlul homepage: `Prime Supplements - Hardcore Sports Nutrition` (slogan în engleză, fără cuvânt-cheie de produs).

**Impact / pagini afectate:** Site-wide (575 URL-uri unice; 1.151 cu `/ro-hu/`).

**Recomandare:** Verificare: `theme-fixes/layout/theme.liquid` liniile 18-56 din tema „Impact – SEO fixes 2026-10-12” (id 193875083639): `has_brand` detectează „Prime Supplements / PRIME Supplements / PRIME SUPPLEMENTS”, adaugă „ | Prime Supplements” doar când titlul nu are brand și are ≤ 40 caractere, suprascrie titlul homepage cu „Suplimente nutritive, proteine și creatină | Prime Supplements” și adaugă „ – Pagina N” (`general.page | t`) pe paginare. Grafiile au fost normalizate pe live: 184/185 produse și 23/23 colecții au exact „| Prime Supplements”; cele 354 titluri de articol (45-60 caractere) nu primesc sufix (> 40 caractere), intenționat, ca să rămână ≤ 60. După publicare: `curl -s https://primesupplements.ro/ | grep -o '<title>[^<]*'` și un crawl în care niciun titlu nu conține „PrimeSupplements” sau „PRIME Supplements” și niciunul nu are brandul de două ori. Propunerea originală a specialistului (de păstrat pentru fallback-ul de meta pe produs/colecție/articol, care nu este în tema de test) pentru liniile 20 și 22-24 din `layout/theme.liquid`:

```liquid
{%- liquid
  assign brand = shop.name
  assign seo_title = page_title
  if request.page_type == 'index'
    assign seo_title = 'Suplimente sportive și nutriție pentru sală – magazin online'
  endif
  assign probe = seo_title | downcase | remove: ' '
  assign has_brand = false
  if probe contains 'primesupplements'
    assign has_brand = true
  endif
  assign meta_desc = page_description
  if request.page_type == 'product' and product.metafields.global.description_tag == blank
    assign cat = ''
    for c in product.collections
      unless c.handle == 'all' or c.handle == 'cele-mai-vandute' or c.handle == 'lansate-recent' or c.handle == '11-tva' or c.handle == 'frontpage'
        assign cat = c.title
        break
      endunless
    endfor
    assign meta_desc = product.title | append: ' – ' | append: cat | append: ' de la Prime Supplements. Preț ' | append: product.price | money | append: ', livrare rapidă în toată România.'
  elsif request.page_type == 'collection' and meta_desc == blank
    assign meta_desc = collection.title | append: ' – ' | append: collection.products_count | append: ' produse Prime Supplements. Comandă online, livrare rapidă în România.'
  elsif request.page_type == 'article' and meta_desc == blank
    assign meta_desc = article.excerpt | default: article.content | strip_html | truncate: 155
  endif
-%}
<title>
  {{- seo_title -}}
  {%- if current_page != 1 %} – Pagina {{ current_page }}{% endif -%}
  {%- unless has_brand %} | {{ brand }}{% endunless -%}
</title>
{%- if meta_desc != blank -%}
  <meta name="description" content="{{ meta_desc | strip_newlines | truncate: 158 | escape }}">
{%- endif -%}
```

Apoi normalizarea celor 32 de sufixe scrise manual (făcută pe live, vezi mai sus), ca nimic să nu se citească „… | PrimeSupplements | Prime Supplements”; titlurile scrise manual rămân ≤ 55 caractere.

**Cum verificăm (falsificabilitate):** Fiecare `<title>` dintr-un crawl se termină cu „| Prime Supplements” exact o dată; nicio pagină de produs fără meta descriere.

**Indicator timpuriu:** Titluri SERP consecvente la interogări de brand într-un singur crawl; afișări de brand în GSC.

#### ONPAGE-04 — 47 titluri SEO depășesc 60 de caractere (max 92) și 17 titluri brute de produs ajung la 122 de caractere

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Medium | FIXED (live 12.10.2026) | S | 0.9 |

**Dovezi:** `products-all.json`: `seo_title_len > 60` pe 47/80 titluri setate, > 70 pe 39 — ex. „Thermo Core 120 Caps - Supliment pentru Arderea Grăsimilor și Energizare | PRIME Supplements” (92), „Daily Vitamin Formula 30 packs - Supliment Multivitaminic Esențial | PRIME Supplements” (86). `title_len > 60` brut pe 17 produse Frutilu (85-122 caractere, ex. instant-drink-frutilu-ice-tea-peach-10g = 122); acestea au titluri SEO mai scurte, dar titlul brut este H1, `og:title`, ancora cardului de produs și linia din coș. Titluri efective < 25 caractere: 16. Liste: Anexele A8 și A9.

**Impact / pagini afectate:** 47 + 17 + 16 produse.

**Recomandare:** Verificare: `applied/products-plan.json` → `seo_title` min 45 / mediană 57 / max 60 caractere, 0 peste 60, 0 sub 30 (thermo-core-120-caps → „Arzător de grăsimi Thermo Core 120 caps | Prime Supplements”, 59; instant-drink-frutilu-ice-tea-peach-10g → „Frutilu Ice Tea Peach 10g – piersici | Prime Supplements”, 56). Rămâne (neatins pe 12.10): cele 17 titluri brute Frutilu de 85-122 caractere, care sunt în continuare H1, `og:title` și ancoră de card — de scurtat în Admin la tiparul `"Băutură instant Frutilu {aromă} 10g – fără zahăr"`, cu „(pentru 1.5L) – cu Stevia și Vitamina C” mutat în descriere; se execută odată cu redenumirea din ONPAGE-06.

**Cum verificăm (falsificabilitate):** Niciun `<title>` > 65 caractere și niciun H1 > 70 caractere pe paginile de produs.

**Indicator timpuriu:** Google nu mai rescrie aceste titluri (comparație titlu SERP vs `<title>` pentru cele 47 URL-uri).

#### ONPAGE-05 — Meta descrieri șablonate („Descoperiți … Alegeți PRIME Supplements …”), 35 peste 160 de caractere și 2 duplicate

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Medium | FIXED (live 12.10.2026) | M | 0.9 |

**Dovezi:** Din 81 meta de produs setate: 40 încep cu „Descoperiți”, 36 conțin „Alegeți PRIME Supplements”, 12 se termină cu propoziția identică „Alegeți PRIME Supplements pentru produse de calitate superioară!”; 35 au > 160 caractere (max 221; ex. prime-whey-1000g 191 / prime-whey-2000g 192, și cvasi-identice: „Descoperiți Prime Whey, un supliment proteic din zer de calitate superioară…”). `metadata_template.py` a semnalat `brand-suffix-in-description` pe pure-isolate-2000g. Articole: 118/336 meta încep cu „Află”, 63 cu „Descoperă”, 54 cu „Optimizează(-ți)” (70% împart trei deschideri); 91/336 au > 160 caractere (max 250); 304/336 conțin „2026”. Liste: Anexele A10 și A19.

**Impact / pagini afectate:** 81 meta de produs, 336 meta de articol.

**Recomandare:** Verificare: `applied/products-plan.json` → 0 meta care încep cu „Descoperiți”, 0 cu „Alegeți PRIME”, lungime 133-158, 0 duplicate; prime-whey-1000g („…1 kg, 82% proteine la 100 g…”, 148) și prime-whey-2000g („…formatul mare: 66 porții…”, 143) sunt acum distincte. `applied/articles-plan.json` → 354 meta de 139-157 caractere, cu primul cuvânt distribuit („Cum” 76, „De” 50, „Ce” 41, „Când” 11, „Cele” 9), 0 duplicate. Rămâne: aceeași regulă — un fapt concret primul (doză, porții, proteină per porție, preț) și un diferențiator, fără propoziția de brand (titlul o poartă) — pentru produsele și articolele viitoare.

**Cum verificăm (falsificabilitate):** Nicio meta > 160 caractere; < 10% din meta împart același prim cuvânt; 0 duplicate.

**Indicator timpuriu:** CTR în GSC pe cele 35 URL-uri care aveau meta lungi.

#### ONPAGE-06 — H1 de produs = numele brut: 100 H1 în engleză, 14 H1 de tip „500g/83 serv”, 2 H1 pe o pagină, H1 englezesc sub un titlu românesc

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| High | OPEN | M | 0.9 |

**Dovezi:** `snippets__product-info.liquid` liniile 84-86 tipăresc `<h1>{{ product.title }}</h1>`. `products-all.json`: 100 titluri conțin cuvinte englezești (93 MNX precum „MNX Extra T-shirt HC 2.0 *Limited*, white”, plus „Creatine (Creapure®)”, „CREATINE MONOHYDRATE 300g/60serv”, „Pure Isolate 2kg/74 serv”); 78 se termină cu „, {culoare}”; 14 conțin „/NN serv” (Anexa A13); 1 este integral cu majuscule („PRIME SHAKER CUSTOMISED”); 8 poartă `*` sau `®`. `pages_product-creatina-creapure.json`: `<title>` „Creatina Creapure - Supliment pentru Performanță Fizică”, dar H1 „Creatine (Creapure®)”. `pages_product-creatina-mono.json`: H1 ×2 — H1-ul temei „CREATINE MONOHYDRATE 300g/60serv” plus `<h1>Creatine Monohydrate Micronized 300g (Fără Aromă) – Puritate și Performanță</h1>` în HTML-ul descrierii (`$R/pages/product-creatina-mono.html`). Remedierea din 12.10 a rescris titlurile SEO, `vendor` și `productType`, nu `product.title`, deci H1-urile sunt neschimbate.

**Impact / pagini afectate:** 100 produse cu H1 englezesc; 14 cu număr de porții în H1; 1 pagină cu 2 H1; 2 pagini cu nepotrivire de limbă H1/titlu (×2 cu `/ro-hu/`).

**Recomandare:** Redenumește titlurile de produs în română, cu cuvântul-cheie primul: „Creatină Creapure 500g”, „Creatină monohidrat micronizată 300g, fără aromă”, „Izolat proteic Pure Isolate 2kg”; îmbrăcăminte „Tricou MNX Extra HC 2.0 Limited, alb” (tip + brand + model + culoare). „/74 serv” se mută în opțiunea de variantă sau în descriere. `<h1>` din descriere devine `<h2>` pe creatina-monohidrat-micronized-300g-fara-aroma. Dacă numele de model MNX rămân în engleză, se prefixează tipul de produs în română. Titlurile SEO noi conțin deja aceste forme (ex. „Tricou MNX Golden Era albastru”), deci redenumirea le aliniază cu `<title>`; `product.title` alimentează și `og:title`, cardurile de produs și coșul, deci se face prin CSV/Matrixify sau `productUpdate` cu `title`, fără schimbarea handle-urilor.

**Cum verificăm (falsificabilitate):** Crawl: exact un H1 pe pagină de produs, niciun H1 care se potrivește cu `/\d+ ?serv/` sau se termină cu o culoare în engleză.

**Indicator timpuriu:** Poziții pentru interogări de tip „tricou sală”, „creatină monohidrat” într-un rank tracker.

#### ONPAGE-07 — Diacriticele sunt inconsecvente între titlu, H1 și meta pe aceeași pagină

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Medium | OPEN | S | 0.85 |

**Dovezi:** 22 titluri efective de produs sunt română ASCII („Bautura Instant Cola Frutilu 10g - Fara Zahar & Stevia”, „Baton proteic caramel sarat”, „Pudra Hidratare Frutilu Watermelon 10g | Bautura Sanatoasa”), în timp ce 44 folosesc diacritice (Anexa A12); colecția `pudra-proteica`: `<title>` „Pudra proteica pentru masa musculară | Prime Supplements” vs H1 „Pudre Proteice”; meta homepage (216 caractere) fără nicio diacritică („Magazin online cu suplimente nutritive si gama completa de produse recomandata culturistilor…”); H2 homepage „Inainte/dupa”; 7 titluri SEO de articol și 4 H1 de articol fără diacritice („Fat Burner Pareri: Ce Iau Expertii pentru Retentia de Apa 2026”); titluri de colecție în Admin „Bauturi”, „Creatina”. Stare după 12.10: titlurile și meta SEO rescrise pe live au diacritice corecte (regexul `\b(Bautura|Fara|Pudra|Sanatoasa|Zahar|Capsuni|Pareri|Retentia)\b` dă 0 potriviri pe cele 185 titluri de produs și 354 de articol din `applied/`), iar meta homepage din tema de test are diacritice; H1-urile (titlul brut de produs, titlul colecției, H1 de articol), H2 „Inainte/dupa” și etichetele de navigare rămân ASCII, deci inconsecvența titlu↔H1 persistă.

**Impact / pagini afectate:** 22 produse, titlurile de colecție „Bauturi” și „Creatina”, homepage, 11 articole, mai multe etichete de meniu.

**Recomandare:** O singură regulă: diacritice românești corecte (ă â î ș ț, cu virgulă dedesubt) în titluri, H1, meta și etichete de navigare; variantele ASCII, cel mult în corpul textului. Concret: redenumește cele 22 titluri de produs (odată cu ONPAGE-06), titlurile colecțiilor „Bauturi” → „Băuturi” și „Creatina” → „Creatină” (Admin → Collections; handle-ul rămâne), H2 „Inainte/dupa” → „Înainte/după” în editorul de temă, cele 4 H1 de articol (ONPAGE-11) și etichetele din meniul principal/footer (Online Store → Navigation). Google tratează „bautura”/„băutură” ca echivalente la clasare, dar formele mixte arată a conținut generat automat în snippet-uri.

**Cum verificăm (falsificabilitate):** Crawl regex: niciun `<title>` sau H1 care conține `\b(Bautura|Fara|Pudra|Sanatoasa|Zahar|Capsuni|Pareri|Retentia)\b`.

**Indicator timpuriu:** Niciunul direct; revizuirea calității snippet-urilor.

#### ONPAGE-08 — Homepage: titlu cu slogan englezesc, meta ASCII de 216 caractere, H1 = logo, H2 în engleză

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| High | READY (tema de test – de publicat) | S | 0.95 |

**Dovezi:** `$R/parsed/home.json`: titlu „Prime Supplements - Hardcore Sports Nutrition” (45 caractere, fără cuvânt-cheie românesc); meta 216 caractere fără diacritice; H1 = `<h1 class="header__logo"><a href="/"><span class="sr-only">Prime Supplements</span><img … alt="">` (`$R/home.html` linia 2124); 13 H2 inclusiv „Let customers speak for us” (Judge.me), „Inainte/dupa”, „Cluster Insulin Bomb 1kg/33serv”; H3 „Combat PRO 2.0” dublează un H2; 44 linkuri interne cu ancoră goală (linkuri-imagine de produs cu `alt=""`, ex. 3× /products/prime-whey-2000g); „Vezi toate” ×8 ca singură ancoră către colecții precum cele-mai-vandute și lansate-recent.

**Impact / pagini afectate:** Homepage (+ copia `/ro-hu/`, identică).

**Recomandare:** Verificare: în `theme-fixes/layout/theme.liquid`, pentru `request.page_type == 'index'` titlul devine „Suplimente nutritive, proteine și creatină | Prime Supplements” (62 caractere) și meta „Magazin online de suplimente nutritive pentru sport: creatină, proteine din zer, pre-workout, aminoacizi, vitamine și echipament de sală MNX. Livrare rapidă în toată România.” (cu diacritice); după publicare: `curl -s https://primesupplements.ro/ | grep -o -E '<title>[^<]*|<meta name="description"[^>]*>'`. Ancorele goale sunt rezolvate pe live prin alt-urile scrise pe 493/493 imagini (ONPAGE-17). Rămâne: (1) H1 — în editorul temei Impact, secțiunea Header → dezactivează „Logo as H1 on homepage” (logo-ul devine `div`) și dă secțiunii hero un H1 cu cuvântul-cheie principal (ex. „Suplimente sportive și nutriție pentru sală”); (2) traducerea titlului widgetului Judge.me (app Judge.me → Settings → Translations); (3) H2 „Inainte/dupa” → „Înainte/după”; (4) etichetele „Vezi toate” → „Vezi toate {colecția}”. Propunerea specialistului pentru titlu („Suplimente sportive, proteine și creatină – magazin online | Prime Supplements”, ≤ 65) și meta („Suplimente pentru sală produse în România: proteine whey, creatină Creapure, pre-workout, vitamine și haine MNX. Livrare rapidă, plata la livrare.”) rămâne o alternativă validă dacă proprietarul preferă accentul pe „produse în România”.

**Cum verificăm (falsificabilitate):** Textul H1 al homepage-ului nu este „Prime Supplements”; niciun H2 în engleză.

**Indicator timpuriu:** GSC: afișări pe homepage pentru „suplimente sportive” / „magazin suplimente”.

#### ONPAGE-09 — 9/23 colecții fără titlu/meta SEO; „All Products”, „11% TVA”, „Reduceri” (goală) și 2 clone cu 185 produse sunt indexabile

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| High | READY (tema de test – de publicat) | M | 0.9 |

**Dovezi:** Fapte din context, verificate pe 4 pagini locale: `pages_collection-all.json` titlu/H1 „All Products”, META(0); `pages_collection-11tva.json` „11% TVA”, META(0); `pages_collection-haine-mnx.json` „Haine MNX”, META(0); `pages_collection-reduceri.json` „Reduceri”, META(0), 0 produse (pagina spune „Nu există produse”). Fără câmpuri SEO pe frontpage, cele-mai-vandute, lansate-recent, reduceri, all, 11-tva, haine-mnx, crema-de-orez, bauturi (Anexa A20). 22/23 colecții cu descriere goală ⇒ zero text pe pagină, `twitter:description` gol pe fiecare colecție, `og:description` lipsă pe 9. Toate cele 185 produse stau în all / cele-mai-vandute / lansate-recent, deci trei listări de câte 8 pagini cu aceleași 185 articole concurează între ele. Cele două titluri SEO existente: „Pudra proteica pentru masa musculară | Prime Supplements” (56), „Creatina monohidrat pentru forță și performanță” (47, fără brand).

**Impact / pagini afectate:** 23 colecții (46 cu `/ro-hu/`), ~24 URL-uri paginate pentru cele trei clone.

**Recomandare:** Deja pe live: `applied/collections-plan.json` → 23/23 titluri SEO de 51-60 caractere cu brand („Toate produsele – suplimente și nutriție | Prime Supplements”, „Pudre proteice – whey, izolat și gainer | Prime Supplements”, „Creatină monohidrată – pudră și plicuri | Prime Supplements”, „Produse cu TVA 11% – nutriție sportivă | Prime Supplements”) și meta de 145-154; 17 colecții-categorie au `descriptionHtml` în 3 paragrafe cu fapte despre produse (cele 6 utilitare — frontpage, cele-mai-vandute, lansate-recent, reduceri, all, 11-tva — intenționat fără). Verificare după publicarea temei: `theme-fixes/layout/theme.liquid` liniile 42-44 pun `<meta name="robots" content="noindex, follow">` pe `all,cele-mai-vandute,lansate-recent,11-tva,frontpage,reduceri,vendors,types` → `curl -s https://primesupplements.ro/collections/11-tva | grep -o '<meta name="robots"[^>]*>'`. Rămâne: titlul colecției `all` (H1) este încă „All Products” — redenumire în Admin la „Toate produsele”; dacă proprietarul vrea cele-mai-vandute / lansate-recent indexabile, le diferențiază (regulă de sortare + text de 120-250 cuvinte) și le scoate din `utility_collections`; „Reduceri” rămâne noindex cât timp are 0 produse. Fallback-ul de meta pentru colecții viitoare este în Liquid-ul din ONPAGE-03.

**Cum verificăm (falsificabilitate):** Niciun `<title>` de colecție egal cu numele brut al colecției; titlul `/collections/all` este în română; colecțiile goale returnează `noindex`.

**Indicator timpuriu:** GSC: interogări de categorie care aterizează pe pagini de categorie, nu pe produse.

#### ONPAGE-10 — H1 de colecție ≠ titlu, og:title folosește numele brut, iar 4 pagini de categorie au 1-3 produse

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Medium | OPEN | M | 0.85 |

**Dovezi:** `pages_collection.json`: `<title>` „Pudra proteica pentru masa musculară…” vs H1 „Pudre Proteice” vs `og:title` „Pudre Proteice”; `pages_collection-creatina.json`: titlu „Creatina monohidrat pentru forță și performanță” vs H1 „Creatina” vs og:title „Creatina” (`social-meta-tags.liquid` linia 25 folosește `collection.title`). Număr de produse (câmpul collections din `products-all.json`): frontpage 1, shot-pre-workout 2, alimente-sanatoase 2, creatina 3, batoane-proteice / arzator-de-grasimi / aminoacizi / suplimente-intra-workout câte 4. Două colecții de îmbrăcăminte suprapuse: echipament-sala (99) și haine-mnx (87), linkate ca „Îmbrăcăminte” și „Haine MNX”. Stare 12.10: titlurile SEO noi au cuvântul-cheie („Pudre proteice – whey, izolat și gainer”) și 17 colecții au text de categorie (reduce subțirimea), dar titlurile de colecție/H1 nu au fost schimbate, iar `theme-fixes/snippets/social-meta-tags.liquid` linia 27 folosește tot `collection.title` pentru `og:title`.

**Impact / pagini afectate:** 23 colecții; 8 cu ≤ 4 produse.

**Recomandare:** Aliniază H1 cu cuvântul-cheie (titlul colecției „Pudre proteice – whey, izolat, gainer”, Admin → Collections); în `snippets/social-meta-tags.liquid` din tema de test (liniile 18/24/27) folosește `page_title` pentru `og:title` pe produse, articole și colecții; comasează shot-pre-workout în suplimente-pre-workout și alimente-sanatoase în crema-de-orez / „Alimente” (cu 301 din Admin → Navigation → URL redirects) sau adaugă text + FAQ ca paginile cu 2-3 produse să nu fie subțiri; alege un singur hub de îmbrăcăminte (haine-mnx) și fă echipament-sala părintele lui sau pune-l noindex.

**Cum verificăm (falsificabilitate):** `og:title` == `<title>` pe colecții; nicio colecție indexabilă cu < 4 produse și < 100 cuvinte.

**Indicator timpuriu:** Afișări pe paginile de categorie în GSC.

#### ONPAGE-11 — Titluri H1 de articol: 321/354 peste 60 de caractere (max 134), 279 conțin „2026”, 206 sunt clickbait cu două puncte, 1 este integral în engleză

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| High | OPEN | L | 0.9 |

**Dovezi:** `articles-all.json`: `title_len > 60` pe 321, > 70 pe 131, > 80 pe 38; mediana 69, max 134 („Cum să Transformi Bioflavonoidele și Ceaiul Verde în Aliați Puternici în Lupta împotriva Grăsimilor: Ghida Completa pentru Thermo Core”); 279 conțin „2026” și 253 se termină cu el („… în 2026”); 206 conțin „:”; 30 folosesc Title Case englezesc („Cum Să Maximizați Creșterea Musculară Cu Ajutorul…”); 1 H1 în engleză: „Exploring the Science Behind L-Carnitine 1000: How It Transforms Fat into Energy” (handle fat-burner-x10-pareri-l-carnitine-1000-80-caps). 47 grupuri de cuvinte-cheie din titlu acoperă 164 articole (catalog-analysis.md). Greșeli în H1: „Ghida Completa”, „Ocasii Speciale”, „HIVERNALĂ”. Remedierea din 12.10 a rescris doar metafield-urile `global.title_tag` (acum 45-60 caractere, 0 cu „2026”; articolul englezesc are titlul SEO „Știința din spatele L-Carnitine 1000: ce face L-carnitina”), nu `article.title`, deci H1-urile de pe pagină sunt neschimbate.

**Impact / pagini afectate:** 354 articole (708 URL-uri cu `/ro-hu/`).

**Recomandare:** Rescrie H1-urile la ≤ 65 caractere, sentence case, în română, fără an (dacă articolul este actualizat anual, „actualizat 2026” merge în linia dateModified, nu în H1); un singur H1 per subiect — comasarea celor 47 grupuri canibalizate este decizia editorială PENDING din constatările cluster. Traduce H1-ul englezesc. Scurtătură practică: titlul SEO nou din `applied/articles-plan.json` poate deveni direct `article.title` (import Matrixify: foaia Blog Posts → ID, Title), pentru că este deja scurt, românesc și unic pe subiect; handle-urile rămân neschimbate, deci nu sunt necesare redirecturi.

**Cum verificăm (falsificabilitate):** ≤ 10% din H1-urile de articol > 65 caractere; 0 H1 în engleză.

**Indicator timpuriu:** Rescrierile de titlu ale Google scad (titlu SERP == `<title>` pe un eșantion de 30 URL-uri).

#### ONPAGE-12 — Titluri SEO de articol: 19 lipsă (Shopify trunchiază fallback-ul la 70 de caractere, în mijlocul cuvântului), 223/335 peste 60, 292 conțin „2026”, 90 poartă fragmente de cuvinte-cheie englezești

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| High | FIXED (live 12.10.2026) | M | 0.9 |

**Dovezi:** GraphQL `global.title_tag`: setat pe 335/354; lipsă pe 19 (Anexa A14). Pentru acestea titlul randat este titlul articolului tăiat la 70 de caractere: `$R/pages/article-2026-citicolina.html` `<title>Rutina perfectă de antrenament de seară pentru sportivii călători în 2</title>` (H1 se termină „… în 2026”). Titluri setate: min 50, mediană 63, max 112; > 60 pe 223, > 70 pe 74, > 80 pe 36; 292 conțin „2026”; 32 identice cu H1; 2 se termină în „...” („Ce este un pre-workout fără cofeină? Descoperă Nitrox NO-...”); 90 au fragmente SEO englezești ca termen principal („Creatine Benefits: 7 Semne că…”, „Before and after creatine: Performanță sub stres în 2026”, „Creatine Gummies: Momentul Optim…” — magazinul nu vinde gummies), 1 în franceză („Protéine Whey Isolate: Ghid de Recuperare…”), 7 fără diacritice. Doar 3/335 conțin brandul. `global.description_tag`: lipsă pe 18 (Anexa A15); pentru ele `page_description` cade pe corp, care începe cu antetul englezesc al generatorului: `pages_article-2026-citicolina.json` META(320) „Published: March 15, 2026 | Updated: March 15, 2026 By: Marius Chera , Nutriționist Certificat Share Post Key Takeaways Citicolina…” (folosit și ca `og:description`).

**Impact / pagini afectate:** 19 + 18 pagini cu fallback; 223 titluri prea lungi; 90 titluri cu fragmente englezești.

**Recomandare:** Verificare: `applied/articles-plan.json` (354 rânduri; `applied/logs/articles.json`: `applied_metafields_for: 354`) → `seo_title` de 45-60 caractere (mediana 57), 0 cu „2026”, 0 terminate în „...”, 0 duplicate; `seo_description` de 139-157 caractere; ex. citicolina → „Citicolina și rutina de antrenament de seară pentru călători”. Confirmare: `curl -s https://primesupplements.ro/blogs/news/citicolina-conexiune-musculara-rutina-antrenament-seara-travel-2026 | grep -o '<title>[^<]*'`. Reziduuri de verificat manual în plan: „Creatine gummies: dimineața sau seara, în funcție de sezon” (produs inexistent în catalog — de reformulat), „Whey isolate protein: absorbție rapidă și masă musculară”, 2 titluri cu „Creatine Ready To Go” (nume de produs, legitim) și 10 cu „fat burner” (termen uzual în română, acceptabil). Rămâne: în BlogGenAuto, dezactivarea setării „English keyword in title” sau trecerea sursei de cuvinte-cheie pe termeni românești, altfel articolele noi reintroduc problema.

**Cum verificăm (falsificabilitate):** 354/354 articole au `global.title_tag` și `global.description_tag`; niciun `<title>` terminat în „...” sau „în 2”; niciun titlu care se potrivește cu `\b(creatine|benefits|before and after|gummies)\b` în afara numelor de produs.

**Indicator timpuriu:** GSC: afișări pentru interogări românești („beneficii creatină”) care înlocuiesc afișările pe interogări englezești pe URL-urile de blog.

#### ONPAGE-13 — 10 titluri SEO de articol și 9 slug-uri URL țintesc nume de competitori (Gymbeam, Havok, Optimum Nutrition, MyProtein, Farmacia Tei)

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Medium | PENDING (acțiune proprietar) | S | 0.85 |

**Dovezi:** Titluri SEO: „Gymbeam Creatine: 4 Momente pentru Pauza de Creatină în 2026”, „Gymbeam Creatine: De ce Strategia ta Eșuează în 2026 și Soluția”, „Creatina în Călătorii: Ghid Gymbeam Creatine pentru 2026”, „Havok Pre Workout: Ghid de Depanare…”, „Pre Workout Havok și Nutriția…”, „Proteina Whey Optimum Nutrition și Gainerul…”, „My protein: Combinații cu izolat proteic…”, „Nac farmacia tei: 6 Greșeli de depozitare…”, plus Dr Max (liver-protect) (Anexa A18). Handle-uri: gymbeam-creatine-creatina-monohidrat-micronized-300g-fara (-2, -3, -4, -5), gymbeam-creatine-creatine-ready-to-go-plicuri, gainer-gymbeam-prime-whey-2000g-protein-myths, pre-workout-havok-suplimente-pre-workout-si-alimentatia, havok-pre-workout-ghid-depanare-rutina-suplimente-pre. Paginile nu compară și nu menționează brandurile în corp dincolo de cuvântul-cheie; vând produse Prime. Stare 12.10: 7 din 10 titluri SEO au fost rescrise fără brand de competitor (ex. gymbeam-…-fara → „Cum iei creatină în călătorii: de ce contează consistența”); 3 îl mai conțin în `applied/articles-plan.json`: „Cum combini creatina Gymbeam cu dieta: protocol de saturație” (-2), „Gymbeam Creatine în călătorii: transport, dozaj și așteptări” (-3), „Pre-workout Havok și alimentația: cum le combini corect”. Slug-urile sunt permanente și neschimbate.

**Impact / pagini afectate:** 10 titluri (3 rămase), 9 slug-uri permanente (5 dintr-o serie numerotată -2…-5 pe același subiect).

**Recomandare:** Decizie a proprietarului, parte din consolidarea celor ~190 articole duplicate (harta 301 este în constatările cluster): fie transformă-le în pagini de comparație oneste („Creatină Prime vs Gymbeam: ce diferă”, cu brandul în H1 și în corp), fie re-titrează cele 3 titluri rămase pe interogarea generică și redirecționează 301 slug-urile cu nume de brand către articolul canonic al subiectului (Admin → Navigation → URL redirects; articolul se trece pe draft după redirect). Păstrează intenția SXO onestă și evită reclamații de marcă.

**Cum verificăm (falsificabilitate):** Niciun `<title>` sau slug cu brand terț, cu excepția paginilor de comparație care numesc brandul în H1 și în corp.

**Indicator timpuriu:** Interogările GSC cu „gymbeam” / „havok” pe aceste URL-uri scad, în timp ce interogările generice de creatină se mențin.

#### ONPAGE-14 — 26 articole randează două H1; 352 corpuri încep cu o linie-antet englezească „Published: …”

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Medium | PENDING (acțiune proprietar) | S | 0.95 |

**Dovezi:** HTML-ul brut al corpurilor (`articles-p*.json`): `<h1>` în corp pe 26 articole (Anexa B), în timp ce `sections__main-blog.liquid` / șablonul de articol tipărește deja `<h1 class="h0">{{ article.title }}</h1>` → 2 H1 pe pagină. 352 corpuri încep cu „Published: May 15, 2026 | Updated: … | By: Marius Chera | Share Post | Key Takeaways” (engleză hard-codată, 10 cu data literală May 15, 2026; verificat în `$R/shopify/articles-bodies/*.txt`). 1 articol folosește H3 fără H2 (bcaa-vs-eaa…; `pages_article.json` H2 = doar „Te-ar putea interesa” al temei). 3 corpuri încorporează ca text un breadcrumb „Acasă › Ultimele articole › …”.

**Impact / pagini afectate:** 26 + 352 articole.

**Recomandare:** Pregătit, neaplicat: `blog-cleanup/clean.py` a produs corpuri curățate pentru 355/355 articole (`blog-cleanup/cleaned-bodies.tar.gz`, `blog-cleanup/matrixify-blog-posts.csv.gz`; raport `blog-cleanup/cleanup-report.json`: `h1_demoted: 26`, `metadata_bar_removed: 3`, `breadcrumb_nav_removed: 3`, `author_bio_normalised: 349`, `ldjson_removed: 1379`, `scripts_removed: 347`). Importul în masă a fost blocat de politica de integrare din acest mediu (`applied/logs/articles.json`: `bodies_applied: 0`); proprietarul îl aplică cu Matrixify (foaia Blog Posts: ID, Body HTML) sau cu un script Admin API de ~20 linii (`articleUpdate`). Atenție: raportul arată doar 3 bare de metadate eliminate prin selectorul de comentariu/clasă, deci linia „Published: …” trebuie verificată după import pe un eșantion (`grep -c "Published:"` pe corpurile exportate) și, dacă persistă, tratată cu regexul din recomandarea specialistului (ștergerea blocului „Published: … Key Takeaways”, `<h1` → `<h2`, lanțurile de H3 fără H2 → H2). Tema de test nu demotează H1-urile la randare (`theme-fixes/sections/main-article.liquid` înlocuiește doar linkuri și scripturi). În BlogGenAuto: dezactivează opțiunea „post header”.

**Cum verificăm (falsificabilitate):** Crawl: 1 H1 pe 354/354 articole; 0 corpuri care conțin „Published:”.

**Indicator timpuriu:** Niciunul direct; calitatea snippet-urilor și a `og:description`.

#### ONPAGE-15 — Descoperirea blogului: 11 articole pe pagină, 33 pagini adâncime, paginare doar prev/next, aceleași 3 articole linkate site-wide, 21 articole fără niciun link de intrare din alte articole

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| High | OPEN | M | 0.9 |

**Dovezi:** `/blogs/news` listează 11 articole (`pages_blog-index.json`: 11 imagini, 74 linkuri interne, din care ~55 header/footer); `snippets__pagination.liquid` randează doar `rel=prev`/`rel=next` și o etichetă „{{ current_page }} / {{ paginate.pages }}” — fără linkuri numerotate (`$R/pages/blog-index.html` conține doar `href="/blogs/news?page=2"`, la fel pe `/collections/all`). 354 articole ⇒ 33 pagini; 299 articole stau dincolo de pagina 5, 244 dincolo de pagina 10, 134 dincolo de pagina 20, deci cel mai vechi are nevoie de 33 de salturi secvențiale. Blocul „Ghiduri și sfaturi utile” de pe homepage și fiecare pagină de colecție eșantionată linkează aceleași 3 articole (instant-oat-cream-800g-25-serv-mindful-eating-practices-2, l-carnitine-1000-80-caps-travel-weight-loss-tips, omega-3-crema-de-orez-blueberry-muffin). Taguri: 345/354 fără tag, 5 taguri în total, fără hub-uri de tag; un singur blog. Graful de linkuri din corp: 1.474 linkuri articol→articol, mediana 3 de ieșire; 21 articole primesc 0 linkuri din alte articole (Anexa C), 110 primesc 1-2; max 13 de intrare. Nicio remediere din 12.10 nu atinge paginarea, tagurile sau blocurile de linkuri.

**Impact / pagini afectate:** 354 articole.

**Recomandare:** (1) În `sections/main-blog.liquid` ridică `paginate blog.articles by 11` la 24 și adaugă paginare numerotată (`paginate.parts`) în `snippets/pagination.liquid`; (2) creează 6-8 hub-uri tematice (creatină, proteine, pre-workout, arzătoare, vitamine, recuperare, nutriție) ca taguri de blog, cu paginile de tag linkate din antetul blogului și din footer (`main-blog.liquid` suportă deja filtrarea pe taguri, `show_tags`, liniile 73-90); (3) rotește blocul „Ghiduri” per colecție (metafield `collection.metafields.custom.articles`) ca fiecare categorie să-și linkeze propriile ghiduri; (4) adaugă „related by tag” la finalul articolului (blocul Impact „Te-ar putea interesa” folosește `blog.articles` — trece-l pe filtrare după tag); (5) linkează cele 21 articole orfane din hub-uri. Modificările de temă se fac pe tema de test, ca să iasă într-o singură publicare.

**Cum verificăm (falsificabilitate):** Fiecare articol la ≤ 4 clicuri de homepage într-un crawl (adâncime Screaming Frog); 0 articole cu < 2 linkuri interne de intrare.

**Indicator timpuriu:** GSC: numărul de URL-uri de blog cu afișări; numărul „Discovered – currently not indexed” pentru /blogs/ în Crawl stats.

#### ONPAGE-16 — 2.582 linkuri din articole indică primesupplements1.myshopify.com și 194 articole poartă un link dofollow „Powered by BlogGenAuto”

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| High | READY (tema de test – de publicat) | S | 0.95 |

**Dovezi:** catalog-analysis.md (verificat în `articles-p*.json`): 2.582 linkuri către `primesupplements1.myshopify.com` în 349 articole — 1.602 produs, 534 `/cart/add` și 446 colecție; fiecare link de produs apare de două ori (domeniu principal + myshopify). `pages_article-2026-citicolina.json`: 4 linkuri myshopify pe o singură pagină. 194 articole conțin linkul extern vizibil către bloggenauto.com fără `rel="nofollow sponsored"`. Fiecare link myshopify costă un salt 301 și scurge hostname-ul de dezvoltare în ancore/snippet-uri.

**Impact / pagini afectate:** 349 articole; 194 articole.

**Recomandare:** Verificare: `theme-fixes/sections/main-article.liquid` liniile 109-116 rescriu la randare `https://primesupplements1.myshopify.com` → cale relativă, fac inerte scripturile din corp (`type="text/plain"`) și pun `rel="nofollow sponsored noopener"` pe linkul bloggenauto.com; după publicare: `curl -s https://primesupplements.ro/blogs/news/citicolina-conexiune-musculara-rutina-antrenament-seara-travel-2026 | grep -c myshopify` = 0 și `grep -o '<a[^>]*bloggenauto[^>]*>'` arată `nofollow sponsored`. Remedierea durabilă rămâne PENDING: importul corpurilor curățate (`cleanup-report.json`: `myshopify_links_rewritten: 2582`, `powered_by_removed: 194`, `absolute_primary_links_relativised: 2229`, `remaining_myshopify: 0`) prin Matrixify, apoi deduplicarea linkurilor către același produs din același paragraf; în BlogGenAuto, setarea „store URL” pe domeniul principal.

**Cum verificăm (falsificabilitate):** `grep -c myshopify` peste corpurile exportate = 0; niciun link extern bloggenauto.com (sau doar cu `nofollow sponsored`).

**Indicator timpuriu:** Accesările de redirect pe primesupplements1.myshopify.com în Shopify „online store sessions by referrer” scad spre 0.

#### ONPAGE-17 — Ancore goale și generice: 44 linkuri-imagine fără text pe homepage, 28 pe colecțiile mari, „Vezi toate” ×8

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Medium | FIXED (live 12.10.2026) | S | 0.9 |

**Dovezi:** `home.json`: 44 linkuri interne cu ancoră goală (linkuri-imagine de produs cu `<img alt="">`, ex. 3× /products/prime-whey-2000g, 3× /products/prime-whey-1000g, 3× /products/pure-isolate-2000g); „Vezi toate” ×8 este singura ancoră către cele-mai-vandute și lansate-recent, „Vezi produse” către suplimente-sala; `pages_collection-all.json` și `pages_collection-haine-mnx.json`: câte 28 linkuri cu ancoră goală; paginile de produs câte 7; aceeași colecție este linkată cu patru grafii („PRE-WORKOUT”, „Pre Workout”, „Pre-Workout”, „Vezi toate”). Cauza-rădăcină: 493/493 imagini de produs fără alt în Admin, deci linkurile-imagine nu moștenesc niciun text.

**Impact / pagini afectate:** Homepage, toate paginile de colecție, paginile de produs.

**Recomandare:** Verificare: cauza-rădăcină este rezolvată pe live — `applied/alt-text-plan.json` (493 rânduri, 185 produse, 0 alt gol; `applied/logs/alt-text-all.json`: `total: 493, failed: []`), ex. ashwagandha-ksm-66 poziția 1 → „KSM-66 ASHWAGANDHA - 80 caps Prime Health, flacon alb cu capac și etichetă verde, 5% withanolide, vedere din față”. Confirmare: `curl -s https://primesupplements.ro/ | grep -c 'alt=""'` scade de la 24 (restul sunt icoane decorative). Rămâne (S, editor de temă): „Vezi toate” → „Vezi toate pudrele proteice” etc. (setarea „button label” a secțiunii) și o singură grafie per colecție în meniuri (Online Store → Navigation).

**Cum verificăm (falsificabilitate):** Crawl: 0 `<a>` interne fără text accesibil; „Vezi toate” ≤ 1 apariție per pagină.

**Indicator timpuriu:** Niciunul direct.

#### ONPAGE-18 — Fără breadcrumb vizibil pe niciun șablon; singurul BreadcrumbList este JSON-LD și indică „All Products”

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Medium | READY (tema de test – de publicat) | S | 0.9 |

**Dovezi:** `grep -i breadcrumb` pe `$R/pages/product.html`, `collection.html`, `article.html`, `page-despre-noi.html` → 0 potriviri `class`/`aria-label`; doar JSON-LD `schema-breadcrumb-enhanced` în product.html, construit din `product.collections.first` = „All Products” (context, specialistul schema). Utilizatorii și crawlerele nu primesc nicio cale ierarhică și niciun link intern suplimentar către paginile de categorie de pe cele 185 pagini de produs și 354 articole.

**Impact / pagini afectate:** Toate cele 575 pagini.

**Recomandare:** Verificare: `theme-fixes/snippets/schema-breadcrumb-enhanced.liquid` linia 8 sare peste `all,cele-mai-vandute,lansate-recent,11-tva,frontpage,reduceri` și folosește prima colecție reală (testul `breadcrumb (skips All Products)` din `theme-fixes/test_render.py`); `schema-collection.liquid` emite BreadcrumbList și pe colecții. După publicare: Rich Results Test pe /products/creatina-creapure arată al doilea element = categoria (ex. „Creatină”), nu „All Products”. Rămâne: traseul vizibil — blocul de breadcrumb al temei Impact (sau `snippets/breadcrumbs.liquid` randat în main-product / main-collection / main-article) cu aceeași buclă de colecție și hub-ul de tag al blogului, ca JSON-LD-ul și traseul vizibil să vină din aceleași date.

**Cum verificăm (falsificabilitate):** `<nav aria-label="breadcrumb">` prezent pe produs/colecție/articol, cu categoria ca al doilea element.

**Indicator timpuriu:** Afișarea breadcrumb-ului în SERP pentru URL-urile de produs.

#### ONPAGE-19 — Taguri OG/Twitter: og:image pe http, og:title ≠ titlu, card „summary”, twitter:description = text de dozare

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Low | READY (tema de test – de publicat) | S | 0.95 |

**Dovezi:** `snippets__social-meta-tags.liquid` linia 35: `<meta property="og:image" content="http:{{ page_image | image_url… }}">` (toate paginile, ex. `home.json` og:image `http://primesupplements.ro/cdn/...`); liniile 17/25 folosesc `product.title`/`collection.title`, deci `og:title` este „Creatine (Creapure®)” în timp ce `<title>` este „Creatina Creapure - Supliment…” (80 produse, 2 colecții); `twitter:card` este `summary` (pătrat mic) pe fiecare pagină; `twitter:description` = `product.description | truncatewords: 140` → „Mod de administrare După cum este necesar…” (`pages_product.json`) sau gol pe 79 MNX; `twitter:image:alt` gol pe produse (alt lipsă); `og:description` absent oriunde `page_description` era gol (104 produse, 9 colecții, 11 pagini, 18 articole).

**Impact / pagini afectate:** Site-wide.

**Recomandare:** Verificare: în tema de test, `theme-fixes/snippets/social-meta-tags.liquid` liniile 34-35 au `https:` pe `og:image` și `og:image:secure_url`; `og:description` (linia 41, `page_description`) și `twitter:image:alt` (linia 76, `page_image.alt`) sunt acum populate pe live prin meta-urile și alt-urile scrise. Rămâne în același snippet (S): `page_title` în loc de `product.title` / `article.title` / `collection.title` la liniile 18/24/27 pentru `og:title`; `summary_large_image` la linia 58; `page_description` (în loc de `product.description | truncatewords: 140`) la liniile 62/65/68 pentru `twitter:description`; `product.featured_image.alt | default: product.title` ca fallback pentru `twitter:image:alt`.

**Cum verificăm (falsificabilitate):** Facebook Sharing Debugger / X Card Validator arată imagine mare și titlul SEO pentru /products/creatina-creapure.

**Indicator timpuriu:** CTR pe referral social.

#### ONPAGE-20 — Listări paginate: titluri bilingve „All Products – Pagina 2”, fără meta descriere, 3 serii identice de 8 pagini

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Low | READY (tema de test – de publicat) | S | 0.9 |

**Dovezi:** Live `/collections/all?page=2`: `<title>All Products &ndash; Pagina 2</title>`, canonical self, fără meta descriere, H1 „All Products”; `/blogs/news?page=2`: `<title>Ultimele articole &ndash; Pagina 2</title>`, fără meta. `all`, `cele-mai-vandute`, `lansate-recent` paginează fiecare aceleași 185 produse (24 pe pagină ⇒ 8 pagini fiecare). Paginarea în sine (self-canonical + rel prev/next) este corectă.

**Impact / pagini afectate:** ~24 pagini de colecție + 33 pagini de blog.

**Recomandare:** Verificare: pe live colecțiile au acum meta (se propagă pe `?page=N` prin `page_description`); în tema de test titlul paginat devine „{titlu SEO} – Pagina N” (brandul vine din titlul SEO al colecției, ex. „Toate produsele – suplimente și nutriție | Prime Supplements – Pagina 2”), iar cele trei serii-clonă primesc `noindex, follow` (ONPAGE-09). După publicare: `curl -s 'https://primesupplements.ro/collections/all?page=2' | grep -o -E '<title>[^<]*|<meta name="robots"[^>]*>'`. Opțional, după crearea hub-urilor de tag (ONPAGE-15): `noindex,follow` pe `current_page > 1` pentru blog.

**Cum verificăm (falsificabilitate):** Titlurile paginate sunt în română și poartă brandul; paginile paginate au meta descriere.

**Indicator timpuriu:** Numărul de pagini `?page=` indexate în GSC.

#### ONPAGE-21 — Șiruri englezești netraduse pe pagini cu `lang="ro"`

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Medium | PENDING (acțiune proprietar) | S | 0.95 |

**Dovezi:** „All Products” (titlu + H1 pe /collections/all și breadcrumb JSON-LD pe fiecare produs); „Hardcore Sports Nutrition” (titlu homepage); „Let customers speak for us” (H2 homepage, Judge.me); „Customer Reviews” (H2) + „Write a review” + „Powered by” pe fiecare pagină de produs (`$R/pages/product.html`); „Thank you” (titlu de pagină, indexabilă, în sitemap); „Published: … | Updated: … | By: … | Share Post | Key Takeaways” pe 352 articole; „Creatine (Creapure®)”, „CREATINE MONOHYDRATE”, „Pure Isolate 2kg/74 serv” și 93 nume MNX englezești ca H1; 1 H1 de articol în engleză; „Reprezinți o companie?” ca titlu de pagină este românesc, dar este o întrebare, nu o etichetă.

**Impact / pagini afectate:** Homepage, 185 produse, 354 articole, 2 pagini, 1 colecție.

**Recomandare:** Stare pe componente: titlul homepage și „All Products” din `<title>`/breadcrumb — READY (tema de test; titlul SEO al colecției este deja „Toate produsele – …”); „Thank you” — titlu SEO scris pe live + `noindex` în tema de test; „Published: …” — PENDING (importul corpurilor, ONPAGE-14); H1 de produs — OPEN (ONPAGE-06); H1 de articol englezesc — OPEN (ONPAGE-11). Acțiuni ale proprietarului: Judge.me → Settings → Translations (șiruri românești pentru „Customer Reviews”, „Write a review”, „Let customers speak for us”); redenumirea colecției `all` în „Toate produsele” (H1); pagina thank-you → titlu „Mulțumim – înregistrare B2B”.

**Cum verificăm (falsificabilitate):** Crawl-ul H1/H2/titlu pentru regexul `\b(All Products|Customer Reviews|Let customers|Thank you|Published:)\b` returnează 0.

**Indicator timpuriu:** Niciunul direct.

#### ONPAGE-22 — Greșeli de scriere în titlurile de secțiune din temă și în titluri

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Low | OPEN | S | 1.0 |

**Dovezi:** „S-ar putea să-ți placã” (ã U+00E3 în loc de ă U+0103) este H2-ul de recomandări de pe fiecare pagină de produs (`$R/pages/product.html`, titlul secțiunii din templates/product.json); „CREATINĂMONOHIDRATĂ MICRONIZATĂ” (spațiu lipsă) H2 pe /pages/creatina-custom și de două ori pe produsul creatina-monohidrat; H1 de articol „Ghida Completa”, „Ocasii Speciale”, „HIVERNALĂ”; titlu SEO „Protéine Whey Isolate” (rescris pe live pe 12.10); handle „protine-whey-isolate-…”; sufixe de șablon de colecție „pime-health”, „aminoaicizi”, „accesori” (context, cosmetice).

**Impact / pagini afectate:** 185 pagini de produs (placã), 2 pagini, 4 articole.

**Recomandare:** Corectează textul secțiunii în editorul de temă („S-ar putea să-ți placă”: Theme editor → șablonul Product → secțiunea de recomandări → Heading), imaginea/titlul din creatina-custom și din descrierea produsului creatina-monohidrat, și cele 3 H1 de articol (odată cu ONPAGE-11). Se poate face direct pe tema de test, ca să iasă cu aceeași publicare.

**Cum verificăm (falsificabilitate):** `grep -c "placã"` pe o pagină de produs = 0.

**Indicator timpuriu:** Niciunul.

#### ONPAGE-23 — Pagini de magazin: 0/11 cu titlu sau meta SEO; cele trei pagini construite din secțiuni nu au H1; „Thank you” este indexabilă

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Medium | FIXED (live 12.10.2026) | S | 0.95 |

**Dovezi:** `pages.json`: `seo` este null pe toate cele 11 noduri (Anexa A21). Parsate: `pages_page-contact.json` titlu „Contact”, META(0), H1 ×0; `pages_page-despre-noi.json` „Despre noi”, META(0), H1 ×0, 775 cuvinte, singurul H2 „Informații utile”; `pages_page-creatina-custom.json` „Creatina custom”, META(0), H1 ×0, H2 „CREATINĂMONOHIDRATĂ MICRONIZATĂ”. Titluri „Thank you” (șablon thank-you-b2b, în sitemap), „Reprezinți o companie?”, „POLITICA DE RETUR” (majuscule), „Politica de plata” (fără diacritice); handle `termeni-și-condiții` → URL `/pages/termeni-%C8%99i-condi%C8%9Bii`. Paginile legale folosesc doar H3 (politica-de-cookies 6 H3 / 0 H2).

**Impact / pagini afectate:** 11 pagini (22 URL-uri).

**Recomandare:** Verificare: `data/remediation-status.md` — metafield-urile `global.title_tag` + `global.description_tag` scrise pe 11/11 pagini (contact, despre-noi, politici, inregistrare-b2b, thank-you, creatina-custom); confirmare în Admin → Online Store → Pages → (pagina) → Search engine listing sau cu `curl -s https://primesupplements.ro/pages/despre-noi | grep -o -E '<title>[^<]*|<meta name="description"[^>]*>'`. `noindex` pe thank-you este în tema de test (`theme.liquid` liniile 46-48). Rămâne: H1 în șabloanele de secțiune (Impact „rich text” → heading tag = h1) pentru despre-noi, contact, creatina-custom — ex. „Despre Prime Supplements – producător român de suplimente”; `noindex` și pe inregistrare-b2b dacă proprietarul nu vrea pagina în SERP; redenumire „POLITICA DE RETUR” → „Politica de retur”, „Politica de plata” → „Politica de plată”; handle-ul non-ASCII se păstrează (schimbarea cere redirect), dar o pagină nouă `termeni-si-conditii` cu 301 este o opțiune dacă URL-ul se reconstruiește.

**Cum verificăm (falsificabilitate):** 11/11 pagini returnează meta descriere; despre-noi / contact / creatina-custom au un singur H1.

**Indicator timpuriu:** Afișări pentru „prime supplements despre” / „contact prime supplements”.

#### ONPAGE-24 — Index de blog: titlu/H1 generic „Ultimele articole”, fără meta descriere, fără H2

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Low | OPEN | S | 0.95 |

**Dovezi:** `pages_blog-index.json`: titlu „Ultimele articole” (17 caractere), META(0), H1 „Ultimele articole”, H2 ×0, `twitter:description` „Ultimele articole”; `sections__main-blog.liquid` linia 39 tipărește `blog.title`. Remedierea din 12.10 a atins articolele, nu obiectul blog; tema de test va adăuga doar sufixul („Ultimele articole | Prime Supplements”, pentru că titlul are ≤ 40 caractere).

**Impact / pagini afectate:** 1 hub + 32 copii paginate.

**Recomandare:** Redenumește blogul „Ghiduri de suplimente și nutriție sportivă” (handle-ul rămâne `news`), setează titlul/meta SEO în Admin → Online Store → Blog posts → Manage blogs → (blog) → Search engine listing, adaugă un paragraf introductiv și linkurile către hub-urile de tag (ONPAGE-15).

**Cum verificăm (falsificabilitate):** Titlul indexului de blog conține un cuvânt-cheie și brandul; meta prezentă.

**Indicator timpuriu:** Afișări pentru „blog suplimente” / „ghid creatină”.

#### ONPAGE-25 — Handle-ul myshopify „primesupplements1” este vizibil ca vendor și ca autor

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Low | FIXED (live 12.10.2026) | S | 0.95 |

**Dovezi:** Vendor = „primesupplements1” pe 64/185 produse (`products-all.json`), randat de `snippets__vendor.liquid` în product-info (context: 25-36 apariții per HTML de produs, link `/collections/vendors?q=primesupplements1`); autor „primesupplements1” pe 18 articole (byline „De primesupplements1”); 2.582 linkuri din corp (ONPAGE-16).

**Impact / pagini afectate:** 64 produse, 18 articole.

**Recomandare:** Verificare: `applied/products-plan.json` → vendor „Prime Supplements” (98) sau „MNX” (87) pe 185/185 (remediation-status: 108 / 87 pe 195, inclusiv produsele ghost/gift-box), ceea ce corectează și brandul hard-codat din schema Product; `applied/logs/articles.json`: `authors_fixed: 17` → „Marius Chera” (specialistul a numărat 18 cu „primesupplements1”; diferența de 1 este probabil articolul nepublicat, 355 vs 354 — de verificat în Admin → Blog posts, filtru autor). Confirmare: `curl -s https://primesupplements.ro/products/creatina-creapure | grep -c primesupplements1` = 0 (linkurile din corpurile de articol sunt tratate în ONPAGE-16). Vendor-ul fiind acum un nume real, blocul de vendor poate rămâne vizibil; `/collections/vendors` primește `noindex` în tema de test.

**Cum verificăm (falsificabilitate):** `grep -c primesupplements1` pe o pagină de produs = 0.

**Indicator timpuriu:** Niciunul.

#### ONPAGE-26 — 19 grupuri de titluri cvasi-duplicate (45 produse): variantele de culoare și aromă sunt publicate ca produse separate

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Medium | OPEN | M | 0.85 |

**Dovezi:** catalog-analysis.md „Near-duplicate title groups”: ex. „MNX Extra T-shirt basic” ×3 (black/grey/white), „MNX Workout Top Hammer 3.0” ×3, „Bautura Instant cu Gust de … Frutilu … Fara Zahar, cu Stevia si Vitamina C” ×3 (chocolate/cola/mango), „Water Out” ×2 (120 caps vs 500 ml); 78 titluri se termină cu „, {culoare}”. Fiecare are aceeași descriere (mediana MNX 0 cuvinte), același tipar de meta și H1 cvasi-identic → auto-concurență și pagini subțiri. Titlurile și meta SEO rescrise pe 12.10 sunt distincte per produs (0 duplicate), ceea ce atenuează, dar nu elimină, concurența dintre variante.

**Impact / pagini afectate:** 45 produse.

**Recomandare:** Comasează variantele de culoare într-un singur produs cu opțiunea Culoare (Shopify Combined Listings sau variante simple) și 301 handle-urile retrase (Admin → Navigation → URL redirects); pentru Frutilu păstrează aromele separate doar cu text distinct, altfel comasează în „Băutură instant Frutilu 10g – 15 arome”. Decizie de catalog a proprietarului (afectează stocuri, feed-urile de Shopping și cele 1.602 linkuri de produs din blog).

**Cum verificăm (falsificabilitate):** Niciun două `<title>` de produs care diferă doar printr-un token de culoare/aromă.

**Indicator timpuriu:** Mai puține intrări „Duplicate without user-selected canonical” în GSC.

#### ONPAGE-27 — Text alt absent pe 493/493 imagini de produs (efecte secundare pe ancore și pe `twitter:image:alt`)

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Low | FIXED (live 12.10.2026) | M | 0.95 |

**Dovezi:** `products-all.json`: `images_without_alt == image_count` pe 185/185 produse (493 imagini); paginile de produs arată câte 6 imagini cu alt gol; homepage 24/127; `twitter:image:alt` gol pe toate produsele; alt lipsă pe imaginea principală a 19 articole, imagini din corp 43/2210. Severitate Low pentru că problema aparține specialistului de imagini; aici sunt listate doar efectele on-page.

**Impact / pagini afectate:** 185 produse.

**Recomandare:** Verificare: `applied/alt-text-plan.json` → 493/493 alt-uri descriptive în română, scrise după imaginea reală (ambalaj, aromă, unghi, purtat/întins), 0 goale; `applied/logs/alt-text-all.json`: `total: 493, failed: []`. Confirmare: Admin → Products → (produs) → Media → alt text, sau `curl -s https://primesupplements.ro/products/ashwagandha-ksm-66 | grep -o 'alt="[^"]*"' | head`. Rămâne (specialistul de imagini / blog): alt pe cele 19 imagini principale de articol și pe cele 43 imagini din corp (`cleanup-report.json`: `img_empty_alt: 46` tratate în corpurile curățate, PENDING import).

**Cum verificăm (falsificabilitate):** 0 imagini de produs cu alt gol în Admin.

**Indicator timpuriu:** Afișări Google Images.

#### ONPAGE-28 — Fiecare titlu/meta/H1 există de două ori din cauza copiei de piață `/ro-hu/`

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Info | PENDING (acțiune proprietar) | – | 1.0 |

**Dovezi:** `pages_homepage-ro-hu.json` este identic byte cu byte în titlu, meta, H1 și H2 cu `home.json`; sitemap 575 + 575 URL-uri. Severitate Info pentru că remedierea aparține specialistului internațional.

**Impact / pagini afectate:** 575 URL-uri duplicate.

**Recomandare:** Pregătit: `webPresenceDelete` pentru `gid://shopify/MarketWebPresence/73400189303` (piața „Ungaria”, subfolder `/ro-hu/`) a fost validat, nu executat — schimbare de setări de vânzare, decizie a proprietarului (Admin → Settings → Markets → Ungaria → ștergerea prezenței web sau a pieței). Pentru on-page: nicio lucrare nu trebuie dublată; toate remedierile de titlu/meta/alt se propagă automat și pe `/ro-hu/` cât timp există, iar după ștergere URL-urile `/ro-hu/*` trebuie să răspundă 301 către echivalentul fără prefix.

**Cum verificăm (falsificabilitate):** n/a (după ștergere: sitemap-ul revine la 575 URL-uri; `curl -sI https://primesupplements.ro/ro-hu/` → 301).

**Indicator timpuriu:** n/a.

### Ce nu am putut măsura

- **Fără Search Console / GA4** (sandbox fără chei Google; cota anonimă PageSpeed Insights epuizată, CrUX/GSC/GA4/Indexing API indisponibile): impactul asupra CTR și afișărilor este dedus din proprietățile titlurilor/meta-urilor, nu măsurat.
- **Fără browser headless și cu scripturile de fetch din plugin blocate** („Refusing configured HTTP proxy”; proxy-ul re-termină TLS și Chromium nu îl acceptă): ierarhia de heading-uri a fost verificată pe cele 24 pagini parsate plus regex pe HTML-ul corpurilor celor 355 articole; heading-urile injectate de JS (Judge.me, Koala upsell) sunt numărate doar unde apar în HTML-ul static.
- **Cereri live limitate** (magazinul răspunde 429 „Verifying your connection...” după rafale): 5 cereri curl cu pauză, deci copiile `/ro-hu/` nu au fost verificate dincolo de homepage, iar paginile paginate doar pe `/collections/all?page=2` și `/blogs/news?page=2`.
- **Câmpurile SEO ale colecțiilor** au fost luate din contextul comun (9 listate ca lipsă) și verificate pe 4 pagini locale; nu exista export de colecții în $R (acum `applied/collections-plan.json` acoperă 23/23).
- **Câmpurile SEO ale articolelor** au venit din metafield-urile Admin `global.title_tag` / `global.description_tag`; trunchierea la 70 de caractere a titlului de fallback a fost observată pe 1 din cele 19 pagini afectate (citicolina) și dedusă pentru restul.
- **`metadata_template.py` este o euristică de șiruri**; verdictele „none” nu înseamnă că meta-urile sunt bune (nu detectează tiparul „Descoperiți … Alegeți PRIME Supplements …”, numărat direct).
- **Starea „după remediere”** este dedusă din planurile aplicate (`applied/*.json`, `applied/logs/*.json`) și din fișierele temei de test (`theme-fixes/`), nu dintr-un crawl nou al magazinului; tema de test nu a fost randată live.
