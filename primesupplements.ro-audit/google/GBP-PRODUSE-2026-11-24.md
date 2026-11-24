# Google Business Profile PrimeStore – secțiunea „Produse” (24.11.2026)

Marius: „punctul 1 direct, ai acordul meu”. Pozele sunt cele din Shopify, copiate și în `google/gbp-produse/`.

## Starea pe 24.11 seara
| # | Produs | Categorie GBP | Preț (lei) | Link | Stare |
|---|---|---|---|---|---|
| 1 | Prime Whey – proteină din zer, 2 kg | Proteine | 390 | /products/prime-whey-2000g | trimis („Se adaugă produsul”) |
| 2 | Prime Whey – proteină din zer, 1 kg | Proteine | 215 | /products/prime-whey-1000g | trimis |
| 3 | Pure Isolate – izolat proteic din zer, 2 kg | Proteine | 510 | /products/pure-isolate-2000g | completat; publicarea de verificat (fereastra s-a închis) |
| 4 | Creatină Creapure® monohidrată – 300 g și 500 g | Creatină (nouă) | 115 | /products/creatina-creapure | **de făcut** |
| 5 | Creatină monohidrată micronizată, 300 g | Creatină | 98 | /products/creatina-monohidrat-micronized-300g-fara-aroma | de făcut |
| 6 | Cremă de orez Prime Creamy Rice, 1 kg | Cremă de orez (nouă) | 65 | /collections/crema-de-orez | de făcut |
| 7 | Aminoacizi esențiali EAA, 500 g | Aminoacizi (nouă) | 175 | /products/eaa-aminoacizi-esentiali | de făcut |
| 8 | Pre-workout Combat Pro cu cafeină, 500 g | Pre-workout (nouă) | 140 | /products/combat-pro | de făcut |
| 9 | Pre-workout Nitrox 3D, 500 g | Pre-workout | 190 | /products/nitrox | de făcut |
| 10 | Magneziu bisglicinat 300 mg, 80 capsule | Vitamine și minerale (nouă) | 70 | /products/magneziu-bisglicinat-80-caps | de făcut |
| 11 | Vitamina D3 + K2, 80 capsule | Vitamine și minerale | 75 | /products/vitamina-d3-k2 | de făcut |
| 12 | Omega-3 din ulei de pește, 80 capsule | Vitamine și minerale | 69 | /products/omega-3 | de făcut |

Descrierile sunt scurte, factuale, fără mențiuni de sănătate, și se termină cu „O găsești la PrimeStore Sibiu și online”.

## Cum se face (tehnica care merge)
1. Căutare Google „Magazin Suplimente - PrimeStore” (contul primesupplementsro@gmail.com) → „Modifică produsele” → „Începe” / „Adaugă următorul produs”.
2. Câmpurile se completează prin clic și tastare: nume, categorie (lista sau „Creează o nouă categorie”), preț, descriere, URL.
3. **Poza: NU se apasă „Selectați o fotografie”** (deschide fereastra Windows; un Escape închide tot editorul). Se pune din pagină: în iframe-ul cu „Trage o fotografie aici” se setează `input[type=file].files` dintr-un `DataTransfer` cu un `File` luat prin `fetch` de pe cdn.shopify.com (`&width=1200&format=jpg`), apoi un eveniment `change`. Se așteaptă ~6 s pentru încărcare.
4. „Publică” → „Se adaugă produsul” (apare pe profil în până la 30 de minute) → „Adaugă următorul produs”.
5. Atenție: dacă fereastra se închide, tastarea ajunge în bara de căutare Google. Verifică fereastra înainte de fiecare produs.
