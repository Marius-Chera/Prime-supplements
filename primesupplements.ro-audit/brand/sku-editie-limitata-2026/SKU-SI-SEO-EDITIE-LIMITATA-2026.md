# Hanorac + pantaloni lungi bumbac, ediție limitată 2026 – coduri EAN (= SKU), titluri SEO, pachet pentru producător

Data: 9.11.2026 (trei versiuni în aceeași zi; aceasta e cea valabilă).

## Cerințele proprietarului (9.11.2026)

1. Titluri pentru ambele produse, bune ca titluri SEO (ușor de găsit în Google, să vândă).
2. **SKU = codul EAN** (așa lucrează Prime; fără SKU-uri text).
3. **Fără design de cartonaș** – de el se ocupă producătorul. Noi dăm doar: titlul produsului, codul EAN și codul de bare pentru fiecare mărime, pentru cele două produse.
4. Documentele trimise producătorului în **engleză**; **titlurile și ce apare pe cartonaș în română**.
5. Pachetul pe desktop.

## Cum s-au ales codurile EAN

- Lista proprietarului „Coduri SKU si EAN .xls” (desktop, 18.02.2025) arată două sisteme: suplimentele au coduri `6421766…` / `0655383…` / `0757226…` (prefixele producătorilor), iar **hainele Prime (Prime Squad, Drop Shoulder, Stringer, Body Tight, Arnold Era, șapcă) au coduri EAN-13 interne care încep cu 400…**. Prefixul 6421766 nu e, deci, al firmei, ci al fabricii de suplimente; prima variantă din 9.11 (06441–06454 din 6421766) a fost abandonată din acest motiv.
- Codurile noi urmează sistemul hainelor: EAN-13 interne cu prefix **400**, într-un bloc dedicat ușor de recunoscut: `4002026 1 000x` hanoracul, `4002026 2 000x` pantalonii (2026 = ediția, 1/2 = produsul, ultima cifră înainte de control = mărimea 1–7), plus cifra de control GS1.
- Verificat: niciun cod din Excel și din Shopify (toate variantele, SKU și cod de bare) nu începe cu 4002026.
- Codurile 400 sunt interne (nu sunt înregistrate la GS1); la fel ca la celelalte haine Prime, în Merchant Center se trimit fără GTIN (`identifier_exists=false`), vezi ECOMMERCE-05 în ACTION-PLAN.

## Codurile EAN-13 (= SKU, și în Shopify și în Oblio)

| Mărime | Hanorac | Pantaloni lungi din bumbac |
|---|---|---|
| S | `4002026100012` | `4002026200019` |
| M | `4002026100029` | `4002026200026` |
| L | `4002026100036` | `4002026200033` |
| XL | `4002026100043` | `4002026200040` |
| XXL | `4002026100050` | `4002026200057` |
| 3XL | `4002026100067` | `4002026200064` |
| 4XL | `4002026100074` | `4002026200071` |

În Shopify, la fiecare variantă se completează **și SKU, și Barcode** cu același cod. Lista e și în `Prime-Limited-Edition-2026-labels/ean-codes.csv`.

## Titlurile

### Ce se tipărește pe cartonaș (română, exact așa)

- **Hanorac Prime Ediție Limitată 2026**
- **Pantaloni Prime din bumbac Ediție Limitată 2026**

### Pe site (titlul produsului = H1; culoarea se adaugă la publicare, când o știm)

Modelul e cel al hainelor Prime deja publicate (titlu românesc cu brandul, titlu SEO sub 60 de caractere cu sufixul „| Prime Supplements”, descriere SEO sub 155 de caractere cu material, mărimi și „Comandă online”).

**Hanorac**
- Titlu produs: **Hanorac Prime Ediție Limitată 2026 – [culoare]**
- Handle: `/products/hanorac-prime-editie-limitata-2026`
- Titlu SEO (54 car.): **Hanorac Prime ediție limitată 2026 | Prime Supplements**
- Descriere SEO: **Hanorac Prime în ediție limitată 2026, [material], pentru sală și purtare zilnică. Mărimi de la S la 4XL, stoc limitat. Comandă online, livrare rapidă în România.**
- Tip produs `Hanorace`; etichete `Îmbrăcăminte`, `hanorac`, `fara-email-navigare`; vendor `Prime Supplements`.

**Pantaloni**
- Titlu produs: **Pantaloni Prime din bumbac Ediție Limitată 2026 – [culoare]**
- Handle: `/products/pantaloni-bumbac-prime-editie-limitata-2026`
- Titlu SEO (57 car.): **Pantaloni bumbac ediție limitată 2026 | Prime Supplements**
- Descriere SEO: **Pantaloni lungi din bumbac Prime, ediție limitată 2026, comozi la sală și în timpul liber. Mărimi de la S la 4XL, stoc limitat. Comandă online, livrare rapidă.**
- Tip produs `Pantaloni`; etichete `Îmbrăcăminte`, `pantaloni`, `fara-email-navigare`; vendor `Prime Supplements`.

De ce așa: „hanorac” și „pantaloni (din) bumbac” sunt cuvintele căutate în română; „Prime” aduce căutările de brand; „ediție limitată 2026” diferențiază de Prime Squad / Bodybuilding Classic și susține urgența (stoc limitat). Titlul SEO și descrierea se trimit împreună (altfel câmpul netrimis se golește).

## Pachetul pentru producător (în engleză)

Folder `Prime-Limited-Edition-2026-labels/` (și ZIP cu același nume; copiate pe desktop):
- `Prime-Limited-Edition-2026-label-data.pdf` – 2 pagini, engleză: ce trebuie să conțină cartonașul (titlu în română, mărime, cod de bare EAN-13 cu cifre), tabel per produs (mărime, EAN, cod de bare, numele fișierului), cerințe de tipărire a codului de bare (negru pe alb, minimum 80 %, zone libere, cifre lizibile, probă înainte de tiraj). Fără design: layout-ul e al producătorului.
- `barcodes-png/PRODUS-MĂRIME-EAN.png` – 14 coduri de bare, 300 dpi, modul 6 px, doar cod + cifre pe alb.
- `barcodes-svg/PRODUS-MĂRIME-EAN.svg` – aceleași 14 coduri, vectorial, la mărimea nominală GS1 (37,29 × 25,93 mm).
- `ean-codes.csv` – product, product_title_ro, size, ean13, fișierele.

Generator: `make.ps1` (System.Drawing + codificator EAN-13 propriu + Chrome headless pentru PDF). Verificare 9.11.2026: toate cele 28 de coduri de bare (PNG și SVG) au fost decodate cu ZXing în browserul încorporat și fiecare coincide cu codul tipărit; PDF-ul verificat vizual (pdf.js).

## Ce rămâne de făcut

- E-mailul către producător cu ZIP-ul (proprietarul; textul se poate scrie la cerere).
- Când sosesc hainele: produsele în Shopify (Draft până la poze) cu codurile în SKU și Barcode, titlurile și SEO-ul de mai sus; stocul din Oblio (regula proprietarului). Aceleași coduri la recepția în Oblio.
- Completarea culorii și a materialului în titluri și descrieri.
