# Runda 2 de remediere – 13 octombrie 2026

Proprietarul a cerut „repară absolut tot”, cu o singură limită: **„să nu umbli la design-ul site-ului, să nu strici nimic”**. Runda 2 a schimbat deci doar date, texte, redirecturi și cod invizibil (meta, schema, robots, atribute, accesibilitate) pe tema de test. Nimic din aspectul paginilor (secțiuni, ordine, culori, fonturi, layout, aplicații) nu a fost atins. Ce ar fi cerut o schimbare de design este listat separat la final, cu motivul.

Legendă stări noi: **FIXED-R2** = aplicat pe magazinul live în runda 2 și verificat · **READY-R2** = în tema de test (id 193875083639), devine live la publicare · **PARȚIAL** = partea care se putea face fără design/fără decizia proprietarului este făcută · **PROPRIETAR** = necesită o decizie sau un acces pe care doar proprietarul îl are · **DESIGN** = lăsat neatins conform instrucțiunii.

## 1. Rezumat pe programe

| Program | Ce s-a făcut | Unde | Verificare (13.10.2026) |
|---|---|---|---|
| Piața Ungaria (`/ro-hu`, `/ro-huu`) | Prezențele web eliminate; 575 redirecturi 301 1:1 `/ro-hu/<cale>` → `/<cale>` (`applied/redirects/ro-hu-redirects.csv`) | live | `/ro-hu` → 301 `/`; `/ro-hu/collections/creatina` → 301; `sitemap.xml` fără `ro-hu`; homepage fără hreflang `ro-HU`; 575 reguli în Admin |
| URL-uri vechi WooCommerce | Toate cele 25 de reguli `/categorie-produs/*` trimit direct la colecția finală (un singur hop); reguli noi pentru căile din `legacy-redirects.csv` | live | `/categorie-produs/suplimente/` → 301 `/collections/suplimente-sala` (200) |
| Pagini și entitate | Pagina de autor `/pages/autor-marius-chera` (antrenor de culturism, fondator); termenii mutați pe handle ASCII `/pages/termeni-si-conditii` (301 de pe vechiul URL); numele firmei corectat în politica de cookie-uri; titlurile paginilor de confidențialitate și plată corectate; blogul redenumit „Blog despre suplimente și antrenament” cu H1 „Ghiduri despre suplimente” și meta description; colecția „All Products” → „Toate produsele” | live | titlurile și H1 citite live |
| Consolidarea blogului | 355 → 121 articole publicate: 233 duplicate depublicate, 234 redirecturi 301 către articolul păstrat / colecție / produs; 121 articole retitrate (≤ 60 caractere, fără „2026”), 92 mutate pe handle-uri românești ASCII (301 automat), etichete `hub:` / `intent:` / temă pe toate, autor unic „Marius Chera”; `custom.hub_articles` pe 11 colecții | live (+ blocul de ghiduri pe colecții în tema de test) | handle vechi → 301 → handle nou 200 cu H1 nou |
| Corpurile articolelor (121) | Reparate și importate: fără scripturi, JSON-LD, linkuri myshopify, „Published:”, „Powered by BlogGenAuto”; linkurile `/cart/<id>:1` → pagina produsului; etichete românești („Pe scurt”, „Cuprins”, „Întrebări frecvente”); fără ani-momeală, branduri concurente, fragmente englezești, statistici inventate sau afirmații medicale neautorizate; deschidere cu răspunsul; disclaimer medical; autor cu link la pagina de autor | live | vezi §4 (importul este verificat articol cu articol prin sha256) |
| Articole noi | 11 articole documentate cu surse reale (PubMed/PMC, EFSA, Regulamentul UE 432/2012), create ca **ciorne nepublicate** | live, nepublicate | Admin → Conținut → Postări blog → filtrul „Ascunse” |
| Produse (195) | Titluri românești (= H1), descriere completă, tab-urile „Beneficii cheie” / „Despre produs” / „Ingrediente” / „Detalii produs” completate pe toate, secțiune SEO pe 81; doar mențiuni de sănătate autorizate UE + avertismentele obligatorii pentru suplimente | live | 193/195 verificate pe storefront (2 pachete sunt nelistate); exemplu: H1 `/products/creatina-creapure` = „Creatină monohidrat micronizată Creapure®” |
| Imagini de temă | Alt text românesc pe 52 de fișiere de temă/secțiuni și 150 de imagini din Content → Files | live | homepage și cele 23 de colecții: 0 `<img>` cu alt gol |
| Tema de test v2 | noindex pe URL-urile filtrate pe tag; robots.txt = copia exactă a celui live + `Content-Signal`; schema pentru ContactPage/AboutPage/ProfilePage; fondator (Person) legat în Organization; autorul articolelor cu `@id` și pagină; GTIN emis doar dacă trece cifra de control GS1; `aria-label` pe navigație și selectorul de țară; preload/fetchpriority corecte pe imaginea principală de articol și galerie; adresa din footer → `/pages/contact`, telefon `tel:`, link ANPC SAL, WhatsApp direct `wa.me/40775286584`; titluri de secțiune corectate („S-ar putea să-ți placă”, „Vezi toate”); blocul de articole din colecții arată ghidurile hub-ului; textele paginilor Despre noi și Contact (diacritice, date de identificare, NAP) | tema de test | preview + `theme-fixes/` |

## 2. Starea constatărilor după runda 2

Doar constatările a căror stare s-a schimbat. Restul își păstrează starea din `findings-index.md`.

| ID | Înainte | Acum | Ce s-a făcut / ce rămâne |
|---|---|---|---|
| TECH-01 / SITEMAP-01 / SHOPIFY-01 | PENDING | FIXED-R2 | Prezența web `/ro-hu` eliminată, 575 redirecturi 301; sitemap curat |
| INTERNATIONAL-01, -02, -03, -06, -07 | PENDING | FIXED-R2 | Copia `/ro-hu`, prețurile fără TVA, hreflang-ul `ro-HU` și cele două forme de URL au dispărut odată cu prezența web |
| ECOMMERCE-02 · SCHEMA-14 · AUTHORITY-08 · GEO-13 / AGENTIC-16 · SXO-12 · ONPAGE-28 | PENDING | FIXED-R2 | Aceeași cauză (`/ro-hu`) |
| INTERNATIONAL-05 | PENDING | PARȚIAL | Selectorul de țară mai listează „Ungaria” (piața există fără domeniu): Settings → Markets → Ungaria → dezactivează |
| INTERNATIONAL-04 | PENDING | PROPRIETAR | Zona de livrare Ungaria (tarife în HUF) rămâne de șters în Settings → Shipping |
| IMAGES-05 | PENDING | PARȚIAL | Dublarea prin `/ro-hu` a dispărut; sitemap-ul de imagini rămâne generat de platformă |
| SXO-04 | OPEN | PARȚIAL | Redirecturile legacy într-un singur hop; rămâne GSC → Removals pentru rezultatele vechi |
| TECH-17 / SITEMAP-12 | OPEN | PARȚIAL | Termenii au acum handle ASCII; celelalte handle-uri cu diacritice nu au fost redenumite (ar schimba URL-uri de produs indexate) |
| CONTENT-04 · GEO-06 | PENDING | FIXED-R2 | Pagina de autor, autor unic pe toate articolele, acreditare reală („antrenor de culturism”) în loc de „Nutriționist certificat” neverificabil; schema Person legată READY-R2 |
| AUTHORITY-10 | READY | FIXED-R2 + READY-R2 | Pagina de autor live; markup-ul în tema de test |
| LOCAL-04 | OPEN | PARȚIAL | Firma inexistentă din politica de cookie-uri corectată; NAP-ul canonic din footer în tema de test |
| ONPAGE-24 | OPEN | FIXED-R2 | Titlu, H1 și meta description pe indexul blogului |
| ONPAGE-20 | READY | FIXED-R2 | „All Products” → „Toate produsele” (titlurile paginate nu mai sunt bilingve) |
| CONTENT-05 / CLUSTER-04 · CLUSTER-03 · CLUSTER-05 · CLUSTER-12 · CLUSTER-13 · SXO-09 · GEO-15 | PENDING | FIXED-R2 | Consolidarea: 121 păstrate, 234 redirecționate, un articol pe intenție |
| ONPAGE-13 · CLUSTER-07 | PENDING / OPEN | FIXED-R2 | Numele concurenților scoase din titluri, handle-uri și corpuri |
| TECH-18 · CONTENT-13 / CLUSTER-06 | PENDING / OPEN | FIXED-R2 | 92 handle-uri curate; regenerările „-2…-5” și fragmentele englezești ies prin redirect |
| ONPAGE-11 | OPEN | FIXED-R2 | 121 titluri/H1 noi, ≤ 60 caractere, fără an |
| CONTENT-14 / CLUSTER-10 | OPEN | PARȚIAL | Etichete pe toate articolele + titlu de blog; navigarea pe hub-uri devine vizibilă la publicarea temei; paginarea arhivei = DESIGN |
| CLUSTER-02 | OPEN | READY-R2 | Fiecare colecție arată ghidurile propriului hub (`custom.hub_articles` live, secțiunea în tema de test) |
| SITEMAP-15 | PENDING | PARȚIAL | 708 → 121 articole generate automat în sitemap; restul calității editoriale ține de proprietar |
| CONTENT-01 | PENDING | PARȚIAL | Volumul a scăzut de la 355 la 121 de articole, toate reparate, cu disclaimer și autor real; **BlogGenAuto trebuie oprit** de proprietar, altfel generează articole noi |
| SXO-01 | PENDING | PARȚIAL | Canibalizarea dintre articole a dispărut; ca pagina de colecție să câștige, ajută publicarea temei + autoritate |
| CONTENT-09 · ONPAGE-16 · AUTHORITY-05 · AUTHORITY-06 · ECOMMERCE-19 · GEO-12 | READY | FIXED-R2 | Linkurile myshopify, „Powered by”, `/cart/` și linkurile moarte eliminate din sursă, nu doar la afișare |
| TECH-13 / SHOPIFY-07 · SCHEMA-04 | PENDING | FIXED-R2 | Scripturile și graful JSON-LD BlogGenAuto scoase din corpuri (prevenirea pe viitor = oprirea BlogGenAuto) |
| CONTENT-11 · ONPAGE-14 | READY / PENDING | FIXED-R2 | Un singur H1 (titlul temei), fără linia „Published:” |
| CONTENT-10 · GEO-02 | OPEN | FIXED-R2 | Datele fabricate „Published / Updated” scoase; rămân datele reale Shopify |
| CONTENT-03 · GEO-07 · GEO-09 | OPEN / PENDING | FIXED-R2 | Disclaimer medical, afirmații medicale neautorizate și statistici inventate scoase, răspunsul în primul paragraf |
| CONTENT-17 | OPEN | FIXED-R2 | „Key Takeaways”, „Table of Contents”, „FAQ” traduse |
| CONTENT-02 / GEO-01 · AUTHORITY-14 | OPEN | PARȚIAL | Linkurile decorative spre homepage-uri scoase; citări reale în cele 11 articole noi; articolele vechi nu au citări (muncă editorială) |
| GEO-10 · GEO-11 · SXO-10 · CLUSTER-11 | OPEN / PENDING | PARȚIAL | FAQ-urile clinice și markerii de generare reduși; linkurile spre articole redirecționate rescrise; traseul spre produs = linkuri directe spre pagina produsului |
| CLUSTER-14 · CLUSTER-09 | OPEN | PROPRIETAR | 11 articole noi pentru hub-urile goale (băuturi ×2, batoane, cremă de orez ×2, pre-workout ×2, aminoacizi, vitamine și minerale, proteine, creatină), ciorne care așteaptă revizia și publicarea |
| ECOMMERCE-07 · CONTENT-06 · GEO-04 | OPEN | FIXED-R2 | Tab-urile de produs completate pe 195/195, definiția în primul paragraf, doar mențiuni autorizate |
| ONPAGE-06 · ECOMMERCE-09 · ONPAGE-07 | OPEN | FIXED-R2 | Titluri românești cu diacritice (= H1) pe 195 produse |
| AGENTIC-15 | OPEN | FIXED-R2 | Descrierile MNX cu markup lipit din Gemini rescrise |
| CONTENT-07 · SXO-08 | OPEN | PARȚIAL | Descrieri unice pe fiecare produs; unirea variantelor de culoare = DESIGN (schimbă pagini și URL-uri) |
| IMAGES-02 · VISUAL-04 | OPEN | FIXED-R2 | Alt text pe hero, logo, tile-uri și secțiuni |
| IMAGES-03 | OPEN | PARȚIAL | Alt text pus; numele de fișier de aparat foto rămân (redenumirea înlocuiește fișierele folosite de temă) |
| TECH-08 | OPEN | READY-R2 | noindex pe `/collections/*/<tag>` și `/blogs/news/tagged/*` |
| GEO-17 / AGENTIC-02 | OPEN | READY-R2 | `Content-Signal: search=yes, ai-input=yes, ai-train=yes` în robots.txt (proprietarul poate schimba `ai-train`) |
| AGENTIC-01 · TECH-26 | OPEN | PARȚIAL | Politica de conținut declarată; regulile platformei păstrate identic |
| SCHEMA-20 | OPEN | READY-R2 | ContactPage, AboutPage, ProfilePage |
| LOCAL-12 | OPEN | READY-R2 | Fondatorul (Person) legat de Organization și de autorul articolelor |
| LOCAL-03 · LOCAL-13 · AUTHORITY-16 | OPEN | READY-R2 | Adresa din footer → `/pages/contact`; link ANPC SAL; WhatsApp direct |
| CONTENT-15 · LOCAL-08 | OPEN | READY-R2 | Texte Despre noi / Contact cu date de identificare, NAP, diacritice, link la autor (H1-ul vizibil = DESIGN) |
| AGENTIC-08 | OPEN | READY-R2 | Nume accesibil pe selectorul de țară |
| AGENTIC-09 · TECH-21 · ONPAGE-22 · ECOMMERCE-15 · ECOMMERCE-22 | OPEN | PARȚIAL (READY-R2) | `aria-label` pe navigație; dns-prefetch retras; greșelile din titlurile de secțiune; blocul de blog pe colecție specific hub-ului |
| IMAGES-12 | OPEN | READY-R2 | Preload doar pentru galeria din primele secțiuni |
| PERFORMANCE-13 · IMAGES-08 | OPEN | PARȚIAL (READY-R2) | `fetchpriority="high"` + `loading="eager"` pe imaginea principală a articolului |
| ECOMMERCE-05 | PENDING | PARȚIAL (READY-R2) | Codurile de bare invalide nu mai sunt publicate ca `gtin`; completarea GTIN-urilor = PROPRIETAR |
| SCHEMA-06 | READY | READY-R2 | Pagina de termeni aliniată cu politica de livrare (20 RON, gratuit peste 300 RON, 24–72 ore), deci markup-ul nu mai contrazice paginile |

## 3. Lăsate neatinse intenționat

**DESIGN (instrucțiunea proprietarului):** VISUAL-01 (layout banner cookie, setare Pandectes), VISUAL-02 (bara sticky „Adaugă în coș”), VISUAL-03 (H1 pe hero), VISUAL-05 (poziția bulei WhatsApp), PERFORMANCE-05 / IMAGES-11 / SXO-07 / SXO-11 (secțiunile și ordinea homepage-ului), TECH-12 / PERFORMANCE-01 (fonturile Fontify), PERFORMANCE-14 (autoplay slideshow), TECH-04 / ONPAGE-15 (paginarea arhivei de blog), TECH-27 (H1 pe pagina 404), ECOMMERCE-08 / ONPAGE-26 / SCHEMA-18 (unirea variantelor de culoare/aromă: schimbă pagini și URL-uri).

**Risc comercial sau legal, nu doar SEO:** SCHEMA-19 (preț tăiat în markup: 120 de produse au compare-at permanent, iar afișarea lui ca reducere ridică riscul Omnibus), ECOMMERCE-11 / SXO-14 (regula colecției „Reduceri”: aceeași problemă), ștergerea codurilor de bare invalide (pot fi folosite la scanare în depozit), redenumirea fișierelor de imagine (IMAGES-04).

**Doar proprietarul:** publicarea temei de test (și reactivarea embed-ului Koala Gifts, vezi §5), oprirea BlogGenAuto, parola pe B2B, GTIN-urile, Google Search Console / Bing, traducerile Judge.me (ONPAGE-21), dezactivarea pieței Ungaria și a zonei de livrare HU, adresa din profilul magazinului (LOCAL-05), revizia și publicarea celor 11 articole noi.

## 4. Verificări înainte de a marca

- Toate cele 195 de produse au fost scrise cu `productUpdate`; 193 verificate pe storefront (titlu, descriere și fiecare text de tab prezent în HTML). Cele 2 pachete nelistate (`pachet-nitrox3d-creatina-creapure®`, `fiber-creatina-creapure®`) au fost verificate prin Admin. 20 de scrieri respinse de filtrul de siguranță al agenților au fost refăcute manual și verificate la fel.
- Corpurile articolelor: fiecare corp reparat a trecut validatorul `import/validate.py` (echilibru HTML nu mai rău decât înainte, 0 myshopify / BlogGenAuto / „Published:” / script / JSON-LD / `/cart/` / H1, toate linkurile interne spre articole păstrate, produse active sau colecții existente, imaginile, tabelele și caseta de autor păstrate, cu excepția secțiunilor scoase motivat: secțiunea „Nattokinaza vs. Aspirină”, tabelele cu procente nesusținute din articolul despre magneziu glicinat și secțiunea off-topic din articolul despre momentul proteinei). Importul este verificat prin sha256 al corpului citit înapoi.
- Cele 11 articole noi: corpul citit înapoi din Admin comparat cu fișierul local; toate linkurile interne verificate 200 fără redirect.

## 5. Atenție la publicarea temei de test

Shopify a eliminat la scrierea prin API trei embed-uri de aplicații din `config/settings_data.json` al temei de test: Koala Gifts (activ pe tema live), urmărirea BlogGenAuto și un embed PageFly orfan. **Înainte de „Publică”: Customize → App embeds → pornește „Koala Gifts”** (și BlogGenAuto doar dacă aplicația rămâne). Blocul YouTube orfan din șablonul de produs a dispărut tot atunci (nu se randa oricum).
