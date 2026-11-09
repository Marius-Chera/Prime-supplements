# Hanorac + pantaloni lungi bumbac, ediție limitată 2026 – coduri SKU și titluri SEO

Data: 9.11.2026. Cerut de proprietar: coduri SKU pentru cele două produse noi aflate în producție, titluri SEO pentru site și cartonașe cu SKU per mărime pentru producător (puse în polybag).

## Convenția SKU (cea deja folosită în magazin pentru hainele Prime)

Hainele Prime existente au SKU-uri de forma `PREFIX-MODEL-(CULOARE)-MĂRIME`:

| Produs existent | SKU exemplu |
|---|---|
| Hanorac Prime Squad cu glugă și fermoar – negru | `HR-HANORAC-PRIMESQUAD-XS` … `-XXL` |
| Pantaloni Prime Bodybuilding Classic – negri | `PANTS-B-BODYBUILDING-CLASSIC-M` |
| Pantaloni scurți Prime „Arnold Era” | `PANTS-B-ARNOLD-ERA-S` |
| Tricou Prime Drop Shoulder Muscle – negru | `TH-B-DROP-SHOULDER-NEGRU-M` |
| Maiou stringer Prime – negru | `MAI-STRINGER-NEGRU-S` |

Hainele MNX au coduri numerice ale furnizorului (ex. `50016001`), deci nu se amestecă.

Codurile noi păstrează aceleași prefixe (`HR-HANORAC-` pentru hanorace, `PANTS-B-` pentru pantaloni), modelul `LIMITED-2026` și mărimea la final. Dacă produsul va avea mai multe culori, se adaugă culoarea înainte de mărime (ex. `HR-HANORAC-LIMITED-2026-NEGRU-XL`), ca la tricourile Drop Shoulder.

## Codurile SKU

| Mărime | Hanorac ediție limitată 2026 | Pantaloni lungi bumbac ediție limitată 2026 |
|---|---|---|
| S | `HR-HANORAC-LIMITED-2026-S` | `PANTS-B-LIMITED-2026-S` |
| M | `HR-HANORAC-LIMITED-2026-M` | `PANTS-B-LIMITED-2026-M` |
| L | `HR-HANORAC-LIMITED-2026-L` | `PANTS-B-LIMITED-2026-L` |
| XL | `HR-HANORAC-LIMITED-2026-XL` | `PANTS-B-LIMITED-2026-XL` |
| XXL | `HR-HANORAC-LIMITED-2026-XXL` | `PANTS-B-LIMITED-2026-XXL` |
| 3XL | `HR-HANORAC-LIMITED-2026-3XL` | `PANTS-B-LIMITED-2026-3XL` |
| 4XL | `HR-HANORAC-LIMITED-2026-4XL` | `PANTS-B-LIMITED-2026-4XL` |

Verificat în Shopify (9.11.2026): niciun SKU existent nu începe cu `HR-HANORAC-LIMITED` sau `PANTS-B-LIMITED`, deci nu există coliziuni.

## Titluri și SEO pentru site

Modelul folosit la hainele Prime deja de pe site: titlul produsului în română, cu brandul și culoarea („Hanorac Prime Squad cu glugă și fermoar – negru”), titlul SEO sub 60 de caractere cu sufixul „| Prime Supplements”, descrierea SEO sub 155 de caractere, cu materialul, mărimile și „Comandă online”. Culoarea și materialul hanoracului nu sunt cunoscute încă; se completează la publicare (vezi parantezele).

### Hanorac

- Titlu produs: **Hanorac Prime ediție limitată 2026 – [culoare]** (dacă are glugă și fermoar: „Hanorac Prime cu glugă ediție limitată 2026 – [culoare]”)
- Handle (URL): `/products/hanorac-prime-editie-limitata-2026`
- Titlu SEO (54 car.): **Hanorac Prime ediție limitată 2026 | Prime Supplements**
- Descriere SEO (152 car.): **Hanorac Prime în ediție limitată 2026, [material], pentru sală și purtare zilnică. Mărimi de la S la 4XL, stoc limitat. Comandă online, livrare rapidă în România.**
- Alternativă titlu SEO, dacă vrem cuvântul-cheie „bărbați”: „Hanorac bărbați Prime ediție limitată 2026 | Prime Supplements” (62 car., puțin peste limită; de folosit doar fără „Prime” înainte de „ediție”).
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
- Opțional, după lansare: un pachet „Set ediție limitată 2026” (hanorac + pantaloni), ca seturile MNX Hammer din octombrie.

## Cartonașele pentru producător

- Script: `make.ps1` (System.Drawing, rulat pe PC). Ieșire în `cartonase/`: 14 PNG-uri, câte unul per SKU, 1004 × 650 px la 300 dpi (85 × 55 mm, format carte de vizită), cu logo, titlu, „EDIȚIE LIMITATĂ 2026”, mărimea în casetă neagră și SKU-ul mare.
- `FISA-SKU-hanorac-2026.png` și `FISA-SKU-pantaloni-2026.png`: tabelul mărime → SKU, pentru corpul e-mailului.
- `SKU-cartonase-editie-limitata-2026.zip`: toate imaginile, de atașat la e-mailul către producător.

## Ce rămâne de făcut

- Când sosesc hainele: crearea celor două produse în Shopify (Draft până la poze), cu SKU-urile de mai sus pe variante, titlurile și SEO-ul de mai sus; stocul se încarcă din Oblio, nu manual (regula proprietarului).
- Completarea culorii și a materialului în titluri și descrieri.
