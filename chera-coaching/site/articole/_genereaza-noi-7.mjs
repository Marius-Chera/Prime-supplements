// Chera Protocol – articolele 46–50 (28.10.2026): anti-aging, din cartea lui Marius „Dieta Anti-Aging”.
// Originale, la persoana I. Liniile roșii din carte/GHID-CARTE-SI-VOCE.md: fără medicamente pe rețetă,
// fără promisiuni medicale, avertismente la suplimentele cu efect pe sânge și „discută cu medicul” la analize,
// fără niciun nume de autor sau antrenor, fără rând de sursă.
// Rulează: node site/articole/_genereaza-noi-7.mjs  (din chera-coaching/), apoi node site/tools/articole-json.mjs
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
const here = path.dirname(fileURLToPath(import.meta.url));
const DATA = "28.10.2026";

const A = [
{ handle: "muschiul-organul-longevitatii", cat: "Anti-aging", min: 6, title: "Mușchiul, cel mai bun „anti-aging” pe care îl știu",
  lead: "Nu o cremă, nu o pastilă: masa musculară e lucrul care te ține tânăr cel mai mult. De ce le cer și oamenilor de 50 de ani să ridice greutăți.",
  body: `<p>Un client de 52 de ani a venit la mine cu o listă lungă de suplimente „pentru întinerire” și cu un singur fel de mișcare: mers pe bandă, o oră pe zi. Era slab pe cântar, dar moale, obosit și cu glicemia la limită. Primul lucru pe care l-am schimbat nu a fost lista de suplimente. L-am pus să ridice greutăți de trei ori pe săptămână.</p>
  <p>După un an arăta cu zece ani mai tânăr. Nu din cauza unui produs, ci pentru că pusese câteva kilograme de mușchi și dăduse jos grăsimea din jurul taliei. Analizele lui s-au îmbunătățit și ele, iar medicul lui a fost primul care l-a întrebat ce a schimbat.</p>
  <h2>De ce numesc mușchiul „organul tinereții”</h2>
  <p>După 30 de ani, fără antrenament, pierdem în fiecare deceniu o parte din masa musculară. Odată cu ea pierdem forță, echilibru, metabolism și, mai ales, felul în care corpul folosește zahărul. Mușchiul e locul unde se duce cea mai mare parte din glucoza pe care o mâncăm. Cu cât ai mai mult mușchi, și cu cât îl folosești mai des, cu atât îți ține glicemia mai stabilă.</p>
  <blockquote>Mușchiul e singurul „cont de economii” pentru bătrânețe în care poți depune la orice vârstă.</blockquote>
  <h2>Ce face antrenamentul greu pentru tine</h2>
  <ul>
    <li><strong>Deschide mușchiul pentru carbohidrați.</strong> După un antrenament greu, mușchiul „trage” zahărul din sânge ca un burete. De aceea la sportivii mei masa cu carbohidrați vine după sală.</li>
    <li><strong>Ține metabolismul sus.</strong> Un corp cu mai mult mușchi consumă mai mult și în repaus.</li>
    <li><strong>Protejează articulațiile și oasele</strong>, dacă tehnica e bună și tempo-ul controlat.</li>
    <li><strong>Îți schimbă starea.</strong> Antrenamentul greu scade stresul acumulat peste zi, iar somnul de după e mai adânc.</li>
  </ul>
  <h2>Cum arată antrenamentul pe care îl dau după 40–50 de ani</h2>
  <ol>
    <li><strong>3–4 antrenamente pe săptămână</strong>, de 50–60 de minute, nu două ore.</li>
    <li><strong>Greutăți care te opresc la 6–10 repetări</strong> la exercițiile principale. Mușchiul răspunde la tensiune, nu la „multe repetări ușoare”.</li>
    <li><strong>Coborâre lentă</strong>, 3–4 secunde, ridicare controlată. Așa protejezi articulațiile și lucrezi mai mult mușchiul cu mai puțină greutate.</li>
    <li><strong>Exerciții în pereche</strong>: un împins urmat de un tras, cu pauză între ele. Mai multă muncă în mai puțin timp.</li>
    <li><strong>Mers zilnic</strong> pentru inimă și digestie, dar ca adaos, nu în locul greutăților.</li>
  </ol>
  <h2>Și mâncarea?</h2>
  <p>Fără proteine suficiente, antrenamentul nu are din ce să construiască. Le cer clienților mei de peste 40 de ani cel puțin 1,6–2 g de proteine pe kilogram, împărțite în 3–4 mese. La vârsta asta corpul răspunde mai greu la proteine, deci porțiile mici „din politețe” nu ajung.</p>
  <h2>Când să începi</h2>
  <p>Acum. Am clienți care au început la 45, la 55 și la 60 de ani, și toți au pus mușchi. Mai încet decât la 25, dar l-au pus. Dacă ai o problemă de sănătate, vorbește întâi cu medicul tău despre efort. Apoi vino să lucrăm.</p>
  <p class="src">Exemplul e din practica mea, cu detaliile schimbate.</p>`,
  cta: ["Ai trecut de 40 de ani și vrei să începi corect?", "Evaluarea gratuită îmi arată de unde pornești. Îți fac un plan de forță potrivit vârstei și corpului tău.", "Fă evaluarea gratuită", "evaluare"] },

{ handle: "insulina-jos-o-parte-din-zi", cat: "Anti-aging", min: 6, title: "Insulina jos o parte din zi: cum îmi împart ziua în trei",
  lead: "Dimineața „vânător”, după-amiaza „atlet”, seara „om care se odihnește”. Felul în care îmi construiesc ziua ca să țin insulina sub control fără să trăiesc la regim.",
  body: `<p>Mulți oameni vin la mine mâncând „sănătos” de dimineață până seara: ovăz cu fructe la micul dejun, sandviș integral la prânz, batoane „fitness” între mese, paste seara. Pe hârtie, nimic rău. În realitate, insulina lor nu coboară aproape deloc toată ziua. Sunt obosiți la ora 11, flămânzi la ora 16 și nu înțeleg de ce nu slăbesc.</p>
  <p>Insulina e un hormon de care avem nevoie. Problema nu e că există, ci că, la mulți dintre noi, stă sus de dimineața până seara. Din ce am văzut în ani de lucru cu oameni de toate vârstele, una dintre cele mai bune schimbări pentru sănătate și pentru siluetă e să ai câteva ore pe zi în care insulina stă jos.</p>
  <h2>Dimineața: „vânătorul”</h2>
  <p>Prima parte a zilei o construiesc pe proteine și grăsimi bune: ouă, carne, brânză, pește, legume, o mână de nuci, cafea fără zahăr. Fără cereale, fără fructe, fără pâine. Insulina rămâne jos, energia e stabilă, mintea e limpede. Clienții îmi spun aproape toți același lucru după două săptămâni: „Nu mai am căderea de la ora 11.”</p>
  <h2>După-amiaza: „atletul”</h2>
  <p>Antrenamentul greu îl pun, când se poate, între 16 și 18. E momentul în care corpul e cel mai pregătit pentru efort, iar după el mușchiul e „deschis” pentru carbohidrați. O gustare mică dinainte, tot din proteine și grăsimi, ajunge.</p>
  <h2>Seara: „omul care se odihnește”</h2>
  <p>După antrenament vine masa cu carbohidrați: orez, cartofi, paste, fructe. Atunci corpul îi trimite în mușchi, nu în depozite. Și mai e un câștig: o masă bună seara calmează sistemul nervos și ajută somnul. Oamenii care țin dietă cu foame seara dorm prost și se trezesc obosiți.</p>
  <blockquote>Carbohidrații nu sunt dușmanul. Doar trebuie meritați și puși la locul lor în zi.</blockquote>
  <h2>Reguli pe care le aplic</h2>
  <ul>
    <li><strong>În zilele fără antrenament</strong>, cina e simplă: proteine, legume, grăsimi bune, puțini carbohidrați.</li>
    <li><strong>O dată pe săptămână</strong> poate fi o masă mai bogată, planificată, ca să nu trăiești cu senzația de regim.</li>
    <li><strong>Masa de seară se termină cu 2–3 ore înainte de somn.</strong></li>
    <li><strong>Apa se bea mai ales până seara</strong>, ca să nu te trezești noaptea.</li>
  </ul>
  <h2>Cui nu i se potrivește</h2>
  <p>Oamenilor care lucrează în ture de noapte, celor care se antrenează devreme dimineața (la ei mut fereastra de carbohidrați după antrenament) și celor care au diabet sau iau medicamente pentru glicemie. Pentru ultimii, orice schimbare a meselor se discută întâi cu medicul. Eu sunt antrenor, nu medic.</p>
  <p class="src">Exemplele sunt din practica mea, cu detaliile schimbate.</p>`,
  cta: ["Vrei o zi construită pe programul tău real?", "Evaluarea gratuită îmi arată cum tolerezi carbohidrații. De acolo îți împart ziua.", "Fă evaluarea gratuită", "evaluare"] },

{ handle: "analizele-la-6-luni", cat: "Anti-aging", min: 7, title: "Analizele pe care le cer clienților mei la fiecare 6 luni",
  lead: "Oglinda îți spune cum arăți. Analizele îți spun cum îmbătrânești. Lista pe care o dau clienților mei, ce arată fiecare și de ce la sportivi cer și cistatina C.",
  body: `<p>Un sportiv de-al meu arăta impecabil: uscat, plin, puternic. La analizele de rutină, creatinina a ieșit peste limită, iar medicul de familie s-a îngrijorat pentru rinichi. Am cerut o analiză în plus, cistatina C. A ieșit perfect normală. Creatinina lui era mare din cauza masei musculare și a antrenamentului din ziua dinainte, nu a rinichilor. De atunci, lista mea de analize are câteva reguli în plus.</p>
  <p>Nu pun diagnostice. Asta e treaba medicului. Dar le cer clienților mei să-și facă analizele de două ori pe an și să le discute cu medicul, pentru că a ști e mult mai bine decât a ghici.</p>
  <h2>Zahărul și insulina</h2>
  <ul>
    <li><strong>Glicemia a jeun</strong>, dimineața, pe nemâncate.</li>
    <li><strong>Insulina a jeun.</strong> Mulți o sar. Poate fi crescută ani de zile înainte ca glicemia să se strice.</li>
    <li><strong>Hemoglobina glicată (HbA1c)</strong>: media zahărului pe ultimele aproximativ trei luni.</li>
    <li><strong>Indicele HOMA-IR</strong>, calculat din glicemie și insulină, care arată cât de sensibil ești la insulină.</li>
  </ul>
  <h2>Rinichii, mai ales la sportivi</h2>
  <ul>
    <li><strong>Creatinina și eGFR.</strong> La oamenii cu multă masă musculară, la cei care iau creatină sau mănâncă multă carne, creatinina iese adesea mai mare fără să fie o problemă.</li>
    <li><strong>Cistatina C.</strong> Nu depinde de mușchi, deci arată mai corect cum lucrează rinichii la un sportiv.</li>
    <li><strong>Acidul uric și sumarul de urină.</strong></li>
  </ul>
  <h2>Inima, vasele și inflamația</h2>
  <ul>
    <li><strong>Profilul lipidic</strong>: colesterol total, HDL, LDL, trigliceride.</li>
    <li><strong>hs-CRP</strong>, proteina C reactivă de înaltă sensibilitate: un semnal al inflamației din corp.</li>
    <li><strong>Fibrinogenul.</strong></li>
  </ul>
  <h2>Ficatul și stresul</h2>
  <ul>
    <li><strong>ALAT, ASAT, GGT</strong> pentru ficat.</li>
    <li><strong>Cortizolul de dimineață</strong>, la cei care dorm prost sau trăiesc mult timp sub presiune.</li>
    <li><strong>Magneziul</strong>, pentru că la sportivi iese des la limita de jos.</li>
  </ul>
  <blockquote>Valorile „normale” de pe buletin îți spun că nu ești bolnav. Nu îți spun că ești în cea mai bună formă.</blockquote>
  <h2>Cum te pregătești ca rezultatele să fie corecte</h2>
  <ol>
    <li><strong>Fără antrenament greu de picioare cu 24 de ore înainte.</strong> Ridică creatinina și enzimele musculare.</li>
    <li><strong>Pe nemâncate, dimineața</strong>, după o seară fără exces de mâncare sau alcool.</li>
    <li><strong>Apă normală</strong>, nici prea puțină, nici în exces.</li>
    <li><strong>Spune-i medicului</strong> ce suplimente iei, inclusiv creatina.</li>
  </ol>
  <h2>Ce faci cu rezultatele</h2>
  <p>Le duci la medic și le discutați împreună. Valorile „optime” pe care le citești pe internet sunt repere, nu diagnostice. Eu folosesc analizele ca să văd dacă planul de mâncare și de antrenament merge în direcția bună. Dacă trigliceridele scad, insulina coboară și inflamația se liniștește în șase luni, știu că am construit ceva sănătos, nu doar ceva frumos în oglindă.</p>
  <p class="src">Exemplul e din practica mea, cu detaliile schimbate.</p>`,
  cta: ["Vrei un plan care se vede și la analize, nu doar în oglindă?", "Începe cu evaluarea gratuită. Construim împreună un plan pe care îl urmărim și prin analizele tale.", "Fă evaluarea gratuită", "evaluare"] },

{ handle: "rutina-de-seara-somn-profund", cat: "Anti-aging", min: 6, title: "Rutina mea de seară pentru un somn adânc",
  lead: "Somnul e momentul în care corpul se repară. Ora mesei, temperatura camerei, ecranele și cele câteva suplimente simple pe care le folosesc seara.",
  body: `<p>O clientă de-a mea făcea totul bine: mânca atent, se antrena de patru ori pe săptămână, bea apă. Și totuși se trezea obosită în fiecare dimineață și nu mai slăbea. Când am întrebat-o cum arată ultima oră dinaintea somnului, răspunsul a fost: cina la 22:30, telefonul în pat până după miezul nopții, camera la 24 de grade. Nu i-am schimbat dieta. I-am schimbat seara.</p>
  <p>În trei săptămâni dormea neîntrerupt, iar kilogramele au început să plece din nou. Somnul nu e timp pierdut. E timpul în care corpul repară mușchii, își reglează hormonii și își face „curățenia” zilei.</p>
  <h2>Masa de seară, cu 2–3 ore înainte de culcare</h2>
  <p>La sportivii mei, masa de seară e de obicei cea mai bogată în carbohidrați, după antrenament. E bine: o masă bună seara liniștește sistemul nervos și ajută adormirea. Dar dacă te culci imediat după ea, digestia îți fură somnul adânc. Regula mea: ultima masă cu 2–3 ore înainte de somn.</p>
  <h2>Camera rece și întunecată</h2>
  <ul>
    <li><strong>18–19 grade</strong> în dormitor. Corpul trebuie să-și scadă puțin temperatura ca să intre în somn adânc.</li>
    <li><strong>Întuneric complet</strong>: draperii groase sau o mască de somn.</li>
    <li><strong>Liniște</strong>, sau un zgomot constant, dacă locuiești într-un loc gălăgios.</li>
  </ul>
  <h2>Ecranele: ultima oră fără ele</h2>
  <p>Lumina puternică seara îi spune creierului că e încă zi. Ultima oră înainte de somn o petrec fără telefon și fără televizor: citesc, vorbesc cu familia, pregătesc lucrurile pentru a doua zi. Dacă trebuie neapărat să folosești telefonul, pune-l pe lumina caldă și redu luminozitatea.</p>
  <blockquote>Nu poți repara noaptea cu o cafea mai tare dimineața.</blockquote>
  <h2>Suplimentele pe care le folosesc seara</h2>
  <ul>
    <li><strong>Magneziu</strong> sub formă de glicinat, cu 30–60 de minute înainte de culcare. Relaxează mușchii și ajută adormirea.</li>
    <li><strong>Glicina</strong>, 3 g, la cei care adorm greu.</li>
    <li><strong>Zincul</strong>, la sportivii care transpiră mult și se antrenează greu.</li>
  </ul>
  <p>Nu sunt pastile de dormit și nu înlocuiesc nimic din ce am scris mai sus. Dacă iei medicamente, dacă ești însărcinată sau dacă ai o problemă de sănătate, întreabă medicul înainte de orice supliment.</p>
  <h2>Rutina, pas cu pas</h2>
  <ol>
    <li><strong>Ora 19:30–20:00:</strong> ultima masă.</li>
    <li><strong>Ora 21:30:</strong> magneziu, lumini mai slabe în casă, telefonul pus deoparte.</li>
    <li><strong>Ora 22:00:</strong> duș cald, cameră aerisită și răcită.</li>
    <li><strong>Ora 22:30:</strong> stingerea luminilor. Aceeași oră și în weekend, cât se poate.</li>
  </ol>
  <p>Dacă după câteva săptămâni de rutină bună tot dormi prost, sforăi puternic sau te trezești sufocat, mergi la medic. Uneori problema nu e rutina, ci ceva ce trebuie verificat.</p>
  <p class="src">Exemplul e din practica mea, cu detaliile schimbate.</p>`,
  cta: ["Dormi prost și nu mai slăbești?", "În coaching mă uit la tot: masă, antrenament, somn. Începe cu evaluarea gratuită.", "Fă evaluarea gratuită", "evaluare"] },

{ handle: "antrenament-dupa-40-de-ani", cat: "Anti-aging", min: 6, title: "Antrenament greu după 40 de ani: ce păstrez și ce schimb",
  lead: "După 40 de ani poți încă să te antrenezi greu și să arăți foarte bine. Doar că recuperarea devine jumătate din antrenament. Cum lucrez cu sportivii mei din categoria Masters.",
  body: `<p>Am câțiva sportivi care urcă pe scenă la categoria Masters, peste 40 de ani. Unul dintre ei mi-a spus la prima discuție: „Mă antrenez ca la 25 de ani și nu înțeleg de ce mă doare tot și nu mai cresc.” Aici era problema. Corpul lui nu mai era cel de la 25 de ani, dar antrenamentul și recuperarea rămăseseră aceleași.</p>
  <p>După 40 de ani poți încă să pui mușchi și să arăți excelent. Am văzut-o de multe ori. Dar regulile se schimbă puțin, iar cine nu le schimbă se accidentează sau stagnează.</p>
  <h2>Ce păstrez</h2>
  <ul>
    <li><strong>Intensitatea.</strong> Greutăți serioase, serii aproape de eșec. Mușchiul nu crește din antrenamente „de întreținere”.</li>
    <li><strong>Exercițiile de bază</strong>, adaptate la articulații: împinsuri, trageri, genuflexiuni sau presă, îndreptări cu greutate moderată.</li>
    <li><strong>Proteinele sus</strong>, la 1,8–2,2 g pe kilogram.</li>
  </ul>
  <h2>Ce schimb</h2>
  <ul>
    <li><strong>Mai puțin volum.</strong> 10–14 serii pe grupă pe săptămână, nu 20.</li>
    <li><strong>Încălzire mai lungă</strong>: 10 minute de mișcare și 2–3 serii ușoare înaintea exercițiului principal.</li>
    <li><strong>Tempo controlat</strong>, cu coborâre de 3–4 secunde. Mai puțină greutate pe bară, același efect pe mușchi.</li>
    <li><strong>Exerciții prietenoase cu articulațiile</strong>: gantere în loc de bară, aparate și cabluri unde umărul sau genunchiul protestează.</li>
    <li><strong>O săptămână ușoară la fiecare 5–6 săptămâni.</strong></li>
  </ul>
  <blockquote>După 40 de ani nu te antrenezi mai puțin serios. Te antrenezi mai inteligent.</blockquote>
  <h2>Inflamația și recuperarea</h2>
  <p>Durerile care nu trec de la un antrenament la altul, somnul prost și forța care scade sunt semne că recuperarea nu ține pasul. Înainte de orice supliment, mă uit la trei lucruri: somnul, cantitatea de mâncare și stresul. Dacă astea sunt în ordine, abia apoi adaug ceva:</p>
  <ul>
    <li><strong>Omega-3</strong> din pește gras sau din capsule.</li>
    <li><strong>Curcumina</strong>, la cei cu dureri articulare după antrenamente grele.</li>
    <li><strong>Magneziu</strong> seara, pentru somn și pentru crampe.</li>
    <li><strong>Vitamina D</strong> iarna, după analize.</li>
  </ul>
  <p>Omega-3 în doze mari și curcumina pot influența coagularea. Dacă iei anticoagulante sau ai o operație programată, întreabă medicul înainte să le iei.</p>
  <h2>Săptămâna-tip pe care o folosesc</h2>
  <ol>
    <li><strong>Luni:</strong> partea de sus a corpului, greu.</li>
    <li><strong>Marți:</strong> mers 45–60 de minute și mobilitate.</li>
    <li><strong>Miercuri:</strong> picioare.</li>
    <li><strong>Joi:</strong> odihnă activă.</li>
    <li><strong>Vineri:</strong> partea de sus a corpului, alte exerciții.</li>
    <li><strong>Sâmbătă:</strong> picioare ușor sau întreg corpul, moderat.</li>
    <li><strong>Duminică:</strong> odihnă.</li>
  </ol>
  <p>Sportivul de la început a redus volumul cu o treime și a început să doarmă opt ore. După patru luni nu-l mai durea nimic și a pus pe el mai mult mușchi decât în ultimii trei ani.</p>
  <p class="src">Exemplul e din practica mea, cu detaliile schimbate.</p>`,
  cta: ["Ai trecut de 40 și vrei să arăți mai bine ca acum 10 ani?", "Fă evaluarea gratuită și construim un plan de antrenament și recuperare potrivit vârstei tale.", "Fă evaluarea gratuită", "evaluare"] },
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
writeFileSync(path.join(here, "_noi-lista-7.json"), JSON.stringify(A.map(a => ({ handle: a.handle, cat: a.cat, title: a.title, lead: a.lead })), null, 1));
console.log(A.length, "articole noi (46–50)");
for (const a of A) console.log(a.handle.padEnd(48), a.cat.padEnd(22), a.body.length);
