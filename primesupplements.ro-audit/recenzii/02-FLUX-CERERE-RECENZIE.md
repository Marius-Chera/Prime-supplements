# Fluxul de cerere de recenzie (Judge.me) – propunere, 23.10.2026

**Stare: propunere. Nimic pornit sau modificat.** Pornirea cere acordul proprietarului și testul la marius.chera@yahoo.com și adelina.chera@gmail.com.

Ce era deja decis (nu se reia): recenziile rămân **doar în Judge.me**, iar modulul de recenzii theMarketer rămâne oprit (SYSTEM.md §4.8, LEAN 16.10). Regula de acolo: o singură cerere la 10–14 zile după expediere, plus cel mult un memento, fără promisiuni de efect. Designul e cel comun, aprobat pe 23.10 (`email-marketing/design/DESIGN-EMAIL-PRIME.md`). Cuponul de 12 % e decizia D10, încă deschisă.

## 1. De ce
- Cererile de acum aduc puține recenzii verificate: 7 în 12–23.10, la ~18 comenzi pe zi, și doar 2 recenzii cu poză în aceeași perioadă (`01-JUDGEME-VERIFICARE-2026-10-23.md`).
- Recenziile la produs, cu text concret (aroma, cum se amestecă, cum se folosește), sunt cele citite de Google (stelele pe produs) și de AI. Cu ele poate răspunde ChatGPT la „ce cremă de orez îmi recomanzi”, unde azi nu ne citează.

## 2. Fluxul
| # | Când | Cui | Ce |
|---|---|---|---|
| E1 · Cererea | **10 zile după expediere** (fulfillment). Cargus livrează în 1–3 zile lucrătoare, deci clientul a folosit produsul ~7 zile | Fiecare comandă expediată | Toate produsele din comandă, fiecare cu stelele lui; un singur buton „Scrie recenzia” |
| E2 · Memento | **7 zile după E1**, doar dacă n-a lăsat nicio recenzie | Aceeași comandă | Un singur memento, scurt. Niciun al doilea memento |
| E3 · Poza | **2 zile după o recenzie fără poză** (funcția Judge.me „picture reminder”) | Doar cei care au scris deja o recenzie fără poză | O singură rugăminte: adaugă o poză la recenzia ta |

Reguli comune:
- **Cuponul de 12 % rămâne** (decizia proprietarului, 23.10; evaluare ~15.11). E-mailul îl spune deschis: codul vine după recenzie, indiferent de notă, valabil 30 de zile. Altă recompensă nu promitem. La Trustpilot nu se oferă nimic.
- Fără „lasă-ne 5 stele”, fără filtrarea clienților mulțumiți. Cerem părerea sinceră de la toți (cerință și pentru Trustpilot și Google).
- Fără mențiuni de sănătate. Întrebările ajutătoare sunt despre gust, amestecare și folosire.
- Expeditor: „Prime Supplements” <contact@primesupplements.ro>. Semnătura: „Echipa Prime Supplements”.
- Dezabonarea de la cererile de recenzie e vizibilă în subsol.
- **Setări Judge.me de pornit:** cerere pentru toate produsele din comandă (`request_review_other_products_in_order`, azi oprită); cererea de poză. **De lăsat oprit:** cererea de recenzie la magazin după cea de produs (o mutăm pe Trustpilot, vezi 03).

## 3. Textele

### E1 · Cererea (10 zile după expediere)
**Subiect (3 variante, A/B dacă Judge.me permite):**
1. Cum ți se pare [produsul]?
2. [Prenume], ne spui cum ți se pare comanda?
3. Două minute pentru o recenzie sinceră?

**Preheader:** Spune-ne pe scurt ce crezi: aroma, gustul, cum îl folosești.

**Conținut:** HTML complet în `cerere-recenzie-e1.html`: antet negru cu logo, poza din ședința Mihai Diaconu (cremă de orez), eticheta „Părerea ta contează”, titlul „Cum ți se pare?”, cardul produsului cu stelele și butonul roșu „Scrie recenzia”, „Ce îi ajută pe ceilalți”, rândul pentru probleme cu comanda și subsolul negru.

Rândul „Ai o problemă cu comanda? Scrie-ne…” rămâne intenționat. Problemele de livrare ajung la noi, nu într-o recenzie de o stea pentru produs, fără să filtrăm cine poate scrie recenzia.

### E2 · Memento (7 zile după E1)
**Subiect:** Ne-ar ajuta părerea ta despre [produsul]
**Preheader:** Durează două minute. După acest e-mail nu te mai rugăm.
**Text:**
> Salut, [Prenume]! Acum o săptămână te-am rugat să ne spui cum ți se pare [produsul]. Dacă ai două minute, apasă pe o stea și scrie câteva cuvinte: aroma, gustul, cum îl folosești. După recenzie primești codul de 12 % pentru următoarea comandă, indiferent de notă. Este ultimul e-mail în care te rugăm asta.
> Mulțumim, Echipa Prime Supplements

Buton: **SCRIE RECENZIA**. Același antet, card și subsol ca la E1, fără poza mare (e-mail mai scurt).

### E3 · Poza (2 zile după o recenzie fără poză)
**Subiect:** Mulțumim pentru recenzie! Adaugi și o poză?
**Preheader:** O poză cu produsul îi ajută pe ceilalți să vadă ce primesc.
**Text:**
> Mulțumim pentru recenzia la [produsul]! Dacă ai o poză cu el (la sală, în bucătărie sau pe birou), o poți adăuga la recenzie din telefon. Pozele reale îi ajută pe ceilalți mai mult decât orice descriere. Nu e obligatoriu și nu-ți mai scriem despre asta.
> Echipa Prime Supplements

Buton: **ADAUGĂ O POZĂ**.

### Textele din formular (completează E10 din 16.10)
- „Upload Pictures” → „Adaugă poze”
- „Trimite Recenzie Verificată” → „Trimite recenzia”
- „Conținutul recenziei”, cu indiciul: „Ce aromă ai ales, cum se amestecă, cum îl folosești?”

## 4. Cum se construiește în Judge.me
Depinde de ce permite editorul. Se confirmă cu raportul extensiei din `01-JUDGEME-VERIFICARE-2026-10-23.md` §3.
- **Dacă Judge.me acceptă HTML propriu** pentru e-mailuri: se lipește `cerere-recenzie-e1.html`, iar marcajele `[[...]]` se înlocuiesc cu variabilele Judge.me (formularul de stele, linkul de recenzie, prenumele, dezabonarea). Comentariul de la început nu se lipește.
- **Dacă editorul permite doar logo, culori și texte:** logo-ul alb pe antet negru, culoarea butonului și a stelelor #ec1e24, textul #222, fontul Poppins (sau Arial, dacă nu există) și textele de mai sus. Rezultatul e cât mai aproape de design; diferențele le arăt proprietarului în test, înainte de pornire.
- Lucrul în Judge.me se face cu fereastra Brave în față (altfel panoul rămâne alb) sau prin extensia Chrome.

## 5. Decizii pentru proprietar (înainte de pornire)
1. **D10, cuponul de 12 %: rămâne pornit** (decizia proprietarului, 23.10). Evaluare la ~15.11, după 30 de zile de la pornire: recenzii verificate pe lună înainte și după 15.10, procentul cu poză, câte coduri de 12 % s-au folosit la comenzi și valoarea lor. Apoi proprietarul decide.
2. **Aprobarea fluxului:** E1 la 10 zile, E2 la 7 zile după, E3 pentru poză, cu textele de mai sus.
3. **Aprobarea designului** după testul trimis la Marius și Adelina.

## 6. Test și pornire
1. Se configurează fluxul în Judge.me fără să fie pornit.
2. Se trimite testul („Send test email”) la **marius.chera@yahoo.com** și **adelina.chera@gmail.com**, pentru E1, E2 și E3.
3. Verificăm pe telefon (87 % din clienți sunt pe mobil): logo, stele, buton, diacritice, linkul de recenzie, dezabonarea.
4. Pornire doar după „da”-ul proprietarului; se trece în JURNAL.
5. **Măsurare la 30 de zile:** recenzii verificate pe lună (azi ~19, extrapolat din 7 în 11 zile), procentul cu poză (azi ~8 %), dezabonări din cereri. Ținta: 5–10 % din comenzi lasă recenzie.
