## 9. Internațional / Shopify Markets (/ro-hu, B2B)

**Scor specialist (la momentul auditului):** 30/100 — un singur specialist (international): singura configurație internațională a magazinului (piața „Ungaria” cu web presence `/ro-hu`) nu livrează nicio localizare (același text românesc, aceeași monedă RON, pagini legale doar pentru România), dar dublează site-ul crawlabil la 1 151 URL-uri, afișează pe arborele duplicat prețuri fără TVA cu 17,36 % mai mici și contrazice propriile condiții de livrare; scorul stă peste podea doar pentru că hreflang-ul este tehnic valid (mesh complet, x-default, coduri `ro`/`ro-HU` corecte, aliniat cu canonical), `html lang` și `content-language` sunt corecte, iar locale-ul `hu` nepublicat nu scapă în public. **Scor combinat: 30/100** (un singur specialist alimentează secțiunea).

**Scor estimat după remedierile din 12.10.2026:** 32/100 — pe magazinul live nimic nu s-a schimbat în această zonă: ștergerea web presence-ului `gid://shopify/MarketWebPresence/73400189303` (arborele `/ro-hu/`) a fost validată prin `webPresenceDelete`, dar nu executată, fiind o schimbare de setări de vânzare care aparține proprietarului; tema de test „Impact – SEO fixes 2026-10-12” (id 193875083639) aduce doar `"inLanguage": "ro"` în Article/CollectionPage/WebSite și un titlu românesc pe homepage. După ștergerea `/ro-hu`, importul celor 575 redirecturi 1:1 și corectarea setării de TVA pe piețe estimăm ~70/100.

*Notă: magazinul B2B (b2b.primesupplements.ro, duplicat cross-domain cu aceleași handle-uri de produs, indexabil) nu a intrat în scopul specialistului international; constatarea este tratată în secțiunea tehnică, iar acțiunea (noindex/parolă pe celălalt magazin) rămâne la proprietar.*

### Ce funcționează

- Setul hreflang este tehnic bine format pe fiecare pagină eșantionată: tag self-referencing prezent, mesh complet de întoarcere (`x-default` → `/`, `ro` → `/`, `ro-HU` → `/ro-hu/...`), un singur `x-default`, coduri ISO valide (`ro` = română, `HU` = Ungaria), toate https, href-ul hreflang identic cu canonical-ul pe ambele variante (`$R/parsed/home.json`, `$R/parsed/pages_homepage-ro-hu.json`, `$R/parsed/pages_product.json`, `$S/intl/body_rohu_product.html`).
- O singură metodă de implementare (HTML `<link>` prin `content_for_header` al Shopify); sitemap-urile nu conțin `xhtml:link`, deci nu există conflict HTML/sitemap (`grep -c hreflang $R/sitemaps/*.xml` = 0 peste tot).
- `<html lang="ro" dir="ltr">` pe ambii arbori (theme.liquid linia 12 folosește `request.locale.iso_code`), iar header-ul `content-language` este `ro-RO` pe `/` și `ro-HU` pe `/ro-hu/...` — consecvent cu limba corpului.
- Locale-ul maghiar nepublicat nu scapă: `https://primesupplements.ro/hu` → HTTP 404 (`$S/intl/hdr_hu.txt`), `/ro-hu/sitemap.xml` → 404, deci nu există un al treilea arbore.
- Fără redirecturi după IP/Accept-Language și fără cloaking: `/` cu `Accept-Language: hu-HU` întoarce aceeași pagină `ro-RO`, `Shopify.country = "RO"` (`$S/intl/hdr_root_hu_al.txt`); flag-urile de „geolocation” Pandectes sunt toate `false`.
- Există o zonă de livrare Ungaria cu două metode Cargus active în profilul de livrare implicit, deci, dacă piața ar fi lansată vreodată corect, checkout-ul nu ar bloca adresele din Ungaria.

### Constatări

#### INTERNATIONAL-01 — Web presence-ul pieței „Ungaria” publică o a doua copie completă a site-ului sub /ro-hu/ (575 URL-uri duplicate cu conținut românesc identic, ambele self-canonical)

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| High | PENDING (acțiune proprietar) | S | 0.95 |

**Dovezi:** Admin API (`markets`): `Ungaria` (gid://shopify/Market/97830830455, handle `ungaria`, `enabled: true`, `primary: false`) are `webPresence` gid://shopify/MarketWebPresence/73400189303 cu `subfolderSuffix: "hu"`, `defaultLocale: ro`, `alternateLocales: []`, `rootUrls: [{locale: ro, url: https://primesupplements.ro/ro-hu/}]`, `currencySettings: null`; `shopLocales`: `hu` `published: false`, `ro` primar; `shop.enabledPresentmentCurrencies = ["RON"]`. Indexul sitemap live (`$S/intl/sitemap_index.xml`): 13 copii, 7 pentru rădăcină și 6 sub `/ro-hu/` (`/ro-hu/sitemap_products_1.xml`, `_pages_1`, `_collections_1`, `_blogs_1`, `_articles_1`, `_metaobject_pages_1`); child7 = 186 URL-uri (185 produse + `/ro-hu`), child8 = 11 pagini, child9 = 23 colecții, child10 = 1 blog, child11 = 354 articole → **575 URL-uri `/ro-hu` din 1 151 (49,96 %)**; cele 185 intrări `<image:loc>` sunt dublate (`$R/sitemaps/child1.xml` 185 vs `child7.xml` 185). Paritate de conținut: homepage 3 099 cuvinte pe ambele URL-uri, similaritate difflib **0,9856** (diferă doar cifre de preț și eticheta `România`→`Ungaria`; `$R/home.html` vs `$R/pages/homepage-ro-hu.html`); `/products/creatina-creapure` vs `/ro-hu/products/creatina-creapure`: 1 651 cuvinte pe ambele, similaritate **0,9955**, diferă doar prețurile (INTERNATIONAL-02); același `<title>`, aceeași meta description, aceleași H1/H2 și imagini. Ambele copii sunt self-canonical (`<link rel="canonical" href="https://primesupplements.ro/ro-hu/products/creatina-creapure">` pe duplicat). Arborele duplicat este complet auto-linkat: homepage-ul `/ro-hu` are 168 linkuri interne către `/ro-hu/...` și 0 către rădăcină, pagina de produs 75 vs 0; rădăcina leagă `/ro-hu` doar prin `<link>`-ul hreflang (1 apariție) și `<form method="post">` de localizare. `https://primesupplements.ro/ro-hu` și `/ro-hu/` răspund ambele HTTP 200, `content-language: ro-HU`, 630 865 bytes (`$S/intl/hdr_ro-hu.txt`, `hdr_ro-hu_.txt`).

**Impact / pagini afectate:** toate cele 575 URL-uri indexabile (185 produse, 23 colecții, 11 pagini, 1 index de blog, 354 articole, homepage) există de două ori; suprafață de crawl 1 151 în loc de 576 URL-uri; 185 imagini de produs listate dublu. Cu 98,6–99,6 % text identic, self-canonical pe ambele și `ro`/`x-default` către rădăcină, Google grupează fiecare pereche și alege de regulă URL-ul rădăcină: de așteptat 575 intrări „Duplicate, Google chose different canonical than user” în GSC, anotarea `ro-HU` eliminată de facto (un URL necanonic nu poate fi alternate hreflang), zero câștig în Ungaria, crawl dublat pe pagini de 630 KB în spatele provocărilor Cloudflare (429 după burst-uri), semnale de link diluate și riscul ca pentru unele perechi Google să aleagă `/ro-hu/`, cu preț cu 17 % mai mic.

**Recomandare:** `webPresenceDelete` pe `gid://shopify/MarketWebPresence/73400189303` a fost validat, dar nu executat — decizie de vânzare a proprietarului. Opțiunea (a), recomandată acum: (1) **Settings → Markets → Ungaria → Domains and languages → Manage** → elimină web presence-ul `primesupplements.ro/ro-hu` (treci piața pe domeniul principal fără subfolder sau șterge intrarea din lista **Settings → Markets → Domains and languages**); echivalentul API, documentat, neexecutat de audit:

```graphql
marketWebPresenceDelete(webPresenceId: "gid://shopify/MarketWebPresence/73400189303")
```

Dacă nu există intenția de a vinde în Ungaria: piața → `⋯` → **Deactivate market** (`marketUpdate` cu status INACTIVE); dezactivarea scoate `Ungaria` din `localization.available_countries`, deci selectorul temei Impact dispare automat (`sections__footer.liquid` linia 133: `localization.available_countries.size > 1`), pe când ștergerea doar a web presence-ului păstrează selectorul (INTERNATIONAL-05) și prețul fără TVA (INTERNATIONAL-02). (2) Shopify nu acceptă redirecturi wildcard: generează 575 redirecturi 1:1 din `$R/sitemaps/all-urls.txt` (`/ro-hu/<path>` → `/<path>`, `/ro-hu` → `/`) ca CSV cu antetul `Redirect from,Redirect to` și importă-l la **Online Store → Navigation → URL redirects → Import**, ca orice URL `/ro-hu/` deja indexat sau linkat extern să devină 301, nu 404. (3) Verificare:

```bash
curl -I https://primesupplements.ro/ro-hu/products/creatina-creapure   # → 301 către /products/creatina-creapure
```

`https://primesupplements.ro/sitemap.xml` listează 7 copii; `grep hreflang` pe `/` nu întoarce nimic (Shopify emite hreflang doar când există alternate). (4) Retrimite `sitemap.xml` în GSC și cere indexarea a 3-5 URL-uri de produs cheie. Opțiunea (b): pasul 1 fără dezactivare — schimbarea de țară rămâne pe aceleași URL-uri prin formularul `localization` + cookie (fără duplicate, fără hreflang), dar Googlebot vede mereu contextul românesc și prețul net rămâne pentru cine alege Ungaria, deci corectează și setarea de taxe. Opțiunea (c): INTERNATIONAL-10, proiect separat, nu un motiv de a păstra duplicatul online.

**Cum verificăm (falsificabilitate):** constatarea ar fi greșită dacă GSC Page indexing ar arăta URL-urile `/ro-hu/` ca „Indexed” cu impresii proprii în Performance (filtru page contains `/ro-hu/`, country = Hungary). Așteptat în schimb: după remediere, „Duplicate, Google chose different canonical than user” pentru `/ro-hu/` scade la 0 în 4-8 săptămâni și `site:primesupplements.ro/ro-hu` nu întoarce rezultate.

**Indicator timpuriu:** numărul de copii din indexul sitemap 13 → 7; `Shopify.country` niciodată `"HU"` în sursa paginii; „total crawl requests” pe zi pentru HTML scade cu aproximativ jumătate în 2-4 săptămâni.

#### INTERNATIONAL-02 — Alternate-urile /ro-hu/ afișează prețuri diferite pentru aceleași produse (fără TVA, exact ÷1,21) în aceeași monedă RON, inclusiv în Product JSON-LD cu același @id

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| High | PENDING (acțiune proprietar) | S | 0.92 |

**Dovezi:** produsul `/products/creatina-creapure`: pagina rădăcină afișează `Preț redus 180,00 lei`, JSON-ul de produs `"price":18000`, JSON-LD `lowPrice 100,00 / highPrice 180,00 RON` (`$R/pages/product-creatina-creapure.html`); alternate-ul hreflang `/ro-hu/products/creatina-creapure` afișează `Preț redus 148,76 lei`, `"price":14876`, JSON-LD `lowPrice 82,64 / highPrice 148,76 RON` (`$S/intl/body_rohu_product.html`). 180 / 148,76 = **1,2100** = cota standard de TVA din România (21 %). La fel pe cardurile de produs din homepage: `"price":20000` (rădăcină) vs `"price":16529` (`/ro-hu`); diferențe de text `360,00 → 297,52`, `200,00 → 165,29`, `100,00 → 82,64` (toate ÷1,21). Toate cele 77 de prețuri `lei` afișate pe homepage sunt mai mici pe `/ro-hu` cu același factor (71 × 1,210, 5 × 1,211, 1 × 1,208 — rotunjiri), în timp ce cele zece șiruri `300 RON` ale pragului de livrare gratuită și fiecare cuvânt din copy sunt identice (`gratuit` 10/10 apariții pe ambele homepage-uri). Cauza: `shop.taxesIncluded = true` (Admin API) combinat cu comportamentul Shopify „Include or exclude tax based on your customer's country” și fără înregistrare fiscală pentru Ungaria → piața HU scoate TVA-ul românesc de 21 % și prezintă prețul net, etichetat tot RON/lei; `currencySettings` pentru Ungaria este `null`, deci nu există HUF, doar un RON mai ieftin. Snippet-ul custom `snippets/schema-product-enhanced.liquid` emite același id de entitate pe ambele pagini (`"@id": "https://primesupplements.ro/products/creatina-creapure#product"`, `"url": "https://primesupplements.ro/products/creatina-creapure"`) cu două intervale `AggregateOffer` diferite — o entitate, două oferte contradictorii.

**Impact / pagini afectate:** toate cele 185 produse (plus cardurile de colecție, homepage, rezultate de căutare) sub `/ro-hu/`; fiecare preț din textul paginii, JSON-ul de produs și JSON-LD; orice vizitator român care selectează „Ungaria” în selector. (1) Dacă Google alege `/ro-hu/` drept canonical pentru un produs (conținut identic, ambele self-canonical), prețul indexat, cel din merchant listing și verificarea de landing page din Merchant Center văd 148,76 în loc de 180,00 → respingeri „price mismatch” și un checkout care adaugă la loc 21 % la o adresă din România; (2) două oferte contradictorii pentru același `@id` reduc încrederea în date structurate care au deja alte defecte; (3) un consumator român care alege „Ungaria” vede prețuri fără TVA, în conflict cu cerința ca prețul afișat consumatorilor să fie prețul final cu TVA (cf. OG 99/2000 — semnalat pentru revizuire juridică, nu este o opinie legală).

**Recomandare:** ștergerea web presence-ului (INTERNATIONAL-01) elimină URL-urile duplicate, dar flip-ul de preț net supraviețuiește pentru oricine selectează Ungaria în selector atât timp cât piața rămâne activă. Fie dezactivează piața, fie în **Settings → Taxes and duties** debifează **„Include or exclude tax based on your customer's country”** (păstrează „Include tax in prices” activ), astfel încât fiecare piață să vadă același preț brut în RON; fie înregistrează o cotă de TVA Ungaria/OSS la Taxes and duties → European Union, ca prețurile HU să rămână brute. Reverificare:

```bash
curl -sS -A "<UA>" https://primesupplements.ro/ro-hu/products/creatina-creapure | grep -o '"price":[0-9]*' | head -1
```

Trebuie să întoarcă `18000` (sau URL-ul trebuie să facă 301).

**Cum verificăm (falsificabilitate):** constatarea este greșită dacă `/ro-hu/products/creatina-creapure` arată `"price":18000`; este confirmată de valoarea capturată 14876. După remediere, Merchant Center → Products → problemele „Price mismatch” pentru orice landing page care conține `/ro-hu/` trebuie să fie 0, iar URL Inspection pe un produs `/ro-hu/` trebuie să arate „URL is not on Google” sau un redirect.

**Indicator timpuriu:** nu mai există pagini cu `Shopify.country === "HU"`, sau prețul din JSON-ul de produs pe `/ro-hu/` este egal cu prețul rădăcină.

#### INTERNATIONAL-03 — Setul hreflang este tehnic valid, dar nejustificat semantic: `ro-HU` țintește vorbitorii de română din Ungaria fără nicio localizare, în timp ce a doua audiență realistă (vorbitorii de maghiară din România, `hu-RO`) nu este deservită deloc

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Medium | PENDING (acțiune proprietar) | S (eliminare) / L (lansare hu-RO) | 0.85 |

**Dovezi:** fiecare pagină emite exact trei tag-uri, de ex. pe `/`: `x-default → https://primesupplements.ro/`, `ro → https://primesupplements.ro/`, `ro-HU → https://primesupplements.ro/ro-hu` (`$R/home.html`); copia `/ro-hu` emite setul identic (mesh complet de întoarcere). Codurile sunt valide (`ro` ISO 639-1, `HU` ISO 3166-1 alpha-2), deci Google *acceptă* anotarea. `ro-HU` înseamnă literal „pagină în română pentru utilizatori din Ungaria”, dar pagina oferă text românesc identic cu rădăcina, monedă RON (`Shopify.currency = {"active":"RON"}` pe ambele), pagini legale doar pentru România (INTERNATIONAL-04), fără UI maghiar (`shopLocales.hu.published = false`), fără prețuri maghiare (`currencySettings: null`). Conform tabelului MT-QA al skill-ului, „alternate-uri hreflang multiple care indică URL-uri cu conținut identic cu excepția chrome-ului de header” este cel mai puternic semnal de alternate netradus, învelit în template. Dimensiunea pieței: minoritatea vorbitoare de română din Ungaria este de ordinul zecilor de mii (recensământul maghiar 2022 ≈ 0,03 M), în timp ce vorbitorii de maghiară din România sunt ≈ 1,0 M (recensământul românesc 2021, 6 % din populație, concentrați în Harghita, Covasna, Mureș, Bihor, Satu Mare, Cluj) — toți deja în singurul teritoriu de livrare și regim de TVA al magazinului. Nu există conținut `hu` nicăieri: `/hu` → 404; `Accept-Language: hu-HU` → pagină românească.

**Impact / pagini afectate:** 1 151 URL-uri poartă câte trei `<link>` hreflang (3 453 tag-uri) fără niciun beneficiu de targetare; cererea reală vorbitoare de maghiară din România nu are nicio experiență de landing.

**Recomandare:** pe termen scurt, lasă tag-urile să dispară odată cu web presence-ul (INTERNATIONAL-01, decizie a proprietarului). Pe termen mediu, dacă se dorește o audiență de limbă maghiară, adaugă maghiara ca **locale alternativ al pieței România**, nu ca piață Ungaria: Settings → Languages → publică `hu` după traducere revizuită uman (aplicația Translate & Adapt; 185 produse, 23 colecții, 11 pagini, 354 articole, string-urile temei) → Settings → Markets → Romania → Domains and languages → adaugă maghiara ca limbă alternativă. Shopify servește atunci `/hu/...` cu `hreflang="hu-RO"`, aceleași prețuri RON, același TVA românesc, aceeași livrare Cargus și aceleași pagini legale (care trebuie și ele traduse). Validează cererea mai întâi în GA4: Reports → User → Demographics → Language, ponderea sesiunilor cu `hu`/`hu-ro` (și interogări GSC cu termeni maghiari precum „kreatin”, „fehérje por”). Nu publica traducere automată fără revizuire nativă: politica de spam Google tratează paginile traduse nerevizuite, la scară, drept scaled content abuse.

**Cum verificăm (falsificabilitate):** dacă `ro-HU` ar fi justificat, GSC Performance filtrat pe Country = Hungary ar arăta impresii/clickuri semnificative pentru URL-urile `/ro-hu/`; un zero plat (așteptat) confirmă că anotarea este balast. Pentru propunerea `hu-RO`: o pondere GA4 a limbii `hu` > ~3 % din sesiuni justifică investiția; < 1 % nu.

**Indicator timpuriu:** numărul de tag-uri hreflang per pagină 3 → 0 (după opțiunea a) sau tag-uri `hu-RO` prezente cu `<title>`/H1 traduse (după lansarea locale-ului).

#### INTERNATIONAL-04 — Livrarea și conținutul legal contrazic piața Ungaria: magazinul livrează în HU cu tarife Cargus denumite în maghiară și exprimate în HUF, în timp ce politica de livrare și Termenii spun că livrarea este doar în România și nu există pagini legale maghiare

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Medium | PENDING (acțiune proprietar) | S (curățare) / M (termeni maghiari corecți) | 0.9 |

**Dovezi:** Admin API: `shop.shipsToCountries = ["HU","RO"]`; profilul de livrare „General profile” (gid://shopify/DeliveryProfile/126905287031) are zona **Hungary** (gid://shopify/DeliveryZone/646731989367) cu metodele active `Cargus Gyorsfutár` = **3900.0 HUF** și `Cargus Ingyenes szállítás` = **0.0 HUF**, lângă zona Romania cu `Livrare Cargus` 20.0 RON și `Livrare Gratuită Cargus` 0.0 RON. `$R/shopify/pages.json` → `politica-de-livrare` (163 cuvinte): „Livrarea produselor se face prin curier rapid **pe teritoriul României**… Livrare GRATUITĂ pentru comenzile ce depășesc 300 RON. Livrare are costul de 20 RON. Livrarea se face prin firma de curierat Cargus”; nicio mențiune Ungaria/Hungary/HUF (0 potriviri). `termeni-și-condiții` (3 952 cuvinte): „Livrarea Produselor se poate efectua **doar pe teritoriul României**” și din nou „Livrarea comenzilor se asigura prin firme de curierat **doar pe teritoriul Romaniei**”; jurisdicție „instanțelor din România”; ANPC ca organism de soluționare. `politica-de-retur` descrie doar procedura românească de retragere în 14 zile. Magazinul prezintă doar RON (`enabledPresentmentCurrencies = ["RON"]`), dar tarifele HU sunt stocate în HUF (≈ 49 RON la ~80 HUF/RON) — rămășiță din perioada în care piața avea monedă locală; checkout-ul trebuie să convertească tariful, deci prețul de livrare văzut de un client maghiar nu este nici cel din politică, nici cel din tabelul de tarife. Duplicatul `/ro-hu/pages/politica-de-livrare` servește același text „doar România” vizitatorului „din Ungaria” (sitemap child8 listează toate cele 11 pagini sub `/ro-hu/`).

**Impact / pagini afectate:** 2 metode de livrare, 4 pagini legale (×2 URL-uri), fiecare checkout maghiar. Încrederea/E-E-A-T și consecvența legală fac parte din ce evaluează QRG pentru comerțul adiacent YMYL (suplimente): o pagină care spune „doar România” la URL-ul pe care Google este informat că este „pentru Ungaria” este o contradicție de calitate a conținutului; pentru clienți este o expunere de drept al consumatorului (condiții de livrare înșelătoare, termeni în limba maghiară lipsă pentru o piață țintită explicit).

**Recomandare:** decizia despre piață trebuie luată explicit de proprietar (nepregătit de audit: ștergerea zonei și paragraful HU din politici). Dacă Ungaria nu este țintă: dezactivează piața Ungaria (INTERNATIONAL-01 pasul 1) **și** șterge zona Hungary din Settings → Shipping and delivery → General profile → Hungary → delete, astfel încât `shipsToCountries` să devină `["RO"]` și politicile să devină adevărate. Dacă Ungaria este țintă: păstrează zona, convertește tarifele în RON (sau reactivează HUF ca monedă a pieței), adaugă o secțiune de livrare/retur pentru Ungaria (prag, curier, termen de livrare, adresă de retragere) în cele trei pagini de politici și tradu-le (INTERNATIONAL-10).

**Cum verificăm (falsificabilitate):**

```graphql
graphql_query { shop { shipsToCountries } }
```

întoarce `["RO"]` (opțiunea a) sau pagina politicii de livrare conține un paragraf despre Ungaria (opțiunea c). Dacă un checkout de test cu adresă din Ungaria arată azi o linie de livrare pe care politica nu o descrie, contradicția este confirmată.

**Indicator timpuriu:** numărul de țări din `shipsToCountries`; prezența „Ungaria”/„Magyarország” în `politica-de-livrare`.

#### INTERNATIONAL-05 — Selectorul de țară este randat de trei ori pe pagină, oferă două țări cu aceeași monedă („România (RON Lei)” / „Ungaria (RON Lei)”), nu are opțiune de limbă și schimbă tacit prețurile cu −17,36 %

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Low | PENDING (acțiune proprietar) | S | 0.9 |

**Dovezi:** formulare randate per pagină: `home.html` are 3 `<form … localization …>` (id-uri `localization-form-country--sections--24912813293943__header`, `localization-form-country-end-sections--24912813293943__header`, `localization-form-country--sections--24912813261175__footer`), fiecare cu opțiunile `value="RO"` (`aria-selected="true"`) și `value="HU"`; etichete `România (RON Lei)` ×4 și `Ungaria (RON Lei)` ×3 pe homepage-ul rădăcină, `Ungaria (RON Lei)` ×4 pe copia `/ro-hu`; identic pe pagina de produs. `snippets__localization-selector.liquid` randează `{{ country.name }} ({{ country.currency.iso_code }} {{ country.currency.symbol }})` — ambele piețe folosesc RON, deci cele două intrări diferă doar prin cuvântul țării; butonul `aria-label="Schimbă țara sau moneda"` promite o schimbare de monedă care nu poate avea loc. Niciun selector de limbă nu este randat (o singură limbă publicată; `sections__footer.liquid` linia 137 cere `localization.available_languages.size > 1`). Selectarea Ungariei face POST pe formularul de localizare, setează `Shopify.country = "HU"`, navighează la copia `/ro-hu/` și scade fiecare preț cu 17,36 % (INTERNATIONAL-02) fără nicio notificare; mesajul de livrare gratuită spune în continuare „300 RON”.

**Impact / pagini afectate:** header (2 instanțe) + footer pe toate cele 1 151 URL-uri; fiecare instanță încarcă și `country-flags.css` (`grep -c country-flags.css $R/home.html` = 3; clase `country-flags--RO` ×6, `country-flags--HU` ×3), adică trei cereri de stylesheet pentru un selector care nu poate schimba nimic util.

**Recomandare:** selectorul dispare de la sine când piața este dezactivată (decizia proprietarului; atenție: ștergerea doar a web presence-ului, pregătită prin `webPresenceDelete`, îl păstrează). Dacă piața este păstrată (opțiunea b), ascunde selectorul din editorul temei (Header → „Show country/region selector” off; Footer → la fel), ca vizitatorii să nu fie invitați să treacă pe o „piață” cu monedă identică; sau setează `show_country_name` ca eticheta să fie explicită. Nu expune niciodată o schimbare de țară al cărei singur efect vizibil este un preț net.

**Cum verificăm (falsificabilitate):**

```bash
grep -c 'name="country_code"' home.html
```

= 0 după schimbare; înainte: 6 butoane de opțiune.

**Indicator timpuriu:** numărul de id-uri `localization-form-country-*` din sursa paginii (azi 3).

#### INTERNATIONAL-06 — Homepage-ul /ro-hu există în două forme de URL (`/ro-hu` și `/ro-hu/`, ambele 200); canonical/hreflang/sitemap folosesc forma fără slash, în timp ce `rootUrls` al pieței spune `/ro-hu/`

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Low | PENDING (acțiune proprietar) | S | 0.9 |

**Dovezi:** `$S/intl/hdr_ro-hu.txt` și `hdr_ro-hu_.txt`: ambele `HTTP/2 200`, `content-language: ro-HU`, același corp de 630 865 bytes; `<link rel="canonical" href="https://primesupplements.ro/ro-hu">`, `hreflang="ro-HU" href="https://primesupplements.ro/ro-hu"`, `og:url` `https://primesupplements.ro/ro-hu`, sitemap child7 `<loc>https://primesupplements.ro/ro-hu</loc>` — toate fără slash; Admin API `rootUrls[0].url = "https://primesupplements.ro/ro-hu/"` cu slash; homepage-ul rădăcină folosește `https://primesupplements.ro/` cu slash. Canonical-ul și hreflang-ul sunt de acord între ele (setul nu este rupt), dar varianta cu slash final este un al treilea URL 200 pentru același document și este chiar forma pe care Shopify o afișează în Admin.

**Impact / pagini afectate:** 1 pagină (homepage-ul pieței), 3 forme de URL (`/`, `/ro-hu`, `/ro-hu/`).

**Recomandare:** se rezolvă prin eliminarea web presence-ului (ambele forme devin 301/404) — decizia proprietarului. Dacă piața este păstrată cu subfolder, încearcă un redirect `/ro-hu/` → `/ro-hu` în Online Store → Navigation → URL redirects; dacă Shopify îl refuză (rădăcinile de piață sunt rezervate), bazează-te pe canonical, care numește deja forma fără slash, și asigură-te că niciun link intern și nicio intrare de sitemap nu folosește `/ro-hu/`.

**Cum verificăm (falsificabilitate):** `curl -I https://primesupplements.ro/ro-hu/` întoarce 301 după remediere; azi întoarce 200.

**Indicator timpuriu:** statusul HTTP al `/ro-hu/`.

#### INTERNATIONAL-07 — Datele structurate de pe fiecare pagină /ro-hu/ declară URL-ul rădăcină ca URL al entității (@id, url, elemente de breadcrumb), în timp ce canonical-ul și og:url ale paginii declară /ro-hu/

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Low | PENDING (acțiune proprietar) | S | 0.9 |

**Dovezi:** `/ro-hu/products/creatina-creapure` (`$S/intl/body_rohu_product.html`): `"@id": "https://primesupplements.ro/products/creatina-creapure#product"`, `"url": "https://primesupplements.ro/products/creatina-creapure"` (×2), breadcrumb `"item": "https://primesupplements.ro"` și `"https://primesupplements.ro/collections/all"`, Organization `"@id": "https://primesupplements.ro/#organization"`; dar `<link rel="canonical" href="https://primesupplements.ro/ro-hu/products/creatina-creapure">` și `<meta property="og:url" content="https://primesupplements.ro/ro-hu/products/creatina-creapure">`. Snippet-urile custom (`snippets__schema-product-enhanced.liquid`, `snippets__schema-breadcrumb-enhanced.liquid`) construiesc URL-urile din `shop.url`, care ignoră subfolderul pieței, pe când `canonical_url` al Shopify îl include. Rezultat: trei semnale diferite „această pagină este” pe același URL (canonical = /ro-hu/, og:url = /ro-hu/, schema = rădăcină) și un id de entitate cu două prețuri de ofertă (INTERNATIONAL-02). Notă de verificare: snippet-urile rescrise din tema de test (`theme-fixes/snippets/schema-product-enhanced.liquid`, `assign product_url = shop.url | append: product.url`) construiesc în continuare URL-urile din `shop.url`, deci publicarea temei nu schimbă această constatare cât timp subfolderul există.

**Impact / pagini afectate:** toate cele 575 URL-uri `/ro-hu/` cu JSON-LD (185 produse cu Product+Breadcrumb, 354 articole, 23 colecții, homepage).

**Recomandare:** dispare odată cu web presence-ul (decizia proprietarului). Dacă o piață cu subfolder este vreodată păstrată, construiește URL-urile din schema din `request.origin | append: product.url` / `canonical_url` în loc de `shop.url`, ca URL-ul entității să coincidă cu canonical-ul; în acel caz adaugă și `inLanguage` (INTERNATIONAL-09).

**Cum verificăm (falsificabilitate):** pe orice pagină `/ro-hu/`, `"url"` din blocul Product este egal cu href-ul canonical. Azi nu este.

**Indicator timpuriu:** numărul de pagini `/ro-hu/` cu `"@id": "https://primesupplements.ro/products/…#product"`.

#### INTERNATIONAL-08 — Canonical-ul și hreflang/sitemap-ul nu sunt de acord asupra majusculelor din percent-encoding pentru URL-urile cu handle-uri cu diacritice (canonical minuscule `%c8%9b`, hreflang și sitemap majuscule `%C8%9B`)

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Low | OPEN | S | 0.8 |

**Dovezi:** `$R/pages/article.html`: `<link rel="canonical" href="https://primesupplements.ro/blogs/news/bcaa-vs-eaa-diferen%c8%9be-%c8%99i-beneficii-pentru-culturisti-ghid-complet">` vs `<link rel="alternate" hreflang="ro" href="https://primesupplements.ro/blogs/news/bcaa-vs-eaa-diferen%C8%9Be-%C8%99i-…">` (aceeași formă cu majuscule pentru `x-default` și `ro-HU`). Intrările `<loc>` din sitemap cu `%` folosesc majuscule (child5: 2 URL-uri de articol, child2: 1 URL de pagină `termeni-și-condiții`, dublate în child11 și child8). Google normalizează majusculele hex (RFC 3986 §2.1), deci clusterul hreflang este puțin probabil să se rupă, dar regula skill-ului „URL-ul canonical și URL-ul hreflang trebuie să coincidă exact” este încălcată pe aceste pagini și orice unealtă de audit bazată pe potrivire de string-uri va semnala o nepotrivire de self-reference. Remedierea din 12.10.2026 a rescris titlul/meta acestor articole, dar handle-urile nu au fost redenumite.

**Impact / pagini afectate:** 3 pagini canonice (`bcaa-vs-eaa-diferen%C8%9Be-…`, `water-out-tinctura-solu%C8%9Bia-…`, `/pages/termeni-%C8%99i-condi%C8%9Bii`) × 2 arbori = 6 URL-uri.

**Recomandare:** redenumește cele trei handle-uri în ASCII (`bcaa-vs-eaa-diferente-si-beneficii-…`, `water-out-tinctura-solutia-…`, `termeni-si-conditii`) cu „Create a URL redirect for the old handle” bifat în Admin; asta elimină complet problema de encoding și scurtează URL-urile. Sarcina de curățare a blogului acoperă deja igiena handle-urilor; include aceste trei.

**Cum verificăm (falsificabilitate):** după redenumire, href-urile canonical și hreflang sunt identice byte cu byte; `grep -c '%' $R/sitemaps/child5.xml` numără doar nume de fișiere de imagine.

**Indicator timpuriu:** numărul de intrări `<loc>` care conțin `%` în sitemap-urile de pagini/articole (azi 3).

#### INTERNATIONAL-09 — Lacune în metadatele de limbă: fără `og:locale`, fără `inLanguage` în niciun JSON-LD și string-uri în engleză (tagline-ul din title, titlul Judge.me) pe singurul locale (român)

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Low | READY (tema de test – de publicat) | S | 0.8 |

**Dovezi:** `grep -c 'og:locale' $R/home.html $R/pages/homepage-ro-hu.html` = 0 (snippet-ul custom `snippets__social-meta-tags.liquid` nu are nicio linie de locale); `grep inLanguage $R/theme/*.liquid` = 0 și `grep '"inLanguage"'` pe HTML-ul de home/produs/articol = 0 (Organization, Product, Article, CollectionPage, BreadcrumbList îl omit toate); `<title>Prime Supplements - Hardcore Sports Nutrition</title>` și titlul Judge.me „Let customers speak for us” sunt în engleză pe o pagină `lang="ro"`. Pozitiv: `<html lang="ro">` și header-ul `content-language` (`ro-RO` / `ro-HU`) sunt corecte pe ambii arbori.

**Impact / pagini afectate:** toate cele 576 URL-uri canonice (1 151 incl. duplicatele).

**Recomandare:** Verificare: în tema de test „Impact – SEO fixes 2026-10-12” (id 193875083639), `theme-fixes/snippets/schema-article.liquid` (linia 37), `schema-collection.liquid` (linia 23) și `schema-organization.liquid` (linia 68, blocul WebSite) emit `"inLanguage": "ro"`, iar `layout/theme.liquid` dă homepage-ului titlul `Suplimente nutritive, proteine și creatină | Prime Supplements`; după publicare, proprietarul confirmă în Rich Results Test pe un articol și pe `/collections/creatina` că `inLanguage: ro` apare. Rămâne de făcut, în aceleași fișiere, înainte de publicare: în `snippets/social-meta-tags.liquid` adaugă

```liquid
<meta property="og:locale" content="{{ request.locale.iso_code }}_{{ localization.country.iso_code }}">
```

(randează `ro_RO`); în `schema-product-enhanced.liquid` (încă fără `inLanguage` în tema de test) adaugă

```liquid
"inLanguage": "{{ request.locale.iso_code }}"
```

Separat, tradu titlul Judge.me din setările aplicației (Widget → „Let customers speak for us”). Costul marginal este aproape zero, fiind aceleași snippet-uri pe care remedierile de schema le ating deja.

**Cum verificăm (falsificabilitate):** Rich Results Test / validatorul de schema arată `inLanguage: ro` pe un produs; Facebook Sharing Debugger arată `og:locale ro_RO`.

**Indicator timpuriu:** prezența `og:locale` în head-ul homepage-ului.

#### INTERNATIONAL-10 — Locale-ul maghiar există, dar este nepublicat, fără traduceri, fără HUF și fără conținut legal/de livrare maghiar: lista de pregătire pentru o lansare reală în Ungaria (opțiunea c)

| Severitate | Stare | Efort | Încredere |
|---|---|---|---|
| Info | OPEN | L | 0.8 |

**Dovezi:** `shopLocales` → `{locale: hu, published: false}`; `/hu` → HTTP 404 (`$S/intl/hdr_hu.txt`, titlu „404 negăsit”); `markets.Ungaria.alternateLocales = []`, `currencySettings = null`; zona de livrare Hungary în HUF (INTERNATIONAL-04); niciun text maghiar în paginile capturate (`Magyar*` 0 potriviri). Vânzarea într-o monedă locală a pieței (HUF) cere Shopify Payments (disponibil comercianților din România) sau un gateway cu suport multi-monedă; magazinul prezintă acum doar RON.

**Impact / pagini afectate:** strategic; nimic nu este indexabil azi pentru interogări în maghiară.

**Recomandare:** doar dacă Ungaria este o țintă comercială reală (altfel opțiunea a din INTERNATIONAL-01): (1) verificarea cererii: volume GSC/Ads pentru `kreatin monohidrát`, `fehérje por`, `edzés előtti` și densitatea concurenței (gymbeam.hu, builder.hu, shop.builder.hu, myprotein.hu); (2) traducere maghiară revizuită uman pentru 185 produse, 23 colecții, 11 pagini (incl. ÁSZF/termeni, livrare, retur, confidențialitate în maghiară cu referințe la protecția consumatorului din Ungaria), fișierul de locale al temei, string-urile widget-ului Judge.me și cele 354 articole (sau publică doar un subset curatoriat de articole în locale-ul hu, ca să eviți 354 pagini traduse automat, pe care politica de spam Google le tratează ca scaled content abuse); (3) Settings → Languages → publică `hu`; Settings → Markets → Ungaria → Domains and languages → limba implicită maghiară (subfolderul devine `/hu-hu`), astfel hreflang devine `hu-HU`; (4) Settings → Markets → Ungaria → Products and pricing → monedă locală HUF cu rotunjire, și Settings → Taxes and duties → EU → înregistrează TVA HU/OSS, ca prețurile HUF să fie brute; (5) reprețuiește zona de livrare Ungaria în HUF cu un prag de livrare gratuită în HUF, declarat pe pagina maghiară de livrare; (6) canal de suport în maghiară (WhatsApp/pagina de contact listează acum doar un număr românesc); (7) abia apoi păstrează, dacă se dorește, alternate-ul `ro-HU` ca limbă *suplimentară* pentru vorbitorii de română din Ungaria. Alternativa cu potrivire mult mai bună: maghiara ca locale alternativ al pieței România (`hu-RO`, INTERNATIONAL-03), care are nevoie doar de pașii (2)-(3).

**Cum verificăm (falsificabilitate):** o lansare corectă arată `<html lang="hu">` pe `/hu-hu/`, `hreflang="hu-HU"`, `Shopify.currency.active = "HUF"` și impresii GSC Performance cu Country = Hungary în creștere față de baza actuală (așteptat ≈ 0).

**Indicator timpuriu:** `shopLocales.hu.published` = true, cu `Translate & Adapt` arătând ≥ 95 % resurse traduse înainte de reactivarea pieței.

### Ce nu am putut măsura

- Google Search Console: canonical-urile alese efectiv de Google pentru URL-urile `/ro-hu/`, impresiile pe piață și numărul de „Duplicate, Google chose different canonical” — fără acces (sandbox fără GSC); fiecare afirmație despre ce „va face” Google se bazează pe comportamentul documentat de canonicalizare/hreflang și pe identitatea de conținut măsurată (98,6–99,6 %), nu pe date de index observate. Raportul International Targeting din GSC nu mai există (eliminat în 2022), deci acolo nu se pierde nimic.
- Prezența live în SERP a URL-urilor `/ro-hu/` — agentul specialist nu avea WebSearch în lista de unelte.
- Google Merchant Center: dacă vreun rând din feed indică un URL `/ro-hu/` — fără acces la feed/landing-page mapping.
- Comportamentul checkout-ului pentru o adresă din Ungaria (conversia tarifului din HUF, liniile de taxe) — nu s-a plasat nicio comandă de test; dedus din profilul de livrare și setările de taxe întoarse de Admin API.
- Prețurile de pe `/ro-hu/` au fost verificate pe homepage (77 prețuri afișate, toate ÷1,21) și pe un singur produs (`creatina-creapure`); produsele din colecția „11% TVA” (TVA redus) nu au fost eșantionate și ar arăta ÷1,11.
- Doar o pagină de produs `/ro-hu/` și homepage-ul `/ro-hu` au fost descărcate live (buget limitat de protecția anti-bot: 429 după burst-uri, cereri la 2 s); celelalte 573 duplicate au fost evaluate din sitemap și din randarea deterministă a piețelor Shopify.
- Cifrele de recensământ (vorbitori de română în Ungaria, 2022; vorbitori de maghiară în România, 2021) sunt citate din memorie, la precizie de ordin de mărime; susțin argumentul strategic, nu o constatare.
