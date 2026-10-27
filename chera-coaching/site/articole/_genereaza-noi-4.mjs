// Chera Protocol – articolele 42–43 (27.10.2026): două antrenamente pe zi; cardio dimineața și sala seara.
// Legate de cartea lui Marius „Dieta Anti-Aging” (carbohidrații se merită, cortizolul, dimineața „vânătorului”).
// Regula proprietarului (27.10 seara): ideile sunt prezentate ca ale lui, fără a numi niciun antrenor, autor sau carte străină.
// Originale, la persoana I, fără text preluat din carte, fără nume de clienți, fără medicamente.
// Rulează: node site/articole/_genereaza-noi-4.mjs  (din chera-coaching/), apoi node site/tools/articole-json.mjs
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
const here = path.dirname(fileURLToPath(import.meta.url));
const DATA = "27.10.2026";

const A = [
{ handle: "doua-antrenamente-pe-zi", cat: "Antrenament", min: 7, title: "Două antrenamente pe zi în loc de unul: când merită și când e doar oboseală în plus",
  lead: "Aceeași muncă, împărțită în două sesiuni scurte, poate construi mai mult decât o sesiune lungă. Dar numai la omul potrivit. Cum decid eu cine primește dubla.",
  body: `<p>Un sportiv avansat de-al meu se antrena câte două ore și ceva, o dată pe zi. Primele 50 de minute erau excelente: greutăți bune, tehnică curată, concentrare. După ora asta, totul se schimba. Greutățile scădeau, pauzele se lungeau, iar ultimele exerciții le făcea „ca să fie făcute”. Volumul pe hârtie era mare. Volumul care conta cu adevărat era jumătate.</p>
  <p>Nu i-am scos nicio serie. I-am tăiat antrenamentul în două: o sesiune dimineața, una seara, fiecare de 50–60 de minute. În șase săptămâni greutățile de lucru au urcat la aproape toate exercițiile, iar el îmi spunea că, pentru prima dată după mult timp, termina antrenamentul cu poftă, nu cu silă.</p>
  <h2>Ce am înțeles în ani de pregătiri</h2>
  <p>Un antrenament lung își pierde calitatea. Energia, concentrarea și rezervele de glicogen din mușchi nu țin la nesfârșit. După un punct, nu mai construiești, doar obosești. Am văzut asta la zeci de sportivi, inclusiv la mine. Concluzia mea e simplă: la un sportiv avansat care are nevoie de mult volum, nu îl înghesui într-o singură sesiune, îl împart.</p>
  <p>Am verificat ideea pe mai multe sezoane, cu același volum săptămânal făcut fie într-o singură sesiune pe zi, fie împărțit în două. La sportivii potriviți, varianta cu două sesiuni a adus mai multă forță și mai mult mușchi. Nu e o lege pentru toată lumea, dar e o unealtă pe care o folosesc des.</p>
  <blockquote>Nu ai nevoie de mai multă muncă. Ai nevoie ca toată munca pe care o faci deja să fie de calitate.</blockquote>
  <h2>De ce funcționează</h2>
  <ul>
    <li><strong>Două vârfuri de intensitate în loc de unul.</strong> Fiecare sesiune începe cu sistemul nervos proaspăt și cu mușchii plini.</li>
    <li><strong>Două mese după efort.</strong> După fiecare sesiune vine o masă cu proteine și carbohidrați, exact când mușchiul îi folosește cel mai bine. E principiul din cartea mea: carbohidrații se merită, iar cu două antrenamente îi meriți de două ori.</li>
    <li><strong>Sesiuni mai scurte, stres mai mic.</strong> Un antrenament de două ore și jumătate, pe o dietă strânsă, ține cortizolul sus mult timp. Două sesiuni de 50 de minute, cu mâncare și odihnă între ele, se duc mult mai ușor.</li>
    <li><strong>Atenție mai bună la grupele slabe.</strong> Pot pune grupa rămasă în urmă singură, într-o sesiune întreagă, când sportivul e odihnit.</li>
  </ul>
  <h2>Cui NU îi dau două antrenamente pe zi</h2>
  <ul>
    <li><strong>Începătorilor.</strong> Ei cresc din aproape orice stimul bine făcut. O sesiune pe zi le ajunge din plin.</li>
    <li><strong>Celor care dorm sub 7 ore.</strong> A doua sesiune se plătește din recuperare. Fără somn, dubla doar adâncește oboseala.</li>
    <li><strong>Celor cu job solicitant, navetă și copii.</strong> Dacă a doua sesiune înseamnă fugă, stres și mese sărite, câștigul dispare.</li>
    <li><strong>Celor într-un deficit foarte mare.</strong> În ultimele săptămâni dinaintea concursului, de multe ori scad volumul, nu îl împart.</li>
    <li><strong>Oamenilor anxioși, care trăiesc deja sub presiune.</strong> La ei, încă o „obligație” pe zi crește stresul mai mult decât crește mușchiul.</li>
  </ul>
  <h2>Cum împart eu volumul, concret</h2>
  <p>Regula de bază: <strong>nu dublez munca, o împart.</strong> Dacă un sportiv făcea 20 de serii într-o zi, face tot 20, câte 10 în fiecare sesiune. Dubla nu e un motiv să adaugi volum.</p>
  <ol>
    <li><strong>Grupe diferite:</strong> dimineața picioarele, seara umerii sau brațele. Cea mai simplă variantă și cea pe care o folosesc cel mai des.</li>
    <li><strong>Aceeași grupă, scopuri diferite:</strong> dimineața exercițiile compuse grele, seara izolare, repetări mai multe și pompare.</li>
    <li><strong>Cel puțin 6 ore între sesiuni</strong>, cu o masă completă între ele.</li>
    <li><strong>2–3 zile de dublă pe săptămână</strong>, nu în fiecare zi. În restul zilelor, o sesiune normală sau odihnă.</li>
  </ol>
  <h2>Semnele că e prea mult</h2>
  <p>Pulsul de dimineață mai mare decât de obicei mai multe zile la rând. Somn agitat. Greutăți care scad la a doua sesiune de la o săptămână la alta. Lipsa poftei de antrenament. Când văd două dintre ele, revin pentru o săptămână la o singură sesiune pe zi. Dubla e o unealtă pentru o perioadă, nu un stil de viață.</p>
  <p class="src">Exemplul e din pregătirile mele, cu detaliile schimbate.</p>`,
  cta: ["Te antrenezi mult și ultimele exerciții sunt doar „bifate”?", "Îți spun dacă ți se potrivește o dublă sau doar un antrenament mai scurt și mai bine făcut. Începe cu evaluarea gratuită.", "Fă evaluarea gratuită", "evaluare"] },

{ handle: "cardio-dimineata-sala-seara", cat: "Antrenament", min: 7, title: "Cardio dimineața, sala seara: de ce le despart la sportivii mei",
  lead: "Cardio-ul făcut chiar înainte de sală fură din forța de la greutăți. Despărțite de câteva ore, lucrează împreună. Ce fac eu și de ce.",
  body: `<p>O sportivă de bikini a venit la mine cu o problemă pe care o aud des: picioarele nu mai creșteau, deși le lucra de trei ori pe săptămână. Când m-am uitat la program, am găsit cauza în primele cinci minute. Făcea 40 de minute de bandă alertă și apoi, imediat, antrenamentul de picioare. Ajungea la genoflexiuni deja obosită, cu greutăți mai mici decât cele de care era în stare.</p>
  <p>Nu i-am tăiat cardio-ul. L-am mutat dimineața, înainte de micul dejun, iar sala a rămas seara. Același cardio, aceleași serii. În două luni a urcat cu greutățile la toate exercițiile de picioare, iar talia a continuat să scadă.</p>
  <h2>Modelul pe care îl folosesc</h2>
  <p>De ani buni, la sportivii mei, cardio-ul se face dimineața, iar antrenamentul cu greutăți mai târziu în zi, separat. Cardio-ul își face treaba la ardere, iar sala rămâne pentru ce contează la sală: forță, tensiune, mușchi. Cele două nu se mai încurcă una pe alta.</p>
  <h2>De ce le despart: efectul de interferență</h2>
  <p>Când pui cardio-ul și forța una după alta, câștigurile de forță și de masă sunt de multe ori mai mici decât la forța făcută singură. I se spune efect de interferență. Din ce văd la sportivii mei, e mai mare cu alergarea decât cu bicicleta sau cu mersul în pantă și crește cu cât cardio-ul e mai lung și mai des.</p>
  <p>Partea bună: o pauză între ele ajută. Cu cel puțin 6 ore între cardio și sală, sportivii mei își păstrează greutățile, iar la cei care le despărțeau deja, forța a crescut vizibil.</p>
  <blockquote>Cardio-ul nu e dușmanul mușchiului. Cardio-ul pus la ora greșită este.</blockquote>
  <h2>Pe stomacul gol: ce e adevărat și ce e mit</h2>
  <p>Aici trebuie să fiu cinstit. Cardio-ul pe stomacul gol nu topește grăsimea ca prin magie. La același deficit caloric, pierderea de grăsime iese practic la fel, fie că faci cardio-ul pe nemâncate, fie după masă. Ce decide definirea este deficitul total din zi și din săptămână.</p>
  <p>De ce îl folosesc totuși la mulți sportivi:</p>
  <ul>
    <li><strong>Se potrivește cu dimineața de „vânător”.</strong> În cartea mea descriu prima parte a zilei cu insulina jos, proteine și grăsimi, iar carbohidrații mutați seara, după antrenament. Cardio-ul de dimineață intră natural în modelul ăsta.</li>
    <li><strong>E făcut înainte ca ziua să-l poată anula.</strong> Seara apar ședințe, trafic, oboseală. Dimineața, cardio-ul e deja bifat.</li>
    <li><strong>Lasă seara întreagă pentru sală.</strong> Iar după sală vine masa cu carbohidrați, cea pe care sportivul a meritat-o.</li>
  </ul>
  <p>Nu îl dau pe stomacul gol tuturor. Oamenilor care se simt slăbiți, amețiți sau anxioși fără mâncare le dau o porție mică de proteină înainte, de exemplu un shake. La fel celor care fac cardio mai lung de 45 de minute.</p>
  <h2>Cum arată concret</h2>
  <ol>
    <li><strong>Dimineața:</strong> 30–45 de minute de intensitate moderată. Mers alert în pantă sau bicicletă, nu alergare, ca interferența să fie cât mai mică. Pulsul la un nivel la care poți vorbi.</li>
    <li><strong>Peste zi:</strong> mese din proteine, legume și grăsimi bune.</li>
    <li><strong>După-amiaza sau seara:</strong> antrenamentul cu greutăți, la cel puțin 6 ore după cardio.</li>
    <li><strong>După sală:</strong> masa principală cu carbohidrați. Ajută refacerea, coboară stresul zilei și te ajută să dormi.</li>
  </ol>
  <h2>Când nu le pot despărți</h2>
  <p>Unii oameni au o singură fereastră de timp pe zi. Atunci regula mea e simplă: întâi greutățile, apoi cardio-ul, niciodată invers. A doua variantă: cardio-ul în zilele fără sală. Iar cardio-ul intens, pe intervale, nu îl pun niciodată în ziua de dinaintea antrenamentului de picioare.</p>
  <p>Sportiva de bikini a rămas cu modelul ăsta și după concurs. Spune că dimineața de cardio e „ora ei liniștită” din zi. Pentru mine contează altceva: picioarele ei cresc din nou.</p>
  <p class="src">Exemplul e din pregătirile mele, cu detaliile schimbate.</p>`,
  cta: ["Faci cardio și ai pierdut forță la sală?", "Îți construiesc ziua în care cardio-ul, sala și mâncarea lucrează împreună. Începe cu evaluarea gratuită.", "Fă evaluarea gratuită", "evaluare"] },
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
writeFileSync(path.join(here, "_noi-lista-4.json"), JSON.stringify(A.map(a => ({ handle: a.handle, cat: a.cat, title: a.title, lead: a.lead })), null, 1));
console.log(A.length, "articole noi (42–43)");
for (const a of A) console.log(a.handle.padEnd(48), a.cat.padEnd(22), a.body.length);
