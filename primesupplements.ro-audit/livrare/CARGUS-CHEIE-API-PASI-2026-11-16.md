# Cheia API Cargus pentru Total Admin – pașii (16.11.2026)

Sursa: manualul Cargus „Generare API Key_ro.pdf”, primit de Marius pe 16.11. Manualul descrie procedura; **nu conține cheia**.

Cheia, parola și e-mailul care conține cheia le face Marius. Claude nu scrie parole sau chei API în formulare ori în e-mailuri (regulă permanentă).

## Pașii, din manualul Cargus
1. https://urgentcargus.developer.azure-api.net/ → **Sign up**. Se completează formularul (e-mailul firmei, parola lui Marius) → „Sign up”.
2. Se confirmă contul din e-mailul primit de la `apimgmt-noreply@mail.windowsazure.com`, apoi te loghezi.
3. **Products** → **UrgentOnlineAPI** → numele firmei (PRIME SPORT SUPPLEMENTS S.R.L.) → **Subscribe**.
4. Cargus aprobă abonamentul. După aprobare, cheia apare la **Profile**: copiezi **Primary Key**.
5. Trimiți Primary Key + utilizatorul WebExpress la **ecom@cargus.ro**, ca să lege cheia de utilizator (textul e-mailului e mai jos, fără cheie).
6. După confirmarea Cargus: **Total Admin → Setări → Cargus**:
   - **Primary key** (cheia API);
   - **utilizatorul WebExpress**;
   - **parola WebExpress**;
   - apoi **„Salvează și verifică”**.

   Aplicația se autentifică, citește punctele de ridicare și grila de prețuri și salvează totul criptat.

## Textul e-mailului către Cargus (Marius completează cheia și utilizatorul)
```
Către: ecom@cargus.ro
Subiect: Asociere cheie API UrgentOnline – PRIME SPORT SUPPLEMENTS S.R.L.

Bună ziua,

Vă rog să asociați cheia API (Primary Key) de mai jos cu utilizatorul nostru WebExpress, pentru integrarea UrgentOnline cu aplicația noastră de comenzi.

Firma: PRIME SPORT SUPPLEMENTS S.R.L., CUI 46260823
Utilizator WebExpress: [UTILIZATORUL]
Primary Key: [CHEIA]

Vă mulțumesc,
Marius Chera
Prime Supplements – 0775 286 584
```

## După conectare (Claude)
- Se verifică conexiunea, punctul de ridicare (Cisnădie), serviciul și grila de prețuri.
- În modul umbră: AWB-ul calculat de aplicație e comparat cu prețul Cargus; statusurile coletelor vin din API, nu de pe pagina publică.
- Trecerea pe **Live** (decizia lui Marius din 13.11): prima rundă = 1–2 comenzi plătite cu cardul, verificate împreună.
- După trecere: parola WebExpress de schimbat (e prea simplă), cu grijă la aplicația veche, care folosește același cont.

## Găsit pe 16.11, în portal (Marius logat, contact@primesupplements.ro)
- Contul există din **13.02.2023**, iar abonamentul **UrgentOnlineAPI e activ tot din 13.02.2023** („You've reached maximum number of subscriptions”). Cheia există deja și, cel mai probabil, o folosește aplicația veche, deci e deja legată de utilizatorul WebExpress.
- **Pașii 1–5 nu mai sunt necesari.** Marius copiază Primary Key (Profile → „Show”) și îl pune în Total Admin → Setări → Cargus, împreună cu utilizatorul și parola WebExpress. „Salvează și verifică” confirmă dacă merge. E-mail la ecom@cargus.ro doar dacă verificarea dă eroare de asociere.
- **NU se apasă „Regenerate”**: ar schimba cheia și ar opri aplicația veche care face acum AWB-urile.

## Prima încercare, 16.11
Cargus a răspuns 409 „There is no active user with the provided credentials!”. Cheia e validă, dar utilizatorul „prime.sport” nu e activ pentru ea: parola e greșită sau lipsește asocierea. Dacă logarea în WebExpress merge cu aceleași date, trimitem e-mailul de asociere. Cargus poate găsi abonamentul după contul de portal contact@primesupplements.ro, deci cheia nu trebuie neapărat scrisă în e-mail.
