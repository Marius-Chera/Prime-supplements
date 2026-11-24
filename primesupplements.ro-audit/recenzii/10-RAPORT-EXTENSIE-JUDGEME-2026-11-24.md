# Judge.me – raportul extensiei, rularea 2 (24.11.2026)

Raportul a fost lipit de Marius în chat. Extensia a rulat textul din `09-TEXT-EXTENSIE-JUDGEME-RULAREA-2.md`.

## Pasul 1 – setările de dinainte (rezervă)
- **Prima cerere:**
  - comenzile din România: 10 zile după Fulfilled;
  - comenzile internaționale: 14 zile;
  - comenzile POS: 7 zile.
- **Memento:** niciunul.
- **Cererea de poză (Media reminder):** oprită. Formularul are totuși „Ask for review images”.
- **Celelalte produse din comandă:** pornit. Maximum 3 produse pe comandă, întâi cele cu cele mai puține recenzii, **câte un e-mail separat pentru fiecare produs, la 5 zile distanță**.
- **Store review după cea de produs:** oprit. „Store Review Fallback” e pornit (când produsul nu mai există sau comanda nu are produs).
- **Limita pe client:** „Limit by frequency”, cererea se sare dacă s-a trimis una în ultimele **130 de zile**.
- **Alte setări:** trimite și la cumpărarea repetată a aceluiași produs; nu pe fiecare variantă; orice zi, la ora implicită; trimite și clienților dezabonați de la marketingul Shopify.
- **Șablonul activ:**
  - subiect: „⭐ {{ buyer_first_name }}, ce părere ai despre {{ product_title }}”;
  - blocuri: logo, titlul „Spune-ne ce crezi!”, „Salut {{ buyer_first_name }}… acum {{ n_days_ago }} zile…”, caseta „12% – Lasă o recenzie sinceră și primești un cod de 12% reducere la următoarea comandă, indiferent de nota acordată”, formularul clasic (stele #EC1E24, buton „Trimite Recenzie Verificată”), „Mulțumim, Echipa {{ shop_name }}”, dezabonarea;
  - fundal #F5F5F5, text #525252, Segoe UI, 600 px.
- **Expeditorul:** „Prime Supplements” <requests+primesupplements.ro@judge.me>. Adresa contact@ cere configurarea domeniului („Custom sender email”, oprit).
- **Cuponul:** prefix RECENZIE-, 12 % la orice notă, doar cumpărători verificați, unul pe comandă, valabil 30 de zile, cu memento cu 5 zile înainte de expirare.

## Pasul 2 – făcut până la oprire
- Comenzile din România: **un memento la 7 zile** (înainte nu exista), plus bifa „Send reminders to customers who haven't opened…”. Salvat.
- Prima cerere a rămas la 10 zile.
- Neschimbate: cererea de poză oprită, celelalte produse pornite, store review oprit, cuponul de 12 %.
- **Oprit la jumătate:** Chrome nu mai dădea capturi de ecran. Nefăcute încă:
  - limita 130 → 30 de zile;
  - textele E1 și E2;
  - testele.
  - Până atunci memento-ul folosește textul actual; primul ar pleca cel mai devreme la ~17 zile după expediere.

## Ce a semnalat extensia
1. Expeditorul contact@ cere configurarea domeniului în afara Judge.me.
2. Antetul negru cu logo alb ar avea nevoie de un logo alb (există `afiliati/tools/logo-white.png`).
3. „Salut!” fără prenume: Judge.me pune „Customer”. Extensia încearcă o condiție în text.

## Observația lui Claude
Setarea multi-produs trimite **câte un e-mail separat pentru fiecare produs** (până la 3, la 5 zile distanță). Cu memento-ul nou, un client cu 3 produse ar putea primi până la ~6 e-mailuri. Asta contrazice decizia lui Marius din 16.11 („prea stresăm clienții”, maximum 2 e-mailuri). Recomandarea: un singur e-mail cu toate produsele, dacă setarea există; altfel maximum 1 produs pe comandă.

## Rularea 2b (24.11, după-amiaza) – iar oprită, fără modificări noi
- Capturile Chrome cad: fereastra a ajuns la peste 2800 px lățime, la zoom mic. Trebuie pusă pe jumătate de ecran, la zoom 100 %, și lăsată în față.
- **Aflat:**
  - opțiunea „Send a single email with requests for multiple products” există și se pornește;
  - memento-ul e un singur e-mail cu toate produsele nerecenzate și pleacă la 7 zile după ce s-au trimis toate cererile, deci cel mult 2 e-mailuri pe comandă;
  - bifa „și celor care n-au deschis” e necesară, altfel memento-ul se sare;
  - `{{ buyer_first_name }}` gol apare ca „Customer”.
- **Decizia lui Claude** pentru E2: salutul devine „Salut!”, fără prenume, ca să nu apară „Salut Customer”. E1 rămâne neschimbat.

## Rularea 3 (24.11, ~16:40) – varianta 2 aplicată (Marius a ales-o la recomandarea lui Claude)
- **Memento pentru România:** niciunul → unul la 7 zile, trimis și celor care n-au deschis primul e-mail.
- **Limita pe client:** 130 → 30 de zile.
- **Comenzile cu mai multe produse:** din câte un e-mail pe produs, la 5 zile distanță, într-**un singur e-mail** (maximum 3 produse, întâi cele cu cele mai puține recenzii).
- **E1 („Email template”):**
  - un singur e-mail;
  - formularul cu stele (Form Classic) înlocuit cu blocul **Multi Classic** (poza și numele fiecărui produs + butonul „Scrie o recenzie”; stelele apar pe pagina de recenzie);
  - adăugat rândul „Dacă ai și o poză cu produsul, o poți adăuga în recenzie.”;
  - restul neschimbat (logo, titlu, salut, caseta 12 %, semnătură, subsol).
- **E2 („Email template Copy”, Reminder 1, doar România):**
  - subiectul „Ne-ar ajuta părerea ta despre comanda ta”;
  - preview „Durează două minute. După acest e-mail nu te mai rugăm.”;
  - textul începe cu „Salut!”, urmat de Multi Classic, caseta 12 % și semnătură.
- **Testele:** „Send sample” trimite doar la adresa magazinului (contact@), fără să poți alege destinatarul. A plecat un test E2 (posibil două) pe contact@ la ~16:38; E1 nu a fost trimis.
- **Rămase la propunerea extensiei:**
  - în E2, „apasă pe stele” → „apasă pe butonul de sub produs”;
  - titlul blocului „Recenzează alte produse” → „Recenzează produsele tale”;
  - subiectul E1 conține {{ product_title }} (un singur produs);
  - Multi Classic e neverificat pe o comandă reală cu 3 produse.
