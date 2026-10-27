// Chera Protocol – articolele 11–20 (27.10.2026), scrise la persoana I, ca de la Marius.
// Generează câte un .html în același format ca primele 10 (articol.css). Rulează: node site/articole/_genereaza-noi.mjs
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
const here = path.dirname(fileURLToPath(import.meta.url));
const DATA = "27.10.2026";

const A = [
{ handle: "ajustari-mici-la-definire", cat: "Nutriție", min: 5, title: "De ce nu tai niciodată mai mult de 10–15% o dată",
  lead: "Cea mai rapidă cale să blochezi o definire e să tai mult, devreme. Cum fac eu ajustările și de ce aștept o săptămână între ele.",
  body: `<p>Aproape fiecare om care vine la mine după o definire eșuată îmi povestește aceeași poveste: a început cu entuziasm, a tăiat jumătate din mâncare în prima săptămână, a slăbit spectaculos două săptămâni, apoi s-a oprit. Și când s-a oprit, a mai tăiat. Și când s-a oprit din nou, nu mai avea de unde.</p>
  <p>Corpul nu e un cont bancar în care scoți cât vrei. E un sistem care se apără. Cu cât tai mai mult și mai repede, cu atât se apără mai tare: scade mișcarea spontană din zi, scade energia la antrenament, crește foamea, se strică somnul. Iar tu rămâi cu un deficit pe hârtie și cu progres zero în oglindă.</p>
  <h2>Regula mea</h2>
  <p>Nu schimb niciodată caloriile cu mai mult de 10–15% o dată. Dacă un om mănâncă 2.800 de kcal și vreau să intru în definire, prima ajustare e la 2.450–2.500, nu la 1.800. Și nu schimb nimic altceva în aceeași săptămână: nici cardio-ul, nici antrenamentul, nici suplimentele. O singură variabilă, ca să știu exact ce a funcționat.</p>
  <blockquote>Dacă schimbi cinci lucruri deodată și merge, nu știi de ce. Dacă nu merge, nu știi ce să repari.</blockquote>
  <h2>De ce aștept 7–10 zile</h2>
  <p>Greutatea de pe cântar se mișcă din zeci de motive care nu au legătură cu grăsimea: sare, carbohidrați, apă, stres, somn, tranzit. O zi nu spune nimic. Trei zile spun puțin. Media pe 7 zile, împreună cu pozele și cu talia, îmi spune ce se întâmplă de fapt.</p>
  <p>Așa că după fiecare ajustare aștept cel puțin o săptămână. Dacă media scade cu 0,5–1% din greutatea corporală pe săptămână, nu ating nimic. Dacă stă pe loc două săptămâni la rând, fac următoarea ajustare mică.</p>
  <h2>Ce tai întâi</h2>
  <ul>
    <li><strong>Grăsimile din mesele fără legătură cu antrenamentul.</strong> Uleiul în plus, nucile „din mers”, sosurile.</li>
    <li><strong>Carbohidrații de dimineață și de prânz.</strong> Cei din jurul antrenamentului rămân cât mai mult, pentru că ei țin greutățile sus.</li>
    <li><strong>Abia apoi cardio.</strong> Cardio-ul e o unealtă de final, nu de început.</li>
  </ul>
  <h2>Semnul că tai prea repede</h2>
  <p>Greutățile din sală. Dacă în primele săptămâni de definire scad greutățile la exercițiile de bază, nu e normal, e un semnal. La începutul definirii trebuie să fii la fel de puternic. Forța scade puțin abia spre final, când ești deja uscat. Dacă scade din prima lună, mergem prea repede și pierdem exact mușchiul pe care încercăm să-l scoatem la vedere.</p>
  <p>Definirea bună arată plictisitor pe hârtie: pași mici, aceeași rutină, răbdare. Dar e singura care se termină cu un fizic mai bun decât cel cu care ai pornit.</p>` ,
  cta: ["Vrei o definire făcută cu cap?", "În coaching ajustez eu planul în fiecare săptămână, pe pozele, cântarul și check-in-ul tău.", "Vezi coaching-ul", "#usi"] },

{ handle: "ciclarea-carbohidratilor", cat: "Nutriție", min: 6, title: "Zile mari, zile mici: cum ciclez carbohidrații",
  lead: "De ce nu le dau sportivilor aceiași carbohidrați în fiecare zi și cum leg zilele mari de antrenamentele care contează.",
  body: `<p>Un antrenament de picioare greu și o zi de pauză nu au nevoie de aceeași mâncare. Pare evident, dar majoritatea planurilor pe care le văd au aceleași cantități de luni până duminică. Ciclarea carbohidraților înseamnă doar atât: mănânci mai mulți carbohidrați în zilele în care corpul îi folosește și mai puțini în zilele în care nu.</p>
  <h2>Cum împart săptămâna</h2>
  <ul>
    <li><strong>Zile mari</strong> (1–2 pe săptămână): picioare și spate, antrenamentele cu cel mai mare volum. Carbohidrații urcă, grăsimile coboară.</li>
    <li><strong>Zile medii</strong> (2–3 pe săptămână): restul antrenamentelor. Carbohidrați moderați, concentrați în jurul antrenamentului.</li>
    <li><strong>Zile mici</strong> (zilele de pauză): carbohidrați puțini, grăsimi mai multe, proteinele la fel.</li>
  </ul>
  <p>Proteinele nu se ciclează. Rămân aceleași în fiecare zi, pentru că mușchiul se reface și în zilele de pauză, ba chiar mai ales atunci.</p>
  <h2>De ce funcționează</h2>
  <p>În zilele mari, carbohidrații umplu glicogenul din mușchi exact când ai nevoie de el: la antrenamentul greu și în recuperarea de după. Te simți plin, puternic, cu pompare bună. În zilele mici, corpul se bazează mai mult pe grăsimi, iar media săptămânală de calorii rămâne în deficit sau la menținere, fără să simți că ești la dietă în fiecare zi.</p>
  <blockquote>Nu e magie metabolică. E aceeași cantitate de mâncare pe săptămână, pusă acolo unde lucrează cel mai bine.</blockquote>
  <h2>Cui nu i se potrivește</h2>
  <p>Oamenilor care au nevoie de rutină absolută și care se stresează când fiecare zi arată altfel. La ei folosesc o variantă mai simplă: zi de antrenament și zi de pauză, atât. La fel la cei care încep: primele luni, constanța bate rafinamentul.</p>
  <p>Mai e un tip de om la care merge invers decât te-ai aștepta: cel care tolerează foarte bine carbohidrații puțini în timpul săptămânii și explodează de energie în weekend, după o încărcare mare. La el construiesc săptămâna cu 5 zile cu carbohidrați scăzuți și 1–2 zile cu carbohidrați mulți. Dar asta o decid după testul de toleranță, nu după preferință.</p>
  <h2>Cum arată concret</h2>
  <p>La un bărbat de 85 kg în definire moderată, o zi mare poate avea 300–350 g de carbohidrați, o zi medie 180–220 g și o zi mică 80–100 g. Cifrele exacte le calculez pe om, dar raportul rămâne cam acesta. Iar la masa de după antrenament, în ziua mare, nu mă sperii de carbohidrați rapizi: orez alb, cremă de orez, fructe.</p>
  <p>Ciclarea nu e obligatorie ca să ai rezultate. Dar la sportivii care s-au blocat pe un plan liniar, e de multe ori prima schimbare care îi repornește.</p>`,
  cta: ["Vrei să afli cum tolerezi carbohidrații?", "Evaluarea gratuită îți arată profilul și cum îți împart eu carbohidrații în zi.", "Fă evaluarea", "evaluare"] },

{ handle: "testul-tolerantei-la-carbohidrati", cat: "Nutriție", min: 5, title: "Testul pe care îl fac cu fiecare client nou",
  lead: "Doi oameni cu aceeași greutate pot reacționa complet diferit la aceeași farfurie de orez. Cum aflu în zece zile cum tolerezi carbohidrații.",
  body: `<p>Am avut în aceeași lună doi sportivi cu aceeași greutate, aceeași vârstă și cam același nivel. Unul mânca 400 g de carbohidrați pe zi și arăta tot mai uscat. Celălalt mânca jumătate și arăta umflat, obosit, fără pompare. Dacă le dădeam aceeași dietă, unul dintre ei pierdea sigur.</p>
  <p>De atunci, cu fiecare client nou fac un test simplu înainte să fixez carbohidrații. Nu e un test de laborator. E un test de observație, făcut cinstit, care îmi spune mai mult decât orice formulă.</p>
  <h2>Cum se face</h2>
  <ol>
    <li><strong>Zilele 1–5:</strong> calorii la menținere, proteine normale, carbohidrați scăzuți (sub 1 g pe kg corp), grăsimi mai multe.</li>
    <li><strong>Zilele 6–7:</strong> aceleași calorii totale, dar carbohidrații urcă la 4–5 g pe kg corp, iar grăsimile coboară mult.</li>
    <li><strong>Zilele 8–10:</strong> revii la normal și notezi cum te simți.</li>
  </ol>
  <p>În tot acest timp notezi zilnic: greutatea de dimineață, cum arăți în oglindă (cu poze), energia la antrenament, pompajul, somnul și digestia.</p>
  <h2>Cum citesc rezultatul</h2>
  <ul>
    <li><strong>Toleranță bună:</strong> în zilele cu carbohidrați mulți te simți plin, puternic, cu pompare mare, iar a doua zi arăți mai uscat și mai tare. La tine carbohidrații sunt o unealtă, îi folosim mult.</li>
    <li><strong>Toleranță medie:</strong> te simți bine, dar a doua zi ești puțin mai „moale”. Carbohidrați moderați, concentrați în jurul antrenamentului.</li>
    <li><strong>Toleranță scăzută:</strong> te simți umflat, somnoros, plat, uneori cu digestie grea. La tine carbohidrații stau mai jos și aproape doar după antrenament.</li>
  </ul>
  <blockquote>Corpul tău îți spune ce vrea. Trebuie doar să-l întrebi cinstit și să notezi răspunsul.</blockquote>
  <h2>Ce nu îți spune testul</h2>
  <p>Nu îți spune că ai o problemă medicală și nici nu o exclude. Dacă ai glicemia mare, diabet în familie sau alte probleme, analizele și medicul vin înainte. Testul meu e pentru oameni sănătoși care vor să afle cum își folosesc mai bine mâncarea.</p>
  <p>Și nu e definitiv. Toleranța se schimbă: cu cât ești mai uscat și mai activ, cu atât tolerezi mai bine carbohidrații. De aceea îl repet la începutul fiecărei faze mari: construcție sau definire.</p>`,
  cta: ["Vrei testul ghidat de mine?", "În coaching îl facem în primele două săptămâni, cu check-in zilnic.", "Vezi coaching-ul", "#usi"] },

{ handle: "refeed-ul-nu-e-cheat-meal", cat: "Nutriție", min: 5, title: "Refeed-ul nu e cheat meal",
  lead: "Diferența dintre o zi cu carbohidrați mulți planificată și o seară în care mănânci tot din frigider. Când folosesc refeed-ul și când îl scot.",
  body: `<p>Mulți sportivi îmi spun „am avut refeed” când de fapt au avut o pizza, o înghețată și jumătate de cutie de biscuiți. Asta nu e refeed. E o masă liberă, care are și ea locul ei, dar face altceva.</p>
  <h2>Ce e un refeed</h2>
  <p>O zi, uneori două, în timpul definirii, în care urc caloriile la menținere sau puțin peste, aproape exclusiv din carbohidrați. Proteinele rămân la fel, grăsimile scad. Mâncarea e curată: orez, cartofi, ovăz, paste, fructe. Nu dulciuri, nu prăjeli.</p>
  <h2>De ce îl folosesc</h2>
  <ul>
    <li><strong>Antrenamente mai bune.</strong> După săptămâni de deficit, glicogenul e jos. O zi cu carbohidrați mulți umple mușchiul și următoarele antrenamente sunt vizibil mai puternice.</li>
    <li><strong>Pauză psihologică.</strong> Știi că vine ziua aceea și ții mai ușor restul săptămânii.</li>
    <li><strong>Un semnal pentru corp.</strong> Deficitul lung scade energia și mișcarea spontană. O zi cu mâncare multă nu repară totul, dar ajută.</li>
    <li><strong>O informație pentru mine.</strong> Cum arată sportivul a doua zi după refeed îmi spune cât de aproape e de formă.</li>
  </ul>
  <blockquote>Dacă a doua zi după refeed arăți mai plin și mai uscat, mergem bine. Dacă arăți umflat și moale, mai e drum.</blockquote>
  <h2>Când îl folosesc</h2>
  <p>Nu din prima săptămână de definire. La început ai rezerve, nu ai nevoie de el. Îl introduc când grăsimea corporală a scăzut destul și antrenamentele încep să sufere: de obicei o dată la 7–14 zile, apoi mai des spre final la cei slabi.</p>
  <p>La oamenii care încă au mult de slăbit, refeed-ul e rar. La ei, o masă liberă pe săptămână e suficientă pentru partea psihologică.</p>
  <h2>Masa liberă, separat</h2>
  <p>Masa liberă e o singură masă, nu o zi. O planificăm, de obicei după antrenamentul cel mai greu al săptămânii, și o mănânci liniștit, fără vină. Nu o „compensezi” a doua zi cu foame sau cu două ore de cardio. Dacă o masă liberă îți strică o săptămână, problema nu e masa, ci restul planului.</p>
  <p>Refeed-ul e o unealtă de antrenor, cu doze și momente. Masa liberă e o supapă. Amândouă își au locul, doar să nu le confunzi.</p>`,
  cta: ["Vrei un plan care ține pe termen lung?", "Îți construiesc definirea pe profilul tău, cu refeed și masă liberă puse la locul lor.", "Fă evaluarea gratuită", "evaluare"] },

{ handle: "apa-si-sarea-in-pregatire", cat: "Competiție", min: 5, title: "Apa și sarea în pregătire: constanța bate trucurile",
  lead: "De ce sportivii mei beau aceeași apă și mănâncă aceeași sare în fiecare zi, de la prima săptămână până în ziua concursului.",
  body: `<p>Dacă vrei să-ți strici o pregătire fără să te atingi de dietă, joacă-te cu apa și cu sarea. În fiecare sezon văd sportivi care schimbă cantitatea de apă de la o zi la alta, scot sarea „ca să se usuce”, apoi o pun la loc „ca să fie plini”. Și apoi se miră că nu înțeleg ce văd în oglindă.</p>
  <h2>Corpul se adaptează la ce îi dai constant</h2>
  <p>Rinichii și hormonii care reglează apa lucrează pe ce primesc zi de zi. Dacă bei 5 litri și mănânci aceeași sare în fiecare zi, după câteva zile corpul ajunge la un echilibru: elimini cât bagi, iar imaginea din oglindă e stabilă. Abia atunci poți judeca ce face dieta.</p>
  <p>Dacă azi bei 3 litri și mâine 7, dacă azi mănânci sărat și mâine nesărat, imaginea se schimbă din cauza apei, nu a grăsimii. Iar tu iei decizii greșite: tai calorii când nu era nevoie sau crezi că ai ajuns în formă când doar ai băut puțin.</p>
  <blockquote>Nu poți citi o hartă care se schimbă în fiecare dimineață.</blockquote>
  <h2>Ce le cer</h2>
  <ul>
    <li><strong>Apă:</strong> o cantitate fixă pe zi, în funcție de greutate și de cât transpiri, de obicei între 4 și 6 litri la bărbați. Aceeași în zilele de antrenament și în cele de pauză, cu un plus mic în zilele foarte calde.</li>
    <li><strong>Sare:</strong> o cantitate fixă, măsurată, adăugată în mâncare. Nu o scoatem în definire. Sarea ține pompajul, ajută contracția și scade crampele.</li>
    <li><strong>Potasiu și magneziu</strong> din alimente și, unde e nevoie, din suplimente, tot constant.</li>
  </ul>
  <h2>Și în ultima săptămână?</h2>
  <p>Nu tai apa și nu scot sarea. Am explicat pe larg în articolul despre peak week: corpul reacționează la lipsa apei reținând-o. Tot ce fac în ultimele zile e să păstrez rutina, cu ajustări foarte mici, doar la sportivii pe care îi cunosc de mai multe sezoane.</p>
  <h2>Excepția</h2>
  <p>Dacă ai tensiune mare, probleme renale sau iei medicamente care influențează apa și sarea, cantitățile le stabilește medicul, nu eu. Restul sportivilor sănătoși au nevoie de un singur lucru: aceeași rutină în fiecare zi.</p>`,
  cta: ["Te pregătești de concurs?", "Pregătirea de concurs începe cu un plan complet și un video call cu mine.", "Vezi pregătirea de concurs", "#usi"] },

{ handle: "posingul-din-prima-saptamana", cat: "Competiție", min: 5, title: "Posingul se antrenează din prima săptămână",
  lead: "Am văzut locuri pierdute pe scenă de oameni mai buni decât cei din fața lor. De ce posingul e un antrenament, nu o repetiție de final.",
  body: `<p>Arbitrii nu te văd în sală. Te văd 60–90 de secunde, în lumină puternică, lângă alți cinci oameni la fel de pregătiți. În timpul acela, cum arăți depinde la fel de mult de cum stai ca de cât de uscat ești. Iar cum stai se învață în luni, nu în zile.</p>
  <h2>Greșeala clasică</h2>
  <p>Sportivul se pregătește 20 de săptămâni pentru fizic și 3 săptămâni pentru posing. În ultimele săptămâni e obosit, flămând, cu crampe, și încearcă să învețe să țină o poză zece secunde fără să tremure. Rezultatul: pe scenă se vede efortul, nu mușchiul.</p>
  <blockquote>Posingul e jumătate tehnică, jumătate condiție fizică. Să ții abdomenul vacuum și picioarele contractate un minut e un antrenament în sine.</blockquote>
  <h2>Cum îl lucrăm</h2>
  <ul>
    <li><strong>Din prima săptămână, 15–20 de minute pe zi</strong>, după antrenament sau seara. În fața oglinzii, apoi filmat.</li>
    <li><strong>Pozele obligatorii ale categoriei tale</strong>, fiecare ținută 10–15 secunde, 3 runde complete.</li>
    <li><strong>Tranzițiile</strong> între poze, care sunt aproape la fel de judecate ca pozele.</li>
    <li><strong>Rutina completă în timp real</strong>, cu cronometru, o dată pe săptămână la început, zilnic în ultima lună.</li>
    <li><strong>Vacuum în fiecare dimineață</strong>, 5 serii de 20–30 de secunde, pe stomacul gol.</li>
  </ul>
  <h2>Ce urmăresc în filmări</h2>
  <p>Unde se pierde tensiunea. Aproape toată lumea contractă bine partea de sus a corpului și uită picioarele. Sau ține picioarele și lasă abdomenul să iasă. Sau zâmbește crispat. Fiecare om are un punct slab, iar filmarea săptămânală îl arată mai bine decât orice oglindă.</p>
  <h2>Posingul te ajută și la definire</h2>
  <p>Un efect pe care sportivii nu îl așteaptă: cei care pozează zilnic își cunosc mai bine corpul, simt mai bine mușchii la antrenament și văd mai clar progresul. Și, nu în ultimul rând, ard ceva în plus: 20 de minute de contracții izometrice pe zi nu sunt puțin.</p>
  <p>Dacă vrei să concurezi, începe azi să pozezi. Fizicul îl construim împreună, dar prezentarea lui o înveți doar exersând.</p>`,
  cta: ["Vrei să lucrăm posingul?", "Ședințele de posing se rezervă direct din site, live în Sibiu sau online pe WhatsApp video.", "Vezi sesiunile", "#sesiuni"] },

{ handle: "cardio-pe-definire", cat: "Antrenament", min: 6, title: "Cardio pe definire: cât, când și de ce nu începem cu el",
  lead: "Cardio-ul e o unealtă bună, folosită prost de aproape toată lumea. Cum îl dozez eu de la prima la ultima săptămână de definire.",
  body: `<p>Prima întrebare la o definire e aproape mereu „cât cardio fac?”. Răspunsul meu îi surprinde pe mulți: la început, aproape deloc. Cardio-ul e o unealtă pe care o păstrez pentru momentul în care dieta singură nu mai merge. Dacă o folosești de la început, rămâi fără ea când chiar ai nevoie.</p>
  <h2>De ce nu încep cu cardio</h2>
  <p>Corpul se adaptează la orice. Dacă începi definirea cu o oră de cardio pe zi, în câteva săptămâni corpul devine mai eficient, arzi mai puțin pentru același efort, iar tu ai nevoie de și mai mult cardio ca să continui. Plus că o oră de bandă pe zi înseamnă mai puțină energie la antrenamentul de forță, adică exact acolo unde păstrezi mușchiul.</p>
  <blockquote>Definirea o începi cu dieta și pașii zilnici. Cardio-ul îl adaugi pe rând, ca pe o dozare.</blockquote>
  <h2>Cum îl introduc</h2>
  <ol>
    <li><strong>Pașii zilnici întâi.</strong> 8.000–10.000 de pași pe zi, constant. E cel mai ieftin cardio și nu obosește deloc.</li>
    <li><strong>Apoi 2–3 ședințe de 20–30 de minute</strong> de cardio liniștit (pantă la bandă, bicicletă), la puls la care poți vorbi.</li>
    <li><strong>Apoi creștem durata sau numărul</strong>, câte 10–15 minute o dată, când scăderea se oprește două săptămâni și am ajustat deja dieta.</li>
    <li><strong>Intervalele intense</strong> le folosesc puțin: maximum 2 pe săptămână, la oamenii care se recuperează bine. Obosesc picioarele și se simt la antrenament.</li>
  </ol>
  <h2>Dimineața pe stomacul gol?</h2>
  <p>La unii merge foarte bine: se simt ușori, au timp, le pune ziua în mișcare. La alții, cardio pe stomacul gol înseamnă amețeală și o zi întreagă cu foame. Diferența de grăsime arsă la final e mică. Aleg momentul care se potrivește omului și pe care îl poate ține constant. Constanța contează mai mult decât ora.</p>
  <h2>Când e prea mult</h2>
  <p>Când forța scade săptămână de săptămână, somnul se strică, pulsul de repaus urcă și pofta de antrenament dispare. Atunci nu mai adaug cardio. Fac o pauză de dietă de câteva zile sau o zi de refeed și abia apoi continuăm.</p>
  <p>Cardio-ul nu e o pedeapsă pentru ce ai mâncat. E o doză, ca orice altceva din plan.</p>`,
  cta: ["Vrei definirea făcută pe profilul tău?", "Evaluarea gratuită îmi arată cum răspunzi la efort și la dietă.", "Fă evaluarea", "evaluare"] },

{ handle: "tempo-ul-din-programe", cat: "Antrenament", min: 5, title: "Cifrele din programele mele: ce înseamnă 4-0-1-0",
  lead: "Patru cifre lângă un exercițiu schimbă complet efectul seriei. Cum citești tempo-ul și de ce îl scriu la aproape fiecare exercițiu.",
  body: `<p>Mulți dintre cei care primesc primul program de la mine mă întreabă ce sunt cifrele de lângă exerciții. 4-0-1-0, 3-1-1-0, 2-2-1-1. Sunt tempo-ul: viteza cu care faci fiecare parte a repetării. Și sunt unul dintre cele mai subestimate lucruri din antrenament.</p>
  <h2>Cum se citesc</h2>
  <ul>
    <li><strong>Prima cifră:</strong> secundele de coborâre (negativul). La împins, cât îți ia să cobori bara spre piept.</li>
    <li><strong>A doua:</strong> pauza în poziția de jos, în stretch.</li>
    <li><strong>A treia:</strong> secundele de urcare (pozitivul). 1 înseamnă cât de repede poți, controlat.</li>
    <li><strong>A patra:</strong> pauza sus, în contracție.</li>
  </ul>
  <p>Deci 4-0-1-0 înseamnă: cobori în 4 secunde, nu stai jos, urci exploziv, nu stai sus. O repetare durează 5 secunde. O serie de 8 repetări durează 40 de secunde.</p>
  <h2>De ce contează</h2>
  <p>Două serii de 8 repetări cu aceeași greutate pot fi complet diferite. Una făcută în 15 secunde, cu greutatea „aruncată” în jos, și una făcută în 40 de secunde, cu negativul controlat. A doua ține mușchiul sub tensiune de aproape trei ori mai mult și, de cele mai multe ori, construiește mai mult mușchi cu mai puțin risc pentru articulații.</p>
  <blockquote>Greutatea pe care o ridici cu tempo controlat e greutatea ta reală. Restul e ego și impuls.</blockquote>
  <h2>Cum folosesc tempo-uri diferite</h2>
  <ul>
    <li><strong>Negativ lent (3–5 secunde)</strong> la exercițiile unde vreau control și stretch: împinsuri cu gantere, flexii, extensii.</li>
    <li><strong>Pauză jos</strong> la exercițiile unde oamenii folosesc elanul: genuflexiuni, împins cu bara, presă. Pauza scoate reflexul elastic și face mușchiul să lucreze.</li>
    <li><strong>Pauză sus</strong> la exercițiile de spate și de umeri, unde contracția e partea pe care o ratează toată lumea.</li>
    <li><strong>Pozitiv exploziv</strong> aproape mereu. Chiar dacă bara urcă încet, intenția e să o arunci. Asta recrutează fibrele care cresc cel mai mult.</li>
  </ul>
  <h2>Și schimb tempo-ul periodic</h2>
  <p>La 2–3 săptămâni, schimb fie exercițiul, fie tempo-ul, fie intervalul de repetări. Corpul se adaptează la un stimul repetat, iar o schimbare de tempo e o schimbare reală, chiar dacă exercițiul rămâne același. E un mod simplu de a menține progresul fără să sari de la un program la altul.</p>`,
  cta: ["Vrei un program scris de mine?", "Programele mele digitale au tempo, pauze și progresie la fiecare exercițiu.", "Vezi programele", "programe"] },

{ handle: "cum-citesc-pozele-de-check-in", cat: "Coaching", min: 5, title: "Cum citesc pozele de check-in",
  lead: "Ce caut în pozele pe care mi le trimiți săptămânal, de ce vreau mereu aceeași lumină și ce îmi spun ele mai bine decât cântarul.",
  body: `<p>Cântarul îmi spune cât cântărești. Pozele îmi spun ce s-a întâmplat. De aceea, în coaching, check-in-ul săptămânal fără poze e pentru mine un check-in pe jumătate.</p>
  <h2>Regulile pozelor</h2>
  <ul>
    <li><strong>Aceeași zi și oră</strong>, de preferat dimineața, după toaletă, înainte de mâncare.</li>
    <li><strong>Aceeași lumină și același loc.</strong> Lumina de sus face pe oricine să pară mai uscat. Lumina din față îi face pe toți să pară mai moi. Dacă schimbi lumina, nu mai pot compara.</li>
    <li><strong>Aceeași distanță și înălțime</strong> a telefonului. Ideal un trepied sau un raft.</li>
    <li><strong>Patru unghiuri:</strong> față, lateral stânga, lateral dreapta, spate. Relaxat, apoi aceleași patru contractat.</li>
  </ul>
  <blockquote>O poză făcută prost în fiecare săptămână, la fel, valorează mai mult decât o poză perfectă din când în când.</blockquote>
  <h2>Ce caut</h2>
  <ul>
    <li><strong>Talia și abdomenul inferior</strong>, unde se vede cel mai devreme dacă definirea merge.</li>
    <li><strong>Separarea la umeri și la cvadriceps.</strong> Când apar liniile dintre capetele mușchilor, știu că sportivul se apropie.</li>
    <li><strong>Plinătatea.</strong> Un mușchi plat poate însemna carbohidrați prea puțini sau oboseală, nu lipsă de mușchi.</li>
    <li><strong>Apa sub piele</strong>, mai ales pe partea de jos a spatelui și pe coapse.</li>
    <li><strong>Simetria</strong> între stânga și dreapta, ca să știu unde pun volum în plus.</li>
  </ul>
  <h2>Pozele și cântarul împreună</h2>
  <p>Cântarul stă pe loc, pozele arată mai uscat: mergem bine, pierzi grăsime și câștigi sau păstrezi mușchi. Cântarul scade, pozele arată mai plat și mai moale: pierdem mușchi sau apă, ajustez. Cântarul urcă, pozele arată mai plin: poate fi o zi cu carbohidrați mulți, nu panică.</p>
  <p>De aceea nu iau niciodată o decizie pe o singură cifră. Iau decizii pe imaginea întreagă: medie pe 7 zile, poze, talie, energie, somn. Iar tu, ca sportiv, înveți în timp să te uiți la tine la fel: cu răbdare și cu aceeași lumină.</p>`,
  cta: ["Vrei check-in săptămânal cu mine?", "În coaching îmi trimiți pozele din contul tău, iar eu ajustez planul în cel mult 24 de ore.", "Vezi coaching-ul", "#usi"] },

{ handle: "offseason-ul-nu-e-permis-de-ingrasat", cat: "Nutriție", min: 6, title: "Offseason-ul nu e permis de îngrășat",
  lead: "Construcția musculară reală se face în lunile dintre definiri. Cum le țin pe ale sportivilor mei productive și curate.",
  body: `<p>Am văzut sportivi care câștigă 15 kg în trei luni după un concurs și numesc asta „offseason”. Apoi au nevoie de 30 de săptămâni de definire ca să ajungă înapoi unde erau, iar din cele 15 kg, poate un kilogram e mușchi. Asta nu e construcție. E un ciclu de îngrășat și slăbit care te ține pe loc ani de zile.</p>
  <h2>Ce e offseason-ul la mine</h2>
  <p>Perioada în care construim mușchi cu un surplus mic și controlat, fără să pierdem prea mult din forma de bază. Ținta e să ajungi la următoarea definire mai mare și nu mult mai gras. Asta înseamnă să rămâi la o distanță de 8–12 săptămâni de formă, nu de 30.</p>
  <h2>Regulile mele</h2>
  <ul>
    <li><strong>Surplus mic:</strong> 200–300 kcal peste menținere. Mușchiul nu crește mai repede doar pentru că mănânci mai mult.</li>
    <li><strong>Creștere în greutate lentă:</strong> 0,25–0,5% din greutatea corporală pe lună la avansați, ceva mai mult la începători.</li>
    <li><strong>Talia o măsor la 2 săptămâni.</strong> Dacă talia crește mai repede decât brațul și coapsa, încetinim.</li>
    <li><strong>Forța trebuie să urce.</strong> Dacă mănânci în plus și nu ești mai puternic după 6 săptămâni, surplusul nu e problema; antrenamentul e.</li>
    <li><strong>Mini-definiri</strong> de 4–6 săptămâni, dacă grăsimea a urcat prea mult. Mai bine scurt și des decât lung și dur.</li>
  </ul>
  <blockquote>Cel mai bun offseason e cel după care definirea pare ușoară.</blockquote>
  <h2>Antrenamentul în offseason</h2>
  <p>Aici încerci lucruri grele. E momentul pentru recorduri pe exercițiile de bază, pentru volum mai mare la grupele slabe și pentru blocuri de forță. În definire păstrezi; în offseason construiești. Dacă te antrenezi în offseason la fel ca în definire, ai pierdut ocazia.</p>
  <h2>Mâncarea în offseason</h2>
  <p>Carbohidrați mai mulți, în jurul antrenamentului, pentru că acum îi folosești. Proteinele rămân la fel. Grăsimile moderate. Și o regulă simplă: mâncarea bună rămâne majoritatea, restul e flexibil. Offseason-ul nu e o pauză de la disciplină, e alt tip de disciplină.</p>
  <p>Iar după fiecare concurs, primele săptămâni sunt de revenire controlată, nu de offseason. Am scris despre asta în articolul despre rebound. Abia după ce corpul și capul s-au liniștit începe construcția adevărată.</p>`,
  cta: ["Vrei un offseason construit pe tine?", "În coaching planific împreună cu tine construcția și momentul următoarei definiri.", "Vezi coaching-ul", "#usi"] }
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
writeFileSync(path.join(here, "_noi-lista.json"), JSON.stringify(A.map(a => ({ handle: a.handle, cat: a.cat, title: a.title, lead: a.lead })), null, 1));
console.log(A.length, "articole noi");
