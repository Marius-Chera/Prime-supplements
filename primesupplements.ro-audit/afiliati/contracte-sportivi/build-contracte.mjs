// Generează cele 4 contracte pentru sportivi (PF / SRL-PFA, final / probă) ca HTML pentru Word.
// Rulare: node build-contracte.mjs <folder-iesire>   apoi  powershell -File converteste-word.ps1 <folder-iesire>
// Regula (28.10.2026): la persoana fizică comisionul se acordă DOAR ca voucher activat din UpPromote Affiliates;
// la PFA/SRL comisionul se plătește în bani, prin transfer bancar, numai pe bază de factură.
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const OUT = process.argv[2] || '.';
mkdirSync(OUT, { recursive: true });

const L = '……………………';          // spațiu de completat
const LS = '…………';                // spațiu scurt
const SITE = 'www.primesupplements.ro';
const APP = 'Aplicația';

const bold = (s) => s.replace(/\b(PRESTATORUL(UI)?|PRESTATOR|BENEFICIARUL(UI)?|BENEFICIAR)\b/g, '<b>$1</b>');
const p = (s, cls = '') => `<p class="${cls}">${bold(s)}</p>`;
const li = (s) => p(s, 'li');
const h = (s) => `<h2>${s}</h2>`;
const sub = (s) => `<p class="sub">${bold(s)}</p>`;

// ---------- CAP. I – PĂRȚILE ----------
const beneficiar = p(`1.1. <b>PRIME SPORT SUPPLEMENTS S.R.L.</b>, cu sediul în oraș Cisnădie, str. Ioan Virgil Ispas nr. 17A, jud. Sibiu, înregistrată la Oficiul Registrului Comerțului de pe lângă Tribunalul Sibiu sub nr. J32/1155/2022, CUI 46260823, cont bancar nr. RO74BTRLRONCRT0CH4034101 deschis la Banca Transilvania, e-mail contact@primesupplements.ro, reprezentată legal prin <b>Marius Chera</b>, în calitate de administrator, denumită în continuare „BENEFICIAR”,`);

const prestatorPF = p(`1.2. ${L}${L}, CNP ${L}, domiciliat(ă) în ${L}${L}${L}, identificat(ă) cu CI seria ${LS}, nr. ${L}, eliberată de ${L} la data de ${L}, e-mail ${L}${LS}, telefon ${L}, persoană fizică care nu desfășoară activitatea prezentului contract în calitate de profesionist autorizat (PFA, II, IF sau societate), denumit(ă) în continuare „PRESTATOR”.`);

const prestatorJ = p(`1.2. ${L}${L} (denumirea societății / PFA / II), cu sediul în ${L}${L}${L}, înregistrată la Oficiul Registrului Comerțului de pe lângă Tribunalul ${L} sub nr. ${L}, CUI ${L}, plătitoare / neplătitoare de TVA (se taie varianta care nu se aplică), cont bancar nr. ${L}${L} deschis la ${L}, e-mail ${L}${LS}, telefon ${L}, reprezentată legal prin ${L}${L}, în calitate de ${L}, denumită în continuare „PRESTATOR”.`);

const temei = p(`În urma negocierilor, având ca temei legal dispozițiile art. 1.166 și urm. și art. 1.851 și urm. din Codul civil, iar pentru beneficiile acordate în natură și dispozițiile art. 1.763–1.765 din Codul civil, precum și Legea nr. 148/2000 privind publicitatea, Legea nr. 158/2008 privind publicitatea înșelătoare și comparativă și celelalte dispoziții legale în vigoare, părțile au convenit încheierea prezentului contract, cu respectarea următoarelor clauze:`);

// ---------- CAP. II – OBIECTUL ----------
const obiect = (juridic) => [
  h('CAP. II. OBIECTUL CONTRACTULUI ȘI DEFINIȚII'),
  p(`2.1. Prin prezentul contract, PRESTATORUL se obligă să presteze pentru BENEFICIAR servicii de promovare a produselor comercializate de BENEFICIAR (suplimente alimentare, alimente pentru sportivi și accesorii), în mediul online și pe rețelele sociale, prin utilizarea unui cod unic de reducere, în condițiile art. 2.3.`),
  p(`2.2. În sensul prezentului contract, termenii de mai jos au următorul înțeles:`),
  li(`a) „Codul” – codul unic de reducere atribuit PRESTATORULUI, prin care clienții beneficiază de reducerea prevăzută în contract la comenzile plasate pe site-ul ${SITE} și prin care comenzile sunt atribuite PRESTATORULUI;`),
  li(`b) „${APP}” – platforma de afiliere UpPromote Affiliates folosită de BENEFICIAR pentru magazinul online ${SITE}, inclusiv contul de afiliat al PRESTATORULUI, accesibil online sau din aplicația mobilă, în care se țin evidența comenzilor atribuite Codului și a comisionului;`),
  li(`c) „Comisionul” – remunerația variabilă cuvenită PRESTATORULUI pentru comenzile atribuite Codului, calculată potrivit art. 4.3 alin. (1);`),
  li(`d) „Voucher” – cod valoric (card cadou / credit de cumpărături) utilizabil exclusiv pentru achiziționarea de produse de pe site-ul ${SITE}, în limita valorii sale.`),
  p(`2.3. Serviciile de promovare prestate de PRESTATOR constau în următoarele activități, efectuate lunar:`),
  li(`a) apariția ${juridic ? 'reprezentantului PRESTATORULUI' : 'PRESTATORULUI'} în echipamentele sportive ale BENEFICIARULUI la evenimentele oficiale la care părțile participă împreună;`),
  li(`b) realizarea a minimum 8 (opt) postări pe lună (2 pe săptămână) pe Meta (Facebook și Instagram), cu produse la alegere, sub formă de review, unboxing sau orice altă formă de promovare, obligatoriu cu etichetarea contului @primesupplements_ro și/sau menționarea site-ului ${SITE}, care să includă fotografii sau materiale video (YouTube, Instagram, Facebook, TikTok) cu produsele, echipamentele sau accesoriile BENEFICIARULUI;`),
  li(`c) afișarea siglei BENEFICIARULUI pe site-ul, blogul, vlogul sau paginile de social media ale PRESTATORULUI (YouTube, Instagram, Facebook, TikTok), de exemplu prin menționarea @primesupplements_ro în descrierea profilului de Instagram;`),
  li(`d) participarea ${juridic ? 'reprezentantului PRESTATORULUI' : 'PRESTATORULUI'} la campaniile publicitare ale BENEFICIARULUI, pentru realizarea de panouri, bannere, obiecte promoționale și echipamente sportive.`),
];

// ---------- CAP. III – DREPTURI ȘI OBLIGAȚII ----------
const obligatii = [
  h('CAP. III. DREPTURILE ȘI OBLIGAȚIILE PĂRȚILOR'),
  p(`3.1. PRESTATORUL are dreptul de a alege ideile și conceptele publicitare, designul și grafica, formele, metodele și mijloacele de comunicare vizuală sau de altă natură prin care transmite mesajul publicitar.`),
  p(`3.2. Mijloacele de publicitate prevăzute la art. 3.1 vor fi alese în mod adecvat, decent și corect, în funcție de profilul PRESTATORULUI. PRESTATORULUI îi este interzis să includă în materialele publicitare aspecte care: aduc atingere demnității umane și moralei publice; conțin discriminări pe criterii de rasă, sex, limbă, origine, origine socială, identitate etnică sau naționalitate; aduc prejudicii imaginii, onoarei, demnității și vieții private a persoanelor; exploatează superstițiile, credulitatea sau frica persoanelor; prejudiciază securitatea persoanelor sau incită la violență; încurajează comportamente care dăunează mediului; favorizează comercializarea unor bunuri sau servicii produse ori distribuite contrar prevederilor legale.`),
  p(`3.3. PRESTATORUL are obligația de a modifica sau de a retrage, de îndată și în cel mult 24 de ore de la solicitarea expresă a BENEFICIARULUI, postarea care nu respectă criteriile de la art. 3.2 sau art. 3.9.`),
  p(`3.4. Pe parcursul derulării contractului, la solicitarea BENEFICIARULUI, materialele promoționale pot fi modificate, BENEFICIARUL având obligația de a anunța intenția de modificare cu cel puțin 20 de zile înainte de difuzare.`),
  p(`3.5. Clauza de exclusivitate. Pe durata contractului, PRESTATORUL acordă exclusivitate BENEFICIARULUI. În acest sens, PRESTATORUL nu poate încheia contracte de promovare pentru produse similare sau identice cu cele promovate pentru BENEFICIAR, din gama produselor alimentare și a suplimentelor alimentare pentru sportivi, și nu poate încheia contracte cu concurenți ai BENEFICIARULUI.`),
  p(`3.6. Drepturile și obligațiile PRESTATORULUI rezultă din întregul contract și cuprind, fără a se limita la acestea:`),
  li(`a) să presteze serviciile de promovare prevăzute la art. 2.3;`),
  li(`b) să respecte termenele contractuale și să difuzeze numai materialele publicitare pentru care există acordul prealabil al BENEFICIARULUI;`),
  li(`c) să depună toate diligențele pentru ca BENEFICIARUL să beneficieze de cea mai bună expunere și promovare pe care PRESTATORUL o poate oferi;`),
  li(`d) să modifice postarea care încalcă criteriile de la art. 3.2 sau art. 3.9, potrivit art. 3.3;`),
  li(`e) să nu comunice Codul prin canale sau în forme care contravin legii ori prezentului contract (de exemplu, site-uri de cupoane fără acordul BENEFICIARULUI) și să nu folosească Codul pentru propriile comenzi în scopul obținerii de comision;`),
  li(`f) orice alte drepturi și obligații prevăzute de lege și de prezentul contract.`),
  p(`3.7. Drepturile și obligațiile BENEFICIARULUI rezultă din întregul contract și cuprind, fără a se limita la acestea:`),
  li(`a) dreptul de a-i fi difuzate materialele publicitare în condițiile prezentului contract;`),
  li(`b) obligația de a preda PRESTATORULUI produsele, suplimentele și accesoriile în cuantumul și la termenele prevăzute în contract;`),
  li(`c) obligația de a informa PRESTATORUL în timp util cu privire la modificările dorite ale materialelor publicitare sau ale modului de desfășurare a campaniei;`),
  li(`d) obligația de a atribui PRESTATORULUI Codul și de a-i asigura accesul la contul de afiliat din Aplicație;`),
  li(`e) obligația de a acorda Comisionul în forma și la termenele prevăzute în Cap. IV.`),
  p(`3.8. Furnizarea de materiale și informații. BENEFICIARUL se obligă să furnizeze PRESTATORULUI, în timp util, materialele promoționale, accesoriile, produsele și informațiile necesare prestării serviciilor, în condițiile prezentului contract.`),
  p(`3.9. Conformitatea comunicărilor comerciale. PRESTATORUL se obligă: a) să marcheze în mod clar fiecare postare realizată în baza prezentului contract ca fiind comunicare comercială (de exemplu, prin funcția „Parteneriat plătit” / „Paid partnership” a platformei sau prin mențiunile „Publicitate”, „#ad”, „#reclamă”); b) să nu atribuie produselor proprietăți de prevenire, tratare sau vindecare a bolilor și să nu folosească mențiuni nutriționale sau de sănătate care nu sunt autorizate potrivit Regulamentului (CE) nr. 1924/2006; c) să nu prezinte suplimentele alimentare ca medicamente și să nu le asocieze cu substanțe interzise.`),
];

// ---------- CAP. IV – variante ----------
const bazaComision = (pragNet) => p(`(1) Comisionul este de 10% (zece la sută) și se calculează la valoarea comenzii plasate pe site-ul ${SITE} cu utilizarea Codului, după aplicarea reducerii acordate clientului, ${pragNet}fără costul transportului. Comisionul se cuvine numai pentru comenzile livrate și neanulate; pentru comenzile anulate, returnate sau rambursate nu se datorează comision, iar comisionul deja înregistrat pentru acestea se scade din soldul sau din următoarea plată a PRESTATORULUI. Nu se acordă comision pentru produsele sau ofertele pe care ${APP} le exclude de la comision (de exemplu, pachetele din secțiunea „Reduceri” a site-ului). Evidența comenzilor atribuite Codului și a Comisionului se ține în Aplicație, la care PRESTATORUL are acces permanent prin contul său de afiliat.`);

const conditiiLunare = [
  sub('4.2. Condiții de acordare a beneficiilor'),
  p(`(1) Beneficiile prevăzute la art. 4.1 se acordă numai pentru lunile calendaristice în care PRESTATORUL realizează, prin intermediul Codului ${L}, care oferă clienților o reducere de 10%, vânzări de cel puțin 3.000 lei.`),
  p(`(2) Dacă pragul de la alin. (1) nu este atins până la sfârșitul lunii, beneficiile aferente lunii respective nu se acordă. Acordarea beneficiilor se reia începând cu luna în care pragul este atins din nou.`),
  p(`(3) Beneficiile au caracter lunar și nu pot fi acordate mai frecvent de o dată pe lună.`),
  p(`(4) Beneficiile devin active numai după semnarea contractului de ambele părți. PRESTATORUL transmite persoanei desemnate de BENEFICIAR, prin aplicația WhatsApp (nr. de telefon ${L}), materialele care dovedesc prestarea serviciilor, inclusiv fotografii sau capturi de ecran cu data vizibilă, în vederea verificării și aprobării beneficiilor.`),
];

const voucherPF = (lunar) => [
  sub('4.3. Acordarea Comisionului exclusiv sub formă de Voucher'),
  bazaComision(''),
  p(`(2) PRESTATORUL fiind persoană fizică, Comisionul se acordă exclusiv în natură, sub forma unui Voucher utilizabil numai pentru achiziționarea de produse de pe site-ul ${SITE}. Comisionul nu se plătește în numerar și nici prin transfer bancar și nu poate fi preschimbat în bani, nici la cererea PRESTATORULUI, nici la încetarea contractului.`),
  p(`(3) BENEFICIARUL verifică și aprobă în Aplicație Comisionul aferent fiecărei luni calendaristice cel târziu până la data de 15 a lunii următoare. Comisionul aprobat se înregistrează ca sold în contul de afiliat al PRESTATORULUI.`),
  p(`(4) Voucherul se generează și se activează de către PRESTATOR, din contul său de afiliat din Aplicație, după ce soldul aprobat atinge cel puțin 500 lei, indiferent de perioada necesară acumulării acestei sume. Valoarea Voucherului este egală cu soldul convertit, iar Voucherul poate fi folosit în limita valorii sale și a termenului de valabilitate afișat la generare.`),
  p(`(5) Voucherul este personal și nu poate fi comercializat. Dacă, din motive tehnice, ${APP} nu permite generarea Voucherului, BENEFICIARUL îl emite și îl comunică PRESTATORULUI pe e-mail în cel mult 5 zile lucrătoare de la solicitarea scrisă a acestuia.`),
  p(`(6) La încetarea contractului, indiferent de cauză, PRESTATORUL poate converti în Voucher soldul aprobat și neutilizat în termen de 30 de zile de la data încetării, chiar dacă acesta este sub pragul de 500 lei.`),
  sub('4.4. Penalități'),
  p(`Dacă BENEFICIARUL nu aprobă Comisionul datorat sau nu permite generarea Voucherului mai mult de 10 (zece) zile calendaristice după termenul prevăzut la art. 4.3 alin. (3), respectiv alin. (5), BENEFICIARUL datorează penalități de 0,5% pe zi de întârziere, calculate la valoarea Comisionului neacordat. Penalitățile se acordă în aceeași formă ca și Comisionul (Voucher) și pot depăși valoarea debitului principal.`),
  sub('4.5. Obligații fiscale'),
  p(`(1) Valoarea Voucherelor prevăzute în prezentul capitol reprezintă venit în natură al PRESTATORULUI, evaluat la valoarea nominală a Voucherului.`),
  p(`(2) Dacă, potrivit Codului fiscal, BENEFICIARUL are calitatea de plătitor de venit cu obligația de a calcula, reține, declara și vira impozitul și/sau contribuțiile sociale aferente, BENEFICIARUL va îndeplini aceste obligații, iar sumele reținute se scad din soldul de Comision al PRESTATORULUI. PRESTATORUL se obligă să comunice datele necesare (inclusiv CNP-ul) și să informeze BENEFICIARUL dacă se înregistrează ca persoană fizică autorizată.`),
  p(`(3) În celelalte cazuri, PRESTATORUL este singurul responsabil pentru declararea și plata obligațiilor fiscale aferente veniturilor obținute în baza prezentului contract.`),
];

const cashJ = (finalSiLunar) => [
  sub('4.3. Plata Comisionului în bani, pe bază de factură'),
  bazaComision(''),
  p(`(2) PRESTATORUL fiind profesionist (PFA, II, IF sau societate), Comisionul se plătește în bani, exclusiv prin transfer bancar în contul prevăzut la art. 1.2, numai pe baza facturii emise de PRESTATOR. BENEFICIARUL nu face plăți în numerar și nu plătește Comisionul în lipsa unei facturi valabile.`),
  p(`(3) BENEFICIARUL verifică și aprobă în Aplicație Comisionul aferent fiecărei luni calendaristice cel târziu până la data de 5 a lunii următoare. Situația Comisionului aprobat, afișată în Aplicație, constituie baza de facturare.`),
  p(`(4) După aprobare, PRESTATORUL emite factura pentru Comisionul aprobat, cu respectarea Codului fiscal și, după caz, prin sistemul național RO e-Factura. Dacă PRESTATORUL este plătitor de TVA, la valoarea Comisionului se adaugă TVA.`),
  p(`(5) Factura se emite numai după ce Comisionul aprobat și nefacturat atinge cel puțin 500 lei, indiferent de perioada necesară acumulării acestei sume. Sumele sub acest prag se reportează în lunile următoare.`),
  p(`(6) BENEFICIARUL plătește factura în termen de 10 (zece) zile calendaristice de la primirea ei. Factura care nu corespunde Comisionului aprobat sau cerințelor legale poate fi refuzată în termen de 5 zile lucrătoare, cu indicarea motivului, caz în care termenul de plată curge de la primirea facturii corectate.`),
  p(`(7) Comisionul aferent comenzilor anulate, returnate sau rambursate după facturare se regularizează prin scădere din următoarea factură sau, dacă nu mai urmează facturi, prin factură de stornare emisă de PRESTATOR.`),
  p(`(8) La încetarea contractului, indiferent de cauză, Comisionul aprobat și nefacturat se facturează și se plătește potrivit alin. (4) și (6), chiar dacă este sub pragul de 500 lei.`),
  sub('4.4. Penalități'),
  p(`Dacă BENEFICIARUL nu plătește factura de Comision mai mult de 10 (zece) zile calendaristice după scadența prevăzută la art. 4.3 alin. (6), BENEFICIARUL datorează penalități de 0,5% pe zi de întârziere, calculate la suma neplătită. Penalitățile pot depăși valoarea debitului principal.`),
  sub('4.5. Obligații fiscale'),
  p(`PRESTATORUL este singurul responsabil pentru declararea și plata tuturor obligațiilor fiscale (impozite, contribuții, TVA etc.) aferente veniturilor obținute în baza prezentului contract, potrivit legislației în vigoare.`),
];

const cap4 = {
  'PF': [
    h('CAP. IV. REMUNERAȚIA ȘI BENEFICIILE PRESTATORULUI'),
    sub('4.1. Beneficiile PRESTATORULUI'),
    p(`Pentru serviciile de promovare prestate, PRESTATORUL beneficiază, în condițiile art. 4.2, de:`),
    li(`a) un Voucher lunar în valoare de ${LS} lei, utilizabil o singură dată pe lună pentru achiziționarea de produse alimentare, suplimente alimentare și accesorii de pe site-ul ${SITE}, în limita valorii sale. Voucherul este emis de BENEFICIAR și comunicat PRESTATORULUI;`),
    li(`b) Comisionul de 10% din valoarea comenzilor plasate de clienții care utilizează Codul, acordat exclusiv sub formă de Voucher, potrivit art. 4.3.`),
    ...conditiiLunare,
    ...voucherPF(true),
  ],
  'PF-PROBA': [
    h('CAP. IV. REMUNERAȚIA ȘI BENEFICIILE PRESTATORULUI'),
    sub('4.1. Beneficiile PRESTATORULUI'),
    p(`Pentru serviciile de promovare prestate, PRESTATORUL beneficiază de:`),
    li(`a) un Cod personalizat (de exemplu, PRIME10), care oferă clienților o reducere de 10%, aplicată la prețurile afișate pe site-ul ${SITE}, pentru produsele comercializate de BENEFICIAR;`),
    li(`b) Comisionul de 10% din valoarea comenzilor plasate de clienții care utilizează Codul, calculat la valoarea rămasă după aplicarea reducerii de 10% și acordat exclusiv sub formă de Voucher, potrivit art. 4.3;`),
    li(`c) la semnarea contractului, un Voucher unic în valoare de ${LS} lei, valabil pe durata perioadei de probă de ${LS} luni (${LS} zile), utilizabil o singură dată pentru achiziționarea de produse de pe site-ul ${SITE}, în limita valorii sale.`),
    p(`Acordarea beneficiilor este condiționată de semnarea contractului și de transmiterea către BENEFICIAR a dovezilor privind serviciile prestate, inclusiv minimum 8 postări lunare pe Instagram cu conținut relevant de promovare și 1 videoclip pe lună publicat pe rețelele sociale, pe toată durata contractului.`),
    ...conditiiLunare,
    ...voucherPF(false),
  ],
  'J': [
    h('CAP. IV. REMUNERAȚIA ȘI BENEFICIILE PRESTATORULUI'),
    sub('4.1. Beneficiile PRESTATORULUI'),
    p(`Pentru serviciile de promovare prestate, PRESTATORUL beneficiază lunar, în condițiile art. 4.2, de:`),
    li(`a) un Voucher lunar în valoare de ${LS} lei, utilizabil o singură dată pe lună pentru achiziționarea de produse alimentare, suplimente alimentare și accesorii de pe site-ul ${SITE}, în limita valorii sale. Voucherul este emis de BENEFICIAR și comunicat PRESTATORULUI;`),
    li(`b) Comisionul de 10% din valoarea comenzilor plasate de clienții care utilizează Codul, plătit în bani, pe bază de factură, potrivit art. 4.3.`),
    ...conditiiLunare,
    ...cashJ(true),
  ],
  'J-PROBA': [
    h('CAP. IV. REMUNERAȚIA ȘI BENEFICIILE PRESTATORULUI'),
    sub('4.1. Beneficiile PRESTATORULUI'),
    p(`Pentru serviciile de promovare prestate în perioada de probă, PRESTATORUL beneficiază, în condițiile art. 4.2, de:`),
    li(`a) un Voucher unic în valoare de ${LS} lei, acordat o singură dată pe durata perioadei de probă și utilizabil o singură dată pentru achiziționarea de produse alimentare, suplimente alimentare și accesorii de pe site-ul ${SITE}, în limita valorii sale. Voucherul este emis de BENEFICIAR și comunicat PRESTATORULUI;`),
    li(`b) Comisionul de 10% din valoarea comenzilor plasate de clienții care utilizează Codul, plătit în bani, pe bază de factură, potrivit art. 4.3.`),
    sub('4.2. Condiții de acordare a beneficiilor'),
    p(`(1) Pentru a beneficia de cele prevăzute la art. 4.1, PRESTATORUL trebuie să realizeze în perioada de probă, prin intermediul Codului ${L}, care oferă clienților o reducere de 10%, vânzări de cel puțin ${LS} lei.`),
    p(`(2) Dacă pragul de la alin. (1) nu este atins până la expirarea perioadei de probă, contractul încetează de drept la acea dată, fără a se prelungi potrivit art. 5.2 și fără daune-interese pentru vreuna dintre părți, iar Comisionul pentru perioada de probă nu se datorează.`),
    p(`(3) Beneficiile devin active numai după semnarea contractului de ambele părți. PRESTATORUL transmite persoanei desemnate de BENEFICIAR, prin aplicația WhatsApp (nr. de telefon ${L}), materialele care dovedesc prestarea serviciilor, inclusiv fotografii sau capturi de ecran cu data vizibilă, în vederea verificării și aprobării beneficiilor.`),
    ...cashJ(false),
  ],
};

// ---------- CAP. V–VIII ----------
const durata = (proba) => [
  h('CAP. V. DURATA CONTRACTULUI'),
  p(proba
    ? `5.1. Prezentul contract se încheie pe o perioadă de probă de ${proba} luni, începând cu data de ${L} până la data de ${L}.`
    : `5.1. Prezentul contract se încheie pe o durată de ${LS} luni, începând cu data de ${L} până la data de ${L}.`),
  p(`5.2. Durata contractului se prelungește de drept pentru o perioadă egală cu cea inițială dacă niciuna dintre părți nu notifică celeilalte intenția de a nu-l prelungi cu cel puțin 30 de zile înainte de expirare${proba ? ', sub rezerva art. 4.2' : ''}.`),
];

const confid = [
  h('CAP. VI. CONFIDENȚIALITATE, DREPTURI DE AUTOR ȘI DATE PERSONALE'),
  p(`6.1. Părțile se obligă să păstreze confidențialitatea prevederilor contractului și a informațiilor primite una de la cealaltă pe durata contractului și timp de 5 (cinci) ani de la încetarea acestuia, cu excepția cazurilor în care informațiile sunt solicitate în mod legal de autoritățile publice.`),
  p(`6.2. PRESTATORUL acordă BENEFICIARULUI dreptul neexclusiv de a utiliza fotografiile, videoclipurile și celelalte materiale publicitare create în baza prezentului contract, inclusiv imaginea PRESTATORULUI cuprinsă în acestea, în scopuri promoționale, pe toate canalele de comunicare ale BENEFICIARULUI, pe durata contractului și timp de 1 (un) an de la încetarea lui, indiferent de cauză. Contravaloarea acestui drept este inclusă în remunerația prevăzută în Cap. IV.`),
  p(`6.3. PRESTATORUL este de acord ca materialele publicate pe paginile oficiale ale BENEFICIARULUI pe durata contractului să nu fie retrase după încetarea acestuia, ele rămânând parte din arhiva publică a BENEFICIARULUI.`),
  p(`6.4. Materialele publicitare realizate de PRESTATOR pe cheltuiala BENEFICIARULUI rămân în proprietatea exclusivă a BENEFICIARULUI.`),
  p(`6.5. Fiecare parte prelucrează datele cu caracter personal primite de la cealaltă parte numai în scopul încheierii și executării contractului și al îndeplinirii obligațiilor legale (inclusiv fiscale), cu respectarea Regulamentului (UE) 2016/679. Datele sunt păstrate pe durata contractului și ulterior pe perioada impusă de lege, iar persoanele vizate își pot exercita drepturile la adresa de e-mail contact@primesupplements.ro.`),
];

const incetare = [
  h('CAP. VII. ÎNCETAREA ȘI REZILIEREA CONTRACTULUI'),
  p(`7.1. Contractul încetează:`),
  li(`a) la expirarea duratei, dacă una dintre părți a notificat intenția de a nu-l prelungi potrivit art. 5.2;`),
  li(`b) prin denunțare unilaterală de către oricare dintre părți, cu un preaviz de 30 de zile calendaristice notificat prin e-mail celeilalte părți, cu obligația de a preda produsele și de a finaliza serviciile de promovare până la data încetării;`),
  li(`c) prin acordul scris al părților.`),
  p(`În cazul încetării prin denunțare unilaterală potrivit lit. b), partea care denunță contractul datorează celeilalte părți daune-interese stabilite convențional la suma de 5.000 lei.`),
  p(`7.2. Contractul se reziliază de plin drept, fără punere în întârziere, fără somație, fără nicio altă formalitate și fără intervenția instanței, în următoarele cazuri:`),
  li(`a) PRESTATORUL nu își îndeplinește obligațiile prevăzute la art. 3.5, 3.6 sau 3.9;`),
  li(`b) BENEFICIARUL nu își îndeplinește obligațiile prevăzute la art. 3.7 lit. b), d) sau e);`),
  li(`c) PRESTATORUL publică pe rețelele sociale proprii (Facebook, Instagram, TikTok, YouTube), inclusiv în postări neasociate cu BENEFICIARUL, conținut de natura celui interzis la art. 3.2.`),
  p(`7.3. Încetarea contractului nu afectează drepturile și obligațiile născute anterior, inclusiv dreptul la Comisionul aprobat, care se acordă potrivit Cap. IV.`),
];

const finale = [
  h('CAP. VIII. DISPOZIȚII FINALE'),
  p(`8.1. Notificări. Orice notificare între părți este valabil efectuată dacă este transmisă la adresa de e-mail prevăzută în Cap. I.`),
  p(`8.2. Litigii. Litigiile privind încheierea, executarea, modificarea, încetarea și interpretarea prezentului contract se soluționează pe cale amiabilă, iar în caz contrar de instanțele judecătorești competente de la sediul BENEFICIARULUI.`),
  p(`8.3. Forța majoră înlătură răspunderea părții care o invocă, dacă este notificată celeilalte părți în termen de 5 (cinci) zile calendaristice de la apariție. Forța majoră este orice eveniment extern, imprevizibil, absolut invincibil și inevitabil, care face imposibilă executarea obligațiilor contractuale. Dacă forța majoră durează mai mult de 15 (cincisprezece) zile, fiecare parte poate notifica încetarea de plin drept a contractului, fără daune-interese.`),
  p(`8.4. Cesiunea. Drepturile și obligațiile din prezentul contract nu pot fi cesionate către terți fără acordul prealabil, expres și scris al celeilalte părți; cesiunea făcută fără acest acord nu produce efecte față de partea cedată.`),
  p(`8.5. Modificarea contractului se face numai prin act adițional semnat de ambele părți. Prezentul contract, împreună cu anexele și actele adiționale, reprezintă voința părților și înlătură orice înțelegere verbală anterioară sau ulterioară încheierii lui.`),
  p(`8.6. Contractul intră în vigoare la data semnării de către ambele părți. Semnarea se poate face olograf sau cu semnătură electronică.`),
  p(`8.7. Prezentul contract a fost încheiat astăzi, ${L}, în 2 (două) exemplare originale, câte unul pentru fiecare parte.`),
];

const semnaturi = (juridic) => `
<table class="sig"><tr>
<td><b>BENEFICIAR</b><br><b>PRIME SPORT SUPPLEMENTS S.R.L.</b><br>prin reprezentant legal<br><b>MARIUS CHERA</b><br><br><br>Semnătura: ____________________</td>
<td><b>PRESTATOR</b><br>${juridic ? `${L}${LS}<br>prin reprezentant legal<br>${L}${LS}` : `Nume și prenume:<br>${L}${LS}<br>`}<br><br><br>Semnătura: ____________________</td>
</tr></table>`;

const css = `
@page { size: A4; margin: 2.2cm 2.2cm 2cm 2.5cm; }
body { font-family: 'Times New Roman', serif; font-size: 12pt; line-height: 1.35; }
h1 { font-size: 14pt; text-align: center; margin: 0 0 2pt 0; }
.nr { text-align: center; font-weight: bold; margin: 0 0 14pt 0; }
.tip { text-align: center; font-style: italic; margin: 0 0 14pt 0; }
h2 { font-size: 12pt; margin: 14pt 0 6pt 0; }
p { text-align: justify; margin: 0 0 6pt 0; }
p.li { margin-left: 1cm; }
p.sub { font-weight: bold; margin-top: 8pt; }
table.sig { width: 100%; margin-top: 24pt; border-collapse: collapse; }
table.sig td { width: 50%; vertical-align: top; font-size: 12pt; }
`;

function contract({ file, juridic, tip, cap4key, proba }) {
  const body = [
    `<h1>CONTRACT DE PRESTĂRI SERVICII DE PROMOVARE</h1>`,
    `<p class="nr">Nr. ${LS} / ${L}</p>`,
    `<p class="tip">${tip}</p>`,
    h('CAP. I. PĂRȚILE CONTRACTANTE'),
    beneficiar,
    p('și'),
    juridic ? prestatorJ : prestatorPF,
    temei,
    ...obiect(juridic),
    ...obligatii,
    ...cap4[cap4key],
    ...durata(proba),
    ...confid,
    ...incetare,
    ...finale,
    semnaturi(juridic),
  ].join('\n');
  const html = `<!doctype html><html lang="ro"><head><meta charset="utf-8"><title>${file}</title><style>${css}</style></head><body>${body}</body></html>`;
  writeFileSync(join(OUT, file + '.html'), html, 'utf8');
  console.log('scris', file);
}

contract({ file: 'CONTRACT PRIME PF', juridic: false, tip: 'Prestator persoană fizică – comisionul se acordă exclusiv sub formă de voucher (UpPromote Affiliates)', cap4key: 'PF', proba: null });
contract({ file: 'CONTRACT PRIME PF PROBA', juridic: false, tip: 'Perioadă de probă – prestator persoană fizică – comisionul se acordă exclusiv sub formă de voucher (UpPromote Affiliates)', cap4key: 'PF-PROBA', proba: LS });
contract({ file: 'CONTRACT PRIME SRL-PFA', juridic: true, tip: 'Prestator PFA / II / societate – comisionul se plătește prin transfer bancar, pe bază de factură', cap4key: 'J', proba: null });
contract({ file: 'CONTRACT PRIME SRL-PFA PROBA', juridic: true, tip: 'Perioadă de probă – prestator PFA / II / societate – comisionul se plătește prin transfer bancar, pe bază de factură', cap4key: 'J-PROBA', proba: '3 (trei)' });
