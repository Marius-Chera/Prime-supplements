# Marja medie pentru reclame – calculată pe 19.11.2026 (cerută de Marius)

**Rezultat: ~17 % din valoarea comenzii cu TVA.** Pragul de rentabilitate al reclamelor e deci **ROAS ≈ 5,9** (100 / 17). ROAS-ul țintă automat e 7,6 (1,3 × prag). Valoarea e setată în Reclame Prime → Strategie → Setări (`app_settings.strategy.margin = 17`) și se poate schimba de acolo.

## Sursa
- **Oblio, „Profit pe produs”, gestiunea online (228124), 3–18.11.2026.** Raportul s-a citit zi cu zi: pe intervale mai lungi dă timeout la 30 s. În weekend nu se emit facturi.
  - Vânzări nete fără TVA (după discount): **134.821 lei**. Discounturi: 28.788 lei.
  - Cost de achiziție (costul mediu din NIR-uri, același pe care îl folosește Oblio): **97.479 lei**.
  - **Profit brut: 27,7 %** din vânzările fără TVA. Pe zile variază între 20 % și 36 %; pe 3.11 a fost 6 %, probabil o vânzare cu discount mare.
- **Shopify, 1–18.11:** 399 de comenzi necanulate, 134.030 lei cu TVA, comanda medie 336 lei; 204 comenzi au peste 300 lei (transport gratuit).
  - TVA-ul e ~15,5 % din totalul comenzii (mix de 21 % și 11 %).
  - Transportul încasat e 20 lei, sub 300 lei.
  - Costul unitar (`unitCost`) lipsește la majoritatea produselor din Shopify, deci costurile au venit din Oblio.

## Calculul, la 100 lei încasați cu TVA
| | lei |
|---|---|
| TVA | −15,5 |
| transport încasat (fără TVA) | −2,4 |
| = vânzare de produse fără TVA | 82,1 |
| profit brut 27,7 % | **22,7** |
| transport Cargus plătit (~20 lei/colet, minus cel încasat) | −3,6 |
| ambalaj (1 leu/colet) | −0,3 |
| comisioane card (~2,5 % pe ~1/3 din comenzi) | −0,8 |
| ramburs refuzat (~4 % din comenzile ramburs) + comision ramburs | −1,0 |
| **marjă de contribuție** | **≈ 17,0** |

## Ce nu e inclus
- Costurile fixe (chirie, salarii, aplicații).
- Valoarea clienților noi care revin: Marius vrea clienți noi, care valorează mai mult decât prima comandă.

Dacă vrem să ținem cont de clienții care revin, ROAS-ul țintă se poate coborî manual din Setări. Exemplu: dacă un client nou cumpără în medie de 1,5 ori pe an, pragul real scade de la ~5,9 la ~3,9.
