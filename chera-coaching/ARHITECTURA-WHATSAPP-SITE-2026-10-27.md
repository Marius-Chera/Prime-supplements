# Chera Protocol – arhitectura WhatsApp + zona clientului, totul pe site

Data: 27.10.2026. Context: Marius are deja ~100 de clienți activi, antrenează singur, vrea o implementare profesionistă în care totul (plată, acces, planul, check-in-urile, conversațiile) are loc pe site, iar el răspunde dintr-un singur loc, doar clienților. Înlocuiește §5 din PLAN-SITE-COACHING ca variantă definitivă.

## 1. Principiul
Un singur număr de WhatsApp al firmei, pe **WhatsApp Business API**, legat de **Shopify** (unde se plătește) și de un **inbox profesional** (unde răspunde Marius). Clientul nu primește numărul decât după plată, deci în inbox există doar clienți. Pe site, clientul are **zona lui** (contul de client), cu tot ce ține de el. Marius lucrează din inbox (web, în panoul Shopify sau în propriul link, plus aplicația de telefon), cu automatizări care fac tot ce nu cere judecata lui.

## 2. Componentele (ce, cine, cât)
| Componentă | Alegerea | Rol | Cost lunar |
|---|---|---|---|
| Magazin + plăți + conturi de client | Shopify Basic + Netopia | comenzi, pachete, reînnoiri, conturi de client, zona clientului | ~30 $ + comision |
| Număr WhatsApp | SIM/eSIM nou pe Chera Coaching SRL (sau număr virtual de la furnizor) | numărul oficial de coaching; NU se instalează în aplicația WhatsApp | ~5 € |
| WhatsApp Business API | Meta (prin furnizor) | mesaje, șabloane, 24 h window | ~20–40 €/lună la 100 de clienți (șabloane) |
| Inbox + automatizări | **Respond.io** (prima opțiune) sau Wati Pro (a doua) | conversații, etichete, vederi, reguli, aplicație mobilă, integrare Shopify, widget pe site | ~80–160 $ (Respond.io, după numărul de contacte active) / ~99 $ (Wati Pro) |
| Livrarea planurilor | Shopify Digital Downloads (gratuit) sau Sky Pilot (video în flux, ~15 $) | planul, ghidurile, video | 0–15 $ |
| Check-in săptămânal | formular propriu în zona clientului (temă) → Google Sheet + webhook în inbox | poze, cântar, 5 întrebări, în 2 minute | 0 |
| Evaluarea | pagina `evaluare` din temă + receptorul Google | lead-uri cu profil neuro | 0 |
De ce Respond.io și nu Wati: integrare Shopify mai bună (comenzile lângă conversație), vederi personalizate în inbox, reguli de automatizare fără limite de plan, widget de chat pe site care intră în același inbox, aplicație mobilă bună. Wati rămâne alternativa mai ieftină dacă „vede doar conversațiile asignate” nu mai e necesar (Marius e singur) – și nu mai e.

## 3. Fluxurile (pas cu pas)
### 3.1 Client nou
1. Plătește pe site (coaching 990 lei/lună sau 2.500 lei/3 luni; concurs 1.500 lei prima lună). Telefonul e obligatoriu la checkout, cu bifa de WhatsApp.
2. Shopify → Respond.io (integrare nativă): se creează contactul cu numele, telefonul, e-mailul, comanda, eticheta pachetului (`coaching-1l`, `coaching-3l`, `concurs`) și data de expirare (câmp personalizat).
3. În 60 de secunde primește pe WhatsApp **șablonul de bun venit** (aprobat de Meta): „Salut, Andrei! Sunt Marius. Mulțumesc pentru [pachet]. Aici discutăm tot. Răspunde cu «Start» și spune-mi, în două rânduri, obiectivul tău.” → conversația se deschide și intră în vederea „Clienți noi”.
4. Pe pagina de mulțumire și în e-mail: „Îți scriu eu pe WhatsApp în câteva minute” + butonul wa.me (dacă vrea să scrie el primul) + linkul spre zona clientului.
5. Dacă a făcut evaluarea înainte: profilul `2A-S` e deja pe contact (din receptorul Google → webhook Respond.io); Marius vede profilul lângă conversație și scrie planul în 48 h.
6. Pentru concurs: șablonul trimite și linkul de programare a video call-ului de 15 minute (Calendly gratuit sau Google Calendar appointment), cu condiția plății deja îndeplinite.

### 3.2 Săptămâna clientului (automat)
- **Luni 08:00:** șablon „Check-in: trimite-mi aici 3 poze (față, lateral, spate), greutatea de azi și cum ai dormit. Sau completează formularul: [link].” Răspunsul (poze în WhatsApp) intră în vederea „Check-in-uri de văzut”. Formularul web scrie în Sheet și trimite un rezumat în aceeași conversație.
- **Miercuri 18:00, dacă nu a trimis:** memento scurt.
- Marius ajustează și răspunde din inbox; fiecare conversație are lângă ea: pachetul, expirarea, profilul neuro, ultimele comenzi, notițe.
- **Cu 5 zile înainte de expirare:** șablon de reînnoire cu linkul de plată (Shopify draft order sau produsul). **La expirare + 3 zile fără plată:** eticheta `expirat`, conversația iese din vederile active, intră în „De recuperat”.
- **La 8 săptămâni:** șablon cu linkul de re-test al evaluării (profil neuro).

### 3.3 Cine scrie fără să fi plătit
- Numărul nu e public, dar se întâmplă (număr dat mai departe, fost client). Regulă: contact fără etichetă de pachet activ → răspuns automat: „Salut! Pentru coaching, pornește de aici: [link evaluare]. După plată ne auzim aici.” → eticheta `lead`, conversația închisă, nu apare în vederile lui Marius. Foștii clienți (`expirat`) primesc varianta cu linkul de reînnoire.

### 3.4 Ziua lui Marius (inbox)
Vederile (filtre salvate) în ordinea în care le deschide:
1. **De răspuns azi** – conversații deschise cu ultimul mesaj de la client, mai vechi de 2 ore (SLA 24 h, ținta 2 h în zilele lucrătoare).
2. **Check-in-uri de văzut** – mesaje cu poze din ziua de check-in.
3. **Clienți noi** – fără plan trimis încă (eticheta `plan-trimis` lipsește).
4. **Expiră în 7 zile** – pentru un mesaj personal înainte de memento-ul automat.
5. **Concurs** – sportivii de scenă, prioritate în peak week (eticheta `peak`).
Răspunsuri rapide (snippets) pentru ce se repetă: structura planului, cum se fac pozele, ce înseamnă „profil 2B”, lista de analize, ce suplimente și când. Aplicația mobilă Respond.io pentru răspunsuri de pe telefon; notificări doar pentru vederile 1 și 5.

## 4. Zona clientului pe site (contul Shopify, extins în temă)
Pagina `/account` (conturi de client noi, autentificare cu cod pe e-mail) primește o secțiune „Chera Protocol” construită în temă (Liquid, fără aplicație), vizibilă doar dacă clientul are o comandă plătită cu un produs de coaching:
- **Pachetul activ** și data expirării (din metafield-ul clientului, setat de Shopify Flow la plată).
- **Planul meu**: antrenamentul și nutriția (PDF/video din Digital Downloads sau Sky Pilot), actualizate de Marius prin re-upload (clientul vede mereu ultima versiune).
- **Check-in săptămânal**: formular (3 poze, greutate, somn, energie, aderență 1–10, observații) → Sheet + webhook în conversația lui WhatsApp. Istoricul ultimelor check-in-uri (greutate, grafic simplu).
- **Profilul meu neuro**: rezultatul evaluării + butonul de re-test.
- **Scrie-mi pe WhatsApp**: butonul cu numărul firmei, cu text precompletat (nume + pachet). Opțional, widget-ul Respond.io de chat pe site, afișat doar aici, care intră în același inbox.
- **Reînnoiește**: butonul de plată pentru pachetul următor.
- **Analize și documente** (concurs): lista de analize de făcut, formularul de acord pentru poze.
Tot ce e aici e „pe site”; WhatsApp rămâne canalul de conversație, pentru că acolo trăiesc clienții.

## 5. Migrarea celor ~100 de clienți existenți (3 săptămâni)
1. **Săptămâna 1:** număr nou pe API, Meta Business verificat, Respond.io conectat la Shopify, șabloanele aprobate. Marius continuă pe numărul vechi.
2. **Săptămâna 2:** fiecare client existent primește, de la numărul vechi (manual, din WhatsApp Business, cu un text scurt) și pe e-mail: „De luni îmi scrii pe numărul nou [X], tot eu răspund. Contul tău pe site: [link], parola vine pe e-mail.” Conturile lor de client se creează în Shopify prin import CSV (nume, telefon, e-mail, pachet, expirare), cu etichete; comenzile vechi nu se recreează. Contactele apar automat în Respond.io.
3. **Săptămâna 3:** numărul vechi primește mesaj automat de absență cu numărul nou; după 30 de zile se închide pentru coaching. Istoricul vechi rămâne în telefon (export de chat pentru cei de concurs, dacă e nevoie).
Niciun client nu plătește din nou pentru luna în curs: expirarea lor se setează manual la data reală.

## 6. Ce rămâne cu tine, ce fac eu
- **Marius (o singură dată):** SIM-ul, actele pentru Meta Business (CUI, certificat, site live), contul Respond.io (card), Calendly dacă vrea call-urile programate automat, aprobarea textelor șabloanelor, lista celor 100 de clienți (CSV: nume, telefon, e-mail, pachet, expirare).
- **Claude (din aplicația de pe calculator):** zona clientului în temă (Liquid + formularul de check-in), Shopify Flow (etichete, metafield-uri la plată), setările Respond.io (vederi, reguli, șabloane, integrarea Shopify, widget), importul clienților, testele cap-coadă (comandă de test → bun venit → check-in → reînnoire), documentația.
- **Limite oneste:** șabloanele trebuie aprobate de Meta (ore–2 zile); mesajele automate către client costă per mesaj (sub 40 €/lună la 100 de clienți); migrarea cere ca fiecare client să scrie o dată pe numărul nou (deschide fereastra de 24 h gratuită); rezultatele check-in-urilor (poze) stau la Respond.io – DPA semnat, acces doar Marius.

## 7. Calendar
| Săpt. | Ce se întâmplă |
|---|---|
| 1 | Magazin Shopify creat; SIM; Meta Business trimis la verificare; Respond.io creat; șabloanele trimise |
| 2 | Zona clientului în temă; Shopify Flow; regulile și vederile în inbox; test cap-coadă |
| 3 | Importul celor 100 de clienți; anunțul; primele check-in-uri automate |
| 4 | Numărul vechi pe absență; ajustări după prima săptămână reală |

## 8. Opțiunea „fără SaaS” (mai târziu)
Dacă vrei să nu depinzi de Respond.io: un „Chera Protocol Hub” propriu pe app.mariuschera.ro (WhatsApp Cloud API direct de la Meta, inbox propriu, zona clientului, check-in-uri, toate într-o aplicație a ta). Costă doar găzduirea (~20 $/lună) + mesajele Meta, dar cere 3–4 săptămâni de construcție și întreținere continuă. Are sens după ce procesul e stabil cu Respond.io, nu înainte.

## 9. Accesul condiționat de plată (cerința proprietarului, 27.10)
Regula: cont obligatoriu ca să plătești; cât ești client plătitor și logat, ai acces la WhatsApp și la zona ta; când nu mai plătești, accesul dispare automat, după câteva notificări.
1. **Contul e obligatoriu la checkout** (Setări → Conturi de client → „Obligatoriu”). Clientul se autentifică cu cod pe e-mail; comanda se leagă de cont.
2. **La plată**, Shopify Flow scrie pe client două câmpuri: `chera.pachet` (coaching-1l / coaching-3l / concurs) și `chera.expira` (data plății + 30 sau 90 de zile; pentru concurs, data stabilită în call). Aceleași valori merg în inbox (eticheta și câmpul de expirare al contactului).
3. **Pe site**, secțiunea Chera Protocol din cont (planul, check-in-ul, butonul WhatsApp, documentele) se afișează doar dacă `chera.expira` ≥ azi. Altfel, clientul vede un singur lucru: „Abonamentul tău a expirat pe [data]. Reînnoiește ca să continuăm.” + butonul de plată. (Shopify nu șterge conturi automat și nu e nevoie: accesul la conținut e condiționat de dată, ceea ce e exact efectul cerut.)
4. **Pe WhatsApp**, la expirare contactul primește eticheta `expirat`: mesajele lui noi primesc răspuns automat cu linkul de reînnoire și conversația se închide; nu mai apare în vederile lui Marius până plătește din nou. La plată, eticheta dispare și conversația se redeschide cu istoricul intact.
5. **Notificările înainte** (automat, WhatsApp + e-mail): cu 7 zile înainte („mai ai o săptămână, reînnoiește aici”), cu 3 zile, cu 1 zi, și în ziua expirării („accesul se închide azi; dacă reînnoiești, continuăm de unde am rămas”). Pentru plata cu reînnoire automată (dacă Netopia o suportă), notificarea cu 3 zile înainte e „plata se face automat pe [data]; dacă vrei să oprești, scrie-mi”.
6. **Perioadă de grație**: 3 zile după expirare accesul rămâne (ca să nu pierdem oameni din cauza unei plăți întârziate), apoi se închide. Setabilă.
7. **Excepții manuale**: Marius poate prelungi `chera.expira` din panoul Shopify (ex. pauză medicală) și totul se reactivează instant, inclusiv pe WhatsApp.
