# PageSpeed Insights: remedierea pe tema de test (13 octombrie 2026)

**Pornire:** raportul PageSpeed Insights trimis de proprietar pentru **tema live**, mobil, Lighthouse 13.5.0 (Moto G Power, 4G lent), 13.10.2026 00:49:

| Categorie | Scor live |
|---|---|
| Performanță | 64 (FCP 3,2 s · LCP 5,4 s · TBT 160 ms · CLS 0 · Speed Index 9,9 s) |
| Accesibilitate | 76 |
| Cele mai bune practici | 88 |
| SEO | 92 |
| Navigare autonomă (agenți AI) | 3/4 |

Apoi, în aceeași zi, raportul PSI **desktop** („Computer”) al temei live, cu aceleași probleme de accesibilitate, SEO și agenți, plus câteva diagnostice în plus (CSS și JavaScript nefolosit, munca firului principal, imagini fără dimensiuni, payload, eroarea CSP `shop.app`). Toate sunt tratate mai jos, în secțiunea 2 (inclusiv subsecțiunea „Desktop”).

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
| **Solicitări de blocare a redării** (650 ms) | 5 resurse blocante: `theme.css`, `bss-custom.css`, `pandectes-rules.js` și **două foi de stil Google Fonts încărcate de aplicația Fontify** (Bebas Neue + Poppins în toate cele 18 grosimi) | Fonturile Fontify sunt servite acum de pe domeniul magazinului: aceleași fișiere woff2, aceleași intervale de caractere și aceleași reguli (`snippets/fontify-fonts.liquid`, 38 de fișiere în `assets/`). Sunt fișierele „hinted”, cele pe care Google le trimite pe Windows și Linux, așa că pe Windows textul se desenează exact ca acum; pe Mac, iPhone și Android instrucțiunile de hinting sunt ignorate, iar conturul literelor și metricile sunt identice (verificat pe toate cele 38 de fișiere). Embed-ul Fontify este oprit în tema de test. Cele 3 reguli din `bss-custom.css` (470 B) sunt puse direct în pagină, în același loc. | **Rezolvat.** A rămas doar `theme.css` (CSS-ul temei, fără de care pagina nu se poate desena). `pandectes-rules.js` (consimțământul GDPR) rămâne intenționat sincron: trebuie să ruleze înaintea oricărui script de urmărire. |
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
| Ordinea titlurilor (articole) | 119 din 121 de articole sar de la H2 (sau de la titlul H1) direct la H4, în cardurile de produs și în caseta autorului | Șablonul articolului adaugă `aria-level` doar acolo unde se sare un nivel (titlurile surori primesc același nivel). Etichetele și stilurile rămân neschimbate. Testat pe toate cele 121 de articole: 185 de corecturi, 0 salturi, 0 titluri surori cu niveluri diferite, HTML identic în rest. | **Rezolvat** |
| Contrast insuficient | Butonul roșu „Cumpără acum” / „Adaugă în coș” (#ec1e24 cu text alb: 4,39 în loc de 4,5), textul verde „În stoc” (și în secțiunea Cluster Insulin Bomb), numele recenzenților Judge.me, estimatorul de livrare, etichetele formularului de comentarii, culorile roz din articole | Toate cer schimbarea unei culori. | **Aprobarea ta** (secțiunea 4, cu foaia de capturi `data/pagespeed/aprobare-micro-schimbari.png`) |
| Elemente `[role]` fără părintele obligatoriu (desktop, pagina de produs) | Filele descrierii de produs („Beneficii cheie”, „Detalii produs” etc.) au `role="tab"`, dar rolul `tablist` stătea pe un element `<slot>`, pe care motorul axe (folosit de Lighthouse) îl sare. Tot de aici venea și „Structura arbore nu este bine formată” la Navigare autonomă pe desktop. | În `sections/tabs.liquid`, rolul și stilul (`part="tab-list"`) sunt mutate pe un `div` care învelește slotul. Testat în browser: capturi identice pixel cu pixel, aceleași poziții ale filelor, filele funcționează (click și săgeți), axe: 4 erori → 0. | **Rezolvat** (desktop, produs: Navigare autonomă 67 → 100) |
| Ținte tactile prea mici | Punctele de navigare ale galeriei de produs, de 6 px, la 14 px distanță | Necesită spațiere mai mare între puncte. | **Aprobarea ta** (secțiunea 4) |

### Cele mai bune practici

| Audit | Cauza | Ce s-a făcut | Stare |
|---|---|---|---|
| Erori în consolă (2 × 404) | (1) `/null`: aplicația Pop Convert caută favicon-ul cu `link[rel="icon"]`, iar tema îl declara ca `rel="shortcut icon"`, așa că aplicația scria „null”; (2) `/apps/mktr/firebase-config.js`: notificările push theMarketer cer un fișier printr-un app proxy care nu este configurat | (1) Favicon-ul este declarat acum `rel="icon"`: aceeași imagine, iar eroarea dispare. | (1) **Rezolvat.** (2) **Din aplicație:** în theMarketer oprești notificările web push sau repari app proxy-ul `/apps/mktr`. |
| Imagini cu raport de aspect greșit | Siglele ANPC SOL/SAL sunt comprimate pe orizontală pe telefoane (flexbox le îngustează) | S-au adăugat lățimea și înălțimea reale (fără efect vizual). Corectarea deformării este o schimbare vizuală. | **Aprobarea ta** (secțiunea 4) |
| Probleme în panoul Issues (cookie) | Cookie-uri terțe: Clarity, Google Ads, shop.app | Nimic de făcut din temă. | **Terți** |
| Probleme în panoul Issues: **Content security policy** (`shop.app`) (desktop) | Funcția Shopify **„Sign in with Shop”** este activă (`window.Shopify.SignInWithShop.eligible = true`, plus `initShopCartSync`), injectată de Shopify în `content_for_header`, nu de temă. Ea încarcă `shop.app`, iar politica CSP a `shop.app` refuză încărcarea în pagină. | Nu se poate opri din temă. | **Decizia ta** (secțiunea 5, punctul 8) |
| Erori în consolă: `otlp-http-production.shopifysvc.com/v1/metrics` `net::ERR_BLOCKED_BY_CLIENT` și o eroare fără sursă (desktop) | Telemetria aceleiași funcții „Sign in with Shop” (`SignInWithShop.assetMetrics`, trimisă la un sfert din vizite, de aceea apare doar uneori). Eroarea fără sursă este, foarte probabil, refuzul CSP de mai sus, pe care Chrome îl scrie în consolă fără fișier. | Nu se poate opri din temă. | **Decizia ta** (secțiunea 5, punctul 8) |

### SEO și Navigare autonomă

| Audit | Stare |
|---|---|
| SEO `image-alt` (singura problemă SEO din PSI) | **Rezolvat**: SEO 100 pe toate cele 4 tipuri de pagini |
| „Structura arbore pentru accesibilitate nu este bine formată” | **Rezolvat** (ARIA corect și nume pentru linkul din popup): **4/4** |
| „Acoperirea formularelor WebMCP: 13 formulare fără adnotări” | **Rezolvat**: toate formularele temei au `toolname` și `tooldescription`, fără efect vizual: adăugare în coș, newsletter, schimbarea țării, căutare, contact, cont client, coș, filtre, comentarii. Numele de instrument sunt unice pe pagină, iar descrierile spun exact ce face formularul (filtrele enumeră filtrele reale ale colecției, lista de țări vine din setările magazinului, mențiunea despre moderarea comentariilor apare doar dacă blogul e moderat). Verificat prin randare pe homepage, produs, colecție, căutare, articol, coș și contact: 0 nume duplicate, 0 erori Liquid. O singură excepție, intenționată: formularul ascuns al widgetului Shop Pay de plată în rate nu are câmpuri și nici buton, așa că nu primește adnotare (un agent nu l-ar putea folosi; Lighthouse îl tratează ca informativ, nu ca eșec). |

### Desktop („Computer”): diagnostice în plus față de mobil

| Diagnostic PSI desktop | Cauza găsită | Ce s-a făcut în tema de test | Stare |
|---|---|---|---|
| **Elemente imagine fără `width` și `height` explicite** | Siglele ANPC din footer, imaginile de produs din caruselul Judge.me și steagul UE din etichetele produselor | Siglele ANPC au primit dimensiunile reale. Caruselul Judge.me și steagul UE au primit un raport de aspect implicit (`aspect-ratio: auto 1 / 1`) care corespunde exact cu ce se afișează deja; verificat fără nicio deplasare. | **Rezolvat** pe homepage, produs și colecție (mobil și desktop). În articole rămân imaginile din textul articolelor: sunt conținut, nu cod de temă, iar diagnosticul nu intră în scor. |
| **Reduce CSS nefolosit** (29 KiB) | `theme.css` (Impact are un singur fișier CSS pentru tot site-ul; pe homepage aproximativ 18 KiB din el sunt pentru alte pagini) și `widget_v3_base.css` de la Judge.me (10 KiB) | Împărțirea CSS-ului temei pe pagini ar însemna rescrierea codului Impact, cu risc pentru aspect. Diagnosticul nu intră în scor (în Lighthouse 13 scorul de performanță vine doar din metrici), iar fișierul rămâne în cache după prima pagină. | **Neatins** (cod de producător și aplicație) |
| **Reduce JavaScript nefolosit** (177 KiB) | Pop Convert (57 KiB), Facebook Pixel (55 KiB, descărcat de **două ori**), pixelii Shopify (34 KiB), widgetul WhatsApp Dondy (31 KiB), `theme.js` (23 KiB), Google tag | Fișiere ale aplicațiilor. | **Aplicații** (secțiunea 5, punctele 7 și 9) |
| **Minimizează JavaScript** (3 KiB) | Un fișier al aplicației UpPromote (`affliate-by-secomapp…/assets/custom…js`), servit neminimizat de aplicație | Nu este în temă. | **Aplicație** (UpPromote) |
| **Reduce munca firului principal** (3,0 s) și **Evită sarcinile lungi** (3) | Execuția scripturilor: Facebook Pixel, `theme.js`, Web Pixels Manager al Shopify, Pandectes, Clarity, Delivery Estimator, Pop Convert, Judge.me | Tema de test nu adaugă niciun script și nu mai încarcă CSS-ul și fonturile de la Google, deci randarea începe mai repede (TBT desktop pe homepage, local: 440 → 110 ms). Volumul total de lucru variază mult de la o rulare la alta, după ce aplicații apucă să ruleze (local, desktop: 4,5–8,3 s, cu tot cu bara de previzualizare), așa că nu dau o cifră de câștig. | **Îmbunătățit** la TBT; restul ține de aplicații |
| **Măsurători și marcaje User Timing** (2) | Marcaje puse de Shopify (`shopify.content_for_header`, `wpm:*` de la Web Pixels Manager) | Sunt informative, nu o problemă. | **Nimic de făcut** |
| **Evită payload-urile foarte mari** (2.747 KiB) | Aproximativ 540 KiB sunt fișierele checkout-ului Shopify, preîncărcate de Shopify cu prioritate mică după ce pagina s-a încărcat, ca plata să pornească mai repede. Apoi Google tag (aproximativ 360 KiB), Facebook (267 KiB), Pop Convert (127 KiB), imaginile paginii | Tema de test nu mai descarcă sprite-ul de steaguri (66 KiB pe desktop), pagina `/null` (54 KiB, eroarea Pop Convert) și CSS-ul Google Fonts. În măsurătorile locale totalul variază cu câteva sute de KiB de la o rulare la alta: popup-ul theMarketer (imagine de aproximativ 200 KiB plus trei fonturi Google proprii: Plus Jakarta Sans, Exo 2, Roboto) și imaginea Pop Convert apar doar în unele vizite, iar Shopify preîncarcă un număr variabil de fișiere de checkout. | **Îmbunătățit** (aproximativ 120 KiB mai puțin din partea temei); restul ține de Shopify și de aplicații |

Accesibilitatea, SEO și agenții din raportul desktop (`aria-controls` invalide, popup-ul fără `alt`, `maximum-scale`, contrastul pentru „Cumpără acum”, „În stoc”, Cluster Insulin Bomb și „Adaugă în coș”, structura arborelui de accesibilitate) sunt aceleași probleme ca pe mobil: rezolvările sunt cele din tabelele de mai sus.

## 3. Rezultate măsurate (Lighthouse 13.5 local, mobil și desktop, aceleași condiții)

| Pagina | Tema live (perf · acces. · BP · SEO · agenți) | Tema de test după remediere | Acces. fără bara de previzualizare* |
|---|---|---|---|
| Homepage | 35 · 76 · 69 · 92 · 67 | 43 · 91 · 69 · **100** · **100** | **94** |
| Produs | 36 · 78 · 69 · 92 · 67 | 45 · 91 · 69 · **100** · **100** | **94** |
| Colecție | 37 · 78 · 69 · 92 · 66 | 36 · 97 · 69 · **100** · **100** | **100** |
| Articol | 44 · 78 · 69 · 92 · 64 | 48 · 94 · 69 · **100** · **100** | **97** |
| Homepage, desktop | 66 · 80 · 73 · 92 · 67 | 88 · 94 · 73 · **100** · **100** | **97** |
| Produs, desktop | 79 · 78 · 73 · 92 · 67 | 82 · 94 · 73 · **100** · **100** | **97** |

\* Bara de previzualizare Shopify (iframe fără titlu) există doar în previzualizare. După publicare dispare și cu ea pierderea de 3 puncte.

**Desktop** (tab-ul „Computer” din PSI), Lighthouse local cu profilul desktop. Homepage: FCP 1,0 → 0,8 s · LCP 1,6 → 1,0 s · TBT 440 → 110 ms. Produs: FCP 1,1 → 1,0 s · LCP 1,9 → 1,6 s. Singurul audit de accesibilitate rămas după publicare este contrastul (secțiunile 4 și 5).

Homepage pe mobil, valori locale, live → test: **FCP 3,0 → 2,9 s · LCP 6,2 → 4,4 s · Speed Index 8,1 → 7,7 s**, chiar dacă testul plătește în plus redirecționarea previzualizării și scripturile barei de previzualizare (aproximativ 415 KiB). Produs: LCP 7,2 → 4,0 s. Colecția are același LCP pe ambele teme (8,1 și 8,3 s): imaginea banner-ului are deja prioritate mare, iar întârzierea vine din scripturile aplicațiilor. Best practices local arată 69 pe ambele teme din cauza unui audit de cookie-uri terțe pe care PSI nu l-a penalizat (PSI: 88).

**Ce să aștepți în PSI după publicare** (estimare), pe mobil și desktop: Accesibilitate 76–80 → **94–97** (100 după aprobările din secțiunea 4), SEO 92 → **100**, Navigare autonomă 3/4 → **4/4**, WebMCP fără formulare neadnotate, Best practices 88 → **88–92** (92 când theMarketer nu mai dă 404; 96 cu corectarea siglelor ANPC; „Sign in with Shop” și cookie-urile terțe țin de tine și de aplicații), Performanță: câteva puncte în plus din FCP/LCP/TBT. Tot ce rămâne la Performanță ține de aplicații (secțiunea 5) și de codul temei Impact.

## 4. Micro-schimbările propuse spre aprobare (aprobate și aplicate, vezi secțiunea 8)

Capturile înainte și după, pentru rândurile 1–5, sunt în `data/pagespeed/aprobare-micro-schimbari.png` (tema de test pe mobil, cu schimbarea simulată în browser).

| # | Ce | Acum | Propunere | Efect |
|---|---|---|---|---|
| 1 | Roșul butoanelor „Cumpără acum”, „Adaugă în coș”, „Trimite” (Setări temă → Culori → Buton principal) | #ec1e24 (contrast 4,39) | **#e91d23** (diferență ΔE2000 0,69, sub pragul de percepție) | 4,50, trece; nu se vede |
| 2 | Verdele „În stoc” (Setări temă → Culori → Success) | #00a341 (2,92 pe gri, 3,33 pe alb) | **#007f2b** | 4,53 pe gri, 5,16 pe alb; se vede: verde mai închis |
| 3 | Numele recenzenților din caruselul Judge.me (homepage) | opacitate 0,600 (#707070, 4,34) | opacitate **0,613** (#6d6d6d), printr-o regulă CSS în temă | 4,54; ΔE2000 1,17, practic nu se vede |
| 4 | Punctele galeriei de produs (mobil) | 6 px, la 16 px unul de altul | aceleași puncte, la **18 px** | ținte tactile conforme; se vede puțin |
| 5 | Siglele ANPC în footer (mobil) | turtite pe orizontală cu aproximativ 10% | `object-fit: contain`: proporțiile reale, cu aproximativ 10% mai scunde | „aspect ratio” trece; se vede puțin |
| 6 | Etichetele formularului de comentarii (articole) | gri 50% (3,24) | #6d6d6d | 4,54 |
| 7 | Rozul din articole (#ea8a8a, 680 de utilizări) | 2,47 | #db3939 | 4,51; schimbare vizibilă în articole |

**Aprobate de proprietar și aplicate în tema de test (13.10: „alea pe telefon ne interesează cel mai mult”, apoi „aprob toate modificările atât timp cât îmbunătățește și nu schimbă designul”).** Valorile finale sunt în secțiunea 8.

## 5. Ce poți face doar tu (în aplicații)

1. **Pop Convert:** completează „Alt text” la imaginea campaniei „Cremă de orez” și încarc-o la 600 px în loc de 1080 px (economisește aproximativ 90 KB pe mobil). Dacă vrei performanță mai bună, afișează popup-ul după scroll sau după câteva secunde, nu la încărcare.
2. **theMarketer:** dezactivează notificările web push (sau reconectează aplicația ca să-și refacă app proxy-ul `/apps/mktr`). Confirmat din codul lor: scriptul theMarketer cheamă la fiecare vizită `setupPushNotification()`, care cere `/apps/mktr/firebase-config.js`; app proxy-ul nu există în magazin, deci răspunsul e 404, iar tema nu poate servi adrese `/apps/...`. Este singura eroare rămasă în consolă și sursa Firebase (JavaScript dublură).
3. **Judge.me:** rezolvat din temă (secțiunea 8); nu mai e nevoie de setări în aplicație.
4. **Delivery Estimator:** rezolvat din temă (secțiunea 8).
5. **Fontify:** embed-ul este oprit în tema de test, fonturile sunt servite de temă. Dacă schimbi vreodată fonturile din Fontify, reactivezi embed-ul și scoți rândul `{%- render 'fontify-fonts' -%}` din `layout/theme.liquid`.
6. **BSS B2B:** regulile din `bss-custom.css` sunt copiate în `layout/theme.liquid`. Dacă aplicația schimbă fișierul, regulile noi trebuie copiate acolo.
7. **Aplicațiile grele** (decizie de business): Microsoft Clarity (cea mai mare parte din TBT), Pop Convert, Facebook Pixel. Fiecare aplicație scoasă se vede direct în scorul de performanță.
8. **„Sign in with Shop”** (Shopify Admin, de obicei la Setări → Conturi clienți; dacă nu o găsești acolo, caută „Sign in with Shop” în bara de căutare din Admin): funcția Shopify care recunoaște clienții cu cont Shop. Ea produce problema CSP `shop.app` din panoul Issues și erorile `otlp-http-production.shopifysvc.com` din consolă (Best practices pe desktop). Dacă o oprești, ambele dispar; dacă o păstrezi (poate aduce conversii de la clienții Shop), rămân. Este o decizie de business, nu o problemă a temei.
9. **Facebook Pixel descărcat de două ori:** `fbevents.js` (114 KiB) se încarcă de 2 ori pe fiecare pagină. Pe magazin rulează mai mulți pixeli: Simprosys (pixel de aplicație și pixel personalizat „SIMPROSYS”), canalul Facebook & Instagram prin pixelul Shopify, Clarity, theMarketer, UpPromote, Judge.me. Dacă Meta Pixel este activat atât în Simprosys, cât și în aplicația Facebook & Instagram, păstrează-l doar într-una (și nu vei mai număra evenimentele de două ori).
10. **UpPromote:** fișierul aplicației pentru recomandări de la clienți este servit neminimizat (3 KiB, diagnosticul „Minimizează JavaScript” pe desktop). Se rezolvă doar din partea aplicației.

## 6. Verificare

- **72 de fișiere** în tema de test: 38 de fonturi și 34 de fișiere de cod și configurare (33 modificate sau noi, plus `snippets/product-info.liquid`, readus la forma inițială). La final am citit checksum-ul MD5 al fiecăruia din Shopify: toate 72 sunt identice cu sursa locală. Fonturile sunt byte cu byte build-ul „hinted” de pe fonts.gstatic.com (`data/pagespeed/self-hosted-fonts.json` are URL-ul și MD5-ul fiecăruia).
- **0 erori Liquid** pe homepage, produs, colecție (două colecții), articol, căutare, coș (cu un produs în coș) și contact, randate prin previzualizare. Nume de instrument WebMCP unice pe fiecare pagină.
- **Capturi pixel cu pixel**, înainte și după, pe mobil (412 px) și desktop (1350 px), pentru homepage, produs, colecție și articol: identice. Singura diferență este steagul de 20 px, desenat acum din pixelii exacți ai steagului, fără „scurgerea” de culoare de la steagurile vecine din sprite (`data/pagespeed/pixel-diff/`). Pentru filele de pe pagina de produs (ultima corectură), captura înainte și după este identică la pixel, iar filele funcționează.
- **Aceleași fonturi încărcate** înainte și după (Bebas Neue 400; Poppins 400/600/700/400 italic; Barlow) și aceeași înălțime a fiecărei pagini. Fonturile au aceleași contururi și metrici ca cele de la Google, pe toate sistemele.
- **Lighthouse local** după ultima încărcare: rezultatele din secțiunea 3 (`data/pagespeed/lighthouse/`).

Fișiere: `theme-fixes/` (copia fișierelor din tema de test), `data/pagespeed/staging-patch-2026-10-13.diff` (diferența completă față de tema de test dinainte de această rundă), `data/pagespeed/aprobare-micro-schimbari.png` (foaia de aprobare), `scripts/pagespeed/` (scripturile de aplicare, încărcare, capturi și analiză Lighthouse).

## 7. Verificare adversarială

Cinci verificatori independenți au analizat modificările, fiecare dintr-un unghi: identitate vizuală, funcționare, validitate Liquid și JSON, accesibilitate/SEO/WebMCP, performanță și conformitate. Apoi fiecare constatare a fost verificată separat de alt agent, care a încercat s-o infirme pe baza fișierelor din tema de test.

| Constatare | Ce s-a făcut |
|---|---|
| Fonturile Bebas Neue/Poppins erau build-ul fără hinting, deci pe Windows titlurile s-ar fi desenat puțin diferit (doi verificatori, independent) | Înlocuite cu build-ul hinted, cel pe care Google îl trimite pe Windows și Linux. Contururile și metricile sunt identice pe toate cele 38 de fișiere. |
| Normalizatorul de titluri din articole dădea niveluri diferite unor titluri surori | Rescris (v2): titlurile de același rang primesc același nivel. Testat pe cele 121 de articole. |
| Două formulare de filtre cu același nume de instrument pe pagina de căutare | Numele includ acum contextul (`filter_products_drawer`, `filter_products_sidebar`, `filter_products_bar`). |
| Scoaterea `aria-controls` rula și în editorul de teme, unde un sertar poate fi pornit fără reîncărcare | Nu mai rulează în editor. |
| Descrieri WebMCP care promiteau mai mult decât face formularul (coșul „modifică cantitățile”, comentariile „sunt moderate”, filtrul „brand”, parametrul `country_code`) | Descrierile spun acum exact ce face formularul: nota comenzii, moderarea doar dacă blogul e moderat, filtrele reale ale fiecărei colecții, țările din setările magazinului. |
| Formularul ascuns Shop Pay de plată în rate primea un nume de instrument „add_to_cart”, deși nu se poate trimite (singura constatare confirmată la verificare) | Adnotarea a fost scoasă, fișierul a revenit la forma inițială. |
| Diferența (`.diff`) și randările folosite ca dovadă erau mai vechi decât tema de test | Regenerate după ultima încărcare. |
| Numele de instrument al cardului de produs s-ar repeta dacă același produs ar apărea de două ori în meniul mega | Nu se întâmplă: meniul nu are niciun produs setat. Lăsat așa și notat aici. |
| Selectorul de țară e adnotat, deși are doar butoane | Păstrat intenționat, cu o descriere corectă (lista se alege din butoane). |

După verificare, ultima rulare Lighthouse pe desktop a găsit încă o problemă, comună cu tema live: filele descrierii de produs (`aria-required-parent`, care pe desktop cobora și Navigarea autonomă la 67). Problema a fost rezolvată în `sections/tabs.liquid` (secțiunea 2, Accesibilitate) și verificată: capturi identice, axe 4 → 0 erori, Navigare autonomă 100 pe produs desktop.

## 8. Runda pentru telefon (după aprobarea proprietarului)

Proprietarul a aprobat micro-schimbările („alea pe telefon ne interesează cel mai mult”), apoi tot ce îmbunătățește fără să schimbe designul. Totul e în tema de test. Fiecare schimbare a fost proiectată de un agent și verificată de un agent independent (axe înainte și după, capturi pixel cu pixel pe paginile afectate), apoi recontrolată după încărcare.

| Ce | Înainte | După | Unde |
|---|---|---|---|
| Roșul butoanelor („Cumpără acum”, „Adaugă în coș”, „Vezi produse”, „Trimite”) | #ec1e24 (4,39) | #e91d23 (4,50), ΔE 0,69, nu se vede | setări temă + `templates/index.json`, `product.json`, `product.creatina2.json` |
| „În stoc” | #00a341 (2,92–3,33) | #007f2b (4,53–5,16) | doar textul de stoc; bannerele de succes rămân neschimbate |
| Numele recenzenților Judge.me (carusel) | opacitate 0,6 | 0,613 (4,54), ΔE 1,17 | `layout/theme.liquid` |
| Etichetele formularelor din pagină (comentarii, contact, cont) | opacitate 0,5 (3,13–3,23) | 0,63 (4,67–4,82) | newsletterul din footer rămâne cum e |
| Siglele ANPC pe telefon | turtite | proporții reale (`object-fit: contain`), aceleași cutii | desktop identic |
| Punctele galeriei de produs (telefon) | 16 px între ele | 18 px (ținte de 24 px) | rămân 16 px acolo unde 18 px ar trece pe al doilea rând |
| Judge.me pe pagina de produs | gri #7b7b7b, roșu #ec1e24, medalie #4c8eda / #a36710 | #6d6d6d, #dd011b, #2270ba / #9c6004 (cea mai mică schimbare care trece, aceeași nuanță) | inclusiv la hover și pentru linkurile vizitate |
| Paginarea recenziilor | ținte de 23,4 × 23 px | 24 × 24 px, fără nicio mișcare | |
| Medalia Judge.me | numele citit de cititorul de ecran nu conținea „100.0” | numele începe cu textul vizibil | `snippets/a11y-fixes.liquid` |
| Delivery Estimator | #e03e2d (3,76) | #d02e21 (4,50) | |
| Rozul din articole (stiluri inline, 108 articole) | #ea8a8a (2,05–2,47) | text #a54f51, fundaluri #b65b5d (aceeași nuanță, mai închisă) | `sections/main-article.liquid`; conținutul articolelor e neatins |
| Trei griuri din 3 articole; verdele din tabelul `ce-este-creatina` | 4,18–4,24; #2ecc71 (2,10) | 4,50–4,54 (ΔE 1,7–2,3); #00893d (4,52) | `sections/main-article.liquid` |
| Butonul de căutare de pe pagina de căutare | fără nume accesibil | „Căutare” (`aria-label`) | `sections/main-search.liquid` |

**Viteză pe telefon, fără efect vizual:**
- Cardurile „articolul anterior/următor” de sub articole își încarcă imaginile la scroll, așa că nu mai concurează cu imaginea principală (LCP pe articole −0,3…0,6 s în simulare).
- Pe paginile de produs, galeria se deschide direct pe imaginea variantei selectate (`scroll-initial-target`, Chrome/Edge 133+), fără să mai arate o clipă prima imagine. Pagina după încărcare e identică, iar LCP vine la prima afișare (−0,8…1 s în simulare, pe produsele a căror variantă implicită nu are prima imagine).

**Conținut reparat (live):** singura imagine stricată din peste 230 de imagini din 120 de articole (al 121-lea, `vitamina-c-doza-pe-varste`, n-a putut fi citit din cauza verificării anti-bot) era în *Carbohidrați intra-workout: rezultate după 90 de zile*, în cardul „Articole similare” către *Dextrină ciclică vs maltodextrină*. Acum folosește fișierul original (`…-studii-2026-1775819141781.png`). S-a schimbat doar adresa imaginii (verificat octet cu octet).

**Verificare după încărcare:** sumele MD5 ale fișierelor urcate sunt identice cu sursa locală. Pe homepage, produse, colecție, articole, contact și căutare: 0 erori Liquid, 0 imagini stricate, 0 nume de instrument duplicate, iar galeria nu derulează pagina.

**Notificarea Pop Convert „… persoane …”:** textul gri #8d8d8d pe alb (3,31) devine #767676 (4,54), doar acolo unde are exact acel gri (`snippets/a11y-fixes.liquid`).

**Rezultate finale (Lighthouse 13.5 local, tema de test, după toate schimbările):**

| Pagina | Perf · Acces. · BP · SEO · Agenți | Accesibilitate după publicare* |
|---|---|---|
| Homepage, telefon | 44 · 97 · 73 · 100 · 100 | **100** |
| Produs, telefon | 50 · 97 · 73 · 100 · 100 | **100** |
| Colecție, telefon | 34 · 97 · 73 · 100 · 100 | **100** |
| Articol, telefon | 51 · 97 · 73 · 100 · 100 | **100** |
| Homepage, desktop | 88 · 97 · 73 · 100 · 100 | **100** |
| Produs, desktop | 89 · 94–97 · 73 · 100 · 100 | **100** |

\* Singurul audit de accesibilitate rămas este `frame-title` al barei de previzualizare Shopify, care nu există după publicare. La Best practices (73 local, 88 în PSI pe tema live) rămân doar: eroarea 404 theMarketer (secțiunea 5, punctul 2), problema CSP „Sign in with Shop” (punctul 8) și cookie-urile terțe. LCP pe telefon, live → test: homepage 6,2 → 4,3 s, produs 7,2 → 3,1 s, articol 5,7 → 3,7 s. Colecția depinde de animația de apariție a banner-ului (design Impact) și de aplicații.

**Cost aproximativ al aplicațiilor (homepage live, telefon, câte o aplicație blocată pe rând, o rulare fiecare, `data/pagespeed/lighthouse/apps-blocking-live-home.txt`):** fără Clarity, Judge.me, Pop Convert, Facebook sau pixelii Shopify, scorul local crește cu 5–8 puncte fiecare (în principal Speed Index și TBT). Măsurătorile locale variază mult de la o rulare la alta, deci cifrele sunt orientative; decizia de a păstra sau nu aplicațiile e una de business.

**Lăsate intenționat (ar schimba vizibil designul sau nu aduc nimic în scor):**
- roșul etichetelor de reducere și al prețurilor reduse (#f83a3a, 3,71): ar trebui închis vizibil (ΔE 5,4–9,1), iar Lighthouse nu le semnalează (cardurile apar la scroll);
- cifrele albe de pe căsuțele gri ale listelor de verificare din articole (infografic);
- imaginile din articole la dimensiunea telefonului (srcset): codul e gata (`scripts/pagespeed/mobile`), aduce −48% date pe telefon la imaginile din articole, dar nu schimbă scorul, iar imaginile ar fi redimensionate de CDN (nu identice la pixel).
