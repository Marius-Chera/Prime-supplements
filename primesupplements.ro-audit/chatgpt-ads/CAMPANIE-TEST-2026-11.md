# ChatGPT Ads – campania de test (2 săptămâni, noiembrie 2026)

Pregătit pe 29.10.2026, după ce proprietarul și-a creat contul pe ads.openai.com. Contextul (lansare, politică, costuri): `findings/CHATGPT-ADS-2026-10-29.md`.

> **Actualizare 29.10.2026 (decizia proprietarului):** buget **total 420 lei pe toată campania** (media 30 lei/zi; Ads Manager nu acceptă buget zilnic sub 80 lei), CPC maxim **6,50 lei**, 2–15.11.2026. Campania „Prime – test ChatGPT Ads nov. 2026” e creată în Ads Manager ca **ciornă nepublicată**, cu toate cele 5 grupuri și 13 anunțuri de mai jos; campania creată automat la înscriere (350 lei/zi) a fost arhivată. Valorile de buget/CPC din §1 și §5 sunt înlocuite de acestea.

## 1. Pe scurt
- **Campanie:** una singură, obiectiv **Clicks** (CPC), România, toate platformele (web, Android, iOS).
- **Perioada:** luni **2.11 – duminică 15.11.2026** (14 zile). Se suprapune cu Black Friday (tema BF se publică pe 30.10, pachetele BF 30.10–15.11) – de aceea anunțurile **nu conțin prețuri**, ca să nu devină înșelătoare când prețul se schimbă.
- **Buget:** recomandat **90 lei/zi** (14 zile ≈ 1.260 lei): atinge pragul de 1.250 lei cheltuiți și aduce creditul de 1.250 lei de la OpenAI (oferta pentru România, până pe 31.12), deci a doua rundă de test e gratuită. Varianta minimă: 45 lei/zi (≈ 630 lei, fără credit).
- **CPC maxim de start:** 10 lei (≈ 2 USD; OpenAI sugerează 3–5 USD în SUA – pornim mai jos, licitația e de preț secund). Dacă după 3 zile nu sunt afișări, urcăm la 15 lei.
- **5 grupuri de anunțuri** (4 obligatorii + 1 opțional), 13 anunțuri, toate pe pagini existente, cu UTM.
- **Fără afirmații de sănătate** în anunțuri (nici cele autorizate în UE): doar ce e produsul, cât conține, câte porții, arome, de unde vine. Paginile de destinație au fost verificate pe 29.10: conțin doar mențiunile UE autorizate (proteine → masă musculară; creatină → performanță fizică) și avertismentele standard.

## 2. Produsele alese (vânzări nete, ultimele 90 de zile, Shopify)
| Produs | Vânzări nete | Comenzi | Pagina de destinație |
|---|---|---|---|
| Prime Whey 2 kg | 103.004 lei | 383 | /products/prime-whey-2000g |
| Pure Isolate 2 kg | 32.195 lei | 80 | /products/pure-isolate-2000g |
| Creatină Creapure® (500 g / 300 g) | 21.186 lei | 186 | /products/creatina-creapure |
| Cremă de orez (5 arome în top 15) | ≈ 60.557 lei | 1.056 | /collections/crema-de-orez |
| EAA 500 g | 10.481 lei | 95 | /products/eaa-aminoacizi-esentiali |
| Pachet Starter Forță (Whey 2 kg + Creapure 500 g) | nou din 18.10 | – | /products/pachet-starter-forta-prime-whey-2kg-creatina-creapure |

Neincluse intenționat: pre-workout-urile (cafeină/sinefrină – categorie cu risc la verificare), vitaminele și mineralele (cel mai aproape de „health”), Prime Health.

## 3. Convenția UTM
Același stil ca la theMarketer (`utm_source=themarketer&utm_medium=email&utm_campaign=...&utm_content=...`):

`?utm_source=chatgpt&utm_medium=cpc&utm_campaign=chatgpt-test-2026-11&utm_content=<grup>-<anunț>`

Se verifică în Shopify → Analytics → sesiuni după UTM / referrer (referrer-ul va fi chatgpt.com) și în GA4 (source/medium = chatgpt / cpc). Atenție: linkurile de mai jos au deja `?` – nu se mai adaugă al doilea.

## 4. Grupurile de anunțuri și textele (gata de lipit)
Limite: titlu ≤ 40 de caractere, descriere ≤ 100 de caractere (ghidurile terțe dau 40–50 / 100–150; Ads Manager arată limita exactă în câmp). Imagine: pătrată 1:1, JPG/PNG, min. 256 px (recomandat 1080×1080) – poza frontală a produsului pe fundal simplu. Format „Multiple images” (beta din 26.10.2026): 4–6 poze pătrate (aromele) pe același link – potrivit pentru Whey și crema de orez.

### Grup 1 – Proteină din zer
Context hints (se scriu în Ads Manager; în engleză, cum sunt exemplele OpenAI, plus varianta română):
- whey protein powder for people who train at the gym in Romania and want a good-tasting protein shake; comparing whey concentrate vs isolate; which protein powder to buy; protein shake for breakfast or after training
- proteină din zer / pudră proteică pentru sală, shake proteic, ce proteină să cumpăr, whey sau izolat

| # | Titlu | Descriere | Link |
|---|---|---|---|
| 1.1 | Prime Whey 2 kg – 66 de porții | Proteină din zer, porție de 30 g, 7 arome. Brand din Sibiu, fabricată în UE, livrare în toată țara. | https://primesupplements.ro/products/prime-whey-2000g?utm_source=chatgpt&utm_medium=cpc&utm_campaign=chatgpt-test-2026-11&utm_content=whey-1 |
| 1.2 | Proteină whey cu gust de desert | Prime Whey: concentrat din zer cu arome ca Toffee Chocolate, Strawberry Cheesecake, Bourbon Vanilla. | https://primesupplements.ro/products/prime-whey-2000g?utm_source=chatgpt&utm_medium=cpc&utm_campaign=chatgpt-test-2026-11&utm_content=whey-2 |
| 1.3 | Pure Isolate – izolat din zer, 2 kg | Izolat proteic microfiltrat, 74 de porții de 27 g, sub 1 g carbohidrați la 100 g. 5 arome. | https://primesupplements.ro/products/pure-isolate-2000g?utm_source=chatgpt&utm_medium=cpc&utm_campaign=chatgpt-test-2026-11&utm_content=isolate-1 |

### Grup 2 – Creatină Creapure®
Context hints:
- creatine monohydrate powder, Creapure brand, for strength training and gym; which creatine to buy; how much creatine per day; creatine without flavor
- creatină monohidrată, Creapure, ce creatină să iau, creatină fără aromă

| # | Titlu | Descriere | Link |
|---|---|---|---|
| 2.1 | Creatină Creapure® – 100 de porții | Creatină monohidrată Creapure®, un singur ingredient, fără aromă. Tub de 500 g sau 300 g. | https://primesupplements.ro/products/creatina-creapure?utm_source=chatgpt&utm_medium=cpc&utm_campaign=chatgpt-test-2026-11&utm_content=creapure-1 |
| 2.2 | Ce creatină să iei? Creapure®, simplu | O măsură de 3 g pe zi, în apă sau în shake. Pulbere fină, fără aditivi, de la Prime Supplements. | https://primesupplements.ro/products/creatina-creapure?utm_source=chatgpt&utm_medium=cpc&utm_campaign=chatgpt-test-2026-11&utm_content=creapure-2 |
| 2.3 | Creatină monohidrată, marca Creapure® | Materie primă Creapure® (Germania), ambalată în UE. 60 sau 100 de porții. Livrare în toată țara. | https://primesupplements.ro/products/creatina-creapure?utm_source=chatgpt&utm_medium=cpc&utm_campaign=chatgpt-test-2026-11&utm_content=creapure-3 |

### Grup 3 – Cremă de orez
Context hints:
- cream of rice instant powder for a quick high-carb breakfast or pre-workout meal; dessert-flavored rice cream; easy breakfast for people who train
- cremă de orez, cremă de orez instant, mic dejun rapid pentru sală, cremă de orez cu aromă

| # | Titlu | Descriere | Link |
|---|---|---|---|
| 3.1 | Cremă de orez instant, 7 arome | Prime Creamy Rice: făină de orez pregelatinizată, fără zaharuri adăugate, cu apă sau lapte. | https://primesupplements.ro/collections/crema-de-orez?utm_source=chatgpt&utm_medium=cpc&utm_campaign=chatgpt-test-2026-11&utm_content=orez-1 |
| 3.2 | Creamy Rice – tort de ciocolată, 1 kg | Cremă de orez cu gust de desert: tort de ciocolată, caramel sărat, biscuiți cu cremă, afine. | https://primesupplements.ro/products/crema-de-orez-tort-de-ciocolata?utm_source=chatgpt&utm_medium=cpc&utm_campaign=chatgpt-test-2026-11&utm_content=orez-2 |
| 3.3 | Mic dejun din orez, gust de desert | Punga de 1 kg ≈ 22 de porții de 45 g, 156 kcal per porție (tort de ciocolată). Gata rapid. | https://primesupplements.ro/collections/crema-de-orez?utm_source=chatgpt&utm_medium=cpc&utm_campaign=chatgpt-test-2026-11&utm_content=orez-3 |

### Grup 4 – Pachete
Context hints:
- supplement starter bundle for someone starting at the gym: whey protein plus creatine; protein and creatine bundle; what supplements to buy as a beginner
- pachet suplimente începător, whey și creatină, ce suplimente să iau când încep sala

| # | Titlu | Descriere | Link |
|---|---|---|---|
| 4.1 | Pachet Starter Forță: whey + creatină | Prime Whey 2 kg + Creatină Creapure® 500 g, la preț de pachet. Alegi aroma proteinei. | https://primesupplements.ro/products/pachet-starter-forta-prime-whey-2kg-creatina-creapure?utm_source=chatgpt&utm_medium=cpc&utm_campaign=chatgpt-test-2026-11&utm_content=pachet-forta |
| 4.2 | Începi la sală? Pachetul de start | Prime Whey 1 kg + Creapure® 500 g + shaker, într-un singur pachet, mai ieftin decât separat. | https://primesupplements.ro/products/pachet-starter-incepator-prime-whey-1kg-creapure-shaker?utm_source=chatgpt&utm_medium=cpc&utm_campaign=chatgpt-test-2026-11&utm_content=pachet-incepator |
| 4.3 | Whey 2 kg + 2 creme de orez, pachet | Pachet Mic Dejun Proteic: proteina din zer și două pungi de cremă de orez, aromele la alegere. | https://primesupplements.ro/products/pachet-mic-dejun-proteic-prime-whey-2kg-crema-de-orez?utm_source=chatgpt&utm_medium=cpc&utm_campaign=chatgpt-test-2026-11&utm_content=pachet-micdejun |

### Grup 5 (opțional) – Aminoacizi EAA
Context hints: essential amino acids EAA powder drink for training days; EAA vs BCAA; intra-workout drink / aminoacizi esențiali EAA, EAA sau BCAA, băutură intra-workout.

| # | Titlu | Descriere | Link |
|---|---|---|---|
| 5.1 | Aminoacizi esențiali EAA, 83 de porții | Opt aminoacizi esențiali, 5.350 mg per porție de 6 g, tub de 500 g, 83 de porții. 4 arome. | https://primesupplements.ro/products/eaa-aminoacizi-esentiali?utm_source=chatgpt&utm_medium=cpc&utm_campaign=chatgpt-test-2026-11&utm_content=eaa-1 |

## 5. Pașii în Ads Manager (proprietarul, ≈ 45 de minute)
1. **Cont:** Settings → logo (PNG pătrat), billing profile + card, verificarea firmei (poate dura 1–3 zile; până trece, anunțurile nu rulează). Dacă s-a creat vreun anunț la înscriere: pune-l pe pauză.
2. **Campanie:** Create campaign → obiectiv **Clicks** → buget zilnic 90 lei (sau 45) → locație România → toate platformele → **nu publica încă** (datele de start/sfârșit apar doar la editare, după creare).
3. **Grupuri:** 4 (sau 5) ad groups numite „Proteină din zer”, „Creatină Creapure”, „Cremă de orez”, „Pachete”, („EAA”); la fiecare, context hints din §4 (ambele fraze).
4. **Anunțuri:** la fiecare grup, anunțurile din tabel (titlu, descriere, link cu UTM, poză). Pozele: poza frontală a produsului de pe pagina lui (din Content → Files), decupată pătrat.
5. **Editează campania:** start 2.11.2026, sfârșit 15.11.2026, CPC maxim 10 lei → Submit for review.
6. **După aprobare:** verifică zilnic statusul „Serving / Not serving” (hover arată motivul). Un anunț respins pe politică se rescrie fără partea reclamată; dacă e respins **contul** pentru categorie (suplimente), ne oprim – nu există cale de ocolire.

Alternativă: proprietarul se loghează în ads.openai.com în browserul aplicației Claude, iar Claude completează câmpurile din tabel pas cu pas, cu confirmare înainte de fiecare trimitere.

## 6. Ce măsurăm și cum decidem
- Săptămânal (luni 9.11 și luni 16.11): afișări, clicuri, CTR, CPC mediu, cheltuială (din Ads Manager; cheltuiala întârzie 7–8 ore) + sesiuni, comenzi și venit cu `utm_source=chatgpt` (Shopify + GA4).
- Praguri orientative pentru „continuăm”: CTR ≥ 1 %, CPC ≤ 10 lei, cost per comandă sub marja medie a unei comenzi (de comparat cu Google Ads din aceeași perioadă). Sub praguri după 14 zile → oprim și păstrăm creditul pentru un test de iarnă (tot nutriție sportivă, nu vitamine).
- Cerință OpenAI: paginile nu trebuie să blocheze OAI-AdsBot și OAI-SearchBot (robots.txt-ul Shopify verificat pe 29.10 – vezi JURNAL).

## 7. Reguli pentru orice text viitor
- Fără: imunitate, slăbit, ardere de grăsimi, detox, hormoni, boli, „tratează”, „vindecă”, „recuperare mai rapidă”, „energie”. Fără comparații cu alte branduri. Fără prețuri cât durează Black Friday.
- Permis: ce conține, câte porții, arome, origine (Sibiu, fabricat în UE), livrare, „preț de pachet”.
- Pozele: fără text medical, fără „înainte/după”, fără corpuri expuse.

## 8. Rezultatul verificării (29.10.2026, după Publish)
- Campania, cele 5 grupuri și cele 13 anunțuri sunt active; pornesc automat pe 2.11, se opresc pe 15.11, plafon total 420 lei.
- **12 din 13 anunțuri: „Ad cannot serve in targeted countries”** – OpenAI le încadrează la „Dietary supplements”, permise doar în SUA (tabelul „Ads Policy Eligibility” din help.openai.com/en/articles/20001534).
- **Eligibil: doar 3.3 „Mic dejun din orez, gust de desert”** → /collections/crema-de-orez.
- Anunțul 2.1 a avut și o eroare de citire a paginii (landing page) – retrimis; oricum intră sub aceeași restricție de țară.
- Opțiune: apel „Wrong policy category?” doar pentru 3.1 și 3.2 (cremă de orez = aliment). Pentru proteine, creatină, EAA și pachete un apel nu e corect: paginile și etichetele spun „supliment alimentar”.
- **29.10: apel trimis** pentru 3.1 și 3.2 (cremă de orez), cu textul din JURNAL; ambele „review pending”. Dacă OpenAI le acceptă, campania va avea 3 anunțuri eligibile, toate cu crema de orez.
