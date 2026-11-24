# Închiderea lunii în Total Admin – ghid (24.11.2026)

Totul se face în Shopify Admin → Total Admin → **Contabilitate**. Sus e bara **Luna de lucru**: alegi luna pe care o închizi (de ex. noiembrie 2026). Fișierele se pot încărca oricând și din orice lună; fiecare rând se pune singur pe luna lui. Același fișier încărcat de două ori nu dublează nimic.

**Când:** în primele zile ale lunii următoare (cam pe 5–10). Până atunci au venit ultimul mail Cargus cu decontarea, virările Shopify Payments din ultimele zile și extrasul BT lunar. OP-urile Cargus din ultimele zile ale lunii ajung adesea în bancă abia luna următoare.

## Pasul 1 – Încasări
| Ce | De unde | Ce faci |
|---|---|---|
| **Ramburs Cargus** | mailurile „Decontare rambursuri prin contul colector” (.eml) sau Excelurile din ele (.xls) | le tragi în chenar, toate odată; merge și o arhivă .zip |
| **Card Netopia** | rapoartele Netopia (.csv / .zip) | **doar pentru noiembrie 2026** (Netopia a fost oprit pe 15.11) |
| **Card Shopify Payments** | – | **nimic de încărcat**: aplicația le ia singură la 30 de minute; butonul „Preia plățile Shopify Payments” le ia pe loc |

**Ce vezi:**
- sus, totalurile lunii: ramburs, card, comisioane, câte încasări sunt legate de factură și câte sunt de verificat;
- tabelul, după comandă: rândul 1 e cea mai recentă comandă încasată, cu ramburs și card amestecate. Comenzile cele mai noi apar întâi doar cu plata cu cardul; rambursurile lor intră când Cargus le decontează;
- plățile cu cardul încă nevirate în bancă au la „OP / decont” scris **„în curs”** și trec singure pe virarea lor când Shopify le virează. Nu intră în raportul contabilei;
- butonul **„de verificat”** arată doar încasările cu probleme (fără factură sau cu diferență de sumă). Comanda sau factura se completează cu ✎, iar dacă aplicația a găsit factura, cu „✓ Aplică PRS …”.

## Pasul 2 – Extras de cont
- Tragi **PDF-urile BT** pentru toate conturile: …4101 (principal), …4102 (POS), EUR, USD. Merge extrasul lunar, cel pe o zi sau cel pe o perioadă, în orice ordine; zilele nu se dublează, iar cel lunar le înlocuiește pe cele pe zile.
- **Ce vezi:** fiecare încasare din bancă legată de OP-ul Cargus, decontul Netopia sau virarea Shopify Payments, apoi de comenzi și facturi. Mai apar deconturile fără bani în extras (cele din ultimele zile pot fi pe extrasul lunii următoare) și rambursurile expediate de peste 14 zile, încă neîncasate.
- Excel: **„Raport în trepte”** (extras → decont → încasări).

## Pasul 3 – Cheltuieli
- **Plățile prin bancă vin singure** din extrasele de la pasul 2.
- **Facturile din SPV:** în Oblio → „Documente din SPV”, exporți PDF-ul cu facturile lunii, apoi în Cheltuieli apeși **„🧾 Importă facturile din SPV (Oblio)”**. Fiecare factură se leagă singură de plata ei, iar ce rămâne neplătit apare ca neachitat.
- Pentru fiecare plată fără document: poza sau PDF-ul (factură, bon, chitanță, OP, declarație) și/sau o explicație. Comisioanele băncii și transferurile între conturile proprii nu cer document.
- **„+ Plată cash”:** cheltuielile plătite cash, cu poza bonului sau a chitanței.
- **„Fluturași salarii”:** un document pe lună acoperă toate salariile.
- **Contractele** (chirie, sponsorizare / donație, leasing, abonamente) se încarcă o singură dată; plățile lunare se leagă singure de ele.
- După ce încarci extrase noi, apeși **„🔄 Resincronizează”**.

## Pasul 4 – e-Factura
Verifici că toate facturile emise în lună au ajuns în SPV, fără erori.

## Pasul 5 – Rapoartele pentru contabilă
1. **Încasări → „Raport de închidere a lunii (Excel)”.** În fiecare OP / decont / virare, rândurile sunt ordonate crescător după factura PRS, cu toate coloanele din rapoartele originale și rândul din extrasul BT.
2. **Cheltuieli → „Raport pentru contabilă (Excel)”.**
3. Opțional, **Extras de cont → „Raport în trepte (Excel)”.**

Înainte de trimitere: **„de verificat” = 0** în Încasări și nicio plată fără document în Cheltuieli.
