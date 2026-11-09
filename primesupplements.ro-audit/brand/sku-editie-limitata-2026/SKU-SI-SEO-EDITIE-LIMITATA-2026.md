# Hanorac + pantaloni lungi bumbac, ediție limitată 2026 – coduri EAN (= SKU) și titluri SEO

Data: 9.11.2026. Cerut de proprietar: coduri pentru cele două produse noi aflate în producție, titluri SEO pentru site și cartonașe cu cod de bare per mărime pentru producător (puse în polybag). **Regula proprietarului (9.11.2026): la Prime, SKU-ul este chiar codul EAN**, nu un cod text; prima variantă (SKU-uri text de tip `HR-HANORAC-LIMITED-2026-S`) a fost înlocuită în aceeași zi.

## Cum s-au ales codurile

- Prefixul GS1 al firmei este **6421766** (GS1 România, „642”). Toate suplimentele Prime au coduri `6421766 0xxxx c`; referințele folosite în magazin merg de la 01480 (Energy Pump Shot 25 ml) până la **06440** (Creapure 300 g, `6421766064404`), cu blocuri la 0642x pentru cremele de orez și 06410 pentru creatina micronizată.
- Codurile noi continuă imediat după ultimul folosit: **06441–06447** hanoracul, **06448–06454** pantalonii. Cifra de control e calculată după algoritmul GS1 (suma cifrelor de pe poziții impare + 3 × suma celor de pe poziții pare).
- Verificat în Shopify pe 9.11.2026 (toate variantele, inclusiv Draft și Arhivate, câmpurile SKU și cod de bare): niciun cod din intervalul 06441–06454 nu e folosit.
- **De verificat de proprietar în contul GS1 România (My GS1 / Activate):** că referințele 06441–06454 nu au fost deja alocate altor produse care nu sunt în Shopify (de exemplu etichete pregătite la producătorul de suplimente). Dacă sunt, se mută blocul mai sus și se rulează din nou `make.ps1` (doar `start` în `$PRODUCTS`).
- Hainele Prime mai vechi (Prime Squad, Drop Shoulder, Bodybuilding Classic) au SKU-uri text și fără cod de bare; cele MNX au codurile numerice ale furnizorului. Nu s-a schimbat nimic la ele.

## Codurile EAN-13 (= SKU în Shopify și Oblio)

| Mărime | Hanorac ediție limitată 2026 | Pantaloni lungi bumbac ediție limitată 2026 |
|---|---|---|
| S | `6421766064411` | `6421766064480` |
| M | `6421766064428` | `6421766064497` |
| L | `6421766064435` | `6421766064503` |
| XL | `6421766064442` | `6421766064510` |
| XXL | `6421766064459` | `6421766064527` |
| 3XL | `6421766064466` | `6421766064534` |
| 4XL | `6421766064473` | `6421766064541` |

Lista e și în `coduri-ean.csv` (produs, mărime, EAN), pentru import în Shopify / Oblio. În Shopify, la fiecare variantă se completează **și SKU, și Barcode** cu același cod (așa sunt toate suplimentele Prime).

## Titluri și SEO pentru site

Modelul folosit la hainele Prime deja de pe site: titlul produsului în română, cu brandul și culoarea („Hanorac Prime Squad cu glugă și fermoar – negru”), titlul SEO sub 60 de caractere cu sufixul „| Prime Supplements”, descrierea SEO sub 155 de caractere, cu materialul, mărimile și „Comandă online”. Culoarea și materialul hanoracului nu sunt cunoscute încă; se completează la publicare (vezi parantezele).

### Hanorac

- Titlu produs: **Hanorac Prime ediție limitată 2026 – [culoare]** (dacă are glugă și fermoar: „Hanorac Prime cu glugă ediție limitată 2026 – [culoare]”)
- Handle (URL): `/products/hanorac-prime-editie-limitata-2026`
- Titlu SEO (54 car.): **Hanorac Prime ediție limitată 2026 | Prime Supplements**
- Descriere SEO (152 car.): **Hanorac Prime în ediție limitată 2026, [material], pentru sală și purtare zilnică. Mărimi de la S la 4XL, stoc limitat. Comandă online, livrare rapidă în România.**
- Tip produs: `Hanorace`; etichete: `Îmbrăcăminte`, `hanorac`, `fara-email-navigare` (ca la Prime Squad); vendor `Prime Supplements`.

### Pantaloni lungi din bumbac

- Titlu produs: **Pantaloni lungi din bumbac Prime ediție limitată 2026 – [culoare]**
- Handle (URL): `/products/pantaloni-bumbac-prime-editie-limitata-2026`
- Titlu SEO (57 car.): **Pantaloni bumbac ediție limitată 2026 | Prime Supplements**
- Descriere SEO (150 car.): **Pantaloni lungi din bumbac Prime, ediție limitată 2026, comozi la sală și în timpul liber. Mărimi de la S la 4XL, stoc limitat. Comandă online, livrare rapidă.**
- Tip produs: `Pantaloni`; etichete: `Îmbrăcăminte`, `pantaloni`, `fara-email-navigare`; vendor `Prime Supplements`.

### Observații SEO

- „Hanorac” și „pantaloni” sunt cuvintele căutate în română; „ediție limitată 2026” diferențiază față de Prime Squad și Bodybuilding Classic și susține mesajul de stoc limitat.
- La publicare, titlul și descrierea SEO se trimit împreună (altfel câmpul netrimis se golește – regulă notată din sesiunile anterioare).
- Cu cod EAN valid pe variante, produsele intră curat și în Merchant Center (fără `identifier_exists=false`).
- Opțional, după lansare: un pachet „Set ediție limitată 2026” (hanorac + pantaloni), ca seturile MNX Hammer din octombrie.

## Cartonașele pentru producător

- Script: `make.ps1` (System.Drawing, rulat pe PC, cu codificator EAN-13 propriu). Ieșire în `cartonase/`: 14 PNG-uri `PRODUS-MĂRIME-EAN.png`, 1004 × 650 px la 300 dpi (85 × 55 mm, format carte de vizită), cu logo, titlu, „EDIȚIE LIMITATĂ 2026”, mărimea în casetă neagră și codul de bare EAN-13 cu cifrele dedesubt (modul 4 px ≈ 0,34 mm, adică ~103 % din mărimea nominală GS1; gardurile prelungite).
- Verificare 9.11.2026: toate cele 14 cartonașe au fost decodate cu ZXing (în browserul încorporat) și fiecare cod citit coincide cu codul tipărit.
- `FISA-EAN-hanorac-2026.png` și `FISA-EAN-pantaloni-2026.png`: tabelul mărime → EAN → cod de bare mic, pentru corpul e-mailului.
- `EAN-cartonase-editie-limitata-2026.zip`: cartonașele, fișele și `coduri-ean.csv`, de atașat la e-mailul către producător (copiat și pe desktop).
- Recomandare pentru producător: tipărire la 300 dpi, fără redimensionare a codului de bare, pe carton alb mat (lucios reflectă la scanare), cu cel puțin 3 mm spațiu alb în jurul codului.

## Ce rămâne de făcut

- Proprietarul confirmă în contul GS1 România că 06441–06454 sunt libere și le înregistrează.
- Când sosesc hainele: crearea celor două produse în Shopify (Draft până la poze), cu codurile EAN în SKU și Barcode pe fiecare variantă, titlurile și SEO-ul de mai sus; stocul se încarcă din Oblio, nu manual (regula proprietarului). Aceleași coduri se introduc în Oblio la recepție.
- Completarea culorii și a materialului în titluri și descrieri.
