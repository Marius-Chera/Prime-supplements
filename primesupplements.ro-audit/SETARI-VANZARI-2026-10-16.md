# Setările pentru vânzări: primesupplements.ro (16.10.2026)

Planul tău de lucru după auditul din 16.10.2026. Fiecare constatare a fost verificată a doua oară, independent. Am păstrat doar ce s-a confirmat, cu corecturile aplicate. Cifrele vin din Shopify (Admin API și rapoarte), din site-ul public și din fișierele auditului. Documentul nu conține date ale clienților, doar numere.

Regulile tale, respectate peste tot: designul nu se schimbă (orice element vizibil este decizia ta), tema live nu se modifică direct, nu apar coduri de reducere noi (doar WELCOME5), fără Black Friday, doar mențiuni de sănătate autorizate în UE, nu ștergem date din magazin.

Azi nu am scris nimic în Shopify, theMarketer sau temă. Totul de mai jos se aplică după ce citești planul.

---

## 1. Răspunsul pe scurt

1. Cele mai multe vânzări se pierd azi din stoc. Patru produse care aduceau ~90 de linii de comandă pe lună sunt la 0, iar rupturile de la crema de orez din august și septembrie au costat ~70 de comenzi. Două arome de cremă de orez se termină în 3–8 zile.
2. A doua scurgere este checkout-ul. Din ~985 de sesiuni pe lună ajunse în checkout pleacă ~446. Nu există Apple Pay sau Google Pay în checkout, nici locker, iar taxa de 20 RON apare abia după ce clientul pune codul de reducere.
3. A treia: ~19% din sesiuni vin din reclame Meta care aproape nu cumpără. O singură campanie a adus 10.289 de sesiuni și 0 comenzi în 13 luni.
4. Site-ul în sine e bun: fără traficul Meta convertește 5,7%, iar pe mobil se încarcă repede (LCP 1,0 s). Dar adăugarea în coș a scăzut de la 14,5% în iunie la 10% acum, iar emailul aduce doar ~1% din comenzi.
5. Potențialul realist: +35–70 de comenzi pe lună în 2–3 luni (azi ~566), jumătate doar din stoc. Întâi închizi riscurile legale: prenumele clienților afișate public, prețurile tăiate permanente, bannerul de cookie-uri și mențiunile de sănătate.

---

## 2. Prioritățile, în ordine

Riscurile legale stau sus indiferent de comenzi. Restul e ordonat după comenzile în plus împărțite la efort.

| # | Ce | Cine | Efect | Efort |
|---|---|---|---|---|
| 1 | Pop Convert: prenumele clienților publice și contorul „X persoane se uită” (D1) | tu | risc legal | minute |
| 2 | Prețuri tăiate permanente, Omnibus (D2) | tu, apoi eu | risc legal | ore |
| 3 | Banner de cookie-uri fără „Refuz” și fără redeschidere (D3) | tu | risc legal | minute |
| 4 | theMarketer și pixelul SIMPROSYS pornesc fără acord (D4, E2) | tu, extensia | risc legal | minute |
| 5 | Mențiuni de sănătate în articole și butoanele „pentru slăbit” (A1, A2) | eu | risc legal | ore |
| 6 | Articole despre boli, magneziu 450 mg, certificări pe „Despre noi” (D5, D6, D7) | tu | risc legal | minute |
| 7 | Politici: email fără server, adresă incompletă, politici lipsă în checkout (A3, A4, E3, E4) | eu, extensia | risc legal | minute |
| 8 | Stocul: reaprovizionare azi și raport în fiecare luni (D13, A7) | tu, eu | +25–50 comenzi/lună | minute |
| 9 | Oprește campania Meta cu 0 comenzi (D14) | tu | +0–4 și buget economisit | minute |
| 10 | Taxa de livrare care apare după cod (D15) | tu, apoi eu | +1–3 | minute |
| 11 | Ora-limită de expediere afișată (D16) | tu, apoi eu | +1–4 | minute |
| 12 | Plăți: Apple Pay și Google Pay (D17, E6) | tu | +3–10 | minute / ore |
| 13 | Bifa de abonare la checkout și planul de email deja scris (E7, E8, E9) | extensia | +10–15 până în ianuarie | zile |
| 14 | Rândul cu livrare, plată și retur lângă buton (D20) | tu, apoi eu | +2–5 | ore |
| 15 | Confirmare pentru comenzile ramburs (D21) | tu | +2–4 livrate | ore |
| 16 | Livrare la locker prin Fluxsales (D22) | tu | +3–10 | zile |
| 17 | Fotografii la crema de orez și suplimente (D23) | tu, apoi eu | +2–4 | zile |

---

## 3. Ce e deja făcut

| Sarcina veche (sursa) | Starea azi | Dovada din 16.10 |
|---|---|---|
| Publicarea temei de test (OWNER-HANDOVER §2) | Făcut | Tema 193875083639 e tema live (rol MAIN) din 13.10, în jur de 16:30 UTC. Date structurate Product valide pe produse, `Content-Signal` în robots.txt, `noindex` pe /blogs/news/tagged/... |
| Embed-urile orfane Koala, BlogGenAuto, PageFly, YouTube Gallery (§2 pasul 1, §3 punctul 1) | Făcut | Cele 4 aplicații nu mai sunt instalate. 0 apariții „Failed to render app block” pe homepage și pe produs. |
| Piața Ungaria (punctul 3) | Parțial | Piața e DRAFT, iar `?country=HU` arată prețurile din RO (180 / 100 RON). Rămâne zona de livrare HU; recomand să o lași (D35). |
| Titlul și descrierea homepage-ului (punctul 17) | Făcut | „Suplimente nutritive, proteine și creatină \| Prime Supplements” și descrierea nouă sunt live. |
| Culori, contrast, zoom, fonturi servite din temă (punctele 25, 26 partea Fontify, 27) | Făcut | Butoane #e91d23; Bebas Neue și Poppins din fișierele temei; 0 cereri către fonts.googleapis; embed-ul Fontify oprit. |
| robots.txt (punctul 22) | Nu e nevoie de nimic | 50 de reguli Disallow, aceleași ca robots.txt-ul implicit Shopify. Verific la 3 luni (A19). |
| Meta Pixel de 2 ori (punctul 29) | Aproape făcut | `fbevents.js` și PageView pleacă o singură dată. Rămâne scriptul Simprosys rulat de 2 ori (E2). |
| „www.” în politici (punctul 12) | Parțial | Politicile Shopify nu-l mai au. 4 pagini de politici îl au încă (A4). |
| Shopify Forms (SYSTEM.md §8.6) | Făcut | Aplicația nu e instalată, nu există embed. |
| Bara „Adaugă în coș” fixă pe mobil (§4) | Era deja activă | `show_fixed_add_to_cart: true` în tema live și în tema veche. Nu mai e nimic de decis. |
| Mesajul B2B sub butonul de coș | Făcut pe 15.10 | Scos din șablonul principal de produs. A rămas doar în șablonul creatinei micronizate (D20). |
| Bara „cât mai ai până la livrarea gratuită” în coș | Activă | `cart_show_free_shipping_threshold: true`, pragul 300. |

Punctele vechi încă deschise și unde le găsești acum: 2 și 21 → D27; 4 → D29 și E21; 5 → E18, E19; 6 → A15; 7 → E10; 8 → E3, A6; 9 → D6; 10 → A2, D26; 11 → D3; 12 → A4; 13, 14 → D37; 15 → D9; 16 → A1; 18 → E1; 19 → D7; 20 → D5; 23 → D1; 24 → E16; 26 (BSS) → nu mai e cazul, BSS e dezinstalat (D29); 28 → D36; 30 → A17. SYSTEM.md §8.5 → E7, E8; §8.6 și §10.1 pasul 8 → E9, D1; pasul 8b → D4, A3.

---

## 4. Fac eu prin API

Fac backup înainte și citesc înapoi după fiecare scriere. Îți trimit un raport cu ce era înainte și ce e după.

**Regula nouă pentru temă.** Tema de test 193875083639 este acum tema live. Orice cod nou îl pun pe o copie nouă a temei live, iar tu o publici. Nu folosesc copia „Copy of Impact…” (ID 193889599863): e din 13.10 și i-ar lipsi 5 schimbări făcute pe live pe 15.10. Nu o publica niciodată (D31). Textele din editorul temei (E1, E8) le faci înainte să creez copia, ca să nu se piardă la publicare.

**Fără să aștept altceva de la tine**

- **A1. Mențiunile de sănătate din articolele vechi** (OLD-25). Rescriu doar frazele cu probleme din articolele despre arzătoare, detox, L-carnitină, crom, spirulină și tincturi. Azi: „pentru slăbit” de 33 de ori în 12 articole, „detox” de 21 de ori în 4, „utilizarea grăsimilor” de 18 ori în 6, „susține energia” în 6 articole. Folosesc mențiunile din Reg. 432/2012 sau formulări neutre. Linkurile spre produse rămân. Efect: risc legal închis (Reg. 1924/2006), vânzările nu scad.
- **A2. Butoanele „pentru slăbit” spre pachetul din august** (OLD-21). În `cum-alegi-un-arzator-de-grasimi` și `combinatii-arzatoare-de-grasimi`, cele 8 linkuri spre `/products/15-reducere-pachet-thermo-core-water-out-1-14-august` duc spre `thermo-core-120-caps` și `water-out-120-caps`. Butoanele devin „Vezi Thermo Core” și „Vezi Water Out”. Pachetul rămâne cum e până decizi (D26). Efect: risc legal; +0–1 comenzi/lună.
- **A3. Pagina „Politica de confidențialitate”** (`/pages/politica-de-confidentialitate`, legată din footer). Adresa pentru drepturile GDPR este `contact@old.primesupplements.ro`, un domeniu fără server de email. O înlocuiesc cu `contact@primesupplements.ro`, adresa din profilul magazinului. Efect: risc legal. Paragraful despre theMarketer (SYSTEM.md §10.1 pasul 8b) și cel despre Meta și Google (D11) le adaug după ce aprobi textul.
- **A4. Paginile de politici** (OLD-19, CHK-07). În `politica-de-cookies`, `termeni-si-conditii`, `politica-de-plata` și `politica-de-livrare`: „www.primesupplements.ro” devine „primesupplements.ro”, iar linkul `http://www.` devine `https://primesupplements.ro/`. Formularea despre ambalaj devine „în ambalajul original”, iar cea despre instrucțiuni devine „instrucțiunile de pe etichetă”. Corectez și „Livrare are costul de 20 RON” în „Livrarea costă 20 RON”. Frazele despre transfer bancar și ridicare de la sediu le schimb după D17 și D19. Efect: corectitudine, +0 comenzi.
- **A7. Raport de stoc în fiecare luni** (PDP-01, NUM-M1). Lista variantelor cu mai puțin de 21 de zile de stoc, la ritmul din ultimele 30 de zile. Doar citire. Efect: te ajută să eviți următoarea ruptură la crema de orez (~+10–20 de comenzi/lună în medie, D13).
- **A8. Produse înrudite alese manual** (PDP-12, PDP-01). Azi, recomandările automate pun Coenzima Q10 pe locul 1–2 la Prime Whey 2 kg, Creapure® și Pure Isolate, pentru că Q10 a fost dată cadou în sute de comenzi. Pe primele 10 pagini de produs și pe cele epuizate pun 3–4 alternative din aceeași categorie, doar cu stoc de minimum 3 săptămâni. Exemple: Creapure® → creatina micronizată 300 g, Creatine plicuri, Prime Whey 2 kg; D3+K2 → Daily Vitamin Formula, Vitamina C 1000 mg; Water Out 500 ml → Water Out 120 capsule. Se schimbă doar produsele din secțiunea existentă „S-ar putea să-ți placă”. Efect: +0–1 comenzi/lună.
- **A9. Ordinea produselor în colecții** (COL-01). `haine-mnx`, `prime-health` și `suplimente-sala` trec pe sortare manuală: în stoc după vânzările din 90 de zile, epuizatele la final. Azi Shaker MNX, epuizat, e primul în Haine MNX, iar D3+K2, epuizat, e pe locul 3 în Prime Health. O refac în fiecare luni. Efect: +0–1 comenzi/lună.
- **A11. „Size” devine „Mărime” la hainele MNX** (COL-02). Valorile rămân aceleași. Salvez lista ID-urilor pentru revenire și verific apoi mărimea în feedurile Google și theMarketer. Fraza din descrierea colecției („după tip și culoare”) o corectez după ce există filtrul (E14). Efect: +0–1 comenzi/lună, împreună cu filtrul.
- **A12. Numele variantelor** (PDP-11). Creapure®: „500 g (100 de porții)” și „300 g (60 de porții)”. Whey Go: opțiunea „Flavor” devine „Aroma”, „Toffe Chocolate” devine „Toffee Chocolate”, „Salted caramel” devine „Salted Caramel”. Efect: +0–1 (claritate).
- **A13. Cuvinte de căutare pe produse** (SRCH-02). „protein” și „whey protein” la Prime Whey 2 kg (azi la „protein” ies întâi batoanele); „sinefrina” și „synephrine” la Thermo Core. Valorile vechi rămân. Efect: +0 comenzi (claritate, ~5 căutări pe lună).
- **A16. Rapoarte lunare** (CHK-00, APP-21). Pâlnia, cu baza din 16.10: adăugare în coș 10,0%, coș → checkout 76,7%, finalizare 54,7%. Plus sursa primei vizite pentru comenzile atribuite azi chiar site-ului (123 din 566 în 30 de zile). Doar citire. Efect: bază de măsurare.
- **A17. O copie nouă a temei live, fără nicio schimbare vizibilă** (APP-12, APP-23). Opresc embed-urile UpPromote „Customer referral” și „Message bar” (nefolosite; „Core script” rămâne, el urmărește afiliații). Scot 4 secțiuni „apps” goale (homepage, produs, șablonul creatinei, pagina B2B). Dacă nu reinstalezi BSS (D29), scot și blocul BSS din coș și `bss-custom.js`. Tu previzualizezi și publici. Efect: ~20 KB și câteva cereri mai puțin pe pagină.
- **A19. robots.txt la 3 luni** (OLD-07). Compar regulile cu robots.txt-ul implicit Shopify. Efect: mentenanță.

**După un „da” sau după datele tale**

- **A5. Politica de cookie-uri rescrisă** (APP-06), după D3 și D4. Scot „prin utilizarea site-ului sunteți de acord” și „informațiile sunt anonime”. Pun lista reală pe categorii (necesare, analiză, marketing): Google Analytics și Google Ads, Meta, Microsoft Clarity, theMarketer, UpPromote, Judge.me, Pop Convert (dacă rămâne), Dondy, Pandectes, cu scopul și durata. Adaug linkul „Schimbă preferințele pentru cookie-uri”. Tu aprobi textul. Efect: risc legal.
- **A6. Adresa locației de expediere** (CHK-13). „Shop location” primește Str. Ioan Virgil Ispas nr. 17A, Cisnădie 555300, jud. Sibiu, aceeași ca în footer. E necesară pentru ridicare personală și locker. Efect: necuantificabil.
- **A10. Fraza despre livrare în colecția Cremă de orez** (COL-04), după D15: „Livrarea Cargus este gratuită pentru comenzile de la 300 lei (valoarea coșului după reduceri); sub acest prag costă 20 lei.” Efect: +300–1.000 lei/lună din coșuri mai mari.
- **A14. Descrierile tarifelor de livrare din checkout** (CHK-04), după D16. Exemplu: „Curier Cargus · de obicei 1–2 zile lucrătoare · comenzile până la 11:00 pleacă azi”. Limita tarifului plătit la 299,99 RON (azi la exact 300,00 RON apar ambele tarife) o schimb doar cu acordul tău. Efect: +0–2 comenzi/lună.
- **A15. Coduri de bare și SKU-uri** (OLD-15, APP-M02), după ce primesc datele. Azi: 203 variante publice fără cod, 56 de coduri invalide. Pun EAN-urile reale pentru Prime Whey GO (8 variante), unt de caju, shaker și tricourile Prime cu coduri 0594… Verific cifra de control și prefixul (resping 02x, 04x, 05x, 2xx). Dau SKU-uri unice celor 8 variante fără SKU și celor 2 SKU-uri duplicate, după confirmarea Fluxsales. Nu șterg coduri existente. Efect: +0–1 comenzi/lună.
- **A18. LinkedIn pe pagina de autor** (OLD-35), după ce îmi spui profilul corect (D37). Efect: +0.

---

## 5. Textele pentru extensie

Copiezi un text întreg în Claude in Chrome, cu Shopify Admin deschis. Fiecare text privește o singură zonă. Ordinea e după impact: riscurile legale întâi, apoi comenzile, apoi rapoartele și curățenia. Textele care ar schimba designul, prețurile, plățile sau ar scoate aplicații folosite nu sunt aici: le găsești la Decizii.

### E1. Editorul temei publicate: trei texte (acord la newsletter, plată, „Înainte/după”)

Impact: risc legal (abonare fără informare; informații de plată corecte). +0–1 comenzi/lună. Fă-l după A3 și înainte de A17.

```text
Lucrezi în Shopify Admin, magazinul primesupplements1.myshopify.com. Sarcina: schimbi doar trei texte în editorul temei publicate. Nu schimba culori, imagini, ordinea secțiunilor sau aspectul.

1. Mergi la Magazin online → Teme. La tema curentă (cea publicată, sus în pagină, ID 193875083639) apasă „Personalizează”.
2. Pagina principală → secțiunea „Întrebări frecvente” → întrebarea „Cum pot plati comanda mea?”. Notează titlul și textul actual.
   Titlul nou: Cum pot plăti comanda?
   Răspunsul nou: Poți plăti ramburs (numerar la curier) sau online cu cardul Visa ori Mastercard, pe pagina securizată Netopia. Alegi metoda la finalizarea comenzii.
3. Tot pe pagina principală → secțiunea cu imaginile înainte/după. Notează titlul și subtitlul actual.
   Titlul nou: Înainte/după
   Subtitlul nou: Feedback de la sportivii de performanță
4. Subsol (Footer) → blocul „Newsletter” → câmpul de text de sub titlu. Notează textul actual. Înlocuiește-l cu:
   Primești ghidul săptămânal, noutăți și oferte Prime (de obicei 1–2 emailuri pe săptămână). Te poți dezabona oricând din orice email. Detalii în Politica de confidențialitate.
   Pune pe cuvintele „Politica de confidențialitate” linkul /pages/politica-de-confidentialitate. Nu schimba titlul, imaginea sau butonul blocului.
5. Apasă „Salvează”. Deschide https://primesupplements.ro într-o filă nouă și verifică cele trei texte.
6. Raportează, pentru fiecare dintre cele trei locuri, textul vechi și textul nou.

Nu modifica nimic altceva, nu plasa comenzi și nu intra în checkout pe site.
```

### E2. Evenimente clienți: pixelul personalizat vechi „SIMPROSYS”

Impact: date curate pentru reclamele Meta și Google. Pixelul vechi rulează a doua oară scriptul Simprosys și are doar scopul „vânzare de date”, deci în România pornește fără acord. Necuantificabil în comenzi.

```text
Lucrezi în Shopify Admin, magazinul primesupplements1.myshopify.com. Sarcina: deconectezi pixelul personalizat vechi „SIMPROSYS”. Nu îl ștergi.

1. Mergi la Setări → Evenimente clienți (Customer events).
2. Înainte de orice schimbare, notează: în fila „Pixeli de aplicații” (App pixels), fiecare pixel și starea lui; în fila „Pixeli personalizați” (Custom pixels), fiecare pixel și starea lui.
3. Verifică faptul că pixelul aplicației „Simprosys Google Shopping Feed” este „Conectat”. Dacă nu este, oprește-te și raportează.
4. Deschide pixelul personalizat „SIMPROSYS”. Copiază tot codul lui în raport, ca rezervă. Apasă „Deconectează” (Disconnect). Nu apăsa „Șterge”.
5. Raportează starea înainte și după pentru „SIMPROSYS” și pentru pixelul aplicației Simprosys.

Nu modifica nimic altceva, nu plasa comenzi și nu intra în checkout pe site.
```

### E3. Setări → General: adresa magazinului

Impact: date de identificare complete. Politica de confidențialitate Shopify preia adresa de aici (azi fără oraș și număr). Necuantificabil.

```text
Lucrezi în Shopify Admin, magazinul primesupplements1.myshopify.com. Sarcina: completezi adresa magazinului.

1. Mergi la Setări → General → secțiunea cu adresa magazinului (Store address / Adresa magazinului).
2. Notează valorile actuale: Adresă, Apartament/altele, Oraș, Cod poștal, Județ, Țară. Nu schimba numele firmei, CUI-ul sau adresele de email.
3. Pune: Adresă: Str. Ioan Virgil Ispas nr. 17A. Oraș: Cisnădie. Cod poștal: 555300. Județ: Sibiu. Țară: România. Apasă „Salvează”.
4. Deschide https://primesupplements.ro/policies/privacy-policy și verifică dacă paragraful de contact de la final conține acum „Cisnădie”.
5. Raportează valorile înainte și după și rezultatul de la pasul 4.

Nu modifica nimic altceva, nu plasa comenzi și nu intra în checkout pe site.
```

### E4. Setări → Politici: politica de confidențialitate și „Informații de contact”

Impact: risc legal. Azi politica Shopify are „carePrime” lipit, o adresă de email personală în loc de contact@ și adresa incompletă. Checkout-ul arată doar 2 politici din 5. Necuantificabil în comenzi. Fă-l după E3.

```text
Lucrezi în Shopify Admin, magazinul primesupplements1.myshopify.com. Sarcina: corectezi politica de confidențialitate și completezi „Informații de contact”.

1. Mergi la Setări → Politici (Policies).
2. Notează care politici sunt completate și care sunt goale: Politica de rambursare, Politica de confidențialitate, Termenii serviciului, Politica de expediere, Informații de contact.
3. Deschide „Politica de confidențialitate”. Notează dacă textul este gestionat automat de Shopify sau este text editabil.
   a) Dacă este editabil: înlocuiește „carePrime Supplements” cu „care Prime Supplements”. În paragraful de contact de la final, înlocuiește adresa de email care apare acolo cu contact@primesupplements.ro (lasă un spațiu după „la”). Dacă textul conține încă „Strada Ioan Virgil Ispas, 555300 SB, România”, înlocuiește-l cu „PRIME SPORT SUPPLEMENTS S.R.L., Str. Ioan Virgil Ispas nr. 17A, Cisnădie, jud. Sibiu, 555300, România”. Nu schimba alt text. Apasă „Salvează”.
   b) Dacă este gestionată automat: nu o transforma în text manual. Caută câmpul pentru emailul de contact al politicii. Dacă există, pune contact@primesupplements.ro și salvează. Altfel doar raportează.
4. Deschide „Informații de contact”. Dacă e goală, lipește:
   PRIME SPORT SUPPLEMENTS S.R.L.
   CUI: 46260823
   Nr. Registrul Comerțului: J32/1155/2022
   Adresă: Str. Ioan Virgil Ispas nr. 17A, Cisnădie 555300, jud. Sibiu, România
   Telefon: 0775 286 584
   Email: contact@primesupplements.ro
   Apasă „Salvează”. Dacă nu e goală, nu schimba nimic și raportează textul existent.
5. Nu completa acum „Politica de expediere” și „Termenii serviciului”. Textele lor vin separat, după deciziile despre livrare.
6. Raportează starea fiecărei politici înainte și după și ce ai schimbat. Nu copia în raport adresa de email veche; scrie doar „adresa veche înlocuită”.

Nu modifica nimic altceva, nu plasa comenzi și nu intra în checkout pe site.
```

### E5. Pandectes: o scanare nouă a cookie-urilor și un raport

Impact: pregătește D3 și A5 (risc legal). Ultima scanare e din iunie 2025, pe domeniul myshopify, și listează doar cookie-urile Shopify. Fără nicio schimbare vizibilă.

```text
Lucrezi în Shopify Admin → Aplicații → Pandectes GDPR Compliance. Sarcina: doar o scanare nouă a cookie-urilor și un raport. Nu schimba aspectul bannerului și nu publica nimic.

1. Notează, fără să schimbi: butoanele de pe primul ecran al bannerului; poziția (Overlay / Bar / Box); dacă există iconița sau butonul de redeschidere a preferințelor (Revoke / Reopen); dacă blocarea automată a scripturilor (Cookie Blocker / Auto-blocking) e pornită; dacă Google Consent Mode e pornit; data ultimei publicări; domeniul folosit la ultima scanare.
2. Cookie Scanner: pornește o scanare nouă pe domeniul primesupplements.ro (nu pe primesupplements1.myshopify.com). Așteaptă rezultatul.
3. Notează cookie-urile găsite, pe categorii (necesare, preferințe, analiză, marketing), și ce servicii apar (Google, Meta, Clarity, theMarketer, UpPromote, Judge.me, Pop Convert, Dondy).
4. Nu schimba butoanele, textele, poziția, categoriile sau blocarea. Nu apăsa „Publish”.
5. Raportează valorile de la pasul 1 și lista de la pasul 3.

Nu modifica nimic altceva, nu plasa comenzi și nu intra în checkout pe site.
```

### E6. Setări → Plăți: raport (doar citire)

Impact: datele pentru D17 (portofele digitale, +3–10 comenzi/lună dacă alegi Shopify Payments) și pentru textul despre transferul bancar.

```text
Lucrezi în Shopify Admin, magazinul primesupplements1.myshopify.com. Sarcina: doar citire. Nu activa, nu dezactiva și nu edita nimic.

1. Mergi la Setări → Plăți (Payments).
2. Notează:
   a) procesatorii de plăți activi și starea lor;
   b) dacă apare oferta sau butonul „Activează Shopify Payments” și ce comisioane afișează pentru carduri;
   c) metodele de plată manuale active (Cash on Delivery (COD) / Ramburs, Transfer bancar / Bank deposit, altele);
   d) dacă la Netopia apar Apple Pay sau Google Pay ca opțiuni;
   e) dacă apare vreo mențiune despre comisionul de tranzacție pentru procesatori externi și ce procent arată.
3. Raportează toate valorile.

Nu modifica nimic altceva, nu plasa comenzi și nu intra în checkout pe site.
```

### E7. Setări → Checkout: bifa de abonare și raportul câmpurilor

Impact: +1–2 comenzi/lună după 2–3 luni. Azi bifa aduce abonați doar la 3 din 47 de clienți noi (6%); ținta din SYSTEM.md e ~15%. Raportul câmpurilor e necesar pentru D12.

```text
Lucrezi în Shopify Admin, magazinul primesupplements1.myshopify.com. Sarcina: verifici setările checkout-ului și pornești bifa de abonare la email, nebifată implicit.

1. Mergi la Setări → Checkout (Finalizarea comenzii).
2. Notează, fără să schimbi:
   (1) Metoda de contact a clientului (telefon sau email / doar email);
   (2) Nume complet: doar numele sau prenume + nume;
   (3) Nume companie: ascuns / opțional / obligatoriu;
   (4) Adresa, linia 2: ascunsă / opțională / obligatorie;
   (5) Telefon la adresa de livrare: ascuns / opțional / obligatoriu;
   (6) Bacșiș (Tipping): pornit sau oprit;
   (7) Completarea automată a adresei: pornită sau oprită;
   (8) „Folosește adresa de livrare ca adresă de facturare” implicit: pornit sau oprit;
   (9) emailurile de checkout abandonat, dacă apar pe această pagină: pornite sau oprite, către cine.
3. Secțiunea „Opțiuni de marketing” (Marketing options) → Email. Notează starea actuală a celor două opțiuni. Pune:
   „Afișează o opțiune de înscriere la finalizarea comenzii” = pornit;
   „Preselectează opțiunea de înscriere” = oprit.
   La SMS lasă totul cum este și notează doar starea.
4. Apasă „Salvează”.
5. Raportează valorile de la pasul 2 și, pentru pasul 3, starea înainte și după.

Nu modifica nimic altceva, nu plasa comenzi și nu intra în checkout pe site.
```

### E8. Conținutul implicit al temei: textul bifei de abonare

Impact: inclus în E7. Textul este exact cel din SYSTEM.md §8.5. Fă-l înainte de A17.

```text
Lucrezi în Shopify Admin, magazinul primesupplements1.myshopify.com. Sarcina: schimbi textul bifei de abonare din checkout.

1. Mergi la Magazin online → Teme. La tema curentă (cea publicată, ID 193875083639) apasă „⋯” → „Editează conținutul implicit al temei” (Edit default theme content).
2. În căutare scrie: Email me with news and offers. Dacă nu găsești, caută: Trimite-mi pe e-mail. Notează fila în care ai găsit câmpul (de exemplu „Checkout și sistem”) și textul actual.
3. Înlocuiește textul cu exact:
   Vreau emailurile Prime: ghidul săptămânal, noutăți și oferte (de obicei 1–2 pe săptămână).
4. Apasă „Salvează”.
5. Dacă nu găsești câmpul deloc, nu schimba nimic și raportează.
6. Raportează textul vechi, textul nou și locul exact în care l-ai schimbat.

Nu modifica nimic altceva, nu plasa comenzi și nu intra în checkout pe site.
```

### E9. Marketing → Automatizări (Shopify Messaging)

Impact: emailurile de marketing pleacă doar din theMarketer (SYSTEM.md §8.6), fără mesaje duble. Face parte din planul de email (+10–15 comenzi/lună până în ianuarie). Azi Shopify încă trimite emailuri de checkout abandonat; acela rămâne pornit până pornește fluxul theMarketer.

```text
Lucrezi în Shopify Admin, magazinul primesupplements1.myshopify.com. Sarcina: vezi ce trimite Shopify în numele magazinului și oprești automatizările de marketing, cu o singură excepție.

1. Mergi la Marketing → Automatizări. Dacă nu există, mergi la Aplicații → Messaging (Shopify Messaging) → Automations.
2. Notează fiecare automatizare: numele, pornită sau oprită și câte emailuri a trimis în ultimele 30 de zile, dacă se vede.
3. Oprește toate automatizările de marketing (bun venit, recomandări, după cumpărare, readucerea clienților, coș abandonat, navigare abandonată), CU EXCEPȚIA celei pentru „Checkout abandonat” (Abandoned checkout). Pe aceasta o lași exact cum este.
4. Nu șterge nimic. Nu atinge campaniile.
5. Deschide lista de campanii (Marketing → Campanii sau Messaging → Campaigns). Notează doar numele și data campaniilor programate sau trimise după 01.10.2026. Nu schimba nimic acolo.
6. Raportează lista automatizărilor înainte și după și lista de la pasul 5.

Nu modifica nimic altceva, nu plasa comenzi și nu intra în checkout pe site.
```

### E10. Judge.me: textele recenziilor în română

Impact: sub 1 comandă/lună (încredere pe pagina de produs; Google indexează azi „Customer Reviews”). Cuponul de 12% nu se schimbă aici (D10).

```text
Lucrezi în Shopify Admin → Aplicații → Judge.me Product Reviews. Sarcina: textele widgeturilor în română.

1. Settings → General (sau Languages / Translations). Notează limba actuală a widgetului (Language / Locale). Pune: Română (Romanian). Salvează.
2. Settings → Translations (sau Text customization). Notează textele actuale. Dacă sunt încă în engleză, înlocuiește:
   „Customer Reviews” → Recenzii clienți
   „Based on {{ n }} reviews” → Pe baza a {{ n }} recenzii
   „Write a review” → Scrie o recenzie
   „Be the first to write a review” → Fii primul care scrie o recenzie
   „Most Recent” → Cele mai recente
   „Verified Buyer” → Cumpărător verificat
   insigna „{{ n }} review” → {{ n }} recenzie
   insigna „{{ n }} reviews” → {{ n }} recenzii
   titlul caruselului de pe homepage, dacă e „Let customers speak for us” → Ce spun clienții noștri
   Păstrează exact variabilele dintre acolade. Salvează.
3. Caută opțiunea de reîmprospătare a widgeturilor sau de resincronizare cu Shopify (de exemplu „Refresh widgets”, „Re-render widget cache”, „Sync”) și pornește-o.
4. Doar citire, fără schimbări: Settings → Review requests: emailul de cerere a recenziei e pornit? La câte zile după livrare? Settings → Coupons / Review incentives: cuponul pentru recenzie e pornit și ce valoare are? Nu schimba cuponul.
5. Raportează limba înainte și după, fiecare text înainte și după, rezultatul pasului 3 și valorile de la pasul 4.

Nu modifica nimic altceva, nu plasa comenzi și nu intra în checkout pe site.
```

### E11. Setări → Facturare: comisioane și abonamente (doar citire)

Impact: cifrele pentru D17 (comisionul de ~1% pe plățile Netopia, ~620 RON/lună dacă se aplică) și pentru D30 (ce aplicații plătești).

```text
Lucrezi în Shopify Admin, magazinul primesupplements1.myshopify.com. Sarcina: doar citire. Nu plăti, nu schimba planul și nu anula nimic.

1. Mergi la Setări → Facturare (Billing) → Facturi (Bills).
2. Pentru ultimele 3 facturi notează: suma abonamentului Shopify, totalul de pe rândul „Comisioane de tranzacție” (Transaction fees) și procentul afișat, și fiecare abonament de aplicație (numele aplicației și suma).
3. Raportează valorile.

Nu modifica nimic altceva, nu plasa comenzi și nu intra în checkout pe site.
```

### E12. Simprosys Google Shopping Feed: raport (doar citire)

Impact: datele pentru D11 (Meta Conversions API, conversiile îmbunătățite Google) și A15 (GTIN).

```text
Lucrezi în Shopify Admin → Aplicații → Simprosys Google Shopping Feed. Sarcina: doar citire. Nu schimba nimic.

Notează:
1) planul aplicației;
2) Conversion tracking pentru Meta / Facebook Pixel: pornit sau oprit, ID-ul pixelului, dacă Conversions API (CAPI) e activ;
3) Google Ads: ID-ul de conversie și dacă Enhanced conversions sunt pornite (browser / server);
4) GA4: ID-ul;
5) feedul: câte produse sunt trimise, câte au erori sau avertismente și pe ce tip (GTIN, preț, disponibilitate, imagine);
6) setarea pentru produsele fără GTIN (identifier_exists / MPN).

Raportează valorile.

Nu modifica nimic altceva, nu plasa comenzi și nu intra în checkout pe site.
```

### E13. Google Merchant Center: surse de date și diagnostice (doar citire)

Impact: campania Google Shopping aduce ~57 de comenzi/lună. Dacă există două surse pentru aceleași produse, ofertele se dublează. Necuantificabil până la raport.

```text
Lucrezi în merchants.google.com, contul 5540809866. Sarcina: doar citire.

1. Produse → Surse de date (Data sources): notează câte surse există pentru produse online, România, română, cine le trimite (de exemplu Content API, de la Simprosys, sau Shopify / Google & YouTube) și câte produse are fiecare.
2. Produse → Diagnostice (Needs attention): notează numărul de produse cu probleme, pe tipuri (GTIN, preț, disponibilitate, politică, imagine).
3. Nu deconecta, nu șterge și nu edita nimic.
4. Raportează cifrele.

Nu modifica nimic altceva, nu plasa comenzi și nu intra în checkout pe site.
```

### E14. Search & Discovery: sinonime și filtrul „Mărime”

Impact: +0–1 comenzi/lună. Azi „arzator” și „synephrine” dau 0 rezultate, iar colecțiile de haine nu au filtru de mărime. Partea 2 doar după ce confirm A11.

```text
Lucrezi în Shopify Admin → Aplicații → Search & Discovery.

Partea 1, sinonime:
1. Mergi la Sinonime. Notează grupurile existente.
2. Creează pe rând, cu „Creează grup de sinonime”, și salvează după fiecare:
   1) arzator, arzatoare, arzător, arzătoare, fat burner
   2) sinefrina, sinefrină, synephrine, sinephrine
   3) vitamina d, vitamina d3, d3, colecalciferol

Partea 2, filtrul de mărime (doar dacă în listă apare opțiunea de produs „Mărime”):
3. Mergi la Filtre. Notează filtrele existente și ordinea lor.
4. „Adaugă filtru” → „Opțiune produs: Mărime” → eticheta: Mărime → Salvează. Mută filtrul imediat după „Tip produs”. Dacă opțiunea „Mărime” nu apare, sari peste partea 2.

Verificare: caută pe https://primesupplements.ro „arzator”. Trebuie să apară Thermo Core, Water Out 120 capsule și Fat Burning Booster. Deschide /collections/haine-mnx și verifică filtrul „Mărime”.
Raportează grupurile și filtrele înainte și după și rezultatul verificării.

Nu modifica nimic altceva, nu plasa comenzi și nu intra în checkout pe site.
```

### E15. Setări → Notificări: raport (doar citire)

Impact: datele pentru D12 și D21 (clienții doar cu telefon nu primesc confirmarea). Necuantificabil.

```text
Lucrezi în Shopify Admin, magazinul primesupplements1.myshopify.com. Sarcina: doar citire. Nu schimba nimic.

1. Mergi la Setări → Notificări → Notificări pentru clienți.
2. Notează:
   a) dacă există secțiunea SMS și dacă e activă;
   b) „Confirmare comandă” și „Confirmare expediere”: sunt în română? „Confirmare expediere” conține linkul de urmărire a coletului?
   c) „Checkout abandonat”: e pornit, după cât timp pleacă și către cine (toți clienții sau doar abonații).
3. Raportează valorile.

Nu modifica nimic altceva, nu plasa comenzi și nu intra în checkout pe site.
```

### E16. theMarketer: oprește notificările web push

Impact: tehnic. Azi fiecare pagină cere 2 fișiere care răspund 404 și descarcă ~18 KB pentru o funcție cu 0 abonați. Necuantificabil în comenzi.

```text
Lucrezi în app.themarketer.com, contul Prime Supplements. Sarcina: oprești notificările web push, pe care nu le folosim.

1. Mergi la Settings și caută „Web push notifications” (sau „Push notifications”, „Browser notifications”). Notează starea actuală.
2. Dacă e pornit: Disable / Off → Save.
3. Dacă nu găsești setarea, nu căuta în alte zone. Raportează și propune acest email pentru iam@themarketer.com, fără să-l trimiți:
   „Pe primesupplements.ro (tracking key WB4DZZXL), scriptul vostru cere /apps/mktr/firebase-config.js și /apps/mktr/firebase-messaging-sw.js, care răspund 404. Nu folosim web push. Vă rog să-l dezactivați pentru contul nostru.”
4. Raportează starea înainte și după.

Nu modifica nimic altceva, nu plasa comenzi și nu intra în checkout pe site.
```

### E17. Aplicații: dezinstalează Fontify și Section Store

Impact: igienă. Fontify are embed-ul oprit (fonturile vin din temă). Section Store are acces de scriere la teme, iar singura lui secțiune nu e folosită nicăieri. Fără efect pe site.

```text
Lucrezi în Shopify Admin, magazinul primesupplements1.myshopify.com. Sarcina: dezinstalezi două aplicații fără rol: Fontify și Section Store.

1. Înainte: deschide https://primesupplements.ro într-o filă nouă. Notează cum arată titlurile (Bebas Neue: litere înalte, condensate) și textul (Poppins).
2. Mergi la Setări → Aplicații și canale de vânzare. Notează lista aplicațiilor instalate.
3. Fontify → Dezinstalează. Dacă aplicația cere să șteargă fișiere din temă, refuză și raportează.
4. Reîncarcă homepage-ul. Titlurile trebuie să arate la fel. Dacă fontul s-a schimbat, oprește-te și raportează imediat.
5. Section Store → Dezinstalează. Reîncarcă homepage-ul, o pagină de produs și o colecție: trebuie să arate la fel.
6. Raportează lista aplicațiilor înainte și după și rezultatul verificărilor.

Nu modifica nimic altceva, nu plasa comenzi și nu intra în checkout pe site.
```

### E18. Google Search Console: sitemap-ul

Impact: reindexare mai rapidă după schimbările de titluri și articole. Necuantificabil.

```text
Lucrezi în search.google.com/search-console, proprietatea de domeniu primesupplements.ro.

1. Mergi la Sitemaps. Notează sitemap-urile trimise, data ultimei citiri și starea fiecăruia.
2. Trimite din nou https://primesupplements.ro/sitemap.xml (scrie sitemap.xml și apasă „Trimite”).
3. Mergi la Indexare → Pagini. Notează numărul de pagini indexate și neindexate și primele 3 motive de neindexare.
4. Nu folosi „Eliminări” și nu schimba setările.
5. Raportează valorile înainte și după.

Nu modifica nimic altceva, nu plasa comenzi și nu intra în checkout pe site.
```

### E19. Bing Webmaster Tools: sitemap-ul

Impact: necuantificabil (Bing și asistenții AI care folosesc Bing).

```text
Lucrezi în bing.com/webmasters.

1. Dacă primesupplements.ro nu e adăugat: alege „Import din Google Search Console” și importă proprietatea primesupplements.ro.
2. Dacă e adăugat: Sitemaps → notează ce sitemap-uri există → Submit sitemap → https://primesupplements.ro/sitemap.xml.
3. Raportează starea înainte și după.

Nu modifica nimic altceva, nu plasa comenzi și nu intra în checkout pe site.
```

### E20. Meta Events Manager: verificarea după E2 (la 24 de ore după)

Impact: confirmă că evenimentele nu se dublează și nu lipsesc. Necuantificabil.

```text
Lucrezi în business.facebook.com/events_manager, sursa de date cu pixelul 593997668868274. Sarcina: doar citire, la cel puțin 24 de ore după deconectarea pixelului vechi SIMPROSYS din Shopify.

1. Prezentare generală, ultimele 7 zile: notează numărul pentru PageView, ViewContent, AddToCart, InitiateCheckout și Purchase și sursa fiecăruia (browser, server sau amândouă).
2. Diagnosticare: notează avertismentele (deduplicare, evenimente dublate, evenimente lipsă).
3. Nu schimba nicio setare.
4. Raportează valorile. Claude compară numărul de Purchase cu comenzile din Shopify.

Nu modifica nimic altceva, nu plasa comenzi și nu intra în checkout pe site.
```

### E21. Magazinul B2B: parola pe storefront (doar după D29)

Impact: Google nu mai poate afișa paginile B2B cu prețuri en-gros (de ex. Prime Whey 2 kg la 250 RON față de 360 RON pe site). Necuantificabil. Folosește-l doar după ce ai ales parola și ai anunțat partenerii B2B.

```text
Lucrezi în Shopify Admin al magazinului B2B (kuqr0h-en.myshopify.com, adresa b2b.primesupplements.ro), NU în magazinul principal primesupplements1.

1. Mergi la Magazin online → Preferințe → secțiunea „Protecție cu parolă” (Restricționează accesul). Notează starea actuală.
2. Bifează „Restricționează accesul vizitatorilor cu o parolă”.
   Parola: [PAROLA ALEASĂ DE PROPRIETAR]
   Mesajul pentru vizitatori: Acces doar pentru partenerii B2B Prime Supplements. Pentru cont scrie la contact@primesupplements.ro.
   Apasă „Salvează”.
3. Verificare: într-o fereastră privată, https://b2b.primesupplements.ro/products/prime-whey-2000g trebuie să ducă la pagina de parolă.
4. Raportează starea înainte și după și rezultatul verificării. Nu scrie parola în raport.

Nu modifica nimic altceva, nu plasa comenzi și nu intra în checkout pe site.
```

---

## 6. Decizii pentru tine

Fiecare decizie are opțiunile, recomandarea mea și efectul așteptat. Răspunde cu numărul și litera, de exemplu „D2 A”. Riscurile legale sunt primele.

### Riscuri legale

**D1. Pop Convert: prenumele clienților afișate public, contorul „X persoane se uită” și pop-up-ul pe tot ecranul**
- Situația: notificarea „Placed Order” afișează vizitatorilor prenumele și județul cumpărătorilor și produsul comandat. În plus, o adresă publică a aplicației, fără parolă, listează azi 30 de comenzi reale cu prenume, județ și produs. „Live Visitors” scrie „17 Persoane se uită acum la acest produs”, dar cifra numără vizitatorii întregului site din ultima oră. Campania „crema de orez back in stock (copy) (copy)” apare pe tot ecranul după 5 secunde, pe toate paginile, chiar și pe whey, peste bannerul de cookie-uri. Apoi apare și pop-up-ul theMarketer.
- Opțiuni: A) oprești tot: campania, „Placed Order”, „Live Visitors”, titlul de tab „Nu uita de comanda...” și Cart sync; după 14 zile dezinstalezi aplicația. B) Oprești doar „Placed Order” și „Live Visitors”; campania o lași doar pe desktop, la ieșirea din pagină sau după 30 s, cu linkul în aceeași filă și imaginea la 600 px, cu text alternativ. C) Lași cum e.
- Recomand: A. Calea: Aplicații → Pop Convert → Campaigns → campania → Off; Pops → „Placed Order” Off, „Live Visitors” Off; Settings → Title bar Off, Cart sync Off. Îmi spui „gata”, iar eu verific că adresa publică nu mai conține prenume. Dacă le conține încă, dezinstalezi. Embed-ul îl opresc pe copia temei (A17).
- Efect: închizi un risc GDPR (art. 6) și unul de practică comercială înșelătoare (Legea 363/2007). În comenzi, între −3 și +3 pe lună: campania pare să fi adus câteva comenzi la crema de orez. Măsor 14 zile înainte și după. Rămâne un singur pop-up, cel theMarketer (SYSTEM.md §8.6).

**D2. Prețurile tăiate permanente (Directiva Omnibus)**
- Situația: 131 din 194 de produse publice au preț tăiat, iar ~35 de variante au prețul tăiat egal cu prețul. Vânzările arată că prețurile de referință nu au fost practicate în ultimele 30 de zile. Magneziu bisglicinat: ~60 lei încasat în fiecare lună din iulie, tăiat la 90. NAC: ~56–61, tăiat la 85. Citrus Bergamot: niciodată 160. EAA: 175 din iulie, tăiat la 185. L-glutamină: niciodată 175. Cremele de orez: 60 lei din septembrie, tăiate la 65–70. Liver Protect (nelistat, dar accesibil): 20 lei, tăiat la 73. Două excepții: Creapure® 300 g (110 → 100 lei din ~21.09) respectă azi regula, iar la Coenzima Q10 referința corectă e ~64 lei, nu 95.
- Opțiuni: A) scot prețul tăiat de pe toate reducerile permanente și de pe cele egale cu prețul; Creapure® 300 g și Q10 rămân ca promoții cu dată de sfârșit aleasă de tine (Q10 cu referința 64). B) Păstrezi prețul tăiat doar în promoții datate, cu referința egală cu cel mai mic preț din cele 30 de zile dinainte. C) Lași cum e și accepți riscul.
- Recomand: A. Îți trimit întâi lista completă și salvez toate valorile actuale. Opțional, pe copia temei, textul pentru cititoarele de ecran „Preț redus” devine „Preț”.
- Efect: elimini riscul de amendă ANPC (Directiva 98/6/CE art. 6a, HG 947/2000, CJUE C-330/23). Conversia poate scădea puțin; nu se poate estima fără test.

**D3. Bannerul de cookie-uri (Pandectes)**
- Situația: primul ecran are doar „Preferințe” și „Accept”. Stratul blochează atingerile pe tot ecranul pe mobil. După alegere nu există nicio cale de a schimba acordul. Configurația e publicată din 14.06.2025. Pentru România, Shopify cere consimțământ.
- Opțiuni: A) butonul „Refuz toate” pe primul ecran, la fel de vizibil ca „Accept”, iconița de redeschidere pornită și bannerul ca bară jos pe mobil. B) Doar „Refuz toate” și iconița; poziția rămâne. C) Lași cum e.
- Recomand: A (minimul legal e B). Calea: Aplicații → Pandectes GDPR → Banner → Layout / Buttons: butonul Deny pe primul strat, textul „Refuz toate” (în loc de „Declin”), ordinea Preferințe · Refuz toate · Accept; Revoke / Reopen = On, jos-stânga; pentru A, Position = Bar, jos → Publish. Verifici pe telefon, în fereastră privată, că apar 3 butoane.
- Efect: conformitate cu GDPR art. 7(3) și ghidul EDPB din 2023. Meta și Google vor raporta ceva mai puține conversii (Consent Mode le modelează); comenzile reale nu scad. Primul ecran pe mobil se eliberează, efect măsurat împreună cu D1.

**D4. theMarketer pornește înainte de acordul pentru cookie-uri**
- Situația: embed-ul theMarketer încarcă `t.themarketer.com/t/j/WB4DZZXL` și setează cookie-ul `mktr_cart_data` (365 de zile) la fiecare vizită, fără să verifice acordul. Blocarea automată din Pandectes e oprită. Pop-up-ul de abonare vine din același script. SYSTEM.md §10.1 pasul 8b: fluxurile 4.2–4.4 nu pornesc până nu se rezolvă.
- Opțiuni: A) trimiți acum emailul de mai jos și ții oprite „Cart abandonment” și „Product follow-up” până răspund. B) Dacă nu răspund în 2 săptămâni: pornești blocarea în Pandectes (t.themarketer.com, c3api.themarketer.com, sdk.pop-convert.com, d1639lhkj5l89m.cloudfront.net la Marketing; clarity.ms la Analiză) și accepți că pop-up-ul de abonare nu mai apare celor care refuză. C) Accepți riscul.
- Emailul pentru A, către iam@themarketer.com: „Pe primesupplements.ro (tracking key WB4DZZXL), embed-ul mktr_core încarcă t.themarketer.com și setează mktr_cart_data înainte de consimțământ. Vă rog: trackingul și cookie-urile să pornească doar după window.Shopify.customerPrivacy.marketingAllowed(), ca la pixelul vostru web, iar formularele de abonare să rămână afișate.”
- Recomand: A, apoi B dacă e nevoie.
- Efect: risc legal închis (Legea 506/2004 art. 4(5), GDPR). B poate reduce înscrierile din pop-up (azi ~100–112 pe lună); le urmărim săptămânal.

**D5. Articolele „Sănătate” despre boli**
- Situația: 16 articole publicate despre tensiune, colesterol, ficat, potență și altele, semnate de un antrenor, fără revizie medicală.
- Opțiuni: A) depublic 5 articole (hipertensiune-arteriala-semne-nevoie-suplimente-inima-dozaj, colesterol-7-semne-colesterol-marit-ghid, hibiscus-tensiunea-arteriala-rezultate, tincturi-pentru-potenta, detox-ficat-pentru-sportivi) cu redirect 301 spre /collections/prime-health; celelalte 11 rămân până la revizie. B) Revizie semnată de un farmacist sau medic, cu numele pe pagină. C) Lași cum e.
- Recomand: A.
- Efect: risc legal (Reg. 1169/2011 art. 7(3)). Trafic pierdut mic: blogul aduce 0,4% din comenzi.

**D6. Citratul de magneziu: 450 mg pe zi pe pagină**
- Situația: pagina spune 2 capsule = 450 mg magneziu, peste 250 mg/zi, nivelul EFSA pentru magneziul din suplimente.
- Opțiuni: A) dacă eticheta spune 2 capsule, adaug avertismentul „Peste 250 mg de magneziu din suplimente pe zi poate avea efect laxativ”. B) Dacă eticheta spune 1 capsulă, corectez textul la 1 capsulă = 225 mg. C) Lași cum e.
- Recomand: îmi spui ce scrie pe eticheta fizică, apoi A sau B.
- Efect: risc legal; aliniere cu articolul despre magneziu (încă ciornă).

**D7. Certificările de pe „Despre noi”**
- Situația: pagina afirmă certificări „TÜV, IFS, HALAL și Cologne List for Athletes”. Textul vine din șablonul temei.
- Opțiuni: A) ai documentele: mi le trimiți, le încarc în Fișiere, iar tu adaugi sub frază linkuri „Vezi certificatul”. B) Nu le ai la îndemână: Personalizează → pagina Despre noi → blocul de text → ștergi propoziția → Salvează. C) Lași cum e.
- Recomand: A dacă ai documentele, altfel B.
- Efect: o certificare neverificabilă poate fi practică comercială înșelătoare (Legea 363/2007).

**D8. Prețul pe kilogram la pudre**
- Situația: nicio pagină și niciun card nu arată prețul unitar, obligatoriu la produsele vândute la gramaj (HG 947/2000). Tema îl afișează automat dacă variantele au măsura completată.
- Opțiuni: A) „da, preț pe kg”: setez prin API măsura pe pudre și lichide; lângă preț apare un text mic gri, de ex. „(180,00 lei/kg)”. B) Nu.
- Recomand: A. Verificăm împreună pe prima variantă cum arată.
- Efect: risc legal închis; +1–3 comenzi/lună (tubul de 2 kg se vede cu 10% mai ieftin pe kg decât cel de 1 kg).

**D9. Secțiunea „Reduceri” de pe homepage**
- Situația: titlul „Reduceri” stă peste prețuri tăiate permanente și duce tot la „Cele mai vândute”, ca secțiunea de deasupra. Colecția „Reduceri” are un singur produs. Crema de orez, 4 din primele 8 produse după comenzi, nu are secțiune pe homepage.
- Opțiuni: A) Personalizează → Pagina principală → secțiunea „Reduceri”: titlul „Favoritele clienților: cremă de orez”, colecția „Cremă de orez”, „Vezi toate” → /collections/crema-de-orez. B) Titlul „Oferte”, colecția „Reduceri”, folosită doar în promoții reale. C) Ascunzi secțiunea (schimbă aspectul).
- Recomand: A, după ce stocul de cremă de orez e asigurat (D13).
- Efect: +0–1 comenzi/lună; mai puțin risc de reducere înșelătoare.

**D10. Cuponul Judge.me de 12% pentru orice recenzie**
- Situația: pornit pe 15.10.2026. Fiecare recenzie generează un cod nou de 12%, contrar regulii tale „doar WELCOME5”.
- Opțiuni: A) oprești cupoanele: Judge.me → Settings → Coupons / Review incentives → Enable coupons: Off → Save. B) Îl păstrezi doar dacă renunți la regulă: 5–8%, cu eticheta de transparență pornită.
- Recomand: A. După, verific în setările publice ale widgetului că e oprit.
- Efect: niciun cod nou; efectul în comenzi e necuantificabil.

**D11. Datele clienților către Meta și Google**
- Situația: Meta Pixel rulează doar din browser, prin Simprosys. Canalul Facebook & Instagram nu are pixel. La Google, conversiile îmbunătățite sunt oprite, iar pe pagina de produs Google tag se încarcă de 3 ori (~551 KB). Ambele soluții trimit date de client (hash-uite) și cer acceptarea termenilor și o mențiune în politica de confidențialitate.
- Opțiuni: A) Meta prin canalul Facebook & Instagram, partajare „Maximum” (Pixel + Conversions API) pe pixelul 593997668868274, și imediat Meta Pixel oprit în Simprosys; Google: accepți termenii pentru datele clienților și pornești conversiile îmbunătățite în Simprosys. Eu adaug fraza în politica de confidențialitate. B) Doar partea Google. C) Nimic.
- Recomand: A, după raportul E12. Dacă Simprosys are deja Conversions API activ, rămâi pe Simprosys pentru Meta. Nu le porni niciodată pe amândouă pentru Meta.
- Efect: Meta +1–3, Google +0–2 comenzi/lună la același buget.

**D12. Emailul la checkout**
- Situația: ~16% din comenzi (~90 pe lună) au doar telefon. SMS-urile tranzacționale Shopify sunt oprite. Acești clienți nu primesc pe email confirmarea, urmărirea și factura (care, conform politicii, se trimite pe email).
- Opțiuni: A) email obligatoriu la checkout, telefonul obligatoriu la adresa de livrare. B) Păstrezi „telefon sau email” și trimiți SMS tranzacțional (confirmare și AWB) clienților fără email; costă credit SMS. C) Lași cum e și pui factura tipărită în colet pentru ei.
- Recomand: A, cu măsurarea ratei de finalizare 4 săptămâni înainte și după (azi 54,7%). Dacă scade cu peste 1 punct, revii.
- Efect: factura, confirmarea și urmărirea ajung la toți; coșurile abandonate devin recuperabile pe email. Efectul net în comenzi e incert.

### Comenzi în plus, în ordinea comenzi / efort

**D13. Stocul: cea mai mare scurgere**
- Situația: la 0 azi sunt Vitamina D3+K2 (19–32 de comenzi pe lună până în septembrie), Citrat de zinc (9–26), Nattokinază (3–20), Water Out 500 ml (13–19) și Prime Whey 2 kg Salted Caramel. Comenzile Prime Health au scăzut de la 110 în august la ~54 în octombrie. Stoc critic: Cremă de orez brioșă cu afine 15 buc. (~3–5 zile), biscuiți cu cremă 26 (~5–8 zile), plăcintă cu cocos 87 (~10–16 zile), tort de ciocolată 129 (~17 zile); Prime Whey 2 kg Chocolate Coconut 14 (~10–12 zile); Omega-3 15 (~11 zile). În 2–3 săptămâni: Prime Whey 2 kg White Chocolate Raspberry și Blueberry Vanilla (câte 20), Pure Isolate Strawberry și White Chocolate Raspberry (câte 3), Cluster Raspberry (7). Plicurile Whey Go au o singură comandă din iunie: nu le recomanda. Paginile epuizate nu au „Anunță-mă când revine”.
- Opțiuni: A) comanzi azi lista urgentă și ții minimum 4 săptămâni de stoc pe fiecare aromă de cremă de orez și de Prime Whey; eu îți trimit raportul de luni (A7) și pun alternative pe paginile epuizate (A8). B) Produsele care nu mai revin le trec în Ciornă (fără ștergere), cu redirect 301 spre alternativa cea mai apropiată. C) Cât timp o aromă de cremă de orez e epuizată, nu mări bugetul reclamelor „crema de orez”. A și C se combină.
- Recomand: A + C. În ziua revenirii, pleacă campania theMarketer „stoc revenit” (SYSTEM.md §4.12).
- Efect: +15–30 comenzi/lună din produsele epuizate acum, plus +10–20 în medie dacă nu se mai rupe stocul la crema de orez. Costul stocului e decizia ta.

**D14. Reclamele Meta**
- Situația: campania 120218584784070615 trimite doar pe homepage: 2.412 sesiuni în 90 de zile, 0 adăugări în coș, 98% bounce, 1,7 secunde pe sesiune. Din septembrie 2025: 10.289 de sesiuni, 0 comenzi. Facebook Shopping (facebook/cpc): 206 sesiuni, 0 comenzi. Catalogul „suplimente” (fbk/meta): 3.365 de sesiuni, 26 de comenzi (0,77%). Prime Whey 2 kg convertește 0,37% din Meta și 7,4% din Google.
- Opțiuni: A) oprești azi campania 120218584784070615 și Facebook Shopping; bugetul îl economisești sau îl muți pe anunțurile ig/social (4,1% conversie), cu maximum +20% pe zi; nu-l muta pe „crema de orez” cât timp o aromă are sub 2 săptămâni de stoc. B) Pe lângă A, test de 4 săptămâni pe catalog: obiectiv Vânzări / Purchase, fără Audience Network și Messenger, doar retargeting 30 de zile cu cumpărătorii excluși, doar produsele care vând. C) Lași cum e.
- Recomand: A acum, B după reaprovizionare. Pentru reclamele noi folosești un singur șablon de parametri: `utm_source=facebook&utm_medium=paid_social&utm_campaign={{campaign.name}}&utm_term={{adset.name}}&utm_content={{ad.name}}`. Nu edita reclamele active care merg doar pentru UTM.
- Efect: A pierde 0 comenzi și economisește buget sigur; +0–4 dacă bugetul ajunge pe trafic bun. B: +0–5 (incert; Shopify nu vede cheltuiala).

**D15. Taxa de livrare care apare după cod**
- Situația: pragul de 300 RON se aplică după reducere. Toate cele 4 checkout-uri abandonate de lângă prag, din ultimele 50, aveau peste 300 RON înainte de un cod de 10%; codul i-a scos sub prag și a adăugat 20 RON. 69% din comenzi au cod. Coșul mediu e 249,64 RON.
- Opțiuni: A) păstrezi 300 RON și scrii clar „după reducere”: eu actualizez politica, descrierea tarifului (A14) și colecția Cremă de orez (A10); tu schimbi textul barei de anunț în „Livrare gratuită la comenzile de peste 300 RON (după reducere)”. B) Cobori pragul la 250 RON: acoperă toate cele 4 cazuri și costă ~27 de comenzi × 20 RON ≈ 540 RON/lună. C) Păstrezi 300 RON și scazi taxa la 15 RON.
- Recomand: A.
- Efect: A +1–3 comenzi/lună, fără cost; B +1–4, cu ~540 RON/lună mai puțin din livrare.

**D16. Ora-limită și termenul de livrare**
- Situația: textele promit 24–72 de ore și 1–3 zile, deși în 30.09–07.10 toate comenzile din zilele lucrătoare plasate până la 11:00 au primit AWB în aceeași zi (29 din 29). Între 11:00 și 12:00 au fost 5 abateri din ~42, două vineri care au plecat luni. Competitorii afișează „24 de ore”.
- Opțiuni: A) „Comenzile plasate luni–vineri până la ora 11:00 pleacă în aceeași zi; livrarea durează de obicei 1–2 zile lucrătoare.” B) Ora-limită 12:00 (mai riscant). C) Rămâi la „24–72 de ore”.
- Recomand: A, dacă îmi confirmi că termenul Cargus e de obicei 1–2 zile (Shopify nu primește datele de livrare). Eu actualizez politica, termenii și descrierile tarifelor (A14), iar datele structurate pe copia temei. Tu setezi ora și zilele de procesare în Delivery Estimator și textul barei de anunț.
- Efect: +1–4 comenzi/lună, fără cost.

**D17. Plata: Apple Pay și Google Pay**
- Situația: checkout-ul nu are niciun portofel digital. 66% din comenzi sunt ramburs, 34% card prin redirecționare la Netopia. 88% din sesiuni sunt pe mobil, 64% pe iOS. Netopia oferă Apple Pay și Google Pay pe pagina sa de plată, probabil deja active. Shopify Payments e disponibil în România. Comisionul suplimentar Shopify pe plățile Netopia (de obicei ~1%, ~620 RON/lună la 61.933 RON încasați) rămâne pe tranzacțiile Netopia chiar dacă activezi Shopify Payments.
- Opțiuni: A) pasul 0, fără risc: confirmi în contul Netopia că Apple Pay și Google Pay sunt active (ceri activarea dacă nu sunt) și citești E6 și E11. B) Activezi Shopify Payments, cu Apple Pay, Google Pay și Shop Pay ca butoane rapide în checkout; rambursul rămâne; Netopia rămâne sau o oprești. Verifici întâi eligibilitatea pentru suplimente și compari comisioanele. C) Nimic.
- Recomand: A acum, B după cifrele din E6 și E11.
- Transferul bancar: politica de plată și termenii îl promit, dar nu există nicio comandă așa în 90 de zile. Opțiuni: îl scot eu din texte (recomand) sau adaugi metoda manuală „Transfer bancar (pentru firme)”.
- Efect: A +0–2 comenzi/lună; B +3–10 (incertitudine mare). Butoanele rapide schimbă aspectul checkout-ului.

**D18. Google Shopping: 6 produse care nu vând**
- Situația: energy-pump, setul de degustare Frutilu, fat-burning-booster, combat-pro, combat-pro-2-0 și nitrox-no-stim: 718 sesiuni și 7 comenzi (0,97%) în 90 de zile. Media campaniei e 4,32%, iar Prime Whey 2 kg convertește 7,4%.
- Opțiuni: A) le excluzi din campania „Google Shopping” (în Performance Max, le scoți din grupul de produse); bugetul total rămâne. B) Doar licitare −50%. C) Nimic.
- Recomand: A.
- Efect: +1–3 comenzi/lună la același buget.

**D19. Ridicare personală din Cisnădie**
- Situația: Sibiu e primul județ, cu 15% din comenzi (240 în 90 de zile, ~80 pe lună). Termenii promit ridicare de la sediu, dar checkout-ul nu o oferă.
- Opțiuni: A) activezi ridicarea gratuită (după A6): Setări → Livrare și expediere → Ridicare locală → „Shop location” → „De obicei gata în 24 de ore”, cu programul și telefonul în instrucțiuni. B) Nu oferi ridicare; scot eu fraza din termeni.
- Recomand: A, dacă cineva poate preda coletele la sediu. Altfel B.
- Efect: A +1–4 comenzi/lună (opțiunea apare în checkout); B închide doar riscul de informare inexactă.

**D20. Pagina de produs: livrarea, plata și returul lângă buton**
- Situația: lângă „Adaugă în coș” nu apar plata ramburs (65% din comenzi), returul în 14 zile și livrarea. Intrările direct pe produs convertesc 3,36%, față de 4,35% în perioada anterioară.
- Opțiuni: A) pe copia temei, în blocul existent „Produs în Uniunea Europeană”, un rând: „Livrare Cargus în 24–72 h lucrătoare · gratuită de la 300 lei · plată ramburs sau cu cardul · retur în 14 zile” (textul se aliniază cu D15 și D16); în același pas scot mesajul B2B rămas în șablonul creatinei micronizate. B) Lași cum e.
- Recomand: A. Îmi confirmi că rambursul nu are taxă în plus. Tu verifici în previzualizare și publici.
- Efect: +2–5 comenzi/lună; schimbare vizibilă mică.

**D21. Colete ramburs refuzate**
- Situația: 44 de comenzi anulate după expediere în 90 de zile (~15 pe lună, 4,2% din comenzile ramburs), cu transport dus-întors plătit. Linkul de urmărire există deja în expedieri.
- Opțiuni: A) SMS tranzacțional de confirmare la fiecare comandă ramburs, în prima oră, prin theMarketer (cost pe SMS). Text propus, fără diacritice ca orice SMS: „Prime Supplements: am primit comanda ta de {total} RON, cu plata la livrare. Pentru modificari raspunde la acest mesaj sau suna la 0775286584.” B) Apel de confirmare la prima comandă ramburs de peste 300 RON. C) Doar marchezi comenzile ramburs plătite la decontare (D28), ca să vezi rata reală de refuz.
- Recomand: A. Eu raportez lunar rata de refuz. Rambursul rămâne metoda principală.
- Efect: +2–4 comenzi livrate/lună și transport economisit.

**D22. Livrare la locker**
- Situația: livrare doar la adresă, prin Cargus. Competitorii (Nutriland, Weider, Farmacia Tei) au easybox sau lockere. Fluxsales e deja instalată și lucrează cu Cargus, Sameday (easybox), FAN, DPD și GLS.
- Opțiuni: A) întrebi suportul Fluxsales dacă poate afișa alegerea lockerului în checkout pe planul „Shopify” (nu Plus) și ce plan trebuie pentru ~570 de comenzi pe lună; apoi alegi Cargus Ship & Go sau easybox. B) Altă aplicație de puncte de ridicare, dacă Fluxsales nu poate. C) Nimic.
- Recomand: A. Tu decizi prețul la locker și dacă se aplică pragul de 300 RON.
- Efect: +3–10 comenzi/lună (incertitudine mare) și mai puține colete ramburs nepreluate. Opțiunea apare vizibil în checkout.

**D23. Fotografiile produselor**
- Situația: toate cele 7 arome de cremă de orez și ~23 din primele 50 de suplimente au o singură imagine. Whey-ul are 8–14.
- Opțiuni: A) faci 3–5 poze pe produs (spatele etichetei, produsul preparat, măsura lângă ambalaj), începând cu crema de orez și Omega-3; eu le încarc cu text alternativ în română, iar prima imagine rămâne. B) Doar spatele etichetei, la toate (mai rapid). C) Nimic.
- Recomand: A.
- Efect: +2–4 comenzi/lună.

**D24. Produse cerute în căutare și Liver Protect**
- Situația: în 90 de zile s-au căutat berberină (14), ZMA (13), chingi și mănuși (10), greens (8), cazeină (2). TUDCA (11) nu e ingredient autorizat pentru suplimente în UE, deci iese din discuție. Liver Protect are 108 bucăți, e nelistat, costă 20 lei tăiat la 73 și a fost folosit drept cadou; numele sugerează o mențiune de sănătate neautorizată.
- Opțiuni: A) Liver Protect rămâne nelistat. B) Listezi 1–2 produse cerute (ZMA, cazeină, chingi, mănuși) când ai stoc; eu fac paginile cu mențiuni autorizate și cuvinte de căutare; berberina doar după verificarea statutului legal. C) Nimic.
- Recomand: A + B.
- Efect: +1–3 comenzi/lună dacă listezi 2–3 produse cerute.

**D25. Blocul „Merge perfect cu” de sub buton**
- Situația: blocul există în temă, sub buton, dar e gol pe toate bestseller-urile. Clienții cumpără des whey + cremă de orez (~8–12% din comenzi) și whey + creatină (~5–7%).
- Opțiuni: A) completez întâi doar Prime Whey 2 kg (Creapure®, Cremă de orez tort de ciocolată, Shaker Prime cât are cel puțin 10 bucăți); te uiți pe telefon; dacă spui „da”, completez primele 30 de produse. B) Nu.
- Recomand: A.
- Efect: +0–1 comenzi noi și +1.000–2.500 lei/lună din coșuri mai mari. Apar 3 carduri sub buton.

**D26. Pachetele**
- Situația: „Pachet Nitrox 3D + Creatină Creapure®” și „Pachet Fiber + Creatină Creapure®” sunt ciorne. „Pachet Thermo Core + Water Out” e nelistat, dar se poate cumpăra, cu handle-ul „15-reducere-…-1-14-august”.
- Opțiuni: A) un pachet real, de ex. Prime Whey 2 kg + Creapure® 300 g, la prețul ales de tine, fără preț tăiat; îl creez cu handle simplu și îl pun în „Merge perfect cu”. B) Pachetul Thermo Core + Water Out: dacă se mai vinde, îi dau handle-ul „pachet-thermo-core-water-out” cu redirect 301; dacă nu, îl trec în Ciornă. C) Fără pachete.
- Recomand: A și, pentru Thermo Core, îmi spui „se vinde” sau „nu se vinde”.
- Efect: +0–1 comenzi și +500–1.500 lei/lună.

**D27. Cele 11 articole-ciornă din 13.10**
- Situația: încă nepublicate. Blogul aduce ~5 sesiuni pe articol pe lună.
- Opțiuni: A) „aprob lotul 1: bauturi-instant-fara-zahar-frutilu-ghid, batoane-proteice-ghid-comparatie, crema-de-orez-ce-este-cum-se-prepara, crema-de-orez-vs-ovaz-instant” și le public câte 1–2 pe săptămână. Pentru creatina-efecte-secundare: unire cu creatina-si-retentia-de-apa și redirect 301, sau titlu și început axate pe efectele digestive. magneziu-bisglicinat-vs-citrat după D6. B) Le publici tu din Admin. C) Rămân ciorne.
- Recomand: A, cu unirea pentru creatina-efecte-secundare.
- Efect: +0–1 comenzi/lună după 2–3 luni.

**D28. Urmărirea Cargus și comenzile ramburs „neplătite”**
- Situația: în 30 de zile, 549 de comenzi expediate, 0 marcate „în tranzit”, 1 „livrată”. 999 de comenzi au plata „în așteptare” în 90 de zile, deci rapoartele arată două treimi din comenzi ca neplătite.
- Opțiuni: A) verifici în Fluxsales planul și sincronizarea stărilor și întrebi dacă marchează comanda ramburs ca plătită la încasare (împreună cu D22). B) Manual, săptămânal, doar pe baza raportului de încasări Cargus: Comenzi → „În așteptare” + „Onorată” + mai vechi de 7 zile → „Marchează ca plătită”. C) Lași cum e.
- Recomand: A.
- Efect: rapoarte corecte și notificările „În curs de livrare” / „Livrată”. Necuantificabil în comenzi.

**D29. Cererile B2B**
- Situația: pagina „Înregistrare B2B” din footer e goală, pentru că aplicația BSS B2B a fost dezinstalată. Magazinul b2b.primesupplements.ro e public și indexabil, cu prețuri en-gros (Prime Whey 2 kg la 250 RON, Creapure® la 123 RON).
- Opțiuni: A) pun pe pagină un text provizoriu: „Pentru parteneriate B2B scrie-ne la contact@primesupplements.ro sau sună la 0775 286 584 (și pe WhatsApp). Dacă ai deja cont de partener, intră pe b2b.primesupplements.ro.”; apoi parola pe magazinul B2B (E21), după ce anunți partenerii. B) Reinstalezi BSS B2B (cost lunar) și refaci formularul. C) Un formular nou (schimbă aspectul).
- Recomand: A.
- Efect: cererile B2B nu se mai pierd; Google nu mai arată prețurile en-gros. Necuantificabil.

**D30. Aplicații de scos**
- Situația: Wi BOGO+ nu are embed și nici ofertă. Product Migration (rămasă de la WooCommerce) are ~130 de permisiuni, inclusiv clienți, comenzi și temă. BAIS are acces de scriere la clienți. Există două „Primesupplements App”. Microsoft Clarity e cel mai mare consumator de procesor pe mobil. Dondy încarcă 63 KB pe fiecare pagină pentru bula WhatsApp.
- Opțiuni: A) dezinstalezi Wi BOGO+ și Product Migration (după ce confirmi că nu mai rulează niciun import), BAIS dacă nu mai trimiți invitații de cont; Clarity doar dacă nu te-ai uitat la înregistrări în ultimele 30 de zile (altfel Masking = Strict); Dondy rămâne. B) Doar Product Migration (securitate). C) Nimic.
- Recomand: A. La cele două „Primesupplements App” întrebi Fluxsales care e cea activă și nu dezinstalezi nimic fără răspunsul lor. Costul fiecărei aplicații îl vezi în E11.
- Efect: risc de securitate mai mic; Clarity oprit +0–2 comenzi/lună (mobil mai rapid).

**D31. Temele și schimbările din 15.10**
- Situația: tema live se numește încă „…(Claude, nepublicată)”. Copia „Copy of Impact…” e din 13.10. Pe 15.10, pe tema live s-au schimbat direct 5 lucruri vizibile: stilul filelor din descriere (titluri roșii, 20 px, majuscule), blocul „Descriere” activat și textul B2B scos de pe produs, butonul „Trimite pe WhatsApp” în articole, antetul și footer-ul fără „Powered by Shopify”.
- Opțiuni: A) redenumești tema live „Impact LIVE (SEO 13.10)” și copia „NU PUBLICA, copie veche 13.10”; tema „Impact” (179784286583) rămâne 30 de zile ca rezervă. B) Păstrezi numele.
- Recomand: A și îmi confirmi că cele 5 schimbări din 15.10 sunt aprobate de tine.
- Efect: previne pierderea lor la o publicare greșită.

**D32. Conturile de client vechi**
- Situația: conturile sunt pe versiunea veche, pe care Shopify a declarat-o depreciată pe 26.02.2026. O actualizare a temei Impact poate declanșa migrarea automată.
- Opțiuni: A) treci acum la conturile noi (logare cu cod pe email), după un test cu un cont normal și un link UpPromote. B) Aștepți data de oprire, dar nu actualizezi tema până atunci.
- Recomand: B acum, A în noiembrie, după celelalte schimbări.
- Efect: risc tehnic evitat; necuantificabil în comenzi.

**D33. Reducerile și cadourile (marjă)**
- Situația: 69% din comenzi au un cod; reducerile fac 21,5% din vânzările brute. Câteva coduri de creatori au 25–27%. Coenzima Q10 și Liver Protect au fost practic gratuite în ~264 și ~229 de comenzi.
- Opțiuni: A) plafonezi codurile creatorilor la 10% și le revezi pe cele de 25–27%, după ce vezi în UpPromote ce aduce fiecare. B) Cadoul doar peste un prag de coș (de ex. 300 RON). C) Lași cum e.
- Recomand: A pentru codurile de 25–27%; pentru cadouri, spune-mi cum se acordă azi.
- Efect: marjă mai bună; efectul în comenzi e necuantificabil. Nicio opțiune nu creează coduri noi.

**D34. Creapure® 500 g e mai scump pe porție decât 300 g**
- Situația: din ~21.09, tubul de 500 g iese 1,80 lei pe porție, iar cel de 300 g 1,67 lei. Tubul mare se vinde mai mult (44 față de 30 în 30 de zile).
- Opțiuni: A) 500 g la 165 lei (1,65 lei pe porție). B) 300 g înapoi la 110 lei, fără preț tăiat. C) Lași cum e.
- Recomand: A.
- Efect: necuantificabil (încredere, valoarea coșului), mai vizibil după prețul pe kg (D8).

### Decizii mici

| Decizie | Opțiuni | Recomand | Efect |
|---|---|---|---|
| D35. Zona de livrare Ungaria (tarife în HUF) | A) nimic; B) o ștergi tu din Setări → Livrare | A: piața e dezactivată și nu există comenzi din HU | 0 |
| D36. „Sign in with Shop” | A) îl păstrezi; B) îl oprești | A: recunoaște clienții Shop | 0 (oprirea poate pierde 0–1) |
| D37. Profilurile autorului | A) îmi spui LinkedIn-ul corect (chera23 sau chera-marius-030ba637a) și confirmi facebook.com/primesupplementsro; B) fără LinkedIn | A | +0 (semnal mic de autoritate) |
| D38. Designul rămas: H1 pe hero, ordinea secțiunilor, autoplay, paginarea blogului, pagina 404, unirea variantelor MNX, numele fișierelor | A) mai târziu; B) alegi unul și îl pregătesc pe o copie a temei | A | sub 1 comandă/lună fiecare |

---

## 7. Cifrele

### Pâlnia de azi

| | Ultimele 30 de zile | Ultimele 90 de zile | Comparație (90 de zile) |
|---|---:|---:|---|
| Sesiuni | 12.789 | 31.857 | +35% față de perioada anterioară, +70% față de anul trecut |
| Cu adăugare în coș | 1.284 (10,0%) | 3.442 (10,8%) | înainte 11,9%; anul trecut 12,6% |
| Au ajuns în checkout | 985 (76,7% din cele cu coș) | 2.718 (79,0%) | |
| Checkout finalizat | 539 (54,7% din checkout) | 1.511 (55,6%) | înainte 49,7%; anul trecut 50,6% |
| Rata de conversie | 4,21% | 4,74% | înainte 5,00%; anul trecut 5,05% |
| Comenzi | 566 | 1.599 | înainte 1.254; anul trecut 1.017 |
| Valoarea medie a comenzii | 249,64 RON | 260,8 RON | înainte 270,7; anul trecut 322,2 |
| Conversia fără traficul Meta | | 5,74% | înainte 6,43% |

- Mobil: 88% din sesiuni (11.301 în 30 de zile), conversie 4,20%. Desktop: 1.459 de sesiuni, 4,39%.
- Viteza nu e problema: pe mobil, pagina de produs are LCP 1,03 s, INP 104 ms, CLS 0 (date reale, 28 de zile).
- Plata, 30 de zile: 378 de comenzi ramburs (66,8%) și 188 cu cardul prin Netopia (33,2%). Niciun portofel digital.
- Clienții care revin fac 58% din comenzi (coș mediu 296 RON, față de 211 RON la clienții noi).
- Anulări, 90 de zile: 61 (3,8%), dintre care 44 după expediere, aproape toate ramburs.
- 123 din 566 de comenzi (30 de zile) au ca sursă chiar site-ul, deci canalul real se pierde (A16).

Evoluția pe luni (2026):

| | Iunie | Iulie | August | Septembrie | Octombrie (1–16) |
|---|---:|---:|---:|---:|---:|
| Conversie | 5,75% | 4,92% | 5,04% | 4,65% | 4,29% |
| Finalizare checkout | 43,8% | 52,4% | 57,8% | 54,8% | 54,3% |

Adăugarea în coș a scăzut de la 14,5% (iunie) la 10,3% (octombrie), iar trecerea din coș în checkout de la 90,6% la 76,8%. Finalizarea checkout-ului a crescut. Deci scăderea conversiei vine din pagina de produs, din coș, din stoc și din amestecul de trafic, nu din pasul de plată.

### Cele 5 scurgeri mari

1. **Stocul.** Patru produse care aduceau ~90 de linii de comandă pe lună sunt la 0 (D3+K2, zinc, nattokinază, Water Out 500 ml), plus o aromă de Prime Whey 2 kg. Crema de orez a avut stoc 0 în săptămânile din 14.09 și 21.09: comenzile pe zi au scăzut de la ~18 la ~10, iar pierderea netă din august și septembrie e de ~70 de comenzi. Acum două arome se termină în 3–8 zile. Potențial: +25–50 de comenzi/lună (D13, A7, A8).
2. **Checkout → plată.** Din ~985 de sesiuni pe lună ajunse în checkout pleacă ~446. 86% dintre cei care abandonează nu lasă nici email, nici telefon. Lipsesc butoanele rapide de plată și lockerul, termenul afișat e mai slab decât realitatea, iar taxa de 20 RON apare după cod. Potențial, după suprapuneri: +8–20 (D15, D16, D17, D19, D22).
3. **Trafic Meta care nu cumpără.** 5.981 de sesiuni în 90 de zile (18,8% din total), 26 de comenzi (1,7%). O campanie are 0 comenzi în 13 luni. Potențial: +0–9 la același buget, plus bani economisiți (D14, D11).
4. **Pagina de produs și coșul.** Adăugarea în coș a scăzut de la 14,5% la 10%. Intrările direct pe produs convertesc 3,36% (înainte 4,35%). Pe mobil apar trei ferestre una peste alta în primele 20 de secunde, blocul „Merge perfect cu” e gol, iar o parte din suplimente au o singură poză. Potențial: +4–10 (D1, D3, D20, D23, D25, A8, A9).
5. **Clienții care revin și emailul.** Clienții care revin fac 58% din comenzi, dar emailul a adus doar 11 comenzi în 90 de zile (~1%). Bifa de la checkout aduce abonați la 3 din 47 de clienți noi. Potențial: +10–15 comenzi/lună până în ianuarie 2027, cu planul deja scris în SYSTEM.md (E7, E8, E9, D4).

În plus: ~15 colete ramburs refuzate pe lună (D21: +2–4 livrate).

Total realist, după suprapuneri: +35–70 de comenzi pe lună în 2–3 luni, de la ~566 azi.

---

## 8. Ce nu am putut verifica

- Checkout-ul pe ecran (câmpuri, bifa, butoane, linkuri din subsol): regula interzice crearea de coșuri și checkout-uri. E6, E7 și E15 aduc valorile din Admin.
- Cheltuiala și costul pe clic în Meta Ads și Google Ads: estimările pentru reclame presupun același buget.
- Dacă Netopia are deja Apple Pay și Google Pay active pe contul tău, eligibilitatea Shopify Payments pentru suplimente și comisionul de tranzacție din facturi (E6, E11).
- Merchant Center (surse, produse respinse), Meta Events Manager, GA4, Search Console și Bing (E12, E13, E18, E19, E20).
- Ce se încarcă fără acord pentru un vizitator din România: testul a ieșit printr-un IP din SUA. Concluzia vine din cod și din politica de consimțământ Shopify pentru RO.
- Starea automatizărilor din Shopify Messaging și textele notificărilor (E9, E15).
- Motivele coletelor ramburs refuzate și timpul real de transport Cargus (Shopify nu primește evenimentele de livrare).
- Cine a făcut schimbările vizibile din 15.10 pe tema live (D31).
- Efectul publicării temei (15.10) și al textelor noi de produs: sunt prea puține zile de date. Remăsor în jurul datei de 13.11.
