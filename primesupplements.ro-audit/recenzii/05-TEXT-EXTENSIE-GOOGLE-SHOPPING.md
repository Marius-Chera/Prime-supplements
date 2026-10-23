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
