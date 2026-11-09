# Chera Coaching – „Planul actual”: analiză, idei și planul de implementare (9.11.2026)

Cererea lui Marius (9.11.2026, brief în trei părți): (0) analiza proiectului fără modificări, (1) idei pentru „cel mai bun site de coaching online” cu TOP 5, (2) funcția „Planul actual” (fișiere + text, pagină în cont, trimitere în chat, istoric, notificare, securitate, pregătită pentru aplicația mobilă). Implementarea pornește doar după OK-ul lui pe planul din §3.

Ce am găsit în repo înainte să propun ceva (regula proprietarului): planul clientului **există deja** în Chera Hub ca text pe secțiuni, cu versiuni și istoric (Etapa 3, 29–30.10: tabela `plan_versions`, butonul „📋 Plan” în panou, fila „Planul meu” la client, propuneri de plan de la AI aprobate de Marius). Nu există: fișiere atașate planului, pagină dedicată, buton de descărcare, „Trimite și în chat”, notificare la actualizare, istoric vizibil clientului. Planul de mai jos **extinde** ce există, nu construiește a doua oară.

---

## §0. Analiza proiectului (pe scurt, fără modificări)

**Platforma.** Site-ul e un magazin Shopify (`bp66vh-bq.myshopify.com`, viitor `mariuschera.ro`) cu temă proprie scrisă de Claude (`chera-coaching/shopify-theme/`). Chatul și tot ce ține de clienți („Chera Hub”) e o aplicație separată, pe **Cloudflare Workers** (cod TypeScript, repo privat `chera-hub`), care apare în site la `/apps/chat` prin **Shopify App Proxy**. Date: **D1** (bază SQLite), fișiere: **R2** (depozit privat), timp real: Durable Objects (WebSocket), e-mail: Resend, notificări push: Web Push (PWA). Aplicația mobilă (`chera-hub-app`, Expo, iOS/Android) folosește același server, pe rutele `/app/api/…`. 98 de teste automate trec azi.

**Conturile de client.** Sunt conturile **noi** Shopify: clientul intră cu e-mail + cod (fără parolă); în aplicație și cu Apple/Google, legate de același cont Shopify. Accesul la coaching nu e un câmp în Hub, ci regula din Shopify: metafield-ul `chera.expira` sau ultima comandă plătită de coaching + 30/90 zile, cu 3 zile de grație; Hub-ul o citește, o ține 24 h în memorie și o recalculează la fiecare plată (webhook) și în fiecare noapte. Marius poate prelungi manual din panou.

**Login-ul.** În site: antet → „Intră în cont” → pagina Shopify → înapoi în chat. Shopify semnează fiecare cerere către Hub cu ID-ul clientului logat; Hub-ul verifică semnătura, deci clientul nu poate pretinde că e altcineva. În aplicație: login prin Shopify, apoi o sesiune proprie de 30 de zile (token pe telefon).

**Chatul.** `/apps/chat`: conversație 1-la-1 cu Marius „ca pe WhatsApp” (alb/roșu/negru): text, poze, PDF/Word/text, mesaje vocale, răspuns la mesaj, reacții, editare 15 min, ștergere, căutare, ✓/✓✓, „scrie…”. Trei file: **Chat / Planul meu / Check-in** (ultimele două doar cu abonament activ). Fișierele stau private în R2 și se deschid doar prin linkuri semnate care expiră în 10 minute; clientul primește linkuri doar pentru conversația lui.

**Panoul de control (admin).** `/apps/chat/admin`, doar pentru Marius (oricine altcineva primește „Nu există”): lista clienților cu necitite/acces/etichete, conversația, modurile AI per client (Manual / Draft / Auto / Cere AI-ului), **📋 Plan** (text pe secțiuni, „Salvează ca versiune nouă”, istoricul în listă), **🧠 Fișa** clientului, prelungirea accesului, Notițe (baza de cunoștințe), setări, costuri AI, export/ștergere GDPR, audit. Regula de bază: un mesaj „de la Marius” apare doar prin panou (sau prin modul Auto pe care îl pornește el); clientul nu vede nimic despre AI.

---

## §1. Idei pentru cel mai bun site de coaching online

Dificultate: **mică** = o sesiune de lucru, pe ce există; **medie** = 2–4 sesiuni, cu tabele/pagini noi; **mare** = proiect separat sau cost/decizie externă. Toate respectă regula lui Marius: clientul nu află de AI, răspunsurile sunt „de la Marius”.

### A. Experiența clientului în cont
1. **„Planul actual” cu fișiere, descărcare și istoric** (Partea 2). De ce: azi clientul vede doar text; PDF-urile și pozele planului stau pierdute în chat. **Mică–medie.**
2. **Ecranul „Săptămâna mea”**: la deschidere, un singur ecran cu planul de azi (ce antrenament, câte mese), check-in-ul de făcut, data expirării și ultimul mesaj. De ce: clientul nu caută prin file, știe ce are de făcut. **Medie.**
3. **Grafice de progres din check-in-uri** (greutate, somn, energie, aderență) + **pozele de progres alăturate** (înainte/după, pe lună). De ce: progresul vizibil e motivația nr. 1 și argumentul de reînnoire. **Medie.**
4. **Biblioteca mea**: toate fișierele pe care i le-a trimis Marius (planuri, ghiduri, PDF-uri din programe), într-un singur loc, cu căutare. **Mică** (după Partea 2).
5. **Calendarul clientului**: sesiunile rezervate, ziua de check-in, ziua reînnoirii, cu „adaugă în calendarul telefonului”. **Mică.**

### B. Motivație și retenție
6. **Check-in săptămânal cu memento** (duminică seara, push + e-mail, formular de 30 s) și răspunsul lui Marius luni. De ce: ritmul săptămânal e ce ține clientul; azi check-in-ul există, dar nimeni nu îl cere. **Mică.**
7. **Serii și repere**: „8 săptămâni la rând cu check-in”, „−5 kg”, „3 luni în Protocol”, cu felicitare în chat de la Marius (șablon pe care îl aprobă). **Medie.**
8. **Raportul lunar de progres**: pagină/PDF generat din check-in-uri + plan + poze, trimis „de la Marius” în prima zi a lunii. De ce: clientul vede valoarea; e și materialul perfect pentru reînnoire. **Medie.**
9. **Reînnoire inteligentă**: cu 7 zile înainte nu doar „expiră”, ci rezumatul progresului + „următorul pas propus” + buton. Memento-urile există deja (7/3/1 zile); se adaugă conținutul personal. **Mică.**
10. **Obiective la 30/60/90 de zile**, scrise împreună la început, bifate pe parcurs. **Mică.**
11. **Comunitate privată** (provocări lunare, grup cu clienții care acceptă). **Mare** – alt produs, moderare.

### C. Automatizări care îi economisesc timp lui Marius
12. **Onboarding automat la plată**: chestionar inițial (obiective, istoric, program, alergii, poze de start) → intră direct în **Fișa clientului** și în primul draft de plan. De ce: azi fiecare client nou înseamnă 20 de întrebări în chat. **Medie.**
13. **Alerte de risc în panou**: fără check-in de 10 zile, aderență sub 5 două săptămâni, greutate stagnantă 3 săptămâni, expiră în 7 zile fără reînnoire. Lista lui de dimineață. **Medie.**
14. **Șabloane de plan + „pornește de la versiunea anterioară”** + variabile (nume, greutate, calorii) și **PDF cu brand Chera generat din text**. **Mică–medie.**
15. **Mesaje programate și difuzare**: scrie acum, pleacă marți 08:00; „trimite tuturor clienților în definire”. **Mică.**
16. **Rezumatul de dimineață** pentru Marius (e-mail/push 07:00): cine a scris, cine are check-in, cine expiră, ce drafturi așteaptă. **Mică.**

### D. Creștere și monetizare
17. **Niveluri de pachete** (ex. Bază – chat cu răspuns în 48 h / Pro – 24 h + plan lunar / Elite – apel video lunar + check-in zilnic la concurs). Produse Shopify, accesul și eticheta vin din comanda plătită (există mecanismul). **Mică.**
18. **Abonament recurent** în loc de plată o dată (Shopify Subscriptions). De ce: retenție pasivă, venit previzibil. **Medie** – depinde de procesatorul de plăți (Netopia) la abonamente.
19. **Programele digitale ca pas de intrare** (există 6 produse la 200 lei): cumpărătorii primesc în chat o ofertă personală pentru coaching; la expirarea coachingului, programul potrivit ca „menținere”. **Mică.**
20. **Program de recomandare**: clientul aduce un client → o lună gratis / reducere, urmărit automat prin cod. **Medie.**
21. **Listă de așteptare cu locuri limitate** pe pachetele mari (Marius antrenează singur): „următoarele 5 locuri din decembrie”. **Mică.**

### E. Ce l-ar diferenția clar de alți antrenori online
22. **Răspuns personal garantat într-o fereastră afișată public** (ex. „răspund în maximum 24 h, eu, nu un asistent”) și panoul îl ajută să o respecte (cozi, alerte). **Mică.**
23. **Chera Protocol ca metodă proprie, vizibilă în cont**: evaluarea neurotip (există gratuit pe site) legată de plan – clientul vede „profilul tău de preferințe” și de ce planul lui arată așa. **Medie.**
24. **Transparența planului**: istoricul versiunilor cu „ce s-a schimbat și de ce” vizibil clientului (Partea 2, §5). Nimeni nu face asta. **Mică.**
25. **Vocea lui**: mesaje vocale în chat (există) + un „gând al săptămânii” audio pentru toți clienții. **Mică.**
26. **Aplicația proprie în App Store/Google Play** (în lucru, Etapa 2+). **Mare** (conturi Apple/Google, publicare).

### TOP 5 (în ordinea priorității)
1. **„Planul actual”** cu fișiere, descărcare, trimitere în chat, istoric și notificare (ideile 1 + 24) – e baza tuturor celorlalte și e cerută acum.
2. **Check-in săptămânal cu memento + grafice de progres + poze înainte/după** (6 + 3) – retenție și material de reînnoire.
3. **Onboarding automat la plată + alerte de risc** (12 + 13) – cel mai mult timp economisit pentru Marius la 100 de clienți.
4. **Reînnoire inteligentă + niveluri de pachete / abonament** (9 + 17 + 18) – bani, cu efort mic pe partea tehnică.
5. **Raportul lunar de progres** (8) – diferențiere clară, folosește datele din 1–3.

Nimic din §1 nu se implementează până nu alege Marius.

---

## §2. Ce NU se poate exact cum e cerut (și alternativa)

- **„Vizibilă în meniul contului”**: magazinul e pe **conturile noi Shopify**; meniul paginii de cont (`/account`) e găzduit de Shopify și nu se poate extinde fără o „Customer Account UI Extension” (aplicație publicată prin Shopify CLI, cu aprobare – zile de lucru, altă infrastructură). **Alternativa (recomandată):** (a) link **„Planul actual”** în antetul site-ului, lângă „Chat”, vizibil doar clienților logați (tema e a noastră); (b) fila din chat redenumită **„Planul actual”**; (c) pagină dedicată `/apps/chat/plan`, cu titlul ei, care merge direct din e-mail/push. Dacă mai târziu vrem și în meniul Shopify, se poate ca proiect separat.
- **Word/Excel „arătate” în pagină**: browserul nu le afișează; PDF-urile și pozele se văd în pagină, Word/Excel au doar **Descarcă** (așa face și Google Drive pe telefon fără aplicații). Dacă vrea previzualizare, Marius salvează planul ca PDF din Word (un clic) și îl urcă pe acela.
- **AI-ul și fișierele**: textul planului intră azi în contextul drafturilor; **fișierele nu** (AI-ul nu le citește). Rămâne așa în prima versiune; dacă vrea, se extrage textul din PDF/Word în browser (ca la Notițe) într-un pas următor.

---

## §3. Planul de implementare „Planul actual” (așteaptă OK)

### Principiu
**O singură sursă**: tabela `plan_versions` existentă rămâne „planul”. Fiecare salvare = versiune nouă (text și/sau fișiere). Pagina clientului, fila din chat, aplicația mobilă și mesajul din chat citesc **aceeași versiune curentă** prin același API JSON. Mesajul din chat rămâne în istoricul conversației și când planul se schimbă (cerința 4). Propunerile AI de plan (existente) continuă să intre tot aici, ca versiuni.

### Pașii
1. **Ramură și backup.** În `chera-hub`: ramura `planul-actual` (nimic pe `main` până la test). Backup înainte de migrație: export D1 live (`wrangler d1 export … --remote`) salvat local, în afara repo-urilor.
2. **Baza de date** – migrația `0016_plan_files.sql`: tabela `plan_files` (fișierele unei versiuni: cheie R2 privată `plan/<client>/…`, nume, tip, mărime, fel: pdf/imagine/word/excel), coloana `sent_message_id` în `plan_versions` (ce mesaj de chat a dus planul), setările `plan_history_visible_to_client` (implicit **oprit**, până decide Marius) și `plan_notify_channels` (implicit e-mail + push).
3. **Server (date și logică, refolosibile de aplicația mobilă)** – `src/plan.ts`, `src/upload.ts`, `src/routes/admin.ts`, `src/routes/client.ts`, `src/jobs.ts`:
   - tipuri de fișier acceptate în plus: Excel (.xlsx/.xls) și Word vechi (.doc); PDF, poze, .docx, .txt există;
   - **admin**: `GET /api/clients/:cid/plan` întoarce și fișierele fiecărei versiuni; `POST /api/clients/:cid/plan` primește `{content, note, files:[chei R2], send_to_chat, chat_message}`: salvează versiunea, leagă fișierele, dacă `send_to_chat` creează mesajul în chat **de la Marius** (textul lui opțional + „planul actualizat, îl găsești oricând la: <link către pagină>” + fișierele atașate, ca o copie legată de mesaj, ca ștergerea unui mesaj din chat să nu șteargă planul) și pune în coadă notificarea; `POST /api/clients/:cid/plan/:vid/resend` – „Trimite din nou în chat” pentru o versiune;
   - **client**: `GET /api/plan` (există) întoarce și `files[]` cu linkuri semnate 10 min, `text`, `updated_at`; `GET /api/plan/file/:id` verifică proprietarul și redirecționează către link semnat; `GET /api/plan/history` doar dacă setarea e pornită (dată + notă + fișiere ale versiunilor vechi); **nimic public prin link direct** (cerința 7);
   - **notificare** – job nou `notify_plan_update`: e-mail „Planul tău a fost actualizat” (șablonul existent, buton „Vezi planul actual”) + push „Marius ți-a actualizat planul”, la 1 minut după salvare, o singură dată per actualizare; dacă s-a trimis și în chat, e-mailul generic „Marius ți-a răspuns” pentru același client nu mai pleacă și el (fără două e-mailuri pentru același lucru); textele fără mențiuni de AI;
   - audit: `plan_saved`, `plan_sent_to_chat`, `plan_file_view` (ca la mesaje).
4. **Pagina clientului** – fișier nou `src/ui/plan-page.ts` + `src/routes/client.ts`: `/apps/chat/plan` randată în tema site-ului, titlu **„Planul actual”**, „Actualizat la: [data]”, textul pe secțiuni (ca azi), fișierele cu previzualizare (poze/PDF) și buton **Descarcă** pe fiecare, bună pe telefon, link „Înapoi la chat”; istoricul (dacă e pornit). Fila din chat se redenumește „Planul actual” și arată și fișierele; fără abonament activ pagina spune, ca azi, că planul se deschide după plată.
5. **Panoul lui Marius** – `src/ui/admin-page.ts`: în caseta „📋 Plan” existentă: alegere fișiere (mai multe, PDF/poze/Word/Excel, max. 20 MB fiecare – setarea `max_upload_mb`), lista lor cu ștergere înainte de salvare, caseta „Ce s-a schimbat” (există), **bifa „Trimite și în chat”** + câmp „Mesaj pentru client (opțional)”, butonul „Salvează ca versiune nouă” face tot; în lista de istoric, fiecare versiune arată fișierele și are „Trimite din nou în chat”; un comutator „Clientul vede istoricul” (setarea de la pasul 2).
6. **Antetul temei** – `chera-coaching/shopify-theme/sections/header.liquid`: link „Planul actual” → `/apps/chat/plan` pentru clientul logat (lângă „Chat”). Se publică pe live din Hub (`theme-files`), ca la celelalte fișiere; **are nevoie ca Marius să fie logat** cu `marius.chera@outlook.com` în tab-ul din browserul aplicației (același punct deschis în DE-FACUT pentru `evaluare.liquid`).
7. **Teste** – `test/plan.test.ts` nou: clientul X nu primește fișierele clientului Y (404), linkurile expiră, pagina nu conține `{{`/`{%`, JS-ul paginilor trece `scripts/check-page-js.mjs`; `npm test`, `npm run typecheck`.
8. **Test cap-coadă local** (`npm run dev`, clientul local 1001 = cont de test, `dev_cid=1` = panoul): urc PDF + poză + text → apare la client cu „Actualizat la” → „Trimite și în chat” → mesajul cu fișiere + link → fac update → pagina arată v2, mesajul v1 rămâne → e-mailul de notificare apare în jurnalul dev; apoi **pe live doar cu contul de test** (Adelina ca client, cum s-a convenit la celelalte etape), nu cu clienți reali.
9. **Deploy**: migrația pe live (prim-plan, după 02:00 dacă e nevoie), `wrangler deploy`, publicarea antetului, verificare pe telefonul lui Marius.
10. **Jurnal + instrucțiuni**: `JURNAL.md`, `README.md` din `chera-hub`, și un ghid simplu „Cum pun planul unui client” (§4 de mai jos, completat după implementare).
11. **Aplicația mobilă** (după OK separat): `chera-hub-app/src/components/plan-view.tsx` citește același `GET /api/plan` – adaugă lista de fișiere cu deschidere/descărcare. Datele sunt gata din pasul 3; UI-ul mobil e un pas mic, separat.

Estimare: o sesiune lungă de lucru (pașii 1–8), plus 20–30 de minute cu Marius pentru pașii 6 și 9.

### Întrebările pentru Marius (răspunde odată cu OK-ul, sau rămân implicitele)
1. **Vede clientul istoricul versiunilor?** Implicit: **nu** (doar versiunea curentă); dacă da, propun să vadă data + nota „ce s-a schimbat” + fișierele vechi, cu buton „Descarcă”.
2. **Notificarea la actualizare:** e-mail **și** push (implicit), sau doar unul?
3. **Linkul „Planul actual” în antetul site-ului**, lângă „Chat” – OK?
4. **Mărimea maximă a fișierului:** 20 MB (cât e azi la chat) – ajunge?

---

## §4. Cum folosești funcția din panou (ghid pas cu pas, după implementarea din 9.11.2026)

**Unde:** panoul tău, `bp66vh-bq.myshopify.com/apps/chat/admin` (mai târziu `mariuschera.ro/apps/chat/admin`), logat cu contul tău.

1. **Alege clientul** din lista din stânga. În bara de sus a conversației apeși **„📋 Plan”** (scrie și versiunea curentă, ex. „Plan v3”, sau „(niciunul)” dacă nu are încă plan).
2. **Scrie sau corectează textul** planului în caseta mare (secțiunile `## Mese`, `## Antrenament`, `## Suplimente`, `## Cardio`, `## Note`). La primul plan pornești de la model. Textul poate rămâne gol dacă planul e doar un fișier.
3. **Adaugă fișiere** cu **„📎 Adaugă fișiere”**: PDF, poze, Word (.doc/.docx), Excel (.xls/.xlsx), max. 20 MB fiecare. Apar ca etichete sub text; **✕** le scoate din versiunea nouă. Fișierele versiunii anterioare apar deja (cu chenar punctat) și rămân dacă nu le scoți.
4. **„Ce s-a schimbat și de ce”** (opțional): o propoziție; rămâne în istoric și o vede clientul sub „Ce s-a schimbat”.
5. **„Trimite și în chat”** (bifă, opțional): planul pleacă și ca mesaj de la tine în conversație, cu fișierele atașate și linkul către pagina „Planul actual”. Poți scrie un mesaj scurt în căsuța care apare (ex. „Citeste cu atentie sectiunea Mese”).
6. Apeși **„Salvează ca versiune nouă”**. Gata: clientul vede noua versiune la **„Planul actual”** (fila din chat + pagina `/apps/chat/plan` + linkul din antetul site-ului), iar după un minut primește **e-mail + notificare pe telefon** „Planul tău a fost actualizat” (la primul plan: „Planul tău e gata”). Mesajele vechi din chat cu planuri rămân acolo.
7. **Istoricul:** lista „Istoric…” din dreapta casetei arată toate versiunile (dată, actuală/veche, câte fișiere, dacă a fost în chat, nota). Alegi una → îi vezi textul și fișierele; **„↗ Trimite din nou în chat”** o retrimite (cu mesaj opțional); dacă apeși „Salvează”, devine versiune nouă.
8. **„Clientul vede istoricul”** (bifa mică din dreapta): oprită implicit → clientul vede doar versiunea curentă; pornită → vede sub plan și versiunile vechi (dată, notă, fișiere de descărcat). Se aplică la toți clienții.

**Bine de știut:** fișierele sunt private (link doar din contul clientului, 10 minute, apoi se reface singur); Word/Excel se descarcă, PDF-urile și pozele se văd în pagină; AI-ul folosește doar textul planului, nu fișierele. Pe telefon totul e pe o coloană, cu butoane mari. Dacă vrei să schimbi doar o poză, deschizi planul, scoți poza veche cu ✕, adaugi una nouă și salvezi – textul rămâne.
