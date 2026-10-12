## 1. SEO tehnic (crawl, indexare, sitemap, configurare Shopify)

**Scor specialist (la momentul auditului):** 50/100 — seo-technical 52/100 (fundamentele platformei trec: HTTPS, 301, SSR, canonical, 404 reale, robots.txt 2026, sitemap-uri valide; dar indexul e dublat de două ori — 575 duplicate `/ro-hu/` + 58 duplicate B2B —, 6 colecții utilitare/goale și `/pages/thank-you` sunt indexabile și în sitemap, blogul stă după o arhivă de 59 de pagini doar prev/next, iar fiecare pagină livrează un `<head>` dezordonat de 157–189 KB cu viewport blocat; sub-scoruri: crawlability 55, indexability 35, security 80, URL 65, mobile 70, JS rendering 95, structured data 40); seo-sitemap 52/100 (structură, validitate și acoperire impecabile pentru că Shopify generează fișierele, dar 50,0% din URL-uri sunt duplicate `/ro-hu/`, 370 intrări de produs au lastmod = momentul cererii, 10–12 URL-uri utilitare/goale, B2B trimite 52 handle-uri duplicate, 708 intrări sunt articole generate automat nefiltrate); shopify-config 45/100 (vendor „primesupplements1”, productType gol, taxonomie și câmpuri SEO lipsă, alt text 0/493, piața Ungaria, magazinul B2B). **Scor combinat: 50/100** — media celor trei, rotunjită în jos pentru că aceleași trei cauze (piața `/ro-hu/`, magazinul B2B, colecțiile utilitare) sunt confirmate independent de toți trei specialiștii și domină fiecare scor.

**Scor estimat după remedierile din 12.10.2026:** 58/100 — pe magazinul live s-au rezolvat doar problemele de date (vendor, productType, taxonomie, titluri/meta SEO pe 195 produse + 23 colecții + 354 articole + 11 pagini, alt text 493/493); regulile noindex, ordinea `<head>`, viewport-ul, og:image și JSON-LD-ul valid stau în tema de test nepublicată „Impact – SEO fixes 2026-10-12” (id 193875083639), iar `/ro-hu/` și B2B așteaptă decizia proprietarului — după publicarea temei + eliminarea prezenței web `/ro-hu` + parolarea B2B estimăm ~80/100.

### Ce funcționează

- HTTPS forțat: `http://www.primesupplements.ro/` → 301 → `https://www...` → 301 → `https://primesupplements.ro/`; `https://primesupplements1.myshopify.com/products/creatina-creapure` → 301 către domeniul principal (`scratchpad/live-tech/myshop.hdr`); HTTP/2 prin Cloudflare.
- Antete de securitate pe fiecare răspuns 200: `strict-transport-security: max-age=7889238`, `x-frame-options: DENY`, `x-content-type-options: nosniff`, `content-security-policy: block-all-mixed-content; frame-ancestors 'none'; upgrade-insecure-requests;`.
- Canonical auto-referențial pe toate cele 24 de pagini parsate (`$R/parsed/*.json`, câmpul `canonical`); `?sort_by=price-ascending` și `?filter.v.price.gte=50` canonicalizează la URL-ul colecției; `?page=2` este self-canonical cu `rel="prev"/"next"` și sufix de titlu „– Pagina 2”.
- `/search?q=creatina` este servit cu `x-robots-tag: noindex, nofollow` (`scratchpad/live-tech/search.hdr`).
- robots.txt este varianta Shopify curentă (2026; 116 linii, 3.644 bytes): blochează `/collections/*sort_by*`, `/collections/*filter*&*filter*`, combinațiile de taguri cu `+`/`%2B`, `/cart/`, `/checkout`, `/account`, `/*?*preview_theme_id=*`; linia 116 declară `Sitemap: https://primesupplements.ro/sitemap.xml` (corectează fișierul de context, care spunea că sort_by nu e blocat).
- URL-urile inexistente returnează HTTP 404 real (`/this-page-does-not-exist-xyz` → 404, titlu „404 negăsit”, `cache-control: private, no-store`).
- Toate cele 13 fișiere sitemap sunt XML valid (sitemaps.org 0.9 + Google image 1.1), împărțite pe tip de conținut sub un singur index: 1.151 URL-uri / 660.023 bytes, cel mai mare copil 234.346 bytes (2,3% din limita de 50.000 URL-uri, 0,5% din 50 MB); indexul răspunde `application/xml; charset=utf-8`, HTTP/2 200 (ETag `page_cache:91751383415:SitemapIndexController:...`), `cf-cache-status: DYNAMIC` (mereu proaspăt); `/ro-hu/sitemap.xml` → 404, deci există un singur punct de intrare.
- Acoperire completă: 185/185 produse active (0 lipsă, 0 în plus), 354/354 articole publicate (singurul articol nepublicat, creatine-monohydrate-creatina-creapure-debunking-common-supplement, lipsește corect), 11/11 pagini, 23/23 colecții; toate `<loc>` sunt https, pe hostul principal, unice, fără query string, fără URL-uri de sort/filter/paginare, fără variante cu slash final; fără `<priority>`; max 1 imagine per URL.
- lastmod real la articole (354 valori distincte pe 90 de date, urmăresc updatedAt din Admin — ex. 22 ștampilate 2026-09-14, ziua editării în bloc) și la pagini (contact 2025-04-30, creatina-custom 2026-09-14); cele 6 URL-uri de sitemap verificate live (/, /ro-hu, /ro-hu/products/baton-proteic-capsuni, /pages/thank-you, /collections/reduceri, /sitemap_metaobject_pages_1.xml) au răspuns 200 fără lanțuri de redirect.
- Randare server-side: HTML-ul brut al `/products/baton-proteic-capsuni` conține 1.039 cuvinte vizibile (descriere, „Ingrediente”, add-to-cart), articolul citicolina 2.367, `/collections/all` 24 `<product-card>`; fără shell SPA, fără `pushState`/`replaceState` (fără semnal de back-button hijack).
- `<html lang="ro">`; tripleta hreflang (`x-default`, `ro`, `ro-HU`) consistentă cu linkurile de retur pe toate paginile eșantionate.
- Googlebot și ceilalți roboți sunt excluși din loader-ul web-pixel Shopify (regex `/Googlebot|Storebot-Google|bingbot|.../` în `wpmLoader` inline); asset-urile temei sunt ușoare (theme.css 27 KB br, theme.js 35 KB, vendor.min.js 21 KB) ca module ES; fonturile temei (Barlow n4/n7 woff2) și theme.css sunt preîncărcate.
- Cel mai mare HTML (homepage, 617 KB) e sub plafonul de 2 MB al Googlebot; `<title>` și `<link rel="canonical">` sunt în primii 1,5 KB.
- Handle-uri curate, cu cratimă, la produse; variantele au prețuri și SKU; Judge.me furnizează recenziile.
- Tema expune câmpurile SEO ale produselor, colecțiilor și articolelor (metafield-urile Shopify `global.title_tag` / `description_tag`) — exact pârghia pe care s-au bazat remedierile din 12.10.2026.

### Constatări

#### TECH-01 / SITEMAP-01 / SHOPIFY-01 — Piața „Ungaria” publică o a doua copie completă a site-ului sub `/ro-hu/` (575 URL-uri duplicate, self-canonical, conținut românesc identic, prețuri RON)

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Critical | PENDING (acțiune proprietar) | S (eliminare prezență web) / M (fallback Liquid) / L (localizare reală hu) | 0.95–0.98 |

**Dovezi:** Severitate păstrată Critical (shopify-config); seo-technical și seo-sitemap au notat High. `$R/sitemaps/all-urls.txt` = 1.151 URL-uri: 576 principale + 575 sub `/ro-hu/` — oglindă exactă (185 produse, 23 colecții, 354 articole, 11 pagini, index blog, homepage `https://primesupplements.ro/ro-hu` fără slash final); comparația de seturi din `$S/analyze_sitemaps.py`: `ro-hu set == main set minus agents.md` (doar agents.md nu are geamăn). Indexul listează cele 6 sitemap-uri de conținut de două ori (`/sitemap_products_1.xml...` și `/ro-hu/sitemap_products_1.xml...`, child7..12 = 575 URL-uri). Live: `GET /ro-hu/products/creatina-creapure` → 200, `<link rel="canonical" href="https://primesupplements.ro/ro-hu/products/creatina-creapure">`, `og:url` tot `/ro-hu/...`, `<html lang="ro">`, 41 mențiuni „RON”, 72 linkuri interne toate prefixate `/ro-hu/` (`scratchpad/live-tech/rohu_product.body`); HEAD /ro-hu → 200, HEAD /ro-hu/products/baton-proteic-capsuni → 200 (fără redirect). `$R/pages/homepage-ro-hu.html` este aceeași pagină ca `$R/home.html` (2.950 cuvinte, același title, același H1) cu excepția a 175 linkuri `/ro-hu/` și a canonical-ului `https://primesupplements.ro/ro-hu` (fără slash, deși pagina e servită la `/ro-hu/`). `$R/work/hu-reduceri.html`: chiar și colecția goală „Reduceri” e duplicată. hreflang pe fiecare pagină: `x-default` → principal, `ro` → principal, `ro-HU` → `/ro-hu/...` (parsed/home.json, parsed/pages_homepage-ro-hu.json, article.html). Cauza confirmată în Admin (GraphQL read-only): Market „Ungaria” `gid://shopify/Market/97830830455` status ACTIVE, web presence `gid://shopify/MarketWebPresence/73400189303`, subfolderSuffix „hu”, defaultLocale „ro”, alternateLocales []; shopLocales: hu published=false, ro primary; moneda pieței null (prețurile rămân RON). hreflang-ul eticheteză deci un duplicat byte-cu-byte ca „română pentru Ungaria”.

**Impact / pagini afectate:** fiecare URL indexabil: 575 din 1.151 URL-uri din sitemap (50,0%) plus variantele paginate/parametrizate (`?page=2` pe `/ro-hu/collections/all` e și el legat prin hreflang, `scratchpad/live-tech/page2.body`).

**Recomandare:** Decideți ce este Ungaria. **(A, recomandat acum)** Settings → Markets → Ungaria → Domains and languages → eliminați prezența web `/ro-hu` (sau dezactivați piața până există conținut maghiar). Shopify regenerează sitemap-ul în timp real: cele 6 copii `/ro-hu/` și tagurile hreflang `ro-HU` dispar imediat, totalul scade la 576 URL-uri. Mutația `webPresenceDelete(id: "gid://shopify/MarketWebPresence/73400189303")` a fost validată pe 12.10.2026, dar NU executată — modifică setările de vânzare, deci e decizia proprietarului. Shopify nu are redirecturi wildcard: verificați live dacă `/ro-hu/products/...` răspunde 301 sau 404; un 404 pe URL-uri care n-au fost niciodată altceva decât duplicate este acceptabil (Google consolidează pe URL-urile rădăcină deja numite `ro`/`x-default`), dar dacă GSC arată URL-uri `/ro-hu/` cu clicuri, adăugați redirecturi individuale (Online Store → Navigation → URL redirects). **(B, doar dacă Ungaria e o piață reală)** publicați locale-ul `hu` (Translate & Adapt, traduceri complete inclusiv câmpurile SEO), setați-l ca default al pieței, activați prețuri HUF; hreflang devine hu-HU. **(C, paliativ dacă piața trebuie să rămână așa)** în `layout/theme.liquid`, înlocuind linia canonical existentă (varianta seo-sitemap, după handle-ul pieței):

```liquid
{%- if localization.market.handle == 'ungaria' -%}
  <meta name="robots" content="noindex, follow">
  <link rel="canonical" href="{{ canonical_url | replace: 'primesupplements.ro/ro-hu/', 'primesupplements.ro/' | replace: 'primesupplements.ro/ro-hu', 'primesupplements.ro/' }}">
{%- else -%}
  <link rel="canonical" href="{{ canonical_url }}">
{%- endif -%}
```

sau varianta seo-technical, după codul țării:

```liquid
{%- liquid
  assign canonical_href = canonical_url
  if localization.country.iso_code == 'HU'
    assign canonical_href = canonical_url | replace_first: 'primesupplements.ro/ro-hu', 'primesupplements.ro'
    if canonical_href == 'https://primesupplements.ro'
      assign canonical_href = 'https://primesupplements.ro/'
    endif
  endif
-%}
<link rel="canonical" href="{{ canonical_href }}">
{%- if localization.country.iso_code == 'HU' -%}<meta name="robots" content="noindex, follow">{%- endif -%}
```

C lasă cele 575 URL-uri în sitemap (sitemap-urile Shopify nu pot fi editate), deci GSC va raporta „Submitted URL marked noindex”; hreflang-ul `ro-HU` e emis de `content_for_header` și nu poate fi editat în Liquid. A este rezolvarea curată.

**Cum verificăm (falsificabilitate):** `curl -s https://primesupplements.ro/sitemap.xml | grep -c ro-hu` = 0 și copiii însumează 576 URL-uri; `curl -I https://primesupplements.ro/ro-hu/` → 404 sau 301; `/ro-hu/...` nu mai răspunde 200 self-canonical. Dacă GSC mai raportează URL-uri `/ro-hu/` ca „Indexed” după 4 săptămâni, remedierea a eșuat.

**Indicator timpuriu:** numărul de `<loc>` cu `/ro-hu/` în toți copiii (575 → 0); GSC Pages „Duplicate, Google chose different canonical than user” și „Alternate page with proper canonical tag” pentru `/ro-hu/`; Crawl stats „total crawl requests” scade cu ~40–50%.

#### TECH-02 / SITEMAP-14 / SHOPIFY-02 — Magazinul B2B b2b.primesupplements.ro este un duplicat cross-domain indexabil al catalogului (58 URL-uri de produs cu același handle; 52 identice în sitemap-ul B2B)

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| High | PENDING (acțiune proprietar) | S (parolă) / S–M (noindex + robots) | 0.85–0.95 |

**Dovezi:** `$R/pages/b2b-products-sitemap.xml` listează 58 `<loc>` (57 produse + homepage) cu aceleași handle-uri ca magazinul principal (`https://b2b.primesupplements.ro/products/baton-proteic-capsuni`, `/products/creatina-creapure`, ...); 52 handle-uri sunt identice cu cele retail, cu aceleași nume de fișier imagine (01_BATONPROTEIC_strawberry_front.jpg); lastmod 2026-10-12T17:48:30+03:00 pe 57/57. Live `GET https://b2b.primesupplements.ro/sitemap.xml` → 200 (1.018 bytes, 6 copii: agentic_discovery, products_1, pages_1, collections_1, blogs_1, metaobject_pages_1); robots.txt B2B (live, 3.660 bytes) = default Shopify: `User-agent: * / Allow: /`, Sitemap declarat, fără `Disallow: /`. `$R/pages/b2b-product.html`: canonical `https://b2b.primesupplements.ro/products/creatina-creapure` (self, nu magazinul principal), fără `<meta name="robots">`, fără hreflang, 0 linkuri către primesupplements.ro, title „Creatina (Creapure®) 500g/100 serv – PRIME SPORT SUPPLEMENTS SRL / 46260823” (entitatea juridică + CUI folosite ca nume de magazin). `$R/pages/b2b.html` (940 KB): canonical `https://b2b.primesupplements.ro/`, title „PRIME SPORT SUPPLEMENTS SRL / 46260823”. Fără parolă storefront. 5 handle-uri există doar în B2B: baton-proteic-alune-si-caramel, baton-proteic-ciocolata-caramel, baton-proteic-ciocolata-portocale, baton-proteic-lamaie-fructe-de-padure, liver-protect-500-ml.

**Impact / pagini afectate:** 58 pagini de produs (gama de bază de suplimente) + homepage/colecții B2B; 52 URL-uri retail duplicate pe un al doilea host; 5 produse care lipsesc din retail dacă se vând și acolo; `/pages/inregistrare-b2b` din magazinul principal trimite către B2B.

**Recomandare:** Un magazin wholesale nu trebuie să concureze cu cel retail în Google; cumpărătorii B2B se autentifică oricum. Acțiune pe celălalt magazin, a proprietarului (nimic aplicat pe 12.10.2026). **(a)** Activați parola storefront pe magazinul B2B (Online Store → Preferences → Restrict access to visitors with the password): Shopify răspunde 302 către `/password` pentru toate URL-urile, pagina de parolă e servită cu noindex și sitemap-ul e retras — standard pentru magazine B2B-only. **(b)** Dacă rămâne deschis: în `layout/theme.liquid` al temei B2B `<meta name="robots" content="noindex, nofollow">` și un `templates/robots.txt.liquid` cu `User-agent: *\nDisallow: /` (fără linia Sitemap); schimbați numele magazinului din „PRIME SPORT SUPPLEMENTS SRL / 46260823” în „Prime Supplements B2B”. **(c)** Numai dacă trebuie să rămână public: canonical cross-domain pe cele 52 de handle-uri comune, în template-ul de produs al temei B2B: `<link rel="canonical" href="https://primesupplements.ro/products/{{ product.handle }}">` — seo-technical descurajează explicit varianta (Google ar afișa prețuri retail pentru pagini wholesale, semnal ambiguu). Decideți și dacă cele 5 arome doar-B2B se publică în retail (ar intra automat în sitemap_products_1.xml).

**Cum verificăm (falsificabilitate):** `curl -sI https://b2b.primesupplements.ro/products/creatina-creapure` → 302 către `/password` (a) sau HTML cu `noindex` (b); `site:b2b.primesupplements.ro` → 0 rezultate după 4–8 săptămâni, altfel remedierea a eșuat.

**Indicator timpuriu:** numărul de pagini indexate pentru b2b.primesupplements.ro (interogare `site:`) spre 0; GSC URL Inspection pe produsele retail nu mai arată URL-ul b2b ca „Google-selected canonical”; „Duplicate, Google chose different canonical” pentru `/products/` cu canonical `b2b.*`.

#### TECH-03 / SITEMAP-04 / SHOPIFY-06 — Colecțiile utilitare (all, cele-mai-vandute, lansate-recent, 11-tva, frontpage) sunt indexabile și în sitemap, trei dintre ele duplicate complete ale catalogului; tema nu avea nicio logică robots-meta

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| High | READY (tema de test – de publicat) | S | 0.85–0.90 |

**Dovezi:** Severitate păstrată High (seo-technical); seo-sitemap și shopify-config au notat Medium. `$R/sitemaps/child3.xml` (sitemap_collections_1.xml) listează `/collections/all`, `/collections/cele-mai-vandute`, `/collections/lansate-recent`, `/collections/11-tva`, `/collections/frontpage` (gemenii `/ro-hu/` în `child9.xml`). products-all.json: `all`, `cele-mai-vandute`, `lansate-recent` conțin exact aceleași 185 produse active (afișate ca 195 incl. tipurile fantomă) în ordine diferită — trei URL-uri (șase cu `/ro-hu/`) pentru o singură listă, fiecare cu propria serie `?page=N`. `$R/parsed/pages_collection-all.json`: title „All Products” (engleză), H1 „All Products”, canonical self, fără meta robots, 969 cuvinte, paginare „1 / 8” (24 produse/pagină, `templates/collection.json` `products_per_page: 24`). `11-tva` = grupare internă de TVA (15 produse: scortisoara-ceylon-bio-200g, emperor-mass_3000g, pure-isolate-2000g, unt-de-arahide, unt-de-migdale, unt-de-caju, instant-oat-cream-800g-25-serv, fiber-blood-orange și cele 7 SKU-uri crema-de-orez), title/H1 „11% TVA” (`pages_collection-11tva.json`); `frontpage` = colecția „Home page” a temei, cu 1 produs (baton-proteic-capsuni). Toate cinci: 200, self-canonical, fără robots meta, fără descriere, fără imagine (7 colecții fără intrare de imagine în sitemap: frontpage, cele-mai-vandute, lansate-recent, reduceri, all, 11-tva, crema-de-orez); 8 din 23 colecții nu aveau SEO title/description la momentul auditului. `layout/theme.liquid` live nu conținea nicio logică `<meta name="robots">`, deci nimic din magazin nu putea fi noindexat. shopify-config confirmă 200 fără robots meta și pentru `/collections/vendors?q=`, `/collections/types?q=` și `/pages/thank-you` (tratate la TECH-07 și TECH-06 / SITEMAP-06).

**Impact / pagini afectate:** 5 colecții × până la 8 pagini paginate × 2 piețe ≈ 80 URL-uri de listare care re-listează aceleași 185 produse (10 intrări în sitemap + paginările lor); titlul „All Products” e refolosit și de `/collections/all/<tag>` și `/collections/types?q=` (TECH-07/08).

**Recomandare:** **Verificare:** tema de test „Impact – SEO fixes 2026-10-12” (id 193875083639) emite `<meta name="robots" content="noindex,follow">` pentru colecțiile all, cele-mai-vandute, lansate-recent, 11-tva, frontpage, reduceri, vendors, types, pagina thank-you, template-urile search, cart, password și customer; SEO title + description au fost scrise pe toate cele 23 colecții și 17 colecții de categorie au primit descriere de corp pe 12.10.2026. Proprietarul previzualizează și publică tema. **Rămâne (important, din seo-sitemap):** un noindex din temă NU scoate URL-ul din sitemap (Shopify îl elimină doar după ce pagina e noindexată prin mecanismul său). Pârghia documentată Shopify este metafield-ul `seo.hidden` (namespace `seo`, key `hidden`, tip number_integer, valoare 1), care adaugă `noindex,nofollow` ȘI elimină resursa din sitemap și din căutarea storefront (shopify.dev/docs/apps/build/marketing/optimize-storefront-seo). Creați definiția o dată (Settings → Custom data → Collections → Add definition, `seo.hidden`, Integer) și setați 1 pe 11-tva și frontpage (rămân publicate pentru TVA și pentru secțiunea de homepage). Dintre cele trei liste complete, păstrați UNA ca pagină „toate produsele” (recomandat `/collections/all`, SEO title „Toate produsele | Prime Supplements”, descriere de 150–250 cuvinte) și fie ascundeți celelalte două cu seo.hidden=1, fie faceți-le reale: „Cele mai vândute” listă manuală/după tag cu cele 12–24 best-sellere adevărate, „Lansate recent” după tag `nou` cu lansările din ultimele 90 de zile. GraphQL echivalent (de rulat de proprietar, nu de audit): `metafieldsSet(metafields:[{ownerId:"gid://shopify/Collection/<id>", namespace:"seo", key:"hidden", type:"number_integer", value:"1"}])`. Blocul Liquid propus de seo-technical imediat după canonical (acoperă și TECH-05/06/07/08/19; tema de test implementează handle-urile utilitare, search și thank-you, dar nu ramurile `current_tags`, vezi TECH-08):

```liquid
{%- liquid
  assign seo_noindex = false
  assign utility_collections = 'all,cele-mai-vandute,lansate-recent,11-tva,frontpage,reduceri' | split: ','
  if request.page_type == 'collection'
    if utility_collections contains collection.handle
      assign seo_noindex = true
    endif
    if collection.handle == 'vendors' or collection.handle == 'types'
      assign seo_noindex = true
    endif
    if current_tags.size > 0
      assign seo_noindex = true
    endif
    if collection.products_count == 0
      assign seo_noindex = true
    endif
  endif
  if request.page_type == 'blog' and current_tags.size > 0
    assign seo_noindex = true
  endif
  if request.page_type == 'page' and page.handle == 'thank-you'
    assign seo_noindex = true
  endif
  if request.page_type == 'search'
    assign seo_noindex = true
  endif
-%}
{%- if seo_noindex -%}
  <meta name="robots" content="noindex, follow">
{%- endif -%}
```

Păstrați `/collections/all` ca hub intern pentru utilizatori (noindex, follow lasă echitatea de link să curgă) și faceți colecțiile reale de categorie (pudra-proteica, creatina, aminoacizi, ...) paginile de listare indexabile.

**Cum verificăm (falsificabilitate):** după publicarea temei `curl -s https://primesupplements.ro/collections/all | grep -c 'noindex'` = 1; după seo.hidden, sitemap_collections_1.xml listează 18–20 URL-uri și `GET /collections/11-tva` conține `noindex,nofollow`; dacă URL-ul rămâne în sitemap, metafield-ul a fost creat în namespace/tip greșit; dacă GSC arată `/collections/cele-mai-vandute` tot „Indexed” după recrawl, regula nu s-a aplicat.

**Indicator timpuriu:** GSC „Excluded by noindex tag” crește cu numărul URL-urilor utilitare; impresiile migrează de la `/collections/all?page=N` către colecțiile de categorie; numărul URL-urilor de colecție din sitemap (23 → 18–20).

#### TECH-04 — Arhiva blogului are 59 de pagini cu paginare doar prev/next (6 articole/pagină): majoritatea celor 354 articole sunt la 20–59 clicuri de orice hub

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| High | OPEN | M | 0.90 |

**Dovezi:** `$R/pages/blog-index.html`: text de paginare `1 / 59` (`pagination__current`), 11 linkuri distincte de articol pe pagină, doar `href="/blogs/news?page=2"` (de două ori) ca linkuri de paginare; `snippets/pagination.liquid` randează numai `paginate.previous` și `paginate.next` (fără linkuri numerotate `paginate.parts`); `sections/main-blog.liquid` schema `articles_per_page` min 5 / max 24 / default 6; 354 articole publicate → ceil(354/6) = 59 pagini. 346 din 355 articole nu au taguri (5 taguri distincte), deci nu există hub-uri de tag; homepage-ul leagă doar indexul blogului. `rel="next"` există, dar Google nu-l mai folosește din 2019.

**Impact / pagini afectate:** ~340 din 354 articole (tot ce e dincolo de pagina 2), adică cel mai mare activ de conținut al site-ului; același snippet prev/next e folosit și de colecții (`/collections/all` 8 pagini, `/collections/haine-mnx` 4 pagini).

**Recomandare:** Nimic aplicat pe 12.10.2026. (1) Theme editor → Blog → „Articles per page” = 24 (max) → 15 pagini. (2) Linkuri numerotate în `snippets/pagination.liquid`, între ancorele prev și next:

```liquid
{%- for part in paginate.parts -%}
  {%- if part.is_link -%}
    <a class="pagination__item" {% if facet %}is="facet-link"{% endif %} href="{{ part.url }}{{ hash }}" aria-label="{{ 'general.accessibility.go_to_page' | t: index: part.title }}">{{ part.title }}</a>
  {%- elsif part.title == paginate.current_page -%}
    <span class="pagination__item pagination__item--current" aria-current="page">{{ part.title }}</span>
  {%- else -%}
    <span class="pagination__item pagination__item--disabled">{{ part.title }}</span>
  {%- endif -%}
{%- endfor -%}
```

(Shopify emite prima, ultima și o fereastră în jurul paginii curente, deci pagina 15 devine accesibilă în 2 clicuri.) (3) Tag-uiți cele 354 articole în 8–12 taguri tematice (creatina, proteine, aminoacizi, arzatoare, vitamine, antrenament, nutritie, MNX) și legați hub-urile `/blogs/news/tagged/<tag>` din indexul blogului și din `sections/main-article.liquid` (bloc „articole similare” din `blog.articles` filtrat după tag); 3–5 linkuri „articole similare” pe paginile de produs (`sections/main-product.liquid`) pentru produsele cele mai legate. (4) Pagină HTML sitemap (`/pages/harta-site`) cu toate colecțiile și hub-urile de articole, legată din `sections/footer.liquid`. De corelat cu consolidarea blogului (SITEMAP-15): mai puține articole = arhivă mai scurtă.

**Cum verificăm (falsificabilitate):** un crawl (Screaming Frog, raportul de adâncime) arată adâncime maximă de clic ≤ 5 de la `/` pentru toate `/blogs/news/*`; dacă histograma mai are URL-uri la adâncime > 10, a eșuat.

**Indicator timpuriu:** GSC „Crawled – currently not indexed” și „Discovered – currently not indexed” pentru `/blogs/news/`; frecvența de crawl a articolelor adânci în Crawl Stats.

#### SHOPIFY-03 — Vendor „primesupplements1”, productType gol și fără categorie de taxonomie pe toate produsele (REMEDIAT)

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| High | FIXED (live 12.10.2026) | S (aplicat) | 1.0 |

**Dovezi:** Înainte: 64 produse cu vendor `primesupplements1` (handle-ul myshopify) și 121 cu „Prime Supplements”, 0/185 cu product type, 121 fără categorie standard de taxonomie; Product JSON-LD afișa vendorul ca brand; `/collections/vendors?q=primesupplements1` era o pagină publică cu title/H1 „primesupplements1” (TECH-07); handle-ul apărea de ~25–36 ori în HTML-ul fiecărei pagini de produs. Aplicat pe 12.10.2026 prin Admin API, verificat prin recitire: toate cele 195 produse au vendor „Prime Supplements” (108) sau „MNX” (87), un productType românesc (Proteine, Creatină, Aminoacizi, Pre-workout & intra-workout, Arzătoare de grăsimi, Vitamine, Minerale, Suplimente din plante, Suplimente pentru sănătate, Colagen, Omega-3, Gainer, Batoane proteice, Cremă de orez și ovăz, Băuturi instant, Fibre și digestie, Unt de nuci și semințe, Tricouri, Hanorace, Pantaloni, Pantaloni scurți, Pantaloni de trening, Maiouri, Șepci, Shakere, Accesorii sală, Pachete) și o categorie Shopify Standard Product Taxonomy pe toate 195 (ex. `hb-1-9-6-3` Creatine, `hb-1-9-6-8` Protein Supplements, `fb-2-11-9` Rice, `aa-1-1-2-2` T-shirts). Plan: `applied/products-plan.json`.

**Impact / pagini afectate:** 195 produse (185 active); brandul din JSON-LD, atributele Merchant Center și filtrele Search & Discovery.

**Recomandare:** **Verificare:** `products(query:"vendor:primesupplements1")` returnează 0; `products(query:"product_type:''")` returnează 0; `/collections/vendors?q=primesupplements1` nu mai listează produse. **Rămâne:** re-sincronizați canalul Google & YouTube ca Merchant Center să preia brand/tip/categorie; tema de test ia `brand` din vendor în Product JSON-LD (TECH-28). Atenție (consecință de verificat): acum că productType e populat, `/collections/types?q=Proteine` etc. pot răspunde 200 în loc de 404, deci regula noindex pentru `types` din tema de test (TECH-07) devine obligatorie.

**Cum verificăm (falsificabilitate):** interogările GraphQL de mai sus; `curl -s 'https://primesupplements.ro/collections/vendors?q=primesupplements1' | grep -c '<product-card'` = 0.

**Indicator timpuriu:** Merchant Center: atributele brand/categorie completate pe toate ofertele; filtrele de tip în Search & Discovery populate.

#### SHOPIFY-04 — Titluri și descrieri SEO lipsă sau generice la produse, colecții, articole și pagini (REMEDIAT)

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| High | FIXED (live 12.10.2026) | S (aplicat) | 1.0 |

**Dovezi:** Înainte: 105/185 produse fără SEO title și 104 fără SEO description (89 dintre cele lipsă erau MNX), 23 colecții fără descriere (8 fără SEO title/description: frontpage, cele-mai-vandute, lansate-recent, reduceri, all, 11-tva, haine-mnx, crema-de-orez, bauturi), 20 articole fără title_tag, meta generice/keyword-stuffed în rest, 11/11 pagini cu metafield-uri SEO goale; template-ul de titlu era doar `{{ page_title }}` (fără sufix de brand), iar meta description cădea pe descrierea produsului („Mod de administrare După cum este necesar...”, 320 caractere, trunchiat). Aplicat 12.10.2026, verificat prin recitire: 195 titluri + descrieri SEO de produs (45–60 / 120–158 caractere, sufix „ | Prime Supplements” unde încape, fără mențiuni de sănătate neconforme UE), 23 titluri + descrieri SEO de colecție și 17 descrieri de corp (`descriptionHtml`, 3 paragrafe cu date despre produse), 354 din 355 articole cu `global.title_tag` + `description_tag` rescrise (un subiect per articol, cele 47 grupuri de canibalizare au acum titluri diferențiate), 17 articole re-atribuite de la contul „primesupplements1” la „Marius Chera”, 11/11 pagini cu `global.title_tag` + `description_tag`. Planuri: `applied/products-plan.json`, `applied/collections-plan.json`, `applied/articles-plan.json`.

**Impact / pagini afectate:** 195 produse, 23 colecții, 354 articole, 11 pagini — toate șabloanele; CTR în SERP și titlurile afișate.

**Recomandare:** **Verificare:** `articles(first:5, query:"...").metafield(namespace:"global", key:"title_tag")` returnează valorile noi; `seo.title` non-null pentru toate produsele; `curl -s <url> | grep -o '<title>[^<]*'` pe 5 produse MNX arată titlul nou cu sufixul de brand. **Rămâne:** publicarea temei de test, care aduce template-ul de titlu cu sufix de brand + override pentru homepage și meta description-ul homepage-ului (până atunci homepage-ul păstrează „Prime Supplements - Hardcore Sports Nutrition” și descrierea de 220+ caractere fără diacritice). Detaliile de calitate a copy-ului sunt în secțiunea on-page.

**Cum verificăm (falsificabilitate):** `grep -c '| Prime Supplements'` pe title-urile a 10 produse ≥ 8; GSC Performance: titlurile afișate în SERP corespund celor noi după recrawl.

**Indicator timpuriu:** CTR mediu GSC pe paginile de produs/colecție în 4–6 săptămâni; dispariția snippet-urilor „Mod de administrare...” din SERP.

#### TECH-05 / SITEMAP-05 — Colecția goală „Reduceri” răspunde 200, e indexabilă și în ambele sitemap-uri (candidat soft-404), deși 144 produse au reducere

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Medium | READY (tema de test – de publicat) | S | 0.90 |

**Dovezi:** `$R/parsed/pages_collection-reduceri.json`: title „Reduceri”, H1 „Reduceri”, canonical self, 400 cuvinte (doar header/footer), 0 carduri de produs; `$R/sitemaps/child3.xml` și `child9.xml` o listează (`https://primesupplements.ro/collections/reduceri` + geamănul `/ro-hu/`), lastmod 2025-06-23T11:36:44+03:00 (neatinsă de 16 luni), fără imagine; live HEAD → 200; `$R/work/hu-reduceri.html` confirmă duplicatul `/ro-hu/`. Admin: 0 produse, fără SEO title/description la momentul auditului, descriere goală, legată din navigație. În schimb 144 din 185 produse au compare_at_any = true — magazinul are un inventar real de promoții pe care pagina nu-l arată, iar „reduceri suplimente” este cel mai puternic cuvânt-cheie comercial din nișă.

**Impact / pagini afectate:** 2 URL-uri azi, crawlate la fiecare vizită (link din meniu); 144 produse reduse fără pagină hub.

**Recomandare:** **Verificare:** tema de test emite noindex,follow pentru handle-ul `reduceri` (ramura `collection.products_count == 0` din blocul TECH-03 o acoperă și automat); SEO title/description au fost scrise pe 12.10 (SHOPIFY-04). **Rămâne decizia mai bună (proprietar):** Admin → Products → Collections → Reduceri → Automated, condiție „Compare-at price is greater than 0” (opțional AND „Inventory stock is greater than 0”) → listează automat cele 144 produse reduse; SEO title „Reduceri suplimente și haine de sală | Prime Supplements”, meta description, un text intro de ~150 cuvinte, imagine, link în meniul principal — în acest caz scoateți `reduceri` din lista de noindex a temei de test înainte de publicare. Dacă nu se dorește un hub de promoții: `seo.hidden = 1` (vezi TECH-03) ca pagina să iasă și din sitemap.

**Cum verificăm (falsificabilitate):** `/collections/reduceri` randează ≥ 1 produs sau conține `noindex`; GSC URL Inspection arată „Indexed” cu produse ori „Excluded by noindex”; „Soft 404” ar însemna că nu s-a aplicat nimic.

**Indicator timpuriu:** numărul de produse pe pagină (0 → ~100+) și impresiile GSC pentru URL; GSC Pages „Soft 404”.

#### TECH-06 / SITEMAP-06 — `/pages/thank-you` (confirmarea înregistrării B2B) este indexabilă și în sitemap (titlu englez, fără H1, fără meta description)

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Medium | READY (tema de test – de publicat) | S | 0.90–0.95 |

**Dovezi:** live `GET /pages/thank-you` → 200, `<title>Thank you</title>`, canonical self, fără `<meta name="robots">`, fără `<meta name="description">`, fără `<h1>`, 459 cuvinte vizibile din care textul specific e o confirmare de înregistrare B2B („...contul tău va fi aprobat”), 220 KB HTML (`scratchpad/live-tech/thankyou.body`); listată în `$R/sitemaps/child2.xml` (lastmod 2025-06-16T09:13:27+03:00) și `child8.xml`; pages.json: handle thank-you, templateSuffix „thank-you-b2b”, body „” (construită din secțiuni); e ținta de redirect a formularului `/pages/inregistrare-b2b` (template „b2b”, body 100 caractere, și el în sitemap); `grep -ri noindex $R/theme/` → 0 rezultate.

**Impact / pagini afectate:** 2 URL-uri (4 cu `/ro-hu/`); pagină post-formular fără valoare de căutare.

**Recomandare:** **Verificare:** tema de test emite noindex pentru `page.handle == 'thank-you'`; title/description SEO au fost scrise pe 12.10 pe toate cele 11 pagini. **Rămâne:** noindex-ul din temă NU scoate pagina din sitemap_pages_1.xml → Online Store → Pages → thank-you → Metafields → `seo.hidden` = 1 (definiție sub Settings → Custom data → Pages); pagina rămâne publicată (formularul B2B redirecționează tot acolo), primește noindex,nofollow și iese din sitemap. Fallback doar-temă (nu scoate din sitemap): `{%- if page.handle == 'thank-you' -%}<meta name="robots" content="noindex, nofollow">{%- endif -%}` înainte de `</head>`. Titlu pentru utilizatori: „Mulțumim – înregistrare B2B”. Păstrați inregistrare-b2b indexabilă, cu H1/intro reale.

**Cum verificăm (falsificabilitate):** sitemap_pages_1.xml listează 10 URL-uri și sursa `/pages/thank-you` conține `noindex`.

**Indicator timpuriu:** numărul de pagini în sitemap_pages_1.xml (11 → 10); GSC „Excluded by noindex” include URL-ul; zero impresii pentru interogări „thank you”.

#### TECH-07 — Pseudo-colecțiile automate vendor/type sunt live, indexabile și self-canonical (`/collections/vendors?q=primesupplements1`, `/collections/types?q=`)

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Medium | READY (tema de test – de publicat) | S | 0.85 |

**Dovezi:** `scratchpad/tech/live/vendors.body`: 200, `<title>primesupplements1</title>`, H1 „primesupplements1” (handle-ul myshopify folosit ca vendor pe 64 produse la momentul auditului), canonical `https://primesupplements.ro/collections/vendors?q=primesupplements1`, 24 carduri de produs, fără meta description. `scratchpad/tech/live/types.body`: `/collections/types?q=` → 200, title „Prime Supplements”, H1 gol (`<split-lines></split-lines>`), 24 carduri, canonical self; `/collections/types?q=Supliment` → 404 (productType era gol pe 185/185). robots.txt nu are nicio regulă pentru `/collections/vendors` sau `/collections/types`. Expunere internă mică: 0 linkuri de vendor în cele 14 pagini locale (`templates/product.json` nu are bloc „vendor”, `settings.show_vendor` e oprit), dar `snippets/vendor.liquid` ar emite linkuri `url_for_vendor` imediat ce se adaugă blocul.

**Impact / pagini afectate:** 2 URL-uri cunoscute + 1 per valoare distinctă de vendor („Prime Supplements”, „MNX”) și orice `q=` încercat de un crawler; după popularea productType pe 12.10, fiecare tip poate răspunde 200 la `/collections/types?q=<tip>`.

**Recomandare:** **Verificare:** (1) datele au fost corectate pe 12.10 (SHOPIFY-03: vendor „Prime Supplements”/„MNX”, productType populat pe 195 produse); (2) tema de test emite noindex pentru handle-urile `vendors` și `types` — de publicat. **Rămâne:** (3) după ce noindex-ul a fost crawlat, adăugați în `templates/robots.txt.liquid` (TECH-26) `Disallow: /collections/vendors`, `Disallow: /*/collections/vendors`, `Disallow: /collections/types`, `Disallow: /*/collections/types`.

**Cum verificăm (falsificabilitate):** `curl -s 'https://primesupplements.ro/collections/vendors?q=primesupplements1' | grep -c noindex` = 1 după publicare; pagina nu mai are produse.

**Indicator timpuriu:** raportul GSC de interogări nu mai afișează pagina pentru „primesupplements1”; „Excluded by noindex” include `/collections/vendors`.

#### TECH-08 — URL-urile de colecție și blog filtrate pe tag răspund 200, self-canonical, indexabile, cu titluri duplicate

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Medium | OPEN | S | 0.85 |

**Dovezi:** live `GET /collections/all/creatina` → 200, canonical `https://primesupplements.ro/collections/all/creatina`, title „All Products” și H1 „All Products” (identice cu `/collections/all`), 3 carduri de produs, fără meta description (`scratchpad/live-tech/tagurl.body`). `scratchpad/tech/live/tag.body`: `/blogs/news/tagged/sanatate` → 200, canonical self, title „Ultimele articole” și H1 „Ultimele articole” (identice cu indexul blogului). Admin: 97 taguri de produs distincte cu variante de majuscule/plural × 23 colecții = până la 2.231 URL-uri de tag crawlabile; robots.txt blochează doar combinațiile cu `+`. Niciun link intern către URL-uri de tag în paginile eșantionate (`snippets/blog-post-card.liquid` afișează tagurile ca badge-uri text), deci expunerea vine din linkuri externe și din sitemap-urile altor site-uri.

**Impact / pagini afectate:** potențial mii de URL-uri subțiri; 1 confirmat per tipar (colecție + blog).

**Recomandare:** Ramurile `current_tags.size > 0` pentru template-urile collection și blog (din blocul TECH-03) NU sunt în lista modificărilor temei de test (care acoperă handle-uri utilitare, search, cart, password, customer, thank-you), deci trebuie adăugate în `layout/theme.liquid` al temei de test înainte de publicare. Pe termen lung, dacă se construiesc hub-uri de tag pentru blog (TECH-04), scoateți ramura blog și dați hub-urilor titluri unice: în `sections/main-blog.liquid` H1/title folosesc `{{ current_tags | join: ', ' }}` când e setat. Normalizați cele 97 taguri (lowercase, singular) în Admin.

**Cum verificăm (falsificabilitate):** sursa `/collections/all/creatina` conține `noindex`; titlurile hub-urilor de tag diferă de „Ultimele articole”.

**Indicator timpuriu:** GSC „Duplicate without user-selected canonical” / „Crawled – currently not indexed” pentru `/collections/*/*` și `/tagged/`.

#### TECH-09 — `<meta charset>` este al treilea element din `<head>` (byte 1.078, după un script extern sincron și un bloc JSON-LD), încălcând regula de 1.024 bytes

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Medium | READY (tema de test – de publicat) | S | 0.95 |

**Dovezi:** `layout/theme.liquid` live începe `<head>` cu `{% render 'schema-organization' %}`, apoi `<script src="{{ 'pandectes-rules.js' | file_url }}"></script>`, apoi `<meta charset="utf-8">`, apoi viewport. Rezultat pe toate cele 13 pagini locale ale magazinului principal: primul element e `<script type="application/ld+json">` (Organization, ~1 KB), `pandectes-rules.js` la byte 1.022 (sincron, fără `defer`/`async`, fișier pe CDN-ul magazinului), `<meta charset>` la byte 1.078 (`charset_pos: 1078` în analiza head-ului; specificația HTML cere declarația în primii 1.024 bytes și înaintea oricărui script). Pe `$R/pages/article-thin-lcarnitine.html` charset-ul e la byte 2.254, pentru că o aplicație injectează încă un script înaintea lui. Browserele trebuie să pre-scaneze sau să re-parseze când encoding-ul e declarat târziu, iar scriptul sincron blochează parsarea a tot ce urmează (title, canonical, viewport, preload-uri CSS) până se descarcă fișierul de reguli cookie.

**Impact / pagini afectate:** fiecare pagină a magazinului (fișier de layout).

**Recomandare:** **Verificare:** tema de test are charset + viewport pe primele poziții în `layout/theme.liquid`. Ordinea propusă de seo-technical:

```liquid
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="{{ settings.header_background }}">
  <title>...</title>
  {%- if page_description -%}<meta name="description" content="{{ page_description | escape }}">{%- endif -%}
  <link rel="canonical" href="{{ canonical_href }}">
  {%- comment -%} consent rules must still precede content_for_header, which loads the trackers {%- endcomment -%}
  <script src="{{ 'pandectes-rules.js' | file_url }}"></script>
  {% render 'schema-organization' %}
```

Păstrați `pandectes-rules.js` sincron doar dacă Pandectes „blocking mode” e activ; altfel adăugați `defer`. Mutați Organization JSON-LD la finalul `<head>` (poziția nu are semnificație SEO). De publicat după previzualizare.

**Cum verificăm (falsificabilitate):** `curl -s https://primesupplements.ro/ | head -c 1024 | grep -c 'meta charset'` = 1; auditul Lighthouse „charset declared” trece.

**Indicator timpuriu:** auditul Lighthouse best-practices `charset`; estimare mai mică la „Eliminate render-blocking resources”.

#### TECH-10 — Viewport `maximum-scale=1.0, minimum-scale=1.0` dezactivează pinch-zoom pe fiecare pagină

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Medium | READY (tema de test – de publicat) | S | 1.0 |

**Dovezi:** `layout/theme.liquid`: `<meta name="viewport" content="width=device-width, initial-scale=1.0, height=device-height, minimum-scale=1.0, maximum-scale=1.0">`; prezent identic în toate cele 13 pagini locale și în produsul live `/ro-hu/`. Auditul Lighthouse de accesibilitate „[user-scalable=no] is used / maximum-scale less than 5” pică; WCAG 2.2 SC 1.4.4 (Resize text) pică; Safari îl ignoră, Chrome pe Android îl respectă.

**Impact / pagini afectate:** toate paginile, toți utilizatorii mobili (crawlerul mobile-first vede același lucru).

**Recomandare:** **Verificare:** tema de test folosește `<meta name="viewport" content="width=device-width, initial-scale=1">` (default-ul temei Impact), fără `maximum-scale`. Nu e factor de ranking, dar face parte din verificările de experiență a paginii/accesibilitate și de uzabilitate mobilă. De publicat.

**Cum verificăm (falsificabilitate):** `curl -s https://primesupplements.ro/ | grep -c 'maximum-scale'` = 0; Lighthouse a11y „meta-viewport” trece.

**Indicator timpuriu:** scorul Lighthouse de accesibilitate; bounce rate mobil pe paginile de produs.

#### TECH-11 — Fiecare pagină livrează 221–617 KB HTML, cu `<head>` de 157–189 KB, 131–170 KB JavaScript inline și 67–72 taguri script (20 externe)

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Medium | PENDING (acțiune proprietar) | M | 0.80 |

**Dovezi:** analiza head-ului pe capturile locale: homepage 617 KB (head 167 KB, JS inline 145 KB, CSS inline 43 KB, 69 `<script>` din care 20 externe); pagini de produs 337–393 KB (head 166 KB, JS inline 147–152 KB, 71–72 scripturi); `/collections/all` 430 KB (head 188 KB, JS inline 168 KB); `/pages/contact` 221 KB pentru 221 cuvinte de conținut. Cele mai mari blocuri inline pe homepage: `window.jdgmSettings` 30,4 KB (Judge.me), loader-ul web-pixel Shopify 24,6 KB, `window.mktr` 19,3 KB (themarketer.com), `window.PandectesSettings` 16,3 KB. Scripturi externe: 12 din `cdn.shopify.com/extensions/` (app embeds: koala-upsell-gift 120 KB, dondy-whatsapp 64 KB br, loader judgeme, pop-convert, affiliate-by-secomapp ×2, estimator, bloggenauto tracking.js), 6 first-party, plus GTM, portable-wallets 78 KB br, perf-kit 26 KB br, es-modules-shim 15 KB (`$R/perf/*.txt`). Cinci foi de stil render-blocking în head (theme.css, bss-custom.css, 2× Google Fonts CSS, judgeme shopify_v2.css). Risc INP: șase aplicații de consimțământ/marketing/chat/upsell atașează listeners pe fiecare pagină.

**Impact / pagini afectate:** toate șabloanele; LCP/INP pe mobil cele mai expuse (fără date de teren, vezi „Ce nu am putut măsura”).

**Recomandare:** Setări de aplicații — decizia proprietarului, nimic aplicat pe 12.10: (1) dezinstalați sau dezactivați app embeds nefolosite site-wide (Theme editor → App embeds): pop-convert, estimator, bloggenauto tracking.js (generatorul de blog nu are nevoie de pixel pe storefront), affiliate-by-secomapp dacă programul e inactiv; încărcați bula WhatsApp doar după prima interacțiune; (2) scoateți blobul de setări Judge.me din fiecare pagină activând „Load widget asynchronously / minimal settings”; (3) încărcați Microsoft Clarity, TikTok, Pinterest, Facebook prin GTM cu triggere condiționate de consimțământ, nu ca snippete inline separate; (4) după TECH-09/12, re-măsurați cu PSI când există cotă. Țintă: HTML < 250 KB pe paginile de produs, < 10 scripturi externe.

**Cum verificăm (falsificabilitate):** `curl -s https://primesupplements.ro/products/creatina-creapure | wc -c` < 260.000 și `grep -c '<script'` < 45 după curățare; altfel aplicațiile nu au fost scoase.

**Indicator timpuriu:** PSI/CrUX INP și LCP p75 pe mobil pentru template-ul de produs; GSC Core Web Vitals „Poor URLs”.

#### TECH-12 — Aplicația Fontify încarcă Google Fonts Poppins (toate cele 18 stiluri) + Bebas Neue render-blocking, în timp ce tema preîncarcă propriile fonturi Barlow, apoi suprascrise

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Medium | PENDING (acțiune proprietar) | S | 0.90 |

**Dovezi:** `$R/home.html` conține `<!-- BEGIN app block: shopify://apps/fontify/blocks/app-embed/... -->` urmat de `<link rel="preconnect" href="https://cdn.nitroapps.co">`, `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bebas+Neue:wght@400&display=swap">` și `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;...;1,900&display=swap">` (18 variante greutate/stil), plus două `rel="prefetch"` duplicate ale aceluiași CSS. Tema (`layout/theme.liquid`) preîncarcă `settings.heading_font`/`settings.text_font` = Barlow (`barlow_n7...woff2`, `barlow_n4...woff2`, 2× `<link rel="preload" as="font">`) și setează `--heading-font-family: Barlow` / `--text-font-family: Barlow`; Fontify suprascrie cu o regulă `Poppins ... !important`. Efect net: două preload-uri de font nefolosite, două cereri CSS cross-origin render-blocking (fonts.googleapis.com a răspuns 0 bytes la HEAD în `$R/perf/asset-sizes-part2.txt`, adică o conexiune suplimentară completă), 18 fețe Poppins declarate din care tema folosește 2–3.

**Impact / pagini afectate:** toate paginile.

**Recomandare:** Setare de aplicație, decizia proprietarului: eliminați Fontify; setați Poppins și Bebas Neue ca fonturi ale temei în Theme settings → Typography (ambele sunt în biblioteca de fonturi Shopify, servite de `fonts.shopifycdn.com` cu preload-urile pe care tema le emite deja) → dispar preload-urile Barlow și se încarcă doar greutățile folosite (400/500/700). Dacă Fontify trebuie să rămână, configurați doar greutățile folosite și eliminați duplicatele `prefetch`.

**Cum verificăm (falsificabilitate):** `grep -c 'fonts.googleapis.com' home.html` = 0 și `grep -c 'barlow' home.html` = 0 după schimbare.

**Indicator timpuriu:** Lighthouse „Ensure text remains visible during webfont load” și „Eliminate render-blocking resources”; LCP pe textul hero al homepage-ului.

#### TECH-13 / SHOPIFY-07 — Corpurile articolelor generate de BlogGenAuto conțin 2.582 linkuri către primesupplements1.myshopify.com (fiecare link de produs = un hop 301), scripturi, JSON-LD încorporat și linkuri „Powered by” followed

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Medium | PENDING (acțiune proprietar) | M | 0.95 |

**Dovezi:** `$R/shopify/catalog-analysis.md`: 2.582 linkuri în corp către `primesupplements1.myshopify.com` în 349 articole (1.602 de produs, 534 `/cart/`, 446 de colecție), fiecare produs legat de două ori (domeniu principal + myshopify). Numărătoarea shopify-config pe toate corpurile: 3.117 linkuri absolute către `primesupplements1.myshopify.com`, 347/355 articole cu blocuri `<script type="application/ld+json">` (1.379 în total) plus 347 scripturi inline, 194 linkuri followed „Powered by BlogGenAuto”, 534 prețuri hard-codate. Verificat pe `$R/pages/article-2026-citicolina.html`: 23 linkuri `primesupplements1.myshopify.com` în HTML-ul brut. Live `https://primesupplements1.myshopify.com/products/creatina-creapure` → 301 către domeniul principal (`cache-control: private, no-store`). Cele 534 linkuri `/cart/...` sunt blocate de robots.txt (`Disallow: /cart/`) → fundături pentru crawlere.

**Impact / pagini afectate:** 349 din 354 articole; produsele cele mai legate (creatina-monohidrat-micronized-300g-fara-aroma, creatina-creapure, fiber-blood-orange — 23–25 articole fiecare) primesc jumătate din linkurile interne prin redirecturi.

**Recomandare:** **Verificare (tema de test):** `sections/main-article.liquid` neutralizează la randare artefactele BlogGenAuto — linkurile myshopify devin relative/pe domeniul principal, JSON-LD-ul și scripturile încorporate devin inerte, linkul generatorului primește nofollow/sponsored; efectul apare la publicarea temei. **Rămâne (PENDING, proprietar):** importul corpurilor curățate pentru toate cele 355 articole, pregătit în `blog-cleanup/cleaned-bodies.tar.gz` + `blog-cleanup/cleanup-report.json` (script `blog-cleanup/clean.py`): elimină 1.379 blocuri JSON-LD, 347 scripturi, 194 linkuri „Powered by BlogGenAuto”, 534 prețuri hard-codate, 533 linii de urgență, rescrie 2.582 linkuri myshopify, retrogradează 26 H1 suplimentare, normalizează caseta de autor. Importul bulk a fost blocat de politica de integrare din acest mediu; aplicați cu Matrixify (foaia Blog Posts: ID, Body HTML) sau cu un script Admin API `articleUpdate` de ~20 linii. În plus: setați în BlogGenAuto „store URL” = `https://primesupplements.ro`; convertiți linkurile `/cart/<variant>:1` în linkuri de produs; de-duplicați linkurile duble de produs.

**Cum verificăm (falsificabilitate):** `grep -c myshopify.com` pe HTML-ul oricărui articol = 0 după job; `grep -c 'application/ld+json'` pe un articol = numărul blocurilor emise de temă (2), nu 6.

**Indicator timpuriu:** GSC Links „Top linked pages (internal)” arată URL-urile de produs de pe domeniul principal cu de două ori mai multe linkuri; Crawl stats — ponderea răspunsurilor „redirect” scade.

#### TECH-14 / SITEMAP-02 / SITEMAP-03 — lastmod fără valoare în sitemap: toate cele 185 produse poartă timpul generării (diferit la fiecare fetch), iar 21/23 colecții sunt ștampilate în bloc

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Medium | OPEN | S | 0.70–0.95 |

**Dovezi:** Severitate păstrată Medium (SITEMAP-02); TECH-14 și SITEMAP-03 au notat Low. **Produse:** `$R/sitemaps/child1.xml`: 185/185 `<lastmod>2026-10-12T17:33:42+03:00</lastmod>` (o singură valoare; fișier salvat la 14:33 UTC = 17:33 +03:00); `child7.xml` (`/ro-hu/`, descărcat 5 s mai târziu): 185/185 = `2026-10-12T17:33:47+03:00`; re-fetch live sitemap_products_1.xml la 18:43 (`$S/live/products_live.body`): 185/185 = `2026-10-12T18:43:36+03:00`. updatedAt din Admin diferă pentru toate 185 (products-all.json: citrus-bergamot 2026-10-07T07:35:48Z, vitamina-d3-k2 2026-09-16T01:01:57Z; doar 41 produse modificate pe 2026-10-12). Același tipar pe magazinul B2B separat (57/57 = 2026-10-12T17:48:30+03:00) → comportament de platformă, nu setare. Intrarea homepage din sitemap-ul de produse nu are lastmod. **Colecții:** `child3.xml`: 23 intrări, doar 4 valori distincte: 11 = `2026-10-12T14:41:08+03:00`, 10 = `2026-10-12T14:41:07+03:00` (frontpage, accesorii-sala, arzator-de-grasimi, …, all, 11-tva, haine-mnx, crema-de-orez, bauturi); doar alimente-sanatoase (2026-10-08T14:40:42+03:00) și reduceri (2025-06-23T11:36:44+03:00) diferă. Cauză: colecțiile automate re-ștampilează updated_at când un produs membru e atins, iar produsele sunt rescrise în loturi (clustere updatedAt: 9 produse la 2026-09-07T14:51, 7 la 2026-10-12T11:09, 6 la 2026-10-12T09:50, 6 la 2026-10-09T11:10 — un job de sincronizare, nu editări manuale). Articolele sunt sănătoase (354 valori, 90 de date distincte, cele mai noi 2026-09-14 ×22). Notă de reconciliere: ipoteza TECH-14 (o aplicație atinge zilnic fiecare produs) e contrazisă pentru produse de dovezile SITEMAP-02 (timestamp = momentul cererii); rămâne valabilă pentru colecții (SITEMAP-03).

**Impact / pagini afectate:** 370 intrări de produs (185 + 185 `/ro-hu/`) + 42 intrări de colecție (21 × 2 arbori); indirect, credibilitatea lastmod a întregului sitemap.

**Recomandare:** **Produse:** nimic din Admin sau temă nu schimbă asta (sitemap generat de Shopify, needitabil); tratați lastmod ca absent — după modificări reale (descrierile, titlurile SEO și alt-urile din 12.10, schema din tema de test) cereți indexarea prin GSC URL Inspection pentru URL-urile schimbate și păstrați semnale de prospețime on-page (Product JSON-LD actualizat, conținut vizibil). Un sitemap suplimentar cu date reale ar trebui generat și găzduit de o aplicație (Shopify Files pe cdn.shopify.com e alt host; acceptat doar dacă e declarat prin `Sitemap:` în `templates/robots.txt.liquid`) — nu merită bugetul, sitemap-ul principal funcționează pentru descoperire. **Colecții:** identificați aplicația care rescrie produsele (Settings → Apps and sales channels → fiecare app → App permissions cu write_products; candidați văzuți pe site: Koala upsell/gift, Judge.me, aplicația de afiliere, BlogGenAuto, sincronizare inventar/ERP, prețuri BSS B2B; sau Admin API `events` pentru un produs) și limitați-o la câmpurile necesare, scriind doar când valorile se schimbă; lastmod-ul colecțiilor redevine semnificativ.

**Cum verificăm (falsificabilitate):** produse: descărcați sitemap_products_1.xml de două ori la 60 s — dacă valorile sunt identice între fetch-uri și diferă între produse, constatarea nu mai e valabilă; colecții: `grep -o '<lastmod>[^<]*' sitemap_collections_1.xml | sort -u | wc -l` ≥ 10, răspândite pe săptămâni, după temperarea sincronizării.

**Indicator timpuriu:** valori lastmod distincte în sitemap_collections_1.xml (4 → ≥ 10); GSC Crawl stats „By purpose: refresh” pentru `/products/` după o modificare reală de catalog.

#### SITEMAP-15 — Poartă de calitate: 708 din 1.151 intrări din sitemap sunt articole generate automat, nefiltrate

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Medium | PENDING (acțiune proprietar) | M | 0.70 |

**Dovezi:** sitemap_articles_1.xml = 354 URL-uri (×2 = 708, 61,5% din toate intrările), toate cu changefreq weekly. articles-all.json: 347/355 corpuri conțin markerul BlogGenAI, 42 handle-uri se termină în -2/-3/-4/-5 (subiecte regenerate), 47 grupuri de canibalizare pe cuvinte-cheie din titlu acoperind 164 articole, 279 titluri conțin 2025/2026, rafale de publicare de până la 10 articole pe 2026-05-15 (127 în 2026-05). Tabelul „Penalty risk” al skill-ului seo-sitemap clasifică „AI-generated pages without human review” ca nesigur la scară; sitemap-ul le prezintă pe toate 354 ca egal demne de crawl. 0 pagini de locație → fără risc de doorway.

**Impact / pagini afectate:** 354 articole (708 intrări).

**Recomandare:** Decizie editorială a proprietarului (nimic executat pe 12.10): sitemap-ul trebuie să reflecte consolidarea decisă de specialiștii content/cluster — harta 301 pentru cele ~190 articole duplicate/canibalizante e pregătită în constatările de cluster. Pentru fiecare dintre cele 47 grupuri păstrați câștigătorul și ascundeți/fuzionați restul (Admin → Blog posts → Visibility: Hidden + URL redirect către câștigător); ascundeți cele 42 variante regenerate `-2/-3/-4/-5` dacă nu sunt articolul mai bun. Shopify scoate automat articolele ascunse din sitemap_articles (verificat: singurul articol nepublicat lipsește azi). Titlurile/meta au fost deja diferențiate pe 12.10 (SHOPIFY-04), ceea ce reduce canibalizarea de titlu, nu și duplicarea topică. Retrimiteți sitemap.xml în GSC după consolidare și urmăriți „Crawled – currently not indexed” pentru `/blogs/news/`.

**Cum verificăm (falsificabilitate):** dacă numărul de articole din sitemap_articles_1.xml rămâne 354 după consolidare → flagul Hidden nu s-a aplicat.

**Indicator timpuriu:** URL-uri în sitemap_articles_1.xml (354 → ~250–290); GSC „Crawled – currently not indexed” pentru `/blogs/news/`.

#### SHOPIFY-05 — Imaginile de produs nu aveau alt text (REMEDIAT)

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Medium | FIXED (live 12.10.2026) | S (aplicat) | 1.0 |

**Dovezi:** Înainte: 493/493 imagini de produs fără alt (100%, toate cele 185 produse active; eșantionul p1: 50/50 produse cu toate imaginile fără alt; 6 imagini cu alt gol per pagină de produs în capturile locale). Aplicat 12.10.2026: 493 texte alt descriptive în română scrise din imaginea reală (ambalaj, aromă, unghi — față/spate/etichetă/purtat/variantă de culoare) prin `fileUpdate`; plan `applied/alt-text-plan.json`.

**Impact / pagini afectate:** 493 imagini, 185 produse; Google Images și accesibilitate; cum sitemap-ul expune doar imaginea principală (SITEMAP-07), alt-ul din HTML e canalul principal de descoperire a galeriilor.

**Recomandare:** **Verificare:** `curl -s https://primesupplements.ro/products/baton-proteic-capsuni | grep -o '<img[^>]*alt="[^"]*"' | head` arată texte românești descriptive; în Admin → Products → Media alt-urile sunt completate. **Rămâne:** imaginile din secțiunile temei (hero, tile-uri de categorie) se setează în theme editor și încă au nevoie de alt (VISUAL-04); imaginile de colecție lipsă pe 7 colecții (SITEMAP-07).

**Cum verificăm (falsificabilitate):** `grep -c 'alt=""'` pe o pagină de produs ≤ numărul imaginilor de temă/decor (nu de produs); media cu alt gol în `files(query:"media_type:IMAGE")` = 0 pentru produse.

**Indicator timpuriu:** GSC Search type = Image — impresii pentru `/products/`.

#### TECH-15 — Variantele cu slash final răspund 200 (un URL duplicat per pagină, atenuat de canonical)

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Low | OPEN | S | 0.90 |

**Dovezi:** live `GET /products/baton-proteic-capsuni/` → 200, 345.073 bytes (identic cu pagina fără slash), canonical și og:url `https://primesupplements.ro/products/baton-proteic-capsuni` (`scratchpad/live-tech/slash.*`). Niciun link intern cu slash final în cele 14 pagini locale. Shopify nu face 301 pe slash final, iar URL redirects nu suportă wildcard.

**Impact / pagini afectate:** fiecare URL (comportament de platformă).

**Recomandare:** Nimic de schimbat pe platformă; păstrați canonical-ul (deja corect) și asigurați-vă că linkurile externe/de campanie și blogul nu folosesc niciodată forma cu slash. Monitorizați în GSC.

**Cum verificăm (falsificabilitate):** GSC Pages „Duplicate, Google chose different canonical” cu URL-uri `/.../` ar însemna că canonical-ul e suprascris.

**Indicator timpuriu:** numărul URL-urilor cu slash final în GSC „Alternate page with proper canonical tag”.

#### TECH-16 — `http://www` este un lanț de redirect în doi pași

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Low | OPEN | S | 1.0 |

**Dovezi:** `http://www.primesupplements.ro/` → 301 `https://www.primesupplements.ro/` → 301 `https://primesupplements.ro/` (`scratchpad/live-tech/http_www.hdr`, `www_https.hdr`; același lanț pe un URL de produs în `scratchpad/tech/live/chain_httpwww.hdr`). `http://primesupplements.ro/` și `https://www...` sunt un singur hop. HSTS nu e pe lista preload și nu are `includeSubDomains`, deci primul hop e inevitabil la prima vizită.

**Impact / pagini afectate:** orice link inbound sau URL tastat cu `http://www`.

**Recomandare:** Gestionat de Shopify/Cloudflare; remedierea practică e ca fiecare citare externă, director, GBP, profil social și reclamă să folosească `https://primesupplements.ro/` (fără www). Opțional: hstspreload.org ar cere `includeSubDomains; preload`, pe care Shopify nu le expune.

**Cum verificăm (falsificabilitate):** `curl -sIL http://www.primesupplements.ro/ | grep -c '^HTTP/'` = 3 azi; nu poate fi redus pe Shopify.

**Indicator timpuriu:** ponderea țintelor `http://www` în auditul de backlinkuri.

#### TECH-17 / SITEMAP-12 — Trei handle-uri conțin diacritice percent-encoded, iar canonical-ul folosește altă capitalizare hex decât sitemap-ul și hreflang-ul

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Low | OPEN | S | 0.75–0.90 |

**Dovezi:** `$R/sitemaps/all-urls.txt` (hex majuscule): `/pages/termeni-%C8%99i-condi%C8%9Bii`, `/blogs/news/bcaa-vs-eaa-diferen%C8%9Be-%C8%99i-beneficii-pentru-culturisti-ghid-complet`, `/blogs/news/water-out-tinctura-solu%C8%9Bia-naturala-pentru-eliminarea-reten%C8%9Biei-de-apa` (×2 cu `/ro-hu/`). `$R/pages/article.html`: canonical și og:url cu hex minuscule (`diferen%c8%9be-%c8%99i`), hreflang pe aceeași pagină cu majuscule (`diferen%C8%9Be-%C8%99i`) — trei ortografii byte-diferite ale aceluiași URL pe o singură pagină (sitemap, canonical, hreflang). articles-all.json marchează exact aceste 2 handle-uri (handle_has_percent_or_diacritics), pages.json handle-ul `termeni-și-condiții`. RFC 3986 tratează capitalizarea hex ca echivalentă și Google normalizează, dar formele mixte fragmentează raportarea, unele crawlere nu normalizează, și sunt un declanșator cunoscut pentru „Duplicate, Google chose different canonical”.

**Impact / pagini afectate:** 3 URL-uri (6 intrări cu `/ro-hu/`).

**Recomandare:** Redenumiți handle-urile în ASCII cu „Create a URL redirect” bifat (Shopify adaugă 301): `termeni-si-conditii`, `bcaa-vs-eaa-diferente-si-beneficii-pentru-culturisti-ghid-complet` (seo-technical propune forma scurtă `bcaa-vs-eaa-diferente-si-beneficii-pentru-culturisti`), `water-out-tinctura-solutia-naturala-pentru-eliminarea-retentiei-de-apa` (sau scurt `water-out-tinctura-solutia-naturala-retentie-apa`); actualizați linkul din meniul footer/legal către noul handle de pagină; configurați BlogGenAuto să translitereze diacriticele în handle-urile generate (handle-uri viitoare doar ASCII).

**Cum verificăm (falsificabilitate):** sitemap-ul live nu mai conține `%C8` (`grep -c '%'` pe fișierele de sitemap = 0); vechile URL-uri fac 301.

**Indicator timpuriu:** numărul de `<loc>` percent-encoded (6 → 0); GSC arată URL-ul ASCII ca canonical.

#### TECH-18 — Igienă URL: 57 URL-uri din sitemap depășesc 100 de caractere, 42 handle-uri de articol se termină în -2…-5 și 134 conțin fragmente englezești

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Low | PENDING (acțiune proprietar) | M | 0.80 |

**Dovezi:** `$R/sitemaps/all-urls.txt`: 57 URL-uri principale > 100 caractere (1 > 120; cel mai lung 124: `/blogs/news/creatina-si-volumizarea-musculara-secretele-absorbtiei-creatinei-optimizare-rezultate`; un produs: `/products/pachet-mix-arome-bautura-instant-frutilu-fara-zahar-18-plicuri-x-10g-set-degustare`, 119). 42 handle-uri de articol se termină în `-2..-5` (ex. `/blogs/news/acetyl-l-carnitine-l-carnitine-1000-80-caps-2`, `...-budget-smart-supplementation-s` și `-s-2`), adică subiecte regenerate. 134 handle-uri de articol conțin cuvinte englezești (`-travel-`, `-workout-`, `-benefits-`, `-guide-`...). Mai multe sluguri repetă termenul principal de 2–3 ori (`spirulina-spirulina-...-spirulina`).

**Impact / pagini afectate:** ~140 din 354 articole.

**Recomandare:** De tratat în consolidarea blogului (decizie editorială, PENDING; harta 301 e pregătită în constatările de cluster): la fuzionarea duplicatelor `-2` păstrați handle-ul mai scurt și faceți 301 pentru rest; handle-uri noi de maximum 5–7 cuvinte, doar în română. Nu redenumiți în masă URL-uri care rankează bine doar pentru lungime.

**Cum verificăm (falsificabilitate):** numărul URL-urilor > 100 caractere din sitemap scade după consolidare.

**Indicator timpuriu:** niciunul direct; urmăriți grupurile de canibalizare din catalog-analysis.md.

#### TECH-19 — Pagina goală `/search` este indexabilă, în timp ce `/search?q=` nu este

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Low | READY (tema de test – de publicat) | S | 0.95 |

**Dovezi:** `scratchpad/tech/live/search_empty.*`: `GET /search` → 200, fără `x-robots-tag`, canonical `https://primesupplements.ro/search`, title „Caută”, meta description = descrierea homepage-ului („Magazin online cu suplimente nutritive...”); `GET /search?q=creatina` → `x-robots-tag: noindex, nofollow` (antet). Legată site-wide din header (2 linkuri `/search` pe fiecare pagină).

**Impact / pagini afectate:** 1 URL (×2 piețe).

**Recomandare:** **Verificare:** tema de test emite noindex pentru template-ul search (ramura `request.page_type == 'search'` din blocul TECH-03, `noindex, follow`). De publicat.

**Cum verificăm (falsificabilitate):** sursa `/search` conține `noindex`.

**Indicator timpuriu:** GSC „Excluded by noindex” include `/search`.

#### TECH-20 — `og:image` este emis cu `http://` pe fiecare pagină

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Low | READY (tema de test – de publicat) | S | 1.0 |

**Dovezi:** `$R/home.html`: `<meta property="og:image" content="http://primesupplements.ro/cdn/shop/files/prime-supplements.jpg?v=1747657200&width=2048">`; paginile de produs la fel (`http://primesupplements.ro/cdn/shop/files/01_BATONPROTEIC_strawberry_front.jpg...`), un URL nesecurizat per pagină; `og:image:secure_url` este https. Sursa: `snippets/social-meta-tags.liquid`. CSP `upgrade-insecure-requests` ascunde problema în browsere, dar scraperele Facebook/LinkedIn/WhatsApp descarcă URL-ul http literal și unele îl resping.

**Impact / pagini afectate:** toate paginile.

**Recomandare:** **Verificare:** tema de test (`snippets/social-meta-tags.liquid`) emite og:image cu https — `{{ image | image_url: width: 1200 }}` prefixat cu `https:` (Shopify returnează `//` protocol-relative) sau `| replace: 'http://', 'https://'`. De publicat.

**Cum verificăm (falsificabilitate):** `grep -c 'content="http://'` pe orice pagină = 0.

**Indicator timpuriu:** Facebook Sharing Debugger fără avertisment pentru imagine.

#### TECH-21 — Resource hints învechite: `dns-prefetch productreviews.shopifycdn.com` (Shopify Product Reviews, retrasă) și `preconnect cdn.nitroapps.co` (Fontify) deschid conexiuni pe care nimic nu le folosește

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Low | OPEN | S | 0.95 |

**Dovezi:** `layout/theme.liquid` hard-codează `<link rel="dns-prefetch" href="https://productreviews.shopifycdn.com">`; aplicația de recenzii e Judge.me (dns-prefetch către cdn.judge.me, cdn1.judge.me, api.judge.me sunt și ele prezente). `cdn.nitroapps.co` apare exact o dată pe pagină (preconnect-ul însuși, injectat de blocul Fontify), fără niciun asset încărcat de acolo. În plus, două `rel="prefetch"` duplicate ale celor două fișiere CSS Google Fonts deja încărcate ca stylesheet.

**Impact / pagini afectate:** toate paginile (4 hint-uri irosite).

**Recomandare:** Ștergeți linia `productreviews.shopifycdn.com` din `layout/theme.liquid` — nu e în lista modificărilor temei de test, de adăugat înainte de publicare; eliminarea Fontify (TECH-12) scoate celelalte trei.

**Cum verificăm (falsificabilitate):** hint-urile lipsesc din sursa paginii.

**Indicator timpuriu:** niciunul (micro-optimizare).

#### TECH-22 — Antetele de securitate sunt limitate de platformă: HSTS 91 de zile fără preload/includeSubDomains, fără Referrer-Policy sau Permissions-Policy, CSP minimal

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Low | OPEN | S | 1.0 |

**Dovezi:** toate răspunsurile 200: `strict-transport-security: max-age=7889238` (~91 zile, fără `includeSubDomains`, fără `preload`); `content-security-policy: block-all-mixed-content; frame-ancestors 'none'; upgrade-insecure-requests;` (fără `default-src`/`script-src`); fără `referrer-policy` (doar pagina de challenge Cloudflare 429 trimite `referrer-policy: same-origin`); fără `permissions-policy`. `x-frame-options: DENY` și `x-content-type-options: nosniff` prezente.

**Impact / pagini afectate:** toate răspunsurile; Shopify nu permite comercianților să seteze antete de răspuns.

**Recomandare:** Nicio acțiune posibilă pe Shopify; documentat ca acceptat. Antetele de securitate nu sunt factor de ranking (HTTPS e singurul semnal ușor). Dacă se dorește o politică de referrer strictă, `<meta name="referrer" content="strict-origin-when-cross-origin">` poate fi adăugat în `layout/theme.liquid` (protejează și scurgerile de parametri de afiliere/UTM).

**Cum verificăm (falsificabilitate):** n/a (platformă).

**Indicator timpuriu:** niciunul.

#### TECH-23 / SITEMAP-13 — 30 de produse complet epuizate rămân indexabile și în sitemap; indexul listează și două sitemap-uri copil goale

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Low | OPEN | S–M | 0.80–0.85 |

**Dovezi:** `$R/shopify/products-all.json`: 30 rânduri cu `inventory_total <= 0` / `available_any = false` — 22 articole MNX (mnx-extra-t-shirt-industrial-black/-bronze/-navy-blue, mnx-extra-t-shirt-hc-2-0-limited-white/-black/-burgundy/-dark-grey, mnx-extra-t-shirt-basic-grey/-vivid-red/-light-pink, mnx-workout-top-golden-era-deep-purple, mnx-workout-top-hammer-3-0-white/-black/-grey, mnx-ribbed-shorts-hammer-black/-white/-grey/-green-lint, mnx-shorts-golden-era-2-0-black, mnx-extra-t-shirt-embossed-mosaic-blue, mnx-shaker-600-ml, tricou-sala-made-of-iron-bumbac-premium-negru) și 8 suplimente/accesorii (vitamina-d3-k2, zinc-citrate-80-caps, sapca-prime, baton-proteic-ciocolata-fructe-de-padure, water-out-500-ml, shaker-premium-accesorizat-500-ml, instant-oat-cream-800g-25-serv, enzima-nattokinaza-80-caps). instant-oat-cream-800g-25-serv e printre cele 5 produse cele mai legate din blog (23 articole) și e epuizat peste tot. Toate cele 185 produse sunt în `$R/sitemaps/child1.xml` (fără filtru de disponibilitate, default Shopify). `child6.xml` și `child12.xml` (`sitemap_metaobject_pages_1.xml` + geamănul `/ro-hu/`) sunt fișiere `<urlset>` goale, încă referențiate de index (detaliu la SITEMAP-10).

**Impact / pagini afectate:** 30 produse (60 intrări) = 16% din sitemap-ul de produse; 2 sitemap-uri goale (inofensive).

**Recomandare:** Produsele care revin în câteva săptămâni: păstrați-le (sitemap + pagină cu „Anunță-mă când revine” și blocul de alternative — Impact „Complementary products”). Culorile MNX discontinuate: status Draft/Archived (Shopify le scoate din sitemap, URL-ul face 404) + URL redirect (Admin → URL redirects) către culoarea supraviețuitoare sau colecția stilului; ori statusul Unlisted (noindex + în afara sitemap-ului, cumpărabil prin link) unde e disponibil în Admin. Re-stocați sau marcați pre-order cele 8 SKU-uri de suplimente, începând cu instant-oat-cream-800g-25-serv. Tema de test marchează `availability` corect în Offer (TECH-28). Sitemap-urile goale nu cer acțiune.

**Cum verificăm (falsificabilitate):** numărul produselor din sitemap cu available_any = false < 10; handle-urile arhivate fac 301; numărul de produse din sitemap scade cu cele arhivate.

**Indicator timpuriu:** numărul de produse epuizate în sitemap (30 → < 10); GSC „Soft 404” pentru URL-uri de produs; avertismente „out of stock” în Merchant Center.

#### SITEMAP-07 — Intrările de imagine din sitemap acoperă doar imaginea principală (185 din 493 imagini de produs) și folosesc taguri depreciate

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Low | OPEN | S | 0.90 |

**Dovezi:** child1.xml: exact un `<image:image>` per produs (185 imagini; products-all.json totalizează 493 imagini de produs; 128 produse au mai multe imagini decât expune sitemap-ul, ex. baton-proteic-capsuni image_count 2 → 1 în sitemap). Fiecare intrare de produs are `<image:title>` și un `<image:caption></image:caption>` gol (185/185 goale); articolele au `<image:title>` (354) și `<image:caption>` (335); Google a depreciat caption/title/geo_location/license în 2022 și le ignoră. Colecții: 16/23 cu imagine (cele 7 fără: frontpage, cele-mai-vandute, lansate-recent, reduceri, all, 11-tva, crema-de-orez). Imaginile de produs din sitemap sunt pe cdn.shopify.com (permis pentru extensia de imagini).

**Impact / pagini afectate:** 185 produse (370 intrări), 354 articole, 7 colecții.

**Recomandare:** Generat de platformă, needitabil; pârghia e on-page: Google descoperă imaginile din galerie din HTML-ul produsului — alt-urile au fost scrise pe 12.10 (SHOPIFY-05: 493/493). **Rămâne:** încărcați o imagine de colecție pentru cele 7 colecții fără (Admin → Collections → Image), ca sitemap-ul de colecții și tagurile OG să primească imagine — cel puțin pentru crema-de-orez și pentru reduceri dacă devine hub de promoții (celelalte 5 sunt utilitare și urmează să fie noindexate). Taguri depreciate: nicio acțiune.

**Cum verificăm (falsificabilitate):** dacă impresiile Google Images pentru `/products/` nu cresc după alt text → blocajul e descoperirea, nu descrierea.

**Indicator timpuriu:** colecții cu `<image:image>` în sitemap_collections_1.xml (16 → 23); impresii GSC Search type = Image.

#### SHOPIFY-08 — Produsele draft/unlisted împart colecțiile automate cu produsele live

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Low | OPEN | S | 0.85 |

**Dovezi:** catalog: 195 produse (185 active, 7 draft, 3 unlisted); 7 produse DRAFT și 3 UNLISTED stau în colecțiile automate („cele-mai-vandute”, „lansate-recent”); cele unlisted sunt accesibile prin URL și indexabile (constatarea shopify-config); apendicele seo-sitemap notează că statusul Unlisted ar trebui să implice noindex + lipsă din sitemap — diferența trebuie verificată live.

**Impact / pagini afectate:** 3 URL-uri unlisted accesibile; 7 drafturi care pot apărea în numărători și în regulile automate.

**Recomandare:** Decideți per produs: publicați (pachetele Nitrox3D+Creapure și Fiber+Creapure sunt ținte SEO bune — au primit deja SEO title/description pe 12.10, ca toate cele 195 produse) sau arhivați; țineți produsele unlisted în afara sitemap-ului setându-le draft când nu se vând.

**Cum verificăm (falsificabilitate):** `curl -s https://primesupplements.ro/products/<handle-unlisted> | grep -c noindex` = 1 (altfel pagina e indexabilă și trebuie trecută pe draft); `products(query:"status:draft")` conține doar produse în pregătire intenționată.

**Indicator timpuriu:** numărul de produse DRAFT/UNLISTED în colecțiile automate (10 → 0).

#### TECH-24 — IndexNow nu este implementat

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Info | OPEN | S | 0.90 |

**Dovezi:** Shopify nu trimite ping-uri IndexNow nativ; nicio referință `/<key>.txt` sau `indexnow` în temă, robots.txt sau antete. Cota Bing/Yandex în România e mică, iar Google nu consumă IndexNow.

**Impact / pagini afectate:** n/a.

**Recomandare:** Opțional; dacă traficul Bing devine material, folosiți o aplicație Shopify IndexNow sau API-ul de trimitere URL din Bing Webmaster Tools. Nu e prioritate.

**Cum verificăm (falsificabilitate):** n/a.

**Indicator timpuriu:** Bing Webmaster Tools „Index Explorer” — prospețimea indexului.

#### TECH-25 — Randarea JavaScript trece; doar conținutul de recenzii Judge.me este injectat prin JS

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Info | READY (tema de test – de publicat) | S | 0.85 |

**Dovezi:** cuvinte vizibile în HTML-ul brut: produs 1.039 (`$R/pages/product.html`: descriere + „Ingrediente” + buy box prezente), articol 2.367 (`$R/pages/article-2026-citicolina.html`), grila de colecție 24 `<product-card>` în `$R/pages/collection-all.html`; `is_spa` nu a putut fi calculat (render_page.py blocat de proxy-ul sandbox), deci output-ul randat nu a fost comparat. Widget-ul Judge.me e încărcat de `judgeme-775/assets/loader.js` și niciun text de recenzie sau șir `aggregateRating` nu există în HTML-ul vreunui produs (`judgeme_jsonld: False` pe 14 pagini), deci recenziile și stelele sunt invizibile pentru agenții fără randare și pentru Google până la randare.

**Impact / pagini afectate:** toate paginile de produs.

**Recomandare:** **Verificare:** tema de test (`snippets/schema-product-enhanced.liquid`) emite `aggregateRating` din metafield-urile Judge.me direct în HTML-ul server — de publicat. **Rămâne:** în Judge.me activați „Preloaded reviews” pentru textul recenziilor în SSR; activați „Rich snippets / JSON-LD in theme” doar dacă nu dublează blocul temei (un singur Product JSON-LD cu aggregateRating per pagină). Nu e nevoie de lucru SSR suplimentar pe temă.

**Cum verificăm (falsificabilitate):** `grep -c aggregateRating` pe o pagină de produs cu recenzii = 1.

**Indicator timpuriu:** apariția raportului GSC „Review snippets”.

#### TECH-26 — robots.txt este default-ul Shopify 2026 (corectează contextul): sort_by și multi-filter sunt blocate; rămân lacune pentru vendors/types/tag/ro-hu

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Info | OPEN | S | 0.95 |

**Dovezi:** `scratchpad/tech/live/robots.txt` (116 linii): `Disallow: /collections/*sort_by*`, `/*/collections/*sort_by*`, `/collections/*filter*&*filter*`, `/collections/*+*`, `/blogs/*+*`, `/*?*preview_theme_id=*`, `/cart/`, `/checkout`, `/account`, `/cart.js`, `/recommendations/products`; `Allow: /` pentru `*`; un grup separat `adsbot-google`; `Sitemap:` declarat; nicio regulă pentru `/search`, `/collections/vendors`, `/collections/types`, `/collections/<handle>/<tag>`, `/blogs/news/tagged/`, `/ro-hu/`; fără reguli pentru crawlere AI și fără `Content-Signal` (`agentic_fix.py robots` propune `Content-Signal: search=yes, ai-input=yes, ai-train=no`; scopul secțiunii agentic). `/search?q=` se bazează pe antetul `x-robots-tag`, nu pe robots.txt.

**Impact / pagini afectate:** politica de crawl site-wide.

**Recomandare:** Creați `templates/robots.txt.liquid` DOAR după ce regulile noindex (TECH-03, tema de test) au fost crawlate, ca Google să vadă noindex-ul înainte de a fi blocat:

```liquid
{%- for group in robots.default_groups -%}
  {{ group.user_agent }}
  {%- for rule in group.rules %}
  {{ rule }}
  {%- endfor -%}
  {%- if group.user_agent.value == '*' %}
  Disallow: /collections/vendors
  Disallow: /*/collections/vendors
  Disallow: /collections/types
  Disallow: /*/collections/types
  {%- endif %}
  {%- if group.sitemap != blank %}
  {{ group.sitemap }}
  {%- endif %}
{%- endfor -%}
```

Nu blocați `/ro-hu/` (Google trebuie să vadă canonical-ul/noindex-ul) și nici `/search` (antetul o face deja).

**Cum verificăm (falsificabilitate):** `curl -s https://primesupplements.ro/robots.txt | grep -c vendors` = 2.

**Indicator timpuriu:** GSC Crawl stats „Blocked by robots.txt” pentru `/collections/vendors`.

#### TECH-27 — Tratarea 404 este corectă; pagina de eroare nu are H1 și canonicalizează la `/404`

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Info | OPEN | S | 0.90 |

**Dovezi:** `GET /this-page-does-not-exist-xyz` → HTTP 404, titlu „404 negăsit”, `<link rel="canonical" href="https://primesupplements.ro/404">`, fără `<h1>`, 75 linkuri, 219 KB, `cache-control: private, no-store`; `GET /collections/types?q=Supliment` → tot 404.

**Impact / pagini afectate:** template-ul de eroare.

**Recomandare:** Adăugați un H1 („Pagina nu a fost găsită”), o casetă de căutare și linkuri către colecțiile principale în `templates/404.json`; canonical-ul către `/404` e default Shopify și inofensiv.

**Cum verificăm (falsificabilitate):** pagina 404 conține un `<h1>`.

**Indicator timpuriu:** lista GSC „Not found (404)” rămâne stabilă (fără linkuri interne rupte noi).

#### TECH-28 — Date structurate prezente pe fiecare șablon, dar duplicate și parțial invalide (detaliile sunt la specialistul schema)

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Info | READY (tema de test – de publicat) | M | 0.90 |

**Dovezi:** numărul blocurilor JSON-LD: homepage 2, produs 3–4, colecție 2, articol 2 din temă plus 4 încorporate de BlogGenAuto în corpul articolului (6 pe `$R/pages/article-2026-citicolina.html`: Article/BreadcrumbList/FAQPage/Person duplicate). `layout/theme.liquid` are `{%- comment -%}{%- render 'microdata-schema' -%}{%- endcomment -%}` (snippetul întreținut de temă e dezactivat) și snippete custom cu bug-ul de escapare a newline-urilor descris în context (Product JSON invalid pe 7/13 produse eșantionate, Article pe 2/2).

**Impact / pagini afectate:** toate paginile de produs și articol.

**Recomandare:** **Verificare:** tema de test rescrie `schema-product-enhanced.liquid` (filtrul `json`, Offer per variantă cu preț numeric, priceValidUntil, availability, sku/gtin, hasMerchantReturnPolicy 14 zile RO, shippingDetails 20 RON / gratuit ≥ 300 RON, aggregateRating din Judge.me, brand din vendor), `schema-article.liquid` (Article valid cu Person „Marius Chera” + jobTitle, publisher, image, wordCount), `schema-collection.liquid` (CollectionPage + ItemList + BreadcrumbList), `schema-organization.liquid` (Organization/OnlineStore cu legalName, taxID, telephone, address Cisnădie, sameAs reale; WebSite + SearchAction pe homepage), `schema-breadcrumb-enhanced.liquid` (sare peste colecțiile utilitare); `sections/main-article.liquid` face inerte blocurile încorporate de BlogGenAuto. Din perspectivă tehnică: datele structurate sunt în HTML-ul inițial (bine, fără întârziere de injectare JS). Detaliile și validarea în secțiunea de date structurate (findings/schema.md).

**Cum verificăm (falsificabilitate):** Rich Results Test parsează fiecare pagină de produs fără „Parsing error”.

**Indicator timpuriu:** numărul de elemente în rapoartele GSC „Products” / „Merchant listings”.

#### SITEMAP-08 — `<changefreq>` pe toate cele 1.151 intrări (ignorat de Google)

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Info | OPEN | S | 1.0 |

**Dovezi:** fiecare `<url>` are changefreq: `daily` pe 418 intrări (home, 370 produse, 46 colecții), `weekly` pe 733 (pagini, bloguri, articole, agents.md); `<priority>` e absent. Google ignoră changefreq și priority.

**Impact / pagini afectate:** 1.151 intrări.

**Recomandare:** Nicio acțiune posibilă (output Shopify); inofensiv.

**Cum verificăm (falsificabilitate):** n/a.

**Indicator timpuriu:** n/a.

#### SITEMAP-09 — Indexul sitemap nu are `<lastmod>` per copil și conține un comentariu XML

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Info | OPEN | S | 1.0 |

**Dovezi:** `$R/sitemap.xml`: 13 intrări `<sitemap><loc>`, 0 `<lastmod>`; un nod comentariu („This is the parent sitemap ... can not be edited manually, but is kept up to date in real time”); loc-urile copiilor product/page/collection folosesc `?from=...&amp;to=...` (valid, entity-escaped). Fără lastmod la nivel de index, Google re-descarcă toți cei 13 copii la fiecare vizită (660 KB, neglijabil la această dimensiune).

**Impact / pagini afectate:** fișierul index.

**Recomandare:** Nimic (output Shopify); dimensiunea îl face irelevant.

**Cum verificăm (falsificabilitate):** n/a.

**Indicator timpuriu:** n/a.

#### SITEMAP-10 — Două sitemap-uri metaobject goale sunt referențiate de index

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Info | OPEN | M (doar dacă se urmărește oportunitatea) | 0.90 |

**Dovezi:** child6.xml și child12.xml (sitemap_metaobject_pages_1.xml și geamănul `/ro-hu/`): 172 bytes fiecare, `<urlset>` cu 0 `<url>`; live HEAD → 200. Nu există definiții de metaobiecte cu randare „web pages” în magazin.

**Impact / pagini afectate:** 2 intrări în index.

**Recomandare:** Nu e defect. Oportunitate pentru planul de conținut: pagini din metaobiecte (glosar de ingrediente „creatina”, „beta-alanina”, pagini de atleți/ambasadori) ar intra automat în acest sitemap odată ce o definiție are acces storefront + „web pages” activat și există un template `templates/metaobject/<definition>.json`.

**Cum verificăm (falsificabilitate):** n/a.

**Indicator timpuriu:** numărul de URL-uri din sitemap_metaobject_pages_1.xml.

#### SITEMAP-11 — Sitemap-ul de descoperire agentică trimite un fișier Markdown Shopify generic

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Info | OPEN | S | 0.80 |

**Dovezi:** child0.xml (sitemap_agentic_discovery.xml) conține o singură intrare, `https://primesupplements.ro/agents.md`, changefreq weekly, fără lastmod, fără geamăn `/ro-hu/`. `$R/agents.md` este boilerplate-ul Shopify „Agent Instructions” (conținut identic cu /llms.txt și /llms-full.txt), adică sitemap-ul cere Google să indexeze un document text fără informații specifice site-ului. robots.txt linia 2 îl promovează și el.

**Impact / pagini afectate:** 1 URL.

**Recomandare:** Controlat de platformă (stratul de agenți Shopify); nu s-a găsit niciun comutator în Admin pentru a-l elimina și nu face rău. Munca utilă e în secțiunea agentic (conținut real pentru llms.txt), nu în sitemap.

**Cum verificăm (falsificabilitate):** n/a.

**Indicator timpuriu:** dacă agents.md apare în rezultatele `site:primesupplements.ro`.

### Ce nu am putut măsura

- Core Web Vitals (lab sau teren): cota anonimă PageSpeed Insights epuizată (HTTP 429), fără acces CrUX, fără Chromium în sandbox → afirmațiile despre CWV din TECH-09/11/12 sunt semnale statice de risc, nu scoruri.
- Google Search Console, GA4, Indexing API: fără acces → numărul de URL-uri trimise/indexate, erorile de procesare a sitemap-ului, bucket-urile „Discovered/Crawled – currently not indexed” și canonical-urile alese de Google nu au putut fi citite; toți indicatorii timpurii de mai sus presupun că proprietarul deschide GSC.
- DOM-ul randat vs HTML brut: `render_page.py`, `sitemap_discovery.py` și celelalte scripturi de plugin care descarcă URL-uri sunt blocate de politica de proxy a sandbox-ului (nu e o problemă a site-ului); concluziile SSR (TECH-25) vin din numărul de cuvinte din HTML-ul brut; descoperirea sitemap-ului s-a făcut din copia locală a indexului + curl.
- Statusul HTTP a fost verificat live doar pentru 6 URL-uri din sitemap (protecție anti-bot Cloudflare: 429 „Verifying your connection...” după rafale; seo-sitemap 11 cereri throttled la 2 s fără 429, seo-technical 14 cereri cu două 429 tratate cu back-off de 30 s); celelalte 1.145 URL-uri au fost validate față de exporturile Admin, nu crawlate. Orice crawl viitor al site-ului trebuie limitat ca rată.
- `/collections/vendors?q=primesupplements1` a răspuns 429 de două ori în sesiune; dovezile TECH-07 vin din captura anterioară `scratchpad/tech/live/vendors.body`.
- `$R/theme/layout__theme.liquid` lipsea din setul de dovezi; layout-ul live a fost citit printr-o singură interogare Admin GraphQL read-only (`themes.files`, tema 179784286583); nimic nu a fost modificat de specialiști. Exportul temei nu include template-urile de pagină (page.thank-you-b2b.json, page.b2b.json), deci regulile robots la nivel de template nu au putut fi inspectate (layout-ul și secțiunile exportate nu conțin robots meta).
- Starea robots.txt/parolă a magazinului B2B a fost luată din fișierul de context de seo-technical (seo-sitemap a re-descărcat live robots.txt și sitemap.xml B2B, deci constatarea e totuși confirmată).
- Adâncimea de crawl (TECH-04) a fost derivată din setările de paginare și numărul de pagini, nu dintr-un crawler.
- Comportamentul bannerului Pandectes (interstițial vs banner mic) nu a fost evaluat; blobul de setări nu expune o cheie de layout lizibilă.
- Inventarul de aplicații, checkout-ul, filtrele Search & Discovery și canalele de vânzare (Google & YouTube, Shop) sunt în afara scope-urilor API acordate (fără `read_apps`); Pandectes și Judge.me au fost deduse din HTML-ul randat.
- Comportamentul exact Shopify pentru URL-urile `/ro-hu/` după eliminarea prezenței web (301 vs 404) trebuie verificat live după schimbare.
- `$R/sitemaps/all-urls.txt` nu are newline final (wc raportează 1.150 linii pentru 1.151 URL-uri); cosmetic, numărătorile vin din XML.
