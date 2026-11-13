# Preluarea controlului + aplicația noastră de expediere (13.11.2026)

Context: Marius – „Primesupplements App” a făcut-o același programator care a făcut Fluxsales; nu mai răspunde pe WhatsApp. Vrem să știm de unde se controlează, ce putem modifica, și o aplicație de la zero, 100 % a noastră, identică sau mai bună. Al doilea curier se discută după.
Analiza anterioară: `APLICATIE-PROPRIE-AWB-FACTURI-2026-11-13.md`. Totul de mai jos s-a aflat doar prin citire (API Shopify), fără să deschid sau să modific aplicațiile.

## 1. Ce e instalat de fapt (3 aplicații ale aceluiași programator)

| Aplicație în Shopify | Tip | Cine o deține | Ce poate | Ce face azi |
|---|---|---|---|---|
| **Primesupplements App** (fără handle, ID client API `874156720503`) | aplicație custom creată din magazin („MERCHANT”, nu e în App Store, nu se deschide în admin) | contul care a creat-o în magazin; **codul și serverul sunt la programator** | comenzi (citire/scriere, toate comenzile), fulfillment, editare comenzi, **stoc (scriere)**, produse (scriere), clienți (citire) | **tot fluxul zilnic**: factură Oblio, AWB Cargus, expediere, e-mail client, arhivare comandă |
| **Primesupplements App** (`primesupplements-admin-actions`) | aplicație a contului de partener **FLUXSALES**, încorporată în admin | Fluxsales (programatorul) | comenzi (citire/scriere), produse (citire) | probabil butoanele de pe pagina comenzii |
| **Fluxsales** | aplicație publică (App Store) | Fluxsales | comenzi, fulfillment, stoc, retururi, **personalizări de plată și de livrare în checkout** | doar corectarea automată a adresei la ~3 % din comenzi |

Mai e **Product Migration** (tot „MERCHANT”, rămasă de la WooCommerce) cu acces aproape total la magazin (temă, clienți, comenzi, plăți). Dacă e tot a lui, e un al doilea risc de securitate.

### Ce înseamnă
- Aplicația care lucrează zilnic e doar o **cheie de acces** la magazin. Programul care o folosește rulează pe **serverul programatorului**, cu datele de conectare Oblio și Cargus la el.
- **Risc de business:** dacă serverul lui se oprește, expiră ceva sau nu mai plătește găzduirea, din ziua aceea nu mai ies facturi și AWB-uri, iar noi nu avem cum să reparăm.
- **Risc de securitate:** cineva care nu mai răspunde are încă acces de scriere la comenzi, stoc și produse (plus Product Migration).
- **Codul din spate nu se poate citi sau copia** din magazin, nici de mine, nici de tine. Shopify vede doar ce face aplicația (comenzile, câmpurile, etichetele), nu programul. Codul e doar pe serverul lui. De aceea documentăm comportamentul exact (secțiunea 4) și îl reproducem.

## 2. De unde o controlezi (ce poți face fără programator)
1. **Shopify Admin → Setări → Aplicații → Dezvoltare aplicații** (`admin.shopify.com/store/primesupplements1/settings/apps/development`) sau, dacă a fost făcută acolo, **Dev Dashboard** (`dev.shopify.com`): vezi cine a creat aplicația custom, ce permisiuni are și poți **revoca accesul** sau dezinstala. Atenție: revocarea = oprirea imediată a facturilor și a AWB-urilor. **Nu acum.**
2. **Setări → Utilizatori și permisiuni → Colaboratori / personal:** vezi dacă programatorul are cont în admin. Nu-l scoate încă (vezi pasul 5).
3. **Oblio → Setări → API** și **Cargus (contul de client)**: datele de integrare folosite de aplicația lui. Le poți regenera când aplicația noastră e gata: atunci aplicația lui se oprește singură.
4. **Ce NU poți face:** să vezi sau să modifici codul. E doar la el. „Preluarea” aplicației existente e posibilă doar dacă îți dă codul și accesul la server (cere-i-le în scris; dacă ai contract sau factură pentru dezvoltare, verifică cui aparține codul). Altfel, singura cale către control total e aplicația noastră.

## 3. Fluxsales: de ce nu se dezinstalează înainte de aplicația noastră
Marius a cerut dezinstalarea. Riscuri:
- `primesupplements-admin-actions` e publicată de contul **FLUXSALES**. E posibil ca serverul care face AWB-urile să țină de contul Fluxsales al magazinului. Dacă dezinstalăm Fluxsales, putem opri fără să vrem facturile și AWB-urile.
- Fluxsales are drept să modifice **metodele de plată și de livrare din checkout** (de exemplu ascunderea plății ramburs). Cu accesul meu nu pot vedea dacă folosește asta; dezinstalarea poate schimba checkout-ul pe loc.
- O aplicație străină nu se poate dezinstala prin API; doar din admin (Setări → Aplicații → Fluxsales → Dezinstalare).
- **Recomandat:** în etapa 4 de mai jos, după ce aplicația noastră a mers singură cel puțin o săptămână. Dacă se face mai devreme: imediat după, verificat checkout-ul (ramburs + card) și că următoarea comandă primește factura și AWB-ul.

## 3b. Verificat în admin (13.11, doar citire, browserul din aplicație)
- **Setări → Aplicații → Dezvoltare aplicații** conține 3 aplicații custom „vechi” (legacy): **Primesupplements App** (instalată), **Product Migration** (instalată) și **Oblio** (neinstalată). Dezvoltarea de aplicații custom a fost permisă pe 05.05.2025 de contul **KEMO MANAGEMENT SRL** (admin@kemo.ro).
- Pagina aplicației: „Developer: admin@kemo.ro”. Modificări făcute de un cont Gmail personal al programatorului: permisiunile schimbate pe 15.09.2025, numele și descrierea pe 17.09.2025. Webhook-uri pe versiunea 2025-07. **Butoanele „Uninstall” și „Manage credentials” sunt la tine**: le poți folosi oricând. Nu le-am atins.
- **Utilizatori:** **KEMO MANAGEMENT SRL** e **colaborator activ** în admin, cu acces la comenzi, produse, finanțe și altele. Ceilalți: Marius (proprietar), Adelina (administrator), Magazin SHOP.
- **Checkout:** nu există personalizări de plată și nici de livrare (Setări → Plăți și Setări → Livrare). Fluxsales nu modifică checkout-ul. Riscul de la punctul 3 despre checkout dispare.
- **Panoul Fluxsales** nu se încarcă în browserul din aplicație (iframe gol, ca la Judge.me). Funcțiile lui sunt luate din pagina din App Store (mai jos) și din ce a făcut pe comenzi.

### Funcțiile Fluxsales (App Store, 13.11) – de avut în vedere la aplicația noastră
- Facturi: Oblio, SmartBill, FGO, Factureaza.ro; numerotare, PDF, descărcare în masă.
- AWB: FAN Courier, Cargus, Sameday, MyGLS, DPD; un click sau în masă; etichete tipărite în masă.
- Lockere: easybox (Sameday) și FAN Locker.
- Validarea adresei, reguli de livrare, alegerea curierului, tarife de livrare.
- Sincronizarea comenzilor, urmărire în timp real, e-mailuri de notificare, numărul de urmărire trimis înapoi în Shopify.
- Planuri: Free (30 de comenzi pe lună), Basic $19,99 (500 de comenzi, facturi și AWB automate), Professional $29,99 (nelimitat + stocul sincronizat din Oblio/SmartBill).
- La noi: nu face nici facturi, nici AWB; doar corectează adresa la ~3 % din comenzi.

### „Tot codul din spate”
Nu se poate citi și nici copia, de nicio aplicație: nici Fluxsales, nici Primesupplements App. Codul rulează pe serverele programatorului, iar Shopify arată doar efectele. Ce se poate păstra e comportamentul exact (secțiunea 4), iar aplicația noastră îl reproduce câmp cu câmp. Singura cale de a obține codul: îl cere Marius în scris de la KEMO MANAGEMENT SRL (dacă a plătit dezvoltarea, verifică ce scrie în contract sau pe factură despre drepturile asupra codului).

## 4. Ce face exact aplicația de azi (citit din comenzile 9–13.11)
Pe fiecare comandă procesată (în loturi, dimineața, de cineva din echipă):
1. **Factură Oblio**, seria **PRS**, numerotare continuă. Pe comandă se scriu atributele `INVOICE_ID`, `INVOICE_SERIES`, `INVOICE_NUMBER`, `INVOICE_URL` (link PDF Oblio), `INVOICE_TOTAL`, `INVOICE_CURRENCY`, `INVOICE_ISSUE_DATE`, `INVOICE_CREATED_AT`, `INVOICE_CLIENT_NAME`, plus etichetele `FACTURA-<nr>`, `INVOICE_CREATED`, `oblio-invoiced`.
2. **AWB Cargus**, serviciul „ground”, plătitor expeditorul (`shipmentPayer` 1), 1 plic, fără deschidere colet, fără livrare sâmbăta sau dimineața. Rambursul (`codAmount`) este totalul comenzii la plata la livrare, 0 la card. Asigurarea (`insuranceValue`) este totalul comenzii.
3. Câmpuri pe comandă: `custom.awb_barcode`, `custom.tracking_url` (cargus.ro), `custom.fulfillment_id`, `custom.shipping_carrier`, `shipping.awb_number`, `shipping.courier_company`, `shipping.tracking_url` (urgentcargus.ro), `shipping.awb_created_at`, `shipping.package_weight`, `shipping.service`, `shipping.codAmount`, `shipping.insuranceValue`, `shipping.envelopes`, `shipping.openPackage`, `shipping.saturdayDelivery`, `shipping.morningDelivery`, `shipping.shipmentPayer`; eticheta `AWB_GENERATED`.
4. **Expediere în Shopify** din „Shop location”, cu numărul Cargus și linkul de urmărire. Shopify trimite clientului e-mailul de expediere.
5. Comanda se **arhivează**.
6. Tarifele de livrare din checkout sunt cele native Shopify („Livrare Cargus”, „Livrare Gratuită Cargus”), nu vin din aplicație.

**Problemă găsită:** greutatea trimisă la Cargus pare greșită. O comandă cu 2 × 1 kg a plecat cu 0,1 kg, una cu ~4 kg cu 1,0 kg. Dacă Cargus recântărește, pot apărea diferențe la factura de transport. De verificat pe o factură Cargus.

## 5. Aplicația noastră: „Prime Expediere” (100 % a noastră)

### Principii
- Contul aplicației, codul (repo GitHub privat `prime-expediere`, în contul tău) și serverul (Cloudflare, cont pe numele firmei) sunt **ale tale**. Eu scriu și întrețin codul, dar orice alt programator îl poate prelua.
- Același model ca Chera Hub (Cloudflare Worker + bază D1): ~0 lei pe lună la ~600 de comenzi. Separat de Chera (firme diferite).
- Cheile Oblio și Cargus le introduci tu într-un ecran de setări; nu trec prin chat.

### Versiunea 1: identică cu cea de azi
- Ecran în Shopify Admin: comenzile neprocesate, bifezi una sau mai multe → **„Factură + AWB”**.
- Tot ce face aplicația de azi (pașii 1–5 de mai sus), cu aceleași etichete și câmpuri. Așa, rapoartele, theMarketer și obiceiurile echipei rămân la fel.
- Etichetele AWB într-un singur PDF (A6), gata de tipărit. Factura deschisă dintr-un click.
- Jurnal pe fiecare comandă (ce s-a trimis, ce a răspuns Oblio și Cargus) și mesaj clar la eroare (de ex. „localitatea nu există la Cargus”), fără comenzi blocate pe tăcute.

### Ce adăugăm față de azi
- **Greutatea corectă**, din greutatea produselor.
- **Verificarea adresei** cu nomenclatorul Cargus înainte de AWB (înlocuiește ce face Fluxsales).
- **Urmărirea coletelor:** livrat / refuzat / returnat, vizibil pe comandă.
- **Ramburs încasat** → comanda marcată „plătită” (D28 din `SETARI-VANZARI`).
- **Colet refuzat** → propunere de storno în Oblio (doar cu confirmare).
- Raport săptămânal: comenzi expediate, refuzuri, cost transport.
- Locul pregătit pentru al doilea curier (Sameday sau FAN), discutat ulterior.

### Etapele (fără nicio zi fără facturi)
0. **Inventarul de azi**: făcut (acest document).
1. **Construcție + „mod umbră”**: aplicația noastră citește comenzile și calculează factura și AWB-ul pe care le-ar face, fără să emită nimic, și le compară cu ce a făcut aplicația veche. Risc zero.
2. **Test real limitat**: câteva comenzi procesate de aplicația noastră (sau seria de test din Oblio și AWB-uri anulate), verificate de tine.
3. **Trecerea**: echipa folosește aplicația noastră; cea veche rămâne instalată o săptămână ca plan B.
4. **Închiderea**: regenerezi cheile Oblio și Cargus, dezinstalezi Primesupplements App (ambele), Fluxsales și Product Migration, scoți colaboratorul programatorului din admin.
5. **Al doilea curier.**

### Efort
Etapa 1: 3–5 sesiuni de lucru. Etapele 2–3: ~2 săptămâni calendaristice, în paralel cu lucrul normal.

### Ce îți trebuie ție (când pornim)
1. Cont **Cloudflare** pentru Prime (gratuit), cont **GitHub** existent (Marius-Chera).
2. Crearea aplicației în **Dev Dashboard** pe contul tău de Shopify (te ghidez; tu apeși Create și Install, pentru că e acordare de permisiuni).
3. **Datele de integrare Cargus** (cheie API UrgentOnline + utilizator): le ceri agentului tău Cargus, „pentru integrare proprie”.
4. **Oblio** → Setări → API: le introduci tu în aplicație.
5. Cine procesează comenzile dimineața: 15 minute să-mi arate cum lucrează azi (ce butoane apasă, ce tipărește).
