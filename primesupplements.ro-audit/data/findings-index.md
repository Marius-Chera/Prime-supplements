Starea din coloana „Stare” este cea din raport (12.10.2026); unde apare „→”, a doua valoare este starea după runda 2 de remediere din 13.10.2026 (detalii în `round2-status.md`).

| ID | Secțiune | Severitate | Stare | Titlu |
|---|---|---|---|---|
| TECH-01 / SITEMAP-01 / SHOPIFY-01 | 1 | Critical | PENDING → FIXED-R2 | Piața „Ungaria” publică o a doua copie completă a site-ului sub `/ro-hu/` (575 URL-uri duplicate, self-canonical, conținut românesc identic, prețuri RON) |
| TECH-02 / SITEMAP-14 / SHOPIFY-02 | 1 | High | PENDING | Magazinul B2B b2b.primesupplements.ro este un duplicat cross-domain indexabil al catalogului (58 URL-uri de produs cu același handle; 52 identice în sitemap-ul B2B) |
| TECH-03 / SITEMAP-04 / SHOPIFY-06 | 1 | High | READY → FIXED-R2 | Colecțiile utilitare (all, cele-mai-vandute, lansate-recent, 11-tva, frontpage) sunt indexabile și în sitemap, trei dintre ele duplicate complete ale catalogului; tema nu avea nicio logică robots-meta |
| TECH-04 | 1 | High | OPEN | Arhiva blogului are 59 de pagini cu paginare doar prev/next (6 articole/pagină): majoritatea celor 354 articole sunt la 20–59 clicuri de orice hub |
| SHOPIFY-03 | 1 | High | FIXED | Vendor „primesupplements1”, productType gol și fără categorie de taxonomie pe toate produsele (REMEDIAT) |
| SHOPIFY-04 | 1 | High | FIXED | Titluri și descrieri SEO lipsă sau generice la produse, colecții, articole și pagini (REMEDIAT) |
| TECH-05 / SITEMAP-05 | 1 | Medium | READY → FIXED-R2 | Colecția goală „Reduceri” răspunde 200, e indexabilă și în ambele sitemap-uri (candidat soft-404), deși 144 produse au reducere |
| TECH-06 / SITEMAP-06 | 1 | Medium | READY → FIXED-R2 | `/pages/thank-you` (confirmarea înregistrării B2B) este indexabilă și în sitemap (titlu englez, fără H1, fără meta description) |
| TECH-07 | 1 | Medium | READY | Pseudo-colecțiile automate vendor/type sunt live, indexabile și self-canonical (`/collections/vendors?q=primesupplements1`, `/collections/types?q=`) |
| TECH-08 | 1 | Medium | OPEN → READY-R2 | URL-urile de colecție și blog filtrate pe tag răspund 200, self-canonical, indexabile, cu titluri duplicate |
| TECH-09 | 1 | Medium | READY | `<meta charset>` este al treilea element din `<head>` (byte 1.078, după un script extern sincron și un bloc JSON-LD), încălcând regula de 1.024 bytes |
| TECH-10 | 1 | Medium | READY → DESIGN | Viewport `maximum-scale=1.0, minimum-scale=1.0` dezactivează pinch-zoom pe fiecare pagină |
| TECH-11 | 1 | Medium | PENDING | Fiecare pagină livrează 221–617 KB HTML, cu `<head>` de 157–189 KB, 131–170 KB JavaScript inline și 67–72 taguri script (20 externe) |
| TECH-12 | 1 | Medium | PENDING | Aplicația Fontify încarcă Google Fonts Poppins (toate cele 18 stiluri) + Bebas Neue render-blocking, în timp ce tema preîncarcă propriile fonturi Barlow, apoi suprascrise |
| TECH-13 / SHOPIFY-07 | 1 | Medium | PENDING → FIXED-R2 | Corpurile articolelor generate de BlogGenAuto conțin 2.582 linkuri către primesupplements1.myshopify.com (fiecare link de produs = un hop 301), scripturi, JSON-LD încorporat și linkuri „Powered by” followed |
| TECH-14 / SITEMAP-02 / SITEMAP-03 | 1 | Medium | OPEN | lastmod fără valoare în sitemap: toate cele 185 produse poartă timpul generării (diferit la fiecare fetch), iar 21/23 colecții sunt ștampilate în bloc |
| SITEMAP-15 | 1 | Medium | PENDING → PARȚIAL | Poartă de calitate: 708 din 1.151 intrări din sitemap sunt articole generate automat, nefiltrate |
| SHOPIFY-05 | 1 | Medium | FIXED | Imaginile de produs nu aveau alt text (REMEDIAT) |
| TECH-15 | 1 | Low | OPEN | Variantele cu slash final răspund 200 (un URL duplicat per pagină, atenuat de canonical) |
| TECH-16 | 1 | Low | OPEN | `http://www` este un lanț de redirect în doi pași |
| TECH-17 / SITEMAP-12 | 1 | Low | OPEN → FIXED-R2 | Trei handle-uri conțin diacritice percent-encoded, iar canonical-ul folosește altă capitalizare hex decât sitemap-ul și hreflang-ul |
| TECH-18 | 1 | Low | PENDING → FIXED-R2 | Igienă URL: 57 URL-uri din sitemap depășesc 100 de caractere, 42 handle-uri de articol se termină în -2…-5 și 134 conțin fragmente englezești |
| TECH-19 | 1 | Low | READY | Pagina goală `/search` este indexabilă, în timp ce `/search?q=` nu este |
| TECH-20 | 1 | Low | READY | `og:image` este emis cu `http://` pe fiecare pagină |
| TECH-21 | 1 | Low | OPEN → PARȚIAL | Resource hints învechite: `dns-prefetch productreviews.shopifycdn.com` (Shopify Product Reviews, retrasă) și `preconnect cdn.nitroapps.co` (Fontify) deschid conexiuni pe care nimic nu le folosește |
| TECH-22 | 1 | Low | OPEN | Antetele de securitate sunt limitate de platformă: HSTS 91 de zile fără preload/includeSubDomains, fără Referrer-Policy sau Permissions-Policy, CSP minimal |
| TECH-23 / SITEMAP-13 | 1 | Low | OPEN | 30 de produse complet epuizate rămân indexabile și în sitemap; indexul listează și două sitemap-uri copil goale |
| SITEMAP-07 | 1 | Low | OPEN | Intrările de imagine din sitemap acoperă doar imaginea principală (185 din 493 imagini de produs) și folosesc taguri depreciate |
| SHOPIFY-08 | 1 | Low | OPEN → PARȚIAL | Produsele draft/unlisted împart colecțiile automate cu produsele live |
| TECH-24 | 1 | Info | OPEN | IndexNow nu este implementat |
| TECH-25 | 1 | Info | READY | Randarea JavaScript trece; doar conținutul de recenzii Judge.me este injectat prin JS |
| TECH-26 | 1 | Info | OPEN → PARȚIAL | robots.txt este default-ul Shopify 2026 (corectează contextul): sort_by și multi-filter sunt blocate; rămân lacune pentru vendors/types/tag/ro-hu |
| TECH-27 | 1 | Info | OPEN | Tratarea 404 este corectă; pagina de eroare nu are H1 și canonicalizează la `/404` |
| TECH-28 | 1 | Info | READY | Date structurate prezente pe fiecare șablon, dar duplicate și parțial invalide (detaliile sunt la specialistul schema) |
| SITEMAP-08 | 1 | Info | OPEN | `<changefreq>` pe toate cele 1.151 intrări (ignorat de Google) |
| SITEMAP-09 | 1 | Info | OPEN | Indexul sitemap nu are `<lastmod>` per copil și conține un comentariu XML |
| SITEMAP-10 | 1 | Info | OPEN | Două sitemap-uri metaobject goale sunt referențiate de index |
| SITEMAP-11 | 1 | Info | OPEN | Sitemap-ul de descoperire agentică trimite un fișier Markdown Shopify generic |
| CONTENT-01 | 2 | Critical | PENDING → PARȚIAL | Blogul este conținut generat automat la scară, nerevizuit, pe subiecte YMYL (expunere la „scaled content abuse”) |
| CONTENT-02 | 2 | High | OPEN → PARȚIAL | Toate „sursele științifice” sunt linkuri către homepage-uri; blogul nu conține nicio citare reală |
| CONTENT-03 | 2 | High | OPEN → FIXED-R2 | Afirmații medicale fără disclaimere, informații de siguranță sau revizie medicală |
| CONTENT-04 | 2 | High | PENDING → FIXED-R2 | Identitatea autorului este neverificabilă și inconsecventă intern; nu există pagină de autor; 18 articole au ca autor handle-ul magazinului |
| CONTENT-05 / CLUSTER-04 | 2 | High | PENDING → FIXED-R2 | Canibalizare tematică în fiecare hub: serii regenerate și clustere ancorate pe produs concurează pentru aceeași intenție (26 grupuri intenție×hub cu ≥4 articole) |
| CLUSTER-03 | 2 | High | PENDING → FIXED-R2 | Clusterul creatină: 78 articole (115.757 cuvinte) pentru 3 produse acoperă ~15 intenții, fiecare scrisă de 3-11 ori |
| CLUSTER-05 | 2 | High | PENDING → FIXED-R2 | 42 handle-uri terminate în -2/-3/-4/-5 sunt regenerări ale aceluiași brief produs × unghi și trebuie comasate în articolul de bază |
| CLUSTER-12 | 2 | Medium | PENDING → FIXED-R2 | Glutamină: 16 articole pentru un singur produs (`recovery-glutamin`), 4 dintre ele sub prefixul `glutamina-si-sanatatea-stomacului-` deși niciunul nu este despre sănătatea stomacului |
| CLUSTER-13 | 2 | Low | PENDING → FIXED-R2 | Seria „protein-a” / „protine”: spoke-urile cele mai linkate ale hub-ului pudră proteică au handle-uri cu cuvântul-cheie scris greșit, iar hub-ul nu are un spoke-pilon „izolat vs concentrat” / „cum alegi proteina” linkat |
| CONTENT-06 | 2 | High | OPEN → FIXED-R2 | Descrieri de produs lipsă sau subțiri: 102 produse sub 50 de cuvinte, inclusiv produsul cel mai linkat din blog |
| CONTENT-07 | 2 | Medium | OPEN → PARȚIAL | Conținut de produs duplicat și cvasi-duplicat (variante publicate ca produse separate, descrieri clonate) |
| CONTENT-08 / CLUSTER-01 | 2 | High | FIXED | Toate cele 23 pagini de colecție nu au conținut editorial: 0 cuvinte de hub pe 23/23 colecții, în timp ce o secțiune `seo_text` pregătită stă dezactivată în șablon |
| CLUSTER-02 | 2 | High | OPEN → READY-R2 | Hub-urile nu linkează spre spoke-urile lor: fiecare colecție arată aceleași 3 articole recente, deci hub-ul creatină linkează articole despre ovăz și L-carnitină și niciunul dintre cele 78 ale sale |
| CLUSTER-08 | 2 | High | OPEN → FIXED-R2 | Linkurile spoke→hub ajung la doar 7 din 13 hub-uri; 112 articole nu au niciun link către o colecție; vitamine-si-minerale (51 articole), crema-de-orez (25), pre-workout (10), intra-workout (5), batoane și bauturi primesc 0 linkuri din corp; 40 de linkuri merg la generica „cele-mai-vandute” |
| CLUSTER-09 | 2 | Medium | OPEN → PROPRIETAR | Acoperirea produselor este inversată: 5 produse absorb 234 linkuri din articole, în timp ce 31 din 85 suplimente (toate cele 19 băuturi Frutilu, 3 din 7 arome de cremă de orez, colagen, turmeric, citrat de magneziu) au 0, iar 8 articole linkează două produse care nu mai există |
| CLUSTER-14 | 2 | Medium | OPEN → PROPRIETAR | Patru hub-uri nu au (aproape) niciun spoke, în timp ce patru produse sunt supra-deservite: bauturi (19 produse / 0 articole), batoane (4 / 0), intra-workout (4 / 5), pre-workout (7 / 10) față de L-carnitine 1000 (28 articole), ovăz instant (22), fibre (21) |
| CONTENT-09 | 2 | High | READY → FIXED-R2 | Igiena linkurilor din corp: 2.582 linkuri myshopify, 534 linkuri directe de adăugare în coș, 194 linkuri dofollow „Powered by BlogGenAuto”, linkuri către produse promoționale dispărute |
| CONTENT-10 | 2 | Medium | OPEN → FIXED-R2 | Integritatea datelor: o linie „Published:” hard-codată, în engleză, contrazice data reală de publicare pe 315 articole; niciun semnal real de actualizare |
| CONTENT-11 | 2 | Medium | READY → FIXED-R2 | Markup injectat de generator în corpuri: H1 duplicate, JSON-LD în corp care dublează schema temei, categorii de breadcrumb inventate, CSS/JS inline |
| CONTENT-12 / CLUSTER-16 | 2 | Medium | FIXED | Titlurile sunt datate cu anul, prea lungi și construite pe tipare clickbait; 311 teasere sunt trunchiate cu „...”; generatorul va re-crea fiecare intenție în 2027 |
| CONTENT-13 / CLUSTER-06 | 2 | Medium | OPEN → FIXED-R2 | Slug-urile conțin fragmente de prompt în engleză, nume de competitori, SKU-uri de produs și sufixe numerice; cuvântul-cheie din URL nu are legătură cu titlul și conținutul |
| CLUSTER-07 | 2 | Medium | OPEN → FIXED-R2 | 13 articole folosesc nume de competitori ca termen-țintă (GymBeam ×7, Optimum Nutrition / Gold Standard ×3, Dr Max, Farmacia Tei, MyProtein) fără să compare nimic |
| CONTENT-14 / CLUSTER-10 | 2 | Medium | OPEN → PARȚIAL | Fără hub-uri tematice sau taxonomie: 346/355 articole fără taguri, 5 taguri pe 9 articole, blog intitulat „Ultimele articole”, singura cale de navigare sunt 33 de pagini de paginare cronologică |
| CLUSTER-11 | 2 | Medium | OPEN → PARȚIAL | Linkarea articol→articol este generată, nu planificată: 22 articole au 0 linkuri de intrare din articole, 132 au < 3, 41% din muchii traversează hub-urile, 7 articole nu linkează nimic, 2 linkuri indică handle-uri inexistente |
| CONTENT-15 | 2 | Medium | OPEN → READY-R2 | Pagina Despre noi și conținutul de încredere al brandului sunt slabe: fără H1, certificări neverificabile, an de înființare contradictoriu, fără echipă |
| CONTENT-16 / CLUSTER-15 | 2 | Low | OPEN | Articolele vechi scrise de om sunt subțiri sau orfane față de catalog, deși sunt singurele cu intenții curate, distincte |
| CONTENT-17 | 2 | Low | OPEN → FIXED-R2 | Șiruri de interfață în engleză și nelocalizate în interiorul conținutului |
| CONTENT-18 | 2 | Low | FIXED | Semnale de conținut din imagini: alt lipsă pe 19 imagini principale și 43 imagini din corp; 493/493 imagini de produs fără alt |
| CLUSTER-17 | 2 | Info | OPEN | Verificare de realitate SERP: termenii-cap aparțin farmaciilor și publisherilor medicali; țintele câștigabile sunt intențiile long-tail românești, exact unde blogul are 3-11 URL-uri concurente fiecare |
| ONPAGE-01 | 3 | High | FIXED | 105/185 produse fără titlu SEO: `<title>` era numele brut al produsului |
| ONPAGE-02 | 3 | High | FIXED | 104/185 produse fără meta descriere; 79 livrate fără niciun `<meta name="description">`, 12 cu text de dozare |
| ONPAGE-03 | 3 | High | READY | Șablonul de titlu nu adaugă sufixul de brand, iar cele 80 de titluri scrise manual folosesc trei grafii ale brandului |
| ONPAGE-04 | 3 | Medium | FIXED | 47 titluri SEO depășesc 60 de caractere (max 92) și 17 titluri brute de produs ajung la 122 de caractere |
| ONPAGE-05 | 3 | Medium | FIXED | Meta descrieri șablonate („Descoperiți … Alegeți PRIME Supplements …”), 35 peste 160 de caractere și 2 duplicate |
| ONPAGE-06 | 3 | High | OPEN → FIXED-R2 | H1 de produs = numele brut: 100 H1 în engleză, 14 H1 de tip „500g/83 serv”, 2 H1 pe o pagină, H1 englezesc sub un titlu românesc |
| ONPAGE-07 | 3 | Medium | OPEN → FIXED-R2 | Diacriticele sunt inconsecvente între titlu, H1 și meta pe aceeași pagină |
| ONPAGE-08 | 3 | High | READY | Homepage: titlu cu slogan englezesc, meta ASCII de 216 caractere, H1 = logo, H2 în engleză |
| ONPAGE-09 | 3 | High | READY → FIXED-R2 | 9/23 colecții fără titlu/meta SEO; „All Products”, „11% TVA”, „Reduceri” (goală) și 2 clone cu 185 produse sunt indexabile |
| ONPAGE-10 | 3 | Medium | OPEN | H1 de colecție ≠ titlu, og:title folosește numele brut, iar 4 pagini de categorie au 1-3 produse |
| ONPAGE-11 | 3 | High | OPEN → FIXED-R2 | Titluri H1 de articol: 321/354 peste 60 de caractere (max 134), 279 conțin „2026”, 206 sunt clickbait cu două puncte, 1 este integral în engleză |
| ONPAGE-12 | 3 | High | FIXED | Titluri SEO de articol: 19 lipsă (Shopify trunchiază fallback-ul la 70 de caractere, în mijlocul cuvântului), 223/335 peste 60, 292 conțin „2026”, 90 poartă fragmente de cuvinte-cheie englezești |
| ONPAGE-13 | 3 | Medium | PENDING → FIXED-R2 | 10 titluri SEO de articol și 9 slug-uri URL țintesc nume de competitori (Gymbeam, Havok, Optimum Nutrition, MyProtein, Farmacia Tei) |
| ONPAGE-14 | 3 | Medium | PENDING → FIXED-R2 | 26 articole randează două H1; 352 corpuri încep cu o linie-antet englezească „Published: …” |
| ONPAGE-15 | 3 | High | OPEN | Descoperirea blogului: 11 articole pe pagină, 33 pagini adâncime, paginare doar prev/next, aceleași 3 articole linkate site-wide, 21 articole fără niciun link de intrare din alte articole |
| ONPAGE-16 | 3 | High | READY → FIXED-R2 | 2.582 linkuri din articole indică primesupplements1.myshopify.com și 194 articole poartă un link dofollow „Powered by BlogGenAuto” |
| ONPAGE-17 | 3 | Medium | FIXED | Ancore goale și generice: 44 linkuri-imagine fără text pe homepage, 28 pe colecțiile mari, „Vezi toate” ×8 |
| ONPAGE-18 | 3 | Medium | READY | Fără breadcrumb vizibil pe niciun șablon; singurul BreadcrumbList este JSON-LD și indică „All Products” |
| ONPAGE-19 | 3 | Low | READY | Taguri OG/Twitter: og:image pe http, og:title ≠ titlu, card „summary”, twitter:description = text de dozare |
| ONPAGE-20 | 3 | Low | READY → FIXED-R2 | Listări paginate: titluri bilingve „All Products – Pagina 2”, fără meta descriere, 3 serii identice de 8 pagini |
| ONPAGE-21 | 3 | Medium | PENDING → PARȚIAL | Șiruri englezești netraduse pe pagini cu `lang="ro"` |
| ONPAGE-22 | 3 | Low | OPEN → PARȚIAL | Greșeli de scriere în titlurile de secțiune din temă și în titluri |
| ONPAGE-23 | 3 | Medium | FIXED | Pagini de magazin: 0/11 cu titlu sau meta SEO; cele trei pagini construite din secțiuni nu au H1; „Thank you” este indexabilă |
| ONPAGE-24 | 3 | Low | OPEN → FIXED-R2 | Index de blog: titlu/H1 generic „Ultimele articole”, fără meta descriere, fără H2 |
| ONPAGE-25 | 3 | Low | FIXED | Handle-ul myshopify „primesupplements1” este vizibil ca vendor și ca autor |
| ONPAGE-26 | 3 | Medium | OPEN | 19 grupuri de titluri cvasi-duplicate (45 produse): variantele de culoare și aromă sunt publicate ca produse separate |
| ONPAGE-27 | 3 | Low | FIXED | Text alt absent pe 493/493 imagini de produs (efecte secundare pe ancore și pe `twitter:image:alt`) |
| ONPAGE-28 | 3 | Info | PENDING → FIXED-R2 | Fiecare titlu/meta/H1 există de două ori din cauza copiei de piață `/ro-hu/` |
| SCHEMA-01 | 4 | Critical | READY → FIXED-R2 | Product JSON-LD este sintactic invalid pe 75/185 produse (76 % din suplimente) pentru că `escape` nu codifică newline-urile |
| SCHEMA-02 | 4 | High | READY | Chiar și blocurile Product care se parsează sunt neeligibile: AggregateOffer cu stringuri cu virgulă zecimală, fără Offer per variantă, fără price |
| SCHEMA-03 | 4 | High | READY | Lipsește aggregateRating/review din markup, deși Judge.me are rating-uri pe produse |
| SCHEMA-04 | 4 | High | PENDING → FIXED-R2 | BlogGenAuto injectează un al doilea graf JSON-LD contradictoriu în 347/355 corpuri de articol (breadcrumb-uri myshopify, jobTitle placeholder) |
| SCHEMA-05 | 4 | Medium | READY → FIXED-R2 | Blocul Article al temei: același bug `escape` (invalid pe ≥ 6 articole), autorul este mereu Organization, fără logo de publisher, headline neplafonat |
| SCHEMA-06 | 4 | Medium | READY → READY-R2 | Fără hasMerchantReturnPolicy / shippingDetails, iar cele două pagini de politici se contrazic la pragul de livrare gratuită |
| SCHEMA-07 | 4 | Medium | READY | Categoria din breadcrumb-ul de produs este „All Products” (sau colecția internă „11% TVA”) pe fiecare produs |
| SCHEMA-08 | 4 | Medium | READY → READY-R2 | Organization: logo-ul răspunde 404, fără telefon/e-mail/adresă/identificatori legali, limbă și dată de înființare greșite, sameAs dubios |
| SCHEMA-09 | 4 | Medium | READY | brand hard-codat pentru toate produsele (greșit pentru 100 articole MNX), category gol, sku/gtin dintr-o singură variantă, 207/395 variante fără cod de bare |
| SCHEMA-10 | 4 | Low | READY | `escape` dublu-codifică `&`, `"`, `'` în stringurile JSON, iar descrierea este tăiată la 500 de caractere |
| SCHEMA-11 | 4 | Low | READY | CollectionPage: descriere goală, numberOfItems greșit, listă trunchiată la 20, fără breadcrumb |
| SCHEMA-12 | 4 | Low | READY | Fără nod WebSite pe homepage (nume de site / endpoint de căutare) |
| SCHEMA-13 | 4 | Low | READY | Entitățile nu sunt legate (@id doar pe Organization); seller/publisher/author sunt noduri inline duplicate |
| SCHEMA-14 | 4 | Low | PENDING → FIXED-R2 | Datele structurate de pe duplicatele `/ro-hu/` indică URL-urile principale |
| SCHEMA-15 | 4 | Info | OPEN → READY-R2 | FAQPage pe homepage și pe 3 produse creatină; textul FAQ al produselor nu este vizibil în pagină (fără feature SERP din mai 2026) |
| SCHEMA-16 | 4 | Medium | READY | Markup-ul întreținut de Shopify (`microdata-schema`) este dezactivat; alegeți nativ sau custom v2, niciodată ambele |
| SCHEMA-17 | 4 | Low | PENDING | Aceleași entități de produs există pe b2b.primesupplements.ro cu alt seller/brand |
| SCHEMA-18 | 4 | Low | OPEN | Variantele de culoare/aromă publicate ca produse separate împiedică markup-ul ProductGroup |
| SCHEMA-19 | 4 | Low | OPEN | Prețurile reduse (compare-at pe 144/185 produse) nu sunt exprimate; fără priceValidUntil / itemCondition |
| SCHEMA-20 | 4 | Low | OPEN → READY-R2 | Oportunități de schema legate de conținut existent: ProfilePage pentru autor, ContactPage, VideoObject |
| PERFORMANCE-01 | 5 | High | OPEN | Aplicația Fontify injectează două foi de stil Google Fonts render-blocking (Poppins cu toate cele 18 variante + Bebas Neue) și suprascrie cu `!important` fontul Barlow deja preîncărcat de temă, rezultând trei familii de fonturi pe fiecare pagină |
| PERFORMANCE-02 | 5 | Medium | READY | `pandectes-rules.js`, singurul script clasic sincron, este plasat înainte de `<meta charset>` și împinge declarația charset dincolo de primii 1.024 de bytes |
| PERFORMANCE-03 | 5 | High | OPEN | `<head>` de ~170 KB cu 60 de scripturi inline (133–145 KB de JavaScript inline) pe fiecare template, 27 %–65 % din fiecare document |
| PERFORMANCE-04 | 5 | High | OPEN | 20 de scripturi externe pe pagină, 12 dintre ele extensii de aplicații (~350 KB brotli), plus 8 web pixels: costul pe main thread apare pe fiecare template, inclusiv pe articolele de blog |
| PERFORMANCE-05 | 5 | High | OPEN | Homepage: 630 KB HTML, ~2.944 elemente DOM, 41 de carduri de produs din 7 secțiuni featured-collection, inclusiv o secțiune „Cele mai vândute” duplicată care randează aceleași 6 produse de două ori |
| PERFORMANCE-06 | 5 | Medium | OPEN | Amprenta Judge.me este încărcată pe fiecare template (inclusiv blog și colecții): 30,8 KB setări inline, 14,5 KB CSS render-blocking, 4 blocuri style, 1.104 apariții de markup `jdgm-` pe homepage |
| PERFORMANCE-07 | 5 | Medium | OPEN | Imaginea LCP de pe homepage (slide 1 din slideshow, `header-desktop.jpg` / `header-mobile.jpg`) are 211 KB WebP pe desktop și 83 KB WebP pentru varianta mobilă de 800 px și nu este preîncărcată, deși este descoperită abia după ~170 KB de scripturi din head |
| PERFORMANCE-08 | 5 | Medium | OPEN | Pagini de colecție: bannerul parallax cu `sizes="130vw"` dintr-o sursă de 4000 × 2667 cere varianta de 2600 px pe desktop (298 KB WebP) și 1600 px pe telefoane (151 KB WebP) |
| PERFORMANCE-09 | 5 | Low | OPEN | Fallback-ul `src` al galeriei de produs indică randarea de 4000 px (600 KB WebP / 977 KB JPEG) și fiecare imagine din galerie este referențiată de 8 ori în HTML |
| PERFORMANCE-10 | 5 | Low | OPEN | Imagini fără `width`/`height` (CLS) injectate de aplicații și Liquid custom: 17 pe homepage, 3 pe produs, 2 pe colecție, 3 pe articol |
| PERFORMANCE-11 | 5 | Low | OPEN | Hint-uri de resurse și tag-uri redundante sau duplicate: `country-flags.css` legat de 3×, BlogGenAuto `tracking.js` de 2×, CSS Google Fonts și ca `stylesheet` și ca `prefetch`, `preconnect` nefolosit către cdn.nitroapps.co, `dns-prefetch` învechit către productreviews.shopifycdn.com, `preconnect` duplicat către cdn.shopify.com în header-ul Link, `preconnect` lipsă către fonts.gstatic.com |
| PERFORMANCE-12 | 5 | Low | OPEN | Blocuri de aplicații orfane care nu se randează pe nicio pagină (embed-ul `pagefly-ai-page-builder` pe toate cele 4 template-uri, `youtube_gallery_carousel_widget_block` pe homepage și produs) |
| PERFORMANCE-13 | 5 | Low | OPEN → PARȚIAL | Template de articol: `<head>` este 65 % din document, imaginea featured (candidat LCP) nu are `fetchpriority="high"`, imaginile din corp nu au `sizes`, iar generatorul BlogGen adaugă 12 blocuri `<style>` în body și un al doilea set JSON-LD |
| PERFORMANCE-14 | 5 | Low | OPEN | Slideshow cu autoplay (6 s) și carusel media al produsului featured cu autoplay și înălțime adaptivă pe homepage |
| PERFORMANCE-15 | 5 | Low | OPEN | CSS inline per secțiune (62 de blocuri `<style>`, 44 KB) și duplicarea iconițelor SVG inline (106 SVG-uri, 43,7 KB) pe homepage |
| PERFORMANCE-16 | 5 | Info | OPEN | Răspunsul serverului și caching-ul HTML sunt sănătoase, dar timpul de randare este dat de template (Info) |
| PERFORMANCE-17 | 5 | Info | OPEN | Scripturile de platformă Shopify (`portable-wallets.ro.js` 78 KB, `perf-kit` 26 KB, `es-modules-shim` 15 KB, `standard-actions.js` 4 KB, `shop-js cart-sync`) sunt prezente pe fiecare template (Info) |
| IMAGES-01 | 6 | High | FIXED | 493/493 imagini de produs fără alt text stocat; fallback-ul storefront-ului dă fiecărei imagini a unui produs același titlu brut |
| IMAGES-02 | 6 | High | OPEN → FIXED-R2 | Hero-ul homepage (imaginea LCP), logo-ul și cele șase tile-uri de categorie se livrează cu `alt=""` |
| IMAGES-03 | 6 | Medium | OPEN → PARȚIAL | Bannerele de colecție, tile-ul promo și banda lifestyle „1.jpg/2.jpg/3.jpg” au alt gol și nume de fișier de aparat foto pe fiecare șablon |
| IMAGES-04 | 6 | Medium | OPEN | 40 % din fișierele imaginilor de produs au nume de aparat foto, WhatsApp, derivate WordPress sau UUID; 89 % conțin majuscule sau underscore |
| IMAGES-05 | 6 | Medium | PENDING → PARȚIAL | Sitemap de imagini: doar imaginea principală (185 din 493), caption-uri goale, imaginile colecțiilor lipsesc și fiecare imagine e listată de două ori prin `/ro-hu/` |
| IMAGES-06 | 6 | Medium | READY → READY-R2 | Meta tag-uri Open Graph / Twitter: schemă `http://`, dimensiuni declarate nepotrivite, `twitter:image:alt` gol, fallback la imaginea homepage-ului |
| IMAGES-07 | 6 | Medium | OPEN → FIXED-R2 | Imaginile din corpul articolelor (șablon BlogGenAuto): fără `width`/`height`, 43 alt-uri goale, thumbnail-uri de produs aduse la originalul de 4000 px, alt-uri cu cuvinte-cheie și an |
| IMAGES-08 | 6 | Medium | OPEN → PARȚIAL | Imaginile principale ale articolelor: 19 fără alt, 327/354 sunt PNG-uri generate AI cu nume de timestamp sau cu promptul întreg, fără `fetchpriority` pe imaginea LCP |
| IMAGES-09 | 6 | Medium | OPEN | 9 imagini secundare de produs (tabele nutriționale/infografice) sunt sub 1000 px și se upscalează într-o galerie de 730 px; 57 produse au o singură imagine |
| IMAGES-10 | 6 | Medium | OPEN | Over-fetch pe bannere: bannerele de colecție folosesc `sizes="130vw"` pe fișiere de aparat de 4000-5472 px; randarea hero-ului e de 210 KB WebP; imaginea shop-the-look are sursă de 6000x4000 |
| IMAGES-11 | 6 | Low | OPEN | Homepage-ul repetă aceleași imagini de produs de trei ori și poartă 130 KB de markup `srcset` (21 % din HTML-ul de 630 KB) |
| IMAGES-12 | 6 | Low | OPEN → READY-R2 | O a doua imagine `fetchpriority="high" loading="eager"` stă sub fold pe homepage (secțiunea featured product) |
| IMAGES-13 | 6 | Low | OPEN | Imagini injectate de aplicații fără dimensiuni sau lazy-loading nativ (carusel/poze de recenzie Judge.me, insignele ANPC, steagul UE) |
| IMAGES-14 | 6 | Low | FIXED | Acolo unde există alt text, e titlul brut al produsului cu șiruri de merchandising, erori de spațiere și formulări în engleză |
| IMAGES-15 | 6 | Info | OPEN | Formatul și compresia sunt gestionate de CDN-ul Shopify; încărcarea surselor AVIF/PNG nu aduce nimic (și AVIF nu e livrat niciodată) |
| IMAGES-16 | 6 | Info | OPEN | `decoding="async"` nu e folosit pe nicio imagine |
| IMAGES-17 | 6 | Medium | OPEN | Oportunitate Google Images / Shopping: packshot-urile sunt eligibile, dar semnalele care le-ar clasa lipsesc |
| GEO-01 | 7 | High | OPEN → PARȚIAL | Fiecare link „sursă” din blog duce la un homepage: 338 articole invocă studii pe care nu le citează niciodată |
| GEO-02 | 7 | High | OPEN → FIXED-R2 | Semnale de prospețime fabricate: liniile „Published:” hard-codate nu corespund datelor Shopify, „Updated” este mereu egal cu „Published”, 267/354 articole au peste 90 de zile și fiecare pagină poartă două scheme Article contradictorii |
| GEO-03 | 7 | High | FIXED | 22 din 23 pagini de colecție nu aveau niciun text descriptiv, deci paginile de categorie („money pages”) nu ofereau nimic citabil unui sistem AI |
| GEO-04 | 7 | Medium | OPEN → FIXED-R2 | Paginile de produs (eșantion Creapure) îngroapă definiția la ~1.100 de cuvinte, randează textul de două ori, au H1 în engleză și fac afirmații de sănătate neautorizate, fără sursă |
| GEO-05 | 7 | High | READY | Entitatea Organization este scindată: handle-urile sameAs din schemă diferă de cele din footer, YouTube lipsește, fără legalName/adresă/telefon, iar brandul este scris în 6 feluri |
| GEO-06 | 7 | High | PENDING → FIXED-R2 | Entitatea de autor „Marius Chera” are patru identități, nu are pagină de autor, are acreditări contradictorii și o schemă Person doar cu un URL LinkedIn |
| GEO-07 | 7 | Medium | PENDING → FIXED-R2 | Primul pasaj al majorității articolelor este boilerplate sau un widget de preț, nu răspunsul |
| GEO-08 | 7 | Medium | OPEN → READY-R2 | FAQPage ascuns pe produsele creatină: 8 întrebări-răspuns există doar în JSON-LD, nu în pagină |
| GEO-09 | 7 | Medium | OPEN → FIXED-R2 | Statistici neatribuite în blocurile-răspuns („până la 60%”, „99.99%”, „82% standardul de aur”) |
| GEO-10 | 7 | Medium | OPEN → PARȚIAL | Întrebările FAQ clinice generate automat împing un magazin de suplimente în teritoriu medical pentru care sistemele AI nu îl vor cita |
| GEO-11 | 7 | Medium | PENDING → PARȚIAL | Amprentă de generare AI fără declarație „Cum”: markeri BlogGenAI, 194 linkuri „Powered by BlogGenAuto”, „Scaled by KEMO” |
| GEO-12 | 7 | Medium | READY → FIXED-R2 | „primesupplements1” se scurge ca alias de brand în corpusurile AI (vendor pe 64 produse, autor pe 17 articole, 2.582 linkuri myshopify) |
| GEO-13 / AGENTIC-16 | 7 | Medium | PENDING → FIXED-R2 | Oglinda `/ro-hu/` dublează fiecare URL citabil, împarte semnalele de citare și dublează suprafața pe care agenții trebuie să o parcurgă sub un WAF cu limitare de rată |
| GEO-14 / AGENTIC-03 | 7 | Medium | OPEN | Protecția anti-bot Shopify răspunde cu 429 „Verifying your connection...” la trafic de rată moderată, poate lovi fetcherele AI declanșate de utilizator exact la momentul răspunsului și nu există allowlist pentru comerciant |
| GEO-15 | 7 | Low | PENDING → FIXED-R2 | Canibalizare tematică: 47 grupuri de cuvinte-cheie / 164 articole și 42 handle-uri regenerate „-2..-5” dau retrieval-ului AI multe pasaje slabe în loc de un răspuns puternic |
| GEO-16 / AGENTIC-04 | 7 | Medium | OPEN | llms.txt, llms-full.txt și agents.md sunt șablonul generic „Agent Instructions” al Shopify, nu un index al conținutului magazinului: fără linkuri către colecții, produse sau blog (Google ignoră llms.txt) |
| GEO-17 / AGENTIC-02 | 7 | Low | OPEN → READY-R2 | Niciun semnal de licențiere/utilizare citibil de mașină: fără Content-Signal (robots.txt, antet HTTP sau meta), fără RSL, fără antet License |
| GEO-18 | 7 | Info | OPEN | Pregătirea pe platforme (Google AI Overviews/AI Mode, ChatGPT, Perplexity, Bing Copilot) nu a fost măsurată; evaluare calitativă |
| AGENTIC-01 | 7 | Medium | OPEN → PARȚIAL | robots.txt nu are o politică deliberată de agenți pe scopuri (un singur grup `*`) |
| AGENTIC-05 | 7 | Info | OPEN → READY-R2 | Fișierele de platformă se adresează agenților cu instrucțiuni terțe (instalarea skill-ului shop.app); de tratat ca date, nu ca vocea comerciantului |
| AGENTIC-06 | 7 | Low | OPEN | Fără livrare Markdown; o cerere strictă `Accept: text/markdown` primește 404 în loc de pagina HTML |
| AGENTIC-07 | 7 | Info | OPEN | Fără ai-catalog.json / Agentmap, deși magazinul rulează un server MCP real (oportunitate, negăzduibilă pe Shopify) |
| AGENTIC-08 | 7 | Medium | OPEN → READY-R2 | Listbox-urile de localizare nu au nume accesibil (axe `aria-input-field-name`, din setul de reguli al arborelui de agent Lighthouse) |
| AGENTIC-09 | 7 | Low | OPEN → PARȚIAL | Landmark de navigație fără nume, `aria-controls` orfane, butoane fără `type`, anomalii de heading |
| AGENTIC-10 | 7 | Medium | FIXED | Fotografiile de produs erau fără nume în arborele de accesibilitate (alt gol pe 493/493 imagini de produs) |
| AGENTIC-11 | 7 | Low | READY → DESIGN | Viewport-ul blochează zoom-ul (`maximum-scale=1.0, minimum-scale=1.0`) |
| AGENTIC-12 | 7 | Medium | OPEN | Greutatea paginilor și numărul de controale fac canalul DOM scump pentru agenți (345–630 KB HTML, 69–71 scripturi, 128 butoane pentru ~700–2.800 cuvinte) |
| AGENTIC-13 | 7 | Info | OPEN | WebMCP: adaptorul Shopify este prezent; fără tools proprii ale comerciantului, fără adnotări de formular (oportunitate, acoperită de platformă) |
| AGENTIC-14 | 7 | Info | OPEN | Inconsistențe în anunțarea UCP/MCP și metadate generice ale tools (gestionate de Shopify; aprofundare → seo-ecommerce) |
| AGENTIC-15 | 7 | Low | OPEN → FIXED-R2 | Șapte descrieri de produs MNX conțin markup lipit din interfața de chat Gemini, expus agenților prin HTML, `/products.json` și UCP `get_product` |
| AGENTIC-17 | 7 | Info | OPEN | Overlay-urile injectate târziu (consimțământ, popup, bulă de chat, cadouri) netestate pentru focus trap sau acoperire; CLS Lighthouse necunoscut |
| ECOMMERCE-01 | 8 | Critical | READY | Product JSON-LD este neeligibil pentru merchant listings pe fiecare produs (JSON invalid pe descrierile multi-linie, AggregateOffer cu prețuri cu virgulă, fără price/livrare/retur/rating) |
| ECOMMERCE-02 | 8 | High | PENDING → FIXED-R2 | Piața duplicat `/ro-hu/` afișează prețuri FĂRĂ TVA 21 % în RON (82,64 lei vs 100,00 lei) pe pagini indexabile și în JSON-LD |
| ECOMMERCE-03 | 8 | High | FIXED | `productType` era gol pe 185/185 produse: categoria lipsea din schema, feed-uri, filtre și paginile de tip |
| ECOMMERCE-04 | 8 | High | FIXED | Datele de vendor/brand erau greșite: handle-ul myshopify „primesupplements1” era vendor pe 64 produse, iar articolele MNX purtau brandul „Prime Supplements” |
| ECOMMERCE-05 | 8 | High | PENDING → PARȚIAL | Acoperire și validitate GTIN: 207/395 variante fără cod de bare, 27 din 188 coduri pică la cifra de control GS1, codurile invalide sunt publicate ca `gtin`; SKU = EAN pe 164 variante |
| ECOMMERCE-06 | 8 | High | FIXED | Acoperire titlu/descriere SEO: 105 produse fără titlu SEO, 79 cu meta descriere GOALĂ, 12 cu text de dozare ca meta, 47/80 titluri SEO peste 60 de caractere |
| ECOMMERCE-07 | 8 | High | OPEN → FIXED-R2 | Modelul de conținut al produsului este stricat: câmpul description conține dozare/ingrediente niciodată afișate, cele 4 tab-uri din metafield-uri sunt în mare parte goale, 102 produse au < 50 de cuvinte, fără tabel nutrițional |
| ECOMMERCE-08 | 8 | Medium | OPEN | 45 produse sunt duplicate de culoare/aromă publicate ca produse separate în loc de variante (19 grupuri) |
| ECOMMERCE-09 | 8 | Medium | OPEN → FIXED-R2 | Titluri și H1: 17 titluri peste 60 de caractere (max 122), 96 titluri în engleză pe un magazin românesc, 19 fără diacritice, H1 diferit de titlul SEO pe produse-cheie |
| ECOMMERCE-10 | 8 | Medium | OPEN | 30 produse sunt epuizate pe toate variantele (22 MNX, 8 suplimente), dar rămân indexabile, în sitemap și linkate din blog, fără captare „anunță-mă” |
| ECOMMERCE-11 | 8 | Medium | OPEN | „Reduceri” compare-at pe 144/185 produse (120 cu toate variantele tăiate permanent) și o colecție „Reduceri” goală: risc Omnibus și de sale-price în Merchant Center |
| ECOMMERCE-12 | 8 | High | OPEN | Arhitectura colecțiilor: 23 colecții plate, 5 colecții utilitare indexabile, două categorii de îmbrăcăminte suprapuse (99 vs 87, 86 comune), fără subcategorii pe obiectiv/brand/tip de articol, toate descrierile goale |
| ECOMMERCE-13 | 8 | Low | READY | Navigarea fațetată este subțire (preț, disponibilitate, 2 metafield-uri custom) și crawlabilă; paginile de interogare vendor/type sunt indexabile |
| ECOMMERCE-14 | 8 | Medium | READY | Fără breadcrumb vizibil pe paginile de produs și de colecție; BreadcrumbList JSON-LD trimite fiecare produs la „All Products” |
| ECOMMERCE-15 | 8 | Medium | OPEN → PARȚIAL | Cross-sell-ul este doar client-side: paginile de produs expun 6-7 linkuri de produs în HTML-ul brut; blocul complementar nu are date; titlurile secțiunilor au greșeli de tipar și engleză |
| ECOMMERCE-16 | 8 | Medium | READY | Recenziile există (431 la nivel de magazin), dar sunt invizibile pentru căutare: fără markup aggregateRating/review, blocul rating dezactivat, text de widget în engleză, widget gol pe produsele fără recenzii |
| ECOMMERCE-17 | 8 | Medium | FIXED | Imagini de produs: 0/493 imagini aveau alt text și 57 produse au o singură imagine (53 suplimente) |
| ECOMMERCE-18 | 8 | High | PENDING | Pregătirea pentru Google Merchant Center: faptele din politici există pe pagini, dar nu în datele de produs; 8 familii de atribute care blochează feed-ul lipsesc sau sunt greșite |
| ECOMMERCE-19 | 8 | High | READY → FIXED-R2 | Linkingul blog → produs este deviat: 2582 linkuri către primesupplements1.myshopify.com, 534 linkuri de adăugare în coș, 130/185 produse niciodată linkate, 16 linkuri către produse moarte |
| ECOMMERCE-20 | 8 | Low | OPEN | Tag-urile și handle-urile sunt inconsecvente (97 tag-uri cu duplicate de majuscule/plural, handle cu underscore, trei modele de handle în gama Frutilu) |
| ECOMMERCE-21 | 8 | Low | OPEN | Denumirea variantelor este inconsecventă și se scurge în coș, feed-uri și UCP (`Cutie 12 buc x 55g` / `Baton 55g` / `55g`; numele produsului repetat în titlul variantei; două scale de mărimi) |
| ECOMMERCE-22 | 8 | Low | OPEN → PARȚIAL | Defecte ale template-ului de colecție: „Alte categorii” fixe, produs recomandat din banner lipsă, bloc de blog generic pe fiecare colecție, 24 produse pe pagină la colecții de 185, H1 ≠ titlu |
| ECOMMERCE-23 | 8 | Info | OPEN | Profilul UCP este live și bine format; calitatea comerțului prin agenți este plafonată de datele de produs de mai sus |
| ECOMMERCE-24 | 8 | Info | PENDING | Peisajul de marketplace și competitori nu a putut fi măsurat (fără date Merchant/SERP); magazinul B2B duplică 57 produse retail cu prețuri en-gros vizibile |
| INTERNATIONAL-01 | 9 | High | PENDING → FIXED-R2 | Web presence-ul pieței „Ungaria” publică o a doua copie completă a site-ului sub /ro-hu/ (575 URL-uri duplicate cu conținut românesc identic, ambele self-canonical) |
| INTERNATIONAL-02 | 9 | High | PENDING → FIXED-R2 | Alternate-urile /ro-hu/ afișează prețuri diferite pentru aceleași produse (fără TVA, exact ÷1,21) în aceeași monedă RON, inclusiv în Product JSON-LD cu același @id |
| INTERNATIONAL-03 | 9 | Medium | PENDING → FIXED-R2 | Setul hreflang este tehnic valid, dar nejustificat semantic: `ro-HU` țintește vorbitorii de română din Ungaria fără nicio localizare, în timp ce a doua audiență realistă (vorbitorii de maghiară din România, `hu-RO`) nu este deservită deloc |
| INTERNATIONAL-04 | 9 | Medium | PENDING → PROPRIETAR | Livrarea și conținutul legal contrazic piața Ungaria: magazinul livrează în HU cu tarife Cargus denumite în maghiară și exprimate în HUF, în timp ce politica de livrare și Termenii spun că livrarea este doar în România și nu există pagini legale maghiare |
| INTERNATIONAL-05 | 9 | Low | PENDING → PARȚIAL | Selectorul de țară este randat de trei ori pe pagină, oferă două țări cu aceeași monedă („România (RON Lei)” / „Ungaria (RON Lei)”), nu are opțiune de limbă și schimbă tacit prețurile cu −17,36 % |
| INTERNATIONAL-06 | 9 | Low | PENDING → FIXED-R2 | Homepage-ul /ro-hu există în două forme de URL (`/ro-hu` și `/ro-hu/`, ambele 200); canonical/hreflang/sitemap folosesc forma fără slash, în timp ce `rootUrls` al pieței spune `/ro-hu/` |
| INTERNATIONAL-07 | 9 | Low | PENDING → FIXED-R2 | Datele structurate de pe fiecare pagină /ro-hu/ declară URL-ul rădăcină ca URL al entității (@id, url, elemente de breadcrumb), în timp ce canonical-ul și og:url ale paginii declară /ro-hu/ |
| INTERNATIONAL-08 | 9 | Low | OPEN → FIXED-R2 | Canonical-ul și hreflang/sitemap-ul nu sunt de acord asupra majusculelor din percent-encoding pentru URL-urile cu handle-uri cu diacritice (canonical minuscule `%c8%9b`, hreflang și sitemap majuscule `%C8%9B`) |
| INTERNATIONAL-09 | 9 | Low | READY → READY-R2 | Lacune în metadatele de limbă: fără `og:locale`, fără `inLanguage` în niciun JSON-LD și string-uri în engleză (tagline-ul din title, titlul Judge.me) pe singurul locale (român) |
| INTERNATIONAL-10 | 9 | Info | OPEN | Locale-ul maghiar există, dar este nepublicat, fără traduceri, fără HUF și fără conținut legal/de livrare maghiar: lista de pregătire pentru o lansare reală în Ungaria (opțiunea c) |
| AUTHORITY-01 | 10 | High | OPEN | Domeniul lipsește din graful web Common Crawl, în timp ce competitorul principal este clasat |
| AUTHORITY-02 | 10 | High | OPEN | Zero mențiuni terțe găsite pentru brand, firmă, fondator sau produse |
| AUTHORITY-03 | 10 | High | READY | `sameAs` din Organization nu coincide cu profilurile sociale reale pe niciuna dintre cele trei rețele și omite YouTube |
| AUTHORITY-04 | 10 | Medium | OPEN | Nicio sursă de date de backlink-uri scorabilă nu este configurată (GSC, Bing WMT, Moz) |
| AUTHORITY-05 | 10 | High | READY → FIXED-R2 | 194 articole poartă un link „Powered by BlogGenAuto” șablonat, dofollow și cu contrast scăzut |
| AUTHORITY-06 | 10 | High | READY → FIXED-R2 | 2 582 linkuri din corpul articolelor către primesupplements1.myshopify.com (incl. 534 linkuri /cart/) redirecționează, dublează și irosesc echitatea internă |
| AUTHORITY-07 | 10 | Medium | PENDING | Magazinul B2B este o a doua entitate indexabilă, cu CUI-ul drept nume, profiluri sociale placeholder Shopify și catalog duplicat |
| AUTHORITY-08 | 10 | Medium | PENDING → FIXED-R2 | Piața duplicat /ro-hu/ împarte fiecare semnal off-site între două seturi de URL-uri |
| AUTHORITY-09 | 10 | Medium | READY | Cele 431 recenzii Judge.me sunt invizibile off-site: fără pagină publică de recenzii, fără markup rich-snippet, fără profiluri terțe de recenzii |
| AUTHORITY-10 | 10 | Medium | READY → FIXED-R2 | Entitatea autorului expert („Marius Chera, Nutriționist Certificat”) este necoroborată, marcată inconsistent și fără pagină de autor |
| AUTHORITY-11 | 10 | Low | READY | Schema Organization omite adresa, telefonul, legalName și identificatorii fiscali, deși NAP-ul este pe fiecare pagină |
| AUTHORITY-12 | 10 | Low | READY | `foundingDate` 2020 din schema Organization contrazice registrul (J32/1155/2022) și pagina Despre noi („in anul 2022”) |
| AUTHORITY-13 | 10 | Low | FIXED | Handle-ul myshopify „primesupplements1” se scurge ca nume de brand/autor/vendor |
| AUTHORITY-14 | 10 | Low | OPEN → PARȚIAL | Profilul de linkuri de ieșire al blogului este boilerplate: aceleași 7 domenii străine de autoritate în 349 articole, fără surse de reglementare românești/UE, fără co-citare locală |
| AUTHORITY-15 | 10 | Info | OPEN | Fără active care să atragă linkuri: 354 articole șablonate, fără pagină de autor, unelte, date sau secțiune „parteneri”/presă |
| AUTHORITY-16 | 10 | Info | OPEN → READY-R2 | Igienă minoră de ieșire: linkul WhatsApp site-wide trece printr-un scurtător terț |
| SXO-01 | 11 | High | PENDING → PARȚIAL | Articolele de blog, nu colecția și produsele de creatină, sunt paginile pe care Google le asociază cu termenii comerciali pentru creatină |
| SXO-02 | 11 | High | FIXED | Paginile de colecție sunt „filtre + 3-5 carduri”, în timp ce SERP-ul românesc recompensează paginile de categorie bogate (și ghidurile) |
| SXO-03 | 11 | High | READY | Numele de brand nu este deținut în căutare: „prime supplements” / „primesupplements” / „prime whey” întorc alte companii |
| SXO-04 | 11 | High | OPEN → PARȚIAL | URL-urile vechi WooCommerce (categorie-produs, cache-buster ?v=, host www) sunt încă ceea ce arată Google pentru site |
| SXO-05 | 11 | High | PENDING | Magazinul en-gros b2b.primesupplements.ro este indexat și servește consumatorilor pagini de produs cu prețuri B2B |
| SXO-06 | 11 | Medium | OPEN | SERP-urile pentru termenii comerciali principali sunt dominate de farmacii, publicații medicale și marketplace-uri; magazinul concurează cu autoritate zero și fără amprentă de advertoriale / PR |
| SXO-07 | 11 | High | OPEN | Homepage-ul se deschide cu un slogan în engleză și un rând de haine epuizate, picând toate persona-urile de cumpărători de suplimente deasupra pliului |
| SXO-08 | 11 | Medium | OPEN → PARȚIAL | Paginile de produs ascund conținutul educațional și logica de preț pe care SERP-ul de decizie le așteaptă și distrag cu un CTA B2B |
| SXO-09 | 11 | High | PENDING → FIXED-R2 | 355 de articole generate automat se canibalizează reciproc și țintesc subiecte tranzacționale cu pagini informaționale |
| SXO-10 | 11 | Medium | OPEN → PARȚIAL | Articolele sunt fundături pentru orice persona în faza de decizie: fără traseu către produs, încredere slabă în autor, date învechite |
| SXO-11 | 11 | Medium | OPEN | Linia de haine MNX (54 % din catalog) nu are identitate căutabilă și primește prioritate pe homepage în fața suplimentelor |
| SXO-12 | 11 | Medium | PENDING → FIXED-R2 | Piața /ro-hu/ le servește căutătorilor maghiari conținut românesc în RON și este oricum invizibilă |
| SXO-13 | 11 | Low | OPEN → PARȚIAL | Șirurile UI și de catalog în limbi amestecate strică claritatea pentru persona-urile românești pe fiecare template |
| SXO-14 | 11 | Medium | OPEN | Persona vânătoare de oferte este trimisă către o colecție „Reduceri” goală, deși 144 de produse au preț tăiat |
| SXO-15 | 11 | Low | READY → FIXED-R2 | Trei listări identice cu 185 de produse („All Products”, „Cele mai vândute”, „Lansate recent”) plus „11% TVA” și „Prime Health” concurează pentru intrarea generică „suplimente” fără potrivire de intenție |
| SXO-16 | 11 | Info | OPEN | Marcajul FAQPage de pe homepage și de pe produsele de creatină nu are efect în SERP; păstrează-l doar ca conținut |
| VISUAL-01 | 12 | High | PENDING | Bannerul de cookie-uri e un modal pe tot ecranul pe mobil și acoperă hero-ul pe desktop |
| VISUAL-02 | 12 | Medium | OPEN | Pagina de produs pe mobil nu are CTA „Adaugă în coș” above the fold |
| VISUAL-03 | 12 | Medium | OPEN | H1-ul homepage-ului e doar numele brandului; titlul vizibil nu e H1 |
| VISUAL-04 | 12 | Low | OPEN → FIXED-R2 | 24 de imagini de pe homepage se randează fără alt (imagini de temă/secțiuni) |
| VISUAL-05 | 12 | Low | PENDING | Widgetul WhatsApp flotant acoperă cardurile de produs pe mobil |
| LOCAL-01 | 13 | High | READY → READY-R2 | Schema Organization nu conține adresă, telefon, e-mail, legalName sau cod de TVA pe niciunul dintre cele ~1 150 de URL-uri |
| LOCAL-02 | 13 | High | READY | `sameAs` trimite Google la un cont TikTok greșit; handle-urile Facebook/Instagram din schemă diferă de cele din footer; YouTube lipsește |
| LOCAL-03 | 13 | Medium | OPEN → READY-R2 | Adresa stradală din footer este un link către `https://www.primesupplements.ro/cart/#` pe fiecare pagină |
| LOCAL-04 | 13 | Medium | OPEN → PARȚIAL | NAP-ul este scris în șase forme pentru nume, patru pentru adresă și trei pentru telefon; o pagină legală numește o firmă care nu există |
| LOCAL-05 | 13 | Medium | OPEN | Adresa din profilul magazinului Shopify este incompletă (oraș gol, stradă fără număr), iar locația de fulfilment nu are nicio adresă |
| LOCAL-06 | 13 | Medium | PENDING | Magazinul B2B indexabil prezintă o altă entitate: nume legal + CUI drept brand, fără adresă/telefon, link-uri sociale către conturile Shopify |
| LOCAL-07 | 13 | Medium | READY | Recenziile există doar în widget-ul Judge.me: niciun aggregateRating/Review în JSON-LD, o singură platformă, fără prezență Google/Trustpilot găsită |
| LOCAL-08 | 13 | Low | OPEN → READY-R2 | Pagina de contact nu are H1, meta description, program, identitate a firmei și context de livrare/hartă; programul de suport există doar într-un acordeon FAQ pe homepage |
| LOCAL-09 | 13 | Low | READY | `foundingDate` „2020” din Organization contrazice registrul (2022-06-07) și pagina Despre noi („in anul 2022”) |
| LOCAL-10 | 13 | Low | READY | `contactPoint.availableLanguage` declară suport în maghiară și nu există `areaServed`, deși site-ul nu are locale maghiar publicat și livrează doar în România |
| LOCAL-11 | 13 | Info | OPEN | Niciun semnal Google Business Profile / Bing Places / Apple pe site, iar firma nu este eligibilă pentru ele ca magazin exclusiv online: nu creați o fișă |
| LOCAL-12 | 13 | Info | OPEN → READY-R2 | Niciun semnal local de autoritate/citare dincolo de registrul statutar; entitatea fondatorului nu este legată; lint-ul GBP deprecat este curat |
| LOCAL-13 | 13 | Info | OPEN → READY-R2 | Link-uri pentru litigii de consum: doar un link generic `https://anpc.ro/` în footer; pagina ANPC SAL nu este legată |
