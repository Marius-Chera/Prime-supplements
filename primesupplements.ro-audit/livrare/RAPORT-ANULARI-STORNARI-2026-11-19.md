# Raport anulări și stornări – facturi duble 16–19.11.2026

Situație recitită din Oblio (raportul de facturi), 19.11.2026, după toate operațiile. Fără nume de clienți.
Cauza dublurilor: webhook-ul KEMO „Order fulfillment” rămas în Shopify (șters 19.11, 12:58) + cheia Oblio veche (regenerată 19.11, 15:02). Detalii: `FACTURI-DUBLE-2026-11-17.md`.

Legendă: **TA** = factura emisă de Total Admin; **KEMO** = dublura emisă de serverul vechi. „SPV” = starea e-Factura.

## 1. Anulate de Claude (10) – ambele facturi netrimise în SPV, s-a anulat dublura KEMO

| Comanda | Rămâne valabilă (TA) | Anulată (KEMO) | Total (lei) |
|---|---|---|---|
| Nr.10425 | 16969 | 16970 | 155,00 |
| Nr.10443 | 17004 | 17005 | 185,60 |
| Nr.10444 | 17006 | 17008 | 1.269,00 |
| Nr.10446 | 17007 | 17009 | 504,00 |
| Nr.10445 | 17014 | 17015 | 85,00 |
| Nr.10442 | 17016 | 17017 | 108,20 |
| Nr.10440 | 17019 | 17020 | 200,00 |
| Nr.10438 | 17021 | 17022 | 391,50 |
| Nr.10439 | 17024 | 17025 | 730,00 |
| Nr.10448 | 17026 | 17027 | 436,00 |
| **Total anulat** | | | **4.064,30** |

Verificat acum: toate 10 „anulată”; toate facturile TA active; toate netrimise (vor pleca în SPV doar cele TA).

## 2. Stornate de Claude (16) – ambele facturi deja în SPV, s-a stornat dublura KEMO

| Comanda | Rămâne valabilă (TA) | Stornată (KEMO) | Factura de stornare | Total (lei) |
|---|---|---|---|---|
| Nr.10411 | 16961 | 16962 | 17030 | −150,00 |
| Nr.10433 | 16977 | 16978 | 17031 | −336,00 |
| Nr.10421 | 16981 | 16982 | 17032 | −215,00 |
| Nr.10430 | 16984 | 16987 | 17033 | −155,00 |
| Nr.10428 | 16991 | 16992 | 17034 | −478,00 |
| Nr.10434 | 16993 | 16994 | 17035 | −310,00 |
| Nr.10424 | 16967 | 16968 | 17036 | −391,50 |
| Nr.10429 | 16971 | 16972 | 17037 | −200,00 |
| Nr.10432 | 16973 | 16974 | 17038 | −20,00 |
| Nr.10423 | 16975 | 16976 | 17039 | −141,50 |
| Nr.10420 | 16979 | 16980 | 17040 | −137,00 |
| Nr.10426 | 16983 | 16985 | 17041 | −675,00 |
| Nr.10431 | 16986 | 16988 | 17042 | −240,50 |
| Nr.10427 | 16989 | 16990 | 17043 | −450,00 |
| Nr.10435 | 16995 | 16996 | 17044 | −340,80 |
| Nr.10437 | 17002 | 17003 | 17045 | −123,50 |
| **Total stornat** | | | **17030–17045** | **−4.363,80** |

Verificat acum: fiecare factură de stornare e legată în Oblio de dublura KEMO din același rând, cu suma exactă; toate facturile TA active. **Toate cele 16 stornări sunt încă „Netrimise” în SPV** – trebuie trimise.

## 3. Rezolvate înainte, de altcineva (14) – NU le-a atins Claude

| Comanda | Ce s-a făcut | Rămâne valabilă | Total (lei) |
|---|---|---|---|
| Nr.10402 | TA 16928 stornată cu **16964** (17.11, în SPV) | 16929 (KEMO) | 128,00 |
| Nr.10408 | TA 16930 anulată | 16931 (KEMO) | 235,00 |
| Nr.10407 | TA 16933 anulată | 16934 (KEMO) | 567,90 |
| Nr.10410 | TA 16935 anulată | 16936 (KEMO) | 594,30 |
| Nr.10412 | TA 16937 anulată | 16939 (KEMO) | 304,30 |
| Nr.10416 | TA 16938 anulată | 16940 (KEMO) | 456,00 |
| Nr.10403 | TA 16942 anulată | 16954 (KEMO) | 351,00 |
| Nr.10404 | TA 16943 anulată | 16955 (KEMO) | 20,00 |
| Nr.10405 | TA 16944 anulată | 16956 (KEMO) | 200,00 |
| Nr.10409 | TA 16945 anulată | 16957 (KEMO) | 351,00 |
| Nr.10413 | TA 16946 anulată | 16952 (KEMO) | 598,50 |
| Nr.10415 | TA 16947 anulată | 16958 (KEMO) | 477,00 |
| Nr.10419 | TA 16949 anulată | 16953 (KEMO) | 355,50 |
| Nr.10417 | TA 16959 anulată | 16960 (KEMO) | 602,80 |

Pe aceste 14 comenzi Shopify arăta deja factura KEMO; Claude a aliniat doar baza Total Admin pe ea.

## 4. Fără dublură (în regulă)
16948, 16963, 16966, 17018, 17028 – o singură factură pe comandă.

## De verificat / de făcut
1. **SPV:** trimiterea stornărilor 17030–17045 în e-Factura (acum „Netrimise”).
2. **Contabila:** 10 anulări (netrimise, nu apar la ANAF) + 16 stornări (apar în SPV și în decontul TVA pe noiembrie). Net, fiecare comandă rămâne cu o singură factură.
3. **Încasări cu cardul:** după anulare/stornare, încasările pe care KEMO le pusese pe dubluri nu mai există; facturile TA valabile apar neîncasate. Se bifează la închiderea lunii din Total Admin → Încasări (Shopify Payments). Comenzile cu cardul din secțiunile 1–2: Nr.10425, 10443, 10444, 10446, 10424, 10429, 10432, 10433, 10434, 10435, 10437.
4. **Alte stornări din 16–19.11** găsite în raport, făcute de altcineva și fără legătură cu dublurile: 16927, 16932, 16941, 16951, 16998, 16999, 17000, 17001 (de confirmat de Marius că sunt cunoscute).
