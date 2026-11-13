# Aplicație proprie pentru AWB-uri și facturi (în locul Fluxsales) – analiză 13.11.2026

Întrebarea lui Marius: cât de greu e să facem o aplicație a noastră, ca Fluxsales / Primesupplements App, care la comandă generează AWB-ul și factura, ca să nu mai depindem de alții. Azi: Oblio + Cargus; vrem încă un curier (FAN Courier sau Sameday).

## Ce era deja în repo
- `CLAUDE.md` / `NU-ATINGE-APLICATII.md`: nu umblăm în Fluxsales și Primesupplements App (acolo se fac AWB-urile și facturile). Regula rămâne: aplicația nouă se face separat, fără să le atingem.
- `SETARI-VANZARI-2026-10-16.md` D22: **Fluxsales lucrează deja cu Cargus, Sameday (easybox), FAN, DPD și GLS.** Al doilea curier se poate adăuga acolo fără nicio aplicație nouă.
- D22: întrebarea către Fluxsales despre alegerea lockerului în checkout pe planul Shopify (nu Plus) e încă deschisă.
- D28: comenzile ramburs nu se marchează „plătite” la încasare (sincronizarea stărilor e de verificat în Fluxsales).
- D30: există două „Primesupplements App”; costul abonamentelor (E11) nu l-am văzut încă.
- Volum: ~570 de comenzi pe lună; pachetele Shopify se desfac pe componente la facturarea în Oblio (verificat 15.10).

## Verificare 13.11 (doar citire, istoricul comenzilor din Shopify)
Pe ultimele 100 de comenzi (9–13.11):
- **Primesupplements App face tot:** AWB Cargus, factura Oblio (etichetele `AWB_GENERATED`, `FACTURA-…`, `oblio-invoiced`), marcarea ca expediată și e-mailul de expediere către client.
- **Fluxsales apare doar la 3 comenzi din 100**, cu un singur eveniment: „Fluxsales updated the shipping address”, la câteva secunde după plasarea comenzii (corectarea automată a adresei). Nicio factură, niciun AWB.
- Concluzie: **în practică Fluxsales nu mai lucrează pentru noi**; aplicația folosită zilnic e Primesupplements App. Recomandarea de mai jos „adăugat în Fluxsales” se înlocuiește cu: al doilea curier se adaugă în aplicația care face efectiv AWB-urile (Primesupplements App), dacă îl suportă; altfel, aplicația proprie.
- De aflat de Marius: cine a făcut și întreține Primesupplements App (Fluxsales sau alt programator), ce curieri suportă, și dacă Fluxsales mai e plătit (E11). Dacă Fluxsales se plătește doar pentru corectarea adresei, abonamentul e de discutat.

## Cât de greu e
Tehnic: **mediu**. Toate sistemele au API-uri publice:
- **Oblio**: API REST (e-mail + cheie API din Setări → Date firmă). Factură cu descărcare din gestiune, serie, TVA, trimitere în e-Factura, storno. Inclus în abonament.
- **Cargus**: API UrgentOnline (cheie de abonament + utilizatorul contului de client). AWB, etichetă PDF, puncte Ship & Go, urmărire.
- **Sameday**: API cu utilizator/parolă de integrare de la Sameday. AWB, etichetă, lista easybox, urmărire.
- **FAN Courier**: API v2 (utilizator, parolă, client ID). AWB, etichetă, FANbox, urmărire.
- **Shopify**: aplicație custom (comenzi, fulfillment cu număr de urmărire, webhook la comandă nouă).

Găzduire: același model ca Chera Hub (Cloudflare Worker + D1), cost ~0 la volumul nostru.

Partea grea nu e AWB-ul, ci **corectitudinea facturii** și **cazurile de margine**: reduceri și coduri, pachete desfăcute pe componente, transport pe factură, ramburs vs card, gestiunea corectă, e-Factura, storno la retur, colete refuzate, mai multe colete pe o comandă, adrese greșite (localitatea trebuie să existe în nomenclatorul curierului).

## Ce ar face aplicația (versiunea 1)
1. Listă cu comenzile noi (din Shopify), filtre pe stare.
2. Buton per comandă și în masă: **Factură + AWB** → factura în Oblio (cu descărcare de gestiune și pachetele pe componente), AWB la curierul ales (Cargus / Sameday / FAN), ramburs = totalul comenzii la plata la livrare.
3. Etichete PDF A6 tipărite toate odată; factura PDF.
4. Număr de urmărire trimis în Shopify (clientul primește e-mailul de expediere).
5. Verificarea adresei înainte de AWB (localitate/județ în nomenclatorul curierului).

Versiunea 2: urmărirea stărilor (livrat / refuzat / returnat), marcarea ramburs ca plătit la încasare (D28), storno la retur, rapoarte (cost transport, refuzuri), alegerea curierului după regulă (ex. easybox → Sameday).

**Lockerul în checkout** (D22) e cea mai grea parte: Shopify permite extensii în pasul de livrare doar pe Shopify Plus. Pe planul actual se poate doar ca alegere după comandă (pagina de mulțumire / e-mail) sau ca tarif separat „Livrare easybox” cu lockerul ales după. De verificat înainte de orice promisiune.

## Efort estimat
- Versiunea 1 (Oblio + Cargus + un curier nou): 3–5 sesiuni de lucru, plus **2 săptămâni în paralel cu Fluxsales** (aceleași comenzi, comparăm factură cu factură, fără să emitem dublu: în test, facturi pe o serie de test sau ciornă și AWB-uri anulate).
- Versiunea 2: încă 2–4 sesiuni.
- Mentenanță: când un curier schimbă API-ul, repar eu; dacă aplicația cade într-o zi aglomerată, Fluxsales rămâne plan B până la decizia de dezinstalare.

## Cost
- Găzduire: ~0 lei (Cloudflare gratuit).
- API Oblio, Cargus, Sameday, FAN: gratuite, dar cer cont de client / contract cu curierul și datele de integrare de la el.
- Economia = abonamentul Fluxsales (+ eventual Primesupplements App). **Suma lunară nu e încă în repo** (E11): de ea depinde dacă merită.

## Recomandare
1. **Acum, fără aplicație nouă:** contract cu **Sameday** (cea mai mare rețea de lockere, easybox; o au și concurenții) și adăugat în Fluxsales, care îl suportă deja. Rezolvă al doilea curier în câteva zile.
2. **În paralel:** Marius află cât plătește lunar pe Fluxsales (și pe Primesupplements App). Dacă e peste ~150–200 lei/lună sau vrea control total, facem aplicația proprie pe versiunea 1, testată în paralel.
3. FAN e alternativa dacă Sameday nu dă tarif bun; aplicația poate avea oricâți curieri.

## Ce îmi trebuie ca să încep
- Cheile nu se cer și nu trec prin chat (regula din `CLAUDE.md`): aplicația are un ecran de setări unde Marius le introduce singur (Oblio, Cargus, curierul nou).
- Seria de factură Oblio de folosit pentru teste.
- Acordul pentru o aplicație custom nouă în Shopify (permisiuni: comenzi, fulfillment); instalarea o face Marius.
