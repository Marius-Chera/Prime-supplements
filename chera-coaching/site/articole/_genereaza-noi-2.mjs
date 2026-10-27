// Chera Protocol – articolele 21–35 (27.10.2026): nutriție precompetițională și povești din pregătiri,
// scrise la persoana I, ca de la Marius. Originale: inspirate din principii publice de pregătire,
// fără nume de sportivi, antrenori sau concursuri, fără întâmplările sau clienții altora.
// Rulează: node site/articole/_genereaza-noi-2.mjs  (din chera-coaching/)
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
const here = path.dirname(fileURLToPath(import.meta.url));
const DATA = "27.10.2026";

const A = [
{ handle: "dieta-de-definire-cum-o-construiesc", cat: "Nutriție", min: 6, title: "Cum construiesc o dietă de definire, de la prima zi",
  lead: "Nu încep niciodată cu „cât tai”. Încep cu „de unde pornim”. Ordinea în care pun lucrurile într-un plan de definire și de ce prima săptămână e cea mai importantă.",
  body: `<p>Cele mai multe diete de definire pe care le primesc de la sportivi noi arată la fel: un număr de calorii luat de pe un calculator, pui cu orez de cinci ori pe zi și cardio de a doua zi. Și aproape toate se blochează după trei-patru săptămâni. Nu pentru că omul nu a muncit. Pentru că planul a început de la final, nu de la început.</p>
  <p>Eu construiesc definirea în ordine inversă față de cum o fac majoritatea. Prima dată aflu de unde pornim. Abia apoi decid unde mergem și cu ce viteză.</p>
  <h2>Săptămâna zero: nu schimb nimic</h2>
  <p>Înainte de orice tăiere, cer o săptămână în care sportivul mănâncă exact cum mănâncă de obicei, dar cântărește și notează tot. Cântar în fiecare dimineață, poze la final de săptămână, talie. Așa aflu nivelul lui real de menținere, nu pe cel din formulă. Am avut un băiat la care formula spunea 2.600 de kcal și care se menținea, de fapt, la 3.400. Dacă îl puneam la 2.200 din prima zi, îl îngropam.</p>
  <blockquote>Nu poți scădea cu precizie dintr-un număr pe care nu-l cunoști.</blockquote>
  <h2>Proteinele se fixează primele</h2>
  <p>Proteina e singurul lucru din plan care nu se negociază și nu scade pe parcurs. O pun între 2,2 și 2,6 g pe kilogram, mai sus la cei care pornesc slabi, pentru că la ei riscul de a pierde mușchi e mai mare. Împărțită în 4–6 mese, cu o sursă solidă la fiecare. Zerul rămâne unealtă, nu bază.</p>
  <h2>Carbohidrații se așază în jurul antrenamentului</h2>
  <p>Al doilea pas: pun carbohidrații acolo unde lucrează. Masa de dinainte de antrenament și cea de după iau partea cea mai mare din ei. Restul zilei primește ce rămâne. La început, un sportiv de 90 kg în deficit moderat poate avea 250–300 g pe zi; cifra scade pe parcurs, dar cele două mese din jurul antrenamentului sunt ultimele pe care le ating.</p>
  <h2>Grăsimile umplu diferența</h2>
  <p>Grăsimile nu coboară sub 0,6–0,8 g pe kilogram, niciodată, oricât de aproape ar fi concursul. Sub pragul ăsta încep problemele cu hormonii, cu pielea, cu somnul și cu pofta. Ce rămâne din caloriile totale după proteine și carbohidrați merge în grăsimi: ouă întregi, ulei de măsline măsurat, pește gras.</p>
  <h2>Ordinea în care le scad</h2>
  <ol>
    <li><strong>Deficitul inițial e mic:</strong> 10–15% sub menținerea reală, nimic mai mult.</li>
    <li><strong>Prima tăiere</strong> vine din grăsimile „din mers” și din carbohidrații meselor fără antrenament.</li>
    <li><strong>A doua</strong> din carbohidrații zilelor de pauză.</li>
    <li><strong>Cardio-ul</strong> intră abia când mâncarea nu mai poate coborî fără să sufere forța.</li>
    <li><strong>Carbohidrații din jurul antrenamentului</strong> sunt ultimii, în ultimele săptămâni.</li>
  </ol>
  <h2>Ce urmăresc săptămână de săptămână</h2>
  <p>O scădere de 0,5–1% din greutate pe săptămână, forță păstrată la exercițiile de bază și poze care arată mai uscat, nu mai mic. Dacă toate trei sunt în regulă, nu ating nimic. Dieta bună de definire e plictisitoare: aceleași alimente, aceleași ore, schimbări mici și rare. Spectaculoasă e doar pe scenă.</p>`,
  cta: ["Vrei o definire construită pe tine, nu pe un calculator?", "Evaluarea gratuită îmi arată profilul tău și cum tolerezi carbohidrații. De acolo pornesc planul.", "Fă evaluarea gratuită", "evaluare"] },

{ handle: "grasimile-in-pregatire", cat: "Nutriție", min: 5, title: "De ce nu scot niciodată grăsimile la zero în pregătire",
  lead: "„Fără grăsimi” e una dintre cele mai scumpe greșeli pe care le-am văzut în definire. Cât de jos cobor, de unde le iau și ce se strică atunci când dispar.",
  body: `<p>Am avut odată o fată de bikini care a venit la mine cu opt săptămâni înainte de concurs, după ce fusese singură pe un plan cu grăsimile aproape la zero: piept de pui, albușuri, orez și legume. Arăta plată, pielea era uscată, dormea prost și nu mai avea ciclu de două luni. Cântarul nu se mișcase de trei săptămâni. Primul lucru pe care l-am făcut nu a fost să tai. A fost să pun grăsimile la loc.</p>
  <p>Două săptămâni mai târziu, cu aceleași calorii totale, dar cu 50 g de grăsimi pe zi, dormea, avea pompare la antrenament și cântarul pornise din nou în jos. Nu era magie. Era un corp care redevenise funcțional.</p>
  <h2>Ce fac grăsimile într-o pregătire</h2>
  <ul>
    <li><strong>Țin hormonii în funcțiune.</strong> Sub un anumit prag, producția hormonală scade, și cu ea forța, libidoul, somnul și, la femei, ciclul.</li>
    <li><strong>Țin pielea și părul.</strong> O piele uscată și terne pe scenă se vede. Ulei pe piele nu rezolvă ce lipsește din farfurie.</li>
    <li><strong>Dau sațietate.</strong> O masă cu puțină grăsime ține de foame de două ori mai mult decât aceeași masă fără.</li>
    <li><strong>Duc vitaminele.</strong> A, D, E, K nu se absorb fără ele.</li>
  </ul>
  <h2>Pragul sub care nu cobor</h2>
  <p>La bărbați, 0,6–0,8 g pe kilogram corp. La femei, rareori sub 0,8, de multe ori 1 g. Un bărbat de 90 kg are deci minimum 55–70 g de grăsimi pe zi, chiar în ultima lună. Când trebuie să mai scad calorii și am ajuns la pragul ăsta, scad din carbohidrați sau adaug mișcare, nu tai grăsimile.</p>
  <blockquote>Grăsimile sunt primele pe care le reduc la început și ultimele pe care le mai ating la final.</blockquote>
  <h2>De unde le iau</h2>
  <p>Ouă întregi (nu albușuri la nesfârșit), pește gras de două-trei ori pe săptămână, ulei de măsline măsurat cu lingura, nu turnat, o porție mică de nuci sau unt de arahide acolo unde intră în calcul. Evit grăsimile „ascunse”: sosuri, prăjeli, carne grasă necântărită, pentru că la ele nu știu niciodată cât a intrat.</p>
  <h2>Unde le pun în zi</h2>
  <p>Departe de antrenament. Masa de dinainte și cea de după sunt pentru carbohidrați și proteine, pentru că grăsimea încetinește digestia exact când vreau energie rapidă. Grăsimile merg la micul dejun, la prânz în zilele de pauză și la cină, unde ajută și somnul.</p>
  <h2>Semnele că ai coborât prea jos</h2>
  <p>Somn fragmentat, piele uscată, pofte imposibil de controlat seara, lipsă de chef la antrenament, la femei ciclu întârziat. Când văd două dintre ele în același check-in, mă uit prima dată la grăsimi. De obicei acolo e răspunsul.</p>`,
  cta: ["Ți se pare că nu mai scazi, deși mănânci tot mai puțin?", "În coaching mă uit la întregul plan, nu doar la calorii. De multe ori răspunsul e în ce lipsește, nu în ce e în plus.", "Fă evaluarea gratuită", "evaluare"] },

{ handle: "sursele-de-carbohidrati-in-pregatire", cat: "Nutriție", min: 5, title: "Carbohidrații din pregătirile mele: ce surse folosesc și de ce",
  lead: "Nu toți carbohidrații fac același lucru într-un corp în deficit. Lista mea scurtă de surse, unde le pun în zi și ce scot complet în ultimele săptămâni.",
  body: `<p>Un sportiv nou îmi trimite de obicei o listă lungă: paste integrale, pâine „fitness”, batoane proteice, cereale, fructe de toate felurile, biscuiți fără zahăr. Pe hârtie, carbohidrații ies corect. În oglindă, omul arată balonat și plat în același timp. Problema nu e numărul de grame. E de unde vin gramele.</p>
  <p>În definire, corpul nu are loc de experimente. Vreau surse care se digeră previzibil, care nu umflă abdomenul și pe care le pot cântări exact. Lista mea e scurtă din motive practice, nu din dogmă.</p>
  <h2>Baza: patru surse</h2>
  <ul>
    <li><strong>Orez alb.</strong> Cel mai previzibil carbohidrat pe care îl cunosc: digestie ușoară, zero balonare, ușor de cântărit. Orezul brun îl folosesc rar, fibrele în plus nu ajută pe un stomac deja solicitat.</li>
    <li><strong>Cartof și cartof dulce.</strong> Sațietate mare la calorii puține. Bun la mesele fără antrenament, când foamea e problema.</li>
    <li><strong>Ovăz.</strong> Dimineața, la cei care tolerează bine. La cei care se balonează, îl scot fără discuție.</li>
    <li><strong>Turte de orez.</strong> Unealta de dinainte de antrenament și din peak week: rapide, ușoare, fără apă reținută.</li>
  </ul>
  <h2>Fructele</h2>
  <p>Una sau două porții pe zi, de obicei dimineața sau după antrenament. Banana după antrenamentul greu, fructe de pădure la micul dejun. Nu mai mult, nu pentru că fructele ar fi „rele”, ci pentru că fructoza se duce întâi în ficat, nu în mușchi, iar în definire vreau fiecare gram de carbohidrat în mușchi.</p>
  <h2>Ce scot din prima zi</h2>
  <ul>
    <li>Produsele „fără zahăr” și „proteice” din comerț: îndulcitori, fibre adăugate, balonare și poftă de dulce.</li>
    <li>Pâinea, oricare ar fi ea. Nu din cauza glutenului, ci pentru că nu pot cântări exact ce e în ea.</li>
    <li>Sucurile, inclusiv cele „naturale”. Calorii lichide pe care corpul nu le înregistrează.</li>
    <li>Legumele în cantități uriașe. Da, chiar legumele: un kilogram de broccoli pe zi în ultimele săptămâni înseamnă un abdomen umflat pe scenă.</li>
  </ul>
  <blockquote>În definire nu cauți varietate. Cauți predictibilitate. Varietatea o ai în offseason.</blockquote>
  <h2>Cum se schimbă spre final</h2>
  <p>Cu 3–4 săptămâni înainte de concurs, fibrele scad: mai puțin ovăz, mai puține legume crucifere, legume verzi ușoare în locul lor. Orezul alb și turtele de orez devin aproape singurele surse. Iar în ultima săptămână nu apare niciun aliment nou. Dacă nu l-ai mâncat în pregătire, nu-l mănânci nici atunci.</p>
  <p>Dacă ești în offseason, nu ai nevoie de o listă atât de strictă. Dar dacă ești la 12 săptămâni de scenă, fiecare aliment din farfurie trebuie să aibă un motiv.</p>`,
  cta: ["Nu știi dacă tolerezi bine carbohidrații?", "Evaluarea gratuită îți arată profilul și cum îți împart eu carbohidrații în zi.", "Fă evaluarea gratuită", "evaluare"] },

{ handle: "foamea-pe-definire", cat: "Nutriție", min: 5, title: "Foamea pe definire: ce e normal și ce îmi spune că am greșit",
  lead: "Foamea face parte din pregătire. Dar există o foame care înseamnă că mergem bine și una care înseamnă că planul e greșit. Cum le deosebesc și ce fac cu fiecare.",
  body: `<p>„Mi-e foame tot timpul” e propoziția pe care o aud cel mai des de la sportivi în a doua jumătate a definirii. Și răspunsul meu nu e niciodată același, pentru că foamea nu e un singur lucru. Am avut un sportiv care îmi scria asta la 10 săptămâni de concurs și, când ne-am uitat împreună, mânca 3.000 de kcal și slăbea frumos. Foamea lui era normală. Și am avut altul care îmi scria același lucru la 1.900 de kcal, cu forța în scădere și cu somnul distrus. Foamea lui era un semnal de alarmă.</p>
  <h2>Foamea normală</h2>
  <p>Apare cu o oră înainte de mese, dispare după ce mănânci, nu te ține treaz noaptea și nu îți scade forța în sală. E semnul că ești în deficit, adică exact unde trebuie să fii. Cu ea se trăiește. Nu se repară, se gestionează.</p>
  <h2>Foamea care mă îngrijorează</h2>
  <ul>
    <li>Te trezești noaptea flămând sau adormi greu din cauza ei.</li>
    <li>Te gândești la mâncare toată ziua, nu doar înainte de masă.</li>
    <li>Forța scade de la o săptămână la alta la exercițiile de bază.</li>
    <li>Ai pofte violente seara, de obicei de dulce sau de sărat.</li>
    <li>Cântarul stă pe loc în ciuda foamei.</li>
  </ul>
  <p>Când văd două sau trei dintre ele împreună, nu adaug voință. Mă uit la plan: de obicei am tăiat prea mult, prea repede, sau grăsimile au coborât sub prag, sau somnul e sub șase ore.</p>
  <blockquote>Foamea normală se gestionează cu structură. Foamea anormală se repară din plan, nu din caracter.</blockquote>
  <h2>Uneltele mele pentru foamea normală</h2>
  <ol>
    <li><strong>Volumul.</strong> Aceleași calorii, în alimente mai voluminoase: cartof în loc de orez la mesele fără antrenament, legume verzi la fiecare masă principală.</li>
    <li><strong>Proteina la fiecare masă.</strong> Un sportiv care mănâncă proteină de 5 ori pe zi simte foamea altfel decât unul care o mănâncă de 2 ori.</li>
    <li><strong>Ordinea meselor.</strong> Cea mai mare masă acolo unde foamea e cea mai mare, de obicei seara. Nu are rost să mănânci mult dimineața dacă nu ți-e foame dimineața.</li>
    <li><strong>Apa și sarea constante.</strong> O parte din „foame” e sete sau lipsă de sare, mai ales după antrenament.</li>
    <li><strong>Somnul.</strong> O noapte scurtă înseamnă o zi cu hormonii foamei sus. Nimic din farfurie nu compensează asta.</li>
    <li><strong>Masa liberă planificată.</strong> Știi când vine și ții mai ușor restul săptămânii.</li>
  </ol>
  <h2>Ultimele săptămâni</h2>
  <p>Aproape de concurs, foamea crește la toată lumea și devine parte din joc. Diferența e că acolo o aștept și o anunț din timp: sportivul știe că vine și știe că e temporară. O foame anunțată se duce mult mai ușor decât una care te ia prin surprindere.</p>`,
  cta: ["Ți-e foame și nu știi dacă e normal?", "În coaching citesc foamea împreună cu pozele, cântarul și somnul. De multe ori răspunsul e în plan, nu în tine.", "Fă evaluarea gratuită", "evaluare"] },

{ handle: "reverse-diet-cum-urc-caloriile", cat: "Nutriție", min: 5, title: "Reverse diet: cum urc caloriile după o definire, pas cu pas",
  lead: "Cea mai bună formă a vieții tale se poate pierde în trei săptămâni sau se poate transforma în cel mai bun offseason. Pașii concreți cu care urc mâncarea la sportivii mei.",
  body: `<p>În articolul despre rebound am scris de ce se întâmplă explozia de după concurs. Aici scriu cum arată, concret, drumul invers: de la caloriile din ultima săptămână de dietă până la un offseason productiv. Nu e un drum rapid. Dar e singurul pe care sportivii mei ajung, trei luni mai târziu, mai bine decât înainte de pregătire.</p>
  <h2>Punctul de pornire</h2>
  <p>Iau caloriile din ultima săptămână de dietă, fără peak week, fără masa de după concurs. Să zicem 2.000 de kcal la un bărbat care a concurat la 80 kg. De acolo pornim, nu de la „cât mănâncă un om normal”.</p>
  <h2>Pașii</h2>
  <ol>
    <li><strong>Săptămâna 1:</strong> +15–20%, aproape tot din carbohidrați. 2.000 devin 2.300–2.400. Cardio-ul scade la jumătate. Greutatea urcă 1–3 kg în primele zile, din apă și glicogen. E normal, nu e grăsime.</li>
    <li><strong>Săptămânile 2–4:</strong> +100–150 kcal la fiecare 7–10 zile, cât timp cântarul urcă lent (sub 0,5 kg pe săptămână după saltul inițial) și pozele arată plin, nu moale. Cardio-ul se termină treptat.</li>
    <li><strong>Luna 2:</strong> pașii continuă până la nivelul de menținere real al noii greutăți. Aici grăsimile revin la 1 g pe kilogram, carbohidrații sunt deja mari.</li>
    <li><strong>Luna 3:</strong> intrăm în surplus controlat pentru construcție: 5–10% peste menținere, nu mai mult.</li>
  </ol>
  <blockquote>Scopul nu e să mănânci cât mai mult cât mai repede. E să ajungi să mănânci mult fără să arăți altfel.</blockquote>
  <h2>Ce nu se schimbă</h2>
  <p>Proteina rămâne la nivelul din pregătire. Structura meselor rămâne la fel: aceleași ore, aceleași surse, cu porții mai mari. Cântarul și pozele rămân săptămânale. Un sportiv care a stat 20 de săptămâni pe cântar în fiecare dimineață și se oprește brusc după concurs pierde exact instrumentul de care are nevoie acum.</p>
  <h2>Unde greșesc oamenii</h2>
  <ul>
    <li>Sar direct la 3.500 de kcal „pentru că atât mâncam în offseason”. Corpul de după dietă nu e corpul din offseason.</li>
    <li>Opresc cardio-ul din prima zi și adaugă mâncare în aceeași zi. Două schimbări mari deodată.</li>
    <li>Transformă masa liberă de după concurs într-o săptămână liberă.</li>
    <li>Nu mai fac poze, pentru că „nu vreau să mă văd”. Exact atunci trebuie să te vezi.</li>
  </ul>
  <h2>Cât durează</h2>
  <p>Opt până la douăsprezece săptămâni până la un offseason adevărat. Pare mult după o pregătire lungă. Dar sportivul care are răbdarea asta pornește următoarea definire cu mai mult mușchi și cu mai puțină grăsime decât cel care „a sărbătorit” trei luni.</p>`,
  cta: ["Ai terminat un concurs și nu știi ce urmează?", "În coaching, perioada de după scenă e la fel de planificată ca pregătirea. Scrie-mi înainte să începi să mănânci „normal”.", "Fă evaluarea gratuită", "evaluare"] },

{ handle: "ultimele-4-saptamani-decizia", cat: "Pregătire de concurs", min: 5, title: "Cu 4 săptămâni înainte: momentul în care decid dacă urcăm pe scenă",
  lead: "Există un punct în pregătire după care nu mai poți recupera. Ce verific la 4 săptămâni, cum calculez dacă mai ajungem și ce îi spun sportivului când răspunsul e „nu”.",
  body: `<p>Cea mai grea discuție pe care o am cu un sportiv nu e la început, când îi spun cât va mânca. E la patru săptămâni de concurs, când trebuie să-i spun dacă ajunge sau nu. Am învățat să am discuția asta atunci, nu cu zece zile înainte, pentru că la zece zile e deja prea târziu pentru orice în afară de o decizie proastă.</p>
  <h2>De ce 4 săptămâni</h2>
  <p>La un ritm sănătos de 0,5–0,8% din greutate pe săptămână, în patru săptămâni mai poți scoate 2–3 kg de grăsime, nu mai mult. Dacă sportivul are de dat jos mai mult de atât, nu există nicio dietă, niciun cardio și niciun peak week care să rezolve diferența. Și ultima săptămână nu scoate grăsime deloc: forma de la 7 zile e forma de pe scenă.</p>
  <blockquote>Dacă la 4 săptămâni mai e „mult” de dat jos, nu mai e o problemă de dietă. E o problemă de calendar.</blockquote>
  <h2>Ce mă uit, concret</h2>
  <ul>
    <li><strong>Pozele de dimineață, relaxat.</strong> La 4 săptămâni, un bărbat de culturism trebuie să aibă deja separare la cvadriceps și spatele inferior aproape curat. O fată de bikini trebuie să aibă talia definită și linia de la umeri la coapse clară, fără apă pe coapse.</li>
    <li><strong>Ritmul ultimelor 3 săptămâni.</strong> Dacă media a scăzut constant, mai avem ce exploata. Dacă stă pe loc de două săptămâni la calorii deja mici, nu mai avem de unde.</li>
    <li><strong>Forța.</strong> Dacă a scăzut mult deja, nu mai pot apăsa pe deficit fără să pierd mușchi.</li>
    <li><strong>Omul.</strong> Somnul, dispoziția, cât mai suportă. Un sportiv epuizat la 4 săptămâni nu va arăta bine pe scenă indiferent de grăsime.</li>
  </ul>
  <h2>Cele trei răspunsuri posibile</h2>
  <ol>
    <li><strong>Suntem pe drum.</strong> Nu schimb nimic. Ultimele 4 săptămâni sunt despre a nu strica, nu despre a accelera.</li>
    <li><strong>Suntem aproape, dar nu chiar.</strong> O ultimă tăiere mică, cardio-ul la maximul planificat, și vorbim deschis că forma va fi „bună”, nu „cea mai bună”. Unii aleg să urce oricum, pentru experiență. E o alegere corectă dacă e asumată.</li>
    <li><strong>Nu ajungem.</strong> Mutăm concursul cu 4–8 săptămâni mai târziu sau renunțăm la sezonul ăsta. Dureros, dar mai ieftin decât să urci pe scenă într-o formă de care te vei rușina și care îți va strica următoarea pregătire.</li>
  </ol>
  <h2>Ce nu fac niciodată</h2>
  <p>Nu tai în ultimele patru săptămâni la 1.200 de kcal „ca să ajungem”. Nu dublez cardio-ul. Nu promit un peak week care „scoate ultima apă”. Am văzut rezultatul acestor promisiuni la alți sportivi: plat, apos, fără pompare și fără chef să mai concureze vreodată.</p>
  <p>Cel mai bun lucru pe care îl pot face pentru un sportiv la 4 săptămâni e să-i spun adevărul. Chiar și când e un „nu”.</p>`,
  cta: ["Ai un concurs în calendar și nu știi dacă ești pe drum?", "Trimite-mi pozele la evaluare. Îți spun cinstit unde ești și cât mai e.", "Fă evaluarea gratuită", "evaluare"] },

{ handle: "ziua-concursului-ora-cu-ora", cat: "Pregătire de concurs", min: 6, title: "Ziua concursului, oră cu oră: ce fac cu sportivii mei",
  lead: "Mâncarea, apa, pomparea, timpul mort din culise. Programul pe care îl urmez în ziua de concurs și regula care decide tot: nimic nou astăzi.",
  body: `<p>Un sportiv de-al meu a avut odată cea mai bună formă din viața lui în dimineața concursului și a urcat pe scenă plat și apos la prejudecare. Între cele două momente: un mic dejun „special” recomandat de cineva din culise, două sticle de apă băute din plictiseală și o pompare de 40 de minute. Toate trei erau noi. Toate trei au stricat ceva. De atunci am un program fix pentru ziua de concurs și o singură regulă deasupra lui.</p>
  <blockquote>În ziua concursului nu faci nimic ce nu ai făcut în ultimele două săptămâni. Nimic.</blockquote>
  <h2>Dimineața, 3–4 ore înainte de prejudecare</h2>
  <p>Micul dejun e exact cel din ultimele zile de peak week: o sursă de carbohidrați cunoscută (orez, turte de orez, ovăz la cine îl tolerează), o proteină ușoară, puțină sare, apă normală. Poze în aceeași lumină ca în fiecare dimineață. Din pozele astea decid cât mai mănâncă până la scenă.</p>
  <h2>Între mic dejun și culise</h2>
  <p>Mese mici, la 1,5–2 ore, din aceleași alimente. Apa continuă în înghițituri mici, nu la sticlă: nici tăiată, nici în exces. Dacă din poze sportivul arată plat, cresc puțin carbohidrații la masa următoare și adaug un vârf de sare. Dacă arată apos, nu bea până pe scenă și merge pe jos, nu stă pe scaun. Niciodată nu fac amândouă în același timp.</p>
  <h2>Culisele</h2>
  <ul>
    <li><strong>Ajungem devreme</strong>, ca să nu alergăm. Graba ridică stresul, stresul ține apă.</li>
    <li><strong>Bronzul verificat</strong> la lumină, nu în baie. O dungă lipsă se vede de la juriu.</li>
    <li><strong>Telefonul sportivului e la mine.</strong> Fără comparații cu ceilalți din culise, fără sfaturi de la necunoscuți.</li>
    <li><strong>Masa de dinainte de scenă</strong> cu 45–60 de minute înainte: carbohidrați rapizi cunoscuți, cantitate mică, sare puțină, ciocolată doar la cei la care am testat-o în pregătire.</li>
  </ul>
  <h2>Pomparea</h2>
  <p>10–15 minute, nu 40. Serii ușoare, repetări multe, pe grupele care trebuie să arate pline: umeri, piept, spate, brațe. Picioarele aproape deloc, pentru că se umflă și pierd separarea. Oprim când apare pompa, nu când apare oboseala. Apoi posing ușor până la intrare, ca să rămână mușchiul activ fără să obosească.</p>
  <h2>Între prejudecare și finală</h2>
  <p>Aici se pierd multe locuri. Sportivul coboară de pe scenă, se relaxează și mănâncă tot ce vede. La finală urcă umflat. La mine: o masă normală din plan, apă normală, odihnă cu picioarele sus, poze din nou, și o pompare scurtă înainte de finală. Mâncarea „de sărbătoare” vine după ultima ieșire pe scenă, nu înainte.</p>
  <h2>Seara</h2>
  <p>Masa liberă, una, planificată. Apoi, de a doua zi, începe drumul invers. Dar despre asta am scris separat.</p>`,
  cta: ["Vrei pe cineva lângă tine în culise?", "În coaching stau cu sportivii mei în ziua concursului, la Sibiu și la concursurile din țară. Hai să vedem dacă ne potrivim.", "Fă evaluarea gratuită", "evaluare"] },

{ handle: "plat-apos-sau-gras-trei-decizii", cat: "Pregătire de concurs", min: 6, title: "Plat, apos sau gras? Cele trei situații și cele trei decizii diferite",
  lead: "Cea mai des întâlnită greșeală în ultimele săptămâni: să tratezi apa ca pe grăsime sau golirea ca pe apă. Cum deosebesc cele trei stări din poze și ce fac diferit la fiecare.",
  body: `<p>Trei sportivi îmi trimit poze în aceeași dimineață și toți trei scriu același lucru: „Nu arăt bine.” Unul e plat. Unul ține apă. Unul mai are grăsime. Dacă le dau tuturor același răspuns, pe doi dintre ei îi stric. Diferența dintre cele trei stări e cea mai importantă lectură pe care o fac ca antrenor, iar sportivii o confundă aproape mereu.</p>
  <h2>Plat</h2>
  <p><strong>Cum arată:</strong> mușchiul e separat, pielea e subțire, venele se văd, dar mușchiul pare mic, „dezumflat”. Brațele și umerii par goale, pompajul la antrenament e slab. De obicei după câteva zile cu carbohidrați foarte puțini sau după un antrenament greu.</p>
  <p><strong>Ce NU fac:</strong> nu tai calorii. Omul nu e gras, e gol.</p>
  <p><strong>Ce fac:</strong> cresc carbohidrații la masa următoare sau a doua zi, din surse cunoscute, și mă uit după 24 de ore. Un sportiv plat care primește carbohidrați arată mai bine a doua zi. Dacă nu arată mai bine, nu era plat.</p>
  <h2>Apos</h2>
  <p><strong>Cum arată:</strong> contururile sunt șterse, mai ales la spatele inferior, pe coapse și la abdomenul inferior, dar fără „moliciune” de grăsime. Dimineața arată altfel față de seară. De multe ori după o zi cu sare în plus, somn prost, stres sau după o schimbare bruscă a apei.</p>
  <p><strong>Ce NU fac:</strong> nu tai apa și nu scot sarea. Ar fi exact ce a cauzat problema la mulți dintre ei.</p>
  <p><strong>Ce fac:</strong> întreb ce s-a schimbat în ultimele 48 de ore. Aproape întotdeauna găsesc ceva: o masă la restaurant, o noapte scurtă, apa băută altfel. Readuc rutina și aștept două zile. Apa pleacă singură când cauza dispare.</p>
  <h2>Gras</h2>
  <p><strong>Cum arată:</strong> lipsă de separare care nu se schimbă de dimineață până seara și nici după o zi cu carbohidrați. Pielea e moale la atingere, nu „plină de apă”. Nu apar liniile dintre mușchi indiferent de lumină.</p>
  <p><strong>Ce NU fac:</strong> nu încarc cu carbohidrați „ca să umplu”. Umplerea pe grăsime arată și mai rău.</p>
  <p><strong>Ce fac:</strong> continui sau ajustez deficitul, mic. Aici și numai aici, răspunsul e mai puțină mâncare sau mai multă mișcare.</p>
  <blockquote>Plat primește mâncare. Apos primește rutină. Gras primește timp. Dacă le încurci, strici o pregătire.</blockquote>
  <h2>Cum le deosebesc când nu e clar</h2>
  <ol>
    <li><strong>Pozele de la aceeași oră, în aceeași lumină.</strong> Fără asta nu pot citi nimic.</li>
    <li><strong>Testul cu carbohidrați:</strong> o masă mai mare, apoi poze a doua zi. Plat → mai bine. Apos → la fel sau puțin mai rău. Gras → la fel.</li>
    <li><strong>Talia</strong> măsurată dimineața. La apă fluctuează de la o zi la alta. La grăsime se mișcă lent și într-o singură direcție.</li>
    <li><strong>Pielea</strong> ciupită la spatele inferior: apa se simte ca o pernă subțire, grăsimea ca un strat.</li>
  </ol>
  <p>Cu cât un sportiv învață mai devreme să vadă diferența pe el, cu atât ia mai puține decizii proaste singur. Dar în ultimele săptămâni, când nimeni nu se mai vede obiectiv, decizia o iau eu.</p>`,
  cta: ["Nu știi dacă ești plat, apos sau mai ai de slăbit?", "Trimite-mi pozele la evaluare. Îți spun ce văd și ce aș face eu în locul tău.", "Fă evaluarea gratuită", "evaluare"] },

{ handle: "doua-concursuri-apropiate", cat: "Pregătire de concurs", min: 5, title: "Două concursuri la două săptămâni: cum țin forma între ele",
  lead: "Cele mai multe forme se pierd nu înainte de primul concurs, ci între primul și al doilea. Planul meu pentru cele 7–21 de zile dintre două urcări pe scenă.",
  body: `<p>Un sportiv de-al meu a luat un loc bun la primul concurs, a sărbătorit două zile și a urcat la al doilea, două săptămâni mai târziu, cu trei kilograme de apă și grăsime în plus și cu un loc mai jos. Nu dieta l-a trădat. L-a trădat ideea că „forma e făcută, acum doar o țin”. Forma nu se ține singură. Se ține cu plan.</p>
  <h2>Prima regulă: o singură masă liberă</h2>
  <p>Seara după primul concurs, o masă liberă. Una. A doua zi dimineață, sportivul e înapoi pe planul din ultima săptămână de pregătire, cu o singură diferență: caloriile puțin mai sus, nu mai jos. Corpul de după scenă nu mai are nevoie de deficit. Are nevoie de stabilitate.</p>
  <h2>Săptămâna de mijloc</h2>
  <ul>
    <li><strong>Calorii la menținere sau puțin sub</strong>, cu carbohidrații de la nivelul din peak week, nu din dietă. Un sportiv care a urcat plin la primul concurs ține mai ușor plinătatea decât o recreează.</li>
    <li><strong>Antrenament de pompare</strong>, nu de forță: volum mediu, intensitate scăzută, fără febră musculară. Mușchiul inflamat nu arată bine sub lumini.</li>
    <li><strong>Cardio la jumătate</strong> față de ultimele săptămâni, pentru digestie și pentru cap, nu pentru grăsime.</li>
    <li><strong>Apă și sare exact ca în pregătire.</strong> Aici greșesc cei mai mulți: „relaxează” sarea după primul concurs și la al doilea arată apoși.</li>
    <li><strong>Posing în fiecare zi.</strong> Al doilea concurs se câștigă de multe ori pe prezentare, pentru că forma e aproape la fel la toți cei care vin de la primul.</li>
  </ul>
  <blockquote>Între două concursuri nu mai slăbești și nu te mai „umpli”. Păstrezi. Și păstratul e cea mai grea disciplină.</blockquote>
  <h2>Ce schimb față de primul peak week</h2>
  <p>Al doilea peak week e mai scurt și mai simplu. Am deja informația cea mai bună posibilă: cum a răspuns corpul la primul. Dacă la primul a arătat plat sâmbătă dimineața, încep carbohidrații cu o zi mai devreme. Dacă a ținut apă, scad puțin cantitatea de carbohidrați din ultima zi și păstrez totul fix. Nu adaug niciun truc nou pe care nu l-am văzut la primul.</p>
  <h2>Când spun „nu” la al doilea concurs</h2>
  <p>Dacă la primul sportivul a urcat cu 2–3 kg peste forma ideală, al doilea la două săptămâni nu rezolvă nimic: nu există timp să slăbești și să te și refaci. Mai bine un concurs bun decât două mediocre. Iar dacă omul e epuizat psihic după primul, al doilea devine o pedeapsă. Pregătirea se termină când se termină, nu când se termină calendarul de concursuri.</p>
  <h2>La trei concursuri sau mai multe</h2>
  <p>La sportivii care fac un sezon întreg, între concursuri cresc caloriile puțin mai mult, pentru că deficitul prelungit începe să mănânce mușchi. Forma la al patrulea concurs trebuie să fie la fel ca la primul, și asta se face cu mâncare, nu cu mai mult cardio.</p>`,
  cta: ["Ai două concursuri aproape unul de altul?", "În coaching planific sezonul întreg, nu un singur concurs. Scrie-mi înainte să te înscrii la al doilea.", "Fă evaluarea gratuită", "evaluare"] },

{ handle: "cand-esti-gata-sa-concurezi", cat: "Pregătire de concurs", min: 5, title: "Când ești gata să concurezi și cât durează o pregătire adevărată",
  lead: "Cele mai multe pregătiri eșuează înainte să înceapă: prea devreme, prea scurte sau de la o greutate prea mare. Cum aleg eu data concursului și cu cine nu încep deloc.",
  body: `<p>„Vreau să concurez în 8 săptămâni.” Aud propoziția asta de câteva ori pe lună. De cele mai multe ori omul are 18–20% grăsime, nu a cântărit mâncare în viața lui și are un singur argument: concursul e în 8 săptămâni. Răspunsul meu e aproape mereu același: putem concura, dar nu la concursul ăsta.</p>
  <h2>Calculul simplu pe care îl fac</h2>
  <p>Un bărbat care urcă pe scenă la culturism are, grosier, 4–6% grăsime; la classic sau men's physique, puțin mai mult. O fată de bikini, 10–13%. Ritmul sănătos de slăbit e 0,5–0,8% din greutate pe săptămână. Dacă pornești de la 90 kg cu 18% grăsime și trebuie să ajungi la 5%, ai de dat jos în jur de 12–13 kg de grăsime. La 0,6 kg pe săptămână, înseamnă 20–22 de săptămâni. Plus două de rezervă, pentru că nimic nu merge perfect. Nu există scurtătură aici. Doar pregătiri scurte care se termină prost.</p>
  <blockquote>Pregătirea nu durează cât ai tu răbdare. Durează cât are corpul tău nevoie, plus două săptămâni.</blockquote>
  <h2>Cu cine încep</h2>
  <ul>
    <li><strong>Cu omul care are deja mușchi.</strong> Definirea nu construiește nimic. Dacă nu ai ce arăta, nu ai ce defini. Un an sau doi de offseason serios înainte de primul concurs nu e timp pierdut. E singurul drum.</li>
    <li><strong>Cu omul care știe deja să mănânce cântărit</strong> de cel puțin 2–3 luni. Dacă înveți să cântărești în prima săptămână de dietă, prima lună e pierdută.</li>
    <li><strong>Cu omul care pornește de la sub 15% grăsime</strong> (bărbați) sau sub 22–24% (femei). Peste, facem mai întâi o fază de slăbit lentă, fără termen, și abia apoi punem un concurs în calendar.</li>
  </ul>
  <h2>Cu cine nu încep</h2>
  <p>Cu omul care vrea să concureze „ca să se motiveze să slăbească”. Un concurs nu e un motiv de slăbit, e vârful unui proces de ani. Cu omul care are probleme cu mâncarea pe care nu le-a rezolvat: o pregătire le adâncește. Și cu omul care nu acceptă să fie mutat concursul când pozele spun că nu ajunge.</p>
  <h2>Cum aleg data</h2>
  <ol>
    <li>Calculez săptămânile necesare din grăsimea reală (poze, talie, nu din cântarul de la sală).</li>
    <li>Adaug 2 săptămâni de rezervă.</li>
    <li>Caut concursul cel mai apropiat după data rezultată, nu cel pe care îl vrea sportivul.</li>
    <li>Fixez un punct de verificare la jumătate și unul la 4 săptămâni, unde pot muta data fără dramă.</li>
  </ol>
  <h2>Primul concurs</h2>
  <p>Pentru primul concurs vreau o pregătire puțin mai lungă decât calculul, pentru că nu știu încă cum răspunde omul la deficit, la carbohidrați, la cardio. Un prim concurs bun, chiar fără loc pe podium, construiește următorii trei ani. Unul făcut în grabă îi poate distruge.</p>`,
  cta: ["Vrei să știi dacă ești gata să te pregătești de concurs?", "Evaluarea gratuită îmi spune de unde pornești. De acolo calculăm împreună data realistă.", "Fă evaluarea gratuită", "evaluare"] },

{ handle: "suplimentele-in-ultimele-saptamani", cat: "Pregătire de concurs", min: 5, title: "Suplimentele în ultimele 6 săptămâni: ce rămâne, ce scot, ce nu intră",
  lead: "Spre concurs, dulapul de suplimente al sportivului se simplifică, nu se complică. Ce păstrez până pe scenă, ce elimin din timp și de ce „nimic nou” e regula care contează.",
  body: `<p>Cu cât se apropie concursul, cu atât sportivii vor să adauge. Un arzător, un diuretic „natural”, un produs „pentru pompare”, ceva ce a luat altcineva din sală. Eu fac exact invers: cu 6 săptămâni înainte, lista scade. Tot ce rămâne e ce are un rol clar și ce omul a luat de luni de zile fără probleme.</p>
  <h2>Ce rămâne până în ziua concursului</h2>
  <ul>
    <li><strong>Creatina</strong>, 3–5 g pe zi, neschimbată. Mitul că „ține apă sub piele” mi-a făcut, în primii ani, să o scot și să văd sportivi plați pe scenă. Creatina ține apă în mușchi, exact acolo unde o vreau. Nu o scot, nu o reduc.</li>
    <li><strong>Electroliții</strong>: sodiu din mâncare, potasiu din alimente, magneziu seara. Constant, nu „jonglat”.</li>
    <li><strong>Vitamina D, omega-3, multivitamina</strong> de bază: nu schimbă forma, dar țin corpul funcțional într-o perioadă în care mănâncă puțin.</li>
    <li><strong>Proteina din zer</strong>, ca unealtă când o masă nu e posibilă. Nu mai mult decât în pregătire.</li>
    <li><strong>Cafeina</strong>, doar dacă a fost acolo tot timpul, în aceeași doză, înainte de antrenament. Nu crescută „pentru energie”.</li>
  </ul>
  <h2>Ce scot sau reduc</h2>
  <ul>
    <li><strong>Enzimele digestive și fibrele adăugate</strong> cu 2–3 săptămâni înainte, pentru un abdomen cât mai plat. Mâncarea e deja simplă, nu mai au ce face.</li>
    <li><strong>Pre-workout-urile cu zeci de ingrediente.</strong> Nu știu ce e în ele, nu știu cum reacționează un corp la 5% grăsime la ele, și nu vreau să aflu pe scenă.</li>
    <li><strong>Orice „arzător” nou.</strong> Dacă nu a fost în plan de la început, în ultimele săptămâni nu mai schimbă nimic și de multe ori strică somnul.</li>
  </ul>
  <h2>Ce nu intră niciodată în ultimele săptămâni</h2>
  <p>Diureticele, de orice fel, inclusiv „naturale”: nu știi cât scoți și de unde, și crampele pe scenă sunt cel mai mic rău posibil. Produsele „pentru încărcare” pe care sportivul nu le-a testat. Suplimentele recomandate de cineva din culise cu o zi înainte. Nimic din ce nu a fost testat cel puțin trei săptămâni în pregătire.</p>
  <blockquote>Nicio cutie nu scoate grăsime în ultima lună. Grăsimea a plecat deja, sau nu mai pleacă.</blockquote>
  <h2>Un caz pe care îl țin minte</h2>
  <p>Un băiat de-al meu, altfel disciplinat, a luat în peak week un produs „pentru vascularizare” primit cadou de la un coleg de sală. Două zile de diaree, apă pierdută necontrolat, crampe la posing și o formă care arătase perfect miercuri și plat sâmbătă. Nu produsul a fost problema. Noutatea a fost. De atunci, regula mea pentru sportivi e scrisă în plan, cu litere mari: în ultimele șase săptămâni, nu intră nimic în corp ce nu a mai intrat.</p>
  <h2>Ce faci dacă nu ai antrenor</h2>
  <p>Ia lista ta de suplimente și bifează la fiecare: ce face, de când îl iei, cum te simți fără el. Tot ce nu trece de cele trei întrebări iese. Vei rămâne cu 4–6 lucruri. Exact câte trebuie.</p>`,
  cta: ["Ai un dulap plin și nu știi ce rămâne în pregătire?", "În coaching lista de suplimente e parte din plan, pe profilul tău. Scurtă, clară, fără experimente.", "Fă evaluarea gratuită", "evaluare"] },

{ handle: "bikini-si-culturism-doua-pregatiri-diferite", cat: "Pregătire de concurs", min: 6, title: "O fată de bikini și un băiat de culturism nu se pregătesc la fel",
  lead: "Aceleași principii, aplicate complet diferit. Ce schimb la calorii, carbohidrați, cardio și condiție când pregătesc o fată de bikini față de un sportiv de culturism, și greșeala pe care o văd la fete.",
  body: `<p>Cea mai des întâlnită greșeală pe care o văd la fetele de bikini e că se pregătesc ca băieții de culturism: deficit mare, cardio mult, carbohidrați tot mai jos, și obiectivul să fie „cât mai uscată”. Rezultatul e o fată prea slabă pentru categoria ei, fără forme, cu fața trasă și cu ciclul dispărut. Și un loc mai jos decât merita. Bikini nu e culturism la scară mică. E altă disciplină.</p>
  <h2>Condiția cerută e diferită</h2>
  <p>La culturism, juriul vrea separare, vascularizare, grăsime minimă. La bikini, vrea formă: umeri rotunzi, talie mică, fesieri plini, tonus, dar nu striații pe cvadriceps și nu abdomen „tăiat”. O fată care ajunge la condiția unui băiat de classic e, pentru bikini, prea slabă. Așa că punctul final al dietei e diferit și, de obicei, mai aproape de start decât crede ea.</p>
  <h2>Ce schimb în practică</h2>
  <ul>
    <li><strong>Deficitul e mai mic.</strong> La fete lucrez cu 10% sub menținere, rareori mai mult, pentru că corpul feminin răspunde la deficit mare prin oprirea exact a lucrurilor pe care le vreau: formă, energie, ciclu.</li>
    <li><strong>Grăsimile rămân mai sus</strong>, la 1 g pe kilogram sau peste. Niciodată sub 0,8.</li>
    <li><strong>Carbohidrații nu coboară atât de jos.</strong> O fată de bikini plată pierde forma fesierilor și a umerilor, adică exact ce se punctează.</li>
    <li><strong>Cardio mai puțin și mai târziu.</strong> Cardio-ul mult la fete mănâncă din fesieri și din picioare, nu din grăsime.</li>
    <li><strong>Antrenamentul rămâne greu</strong> pe fesieri și umeri până aproape de concurs. Mușchiul pe care îl pierzi în pregătire nu se mai vede pe scenă.</li>
  </ul>
  <h2>Ciclul menstrual intră în plan</h2>
  <p>La fete, cântarul și pozele se citesc pe cicluri, nu pe săptămâni. Săptămâna dinaintea menstruației aduce apă, pofte, cântar în sus. Dacă tai calorii atunci, tai din cauza apei, nu a grăsimii. Compar săptămâna 2 cu săptămâna 2 a ciclului anterior, nu cu săptămâna de dinainte. Și dacă ciclul dispare, planul e prea agresiv, indiferent ce spune oglinda.</p>
  <blockquote>Un ciclu dispărut nu e „normal în pregătire”. E semnul că pregătirea a mers prea departe.</blockquote>
  <h2>La băieți, invers</h2>
  <p>La un sportiv de culturism, condiția e totul. Deficitul poate fi mai mare, carbohidrații coboară mai jos în ultimele săptămâni, cardio-ul urcă mai mult, și accept să piardă puțină plinătate ca să câștige separare. Ceea ce la o fată de bikini ar fi o greșeală, la el e exact planul.</p>
  <h2>Ce au în comun</h2>
  <p>Proteina sus, ajustări mici, apă și sare constante, posing din prima săptămână, poze în aceeași lumină, răbdare. Principiile sunt aceleași. Doar dozele și punctul final sunt diferite. Și tocmai de asta nu dau niciodată planul unui băiat unei fete, nici invers.</p>`,
  cta: ["Te pregătești pentru bikini sau pentru culturism?", "Planul pornește de la categoria ta și de la profilul tău, nu de la un șablon. Vezi ce îți arată evaluarea.", "Fă evaluarea gratuită", "evaluare"] },

{ handle: "greselile-sportivilor-care-se-pregatesc-singuri", cat: "Coaching", min: 6, title: "Cele 9 greșeli pe care le văd la sportivii care se pregătesc singuri",
  lead: "Nu lipsa de voință îi oprește. Lipsa unui om din afară care să vadă ce ei nu pot vedea. Lista greșelilor pe care le repar cel mai des când cineva vine la mine după o pregătire făcută singur.",
  body: `<p>Mulți dintre sportivii mei au venit la mine după cel puțin o pregătire făcută singuri. Unii au ieșit bine, cei mai mulți nu. Și când ne uităm împreună pe ce au făcut, greșelile sunt surprinzător de aceleași. Nu din lipsă de informație: au citit mai mult decât mine. Din lipsa cuiva care să-i vadă din afară.</p>
  <h2>Înainte să înceapă</h2>
  <ol>
    <li><strong>Încep prea târziu.</strong> Opt săptămâni pentru 10 kilograme. Nu merge, și prima lună e pierdută cu „recuperarea” planului.</li>
    <li><strong>Taie prea mult din prima săptămână.</strong> Jumătate din mâncare în ziua 1, cardio zilnic din ziua 2. Două săptămâni spectaculoase, apoi blocaj fără ieșire, pentru că nu a mai rămas nimic de tăiat.</li>
    </ol>
  <h2>În timpul pregătirii</h2>
  <ol start="3">
    <li><strong>Schimbă ceva în fiecare zi.</strong> Luni au citit despre carbohidrați seara, marți despre post intermitent, joi despre sare. Până vineri planul nu mai seamănă cu cel de luni și nimeni nu știe ce a funcționat.</li>
    <li><strong>Se compară cu pozele altora.</strong> Cu cineva din altă categorie, altă genetică, altă lumină, de multe ori editată. Și trag concluzia că trebuie să taie mai mult.</li>
    <li><strong>Nu fac poze în aceeași lumină.</strong> Azi la geam, mâine la baie, poimâine la sală. Și iau decizii de dietă dintr-o diferență de lumină.</li>
    <li><strong>Lasă posingul pe final.</strong> Două săptămâni înainte încep să „repete pozele”. Pe scenă tremură, nu țin contracția, pierd în fața unor oameni cu formă mai slabă.</li>
    </ol>
  <h2>Spre final</h2>
  <ol start="7">
    <li><strong>Se joacă cu apa și cu sarea.</strong> Scot sarea „ca să se usuce”, beau 8 litri într-o zi și 2 în alta. Oglinda se schimbă din cauza apei și ei cred că e grăsime.</li>
    <li><strong>Experimentează în peak week.</strong> Un protocol de pe internet, aplicat prima dată în viață exact în săptămâna care nu permite nicio greșeală.</li>
    <li><strong>Nu au plan pentru după.</strong> Concursul se termină duminică, iar luni începe un rebound de trei luni care șterge tot.</li>
  </ol>
  <blockquote>Nu e nimic greșit la a te pregăti singur. Greșit e să te pregătești singur și să nu ai pe nimeni care să-ți spună când greșești.</blockquote>
  <h2>Ce au în comun toate cele nouă</h2>
  <p>Toate vin din același loc: sportivul se vede pe el, de aproape, în fiecare zi, și nu mai poate judeca. Antrenorul nu e deștept. E din afară. Vede o poză pe săptămână, compară cu cea de acum o lună și spune „stai pe loc” sau „schimbă puțin”. Atât. Dar acel „atât” face diferența dintre o pregătire bună și una ratată.</p>
  <h2>Dacă totuși te pregătești singur</h2>
  <p>Scrie-ți planul înainte să începi și nu-l schimba mai des de o dată pe săptămână. Fă pozele la fel. Pune posingul în program din prima zi. Și găsește măcar un om, nu de la sală, care să se uite la pozele tale o dată pe săptămână și să-ți spună cinstit ce vede.</p>`,
  cta: ["Te-ai regăsit în cel puțin trei dintre ele?", "Nu ești singurul. Scrie-mi, ne uităm împreună pe pozele tale și vedem ce schimbăm.", "Fă evaluarea gratuită", "evaluare"] },

{ handle: "sportivul-care-triseaza-in-dieta", cat: "Coaching", min: 5, title: "Sportivul care trișează în dietă și nu-mi spune",
  lead: "Îl văd în poze înainte să recunoască. De ce ascund sportivii, cum am învățat să nu-i mai pedepsesc și regula care a schimbat felul în care lucrez cu ei.",
  body: `<p>Am avut un sportiv care, timp de trei săptămâni, îmi scria la fiecare check-in „totul perfect, 100% pe plan”. Pozele spuneau altceva: apă pe spatele inferior luni dimineața, cântar sus în fiecare început de săptămână, apoi „miraculos” jos joi. Nu trebuie să fii detectiv. Weekendul se vede în poze. Când l-am întrebat direct, fără reproș, a recunoscut: sâmbăta seara, de trei săptămâni, mânca tot ce găsea. Și nu-mi spunea pentru că îi era rușine.</p>
  <h2>De ce ascund</h2>
  <ul>
    <li><strong>Rușinea.</strong> Plătesc un antrenor, s-au angajat public, și simt că o abatere îi face „slabi”.</li>
    <li><strong>Frica de reacție.</strong> Au avut antrenori care țipau, care tăiau din mâncare „ca pedeapsă” sau care îi făceau de râs.</li>
    <li><strong>Autoamăgirea.</strong> „Nu a fost mare lucru.” O pizza și o înghețată sunt 2.000 de kcal, adică deficitul pe trei zile.</li>
    <li><strong>Planul e greșit.</strong> Cel mai des. Un om care trișează sistematic sâmbăta e, de obicei, un om prea flămând până sâmbătă.</li>
  </ul>
  <h2>Ce nu fac</h2>
  <p>Nu pedepsesc. Nu tai calorii „ca să compenseze”. Nu adaug cardio de penitență. Toate astea îl învață un singur lucru: să ascundă mai bine data viitoare. Și un sportiv care ascunde e un sportiv pe care nu-l mai pot antrena, pentru că lucrez pe date false.</p>
  <blockquote>Nu am nevoie de un sportiv perfect. Am nevoie de unul cinstit. Cu cel cinstit repar orice. Cu cel perfect pe hârtie nu pot repara nimic.</blockquote>
  <h2>Regula pe care o spun din prima zi</h2>
  <p>„Dacă ai mâncat ceva în plus, îmi scrii în aceeași seară, cu ce și cât. Nu te cert. Ajustez.” Și mă țin de cuvânt. Un check-in cinstit cu „am greșit sâmbătă” primește de la mine „ok, mulțumesc că mi-ai spus, nu schimbăm nimic, continuăm”. Pentru că o singură masă nu strică o pregătire. Ascunsul o strică.</p>
  <h2>Ce fac cu informația</h2>
  <ol>
    <li><strong>Mă uit dacă e un tipar.</strong> O dată e un accident. De trei ori la rând în aceeași zi a săptămânii e o problemă de plan.</li>
    <li><strong>Mut masa liberă</strong> exact în locul în care apar abaterile. Dacă sâmbătă seara e punctul slab, sâmbătă seara devine masa liberă oficială, planificată.</li>
    <li><strong>Verific foamea</strong> din restul săptămânii: dacă e prea mare, urc puțin caloriile de peste zi. Un om mai puțin flămând trișează mai puțin.</li>
    <li><strong>Verific profilul.</strong> Unii oameni funcționează perfect cu reguli rigide, alții au nevoie de o marjă de libertate zilnică, altfel explodează o dată pe săptămână. La ei, planul are „locul de respirat” scris în el.</li>
  </ol>
  <h2>Când e cu adevărat o problemă</h2>
  <p>Când abaterile vin cu vină, cu ascuns și cu compensări (foame a doua zi, cardio în plus, mese sărite), nu mai e o problemă de dietă. E una de relație cu mâncarea, și atunci pregătirea de concurs nu e locul potrivit să o rezolvăm. O spun deschis și, de câteva ori, am oprit o pregătire din motivul ăsta. A fost cea mai bună decizie pentru omul respectiv, chiar dacă nu a fost cea mai bună pentru palmaresul meu.</p>`,
  cta: ["Ai trișat în dietă și nu ai spus nimănui?", "La mine poți spune. Lucrez pe date reale, nu pe check-in-uri perfecte.", "Fă evaluarea gratuită", "evaluare"] },

{ handle: "ultimele-doua-saptamani-nu-te-mai-vezi", cat: "Mindset", min: 5, title: "În ultimele două săptămâni nu te mai vezi. Și e normal.",
  lead: "Cei mai uscați oameni pe care i-am pregătit au fost convinși, cu 10 zile înainte, că sunt grași. Ce se întâmplă în capul unui sportiv la final de pregătire și regulile cu care trec prin el.",
  body: `<p>Un sportiv de-al meu, cu zece zile înainte de concurs, în cea mai bună formă pe care o avusese vreodată, mi-a scris la două noaptea că „nu e gata”, că „se vede moale” și că vrea să taie carbohidrații la zero și să facă două cardio-uri pe zi. Dacă îl lăsam, urca pe scenă plat, apos și epuizat. Nu i-am schimbat planul. I-am schimbat ce se uita.</p>
  <h2>Ce se întâmplă</h2>
  <p>După luni de deficit, creierul nu mai funcționează ca de obicei. Carbohidrații puțini, somnul mai prost, stresul concursului și faptul că te uiți la tine de zeci de ori pe zi, toate deformează judecata. Te vezi în fiecare oglindă, la fiecare lumină, și creierul alege mereu cea mai proastă versiune. Nu ești gras. Ești obosit și prea aproape de tine ca să mai vezi.</p>
  <blockquote>În ultimele două săptămâni, oglinda nu mai e un instrument. E un zgomot.</blockquote>
  <h2>Regulile mele pentru final</h2>
  <ol>
    <li><strong>Pozele, o dată pe zi, dimineața, la aceeași lumină.</strong> Apoi telefonul se pune jos. Nu te mai pozezi la sală, în baie, la prieteni. O singură imagine pe zi, pe care o citesc eu.</li>
    <li><strong>Nicio decizie de dietă nu o iei tu.</strong> Nici de carbohidrați, nici de cardio, nici de apă. Dacă vrei să schimbi ceva, îmi scrii, și răspunsul meu e de obicei „nu”.</li>
    <li><strong>Fără pozele altora.</strong> Instagramul se închide în ultimele două săptămâni. Toți cei din categoria ta par mai uscați decât tine, pentru că îi vezi în cea mai bună lumină și pe tine în cea mai proastă.</li>
    <li><strong>Fără sfaturi din afară.</strong> Colegul de sală, un cunoscut care „a concurat și el”, un video de pe internet. Oricine altcineva în afară de omul care te-a văzut în fiecare săptămână nu are ce să-ți spună acum.</li>
    <li><strong>Somnul devine prioritate</strong> peste antrenament. Ultimele antrenamente sunt ușoare oricum. Somnul e ce decide cum arăți.</li>
  </ol>
  <h2>Ce îi spun sportivului</h2>
  <p>Că e normal. Că l-am văzut la toți cei dinaintea lui și că nici unul dintre ei nu a avut dreptate când se credea gras. Că forma e deja făcută și că singurul lucru pe care îl mai poate strica e să intervină. Și că eu nu am nicio emoție în ce privește pozele lui, pentru că eu nu sunt în corpul lui. Exact de asta sunt util.</p>
  <h2>Și dacă nu ai antrenor</h2>
  <p>Ia o singură persoană în care ai încredere, arată-i pozele de dimineață o dată pe zi și nu schimba nimic fără ea. Scrie-ți planul ultimelor două săptămâni înainte să intri în ele, când încă judeci limpede, și respectă-l ca pe un contract cu tine cel lucid. Omul de la 10 zile înainte nu e omul care a făcut planul. Nu-l lăsa să-l rescrie.</p>`,
  cta: ["Ești aproape de concurs și nu te mai vezi?", "E momentul în care un om din afară contează cel mai mult. Hai să vorbim.", "Fă evaluarea gratuită", "evaluare"] },
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
writeFileSync(path.join(here, "_noi-lista-2.json"), JSON.stringify(A.map(a => ({ handle: a.handle, cat: a.cat, title: a.title, lead: a.lead })), null, 1));
console.log(A.length, "articole noi (21–35)");
for (const a of A) console.log(a.handle.padEnd(48), a.cat.padEnd(22), a.body.length);
