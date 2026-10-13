# Automatizarea blogului: 2 articole pe zi

**Ce face:** în fiecare dimineață la 06:57 (ora României) pornește automat o sesiune Claude care scrie **2 articole educative** despre produsele din top 15 cele mai vândute și le **programează în Shopify** pentru **09:00** și **18:00**. Asta înseamnă 60–62 de articole pe lună. Automatizarea lucrează cu o zi înainte, deci ai mereu în Admin (Magazin online → Postări pe blog) articolele zilei următoare, vizibile ca „programate”, înainte să apară pe site.

**Fișiere:**
- `calendar-luna-1.json`: 144 de articole, între 14 octombrie și 24 decembrie 2026 (data, ora, titlul, cuvântul-cheie, produsele, colecția, etichetele, tipul `principal` sau `acoperire`). Din 25 decembrie automatizarea alege singură subiectele pentru cele 15 produse principale, după aceleași reguli.
- `GHID-REDACTIONAL.md`: regulile după care scrie (SEO, citare în motoarele AI, conversie, linkuri interne, șablonul HTML, mențiunile de sănătate permise de UE, verificările dinainte de publicare).
- `PROMPT-ROUTINE.md`: instrucțiunile automatizării.
- **Copiile folosite de automatizare sunt în Shopify → Conținut → Fișiere** (`blog-automatizare-ghid-redactional.txt` și `blog-automatizare-calendar.txt`), pentru că sesiunile automate nu au acces la repository. Ca să schimbi un subiect, modifici calendarul și urci în Fișiere o versiune nouă cu același nume; automatizarea o folosește pe cea mai nouă.

**Cele 15 produse principale (alese de proprietar, 13.10.2026):** Prime Whey (2 kg, 1 kg, Go), Cremă de orez Prime Creamy Rice, Creatină Creapure, Creatină monohidrat 300 g, Magneziu bisglicinat, Pure Isolate, EAA, Omega-3, Cluster Insulin Bomb, Vitamina C 1000, Vitamina D3+K2, Batoane proteice, L-glutamină Recovery Glutamin, Picolinat de crom și NAC (NAC completează lista până la 15, fiind următorul cel mai vândut supliment). Fiecare primește 4–9 articole în calendar. **Celelalte 34 de suplimente active** (inclusiv Coenzima Q10, Frutilu, pre-workout-uri, arzătoare, tincturi, colagen, spirulină, unturi de nuci, ovăz) primesc cel puțin un articol până pe 24 decembrie. Liver Protect e nelistat în magazin, deci e sărit; dacă îl reactivezi, intră automat în rotație. Hainele și accesoriile nu apar.

**Ce conține fiecare articol:** răspuns direct la întrebare la început, cuprins, 5–7 secțiuni, caseta produsului, întrebări frecvente, linkuri interne verificate (produs de 2–3 ori, colecția, 2–3 articole existente, pagina autorului), titlu și meta descriere SEO, imagine principală generată cu AI (produsul Prime real într-o scenă potrivită, cu Google Gemini; cheia e salvată ca Network secret în mediul cloud „Prime supplements”) cu text alternativ, autorul Marius Chera, mențiunea standard pentru suplimente și etichetele `hub:`/`intent:` care previn canibalizarea.

**Cum o controlezi:**
- **Pauză sau oprire:** claude.ai/code → Routines → „Blog Prime Supplements 2 articole pe zi” → dezactivează (sau șterge).
- **Un articol nu-ți place:** în Shopify Admin îl editezi sau îl ștergi înainte de ora programată. Dacă îl ștergi, automatizarea îl recreează a doua zi; ca să nu mai apară, șterge și rândul lui din calendar.
- **Alt subiect:** schimbă rândul din `calendar-luna-1.json` (titlu, cuvânt-cheie, produs) și fă commit pe branch-ul `claude/install-claude-seo-ttv3h6` (sau pe `main`, dacă branch-ul a fost unit).

**De știut:**
- Fiecare rulare consumă din limita de utilizare a contului tău Claude. Dacă limita e atinsă, rularea din ziua respectivă nu se face, iar automatizarea recuperează a doua zi (maximum 4 articole odată).
- Google nu răsplătește volumul, ci utilitatea. De aceea fiecare articol răspunde la o întrebare nouă și trimite spre produs doar unde are sens. Recomand o verificare scurtă a articolelor programate, de 1–2 ori pe săptămână, mai ales a celor despre sănătate.
- Rezultatele în Google apar în timp: de obicei 1–3 luni pentru articolele noi.

**Rezervă:** o a doua rutină, pe un model mai ieftin (13:57 și 21:57), verifică în fiecare zi dacă articolele de azi și de mâine există și le creează pe cele lipsă, ca să nu rămână nicio zi fără postare. Detalii în `PROMPT-ROUTINE.md`.
