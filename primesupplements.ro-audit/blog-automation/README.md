# Automatizarea blogului: 2 articole pe zi

**Ce face:** în fiecare dimineață la 06:57 (ora României) pornește automat o sesiune Claude care scrie **2 articole educative** despre produsele din top 15 cele mai vândute și le **programează în Shopify** pentru **09:00** și **18:00**. Asta înseamnă 60–62 de articole pe lună. Automatizarea lucrează cu o zi înainte, deci ai mereu în Admin (Magazin online → Postări pe blog) articolele zilei următoare, vizibile ca „programate”, înainte să apară pe site.

**Fișiere:**
- `calendar-luna-1.json`: cele 62 de articole din prima lună (14 octombrie – 13 noiembrie 2026): data, ora, titlul, cuvântul-cheie, produsele, colecția și etichetele. Poți schimba sau șterge orice rând; automatizarea citește calendarul la fiecare rulare. După ce calendarul se termină, automatizarea alege singură subiectele, după aceleași reguli: rotație prin top 15 (cifre din ultimele 180 de zile, aromele unui produs contează ca o singură linie) și fără subiecte care se suprapun cu articolele existente.
- `GHID-REDACTIONAL.md`: regulile după care scrie (SEO, linkuri interne, structura, șablonul HTML, mențiunile de sănătate permise de UE, verificările dinainte de publicare).

**Top 15 (vânzări, ultimele 180 de zile, pe linii de produs):** Prime Whey (2 kg și 1 kg), Cremă de orez Prime Creamy Rice, Coenzima Q10, Creatină Creapure, Liver Protect, Magneziu bisglicinat, Frutilu (băuturi instant), Pure Isolate, EAA, Omega-3, Cluster Insulin Bomb, Creatină monohidrat 300 g, Vitamina C 1000, Vitamina D3+K2, Batoane proteice.

**Ce conține fiecare articol:** răspuns direct la întrebare la început, cuprins, 5–7 secțiuni, caseta produsului, întrebări frecvente, linkuri interne verificate (produs de 2–3 ori, colecția, 2–3 articole existente, pagina autorului), titlu și meta descriere SEO, imagine cu text alternativ, autorul Marius Chera, mențiunea standard pentru suplimente și etichetele `hub:`/`intent:` care previn canibalizarea.

**Cum o controlezi:**
- **Pauză sau oprire:** claude.ai/code → Routines → „Blog Prime Supplements 2 articole pe zi” → dezactivează (sau șterge).
- **Un articol nu-ți place:** în Shopify Admin îl editezi sau îl ștergi înainte de ora programată. Dacă îl ștergi, automatizarea îl recreează a doua zi; ca să nu mai apară, șterge și rândul lui din calendar.
- **Alt subiect:** schimbă rândul din `calendar-luna-1.json` (titlu, cuvânt-cheie, produs) și fă commit pe branch-ul `claude/install-claude-seo-ttv3h6` (sau pe `main`, dacă branch-ul a fost unit).

**De știut:**
- Fiecare rulare consumă din limita de utilizare a contului tău Claude. Dacă limita e atinsă, rularea din ziua respectivă nu se face, iar automatizarea recuperează a doua zi (maximum 4 articole odată).
- Google nu răsplătește volumul, ci utilitatea. De aceea fiecare articol răspunde la o întrebare nouă și trimite spre produs doar unde are sens. Recomand o verificare scurtă a articolelor programate, de 1–2 ori pe săptămână, mai ales a celor despre sănătate.
- Rezultatele în Google apar în timp: de obicei 1–3 luni pentru articolele noi.
