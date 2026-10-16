# Revizuire: fezabilitate în theMarketer și rezultate (SYSTEM.md)

**Data:** 15.10.2026 · **Ce am revizuit:** `themarketer/system/SYSTEM.md` (versiunea din 15.10, 23:31) · **Lentila:** există cu adevărat în theMarketer tot ce scrie documentul? Ține matematica până la 50 de comenzi? Respectă presiunea pe contact regula „să nu deranjeze”? Sunt prioritățile ordonate după comenzi pe ora de muncă a proprietarului?

**Cum am verificat:**
- **Contul, live:** `get_audience_options(kind="segment_conditions")` (38 de condiții permise pe plan), `list_segments` (38 de segmente, inclusiv cele de sistem), `get_integration_health` (evenimentele din ultimele 48 de ore), `analyze_audience` (funnelul pe 3 luni), `get_audience_evolution`, `get_audience_history`, `get_audience_breakdown`.
- **Documentația theMarketer** (knowledge base-ul de pe themarketer.com; help.themarketer.com răspunde tot cu 403): welcome, coș abandonat, reaprovizionare, smart sending, oboseala abonaților, coduri de reducere, recomandări, pop-up, formular embedded, landing pages, curățarea abonaților, orele de liniște SMS, integrarea Shopify, pagina de funcționalități.
- **Datele din audituri:** `audit_automations.md`, `audit_audience.md`, `audit_campaigns.md`, `audit_catalog.md`, `sync_report.md`.
- **Benchmark:** Klaviyo, ratele de click pe tipuri de flux. Recalculul e în `review_work/funnel.py`.

**Gravitate:** **Blocant** = dacă rămâne așa, sistemul trimite emailul greșit, deranjează sau ținta e falsă. **Major** = pierdere clară de comenzi sau de timp. **Minor** = de corectat, fără efect mare.

**Confidențialitate:** doar cifre. Nicio adresă, niciun nume, niciun id de contact.

---

## 0. Verdictul, pe scurt

1. **Segmentele (§6) se pot construi exact cum scrie.** Toate condițiile folosite există în catalogul live al contului, la fel toate segmentele de sistem invocate. Două capcane de sens trebuie însă corectate: `funnel_step` înseamnă „cel mai departe pas atins în ultimele 3 luni”, iar comportamentul lui `did_not_buy_in_last` față de cei care n-au cumpărat niciodată nu e documentat (F5, F11).
2. **Blocurile și setările de bază ale automatizărilor există.** **Trei lucruri sunt însă citite greșit:** (a) frequency capping-ul la reaprovizionare blochează **intrarea** în flux, nu amână emailul, deci produsele din a doua comandă nu mai primesc niciun memento (F1); (b) „prioritatea între fluxuri” nu e o setare theMarketer (F2); (c) „maximum 3 emailuri în 7 zile” nu are nicio setare care s-o aplice (F3).
3. **Ramura de checkout construită pe filtrul de funnel ar trimite emailul greșit în ambele direcții** (F5). Pornim cu varianta C (un singur flux de coș). Volumul real de checkout-uri abandonate de abonați e oricum de 2–3 ori mai mic decât în calcul.
4. **Matematica e umflată de aproximativ 3 ori.** Totalul de ~46 de comenzi last-click cere, în aproape fiecare flux, rate de click de nivelul primilor 10 % din Klaviyo și conversii click → comandă de 1,5–2 ori mai mari decât cele măsurate în cont. Recalculat pe media Klaviyo și pe conversiile contului: **~15 comenzi last-click și ~19 cu atingere de email în ianuarie** (în scenariul prudent, ~8 și ~10). Și punctul de plecare e umflat: emailul aduce azi **~7 comenzi cu atingere pe lună** (14 în 61 de zile), nu ~12, iar Welcome aduce **~2** comenzi pe lună după click, nu ~5.
5. **Presiunea pe contact:** un abonat obișnuit primește 1,5–2 emailuri pe săptămână, ceea ce e bine. Dar un abonat nou care lasă un coș primește **5–6 emailuri în 6 zile**, iar un client activ **3–4** în săptămânile aglomerate. În același timp, pop-up-ul și bifa de la checkout promit „maximum 2 pe săptămână”. Promisiunea nu se ține, iar ea face parte din textul de consimțământ.
6. **Prioritățile:** reaprovizionarea are cel mai bun raport comenzi/oră dintre fluxuri și e programată în săptămâna 3. O mutăm în săptămâna 1: orice comandă livrată înainte de pornirea fluxului nu va primi niciodată memento. Fluxul pentru client nou, cu cascada pe 7 categorii, costă ~5–6 ore pentru ~0,3 comenzi pe lună. Ziua 1 durează realist 2,5–3,5 ore, nu 1–1,5.
7. **Ce rămâne neschimbat:** diagnosticul, măsurarea pe click și UTM (nu pe „venit atribuit”), regulile legale și de text, WELCOME5 ca singur cod de reducere, sunsetul fără dezabonare (cu o corecție la curățarea automată, F10) și convenția UTM.

---

## 1. Fezabilitate: ce există, ce nu există, ce e citit greșit

### 1.1 Confirmat (rămâne cum e)

| Element din SYSTEM.md | Unde | Confirmat de |
|---|---|---|
| „+ Create journey” > „Cart related” > „Cart abandonment” / „Cart abandonment similar products” | §4.0, §4.3 | KB, coș abandonat |
| „Start of automation”: abandon după N minute, Run flow „Only once” / „Multiple times”, „Enable frequency capping”, „Exclude contacts who have not exited this automation flow yet.” | §4.0 | KB, coș abandonat și reaprovizionare |
| „Include imported contacts” | §4.0 | KB, welcome |
| „Time delay” cu „Delay until a specific time of the day” și „Delay until a specific day(s) of the week” | §4.0 | KB, welcome, coș, reaprovizionare |
| „Delay by product recurrence”; intervalul se pune în E-commerce > Products > Recurrence; produsul fără interval nu primește memento | §4.7 | KB, reaprovizionare |
| „Filter” > „E-commerce data” > „Shopper status” > „Buyer in the last X days” | §4.0 | KB, coș și reaprovizionare |
| „Send sms” în flux; „Campaign UTM” pe email și pe SMS | §4.2, §2.6 | KB, coș abandonat |
| Blocul „Discount”, „Used code type”: multi-use (cod creat în Shopify) sau unique (generat de theMarketer, doar în automatizări) | §4.0 | KB, coduri de reducere |
| Smart Sending pe canal (Settings > Email setup / SMS setup); „Skip recently messaged contacts” pe campanie; „Enable smart sending” în „Start of automation”; implicit oprit, interval implicit 1 oră | §3.1 | KB, smart sending |
| Orele de liniște SMS (Settings > SMS): implicit 22:00–09:00; se aplică și SMS-urilor din automatizări; mesajele sunt amânate, nu pierdute | §3.1 | KB, quiet hours |
| Statusul de comandă „fulfilled” există, „Delivered” nu | §4.5, §4.7 | `get_order_options` (în `audit_catalog.md`) |
| Evenimentele `initiate_checkout`, `add_to_cart`, `view_product`, `order` ajung; cele de wishlist nu | §1.2, §4.14 | `get_integration_health`, live |
| Pop-up: „Page landing” cu „Time delay”, „Exit intent”, „Tag contacts”, layout „LightBox” și „Slide-in”; embedded: „Tag contacts”, „Form code”, mesaj de confirmare pentru DOI | §8.2, §8.3 | KB, pop-up și embedded |
| Landing pages cu formular (Audience > Landing pages) | §3.5 | KB, landing pages. Taguirea din formular nu e documentată, iar SYSTEM.md o marchează corect „de testat” |
| 11 tipuri de recomandări | §4.3, §7.2 | KB, recomandări. Disponibilitatea în automatizări e marcată corect „neconfirmat” |
| Automated Scheduling, optimal time, best specific time | §10.1, §10.4 | KB |
| **Toate condițiile din §6:** `newsletter_activity` (clicked/not_clicked/received + ferestrele + `specific_campaign`), `shopper_status`, `date_added`, `funnel_step`, `segment`, `purchased_category`, `purchased_product`, `viewed_category`, `subscribed_to`, `number_of_transactions`, `lifetime_value`, `tag`, `email` contains, `deliverability`, `phone` | §6 | `get_audience_options`, live |
| Segmentele de sistem „Activity - Inactive lifetime”, „Shopping - Nonbuyers lifetime”, „Subscriber fatigue - Fatigued” | §3.1, §6 | `list_segments`, live |
| Pragul de curățare automată la 24 de emailuri e setarea contului (documentația dă implicit 45) | §3.4 | `audit_automations.md` §5 |
| Automatizările nu se pot crea sau edita prin API; segmentele, campaniile, testele și tagurile se pot face prin API | §10.2–10.3 | uneltele disponibile |

### 1.2 Probleme

#### F1 · Blocant · Capping-ul de 14 zile la reaprovizionare taie memento-uri
- **Unde:** §4.0 (rândul 4.7), §4.7 „Setări Start of automation”.
- **Ce scrie:** „Enable frequency capping = 14 zile (dintr-o comandă cu 3 produse pleacă cel mult un email la 14 zile)”.
- **De ce e greșit:** capping-ul „will not allow a contact to re-enter the automation flow unless the number of days … has passed” (KB, coș și reaprovizionare). Blochează **intrarea**, nu amână emailul. Cine comandă de două ori în 14 zile (des la suplimente: proteina acum, creatina peste 10 zile) nu intră a doua oară, iar produsele din a doua comandă nu primesc niciodată memento. Mai mult, KB-ul spune că, pe „Multiple times”, fără capping și fără excludere, clientul primește memento pentru **fiecare produs comandat**. Așa că nici efectul promis („un email la 14 zile”) nu se obține.
- **Fix exact:** „Enable frequency capping” **oprit**; „Exclude contacts who have not exited…” oprit (cum scrie deja); **„Enable smart sending” pornit** (oprește două memento-uri în aceeași zi pentru două produse cu același interval, de exemplu două arome Creamy Rice); în „Time delay”, pe lângă „Delay by product recurrence”, pui **„Delay until a specific day(s) of the week” = marți, vineri, sâmbătă**, la 10:00. Astfel memento-ul cade la peste 24 de ore după newsletterul de duminică (18:00) și după campania de miercuri (19:30), deci smart sending nu-l blochează din cauza lor. **Testul înainte de pornire:** o comandă internă cu 2 produse cu intervale diferite; a doua zi citești `get_entered_automation` (o intrare sau două?) și jurnalul de livrare al contactului de test. În §3.2, reaprovizionarea trece la „smart sending pornit”.

#### F2 · Major · „Prioritatea între fluxuri” nu e o setare
- **Unde:** §3.2 (tabelul), §4.9 („dacă în aceeași zi pleacă un memento de reaprovizionare, acela are prioritate”).
- **De ce e greșit:** theMarketer are doar un interval minim între mesaje și un comutator pe flux. Un flux cu smart sending oprit trimite oricum. Unul cu smart sending pornit e blocat doar dacă **înainte** de el a plecat deja alt mesaj. Ordinea o decide ora, nu un rang. Exemplu din document: recâștigarea E1 (10:00, smart pornit) și reaprovizionarea (10:00, smart oprit) pleacă în aceeași zi. Ordinea e nedefinită și, de cele mai multe ori, pleacă amândouă.
- **Fix exact:** redenumești tabelul în „Ce fluxuri respectă smart sending” și adaugi regula de ore: **fluxurile importante la 10:00, cele care pot aștepta la 18:30**. Concret: recâștigarea E1 trece de la 10:00 la 18:30 (vezi și P3). Pui o notă: „theMarketer nu are prioritate între fluxuri; primul mesaj trimis în zi îl blochează pe următorul doar dacă acela are smart sending pornit.”

#### F3 · Major · „Maximum 3 emailuri în 7 zile” nu se aplică singură
- **Unde:** „Pe scurt” punctul 4, §3.1 („Prin construcție”).
- **De ce e greșit:** smart sending impune doar un interval minim între două mesaje (exemplul din KB: cine primește un mesaj la 9:00 nu mai primește nimic până la 10:00). Nu există o limită de N mesaje în 7 zile. Cu interval de 24 de ore, limita teoretică e 7 pe săptămână, iar fluxurile cu smart sending oprit trec oricum. Simulările de la §3 arată că regula se încalcă pentru abonații noi și pentru clienții activi.
- **Fix exact:** formulezi regula ca **țintă monitorizată**, nu ca garanție: „Țintă: maximum 3 emailuri de marketing pe contact în 7 zile. theMarketer nu are o limită pe 7 zile; o ținem prin calendar, prin excluderi și prin orele fluxurilor, și o verificăm lunar pe un eșantion de 20 de contacte.” Apoi aplici fixurile P1–P5 de la §3.3.

#### F4 · Minor · Intervalul smart sending de 24 de ore nu e confirmat
- **Unde:** §3.1, §10.1 pasul 4.
- **De ce:** KB-ul spune doar că intervalul se schimbă din Settings > Email setup și că implicit e de 1 oră. Nu dă valori minime sau maxime.
- **Fix exact:** „Pui 24 de ore. Dacă maximul permis e mai mic, pui maximul și notezi valoarea aici.” Adaugi și o verificare la primul test: emailul de confirmare DOI blochează Welcome E1? (Welcome are smart sending oprit, deci n-ar trebui. Dacă îl blochează totuși, lași Welcome oprit și la toate celelalte setări.)

#### F5 · Blocant · Ramura de checkout pe filtrul de funnel trimite emailul greșit
- **Unde:** §4.2 varianta B („Filter pe pasul din funnel «Initiate checkout» în ultima zi”), §4.0.
- **De ce e greșit:** în catalogul live, `funnel_step` înseamnă „furthest step reached in the last 3 months”. Pe ecranul de automatizări nu e documentat un filtru „checkout început în ultima zi”. Cu filtrul de funnel, un client care a comandat în august și azi abandonează un checkout are pasul maxim „order”, deci ajunge pe ramura de coș. Invers, cine a abandonat un checkout acum două luni și azi doar a pus ceva în coș ajunge pe ramura de checkout.
- **Volumul real e mic:** funnelul theMarketer pe 3 luni (`analyze_audience`) are 122 de contacte identificate la pasul `initiate_checkout`, adică ~40 pe lună, indiferent de acord. La 26–35 % cu acord, rămân **~10–14 pe lună**, nu 35. Cifra de 96 de checkout-uri abandonate pe lună vine din Shopify, iar integrarea Shopify nu documentează că adresa scrisă în checkout ajunge în theMarketer.
- **Fix exact:** **varianta C devine implicită**: un singur flux de coș, cu textele de la §4.3. Treci la varianta A sau B doar dacă în editor există un filtru pe **evenimentul** de checkout, cu fereastră în ore sau zile (nu pe „Funnel”). Abia atunci adaugi și SMS-ul. După 14 zile, numeri cu `get_entered_automation` câte intrări au venit din checkout.

#### F6 · Minor · Filtrul „a dat click pe emailul 1 sau 2” e doar parțial confirmat
- **Unde:** schema de la §4.2 (SMS-ul).
- **De ce:** KB-ul de welcome arată filtrul „Campaign activity” > „Automation activity” cu opțiunea „Purchased from” + emailul din flux + perioada. Opțiunea „Clicked” nu e documentată.
- **Fix exact:** „Dacă «Automation activity» are «Clicked», o folosești. Altfel SMS-ul pleacă doar pe condiția «nu a comandat», sau nu-l pui deloc (vezi F9).”

#### F7 · Major · Filtrele pe numărul de comenzi, pe categorie și pe produs nu sunt documentate pentru automatizări
- **Unde:** §4.1 (sub-ramura „0 comenzi”), §4.5 (doar prima comandă; cascada pe 7 categorii la E2 și pe 5 la E3; excluderea pe produs înainte de E4), §4.6, §4.11.
- **De ce:** `number_of_transactions`, `purchased_category` și `purchased_product` există ca reguli de **segment**. Niciun KB nu le arată ca filtre în editorul de automatizări. SYSTEM.md are variante de rezervă pentru 4.5/4.6 și pentru VIP, dar **nu are rezervă pentru excluderea pe produs dinaintea lui E4**.
- **Fix exact:**
  - Dacă filtrul acceptă segmente, folosești segmentele de sistem **„Shopping - First time buyers”** și **„Shopping - Repeat buyers”** (există deja, nu așteaptă evaluarea unui segment nou). Filtrul îl pui **după prima pauză**, nu imediat după start, ca segmentul să fi apucat să vadă comanda.
  - **E2 într-o singură variantă** (varianta de rezervă din SYSTEM.md devine varianta de bază, cu toate blocurile „Dacă ai luat …”), iar E3 tot într-una. Cascada pe categorii revine în discuție doar după 3 luni, dacă E2 are click-uri.
  - **Dacă nu există filtru pe produs:** E4 nu se face. Reaprovizionarea pe 31 de produse face aceeași treabă.

#### F8 · Major · Setări de pop-up care nu apar în documentație
- **Unde:** §8.2 („o dată la 14 zile”, „niciodată pentru abonați (Advanced options)”, desktop casetă centrată + mobil Slide-in „unul singur”, „Nu pe coș, checkout, cont…”, „Bifa SMS (nebifată)”).
- **De ce:** KB-ul de pop-up are frecvență cu opțiunea „once a week”, audiența „returning visitors”, limitarea pe tipuri de dispozitiv și layout-urile „LightBox” și „Slide-in” („a Slide-in template cannot appear in the center of a desktop screen”). Nu documentează „ascunde pentru abonați”, liste de URL-uri incluse sau excluse și nici un câmp separat de acord SMS.
- **Fix exact:** (1) **două pop-up-uri** cu același text și același tag: unul „LightBox” doar pe desktop, unul „Slide-in” doar pe mobil; (2) frecvența: cea mai rară opțiune din listă (cel puțin „once a week”); (3) „niciodată pentru abonați”: îl alegi doar dacă există pe ecran. Altfel verifici cu un browser în care ești abonat dacă pop-up-ul mai apare. (4) excluderea paginilor: doar dacă editorul are reguli pe URL; checkout-ul Shopify e oricum pe alt domeniu și scriptul nu rulează acolo; (5) bifa SMS: doar dacă editorul are un câmp de acord SMS separat și nebifat. Altfel scoți câmpul de telefon (F9).

#### F9 · Major · Acordul SMS „sigur (pop-up)” nu e dovedit sigur
- **Unde:** §3.3, §6.6 („SMS · Acord sigur (pop-up)”), §8.2.
- **De ce:** auditul automatizărilor a găsit că, la fiecare abonare, contactul intră de 3 ori în Welcome, câte o dată pentru fiecare acord (email, SMS, push), **„prin API, sau popup”**. Deci și la pop-up acordul SMS poate fi înregistrat odată cu emailul. Segmentul cu tagul „abonare pop-up” nu dovedește un acord SMS separat.
- **Fix exact:** înainte de primul SMS, Claude citește istoricul de consimțământ (`get_contact_details`, secțiunea profile) la 5 abonați recenți din pop-up care au telefon. Dacă SMS-ul apare în aceeași secundă cu emailul, fără bifă separată în formular, **nu trimitem SMS deloc** până nu există bifa separată. Pierderea e sub o comandă pe lună (§2.5).

#### F10 · Minor · Curățarea automată dezabonează
- **Unde:** §3.4 („Dezabonarea se face doar la cererea omului sau la hard bounce” și, imediat după, „Curățarea automată … rămâne pornită”), §9.2.
- **De ce:** după KB, contactul curățat „will be unsubscribed from your audience”, iar înainte de curățare primește la fiecare campanie o variantă text simplu. Cele două reguli din SYSTEM.md se contrazic.
- **Fix exact:** fie scrii excepția („…sau la curățarea automată theMarketer, după 24 de campanii nedeschise”), fie **oprești curățarea** (Settings > Cleanup subscribers), pentru că sunsetul lunar cu tag face aceeași treabă fără dezabonare. Recomand oprirea: deschiderile umflate de Apple fac oricum curățarea aproape fără efect.

#### F11 · Major · Segmentul „E · Candidați sunset” poate prinde oameni greșiți
- **Unde:** §6.1.
- **De ce:** (a) `shopper_status did_not_buy_in_last 180` nu e documentat pentru cei care n-au cumpărat niciodată. Dacă cere măcar o comandă, segmentul îi pierde exact pe candidații tipici (abonați din pop-up care n-au cumpărat și nu deschid). (b) `newsletter_activity not_clicked any_sent_180_days` îi prinde și pe cei care n-au primit nicio campanie în 180 de zile: contactele reabonate la sincronizare (cu dată de creare veche) ar primi emailul de sunset la scurt timp după reactivare. Excluderea tagului `reactivare-2026-10` nu-i acoperă pe toți: sincronizarea mai pune `sync-shopify-2026-10`, iar 250–420 de contacte din G_REST pot fi corectate fără tag.
- **Fix exact:** segment nou **[API] „X · Cumpărători 180 zile”** = `shopper_status bought_in_last 180 days`. În „E · Candidați sunset” înlocuiești `shopper_status did_not_buy_in_last 180` cu `segment is_not "X · Cumpărători 180 zile"` și adaugi `newsletter_activity received at_least_5_in_90_days`: întrebăm doar pe cine a primit cel puțin 5 campanii și n-a dat click pe niciuna.

#### F12 · Major · Contactele reactivate primesc newslettere înainte să confirme
- **Unde:** §5 (audiența newsletterului: excluderea „Reactivare 2026-10 · neconfirmați” abia „la 30 de zile după lotul lor”), §9.3 („nu primesc alte campanii până nu dau click”), §6.5 (cei confirmați definiți prin „E · Implicați 90 zile”).
- **De ce:** cele două reguli se contrazic. În plus, „confirmat” e definit prin segmentul de implicare, care include cumpărătorii din ultimele 90 de zile, vizitele pe site și `date_added within 45`, nu prin click.
- **Fix exact:** „Reactivare 2026-10 · neconfirmați” = `tag is reactivare-2026-10` + `newsletter_activity not_clicked any_sent_30_days` + `shopper_status did_not_buy_in_last 30 days` (aici condiția e sigură, pentru că o completează cea pe click). Segmentul e exclus din toate campaniile **din ziua 0**. Iese din segment cine dă click sau comandă.

#### F13 · Blocant (ca moment) · Double opt-in pornit în timpul sincronizării
- **Unde:** §8.1, §10.1 pasul 10 (săptămâna 1).
- **De ce:** singura setare de DOI documentată e în **integrarea Shopify** („Double opt-in setting → Website/theMarketer”), adică cine trimite confirmarea. Nu e documentat că s-ar putea limita doar la formulare. Dacă se aplică și abonărilor venite din Shopify (comandă, import, API), sincronizarea în curs ar trimite emailuri de confirmare la sute de clienți, iar cei care nu confirmă n-ar mai fi abonați. Contul are acum **2.299 de contacte cu email neopozat, +1.054 în ultimele 7 zile** (`get_audience_evolution`), deci lista e în plină mișcare.
- **Fix exact:** DOI se pornește **abia după ce jobul de sincronizare raportează că a terminat**. Înainte: un test cu o abonare la checkout (comandă de test) și un import API de o adresă de test. Dacă vreuna primește confirmare, DOI rămâne oprit și scrii la iam@themarketer.com cu întrebarea exactă: „se aplică DOI și surselor order, import și api?”. **Nuanță la verdictul agenției:** GDPR cere un consimțământ pe care îl poți dovedi (art. 7(1)), nu double opt-in. DOI se justifică aici prin calitatea listei: sincronizarea a scos ~944 de înscrieri de tip bot. Costul îl scrii în document: ~30–35 % mai puțini abonați noi.

#### F14 · Major · Linkurile `/discount/WELCOME5?redirect=…` pot pierde UTM-ul
- **Unde:** §4.1.1, §4.1.3, §4.1.4 (CTA-urile cu WELCOME5).
- **De ce:** theMarketer pune UTM-ul pe linkul exterior. Click-ul trece prin `mktr.primesupplements.ro`, apoi prin `/discount/…`, care face un redirect 302 către colecție. Nu e documentat că Shopify păstrează parametrii UTM peste acest redirect. Dacă îi pierde, comenzile din Welcome, al doilea flux ca mărime în calcul, dispar din indicatorul last-click.
- **Fix exact:** pui UTM-ul **în calea de redirect**, codificat: `…/discount/WELCOME5?redirect=%2Fcollections%2Fsuplimente-sala%3Futm_source%3Dthemarketer%26utm_medium%3Demail%26utm_campaign%3Dflow-welcome-e1%26utm_content%3Dbuton`. Îl testezi o dată: click din emailul de test, apoi te uiți în Shopify, la sesiune sau la comanda de test, dacă apare `utm_source=themarketer`.

#### F15 · Minor · Excluderea „Fatigued” aproape nu face nimic
- **Unde:** §3.1, §5.
- **De ce:** scorul de oboseală scade cu 0,5 la fiecare email trimis și crește cu 0,5 la fiecare deschidere și la fiecare click (KB). Deschiderile automate din Apple Mail îi țin pe aproape toți „sănătoși”.
- **Fix exact:** păstrezi excluderea, dar nu o mai socotești printre protecțiile împotriva presiunii. Protecția reală vine din P1–P5.

#### F16 · Major · Programul de teste A/B nu poate arăta nimic la volumul ăsta
- **Unde:** §10.4 (T3, T5, T6, T7) și „Reguli pentru teste”.
- **De ce:** ca să deosebești un CTR de 1,0 % de unul de 1,5 % (80 % putere, α = 0,05), îți trebuie **~7.700 de destinatari pe variantă**. Un segment de 650 împărțit 50/50 dă 3–8 click-uri pe variantă. La Welcome, alternarea la 2 săptămâni înseamnă ~60 de abonați și 4–8 click-uri pe perioadă. Diferențele observate vor fi zgomot.
- **Fix exact:** renunți la T3, T5, T6 și T7 ca teste. T1 (subiectul newsletterului) și T4 (ora) rămân, dar **cumulate**: fiecare newsletter se împarte 50/50, timp de 8 săptămâni, iar concluzia se trage la final, pe click-uri unice și pe comenzi UTM însumate. Restul schimbărilor le faci pe bază de bun-simț, nu pe bază de test.

#### F17 · Minor · Restul punctelor marcate „neconfirmat” sunt marcate corect
- Șablonul de checkout, cel de „Back in stock”, blocurile de recomandare și de „produse din comandă” în automatizări, taguirea din landing page, A/B în automatizări și comportamentul smart sending (amânare sau sărire): toate au variante de rezervă. Un singur lucru de adăugat la §4.12: dacă nu există declanșatorul „Back in stock”, stocul revenit se face ca **campanie pregătită de Claude prin API**, nu de tine. Crema de orez a adus 5 din cele 14 comenzi măsurate (§2.7).

---

## 2. Matematica: unde e umflată

### 2.1 Punctul de plecare e supraestimat
- **„~12 comenzi pe lună cu atingere”** (Pe scurt 1, §1.1, §2.3, §2.5) vine din prima jumătate a lui octombrie (6 comenzi), înmulțită cu 2. Pe toată perioada sunt **14 comenzi în 61 de zile ≈ 7 pe lună** (septembrie: 6). **Fix:** „~7 pe lună (14 în 61 de zile; 6 în septembrie)”.
- **Welcome „~5 azi”** (§2.2, §2.3, coloana „Azi, măsurat”) e cifra theMarketer atribuită (20 de tranzacții în 90 de zile). Măsurat după click: 4 prime comenzi din Welcome în 61 de zile, **~2 pe lună**. Ritmul de click al seriei e ~3 % din abonați (11 click-uri unice la ~336 de abonați în 90 de zile). **Fix:** coloana „Azi” = 2.
- **Coloana „Azi, măsurat”** amestecă last-click (total ~5) cu cifre atribuite (Welcome ~5). **Fix:** o singură metrică pe coloană: last-click UTM.

### 2.2 Ratele presupuse, față de benchmark și față de cont

| Flux | SYSTEM.md: click (pe serie) × conversie = comenzi pe destinatar | Klaviyo, click pe email: media / primii 10 % | Contul azi (click unic / trimise) |
|---|---|---|---|
| Welcome | 25 % × 20 % = **5,0 %** | 6,5 % / 13,3 % | 1,59 % pe email; ~3 % din abonați dau click pe serie |
| Abandon checkout | 40 % × 28 % = **11,2 %** | (coș) 6,0 % / 11,3 % | — |
| Abandon coș | 20 % × 20 % = **4,0 %** | 6,0 % / 11,3 % | 1,28–1,55 % |
| Abandon navigare | 6 % × 12 % = 0,7 % | 5,6 % / 9,8 % | 0,90 % |
| Client nou | 25 % × 20 % = **5,0 %** | (post-purchase) 5,1 % / 10,5 % | — |
| Reaprovizionare | 15 % × 28 % = **4,2 %** | (post-purchase) 5,1 % / 10,5 % | 1,34 % (fluxul cu bug) |
| Recâștigare | 8 % × 20 % = 1,6 % | 2,8 % / 5,8 % | 1,73 % |
| Conversie click → comandă | 20–28 % la fluxuri, 7–8 % la campanii | — | **14 %** la automatizări (7 din 49), **6,5 %** la campanii (14 din 216) |

- Fraza din §2.2 „ipotezele stau între mediană și primii 10 %” nu e adevărată. Doar la Klaviyo, rata medie de comandă pe destinatar la coș e **3,33 %**, iar aceea e o rată *atribuită*, mai generoasă decât last-click-ul nostru. SYSTEM.md pune 11,2 % la checkout și câte 4–5 % la Welcome, coș, client nou și reaprovizionare, toate în last-click. Ratele de click pe serie (20 % la coș, 40 % la checkout, 25 % la client nou) depășesc ce obțin primii 10 % din Klaviyo pe email, pe un cont care azi e la o cincime din media Klaviyo.
- **Fix:** în §2.2 folosești două coloane: **bază** = media Klaviyo, transformată în click pe serie (×1,3–2, după numărul de emailuri), și conversiile măsurate în cont (14–20 % la fluxuri, 4–6,5 % la campanii); **optimist** = valorile de acum.

### 2.3 Volumele

| Intrare | SYSTEM.md | Ce arată datele | Bază propusă |
|---|---:|---|---:|
| Abonați noi confirmați pe lună (Welcome) | 160 | azi ~112 înscrieri pe lună (336 în 90 de zile), neconfirmate; DOI păstrează ~65 %; dublarea afișărilor pop-up-ului nu e dovedită, iar pauza de 30 de secunde scade afișările | 90–120 |
| Checkout-uri abandonate de abonați | 35 | ~40 de contacte identificate pe lună la pasul de checkout, toate stările de acord; 26–35 % cu acord (F5) | 10–20 |
| Coșuri abandonate de abonați | 110 | azi fluxul ajunge la ~70–100 de contacte pe lună; lista crește | 100 |
| Audiența newsletterului (implicați) | 1.900 | `active_email` = 1.324 (inclusiv deschideri și vizite); 45 % din abonații din pop-up nu deschid niciodată; sincronizarea e încă în curs | 1.400–1.600 |
| Campanii segmentate pe lună | 4 × 650 | calendarul din noiembrie are 2 (două săptămâni fără campanii, din cauza Black Friday), plus 2 campanii de restanțe | 3 × 650 |
| Clienți noi abonați pe lună | 35 | azi 0 din 41 în eșantion; cifra depinde în întregime de reparația bifei de la checkout | 15–20 |
| Memento-uri de reaprovizionare pe lună | 170 | depinde de abonații cumpărători și de F1 | 140 |

### 2.4 Dublă numărare, atribuire și ce e „în plus”
- **Dublă numărare între fluxuri:** fiecare flux e estimat separat, apoi totalurile se adună. Aceeași comandă apare de două ori: abonatul nou e numărat la Welcome și la coș; cumpărătorul, la reaprovizionare, la recâștigare, la client existent și la campanie. Last-click-ul din Shopify dă comanda unui singur flux, dar estimarea o numără de mai multe ori. **Fix:** o reducere de 15 % pe totalul fluxurilor. Doar asta coboară cifra din document de la 43,9 la ~37.
- **„+20 % cu prima atingere”** e corect ca metodă (14 comenzi cu atingere față de 11 last-click), dar se aplică după reducere, nu înainte.
- **Atribuirea pe deschidere:** documentul o respinge corect. Rămâne însă de lămurit că „cu atingere de email” nu înseamnă „în plus”. O parte din comenzile din coș și din reaprovizionare s-ar fi făcut oricum: clienții de creatină și de proteină comandă din nou la 20–90 de zile. Proprietarul a cerut „extra vânzări”. **Fix în §2.6 punctul 5:** testul de incrementalitate se face și pentru reaprovizionare, nu doar pentru newsletter. Variantă fezabilă fără A/B în automatizări: compari rata de recumpărare la 90 de zile a cumpărătorilor abonați (primesc memento) cu a celor neabonați, înainte și după pornirea fluxului, din Shopify.

### 2.5 Recalculul (ianuarie 2027, comenzi last-click pe lună)

| Sursă | Prudent | **Bază** | SYSTEM.md |
|---|---:|---:|---:|
| Welcome | 1,3 | **2,3** | 8,0 |
| Abandon checkout | 0,3 | **0,8** | 3,9 |
| Abandon coș | 0,8 | **1,5** | 4,4 |
| Abandon navigare | 0,4 | **0,5** | 0,9 |
| Client nou | 0,1 | **0,3** | 1,8 |
| Client existent | 0,4 | **0,7** | 1,4 |
| Reaprovizionare | 1,2 | **2,2** | 7,1 |
| Recâștigare | 0,2 | **0,5** | 1,4 |
| Newsletter de duminică | 0,8 | **1,9** | 5,7 |
| Campanii segmentate | 1,2 | **2,5** | 5,2 |
| VIP și stoc revenit | 0,5 | **1,0** | 2,0 |
| SMS | 0,3 | **0,7** | 2,0 |
| **Total last-click** | **7,7** | **15,0** | **43,9** |
| **Cu prima atingere (×1,25)** | **9,6** | **18,8** | **54,8** |

Ipotezele fiecărei coloane sunt în `review_work/funnel.py`. Baza = media Klaviyo, conversiile măsurate în cont, volumele din §2.3. SYSTEM.md = valorile din documentul actual, fără reducerea pentru dublă numărare (cu ea: ~37).

**Ce înseamnă:** în ianuarie, realist sunt **15–25 de comenzi last-click și 20–30 cu atingere de email**, adică de 3–4 ori mai mult decât azi. Asta e deja o creștere mare. 50 de comenzi cu atingere cer ca toate ipotezele optimiste să iasă deodată, în 3 luni.

### 2.6 Ce scrii în document
- **Pe scurt, punctul 2, devine:** „Ținta de 50 de comenzi pe lună din email (cu click) nu e realistă în ianuarie. Realist: 15–25 last-click, adică 20–30 cu atingere de email, de 3–4 ori mai mult decât azi. 50 cu atingere devine plauzibil abia când lista implicată trece de ~3.000 de contacte și peste 25 % din clienții noi se abonează la checkout, probabil în T2 2027.”
- **§2.4 (rampa):** noiembrie ~10 / decembrie ~15 / ianuarie ~20 cu atingere (bază), cu scenariul optimist într-o coloană separată.
- **§2.5 (KPI):** țintele lunare pe scenariul de bază; dacă două luni la rând sunt depășite, treci la cel optimist.

### 2.7 Ce ar închide de fapt golul (în ordinea efectului)
1. **Acordul la checkout.** Doar 20 % din cei 3.174 de cumpărători au acord de marketing. Fiecare +10 puncte procentuale înseamnă ~18 clienți noi abonați pe lună, care intră în reaprovizionare, client existent și campanii. Efectul se adună lună de lună.
2. **Crema de orez, la fiecare revenire în stoc.** 5 din cele 14 comenzi măsurate în 61 de zile vin de aici. Campania o pregătește Claude prin API în ziua revenirii, iar tu doar aprobi testul.
3. **Reaprovizionarea pornită din săptămâna 1** (§4).
4. **Decizie proprietar + jurist (doar menționată, nu recomandată fără aviz):** Legea 506/2004 art. 12(2) permite emailuri despre produse similare către clienții existenți fără abonare, dacă li s-a oferit clar posibilitatea de a refuza la colectare și în fiecare mesaj. În theMarketer, asta ar însemna abonarea lor, un tag dedicat și excluderea tagului din toate campaniile, deci un risc de configurare. Ar mări de câteva ori numărul de memento-uri. Nu se face fără avizul juristului și fără acordul tău.

---

## 3. Presiunea pe contact

### 3.1 Simulări, cu regulile din SYSTEM.md

| Profil | Ce primește | În 7 zile | Încalcă |
|---|---|---:|---|
| **A. Abonat nou din pop-up care pune ceva în coș în aceeași vizită** (cazul frecvent: ia codul și cumpără) | z0: Welcome E1 + coș E1 (ambele cu smart sending oprit); z1: coș E2 la 19:00, plus navigare E1 la 18:30 dacă filtrele din §4.4 nu există; z2: Welcome E2; z5: Welcome E3 | **5–6** | 3 în 7; 1 pe zi (z0, z1) |
| **B. Client nou, prima comandă** | z1 Client nou E1; z4 E2; duminică newsletter; z12 E3 + newsletter + campanie (după 7 zile); z20 reaprovizionare (crema de orez); z25 E4 | ~3 pe săptămână, 4 săptămâni la rând | la limită; peste limită dacă vizitează site-ul (navigare, coș) |
| **C. Client fidel, comandă la ~3 săptămâni și vizite săptămânale** | newsletter săptămânal + campanie segmentată (exclus doar 7 zile după comandă) + reaprovizionare + client existent (o dată pe lună) + navigare (la 14 zile) + coș (la 7 zile) | **3–4** în săptămânile aglomerate | 3 în 7 |
| **D. Client cu Prime Whey 2 kg care nu mai comandă** | z55 creatină (dacă a luat); **z60 reaprovizionare whey + recâștigare E1 în aceeași zi**; z65 izolat; z90 Creapure® + recâștigare E2 | 2 în aceeași zi, de 2 ori | 1 pe zi; mesaj dublat („refă-ți rezervele” de două ori) |
| **E. Abonat implicat, fără comandă, după Welcome** | newsletter + 0,5–1 campanie pe săptămână | 1,5–2 | — |
| **F. Candidat la sunset, în săptămâna sunsetului** | duminică newsletter, marți 19:00 sunset, miercuri 19:30 campanie (după 24,5 ore, deci smart sending nu oprește) | 3 în 4 zile | doar pentru cei mai puțin implicați |

**Concluzie:** media e în regulă (profilul E). Regula se încalcă exact la oamenii cu intenție (A, C, D), adică acolo unde un email în plus poate costa o dezabonare.

### 3.2 Promisiunile din textele de consimțământ nu se țin
- **Pop-up** (§8.2): „Maximum 2 emailuri pe săptămână”. Profilul A primește 3 emailuri Welcome în primele 5 zile, plus confirmarea, plus coșul.
- **Bifa de la checkout** (§8.5): „maximum 2 pe săptămână”. Profilul B primește ~3 pe săptămână timp de o lună.
- **Welcome E1, E4 și reactivarea:** „cel mult o dată pe săptămână un email despre produse”. Pentru B, C și D, fluxurile se adaugă peste asta.
- **De ce contează:** textul face parte din informarea de la momentul consimțământului (transparență, GDPR art. 7 și 13). O limită promisă și neținută e o problemă de corectitudine, nu doar de stil.
- **Fix exact, textele noi:**
  - Pop-up: „După ce confirmi, îți trimitem codul WELCOME5 și 3 emailuri scurte de bun venit. Apoi, de obicei, 1–2 emailuri pe săptămână: ghidul de duminică și, uneori, noutăți despre produse.”
  - Checkout: „Vreau ghidul săptămânal și noutățile Prime pe email. Mă pot dezabona oricând, dintr-un click.”
  - Welcome E1 și E4, reactivarea: „De obicei primești 1–2 emailuri pe săptămână: ghidul de duminică și, uneori, un email despre produse. Când lași ceva în coș sau comanzi, îți scriem și despre asta.”

### 3.3 Fixuri, în ordinea efectului
- **P1 · Welcome și coșul (profilul A):** Welcome E2 trece în ziua 3, E3 în ziua 6, E4 în ziua 10 (în loc de 2/5/9). Navigarea: smart sending pornit (rămâne) și, dacă există, filtrul „Automation activity” > emailul 1 din fluxul de coș în ultimele 2 zile → ies. **Dacă filtrul nu există, navigarea rămâne oprită în prima lună.** Valorează ~0,5 comenzi pe lună și e cea mai mare sursă de emailuri în plus. Excepția „coș E1 în aceeași zi cu Welcome E1” o scrii explicit ca singura excepție permisă.
- **P2 · Cumpărătorii (B, C):** campaniile segmentate exclud segmentul nou **[API] „X · Au comandat în ultimele 14 zile”** (`shopper_status bought_in_last 14 days`), în loc de 7 zile. Newsletterul de duminică rămâne pentru toți.
- **P3 · Recâștigarea și reaprovizionarea (D):** recâștigarea scade la **2 emailuri, la 75 și la 120 de zile**, ambele la 18:30, cu smart sending pornit. Filtrele: „Buyer in the last 70 days” și „Buyer in the last 115 days”. Emailul 2 actual („Refă-ți rezervele”) dispare, pentru că repetă memento-ul de reaprovizionare. Rămân E1 („Ce mai faci și ce e nou”) și E3 („O întrebare și o recomandare”). Reaprovizionarea pleacă la 10:00 și blochează recâștigarea din aceeași zi (F2).
- **P4 · Săptămâna de sunset (F):** campania segmentată din acea săptămână exclude „E · Candidați sunset”.
- **P5 · Regula de oprire:** la verificarea lunară pe 20 de contacte, dacă mai mult de 2 au primit peste 3 emailuri de marketing în 7 zile, oprești întâi navigarea, apoi treci campania segmentată la o dată la două săptămâni.
- **P6 · SMS:** maximum 1 pe săptămână, prin intervalul smart sending de pe canalul SMS, setat la 168 de ore (dacă valoarea e permisă). Altfel regula rămâne ca țintă (F4).

---

## 4. Prioritățile: comenzi pe ora de muncă a proprietarului

### 4.1 Orele reale
- **Ziua 1** (§10.1 scrie 1–1,5 ore): oprirea a 4 fluxuri (5 min), deschiderea, notarea și arhivarea a 5 fluxuri (25 min), reparațiile rapide la 4 fluxuri (40 min), smart sending și orele SMS (5 min), arhivarea a 14 ciorne și verificarea Automated Scheduling (15 min), cei 4 pași DNS în trei console diferite: registrar, Google Admin, Shopify (45–90 min, uneori cu cine administrează domeniul), verificările din Shopify (15 min). **Realist: 2,5–3,5 ore.**
- **Săptămânile 1–4:** dacă se păstrează cascada pe categorii, sunt ~32 de emailuri construite de mână în editor (Welcome 5, checkout 2 + SMS, coș 2, navigare 1, client nou 4 + 6 variante E2 + 4 variante E3, client existent 1, reaprovizionare 1, recâștigare 3, VIP 1, stoc 1). La 20–30 de minute pe email (conținut, subiect, preheader, UTM, blocuri, test), înseamnă 11–16 ore doar pentru emailuri. **Total: ~18–23 de ore** de muncă a proprietarului.

### 4.2 Comenzi pe oră (scenariul de bază, comenzi în plus pe lună în ianuarie)

| # | Acțiune | Ore proprietar | Comenzi în plus pe lună | Comenzi pe oră | SYSTEM.md | Propus |
|---|---|---:|---:|---:|---|---|
| 1 | Campanii pregătite de Claude prin API (newsletter, segmentate, restanțe, stoc revenit); tu doar aprobi testul | ~0,5 pe lună | +4–5 | **~8–10** | săpt. 1 | săpt. 1 (rămâne) |
| 2 | Bifa de la checkout: vizibilă și cu textul de la §3.2 | 0,25 | +1–2 (crește lunar) | **~4–8** | ziua 1 | ziua 1 (rămâne) |
| 3 | **Reaprovizionare** (1 email, intervalele sunt deja setate) | 0,75 | +2,2 | **~3** | săpt. 3 | **săpt. 1** |
| 4 | Coș: oprirea duplicatului + reparațiile rapide | 0,3 | +0,7 | ~2,3 | ziua 1 | ziua 1 (rămâne) |
| 5 | Client existent (1 email, înlocuiește Cross sell) | 0,5 | +0,7 | ~1,4 | săpt. 3 | **săpt. 1** |
| 6 | Navigare (reparația, 1 email) | 0,5 | +0,5 | ~1 | săpt. 2 | săpt. 2, doar cu filtrul de la P1 |
| 7 | Pop-up-urile și formularele embedded | 2 | +1–1,5 (prin Welcome, din luna 3) | ~0,6 | săpt. 1 | săpt. 2 |
| 8 | VIP | 0,5 | +0,3 | ~0,6 | săpt. 3 | luna 2 |
| 9 | Recâștigare (2 emailuri, P3) | 0,75 | +0,5 | ~0,6 | săpt. 4 | săpt. 3 |
| 10 | Ramura de checkout + SMS | 1,5 | +0,8 | ~0,5 | săpt. 2 | doar dacă filtrul din F5 există |
| 11 | Welcome complet: DOI + 4 emailuri | 3 | +0,3–0,8 față de seria de 2 emailuri reparată | ~0,2 | săpt. 2 | săpt. 2, după sincronizare (F13) |
| 12 | Client nou cu cascada pe categorii (până la 14 emailuri) | 5–6 | +0,3 | **~0,05** | săpt. 3 | **luna 2, 3 emailuri, o singură variantă** (~1,5 ore) |
| 13 | Șablonul master + testul dark mode pe 6 clienți de email | 2 | 0 direct (condiție pentru restul) | — | săpt. 1 | interimar: HTML-ul newsletterelor (deja testat, mod luminos) din săpt. 1; master complet în luna 2, testat pe 3 clienți (Apple Mail iOS, Gmail Android, Outlook desktop) |
| 14 | DNS (4 pași) | 1–2 | 0 pe termen scurt | — | ziua 1 | ziua 1 doar ștergerea DMARC-ului dublat (5 min); restul în săpt. 2 |
| 15 | Programul de teste A/B | câteva ore | ~0 (fără concluzii, F16) | — | 30–90 zile | doar T1 și T4, cumulate |

### 4.3 Ordinea propusă (înlocuiește titlurile de la §10.1)
- **Ziua 1 (~2 ore):** oprirea celor 4 fluxuri; reparațiile rapide la coș, Product follow-up, Welcome și Cross sell; smart sending; orele SMS; arhivarea ciornelor; **ștergerea DMARC-ului dublat**; bifa de la checkout.
- **Săptămâna 1 (~3 ore):** **Reaprovizionare 2026** (cu F1); **Client existent**; șablonul interimar; segmentele [API] (Claude); audiența newsletterelor (§5 de mai jos).
- **Săptămâna 2 (~4 ore):** Welcome cu 4 emailuri + DOI (după ce se termină sincronizarea) + pop-up-urile și formularele; fluxul de coș refăcut (varianta C); navigarea (cu P1); restul pașilor DNS.
- **Săptămâna 3 (~2 ore):** recâștigarea (2 emailuri); campania de restanțe (Claude); checkout-ul separat doar dacă F5 permite.
- **Luna 2:** client nou (3 emailuri, o singură variantă); VIP; stoc revenit; șablonul master complet.

**Câștigul:** ~10–11 ore de muncă în loc de ~18–23 în prima lună, pentru același scenariu de bază (~15 last-click). Fluxurile cu cel mai mare efect pornesc cu 2 săptămâni mai devreme.

---

## 5. Urgent, înainte de duminică, 18.10

1. **Audiența primului newsletter.** Segmentele noi apar cu 0 contacte până la prima evaluare, iar referințele între segmente au întârziere de un ciclu de procesare. Probabil nu vor fi gata sâmbătă. Între timp lista se mișcă: 2.299 de contacte cu email, +1.054 în 7 zile (`get_audience_evolution`), față de 1.276 de abonați în instantaneul din 15.10. **Fix:** dacă „E · Implicați 180 zile” nu are un număr evaluat până sâmbătă la 12:00, Claude pune pe newsletterul din 18.10 audiența „toți abonații email” cu două excluderi care există deja și nu așteaptă evaluarea: segmentul de sistem **„Activity - Inactive lifetime”** și segmentul **„Reactivare 2026-10 (de confirmat)”**. Abia apoi trece la audiența din §5.
2. **DOI nu se pornește în săptămâna 1** dacă sincronizarea nu e gata (F13).

---

## 6. Modificările exacte în SYSTEM.md

| § | Acum | Devine |
|---|---|---|
| Pe scurt 1 | „~12 pe lună” cu atingere | „~7 pe lună (14 în 61 de zile)” |
| Pe scurt 2, §2.4, §2.5 | 50 în ianuarie | textul de la §2.6 din această revizuire; rampa 10 / 15 / 20 (bază), scenariul optimist separat |
| Pe scurt 4, §3.1 | „maximum 3 în 7 zile … prin construcție” | țintă monitorizată (F3) + P1–P5 |
| Pe scurt 5, §10.1 | ziua 1 ~1–1,5 ore; reaprovizionarea în săpt. 3 | ziua 1 ~2 ore; reaprovizionarea și client existent în săpt. 1 (§4.3) |
| §2.2 | „între mediană și primii 10 %”; rate de click 20–40 % | coloane bază / optimist (§2.2 aici); conversii 14–20 % la fluxuri, 4–6,5 % la campanii |
| §2.3 | coloana „Azi, măsurat”, Welcome ~5 | Welcome ~2; o singură metrică pe coloană; reducere de 15 % pentru dublă numărare |
| §3.2 | tabel de prioritate | „Ce fluxuri respectă smart sending” + regula orelor (F2); reaprovizionarea cu smart sending pornit |
| §3.4, §9.2 | curățarea automată pornită, „dezabonare doar la cerere” | curățarea oprită sau excepția scrisă (F10) |
| §4.0 rândul 4.2, §4.2 | varianta B pe funnel | varianta C implicită; B doar cu filtru pe eveniment (F5); recipienți ~10–20 |
| §4.0 rândul 4.7, §4.7 | capping 14 zile, smart oprit | capping oprit, smart pornit, zilele marți, vineri, sâmbătă la 10:00, test cu 2 produse (F1) |
| §4.1 | E2 z2, E3 z5, E4 z9 | E2 z3, E3 z6, E4 z10 (P1); UTM în calea de redirect (F14) |
| §4.4 | filtrele „dacă editorul permite” | fără filtrul de coș → fluxul oprit în luna 1 (P1) |
| §4.5 | cascada pe 7 + 5 categorii; filtrul pe produs înainte de E4 | o singură variantă la E2 și la E3; fără filtru pe produs → fără E4; segmentele de sistem „First time buyers” / „Repeat buyers”, după prima pauză (F7) |
| §4.9 | 60 / 90 / 120 de zile, E1 la 10:00 | 75 / 120 de zile, 18:30, fără „Refă-ți rezervele” (P3) |
| §5 | excluderea reactivaților la 30 de zile; segmentate fără cumpărătorii din 7 zile | excluderea din ziua 0 (F12); fără cumpărătorii din 14 zile (P2); fără candidații sunset în săptămâna sunsetului (P4) |
| §6.1 | „E · Candidați sunset” cu `did_not_buy_in_last 180` | `segment is_not "X · Cumpărători 180 zile"` + `newsletter_activity received at_least_5_in_90_days` (F11) |
| §6.5 | „Reactivare 2026-10 · neconfirmați” = tag + nu în Implicați 90 | tag + `not_clicked any_sent_30_days` + `did_not_buy_in_last 30` (F12) |
| §6.6 | — | segmente noi [API]: „X · Au comandat în ultimele 14 zile”, „X · Cumpărători 180 zile” |
| §3.3, §6.6, §8.2 | „SMS · Acord sigur (pop-up)” | verificarea din F9 înainte de primul SMS; fără bifă separată → fără SMS |
| §8.1, §10.1 pasul 10 | DOI în săpt. 1 | DOI după sincronizare + testul pe surse (F13) |
| §8.2 | un pop-up, 14 zile, „niciodată pentru abonați” | două pop-up-uri pe dispozitiv; frecvența și audiența doar din opțiunile existente (F8); textul nou (§3.2) |
| §8.5 | „maximum 2 pe săptămână” | textul nou (§3.2) |
| §10.4 | 8 teste A/B | T1 și T4, cumulate pe 8 săptămâni (F16) |

---

## Surse

- theMarketer KB: [coș abandonat](https://themarketer.com/resources/knowledge-base/how-to-create-an-automated-cart-abandonment-series) · [reaprovizionare](https://themarketer.com/resources/knowledge-base/how-to-set-up-automated-replenishment-emails) · [welcome](https://themarketer.com/resources/knowledge-base/how-to-create-an-automated-welcome-series) · [smart sending](https://themarketer.com/resources/knowledge-base/what-is-themarketer-smart-sending) · [oboseala abonaților](https://themarketer.com/resources/knowledge-base/subscriber-fatigue) · [coduri de reducere](https://themarketer.com/resources/knowledge-base/how-to-add-discount-codes-to-your-emails) · [recomandări](https://themarketer.com/resources/knowledge-base/personalized-product-grid-recommendation) · [pop-up](https://themarketer.com/resources/knowledge-base/how-to-create-a-popup-form) · [formular embedded](https://themarketer.com/resources/knowledge-base/how-to-create-an-embedded-form) · [landing pages](https://themarketer.com/resources/knowledge-base/how-to-create-and-edit-landing-pages) · [curățarea abonaților](https://themarketer.com/resources/knowledge-base/cleaning-up-subscribers) · [orele de liniște SMS](https://themarketer.com/resources/knowledge-base/how-to-edit-sms-quiet-hours) · [integrarea Shopify](https://themarketer.com/integrations/shopify) · [funcționalități](https://themarketer.com/features/marketing-automation) · [indexul KB](https://themarketer.com/resources/knowledge-base)
- Benchmark: [Klaviyo, abandoned cart benchmarks (click pe tip de flux)](https://www.klaviyo.com/blog/abandoned-cart-benchmarks) · Klaviyo 2024, rata medie de comandă la coș 3,33 % (citată pe aceeași pagină a blogului)
- Linkurile de reducere Shopify și UTM-ul (nedocumentat oficial, de testat): [Shopify Community, UTM pierdut la redirect](https://community.shopify.dev/t/passing-utms-using-storefront-api-and-graphql/1562) · [Sherocommerce, UTM în Shopify](https://sherocommerce.com/blogs/insights/shopify-utm-tracking-standards)
- Contul, live, 15.10.2026: `get_audience_options(kind="segment_conditions")`, `list_segments`, `get_integration_health`, `analyze_audience`, `get_audience_evolution`, `get_audience_history`, `get_audience_breakdown`
- Intern: `audit_automations.md` §2–§5, `audit_audience.md` §2, `audit_campaigns.md` §2, `audit_catalog.md`, `sync_report.md`, `review_work/funnel.py`
