# Anunț către afiliați: platforma nouă de la 1 decembrie 2026

**Decizia lui Marius (14.11.2026):** aplicația Prime Afiliați NU se activează acum. Întâi informăm toți afiliații, pe e-mail și în grupul de WhatsApp, că de la **1 decembrie** își văd vânzările și comisioanele în platforma nouă. Ce urmărim: să nu-i derutăm; spunem întâi ce rămâne la fel.

Nimic nu s-a trimis. E-mailul pleacă doar după aprobarea textului și testul la Marius și Adelina (regula e-mailurilor Prime).

## 1. E-mailul
- **Șablon:** `sabloane/afiliati-anunt-platforma-noua.html`, în designul comun (antet negru cu logo, linie roșie, titlu Impact, butoane roșii, subsol negru cu datele firmei).
- **Subiect:** `[[PRENUME]], de la 1 decembrie îți vezi comisioanele într-un panou nou`
- **Preheader:** `Codul tău rămâne același. Îți spunem ce se schimbă și ce faci pe 1 decembrie.`
- **Personalizare:** `[[PRENUME]]` și `[[COD]]`, din lista „Prime – Afiliați”, ca la e-mailurile lunare.
- **Cum se trimite:** theMarketer, e-mail tranzacțional personal, la fiecare afiliat activ, ca rutina lunară.

## 2. Mesajul pentru grupul de WhatsApp (de copiat)
```
📢 *Noutate pentru afiliații Prime*

Salut tuturor! 👋
De la *1 decembrie 2026* vânzările și comisioanele voastre le vedeți într-un *panou nou*, direct pe site-ul nostru:
👉 primesupplements.ro/apps/afiliati

✅ *Ce rămâne la fel*
• codul vostru de reducere
• linkul pe care îl aveți deja în bio
• comisionul și regulile din contract
• plata: voucher pentru persoane fizice, factură pentru PFA/SRL
• comisionul din noiembrie rămâne al vostru și apare în panoul nou

🔄 *Ce se schimbă*
• intrați cu e-mailul de afiliat și un cod primit pe e-mail, fără parolă

📅 *Pe 1 decembrie, în 1 minut:*
1. intrați pe primesupplements.ro/apps/afiliati
2. apăsați „Intră în cont” și scrieți e-mailul vostru de afiliat
3. scrieți codul primit pe e-mail. Gata!

Până atunci nu trebuie să faceți nimic. Detaliile vin și pe e-mail.
Întrebări? Scrieți-ne aici sau în privat. 💪
Echipa Prime Supplements
```

**Mesajul-memento din 1 decembrie** (în grup, dimineața):
```
🚀 *De azi, panoul nou e deschis!*
👉 primesupplements.ro/apps/afiliati
„Intră în cont” → e-mailul de afiliat → codul primit pe e-mail.
Codul și linkul vostru rămân aceleași. Dacă ceva nu merge, scrieți-ne aici. 💪
```

## 3. Calendar propus
| Când | Ce | Cine |
|---|---|---|
| până pe 19.11 | Marius aprobă textele; test e-mail la Marius și Adelina | Marius, Claude |
| **joi 20.11** | E-mail către toți afiliații + mesaj în grupul de WhatsApp | Claude (e-mail), Marius (grup) |
| 25–27.11 | Late Black Friday: fără mesaje despre platformă, ca să nu se amestece | – |
| 28–30.11 | Pregătirile tehnice gata și testate (lista de mai jos) | Claude, Marius |
| **luni 1.12, dimineața** | Memento în grup; panoul nou deschis | Marius |
| 2–4.12 | E-mailurile lunare (raportul pe noiembrie) pleacă ca de obicei | rutina lunară |
| înainte de 11.12 | Dezabonarea de la UpPromote (factura vine pe 11), după reconcilierea soldurilor | Marius |

Pe 1.12 era propus și e-mailul „Provocarea lunii”, care e pe pauză (DE-FACUT 11/20). Nu îl trimitem în aceeași zi cu schimbarea platformei.

## 4. Ce trebuie să fie gata până pe 1 decembrie (ca anunțul să fie adevărat)
1. **„Linkul pe care îl ai deja merge în continuare”:** scriptul din temă recunoaște linkurile vechi UpPromote și le leagă de afiliat. Are nevoie de ID-urile UpPromote ale afiliaților (din export).
2. **„Intri cu e-mailul tău de afiliat”:** fiecare afiliat are în aplicație e-mailul corect. Azi, cei 107 afiliați preluați din coduri nu au e-mail. Sursa e lista „Prime – Afiliați” (Google Sheet, folosită la e-mailurile lunare) sau exportul UpPromote.
3. **„Comisionul din noiembrie rămâne al tău”:**
   - soldurile neplătite din UpPromote se trec în aplicație ca sold de pornire;
   - tot ce a plătit deja UpPromote se marchează „plătit”, ca să nu plătim de două ori.
4. **Portalul deschis:** versiunea `v2-portal-afiliati` (App Proxy + `read_customers`), lansată și aprobată de Marius în ultima săptămână din noiembrie, apoi test cu un afiliat de test.
5. **Comisioanele reale:** procentele fiecărui afiliat din exportul UpPromote (azi aplicația folosește 10% implicit).
6. Modul live (vouchere create din aplicație) se pornește cu „da”-ul lui Marius (regula „fără coduri noi”).
