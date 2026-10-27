# Text pentru extensie – partea 3: tot ce se poate fixa din admin (27.10.2026)

Ce NU face extensia (le face Marius): planul Shopify + cardul, contractul Netopia, aplicația de facturare, domeniul, reprezentantul legal (date personale), scoaterea parolei. Articolele din blog le pune Claude separat (sunt prea lungi pentru un mesaj).

Textele legale de mai jos sunt un punct de pornire rezonabil, nu consultanță juridică: de citit de Marius și, ideal, de contabil/avocat înainte de lansare.

---

Ești în magazinul meu Shopify „Chera Protocol” (bp66vh-bq.myshopify.com), NU în Prime. Verifică asta în colțul din stânga-sus înainte de orice. Tema „Chera Protocol” e publicată, magazinul are parolă. Fă pașii de mai jos în ordine. După fiecare pas scrie-mi într-un rând ce ai făcut. Dacă ceva nu se potrivește, oprește-te și întreabă-mă. Nu introduce date de card, nu scoate parola magazinului, nu instala aplicații, nu schimba tema publicată.

PASUL 1 – Întrebări pentru mine, pe toate deodată, înainte de orice altceva. Scrie-mi:
„Am nevoie de: (1) numărul de la Registrul Comerțului (J…) al Chera Coaching SRL; (2) codul poștal pentru Calea Dumbrăvii 137A, Sibiu; (3) adresa de e-mail a firmei pentru clienți; (4) adresa sălii din Sibiu pentru posing live; (5) zilele și orele libere pentru următoarele 4 săptămâni, separat pentru: posing live Sibiu, posing online, consultație video; (6) confirmi variantele programului personalizat: Antrenament 150 lei, Antrenament + dietă 250 lei, Antrenament + dietă + suplimente 400 lei?”
Așteaptă răspunsul meu. Pentru (2), dacă îți spun să cauți tu, caută pe posta-romana.ro (Coduri poștale) și arată-mi rezultatul înainte să-l folosești.

PASUL 2 – Settings → Store details: la adresa magazinului completează codul poștal de la pasul 1. Salvează. NU completa reprezentantul legal (îl pun eu).

PASUL 3 – Curățenie: Online Store → Pages → pagina cu handle „contact-1” → Delete (e duplicatul paginii Contact). Apoi Products → Collections → „Home page”: scoate din ea produsele de coaching (nu șterge colecția). Salvează.

PASUL 4 – Settings → Custom data → Customers → Add definition, de 4 ori (namespace și cheie exact așa):
- Nume „Expiră abonamentul”, namespace and key: chera.expira, tip Date.
- „Pachet”, chera.pachet, tip Single line text.
- „Link plan”, chera.plan_url, tip URL.
- „Profil neuro”, chera.profil, tip Single line text.
Apoi Settings → Custom data → Products → Add definition:
- „Durata (minute)”, chera.durata, tip Integer.
- „Etichetă sus”, chera.tag, tip Single line text.
- „Notă preț”, chera.price_note, tip Single line text.
- „Întrebare sesiune”, chera.intrebare, tip Single line text.
Salvează fiecare.

PASUL 5 – Products → Add product: „Posing live · Sibiu”. Preț 400. Debifează „This is a physical product”. Descriere: „Lucrăm față în față la pozele obligatorii, tranziții și prezentare, pe categoria ta. 30 de minute, în Sibiu.” Handle (Search engine listing → URL): posing-live-sibiu. Status Active. Theme template: „sesiune”. Metafield „Durata (minute)” = 30, „Etichetă sus” = „Live · Sibiu”.
Variante: Add options → opțiunea „Data și ora”, valorile = intervalele pentru posing live, câte unul la 30 de minute, exact în formatul AAAA-LL-ZZ OO:MM (ex. 2026-11-06 18:00). Arată-mi lista înainte să salvezi. La FIECARE variantă: „Track quantity” bifat, cantitate 1, „Continue selling when out of stock” debifat, preț 400. Salvează.

PASUL 6 – La fel, „Posing online”: preț 250, handle posing-online, template „sesiune”, tag „online”, „Durata” 30, „Etichetă sus” = „Online”. Descriere: „Aceeași sesiune de posing, pe video call WhatsApp. Te sun eu la ora rezervată. 30 de minute.” Variante „Data și ora” = intervalele pentru posing online, fiecare stoc 1 urmărit, fără vânzare peste stoc, preț 250. Salvează.

PASUL 7 – La fel, „Consultație video”: preț 400, handle consultatie-video, template „sesiune”, tag „online”, „Durata” 30, „Etichetă sus” = „Online”, „Întrebare sesiune” = „Ce vrei să discutăm? Scrie-mi întrebările dinainte.” Descriere: „Întrebări și răspunsuri pe ce te frământă: peak week, suplimente, plan, nelămuriri. Pe video call WhatsApp, 30 de minute.” Variante „Data și ora” = intervalele pentru consultație, fiecare stoc 1, fără vânzare peste stoc, preț 400. Salvează.

PASUL 8 – Products → Add product: „Programul meu personalizat”. Handle program-personalizat. Template „program”. Debifează „physical product”. Colecția „Programe”. Descriere: „Completezi un formular scurt: înălțime, greutate, scop, experiența de sală și poze. Plătești, iar eu îți construiesc programul pe datele tale: antrenament, dietă și suplimente.” Variante, opțiunea „Program”, cu prețurile confirmate la pasul 1. Stocul NU se urmărește. Status Active. Salvează.

PASUL 9 – Online Store → Pages → „Evaluare gratuită”: Theme template = „evaluare”. Salvează.

PASUL 10 – Online Store → Themes → Customize (tema publicată Chera Protocol) → Theme settings → Chera Protocol:
- „Adresa pentru sesiunile live din Sibiu” = adresa de la pasul 1.
- „CUI, J, sediul” = „CUI 49666258 · [J-ul de la pasul 1] · sediul: Calea Dumbrăvii 137A, Sc. A, Et. 1, Ap. 2, Sibiu”.
- WhatsApp rămâne 40757911908.
Salvează.

PASUL 11 – În Customize, pe pagina principală: secțiunea „Sesiuni individuale” → la cele 3 carduri alege produsele (Posing live · Sibiu, Posing online, Consultație video). Secțiunea „Trei uși”: ușa A = „Pregătire de concurs · prima lună”, ușa B = „Chera Protocol Coaching · 1 lună”, ușa C = „Programul meu personalizat”. Salvează.

PASUL 12 – Paginile legale. Online Store → Pages, la fiecare pagină înlocuiește „În curând.” cu textul de mai jos (în editor, ca text normal, cu titlurile ca Heading 2). În texte, înlocuiește [J], [EMAIL] și [CODPOȘTAL] cu datele de la pasul 1. Salvează fiecare.

— Pagina „Termeni și condiții” —
Despre noi
Site-ul este operat de CHERA COACHING SRL, CUI 49666258, [J], cu sediul în Calea Dumbrăvii 137A, Sc. A, Et. 1, Ap. 2, Sibiu, [CODPOȘTAL]. Contact: [EMAIL].
Ce oferim
Coaching online de antrenament și nutriție (Chera Protocol Coaching), pregătire de concurs, programe personalizate de antrenament, dietă și suplimente, sesiuni individuale de posing (live în Sibiu sau pe video call) și consultații video. Toate serviciile sunt livrate personal de Marius Chera.
Contul și comanda
Pentru a cumpăra ai nevoie de un cont pe site. Comanda se consideră încheiată la confirmarea plății. Prețurile sunt afișate în lei și sunt prețurile finale de plată. Plata se face online, cu cardul, prin procesatorul de plăți al magazinului.
Accesul la servicii
Accesul la planul tău, la check-in și la comunicarea pe WhatsApp este activ pe durata pachetului plătit. Cu 7, 3 și 1 zile înainte de expirare primești o notificare. După expirare, accesul se închide automat după 3 zile, iar la reînnoire continuăm de unde am rămas.
Sesiuni individuale
Locul la o sesiune este rezervat în momentul plății. Pentru sesiunile online te sun pe WhatsApp la ora rezervată, la numărul indicat de tine. Dacă trebuie să muți o sesiune, scrie-mi pe WhatsApp cât mai devreme; o reprogramăm în limita intervalelor libere.
Pregătirea de concurs
Prima lună se plătește la începere și include planul inițial complet. În video call-ul de după prima plată stabilim competițiile și plata pentru sezon.
Garanția de 12 săptămâni
Pentru Chera Protocol Coaching: dacă după 12 săptămâni de coaching, cu toate check-in-urile trimise la timp, nu există o schimbare vizibilă în poze, continuăm gratuit până apare. Garanția nu se aplică dacă check-in-urile lipsesc sau planul nu a fost urmat.
Sănătate
Programele sunt de antrenament și nutriție și nu înlocuiesc consultul medical. Prin comandă declari că ești apt pentru efort fizic. Dacă ai o afecțiune sau urmezi un tratament, consultă medicul înainte de a începe și înainte de a lua suplimente.
Proprietate intelectuală
Planurile și materialele primite sunt pentru uz personal. Nu pot fi distribuite sau revândute.
Litigii
Se aplică legea română. Pentru reclamații ne scrii la [EMAIL]. Poți apela și la ANPC (anpc.ro) sau la platforma europeană de soluționare online a litigiilor (ec.europa.eu/consumers/odr).

— Pagina „Politica de confidențialitate” —
Cine prelucrează datele
CHERA COACHING SRL, CUI 49666258, Calea Dumbrăvii 137A, Sc. A, Et. 1, Ap. 2, Sibiu. Contact pentru date personale: [EMAIL].
Ce date colectăm
Datele contului și ale comenzii (nume, e-mail, telefon, adresă de facturare); datele pe care ni le dai pentru plan: vârstă, sex, înălțime, greutate, scop, experiența de antrenament, alimentație, suplimente, accidentări declarate și pozele de progres; răspunsurile la evaluarea gratuită; mesajele schimbate pe WhatsApp.
De ce
Pentru a-ți construi și ajusta planul, pentru a comunica cu tine, pentru facturare și obligații legale. Temeiul este contractul încheiat cu tine, consimțământul tău (pentru evaluare, poze și WhatsApp) și obligațiile legale (pentru facturi).
Cui le transmitem
Doar furnizorilor necesari: Shopify (platforma magazinului), procesatorul de plăți, aplicația de facturare, Google (formularul de evaluare) și WhatsApp/Meta (comunicare). Pozele și datele de progres le vede doar Marius Chera. Nu publicăm nicio poză fără acordul tău scris.
Cât le păstrăm
Cât timp ești client și încă 12 luni după; facturile, atât cât cere legea.
Drepturile tale
Acces, rectificare, ștergere, restricționare, portabilitate, opoziție și retragerea consimțământului, oricând, scriindu-ne la [EMAIL]. Poți depune plângere la ANSPDCP (dataprotection.ro).
Cookie-uri
Site-ul folosește cookie-urile necesare funcționării magazinului.

— Pagina „Politica de retur” —
Dreptul de retragere
Ai dreptul să renunți la o comandă în 14 zile de la plată, fără motiv, scriindu-ne la [EMAIL]. Îți returnăm banii în cel mult 14 zile, pe același card.
Când nu se mai aplică
Conform OUG 34/2014, dreptul de retragere nu se mai aplică dacă serviciul a fost prestat integral cu acordul tău, sau dacă furnizarea unui conținut digital (programul personalizat) a început cu acordul tău expres. La coaching, dacă renunți după ce am început, nu se rambursează luna în curs. Sesiunile individuale efectuate nu se rambursează; o sesiune neefectuată se poate reprograma.
Cum ceri
Scrie-ne la [EMAIL] cu numărul comenzii.

PASUL 13 – Spune-mi la final: ce ai făcut, câte intervale are fiecare sesiune, ce nu ai putut face și de ce.
