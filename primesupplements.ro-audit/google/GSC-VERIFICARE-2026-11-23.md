# Search Console – verificarea programată din 23.11.2026 (doar citire)

A treia măsurătoare după raportul complet din 26.10 (`SEARCH-CONSOLE-RAPORT-COMPLET-2026-10-26.md`, țintele din §11) și verificarea din 09.11 (`GSC-VERIFICARE-2026-11-09.md`). Închide „Verificare GSC 23.11” din `DE-FACUT.md` punctul 14 și dă cifrele de pornire pentru `seo/PLAN-DUPA-BLACK-FRIDAY-2026.md` (începe pe 1.12.2026). Nimic nu a fost modificat în GSC, Shopify sau pe site.

**Cum s-a citit:** browserul încorporat al aplicației cere din nou autentificarea Google (sesiunea e expirată, ca pe 09.11; parola nu se introduce de către Claude). Raportul a fost citit din Chrome-ul lui Marius (Claude in Chrome, `authuser=1`), apoi tabul a fost închis. Date GSC: Pages actualizat 16.11, Shopping 22.11, Performance 25.10–21.11 (28 de zile).

## 1. Tabelul 26.10 vs 09.11 vs 23.11

| Indicator | 26.10 | 09.11 | 23.11 | Ținta (§11) | Stare |
|---|---:|---:|---:|---|---|
| **Indexare** | | | | | |
| Pagini indexate | 821 | 609 | **605** | – | stabil (214 produse, 277 articole, 19 colecții, 12 pagini, 57 URL-uri cu parametri, 12 `account.*`) |
| … din care b2b.primesupplements.ro | ~110 | 7 | **4** | 0 | aproape închis |
| … din care /ro-hu/ | 4 | 6 | 4 | 0 | – |
| „Not found (404)” | 73 | 86 | **74** | < 40 | ✗ neatins (vezi §2) |
| „Duplicate, Google chose different canonical” (toate /ro-hu/) | 417 | 312 | **283** | < 50 | ✗ scade încet (~15 pe săptămână) |
| „Page with redirect” | 565 | 809 | **840** | – | corect (redirecturi + ro-hu + www) |
| „Crawled – currently not indexed” | 201 | 314 | **341** | – | 114 b2b, 112 `/cdn…`, 40 www, 25 ro-hu, 20 cu parametri, 13 old, 9 feed-uri; pagini reale doar 6 (§2) |
| „Discovered – currently not indexed” | 4 | 8 | **10** | – | 9 pachete care azi dau 404 + `/agents.md` |
| „Blocked by robots.txt” | – | 887 | 1.061 | – | URL-uri de sistem Shopify, nimic de făcut |
| Neindexate (total) | 1.704 | 2.730 | ~2.900 | – | creșterea vine din robots + redirecturi |
| **Shopping** | | | | | |
| Product snippets valide | 82 | 94 | **64** | 150 | ✗ scădere (§3) |
| … „Missing aggregateRating / review” | 41 | 49 | 27 | – | scade odată cu totalul |
| … „Invalid price format highPrice/lowPrice” | 7 | Passed | Passed (0) | – | ✅ |
| Merchant listings valide | 75 | 94 | **64** | 150 | ✗ scădere (§3) |
| … „Missing validFrom” (informativ) | 75 | 94 | 64 | – | – |
| **Performance (web)** | 13 zile | 28 zile | 28 zile | | |
| Clicuri / afișări | 699 / 37,1 K | 2.070 / 95,1 K | **2.445 / 113 K** | – | – |
| Clicuri pe zi | ~54 | ~74 | **~87** | 120+ | ↑ dar vârful a fost 1–10.11 (§4) |
| CTR mediu | 1,9 % | 2,2 % | **2,2 %** | 3 % | ✗ pe loc |
| Poziție medie | 7,8 | 7,9 | **8,1** | ≤ 6,5 | ✗ pe loc |
| Clicuri pe `/products/` + `/collections/` | ~150 / 13 zile | – | **683 / 28 zile** (44,4 K afișări) | ×2 | ✅ ~×2 pe zi (include și căutările de marcă) |
| Search appearance – Merchant listings | 12 afișări / 1 clic | 20 / 5 | **15 afișări / 5 clicuri** | 500+ afișări | ✗ neschimbat |
| Search appearance – Product snippets | – | 567 clicuri / 25.852 afișări | 597 / 25.608 (CTR 2,3 %, poz. 10,3) | – | stabil |
| Search appearance – Review snippet | – | 5 / 269 | 7 / 313 | – | – |
| **Crawl (ultimele 90 de zile)** | 21.10 | | 23.11 | | |
| Cereri de crawl, total | 8.050 | – | **34.900** (3,03 GB, 289 ms) | – | de 4 ori mai mult crawl |
| primesupplements.ro | 7.167 | – | 31.009 | – | OK |
| b2b.primesupplements.ro | 613 | – | **2.585** („Problems last week”) | 0 | ✗ CNAME-ul există încă |
| www.primesupplements.ro | 217 | – | 1.036 | – | OK (redirecturi) |
| old.primesupplements.ro | 54 | – | **166** („Problems last week”) | 0 | ✗ DNS-ul există încă |
| account.primesupplements.ro | 3 | – | 72 | – | OK |
| Răspunsuri: 200 / 301 / 404 | 82 % / 13 % / 4 % | – | **78 % / 12 % / 4 %** + robots.txt indisponibil 5 % | – | cei 5 % sunt b2b |
| **Linkuri** | | | | | |
| Linkuri externe, total | 53 | – | **72** | – | ↑ |
| Domenii externe | 5* | – | **18** | 15 | ✅ (cu rezerva de mai jos) |
| Linkuri interne | 24.537 | – | 19.820 | – | scădere după curățenia B2B/Ungaria din temă |

\* Pe 26.10 s-a notat doar cardul „Top linking sites” (primele 5), deci „5” era probabil subestimat; cele 18 de azi sunt lista completă.

## 2. Indexare – ce e în spatele cifrelor

**404 (74).** Vestea bună: cele 12 pachete Reduceri din 09.11 nu mai sunt în listă (sunt din nou active; `/collections/reduceri` are 15 produse), iar tricoul „Made of Iron” redirecționează acum către „Suffer to Dominate”. Lista de azi: 21 adrese vechi WooCommerce/www (feed-uri, `my-account`, `megamenus` – rămân 404, corect), 20 de articole și 7 adrese de produs/colecție trunchiate care au redirect 301 din 26.10, dar Google nu le-a mai vizitat de atunci (ultimul crawl iunie–octombrie), 7 adrese de sistem (`/cdn`, `/wpm`, `/api/event/collect`), 3 /ro-hu/, 1 b2b. Doar 10 din listă au fost vizitate după 26.10. Concluzie: ținta „< 40” depinde de ritmul de re-crawl al Google, nu de noi; „Validate fix” pe 404 ar grăbi verificarea.

**404 noi care încă nu apar în GSC** (verificat live azi): cele 11 pachete Black Friday (acum Draft) și cele 4 pachete permanente vechi (Energy, Focus, Pump, Strength) dau 404 fără redirect. 9 dintre ele sunt deja în „Discovered – not indexed”, restul vor intra la „Not found”. Nu au apucat să fie indexate, deci pierderea e mică, dar e curat să primească redirect către pachetul echivalent sau către `/collections/reduceri`.

**Crawled – not indexed, pagini reale (6):** `mnx-golden-era-cotton-shorts-rosewood`, `mnx-shorts-golden-era-2-0-red` (aceleași 2 haine MNX fără text), 2 pachete noi din 16.11 (`pachet-pre-workout-power-nitrox-3d-creatina-creapure`, `pachet-rutina-zilnica-omega-3-magneziu-vitamina-c`), articolul `gainerul-te-ingrasa-surplus-caloric-sau-grasime` și un articol vechi „instant-oat-cream…”. Plus `/llms.txt` și `/llms-full.txt` (normal).

**B2B și old.** În index au rămas 4 adrese b2b (2 colecții, 2 produse). Dar `nslookup b2b.primesupplements.ro` răspunde încă (`shops.myshopify.com`), așa că Google continuă să încerce: 2.585 de cereri în 90 de zile și 5 % din tot crawlul se lovește de „robots.txt indisponibil”. La fel `old.primesupplements.ro` (89.42.218.88, 166 de cereri). Ambele se sting doar când Marius șterge cele două înregistrări DNS.

## 3. Shopping – scăderea de la 94 la 64

Graficul din GSC arată vârful de ~106 produse valide în jurul datei de 15.11 și coborârea la 64 până pe 20–22.11, identic în ambele rapoarte, cu 0 erori critice. Verificat live azi pe 7 produse (Creapure, Pure Isolate, EAA, Daily Vitamin, Prime Whey 2 kg, Thermo Core, un short MNX): toate au `Product` + `Offer` cu preț, monedă și disponibilitate, plus `aggregateRating` unde există recenzii. Deci marcajul nu e stricat.

Cauza nu e confirmată. Coincide în timp cu trei lucruri din 15–16.11: scoaterea celor 11 pachete Black Friday și a 4 pachete vechi, publicarea temei cu schema nouă (16.11) și înlocuirea a 140 de poze de produs. Ipoteza cea mai plauzibilă: Google re-evaluează produsele după aceste schimbări și cifra revine. De verificat din nou la pasul 1 (1.12): dacă e tot sub 90, se rulează Rich Results Test pe 3–4 produse care lipsesc din lista „valid”.

Observație, fără nicio modificare: Prime Whey 2 kg apare azi „OutOfStock” în datele structurate (stocul vine din Oblio).

Merchant listings ca apariție în căutare: 15 afișări în 28 de zile. Ținta de 500+ nu se atinge din GSC, ci din Merchant Center (pasul 19).

## 4. Performance, 25.10–21.11

**Pe zile:** 25–31.10 ≈ 64 clicuri/zi; 1–10.11 ≈ 122/zi (vârf 163 pe 5.11, perioada pachetelor Black Friday); 11–19.11 ≈ 76/zi; 20–21.11: 44 și 46 (ultimele zile sunt de obicei incomplete în GSC). Media de 87/zi e trasă în sus de prima decadă din noiembrie; nivelul „normal” de acum e ~75/zi, față de ~54 pe 26.10.

**Top 10 interogări fără numele mărcii (clicuri / afișări / CTR / poziție):**

| # | Interogare | Clicuri | Afișări | CTR | Poziție |
|---|---|---:|---:|---:|---:|
| 1 | crema de orez | 76 | 2.587 | 2,9 % | 3,3 |
| 2 | taur max contraindicatii | 15 | 490 | 3,1 % | 6,1 |
| 3 | adevarul despre spirulina | 15 | 456 | 3,3 % | 3,6 |
| 4 | thermo core | 13 | 952 | 1,4 % | 1,7 |
| 5 | crema orez | 13 | 212 | 6,1 % | 1,7 |
| 6 | mnx | 11 | 68 | 16,2 % | 2,6 |
| 7 | thermocore | 9 | 1.472 | 0,6 % | 3,1 |
| 8 | magneziu bisglicinat pareri forum | 8 | 62 | 12,9 % | 2,9 |
| 9 | combat pro | 8 | 23 | 34,8 % | 2,7 |
| 10 | glycerol | 7 | 139 | 5,0 % | 5,5 |

De reținut: „crema de orez” era pe poziția 1,6 pe 26.10 (1.323 afișări în 13 zile) și e acum pe 3,3 (colecția: 4.104 afișări, 130 clicuri, poziția 4,2). Afișările au rămas, poziția a coborât. „cream of rice” a crescut de la 18 la 695 de afișări (poziția 7,7). Căutările de marcă merg bine: „prime supplements” 325 clicuri, CTR 30 %.

**Paginile urmărite:**

| Pagina | 26.10 (13 zile) | 23.11 (28 zile) | Evoluție |
|---|---|---|---|
| `/collections/pudra-proteica` | 1.775 afișări, CTR 0,8 %, poz. 5,9 | 4.475 afișări, 70 clicuri, CTR 1,6 %, **poz. 4,2** | ✅ CTR dublu, +1,7 poziții |
| `/products/creatina-creapure` | poz. 12,0 | 743 afișări, 16 clicuri, CTR 2,2 %, **poz. 9,0** | ✅ +3 poziții |
| `/products/pure-isolate-2000g` | poz. 15,9 | 340 afișări, 7 clicuri, CTR 2,1 %, **poz. 17,7** | ✗ −1,8 |
| `/products/eaa-aminoacizi-esentiali` | poz. 24,3 | 384 afișări, 6 clicuri, CTR 1,6 %, **poz. 16,6** | ✅ +7,7, dar tot pagina 2 |
| `/products/daily-vitamin-formula` | 1.470 afișări, 2 clicuri, poz. 6,7 | 942 afișări, 17 clicuri, CTR 1,8 %, **poz. 4,4** | ✅ ținta de CTR ≥ 1,5 % atinsă |

Alte pagini utile pentru plan: `/collections/suplimente-pre-workout` 2.764 afișări, CTR 0,4 %, poziția 4,9; `/collections/suplimente-sala` 1.565 afișări, CTR 0,1 %, poziția 3,4; `/collections/reduceri` 1.704 afișări, CTR 0,7 %, poziția 1,9; `/products/thermo-core-120-caps` 3.588 afișări, CTR 0,6 %, poziția 2,6; `/products/prime-whey-2000g` 488 afișări, poziția 6,3; `/collections/creatina` 430, poziția 6,2.

**Termenii comerciali (afișări / poziție), 26.10 → 23.11:** creatina creapure 51 / 17,1 → 429 / 12,5; creapure 47 / 19,7 → 215 / 12,9; eaa aminoacizi 149 / 19,6 → 273 / 18,5; eaa 48 / 29,6 → 207 / 18,5; pre workout 194 / 12,9 → 513 / 12,1; preworkout 142 / 11,5 → 286 / 11,7; pre workout fara cofeina 28 / 27,6 → 144 / 15,0; suplimente sala 78 / 51 → 173 / 31,2; pudra proteica 81 / 22,5 → 16 / 32,4; unt de migdale 262 / 10,1 → 329 / 12,6; colagen hidrolizat 88 / 35,6 → 423 / 40,0; vitamins 399 afișări, 0 clicuri, poziția 6,6. Toți aceștia au 0–3 clicuri: sunt vizibili, dar pe pagina 2.

## 5. Linkuri

18 domenii: mataroa.blog 25, facebook.com 10, cylex.ro 8, qrl.ro 4, youtube.com 4, seomonitor.com 3, creapure.com 2 (26.10: 4), deschis.ro 2, ecomleaderboard.com 2, listafirme.ro 2, receptionerulvirtual.ro 2, targetare.ro 2, firmania.ro, liinks.co, linktr.ee, listafirme.eu, mcpbundles.com, storeleads.app câte 1. Cele noi sunt directoare și agregatoare, nu mențiuni editoriale; singurul link cu greutate rămâne creapure.com. Top pagini linkate: `/` 40, `creatina-creapure` 9, creatina monohidrată 4, Creatine Ready to Go 4, Pure Isolate 3.

## 6. Țintele din 26.10, la 4 săptămâni (din 8)

Atinse sau pe drum: b2b în index (110 → 4), clicurile pe produse și colecții (~×2), domeniile externe (18), CTR-ul pe Daily Vitamin și Pudră proteică, validările de preț.
Neatinse: 404 (74, ținta < 40), /ro-hu/ (283, ținta < 50), CTR mediu (2,2 % față de 3 %), poziția medie (8,1 față de ≤ 6,5), Merchant listings (15 afișări față de 500+), produse valide (64 față de 150), clicuri pe zi (~75–87 față de 120+).
Era de așteptat: tot ce mișcă CTR-ul și pozițiile a fost amânat pentru 1.12 prin decizia din 25.10.

## 7. Ce intră în planul din 1.12 (`seo/PLAN-DUPA-BLACK-FRIDAY-2026.md`)

1. **Pasul 1 (măsurătoarea de referință):** cifrele din acest fișier sunt punctul de pornire pentru GSC. De adăugat la pasul 1: re-verificarea Product snippets / Merchant listings (dacă sunt tot sub 90, Rich Results Test pe produsele lipsă).
2. **Pasul 2 (igienă):** 15 redirecturi 301 pentru pachetele scoase (11 Black Friday + Energy, Focus, Pump, Strength) către pachetul echivalent sau `/collections/reduceri` – cu „da” de la Marius; „Validate fix” pe „Not found (404)” ca Google să re-verifice cele ~27 de adrese care au deja redirect din 26.10; textele pentru cele 2 haine MNX neindexate.
3. **Pașii 4–5 (B2B, Ungaria):** rămâne un singur lucru, la Marius: ștergerea înregistrărilor DNS `b2b` (CNAME către shops.myshopify.com) și `old` (89.42.218.88). Până atunci b2b consumă 7 % din crawl. /ro-hu/ scade singur (283), nimic de făcut.
4. **Pașii 6–9 (produse):** ordinea propusă după GSC: Pure Isolate (poziția 17,7, singura pagină care a coborât), EAA (16,6), Creapure (9,0 → de dus în top 5; termenii „creapure” au de 4–8 ori mai multe afișări ca în octombrie), Thermo Core (3.588 afișări la CTR 0,6 % – doar titlu și meta), Cremă de orez (poziția pe „crema de orez” a coborât de la 1,6 la 3,3; textul „cream of rice” așteaptă aprobare din 23.10 și cererea a crescut la 695 de afișări).
5. **Pasul 11 (titlurile colecțiilor)** e cel mai mare câștig rapid: `suplimente-pre-workout` (2.764 afișări, CTR 0,4 %), `suplimente-sala` (1.565, 0,1 %), `reduceri` (1.704, 0,7 %), `pudra-proteica` (4.475, 1,6 %). La CTR 3 % ar însemna ~220 de clicuri în plus pe lună (315 în loc de 95) numai din aceste patru. E programat în ianuarie; titlurile SEO și meta-descrierile (fără H1 și fără temă) s-ar putea face deja în decembrie, dacă Marius aprobă.
6. **Pasul 19 (Shopping):** Merchant listings rămâne la 15 afișări pe lună; nu se rezolvă din GSC.
7. **Pasul 17 (linkuri):** 18 domenii, dar numai directoare; ținta reală e 3–5 mențiuni editoriale.

## 8. Rămân la Marius

- Ștergerea DNS pentru `b2b` și `old` (kemo.services).
- „Da” sau „nu” pentru cele 15 redirecturi ale pachetelor scoase.
- Autentificarea Google în browserul încorporat al aplicației (contact@), ca verificările viitoare să nu mai treacă prin Chrome.
- Din 26.10: mesajul necitit din GSC (G2), 2-Step Verification la adelina.fagaras@gmail.com în Ads.
