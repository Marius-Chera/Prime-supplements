## Apendice

## Metodologie și limite

**Cadrul.** Auditul urmează skill-ul `seo-audit` al plugin-ului claude-seo 2.4.2 și framework-ul de sinteză în 10 principii (PERCEIVE → ANALYZE → VALIDATE → ACT): observare fără scor, verificarea propriilor presupuneri, citirea SERP-ului înainte de a decide tipul de pagină, identificarea constrângerii cu cea mai mare pârghie, conectarea laterală a constatărilor între specialiști, pressure-test pe experiența utilizatorului/vocea brandului/capacitatea echipei, falsificabilitate pe fiecare recomandare, apoi artefactul și bucla de măsurare. Scorul de sănătate folosește ponderile skill-ului: Tehnic 22 %, Conținut 23 %, On-page 20 %, Schema 10 %, Performanță 10 %, AI Search Readiness 10 %, Imagini 5 %.

**Mediul de execuție și constrângerile lui (nu sunt probleme ale site-ului).**

| Constrângere | Efect asupra auditului | Cum s-a compensat |
|---|---|---|
| Scripturile plugin-ului care descarcă singure URL-uri (`fetch_page.py`, `render_page.py`, `parse_html.py --url`, `agentic_check.py`, `agent_ux_check.py`, `pagespeed_check.py`, `capture_screenshot.py`, `preload_check.py`, `lcp_subparts.py`, `sitemap_discovery.py`, `domain_history.py`, `parasite_risk.py`, `verify_backlinks.py`, `ucp_check.py`, `nlp_analyze.py --url`, `unlighthouse_run.py`) refuzate de politica de proxy a sandbox-ului („Refusing configured HTTP proxy '127.0.0.1'”) | Fără crawl, fără DOM randat, fără arbore de accesibilitate real, fără fracție Lighthouse Agentic Browsing | Copii locale ale paginilor (home + 31 pagini), `parse_html.py` pe fișiere locale, `curl` throttled cu UA de browser, proxy-uri statice pe HTML-ul servit |
| Protecția anti-bot Shopify/Cloudflare: 429 „Verifying your connection...” după rafale | ≤ 15 cereri live per specialist, 2 s pauză, back-off 30 s la 429; 6 URL-uri din sitemap verificate live, restul 1.145 validate față de exporturile Admin | Exporturi complete Admin (products-all.json, articles-all.json + 355 corpuri, pages.json, catalog-analysis.md), GraphQL read-only |
| Fără cheie Google API: PageSpeed Insights 429 (cotă anonimă epuizată), CrUX, Search Console, GA4, Indexing API indisponibile | Fără CWV lab/field, fără date de indexare, impresii, canonical-uri alese de Google | Evaluare statică a performanței (HTML, scripturi, fonturi, imagini, preload-uri, HEAD pe asset-uri), inferențe documentate cu ±10 incertitudine |
| Fără Moz / Bing Webmaster / Keywords Everywhere / DataForSEO / Firecrawl / Matomo | Backlink Health Score „Not Assessed”; fără volume de căutare, poziții, AI visibility | Common Crawl (domeniul absent), WebSearch calitativ (motor indexat în SUA, disponibil doar pentru sxo/cluster/authority) |
| Chromium nu acceptă certificatul proxy-ului | Fără Lighthouse local; Playwright a funcționat doar pentru capturi (4 pagini × 2 viewport-uri, fără consimțământ dat) | Capturi în `screenshots/`, sonde DOM pentru H1/CTA/alt |
| Scope-uri Admin API fără `read_apps`; `layout/theme.liquid` și `settings_data.json` lipsă din exportul inițial | Inventarul de aplicații dedus din HTML; layout-ul citit printr-o singură interogare `themes.files` | — |
| Unelte de conținut calibrate pe engleză (`content_quality.py`, `content_verify.py`, `content_humanize.py`, `metadata_template.py`) | Scorurile pe text românesc nesemnificative | Citire directă + scanări regex deterministe pe toate cele 355 corpuri |
| Importul în masă al corpurilor de articol blocat de politica de integrare a mediului | 355 corpuri curățate pregătite, 0 aplicate | Matrixify CSV + script Admin API de ~20 linii, la proprietar |

**Unelte care au rulat (pe input local sau cu `curl`).** `parse_html.py <file> --url` (24–34 pagini), `schema_ecommerce_validate.py` (regula EU energy-class ignorată, neaplicabilă; crapă pe array-uri `priceSpecification`), `content_quality.py` / `content_verify.py` / `content_humanize.py` (12–15 corpuri), `metadata_template.py` (81 perechi), `agentic_fix.py robots --file`, `gbp_deprecation_lint.py`, `seo_updates.py --since 2026-01 --json`, `commoncrawl_graph.py`, `backlinks_auth.py --check`, `validate_backlink_report.py`, `google_auth.py --check`; scripturi proprii de analiză (sitemap-uri, head, grafuri de linkuri, intenții de cluster, proxy a11y, cifră de control GS1, rejucarea lanțului de filtre Liquid peste catalog); `theme-fixes/test_render.py` (python-liquid cu stub-uri) pentru snippet-urile temei de test; Admin GraphQL read-only (markets, shopLocales, deliveryProfiles, shop, locations, themes, metafields Judge.me); Playwright pentru capturi.

**Dimensiuni de eșantion.** Catalog: 185 produse active / 395 variante / 493 imagini (toate, din export); 17 pagini de produs randate; 23 colecții (toate, din export; 6 randate); 11 pagini (toate); 355 articole (toate, scanate determinist; 15 citite integral; 50 pentru statisticile imaginilor din corp); 13 sitemap-uri / 1.151 URL-uri; `/ro-hu/` live pe homepage + 1 produs; B2B: homepage + 1 produs + sitemap; 11 SERP-uri comerciale + 15 interogări de brand + 9 citiri calitative de SERP pentru clustere; 10 pagini pentru proxy-urile a11y; 4 pagini × 2 viewport-uri pentru vizual.

**Cei 17 specialiști.**

| Specialist (key) | Scor | Constatări brute | Prefix ID | Secțiunea din raport |
|---|---|---|---|---|
| technical | 52 | 28 | TECH | 1 |
| sitemap | 52 | 15 | SITEMAP | 1 |
| shopify-config | 45 | 8 | SHOPIFY | 1 |
| content | 29 | 18 | CONTENT | 2 |
| cluster | 24 | 17 | CLUSTER | 2 |
| onpage | 36 | 28 | ONPAGE | 3 |
| schema | 18 | 20 | SCHEMA | 4 |
| performance | 40 | 17 | PERFORMANCE | 5 |
| images | 42 | 17 | IMAGES | 6 |
| geo | 50 | 18 | GEO | 7 |
| agentic | 58 | 17 | AGENTIC | 7 |
| ecommerce | 30 | 24 | ECOMMERCE | 8 |
| international | 30 | 10 | INTERNATIONAL | 9 |
| authority | 18 | 16 | AUTHORITY | 10 |
| sxo | 22 | 16 | SXO | 11 |
| visual | 48 | 5 | VISUAL | 12 |
| local | 26 | 13 | LOCAL | 13 |
| **Total** | — | **287** | — | **264 constatări după unificare** (23 ID-uri compuse) |

Rapoartele brute sunt în `findings/<key>.md` și, în formă structurată, în `data/specialist-results.json` (titlu, dovezi, scop, recomandare, falsificabilitate, indicator, efort, încredere, URL-uri, severitate originală, câmp de verificare).

**Limite de interpretare.** Toate scorurile sunt euristici de specialist, nu semnale Google; starea „după remediere” este dedusă din `applied/*.json`, `applied/logs/*.json` și `theme-fixes/`, nu dintr-un crawl nou (tema de test nu a fost randată de Shopify); verdictele „absent din SERP” și „0 mențiuni” sunt relative la motorul folosit la 12.10.2026; atribuirea articolelor la hub-uri este bazată pe reguli (~5 % corecție manuală); acuratețea medicală a fost evaluată doar ca plauzibilitate și sursare. Lista detaliată este la finalul fiecărei secțiuni și, consolidată, în rezumatul executiv.

## Context actualizări Google

Sursa: registrul plugin-ului (`data/google-updates.json`, `seo_updates.py --since 2026-01`), citit din https://status.search.google.com și documentația Google, ultima verificare 2026-09-28 (vechime 14 zile, nemarcat ca învechit). **O suprapunere de date este o ipoteză, niciodată o dovadă de cauzalitate**; fără GSC nu există o serie de trafic pe care să o corelăm. Din cele 10 intrări confirmate de la 2026-01, cele relevante pentru acest site:

| Data | Actualizare (tip) | Relevanță pentru primesupplements.ro |
|---|---|---|
| 2026-09-24 | **September 2026 Spam Update** (spam; rollout global, încă activ la 28.09, durată estimată ~2 săptămâni, fără țintă numită) | Ipoteză de expunere, nu de cauză: tiparele de pe site care intră în politica anti-spam sunt „scaled content abuse” (347 articole BlogGenAuto, 127 într-o lună — `CONTENT-01`, `SITEMAP-15`) și „widely distributed links in templates” (194 linkuri dofollow „Powered by BlogGenAuto” — `AUTHORITY-05`, `ONPAGE-16`). Dacă proprietarul observă în GSC o scădere a afișărilor pe `/blogs/news/` începând cu 24–26.09, aceasta este prima ipoteză de verificat; remedierea este aceeași indiferent de cauză (programul c). |
| 2026-09-18 | Preferred sources în AI Mode/AI Overviews cer includerea în controlul „Search generative AI” din Search Console (documentație) | `GEO-18`: controlul este implicit activ, dar nu a putut fi citit (fără GSC); de verificat la deschiderea contului. |
| 2026-09-24 | VideoObject: `creator`/`author` recomandat, `interactionStatistic` (schema) | `SCHEMA-20`: galeria YouTube de pe paginile de produs nu are `VideoObject`; dacă se adaugă, cu `creator` = canalul @primesupplementsro. |
| 2026-09-24 | Search Console: filtru „web multimodal” (Lens, Circle to Search) în rapoartele de performanță (produs) | Programul (d) și `IMAGES-17`: după alt-urile scrise pe 493 imagini și schema Product validă, raportul Image + multimodal este indicatorul pentru packshot-uri. |
| 2026-09-18 | Aggregator și supplier units pentru interogări de afaceri locale în EEA (documentație) | Neaplicabil: retailer exclusiv online, neeligibil GBP (`LOCAL-11`); „supplier unit” din date crawlate ar cere o prezență fizică. |
| 2026-09-16 | Merchant Center AI performance insights (produs; doar EN, AU/CA/IN/NZ/US) | Neaplicabil în România; Merchant Center rămâne necesar pentru listările gratuite (`ECOMMERCE-18`). |
| 2026-09-16 | UCP integration hub: cart transfer și testare checkout (produs; SUA, apoi AU/CA în 2027) | `AGENTIC-14`, `ECOMMERCE-23`: profilul UCP al magazinului este live; funcțiile noi nu sunt încă disponibile pentru RO, nimic de făcut. |
| 2026-09-16/17 | Search profiles (publisher, prag 10.000 urmăritori în SUA), Mediapartners-Google (crawler de ads) | Neaplicabile. |

Intrări anterioare din 2026 menționate în constatări pentru că schimbă recomandările: retragerea rich result-urilor FAQ pentru toate site-urile (7 mai 2026 — de aceea `SCHEMA-15`, `GEO-08`, `SXO-16` sunt Info și nu se recomandă FAQPage nou), nota Google din 15.06.2026 că `llms.txt` „nu ajută și nu dăunează” (`GEO-16 / AGENTIC-04`), expirarea draftului IETF Content-Signal la 04.04.2026 (`GEO-17 / AGENTIC-02`, prezentat ca preferință declarată fără efect confirmat), retragerea casetei de căutare sitelinks (noiembrie 2024, `SCHEMA-12`). HowTo nu este recomandat nicăieri; metrica de interactivitate folosită este INP.

## Index constatări

Tabelul de mai jos este generat automat (`python3 -I`) din `data/specialist-results.json` unit cu headingurile `#### ID` și celulele „Stare” ale celor 13 secțiuni: 264 rânduri, acoperind toate cele 287 ID-uri brute (0 ID-uri din JSON fără heading, 0 headinguri fără corespondent în JSON). Secțiunea = numărul capitolului din raport; starea este forma scurtă (FIXED = live 12.10.2026, READY = tema de test, PENDING = acțiune proprietar, OPEN = nelucrat).

| ID | Secțiune | Severitate | Stare | Titlu |
|---|---|---|---|---|
| TECH-01 / SITEMAP-01 / SHOPIFY-01 | 1 | Critical | PENDING | Piața „Ungaria” publică o a doua copie completă a site-ului sub `/ro-hu/` (575 URL-uri duplicate, self-canonical, conținut românesc identic, prețuri RON) |
| TECH-02 / SITEMAP-14 / SHOPIFY-02 | 1 | High | PENDING | Magazinul B2B b2b.primesupplements.ro este un duplicat cross-domain indexabil al catalogului (58 URL-uri de produs cu același handle; 52 identice în sitemap-ul B2B) |
| TECH-03 / SITEMAP-04 / SHOPIFY-06 | 1 | High | READY | Colecțiile utilitare (all, cele-mai-vandute, lansate-recent, 11-tva, frontpage) sunt indexabile și în sitemap, trei dintre ele duplicate complete ale catalogului; tema nu avea nicio logică robots-meta |
| TECH-04 | 1 | High | OPEN | Arhiva blogului are 59 de pagini cu paginare doar prev/next (6 articole/pagină): majoritatea celor 354 articole sunt la 20–59 clicuri de orice hub |
| SHOPIFY-03 | 1 | High | FIXED | Vendor „primesupplements1”, productType gol și fără categorie de taxonomie pe toate produsele (REMEDIAT) |
| SHOPIFY-04 | 1 | High | FIXED | Titluri și descrieri SEO lipsă sau generice la produse, colecții, articole și pagini (REMEDIAT) |
| TECH-05 / SITEMAP-05 | 1 | Medium | READY | Colecția goală „Reduceri” răspunde 200, e indexabilă și în ambele sitemap-uri (candidat soft-404), deși 144 produse au reducere |
| TECH-06 / SITEMAP-06 | 1 | Medium | READY | `/pages/thank-you` (confirmarea înregistrării B2B) este indexabilă și în sitemap (titlu englez, fără H1, fără meta description) |
| TECH-07 | 1 | Medium | READY | Pseudo-colecțiile automate vendor/type sunt live, indexabile și self-canonical (`/collections/vendors?q=primesupplements1`, `/collections/types?q=`) |
| TECH-08 | 1 | Medium | OPEN | URL-urile de colecție și blog filtrate pe tag răspund 200, self-canonical, indexabile, cu titluri duplicate |
| TECH-09 | 1 | Medium | READY | `<meta charset>` este al treilea element din `<head>` (byte 1.078, după un script extern sincron și un bloc JSON-LD), încălcând regula de 1.024 bytes |
| TECH-10 | 1 | Medium | READY | Viewport `maximum-scale=1.0, minimum-scale=1.0` dezactivează pinch-zoom pe fiecare pagină |
| TECH-11 | 1 | Medium | PENDING | Fiecare pagină livrează 221–617 KB HTML, cu `<head>` de 157–189 KB, 131–170 KB JavaScript inline și 67–72 taguri script (20 externe) |
| TECH-12 | 1 | Medium | PENDING | Aplicația Fontify încarcă Google Fonts Poppins (toate cele 18 stiluri) + Bebas Neue render-blocking, în timp ce tema preîncarcă propriile fonturi Barlow, apoi suprascrise |
| TECH-13 / SHOPIFY-07 | 1 | Medium | PENDING | Corpurile articolelor generate de BlogGenAuto conțin 2.582 linkuri către primesupplements1.myshopify.com (fiecare link de produs = un hop 301), scripturi, JSON-LD încorporat și linkuri „Powered by” followed |
| TECH-14 / SITEMAP-02 / SITEMAP-03 | 1 | Medium | OPEN | lastmod fără valoare în sitemap: toate cele 185 produse poartă timpul generării (diferit la fiecare fetch), iar 21/23 colecții sunt ștampilate în bloc |
| SITEMAP-15 | 1 | Medium | PENDING | Poartă de calitate: 708 din 1.151 intrări din sitemap sunt articole generate automat, nefiltrate |
| SHOPIFY-05 | 1 | Medium | FIXED | Imaginile de produs nu aveau alt text (REMEDIAT) |
| TECH-15 | 1 | Low | OPEN | Variantele cu slash final răspund 200 (un URL duplicat per pagină, atenuat de canonical) |
| TECH-16 | 1 | Low | OPEN | `http://www` este un lanț de redirect în doi pași |
| TECH-17 / SITEMAP-12 | 1 | Low | OPEN | Trei handle-uri conțin diacritice percent-encoded, iar canonical-ul folosește altă capitalizare hex decât sitemap-ul și hreflang-ul |
| TECH-18 | 1 | Low | PENDING | Igienă URL: 57 URL-uri din sitemap depășesc 100 de caractere, 42 handle-uri de articol se termină în -2…-5 și 134 conțin fragmente englezești |
| TECH-19 | 1 | Low | READY | Pagina goală `/search` este indexabilă, în timp ce `/search?q=` nu este |
| TECH-20 | 1 | Low | READY | `og:image` este emis cu `http://` pe fiecare pagină |
| TECH-21 | 1 | Low | OPEN | Resource hints învechite: `dns-prefetch productreviews.shopifycdn.com` (Shopify Product Reviews, retrasă) și `preconnect cdn.nitroapps.co` (Fontify) deschid conexiuni pe care nimic nu le folosește |
| TECH-22 | 1 | Low | OPEN | Antetele de securitate sunt limitate de platformă: HSTS 91 de zile fără preload/includeSubDomains, fără Referrer-Policy sau Permissions-Policy, CSP minimal |
| TECH-23 / SITEMAP-13 | 1 | Low | OPEN | 30 de produse complet epuizate rămân indexabile și în sitemap; indexul listează și două sitemap-uri copil goale |
| SITEMAP-07 | 1 | Low | OPEN | Intrările de imagine din sitemap acoperă doar imaginea principală (185 din 493 imagini de produs) și folosesc taguri depreciate |
| SHOPIFY-08 | 1 | Low | OPEN | Produsele draft/unlisted împart colecțiile automate cu produsele live |
| TECH-24 | 1 | Info | OPEN | IndexNow nu este implementat |
| TECH-25 | 1 | Info | READY | Randarea JavaScript trece; doar conținutul de recenzii Judge.me este injectat prin JS |
| TECH-26 | 1 | Info | OPEN | robots.txt este default-ul Shopify 2026 (corectează contextul): sort_by și multi-filter sunt blocate; rămân lacune pentru vendors/types/tag/ro-hu |
| TECH-27 | 1 | Info | OPEN | Tratarea 404 este corectă; pagina de eroare nu are H1 și canonicalizează la `/404` |
| TECH-28 | 1 | Info | READY | Date structurate prezente pe fiecare șablon, dar duplicate și parțial invalide (detaliile sunt la specialistul schema) |
| SITEMAP-08 | 1 | Info | OPEN | `<changefreq>` pe toate cele 1.151 intrări (ignorat de Google) |
| SITEMAP-09 | 1 | Info | OPEN | Indexul sitemap nu are `<lastmod>` per copil și conține un comentariu XML |
| SITEMAP-10 | 1 | Info | OPEN | Două sitemap-uri metaobject goale sunt referențiate de index |
| SITEMAP-11 | 1 | Info | OPEN | Sitemap-ul de descoperire agentică trimite un fișier Markdown Shopify generic |
| CONTENT-01 | 2 | Critical | PENDING | Blogul este conținut generat automat la scară, nerevizuit, pe subiecte YMYL (expunere la „scaled content abuse”) |
| CONTENT-02 | 2 | High | OPEN | Toate „sursele științifice” sunt linkuri către homepage-uri; blogul nu conține nicio citare reală |
| CONTENT-03 | 2 | High | OPEN | Afirmații medicale fără disclaimere, informații de siguranță sau revizie medicală |
| CONTENT-04 | 2 | High | PENDING | Identitatea autorului este neverificabilă și inconsecventă intern; nu există pagină de autor; 18 articole au ca autor handle-ul magazinului |
| CONTENT-05 / CLUSTER-04 | 2 | High | PENDING | Canibalizare tematică în fiecare hub: serii regenerate și clustere ancorate pe produs concurează pentru aceeași intenție (26 grupuri intenție×hub cu ≥4 articole) |
| CLUSTER-03 | 2 | High | PENDING | Clusterul creatină: 78 articole (115.757 cuvinte) pentru 3 produse acoperă ~15 intenții, fiecare scrisă de 3-11 ori |
| CLUSTER-05 | 2 | High | PENDING | 42 handle-uri terminate în -2/-3/-4/-5 sunt regenerări ale aceluiași brief produs × unghi și trebuie comasate în articolul de bază |
| CLUSTER-12 | 2 | Medium | PENDING | Glutamină: 16 articole pentru un singur produs (`recovery-glutamin`), 4 dintre ele sub prefixul `glutamina-si-sanatatea-stomacului-` deși niciunul nu este despre sănătatea stomacului |
| CLUSTER-13 | 2 | Low | PENDING | Seria „protein-a” / „protine”: spoke-urile cele mai linkate ale hub-ului pudră proteică au handle-uri cu cuvântul-cheie scris greșit, iar hub-ul nu are un spoke-pilon „izolat vs concentrat” / „cum alegi proteina” linkat |
| CONTENT-06 | 2 | High | OPEN | Descrieri de produs lipsă sau subțiri: 102 produse sub 50 de cuvinte, inclusiv produsul cel mai linkat din blog |
| CONTENT-07 | 2 | Medium | OPEN | Conținut de produs duplicat și cvasi-duplicat (variante publicate ca produse separate, descrieri clonate) |
| CONTENT-08 / CLUSTER-01 | 2 | High | FIXED | Toate cele 23 pagini de colecție nu au conținut editorial: 0 cuvinte de hub pe 23/23 colecții, în timp ce o secțiune `seo_text` pregătită stă dezactivată în șablon |
| CLUSTER-02 | 2 | High | OPEN | Hub-urile nu linkează spre spoke-urile lor: fiecare colecție arată aceleași 3 articole recente, deci hub-ul creatină linkează articole despre ovăz și L-carnitină și niciunul dintre cele 78 ale sale |
| CLUSTER-08 | 2 | High | OPEN | Linkurile spoke→hub ajung la doar 7 din 13 hub-uri; 112 articole nu au niciun link către o colecție; vitamine-si-minerale (51 articole), crema-de-orez (25), pre-workout (10), intra-workout (5), batoane și bauturi primesc 0 linkuri din corp; 40 de linkuri merg la generica „cele-mai-vandute” |
| CLUSTER-09 | 2 | Medium | OPEN | Acoperirea produselor este inversată: 5 produse absorb 234 linkuri din articole, în timp ce 31 din 85 suplimente (toate cele 19 băuturi Frutilu, 3 din 7 arome de cremă de orez, colagen, turmeric, citrat de magneziu) au 0, iar 8 articole linkează două produse care nu mai există |
| CLUSTER-14 | 2 | Medium | OPEN | Patru hub-uri nu au (aproape) niciun spoke, în timp ce patru produse sunt supra-deservite: bauturi (19 produse / 0 articole), batoane (4 / 0), intra-workout (4 / 5), pre-workout (7 / 10) față de L-carnitine 1000 (28 articole), ovăz instant (22), fibre (21) |
| CONTENT-09 | 2 | High | READY | Igiena linkurilor din corp: 2.582 linkuri myshopify, 534 linkuri directe de adăugare în coș, 194 linkuri dofollow „Powered by BlogGenAuto”, linkuri către produse promoționale dispărute |
| CONTENT-10 | 2 | Medium | OPEN | Integritatea datelor: o linie „Published:” hard-codată, în engleză, contrazice data reală de publicare pe 315 articole; niciun semnal real de actualizare |
| CONTENT-11 | 2 | Medium | READY | Markup injectat de generator în corpuri: H1 duplicate, JSON-LD în corp care dublează schema temei, categorii de breadcrumb inventate, CSS/JS inline |
| CONTENT-12 / CLUSTER-16 | 2 | Medium | FIXED | Titlurile sunt datate cu anul, prea lungi și construite pe tipare clickbait; 311 teasere sunt trunchiate cu „...”; generatorul va re-crea fiecare intenție în 2027 |
| CONTENT-13 / CLUSTER-06 | 2 | Medium | OPEN | Slug-urile conțin fragmente de prompt în engleză, nume de competitori, SKU-uri de produs și sufixe numerice; cuvântul-cheie din URL nu are legătură cu titlul și conținutul |
| CLUSTER-07 | 2 | Medium | OPEN | 13 articole folosesc nume de competitori ca termen-țintă (GymBeam ×7, Optimum Nutrition / Gold Standard ×3, Dr Max, Farmacia Tei, MyProtein) fără să compare nimic |
| CONTENT-14 / CLUSTER-10 | 2 | Medium | OPEN | Fără hub-uri tematice sau taxonomie: 346/355 articole fără taguri, 5 taguri pe 9 articole, blog intitulat „Ultimele articole”, singura cale de navigare sunt 33 de pagini de paginare cronologică |
| CLUSTER-11 | 2 | Medium | OPEN | Linkarea articol→articol este generată, nu planificată: 22 articole au 0 linkuri de intrare din articole, 132 au < 3, 41% din muchii traversează hub-urile, 7 articole nu linkează nimic, 2 linkuri indică handle-uri inexistente |
| CONTENT-15 | 2 | Medium | OPEN | Pagina Despre noi și conținutul de încredere al brandului sunt slabe: fără H1, certificări neverificabile, an de înființare contradictoriu, fără echipă |
| CONTENT-16 / CLUSTER-15 | 2 | Low | OPEN | Articolele vechi scrise de om sunt subțiri sau orfane față de catalog, deși sunt singurele cu intenții curate, distincte |
| CONTENT-17 | 2 | Low | OPEN | Șiruri de interfață în engleză și nelocalizate în interiorul conținutului |
| CONTENT-18 | 2 | Low | FIXED | Semnale de conținut din imagini: alt lipsă pe 19 imagini principale și 43 imagini din corp; 493/493 imagini de produs fără alt |
| CLUSTER-17 | 2 | Info | OPEN | Verificare de realitate SERP: termenii-cap aparțin farmaciilor și publisherilor medicali; țintele câștigabile sunt intențiile long-tail românești, exact unde blogul are 3-11 URL-uri concurente fiecare |
| ONPAGE-01 | 3 | High | FIXED | 105/185 produse fără titlu SEO: `<title>` era numele brut al produsului |
| ONPAGE-02 | 3 | High | FIXED | 104/185 produse fără meta descriere; 79 livrate fără niciun `<meta name="description">`, 12 cu text de dozare |
| ONPAGE-03 | 3 | High | READY | Șablonul de titlu nu adaugă sufixul de brand, iar cele 80 de titluri scrise manual folosesc trei grafii ale brandului |
| ONPAGE-04 | 3 | Medium | FIXED | 47 titluri SEO depășesc 60 de caractere (max 92) și 17 titluri brute de produs ajung la 122 de caractere |
| ONPAGE-05 | 3 | Medium | FIXED | Meta descrieri șablonate („Descoperiți … Alegeți PRIME Supplements …”), 35 peste 160 de caractere și 2 duplicate |
| ONPAGE-06 | 3 | High | OPEN | H1 de produs = numele brut: 100 H1 în engleză, 14 H1 de tip „500g/83 serv”, 2 H1 pe o pagină, H1 englezesc sub un titlu românesc |
| ONPAGE-07 | 3 | Medium | OPEN | Diacriticele sunt inconsecvente între titlu, H1 și meta pe aceeași pagină |
| ONPAGE-08 | 3 | High | READY | Homepage: titlu cu slogan englezesc, meta ASCII de 216 caractere, H1 = logo, H2 în engleză |
| ONPAGE-09 | 3 | High | READY | 9/23 colecții fără titlu/meta SEO; „All Products”, „11% TVA”, „Reduceri” (goală) și 2 clone cu 185 produse sunt indexabile |
| ONPAGE-10 | 3 | Medium | OPEN | H1 de colecție ≠ titlu, og:title folosește numele brut, iar 4 pagini de categorie au 1-3 produse |
| ONPAGE-11 | 3 | High | OPEN | Titluri H1 de articol: 321/354 peste 60 de caractere (max 134), 279 conțin „2026”, 206 sunt clickbait cu două puncte, 1 este integral în engleză |
| ONPAGE-12 | 3 | High | FIXED | Titluri SEO de articol: 19 lipsă (Shopify trunchiază fallback-ul la 70 de caractere, în mijlocul cuvântului), 223/335 peste 60, 292 conțin „2026”, 90 poartă fragmente de cuvinte-cheie englezești |
| ONPAGE-13 | 3 | Medium | PENDING | 10 titluri SEO de articol și 9 slug-uri URL țintesc nume de competitori (Gymbeam, Havok, Optimum Nutrition, MyProtein, Farmacia Tei) |
| ONPAGE-14 | 3 | Medium | PENDING | 26 articole randează două H1; 352 corpuri încep cu o linie-antet englezească „Published: …” |
| ONPAGE-15 | 3 | High | OPEN | Descoperirea blogului: 11 articole pe pagină, 33 pagini adâncime, paginare doar prev/next, aceleași 3 articole linkate site-wide, 21 articole fără niciun link de intrare din alte articole |
| ONPAGE-16 | 3 | High | READY | 2.582 linkuri din articole indică primesupplements1.myshopify.com și 194 articole poartă un link dofollow „Powered by BlogGenAuto” |
| ONPAGE-17 | 3 | Medium | FIXED | Ancore goale și generice: 44 linkuri-imagine fără text pe homepage, 28 pe colecțiile mari, „Vezi toate” ×8 |
| ONPAGE-18 | 3 | Medium | READY | Fără breadcrumb vizibil pe niciun șablon; singurul BreadcrumbList este JSON-LD și indică „All Products” |
| ONPAGE-19 | 3 | Low | READY | Taguri OG/Twitter: og:image pe http, og:title ≠ titlu, card „summary”, twitter:description = text de dozare |
| ONPAGE-20 | 3 | Low | READY | Listări paginate: titluri bilingve „All Products – Pagina 2”, fără meta descriere, 3 serii identice de 8 pagini |
| ONPAGE-21 | 3 | Medium | PENDING | Șiruri englezești netraduse pe pagini cu `lang="ro"` |
| ONPAGE-22 | 3 | Low | OPEN | Greșeli de scriere în titlurile de secțiune din temă și în titluri |
| ONPAGE-23 | 3 | Medium | FIXED | Pagini de magazin: 0/11 cu titlu sau meta SEO; cele trei pagini construite din secțiuni nu au H1; „Thank you” este indexabilă |
| ONPAGE-24 | 3 | Low | OPEN | Index de blog: titlu/H1 generic „Ultimele articole”, fără meta descriere, fără H2 |
| ONPAGE-25 | 3 | Low | FIXED | Handle-ul myshopify „primesupplements1” este vizibil ca vendor și ca autor |
| ONPAGE-26 | 3 | Medium | OPEN | 19 grupuri de titluri cvasi-duplicate (45 produse): variantele de culoare și aromă sunt publicate ca produse separate |
| ONPAGE-27 | 3 | Low | FIXED | Text alt absent pe 493/493 imagini de produs (efecte secundare pe ancore și pe `twitter:image:alt`) |
| ONPAGE-28 | 3 | Info | PENDING | Fiecare titlu/meta/H1 există de două ori din cauza copiei de piață `/ro-hu/` |
| SCHEMA-01 | 4 | Critical | READY | Product JSON-LD este sintactic invalid pe 75/185 produse (76 % din suplimente) pentru că `escape` nu codifică newline-urile |
| SCHEMA-02 | 4 | High | READY | Chiar și blocurile Product care se parsează sunt neeligibile: AggregateOffer cu stringuri cu virgulă zecimală, fără Offer per variantă, fără price |
| SCHEMA-03 | 4 | High | READY | Lipsește aggregateRating/review din markup, deși Judge.me are rating-uri pe produse |
| SCHEMA-04 | 4 | High | PENDING | BlogGenAuto injectează un al doilea graf JSON-LD contradictoriu în 347/355 corpuri de articol (breadcrumb-uri myshopify, jobTitle placeholder) |
| SCHEMA-05 | 4 | Medium | READY | Blocul Article al temei: același bug `escape` (invalid pe ≥ 6 articole), autorul este mereu Organization, fără logo de publisher, headline neplafonat |
| SCHEMA-06 | 4 | Medium | READY | Fără hasMerchantReturnPolicy / shippingDetails, iar cele două pagini de politici se contrazic la pragul de livrare gratuită |
| SCHEMA-07 | 4 | Medium | READY | Categoria din breadcrumb-ul de produs este „All Products” (sau colecția internă „11% TVA”) pe fiecare produs |
| SCHEMA-08 | 4 | Medium | READY | Organization: logo-ul răspunde 404, fără telefon/e-mail/adresă/identificatori legali, limbă și dată de înființare greșite, sameAs dubios |
| SCHEMA-09 | 4 | Medium | READY | brand hard-codat pentru toate produsele (greșit pentru 100 articole MNX), category gol, sku/gtin dintr-o singură variantă, 207/395 variante fără cod de bare |
| SCHEMA-10 | 4 | Low | READY | `escape` dublu-codifică `&`, `"`, `'` în stringurile JSON, iar descrierea este tăiată la 500 de caractere |
| SCHEMA-11 | 4 | Low | READY | CollectionPage: descriere goală, numberOfItems greșit, listă trunchiată la 20, fără breadcrumb |
| SCHEMA-12 | 4 | Low | READY | Fără nod WebSite pe homepage (nume de site / endpoint de căutare) |
| SCHEMA-13 | 4 | Low | READY | Entitățile nu sunt legate (@id doar pe Organization); seller/publisher/author sunt noduri inline duplicate |
| SCHEMA-14 | 4 | Low | PENDING | Datele structurate de pe duplicatele `/ro-hu/` indică URL-urile principale |
| SCHEMA-15 | 4 | Info | OPEN | FAQPage pe homepage și pe 3 produse creatină; textul FAQ al produselor nu este vizibil în pagină (fără feature SERP din mai 2026) |
| SCHEMA-16 | 4 | Medium | READY | Markup-ul întreținut de Shopify (`microdata-schema`) este dezactivat; alegeți nativ sau custom v2, niciodată ambele |
| SCHEMA-17 | 4 | Low | PENDING | Aceleași entități de produs există pe b2b.primesupplements.ro cu alt seller/brand |
| SCHEMA-18 | 4 | Low | OPEN | Variantele de culoare/aromă publicate ca produse separate împiedică markup-ul ProductGroup |
| SCHEMA-19 | 4 | Low | OPEN | Prețurile reduse (compare-at pe 144/185 produse) nu sunt exprimate; fără priceValidUntil / itemCondition |
| SCHEMA-20 | 4 | Low | OPEN | Oportunități de schema legate de conținut existent: ProfilePage pentru autor, ContactPage, VideoObject |
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
| PERFORMANCE-13 | 5 | Low | OPEN | Template de articol: `<head>` este 65 % din document, imaginea featured (candidat LCP) nu are `fetchpriority="high"`, imaginile din corp nu au `sizes`, iar generatorul BlogGen adaugă 12 blocuri `<style>` în body și un al doilea set JSON-LD |
| PERFORMANCE-14 | 5 | Low | OPEN | Slideshow cu autoplay (6 s) și carusel media al produsului featured cu autoplay și înălțime adaptivă pe homepage |
| PERFORMANCE-15 | 5 | Low | OPEN | CSS inline per secțiune (62 de blocuri `<style>`, 44 KB) și duplicarea iconițelor SVG inline (106 SVG-uri, 43,7 KB) pe homepage |
| PERFORMANCE-16 | 5 | Info | OPEN | Răspunsul serverului și caching-ul HTML sunt sănătoase, dar timpul de randare este dat de template (Info) |
| PERFORMANCE-17 | 5 | Info | OPEN | Scripturile de platformă Shopify (`portable-wallets.ro.js` 78 KB, `perf-kit` 26 KB, `es-modules-shim` 15 KB, `standard-actions.js` 4 KB, `shop-js cart-sync`) sunt prezente pe fiecare template (Info) |
| IMAGES-01 | 6 | High | FIXED | 493/493 imagini de produs fără alt text stocat; fallback-ul storefront-ului dă fiecărei imagini a unui produs același titlu brut |
| IMAGES-02 | 6 | High | OPEN | Hero-ul homepage (imaginea LCP), logo-ul și cele șase tile-uri de categorie se livrează cu `alt=""` |
| IMAGES-03 | 6 | Medium | OPEN | Bannerele de colecție, tile-ul promo și banda lifestyle „1.jpg/2.jpg/3.jpg” au alt gol și nume de fișier de aparat foto pe fiecare șablon |
| IMAGES-04 | 6 | Medium | OPEN | 40 % din fișierele imaginilor de produs au nume de aparat foto, WhatsApp, derivate WordPress sau UUID; 89 % conțin majuscule sau underscore |
| IMAGES-05 | 6 | Medium | PENDING | Sitemap de imagini: doar imaginea principală (185 din 493), caption-uri goale, imaginile colecțiilor lipsesc și fiecare imagine e listată de două ori prin `/ro-hu/` |
| IMAGES-06 | 6 | Medium | READY | Meta tag-uri Open Graph / Twitter: schemă `http://`, dimensiuni declarate nepotrivite, `twitter:image:alt` gol, fallback la imaginea homepage-ului |
| IMAGES-07 | 6 | Medium | OPEN | Imaginile din corpul articolelor (șablon BlogGenAuto): fără `width`/`height`, 43 alt-uri goale, thumbnail-uri de produs aduse la originalul de 4000 px, alt-uri cu cuvinte-cheie și an |
| IMAGES-08 | 6 | Medium | OPEN | Imaginile principale ale articolelor: 19 fără alt, 327/354 sunt PNG-uri generate AI cu nume de timestamp sau cu promptul întreg, fără `fetchpriority` pe imaginea LCP |
| IMAGES-09 | 6 | Medium | OPEN | 9 imagini secundare de produs (tabele nutriționale/infografice) sunt sub 1000 px și se upscalează într-o galerie de 730 px; 57 produse au o singură imagine |
| IMAGES-10 | 6 | Medium | OPEN | Over-fetch pe bannere: bannerele de colecție folosesc `sizes="130vw"` pe fișiere de aparat de 4000-5472 px; randarea hero-ului e de 210 KB WebP; imaginea shop-the-look are sursă de 6000x4000 |
| IMAGES-11 | 6 | Low | OPEN | Homepage-ul repetă aceleași imagini de produs de trei ori și poartă 130 KB de markup `srcset` (21 % din HTML-ul de 630 KB) |
| IMAGES-12 | 6 | Low | OPEN | O a doua imagine `fetchpriority="high" loading="eager"` stă sub fold pe homepage (secțiunea featured product) |
| IMAGES-13 | 6 | Low | OPEN | Imagini injectate de aplicații fără dimensiuni sau lazy-loading nativ (carusel/poze de recenzie Judge.me, insignele ANPC, steagul UE) |
| IMAGES-14 | 6 | Low | FIXED | Acolo unde există alt text, e titlul brut al produsului cu șiruri de merchandising, erori de spațiere și formulări în engleză |
| IMAGES-15 | 6 | Info | OPEN | Formatul și compresia sunt gestionate de CDN-ul Shopify; încărcarea surselor AVIF/PNG nu aduce nimic (și AVIF nu e livrat niciodată) |
| IMAGES-16 | 6 | Info | OPEN | `decoding="async"` nu e folosit pe nicio imagine |
| IMAGES-17 | 6 | Medium | OPEN | Oportunitate Google Images / Shopping: packshot-urile sunt eligibile, dar semnalele care le-ar clasa lipsesc |
| GEO-01 | 7 | High | OPEN | Fiecare link „sursă” din blog duce la un homepage: 338 articole invocă studii pe care nu le citează niciodată |
| GEO-02 | 7 | High | OPEN | Semnale de prospețime fabricate: liniile „Published:” hard-codate nu corespund datelor Shopify, „Updated” este mereu egal cu „Published”, 267/354 articole au peste 90 de zile și fiecare pagină poartă două scheme Article contradictorii |
| GEO-03 | 7 | High | FIXED | 22 din 23 pagini de colecție nu aveau niciun text descriptiv, deci paginile de categorie („money pages”) nu ofereau nimic citabil unui sistem AI |
| GEO-04 | 7 | Medium | OPEN | Paginile de produs (eșantion Creapure) îngroapă definiția la ~1.100 de cuvinte, randează textul de două ori, au H1 în engleză și fac afirmații de sănătate neautorizate, fără sursă |
| GEO-05 | 7 | High | READY | Entitatea Organization este scindată: handle-urile sameAs din schemă diferă de cele din footer, YouTube lipsește, fără legalName/adresă/telefon, iar brandul este scris în 6 feluri |
| GEO-06 | 7 | High | PENDING | Entitatea de autor „Marius Chera” are patru identități, nu are pagină de autor, are acreditări contradictorii și o schemă Person doar cu un URL LinkedIn |
| GEO-07 | 7 | Medium | PENDING | Primul pasaj al majorității articolelor este boilerplate sau un widget de preț, nu răspunsul |
| GEO-08 | 7 | Medium | OPEN | FAQPage ascuns pe produsele creatină: 8 întrebări-răspuns există doar în JSON-LD, nu în pagină |
| GEO-09 | 7 | Medium | OPEN | Statistici neatribuite în blocurile-răspuns („până la 60%”, „99.99%”, „82% standardul de aur”) |
| GEO-10 | 7 | Medium | OPEN | Întrebările FAQ clinice generate automat împing un magazin de suplimente în teritoriu medical pentru care sistemele AI nu îl vor cita |
| GEO-11 | 7 | Medium | PENDING | Amprentă de generare AI fără declarație „Cum”: markeri BlogGenAI, 194 linkuri „Powered by BlogGenAuto”, „Scaled by KEMO” |
| GEO-12 | 7 | Medium | READY | „primesupplements1” se scurge ca alias de brand în corpusurile AI (vendor pe 64 produse, autor pe 17 articole, 2.582 linkuri myshopify) |
| GEO-13 / AGENTIC-16 | 7 | Medium | PENDING | Oglinda `/ro-hu/` dublează fiecare URL citabil, împarte semnalele de citare și dublează suprafața pe care agenții trebuie să o parcurgă sub un WAF cu limitare de rată |
| GEO-14 / AGENTIC-03 | 7 | Medium | OPEN | Protecția anti-bot Shopify răspunde cu 429 „Verifying your connection...” la trafic de rată moderată, poate lovi fetcherele AI declanșate de utilizator exact la momentul răspunsului și nu există allowlist pentru comerciant |
| GEO-15 | 7 | Low | PENDING | Canibalizare tematică: 47 grupuri de cuvinte-cheie / 164 articole și 42 handle-uri regenerate „-2..-5” dau retrieval-ului AI multe pasaje slabe în loc de un răspuns puternic |
| GEO-16 / AGENTIC-04 | 7 | Medium | OPEN | llms.txt, llms-full.txt și agents.md sunt șablonul generic „Agent Instructions” al Shopify, nu un index al conținutului magazinului: fără linkuri către colecții, produse sau blog (Google ignoră llms.txt) |
| GEO-17 / AGENTIC-02 | 7 | Low | OPEN | Niciun semnal de licențiere/utilizare citibil de mașină: fără Content-Signal (robots.txt, antet HTTP sau meta), fără RSL, fără antet License |
| GEO-18 | 7 | Info | OPEN | Pregătirea pe platforme (Google AI Overviews/AI Mode, ChatGPT, Perplexity, Bing Copilot) nu a fost măsurată; evaluare calitativă |
| AGENTIC-01 | 7 | Medium | OPEN | robots.txt nu are o politică deliberată de agenți pe scopuri (un singur grup `*`) |
| AGENTIC-05 | 7 | Info | OPEN | Fișierele de platformă se adresează agenților cu instrucțiuni terțe (instalarea skill-ului shop.app); de tratat ca date, nu ca vocea comerciantului |
| AGENTIC-06 | 7 | Low | OPEN | Fără livrare Markdown; o cerere strictă `Accept: text/markdown` primește 404 în loc de pagina HTML |
| AGENTIC-07 | 7 | Info | OPEN | Fără ai-catalog.json / Agentmap, deși magazinul rulează un server MCP real (oportunitate, negăzduibilă pe Shopify) |
| AGENTIC-08 | 7 | Medium | OPEN | Listbox-urile de localizare nu au nume accesibil (axe `aria-input-field-name`, din setul de reguli al arborelui de agent Lighthouse) |
| AGENTIC-09 | 7 | Low | OPEN | Landmark de navigație fără nume, `aria-controls` orfane, butoane fără `type`, anomalii de heading |
| AGENTIC-10 | 7 | Medium | FIXED | Fotografiile de produs erau fără nume în arborele de accesibilitate (alt gol pe 493/493 imagini de produs) |
| AGENTIC-11 | 7 | Low | READY | Viewport-ul blochează zoom-ul (`maximum-scale=1.0, minimum-scale=1.0`) |
| AGENTIC-12 | 7 | Medium | OPEN | Greutatea paginilor și numărul de controale fac canalul DOM scump pentru agenți (345–630 KB HTML, 69–71 scripturi, 128 butoane pentru ~700–2.800 cuvinte) |
| AGENTIC-13 | 7 | Info | OPEN | WebMCP: adaptorul Shopify este prezent; fără tools proprii ale comerciantului, fără adnotări de formular (oportunitate, acoperită de platformă) |
| AGENTIC-14 | 7 | Info | OPEN | Inconsistențe în anunțarea UCP/MCP și metadate generice ale tools (gestionate de Shopify; aprofundare → seo-ecommerce) |
| AGENTIC-15 | 7 | Low | OPEN | Șapte descrieri de produs MNX conțin markup lipit din interfața de chat Gemini, expus agenților prin HTML, `/products.json` și UCP `get_product` |
| AGENTIC-17 | 7 | Info | OPEN | Overlay-urile injectate târziu (consimțământ, popup, bulă de chat, cadouri) netestate pentru focus trap sau acoperire; CLS Lighthouse necunoscut |
| ECOMMERCE-01 | 8 | Critical | READY | Product JSON-LD este neeligibil pentru merchant listings pe fiecare produs (JSON invalid pe descrierile multi-linie, AggregateOffer cu prețuri cu virgulă, fără price/livrare/retur/rating) |
| ECOMMERCE-02 | 8 | High | PENDING | Piața duplicat `/ro-hu/` afișează prețuri FĂRĂ TVA 21 % în RON (82,64 lei vs 100,00 lei) pe pagini indexabile și în JSON-LD |
| ECOMMERCE-03 | 8 | High | FIXED | `productType` era gol pe 185/185 produse: categoria lipsea din schema, feed-uri, filtre și paginile de tip |
| ECOMMERCE-04 | 8 | High | FIXED | Datele de vendor/brand erau greșite: handle-ul myshopify „primesupplements1” era vendor pe 64 produse, iar articolele MNX purtau brandul „Prime Supplements” |
| ECOMMERCE-05 | 8 | High | PENDING | Acoperire și validitate GTIN: 207/395 variante fără cod de bare, 27 din 188 coduri pică la cifra de control GS1, codurile invalide sunt publicate ca `gtin`; SKU = EAN pe 164 variante |
| ECOMMERCE-06 | 8 | High | FIXED | Acoperire titlu/descriere SEO: 105 produse fără titlu SEO, 79 cu meta descriere GOALĂ, 12 cu text de dozare ca meta, 47/80 titluri SEO peste 60 de caractere |
| ECOMMERCE-07 | 8 | High | OPEN | Modelul de conținut al produsului este stricat: câmpul description conține dozare/ingrediente niciodată afișate, cele 4 tab-uri din metafield-uri sunt în mare parte goale, 102 produse au < 50 de cuvinte, fără tabel nutrițional |
| ECOMMERCE-08 | 8 | Medium | OPEN | 45 produse sunt duplicate de culoare/aromă publicate ca produse separate în loc de variante (19 grupuri) |
| ECOMMERCE-09 | 8 | Medium | OPEN | Titluri și H1: 17 titluri peste 60 de caractere (max 122), 96 titluri în engleză pe un magazin românesc, 19 fără diacritice, H1 diferit de titlul SEO pe produse-cheie |
| ECOMMERCE-10 | 8 | Medium | OPEN | 30 produse sunt epuizate pe toate variantele (22 MNX, 8 suplimente), dar rămân indexabile, în sitemap și linkate din blog, fără captare „anunță-mă” |
| ECOMMERCE-11 | 8 | Medium | OPEN | „Reduceri” compare-at pe 144/185 produse (120 cu toate variantele tăiate permanent) și o colecție „Reduceri” goală: risc Omnibus și de sale-price în Merchant Center |
| ECOMMERCE-12 | 8 | High | OPEN | Arhitectura colecțiilor: 23 colecții plate, 5 colecții utilitare indexabile, două categorii de îmbrăcăminte suprapuse (99 vs 87, 86 comune), fără subcategorii pe obiectiv/brand/tip de articol, toate descrierile goale |
| ECOMMERCE-13 | 8 | Low | READY | Navigarea fațetată este subțire (preț, disponibilitate, 2 metafield-uri custom) și crawlabilă; paginile de interogare vendor/type sunt indexabile |
| ECOMMERCE-14 | 8 | Medium | READY | Fără breadcrumb vizibil pe paginile de produs și de colecție; BreadcrumbList JSON-LD trimite fiecare produs la „All Products” |
| ECOMMERCE-15 | 8 | Medium | OPEN | Cross-sell-ul este doar client-side: paginile de produs expun 6-7 linkuri de produs în HTML-ul brut; blocul complementar nu are date; titlurile secțiunilor au greșeli de tipar și engleză |
| ECOMMERCE-16 | 8 | Medium | READY | Recenziile există (431 la nivel de magazin), dar sunt invizibile pentru căutare: fără markup aggregateRating/review, blocul rating dezactivat, text de widget în engleză, widget gol pe produsele fără recenzii |
| ECOMMERCE-17 | 8 | Medium | FIXED | Imagini de produs: 0/493 imagini aveau alt text și 57 produse au o singură imagine (53 suplimente) |
| ECOMMERCE-18 | 8 | High | PENDING | Pregătirea pentru Google Merchant Center: faptele din politici există pe pagini, dar nu în datele de produs; 8 familii de atribute care blochează feed-ul lipsesc sau sunt greșite |
| ECOMMERCE-19 | 8 | High | READY | Linkingul blog → produs este deviat: 2582 linkuri către primesupplements1.myshopify.com, 534 linkuri de adăugare în coș, 130/185 produse niciodată linkate, 16 linkuri către produse moarte |
| ECOMMERCE-20 | 8 | Low | OPEN | Tag-urile și handle-urile sunt inconsecvente (97 tag-uri cu duplicate de majuscule/plural, handle cu underscore, trei modele de handle în gama Frutilu) |
| ECOMMERCE-21 | 8 | Low | OPEN | Denumirea variantelor este inconsecventă și se scurge în coș, feed-uri și UCP (`Cutie 12 buc x 55g` / `Baton 55g` / `55g`; numele produsului repetat în titlul variantei; două scale de mărimi) |
| ECOMMERCE-22 | 8 | Low | OPEN | Defecte ale template-ului de colecție: „Alte categorii” fixe, produs recomandat din banner lipsă, bloc de blog generic pe fiecare colecție, 24 produse pe pagină la colecții de 185, H1 ≠ titlu |
| ECOMMERCE-23 | 8 | Info | OPEN | Profilul UCP este live și bine format; calitatea comerțului prin agenți este plafonată de datele de produs de mai sus |
| ECOMMERCE-24 | 8 | Info | PENDING | Peisajul de marketplace și competitori nu a putut fi măsurat (fără date Merchant/SERP); magazinul B2B duplică 57 produse retail cu prețuri en-gros vizibile |
| INTERNATIONAL-01 | 9 | High | PENDING | Web presence-ul pieței „Ungaria” publică o a doua copie completă a site-ului sub /ro-hu/ (575 URL-uri duplicate cu conținut românesc identic, ambele self-canonical) |
| INTERNATIONAL-02 | 9 | High | PENDING | Alternate-urile /ro-hu/ afișează prețuri diferite pentru aceleași produse (fără TVA, exact ÷1,21) în aceeași monedă RON, inclusiv în Product JSON-LD cu același @id |
| INTERNATIONAL-03 | 9 | Medium | PENDING | Setul hreflang este tehnic valid, dar nejustificat semantic: `ro-HU` țintește vorbitorii de română din Ungaria fără nicio localizare, în timp ce a doua audiență realistă (vorbitorii de maghiară din România, `hu-RO`) nu este deservită deloc |
| INTERNATIONAL-04 | 9 | Medium | PENDING | Livrarea și conținutul legal contrazic piața Ungaria: magazinul livrează în HU cu tarife Cargus denumite în maghiară și exprimate în HUF, în timp ce politica de livrare și Termenii spun că livrarea este doar în România și nu există pagini legale maghiare |
| INTERNATIONAL-05 | 9 | Low | PENDING | Selectorul de țară este randat de trei ori pe pagină, oferă două țări cu aceeași monedă („România (RON Lei)” / „Ungaria (RON Lei)”), nu are opțiune de limbă și schimbă tacit prețurile cu −17,36 % |
| INTERNATIONAL-06 | 9 | Low | PENDING | Homepage-ul /ro-hu există în două forme de URL (`/ro-hu` și `/ro-hu/`, ambele 200); canonical/hreflang/sitemap folosesc forma fără slash, în timp ce `rootUrls` al pieței spune `/ro-hu/` |
| INTERNATIONAL-07 | 9 | Low | PENDING | Datele structurate de pe fiecare pagină /ro-hu/ declară URL-ul rădăcină ca URL al entității (@id, url, elemente de breadcrumb), în timp ce canonical-ul și og:url ale paginii declară /ro-hu/ |
| INTERNATIONAL-08 | 9 | Low | OPEN | Canonical-ul și hreflang/sitemap-ul nu sunt de acord asupra majusculelor din percent-encoding pentru URL-urile cu handle-uri cu diacritice (canonical minuscule `%c8%9b`, hreflang și sitemap majuscule `%C8%9B`) |
| INTERNATIONAL-09 | 9 | Low | READY | Lacune în metadatele de limbă: fără `og:locale`, fără `inLanguage` în niciun JSON-LD și string-uri în engleză (tagline-ul din title, titlul Judge.me) pe singurul locale (român) |
| INTERNATIONAL-10 | 9 | Info | OPEN | Locale-ul maghiar există, dar este nepublicat, fără traduceri, fără HUF și fără conținut legal/de livrare maghiar: lista de pregătire pentru o lansare reală în Ungaria (opțiunea c) |
| AUTHORITY-01 | 10 | High | OPEN | Domeniul lipsește din graful web Common Crawl, în timp ce competitorul principal este clasat |
| AUTHORITY-02 | 10 | High | OPEN | Zero mențiuni terțe găsite pentru brand, firmă, fondator sau produse |
| AUTHORITY-03 | 10 | High | READY | `sameAs` din Organization nu coincide cu profilurile sociale reale pe niciuna dintre cele trei rețele și omite YouTube |
| AUTHORITY-04 | 10 | Medium | OPEN | Nicio sursă de date de backlink-uri scorabilă nu este configurată (GSC, Bing WMT, Moz) |
| AUTHORITY-05 | 10 | High | READY | 194 articole poartă un link „Powered by BlogGenAuto” șablonat, dofollow și cu contrast scăzut |
| AUTHORITY-06 | 10 | High | READY | 2 582 linkuri din corpul articolelor către primesupplements1.myshopify.com (incl. 534 linkuri /cart/) redirecționează, dublează și irosesc echitatea internă |
| AUTHORITY-07 | 10 | Medium | PENDING | Magazinul B2B este o a doua entitate indexabilă, cu CUI-ul drept nume, profiluri sociale placeholder Shopify și catalog duplicat |
| AUTHORITY-08 | 10 | Medium | PENDING | Piața duplicat /ro-hu/ împarte fiecare semnal off-site între două seturi de URL-uri |
| AUTHORITY-09 | 10 | Medium | READY | Cele 431 recenzii Judge.me sunt invizibile off-site: fără pagină publică de recenzii, fără markup rich-snippet, fără profiluri terțe de recenzii |
| AUTHORITY-10 | 10 | Medium | READY | Entitatea autorului expert („Marius Chera, Nutriționist Certificat”) este necoroborată, marcată inconsistent și fără pagină de autor |
| AUTHORITY-11 | 10 | Low | READY | Schema Organization omite adresa, telefonul, legalName și identificatorii fiscali, deși NAP-ul este pe fiecare pagină |
| AUTHORITY-12 | 10 | Low | READY | `foundingDate` 2020 din schema Organization contrazice registrul (J32/1155/2022) și pagina Despre noi („in anul 2022”) |
| AUTHORITY-13 | 10 | Low | FIXED | Handle-ul myshopify „primesupplements1” se scurge ca nume de brand/autor/vendor |
| AUTHORITY-14 | 10 | Low | OPEN | Profilul de linkuri de ieșire al blogului este boilerplate: aceleași 7 domenii străine de autoritate în 349 articole, fără surse de reglementare românești/UE, fără co-citare locală |
| AUTHORITY-15 | 10 | Info | OPEN | Fără active care să atragă linkuri: 354 articole șablonate, fără pagină de autor, unelte, date sau secțiune „parteneri”/presă |
| AUTHORITY-16 | 10 | Info | OPEN | Igienă minoră de ieșire: linkul WhatsApp site-wide trece printr-un scurtător terț |
| SXO-01 | 11 | High | PENDING | Articolele de blog, nu colecția și produsele de creatină, sunt paginile pe care Google le asociază cu termenii comerciali pentru creatină |
| SXO-02 | 11 | High | FIXED | Paginile de colecție sunt „filtre + 3-5 carduri”, în timp ce SERP-ul românesc recompensează paginile de categorie bogate (și ghidurile) |
| SXO-03 | 11 | High | READY | Numele de brand nu este deținut în căutare: „prime supplements” / „primesupplements” / „prime whey” întorc alte companii |
| SXO-04 | 11 | High | OPEN | URL-urile vechi WooCommerce (categorie-produs, cache-buster ?v=, host www) sunt încă ceea ce arată Google pentru site |
| SXO-05 | 11 | High | PENDING | Magazinul en-gros b2b.primesupplements.ro este indexat și servește consumatorilor pagini de produs cu prețuri B2B |
| SXO-06 | 11 | Medium | OPEN | SERP-urile pentru termenii comerciali principali sunt dominate de farmacii, publicații medicale și marketplace-uri; magazinul concurează cu autoritate zero și fără amprentă de advertoriale / PR |
| SXO-07 | 11 | High | OPEN | Homepage-ul se deschide cu un slogan în engleză și un rând de haine epuizate, picând toate persona-urile de cumpărători de suplimente deasupra pliului |
| SXO-08 | 11 | Medium | OPEN | Paginile de produs ascund conținutul educațional și logica de preț pe care SERP-ul de decizie le așteaptă și distrag cu un CTA B2B |
| SXO-09 | 11 | High | PENDING | 355 de articole generate automat se canibalizează reciproc și țintesc subiecte tranzacționale cu pagini informaționale |
| SXO-10 | 11 | Medium | OPEN | Articolele sunt fundături pentru orice persona în faza de decizie: fără traseu către produs, încredere slabă în autor, date învechite |
| SXO-11 | 11 | Medium | OPEN | Linia de haine MNX (54 % din catalog) nu are identitate căutabilă și primește prioritate pe homepage în fața suplimentelor |
| SXO-12 | 11 | Medium | PENDING | Piața /ro-hu/ le servește căutătorilor maghiari conținut românesc în RON și este oricum invizibilă |
| SXO-13 | 11 | Low | OPEN | Șirurile UI și de catalog în limbi amestecate strică claritatea pentru persona-urile românești pe fiecare template |
| SXO-14 | 11 | Medium | OPEN | Persona vânătoare de oferte este trimisă către o colecție „Reduceri” goală, deși 144 de produse au preț tăiat |
| SXO-15 | 11 | Low | READY | Trei listări identice cu 185 de produse („All Products”, „Cele mai vândute”, „Lansate recent”) plus „11% TVA” și „Prime Health” concurează pentru intrarea generică „suplimente” fără potrivire de intenție |
| SXO-16 | 11 | Info | OPEN | Marcajul FAQPage de pe homepage și de pe produsele de creatină nu are efect în SERP; păstrează-l doar ca conținut |
| VISUAL-01 | 12 | High | PENDING | Bannerul de cookie-uri e un modal pe tot ecranul pe mobil și acoperă hero-ul pe desktop |
| VISUAL-02 | 12 | Medium | OPEN | Pagina de produs pe mobil nu are CTA „Adaugă în coș” above the fold |
| VISUAL-03 | 12 | Medium | OPEN | H1-ul homepage-ului e doar numele brandului; titlul vizibil nu e H1 |
| VISUAL-04 | 12 | Low | OPEN | 24 de imagini de pe homepage se randează fără alt (imagini de temă/secțiuni) |
| VISUAL-05 | 12 | Low | PENDING | Widgetul WhatsApp flotant acoperă cardurile de produs pe mobil |
| LOCAL-01 | 13 | High | READY | Schema Organization nu conține adresă, telefon, e-mail, legalName sau cod de TVA pe niciunul dintre cele ~1 150 de URL-uri |
| LOCAL-02 | 13 | High | READY | `sameAs` trimite Google la un cont TikTok greșit; handle-urile Facebook/Instagram din schemă diferă de cele din footer; YouTube lipsește |
| LOCAL-03 | 13 | Medium | OPEN | Adresa stradală din footer este un link către `https://www.primesupplements.ro/cart/#` pe fiecare pagină |
| LOCAL-04 | 13 | Medium | OPEN | NAP-ul este scris în șase forme pentru nume, patru pentru adresă și trei pentru telefon; o pagină legală numește o firmă care nu există |
| LOCAL-05 | 13 | Medium | OPEN | Adresa din profilul magazinului Shopify este incompletă (oraș gol, stradă fără număr), iar locația de fulfilment nu are nicio adresă |
| LOCAL-06 | 13 | Medium | PENDING | Magazinul B2B indexabil prezintă o altă entitate: nume legal + CUI drept brand, fără adresă/telefon, link-uri sociale către conturile Shopify |
| LOCAL-07 | 13 | Medium | READY | Recenziile există doar în widget-ul Judge.me: niciun aggregateRating/Review în JSON-LD, o singură platformă, fără prezență Google/Trustpilot găsită |
| LOCAL-08 | 13 | Low | OPEN | Pagina de contact nu are H1, meta description, program, identitate a firmei și context de livrare/hartă; programul de suport există doar într-un acordeon FAQ pe homepage |
| LOCAL-09 | 13 | Low | READY | `foundingDate` „2020” din Organization contrazice registrul (2022-06-07) și pagina Despre noi („in anul 2022”) |
| LOCAL-10 | 13 | Low | READY | `contactPoint.availableLanguage` declară suport în maghiară și nu există `areaServed`, deși site-ul nu are locale maghiar publicat și livrează doar în România |
| LOCAL-11 | 13 | Info | OPEN | Niciun semnal Google Business Profile / Bing Places / Apple pe site, iar firma nu este eligibilă pentru ele ca magazin exclusiv online: nu creați o fișă |
| LOCAL-12 | 13 | Info | OPEN | Niciun semnal local de autoritate/citare dincolo de registrul statutar; entitatea fondatorului nu este legată; lint-ul GBP deprecat este curat |
| LOCAL-13 | 13 | Info | OPEN | Link-uri pentru litigii de consum: doar un link generic `https://anpc.ro/` în footer; pagina ANPC SAL nu este legată |

Totaluri: 4 Critical · 66 High · 96 Medium · 67 Low · 31 Info; 25 FIXED · 57 READY · 47 PENDING · 135 OPEN.

## Fișiere livrate

Folderul `primesupplements.ro-audit/` (`$A`):

- `FULL-AUDIT-REPORT.md` — acest raport: rezumat executiv, cele 13 secțiuni, apendicele (apendicele de verificare adversarială se atașează separat la final).
- `ACTION-PLAN.md` — planul de acțiune în 4 faze (doar OPEN/PENDING + publicarea-și-verificarea celor READY), dependențe, paralelizare, monitorizare.
- `OWNER-HANDOVER.md` — rezumatul practic pentru proprietar: ce s-a aplicat, cum se publică tema, deciziile care îi aparțin, următoarele 30 de zile.
- `report-sections/` — fișierele-sursă ale raportului (`00-executive-summary.md`, `01-technical.md` … `13-local.md`, `99-appendix.md`), asamblate în `FULL-AUDIT-REPORT.md`.
- `findings/` — cele 17 rapoarte brute ale specialiștilor (`technical.md`, `sitemap.md`, `shopify-config.md`, `content.md`, `cluster.md`, `onpage.md`, `schema.md`, `performance.md`, `images.md`, `geo.md`, `agentic.md`, `ecommerce.md`, `international.md`, `authority.md`, `sxo.md`, `visual.md`, `local.md`) cu dovezi, anexe de URL-uri și snippet-uri; `findings/schema-fixes/` — snippet-urile JSON-LD propuse inițial și exemplele randate cu date reale de catalog.
- `applied/` — exact ce s-a scris în magazin pe 12.10.2026: `products-plan.json` (195 produse: titlu/meta SEO, vendor, productType, categorie), `collections-plan.json` (23 colecții: SEO + 17 descrieri), `articles-plan.json` (354 articole: title_tag/description_tag, autori), `alt-text-plan.json` (493 alt-uri) și jurnalele de aplicare în `applied/logs/` (`products-batches-1-2.json`, `collections-and-alt-part1.json`, `alt-text-all.json`, `articles.json`).
- `theme-fixes/` — fișierele urcate pe tema de test „Impact – SEO fixes 2026-10-12” (id 193875083639): `layout/theme.liquid`, `snippets/schema-product-enhanced.liquid`, `schema-article.liquid`, `schema-collection.liquid`, `schema-organization.liquid`, `schema-breadcrumb-enhanced.liquid`, `social-meta-tags.liquid`, `sections/main-article.liquid`, plus `test_render.py` (validare offline a JSON-LD-ului randat).
- `blog-cleanup/` — `clean.py` (scriptul de curățare a corpurilor), `cleanup-report.json` (contorizări per regulă: 1.379 JSON-LD, 347 scripturi, 194 Powered by, 534 prețuri, 533 linii de urgență, 2.582 linkuri myshopify, 26 H1, 349 casete de autor), `cleaned-bodies.tar.gz` (355 corpuri curățate) și `matrixify-blog-posts.csv.gz` (foaia Blog Posts: ID, Body HTML, gata de import).
- `screenshots/` — capturi Playwright mobil (390×844) și desktop (1366×900) pentru homepage, `/collections/creatina`, `/products/creatina-creapure`, un articol (`home-mobile.png`, `home-desktop.png`, `collection-creatina-mobile.png`, `collection-creatina-desktop.png`, `product-creapure-mobile.png`, `product-creapure-desktop.png`, `article-mobile.png`) și scriptul `shot.js`.
- `data/` — `audit-context.md` (contextul comun și faptele stabilite), `remediation-status.md` (lista exactă a remedierilor live/temă/pregătite), `specialist-results.json` (cele 287 constatări structurate ale celor 17 specialiști), `google-updates.json` (registrul actualizărilor Google), `findings-index.md` (indexul generat de mai sus).
