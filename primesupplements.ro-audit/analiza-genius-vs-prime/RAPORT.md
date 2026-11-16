# Genius Nutrition vs Prime Supplements: analiză comparativă (16.11.2026)

**Doar citire.** Nu s-a modificat nimic pe site-ul nostru sau în Shopify. Nu s-a intrat în admin, nu s-au plasat comenzi, nu s-au creat conturi și nu s-au trimis formulare. Am folosit doar pagini publice, cu o cerere la 1,1–1,5 s pe crawl și pauze la limitare. Toate datele brute sunt în `date/`, `lighthouse/` și `screenshots/`, iar scripturile în `scripts/`.

**Domeniul concurentului:** `geniusnutritionr.ro` nu există (nu se rezolvă în DNS). `www.geniusnutrition.ro` face redirect 301 spre **`https://geniusnutrition.ro/`**, site-ul analizat.

**Ce era deja în repo (nu am refăcut):**
- auditul SEO din 25.10, cu o coloană Genius (`seo/AUDIT-SEO-COMPLET-2026-10-25.md`, secțiunea 5);
- panelul AI din 13.11, cu 29 de întrebări în Google AI Mode (`seo/PANEL-AI-2026-11-13.md`);
- pagina de produs vizuală după structura Genius (`pagina-produs-vizuala/`, 15.11);
- decizia D2 despre prețurile tăiate permanente / Omnibus (`SETARI-VANZARI-2026-10-16.md`);
- planul SEO de după 1.12 (`seo/PLAN-DUPA-BLACK-FRIDAY-2026.md`).

Acolo unde o constatare de aici se suprapune cu ele, trimit la ele în loc să le repet.

---

## 1. Rezumat executiv

**Verdict:** pe partea tehnică (date structurate, viteză, SEO on-page, conformitate) **suntem peste Genius: 7,6 / 10 față de 6,5 / 10**. **Genius e însă mult mai puternic ca marcă:** apare în 16 din 20 de răspunsuri Gemini, noi în 0. Are sute de recenzii pe produs, un magazin în Veranda Mall, certificat ISO 22000 și conținut de produs foarte bogat. Concluzia: „site mai bun” nu înseamnă încă „mai cunoscut”. Pentru noi, următorul pas e autoritatea și diferențierea numelui, nu tehnica.

**Top 5 avantaje ale lor față de noi**
1. **Notorietate în AI:** apar în 16 din 20 de răspunsuri Gemini (din memoria modelului), noi în 0. Mai mult, la întrebarea „Genius sau Prime Supplements?” Gemini ne confundă cu băutura PRIME a lui Logan Paul (`date/intrebari-ai-gemini-fara-cautare.json`, întrebarea 15).
2. **Dovezi sociale:** 373 de recenzii pe WHEY-X5 2 kg (Stamped), față de 50 pe Prime Whey 2 kg (Judge.me), plus certificatul ISO 22000 afișat pe „Despre noi” (seria A-MC nr. 1226 din 24.07.2025) și magazinul fizic din Veranda Mall, cu pagină de locații.
3. **Descrieri de produs mult mai bogate:** 2.000–3.800 de cuvinte în descrierea Shopify a celor 10 produse comparate, față de 430–1.200 la noi. Pagina noastră vizuală nouă stă însă în metafield-uri, așa că în HTML-ul complet al paginii suntem apropiați: mediana e 5.387 de cuvinte la noi, 5.757 la ei.
4. **Căutarea iartă greșelile:** „wey” dă 10 produse la ei și 2 la noi; „izolat” dă la ei 4 izolate, iar la noi un singur izolat urmat de batoane.
5. **Instrumente de fidelizare și comerț:** abonamente (Seal Subscriptions), wishlist, cadou la comandă (iconița „gift”), card cadou, notificări push, livrare în Europa și formular B2B.

**Top 5 avantaje ale noastre față de ei**
1. **Date structurate complete:** pe fiecare produs avem Product + Offer + Brand + MerchantReturnPolicy + OfferShippingDetails (214 din 214), plus AggregateRating după randare. **Genius nu are schema Product pe niciun produs** (0 din 454 de pagini de produs crawl-uite; doar Organization), deci nu poate avea stele, preț sau stoc în rezultatele Google din date structurate.
2. **Viteză:** pe mobil, mediana Lighthouse e 68–88 la noi și 39–61 la ei, pe 5 pagini. Pe homepage-ul lor LCP e 13,6 s, iar pagina are 20,8 MB din cauza unui video MP4 de 29,5 MB. Pe desktop avem 97–100, ei 79–93.
3. **Conformitate:** 0 formulări riscante în 15 descrieri de produs verificate la noi. La ei sunt aproape 50 de apariții în 5 din 15: „arderea grăsimilor / accelerează metabolismul” (Warcry Shredz), „reduce stresul și anxietatea” (Ashwagandha), „detoxifiere” (Super Greens), „previne degradarea țesutului muscular” (EAA-X5), „previne calcificarea arterială” (D3+K2).
4. **Preț:** suntem mai ieftini la 100 g sau pe porție la 9 din 10 perechi de produse. De exemplu, whey 2 kg: 18,4 lei/100 g la noi, 26,3 la ei; BCAA: 21,0 față de 40,3. Excepția e creatina monohidrat (25,7 față de 23,8 lei/100 g).
5. **SEO on-page și limbă:** avem diacritice peste tot, titluri cu cuvinte-cheie („Proteină whey din zer: concentrat și izolat”), meta description pe toate paginile și categorii de 1.000–1.300 de cuvinte, față de 550–830 la ei. Genius scrie fără diacritice pe homepage, pe toate categoriile și în butoane („Adauga in cos”), iar titlurile categoriilor au brandul dublat cu un rând nou în ele.

**Top 10 acțiuni recomandate** (detaliile sunt în capitolul 5)
1. **Azi:** scoate banner-ul „Black Friday … până pe 15 noiembrie” de pe homepage și din bara de anunțuri. Azi e 16.11, iar oferta afișată a expirat.
2. Repară cele 2 linkuri interne spre pachete șterse (404) și cele 13 linkuri spre articole redirecționate.
3. **Diferențierea numelui în AI:** „Prime Supplements” / „Prime Whey de la Prime Supplements”, în titluri, schema `alternateName`/`brand` și pe `/pages/pentru-asistenti-ai`. E legat de pașii 18–19 din planul de după 1.12.
4. Recenzii după livrare + Trustpilot (pașii 15–16 din plan). Diferența de 50 față de 373 de recenzii e cea mai vizibilă pentru client.
5. Căutare tolerantă la greșeli: sinonime și redirecturi de căutare („wey”, „preworkout”, „izolat”).
6. Pe mobil, mai puține butoane flotante: Chat, WhatsApp, cookie și „Filtrează” se suprapun peste cardurile de produs.
7. AggregateRating în HTML-ul brut, nu doar injectat de Judge.me, ca să-l vadă și crawlerele AI care nu rulează JS.
8. BreadcrumbList pe produse (îl avem doar pe colecții) și breadcrumb vizibil.
9. Text alternativ pentru cele 1.713 imagini cu `alt=""` (14,9 %), mai ales în galeriile de produs MNX.
10. FAQ-ul de pe homepage (întrebări-șablon Shopify: „Articolul comandat nu este în stoc…”) înlocuit cu întrebări reale despre suplimente. Aceleași întrebări-șablon le are și Genius.

---

## 2. Tabel de scoruri (0–10)

| Zonă | Pondere | Genius | Prime | Dovada principală |
|---|---:|---:|---:|---|
| SEO tehnic | 12 % | 6,5 | 7,5 | Genius: H1 multiplu pe 186/200 produse, 254 de URL-uri `/collections/x/products/y` legate intern, titluri cu „\n– Genius Nutrition®”. Prime: 2 linkuri interne 404, 13 spre redirecturi, 14,9 % imagini cu alt gol (`date/sumar-crawl.json`) |
| SEO on-page / conținut | 12 % | 6,5 | 7,5 | Prime: diacritice, titluri cu cuvinte-cheie, categorii cu mediana 1.294 de cuvinte (Genius 552). Genius: descrieri de produs mai lungi, dar fără diacritice pe categorii |
| Date structurate | 10 % | 3 | 9 | Product/Offer: Prime 214/214, Genius 0/454. Genius are doar Organization, WebSite+SearchAction, Article pe 18 articole |
| Performanță mobil | 10 % | 4,5 | 7,5 | Mediana performance: Prime 77, Genius 49 (5 pagini × 3 rulări, `lighthouse/mediane.csv`) |
| Performanță desktop | 5 % | 8 | 9,5 | Prime 97–100, Genius 79–93 |
| Scor AI | 12 % | 7,6 | 7,4 | 76 față de 74 din 100 (capitolul 3.5). Genius câștigă la mențiuni, Prime la fapte ușor de citat |
| Design | 8 % | 7,5 | 6,5 | Genius: video și poze lifestyle, identitate consecventă. Prime: banner expirat, elemente flotante suprapuse |
| UX / CRO | 12 % | 7,5 | 7 | Genius: căutare mare și tolerantă, recenzii, abonamente. Prime: estimare de livrare, upsell în coș, stoc vizibil |
| Încredere și legal | 8 % | 7 | 7 | Genius: 373 de recenzii, ISO, magazin în mall, dar aproape 50 de formulări de sănătate riscante în 5 produse. Prime: conform, date firmă, autor, dar puține recenzii |
| Accesibilitate | 5 % | 7,5 | 8 | Lighthouse a11y mobil: Prime 96–100, Genius 92–96. axe: la noi aria-hidden-focus (9) pe toate paginile; la ei link-name și contrast |
| Comercial | 6 % | 7 | 7,5 | Prime mai ieftin la 9/10 perechi; Genius are abonamente, card cadou, livrare UE |
| **Total ponderat** | 100 % | **6,5** | **7,6** | |

Scorurile sunt judecata mea pe baza dovezilor din dreapta. Cifrele din coloana a cincea sunt măsurate.

---

## 3. Pe zone

### 3.0 Cine e Genius (tip de business și platformă)
- **Brand propriu cu vânzare directă**, nu retailer multi-brand: tot catalogul e Genius Nutrition® + sub-brandul Warcry® (plus haine și accesorii). Producție proprie, ISO 22000, sediu și depozit în Buftea, magazin în Veranda Mall (București), pagină B2B și „Login as partner”. **Același model ca noi** (brand propriu + magazin fizic), deci comparația e directă.
- **Shopify**, tema Pursuit 1.0.7 (copie numită „Copy of Pursuit(MHT-dev) TEST METAFIELD”, publicată ca temă principală). Noi avem Impact 6.7.1.
- **Catalog:** 201 produse, 27 de colecții, 92 de articole, 17 pagini în sitemap. Noi avem 214 produse, 19 colecții, 154 de articole, 10 pagini (`date/*-sitemap-urls.tsv`).

### 3.1 SEO tehnic

| | Genius | Prime |
|---|---|---|
| robots.txt | Șablon Shopify, nimic blocat pentru boții AI | Șablon Shopify + `Content-Signal: search=yes, ai-input=yes, ai-train=yes` |
| Sitemap | 340 de URL-uri (201 produse, 27 colecții, 92 articole, 17 pagini) | 398 (214 produse, 19 colecții, 154 articole, 10 pagini) |
| www / HTTPS | www → non-www 301, HTTPS | la fel |
| Crawl (raw HTML) | 650 de URL-uri: 649 × 200, 1 × 404 (`/pages/gdpr-compliance`, 3 linkuri interne) | 529: 527 × 200, 2 × 404 (pachete șterse, câte 2 linkuri interne) |
| Redirecturi interne | 0 | **13 linkuri interne spre articole redirecționate** (301), de ex. `/blogs/news/cum-alegi-un-pre-workout` |
| Canonical | Corect; 254 de URL-uri `/collections/x/products/y` legate intern, toate cu canonical spre `/products/y` | Doar `/products/y`, fără variante prin colecție |
| noindex | Niciunul | 105, intenționat (căutare, `/collections/all`, etichete de blog) |
| H1 | **Multiplu pe 186 din 200 de produse** | Unul pe pagină |
| Breadcrumb | Vizibil pe colecții și produse | Doar BreadcrumbList în schema colecțiilor, nevizibil pe pagină; lipsește pe produse |
| Imagini | 12.352 de `<img>`: 0,1 % fără alt, 72 % lazy | 11.495: **14,9 % cu `alt=""`** (cele mai multe în galeriile MNX), 73 % lazy |
| lang / OG / Twitter / favicon | `ro-RO`, OG pe tot, `summary_large_image`, da | `ro`, la fel |
| Adâncime | 92 % din paginile atinse la ≤ 3 clicuri | la fel |

**Câștigă:** Prime, la limită. Genius nu are erori grave (zero redirecturi, canonical corect), dar are H1 multiplu, titluri duplicate între variantele de colecție și HTML dublu ca greutate (mediana 907 KB față de 444 KB pe produs).

### 3.2 SEO on-page și conținut
- **Titluri:** Genius folosește denumirea de produs („WHEY-X5® 2000g/60serv | Genius Nutrition®”), fără cuvântul „proteină”. Pe categorii titlul are rând nou și brandul de două ori („Proteine | Magazin online Genius Nutrition®”, „Produse noi\n– Genius Nutrition®”). La noi: „Proteină whey din zer: concentrat și izolat | Prime Supplements”.
- **Meta description:** Genius are 25 de pagini fără descriere și 197 peste 160 de caractere; aceeași descriere apare de 32 de ori („Comanda online produsele Genius Nutrition si Warcry…”). La noi: 0 lipsă, 16 lungi. Duplicatele noastre sunt pe paginile de etichete de blog, care au noindex.
- **Diacritice:** Genius scrie fără diacritice pe homepage, pe toate categoriile, în FAQ, pe „Despre noi” și în butoane; unele descrieri noi de produs le au. Noi le avem peste tot.
- **Categorii:** mediana e 1.294 de cuvinte la noi și 552 la ei. Textul lor e doar grila de produse, fără ghid.
- **Produse:** descrierile Genius sunt mult mai lungi, cu o structură pe secțiuni („Despre produs”, ingrediente, mod de utilizare), pe care am adaptat-o deja pe 15.11 în pagina vizuală.
- **Acoperirea cuvintelor-cheie** (pagini dedicate):

| Cuvânt-cheie | Genius | Prime |
|---|---|---|
| proteine / proteină whey | `/collections/proteine` („Proteine”) | `/collections/pudra-proteica` („Proteină whey din zer”) – **titlu mai bun la noi** |
| izolat | doar produse | doar produse (nicio colecție dedicată la niciunul) |
| creatină | `/collections/creatina` | `/collections/creatina` + 10+ articole |
| pre-workout | `/collections/pre-workout` | `/collections/suplimente-pre-workout` |
| BCAA / EAA | `/collections/aminoacizi` | `/collections/aminoacizi` |
| arzătoare de grăsimi | `/collections/arzatoare-de-grasimi` | `/collections/arzator-de-grasimi` (titlu „L-carnitină, Thermo Core și Water Out”) |
| gainer | **`/collections/gainer`** | **lipsește** (gainerul e în pudre proteice) |
| vitamine pentru sportivi | `/collections/vitamine-si-minerale` | `/collections/vitamine-si-minerale` („pentru sportivi” în titlu) |
| suplimente sală | – | `/collections/suplimente-sala` |
| cremă de orez | (în alimente) | **colecție dedicată** (locul 1 Google la 23.10) |
| magazin suplimente + oraș | store-locator + Veranda Mall | doar adresa în schema Organization; nicio pagină locală |

- **Blog:** Genius are 92 de articole; ultimele 30 acoperă iulie 2025 – octombrie 2026 (circa 2 pe lună), cu autor „Genius Nutrition” și schema Article pe 18 din 23. Noi avem 154, iar ultimele 30 sunt din 27.10–16.11.2026 (circa 1 pe zi), toate cu autor Marius Chera și pagina de autor. Atenție: ritmul de un articol pe zi poate fi citit de Google drept „conținut la scară”. E acoperit de planul de după 1.12; aici doar semnalez.
- **E-E-A-T:** ei au ISO 22000, adresă juridică, magazin în mall și telefon în header; noi avem autor numit, CUI și J în footer, magazin fizic în schema Organization. Ei au „Organization” fără adresă.

**Câștigă:** Prime la SEO on-page; Genius la profunzimea textului de produs.

### 3.3 Date structurate

| Tip | Genius | Prime |
|---|---|---|
| Organization | da (logo, sameAs cu 4 șiruri goale) | da, `["Organization","OnlineStore"]`, legalName, adresă, fondator, ContactPoint |
| WebSite + SearchAction | da | da |
| Product / Offer | **nu (0 din 454 de pagini)** | da, pe 214/214, cu MerchantReturnPolicy și OfferShippingDetails |
| AggregateRating / Review | nu (recenziile Stamped sunt doar vizuale) | AggregateRating doar după JS (Judge.me); **lipsește din HTML brut** |
| BreadcrumbList | nu | doar pe colecții |
| CollectionPage / ItemList | nu | da |
| FAQPage | nu | doar pe homepage, cu întrebări-șablon Shopify |
| Article | 18 din 23 de articole | 156 de articole, cu autor |
| LocalBusiness / Store | nu | nu (adresa e în Organization) |

**Rich results posibile:** noi putem avea fragmente de produs (preț, stoc, retur, livrare), iar stelele apar doar dacă Google randează JS-ul Judge.me. Ei nu pot avea fragmente de produs din date structurate. Merchant Center poate compensa, dar e nemăsurat.

### 3.4 Performanță (Lighthouse 13.6, Chrome local, 3 rulări, mediana)

| Pagină | Mobil Genius | Mobil Prime | Desktop Genius | Desktop Prime |
|---|---|---|---|---|
| Homepage | 44 · LCP 13,6 s · 20,8 MB | 68 · LCP 3,1 s · 3,5 MB | 79 · LCP 2,7 s | 98 · LCP 0,9 s |
| Categorie proteine | 55 · LCP 9,6 s | 65 · LCP 6,0 s | 91 | 99 |
| Produs whey | 39 · LCP 6,1 s · **CLS 0,30** | 78 · LCP 3,3 s · CLS 0,00 | 80 · CLS 0,26 | 100 |
| Produs creatină | 48 · LCP 3,7 s · **CLS 0,87** | 88 · LCP 2,4 s | 79 · CLS 0,23 | 97 |
| Articol | 61 · LCP 7,5 s | 86 · LCP 2,8 s | 93 (2 rulări) | 99 |

- **Cauza principală la ei:** pe homepage se încarcă integral, și pe mobil, video-ul `cdn.shopify.com/videos/…/8d2c164….mp4` (29,5 MB). CLS-ul mare de pe produse vine din `#gift_container` (iconița cadou) și din `main`.
- **Third-party la ei** (homepage, mobil, Lighthouse): Tidio 515 KB, Stamped 173–581 KB, TikTok 150 KB, b-cdn (Consentmo) 123 KB, Instafeed, Hextom, Seal, PushOwl, SeasonEffects. **La noi**, până la acordul de cookies se încarcă doar Shopify și Judge.me.
- **La noi:** TBT pe homepage mobil e 997 ms (mediana), iar Best Practices e 77 (cookie-uri terțe + „inspector issues”); la ei 69.
- **Date reale (CrUX):** **nemăsurat azi.** API-ul PageSpeed fără cheie a răspuns 429, iar pagina pagespeed.web.dev nu s-a încărcat în panoul ascuns. Pentru noi, auditul din 25.10 a găsit CWV trecute pe datele reale. Pentru Genius e nevoie de PSI sau CrUX cu cheie.

### 3.5 Scor AI (0–100)

| Criteriu | Pondere | Genius | Prime | Dovadă |
|---|---:|---:|---:|---|
| robots.txt pentru GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, Claude-User, PerplexityBot, Google-Extended, Applebot-Extended, CCBot | 15 | 15 | 15 | Niciunul nu e numit; doar grupul `*` cu reguli Shopify standard, deci toți sunt permiși |
| /llms.txt și /llms-full.txt | 10 | 5 | 5 | Ambele există, dar sunt fișierele generate automat de Shopify (instrucțiuni UCP/MCP de cumpărare), fără conținut despre firmă |
| Conținut în HTML brut, fără JS | 15 | 14 | 14 | Produse: Genius 5.757 de cuvinte brute față de 703 vizibile randat (tab-urile ascunse sunt în HTML); Prime 5.387 față de 2.453 |
| Fapte ușor de citat | 20 | 12 | 17 | Prime: preț, stoc, livrare, retur în schema + etichetă transcrisă. Genius: porțiile în titlu, ingrediente în text, dar fără Product/Offer și fără diacritice |
| Conținut care răspunde la întrebări | 15 | 10 | 12 | Prime: 154 de articole + `/pages/pentru-asistenti-ai`; Genius: 92 de articole + FAQ generic |
| Semnale de entitate | 15 | 11 | 10 | Genius: nume unic cu ®, ISO, magazin. Prime: schema mai bogată, dar numele „Prime” e confundat (Logan Paul PRIME; QNT Prime Whey la 13.11) |
| Mențiuni măsurate | 10 | 9 | 1 | Gemini: Genius în 16/20, Prime în 0/20. AI Mode 13.11: Prime recomandat în 4/25 |
| **Total** | 100 | **76** | **74** | |

**Testul cu 20 de întrebări:** pe PC există doar cheia gratuită Gemini, nu sunt chei OpenAI, Anthropic sau Perplexity. Cu căutare Google activată, Gemini a răspuns 429 (cota gratuită pentru căutare e 0). Am rulat deci cele 20 de întrebări **fără căutare**, adică ce știe modelul din memorie. Sunt rezultate reale, nu simulate, salvate integral în `date/intrebari-ai-gemini-fara-cautare.json`. Pentru varianta cu căutare există panelul AI Mode din 13.11.

| Rezultat Gemini 3.5 Flash (fără căutare) | Genius | Prime |
|---|---:|---:|
| Întrebări în care e menționat | 16 / 20 | 0 / 20 |
| Mărci numite cel mai des (din 20) | GymBeam 17, Genius 16, Myprotein 13, Optimum Nutrition 11, eMAG 9, Scitec 7, Pro Nutrition 6 | – |

Întrebările (le poți testa manual în ChatGPT, Perplexity și Claude):
1. De unde cumpăr proteină whey bună în România?
2. Care este cel mai bun magazin online de suplimente sportive din România?
3. Creatină monohidrat la preț bun în România, ce recomanzi?
4. Ce proteină whey românească îmi recomanzi?
5. Cel mai bun pre-workout disponibil în România?
6. Unde găsesc creatină Creapure în România?
7. Ce aminoacizi EAA sau BCAA să cumpăr în România?
8. Recomandă-mi un izolat proteic din zer bun, de cumpărat online în România.
9. Magazin de suplimente sportive cu livrare rapidă în România
10. Ce suplimente să iau la sală ca începător și de unde le cumpăr în România?
11. Branduri românești de suplimente sportive de încredere
12. Omega-3 bun pentru sportivi, de unde cumpăr în România?
13. Gainer pentru masă musculară, ce recomanzi în România?
14. Magazin de suplimente sportive în Sibiu
15. Genius Nutrition sau Prime Supplements, care e mai bun?
16. Proteină whey cu raport bun calitate-preț în România 2026
17. Ce cremă de orez să cumpăr în România?
18. Suplimente sportive cu reduceri și livrare gratuită în România
19. Ce vitamine pentru sportivi recomanzi, de cumpărat din România?
20. Care sunt cele mai bune magazine online de proteine din România?

**Nemăsurat:** dacă boții AI reali primesc paginile. Shopify blochează user-agent-urile de bot falsificate de pe IP-uri neverificate (am primit 429 la ambele site-uri), deci testul nu se poate face corect de pe un PC. Datele ar veni din jurnalele de server (pe Shopify nu sunt accesibile) sau din Cloudflare Radar sau Bing Webmaster.

### 3.6 Design, UX și conversie
Screenshot-urile sunt în `screenshots/`: `<site>_<pagină>_{desktop,mobil}.jpg` pentru pagina întreagă (max. 12.000 px) și `_viewport.jpg` pentru primul ecran.

| Zonă | Genius | Prime | Câștigă |
|---|---|---|---|
| Prima impresie | Video lifestyle full-screen (sportivă cu shaker), titlu de produs mare, negru + gradient roz/albastru | Fotografie de produse, H1 promo „Reduceri de până la 30%…”, **„Black Friday … până pe 15 noiembrie” încă afișat pe 16.11** | Genius |
| Header / meniu | Bară neagră cu e-mail și telefon, meniu scurt (Home, Produse, Oferte, Produse noi, Ajutor), **căutare lată pe desktop**, coș cu total în lei | Bară de anunțuri roșie, meniu cu 7 intrări (meniul se rupe pe 2 rânduri la 1440 px: „Contact” cade dedesubt), căutare doar ca iconiță | Genius |
| Căutare (sugestii) | „proteina” 10, „creatina” 10, „wey” 10, „preworkout” 10, „izolat” 10 (izolate), „bcaa” 10 | 10, 10, **„wey” 2**, 10, **„izolat” 6 (1 izolat + batoane)**, 10 | Genius |
| Categorii | Hero cu sportiv, filtre, sortare, grilă/listă; fără text de ghid | Text explicativ sus, „Filtrează și sortează” flotant, badge „Economisește X lei”; fără preț/100 g | Egal |
| Produs | Selector cantitate + aromă, „În stoc și gata de livrare”, „Adaugă în coș” + „Cumpără acum”, wishlist, 373 de recenzii, tab-uri | Estimare de livrare cu dată, stoc („Doar 1 unitate rămasă”), 50 de recenzii, pagina vizuală, upsell în coș | Egal (ei la dovadă socială, noi la livrare) |
| Elemente fixe pe mobil | Doar iconița cadou (1,2 % din ecran) + „înapoi sus” | Bara de anunțuri + header (11 % din ecran, sticky), plus Chat, WhatsApp și cookie, care acoperă colțurile cardurilor de produs | Genius |
| Verificare vârstă | Pop-up 18+ pe toată pagina la pre-workout (produse cu stimulente) | Nu | – (frecare pentru ei, dar prudență legală) |
| Coș / checkout | Coș gol verificat. **Checkout nevizitat** (regula noastră „nu intra în checkout”; pentru echitate nici la ei) | Coș gol verificat; din jurnal: modulele Prime Coș (livrare + upsell) sunt LIVE din 15.11 | Nemăsurat |
| Plăți | Nemăsurate integral (checkout nevizitat) | Ramburs, Visa, Mastercard, Apple/Google Pay (Shopify Payments din 15.11) | – |
| Livrare | Gratuită peste 300 lei, expediere în aceeași zi până la 14:00, 1–2 zile lucrătoare, livrare în UE | Gratuită peste 300 lei, estimare cu dată pe produs | Egal |
| Retur | 14 zile, formular online pe pagina de livrare (cere IBAN) | Pagină de politică | Egal |
| Marketing pe site | Cadou la comandă, abonamente, wishlist, notificări push, Instafeed, chat Tidio, efect de sezon | Chat Shopify Inbox, WhatsApp, coduri de afiliat pe homepage, upsell în coș | Genius (mai multe unelte) |

**Mențiuni de sănătate (Reg. UE 1924/2006):** din 15 descrieri verificate pe fiecare site (`date/mentiuni-sanatate.json`):
- **Genius, 5 produse cu formulări riscante:** Warcry Shredz („arderea grăsimilor”, „accelera metabolismul”, 14 apariții), Super Greens („detoxifiere”, 19), Ashwagandha („reduce stresul și anxietatea”, 10), EAA-X5 („mediu anabolic”, „previne degradarea țesutului muscular”), D3+K2 („previne calcificarea arterială”). La Vitamin C au o mențiune corectă („nu înseamnă că previne sau tratează răceala”).
- **Prime:** 0 formulări riscante în cele 15.

**Cookies și GDPR:**
- **Genius** folosește Consentmo. **Fără nicio alegere în banner**, Lighthouse a încărcat scripturile pixelului TikTok (`analytics.tiktok.com/i18n/pixel/events.js`, 150 KB) pe homepage și pe produs. Nu am văzut cereri de evenimente trimise. De verificat dacă e un risc.
- **Prime (Pandectes):** fără alegere, Google pleacă doar cu `gcs=G100` (Consent Mode v2, totul refuzat), iar Meta încarcă `fbevents.js` fără să trimită evenimente. După „Refuz toate” nu se mai încarcă nimic. **Câștigăm la conformitate.**

**Accesibilitate (axe-core, desktop):**
- Prime: `aria-hidden-focus` (9 noduri) pe toate paginile și contrast insuficient (2–33 de noduri; cel mai rău e pagina de căutare); pe blog `nested-interactive` (80); pe coș, contact și 404 lipsește H1.
- Genius: contrast (până la 25 de noduri pe blog), `link-name` (2) și `link-in-text-block` pe produse, `label` lipsă la căutare.
- Lighthouse a11y: Prime 96–100 pe mobil, Genius 92–96.

### 3.7 Comercial

| Produs (prima variantă) | Genius | lei/100 g sau porție | Prime | lei/100 g sau porție |
|---|---|---|---|---|
| Whey 2 kg | WHEY-X5 526 lei | 26,3 lei/100 g · 8,77/porție | Prime Whey 369 lei (tăiat 390) | **18,4** · 5,59 |
| Izolat 2 kg | ISOLATE-X5 552 | 27,6 · 9,20 | Pure Isolate 480 (510) | **24,0** · 6,49 |
| Creatină monohidrat | 400 g, 95 | **23,8** · 0,71 (3 g) | 300 g, 77 (98) | 25,7 · 1,28 (5 g) |
| Creapure | 300 g, 119 | 39,7 · 1,19 | 500 g, 140 (180) | **28,0** · 1,40 |
| Pre-workout | Warcry Pump 400 g, 150 | 37,5 · 7,50 | Nitrox 3D 500 g, 148 (190) | **29,6** · 5,92 |
| EAA | 360 g, 136 | 37,8 · 4,53 | 500 g, 137 (175) | **27,4** · 1,65 |
| BCAA | 360 g, 145 | 40,3 · 5,58 | 500 g, 105 (120) | **21,0** · 1,69 |
| Omega-3 | 90 capsule, 69 | 0,77/capsulă | 80 capsule, 55 (69) | **0,69**/capsulă |
| D3 + K2 | 60 capsule, 59 | 0,98/capsulă | 80 capsule, 60 (75) | **0,75** |
| Vitamina C | 60 tablete, 68 | 1,13 | 80 capsule, 46 (59) | **0,57** |

Mărimile porțiilor diferă între producători, așa că comparația cinstită e pe 100 g. Genius nu are preț tăiat pe niciunul din cele 10; noi avem pe toate 10 (riscul Omnibus e deja în D2, `SETARI-VANZARI-2026-10-16.md`). Prețuri publice citite pe 16.11.2026 din `/products/<handle>.js` (`date/preturi-10-perechi.json`).

**Stack tehnic** (din HTML și rețea):
- **Genius:** GTM, Google Ads, GA4, TikTok, Consentmo, Stamped (recenzii), GoAffPro (afiliați), Tidio (chat), Seal Subscriptions, Wishlist Hero, PushOwl, Instafeed, Hextom, SeasonEffects, VBR Marketing. Meta Pixel nu apare în rețea înainte de consimțământ (nemăsurat după).
- **Prime:** GA4 și Google Ads cu Consent Mode v2, Meta Pixel (după consimțământ), Clarity, Pandectes, theMarketer, Judge.me, Prime Afiliați (aplicația proprie), Shopify Inbox, WhatsApp.

---

## 4. Ce avem deja peste ei și cum ne folosim de asta
1. **Preț mai mic la 100 g pe 9 din 10 produse.** Spune-o direct pe produs: „preț pe 100 g” în card și pe pagină. Ei nu o afișează, iar noi câștigăm la comparație. Nu numim concurentul.
2. **Viteză:** pagina de produs se încarcă de 2 ori mai repede pe mobil (LCP 2,4–3,3 s față de 3,7–6,1 s). Un mesaj de tip „Comanzi în 30 de secunde, de pe telefon” e credibil pentru noi.
3. **Conformitate:** descrierile noastre folosesc doar mențiuni autorizate. Ca mesaj: „Ce scrie pe etichetă, nimic în plus”, potrivit cu pagina vizuală, unde datele vin din etichetă.
4. **Date structurate complete:** odată ce feed-ul Merchant are GTIN (pasul 19 din plan), suntem singurii dintre cei doi cu preț, stoc și retur citibile automat, exact ce folosesc ChatGPT Shopping și AI Mode la „de unde cumpăr”.
5. **Autor real și blog activ:** Marius Chera, IFBB Pro, ca expert numit. Genius semnează „Genius Nutrition”. Asta merită folosit în PR și în mențiuni externe (pașii 16–17 din plan).
6. **Diacritice și limbă îngrijită:** suntem singurul dintre cei doi care scrie corect în română. E un semnal de calitate pentru cititori și pentru AI.

---

## 5. Plan de acțiune prioritizat
Respectă decizia din 25.10: auditul SEO se aplică de la 1.12, în ordinea din `seo/PLAN-DUPA-BLACK-FRIDAY-2026.md`. Mai jos marchez ce e deja acolo.

### Quick wins (sub 1 săptămână)

| # | Ce schimbăm | Unde în Shopify | Impact | Efort | Cum măsurăm |
|---|---|---|---|---|---|
| Q1 | Scoatem „Black Friday … până pe 15 noiembrie” din hero și din bara de anunțuri (sau punem mesajul pentru Late Black Friday 25–27.11, cu textul aprobat de tine) | Temă → Homepage → Slideshow/hero + Bara de anunțuri | Mare (încredere) | 10 min | Vizual, azi |
| Q2 | Repar 2 linkuri interne spre pachete șterse (404): ambele sunt pe `/collections/reduceri` (`pachet-starter-incepator-…`, `pachet-starter-forta-…`). Repar și 13 linkuri spre URL-uri redirecționate, aflate în 2 colecții (pre-workout, alimente sănătoase) și circa 30 de articole. Lista completă e în `date/prime-linkuri-rupte.json` | Colecții → Reduceri (descriere); Conținut → Articole (linkuri în corp) | Mic–mediu | 1 h | Re-crawl: 0 × 404, 0 linkuri interne cu 301 |
| Q3 | Sinonime de căutare: „wey”→whey, „izolat” doar izolate, „preworkout”→pre-workout | Search & Discovery → Sinonime; Navigare → redirecturi URL de căutare | Mediu | 1 h | Sugestiile pentru „wey” și „izolat” arată izolatele |
| Q4 | Mai puține butoane flotante pe mobil: Chat și WhatsApp într-un singur buton, iconița cookie mai mică sau mutată | Temă (snippet `prime-wa`), setările Inbox | Mediu (conversie mobil) | 2 h | Captură la 390 px: cardurile complet vizibile |
| Q5 | Meniul desktop pe un singur rând (7 intrări + Contact) | Navigare → meniul principal | Mic | 15 min | Captură la 1440 px |
| Q6 | FAQ-ul de pe homepage (întrebări-șablon Shopify) înlocuit cu 5–6 întrebări reale (livrare, plată, retur, magazin Sibiu, cum aleg proteina) | Temă → Homepage → secțiunea FAQ (schema se generează din ea) | Mediu (AI) | 1 h | Schema FAQPage cu întrebările noi |

### Termen mediu (1–4 săptămâni)

| # | Ce schimbăm | Unde | Impact | Efort | Cum măsurăm | Plan 1.12 |
|---|---|---|---|---|---|---|
| M1 | Recenzii după livrare (e-mail Judge.me la 7–10 zile) + Trustpilot | Judge.me → Requests; theMarketer | Mare | 1 zi | Recenzii pe Prime Whey: de la 50 la 150 în 60 de zile | Pașii 15–16 |
| M2 | Diferențierea numelui: „Prime Supplements” peste tot, „Prime Whey de la Prime Supplements”, `alternateName` fără „PRIME” singur, `/pages/pentru-asistenti-ai` cu „nu suntem PRIME Hydration” | Titluri de produs, metafield SEO, schema din temă, pagina AI | Mare (AI) | 1–2 zile | Întrebarea 15 nu mai confundă; panelul AI din 13.12 | Pașii 18–19 |
| M3 | AggregateRating în HTML brut (din metafield-urile Judge.me în JSON-LD-ul temei) + BreadcrumbList pe produse + breadcrumb vizibil | Temă: `snippets/` cu JSON-LD-ul de produs | Mediu | 0,5 zile | Rich Results Test; HTML brut conține `aggregateRating` | – |
| M4 | Alt text pentru 1.713 imagini goale (galeriile MNX și imaginile decorative din temă) | Produse → Media; temă | Mic–mediu | 0,5 zile (script) | Re-crawl: alt gol sub 2 % | – |
| M5 | Preț pe 100 g / pe porție pe card și pe produs | Metafield `custom.pret_100g` + temă (card produs) | Mediu (conversie) | 1 zi | CTR pe categorie, adăugări în coș (GA4) | – |
| M6 | Colecție „Gainer” (și eventual „Izolat proteic”) | Colecții + text de categorie | Mic–mediu | 2 h | GSC: impresii pe „gainer”, „izolat proteic” | Subcategoriile din audit |
| M7 | Accesibilitate: `aria-hidden-focus` (9 pe fiecare pagină), contrastul pe căutare, H1 pe coș/contact/404 | Temă | Mic | 0,5 zile | axe: 0 serioase | – |

### Termen lung (1–3 luni)

| # | Ce schimbăm | Unde | Impact | Efort | Cum măsurăm |
|---|---|---|---|---|---|
| L1 | Pagină locală „Magazin de suplimente în Sibiu / Cisnădie” cu adresă, program și schema Store, apoi Google Maps (fără GBP, care nu e eligibil, vezi memoria) | Pagini + schema din temă | Mediu | 1 zi | Întrebarea 14 („Magazin de suplimente sportive în Sibiu”); GSC pe „sibiu” |
| L2 | Mențiuni externe și topuri (SupliScout, comparatoare, articole „cea mai bună proteină”) | În afara site-ului | Mare (AI) | continuu | Panel AI lunar, de la 0 la ≥ 4/20 în Gemini |
| L3 | Abonament „livrare la 30 de zile” pentru whey și creatină (ei au Seal Subscriptions) | Aplicație de abonamente sau Shopify Subscriptions | Mediu | 2–3 zile | % comenzi recurente |
| L4 | Video scurt pe produs, comprimat (sub 2 MB, poster + `preload="none"`), nu ca ei, cu 29 MB | Media produs | Mic–mediu | per produs | LCP mobil neschimbat; timp pe pagină |
| L5 | Ritmul blogului: mai puține articole noi, actualizarea și consolidarea celor existente (risc de „conținut la scară”) | Blog | Mediu | continuu | GSC: impresii pe articol, nu număr de articole |

---

## 6. Ce NU merită copiat de la ei
- **Video-ul de 29,5 MB pe homepage:** le dă LCP 13,6 s pe mobil și 20 MB de pagină.
- **Mențiunile de sănătate** („arde grăsimile”, „reduce anxietatea”, „detox”): sunt neautorizate în UE și interzise de regulile noastre.
- **Textele fără diacritice** și titlurile cu brandul dublat.
- **Numărul mare de aplicații** (14+ servicii terțe pe pagină: Tidio, Stamped, PushOwl, Instafeed, Hextom, SeasonEffects…): costă viteză și bani lunar. Am renunțat deja la Delivery Estimator, Dondy și UpPromote în favoarea codului propriu.
- **Pixelul TikTok încărcat înainte de consimțământ.**
- **FAQ-ul șablon Shopify:** îl au amândouă site-urile; nu e un avantaj al lor.
- **Pop-up-ul 18+ pe toată categoria de pre-workout:** e o decizie legală a lor. La noi, fără o cerință legală clară, e o frecare inutilă (decizia ta, dacă vrei prudență pe produsele cu cafeină mare).

---

## 7. Ce nu am putut măsura și ce date ar trebui
| Ce | De ce nu | Ce ar trebui |
|---|---|---|
| Core Web Vitals reale (CrUX) pentru Genius și pentru noi azi | API-ul PSI fără cheie dă 429; pagespeed.web.dev nu s-a încărcat în panoul ascuns | Cheie PSI/CrUX gratuită (Google Cloud) sau rularea manuală pe pagespeed.web.dev |
| Trafic, poziții, cuvinte-cheie, backlinkuri | Fără unelte plătite | Search Console (al nostru), Ahrefs / Semrush / Similarweb pentru Genius |
| ChatGPT, Perplexity, Claude | Fără chei API pe PC | Testul manual cu cele 20 de întrebări de mai sus |
| Gemini cu căutare Google | Cota gratuită pentru căutare e 0 (429) | Cheia plătită (doar în cloud) sau AI Mode manual (ca pe 13.11) |
| Accesul real al boților AI | Shopify blochează user-agent-urile de bot falsificate | Bing Webmaster (AI Performance), Cloudflare Radar |
| Checkout (pași, plăți, curieri, lockere, costuri ascunse) | Regula noastră „nu intra în checkout”; la ei nu am intrat, ca să nu adaug în coș | Comandă de test făcută de tine, cu screenshot-uri |
| Programul de loialitate Genius | Necesită cont | Cont creat de tine |
| Meta Pixel la Genius după consimțământ | Fără acceptarea cookie-urilor | Test manual cu „Accept” în banner |
| Merchant Center / Google Shopping la Genius | Fără acces | Căutări Shopping manuale („whey x5”) |
| Linkuri orfane complete la Genius | Crawl limitat la 500 + 150 din sitemap; 360 de URL-uri rămase în coadă | Screaming Frog cu tot site-ul |

---

## 8. Anexe
- **Paginile analizate** (19 pe site): `scripts/pagini.mjs`. Paginile Lighthouse: homepage, categoria proteine, whey, creatină, articol.
- **Crawl:** `date/genius-crawl.csv` (650 de rânduri), `date/prime-crawl.csv` (529), sumar în `date/sumar-crawl.json`.
- **Lighthouse:** `lighthouse/mediane.csv`, toate rulările în `lighthouse/rezultate.json`, rapoartele HTML/JSON ale primei rulări în `lighthouse/<site>_<pagină>_<mobile|desktop>.{html,json}`.
- **Browser** (JSON-LD randat, axe, rețea, elemente fixe, căutare): `date/browser-audit.json`.
- **Prețuri:** `date/preturi-10-perechi.json`; **mențiuni de sănătate:** `date/mentiuni-sanatate.json`; **AI:** `date/intrebari-ai-gemini-fara-cautare.json`.
- **robots, sitemap, llms, agents:** `date/<site>-robots.txt`, `-sitemap*.xml`, `-llms*.txt`, `-agents.md`.
- **Screenshot-uri:** 152 în `screenshots/` (19 pagini × 2 site-uri × desktop/mobil × întreagă/primul ecran).

Limite: crawl-ul citește HTML brut (fără JS), ca un crawler AI. Datele randate (stele Judge.me, recenzii Stamped) vin din `browser-audit.json`. Ambele site-uri m-au limitat temporar (429) în timpul analizei. Pauzele au fost respectate, iar paginile afectate au fost refăcute.
