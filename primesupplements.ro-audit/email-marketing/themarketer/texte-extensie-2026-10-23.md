# Texte pentru extensia Chrome – 23.10.2026 (planul „e-mailul la treabă”)

Două sarcini pe care theMarketer nu le permite prin API, deci se fac în aplicații, de proprietar, cu extensia. Sursa regulilor: GHID-THEMARKETER.md pașii 8 și 12, SYSTEM.md §4.7 și §8.5.

## A. Shopify – bifa de abonare la checkout (GHID pasul 8)

```text
Ești în Shopify Admin (primesupplements1.myshopify.com). Fă DOAR pașii de mai jos; nu schimba alte setări, nu crea comenzi și nu intra în checkout-ul magazinului.

1. Deschide Settings > Checkout. Caută secțiunea „Marketing options” (sau „Email marketing”). Bifează opțiunea prin care clientul poate alege la checkout să primească e-mailuri de marketing („Show a sign-up option at checkout” / „Email marketing”). Lasă NEBIFATĂ opțiunea de preselectare („Preselect the sign-up option”): bifa trebuie să fie afișată, dar nebifată implicit. Apasă Save.
2. Dacă există și opțiunea pentru SMS marketing, las-o cum e; nu o activa.
3. Schimbă textul bifei: Online Store > Themes > la tema activă apasă meniul „⋯” > „Edit default theme content”. Caută „Email me with news and offers”. Înlocuiește textul cu exact: Vreau emailurile Prime: ghidul săptămânal, noutăți și oferte (de obicei 1–2 pe săptămână). Salvează.
   Dacă nu găsești textul acolo, mergi la Settings > Languages > limba Română > caută „Email me with news and offers” (sau „Trimite-mi e-mailuri cu noutăți”) în secțiunea de checkout și schimbă-l acolo, apoi salvează.
4. La final spune-mi, în română: ce opțiuni ai bifat/debifat la Settings > Checkout, unde ai găsit textul bifei și cu ce l-ai înlocuit.
```

Verificarea o face proprietarul, pe telefon și pe desktop: pune un produs în coș, deschide checkout-ul și vede bifa nebifată, cu textul nou. Nu plasa comanda.

## B. theMarketer – fluxul „Reaprovizionare 2026” (GHID pasul 12, SYSTEM §4.7)

```text
Ești în aplicația theMarketer (app.themarketer.com), contul primesupplements.ro. Construiești fluxul de reaprovizionare pe produs. Nu porni fluxul la final: îl lași în pauză/ciornă, trimiți un test și raportezi. Nu modifica alte automatizări decât cele numite mai jos.

1. Mergi la Automation (lista de automatizări). Caută fluxurile cu numele „Remind customers to reorder”. Dacă sunt două: cel care are 0 trimiteri (Completed 0) devine fluxul nou; pe celălalt, dacă e pornit, pune-l pe pauză (el trimitea „Gata sa le cumperi din nou?” la 2 minute după comandă). Dacă e unul singur, folosește-l pe acela.
2. Redenumește fluxul ales în: Reaprovizionare 2026
3. Nodul „Start of automation” (declanșatorul): Order status = fulfilled; Run flow = Multiple times; „Enable frequency capping” = OPRIT; „Exclude contacts who have not exited this automation flow yet” = OPRIT; „Enable smart sending” = PORNIT; „Include imported contacts” = OPRIT.
4. Nodul „Time delay”: „Delay by product recurrence” = PORNIT; plus „Delay until a specific day(s) of the week” = marți, vineri și sâmbătă, ora 10:00.
5. Nodul „Filter”: condiția „Buyer in the last 14 days” → cei care îndeplinesc condiția IES din flux (nu primesc e-mailul). Restul merg la e-mail.
6. Nodul „Send email” (un singur e-mail): subiect: Îți mai ajunge ce ai comandat? ; preheader: Dacă îl iei zilnic, după doza de pe etichetă, probabil se apropie de final. ; UTM campaign: flow-reorder-e1. Conținutul, în ordine:
   - text: „Salut!”
   - text: „Produsul de mai jos l-ai comandat acum câteva săptămâni. Dacă îl iei zilnic, după doza de pe etichetă, probabil se apropie de final:”
   - blocul dinamic cu produsul de reaprovizionat (blocul șablonului „product to reorder”), fără preț tăiat (afișează doar prețul de azi)
   - buton roșu (#e91d23): „Comandă din nou”, cu linkul produsului din bloc
   - text: „Ca să nu rămâi fără, comandă cu câteva zile înainte să se termine: Cargus livrează în 1–3 zile lucrătoare. Dacă îl iei mai rar sau ai făcut pauze, probabil mai ai destul, iar acest email poate să aștepte.”
   - text îngroșat: „Livrare gratuită peste 300 de lei.” urmat de: „Dacă pui în aceeași comandă și alt produs pe care îl folosești, ajungi mai ușor la prag:”
   - blocul dinamic „Frequently Bought Together”, 3 produse (dacă șablonul îl are)
   - text: „Vrei să schimbi ceva? Altă aromă, alt gramaj sau o recomandare pentru obiectivul tău de acum: răspunde la acest email sau scrie-ne pe WhatsApp, la 0775 286 584.”
   - text: „Spor la antrenament, Marius Chera, fondator Prime Supplements”
   - subsol: datele firmei (PRIME SPORT SUPPLEMENTS SRL · CUI 46260823 · J32/1155/2022 · 0775 286 584 · contact@primesupplements.ro), linkul de dezabonare, fraza „Suplimentele alimentare nu înlocuiesc o dietă variată și echilibrată și un stil de viață sănătos. A nu se depăși doza zilnică recomandată.” și rândul „Produsele cu cafeină (ex. Combat Pro, 300 mg de cafeină pe porție) nu sunt recomandate copiilor, femeilor însărcinate sau care alăptează.”
   Fără coduri de reducere, fără cuvântul „ofertă”, fără promisiuni de sănătate.
7. Salvează fluxul fără să îl activezi (rămâne în pauză/ciornă). Apasă „Send test” pe e-mail și trimite testul la marius.chera@yahoo.com.
8. Verifică în E-commerce > Products că produsele au „Recurrence” setat (de exemplu Prime Whey 2 kg 60 de zile, Creapure 90, Creamy Rice 20). Nu modifica nimic; doar notează 3 exemple.
9. La final spune-mi, în română: numele exact al fluxului, setările de la Start și Time delay așa cum le-ai lăsat, dacă testul a plecat, și dacă ceva din listă nu a existat în editor (ex. lipsa filtrului „Buyer in the last 14 days” sau a blocului dinamic).
```

După test, proprietarul face o comandă internă cu 2 produse cu intervale diferite și o marchează „fulfilled”; a doua zi, într-o sesiune Claude: „verifică reaprovizionarea” (get_entered_automation). Abia apoi pornește fluxul.
