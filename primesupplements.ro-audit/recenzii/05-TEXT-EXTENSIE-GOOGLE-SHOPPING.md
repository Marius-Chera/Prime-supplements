# Text pentru extensie: feedul Judge.me → Google Shopping (23.10.2026)

Panoul Judge.me nu se încarcă în browserul folosit de aplicație (rămâne alb), așa că setarea o face extensia Chrome. Proprietarul a cerut textul pentru extensie, fără pași manuali. Rezultatul raportului se salvează aici, ca `05b-RAPORT-EXTENSIE-GOOGLE-SHOPPING.md`.

```text
Lucrezi în Shopify Admin, magazinul primesupplements1.myshopify.com → Apps → Judge.me Reviews. Sarcina: pornești trimiterea recenziilor de produs către Google Shopping (feedul „API Product Ratings”). Nu deschide și nu modifica Fluxsales sau Primesupplements App. Nu intra în checkout pe site. Nu schimba nimic altceva în Judge.me: nici cupoanele (cuponul de 12 % rămâne exact cum e), nici e-mailurile, nici widgeturile.

1. Mergi la Settings → Google, SEO and AI → Google Shopping.
   - Dacă pagina cere upgrade la planul Awesome sau o plată, OPREȘTE-TE și raportează. Nu accepta nicio plată sau probă.
   - Notează ce banner apare sus (niciunul / albastru / galben) și textul lui.
2. Deschide „Review eligibility summary”. Notează: numărul de recenzii eligibile, numărul de recenzii neeligibile, defalcarea pe motive și data „Last updated”. Dacă sunt sub 50 eligibile, OPREȘTE-TE și raportează.
3. Mergi la Reviews → Product reviews. Pune filtrul pe status Hidden / Archived / Pending (unul câte unul). Notează câte recenzii sunt în fiecare și, pentru fiecare recenzie de 1–2 stele dintre ele, produsul și primele 10 cuvinte (fără numele clientului). Nu modifica, nu ascunde și nu șterge nimic.
4. Înapoi la Settings → Google, SEO and AI → Google Shopping: apasă „Set up your feed”, bifează „I confirm I've submitted my product feed”, apoi „Confirm”.
5. Apasă „Edit your feed” și setează exact:
   - Add GTIN in the feed: BIFAT
   - Add MPN in the feed: NEBIFAT
   - Choose your store link format: https://
   - Reviewer name format: Shorten last name (John S.)
   - Include review photos: BIFAT
   - Include reviews for out-of-store products: NEBIFAT
   - Include reviews containing personal information: NEBIFAT
   - Apply profanity filter to reviews: BIFAT
   - Include product groups reviews: lasă cum este
   - Include reviews containing specific keywords regarding store experience: lasă cum este
   Apasă „Save”. Fă o captură de ecran cu setările salvate.
6. Derulează la baza paginii. Dacă la pasul 3 ai găsit recenzii ascunse, arhivate sau în așteptare cu 1–2 stele care par spam, injurii sau date personale, NU trimite feedul: oprește-te și raportează lista. Altfel apasă „Submit feed” și confirmă în fereastra care apare cu „Submit feed”.
7. Notează mesajul afișat după trimitere și starea feedului de pe pagină. Fă o captură de ecran.
8. Raportează: planul Judge.me, bannerul de la pasul 1, cifrele de la pașii 2 și 3, setările de la pasul 5, dacă feedul a fost trimis și mesajul de la pasul 7.
```

## Rularea 1 (23.10): oprită, nimic modificat
- Aflat: **Judge.me e pe planul Awesome**, deci nu cere upgrade pentru Google Shopping.
- Extensia s-a blocat după ce a deschis Settings: capturile de ecran, căutarea și citirea textului au eșuat de mai multe ori. Este același blocaj ca în sesiunea din aplicație: panoul Judge.me îngheață pagina Shopify Admin.
- Varianta 2 de mai jos lucrează într-un tab nou, pe adresa directă a aplicației, cu așteptări mai lungi și fără capturi de ecran ale întregii pagini.

## Varianta 2 (după blocaj)
```text
Lucrezi în Shopify Admin, magazinul primesupplements1.myshopify.com, aplicația Judge.me Reviews. Nu deschide și nu modifica Fluxsales sau Primesupplements App. Nu intra în checkout pe site. Nu schimba nimic altceva în Judge.me (cuponul de 12 % rămâne exact cum e, e-mailurile și widgeturile la fel). Planul e deja Awesome.

Reguli ca să nu se blocheze pagina: închide tab-ul vechi cu Judge.me și deschide un tab NOU. După fiecare încărcare de pagină așteaptă 10–15 secunde. Folosește citirea textului și căutarea pe pagină, nu capturi de ecran ale întregii pagini (doar capturi mici, pe zonă, unde se cer). Dacă pagina nu răspunde, reîncarcă tab-ul o dată (F5), așteaptă 15 secunde și reia pasul curent. Dacă se blochează de 3 ori la rând, oprește-te și raportează unde ai rămas.

1. În tab-ul nou deschide https://admin.shopify.com/store/primesupplements1/apps/judgeme și așteaptă 15 secunde. Din meniul Judge.me mergi la Settings → Google, SEO and AI → Google Shopping. Notează ce banner apare sus (niciunul / albastru / galben) și textul lui.
2. Deschide „Review eligibility summary”. Notează câte recenzii sunt eligibile și câte nu, defalcarea pe motive și data „Last updated”. Dacă sunt sub 50 eligibile, OPREȘTE-TE și raportează.
3. Apasă „Set up your feed”, bifează „I confirm I've submitted my product feed”, apoi „Confirm”.
4. Apasă „Edit your feed” și setează exact:
   - Add GTIN in the feed: BIFAT
   - Add MPN in the feed: NEBIFAT
   - Choose your store link format: https://
   - Reviewer name format: Shorten last name (John S.)
   - Include review photos: BIFAT
   - Include reviews for out-of-store products: NEBIFAT
   - Include reviews containing personal information: NEBIFAT
   - Apply profanity filter to reviews: BIFAT
   - Include product groups reviews și Include reviews containing specific keywords regarding store experience: lasă cum sunt
   Apasă „Save”. Fă o captură mică doar cu fereastra setărilor.
5. Mergi la Reviews → Product reviews și filtrează pe rând statusurile Hidden, Archived și Pending. Notează câte recenzii are fiecare. Pentru recenziile de 1–2 stele dintre ele, notează produsul și primele 10 cuvinte (fără numele clientului). Nu modifica, nu ascunde și nu șterge nimic.
6. Înapoi la Settings → Google, SEO and AI → Google Shopping. Dacă la pasul 5 ai găsit recenzii de 1–2 stele care par spam, injurii sau date personale, NU trimite feedul: oprește-te și raportează lista. Altfel derulează la baza paginii, apasă „Submit feed” și confirmă cu „Submit feed” în fereastra care apare.
7. Raportează: bannerul de la pasul 1, cifrele de la pașii 2 și 5, setările salvate la pasul 4, dacă feedul a fost trimis și mesajul afișat după trimitere.
```

## Raportul rulării 2 (23.10): oprită înainte de trimitere, nimic modificat
- **Feedul Google Shopping e deja live din 10.04.2026** („Your Google Product Review Feed is live”), cu setările din aprilie. Se sincronizează automat. Butonul „Set up your feed” nu există; în „Edit your feed” singurul buton e „Submit feed” (fără „Save”). Extensia a închis fereastra cu Cancel.
- Niciun banner albastru sau galben. Sus apare doar anunțul Judge.me despre noii termeni și DPA, valabili din 16.11.2026.
- Eligibilitate (actualizată pe 18.10): **324 de recenzii eligibile** (1★ 9, 2★ 3, 3★ 4, 4★ 7, 5★ 301) și 126 neeligibile (125 de magazin, 1 importată).
- Setările actuale ale feedului:
  - deja cum trebuie: GTIN bifat, MPN nebifat, „Shorten last name”, pozele din recenzii bifat, filtrul de injurii bifat;
  - **diferite de recomandare**: linkuri **http://** (nu https://), „out-of-store products” **bifat**, „personal information” **bifat** (datele personale sunt înlocuite cu ****, nu excluse).
- Recenzii la produse care nu se văd pe site, dar ajung oricum în feed:
  - **Hidden: 3**, toate de 1★ și reale: Instant Oat Cream 800 g (gust), Fiber portocală roșie 500 g (de două ori: eficiență, disconfort digestiv);
  - **Archived: 2**: 1★ la Creatina micronizată 300 g, care e de fapt întrebarea „Are certificare GMP sau NSF?”, cu o adresă de e-mail în câmpul de nume (aceeași din seo/creatina/own_audit.md, 12.10), și 2★ la Pure Isolate (gust), reală;
  - Pending 0, Spam 0.

**Concluzie corectată:** notele Judge.me AJUNG în Google Shopping din aprilie, prin contul Merchant Center al Judge.me. De aceea programul nu apare în Merchant Center-ul nostru. Lipsa noastră din caruselele Google („proteina whey”, „creatina creapure”) ține de poziția produselor, nu de stele.

## Varianta 3: doar cele 3 setări ale feedului live
Recenzia arhivată cu e-mail în nume: feedul e live din aprilie, iar recenzia exista cel târziu din 12.10, deci a fost trimisă deja. Recenziile trimise nu se pot scoate din Google, iar ștergerea ei din Judge.me nu schimbă nimic acolo; de aceea nu o atingem. Debifarea „personal information” face ca, de acum încolo, recenziile în care Judge.me găsește date personale să fie excluse din feed, nu doar mascate. Recenziile ascunse și arhivate sunt reale (gust, digestie). Le lăsăm, nu le putem scoate din feed.

```text
Lucrezi în Shopify Admin, magazinul primesupplements1.myshopify.com, aplicația Judge.me Reviews. Nu deschide și nu modifica Fluxsales sau Primesupplements App. Nu intra în checkout pe site. Nu schimba nimic altceva în Judge.me: nici cupoanele (12 % rămâne), nici e-mailurile, nici widgeturile, nici recenziile (nu ascunde, nu șterge, nu edita nicio recenzie).

Reguli ca să nu se blocheze pagina: tab NOU, așteaptă 10–15 secunde după fiecare încărcare, folosește citirea textului și căutarea pe pagină, fără capturi ale întregii pagini; dacă nu răspunde, F5 o dată și reia pasul; după 3 blocaje la rând oprește-te și raportează.

Feedul Google Shopping e deja live (din 10.04.2026). Sarcina: corectezi 3 setări ale lui.
1. Deschide https://admin.shopify.com/store/primesupplements1/apps/judgeme, așteaptă 15 secunde, apoi Settings → Google, SEO and AI → Google Shopping → „Edit your feed”.
2. Schimbă DOAR aceste 3 setări:
   - Choose your store link format: https://
   - Include reviews for out-of-store products: NEBIFAT
   - Include reviews containing personal information: NEBIFAT
   Verifică că celelalte au rămas: Add GTIN BIFAT, Add MPN NEBIFAT, Reviewer name format „Shorten last name”, Include review photos BIFAT, Apply profanity filter BIFAT, iar product groups și store-experience keywords cum erau.
3. Fă o captură mică doar cu fereastra setărilor, apoi apasă „Submit feed” (e butonul de salvare al ferestrei) și confirmă, dacă se cere.
4. Redeschide „Edit your feed” și verifică dacă cele 3 setări au rămas salvate, apoi închide cu Cancel.
5. Raportează: mesajul afișat după „Submit feed”, starea feedului de pe pagină („live” sau altceva) și dacă setările au rămas salvate la pasul 4.
```

## Raportul rulării 3 (23.10): FĂCUT
- Cele 3 setări au fost schimbate și salvate cu „Submit feed” (notificarea „Feed updated”). Verificat la redeschidere: link format **https://**, „out-of-store products” **nebifat**, „personal information” **nebifat**.
- Restul a rămas neschimbat: GTIN bifat, MPN nebifat, „Shorten last name”, pozele din recenzii și filtrul de injurii bifate, product groups nebifat, store-experience keywords bifat.
- Starea: „Your Google Product Review Feed is live”, „Feed settings last updated Oct 23, 2026”, comutatorul pe On. Nimic altceva modificat în Judge.me.
- De verificat după ~10 zile (~02.11): stelele pe Google Shopping la Prime Whey 2 kg, Creapure® și Creamy Rice.
