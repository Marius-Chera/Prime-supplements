// Rescrierea articolului digestie-suplimente-fibre-alimentatie-rezultate-maxime (16.11.2026), după GHID-REDACTIONAL.md §2b, 2c, 3, 4, 5, 6b și BRIEF-LOT2.
// Folosire: node build-fibre.mjs → scrie digestie-suplimente-fibre-alimentatie-rezultate-maxime.html și .meta.json lângă acest fișier.
// Căutări țintă (GSC): fibre de acacia (41 afișări, poz. 10,2), fibre acacia (25, 9,1), fibre de acacia beneficii (12, 6,6).
// Fapte de produs: fiber-blood-orange (ACTIVE), descriptionHtml + metafield-uri custom.* citite prin Admin API pe 16.11.2026:
//   porție 10 g (aprox. 1 măsură) în 150–250 ml apă, o porție pe zi, înainte de masă; 7,4 g fibre/porție, 74,0 g/100 g;
//   21,0 kcal/porție; carbohidrați 1,1 g, zaharuri 0,10 g, grăsimi 0,11 g, proteine 0,20 g; 500 g = 50 de porții;
//   ingrediente: inulină, fibre acacia, fibre de bambus, făină de ovăz, glucomanan (konjac), acid citric, baobab, arome,
//   extract de boia, sucraloză, acesulfam-K; alergen: ovăz; reviews.rating 5.0, reviews.rating_count 2.
//   Eticheta NU declară cantitatea de fibre de acacia, de inulină sau de glucomanan pe porție.
// Mențiuni: niciuna de sănătate (inulina din cicoare cere 12 g/zi – Reg. 2015/2314, text RO citit 16.11.2026 din Cellar;
//   glucomananul cere 4 g/zi sau 3×1 g; fibrele din boabe de ovăz cer ca acele fibre să atingă „bogat în fibre” – Reg. 432/2012).
//   Mențiune nutrițională: „bogat în fibre” (Reg. 1924/2006, ≥ 6 g/100 g) – Fiber are 74,0 g/100 g.
// Studii (toate noi, verificate azi cu esummary + efetch): 40545081 (Zahid 2025), 18466655 (Calame 2008), 33672963 (Larson 2021),
//   23609775 (Slavin 2013), 28676135 (Stephen 2017).
// Scos din textul vechi: „diabet”, secțiunea despre glicemie (#control-glicemie), „digestie” ca efect, „probă de digestie”,
//   „leacuri bătrânești”, linkurile spre magneziu, scorțișoară și nattokinază, „producție/fabrică”, „post intermitent”,
//   „dens energetic”, „pentru energie și reparație celulară”. Imaginea principală rămâne cea actuală.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const pubmed = (pmid, text) => `<a href="https://pubmed.ncbi.nlm.nih.gov/${pmid}/" rel="noopener">${text}</a>`;
const REG = '<a href="https://eur-lex.europa.eu/eli/reg/2012/432/oj" rel="noopener">Regulamentul (UE) nr. 432/2012</a>';
const REG2314 = '<a href="https://eur-lex.europa.eu/eli/reg/2015/2314/oj" rel="noopener">Regulamentul (UE) 2015/2314</a>';
const REG1924 = '<a href="https://eur-lex.europa.eu/eli/reg/2006/1924/oj" rel="noopener">Regulamentul (CE) nr. 1924/2006</a>';

const P = {
  handle: 'fiber-blood-orange',
  title: 'Fiber – băutură cu fibre, aromă portocală roșie, 500 g',
  img: 'https://cdn.shopify.com/s/files/1/0917/5138/3415/files/ALLMERCH328.jpg?v=1794829001',
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
    <li style="margin-bottom: 8px;">„Fibre de acacia” este numele de pe etichete pentru guma arabică, un polizaharid obținut din arborii Acacia senegal și Acacia seyal (${pubmed('40545081', 'Zahid și colab., 2025')}).</li>
    <li style="margin-bottom: 8px;">Sunt o fibră solubilă, care se amestecă ușor în băuturi (${pubmed('33672963', 'Larson și colab., 2021')}).</li>
    <li style="margin-bottom: 8px;">În UE nu există o mențiune de sănătate autorizată pentru guma arabică, așa că nu îi promitem efecte.</li>
    <li style="margin-bottom: 8px;">Băutura Fiber Prime are 7,4 g de fibre în porția de 10 g, din cinci ingrediente, printre care fibrele de acacia.</li>
  </ul>
</div>`;

const BODY = `<p><strong>Fibrele de acacia sunt guma arabică, o fibră solubilă obținută din seva întărită a arborilor Acacia senegal și Acacia seyal. Le iei dizolvate în apă, ca parte a aportului zilnic de fibre, alături de legume, fructe, leguminoase și cereale integrale. În UE nu au o mențiune de sănătate autorizată.</strong></p>

<h2>Cuprins</h2>
<ul>
  <li><a href="#ce-sunt">Fibrele de acacia: ce sunt</a></li>
  <li><a href="#studii">Fibrele de acacia: ce au cercetat studiile</a></li>
  <li><a href="#mentiuni-ue">Ce permite UE să se spună despre fibre</a></li>
  <li><a href="#fibre-pe-portie">Câte fibre are o porție de Fiber</a></li>
  <li><a href="#alimente">Ce alimente au fibre</a></li>
  <li><a href="#cum-folosesti">Cum folosești Fiber</a></li>
  <li><a href="#intrebari-frecvente">Întrebări frecvente</a></li>
</ul>

<h2 id="ce-sunt">Fibrele de acacia: ce sunt</h2>
<p>Fibrele de acacia sunt guma arabică, un polizaharid natural produs de arborii Acacia senegal și Acacia seyal. Partea principală a moleculei este un complex de tip arabinogalactan, adică lanțuri de zaharuri legate de o cantitate mică de proteină (${pubmed('40545081', 'Zahid și colab., 2025')}).</p>
<p>Pe etichete apare ca „fibre de acacia”, „gumă arabică” sau „acacia gum”: același ingredient.</p>
<p>Ca orice fibră alimentară, guma arabică rezistă digestiei în intestinul subțire și ajunge în colon, unde bacteriile o fermentează; o recenzie din 2013 o trece pe lista fibrelor izolate studiate pentru felul în care influențează bacteriile din colon (${pubmed('23609775', 'Slavin, 2013')}).</p>
<p>Guma arabică nu face lichidul vâscos: e o fibră solubilă, nevâscoasă, care se adaugă ușor în băuturi (${pubmed('33672963', 'Larson și colab., 2021')}). De aceea apare des în pudrele cu fibre.</p>

<h2 id="studii">Fibrele de acacia: ce au cercetat studiile</h2>
<p>Pe guma arabică există puține lucrări pe oameni, iar în UE nu are nicio mențiune de sănătate autorizată. Rezumăm două dintre ele, cu limitele lor, fără să transformăm cifrele în promisiuni (${pubmed('18466655', 'Calame și colab., 2008')}; ${pubmed('33672963', 'Larson și colab., 2021')}).</p>
<p>Într-un studiu din 2008, voluntari sănătoși au luat zilnic 5, 10, 20 sau 40 g de gumă arabică dizolvată în apă, timp de până la 4 săptămâni, comparat cu apă simplă și cu 10 g de inulină. După 4 săptămâni, numărul de bifidobacterii și lactobacili din probele de scaun a fost mai mare decât în grupul cu apă, cu cea mai bună valoare în jurul dozei de 10 g, și nu au fost raportate neplăceri semnificative (${pubmed('18466655', 'Calame și colab., 2008')}).</p>
<p>Limite: doar 4 săptămâni, a numărat bacterii fără să urmărească o stare de sănătate, iar autorii lucrau pentru o firmă de ingrediente (${pubmed('18466655', 'Calame și colab., 2008')}).</p>
<p>Al doilea studiu, din 2021, a dat la 48 de adulți sănătoși 0, 20 sau 40 g de gumă de acacia în suc de portocale, la micul dejun. La 40 g au apărut mai des balonare, gaze și zgomote intestinale decât la control, deși scorurile de toleranță au rămas mici (${pubmed('33672963', 'Larson și colab., 2021')}).</p>
<p>Limite: o singură masă și doze mult mai mari decât acacia dintr-o porție de Fiber, unde e doar una din cinci fibre (${pubmed('33672963', 'Larson și colab., 2021')}). Concluzia practică la sportivii cu care lucrăm: crești fibrele treptat și bei apă.</p>

<h2 id="mentiuni-ue">Ce permite UE să se spună despre fibre</h2>
<p>Pentru fibre în general nu există o mențiune de sănătate generică în UE. Există doar mențiuni pentru fibre anume, fiecare cu o condiție de doză, în ${REG} și în actele care l-au completat.</p>
<ul>
  <li><strong>Inulina din cicoare</strong> (în textul oficial în română: „andivă”) contribuie la funcționarea normală a intestinului prin creșterea frecvenței defecărilor, doar la un aport zilnic de cel puțin 12 g de inulină nativă din cicoare (${REG2314}).</li>
  <li><strong>Fibrele din boabe de ovăz</strong> contribuie la creșterea volumului bolului fecal, doar dacă alimentul este bogat în astfel de fibre (${REG}).</li>
  <li><strong>Glucomananul</strong> are mențiuni doar de la 3–4 g pe zi, cu avertisment despre sufocare dacă e luat cu prea puțin lichid (${REG}).</li>
</ul>
<p>Niciuna nu se aplică la Fiber: porția are 10 g de pudră în total, iar eticheta nu declară separat inulina, fibrele de ovăz sau glucomananul.</p>
<p>Ce putem spune este o mențiune nutrițională. Conform ${REG1924}, un aliment poate fi numit „bogat în fibre” dacă are cel puțin 6 g de fibre la 100 g. Fiber are 74,0 g de fibre la 100 g, deci îndeplinește condiția.</p>

<h2 id="fibre-pe-portie">Câte fibre are o porție de Fiber</h2>
<p>O porție de 10 g de Fiber are 7,4 g de fibre și 21,0 kcal, conform declarației nutriționale de pe tub.</p>
${table(['Ce scrie pe eticheta Fiber', 'Per porție (10 g)', 'La 100 g'], [
  ['Fibre', '<strong>7,4 g</strong>', '74,0 g'],
  ['Valoare energetică', '87,7 kJ / 21,0 kcal', '876,5 kJ / 209,7 kcal'],
  ['Carbohidrați', '1,1 g', '10,8 g'],
  ['din care zaharuri', '0,10 g', '1,0 g'],
  ['Grăsimi', '0,11 g', '1,1 g'],
  ['Proteine', '0,20 g', '2,0 g'],
])}
<p>Fibrele porției, în ordinea de pe etichetă: inulină, fibre de acacia, fibre de bambus, făină de ovăz și glucomanan din rădăcină de konjac. Eticheta dă doar totalul de 7,4 g, nu cantitatea fiecărei fibre.</p>
<p>Reperul EFSA pentru adulți este 25 g de fibre pe zi; o porție de Fiber acoperă aproximativ 30% (7,4 ÷ 25, calcul aproximativ), restul vine din alimente.</p>

${productBox('7,4 g de fibre în porția de 10 g, din inulină, fibre de acacia, fibre de bambus, făină de ovăz și glucomanan. Aromă de portocală roșie, 50 de porții în tub.', 'Vezi produsul')}

<h2 id="alimente">Ce alimente au fibre</h2>
<p>Cele mai multe fibre vin din alimente vegetale puțin procesate: leguminoase, cereale integrale, legume, fructe, nuci și semințe. O băutură cu fibre completează aceste alimente, nu le înlocuiește.</p>
<ul>
  <li><strong>Leguminoase:</strong> fasole, linte, năut, mazăre.</li>
  <li><strong>Cereale integrale:</strong> fulgi de ovăz, orz, pâine și paste integrale, orez brun.</li>
  <li><strong>Legume, nuci și semințe:</strong> broccoli, varză, anghinare, sparanghel, migdale, semințe de in și de chia.</li>
  <li><strong>Fructe:</strong> mere și pere cu coajă, fructe de pădure, banane, citrice.</li>
</ul>
<p>O recenzie europeană din 2017 a comparat recomandările și consumul de fibre din mai multe țări și a găsit că, în sondajele naționale, oamenii nu ajung la cantitatea recomandată (${pubmed('28676135', 'Stephen și colab., 2017')}). Limita: o parte dintre autori lucrau în industria alimentară.</p>
<p>La sportivii cu care lucrăm vedem des mult pui și orez alb, puține leguminoase și legume. Recomandăm întâi o porție de legume la fiecare masă, apoi o băutură cu fibre.</p>

<h2 id="cum-folosesti">Cum folosești Fiber</h2>
<p>Fiber se ia o dată pe zi, înainte de masă: amesteci 10 g (aproximativ o măsură) cu 150–250 ml de apă, cum recomandă eticheta. Bei porția imediat după ce ai amestecat-o și bei lichide suficiente pe parcursul zilei.</p>
<ul>
  <li><strong>Doza:</strong> o porție de 10 g pe zi = 7,4 g de fibre.</li>
  <li><strong>Momentul:</strong> înainte de una dintre mese; alegi masa la care îți e cel mai ușor să o repeți zilnic.</li>
  <li><strong>Început treptat:</strong> dacă mănânci puține fibre acum, poți începe cu jumătate de porție câteva zile. La doze mari de gumă de acacia, balonarea și gazele au fost mai frecvente (${pubmed('33672963', 'Larson și colab., 2021')}).</li>
  <li><strong>Cât ține un tub:</strong> 500 g = 50 de porții, deci 50 de zile la o porție pe zi.</li>
  <li><strong>Alergeni:</strong> conține ovăz, deci nu e potrivit dacă eviți ovăzul.</li>
  <li><strong>Părerea clienților:</strong> nota 5 din 5, din 2 recenzii pe pagina produsului.</li>
</ul>
<p>Dacă ai o afecțiune intestinală, dificultăți la înghițire, ești însărcinată, alăptezi, iei medicamente sau ai dureri abdominale persistente, discută cu medicul înainte de un produs cu fibre.</p>
<p>Dacă ovăzul te balonează, citește <a href="/blogs/news/ovaz-si-balonare-reactii-digestive">ovăz și balonare: reacții normale vs. semne de alarmă</a>.</p>

${productBox('Băutură instant cu fibre, bogată în fibre: 74,0 g la 100 g. O porție de 10 g pe zi, înainte de masă. Livrare gratuită la comenzile de peste 300 de lei.', 'Comandă Fiber')}

<h2 id="intrebari-frecvente">Întrebări frecvente</h2>
<h3>Ce sunt fibrele de acacia?</h3>
<p>Sunt guma arabică, o fibră solubilă din arborii Acacia senegal și Acacia seyal (${pubmed('40545081', 'Zahid și colab., 2025')}).</p>
<h3>Ce beneficii au fibrele de acacia?</h3>
<p>În UE nu există o mențiune de sănătate autorizată pentru guma arabică, așa că nu îi atribuim efecte. Un studiu de 4 săptămâni a numărat mai multe bifidobacterii în scaun, dar e mic și nu a măsurat o stare de sănătate (${pubmed('18466655', 'Calame și colab., 2008')}).</p>
<h3>Câte fibre are o porție de Fiber?</h3>
<p>O porție de 10 g are 7,4 g de fibre, iar la 100 g sunt 74,0 g, conform declarației nutriționale de pe tub.</p>
<h3>Când se iau fibrele de acacia?</h3>
<p>La Fiber, o dată pe zi, înainte de masă, cu 150–250 ml de apă, cum recomandă eticheta.</p>
<h3>Fibrele de acacia pot da balonare?</h3>
<p>Da, mai ales la doze mari: la 40 g de gumă de acacia, participanții au raportat mai des balonare și gaze decât la control, deși scorurile au rămas mici (${pubmed('33672963', 'Larson și colab., 2021')}). Crește fibrele treptat și bea apă.</p>

<p>Alte produse pentru meniul de zi cu zi găsești în colecția <a href="/collections/alimente-sanatoase">Alimente sănătoase</a>.</p>`;

const SOURCES = `<h2 id="surse">Surse</h2>
<p>Lucrările de mai jos sunt citate în text; fiecare link duce la rezumatul de pe PubMed (Biblioteca Națională de Medicină a SUA) sau la textul oficial al legislației UE.</p>
<ol style="padding-left: 20px; color: #334155;">
  <li style="margin-bottom: 8px;">Zahid MU și colab. Molecular perspectives on Acacia Gum as a functional polysaccharide for biomedical and industrial applications: A review. Int J Biol Macromol. 2025;319(Pt 1):145412. <a href="https://pubmed.ncbi.nlm.nih.gov/40545081/" rel="noopener">PubMed 40545081</a> · <a href="https://doi.org/10.1016/j.ijbiomac.2025.145412" rel="noopener">doi:10.1016/j.ijbiomac.2025.145412</a></li>
  <li style="margin-bottom: 8px;">Calame W și colab. Gum arabic establishes prebiotic functionality in healthy human volunteers in a dose-dependent manner. Br J Nutr. 2008;100(6):1269-75. <a href="https://pubmed.ncbi.nlm.nih.gov/18466655/" rel="noopener">PubMed 18466655</a> · <a href="https://doi.org/10.1017/S0007114508981447" rel="noopener">doi:10.1017/S0007114508981447</a></li>
  <li style="margin-bottom: 8px;">Larson R și colab. Acacia Gum Is Well Tolerated While Increasing Satiety and Lowering Peak Blood Glucose Response in Healthy Human Subjects. Nutrients. 2021;13(2):618. <a href="https://pubmed.ncbi.nlm.nih.gov/33672963/" rel="noopener">PubMed 33672963</a> · <a href="https://doi.org/10.3390/nu13020618" rel="noopener">doi:10.3390/nu13020618</a></li>
  <li style="margin-bottom: 8px;">Slavin J. Fiber and prebiotics: mechanisms and health benefits. Nutrients. 2013;5(4):1417-35. <a href="https://pubmed.ncbi.nlm.nih.gov/23609775/" rel="noopener">PubMed 23609775</a> · <a href="https://doi.org/10.3390/nu5041417" rel="noopener">doi:10.3390/nu5041417</a></li>
  <li style="margin-bottom: 8px;">Stephen AM și colab. Dietary fibre in Europe: current state of knowledge on definitions, sources, recommendations, intakes and relationships to health. Nutr Res Rev. 2017;30(2):149-190. <a href="https://pubmed.ncbi.nlm.nih.gov/28676135/" rel="noopener">PubMed 28676135</a> · <a href="https://doi.org/10.1017/S095442241700004X" rel="noopener">doi:10.1017/S095442241700004X</a></li>
  <li style="margin-bottom: 8px;">Regulamentul (UE) nr. 432/2012 al Comisiei – lista mențiunilor de sănătate permise pentru alimente. <a href="https://eur-lex.europa.eu/eli/reg/2012/432/oj" rel="noopener">EUR-Lex</a></li>
  <li style="margin-bottom: 8px;">Regulamentul (UE) 2015/2314 al Comisiei – autorizarea mențiunii pentru inulina nativă din cicoare. <a href="https://eur-lex.europa.eu/eli/reg/2015/2314/oj" rel="noopener">EUR-Lex</a></li>
  <li style="margin-bottom: 8px;">Regulamentul (CE) nr. 1924/2006 privind mențiunile nutriționale și de sănătate (anexa: „bogat în fibre”). <a href="https://eur-lex.europa.eu/eli/reg/2006/1924/oj" rel="noopener">EUR-Lex</a></li>
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
  { handle: 'fibre-dieta-antiinflamatoare', title: 'Fibre în dieta antiinflamatoare: inulină și acacia', img: 'https://cdn.shopify.com/s/files/1/0917/5138/3415/articles/blog-fiber-blood-orange-anti-inflammatory-foods-guide-1778911342446.png?v=1792131382', summary: 'Ce sunt inulina și fibrele de acacia și cum le pui în meniul zilnic.' },
  { handle: 'ovaz-si-balonare-reactii-digestive', title: 'Ovăz și balonare: reacții normale vs. semne de alarmă', img: 'https://cdn.shopify.com/s/files/1/0917/5138/3415/articles/blog-instant-oat-cream-800g-25-serv-gut-healthy-food-choices-1778998859947.png?v=1779084611', summary: 'Când balonarea după ovăz e normală și când e cazul să mergi la medic.' },
  { handle: 'cum-alegi-ovazul-instant', title: 'Cum alegi ovăzul instant: diferențe ieftin vs. premium', img: 'https://cdn.shopify.com/s/files/1/0917/5138/3415/articles/blog-instant-oat-cream-800g-25-serv-healthy-eating-for-busy-people-1779345897971.png?v=1792126562', summary: 'Ce citești pe eticheta unui ovăz instant înainte să-l alegi.' },
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
  handle: 'digestie-suplimente-fibre-alimentatie-rezultate-maxime',
  id: 'gid://shopify/Article/1023329239415',
  title: 'Fibre de acacia: ce sunt, cum le iei și ce alimente au fibre',
  seoTitle: 'Fibre de acacia: ce sunt, cum le iei și ce alimente au fibre',
  seoDesc: 'Fibre de acacia: ce este guma arabică, ce au cercetat studiile, câte fibre are o porție de Fiber (7,4 g la 10 g) și ce alimente au multe fibre.',
  summary: 'Fibrele de acacia sunt guma arabică, o fibră solubilă din arborii Acacia senegal și Acacia seyal, fără mențiune de sănătate autorizată în UE. O porție de 10 g de Fiber Prime are 7,4 g de fibre, iar restul fibrelor vin din leguminoase, cereale integrale, legume și fructe.',
  keyword: 'fibre de acacia',
  imageAlt: 'Fibre de acacia și alte fibre: borcan cu pudră albă și linguriță de lemn pe o masă albă, cu ovăz, anghinare, avocado, usturoi, afine, sparanghel, migdale, nuci și banană',
};

const html = [SHORT, BODY, SOURCES, DISCLAIMER, AUTHOR, related].join('\n\n');
fs.writeFileSync(path.join(dir, `${META.handle}.html`), html);
fs.writeFileSync(path.join(dir, `${META.handle}.meta.json`), JSON.stringify(META, null, 1));

const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
const FORBIDDEN = ['vindec', 'tratează', 'previne boala', 'detox', 'arde grăsim', 'garantat', 'fără gluten', '<h1', '<script', 'target="_blank"', 'somn', 'stres ', 'refacere', 'rezultate', 'face efect', 'energie', 'sursă de', 'surse de', 'slăbi', 'diabet', 'glicemi', 'glucoz', 'digestie mai', 'sațietate', 'greutate', 'colesterol', 'prebiotic'];
const bodyOnly = [SHORT, BODY].join(' ').toLowerCase();
const metaText = [META.title, META.seoTitle, META.seoDesc, META.summary, META.imageAlt].join(' ').toLowerCase();
const META_FORBIDDEN = ['digestie', 'beneficii', 'diabet', 'glicemie', 'slăb', 'detox', 'prebiotic', 'intestin', '"'];
console.log(`cuvinte ${text.split(' ').length} · title ${META.title.length} · seoTitle ${META.seoTitle.length} · seoDesc ${META.seoDesc.length} · interzise în corp: ${FORBIDDEN.filter(w => bodyOnly.includes(w)).join(',') || '-'} · meta interzise: ${META_FORBIDDEN.filter(w => metaText.includes(w)).join(',') || '-'}`);
