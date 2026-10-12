## 12. Vizual și mobil (above the fold, cookie banner)

**Scor specialist (la momentul auditului):** 48/100 — un singur specialist (seo-visual: Playwright Chromium 1194 prin proxy-ul sandbox, viewport 390x844 mobil cu DPR 2 + 1366x900 desktop, 4 pagini, fără consimțământ dat): tema Impact randează curat și responsiv (fără overflow orizontal, text ≥ 14 px, tap targets mari), dar la prima vizită bannerul Pandectes acoperă 100 % din viewport-ul mobil și centrul hero-ului pe desktop (H1, CTA și primele produse invizibile), pagina de produs pe mobil nu are „Adaugă în coș” above the fold, iar bula WhatsApp acoperă primul card de produs. **Scor combinat: 48/100** (un singur specialist alimentează secțiunea).

**Scor estimat după remedierile din 12.10.2026:** 50/100 — niciuna dintre cele 5 constatări nu a fost atinsă de remedierile din 12.10 (toate sunt setări de aplicație sau de Theme editor, nu date de catalog). Singurele efecte colaterale: alt-urile pe 493/493 imagini de produs (deja reflectate în scorul de 48, sonda `imgsNoAlt` a rulat după fix) și eliminarea `maximum-scale=1.0` din viewport în tema de test (`theme-fixes/layout/theme.liquid` linia 15, pinch-zoom deblocat după publicare). Cu layout-ul „Bar” în Pandectes, sticky add-to-cart activat și H1 tematic pe hero (toate efort S) secțiunea ar urca la ~75/100.

### Ce funcționează

- Layout responsiv fără scroll orizontal la 390 px (`scrollWidth == innerWidth` pe toate cele 4 pagini, la 390 px și 1366 px); text lizibil (14 px minim pe mobil, 16 px desktop) și tap targets mari.
- Paginile de colecție randează H1-ul și noua descriere de colecție în banner (`/collections/creatina` arată „Creatina” + primul paragraf din copy-ul nou), deci textul cu cuvinte-cheie e vizibil fără scroll pe desktop.
- Pagina de produs: titlu, stele de rating, preț, badge-ul „Produs în Uniunea Europeană” și statusul de stoc sunt vizibile sub galerie; selectorul de variante e clar.
- Bara de anunțuri comunică livrarea gratuită ≥ 300 RON (în acord cu noul markup `shippingDetails` din tema de test).
- Meta viewport prezent (defectul `maximum-scale=1.0` e corectat în tema de test, de publicat).

### Constatări

#### VISUAL-01 — Bannerul de cookie-uri e un modal pe tot ecranul pe mobil și acoperă hero-ul pe desktop

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| High | PENDING (acțiune proprietar) | S | 0.95 |

**Dovezi:** capturile `scratchpad/visual/home-mobile.png`, `product-creapure-mobile.png`, `collection-creatina-mobile.png` și `home-desktop.png` (Playwright, fără consimțământ dat): dialogul Pandectes („Acest site web folosește cookie-uri…”, butoane Accept / Preferințe) acoperă 100 % din viewport-ul 390x844 și ~30 % din centrul hero-ului la 1366x900; niciun conținut nu e lizibil până nu acționează vizitatorul. Context din tema live (`$R/theme/layout__theme.liquid`): `pandectes-rules.js` e primul element din `<head>`, încărcat sincron înainte de `<meta charset>`; tema de test mută charset/viewport pe primele poziții, dar layout-ul bannerului se configurează în aplicația Pandectes, nu în temă, deci rămâne neschimbat.

**Impact / pagini afectate:** toate paginile, la fiecare primă vizită (mobil ≈ 70 % din trafic în această verticală). H1-ul, CTA-ul hero „Vezi produse” și primele produse sunt ascunse; dialogul devine elementul LCP; ghidul Google pentru interstițiale intruzive tolerează bannerele legale de consimțământ, dar un modal full-screen pe mobil intră în categoria conținutului greu accesibil și crește bounce-ul.

**Recomandare:** nimic nu a putut fi pregătit (setare de aplicație, fără acces prin Admin API sau temă). În Pandectes → Banner → Layout alegeți „Bar” sau „Box bottom-left” (bottom sheet / bară compactă), păstrați butoanele Accept / Reject egale ca pondere, amânați scripturile neesențiale (Clarity, Facebook, TikTok, Pinterest, themarketer) până la consimțământ și lăsați H1-ul și CTA-ul hero neacoperite.

**Cum verificăm (falsificabilitate):** o captură mobilă a `/` la prima vizită (profil nou, fără cookie) arată H1-ul și CTA-ul „Vezi produse” fără a închide bannerul; dacă dialogul încă acoperă viewport-ul, fix-ul a eșuat.

**Indicator timpuriu:** bounce rate mobil pe paginile de intrare și elementul LCP raportat în CrUX (ar trebui să redevină imaginea hero, nu dialogul).

#### VISUAL-02 — Pagina de produs pe mobil nu are CTA „Adaugă în coș” above the fold

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Medium | OPEN | S | 0.9 |

**Dovezi:** sonda DOM pe `/products/creatina-creapure` la 390x844: `ctaAboveFold = []` (pe desktop „Adaugă în coș” e vizibil, `product-creapure-desktop.png`). Galeria ocupă primii 530 px, urmată de rating, preț, badge-uri și selectorul de variante; butonul apare doar după scroll. În tema live bara sticky există deja, dar e condiționată de o setare dezactivată — `$R/theme/sections__main-product.liquid` linia 63:

```liquid
{%- if section.settings.show_fixed_add_to_cart and product.available and buy_buttons_block != blank -%}
  <product-rerender id="{{ product_form_id }}-sticky-bar" observe-form="{{ product_form_id }}">
```

iar `templates__product.json` are `"mobile_media_size": "expanded"` (galeria la înălțime maximă pe mobil).

**Impact / pagini afectate:** toate cele 185 de pagini de produs pe mobil (specialistul a probat una; template-ul `product.json` e comun), adică exact segmentul cu cea mai mare pondere de trafic.

**Recomandare:** activați bara sticky add-to-cart a temei Impact (Theme settings → Product page → „Show sticky add-to-cart”, setarea `show_fixed_add_to_cart` din secțiunea `main-product`), reduceți înălțimea galeriei pe mobil (setarea „Mobile media size” din `expanded` în varianta compactă / aspect ratio „short”) sau mutați blocul preț + buton deasupra badge-urilor în ordinea blocurilor din `templates/product.json`. Se poate face în tema de test „Impact – SEO fixes 2026-10-12” înainte de publicare, ca să plece într-un singur deploy.

**Cum verificăm (falsificabilitate):** captura mobilă la 390x844 a `/products/creatina-creapure` arată butonul „Adaugă în coș” (sau bara sticky) în primul viewport; sonda `ctaAboveFold` nu mai e goală.

**Indicator timpuriu:** rata de add-to-cart pe mobil (GA4 `add_to_cart` / sesiuni mobile pe paginile de produs).

#### VISUAL-03 — H1-ul homepage-ului e doar numele brandului; titlul vizibil nu e H1

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Medium | OPEN | S | 0.85 |

**Dovezi:** sonda `h1 = ["Prime Supplements"]`; în `$R/home.html` singurul H1 este logo-ul din header, `<h1 class="header__logo">`. Titlul vizibil „HARDCORE SPORTS NUTRITION” e un element non-H1 din hero: în `$R/theme/templates__index.json` prima secțiune e `slideshow`, iar primul slide are `"title": "Hardcore sports nutrition"`, `"subheading": "PRIME SUPPLEMENTS"`, `"heading_tag": "h0"` (în Impact `heading_tag` controlează doar mărimea vizuală, nu tag-ul semantic). Homepage-ul nu are niciun cuvânt-cheie românesc în H1; title tag-ul live e tot englezesc („Prime Supplements - Hardcore Sports Nutrition”) — tema de test adaugă override-ul de homepage pentru title/meta description, dar nu atinge H1-ul.

**Impact / pagini afectate:** homepage, pagina cu cea mai mare autoritate internă; fără H1 tematic, interogările „suplimente nutritive” / „suplimente sport” nu au niciun semnal în heading-ul principal, iar titlul vizibil rămâne un slogan englezesc.

**Recomandare:** faceți din heading-ul hero un H1 care să citească „Suplimente nutritive pentru sport: creatină, proteine, pre-workout” (brandul rămâne în logo și în title tag) și retrogradați „Prime Supplements” la kicker/subheading. În Impact asta înseamnă două retușuri în tema de test (fișierele `sections/header.liquid` și `sections/slideshow.liquid` nu erau în export, se editează în code editor): logo-ul randat ca `<div class="header__logo">` și pe `template.name == 'index'`, iar titlul primului slide ca `<h1>`; textul slide-ului se schimbă apoi din Theme editor, fără cod.

**Cum verificăm (falsificabilitate):** `document.querySelector('h1').innerText` conține „Suplimente”; `grep -c '<h1' home.html` rămâne 1.

**Indicator timpuriu:** (nespecificat de specialist; propus) impresii și CTR în GSC pentru interogările non-brand ale homepage-ului („suplimente nutritive”, „suplimente sport”) după recrawl.

#### VISUAL-04 — 24 de imagini de pe homepage se randează fără alt (imagini de temă/secțiuni)

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Low | OPEN | S | 0.9 |

**Dovezi:** sonda `imgsNoAlt = 24 of 127` pe `/`, rulată după aplicarea alt-urilor pe imaginile de produs (493/493 live, plan `applied/alt-text-plan.json`) — imaginile de produs au acum alt; cele 24 rămase sunt hero/banner/imagini de secțiune și variante de logo configurate în secțiunile temei (aceleași active pe care secțiunea 6 le tratează în IMAGES-02/03: hero, logo, tile-uri de categorie și bannerele de colecție cu `alt=""`).

**Impact / pagini afectate:** homepage (24/127 imagini); logo-ul și tile-urile se repetă pe toate paginile prin header/footer, deci lipsa alt-ului pe logo se propagă site-wide.

**Recomandare:** în Theme editor, la fiecare image picker (slide-urile hero, tile-urile de categorie, bannerul „Despre noi”) completați alt-ul — în Shopify valoarea se salvează pe fișier, deci aceeași editare se poate face și din Content → Files → Alt text; pictogramele de plată sunt decorative, `alt=""` e corect acolo; logo-ul trebuie să citească „Prime Supplements”.

**Cum verificăm (falsificabilitate):** (nespecificat de specialist) re-rularea sondei pe `/` după modificări: `imgsNoAlt` scade de la 24 la numărul pictogramelor decorative; `grep -c 'alt=""'` pe HTML-ul homepage-ului confirmă aceeași cifră.

**Indicator timpuriu:** (propus) impresii Google Images pentru interogările de brand în GSC (Search type: Image).

#### VISUAL-05 — Widgetul WhatsApp flotant acoperă cardurile de produs pe mobil

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Low | PENDING (acțiune proprietar) | S | 0.8 |

**Dovezi:** `home-mobile.png`, `collection-creatina-mobile.png`: bula verde acoperă cardul de produs din dreapta-jos și zona controlului „Filtrează și sortează”. Widgetul e aplicația Dondy (`dondy-whatsapp-chat-widget-100/assets/ChatBubble.js`, ~64 KB în HTML-ul homepage-ului).

**Impact / pagini afectate:** homepage și paginile de colecție pe mobil (23 de colecții); al doilea card din fiecare rând de produse și bara de filtrare sunt parțial acoperite, deci exact zona de interacțiune cu lista de produse.

**Recomandare:** setare în aplicația Dondy, nu în temă (nimic pregătit): reduceți dimensiunea bulei pe mobil sau adăugați un offset de jos deasupra barei sticky de filtrare; ascundeți widgetul pe paginile cart/checkout.

**Cum verificăm (falsificabilitate):** (nespecificat de specialist) captura mobilă a `/collections/creatina` arată bara „Filtrează și sortează” și cardul din dreapta-jos neacoperite.

**Indicator timpuriu:** (propus) clicuri pe cardurile de produs și utilizarea filtrului pe mobil (GA4 `select_item` pe colecții) față de deschiderile chat-ului.

### Ce nu am putut măsura

- **Layout-ul după consimțământ** — capturile au fost făcute fără interacțiune cu bannerul; ce se vede după „Accept” nu a fost capturat.
- **Device real și metrici de laborator (LCP/CLS/INP)** — fără cotă Chrome DevTools Protocol / PageSpeed Insights / CrUX în sandbox; constatările sunt structurale (ce e vizibil în primul viewport), nu metrice.
- **Eșantion** — 4 pagini (`/`, `/collections/creatina`, `/products/creatina-creapure`, `/blogs/news/ce-este-un-pre-workout-fara-cofeina`) pe 2 viewport-uri; celelalte template-uri (blog index, pagini CMS, cart) nu au fost capturate și sunt extrapolate din template-urile comune.
