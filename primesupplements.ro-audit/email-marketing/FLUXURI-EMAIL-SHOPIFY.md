## Context și reguli comune

Toate fluxurile din acest document se construiesc și rulează în Shopify. E-mailurile pleacă din **Shopify Messaging**, logica din spatele lor (așteptări, condiții, ramuri) stă în **Shopify Flow**, iar pop-up-urile se fac în **Shopify Forms**. theMarketer iese din magazin. Codul de bun venit există deja în Shopify: **WELCOME5**.

| Ce folosim în e-mailuri | Valoare reală (verificată în magazin) |
| --- | --- |
| Brand | Prime Supplements, „HARDCORE SPORTS NUTRITION”, lansat în 2022 în Cisnădie, jud. Sibiu |
| Fondator | Marius Chera, antrenor de culturism; a pregătit sportivi care au obținut cardul PRO NPC |
| Public țintă | Bărbați și femei de 20–45 de ani care se antrenează la sală (masă musculară, definire, performanță), plus clienții Prime Health care vor vitamine și minerale pentru zi cu zi |
| Ton ales | Prietenos și energic, ca un antrenor care explică pe înțeles; fără promisiuni de rezultate |
| Livrare | Cargus, 24–72 de ore (1–3 zile lucrătoare); gratuită la comenzi peste 300 de lei, altfel 20 de lei |
| Plată | Card online (Netopia), transfer bancar sau ramburs la livrare |
| Retur | 14 zile de la primire, costul returului îl plătește clientul; suplimentele desigilate nu se pot returna |
| Suport | contact@primesupplements.ro, 0775 286 584 (și WhatsApp), luni–vineri 8:00–18:00, răspuns mediu în 1 oră |
| Recenzii | 432 de recenzii Judge.me, nota medie 4,87 din 5 |
| Comenzi | Peste 8.600 de comenzi din 2022 |
| Cod de bun venit | WELCOME5: 5% la toată comanda, o singură utilizare per client, fără dată de expirare |

**Produsele vedetă** (cele mai vândute în ultimele 90 de zile, după valoare):

| Produs | Link | Nota (recenzii) |
| --- | --- | --- |
| Prime Whey 2 kg (82 g proteine la 100 g, 66 de porții) | /products/prime-whey-2000g | 4,75 (44) |
| Pure Isolate 2 kg (izolat microfiltrat, 74 de porții) | /products/pure-isolate-2000g | 4,77 (13) |
| Prime Whey 1 kg (33 de porții) | /products/prime-whey-1000g | 4,79 (14) |
| Creatină Creapure® (300 g sau 500 g) | /products/creatina-creapure | 5,0 (17) |
| Creamy Rice (cremă de orez, 7 variante: 6 arome și una fără aromă) | /collections/crema-de-orez | 5,0 (33) la tort de ciocolată |
| Cluster (intra-workout cu Cluster Dextrin®) | Fără link: titlul și adresa paginii conțin încă vechea denumire | 5,0 (9) |
| EAA (8 aminoacizi esențiali, 83 de porții) | /products/eaa-aminoacizi-esentiali | 5,0 (7) |
| Magneziu bisglicinat (80 de capsule) | /products/magneziu-bisglicinat-80-caps | 4,71 (7) |

**Platforma: totul în Shopify**

- **Shopify Messaging** (fostul Shopify Email) trimite toate e-mailurile: automatizările, newsletterul și ofertele. Îl găsești în **Apps > Messaging** (Aplicații > Messaging). Messaging, Flow și Forms nu sunt traduse în română, așa că meniurile apar de obicei în engleză. De aceea scriem întâi denumirea în engleză, iar în paranteză traducerea din ajutorul Shopify în română, acolo unde există. Pe ecran, traducerea poate diferi puțin.
- **Shopify Flow** e motorul automatizărilor. Fiecare automatizare din Messaging este, de fapt, un flux Flow, pe care îl poți deschide și edita din oricare dintre cele două aplicații. Fluxurile fără șablon, de exemplu reaprovizionarea, le creezi direct în **Apps > Flow**.
- **Shopify Forms** face pop-up-ul de 5% și pop-up-urile de campanie. E o aplicație gratuită a Shopify, dar încă nu e instalată.
- **Se construiește o singură dată, de mână.** Shopify nu are API pentru automatizări, campanii sau formulare, așa că nu le pot crea eu în locul tău. Le faci tu, o singură dată, pe calculator, cu copy-paste din acest document. Pe telefon, automatizările nu se pot edita. După ce le pornești, merg singure.
- **Automatizările nu pleacă la o oră fixă.** Fiecare e-mail pleacă la intervalul stabilit de la declanșator, de exemplu la o oră după abandon. Doar campaniile (newsletterul și ofertele) se programează la o anumită zi și oră.
- **Newsletterul săptămânal nu se repetă singur**, pentru că Shopify nu are campanii recurente. În fiecare săptămână creezi campania din șablonul salvat „Newsletter săptămânal”, schimbi articolul și subiectul și o programezi pentru duminică, la 18:00. Ofertele le programezi la fel, pentru ziua de start.
- **Fără test A/B.** Shopify Messaging nu are test A/B. Fiecare e-mail are în schimb 3 variante de subiect: folosești una 2–4 săptămâni, apoi pe următoarea, și compari rata de click din rapoarte.
- **Prețul:** 10.000 de e-mailuri gratuite în fiecare lună calendaristică, pentru toate trimiterile la un loc. Peste ele plătești 1 USD la fiecare 1.000 de e-mailuri, pe factura Shopify, la rândul „Marketing emails”. Automatizările intră și ele în cele 10.000, cu o excepție: e-mailurile automatizării de checkout abandonat sunt mereu gratuite. Estimarea noastră, nu a Shopify: la circa 3.000 de abonați, 4–5 newslettere și 2 trimiteri de ofertă pe lună înseamnă 18.000–21.000 de e-mailuri, adică 8–11 USD peste partea gratuită. La ele se adaugă e-mailurile din celelalte automatizări. Smart delivery poate scădea cifra.
- **Alerta de cheltuieli** o pui o singură dată, în Messaging (secțiunea 10, pasul 1). Ea doar te anunță: nu oprește trimiterile și nici factura.
- **Network Intelligence rămâne pornit.** Messaging funcționează doar cu Shopify Network Intelligence pornit (Settings > Customer privacy). Dacă îl oprești, Messaging se dezinstalează imediat.
- **theMarketer:** în ziua lansării îi oprești pop-up-ul și automatizările, ca nimeni să nu primească e-mailuri duble. Îl dezinstalezi tu mai târziu, după un ultim export al abonaților noi.

**Ce am făcut deja în magazin** (nu mai trebuie să faci tu):

- **Importul din theMarketer (13–14 octombrie 2026).**
  - 395 de persoane care se dezabonaseră în theMarketer sunt acum dezabonate și în Shopify, cu etichetele `import-themarketer` și `dezabonat-themarketer`.
  - 294 de abonați din pop-up și de pe site, cu acord explicit, sunt acum abonați în Shopify, cu etichetele `import-themarketer` și `abonat-themarketer`. Dintre ei, 195 au fost creați ca clienți noi, iar 99 existau deja.
  - 145 de contacte fără acord explicit nu au fost importate.
  - Shopify are acum 3.079 de abonați la e-mail. Eticheta `import-themarketer` îi ține pe cei importați în afara seriei de bun venit.
- **Segmentele, gata create** în **Customers > Segments** (Clienți > Segmente). Se actualizează singure. Cifrele sunt din 13–14 octombrie 2026:
  - „Email · abonați fără comenzi”: 1.785
  - „Email · abonați care au cumpărat”: 1.294
  - „Email · încălzire (cei mai activi)”: 1.054, adică abonații care au deschis un e-mail Shopify în ultimele 365 de zile sau au cumpărat în ultimele 180 de zile
  - „Email · recâștigare (90 de zile fără comandă)”: 1.061
  - „Email · implicați (de folosit după 180 de zile)”: 559. După ce îi completezi regula (secțiunea 7, pasul 8), are circa 743 de persoane (numărate pe 15 octombrie 2026, când regula de acum dădea 562)
  - „Email · candidați curățare (fără click 180 de zile)”: 2.748
  - „Email · pop-up ofertă (toți)”: cei cu eticheta `popup-oferta`, deocamdată 0
  - „Email · inactivi (exclus din campanii)”: cei cu eticheta `email-inactiv`, deocamdată 0
  - „Email · cumpărători proteine”: 912
  - „Email · cumpărători creatină”: 332
  - „Email · cumpărători cremă de orez”: 136
- **Patru articole de blog corectate.** Am scos mențiunile de sănătate neautorizate din ghidul despre plicurile de creatină Ready To Go, din ghidul Creapure, din ghidul despre zinc și din ghidul despre crema de orez.
  - În e-mailuri poți pune linkuri spre ghidul despre proteine, ghidul despre crema de orez și ghidul despre plicurile de creatină.
  - Ghidul Creapure (`creatina-creapure-ghid`) și ghidul despre zinc nu le punem în e-mailuri, din prudență.

**Segmentele pe care le creezi pe parcurs** (în Customers > Segments; ți le pot crea eu, dacă îmi ceri):

- „Email · recâștigare – campanie unică”: pentru campania unică cu e-mailul 1 de recâștigare (secțiunea 7, pasul 7); 1.061 de persoane pe 14 octombrie 2026.
- „Email · curățare de pornire (o singură dată)”: pentru campania unică cu e-mailul 3, în ziua D0+180, doar dacă e nevoie (secțiunea 7, pasul 12).
- „Ofertă <slug> – abonați pop-up”: la fiecare ofertă, pentru e-mailul B1 (secțiunea 9, pasul 6).
- Opțional: „Ofertă <slug> – fără comandă de la start”, pentru memento-ul A2 (secțiunea 9, pasul 4).
- Opțional: „Email · abonați fără inactivi”, doar dacă în câmpul To al campaniei nu poți exclude un segment (secțiunea 8).
- Opțional: „Email · încălzire + abonați din ultimele 90 de zile”, pentru pasul intermediar din săptămâna 4 a încălzirii (secțiunea 8).
- Opțional: „Email · bun venit în curs (10 zile)”, ca abonații din seria de bun venit să nu primească și e-mailurile de navigare (secțiunea 2, pasul 4).
- Doar dacă e nevoie: „Email · bun venit (rezervă)”, varianta de rezervă a seriei de bun venit cu dubla confirmare (secțiunea 1).
- Doar pentru teste, apoi le ștergi: „Test · recâștigare”, „Test · curățare” și „Test · activ” (secțiunea 7).

**Etichetele din acest document** (le scrii exact așa):

- **Puse de formulare:** `popup-welcome5` (pop-up-ul de 5%), `popup-oferta` și `oferta-<slug>` (pop-up-urile de campanie). Eticheta `newsletter` vine de la formularul din subsolul site-ului și e deja pe 334 de clienți: nu o refolosești.
- **Puse la import:** `import-themarketer`, `abonat-themarketer` și `dezabonat-themarketer`.
- **Puse de fluxuri:** `recastigare-auto` (a intrat în recâștigare, fluxul A), `curatare-intrebat` (a primit întrebarea din e-mailul 3, fluxul B) și `email-inactiv` (iese din campanii, fluxul B; o scoate fluxul C). Toate sunt în secțiunea 7.
- **Puse de tine, de mână:** `revenire-lista`, pe cine îți cere să revină pe listă (secțiunea 7).
- **Doar pe clienții de test:** `test-email` (secțiunea 4), `test-flux` (secțiunile 5 și 6), `test-recastigare`, `test-curatare` și `test-activ` (secțiunea 7).
- **Pe produse:** `fara-email-navigare`, pe produsele scoase din abandon navigare (secțiunea 2, pasul 3). Eticheta `crema orez` există deja pe cele 7 produse Creamy Rice și o folosesc fluxul pentru client nou (secțiunea 5) și reaprovizionarea (secțiunea 6).

**Ce acoperă din auditul agenției**

| Ce a găsit agenția | Ce face acest plan |
| --- | --- |
| Double opt-in neactivat | Pornești dubla confirmare în Shopify și o testezi cu o adresă personală înainte de lansare. Nu e clar dacă pop-up-ul din Shopify Forms trimite e-mailul de confirmare (de testat). Dacă nu îl trimite, acordul rămâne explicit: bifă nebifată din start, text clar și link spre politica de confidențialitate. |
| Validarea domeniului și integrarea (setup tehnic) | Domeniul primesupplements.ro se autentifică în Shopify, cu înregistrările CNAME, și rămâne o singură înregistrare DMARC (azi sunt două). E-mailurile pleacă direct din Shopify, din datele magazinului, deci nu mai depind de legătura cu o aplicație externă. |
| Welcome Flow cu doar 2 e-mailuri (recomandarea agenției: 4) | Seria de bun venit are 5 e-mailuri în 10 zile: codul, povestea brandului, cele mai vândute produse, ce ne face diferiți, apoi recenziile și condițiile clare. Se oprește la prima comandă. |
| Abandon site, cu șabloane neoptimizate | Shopify nu are o automatizare pentru cine pleacă fără să deschidă vreun produs, așa că fluxul nu se mai construiește. Acești abonați primesc newsletterul, iar cine deschide un produs intră în abandon navigare. Fluxul vechi se oprește odată cu theMarketer. |
| Abandon navigare: șabloanele nu folosesc produsul văzut | Secțiunea Abandoned browse (Navigare abandonată) pune singură în e-mail produsul la care s-a uitat clientul. |
| Abandon coș: două automatizări active pe același declanșator, deci e-mailuri duble | Rămâne un singur flux de coș, din șablonul „Recover abandoned cart”. Șablonul îi exclude pe cei care au primit în ultimele 14 zile un e-mail de checkout, coș sau navigare abandonate. În ziua lansării oprești ambele fluxuri de coș din theMarketer și verifici că nici Growth > Autopilot nu are un flux de coș propriu. |
| Lipsește Abandon checkout | Folosim automatizarea nouă „Abandoned checkout” din Shopify, extinsă la 3 e-mailuri: la 1 oră, la 24 și la 72 de ore. Shopify spune că automatizările de checkout abandonat sunt mereu gratuite. Dacă asta include și e-mailurile 2 și 3, adăugate de noi, rămâne de verificat pe prima factură, la rândul „Marketing emails”. |
| Lipsește Client nou | 4 e-mailuri în 21 de zile după prima comandă: mulțumirea și ce urmează cu coletul, cum folosești produsele, ce se potrivește cu ele și pregătirea celei de-a doua comenzi. |
| Automatizări incomplete | Fiecare flux e complet: declanșator, așteptări, condiția G după fiecare așteptare (e abonat și, unde e cazul, n-a comandat) și oprire la comandă sau la dezabonare. În plus, apar două fluxuri noi: reaprovizionarea pe produs și recâștigarea. |
| Wishlist fără funcționalitate pe site | Nu e nevoie de el: site-ul nu are wishlist, deci fluxul pur și simplu nu se reconstruiește. Dispare odată cu theMarketer. |
| Sunset pornit după doar 30 de zile | Întâi recâștigarea, la 90 de zile fără comandă. Curățarea vine abia după 180 de zile fără niciun click: abonatul e întrebat o dată dacă mai vrea e-mailurile, iar cine nu răspunde primește eticheta `email-inactiv` și iese din campanii, fără să fie dezabonat. Curățarea pornește la 180 de zile după primul newsletter din Shopify, pentru că Shopify nu are încă istoric de click-uri. |
| Rate de deschidere scăzute | Domeniu autentificat (fără el, Shopify trimite de pe o adresă shopifyemail.com), încălzire treptată cu cei mai activi abonați, e-mailuri trimise la momentul potrivit (de exemplu, la o oră după abandon) și Smart delivery la campanii. Judecăm rezultatele după click-uri, nu după deschideri, pentru că Apple Mail raportează deschideri false. |
| Șablonul campaniilor neoptimizat: dark mode, fonturi, culori, ierarhie, alt text | Un singur set de brand, în Manage branding: logo pe fundal transparent, culorile site-ului, font Arial, text real în loc de text în imagini, alt text la fiecare imagine și un singur buton principal. Cum arată pe modul întunecat e de testat. |
| Șabloane diferite în automatizări și în campanii | Toate e-mailurile, din automatizări și din campanii, folosesc aceleași setări de brand și același subsol comun. |
| Lipsa segmentării | 11 segmente gata create: după comenzi, după activitate și după categoria cumpărată (proteine, creatină, cremă de orez). Reaprovizionarea pleacă pe produs, la momentul estimat de recumpărare. |
| Teste A/B | Shopify Messaging nu are test A/B. Alternezi cele 3 variante de subiect ale fiecărui e-mail și compari rata de click din rapoarte. |
| Monitorizarea performanțelor | Rapoarte lunare pe fiecare automatizare și campanie, cu lista de verificări din secțiunea 10, pasul 7. |

**Șablonul de brand (o singură dată)**

Îl setezi în **Apps > Messaging > Templates > Manage branding**. Setările de aici se aplică tuturor e-mailurilor. Fiecare e-mail le poate schimba separat, dar nu le schimba, ca toate e-mailurile să arate la fel.

- **Logo:** logoul Prime pe fundal transparent (PNG), ca să se vadă bine și pe modul întunecat al telefonului (de verificat la test). Implicit, Shopify ia logoul din **Settings > General > Brand assets**, unde trebuie să aibă cel puțin 512 px lățime.
- **Culori, luate din site:**
  - butoane #e91d23, cu text #ffffff;
  - text #1a1a1a;
  - fundalul din jurul e-mailului #f0f0f0, iar corpul e-mailului alb (#ffffff), ca să se citească ușor;
  - subsolul (Footer) #1a1a1a, cu text alb. Dacă nu găsești aici culoarea subsolului, o setezi în secțiunea Footer din șablonul „Prime · bază” (secțiunea 10, pasul 1).
- **Font:** Arial sau Helvetica. Messaging acceptă doar fonturi web-safe, iar Barlow, fontul site-ului, nu e unul dintre ele. Lista exactă o vezi pe ecran.
- **Butoane:** stilul îl alegi în fiecare secțiune Button (Buton): colțuri rotunjite („rounded” sau „curved”) și umplere plină („solid”). Un singur buton principal pe e-mail, roșu, ca cititorul să știe unde să apese. Restul linkurilor rămân linkuri în text.
- **Imagini:** text alternativ (alt text) la fiecare imagine, de exemplu „Prime Whey 2 kg, pudră proteică”. Așa, mesajul rămâne clar și când inboxul blochează imaginile. Tot ce e important scrii ca text, nu în imagini.
- **Linkul de dezabonare** trebuie să aibă un contrast de cel puțin 4,5:1 față de fundal. Alb pe #1a1a1a trece. Dacă Shopify afișează avertismentul „Adjust unsubscribe link color contrast”, corectezi culoarea tot din Manage branding.
- **Modul întunecat:** Shopify nu spune cum arată e-mailurile pe modul întunecat. Le verifici cu un e-mail de test în Gmail, Apple Mail și Outlook (de testat).
- **Subsolul:** secțiunea Footer (Subsol) nu se poate șterge. O lași să arate informațiile magazinului (numele și adresa) și, dacă vrei, iconițele rețelelor sociale. Chiar deasupra ei pui secțiunea Text cu „Subsolul comun”, de mai jos.

**Reguli pentru toate e-mailurile:**

1. **Doar abonați cu acord explicit**, inclusiv la coșul și la checkout-ul abandonat. În Shopify, asta înseamnă starea de marketing prin e-mail SUBSCRIBED (abonat). Automatizările trimit implicit doar abonaților. La checkout abandonat lași câmpul „To:” (Către:) pe abonați și nu îl schimbi în „All customers”. După fiecare așteptare și înaintea fiecărui e-mail dintr-un flux pui condiția de control G: clientul e abonat și, unde e cazul, n-a comandat. Bifa de acord din pop-up nu e niciodată pusă din start. Recomandat: dubla confirmare (double opt-in), iar e-mailul cu WELCOME5 să plece abia după confirmare (de testat, secțiunea 1).
2. **Subsol obligatoriu:** Shopify pune singur, în Footer, linkul de dezabonare și adresa magazinului din Settings > General (PRIME SPORT SUPPLEMENTS SRL, Str. Ioan Virgil Ispas nr. 17A, Cisnădie 555300, jud. Sibiu). Adresa trebuie completată acolo înainte de prima trimitere (secțiunea 10, pasul 1). Chiar deasupra Footer-ului, secțiunea „Subsolul comun” adaugă CUI-ul, numărul de la Registrul Comerțului, telefonul, e-mailul, motivul pentru care omul primește e-mailul și linkul spre politica de confidențialitate.
3. **Mențiuni de sănătate:** doar formulările autorizate în UE, cuvânt cu cuvânt, exact ca pe eticheta produsului și cu condițiile lor. De exemplu, la creatină spui că efectul se obține la un consum zilnic de 3 g și că produsul se adresează adulților care fac exerciții fizice de mare intensitate. EAA, glutamina, cofeina și extractele din plante nu au mențiuni autorizate, deci nu promitem efecte. Pentru Cluster spunem doar „Cluster”. Titlul și adresa paginii lui din Shopify conțin încă vechea denumire, care nu apare în e-mailuri. De aceea nu pui Cluster în secțiunile Product (Produs), nu pui linkuri spre pagina lui, iar în Product (Dynamic) alegi doar colecții fără Cluster.
4. **Fără urgență falsă:** doar termene reale, aplicate de sistem (data de final a codului, setată în Discounts; secțiunea Countdown doar până la acea dată), și stoc real, citit automat de Flow. Nu scrii niciodată de mână un număr de stoc și nu reiei același cod imediat după „ultima zi”.
5. **Reduceri (Omnibus):** când anunți o reducere, prețul de referință este cel mai mic preț din ultimele 30 de zile. Apare pe pagina fiecărui produs, iar în e-mail îl scrii lângă fiecare produs numit cu reducere. Procentul se calculează față de acest preț.
6. **Text standard în subsol:** „Suplimentele alimentare nu înlocuiesc o dietă variată și echilibrată și un stil de viață sănătos. Nu depășiți doza zilnică recomandată. A nu se lăsa la îndemâna copiilor mici.”
7. **De verificat cu un jurist sau cu INSP:** Ordinul 1069/2007 (art. 12) cere avizarea prealabilă a reclamei la suplimente de către autoritatea de sănătate publică. Legea 56/2021 (art. 14 alin. 2¹) spune că procedura se stabilește prin norme tehnice adoptate prin hotărâre de Guvern, iar noi n-am găsit dovezi că acestea au fost adoptate. Nu e clar dacă regula se aplică și e-mailurilor. Până la un răspuns, în e-mailuri folosim doar informații de pe eticheta produsului, cum cere Legea 56/2021 (art. 7 alin. 5).
8. **Un singur flux de fiecare tip:** o singură automatizare activă pentru bun venit, checkout, coș, navigare, client nou și recâștigare. Două automatizări de același tip trimit e-mailuri duble, exact problema găsită de agenție la coș. Te uiți și în Growth > Autopilot, ca Autopilot să nu ruleze automatizări proprii, în paralel cu ale tale.

**În texte**, parantezele drepte marchează locurile în care pui un câmp sau o secțiune Shopify, ori un text pe care îl completezi tu. Le pui așa:

- **Salutul.** În seria de bun venit, la abandon navigare, în newsletter și în oferte scrii „Salut!”, fără prenume, pentru că abonații din pop-up de obicei nu își lasă numele. În fluxurile în care de obicei știm numele (checkout, coș, client nou, reaprovizionare, recâștigare), „Salut, [Prenume]!” e o secțiune Custom Liquid (Liquid personalizat), prima din e-mail, cu codul de mai jos. Când prenumele lipsește, apare doar „Salut!” (de testat cu un e-mail de test). Secțiunile Custom Liquid se adaugă doar de pe calculator.
  `<p>{% if customer.first_name != blank %}Salut, {{ customer.first_name }}!{% else %}Salut!{% endif %}</p>`
- **[Prenume] în subiect** apare doar în fluxurile în care știm numele, prin Personalize > First name, cu cel mult 2 câmpuri personalizate pe subiect. Fără o valoare implicită (Default value), la clientul fără prenume rămâne un gol. În română nu există un cuvânt neutru potrivit (nu folosim „prietene”), așa că, dacă mulți clienți nu au prenume, alegi variantele de subiect fără [Prenume].
- **Numele produsului nu poate fi pus automat în subiect sau în preheader**, pentru că Shopify nu are un câmp pentru el acolo. În reaprovizionare, [PRODUS] îl scrii de mână, pentru că fiecare flux e pentru un singur produs.
- **Secțiunile automate.** „[Secțiunea Abandoned checkout: …]”, „[Secțiunea Abandoned cart: …]” și „[Secțiunea Abandoned browse: …]” sunt secțiunile Abandoned checkout (Plată abandonată), Abandoned cart (Coș abandonat) și Abandoned browse (Navigare abandonată). Ele pun singure produsele din checkout, din coș sau produsul văzut, cu butonul de întoarcere. Merg doar în automatizările lor.
- **[PRODUSE_COMANDĂ] și [PRODUSE_COMANDĂ_ANTERIOARĂ]** sunt secțiuni Custom Liquid care listează produsele din ultima comandă, fără prețuri. Codul e în secțiunile 5 și 7.
- **[COD]** e secțiunea Discount (Reducere), pentru un cod care există deja în Discounts, sau, mai simplu, un Button (Buton) cu linkul care aplică singur codul.
- **Rândurile „[Doar dacă …:]”** se fac cu Custom Liquid (după numărul de comenzi, după ultima comandă sau după valoarea checkout-ului) sau cu ramuri în Flow, cu câte un e-mail separat pe fiecare ramură. Valorile calculate în Flow nu pot fi puse în e-mail. Fiecare bloc Liquid îl verifici cu un e-mail de test.
- **Ce completezi de mână:** [COD], [DATA_FINAL], [COLECȚIE] și celelalte paranteze din oferte și din reaprovizionare nu sunt variabile Shopify. Le scrii tu, la fiecare ofertă sau în fiecare flux.
- **Ce nu există:** prețurile din coș în Liquid, stocul în textul e-mailului și articolele de blog trase automat. Articolul îl pui de mână, cu o secțiune Image with text (Imagine cu text) și un Button.

**Subsolul comun.** Îl pui ca secțiune Text chiar deasupra secțiunii Footer, în fiecare e-mail din document. Shopify adaugă singur, în Footer, linkul de dezabonare și adresa magazinului, așa că ele nu se mai scriu aici. Îl salvezi o singură dată în șablonul „Prime · bază” (secțiunea 10, pasul 1), iar șabloanele de campanie „Newsletter săptămânal” și „Ofertă <slug>” îl au și ele. În automatizări, fiecare e-mail se construiește în pasul lui și nu se poate copia, așa că lipești textul în fiecare e-mail:

> Primești acest e-mail pentru că te-ai abonat la newsletterul Prime Supplements pe primesupplements.ro. Nu mai vrei e-mailuri de la noi? Folosește linkul de dezabonare de mai jos. · [Politica de confidențialitate](https://primesupplements.ro/policies/privacy-policy)
>
> PRIME SPORT SUPPLEMENTS SRL · CUI 46260823 · J32/1155/2022 · 0775 286 584 · contact@primesupplements.ro
>
> Suplimentele alimentare nu înlocuiesc o dietă variată și echilibrată și un stil de viață sănătos. Nu depășiți doza zilnică recomandată. A nu se lăsa la îndemâna copiilor mici.

**Codul se aplică singur.** Butoanele cu WELCOME5 duc la un link de forma `https://primesupplements.ro/discount/WELCOME5?redirect=/collections/suplimente-sala`. Shopify pune codul în coș automat, iar clientul nu mai trebuie să îl scrie. Linkul de bază îl copiezi din **Discounts > WELCOME5 > Promote > Get a shareable discount code > Copy link** (Promovează > Obține un cod de reducere care poate fi distribuit > Copiați linkul).

Atenție: în Shopify, WELCOME5 merge la orice client care nu l-a folosit încă, inclusiv la cei care au mai comandat, și se cumulează cu alte reduceri. „Doar la prima comandă” e respectat numai de e-mailuri: pomenim codul doar clienților cu 0 comenzi, printr-o condiție în Flow sau în Liquid. Dacă vrei să-l limitezi și în Shopify, decizia e a ta, în Discounts.

## 1. Seria de bun venit (5 e-mailuri, 10 zile)

Noul abonat primește imediat codul promis în pop-up. Apoi, timp de 10 zile, află cine suntem, ce produse aleg cei mai mulți clienți și ce spun aceștia despre noi. Seria se oprește singură când abonatul plasează prima comandă sau se dezabonează.

| E-mail | Când pleacă | Tema | Scop |
| --- | --- | --- | --- |
| 1 | Imediat după abonare, în câteva minute (cu dubla confirmare: după confirmare, de testat) | Codul WELCOME5 | Ține promisiunea din pop-up |
| 2 | După 2 zile (ziua 2) | Povestea și valorile brandului | Încredere |
| 3 | După încă 2 zile (ziua 4) | Cele mai vândute 5 produse | Alegere ușoară |
| 4 | După încă 3 zile (ziua 7) | Ce ne face diferiți | Argumente concrete |
| 5 | După încă 3 zile (ziua 10) | Recenzii și condiții de livrare și retur | Dovadă socială |

**Ce răspunde auditului:** agenția a găsit o serie de bun venit cu doar 2 e-mailuri și a recomandat 4. Aici sunt 5, fiecare cu un singur obiectiv: codul, povestea brandului, produsele, ce ne face diferiți și recenziile. Toate e-mailurile au același logo, aceleași culori și același font ca și campaniile, setate o singură dată în Manage branding. Dubla confirmare, cerută tot de audit, e explicată mai jos.

**Cine intră în serie și cine nu:**

- **Intră:** cine se abonează din pop-up-ul de 5% (Shopify Forms) sau din formularul de newsletter din subsolul site-ului, are acord de marketing activ și 0 comenzi.
- **Nu intră:**
  - cine se abonează la checkout (șablonul Shopify îi exclude);
  - clienții care au deja o comandă: ei primesc doar newsletterul și ofertele;
  - abonații importați din theMarketer pe 13–14 octombrie 2026 (eticheta `import-themarketer`);
  - cine se abonează dintr-un pop-up de campanie (eticheta `popup-oferta`): primește e-mailul ofertei, din secțiunea 9;
  - abonările din formularele altor aplicații (theMarketer, Pop Convert): Shopify nu le recunoaște pentru această serie.

**Ce s-a schimbat față de varianta veche:**

- **Fără oră fixă.** Automatizările nu pot trimite la o anumită oră. Așteptările se numără de la momentul abonării: cine se abonează la 22:00 primește e-mailul 2 după două zile, tot în jurul orei 22:00.
- **Fără test A/B.** Shopify nu are test A/B pentru subiecte. Folosești o variantă de subiect 2–4 săptămâni și notezi cifrele din raportul e-mailului (View report). Apoi treci la următoarea variantă și compari.
- **Fără regulă anti-oboseală automată.** Shopify nu are o setare care să oprească un e-mail din serie în ziua în care trimiți o campanie. Seria are doar 5 e-mailuri în 10 zile, așa că e acceptabil.

**Cum îl construiești în Shopify:**

1. **Verifici că nu mai există altă serie de bun venit.** Deschizi Apps > Messaging > Automations (Aplicații > Messaging > Automatizări). Dacă găsești altă automatizare de bun venit pornită, de exemplu „Welcome new subscribers with a discount email”, o oprești. Două serii active înseamnă e-mailuri duble. Te uiți și în Growth > Autopilot: Autopilot poate crea singur o serie de bun venit, care ar rula în paralel cu a ta.
2. **Creezi seria din șablon.** Apps > Messaging > Automations > Create automation (Creare automatizare) > „Welcome new subscribers with a discount series” (Întâmpinarea noilor abonați cu o serie de reduceri). Nu o pornești încă: când Shopify îți cere, alegi Save without turning on (Salvați fără a activa). Lucrezi pe calculator: pe telefon, automatizările nu se pot edita.
3. **Refaci pașii fluxului.** Deschizi automatizarea > Edit workflow (Editează fluxul de lucru). Șablonul vine cu 4 e-mailuri, iar așteptările lui nu sunt publicate, așa că le setezi tu, după schița de mai jos:
   - **Declanșatorul** rămâne Customer subscribed to email marketing (Client abonat la marketingul prin e-mail). El pornește doar pentru abonările din formularul temei și din Shopify Forms.
   - **Condiția din șablon** care îi exclude pe cei abonați la checkout rămâne neschimbată.
   - **Pauza de 5 minute** (Wait) e opțională. Lasă timp ca eticheta din Forms să ajungă pe client înainte de verificare (de testat).
   - **Condiția C0**, cu trei rânduri legate prin AND (ȘI):
     - starea de marketing Equal to (Egal cu) SUBSCRIBED. În listă apare fie `defaultEmailAddress.marketingState`, fie `emailMarketingConsent.marketingState`; o alegi pe cea afișată;
     - `tags` None of (Niciunul dintre) `import-themarketer`, `popup-oferta`;
     - `numberOfOrders` Equal to (Egal cu) 0.

     Pe ramura „false” nu pui nimic, așa că fluxul se încheie.
   - **Așteptările dintre e-mailuri** sunt de 2, 2, 3 și 3 zile. După fiecare Wait pui condiția G: SUBSCRIBED și `numberOfOrders` = 0. Shopify recitește datele clientului după fiecare Wait, așa că o comandă plasată sau o dezabonare făcută între timp oprește seria. Ce unități oferă câmpul Wait nu e documentat. Dacă nu găsești „zile”, pui 48 și 72 de ore (de testat).
   - **E-mailul 5 îl adaugi tu** la final: încă un Wait de 3 zile, o condiție G și un pas Send marketing email (Trimitere e-mail de marketing). Pașii de e-mail nu se pot copia, deci îl construiești de la zero.

   La final apeși Apply changes (Aplică modificările).
4. **Pui textele în e-mailuri.** La fiecare pas de e-mail deschizi e-mailul (Edit) și completezi Subject (una dintre cele 3 variante), Preview text (preheaderul) și secțiunile din „Setări tehnice”. Apoi Save > Exit. Fiecare e-mail se termină cu o secțiune Text cu [Subsolul comun], pusă deasupra secțiunii Footer. Logo-ul, culorile și fontul vin din Apps > Messaging > Templates > Manage branding.
5. **Trimiți câte un test.** Send test (Trimiteți un test) la fiecare e-mail. Verifici pe telefon subiectul, preheaderul, butoanele, subsolul și linkul de dezabonare. Te uiți și cum se numește linkul de dezabonare în subsol: dacă nu apare „Dezabonare”, schimbi cuvântul din fraza „apeși «Dezabonare»” din e-mailul 1 cu cel afișat.
6. **Pregătești pop-up-ul de 5%** în Shopify Forms, cu setările de mai jos, și îl lași Inactive.
7. **Pornești totul în aceeași sesiune.** Înainte, te asiguri că nu mai rulează niciun import de clienți. Importul din theMarketer s-a făcut pe 13–14 octombrie 2026. Shopify nu spune clar dacă un import poate porni seria, de aceea C0 îi oprește pe cei importați după etichetă, iar seria o pornești abia după ce importul s-a încheiat.
   1. La seria de bun venit apeși Turn on automation (Activați automatizarea).
   2. Mergi în Online Store > Edit theme > App embeds (Magazin online > Editare temă > Încorporări de aplicații), pornești Forms și apeși Save (Salvare). Apoi, în Apps > Forms, apeși Turn form on (Activare formular) la „Popup WELCOME5”.
   3. Tot în App embeds oprești theMarketer și Pop Convert, apoi Save. În contul theMarketer oprești seria lui de bun venit și pop-up-ul, ca nimeni să nu primească e-mailuri din două locuri. Celelalte automatizări theMarketer (navigare, cele două de coș și restul) le oprești în aceeași sesiune (secțiunea 10, pasul 5).
   4. Te abonezi din pop-up cu o adresă personală nouă. Verifici că pe client apare eticheta `popup-welcome5`, că primești e-mailul 1 și că butonul pune WELCOME5 singur în coș. Fiecare rulare a fluxului o vezi în View recent activity.

   Setările din App embeds țin doar de tema publicată. Dacă publici mai târziu altă temă, de exemplu tema de test, le refaci acolo: Forms pornit, theMarketer și Pop Convert oprite.
8. **Urmărești rezultatele.** Pagina Automations arată Reach, Sessions, Orders, Conversion rate și Sales (Acoperire, Sesiuni, Comenzi, Rată de conversie, Vânzări). Raportul fiecărui e-mail îl găsești în lista de activități > … > View report. În primele 3–7 zile te uiți zilnic în View recent activity.

**Abonații strânși între timp de theMarketer:** cei care s-au abonat din pop-up-ul theMarketer după import, până în ziua pornirii, nu sunt în Shopify. După pornire îi exporți din theMarketer și îi imporți doar pe cei cu acord, cu aceleași etichete (`import-themarketer` și `abonat-themarketer`). Condiția C0 îi ține afară din serie.

```text
Trigger: Customer subscribed to email marketing
→ [excluderea abonaților de la checkout, din șablon: o păstrezi]
→ Wait 5 minutes   (opțional, de testat)
→ Condition C0 (toate adevărate):
     marketingState = SUBSCRIBED
     customer.tags  None of  [import-themarketer, popup-oferta]
     customer.numberOfOrders = 0
   false → end
→ Send marketing email: E-mail 1 (ziua 0) · codul WELCOME5
→ Wait 2 days → Condition G [SUBSCRIBED AND numberOfOrders = 0] → Send marketing email: E-mail 2 (ziua 2)
→ Wait 2 days → G → Send marketing email: E-mail 3 (ziua 4)
→ Wait 3 days → G → Send marketing email: E-mail 4 (ziua 7)
→ Wait 3 days → G → Send marketing email: E-mail 5 (ziua 10)   ← pas adăugat de tine
   (G false → end: a comandat sau s-a dezabonat)
```

### Pop-up-ul standard de 5% (Shopify Forms)

Pop-up-ul de 5% îl faci în Shopify Forms. Doar abonările din formularele Shopify pornesc seria de bun venit. Forms nu e instalat încă: îl instalezi gratuit de pe apps.shopify.com/shopify-forms. Apoi: Apps > Forms > Create form > Popup form (Aplicații > Forms > Creare formular > Formular pop-up) > numele „Popup WELCOME5” > Create.

| Setare în Forms | Ce alegi sau ce scrii |
| --- | --- |
| Popup display (Afișare pop-up) | Overlay (Suprapunere) sau Floating (Flotant), cum arată mai bine pe site |
| Teaser > Show | „If the customer closes the form without subscribing”: rămâne un mic semn pe ecran, ca vizitatorul să poată redeschide pop-up-ul |
| Title (max. 50 de caractere) | 5% reducere la prima comandă (28 de caractere) |
| Content (max. 100 de caractere) | Lasă-ne adresa de e-mail și primești codul pe loc, plus ghidul săptămânii și ofertele noastre. (94 de caractere) |
| Câmpul de e-mail | Obligatoriu |
| Button label / Etichetă buton (max. 25 de caractere) | Vreau reducere! (15 caractere) |
| Marketing consent (Consimțământ pentru marketing) | „On form submission if a box is checked” (La trimiterea formularului, dacă este bifată o casetă). Verifici că bifa apare nebifată. |
| Textul bifei | Sunt de acord să primesc pe e-mail newsletterul și ofertele Prime Supplements. Dacă editorul nu te lasă să schimbi textul bifei (de testat), pui fraza la începutul disclaimerului. |
| Consent disclaimer (Disclaimer privind consimțământul) | Te poți dezabona oricând, dintr-un click, din orice e-mail. Detalii în [Politica de confidențialitate](https://primesupplements.ro/policies/privacy-policy). Codul WELCOME5: 5% la toată comanda, o singură utilizare per client, fără dată de expirare. |
| Tags (Etichete) | `popup-welcome5` |
| Success > Confirmation behavior: Show message (Afișare mesaj) | Bine ai venit în echipa Prime! Codul tău de 5% e mai jos. Ți-l trimitem și pe e-mail, în câteva minute. |
| Success > Discount (optional) / Reducere (opțional) | WELCOME5. Pop-up-ul doar îl afișează; e-mailul 1 îl trimite. |
| Behavior > Devices | Toate dispozitivele |
| Behavior > Pages | Toate paginile |
| Behavior > Trigger | A 2-a pagină vizualizată, imediat, ca pop-up-ul să nu acopere prima pagină pe care ajunge vizitatorul. Alternativă: prima pagină, după 10 secunde. |
| Exit intent | Pornit. Funcționează doar pe desktop. |
| Sign in with Shop | E pornit implicit. Îl oprești din setările formularului dacă nu vrei butonul Shop în pop-up. |
| Automations and workflows > Manage | Nu conectezi nimic. Seria pornește din declanșatorul ei. |
| Starea formularului | Save, apoi îl lași Inactive până în ziua pornirii (pasul 7 de mai sus) |

**Ce nu poate face pop-up-ul:** nu se poate ascunde de abonații existenți sau de clienții logați. Dacă cineva îl închide, Shopify ține minte asta doar pe acel dispozitiv. Nu se poate afișa doar pentru anumite linkuri sau UTM-uri.

Pop-up-ul vechi din temă, cel cu 10% pentru „clubul VIP”, rămâne oprit, ca să nu contrazică oferta de 5%.

### Dubla confirmare (double opt-in)

Auditul agenției cere dubla confirmare, iar analiza juridică o recomandă: așa poți dovedi că adresa e chiar a celui care s-a abonat. Nu o pornești pe ghicite: întâi faci testele de mai jos.

1. **Unde se pornește:** Settings > Notifications > Customer notifications > secțiunea Marketing double opt-in > Customer marketing confirmation (Setări > Notificări > Notificări pentru clienți > Confirmare dublă a abonării pentru marketing > Confirmare marketing client). Comutatorul exact îl confirmi pe ecran.
2. **Cum se comportă:** e-mailul de confirmare pleacă singur când cineva se abonează din magazinul online. Nu are voie să conțină reclamă. Cei abonați înainte de pornire nu trebuie să confirme.
3. **Textul din subsolul site-ului:** Online Store > ⋯ > Edit default theme content > Newsletter form > Confirmation (Editează conținutul temei implicite > Formular pentru newsletter > Confirmare). Scrii: „Verifică-ți e-mailul și confirmă abonarea. După confirmare îți trimitem codul WELCOME5.”
4. **Ce nu e clar încă (de testat):**
   - dacă Shopify Forms trimite e-mailul de confirmare. Un angajat Shopify a scris pe forumul pentru dezvoltatori că Forms nu are dublă confirmare, dar doi comercianți spun că au primit e-mailul;
   - dacă seria pornește cât timp abonatul nu a confirmat încă (starea PENDING) sau abia după confirmare.
5. **Testul:** pornești dubla confirmare și te abonezi cu două adrese personale noi, una din pop-up și una din subsolul site-ului. Verifici:
   - vine e-mailul de confirmare?
   - după ce apeși pe linkul de confirmare, vine e-mailul 1?
   - în View recent activity, rularea s-a oprit la condiția C0?
6. **Dacă Forms nu trimite confirmarea,** abonații din pop-up devin abonați direct, pe baza bifei de acord. Dovada acordului o păstrezi: fiecare trimitere a formularului rămâne în Apps > Forms > formularul > View submissions. Notează data și textul exact al bifei.
7. **Dacă Forms trimite confirmarea,** lași gol câmpul Discount din ecranul de succes al pop-up-ului și schimbi mesajul în: „Mulțumim! Verifică-ți e-mailul și confirmă abonarea. După confirmare îți trimitem codul WELCOME5.” Așa, codul ajunge la abonat abia după confirmare, cum recomandă analiza juridică.
8. **Dacă seria pornește înainte de confirmare,** condiția C0 o oprește, iar abonatul nu mai primește nimic. Atunci folosești varianta de rezervă, netestată încă:
   - creezi segmentul „Email · bun venit (rezervă)” în Customers > Segments (Clienți > Segmente):
     `email_subscription_status = 'SUBSCRIBED' AND number_of_orders = 0 AND customer_tags NOT CONTAINS 'import-themarketer' AND customer_tags NOT CONTAINS 'popup-oferta' AND customer_added_date >= -2d`
   - faci seria cu declanșatorul Customer joined segment (Client intrat în segment) pe acest segment și cu aceiași pași: în Apps > Flow > Create workflow (Creare flux de lucru) sau duplicând automatizarea și schimbându-i declanșatorul, dacă editorul permite (de testat). Seria cu declanșatorul vechi o oprești.
   - Etichetele rămân obligatoriu în segment, pentru că și clienții importați pot porni acest declanșator.
   - Rândul `customer_added_date >= -2d` păstrează în segment doar clienții creați în ultimele 2 zile. Nu e documentat dacă cei care sunt deja în segment la pornire primesc și ei seria. Fără acest rând, ar putea primi seria deodată o mare parte dintre cei 1.785 de abonați fără comenzi. Dezavantaj: un client mai vechi, fără comenzi, care se abonează abia acum nu intră în serie. De testat.
   - Rămâne activă o singură serie de bun venit.

### E-mail 1 · Codul de bun venit (imediat)

**Subiect, 3 variante:**

1. Codul tău de 5% e aici
2. Bun venit în echipa Prime. Uite cei 5% promiși
3. Ți-am promis 5%. Poftim codul.

**Preheader:** WELCOME5: 5% la prima comandă. Peste 300 de lei, livrarea e gratuită.

**Buton (CTA):** Folosește codul acum → `https://primesupplements.ro/discount/WELCOME5?redirect=/collections/suplimente-sala`

**Setări tehnice:**

- **Locul în flux:** primul pas Send marketing email, imediat după condiția C0, fără așteptare sau după pauza opțională de 5 minute. Cu dubla confirmare pornită, trebuie să plece abia după confirmare (de testat, vezi mai sus).
- **Secțiuni, în ordine:**
  - Header (logo-ul);
  - Text, până la „ne ținem de cuvânt:”;
  - Discount, cu WELCOME5, în locul rândului „Codul tău: WELCOME5”;
  - Text, de la „Îl scrii în coș” până la finalul listei de produse;
  - Button „Folosește codul acum”, cu linkul de mai sus;
  - Text, de la „Bine de știut” până la semnătură;
  - Text cu [Subsolul comun];
  - Footer.
- **De ce un buton separat:** secțiunea Discount doar afișează codul. Nu e documentat dacă butonul ei aplică singur codul, așa că folosești butonul tău, cu linkul care pune codul automat în coș. Linkul e cel de mai sus, gata de copiat. Shopify îl generează din Discounts > WELCOME5 > Promote > Get a shareable discount code > Copy link (Promovează > Obține un cod de reducere care poate fi distribuit > Copiați linkul), iar partea `?redirect=/collections/suplimente-sala` duce clientul direct la suplimente.

**Textul e-mailului:**

> Salut!
>
> Bine ai venit la Prime Supplements. Ți-am promis 5% reducere și ne ținem de cuvânt:
>
> **Codul tău: WELCOME5** [secțiunea Discount]
>
> Îl scrii în coș, la „Cod de reducere”, și primești 5% la toată comanda. Dacă apeși butonul de mai jos, codul se aplică singur. Se folosește o singură dată și nu expiră, așa că îl folosești când ești gata.
>
> Dacă nu știi de unde să începi, iată ce aleg cei mai mulți clienți:
>
> - **Prime Whey 2 kg:** 82 g de proteine la 100 g de produs, 66 de porții, 7 arome. Cea mai cumpărată proteină a noastră.
> - **Creatină Creapure®:** un singur ingredient, creatină monohidrat micronizată.
> - **Creamy Rice:** cremă de orez care se prepară fără fierbere, în 7 variante (6 arome și una fără aromă).
>
> **[ Folosește codul acum ]**
>
> **Bine de știut:**
>
> - Livrarea e gratuită la comenzile de peste 300 de lei, altfel costă 20 de lei. Cargus aduce coletul în 1–3 zile lucrătoare.
> - Plătești cu cardul, prin transfer bancar sau ramburs, la curier.
> - Ai o întrebare? Răspunde la acest e-mail sau scrie-ne pe WhatsApp la 0775 286 584. În timpul programului (luni–vineri, 8:00–18:00) răspundem în medie într-o oră.
>
> În zilele următoare îți trimitem câteva e-mailuri scurte: cine suntem, ce produse aleg sportivii și ce spun clienții despre noi.
>
> Te poți opune oricând e-mailurilor de marketing: apeși „Dezabonare” la finalul oricărui e-mail și nu mai primești e-mailuri de marketing de la noi.
>
> Spor la antrenament, Marius Chera, fondator Prime Supplements
>
> [Subsolul comun]

### E-mail 2 · Povestea și valorile noastre (ziua 2)

**Subiect, 3 variante:**

1. De ce am pornit Prime Supplements
2. Din Cisnădie, pentru oricine trage tare la sală
3. Ce înseamnă, de fapt, HARDCORE SPORTS NUTRITION

**Preheader:** Povestea pe scurt și cele trei lucruri după care ne ghidăm.

**Buton (CTA):** Cunoaște-l pe Marius → `https://primesupplements.ro/pages/autor-marius-chera`

**Setări tehnice:** Wait 2 days după e-mailul 1, apoi condiția G (SUBSCRIBED și 0 comenzi). Dacă a comandat între timp sau s-a dezabonat, seria se oprește aici. Secțiuni: Header, Text, Button „Cunoaște-l pe Marius”, Text (de la „Ne auzim în câteva zile”), Text cu [Subsolul comun], Footer.

**Textul e-mailului:**

> Salut!
>
> Sunt Marius Chera, antrenor de culturism și fondatorul Prime Supplements. Am pregătit sportivi care au obținut cardul PRO în organizația NPC, iar în 2022 am lansat Prime Supplements la Cisnădie, lângă Sibiu.
>
> Am pornit cu o misiune simplă: să educăm, să inspirăm și să ajutăm sportivii să performeze mai bine. De aici vine și motto-ul nostru, **HARDCORE SPORTS NUTRITION**. Nu e despre etichete care țipă, ci despre mentalitatea de a trage puțin mai tare decât data trecută.
>
> Ne ghidăm după trei lucruri:
>
> 1. **Spunem clar ce e în produs.** Pe fiecare etichetă găsești cantitățile pe porție, iar pe site, descrierea completă a ingredientelor.
> 2. **Alegem ingrediente de marcă.** Creatina noastră este Creapure®, carbohidrații din Cluster sunt Cluster Dextrin®, iar glutamina este Kyowa®. Sunt mărci pe care le poți verifica singur.
> 3. **Explicăm, nu doar vindem.** Pe blog găsești peste 120 de ghiduri gratuite despre proteine, creatină, vitamine și alimentație pentru sală. Dacă ai o întrebare, ne scrii și îți răspundem noi, de obicei într-o oră.
>
> Până acum am livrat peste 8.600 de comenzi în toată țara. Mulțumim că ești de-acum și tu în echipă.
>
> **[ Cunoaște-l pe Marius ]**
>
> Ne auzim în câteva zile cu produsele pe care le aleg cei mai mulți clienți.
>
> Marius
>
> P.S. Codul tău WELCOME5 e încă valabil: 5% la prima comandă.
>
> [Subsolul comun]

### E-mail 3 · Cele mai vândute produse (ziua 4)

**Subiect, 3 variante:**

1. Ce cumpără cel mai des clienții Prime
2. Top 5 produse Prime, pe scurt și pe înțeles
3. De aici încep cei mai mulți clienți Prime

**Preheader:** Clasamentul real al vânzărilor din ultimele 3 luni, cu nota dată de clienți.

**Buton (CTA):** Vezi cele mai vândute → `https://primesupplements.ro/discount/WELCOME5?redirect=/collections/suplimente-sala%3Fsort_by%3Dbest-selling`

**Setări tehnice:**

- **Locul în flux:** Wait 2 days după e-mailul 2, apoi condiția G.
- **Secțiuni:** Header, Text, Button „Vezi cele mai vândute”, Text (de la „Pe scurt, ce fac”), Text cu [Subsolul comun], Footer.
- **Produse cu imagine (opțional):** poți pune, între text și buton, o secțiune Product (Static) cu cele 5 produse din listă. La Creamy Rice alegi o singură aromă, de exemplu tort de ciocolată. Nu folosi Product (Dynamic, cele mai vândute): poate afișa Cluster, al cărui titlu din magazin conține încă denumirea veche.
- **Întreținere:** actualizezi notele și numărul de recenzii o dată pe trimestru, din Judge.me.

**Textul e-mailului:**

> Salut!
>
> Nu știi de unde să începi? Ne-am uitat în comenzile din ultimele trei luni. Acestea sunt produsele pe care clienții noștri le aleg cel mai des:
>
> **1. Prime Whey 2 kg** · nota 4,75 din 5, din 44 de recenzii. Proteină din zer concentrat, cu 82 g de proteine la 100 g de produs. O cutie are 66 de porții de aproximativ 30 g, în 7 arome. Există și varianta de 1 kg, cu 33 de porții.
>
> **2. Pure Isolate 2 kg** · nota 4,77 din 5, din 13 recenzii. Izolat din zer microfiltrat, cu enzimele digestive Digezyme®. 74 de porții de 27 g, în 7 arome.
>
> **3. Creatină Creapure®** · nota 5,0 din 5, din 17 recenzii. Un singur ingredient: creatină monohidrat micronizată, marca Creapure®. Pachet de 300 g (60 de porții) sau de 500 g (100 de porții).
>
> **4. Creamy Rice** · nota 5,0 din 5 la aroma tort de ciocolată, din 33 de recenzii. Cremă de orez pregelatinizată, care se prepară fără fierbere. 22 de porții la 1 kg, în 7 variante (6 arome și una fără aromă), de la caramel sărat la brioșă cu afine.
>
> **5. EAA** · nota 5,0 din 5, din 7 recenzii. Cei 8 aminoacizi esențiali, într-o pudră cu aromă. 83 de porții la 500 g, în 4 arome.
>
> **[ Vezi cele mai vândute ]**
>
> **Pe scurt, ce fac:** Proteinele contribuie la creșterea și la menținerea masei musculare. Creatina crește performanța fizică în eforturi succesive din timpul exercițiilor fizice de scurtă durată și de mare intensitate. Efectul benefic se obține la un consum zilnic de 3 g de creatină, iar produsul se adresează adulților care efectuează exerciții fizice de mare intensitate.
>
> Nu știi ce ți se potrivește? Răspunde la acest e-mail cu obiectivul tău (masă musculară, definire sau energie la antrenament) și îți recomandăm noi.
>
> Marius
>
> P.S. Cu WELCOME5 ai 5% la prima comandă, iar peste 300 de lei livrarea e gratuită.
>
> [Subsolul comun]

### E-mail 4 · Ce ne face diferiți (ziua 7)

**Subiect, 3 variante:**

1. Ce primești, de fapt, când comanzi de la Prime
2. Ingrediente cu nume, nu promisiuni
3. De ce aleg sportivii Prime (pe scurt)

**Preheader:** Ingrediente de marcă, cifre clare pe etichetă, livrare rapidă și oameni care îți răspund.

**Buton (CTA):** Descoperă gama completă → `https://primesupplements.ro/discount/WELCOME5?redirect=/collections/suplimente-sala`

**Setări tehnice:** Wait 3 days după e-mailul 3, apoi condiția G. Secțiuni: Header, Text, Button „Descoperă gama completă”, Text (P.S.), Text cu [Subsolul comun], Footer.

**Textul e-mailului:**

> Salut!
>
> Pe piață sunt sute de suplimente. Iată, concret, ce primești când alegi Prime:
>
> **Ingrediente de marcă, pe care le poți verifica.** Creatina este Creapure®, produsă în Germania. Carbohidrații din Cluster sunt Cluster Dextrin®, iar glutamina este Kyowa®, ambele mărci japoneze. Izolatul proteic conține enzimele Digezyme®.
>
> **Cifre clare.** Prime Whey are 82 g de proteine la 100 g. La fiecare produs găsești pe site cantitatea pe porție și numărul de porții din cutie, ca să calculezi singur cât te costă o porție.
>
> **Ceva pentru fiecare obiectiv.** Proteine, creatină, aminoacizi, pre-workout, cremă de orez și batoane proteice pentru sală, plus gama Prime Health, cu vitamine și minerale pentru zi cu zi.
>
> **Ghiduri gratuite.** Pe blog publicăm în fiecare zi articole despre nutriție și suplimente: cât să iei, când și cum să le combini.
>
> **Livrare rapidă.** Cargus îți aduce coletul în 1–3 zile lucrătoare, gratuit la comenzile de peste 300 de lei.
>
> **Oameni care îți răspund.** Ne scrii pe e-mail sau pe WhatsApp, iar în timpul programului îți răspundem în medie într-o oră.
>
> **[ Descoperă gama completă ]**
>
> Marius
>
> P.S. Ai întrebări înainte de prima comandă? Apasă „Răspunde” și scrie-ne. Codul WELCOME5 te așteaptă.
>
> [Subsolul comun]

### E-mail 5 · Recenzii și condiții clare (ziua 10)

**Subiect, 3 variante:**

1. 4,87 din 5: ce spun clienții Prime
2. Nu ne crede pe cuvânt. Citește-i pe ei.
3. 432 de recenzii și tot ce trebuie să știi înainte de comandă

**Preheader:** Recenzii de la cumpărători verificați, plus livrarea, plata și returul, pe scurt.

**Buton (CTA):** Alege-ți primul produs → `https://primesupplements.ro/discount/WELCOME5?redirect=/collections/suplimente-sala`

**Setări tehnice:**

- **Locul în flux:** Wait 3 days după e-mailul 4, apoi condiția G. Acest pas îl adaugi tu, pentru că șablonul are doar 4 e-mailuri.
- **Ultimul e-mail din serie:** după el, abonatul primește doar newsletterul și ofertele.
- **Secțiuni:** Header, Text, Button „Alege-ți primul produs”, Text (de la „Mulțumim că ai citit”), Text cu [Subsolul comun], Footer.
- **Citatele:** sunt reale, de la cumpărători verificați Judge.me. Am adăugat doar diacriticele și punctuația, iar „[…]” marchează o parte scurtată din recenzia lui Robert D.
- **Întreținere:** cifrele (432 de recenzii, nota 4,87, 249 de recenzii de la cumpărători verificați, nota 4,9) le actualizezi o dată pe trimestru, din Judge.me, împreună cu cele din e-mailul 3.

**Textul e-mailului:**

> Salut!
>
> Până acum, clienții noștri au lăsat 432 de recenzii pe Judge.me, cu nota medie 4,87 din 5. Dintre ele, 249 sunt de la cumpărători verificați, adică de la oameni care au comandat produsul, iar nota lor medie este 4,9.
>
> Câteva dintre ele:
>
> „Un produs foarte bun, aroma delicioasă, se omogenizează ușor.” Horatiu P., Prime Whey 2 kg, cumpărător verificat
>
> „Toate produsele sunt calitative, prețurile super accesibile […] pudrele proteice se amestecă foarte bine, au un gust extraordinar de bun, la fel și gama de aminoacizi.” Robert D., cumpărător verificat
>
> „Preț bun, calitatea e simplă de analizat: CREAPURE!” Eduard P., Creatină Creapure®, cumpărător verificat
>
> **Ce știi sigur când comanzi de la noi:**
>
> - **Livrare:** prin Cargus, în 1–3 zile lucrătoare. Gratuită peste 300 de lei, altfel 20 de lei.
> - **Plată:** cu cardul (prin Netopia), prin transfer bancar sau ramburs, la curier.
> - **Retur:** ca la orice cumpărătură online, ai 14 zile să te răzgândești. Transportul la retur îl plătești tu, iar suplimentele desigilate nu se mai pot returna, din motive de igienă.
> - **Ajutor:** contact@primesupplements.ro sau 0775 286 584 (și WhatsApp), luni–vineri, 8:00–18:00.
>
> **[ Alege-ți primul produs ]**
>
> Mulțumim că ai citit până aici. De acum îți scriem doar când avem ceva util: un ghid nou pe blog sau o ofertă reală.
>
> Marius
>
> P.S. WELCOME5 e încă al tău: 5% la prima comandă, fără dată de expirare.
>
> [Subsolul comun]

## 2. Abandon navigare (2 e-mailuri)

Un abonat pe care Shopify îl recunoaște s-a uitat la un produs, dar nu l-a pus în coș. Primul e-mail îi arată din nou produsul și îl ajută să aleagă, iar al doilea îi dă motive concrete de încredere, fără reducere.

| E-mail | Când pleacă | Tema |
| --- | --- | --- |
| 1 | La aproximativ 4 ore după ce pleacă de pe site | Produsul văzut și ce verifici înainte să alegi |
| 2 | La aproximativ 48 de ore (44 de ore după e-mailul 1), doar dacă n-a pus nimic în coș, n-a început checkout-ul și n-a comandat | Încredere: recenzii reale, comenzi, ingrediente de marcă |

**Ce răspunde auditului:** agenția a găsit că e-mailurile vechi de navigare nu folosesc produsul la care s-a uitat clientul. Aici, secțiunea Abandoned browse (Navigare abandonată) pune automat produsul văzut în ambele e-mailuri. Logo-ul, culorile și fontul sunt aceleași ca în restul e-mailurilor.

**Cine intră și cine nu:**

- **Intră:** un abonat la e-mail care a deschis cel puțin o pagină de produs și a plecat de pe site fără să pună nimic în coș. Shopify pornește fluxul doar pentru clienții pe care îi recunoaște. Cum îi recunoaște nu e documentat. Așteptările se numără de la pornirea declanșatorului, iar Shopify nu spune cât durează până pornește după plecarea de pe site.
- **Doar abonați:** automatizările Shopify trimit implicit doar abonaților la marketing prin e-mail, iar condiția G verifică asta din nou înaintea fiecărui e-mail. Cine nu s-a abonat nu primește nimic, chiar dacă are cont sau a mai comandat.
- **Nu intră:**
  - cine a primit în ultimele 14 zile un e-mail de abandon: de checkout, de coș sau de navigare (regula e deja în șablonul Shopify);
  - cine s-a uitat la un produs cu eticheta `fara-email-navigare` (pasul 3);
  - opțional, abonații noi, cu 0 comenzi, care sunt încă în seria de bun venit (pasul 4).
- **Iese din flux** când pune ceva în coș, începe checkout-ul, plasează o comandă sau se dezabonează (condiția G, de testat la pasul 8). Dacă ajunge la checkout, preia fluxul de checkout abandonat. Fluxul de coș preia doar dacă pune ceva în coș înainte de e-mailul 1. După e-mailul 1, regula de 14 zile nu lasă fluxul de coș să pornească.
- **Cookie-uri:** pentru urmărirea vizitelor, legea cere acordul vizitatorului pentru cookie-urile de marketing (Legea 506/2004). Înainte de pornire, verifici că bannerul de cookie-uri al site-ului cere acest acord.

**Ordinea între fluxurile de abandon: checkout, apoi coș, apoi navigare.** Nimeni nu primește două serii de abandon în același timp:

- Navigarea și coșul pornesc din același declanșator, dar fiecare flux ia doar tipul lui de abandon (BROWSE sau CART). O vizită intră într-un singur flux.
- Dacă clientul merge mai departe (pune ceva în coș sau începe checkout-ul), condiția G oprește acest flux înaintea următorului e-mail (de testat, pasul 8).
- Regula de 14 zile: după un e-mail de navigare, clientul nu intră 14 zile nici în fluxul de coș, nici într-un nou flux de navigare. Pentru checkout, Shopify nu menționează această regulă, așa că cine ajunge la checkout primește e-mailurile de checkout.

**Ce s-a schimbat față de varianta veche:**

- **Fără numele produsului în subiect și în preheader.** Shopify nu îl poate pune acolo. Produsul apare doar în corpul e-mailului, în secțiunea Abandoned browse.
- **Salut fără prenume.** Mulți abonați din pop-up nu au prenume în Shopify, așa că e-mailurile încep cu „Salut!”.
- **Ambele ghiduri, la toată lumea.** Textul e-mailului nu știe din ce colecție e produsul văzut, așa că toată lumea primește și ghidul despre proteină, și pe cel despre crema de orez.
- **Reintrare după 14 zile,** după regula Shopify, în loc de 7 zile.
- **Fără priorități automate față de alte fluxuri.** Shopify nu are o setare care să amâne sau să oprească un e-mail pentru că clientul e în alt flux. Pentru seria de bun venit ai condiția opțională de la pasul 4. Un client care a comandat de curând poate primi totuși un e-mail de navigare.
- **Cost:** e-mailurile de navigare intră în cele 10.000 de e-mailuri gratuite pe lună.

**Cum îl construiești în Shopify:**

1. **Verifici că nu mai există alt flux de navigare.** În Apps > Messaging > Automations (Aplicații > Messaging > Automatizări), dacă găsești altă automatizare de navigare abandonată pornită, o oprești. Te uiți și în Growth > Autopilot: Autopilot poate crea singur o automatizare de navigare, care ar rula în paralel cu a ta. Lucrezi pe calculator: pe telefon, automatizările nu se pot edita.
2. **Creezi fluxul din șablon.** Apps > Messaging > Automations > Create automation (Creare automatizare) > „Convert abandoned product browse” > canalul Email. Nu îl pornești încă: când Shopify îți cere, alegi Save without turning on (Salvați fără a activa). Apoi deschizi automatizarea > Edit workflow (Editează fluxul de lucru).
3. **Scoți produsele care nu se potrivesc.** Secțiunea Abandoned browse arată titlul produsului din magazin. Titlul lui Cluster conține încă denumirea pe care nu o folosim în e-mailuri, iar alte titluri sună a efect asupra sănătății. Pui eticheta `fara-email-navigare` (Products > produsul > Tags) pe:
   - Cluster, Recovery Glutamin, Recovery BCAA, Fat Burning Booster Shot, Thermo Core, Energy Pump Shot, Water Out (capsule și tinctură), Testo Revive, Cardio Calm și Liver Protect. Rămân scoase până le redenumești sau le verifică un jurist;
   - produsele din colecțiile Îmbrăcăminte și Accesorii, pentru că textele sunt scrise pentru suplimente și alimente.

   În flux, după condiția de tip și regula de 14 zile (vezi schița), adaugi condiția P: `abandonment.productsViewed` None of (Niciunul dintre), cu criteriul `product.tags` Equal to (Egal cu) `fara-email-navigare`. Pe ramura „false” nu pui nimic. De testat: nu e verificat că editorul îți arată acest câmp. Dacă nu ți-l arată, pornești fluxul abia după ce redenumești Cluster și produsele cu nume de efect. Îmbrăcămintea și accesoriile rămân atunci în flux.
4. **Opțional: îi ții deoparte pe abonații din seria de bun venit.** Ei primesc deja 5 e-mailuri în 10 zile, cu cele mai vândute produse și cu recenziile.
   - În Customers > Segments (Clienți > Segmente) creezi segmentul „Email · bun venit în curs (10 zile)”, cu interogarea de mai jos. Aceeași interogare a fost deja verificată pe magazin.

     `email_subscription_status = 'SUBSCRIBED' AND number_of_orders = 0 AND customer_added_date >= -10d AND customer_tags NOT CONTAINS 'import-themarketer'`
   - În flux, după condiția P, adaugi acțiunea Look up customer in segment (Căutare client în segment) cu acest segment, apoi o condiție: dacă clientul e în segment, fluxul se încheie.
   - Limită: segmentul se uită la data la care clientul a fost creat în Shopify, nu la data abonării. Un client mai vechi, fără comenzi, care se abonează abia acum nu e prins de el.
5. **Pui așteptările și condițiile**, după schița de mai jos:
   - **Condiția de tip:** `abandonment.abandonmentType` Equal to (Egal cu) BROWSE, imediat după declanșator, dacă șablonul nu o are deja.
   - **Regula de 14 zile** din șablon o lași acolo unde e, înaintea e-mailului 1. Nu o copiezi și înaintea e-mailului 2: e-mailul 1 contează și el ca e-mail de navigare și l-ar putea bloca pe al doilea.
   - **Wait 4 hours** (Așteptare). Dacă editorul nu are ore, pui 240 de minute.
   - **Condiția G**, cu trei rânduri legate prin AND (ȘI):
     - starea de marketing Equal to SUBSCRIBED. În listă apare `defaultEmailAddress.marketingState` sau `emailMarketingConsent.marketingState`; o alegi pe cea afișată;
     - `customerHasNoOrderSinceAbandonment` cu valoarea care înseamnă „n-a comandat” (de testat: numele și descrierea câmpului se contrazic);
     - `abandonment.mostRecentStep` Equal to BROWSE.

     Pe ramura „false” nu pui nimic, așa că fluxul se încheie.
   - **E-mailul 1** (Send marketing email / Trimitere e-mail de marketing), apoi **Wait 44 hours** (2640 de minute), din nou **G**, apoi **e-mailul 2**. Pașii de e-mail nu se pot copia: îl construiești pe fiecare de la zero.

   La final apeși Apply changes (Aplică modificările).
6. **Pui textele în e-mailuri.** La fiecare pas de e-mail: Edit, apoi Subject (una dintre cele 3 variante), Preview text (preheaderul) și secțiunile din „Setări tehnice”, apoi Save > Exit. Logo-ul, culorile și fontul vin din Apps > Messaging > Templates > Manage branding. Fiecare e-mail se termină cu o secțiune Text cu [Subsolul comun], deasupra secțiunii Footer. Shopify nu are test A/B: folosești o variantă de subiect 2–4 săptămâni, apoi următoarea, și compari rata de click.
7. **Pornești fluxul** în aceeași zi cu celelalte fluxuri de abandon, ultimul: întâi checkout-ul, apoi coșul, apoi navigarea. Apeși Turn on automation (Activați automatizarea).
8. **Testezi cu adrese personale abonate**, cu care ești logat în contul de client pe site și cu cookie-urile acceptate în banner. Pentru fiecare test în care primești un e-mail îți trebuie altă adresă, din cauza regulii de 14 zile.
   - **Adresa 1, primul test:** te uiți doar la un produs cu eticheta `fara-email-navigare` și pleci de pe site. Nu trebuie să vină nimic, iar în View recent activity rularea se oprește la condiția P.
   - **Adresa 1, al doilea test:** te uiți la un produs obișnuit și pleci de pe site (așa descrie Shopify testul pentru acest declanșator). După aproximativ 4 ore trebuie să vină e-mailul 1, cu produsul corect. Verifici unde duc imaginea și butonul secțiunii Abandoned browse. Dacă rularea s-a oprit la G, în View recent activity vezi ce valoare a avut `customerHasNoOrderSinceAbandonment` și o corectezi în G. După încă aproximativ 44 de ore trebuie să vină e-mailul 2.
   - **Adresa 2:** te uiți la un produs și pleci. După e-mailul 1 pui produsul în coș și începi checkout-ul. În View recent activity verifici că rularea de navigare s-a oprit la G înainte de e-mailul 2 și că primești e-mailurile de checkout. Dacă rularea de navigare nu s-a oprit, adaugi în G rândul `isMostSignificantAbandonment` Equal to true (de testat).
   - **Adresa 3:** te uiți la un produs și pleci, iar după e-mailul 1 plasezi o comandă de test. E-mailul 2 nu mai trebuie să vină.
9. **Urmărești rezultatele** în pagina Automations: Reach, Sessions, Orders, Conversion rate și Sales (Acoperire, Sesiuni, Comenzi, Rată de conversie, Vânzări). Raportul fiecărui e-mail îl găsești în lista de activități > … > View report. În primele 3–7 zile te uiți zilnic în View recent activity.

```text
Trigger: Customer left online store without making a purchase
→ Condition: abandonment.abandonmentType = BROWSE
→ [regula de 14 zile din șablon: o păstrezi, o singură dată, înaintea e-mailului 1]
→ Condition P: abandonment.productsViewed  None of  [product.tags = fara-email-navigare]   (de testat)
   false → end
→ (opțional) Look up customer in segment: „Email · bun venit în curs (10 zile)”
   → Condition: e în segment → end
→ Wait 4 hours   (sau 240 minutes)
→ Condition G (toate adevărate):
     marketingState = SUBSCRIBED
     customerHasNoOrderSinceAbandonment = „n-a comandat”   (de testat)
     abandonment.mostRecentStep = BROWSE
   false → end
→ Send marketing email: E-mail 1 · Produsul văzut (secțiunea Abandoned browse)
→ Wait 44 hours   (sau 2640 minutes) → G
→ Send marketing email: E-mail 2 · Recenzii și dovezi concrete
   (G false → end: a pus în coș, a început checkout-ul, a comandat sau s-a dezabonat)
```

### E-mail 1 · Produsul văzut (la 4 ore)

**Subiect, 3 variante:**

1. Te ajutăm să alegi?
2. Încă te gândești la produsul văzut?
3. Patru lucruri de verificat înainte să alegi

**Preheader:** Porția, durata pachetului, modul de folosire și aroma. Plus o recomandare de la noi.

**Buton (CTA):** Vezi din nou produsul → `[linkul spre produs din secțiunea Abandoned browse]`

**Setări tehnice:**

- **Locul în flux:** după Wait 4 hours și condiția G. Înainte de trimitere, G verifică din nou că e abonat, că n-a pus nimic în coș, că n-a început checkout-ul și că n-a comandat.
- **Secțiuni, în ordine:**
  - Header (logo-ul);
  - Text, de la „Salut!” până la „Mai devreme te-ai uitat pe site la acest produs:”;
  - Abandoned browse (Navigare abandonată): produsul văzut. În e-mailul de test verifici ce afișează secțiunea, unde duce și dacă are buton. Dacă îi poți schimba textul butonului, scrii „Vezi din nou produsul”. Dacă nu are buton, rândul „[ Vezi din nou produsul ]” din text dispare;
  - Text, de la „Dacă nu te-ai hotărât încă” până la semnătură;
  - Custom Liquid (Liquid personalizat), cu P.S.-ul de mai jos. Secțiunile Custom Liquid se adaugă doar de pe calculator;
  - Text cu [Subsolul comun];
  - Footer.
- **Prețul:** dacă secțiunea afișează prețul, e prețul actual din magazin. Nu adaugi preț tăiat sau „preț vechi”.
- **Ghidurile:** apar amândouă la toată lumea, pentru că textul e-mailului nu știe din ce colecție e produsul văzut.
- **P.S.-ul cu WELCOME5** apare doar clienților cu 0 comenzi. Codul pentru secțiunea Custom Liquid (de testat cu un e-mail de test):

```liquid
{% if customer.orders_count == 0 %}
<p>P.S. Prima comandă la noi? Cu codul <strong>WELCOME5</strong> ai 5% reducere la toată comanda. Îl scrii la „Cod de reducere” când plasezi comanda. Se folosește o singură dată, fără comandă minimă, și nu expiră.</p>
{% endif %}
```

**Textul e-mailului:**

> Salut!
>
> Mai devreme te-ai uitat pe site la acest produs:
>
> [Secțiunea Abandoned browse: produsul văzut]
>
> **[ Vezi din nou produsul ]**
>
> Dacă nu te-ai hotărât încă, e normal. Un produs pe care îl iei zi de zi merită ales cu atenție. Uite ce să verifici pe pagina lui:
>
> 1. **Ce conține o porție.** Pe pagină găsești cantitățile pe porție și ingredientele.
> 2. **Câte porții are pachetul.** Împarte numărul de porții la câte porții iei pe zi și afli pentru câte zile îți ajunge.
> 3. **Cum se folosește.** Modul de folosire e scris pe pagină și pe etichetă. La suplimente găsești acolo și doza zilnică recomandată, pe care nu o depășești.
> 4. **Aroma.** Dacă produsul are mai multe arome, alege una care chiar îți place. Dacă are recenzii, vezi acolo ce spun alți clienți despre gust.
>
> Ai o afecțiune medicală, ești însărcinată sau iei medicamente? Discută cu medicul înainte să iei un supliment nou.
>
> **Nu știi dacă ți se potrivește?** Răspunde la acest e-mail cu obiectivul tău (masă musculară, definire sau energie la antrenament) și îți recomandăm noi. Ne poți scrie și pe WhatsApp, la 0775 286 584. Luni–vineri, 8:00–18:00, răspundem în medie într-o oră.
>
> **Două ghiduri care te ajută să alegi:**
>
> - **Câtă proteină pe zi: calcul pe greutate și obiectiv.** Îți calculezi necesarul în doi pași și vezi cât din el acoperi din mâncare. [Citește ghidul →](https://primesupplements.ro/blogs/news/cata-proteina-trebuie-zi-calcul-greutate-obiectiv)
> - **Cum alegi crema de orez: pregelatinizare și absorbție.** De ce contează procesarea și ce verifici pe etichetă. [Citește ghidul →](https://primesupplements.ro/blogs/news/cum-alegi-crema-de-orez)
>
> **Bine de știut:** livrarea e gratuită la comenzile de peste 300 de lei, altfel costă 20 de lei. Cargus aduce coletul în 1–3 zile lucrătoare.
>
> Spor la antrenament, Marius Chera, fondator Prime Supplements
>
> [Doar pentru clienții cu 0 comenzi, secțiunea Custom Liquid:] P.S. Prima comandă la noi? Cu codul WELCOME5 ai 5% reducere la toată comanda. Îl scrii la „Cod de reducere” când plasezi comanda. Se folosește o singură dată, fără comandă minimă, și nu expiră.
>
> [Subsolul comun]

### E-mail 2 · Recenzii și dovezi concrete (la 48 de ore)

**Subiect, 3 variante:**

1. Ce spun cei care au comandat deja de la Prime
2. 432 de recenzii și nota medie 4,87 din 5
3. Ingredientele de marcă din produsele Prime

**Preheader:** Recenzii de la cumpărători verificați, peste 8.600 de comenzi și mărcile pe care le folosim.

**Buton (CTA):** Vezi cele mai vândute → `https://primesupplements.ro/collections/suplimente-sala?sort_by=best-selling`

**Setări tehnice:**

- **Locul în flux:** după Wait 44 hours și condiția G (în total, aproximativ 48 de ore de la pornirea fluxului). Ultimul e-mail din flux. Fără reducere și fără WELCOME5.
- **Secțiuni, în ordine:**
  - Header (logo-ul);
  - Text, de la „Salut!” până la „…în ordinea vânzărilor:”;
  - Button „Vezi cele mai vândute”, cu linkul de mai sus;
  - Text: „Dacă încă te interesează, produsul pe care l-ai văzut e aici:”;
  - Abandoned browse (Navigare abandonată), din nou cu produsul văzut;
  - Text, de la „Acesta e ultimul e-mail” până la semnătură;
  - Text cu [Subsolul comun];
  - Footer.
- **Citatele** sunt reale, de la cumpărători verificați Judge.me. Am adăugat doar diacriticele, punctuația și majusculele.
- **O dată pe trimestru** actualizezi numărul de recenzii, notele și numărul de comenzi, din Judge.me și din Shopify.

**Textul e-mailului:**

> Salut!
>
> Acum două zile te-ai uitat la un produs pe site-ul nostru. Înainte să comanzi online, e firesc să vrei să știi cu cine ai de-a face. Așa că îți las aici câteva fapte pe care le poți verifica.
>
> **Ce spun clienții.** Pe Judge.me avem 432 de recenzii, cu nota medie 4,87 din 5. Dintre ele, 249 sunt de la cumpărători verificați, adică de la oameni care au comandat produsul, iar nota lor medie este 4,9. Câteva dintre ele:
>
> „Un produs foarte bun, aroma delicioasă, se omogenizează ușor.” Horatiu P., Prime Whey 2 kg, cumpărător verificat
>
> „Produsul a fost așa cum a fost descris.” Andrei O., Creatină Creapure®, cumpărător verificat
>
> „Toate produsele sunt calitative, prețurile super accesibile. Recomand cu tot dragul toate suplimentele cât și accesoriile de la Prime. Am doar cuvinte de laudă: pudrele proteice se amestecă foarte bine, au un gust extraordinar de bun, la fel și gama de aminoacizi.” Robert D., cumpărător verificat
>
> **Peste 8.600 de comenzi.** Am pornit în 2022, la Cisnădie, lângă Sibiu. De atunci am livrat peste 8.600 de comenzi în toată țara.
>
> **Ingrediente de marcă.** Le găsești numite pe pagina fiecărui produs:
>
> - Creatina Creapure® are un singur ingredient: creatină monohidrat micronizată, marca **Creapure®**.
> - Carbohidrații din Cluster, băutura noastră intra-workout, sunt **Cluster Dextrin®**.
> - L-glutamina noastră este **Kyowa®**.
> - Izolatul proteic Pure Isolate conține enzimele **Digezyme®**.
>
> Cum a spus-o pe scurt un client: „Preț bun, calitatea e simplă de analizat: CREAPURE!” Eduard P., Creatină Creapure®, cumpărător verificat
>
> **Oameni care îți răspund.** Ne scrii la contact@primesupplements.ro sau pe WhatsApp, la 0775 286 584. Luni–vineri, 8:00–18:00, îți răspundem în medie într-o oră.
>
> Vrei să vezi ce aleg cei mai mulți clienți? Aici găsești suplimentele noastre, în ordinea vânzărilor:
>
> **[ Vezi cele mai vândute ]**
>
> Dacă încă te interesează, produsul pe care l-ai văzut e aici:
>
> [Secțiunea Abandoned browse: produsul văzut]
>
> Acesta e ultimul e-mail pe care ți-l trimitem despre acest produs. Dacă ai o întrebare, apasă „Răspunde” și scrie-ne.
>
> Marius
>
> [Subsolul comun]

## 3. Abandon coș (2 e-mailuri)

Un abonat a pus produse în coș, dar n-a început checkout-ul. Două e-mailuri scurte îi arată ce a ales, îi oferă ajutor și îi spun cât costă livrarea, cum poate plăti și în cât timp ajunge coletul.

| E-mail | Când pleacă | Tema |
| --- | --- | --- |
| 1 | La aproximativ 1 oră după ce pleacă de pe site cu produse în coș | Memento prietenos, cu produsele din coș și oferta de ajutor |
| 2a | La aproximativ 24 de ore (23 de ore după e-mailul 1), dacă produsele din coș au împreună cel puțin 300 de lei | Livrare, plată și ajutor, pe scurt |
| 2b | La aproximativ 24 de ore (23 de ore după e-mailul 1), dacă produsele din coș au împreună sub 300 de lei | Livrare, plată și ajutor, pe scurt |

Fiecare client primește cel mult două e-mailuri: e-mailul 1 și una dintre variantele 2a sau 2b.

**Ce răspunde auditului:** agenția a găsit două automatizări de coș abandonat active în paralel, pe același declanșator. Aceiași clienți primeau e-mailuri duble, iar vânzările se împărțeau în rapoarte între cele două. Aici rămâne o singură automatizare de coș, cu același logo, aceleași culori și același font ca restul e-mailurilor.

**Un singur flux pentru coș:**

- În Apps > Messaging > Automations (Aplicații > Messaging > Automatizări) verifici că nu mai există altă automatizare de coș abandonat pornită. Te uiți și în Growth > Autopilot: Autopilot poate crea singur un flux de coș, care ar rula în paralel cu al tău.
- Cele două automatizări de coș din theMarketer le oprești în ziua în care pornești fluxul din Shopify (pasul 5), ca nimeni să nu primească e-mailuri din două locuri.
- Rămân active doar acest flux și fluxul separat de checkout abandonat (secțiunea 4).

**Cine intră și cine nu:**

- **Intră:** un abonat la e-mail care a adăugat cel puțin un produs în coș și a plecat de pe site fără să înceapă checkout-ul. Shopify pornește fluxul doar pentru clienții pe care îi recunoaște. Cum îi recunoaște nu e documentat. Așteptările se numără de la pornirea declanșatorului, iar Shopify nu spune cât durează până pornește după plecarea de pe site.
- **Doar abonați:** coșul abandonat e tot marketing. Automatizările Shopify trimit implicit doar abonaților la marketing prin e-mail, iar condiția G verifică asta din nou înaintea fiecărui e-mail. Cine nu s-a abonat nu primește nimic, chiar dacă are cont sau a mai comandat.
- **Nu intră:** cine a primit în ultimele 14 zile un e-mail de abandon: de checkout, de coș sau de navigare (regula e deja în șablonul Shopify). Asta înseamnă și că un client care a primit de curând un e-mail de navigare nu primește e-mailuri de coș. Dacă ajunge la checkout, primește e-mailurile de checkout.
- **Iese din flux** când începe checkout-ul (de aici preia fluxul de checkout abandonat), plasează o comandă sau se dezabonează. Pentru golirea coșului Shopify nu are o condiție documentată, așa că nu o verificăm.
- **Cookie-uri:** pentru urmărirea coșului, legea cere acordul vizitatorului pentru cookie-urile de marketing (Legea 506/2004). Înainte de pornire, verifici că bannerul de cookie-uri al site-ului cere acest acord.

**Ordinea între fluxurile de abandon: checkout, apoi coș, apoi navigare.** Nimeni nu primește două serii de abandon în același timp:

- Coșul și navigarea pornesc din același declanșator, dar fiecare flux ia doar tipul lui de abandon (CART sau BROWSE). O vizită cu produse în coș intră doar aici. Dacă același client aștepta deja un e-mail de navigare, acel flux se oprește la condiția lui G (de testat în secțiunea 2).
- Cine începe checkout-ul iese din acest flux la următoarea condiție G, pentru că pasul cel mai recent nu mai e CART (de testat, pasul 6). De acolo primește doar e-mailurile de checkout. Așadar, primește cel mult un e-mail de coș, apoi preia checkout-ul.
- Cine a primit un e-mail de checkout nu intră 14 zile în acest flux.

**Ce s-a schimbat față de varianta veche:**

- **Fără suma care lipsește până la 300 de lei.** Textul unui e-mail de coș nu are acces la prețuri. Valoarea coșului o calculează fluxul (pasul Run code), iar fluxul alege una dintre două variante ale e-mailului 2: 2a, de la 300 de lei, sau 2b, sub 300 de lei.
- **Fără prenume în subiecte.** Nu toți clienții au prenume în Shopify, iar în subiect ar rămâne un gol sau un cuvânt pus în locul numelui. În corpul e-mailului, salutul folosește prenumele doar dacă există.
- **Reintrare după 14 zile,** după regula Shopify, în loc de 7 zile.
- **Fără amânarea seriei de bun venit.** Shopify nu are o setare care să amâne un e-mail de bun venit din cauza coșului. Un abonat nou care lasă un coș poate primi în aceeași zi ambele e-mailuri. Coșul arată o intenție clară de cumpărare, așa că îl lăsăm să plece.
- **Cost:** e-mailurile de coș intră în cele 10.000 de e-mailuri gratuite pe lună. Doar automatizarea de checkout abandonat e gratuită.

**Cum îl construiești în Shopify:**

1. **Verifici că rămâne un singur flux de coș,** ca mai sus. Lucrezi pe calculator: pe telefon, automatizările nu se pot edita.
2. **Creezi fluxul din șablon.** Apps > Messaging > Automations > Create automation (Creare automatizare) > „Recover abandoned cart” (Recuperare coș abandonat) > canalul Email. Nu îl pornești încă: când Shopify îți cere, alegi Save without turning on (Salvați fără a activa). Apoi deschizi automatizarea > Edit workflow (Editează fluxul de lucru).
3. **Pui pașii fluxului**, după schița de mai jos:
   - **Condiția de tip:** `abandonment.abandonmentType` Equal to (Egal cu) CART, imediat după declanșator, dacă șablonul nu o are deja.
   - **Regula de 14 zile** din șablon o lași acolo unde e, înaintea e-mailului 1. Nu o copiezi și înaintea e-mailului 2: e-mailul 1 contează și el ca e-mail de coș și l-ar putea bloca pe al doilea.
   - **Wait 1 hour** (Așteptare). Dacă editorul nu are ore, pui 60 de minute.
   - **Condiția G**, cu trei rânduri legate prin AND (ȘI):
     - starea de marketing Equal to SUBSCRIBED. În listă apare `defaultEmailAddress.marketingState` sau `emailMarketingConsent.marketingState`; o alegi pe cea afișată;
     - `customerHasNoOrderSinceAbandonment` cu valoarea care înseamnă „n-a comandat” (de testat: numele și descrierea câmpului se contrazic);
     - `abandonment.mostRecentStep` Equal to CART.

     Pe ramura „false” nu pui nimic, așa că fluxul se încheie.
   - **E-mailul 1** (Send marketing email / Trimitere e-mail de marketing).
   - **Wait 23 hours** (1380 de minute), apoi din nou **G**.
   - **Run code** (Rulare cod), cu cele trei căsuțe completate ca în blocul „Run code” de mai jos. Îl pui după Wait, nu înainte: rezultatele calculate înainte de o așteptare nu mai sunt disponibile după ea.
   - **Condiția:** rezultatul Run code `cartValue` Less than (Mai mic decât) 300. Pe ramura „true” pui e-mailul 2b (sub 300 de lei), pe ramura „false” pui e-mailul 2a (de la 300 de lei).
   - Pașii de e-mail nu se pot copia: îl construiești pe fiecare de la zero.

   La final apeși Apply changes (Aplică modificările).
4. **Pui textele în e-mailuri.** La fiecare pas de e-mail: Edit, apoi Subject (una dintre cele 3 variante), Preview text (preheaderul) și secțiunile din „Setări tehnice”, apoi Save > Exit. Sub Header vine salutul, din blocul „Salutul cu prenume” de mai jos. Logo-ul, culorile și fontul vin din Apps > Messaging > Templates > Manage branding. Fiecare e-mail se termină cu o secțiune Text cu [Subsolul comun], deasupra secțiunii Footer. Shopify nu are test A/B: folosești o variantă de subiect 2–4 săptămâni, apoi următoarea, și compari rata de click.
5. **Pornești fluxul** în aceeași zi cu celelalte fluxuri de abandon: întâi checkout-ul, apoi coșul, apoi navigarea. Apeși Turn on automation (Activați automatizarea). În aceeași zi oprești cele două automatizări de coș din theMarketer.
6. **Testezi cu adrese personale abonate**, cu care ești logat în contul de client pe site și cu cookie-urile acceptate în banner. Pentru fiecare test îți trebuie altă adresă, din cauza regulii de 14 zile.
   - **Adresa 1:** pui în coș produse de sub 300 de lei și pleci de pe site. După aproximativ o oră trebuie să vină e-mailul 1, cu produsele corecte și cu butonul care deschide coșul. Dacă rularea s-a oprit la G, în View recent activity vezi ce valoare a avut `customerHasNoOrderSinceAbandonment` și o corectezi în G. După aproximativ 24 de ore trebuie să vină 2b. În View recent activity vezi ce valoare a calculat Run code.
   - **Adresa 2:** la fel, cu produse de peste 300 de lei. Trebuie să vină 2a.
   - **Adresa 3:** pui în coș, pleci, iar după e-mailul 1 începi checkout-ul și pleci din nou. În View recent activity verifici că rularea de coș s-a oprit la G înainte de e-mailul 2 și că primești e-mailurile de checkout. Dacă rularea de coș nu s-a oprit, adaugi în G rândul `isMostSignificantAbandonment` Equal to true (de testat).
   - **Adresa 4:** pui în coș, pleci, iar după e-mailul 1 plasezi o comandă de test. E-mailul 2 nu mai trebuie să vină.
7. **Urmărești rezultatele** în pagina Automations: Reach, Sessions, Orders, Conversion rate și Sales (Acoperire, Sesiuni, Comenzi, Rată de conversie, Vânzări). Raportul fiecărui e-mail îl găsești în lista de activități > … > View report. În primele 3–7 zile te uiți zilnic în View recent activity.

**Salutul cu prenume.** E același în toate e-mailurile din acest flux și din fluxul de checkout. Îl pui într-o secțiune Custom Liquid (Liquid personalizat), imediat sub Header. Secțiunile Custom Liquid se adaugă doar de pe calculator. De testat cu un e-mail de test:

```liquid
<p>{% if customer.first_name != blank %}Salut, {{ customer.first_name }}!{% else %}Salut!{% endif %}</p>
```

**Run code: ce copiezi în cele trei căsuțe.** Formatul exact îl verifici în editor (de testat).

Input query:

```graphql
query { abandonment { productsAddedToCart { quantity variant { price } } } }
```

Output (rezultatul):

```graphql
type Output {
  cartValue: Float!
}
```

Codul:

```javascript
export default function main(input) {
  const items = input.abandonment?.productsAddedToCart ?? [];
  const cartValue = items.reduce(
    (s, i) => s + Number(i.variant?.price ?? 0) * (i.quantity ?? 0), 0);
  return { cartValue };
}
```

Codul înmulțește prețul fiecărui produs cu cantitatea și adună totul. Probabil folosește prețul din magazin, înainte de orice cod de reducere (de testat). De aceea, e-mailul 2a nu promite livrare gratuită: spune doar că produsele ajung la pragul de 300 de lei.

```text
Trigger: Customer left online store without making a purchase
→ Condition: abandonment.abandonmentType = CART
→ [regula de 14 zile din șablon: o păstrezi, o singură dată, înaintea e-mailului 1]
→ Wait 1 hour   (sau 60 minutes)
→ Condition G (toate adevărate):
     marketingState = SUBSCRIBED
     customerHasNoOrderSinceAbandonment = „n-a comandat”   (de testat)
     abandonment.mostRecentStep = CART   (dacă a ajuns la checkout, preia fluxul de checkout)
   false → end
→ Send marketing email: E-mail 1 · Memento prietenos (secțiunea Abandoned cart)
→ Wait 23 hours   (sau 1380 minutes) → G
→ Run code: cartValue = suma (preț × cantitate) din productsAddedToCart
→ Condition: cartValue Less than 300
   true  → Send marketing email: E-mail 2b · sub 300 de lei
   false → Send marketing email: E-mail 2a · de la 300 de lei
   (G false → end: a început checkout-ul, a comandat sau s-a dezabonat)
```

### E-mail 1 · Memento prietenos (la 1 oră)

**Subiect, 3 variante:**

1. Ce ai pus în coș e tot acolo
2. Ai nevoie de un sfat pentru coșul tău?
3. Ai ceva de lămurit înainte să comanzi?

**Preheader:** Produsele alese sunt în coș. Pentru aromă sau gramaj, răspunde-ne și te ajutăm.

**Buton (CTA):** Vezi coșul → `[butonul din secțiunea Abandoned cart, care deschide coșul]`

**Setări tehnice:**

- **Locul în flux:** după Wait 1 hour și condiția G. Înainte de trimitere, G verifică din nou că e abonat, că n-a început checkout-ul și că n-a comandat.
- **Secțiuni, în ordine:**
  - Header (logo-ul);
  - Custom Liquid cu salutul (blocul „Salutul cu prenume”);
  - Text: „Ai adăugat produse în coș, dar n-ai trecut încă la comandă. Iată ce ai ales:”;
  - Abandoned cart (Coș abandonat): primele 5 produse din coș și butonul spre coș. Dacă îi poți schimba textul butonului, scrii „Vezi coșul”;
  - Text, de la „Nu te-ai hotărât încă?” până la semnătură;
  - Text cu [Subsolul comun];
  - Footer.
- **Prețul:** dacă secțiunea afișează prețul, e prețul din magazin. Nu adaugi preț tăiat sau „preț vechi”.
- **Fără reducere** și fără WELCOME5 în acest e-mail.

**Textul e-mailului:**

> Salut, [Prenume]! [secțiunea Custom Liquid cu salutul; fără prenume: „Salut!”]
>
> Ai adăugat produse în coș, dar n-ai trecut încă la comandă. Iată ce ai ales:
>
> [Secțiunea Abandoned cart: produsele din coș]
>
> **[ Vezi coșul ]**
>
> Nu te-ai hotărât încă? Întreabă-ne orice: ce aromă să iei, ce gramaj ți se potrivește sau cum combini produsele. Răspunde la acest e-mail sau scrie-ne pe WhatsApp, la 0775 286 584, și îți explicăm pe înțeles.
>
> Spor la antrenament, Echipa Prime Supplements
>
> [Subsolul comun]

### E-mail 2a · Livrare, plată și ajutor, coș de la 300 de lei (la 24 de ore)

**Subiect, 3 variante:**

1. Poți plăti și ramburs, la livrare
2. Bine de știut înainte să comanzi
3. Coletul ajunge în 1–3 zile lucrătoare

**Preheader:** Livrare gratuită peste 300 de lei. La întrebări îți răspunde cineva din echipă.

**Buton (CTA):** Mergi la coș → `[butonul din secțiunea Abandoned cart, care deschide coșul]`

**Setări tehnice:**

- **Locul în flux:** ramura „false” a condiției `cartValue` Less than 300, adică produse de cel puțin 300 de lei. Vine după Wait 23 hours și G (în total, aproximativ 24 de ore de la pornirea fluxului). Ultimul e-mail din flux.
- **Secțiuni, în ordine:**
  - Header (logo-ul);
  - Custom Liquid cu salutul (blocul „Salutul cu prenume”);
  - Text: „Revenim pe scurt la coșul tău:”;
  - Abandoned cart (Coș abandonat), cu butonul spre coș. Dacă îi poți schimba textul butonului, scrii „Mergi la coș”;
  - Text, de la „Înainte să comanzi” până la „…în medie într-o oră.”;
  - Custom Liquid cu rândul WELCOME5 (codul de mai jos);
  - Text, de la „Nu e nicio grabă” până la semnătură;
  - Text cu [Subsolul comun];
  - Footer.
- **Rândul despre prag:** spune doar că produsele ajung la pragul de 300 de lei. Nu promite livrare gratuită, pentru că valoarea e calculată din prețurile din magazin, înainte de eventualele coduri de reducere. Costul final al livrării clientul îl vede în checkout.
- **Rândul cu WELCOME5** apare doar clienților cu 0 comenzi. Fără altă reducere. Codul pentru secțiunea Custom Liquid (de testat cu un e-mail de test):

```liquid
{% if customer.orders_count == 0 %}
<p>Prima comandă la noi? Cu codul <strong>WELCOME5</strong> ai 5% la toată comanda. Îl scrii la „Cod de reducere”. Se folosește o singură dată și nu expiră.</p>
{% endif %}
```

**Textul e-mailului:**

> Salut, [Prenume]! [secțiunea Custom Liquid cu salutul; fără prenume: „Salut!”]
>
> Revenim pe scurt la coșul tău:
>
> [Secțiunea Abandoned cart: produsele din coș]
>
> **[ Mergi la coș ]**
>
> Înainte să comanzi, iată ce e bine de știut:
>
> **Livrare gratuită peste 300 de lei.** Sub această sumă, livrarea costă 20 de lei. Produsele din coșul tău ajung la pragul de 300 de lei pentru livrare gratuită. Costul final al livrării îl vezi în checkout, înainte să plătești.
>
> **Plătești cum preferi.** Cu cardul, prin transfer bancar sau ramburs, la curier, dacă nu vrei să plătești online.
>
> **Coletul ajunge în 1–3 zile lucrătoare.** Îl aduce Cargus, până la ușa ta.
>
> **Vorbești cu un om.** Răspunde la acest e-mail, scrie-ne la contact@primesupplements.ro sau pe WhatsApp, la 0775 286 584. Luni–vineri, 8:00–18:00, îți răspunde cineva din echipă în medie într-o oră.
>
> [Doar pentru clienții cu 0 comenzi, secțiunea Custom Liquid:] Prima comandă la noi? Cu codul WELCOME5 ai 5% la toată comanda. Îl scrii la „Cod de reducere”. Se folosește o singură dată și nu expiră.
>
> Nu e nicio grabă. Când ești gata, butonul de mai sus îți deschide coșul.
>
> Spor la antrenament, Echipa Prime Supplements
>
> [Subsolul comun]

### E-mail 2b · Livrare, plată și ajutor, coș sub 300 de lei (la 24 de ore)

**Subiect, 3 variante:**

1. Poți plăti și ramburs, la livrare
2. Bine de știut înainte să comanzi
3. Coletul ajunge în 1–3 zile lucrătoare

**Preheader:** Livrare gratuită peste 300 de lei. La întrebări îți răspunde cineva din echipă.

**Buton (CTA):** Mergi la coș → `[butonul din secțiunea Abandoned cart, care deschide coșul]`

**Setări tehnice:**

- **Locul în flux:** ramura „true” a condiției `cartValue` Less than 300, adică produse de sub 300 de lei. Vine după Wait 23 hours și G (în total, aproximativ 24 de ore de la pornirea fluxului). Ultimul e-mail din flux.
- **Secțiuni, în ordine:** aceleași ca la e-mailul 2a:
  - Header (logo-ul);
  - Custom Liquid cu salutul (blocul „Salutul cu prenume”);
  - Text: „Revenim pe scurt la coșul tău:”;
  - Abandoned cart (Coș abandonat), cu butonul spre coș („Mergi la coș”, dacă îi poți schimba textul);
  - Text, de la „Înainte să comanzi” până la „…în medie într-o oră.”;
  - Custom Liquid cu rândul WELCOME5 (același cod ca la 2a);
  - Text, de la „Nu e nicio grabă” până la semnătură;
  - Text cu [Subsolul comun];
  - Footer.
- **Rândul despre prag:** nu scrie suma exactă care lipsește, pentru că textul e-mailului nu are acces la prețurile din coș.
- **Rândul cu WELCOME5** apare doar clienților cu 0 comenzi. Fără altă reducere. Codul pentru secțiunea Custom Liquid (de testat cu un e-mail de test):

```liquid
{% if customer.orders_count == 0 %}
<p>Prima comandă la noi? Cu codul <strong>WELCOME5</strong> ai 5% la toată comanda. Îl scrii la „Cod de reducere”. Se folosește o singură dată și nu expiră.</p>
{% endif %}
```

**Textul e-mailului:**

> Salut, [Prenume]! [secțiunea Custom Liquid cu salutul; fără prenume: „Salut!”]
>
> Revenim pe scurt la coșul tău:
>
> [Secțiunea Abandoned cart: produsele din coș]
>
> **[ Mergi la coș ]**
>
> Înainte să comanzi, iată ce e bine de știut:
>
> **Livrare gratuită peste 300 de lei.** Sub această sumă, livrarea costă 20 de lei. Coșul tău e încă sub acest prag. Dacă mai ai nevoie de ceva, îl poți adăuga acum, iar peste 300 de lei livrarea e gratuită.
>
> **Plătești cum preferi.** Cu cardul, prin transfer bancar sau ramburs, la curier, dacă nu vrei să plătești online.
>
> **Coletul ajunge în 1–3 zile lucrătoare.** Îl aduce Cargus, până la ușa ta.
>
> **Vorbești cu un om.** Răspunde la acest e-mail, scrie-ne la contact@primesupplements.ro sau pe WhatsApp, la 0775 286 584. Luni–vineri, 8:00–18:00, îți răspunde cineva din echipă în medie într-o oră.
>
> [Doar pentru clienții cu 0 comenzi, secțiunea Custom Liquid:] Prima comandă la noi? Cu codul WELCOME5 ai 5% la toată comanda. Îl scrii la „Cod de reducere”. Se folosește o singură dată și nu expiră.
>
> Nu e nicio grabă. Când ești gata, butonul de mai sus îți deschide coșul.
>
> Spor la antrenament, Echipa Prime Supplements
>
> [Subsolul comun]

## 4. Checkout abandonat (3 e-mailuri)

Un abonat a ajuns la checkout, și-a scris adresa de e-mail și n-a terminat comanda. Primul e-mail îl ajută să se întoarcă, al doilea îi răspunde la întrebări, iar al treilea îl anunță cinstit că e ultimul memento.

| E-mail | Când pleacă | Tema |
| --- | --- | --- |
| 1 | La 1 oră după abandon | Memento simplu, cu produsele din coș |
| 2 | La 24 de ore | Răspunsuri la obiecții: livrare, plată, retur, ajutor |
| 3a | La 72 de ore, dacă unul dintre produse are între 1 și 9 bucăți în stoc | Ultimul memento, cu mențiunea despre stocul redus și recenzii reale |
| 3b | La 72 de ore, în toate celelalte cazuri | Ultimul memento, cu recenzii reale |

Fiecare client primește cel mult trei e-mailuri: 1, 2 și una dintre variantele 3a sau 3b. Shopify consideră un checkout abandonat când rămâne nefinalizat mai mult de 10 minute după ce clientul și-a scris adresa de e-mail.

**Ce arată magazinul acum** (ultimele 30 de zile, citite pe 13 octombrie 2026): 75 de checkout-uri abandonate. E-mailul standard Shopify a plecat la 7 dintre ele, la aproximativ 10 ore, și niciun checkout n-a fost recuperat. Doar 16 dintre acești clienți sunt abonați la e-mail, deci doar ei pot primi e-mailurile de mai jos. Ca să poți recupera mai mulți, bifa de abonare la e-mail din checkout trebuie să apară și să fie nebifată implicit: pentru România nu are voie să fie bifată din oficiu.

**Ce răspunde auditului:** agenția a găsit că lipsește automatizarea pentru checkout abandonat, deși aici sunt clienții cu cea mai mare intenție de cumpărare. Shopify trimite acum un singur e-mail standard. Aici devin 3 e-mailuri, la 1, 24 și 72 de ore, cu același logo, aceleași culori și același font ca restul e-mailurilor.

**Cine primește și cine nu:**

- **Doar abonați la marketing prin e-mail.** Câmpul To: (Către:) din e-mail rămâne pe valoarea implicită, doar abonații. Nu îl schimbi în All customers (Toți clienții): checkout-ul abandonat e tot marketing, iar fără acord nu avem voie să trimitem. Condiția G verifică din nou abonarea înaintea fiecărui e-mail.
- **Shopify nu trimite e-mailul** când:
  - clientul a comandat înainte de trimitere;
  - niciun produs din checkout nu mai e disponibil;
  - toate produsele sunt gratuite și nu se adaugă cost de livrare;
  - checkout-ul vine din aplicația Shop;
  - Shopify Payments l-a blocat ca risc mare;
  - clientul a abandonat între timp un checkout mai nou, iar așteptarea acestuia nu s-a terminat.
- **Unde funcționează:** doar pentru magazinul online și Buy Button.
- **Iese din flux** când plasează comanda sau se dezabonează (condiția G).

**Ordinea între fluxurile de abandon: checkout, apoi coș, apoi navigare.** Checkout-ul are întâietate:

- Cine ajunge la checkout iese din fluxurile de navigare și de coș la următoarea lor condiție G, apoi primește doar e-mailurile de aici.
- Cine a primit un e-mail de checkout nu intră 14 zile în fluxurile de navigare și de coș (regula din șabloanele lor).
- Pentru checkout, Shopify nu menționează regula de 14 zile, așa că fluxul pornește și dacă clientul a primit de curând un e-mail de coș sau de navigare.

**Cost:** Shopify spune că automatizările de checkout abandonat sunt mereu gratuite și nu intră în cele 10.000 de e-mailuri pe lună. Nu e confirmat dacă și e-mailurile 2 și 3, adăugate de tine, sunt gratuite. Verifici pe prima factură, la rândul „Marketing emails”.

**Ce s-a schimbat față de varianta veche:**

- **Două fluxuri în loc de unul.** În documentul vechi, „Coș abandonat” acoperea și coșul, și checkout-ul. Acum coșul are fluxul lui (secțiunea 3), iar checkout-ul îl are pe acesta.
- **Fără numele produsului în subiect și în preheader.** Shopify nu îl poate pune acolo. Produsele apar în corpul e-mailului, în secțiunea Abandoned checkout.
- **Fără prenume în subiecte.** Nu toți clienții au prenume în Shopify, iar în subiect ar rămâne un gol sau un cuvânt pus în locul numelui. În corpul e-mailului, salutul folosește prenumele doar dacă există.
- **Fără suma exactă care lipsește până la 300 de lei.** Rândul despre livrare are două variante, alese automat după valoarea comenzii.
- **Fără numele produsului și numărul de bucăți în e-mailul 3.** Textul e-mailului nu are acces la stoc. Fluxul citește stocul real și alege între 3a și 3b.
- **WELCOME5 doar pentru clienții cu 0 comenzi.** Textul e-mailului nu poate verifica dacă cineva a folosit deja codul, așa că verificăm numărul de comenzi.
- **Un singur sistem de e-mailuri de checkout.** Automatizarea nouă ia locul e-mailului standard (verifici la pasul 5). Nu rulezi niciodată ambele.

**Cum îl construiești în Shopify:**

1. **Vezi ce versiune rulează acum.** Deschizi Apps > Messaging > Automations (Aplicații > Messaging > Automatizări):
   - **versiunea veche** se numește „Abandoned checkout emails by Shopify” (E-mailuri pentru plăți abandonate de la Shopify). Setările ei sunt la Show actions > Edit settings (Editați setările). Datele din magazin sugerează că pleacă la aproximativ 10 ore, doar la abonați;
   - **versiunea nouă** e o automatizare „Abandoned checkout”. Dacă o ai deja, sari la pasul 4.

   Lucrezi pe calculator: pe telefon, automatizările nu se pot edita.
2. **Pregătești textele** de mai jos înainte de pasul 3, pentru că pasul 3 pornește automatizarea imediat.
3. **Treci pe automatizarea nouă.** Apps > Messaging > Automations > View templates > Abandoned checkout > Edit (Vizualizare șabloane > Plată abandonată > Editare). Pui textul e-mailului 1 și verifici că To: a rămas pe abonați. Apoi apeși Turn on automation > Continue (Activare automatizare > Continuare).
   - **Pasul e definitiv:** nu te mai poți întoarce la e-mailul vechi.
   - Setările tale vechi se păstrează (aproximativ 10 ore, doar abonați), așa că faci pasul 4 imediat după.
   - Nu creezi o a doua automatizare de checkout, de exemplu din șablonul „Recover abandoned checkout”: ar trimite e-mailuri duble. Te uiți și în Growth > Autopilot, ca Autopilot să nu fi creat una proprie.
4. **Extinzi fluxul la 3 e-mailuri.** Selectezi Abandoned checkout > Edit, iar fluxul se deschide în Flow. Pașii, după schița de mai jos:
   - **Așteptarea de la început** devine Wait 1 hour (Așteptare). Dacă editorul nu are ore, pui 60 de minute.
   - **Condiția G**, imediat după, cu două rânduri legate prin AND (ȘI):
     - starea de marketing Equal to (Egal cu) SUBSCRIBED. În listă apare `defaultEmailAddress.marketingState` sau `emailMarketingConsent.marketingState`; o alegi pe cea afișată;
     - `customerHasNoOrderSinceAbandonment` cu valoarea care înseamnă „n-a comandat” (de testat: numele și descrierea câmpului se contrazic).

     Pe ramura „false” nu pui nimic, așa că fluxul se încheie.
   - **E-mailul 1**, cel existent în automatizare.
   - **Wait 23 hours** (1380 de minute), din nou **G**, apoi **e-mailul 2** (Send marketing email / Trimitere e-mail de marketing).
   - **Wait 48 hours** (2880 de minute), din nou **G**, apoi **condiția L** (stocul), cu un rând At least one of (Cel puțin unul dintre) pe produsele din checkout (`abandonment.abandonedCheckoutPayload.lineItems`). În el pui trei criterii pentru același produs, cu Add criteria for same item (Adăugare criterii pentru același articol):
     - `variant.inventoryQuantity` Less than (Mai mic decât) 10;
     - `variant.inventoryQuantity` Greater than (Mai mare decât) 0, ca un produs epuizat sau fără stoc urmărit să nu fie numit „stoc redus”;
     - `variant.inventoryQuantity` is not empty. Fără acest rând, un produs fără valoare de stoc ar trece drept „stoc redus”, pentru că la AND un câmp gol contează ca adevărat.
   - Pe ramura „true” pui e-mailul 3a, pe ramura „false” e-mailul 3b.
   - Pașii de e-mail nu se pot copia: îl construiești pe fiecare de la zero.

   La final apeși Turn on workflow (Activare flux de lucru). Rulările care așteaptă deja continuă după fluxul modificat.
5. **Verifici că versiunea veche nu mai e activă,** în Apps > Messaging > Automations.
6. **Pui textele în e-mailuri.** La fiecare pas de e-mail: Edit, apoi Subject (una dintre cele 3 variante), Preview text (preheaderul) și secțiunile din „Setări tehnice”, apoi Save > Exit. Sub Header vine salutul, din blocul „Salutul cu prenume” de mai jos. Logo-ul, culorile și fontul vin din Apps > Messaging > Templates > Manage branding. Fiecare e-mail se termină cu o secțiune Text cu [Subsolul comun], deasupra secțiunii Footer. Shopify nu are test A/B: folosești o variantă de subiect cel puțin o lună (sunt puțini destinatari pe lună), apoi următoarea, și compari rata de click.
7. **Testezi cu o adresă personală abonată, imediat după pasul 4.** Primul e-mail 2 pleacă abia după 24 de ore, deci ai timp să corectezi pragul. Pe clientul tău de test pui eticheta `test-email` (Customers > clientul > Tags). Faci un checkout real, îți scrii adresa și pleci fără să plătești.
   - **Unitatea subtotalului (obligatoriu înainte să plece primul e-mail 2):** pui temporar în e-mailul 1 o secțiune Custom Liquid care arată subtotalul doar clientului cu eticheta `test-email`, ca ceilalți clienți să nu vadă nimic:
     `{% if customer.tags contains 'test-email' %}<p>{{ abandoned_checkout.subtotal_price }}</p>{% endif %}`
     Lași în checkout produse de o valoare cunoscută, de exemplu 150 de lei. Dacă în e-mail apare 150 (sau 150.00), pragul din codul e-mailului 2 rămâne 300. Dacă apare 15000, schimbi 300 în 30000. Apoi ștergi secțiunea de test.
   - **Dacă la test rândul despre livrare iese mereu la fel,** comparația din Liquid nu funcționează. Varianta de rezervă: în Flow pui o condiție pe subtotal (`abandonedCheckoutPayload.subtotalPriceSet.shopMoney.amount`) și două e-mailuri 2 separate, unul pentru fiecare variantă. Ramurile nu se pot uni la loc, așa că fiecare ramură are nevoie de propriile Wait 48 hours, G, condiția L și e-mailurile 3a și 3b, construite de mână.
   - **Valoarea câmpului „n-a comandat”:** dacă e-mailul 1 nu vine și rularea s-a oprit la G, în View recent activity vezi ce valoare a avut `customerHasNoOrderSinceAbandonment` la acest test, fără comandă, și o pui pe aceea în G.
   - **Reducerile:** faci un checkout de puțin peste 300 de lei, aplici un cod care îl coboară sub 300 și verifici ce variantă a rândului despre livrare primești în e-mailul 2. Nu e verificat dacă subtotalul e înainte sau după reduceri.
   - **Stocul:** în View recent activity vezi pe ce ramură a condiției L a mers rularea, 3a sau 3b, și compari cu stocul real al produselor din checkout.
   - **Comanda:** la un alt test plasezi comanda după e-mailul 1. Fluxul trebuie să se oprească.
8. **Urmărești rezultatele** în pagina Automations: Reach, Sessions, Orders, Conversion rate și Sales (Acoperire, Sesiuni, Comenzi, Rată de conversie, Vânzări). Raportul fiecărui e-mail îl găsești în lista de activități > … > View report. În primele 3–7 zile te uiți zilnic în View recent activity.

**Salutul cu prenume.** E același în toate e-mailurile din acest flux și din fluxul de coș. Îl pui într-o secțiune Custom Liquid (Liquid personalizat), imediat sub Header. Secțiunile Custom Liquid se adaugă doar de pe calculator. De testat cu un e-mail de test:

```liquid
<p>{% if customer.first_name != blank %}Salut, {{ customer.first_name }}!{% else %}Salut!{% endif %}</p>
```

```text
Trigger: Customer abandons checkout
→ Wait 1 hour   (sau 60 minutes; înainte era aproximativ 10 ore)
→ Condition G (toate adevărate):
     marketingState = SUBSCRIBED
     customerHasNoOrderSinceAbandonment = „n-a comandat”   (de testat)
   false → end
→ Send marketing email: E-mail 1 · Memento (secțiunea Abandoned checkout)
→ Wait 23 hours   (sau 1380 minutes) → G
→ Send marketing email: E-mail 2 · Răspunsuri la obiecții
     (Custom Liquid: livrarea după subtotal, sub 300 / de la 300; WELCOME5 doar la 0 comenzi)
→ Wait 48 hours   (sau 2880 minutes) → G
→ Condition L: abandonment.abandonedCheckoutPayload.lineItems  At least one of
     [variant.inventoryQuantity Less than 10
      AND (Add criteria for same item) variant.inventoryQuantity Greater than 0
      AND (Add criteria for same item) variant.inventoryQuantity is not empty]
   true  → Send marketing email: E-mail 3a · Ultimul memento, cu stoc redus
   false → Send marketing email: E-mail 3b · Ultimul memento
   (G false → end: a comandat sau s-a dezabonat)
```

### E-mail 1 · Memento (la 1 oră)

**Subiect, 3 variante:**

1. Ai uitat ceva în coș?
2. Produsele tale te așteaptă în coș
3. Coșul tău e salvat. Continui de unde ai rămas?

**Preheader:** Produsele tale sunt încă acolo, la un click distanță.

**Buton (CTA):** Finalizează comanda → `[butonul din secțiunea Abandoned checkout, care duce înapoi la checkout]`

**Setări tehnice:**

- **Locul în flux:** după Wait 1 hour și condiția G.
- **Secțiuni, în ordine:**
  - Header (logo-ul);
  - Custom Liquid cu salutul;
  - Text: „Ai lăsat câteva produse în coș. Le-am salvat, ca să continui de unde ai rămas:”;
  - Abandoned checkout (Plată abandonată): produsele din checkout și butonul care duce înapoi la checkout. Dacă îi poți schimba textul butonului, scrii „Finalizează comanda”;
  - Text, de la „S-a întâmplat ceva la plată” până la semnătură;
  - Text cu [Subsolul comun];
  - Footer.
- Dacă e-mailul automatizării vine cu alte secțiuni, le înlocuiești cu cele de mai sus.
- **Fără reducere** în acest e-mail.

**Textul e-mailului:**

> Salut, [Prenume]! [secțiunea Custom Liquid cu salutul; fără prenume: „Salut!”]
>
> Ai lăsat câteva produse în coș. Le-am salvat, ca să continui de unde ai rămas:
>
> [Secțiunea Abandoned checkout: produsele din coș]
>
> **[ Finalizează comanda ]**
>
> S-a întâmplat ceva la plată sau ai o întrebare despre aromă, gramaj ori doză? Răspunde la acest e-mail sau scrie-ne pe WhatsApp la 0775 286 584 și te ajutăm să termini comanda.
>
> Echipa Prime Supplements
>
> [Subsolul comun]

### E-mail 2 · Răspunsuri la obiecții (la 24 de ore)

**Subiect, 3 variante:**

1. Ai întrebări despre comandă? Avem răspunsuri
2. Livrare, plată, retur: tot ce trebuie să știi
3. Te ajutăm să alegi?

**Preheader:** Livrare în 1–3 zile lucrătoare, plată la curier și răspuns în medie într-o oră, luni–vineri.

**Buton (CTA):** Mă întorc la coș → `[butonul din secțiunea Abandoned checkout, care duce înapoi la checkout]`

**Setări tehnice:**

- **Locul în flux:** după Wait 23 hours și condiția G (în total, 24 de ore de la abandon).
- **Secțiuni, în ordine:**
  - Header (logo-ul);
  - Custom Liquid cu salutul;
  - Text: „Produsele din coș sunt încă acolo. Dacă te-a oprit ceva, poate te ajută răspunsurile de mai jos.”;
  - Custom Liquid cu răspunsul „Cât costă livrarea?” (primul cod de mai jos);
  - Text, cu întrebările de la „Când ajunge?” până la „Nu știu ce aromă sau ce gramaj să aleg.”;
  - Abandoned checkout (Plată abandonată), cu butonul spre checkout. Dacă îi poți schimba textul butonului, scrii „Mă întorc la coș”;
  - Custom Liquid cu rândul WELCOME5 (al doilea cod de mai jos);
  - Text cu semnătura;
  - Text cu [Subsolul comun];
  - Footer.
- **Rândul despre livrare** are două variante, după subtotalul comenzii: de la 300 de lei sau sub 300 de lei. Unitatea subtotalului nu e documentată: faci testul din pasul 7 înainte să plece primul e-mail 2 și, dacă e nevoie, schimbi 300 în 30000. În ultimele 30 de zile, 26 dintre checkout-urile abandonate au fost de cel puțin 300 de lei și 49 sub această sumă.
- **Varianta de la 300 de lei nu promite livrare gratuită,** pentru că nu e verificat dacă subtotalul e înainte sau după codurile de reducere, iar 33 din cele 75 de checkout-uri aveau un cod. Dacă testul din pasul 7 arată că subtotalul e după reduceri, poți scrie în loc: „Pentru comanda ta, livrarea e gratuită.”
- **Rândul cu WELCOME5** apare doar clienților cu 0 comenzi. Fără altă reducere.
- Ambele coduri sunt de testat cu un e-mail de test.

```liquid
{% if abandoned_checkout.subtotal_price >= 300 %}
<p><strong>„Cât costă livrarea?”</strong> Comanda ta ajunge la pragul de 300 de lei pentru livrare gratuită. Costul final al livrării îl vezi în checkout, înainte să plătești.</p>
{% else %}
<p><strong>„Cât costă livrarea?”</strong> Livrarea costă 20 de lei, iar peste 300 de lei e gratuită. Dacă mai adaugi produse și treci de 300 de lei, nu mai plătești transportul.</p>
{% endif %}
```

```liquid
{% if customer.orders_count == 0 %}
<p>Nu uita: cu codul <strong>WELCOME5</strong> ai 5% reducere la prima comandă. Îl scrii la „Cod de reducere”, în checkout.</p>
{% endif %}
```

**Textul e-mailului:**

> Salut, [Prenume]! [secțiunea Custom Liquid cu salutul; fără prenume: „Salut!”]
>
> Produsele din coș sunt încă acolo. Dacă te-a oprit ceva, poate te ajută răspunsurile de mai jos.
>
> **„Cât costă livrarea?”** [Custom Liquid, după subtotal. De la 300 de lei:] Comanda ta ajunge la pragul de 300 de lei pentru livrare gratuită. Costul final al livrării îl vezi în checkout, înainte să plătești. [Sub 300 de lei:] Livrarea costă 20 de lei, iar peste 300 de lei e gratuită. Dacă mai adaugi produse și treci de 300 de lei, nu mai plătești transportul.
>
> **„Când ajunge?”** Cargus livrează în 1–3 zile lucrătoare de la comandă.
>
> **„Pot plăti la livrare?”** Da, ramburs, la curier. Poți plăti și cu cardul sau prin transfer bancar.
>
> **„Dacă mă răzgândesc?”** Ca la orice cumpărătură online, ai 14 zile pentru retur, cât timp produsul e sigilat. Transportul la retur îl plătești tu.
>
> **„Nu știu ce aromă sau ce gramaj să aleg.”** Scrie-ne. Răspundem în medie într-o oră, luni–vineri, 8:00–18:00.
>
> [Secțiunea Abandoned checkout: produsele din coș]
>
> **[ Mă întorc la coș ]**
>
> [Doar pentru clienții cu 0 comenzi, secțiunea Custom Liquid:] Nu uita: cu codul WELCOME5 ai 5% reducere la prima comandă. Îl scrii la „Cod de reducere”, în checkout.
>
> Echipa Prime Supplements
>
> [Subsolul comun]

### E-mail 3a · Ultimul memento, cu stoc redus (la 72 de ore)

**Subiect, 3 variante:**

1. Ultimul memento despre coșul tău
2. Mai vrei produsele din coș?
3. Încă te gândești? Uite ce spun clienții noștri

**Preheader:** După acest e-mail nu-ți mai scriem despre coș. Produsele din el nu se rezervă.

**Buton (CTA):** Finalizează comanda acum → `[butonul din secțiunea Abandoned checkout, care duce înapoi la checkout]`

**Setări tehnice:**

- **Locul în flux:** ramura „true” a condiției L, după Wait 48 hours și G (în total, 72 de ore de la abandon). Ultimul e-mail din flux.
- **Fraza despre stoc** e adevărată în momentul trimiterii: fluxul a citit stocul real chiar înainte. Nu numește produsul și nu dă un număr exact, pentru că textul e-mailului nu are acces la stoc. Nu scrii niciodată un număr de mână.
- **Secțiuni, în ordine:**
  - Header (logo-ul);
  - Custom Liquid cu salutul;
  - Text, de la „Acesta e ultimul e-mail” până la „…din 432 de recenzii pe Judge.me.”;
  - Abandoned checkout (Plată abandonată), cu butonul spre checkout. Dacă îi poți schimba textul butonului, scrii „Finalizează comanda acum”;
  - Text, de la „Dacă ai decis să nu comanzi acum” până la semnătură;
  - Text cu [Subsolul comun];
  - Footer.
- **O dată pe trimestru** actualizezi nota medie și numărul de recenzii, din Judge.me.

**Textul e-mailului:**

> Salut, [Prenume]! [secțiunea Custom Liquid cu salutul; fără prenume: „Salut!”]
>
> Acesta e ultimul e-mail despre coșul tău. Nu vrem să te sâcâim.
>
> Un singur lucru bun de știut: produsele din coș nu se rezervă, așa că disponibilitatea lor se poate schimba. Unul dintre produsele din coșul tău are stoc redus: când am trimis acest e-mail, mai erau sub 10 bucăți.
>
> Clienții noștri ne-au dat nota medie 4,87 din 5, din 432 de recenzii pe Judge.me.
>
> [Secțiunea Abandoned checkout: produsele din coș]
>
> **[ Finalizează comanda acum ]**
>
> Dacă ai decis să nu comanzi acum, e în regulă. Rămânem aici pentru când ai nevoie, cu ghiduri gratuite pe blog și cu răspunsuri la orice întrebare.
>
> Echipa Prime Supplements
>
> [Subsolul comun]

### E-mail 3b · Ultimul memento (la 72 de ore)

**Subiect, 3 variante:**

1. Ultimul memento despre coșul tău
2. Mai vrei produsele din coș?
3. Încă te gândești? Uite ce spun clienții noștri

**Preheader:** După acest e-mail nu-ți mai scriem despre coș. Produsele din el nu se rezervă.

**Buton (CTA):** Finalizează comanda acum → `[butonul din secțiunea Abandoned checkout, care duce înapoi la checkout]`

**Setări tehnice:**

- **Locul în flux:** ramura „false” a condiției L, după Wait 48 hours și G (în total, 72 de ore de la abandon). Ultimul e-mail din flux.
- **Fără nicio frază despre stoc**, pentru că niciun produs din checkout nu are stoc redus.
- **Secțiuni, în ordine:** aceleași ca la e-mailul 3a:
  - Header (logo-ul);
  - Custom Liquid cu salutul;
  - Text, de la „Acesta e ultimul e-mail” până la „…din 432 de recenzii pe Judge.me.”;
  - Abandoned checkout (Plată abandonată), cu butonul spre checkout („Finalizează comanda acum”, dacă îi poți schimba textul);
  - Text, de la „Dacă ai decis să nu comanzi acum” până la semnătură;
  - Text cu [Subsolul comun];
  - Footer.
- **O dată pe trimestru** actualizezi nota medie și numărul de recenzii, din Judge.me.

**Textul e-mailului:**

> Salut, [Prenume]! [secțiunea Custom Liquid cu salutul; fără prenume: „Salut!”]
>
> Acesta e ultimul e-mail despre coșul tău. Nu vrem să te sâcâim.
>
> Un singur lucru bun de știut: produsele din coș nu se rezervă, așa că disponibilitatea lor se poate schimba.
>
> Clienții noștri ne-au dat nota medie 4,87 din 5, din 432 de recenzii pe Judge.me.
>
> [Secțiunea Abandoned checkout: produsele din coș]
>
> **[ Finalizează comanda acum ]**
>
> Dacă ai decis să nu comanzi acum, e în regulă. Rămânem aici pentru când ai nevoie, cu ghiduri gratuite pe blog și cu răspunsuri la orice întrebare.
>
> Echipa Prime Supplements
>
> [Subsolul comun]

**De ce nu oferim reducere în e-mailul 3:** clienții învață repede să lase coșul ca să primească un cod. În plus, Shopify nu poate crea coduri personale automat: Flow nu are o acțiune care creează coduri de reducere. Dacă vrei totuși o reducere aici, folosești un cod comun creat în Discounts, cu o dată de final reală, setată în Shopify, și scoți codul din e-mail în ziua în care expiră. Prețul de referință pentru reducere este cel mai mic preț din ultimele 30 de zile.

## 5. Client nou (4 e-mailuri)

Clientul abonat care tocmai a plasat prima comandă primește, în trei săptămâni, patru e-mailuri: mulțumirea și ce urmează cu coletul, cum folosește produsele, ce se potrivește cu ele și cum își pregătește a doua comandă. Fluxul se construiește o singură dată în Shopify Flow și, după ce îl pornești, rulează singur pentru fiecare client nou.

| E-mail | Când pleacă | Tema |
| --- | --- | --- |
| 1 | La 1 zi după prima comandă | Mulțumirea lui Marius și ce urmează cu coletul |
| 2 | La 4 zile după comandă, de obicei după livrare | Cum folosești ce ai comandat |
| 3 | La 10 zile după comandă | Ce se potrivește cu ce ai comandat |
| 4 | La 21 de zile după comandă | Pregătirea celei de-a doua comenzi |

**Ce răspunde auditului:** agenția a găsit că fluxul Client nou lipsea complet. A cerut un flux care reduce îndoielile de după cumpărare, spune clar ce urmează cu livrarea și cum se folosesc produsele și pregătește a doua comandă. E-mailul 1 acoperă livrarea, e-mailurile 2 și 3 folosirea și combinarea produselor, iar e-mailul 4 a doua comandă.

**Cine intră în flux și cine nu:**

- **Intră:** clientul care plasează prima lui comandă și e abonat la e-mailurile de marketing (starea SUBSCRIBED), inclusiv cine a bifat singur abonarea la finalizarea comenzii. Comenzile cu plata ramburs intră și ele, de la plasare, nu de la plată.
- **Nu intră:**
  - clienții neabonați: primesc doar e-mailurile standard Shopify de confirmare și de expediere a comenzii;
  - clienții care au mai comandat înainte.
- **Iese din flux:**
  - când se dezabonează sau când prima comandă e anulată (se verifică înaintea fiecărui e-mail);
  - când plasează a doua comandă (se verifică înaintea e-mailurilor 3 și 4). E-mailurile 1 și 2 vorbesc despre prima comandă, așa că pleacă și dacă între timp a mai comandat.
- **Cu seria de bun venit nu se încurcă:** seria se oprește la prima comandă, pentru că cere 0 comenzi înaintea fiecărui e-mail, iar clientul trece în acest flux.
- **Fiecare client primește fluxul o singură dată**, pentru că pornește doar la prima comandă.

**Ce s-a schimbat față de varianta veche:**

- **Fără oră fixă.** Automatizările nu pot trimite la o anumită oră. Așteptările se numără de la momentul comenzii: cine comandă la 22:00 primește e-mailul 1 a doua zi, tot în jurul orei 22:00.
- **Fără amânări între fluxuri.** Shopify nu poate amâna un e-mail de aici pentru că în aceeași zi a plecat altul, dintr-un alt flux sau dintr-o campanie. Singura protecție automată este regula de 14 zile din fluxurile de coș și de navigare, care se aplică doar între e-mailurile de abandon. Pentru ciocnirea cu reamintirea de reaprovizionare există o soluție simplă: e-mailul 4 nu mai pleacă la clienții care primesc reamintirea în aceeași perioadă (condiția G4, mai jos).
- **E-mailul 2 nu mai așteaptă expedierea.** Pleacă în ziua 4. Cargus livrează în 1–3 zile lucrătoare, deci de obicei coletul a ajuns.
- **Un singur e-mail 2 și un singur e-mail 3, cu blocuri pe produse.** Blocurile se aleg singure, după produsele din comandă, printr-o secțiune Custom Liquid (de testat). Dacă nu merg, ai mai jos o variantă de rezervă, cu ramuri în Flow.
- **Fără test A/B.** Shopify nu are test A/B pentru subiecte. Folosești o variantă de subiect 2–4 săptămâni, apoi următoarea, și compari rata de click din raportul fiecărui e-mail.
- **Codul pentru a doua comandă poate fi doar comun.** Shopify nu poate genera coduri personale pentru fiecare client: Flow nu are o acțiune care creează coduri de reducere. Rândul cu codul din e-mailul 4 rămâne opțional, cu un cod comun care are o dată reală de final.

**Reguli comune pentru cele 4 e-mailuri:**

- **Salutul „Salut, [Prenume]!”** îl pui ca secțiune Custom Liquid (Liquid personalizat), cu codul de mai jos. Dacă clientul nu are prenume, apare doar „Salut!”. De testat cu un e-mail de test.
- **[Prenume] în subiect** se pune cu Personalize > First name. Dacă nu completezi o valoare implicită (Default value), la clientul fără prenume rămâne un gol în subiect, de exemplu „Mulțumesc pentru prima comandă, !”. În română nu există un cuvânt neutru potrivit, așa că, dacă vezi că mulți clienți nu-și trec prenumele la comandă, alegi variantele de subiect fără [Prenume].
- **[PRODUSE_COMANDĂ]** (e-mailurile 1 și 4) e o secțiune Custom Liquid care listează produsele din comandă: nume, aromă și bucăți, fără prețuri.
  - Codul scrie doar „Cluster” în locul titlului din magazin, care conține încă vechea denumire.
  - Nu afișează produsele al căror nume sună a efect asupra sănătății, aceleași ca în secțiunile 2 și 7: Recovery Glutamin, Recovery BCAA, Fat Burning Booster Shot, Thermo Core, Energy Pump Shot, Water Out (capsule și tinctură), Testo Revive, Cardio Calm și Liver Protect. Dacă clientul a comandat vreunul, sub listă apare fraza că lista completă e în e-mailul de confirmare a comenzii.
  - De testat: dacă aroma apare de două ori sau greșit, ștergi partea cu `variant_title`.
- **Logo, culori și font** vin din Apps > Messaging > Templates > Manage branding. Pui alt text la fiecare imagine.
- **Fiecare e-mail se termină** cu o secțiune Text cu [Subsolul comun], pusă deasupra secțiunii Footer (Subsol).
- **Fără reduceri și fără cereri de recenzie.** Singura excepție e rândul opțional cu cod din e-mailul 4. WELCOME5 nu apare, pentru că toți clienții de aici au deja o comandă. Cererile de recenzie le trimite deja Judge.me.
- **Nu repetă** confirmarea comenzii și e-mailul de expediere, pe care Shopify le trimite deja.
- Secțiunile Custom Liquid se fac doar pe calculator.

Codul pentru salut (secțiunea Custom Liquid de la începutul fiecărui e-mail):

```liquid
<p>{% if customer.first_name != blank %}Salut, {{ customer.first_name }}!{% else %}Salut!{% endif %}</p>
```

Codul pentru [PRODUSE_COMANDĂ]:

```liquid
{% assign gasite = 0 %}
{% assign ascunse = 0 %}
{% capture lista %}
{% for item in customer.last_order.line_items %}
  {% if item.title contains 'Recovery' or item.title contains 'Fat Burning' or item.title contains 'Thermo Core' or item.title contains 'Energy Pump' or item.title contains 'Water Out' or item.title contains 'Testo Revive' or item.title contains 'Cardio Calm' or item.title contains 'Liver Protect' %}
    {% assign ascunse = ascunse | plus: 1 %}
  {% else %}
    {% assign gasite = gasite | plus: 1 %}
    {% if item.title contains 'Cluster' %}{% assign nume = 'Cluster' %}{% else %}{% assign nume = item.title %}{% endif %}
    <li>{{ nume }}{% if item.variant_title != blank and item.variant_title != 'Default Title' %} · {{ item.variant_title }}{% endif %} · {{ item.quantity }} buc.</li>
  {% endif %}
{% endfor %}
{% endcapture %}
{% if gasite > 0 %}<ul>{{ lista }}</ul>{% endif %}
{% if ascunse > 0 %}<p>Lista completă a comenzii o găsești în e-mailul de confirmare a comenzii.</p>{% endif %}
```

**Cum îl construiești în Shopify:**

1. **Verifici că nu există deja o automatizare după comandă.** Deschizi Apps > Messaging > Automations (Aplicații > Messaging > Automatizări). Dacă e pornită „Thank customers after they purchase” sau „Upsell customers after their first purchase”, o oprești: două fluxuri după comandă înseamnă e-mailuri duble. Lucrezi pe calculator: pe telefon, automatizările nu se pot edita.
2. **Creezi fluxul din șablon.** Apps > Messaging > Automations > Create automation (Creare automatizare) > „Thank customers after they purchase” > Save without turning on (Salvați fără a activa). Șablonul pornește de la declanșatorul Order created și, la 1 zi după comandă, verifică numărul de comenzi: un e-mail pentru prima comandă, altul pentru a doua. Dacă preferi să pornești de la zero: Apps > Flow > Create workflow (Creare flux de lucru), cu declanșatorul Order created.
3. **Refaci pașii fluxului.** Deschizi automatizarea > Edit workflow (Editează fluxul de lucru) și o aduci la schița de mai jos:
   - **Ștergi ramura pentru a doua comandă** din șablon. Rămâne doar drumul pentru prima comandă.
   - **Condiția C0**, imediat după declanșator, cu două rânduri legate prin AND (ȘI):
     - `numberOfOrders` Equal to (Egal cu) 1;
     - starea de marketing Equal to SUBSCRIBED. În listă apare fie `defaultEmailAddress.marketingState`, fie `emailMarketingConsent.marketingState`; o alegi pe cea afișată.

     Pe ramura „false” nu pui nimic, așa că fluxul se încheie. De testat: la comanda de test verifici că rularea a trecut de C0. Dacă s-a oprit acolo, numărul de comenzi nu era încă actualizat în momentul comenzii; atunci muți C0 după primul Wait, cum face și șablonul Shopify.
   - **Condiția G1**, după Wait 1 day și după Wait 3 days: starea de marketing Equal to SUBSCRIBED AND `order.cancelledAt` is empty, adică prima comandă nu e anulată. De testat dacă editorul îți arată câmpul `cancelledAt`. Dacă nu ți-l arată, pui înaintea fiecărei condiții G1 și G2 pasul Run code (Rulare cod) din secțiunea 6 și folosești rezultatul `neanulata` Equal to true.
   - **Condiția G2**, după Wait 6 days: la fel ca G1, plus `numberOfOrders` Equal to 1. Dacă clientul a plasat a doua comandă, fluxul se oprește aici.
   - **Condiția G4**, după Wait 11 days: întâi un pas Run code, cu același cod ca în secțiunea 6 (îl copiezi de acolo), apoi condiția cu rândurile legate prin AND:
     - starea de marketing Equal to SUBSCRIBED;
     - `numberOfOrders` Equal to 1;
     - rezultatul `neanulata` Equal to true, adică prima comandă nu e anulată și nici rambursată integral;
     - rezultatul `reaprovizionareCurand` Equal to false.

     Așa, e-mailul 4 nu pleacă la cei care au luat la prima comandă o singură cutie de Creamy Rice sau de Prime Whey 1 kg. Ei primesc reamintirea de reaprovizionare în ziua 17 sau în ziua 25, care face aceeași treabă.
   - Shopify recitește datele clientului și ale comenzii după fiecare Wait, așa că o dezabonare, o anulare sau o a doua comandă plasată între timp contează la condiția următoare.
   - Unitățile din câmpul Wait (Așteptare) nu sunt documentate. Dacă nu găsești „zile”, pui ore: 24, 72, 144 și 264 de ore (de testat).
   - Pașii de e-mail nu se pot copia: fiecare pas Send marketing email (Trimitere e-mail de marketing) îl construiești separat.

   La final apeși Apply changes (Aplică modificările).
4. **Pui textele în e-mailuri.** La fiecare pas de e-mail: meniul automatizării > Edit, apoi completezi Subject (una dintre cele 3 variante), Preview text (preheaderul) și secțiunile din „Setări tehnice”. Apoi Save > Exit.
5. **Testezi.**
   - Send test (Trimiteți un test) la fiecare e-mail. Verifici pe telefon subiectul, preheaderul, butoanele, subsolul și linkul de dezabonare.
   - Pentru Liquid și pentru logică faci o copie de test a fluxului: o duplici în Flow și pui în copie așteptări foarte scurte. Câmpul Wait acceptă zecimale, de exemplu 0,01 zile, adică aproximativ un sfert de oră. În C0 adaugi rândul `customer.tags` Includes (Include) `test-flux`, ca să nu primească e-mailuri clienții reali.
   - De testat: dacă în copie lipsesc e-mailurile, faci testul pe fluxul original, încă nepornit pentru clienți. Pui temporar aceleași așteptări scurte și același rând cu `test-flux`, îl pornești doar pentru test, apoi îl oprești, pui la loc așteptările reale și ștergi rândul cu eticheta.
   - Pui eticheta `test-flux` pe un client de test abonat, cu adresa ta personală și fără comenzi. Plasezi pentru el o comandă de test, de exemplu o comandă ciornă marcată ca plătită, cu Prime Whey 2 kg și creatină. Nu pui Creamy Rice sau Prime Whey 1 kg, ca să primești și e-mailul 4.
   - Verifici că primești cele 4 e-mailuri, că lista comenzii și blocurile pe produse sunt corecte și că fiecare rulare apare în View recent activity. Apoi oprești copia de test și anulezi comanda de test.
6. **Pornești fluxul în ziua lansării** (secțiunea 10), după ce domeniul de e-mail e autentificat: Turn on automation (Activați automatizarea). Până atunci îl lași salvat și oprit.
7. **Urmărești rezultatele.** Pagina Automations arată Reach, Sessions, Orders, Conversion rate și Sales (Acoperire, Sesiuni, Comenzi, Rată de conversie, Vânzări). Raportul fiecărui e-mail îl găsești în lista de activități > … > View report. În primele 3–7 zile te uiți zilnic în View recent activity.

**Dacă blocurile din Liquid nu merg la test**, faci un flux separat doar pentru e-mailul 2, pe același declanșator Order created: C0 → Wait 4 days → G1 → condiții una după alta. Clientul primește varianta primei ramuri care i se potrivește, deci vede un singur bloc pe produse, nu pe toate:

- comanda conține Prime Whey sau Pure Isolate → e-mailul 2 cu blocul de proteină;
- altfel, conține creatină → e-mailul 2 cu blocul de creatină;
- altfel, conține Creamy Rice → e-mailul 2 cu blocul Creamy Rice;
- altfel → e-mailul 2 cu blocul general.

Fiecare condiție pe produse începe cu `order.lineItems` At least one of (Cel puțin unul dintre):

- proteină: `product.handle` Equal to `prime-whey-2000g`, `prime-whey-1000g`, `prime-whey-go` sau `pure-isolate-2000g`, câte un rând pentru fiecare, legate prin OR (SAU);
- creatină: `product.handle` Equal to `creatina-creapure`;
- Creamy Rice: `product.tags` Equal to `crema orez`.

Din fluxul principal scoți e-mailul 2 și pui Wait 9 days între e-mailurile 1 și 3. Pentru e-mailul 3 faci la fel, dacă e nevoie: un flux separat cu Wait 10 days, G2 și ramurile lui. Atunci, în fluxul principal rămân e-mailurile 1 și 4, cu Wait 20 days între ele.

```text
Trigger: Order created
→ Condition C0 (toate adevărate):
     customer.numberOfOrders = 1        (prima comandă; de testat)
     marketingState = SUBSCRIBED
   false → end
→ Wait 1 day
→ Condition G1 [SUBSCRIBED AND order.cancelledAt is empty]
→ Send marketing email: E-mail 1 (ziua 1) · mulțumire și ce urmează
→ Wait 3 days → G1 → Send marketing email: E-mail 2 (ziua 4) · cum folosești (Custom Liquid cu blocurile pe produse)
→ Wait 6 days → Condition G2 [G1 AND numberOfOrders = 1]
→ Send marketing email: E-mail 3 (ziua 10) · ce se potrivește (Custom Liquid cu un singur bloc)
→ Wait 11 days
→ Run code «verificare reaprovizionare»   (același cod ca în secțiunea 6)
→ Condition G4 [SUBSCRIBED AND numberOfOrders = 1 AND neanulata = true AND reaprovizionareCurand = false]
→ Send marketing email: E-mail 4 (ziua 21) · a doua comandă
   (orice condiție falsă → end)
```

### E-mail 1 · Mulțumire și ce urmează (ziua 1)

**Subiect, 3 variante:**

1. Mulțumesc pentru prima comandă, [Prenume]!
2. Ce urmează după prima ta comandă
3. Bun venit printre clienții Prime 💪

**Preheader:** Când ajunge coletul (1–3 zile lucrătoare), cum îl urmărești și cui scrii dacă ai o întrebare.

**Buton (CTA):** Scrie-ne pe WhatsApp → `https://wa.me/40775286584`

**Setări tehnice:**

- **Locul în flux:** Wait 1 day după comandă, apoi condiția G1. Pleacă și dacă între timp clientul a plasat a doua comandă; atunci lista arată comanda cea mai nouă.
- **Secțiuni, în ordine:**
  - Custom Liquid cu salutul;
  - Text, de la „Sunt Marius Chera” până la „Ce ai comandat:”;
  - Custom Liquid cu [PRODUSE_COMANDĂ];
  - Text, de la „Ce urmează:” până la „ca să te ajutăm mai repede.”;
  - Button „Scrie-ne pe WhatsApp”, cu linkul de mai sus;
  - Text, de la „Peste câteva zile” până la semnătură;
  - Text cu [Subsolul comun];
  - Footer.
- **Conținut:** fără reducere și fără recomandări de produse, pentru că e-mailul e despre comanda deja făcută. Fraza despre dezabonare rămâne: pentru mulți clienți, acesta e primul e-mail de marketing de la noi.

**Textul e-mailului:**

> Salut, [Prenume]!
>
> Sunt Marius Chera, fondatorul Prime Supplements. Îți mulțumesc pentru prima comandă! Îți scriu pe scurt ce urmează, ca să știi exact la ce să te aștepți.
>
> **Ce ai comandat:**
>
> [PRODUSE_COMANDĂ]
>
> **Ce urmează:**
>
> 1. **Pregătim coletul.** Strângem produsele din comanda ta și le împachetăm.
> 2. **Îl predăm curierului.** Cargus îți aduce coletul în 1–3 zile lucrătoare de la comandă. Weekendul și sărbătorile legale nu se pun la socoteală.
> 3. **Primești linkul de urmărire.** Când coletul pleacă, primești de la noi un e-mail separat, cu linkul de urmărire Cargus. Dacă l-ai primit deja, coletul e pe drum. Nu-l găsești? Uită-te și la Spam sau la Promoții.
> 4. **Ține telefonul pornit în ziua livrării**, ca să te poată contacta curierul.
> 5. **Ai ales plata ramburs?** Pregătește suma din e-mailul de confirmare a comenzii. O plătești curierului, la livrare.
>
> **Ai o întrebare despre comandă?** Răspunde la acest e-mail, scrie-ne la contact@primesupplements.ro sau pe WhatsApp, la 0775 286 584. Luni–vineri, 8:00–18:00, răspundem în medie într-o oră. Spune-ne și numărul comenzii, ca să te ajutăm mai repede.
>
> **[ Scrie-ne pe WhatsApp ]**
>
> Peste câteva zile, când coletul ar trebui să fi ajuns, îți trimit un e-mail scurt despre cum folosești ce ai comandat.
>
> Te poți opune oricând e-mailurilor de marketing: apeși „Dezabonare” la finalul oricărui e-mail și nu mai primești e-mailuri de marketing de la noi. E-mailurile despre comenzi și livrare le primești în continuare.
>
> Spor la antrenament, Marius Chera, fondator Prime Supplements
>
> [Subsolul comun]

### E-mail 2 · Cum folosești ce ai comandat (ziua 4)

**Subiect, 3 variante:**

1. Cum folosești ce ai comandat
2. [Prenume], reguli simple pentru suplimentele tale
3. Ți-a ajuns coletul? Uite cum începi

**Preheader:** Ce verifici pe etichetă, cât iei și cum păstrezi produsele, plus sfaturi pentru ce ai comandat.

**Buton (CTA):** Trimite-ne o întrebare → `mailto:contact@primesupplements.ro`

**Setări tehnice:**

- **Locul în flux:** Wait 3 days după e-mailul 1 (ziua 4 de la comandă), apoi condiția G1. Pleacă și dacă între timp clientul a plasat a doua comandă. Atunci blocurile se aleg după comanda cea mai nouă, pentru că Liquid citește ultima comandă a clientului.
- **Secțiuni, în ordine:**
  - Custom Liquid cu salutul;
  - Text, de la „Dacă totul a mers bine” până la „Și acum, pe produse:”;
  - Custom Liquid cu blocurile pe produse (codul de mai jos);
  - Text, de la „Nu știi sigur” până la „pe înțeles.”;
  - Button „Trimite-ne o întrebare”, cu linkul de mai sus;
  - Text, de la „Peste câteva zile” până la semnătură;
  - Text cu [Subsolul comun];
  - Footer.
- **Blocurile pe produse:** regulile generale apar la toată lumea. Dintre blocurile pe produse apar toate cele care se potrivesc cu comanda: cine a luat proteină și creatină le vede pe amândouă. Blocul general apare doar dacă nu se potrivește niciunul. „Prime Whey” înseamnă orice Prime Whey (2 kg, 1 kg sau plicurile Go), creatina înseamnă Creatina Creapure® de 300 g sau de 500 g, iar Creamy Rice înseamnă orice aromă.
- **Mențiunile de sănătate** din blocuri sunt formulările autorizate în UE, copiate exact. Nu le scurta și nu le reformula, și le folosești doar dacă apar și pe eticheta produsului.

**Codul secțiunii Custom Liquid cu blocurile pe produse** (de testat cu un e-mail de test):

```liquid
{% assign are_proteina = false %}
{% assign are_creatina = false %}
{% assign are_orez = false %}
{% for item in customer.last_order.line_items %}
  {% if item.title contains 'Prime Whey' or item.title contains 'Pure Isolate' %}{% assign are_proteina = true %}{% endif %}
  {% if item.title contains 'Creapure' %}{% assign are_creatina = true %}{% endif %}
  {% if item.title contains 'Creamy Rice' %}{% assign are_orez = true %}{% endif %}
{% endfor %}

{% if are_proteina %}
<p><strong>Proteina (Prime Whey sau Pure Isolate).</strong> O porție de Prime Whey are aproximativ 30 g, iar una de Pure Isolate are 27 g. Pe etichetă găsești cu cât lichid o amesteci. O poți lua când îți vine cel mai ușor: după antrenament, la micul dejun sau între mese. Pudra proteică acoperă doar diferența de proteine care îți lipsește din mâncare.</p>
<p>Proteinele contribuie la creșterea masei musculare și la menținerea masei musculare. Contează însă câte proteine mănânci în total pe zi, din toate sursele. Ca să afli de câte ai nevoie, citește ghidul nostru: <a href="https://primesupplements.ro/blogs/news/cata-proteina-trebuie-zi-calcul-greutate-obiectiv">Câtă proteină pe zi: calcul pe greutate și obiectiv →</a></p>
{% endif %}

{% if are_creatina %}
<p><strong>Creatina Creapure®.</strong> Creatina crește performanța fizică în eforturi succesive din timpul exercițiilor fizice de scurtă durată și de mare intensitate. Efectul benefic se obține la un consum zilnic de 3 g de creatină. Creatina Creapure® se adresează adulților care efectuează exerciții fizice de mare intensitate.</p>
<p>Cum o iei: zilnic, în aceeași doză, și în zilele fără antrenament. Doza zilnică recomandată e scrisă pe etichetă: nu o depăși. Bea suficientă apă pe parcursul zilei.</p>
{% endif %}

{% if are_orez %}
<p><strong>Creamy Rice.</strong> Crema de orez e făcută din făină de orez pregelatinizată, așa că se prepară fără fierbere. Cantitatea pe porție și modul de preparare le găsești pe etichetă, iar pachetul de 1 kg are 22 de porții. O poți folosi ca masă rapidă înainte de antrenament sau la micul dejun. Vrei să afli ce înseamnă pregelatinizarea și ce verifici pe etichetă? Citește ghidul: <a href="https://primesupplements.ro/blogs/news/cum-alegi-crema-de-orez">Cum alegi crema de orez →</a></p>
{% endif %}

{% unless are_proteina or are_creatina or are_orez %}
<p><strong>Produsele tale.</strong> Pe eticheta fiecărui produs găsești porția, modul de folosire și doza zilnică recomandată. Pornește de la ele.</p>
{% endunless %}
```

**Textul e-mailului:**

> Salut, [Prenume]!
>
> Dacă totul a mers bine, coletul tău a ajuns. Dacă nu a ajuns încă sau ceva nu e în regulă cu el, răspunde la acest e-mail și vedem împreună ce s-a întâmplat.
>
> Acum, partea importantă: cum folosești ce ai comandat. Întâi, câteva reguli valabile pentru orice supliment:
>
> - **Citește eticheta înainte de prima folosire.** Acolo găsești porția, modul de preparare și doza zilnică recomandată.
> - **Nu depăși doza zilnică recomandată.** Mai mult nu înseamnă mai bine.
> - **Păstrează produsele la loc uscat**, cu ambalajul bine închis și departe de îndemâna copiilor.
> - **Ai o afecțiune, ești însărcinată, alăptezi sau iei medicamente?** Discută cu medicul înainte să începi.
>
> **Și acum, pe produse:**
>
> [Doar dacă comanda conține Prime Whey sau Pure Isolate:]
>
> **Proteina (Prime Whey sau Pure Isolate).** O porție de Prime Whey are aproximativ 30 g, iar una de Pure Isolate are 27 g. Pe etichetă găsești cu cât lichid o amesteci. O poți lua când îți vine cel mai ușor: după antrenament, la micul dejun sau între mese. Pudra proteică acoperă doar diferența de proteine care îți lipsește din mâncare.
>
> Proteinele contribuie la creșterea masei musculare și la menținerea masei musculare. Contează însă câte proteine mănânci în total pe zi, din toate sursele. Ca să afli de câte ai nevoie, citește ghidul nostru: [Câtă proteină pe zi: calcul pe greutate și obiectiv →](https://primesupplements.ro/blogs/news/cata-proteina-trebuie-zi-calcul-greutate-obiectiv)
>
> [Doar dacă comanda conține Creatină Creapure:]
>
> **Creatina Creapure®.** Creatina crește performanța fizică în eforturi succesive din timpul exercițiilor fizice de scurtă durată și de mare intensitate. Efectul benefic se obține la un consum zilnic de 3 g de creatină. Creatina Creapure® se adresează adulților care efectuează exerciții fizice de mare intensitate.
>
> Cum o iei: zilnic, în aceeași doză, și în zilele fără antrenament. Doza zilnică recomandată e scrisă pe etichetă: nu o depăși. Bea suficientă apă pe parcursul zilei.
>
> [Doar dacă comanda conține Creamy Rice:]
>
> **Creamy Rice.** Crema de orez e făcută din făină de orez pregelatinizată, așa că se prepară fără fierbere. Cantitatea pe porție și modul de preparare le găsești pe etichetă, iar pachetul de 1 kg are 22 de porții. O poți folosi ca masă rapidă înainte de antrenament sau la micul dejun. Vrei să afli ce înseamnă pregelatinizarea și ce verifici pe etichetă? Citește ghidul: [Cum alegi crema de orez →](https://primesupplements.ro/blogs/news/cum-alegi-crema-de-orez)
>
> [Altfel:]
>
> **Produsele tale.** Pe eticheta fiecărui produs găsești porția, modul de folosire și doza zilnică recomandată. Pornește de la ele.
>
> [Pentru toți:]
>
> Nu știi sigur când iei un produs sau cum îl combini cu ce folosești deja? Scrie-ne numele produsului și obiectivul tău, iar noi îți explicăm pe înțeles.
>
> **[ Trimite-ne o întrebare ]**
>
> Peste câteva zile îți scriu despre ce se potrivește cu produsele tale.
>
> Marius
>
> [Subsolul comun]

### E-mail 3 · Ce se potrivește cu ce ai comandat (ziua 10)

**Subiect, 3 variante:**

1. Ce se potrivește cu ce ai comandat
2. Proteină, creatină, cremă de orez: cum le combini
3. [Prenume], ai întrebări despre suplimentele tale?

**Preheader:** Combinații simple pentru rutina ta, plus vitaminele și mineralele din gama Prime Health.

**Buton (CTA):** Vezi toate suplimentele → `https://primesupplements.ro/collections/suplimente-sala`

**Setări tehnice:**

- **Locul în flux:** Wait 6 days după e-mailul 2 (ziua 10 de la comandă), apoi condiția G2. Dacă a plasat între timp a doua comandă, iese din flux.
- **Secțiuni, în ordine:**
  - Custom Liquid cu salutul;
  - Text, de la „Au trecut câteva zile” până la „în rutina de zi cu zi.”;
  - Custom Liquid cu blocul pe produse (codul de mai jos);
  - Text, paragraful „Pentru zi cu zi: Prime Health”;
  - Button „Vezi toate suplimentele”, cu linkul de mai sus;
  - Text, de la „Ai întrebări?” până la semnătură;
  - Text cu [Subsolul comun];
  - Footer.
- **Blocul pe produse:** dintre cele patru blocuri apare unul singur, primul care se potrivește, în ordinea: proteină, creatină, Creamy Rice, altfel. În blocul ales nu apare produsul pe care clientul l-a luat deja în aceeași comandă. Cine a luat și proteină, și creatină, și Creamy Rice vede blocul general, care arată cum se leagă cele trei.
- **Conținut:** fără mențiuni de sănătate în acest e-mail, doar ce e produsul și cum îl folosești. Nu ceri recenzie, pentru că Judge.me trimite deja cererile de recenzie. Linkul spre ghidul de zinc a fost scos: ghidul de zinc nu se pune în e-mailuri.

**Codul secțiunii Custom Liquid cu blocul pe produse** (de testat cu un e-mail de test):

```liquid
{% assign are_proteina = false %}
{% assign are_creatina = false %}
{% assign are_orez = false %}
{% for item in customer.last_order.line_items %}
  {% if item.title contains 'Prime Whey' or item.title contains 'Pure Isolate' %}{% assign are_proteina = true %}{% endif %}
  {% if item.title contains 'Creapure' %}{% assign are_creatina = true %}{% endif %}
  {% if item.title contains 'Creamy Rice' %}{% assign are_orez = true %}{% endif %}
{% endfor %}

{% if are_proteina and are_creatina and are_orez %}
  {% assign bloc = 'general' %}
{% elsif are_proteina %}
  {% assign bloc = 'proteina' %}
{% elsif are_creatina %}
  {% assign bloc = 'creatina' %}
{% elsif are_orez %}
  {% assign bloc = 'orez' %}
{% else %}
  {% assign bloc = 'general' %}
{% endif %}

{% if bloc == 'proteina' %}
<p><strong>Ai luat proteină. Iată ce se potrivește cu ea:</strong></p>
<ul>
{% unless are_creatina %}<li><strong>Creatină Creapure®:</strong> un singur ingredient, creatină monohidrat micronizată, în pachet de 300 g (60 de porții) sau de 500 g (100 de porții). Sfatul meu: pune porția zilnică de creatină în shake-ul de proteină, ca să n-o uiți. <a href="https://primesupplements.ro/products/creatina-creapure">Vezi creatina →</a></li>{% endunless %}
{% unless are_orez %}<li><strong>Creamy Rice:</strong> cremă de orez pregelatinizată, care se prepară fără fierbere, în 6 arome și o variantă fără aromă. Amestecă o porție de proteină în crema de orez gata preparată și ai într-un singur bol și carbohidrați, și proteine. <a href="https://primesupplements.ro/collections/crema-de-orez">Vezi crema de orez →</a></li>{% endunless %}
</ul>
{% elsif bloc == 'creatina' %}
<p><strong>Ai luat creatină. Iată ce se potrivește cu ea:</strong></p>
<ul>
<li><strong>Prime Whey:</strong> proteină din zer concentrat, cu 82 g de proteine la 100 g de produs, în 7 arome. Cutia de 2 kg are 66 de porții, iar cea de 1 kg are 33. Sfatul meu: pune porția zilnică de creatină în shake-ul de proteină, ca să n-o uiți. <a href="https://primesupplements.ro/collections/pudra-proteica">Vezi pudrele proteice →</a></li>
{% unless are_orez %}<li><strong>Creamy Rice:</strong> cremă de orez pregelatinizată, care se prepară fără fierbere, în 6 arome și o variantă fără aromă. O poți folosi ca masă rapidă înainte de antrenament sau la micul dejun. <a href="https://primesupplements.ro/collections/crema-de-orez">Vezi crema de orez →</a></li>{% endunless %}
</ul>
{% elsif bloc == 'orez' %}
<p><strong>Ai luat cremă de orez. Iată ce se potrivește cu ea:</strong></p>
<ul>
<li><strong>Prime Whey sau Pure Isolate:</strong> Prime Whey are 82 g de proteine la 100 g de produs, iar Pure Isolate e izolat din zer microfiltrat, cu enzimele digestive Digezyme®. Amestecă o porție de proteină în crema de orez gata preparată și ai într-un singur bol și carbohidrați, și proteine. <a href="https://primesupplements.ro/collections/pudra-proteica">Vezi pudrele proteice →</a></li>
<li><strong>Creatină Creapure®:</strong> un singur ingredient, creatină monohidrat micronizată, în pachet de 300 g sau de 500 g. O iei zilnic, în aceeași doză. <a href="https://primesupplements.ro/products/creatina-creapure">Vezi creatina →</a></li>
</ul>
{% else %}
<p><strong>Trei produse de bază pentru sală și cum se leagă între ele:</strong></p>
<ul>
<li><strong>Proteina (Prime Whey sau Pure Isolate):</strong> acoperă proteinele care îți lipsesc din mâncare. Prime Whey are 82 g de proteine la 100 g de produs. <a href="https://primesupplements.ro/collections/pudra-proteica">Vezi pudrele proteice →</a></li>
<li><strong>Creatină Creapure®:</strong> un singur ingredient, creatină monohidrat micronizată. O iei zilnic și o poți pune chiar în shake-ul de proteină. <a href="https://primesupplements.ro/products/creatina-creapure">Vezi creatina →</a></li>
<li><strong>Creamy Rice:</strong> cremă de orez care se prepară fără fierbere, bună ca masă rapidă înainte de antrenament. Cu o porție de proteină amestecată în ea, ai într-un singur bol și carbohidrați, și proteine. <a href="https://primesupplements.ro/collections/crema-de-orez">Vezi crema de orez →</a></li>
</ul>
{% endif %}
```

**Textul e-mailului:**

> Salut, [Prenume]!
>
> Au trecut câteva zile de când ai primit produsele Prime. Azi îți arăt, pe scurt, ce se potrivește cu ce ai comandat și cum le pui împreună în rutina de zi cu zi.
>
> [Doar dacă comanda conține Prime Whey sau Pure Isolate, dar nu toate trei: proteină, creatină și Creamy Rice. Rândul cu un produs pe care l-a luat deja nu apare:]
>
> **Ai luat proteină. Iată ce se potrivește cu ea:**
>
> - **Creatină Creapure®:** un singur ingredient, creatină monohidrat micronizată, în pachet de 300 g (60 de porții) sau de 500 g (100 de porții). Sfatul meu: pune porția zilnică de creatină în shake-ul de proteină, ca să n-o uiți. [Vezi creatina →](https://primesupplements.ro/products/creatina-creapure)
> - **Creamy Rice:** cremă de orez pregelatinizată, care se prepară fără fierbere, în 6 arome și o variantă fără aromă. Amestecă o porție de proteină în crema de orez gata preparată și ai într-un singur bol și carbohidrați, și proteine. [Vezi crema de orez →](https://primesupplements.ro/collections/crema-de-orez)
>
> [Doar dacă comanda conține Creatină Creapure, dar nu și Prime Whey sau Pure Isolate. Rândul cu Creamy Rice nu apare dacă l-a luat deja:]
>
> **Ai luat creatină. Iată ce se potrivește cu ea:**
>
> - **Prime Whey:** proteină din zer concentrat, cu 82 g de proteine la 100 g de produs, în 7 arome. Cutia de 2 kg are 66 de porții, iar cea de 1 kg are 33. Sfatul meu: pune porția zilnică de creatină în shake-ul de proteină, ca să n-o uiți. [Vezi pudrele proteice →](https://primesupplements.ro/collections/pudra-proteica)
> - **Creamy Rice:** cremă de orez pregelatinizată, care se prepară fără fierbere, în 6 arome și o variantă fără aromă. O poți folosi ca masă rapidă înainte de antrenament sau la micul dejun. [Vezi crema de orez →](https://primesupplements.ro/collections/crema-de-orez)
>
> [Doar dacă comanda conține Creamy Rice, dar nu și Prime Whey, Pure Isolate sau Creatină Creapure:]
>
> **Ai luat cremă de orez. Iată ce se potrivește cu ea:**
>
> - **Prime Whey sau Pure Isolate:** Prime Whey are 82 g de proteine la 100 g de produs, iar Pure Isolate e izolat din zer microfiltrat, cu enzimele digestive Digezyme®. Amestecă o porție de proteină în crema de orez gata preparată și ai într-un singur bol și carbohidrați, și proteine. [Vezi pudrele proteice →](https://primesupplements.ro/collections/pudra-proteica)
> - **Creatină Creapure®:** un singur ingredient, creatină monohidrat micronizată, în pachet de 300 g sau de 500 g. O iei zilnic, în aceeași doză. [Vezi creatina →](https://primesupplements.ro/products/creatina-creapure)
>
> [Altfel, inclusiv dacă a luat toate trei:]
>
> **Trei produse de bază pentru sală și cum se leagă între ele:**
>
> - **Proteina (Prime Whey sau Pure Isolate):** acoperă proteinele care îți lipsesc din mâncare. Prime Whey are 82 g de proteine la 100 g de produs. [Vezi pudrele proteice →](https://primesupplements.ro/collections/pudra-proteica)
> - **Creatină Creapure®:** un singur ingredient, creatină monohidrat micronizată. O iei zilnic și o poți pune chiar în shake-ul de proteină. [Vezi creatina →](https://primesupplements.ro/products/creatina-creapure)
> - **Creamy Rice:** cremă de orez care se prepară fără fierbere, bună ca masă rapidă înainte de antrenament. Cu o porție de proteină amestecată în ea, ai într-un singur bol și carbohidrați, și proteine. [Vezi crema de orez →](https://primesupplements.ro/collections/crema-de-orez)
>
> [Pentru toți:]
>
> **Pentru zi cu zi: Prime Health.** Dacă vrei să-ți completezi alimentația cu vitamine și minerale, le găsești în gama Prime Health, de exemplu magneziul bisglicinat. Înainte să alegi, uită-te la ce mănânci deja. Dacă ai o afecțiune, ești însărcinată, alăptezi sau iei medicamente, discută cu medicul. [Vezi gama Prime Health →](https://primesupplements.ro/collections/prime-health)
>
> **[ Vezi toate suplimentele ]**
>
> **Ai întrebări?** Despre doze, despre cum combini produsele sau despre ce să alegi mai departe: apasă „Răspunde” și scrie-ne. Luni–vineri, 8:00–18:00, răspundem în medie într-o oră.
>
> Marius
>
> [Subsolul comun]

### E-mail 4 · Pregătim a doua comandă (ziua 21)

**Subiect, 3 variante:**

1. Cum stai cu rezervele, [Prenume]?
2. Pregătim a doua comandă?
3. Cele mai vândute produse Prime, pe scurt

**Preheader:** Produsele tale, cele mai vândute din ultimele 3 luni și livrare gratuită peste 300 de lei.

**Buton (CTA):** Vezi cele mai vândute → `https://primesupplements.ro/collections/suplimente-sala?sort_by=best-selling`

**Setări tehnice:**

- **Locul în flux:** Wait 11 days după e-mailul 3 (ziua 21 de la comandă), apoi pasul Run code și condiția G4. Nu pleacă dacă clientul a plasat a doua comandă, dacă prima comandă a fost anulată sau rambursată integral ori dacă a luat la prima comandă o singură cutie de Creamy Rice sau de Prime Whey 1 kg: el primește în schimb reamintirea de reaprovizionare (secțiunea 6). E ultimul e-mail din flux; după el, clientul rămâne doar pe lista de newsletter.
- **Secțiuni, în ordine:**
  - Custom Liquid cu salutul;
  - Text, de la „Au trecut trei săptămâni” până la „Ce ai comandat data trecută:”;
  - Custom Liquid cu [PRODUSE_COMANDĂ];
  - Text cu lista „Cele mai vândute produse Prime”;
  - opțional, o secțiune Product (Static) cu Prime Whey 2 kg, Pure Isolate 2 kg, Creatina Creapure® și Creamy Rice tort de ciocolată. Nu pui Cluster într-o secțiune Product și nu folosești Product (Dynamic, cele mai vândute), pentru că titlul lui Cluster din magazin conține încă vechea denumire;
  - Button „Vezi cele mai vândute”, cu linkul de mai sus;
  - Text, de la „Bine de știut” până la semnătură;
  - Text cu [Subsolul comun];
  - Footer.
- **Lista de produse:** sunt cele mai vândute produse după valoarea vânzărilor din ultimele 90 de zile. Lista nu e numerotată: în Shopify, fiecare aromă de Creamy Rice e un produs separat, iar adunate ar ieși pe locul 2, deci un clasament ar induce în eroare. Cluster apare doar în text, fără link. Notele și numărul de recenzii sunt cele din Judge.me la 13 octombrie 2026. Le actualizezi o dată pe trimestru.
- **Rândul cu codul e opțional.** Îl ștergi dacă nu aprobi un cod pentru a doua comandă. Dacă îl folosești:
  - creezi în Discounts un singur cod comun, cu o dată de final reală, setată pe cod, și cu o singură utilizare de fiecare client. Coduri personale, câte unul pentru fiecare client, nu se pot genera automat în Shopify;
  - în rând scrii exact condițiile setate pe cod: procentul, comanda minimă, dacă există, și dacă se cumulează cu alte coduri. După [DATA], ora 23:59, codul nu mai funcționează, iar în e-mail apar exact aceeași dată și oră;
  - automatizarea trimite e-mailul și după data de final. În ziua de final deschizi e-mailul 4, ștergi rândul și pui înapoi butonul fără cod, ca nimeni să nu primească un cod expirat. Nu prelungești codul și nu îl retrimiți;
  - un cod comun poate fi dat mai departe și altor persoane, iar asta e decizia ta;
  - reducerea se calculează din cel mai mic preț din ultimele 30 de zile;
  - cât timp codul e activ, butonul devine `https://primesupplements.ro/discount/[COD]?redirect=/collections/suplimente-sala%3Fsort_by%3Dbest-selling`, ca să se aplice codul singur.

**Textul e-mailului:**

> Salut, [Prenume]!
>
> Au trecut trei săptămâni de la prima ta comandă. Dacă folosești produsele zilnic, uită-te cât ți-a mai rămas. Ca să nu rămâi fără ele, comandă cu câteva zile înainte să se termine: Cargus livrează în 1–3 zile lucrătoare.
>
> **Ce ai comandat data trecută:**
>
> [PRODUSE_COMANDĂ]
>
> **Cele mai vândute produse Prime** (după valoarea vânzărilor din ultimele 3 luni, cu nota din recenziile Judge.me de pe site):
>
> - **Prime Whey 2 kg** · nota 4,75 din 5, din 44 de recenzii. 82 g de proteine la 100 g de produs, 66 de porții, 7 arome. Există și varianta de 1 kg, cu 33 de porții.
> - **Pure Isolate 2 kg** · nota 4,77 din 5, din 13 recenzii. Izolat din zer microfiltrat, cu enzimele digestive Digezyme®, 74 de porții de 27 g, 7 arome.
> - **Creatină Creapure®** · nota 5,0 din 5, din 17 recenzii. Un singur ingredient, în pachet de 300 g sau de 500 g.
> - **Creamy Rice** · nota 5,0 din 5 la aroma tort de ciocolată, din 33 de recenzii. Cremă de orez care se prepară fără fierbere, în 6 arome și o variantă fără aromă.
> - **Cluster** · nota 5,0 din 5, din 9 recenzii. Băutură pentru timpul antrenamentului, pe bază de Cluster Dextrin®, în 3 arome.
>
> **[ Vezi cele mai vândute ]**
>
> **Bine de știut:**
>
> - Livrarea e gratuită la comenzile de peste 300 de lei, altfel costă 20 de lei.
> - Plătești cu cardul, prin transfer bancar sau ramburs, la curier.
>
> **Nu știi ce să adaugi?** Răspunde la acest e-mail cu obiectivul tău (masă musculară, definire sau energie la antrenament) și cu ce folosești acum. Îți recomandăm noi ce ți se potrivește.
>
> [Opțional, doar dacă aprobi un cod comun cu dată reală de final:] Pentru a doua comandă ai codul [COD]: [X]% la toată comanda, [fără comandă minimă / la comenzi de peste [VALOARE] lei], o singură utilizare de fiecare client, valabil până pe [DATA], ora 23:59. [Se cumulează / Nu se cumulează] cu alte coduri. Dacă apeși butonul de mai sus, codul se aplică singur. După această dată, codul nu mai funcționează.
>
> Mulțumim că ești în echipa Prime.
>
> Spor la antrenament, Marius
>
> [Subsolul comun]

## 6. Reamintire de reaprovizionare (1 e-mail pe produs)

Clientul abonat care a comandat unul dintre produsele din tabelul de mai jos primește un singur e-mail scurt, cu câteva zile înainte să-l termine, socotind o porție pe zi. Butonul îl duce direct la același produs, fără reducere și fără grabă inventată.

| E-mail | Când pleacă | Tema |
| --- | --- | --- |
| 1 | În ziua din tabelul de mai jos, numărată de la plata comenzii | „Probabil ți se termină [PRODUS]”: comandă din nou, livrare gratuită peste 300 de lei și ce se potrivește cu el |

**Ziua de trimitere, pe produs** (o porție pe zi, cu câteva zile de rezervă pentru livrare):

| Produs | Bucăți în comandă | Porții în total | E-mailul pleacă în ziua | Porții rămase atunci, aproximativ |
| --- | --- | --- | --- | --- |
| Prime Whey 2 kg | 1 | 66 | 55 | 11 |
| Prime Whey 1 kg | 1 | 33 | 25 | 8 |
| Prime Whey 1 kg (opțional) | 2 | 66 | 58 | 8 |
| Pure Isolate 2 kg | 1 | 74 | 62 | 12 |
| Creatină Creapure® 300 g | 1 | 60 (porții de 5 g) | 50 | 10 |
| Creatină Creapure® 500 g | 1 | 100 (porții de 5 g) | 88 | 12 |
| Creamy Rice 1 kg (orice aromă) | 1 | 22 | 17 | 5 |
| Creamy Rice 1 kg (opțional, orice arome) | 2 | 44 | 39 | 5 |
| EAA 500 g | 1 | 83 | 70 | 13 |

- **Creatina:** o porție are 5 g (60 de porții la 300 g, 100 la 500 g), iar doza zilnică e de 3–5 g. Zilele 50 și 88 presupun 5 g pe zi. Cine ia 3 g pe zi mai are creatină și după data e-mailului, iar textul e-mailului spune asta.
- **Creatina de 500 g și recâștigarea:** ziua 88 cade cu 2 zile înaintea primului e-mail de recâștigare, care pleacă după 90 de zile fără comandă (secțiunea 7). Shopify nu poate amâna automat unul dintre ele. Dacă vrei 7 zile între ele, pui 83 de zile în loc de 88; atunci rămân aproximativ 17 porții.
- **Limita de 90 de zile:** Shopify Flow poate aștepta cel mult 90 de zile într-un flux. De aceea, la 2 sau mai multe bucăți de Prime Whey 2 kg, Pure Isolate, creatină sau EAA nu pleacă reamintirea: de exemplu, 2 × Prime Whey 2 kg înseamnă 132 de porții, adică ziua 121. La 3 sau mai multe bucăți de Prime Whey 1 kg, la fel. La Creamy Rice ai putea adăuga și fluxuri pentru 3 sau 4 cutii (zilele 61 și 83), dacă vrei. Planul de bază se oprește la 2.

**Ce răspunde auditului:** agenția a recomandat segmentarea după categoria de produs cumpărată și după momentul estimat de recumpărare, ca mesajele să plece la momentul potrivit în ciclul de consum. Fluxul acesta face exact asta, automat, câte un e-mail pe produs.

**Abandonul de site nu mai are flux separat:** Shopify recunoaște doar trei feluri de abandon (navigare, adică un produs deschis, coș și checkout), așa că pentru abandonul de site rămâne fluxul de abandon navigare (secțiunea 2), care îi prinde pe cei care deschid un produs și pleacă. Fluxul vechi de abandon site din theMarketer îl oprești la trecere, odată cu celelalte automatizări theMarketer, ca nimeni să nu primească e-mailuri duble.

**Setări pentru tot fluxul:**

- **Un flux pentru fiecare produs din tabel** (adică pentru fiecare rând): 7 fluxuri, plus 2 opționale, toate cu aceeași schemă. Îl faci pe primul, apoi îl duplici în Flow și schimbi numele, condiția de intrare, numărul de zile, condiția de bucăți și e-mailul. Un singur flux pe familie de produse, cu ramuri, nu se potrivește aici: fiecare produs are altă așteptare, ramurile ar fi greu de urmărit, iar documentația nu spune dacă limita de 90 de zile se socotește pe fiecare ramură sau pe tot fluxul.
- **Declanșator:** Order paid, adică plata comenzii. La ramburs, comanda devine plătită abia când o marchezi ca plătită în Shopify. Marcheaz-o în ziua livrării; dacă o marchezi mai târziu, e-mailul pleacă tot cu atâtea zile mai târziu.
- **Bucățile se numără automat**, pe toate aromele, cu un pas Run code (Rulare cod): 2 cutii de Creamy Rice cu arome diferite înseamnă 2 bucăți.
- **Ambele gramaje ale aceluiași produs în aceeași comandă** (Prime Whey 1 kg și 2 kg sau creatină de 300 g și de 500 g): nu pleacă niciun e-mail pentru acel produs, pentru că nu putem estima când se termină.
- **Condiții de trimitere**, verificate în ziua trimiterii, după așteptare:
  - clientul e abonat la marketing prin e-mail (starea SUBSCRIBED);
  - n-a mai plasat nicio comandă după aceasta. Orice comandă nouă oprește reamintirea, nu doar una din aceeași familie de produse. Noua comandă pornește propriile reamintiri, dacă are produse din tabel;
  - comanda nu e anulată și nu e rambursată integral.
- **Audiență:** doar clienții abonați, cu acord explicit. Clienții neabonați nu primesc acest e-mail.
- **Reintrare:** fiecare comandă plătită cu un produs din tabel pornește numărătoarea ei. Clientul primește cel mult un e-mail pentru fiecare produs comandat.
- **Mai multe produse din tabel în aceeași comandă:** fiecare produs are fluxul lui, deci pot pleca două e-mailuri, la câteva zile distanță. De exemplu, creatina de 300 g în ziua 50 și Prime Whey 2 kg în ziua 55. Sunt scurte și fiecare e despre alt produs. Dacă clientul comandă după primul e-mail, al doilea nu mai pleacă.
- **Legătura cu fluxul Client nou:** la prima comandă cu o singură cutie de Creamy Rice sau de Prime Whey 1 kg, e-mailul 4 din Client nou nu mai pleacă (condiția G4 din secțiunea 5), pentru că reamintirea de aici vine în ziua 17 sau în ziua 25.
- **Fără reducere și fără prețuri.** WELCOME5 nu apare, pentru că toți clienții de aici au deja o comandă.
- **Costul:** aceste e-mailuri intră în cele 10.000 de e-mailuri gratuite pe lună.

**Ce s-a schimbat față de varianta veche:**

- **Fără oră fixă.** Automatizările nu pot trimite la o anumită oră: așteptarea se numără de la plata comenzii.
- **Fără amânări între fluxuri și fără excludere automată din campanii.** Shopify nu are aceste reguli. E un singur e-mail pe produs, deci riscul de prea multe e-mailuri e mic.
- **Orice comandă nouă oprește reamintirea**, nu doar una din aceeași familie de produse. E verificarea cea mai simplă și mai sigură pe care o poate face fluxul.
- **Fără data exactă a comenzii în text.** E-mailul spune „acum aproximativ [ZILE]”, iar numărul îl scrii de mână în fiecare flux.
- **Fără rândul cu al doilea produs din aceeași comandă.** Fiecare produs primește e-mailul lui.
- **Fără calcul pentru orice număr de bucăți**, din cauza limitei de 90 de zile (vezi tabelul).
- **Fără test A/B.** Alternezi variantele de subiect la 2–4 săptămâni și compari rata de click.

**Fluxurile, pe rânduri** (le folosești la pașii de mai jos):

| Numele fluxului | Condiția de intrare R0: `order.lineItems` At least one of | Wait | Condiția de bucăți din G (rezultatele pasului Run code) |
| --- | --- | --- | --- |
| Reaprovizionare · Prime Whey 2 kg | `product.handle` Equal to `prime-whey-2000g` | 55 days | `wheyDoi` = 1 AND `wheyUnu` = 0 |
| Reaprovizionare · Prime Whey 1 kg | `product.handle` Equal to `prime-whey-1000g` | 25 days | `wheyUnu` = 1 AND `wheyDoi` = 0 |
| Reaprovizionare · Prime Whey 1 kg × 2 (opțional) | `product.handle` Equal to `prime-whey-1000g` | 58 days | `wheyUnu` = 2 AND `wheyDoi` = 0 |
| Reaprovizionare · Pure Isolate 2 kg | `product.handle` Equal to `pure-isolate-2000g` | 62 days | `isolate` = 1 |
| Reaprovizionare · Creatină 300 g | `product.handle` Equal to `creatina-creapure` | 50 days | `creatina300` = 1 AND `creatina500` = 0 |
| Reaprovizionare · Creatină 500 g | `product.handle` Equal to `creatina-creapure` | 88 days | `creatina500` = 1 AND `creatina300` = 0 |
| Reaprovizionare · Creamy Rice | `product.tags` Equal to `crema orez` | 17 days | `creamyRice` = 1 |
| Reaprovizionare · Creamy Rice × 2 (opțional) | `product.tags` Equal to `crema orez` | 39 days | `creamyRice` = 2 |
| Reaprovizionare · EAA | `product.handle` Equal to `eaa-aminoacizi-esentiali` | 70 days | `eaa` = 1 |

Handle-urile, eticheta `crema orez` (pusă pe toate cele 7 produse Creamy Rice) și codurile SKU ale creatinei sunt verificate în magazin pe 15 octombrie 2026. Creatina de 300 g și cea de 500 g sunt variante ale aceluiași produs, deci au aceeași condiție de intrare. Gramajul îl deosebește pasul Run code, după SKU: `6421766064404` pentru 300 g și `6421766015109` pentru 500 g. Dacă în listă nu găsești `product.handle`, alegi produsul după titlu.

**Codul pentru pasul Run code «verificare reaprovizionare»** (același în toate fluxurile și în fluxul Client nou; de testat). Pasul îl pui după Wait, ca să citească datele din ziua trimiterii.

Input query (interogarea de intrare):

```graphql
query {
  order {
    id
    cancelledAt
    displayFinancialStatus
    lineItems {
      quantity
      sku
      product {
        handle
        tags
      }
    }
    customer {
      lastOrder {
        id
      }
    }
  }
}
```

Output schema (schema rezultatului):

```graphql
type Output {
  trimite: Boolean!
  neanulata: Boolean!
  reaprovizionareCurand: Boolean!
  wheyDoi: Int!
  wheyUnu: Int!
  isolate: Int!
  creatina300: Int!
  creatina500: Int!
  creamyRice: Int!
  eaa: Int!
}
```

Codul:

```javascript
export default function main(input) {
  const o = input.order ?? {};
  const items = o.lineItems ?? [];
  const bucati = (potrivire) =>
    items.filter(potrivire).reduce((suma, i) => suma + (i.quantity ?? 0), 0);

  const wheyDoi = bucati((i) => i.product?.handle === 'prime-whey-2000g');
  const wheyUnu = bucati((i) => i.product?.handle === 'prime-whey-1000g');
  const creamyRice = bucati((i) => (i.product?.tags ?? []).includes('crema orez'));

  const neanulata = !o.cancelledAt && o.displayFinancialStatus !== 'REFUNDED';
  const ultimaComanda = Boolean(o.id) && o.customer?.lastOrder?.id === o.id;

  return {
    trimite: ultimaComanda && neanulata,
    neanulata,
    reaprovizionareCurand: creamyRice === 1 || (wheyUnu === 1 && wheyDoi === 0),
    wheyDoi,
    wheyUnu,
    isolate: bucati((i) => i.product?.handle === 'pure-isolate-2000g'),
    creatina300: bucati((i) => i.sku === '6421766064404'),
    creatina500: bucati((i) => i.sku === '6421766015109'),
    creamyRice,
    eaa: bucati((i) => i.product?.handle === 'eaa-aminoacizi-esentiali'),
  };
}
```

Ce face, pe scurt: numără bucățile din fiecare produs din tabel, iar `trimite` e adevărat doar dacă această comandă e tot ultima comandă a clientului și nu e anulată sau rambursată integral. Dacă editorul îți arată o eroare la `lineItems`, la `sku` sau la `lastOrder`, o corectezi după sugestia lui.

**Cum îl construiești în Shopify:**

1. **Faci primul flux, cel mai simplu: EAA.** Apps > Flow > Create workflow (Creare flux de lucru). Îi dai numele „Reaprovizionare · EAA”. Lucrezi pe calculator.
2. **Declanșatorul:** Order paid.
3. **Condiția R0 (intrare):** `order.lineItems` At least one of (Cel puțin unul dintre) `product.handle` Equal to (Egal cu) `eaa-aminoacizi-esentiali`. Pe ramura „false” nu pui nimic, așa că fluxul se încheie. Condiția doar triază comenzile: verificarea exactă o face pasul Run code.
4. **Wait (Așteptare):** 70 de zile. Unitățile din câmp nu sunt documentate; dacă nu găsești „zile”, pui ore, de exemplu 1680 de ore pentru 70 de zile (de testat).
5. **Run code (Rulare cod):** lipești interogarea de intrare, schema rezultatului și codul de mai sus.
6. **Condiția G**, cu rândurile legate prin AND (ȘI):
   - rezultatul `trimite` Equal to true;
   - condiția de bucăți din tabelul fluxurilor, aici `eaa` Equal to 1;
   - starea de marketing Equal to SUBSCRIBED. În listă apare fie `defaultEmailAddress.marketingState`, fie `emailMarketingConsent.marketingState`; o alegi pe cea afișată.

   Pe ramura „false” nu pui nimic, așa că fluxul se încheie.
7. **Send marketing email (Trimitere e-mail de marketing):** e-mailul de mai jos, cu valorile pentru EAA din tabelul cu valori.
8. **Testezi** (pasul 11) și lași fluxul salvat și oprit până în ziua lansării (secțiunea 10). Atunci îl pornești: Turn on workflow (Activare flux de lucru). Fluxurile care trimit e-mailuri de marketing apar și în Apps > Messaging > Automations (Aplicații > Messaging > Automatizări).
9. **Duplici fluxul** pentru fiecare rând din tabelul fluxurilor. La fiecare copie schimbi numele, condiția R0, numărul de zile din Wait, condiția de bucăți din G și e-mailul (subiectul, preheaderul, valorile, butonul și rândurile „[Doar pentru …:]”). De testat: verifici dacă copia a păstrat e-mailul. Dacă nu l-a păstrat, îl construiești din nou, pentru că pașii de e-mail nu se pot copia.
10. **Fluxurile opționale** pentru 2 bucăți (Prime Whey 1 kg și Creamy Rice) le faci la fel, doar dacă vrei să acoperi și aceste comenzi.
11. **Testul:**
    - faci o copie de test a fluxului EAA, cu Wait de 0,01 zile (câmpul acceptă zecimale; e aproximativ un sfert de oră) și, în R0, un rând în plus: `customer.tags` Includes (Include) `test-flux`, ca să nu primească e-mailuri clienții reali. Dacă în copie lipsește e-mailul, faci testul pe fluxul original, încă nepornit pentru clienți, cu aceeași așteptare scurtă și același rând, apoi pui la loc cele 70 de zile și ștergi rândul;
    - pui eticheta `test-flux` pe un client de test abonat, cu adresa ta personală, și plasezi pentru el o comandă de test cu EAA, de exemplu o comandă ciornă marcată ca plătită. Dacă fluxul nu pornește, folosești o comandă mică reală, plătită cu cardul (de testat);
    - verifici că primești e-mailul, că lista comenzii și butonul sunt corecte și că rularea apare în View recent activity;
    - mai faci un test în care plasezi o a doua comandă, fără EAA, înainte să treacă așteptarea: rularea trebuie să se oprească la condiția G;
    - apoi oprești copia de test și anulezi comenzile de test.
12. **Urmărești rezultatele** în Apps > Messaging > Automations: Reach, Sessions, Orders, Conversion rate și Sales (Acoperire, Sesiuni, Comenzi, Rată de conversie, Vânzări), iar rulările în View recent activity. Flow afișează un avertisment când pe același declanșator sunt peste 10 fluxuri active. Aici sunt 7–9 pe Order paid, deci avertismentul poate apărea doar dacă mai ai și alte fluxuri pe acest declanșator.

```text
Trigger: Order paid
→ Condition R0: order.lineItems At least one of [product.handle / product.tags = valoarea din tabel]
   false → end
→ Wait <N> days                 (din tabel; cel mult 90)
→ Run code «verificare reaprovizionare»   (același cod în toate fluxurile; de testat)
→ Condition G (toate adevărate):
     Run code: trimite = true            (e tot ultima comandă, neanulată, nerambursată)
     Run code: <bucăți> = <valoare>      (din tabel, de exemplu eaa = 1)
     marketingState = SUBSCRIBED
   false → end
→ Send marketing email: e-mailul produsului
```

### E-mail 1 · Probabil ți se termină [PRODUS] (în ziua din tabel)

**Subiect, 3 variante:**

1. [Prenume], probabil ți se termină [PRODUS]
2. Cum stai cu [PRODUS]?
3. Îți mai ajunge [PRODUS]?

**Preheader:** Dacă iei o porție pe zi, mai ai în jur de [PORȚII_RĂMASE]. Cargus livrează în 1–3 zile lucrătoare.

**Buton (CTA):** Comandă din nou → `[LINK_PRODUS]`

**Setări tehnice:**

- **Locul în flux:** ultimul pas, după condiția G, în ziua din tabel.
- **Un e-mail pentru fiecare flux.** În fiecare copie înlocuiești valorile dintre paranteze drepte cu cele din tabelul de mai jos și ștergi rândurile „[Doar pentru …:]” care nu sunt pentru produsul acelui e-mail. Marcajele dintre paranteze drepte nu rămân în e-mail.
- **[PRODUS] îl scrii de mână**, inclusiv în subiect și în preheader: Shopify nu are o variabilă cu numele produsului pentru subiect. Varianta 1 de subiect trece de 50 de caractere la creatină și la prenumele lungi; acolo folosești varianta 2 sau 3. Pentru [Prenume] din subiect, regula e cea din secțiunea 5.
- **Secțiuni, în ordine:**
  - Custom Liquid cu salutul (codul din secțiunea 5);
  - Text, de la „Acum aproximativ” până la „Ce ai comandat atunci:”;
  - Custom Liquid cu [PRODUSE_COMANDĂ] (codul din secțiunea 5). Pentru că pasul Run code a verificat că nu există o comandă mai nouă, „ultima comandă” este chiar comanda care a pornit fluxul;
  - Button „Comandă din nou”, cu [LINK_PRODUS];
  - Text, de la „Ca să nu rămâi fără” până la paragraful despre livrarea gratuită;
  - Text cu blocul „Ce se potrivește” al produsului;
  - Text, de la „Vrei să schimbi ceva?” până la semnătură;
  - Text cu [Subsolul comun];
  - Footer.
- **Opțional, de testat:** ca blocul „Ce se potrivește” să nu apară când produsul recomandat era deja în aceeași comandă, îl pui într-o secțiune Custom Liquid în locul secțiunii Text, ca în exemplul de mai jos (e-mailul pentru Prime Whey 2 kg). Între `{% unless deja %}` și `{% endunless %}` pui blocul produsului tău. Ce cauți în comandă:
  - la Prime Whey, Pure Isolate și EAA: `'Creapure'`, ca în exemplu;
  - la creatină: `'Prime Whey'`;
  - la Creamy Rice: proteina, deci condiția devine `item.title contains 'Prime Whey' or item.title contains 'Pure Isolate'`.

  Fără cod, blocul apare mereu, ceea ce e în regulă.
- **Fără reducere și fără mențiuni de sănătate:** descrii doar ce e produsul și cu ce îl combini.

```liquid
{% assign deja = false %}
{% for item in customer.last_order.line_items %}
  {% if item.title contains 'Creapure' %}{% assign deja = true %}{% endif %}
{% endfor %}
{% unless deja %}
<p><strong>Ce se potrivește cu Prime Whey 2 kg: Creatina Creapure®.</strong> Are un singur ingredient, creatină monohidrat micronizată, și o găsești la 300 g (60 de porții) sau la 500 g (100 de porții). Sfatul meu: pune porția zilnică de creatină în shake-ul de proteină, ca să n-o uiți. <a href="https://primesupplements.ro/products/creatina-creapure">Vezi creatina →</a></p>
{% endunless %}
```

**Valorile pentru fiecare e-mail:**

| E-mail | [PRODUS] | [ZILE] | [PORȚII] | [PORȚII_RĂMASE] | [LINK_PRODUS] | Rândurile „[Doar pentru …:]” pe care le păstrezi |
| --- | --- | --- | --- | --- | --- | --- |
| Prime Whey 2 kg | Prime Whey 2 kg | 55 de zile | 66 de porții | 11 porții | `https://primesupplements.ro/products/prime-whey-2000g` | aroma; potrivirea pentru Prime Whey sau Pure Isolate |
| Prime Whey 1 kg | Prime Whey 1 kg | 25 de zile | 33 de porții | 8 porții | `https://primesupplements.ro/products/prime-whey-1000g` | aroma; cutia de 2 kg; potrivirea pentru Prime Whey sau Pure Isolate |
| Prime Whey 1 kg × 2 (opțional) | Prime Whey 1 kg | 58 de zile | 66 de porții | 8 porții | `https://primesupplements.ro/products/prime-whey-1000g` | aroma; cutia de 2 kg; potrivirea pentru Prime Whey sau Pure Isolate |
| Pure Isolate 2 kg | Pure Isolate 2 kg | 62 de zile | 74 de porții | 12 porții | `https://primesupplements.ro/products/pure-isolate-2000g` | aroma; potrivirea pentru Prime Whey sau Pure Isolate |
| Creatină 300 g | Creatina Creapure® 300 g | 50 de zile | 60 de porții | 10 porții | `https://primesupplements.ro/products/creatina-creapure?variant=56938509336951` | creatina, 5 g pe zi; varianta de 500 g; potrivirea pentru creatină |
| Creatină 500 g | Creatina Creapure® 500 g | 88 de zile | 100 de porții | 12 porții | `https://primesupplements.ro/products/creatina-creapure?variant=56938509304183` | creatina, 5 g pe zi; potrivirea pentru creatină |
| Creamy Rice | Creamy Rice | 17 zile | 22 de porții | 5 porții | `https://primesupplements.ro/collections/crema-de-orez` | aromele de Creamy Rice; potrivirea pentru Creamy Rice |
| Creamy Rice × 2 (opțional) | Creamy Rice | 39 de zile | 44 de porții | 5 porții | `https://primesupplements.ro/collections/crema-de-orez` | aromele de Creamy Rice; potrivirea pentru Creamy Rice |
| EAA | EAA | 70 de zile | 83 de porții | 13 porții | `https://primesupplements.ro/products/eaa-aminoacizi-esentiali` | aroma; potrivirea pentru EAA |

Dacă la creatina de 500 g alegi 83 de zile în loc de 88, scrii „83 de zile” și „17 porții”.

**Textul e-mailului:**

> Salut, [Prenume]!
>
> Acum aproximativ [ZILE] ai comandat [PRODUS], adică [PORȚII] în total.
>
> Dacă iei o porție pe zi, probabil ți se termină curând: îți mai rămân în jur de [PORȚII_RĂMASE]. Dacă iei mai rar sau ai făcut pauze, probabil mai ai destul, iar acest e-mail poate să aștepte.
>
> [Doar pentru Creatina Creapure®:] Socoteala e făcută pentru o porție de 5 g pe zi. Dacă iei 3 g pe zi, îți ajunge mai mult.
>
> **Ce ai comandat atunci:**
>
> [PRODUSE_COMANDĂ]
>
> **[ Comandă din nou ]**
>
> Ca să nu rămâi fără, comandă cu câteva zile înainte să se termine: Cargus livrează în 1–3 zile lucrătoare.
>
> [Doar pentru Prime Whey, Pure Isolate și EAA:] Pe pagina produsului alegi aroma: aceeași ca data trecută sau una nouă.
>
> [Doar pentru Creamy Rice:] Butonul te duce la toate aromele de Creamy Rice: o alegi pe cea de data trecută sau încerci una nouă.
>
> [Doar pentru Prime Whey 1 kg:] Dacă iei proteină zilnic, există și cutia de 2 kg, cu 66 de porții. Așa comanzi mai rar.
>
> [Doar pentru Creatina Creapure® 300 g:] Dacă iei creatină zilnic, există și varianta de 500 g, cu 100 de porții. Așa comanzi mai rar.
>
> **Livrare gratuită peste 300 de lei.** Sub această sumă, livrarea costă 20 de lei. Dacă pui în aceeași comandă și alt produs pe care îl folosești, ajungi mai ușor la 300 de lei.
>
> [Doar pentru Prime Whey sau Pure Isolate:] **Ce se potrivește cu [PRODUS]: Creatina Creapure®.** Are un singur ingredient, creatină monohidrat micronizată, și o găsești la 300 g (60 de porții) sau la 500 g (100 de porții). Sfatul meu: pune porția zilnică de creatină în shake-ul de proteină, ca să n-o uiți. [Vezi creatina →](https://primesupplements.ro/products/creatina-creapure)
>
> [Doar pentru Creatina Creapure®:] **Ce se potrivește cu [PRODUS]: Prime Whey.** E proteină din zer concentrat, cu 82 g de proteine la 100 g de produs. O găsești în 7 arome, la 2 kg (66 de porții) sau la 1 kg (33 de porții). Sfatul meu: pune porția zilnică de creatină în shake-ul de proteină, ca să n-o uiți. [Vezi pudrele proteice →](https://primesupplements.ro/collections/pudra-proteica)
>
> [Doar pentru Creamy Rice:] **Ce se potrivește cu Creamy Rice: proteina.** Amestecă o porție de Prime Whey sau de Pure Isolate în crema de orez gata preparată și ai într-un singur bol și carbohidrați, și proteine. [Vezi pudrele proteice →](https://primesupplements.ro/collections/pudra-proteica)
>
> [Doar pentru EAA:] **Ce se potrivește cu EAA: Creatina Creapure®.** Are un singur ingredient, creatină monohidrat micronizată. O iei zilnic, în aceeași doză, și o poți amesteca în aceeași băutură cu EAA, ca să n-o uiți. [Vezi creatina →](https://primesupplements.ro/products/creatina-creapure)
>
> **Vrei să schimbi ceva?** Altă aromă, alt gramaj sau o recomandare pentru obiectivul tău de acum: răspunde la acest e-mail sau scrie-ne pe WhatsApp, la 0775 286 584. Luni–vineri, 8:00–18:00, răspundem în medie într-o oră.
>
> Spor la antrenament, Marius Chera, fondator Prime Supplements
>
> [Subsolul comun]

## 7. Recâștigare și curățarea listei (3 e-mailuri)

Clienții abonați care n-au mai comandat de 90 de zile primesc două e-mailuri care le dau un motiv să revină, fără reducere. Abonații care n-au mai apăsat pe niciun link din e-mailurile noastre în 180 de zile sunt întrebați o singură dată dacă mai vor să le primească, iar cine nu răspunde nu mai primește campanii.

| E-mail | Când pleacă | Cui | Tema |
| --- | --- | --- | --- |
| 1 | În jurul zilei 90 după ultima comandă, când clientul intră în segmentul de recâștigare | Abonați cu cel puțin o comandă | Ce mai faci, ce e nou la noi și o recomandare, dacă ne răspunzi |
| 2 | La 14 zile după e-mailul 1 (în jurul zilei 104), doar dacă n-a comandat între timp | Aceiași | Refă-ți rezervele: produsele din ultima comandă și livrarea gratuită peste 300 de lei |
| 3 | Când abonatul ajunge la 180 de zile fără niciun click. Fluxul pornește abia în ziua D0+180 | Abonați care primesc e-mailurile noastre de cel puțin 180 de zile, fără comandă în ultimele 180 de zile | „Mai vrei să primești e-mailurile noastre?” |

**D0** e ziua primului newsletter trimis din Shopify Messaging (secțiunea 8). În ultimele 180 de zile, Shopify n-a livrat niciun e-mail de marketing din magazin, așa că abia după 180 de zile de trimiteri știe cine apasă pe linkuri și cine nu.

**Ce răspunde auditului:** agenția a găsit că vechiul flux de curățare (sunset) pornea după doar 30 de zile fără activitate. La suplimente e prea devreme: mulți clienți comandă din nou abia după mai mult de o lună, așa că pragul vechi scotea din listă oameni care ar fi revenit. Agenția a cerut un prag mai lung și o recâștigare înainte. Aici pragul e de 180 de zile, iar clienții trec întâi prin recâștigare, la 90 și la 104 zile de la ultima comandă.

**Ce arată magazinul acum** (citit pe 14 octombrie 2026): segmentul de recâștigare are 1.061 de abonați. Doar 79 dintre ei au ultima comandă în ultimele 6 luni, iar 862 n-au mai comandat de peste un an. 340 au deschis un e-mail trimis din Shopify în ultimul an.

**Cine primește și cine nu:**

- **Recâștigarea (e-mailurile 1 și 2):** doar abonații la marketing prin e-mail (starea SUBSCRIBED) care au cel puțin o comandă. Clienții neabonați nu primesc nimic, chiar dacă au comandat. Seria de bun venit cere 0 comenzi, iar fluxul Client nou se încheie în ziua 21, deci niciunul nu se suprapune cu recâștigarea.
- **Curățarea (e-mailul 3):** orice abonat care primește e-mailurile noastre de cel puțin 180 de zile și n-a dat click în acest timp, fie că a comandat vreodată, fie că nu. Cine a comandat în ultimele 180 de zile nu intră: el trece întâi prin recâștigare, care se încheie în jurul zilei 104. Un client vechi care abia s-a abonat nu primește e-mailul 3 până nu trec 180 de zile de la primul nostru e-mail (regula din pasul 8).
- **Iese din recâștigare** când plasează o comandă sau se dezabonează. Se verifică înaintea fiecărui e-mail.
- **Iese din curățare, fără etichetă,** când apasă pe un link din orice e-mail de la noi, plasează o comandă sau se dezabonează. Click-ul pe dezabonare nu înseamnă „da”: abonatul e dezabonat imediat.
- **Reintrare:** recâștigarea pornește din nou doar după o comandă nouă, urmată de alte 90 de zile fără comandă. Curățarea pornește din nou doar după un click nou, urmat de alte 180 de zile fără click.

**Eticheta „email-inactiv”:**

- Se pune singură (fluxul B), dacă abonatul n-a dat click și n-a comandat în cele 14 zile de după e-mailul 3. Cei care primesc e-mailul 3 prin campania unică de la pasul 12 nu primesc eticheta: pe ei îi lasă afară segmentul „Email · implicați (de folosit după 180 de zile)”, folosit la campanii din ziua D0+194.
- Nu e o dezabonare și nu schimbă acordul de marketing. Flow nu are o acțiune de dezabonare, iar excluderea din campanii e suficientă.
- Contactul cu etichetă nu mai primește newsletterul și ofertele (audiența e în secțiunea 8). Fluxurile pornite de o acțiune a lui, de exemplu coșul sau checkout-ul abandonat, rămân active, pentru că acțiunea arată că e din nou interesat.
- Se scoate singură când contactul apasă pe un link sau plasează o comandă (fluxul C).
- **Când cineva îți cere să revină pe listă** (cum promite e-mailul 3), îi pui eticheta `revenire-lista`: Customers > clientul > Tags. Eticheta contează datorită regulii adăugate la pasul 8 în segmentul „Email · implicați (de folosit după 180 de zile)”. Contactul intră în segment, primește din nou campaniile, iar fluxul C îi scoate singur eticheta `email-inactiv`. Eticheta `revenire-lista` rămâne pe client: cât timp o are, nu mai primește e-mailul 3.
- **Dezabonarea rămâne la un click.** Fiecare e-mail are în subsol linkul de dezabonare, pus automat de Shopify. Cine îți cere dezabonarea pe e-mail sau pe WhatsApp e dezabonat de tine imediat: Customers > clientul > … > Edit marketing settings (Editați setările de marketing) > debifezi „Customer agreed to receive marketing emails” (Clientul a fost de acord să primească e-mailuri de marketing) > Save. Nu automatiza asta: nu e confirmat că Flow are voie să schimbe acordul de marketing.

**Ce s-a schimbat față de varianta veche:**

- **Fără oră fixă (19:00).** Automatizările nu pot trimite la o anumită oră. E-mailul 1 pleacă atunci când clientul intră în segment, iar e-mailul 2 la 14 zile după. Shopify nu spune cât de repede se actualizează un segment, așa că „ziua 90” înseamnă „în jurul zilei 90”.
- **Fără amânări între fluxuri și fără protecție anti-oboseală automată.** Shopify nu poate amâna un e-mail de aici pentru că în aceeași zi a plecat altul. La creatina de 500 g, reamintirea de reaprovizionare din ziua 88 (secțiunea 6) cade cu 2 zile înaintea e-mailului 1. Varianta cu 83 de zile din secțiunea 6 lasă o săptămână între ele.
- **Fără excepția pentru comenzile anulate sau rambursate.** Segmentul folosește data ultimei comenzi, așa cum o vede Shopify.
- **Clienții care sunt deja în segment primesc e-mailul 1 printr-o campanie unică**, nu în tranșe (pasul 7).
- **Lista de produse din e-mailul 2** e o secțiune Custom Liquid cu numele și aroma, fără imagini și fără prețuri. Textul e-mailului nu are acces la stoc, așa că nu poate ascunde produsele epuizate.
- **Codul opțional din e-mailul 2 poate fi doar comun**, cu o dată de final reală. Flow nu poate crea coduri de reducere, deci nici coduri personale.
- **Curățarea pornește abia în ziua D0+180.** Click-urile din e-mailurile trimise prin theMarketer nu ajung în Shopify, iar azi aproape toți abonații ar părea inactivi: segmentul „Email · candidați curățare (fără click 180 de zile)” are 2.748 de persoane din 3.079. Nu mai e nevoie de exportul click-urilor din theMarketer.
- **Fără test A/B.** Folosești o variantă de subiect 2–4 săptămâni, apoi următoarea, și compari rata de click din raportul fiecărui e-mail.
- **Fluxul vechi de curățare din theMarketer (30 de zile)** îl oprești la trecere, odată cu celelalte automatizări theMarketer, ca nimeni să nu mai fie scos din listă după regula veche.

**Calendarul:**

| Când | Ce faci |
| --- | --- |
| Înainte de trecere | Construiești fluxurile A, B și C de mai jos și le salvezi oprite. Creezi segmentul „Email · recâștigare – campanie unică” și completezi regula segmentului „Email · implicați” (pasul 8). Pe amândouă le pot face și eu, dacă îmi ceri. |
| După săptămânile de încălzire (în jurul zilei D0+21, secțiunea 8; cu pasul intermediar din secțiunea 8, o săptămână mai târziu) | Pornești fluxul A. După 1–2 zile trimiți campania unică cu e-mailul 1. Opțional, după încă 14 zile, campania cu e-mailul 2. |
| Ziua D0+180 | Dimineața pornești fluxurile B și C. Campania unică cu e-mailul 3, dacă e nevoie, o programezi pentru aceeași zi, la 19:00 (pasul 12). |
| Ziua D0+194 | Toate campaniile trec pe segmentul „Email · implicați (de folosit după 180 de zile)” (secțiunea 8). |

Notează-ți în calendar datele D0+21, D0+180 și D0+194 imediat după primul newsletter.

**Cum îl construiești în Shopify:**

Lucrezi pe calculator: pe telefon, automatizările nu se pot edita. Pașii de e-mail nu se pot copia, așa că fiecare pas Send marketing email (Trimitere e-mail de marketing) îl construiești separat.

*Partea A · Recâștigarea (fluxul A)*

1. **Verifici că nu există deja o automatizare de recâștigare.** Deschizi Apps > Messaging > Automations (Aplicații > Messaging > Automatizări). Dacă „Win back customers” e deja pornită, o oprești: două automatizări de recâștigare ar trimite e-mailuri duble.
2. **Creezi automatizarea din șablon.** Create automation (Creare automatizare) > „Win back customers” > Save without turning on (Salvați fără a activa). Șablonul pornește de la declanșatorul Customer joined segment (Client intrat în segment). Dacă preferi să pornești de la zero: Apps > Flow > Create workflow (Creare flux de lucru), cu același declanșator.
3. **Refaci pașii fluxului.** Deschizi automatizarea > Edit workflow (Editează fluxul de lucru) și o aduci la schița „Flux A” de mai jos:
   - **Declanșatorul:** alegi segmentul „Email · recâștigare (90 de zile fără comandă)”. E deja creat, cu regula `email_subscription_status = 'SUBSCRIBED' AND number_of_orders >= 1 AND last_order_date <= -90d`, adică abonat, cu cel puțin o comandă, iar ultima comandă e de acum 90 de zile sau mai mult.
   - **Imediat după declanșator:** acțiunea Add customer tags, cu eticheta `recastigare-auto`. Ea marchează cine a intrat în automatizare, ca să nu primească e-mailul 1 și din campania unică de la pasul 7.
   - **Condiția R0:** starea de marketing Equal to (Egal cu) SUBSCRIBED. În listă apare fie `defaultEmailAddress.marketingState`, fie `emailMarketingConsent.marketingState`; o alegi pe cea afișată. Pe ramura „false” nu pui nimic, așa că fluxul se încheie.
   - **Send marketing email** cu e-mailul 1. Dacă șablonul are deja un e-mail cu reducere sau o secțiune Discount, le ștergi: fluxul nu dă reduceri.
   - **Wait (Așteptare) 14 days.** Unitățile din câmp nu sunt documentate; dacă nu găsești „zile”, pui 336 de ore (de testat).
   - **Look up customer in segment (Căutare client în segment)**, cu același segment de recâștigare. Shopify recitește datele după fiecare Wait: cine a comandat între timp are o ultimă comandă recentă și a ieșit din segment.
   - **Condiția R1**, cu rândurile legate prin AND (ȘI): starea de marketing Equal to SUBSCRIBED și rezultatul pasului Look up arată că clientul e încă în segment (îl alegi din listă, în condiție). Pe ramura „false” nu pui nimic.
   - **Send marketing email** cu e-mailul 2.

   La final apeși Apply changes (Aplică modificările).
4. **Pui textele în e-mailuri.** La fiecare pas de e-mail: meniul automatizării > Edit, apoi Subject (una dintre cele 3 variante), Preview text (preheaderul) și secțiunile din „Setări tehnice”. Apoi Save > Exit. Logo-ul, culorile și fontul vin din Apps > Messaging > Templates > Manage branding.
5. **Testezi pe o copie a fluxului**, ca să nu aștepți 90 de zile:
   - în Customers > Segments (Clienți > Segmente) creezi segmentul de test „Test · recâștigare”, cu regula `customer_tags CONTAINS 'test-recastigare'`;
   - duplici fluxul A în Flow. În copie schimbi segmentul din declanșator și din pasul Look up pe „Test · recâștigare” și pui Wait 0,01 days (câmpul acceptă zecimale; e aproximativ un sfert de oră);
   - pornești copia și pui eticheta `test-recastigare` pe un client de test abonat, cu adresa ta personală și cu cel puțin o comandă de test. Clientul intră în segment, iar copia pornește. Vezi și cât durează până pornește, pentru că Shopify nu documentează asta;
   - verifici că primești e-mailul 1 și apoi e-mailul 2, că salutul și lista de produse sunt corecte și că rulările apar în View recent activity;
   - al doilea test: scoți eticheta înainte să treacă așteptarea. E-mailul 2 nu trebuie să mai plece, la fel ca la un client care a comandat;
   - la final oprești copia, o ștergi, ștergi segmentul de test și scoți eticheta `recastigare-auto` de pe clientul de test.
6. **Pornești fluxul A după săptămânile de încălzire** (secțiunea 8), în săptămâna în care campaniile trec la toți abonații: Turn on automation (Activați automatizarea). De atunci, fiecare client care ajunge la 90 de zile fără comandă primește singur seria.
7. **Campania unică pentru clienții care sunt deja în segment** (1.061 la 14 octombrie 2026). Ei nu pornesc automatizarea: aceasta pornește doar pentru cine intră în segment după ce ai activat-o (de testat: documentația nu spune; verifici în View recent activity). Lor le trimiți o singură dată e-mailul 1, ca o campanie:
   - în Customers > Segments creezi segmentul „Email · recâștigare – campanie unică”, cu regula `email_subscription_status = 'SUBSCRIBED' AND number_of_orders >= 1 AND last_order_date <= -90d AND customer_tags NOT CONTAINS 'recastigare-auto'`. Regula a fost verificată pe 14 octombrie 2026 și dă 1.061 de persoane, pentru că nimeni nu are încă eticheta. Eticheta îi scoate pe cei intrați deja în fluxul A, așa că nimeni nu primește e-mailul 1 de două ori, chiar dacă Shopify ar porni automatizarea și pentru clienții vechi;
   - Apps > Messaging > Create campaign > Custom templates > „Prime · bază” (Aplicații > Messaging > Creare campanie > Șabloane personalizate), care are deja subsolul comun (secțiunea 10, pasul 1). Pui textul și secțiunile e-mailului 1. To (Către): „Email · recâștigare – campanie unică”;
   - din meniul ⋯ > Edit UTM parameters (Editați parametrii UTM) pui `utm_campaign=recastigare-campanie-unica`;
   - Send test (Trimitere test), apoi Review > Schedule send > Custom date and time > Schedule (Examinare > Programare trimitere > Dată și oră personalizate > Programare), la 1–2 zile după pasul 6. Alegi o zi de lucru, la 19:00, nu duminică, când pleacă newsletterul;
   - segmentul are peste 1.000 de persoane, deci Smart delivery (Expediere inteligentă) se aplică: Shopify poate trimite campania doar celor implicați. E normal pentru o listă în care majoritatea n-au mai comandat de peste un an;
   - dacă Shopify a pornit totuși automatizarea și pentru clienții vechi, toți au primit eticheta și segmentul ajunge la 0 persoane. O campanie programată la un segment fără niciun abonat revine la ciornă, deci nu pleacă nimic de două ori;
   - **opțional, după 14 zile:** e-mailul 2 ca a doua campanie, la același segment. Între timp, cine a comandat a ieșit din segment, iar cine a intrat în fluxul A are eticheta și primește e-mailul 2 de acolo.

*Partea B · Curățarea listei (fluxurile B și C, pornite în ziua D0+180)*

8. **Construiești fluxul B** și îl salvezi oprit: Apps > Flow > Create workflow, cu numele „Curățare · întrebare și etichetă”. Pașii, după schița „Flux B”:
   - **Înainte de flux, completezi o singură dată segmentul „Email · implicați (de folosit după 180 de zile)”:** Customers > Segments > segmentul > înlocuiești regula cu cea de mai jos > Save. Regula nouă adaugă două condiții: eticheta `revenire-lista` (cei care cer să revină pe listă) și „primește e-mailuri de la noi de mai puțin de 180 de zile”. Fără a doua, un client vechi care abia s-a abonat ar părea inactiv: ar primi e-mailul 3 imediat după abonare, iar din ziua D0+194 n-ar mai primi newsletterul. Regula nouă: `email_subscription_status = 'SUBSCRIBED' AND (shopify_email.clicked MATCHES (date >= -180d) OR customer_added_date >= -180d OR products_purchased MATCHES (date >= -180d) OR customer_tags CONTAINS 'revenire-lista' OR shopify_email.delivered NOT MATCHES (date <= -180d))`. De testat în editor: dacă nu acceptă ultima parte, scrii în locul ei `shopify_email.delivered(until: -180d) = false`. Verificată prin API pe 15 octombrie 2026, în forma cu `(since: …)` și `(until: …)`, regula are azi 743 de persoane, față de 562 cu regula de acum. O pot schimba și eu, dacă îmi ceri;
   - **Declanșatorul:** Customer joined segment, cu segmentul „Email · candidați curățare (fără click 180 de zile)”. E deja creat, cu regula `email_subscription_status = 'SUBSCRIBED' AND shopify_email.clicked NOT MATCHES (date >= -180d) AND customer_added_date < -180d`: abonat, fără niciun click în e-mailurile Shopify în ultimele 180 de zile, iar clientul există în magazin de peste 180 de zile (Shopify numără de la data la care clientul a fost creat, nu de la abonare);
   - **Look up customer in segment**, cu segmentul „Email · implicați (de folosit după 180 de zile)”. În el e oricine a dat click, a comandat sau a fost creat în magazin în ultimele 180 de zile, cine primește e-mailurile noastre de mai puțin de 180 de zile și cine are eticheta `revenire-lista`;
   - **Condiția S0:** starea de marketing Equal to SUBSCRIBED AND rezultatul pasului Look up arată că clientul **nu** e în „Email · implicați”, adică n-a comandat în ultimele 180 de zile și primește e-mailurile noastre de cel puțin 180 de zile. Pe ramura „false” nu pui nimic;
   - **Add customer tags** cu eticheta `curatare-intrebat`. Ea marchează cine a primit întrebarea, ca să nu o primească și din campania unică de la pasul 12;
   - **Send marketing email** cu e-mailul 3;
   - **Wait 14 days** (sau 336 de ore);
   - din nou **Look up customer in segment**, cu „Email · implicați (de folosit după 180 de zile)”. Un click pe orice link sau o comandă îl aduc înapoi în segment, deci o singură verificare acoperă ambele cazuri;
   - **Condiția S1:** starea de marketing Equal to SUBSCRIBED AND clientul tot **nu** e în „Email · implicați”. Pe ramura „false” nu pui nimic: a răspuns, a comandat sau s-a dezabonat;
   - **Add customer tags** cu eticheta `email-inactiv`.
9. **Construiești fluxul C** și îl salvezi oprit: Apps > Flow > Create workflow, cu numele „Curățare · scoate eticheta”:
   - **Declanșatorul:** Customer joined segment, cu segmentul „Email · implicați (de folosit după 180 de zile)”;
   - **Condiția:** `customer.tags` Includes (Include) `email-inactiv`. Pe ramura „false” nu pui nimic. Fluxul pornește și la fiecare abonat nou, dar se oprește aici, fără să facă nimic;
   - **Remove customer tags**, cu eticheta `email-inactiv`.
10. **Testezi fluxurile B și C pe copii**, la fel ca la pasul 5:
    - pentru B: creezi segmentele de test „Test · curățare” (`customer_tags CONTAINS 'test-curatare'`) și „Test · activ” (`customer_tags CONTAINS 'test-activ'`). În copie pui „Test · curățare” în declanșator, „Test · activ” în ambii pași Look up și Wait 0,01 days. Clientul tău de test primește eticheta `test-curatare`: trebuie să primești e-mailul 3, iar după așteptare clientul trebuie să primească eticheta `email-inactiv`. Al doilea test: pui eticheta `test-activ` în timpul așteptării; eticheta `email-inactiv` nu trebuie să apară;
    - pentru C: creezi un client de test nou, abonat, cu eticheta `email-inactiv`. Fiind nou, intră în „Email · implicați”, iar fluxul C trebuie să-i scoată eticheta;
    - apoi oprești și ștergi copiile și segmentele de test, iar de pe clientul de test scoți etichetele `test-curatare`, `test-activ`, `curatare-intrebat` și `email-inactiv`.
11. **În ziua D0+180 pornești fluxurile B și C:** Turn on workflow (Activare flux de lucru). Din acel moment, fiecare abonat care ajunge la 180 de zile fără click primește singur e-mailul 3.
12. **Campania unică cu e-mailul 3**, în aceeași zi cu pasul 11, la 19:00. Abonații care n-au dat niciun click din ziua D0 sunt deja în segmentul de candidați, deci nu pornesc fluxul B. La pasul 7 ai văzut deja, în View recent activity, dacă Shopify pornește un flux și pentru cei aflați deja în segment. Dacă îl pornește, nu mai trimiți campania: fluxul B le trimite tuturor e-mailul 3. Dacă nu, faci campania așa:
    - creezi segmentul „Email · curățare de pornire (o singură dată)”, cu regula `email_subscription_status = 'SUBSCRIBED' AND shopify_email.clicked NOT MATCHES (date >= -180d) AND customer_added_date < -180d AND (number_of_orders = 0 OR last_order_date < -180d) AND shopify_email.delivered MATCHES (date <= -180d) AND customer_tags NOT CONTAINS 'curatare-intrebat' AND customer_tags NOT CONTAINS 'revenire-lista'`. Sunt candidații care nu sunt în „Email · implicați” și n-au primit încă întrebarea (de testat în editor; dacă nu acceptă forma cu `MATCHES (date …)`, scrii `shopify_email.clicked(since: -180d) = false` și `shopify_email.delivered(until: -180d) = true`). În această a doua formă, regula a fost verificată prin API pe 15 octombrie 2026 și ar avea azi 2.334 de persoane;
    - Create campaign > Custom templates > „Prime · bază”, cu textul și secțiunile e-mailului 3. To: segmentul de mai sus. UTM: `utm_campaign=curatare-campanie-unica`. Send test, apoi Schedule send în ziua D0+180, la 19:00. D0 e o duminică, deci D0+180 e o vineri, zi de lucru. Până la ora trimiterii, fluxul B a pus eticheta `curatare-intrebat` pe cei care au intrat în segment în cursul zilei, așa că ei nu primesc e-mailul 3 de două ori. Iar până la primul newsletter trimis doar la „Email · implicați” (duminică, D0+196) trec mai mult de 14 zile, cum promite e-mailul;
    - Smart delivery se aplică și aici, deci Shopify poate să nu-l trimită tuturor. E în regulă: cine nu dă click nu mai intră în campanii din ziua D0+194, pentru că nu e în „Email · implicați”.
13. **Din ziua D0+194, toate campaniile pleacă la „Email · implicați (de folosit după 180 de zile)”**: newsletterul și ofertele (secțiunea 8). Segmentul îi lasă afară singur pe cei care primesc e-mailurile noastre de cel puțin 180 de zile, dar n-au dat click și n-au comandat în acest timp, inclusiv pe cei care n-au răspuns la campania unică.
14. **Urmărești rezultatele** în Apps > Messaging > Automations: Reach, Sessions, Orders, Conversion rate și Sales (Acoperire, Sesiuni, Comenzi, Rată de conversie, Vânzări). Raportul fiecărui e-mail e în lista de activități > … > View report, iar rulările în View recent activity. O dată pe lună te uiți câte persoane are segmentul „Email · inactivi (exclus din campanii)”.

**Salutul și lista de produse.** Salutul e același ca în secțiunea 5. Îl pui într-o secțiune Custom Liquid (Liquid personalizat), prima din e-mail. Secțiunile Custom Liquid se adaugă doar de pe calculator. De testat cu un e-mail de test:

```liquid
<p>{% if customer.first_name != blank %}Salut, {{ customer.first_name }}!{% else %}Salut!{% endif %}</p>
```

Codul pentru [PRODUSE_COMANDĂ_ANTERIOARĂ] din e-mailul 2 (secțiune Custom Liquid; de testat cu un e-mail de test). Arată produsele din ultima comandă, cu aroma și câte un link „Comandă din nou →”. Scrie „Cluster” în locul titlului din magazin, care conține încă vechea denumire, și nu pune link spre pagina lui, pentru că și adresa paginii conține vechea denumire. Sare peste produsele al căror nume sună a efect asupra sănătății: Recovery Glutamin, Recovery BCAA, Fat Burning Booster Shot, Thermo Core, Energy Pump Shot, Water Out (capsule și tinctură), Testo Revive, Cardio Calm și Liver Protect. Rămân scoase până le redenumești sau le verifică un jurist. Dacă nu rămâne niciun produs, apare fraza de rezervă. Dacă la test linkurile nu duc la produs, ștergi partea cu `<a …>`; dacă aroma apare de două ori sau greșit, ștergi partea cu `variant_title`.

```liquid
{% assign gasite = 0 %}
{% capture lista %}
{% for item in customer.last_order.line_items %}
  {% assign sari = false %}
  {% if item.title contains 'Recovery' or item.title contains 'Fat Burning' or item.title contains 'Thermo Core' or item.title contains 'Energy Pump' or item.title contains 'Water Out' or item.title contains 'Testo Revive' or item.title contains 'Cardio Calm' or item.title contains 'Liver Protect' %}
    {% assign sari = true %}
  {% endif %}
  {% unless sari %}
    {% assign gasite = gasite | plus: 1 %}
    {% assign link = '' %}
    {% if item.title contains 'Cluster' %}
      {% assign nume = 'Cluster' %}
    {% else %}
      {% assign nume = item.title %}
      {% if item.product.handle != blank %}{% assign link = 'https://primesupplements.ro/products/' | append: item.product.handle %}{% endif %}
    {% endif %}
    <li>{{ nume }}{% if item.variant_title != blank and item.variant_title != 'Default Title' %} · {{ item.variant_title }}{% endif %}{% if link != '' %} · <a href="{{ link }}">Comandă din nou →</a>{% endif %}</li>
  {% endunless %}
{% endfor %}
{% endcapture %}
{% if gasite > 0 %}
<p>Ca să nu mai cauți prin site, am pus aici produsele din ultima ta comandă:</p>
<ul>{{ lista }}</ul>
{% else %}
<p>Ca să nu mai cauți prin site, mai jos găsești produsele pe care clienții noștri le aleg cel mai des.</p>
{% endif %}
```

Îmbrăcămintea și accesoriile din ultima comandă apar și ele în listă, pentru că textul e-mailului nu le poate deosebi sigur de suplimente.

```text
Flux A · Recâștigare (automatizarea „Win back customers”, editată în Flow)
Trigger: Customer joined segment → „Email · recâștigare (90 de zile fără comandă)”
→ Add customer tags: recastigare-auto
→ Condition R0: marketingState = SUBSCRIBED
   false → end
→ Send marketing email: E-mail 1 · Ce mai faci și ce e nou
→ Wait 14 days   (sau 336 hours)
→ Look up customer in segment → „Email · recâștigare (90 de zile fără comandă)”
→ Condition R1 (toate adevărate):
     marketingState = SUBSCRIBED
     clientul e încă în segment   (n-a comandat de la e-mailul 1)
   false → end
→ Send marketing email: E-mail 2 · Refă-ți rezervele

Flux B · Curățare: întrebare și etichetă (pornit în ziua D0+180)
Înainte: regula completată a segmentului „Email · implicați” (pasul 8)
Trigger: Customer joined segment → „Email · candidați curățare (fără click 180 de zile)”
→ Look up customer in segment → „Email · implicați (de folosit după 180 de zile)”
→ Condition S0 (toate adevărate):
     marketingState = SUBSCRIBED
     clientul NU e în „Email · implicați”   (fără comandă în 180 de zile, primește e-mailuri de cel puțin 180 de zile)
   false → end
→ Add customer tags: curatare-intrebat
→ Send marketing email: E-mail 3 · Mai vrei să primești e-mailurile noastre?
→ Wait 14 days   (sau 336 hours)
→ Look up customer in segment → „Email · implicați (de folosit după 180 de zile)”
→ Condition S1 (toate adevărate):
     marketingState = SUBSCRIBED
     clientul tot NU e în „Email · implicați”   (fără click și fără comandă de la e-mailul 3)
   false → end
→ Add customer tags: email-inactiv
   (campaniile îl lasă afară: secțiunea 8)

Flux C · Curățare: scoate eticheta (pornit în ziua D0+180)
Trigger: Customer joined segment → „Email · implicați (de folosit după 180 de zile)”
→ Condition: customer.tags Includes email-inactiv
   false → end
→ Remove customer tags: email-inactiv

Campanii unice (o singură dată, de mână):
D0+22…23:  E-mail 1 → „Email · recâștigare – campanie unică”   (+ opțional E-mail 2 după 14 zile)
D0+180, 19:00: E-mail 3 → „Email · curățare de pornire (o singură dată)”
```

### E-mail 1 · Ce mai faci și ce e nou (în jurul zilei 90)

**Subiect, 3 variante:**

1. [Prenume], cum merge antrenamentul?
2. Ce e nou la Prime de la ultima ta comandă
3. Vrei o recomandare pentru ce urmează?

**Preheader:** Ghiduri noi pe blog, cele mai vândute produse și o recomandare pentru tine, dacă ne răspunzi.

**Buton (CTA):** Vezi cele mai vândute → `https://primesupplements.ro/collections/suplimente-sala?sort_by=best-selling`

**Setări tehnice:**

- **Locul în flux:** primul e-mail din fluxul A, imediat după condiția R0. Același text și aceleași secțiuni le folosești și în campania unică de la pasul 7.
- **[Prenume] în subiect:** regula din secțiunea 5. Dacă vezi că mulți clienți nu au prenume în Shopify, folosești varianta 2 sau 3.
- **Secțiuni, în ordine:**
  - Custom Liquid cu salutul;
  - Text, de la „Sunt Marius Chera” până la lista cu cele patru produse;
  - Button „Vezi cele mai vândute”;
  - Text, de la „Vrei o recomandare pentru tine?” până la semnătură;
  - Text cu [Subsolul comun];
  - Footer.
- **Fără reducere și fără WELCOME5:** toți clienții de aici au deja o comandă. E-mailul nu conține mențiuni de sănătate.
- **Ghidurile** le schimbi o dată la 1–2 luni cu articole noi, verificate după ghidul redacțional (meniul automatizării > Edit > Save > Exit). Acum poți lega ghidul de proteină, ghidul despre crema de orez și ghidul despre plicurile de creatină. Nu lega ghidul „Creatina Creapure: cum o folosești pentru performanță” și nici ghidul despre zinc.
- **Lista celor mai vândute** o actualizezi o dată pe trimestru, după vânzările din ultimele 90 de zile.

**Textul e-mailului:**

> Salut, [Prenume]!
>
> Sunt Marius Chera, fondatorul Prime Supplements. A trecut ceva vreme de la ultima ta comandă și voiam să te întreb simplu: cum merge antrenamentul? Cum ți s-au părut produsele?
>
> Iată, pe scurt, ce găsești acum la noi.
>
> **Ghiduri noi pe blog, în fiecare zi.** Scriem pe înțeles despre proteine, creatină, vitamine și alimentația pentru sală, iar toate ghidurile sunt gratuite. Două ghiduri recente:
>
> - **Câtă proteină pe zi: calcul pe greutate și obiectiv.** Îți calculezi necesarul în doi pași și vezi cât îți lipsește din mâncare. [Citește ghidul →](https://primesupplements.ro/blogs/news/cata-proteina-trebuie-zi-calcul-greutate-obiectiv)
> - **Cum alegi crema de orez: pregelatinizare și absorbție.** De ce contează procesarea și ce verifici pe etichetă. [Citește ghidul →](https://primesupplements.ro/blogs/news/cum-alegi-crema-de-orez)
>
> **Ce aleg cel mai des clienții noștri.** Patru dintre cele mai vândute produse din ultimele trei luni:
>
> - **Prime Whey 2 kg:** 82 g de proteine la 100 g de produs, 66 de porții, 7 arome.
> - **Pure Isolate 2 kg:** izolat din zer microfiltrat, cu Digezyme®, 74 de porții, 7 arome.
> - **Creatină Creapure®:** un singur ingredient, creatină monohidrat micronizată, în pachet de 300 g sau de 500 g.
> - **Creamy Rice:** cremă de orez care se prepară fără fierbere, în 6 arome și o variantă fără aromă.
>
> **[ Vezi cele mai vândute ]**
>
> **Vrei o recomandare pentru tine?** Răspunde la acest e-mail cu două lucruri: ce obiectiv ai acum (masă musculară, definire sau energie la antrenament) și ce suplimente ai folosit până acum. Îți recomandăm noi ce ți se potrivește. Ne poți scrie și pe WhatsApp, la 0775 286 584. Luni–vineri, 8:00–18:00, răspundem în medie într-o oră.
>
> Ai o afecțiune medicală, ești însărcinată sau iei medicamente? Discută cu medicul înainte să începi un supliment nou.
>
> Spor la antrenament, Marius Chera, fondator Prime Supplements
>
> [Subsolul comun]

### E-mail 2 · Refă-ți rezervele (în jurul zilei 104)

**Subiect, 3 variante:**

1. [Prenume], mai ai din suplimentele tale?
2. Îți ajunge ce ai acasă?
3. Peste 300 de lei, livrarea e gratuită

**Preheader:** Un calcul simplu, ca să nu rămâi fără. Cargus aduce coletul în 1–3 zile lucrătoare.

**Buton (CTA):** Vezi toate suplimentele → `https://primesupplements.ro/collections/suplimente-sala` (în plus, fiecare produs din [PRODUSE_COMANDĂ_ANTERIOARĂ] are linkul lui „Comandă din nou →”)

**Setări tehnice:**

- **Locul în flux:** după Wait 14 days, pasul Look up și condiția R1. E ultimul e-mail din recâștigare. Dacă e-mailul 1 a plecat mai târziu, se mută și acesta.
- **[Prenume] în subiect:** regula din secțiunea 5.
- **Secțiuni, în ordine:**
  - Custom Liquid cu salutul;
  - Text, de la „Acum două săptămâni” până la „cu câteva zile înainte”;
  - Custom Liquid cu [PRODUSE_COMANDĂ_ANTERIOARĂ] (codul de mai sus). Fraza de deasupra listei și fraza de rezervă sunt în cod;
  - Text „Ce aleg cel mai des clienții noștri:”;
  - Product (Produs), Static, cu [CELE_MAI_VÂNDUTE]: Prime Whey 2 kg, Pure Isolate 2 kg, Creatină Creapure® și Creamy Rice tort de ciocolată. Nu pui Cluster: titlul lui din magazin conține încă vechea denumire;
  - Button „Vezi toate suplimentele”;
  - Text, de la „Bine de știut” până la semnătură;
  - Text cu [Subsolul comun];
  - Footer.
- **Subiectele și preheaderul** se potrivesc și cu lista de produse, și cu fraza de rezervă.
- **Rândul cu codul e opțional și oprit implicit.** Îl ștergi dacă nu aprobi un cod. Dacă îl folosești:
  - creezi întâi codul în Discounts. Flow nu poate crea coduri, deci codul e comun, cu o singură utilizare per client și cu dată și oră de final reale, setate pe cod. Dacă vrei, tot în Discounts limitezi cine îl poate folosi;
  - în e-mail scrii exact data, ora și condițiile setate pe cod. În ziua în care expiră, ștergi rândul din e-mailul automatizării (Edit > Save > Exit) și nu reiei imediat același cod;
  - reducerea se calculează din cel mai mic preț din ultimele 30 de zile, afișat pe pagina produsului. Nu scrii în e-mail niciun „preț vechi”;
  - dacă vrei ca butonul să aplice codul singur, linkul devine `https://primesupplements.ro/discount/[COD]?redirect=/collections/suplimente-sala`. Linkul îl copiezi din Discounts > codul > Promote > Get a shareable discount code > Copy link (Promovează > Obține un cod de reducere care poate fi distribuit > Copiați linkul).

**Textul e-mailului:**

> Salut, [Prenume]!
>
> Acum două săptămâni ți-am scris ce e nou la noi. Azi am o întrebare practică: îți ajunge ce ai acasă?
>
> Fă un calcul rapid: împarte porțiile sau capsulele care ți-au mai rămas la câte iei pe zi. Rezultatul e numărul de zile până rămâi fără. Cargus livrează în 1–3 zile lucrătoare, așa că e bine să comanzi cu câteva zile înainte.
>
> [PRODUSE_COMANDĂ_ANTERIOARĂ: „Ca să nu mai cauți prin site, am pus aici produsele din ultima ta comandă:”, apoi lista, cu „Comandă din nou →” la fiecare produs. Dacă lista rămâne goală: „Ca să nu mai cauți prin site, mai jos găsești produsele pe care clienții noștri le aleg cel mai des.”]
>
> **Ce aleg cel mai des clienții noștri:**
>
> [CELE_MAI_VÂNDUTE]
>
> **[ Vezi toate suplimentele ]**
>
> **Bine de știut:**
>
> - **Livrare gratuită peste 300 de lei.** Sub această sumă, livrarea costă 20 de lei. Dacă iei mai multe produse odată, ajungi mai ușor la 300 de lei.
> - **Plătești cum vrei:** cu cardul, prin transfer bancar sau ramburs, la curier.
>
> Vrei să încerci altceva de data asta? Răspunde la acest e-mail cu obiectivul tău și îți spunem ce ți s-ar potrivi. Ne găsești și pe WhatsApp, la 0775 286 584.
>
> [Opțional, doar dacă proprietarul aprobă un cod:] Pentru că ai mai comandat de la noi, ai codul [COD]: [X]% reducere la [TOATĂ COMANDA sau CATEGORIA], o singură utilizare, valabil până pe [DATA_FINAL], ora 23:59. [Alte condiții pe scurt: comandă minimă, produse excluse, cumulare cu alte coduri.] După această dată, codul nu mai funcționează. Condițiile complete: [LINK_TERMENI].
>
> Acesta e ultimul e-mail din această serie. De acum îți scriem doar când avem ceva util: ghidul săptămânii de pe blog sau o ofertă reală.
>
> Marius
>
> [Subsolul comun]

### E-mail 3 · Mai vrei să primești e-mailurile noastre? (după 180 de zile fără click)

**Subiect, 3 variante:**

1. Mai vrei să primești e-mailurile noastre?
2. Rămânem în legătură?
3. O întrebare scurtă despre e-mailurile Prime

**Preheader:** Un click și rămâi pe listă. Dacă nu mai vrei, te dezabonezi la fel de simplu.

**Buton (CTA):** Da, vreau în continuare → `https://primesupplements.ro`

**Setări tehnice:**

- **Locul în flux:** în fluxul B, după condiția S0 și eticheta `curatare-intrebat`. Același text și aceleași secțiuni le folosești și în campania unică de la pasul 12.
- **Fără [Prenume] în subiect:** aici intră și abonați din pop-up, care de obicei nu au prenume. În corpul e-mailului, salutul din Custom Liquid scrie „Salut!” când prenumele lipsește.
- **Ce urmează:** după 14 zile, abonatul care n-a dat click și n-a comandat primește eticheta `email-inactiv` și iese din campanii. Cine a primit e-mailul prin campania unică iese din campanii fără etichetă, din ziua D0+194, pentru că nu e în „Email · implicați”. Orice click pe un link, din acest e-mail sau din alt e-mail de la noi, înseamnă „da”. Butonul duce pe site, iar click-ul pe el e suficient.
- **Dezabonarea:** linkul e în subsolul pus automat de Shopify, de aceea textul trimite la „linkul de dezabonare de la finalul acestui e-mail”.
- **Secțiuni, în ordine:**
  - Custom Liquid cu salutul;
  - Text, de la „De câteva luni” până la „așa știm că vrei să rămâi”;
  - Button „Da, vreau în continuare”;
  - Text, de la „Dacă rămâi” până la semnătură;
  - Text cu [Subsolul comun];
  - Footer.
- **Fără reducere și fără ofertă:** e-mailul doar întreabă.

**Textul e-mailului:**

> Salut, [Prenume]!
>
> De câteva luni n-ai mai apăsat pe niciun link din e-mailurile noastre. E în regulă: poate primești prea multe e-mailuri sau poate acum nu te interesează suplimentele.
>
> Nu vrem să-ți aglomerăm inboxul, așa că te întreb direct: mai vrei să primești e-mailurile noastre?
>
> **Dacă da**, apasă butonul de mai jos. Un singur click e suficient: butonul te duce pe site și așa știm că vrei să rămâi.
>
> **[ Da, vreau în continuare ]**
>
> Dacă rămâi, primești o dată pe săptămână cel mai util ghid de pe blog, cu sfaturi practice despre nutriție și suplimente. Despre oferte îți scriem doar când avem una reală.
>
> **Dacă nu**, e la fel de simplu: apasă linkul de dezabonare de la finalul acestui e-mail. Te scoatem imediat de pe listă, fără alte întrebări.
>
> **Dacă nu apeși nimic** în următoarele 14 zile, nu-ți mai trimitem nici newsletterul, nici ofertele. Te-ai răzgândit mai târziu? Scrie-ne la contact@primesupplements.ro sau pe WhatsApp, la 0775 286 584, și te punem înapoi pe listă.
>
> Oricum alegi, e-mailurile despre comenzi, cum sunt confirmarea și livrarea, le primești în continuare.
>
> Mulțumim că ne-ai citit până acum.
>
> Marius Chera, fondator Prime Supplements
>
> [Subsolul comun]

## 8. Newsletter săptămânal de blog

O dată pe săptămână, duminică la 18:00, abonații primesc cel mai util ghid publicat pe blog în ultimele 7 zile, plus două articole scurte și un singur produs legat de temă. Cam 80% din e-mail e educație și 20% produs. Rutina de blog publică două articole pe zi, deci ai 14 articole din care alegi.

| Ce | Când | Cui |
| --- | --- | --- |
| Newsletterul | Duminică, la 18:00. Îl programezi tu, în fiecare săptămână, dintr-un șablon salvat | Audiența din tabelul „Cui îl trimiți” |
| Mementoul pentru tine (opțional) | Vineri dimineața, automat, din Flow | Doar tu: titlurile și linkurile articolelor din ultimele 7 zile |

**Ce răspunde auditului:**

- **Șablonul campaniilor.** Agenția a găsit un șablon ineficient tehnic și nealiniat cu brandul. Newsletterul folosește același branding ca automatizările, setat o singură dată în Apps > Messaging > Templates > Manage branding: logo pe fundal transparent, butoane #e91d23 cu text alb, text #1a1a1a, fundal #f0f0f0 cu corpul e-mailului alb, subsol #1a1a1a cu text alb, font Arial/Helvetica și butoane rotunjite. Textul rămâne text, nu imagine, ca să se citească și în modul întunecat (dark mode). Shopify nu spune cum arată e-mailurile în modul întunecat, așa că verifici la fiecare e-mail de test (de testat). Fiecare imagine are alt text. Un singur buton principal, roșu, duce la ghid.
- **Segmentarea.** Audiența se schimbă după activitate: întâi cei mai activi, apoi toți abonații, apoi doar abonații implicați. Mai târziu adaugi ediții pentru cumpărătorii unei categorii (la finalul secțiunii).
- **Testele A/B.** Shopify nu are test A/B. Alternezi formulele de subiect de la o săptămână la alta și compari rata de click din raport.

**Ce s-a schimbat față de varianta veche:**

- **Shopify nu are campanii recurente.** Salvezi o dată șablonul „Newsletter săptămânal”, iar în fiecare săptămână creezi din el o campanie nouă și o programezi pentru duminică, 18:00.
- **Shopify nu are secțiune de blog.** Articolul îl pui de mână: imaginea, titlul și rezumatul într-o secțiune Image with text (Imagine cu text), plus un Button (Buton) cu linkul.
- **Fără test A/B** (vezi mai sus).
- **Salut fără prenume.** Mulți abonați din pop-up nu au prenume în Shopify, așa că newsletterul începe cu „Salut!”, iar subiectele nu au [Prenume].
- **Parametrii UTM se pun singuri.** Shopify adaugă singur la linkuri utm_source=shopify_email și utm_medium=email. Tu schimbi doar utm_campaign, în fiecare campanie.
- **Abonații noi nu sunt excluși automat.** Shopify nu poate exclude singur abonații care primesc în aceeași zi un e-mail din seria de bun venit sau din alt flux. Dacă vrei, folosești varianta de segment de mai jos.
- **Newsletterul 1 nu mai trimite la ghidul despre zinc.** În e-mailuri legăm doar ghidurile verificate: proteina, crema de orez și plicurile de creatină.
- **Newsletterul 2 are alt subiect 2.** Varianta „Somnolent după masa de dinainte de sală?” sugera un efect asupra organismului, așa că am scos-o.
- **Newsletterul 3 are alt articol principal.** Ghidul vechi despre Creatina Creapure a fost corectat, dar în e-mailuri legăm în continuare ghidul despre plicurile de creatină.
- **Curățarea listei** (întrebarea „Mai vrei să primești e-mailurile noastre?” după 180 de zile fără click) e acum în secțiunea 7.

**Cui îl trimiți** (câmpul To, Către):

| Perioada | Audiența | De ce |
| --- | --- | --- |
| Săptămânile 1–3 de la D0 (încălzirea) | „Email · încălzire (cei mai activi)”: 1.054 de persoane | Shopify n-a mai livrat e-mailuri de marketing de 180 de zile, iar reputația de expeditor nu se mută de pe altă platformă. O refaci începând cu cei care au deschis un e-mail Shopify în ultimul an sau au comandat în ultimele 6 luni. Treci mai departe doar dacă rata de respingere (bounce) e sub 2% și plângerile de spam sub 0,1%. |
| Din săptămâna 4 până în ziua D0+194 | „Email subscribers” (3.079), fără „Email · inactivi (exclus din campanii)” | Toți abonații cu acord, dacă la încălzire pragurile au fost respectate. Altfel mai rămâi o săptămână la segmentul de încălzire. Până în ziua D0+194 nimeni nu are încă eticheta „email-inactiv”, deci practic pleacă la toți. |
| Din ziua D0+194 | „Email · implicați (de folosit după 180 de zile)”, cu regula completată la secțiunea 7, pasul 8 | Îi lasă afară singur pe cei care primesc e-mailurile noastre de cel puțin 180 de zile, dar n-au dat click și n-au comandat în acest timp, inclusiv pe cei cu eticheta „email-inactiv” (secțiunea 7). Abonații noi și cei cu eticheta `revenire-lista` rămân în segment. |

**D0** e ziua primului newsletter. Aceeași audiență o folosești și la campaniile cu oferte (secțiunea 9).

- **Opțional, un pas intermediar în săptămâna 4.** Shopify recomandă să crești volumul cu cel mult 20–30% pe săptămână, așa că în săptămâna 4 poți trimite întâi la segmentul de încălzire plus abonații din ultimele 90 de zile, iar la toți abonații treci din săptămâna 5. Pentru asta creezi segmentul „Email · încălzire + abonați din ultimele 90 de zile”, cu regula `email_subscription_status = 'SUBSCRIBED' AND (shopify_email.opened MATCHES (date >= -365d) OR products_purchased MATCHES (date >= -180d) OR customer_added_date >= -90d)`, adică regula segmentului de încălzire plus clienții creați în magazin în ultimele 90 de zile (de testat în editor). Verificată prin API pe 15 octombrie 2026, în forma cu `(since: …)`, are 1.274 de persoane, cu aproximativ 20% mai mult decât segmentul de încălzire. Dacă faci acest pas, pornești și recâștigarea (secțiunea 7) cu o săptămână mai târziu.
- **Dacă în câmpul To nu poți exclude un segment.** Shopify documentează în To doar trei variante: toți abonații, un segment sau Create segment (Creare segment). Dacă nu vezi o opțiune de excludere, creezi în Customers > Segments (Clienți > Segmente) segmentul „Email · abonați fără inactivi”, cu regula `email_subscription_status = 'SUBSCRIBED' AND customer_tags NOT CONTAINS 'email-inactiv'` (de testat în editor; pe 14 octombrie 2026 regula dă 3.079 de persoane). Îl folosești la orice campanie pe care vrei s-o trimiți tuturor abonaților.
- **Opțional, fără abonații din ultimele 3 zile**, care sunt la începutul seriei de bun venit: adaugi la regula segmentului de mai sus `AND customer_added_date < -3d` (de testat). Shopify numără de la data la care clientul a fost creat în magazin, nu de la abonare, așa că regula îi prinde pe abonații noi, dar nu și pe clienții vechi care abia s-au abonat.
- **Smart delivery (Expediere inteligentă)** e pornit implicit, în Apps > Messaging > Settings > Delivery (Setări > Expediere). La liste de peste 1.000 de abonați, trimite campania doar abonaților implicați. Și segmentul de încălzire are peste 1.000 de persoane, deci se aplică de la prima trimitere. Lași setarea pornită.
- **O campanie programată la un segment fără niciun abonat** revine la ciornă.
- **Costul:** 3.079 de abonați × 4–5 duminici înseamnă aproximativ 12.300–15.400 de e-mailuri pe lună. Împreună cu automatizările, treci de cele 10.000 de e-mailuri gratuite; peste ele plătești 1 USD la fiecare 1.000. Setezi o alertă în Apps > Messaging > Settings > Monthly spending alert > Add threshold (Alertă de cheltuieli lunare > Adaugă un prag). Alerta doar te anunță, nu oprește trimiterea.

**Reguli de conținut:** un singur produs pe e-mail și fără prețuri reduse dacă nu există o ofertă reală. Mențiunile de sănătate sunt doar cele autorizate, la fel ca pe blog. Alegi doar articole verificate după ghidul redacțional. Nu lega ghidul „Creatina Creapure: cum o folosești pentru performanță” și nici ghidul despre zinc.

**Cum îl construiești în Shopify:**

*O singură dată*

1. **Brandingul.** Dacă nu l-ai setat deja, în Apps > Messaging > Templates > Manage branding pui logo-ul, culorile și fontul de mai sus. Lucrezi pe calculator.
2. **Șablonul.** Cel mai simplu: în Apps > Messaging > Templates, din meniul ⋯ al șablonului „Prime · bază” (secțiunea 10, pasul 1) alegi Duplicate și îi dai copiei numele „Newsletter săptămânal”. Așa are deja subsolul comun. Sau îl faci de la zero: Templates > Create template (Șabloane > Creare șablon) > alegi o bază > numele „Newsletter săptămânal”. Pui secțiunile de mai jos, în ordine. Șablonul se salvează singur; la final apeși Done (Gata).
   - Header (Antet), cu logo-ul;
   - Text: „Salut!” și introducerea;
   - Image with text (Imagine cu text): imaginea articolului, titlul „Ghidul săptămânii: …” și rezumatul. Alt text: titlul articolului. Shopify documentează câmpul de alt text la Image and GIF (Imagine și GIF); dacă nu-l găsești în Image with text, folosești Image and GIF, plus o secțiune Text cu titlul și rezumatul (de testat);
   - Text: „Ce afli din el” și cele trei idei;
   - Button (Buton): „Citește ghidul complet”, cu linkul articolului;
   - Text: „Tot pe blog”, cu două linkuri;
   - Text: „Sfatul de antrenor”;
   - Text: „Din articol, în coșul tău”: nota, numărul de recenzii, o frază din pagina produsului și linkul;
   - Product (Produs), Static, cu un singur produs: cel din articol. Nu folosi Dynamic best sellers pe tot magazinul: poate afișa Cluster, al cărui titlu din magazin conține încă vechea denumire. Varianta automată, Dynamic best sellers dintr-o colecție, arată mai multe produse, deci încalcă regula „un singur produs”. Dacă o alegi totuși, iei doar o colecție fără Cluster: Pudre Proteice, Creatină sau Cremă de orez (verificat pe 15 octombrie 2026). Colecția Intra-workout conține Cluster;
   - Text: „Întrebarea săptămânii” și semnătura;
   - Text cu [Subsolul comun];
   - Footer (Subsol).
3. **Segmentul de rezervă** „Email · abonați fără inactivi”, doar dacă în To nu poți exclude un segment (vezi mai sus).
4. **Mementoul de vineri (opțional)**, în Flow. Apps > Flow > Create workflow (Creare flux de lucru), cu numele „Newsletter · memento vineri”:
   - **Declanșatorul:** Scheduled time (Oră programată), cu repetare Weeks, ziua Friday, ora 10:00. Implicit folosește fusul orar al magazinului;
   - **Get article data:** în câmpul de interogare ceri articolele publicate în ultimele 7 zile, de exemplu `published_at:>='{{ scheduledAt | date_minus: "7 days" }}' AND published_at:<='{{ scheduledAt }}'` (de testat). A doua parte contează: rutina de blog programează articole pentru zilele următoare, iar fără ea ar apărea și cele încă nepublicate. Acțiunea întoarce cel mult 100 de articole, mai mult decât suficient;
   - **Send internal email:** către adresa ta, cu subiectul „Newsletter: articolele săptămânii” și textul de mai jos. Numele variabilei cu articolele îl alegi din lista de variabile a editorului (de testat);
   - Turn on workflow (Activare flux de lucru).

   Send internal email trimite doar către echipă, nu către clienți. Flow nu poate trimite el newsletterul.

```liquid
Articolele publicate în ultimele 7 zile:
{% for article in getArticleData %}
- {{ article.title }}: https://primesupplements.ro/blogs/news/{{ article.handle }}
{% endfor %}
Alege ghidul principal, verifică-l după ghidul redacțional și programează newsletterul pentru duminică, la 18:00.
```

*În fiecare săptămână*

5. **Vineri sau sâmbătă alegi articolul principal** și două articole scurte, din memento sau de pe blog.
6. **Creezi campania.** Apps > Messaging > Create campaign > Custom templates > „Newsletter săptămânal” (Aplicații > Messaging > Creare campanie > Șabloane personalizate).
7. **To (Către):** audiența din tabelul „Cui îl trimiți”.
8. **Subject și Preview text:** una dintre cele trei variante de subiect și preheaderul.
9. **Schimbi conținutul:** imaginea, titlul, rezumatul și cele trei idei, linkul din Button, cele două linkuri din „Tot pe blog”, sfatul de antrenor, rândul „Din articol, în coșul tău” și produsul din secțiunea Product.
10. **UTM:** din meniul ⋯ > Edit UTM parameters (Editați parametrii UTM) pui `utm_campaign=newsletter-AAAA-LL-ZZ`, cu data duminicii, de exemplu `newsletter-2026-11-01`. Fiecare valoare are cel mult 100 de caractere.
11. **Send test (Trimitere test)** la cel mult 5 adrese. Verifici pe telefon subiectul, preheaderul, imaginea, linkurile, modul întunecat, subsolul și linkul de dezabonare.
12. **Programezi:** Review > Schedule send > Custom date and time (Examinare > Programare trimitere > Dată și oră personalizate) > duminică, 18:00 > Schedule (Programare). Magazinul e pe ora României (Europe/Bucharest), dar Shopify nu spune în ce fus orar lucrează fereastra de programare: la prima programare verifici fusul afișat (de testat). Ca să schimbi ora: Edit send date sau Remove send date (Editare dată de trimitere / Eliminare dată de trimitere). Ca să oprești o trimitere începută: Cancel delivery (Anulare livrare); e-mailurile deja livrate nu se mai pot retrage.
13. **Luni te uiți în raport:** Open, Click, Delivery, Bounce, Unsubscribe și Spam rate, plus Sessions; Orders, cu Total orders, Total sales și AOV (comenzi atribuite ultimului click care nu e direct); Link activity. Notezi ce formulă de subiect ai folosit și o schimbi săptămâna următoare.

```text
În fiecare săptămână, de mână (Shopify Messaging):
Vineri/sâmbătă: alegi ghidul săptămânii (din memento sau de pe blog)
→ Create campaign → Custom templates → „Newsletter săptămânal”
→ To: audiența din tabel
→ Subject + Preview text
→ schimbi articolul, linkurile, sfatul și produsul
→ ⋯ → Edit UTM parameters: utm_campaign=newsletter-AAAA-LL-ZZ
→ Send test → Review → Schedule send: duminică, 18:00
Luni: raportul campaniei (rata de click, comenzile, linkurile)

Mementoul automat (Shopify Flow, opțional):
Trigger: Scheduled time   (Weeks, Friday, 10:00)
→ Get article data         (articolele publicate în ultimele 7 zile; de testat)
→ Send internal email      (către tine: titlurile și linkurile articolelor)
```

### Șablonul reutilizabil

**Subiect, 3 variante (alegi una dintre formule):**

1. Întrebarea la care răspunde articolul. Exemplu: „Câtă proteină îți trebuie, de fapt?”
2. Cifra-cheie din articol și ce obții din ea. Exemplu: „1,6–2,2 g/kg: calculul simplu pentru proteină”
3. Mitul pe care îl lămurește articolul. Exemplu: „Nu ai nevoie de proteină «cât mai multă»”

**Preheader:** răspunsul pe scurt, apoi „Plus: [titlul articolului 2].”

**Buton (CTA):** Citește ghidul complet → linkul articolului principal

**Setări tehnice:** secțiunile din pasul 2, în aceeași ordine. Audiența, ora și UTM ca la pașii 7–12. Fără [Prenume], fără reduceri inventate și un singur produs.

**Textul e-mailului:**

> Salut!
>
> [2–3 fraze de la Marius: o întrebare reală primită de la clienți pe e-mail sau pe WhatsApp ori o observație din sală, legată de tema săptămânii. Nu inventa povești.]
>
> **Ghidul săptămânii: [TITLUL ARTICOLULUI 1]**
>
> [Imaginea articolului]
>
> [Rezumat în două fraze: ce problemă rezolvă și pentru cine e.]
>
> Ce afli din el:
>
> - [Ideea 1, din caseta „Pe scurt” a articolului]
> - [Ideea 2]
> - [Ideea 3]
>
> **[ Citește ghidul complet ]**
>
> **Tot pe blog:**
>
> - **[Titlul articolului 2]:** [o frază despre ce afli]. [Citește →]
> - **[Titlul articolului 3]:** [o frază despre ce afli]. [Citește →]
>
> **Sfatul de antrenor:** [un sfat practic într-o frază sau două, luat din articolul principal, fără promisiuni de rezultate]
>
> **Din articol, în coșul tău:** [PRODUSUL DIN ARTICOL] · nota [X] din 5, din [Y] recenzii. [O frază factuală din pagina produsului: gramaj, porții, arome.] [Vezi produsul →]
>
> [Produsul, în secțiunea Product]
>
> **Întrebarea săptămânii:** despre ce vrei să scriem data viitoare? Răspunde la acest e-mail. Citim tot.
>
> Spor la antrenament, Marius
>
> [Subsolul comun]

### Newsletterul 1 · Câtă proteină pe zi (prima duminică, D0)

**Subiect, 3 variante:**

1. Câtă proteină îți trebuie, de fapt?
2. 1,6–2,2 g/kg: calculul simplu pentru proteină
3. Nu ai nevoie de proteină „cât mai multă”

**Preheader:** Calculul în doi pași, cu exemplu la 80 kg. Plus: cum alegi crema de orez.

**Buton (CTA):** Citește ghidul complet → `https://primesupplements.ro/blogs/news/cata-proteina-trebuie-zi-calcul-greutate-obiectiv`

**Setări tehnice:**

- **Cui și când:** duminică, la 18:00, la „Email · încălzire (cei mai activi)” (săptămâna 1).
- **UTM:** `utm_campaign=newsletter-AAAA-LL-ZZ`, cu data duminicii.
- **Imaginea articolului:** `https://cdn.shopify.com/s/files/1/0917/5138/3415/articles/blog-cata-proteina-pe-zi-calcul.jpg?v=1791916897`. O salvezi și o încarci în secțiune. Alt text: „Câtă proteină pe zi: calcul pe greutate și obiectiv”.
- **Produs (Static):** „Prime Whey – proteină din zer, 2 kg”.
- **Mențiunea de sănătate:** cea despre proteine e autorizată. Textul standard despre suplimente e în [Subsolul comun].

**Textul e-mailului:**

> Salut!
>
> E una dintre primele întrebări ale oricui începe sala: câtă proteină trebuie să mănânc pe zi? Răspunsul e mai simplu decât pare. Depinde de greutatea ta și de obiectiv.
>
> **Ghidul săptămânii: Câtă proteină pe zi: calcul pe greutate și obiectiv**
>
> [Imaginea articolului]
>
> Ghidul îți arată cum îți calculezi singur necesarul, în doi pași, și cum îl împarți pe mese. E util atât dacă vrei masă musculară, cât și dacă vrei să slăbești fără să pierzi din mușchi.
>
> Ce afli din el:
>
> - Un adult sănătos și sedentar are nevoie de aproximativ 0,8 g de proteine pe kilogram corp pe zi.
> - Dacă te antrenezi cu greutăți, ținta uzuală este 1,6–2,2 g/kg pe zi. La 80 kg, asta înseamnă între 128 și 176 g.
> - Împarte totalul pe 3–5 mese. Pudra proteică acoperă doar diferența care îți lipsește din mâncare.
>
> **[ Citește ghidul complet ]**
>
> **Tot pe blog:**
>
> - **Cum alegi crema de orez: pregelatinizare și absorbție:** de ce contează procesarea și ce verifici pe etichetă. [Citește →](https://primesupplements.ro/blogs/news/cum-alegi-crema-de-orez)
> - **Plicuri de creatină Ready To Go: cum le folosești corect:** cum iei creatina zilnic, fără să măsori pudra. [Citește →](https://primesupplements.ro/blogs/news/plicuri-creatina-ready-to-go)
>
> **Sfatul de antrenor:** valorile din ghid sunt intervale, nu reguli rigide. Începe de la mijlocul intervalului și ajustează după progres, apetit și cum te simți.
>
> **Din articol, în coșul tău:** Prime Whey 2 kg · nota 4,75 din 5, din 44 de recenzii. 82 g de proteine la 100 g de produs, 66 de porții de aproximativ 30 g, 7 arome. Proteinele contribuie la creșterea și la menținerea masei musculare. [Vezi produsul →](https://primesupplements.ro/products/prime-whey-2000g)
>
> [Produsul: Prime Whey 2 kg]
>
> **Întrebarea săptămânii:** despre ce vrei să scriem data viitoare? Răspunde la acest e-mail. Citim tot.
>
> Spor la antrenament, Marius
>
> [Subsolul comun]

### Newsletterul 2 · Ce mănânci înainte de antrenament (a doua duminică)

**Subiect, 3 variante:**

1. Ce mănânci înainte de antrenament?
2. Masa de dinainte de sală, fără fierbere
3. Crema de orez: ce verifici pe etichetă

**Preheader:** De ce contează procesarea carbohidraților și cum alegi o cremă de orez bună. Plus: câtă proteină îți trebuie pe zi.

**Buton (CTA):** Citește ghidul complet → `https://primesupplements.ro/blogs/news/cum-alegi-crema-de-orez`

**Setări tehnice:**

- **Cui și când:** duminică, la 18:00, la „Email · încălzire (cei mai activi)” (săptămâna 2).
- **UTM:** `utm_campaign=newsletter-AAAA-LL-ZZ`, cu data duminicii.
- **Imaginea articolului:** `https://cdn.shopify.com/s/files/1/0917/5138/3415/articles/blog-omega-3-crema-de-orez-blueberry-muffin-1791673262470.png?v=1791759005`. Alt text: „Cum alegi crema de orez: pregelatinizare și absorbție”.
- **Produs (Static):** „Cremă de orez Prime Creamy Rice – tort de ciocolată, 1 kg”.
- **Fără mențiuni de sănătate.** Mențiunea autorizată despre glucide și refacere are condiții stricte de folosire, așa că nu o folosim aici.

**Textul e-mailului:**

> Salut!
>
> Masa de dinainte de sală trebuie să fie ușor de pregătit, mai ales când ai puțin timp până la antrenament. Săptămâna asta îți arătăm cum alegi o sursă de carbohidrați care se prepară repede: crema de orez.
>
> **Ghidul săptămânii: Cum alegi crema de orez: pregelatinizare și absorbție**
>
> [Imaginea articolului]
>
> Ghidul îți explică ce înseamnă pregelatinizarea, de ce contează procesarea și ce verifici pe etichetă înainte să cumperi. E util dacă vrei o masă pre-workout pe care o pregătești în câteva minute, fără fierbere.
>
> Ce afli din el:
>
> - Pregelatinizarea înseamnă că amidonul din orez e deja gătit și uscat, așa că pudra se amestecă direct cu lichidul, fără fierbere.
> - Alegi o cremă de orez instant, care se prepară cald sau rece, cu carbohidrații și zaharurile clar declarate pe etichetă.
> - Pentru masa de dinainte de antrenament, respecți porția și modul de preparare de pe etichetă.
>
> **[ Citește ghidul complet ]**
>
> **Tot pe blog:**
>
> - **Câtă proteină pe zi: calcul pe greutate și obiectiv:** îți calculezi necesarul în doi pași, cu exemplu la 80 kg. [Citește →](https://primesupplements.ro/blogs/news/cata-proteina-trebuie-zi-calcul-greutate-obiectiv)
> - **Plicuri de creatină Ready To Go: cum le folosești corect:** cum iei creatina zilnic, fără să măsori pudra. [Citește →](https://primesupplements.ro/blogs/news/plicuri-creatina-ready-to-go)
>
> **Sfatul de antrenor:** pe etichetă, verifică cantitatea de carbohidrați, zaharurile și aroma. Alege o aromă care îți place, ca să o poți folosi constant înainte de antrenament.
>
> **Din articol, în coșul tău:** Creamy Rice, tort de ciocolată · nota 5,0 din 5, din 33 de recenzii. Cremă de orez pregelatinizată, care se prepară fără fierbere: 78,1 g de carbohidrați la 100 g și 22 de porții la 1 kg. O găsești în 6 arome și într-o variantă fără aromă. [Vezi aromele →](https://primesupplements.ro/collections/crema-de-orez)
>
> [Produsul: Creamy Rice, tort de ciocolată]
>
> **Întrebarea săptămânii:** despre ce vrei să scriem data viitoare? Răspunde la acest e-mail. Citim tot.
>
> Spor la antrenament, Marius
>
> [Subsolul comun]

### Newsletterul 3 · Creatina pe înțeles (a treia duminică)

**Subiect, 3 variante:**

1. Creatina pe înțeles: un plic, o porție
2. Creatina: cât, când și cu ce o iei
3. Creatina e mai simplă decât crezi

**Preheader:** Cum o iei zilnic, inclusiv în zilele fără sală, fără să măsori pudra. Plus: câtă proteină îți trebuie pe zi.

**Buton (CTA):** Citește ghidul complet → `https://primesupplements.ro/blogs/news/plicuri-creatina-ready-to-go`

**Setări tehnice:**

- **Cui și când:** duminică, la 18:00, la „Email · încălzire (cei mai activi)” (săptămâna 3).
- **UTM:** `utm_campaign=newsletter-AAAA-LL-ZZ`, cu data duminicii.
- **Articolul principal** e ghidul despre plicurile de creatină. Ghidul „Creatina Creapure: cum o folosești pentru performanță” a fost corectat, dar nu îl legăm în e-mailuri.
- **Imaginea articolului:** `https://cdn.shopify.com/s/files/1/0917/5138/3415/articles/blog-creatine-ready-to-go-plicuri-prime-supplements-how-to-store-supplements-prope-1789364535625.jpg?v=1789415407`. Alt text: „Plicuri de creatină Ready To Go: cum le folosești corect”.
- **Produs (Static):** „Creatină monohidrat micronizată Creapure®”. Pentru plicurile Ready To Go nu avem încă date verificate (gramaj, porții, recenzii), așa că rândul de produs e despre Creapure®.
- **Mențiunea de sănătate** pentru creatină e cea autorizată, cu doza de 3 g pe zi și cu precizarea despre adulții care fac exerciții fizice de mare intensitate. Fraza despre medic rămâne în e-mail.

**Textul e-mailului:**

> Salut!
>
> Despre creatină se vorbește mult, dar regula de bază e simplă: contează să o iei zilnic, constant, nu doar în zilele de sală. Săptămâna asta îți arătăm cum faci asta cât mai ușor.
>
> **Ghidul săptămânii: Plicuri de creatină Ready To Go: cum le folosești corect**
>
> [Imaginea articolului]
>
> Ghidul îți arată cum folosești plicurile de creatină gata dozate, când le poți lua și cum le potrivești cu restul suplimentelor. E util dacă vrei o rutină simplă, fără cântărit și fără amestecat pudră.
>
> Ce afli din el:
>
> - Un plic înseamnă o porție: creatina e deja dozată, așa că o iei oriunde, fără să măsori pudra.
> - Contează consecvența: creatina se ia zilnic, inclusiv în zilele fără antrenament.
> - Mulți o iau după antrenament, cu o masă sau cu un shake proteic. Mai important decât momentul e să o iei în fiecare zi.
>
> **[ Citește ghidul complet ]**
>
> **Tot pe blog:**
>
> - **Câtă proteină pe zi: calcul pe greutate și obiectiv:** îți calculezi necesarul în doi pași, cu exemplu la 80 kg. [Citește →](https://primesupplements.ro/blogs/news/cata-proteina-trebuie-zi-calcul-greutate-obiectiv)
> - **Cum alegi crema de orez: pregelatinizare și absorbție:** de ce contează procesarea și ce verifici pe etichetă. [Citește →](https://primesupplements.ro/blogs/news/cum-alegi-crema-de-orez)
>
> **Sfatul de antrenor:** ia creatina în doza de pe etichetă, fără s-o depășești, și leag-o de un obicei pe care îl ai deja, de exemplu shake-ul de după antrenament. Așa n-o uiți.
>
> **Dacă preferi pudra, în coșul tău:** Creatină Creapure® · nota 5,0 din 5, din 17 recenzii. Un singur ingredient, creatină monohidrat micronizată Creapure®, la 300 g (60 de porții) sau la 500 g (100 de porții). Creatina crește performanța fizică în eforturi succesive din timpul exercițiilor fizice de scurtă durată și de mare intensitate. Efectul benefic se obține la un consum zilnic de 3 g de creatină. Mențiunea se referă la adulții care fac exerciții fizice de mare intensitate. [Vezi produsul →](https://primesupplements.ro/products/creatina-creapure)
>
> [Produsul: Creatină Creapure®]
>
> Ai o afecțiune medicală, ești însărcinată sau iei medicamente? Discută cu medicul înainte să începi un supliment nou.
>
> **Întrebarea săptămânii:** despre ce vrei să scriem data viitoare? Răspunde la acest e-mail. Citim tot.
>
> Spor la antrenament, Marius
>
> [Subsolul comun]

### Ediții pe categorii, mai târziu

Auditul cere conținut după categoria de produs cumpărată. Segmentele există deja în Customers > Segments (numărate la crearea lor): „Email · cumpărători proteine” (912), „Email · cumpărători creatină” (332) și „Email · cumpărători cremă de orez” (136).

- **Când începi:** după primele 2–3 luni de newslettere, când ai rate de click cu care să compari.
- **Cum:** cel mult o dată pe lună, când ghidul săptămânii e despre o categorie, faci din același șablon două campanii pentru aceeași duminică:
  - **ediția pentru cumpărători**, la segmentul categoriei, de exemplu „Email · cumpărători creatină”, cu introducerea și sfatul de antrenor scrise pentru cine folosește deja produsul (cum îl iei zilnic, cu ce îl combini) și fără reducere;
  - **ediția generală**, la restul audienței.
- **Ca nimeni să nu le primească pe amândouă,** ediția generală pleacă la un segment fără cumpărătorii categoriei. Exemplu pentru creatină, verificat pe 14 octombrie 2026 (2.747 de persoane): `email_subscription_status = 'SUBSCRIBED' AND customer_tags NOT CONTAINS 'email-inactiv' AND products_purchased NOT MATCHES (id IN (14971467268471, 15404872368503, 15410672075127, 15182186381687, 15181804831095))`. ID-urile sunt cele din segmentul „Email · cumpărători creatină”.
- **După ziua D0+194**, ambele ediții merg doar la abonații implicați: adaugi la ambele segmente condiția din „Email · implicați (de folosit după 180 de zile)” (de testat).
- **Măsori** rata de click a ediției pentru cumpărători față de ediția generală. Dacă nu e mai bună, revii la o singură ediție.

## 9. Oferte noi și pop-up-ul legat de e-mail

Când pornești o promoție, abonații o află din campania A1, iar cu o zi înainte de final primesc memento-ul A2. Pe site, oferta apare și într-un pop-up de campanie, iar cine se abonează de acolo primește automat e-mailul B1, cu codul și condițiile.

| E-mail | Tip | Când pleacă | Cui |
| --- | --- | --- | --- |
| A1 · Anunțul ofertei | Campanie programată | La începutul ofertei, la ora de start a codului | Aceeași audiență ca newsletterul, după tabelul „Cui îl trimiți” din secțiunea 8: întâi „Email · încălzire (cei mai activi)”, apoi toți abonații fără „Email · inactivi (exclus din campanii)”, iar din ziua D0+194 „Email · implicați (de folosit după 180 de zile)” |
| A2 · Memento înainte de final | Campanie programată | Cu o zi înainte de final, la 19:00 | Același public ca A1 (vezi pasul 4) |
| B1 · Detaliile ofertei din pop-up | Automat (Shopify Flow) | La scurt timp după abonarea din pop-up-ul de campanie (cât durează exact, de testat) | Cine se abonează din pop-up-ul ofertei |

**Cum completezi textele:** parantezele drepte, de exemplu [COD], [DATA_FINAL] sau [COLECȚIE], le completezi tu de mână la fiecare ofertă. Nu sunt variabile Shopify. „<slug>” e numele scurt al ofertei, cu litere mici, cifre și cratime, de exemplu `black-friday-2026`. Etichetele Shopify acceptă doar litere, cifre și cratime.

**Cum îl construiești în Shopify:**

1. **Codul, primul.** În Discounts creezi codul ofertei, cu data și ora de început și cu data și ora de final reale. Tot aici setezi limita de utilizare și cu ce reduceri se cumulează. Exact aceleași valori le scrii apoi în lista de condiții din e-mailuri. Codul se oprește singur la data de final.
   - **Linkul care aplică singur codul:** Discounts > codul > Promote > Get a shareable discount code > Copy link (Promovează > Obține un cod de reducere care poate fi distribuit > Copiați linkul). La final adaugi pagina pe care vrei să ajungă clientul: `https://primesupplements.ro/discount/[COD]?redirect=/collections/[COLECȚIE]`.
   - **Un singur cod pentru toți:** Shopify Flow nu poate crea coduri, iar coduri personale, diferite pentru fiecare abonat, nu se pot face direct în Shopify. De aceea folosești un cod comun, cu dată de final reală.
   - **Prețul de referință:** înainte de trimitere, verifici pe fiecare pagină de produs că prețul de bază este cel mai mic din ultimele 30 de zile. Pentru fiecare produs numit în e-mail scrii și acel preț.
2. **Șablonul „Ofertă <slug>”.** Apps > Messaging > Templates > Create template (Aplicații > Messaging > Șabloane > Creare șablon). Alegi un șablon de bază, îi dai numele „Ofertă <slug>” și pui secțiunile, în ordine:
   - Header;
   - Text, cu începutul e-mailului A1;
   - Countdown, setat la data și ora de final ale codului. Afișează o numărătoare inversă reală, deci o folosești doar cu data setată pe cod;
   - Product, în modul Static, cu produsele din ofertă (cel mult 9). Nu pui niciodată Cluster aici: titlul lui din magazin conține încă denumirea veche. Dacă oferta include Cluster, îl numești doar în text, „Cluster”;
   - Text, cu prețurile scrise de mână: prețul cu reducere și cel mai mic preț din ultimele 30 de zile, pentru fiecare produs;
   - Discount, cu codul ofertei;
   - Button, cu linkul de la pasul 1;
   - Text, cu „Condițiile ofertei”;
   - Text cu [Subsolul comun];
   - Footer.

   Logo-ul, culorile și fontul vin din Manage branding, ca la toate celelalte e-mailuri, așa că oferta arată la fel ca seria de bun venit și newsletterul. Șablonul se salvează singur. La final apeși Done (Gata).
3. **Campania A1, programată la start.** Apps > Messaging > Create campaign (Creare campanie) > Custom templates (Șabloane personalizate) > „Ofertă <slug>”.
   - **To (Către):** aceeași audiență ca newsletterul din acea săptămână, după tabelul „Cui îl trimiți” din secțiunea 8. În săptămânile 1–3 de la D0 (încălzirea) alegi „Email · încălzire (cei mai activi)”. Din săptămâna 4 până în ziua D0+194 alegi „Email subscribers”, fără „Email · inactivi (exclus din campanii)”; dacă în To nu poți exclude un segment, alegi „Email · abonați fără inactivi” (secțiunea 8). Dacă în săptămâna 4 faci pasul intermediar din secțiunea 8, în acea săptămână alegi „Email · încălzire + abonați din ultimele 90 de zile”. Din ziua D0+194 alegi „Email · implicați (de folosit după 180 de zile)”.
   - **Subiectul și Preview text:** le iei de la e-mailul A1, mai jos.
   - **Linkuri urmărite:** din meniul ⋯ > Edit UTM parameters (Editați parametrii UTM) pui, de exemplu, `utm_campaign=oferta-<slug>-a1`.
   - **Test:** Send test, la cel mult 5 adrese.
   - **Programare:** Review > Schedule send > Custom date and time (Examinare > Programare trimitere > Dată și oră personalizate) > data și ora de start ale codului > Schedule (Programare). Ce fus orar folosește fereastra de programare nu e documentat, așa că verifici fusul afișat (de testat).
   - **Bine de știut:** Smart delivery e pornit implicit și, la liste de peste 1.000 de abonați, trimite doar celor implicați. O campanie programată la un segment fără niciun abonat revine la ciornă.
4. **Campania A2, programată tot acum.** Creezi a doua campanie din același șablon, cu subiectul, preheaderul și textul de la A2. O programezi pentru ziua dinaintea finalului, la 19:00. Așa, ambele campanii sunt gata din prima zi.
   - **Cui o trimiți:** Shopify nu are un public gata făcut de tipul „au primit A1 și n-au comandat de la începutul ofertei”. Varianta simplă: o trimiți aceluiași public ca A1, iar cine a comandat deja primește și el memento-ul. De aceea textul A2 nu presupune că cititorul n-a comandat.
   - **Varianta cu segment (de testat), doar după perioada de încălzire:** în Customers > Segments (Clienți > Segmente) creezi segmentul „Ofertă <slug> – fără comandă de la start”. El îi păstrează pe abonații fără eticheta `email-inactiv` care n-au nicio comandă sau a căror ultimă comandă e dinainte de start:
     `email_subscription_status = 'SUBSCRIBED' AND customer_tags NOT CONTAINS 'email-inactiv' AND (number_of_orders = 0 OR last_order_date < 2026-11-27)`
     Data din exemplu e doar un model: pui ziua de start a ofertei tale. Verifici în editorul de segmente că acceptă data scrisă așa. În perioada de încălzire trimiți A2 tot la „Email · încălzire (cei mai activi)”. Din ziua D0+194 adaugi la regulă condiția din „Email · implicați (de folosit după 180 de zile)”, ca la edițiile pe categorii din secțiunea 8 (de testat), sau trimiți A2 la „Email · implicați”, ca pe A1.
5. **Pop-up-ul de campanie, în Shopify Forms.** Apps > Forms > Create form > Popup form (Creare formular > Formular pop-up). Sau duplici pop-up-ul de 5%: ⋯ > Duplicate form. Copia pornește Inactive și nu preia traducerile.
   - **Etichete:** `popup-oferta` (aceeași la toate ofertele) și `oferta-<slug>` (doar pentru oferta asta). Dacă ai duplicat pop-up-ul de 5%, ștergi eticheta `popup-welcome5`. Nu folosești niciodată eticheta `newsletter`, care e deja pe 334 de clienți.
   - **Textele și setările:** în tabelul de mai jos.
   - **Fără suprapuneri:** Shopify poate afișa două pop-up-uri deodată și nu are o regulă care să decidă care apare primul. Cel mai simplu e să oprești pop-up-ul de 5% pe durata ofertei. Alternativa: le separi după pagini, dispozitive sau momentul afișării.
   - **Pornirea e manuală:** Forms nu are dată de început sau de final. În ziua de start apeși Turn form on (Activare formular).
   - **Îl văd toți vizitatorii:** pop-up-ul nu se poate ascunde de cei deja abonați. Un abonat existent care îl completează nu intră din nou în seria de bun venit.
6. **Segmentul abonaților din pop-up.** În Customers > Segments (Clienți > Segmente) creezi segmentul „Ofertă <slug> – abonați pop-up”:
   `customer_tags CONTAINS 'oferta-<slug>' AND email_subscription_status = 'SUBSCRIBED'`
   Segmentul existent „Email · pop-up ofertă (toți)” îi strânge pe toți cei veniți din pop-up-uri de campanie, de la toate ofertele. Acum are 0 oameni.
7. **Workflow-ul care trimite B1.** Apps > Flow > Create workflow (Creare flux de lucru):
   - **Declanșator:** Customer joined segment (Client intrat în segment) > alegi „Ofertă <slug> – abonați pop-up”;
   - **Condiție:** starea de marketing Equal to (Egal cu) SUBSCRIBED (`defaultEmailAddress.marketingState` sau `emailMarketingConsent.marketingState`, cea afișată în listă);
   - **Acțiune:** Send marketing email (Trimitere e-mail de marketing) cu e-mailul B1. Îl construiești direct în pas, cu aceleași secțiuni ca șablonul ofertei. Pașii de e-mail nu se pot copia;
   - **Nume și test:** îi dai numele „Ofertă <slug> – B1” și trimiți un test;
   - **Pornire:** în ziua de start apeși Turn on workflow (Activare flux de lucru), înainte să pornești pop-up-ul, ca niciun abonat să nu rateze B1.

   Cât durează până când Shopify observă intrarea în segment nu e documentat (de testat). Alternativa: declanșatorul Customer tags added (Etichete de client adăugate), cu condiția „Tags Includes `oferta-<slug>`” și SUBSCRIBED. În acel workflow nu pui niciodată acțiunea Add customer tags, pentru că workflow-ul s-ar porni singur la nesfârșit.
8. **După B1.** Abonații din pop-up-ul de campanie nu intră în seria de bun venit: condiția C0 din secțiunea 1 îi exclude după eticheta `popup-oferta`. Asta merge doar dacă eticheta ajunge pe client înainte de C0, de aceea seria are la început pauza opțională de 5 minute (de testat). Primesc de acum newsletterul săptămânal și ofertele.
9. **La finalul ofertei, de mână, în aceeași zi.** Codul se oprește singur, dar restul nu are programare:
   - oprești pop-up-ul de campanie: Apps > Forms > ⋯ > Turn off;
   - oprești workflow-ul B1, ca nimeni să nu primească un cod expirat. Workflow-ul apare și în Apps > Messaging > Automations, de unde îl oprești cu Turn off automation > Turn off;
   - pornești la loc pop-up-ul de 5% (Turn form on), dacă l-ai oprit;
   - nu prelungești oferta și nu reiei imediat același cod după memento-ul A2.

   Pune-ți în calendar un memento pentru ziua de start și unul pentru ziua de final.
10. **Teste înainte de prima ofertă:**
    - te abonezi din pop-up-ul de campanie cu o adresă personală nouă. Verifici că pe client apar ambele etichete și starea SUBSCRIBED, că primești B1 și după cât timp, și că nu primești și e-mailul 1 din seria de bun venit;
    - repeți testul cu adresa unui client care există deja. Shopify spune că, la clienții existenți, formularul s-ar putea să nu actualizeze acordul de marketing, iar despre etichete nu spune nimic. Dacă eticheta sau acordul nu apar, acel client nu primește B1, dar vede codul pe ecranul de după abonare.

```text
Discounts: codul [COD], cu dată și oră de start și de final reale
Template: „Ofertă <slug>” (Countdown, Product Static fără Cluster, Discount, Button)
Campanie A1: Create campaign → To: audiența din secțiunea 8 (încălzire → toți fără inactivi → implicați din D0+194)
             → Schedule send: data și ora de start
Campanie A2: Create campaign → To: același public (sau segmentul „fără comandă de la start”, de testat)
             → Schedule send: ziua dinaintea finalului, 19:00
Forms: „Popup – <slug>” → Tags: popup-oferta, oferta-<slug> → Turn form on la start (de mână)
Segment: „Ofertă <slug> – abonați pop-up”

Workflow „Ofertă <slug> – B1” (Apps > Flow):
Trigger: Customer joined segment → „Ofertă <slug> – abonați pop-up”
→ Condition: marketingState = SUBSCRIBED
   false → end
→ Send marketing email: B1 · Detaliile ofertei din pop-up
(la final: Turn off pentru workflow și pentru pop-up, de mână)
```

### Cum legi pop-up-ul de segmentul de abonați noi

Pe scurt, în 6 pași, cu numele din Shopify:

1. **Pop-up de campanie (Shopify Forms):** vizitatorul vede oferta pe site.
2. **Abonare cu bifă:** lasă adresa de e-mail și bifează singur acordul. Bifa nu e pre-bifată.
3. **Etichetele `popup-oferta` + `oferta-<slug>`:** Forms le pune automat pe client (la clienții care există deja, de testat).
4. **Segment:** clientul intră singur în segmentul „Ofertă <slug> – abonați pop-up”, pentru că are eticheta ofertei și e abonat.
5. **Flow trimite e-mailul cu oferta:** workflow-ul pornit de Customer joined segment trimite e-mailul B1.
6. **Apoi newsletterul:** abonatul nu intră în seria de bun venit. Primește newsletterul săptămânal și ofertele.

<<DIAGRAM>>

Pop-up-ul standard de 5% rămâne legat de seria de bun venit (eticheta lui e `popup-welcome5`). Un pop-up de campanie are etichetele lui, segmentul lui și e-mailul lui. Așa, nimeni nu primește și seria de bun venit, și e-mailul ofertei.

**Textele pop-up-ului de campanie (Shopify Forms):**

| Setare în Forms | Ce alegi sau ce scrii |
| --- | --- |
| Nume intern | Popup – <slug>, de exemplu „Popup – black-friday-2026” |
| Title (max. 50 de caractere) | [X]% la [CATEGORIE], până pe [DATA_FINAL]. Exemplu: „15% la pudrele proteice, până pe 30 noiembrie” (45 de caractere). Numeri caracterele după ce completezi. |
| Content (max. 100 de caractere) | Lasă-ne adresa de e-mail și îți trimitem codul și toate condițiile ofertei. (75 de caractere) |
| Câmpul de e-mail | Obligatoriu |
| Button label / Etichetă buton (max. 25 de caractere) | Vreau oferta! (13 caractere) |
| Marketing consent (Consimțământ pentru marketing) | „On form submission if a box is checked” (La trimiterea formularului, dacă este bifată o casetă). Verifici că bifa apare nebifată. |
| Textul bifei | Sunt de acord să primesc pe e-mail newsletterul și ofertele Prime Supplements. |
| Consent disclaimer (Disclaimer privind consimțământul) | Te poți dezabona oricând, dintr-un click, din orice e-mail. Detalii în [Politica de confidențialitate](https://primesupplements.ro/policies/privacy-policy). Condițiile ofertei: [LINK_TERMENI]. |
| Tags (Etichete) | `popup-oferta`, `oferta-<slug>` |
| Success > Show message (Afișare mesaj) | Mulțumim! Codul tău e mai jos, valabil până pe [DATA_FINAL], ora 23:59. Toate condițiile ți le trimitem pe e-mail. |
| Success > Discount (optional) / Reducere (opțional) | [COD]. Pop-up-ul doar îl afișează; e-mailul B1 îl trimite. |
| Behavior | Toate paginile și toate dispozitivele. Afișare la a 2-a pagină vizualizată, ca la pop-up-ul de 5%. Exit intent pornit (doar pe desktop). Dacă păstrezi și pop-up-ul de 5% pornit, le separi aici după pagini, dispozitive sau momentul afișării. |
| Celelalte setări | Popup display, Teaser și Sign in with Shop: ca la pop-up-ul de 5% |
| Automations and workflows > Manage | Nu conectezi nimic. E-mailul B1 pleacă din workflow-ul de la pasul 7. |

### E-mail A1 · Anunțul ofertei (campanie, în prima zi)

**Subiect, 3 variante:**

1. A început: [OFERTA] la Prime Supplements
2. [X]% la [CATEGORIE], până pe [DATA_FINAL]
3. Ofertă nouă: [CATEGORIE] cu [X]% mai puțin

**Preheader:** Codul [COD], valabil până pe [DATA_FINAL], ora 23:59. Toate condițiile sunt în e-mail.

**Buton (CTA):** Vezi oferta → `https://primesupplements.ro/discount/[COD]?redirect=/collections/[COLECȚIE]`

**Setări tehnice:**

- **Tip:** campanie din șablonul „Ofertă <slug>”, programată la data și ora de start ale codului (pasul 3).
- **Audiență:** cea din tabelul „Cui îl trimiți” din secțiunea 8: „Email · încălzire (cei mai activi)” în săptămânile de încălzire, apoi „Email subscribers” fără „Email · inactivi (exclus din campanii)”, iar din ziua D0+194 „Email · implicați (de folosit după 180 de zile)”. Shopify nu poate exclude automat abonații care primesc în aceeași zi un e-mail din seria de bun venit sau din fluxurile de abandon.
- **Codul și condițiile:** valorile din lista de condiții sunt exact cele setate pe cod în Discounts.
- **Prețul de referință:** pentru fiecare produs numit în e-mail scrii cel mai mic preț din ultimele 30 de zile, verificat pe pagina produsului înainte de trimitere.

**Textul e-mailului:**

> Salut!
>
> Avem o ofertă nouă și vrem să o afli printre primii: **[OFERTA, de exemplu 15% la toate pudrele proteice]**, până pe [DATA_FINAL], ora 23:59.
>
> [Secțiunea Countdown: până pe [DATA_FINAL], ora 23:59]
>
> [Secțiunea Product (Static): produsele din ofertă, fără Cluster]
>
> **[PRODUS 1]** · nota [X] din 5, din [Y] recenzii · Preț cu reducere: [PREȚ] lei · Cel mai mic preț din ultimele 30 de zile: [PREȚ_30] lei
>
> [PRODUS 2, la fel]
>
> [PRODUS 3, la fel]
>
> [Secțiunea Discount: codul [COD]]
>
> **[ Vezi oferta ]**
>
> **Condițiile ofertei:**
>
> - **Reducere:** [X]% la [PRODUSE SAU CATEGORIE]
> - **Cod:** [COD]. Se aplică automat dacă apeși butonul de mai sus.
> - **Perioadă:** [DATA_START], ora [ORA] – [DATA_FINAL], ora 23:59
> - **Comandă minimă:** [VALOARE sau „fără”]
> - **Cumulare:** [se cumulează / nu se cumulează] cu alte coduri. Livrarea rămâne gratuită peste 300 de lei.
> - **Produse excluse:** [LISTA sau „niciunul”]
> - **Utilizare:** [o dată de fiecare client / de mai multe ori]
> - **Termeni și condiții:** [LINK]
>
> Nu știi ce ți se potrivește? Răspunde la acest e-mail și te ajutăm să alegi.
>
> Echipa Prime Supplements
>
> [Subsolul comun]

### E-mail A2 · Memento înainte de final (cu o zi înainte)

**Subiect, 3 variante:**

1. Mâine la 23:59 se încheie [OFERTA]
2. Ultima zi întreagă pentru [X]% la [CATEGORIE]
3. Codul [COD] expiră mâine seară

**Preheader:** După [DATA_FINAL], ora 23:59, codul nu mai funcționează.

**Buton (CTA):** Folosește codul înainte de final → `https://primesupplements.ro/discount/[COD]?redirect=/collections/[COLECȚIE]` (același link ca în A1)

**Setări tehnice:**

- **Tip:** campanie din același șablon, programată din prima zi pentru ziua dinaintea finalului, la 19:00 (pasul 4).
- **Secțiuni:** păstrezi din șablon Header, Text, Countdown, Product (Static), Text cu prețurile, Button, Text cu [Subsolul comun] și Footer. Lista lungă de condiții o înlocuiești cu rândul „Condițiile complete: [LINK]”. Secțiunea Discount o poți păstra, deasupra butonului.
- **Audiență:** același public ca A1. După perioada de încălzire poți folosi segmentul „Ofertă <slug> – fără comandă de la start” (de testat).
- **Doar dacă oferta chiar se încheie:** o trimiți numai dacă oferta se încheie atunci. Nu o prelungești și nu o reiei imediat după, cu aceleași condiții. Dacă totuși schimbi data de final a codului, schimbi și Countdown-ul, și data programată a campaniei: Edit send date (sau Remove send date).

**Textul e-mailului:**

> Salut!
>
> Un memento scurt: **[OFERTA]** se încheie mâine, [DATA_FINAL], la ora 23:59. După aceea, codul [COD] nu mai funcționează.
>
> [Secțiunea Countdown: până pe [DATA_FINAL], ora 23:59]
>
> [PRODUSELE DIN OFERTĂ, cu prețul cu reducere și cel mai mic preț din ultimele 30 de zile]
>
> **[ Folosește codul înainte de final ]**
>
> Condițiile complete: [LINK].
>
> Echipa Prime Supplements
>
> [Subsolul comun]

### E-mail B1 · Detaliile ofertei din pop-up (automat, imediat)

**Subiect, 3 variante:**

1. Uite oferta pe care ai cerut-o
2. Codul tău [COD] e aici
3. [OFERTA]: tot ce trebuie să știi

**Preheader:** Valabil până pe [DATA_FINAL], ora 23:59. Codul se aplică automat din buton.

**Buton (CTA):** Folosește codul → `https://primesupplements.ro/discount/[COD]?redirect=/collections/[COLECȚIE]`

**Setări tehnice:**

- **Locul în flux:** pasul Send marketing email din workflow-ul „Ofertă <slug> – B1”, după condiția SUBSCRIBED, fără așteptare (pasul 7).
- **Secțiuni:** Header, Text, Discount (codul ofertei), Button cu linkul de mai sus, Text cu condițiile, Text cu [Subsolul comun], Footer.
- **Oprirea:** workflow-ul îl oprești de mână în ziua în care se încheie oferta (pasul 9).
- **După B1:** nu urmează altă serie. Abonatul primește newsletterul săptămânal și ofertele.

**Textul e-mailului:**

> Salut!
>
> Mulțumim că te-ai abonat. Așa cum ți-am promis în pop-up, iată oferta:
>
> **[OFERTA]**
>
> **Codul tău: [COD]** [secțiunea Discount]
>
> **[ Folosește codul ]**
>
> **Condițiile ofertei:** [aceeași listă ca în e-mailul A1: reducere, cod, perioadă, comandă minimă, cumulare, produse excluse, utilizare, termeni]
>
> **Bine de știut:** livrarea e gratuită peste 300 de lei, iar Cargus aduce coletul în 1–3 zile lucrătoare. Dacă ai întrebări, ne scrii la contact@primesupplements.ro sau pe WhatsApp, la 0775 286 584.
>
> De acum îți trimitem o dată pe săptămână ghidul săptămânii de pe blog și, când avem, ofertele noastre. Te poți opune oricând e-mailurilor de marketing: apeși „Dezabonare” la finalul oricărui e-mail.
>
> Spor la antrenament, Marius Chera, fondator Prime Supplements
>
> [Subsolul comun]

## 10. Cum le pui în funcțiune

Nimic din acest document nu e încă activ. Deocamdată clienții primesc doar e-mailurile din theMarketer și e-mailul standard Shopify de checkout abandonat. Lucrezi pe calculator, în adminul Shopify, și urmezi ordinea de mai jos. Automatizările le construiești pe rând și le salvezi fără să le pornești, apoi le pornești în ziua lansării, într-o singură sesiune de lucru. Trei excepții: checkout-ul abandonat îl muți pe automatizarea nouă abia în ziua lansării, pentru că trecerea îl pornește pe loc; recâștigarea pornește după încălzire; curățarea listei pornește după 180 de zile (pasul 6). Bifezi fiecare pas după ce l-ai terminat.

**Ce pot face eu direct în Shopify, când îmi ceri:**

- creez sau modific segmente, inclusiv cele de test și cele de care ai nevoie mai târziu (de exemplu „Email · recâștigare – campanie unică” sau regula nouă a segmentului „Email · implicați (de folosit după 180 de zile)”, din secțiunea 7, pasul 8), și îți spun câți oameni sunt în fiecare;
- creez codurile de reducere pentru oferte, cu dată și oră reale de început și de final;
- pun etichete pe produse (`fara-email-navigare`, din secțiunea 2) și pe clienții de test (`test-email`, `test-flux`, `test-recastigare`, `test-curatare`, `test-activ`);
- verific WELCOME5, numărul de abonați, etichetele (`popup-welcome5`, `popup-oferta`, `email-inactiv`, `recastigare-auto`, `curatare-intrebat`, `revenire-lista`) și starea adreselor tale de test;
- verific înregistrările DNS publice (DMARC), după ce le schimbi;
- import abonații noi din exportul final din theMarketer, cu etichetele corecte, și îi dezabonez în Shopify pe cei care s-au dezabonat între timp în theMarketer;
- îți dau cifrele pentru actualizări: cele mai vândute produse și notele din recenzii;
- după ce dezinstalezi theMarketer, caut în temă resturile lui de cod și le scot, dacă îmi ceri.

**Ce faci tu de mână,** pentru că Shopify nu are API pentru Messaging, Flow și Forms:

- automatizările, șabloanele, campaniile și setările din Messaging;
- fluxurile din Flow și pop-up-urile din Forms;
- setările din Settings: adresa magazinului, expeditorul, autentificarea domeniului, dubla confirmare;
- comutatoarele din temă (App embeds) și înregistrările DNS de la firma la care ai domeniul;
- tot ce ține de contul theMarketer.

**1. Setări de bază**

- [ ] **Adresa magazinului.** În **Settings > General** (Setări > General) completezi numele firmei, PRIME SPORT SUPPLEMENTS SRL, și adresa întreagă: Str. Ioan Virgil Ispas nr. 17A, Cisnădie, 555300, jud. Sibiu. Azi lipsesc numărul străzii și orașul. Adresa de aici apare singură în subsolul fiecărui e-mail, deci o completezi înainte de orice trimitere.
- [ ] **Network Intelligence.** În **Settings > Customer privacy > Shopify Network Intelligence** verifici că e pornit și îl lași așa. Dacă îl oprești, Messaging se dezinstalează imediat.
- [ ] **Expeditorul.** În **Settings > Notifications > Sender email** (Setări > Notificări > E-mail expeditor) verifici că adresa este `contact@primesupplements.ro`. De pe ea pleacă și e-mailurile de marketing, iar răspunsurile clienților ajung tot aici. Cineva trebuie să o citească zilnic.
- [ ] **Autentificarea domeniului.** Tot acolo, la **Email domain authentication** (Autentificarea domeniului de e-mail), te uiți întâi la stare. Dacă scrie deja **Authenticated** (Autentificat), treci mai departe. Altfel:
  - alegi **Manual setup** (Configurare manuală). Varianta automată merge doar dacă domeniul e la Cloudflare, GoDaddy sau IONOS, iar al tău e la alt furnizor (serverele de nume kemo.services);
  - adaugi la furnizorul de domeniu **toate** înregistrările CNAME afișate, apoi apeși **I updated DNS records** (Am actualizat înregistrările DNS);
  - poate dura până la 48 de ore. La final, starea trebuie să fie **Authenticated** (Autentificat). Fără autentificare, Shopify trimite de pe o adresă de forma store+123@shopifyemail.com.
- [ ] **DMARC.** La `_dmarc` trebuie să existe **o singură** înregistrare TXT. Azi sunt două: `v=DMARC1; p=none;` și `v=DMARC1; p=none; adkim=r; aspf=r; pct=0;`. Două înregistrări fac verificarea să eșueze, așa că o păstrezi doar pe `v=DMARC1; p=none;` și o ștergi pe cealaltă. Celelalte înregistrări DNS, de exemplu SPF-ul existent, nu le atingi până nu afli cine le folosește. După schimbare îmi spui, iar eu verific dacă a rămas o singură înregistrare.
- [ ] **Bannerul de cookie-uri.** Verifici pe site că bannerul cere acordul pentru cookie-urile de marketing. Legea 506/2004 cere acest acord pentru urmărirea vizitelor și a coșului, pe care se bazează fluxurile de navigare și de coș.
- [ ] **Dubla confirmare (double opt-in).** **Settings > Notifications > Customer notifications > Marketing double opt-in > Customer marketing confirmation** (Setări > Notificări > Notificări pentru clienți > Confirmare dublă a abonării pentru marketing > Confirmare marketing client). O pornești acum, ca s-o poți testa (secțiunea 1, „Dubla confirmare”).
  - Comutatorul exact de pornire îl vezi pe ecran.
  - E-mailul de confirmare îl scrii în română, fără nicio reclamă: fără cod și fără produse. De exemplu, subiectul „Confirmă abonarea la Prime Supplements” și textul „Salut! Apasă butonul de mai jos ca să confirmi că vrei să primești e-mailurile Prime Supplements. Dacă nu te-ai abonat tu, ignoră acest mesaj.”
  - Abonații de până acum nu trebuie să confirme.
- [ ] **Mesajul din formularul temei.** **Online Store > ⋯ > Edit default theme content** (Editează conținutul temei implicite) **> Newsletter form > Confirmation** (Formular pentru newsletter > Confirmare): „Verifică-ți e-mailul și confirmă abonarea. După confirmare îți trimitem codul WELCOME5.”
- [ ] **Testul dublei confirmări, partea 1.** Te abonezi din formularul din subsolul site-ului cu o adresă personală nefolosită până acum în magazin. Trebuie să primești e-mailul de confirmare. În **Customers** (Clienți) notezi starea adresei înainte și după ce apeși linkul. Partea a 2-a, cu pop-up-ul și cu seria de bun venit, e la pasul 4.
- [ ] **Urmărirea deschiderilor.** În **Apps > Messaging > Settings > Open tracking** (Urmărirea deschiderilor) lași deocamdată varianta implicită, „Optimize open tracking” (Optimizează urmărirea deschiderilor), până răspunde juristul (pasul 8). Rezultatele le judeci după click-uri, nu după deschideri.
- [ ] **Linkurile urmărite (UTM).** În **Apps > Messaging > Settings > UTM tracking** (Setări > Urmărire UTM) verifici că rămân `utm_source=shopify_email` și `utm_medium=email`. La fiecare campanie schimbi doar `utm_campaign`, din meniul ⋯ al campaniei > **Edit UTM parameters** (Editați parametrii UTM), de exemplu `newsletter-2026-11-01`. O schimbare în setări se aplică doar campaniilor create după ea, deci o faci înainte de prima campanie.
- [ ] **Alerta de cheltuieli.** **Apps > Messaging > Settings > Monthly spending alert > Add threshold** (Alertă de cheltuieli lunare > Adaugă un prag) > **Save**. Un prag puțin peste estimarea de 8–11 USD, de exemplu 15 USD, te anunță dacă trimiterile cresc peste așteptări. Alerta doar te anunță: nu oprește trimiterile și nici factura.
- [ ] **Smart delivery.** În **Apps > Messaging > Settings > Delivery** (Setări > Expediere) verifici că Smart delivery (Expediere inteligentă) e pornit. E pornit implicit și, la campaniile cu peste 1.000 de destinatari, trimite doar abonaților implicați.
- [ ] **Șablonul de brand.** În **Apps > Messaging > Templates > Manage branding** pui logoul, culorile și fontul din „Șablonul de brand”, în „Context și reguli comune”.
- [ ] **Șablonul de bază, cu subsolul comun.** **Apps > Messaging > Templates > Create template** (Creare șablon) > alegi un șablon de pornire > îl numești „Prime · bază”.
  - Adaugi o secțiune **Text** chiar deasupra secțiunii Footer și lipești în ea cele trei rânduri din „Subsolul comun”. Dacă n-ai putut seta culoarea subsolului în Manage branding, o setezi aici, în secțiunea Footer.
  - Șablonul se salvează singur. La final apeși **Done** (Gata).
  - Din meniul șablonului (⋯) > **Duplicate** faci din el, mai târziu, șabloanele „Newsletter săptămânal” (secțiunea 8) și „Ofertă <slug>” (secțiunea 9).

**2. Pop-up-ul cu Shopify Forms**

- [ ] **Instalezi Shopify Forms** de la https://apps.shopify.com/shopify-forms. E gratuit. După instalare îl găsești în **Apps > Forms** (Aplicații > Forms).
- [ ] **Pornești Forms doar pe tema de test.** Deschizi în editor tema nepublicată pe care faci testele > **App embeds** (Încorporări de aplicații) > comutatorul **Forms** > **Save** (Salvare). Comutatoarele se setează separat pe fiecare temă. Pe tema live îl pornești abia în ziua lansării.
- [ ] **Creezi pop-up-ul de 5%.** **Apps > Forms > Create form > Popup form** (Creare formular > Formular pop-up) > numele „Popup WELCOME5” > **Create**. Textele și setările le iei din tabelul „Pop-up-ul standard de 5% (Shopify Forms)”, din secțiunea 1. Verifici în special:
  - **Marketing consent** (Consimțământ pentru marketing): **On form submission if a box is checked** (La trimiterea formularului, dacă este bifată o casetă), iar bifa apare nebifată;
  - textul bifei și **Consent disclaimer** (Disclaimer privind consimțământul), cu linkul spre `https://primesupplements.ro/policies/privacy-policy`. Textul îl confirmă juristul (pasul 8);
  - **Tags > Find or create tags** (Etichete > Găsiți sau creați etichete): `popup-welcome5`. Nu folosești `newsletter`: eticheta e deja pe 334 de clienți, veniți din formularul din subsol;
  - **Automations and workflows** (Automatizări și fluxuri de lucru): nu legi nimic. Seria de bun venit pornește singură, din declanșatorul ei;
  - apeși **Save**. Formularul rămâne **Inactive** (inactiv) până la test (pasul 4) și apoi până în ziua lansării.
- [ ] **Pop-up-ul vechi din temă**, cel cu 10% pentru „clubul VIP”, rămâne oprit, ca să nu contrazică oferta de 5%.

Bine de știut: pop-up-ul nu se poate ascunde de abonații existenți sau de clienții logați și nu poate fi afișat doar pe anumite linkuri. Dacă un vizitator îl închide, asta se ține minte doar pe dispozitivul respectiv.

**3. Automatizările**

Le construiești în ordinea de mai jos, cu textele și setările din secțiunea fiecăreia. La cele făcute din șabloane alegi **Save without turning on** (Salvați fără a activa), apoi **Edit workflow** (Editează fluxul de lucru) > modificările > **Apply changes** (Aplică modificările). Cele create în **Apps > Flow** rămân oprite până apeși **Turn on workflow** (Activare flux de lucru). După fiecare așteptare și înaintea fiecărui e-mail pui condiția G: clientul e abonat (SUBSCRIBED) și, unde e cazul, n-a comandat. Pașii de e-mail nu se pot copia, așa că fiecare e-mail îl construiești în pasul lui.

- [ ] **Înainte de toate,** deschizi **Apps > Messaging > Automations** (Aplicații > Messaging > Automatizări) și notezi ce există deja. Dacă găsești o altă automatizare de bun venit, coș, navigare, după comandă („Thank customers after they purchase”, „Upsell customers after their first purchase”) sau recâștigare, o oprești (**Turn off automation**), ca să rămână activă câte una de fiecare tip. E-mailul de checkout abandonat nu îl atingi încă. Verifici și **Growth > Autopilot**: nu trebuie să aibă automatizări de e-mail care ar rula în paralel cu ale tale.
- [ ] **1. Checkout abandonat** (secțiunea 4). E singurul flux care nu poate sta „salvat, nepornit”: trecerea la automatizarea nouă îl pornește pe loc și înlocuiește e-mailul standard pe care Shopify îl trimite deja. În ultimele 30 de zile, acesta a plecat la 7 din 75 de checkout-uri abandonate, la circa 10 ore și doar abonaților.
  - **Acum:** în **Apps > Messaging > Automations** afli ce variantă rulează: „Abandoned checkout emails by Shopify” (cea veche) sau „Abandoned checkout” (cea nouă). Pregătești textele celor 4 e-mailuri (1, 2, 3a și 3b). Dacă ai deja varianta nouă, o poți extinde oricând, ca mai jos.
  - **În ziua lansării, primul lucru:** **View templates > Abandoned checkout > Edit** (Vizualizare șabloane > Plată abandonată > Editare): pui textul e-mailului 1 și verifici că „To:” a rămas pe abonați. Apoi **Turn on automation > Continue** (Activare automatizare > Continuare). Trecerea e **definitivă**: nu te mai poți întoarce la e-mailul vechi. Setările de azi se păstrează (circa 10 ore, doar abonați).
  - **Imediat după:** **Abandoned checkout > Edit** > în Flow o extinzi la 3 e-mailuri, la 1 oră, la 24 și la 72 de ore, după secțiunea 4 > **Turn on workflow** (Activare flux de lucru). Nu amâna, pentru că așteptarea preluată e de circa 10 ore.
  - La final verifici că varianta veche nu mai apare activă.
- [ ] **2. Abandon coș** (secțiunea 3). **Create automation > Recover abandoned cart** (Recuperare coș abandonat) > canalul **Email** > **Save without turning on** > **Edit workflow**. Păstrezi regula de 14 zile din șablon doar la începutul fluxului. Pui în G condiția care oprește fluxul când clientul ajunge la checkout (`mostRecentStep` = CART), de unde preia checkout-ul abandonat (de testat), și pasul Run code pentru valoarea coșului.
- [ ] **3. Abandon navigare** (secțiunea 2). Întâi îmi ceri să pun eticheta `fara-email-navigare` pe produsele din secțiunea 2, pasul 3, sau o pui tu. Apoi **Create automation > Convert abandoned product browse** > canalul **Email** > **Save without turning on** > **Edit workflow**. Păstrezi regula de 14 zile doar la început. Secțiunea Abandoned browse pune singură produsul văzut.
- [ ] **4. Seria de bun venit** (secțiunea 1). **Create automation > Welcome new subscribers with a discount series** (Întâmpinarea noilor abonați cu o serie de reduceri) > **Save without turning on** > **Edit workflow**.
  - Șablonul are 4 e-mailuri. Îl duci la 5, cu așteptări de 2, 2, 3 și 3 zile.
  - Păstrezi condiția din șablon care îi exclude pe cei abonați la checkout.
  - Adaugi pauza opțională de 5 minute și condiția C0: abonat, 0 comenzi și fără etichetele `import-themarketer` și `popup-oferta`.
  - Seria pornește doar la abonările din formularele Shopify (pop-up-ul din Forms și formularul din subsol), nu și la cele din theMarketer sau din Pop Convert.
- [ ] **5. Client nou** (secțiunea 5). **Create automation > Thank customers after they purchase** > **Save without turning on** > **Edit workflow**. Ștergi ramura pentru a doua comandă, pui condiția C0 (exact 1 comandă și abonat), apoi cele 4 e-mailuri, în 21 de zile.
- [ ] **6. Reaprovizionare** (secțiunea 6). Nu există șablon, așa că faci 7 fluxuri separate, câte unul pe produs (plus 2 opționale), în **Apps > Flow > Create workflow** (Creare flux de lucru), cu declanșatorul **Order paid**. Îl faci întâi pe cel pentru EAA, apoi îl duplici pentru celelalte. O așteptare poate avea cel mult 90 de zile. Le lași oprite.
- [ ] **7. Recâștigare și curățare** (secțiunea 7). Fluxul A: **Create automation > Win back customers**, cu declanșatorul **Customer joined segment** (Client intrat în segment) pe segmentul „Email · recâștigare (90 de zile fără comandă)” > **Save without turning on**. Fluxurile B și C, pentru curățarea listei, le faci în **Apps > Flow > Create workflow** și le lași oprite: pornesc abia după 180 de zile (pasul 6). Tot acum, înainte de trecere, completezi regula segmentului „Email · implicați (de folosit după 180 de zile)” (secțiunea 7, pasul 8): fără ea, fluxurile B și C și campaniile de după ziua D0+194 lucrează cu regula veche. Segmentul „Email · recâștigare – campanie unică” și regula nouă a segmentului „Email · implicați” ți le fac eu, dacă îmi ceri.
- [ ] **Șablonul „Newsletter săptămânal”** (secțiunea 8): îl faci din „Prime · bază” (⋯ > **Duplicate**) sau de la zero, cu secțiunile din secțiunea 8. Opțional, faci și mementoul de vineri din Flow, cu declanșatorul **Scheduled time** (Oră programată), după pașii din aceeași secțiune.

**4. Teste**

Fiecare e-mail îl trimiți întâi ca test (**Send test**, Trimiteți un test) pe o adresă personală. Logica fluxurilor o testezi așa:

- **Seria de bun venit:** o pornești pentru test, pentru că pornește doar la abonările din formularele Shopify. Cine se abonează între timp din formularul din subsol o primește și el. E în regulă: sunt abonați reali, cu 0 comenzi.
- **Client nou, reaprovizionarea, recâștigarea și curățarea:** le testezi pe copii de test, cu așteptări foarte scurte (0,01 zile) și cu etichetele de test, cum scrie în secțiunile 5, 6 și 7. După test oprești și ștergi copiile.
- **Checkout-ul, coșul și navigarea:** le testezi în ziua lansării, imediat după pornire (pasul 5).

- [ ] **Pop-up-ul și dubla confirmare, partea 2.** Pornești seria de bun venit (**Turn on automation**). Pe tema de test pornești formularul (⋯ > **Turn on**) doar cât durează testul. Întâi verifici, într-o fereastră privată, că pe site-ul live nu apare (de testat). Apoi te abonezi din pop-up, pe tema de test, cu o adresă personală nouă și verifici:
  - vine e-mailul de confirmare?
  - seria de bun venit pornește abia după ce confirmi sau înainte? În **View recent activity** vezi dacă rularea a trecut de condiția C0;
  - în **Customers**, clientul are eticheta `popup-welcome5` și e abonat?
  - primești e-mailul 1 cu WELCOME5, iar butonul pune codul singur în coș?
  - după test oprești formularul (⋯ > **Turn off**).

  Dacă pop-up-ul nu trimite confirmarea, abonarea se bazează doar pe bifa de acord: acordul e explicit, dar fără dublă confirmare. Dovada rămâne în **Apps > Forms >** formularul **> View submissions**. Întrebi juristul dacă e suficient (pasul 8). Dacă vine confirmarea, dar rularea se oprește la C0, folosești varianta de rezervă cu declanșatorul **Customer joined segment**, din secțiunea 1.
- [ ] **Clientul care există deja.** Te abonezi din pop-up cu o adresă care e deja client, dar dezabonată. Primește eticheta și devine abonată? Shopify spune că, la clienții existenți, acordul de marketing „s-ar putea să nu se actualizeze”.
- [ ] **Editorul Flow.** Te uiți ce unități îți oferă pasul **Wait** (minute, ore, zile) și ce câmpuri apar la condiții: starea de marketing (`defaultEmailAddress.marketingState` sau `emailMarketingConsent.marketingState`), valoarea checkout-ului și stocul. Folosești câmpurile care apar.
- [ ] **E-mailul de checkout de azi:** e varianta veche sau automatizarea nouă? (pasul 3.1).
- [ ] **Ora campaniilor.** În fereastra de programare a unei campanii verifici că ora afișată e ora României.
- [ ] **Segmentele noi.** Dacă faci alte segmente, verifici ce formă acceptă editorul: `MATCHES (date …)` sau `(since: …)`. Cele 11 existente funcționează deja.
- [ ] **Fiecare e-mail, pe telefon și pe calculator:** subiectul, preheaderul, butoanele, linkurile, salutul cu și fără prenume, subsolul comun, adresa din Footer și linkul de dezabonare, inclusiv în ce limbă apare textul lui. Îl deschizi și cu imaginile blocate, ca să vezi textele alternative, și pe modul întunecat, în Gmail, Apple Mail și Outlook (de testat).
- [ ] **Dezabonarea.** La final, cu o adresă de test de care nu mai ai nevoie, apeși linkul de dezabonare dintr-un e-mail primit din serie (nu dintr-un e-mail de test). În **Customers**, adresa apare dezabonată și nu mai primește nimic.

**5. Ziua lansării**

Faci totul într-o singură sesiune, într-o zi lucrătoare, de exemplu dimineața. Rezervă-ți circa două ore: testul de checkout îți dă abia după aproximativ o oră valoarea de care au nevoie fluxurile de coș și de navigare.

- [ ] **Înainte să începi:** domeniul are starea **Authenticated**, adresa magazinului e completă, regula segmentului „Email · implicați (de folosit după 180 de zile)” e completată (secțiunea 7, pasul 8), testele de la pasul 4 au ieșit bine și nu rulează niciun import de clienți.
- [ ] **Checkout abandonat:** treci la automatizarea nouă, o extinzi la 3 e-mailuri și o pornești (pasul 3.1).
- [ ] **Testul de checkout, imediat** (secțiunea 4, pasul 7). Pui temporar în e-mailul 1 secțiunea Custom Liquid care afișează subtotalul doar clienților cu eticheta `test-email`. Apoi, cu o adresă de test abonată, cu această etichetă, începi un checkout cu produse de o valoare cunoscută, scrii adresa și pleci fără să plătești. Checkout-ul devine abandonat după 10 minute.
- [ ] **Cât aștepți, pornești fluxurile care nu țin de abandon:** seria de bun venit (dacă n-a rămas pornită de la test), client nou și cele 7 fluxuri de reaprovizionare. La cele din Messaging: deschizi automatizarea > **Turn on automation** (Activați automatizarea). La cele din Flow: **Apps > Flow** > fluxul > **Turn on workflow**.
- [ ] **Pornești pop-up-ul din Shopify Forms:** **Online Store > Edit theme > App embeds** (Magazin online > Editare temă > Încorporări de aplicații) > comutatorul **Forms** pe tema live > **Save**, apoi **Apps > Forms > Popup WELCOME5 > Turn form on** (Activare formular).
- [ ] **Oprești theMarketer imediat, în aceeași sesiune:**
  - în **Online Store > Edit theme > App embeds** oprești theMarketer (`mktr_core`) și Pop Convert > **Save**. Nu se știe sigur care dintre ele afișează acum pop-up-ul de 5%, așa că le oprești pe amândouă. Faci la fel pe tema de test, ca să nu reapară dacă o publici;
  - în contul theMarketer oprești pop-up-ul și toate automatizările: seria de bun venit, abandon site, abandon navigare, ambele automatizări de coș abandonat, wishlist, curățarea de 30 de zile și orice altele. Așa nimeni nu primește e-mailuri duble. Meniurile theMarketer nu sunt documentate: dacă nu găsești butonul de oprire, întrebi suportul lor (iam@themarketer.com).
- [ ] **Verifici site-ul** pe telefon și pe calculator, într-o fereastră privată: apare un singur pop-up, cel nou, de 5%. Te abonezi cu o adresă de test nouă și primești e-mailul 1.
- [ ] **La aproximativ o oră după abandonul de test,** deschizi **Apps > Flow** > fluxul de checkout > **View recent activity**:
  - vezi ce valoare a avut `customerHasNoOrderSinceAbandonment` la testul fără comandă. Pe aceea o pui în condiția G din fluxurile de coș și de navigare. Dacă rularea s-a oprit la G deși n-ai comandat, valoarea din fluxul de checkout e greșită: o schimbi în toate condițiile G ale fluxului și repeți testul cu altă adresă;
  - a venit e-mailul 1, cu produsele corecte și cu butonul de întoarcere? Dacă subtotalul apare în bani (de exemplu 15000 la 150 de lei), schimbi pragul din e-mailul 2 din 300 în 30000. Apoi ștergi secțiunea de test. Primul e-mail 2 pleacă abia după 24 de ore, deci ai timp.
- [ ] **Pornești abandonul de coș, apoi abandonul de navigare** (**Turn on automation**).
- [ ] **Testele de coș și de navigare**, după secțiunile 3 (pasul 6) și 2 (pasul 8). Ești logat în contul de client și accepți cookie-urile de marketing. Pentru fiecare test îți trebuie altă adresă abonată, din cauza regulii de 14 zile: adresa folosită la checkout nu mai intră 14 zile nici în coș, nici în navigare.
  - **Coș:** produse de sub 300 de lei pe o adresă și de peste 300 de lei pe alta. După o oră vine e-mailul 1, iar după 24 de ore 2b, respectiv 2a. În View recent activity vezi ce valoare a calculat Run code.
  - **Navigare:** deschizi o pagină de produs și pleci fără să pui nimic în coș. După circa 4 ore vine e-mailul cu produsul văzut.
  - **Comanda:** după e-mailul 1 dintr-un flux de abandon, plasezi comanda cu aceeași adresă, de exemplu cu plata ramburs. Fluxul trebuie să se oprească. Apoi anulezi comanda.
- [ ] **În următoarele 3–7 zile** te uiți zilnic în **Apps > Flow** > fiecare flux > **View recent activity**, după erori. Eroarea „Customer does not accept marketing” înseamnă că lipsește condiția G înaintea unui e-mail.
- [ ] **Mai târziu, înainte să dezinstalezi theMarketer:**
  - Faci în theMarketer un ultim export: **Audience > Contacts** > bifezi „Email address” > **Select all** > **Action for X selected contacts** > **Export**. Păstrezi fișierul: e dovada acordului.
  - Din fișier iei doar abonații noi de după importul din 13–14 octombrie, abonați pe canalul e-mail, cu acord dovedit. Îi import eu sau îi imporți tu din **Customers > Import** (Clienți > Import), cu etichetele `import-themarketer` și `abonat-themarketer` și cu „Accepts Email Marketing” = yes. Nu bifezi „Overwrite existing customers”: ar înlocui toate datele clienților existenți, inclusiv etichetele. Etichetele îi țin în afara seriei de bun venit din Shopify, pentru că au primit deja bun venitul din theMarketer. După import verifici că apar abonați, nu în așteptarea confirmării (de testat, cu dubla confirmare pornită). Pe cei care s-au dezabonat între timp în theMarketer îi dezabonez eu și în Shopify.
  - Notezi ce înregistrări DNS a cerut theMarketer (în contul lui: **Settings > Email settings > Domain validation**), ca să știi mai târziu care sunt ale lui. DMARC rămâne unul singur.
  - Anulezi abonamentul din contul theMarketer: **Settings > Billing details > Subscription management > Manage subscription > Cancel subscription**. Dezinstalarea din Shopify nu oprește plățile făcute direct către theMarketer. La închiderea contului, theMarketer îți șterge baza de date, deci exportul vine înainte.
  - Dezinstalezi aplicația: **Settings > Apps** > ⋯ lângă theMarketer > **Uninstall**. Câteva fișiere scrise de theMarketer în temă rămân și după dezinstalare. Le caut eu după aceea.
  - Pop Convert rămâne oprit. Dacă vrei să-l dezinstalezi, exporți întâi abonații pe care îi are.

**6. Încălzirea domeniului**

În ultimele 180 de zile, Shopify n-a trimis niciun e-mail de marketing din magazin, iar reputația de expeditor nu se mută din theMarketer. De aceea crești volumul treptat. Primul newsletter îl trimiți în prima duminică de după lansare.

- [ ] **Notezi data primului newsletter (ziua D0)** și îți pui în calendar zilele D0+21, D0+180 și D0+194.
- [ ] **Primele 3 newslettere** (săptămânile 1–3, duminică la 18:00) le trimiți doar la segmentul „Email · încălzire (cei mai activi)”, adică la 1.054 de oameni. La fel faci cu ofertele din această perioadă.
- [ ] **După fiecare trimitere** deschizi raportul campaniei și te uiți la Bounce rate (adrese respinse) și la Spam rate (plângeri de spam). Pragurile: sub 2% adrese respinse și sub 0,1% plângeri de spam.
- [ ] **Din săptămâna a 4-a,** dacă pragurile sunt respectate, trimiți la toți abonații, după tabelul „Cui îl trimiți” din secțiunea 8. Dacă nu, mai rămâi o săptămână la segmentul de încălzire. Shopify recomandă să crești volumul cu cel mult 20–30% pe săptămână. Saltul de la 1.054 la toți abonații e mai mare, dar Smart delivery îi lasă oricum deoparte pe abonații neimplicați. Dacă vrei să respecți recomandarea, în săptămâna a 4-a trimiți întâi la segmentul „Email · încălzire + abonați din ultimele 90 de zile” (circa 1.270 de persoane; regula e în secțiunea 8) și treci la toți abonații din săptămâna a 5-a. Atunci pornești și recâștigarea cu o săptămână mai târziu. Dacă după trecere cresc respingerile sau plângerile, revii o săptămână la segmentul de încălzire.
- [ ] **În jurul zilei D0+21 pornești recâștigarea** (secțiunea 7): **Apps > Messaging > Automations** > Win back customers > **Turn on automation**. După 1–2 zile trimiți campania unică cu e-mailul 1 la segmentul „Email · recâștigare – campanie unică”. Motivul: Shopify nu spune dacă automatizarea pornește și pentru cei 1.061 de clienți aflați deja în segment, iar ei nu sunt cei mai activi abonați. Eticheta `recastigare-auto` împiedică dublurile.
- [ ] **În ziua D0+180 pornești curățarea listei** (fluxurile B și C din secțiunea 7), dimineața. Mai devreme nu, pentru că Shopify nu are încă istoric de click-uri și ar scoate din campanii aproape toată lista. În aceeași zi, la 19:00, trimiți campania unică cu e-mailul 3 la segmentul „Email · curățare de pornire (o singură dată)”, dacă la pornirea recâștigării (D0+21) ai văzut în View recent activity că Shopify nu pornește fluxurile pentru cei aflați deja în segment. Dacă le pornește, nu mai trimiți campania: fluxul B le trimite tuturor e-mailul 3 (secțiunea 7, pasul 12).
- [ ] **Din ziua D0+194,** newsletterul și ofertele pleacă la „Email · implicați (de folosit după 180 de zile)”.

**7. Lunar și trimestrial**

- [ ] **Lunar, automatizările.** În **Apps > Messaging > Automations** te uiți la Reach, Sessions, Orders, Conversion rate și Sales (Acoperire, Sesiuni, Comenzi, Rată de conversie, Vânzări) pentru fiecare automatizare. Pentru un singur e-mail: lista de activități > ⋯ > **View report**. La fiecare 2–4 săptămâni treci la următoarea variantă de subiect și compari rata de click.
- [ ] **Lunar, campaniile.** În raportul fiecărui newsletter și al fiecărei oferte urmărești Open, Click, Bounce, Unsubscribe și Spam rate, plus comenzile și vânzările. Compari variantele de subiect folosite după rata de click.
- [ ] **Lunar, segmentele, erorile și costul.** Te uiți câți oameni au „Email · candidați curățare (fără click 180 de zile)”, „Email · inactivi (exclus din campanii)” și „Email · pop-up ofertă (toți)”. Verifici erorile din Flow (View recent activity) și rândul „Marketing emails” de pe factura Shopify.
- [ ] **Trimestrial, cifrele din texte.** Actualizezi notele și numărul de recenzii (432 de recenzii, nota 4,87, notele pe produs) din seria de bun venit și din celelalte e-mailuri care le citează. Verifici că produsele recomandate sunt active și în stoc și că lista celor mai vândute e încă aceeași. Îți pot da eu cifrele.
- [ ] **Trimestrial, produsele noi.** Dacă adaugi produse noi la proteine, creatină sau cremă de orez, îmi spui și le adaug în segmentele de cumpărători. La reaprovizionare, un produs nou are nevoie de propriul flux (secțiunea 6).
- [ ] **La fiecare ofertă:** codul cu dată reală de final (îl pot crea eu), campaniile A1 și A2, programate din prima zi, și pop-up-ul de campanie, pe care îl pornești și îl oprești de mână, pentru că Forms nu are programare. Pașii sunt în secțiunea 9.

**8. De confirmat cu un jurist sau cu INSP**

- [ ] Dacă e-mailurile despre suplimente au nevoie de avizare prealabilă, conform Ordinului 1069/2007, art. 12.
- [ ] Textul de acord din pop-up (textul bifei și disclaimerul din secțiunea 1), faptul că bifa nu e pusă din start și dacă acordul fără dublă confirmare e suficient, în cazul în care Forms nu trimite e-mailul de confirmare.
- [ ] Secțiunea despre newsletter din politica de confidențialitate. Adresa de contact scrisă acolo e încă cea veche, de Outlook, și trebuie înlocuită cu contact@primesupplements.ro. După ce juristul aprobă textul, îl pot pune eu în politică.
- [ ] Denumirile de produs care sună a efect (titlul vechi al lui Cluster, Recovery Glutamin și celelalte din secțiunea 2, pasul 3). Până la un răspuns, nu apar în e-mailuri.
- [ ] Dacă urmărirea deschiderilor e în regulă fără un acord separat. Shopify are și varianta „Ask for consent” (Solicită acordul).

## 11. Ce mai rămâne de decis și de testat

**Decizi tu (sau cu un jurist):**

- **Dubla confirmare (double opt-in).** Dacă o pornești, codul WELCOME5 nu mai apare pe ecranul pop-up-ului; vine doar în primul e-mail, după confirmare.
- **WELCOME5 pentru cine.** Azi merge pentru toți clienții, inclusiv pentru cei care au mai cumpărat, și se cumulează cu alte coduri. Regula „doar la prima comandă” există numai în condiția seriei de bun venit. Dacă vrei, o limitez și în Discounts.
- **Produsele cu nume care sună a efect** (Cluster Insulin Bomb, Fat Burning Booster Shot, Water Out, Testo Revive, Thermo Core, Energy Pump Shot, Recovery Glutamin, Recovery BCAA, Cardio Calm, Liver Protect). Până le redenumești, nu apar în e-mailurile cu produse: le exclud cu eticheta `fara-email-navigare`. În e-mailurile de coș și checkout, Shopify afișează însă titlul produsului din coș, deci numele rămâne acolo.
- **Citate din recenzii:** citatul lui Robert D. e scurtat cu „[…]”. Recenzia semnată „Andrei O.” apare în Judge.me ca „Andrei Oana”, deci trebuie verificat care e prenumele.
- **Originea ingredientelor:** frazele „Creapure®, produsă în Germania” și „Cluster Dextrin®, Kyowa®” rămân doar dacă ai documentul de la furnizor.
- **E-mail tehnic:** află cine a adăugat al doilea record DMARC și includerea `amazonses.com` în SPF, înainte să le schimbi.
- **Avizare:** întreabă un jurist sau INSP dacă e-mailurile despre suplimente au nevoie de avizare prealabilă (Ordinul 1069/2007, art. 12).

**De testat o singură dată, cu adrese personale, înainte de pornire:**

- dacă pop-up-ul Shopify Forms trimite e-mailul de dublă confirmare și dacă seria de bun venit pornește cât abonatul e încă „în așteptare”;
- în ce unități e câmpul Wait (minute, ore sau zile) și ce fus orar folosește programarea campaniilor;
- dacă `abandoned_checkout.subtotal_price` vine în lei sau în bani (300 sau 30000) și ce înseamnă exact `customerHasNoOrderSinceAbandonment`;
- dacă e-mailurile 2 și 3 din checkout abandonat sunt și ele gratuite (verifici prima factură, rândul „Marketing emails”);
- dacă membrii existenți ai unui segment pornesc automatizarea „Customer joined segment” (recâștigare);
- cum arată e-mailurile în modul întunecat și în ce limbă apare textul de dezabonare din subsol;
- fiecare fragment Custom Liquid marcat „de testat”, cu un e-mail de test.
