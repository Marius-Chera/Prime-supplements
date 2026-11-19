# Facturi duble Oblio, 16–17.11.2026 (aplicația veche + Total Admin)

## Ce s-a întâmplat
Din 16.11, de când Total Admin lucrează Live, fiecare comandă procesată primește 2 facturi PRS cu aceeași sumă:
- factura Total Admin, cu mențiunea „Comanda Nr…”;
- factura aplicației vechi „Primesupplements App” (KEMO), cu mențiunea „Factura emisa pentru comanda Nr…”.

## Cauza (dovada: istoricul comenzii Nr.10402 în Shopify)
- **13:20:07–13:20:10:** Total Admin emite PRS 16928, apoi marchează comanda expediată (fulfillment) și trimite e-mailul.
- **13:20:16–13:20:17:** „Primesupplements App edited the details of this order” → **PRS 16929**, cu INVOICE_CREATED_AT 13:20:16.

**Aplicația veche facturează automat orice comandă care devine expediată**, fără să verifice factura existentă. Total Admin își face verificările înainte de emitere și a emis primul, corect. Cât timp aplicația veche e instalată, dublurile continuă.

## Comenzile dublate (din analiza registrului Oblio adusă de Marius pe 17.11; fără nume de clienți)
- **6 comenzi plătite cu cardul** (o factură e încasată, cealaltă neîncasată):
  - Nr.10402 (PRS 16928/16929);
  - PRS 16930/16931;
  - Nr.10407 (16933/16934);
  - 16935/16936;
  - 16937/16939;
  - Nr.10416 (16938/16940).
- **7 comenzi din 17.11**, ambele facturi neîncasate. Lista exactă se scoate din Oblio după mențiuni.

Total până la analiză: 13 comenzi.

## Ce trebuie făcut
1. **Oprirea dublurilor:** Marius dezinstalează aplicația veche „Primesupplements App” (Setări → Aplicații); Claude nu umblă în ea (regulă). Total Admin face deja facturile, AWB-urile, expedierea și sincronizarea stocului. Până atunci nu se mai procesează comenzi în Total Admin, sau se revine temporar doar la aplicația veche.
2. **Curățenia în Oblio**, cu acordul lui Marius și eventual al contabilei:
   - câte o factură din fiecare pereche se anulează (dacă nu e transmisă în SPV) sau se stornează;
   - la comenzile cu cardul se păstrează cea potrivită pentru încasare;
   - **stocul:** fiecare factură dublă a scăzut a doua oară stocul din gestiunea online, iar sincronizarea Oblio → Shopify (la 30 de minute) a dus scăderea și în Shopify. Anularea sau stornarea readuce stocul.
3. **Pe comenzile Shopify**, atributele INVOICE_* arată acum factura aplicației vechi; se aliniază după ce se decide care factură rămâne.

## 19.11: dublurile au continuat după dezinstalare – cauza reală
Verificat de Claude pe 19.11 (doar citire):
- **Total Admin a emis o singură factură pe comandă** (baza lui, 46 de comenzi Live 16–19.11, de ex. Nr.10422 → PRS 16966, Nr.10449 → PRS 17028). Numerele sărite (16968, 16970, 16972 …) sunt emise de altcineva, la câteva secunde după.
- **Istoricul comenzilor din 18–19.11** arată doar Total Admin (facturare, expediere, e-mail, arhivare). Nicio altă aplicație nu scrie pe comandă.
- **Aplicațiile instalate** (Admin API): nicio aplicație de facturare; KEMO și Fluxsales nu mai există.
- **Cauza:** în Shopify → Setări → Notificări → **Webhooks** există un webhook creat manual de KEMO, care NU dispare la dezinstalarea aplicației:
  - eveniment **Order fulfillment** → `https://primesupplements-oblio-production.up.railway.app/webhooks/shopify/invoice/create` (JSON).
  - Când Total Admin marchează comanda expediată, Shopify trimite comanda la serverul KEMO (Railway), care are încă cheia Oblio și emite a doua factură. Nu mai poate scrie înapoi în Shopify (aplicația e scoasă), de aceea factura lui nu apare pe comandă.

### Ce trebuie făcut
1. ~~**Ștergerea webhook-ului**~~ **făcută 19.11, 12:58** de Claude, cu „da”-ul lui Marius; lista de webhook-uri e acum goală.
2. ~~**Regenerarea cheii API Oblio**~~ **făcută 19.11, 15:02** (Marius; cheia nouă salvată și verificată în Total Admin). (Oblio → Setări → Date cont → API), ca serverul KEMO să nu mai poată emite nimic; apoi cheia nouă se pune în Total Admin → Setări → Oblio. (Era deja în plan: „la final chei Oblio/Cargus regenerate”.)
3. Abia apoi curățenia dublurilor din 17–19.11 în Oblio (anulare/stornare, decizie Marius + contabila).

## 19.11 (după 15:00): situația tuturor perechilor în Oblio (citit din raportul de facturi, 16–19.11)
Pereche = factura Total Admin (TA) + dublura KEMO (același client, aceeași sumă, la câteva secunde). „Trimisă” = în e-Factura (SPV).

**Deja rezolvate (13, toate din 17.11):** în fiecare pereche s-a anulat **factura Total Admin** (netrimisă) și a rămas factura KEMO (trimisă în SPV; la cele cu cardul, marcată încasată):
16930/16931, 16933/16934, 16935/16936, 16937/16939, 16938/16940, 16942/16954, 16943/16955, 16944/16956, 16945/16957, 16946/16952, 16947/16958, 16949/16953, 16959/16960 (primul număr = TA, anulat).
→ Pe aceste 13 comenzi, Shopify și Total Admin arată încă numărul TA anulat; trebuie aliniate pe factura KEMO rămasă.

**Încă dublate (27 de perechi):**
- **Ambele trimise în SPV (17)** → se pot doar storna: 16928/16929, 16961/16962 (17.11); 16967/16968, 16971/16972, 16973/16974, 16975/16976, 16977/16978, 16979/16980, 16981/16982, 16983/16985, 16984/16987, 16986/16988, 16989/16990, 16991/16992, 16993/16994, 16995/16996, 17002/17003 (18.11).
- **Ambele netrimise (10)** → se poate anula una: 16969/16970 (18.11); 17004/17005, 17006/17008, 17007/17009, 17014/17015, 17016/17017, 17019/17020, 17021/17022, 17024/17025, 17026/17027 (19.11).

**Fără dublură:** 16948, 16963, 16966, 17018, 17028 (17028 e după ștergerea webhook-ului, 12:58 → confirmă că dublurile s-au oprit).

## 19.11 (13:09): cele 10 dubluri netrimise, anulate
Cu „da”-ul lui Marius („Da, anulează-le”), Claude a anulat în Oblio (aceeași acțiune ca butonul „Anulează”) **dublurile KEMO**: 16970, 17005, 17008, 17009, 17015, 17017, 17020, 17022, 17025, 17027. Înainte, fiecare a fost verificată: aceeași comandă în mențiuni ca factura Total Admin pereche (Nr.10425, 10443, 10444, 10446, 10445, 10442, 10440, 10438, 10439, 10448), netrimisă în SPV. După: toate 10 anulate, facturile Total Admin pereche (16969, 17004, 17006, 17007, 17014, 17016, 17019, 17021, 17024, 17026) active – exact cele scrise pe comenzile Shopify.
- Stocul scăzut a doua oară revine în gestiunea online; Total Admin îl duce în Shopify la următoarea sincronizare (la 30 de minute).
- La 4 dintre ele (16970, 17005, 17008, 17009, comenzi cu cardul) KEMO marcase factura încasată; încasarea pe factura Total Admin se bifează la închiderea lunii, din Total Admin → Încasări.

**Rămân:** cele 17 perechi trimise în SPV (stornare, decizia contabilei) și alinierea celor 13 comenzi din 17.11 pe factura KEMO rămasă.

## 19.11 (13:33): dublurile trimise în SPV, stornate
Cu „da”-ul lui Marius („Da, stornează-le”), Claude a stornat în Oblio (Rapoarte → Factură → Stornează → Previzualizare → Emite) **16 dubluri KEMO**. Înainte de fiecare emitere s-a verificat în formular că totalul e exact minus totalul dublurii și că mențiunea are aceeași comandă ca factura Total Admin pereche.

| Dublura KEMO | Comanda | Total |
|---|---|---|
| 16962 | Nr.10411 | 150,00 |
| 16968 | Nr.10424 | 391,50 |
| 16972 | Nr.10429 | 200,00 |
| 16974 | Nr.10432 | 20,00 |
| 16976 | Nr.10423 | 141,50 |
| 16978 | Nr.10433 | 336,00 |
| 16980 | Nr.10420 | 137,00 |
| 16982 | Nr.10421 | 215,00 |
| 16985 | Nr.10426 | 675,00 |
| 16987 | Nr.10430 | 155,00 |
| 16988 | Nr.10431 | 240,50 |
| 16990 | Nr.10427 | 450,00 |
| 16992 | Nr.10428 | 478,00 |
| 16994 | Nr.10434 | 310,00 |
| 16996 | Nr.10435 | 340,80 |
| 17003 | Nr.10437 | 123,50 |

- **Facturile de stornare: PRS 17030–17045** (16 facturi cu minus, datate 19.11.2026), total **−4.363,80 lei** = totalul dublurilor. La final: 16/16 dubluri stornate, toate facturile Total Admin pereche active, nicio ciornă rămasă.
- **e-Factura:** stornările apăreau „Netrimisă” imediat după emitere; trebuie să ajungă în SPV ca orice factură (de urmărit în Oblio → e-Factura).
- **16928/16929 (Nr.10402):** nu s-a stornat nimic – factura Total Admin 16928 era deja stornată de altcineva; rămâne valabilă 16929 (KEMO, încasată).
- **Încasări:** dublurile încasate de KEMO (cardul: 16968, 16972, 16974, 16978, 16994, 16996, 17003) au acum încasarea pe o factură stornată; încasarea se mută pe factura Total Admin la închiderea lunii, din Total Admin → Încasări.
- **Stocul** revine în gestiunea online și ajunge în Shopify prin sincronizarea de la 30 de minute.

**Rămâne:** alinierea în Shopify/Total Admin a comenzilor care arată o factură Total Admin anulată sau stornată (cele 13 din 17.11 + Nr.10402 → 16929). Contabila trebuie anunțată de stornări (intră în SPV și în decontul de TVA pe noiembrie).

## 19.11 (13:41): alinierea comenzilor pe factura valabilă
- **Shopify:** cele 14 comenzi (13 din 17.11 + Nr.10402) arătau deja factura valabilă (KEMO) în atributele INVOICE_*, pentru că aplicația veche le suprascrisese pe 17.11. Nu s-a schimbat nimic în Shopify.
- **Total Admin (baza D1, tabela jobs):** păstra numărul facturii Total Admin anulate/stornate. La o eventuală reprocesare, protecția la dubluri ar fi rescris acel număr pe comandă. Cu „da”-ul lui Marius, cele 14 rânduri au fost trecute pe factura valabilă (număr + link Oblio), cu o notă în jurnalul comenzii: Nr.10402→16929, 10403→16954, 10404→16955, 10405→16956, 10407→16934, 10408→16931, 10409→16957, 10410→16936, 10412→16939, 10413→16952, 10415→16958, 10416→16940, 10417→16960, 10419→16953.

**Situația finală:** fiecare comandă din 16–19.11 are o singură factură valabilă în Oblio, aceeași în Shopify și în Total Admin. Rămân: trimiterea stornărilor 17030–17045 în SPV, anunțarea contabilei, mutarea încasărilor cu cardul la închiderea lunii.
