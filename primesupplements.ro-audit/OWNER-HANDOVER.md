# Prime Supplements – ce s-a făcut și ce rămâne de făcut (actualizat 13 octombrie 2026)

Rezumatul practic pentru proprietar. Detaliile pe constatări sunt în `data/round2-status.md` (runda 2) și `data/remediation-status.md` (runda 1); raportul complet în `FULL-AUDIT-REPORT.md`, planul în `ACTION-PLAN.md`.

Regula respectată în tot acest timp: **designul site-ului nu a fost atins.** S-au schimbat doar texte, date, redirecturi și cod invizibil (meta, date structurate, robots, accesibilitate). Ce ar fi cerut o schimbare de design este listat la punctul 4, ca să decizi tu.

## 1. Aplicat deja pe magazinul live (nu necesită nicio acțiune)

| Zonă | Ce s-a schimbat | Cum verifici |
|---|---|---|
| Piața Ungaria | Copia completă a site-ului de sub `/ro-hu/` (575 de pagini duplicate, cu prețuri fără TVA) a fost eliminată; fiecare URL vechi face 301 către pagina românească | deschide `primesupplements.ro/ro-hu/products/creatina-creapure` → ajungi pe `/products/creatina-creapure` |
| URL-uri vechi din WooCommerce | `/categorie-produs/...` duce direct (un singur redirect) la colecția corectă | `primesupplements.ro/categorie-produs/suplimente/` |
| Produse (195) | Titluri în română, cu diacritice (sunt și titlul mare de pe pagină); descriere completă; tab-urile „Beneficii cheie”, „Despre produs”, „Ingrediente”, „Detalii produs” completate pe toate; doar mențiuni de sănătate permise în UE + avertismentele obligatorii la suplimente | orice pagină de produs |
| Blog | Din 355 de articole generate automat au rămas **121**, câte unul pe subiect, cu titluri noi, URL-uri românești curate și autor „Marius Chera”; celelalte 234 trimit cu 301 la articolul păstrat. Corpurile au fost curățate: fără linkuri `myshopify`, fără scripturi, fără „Powered by BlogGenAuto”, fără date false „Published”, fără statistici inventate sau afirmații medicale, cu disclaimer medical și link la pagina de autor | `/blogs/news` și orice articol |
| Articole noi | 11 articole noi, documentate cu studii și surse oficiale (EFSA, Regulamentul UE 432/2012), pentru categoriile care nu aveau niciun ghid (băuturi, batoane, cremă de orez, pre-workout, proteine, magneziu, glutamină, creatină). **Sunt salvate ca ciorne, nepublicate** | Admin → Conținut → Postări blog → „Ascunse” |
| Pagini | Pagină de autor nouă: `/pages/autor-marius-chera`; termenii mutați pe `/pages/termeni-si-conditii` și aliniați cu politica de livrare (20 RON, gratuit peste 300 RON, 24–72 ore); firma corectă în politica de cookie-uri; blogul se numește „Blog despre suplimente și antrenament”; „All Products” → „Toate produsele” | paginile respective |
| Imagini | Text alternativ în română pe toate imaginile de temă (hero, logo, bannere, tile-uri) și pe cele 150 de imagini din Fișiere, pe lângă cele 493 de imagini de produs din runda 1 | — |
| Runda 1 (12.10) | Titlu SEO + meta description pe 195 produse, 23 colecții, toate articolele și paginile; vendor, tip de produs, categorie; descrieri pe 17 colecții; alt text pe 493 de imagini de produs | — |

## 2. Tema de test – publicarea o faci tu (10 minute)

Tema „Impact – SEO fixes 2026-10-12 (Claude, nepublicată)” conține toate corecțiile de cod: date structurate valide pentru produse (preț, stoc, retur, livrare, rating Judge.me), articole (autor Marius Chera legat de pagina lui), firmă (CUI, adresă, telefon, rețele, fondator), pagini (Contact, Despre noi, Autor); noindex pe listările duplicate și pe paginile filtrate pe etichetă; titluri cu brand; robots.txt cu politica de conținut pentru AI; în fiecare colecție, ghidurile din categoria ei (nu cele mai noi 3 articole de oriunde); link ANPC SAL, WhatsApp direct, adresa din footer către pagina de contact; mici corecturi de accesibilitate. Aspectul paginilor este identic cu tema actuală.

Pași:
1. Aplicațiile Koala Gifts, BlogGenAuto, PageFly și YouTube Gallery nu mai sunt instalate în magazin (au fost dezinstalate între 12 și 13 octombrie). Pe tema live au rămas embed-urile lor, care afișează în cod eroarea ascunsă „Failed to render app block … does not exist”; tema de test nu le mai are. Dacă ai înlocuit cadourile Koala cu Wi BOGO+, verifică în previzualizare că oferta apare în coș.
2. „Previzualizare”: verifică homepage, o colecție, un produs, un articol și coșul.
3. „Publică”. Tema actuală rămâne în listă ca rezervă.
4. După publicare: Google Rich Results Test pe `/products/baton-proteic-capsuni` → „Product” fără erori.

## 3. Ce poți face doar tu (în ordinea importanței)

1. **BlogGenAuto este deja dezinstalat**: nu mai generează articole. Nu îl reinstala; dacă vrei articole noi, pornește de la cele 11 ciorne documentate.
2. **Revizuiește și publică cele 11 articole noi** (ciorne). Sunt scrise pe surse reale, dar sunt texte despre sănătate: citește-le înainte de publicare.
3. **Piața Ungaria:** Setări → Piețe → Ungaria → dezactivează piața (selectorul de țară încă afișează „Ungaria”) și șterge zona de livrare Ungaria (tarife în HUF).
4. **Magazinul B2B:** parolă pe storefront (Magazin online → Preferințe → Restricționează accesul). Altfel cele 58 de produse duplicate cu prețuri en-gros rămân în Google.
5. **Google Search Console** (proprietate de domeniu) + **Bing Webmaster Tools**: retrimite `sitemap.xml`; la „Eliminări” cere scoaterea URL-urilor vechi `www` / `categorie-produs`.
6. **Coduri de bare (GTIN):** 207 variante nu au cod de bare, iar 27 de coduri existente nu sunt valide. Tema nouă publică doar codurile valide; completează-le din etichete (Produse → Variantă → Cod de bare).
7. **Judge.me:** traduce textele widget-ului în română (Setări → Traduceri).
8. **Adresa din profilul magazinului** (Setări → General): oraș și număr completate, la fel ca în footer.
9. **De verificat cu producătorul:** citratul de magneziu are 450 mg magneziu pe doza de 2 capsule, peste nivelul de 250 mg/zi din suplimente stabilit de EFSA (articolul nou despre magneziu spune asta deschis).
10. **Pachetul Thermo Core + Water Out** (oferta 1–14 august) este nelistat, dar două articole despre arzătoare îl recomandă cu buton „Cumpără acum”. Dacă pachetul nu se mai vinde, spune-mi și le mut pe produsele separate.

## 4. Lăsate intenționat neatinse (ar fi schimbat designul sau au risc comercial)

| Ce | De ce contează | De ce nu s-a făcut |
|---|---|---|
| Bannerul de cookie-uri pe tot ecranul pe mobil (Pandectes) | ascunde hero-ul la prima vizită | layout = design; Pandectes → Banner → „Bar” durează 2 minute dacă vrei |
| Bara „Adaugă în coș” fixă pe mobil; H1 pe hero; ordinea secțiunilor de pe homepage; fonturile Fontify; autoplay la slideshow; paginarea blogului; titlul paginii 404 | viteză și conversie pe mobil | toate schimbă aspectul |
| Prețul tăiat în datele structurate și colecția „Reduceri” | 120 de produse au preț „comparativ” permanent; a-l arăta ca reducere riscă probleme cu Directiva Omnibus | decizie comercială/juridică |
| Unirea variantelor de culoare/aromă (45 de produse) | o singură pagină puternică în loc de 2–4 slabe | schimbă pagini și URL-uri |
| Redenumirea fișierelor de imagine | nume descriptive în Google Images | înlocuiește fișierele folosite de temă |

## 5. Fișiere livrate

- `FULL-AUDIT-REPORT.md` / `.pdf`, `ACTION-PLAN.md` / `.pdf`, `OWNER-HANDOVER.pdf`, `audit-data.json`
- `data/round2-status.md`: starea fiecărei constatări după runda 2
- `applied/`: exact ce s-a scris în magazin (produse, articole, redirecturi, pagini, alt text, articole noi) + loguri
- `theme-fixes/`: fișierele temei de test; `scripts/`: scripturile folosite
