# Comparație SAGA ↔ Oblio – facturile din octombrie 2026

Sursa: SAGA C (arhiva Eurotax din 20.11.2026, tabela IESIRI și registrul jurnal) față de Oblio (raportul de facturi, 01–31.10.2026, citit din Chrome pe 20.11.2026). Comparația s-a făcut factură cu factură, pe număr, dată și total.

## Rezultat: facturile se potrivesc

| | SAGA | Oblio |
|---|---|---|
| Facturi PRS | 756 | 759 |
| Total facturi PRS (lei) | 269.766,01 | 269.766,01 (fără anulată și fără cea în EUR) |
| Rapoarte Z casa de marcat (magazin) | 27 / 35.566,91 | – (nu sunt în Oblio) |

- **Toate cele 756 de facturi din SAGA există în Oblio, cu aceeași dată și același total**, la ban. Asta include stornările din octombrie.
- **Nicio factură din SAGA nu lipsește din Oblio.**
- Cele 3 facturi din Oblio care nu sunt în lista SAGA:

| Factura | Data | Total | Explicație |
|---|---|---|---|
| PRS15944 | 09.10 | 220,00 | **Anulată** în Oblio, netrimisă în SPV. Corect că nu e în SAGA. |
| PRS16209 | 20.10 | 176,39 EUR = 939,66 lei | Client din Slovenia (ARBOS d.o.o., taxare inversă). **E în SAGA**, înregistrată ca prestare de servicii (4111 = 704) și compensată în aceeași zi cu o factură ARBOS. Nu apare în lista de facturi de mărfuri, de aceea a ieșit la comparație. În Oblio apare „netrimisă” la e-Factura și „neîncasată”. |
| PRS16208 | 15.10 | 0,00 | Produs cadou: 1 creatină 300 g cu discount 100 %, trimisă în SPV. Nu e în SAGA (valoare 0). Produsul a ieșit din stoc în Oblio. |

## Ce e de clarificat (mic)
1. **PRS16209 (ARBOS):** în SAGA e pe 704 (servicii). Ce s-a facturat de fapt, marfă sau servicii? Pentru o livrare intracomunitară de bunuri, declarația 390 (VIES) și contul 707 ar fi diferite. Factura nu e trimisă în e-Factura. Pentru clienți din UE nu e obligatoriu, dar merită confirmat de contabilă.
2. **PRS16208 și alte facturi cadou de 0 lei:** produsul iese din stoc în Oblio, dar în SAGA nu există factura. Ieșirea apare probabil doar la descărcarea globală de gestiune sau la inventar (6588). Merită confirmat cum sunt tratate cadourile; contează și pentru TVA.

## Ce nu s-a comparat încă
- Încasările din octombrie (5125 ↔ 5121: Cargus ramburs, Netopia/Shopify Payments, încasări la casă) față de extrasul BT și raportul de închidere din Total Admin.
- Costul mărfii și stocurile (371) din SAGA față de stocul din Oblio. Ar explica marja de 14 % din septembrie (`RAPORT-BALANTA-SEPTEMBRIE-2026.md`).
