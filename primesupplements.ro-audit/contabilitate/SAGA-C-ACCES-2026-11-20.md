# SAGA C – cum vedem ce înregistrează contabila (20.11.2026)

## Situația
- Contabila lucrează în **SAGA C** (program instalat pe calculatorul ei, fără acces online).
- Nu există cont web în care să ne logăm, deci varianta aleasă e **varianta 1: arhiva de salvare a firmei**.
- **20.11: Marius a cerut deja contabilei arhiva de salvare a firmei.** Așteptăm fișierul.

## Variantele discutate (20.11)
1. **Arhiva de salvare SAGA C** – ALEASĂ. Se vede tot: note contabile, conturi, jurnale, balanța.
2. Rapoarte exportate (balanța de verificare, fișe de cont, jurnale de vânzări/cumpărări) – rămân rezervă.
3. SPV ANAF (D300, D394, D406, D112 depuse) – verificare suplimentară, fără nimic de la contabilă.
4. AnyDesk/TeamViewer doar vizualizare – doar pentru o discuție punctuală.

## Ce facem când vine arhiva
1. Marius pune arhiva în `D:\Prime Supplements\contabilitate-saga\` (în afara repo-ului: sunt datele contabile ale firmei, nu se urcă pe GitHub).
2. Claude o dezarhivează într-un folder separat și identifică baza de date (fișierul `.FDB`, Firebird) și versiunea ei.
3. Claude instalează pe PC doar un cititor Firebird de pe site-ul oficial (cu acordul lui Marius) și deschide baza **numai în citire**, pe o copie. Originalul nu se atinge, iar în SAGA-ul contabilei nu se schimbă nimic.
4. Prima analiză (luna octombrie, apoi noiembrie):
   - balanța de verificare și soldurile conturilor principale: 4111 clienți, 401 furnizori, 5121 bancă, 5311 casă, 5125 sume în curs de decontare (Cargus/Netopia/Shopify Payments), 371 mărfuri, 707 venituri, 4426/4427/4423 TVA;
   - **comparația cu Oblio și Total Admin:** facturi lipsă sau în plus, încasările ramburs (OP Cargus) și card (Netopia, apoi Shopify Payments) puse pe ce facturi;
   - cum au fost înregistrate cele 10 anulări și 16 stornări din noiembrie (`livrare/RAPORT-ANULARI-STORNARI-2026-11-19.md`);
   - returul Nutrafit din 7.10 fără document (`contabilitate/INCHIDERE-OCTOMBRIE-2026-11-09.md`, punctul 3).
5. Rezultatul: raport în `contabilitate/` (fără date personale ale clienților în repo), cu întrebările concrete pentru contabilă.

## Pe viitor
- Arhiva se cere lunar, după închiderea lunii (după depunerea D300).
- Dacă merge, o rutină lunară compară automat SAGA cu raportul de închidere din Total Admin.
