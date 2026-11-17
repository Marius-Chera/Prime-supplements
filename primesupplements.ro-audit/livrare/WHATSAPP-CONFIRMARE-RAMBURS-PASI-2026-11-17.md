# Confirmarea automată pe WhatsApp a comenzilor ramburs: pașii pentru Marius (17.11.2026)

Cererea ta din 17.11: „Doar ramburs”, mesajul la 30 de minute după plasare, iar noaptea la 8:00.
Codul e în Total Admin (repo `prime-expediere`, commit `1a55d30`, versiunea Cloudflare `0e282322`).
Funcția e publicată, dar e **OPRITĂ**: nu trimite nimic până nu conectezi numărul și nu o pornești tu.

---

## 1. Ce face, pe scurt

| Pas | Ce se întâmplă |
|---|---|
| Comandă ramburs nouă | La **30 de minute** după plasare, clientul primește pe WhatsApp, de pe numărul Prime (+40 775 286 584), mesajul de confirmare. |
| Comandă plasată noaptea | Mesajul pleacă la **08:00**. Noaptea e **17:30–08:00** (aleasă de tine pe 17.11; se schimbă din Setări). O comandă de la 17:00 ar ajunge la 17:30, deci pleacă a doua zi la 08:00. |
| Comandă plătită cu cardul | Nu primește nimic (decizia ta din 13.11). |
| Clientul apasă **✅ Confirm** | În Depozit → Comenzi apare bifa „✅ confirmată”, cu „automat WhatsApp” și ora. |
| **✏️ Vreau o modificare** | Starea devine „✏️ modificare”. Ce scrie clientul după aceea apare chiar în coloană. |
| **❌ Anulez comanda** | Starea devine „❌ refuzată”, iar butonul unic o sare. Comanda o anulezi tot tu sau colega, în Shopify. |
| Clientul scrie un text liber, trimite o poză sau un vocal | Starea devine „💬 de verificat”, cu textul afișat. Colega îl citește și pune starea. Un „mulțumesc” după confirmare nu strică bifa. |
| Niciun răspuns după **3 ore de zi** | Starea devine „📵 nu răspunde”, iar colega îl sună. Noaptea nu se numără: un mesaj trimis la 16:00 trece pe „nu răspunde” abia a doua zi la 09:30. |
| Mesajul nu ajunge (clientul nu are WhatsApp, număr străin etc.) | Sub confirmare apare cu roșu „💬 WhatsApp: nu a ajuns: …”. Comanda rămâne „de confirmat”, iar colega o sună. |
| Colega a confirmat deja de mână | Mesajul nu mai pleacă. |

După fiecare buton apăsat pleacă un răspuns scurt și automat:
- „Mulțumim! Comanda #… e confirmată și o pregătim pentru expediere.”
- „Sigur! Scrie-ne aici ce vrei să schimbi la comanda #…, iar o colegă revine cât de repede.”
- „Am notat: comanda #… nu se mai expediază. Dacă te răzgândești, scrie-ne aici.”

Răspunsul automat se poate opri din Setări.

Toată conversația apare și în aplicația WhatsApp Business de pe telefon (coexistence). Colega poate scrie clientului de acolo, ca până acum.

**Moduri** (Total Admin → Setări → WhatsApp):
- **Oprit** e modul implicit: nu face nimic și nici nu citește din Shopify.
- **Umbră**: în Comenzi apare „💬 WhatsApp: mod umbră, ar pleca la 08:00”, fără să trimită nimic.
- **Live**: trimite clienților. Pentru pornire scrii TRIMITE; merge doar cu numărul conectat și șablonul aprobat.

Mesajul de test pleacă **doar** la numărul tău de test, salvat de tine în Setări.

---

## 2. Cât costă (fișa oficială Meta, în vigoare de la 1.10.2026)

- România are tarif propriu pe lista Meta. Un **mesaj „utility” livrat costă 0,0239 €** (0,029 $). Plătești doar mesajele **livrate**; mesajele primite de la clienți sunt gratuite.
- Răspunsurile automate scurte de după buton sunt mesaje de tip „service”. **Primele 1.000 pe lună sunt gratuite** pentru fiecare număr; de la al 1.001-lea costă 0,0239 €.
- Exemplu: 300 de comenzi ramburs pe lună × 0,0239 € ≈ **7,2 € pe lună (circa 36 de lei)**. Mesajele trimise de colegă din aplicația de pe telefon rămân gratuite.
- Nu există intermediar și nici abonament: Meta te taxează direct, pe metoda de plată din WhatsApp Manager.
- Moneda se alege o singură dată, la adăugarea plății (propun EUR), și nu se mai poate schimba.

---

## 3. Condițiile modului coexistence (documentația Meta, actualizată pe 14.11.2026)

- Numărul rămâne în **WhatsApp Business de pe telefon**, iar conversațiile se văd în ambele locuri.
- Trebuie **WhatsApp Business minim 2.24.17** (actualizează din App Store sau Google Play).
- Conectarea se face **doar prin „Embedded Signup”**, iar aplicația Meta care o găzduiește trebuie să fie **Tech Provider**. Prime devine propriul Tech Provider: e **gratuit**, dar cere verificarea firmei și o verificare a aplicației cu două filmări scurte (pașii B și C). Pagina de Embedded Signup e deja făcută în Total Admin.
- **Telefonul principal** trebuie deschis cel puțin **o dată la 14 zile**, altfel Meta deconectează numărul. Dispozitivele legate se deconectează după circa 30 de zile de inactivitate.
- La conectare se **deconectează toate dispozitivele legate** (WhatsApp Web și altele), iar colega le leagă din nou. **WhatsApp pentru Windows NU e suportat** ca dispozitiv legat: dacă colega lucrează la calculator, folosește **web.whatsapp.com** în browser.
- După conectare, în aplicația de pe telefon:
  - mesajele temporare, „vezi o dată” și locația live se opresc în conversațiile 1:1;
  - **listele de difuzare (broadcast) devin doar de citit**;
  - grupurile, apelurile, catalogul, etichetele, răspunsurile rapide și mesajele de întâmpinare sau absență rămân ca acum.
- Limita e de 20 de mesaje pe secundă, mult peste ce ne trebuie.
- În primele 24 de ore după conectare, Meta cere sincronizarea contactelor și a istoricului. Total Admin o face singur. La istoric alege să **NU** îl partajezi, pentru că nu avem nevoie de el.
- Deconectarea se face din aplicația de pe telefon: Setări → Cont → Business Platform → Disconnect.

---

## 4. Pașii tăi, în ordine

Ce îți trebuie:
- acces de admin la portofoliul Meta **primesupplements_ro** (692207112399630);
- telefonul cu WhatsApp Business al numărului Prime;
- un card pentru Meta.

Claude nu introduce chei și nu se loghează în locul tău. Te poate ghida pas cu pas în browser.

**A. Verificarea firmei în Meta** (dacă nu e deja făcută). Intră pe business.facebook.com → Setări → Centrul de securitate (Security Center) → Verificarea firmei → Start verification. Îți trebuie numele, adresa, telefonul, site-ul și, dacă Meta nu găsește firma, un document (de exemplu certificatul de înregistrare).

**B. Aplicația Meta a Prime**
1. Pe developers.facebook.com/apps → **Create app**. Ca scop alegi conectarea cu clienții prin WhatsApp, iar ca portofoliu primesupplements_ro. Nume propus: **„Prime Total Admin”**.
2. În App settings → **Basic**:
   - Privacy policy URL: `https://primesupplements.ro/policies/privacy-policy`;
   - categoria și o pictogramă (poate fi logo-ul Prime).
3. Notează **App ID**. La **App secret** apeși Show și îl copiezi.

**C. Tech Provider** (gratuit). În App Dashboard → Use cases → WhatsApp → Customize → **Tech Provider onboarding**:
1. Verificarea firmei apare bifată, după pasul A.
2. La **App Review** trimiți două filmări de ecran:
   - mesajul trimis din **API Setup** (comanda cURL de acolo) către un număr de test al tău;
   - crearea unui șablon în **WhatsApp Manager**.
3. Ceri acces „Advanced” la `whatsapp_business_messaging` și `whatsapp_business_management`. Alegi **Onboard without a partner**.
4. Aprobarea durează de obicei câteva zile. Te ajut la filmări.

**D. Facebook Login for Business → Settings** (în aplicație)
1. Pune pe **Yes**: Client OAuth login, Web OAuth login, Enforce HTTPS, Embedded Browser OAuth Login, Use Strict Mode for redirect URIs și Login with the JavaScript SDK.
2. La **Allowed domains for the JavaScript SDK** și la **Valid OAuth redirect URIs** pui: `https://prime-expediere.prime-expediere.workers.dev/`.

**E. Facebook Login for Business → Configurations**
1. Faci o configurație pentru **WhatsApp Embedded Signup**. Dacă poți alege durata tokenului, alege **Never** (fără expirare). Șablonul gata făcut dă un token de 60 de zile; atunci faci și pasul J.
2. Copiezi **Configuration ID**.

**F. WhatsApp → Configuration → Webhook** (în aplicație)
1. Callback URL și Verify token le iei din Total Admin → Setări → WhatsApp → „Webhook”. Callback URL e `https://prime-expediere.prime-expediere.workers.dev/webhook/whatsapp`. Apoi apeși **Verify and save**.
2. La Webhook fields te abonezi la: **messages, account_update, history, smb_app_state_sync, smb_message_echoes**.
3. Treci aplicația în **Live** (comutatorul din capul paginii). În modul de dezvoltare, Meta nu trimite toate webhook-urile.

**G. În Total Admin → Setări → WhatsApp → „Datele aplicației Meta…”**
1. Completezi App ID, Configuration ID, App secret și **numărul tău de test** (07…), apoi **Salvează**. Datele se salvează criptat, ca la Oblio și Cargus.
2. Apeși **„Conectează numărul (Meta)”** și se deschide o filă nouă; linkul e valabil 20 de minute.
3. Pe pagina din fila nouă:
   - te loghezi;
   - alegi conectarea contului WhatsApp Business existent și scrii numărul Prime;
   - pe telefon apeși **Connect**, apoi **Confirm**;
   - la istoric alegi **NU partaja**;
   - lipești codul primit și termini cu **Finish**.
4. Total Admin salvează tokenul, abonează webhook-urile și cere sincronizarea în primele 24 de ore.
5. Revii în Setări și apeși **„Verifică la Meta”**. Trebuie să apară numele verificat, numărul și „coexistence”.

**H. Metoda de plată**
1. Intri pe business.facebook.com/wa/manage/home → **Add payment method**.
2. Alegi moneda **EUR** și adaugi cardul.

**I. Șablonul**
1. În Total Admin apeși **„Trimite șablonul la aprobare”**. Sau îl faci de mână în WhatsApp Manager, cu textul din §5.
2. Aprobarea vine de obicei în câteva minute, uneori în câteva ore.
3. Apeși **„Verifică la Meta”** până apare **aprobat**.

**J. Token permanent** (recomandat dacă tokenul de la pasul G e de 60 de zile)
1. Intri în Business settings → Users → **System users** → Add, cu numele „Total Admin” și rolul Admin.
2. La **Assign assets** dai aplicația „Prime Total Admin” și contul WhatsApp, ambele cu Full control.
3. Apeși **Generate new token**:
   - aplicația: Prime Total Admin;
   - expirarea: **Never**;
   - permisiunile: `whatsapp_business_messaging` și `whatsapp_business_management`.
4. Lipești tokenul în Total Admin → Setări → WhatsApp → „Token de acces”, apoi **Salvează**.

**K. Testul** (doar la numărul tău)
1. Apeși **„Mesaj de test la numărul meu”** și primești pe telefon mesajul pentru comanda #TEST, cu 123,45 lei.
2. Apeși un buton și verifici răspunsul automat.
3. În Setări → „Ultimele mesaje” → „Reîncarcă lista” trebuie să apară răspunsul.

**L. Umbră (1–2 zile).** Modul **Umbră** → „Schimbă modul”. În Depozit → Comenzi, la fiecare ramburs nou, verifici ora la care ar fi plecat mesajul.

**M. Pornirea.** Modul **Live** → scrii **TRIMITE** → „Schimbă modul”. De acum mesajele pleacă la clienți, doar pentru comenzile plasate după pornire.

---

## 5. Textul șablonului (de trimis la aprobare)

- **Nume:** `confirmare_comanda_ramburs`
- **Categorie:** Utility · **Limba:** Romanian (`ro`)
- **Antet (text):** Confirmare comandă
- **Corp:** Bună, {{1}}! Am primit comanda ta {{2}} de pe primesupplements.ro, cu plata la livrare (ramburs): {{3}} lei. Te rugăm să o confirmi, ca să o pregătim pentru expediere.
- **Exemple pentru variabile:** {{1}} = Andrei · {{2}} = #13456 · {{3}} = 249,90
- **Subsol:** Prime Supplements
- **Butoane (Quick reply):** ✅ Confirm · ✏️ Vreau o modificare · ❌ Anulez comanda

Mesajul e pur tranzacțional: nu are reduceri și nici linkuri. Așa rămâne „utility”, nu „marketing”.

---

## 6. De hotărât sau de verificat de tine

1. ~~**Intervalul de noapte**~~ – **hotărât pe 17.11: 17:30–08:00** („17:30 si 8:00”), pus în aplicație.
2. **„Nu răspunde” după 3 ore de zi:** e bine așa? Se poate seta între 1 și 12 ore.
3. **Acordul clientului (regula Meta + GDPR):** Meta cere ca mesajele inițiate de firmă să meargă doar la clienți care au fost anunțați că vor primi mesaje pe WhatsApp. Propun:
   - o propoziție în pagina de comandă sau în coș: „Comenzile cu plata la livrare le confirmăm pe WhatsApp”;
   - WhatsApp (Meta) adăugat la împuterniciți în politica de confidențialitate (Pandectes).
   Nu le-am pus: designul și textele de pe site se schimbă doar cu aprobarea ta.
4. **Colega:** dacă folosește WhatsApp pe calculator, după conectare trebuie să lucreze din **web.whatsapp.com**, pentru că aplicația WhatsApp pentru Windows nu e suportată în coexistence.

## 7. Ce nu s-a putut verifica încă

- Conectarea propriu-zisă (Embedded Signup cu coexistence), webhook-urile reale de la Meta și aprobarea șablonului. Toate cer aplicația Meta, pașii B–I.
- Restul e testat automat: 24 de teste noi, dintre care un scenariu cap-coadă pe o bază de date simulată (comandă → mesaj → buton → bifă, „de verificat”, „nu răspunde”, mesaje dublate de Meta, semnătura falsă respinsă). Pe adresa reală, webhook-ul refuză orice cerere nesemnată.
