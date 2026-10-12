## 13. SEO local

**Scor specialist (la momentul auditului):** 26/100 — un singur specialist (seo-local): magazinul este un retailer exclusiv online cu sediu social pe o stradă rezidențială din Cisnădie (fără ridicare personală, fără showroom; Admin: singura locație are adresa `null` și `localPickupSettingsV2: null`; T&C: livrare doar prin curier, doar în România), deci nu este eligibil pentru Google Business Profile (0/25 pe dimensiunea GBP) și local pack-ul nu este un obiectiv; punctajul scăzut vine din igiena entității — Organization fără adresă/telefon și cu `sameAs` către un TikTok străin (schemă locală 2/10), NAP scris în 6 forme de nume / 4 de adresă / 3 de telefon (consistență 5/15), 63 de recenzii Judge.me pe 7 suplimente eșantionate, dar neexpuse în JSON-LD (recenzii 8/20), pagina de contact fără H1/program (on-page local 10/20), zero semnale locale de autoritate (1/10). **Scor combinat: 26/100** (un singur specialist alimentează secțiunea).

**Scor estimat după remedierile din 12.10.2026:** 27/100 pe magazinul live — în perimetrul local s-a schimbat doar meta description-ul paginilor (metafield-urile `global.title_tag` + `global.description_tag` scrise pe toate cele 11 pagini, inclusiv /pages/contact și /pages/despre-noi); footer-ul (adresa legată de /cart), cele 6 pagini legale, profilul magazinului din Shopify și magazinul B2B sunt neatinse. Tema de test nepublicată „Impact – SEO fixes 2026-10-12” (id 193875083639) rezolvă LOCAL-01/02/09/10 și partea de JSON-LD din LOCAL-07 (`theme-fixes/snippets/schema-organization.liquid`: Organization/OnlineStore cu legalName, taxID, telefon E.164, e-mail, PostalAddress Cisnădie/Sibiu/RO, areaServed RO, `availableLanguage: ["ro"]`, `foundingDate: "2022"`, sameAs identic cu footer-ul + YouTube; `schema-product-enhanced.liquid`: `aggregateRating` din metafield-urile `reviews.rating`) — după publicare estimăm ~41/100, iar după acțiunile proprietarului (footer fără link spre /cart, NAP canonic pe paginile legale și contact, profil de magazin complet, pagină publică Judge.me, B2B) ~58/100; plafonul realist fără GBP rămâne ~75/100.

### Ce funcționează

- NAP-ul (denumire legală, CUI, număr Reg. Com., telefon, e-mail, adresă stradală) este prezent în footer-ul fiecărui tip de pagină verificat (34/34 copii, inclusiv produse, colecții, articole, pagini legale și duplicatele /ro-hu/) și de două ori pe /pages/contact.
- Telefonul și e-mailul sunt link-uri reale pe fiecare pagină: `<a href="tel:0775286584">` și `<a href="mailto:contact@primesupplements.ro">` (click-to-call funcționează pe mobil).
- Adresa și datele firmei corespund înregistrării oficiale ANAF (stradă, număr, localitate, județ, CUI, J32/1155/2022 = J2022001155327): nu există nicio adresă *greșită* pe site, doar formatări incomplete/variante.
- Programul de suport este declarat pe homepage („Luni până Vineri: 8:00 - 18:00, timp mediu de răspuns 1h”) și există un formular de contact pe /pages/contact.
- Un link `https://anpc.ro/` de protecția consumatorului este în footer-ul fiecărei pagini; paginile T&C și Retur fac referire la ANPC și la formularul de retragere în 14 zile cu identitatea legală completă.
- Judge.me este instalat și numărul de recenzii este randat server-side pe paginile de suplimente (creatina-creapure 17, pure-isolate 13, turmeric 14, unt-de-migdale 7, glycerol 6, baton-proteic-capsuni 4, creatina-mono 2 = 63 de recenzii pe 7 suplimente eșantionate).
- Organization JSON-LD are un `@id` stabil (https://primesupplements.ro/#organization), logo și `sameAs`, deci corecțiile de mai jos sunt aditive, nu o rescriere.
- Nicio funcție GBP retrasă nu este referențiată (`gbp_deprecation_lint.py` pe contact + home: 0 constatări).

### Constatări

#### LOCAL-01 — Schema Organization nu conține adresă, telefon, e-mail, legalName sau cod de TVA pe niciunul dintre cele ~1 150 de URL-uri

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| High | READY (tema de test – de publicat) | S | 0.95 |

**Dovezi:** `$R/theme/snippets__schema-organization.liquid` (randat în `<head>` de `layout/theme.liquid` pe fiecare pagină; copii identice în `$R/jsonld/home-0.jsonld`, `product-*-0.jsonld`, `collection-pudra-0.jsonld`, `article-bcaa-0.jsonld`) conține doar `name`, `url`, `logo`, `description`, `foundingDate`, `sameAs` și un `contactPoint` cu `contactType` + `availableLanguage`. `grep` pe snippet după `telephone|email|address|legalName|vatID|taxID|hoursAvailable|areaServed` returnează doar linia 19 (`availableLanguage`). În toate cele 34 de copii randate: `PostalAddress` = 0, `"telephone"` = 0, `LocalBusiness` = 0, `Store` = 0. Aceleași date sunt tipărite ca text simplu în footer-ul fiecărei pagini („PRIME SPORT SUPPLEMENTS SRL / 46260823 ; J32/1155/2022 / 0775286584 / contact@primesupplements.ro / Cisnadie, Str. Ioan Virgil Ispas, Nr. 17A”), iar registrul le confirmă (ANAF: Str. Ioan Virgil Ispas 17A, Orș. Cisnădie, SIBIU, 555300, plătitor de TVA).

**Impact / pagini afectate:** fiecare URL indexabil (575 + 575 duplicate `/ro-hu/` din sitemap) plus magazinul B2B (fără niciun bloc Organization).

**Recomandare:** Verificare: `theme-fixes/snippets/schema-organization.liquid` din tema de test emite `"@type": ["Organization", "OnlineStore"]` cu `legalName "PRIME SPORT SUPPLEMENTS SRL"`, `taxID "46260823"`, `telephone "+40775286584"`, `email`, `PostalAddress` (Str. Ioan Virgil Ispas, Nr. 17A / Cisnădie / Sibiu / RO), `areaServed` și `contactPoint` cu telefon + e-mail; după publicare, Rich Results Test pe https://primesupplements.ro/ trebuie să arate entitatea Organization cu adresă și telefon. Rămân de adăugat în snippet-ul de test, față de propunerea specialistului de mai jos: `postalCode "555300"`, `vatID "RO46260823"`, `founder` (vezi LOCAL-12) și `hoursAvailable` (L–V 8:00–18:00); după completarea profilului magazinului (LOCAL-05) adresa poate fi citită din `shop.address.*` în loc de valorile hard-codate, ca să existe o singură sursă de adevăr. Nu folosiți LocalBusiness/Store — firma nu are sediu deschis clienților (LOCAL-11). Propunerea specialistului:

```liquid
{%- comment -%} snippets/schema-organization.liquid {%- endcomment -%}
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": ["Organization", "OnlineStore"],
  "@id": "{{ shop.url }}/#organization",
  "name": "{{ shop.name | escape }}",
  "legalName": "PRIME SPORT SUPPLEMENTS S.R.L.",
  "alternateName": ["Prime Sport Supplements", "PRIME SPORT SUPPLEMENTS SRL"],
  "url": "{{ shop.url }}",
  "logo": { "@type": "ImageObject", "url": "https://primesupplements.ro/cdn/shop/files/logo-prime-supplements.png", "width": 300, "height": 100 },
  "image": "https://primesupplements.ro/cdn/shop/files/logo-prime-supplements.png",
  "description": "{{ shop.description | default: 'Magazin online de suplimente sportive și îmbrăcăminte MNX din Cisnădie, Sibiu. Livrare în toată România.' | escape }}",
  "foundingDate": "2022-06-07",
  "founder": { "@type": "Person", "name": "Marius Chera", "sameAs": ["https://www.linkedin.com/in/chera23"] },
  "vatID": "RO46260823",
  "taxID": "46260823",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "{{ shop.address.street | escape }}",
    "addressLocality": "{{ shop.address.city | escape }}",
    "addressRegion": "{{ shop.address.province | escape }}",
    "postalCode": "{{ shop.address.zip | escape }}",
    "addressCountry": "{{ shop.address.country_code }}"
  },
  "telephone": "{{ shop.phone | escape }}",
  "email": "contact@primesupplements.ro",
  "areaServed": { "@type": "Country", "name": "RO" },
  "contactPoint": [{
    "@type": "ContactPoint",
    "contactType": "customer service",
    "telephone": "{{ shop.phone | escape }}",
    "email": "contact@primesupplements.ro",
    "areaServed": "RO",
    "availableLanguage": ["ro"],
    "hoursAvailable": { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "08:00", "closes": "18:00" }
  }],
  "sameAs": [
    "https://www.facebook.com/primesupplementsro",
    "https://www.instagram.com/primesupplements_ro/",
    "https://www.tiktok.com/@primesupplements.ro",
    "https://www.youtube.com/@primesupplementsro"
  ]
}
</script>
```

Valori randate așteptate după LOCAL-05: streetAddress „Str. Ioan Virgil Ispas, Nr. 17A”, addressLocality „Cisnădie”, addressRegion „Sibiu”, postalCode „555300”, addressCountry „RO”, telephone „+40775286584”. Opțional, `hasMerchantReturnPolicy` la nivel de Organization (fereastră de retragere de 14 zile conform Politicii de retur; confirmați `returnFees` cu comerciantul înainte de publicare), ca politica să se aplice tuturor produselor.

**Cum verificăm (falsificabilitate):** după publicare, Rich Results Test pe https://primesupplements.ro/ arată o entitate Organization cu address, telephone, vatID; `curl -s https://primesupplements.ro/ | grep -c PostalAddress` returnează 1 (nu 0). Dacă returnează 0, tema publicată nu este cea de test.

**Indicator timpuriu:** rapoartele GSC de date structurate „Merchant listings”/„Organization” arată 0 erori; „Business information” din Google Merchant Center corespunde site-ului fără editări manuale; adresa și telefonul apar consistent în răspunsurile asistenților AI despre „Prime Supplements Cisnădie”.

#### LOCAL-02 — `sameAs` trimite Google la un cont TikTok greșit; handle-urile Facebook/Instagram din schemă diferă de cele din footer; YouTube lipsește

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| High | READY (tema de test – de publicat) | S | 0.9 |

**Dovezi:** `sameAs` din schemă = `facebook.com/primesupplements.ro`, `instagram.com/primesupplements.ro`, `tiktok.com/@primesupplements`. Link-urile sociale din footer, pe fiecare pagină = `facebook.com/primesupplementsro`, `instagram.com/primesupplements_ro/`, `tiktok.com/@primesupplements.ro`, `youtube.com/@primesupplementsro`. 0 din 3 URL-uri din schemă se potrivesc cu footer-ul. Verificare live (JSON încorporat în pagină): `@primesupplements` → `uniqueId: primesupplements`, `followerCount: 3`, `videoCount: 1`, signature gol (un cont străin/abandonat); `@primesupplements.ro` → `nickname: PrimeSupplements`, `followerCount: 4285`, `videoCount: 91`, signature „Suplimente de calitate destinate culturistilor si pasionatilor de fitness” (contul real al brandului). YouTube `@primesupplementsro` → 200, titlu „Prime Supplements - YouTube” (canal real, absent din sameAs). Facebook (login wall, 200) și Instagram (429) nu au putut fi rezolvate; ambele au o variantă `.ro` în schemă și o altă variantă în footer, deci cel mult una din fiecare pereche este corectă.

**Impact / pagini afectate:** toate URL-urile (blocul Organization este global); reconcilierea entității brandului în knowledge graph-ul Google și în motoarele de răspuns AI.

**Recomandare:** Verificare: `theme-fixes/snippets/schema-organization.liquid` are `sameAs` = exact cele patru URL-uri din footer (`facebook.com/primesupplementsro`, `instagram.com/primesupplements_ro/`, `tiktok.com/@primesupplements.ro`, `youtube.com/@primesupplementsro`). Rămâne, înainte de publicare: proprietarul deschide în browser ambele variante Facebook (`/primesupplements.ro` vs `/primesupplementsro`) și Instagram (`/primesupplements.ro` vs `/primesupplements_ro/`) și păstrează pe cea care afișează postările brandului — dacă varianta corectă este cea veche din schemă, se corectează footer-ul (Theme editor > Footer > rețele sociale) și snippet-ul în același timp. Opțional: sursarea listei din setările temei în loc de hard-codare: `{{ settings.social_facebook }}`, `{{ settings.social_instagram }}`, `{{ settings.social_tiktok }}`, `{{ settings.social_youtube }}` (Impact expune aceste id-uri de setări în config/settings_schema.json; confirmați cheile exacte acolo).

**Cum verificăm (falsificabilitate):** după publicare, `grep -o 'tiktok.com/@[a-z.]*' <(curl -s https://primesupplements.ro/)` returnează doar `@primesupplements.ro` (de două ori: schemă + footer). Orice apariție a `@primesupplements` fără `.ro` înseamnă că snippet-ul vechi este încă live.

**Indicator timpuriu:** knowledge panel-ul Google / SERP-ul de brand „Prime Supplements” afișează TikTok-ul cu 4 285 de urmăritori și canalul YouTube în rândul de rețele sociale.

#### LOCAL-03 — Adresa stradală din footer este un link către `https://www.primesupplements.ro/cart/#` pe fiecare pagină

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Medium | OPEN | S | 0.95 |

**Dovezi:** HTML-ul footer-ului (home.html, identic în toate cele 34 de copii): `<a href="https://www.primesupplements.ro/cart/#">Cisnadie, Str. Ioan Virgil Ispas, Nr. 17A</a>`. HEAD live: `https://www.primesupplements.ro/cart/` → 301 → `https://primesupplements.ro/cart`. Singurul element de adresă de pe site este deci un link intern către pagina coșului, prin host-ul www (un hop de redirect în plus), pe ~1 150 de URL-uri, cu adresa ca text de ancoră. Textul footer-ului este rich-text setat în secțiunea Footer a temei Impact (`sections/footer.liquid`, bloc `footer__block--text`), nu în fișierul Liquid — de aceea nu a fost atins de tema de test (`theme-fixes/sections/` conține doar `main-article.liquid`).

**Impact / pagini afectate:** toate paginile (footer); umflă și numărul de link-uri interne către /cart (URL interzis în robots.txt) cu unul pe pagină.

**Recomandare:** Theme editor > Footer > blocul text „Informatii de contact”: eliminați hyperlink-ul de pe adresă (sau legați-l la `/pages/contact`). Nu legați un pin Google Maps (nu există locație deschisă clienților). Scrieți adresa complet: „Str. Ioan Virgil Ispas nr. 17A, Cisnădie 555300, jud. Sibiu, România”. Fiind o setare de secțiune (`settings_data.json`), modificarea trebuie făcută pe tema care va fi publicată — tema de test „Impact – SEO fixes 2026-10-12” (Customize pe tema nepublicată) sau refăcută imediat după publicare, altfel se pierde la schimbarea temei.

**Cum verificăm (falsificabilitate):** `grep -c 'primesupplements.ro/cart/#' home.html` = 0 după modificare (pe o copie proaspătă a homepage-ului).

**Indicator timpuriu:** raportul GSC Links nu mai listează /cart printre paginile cu cele mai multe link-uri interne.

#### LOCAL-04 — NAP-ul este scris în șase forme pentru nume, patru pentru adresă și trei pentru telefon; o pagină legală numește o firmă care nu există

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Medium | OPEN | S | 0.95 |

**Dovezi** (sursă → string exact):
- Registrul ANAF (adevăr): „PRIME SPORT SUPPLEMENTS S.R.L.” / „JUD. SIBIU, ORŞ. CISNĂDIE, STR. IOAN VIRGIL ISPAS, NR.17A” / cod poștal 555300 / plătitor de TVA.
- Footer (toate paginile): „PRIME SPORT SUPPLEMENTS SRL” / „46260823 ; J32/1155/2022” / „0775286584” / „Cisnadie, Str. Ioan Virgil Ispas, Nr. 17A” (fără diacritice, fără județ, fără cod poștal, fără țară, CUI fără prefixul RO de TVA).
- /pages/contact, blocul „Informații contact”: fără nume de firmă; „Adresa: Cisnadie, Str. Ioan Virgil Ispas, Nr. 17A / Telefon: 0775286584”.
- politica-de-cookies: **„Prime Supplements S.R.L., cu sediul în Cisnădie, Str. Ioan Virgil Ispas, Nr. 17A”** — această denumire legală nu există în registru; telefon „0775 286 584”; „site-ul www.primesupplements.ro”.
- politica-de-plata, politica-de-livrare: „Telefon: 0775 286 584 / Adresă: Cisnădie, Str. Ioan Virgil Ispas, Nr. 17A / Website: www.primesupplements.ro” (host www, deși host-ul canonic este non-www).
- termeni-și-condiții, politica-de-confidentialitate, politica-de-retur: „PRIME SPORT SUPPLEMENTS S.R.L., cu sediul social în STR. IOAN VIRGIL ISPAS, NR.17A, Cisnădie, Sibiu” (județ prezent, fără cod poștal, fără telefon); T&C spune și „PRIME SUPPLEMENTS nu este responsabil”.
- despre-noi: „Marius Chera a conceput firma PRIME SUPPLEMENTS in anul 2022”.
- Schema Organization: name „Prime Supplements”, fără legalName (în tema de test: legalName „PRIME SPORT SUPPLEMENTS SRL”).
- Profilul Shopify: telefon „+40775286584”, zip 555300, province Sibiu, city „” (vezi LOCAL-05).
- Titlu/footer B2B: „PRIME SPORT SUPPLEMENTS SRL / 46260823” (vezi LOCAL-06).
Totaluri: forme de nume = 6 (Prime Supplements; PRIME SPORT SUPPLEMENTS SRL; PRIME SPORT SUPPLEMENTS S.R.L.; Prime Supplements S.R.L.; PRIME SUPPLEMENTS; PRIME SPORT SUPPLEMENTS SRL / 46260823); forme de adresă = 4; forme de telefon = 3 (0775286584, 0775 286 584, +40775286584); codul poștal 555300 apare pe 0 pagini publice; județul „Sibiu” pe 3 din 11 pagini și 0 în footer/contact. Remedierile din 12.10.2026 au scris doar metafield-urile SEO ale paginilor, nu corpurile lor.

**Impact / pagini afectate:** footer (toate paginile), /pages/contact, 6 pagini legale, schemă, magazin B2B.

**Recomandare:** adoptați un singur string NAP canonic și lipiți-l peste tot (rich-text-ul din footer, pagina de contact, paragraful „Contact” al celor 6 pagini legale — editabile în Admin > Online Store > Pages, schema Organization, footer-ul B2B): **„PRIME SPORT SUPPLEMENTS S.R.L. (Prime Supplements) · CUI RO46260823 · Reg. Com. J32/1155/2022 · Str. Ioan Virgil Ispas nr. 17A, Cisnădie 555300, jud. Sibiu, România · Tel. +40 775 286 584 · contact@primesupplements.ro”**. Corectați „Prime Supplements S.R.L.” din politica de cookies la denumirea legală reală. Înlocuiți „www.primesupplements.ro” cu „primesupplements.ro” în cele trei pagini de politici. Păstrați `tel:+40775286584` ca țintă a link-ului (E.164) și afișați „+40 775 286 584”. Partea de schemă este deja aliniată în tema de test (legalName + telefon E.164); restul sunt editări de conținut, fără cod.

**Cum verificăm (falsificabilitate):** `grep -ril "Prime Supplements S.R.L." $R/shopify/pages.json` nu returnează nimic (pe un export nou al paginilor); `grep -c 555300` pe pagina de contact live > 0; cele trei ortografii ale telefonului se reduc la una singură în pages.json + footer.

**Indicator timpuriu:** asistenții AI și „About this result”/datele de knowledge ale Google returnează denumirea legală și adresa completă fără variante; verificarea „Business information” din Merchant Center trece din prima încercare.

#### LOCAL-05 — Adresa din profilul magazinului Shopify este incompletă (oraș gol, stradă fără număr), iar locația de fulfilment nu are nicio adresă

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Medium | OPEN | S | 0.95 |

**Dovezi:** Admin GraphQL `shop.billingAddress` = `{ address1: "Strada Ioan Virgil Ispas", address2: "", city: "", province: "Sibiu", provinceCode: "SB", zip: "555300", country: "Romania", phone: "+40775286584", company: null, latitude: 45.7680655, longitude: 24.1484982 }`. `locations.nodes[0]` = `{ name: "Shop location", isActive: true, fulfillsOnlineOrders: true, address: { address1: null, city: null, zip: null, phone: null, latitude: null, longitude: null, country: "Romania" }, localPickupSettingsV2: null }`. `get-shop-info`: nume magazin „Prime Supplements”, e-mail de contact contact@primesupplements.ro, e-mail de cont o adresă personală outlook.com. Remedierile din 12.10.2026 nu au atins Settings > General / Locations (remediation-status.md nu le listează) — de aceea snippet-ul Organization din tema de test folosește adresa hard-codată.

**Impact / pagini afectate:** tot ce citește profilul magazinului — e-mailurile de confirmare a comenzii și facturile, cardul de comerciant din Shop app, Google & YouTube channel / informațiile de business din Merchant Center, calculul tarifelor de livrare (locație de origine fără adresă), orice output Liquid viitor `{{ shop.address }}` (sursa recomandată pentru LOCAL-01).

**Recomandare:** Settings > General > Store details: address1 „Str. Ioan Virgil Ispas, Nr. 17A”, city „Cisnădie”, zip 555300, province Sibiu, company „PRIME SPORT SUPPLEMENTS S.R.L.”. Settings > Locations > „Shop location”: aceeași adresă (redenumire „Depozit Cisnădie”), ca originea de fulfilment să fie geocodată; local pickup rămâne OFF dacă proprietarul nu vrea realmente să primească clienți (vezi LOCAL-11). Mutați e-mailul de cont pe o căsuță a firmei (igienă de notificări, nu SEO). Odată completat profilul, snippet-ul Organization poate trece de la valorile hard-codate la `shop.address.*`.

**Cum verificăm (falsificabilitate):** re-rularea aceleiași interogări GraphQL returnează un `city` nevid pentru shop și `address1/zip` non-null pentru locație.

**Indicator timpuriu:** Merchant Center nu afișează avertismente „business address”; tarifele de livrare nu mai cad pe originea la nivel de țară.

#### LOCAL-06 — Magazinul B2B indexabil prezintă o altă entitate: nume legal + CUI drept brand, fără adresă/telefon, link-uri sociale către conturile Shopify

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Medium | PENDING (acțiune proprietar) | S | 0.9 |

**Dovezi:** `$R/pages/b2b.html` `<title>` = „PRIME SPORT SUPPLEMENTS SRL / 46260823”; footer „© 2026 PRIME SPORT SUPPLEMENTS SRL / 46260823, Susținut de Shopify”; numărători: Ispas = 0, 0775286584 = 0, `tel:`/`mailto:` = 0 pe b2b.html și b2b-product.html. Link-uri sociale pe b2b.html: `http://facebook.com/shopify`, `http://instagram.com/shopify`, `https://tiktok.com/@shopify`, `https://www.youtube.com/shopify`, `https://x.com/shopify` (valorile implicite placeholder ale temei, niciodată înlocuite). Magazinul B2B este crawlabil și indexabil, fără canonical către site-ul principal (fișierul de context). Este un magazin Shopify separat, cu Admin propriu, pe care automatizarea din 12.10.2026 nu l-a atins; remediation-status.md îl listează la „acțiune proprietar” (noindex/parolă).

**Impact / pagini afectate:** b2b.primesupplements.ro (58 URL-uri de produs + pagini), consolidarea entității brandului între cele două domenii.

**Recomandare:** în Admin-ul magazinului B2B: numele magazinului „Prime Supplements B2B”; NAP-ul canonic (LOCAL-04) în footer cu link-uri `tel:`/`mailto:`; înlocuirea celor cinci URL-uri sociale placeholder cu handle-urile reale (sau eliminarea lor); un bloc Organization al cărui `@id` este cel al site-ului principal, `https://primesupplements.ro/#organization`, cu `parentOrganization`/`url` către domeniul principal, ca ambele magazine să se rezolve într-o singură entitate. Dacă proprietarul alege varianta din secțiunea tehnică (parolă pe magazinul B2B sau noindex), entitatea B2B dispare din index și rămân relevante doar numele magazinului și footer-ul (vizibile distribuitorilor autentificați). (Tratamentul index/canonical al duplicatelor B2B aparține constatărilor tehnice/e-commerce.)

**Cum verificăm (falsificabilitate):** `curl -s https://b2b.primesupplements.ro/ | grep -c 'facebook.com/shopify'` = 0; footer-ul B2B conține „555300”.

**Indicator timpuriu:** SERP-ul de brand pentru „prime sport supplements srl” afișează site-ul principal, nu entitatea placeholder B2B.

#### LOCAL-07 — Recenziile există doar în widget-ul Judge.me: niciun aggregateRating/Review în JSON-LD, o singură platformă, fără prezență Google/Trustpilot găsită

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Medium | READY (tema de test – de publicat) | S | 0.85 |

**Dovezi:** `data-number-of-reviews` randat server-side în HTML-ul produselor: creatina-creapure 17, pure-isolate-2000g 13, turmeric-extract-80-caps 14, unt-de-migdale 7, glycerol-max-pump 6, baton-proteic-capsuni 4, creatina-monohidrat 2; 0 pe toate cele 7 produse MNX eșantionate și pe instant-drink-frutilu; `data-average-rating="0.00"` peste tot (ratingul este injectat client-side). `aggregateRating` = 0 apariții în toate cele 16 copii de produs și în `snippets__schema-product-enhanced.liquid`; JSON-LD-ul rich-snippet propriu al Judge.me nu este în HTML (fișierul de context). Caruselul de pe homepage („Let customers speak for us”, netradus) randează `data-number-of-reviews="0"` server-side. Live: profilul Trustpilot blocat (403, pagină anti-bot; existența neverificabilă), pagina publică Judge.me 404 la `/reviews/stores/primesupplements.ro` și `/reviews/stores/primesupplements1` (pagina publică de recenzii nu este activată). Niciun link către recenzii Google sau altă platformă terță nicăieri pe site. Conform benchmark-ului din plugin, consumatorii consultă ~6 platforme și 74 % au încredere doar în recenzii din ultimele 3 luni; *recența* recenziilor nu poate fi evaluată din HTML static.

**Impact / pagini afectate:** 85 de produse suplimente (recenzii existente, neexpuse căutării), 100 de produse MNX (fără nicio recenzie), homepage.

**Recomandare:** Verificare: `theme-fixes/snippets/schema-product-enhanced.liquid` citește `product.metafields.reviews.rating.value` / `product.metafields.reviews.rating_count.value` (liniile 22–23) și emite `aggregateRating` cu `ratingValue`, `bestRating`, `worstRating`, `ratingCount` doar când `rating_count > 0` (liniile 50–57); testul offline `theme-fixes/test_render.py` cere `ratingCount == 17` pe creatina-creapure și absența blocului pe un produs fără recenzii. După publicare: Rich Results Test pe /products/creatina-creapure → Product cu aggregateRating (17 recenzii), fără eroare de parsare. Rămân setări de aplicație (proprietar): (1) opțiunea „Rich snippets / structured data” din Judge.me > Settings > SEO poate rămâne dezactivată — ratingul vine deja din metafield-uri și activarea ei ar produce două blocuri Product; dacă se activează, verificați că Rich Results Test vede un singur Product; (2) activați pagina publică de recenzii Judge.me și badge-ul „All reviews” din header, ca cele 60+ recenzii să fie vizibile pe tot site-ul; (3) traduceți titlul caruselului via Judge.me > Widgets > Text; (4) a doua platformă e opțională pentru un magazin exclusiv online — dacă se adaugă una, preferați Trustpilot (indexabil, citat de asistenții AI) în locul unui GBP pentru care firma nu e eligibilă; (5) nu condiționați niciodată recenziile (politica Google privind engagement-ul fals).

**Cum verificăm (falsificabilitate):** Rich Results Test pe /products/creatina-creapure arată un Product cu aggregateRating (17 recenzii) și fără eroare de parsare.

**Indicator timpuriu:** raportul GSC „Review snippets” > 0 elemente valide; stele vizibile în SERP-urile de produs în 2–4 săptămâni.

#### LOCAL-08 — Pagina de contact nu are H1, meta description, program, identitate a firmei și context de livrare/hartă; programul de suport există doar într-un acordeon FAQ pe homepage

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Low | OPEN | S | 0.9 |

**Dovezi:** `$R/parsed/pages_page-contact.json`: title „Contact”, meta_description null, h1 [], h2 [], word_count 221; canonical https://primesupplements.ro/pages/contact; duplicat la https://primesupplements.ro/ro-hu/pages/contact (ambele în sitemap). Blocul vizibil: „Contacteaza-ne / Ai întrebări? / Informații contact / Adresa: Cisnadie, Str. Ioan Virgil Ispas, Nr. 17A / Telefon: 0775286584 / Email: contact@primesupplements.ro” + formular; iframes = 0, link-uri Google Maps = 0, program = 0 (numărul de apariții „Luni pânã Vineri” pe pagina de contact = 0). String-ul cu programul există doar în `templates__index.json` linia 1047 `"support_hours": "Serviciul nostru de relații cu clienții este disponibil de Luni pânã Vineri: 8:00 - 18:00"` (randat pe home.html și homepage-ro-hu.html). Despre-noi nu are nici ea meta description și H1 (fișierul de context). Actualizare 12.10.2026: metafield-urile `global.title_tag` + `global.description_tag` au fost scrise pe toate cele 11 pagini, inclusiv contact și despre-noi (remediation-status.md) — partea de meta description este rezolvată pe live; H1, programul, identitatea firmei și blocul NAP rămân deschise, pentru că pagina are corp CMS gol și este construită din secțiuni de temă.

**Impact / pagini afectate:** /pages/contact (+ copia /ro-hu/), /pages/despre-noi.

**Recomandare:** pagina de contact (Theme editor, template-ul page.contact): H1 „Contact Prime Supplements”; meta description propusă de specialist, dacă cea scrisă pe 12.10 nu o acoperă: „Contactează Prime Supplements (PRIME SPORT SUPPLEMENTS S.R.L., Cisnădie, Sibiu): telefon +40 775 286 584, e-mail contact@primesupplements.ro, luni-vineri 8:00-18:00. Livrare în toată România.” (sub 155 de caractere); adăugați blocul NAP canonic (LOCAL-04) cu denumirea legală și CUI, programul de suport și linia cu timpul de răspuns copiate din FAQ-ul de pe homepage, aria de livrare („livrăm doar în România, prin curier”) și link-urile de retur/ANPC. Nu încorporați o hartă: adresa este sediu social, o hartă invită vizite pe care firma nu le deservește. Fără markup LocalBusiness; blocul Organization (LOCAL-01) acoperă entitatea.

**Cum verificăm (falsificabilitate):** parse_html.py pe pagina de contact live returnează h1 și meta_description nevide, iar textul conține „8:00 - 18:00”.

**Indicator timpuriu:** cresc impresiile/CTR în GSC pentru interogările „prime supplements contact|telefon”; mai puține întrebări „unde sunteți” pe chat/e-mail.

#### LOCAL-09 — `foundingDate` „2020” din Organization contrazice registrul (2022-06-07) și pagina Despre noi („in anul 2022”)

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Low | READY (tema de test – de publicat) | S | 0.9 |

**Dovezi:** linia din snippet `"foundingDate": "2020"`; ANAF `data_inregistrare: 2022-06-07`, `nrRegCom: J2022001155327` (= J32/1155/2022, cum este tipărit în footer); textul despre-noi „Marius Chera a conceput firma PRIME SUPPLEMENTS in anul 2022”.

**Impact / pagini afectate:** blocul Organization de pe fiecare pagină.

**Recomandare:** Verificare: tema de test emite `"foundingDate": "2022"` (`theme-fixes/snippets/schema-organization.liquid`), consistent cu pagina Despre noi. Specialistul propune data completă `"foundingDate": "2022-06-07"` (înregistrarea la ONRC) — o schimbare de un rând, dacă proprietarul vrea precizia maximă; dacă brandul precede firma și se dorește data brandului, atunci și pagina Despre noi trebuie să spună același lucru, ca pagina și schema să fie de acord.

**Cum verificăm (falsificabilitate):** JSON-LD-ul live și pagina Despre noi afirmă același an.

**Indicator timpuriu:** niciunul direct; doar verificare de consistență.

#### LOCAL-10 — `contactPoint.availableLanguage` declară suport în maghiară și nu există `areaServed`, deși site-ul nu are locale maghiar publicat și livrează doar în România

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Low | READY (tema de test – de publicat) | S | 0.85 |

**Dovezi:** linia 19 din snippet `"availableLanguage": ["Romanian", "Hungarian"]`; fișierul de context: locale-ul maghiar există, dar este NEPUBLICAT, piața /ro-hu/ servește conținut românesc în RON; T&C: „Livrarea Produselor se poate efectua doar pe teritoriul României”. Niciun `areaServed` nicăieri în schemă.

**Impact / pagini afectate:** blocul Organization de pe fiecare pagină; configurația pieței/hreflang (aparține constatărilor tehnice/internaționale).

**Recomandare:** Verificare: tema de test emite `"availableLanguage": ["ro"]` (cod BCP-47, nu cuvântul englezesc), `"areaServed": { "@type": "Country", "name": "RO" }` la nivel de Organization și `"areaServed": "RO"` pe ContactPoint. Rămâne (proprietar): alinierea configurației de piață cu T&C — ștergerea web presence-ului „Ungaria” (`gid://shopify/MarketWebPresence/73400189303`, `webPresenceDelete` validat, neexecutat) sau amendarea clauzei de livrare. Dacă vreodată se publică un locale maghiar cu suport real, se adaugă `"hu"` în listă — nu înainte.

**Cum verificăm (falsificabilitate):** JSON-LD-ul live arată `availableLanguage: ["ro"]` și `areaServed`.

**Indicator timpuriu:** niciunul; previne o afirmație inconsistentă despre entitate.

#### LOCAL-11 — Niciun semnal Google Business Profile / Bing Places / Apple pe site, iar firma nu este eligibilă pentru ele ca magazin exclusiv online: nu creați o fișă

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Info | OPEN | S | 0.8 |

**Dovezi:** 0 hărți încorporate, 0 place ID-uri, 0 link-uri GBP, 0 widget-uri de recenzii Google în toate cele 34 de copii; fără program pentru o locație fizică; Admin: o singură locație cu adresă null și `localPickupSettingsV2: null`; T&C: livrare doar prin curier; ANAF CAEN 4638 (comerț cu ridicata). Ghidul Google Business Profile cere contact în persoană cu clienții la adresa listată sau la locația lor, în orele declarate; o fișă pentru un sediu social rezidențial fără vizite încalcă politica și riscă suspendarea (fișele duplicate/neeligibile sunt factorul negativ #2 în tabelul Whitespark 2026 din plugin). Existența unui GBP deja creat nu a putut fi verificată (fără WebSearch; Google Maps inaccesibil din sandbox).

**Impact / pagini afectate:** întreaga afacere; și magazinul B2B.

**Recomandare:** (a) dacă există deja un GBP pentru adresa din Cisnădie, fie îl faceți legitim eligibil (activați local pickup la locația Cisnădie, cu program real și personal, și abia apoi adăugați `openingHoursSpecification` și o hartă), fie îl închideți; (b) altfel, investiți bugetul „local” în Google Merchant Center (free listings + tab-ul Shopping, suprafața cu intenție locală pentru un magazin online din România), în blocul Organization (LOCAL-01) și în datele structurate de recenzii (LOCAL-07). Bing Places și Apple Business au aceeași regulă de eligibilitate; săriți-le. Dacă proprietarul deschide vreodată un showroom sau punct de ridicare, reveniți cu un subtip `Store` într-un nod LocalBusiness separat, legat prin `parentOrganization` de `#organization` — nu înainte.

**Cum verificăm (falsificabilitate):** proprietarul confirmă dacă există un GBP; dacă da, verificăm că are serviciu în persoană activat; dacă nu, nicio acțiune.

**Indicator timpuriu:** rata de aprobare a produselor în Merchant Center și clicurile pe „free listings”, nu impresiile din local pack.

#### LOCAL-12 — Niciun semnal local de autoritate/citare dincolo de registrul statutar; entitatea fondatorului nu este legată; lint-ul GBP deprecat este curat

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Info | OPEN | S | 0.8 |

**Dovezi:** 0 din 355 de corpuri de articol menționează „Sibiu” sau „Cisnădie”; 0 mențiuni de camere de comerț, presă locală, sponsorizări sau evenimente locale pe home/despre-noi/articole; singura referință externă de autoritate este `https://anpc.ro/` din footer. Fondatorul Marius Chera este numit pe despre-noi și ca autor în 335 de articole, cu `www.linkedin.com/in/chera23` citat în 337 de articole, dar nu există nicio relație `founder`/`Person` în blocul Organization — nici în snippet-ul din tema de test (`grep founder theme-fixes/snippets/schema-organization.liquid` → nimic). `gbp_deprecation_lint.py` pe contact + home: `"findings": []`.

**Impact / pagini afectate:** legătura entitate/E-E-A-T (se suprapune cu constatările de conținut și GEO, nu este duplicată aici).

**Recomandare:** adăugați `founder` în snippet-ul din tema de test înainte de publicare — un singur rând, preluat din propunerea LOCAL-01:

```json
"founder": { "@type": "Person", "name": "Marius Chera", "sameAs": ["https://www.linkedin.com/in/chera23"] },
```

și legați despre-noi de bio-ul autorului. Citările locale nu merită construite pentru un magazin exclusiv online — listarea din registru (datele ANAF/ONRC sunt sindicalizate automat de listafirme.ro, termene.ro, risco.ro) este suficientă și deja concordă cu site-ul. Presa locală/sponsorizările (săli din Sibiu, competiții — Marius Chera este poziționat ca antrenor de culturism) doar ca parte din digital PR, nu ca tactică de local pack.

**Cum verificăm (falsificabilitate):** n/a (informativ); după adăugare, `curl -s https://primesupplements.ro/ | grep -c '"founder"'` returnează 1.

**Indicator timpuriu:** co-mențiuni nume de brand + nume de fondator în răspunsurile AI.

#### LOCAL-13 — Link-uri pentru litigii de consum: doar un link generic `https://anpc.ro/` în footer; pagina ANPC SAL nu este legată

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Info | OPEN | S | 0.6 |

**Dovezi:** link-urile din footer pe home.html: exact un `href="https://anpc.ro/"`; niciun link către pagina ANPC SAL (soluționarea alternativă a litigiilor); textul T&C: „vă puteți adresa și Autorității Naționale pentru Protecția Consumatorilor (ANPC) ... la adresele indicate pe ...”. (Platforma EU ODR a fost închisă în iulie 2025, deci vechiul link ODR nu mai este așteptat; verificați ghidul ANPC curent înainte de modificare.)

**Impact / pagini afectate:** footer-ul de pe toate paginile; doar semnal de încredere/conformitate, fără efect de ranking.

**Recomandare:** legați pagina ANPC SAL (https://anpc.ro/ce-este-sal/) lângă link-ul ANPC existent, cu pictograma oficială, conform practicii e-commerce din România (Theme editor > Footer, același bloc de text ca LOCAL-03, pe tema care se publică); păstrați ambele link-uri fără `rel="nofollow"` (sunt statutare, nu sponsorizate).

**Cum verificăm (falsificabilitate):** footer-ul conține un link al cărui href conține „anpc.ro/ce-este-sal”.

**Indicator timpuriu:** niciunul.

### Ce nu am putut măsura

- Fără WebSearch/DataForSEO în rularea specialistului: nu s-a putut confirma dacă există deja un Google Business Profile, Bing Places sau fișă Apple pentru „Prime Supplements” / „Prime Sport Supplements SRL”, nici numărul/ratingul recenziilor Google, nici poziții geo-grid/local pack (irelevante pentru un magazin exclusiv online, dar neverificate).
- Trustpilot a răspuns 403 (pagină anti-bot „Verifying Connection”) — prezența sau absența unui profil Trustpilot este necunoscută. Instagram (429) și Facebook (login wall) nu au putut confirma care dintre cele două variante de handle este activă; TikTok și YouTube au fost verificate.
- Ratingurile Judge.me sunt injectate client-side; din HTML-ul static s-a putut citi doar numărul de recenzii (nu mediile de stele sau recența).
- Recența/viteza recenziilor, răspunsurile proprietarului și sentimentul nu au putut fi evaluate fără randare (niciun headless browser în rulările specialistului — Playwright nu poate valida TLS-ul proxy-ului din sandbox) și fără API-ul Judge.me.
- Datele Shopify Admin au fost doar citite (shop, locations); nicio setare nu a fost modificată de specialist. Textul footer-ului și handle-urile sociale sunt setări de secțiune ale temei (`settings_data.json` nu era în setul de dovezi), de aceea recomandările trimit la Theme editor, nu la fișiere Liquid.
- Scripturile de fetch ale plugin-ului (render_page.py, fetch_page.py) nu rulează în acest sandbox (politica de proxy „Refusing configured HTTP proxy”); toată analiza paginilor a folosit copiile locale plus 12 cereri curl throttled către host-uri externe (ANAF, TikTok, YouTube, Judge.me, Trustpilot, Instagram, Facebook, HEAD pe link-ul /cart/ din footer).
