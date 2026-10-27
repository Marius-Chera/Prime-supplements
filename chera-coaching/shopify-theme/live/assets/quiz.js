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

/* Chera Protocol – a doua extindere a concluziilor (27.10.2026, cererea proprietarului: de 5 ori mai mult
   în cardurile „Cum ești / Cum te antrenezi / Cum mănânci” și suplimente mult mai detaliate).
   Persoana I, fără nume de autori. Se încarcă după quiz-rezultat.js. Format supliment: {n: nume, d: doză, t: când, w: de ce}. */
Object.assign(window.CHERA_EXT, {

/* ===== completări pe tipuri: cum ești, cum te antrenezi, cum mănânci, stack-ul de suplimente ===== */
more: {
 "1A": {
  who: [
   "Ai toleranță mare la stres și la stimulente; te simți cel mai bine sub presiune, dar ai nevoie de victorii rapide ca să rămâi implicat.",
   "Sistemul tău nervos se recuperează repede după efort scurt și greu, dar se consumă la efort lung și monoton.",
   "Ești dominant în grup: îți place să conduci și să fii cel mai puternic din sală.",
   "Corpul tău tinde spre densitate și forță mai mult decât spre volum; mușchii tăi cresc din tensiune mare, nu din pompare.",
   "Te plictisesc detaliile; preferi un plan simplu, clar, cu ținte măsurabile.",
   "Sari ușor peste încălzire și peste săptămânile ușoare, iar de aici vin aproape toate accidentările la profilul tău."
  ],
  train: [
   "La exercițiul principal al zilei lucrezi cu 80–90% din maxim: 4–6 serii de 3–5 repetări, apoi treci la volum moderat pentru restul antrenamentului.",
   "Folosește serii în val: 5-3-1, apoi încă o dată 5-3-1 cu puțin mai mult. A doua undă iese aproape mereu mai puternică decât prima.",
   "Fiecare grupă de 2 ori pe săptămână cu volum mic e mai bine pentru tine decât o dată pe săptămână cu volum mare.",
   "Înainte de seriile grele, 2–3 sărituri sau o aruncare cu mingea medicinală: îți pornesc sistemul nervos și cresc forța din prima serie.",
   "Stimulentele merg la tine, dar păstrează o zi pe săptămână fără cafeină, ca să nu-ți crească toleranța."
  ],
  diet: [
   "Poți folosi o fereastră de mâncat mai scurtă (10–12 ore) fără probleme, cât timp proteinele rămân la țintă.",
   "În zilele de pauză carbohidrații scad cu 30–50%; grăsimile urcă puțin ca să rămână caloriile.",
   "Mâncare simplă și repetitivă: aceleași 4–5 mese de bază, ca să nu pierzi timp și energie gândindu-te la ele."
  ],
  stack: [
   {n:"Creatină monohidrat", d:"5 g", t:"zilnic, oricând, inclusiv în zilele de pauză", w:"Forță, densitate musculară și recuperare între seriile grele. Cel mai studiat supliment din sport; pentru profilul tău e baza."},
   {n:"Cafeină", d:"3 mg/kg corp (200–300 mg la 80 kg)", t:"cu 30–45 de minute înainte de antrenament, nu după ora 14", w:"Crește forța și puterea pe seriile scurte. O zi pe săptămână fără, ca să rămână eficientă."},
   {n:"L-tirozină", d:"500–1.000 mg", t:"înainte de antrenamentele cele mai grele sau în zilele cu somn puțin", w:"Susține dopamina când stresul și oboseala o consumă; păstrează motivația în blocurile grele."},
   {n:"Omega-3 (EPA + DHA)", d:"2–3 g", t:"la mese", w:"Articulații și tendoane solicitate de greutățile mari, inflamație mai mică între antrenamente."},
   {n:"Magneziu bisglicinat", d:"300–400 mg", t:"seara", w:"Profilul tău se încarcă repede ziua; magneziul te ajută să cobori seara și să dormi adânc."},
   {n:"Vitamina D3 + K2", d:"2.000–4.000 UI + 100 µg", t:"dimineața, cu o masă cu grăsimi", w:"Forță, testosteron în limite normale, imunitate. Doza o ajustăm după analiza 25-OH vitamina D."},
   {n:"Rhodiola rosea (3% rosavine)", d:"200–400 mg", t:"dimineața, în blocurile grele de 6–8 săptămâni", w:"Adaptogen pentru oboseala de la volum și stres; o folosești în cicluri, cu 2 săptămâni pauză."}
  ]
 },
 "1B": {
  who: [
   "Ai cel mai rapid sistem nervos dintre toate profilurile: reacționezi, înveți și te plictisești repede.",
   "Ai nevoie de noutate și de joc; rutina îți scade motivația mai repede decât oboseala.",
   "Corpul tău e de obicei atletic, cu talie mică și articulații elastice, dar mai puțin rezistente la volum mare.",
   "Ești bun la mișcări complexe și explozive; la izolările lente te pierzi.",
   "Faci ușor prea multe sporturi deodată și nu mănânci destul pentru tot ce faci.",
   "Te motivează performanța: cât de sus sari, cât de repede alergi, cât ridici, nu doar cum arăți."
  ],
  train: [
   "Antrenament de contrast: o serie grea de 3–5 repetări urmată imediat de o mișcare explozivă pentru aceeași grupă (genuflexiune, apoi săritură; împins, apoi aruncare).",
   "Seturi cluster: 5 × 2 repetări grele cu 15 secunde pauză între ele, pentru forță fără oboseală acumulată.",
   "Schimbi complet exercițiile la 2 săptămâni; păstrezi doar mișcarea de bază ca reper de progres.",
   "Izolările le faci puține, dar în ritm alert, nu lente și lungi.",
   "Antrenamentele de dimineață sau de prânz îți merg cel mai bine, când sistemul nervos e proaspăt."
  ],
  diet: [
   "Gustare cu carbohidrați rapizi dacă ai sport sau al doilea antrenament în aceeași zi.",
   "Fructele și orezul stau în jurul antrenamentului; leguminoasele și fibrele multe, departe de el.",
   "Nu sari peste micul dejun: performanța ta depinde de rezerva de glicogen."
  ],
  stack: [
   {n:"Creatină monohidrat", d:"5 g", t:"zilnic", w:"Putere pe eforturile scurte și explozive; recuperare între sprinturi și serii."},
   {n:"Beta-alanină", d:"3,2 g pe zi, împărțit în 2–4 prize", t:"zilnic, cu mesele", w:"Tamponează aciditatea din mușchi la eforturile de 30 de secunde – 4 minute. Furnicăturile sunt normale și dispar dacă împarți doza."},
   {n:"Electroliți", d:"500–1.000 mg sodiu pe litru", t:"în timpul antrenamentului și al sportului", w:"Transpiri mult; fără electroliți scade performanța și apar crampele."},
   {n:"Colagen + vitamina C", d:"10–15 g colagen + 50 mg vitamina C", t:"cu 30–60 de minute înainte de antrenament", w:"Sprijin pentru tendoane și ligamente, punctul tău slab la volum și sărituri."},
   {n:"Cafeină", d:"2–3 mg/kg corp", t:"înainte de antrenament", w:"Viteză de reacție și putere; nu ai nevoie de doze mari."},
   {n:"Omega-3", d:"2 g EPA + DHA", t:"la mese", w:"Recuperare articulară și inflamație mai mică."},
   {n:"Carbohidrați intra (ciclodextrină sau maltodextrină)", d:"25–40 g", t:"în timpul antrenamentelor de peste 75 de minute", w:"Păstrează intensitatea până la final, fără să cazi la jumătatea antrenamentului."}
  ]
 },
 "2A": {
  who: [
   "Ești echilibrat între forță și volum: nu ai o slăbiciune clară, dar nici un avantaj extrem.",
   "Te adaptezi social; în sală vorbești cu toată lumea și îți place să fii apreciat.",
   "Ai nevoie de varietate, dar nu de haos: schimbare planificată.",
   "Corpul tău răspunde bine la aproape orice metodă 3–4 săptămâni, apoi se adaptează și stagnezi dacă nu schimbi ceva.",
   "Ești sensibil la recunoaștere: un compliment sau o poză bună te motivează o săptămână întreagă.",
   "Riști să te împrăștii: prea multe obiective deodată și niciunul dus la capăt."
  ],
  train: [
   "Blocuri de 3 săptămâni de tensiune (6–8 repetări, tempo controlat), urmate de 3 săptămâni de volum metabolic (12–15 repetări, pauze scurte).",
   "Fiecare grupă din trei unghiuri: un exercițiu compus greu, unul în stretch, unul în contracție maximă.",
   "Superserii între grupe antagoniste, ca să faci mai mult în mai puțin timp fără să scadă calitatea.",
   "Notezi cum te simți după fiecare metodă: la tine contează ce îți place, pentru că atunci ești constant.",
   "Nu treci de 4 tehnici de intensitate pe săptămână pe aceeași grupă."
  ],
  diet: [
   "Raport de pornire: aproximativ 40% carbohidrați, 30% proteine, 30% grăsimi, ajustat după testul de toleranță.",
   "Variezi sursele: rotești carnea, peștele și carbohidrații ca să nu te plictisești de plan.",
   "Cina cu carbohidrați moderați dacă ai dormit prost noaptea trecută."
  ],
  stack: [
   {n:"Creatină monohidrat", d:"5 g", t:"zilnic", w:"Forță și volum; te ajută să duci blocurile de tensiune cu greutăți mai mari."},
   {n:"Proteină din zer (izolat)", d:"30–40 g", t:"după antrenament sau când nu atingi proteinele din mâncare", w:"Comoditate, nu magie: te ajută să ajungi zilnic la țintă."},
   {n:"Omega-3 cu DHA mare", d:"2 g (cel puțin 1 g DHA)", t:"la mese", w:"Concentrare și recuperare; profilul tău folosește mult acetilcolina, iar DHA susține membranele neuronale."},
   {n:"Citicolină", d:"250 mg", t:"dimineața, în zilele cu mult lucru mental", w:"Concentrare și conexiune minte-mușchi în zilele aglomerate."},
   {n:"Magneziu bisglicinat", d:"300 mg", t:"seara", w:"Somn și recuperare; nu lași entuziasmul de ziua să-ți strice noaptea."},
   {n:"Vitamina D3 + K2", d:"2.000 UI + 100 µg", t:"dimineața", w:"Bază pentru imunitate, oase și forță."},
   {n:"Multivitamine și minerale", d:"1 doză", t:"dimineața, cu mâncare", w:"Pe definire, când mănânci mai puțin și mai monoton."}
  ]
 },
 "2B": {
  who: [
   "Sistemul tău nervos e sensibil la stres și la cortizol: stresul de acasă sau de la muncă se vede imediat în sală și în oglindă.",
   "Ai nevoie de relație cu antrenorul; un plan trimis fără explicații nu funcționează la tine.",
   "Mușchii tăi răspund foarte bine la tensiune controlată și la pump; greutățile maxime te stresează mai mult decât te ajută.",
   "Ești atent la detalii și observi schimbări mici în corp înaintea altora.",
   "Când ești stresat, mănânci emoțional, mai ales seara.",
   "Îți merge cel mai bine când antrenamentul e un moment de liniște, nu încă o sursă de presiune."
  ],
  train: [
   "Exercițiile de bază în 6–8 repetări cu tempo lent, nu în 3–5: tensiunea vine din control, nu din greutatea maximă.",
   "Pre-oboseală: un exercițiu de izolare înaintea celui compus, ca să simți mușchiul țintă și să folosești greutate mai mică.",
   "Serii de 30–45 de secunde sub tensiune; numeri secundele, nu doar repetările.",
   "Eviți testele de maximă și antrenamentele haotice, grăbite: te încarcă de cortizol.",
   "Pauze de 90 de secunde: destul să-ți revii, nu atât cât să te răcești."
  ],
  diet: [
   "În offseason carbohidrați la fiecare masă principală; pe definire îi păstrezi dimineața (puțini), după antrenament și seara.",
   "O gustare cu carbohidrați și proteine înainte de culcare dacă te trezești noaptea.",
   "Cafeaua niciodată pe stomacul gol; o bei după micul dejun."
  ],
  stack: [
   {n:"Magneziu bisglicinat", d:"300–400 mg", t:"seara, cu o oră înainte de somn", w:"Calmează sistemul nervos și relaxează mușchii; baza pentru profilul tău."},
   {n:"L-teanină", d:"100–200 mg", t:"cu cafeaua de dimineață sau în zilele tensionate", w:"Atenție calmă: îți ia agitația de la cafea fără să te adoarmă."},
   {n:"Glicină", d:"3 g", t:"înainte de culcare", w:"Adormi mai ușor și dormi mai adânc; scade ușor temperatura corpului."},
   {n:"Ashwagandha (KSM-66)", d:"300–600 mg", t:"seara, în cicluri de 8 săptămâni cu 2–4 pauză", w:"Scade cortizolul în perioadele de stres și pe definire."},
   {n:"Fosfatidilserină", d:"200–400 mg", t:"seara, în perioadele cu mult stres sau antrenamente dure", w:"Tamponează răspunsul de cortizol după efort."},
   {n:"Creatină monohidrat", d:"3–5 g", t:"zilnic", w:"Volum și pump mai bune; ajută și la oboseala mentală."},
   {n:"Omega-3", d:"2 g", t:"la mese", w:"Dispoziție și recuperare."},
   {n:"Vitamina D3 + K2", d:"2.000–4.000 UI + 100 µg", t:"dimineața", w:"Dispoziție și imunitate, mai ales iarna; doza după analize."}
  ]
 },
 "3": {
  who: [
   "Ai cea mai mare sensibilitate la stres dintre toate profilurile; nesiguranța te consumă mai mult decât efortul.",
   "Ai nevoie de control: să știi ce faci azi, mâine și peste o lună.",
   "Corpul tău răspunde bine la volum moderat și repetări multe, cu tempo lent, și mai slab la greutăți maxime.",
   "Ești foarte constant când ai un plan în care crezi; poți urma aceeași rutină luni întregi.",
   "La testări și la concursuri ai emoții de performanță și pierzi din ce poți de fapt.",
   "Îți trebuie mai mult timp de recuperare între antrenamentele grele decât altora."
  ],
  train: [
   "Aparatele și cablurile sunt prietenii tăi: stabilitate mare, risc mic, progres pe care îl poți urmări precis.",
   "10–15 repetări la majoritatea exercițiilor, cu 3–4 secunde pe negativ.",
   "Nu duci fiecare serie la eșec: lași 1–2 repetări în rezervă și duci la eșec doar ultima serie de la ultimul exercițiu.",
   "Aceeași oră și aceeași încălzire la fiecare antrenament; încălzirea e și ritualul care te liniștește.",
   "Frecvență mai mare, volum moderat: fiecare grupă de 2 ori pe săptămână, cu mai puține serii pe ședință."
  ],
  diet: [
   "Micul dejun poate avea carbohidrați (ovăz, fructe, pâine integrală); te liniștește pentru restul zilei.",
   "Low-carb doar scurt, cu mine, și niciodată mai mult de 2–3 zile la rând.",
   "Un ceai de mușețel sau o gustare cu lactate seara, ca parte din rutina de somn."
  ],
  stack: [
   {n:"Vitamina D3 + K2", d:"2.000–4.000 UI + 100 µg", t:"dimineața, cu grăsimi", w:"Dispoziție, imunitate, forță; profilul tău e cel mai sensibil la lipsa luminii."},
   {n:"Omega-3 (EPA mare)", d:"2–3 g", t:"la mese", w:"Dispoziție stabilă și inflamație mică."},
   {n:"Magneziu bisglicinat", d:"400 mg", t:"seara", w:"Somn adânc, mușchi relaxați, mai puțină neliniște."},
   {n:"Creatină monohidrat", d:"3–5 g", t:"zilnic", w:"Forță și energie mentală."},
   {n:"Glicină", d:"3 g", t:"înainte de culcare", w:"Somn mai bun fără somnolență dimineața."},
   {n:"Inozitol", d:"2–4 g", t:"seara, dizolvat în apă", w:"Liniște și somn mai bun la oamenii care analizează mult."},
   {n:"Șofran (extract standardizat)", d:"30 mg", t:"dimineața", w:"Dispoziție mai bună în perioadele grele, pe definire și iarna."},
   {n:"Complex B (forme active)", d:"1 doză", t:"dimineața, cu mâncare", w:"Energie și cofactori pentru serotonină."}
  ]
 }
},

/* ===== dezechilibrul, complet: dietă, suplimente detaliate, stil de viață, atenționări ===== */
deficitFull: {
 D: {
  diet: [
   "Mic dejun cu 30–40 g de proteine din carne, ouă sau pește și grăsimi bune (nuci, avocado), fără dulce.",
   "Tirozină din alimente în fiecare zi: vită, curcan, pui, ouă, brânzeturi maturate, migdale, semințe de dovleac.",
   "Carbohidrații mutați în a doua parte a zilei; dimineața te încetinesc.",
   "Fără zahăr dimineața: vârful și căderea de glicemie îți scad energia la prânz.",
   "Cafeaua la 30–60 de minute după trezire, nu imediat; maximum 2–3 pe zi, ultima înainte de ora 14.",
   "Carne roșie de 2–3 ori pe săptămână pentru fier și B12; feritina și B12 merită verificate la analize.",
   "Deficitul caloric nu mai mare de 20% cât timp dopamina e jos.",
   "Ciocolată neagră 85% (20 g) ca gustare, în loc de dulciuri.",
   "Prânz proteic cu carbohidrați moderați, ca să nu ai somnolență după-amiaza.",
   "Apă suficientă: o deshidratare de 2% scade energia și motivația mai mult decât crezi."
  ],
  supp: [
   {n:"L-tirozină", d:"500–1.500 mg (începi cu 500)", t:"dimineața pe stomacul gol; la nevoie încă o doză înainte de antrenament", w:"Precursorul dopaminei; ajută mai ales în zilele cu stres, somn puțin sau deficit caloric."},
   {n:"Complex B activ (B6 ca P5P, folat metilat, B12)", d:"1 capsulă", t:"dimineața, cu mâncare", w:"Cofactorii de care are nevoie corpul ca să transforme tirozina în dopamină."},
   {n:"Omega-3", d:"2–3 g EPA + DHA", t:"la mese", w:"Membrane neuronale sănătoase și receptori de dopamină mai sensibili."},
   {n:"Creatină monohidrat", d:"5 g", t:"zilnic", w:"Energie celulară și în creier; scade oboseala mentală, nu doar pe cea musculară."},
   {n:"Rhodiola rosea (3% rosavine)", d:"200–400 mg", t:"dimineața; 6–8 săptămâni, apoi 2 săptămâni pauză", w:"Adaptogen pentru oboseala de stres; îți readuce cheful de antrenament."},
   {n:"Acetil-L-carnitină", d:"1–2 g", t:"dimineața", w:"Energie mentală și motivație."},
   {n:"Cafeină + L-teanină", d:"100 mg + 200 mg", t:"înainte de antrenament", w:"Concentrare fără agitație și fără prăbușirea de după."},
   {n:"Magneziu bisglicinat", d:"300 mg", t:"seara", w:"Ca dopamina pornită ziua să nu-ți strice somnul."},
   {n:"Fier + vitamina C", d:"doar dacă feritina e scăzută, doza după analize", t:"dimineața, la 2 ore distanță de cafea și lactate", w:"Fierul puțin e una dintre cele mai des ratate cauze de lipsă de energie."}
  ],
  life: [
   "Lumină naturală 10–20 de minute în prima oră după trezire.",
   "Antrenament dimineața sau la prânz, nu seara târziu.",
   "Obiective săptămânale mici, scrise și bifate.",
   "Duș rece 1–3 minute dimineața, dacă îl tolerezi.",
   "Mai puțin scroll pe telefon: dopamina ieftină îți consumă motivația pentru cea care contează.",
   "Muzica ta preferată la antrenament.",
   "Un partener de antrenament sau o competiție prietenoasă.",
   "7–8 ore de somn; lipsa somnului scade sensibilitatea la dopamină."
  ],
  warn: "Tirozina nu se ia seara și nu se ia dacă iei medicamente pentru tiroidă, antidepresive de tip IMAO sau ai tensiune mare necontrolată. Fără mucuna (L-dopa) și fără stimulente puternice fără aviz medical. Dacă lipsa de chef durează peste 2–3 săptămâni sau vine cu tristețe, vorbește cu un medic."
 },
 A: {
  diet: [
   "2–4 ouă întregi zilnic: gălbenușul e cea mai bogată sursă alimentară de colină.",
   "Ficat de vită sau de pui o dată pe săptămână.",
   "Pește gras (somon, macrou, sardine) de 2–3 ori pe săptămână.",
   "Nuci, migdale și semințe zilnic, 20–30 g.",
   "O lingură de lecitină (soia sau floarea-soarelui) în shake, dacă nu mănânci ouă.",
   "Grăsimile nu coboară sub 0,8 g/kg, nici pe definire.",
   "Carbohidrați moderați, fără vârfuri mari care aduc ceață după masă.",
   "Legume crucifere (broccoli, conopidă, varză de Bruxelles) de câteva ori pe săptămână.",
   "Apă constantă; gura și pielea uscate sunt și semn de hidratare slabă.",
   "Fără mese foarte mari la prânz în zilele cu mult lucru mental."
  ],
  supp: [
   {n:"Citicolină (CDP-colină)", d:"250–500 mg", t:"dimineața", w:"Colină plus suport pentru membranele neuronale; concentrare și memorie."},
   {n:"sau Alpha-GPC", d:"300–600 mg", t:"dimineața sau cu 45–60 de minute înainte de antrenament", w:"Varianta cu efect mai bun pe forță și conexiunea minte-mușchi. Iei una dintre cele două, nu amândouă."},
   {n:"Omega-3 cu DHA mare", d:"1–2 g DHA", t:"la mese", w:"DHA e materialul de construcție al creierului."},
   {n:"Acetil-L-carnitină", d:"1–2 g", t:"dimineața", w:"Furnizează grupări acetil pentru acetilcolină; energie mentală."},
   {n:"Vitamina B5 (acid pantotenic)", d:"250–500 mg", t:"dimineața", w:"Cofactor direct pentru producția de acetilcolină."},
   {n:"Fosfatidilserină", d:"100–300 mg", t:"seara, dacă ai și stres", w:"Memorie și răspuns mai bun la stres."},
   {n:"Bacopa monnieri (50% bacozide)", d:"300 mg", t:"cu o masă cu grăsimi", w:"Memorie și învățare; efectul apare după 6–8 săptămâni."},
   {n:"Creatină monohidrat", d:"5 g", t:"zilnic", w:"Energie pentru creier, nu doar pentru mușchi."},
   {n:"Huperzină A", d:"50–100 µg", t:"doar în cicluri scurte, la recomandarea mea", w:"Menține acetilcolina mai mult timp; o folosesc rar și controlat."}
  ],
  life: [
   "Somn 7–8 ore: memoria și tehnica se consolidează în somn.",
   "Exerciții de coordonare și tehnică la începutul antrenamentului.",
   "Fără multitasking în sală: un exercițiu, o serie, atenție completă.",
   "20 de minute de citit pe zi, fără telefon.",
   "O mișcare nouă învățată în fiecare lună.",
   "Pauze de 5 minute la fiecare 50 de minute de lucru la birou.",
   "Alcoolul limitat; e printre primele care îți strică claritatea.",
   "Verifică cu medicul medicamentele cu efect anticolinergic (unele antialergice vechi și somnifere)."
  ],
  warn: "Huperzina A doar în cicluri scurte, la recomandarea mea, și niciodată cu medicamente pentru memorie sau anticolinergice. Bacopa poate da greață pe stomacul gol. Dacă ai probleme reale de memorie sau confuzie, mergi întâi la medic."
 },
 G: {
  diet: [
   "Carbohidrați complecși seara (orez, cartof, ovăz): te liniștesc și îți îmbunătățesc somnul.",
   "Magneziu din alimente: verdețuri, semințe de dovleac, cacao, migdale.",
   "Fără cafeină după prânz.",
   "Fără deficit caloric agresiv: foamea mare e stres pentru sistemul tău nervos.",
   "Alimente fermentate zilnic (chefir, iaurt, varză murată): intestinul sănătos ajută echilibrul GABA.",
   "Ceai de mușețel sau de melisă seara.",
   "Glicină din alimente: supă de oase, gelatină, colagen.",
   "Cina cu proteine și carbohidrați împreună, la 2–3 ore înainte de culcare.",
   "Mese regulate, fără să ajungi la foame mare între ele.",
   "Alcoolul limitat: relaxarea de la el e urmată de o noapte mai agitată."
  ],
  supp: [
   {n:"Magneziu bisglicinat", d:"300–400 mg", t:"seara", w:"Primul supliment pentru tensiune și somn; forma bisglicinat nu dă probleme digestive."},
   {n:"L-teanină", d:"200 mg", t:"dimineața cu cafeaua și/sau seara", w:"Relaxare fără somnolență; liniștește agitația de zi."},
   {n:"Taurină", d:"1–3 g", t:"seara", w:"Efect calmant asupra sistemului nervos; ajută și la crampe."},
   {n:"Glicină", d:"3 g", t:"înainte de culcare", w:"Adormi mai repede și dormi mai adânc."},
   {n:"Ashwagandha (KSM-66)", d:"300–600 mg", t:"seara; 8 săptămâni, apoi 2–4 pauză", w:"Scade cortizolul și senzația de stres."},
   {n:"Fosfatidilserină", d:"200–400 mg", t:"seara", w:"Tamponează cortizolul după antrenamentele grele și zilele stresante."},
   {n:"Inozitol", d:"2–4 g", t:"seara, în apă", w:"Liniște și somn la oamenii cu mintea care nu se oprește."},
   {n:"Vitamina B6 (P5P)", d:"25–50 mg", t:"dimineața", w:"Cofactor pentru producția de GABA."},
   {n:"ZMA (zinc, magneziu, B6)", d:"1 doză", t:"seara, pe stomacul gol", w:"Alternativă simplă dacă vrei un singur produs seara."}
  ],
  life: [
   "Respirație lentă 5 minute seara (inspiri 4 secunde, ții 7, expiri 8).",
   "Plimbare zilnică de 30 de minute, de preferat în natură.",
   "Mai puține stimulente: pre-workout fără stimulente sau cu doză mică.",
   "Antrenamentul nu mai târziu de ora 20.",
   "Telefonul departe cu o oră înainte de somn.",
   "Dormitor răcoros, întunecat și liniștit.",
   "Stretching sau yoga de 1–2 ori pe săptămână.",
   "Sauna de 1–2 ori pe săptămână, dacă ai acces."
  ],
  warn: "Ashwagandha nu se ia la hipertiroidie, în sarcină sau cu sedative fără aviz medical. Valeriana și combinațiile sedative nu se iau cu alcool sau cu somnifere. Taurina și magneziul în doze mari pot da scaune moi; urci treptat."
 },
 S: {
  diet: [
   "Carbohidrați la cină: ajută triptofanul să ajungă la creier.",
   "Triptofan din alimente zilnic: curcan, ouă, lactate, banane, ovăz, semințe de dovleac.",
   "Mese regulate; fără low-carb lung și fără post prelungit.",
   "Pește gras de 2–3 ori pe săptămână.",
   "Vitamina B6 din alimente: banane, cartofi, năut, pui.",
   "Ovăz sau orez seara, în special în zilele grele.",
   "Ouă și pește pentru vitamina D din alimente.",
   "30 g de fibre pe zi: cea mai mare parte din serotonina corpului se produce în intestin.",
   "Ciocolată neagră cu măsură, ca parte din plan, nu ca recompensă vinovată.",
   "Poftele de seară nu se rezolvă cu voință: le prevenim cu o cină consistentă."
  ],
  supp: [
   {n:"Vitamina D3 + K2", d:"2.000–4.000 UI + 100 µg (după analiza 25-OH)", t:"dimineața, cu grăsimi", w:"Lipsa de vitamina D e strâns legată de dispoziția scăzută, mai ales iarna."},
   {n:"Omega-3 cu EPA mare", d:"2–3 g", t:"la mese", w:"EPA are cel mai bun efect pe dispoziție dintre componentele omega-3."},
   {n:"Magneziu bisglicinat", d:"300 mg", t:"seara", w:"Somn și liniște."},
   {n:"Complex B (forme active)", d:"1 doză", t:"dimineața", w:"B6, folat și B12: cofactori pentru serotonină."},
   {n:"Șofran (extract standardizat)", d:"30 mg", t:"dimineața", w:"Susține dispoziția; e unul dintre cele mai bine studiate extracte pentru asta."},
   {n:"Probiotic cu mai multe tulpini", d:"1 doză", t:"dimineața", w:"Intestin sănătos, serotonină din intestin."},
   {n:"Glicină", d:"3 g", t:"seara", w:"Somn mai adânc, fără trezirile de dimineață devreme."},
   {n:"Inozitol", d:"2–4 g", t:"seara", w:"Liniște și mai puține griji repetitive."},
   {n:"5-HTP", d:"50–100 mg", t:"seara, doar cu acordul meu", w:"Precursor direct al serotoninei; îl folosesc rar și niciodată cu medicamente pentru dispoziție."}
  ],
  life: [
   "Lumină naturală dimineața, 20 de minute.",
   "Iarna, o lampă de lumină (10.000 lux) 20–30 de minute dimineața.",
   "3–4 antrenamente moderate pe săptămână, nu epuizante.",
   "Contact social real, nu doar online.",
   "Somn la ore regulate, inclusiv în weekend.",
   "5 minute de jurnal seara: trei lucruri care au mers bine.",
   "Ieșiri în natură în weekend.",
   "Alcool puțin: îți scade dispoziția în zilele următoare."
  ],
  warn: "Triptofanul sau 5-HTP se discută doar cu mine și niciodată împreună cu antidepresive, medicamente pentru migrenă (triptani) sau tramadol: risc de sindrom serotoninergic. Sunătoarea nu o recomand din același motiv. Dacă tristețea durează peste două săptămâni sau ai gânduri negre, vorbește cu un medic sau cu un psiholog."
 }
},

/* ===== baza pentru toată lumea ===== */
base: [
 {n:"Creatină monohidrat", d:"3–5 g", t:"zilnic, oricând", w:"Forță, volum muscular, recuperare. Nu trebuie încărcată și nu trebuie ciclată."},
 {n:"Proteină din zer sau izolat", d:"30–40 g", t:"când nu atingi proteinele din mâncare, de obicei după antrenament", w:"Comoditate; mâncarea rămâne baza."},
 {n:"Omega-3", d:"2 g EPA + DHA", t:"la mese", w:"Articulații, inflamație, inimă, creier."},
 {n:"Vitamina D3 + K2", d:"2.000 UI + 100 µg (doza finală după analize)", t:"dimineața", w:"Imunitate, oase, forță, dispoziție."},
 {n:"Magneziu bisglicinat", d:"200–400 mg", t:"seara", w:"Somn și recuperare; aproape toți sportivii pierd magneziu prin transpirație."},
 {n:"Electroliți", d:"după cât transpiri", t:"în timpul antrenamentelor de peste 60 de minute", w:"Performanță și fără crampe."},
 {n:"Multivitamine și minerale", d:"1 doză", t:"dimineața, cu mâncare", w:"Asigurare pe definire, când mănânci mai puțin."},
 {n:"Fibre (psyllium)", d:"5–10 g", t:"cu apă multă, departe de suplimente", w:"Dacă mănânci puține legume; digestie și sațietate pe definire."}
]
});

/* Chera Protocol – evaluarea (profil neuro). Generat din site/evaluare.html; logica e identică. */
/* ===== CONFIG (se completează la integrare) ===== */
const CONFIG = { WHATSAPP_NUMBER: (window.CHERA && window.CHERA.whatsapp) || "", SHEET_ENDPOINT: (window.CHERA && window.CHERA.endpoint) || "", BRAND: "Chera Protocol" };

/* ===== RUNDA 1: natura (D/A/G/S) ===== */
const A_ITEMS = [
 ["D","Îmi place să concurez, chiar și la lucruri mărunte."],["D","În sală vreau greutăți mari, nu serii lungi."],["D","Mă plictisesc repede dacă antrenamentul e lung și repetitiv."],["D","Iau decizii rapid și rar mă răzgândesc."],["D","Am mai multă energie decât majoritatea celor din jur."],["D","Prefer să conduc decât să fiu condus."],["D","Presiunea și termenele scurte mă fac mai bun."],["D","Un antrenament bun e scurt, greu și intens."],
 ["A","Învăț repede o mișcare nouă doar văzând-o."],["A","Același program trei luni mă omoară; am nevoie de varietate."],["A","Îmi plac aproape toate stilurile de antrenament."],["A","Mă adaptez ușor la schimbări de program, orar sau dietă."],["A","Îmi vin des idei noi; sunt creativ."],["A","Vorbesc ușor cu oameni noi și mă simt bine în grup."],["A","Când sunt entuziasmat, tind să fac prea mult."],["A","Rețin ușor detalii și informații noi."],
 ["G","Sunt omul pe care se pot baza ceilalți; îmi țin promisiunile."],["G","Prefer un program stabil, cu reguli clare, pe care îl urmez mult timp."],["G","Rar mă enervez; sunt calm în situații tensionate."],["G","Termin ce încep, chiar dacă durează."],["G","Nu am nevoie de noutate ca să rămân motivat."],["G","Obiceiurile și tradițiile îmi dau siguranță."],["G","În sală prefer ritmul constant, nu exploziile de efort."],["G","Mă simt bine când lucrurile sunt organizate dinainte."],
 ["S","Mă simt cel mai bine când totul e planificat și nimic nu se schimbă pe ultima sută."],["S","Mă afectează ușor criticile sau tonul celorlalți."],["S","Analizez mult înainte să iau o decizie."],["S","Am nevoie de timp singur ca să mă încarc."],["S","Când sunt stresat, îmi scade cheful de antrenament."],["S","Mă simt mai calm după o masă consistentă cu carbohidrați."],["S","Vreau să înțeleg „de ce” înainte să fac ceva."],["S","Prefer progresul lent și sigur unui risc mare."]
];
const TIE_1 = [["1A","Prefer să ridic greu și lent (forță) decât să sar, să arunc sau să sprintez."],["1B","Mă atrag sporturile de viteză și coordonare, nu doar sala."],["1A","Exercițiile tehnice mă enervează; vreau bara și gata."],["1B","Îmi place să schimb des exercițiile, dar nu intensitatea."]];
const TIE_2 = [["2A","Mă motivează cifrele și performanța: mai mult, mai greu."],["2B","Mă motivează senzația din mușchi și cum arăt în oglindă."],["2A","După o critică dură vreau să demonstrez că pot."],["2B","După o critică dură îmi pierd cheful o vreme."]];

/* ===== RUNDA 2: echilibrul (deficit) ===== */
const B_ITEMS = [
 ["D","Mă trezesc fără chef și îmi trebuie mult să pornesc."],["D","Am nevoie de cafea sau energizante ca să funcționez."],["D","Antrenamentul mi se pare o corvoadă, nu o plăcere."],["D","Amân lucruri pe care știu că trebuie să le fac."],["D","Îmi lipsește ambiția pe care o aveam."],["D","Am poftă de dulce sau de stimulente după-amiaza."],["D","Obosesc repede la efort, deși dorm suficient."],["D","Mă simt „plat”: nici bine, nici rău."],
 ["A","Uit unde am pus lucrurile sau ce voiam să spun."],["A","Îmi e greu să mă concentrez mai mult de 20 de minute."],["A","Învăț mai greu lucruri noi decât înainte."],["A","Mă simt „în ceață” mental."],["A","Reacționez mai lent la antrenament (coordonare, tehnică)."],["A","Pierd firul când citesc sau ascult ceva mai lung."],["A","Am pielea sau gura uscată, deși beau apă."],["A","Mă simt dezorganizat, deși de obicei nu sunt."],
 ["G","Mă simt tensionat sau „pe nervi” fără motiv clar."],["G","Adorm greu; mintea nu se oprește seara."],["G","Mă enervez din lucruri mărunte."],["G","Am mușchii încordați (ceafă, umeri, maxilar)."],["G","Mă trezesc noaptea și adorm greu la loc."],["G","Am poftă de carbohidrați seara ca să mă liniștesc."],["G","Mă simt copleșit când am multe de făcut."],["G","Am palpitații sau respirație scurtă când sunt stresat."],
 ["S","Mă simt mai trist sau mai pesimist decât de obicei."],["S","Mă trezesc prea devreme și nu mai adorm."],["S","Am poftă mare de dulce sau de pâine și paste, mai ales seara."],["S","Mă simt singur chiar și între oameni."],["S","Iarna sau pe vreme închisă mă simt vizibil mai rău."],["S","Mă îngrijorez mult, inclusiv pentru lucruri mici."],["S","Mi-a scăzut interesul pentru lucruri care îmi plăceau."],["S","Am dureri difuze (cap, spate) fără cauză clară."]
];
const SCALE_NAME = {D:"Dopamină",A:"Acetilcolină",G:"GABA",S:"Serotonină"};
const LABELS_A = [["1","deloc"],["2","puțin"],["3","destul"],["4","exact eu"]];
const LABELS_B = [["1","aproape niciodată"],["2","uneori"],["3","des"],["4","aproape zilnic"]];

/* ===== MATRICEA (din EVALUARE-NEUROTIP-2026-10-27.md §6; proprietarul o poate rescrie aici) ===== */
const TYPES = {
 "1A":{name:"Luptătorul",dom:"D",who:["Competitiv, direct, cu energie peste medie; te plictisești când e mult și ușor.","Vrei greutăți mari și rezultate clare, nu serii lungi.","Presiunea te face mai bun, dar volumul mare te consumă."],
  train:["Greutăți mari, 3–6 repetări, serii scurte, pauze complete.","4–5 ședințe scurte pe săptămână; variezi exercițiile, nu metodele.","Fără volum mare: când scade intensitatea, scade și motivația ta."],
  diet:["Proteine 2,2–2,5 g/kg, grăsimi mai sus, mic dejun proteic fără carbohidrați.","Carbohidrații în jurul antrenamentului și seara.","Tolerezi bine dietele stricte; pericolul tău e să tai prea mult, prea repede."]},
 "1B":{name:"Atletul",dom:"D",who:["Exploziv, rapid, înveți mișcări noi din zbor.","Îți place viteza, coordonarea și varietatea exercițiilor.","Te motivează performanța, nu oglinda."],
  train:["Mișcări atletice și explozive, 3–8 repetări, pliometrie, variante olimpice.","Schimbi exercițiile des, păstrezi intensitatea mare și volumul moderat.","Antrenamentul trebuie să semene cu un sport, nu cu o rutină."],
  diet:["Carbohidrați moderați, mai mulți în zilele grele (periodizare pe zile).","Proteine 2,2 g/kg, constante.","Mesele din jurul antrenamentului fac diferența la tine."]},
 "2A":{name:"Cameleonul",dom:"A",who:["Te adaptezi la orice și îți place aproape tot; înveți repede.","Ai nevoie de varietate ca să rămâi motivat.","Din entuziasm, riști să faci prea mult."],
  train:["Stil bodybuilding cu variație mare: metode, tempo, exerciții.","6–15 repetări; schimbare la 2–3 săptămâni.","Atenție la supraantrenament: răspunzi la tot, deci limita o pui tu, nu corpul."],
  diet:["Flexibil: carbohidrați moderați, mese regulate.","Ouă și surse de colină zilnic.","Când stresul crește, cresc și carbohidrații, nu cafeaua."]},
 "2B":{name:"Artistul",dom:"G",who:["Simți totul: antrenamentul, mâncarea, cuvintele celorlalți.","Ai nevoie de conexiune minte-mușchi și de feedback pozitiv.","Te descurajezi ușor, dar când ești susținut, ești constant."],
  train:["Pump și conexiune minte-mușchi, 8–15 repetări, tempo controlat.","Drop set și rest-pause; puține zile cu greutăți maxime.","Progresul tău se vede în oglindă înainte să se vadă pe bară."],
  diet:["Carbohidrați moderat-mari, concentrați seara și după antrenament.","Proteine constante la fiecare masă.","Fără diete agresive: la tine, foamea strică somnul și dispoziția."]},
 "3":{name:"Strategul",dom:"S",who:["Analitic, perfecționist, vrei rutină și control.","Nu-ți plac surprizele; schimbările neanunțate te scot din ritm.","Progresezi când înțelegi de ce faci fiecare lucru."],
  train:["Același program 8–12 săptămâni, progresie mică și clară.","8–12 repetări, pauze mai lungi, volum moderat, fără haos.","Orice schimbare se anunță și se explică dinainte."],
  diet:["Carbohidrați mai mari, cu carbohidrați la cină.","Mese la ore fixe; fără low-carb și fără post prelungit.","Schimbări mici, una pe săptămână, explicate."]}
};
const DEFICIT = {
 D:{name:"dopamina",diet:["Mic dejun bogat în proteine (ouă, carne, pește); fără dulce dimineața.","Tirozină din alimente: brânzeturi, semințe de dovleac, curcan, migdale.","Carbohidrații mutați spre seară."],
   supp:["L-tirozină 500–1.500 mg dimineața, pe stomacul gol","Complex B (cu B6)","Omega-3 (EPA/DHA) 2 g","Creatină 3–5 g","Rhodiola 200–400 mg dimineața"],
   life:["Lumină și, dacă poți, antrenament dimineața.","Obiective scurte, cu victorii săptămânale.","Cafeina doar înainte de ora 14."],warn:"Tirozina nu se ia seara. Fără mucuna (L-dopa) fără aviz medical."},
 A:{name:"acetilcolina",diet:["Ouă întregi zilnic (2–4), ficat o dată pe săptămână, pește gras, nuci.","Lecitină și grăsimi bune; carbohidrați moderați."],
   supp:["Citicolină 250–500 mg sau alpha-GPC 300–600 mg dimineața","Omega-3 cu DHA mare, 2 g","Acetil-L-carnitină 1–2 g","Fosfatidilserină 100–300 mg","Vitamina B5"],
   life:["Somn 7–8 ore.","Exerciții de coordonare și tehnică în antrenament.","Fără multitasking în sală."],warn:"Huperzina A doar la recomandarea antrenorului, în cicluri scurte."},
 G:{name:"GABA",diet:["Carbohidrați complecși seara (orez, cartof, ovăz).","Magneziu din alimente: verdețuri, semințe, cacao.","Fără cafeină după prânz și fără deficit caloric agresiv."],
   supp:["Magneziu bisglicinat 300–400 mg seara","L-teanină 200 mg (și dimineața, cu cafeaua)","Taurină 1–3 g seara","Glicină 3 g înainte de culcare","Ashwagandha KSM-66 300–600 mg","ZMA ca alternativă seara"],
   life:["Respirație lentă 5 minute seara.","Plimbare zilnică, mai puține stimulente.","Antrenamentul nu mai târziu de ora 20."],warn:"Ashwagandha: nu la probleme de tiroidă fără aviz. Taurina și magneziul în doze mari pot da scaune moi."},
 S:{name:"serotonina",diet:["Carbohidrați la cină.","Surse de triptofan: curcan, ouă, lactate, banane, ovăz.","Mese regulate; fără low-carb și fără post prelungit."],
   supp:["Vitamina D3 2.000–4.000 UI cu K2","Omega-3 2 g","Magneziu bisglicinat 300 mg","Complex B","Șofran 30 mg"],
   life:["Lumină naturală dimineața, 20 de minute.","3 antrenamente moderate, nu epuizante.","Contact social și somn regulat."],warn:"Triptofanul sau 5-HTP se discută doar cu mine, niciodată împreună cu medicamente pentru dispoziție."}
};
const DOORS = {
 scena:{title:"Ușa ta: Pregătire de concurs",text:"Plătești prima lună (1.500 lei), care include planul inițial complet: antrenament, dietă, lista de analize, suplimente și evaluări. În 48 de ore avem un video call de 15 minute, eu și tu, în care alegem competițiile și stabilim plata pentru întreg sezonul. Locuri limitate.",cta:"Începe pregătirea",url:"/products/pregatire-de-concurs-prima-luna"},
 sportiv:{title:"Ușa ta: Chera Protocol Coaching",text:"Plan de antrenament și nutriție construit pe profilul tău, check-in săptămânal cu poze și cântar, ajustări făcute de mine, eu pe WhatsApp, răspuns în 24 de ore. Minimum 12 săptămâni, cu garanție.",cta:"Începe coaching-ul",url:"/products/chera-protocol-coaching-1-luna"},
 start:{title:"Ușa ta: Programele + un antrenor la un mesaj distanță",text:"Pornești cu un program digital potrivit profilului tău, iar când vrei ajustări, treci la coaching cu prețul programului dedus.",cta:"Vezi programele",url:"/collections/programe"}
};

/* ===== STATE ===== */
const PER_PAGE = 5;
let state = {ansA:{}, ansT:{}, ansB:{}, phase:"A", page:0, order:{A:[],T:[],B:[]}, dom:null, result:null};
try{ const s=JSON.parse(localStorage.getItem("cp-neuro")||"null"); if(s&&s.ansA){state=Object.assign(state,s);} }catch(e){}
function save(){ try{ localStorage.setItem("cp-neuro",JSON.stringify(state)); }catch(e){} }

function seededShuffle(arr,seed){ const a=arr.map((x,i)=>[x,i]); let s=seed; const rnd=()=>{s=(s*9301+49297)%233280;return s/233280;}; for(let i=a.length-1;i>0;i--){const j=Math.floor(rnd()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a.map(x=>x[1]); }
if(!state.order.A.length){ state.order.A=seededShuffle(A_ITEMS,7); state.order.B=seededShuffle(B_ITEMS,11); }

const $=id=>document.getElementById(id);
const sections={intro:$("s-intro"),quiz:$("s-quiz"),context:$("s-context"),result:$("s-result")};
function show(name){ Object.entries(sections).forEach(([k,el])=>el.hidden=(k!==name)); window.scrollTo({top:0,behavior:"auto"}); }

function sumScale(items,ans,key){ let t=0; items.forEach((it,i)=>{ if(it[0]===key) t+=(ans[i]||0); }); return t; }
function scoresFor(items,ans){ const r={}; ["D","A","G","S"].forEach(k=>r[k]=sumScale(items,ans,k)); return r; }
function dominant(sc){ const e=Object.entries(sc).sort((a,b)=>b[1]-a[1]); return {top:e[0][0],second:e[1][0],mixed:(e[0][1]-e[1][1])<=2,sorted:e}; }

/* which items belong to the current phase */
function phaseItems(){
  if(state.phase==="A") return state.order.A.map(i=>({idx:i,scale:A_ITEMS[i][0],text:A_ITEMS[i][1]}));
  if(state.phase==="T"){ const list=state.dom==="D"?TIE_1:(state.dom==="S"?[]:TIE_2); return list.map((it,i)=>({idx:i,scale:it[0],text:it[1]})); }
  return state.order.B.map(i=>({idx:i,scale:B_ITEMS[i][0],text:B_ITEMS[i][1]}));
}
function answersObj(){ return state.phase==="A"?state.ansA:(state.phase==="T"?state.ansT:state.ansB); }
function totalItems(){ return 32 + (state.dom==="S"?0:4) + 32; }
function answeredCount(){ return Object.keys(state.ansA).length+Object.keys(state.ansT).length+Object.keys(state.ansB).length; }

function renderPage(){
  const items=phaseItems(), ans=answersObj(), labels=state.phase==="B"?LABELS_B:LABELS_A;
  const start=state.page*PER_PAGE, slice=items.slice(start,start+PER_PAGE);
  $("p-round").textContent = state.phase==="B" ? "Runda 2 · Echilibrul tău acum" : "Runda 1 · Natura ta";
  $("round-hint").textContent = state.phase==="B" ? "Gândește-te la ultimele 4 săptămâni." : (state.phase==="T" ? "Patru afirmații de departajare." : "Cât de mult te descrie fiecare afirmație?");
  const cont=$("items"); cont.innerHTML="";
  slice.forEach((it,k)=>{
    const n=start+k+1;
    const div=document.createElement("div"); div.className="item";
    div.innerHTML=`<div class="n">${String(n).padStart(2,"0")} / ${items.length}</div><div class="q">${it.text}</div><div class="opts" role="radiogroup" aria-label="Răspuns"></div>`;
    const og=div.querySelector(".opts");
    labels.forEach(([v,l])=>{
      const b=document.createElement("button"); b.type="button"; b.className="opt"; b.setAttribute("role","radio");
      b.setAttribute("aria-checked", String(ans[it.idx]==Number(v))); b.innerHTML=`<span>${v}</span>${l}`;
      b.addEventListener("click",()=>{ ans[it.idx]=Number(v); og.querySelectorAll(".opt").forEach(o=>o.setAttribute("aria-checked","false")); b.setAttribute("aria-checked","true"); $("quiz-err").hidden=true; updateProgress(); save(); });
      og.appendChild(b);
    });
    cont.appendChild(div);
  });
  $("btn-back").disabled = (state.phase==="A" && state.page===0);
  updateProgress();
}
function updateProgress(){ const t=totalItems(), a=answeredCount(); $("p-count").textContent=`${a} / ${t}`; $("p-fill").style.width=Math.round(100*a/t)+"%"; }

function pageComplete(){ const items=phaseItems(), ans=answersObj(); const start=state.page*PER_PAGE; return items.slice(start,start+PER_PAGE).every(it=>ans[it.idx]); }

function next(){
  if(!pageComplete()){ $("quiz-err").hidden=false; return; }
  const items=phaseItems(); const last=Math.ceil(items.length/PER_PAGE)-1;
  if(state.page<last){ state.page++; }
  else if(state.phase==="A"){ state.dom=dominant(scoresFor(A_ITEMS,state.ansA)).top; state.ansT={}; state.phase = state.dom==="S" ? "B" : "T"; state.page=0; }
  else if(state.phase==="T"){ state.phase="B"; state.page=0; }
  else { save(); show("context"); return; }
  save(); renderPage(); window.scrollTo({top:0});
}
function back(){
  if(state.page>0){ state.page--; }
  else if(state.phase==="T"){ state.phase="A"; state.page=Math.ceil(32/PER_PAGE)-1; }
  else if(state.phase==="B"){ state.phase = state.dom==="S" ? "A" : "T"; state.page = state.phase==="A" ? Math.ceil(32/PER_PAGE)-1 : 0; }
  else { show("intro"); return; }
  save(); renderPage();
}

/* ===== RESULT ===== */
function neurotype(){
  const sc=scoresFor(A_ITEMS,state.ansA), d=dominant(sc);
  const tieSum=(key)=>{ const list=state.dom==="D"?TIE_1:TIE_2; let t=0; list.forEach((it,i)=>{ if(it[0]===key) t+=(state.ansT[i]||0); }); return t; };
  let type;
  if(d.top==="D") type = tieSum("1A")>=tieSum("1B") ? "1A" : "1B";
  else if(d.top==="A") type = tieSum("2B")>tieSum("2A") ? "2B" : "2A";
  else if(d.top==="G") type = "2B";
  else type = "3";
  return {scores:sc,dom:d,type};
}
function balance(){
  const sc=scoresFor(B_ITEMS,state.ansB); const e=Object.entries(sc).sort((a,b)=>b[1]-a[1]);
  const level=v=>v>=22?"crit":(v>=15?"warn":"ok");
  const allHigh=Object.values(sc).every(v=>v>=20);
  return {scores:sc,sorted:e,top:e[0][0],topVal:e[0][1],level:level(e[0][1]),allHigh};
}
/* concluziile: păstrez primele ~60% din fiecare listă (cerut de Marius: concluziile cu ~30% mai scurte în total); cele mai importante sunt primele */
const KEEP=0.6, cut=a=>(a||[]).slice(0,Math.max(1,Math.round((a||[]).length*KEEP)));
function li(list,arr){ list.innerHTML=""; arr.forEach(t=>{ const l=document.createElement("li"); l.textContent=t; list.appendChild(l); }); }
function suppList(el,arr){ el.innerHTML=""; (arr||[]).forEach(x=>{ const l=document.createElement("li"); if(typeof x==="string"){ l.textContent=x; } else { l.innerHTML=`<b>${x.n}</b> · ${x.d} · <i>${x.t}</i><br><span class="hint">${x.w}</span>`; } el.appendChild(l); }); }
function scorecard(el,sc,top){ el.innerHTML=""; ["D","A","G","S"].forEach(k=>{ const d=document.createElement("div"); d.className="s"+(k===top?" lead-s":""); d.innerHTML=`<small>${SCALE_NAME[k]}</small><b>${sc[k]}</b>`; el.appendChild(d); }); }

function buildResult(){
  const nt=neurotype(), bal=balance(), T=TYPES[nt.type], goal=state.ctx.goal;
  const defCode = bal.level==="ok" ? "0" : bal.top;
  const code = `${nt.type}-${defCode}`;
  $("r-code").textContent = "PROFIL " + code;
  $("r-title").textContent = `${state.ctx.name ? state.ctx.name+", ești " : "Ești "}${T.name} (${nt.type})`;
  $("r-sub").textContent = bal.level==="ok" ? `Natura ta e dominată de ${SCALE_NAME[nt.dom.top].toLowerCase()}, iar echilibrul tău de acum e bun. Planul pleacă direct din profil.` : `Natura ta e dominată de ${SCALE_NAME[nt.dom.top].toLowerCase()}; acum ai ${DEFICIT[bal.top].name} ${bal.level==="crit"?"pe minus":"de susținut"}. Primele 8 săptămâni ajustăm asta.`;
  scorecard($("r-scoresA"),nt.scores,nt.dom.top);
  $("r-mixed").hidden = !nt.dom.mixed;
  if(nt.dom.mixed) $("r-mixed").textContent = `Profil mixt: ${SCALE_NAME[nt.dom.top]} și ${SCALE_NAME[nt.dom.second]} sunt la cel mult 2 puncte. Confirm eu tipul la prima discuție.`;
  const XX=window.CHERA_EXT||{}, EE=(XX.types||{})[nt.type]||{}, MM=(XX.more||{})[nt.type]||{};
  li($("r-who"),cut([...T.who,...(MM.who||[])]));
  li($("r-train"),cut([...T.train,...(EE.train||[]),...(MM.train||[])]));
  li($("r-diet"),cut([...T.diet,...(EE.diet||[]),...(MM.diet||[])]));
  scorecard($("r-scoresB"),bal.scores,bal.level==="ok"?null:bal.top);
  const rb=$("r-balance"); rb.innerHTML="";
  if(bal.allHigh){ rb.innerHTML=`<p><span class="pill crit">oboseală generală</span></p><p>Toate cele patru scale sunt ridicate. De obicei nu e un dezechilibru specific, ci somn puțin, deficit caloric prea mare sau prea multe stimulente. Verific eu întâi aceste trei lucruri; suplimentele vin după.</p>`; }
  else if(bal.level==="ok"){ rb.innerHTML=`<p><span class="pill ok">echilibru bun</span></p><p>Nimic de corectat acum. Rămâne dieta de bază a profilului tău și re-testăm la 8 săptămâni.</p>`; }
  else{
    const D=Object.assign({},DEFICIT[bal.top],((window.CHERA_EXT||{}).deficitFull||{})[bal.top]||{});
    rb.innerHTML=`<p><span class="pill ${bal.level}">${D.name}: ${bal.level==="crit"?"pe minus":"de susținut"}</span></p>
      <h3>Ajustări în dietă</h3><ul class="list" id="rb-diet"></ul>
      <h3>${bal.level==="crit"?"Suplimente de stabilizare, 8 săptămâni":"Suplimente de susținere (le confirm eu la prima discuție)"}</h3><ul class="list supp" id="rb-supp"></ul>
      <h3>Stil de viață</h3><ul class="list" id="rb-life"></ul>
      <p class="hint">${D.warn}</p>`;
    li($("rb-diet"),cut(D.diet)); suppList($("rb-supp"),cut(D.supp)); li($("rb-life"),cut(D.life));
  }
  renderExt(nt.type, bal, goal);
  const door=DOORS[goal]||DOORS.sportiv;
  $("r-door").innerHTML=`<p class="eyebrow">Recomandarea mea</p><h2>${door.title}</h2><p>${door.text}</p><a class="btn" href="${door.url}">${door.cta}</a>`;
  const msg = `Salut! Am făcut evaluarea Chera Protocol. Profil: ${code}. Sunt ${state.ctx.name||""}, ${state.ctx.city||""}, obiectiv: ${goal}. Scoruri natura D${nt.scores.D} A${nt.scores.A} G${nt.scores.G} S${nt.scores.S}; echilibru D${bal.scores.D} A${bal.scores.A} G${bal.scores.G} S${bal.scores.S}.`;
  $("r-wacode").textContent = msg;
  $("r-sendtext").textContent = state.ctx.channel==="email"
    ? `Îți trimit rezultatul și planul de pornire pe e-mail, la ${state.ctx.email}. Dacă vrei să-mi scrii și pe WhatsApp, apasă butonul sau trimite textul de mai jos la +${CONFIG.WHATSAPP_NUMBER}.`
    : `Îți scriu eu pe WhatsApp la ${state.ctx.phone}. Dacă vrei să-mi scrii tu primul, apasă butonul sau trimite textul de mai jos la +${CONFIG.WHATSAPP_NUMBER}.`;
  const txt=(id)=>[...document.querySelectorAll(`#${id} li`)].map(l=>"• "+l.textContent).join("\n");
  state.summary = `PROFIL ${code} · ${T.name} (${nt.type})\n${$("r-sub").textContent}\n\nCUM EȘTI\n${txt("r-who")}\n\nCUM TE ANTRENEZI\n${txt("r-train")}\n\nCUM MĂNÂNCI\n${txt("r-diet")}\n\nECHILIBRUL TĂU ACUM\n${$("r-balance").innerText.trim()}\n\n${door.title.toUpperCase()}\n${door.text}`;
  $("r-walink").href = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  state.result={code,type:nt.type,dom:nt.dom.top,mixed:nt.dom.mixed,scoresA:nt.scores,scoresB:bal.scores,deficit:defCode,level:bal.level,allHigh:bal.allHigh};
  save();
}
/* concluziile extinse (texte în assets/quiz-rezultat.js) */
function renderExt(type, bal, goal){
  const X=window.CHERA_EXT, box=$("r-ext"); if(!X||!box) return;
  const E=X.types[type]||X.types["2A"], G=X.goals[goal]||X.goals.sportiv;
  const ul=a=>"<ul class=\"list\">"+a.map(t=>"<li>"+t+"</li>").join("")+"</ul>";
  const card=(eb,h,body)=>`<div class="card">${eb?`<p class="eyebrow">${eb}</p>`:""}<h3>${h}</h3>${body}</div>`;
  let h=card("Profilul tău, pe larg","Ce înseamnă asta în sală",`<p>${E.intro}</p>`);
  h+=card("Antrenament","O săptămână-tip pe profilul tău",ul(E.split));
    h+=card("Exemplu","O zi de mâncare pe profilul tău",ul(E.day||[])+`<p class="hint">${X.dayNote}</p><p class="hint">${X.carbtest}</p>`);
  h+=card("Faze","Definire și masă musculară",`<h3>La definire</h3>${ul(cut(E.cut))}<h3 style="margin-top:14px">La masă musculară</h3>${ul(cut(E.bulk))}`);
  if(bal.level!=="ok" && !bal.allHigh && X.deficit[bal.top]){ const D=X.deficit[bal.top]; h+=card("Echilibrul tău acum","De ce contează "+DEFICIT[bal.top].name+" la sală",`<p>${D.why}</p><h3 style="margin-top:14px">Ce schimbăm în antrenament</h3>${ul(cut(D.train))}`); }
  h+=card("Atenție","Greșelile pe care le văd des la profilul tău",ul(cut(E.mistakes)));
  h+=card("Cum lucrăm","Ce ai nevoie de la mine",ul(cut(E.mind)));
  const M=(X.more||{})[type]||{}; const sl=a=>"<ul class=\"list supp\">"+(a||[]).map(x=>`<li><b>${x.n}</b> · ${x.d} · <i>${x.t}</i><br><span class="hint">${x.w}</span></li>`).join("")+"</ul>";
  h+=card("Suplimente","Stack-ul pentru profilul tău",sl(cut(M.stack))+`<h3 style="margin-top:14px">Baza, pentru oricine se antrenează serios</h3>`+sl(cut(X.base))+`<p class="hint">Dozele sunt orientative, pentru adulți sănătoși. Dacă iei medicamente, ai o boală cronică sau ești însărcinată, suplimentele le discuți întâi cu medicul. Profilul nu e un test medical.</p>`);
  h+=card("Obiectivul tău",G.title,ul(cut(G.items)));
  h+=card("Pasul 1","Primele 4 săptămâni cu mine",ul(cut(X.start4)));
  box.innerHTML=h;
}
async function submit(){
  const st=$("r-sendstatus");
  if(!CONFIG.SHEET_ENDPOINT){ return submitContact(st); }
  const payload={ts:new Date().toISOString(),...state.ctx,...state.result,summary:state.summary||"",ansA:state.ansA,ansT:state.ansT,ansB:state.ansB,ua:navigator.userAgent};
  try{ await fetch(CONFIG.SHEET_ENDPOINT,{method:"POST",mode:"no-cors",headers:{"Content-Type":"text/plain"},body:JSON.stringify(payload)}); st.textContent = state.ctx.channel==="email" ? "Rezultatul a ajuns la mine și ți l-am trimis și pe e-mail. Îți scriu cu planul de pornire în cel mult 24 de ore." : "Rezultatul a ajuns la mine. Îți scriu pe WhatsApp în cel mult 24 de ore."; }
  catch(e){ st.textContent="Nu am putut trimite rezultatul automat. Trimite-mi textul de mai jos pe WhatsApp și îl preiau eu."; }
}

/* fără receptor Google: (1) copie pe e-mail prin FormSubmit (adresa din setarea secțiunii evaluare),
   (2) formularul de contact Shopify nativ, cu hCaptcha (fetch la /contact e refuzat de CAPTCHA). Pagina se reîncarcă și reafișează rezultatul. */
function contactParts(){
  const c=state.ctx, r=state.result;
  return {
    subject:`Evaluare gratuită · PROFIL ${r.code} · ${c.name}`,
    context:`obiectiv: ${c.goal} · ani de sală: ${c.years} · somn: ${c.sleep} · cafea: ${c.caffeine} · antrenamente/săpt: ${c.days}`,
    body:(state.summary||"")+`\n\nScoruri natura D${r.scoresA.D} A${r.scoresA.A} G${r.scoresA.G} S${r.scoresA.S} · echilibru D${r.scoresB.D} A${r.scoresB.A} G${r.scoresB.G} S${r.scoresB.S}`
  };
}
async function submitContact(st){
  const c=state.ctx, p=contactParts(), cf=$("ev-contact-form"), cfg=$("ev-cfg"), mail=cfg?(cfg.dataset.mail||"").trim():"";
  const channel=c.channel==="email"?"e-mail":"WhatsApp";
  st.textContent="Trimit rezultatul la mine…";
  if(mail){
    const fsBody=JSON.stringify({_subject:p.subject,_template:"box",_captcha:"false",_replyto:c.email,name:c.name,email:c.email,
      message:`Telefon: ${c.phone}\nOraș: ${c.city||"-"}\nRăspuns pe: ${channel}\n${p.context}\n\n${p.body}`});
    try{ fetch("https://formsubmit.co/ajax/"+encodeURIComponent(mail),{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},body:fsBody,keepalive:fsBody.length<60000}).catch(()=>{}); }catch(e){}
  }
  if(!cf){ st.textContent="Nu am putut trimite rezultatul automat. Apasă butonul de mai jos și trimite-mi textul pe WhatsApp."; return; }
  const set=(id,v)=>{ const el=$(id); if(el) el.value=v; };
  set("ev-cf-email",c.email); set("ev-cf-name",c.name); set("ev-cf-phone",c.phone); set("ev-cf-city",c.city||"-");
  set("ev-cf-subject",p.subject); set("ev-cf-channel",channel); set("ev-cf-context",p.context); set("ev-cf-body",p.body);
  try{ sessionStorage.setItem("cp-neuro-sent","1"); }catch(e){}
  /* hCaptcha-ul Shopify se încarcă la primul focus pe un câmp al formularului */
  $("ev-cf-email").dispatchEvent(new FocusEvent("focusin",{bubbles:true}));
  for(let i=0;i<40 && !window.hcaptcha;i++) await new Promise(r=>setTimeout(r,250));
  await new Promise(r=>setTimeout(r,800));
  if(cf.requestSubmit) cf.requestSubmit(); else cf.submit();
}

/* ===== CONTEXT FORM ===== */
let goalVal = null, channelVal = null;
$("f-goal").querySelectorAll(".opt").forEach(b=>b.addEventListener("click",()=>{ goalVal=b.dataset.v; $("f-goal").querySelectorAll(".opt").forEach(o=>o.setAttribute("aria-checked","false")); b.setAttribute("aria-checked","true"); }));
$("f-channel").querySelectorAll(".opt").forEach(b=>b.addEventListener("click",()=>{ channelVal=b.dataset.v; $("f-channel").querySelectorAll(".opt").forEach(o=>o.setAttribute("aria-checked","false")); b.setAttribute("aria-checked","true"); }));
function validateCtx(){
  const errs=[];
  if(!goalVal) errs.push("alege obiectivul");
  if(!channelVal) errs.push("alege unde vrei răspunsul");
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($("f-email").value.trim())) errs.push("o adresă de e-mail validă");
  ["f-years","f-sleep","f-caf","f-days"].forEach(id=>{ if(!$(id).value) errs.push($(id).previousElementSibling.textContent.toLowerCase()); });
  if(!$("f-name").value.trim()) errs.push("prenumele");
  const ph=$("f-phone").value.replace(/[^\d+]/g,"");
  if(!/^(\+?40|0)?7\d{8}$/.test(ph)) errs.push("un număr de telefon valid (07xx xxx xxx)");
  if(!$("c-wa").checked||!$("c-gdpr").checked) errs.push("cele două bife de acord");
  const el=$("ctx-err"); if(errs.length){ el.hidden=false; el.textContent="Mai trebuie: "+errs.join(", ")+"."; return false; } el.hidden=true;
  state.ctx={goal:goalVal,channel:channelVal,years:$("f-years").value,sleep:$("f-sleep").value,caffeine:$("f-caf").value,days:$("f-days").value,name:$("f-name").value.trim(),city:$("f-city").value.trim(),phone:ph.replace(/^(\+?40|0)/,"0"),email:$("f-email").value.trim(),consentWa:true,consentGdpr:true};
  return true;
}

/* ===== WIRING ===== */
$("btn-start").addEventListener("click",()=>{ state.phase="A"; state.page=0; state.ansA={}; state.ansT={}; state.ansB={}; state.dom=null; state.result=null; save(); show("quiz"); renderPage(); });
$("btn-next").addEventListener("click",next);
$("btn-back").addEventListener("click",back);
$("btn-back2").addEventListener("click",()=>{ show("quiz"); renderPage(); });
$("btn-result").addEventListener("click",()=>{ if(!validateCtx()) return; buildResult(); show("result"); submit(); });

/* resume if the viewer left mid-quiz */
/* întoarcerea după formularul de contact Shopify: reafișez rezultatul cu starea trimiterii */
let sentBack=false; try{ sentBack=sessionStorage.getItem("cp-neuro-sent")==="1"; }catch(e){}
const cfState=$("ev-cf-state"), cfPosted=(cfState&&cfState.dataset.ok==="1")||/[?&]contact_posted=true/.test(location.search), cfFailed=!!(cfState&&cfState.dataset.err==="1");
if(sentBack && state.result && state.ctx && (cfPosted||cfFailed)){
  try{ sessionStorage.removeItem("cp-neuro-sent"); history.replaceState(null,"",location.pathname); }catch(e){}
  buildResult(); show("result");
  $("r-sendstatus").textContent = cfPosted
    ? (state.ctx.channel==="email" ? "Rezultatul a ajuns la mine. Îți scriu pe e-mail cu planul de pornire în cel mult 24 de ore." : "Rezultatul a ajuns la mine. Îți scriu pe WhatsApp în cel mult 24 de ore.")
    : "Nu am putut trimite rezultatul automat. Apasă butonul de mai jos și trimite-mi textul pe WhatsApp.";
}
else if(state.result && state.ctx){ /* finished before: show intro, keep data */ }
else if(answeredCount()>0 && !state.result){ show("quiz"); renderPage(); }
