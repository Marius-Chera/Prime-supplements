# Audit catalog theMarketer și intervale de recumpărare

**Magazin:** primesupplements.ro (domeniul theMarketer primesupplements.ro) · **Data:** 15.10.2026 · **Autor:** Claude, pentru Marius Chera

Ce conține: tot catalogul de produse din theMarketer (279 de produse, toate paginile), verificat și pe filtrul de sănătate a feedului („with_issues”) și pe sortarea după vânzări. Pentru fiecare produs consumabil am comparat datele cu eticheta (`top50/label_facts.md`) și cu metafield-urile Shopify `custom.detalii_produs` și `custom.cantitate`. La final sunt toate modificările făcute azi, cu ID-ul, numele și valoarea veche și nouă.

Ce **nu** am atins: niciun produs nu a fost dezactivat, nicio automatizare și nicio campanie nu au fost modificate, iar contactele au rămas neatinse (sincronizarea abonaților o face alt job). Nu apar date de clienți în acest document.

---

## 1. Pe scurt

1. **Niciun produs din cele 279 nu avea interval de recumpărare** (`recurrence` = 0 peste tot). theMarketer scrie în documentație că, fără interval, clienții nu primesc niciun e-mail de reaprovizionare atunci când automatizarea folosește „Delay by product recurrence”. Fluxul „Remind customers to reorder” pleca totuși la 0–2 minute după comandă (vezi `audit_automations.md` §4.7). Asta înseamnă că nu folosea intervalul pe produs, ci o întârziere de zero.
2. **Am setat intervalul la 31 de produse consumabile** (proteine, creatină, EAA, Creamy Rice, capsule, colagen, fibre). Pentru fiecare, doza zilnică și ambalajul sunt dovedite din etichetă sau din pagina produsului. Intervalul e cu circa 10% mai scurt decât durata ambalajului, ca e-mailul să ajungă înainte să se termine produsul. Tabelul e la §6.
3. **Am exclus din recomandări 121 de produse**: 113 de îmbrăcăminte, 6 accesorii și shakere și 2 produse-cadou tehnice („Cadoul tau”, „Shaker Cadou”). Niciunul nu era exclus înainte: la fiecare, theMarketer a raportat câmpul ca modificat. Dovada că intrau în recomandări: blocul personalizat „Recomandate pentru tine” din campanii scotea pantaloni MNX cu imagini .avif (`audit_campaigns.md`, constatarea D2). Produsele rămân active în catalog și pot fi puse oricând manual într-o campanie. Tabelul e la §7.
4. **Feedul nu are erori raportate** (0 produse „with_issues”), dar catalogul are 70 de produse vechi din magazinul WooCommerce. Imaginile lor dau 404, iar produsele amestecă rapoartele și segmentele pe produs. Mai sunt 13 produse rămase cu brandul vechi „primesupplements1”, categorii greșite (Frutilu în „Cele mai vândute”) și preț de achiziție doar la 5 produse. Detalii la §3.
5. **Am lăsat neschimbate celelalte 57 de consumabile** din feedul Shopify (209 produse din feedul Shopify − 121 excluse − 31 cu interval), cu motivul și valoarea propusă la §8. Fie doza zilnică nu e dovedită, fie numele sugerează un efect (regula casei: nu apar în e-mailuri până la redenumire), fie există o notă de siguranță (zinc, citrat de magneziu).

---

## 2. Ce am verificat și cum

| Verificare | Cum | Rezultat |
|---|---|---|
| Tot catalogul | `list_products` pe toate cele 19 pagini, sortat după vânzări. Paginile se suprapun când produsele au același număr de vânzări, așa că am completat golurile cu listări pe brand, sortate după `shop_id` | 279 din 279 de produse identificate (fișier de lucru `work/catalog/products.tsv`) |
| Sănătatea feedului | `list_products(health="with_issues")` | 0 produse cu probleme raportate |
| Intervale existente | `list_products(sort="recurrence")` | 0 la toate cele 279 de produse înainte de modificări |
| Produse dezactivate | câmpul `disabled` pe toate produsele | 0 dezactivate |
| Excludere din recomandări | câmpul nu apare la citire. Rezultatul `update_product` arată însă `changed` doar când valoarea era alta | toate cele 121 erau incluse în recomandări |
| Doza și ambalajul | `label_facts.md` (etichetele trimise azi) și metafield-urile Shopify `custom.detalii_produs` și `custom.cantitate` pentru toate produsele active | vezi §6 și §8 |
| Variante Creapure | ShopifyQL, ultimele 90 de zile | 500 g: 108 comenzi (112 bucăți); 300 g: 75 de comenzi (81 de bucăți) |
| Creatină Ready To Go | ShopifyQL, ultimele 90 de zile | 6 comenzi la plic individual (18 plicuri), 6 comenzi la cutie |
| Statusuri de comandă | `get_order_options` | Pending, cancelled, completed, failed, fulfilled, paid, pending, processing, refunded, restocked, voided. Nu există „Delivered” |
| Cum folosește theMarketer intervalul | articolul oficial [How to set up automated replenishment emails](https://themarketer.com/resources/knowledge-base/how-to-set-up-automated-replenishment-emails) | §5 |
| Adresele produselor vechi | `curl` pe 3 adrese | paginile `/produs/...` fac 301 spre pagina Shopify corectă; imaginile `wp-content/uploads` dau 404 |

---

## 3. Constatări

### C1 (MARE) Niciun interval de recumpărare, deci reamintirea pleca imediat după comandă
- Toate cele 279 de produse aveau `recurrence` = 0.
- După documentația theMarketer, fluxul „Remind customers to reorder” cu „Delay by product recurrence” pornit nu trimite nimic pentru produsele fără interval. Fluxul actual a trimis totuși „Gata să le cumperi din nou?” la 0–2 minute după comandă (6 cazuri dovedite în `audit_automations.md`). Concluzia: setarea pe produs nu era folosită.
- **Rezolvat pe partea de catalog:** 31 de produse au acum interval (§6). Fluxul trebuie refăcut cu setările de la §5. Până atunci rămâne oprit, cum recomandă auditul automatizărilor.

### C2 (MARE) Îmbrăcămintea intra în recomandările din e-mail
- 121 de produse care nu sunt suplimente (îmbrăcăminte MNX și Prime, shakere, prosop, centură, șapcă și două produse-cadou de 12 și 200 de lei, cu imaginea „plus.png”) puteau fi alese de motorul de recomandări.
- Exemplu observat: blocul „Recomandate pentru tine” din campaniile Liver Protect (16.09) și Pachet Health (20.08) arată acum pantaloni MNX în format .avif, care nu se afișează în Outlook.
- Un client care a cumpărat proteină și primește la cross-sell un hanorac de 319 lei nu e țintit corect. Toate fluxurile cu blocuri de recomandări suferă la fel (cross-sell, coș cu produse similare, newsletter).
- **Rezolvat:** `exclude_from_recommendations` = true la toate cele 121 (§7). Am inclus și cele 27 epuizate acum: excluderea e o setare fixă, iar stocul se schimbă la fiecare sincronizare. Fără ea, un tricou reaprovizionat ar reapărea în recomandări.

### C3 (MARE) 70 de produse vechi din WooCommerce încă în catalog
- Brand „N/A”, adrese `www.primesupplements.ro/produs/...`, ultima sincronizare acum un an, toate cu stoc 0 și niciunul dezactivat. Lista completă e la anexa A.
- Adresele paginilor fac 301 spre produsul Shopify, dar **imaginile dau 404**. Verificarea de sănătate nu le prinde, pentru că feedul vechi a fost validat acum un an.
- Efecte:
  - rapoartele „cele mai vândute” și „cele mai vizualizate” sunt amestecate. De exemplu, „Prime Whey 2kg/66 serv” cel vechi are 470 de comenzi istorice;
  - **segmentele pe „a cumpărat produsul X” trebuie să includă ambele ID-uri**, altfel pierd clienții din perioada WooCommerce. Perechile importante sunt în tabelul de mai jos;
  - dacă un produs vechi ajunge vreodată într-un bloc, apare cu imagine lipsă.
- Nu am dezactivat nimic, după instrucțiune. **Recomandare (decizia ta):** dezactivezi cele 70 de produse vechi în theMarketer, după ce segmentele noi pe produs sunt construite cu ambele ID-uri.

| Produs | ID nou (Shopify) | ID vechi (WooCommerce) |
|---|---|---|
| Prime Whey 2 kg | `68552d1e830bb87b330ba089` | `67d95b090839f5bea004f3e8` |
| Prime Whey 1 kg | `68552d1e830bb87b330ba088` | `67d95b090839f5bea004f3e7` |
| Creatină Creapure® | `68552d1e830bb87b330ba071` | `67d95b090839f5bea004f3cb` |
| Pure Isolate 2 kg | `68552d1e830bb87b330ba075` | `67d95b090839f5bea004f3d0` |
| EAA 500 g | `68552d1e830bb87b330ba072` | `67d95b090839f5bea004f3cc` |
| Magneziu bisglicinat | `68552d1e830bb87b330ba06f` | `67d95b090839f5bea004f3c9` |
| Vitamina D3 + K2 | `68552d1e830bb87b330ba05a` | `67d95b090839f5bea004f3b3` |
| Omega-3 | `68669e83f8d10d2eac0b43cf` | `67d95b090839f5bea004f3cf` |
| Vitamina C 1000 | `68552d1e830bb87b330ba067` | `67d95b090839f5bea004f3c0` |
| Daily Vitamin Formula | `68552d1e830bb87b330ba070` | `67d95b090839f5bea004f3ca` |
| Coenzima Q10 | `68552d1e830bb87b330ba06e` | `67d95b090839f5bea004f3c8` |
| Instant Oat Cream | `68552d1e830bb87b330ba08d` | `67d95b090839f5bea004f3ed` |

### C4 (MEDIU) Produse epuizate și sincronizare înghețată
- Epuizate în Shopify, dar cu vânzări mari: **Vitamina D3 + K2** (426 de comenzi, sincronizat ultima dată acum o lună), **Zinc citrate** (296), **Enzimă nattokinază** (229), **Water Out 500 ml** (280), Shaker Premium 500 ml, batonul ciocolată și fructe de pădure.
- La produsele epuizate, theMarketer păstrează starea de la ultima sincronizare (de la o săptămână până la un an). De aceea 13 produse au încă brandul vechi „primesupplements1”, dinainte de corectarea vendorului în Shopify.
- 4 batoane sunt **DRAFT** în Shopify, dar apar încă în catalog: alune și caramel, ciocolată și caramel, ciocolată și portocale, lămâie și fructe de pădure.
- Nu pot verifica prin API dacă blocurile de recomandări sar peste produsele fără stoc. **De verificat în editor:** opțiunea „doar produse în stoc” în blocurile de produse, la cross-sell, coș și newsletter. În blocurile manuale nu pui produse epuizate. Auditul campaniilor a găsit deja o imagine de baton cu o aromă care nu era în stoc.
- Am setat interval și la D3 + K2 și la nattokinază, deși sunt epuizate acum: intervalul se aplică abia peste 145 și 55 de zile de la livrare. Dacă produsul e tot fără stoc la data trimiterii, e-mailul duce la o pagină epuizată, deci reaprovizionarea lor contează.

### C5 (MEDIU) Statusul din Shopify nu se potrivește cu catalogul
- **Liver Protect** e „UNLISTED” (nelistat) în Shopify, dar în theMarketer apare în stoc (108) și e folosit în campanii, inclusiv în cea cu cele mai mari venituri recente (16.09).
- **Pachet Thermo Core + Water Out** e tot „UNLISTED” și apare în stoc (77). Are 840 de vizualizări și 0 comenzi.
- Decizia ta: ori le listezi din nou, ori nu le mai folosești în e-mailuri.

### C6 (MEDIU) Categoria principală e o colecție, nu tipul produsului
- Toate cele 19 produse Frutilu și cele două produse-cadou au categoria „Cele mai vândute”, iar batonul cu căpșuni are „Home page”. Colecțiile de afișare au fost preluate drept categorie.
- Efecte: „produse similare” recomandă după categorie, deci un Frutilu primește produse similare din „cele mai vândute”. Segmentarea pe categorie cerută de agenție (proteine, creatină, Creamy Rice…) nu poate folosi câmpul de categorie așa cum e.
- **Recomandare:** în setările integrării Shopify din theMarketer, categoria să fie preluată din tipul produsului. Tipurile sunt deja curate în Shopify: „Proteine”, „Creatină”, „Cremă de orez și ovăz”, „Minerale” etc. Dacă integrarea nu permite asta, segmentele pe produs se fac pe ID-uri (tabelul de la C3).

### C7 (MIC) Prețul de achiziție și marja
- Doar 5 produse au preț de achiziție: Prime Whey 2 kg, Prime Whey 1 kg, Pure Isolate, Cluster și Emperor Mass. Marja, sortarea după marjă și verificarea „preț sub cost” nu funcționează pentru restul de 274.
- Sunt prețuri foarte reduse, de verificat înainte să apară în e-mailuri: Coenzima Q10 la 25 de lei (–74% față de 95) și Liver Protect la 20 de lei (–73% față de 73). Dacă e lichidare, în e-mail se folosește prețul de referință Omnibus (cel mai mic preț din ultimele 30 de zile).

### C8 (MIC) Recenziile nu sunt în theMarketer
- Toate produsele au nota 0 și 0 recenzii în theMarketer. Recenziile sunt în Judge.me. Un bloc dinamic de rating sau recenzii din theMarketer ar apărea gol, deci nu-l folosești. Recenziile reale le pui manual, din `email/reviews.md`.

### C9 (MIC) Alte observații
- Frutilu are „conversion_rate” de 200–470%, pentru că se cumpără câte mai multe plicuri pe comandă. Metrica nu e utilizabilă la plicuri.
- Creapure e un singur produs cu două variante, 300 g și 500 g, iar intervalul se setează pe produs, nu pe variantă (vezi §6).
- Produsele MNX noi au imagini .avif. Problema dispare din recomandări prin excluderea de la C2, dar rămâne dacă un MNX e pus manual într-o campanie: atunci folosești o imagine JPG.

---

## 4. Regula după care am calculat intervalul

1. **Câte zile ține ambalajul** = numărul de porții ÷ porțiile pe zi, la **doza minimă de pe etichetă** (de exemplu Prime Whey: „1–4 porții pe zi”, deci 1 pe zi). Am ales doza minimă ca e-mailul să nu ajungă niciodată la cineva care urmează eticheta și mai are mult produs. Regula casei: fără spam.
2. **Intervalul** = cu circa 10% mai scurt, rotunjit: la multiplu de 5 pentru ambalajele de 50 de zile sau mai mult (de exemplu 66 → 60, 60 → 55, 100 → 90), la zi întreagă sub 50 de zile (de exemplu 33 → 30, 22 → 20, 26,7 → 24).
3. Numărătoarea pornește de la statusul ales în fluxul theMarketer. Cu „fulfilled” (expediată), cele 1–3 zile de livrare Cargus se adaugă la rezervă.
4. **Am setat doar** unde doza zilnică și ambalajul sunt scrise pe etichetă sau pe pagina produsului. Unde pagina spune doar „doza zilnică de pe etichetă” fără număr, sau „înainte de antrenament” fără câte porții pe zi, sau dă un interval de doze, n-am setat nimic (§8).
5. **Nu am setat** la produsele cu nume care sugerează un efect (Cluster Insulin Bomb, Recovery Glutamin, Recovery BCAA, Fat Burning Booster Shot, Thermo Core, Energy Pump Shot, Water Out, Testo Revive, Cardio Calm, Liver Protect). Regula din planul de e-mail este că acestea nu apar în e-mailurile cu produse până nu sunt redenumite sau verificate de un jurist (Reg. 1924/2006 art. 1(3)). E-mailul de reaprovizionare le-ar afișa numele.

Limitări cunoscute (de ținut minte la textul e-mailului):
- Documentația theMarketer nu spune dacă **numărul de bucăți** din comandă schimbă intervalul. Probabil nu îl schimbă. Cine ia 2 × Prime Whey 1 kg primește reamintirea tot la 30 de zile, deci mai devreme decât ar trebui.
- **Creapure 300 g** primește intervalul variantei de 500 g (90 de zile), deși cutia de 300 g ține 60 de zile la 5 g pe zi. Am ales varianta cea mai vândută (108 comenzi față de 75), ca să nu primească e-mail prea devreme majoritatea. Cine a luat 300 g primește reamintirea târziu.
- **Creatina de 300 g** fără aromă: cine face faza de încărcare de pe etichetă (15–30 g pe zi, 5–15 zile) termină cutia mai repede de 60 de zile.
- **Pre-workout (Combat Pro)** și **Glycerol**: eticheta spune „1 porție pe zi”, dar în practică se iau doar în zilele de antrenament, deci cutia ține mai mult decât intervalul.

Pentru toate cazurile de mai sus, textul e-mailului trebuie să fie de tipul „dacă ți se apropie de final…”, nu „ți s-a terminat”.

---

## 5. Ce trebuie setat în automatizarea de reaprovizionare (pentru jobul de automatizări)

Din documentația theMarketer ([knowledge base](https://themarketer.com/resources/knowledge-base/how-to-set-up-automated-replenishment-emails)) și din datele contului:

| Setare | Valoare recomandată | De ce |
|---|---|---|
| Șablon | Post Purchase > „Remind customers to reorder” (refăcut; cel vechi, ref 4, `6862b6757163af43b901e1ed`, rămâne oprit) | fluxul vechi trimitea la 0–2 minute după comandă |
| Start of automation | statusul comenzii **„fulfilled”** | magazinul nu trimite statusul „Delivered”. „fulfilled” e cel mai apropiat de livrare, iar „paid” e nesigur la ramburs |
| **Delay by product recurrence** | **pornit** | folosește intervalele de la §6. Produsele cu 0 nu primesc nimic: haine, accesorii, produse vechi, produsele de la §8 |
| Run flow | „Multiple times” | fiecare comandă nouă pornește propria reamintire |
| Enable frequency capping | pornit, 14 zile | dintr-o comandă cu 3 produse pleacă cel mult un e-mail la 14 zile |
| Exclude contacts who have not exited | **oprit** | dacă e pornit, nu mai pleacă nicio reamintire până nu e recumpărat produsul cel mai vechi |
| Al doilea e-mail | fără, sau doar cu filtrul „Buyer in the last X days” = intervalul dintre e-mailuri | un singur e-mail pe produs e suficient |
| Ore de trimitere | 09:00–20:00 | auditul automatizărilor a găsit trimiteri la 00:18–03:40 |
| Audiență | doar abonații la e-mail, cu acord | la fel ca la celelalte fluxuri |
| Conținut | produsul din comandă, „Comandă din nou”, livrarea gratuită peste 300 de lei, subsolul standard („Suplimentele alimentare nu înlocuiesc…”), **fără reducere nouă** (WELCOME5 nu se aplică, toți au deja o comandă) | regulile casei |
| Cafeina | Combat Pro (300 mg cafeină pe porție) are acum interval: subsolul trebuie să conțină și „Conține cafeină. Nu se recomandă copiilor sau femeilor însărcinate.” | regula casei despre cafeină |

---

## 6. Jurnal: intervale de recumpărare setate azi (31 de produse)

Toate cu `mcp__theMarketer__update_product(recurrence=…)`. Verificat după aplicare: sortarea după interval arată exact 31 de produse cu valoare diferită de 0; al 31-lea e Emperor Mass, cu 19 zile.

| # | ID theMarketer | Produs | Recurență veche → nouă (zile) | Calcul (ambalaj ÷ doza zilnică) | Sursa dozei și a ambalajului |
|---|---|---|---|---|---|
| 1 | `68552d1e830bb87b330ba089` | Prime Whey – proteină din zer, 2 kg | 0 → **60** | 66 porții × 30 g; 1–4 porții/zi → la 1/zi 66 zile | detalii_produs (Shopify): „Porții: 66 de porții de 30 g”, „1–4 porții pe zi” |
| 2 | `68552d1e830bb87b330ba088` | Prime Whey – proteină din zer, 1 kg | 0 → **30** | 33 porții × 30 g; 1–4 porții/zi → la 1/zi 33 zile | detalii_produs: „33 de porții de 30 g”, „1–4 porții pe zi” |
| 3 | `68552d1e830bb87b330ba075` | Izolat proteic din zer Pure Isolate – 2 kg | 0 → **65** | 74 porții × 27 g; o porție (după antrenament sau pe parcursul zilei) → 74 zile | detalii_produs: „74 de porții de 27 g”, „o porție de 27 g … după antrenament sau pe parcursul zilei” |
| 4 | `68552d1e830bb87b330ba073` | Gainer Emperor Mass – amestec proteic, 3 kg | 0 → **19** | 42 porții × 70 g; de preferință 2 porții/zi → 21 zile | descriere + detalii_produs: „42 de porții de 70 g”, „de preferință 2 porții pe zi” |
| 5 | `68552d1e830bb87b330ba072` | Aminoacizi esențiali EAA – tub de 500 g | 0 → **75** | 83 porții × 6 g; 1–3/zi → la 1/zi 83 zile | detalii_produs: „Porții: 83”, „de 1–3 ori pe zi” |
| 6 | `68552d1e830bb87b330ba071` | Creatină monohidrat micronizată Creapure® (variantele 300 g și 500 g) | 0 → **90** | 500 g = 100 porții × 5 g (300 g = 60); 3–5 g/zi → la 5 g/zi 100 zile (varianta cea mai vândută: 108 comenzi în 90 de zile, față de 75 la 300 g) | detalii_produs: „300 g (60 de porții) sau 500 g (100 de porții)”, „3–5 g de creatină pe zi”; ShopifyQL 90 de zile |
| 7 | `69a7af4fad5f33b46603aff1` | Creatină monohidrat micronizată – fără aromă, 300 g | 0 → **55** | 60 porții × 5 g; menținere ½–1½ măsuri (5–15 g)/zi → la 5 g/zi 60 zile | label_facts.md (etichetă) + detalii_produs: „60 de porții (o porție = 5 g)” |
| 8 | `68552d1e830bb87b330ba079` | Supliment pre-antrenament Combat Pro cu cafeină – 500 g | 0 → **20** | 22 porții × 22 g; 1 porție/zi → 22 zile | detalii_produs: „Porții: 22”, „1 porție pe zi” |
| 9 | `68552d1e830bb87b330ba092` | Glycerol Max Pump – monostearat de glicerol, 500 g | 0 → **110** | 125 porții × 4 g; o porție/zi → 125 zile | label_facts.md + detalii_produs: „125 de porții de 4 g”, „o porție pe zi” |
| 10 | `68552d1e830bb87b330ba093` | Fiber – băutură cu fibre, aromă portocală roșie, 500 g | 0 → **45** | 50 porții × 10 g; 1 porție/zi → 50 zile | label_facts.md + detalii_produs: „50 (o porție = 10 g)”, „o porție pe zi” |
| 11 | `6a46ee37d5924bff150891de` | Cremă de orez Prime Creamy Rice – fără aromă, 1 kg | 0 → **20** | 22 porții × 45 g; o porție (1 măsură) → 22 zile | fișa tehnică (label_facts.md) + detalii_produs: „22 per tub; o porție = 45 g” |
| 12 | `6a46ee37d5924bff150891df` | Cremă de orez Prime Creamy Rice – brioșă cu afine, 1 kg | 0 → **20** | 22 porții × 45 g → 22 zile | idem |
| 13 | `6a46ee37d5924bff150891e0` | Cremă de orez Prime Creamy Rice – caramel sărat, 1 kg | 0 → **20** | 22 porții × 45 g → 22 zile | idem |
| 14 | `6a46ee37d5924bff150891e1` | Cremă de orez Prime Creamy Rice – sirop de arțar, 1 kg | 0 → **20** | 22 porții × 45 g → 22 zile | idem |
| 15 | `6a46ee37d5924bff150891e2` | Cremă de orez Prime Creamy Rice – biscuiți cu cremă, 1 kg | 0 → **20** | 22 porții × 45 g → 22 zile | idem |
| 16 | `6a46ee37d5924bff150891e3` | Cremă de orez Prime Creamy Rice – plăcintă cu cocos, 1 kg | 0 → **20** | 22 porții × 45 g → 22 zile | idem |
| 17 | `6a46ee37d5924bff150891e4` | Cremă de orez Prime Creamy Rice – tort de ciocolată, 1 kg | 0 → **20** | 22 porții × 45 g → 22 zile | idem |
| 18 | `68552d1e830bb87b330ba06f` | Magneziu bisglicinat 300 mg – 80 de capsule | 0 → **24** | 80 capsule; 3 capsule/zi → 26,7 zile | label_facts.md (PDF bisMAGNEZIU): „3 capsule zilnic” |
| 19 | `68552d1e830bb87b330ba091` | Potassium Complex – potasiu și magneziu, 80 de capsule | 0 → **24** | 80 capsule; 3 capsule/zi → 26,7 zile | label_facts.md: proprietarul a confirmat 80 capsule; „3 capsule pe zi” |
| 20 | `68552d1e830bb87b330ba067` | Vitamina C 1000 mg – 80 de capsule | 0 → **70** | 80 capsule; 1/zi → 80 zile | detalii_produs: „80 (o porție = doza zilnică de o capsulă)” |
| 21 | `68552d1e830bb87b330ba05a` | Vitamina D3 + K2 80 caps | 0 → **145** | 80 capsule; 1 capsulă o dată la 2 zile → 160 zile | label_facts.md (PDF d3k2): „1 capsulă o dată la 2 zile” |
| 22 | `68552d1e830bb87b330ba063` | NAC – N-acetilcisteină, 80 de capsule | 0 → **70** | 80 capsule; 1/zi → 80 zile | detalii_produs: „1 capsulă pe zi”, „80 de zile” |
| 23 | `68552d1e830bb87b330ba065` | Extract de turmeric cu piperină – 80 de capsule | 0 → **70** | 80 capsule; 1/zi → 80 zile | detalii_produs: „o capsulă pe zi” |
| 24 | `68552d1e830bb87b330ba060` | Picolinat de crom – 80 capsule | 0 → **70** | 80 capsule; 1/zi → 80 zile | detalii_produs: „o capsulă pe zi” |
| 25 | `68552d1e830bb87b330ba06e` | Coenzima Q10 200 mg – 80 de capsule | 0 → **70** | 80 capsule; 1/zi → 80 zile | label_facts.md (PDF COENZIMA_Q10): „1 capsulă/zi” |
| 26 | `68552d1e830bb87b330ba058` | Extract de bergamotă Citrus Bergamot – 80 capsule | 0 → **70** | 80 capsule; 1/zi → 80 zile | label_facts.md (PDF citrus-bergamot): „1 capsulă zilnic” |
| 27 | `68552d1e830bb87b330ba08e` | Spirulină Prime – 80 de capsule | 0 → **36** | 80 capsule; 2/zi → 40 zile | label_facts.md: „2 capsule pe zi”, „porții pe flacon: 40” |
| 28 | `68552d1e830bb87b330ba08f` | Extract de silimarină – 80 de capsule | 0 → **70** | 80 capsule; 1/zi → 80 zile | label_facts.md: „1 capsulă pe zi”, „80 porții” |
| 29 | `68552d1e830bb87b330ba090` | Enzimă nattokinază – 60 de capsule | 0 → **55** | 60 capsule; 1/zi → 60 zile | label_facts.md: eticheta = 60 capsule, „1 capsulă pe zi, între mese” |
| 30 | `68552d1e830bb87b330ba070` | Daily Vitamin Formula – vitamine și minerale, 30 de plicuri | 0 → **27** | 30 plicuri; 1 plic/zi → 30 zile | detalii_produs: „Porții: 30”, „un plic pe zi” |
| 31 | `68552d1e830bb87b330ba05f` | Colagen hidrolizat lichid Complete Collagen – 500 ml | 0 → **30** | 500 ml; 15 ml/zi → 33 zile | detalii_produs: „Doză zilnică: 15 ml”, „aproximativ 33 de doze” |

---

## 7. Jurnal: produse excluse din recomandări azi (121)

Toate cu `mcp__theMarketer__update_product(exclude_from_recommendations=true)`. La fiecare, răspunsul a fost `changed: ["exclude_from_recommendations"]`, deci valoarea veche era `false`. Niciun produs nu a fost dezactivat (`disabled` a rămas `false` la toate). Produsele rămân în catalog, apar în continuare pe site și pot fi puse manual într-o campanie.

| # | ID theMarketer | Produs | Categorie | Stoc azi | exclude_from_recommendations |
|---|---|---|---|---|---|
| 1 | `68552d1e830bb87b330ba07e` | Centură de culturism Prime „Hardcore” – piele albă | Accesorii | în stoc | false → **true** |
| 2 | `69c9e8d874593884070c824d` | MNX Shaker 600 ml | Accesorii | epuizat | false → **true** |
| 3 | `68552d1e830bb87b330ba081` | Prosop de sală Prime – negru, 50 x 100 cm | Accesorii | în stoc | false → **true** |
| 4 | `68552d1e830bb87b330ba087` | Shaker Premium Accesorizat 500 ml | Accesorii | epuizat | false → **true** |
| 5 | `69f9ced4812046597a004935` | Shaker Prime 600 ml – negru transparent | Accesorii | în stoc | false → **true** |
| 6 | `68552d1e830bb87b330ba069` | Șapcă Prime | Accesorii | epuizat | false → **true** |
| 7 | `6859a7714ba05cacad039b37` | Cadoul tau (produs-cadou, baton-proteic-cadou) | produs-cadou | epuizat | false → **true** |
| 8 | `685a88b77dce8021570fad5e` | Shaker Cadou (produs-cadou) | produs-cadou | epuizat | false → **true** |
| 9 | `69c9e8d874593884070c823b` | Hanorac MNX Edge – gri melanj | Îmbrăcăminte | în stoc | false → **true** |
| 10 | `69c9e8d874593884070c823a` | Hanorac MNX Edge – negru | Îmbrăcăminte | în stoc | false → **true** |
| 11 | `69c9e8d874593884070c823c` | Hanorac MNX Edge – violet | Îmbrăcăminte | în stoc | false → **true** |
| 12 | `6ac5461617d6f482cd0c9f92` | Hanorac MNX Industrial – bronz | Îmbrăcăminte | în stoc | false → **true** |
| 13 | `6ac5461617d6f482cd0c9f93` | Hanorac MNX Industrial – roz pudrat | Îmbrăcăminte | în stoc | false → **true** |
| 14 | `6ac5461617d6f482cd0c9f96` | Hanorac MNX ManiaX ediție limitată – negru | Îmbrăcăminte | în stoc | false → **true** |
| 15 | `6ab298354ef0f3cad9050ad7` | Hanorac MNX Motion – negru | Îmbrăcăminte | în stoc | false → **true** |
| 16 | `6ac5461617d6f482cd0c9f91` | Hanorac MNX Motion – vișiniu | Îmbrăcăminte | în stoc | false → **true** |
| 17 | `6ac5461617d6f482cd0c9f97` | Hanorac MNX XForce 2.0 – negru | Îmbrăcăminte | în stoc | false → **true** |
| 18 | `685ac1e023332e130c0b8e85` | Hanorac Prime Squad cu glugă și fermoar – negru | Îmbrăcăminte | în stoc | false → **true** |
| 19 | `69c9e8d874593884070c8233` | Hanorac pentru bărbați MNX Oxygen – bej | Îmbrăcăminte | în stoc | false → **true** |
| 20 | `6ac5461617d6f482cd0c9f94` | Hanorac ușor MNX Aesthetic – bej deschis | Îmbrăcăminte | în stoc | false → **true** |
| 21 | `69c9e8d874593884070c8235` | Hanorac ușor MNX Aesthetic – bordo | Îmbrăcăminte | în stoc | false → **true** |
| 22 | `69c9e8d874593884070c8234` | Hanorac ușor MNX Aesthetic – kaki | Îmbrăcăminte | în stoc | false → **true** |
| 23 | `6ac5461617d6f482cd0c9f95` | Hanorac ușor MNX Aesthetic – negru | Îmbrăcăminte | în stoc | false → **true** |
| 24 | `69c9e8d874593884070c821c` | MNX Extra T-shirt HC 2.0 *Limited*, black | Îmbrăcăminte | epuizat | false → **true** |
| 25 | `69c9e8d874593884070c821d` | MNX Extra T-shirt HC 2.0 *Limited*, burgundy | Îmbrăcăminte | epuizat | false → **true** |
| 26 | `6a7d34acefba2db4a70f488d` | MNX Extra T-shirt HC 2.0 *Limited*, dark grey | Îmbrăcăminte | epuizat | false → **true** |
| 27 | `69c9e8d874593884070c821b` | MNX Extra T-shirt HC 2.0 *Limited*, white | Îmbrăcăminte | epuizat | false → **true** |
| 28 | `69c9e8d874593884070c8216` | MNX Extra T-shirt Industrial, black | Îmbrăcăminte | epuizat | false → **true** |
| 29 | `69c9e8d874593884070c8217` | MNX Extra T-shirt Industrial, bronze | Îmbrăcăminte | epuizat | false → **true** |
| 30 | `69ee9956f5b241db910cdc05` | MNX Extra T-shirt Industrial, navy blue | Îmbrăcăminte | epuizat | false → **true** |
| 31 | `69c9e8d874593884070c8220` | MNX Extra T-shirt basic, grey | Îmbrăcăminte | epuizat | false → **true** |
| 32 | `6a7d34acefba2db4a70f488f` | MNX Extra T-shirt basic, light pink | Îmbrăcăminte | epuizat | false → **true** |
| 33 | `69c9e8d874593884070c8248` | MNX Extra T-shirt embossed, mosaic blue | Îmbrăcăminte | epuizat | false → **true** |
| 34 | `69c9e8d874593884070c822b` | MNX Hoodie Edge, melange grey | Îmbrăcăminte | în stoc | false → **true** |
| 35 | `6ad043499870f720220b4ac1` | MNX Hoodie Original, black | Îmbrăcăminte | în stoc | false → **true** |
| 36 | `6ad043499870f720220b4ac2` | MNX Hoodie Original, red | Îmbrăcăminte | în stoc | false → **true** |
| 37 | `6ad043499870f720220b4ac5` | MNX Ribbed pants Hammer 2.0, black | Îmbrăcăminte | în stoc | false → **true** |
| 38 | `6ad043499870f720220b4ac6` | MNX Ribbed pants Hammer 2.0, white | Îmbrăcăminte | în stoc | false → **true** |
| 39 | `6ad043499870f720220b4ac3` | MNX Ribbed pants Hammer 3.0 light, black | Îmbrăcăminte | în stoc | false → **true** |
| 40 | `6ad043499870f720220b4ac4` | MNX Ribbed pants Hammer 3.0 light, white | Îmbrăcăminte | în stoc | false → **true** |
| 41 | `69c9e8d874593884070c8227` | MNX Ribbed shorts Hammer, black | Îmbrăcăminte | epuizat | false → **true** |
| 42 | `69ee9956f5b241db910cdc09` | MNX Ribbed shorts Hammer, green lint | Îmbrăcăminte | epuizat | false → **true** |
| 43 | `69c9e8d874593884070c8229` | MNX Ribbed shorts Hammer, grey | Îmbrăcăminte | epuizat | false → **true** |
| 44 | `69c9e8d874593884070c8228` | MNX Ribbed shorts Hammer, white | Îmbrăcăminte | epuizat | false → **true** |
| 45 | `69c9e8d874593884070c823e` | MNX Shorts Golden Era 2.0, black | Îmbrăcăminte | epuizat | false → **true** |
| 46 | `69c9e8d874593884070c8225` | MNX Workout Top Hammer 3.0, black | Îmbrăcăminte | epuizat | false → **true** |
| 47 | `69c9e8d874593884070c8226` | MNX Workout Top Hammer 3.0, grey | Îmbrăcăminte | epuizat | false → **true** |
| 48 | `69c9e8d874593884070c8224` | MNX Workout Top Hammer 3.0, white | Îmbrăcăminte | epuizat | false → **true** |
| 49 | `68552d1e830bb87b330ba07c` | Maiou Basic Prime | Îmbrăcăminte | epuizat | false → **true** |
| 50 | `69c9e8d874593884070c8215` | Maiou de baschet MNX – gri | Îmbrăcăminte | în stoc | false → **true** |
| 51 | `69c9e8d874593884070c8214` | Maiou de baschet MNX – negru | Îmbrăcăminte | în stoc | false → **true** |
| 52 | `6aa79c369c3dc4b0cb0eed2a` | Maiou fitness bărbați Prime Edge – negru | Îmbrăcăminte | în stoc | false → **true** |
| 53 | `69c9e8d874593884070c821a` | Maiou stringer MNX Edge – alb crem | Îmbrăcăminte | în stoc | false → **true** |
| 54 | `69c9e8d874593884070c8219` | Maiou stringer MNX Edge – negru | Îmbrăcăminte | în stoc | false → **true** |
| 55 | `69c9e8d874593884070c8242` | Maiou stringer MNX Golden Era 2.0 – alb cu negru | Îmbrăcăminte | în stoc | false → **true** |
| 56 | `6a7d34acefba2db4a70f488e` | Maiou stringer MNX Golden Era 2.0 – gri cu negru | Îmbrăcăminte | în stoc | false → **true** |
| 57 | `69c9e8d874593884070c8240` | Maiou stringer MNX Golden Era 2.0 – negru cu alb | Îmbrăcăminte | în stoc | false → **true** |
| 58 | `69c9e8d874593884070c8241` | Maiou stringer MNX Golden Era 2.0 – roșu aprins cu alb | Îmbrăcăminte | în stoc | false → **true** |
| 59 | `69c9e8d874593884070c822a` | Maiou stringer MNX ManiaX, ediție limitată | Îmbrăcăminte | în stoc | false → **true** |
| 60 | `69c9e8d874593884070c822e` | Maiou stringer MNX Skull Souls – galben | Îmbrăcăminte | în stoc | false → **true** |
| 61 | `69c9e8d874593884070c822f` | Maiou stringer MNX Skull Souls – mov | Îmbrăcăminte | în stoc | false → **true** |
| 62 | `68552d1e830bb87b330ba07a` | Maiou stringer Prime – negru | Îmbrăcăminte | în stoc | false → **true** |
| 63 | `68552d1e830bb87b330ba07b` | Maiou stringer Prime „Fuel Your Prime” – alb | Îmbrăcăminte | în stoc | false → **true** |
| 64 | `68552d1e830bb87b330ba085` | Pantaloni Prime Bodybuilding Classic – negri | Îmbrăcăminte | în stoc | false → **true** |
| 65 | `69c9e8d874593884070c8239` | Pantaloni de trening MNX Edge – gri melanj | Îmbrăcăminte | în stoc | false → **true** |
| 66 | `69c9e8d874593884070c8237` | Pantaloni de trening MNX Edge – negri | Îmbrăcăminte | în stoc | false → **true** |
| 67 | `69c9e8d874593884070c8238` | Pantaloni de trening MNX Edge – roșii | Îmbrăcăminte | în stoc | false → **true** |
| 68 | `6ab298354ef0f3cad9050ad8` | Pantaloni de trening MNX Motion – negri | Îmbrăcăminte | în stoc | false → **true** |
| 69 | `6aa79c369c3dc4b0cb0eed27` | Pantaloni de trening bărbați Prime Hammer 3.0 – negri | Îmbrăcăminte | în stoc | false → **true** |
| 70 | `69c9e8d874593884070c8236` | Pantaloni de trening ușori MNX Aesthetic – bordo | Îmbrăcăminte | în stoc | false → **true** |
| 71 | `69c9e8d874593884070c822c` | Pantaloni din bumbac MNX Industrial – roz pudrat | Îmbrăcăminte | în stoc | false → **true** |
| 72 | `69c9e8d874593884070c8232` | Pantaloni pentru bărbați MNX Oxygen – bej | Îmbrăcăminte | în stoc | false → **true** |
| 73 | `69c9e8d874593884070c823d` | Pantaloni scurți MNX Golden Era 2.0 – gri | Îmbrăcăminte | în stoc | false → **true** |
| 74 | `69c9e8d874593884070c823f` | Pantaloni scurți MNX Golden Era 2.0 – roșu | Îmbrăcăminte | în stoc | false → **true** |
| 75 | `6a7d34acefba2db4a70f488c` | Pantaloni scurți MNX Hardcore din plasă – gri | Îmbrăcăminte | în stoc | false → **true** |
| 76 | `69c9e8d874593884070c8249` | Pantaloni scurți MNX cu strat dublu – nisipiu | Îmbrăcăminte | în stoc | false → **true** |
| 77 | `68552d1e830bb87b330ba07d` | Pantaloni scurți Prime „Arnold Era” – negri | Îmbrăcăminte | în stoc | false → **true** |
| 78 | `69c9e8d874593884070c8247` | Pantaloni scurți bumbac MNX Golden Era – bleu | Îmbrăcăminte | în stoc | false → **true** |
| 79 | `69c9e8d874593884070c8246` | Pantaloni scurți bumbac MNX Golden Era – gri melanj | Îmbrăcăminte | în stoc | false → **true** |
| 80 | `69c9e8d874593884070c8245` | Pantaloni scurți bumbac MNX Golden Era – roz-maroniu | Îmbrăcăminte | în stoc | false → **true** |
| 81 | `69ee9956f5b241db910cdc07` | Pantaloni scurți de baschet MNX 2.0 – galben pal | Îmbrăcăminte | în stoc | false → **true** |
| 82 | `69ee9956f5b241db910cdc08` | Pantaloni scurți de baschet MNX din plasă – roșu | Îmbrăcăminte | în stoc | false → **true** |
| 83 | `69c9e8d874593884070c820d` | Pantaloni scurți raiați MNX Hammer 3.0 – albi | Îmbrăcăminte | în stoc | false → **true** |
| 84 | `69c9e8d874593884070c820c` | Pantaloni scurți raiați MNX Hammer 3.0 – negri | Îmbrăcăminte | în stoc | false → **true** |
| 85 | `69ee9956f5b241db910cdc06` | Pantaloni scurți reiați MNX Hammer 3.0 – gri închis | Îmbrăcăminte | în stoc | false → **true** |
| 86 | `69ee9956f5b241db910cdc0a` | Pantaloni scurți reiați MNX Hammer – cărămiziu | Îmbrăcăminte | în stoc | false → **true** |
| 87 | `6aa79c369c3dc4b0cb0eed28` | Pantaloni scurți waffle bărbați Prime Hammer 3.0 – negri | Îmbrăcăminte | în stoc | false → **true** |
| 88 | `685ac1e023332e130c0b8e90` | T-shirt Body Tight | Îmbrăcăminte | epuizat | false → **true** |
| 89 | `6ad043499870f720220b4abf` | Tricou Gym Supradimensionat & Lejer - Burgundy | Prime | Îmbrăcăminte | în stoc | false → **true** |
| 90 | `6ad043499870f720220b4ac0` | Tricou Gym Supradimensionat & Lejer - Roz Pastel | Prime | Îmbrăcăminte | în stoc | false → **true** |
| 91 | `69c9e8d874593884070c8212` | Tricou MNX Edge – alb crem | Îmbrăcăminte | în stoc | false → **true** |
| 92 | `69c9e8d874593884070c8211` | Tricou MNX Edge – negru | Îmbrăcăminte | în stoc | false → **true** |
| 93 | `69c9e8d874593884070c8213` | Tricou MNX Edge – roz-corai | Îmbrăcăminte | în stoc | false → **true** |
| 94 | `69c9e8d874593884070c8221` | Tricou MNX Extra Basic – alb | Îmbrăcăminte | în stoc | false → **true** |
| 95 | `69c9e8d874593884070c821f` | Tricou MNX Extra Basic – bordo | Îmbrăcăminte | în stoc | false → **true** |
| 96 | `69c9e8d874593884070c821e` | Tricou MNX Extra Basic – negru | Îmbrăcăminte | în stoc | false → **true** |
| 97 | `69c9e8d874593884070c8230` | Tricou MNX Extra Basic – roșu aprins | Îmbrăcăminte | în stoc | false → **true** |
| 98 | `69c9e8d874593884070c8210` | Tricou MNX Extra HC 4.0 prespălat – alb | Îmbrăcăminte | în stoc | false → **true** |
| 99 | `69c9e8d874593884070c820e` | Tricou MNX Extra HC 4.0 prespălat – albastru | Îmbrăcăminte | în stoc | false → **true** |
| 100 | `69c9e8d874593884070c822d` | Tricou MNX Extra HC 4.0 prespălat – bronz | Îmbrăcăminte | în stoc | false → **true** |
| 101 | `69c9e8d874593884070c820f` | Tricou MNX Extra HC 4.0 prespălat – mov | Îmbrăcăminte | în stoc | false → **true** |
| 102 | `69c9e8d874593884070c8218` | Tricou MNX Extra Industrial – roz pudrat | Îmbrăcăminte | în stoc | false → **true** |
| 103 | `68552d1e830bb87b330ba082` | Tricou Prime Drop Shoulder Muscle – alb | Îmbrăcăminte | în stoc | false → **true** |
| 104 | `68552d1e830bb87b330ba078` | Tricou Prime Drop Shoulder Muscle – negru | Îmbrăcăminte | în stoc | false → **true** |
| 105 | `69c9e8d874593884070c820b` | Tricou Prime Suffer to Dominate – negru | Îmbrăcăminte | în stoc | false → **true** |
| 106 | `69c9e8d874593884070c824e` | Tricou Sala "Built in the city" - Bumbac Premium Negru | Îmbrăcăminte | epuizat | false → **true** |
| 107 | `69c9e8d874593884070c824f` | Tricou Sala "Made of iron" - Bumbac Premium Negru | Îmbrăcăminte | epuizat | false → **true** |
| 108 | `6ad00a011997a0f893080823` | Tricou Sală Oversized Bărbați Prime - Galben Pastel | Îmbrăcăminte | în stoc | false → **true** |
| 109 | `6ad00a011997a0f893080822` | Tricou Sală Oversized Bărbați Prime - Turcoaz Intense | Îmbrăcăminte | în stoc | false → **true** |
| 110 | `69c9e8d874593884070c8244` | Tricou clasic MNX Golden Era 2.0 – alb cu negru | Îmbrăcăminte | în stoc | false → **true** |
| 111 | `69c9e8d874593884070c8243` | Tricou clasic MNX Golden Era 2.0 – alb cu roșu | Îmbrăcăminte | în stoc | false → **true** |
| 112 | `6a7d34acefba2db4a70f488b` | Tricou clasic MNX Golden Era – albastru | Îmbrăcăminte | în stoc | false → **true** |
| 113 | `69c9e8d874593884070c8223` | Tricou de antrenament MNX Golden Era – albastru deschis | Îmbrăcăminte | în stoc | false → **true** |
| 114 | `69c9e8d874593884070c8222` | Tricou de antrenament MNX Golden Era – mov închis | Îmbrăcăminte | în stoc | false → **true** |
| 115 | `69c9e8d874593884070c824b` | Tricou din bumbac MNX Basix – alb | Îmbrăcăminte | în stoc | false → **true** |
| 116 | `69ee9956f5b241db910cdc04` | Tricou din bumbac MNX Basix – mov | Îmbrăcăminte | în stoc | false → **true** |
| 117 | `6ab298354ef0f3cad9050ad9` | Tricou din bumbac MNX Basix – negru | Îmbrăcăminte | în stoc | false → **true** |
| 118 | `69c9e8d874593884070c824a` | Tricou din bumbac MNX Basix – roz pastel | Îmbrăcăminte | în stoc | false → **true** |
| 119 | `69c9e8d874593884070c8231` | Tricou din bumbac MNX Basix – roșu cireașă | Îmbrăcăminte | în stoc | false → **true** |
| 120 | `69c9e8d874593884070c824c` | Tricou din bumbac MNX Basix – verde pastel | Îmbrăcăminte | în stoc | false → **true** |
| 121 | `6aa79c369c3dc4b0cb0eed29` | Tricou supradimensionat bărbați Prime Hammer 3.0 – negru | Îmbrăcăminte | în stoc | false → **true** |

---

## 8. Consumabile lăsate neschimbate (interval 0) și valoarea propusă

| Produs | ID theMarketer | De ce nu am setat | Valoare propusă, dacă se rezolvă motivul |
|---|---|---|---|
| Citrat de magneziu – 80 capsule | `68552d1e830bb87b330ba062` | Doza e clară (2 capsule pe zi, 40 de zile), dar `label_facts.md` are o notă de siguranță: 450 mg magneziu pe zi, peste limita superioară EFSA pentru magneziul din suplimente (250 mg). Un e-mail care împinge recumpărarea așteaptă decizia ta | 36 |
| Zinc citrate 80 caps | `68552d1e830bb87b330ba066` | 40 mg zinc pe zi, peste limita EFSA (25 mg) și probabil peste maximul din România (notă de siguranță în `label_facts.md`); acum e și epuizat | 70 |
| L-glutamină Recovery Glutamin Kyowa® – 500 g | `68552d1e830bb87b330ba077` | Nume cu efect („Recovery”, art. 1(3), regula casei). Are și variante cu 125 și cu 100 de porții | 90 (la varianta cu 100 de porții) |
| Aminoacizi Recovery BCAA 4:1:1 – 500 g | `68552d1e830bb87b330ba076` | Nume cu efect („Recovery”) | 28 (62 de porții, 2 pe zi) |
| Cluster Insulin Bomb – 1 kg | `68552d1e830bb87b330ba08a` | Nume cu efect („Insulin”); porția se ia „pe parcursul antrenamentului”, fără număr de porții pe zi | 30 (33 de porții, la 1 pe zi) |
| Energy Pump Shot – fiole 25 ml | `68552d1e830bb87b330ba07f` | Nume cu efect; „cel mult două fiole pe zi” e o limită, nu o doză; se vinde la fiolă și la cutie | 18 (cutia de 20, la 1 pe zi) |
| Fat Burning Booster Shot – fiole 25 ml | `68552d1e830bb87b330ba080` | Nume cu efect; doza e doar „conform etichetei”; fiolă sau cutie | — |
| Thermo Core – 120 capsule | `68552d1e830bb87b330ba05e` | Nume cu efect; 40 de porții de câte 3 capsule, dar câte porții pe zi nu e scris | — |
| Water Out – 120 capsule | `68552d1e830bb87b330ba05d` | Nume cu efect; câte porții pe zi nu e scris | — |
| Water Out – 500 ml | `68552d1e830bb87b330ba086` | Nume cu efect; epuizat | 90 (100 × 5 ml, 1 pe zi) |
| Liver Protect – 500 ml | `68552d1e830bb87b330ba06d` | Nume cu efect; 5 ml de 3–4 ori pe zi (25–33 de zile); „UNLISTED” în Shopify | 30 |
| Testo Revive – 500 ml | `68552d1e830bb87b330ba05b` | Nume cu efect; 5 ml de 3–4 ori pe zi | 30 |
| Cardio Calm – 500 ml | `68552d1e830bb87b330ba05c` | Nume cu efect; o linguriță de 3–4 ori pe zi, cure de 3 luni | 30 |
| Pachet Thermo Core + Water Out | `688b888b65a9053d940026b3` | Pachet cu două nume cu efect; „UNLISTED” în Shopify | — |
| Nitrox 3D – 500 g | `68552d1e830bb87b330ba074` | 25 de porții „înainte de antrenament”, fără număr de porții pe zi; 200 mg cafeină pe porție | 22 |
| Nitrox No-Stim – 660 g | `68552d1e830bb87b330ba08b` | 30 de porții, fără număr de porții pe zi | 27 |
| Combat Pro 2.0 – 660 g | `68552d1e830bb87b330ba08c` | 30 de porții, fără număr de porții pe zi; conține sinefrină | 27 |
| L-carnitină 1000 – 80 capsule | `68552d1e830bb87b330ba061` | „O capsulă înainte de antrenament”; doza zilnică „de pe etichetă” nu e scrisă | 70 (dacă 1 pe zi) |
| Omega-3 – 80 capsule | `68669e83f8d10d2eac0b43cf` | Pagina spune „doza zilnică de pe etichetă” fără număr. Mențiunea EPA/DHA cere 250 mg pe zi, adică 1 capsulă | 70, după confirmarea etichetei |
| Ashwagandha KSM-66 – 80 capsule | `68552d1e830bb87b330ba059` | Doza zilnică „de pe etichetă”, fără număr | 70 (dacă 1 pe zi) |
| Taurină 1000 mg – 80 capsule | `68552d1e830bb87b330ba064` | Doza e un interval: 500–2000 mg pe zi, adică 1–2 capsule (40–80 de zile) | 36 (la 2 pe zi) sau 70 (la 1 pe zi) |
| Prime Whey Go – plicuri 30 g | `68552d1e830bb87b330ba094` | Plicul se ia „după antrenament sau ca gustare”, fără număr pe zi; se vinde la plic și la cutie de 15 | 13 (cutia, la 1 pe zi) |
| Creatină Ready To Go – plicuri 10 g | `69ae46e34dc334b67009a05f` | Doza e clară (1 plic pe zi), dar jumătate din comenzi sunt plicuri individuale (6 din 12 în 90 de zile). Un interval de cutie ar fi greșit pentru ele | 22 (cutia de 25), dacă fluxul poate filtra varianta |
| Instant Oat Cream – 800 g | `68552d1e830bb87b330ba08d` | Nici porția, nici doza nu sunt declarate pe pagină | — |
| Unt de arahide / migdale / caju – 600 g | `68552d1e830bb87b330ba083`, `68552d1e830bb87b330ba084`, `68669e83f8d10d2eac0b43e3` | Aliment fără porție sau doză declarată | — |
| Scorțișoară de Ceylon bio – 200 g | `68669e83f8d10d2eac0b43c1` | Fără doză | — |
| Batoane proteice (căpșuni, caramel sărat, cocos și caramel, ciocolată și fructe de pădure, plus 4 batoane DRAFT) | `68552d1e830bb87b330ba054`, `…056`, `…068`, `…06b`; DRAFT: `…055`, `…057`, `…06a`, `…06c` | „După cum este necesar”; se vând la bucată și la cutie de 12 | — |
| Frutilu (18 arome) și setul de degustare | brand Frutilu, 19 produse | Un plic face 1,5–3 L de băutură; fără doză zilnică | — |
| Pachet Nitrox3D + Creatina, Fiber + Creatina | `6916015bb2530018980714e8`, `6916015bb2530018980714e9` | Pachete epuizate de 6 luni | — |
| 70 de produse vechi WooCommerce | anexa A | Nu se mai vând | — |

---

## 9. Ce ai de decis

1. **Produsele vechi WooCommerce (70):** le dezactivăm în theMarketer? Recomandarea mea: da, după ce segmentele pe produs sunt făcute cu ambele ID-uri (C3).
2. **Zinc și citrat de magneziu:** rămân fără reamintire până lămurești nota de siguranță (C4, §8)? Dacă vrei reamintire, le pun 70 și 36 de zile.
3. **Produsele cu nume care sugerează un efect** (12 ID-uri, §8): le excludem și din recomandări? Regula casei spune că nu apar în e-mailurile cu produse, iar blocurile dinamice le pot scoate. Nu am făcut-o, pentru că sunt produse vândute (Glutamin are 467 de comenzi, Cluster 513), iar setarea s-ar aplica probabil și pe site, dacă recomandările theMarketer sunt instalate acolo. ID-urile, gata de aplicat: `68552d1e830bb87b330ba08a`, `68552d1e830bb87b330ba077`, `68552d1e830bb87b330ba076`, `68552d1e830bb87b330ba07f`, `68552d1e830bb87b330ba080`, `68552d1e830bb87b330ba05e`, `68552d1e830bb87b330ba05d`, `68552d1e830bb87b330ba086`, `68552d1e830bb87b330ba06d`, `68552d1e830bb87b330ba05b`, `68552d1e830bb87b330ba05c`, `688b888b65a9053d940026b3`.
4. **Liver Protect și Pachetul Thermo Core + Water Out** („UNLISTED” în Shopify): le listezi din nou sau nu le mai folosim în e-mailuri (C5)?
5. **Categoria din feed:** schimbi în integrare categoria în tipul produsului (C6)? Fără asta, segmentele pe categorie se fac pe ID-uri.
6. **Omega-3, Ashwagandha, L-carnitină, taurină:** câte capsule pe zi scrie pe etichetă? Cu răspunsul tău setez intervalul în câteva secunde.
7. **Prețurile foarte reduse** (Q10 la 25 de lei, Liver Protect la 20 de lei): e lichidare? Contează pentru ce scriem în e-mailuri (C7).

---

## Anexa A. Produse vechi WooCommerce în catalog (70, toate epuizate, nedezactivate)

Adresele paginilor fac 301 spre produsul Shopify; imaginile dau 404. Ordinea e după numărul de comenzi istorice.

| # | ID theMarketer | Produs vechi (WooCommerce) | Categorie | Comenzi istorice | Ultima sincronizare |
|---|---|---|---|---|---|
| 1 | `67d95b090839f5bea004f3e8` | Prime Whey 2kg/66 serv | Pudre Proteice | 470 | acum 1 an |
| 2 | `67d95b090839f5bea004f3e7` | Prime Whey 1kg/33 serv | Pudre Proteice | 361 | acum 1 an |
| 3 | `67d95b090839f5bea004f3da` | Energy Pump Shot | Pre-Workout | 219 | acum 1 an |
| 4 | `67d95b090839f5bea004f3cb` | Creatina (Creapure®) 500g/100 serv | Creatina | 182 | acum 1 an |
| 5 | `67d95b090839f5bea004f3d0` | Pure Isolate 2kg/74 serv | Pudre Proteice | 174 | acum 1 an |
| 6 | `67d95b090839f5bea004f3cc` | EAA 500g/83 serv | Aminoacizi | 168 | acum 1 an |
| 7 | `67d95b090839f5bea004f3e9` | Cluster Insulin Bomb 1kg/33 serv | Intra-workout | 160 | acum 1 an |
| 8 | `67d95b090839f5bea004f3cf` | OMEGA-3 - 80 caps | Vitamine și Minerale | 155 | acum 1 an |
| 9 | `67d95b090839f5bea004f3ca` | Daily Vitamin Formula 30 packs | Vitamine și Minerale | 127 | acum 1 an |
| 10 | `67d95b090839f5bea004f3db` | Fat Burning Booster Shot | Arzătoare de grăsimi | 114 | acum 1 an |
| 11 | `67d95b090839f5bea004f3c9` | Magneziu Bisglicinat - 80 caps | Prime Health | 111 | acum 1 an |
| 12 | `67d95b090839f5bea004f3b3` | Vitamina D3 + K2 80 caps | Prime Health | 108 | acum 1 an |
| 13 | `67d95b090839f5bea004f3c0` | Vitamin C 1000 - 80 caps | Vitamine și Minerale | 95 | acum 1 an |
| 14 | `67d95b090839f5bea004f3d2` | Recovery Glutamin Kyowa® 500g/125 serv | Aminoacizi | 94 | acum 1 an |
| 15 | `67d95b090839f5bea004f3e0` | Unt de Migdale | Prime Health | 90 | acum 1 an |
| 16 | `67d95b090839f5bea004f3df` | Unt de Arahide | Prime Health | 90 | acum 1 an |
| 17 | `67d95b090839f5bea004f3bc` | NAC 80 caps | Vitamine și Minerale | 85 | acum 1 an |
| 18 | `67d95b090839f5bea004f3c4` | Baton proteic ciocolata si portocale | Batoane Proteice | 85 | acum 1 an |
| 19 | `67d95b090839f5bea004f3c2` | Baton proteic cocos și caramel | Batoane Proteice | 78 | acum 1 an |
| 20 | `67d95b090839f5bea004f3b2` | KSM-66 ASHWAGANDHA - 80 caps | Prime Health | 74 | acum 1 an |
| 21 | `67d95b090839f5bea004f3b1` | Citrus Bergamot - 80 caps | Prime Health | 73 | acum 1 an |
| 22 | `67d95b090839f5bea004f3bf` | Zinc citrate 80 caps | Vitamine și Minerale | 68 | acum 1 an |
| 23 | `67d95b090839f5bea004f3ba` | L-Carnitine 1000 - 80 caps | Arzătoare de grăsimi | 68 | acum 1 an |
| 24 | `67d95b090839f5bea004f3c5` | Baton proteic ciocolata si fructe de padure | Batoane Proteice | 67 | acum 1 an |
| 25 | `67d95b090839f5bea004f3e2` | Water Out - 500 ml | Prime Health | 65 | acum 1 an |
| 26 | `67d95b090839f5bea004f3e6` | Shaker Premium Accesorizat 500 ml | Accesorii | 64 | acum 1 an |
| 27 | `67d95b090839f5bea004f3ae` | Baton proteic alune și caramel | Batoane Proteice | 64 | acum 1 an |
| 28 | `67d95b090839f5bea004f3ce` | NITROX 3D 500g/25 serv | Pre-Workout | 62 | acum 1 an |
| 29 | `67d95b090839f5bea004f3d5` | Combat PRO 500g/22 serv | Pre-Workout | 60 | acum 1 an |
| 30 | `67d95b090839f5bea004f3c8` | Coenzima Q10 - 80 caps | Prime Health | 51 | acum 1 an |
| 31 | `6813ff99109087389b08447c` | Glycerol Max Pump 500g/125 serv | Intra-workout | 49 | acum 1 an |
| 32 | `67d95b090839f5bea004f3bb` | Magnesium Citrate 80 caps | Vitamine și Minerale | 49 | acum 1 an |
| 33 | `67d95b090839f5bea004f3b7` | Thermo core - 120 caps | Arzătoare de grăsimi | 46 | acum 1 an |
| 34 | `67d95b090839f5bea004f3ed` | Instant Oat Cream 800g/25 serv | Alimente sănătoase | 45 | acum 1 an |
| 35 | `67d95b090839f5bea004f3b9` | Chromium picolinate 80 caps | Vitamine și Minerale | 42 | acum 1 an |
| 36 | `67d95b090839f5bea004f3af` | Baton proteic caramel sarat | Batoane Proteice | 42 | acum 1 an |
| 37 | `67d95b090839f5bea004f3b6` | Water Out - 120 caps | Arzătoare de grăsimi | 41 | acum 1 an |
| 38 | `67d95b090839f5bea004f3ad` | Baton proteic căpșuni | Batoane Proteice | 40 | acum 1 an |
| 39 | `67d95b090839f5bea004f3be` | Turmeric extract 80 caps | Vitamine și Minerale | 39 | acum 1 an |
| 40 | `67d95b090839f5bea004f3c6` | Baton proteic lamaie si fructe de padure | Batoane Proteice | 38 | acum 1 an |
| 41 | `6813ff99109087389b08447b` | Potassium Complex 80 caps | Vitamine și Minerale | 35 | acum 1 an |
| 42 | `67d95b090839f5bea004f3ec` | Combat PRO 2.0 660g/30 serv | Pre-Workout | 35 | acum 1 an |
| 43 | `67d95b090839f5bea004f3ea` | Nitrox NO-STIM 660g/30 serv | Pre-Workout | 34 | acum 1 an |
| 44 | `67d95b090839f5bea004f3b8` | Complete Collagen - 500 ml | Prime Health | 32 | acum 1 an |
| 45 | `67d95b090839f5bea004f3c7` | Liver Protect 500 ml | Prime Health | 31 | acum 1 an |
| 46 | `67d95b090839f5bea004f3b4` | Testo Revive - 500 ml | Prime Health | 29 | acum 1 an |
| 47 | `67d95b090839f5bea004f3d1` | Recovery BCAA 500g/62 serv | Aminoacizi | 29 | acum 1 an |
| 48 | `6813ff99109087389b08447a` | Enzima nattokinaza 80 caps | Vitamine și Minerale | 28 | acum 1 an |
| 49 | `67d95b090839f5bea004f3c1` | Scortisoara Ceylon BIO - 200g | Prime Health | 28 | acum 1 an |
| 50 | `67d95b090839f5bea004f3cd` | Emperor MASS 3kg/42 serv | Pudre Proteice | 26 | acum 1 an |
| 51 | `67d95b090839f5bea004f3b5` | Cardio Calm - 500 ml | Prime Health | 26 | acum 1 an |
| 52 | `67d95b090839f5bea004f3b0` | Baton proteic ciocolata & caramel | Batoane Proteice | 24 | acum 1 an |
| 53 | `681390733914f1089a0ea39b` | Spirulina 80 caps | Vitamine și Minerale | 17 | acum 1 an |
| 54 | `681390733914f1089a0ea39c` | Silimarina extract 80 caps | Vitamine și Minerale | 16 | acum 1 an |
| 55 | `67d95b090839f5bea004f3bd` | Taurine 80 caps | Aminoacizi | 16 | acum 1 an |
| 56 | `67d95b090839f5bea004f3d6` | Maiou Stringer Black | Îmbrăcăminte | 10 | acum 1 an |
| 57 | `67d95b090839f5bea004f3c3` | Șapcă Prime | Accesorii | 6 | acum 1 an |
| 58 | `67d95b090839f5bea004f3d4` | T-shirt Drop Shoulder Muscle Black | Îmbrăcăminte | 6 | acum 1 an |
| 59 | `67d95b090839f5bea004f3d7` | Maiou 'Fuel Your Prime' White | Îmbrăcăminte | 4 | acum 1 an |
| 60 | `67d95b090839f5bea004f3d8` | Short "Arnold Era" | Îmbrăcăminte | 4 | acum 1 an |
| 61 | `67d95b090839f5bea004f3de` | T-shirt Drop Shoulder Muscle White | Îmbrăcăminte | 3 | acum 1 an |
| 62 | `67d95b090839f5bea004f3dc` | Prosop Negru Prime | Accesorii | 3 | acum 1 an |
| 63 | `67d95b090839f5bea004f3dd` | Hanorac cu broderie “Prime Squad” | Îmbrăcăminte | 3 | acum 1 an |
| 64 | `67d95b090839f5bea004f3d9` | Centura "Hardcore" | Accesorii | 3 | acum 1 an |
| 65 | `67d95b090839f5bea004f3eb` | T-shirt Body Tight | Îmbrăcăminte | 2 | acum 1 an |
| 66 | `67d95b090839f5bea004f3e1` | Prime Bodybuilding Classic Pants | Îmbrăcăminte | 1 | acum 1 an |
| 67 | `67d95b090839f5bea004f3e3` | Tricou pentru femei basic alb | Îmbrăcăminte | 0 | acum 1 an |
| 68 | `67d95b090839f5bea004f3d3` | Shaker PRIME Bottle | Accesorii | 0 | acum 1 an |
| 69 | `67d95b090839f5bea004f3e5` | Unt de Caju | Prime Health | 0 | acum 1 an |
| 70 | `67d95b090839f5bea004f3e4` | Tricou pentru femei basic negru | Îmbrăcăminte | 0 | acum 1 an |

---

Fișiere de lucru (fără date de clienți): `work/catalog/products.tsv` (toate cele 279 de produse), `work/catalog/rec_log.tsv`, `work/catalog/excl_list.tsv`, `work/catalog/excl_done.log`.
