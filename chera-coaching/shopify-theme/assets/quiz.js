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
function li(list,arr){ list.innerHTML=""; arr.forEach(t=>{ const l=document.createElement("li"); l.textContent=t; list.appendChild(l); }); }
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
  li($("r-who"),T.who); li($("r-train"),T.train); li($("r-diet"),T.diet);
  scorecard($("r-scoresB"),bal.scores,bal.level==="ok"?null:bal.top);
  const rb=$("r-balance"); rb.innerHTML="";
  if(bal.allHigh){ rb.innerHTML=`<p><span class="pill crit">oboseală generală</span></p><p>Toate cele patru scale sunt ridicate. De obicei nu e un dezechilibru specific, ci somn puțin, deficit caloric prea mare sau prea multe stimulente. Verific eu întâi aceste trei lucruri; suplimentele vin după.</p>`; }
  else if(bal.level==="ok"){ rb.innerHTML=`<p><span class="pill ok">echilibru bun</span></p><p>Nimic de corectat acum. Rămâne dieta de bază a profilului tău și re-testăm la 8 săptămâni.</p>`; }
  else{
    const D=DEFICIT[bal.top];
    rb.innerHTML=`<p><span class="pill ${bal.level}">${D.name}: ${bal.level==="crit"?"pe minus":"de susținut"}</span></p>
      <h3>Ajustări în dietă</h3><ul class="list" id="rb-diet"></ul>
      ${bal.level==="crit"?`<h3>Suplimente de stabilizare, 8 săptămâni</h3><ul class="list" id="rb-supp"></ul>`:`<p class="hint">La acest nivel, dieta și stilul de viață sunt de ajuns; suplimentele le decid eu la prima discuție.</p>`}
      <h3>Stil de viață</h3><ul class="list" id="rb-life"></ul>
      <p class="hint">${D.warn}</p>`;
    li($("rb-diet"),D.diet); if(bal.level==="crit") li($("rb-supp"),D.supp); li($("rb-life"),D.life);
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
  submit();
}
/* concluziile extinse (texte în assets/quiz-rezultat.js) */
function renderExt(type, bal, goal){
  const X=window.CHERA_EXT, box=$("r-ext"); if(!X||!box) return;
  const E=X.types[type]||X.types["2A"], G=X.goals[goal]||X.goals.sportiv;
  const ul=a=>"<ul class=\"list\">"+a.map(t=>"<li>"+t+"</li>").join("")+"</ul>";
  const card=(eb,h,body)=>`<div class="card">${eb?`<p class="eyebrow">${eb}</p>`:""}<h3>${h}</h3>${body}</div>`;
  let h=card("Profilul tău, pe larg","Ce înseamnă asta în sală",`<p>${E.intro}</p>`);
  h+=card("Antrenament","Cum te antrenezi ca să crești",ul(E.train)+`<h3 style="margin-top:14px">O săptămână-tip</h3>`+ul(E.split));
  h+=card("Nutriție","Cum mănânci pe profilul tău",ul(E.diet)+`<p class="hint">${X.carbtest}</p>`);
  h+=card("Exemplu","O zi de mâncare pe profilul tău",ul(E.day||[])+`<p class="hint">${X.dayNote}</p>`);
  h+=card("Faze","Definire și masă musculară",`<h3>La definire</h3>${ul(E.cut)}<h3 style="margin-top:14px">La masă musculară</h3>${ul(E.bulk)}`);
  if(bal.level!=="ok" && !bal.allHigh && X.deficit[bal.top]){ const D=X.deficit[bal.top]; h+=card("Echilibrul tău acum","De ce contează "+DEFICIT[bal.top].name+" la sală",`<p>${D.why}</p><h3 style="margin-top:14px">Ce schimbăm în antrenament</h3>${ul(D.train)}`); }
  h+=card("Atenție","Greșelile pe care le văd des la profilul tău",ul(E.mistakes));
  h+=card("Cum lucrăm","Ce ai nevoie de la mine",ul(E.mind)+`<h3 style="margin-top:14px">Suplimentele de bază pentru profilul tău</h3>`+ul(E.supp));
  h+=card("Obiectivul tău",G.title,ul(G.items));
  h+=card("Pasul 1","Primele 4 săptămâni cu mine",ul(X.start4));
  box.innerHTML=h;
}
async function submit(){
  const st=$("r-sendstatus");
  if(!CONFIG.SHEET_ENDPOINT){ return submitContact(st); }
  const payload={ts:new Date().toISOString(),...state.ctx,...state.result,summary:state.summary||"",ansA:state.ansA,ansT:state.ansT,ansB:state.ansB,ua:navigator.userAgent};
  try{ await fetch(CONFIG.SHEET_ENDPOINT,{method:"POST",mode:"no-cors",headers:{"Content-Type":"text/plain"},body:JSON.stringify(payload)}); st.textContent = state.ctx.channel==="email" ? "Rezultatul a ajuns la mine și ți l-am trimis și pe e-mail. Îți scriu cu planul de pornire în cel mult 24 de ore." : "Rezultatul a ajuns la mine. Îți scriu pe WhatsApp în cel mult 24 de ore."; }
  catch(e){ st.textContent="Nu am putut trimite rezultatul automat. Trimite-mi textul de mai jos pe WhatsApp și îl preiau eu."; }
}

/* fără receptor Google: trimit prin formularul de contact Shopify (ajunge pe e-mailul magazinului) */
async function submitContact(st){
  const c=state.ctx, r=state.result, f=new FormData();
  f.append("form_type","contact"); f.append("utf8","✓");
  f.append("contact[email]",c.email); f.append("contact[name]",c.name);
  f.append("contact[Telefon]",c.phone); f.append("contact[Oraș]",c.city||"-");
  f.append("contact[Subiect]",`Evaluare gratuită · PROFIL ${r.code} · ${c.name}`);
  f.append("contact[Răspuns pe]",c.channel==="email"?"e-mail":"WhatsApp");
  f.append("contact[Context]",`obiectiv: ${c.goal} · ani de sală: ${c.years} · somn: ${c.sleep} · cafea: ${c.caffeine} · antrenamente/săpt: ${c.days}`);
  f.append("contact[body]",(state.summary||"")+`

Scoruri natura D${r.scoresA.D} A${r.scoresA.A} G${r.scoresA.G} S${r.scoresA.S} · echilibru D${r.scoresB.D} A${r.scoresB.A} G${r.scoresB.G} S${r.scoresB.S}`);
  try{
    const res=await fetch("/contact",{method:"POST",body:f,credentials:"same-origin"});
    if(!res.ok || /challenge/.test(res.url)) throw new Error("challenge");
    st.textContent = c.channel==="email" ? "Rezultatul a ajuns la mine. Îți scriu pe e-mail cu planul de pornire în cel mult 24 de ore." : "Rezultatul a ajuns la mine. Îți scriu pe WhatsApp în cel mult 24 de ore.";
  }catch(e){ st.textContent="Nu am putut trimite rezultatul automat. Apasă butonul de mai jos și trimite-mi textul pe WhatsApp."; }
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
$("btn-result").addEventListener("click",()=>{ if(!validateCtx()) return; buildResult(); show("result"); });

/* resume if the viewer left mid-quiz */
if(state.result && state.ctx){ /* finished before: show intro, keep data */ }
else if(answeredCount()>0 && !state.result){ show("quiz"); renderPage(); }
