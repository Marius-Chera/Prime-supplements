# Inventar UpPromote – din documentația publică (13.11.2026)

Sursa este documentația oficială UpPromote (docs.uppromote.com, versiunea din iunie 2026), rezumată cu cuvintele noastre. E structura pe care o reproduce „Prime Afiliați” (cerința lui Marius: „exact ca UpPromote”, cu aceleași pagini, ca afiliații să nu fie derutați).
Raportul extensiei Chrome, cu setările reale din contul Prime, va completa acest fișier (`INVENTAR-UPPROMOTE-EXTENSIE-…md`).

## 1. Adminul (meniul UpPromote din Shopify)

**Home**
- **Carduri:** Affiliates / Clicks / Referrals / Sales, pe Azi / 7 zile / 30 de zile.
- **Lista „de făcut”:** comenzi de aprobat, afiliați de aprobat, plăți în așteptare.
- **Blocul paginii de înscriere:** linkul de înscriere și linkul de logare al afiliaților.

**Programs**
- **Lista:** nume, tip, comision, nr. afiliați, program implicit, nr. comenzi.
- **Acțiuni pe program:** activ, editare, link de înscriere, duplicare, ștergere.
- **Pagina programului:**
  - **Tipul comisionului:** sumă fixă pe comandă, sumă fixă pe produs sau procent.
  - **Regula:** simplă sau pe niveluri după valoarea comenzii.
  - **Excluderi:** produse sau colecții excluse; comision special pe produs, colecție sau variantă.
  - **Ce nu intră în bază:** taxa, transportul, bacșișul.
  - **Opțiuni de comision:** pentru clienți noi, pe viață (clientul rămâne legat de afiliat), comision special pe cupoane.
  - **Auto-comenzi:** se exclud, după e-mail.
  - **Reducerea automată a clientului:** prin cuponul afiliatului, printr-un cupon dat sau fără cod („anti-leak”).
  - **Metoda de plată implicită.**
- **Auto-tier:** afiliatul urcă de la un program la altul după vânzări, comision sau nr. comenzi; poate avea resetare periodică.
- **Cookie:** de la 0 la 3652 de zile, pe program.

**Affiliates**
- **Lista:**
  - căutare după nume sau e-mail;
  - filtre: data înscrierii, stare, program;
  - coloane la alegere.
- **Stări:** Pending, Active, Inactive. Refuzul trimite un e-mail „denied”.
- **Acțiuni pe afiliat:** Approve, Deny, activ/inactiv, **Login as affiliate** (deschide portalul afiliatului), Delete.
- **Butoane de sus:** Add affiliate (program, nume, e-mail, parolă), import CSV/XLSX, export, legare clienți sau produse de un afiliat.
- **Fișa afiliatului:**
  - datele din formularul de înscriere;
  - link și cupoane;
  - programul;
  - nota internă;
  - comisioane Pending / Approved / Paid;
  - lista comenzilor lui;
  - rețeaua (upline/downline).

**Referrals**
- **Stări:** Pending, Approved, Denied, Paid. Aprobarea și refuzul se pot anula.
- **Coloane:** ID, iconița tipului de atribuire, comision (cu detaliere), rețea, stare, acțiuni. Se poate filtra după tipul de atribuire și exporta.
- **Tipuri de atribuire, în ordinea priorității:** client legat → cupon → produs legat → link.
- **Detaliu:** produsele, subtotal / transport / taxă, explicația comisionului, istoricul comenzii (retururi, anulări), cuponul și parcursul clientului (până la 4 vizite, cu sursă și UTM).
- **Returul** creează un comision negativ.
- **Adăugare manuală:** după ID-ul comenzii sau ca sumă fixă cu comentariu (bonus, corecție); se poate și prin import.

**Payments**
- **Plăți manuale:** un rând pe afiliat, din comenzile aprobate.
  - Pe rând: Review referrals, Mark as paid (sumă, metodă, notă privată, notă pentru afiliat), reminder dacă afiliatul nu are metoda de plată completată.
  - Se poate plăti doar o parte din comenzi.
- **Comenzi plătite:** istoric, anularea plății, factură descărcabilă.
- **Plăți din aplicație:** PayPal, Wise, **Store credit** (cod de reducere cu valoare fixă sau portofel de credit). Istoricul are stările Processing, Processed, Unclaimed, Failed.
- **Cereri de plată de la afiliați:** aprobare, refuz cu motiv, plată parțială.
- **Plata automată:** la aprobare, la o dată fixă sau periodic, cu prag minim și maxim.
- **Factura:** format implicit, UE sau DE; tratamentul taxelor.

**Creators** (descoperire creatori, CRM) – documentat sumar.

**Motivation**
- **Coupons:** cupon nou sau cod Shopify existent, legat de afiliat.
- **Media Gallery:** materiale pe categorii, imagini, fișiere, video, linkuri, cu acces pe program.
- **Bonuses:** obiectiv după nr. comenzi, vânzări sau comision; unic sau recurent; sumă fixă sau %.
- **Gifts:** produse gratuite sau reduse pentru afiliați.

**Displays**
- **Pagina de înscriere:** șablon cu Introducere, Beneficii, Formular, FAQ; CAPTCHA.
- **Formularul de logare.**
- **CSS și traducerea portalului.**
- **Bara de mesaj.**

**Outreach**
- **Recrutare:** program de recomandare pentru clienți, MLM, marketplace.
- **E-mailuri:** pe program, plus e-mail în masă.
- **Chat cu afiliații.**

**Analytics**
- **Filtre:** dată, program, afiliat.
- **Carduri și grafice în timp:** affiliates, clicks, referrals, sales, commission.
- **Indicatori:** rata de conversie, valoarea medie a comenzii, comision pe clic, ROI, cost de achiziție.
- **Comision pe stări și comenzi pe tip de atribuire.**
- **Top 5:** afiliați și produse.
- **Subpagini:** analiza pe afiliat și analiza pe produs.

**Settings**
- **General:** e-mail, brand, logo, cookie, aprobarea automată a afiliaților, aprobarea automată a comenzilor după N zile, comenzi COD/pending, raport săptămânal.
- **Link și cupon:** destinația linkului, linkuri personalizate, UTM, generarea automată a cupoanelor după un model.
- **Plăți.**
- **Integrări.**
- **Protecție anti-fraudă.**
- **Avansat:** bara de mesaj, conturi de staff.
- **Jurnal de activitate.**

## 2. Portalul afiliatului (ce vede sportivul)

**Logare:** e-mail + parolă, opțional cu 2FA.

**Înscriere:** prenume, nume, e-mail, parolă și câmpurile adăugate de magazin (metoda de plată, codul dorit, câmpuri proprii), plus acceptarea termenilor.

**Meniul:**
1. **Dashboard:**
   - cardul cu linkul de afiliat (copiere, distribuire, link scurt);
   - link pe produs;
   - link cu sursă (Facebook, Instagram);
   - cupoanele lui;
   - **statistici:** comision, clicuri, comenzi, vânzări, cu grafic și interval de date;
   - **comisionul aprobat**, cu butonul „Request payment”;
   - detaliile programului (inclusiv produsele excluse);
   - cadouri.
2. **Commission:**
   - tabelul comenzilor (Pending / Approved / Denied / Paid) cu sursa;
   - detaliu pe comandă: produse, cantitate, vânzare, procent, comision, totaluri, ajustări.
3. **Payment:**
   - lista plăților (dată, sumă, metodă, detaliu sau factură, codul de store credit);
   - **„Use your credit”**: soldul și transformarea lui în cupon Shopify de valoarea aleasă, cu cupoanele generate. Aceasta este echivalentul voucherului la Prime.
4. **Network:** dacă MLM e pornit.
5. **Marketing tools:** materiale pe categorii (imagini, fișiere, linkuri, video).
6. **Gifts.**
7. **Guide:** pagina scrisă de magazin.
8. **Settings:** profil, metodă de plată și taxe, securitate, notificări.
9. **Altele:** chat, limbă, e-mailul de suport.

## 3. E-mailurile implicite
- **Către afiliat:**
  - afiliat în așteptare / aprobat (cu linkul de logare) / refuzat / adăugat manual (cu parola);
  - cupon nou;
  - comandă nouă / aprobată / refuzată;
  - plată făcută;
  - reminder pentru datele de plată;
  - cerere de plată refuzată;
  - cadou disponibil.
- **Către magazin:** afiliat nou, comandă nouă, raport săptămânal.

## 4. Ce reproducem la Prime (propunere; se confirmă după raportul extensiei)
- **Admin:** Home, Programs, Affiliates (+ fișa afiliatului), Referrals, Payments (manual + vouchere), Motivation (cupoane, materiale, bonusuri), Analytics, Settings.
  - **Creators, Outreach/MLM și Displays** se fac doar dacă le folosește Prime azi; raportul extensiei arată asta.
- **Portal:** Dashboard, Commission, Payment (inclusiv „Use your credit” = voucher), Marketing tools (kitul lunar existent), Guide, Settings, în aceeași ordine și cu aceleași nume, traduse în română.
- **Diferențe de la UpPromote:**
  - PayPal, Wise și W-9 sunt instrumente americane, nefolosite la Prime;
  - plata reală e voucher pentru PF și factură pentru PFA/SRL, ca în contracte.
