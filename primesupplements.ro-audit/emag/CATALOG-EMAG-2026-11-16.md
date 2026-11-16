# Catalogul Prime în eMAG Marketplace (16.11.2026)

Marius: „urca toate produsele din shopify in emag” și „construieste cel mai complet profil emag posibil imagineaza-ti ca esti agentul nostru de vanzari de pe emag”. Prețul: „preț site + comision”.

## Rezultat pe scurt
- **88 de oferte trimise** prin `product_offer/save` (aplicația Prime eMAG, releul cu IP fix), pentru **50 de produse** de suplimente și alimente din Shopify. Sunt toate variantele eligibile cu stoc, una per aromă sau gramaj.
- **10 sunt LIVE**: ofertele vechi cu documentație aprobată, acum cu prețul nou, stocul din Shopify și statusul activ. Exemplu: [Pure Isolate Ciocolată 2 kg](https://www.emag.ro/pure-isolate-ciocolata-2kg-6421766015185/pd/D34NF83BM/), la 621,99 lei, în stoc, „Vândut și livrat de PRIME SPORT SUPPLEMENTS SRL”.
- **78 sunt „În curs de validare”** la echipa de catalog eMAG: 76 de produse noi și cele 2 vechi respinse (Pure Isolate Caffè Latte și Salted Caramel), retrimise acum cu poze. Durata obișnuită e de 1–3 zile lucrătoare. Ce intră în vânzare după aprobare apare în eMAG → Produsele mele → Documentare aprobată.
- Nicio fișă n-a fost respinsă în momentul trimiterii. Respingerile apar, dacă apar, după revizia eMAG; se citesc cu `node citeste.mjs` (vezi „Cum se reia”).

## Regula de preț și stocul
- **Preț eMAG cu TVA** = preț site ÷ 0,82, rotunjit în sus la ,99 (comisionul eMAG e de 18 % la toate categoriile folosite). `sale_price` se trimite fără TVA (÷ 1,21). `min_sale_price` = −5 %, `max_sale_price` = +30 %.
- **Stocul** = `inventoryQuantity` din Shopify (gestiunea Oblio „online”), citit pe 16.11. Termen de expediere: 1 zi. TVA: `vat_id` 9 (21 %). Garanție: 0.
- **Atenție:** stocul din eMAG NU se sincronizează încă automat. Până la sincronizarea din aplicația Prime eMAG (pasul următor), o vânzare pe site nu scade stocul din eMAG.

## Ce conține fiecare fișă („profilul complet”)
- **Nume** în formatul eMAG: „Prime Supplements [produs] [aromă], [gramaj]”. eMAG scoate automat diacriticele din titlu.
- **Descrierea** din Shopify (doar mențiuni de sănătate autorizate UE, avertismentele obligatorii, ingrediente, alergeni, tabel nutrițional), curățată de linkurile interne ale site-ului.
- **Pozele** de pe CDN-ul Shopify: poza aromei e principală, urmată de pozele generale ale produsului.
- **Caracteristici**, toate verificate pe lista de valori permise a categoriei: formă, pentru (bărbați/femei), aromă, ingredient principal, utilizare (înainte/în timpul/după antrenament), recomandat pentru, tip administrare, „utilizat pentru” (doar unde există mențiune autorizată: magneziu și potasiu → sistemul muscular/nervos, zinc și vitamina C → imunitar, D3 → osos/imunitar, Omega-3 → cardiovascular; la plante doar „Sănătate zilnică”), număr de capsule, greutate/volum, conținut pachet.
- **Familii**, ca pagina eMAG să arate selectorul de aromă: Pure Isolate (7 arome), Prime Whey 2 kg (6), Prime Whey 1 kg (6), Prime Whey Go (5), EAA (4), Glutamină (5), Nitrox 3D (4), Combat Pro (4), Combat Pro 2.0 (2), Cluster Bomb (2), Emperor Mass (2), Oat Cream (2), Cremă de orez (4). Creapure e pe gramaj (500 g / 300 g).
- **GPSR**: producător = PRIME SPORT SUPPLEMENTS SRL (brandul propriu, cu adresa din Cisnădie și contact@), plus informațiile de siguranță (avertismentele de pe etichetă). Fabrica nu e menționată nicăieri.
- **Arzătoarele** (Water Out capsule și tinctură, Thermo Core, Fat Burning Booster) sunt în categoria „Produse detoxifiere și slăbire”, trimise ultimele. N-au nicio caracteristică de tip „beneficii” (control greutate, detoxifiere), iar descrierile nu conțin promisiuni de slăbire.

## Categorii eMAG folosite
Id-urile din anexa de comision (3593–3597, 2617, 3600) sunt `scm_id`-uri. În API, categoriile reale sunt:

| Anexă (scm_id) | Categorie API | Nume |
|---|---|---|
| 3593 | 4022 | Proteine |
| 3594 | 4023 | Amino acizi |
| 3595 | 4024 | Carbohidrați |
| 3596 | 4025 | Creatină |
| 3597 | 4026 | Alte suplimente nutriție sportivă |
| 2617 | 3039 | Alte suplimente alimentare |
| 3600 | 4029 | Produse detoxifiere și slăbire |

Vechile 4022/4025/4026 sunt aceleași categorii. Omega-3 și Daily Vitamin s-au mutat din 4026 în 3039 (vitamine și minerale), iar Pure Isolate din 4026 în 4022 (Proteine).

## De rezolvat (decizii sau acțiuni pentru Marius)
1. **3 EAN-uri sunt deja folosite în eMAG pentru alte produse.** Nu le-am urcat:
   - 6421766062530 (cutia de batoane cu caramel sărat) apare ca „Mănuși Pro Nutrition Women line”;
   - 0757226891324 (scorțișoara Ceylon) apare ca „Chili Jalapeno Bio 600 g” (OEM; eMAG blochează adăugarea);
   - 6421766015253 (Cluster Bomb Ananas) apare ca „Baton proteic Pronutrition Bar Ciocolată 55 g”.
   - Soluția: un tichet la eMAG (Mesagerie → Suport catalog), cu poza codului de bare, ca să corecteze EAN-ul pe produsul greșit. Altfel, EAN nou.
2. **Combat Pro, EAN 0704384490913:** în eMAG, oferta veche se numea „Combat PRO Mojito”, dar în Shopify acest EAN e aroma Forest Fruits (Mojito are 0704384490906). Am urcat după Shopify. **De verificat pe o cutie fizică** care aromă are codul ...913.
3. **2 EAN-uri cu 12 cifre** (Prime Whey Go Chocolate Coconut 642176606347 și Toffee Chocolate 642176606343) trebuie corectate în Shopify (lipsește o cifră). Toffee are 77 de cutii în stoc.
4. **Unitățile individuale sub 15 lei nu s-au urcat**: baton 55 g, fiolă Energy Pump sau Fat Burning de 25 ml, plic de creatină de 10 g. Pe eMAG ar ieși 10,99 / 11,99 / 5,99 lei și nu acoperă transportul. Pe eMAG sunt cutiile (12 batoane, 20 de fiole, 25 de plicuri). Dacă le vrei și individual, spune-mi.
5. **Nu s-au urcat, fiindcă nu erau în brief (suplimente) sau au alt comision:** untul de arahide, migdale și caju Prime Health (categorie alimentară, cu comision neconfirmat în anexă) și băuturile Frutilu (alt brand). Pot fi adăugate după ce afli comisionul.
6. **Familia pe aromă la 3 oferte vechi** (Pure Isolate Ciocolată id 4, Prime Whey Caramel sărat id 12, EAA Peach id 11) n-a fost acceptată cât timp actualizarea lor e în validare („Please provide product characteristic values for the given family type”). Se retrimite după aprobare; până atunci apar ca pagini separate de restul aromelor.
7. **Sincronizarea automată a stocului și a prețului** Shopify/Oblio → eMAG (în aplicația Prime eMAG) e următorul pas tehnic, ca să nu se vândă pe eMAG ce s-a terminat pe site.
8. **Campania Chillmas Deals** (până pe 23.11, cu discount la comision) se poate înscrie din Campanii după ce produsele sunt aprobate.

## Cum se reia
Scripturile sunt în `prime-emag/catalog/`. Tokenul e citit din `~/.prime-emag-status-token`. Rezultatele intermediare (`shop.json`, `fise.json`, `stare.json`) se scriu în dosarul din care rulezi.
- `build.mjs` construiește fișele: citește `shop.json`, adică feed-ul public `/products.json`, plus stocul din `config.mjs` și valorile permise `v<cat>.json`.
- `trimite.mjs pilot|lot1|lot2|ids:1,2,3` trimite fișele, iar `citeste.mjs [id,id]` citește statusurile.
- Id-urile sunt fixe: 1–12 sunt ofertele vechi (pe același EAN), 167 e Magneziul, iar 200–274 sunt produsele noi. La retrimitere, aceeași variantă păstrează același id.

## Toate ofertele

### Alte suplimente alimentare (3039)

| id | Produs | EAN | Preț site | Preț eMAG | Stoc | Status | Link |
|---|---|---|---|---|---|---|---|
| 3 | Prime Supplements Omega-3 din ulei de pește, 80 capsule | 6421766015161 | 69.00 | 84.99 | 113 | aprobat, LIVE | [eMAG](https://www.emag.ro/-/pd/D6YC3PYBM/) |
| 8 | Prime Supplements Vitamine și minerale Daily Vitamin Formula, 30 plicuri | 6421766015123 | 160.00 | 195.99 | 50 | aprobat, LIVE | [eMAG](https://www.emag.ro/-/pd/D5YC3PYBM/) |
| 167 | Prime Supplements Magneziu bisglicinat 300 mg, 80 capsule | 0655383647931 | 70.00 | 85.99 | 760 | în validare | – |
| 254 | Prime Supplements Extract de bergamotă Citrus Bergamot, 80 capsule | 0655383647863 | 120.00 | 146.99 | 182 | în validare | – |
| 255 | Prime Supplements Ashwagandha KSM-66, 80 capsule | 0655383647870 | 59.00 | 71.99 | 416 | în validare | – |
| 256 | Prime Supplements Vitamina D3 + K2, 80 capsule | 0655383647917 | 75.00 | 91.99 | 947 | în validare | – |
| 257 | Prime Supplements Tinctură din plante Testo Revive, 500 ml | 0655383647894 | 55.00 | 67.99 | 56 | în validare | – |
| 258 | Prime Supplements Tinctură din plante Cardio Calm, 500 ml | 0655383647900 | 55.00 | 67.99 | 23 | în validare | – |
| 259 | Prime Supplements Colagen hidrolizat lichid Complete Collagen, 500 ml | 0655383647955 | 132.00 | 160.99 | 16 | în validare | – |
| 260 | Prime Supplements Picolinat de crom, 80 capsule | 6421766015529 | 60.00 | 73.99 | 11 | în validare | – |
| 261 | Prime Supplements Citrat de magneziu, 80 capsule | 6421766015543 | 54.00 | 65.99 | 44 | în validare | – |
| 262 | Prime Supplements NAC N-acetilcisteină 500 mg, 80 capsule | 6421766015550 | 59.00 | 71.99 | 313 | în validare | – |
| 263 | Prime Supplements Extract de turmeric cu piperină, 80 capsule | 6421766015574 | 76.00 | 92.99 | 33 | în validare | – |
| 264 | Prime Supplements Citrat de zinc 40 mg, 80 capsule | 6421766015611 | 55.00 | 67.99 | 128 | în validare | – |
| 265 | Prime Supplements Vitamina C 1000 mg, 80 capsule | 6421766015598 | 59.00 | 71.99 | 36 | în validare | – |
| 266 | Prime Supplements Spirulină, 80 capsule | 6421766015796 | 60.00 | 73.99 | 8 | în validare | – |
| 267 | Prime Supplements Extract de silimarină, 80 capsule | 6421766015789 | 85.00 | 103.99 | 75 | în validare | – |
| 268 | Prime Supplements Enzimă nattokinază, 60 capsule | 6421766015765 | 48.00 | 58.99 | 79 | în validare | – |
| 269 | Prime Supplements Potassium Complex, potasiu și magneziu, 80 capsule | 6421766015772 | 67.00 | 81.99 | 16 | în validare | – |
| 270 | Prime Supplements Băutură cu fibre Fiber Portocale roșii, 500 g | 6421766063353 | 130.00 | 158.99 | 89 | în validare | – |

### Proteine (4022)

| id | Produs | EAN | Preț site | Preț eMAG | Stoc | Status | Link |
|---|---|---|---|---|---|---|---|
| 2 | Prime Supplements Proteină din zer izolată Pure Isolate Căpșuni, 2 kg | 6421766015178 | 510.00 | 621.99 | 48 | aprobat, LIVE | [eMAG](https://www.emag.ro/-/pd/DRYC3PYBM/) |
| 4 | Prime Supplements Proteină din zer izolată Pure Isolate Ciocolată, 2 kg | 6421766015185 | 510.00 | 621.99 | 77 | aprobat, LIVE | [eMAG](https://www.emag.ro/-/pd/D34NF83BM/) |
| 5 | Prime Supplements Proteină din zer izolată Pure Isolate Caffè Latte, 2 kg | 6421766017318 | 510.00 | 621.99 | 50 | respins vechi, retrimis | – |
| 6 | Prime Supplements Proteină din zer izolată Pure Isolate Caramel sărat, 2 kg | 6421766015277 | 510.00 | 621.99 | 19 | respins vechi, retrimis | – |
| 12 | Prime Supplements Proteină din zer Prime Whey Caramel sărat, 2 kg | 6421766015413 | 390.00 | 475.99 | 127 | aprobat, LIVE | [eMAG](https://www.emag.ro/-/pd/D49NF83BM/) |
| 200 | Prime Supplements Proteină din zer izolată Pure Isolate Vanilie Bourbon, 2 kg | 6421766015383 | 510.00 | 621.99 | 53 | în validare | – |
| 201 | Prime Supplements Proteină din zer izolată Pure Isolate Cheesecake cu căpșuni, 2 kg | 6421766015376 | 510.00 | 621.99 | 45 | în validare | – |
| 202 | Prime Supplements Proteină din zer izolată Pure Isolate Ciocolată albă și zmeură, 2 kg | 4009902541495 | 510.00 | 621.99 | 45 | în validare | – |
| 203 | Prime Supplements Proteină din zer Prime Whey Afine și vanilie, 1 kg | 6421766063599 | 215.00 | 262.99 | 44 | în validare | – |
| 204 | Prime Supplements Proteină din zer Prime Whey Caramel sărat, 1 kg | 6421766015482 | 215.00 | 262.99 | 20 | în validare | – |
| 205 | Prime Supplements Proteină din zer Prime Whey Cheesecake cu căpșuni, 1 kg | 6421766015444 | 215.00 | 262.99 | 49 | în validare | – |
| 206 | Prime Supplements Proteină din zer Prime Whey Ciocolată cu caramel, 1 kg | 6421766015468 | 215.00 | 262.99 | 102 | în validare | – |
| 207 | Prime Supplements Proteină din zer Prime Whey Ciocolată albă și zmeură, 1 kg | 6421766015451 | 215.00 | 262.99 | 44 | în validare | – |
| 208 | Prime Supplements Proteină din zer Prime Whey Vanilie Bourbon, 1 kg | 6421766015475 | 215.00 | 262.99 | 41 | în validare | – |
| 209 | Prime Supplements Proteină din zer Prime Whey Ciocolată cu caramel, 2 kg | 6421766015406 | 390.00 | 475.99 | 13 | în validare | – |
| 210 | Prime Supplements Proteină din zer Prime Whey Ciocolată albă și zmeură, 2 kg | 6421766015420 | 390.00 | 475.99 | 98 | în validare | – |
| 211 | Prime Supplements Proteină din zer Prime Whey Vanilie Bourbon, 2 kg | 6421766015390 | 390.00 | 475.99 | 93 | în validare | – |
| 212 | Prime Supplements Proteină din zer Prime Whey Ciocolată și cocos, 2 kg | 6421766063605 | 390.00 | 475.99 | 81 | în validare | – |
| 213 | Prime Supplements Proteină din zer Prime Whey Afine și vanilie, 2 kg | 6421766063582 | 390.00 | 475.99 | 98 | în validare | – |
| 214 | Prime Supplements Proteină din zer Prime Whey Go Vanilie Bourbon, 15 plicuri x 30 g | 6421766063407 | 150.00 | 182.99 | 8 | în validare | – |
| 215 | Prime Supplements Proteină din zer Prime Whey Go Cheesecake cu căpșuni, 15 plicuri x 30 g | 6421766063414 | 150.00 | 182.99 | 14 | în validare | – |
| 216 | Prime Supplements Proteină din zer Prime Whey Go Ciocolată albă și zmeură, 15 plicuri x 30 g | 6421766063445 | 150.00 | 182.99 | 12 | în validare | – |
| 217 | Prime Supplements Proteină din zer Prime Whey Go Caramel sărat, 15 plicuri x 30 g | 6421766063421 | 150.00 | 182.99 | 6 | în validare | – |
| 218 | Prime Supplements Proteină din zer Prime Whey Go Afine și vanilie, 15 plicuri x 30 g | 6421766063391 | 150.00 | 182.99 | 85 | în validare | – |
| 219 | Prime Supplements Baton proteic cocos și caramel, cutie 12 x 55 g | 6421766015703 | 100.00 | 121.99 | 22 | în validare | – |

### Amino acizi (4023)

| id | Produs | EAN | Preț site | Preț eMAG | Stoc | Status | Link |
|---|---|---|---|---|---|---|---|
| 11 | Prime Supplements Aminoacizi esențiali EAA Ceai rece de piersici, 500 g | 6421766015239 | 175.00 | 213.99 | 79 | aprobat, LIVE | [eMAG](https://www.emag.ro/-/pd/D3Q0D63BM/) |
| 220 | Prime Supplements Aminoacizi esențiali EAA Afine, 500 g | 6421766015345 | 175.00 | 213.99 | 89 | în validare | – |
| 221 | Prime Supplements Aminoacizi esențiali EAA Căpșuni și kiwi, 500 g | 6421766015291 | 175.00 | 213.99 | 67 | în validare | – |
| 222 | Prime Supplements Aminoacizi esențiali EAA Fructe tropicale, 500 g | 6421766015352 | 175.00 | 213.99 | 92 | în validare | – |
| 223 | Prime Supplements Aminoacizi BCAA 4:1:1 Recovery Cireșe, 500 g | 6421766015284 | 120.00 | 146.99 | 47 | în validare | – |
| 224 | Prime Supplements L-glutamină Kyowa® Recovery Glutamin fără aromă, 500 g | 6421766015222 | 165.00 | 201.99 | 57 | în validare | – |
| 225 | Prime Supplements L-glutamină Kyowa® Recovery Glutamin Zmeură, 500 g | 6421766015215 | 165.00 | 201.99 | 69 | în validare | – |
| 226 | Prime Supplements L-glutamină Kyowa® Recovery Glutamin Afine, 500 g | 6421766015505 | 165.00 | 201.99 | 60 | în validare | – |
| 227 | Prime Supplements L-glutamină Kyowa® Recovery Glutamin Cireșe și lime, 500 g | 6421766015512 | 165.00 | 201.99 | 19 | în validare | – |
| 228 | Prime Supplements L-glutamină Kyowa® Recovery Glutamin Ananas și mango, 500 g | 6421766015499 | 165.00 | 201.99 | 56 | în validare | – |
| 229 | Prime Supplements L-carnitină 1000, 80 capsule | 6421766015536 | 100.00 | 121.99 | 81 | în validare | – |
| 230 | Prime Supplements Taurină 1000 mg, 80 capsule | 6421766015581 | 50.00 | 60.99 | 46 | în validare | – |

### Carbohidrați (4024)

| id | Produs | EAN | Preț site | Preț eMAG | Stoc | Status | Link |
|---|---|---|---|---|---|---|---|
| 231 | Prime Supplements Carbohidrați intra-workout Cluster Bomb cu Cluster Dextrin® Zmeură, 1 kg | 6421766015307 | 220.00 | 268.99 | 39 | în validare | – |
| 232 | Prime Supplements Carbohidrați intra-workout Cluster Bomb cu Cluster Dextrin® Căpșuni și kiwi, 1 kg | 6421766015314 | 220.00 | 268.99 | 52 | în validare | – |
| 233 | Prime Supplements Gainer Emperor Mass 40% proteină Ciocolată, 3 kg | 6421766015154 | 390.00 | 475.99 | 51 | în validare | – |
| 234 | Prime Supplements Gainer Emperor Mass 40% proteină Căpșuni, 3 kg | 6421766015147 | 390.00 | 475.99 | 60 | în validare | – |
| 235 | Prime Supplements Cremă de ovăz instant Instant Oat Cream Ciocolată, 800 g | 6421766015741 | 65.00 | 79.99 | 34 | în validare | – |
| 236 | Prime Supplements Cremă de ovăz instant Instant Oat Cream Fursecuri, 800 g | 6421766015758 | 65.00 | 79.99 | 38 | în validare | – |
| 237 | Prime Supplements Cremă de orez Creamy Rice Brioșă cu afine, 1 kg | 6421766064220 | 70.00 | 85.99 | 250 | în validare | – |
| 238 | Prime Supplements Cremă de orez Creamy Rice Biscuiți cu cremă, 1 kg | 6421766064251 | 65.00 | 79.99 | 263 | în validare | – |
| 239 | Prime Supplements Cremă de orez Creamy Rice Plăcintă cu cocos, 1 kg | 6421766064244 | 70.00 | 85.99 | 267 | în validare | – |
| 240 | Prime Supplements Cremă de orez Creamy Rice Tort de ciocolată, 1 kg | 6421766064237 | 65.00 | 79.99 | 259 | în validare | – |

### Creatină (4025)

| id | Produs | EAN | Preț site | Preț eMAG | Stoc | Status | Link |
|---|---|---|---|---|---|---|---|
| 1 | Prime Supplements Creatină monohidrată Creapure®, 500 g | 6421766015109 | 180.00 | 219.99 | 21 | aprobat, LIVE | [eMAG](https://www.emag.ro/-/pd/D6TGZHYBM/) |
| 241 | Prime Supplements Creatină monohidrată Creapure®, 300 g | 6421766064404 | 115.00 | 140.99 | 186 | în validare | – |
| 242 | Prime Supplements Creatină monohidrată micronizată, fără aromă, 300 g | 6421766064107 | 98.00 | 119.99 | 208 | în validare | – |
| 243 | Prime Supplements Creatină Ready To Go Blue Moon, 25 plicuri efervescente x 10 g | 6421766063858 | 110.00 | 134.99 | 9 | în validare | – |

### Alte supl. nutriție sportivă (4026)

| id | Produs | EAN | Preț site | Preț eMAG | Stoc | Status | Link |
|---|---|---|---|---|---|---|---|
| 7 | Prime Supplements Pre-workout Combat Pro cu cafeină Fructe de pădure, 500 g | 0704384490913 | 140.00 | 170.99 | 14 | aprobat, LIVE | [eMAG](https://www.emag.ro/-/pd/D6WLKPYBM/) |
| 9 | Prime Supplements Pre-workout Nitrox 3D Ananas și mango, 500 g | 6421766015130 | 190.00 | 231.99 | 27 | aprobat, LIVE | [eMAG](https://www.emag.ro/-/pd/DQYC3PYBM/) |
| 10 | Prime Supplements Pre-workout Nitrox 3D Cireșe, 500 g | 6421766017295 | 190.00 | 231.99 | 44 | aprobat, LIVE | [eMAG](https://www.emag.ro/-/pd/D24NF83BM/) |
| 244 | Prime Supplements Pre-workout Nitrox 3D Fructul pasiunii, 500 g | 6421766015321 | 190.00 | 231.99 | 35 | în validare | – |
| 245 | Prime Supplements Pre-workout Nitrox 3D Căpșuni și lime, 500 g | 6421766015338 | 190.00 | 231.99 | 53 | în validare | – |
| 246 | Prime Supplements Pre-workout fără stimulente Nitrox No-Stim Afine, 660 g | 6421766015635 | 205.00 | 250.99 | 36 | în validare | – |
| 247 | Prime Supplements Pre-workout Combat Pro cu cafeină Mango, 500 g | 0704384490937 | 140.00 | 170.99 | 39 | în validare | – |
| 248 | Prime Supplements Pre-workout Combat Pro cu cafeină Mojito, 500 g | 0704384490906 | 140.00 | 170.99 | 20 | în validare | – |
| 249 | Prime Supplements Pre-workout Combat Pro cu cafeină Portocale, 500 g | 0704384490920 | 140.00 | 170.99 | 33 | în validare | – |
| 250 | Prime Supplements Pre-workout Combat Pro 2.0 Mango, 660 g | 6421766015659 | 205.00 | 250.99 | 18 | în validare | – |
| 251 | Prime Supplements Pre-workout Combat Pro 2.0 Fructe de pădure, 660 g | 6421766015642 | 205.00 | 250.99 | 50 | în validare | – |
| 252 | Prime Supplements Pre-workout lichid Energy Pump Shot Fructe de pădure, 20 fiole x 25 ml | 6421766017356 | 170.00 | 207.99 | 338 | în validare | – |
| 253 | Prime Supplements Glycerol Max Pump, monostearat de glicerol, 500 g | 6421766063469 | 85.00 | 103.99 | 79 | în validare | – |

### Detoxifiere și slăbire (4029)

| id | Produs | EAN | Preț site | Preț eMAG | Stoc | Status | Link |
|---|---|---|---|---|---|---|---|
| 271 | Prime Supplements Water Out cu extracte din plante, 120 capsule | 4005156827835 | 115.00 | 140.99 | 69 | în validare | – |
| 272 | Prime Supplements Water Out, tinctură din plante, 500 ml | 0655383647887 | 73.00 | 89.99 | 125 | în validare | – |
| 273 | Prime Supplements Thermo Core cu L-carnitină și ceai verde, 120 capsule | 6421766015628 | 115.00 | 140.99 | 81 | în validare | – |
| 274 | Prime Supplements Fat Burning Booster Shot Fructe de pădure, 20 fiole x 25 ml | 6421766017349 | 170.00 | 207.99 | 240 | în validare | – |

## Variante excluse (din produsele de suplimente)

| Variantă | Motiv |
|---|---|
| Prime Whey – proteină din zer, 1 kg / Chocolate Coconut (6421766063612) | stoc 0 |
| Prime Whey – proteină din zer, 2 kg / Strawberry Cheesecake (6421766015437) | stoc 0 |
| Prime Whey Go – proteină din zer, plicuri 30 g / Chocolate Coconut / Cutie 15 buc x 30g (642176606347) | EAN cu 12 cifre (invalid), de corectat în Shopify |
| Prime Whey Go – proteină din zer, plicuri 30 g / Chocolate Coconut / Plic 30g (fără SKU) | fără SKU |
| Prime Whey Go – proteină din zer, plicuri 30 g / Bourbon Vanilla / Plic 30g (fără SKU) | fără SKU |
| Prime Whey Go – proteină din zer, plicuri 30 g / Strawberry Cheesecake / Plic 30g (fără SKU) | fără SKU |
| Prime Whey Go – proteină din zer, plicuri 30 g / White Chocolate Raspberry / Plic 30g (fără SKU) | fără SKU |
| Prime Whey Go – proteină din zer, plicuri 30 g / Toffe Chocolate / Cutie 15 buc x 30g (642176606343) | EAN cu 12 cifre (invalid), de corectat în Shopify |
| Prime Whey Go – proteină din zer, plicuri 30 g / Toffe Chocolate / Plic 30g (fără SKU) | fără SKU |
| Prime Whey Go – proteină din zer, plicuri 30 g / Salted caramel / Plic 30g (fără SKU) | fără SKU |
| Prime Whey Go – proteină din zer, plicuri 30 g / Blueberry Vanilla / Plic 30g (fără SKU) | fără SKU |
| Baton proteic căpșuni / Cutie 12 buc x 55g (6421766062509) | stoc 0 |
| Baton proteic căpșuni / Baton 55g (6421766062462) | unitate individuală (8.50 lei), nerentabilă singură pe eMAG |
| Baton proteic caramel sărat / Cutie 12 buc x 55g (6421766062530) | coliziune EAN: în eMAG e „Mănuși Pro Nutrition Women line” (alt brand) |
| Baton proteic caramel sărat / 55g (6421766062486) | unitate individuală (8.50 lei), nerentabilă singură pe eMAG |
| Baton proteic cocos și caramel / Baton 55g (6421766015697) | unitate individuală (8.50 lei), nerentabilă singură pe eMAG |
| Aminoacizi Recovery BCAA 4:1:1 – 500 g / Pear (6421766015192) | stoc 0 |
| Cluster Bomb – intra-workout cu Cluster Dextrin®, 1 kg / Pineapple (6421766015253) | coliziune EAN: în eMAG e „Baton proteic Pronutrition Bar Ciocolată 55 g” (alt brand) |
| Cremă de orez Prime Creamy Rice – fără aromă, 1 kg / Default Title (6421766064275) | stoc 0 |
| Cremă de orez Prime Creamy Rice – caramel sărat, 1 kg / Default Title (6421766064213) | stoc 0 |
| Cremă de orez Prime Creamy Rice – sirop de arțar, 1 kg / Default Title (6421766064282) | stoc 0 |
| Creatină Ready To Go – plicuri efervescente 10 g / Blue Moon / Plic 10g (6421766063834) | unitate individuală (4.40 lei), nerentabilă singură pe eMAG |
| Creatină Ready To Go – plicuri efervescente 10 g / Pink Madness / Cutie 25 plicuri x 10g (6421766063865) | stoc 0 |
| Creatină Ready To Go – plicuri efervescente 10 g / Pink Madness / Plic 10g (6421766063841) | unitate individuală (4.40 lei), nerentabilă singură pe eMAG |
| Energy Pump Shot – pre-workout lichid, fiole de 25 ml / Wild berries / 25ml (6421766014805) | unitate individuală (9.50 lei), nerentabilă singură pe eMAG |
| Scorțișoară de Ceylon pudră bio – 200 g / Default Title (0757226891324) | coliziune EAN: în eMAG e „Chili Jalapeno Bio 600 g” (OEM), adăugare blocată |
| Coenzima Q10 200 mg – 80 de capsule / Default Title (0655383647948) | stoc 0 |
| Fat Burning Booster Shot – fiole de 25 ml / Forest Fruits / 25ml (6421766017325) | unitate individuală (9.50 lei), nerentabilă singură pe eMAG |
