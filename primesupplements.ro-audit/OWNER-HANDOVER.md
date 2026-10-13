# Prime Supplements – ce s-a făcut și ce rămâne de făcut (actualizat 13 octombrie 2026)

Rezumatul practic pentru proprietar. Detaliile pe constatări sunt în `data/round2-status.md` (runda 2) și `data/remediation-status.md` (runda 1); raportul complet în `FULL-AUDIT-REPORT.md`, planul în `ACTION-PLAN.md`.

Regula respectată în tot acest timp: **designul site-ului nu a fost atins.** S-au schimbat doar texte, date, redirecturi și cod invizibil (meta, date structurate, robots, accesibilitate). Ce ar fi cerut o schimbare de design este listat la punctul 4, ca să decizi tu.

## 1. Aplicat deja pe magazinul live (nu necesită nicio acțiune)

| Zonă | Ce s-a schimbat | Cum verifici |
|---|---|---|
| Piața Ungaria | Copia completă a site-ului de sub `/ro-hu/` (575 de pagini duplicate, cu prețuri fără TVA) a fost eliminată; fiecare URL vechi face 301 către pagina românească | deschide `primesupplements.ro/ro-hu/products/creatina-creapure` → ajungi pe `/products/creatina-creapure` |
| Redirecturi fără ocolișuri (13.10) | 324 de URL-uri vechi `/ro-hu/...` trimiteau la articole care între timp au fost mutate sau unite; acum duc direct la pagina finală, dintr-un singur redirect | `primesupplements.ro/ro-hu/blogs/news/protein-a-cum-sa-stii-daca-timing` → direct la `/blogs/news/cand-se-ia-proteina` |
| URL-uri vechi din WooCommerce | `/categorie-produs/...` duce direct (un singur redirect) la colecția corectă | `primesupplements.ro/categorie-produs/suplimente/` |
| Produse (195) | Titluri în română, cu diacritice (sunt și titlul mare de pe pagină); descriere completă; tab-urile „Beneficii cheie”, „Despre produs”, „Ingrediente”, „Detalii produs” completate pe toate; doar mențiuni de sănătate permise în UE + avertismentele obligatorii la suplimente | orice pagină de produs |
| Blog | Din 355 de articole generate automat au rămas **121**, câte unul pe subiect, cu titluri noi, URL-uri românești curate și autor „Marius Chera”; celelalte 234 trimit cu 301 la articolul păstrat. Corpurile au fost curățate: fără linkuri `myshopify`, fără scripturi, fără „Powered by BlogGenAuto”, fără date false „Published”, fără statistici inventate sau afirmații medicale, cu disclaimer medical și link la pagina de autor | `/blogs/news` și orice articol |
| Blog (13.10) | Fiecare articol are un rezumat curat (cel afișat pe carduri și în feed), un link către categoria produsului despre care vorbește, imagini cu text alternativ și cerute de la CDN la mărimea afișată, titluri închise corect; numele autorului duce la pagina de autor; fiecare articol are o singură etichetă de temă în română, deci bara de filtre a blogului arată 11 teme (Creatină, Proteine, Aminoacizi…), nu etichete tehnice | orice articol, la final: „Mai multe produse din această categorie…” |
| Colecții duplicate | „Toate produsele”, „11% TVA”, „Reduceri”, „Cele mai vândute”, „Lansate recent”, colecția homepage și pagina B2B „thank-you” sunt scoase din Google (noindex) și din sitemap; rămân accesibile din meniu | `primesupplements.ro/collections/all` → sursa paginii conține `noindex` |
| Meniuri și categorii | Diacritice în meniuri și în titlurile de categorie (Băuturi, Creatină, Cremă de orez, Înregistrare B2B, Politica de plată / confidențialitate); „Înregistrare B2B” din footer duce la pagina cu formular de pe site-ul principal | meniul și footer-ul |
| Date structurate | Descrierile de produs nu mai conțin rânduri noi între paragrafe, deci blocul Product al temei actuale este JSON valid pe toate produsele (la fel blocul Article pe articole, prin rezumate); brandul Frutilu pe cele 19 băuturi | Google Rich Results Test pe orice produs |
| Articole noi | 11 articole noi, documentate cu studii și surse oficiale (EFSA, Regulamentul UE 432/2012), pentru categoriile care nu aveau niciun ghid (băuturi, batoane, cremă de orez, pre-workout, proteine, magneziu, glutamină, creatină). **Sunt salvate ca ciorne, nepublicate** | Admin → Conținut → Postări blog → „Ascunse” |
| Pagini | Pagină de autor nouă: `/pages/autor-marius-chera`; termenii mutați pe `/pages/termeni-si-conditii` și aliniați cu politica de livrare (20 RON, gratuit peste 300 RON, 24–72 ore); firma corectă în politica de cookie-uri; blogul se numește „Blog despre suplimente și antrenament”; „All Products” → „Toate produsele” | paginile respective |
| Imagini | Text alternativ în română pe toate imaginile de temă (hero, logo, bannere, tile-uri) și pe cele 150 de imagini din Fișiere, pe lângă cele 493 de imagini de produs din runda 1 | — |
| Runda 1 (12.10) | Titlu SEO + meta description pe 195 produse, 23 colecții, toate articolele și paginile; vendor, tip de produs, categorie; descrieri pe 17 colecții; alt text pe 493 de imagini de produs | — |

## 2. Tema de test – publicarea o faci tu (10 minute)

Tema „Impact – SEO fixes 2026-10-12 (Claude, nepublicată)” conține toate corecțiile de cod: date structurate valide pentru produse (preț, stoc, retur, livrare, rating Judge.me), articole (autor Marius Chera legat de pagina lui), firmă (CUI, adresă, telefon, rețele, fondator), pagini (Contact, Despre noi, Autor); noindex pe listările duplicate și pe paginile filtrate pe etichetă; titluri cu brand; robots.txt cu politica de conținut pentru AI; în fiecare colecție, ghidurile din categoria ei (nu cele mai noi 3 articole de oriunde); link ANPC SAL, WhatsApp direct, adresa din footer către pagina de contact; mici corecturi de accesibilitate. Aspectul paginilor este identic cu tema actuală.

**Runda PageSpeed (13.10, rapoartele PSI mobil și desktop; detalii în `PAGESPEED-2026-10-13.md`):** tot în tema de test, tot fără schimbări de aspect (verificat pixel cu pixel):
- **Fonturi:** fonturile Fontify (Bebas Neue, Poppins) sunt servite de pe domeniul magazinului, nu de la Google: aceleași fișiere pe care Google le trimite pe Windows, deci textul arată la fel peste tot. Embed-ul Fontify este oprit doar în tema de test.
- **Resurse și imagini:** CSS-ul BSS este pus direct în pagină; s-au scos preconnect-urile inutile; sprite-ul de steaguri (155 KB pe mobil) nu se mai descarcă.
- **Accesibilitate:** zoom permis pe Android (iOS se comportă ca înainte); ARIA corect la iconițele de căutare și coș și la filele descrierii de produs (desktop); text alternativ pentru popup-ul Pop Convert; numele butonului de țară; ordinea titlurilor din articole; dimensiuni explicite pentru siglele ANPC, caruselul Judge.me și steagul UE.
- **Erori și agenți AI:** a dispărut eroarea 404 `/null`; toate formularele au adnotări WebMCP pentru agenții AI.
- **Rezultat așteptat în PSI** (mobil și desktop): SEO 100, Navigare autonomă 4/4, Accesibilitate de la 76–80 la 94–97 (100 după aprobările de la punctul 27).

Pași:
1. Aplicațiile Koala Gifts, BlogGenAuto, PageFly și YouTube Gallery nu mai sunt instalate în magazin (au fost dezinstalate între 12 și 13 octombrie). Pe tema live au rămas embed-urile lor, care afișează în cod eroarea ascunsă „Failed to render app block … does not exist”; tema de test nu le mai are. Dacă ai înlocuit cadourile Koala cu Wi BOGO+, verifică în previzualizare că oferta apare în coș.
2. „Previzualizare”: verifică homepage, o colecție, un produs, un articol și coșul. Titlurile trebuie să apară cu fontul Bebas Neue și textul cu Poppins, la fel ca pe tema live.
3. „Publică”. Tema actuală rămâne în listă ca rezervă.
4. După publicare: Google Rich Results Test pe `/products/baton-proteic-capsuni` → „Product” fără erori.

## 3. Ce poți face doar tu (în ordinea importanței)

1. **BlogGenAuto este deja dezinstalat**: nu mai generează articole. Nu îl reinstala; dacă vrei articole noi, pornește de la cele 11 ciorne documentate.
2. **Revizuiește și publică cele 11 articole noi** (ciorne). Sunt scrise pe surse reale, dar sunt texte despre sănătate: citește-le înainte de publicare.
3. **Piața Ungaria:** Setări → Piețe → Ungaria → dezactivează piața (selectorul de țară încă afișează „Ungaria”, iar `?country=HU` arată prețuri fără TVA, de ex. 148,76 în loc de 180 RON) și șterge zona de livrare Ungaria (tarife în HUF).
4. **Magazinul B2B:** parolă pe storefront (Magazin online → Preferințe → Restricționează accesul). Altfel cele 58 de produse duplicate cu prețuri en-gros rămân în Google, cu descrierile vechi și cu o a doua entitate „PRIME SPORT SUPPLEMENTS SRL / 46260823” în datele structurate.
5. **Google Search Console** (proprietate de domeniu) + **Bing Webmaster Tools**: retrimite `sitemap.xml`. Nu folosi „Eliminări” pentru URL-urile vechi `www` / `categorie-produs` / `/ro-hu`: toate fac 301 către pagina nouă, iar o eliminare temporară ar ascunde și varianta corectă. Google le actualizează singur.
6. **Coduri de bare (GTIN):** 207 variante nu au cod de bare, iar 27 de coduri existente nu sunt valide. Tema nouă publică doar codurile valide; completează-le din etichete (Produse → Variantă → Cod de bare).
7. **Judge.me:** traduce textele widget-ului în română (Setări → Traduceri).
8. **Adresa din profilul magazinului** (Setări → General): oraș și număr completate, la fel ca în footer.
9. **De verificat cu producătorul:** citratul de magneziu are 450 mg magneziu pe doza de 2 capsule, peste nivelul de 250 mg/zi din suplimente stabilit de EFSA (articolul nou despre magneziu spune asta deschis).
10. **Pachetul Thermo Core + Water Out** (oferta 1–14 august) este nelistat, dar două articole despre arzătoare îl recomandă cu buton „Cumpără acum”. Dacă pachetul nu se mai vinde, spune-mi și le mut pe produsele separate.
11. **Bannerul de cookie-uri (Pandectes):** primul ecran are doar „Preferințe” și „Accept”, fără „Refuz”. Autoritățile UE (EDPB, 2023) cer ca refuzul să fie la fel de ușor ca acceptarea. Textul „Declin” există deja în setări; în Pandectes → Banner → Layout adaugă butonul de refuz. Este o problemă de conformitate GDPR, nu de SEO.
12. **Paginile de politici** (confidențialitate, retur etc.) scriu adresa site-ului ca „www.primesupplements.ro”. Site-ul canonic este fără `www`: Setări → Politici → înlocuiește textul.
13. **Profilul LinkedIn al autorului:** în articole existau două profiluri diferite (`linkedin.com/in/chera23` și `linkedin.com/in/chera-marius-030ba637a`), unele cu link rupt (fără `https://`). Acum numele autorului din fiecare articol duce la `/pages/autor-marius-chera`. Spune-mi care profil este cel corect și îl adaug vizibil pe pagina de autor și în datele structurate. Până atunci datele structurate din tema de test nu mai trimit la niciun profil LinkedIn (un `sameAs` care nu apare pe pagina de autor nu ajută).
14. **Facebook:** footer-ul și tema de test folosesc `facebook.com/primesupplementsro`. Verifică în browser că acesta este profilul oficial; dacă nu, spune-mi și îl schimb peste tot.
15. **Secțiunea „Reduceri” de pe homepage** afișează de fapt cele mai vândute produse și duce la „Cele mai vândute” (acum scoasă din Google). Titlul ei este o decizie comercială: fie o redenumești, fie o legi de colecția „Reduceri”.
16. **Revizia editorială a articolelor vechi:** cele 121 de articole au fost curățate de afirmațiile medicale evidente, dar câteva deschideri mai au formulări de tip „susține energia / refacerea / utilizarea grăsimilor” pentru plante sau ingrediente fără mențiune autorizată (spirulină, ashwagandha, arzătoare). Pentru siguranță juridică (Regulamentele UE 1924/2006 și 432/2012), merită o citire de către cineva care cunoaște mențiunile permise.
17. **Titlul și descrierea homepage-ului, live chiar acum:** Magazin online → Preferințe → „Titlul paginii principale” = `Suplimente nutritive, proteine și creatină | Prime Supplements`; „Meta descrierea paginii principale” = `Magazin online de suplimente nutritive pentru sport: creatină, proteine din zer, pre-workout, aminoacizi, vitamine și echipament de sală MNX. Livrare rapidă în toată România.` Sunt aceleași texte pe care le pune tema de test; din Preferințe apar imediat, fără să aștepți publicarea temei (API-ul nu permite scrierea lor).
18. **Titlul secțiunii „Inainte/dupa” de pe homepage:** în editorul de temă (Personalizează → secțiunea cu imaginile înainte/după) scrie „Înainte/după”, cu diacritice. Este o setare de text; nu schimbă aspectul.
19. **Certificările din pagina „Despre noi”:** textul spune că materia primă este susținută de certificări „TÜV, IFS, HALAL și Cologne List for Athletes”. Păstrează fraza doar dacă poți arăta certificatele furnizorilor (ideal, cu link sau imagine); altfel scoate-o. Afirmațiile de certificare neverificabile sunt un risc de practică comercială înșelătoare.
20. **Articolele de sănătate (colecția Prime Health):** 16 articole despre colesterol, tensiune, ficat etc. au ca autor un antrenor de culturism. Este onest, dar pentru subiecte medicale Google caută expertiză medicală: fie o revizie semnată de un medic sau farmacist (cu numele pe pagină), fie depublicarea celor mai medicale dintre ele.
21. **Înainte de a publica cele 11 articole noi:** `creatina-efecte-secundare` se suprapune cu articolul păstrat `creatina-si-retentia-de-apa` (care primește deja 3 redirecturi despre efecte secundare). Ori le unești, ori le diferențiezi clar titlurile și primele paragrafe, ca să nu se canibalizeze din nou.
22. **robots.txt (opțional, după publicarea temei):** tema de test conține o copie fixă a robots.txt-ului actual + linia `Content-Signal`. Dacă vrei ca regulile viitoare ale Shopify să se aplice automat, înlocuiește-o cu varianta dinamică din `theme-fixes/templates/robots.txt.liquid.dynamic` și verifică în previzualizare că fiecare regulă e pe rândul ei; nu am putut-o testa aici (previzualizarea era blocată de verificarea anti-bot).
23. **Pop Convert** (PageSpeed): în campania „Cremă de orez” completează „Alt text” la imagine și încarc-o la 600 px în loc de 1080 px (aproximativ 90 KB mai puțin pe mobil). Tema de test completează temporar textul lipsă, dar ce scrii în aplicație are prioritate.
24. **theMarketer** (PageSpeed, eroare 404 în consolă): oprește notificările web push sau cere-le să repare app proxy-ul `/apps/mktr` (cererea `/apps/mktr/firebase-config.js` răspunde 404). Cât timp eroarea există, „Cele mai bune practici” nu poate trece de 92.
25. **Judge.me și Delivery Estimator** (contrast): în Judge.me → Widget → Appearance: gri **#6d6d6d** (în loc de #707070/#7b7b7b), roșu pentru linkuri **#da1218**, albastru pentru medalie **#286ec0**; în Delivery Estimator: roșu **#cf2f1f** (în loc de #e03e2d).
26. **Fontify și BSS B2B, după publicarea temei:** dacă schimbi fonturile din Fontify, reactivează embed-ul și scoate rândul `{%- render 'fontify-fonts' -%}` din `layout/theme.liquid`. Dacă BSS modifică `assets/bss-custom.css`, copiază regulile noi în `layout/theme.liquid` (au fost mutate acolo ca să nu mai blocheze afișarea).
27. **Micro-schimbări de culoare/spațiere** care duc Accesibilitatea la 100. Foaia cu capturi înainte/după este `data/pagespeed/aprobare-micro-schimbari.png`: (1) roșul butoanelor #ec1e24 → **#e91d23** (nu se vede, ΔE 0,69); (2) verdele „În stoc” #00a341 → **#007f2b** (se vede: mai închis); (3) numele recenzenților Judge.me, opacitate 0,600 → **0,613** (practic nu se vede); (4) punctele galeriei de produs la **18 px** în loc de 16 px; (5) siglele ANPC cu proporțiile reale pe mobil. În articole mai sunt (6) etichetele comentariilor și (7) rozul #ea8a8a. Lista exactă e în `PAGESPEED-2026-10-13.md`, secțiunea 4. Spune „da” (sau numerele pe care le vrei) și le aplic.
28. **„Sign in with Shop”** (Shopify Admin, de obicei la Setări → Conturi clienți; dacă nu o găsești acolo, caută „Sign in with Shop” în bara de căutare din Admin): această funcție Shopify produce eroarea CSP `shop.app` din panoul Issues și erorile `otlp-http-production.shopifysvc.com` din consolă, din raportul PSI desktop. Nu vine din temă. Dacă o oprești, dispar; dacă o păstrezi (îi recunoaște pe clienții cu cont Shop), rămân. E decizia ta.
29. **Facebook Pixel de două ori:** `fbevents.js` (114 KB) se descarcă de 2 ori pe pagină. Dacă Meta Pixel este activ atât în Simprosys, cât și în aplicația Facebook & Instagram, păstrează-l într-una singură (evită și dublarea evenimentelor).
30. **UpPromote:** un fișier al aplicației este servit neminimizat (3 KB, „Minimizează JavaScript” pe desktop). Se rezolvă doar din aplicație.

## 4. Lăsate intenționat neatinse (ar fi schimbat designul sau au risc comercial)

| Ce | De ce contează | De ce nu s-a făcut |
|---|---|---|
| Bannerul de cookie-uri pe tot ecranul pe mobil (Pandectes) | ascunde hero-ul la prima vizită | layout = design; Pandectes → Banner → „Bar” durează 2 minute dacă vrei |
| Bara „Adaugă în coș” fixă pe mobil; H1 pe hero; ordinea secțiunilor de pe homepage; alegerea fonturilor (acum servite de temă, aceleași); autoplay la slideshow; paginarea blogului; titlul paginii 404 | viteză și conversie pe mobil | toate schimbă aspectul |
| Prețul tăiat în datele structurate și colecția „Reduceri” | 120 de produse au preț „comparativ” permanent; a-l arăta ca reducere riscă probleme cu Directiva Omnibus | decizie comercială/juridică |
| Unirea variantelor de culoare/aromă (45 de produse) | o singură pagină puternică în loc de 2–4 slabe | schimbă pagini și URL-uri |
| Redenumirea fișierelor de imagine | nume descriptive în Google Images | înlocuiește fișierele folosite de temă |
| Contrastul câtorva culori, punctele galeriei de produs, siglele ANPC pe mobil | Accesibilitate 94 → 100 și Best practices | fiecare schimbă o culoare sau o spațiere; valorile minime sunt în `PAGESPEED-2026-10-13.md`, secțiunea 4 (zoom-ul pe mobil s-a rezolvat între timp fără schimbare vizibilă) |

## 5. Fișiere livrate

- `FULL-AUDIT-REPORT.md` / `.pdf`, `ACTION-PLAN.md` / `.pdf`, `OWNER-HANDOVER.pdf`, `audit-data.json`
- `PAGESPEED-2026-10-13.md`: fiecare problemă din PageSpeed Insights, ce s-a făcut și cu ce rezultat; rapoartele Lighthouse în `data/pagespeed/`
- `data/round2-status.md`: starea fiecărei constatări după runda 2
- `applied/`: exact ce s-a scris în magazin (produse, articole, redirecturi, pagini, alt text, articole noi) + loguri
- `theme-fixes/`: fișierele temei de test; `scripts/`: scripturile folosite
