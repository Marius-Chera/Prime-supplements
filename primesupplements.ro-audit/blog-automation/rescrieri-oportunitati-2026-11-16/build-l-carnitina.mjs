// Rescrierea articolului l-carnitina-pentru-cine-este-potrivita (16.11.2026), după GHID-REDACTIONAL.md §2b, 2c, 3, 4, 5, 6b
// și brief-ul lotului 2. Căutări reale: „l carnitina slăbit forum” (41 afișări, poz. 9,3), „l carnitina păreri” (29, poz. 10).
// Folosire: node build-l-carnitina.mjs → scrie l-carnitina-pentru-cine-este-potrivita.html și .meta.json lângă acest fișier.
// Fapte de produs: produsul l-carnitine-1000-80-caps (ACTIVE), descriere + metafield-uri (custom.detalii_produs, custom.ingrediente,
//   prime.curiozitati, prime.beneficii) citite prin Admin API pe 16.11.2026: 1000 mg tartrat de L-carnitină per capsulă, o porție = o capsulă,
//   80 de capsule (98 g), cu apă, de preferat cu 30 de minute înainte de antrenament; capsulă de gelatină; nu sub 18 ani; fără recenzii.
// L-carnitina NU are mențiuni de sănătate autorizate în UE: fără promisiuni de slăbire, ardere a grăsimilor, energie, refacere, performanță.
// Studii (L-carnitina nu era în bibliotecă): Pooyandjoo 2016, Talenezhad 2020, Askarpour 2020, Hathcock 2006, Koeth 2013, Benvenga 2001
//   – verificate azi cu esummary + efetch. Fără cifre în kg (regula din lotul 1, spirulină).
// Imaginea principală rămâne cea actuală (fără generare AI).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const pubmed = (pmid, text) => `<a href="https://pubmed.ncbi.nlm.nih.gov/${pmid}/" rel="noopener">${text}</a>`;
const REG = '<a href="https://eur-lex.europa.eu/eli/reg/2012/432/oj" rel="noopener">Regulamentul (UE) nr. 432/2012</a>';

const P = {
  handle: 'l-carnitine-1000-80-caps',
  title: 'L-carnitină 1000 – 80 capsule',
  img: 'https://cdn.shopify.com/s/files/1/0917/5138/3415/files/01_LCARNITINE_80caps_front.jpg?v=1794828862',
};

function productBox(line, cta) {
  return `<div style="margin: 30px 0; padding: 20px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px;">
  <div style="display: flex; gap: 20px; align-items: center; flex-wrap: wrap;">
    <a href="/products/${P.handle}" style="flex-shrink: 0;"><img src="${P.img}&width=240" alt="${P.title}" loading="lazy" width="120" height="120" style="width: 120px; height: 120px; object-fit: cover; border-radius: 8px;"></a>
    <div style="flex: 1; min-width: 200px;">
      <p style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600; color: #1e293b;">${P.title}</p>
      <p style="margin: 0 0 12px 0; color: #334155;">${line}</p>
      <a href="/products/${P.handle}" style="display: inline-block; background: #b65b5d; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">${cta} →</a>
    </div>
  </div>
</div>`;
}

function table(head, rows) {
  const th = head.map(h => `<th style="padding: 12px; text-align: left; border: 1px solid #ddd;">${h}</th>`).join('');
  const tr = rows.map(r => `<tr>${r.map(c => `<td style="padding: 10px; border: 1px solid #ddd;">${c}</td>`).join('')}</tr>`).join('\n    ');
  return `<table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
  <thead><tr style="background-color: #b65b5d; color: #ffffff;">${th}</tr></thead>
  <tbody>
    ${tr}
  </tbody>
</table>`;
}

const SHORT = `<div style="background: #ea8a8a15; border-left: 4px solid #ea8a8a; padding: 16px 20px; margin-bottom: 24px; border-radius: 4px;">
  <p style="margin: 0 0 12px 0; font-weight: 600; color: #a54f51;">Pe scurt</p>
  <ul style="margin: 0; padding-left: 20px; color: #334155;">
    <li style="margin-bottom: 8px;">L-carnitina este o substanță pe care corpul o produce singur și pe care o primești mai ales din carne, pește și lactate.</li>
    <li style="margin-bottom: 8px;">În UE nu există nicio mențiune de sănătate autorizată pentru L-carnitină, deci nu i se poate promite niciun efect.</li>
    <li style="margin-bottom: 8px;">L-carnitină 1000 Prime are 1000 mg de tartrat de L-carnitină într-o capsulă; o porție este o capsulă, cu apă, de preferat cu 30 de minute înainte de antrenament.</li>
    <li style="margin-bottom: 8px;">Nu se recomandă sub 18 ani; în sarcină, alăptare, cu afecțiuni (inclusiv ale tiroidei) sau tratament, discuți întâi cu medicul.</li>
  </ul>
</div>`;

const BODY = `<p><strong>L-carnitina este o substanță pe care corpul o produce din doi aminoacizi și pe care o găsești în carne, pește și lactate; ca supliment, se potrivește adulților sănătoși care o vor separat și urmează doza de pe etichetă.</strong> În UE nu are nicio mențiune de sănătate autorizată. La L-carnitină 1000 Prime, o porție este o capsulă cu 1000 mg de tartrat de L-carnitină.</p>

<h2>Cuprins</h2>
<ul>
  <li><a href="#ce-este">Ce este L-carnitina</a></li>
  <li><a href="#pentru-cine">Pentru cine e potrivită L-carnitina și cui nu</a></li>
  <li><a href="#forumuri-studii">Ce scriu oamenii pe forumuri și ce arată studiile</a></li>
  <li><a href="#legea-ue">Ce spune legea UE despre L-carnitină</a></li>
  <li><a href="#cum-o-iei">Cum iei L-carnitina 1000</a></li>
  <li><a href="#precautii">Contraindicații și precauții</a></li>
  <li><a href="#intrebari-frecvente">Întrebări frecvente</a></li>
</ul>

<h2 id="ce-este">Ce este L-carnitina</h2>
<p>L-carnitina este un compus asemănător aminoacizilor, pe care organismul îl produce pornind de la lizină și metionină.</p>
<p>O primești mai ales din carne roșie, pește și lactate; alimentele vegetale au foarte puțină. Biochimia o descrie ca transportor al acizilor grași cu lanț lung spre mitocondrii, rol amintit și într-o evaluare de siguranță (${pubmed('16901595', 'Hathcock și Shao, 2006')}). Acest rol din manualele de biochimie nu înseamnă un efect promis al unei capsule.</p>
<p>În suplimente apar L-carnitina simplă, tartratul de L-carnitină și acetil-L-carnitina. Tartratul este L-carnitină legată de acid tartric, de aceea flaconul declară separat tartratul și L-carnitina propriu-zisă, care e mai puțină decât cele 1000 mg de tartrat.</p>

<h2 id="pentru-cine">Pentru cine e potrivită L-carnitina și cui nu</h2>
<p>Ca supliment, L-carnitina 1000 este gândită pentru adulții care se antrenează și vor L-carnitina separat, într-o capsulă fără cafeină în lista de ingrediente. Nu e un produs pentru copii și nici un înlocuitor al mesei sau al unei diete variate.</p>
${table(['Situația', 'Se potrivește?', 'Ce faci'], [
  ['Adult sănătos care se antrenează', 'da, ca opțiune', 'urmezi doza de pe etichetă: o capsulă pe porție'],
  ['Sub 18 ani', 'nu', 'eticheta nu o recomandă'],
  ['Sarcină sau alăptare', 'doar cu avizul medicului', 'întrebi medicul înainte'],
  ['Afecțiuni ale tiroidei sau tratament cu hormoni tiroidieni', 'doar cu avizul medicului', 'vezi secțiunea despre precauții'],
  ['Boli de inimă, de rinichi sau orice tratament medicamentos', 'doar cu avizul medicului', 'îi arăți medicului eticheta'],
  ['Vegetarian sau eviți gelatina', 'nu, în această formă', 'capsula este din gelatină'],
])}
<p>La sportivii cu care lucrăm, întrebarea despre L-carnitină vine des înaintea întrebării „cât mănânc?”. Ordinea corectă e invers: alimentația și antrenamentul contează primele, iar un supliment fără mențiune autorizată nu schimbă asta.</p>

<h2 id="forumuri-studii">Ce scriu oamenii pe forumuri și ce arată studiile</h2>
<p>Pe forumuri, întrebările despre L-carnitină se repetă: dacă te ajută la slăbit, în cât timp „se vede ceva”, dacă are rost fără sală și dacă e mai bună lichidă sau în capsule. Răspunsurile de acolo sunt experiențe personale, cu diete, antrenamente și doze diferite, deci nu se pot verifica.</p>
<p>Ce se poate verifica sunt meta-analizele care compară L-carnitina cu placebo (${pubmed('27335245', 'Pooyandjoo și colab., 2016')}). Concluzia scurtă: diferențele de greutate găsite sunt mici și variabile, iar L-carnitina nu e un produs de slăbit.</p>
<h3>Ce au găsit meta-analizele</h3>
<ul>
  <li><strong>9 studii, 911 participanți:</strong> grupurile cu carnitină au avut o diferență mică de greutate față de control, iar diferența s-a micșorat cu cât studiile au durat mai mult (${pubmed('27335245', 'Pooyandjoo și colab., 2016')}).</li>
  <li><strong>37 de studii, 2.292 de participanți:</strong> autorii descriu efectul asupra greutății drept modest; talia și procentul de grăsime corporală nu s-au schimbat semnificativ (${pubmed('32359762', 'Talenezhad și colab., 2020')}).</li>
  <li><strong>43 de studii:</strong> diferența a apărut mai ales la persoane cu supraponderalitate sau obezitate și, pentru greutate, doar alături de alte schimbări ale stilului de viață; procentul de grăsime și talia nu s-au schimbat semnificativ (${pubmed('31743774', 'Askarpour și colab., 2020')}).</li>
</ul>
<h3>Limitele acestor meta-analize</h3>
<p>Studiile incluse diferă mult între ele: doze, durate, populații (inclusiv pacienți cu diverse boli) și diete diferite, iar analiza din 2020 raportează o eterogenitate mare între ele (${pubmed('31743774', 'Askarpour și colab., 2020')}). O diferență medie mică, obținută din astfel de studii, nu spune ce se întâmplă la o persoană anume.</p>
<p>La studiile de calitate înaltă s-a confirmat doar diferența de greutate, nu și cea de compoziție corporală (${pubmed('32359762', 'Talenezhad și colab., 2020')}).</p>
<p>Cu aceeași abordare am scris și <a href="/blogs/news/proteina-whey-satietatea-te-ajuta-controlul-foamei">articolul despre proteina whey și sațietate</a>.</p>

${productBox('1000 mg de tartrat de L-carnitină într-o capsulă; o porție este o capsulă, iar flaconul are 80 de capsule (98 g). Fără cafeină în lista de ingrediente.', 'Vezi produsul')}

<h2 id="legea-ue">Ce spune legea UE despre L-carnitină</h2>
<p>Pentru L-carnitină nu există nicio mențiune de sănătate autorizată în ${REG}, lista oficială a mențiunilor permise pentru alimente și suplimente. Asta înseamnă că niciun producător nu are voie să-i atribuie un efect asupra greutății, a grăsimii corporale sau a antrenamentului.</p>
<p>De aceea, la L-carnitină 1000 Prime scriem doar ce e pe etichetă. Dacă vezi pe un ambalaj de L-carnitină promisiuni de slăbire, ele nu au acoperire legală în UE.</p>

<h2 id="cum-o-iei">Cum iei L-carnitina 1000</h2>
<p>L-carnitina 1000 se ia câte o capsulă (o porție), cu apă, de preferat cu 30 de minute înainte de antrenament, fără să depășești doza zilnică recomandată de pe etichetă. În zilele fără antrenament, o poți lua la aceeași oră, ca să nu uiți.</p>
${table(['Ce scrie pe etichetă', 'Valoare'], [
  ['Ingredient activ', 'tartrat de L-carnitină'],
  ['Cantitate pe capsulă (o porție)', '1000 mg tartrat de L-carnitină'],
  ['Capsule în flacon', '80 (greutate netă 98 g)'],
  ['Mod de administrare', 'cu apă, de preferat cu 30 de minute înainte de antrenament'],
  ['Învelișul capsulei', 'gelatină, oxid de zinc'],
  ['Antiaglomeranți', 'dioxid de siliciu, amidon modificat din porumb, stearat de magneziu'],
  ['Cât ține flaconul', '80 de zile la o capsulă pe zi (calcul aproximativ)'],
])}
<ul>
  <li><strong>Adună carnitina din toate produsele:</strong> unele formule pentru sală combină L-carnitina cu alte ingrediente; citește etichetele ca să știi cât iei în total.</li>
  <li><strong>Nu dubla porția:</strong> evaluarea de siguranță din 2006 a considerat dovezile solide până la 2000 mg pe zi de L-carnitină, iar peste acest nivel datele pe termen lung nu sunt suficiente (${pubmed('16901595', 'Hathcock și Shao, 2006')}).</li>
</ul>

<h2 id="precautii">Contraindicații și precauții</h2>
<p>L-carnitina 1000 nu se recomandă persoanelor sub 18 ani, iar în sarcină, alăptare, cu afecțiuni sau sub tratament medicamentos discuți cu medicul înainte. Pe lângă atenționările de pe etichetă, două teme apar des în literatura medicală.</p>
<h3>Tiroida</h3>
<p>Un studiu randomizat, dublu-orb, pe 50 de femei aflate sub tratament cu hormon tiroidian, a dat 2 sau 4 g de L-carnitină pe zi; autorii descriu L-carnitina ca antagonist periferic al acțiunii hormonilor tiroidieni (${pubmed('11502782', 'Benvenga și colab., 2001')}). Limita: un singur studiu mic, la doze mult peste o capsulă. Dacă ai o afecțiune a tiroidei sau iei hormoni tiroidieni, întreabă medicul înainte.</p>
<h3>Inima și TMAO</h3>
<p>Un studiu din 2013 a arătat că bacteriile intestinale transformă L-carnitina în TMAO, un compus legat de ateroscleroză; la șoareci, suplimentarea de durată a crescut ateroscleroza, iar la oameni datele sunt asocieri, nu dovezi de cauză (${pubmed('23563705', 'Koeth și colab., 2013')}). Dacă ai o boală de inimă sau factori de risc cardiovascular, discută cu medicul înainte de orice supliment cu L-carnitină.</p>
<ul>
  <li><strong>Oprește și întreabă medicul</strong> dacă apare orice reacție neobișnuită, inclusiv disconfort digestiv.</li>
  <li><strong>Afecțiuni ale rinichilor:</strong> carnitina se elimină prin rinichi; cu orice boală renală, decide medicul.</li>
</ul>

${productBox('Tartrat de L-carnitină în capsule de gelatină: 1000 mg pe capsulă, 80 de porții. Livrare gratuită la comenzile de peste 300 de lei.', 'Comandă L-carnitină 1000')}

<h2 id="intrebari-frecvente">Întrebări frecvente</h2>
<h3>L-carnitina ajută la slăbit?</h3>
<p>În UE nu există nicio mențiune de sănătate autorizată pentru L-carnitină, deci nu i se poate promite slăbirea. Meta-analizele au găsit diferențe mici și variabile față de placebo, mai ales la persoane cu supraponderalitate și alături de dietă (${pubmed('31743774', 'Askarpour și colab., 2020')}). Nu e un produs de slăbit.</p>
<h3>Ce păreri are lumea despre L-carnitină?</h3>
<p>Părerile de pe forumuri sunt amestecate și nu se pot verifica: fiecare om are altă dietă și alt program. Reperul sigur rămâne eticheta.</p>
<h3>Cum se ia L-carnitina 1000?</h3>
<p>O capsulă (o porție), cu apă, de preferat cu 30 de minute înainte de antrenament, fără să depășești doza zilnică recomandată de pe etichetă. Flaconul are 80 de capsule.</p>
<h3>Se poate lua L-carnitina fără sală?</h3>
<p>Eticheta leagă momentul de antrenament, iar produsul este gândit pentru adulții care se antrenează. Fără antrenament nu ai un motiv anume s-o iei; un supliment nu înlocuiește mișcarea și dieta.</p>
<h3>Cine nu trebuie să ia L-carnitină?</h3>
<p>Persoanele sub 18 ani, conform etichetei. Femeile însărcinate sau care alăptează, cei cu afecțiuni ale tiroidei, inimii sau rinichilor și cei care iau medicamente întreabă întâi medicul.</p>

<p>Celelalte suplimente pentru sală, cu doza fiecăruia pe etichetă, le găsești în colecția <a href="/collections/suplimente-sala">Suplimente</a>.</p>`;

const SOURCES = `<h2 id="surse">Surse</h2>
<p>Lucrările de mai jos sunt citate în text; fiecare link duce la rezumatul de pe PubMed (Biblioteca Națională de Medicină a SUA) sau la textul oficial al legislației UE.</p>
<ol style="padding-left: 20px; color: #334155;">
  <li style="margin-bottom: 8px;">Pooyandjoo M și colab. The effect of (L-)carnitine on weight loss in adults: a systematic review and meta-analysis of randomized controlled trials. Obes Rev. 2016;17(10):970-6. <a href="https://pubmed.ncbi.nlm.nih.gov/27335245/" rel="noopener">PubMed 27335245</a> · <a href="https://doi.org/10.1111/obr.12436" rel="noopener">doi:10.1111/obr.12436</a></li>
  <li style="margin-bottom: 8px;">Talenezhad N și colab. Effects of l-carnitine supplementation on weight loss and body composition: A systematic review and meta-analysis of 37 randomized controlled clinical trials with dose-response analysis. Clin Nutr ESPEN. 2020;37:9-23. <a href="https://pubmed.ncbi.nlm.nih.gov/32359762/" rel="noopener">PubMed 32359762</a> · <a href="https://doi.org/10.1016/j.clnesp.2020.03.008" rel="noopener">doi:10.1016/j.clnesp.2020.03.008</a></li>
  <li style="margin-bottom: 8px;">Askarpour M și colab. Beneficial effects of l-carnitine supplementation for weight management in overweight and obese adults: An updated systematic review and dose-response meta-analysis of randomized controlled trials. Pharmacol Res. 2020;151:104554. <a href="https://pubmed.ncbi.nlm.nih.gov/31743774/" rel="noopener">PubMed 31743774</a> · <a href="https://doi.org/10.1016/j.phrs.2019.104554" rel="noopener">doi:10.1016/j.phrs.2019.104554</a></li>
  <li style="margin-bottom: 8px;">Hathcock JN, Shao A. Risk assessment for carnitine. Regul Toxicol Pharmacol. 2006;46(1):23-8. <a href="https://pubmed.ncbi.nlm.nih.gov/16901595/" rel="noopener">PubMed 16901595</a> · <a href="https://doi.org/10.1016/j.yrtph.2006.06.007" rel="noopener">doi:10.1016/j.yrtph.2006.06.007</a></li>
  <li style="margin-bottom: 8px;">Benvenga S și colab. Usefulness of L-carnitine, a naturally occurring peripheral antagonist of thyroid hormone action, in iatrogenic hyperthyroidism: a randomized, double-blind, placebo-controlled clinical trial. J Clin Endocrinol Metab. 2001;86(8):3579-94. <a href="https://pubmed.ncbi.nlm.nih.gov/11502782/" rel="noopener">PubMed 11502782</a> · <a href="https://doi.org/10.1210/jcem.86.8.7747" rel="noopener">doi:10.1210/jcem.86.8.7747</a></li>
  <li style="margin-bottom: 8px;">Koeth RA și colab. Intestinal microbiota metabolism of L-carnitine, a nutrient in red meat, promotes atherosclerosis. Nat Med. 2013;19(5):576-85. <a href="https://pubmed.ncbi.nlm.nih.gov/23563705/" rel="noopener">PubMed 23563705</a> · <a href="https://doi.org/10.1038/nm.3145" rel="noopener">doi:10.1038/nm.3145</a></li>
  <li style="margin-bottom: 8px;">Regulamentul (UE) nr. 432/2012 al Comisiei – lista mențiunilor de sănătate permise pentru alimente. <a href="https://eur-lex.europa.eu/eli/reg/2012/432/oj" rel="noopener">EUR-Lex</a></li>
</ol>`;

const DISCLAIMER = `<p><em>Informațiile din acest articol au caracter general și nu înlocuiesc sfatul medicului sau al unui specialist în nutriție. Suplimentele alimentare nu înlocuiesc o dietă variată și echilibrată. Consultați medicul înainte de a începe un supliment, mai ales în caz de sarcină, alăptare, afecțiuni sau tratament medicamentos.</em></p>`;

const AUTHOR = `<div class="author author-box" style="margin-top: 40px; padding: 24px; background: #f8f9fa; border-radius: 8px; display: flex; gap: 20px; align-items: flex-start;" itemprop="author" itemscope itemtype="https://schema.org/Person">
  <img src="https://cdn.shopify.com/s/files/1/0917/5138/3415/files/author-photo-primesupplements1-myshopify-com.jpg?v=1773308575&amp;width=160" alt="Marius Chera, antrenor de culturism" loading="lazy" itemprop="image" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover; flex-shrink: 0;">
  <div style="flex: 1;">
    <p style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600; color: #1a1a1a;"><a href="/pages/autor-marius-chera" itemprop="url" style="color: #1a1a1a; text-decoration: none;"><span itemprop="name">Marius Chera</span></a></p>
    <p style="margin: 0; font-size: 14px; color: #555; line-height: 1.6;" itemprop="description">Marius Chera – antrenor de culturism, fondatorul Prime Supplements (2022). Lector la cursurile de instructori din cadrul FRCF, a pregătit sportivi care au obținut carduri PRO și titluri europene și mondiale IFBB. Specializat în online coaching, îmbină experiența din competiții cu știința nutriției sportive.</p>
  </div>
</div>`;

const RELATED = [
  { handle: 'proteina-whey-satietatea-te-ajuta-controlul-foamei', title: 'Proteina whey și sațietatea: ce spun studiile și legea UE', img: 'https://cdn.shopify.com/s/files/1/0917/5138/3415/articles/blog-proteina-whey-satietatea-te-ajuta-controlul-foamei.jpg?v=1794632813', summary: 'Whey și sațietatea pe termen scurt și de ce în UE nu există o mențiune autorizată.' },
  { handle: 'leucina-aminoacidul-cheie-muschi', title: 'Leucina: ce este, unde se găsește și cum o iei', img: 'https://cdn.shopify.com/s/files/1/0917/5138/3415/articles/blog-leucina-aminoacidul-cheie-muschi.jpg?v=1792728425', summary: 'Ce este leucina, din ce alimente o iei și cât conține o porție de Prime EAA.' },
  { handle: 'nac-glutationul-legatura-exista', title: 'NAC și glutationul: ce legătură există', img: 'https://cdn.shopify.com/s/files/1/0917/5138/3415/articles/blog-nac-glutationul-legatura-exista-din-sedinta-foto-exterior-recovery-eaa-nac-1.jpg?v=1794657773', summary: 'Ce este N-acetilcisteina, ce spun recenziile și ce scrie pe eticheta NAC Prime.' },
];

const related = `<div style="margin-top: 40px; padding-top: 32px; border-top: 1px solid #e2e8f0;">
  <h3 style="margin: 0 0 24px 0; font-size: 1.5rem; font-weight: 600; color: #a54f51;">Articole Similare</h3>
  <div class="related-posts-grid" style="display: flex; flex-wrap: wrap; gap: 24px;">
${RELATED.map(r => `    <a href="/blogs/news/${r.handle}" class="related-post-card" style="text-decoration: none; color: inherit; display: block; flex: 1 1 calc(50% - 12px); min-width: 280px;">
      <div style="background: white; border-radius: 12px; box-shadow: 0 2px 12px rgba(0,0,0,0.08); overflow: hidden; height: 100%;">
        <img src="${r.img}&width=800" alt="${r.title}" loading="lazy" style="width: 100%; height: 180px; object-fit: cover;">
        <div style="padding: 20px;">
          <h4 style="margin: 0 0 10px 0; font-size: 1.1rem; font-weight: 600; color: #1e293b; line-height: 1.4;">${r.title}</h4>
          <p style="margin: 0; font-size: 0.9rem; color: #5f6e85; line-height: 1.6;">${r.summary}</p>
        </div>
      </div>
    </a>`).join('\n')}
  </div>
</div>`;

const META = {
  handle: 'l-carnitina-pentru-cine-este-potrivita',
  id: 'gid://shopify/Article/1024246251895',
  title: 'L-carnitina: ce este, pentru cine e potrivită și cum o iei',
  seoTitle: 'L-carnitina: ce este, pentru cine e potrivită, cum o iei',
  seoDesc: 'L-carnitina: ce este, pentru cine e potrivită, cum iei capsula de 1000 mg după etichetă, ce arată meta-analizele și când discuți cu medicul.',
  summary: 'L-carnitina este o substanță pe care corpul o produce și pe care o iei din carne, pește și lactate; în UE nu are nicio mențiune de sănătate autorizată. L-carnitină 1000 Prime are 1000 mg de tartrat de L-carnitină pe capsulă, o capsulă pe porție, pentru adulți.',
  keyword: 'l-carnitina',
  imageAlt: 'L-carnitina: flacon de supliment, sticle de apă, cuburi de gheață și un prosop pe o masă de sală',
};

const html = [SHORT, BODY, SOURCES, DISCLAIMER, AUTHOR, related].join('\n\n');
fs.writeFileSync(path.join(dir, `${META.handle}.html`), html);
fs.writeFileSync(path.join(dir, `${META.handle}.meta.json`), JSON.stringify(META, null, 1));

const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
const FORBIDDEN = ['vindec', 'tratează', 'previne boala', 'detox', 'arde grăsim', 'ardere', 'garantat', 'fără gluten', '<h1', '<script', 'target="_blank"', 'stres ', 'refacere', 'rezultate', 'face efect', 'energie', 'sursă de', 'performanț', ' kg', 'kilogram'];
console.log(`cuvinte ${text.split(' ').length} · title ${META.title.length} · seoTitle ${META.seoTitle.length} · seoDesc ${META.seoDesc.length} · interzise: ${FORBIDDEN.filter(w => text.toLowerCase().includes(w) || html.toLowerCase().includes(w)).join(',') || '-'}`);
