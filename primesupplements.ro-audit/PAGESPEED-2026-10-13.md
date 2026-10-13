# PageSpeed Insights: remedierea pe tema de test (13 octombrie 2026)

**Pornire:** raportul PageSpeed Insights trimis de proprietar pentru **tema live**, mobil, Lighthouse 13.5.0 (Moto G Power, 4G lent), 13.10.2026 00:49:

| Categorie | Scor live |
|---|---|
| Performanță | 64 (FCP 3,2 s · LCP 5,4 s · TBT 160 ms · CLS 0 · Speed Index 9,9 s) |
| Accesibilitate | 76 |
| Cele mai bune practici | 88 |
| SEO | 92 |
| Navigare autonomă (agenți AI) | 3/4 |

**Regula respectată:** totul este făcut doar pe **tema de test** „Impact – SEO fixes 2026-10-12” (id 193875083639), nepublicată, fără nicio schimbare de aspect. Tema live (179784286583) nu a fost atinsă. O publici tu la final.

## 1. Cum s-a măsurat

- Cota zilnică a API-ului PageSpeed era epuizată, așa că am rulat **Lighthouse 13.5.0** (aceeași versiune ca PSI) local, cu aceeași emulare mobilă, pe 4 tipuri de pagini: homepage, produs (`/products/prime-whey-2000g`), colecție (`/collections/pudra-proteica`) și articol (`/blogs/news/ce-este-intra-workout`).
- Tema de test a fost măsurată prin previzualizarea Shopify (`?preview_theme_id=`). Previzualizarea adaugă două lucruri care nu vor exista după publicare: o **redirecționare** (aproximativ 0,4–0,9 s în plus la încărcare) și **bara de previzualizare Shopify**, un iframe fără titlu care pierde 3 puncte la accesibilitate (`frame-title`).
- Procesorul mediului de test este mai lent decât al serverelor PSI, deci TBT local este mult mai mare. Comparațiile de mai jos sunt live și test, rulate în aceleași condiții. Scorurile absolute PSI vor fi diferite.
- Rapoartele complete sunt în `data/pagespeed/lighthouse/*.json.gz` (`live-*` pentru tema live, `stg*-*` pentru tema de test).

## 2. Fiecare problemă din PSI: cauză, ce s-a făcut, stare

### Performanță

| Insight PSI | Cauza găsită | Ce s-a făcut în tema de test | Stare |
|---|---|---|---|
| **Solicitări de blocare a redării** (650 ms) | 5 resurse blocante: `theme.css`, `bss-custom.css`, `pandectes-rules.js` și **două foi de stil Google Fonts încărcate de aplicația Fontify** (Bebas Neue + Poppins în toate cele 18 grosimi) | Fonturile Fontify sunt servite acum de pe domeniul magazinului: aceleași fișiere woff2, aceleași intervale de caractere și aceleași reguli (`snippets/fontify-fonts.liquid`, 38 de fișiere în `assets/`). Embed-ul Fontify este oprit în tema de test. Cele 3 reguli din `bss-custom.css` (470 B) sunt puse direct în pagină, în același loc. | **Rezolvat.** A rămas doar `theme.css` (CSS-ul temei, fără de care pagina nu se poate desena). `pandectes-rules.js` (consimțământul GDPR) rămâne intenționat sincron: trebuie să ruleze înaintea oricărui script de urmărire. |
| **Arborele de dependențe al rețelei** + avertismentul „mai mult de 4 preconnect” | Preconnect-uri inutile sau ale Fontify: `fonts.shopifycdn.com` (nefolosit, fonturile temei vin de pe domeniul magazinului), `cdn.nitroapps.co`, `fonts.googleapis.com`. Lanțul document → CSS Google → fișier font | Preconnect-urile inutile sunt scoase. Lanțul Google Fonts a dispărut. | **Rezolvat.** Lighthouse: „No additional origins are good candidates for preconnecting”, fără avertisment. |
| **Îmbunătățește livrarea imaginilor** (176 KiB) | (1) sprite-ul cu steagurile tuturor țărilor, 480 KB (155 KiB pe mobil), din care se afișează doar steagul României (și al Ungariei în listă); (2) imaginea popup-ului Pop Convert, 1080 px afișată la 579 px; (3) cardurile de produs, 600 px pentru 534 px | (1) Steagurile RO și HU sunt decupaje identice la pixel din sprite, puse în CSS, așa că sprite-ul nu se mai descarcă. (3) S-a adăugat o variantă de 550 px în `srcset` la cardurile de produs. | (1) și (3) **rezolvate** (local: de la 175 KiB la 12 KiB). (2) **Din aplicație:** în Pop Convert încarci imaginea la 600 px. |
| **Perioade eficiente de cache** (238 KiB) | Doar resurse terțe: SDK Pop Convert (cache 5 min), Facebook Pixel (20 min), imaginea popup-ului theMarketer, Clarity, UpPromote | Nimic de făcut din temă: durata cache o stabilește furnizorul. | **Terți.** |
| **Rearanjare forțată** | `theme.js` (Impact, aproximativ 120 ms), pixelii Shopify (`/cdn/wpm`), Shopify perf-kit, Clarity | Ar cere modificarea codului temei Impact sau al aplicațiilor. Neatins. | **Neatins** (cod de producător). |
| **JavaScript dublură** (1 KiB) / **JavaScript vechi** (12 KiB) | `firebase-app`/`firebase-messaging` 8.10.0 (notificările push theMarketer) și Facebook Pixel `fbevents.js` | Nimic: sunt fișiere ale furnizorilor. | **Terți.** |
| **Optimizează dimensiunea DOM** (4.215 elemente) | Meniul (variantele mobil și desktop), cele 9 secțiuni de pe homepage, caruselul Judge.me | Ar însemna schimbarea structurii paginii, deci a designului. | **Neatins** (design). |
| **Detalierea LCP** | Elementul LCP este imaginea hero, care are deja `fetchpriority="high"` și `loading="eager"`. Întârzierea de randare venea din CSS-urile și fonturile blocante. | Rezolvat indirect prin eliminarea resurselor blocante. Local, LCP pe homepage a scăzut de la 6,2 s la 4,1 s (cu tot cu redirecționarea previzualizării). | **Îmbunătățit.** |
| **Terțe părți** | Microsoft Clarity (0,4–2 s de JavaScript pe mobil), Pop Convert (140–310 KB), pixelii Shopify (Google Ads, Facebook), Judge.me, theMarketer | Aplicațiile se încarcă prin propriile embed-uri; tema nu le poate amâna fără să le oprească. | **Decizia proprietarului** (vezi secțiunea 5). |

### Accesibilitate

| Audit | Cauza | Ce s-a făcut | Stare |
|---|---|---|---|
| `[aria-*]` cu valori invalide | Iconițele de căutare și coș trimit (`aria-controls`) la sertarele „search-drawer” și „cart-drawer”, care sunt dezactivate în temă și deci nu există | `snippets/a11y-fixes.liquid` scoate atributul doar când elementul lipsește. Iconițele merg în continuare la /search și /cart, ca acum. | **Rezolvat** |
| Imagini fără `alt` + linkuri fără nume (și SEO `image-alt`) | Popup-ul Pop Convert „Cremă de orez” are imaginea-link fără text alternativ | Până se completează câmpul în aplicație, tema pune ca text alternativ textul linkului din pagină către aceeași destinație (de exemplu meniul „Cremă de orez”). Ce scrii în aplicație are prioritate. | **Rezolvat** (+ recomandare în aplicație) |
| `meta viewport` cu `maximum-scale=1` | Blochează zoom-ul pe Android | `maximum-scale` nu mai este trimis implicit, deci se poate face zoom. Un script de 3 rânduri îl adaugă înapoi doar pe iPhone/iPad, unde Safari îl ignoră oricum la zoom, dar îl folosește ca să nu mărească pagina când se apasă într-un câmp de formular. Pe iOS comportamentul rămâne identic. | **Rezolvat** |
| Nume accesibil diferit de textul vizibil | Butonul de țară arată „România (RON Lei)”, dar anunța „Schimbă țara sau moneda” | Numele accesibil începe acum cu textul vizibil: „România (RON Lei) – Schimbă țara sau moneda”. | **Rezolvat** (medalia Judge.me rămâne din aplicație) |
| Ordinea titlurilor (articole) | 119 din 121 de articole sar de la H2 (sau de la titlul H1) direct la H4, în cardurile de produs și în caseta autorului | Șablonul articolului adaugă `aria-level` doar acolo unde se sare un nivel. Etichetele și stilurile rămân neschimbate. Testat pe toate cele 121 de articole: 0 salturi, HTML identic în rest. | **Rezolvat** |
| Contrast insuficient | Butonul roșu (#ec1e24 cu text alb: 4,39 în loc de 4,5), textul verde „În stoc”, culorile Judge.me, estimatorul de livrare, etichetele formularului de comentarii, culorile roz din articole | Toate cer schimbarea unei culori. | **Aprobarea ta** (secțiunea 4) |
| Ținte tactile prea mici | Punctele de navigare ale galeriei de produs, de 6 px, la 14 px distanță | Necesită spațiere mai mare între puncte. | **Aprobarea ta** (secțiunea 4) |

### Cele mai bune practici

| Audit | Cauza | Ce s-a făcut | Stare |
|---|---|---|---|
| Erori în consolă (2 × 404) | (1) `/null`: aplicația Pop Convert caută favicon-ul cu `link[rel="icon"]`, iar tema îl declara ca `rel="shortcut icon"`, așa că aplicația scria „null”; (2) `/apps/mktr/firebase-config.js`: notificările push theMarketer cer un fișier printr-un app proxy care nu este configurat | (1) Favicon-ul este declarat acum `rel="icon"`: aceeași imagine, iar eroarea dispare. | (1) **Rezolvat.** (2) **Din aplicație:** în theMarketer oprești notificările web push sau repari app proxy-ul `/apps/mktr`. |
| Imagini cu raport de aspect greșit | Siglele ANPC SOL/SAL sunt comprimate pe orizontală pe telefoane (flexbox le îngustează) | S-au adăugat lățimea și înălțimea reale (fără efect vizual). Corectarea deformării este o schimbare vizuală. | **Aprobarea ta** (secțiunea 4) |
| Probleme în panoul Issues (cookie) | Cookie-uri terțe: Clarity, Google Ads, shop.app | Nimic de făcut din temă. | **Terți** |

### SEO și Navigare autonomă

| Audit | Stare |
|---|---|
| SEO `image-alt` (singura problemă SEO din PSI) | **Rezolvat**: SEO 100 pe toate cele 4 tipuri de pagini |
| „Structura arbore pentru accesibilitate nu este bine formată” | **Rezolvat** (ARIA corect și nume pentru linkul din popup): **4/4** |
| „Acoperirea formularelor WebMCP: 13 formulare fără adnotări” | **Rezolvat**: toate formularele temei au `toolname` și `tooldescription`, fără efect vizual: adăugare în coș, newsletter, schimbarea țării, căutare, contact, cont client, coș, filtre, comentarii. Numele de instrument sunt unice pe pagină. Pe homepage sunt 13/13, pe produs 7/7, pe căutare 15/15, pe coș 4/4, pe contact 5/5. |

## 3. Rezultate măsurate (Lighthouse 13.5 local, mobil, aceleași condiții)

| Pagina | Tema live (perf · acces. · BP · SEO · agenți) | Tema de test după remediere | Acces. fără bara de previzualizare* |
|---|---|---|---|
| Homepage | 35 · 76 · 69 · 92 · 67 | 46 · 91 · 69 · **100** · **100** | **94** |
| Produs | 36 · 78 · 69 · 92 · 67 | 37 · 91 · 69 · **100** · **100** | **94** |
| Colecție | 37 · 78 · 69 · 92 · 66 | 35 · 97 · 69 · **100** · **100** | **100** |
| Articol | 44 · 78 · 69 · 92 · 64 | 55 · 94 · 69 · **100** · **100** | **97** |

\* Bara de previzualizare Shopify (iframe fără titlu) există doar în previzualizare. După publicare dispare și cu ea pierderea de 3 puncte.

Homepage, valori locale, live → test: **FCP 3,0 → 2,6 s · LCP 6,2 → 4,1 s · Speed Index 8,1 → 7,2 s**, chiar dacă testul plătește în plus redirecționarea previzualizării. Best practices local arată 69 pe ambele teme din cauza unui audit de cookie-uri terțe pe care PSI nu l-a penalizat (PSI: 88).

**Ce să aștepți în PSI după publicare** (estimare): Accesibilitate 76 → **94** (100 după cele două aprobări de culoare și spațiere), SEO 92 → **100**, Navigare autonomă 3/4 → **4/4**, WebMCP fără formulare neadnotate, Best practices 88 → **88–92** (92 când theMarketer nu mai dă 404; 96 cu corectarea siglelor ANPC; restul sunt cookie-uri terțe), Performanță: mai multe puncte din FCP/LCP. Tot ce rămâne la Performanță ține de aplicații (secțiunea 5) și de codul temei Impact.

## 4. Lăsate neatinse: cer acordul tău (schimbări vizuale minime, valorile exacte)

| # | Ce | Acum | Propunere | Efect |
|---|---|---|---|---|
| 1 | Roșul butoanelor (Setări temă → Culori → Buton principal) | #ec1e24 (contrast 4,39) | **#eb161d** (cu 1,6% mai închis, practic imperceptibil) | contrast 4,50, trece |
| 2 | Verdele „În stoc” (Setări temă → Culori → Success) | #00a341 (2,92 pe gri) | #007f33 | 4,51, vizibil mai închis |
| 3 | Punctele galeriei de produs (mobil) | 6 px, la 14 px distanță | aceleași puncte, la 18 px distanță | ținte tactile conforme |
| 4 | Siglele ANPC pe telefon | comprimate orizontal cu aproximativ 10% | `object-fit: contain`: proporții corecte, cu 10% mai scunde | „aspect ratio” trece |
| 5 | Etichetele formularului de comentarii | gri 50% (3,24) | #6d6d6d | 4,54 |
| 6 | Rozul din articole (#ea8a8a, 680 de utilizări) | 2,47 | #db3939 | 4,51; schimbare vizibilă în articole |

Spune „da” la oricare dintre ele și le aplic în tema de test.

## 5. Ce poți face doar tu (în aplicații)

1. **Pop Convert:** completează „Alt text” la imaginea campaniei „Cremă de orez” și încarc-o la 600 px în loc de 1080 px (economisește aproximativ 90 KB pe mobil). Dacă vrei performanță mai bună, afișează popup-ul după scroll sau după câteva secunde, nu la încărcare.
2. **theMarketer:** dezactivează notificările web push (sau cere-le să repare app proxy-ul `/apps/mktr`). Asta elimină eroarea 404 din consolă și încărcarea Firebase (JavaScript dublură).
3. **Judge.me** (Settings → Widget → Appearance): textul gri **#6d6d6d** în loc de #707070/#7b7b7b, roșul linkurilor **#da1218** pe fundal gri, albastrul medaliei **#286ec0**.
4. **Delivery Estimator:** roșul mesajului de stoc **#cf2f1f** în loc de #e03e2d.
5. **Fontify:** embed-ul este oprit în tema de test, fonturile sunt servite de temă. Dacă schimbi vreodată fonturile din Fontify, reactivezi embed-ul și scoți rândul `{%- render 'fontify-fonts' -%}` din `layout/theme.liquid`.
6. **BSS B2B:** regulile din `bss-custom.css` sunt copiate în `layout/theme.liquid`. Dacă aplicația schimbă fișierul, regulile noi trebuie copiate acolo.
7. **Aplicațiile grele** (decizie de business): Microsoft Clarity (cea mai mare parte din TBT), Pop Convert, Facebook Pixel. Fiecare aplicație scoasă se vede direct în scorul de performanță.

## 6. Verificare

- **71 de fișiere** urcate în tema de test (38 de fonturi și 33 de fișiere de cod/configurare). Fiecare are checksum-ul MD5 identic cu sursa locală. Pentru fonturi, sursa este byte cu byte fișierul de pe fonts.gstatic.com.
- **0 erori Liquid** pe homepage, produs, colecție, articol, căutare, coș și contact (randate prin previzualizare).
- **Capturi pixel cu pixel**, înainte și după, pe mobil (412 px) și desktop (1350 px), pentru homepage, produs, colecție și articol: identice. Singura diferență este steagul de 20 px, desenat acum din pixelii exacți ai steagului, fără „scurgerea” de culoare de la steagurile vecine din sprite (`data/pagespeed/pixel-diff/`).
- **Aceleași fonturi încărcate** înainte și după (Bebas Neue 400; Poppins 400/600/700/400 italic; Barlow) și aceeași înălțime a fiecărei pagini.
- **Verificare adversarială:** vezi secțiunea 7.

Fișiere: `theme-fixes/` (copia fișierelor din tema de test), `data/pagespeed/staging-patch-2026-10-13.diff` (diferența completă), `scripts/pagespeed/` (scripturile de aplicare, încărcare, capturi și analiză Lighthouse).

## 7. Verificare adversarială

_În lucru._
