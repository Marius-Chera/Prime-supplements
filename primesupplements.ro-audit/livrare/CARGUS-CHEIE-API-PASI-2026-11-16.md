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
