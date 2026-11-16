// Rescrierea articolului izolat-proteic-beneficii (16.11.2026), după GHID-REDACTIONAL.md §2b, 2c, 3, 4, 5, 6b și BRIEF-LOT2.
// Folosire: node build-izolat.mjs → scrie izolat-proteic-beneficii.html și .meta.json lângă acest fișier.
// Căutări reale (GSC): „proteina izolată” (47 afișări, poz. 28), „izolat proteic” (46, poz. 10), „proteina din zer izolat” (35, poz. 16).
// Ținta: produsul pure-isolate-2000g să ia „izolat proteic”; articolul trimite clar spre produs și spre izolat-vs-concentrat-proteic.
// Fapte de produs: pure-isolate-2000g (ACTIVE), descriere + metafield-uri custom.ingrediente, custom.detalii_produs,
//   reviews.rating (4.79) / reviews.rating_count (14), citite prin Admin API pe 16.11.2026.
//   Eticheta NU declară lactoza separat și NU spune „fără lactoză”: scriem doar zaharurile din tabel (0,26 g / porție).
// Studii: toate din SURSE-PUBMED.md (Jäger 2017, Morton 2018, Tang 2009, Shaukat 2010); niciun studiu nou.
// Imaginea principală rămâne cea actuală (fără generare AI).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const pubmed = (pmid, text) => `<a href="https://pubmed.ncbi.nlm.nih.gov/${pmid}/" rel="noopener">${text}</a>`;
const REG = '<a href="https://eur-lex.europa.eu/eli/reg/2012/432/oj" rel="noopener">Regulamentul (UE) nr. 432/2012</a>';

const P = {
  handle: 'pure-isolate-2000g',
  title: 'Izolat proteic din zer Pure Isolate – 2 kg',
  img: 'https://cdn.shopify.com/s/files/1/0917/5138/3415/files/01_PRIMEPUREISOLATE_bourbonvanilla_2000g_front.jpg?v=1794828905',
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
    <li style="margin-bottom: 8px;">Izolatul proteic din zer este proteina din lapte filtrată suplimentar, cu mai multe proteine și mai puține grăsimi și zaharuri decât concentratul.</li>
    <li style="margin-bottom: 8px;">Pure Isolate are 87,0 g de proteine la 100 g și 23,5 g într-o porție de 27 g, conform etichetei.</li>
    <li style="margin-bottom: 8px;">O porție are 0,26 g de zaharuri și 0,26 g de grăsimi; produsul conține lapte (zer).</li>
    <li style="margin-bottom: 8px;">Proteinele contribuie la creșterea și la menținerea masei musculare; contează totalul de proteine din zi.</li>
  </ul>
</div>`;

const BODY = `<p><strong>Izolatul proteic din zer este o pudră obținută din zerul laptelui, filtrată suplimentar, astfel încât rămân mai multe proteine și foarte puține grăsimi și zaharuri.</strong> Proteina izolată din zer, pe scurt un izolat proteic, se folosește ca să completezi proteinele din zi. Pure Isolate, izolatul Prime, are 87,0 g de proteine la 100 g și 23,5 g într-o porție de 27 g.</p>

<h2>Cuprins</h2>
<ul>
  <li><a href="#ce-este">Ce este izolatul proteic din zer</a></li>
  <li><a href="#eticheta">Pure Isolate: ce scrie pe etichetă</a></li>
  <li><a href="#izolat-concentrat">Izolat sau concentrat proteic: diferența pe scurt</a></li>
  <li><a href="#proteine">Ce rol au proteinele și câte îți trebuie</a></li>
  <li><a href="#lactoza">Proteina din zer izolat și lactoza</a></li>
  <li><a href="#cum-il-iei">Cum folosești izolatul proteic Pure Isolate</a></li>
  <li><a href="#intrebari-frecvente">Întrebări frecvente</a></li>
</ul>

<h2 id="ce-este">Ce este izolatul proteic din zer</h2>
<p>Izolatul proteic din zer (în engleză, whey protein isolate) este forma cea mai filtrată a proteinei din zer. Zerul este lichidul care rămâne după ce laptele devine brânză; din el se obțin atât concentratul, cât și izolatul.</p>
<p>Diferența vine din filtrare. Concentratul păstrează mai multe grăsimi și mai multă lactoză, iar izolatul trece printr-o etapă în plus. Pe eticheta Pure Isolate, primul ingredient este „izolat proteic microfiltrat din zer”.</p>
<p>Când cineva caută „proteina izolată” sau „proteina din zer izolat”, de obicei vrea să afle exact asta: ce rămâne în pudră după filtrare. Răspunsul se citește în coloana „la 100 g” din tabelul nutrițional, nu în numele de pe cutie.</p>
<p>Proteina din zer se digeră repede. Un studiu pe bărbați tineri sănătoși a găsit că zerul a crescut sinteza proteinelor musculare mai mult decât cazeina și proteina din soia, în repaus și după antrenament (${pubmed('19589961', 'Tang și colab., 2009')}). Limita: studiul a folosit zer hidrolizat, nu izolat, și grupuri mici, de câte 6 persoane.</p>

<h2 id="eticheta">Pure Isolate: ce scrie pe etichetă</h2>
<p>Pure Isolate este izolatul proteic din zer al Prime Supplements: o cutie de 2 kg cu 74 de porții de 27 g, în 7 arome. Valorile de mai jos sunt copiate din tabelul nutrițional al produsului.</p>
${table(['Pure Isolate', 'O porție (27 g)', 'La 100 g'], [
  ['Proteine', '23,5 g', '87,0 g'],
  ['Carbohidrați, din care zaharuri', '0,26 g / 0,26 g', '0,96 g / 0,96 g'],
  ['Grăsimi', '0,26 g', '0,96 g'],
  ['Fibre', '0 g', '0 g'],
  ['Sodiu', '0,04 g', '0,14 g'],
  ['Valoare energetică', '97,3 kcal (406,8 kJ)', '360,4 kcal (1506,5 kJ)'],
  ['Digezyme® (complex enzimatic)', '40,5 mg', '150 mg'],
])}
<p>Ingredientele, în ordinea de pe etichetă: izolat proteic microfiltrat din zer, cacao (la aroma de ciocolată), arome, complex enzimatic Digezyme®, îndulcitori (sucraloză, acesulfam de potasiu), colorant carmin (la aroma de căpșuni). Alergen: lapte (zer).</p>
<p>Un calcul aproximativ: 74 de porții × 23,5 g înseamnă în jur de 1,74 kg de proteine în cutia de 2 kg. Ce mai verifici pe orice tub am explicat în <a href="/blogs/news/citesti-eticheta-unei-proteine-whey-verifici">cum citești eticheta unei proteine whey</a>.</p>

${productBox('Izolat proteic microfiltrat din zer: 23,5 g de proteine pe porția de 27 g, 0,26 g de zaharuri, 74 de porții, 7 arome.', 'Vezi Pure Isolate')}

<h2 id="izolat-concentrat">Izolat sau concentrat proteic: diferența pe scurt</h2>
<p>Izolatul și concentratul sunt aceeași proteină din zer, filtrată în grade diferite. Izolatul are, la 100 g, mai multe proteine și mai puține grăsimi și zaharuri.</p>
<ul>
  <li><strong>Pure Isolate (izolat):</strong> 87,0 g de proteine, 0,96 g de grăsimi și 0,96 g de zaharuri la 100 g; 97,3 kcal pe porția de 27 g.</li>
  <li><strong><a href="/products/prime-whey-2000g">Prime Whey (concentrat)</a>:</strong> în jur de 78–81,5 g de proteine la 100 g, în funcție de aromă, cu mai mulți carbohidrați și grăsimi; porție de 30 g.</li>
</ul>
<p>Comparația completă, cifră cu cifră, și calculul prețului pe gramul de proteină le găsești în <a href="/blogs/news/izolat-vs-concentrat-proteic">izolat vs concentrat proteic: merită diferența de preț?</a>. Aici rămânem la izolat.</p>

<h2 id="proteine">Ce rol au proteinele și câte îți trebuie</h2>
<p>Un izolat proteic este, înainte de toate, o cale comodă de a adăuga proteine în zi. Pure Isolate are un conținut ridicat de proteine, așa că poartă mențiunile de sănătate autorizate în UE pentru proteine, din ${REG}:</p>
<ul>
  <li>Proteinele contribuie la creșterea masei musculare.</li>
  <li>Proteinele contribuie la menținerea masei musculare.</li>
  <li>Proteinele contribuie la menținerea sănătății sistemului osos.</li>
</ul>
<p>Poziția oficială a International Society of Sports Nutrition recomandă, pentru majoritatea celor care se antrenează, 1,4–2,0 g de proteine pe kilogram pe zi, în porții de 20–40 g la 3–4 ore (${pubmed('28642676', 'Jäger și colab., 2017')}). O porție de Pure Isolate, cu 23,5 g, intră în acest interval.</p>
<p>O meta-analiză pe 49 de studii și 1.863 de participanți a găsit că suplimentele proteice adaugă un câștig mic, dar măsurabil, la forță și la masa slabă, la cei care fac antrenament de forță; peste aproximativ 1,62 g/kg pe zi câștigul nu a mai crescut (${pubmed('28698222', 'Morton și colab., 2018')}). Efectul a fost mai mic la persoanele mai în vârstă, iar studiile au folosit proteine diferite, nu doar izolat.</p>
<p>La sportivii cu care lucrăm, prima întrebare nu e „ce formă?”, ci „câte grame ai mâncat azi?”. Calculul pe greutatea ta îl faci cu ghidul <a href="/blogs/news/cata-proteina-trebuie-zi-calcul-greutate-obiectiv">câtă proteină pe zi</a>.</p>

<h2 id="lactoza">Proteina din zer izolat și lactoza</h2>
<p>Izolatul proteic din zer are puțină lactoză, dar eticheta Pure Isolate nu poartă mențiunea „fără lactoză” și nu declară separat cantitatea de lactoză. Ce arată tabelul: 0,26 g de zaharuri într-o porție de 27 g, iar lactoza, zahărul din lapte, face parte din zaharuri.</p>
<p>O recenzie sistematică a găsit că majoritatea adulților cu intoleranță la lactoză tolerează 12–15 g de lactoză, cam cât are o cană de lapte (${pubmed('20404262', 'Shaukat și colab., 2010')}). Limita: e o medie din studii, iar toleranța diferă de la om la om.</p>
<p>Produsul conține lapte (zer), deci nu este potrivit dacă ai alergie la proteinele din lapte. Dacă ai intoleranță, întreabă medicul; detalii în <a href="/blogs/news/izolat-proteic-intoleranta-lactoza-trebuie-sa-stii">izolat proteic și intoleranța la lactoză</a>.</p>

<h2 id="cum-il-iei">Cum folosești izolatul proteic Pure Isolate</h2>
<p>Pure Isolate se ia ca o porție de 27 g amestecată cu apă sau lapte, după antrenament sau pe parcursul zilei, conform etichetei. Câte porții îți trebuie depinde de cât de departe ești de totalul zilnic de proteine.</p>
<ul>
  <li><strong>Porția:</strong> 27 g = 23,5 g de proteine și 97,3 kcal.</li>
  <li><strong>Momentul:</strong> după antrenament sau între mese; poziția ISSN spune că momentul exact ține mai ales de toleranța fiecăruia (${pubmed('28642676', 'Jäger și colab., 2017')}).</li>
  <li><strong>Cum se amestecă:</strong> pune întâi lichidul, apoi pudra; cu lapte, adaugi și proteinele și caloriile laptelui.</li>
  <li><strong>Cât ține o cutie:</strong> 74 de porții; la o porție pe zi, 74 de zile.</li>
  <li><strong>Arome:</strong> Chocolate, Bourbon Vanilla, Salted Caramel, Strawberry, Strawberry Cheesecake, White Chocolate Raspberry, Caffè Latte.</li>
  <li><strong>Părerea clienților:</strong> nota 4,79 din 5, din 14 recenzii pe pagina produsului.</li>
</ul>
<p>Idei de folosit pudra și în bucătărie găsești în <a href="/blogs/news/gatit-cu-pudra-proteica">cum gătești cu pudră proteică</a>. Celelalte proteine Prime sunt în colecția <a href="/collections/pudra-proteica">Pudre proteice</a>.</p>

${productBox('Izolat proteic din zer Pure Isolate, cutie de 2 kg: o porție de 27 g cu apă sau lapte, 74 de porții. Livrare gratuită la comenzile de peste 300 de lei.', 'Comandă Pure Isolate')}

<h2 id="intrebari-frecvente">Întrebări frecvente</h2>
<h3>Ce este proteina izolată?</h3>
<p>Proteina izolată din zer este zerul din lapte filtrat suplimentar, ca să rămână cât mai multe proteine și cât mai puține grăsimi și zaharuri. La Pure Isolate, asta înseamnă 87,0 g de proteine la 100 g, conform etichetei.</p>
<h3>Care este diferența dintre izolat și concentrat proteic?</h3>
<p>Izolatul trece printr-o filtrare în plus față de concentrat, deci are mai multe proteine și mai puține grăsimi și zaharuri la 100 g. Comparația completă dintre Pure Isolate și Prime Whey este în <a href="/blogs/news/izolat-vs-concentrat-proteic">ghidul izolat vs concentrat</a>.</p>
<h3>Izolatul proteic din zer conține lactoză?</h3>
<p>Conține foarte puțin: o porție de Pure Isolate are 0,26 g de zaharuri, iar lactoza intră în această cifră. Eticheta nu spune „fără lactoză”, iar produsul conține lapte (zer); la intoleranță sau alergie, întreabă medicul.</p>
<h3>Cât izolat proteic se ia pe zi?</h3>
<p>Eticheta Pure Isolate indică o porție de 27 g, după antrenament sau pe parcursul zilei. Numărul de porții îl stabilești după totalul de proteine din dietă; ținta uzuală la cei care se antrenează este 1,4–2,0 g/kg pe zi (${pubmed('28642676', 'Jäger și colab., 2017')}).</p>
<h3>Izolatul proteic se poate lua cu lapte?</h3>
<p>Da. Eticheta spune apă sau lapte. Cu apă rămâi la valorile din tabel; cu lapte adaugi proteinele, zaharurile și caloriile laptelui.</p>`;

const SOURCES = `<h2 id="surse">Surse</h2>
<p>Lucrările de mai jos sunt citate în text; fiecare link duce la rezumatul de pe PubMed (Biblioteca Națională de Medicină a SUA) sau la textul oficial al legislației UE.</p>
<ol style="padding-left: 20px; color: #334155;">
  <li style="margin-bottom: 8px;">Jäger R și colab. International Society of Sports Nutrition Position Stand: protein and exercise. J Int Soc Sports Nutr. 2017;14:20. <a href="https://pubmed.ncbi.nlm.nih.gov/28642676/" rel="noopener">PubMed 28642676</a> · <a href="https://doi.org/10.1186/s12970-017-0177-8" rel="noopener">doi:10.1186/s12970-017-0177-8</a></li>
  <li style="margin-bottom: 8px;">Morton RW și colab. A systematic review, meta-analysis and meta-regression of the effect of protein supplementation on resistance training-induced gains in muscle mass and strength in healthy adults. Br J Sports Med. 2018;52(6):376-384. <a href="https://pubmed.ncbi.nlm.nih.gov/28698222/" rel="noopener">PubMed 28698222</a> · <a href="https://doi.org/10.1136/bjsports-2017-097608" rel="noopener">doi:10.1136/bjsports-2017-097608</a></li>
  <li style="margin-bottom: 8px;">Tang JE și colab. Ingestion of whey hydrolysate, casein, or soy protein isolate: effects on mixed muscle protein synthesis at rest and following resistance exercise in young men. J Appl Physiol. 2009;107(3):987-92. <a href="https://pubmed.ncbi.nlm.nih.gov/19589961/" rel="noopener">PubMed 19589961</a> · <a href="https://doi.org/10.1152/japplphysiol.00076.2009" rel="noopener">doi:10.1152/japplphysiol.00076.2009</a></li>
  <li style="margin-bottom: 8px;">Shaukat A și colab. Systematic review: effective management strategies for lactose intolerance. Ann Intern Med. 2010;152(12):797-803. <a href="https://pubmed.ncbi.nlm.nih.gov/20404262/" rel="noopener">PubMed 20404262</a> · <a href="https://doi.org/10.7326/0003-4819-152-12-201006150-00241" rel="noopener">doi:10.7326/0003-4819-152-12-201006150-00241</a></li>
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
  { handle: 'izolat-vs-concentrat-proteic', title: 'Izolat vs concentrat proteic: merită diferența de preț?', img: 'https://cdn.shopify.com/s/files/1/0917/5138/3415/articles/blog-izolat-vs-concentrat-proteic.jpg?v=1794568498', summary: 'Pure Isolate și Prime Whey comparate cifră cu cifră: proteine, grăsimi, zaharuri și porții.' },
  { handle: 'izolat-proteic-intoleranta-lactoza-trebuie-sa-stii', title: 'Izolat proteic și intoleranța la lactoză: ce trebuie să știi', img: 'https://cdn.shopify.com/s/files/1/0917/5138/3415/articles/blog-izolat-proteic-intoleranta-lactoza-trebuie-sa-stii.jpg?v=1792383000', summary: 'Ce arată eticheta despre lactoză și când întrebi medicul înainte de prima porție.' },
  { handle: 'citesti-eticheta-unei-proteine-whey-verifici', title: 'Cum citești eticheta unei proteine whey: ce verifici', img: 'https://cdn.shopify.com/s/files/1/0917/5138/3415/articles/blog-citesti-eticheta-unei-proteine-whey-verifici-din-sedinta-foto-sala-ramat-gantera-prime-whey-2.jpg?v=1792059948', summary: 'Proteinele la 100 g, ordinea ingredientelor, porția și alergenii, în patru pași.' },
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
  handle: 'izolat-proteic-beneficii',
  id: 'gid://shopify/Article/1023360565623',
  title: 'Izolat proteic din zer: ce este și ce scrie pe etichetă',
  seoTitle: 'Izolat proteic din zer: ce este și cum îl folosești',
  seoDesc: 'Izolat proteic din zer: ce este proteina izolată, cum se obține, valorile Pure Isolate (87 g proteine la 100 g), lactoza și cum îl iei zilnic.',
  summary: 'Izolatul proteic din zer este proteina din lapte filtrată suplimentar, cu mai multe proteine și mai puține grăsimi și zaharuri decât concentratul. Pure Isolate are 87,0 g de proteine la 100 g și 23,5 g într-o porție de 27 g, conform etichetei.',
  keyword: 'izolat proteic',
  imageAlt: 'Izolat proteic din zer: recipient alb de pudră, lingurițe-dozator și un shake proteic pe un blat de bucătărie',
};

const html = [SHORT, BODY, SOURCES, DISCLAIMER, AUTHOR, related].join('\n\n');
fs.writeFileSync(path.join(dir, `${META.handle}.html`), html);
fs.writeFileSync(path.join(dir, `${META.handle}.meta.json`), JSON.stringify(META, null, 1));

const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
const FORBIDDEN = ['vindec', 'tratează', 'previne boala', 'detox', 'arde grăsim', 'garantat', 'fără gluten', '<h1', '<script', 'target="_blank"', 'somn', 'stres ', 'refacere', 'rezultate', 'face efect', 'energie', 'sursă de', 'slăb', 'amino spiking', 'glicin', 'lizin'];
console.log(`cuvinte ${text.split(' ').length} · title ${META.title.length} · seoTitle ${META.seoTitle.length} · seoDesc ${META.seoDesc.length} · interzise: ${FORBIDDEN.filter(w => html.toLowerCase().includes(w)).join(',') || '-'}`);
