// Chera Protocol – articolele 36–41 (27.10.2026): culturism competițional – offseason, ordinea exercițiilor,
// intensitate, antrenamentul din pregătire, punctele slabe, mentalitatea competitorului.
// Scrise la persoana I, ca de la Marius. Originale: inspirate din principii publice de antrenament,
// fără întâmplările sau clienții altor antrenori, fără nume de sportivi sau concursuri, fără medicamente.
// Rulează: node site/articole/_genereaza-noi-3.mjs  (din chera-coaching/)
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
const here = path.dirname(fileURLToPath(import.meta.url));
const DATA = "27.10.2026";

const A = [
{ handle: "offseason-in-faze", cat: "Antrenament", min: 6, title: "Offseason-ul nu e o singură fază: cum îl împart în blocuri",
  lead: "Un offseason de 8–10 luni făcut la fel de la prima la ultima săptămână se blochează după trei luni. Cum îl împart eu în blocuri și ce schimb între ele.",
  body: `<p>Un sportiv de-al meu a venit la mine după un offseason de zece luni în care făcuse același program, cu aceleași exerciții și același număr de serii, de la început până la sfârșit. În primele trei luni a crescut frumos. În următoarele șapte a crescut doar cântarul. Nu muncise mai puțin. Muncise la fel, iar corpul se obișnuise de mult cu „la fel”.</p>
  <p>De atunci nu mai privesc offseason-ul ca pe o perioadă. Îl privesc ca pe o succesiune de blocuri, fiecare cu un scop, iar trecerea de la unul la altul e la fel de planificată ca o pregătire de concurs.</p>
  <h2>Blocul 1: refacerea, după scenă</h2>
  <p>Primele 3–4 săptămâni după concurs. Articulațiile sunt obosite, tendoanele au dus luni de greutăți grele pe un corp fără rezerve. Aici lucrez cu volum moderat, greutăți sub maxim, repetări mai multe, mișcări care nu dor. Scopul nu e forța. E să pornesc construcția cu un corp întreg.</p>
  <h2>Blocul 2: acumularea</h2>
  <p>8–12 săptămâni în care cresc treptat volumul: încă o serie pe grupă la două-trei săptămâni, cât timp recuperarea ține pasul. E blocul în care se pune cel mai mult mușchi, pentru că mâncarea e mare și corpul tolerează bine munca. Urmăresc progresul la 3–4 exerciții de bază, nu la toate.</p>
  <h2>Blocul 3: intensificarea</h2>
  <p>După acumulare, volumul scade cu o treime, iar greutățile urcă. Mai puține serii, mai grele, mai aproape de eșec. Mușchiul construit în blocul anterior primește un stimul nou, iar articulațiile se odihnesc de numărul mare de repetări. Aici apar recordurile de forță.</p>
  <h2>Săptămânile de descărcare</h2>
  <p>La fiecare 6–8 săptămâni pun o săptămână ușoară: aceleași exerciții, jumătate din serii, greutăți cu 20–30% mai mici. Sportivii o urăsc la început. După două cicluri o cer singuri, pentru că văd că după ea vin cele mai bune antrenamente.</p>
  <blockquote>Corpul nu crește din muncă. Crește din muncă urmată de refacere. Fără refacere, munca e doar oboseală.</blockquote>
  <h2>Ce schimb între blocuri</h2>
  <ul>
    <li><strong>Exercițiile, parțial.</strong> Păstrez 2–3 pe grupă ca să pot măsura progresul și schimb restul.</li>
    <li><strong>Intervalul de repetări</strong>, de la 10–15 la 6–10 și înapoi.</li>
    <li><strong>Mâncarea</strong>, legată de bloc: mai mulți carbohidrați în acumulare, unde volumul e mare.</li>
    <li><strong>Prioritatea</strong>: grupa rămasă în urmă primește volum în plus într-un bloc întreg, nu două săptămâni.</li>
  </ul>
  <p>Un offseason bun nu arată spectaculos în nicio săptămână anume. Arată spectaculos după un an, când pui poza de la concursul trecut lângă cea de acum.</p>`,
  cta: ["Ești în offseason și nu mai crești?", "În coaching îți construiesc offseason-ul pe blocuri, legat de mâncare și de punctele tale slabe.", "Fă evaluarea gratuită", "evaluare"] },

{ handle: "ordinea-exercitiilor-izolare-intai", cat: "Antrenament", min: 5, title: "De ce încep uneori antrenamentul cu exercițiul de izolare",
  lead: "Împinsul la piept primul, apoi restul: așa a învățat toată lumea. La mulți dintre sportivii mei ordinea inversă a salvat articulațiile și a crescut mușchiul.",
  body: `<p>Un sportiv de-al meu, avansat, cu ani de sală în spate, avea umerii distruși de împinsul cu bara. Fiecare antrenament de piept începea cu 4 serii grele la împins, iar după a doua serie umărul din față prelua tot. Pieptul nu mai creștea de doi ani. Nu i-am scos împinsul. I-am schimbat locul în antrenament.</p>
  <h2>Ce înseamnă „izolare întâi”</h2>
  <p>Începi grupa cu un exercițiu care lucrează doar mușchiul țintă: fluturări la cabluri sau la aparat pentru piept, extensii pentru cvadriceps, pulldown cu brațele întinse pentru spate. 2–3 serii de 12–15, controlate, cu mușchiul simțit de la prima repetare. Abia apoi vine exercițiul compus, mai greu.</p>
  <h2>De ce funcționează</h2>
  <ul>
    <li><strong>Articulațiile pornesc încălzite.</strong> Cotul, umărul și genunchiul primesc sânge și mișcare înainte de greutatea mare.</li>
    <li><strong>Mușchiul țintă e deja activ.</strong> La exercițiul compus, pieptul sau cvadricepsul preia munca, nu mușchii ajutători.</li>
    <li><strong>Greutatea necesară scade.</strong> Același stimul cu 15–20% mai puțin pe bară, deci mai puțin stres pe încheieturi.</li>
    <li><strong>Mintea se conectează la mușchi.</strong> Cine nu „simte” o grupă o simte mult mai ușor după un exercițiu de izolare.</li>
  </ul>
  <blockquote>Nu greutatea de pe bară crește mușchiul. Tensiunea din mușchi o face. Bara e doar unealta.</blockquote>
  <h2>Când NU fac asta</h2>
  <p>La începători, care au nevoie în primul rând să învețe mișcările de bază proaspeți. În blocurile de forță, unde vreau greutatea maximă pe exercițiul compus. Și la sportivii la care mușchiul țintă răspunde bine oricum, iar articulațiile nu au probleme. Ordinea inversă e o unealtă, nu o regulă.</p>
  <h2>Cum arată concret, la piept</h2>
  <ol>
    <li>Fluturări la cabluri, 3 × 12–15, ultima serie aproape de eșec.</li>
    <li>Împins înclinat cu gantere, 3 × 8–10.</li>
    <li>Împins la aparat sau la Smith, 2–3 × 8–10.</li>
    <li>Dips cu greutatea corpului sau pullover, 2 serii, pentru întindere.</li>
  </ol>
  <p>Sportivul cu umărul distrus? În trei luni pieptul a pornit din nou. Umărul nu a mai durut la niciun antrenament. A pierdut puțin din greutatea de la împins și a câștigat ce conta: un piept care crește.</p>`,
  cta: ["Te dor articulațiile la exercițiile de bază?", "Programul se construiește pe corpul tău, inclusiv pe ce te doare. Începe cu evaluarea gratuită.", "Fă evaluarea gratuită", "evaluare"] },

{ handle: "tehnicile-de-intensitate-dozate", cat: "Antrenament", min: 5, title: "Tehnicile de intensitate: unde le pun și când le scot",
  lead: "Drop set, rest-pause, repetări parțiale. Puse la locul lor, sparg platourile. Puse peste tot, îngroapă recuperarea. Cum le dozez la sportivii mei.",
  body: `<p>Un băiat tânăr, foarte motivat, a început să lucreze cu mine după ce văzuse online antrenamente în care fiecare serie se termina cu drop set, rest-pause și repetări parțiale. Le făcea pe toate, la toate exercițiile. Era epuizat după fiecare antrenament, avea febră musculară permanent și nu crescuse nimic de jumătate de an.</p>
  <p>Tehnicile de intensitate sunt bune. Problema nu sunt ele. E doza.</p>
  <h2>Ce folosesc</h2>
  <ul>
    <li><strong>Drop set:</strong> la eșec, scad greutatea cu 20–30% și continui fără pauză. O dată sau de două ori.</li>
    <li><strong>Rest-pause:</strong> la eșec, 10–15 respirații, apoi încă câteva repetări cu aceeași greutate. Repet de 2–3 ori.</li>
    <li><strong>Repetări parțiale</strong> în zona de întindere, după ce nu mai poți face repetări complete.</li>
    <li><strong>Pauza în întindere:</strong> 2–3 secunde ținute jos, unde mușchiul e cel mai lung.</li>
  </ul>
  <h2>Regulile mele de dozare</h2>
  <ol>
    <li><strong>O singură serie cu tehnică pe exercițiu</strong>, de obicei ultima. Restul seriilor sunt normale, grele, curate.</li>
    <li><strong>Pe aparate și cabluri</strong>, nu pe genuflexiuni sau îndreptări. Unde tehnica se strică la oboseală, nu forțez.</li>
    <li><strong>Pe ultimul exercițiu al grupei</strong>, când mușchiul e deja obosit și articulațiile încălzite.</li>
    <li><strong>Cicluri, nu permanent.</strong> 3–4 săptămâni cu tehnici, apoi 3–4 săptămâni fără.</li>
  </ol>
  <blockquote>Intensitatea e un condiment. Pusă în tot, nu mai simți gustul de nimic.</blockquote>
  <h2>Semnele că sunt prea multe</h2>
  <p>Forța scade de la o săptămână la alta. Somnul se strică. Febra musculară nu mai trece între două antrenamente ale aceleiași grupe. Pofta de antrenament dispare. Când apar două dintre ele, primul lucru pe care îl scot sunt tehnicile, nu seriile normale.</p>
  <h2>Cine are nevoie de ele</h2>
  <p>Avansații, care au nevoie de un stimul nou ca să mai crească, și sportivii în pregătire, unde vreau stimul mare cu volum mai mic. Începătorii nu au nevoie de ele. Ei cresc din serii normale, făcute bine, cu greutăți care urcă de la o lună la alta.</p>
  <p>Băiatul de care spuneam? Am păstrat o singură serie cu tehnică pe grupă. În două luni a bătut toate recordurile de forță și a crescut mai mult decât în jumătatea de an dinainte.</p>`,
  cta: ["Te antrenezi mult și nu mai crești?", "Hai să vedem ce e prea mult și ce lipsește din antrenamentul tău. Începe cu evaluarea gratuită.", "Fă evaluarea gratuită", "evaluare"] },

{ handle: "antrenamentul-in-ultimele-12-saptamani", cat: "Pregătire de concurs", min: 6, title: "Cum se schimbă antrenamentul în ultimele 12 săptămâni",
  lead: "În pregătire, mulți trec pe „multe repetări, greutăți mici, ca să mă definesc”. E una dintre cele mai sigure căi să pierzi mușchi. Ce păstrez și ce schimb eu.",
  body: `<p>Mitul pe care îl aud aproape la fiecare sportiv nou: „În definire lucrezi cu greutăți mici și repetări multe, ca să se vadă mușchiul.” Nu greutățile mici definesc mușchiul. Dieta face asta. Greutățile mici îi spun corpului că nu mai are nevoie de mușchiul pe care l-ai construit, iar într-un deficit corpul ascultă repede.</p>
  <h2>Ce păstrez: greutatea</h2>
  <p>Prima regulă a antrenamentului din pregătire: greutățile rămân cât mai sus, cât mai mult timp. Exercițiile de bază din offseason rămân în program, cu aceleași intervale de repetări. Dacă forța se ține în primele două luni de dietă, știu că păstrăm mușchiul. Dacă scade mult, ceva nu e bine la mâncare sau la recuperare.</p>
  <h2>Ce schimb: volumul</h2>
  <p>Volumul scade treptat, cu 20–30% față de offseason. Mai puține serii pe grupă, nu mai ușoare. Recuperarea într-un deficit e mai slabă, iar volumul mare de offseason într-un corp fără rezerve duce la oboseală, la dureri și la accidentări, nu la mușchi.</p>
  <blockquote>În pregătire, antrenamentul nu construiește. Păstrează. Iar ca să păstrezi, trebuie să-i arăți corpului în continuare că are nevoie de mușchi.</blockquote>
  <h2>Ce schimb: exercițiile riscante</h2>
  <p>Spre final, când grăsimea e jos și articulațiile au mai puțină protecție, scot sau înlocuiesc exercițiile cu risc mare: îndreptările grele, genuflexiunile foarte grele la cei cu genunchi sensibili, împinsul cu bara la cei cu umeri obosiți. O accidentare cu patru săptămâni înainte de concurs înseamnă fără concurs.</p>
  <h2>Săptămână cu săptămână</h2>
  <ul>
    <li><strong>12–8 săptămâni:</strong> antrenament aproape ca în offseason, volum puțin redus, greutăți păstrate.</li>
    <li><strong>8–4 săptămâni:</strong> volum redus cu încă o serie pe grupă, exercițiile riscante înlocuite, tehnicile de intensitate folosite rar.</li>
    <li><strong>4–1 săptămâni:</strong> antrenamente mai scurte, greutăți încă serioase pe aparate, accent pe contracție și pe posing după antrenament.</li>
    <li><strong>Ultima săptămână:</strong> ultimul antrenament greu cu 5–6 zile înainte, apoi pompare ușoară și posing.</li>
  </ul>
  <h2>Recuperarea devine antrenament</h2>
  <p>Somnul, pașii zilnici fără exces, masajul, mobilitatea: în pregătire, toate astea au aceeași greutate ca seriile din sală. Un sportiv care doarme cinci ore și face trei antrenamente pe zi „ca să ardă” nu se definește mai bine. Se strică mai repede.</p>`,
  cta: ["Ești în pregătire și pierzi forță?", "În coaching ajustez antrenamentul săptămână de săptămână, împreună cu dieta, ca să ajungi pe scenă cu tot mușchiul.", "Fă evaluarea gratuită", "evaluare"] },

{ handle: "punctele-slabe-se-lucreaza-in-offseason", cat: "Coaching", min: 5, title: "Punctele slabe se lucrează în offseason, nu pe scenă",
  lead: "Juriul nu se uită la ce ai bun. Se uită la ce lipsește. Cum găsesc punctele slabe ale unui sportiv și cum le dau prioritate un an întreg.",
  body: `<p>O fată de bikini pe care am preluat-o după primul ei concurs avea o talie foarte mică și picioare bine construite, dar umeri aproape inexistenți. Pe scenă, de la distanță, arăta „îngustă” sus, iar linia pe care o caută juriul nu exista. Ea lucra umerii o dată pe săptămână, la finalul antrenamentului de piept, când nu mai avea energie. Fesierii, pe care îi avea deja buni, primeau trei antrenamente pe săptămână.</p>
  <p>E cea mai des întâlnită problemă la sportivii care se antrenează singuri: lucrează ce le place, adică ce au deja bun.</p>
  <h2>Cum găsesc punctele slabe</h2>
  <ol>
    <li><strong>Poze din toate pozele obligatorii</strong>, nu din cele preferate. Ce nu arată bine în poza de spate nu se vede în oglinda din față.</li>
    <li><strong>Comparația cu categoria</strong>: ce cere juriul la bikini, la classic sau la culturism. Un punct slab e relativ la categoria în care concurezi.</li>
    <li><strong>Simetria</strong>: stânga față de dreapta, sus față de jos, față față de spate.</li>
    <li><strong>Pozele de la concursurile trecute</strong>, dacă există. Acolo, sub lumini, se vede cinstit ce lipsește.</li>
  </ol>
  <h2>Ce înseamnă prioritate, concret</h2>
  <ul>
    <li><strong>Frecvență mai mare:</strong> grupa slabă se lucrează de două ori pe săptămână, nu o dată.</li>
    <li><strong>Prima în antrenament</strong>, când ești proaspăt, nu ultima.</li>
    <li><strong>Volum mai mare</strong>, luat din grupele care sunt deja bune, care trec pe menținere.</li>
    <li><strong>Exerciții alese pentru ea</strong>, nu exercițiile preferate ale sportivului.</li>
  </ul>
  <blockquote>Ca să urci un loc pe scenă, de cele mai multe ori nu trebuie să fii mai bun la ce ai. Trebuie să nu mai fii slab la ce îți lipsește.</blockquote>
  <h2>Cât durează</h2>
  <p>Un punct slab nu se repară într-o lună. Îi dau cel puțin un offseason întreg, cu poze comparative la fiecare 8 săptămâni. Fata de bikini a lucrat umerii de două ori pe săptămână, primii în antrenament, timp de zece luni. La următorul concurs, linia umeri–talie era cea mai bună din categorie. Fesierii au rămas la fel de buni, pe menținere.</p>
  <h2>Partea grea</h2>
  <p>Să accepți că grupa ta preferată stă pe menținere un an. Sportivii buni o acceptă, pentru că pe scenă nu primești puncte pentru ce îți place să antrenezi.</p>`,
  cta: ["Nu știi care e punctul tău slab pe scenă?", "Trimite-mi pozele la evaluare. Îți spun cinstit ce văd și cum l-aș lucra.", "Fă evaluarea gratuită", "evaluare"] },

{ handle: "mentalitatea-competitorului", cat: "Mindset", min: 5, title: "Ce îi deosebește pe cei care ajung pe scenă de cei care renunță",
  lead: "Nu genetica și nu motivația din prima lună. După zece ani de pregătiri, cele cinci lucruri pe care le văd la toți sportivii mei care ajung până la capăt.",
  body: `<p>În zece ani am văzut sportivi cu genetică excepțională care au renunțat după două luni și sportivi cu genetică obișnuită care au ajuns, sezon după sezon, tot mai sus. La început credeam că diferența e motivația. Nu e. Motivația o au toți în prima lună. Diferența apare în luna a patra, când motivația s-a dus și rămâne doar ce ai construit în jurul ei.</p>
  <h2>1. Fac și zilele plictisitoare</h2>
  <p>Pregătirea e făcută în proporție de nouăzeci la sută din zile la fel: aceeași mâncare, aceeași oră, același antrenament. Cei care ajung pe scenă nu au nevoie ca fiecare zi să fie interesantă. Au nevoie doar ca fiecare zi să fie făcută.</p>
  <h2>2. Spun adevărul la check-in</h2>
  <p>Inclusiv când au greșit. Un sportiv care îmi spune „am mâncat în plus sâmbătă” e un sportiv pe care îl pot ajuta. Unul care ascunde lucrează, fără să știe, împotriva propriei pregătiri.</p>
  <h2>3. Nu negociază cu planul în fiecare zi</h2>
  <p>Întrebările le pun o dată pe săptămână, la check-in, nu în fiecare seară când le e foame. Decizia s-a luat deja. Nu o mai iau din nou de zece ori pe zi.</p>
  <blockquote>Disciplina nu e să lupți cu tine în fiecare zi. E să nu mai fie nevoie să lupți, pentru că ai hotărât deja.</blockquote>
  <h2>4. Văd concursul ca pe o etapă, nu ca pe un final</h2>
  <p>Cei care renunță trăiesc concursul ca pe ultima zi din viață. Cei care rămân în sport îl văd ca pe un examen: arată ce a mers, ce nu și ce lucrăm în offseason. Un loc slab nu îi oprește. Le dă lista de lucru pentru anul următor.</p>
  <h2>5. Au o viață în jurul pregătirii</h2>
  <p>Familie, muncă, prieteni care știu ce fac și îi susțin. Sportivii care își pun toată identitatea în pregătire se rup la prima problemă. Cei care o integrează într-o viață normală o duc până la capăt și o iau de la capăt anul următor.</p>
  <h2>Ce înseamnă pentru tine</h2>
  <p>Dacă vrei să urci pe scenă, nu te întreba dacă ești suficient de motivat. Întreabă-te dacă poți face aceeași zi bună de o sută de ori la rând. Un test simplu, înainte să începi:</p>
  <ul>
    <li>Pot mânca la aceleași ore, cântărit, 16–20 de săptămâni?</li>
    <li>Pot spune adevărul la check-in, inclusiv când am greșit?</li>
    <li>Am oamenii din jurul meu de partea mea?</li>
    <li>Pot accepta un loc slab ca pe o lecție, nu ca pe un capăt de drum?</li>
  </ul>
  <p>Dacă răspunsul e da la toate patru, restul se învață.</p>`,
  cta: ["Vrei să urci pe scenă și nu știi dacă ești pregătit?", "Hai să vorbim cinstit despre unde ești și cât e de mers. Începe cu evaluarea gratuită.", "Fă evaluarea gratuită", "evaluare"] },
];

const href = h => h === "evaluare" ? "../evaluare.html" : h === "programe" ? "../index.html#programe" : "../index.html" + h;
for (const a of A) {
  const html = `<!doctype html>
<html lang="ro">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${a.title} · Chera Protocol</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&family=Barlow:wght@400;500;600&display=swap">
<link rel="stylesheet" href="articol.css">
</head>
<body>
<nav><div class="in"><a class="brand" href="../index.html">Chera <b>Protocol</b></a><a class="btn" href="../index.html#evaluare">Evaluare gratuită</a></div></nav>
<div class="in">
<header class="art">
  <p class="eyebrow">${a.cat} · ${DATA} · ${a.min} minute</p>
  <h1>${a.title}</h1>
  <div class="by"><img src="../img/marius-profil-150.jpg" alt="Marius Chera"><span>Marius Chera · antrenor, 10 IFBB Pro pregătiți</span></div>
</header>
<article>
  ${a.body.trim()}
  <div class="cta">
    <h3>${a.cta[0]}</h3>
    <p>${a.cta[1]}</p>
    <a class="btn" href="${href(a.cta[3])}" style="justify-self:start">${a.cta[2]}</a>
  </div>
</article>
</div>
</body>
</html>
`;
  writeFileSync(path.join(here, a.handle + ".html"), html);
}
writeFileSync(path.join(here, "_noi-lista-3.json"), JSON.stringify(A.map(a => ({ handle: a.handle, cat: a.cat, title: a.title, lead: a.lead })), null, 1));
console.log(A.length, "articole noi (36–41)");
for (const a of A) console.log(a.handle.padEnd(48), a.cat.padEnd(22), a.body.length);
