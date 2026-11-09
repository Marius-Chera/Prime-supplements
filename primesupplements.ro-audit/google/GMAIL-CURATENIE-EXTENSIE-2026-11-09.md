# Gmail – curățenie de spațiu cu extensia Claude in Chrome (text de lipit)

Scris la 09.11.2026, la cererea proprietarului („să elibereze spațiu, să șteargă 70% din e-mailurile nefolositoare”).
De ce extensia: Gmail din browserul aplicației nu stă logat stabil și operațiunile pe mii de mesaje se fac mai sigur în Chrome-ul proprietarului.
Principiu: nimic nu se șterge definitiv de către Claude. Totul merge în Coșul de gunoi (se recuperează 30 de zile); golirea coșului o face Marius, după ce vede raportul.

## Textul de lipit în extensie (Claude in Chrome)

```
Lucrează în Gmail, în tab-ul deschis acum (contul în care sunt logat – spune-mi la început care e adresa din colțul dreapta sus, ca să confirm).

Scop: eliberez spațiu. Vreau să mut în Coșul de gunoi cam 70% din e-mailuri – tot ce e newsletter, promoții, notificări automate și mesaje vechi fără valoare. NU ștergi nimic definitiv și NU golești Coșul de gunoi: eu îl golesc după ce îmi dai raportul.

Reguli stricte – NU atingi mesajele care conțin oricare dintre cuvintele: factură, factura, invoice, proformă, chitanță, bon, contract, ANAF, SPV, e-Factura, bancă, BT, ING, Revolut, Netopia, PayU, Shopify (comenzi/payout), AWB, Fan Courier, Sameday, Cargus, GLS, DPD, curier, retur, garanție, reclamație, aviz, furnizor, ofertă, comandă nr., mostre, GDPR, ANPC, notar, avocat, asigurare, Google Ads factură, Meta ads receipt. Nu atingi nimic cu stea, nimic marcat Important, nimic din Trimise, Ciorne sau etichete create manual, și nimic din ultimele 30 de zile.

Metodă: lucrezi NUMAI prin căutări în bara Gmail, în ordinea de mai jos. La fiecare pas: pune căutarea, așteaptă rezultatele, notează câte conversații sunt (dacă Gmail arată „1–50 din multe”, apasă pe numărul estimat ca să afle totalul), bifează caseta „Selectează tot”, apoi linkul „Selectează toate conversațiile care corespund acestei căutări”, apoi apasă pe pictograma Coș de gunoi. Confirmă dialogul „Ștergerea în masă” dacă apare. Așteaptă să dispară bannerul de confirmare înainte de următorul pas. Dacă un pas are peste 10.000 de rezultate, repetă-l până rămâne 0.

Pasul 0 (doar citire): deschide https://one.google.com/storage și notează cât spațiu e folosit din total și cât e Gmail / Drive / Foto. Apoi în Gmail notează totalul din Toate mesajele.

Pasul 1 – promoții vechi: category:promotions older_than:60d -is:starred -is:important -label:^trimise
Pasul 2 – rețele sociale: category:social older_than:30d
Pasul 3 – forumuri/grupuri: category:forums older_than:90d
Pasul 4 – notificări automate vechi: category:updates older_than:180d -is:starred -is:important -{factura factură invoice chitanță contract ANAF SPV AWB retur garanție}
Pasul 5 – expeditori no-reply mai vechi de 6 luni: (from:noreply OR from:no-reply OR from:notification OR from:notifications OR from:newsletter OR from:news OR from:info@ OR from:marketing OR from:hello@) older_than:180d -is:starred -is:important -{factura factură invoice chitanță contract AWB comandă}
Pasul 6 – dezabonabile (au link „Dezabonare”): has:unsubscribe older_than:90d -is:starred -is:important
Pasul 7 – mesaje mari vechi: larger:10M older_than:1y -is:starred -is:important – la acest pas NU muți la coș automat: fă lista (expeditor, subiect, dată, mărime) și întreabă-mă pe care le pot pierde.
Pasul 8 – Spam: deschide Spam și apasă „Șterge definitiv toate mesajele spam acum” (aici e singura ștergere definitivă permisă, e doar spam).

După pașii 1–6 și 8, deschide Coșul de gunoi și numără câte conversații sunt. NU apăsa „Golește Coșul de gunoi acum”.

Raport final, pe scurt: adresa contului; spațiul înainte (Pasul 0); numărul total de mesaje înainte; pentru fiecare pas căutarea folosită și câte conversații au mers la coș; lista de la Pasul 7 cu întrebarea ta; câte sunt acum în Coșul de gunoi; și ce procent din total am curățat. Dacă procentul e sub 70%, propune-mi 2–3 căutări în plus (cu expeditorii cei mai frecvenți pe care i-ai văzut în listă, de exemplu „from:x older_than:1y”) și așteaptă acordul meu înainte să le rulezi.

Dacă apare orice dialog despre parolă, verificare în doi pași sau „Ștergere definitivă” în afara pasului 8, oprește-te și spune-mi.
```

## După ce rulează
- Marius verifică Coșul de gunoi (sortat după expeditor), apoi apasă el „Golește Coșul de gunoi acum”. Spațiul se eliberează abia după golire (poate dura până la 24 h să se actualizeze).
- Dacă spațiul e plin mai ales de Drive sau Google Foto (Pasul 0 arată asta), curățenia din Gmail nu rezolvă problema; se face pasul următor în Drive (fișiere mari: https://drive.google.com/drive/quota).
- Raportul lipit de Marius se salvează aici, în acest fișier, secțiunea „Rezultat”.

## Rezultat
(se completează după rulare)
