# Verificare tabel „ONLINE – comenzi pe zile (L–V)”, octombrie 2026

Cerut de Marius pe 09.11.2026: e corect rândul „Octombrie” din tabelul ONLINE (poza trimisă în chat)? Raport trimis pe e-mail către adelina.chera@gmail.com (CC marius.chera@yahoo.com), din contact@primesupplements.ro.

Sursa: Shopify Analytics (ShopifyQL `FROM sales SHOW orders TIMESERIES day`), comenzi plasate pe zi, ora României.

## Cum e calculat tabelul (verificat pe iulie)
Pentru fiecare zi a săptămânii: totalul comenzilor plasate în acea zi, împărțit la câte zile de acel fel are luna. „Media/zi” = media celor 5 valori L–V.
Iulie 2026 din Shopify dă exact rândul din poză: 28,00 / 26,50 / 21,40 / 13,00 / 19,00, Media/zi 21,58. Metoda e deci confirmată.

## Octombrie 2026: tabel vs Shopify

| Ziua | În tabel | Corect (Shopify) | Calcul | Diferență |
|---|---|---|---|---|
| Luni | 19,71 | **22,50** | 18+34+21+17 = 90 / 4 | −2,79 |
| Marți | 27,33 | **22,00** | 15+27+21+25 = 88 / 4 | +5,33 |
| Miercuri | 20,67 | **27,25** | 32+35+31+11 = 109 / 4 | −6,58 |
| Joi | 15,67 | **19,00** | 28+13+26+18+10 = 95 / 5 | −3,33 |
| Vineri | 11,67 | **19,80** | 25+21+16+7+30 = 99 / 5 | −8,13 |
| Media/zi | 19,29 | **22,11** | | −2,82 |

**Concluzie: rândul „Octombrie” NU e corect.** Valorile de marți–vineri sunt identice cu rândul „Septembrie”, deci rândul a fost copiat din septembrie (doar luni s-a schimbat). Valori de tipul 27,33 / 20,67 / 15,67 / 11,67 înseamnă împărțire la 3, dar octombrie are 4 zile de luni–miercuri și 5 de joi–vineri.

Octombrie real: 22,11 comenzi/zi L–V, peste targetul ~19.

## Bonus: și rândul „Septembrie” e incomplet
Rândul din tabel corespunde doar primelor ~3 săptămâni (marți 1, 8, 15 → 82/3 = 27,33; miercuri 2, 9, 16 → 20,67; joi 3, 10, 17 → 15,67; vineri 4, 11, 18 → 11,67; luni 7, 14 → 22,00), adică a fost completat pe la 20.09.

| Ziua | În tabel | Corect, luna întreagă |
|---|---|---|
| Luni | 22,00 | 18,75 (75 / 4) |
| Marți | 27,33 | 28,60 (143 / 5) |
| Miercuri | 20,67 | 21,20 (106 / 5) |
| Joi | 15,67 | 13,75 (55 / 4) |
| Vineri | 11,67 | 12,00 (48 / 4) |
| Media/zi | 19,29 | 18,86 |

## Cifre totale octombrie
- Comenzi plasate: 634 în Shopify Analytics (aceeași sursă ca tabelul); 650 în lista de comenzi, din care 24 anulate.
- Luni–vineri: 481 comenzi; weekend: 153 (sâmbătă 73, duminică 80).
- Colete expediate (fulfilled) în octombrie: 619, doar L–V.
- Septembrie: 495 comenzi în Analytics, deci octombrie a avut cu ~28% mai multe.
