# WhatsApp – Tech Provider: cele două filmări și textele pentru App Review (20.11.2026)

Continuarea fișei `WHATSAPP-CONFIRMARE-RAMBURS-PASI-2026-11-17.md` (pasul C).

**De ce e nevoie de pasul ăsta:** numărul Prime, +40 775 286 584, se poate lega de Total Admin în modul coexistence (rămâne și în aplicația WhatsApp Business de pe telefon) doar dacă aplicația Meta e **Tech Provider**. Statutul e gratuit, dar Meta cere două filmări scurte de ecran și o scurtă descriere a modului de folosire.

**Ce avem deja (20.11):**
- Firma e verificată în Meta: PRIME SPORT SUPPLEMENTS S.R.L.
- Aplicația **„Prime Total Admin”** are App ID **28828799866802107** și e în portofoliul primesupplements_ro.
- Contul WhatsApp de **test**, creat de Meta, are numărul **+1 555 184 9490** (Phone Number ID 1376639428874947, cont 1941021136617822). Trimite mesaje doar la cel mult 5 numere alese de noi și nu are legătură cu numărul Prime.

Totul se face din **contul tău de Facebook** („Marius Chera”), în Chrome, pe developers.facebook.com.

---

## Cum filmezi ecranul pe Windows 11

- **Varianta 1, Snipping Tool:** apeși **Win + Shift + R**, tragi un dreptunghi peste fereastra Chrome și apeși **Start**. La final apeși **Stop**, apoi „Salvează” (fișier .mp4).
- **Varianta 2, Xbox Game Bar:** apeși **Win + Alt + R** ca să pornești și din nou ca să oprești. Fișierul ajunge în *Videoclipuri → Capturi*.
- Fiecare filmare ține 30–90 de secunde. Nu e nevoie de sunet. Să se vadă bara de adrese din Chrome.

---

## Pregătire (nu se filmează, 3 minute)

1. **Un număr care primește mesajul de test.** Folosește numărul tău personal de WhatsApp, nu numărul Prime.
   - Mergi în aplicația Meta → **Use cases** → **Connect on WhatsApp** → **Customize** → **Step 1. Try it out**.
   - La „Send a message from your test number”, în câmpul **To**, alegi **„Manage phone number list”** / „Add phone number”. Scrii numărul tău personal, primești un cod pe WhatsApp și îl introduci.
2. **WhatsApp Web deschis cu numărul personal.** Într-o filă nouă din Chrome deschizi **web.whatsapp.com** și te loghezi cu numărul personal (scanezi codul QR din telefon). Acolo se va vedea mesajul primit în filmare.

---

## Filmarea 1 – trimiterea unui mesaj (pentru `whatsapp_business_messaging`)

1. Pornești înregistrarea.
2. În fila cu aplicația Meta, la **Step 1. Try it out**, verifici:
   - **From:** +1 555 184 9490;
   - **To:** numărul tău personal;
   - **Message:** ce e deja ales („Order Confirmation” sau „hello_world”).
3. Apeși **Send message**.
4. Treci pe fila **WhatsApp Web** și arăți mesajul sosit de la numărul de test. Deschide conversația, ca să se vadă clar.
5. Oprești înregistrarea și salvezi fișierul ca `video1-trimitere-mesaj.mp4`.

## Filmarea 2 – crearea unui șablon (pentru `whatsapp_business_management`)

Creezi chiar șablonul nostru, pe contul de test. Pe contul Prime îl trimitem mai târziu din Total Admin.

1. Pornești înregistrarea.
2. Deschizi **WhatsApp Manager**, adică `business.facebook.com/wa/manage/message-templates/`, și alegi contul WhatsApp de **test** (cel cu +1 555 184 9490), din lista de sus, dacă apar mai multe.
3. Apeși **Create template** și completezi:
   - **Category:** Utility;
   - **Name:** `confirmare_comanda_ramburs`;
   - **Language:** Romanian.
4. Completezi conținutul exact ca în tabel, apoi apeși **Submit**:

| Câmp | Ce scrii |
|---|---|
| Header (Text) | `Confirmare comandă` |
| Body | `Bună, {{1}}! Am primit comanda ta {{2}} de pe primesupplements.ro, cu plata la livrare (ramburs): {{3}} lei. Te rugăm să o confirmi, ca să o pregătim pentru expediere.` |
| Exemple pentru variabile | {{1}} = `Andrei`, {{2}} = `#13456`, {{3}} = `249,90` |
| Footer | `Prime Supplements` |
| Buttons → Quick reply | `Confirm`, `Vreau o modificare`, `Anulez comanda` (fără emoji: Meta nu le acceptă) |

5. Arăți șablonul în listă (stare „In review” sau „Active”), apoi oprești înregistrarea și salvezi fișierul ca `video2-creare-sablon.mp4`.

---

## Trimiterea pentru aprobare

1. În aplicația Meta → **Use cases** → **Connect on WhatsApp** → **Customize** → **Become Tech Provider** → **Continue**.
2. Alegi **„Independent Tech Provider”** și apeși **Start onboarding**. Astfel accepți Tech Provider Terms; pasul ăsta e decizia ta.
3. **Business verification** apare deja bifat.
4. **App Review:**
   - Meta verifică întâi setările aplicației: pictograma (o pun eu, cea a Total Admin), politica de confidențialitate și categoria, ultimele două deja completate.
   - Ceri **Advanced access** pentru `whatsapp_business_messaging` și `whatsapp_business_management`.
   - La fiecare permisiune lipești textul de mai jos (în engleză) și încarci filmarea corespunzătoare.
   - Bifezi declarațiile și apeși **Submit for review**.
5. Răspunsul vine de obicei în câteva zile lucrătoare, pe e-mail și în Alert Inbox-ul aplicației.

### Textul pentru `whatsapp_business_messaging` (filmarea 1)

```
Prime Supplements (PRIME SPORT SUPPLEMENTS S.R.L., Romania) is an online sports-nutrition store. Our internal order-management app "Prime Total Admin", embedded in our Shopify admin, uses whatsapp_business_messaging to send one utility template message to customers who place a cash-on-delivery order, asking them to confirm it with quick-reply buttons (Confirm / I want a change / Cancel). Customer replies arrive through webhooks and update the order confirmation status for our warehouse staff. Messages are sent only from our own business phone number, only about an order the customer placed, and never for marketing. The video shows a message sent from our WhatsApp test number in the app dashboard and received in the WhatsApp client.
```

### Textul pentru `whatsapp_business_management` (filmarea 2)

```
We use whatsapp_business_management only for our own WhatsApp Business Account: to read our phone number status and quality rating, to create our order-confirmation message template and check its approval status, and to subscribe our app to the account webhooks. We onboard only our own business (Prime Supplements) through Embedded Signup with the WhatsApp Business app (coexistence), so our existing number keeps working in the WhatsApp Business app on the phone. The video shows our order-confirmation template being created in WhatsApp Manager.
```

### Dacă Meta cere instrucțiuni pentru verificator

```
Prime Total Admin is an internal tool used only by our own company; it has no public sign-up or login. The two screen recordings show the complete flow: sending a template message and creating a message template. Contact: contact@primesupplements.ro.
```

---

## După aprobare

Urmează pașii G–M din fișa din 17.11:
1. App secret-ul îl pui tu în Total Admin.
2. **Conectezi numărul Prime** din Total Admin → Setări → WhatsApp → „Conectează numărul (Meta)”, în modul coexistence. La istoricul conversațiilor alegi **NU partaja**.
3. Adaugi metoda de plată în WhatsApp Manager și trimiți șablonul la aprobare.
4. Trimiți mesajul de test la numărul tău.
5. Ții 1–2 zile pe Umbră, apoi pornești Live (scrii TRIMITE).
