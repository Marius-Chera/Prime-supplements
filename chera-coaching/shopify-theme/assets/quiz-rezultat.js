/* Chera Protocol – concluziile extinse ale evaluării (27.10.2026).
   Textele sunt scrise la persoana I, ca de la Marius; le poți rescrie aici fără să atingi logica din quiz.js.
   Principii folosite (nu apar pe site): tempo și variație la 2–3 săptămâni, testul toleranței la carbohidrați,
   ciclarea carbohidraților în săptămână, carbohidrații concentrați după antrenamentul de seară,
   ajustări mici de 10–15% pe săptămână la definire, peak week conservator, posing zilnic. */
window.CHERA_EXT = {

/* ===== PE TIPURI (natura ta) ===== */
types: {
 "1A": {
  day: ["La trezire: 500 ml apă cu un vârf de sare și lămâie.","Masa 1: 3 ouă întregi, 100 g piept de curcan sau vită, 20 g nuci, legume.","Masa 2: 200 g piept de pui, salată mare, 10 g ulei de măsline.","Înainte de antrenament: 150 g carne slabă, 60 g orez (cântărit crud), legume.","După antrenament: 40 g proteină din zer, 80 g cremă de orez.","Cina: 200 g vită sau somon, 250 g cartof, legume."],
  intro: "Ești omul pentru care sala e o competiție, chiar și când nu concurezi. Sistemul tău nervos răspunde cel mai bine la greutăți mari și la efort scurt și intens: o serie grea de 5 repetări îți dă mai multă energie decât o oră de pompare. Asta e un avantaj uriaș pentru forță și densitate musculară, dar și o capcană: dacă programul e lung, lent și repetitiv, îți pierzi cheful în trei săptămâni și începi să sari peste antrenamente. În bodybuilding, profilul tău construiește cel mai repede mușchi dens, cu condiția să nu-l îneci în volum.",
  train: [
   "Seriile de lucru stau în zona 4–8 repetări la exercițiile de bază și 8–12 la izolări. Sub 4 repetări intri pe forță pură; peste 12, te plictisești și pierzi intensitatea.",
   "Tempo controlat pe negativ (3–4 secunde) și exploziv pe pozitiv. Intenția e să arunci greutatea, chiar dacă bara urcă încet: asta recrutează fibrele rapide, care la tine cresc cel mai bine.",
   "Pauze complete între seriile grele: 2–3 minute. Dacă te grăbești, scade greutatea și pierzi exact stimulul care te face să crești.",
   "Puține serii de lucru pe grupă: 6–10 pe săptămână pentru grupele mici, 10–14 pentru cele mari. Mai mult nu înseamnă mai bine la tine; înseamnă oboseală și motivație în scădere.",
   "Schimbi exercițiile la 2–3 săptămâni (alt unghi, altă priză, alt aparat), dar păstrezi structura grea. Noutatea îți ține dopamina sus.",
   "Antrenamente scurte: 45–60 de minute. Dacă trece de o oră, ai prea mult volum sau stai prea mult pe telefon între serii.",
   "Tehnici de intensitate bine dozate: o serie grea urmată de drop set sau rest pause la ultimul exercițiu, nu la toate.",
   "La fiecare 5–6 săptămâni, o săptămână mai ușoară (jumătate din serii, aceeași greutate). Profilul tău nu simte oboseala până nu e prea târziu."
  ],
  split: ["Luni: piept și spate (greu)","Marți: picioare (greu)","Miercuri: pauză","Joi: umeri și brațe","Vineri: picioare și spate (accent pe volum moderat)","Sâmbătă: piept, umeri, brațe (pump scurt)","Duminică: pauză"],
  diet: [
   "Mic dejun cu carne sau ouă și grăsimi bune (nuci, avocado), fără carbohidrați. Ține dopamina și concentrarea sus până la prânz.",
   "Proteine 2,2–2,5 g pe kg corp, împărțite în 4–5 mese. Fiecare masă are o sursă completă de proteine.",
   "Carbohidrații îi muți spre a doua parte a zilei: masa dinainte de antrenament, cea de după și cina. Dimineața te încetinesc.",
   "Grăsimile stau mai sus decât la alte profiluri (0,9–1,1 g/kg), mai ales în zilele fără antrenament.",
   "Tolerezi bine zilele cu carbohidrați puțini. Merge la tine un model în care ai 5 zile cu carbohidrați moderați-scăzuți și 1–2 zile cu carbohidrați mulți, legate de antrenamentele cele mai grele.",
   "Cafeina înainte de antrenament funcționează excelent la tine, dar nu după ora 14 și nu în fiecare oră.",
   "Sare și apă constante, în fiecare zi aceeași cantitate. Variațiile mari de sodiu îți schimbă imaginea din oglindă și te fac să iei decizii greșite.",
   "O masă liberă pe săptămână, planificată, nu improvizată. Profilul tău rezistă la regim, dar cedează brusc dacă nu are o supapă."
  ],
  cut: ["Tai întâi din carbohidrații de dimineață și de prânz; cei din jurul antrenamentului rămân cât mai mult.","Scazi caloriile cu 10–15% o dată, apoi aștepți 7–10 zile să vezi efectul înainte de următoarea ajustare.","Greutățile rămân mari până în ultimele săptămâni. Când scad greutățile, primul semn e că tai prea repede.","Cardio scurt și intens (intervale) merge la tine mai bine decât plimbările lungi, dar maximum 3 ședințe pe săptămână."],
  bulk: ["Surplus mic: 200–300 kcal peste menținere. Profilul tău ia ușor și grăsime când mănâncă haotic.","Creșterea vine din forță: dacă după 4 săptămâni nu urci la exercițiile de bază, mai pui 150 kcal.","Carbohidrații cresc în ziua de picioare și de spate, nu uniform pe toată săptămâna.","Măsori talia o dată pe săptămână; dacă crește mai repede decât brațul, încetinești."],
  mistakes: ["Prea mult volum copiat de pe internet, de la oameni cu alt profil.","Testarea maximelor în fiecare săptămână, până la prima accidentare.","Diete prea agresive, începute în forță și abandonate după 3 săptămâni.","Prea multă cafeină ca să compensezi un somn prost."],
  mind: ["Ai nevoie de cifre: greutăți, centimetri, poze, un obiectiv cu dată.","Îți dau provocări săptămânale mici; le câștigi și rămâi motivat.","Critica directă te ambiționează, așa că îți spun lucrurilor pe nume."],
  supp: ["Creatină 3–5 g zilnic","Cafeină 100–200 mg înainte de antrenament","Omega-3 2 g","Magneziu seara, pentru că profilul tău se încarcă repede"]
 },
 "1B": {
  day: ["Masa 1: 4 ouă, 60 g fulgi de ovăz, o mână de fructe de pădure.","Masa 2: 180 g piept de pui, 70 g orez (crud), legume.","Cu 60–90 de minute înainte de antrenament: 150 g curcan, 2 felii de pâine, o banană.","În timpul antrenamentului: apă cu electroliți.","După antrenament: 40 g proteină din zer, 80 g cremă de orez, un fruct.","Cina: 200 g pește, 200 g cartof dulce, salată."],
  intro: "Ești un atlet înainte să fii un culturist: rapid, coordonat, cu o capacitate rară de a învăța mișcări noi din prima. Sistemul tău nervos e construit pentru viteză și explozie, iar asta înseamnă că răspunzi excelent la variație și la mișcări atletice, dar te stinge rutina. Dacă vrei să construiești fizic de culturist, nu te forțez în serii lungi și lente; folosesc explozia ca motor și adaug volumul treptat, ca să crească mușchiul fără să-ți omor plăcerea de a te antrena.",
  train: [
   "Începi fiecare antrenament cu o mișcare explozivă (aruncări cu mingea medicinală, sărituri, împins exploziv) 3–4 serii scurte. Îți pornește sistemul nervos și ridică performanța la tot ce urmează.",
   "Exercițiile de bază în 3–8 repetări, cu intenție maximă de viteză pe pozitiv.",
   "Izolările în 8–12 repetări, cu tempo controlat, ca să adaugi volumul de care are nevoie hipertrofia.",
   "Schimbi exercițiile des (la fiecare 2 săptămâni), dar păstrezi aceeași logică a zilei. Varietatea e motivația ta.",
   "Volum moderat: 10–14 serii de lucru pe grupele mari pe săptămână. Antrenamente de 50–60 de minute.",
   "Superseriile între grupe opuse (piept-spate, biceps-triceps) îți păstrează ritmul alert fără să scadă calitatea seriilor.",
   "Cardio sub formă de sprinturi sau sport, nu bandă. 2 ședințe pe săptămână, 15–20 de minute.",
   "Lucrezi mobilitate 10 minute la fiecare antrenament: la profilul tău, articulațiile sunt limita, nu mușchii."
  ],
  split: ["Luni: partea de sus (forță + explozie)","Marți: partea de jos (forță + sărituri)","Miercuri: pauză sau sport","Joi: partea de sus (hipertrofie)","Vineri: partea de jos (hipertrofie)","Sâmbătă: brațe, umeri, abdomen (scurt)","Duminică: pauză"],
  diet: [
   "Carbohidrați moderați, mai mulți în zilele grele și mai puțini în zilele libere. Ciclarea pe zile funcționează foarte bine la tine.",
   "Proteine 2–2,2 g pe kg corp, constante în fiecare zi.",
   "Masa de dinainte de antrenament contează enorm: proteine plus carbohidrați ușor de digerat, cu 60–90 de minute înainte.",
   "După antrenament: proteine și carbohidrați rapizi (orez, cremă de orez, fructe). Recuperarea ta depinde de fereastra asta.",
   "Grăsimi moderate (0,8–1 g/kg), mai multe în zilele fără antrenament.",
   "Mic dejun cu proteine și o porție mică de carbohidrați; nu tolerezi la fel de bine ca alții dimineața complet fără carbohidrați.",
   "Hidratare atentă: transpiri mult și pierzi electroliți. Apă cu puțină sare în timpul antrenamentului.",
   "Mese la ore apropiate în fiecare zi, ca să nu ajungi la antrenament fără energie."
  ],
  cut: ["Păstrezi carbohidrații în jurul antrenamentului și tai din restul zilei.","Ziua cu carbohidrați mulți rămâne o dată pe săptămână, legată de antrenamentul de picioare.","Ajustezi caloriile cu 10% pe rând, la 7–10 zile.","Sprinturile și sportul rămân cardio-ul principal; plimbările lungi le adaugi doar spre final."],
  bulk: ["Surplus de 250–350 kcal; arzi mult prin mișcare și te usuci ușor dacă mănânci puțin.","Crești carbohidrații întâi, nu grăsimile.","Volumul crește treptat: o serie în plus pe grupă la fiecare 3 săptămâni.","Urmărești forța și performanța atletică; dacă scad, ai crescut prea repede în volum."],
  mistakes: ["Rutina de culturist cu 20 de serii pe grupă care te plictisește în două săptămâni.","Lipsa mobilității, până când un umăr sau un genunchi spune stop.","Antrenament pe stomacul gol, cu performanță scăzută.","Prea mult sport în afara sălii fără ajustarea mâncării."],
  mind: ["Ai nevoie de joc și de provocare, nu de corvoadă.","Îți dau obiective de performanță (sărituri, viteză, repetări) pe lângă cele de aspect.","Varietatea programată de mine e mai bună decât improvizația ta."],
  supp: ["Creatină 3–5 g zilnic","Electroliți în timpul antrenamentului","Omega-3 2 g","Beta-alanină 3 g pentru seriile mai lungi"]
 },
 "2A": {
  day: ["Masa 1: 3 ouă întregi, 2 albușuri, 50 g fulgi de ovăz.","Masa 2: 180 g piept de pui, 60 g orez (crud), legume.","Masa 3: 200 g iaurt grecesc, 20 g nuci, fructe.","Înainte de antrenament: 150 g curcan, 60 g orez.","După antrenament: 40 g proteină din zer, o banană.","Cina: 200 g somon, 200 g cartof, legume."],
  intro: "Ești cameleonul: răspunzi la aproape orice stil de antrenament, înveți repede și te adaptezi ușor. E cel mai flexibil profil pentru bodybuilding, pentru că poți folosi toată trusa de unelte: forță, pump, tempo, tehnici de intensitate. Pericolul tău nu e că nu crești, ci că schimbi direcția prea des și faci prea mult. Ai entuziasm mare, iar entuziasmul fără structură se termină în supraantrenament sau în salturi de la un program la altul fără să termini vreunul.",
  train: [
   "Repetări între 6 și 15, alternate pe blocuri: 3 săptămâni mai grele (6–8), 3 săptămâni de volum (10–15).",
   "Variezi metoda la 2–3 săptămâni: tempo, superserii, drop set, rest pause, serii lungi. Varietatea te ține prezent.",
   "Tempo diferit pe exerciții: negativ lent la izolări, exploziv la bazele grele.",
   "Volum moderat-mare: 12–16 serii de lucru pe grupele mari pe săptămână, dar plafonul îl pun eu, nu entuziasmul tău.",
   "Fiecare grupă de 2 ori pe săptămână. Răspunzi bine la frecvență.",
   "Antrenamente de 60–70 de minute; dacă ai energie să mai faci, păstrezi pentru data viitoare.",
   "Ultimul exercițiu al grupei e de pompare: serii lungi, pauze scurte, conexiune maximă cu mușchiul.",
   "O săptămână mai ușoară la 6 săptămâni, obligatoriu. Tu nu o ceri, dar corpul tău o folosește."
  ],
  split: ["Luni: piept și spate","Marți: picioare","Miercuri: umeri și brațe","Joi: pauză","Vineri: piept și spate (alt stil)","Sâmbătă: picioare și umeri","Duminică: pauză"],
  diet: [
   "Carbohidrați moderați, distribuiți uniform în 4–5 mese. Nu ai nevoie de extreme.",
   "Proteine 2–2,2 g pe kg corp.",
   "Ouă întregi zilnic: gălbenușul e cea mai bună sursă alimentară de colină, iar profilul tău o folosește din plin.",
   "Grăsimi din pește gras de 2–3 ori pe săptămână.",
   "Mese la ore regulate; tendința ta e să sari peste mese când ești prins în altceva.",
   "Când crește stresul, crești ușor carbohidrații, nu cafeaua.",
   "Funcționează bine la tine o zi cu carbohidrați mai mulți la 5–7 zile pe definire, pentru energie și plinătate.",
   "Planifici mâncarea pe 2–3 zile înainte; improvizația te duce la mese sărite și gustări întâmplătoare."
  ],
  cut: ["Scazi întâi grăsimile, apoi carbohidrații, câte 10–15% o dată.","Păstrezi varietatea antrenamentului, scazi ușor volumul spre final.","Cardio moderat dimineața sau după antrenament, 20–30 de minute.","Ziua cu mai mulți carbohidrați rămâne, ca să ai antrenamente bune."],
  bulk: ["Surplus de 200–300 kcal, crescut treptat.","Crești și frecvența: aici funcționează 5 zile pe săptămână.","Urmărești talia și pozele din 2 în 2 săptămâni.","Nu schimbi programul înainte de 6 săptămâni, chiar dacă vezi altul mai interesant."],
  mistakes: ["Program nou în fiecare lună, fără să termini niciunul.","Prea multe tehnici de intensitate în același antrenament.","Mese sărite în zilele aglomerate.","Lipsa săptămânilor mai ușoare."],
  mind: ["Ai nevoie de noutate controlată: o schimbare planificată, nu zece improvizate.","Îți explic de ce facem fiecare bloc, ca să nu cauți altceva.","Te țin în frâu când ai prea multă energie."],
  supp: ["Creatină 3–5 g zilnic","Omega-3 cu DHA 2 g","Colină (citicolină) dacă ai zile lungi la birou","Magneziu seara"]
 },
 "2B": {
  day: ["Masa 1: 3 ouă, o felie de pâine integrală, jumătate de avocado.","Masa 2: 180 g piept de pui, 60 g orez (crud), legume.","Masa 3: 200 g brânză cottage, fructe.","După antrenament: 40 g proteină din zer, 80 g cremă de orez.","Cina: 200 g pește alb sau curcan, 300 g cartof, legume.","Seara târziu, dacă ai poftă: 150 g iaurt cu o linguriță de cacao."],
  intro: "Ești artistul: simți mușchiul, simți mâncarea, simți fiecare cuvânt. În bodybuilding, ăsta e un dar: conexiunea minte-mușchi, care altora le ia ani, la tine vine natural. Răspunzi foarte bine la pump, la tempo controlat și la volum moderat. Dar ești și sensibil la stres, la critică și la dietele agresive. Dacă te forțez cu greutăți maxime și cu diete brutale, îți pierzi cheful și somnul. Dacă te susțin și îți dau o structură clară, ești cel mai constant om din sală.",
  train: [
   "Repetări 8–15, cu tempo controlat (3 secunde pe negativ, pauză scurtă în contracție).",
   "Conexiunea cu mușchiul e prioritară: alegi greutatea pe care o simți în mușchiul țintă, nu greutatea maximă.",
   "Drop set, rest pause și serii lungi de pompare funcționează excelent la tine.",
   "Puține zile cu greutăți foarte mari: o dată pe săptămână pe grupă, la un singur exercițiu.",
   "Volum moderat: 10–14 serii de lucru pe grupele mari pe săptămână.",
   "Pauze de 60–90 de secunde la izolări, 2 minute la exercițiile compuse.",
   "Antrenamente calme, fără grabă și fără haos: muzică bună, plan scris, fără improvizații.",
   "Cardio liniștit (plimbare în pantă, bicicletă) te ajută și la recuperare, nu doar la ardere."
  ],
  split: ["Luni: picioare (accent cvadriceps)","Marți: piept și triceps","Miercuri: pauză","Joi: spate și biceps","Vineri: picioare (accent femural, fesieri)","Sâmbătă: umeri și brațe","Duminică: pauză"],
  diet: [
   "Carbohidrați moderat-mari, concentrați după antrenament și la cină. Te calmează și îți îmbunătățesc somnul.",
   "Proteine constante la fiecare masă (30–40 g).",
   "Fără diete agresive: la tine, un deficit mare strică întâi somnul, apoi dispoziția, apoi aderența.",
   "Grăsimi moderate, din surse bune: ulei de măsline, nuci, pește.",
   "Masa de seară cu carbohidrați complecși (orez, cartof, ovăz) e parte din plan, nu o greșeală.",
   "Magneziu din alimente: verdețuri, cacao, semințe.",
   "Cafeina doar dimineața; după-amiaza îți strică somnul mai mult decât altora.",
   "Mâncarea trebuie să-ți placă. Varietatea alimentelor te ajută să rămâi pe plan."
  ],
  cut: ["Deficit mic: 300–400 kcal, cu răbdare.","Tai întâi grăsimile, carbohidrații de seară îi păstrezi cât mai mult.","O zi cu carbohidrați mai mulți la 7 zile, ca să ai liniște și antrenamente bune.","Cardio liniștit, plimbare zilnică, nu intervale epuizante."],
  bulk: ["Surplus de 200–300 kcal, constant.","Pump-ul și volumul cresc treptat.","Progresul îl urmărești în poze și centimetri, nu doar pe bară.","Somnul rămâne la 7–8 ore; e motorul tău de creștere."],
  mistakes: ["Diete prea dure, care strică somnul și dispoziția.","Antrenament pe greutăți maxime copiat de la alții.","Prea multă cafeină ca să compensezi oboseala.","Să te compari cu alții și să renunți după o critică."],
  mind: ["Ai nevoie de feedback constant și de încurajare.","Îți arăt progresul în poze, pentru că oglinda te minte în zilele proaste.","Când ești stresat, ajustăm planul, nu renunțăm la el."],
  supp: ["Magneziu bisglicinat seara","L-teanină pentru zilele tensionate","Omega-3 2 g","Creatină 3–5 g zilnic"]
 },
 "3": {
  day: ["08:00 · 60 g fulgi de ovăz, 30 g proteină din zer, o banană.","11:00 · 180 g piept de pui, 70 g orez (crud), legume.","14:00 · 200 g vită slabă, 250 g cartof, salată.","17:30 · 200 g iaurt grecesc, fructe.","19:30 (după antrenament) · 180 g curcan, 80 g orez, legume.","21:30 · 200 g brânză cottage."],
  intro: "Ești strategul: analitic, perfecționist, cu nevoie de control și de rutină. În bodybuilding asta e o armă: urmezi planul exact, cântărești mâncarea, notezi tot. Progresezi cel mai bine pe programe stabile, lungi, cu progresie mică și previzibilă. Haosul te scoate din ritm: schimbările neanunțate, dietele extreme și antrenamentele improvizate îți strică liniștea și, odată cu ea, rezultatele. Profilul tău are nevoie de carbohidrați și de somn bun mai mult decât celelalte.",
  train: [
   "Același program 8–12 săptămâni, cu progresie mică și clară: o repetare sau 1–2,5 kg în plus când ajungi la capătul intervalului.",
   "Repetări 8–12, tempo controlat, executie perfectă.",
   "Pauze mai lungi: 2–3 minute la compuse, 90 de secunde la izolări.",
   "Volum moderat: 10–14 serii de lucru pe grupele mari pe săptămână.",
   "Fără tehnici de intensitate la fiecare exercițiu; una pe antrenament, la final.",
   "Antrenamente la aceeași oră, în aceeași ordine. Rutina e combustibilul tău.",
   "Notezi tot în jurnal: greutate, repetări, cum te-ai simțit.",
   "Orice schimbare de program o anunț dinainte și o explic. Tu ai nevoie să înțelegi de ce."
  ],
  split: ["Luni: piept și triceps","Marți: spate și biceps","Miercuri: pauză","Joi: picioare","Vineri: umeri și brațe","Sâmbătă: pauză sau cardio liniștit","Duminică: pauză"],
  diet: [
   "Carbohidrați mai mari decât la alte profiluri, inclusiv la cină. Te calmează și îți susțin somnul.",
   "Proteine 2 g pe kg corp, la ore fixe.",
   "Mese la aceleași ore în fiecare zi. Corpul tău iubește previzibilul.",
   "Fără low-carb extrem și fără post prelungit: îți strică dispoziția și somnul.",
   "Surse de triptofan zilnic: ouă, lactate, curcan, ovăz, banane.",
   "Schimbări mici, una pe săptămână, explicate.",
   "Planul alimentar scris, cu variante de schimb pentru fiecare masă, ca să nu ai incertitudini.",
   "Masa liberă planificată, la aceeași oră din săptămână."
  ],
  cut: ["Deficit moderat, constant, fără salturi.","Scazi caloriile cu 10% la 10–14 zile, în funcție de cântar și poze.","Carbohidrații de seară rămân până aproape de final.","Cardio liniștit, la aceeași oră, aceeași durată."],
  bulk: ["Surplus de 200–250 kcal, crescut lent.","Progresia pe bară o vezi în jurnal, săptămână de săptămână.","Fără schimbări de program la mijlocul blocului.","Măsurători la 2 săptămâni, în aceleași condiții."],
  mistakes: ["Paralizie prin analiză: cauți programul perfect în loc să-l faci pe cel bun.","Diete low-carb copiate, care îți strică somnul și dispoziția.","Prea multe schimbări, din teama că nu e destul.","Antrenament până la epuizare totală la fiecare serie."],
  mind: ["Ai nevoie de explicații și de un plan clar.","Îți dau cifre și criterii: când crești, când scazi, de ce.","Liniștea ta e parte din progres; nu te grăbesc."],
  supp: ["Vitamina D3 cu K2","Omega-3 2 g","Magneziu bisglicinat seara","Creatină 3–5 g zilnic"]
 }
},

/* ===== PE DEZECHILIBRU (ce e pe minus acum) ===== */
deficit: {
 D: { why: "Dopamina scăzută se vede la sală ca lipsă de chef, antrenamente amânate, greutăți care nu mai urcă și pofte de dulce sau stimulente după-amiaza. La cei care țin diete lungi, e aproape regula: deficitul caloric, somnul puțin și cafeaua multă o consumă. Nu o reparăm cu mai multă cafea, ci cu proteine dimineața, lumină, obiective scurte și antrenamente mai scurte și mai grele pentru o perioadă.",
   train: ["Scurtăm antrenamentele la 45 de minute și scădem volumul cu o treime pentru 3–4 săptămâni.","Prioritate pe exercițiile grele, 4–6 repetări, unde vezi progres rapid.","Un record mic pe săptămână, notat: victoriile mici refac motivația.","Cardio scurt, de intensitate mare, în loc de sesiuni lungi."] },
 A: { why: "Acetilcolina scăzută se vede ca ceață mentală, coordonare mai slabă, tehnică care se strică, uitare. La sportivi apare des pe diete foarte sărace în grăsimi sau fără ouă și pește. Mușchiul se contractă prin acetilcolină, așa că o simți și în conexiunea minte-mușchi: greutăți care nu se mai simt unde trebuie.",
   train: ["Exerciții cu tehnică simplă, la aparate, pentru câteva săptămâni.","Tempo controlat și pauză în contracție, ca să refaci conexiunea cu mușchiul.","Fără multitasking în sală: un exercițiu, o serie, atenție completă.","5 minute de exerciții de coordonare la început (mingi, echilibru)."] },
 G: { why: "GABA scăzut se vede ca tensiune, somn prost, iritabilitate și mușchi încordați. La sportivi vine din stimulente, deficit caloric mare, antrenamente seara târziu și stres. Fără somn bun nu există recuperare și nici creștere musculară, așa că prima prioritate e să te liniștim, nu să te antrenăm mai mult.",
   train: ["Antrenamentele nu mai târziu de ora 20.","Scădem tehnicile de intensitate (drop set, rest pause) la jumătate pentru 3–4 săptămâni.","Pre-workout fără stimulente sau cu doză mică.","10 minute de stretching și respirație lentă la final."] },
 S: { why: "Serotonina scăzută se vede ca dispoziție mai jos, pofte mari de carbohidrați seara, somn întrerupt dimineața devreme și lipsă de plăcere. Apare des la dietele low-carb lungi și pe sezonul rece. La definire, e motivul pentru care mulți cedează la dulce seara: nu e lipsă de voință, e chimie.",
   train: ["3–4 antrenamente moderate, nu epuizante, pentru câteva săptămâni.","Lumină naturală: plimbare sau cardio afară dimineața.","Antrenament cu un partener sau în grup, dacă se poate.","Fără două zile grele la rând."] }
},

/* ===== PE OBIECTIV ===== */
goals: {
 scena: { title: "Ce înseamnă profilul tău pentru scenă", items: [
  "Pregătirea începe de la data concursului înapoi: 16–24 de săptămâni de definire, în funcție de cât de departe ești. Alegem competiția după ce văd pozele, nu după calendar.",
  "Scăderea în greutate ținta e 0,5–1% din greutatea corporală pe săptămână. Mai repede pierzi mușchi; mai încet nu mai ajungi la timp.",
  "Ajustările se fac o dată pe săptămână, pe baza pozelor, a cântarului de dimineață (media pe 7 zile) și a check-in-ului. Niciodată din senzații.",
  "Posingul începe din prima săptămână, 15–20 de minute zilnic, nu cu o lună înainte. Pozele obligatorii se lucrează la fel de serios ca antrenamentul.",
  "Peak week-ul meu e conservator: fără apă tăiată, fără sare scoasă, fără nimic nou. Forma se construiește în lunile de dinainte, nu în ultimele 7 zile.",
  "După concurs urmează 4–8 săptămâni de revenire controlată, ca să nu pierzi tot ce ai construit în trei săptămâni de mâncat haotic."
 ]},
 sportiv: { title: "Ce înseamnă profilul tău pentru un fizic de sportiv", items: [
  "Ținta e să arăți ca un sportiv tot anul: talie mică, umeri și spate lați, mușchi vizibili, fără să trăiești ca în pregătire de concurs.",
  "Alternăm blocuri de 8–12 săptămâni de construcție (surplus mic) cu blocuri de 6–10 săptămâni de definire ușoară.",
  "Prioritatea vizuală e forma în V: spate lat, deltoid lateral, piept superior. Acolo pun mai mult volum.",
  "Măsurăm talia, brațul, coapsa și pozele la 2 săptămâni; cântarul singur te minte.",
  "Mâncarea e flexibilă, cu 80–90% alimente de bază și restul cum îți place. Așa rezistă pe termen lung.",
  "Somnul și pașii zilnici (8.000–10.000) contează cât un antrenament în plus."
 ]},
 start: { title: "Ce înseamnă profilul tău dacă începi sau reiei", items: [
  "Primele 4 săptămâni sunt pentru tehnică și obicei, nu pentru greutăți maxime.",
  "3–4 antrenamente pe săptămână, full body sau sus/jos, 45–60 de minute.",
  "Progresezi cel mai repede acum: aproape orice program făcut constant funcționează. Constanța bate perfecțiunea.",
  "Mâncarea: proteine la fiecare masă, legume, carbohidrați după antrenament, apă. Atât, la început.",
  "Măsori talia și faci poze din prima zi; peste 3 luni o să-ți mulțumești.",
  "Când vrei ajustări pe tine, treci la coaching cu prețul programului dedus."
 ]}
},

/* ===== PENTRU TOȚI ===== */
start4: [
 "Săptămâna 1: faci programul așa cum e scris, notezi greutățile și îți cântărești mâncarea 7 zile. Fără schimbări. Vreau să văd de unde pornim.",
 "Săptămâna 2: corectăm dieta pe profilul tău (unde stau carbohidrații, câte proteine, ce mănânci dimineața) și ajustăm suplimentele dacă e cazul.",
 "Săptămâna 3: urcăm intensitatea la exercițiile de bază și introducem tehnica de intensitate potrivită profilului tău.",
 "Săptămâna 4: primul check-in serios cu poze comparative, măsurători și cântar mediu. De aici decidem direcția: construcție sau definire."
],
dayNote: "Exemplu pentru un bărbat de aproximativ 80 kg, zi de antrenament. Cantitățile ți le calculez pe greutatea, obiectivul și testul tău de toleranță la carbohidrați; ce rămâne la fel e unde stau proteinele, carbohidrații și grăsimile în zi.",
carbtest: "Testul toleranței la carbohidrați: timp de 7–10 zile mănânci aceleași calorii, dar cu carbohidrați scăzuți (sub 1 g/kg) în primele 5 zile și ridicați (4–5 g/kg) în ultimele 2. Dacă în zilele cu carbohidrați te simți plin, puternic și uscat a doua zi, îi tolerezi bine și îi folosim mai mult. Dacă te simți umflat, somnoros și plat, îi ținem mai jos și îi concentrăm după antrenament. E cel mai simplu test pe care îl fac cu fiecare client nou."
};
