# Chera Coaching SRL – plan pentru site-ul de online coaching + programe de antrenament

Data: 26.10.2026. Afacere separată de Prime Supplements (altă firmă, alt site, alt magazin Shopify). Stare: plan propus, în așteptarea confirmării proprietarului. Când începe lucrul, folderul primește repo propriu.

## 0. Ce s-a cerut
- Pagină de online coaching (antrenor de culturiști de performanță) + vânzare de programe de antrenament.
- WhatsApp integrat în site: clientul care a plătit primește automat acces să scrie; proprietarul răspunde din site/aplicație și de pe telefon; dacă nu face față, un angajat intră în site și vede DOAR conversațiile clienților care au plătit.

## 1. Deciziile propuse (pe scurt)
| Ce | Propunere | De ce |
|---|---|---|
| Platformă | Shopify, magazin nou, plan Basic (~29 $/lună plătit anual, ~39 $ lunar; primele 3 luni 1 $) | administrare cunoscută, produse digitale + abonamente, aplicații de facturare RO, procesator RO |
| Firmă | Chera Coaching SRL (există) | nimic de înființat; de verificat că e activă și are CAEN-ul potrivit |
| Plăți | Netopia (contract nou pe Chera Coaching SRL; la Prime e tot Netopia) | funcționează, cunoscut; abonamentele cu reînnoire automată depind de procesator – vezi §4 |
| Facturare | Oblio (ca la Prime) prin aplicația eFacturio sau SmartBill • Integration din Shopify | e-Factura B2C automată la comandă |
| Programe | produse digitale (PDF/video), livrate automat după plată | aplicația gratuită Shopify „Digital Downloads” (sau Sky Pilot dacă vrei video în flux, contra cost) |
| Coaching | produse-pachet: „1 lună”, „3 luni”, „3 luni + check-in săptămânal” | plată o dată; reînnoirea automată doar dacă Netopia o suportă (vezi §4) |
| WhatsApp | WhatsApp Business API pe un număr dedicat al firmei + aplicație cu inbox de echipă (Respond.io sau Wati), legată de Shopify | singura variantă în care angajatul are cont propriu și vede doar ce i se dă |

## 2. Verificări cu contabilul (înainte de orice)
1. Chera Coaching SRL e activă fiscal (nu „inactiv” la ANAF), are administrator și sediu valabile.
2. CAEN: activități de antrenament/coaching sportiv (8551 „învățământ în domeniul sportiv și recreațional” și/sau 9319 „alte activități sportive”) + vânzare de conținut digital. Dacă lipsesc, se adaugă la ONRC.
3. Cont bancar activ pe firmă (Netopia virează acolo) și acces Oblio pe firmă (cont separat de Prime).
4. Plătitor sau neplătitor de TVA: schimbă prețurile afișate și facturarea. Serviciile de antrenament și produsele digitale au TVA standard (de confirmat cu contabilul).
5. e-Factura B2C: fiecare factură emisă din Oblio pleacă la ANAF; aplicația din Shopify face asta automat.

## 3. Magazinul Shopify – structura
- Domeniu: cheracoaching.ro (sau mariuschera.ro); de verificat disponibilitatea și de cumpărat de la un registrar românesc (RoTLD prin orice reseller), apoi legat de Shopify. Nu se cumpără prin Shopify (nu vinde .ro).
- Temă gratuită: Dawn sau Sense (curată, rapidă). Fără aplicații de pop-up în prima fază.
- Pagini:
  1. Acasă = pagina de vânzare: cine ești (palmares, sportivi pregătiți), pentru cine e coaching-ul, ce primește clientul, 3 pachete cu prețuri, transformări/rezultate (cu acordul sportivilor), întrebări frecvente, buton „Începe”.
  2. Programe de antrenament (colecție): fiecare program = produs digital cu descriere, pentru cine e, durată, ce conține (PDF + video), preț.
  3. Online coaching: cele 3 pachete (produse), ce include fiecare, cum funcționează (plătești → primești pe loc accesul la WhatsApp → prima discuție → planul în 48 h).
  4. Despre Marius.
  5. Rezultate (galerie, cu acordul scris al sportivilor; fără date de sănătate).
  6. Contact (formular + e-mail; numărul de WhatsApp NU apare public).
  7. Legale (obligatorii în RO): Termeni și condiții (inclusiv: coaching-ul nu înlocuiește sfatul medical; clientul declară că e apt de efort), Politica de confidențialitate (GDPR, inclusiv WhatsApp ca canal de comunicare), Politica de retur (produse digitale: fără drept de retragere după descărcare, cu bifă explicită la checkout – OUG 34/2014 art. 16 lit. m; coaching: fără retur după prima ședință/plan livrat), ANPC + SOL (insigne în footer), date firmă (CUI, J, sediu).
- Checkout: telefonul OBLIGATORIU (fără el nu merge WhatsApp), bifă „Vreau să fiu contactat pe WhatsApp la acest număr” (consimțământ), bifă renunțare la dreptul de retragere pentru digitale. Fără livrare fizică (toate produsele „nu necesită expediere”).
- Conturi de client: pornite (noi, cu cod pe e-mail); în cont clientul își vede programele descărcabile și butonul „Scrie-mi pe WhatsApp”.
- E-mailuri: confirmarea comenzii cu linkul de descărcare și butonul WhatsApp. theMarketer se poate adăuga mai târziu (cont separat de Prime).

## 4. Produse și plăți
- Programe digitale: 3–5 la lansare (ex. „Masă musculară 12 săptămâni”, „Definire 8 săptămâni”, „Pregătire de concurs 16 săptămâni”). Fișiere: PDF + linkuri video (YouTube nelistat sau Vimeo). Livrare: Digital Downloads (gratuit, Shopify) → link în e-mail + în cont; limită de descărcări setată.
- Coaching: 3 pachete ca produse separate, plată o dată (ex. 1 lună / 3 luni / 3 luni premium). Reînnoirea: la 25 de zile clientul primește pe WhatsApp (din inbox, șablon) și pe e-mail linkul de reînnoire.
- Reînnoire automată (abonament cu plata luată singură): Shopify Subscriptions e gratuit, dar merge doar cu procesatoare care suportă plăți recurente în Shopify. Netopia și PayU: de întrebat explicit la înrolare dacă suportă „subscription contracts” în Shopify. Dacă nu, rămâne plata manuală lunară (de obicei suficient la coaching de performanță, unde relația e personală).
- Prețuri: în lei, cu TVA inclus dacă firma e plătitoare. Reduceri: cod pentru clienții Prime se poate face mai târziu, separat, fără să lege cele două afaceri.

## 5. WhatsApp integrat în site (inima cererii)
### 5.1 Cum arată pentru client
1. Plătește pe site.
2. În 1–2 minute primește pe WhatsApp, de la numărul firmei, mesajul de bun venit: „Salut, [prenume]! Mulțumesc pentru [pachet]. Aici discutăm tot. Răspunde cu «Start» și spune-mi obiectivul tău.” (șablon aprobat de Meta, categoria „utility”).
3. Pe pagina de mulțumire, în e-mail și în cont apare și butonul „Scrie-mi pe WhatsApp” (link wa.me cu textul precompletat cu numărul comenzii), pentru cine preferă să scrie primul.

### 5.2 Cum arată pentru tine și angajat
- Inbox web (în aplicația de WhatsApp a magazinului, deschisă din panoul Shopify sau direct în browser) + aplicația ei de telefon. Răspunzi de oriunde; fiecare are contul lui.
- Fiecare conversație are lângă ea datele din Shopify: ce a cumpărat, când, cât mai are din pachet.
- Angajatul: cont separat, rol „Agent”, vede doar conversațiile asignate lui. Asignarea o faci tu (buton „asignează lui X”) sau automat după reguli (ex. toți clienții noi din „1 lună” → angajat; „premium” → tu).
- Cine scrie de pe un număr care nu are comandă plătită: nu apare în inbox-ul angajatului; primește un răspuns automat („Pentru coaching, comandă pe site; după plată ne auzim aici”) și conversația se închide. Numărul nu e public, deci cazurile sunt rare.

### 5.3 Ce trebuie tehnic
1. Număr dedicat al firmei: SIM/eSIM nou pe Chera Coaching SRL (Orange/Vodafone/Digi, abonament minim) sau număr virtual de la furnizorul de API. Numărul NU trebuie să fie folosit în aplicația WhatsApp obișnuită. („Coexistența” – același număr și în aplicația WhatsApp Business de pe telefon, și pe API – s-ar putea să nu fie disponibilă în UE; planul nu se bazează pe ea. De pe telefon răspunzi din aplicația furnizorului.)
2. Meta Business (business.facebook.com) pe Chera Coaching SRL, verificat cu actele firmei (CUI, certificat ONRC, site live). Durează 1–5 zile lucrătoare.
3. Furnizorul (BSP) cu inbox de echipă + integrare Shopify. Două opțiuni:
   - **Respond.io**: integrare Shopify, roluri de utilizator, automatizări (comandă plătită → etichetă „client” → șablon de bun venit → asignare), aplicație de telefon. Preț: de la ~160 $/lună (plan Growth, 1.000 de contacte active/lună, mai multe locuri) – scump pentru început; de cerut ofertă pentru 2 locuri. De verificat în pagina lor „User roles” că agentul poate fi limitat la conversațiile asignate.
   - **Wati**: Growth ~49–59 $/lună (3–5 locuri), integrare Shopify (+~5 $/lună). ATENȚIE: setarea „operatorul vede doar conversațiile asignate” e doar pe planul Business (~182–299 $/lună). Pe Growth/Pro angajatul vede toate conversațiile echipei.
   - **Varianta economică (recomandată la start): Wati Growth sau Pro cu doi utilizatori.** Toate conversațiile de pe acest număr sunt, prin construcție, clienți plătitori (numărul nu e public; neplătitorii sunt închiși automat). Angajatul vede deci numai clienți plătitori, chiar fără setarea de vizibilitate. Setarea strictă „doar cele asignate” se ia când ai mai mulți angajați sau când vrei să-ți păstrezi anumiți clienți doar pentru tine.
4. Costul Meta: mesajele-șablon trimise de firmă (bun venit, reînnoire) se plătesc per mesaj (România: ordinul a 0,03–0,05 € pentru „utility”, ~0,10 € „marketing”; de verificat în rate card-ul Meta). Răspunsurile tale în fereastra de 24 h după mesajul clientului sunt gratuite. La 50 de clienți activi: sub 10 €/lună.
5. Șabloane de aprobat la Meta (în română): bun venit după plată; memento reînnoire; „nu găsim comanda ta”; check-in săptămânal (opțional).
6. Automatizările în furnizor: (a) Shopify „order paid” → creează/actualizează contactul cu telefonul din comandă, etichete „client”, „pachet-X”, data expirării → trimite șablonul de bun venit → asignează; (b) mesaj de la număr fără etichetă „client” → răspuns automat + închidere; (c) la expirare – 5 zile → memento reînnoire.
7. GDPR: telefonul și conversațiile stau la furnizor (Respond.io/Wati – verificat că au DPA și servere în UE sau clauze standard); textul din Politica de confidențialitate; consimțământul la checkout.

## 6. Costuri lunare estimate (la lansare)
| Element | Cost |
|---|---|
| Shopify Basic | ~29–39 $ |
| Domeniu .ro | ~10 €/an |
| Facturare (eFacturio/SmartBill app) | ~15 $ |
| Digital Downloads | 0 |
| Netopia | comision pe tranzacție (~1,5–2,5 %), fără abonament |
| WhatsApp API – furnizor (Wati Growth, 2 utilizatori) | ~50–60 $ (+5 $ integrarea Shopify) |
| WhatsApp API – Meta, șabloane | sub 10 € |
| SIM firmă | ~5 €/lună |
| **Total** | **~110–140 $/lună** (cu Respond.io sau Wati Business: ~250–350 $) |

## 7. Pașii în ordine (cine, cât durează)
| # | Pas | Cine | Durată |
|---|---|---|---|
| 1 | Verificările de la §2 (firmă activă, CAEN, TVA, cont bancar, Oblio) | Marius + contabil | 1–5 zile |
| 2 | Domeniul .ro cumpărat; SIM nou pe firmă | Marius | 1 zi |
| 3 | Magazin Shopify nou pe Chera Coaching SRL (e-mail nou al firmei), plan Basic; Claude e invitat ca staff | Marius | 30 min |
| 4 | Setări magazin, temă, pagini, texte, produse, checkout, conturi de client, e-mailuri, politici (din aplicația de pe calculator, cu textele scrise împreună) | Claude | 2–3 zile de lucru |
| 5 | Înrolare Netopia pe Chera Coaching SRL (acte firmă) + întrebarea despre abonamente recurente | Marius | 3–7 zile |
| 6 | Oblio: cont pe firmă + aplicația de facturare în Shopify, factură de test | Marius (cont) + Claude (setare) | 1 zi |
| 7 | Meta Business verificat pe firmă | Marius (acte) | 1–5 zile |
| 8 | Cont la furnizorul WhatsApp (Wati sau Respond.io), număr conectat, integrare Shopify, șabloane trimise la aprobare | Marius (cont, plată) + Claude (setare, texte) | 1–2 zile + aprobarea șabloanelor (ore–2 zile) |
| 9 | Automatizările din §5.3.6 + contul angajatului + reguli de asignare | Claude | 1 zi |
| 10 | Test complet: comandă de test cu card real (sumă mică) → fișier primit → mesaj WhatsApp primit → răspuns din inbox + din telefon → angajatul vede doar ce trebuie → factura în Oblio și la ANAF | Marius + Claude | ½ zi |
| 11 | Lansare: anunț pe Instagram/TikTok, link în bio | Marius | – |

Total realist: 2–3 săptămâni, cel mai mult din așteptări (Netopia, Meta, ANAF).

## 8. Ce pot face eu din aplicația de pe calculator
- Tot ce e în panoul Shopify (după ce mă inviți ca staff în noul magazin): setări, temă, pagini, produse, politici, checkout, e-mailuri, aplicații.
- Setările din Wati/Respond.io, în browserul aplicației, după ce te autentifici o dată.
- Textele: pagina de vânzare, descrierile programelor, șabloanele WhatsApp, politicile.
- NU pot: să creez conturi/plăți în numele tău (Shopify, Netopia, Meta, furnizorul WhatsApp, Oblio), să încarc acte, să cumpăr domeniul. Acestea le faci tu; eu îți pregătesc exact ce trebuie completat.

## 9. Ce nu e în plan (deliberat)
- Aplicație de coaching cu programe în telefon, check-in-uri și poze de progres (Trainerize, Harbiz, TrueCoach): doar dacă WhatsApp nu mai ajunge.
- Legături cu Prime Supplements (clienți, e-mailuri, reduceri): afaceri separate, date separate.
- Reclame plătite: după ce primele 10 comenzi vin organic (Instagram/TikTok/YouTube).

## Surse verificate pe 26.10.2026
- Prețuri Shopify: https://www.shopify.com/pricing
- Wati – vizibilitatea conversațiilor doar pe planul Business: https://support.wati.io/en/articles/11865694-how-to-manage-chat-visibility-to-restrict-access-to-assigned-conversations
- Wati – operatori, echipe, asignare: https://support.wati.io/en/articles/15458153-understanding-operators-teams-and-chat-assignment-in-wati
- Respond.io – roluri de utilizator: https://respond.io/help/workspace-settings/users
- Meta – prețuri WhatsApp Business Platform: https://developers.facebook.com/docs/whatsapp/pricing
- Coexistență număr (app + API): https://telnyx.com/release-notes/whatsapp-coexistence
- SmartBill • Integration (Shopify): https://apps.shopify.com/smartbill-integration
- eFacturio (Shopify, e-Factura + Oblio/SmartBill): https://pickyourapp.com/products/efacturio
