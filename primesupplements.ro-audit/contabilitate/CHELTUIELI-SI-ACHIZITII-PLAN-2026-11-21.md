# Total Admin – Cheltuieli și achiziții: plan (21.11.2026)

Cerut de Marius pe 21.11, pentru Contabilitate → Extras de cont. Nimic construit încă: planul și deciziile de luat.

## Ce a cerut Marius (citat)

> „aici, dacă poți introduce și costurile și achizițiile plătite de noi prin bancă și noi să importăm poza cu bonul, chitanța, factura, explicația pentru plata respectivă și/sau să le preia aplicația direct din SPV (poate fi și Oblio) de la Documente din SPV și să aloce plății respective factura din SPV, dacă nu e factura în SPV să o importăm noi și dacă avem plăți cash să putem încărca poza cu bonul/chitanța achitată cash ca să avem un raport și evidență cu cheltuielile în luna respectivă”

> „unele plăți sunt în baza unor contracte, sunt plăți recurente, cum e o sumă pt donații spre o asociație și plata chiriei de exemplu, dar sunt și fluturași sau extrase cu plăți pentru anumite impozite, pentru salarii etc., să incluzi și asta, și dacă identifică în SPV facturi emise pe noi și neachitate de noi, să le identificăm în vreun fel”

## Ce există deja (verificat pe 21.11)

- **Extras de cont:** citește extrasele BT în orice formă: lunar, pe o zi sau pe o perioadă (pachet de extrase zilnice). Deocamdată păstrează doar încasările. Plățile sunt citite, dar doar numărate: în octombrie, 79 de plăți pe contul …4101.
- **API-ul Oblio nu dă facturile primite.** Verificat pe oblio.eu/api: are doar documentele emise (facturi, proforme, avize), trimiterea lor în SPV și descărcarea arhivei SPV a facturilor emise. Pagini precum „Documente furnizori” sau „Wallet SPV” nu au API. Pot fi citite doar din browser, cu contul lui Marius, cum s-a făcut la închiderea pe octombrie (`INCHIDERE-OCTOMBRIE-2026-11-09.md`). Aplicația nu le poate citi singură.
- **API-ul e-Factura al ANAF** e singura cale automată pentru facturile primite în SPV (procedura ANAF de înregistrare OAuth, actualizată 12.04.2024):
  - autorizarea se face pe `logincert.anaf.ro/anaf-oauth2/v1/authorize` și `…/token`, **cu certificatul digital calificat** al unei persoane cu drept SPV pentru firmă (reprezentant legal, reprezentant desemnat sau împuternicit);
  - tokenul de acces ține 90 de zile, cel de reînnoire 365 de zile; aplicația îl reînnoiește singură;
  - aplicația se înregistrează o dată pe anaf.ro → Servicii online → Înregistrare utilizatori → Dezvoltatori aplicații, cu serviciul E-Factura și adresa de întoarcere a aplicației;
  - serviciile e-Factura: lista mesajelor (facturile primite, cel mult 60 de zile în urmă), descărcarea (arhivă cu XML-ul semnat) și transformarea XML → PDF.
  - Din XML se iau furnizorul, CUI-ul, numărul, data, scadența, totalul și, de obicei, **IBAN-ul furnizorului**. Plata din extras se potrivește după IBAN / CUI + sumă + dată.
- **Facturile de pe e-mail** (Meta, Google, OpenAI, furnizori străini, care nu trec prin SPV) au fost strânse pe 17.11 în `contabilitate/facturi-online-2026-11`. Pentru ele rămân încărcarea manuală sau importul din e-mail.

## Cum ar arăta

O pagină nouă **Contabilitate → Cheltuieli**, alimentată din același extras încărcat la Extras de cont. Nimic nu se încarcă de două ori.

1. **Plățile din extras.** Fiecare plată are data, suma, beneficiarul, CUI-ul / IBAN-ul și tipul, recunoscut din descriere:
   - plată către furnizor (OP);
   - plată cu cardul (POS);
   - comision bancar;
   - impozite și contribuții (Trezorerie / ANAF);
   - salarii;
   - leasing / rate;
   - altele.
2. **Documentul fiecărei plăți,** după tip:
   - **Furnizori:** factura din SPV, legată automat (etapa 2), sau încărcată de mână (PDF sau poză), cu explicație.
   - **Plăți pe contract, recurente** (chirie, donație / sponsorizare către asociație, leasing, abonamente): contractul se încarcă **o singură dată**, ca „plată recurentă”, cu beneficiarul, IBAN-ul, suma obișnuită și periodicitatea. Fiecare plată lunară către acel beneficiar se leagă singură de contract. Aplicația semnalează suma diferită sau luna în care plata lipsește.
   - **Impozite și contribuții:** documentul e declarația (D112, D300 etc.) sau ordinul de plată, cu explicația (ce impozit, pentru ce perioadă).
   - **Salarii:** fluturașii sau statul de plată al lunii, încărcate o dată pe lună. Un document acoperă toate plățile de salarii din luna respectivă.
   - **Comisioane bancare:** extrasul e documentul, deci sunt „în regulă” automat.
   - **Card:** bonul sau factura (poză / PDF), ori factura din e-mail / SPV.
3. **Plăți cash:** se adaugă de mână (data, suma, furnizorul, explicația) cu poza bonului sau a chitanței.
4. **Facturi din SPV (etapa 2):** se iau singure în fiecare zi, cu PDF-ul. Se leagă de plată după IBAN / CUI + sumă + dată. O plată poate acoperi mai multe facturi, iar o factură poate fi plătită în rate; legătura se poate face și de mână.
   - **Facturi neachitate:** facturile emise pe Prime în SPV fără nicio plată legată apar în lista „De plată”, cu scadența și numărul de zile de întârziere.
5. **Raportul lunii:** toate cheltuielile (bancă + cash) pe categorii, fiecare cu documentul ei.
   - Arată ce plăți nu au încă document și ce facturi sunt neachitate.
   - Excelul pentru contabilă e în același stil ca raportul de încasări, cu foile Cheltuieli, Fără document, Neachitate și Recurente.

**Etapa 1 (fără SPV):** punctele 1–3 și 5. Facturile se încarcă de mână. Depinde doar de decizia A.
**Etapa 2:** punctul 4 (SPV automat și facturile neachitate). Depinde de decizia B.

Pentru octombrie și noiembrie, extrasele se reîncarcă o dată după publicare, ca să intre și plățile. Încasările nu se dublează.

## Decizii pentru Marius

**A. Unde se țin pozele și PDF-urile** (nu în GitHub; fluturașii și bonurile au date personale):
- **R2 pe contul Cloudflare Prime (recomandat):** 10 GB gratuit pe lună. Trebuie activat o dată din dashboard-ul Cloudflare, de Marius; Cloudflare poate cere un card, chiar dacă rămâne gratuit în limită.
- **D1 (baza de date pe care o folosește deja aplicația):** nu trebuie activat nimic, dar limita e de 500 MB pe bază (aprox. 1.500 de documente de ~300 KB). Ar fi o bază separată, doar pentru documente.

În ambele variante, pozele se micșorează în browser înainte de încărcare.

**B. Facturile din SPV automat (etapa 2):** Marius are un certificat digital calificat (token) cu drept SPV pentru PRIME SPORT SUPPLEMENTS? Dacă da, pașii sunt toți ai lui:
1. contul de dezvoltator pe anaf.ro;
2. înregistrarea aplicației cu serviciul E-Factura;
3. o autorizare cu tokenul.

Claude nu introduce certificate sau parole. Dacă nu are certificat, se poate cere unul (sau dreptul de împuternicit) sau facturile rămân încărcate de mână.

## Reguli
- În SPV, Oblio și SAGA doar se citește; aplicația nu plătește nimic.
- Documentele stau doar în stocarea aplicației, nu în repo. Fluturașii de salariu se văd doar din aplicație (Shopify Admin).
- Orice permisiune sau autorizare nouă o face Marius.
