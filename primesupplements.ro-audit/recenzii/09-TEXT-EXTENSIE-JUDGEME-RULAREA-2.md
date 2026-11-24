# Judge.me – textul pentru extensia Chrome, rularea 2 (24.11.2026)

Fluxul E1 + E2 e aprobat de Marius pe 16.11 (`02-FLUX-CERERE-RECENZIE.md`). Rularea 1 s-a oprit fără modificări, pentru că Chrome era pe tot ecranul 4K (`07-CONFIGURARE-FLUX-EXTENSIE-2026-11-16.md`). Cererile Judge.me sunt **deja pornite**, deci orice salvare se aplică imediat. De aceea extensia notează întâi tot ce există, ca să se poată reveni.

**Înainte:** în Chrome apeși „Restore Down” (fereastra pe ~jumătate de ecran), apoi deschizi Shopify Admin → Aplicații → Judge.me.

```text
Lucrezi în Shopify Admin, magazinul primesupplements1.myshopify.com, în aplicația Judge.me (Aplicații → Judge.me). Fereastra Chrome e pe jumătate de ecran; dacă textul din capturi e prea mic, mărește zoom-ul paginii la 125 %. Nu intra în checkout, nu plasa comenzi, nu schimba planul Judge.me și nu umbla la nimic din afara Judge.me.

PASUL 1 – NOTEAZĂ TOT CE EXISTĂ (fără nicio modificare)
Mergi la Requests / Review requests (cererile de recenzie prin e-mail) și scrie în raport, exact:
a) la câte zile după expediere (fulfillment) sau livrare pleacă prima cerere;
b) dacă există memento (reminder), câte și la câte zile;
c) dacă e pornită cererea de poză (picture/photo reminder);
d) dacă e pornită cererea pentru toate produsele din comandă (request review for other products in order);
e) dacă e pornită cererea de recenzie la magazin (store review) după cea de produs;
f) dacă există o limită pe client (de exemplu „o cerere la X zile pentru același client”);
g) subiectul și tot textul e-mailului de cerere și al memento-ului, copiate integral (sunt rezerva pentru revenire);
h) expeditorul (nume și adresă) și dacă editorul acceptă HTML propriu sau doar logo, culori și texte;
i) setarea cuponului de recenzie (procent, pentru ce note).
Nu salva nimic la pasul 1.

PASUL 2 – SETEAZĂ FLUXUL APROBAT
1. Prima cerere (E1): 10 zile după expediere (fulfillment).
2. Un singur memento (E2): 7 zile după E1, doar dacă clientul nu a lăsat recenzie. Dacă există al doilea memento, oprește-l.
3. Cererea de poză (picture reminder): OPRITĂ.
4. Cererea pentru toate produsele din comandă: PORNITĂ.
5. Cererea de recenzie la magazin după cea de produs: rămâne OPRITĂ.
6. Limita pe client: dacă există setarea, cel mult o cerere la 30 de zile pentru același client.
7. Cuponul de 12 %: NU îl schimba.
8. Expeditor: „Prime Supplements”, contact@primesupplements.ro (dacă se poate seta).

E1 – subiect: Cum ți se pare {{produsul}}?
(folosește variabila Judge.me pentru numele produsului; dacă nu există, subiectul e: „Ne spui cum ți se pare comanda?”)
E1 – preheader (dacă există câmpul): Spune-ne pe scurt ce crezi: aroma, gustul, cum îl folosești.
E1 – text:
Salut, {{prenume}}!
Comanda ta a ajuns de câteva zile. Cum ți se pare? Apasă pe o stea și scrie câteva cuvinte: ce aromă ai ales, cum se amestecă, cum îl folosești. Asta îi ajută cel mai mult pe ceilalți clienți.
Dacă ai și o poză cu produsul, o poți adăuga în recenzie.
După recenzie primești un cod de 12 % pentru următoarea comandă, indiferent de notă, valabil 30 de zile.
Ai o problemă cu comanda? Scrie-ne la contact@primesupplements.ro și o rezolvăm direct.
Mulțumim, Echipa Prime Supplements
Butonul: SCRIE RECENZIA

E2 – subiect: Ne-ar ajuta părerea ta despre {{produsul}}
E2 – preheader: Durează două minute. După acest e-mail nu te mai rugăm.
E2 – text:
Salut, {{prenume}}! Acum o săptămână te-am rugat să ne spui cum ți se pare {{produsul}}. Dacă ai două minute, apasă pe o stea și scrie câteva cuvinte: aroma, gustul, cum îl folosești. După recenzie primești codul de 12 % pentru următoarea comandă, indiferent de notă. Este ultimul e-mail în care te rugăm asta.
Mulțumim, Echipa Prime Supplements
Butonul: SCRIE RECENZIA

Înlocuiește {{produsul}} și {{prenume}} cu variabilele reale din editorul Judge.me. Dacă prenumele lipsește, salutul trebuie să rămână „Salut!” (fără virgulă și spațiu gol).
Design, dacă editorul permite doar setări: antet negru cu logo-ul alb Prime, butonul și stelele roșii #ec1e24, textul #222222, fontul Poppins (sau Arial dacă nu există). Nu scrie „5 stele”, nu promite efecte de sănătate și nu adăuga alte reduceri.

PASUL 3 – SALVEAZĂ ȘI TRIMITE TESTELE
Salvează. Trimite imediat „Send test email” pentru E1 și pentru E2 la marius.chera@yahoo.com și la adelina.chera@gmail.com. Nu trimite la nicio altă adresă.

PASUL 4 – RAPORT
Raportează: tot ce ai notat la pasul 1 (inclusiv textele vechi integral), ce ai schimbat la pasul 2 (înainte → după), ce nu ai putut seta și de ce, și ora la care au plecat testele.
Dacă ceva nu se poate salva sau arată greșit, revino la textele și setările notate la pasul 1 și raportează.
