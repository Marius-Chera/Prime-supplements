## 11. Experiența de căutare (SXO) și intenție

**Scor specialist (la momentul auditului):** 22/100 — un singur specialist (sxo): în 11 SERP-uri comerciale românești observate la 2026-10-12 (pudra proteica, proteine din zer, suplimente pre workout, batoane proteice, arzator de grasimi, cea mai buna creatina, suplimente culturism, creatina creapure, prime whey, pre workout fara cofeina, bcaa vs eaa) primesupplements.ro nu a apărut niciodată; restrâns la magazine românești, domeniul apare doar cu articole de blog din 2026 pentru „creatina” / „creatina monohidrata”, în timp ce gymbeam.ro, bodyline.ro și decathlon.ro rankează cu pagini de categorie și de produs; numele de brand nu este deținut în căutare, URL-urile WooCommerce vechi sunt încă indexate, magazinul B2B este indexat, iar cele trei template-uri de bani (homepage, colecție, produs) pică persona-urile „sceptic” și „comparator de preț”. **Scor combinat: 22/100** (un singur specialist alimentează secțiunea).

**Scor estimat după remedierile din 12.10.2026:** 30/100 — pe magazinul live s-au schimbat doar semnalele de conținut și metadate (corp de descriere de 3 paragrafe pe 17 colecții de categorie, SEO title/description pe 23 colecții, 195 produse și 354 articole cu titluri diferențiate pe un singur subiect, vendor/productType corecte, 17 autori re-atribuiți), ceea ce rezolvă SXO-02 și o parte din SXO-01 / SXO-09 / SXO-11; nimic din ce determină experiența în SERP (vizibilitatea pe termenii comerciali, brandul, URL-urile legacy, B2B, /ro-hu, ordinea homepage-ului, traseul articol → produs) nu s-a mișcat încă. Publicarea temei de test (titlu cu sufix de brand, Organization/Product/Article JSON-LD valide, noindex pe listările utilitare, neutralizarea linkurilor BlogGenAuto) ar duce estimarea la ~38/100, iar acțiunile proprietarului (consolidarea blogului, noindex pe B2B, ștergerea /ro-hu, redirecturile legacy) la ~55-60/100.

*Notă: specialistul raportează și un SXO Gap Score pe pagină (7 dimensiuni: Page type 15 / Depth 15 / UX 15 / Schema 15 / Media 15 / Authority 15 / Freshness 10), separat de scorul de categorie: `/collections/creatina` vs „creatina monohidrata” = 38/100, `/collections/pudra-proteica` vs „pudra proteica” = 40/100, `/blogs/news/bcaa-vs-eaa-...` vs „bcaa vs eaa” = 35/100, `/products/creatina-creapure` vs „creatina creapure” = 58/100. Persona-urile derivate din SERP: P1 Începătorul la sală, P2 Comparatorul de preț, P3 Consumatorul sceptic (siguranță), P4 Atletul avansat / culturistul, P5 Clientul B2B. Persona cea mai slabă pe toate template-urile: P3 (28 / 28 / 48 / 29 din 100 pe homepage / colecție / produs / articol); dimensiuni sistemic deficitare: Action pe articole (3-4 / 25) și Trust peste tot (max 17 / 25).*

### Ce funcționează

- Magazinul principal este indexat cu titluri românești conduse de cuvinte-cheie pe colecțiile importante: `site:primesupplements.ro` a întors „Pudra proteica pentru masa musculară” (`/collections/pudra-proteica`), „Suplimente Pre Workout pentru energie maximă”, „Vitamine și minerale esențiale”, „Despre noi - Prime Supplements”, paginile de produs EAA și Frutilu.
- Domeniul poate ranka: două articole despre creatină (`/blogs/news/creatina-monohidrata-nitrox-no-stim-combining-supplements`, `/blogs/news/monohydrate-creatine-cum-sa-stii-daca-creatina`) au apărut lângă gymbeam.ro / decathlon.ro în setul restrâns la magazine românești pentru „creatina monohidrata”, iar `/blogs/news/creatina-si-volumizarea-musculara-cum-sa-stii-daca-creatina` pentru „creatina”.
- Buy box-ul de produs este complet pentru un cumpărător în faza de decizie: „Preț redus 180,00 lei”, „În stoc”, „Produs în Uniunea Europeană”, 2 variante (500g/100serv, 300g/60serv), „17 recenzii”, „Adaugă în coș” + „Cumpără acum”, bara site-wide „Livrare gratuită la comenzile de peste 300 RON”, metodele de plată (Ramburs, Visa, Mastercard, ApplePay) în FAQ.
- Colecțiile au deja filtre (Doar în stoc, Preț, Cantitate) și 8 opțiuni de sortare, iar secțiunea `main-collection` a temei Impact poate găzdui blocuri description / rich-text, deci remedierea este de conținut, nu de dezvoltare.
- Corpusul de blog este long-form (mediană 1529 cuvinte, 348/355 articole cu tabele, 338 citând studii) și leagă deja produse (mediană 10 linkuri de produs / articol): materie primă care poate fi consolidată în hub-uri de categorie în loc să fie aruncată.

### Constatări

#### SXO-01 — Articolele de blog, nu colecția și produsele de creatină, sunt paginile pe care Google le asociază cu termenii comerciali pentru creatină

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| High | PENDING (acțiune proprietar) | L | 0.85 |

**Dovezi:** SERP restrâns la magazine românești, interogarea `creatina monohidrata` (2026-10-12): primesupplements.ro apare doar cu `/blogs/news/creatina-monohidrata-nitrox-no-stim-combining-supplements` și `/blogs/news/monohydrate-creatine-cum-sa-stii-daca-creatina`; concurenții rankează cu pagini de categorie și de produs: `gymbeam.ro/creatina-monohidrat?product_list_order=reviews_count` (categorie), `gymbeam.ro/creatina-monohidrata-mammut-nutrition.html`, `.../creatina-monohidrata-gymbeam.html`, `.../creatina-monohidrata-redcon1.html`, `decathlon.ro/creatina-monohidrata-creapure-id_8601333.html` + încă 3 pagini de produs Decathlon. Pentru `creatina` site-ul apare cu `/blogs/news/creatina-si-volumizarea-musculara-cum-sa-stii-daca-creatina`; concurenții cu `gymbeam.ro/creatina-creapure` (produs) și `bodyline.ro/cresterea-masei-musculare/creatina-monohidrata/` (categorie, titlu „...Doar 89 Lei”). Propria `/collections/creatina` are 3 produse (CollectionPage `numberOfItems` 3), 560 de cuvinte inclusiv chrome-ul temei, descriere goală, titlu „Creatina monohidrat pentru forță și performanță”; `/products/creatina-creapure` nu a apărut nici măcar pentru `creatina creapure`. 68 din 355 de articole au „creatin” în titlu (80 în handle), 19 handle-uri conțin „creapure”, 42 de handle-uri se termină în -2..-5 (subiecte regenerate) — `$R/shopify/articles-all.json`. Rezumatul propriu al motorului de căutare a semnalat: „Several 2026 blog posts from supplement sellers make exaggerated or inaccurate claims”. SXO Gap Score `/collections/creatina` vs „creatina monohidrata”: 11 / 2 / 7 / 5 / 6 / 3 / 4 = **38/100**.

**Impact / pagini afectate:** întregul cluster de creatină (colecția, 4 produse de creatină, 68 de articole) și, prin același tipar, proteine (29 titluri), arzătoare de grăsimi (28), BCAA (13), pre-workout (13), glutamină (12). Traficul comercial aterizează pe pagini informaționale fără buton de cumpărare: din SERP-urile observate, 0 % din aparițiile pentru „creatin” duc către `/collections/` sau `/products/`.

**Recomandare:** stadiu la 12.10.2026: colecțiile de categorie au primit pe live un corp de descriere de 3 paragrafe (`descriptionHtml`) și SEO title/description noi (`applied/collections-plan.json`), cele 354 de articole au titluri diferențiate, un subiect fiecare (`applied/articles-plan.json`), iar linkurile `primesupplements1.myshopify.com` sunt neutralizate la randare în tema de test (`sections/main-article.liquid`) și în corpurile curățate (`blog-cleanup/cleaned-bodies.tar.gz`, import Matrixify). Decizia editorială rămâne la proprietar: (1) fă din `/collections/creatina` hub-ul: 500-700 de cuvinte de ghid de cumpărare în `collection.description` (monohidrat vs Creapure, 3-5 g/zi, când se ia, micronizată, preț/porție), un tabel comparativ cu 4 rânduri pentru SKU-urile de creatină ale magazinului (gramaj, porții, preț/porție, Creapure da/nu) și agregatul Judge.me al colecției; în tema Impact adaugă un bloc `rich-text` / `custom-liquid` sub grila de produse în `sections/main-collection.liquid`, nu deasupra ei. (2) Consolidează cele 68 de articole de creatină în cel mult 8 ghiduri-pilon (ghid dozare, Creapure vs monohidrat, efecte secundare/mituri, creatina pentru femei, creatina și slăbit, creatina în călătorii, pauză/ciclare, creatina + pre-workout) și 301 restul către pilon sau către colecție (Shopify Admin > URL redirects, CSV în bloc; harta 301 este în constatările de cluster). (3) În fiecare articol de creatină păstrat, link pe primul ecran „Vezi creatina monohidrat și Creapure în stoc” către `/collections/creatina` și un card de produs către SKU-ul relevant (metafield `article.metafields.custom.featured_product` randat în `sections/main-article.liquid`). (4) Elimină linkurile duplicate către `primesupplements1.myshopify.com`, ca echitatea de link să meargă către un singur URL (publicarea temei + importul corpurilor).

**Cum verificăm (falsificabilitate):** după 8-12 săptămâni, GSC „Performance > Pages” filtrat pe interogările care conțin „creatin” trebuie să arate `/collections/creatina` și cele 2 produse de creatină ca URL-uri de top; dacă URL-urile de blog iau în continuare > 70 % din impresiile pentru creatină, consolidarea nu a funcționat.

**Indicator timpuriu:** raportul de interogări GSC filtrat „creatin”: ponderea clickurilor care aterizează pe URL-uri `/collections/` sau `/products/` (astăzi, din SERP-urile observate: 0 %).

#### SXO-02 — Paginile de colecție sunt „filtre + 3-5 carduri”, în timp ce SERP-ul românesc recompensează paginile de categorie bogate (și ghidurile)

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| High | FIXED (live 12.10.2026) | M | 0.85 |

**Dovezi:** `/collections/pudra-proteica`: 5 produse, word_count 591 (`$R/parsed/pages_collection.json`), `collection.description` goală (22 din 23 colecții, conform contextului de audit), CollectionPage JSON-LD `"description": ""`, conținutul principal începe cu „Filtre Sortează după Recomandat ... Doar în stoc Preț Lei Cantitate 2000g 3000g”, singurele H2 sunt „Alte categorii” și „Ghiduri și sfaturi utile”. Colecția este indexată (rezultat `site:` cu titlul „Pudra proteica pentru masa musculară”), dar lipsește atât din SERP-ul deschis `pudra proteica` (ghid medlife.ro, ghiduri biogena.com x2, produse drmax.ro, advertoriale bzi.ro pentru Bodyline, puterea.ro), cât și din cel restrâns la magazine românești (categorie decathlon.ro x3, inclusiv „Pudră Proteică - Proteine din Zer și Vegetale”, categorie drmax.ro „Proteine (pudre proteice)”, categorie filtrată emag.ro). Același tipar pentru `/collections/creatina` (3 produse, 560 de cuvinte) și `/collections/suplimente-pre-workout` (absentă din `suplimente pre workout`, unde rankează paginile de categorie bulk.com/ro și drmax.ro). Filtrul „Cantitate” expune doar „2000g, 3000g”, deși colecția vinde și articole de 1 kg și 30 g. SXO Gap Score `/collections/pudra-proteica` vs „pudra proteica”: 11 / 2 / 8 / 5 / 6 / 3 / 5 = **40/100**; scoruri persona pe colecție: P1 49, P2 52, P3 28 („Critical mismatch”), P4 51.

**Impact / pagini afectate:** 23 de colecții — punctele de intrare pe categorie pentru toate cele 185 de produse; persona sceptică (P3) nu găsește nicio dovadă pe pagina de categorie, iar comparatorul de preț (P2) nu vede preț/porție.

**Recomandare:** Verificare: pe live, 17 colecții de categorie au primit un corp de descriere de 3 paragrafe cu fapte despre produse (`descriptionHtml`), iar toate cele 23 au SEO title + description noi (`applied/collections-plan.json`). Deschide `/collections/pudra-proteica`, `/collections/creatina` și `/collections/suplimente-pre-workout` și confirmă că textul se randează (Impact: setarea „description” a secțiunii `main-collection` trebuie să fie activă în Customize) și că, după publicarea temei de test, CollectionPage JSON-LD nu mai conține `"description": ""` (`snippets/schema-collection.liquid` emite acum CollectionPage + ItemList + BreadcrumbList). Rămân de făcut, pe fiecare dintre cele 12 colecții de categorie: 3-5 FAQ-uri care răspund întrebărilor P1/P3 văzute în SERP (ce este, tipuri concentrat/izolat/vegetal, cum alegi, cât/când, siguranță, certificări TUV/IFS/HALAL; marcajul FAQPage doar pentru cititorii AI/LLM), un tabel comparativ al SKU-urilor (proteină/porție, preț/porție), numărul de recenzii la nivel de colecție, cross-link către cele 2-3 articole cele mai bune; un intro scurt (60-90 de cuvinte) deasupra grilei și blocul lung sub ea (secțiune `rich-text` după grilă); repararea filtrului „Cantitate” cu aplicația Search & Discovery, mapând toate greutățile variantelor (30g, 1000g, 2000g, 3000g).

**Cum verificăm (falsificabilitate):** dacă, după ce textul este live, colecția tot nu intră în top 20 pentru interogarea exact-match a titlului ei (poziția medie în GSC), pagina este ținută pe loc de autoritate, nu de conținut.

**Indicator timpuriu:** impresii GSC pentru URL-ul colecției pe „pudra proteica”, „pudre proteice”, „proteine”; adâncimea de scroll / dwell pe noul bloc (Clarity).

#### SXO-03 — Numele de brand nu este deținut în căutare: „prime supplements” / „primesupplements” / „prime whey” întorc alte companii

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| High | READY (tema de test – de publicat) | M | 0.8 |

**Dovezi:** `prime supplements`: hari.ca (vitamina pentru păsări Hagen Prime), Prime Nutrition by Blackstone Labs x2, Prime Brands (patch.com), hellopharmacist „Prime”, 1800dtc „Prime Sports Nutrition” x2, eBay, etichetă NIH; 0 rezultate pentru magazinul românesc. `primesupplements`: aceleași plus Wikipedia „Prime Supermarket”, marca Alpha Prime Supps, spam Prime Biome. `prime supplements romania suplimente`: doar știri de piață (forbes.ro x4, economica.net x2, stirileprotv.ro). `prime whey proteina`: QNT Prime Whey (paris.cl x2, decathlon.de), Body Action „100% Whey Prime” x4, Prozis „Prime Whey” x2; singurul rezultat românesc este agregatorul `shopping.truda.io/product/proteina-din-zer-prime-supplements-prime-whey-1000g-bourbon-vanilla`, nu magazinul. Semnale on-site care contribuie: titlul homepage „Prime Supplements - Hardcore Sports Nutrition” (slogan în engleză), Organization schema cu `foundingDate "2020"` în timp ce `/pages/despre-noi` spune fondat în 2022 de Marius Chera, fără telefon/adresă în schema, vendor „primesupplements1” pe 64 de produse, fără sufix de brand în template-ul de titlu.

**Impact / pagini afectate:** toate interogările navigaționale / de brand și toate interogările produs + brand („prime whey”, „combat pro”, „nitrox no-stim”, „thermo core” se ciocnesc cu produse străine); clienții care caută magazinul după nume ajung la alte companii.

**Recomandare:** Verificare: (a) live — `vendor` este acum „Prime Supplements” (108 produse) sau „MNX” (87) pe toate cele 195 (`applied/products-plan.json`); (b) tema de test „Impact – SEO fixes 2026-10-12” (id 193875083639) are template de titlu cu sufix de brand și override pe homepage (`layout/theme.liquid`) și `snippets/schema-organization.liquid` cu Organization/OnlineStore (legalName, taxID, telephone, address Cisnădie, profiluri sameAs reale) + WebSite/SearchAction pe homepage. După publicare: `curl -s https://primesupplements.ro/ | grep -o '<title>[^<]*'` trebuie să arate noul titlu românesc, iar Rich Results Test să valideze Organization; confirmă în snippet că `foundingDate` este 2022 și `founder` Marius Chera (nu 2020). Template-ul recomandat de specialist:

```liquid
<title>{{ page_title }} | Prime Supplements</title>
```

cu titlul homepage „Prime Supplements România - Suplimente sportive produse în UE”. Rămân acțiuni ale proprietarului: Google Business Profile pentru adresa din Cisnădie și cont Merchant Center, ca interogările brand + produs să arate listările proprii; titluri/H1 de produs care poartă brandul („Prime Whey 2 kg - proteină din zer Prime Supplements”); 5-10 mențiuni românești (presă, YouTuberi de fitness, interviuri de tip Lucian Borza) cu șirul exact „Prime Supplements România”.

**Cum verificăm (falsificabilitate):** verificare manuală lunară a interogării „prime supplements” pe google.ro; eșec = magazinul nu este #1 cu sitelinks în 3 luni de la publicarea schimbărilor.

**Indicator timpuriu:** impresii și CTR pe interogări de brand în GSC; apariția unui Knowledge Panel.

#### SXO-04 — URL-urile vechi WooCommerce (categorie-produs, cache-buster ?v=, host www) sunt încă ceea ce arată Google pentru site

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| High | OPEN | S | 0.9 |

**Dovezi:** `site:primesupplements.ro` a întors 10 rezultate, dintre care 4 sunt URL-uri de dinaintea migrării sau cu parametri: `https://www.primesupplements.ro/categorie-produs/suplimente/`, `https://primesupplements.ro/categorie-produs/suplimente/?v=1eb2628f4187`, `https://primesupplements.ro/categorie-produs/suplimente/vitamine-si-minerale`, `https://primesupplements.ro/collections/suplimente-pre-workout?v=1eb2628f4187` (motorul a marcat un rezultat ca vechi de „about 626 days”). Verificare live (curl, 2026-10-12): `https://www.primesupplements.ro/categorie-produs/suplimente/` → 301 `https://primesupplements.ro/collections/suplimente` → 301 `/collections/suplimente-sala` (2 hopuri după hopul www, deci 3 redirecturi până la conținut); `/categorie-produs/suplimente/?v=1eb2628f4187` → 301 `/collections/suplimente?v=1eb2628f4187` (parametrul este purtat mai departe); `/categorie-produs/suplimente/vitamine-si-minerale` → 301 `/collections/vitamine-si-minerale`; `/collections/suplimente-pre-workout?v=1eb2628f4187` → 200, titlu „Suplimente Pre Workout pentru energie maximă | Prime”, canonical către URL-ul curat (duplicat crawlabil, nu de index).

**Impact / pagini afectate:** toate fostele URL-uri WooCommerce `/categorie-produs/...` și `/produs/...` (număr necunoscut; cel puțin 3 observate) și orice URL cu `?v=` (cache-buster-ul de geolocalizare WooCommerce). 4 din 10 rezultate `site:` vizibile sunt URL-uri moarte sau cu parametri: CTR pierdut pe interogări de brand și buget de crawl consumat pe lanțuri de redirect.

**Recomandare:** nimic aplicat la 12.10.2026. (1) Exportă vechiul sitemap WooCommerce / URL-urile legacy din GSC și încarcă o hartă completă de redirecturi într-un singur hop în Shopify Admin > Online Store > Navigation > URL redirects (de ex. `/categorie-produs/suplimente/` → `/collections/suplimente-sala`, `/categorie-produs/suplimente/vitamine-si-minerale` → `/collections/vitamine-si-minerale`); redirecturile trebuie să indice URL-ul final, nu `/collections/suplimente`. (2) Shopify elimină parametrii necunoscuți doar în canonical; păstrează canonical-ul, dar adaugă tratarea `?v=*` prin harta de redirecturi pentru valorile observate (`/collections/suplimente-pre-workout?v=1eb2628f4187` → URL-ul curat). (3) În GSC trimite sitemap-ul principal și folosește „Removals > Outdated content” pentru rezultatele www / legacy; verifică și proprietatea www.

**Cum verificăm (falsificabilitate):** `site:primesupplements.ro categorie-produs` după 60 de zile trebuie să întoarcă 0 rezultate; dacă URL-urile legacy persistă, redirecturile nu sunt 301 sau nu s-a cerut eliminarea în GSC.

**Indicator timpuriu:** în GSC, raportul Pages — numărul „Page with redirect” crescând, apoi scăzând; statistici de crawl pentru `categorie-produs`.

#### SXO-05 — Magazinul en-gros b2b.primesupplements.ro este indexat și servește consumatorilor pagini de produs cu prețuri B2B

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| High | PENDING (acțiune proprietar) | S | 0.9 |

**Dovezi:** `site:b2b.primesupplements.ro` a întors `https://b2b.primesupplements.ro/products/combat-pro` „Combat PRO 500g/22 serv” cu „140 RON vs 170 RON”, arome, „pickup unavailable”, vânzător PRIME SPORT SUPPLEMENTS SRL. Live: HTTP 200, fără noindex, fără canonical către magazinul principal; sitemap-ul B2B listează 58 de URL-uri de produs cu aceleași handle-uri ca magazinul principal (context de audit). Un consumator care aterizează acolo vede alt preț și niciun flux de checkout retail; Google poate alege și copia B2B drept canonical pentru descrierea duplicată.

**Impact / pagini afectate:** 58 de URL-uri de produs B2B care dublează 58 de produse retail (31 % din catalog); confuzie de canal pentru persona P5 și prețuri contradictorii (140 vs 170 RON) vizibile în SERP.

**Recomandare:** pregătit, dar neaplicat — acțiune pe celălalt magazin (`data/remediation-status.md`: „B2B store noindex/password: owner action”). Pune magazinul B2B în spatele autentificării (Shopify B2B „require customers to log in” / parolă de storefront), adaugă în `layout/theme.liquid` al temei B2B:

```liquid
<meta name="robots" content="noindex, nofollow">
```

scoate-l din orice trimitere de sitemap și, dacă trebuie să rămână public, adaugă pe template-ul de produs:

```liquid
<link rel="canonical" href="https://primesupplements.ro/products/{{ product.handle }}">
```

Păstrează `/pages/inregistrare-b2b` de pe domeniul principal ca singura intrare B2B indexabilă.

**Cum verificăm (falsificabilitate):** `site:b2b.primesupplements.ro` întoarce 0 rezultate în 4-8 săptămâni; altfel noindex-ul nu este servit pe paginile pe care Google le-a preluat.

**Indicator timpuriu:** acoperirea GSC a proprietății b2b; mixul de surse al comenzilor B2B în Shopify.

#### SXO-06 — SERP-urile pentru termenii comerciali principali sunt dominate de farmacii, publicații medicale și marketplace-uri; magazinul concurează cu autoritate zero și fără amprentă de advertoriale / PR

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Medium | OPEN | L | 0.75 |

**Dovezi:** domenii recurente în cele 11 interogări comerciale: drmax.ro (8 interogări), medlife.ro (4), bulk.com/ro (5), decathlon.ro (3), gymbeam.ro (2), catena.ro, biogena.com, emag.ro, worldclass.ro, bzi.ro (2, advertoriale pentru Bodyline: „Prima pagină » Magazin » Bodyline. Ce este pudra proteică?”, „Body Line- Complex de vitamine...”), prosport.ro („ADVERTORIAL. Beneficiile ... batoanelor proteice”), teste de consum infocons.ro, newsweek.ro. primesupplements.ro: 0 din 11. Domeniul lipsește din graful web Common Crawl (context de audit) și nu există date despre domenii referitoare. SERP-urile „batoane proteice” și „pudra proteica” sunt încadrate pe protecția consumatorului (InfoCons: zahăr 2-36 g/100 g, sare 0-1,3 g/100 g; „De ce sunt periculoase batoanele proteice”), adică Google servește conținut de încredere înaintea magazinelor.

**Impact / pagini afectate:** toate interogările non-brand la nivel de categorie (`/collections/pudra-proteica`, `/collections/batoane-proteice` și celelalte hub-uri); persona P3 (sceptic) are cel mai mic scor pe fiecare template (28 / 28 / 48 / 29).

**Recomandare:** nimic aplicat la 12.10.2026 (acțiune off-site / editorială). (1) Replică tactica concurenților cu 4-6 advertoriale / interviuri românești pe an (stil bzi.ro, prosport.ro, worldclass.ro) care leagă către hub-urile de colecție, semnate de Marius Chera ca „nutriționist certificat”; (2) publică o pagină de transparență de laborator (`/pages/analize-de-laborator`) cu certificate pe lot pentru proteină, creatină și batoane, legată din fiecare pagină de produs (răspunde încadrării InfoCons / newsweek); (3) creează pagina de comparație „Cea mai bună creatină în 2026: monohidrat vs Creapure vs HCL” (tip Comparison, tabel + verdict), pentru că acel SERP are doar ghiduri, un forum și pagini de produs, fără o comparație structurată; (4) înregistrează magazinul pe agregatoarele de preț care îl indexează deja (shopping.truda.io) și pe compari.ro / price.ro.

**Cum verificăm (falsificabilitate):** niciun domeniu referitor nou în 6 luni (nivelurile gratuite Ahrefs / Moz) și nicio mișcare pe cele 11 interogări arată că decalajul de autoritate nu a fost abordat.

**Indicator timpuriu:** numărul de domenii referitoare; impresii GSC pe interogări de categorie non-brand.

#### SXO-07 — Homepage-ul se deschide cu un slogan în engleză și un rând de haine epuizate, picând toate persona-urile de cumpărători de suplimente deasupra pliului

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| High | OPEN | M | 0.8 |

**Dovezi:** ordinea conținutului principal în `$R/home.html`: hero „PRIME SUPPLEMENTS Hardcore sports nutrition Vezi produse” → tile-uri de categorii → „NOU - Haine MNX” cu cardurile „Stoc epuizat MNX Shaker 600 ml No reviews Preț redus 30,00 lei”, „MNX Ribbed shorts Hammer 3.0, white ... Stoc epuizat”, „MNX Ribbed shorts Hammer, grey No reviews ... Stoc epuizat”; suplimentele („Pudre proteice”, „Pre Workout”, „Cele mai vândute”) abia după; secțiunea H2 „Reduceri” leagă către `/collections/reduceri`, care are 0 produse (context de audit). Șiruri de încredere: doar „Livrare gratuită la comenzile de peste 300 RON” (bara de anunț) și „Tehnologii de ultimã generație şi ingrediente de cea mai înaltă calitate”; certificările TUV / IFS / HALAL există doar pe `/pages/despre-noi` (snippet `site:`). Limbi amestecate pe pagină: „No reviews”, „14 reviews” lângă „44 recenzii”, „Let customers speak for us”, titlul „Hardcore Sports Nutrition”. Scoruri persona pe homepage: P1 44, P2 51, P3 28 („Critical mismatch”), P4 56.

**Impact / pagini afectate:** homepage-ul — pagina de aterizare pentru 100 % din traficul navigațional; cumpărătorul de suplimente vede întâi haine epuizate și o secțiune de oferte goală.

**Recomandare:** stadiu: doar titlul și meta description ale homepage-ului sunt rescrise în tema de test (override în `layout/theme.liquid`); ordinea secțiunilor nu a fost atinsă. Reordonează secțiunile Impact (Online Store > Customize, template `index.json`): (1) hero cu propunere de valoare în română și 3 USP-uri („Suplimente produse în UE”, „Livrare gratuită peste 300 lei”, „4,8/5 din 1 000+ recenzii” folosind totalul real din Judge.me), CTA principal „Vezi cele mai vândute” către o colecție manuală cu produse în stoc; (2) o bandă de încredere „De ce Prime” cu insignele TUV / IFS / HALAL și link către pagina de certificate de laborator; (3) rândul de suplimente best-seller (featured collection cu „doar în stoc” sau colecție manuală curatoriată săptămânal); (4) mută „Haine MNX” sub rândurile de suplimente și ascunde variantele epuizate; (5) scoate secțiunea „Reduceri” până când colecția este populată (regulă de colecție automată: preț de comparație > preț); (6) tradu șirurile widget-ului Judge.me (Judge.me > Settings > Translations: „recenzii”, „Nicio recenzie”, „Ce spun clienții noștri”).

**Cum verificăm (falsificabilitate):** înregistrările Clarity arată scroll dincolo de rândul MNX înainte de orice click; dacă click-through-ul homepage → colecție nu crește după reordonare, problema este în altă parte.

**Indicator timpuriu:** „dead clicks” și adâncimea de scroll pe hero în Clarity; „Sessions converted” în Shopify pentru landing page = homepage.

#### SXO-08 — Paginile de produs ascund conținutul educațional și logica de preț pe care SERP-ul de decizie le așteaptă și distrag cu un CTA B2B

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Medium | OPEN | M | 0.8 |

**Dovezi:** `/products/creatina-creapure` (`$R/pages/product-creatina-creapure.html`): H1 „Creatine (Creapure®)” în engleză, în timp ce title / meta spun „Creatina Creapure”; „Preț redus 180,00 lei” fără preț per porție (1,80 lei/porție) și fără comparație cu propriul produs de 100 lei `creatina-monohidrat-micronized-300g-fara-aroma`; „Reprezinți o companie? Înregistrează-te în platforma B2B” direct sub „Adaugă în coș”; heading „Customer Reviews” în engleză; cele patru H2 de educare a cumpărătorului („Ce Este Creatina Creapure?”, „Beneficiile Creatinei Creapure”, „Cum Funcționează...”, „Recomandări de Utilizare”) se randează după „S-ar putea să-ți placã”, „Customer Reviews”, „Cele mai vândute”, „Categorii populare”; breadcrumb JSON-LD „All Products”; Product JSON-LD invalid pe descrierile multi-linie și AggregateOffer cu „190,00” (constatările de schema), deci niciunul dintre rich result-urile de preț / rating pe care le poartă rezultatele decathlon / gymbeam. Titlurile concurenților din SERP conțin prețul („Doar 89 Lei”) și brandul Creapure; pagina nu a apărut pentru `creatina creapure`. SXO Gap Score: 14 / 11 / 10 / 4 / 9 / 7 / 3 = **58/100**; persona: P1 65, P2 59, P3 48, P4 71.

**Impact / pagini afectate:** 85 de pagini de produs de suplimente (template `sections/main-product.liquid`); cele 100 de pagini MNX folosesc același template, cu descrieri de 0 cuvinte.

**Recomandare:** stadiu: punctul (6) este gata în tema de test — `snippets/schema-product-enhanced.liquid` emite Product JSON-LD valid (filtrul `json`), Offer per variantă cu preț numeric, `priceValidUntil`, `availability`, sku/gtin, `hasMerchantReturnPolicy` (14 zile, RO), `shippingDetails` (20 RON / gratuit ≥ 300 RON), `aggregateRating` din metafield-urile Judge.me, brand din vendor; `schema-breadcrumb-enhanced.liquid` sare peste colecțiile utilitare, deci breadcrumb-ul nu mai arată „All Products”. Verificare după publicare: Rich Results Test pe `/products/creatina-creapure` → Product valid, apoi rapoartele GSC „Merchant listings” / „Product snippets”. Rămân deschise: (1) H1 în română („Creatină Creapure® 500 g / 300 g”), brandul păstrat în titlu; (2) linia „Preț per porție” în `snippets/product-info.liquid`, calculată din `product.selected_or_first_available_variant.price | divided_by: servings_metafield`; (3) linkul B2B mutat în footer sau într-un rând pliabil „Ești profesionist?”; (4) blocul de descriere / educație mutat deasupra recomandărilor și recenziilor (Impact: ordinea secțiunilor în `templates/product.json`), plus o comparație pe 3 coloane „Care creatină ți se potrivește?” care leagă cele 3 SKU-uri de creatină; (5) un rând de încredere (Produs în UE, lot testat - link certificat, retur 14 zile, livrare 24-48 h).

**Cum verificăm (falsificabilitate):** rapoartele GSC „Merchant listings” / „Product snippets” arată 0 elemente valide după publicarea schemei → remedierea este greșită; rata de adăugare în coș nu se schimbă după mutarea CTA-ului B2B → ipoteza distragerii a fost greșită.

**Indicator timpuriu:** CTR-ul paginilor de produs în GSC pentru interogări cu numele produsului; rata de adăugare în coș (Shopify Analytics).

#### SXO-09 — 355 de articole generate automat se canibalizează reciproc și țintesc subiecte tranzacționale cu pagini informaționale

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| High | PENDING (acțiune proprietar) | L | 0.85 |

**Dovezi** (`$R/shopify/articles-all.json`, `catalog-analysis.md`): titluri care conțin creatin 68, protein / whey / izolat 29, fat-burner / slăbit 28, BCAA 13, pre-workout 13, glutamină 12; 46 de titluri conțin „semne”, 49 încep cu „Cum”, 33 folosesc încadrarea de listicle „N semne/motive/greșeli”, 279 conțin 2025/2026, 24 conțin „ghid”; 47 de grupuri de cuvinte-cheie acoperă 164 de articole; 719 perechi de titluri cu similaritate > 0,6; 42 de handle-uri se termină în -2..-5. Coliziuni concrete: „pre-workout fără cofeină” = 3 articole (`ce-este-un-pre-workout-fara-cofeina` 2025-05-26, `citicolina-ghid-pre-workout-fara-cafeina` 2026-03-15, `apa-de-cocos-nitrox-no-stim-antrenamente-seara` 2026-10-11) + produsul Nitrox NO-STIM, în timp ce SERP-ul acelei interogări are 6 pagini de produs (bulk.com „Dope pre-workout fără cofeină” 129 RON, kespro, muziker) și 3 ghiduri; „efecte secundare glutamina” = 2 handle-uri aproape identice (`glutamina-si-sanatatea-stomacului-efecte-secundare-glutamina-ghid-complet`, `glutamina-si-sanatatea-stomacului-cand-sa-iei-glutamina-semne`) contra unui SERP medical (apollohospitals, ncbi x2, cochrane); „bcaa vs eaa” = articol din 2025 de 517 cuvinte cu 0 linkuri contra unor bloguri de brand de 1500+ cuvinte (nakednutrition x7 locale, openfarma.it, fitadium). 17 titluri și 49 de handle-uri conțin nume de produse (Prime Whey, Combat PRO, Nitrox, Thermo Core, Crema de orez, Ready To Go...), deci articolele concurează cu propriile pagini de produs pentru interogările cu numele produsului. Handle-urile sunt generate automat din prompturi în engleză (191 conțin fragmente englezești, de ex. `gymbeam-creatine-creatina-monohidrat-micronized-300g-fara-5` include brandul unui concurent). Niciunul dintre cele 355 de articole nu a apărut în cele 3 SERP-uri tematice verificate.

**Impact / pagini afectate:** 355 de articole (majoritatea celor 1151 URL-uri indexabile) și colecțiile / produsele pe care le depășesc intern.

**Recomandare:** stadiu la 12.10.2026: `global.title_tag` + `global.description_tag` rescrise pe 354 / 355 articole, un singur subiect fiecare, deci cele 47 de grupuri canibalizante au acum titluri diferențiate (`applied/articles-plan.json`); corpurile curățate pentru toate cele 355 (`blog-cleanup/cleaned-bodies.tar.gz`, `cleanup-report.json`, `clean.py`) așteaptă importul prin Matrixify (foaia Blog Posts: ID, Body HTML) sau un script Admin API de 20 de linii; consolidarea celor ~190 de articole duplicate / canibalizante (harta 301 în constatările de cluster) este o decizie editorială neexecutată. Pașii rămași: inventar de conținut cu trei găleți — KEEP & MERGE (un pilon pe grup de cuvinte-cheie, 47 de grupuri → ~40 de piloni, corpuri unite, handle-ul cel mai bun păstrat, 301 pentru restul), REDIRECT (articolele cu nume de produs → pagina de produs; articolele „fără cofeină” → un singur ghid care leagă produsul Nitrox NO-STIM, al cărui titlu ar trebui să devină „Nitrox NO-STIM - Pre-workout fără cofeină 660 g”), DELETE / NOINDEX (articolul L-carnitină de 73 de cuvinte, ciornele nepublicate cu titlu englezesc, regenerările -2..-5). Oprește programarea BlogGenAuto până la terminarea inventarului; redenumește handle-urile care conțin branduri concurente (`gymbeam-...`). Adaugă tag-uri de blog = numele colecțiilor, ca fiecare pilon să stea într-un hub de tag legat din colecție.

**Cum verificăm (falsificabilitate):** dacă raportul de interogări GSC arată > 1 articol cu impresii pentru aceeași interogare la 8 săptămâni după consolidare, fuziunile nu au fost redirecționate; ponderea blogului în totalul clickurilor trebuie să scadă, iar clickurile pe colecții / produse să crească.

**Indicator timpuriu:** numărul de URL-uri `/blogs/news/` indexate (GSC Pages) coborând de la 354 la ~60-80.

#### SXO-10 — Articolele sunt fundături pentru orice persona în faza de decizie: fără traseu către produs, încredere slabă în autor, date învechite

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Medium | OPEN | M | 0.8 |

**Dovezi:** articolul BCAA vs EAA (`/blogs/news/bcaa-vs-eaa-diferențe-și-beneficii-pentru-culturisti-ghid-complet`, `$R/parsed/pages_article.json`): 0 linkuri interne, 0 linkuri de produs, 0 linkuri externe, singurul H2 „Te-ar putea interesa”, „29 mai 2025 De Marius Chera” fără link de acreditare, 517 cuvinte, structură doar cu H3; scoruri Action 3-4 / 25 la toate persona-urile (P1 47, P2 25, P3 29, P4 41); SXO Gap Score vs „bcaa vs eaa”: 12 / 4 / 6 / 3 / 6 / 3 / 1 = **35/100**. La nivel de blog: 112 articole au 0 linkuri de colecție, 6 au 0 linkuri de produs, 194 poartă un link dofollow „Powered by BlogGenAuto” în footer, fiecare link de produs este dublat către `primesupplements1.myshopify.com` (2582 linkuri), bio-ul autorului se repetă cu fapte contradictorii („8” vs „10 NPC PRO Cards”, „15 ani” vs „18 ani”), Article JSON-LD este invalid (bug-ul `escape`), 352 de corpuri încep cu linia hard-codată în engleză „Published: May 15, 2026”. Indexul blogului: titlu „Ultimele articole”, 11 pe pagină, 33 de pagini adâncime, fără hub-uri de tag.

**Impact / pagini afectate:** 355 de articole; indexul blogului; orice sesiune organică de blog se termină fără o cale către coș.

**Recomandare:** stadiu: live — 17 articole cu autorul „primesupplements1” re-atribuite lui „Marius Chera”, titluri / meta rescrise; tema de test — `snippets/schema-article.liquid` cu Article JSON-LD valid (Person author Marius Chera cu jobTitle, publisher, image, wordCount) și `sections/main-article.liquid` care neutralizează la randare artefactele BlogGenAuto (linkuri myshopify → relative, JSON-LD / scripturi înglobate inerte, link „Powered by” nofollow / sponsored); corpurile curățate (linia „Published:”, bio normalizat, linkuri rescrise) așteaptă importul prin Matrixify. Rămân deschise în `sections/main-article.liquid`: (a) o casetă de autor care randează o pagină reală `/pages/marius-chera` (acreditări, LinkedIn, fotografie) și un metaobject `author`; (b) un bloc „Produse recomandate” (2-3 carduri de produs dintr-un metafield de articol) după al doilea H2 și la final; (c) un link „Vezi categoria” către colecția potrivită în primele 100 de cuvinte; (d) „Actualizat la {{ article.updated_at }}” vizibil. Indexul blogului: titlu „Blog Prime Supplements - ghiduri de suplimente”, 24 pe pagină, hub-uri de tag per categorie.

**Cum verificăm (falsificabilitate):** click-through-ul articol → produs (eveniment GA4 sau Shopify „Sessions by landing page” → „Added to cart”) rămâne plat după adăugarea blocurilor.

**Indicator timpuriu:** conversii asistate din sesiunile cu aterizare pe `/blogs/`; clickuri pe linkurile interne din blocul „Produse recomandate” (Clarity).

#### SXO-11 — Linia de haine MNX (54 % din catalog) nu are identitate căutabilă și primește prioritate pe homepage în fața suplimentelor

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Medium | OPEN | M | 0.7 |

**Dovezi:** `MNX haine sala tricou` întoarce doar furnizori de anticorpi MNX1 (biossusa, lsbio, biorbyt, abbexa) și un întrerupător Schneider Electric „MNx”; 100 de produse MNX, 93 cu titluri în engleză („MNX Hoodie Industrial, dusty rose”), descriere mediană 0 cuvinte, 89 fără SEO title / description, 82 fără GTIN, 22 epuizate peste tot, variantele de culoare publicate ca produse separate (19 grupuri aproape duplicate / 45 de produse); primul rând de produse de pe homepage este „NOU - Haine MNX” cu articole epuizate.

**Impact / pagini afectate:** 100 de produse, `/collections/haine-mnx`, `/collections/echipament-sala`; jumătate din catalog nu poate fi găsit prin nicio interogare românească și ocupă cel mai valoros spațiu de pe homepage.

**Recomandare:** stadiu: pe live, cele 89 de produse MNX fără SEO title / description au acum meta în română, `vendor` „MNX” (87 produse), `productType` (Tricouri, Hanorace, Pantaloni, Pantaloni scurți, Pantaloni de trening, Maiouri, Șepci, Shakere, Accesorii sală) și categoria din Shopify Standard Product Taxonomy (de ex. aa-1-1-2-2 T-shirts), plus alt text pe toate imaginile. Decizia rămâne la proprietar: dacă MNX este un brand, dă-i o singură pagină de aterizare (`/collections/haine-mnx` cu „MNX - haine de sală by Prime Supplements”, 300 de cuvinte, ghid de mărimi, material, fotografii pe model) și țintește cererea românească („haine sala barbati”, „tricouri sala”, „pantaloni scurti sala”, „hanorac sala”) în titluri / H1; unește variantele de culoare într-un singur produs cu opțiuni de culoare; ascunde produsele epuizate de pe homepage și trece-le pe „draft” sau noindex când stocul este 0 mai mult de 60 de zile; dacă MNX este secundar, scoate-l complet din zona hero.

**Cum verificăm (falsificabilitate):** impresiile GSC pentru „mnx” + interogări de îmbrăcăminte rămân 0 la 3 luni după ce pagina de brand este live.

**Indicator timpuriu:** impresii pe interogările „haine sala” / „tricou sala”; ponderea MNX în clickurile de pe homepage (heatmap Clarity).

#### SXO-12 — Piața /ro-hu/ le servește căutătorilor maghiari conținut românesc în RON și este oricum invizibilă

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Medium | PENDING (acțiune proprietar) | S | 0.85 |

**Dovezi:** `site:primesupplements.ro/ro-hu` nu a întors niciun URL al site-ului (zgomot: termene.ro, bulksupplements.com/ro-hu, iherb, desertcart), deși 575 de URL-uri `/ro-hu/` sunt în sitemap cu hreflang `ro-HU`; piața nu are locale maghiar publicat și nici prețuri în HUF (context de audit; `$R/pages/homepage-ro-hu.html` este conținut românesc identic). Un căutător cu intenție maghiară care ar ateriza acolo ar primi text românesc și lei: zero valoare de experiență de căutare, în timp ce fiecare URL este crawlat de două ori.

**Impact / pagini afectate:** 575 de URL-uri duplicate (50 % din sitemap).

**Recomandare:** pregătit, neexecutat: `webPresenceDelete` pe `gid://shopify/MarketWebPresence/73400189303` a fost validat, dar este o schimbare de setări de vânzare care aparține proprietarului. Opțiuni: (a) dezactivează subfolderul web presence „Ungaria” până când traducerile maghiare (Translate & Adapt) și prețurile HUF sunt gata, sau (b) publică locale-ul HU cu colecții / produse traduse mai întâi și păstrează articolele doar în română. Nu ține live o piață netradusă. Pașii de execuție (redirecturi 1:1 pentru cele 575 URL-uri, setările de TVA) sunt detaliați în secțiunea 9 (INTERNATIONAL-01).

**Cum verificăm (falsificabilitate):** după dezactivare, Shopify trebuie să dea 301 de la `/ro-hu/*` la `/*`; dacă GSC raportează încă URL-uri `/ro-hu/` indexate după 8 săptămâni, redirecturile nu s-au aplicat.

**Indicator timpuriu:** numărul GSC „Duplicate, Google chose different canonical”.

#### SXO-13 — Șirurile UI și de catalog în limbi amestecate strică claritatea pentru persona-urile românești pe fiecare template

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Low | OPEN | S | 0.9 |

**Dovezi:** homepage / colecție / produs: „No reviews”, „14 reviews” vs „44 recenzii” pe carduri alăturate, „Let customers speak for us”, „Customer Reviews”; H1 de produs „Creatine (Creapure®)”; H1 de colecție „All Products”; breadcrumb „All Products”; titlu „Hardcore Sports Nutrition”; 96 de titluri de produs în engleză; corpurile articolelor încep cu „Published: May 15, 2026” în engleză; textul hard-codat „Tehnologii de ultimã generație” folosește un diacritic greșit (ã în loc de ă) în bara de anunț; meta description a homepage-ului nu are diacritice.

**Impact / pagini afectate:** toate template-urile (șirurile widget-ului Judge.me), 96 de produse, 352 de articole.

**Recomandare:** stadiu: titlul homepage și meta description sunt rescrise în tema de test, SEO title-urile produselor sunt în română pe live, linia „Published:” dispare la importul corpurilor curățate (Matrixify), iar breadcrumb-ul nu mai arată „All Products” după publicarea temei; șirurile UI rămân deschise. Judge.me > Settings > Translations (ro); în `locales/ro.json` al temei, „All Products” → „Toate produsele”; redenumește titlul colecției `all`; corectează textul barei de anunț („ultimă generație și”); titluri de produs în română cu numele englezesc secundar („Creatină Creapure® (Creatine)”).

**Cum verificăm (falsificabilitate):** un grep pe homepage-ul randat pentru „reviews|Customer Reviews|Let customers” întoarce în continuare potriviri.

**Indicator timpuriu:** nu este nevoie de altceva în afara grep-ului de mai sus.

#### SXO-14 — Persona vânătoare de oferte este trimisă către o colecție „Reduceri” goală, deși 144 de produse au preț tăiat

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Medium | OPEN | S | 0.9 |

**Dovezi:** secțiunea H2 „Reduceri” de pe homepage leagă către `/collections/reduceri` (0 produse, HTTP 200, indexabilă, titlu „Reduceri” — context de audit, `$R/pages/collection-reduceri.html`); 144 / 185 produse au compareAtPrice; cardurile de produs arată „Preț redus ... Economisește 20,00 lei”. Intenția de comparare a prețului este puternică în SERP-urile observate (bodyline „Doar 89 Lei”, categoria gymbeam sortată după numărul de recenzii, agregatoare de preț pentru „pret”).

**Impact / pagini afectate:** 1 colecție, secțiunea de pe homepage, toate cele 144 de produse reduse; persona P2 pierde singurul traseu dedicat ofertelor.

**Recomandare:** stadiu: tema de test pune `noindex,follow` pe `reduceri` (oprește indexarea paginii goale), dar colecția rămâne goală și secțiunea de pe homepage rămâne. Fă din „Reduceri” o colecție automată (condiție: Preț de comparație > 0 / „Prețul de comparație este mai mare decât prețul”), SEO title „Reduceri suplimente - oferte Prime Supplements”, intro de 80 de cuvinte, sortare după reducere; până atunci scoate secțiunea de pe homepage. Adaugă insigne „Economisești X %” (setare a temei Impact), ca persona P2 să vadă adâncimea reducerii. Atenție: odată populată, scoate `reduceri` din lista de noindex din `layout/theme.liquid` al temei de test, altfel pagina utilă rămâne neindexată.

**Cum verificăm (falsificabilitate):** `/collections/reduceri` întoarce în continuare 0 produse sau secțiunea de pe homepage încă leagă către ea.

**Indicator timpuriu:** clickuri pe secțiunea „Reduceri” de pe homepage (Clarity) și rata de conversie a colecției.

#### SXO-15 — Trei listări identice cu 185 de produse („All Products”, „Cele mai vândute”, „Lansate recent”) plus „11% TVA” și „Prime Health” concurează pentru intrarea generică „suplimente” fără potrivire de intenție

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Low | READY (tema de test – de publicat) | S | 0.8 |

**Dovezi:** toate cele 185 de produse stau în `all`, `cele-mai-vandute`, `lansate-recent` (context de audit); `/collections/prime-health` a apărut în rezultatele `site:` cu titlul gol „Prime Health” (fără cuvânt-cheie); `/collections/11-tva` este o grupare fiscală internă (15 produse) indexabilă; lanțul de redirect al vechiului `/categorie-produs/suplimente/` se termină la `/collections/suplimente-sala` („Suplimente sală pentru performanță”), deci echitatea moștenită pentru „suplimente” aterizează pe încă o listare generică.

**Impact / pagini afectate:** 5 colecții; semnalele pentru „suplimente” se împart între URL-uri interschimbabile, fără una care să răspundă intenției.

**Recomandare:** Verificare: tema de test pune `noindex,follow` pe colecțiile utilitare `all`, `cele-mai-vandute`, `lansate-recent`, `11-tva`, `frontpage`, `reduceri`, `vendors`, `types` (`layout/theme.liquid`), iar SEO title / description au fost rescrise live pe toate cele 23 de colecții (inclusiv `prime-health`). După publicare: `curl -s https://primesupplements.ro/collections/11-tva | grep -o '<meta name="robots"[^>]*>'` → `noindex,follow`. Specialistul recomandă noindex doar pe `11-tva` și `lansate-recent` și păstrarea `cele-mai-vandute` ca o colecție reală de best-sellere (sortare după cele mai vândute, limitare prin colecție manuală sau Search & Discovery): dacă proprietarul vrea acel hub indexabil, scoate `cele-mai-vandute` din lista de noindex. Snippet-ul specialistului:

```liquid
{% if collection.handle == '11-tva' %}<meta name="robots" content="noindex">{% endif %}
```

Rămân: un singur hub generic (`/collections/suplimente-sala` ca „Suplimente sportive - toate produsele Prime Supplements”, cu tile-uri de categorii și 300 de cuvinte), titlu / H1 „Vitamine, minerale și sănătate (Prime Health)”, scoaterea listărilor utilitare din navigație.

**Cum verificăm (falsificabilitate):** GSC arată cele trei listări generice primind în continuare impresii pentru aceleași interogări după 8 săptămâni.

**Indicator timpuriu:** împărțirea impresiilor pentru interogările de tip „suplimente” între cele 5 URL-uri.

#### SXO-16 — Marcajul FAQPage de pe homepage și de pe produsele de creatină nu are efect în SERP; păstrează-l doar ca conținut

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Info | OPEN | S | 0.9 |

**Dovezi:** FAQPage pe homepage („Articolul comandat nu este in stoc. De ce apare pe site?” ...) și `faq-schema-creatina.liquid` pe 3 produse; Google a eliminat rich result-urile FAQ pentru site-urile comerciale (mai 2026, conform regulilor auditului). FAQ-ul de pe homepage răspunde la întrebări logistice (stoc, retur, plată) utile pentru P2 / P3, dar este plasat la capătul unei pagini de 630 KB.

**Impact / pagini afectate:** homepage, 3 produse; fără pierdere directă, doar oportunitatea ratată de a aduce răspunsurile logistice în zona de decizie.

**Recomandare:** nicio lucrare de schema necesară. Păstrează FAQ-ul vizibil, mută răspunsurile logistice în rândul de încredere de pe pagina de produs (vezi SXO-08, punctul 5).

**Cum verificăm (falsificabilitate):** n/a (informativ).

**Indicator timpuriu:** n/a.

### Ce nu am putut măsura

- Unealta de căutare este un motor indexat în SUA, nu google.ro: pozițiile absolute, PAA, reclamele, AI Overviews, unitățile de shopping și „căutările asociate” nu au putut fi observate; mai multe interogări românești simple au întors pagini în spaniolă / portugheză / franceză / italiană (`creatina`, `creatina monohidrata pret`, `glutamina`, `pre workout`, `bcaa vs eaa diferente`, `creatina creapure`) și au fost completate cu variante calificate sau restrânse la magazine românești. „primesupplements.ro absent” înseamnă absent din rezultatele de top ale acestui motor la 2026-10-12 — dovadă puternică, dar nu concludentă pentru google.ro.
- Operatorul `site:` a fost onorat doar parțial (interogarea `/ro-hu` a întors domenii fără legătură), deci numărătorile de acoperire a indexului sunt orientative.
- Fără Search Console, GA4, CrUX, rank tracker sau DataForSEO (sandbox fără chei API): impresiile / clickurile pe pagină nu au putut fi confirmate; scorurile persona și user story-urile sunt derivate din compoziția rezultatelor, nu din PAA / texte de reclame, cum preferă framework-ul.
- Doar o colecție, un produs și un articol au fost punctate în profunzime; tiparele sistemice (descrieri goale, schema invalidă, limbi amestecate) au fost verificate pe fișierele parsate, dar scorurile per pagină pentru alte URL-uri pot diferi.
- Paginile au fost evaluate din copiile HTML statice (`$R/`), nu dintr-un viewport randat — scripturile de fetch / render ale pluginului eșuează în sandbox (politica de proxy) și nu există headless browser; ordinea „deasupra pliului” este dedusă din ordinea secțiunilor în HTML.
- Verificările live au fost limitate la 6 cereri curl cu pauză de 2 s (protecția anti-bot a magazinului răspunde 429 după burst-uri), folosite doar pentru URL-urile legacy găsite în index și pagina de produs B2B.
