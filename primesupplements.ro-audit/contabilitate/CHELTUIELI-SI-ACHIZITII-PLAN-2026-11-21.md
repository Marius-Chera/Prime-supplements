# Total Admin – Cheltuieli și achiziții: plan (21.11.2026)

Cerut de Marius pe 21.11, pentru Contabilitate → Extras de cont.

**Stare (21.11, noaptea): etapa 1 e construită și publicată** (Total Admin → Contabilitate → Cheltuieli; commit prime-expediere `1ff102a`, migrarea 0017). Încărcarea documentelor așteaptă activarea R2 de către Marius. Ce s-a construit, pe scurt:
- plățile din extras: tipul recunoscut din descriere, plus tipul „transfer între conturile proprii / schimb valutar”, care nu intră în total. Fiecare plată are o cheie stabilă (cont|data|REF|suma), ca documentele să rămână legate la reîncărcarea extrasului;
- explicația, tipul corectat și contractul pe fiecare plată; plățile cash; fluturașii lunii; contractele recurente, legate după IBAN și, opțional, după un text din detalii, cu toleranța sumei în procente;
- furnizorii de marfă apar doar cu eticheta „Furnizor 1–4”, în pagină și în Excel;
- Excelul pentru contabilă are foile Cheltuieli, Fără document și Recurente. Foaia „Neachitate” vine în etapa 2, odată cu facturile din SPV.

## Ce a cerut Marius (citat)

> „aici, dacă poți introduce și costurile și achizițiile plătite de noi prin bancă și noi să importăm poza cu bonul, chitanța, factura, explicația pentru plata respectivă și/sau să le preia aplicația direct din SPV (poate fi și Oblio) de la Documente din SPV și să aloce plății respective factura din SPV, dacă nu e factura în SPV să o importăm noi și dacă avem plăți cash să putem încărca poza cu bonul/chitanța achitată cash ca să avem un raport și evidență cu cheltuielile în luna respectivă”

> „unele plăți sunt în baza unor contracte, sunt plăți recurente, cum e o sumă pt donații spre o asociație și plata chiriei de exemplu, dar sunt și fluturași sau extrase cu plăți pentru anumite impozite, pentru salarii etc., să incluzi și asta, și dacă identifică în SPV facturi emise pe noi și neachitate de noi, să le identificăm în vreun fel”

## Ce există deja (verificat pe 21.11)

- **Extras de cont:** citește extrasele BT în orice formă: lunar, pe o zi sau pe o perioadă (pachet de extrase zilnice). Deocamdată păstrează doar încasările. Plățile sunt citite, dar doar numărate: în octombrie, 79 de plăți pe contul …4101.
- **API-ul Oblio nu dă facturile primite.** Verificat pe oblio.eu/api: are doar documentele emise (facturi, proforme, avize), trimiterea lor în SPV și descărcarea arhivei SPV a facturilor emise. Pagini precum „Documente furnizori” sau „Wallet SPV” nu au API. Pot fi citite doar din browser, cu contul lui Marius, cum s-a făcut la închiderea pe octombrie (`INCHIDERE-OCTOMBRIE-2026-11-09.md`). Aplicația nu le poate citi singură.
- **API-ul e-Factura al ANAF** ar fi singura cale complet automată pentru facturile primite în SPV, dar **nu se folosește** (decizia B: SPV prin Oblio). Pentru referință, procedura ANAF de înregistrare OAuth (actualizată 12.04.2024):
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
4. **Facturi din SPV, prin Oblio (etapa 2, vezi decizia B):** intră din exportul „Documente din SPV” din Oblio, cu PDF-ul. Se leagă de plată după IBAN / CUI + sumă + dată. O plată poate acoperi mai multe facturi, iar o factură poate fi plătită în rate; legătura se poate face și de mână.
   - **Facturi neachitate:** facturile emise pe Prime în SPV fără nicio plată legată apar în lista „De plată”, cu scadența și numărul de zile de întârziere.
5. **Raportul lunii:** toate cheltuielile (bancă + cash) pe categorii, fiecare cu documentul ei.
   - Arată ce plăți nu au încă document și ce facturi sunt neachitate.
   - Excelul pentru contabilă e în același stil ca raportul de încasări, cu foile Cheltuieli, Fără document, Neachitate și Recurente.

**Etapa 1:** punctele 1–3 și 5. Facturile se încarcă de mână. Pornește după activarea R2 (decizia A).
**Etapa 2:** punctul 4 (facturile din SPV prin Oblio și cele neachitate).

Pentru octombrie și noiembrie, extrasele se reîncarcă o dată după publicare, ca să intre și plățile. Încasările nu se dublează.

## Decizii (Marius, 21.11)

**A. Pozele și PDF-urile se țin în Cloudflare Prime** („da, le ținem pozele și pdf-urile în cloudflare prime”). Nu în GitHub: fluturașii și bonurile au date personale.
- Varianta: **R2**, 10 GB gratuit pe lună.
- Verificat pe 21.11: R2 **nu e încă activat** pe contul Prime (Cloudflare răspunde „Please enable R2 through the Cloudflare Dashboard”).
- Îl activează Marius o singură dată, din Cloudflare (contul contact@primesupplements.ro) → R2 Object Storage → planul gratuit. Cloudflare poate cere un card, chiar dacă rămâne gratuit în limită.
- Dacă nu vrea card: o bază D1 separată, tot în Cloudflare Prime (fără activare, limită ~500 MB, cam 1.500 de documente).
- În ambele variante, pozele se micșorează în browser înainte de încărcare.

**B. SPV prin Oblio, nu direct în ANAF** („tu intri în SPV prin Oblio, nu direct în SPV”). Fără API-ul ANAF și fără certificat. Oblio nu are API pentru „Documente din SPV” (`/report/wallet`), iar aplicația nu se poate loga în Oblio (parolele nu se dau), deci facturile intră în aplicație pe una din două căi:
1. **Exportul din Oblio:** din „Documente din SPV” se descarcă facturile lunii (XML / PDF sau arhivă) și se trag în Cheltuieli, ca rapoartele Cargus / Netopia. Aplicația citește din XML furnizorul, CUI-ul, IBAN-ul, numărul, data, scadența și totalul, apoi le leagă de plăți și arată ce e neachitat.
2. **Claude, la cerere:** citește „Documente din SPV” din Chrome-ul lui Marius, logat în Oblio, ca la închiderea pe octombrie, și pregătește fișierele de tras în aplicație.

La construcție se verifică ce descărcare oferă pagina „Documente din SPV” (pe fiecare document sau toată luna deodată). Pe 21.11 Oblio nu era logat nici în browserul aplicației, nici în Chrome, deci n-am putut vedea pagina.

## Reguli
- În SPV, Oblio și SAGA doar se citește; aplicația nu plătește nimic.
- Documentele stau doar în stocarea aplicației, nu în repo. Fluturașii de salariu se văd doar din aplicație (Shopify Admin).
- Orice permisiune sau autorizare nouă o face Marius.
