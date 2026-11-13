// Conținutul celor 5 articole rescrise pe 13.11.2026 (lot de probă aprobat de proprietar).
// Fapte de produs: doar din metafield-urile produselor (citite prin Admin API pe 13.11.2026).
// Studii: verificate pe PubMed (PMID + DOI) în aceeași zi.

const REG432 = { cite: 'Regulamentul (UE) nr. 432/2012 al Comisiei – lista mențiunilor de sănătate permise pentru alimente.', url: 'https://eur-lex.europa.eu/eli/reg/2012/432/oj', label: 'EUR-Lex' };
const S = {
  brosnan: { cite: 'Brosnan JT, Brosnan ME. Creatine: endogenous metabolite, dietary, and therapeutic supplement. Annu Rev Nutr. 2007;27:241-61.', pmid: '17430086', doi: '10.1146/annurev.nutr.27.061406.093621' },
  kreider: { cite: 'Kreider RB și colab. International Society of Sports Nutrition position stand: safety and efficacy of creatine supplementation in exercise, sport, and medicine. J Int Soc Sports Nutr. 2017;14:18.', pmid: '28615996', doi: '10.1186/s12970-017-0173-z' },
  antonio: { cite: 'Antonio J și colab. Common questions and misconceptions about creatine supplementation: what does the scientific evidence really show? J Int Soc Sports Nutr. 2021;18(1):13.', pmid: '33557850', doi: '10.1186/s12970-021-00412-w' },
  gleeson: { cite: 'Gleeson M. Dosing and efficacy of glutamine supplementation in human exercise and sport training. J Nutr. 2008;138(10):2045S-2049S.', pmid: '18806122', doi: '10.1093/jn/138.10.2045S' },
  cruzat: { cite: 'Cruzat V și colab. Glutamine: Metabolism and Immune Function, Supplementation and Clinical Translation. Nutrients. 2018;10(11):1564.', pmid: '30360490', doi: '10.3390/nu10111564' },
  dawson: { cite: 'Dawson-Hughes B și colab. Dietary fat increases vitamin D-3 absorption. J Acad Nutr Diet. 2015;115(2):225-230.', pmid: '25441954', doi: '10.1016/j.jand.2014.09.014' },
  mulligan: { cite: 'Mulligan GB, Licata A. Taking vitamin D with the largest meal improves absorption and results in higher serum levels of 25-hydroxyvitamin D. J Bone Miner Res. 2010;25(4):928-30.', pmid: '20200983', doi: '10.1002/jbmr.67' },
  schurgers: { cite: 'Schurgers LJ și colab. Vitamin K-containing dietary supplements: comparison of synthetic vitamin K1 and natto-derived menaquinone-7. Blood. 2007;109(8):3279-83.', pmid: '17158229', doi: '10.1182/blood-2006-08-040709' },
  jager: { cite: 'Jäger R și colab. International Society of Sports Nutrition Position Stand: protein and exercise. J Int Soc Sports Nutr. 2017;14:20.', pmid: '28642676', doi: '10.1186/s12970-017-0177-8' },
  morton: { cite: 'Morton RW și colab. A systematic review, meta-analysis and meta-regression of the effect of protein supplementation on resistance training-induced gains in muscle mass and strength in healthy adults. Br J Sports Med. 2018;52(6):376-384.', pmid: '28698222', doi: '10.1136/bjsports-2017-097608' },
  tang: { cite: 'Tang JE și colab. Ingestion of whey hydrolysate, casein, or soy protein isolate: effects on mixed muscle protein synthesis at rest and following resistance exercise in young men. J Appl Physiol. 2009;107(3):987-92.', pmid: '19589961', doi: '10.1152/japplphysiol.00076.2009' },
  shaukat: { cite: 'Shaukat A și colab. Systematic review: effective management strategies for lactose intolerance. Ann Intern Med. 2010;152(12):797-803.', pmid: '20404262', doi: '10.7326/0003-4819-152-12-201006150-00241' },
  pardo: { cite: 'Pardo MR și colab. Bioavailability of magnesium food supplements: A systematic review. Nutrition. 2021;89:111294.', pmid: '34111673', doi: '10.1016/j.nut.2021.111294' },
  nielsen: { cite: 'Nielsen FH, Lukaski HC. Update on the relationship between magnesium and exercise. Magnes Res. 2006;19(3):180-9.', pmid: '17172008' },
  volpe: { cite: 'Volpe SL. Magnesium and the Athlete. Curr Sports Med Rep. 2015;14(4):279-83.', pmid: '26166051', doi: '10.1249/JSR.0000000000000178' },
};

const IMG = {
  creatina300: 'https://cdn.shopify.com/s/files/1/0917/5138/3415/files/ALLMERCH-CREATINE300g1.jpg?v=1772583366',
  creapure: 'https://cdn.shopify.com/s/files/1/0917/5138/3415/files/01_PRIME_CREATINE_Creapure_500g_front_508a0239-fe0e-4167-9d15-12bc1a93fc8c.jpg?v=1749666722',
  glutamin: 'https://cdn.shopify.com/s/files/1/0917/5138/3415/files/01_RECOVERYGLUTAMIN_blueberry_500g_front.jpg?v=1749666716',
  d3k2: 'https://cdn.shopify.com/s/files/1/0917/5138/3415/files/01_D3_K2_80cabs_front.jpg?v=1749666736',
  magneziu: 'https://cdn.shopify.com/s/files/1/0917/5138/3415/files/01_MAGNEZIU_80cabs_front.jpg?v=1749666723',
  isolate: 'https://cdn.shopify.com/s/files/1/0917/5138/3415/files/01_PRIMEPUREISOLATE_bourbonvanilla_2000g_front.jpg?v=1792077844',
  whey2: 'https://cdn.shopify.com/s/files/1/0917/5138/3415/files/ALL_MERCH_3_03.jpg?v=1792077790',
};
const A = 'https://cdn.shopify.com/s/files/1/0917/5138/3415/articles/';
const REL = {
  laCeAjutaCreatina: { handle: 'la-ce-ajuta-creatina-mentiunea-autorizata', title: 'La ce ajută creatina: mențiunea autorizată în UE, explicată', img: A + 'blog-la-ce-ajuta-creatina-mentiunea-autorizata.jpg?v=1792210169', summary: 'Ce spune exact mențiunea autorizată pentru creatină și în ce condiții se aplică.' },
  creatinina: { handle: 'creatina-sau-creatinina-diferenta', title: 'Creatină sau creatinină: care este diferența', img: A + 'blog-creatina-sau-creatinina-diferenta.jpg?v=1792665232', summary: 'Două cuvinte asemănătoare, două lucruri diferite: ce măsoară analizele și ce iei ca supliment.' },
  glutKyowa: { handle: 'glutamina-kyowa-inseamna-fermentatia-puritatea', title: 'Glutamina Kyowa: ce înseamnă fermentația și puritatea', img: A + 'blog-glutamina-kyowa-inseamna-fermentatia-puritatea.jpg?v=1792665366', summary: 'Cum se obține L-glutamina Kyowa® și ce verifici pe eticheta unei glutamine.' },
  glutAnduranta: { handle: 'glutamina-alergare-sporturi-anduranta', title: 'Glutamina pentru alergare și sporturi de anduranță', img: A + 'blog-glutamina-alergare-sporturi-anduranta-din-sedinta-foto-plaja-shaker-prime-1.jpg?v=1794287026', summary: 'Ce întreabă alergătorii despre glutamină și cum o folosești conform etichetei.' },
  vitDDoza: { handle: 'cata-vitamina-d-zi-doze-analize-greseli', title: 'Câtă vitamina D pe zi: doze, analize și greșeli', img: A + '01_D3_K2_80cabs_front.jpg?v=1794027833', summary: 'Doza de pe etichetă, analizele de sânge și greșelile frecvente la vitamina D.' },
  vitDIarna: { handle: 'vitamina-d-iarna-scade-mentii', title: 'Vitamina D iarna: de ce scade și cum o menții', img: A + 'blog-vitamina-d-iarna-scade-mentii.jpg?v=1792665296', summary: 'De ce scade vitamina D în lunile reci și ce poți face concret.' },
  izolatLactoza: { handle: 'izolat-proteic-intoleranta-lactoza-trebuie-sa-stii', title: 'Izolat proteic și intoleranța la lactoză: ce trebuie să știi', img: A + 'blog-izolat-proteic-intoleranta-lactoza-trebuie-sa-stii.jpg?v=1792383000', summary: 'Cât contează lactoza dintr-o porție de proteină și ce citești pe etichetă.' },
  cataProteina: { handle: 'cata-proteina-trebuie-zi-calcul-greutate-obiectiv', title: 'Câtă proteină pe zi: calcul pe greutate și obiectiv', img: A + 'blog-cata-proteina-pe-zi-calcul.jpg?v=1791916897', summary: 'Calculul simplu al necesarului de proteine, în funcție de greutate și obiectiv.' },
  magSportivi: { handle: 'magneziu-sportivi-cat-iei-eticheta', title: 'Magneziul la sportivi: cât iei și ce verifici pe etichetă', img: A + 'blog-magneziu-sportivi-cat-iei-eticheta.jpg?v=1792695730', summary: 'Cât magneziu are o doză, ce înseamnă VNR și ce verifici pe flacon.' },
  magDeficit: { handle: 'semne-deficit-magneziu-sa-urmaresti', title: 'Semne de deficit de magneziu: ce să urmărești', img: A + '01_MAGNEZIU_80cabs_front.jpg?v=1794459759', summary: 'Ce poate indica un aport scăzut de magneziu și când mergi la medic.' },
};

export const ARTICLES = [
// ───────────────────────────── 1. CREATINA ─────────────────────────────
{
  handle: 'ce-este-creatina', id: 'gid://shopify/Article/1023897895287',
  title: 'Ce este creatina: definiție, surse, doză și mituri',
  seoTitle: 'Ce este creatina: definiție, doză și mituri explicate',
  seoDesc: 'Ce este creatina: compusul pe care corpul îl produce din 3 aminoacizi, cât primești din alimente, doza de 3–5 g pe zi și ce spun studiile despre mituri.',
  summary: 'Creatina este un compus pe care organismul îl produce din aminoacizii glicină, arginină și metionină și pe care îl primește din carne și pește. Ca supliment se folosește creatina monohidrată, 3–5 g pe zi; mențiunea autorizată în UE se aplică la un consum zilnic de 3 g.',
  imageAlt: 'Ce este creatina: tubul Prime Creatine made of Creapure® pe podeaua unei săli de forță, lângă o haltera, un shaker negru și o măsură cu pudră albă',
  image: 'blog-ce-este-creatina.jpg',
  watch: ['masă musculară', 'energie', 'refacere', 'sigur', 'rezultate'],
  short: [
    'Creatina este un compus natural: corpul o produce din trei aminoacizi și o primește din carne și pește.',
    'Mențiunea autorizată în UE: crește performanța fizică în eforturi succesive, scurte și intense, la 3 g pe zi.',
    'Forma cea mai studiată este creatina monohidrată; doza uzuală este 3–5 g pe zi, în fiecare zi.',
    'Cele mai frecvente mituri (apă, rinichi, păr) au fost analizate într-o recenzie din 2021 – rezumatul e mai jos.',
  ],
  body: ({ pubmed, productBox, table }) => `<p><strong>Creatina este un compus azotat pe care organismul îl produce singur, din aminoacizii glicină, arginină și metionină, și pe care îl primește din alimente precum carnea și peștele.</strong> Aproape toată creatina din corp se află în mușchi. Ca supliment alimentar se folosește de obicei creatina monohidrată, 3–5 g pe zi, iar mențiunea de sănătate autorizată în UE se aplică la un consum zilnic de 3 g.</p>

<h2>Cuprins</h2>
<ul>
  <li><a href="#ce-este">Ce este creatina, pe scurt</a></li>
  <li><a href="#mentiunea-ue">Ce spune mențiunea autorizată în UE</a></li>
  <li><a href="#alimente">Creatina din alimente și creatina ca supliment</a></li>
  <li><a href="#forme">Creatina monohidrată și celelalte forme</a></li>
  <li><a href="#cum-o-folosesti">Cum folosești creatina: doza de pe etichetă</a></li>
  <li><a href="#mituri">Mituri despre creatină: ce au găsit cercetătorii</a></li>
  <li><a href="#intrebari-frecvente">Întrebări frecvente</a></li>
</ul>

<h2 id="ce-este">Ce este creatina, pe scurt</h2>
<p>Creatina este o substanță pe care ficatul, rinichii și pancreasul o sintetizează zilnic, în mod normal, din trei aminoacizi. În mușchi, o parte din ea se leagă de fosfat și formează fosfocreatina, o rezervă pe care celula o folosește pentru a reface rapid ATP-ul, molecula care alimentează contracția musculară.</p>
<p>O recenzie publicată în <em>Annual Review of Nutrition</em> arată că o parte din creatină se transformă zilnic, spontan, în creatinină, care se elimină prin urină. De aceea creatina trebuie înlocuită permanent, din producția proprie și din alimentație (${pubmed('17430086', 'Brosnan și Brosnan, 2007')}). Creatinina este cea pe care o vezi pe buletinul de analize; diferența dintre cele două o explicăm separat, în ghidul <a href="/blogs/news/creatina-sau-creatinina-diferenta">creatină sau creatinină</a>.</p>

<h2 id="mentiunea-ue">Ce spune mențiunea autorizată în UE</h2>
<p>În Uniunea Europeană, creatina are o singură mențiune de sănătate autorizată pentru adulții care fac efort: <strong>„Creatina crește performanța fizică în eforturi succesive din timpul exercițiilor fizice de scurtă durată și de mare intensitate.”</strong> Efectul benefic se obține în condițiile unui consum zilnic de 3 g de creatină (${'<a href="https://eur-lex.europa.eu/eli/reg/2012/432/oj" rel="noopener">Regulamentul (UE) nr. 432/2012</a>'}).</p>
<p>„Eforturi succesive, scurte și intense” înseamnă, practic, seturi repetate la sală, sprinturi sau sărituri. Ce înseamnă fiecare cuvânt din mențiune și de ce contează condiția de 3 g am detaliat în articolul <a href="/blogs/news/la-ce-ajuta-creatina-mentiunea-autorizata">la ce ajută creatina</a>.</p>

${productBox({ handle: 'creatina-monohidrat-micronized-300g-fara-aroma', img: IMG.creatina300, title: 'Creatină monohidrată micronizată fără aromă, 300 g', line: 'Un singur ingredient, creatină monohidrată (100%), pulbere micronizată fără aromă: 5000 mg pe porția de 5 g, 60 de porții în tub.', cta: 'Vezi produsul' })}

<h2 id="alimente">Creatina din alimente și creatina ca supliment</h2>
<p>Creatina din alimentație vine aproape în întregime din produse de origine animală, în special carne și pește. Aceeași recenzie notează că vegetarienii nu primesc aproape deloc creatină din dietă și se bazează doar pe producția proprie (${pubmed('17430086', 'Brosnan și Brosnan, 2007')}).</p>
<p>Ca să ajungi la cele 3 g pe zi din mențiunea UE doar din mâncare, ar trebui să mănânci zilnic cantități mari de carne sau pește. De aici vine rolul suplimentului: o porție măsurată, fără calorii, pe care o amesteci în apă.</p>

<h2 id="forme">Creatina monohidrată și celelalte forme</h2>
<p>Creatina monohidrată este forma folosită în marea majoritate a studiilor. Poziția oficială a International Society of Sports Nutrition (ISSN) din 2017 o descrie drept forma de referință și trece în revistă studii de siguranță pe termen scurt și lung la persoane sănătoase (${pubmed('28615996', 'Kreider și colab., 2017')}).</p>
<p>O recenzie din 2021, scrisă de 11 cercetători, a analizat și întrebarea „sunt alte forme mai bune decât monohidrata?” și a concluzionat că datele nu arată un avantaj al formelor mai noi față de monohidrată (${pubmed('33557850', 'Antonio și colab., 2021')}).</p>
${table(['Ce compari', 'Creatină monohidrată micronizată 300 g', 'Creatină Creapure® 300 g / 500 g'], [
  ['Ingredient', 'creatină monohidrată (100%)', 'creatină monohidrată (Creapure®)'],
  ['Porție de pe etichetă', '5 g (½ măsură)', '5 g'],
  ['Porții pe tub', '60', '60 (300 g) / 100 (500 g)'],
  ['Arome, îndulcitori, coloranți', 'nu', 'nu'],
  ['Particularitate', 'pulbere micronizată, „Unflavoured”', 'marcă de ingredient declarată pe tub: „made of Creapure®”'],
])}
<p>Diferența dintre Creapure® și o monohidrată obișnuită ține de proveniența ingredientului, nu de molecula în sine; o explicăm pe larg în <a href="/blogs/news/creapure-vs-creatina-monohidrata-obisnuita">Creapure® vs creatină monohidrată obișnuită</a>.</p>

<h2 id="cum-o-folosesti">Cum folosești creatina: doza de pe etichetă</h2>
<p>Doza zilnică de pe etichetele Prime este de 3–5 g de creatină, în fiecare zi, pentru adulții care fac antrenamente de mare intensitate. Amesteci porția de 5 g în 300–500 ml de apă sau o adaugi în shake-ul proteic și bei suficiente lichide pe parcursul zilei.</p>
<ul>
  <li><strong>Faza de încărcare (opțională):</strong> eticheta creatinei micronizate dă formula greutate corporală (kg) / 3 = grame pe zi, timp de 5–15 zile, apoi ½–1½ măsuri pe zi. De exemplu, la 75 kg ar ieși 25 g pe zi, împărțite în mai multe prize (calcul aproximativ).</li>
  <li><strong>Fără încărcare:</strong> recenzia din 2021 notează că faza de încărcare nu este obligatorie; cu 3–5 g pe zi, rezervele din mușchi cresc și ele, doar mai lent (${pubmed('33557850', 'Antonio și colab., 2021')}).</li>
  <li><strong>Momentul zilei:</strong> contează mai mult regularitatea decât ora. Detalii în ghidul <a href="/blogs/news/cand-se-ia-creatina-inainte-sau-dupa-antrenament">când se ia creatina</a>.</li>
</ul>
<p>La sportivii cu care lucrăm recomandăm varianta simplă: 5 g pe zi, la aceeași oră, în zilele cu și fără antrenament. Un tub de 300 g ține astfel 60 de zile.</p>

<h2 id="mituri">Mituri despre creatină: ce au găsit cercetătorii</h2>
<p>Recenzia din 2021 a luat pe rând 12 întrebări frecvente despre creatină și a răspuns pe baza studiilor publicate (${pubmed('33557850', 'Antonio și colab., 2021')}). Iată pe scurt ce au găsit autorii, la persoane sănătoase și la dozele recomandate:</p>
<ul>
  <li><strong>„Creatina reține apă sub piele.”</strong> În primele zile poate crește puțin greutatea, pentru că mușchii rețin mai multă apă în interiorul celulelor; studiile pe termen lung nu au arătat o retenție de apă care să persiste.</li>
  <li><strong>„Creatina este un steroid anabolizant.”</strong> Nu. Creatina este un compus pe care corpul îl produce singur și pe care îl primești din alimente; nu are structura și nici modul de acțiune al unui steroid.</li>
  <li><strong>„Creatina strică rinichii.”</strong> La persoanele sănătoase, studiile analizate nu au găsit afectarea funcției renale la dozele recomandate. Dacă ai o afecțiune renală sau iei medicamente, discută cu medicul înainte.</li>
  <li><strong>„Creatina face să cadă părul.”</strong> Ipoteza vine dintr-un singur studiu, care a măsurat un hormon, nu căderea părului; autorii recenziei spun că datele actuale nu susțin această legătură.</li>
  <li><strong>„Creatina e doar pentru bărbați.”</strong> Nu; femeile au fost incluse în multe studii. Am scris separat despre <a href="/blogs/news/creatina-femei-beneficii-doza-mituri">creatina pentru femei</a>.</li>
</ul>
<p>Etichetele Prime recomandă creatina doar adulților și nu o recomandă în sarcină și alăptare; pentru orice afecțiune medicală, întreabă întâi medicul.</p>

${productBox({ handle: 'creatina-creapure', img: IMG.creapure, title: 'Creatină Creapure® monohidrată', line: 'Un singur ingredient, creatină monohidrată Creapure®, fără arome sau îndulcitori; tub de 300 g (60 de porții) sau 500 g (100 de porții).', cta: 'Comandă Creapure®' })}

<h2 id="intrebari-frecvente">Întrebări frecvente</h2>
<h3>Se ia creatina și în zilele fără antrenament?</h3>
<p>Da. Eticheta indică o doză zilnică, nu o doză pe antrenament, iar mențiunea UE se referă la un consum zilnic de 3 g. În zilele libere o iei la o masă sau dimineața, la aceeași oră.</p>
<h3>Este obligatorie faza de încărcare la creatină?</h3>
<p>Nu. Încărcarea (după formula de pe etichetă) umple mai repede rezervele din mușchi, dar și 3–5 g pe zi ajung la același nivel, în câteva săptămâni. Alegi varianta care ți se pare mai simplu de urmat.</p>
<h3>Creatina îngrașă?</h3>
<p>Creatina nu are calorii la porție. Creșterea de greutate din primele zile vine din apa reținută în mușchi, nu din grăsime, conform recenziei din 2021 citate mai sus.</p>
<h3>Pot amesteca creatina cu proteina?</h3>
<p>Da, cele două se pot pune în același shake; nu se influențează una pe alta. Am explicat combinația în articolul <a href="/blogs/news/creatina-si-proteina-impreuna">creatina și proteina împreună</a>.</p>
<h3>Ce creatină aleg ca începător?</h3>
<p>O creatină monohidrată cu un singur ingredient, fără arome. Verifici pe etichetă lista de ingrediente, porția (5 g) și numărul de porții; restul ține de buget și de preferința pentru Creapure®.</p>

<p>Toate produsele cu creatină le găsești în colecția <a href="/collections/creatina">Creatină</a>.</p>`,
  sources: [S.brosnan, S.kreider, S.antonio, REG432],
  related: [REL.laCeAjutaCreatina, REL.creatinina],
},

// ───────────────────────────── 2. GLUTAMINA ─────────────────────────────
{
  handle: 'cand-se-ia-glutamina', id: 'gid://shopify/Article/1024009961847',
  title: 'Când se ia glutamina: dimineața, seara sau după antrenament',
  seoTitle: 'Când se ia glutamina: dimineața, seara sau după sală',
  seoDesc: 'Când se ia glutamina: ce spune eticheta Recovery Glutamin Kyowa®, cât pui într-o porție, cu ce o amesteci și ce au găsit studiile despre glutamină.',
  summary: 'Eticheta Recovery Glutamin nu fixează o oră: recomandă o singură porție pe zi, o măsură (4 g la varianta Simplu, cu 4000 mg de L-glutamină Kyowa®) amestecată cu 200 ml de apă. Cei mai mulți o iau după antrenament sau seara, ca să nu uite.',
  imageAlt: 'Când se ia glutamina: tubul Recovery Glutamin Blueberry pe un zid de piatră lângă o alee de alergare, cu un shaker negru și pantofi de alergare, la răsărit',
  image: 'blog-cand-se-ia-glutamina.jpg',
  watch: ['refacere', 'recuperare', 'imunitate', 'imunitar', 'ficat', 'rezultate', 'face efect'],
  short: [
    'Eticheta nu fixează ora: o porție pe zi, o măsură în 200 ml de apă.',
    'Varianta Simplu are 4 g pe măsură (4000 mg L-glutamină Kyowa®); aromele au 5 g pe măsură, tot cu 4000 mg.',
    'În practică, momentul ales e cel pe care îl poți respecta zilnic: după antrenament, seara sau dimineața.',
    'În UE nu există nicio mențiune de sănătate autorizată pentru glutamină; o recenzie din 2008 rezumă ce s-a studiat.',
  ],
  body: ({ pubmed, productBox, table }) => `<p><strong>Glutamina se poate lua dimineața, seara sau după antrenament: eticheta Recovery Glutamin nu fixează o oră, ci o singură porție pe zi.</strong> O porție înseamnă o măsură amestecată cu 200 ml de apă: 4 g la varianta Simplu, adică 4000 mg de L-glutamină Kyowa®. Cei mai mulți sportivi o leagă de un moment fix, ca s-o ia zilnic.</p>

<h2>Cuprins</h2>
<ul>
  <li><a href="#ce-este">Ce este glutamina</a></li>
  <li><a href="#cand">Când se ia glutamina: variantele practice</a></li>
  <li><a href="#cum-o-folosesti">Cum folosești Recovery Glutamin: doza de pe etichetă</a></li>
  <li><a href="#ce-spun-studiile">Ce au studiat cercetătorii despre glutamină</a></li>
  <li><a href="#cui-nu">Cui nu i se recomandă</a></li>
  <li><a href="#intrebari-frecvente">Întrebări frecvente</a></li>
</ul>

<h2 id="ce-este">Ce este glutamina</h2>
<p>Glutamina este un aminoacid neesențial, adică unul pe care organismul îl poate produce singur. O recenzie din 2018 o descrie drept cel mai abundent aminoacid din corp; mai multe organe, printre care mușchii scheletici, o produc și o eliberează în sânge (${pubmed('30360490', 'Cruzat și colab., 2018')}).</p>
<p>Glutamina vine și din mâncare: orice aliment bogat în proteine o conține. O recenzie din <em>Journal of Nutrition</em> notează că sportivii care mănâncă multe proteine și folosesc pudre proteice au deja un aport ridicat de glutamină din alimentație (${pubmed('18806122', 'Gleeson, 2008')}).</p>

<h2 id="cand">Când se ia glutamina: variantele practice</h2>
<p>Pentru glutamină nu există o oră „corectă” stabilită de etichetă sau de un ghid oficial. Contează să iei porția zilnică, în fiecare zi, fără să depășești doza recomandată.</p>
${table(['Momentul', 'Cum arată în practică', 'Pentru cine e comod'], [
  ['După antrenament', 'măsura în 200 ml de apă, în shaker, imediat după sală', 'cei care se antrenează zilnic și au deja shakerul la ei'],
  ['Seara', 'o porție după cină, la aceeași oră', 'cei cu program de antrenament variabil'],
  ['Dimineața', 'o porție la micul dejun, lângă celelalte suplimente', 'cei care își iau toate suplimentele dimineața'],
  ['În zilele fără antrenament', 'la ora obișnuită, aceeași porție', 'toți: doza de pe etichetă e zilnică'],
])}
<p>La sportivii cu care lucrăm vedem că rutina se păstrează cel mai ușor când glutamina stă lângă shaker sau lângă celelalte suplimente de dimineață. Pentru alergători și sporturi de anduranță avem un ghid separat: <a href="/blogs/news/glutamina-alergare-sporturi-anduranta">glutamina pentru alergare</a>.</p>

${productBox({ handle: 'recovery-glutamin', img: IMG.glutamin, title: 'L-glutamină Recovery Glutamin Kyowa® – 500 g', line: 'Varianta Simplu are un singur ingredient, glutamină Kyowa®: 4000 mg pe măsură de 4 g, 125 de porții în tub. Mai există 4 arome.', cta: 'Vezi produsul' })}

<h2 id="cum-o-folosesti">Cum folosești Recovery Glutamin: doza de pe etichetă</h2>
<p>Modul de folosire de pe etichetă este simplu: <strong>o măsură amestecată cu 200 ml de apă, o singură porție pe zi</strong>. Nu depăși doza recomandată pentru consumul zilnic.</p>
<ul>
  <li><strong>Simplu (fără aromă):</strong> măsura are 4 g și conține 4000 mg de L-glutamină Kyowa®; tubul de 500 g are 125 de porții, deci ține 125 de zile la o porție pe zi.</li>
  <li><strong>Raspberry (zmeură):</strong> măsura are 5 g, tot cu 4000 mg de L-glutamină Kyowa®, plus maltodextrină, arome, îndulcitori și colorant; tubul are 100 de porții.</li>
  <li><strong>Blueberry, Cherry Lime, Pineapple Mango:</strong> ingredientele complete sunt pe eticheta fiecărei arome.</li>
</ul>
<p>Varianta Simplu nu are gust pronunțat, deci o poți pune și în shake-ul proteic. Ce înseamnă „Kyowa®” și de ce contează fermentația am explicat în <a href="/blogs/news/glutamina-kyowa-inseamna-fermentatia-puritatea">Glutamina Kyowa: fermentația și puritatea</a>.</p>

<h2 id="ce-spun-studiile">Ce au studiat cercetătorii despre glutamină</h2>
<p>Ca să știi la ce să te aștepți, e bine să știi ce spun sursele serioase. <strong>În Uniunea Europeană nu există nicio mențiune de sănătate autorizată pentru glutamină</strong> (<a href="https://eur-lex.europa.eu/eli/reg/2012/432/oj" rel="noopener">Regulamentul (UE) nr. 432/2012</a>), deci niciun producător nu poate promite legal un efect.</p>
<p>Recenzia lui Gleeson din 2008 a analizat motivele pentru care sportivii iau glutamină și a concluzionat că, la persoanele sănătoase și bine hrănite, acestea au primit puțin sprijin din studiile bine controlate. Aceeași recenzie notează că doze unice de 20–30 g au fost tolerate fără probleme de adulți sănătoși, de câteva ori mai mult decât porția zilnică de 4 g de pe eticheta noastră (${pubmed('18806122', 'Gleeson, 2008')}).</p>
<p>Recenzia din 2018 descrie ce se știe despre metabolismul glutaminei și spune deschis că, pentru multe dintre efectele discutate ale suplimentării, dovezile la oameni încă lipsesc (${pubmed('30360490', 'Cruzat și colab., 2018')}). Pe scurt: glutamina este un aminoacid bine cunoscut, iar dacă o folosești, o iei informat, în doza de pe etichetă.</p>
<p>De ce o aleg totuși sportivii? Din experiența noastră, cei mai mulți o folosesc ca parte dintr-o rutină de suplimente pe care o țin de ani de zile și preferă o formă pură, cu un singur ingredient și o marcă de materie primă cunoscută (Kyowa®). E o alegere personală, nu o necesitate: dacă bugetul e limitat, prioritatea rămâne totalul de proteine din alimentație.</p>

<h2 id="cui-nu">Cui nu i se recomandă</h2>
<ul>
  <li>Copiilor și femeilor în perioada de sarcină sau alăptare (atenționarea de pe etichetă).</li>
  <li>Persoanelor cu alergii: produsul poate conține urme de lapte, ou, soia și gluten.</li>
  <li>Dacă ai o afecțiune sau urmezi un tratament, discută întâi cu medicul.</li>
</ul>

<h2 id="intrebari-frecvente">Întrebări frecvente</h2>
<h3>Se poate lua glutamina seara?</h3>
<p>Da. Eticheta nu fixează ora, doar o porție pe zi, deci seara este o variantă la fel de bună ca dimineața sau după sală, dacă o iei constant.</p>
<h3>Câtă glutamină pe zi scrie pe etichetă?</h3>
<p>O singură porție pe zi: o măsură amestecată cu 200 ml de apă. La varianta Simplu, măsura are 4 g, adică 4000 mg de L-glutamină Kyowa®.</p>
<h3>Pot pune glutamina în același shake cu proteina sau creatina?</h3>
<p>Da, varianta Simplu se amestecă ușor în orice shake. Am scris despre combinații în ghidul <a href="/blogs/news/glutamina-combinatii">glutamina: combinații cu creatină, proteine și BCAA</a>.</p>
<h3>Glutamina se ia și în zilele fără antrenament?</h3>
<p>Doza de pe etichetă este zilnică, deci da, o porție și în zilele libere, la ora obișnuită.</p>
<h3>Cât ține un tub de Recovery Glutamin?</h3>
<p>Tubul Simplu de 500 g are 125 de porții, iar cel cu aromă Raspberry are 100. La o porție pe zi ține 125, respectiv 100 de zile.</p>

<p>Mai mulți aminoacizi găsești în colecția <a href="/collections/aminoacizi">Aminoacizi</a>.</p>`,
  sources: [S.gleeson, S.cruzat, REG432],
  related: [REL.glutKyowa, REL.glutAnduranta],
},

// ───────────────────────────── 3. VITAMINA D3 + K2 ─────────────────────────────
{
  handle: 'cand-se-ia-vitamina-d3-k2', id: 'gid://shopify/Article/1024017072503',
  title: 'Când se ia vitamina D3+K2: la ce masă și cât de des',
  seoTitle: 'Când se ia vitamina D3+K2: la ce masă și cât de des',
  seoDesc: 'Când se ia vitamina D3+K2: la o masă cu grăsimi, o capsulă o dată la 2 zile, conform etichetei. Ce arată studiile și ce verifici dacă iei anticoagulante.',
  summary: 'Vitamina D3+K2 se ia la o masă care conține grăsimi: un studiu a găsit o absorbție cu 32% mai mare decât la o masă fără grăsimi. Pe eticheta Vitamina D3 + K2 Prime Health, doza este o capsulă o dată la 2 zile, sau cum îți recomandă specialistul.',
  imageAlt: 'Când se ia vitamina D3+K2: capsule moi aurii și capsule albe într-un bol de lemn, lângă somon, avocado, ouă și portocală, alimente care conțin grăsimi',
  image: 'blog-cand-se-ia-vitamina-d3-k2.jpg',
  watch: ['imunitate', 'previn', 'osteoporoz', 'inimă', 'cardio'],
  short: [
    'Iei capsula la o masă care conține grăsimi: ouă, pește, avocado, nuci sau ulei de măsline.',
    'Doza de pe etichetă: o capsulă o dată la 2 zile (100 µg D3 și 100 µg K2 pe capsulă).',
    'Ora din zi contează mai puțin decât masa; alegi una pe care o ții minte.',
    'Dacă iei anticoagulante, discută cu medicul: vitamina K2 poate interfera cu ele.',
  ],
  body: ({ pubmed, productBox, table }) => `<p><strong>Vitamina D3+K2 se ia în timpul unei mese care conține grăsimi, pentru că ambele vitamine sunt liposolubile.</strong> Pe eticheta Vitamina D3 + K2 Prime Health, doza este o capsulă o dată la 2 zile, sau cum îți recomandă specialistul. Ora din zi contează mai puțin: important e să o legi de aceeași masă, ca să n-o uiți.</p>

<h2>Cuprins</h2>
<ul>
  <li><a href="#masa">De ce o iei la o masă cu grăsimi</a></li>
  <li><a href="#ora">Dimineața sau seara?</a></li>
  <li><a href="#doza">Doza de pe etichetă: de ce o dată la 2 zile</a></li>
  <li><a href="#k2">Ce aduce vitamina K2 (MK-7)</a></li>
  <li><a href="#atentie">Anticoagulante, sarcină, copii: când întrebi medicul</a></li>
  <li><a href="#intrebari-frecvente">Întrebări frecvente</a></li>
</ul>

<h2 id="masa">De ce o iei la o masă cu grăsimi</h2>
<p>Vitamina D3 se absoarbe mai bine când o iei împreună cu grăsimi. Într-un studiu randomizat pe 50 de adulți, nivelul maxim de vitamina D3 din sânge a fost cu 32% mai mare la cei care au luat suplimentul la o masă cu grăsimi decât la cei care l-au luat la o masă fără grăsimi; tipul de grăsime nu a contat (${pubmed('25441954', 'Dawson-Hughes și colab., 2015')}).</p>
<p>Un studiu mai mic, pe 17 pacienți care nu răspundeau la tratament, a găsit o creștere medie de aproximativ 57% a nivelului de 25(OH)D după 2–3 luni, când aceștia au început să ia vitamina D la cea mai consistentă masă a zilei (${pubmed('20200983', 'Mulligan și Licata, 2010')}). Studiul nu a avut grup de control, dar direcția e aceeași.</p>
${table(['Masa', 'Exemple de grăsimi din farfurie'], [
  ['Micul dejun', 'ouă, iaurt grecesc integral, unt de arahide pe pâine'],
  ['Prânzul', 'pește gras (somon, macrou), salată cu ulei de măsline, avocado'],
  ['Cina', 'carne cu garnitură gătită cu ulei, brânză, o mână de nuci'],
])}

<h2 id="ora">Dimineața sau seara?</h2>
<p>Studiile de mai sus au comparat mesele cu și fără grăsimi, nu orele din zi. De aceea recomandăm momentul pe care îl poți repeta: mulți o iau la micul dejun sau la prânz, lângă celelalte suplimente. Dacă cina e masa ta cea mai consistentă, o poți lua și atunci.</p>

${productBox({ handle: 'vitamina-d3-k2', img: IMG.d3k2, title: 'Vitamina D3 + K2 – 80 capsule', line: 'O capsulă conține 100 µg (4000 UI) vitamina D3 și 100 µg vitamina K2 MK-7 din natto; 80 de capsule vegetale, adică 160 de zile la o capsulă la 2 zile.', cta: 'Vezi produsul' })}

<h2 id="doza">Doza de pe etichetă: de ce o dată la 2 zile</h2>
<p>O capsulă Prime Health conține 100 µg (4000 UI) de vitamina D3 și 100 µg de vitamina K2 (133% VNR). La o capsulă o dată la 2 zile, media zilnică este de aproximativ 50 µg (2000 UI) de vitamina D3 și 50 µg de vitamina K2 (calcul aproximativ). Nu depăși doza recomandată pe etichetă.</p>
<p>La această doză se aplică mențiunile autorizate în UE: vitamina D contribuie la menținerea sănătății sistemului osos, la menținerea funcției normale a sistemului muscular, la absorbția și utilizarea normală a calciului și fosforului și la funcționarea normală a sistemului imunitar; vitamina K contribuie la menținerea sănătății sistemului osos și la coagularea normală a sângelui (<a href="https://eur-lex.europa.eu/eli/reg/2012/432/oj" rel="noopener">Regulamentul (UE) nr. 432/2012</a>).</p>
<p>Cât de mult îți trebuie ție depinde de analize și de anotimp; am explicat pe larg în <a href="/blogs/news/cata-vitamina-d-zi-doze-analize-greseli">câtă vitamina D pe zi</a>.</p>

<h2 id="k2">Ce aduce vitamina K2 (MK-7)</h2>
<p>Vitamina K2 din capsulă este menachinona MK-7, obținută din natto (boabe de soia fermentate). Un studiu publicat în revista <em>Blood</em> a comparat-o cu vitamina K1 sintetică: ambele s-au absorbit bine, dar MK-7 a rămas mult mai mult timp în sânge și a dus la niveluri mai stabile la administrarea repetată (${pubmed('17158229', 'Schurgers și colab., 2007')}).</p>
<p>Din același studiu vine și atenționarea despre anticoagulante de mai jos.</p>

<h2 id="atentie">Anticoagulante, sarcină, copii: când întrebi medicul</h2>
<ul>
  <li><strong>Anticoagulante orale:</strong> autorii studiului din <em>Blood</em> atrag atenția că preparatele cu 50 µg pe zi sau mai mult de MK-7 pot interfera cu tratamentul anticoagulant oral (${pubmed('17158229', 'Schurgers și colab., 2007')}). Dacă iei un astfel de tratament, discută cu medicul înainte.</li>
  <li><strong>Copii, sarcină, alăptare:</strong> eticheta spune să nu fie consumat fără avizul medicului.</li>
  <li><strong>Alergie la soia:</strong> vitamina K2 provine din natto, deci produsul conține soia.</li>
</ul>

<h2 id="intrebari-frecvente">Întrebări frecvente</h2>
<h3>Vitamina D3+K2 se ia dimineața sau seara?</h3>
<p>Ora nu a fost un factor în studiile despre absorbție; masa a fost. Alege masa cu grăsimi pe care o ai zilnic, dimineața, la prânz sau seara.</p>
<h3>Pot lua vitamina D3+K2 pe stomacul gol?</h3>
<p>Nu e recomandat. Vitamina D se absoarbe mai bine cu grăsimi, iar eticheta indică de preferință o masă care conține grăsimi.</p>
<h3>De ce o capsulă o dată la 2 zile și nu în fiecare zi?</h3>
<p>Capsula are 4000 UI de vitamina D3, deci o capsulă la 2 zile aduce o medie de aproximativ 2000 UI pe zi. Așa scrie pe etichetă; orice altă schemă o stabilești cu un specialist.</p>
<h3>Pot lua vitamina D3+K2 împreună cu magneziul?</h3>
<p>Da, sunt suplimente separate și le poți lua la aceeași masă. Mulți le iau împreună, de exemplu cu <a href="/products/magneziu-bisglicinat-80-caps">magneziul bisglicinat Prime Health</a>.</p>
<h3>Cât ține un flacon de 80 de capsule?</h3>
<p>La o capsulă o dată la 2 zile, un flacon ține 160 de zile, adică peste 5 luni.</p>

<p>Toate suplimentele din gama Prime Health sunt în colecția <a href="/collections/prime-health">Prime Health</a>.</p>`,
  sources: [S.dawson, S.mulligan, S.schurgers, REG432],
  related: [REL.vitDDoza, REL.vitDIarna],
},

// ───────────────────────────── 4. IZOLAT VS CONCENTRAT ─────────────────────────────
{
  handle: 'izolat-vs-concentrat-proteic', id: 'gid://shopify/Article/1024807764343',
  title: 'Izolat vs concentrat proteic: merită diferența de preț?',
  seoTitle: 'Izolat vs concentrat proteic: merită diferența de preț?',
  seoDesc: 'Izolat sau concentrat din zer: cât diferă proteinele, grăsimile și zaharurile la 100 g, ce arată studiile despre doză și pentru cine merită izolatul.',
  summary: 'Izolatul merită dacă vrei mai multe proteine și mai puține grăsimi și zaharuri pe porție: Pure Isolate are 87 g de proteine la 100 g, față de 81,5 g la Prime Whey (Bourbon Vanilla). Dacă tolerezi bine lactatele și te uiți la buget, concentratul din zer este o alegere foarte bună.',
  imageAlt: 'Izolat vs concentrat proteic: tubul Prime Pure Isolate Bourbon Vanilla pe un blat de marmură, cu o măsură de pudră, un shaker negru, ovăz, ouă și o banană',
  image: 'blog-izolat-vs-concentrat-proteic.jpg',
  watch: ['slăbi', 'arde', 'absorbție rapidă', 'fără lactoză'],
  short: [
    'Izolatul are mai multe proteine și mai puține grăsimi și zaharuri pe 100 g decât concentratul.',
    'Pure Isolate: 87 g proteine, 0,96 g grăsimi, 0,96 g zaharuri la 100 g; Prime Whey (Bourbon Vanilla): 81,5 g, 6,6 g, 4,4 g.',
    'Studiile arată că totalul zilnic de proteine contează mai mult decât forma: ținta uzuală e 1,4–2,0 g/kg pe zi.',
    'Ambele sunt proteine din zer și au aceleași mențiuni UE pentru masa musculară.',
  ],
  body: ({ pubmed, productBox, table }) => `<p><strong>Izolatul proteic din zer merită diferența de preț dacă vrei cât mai multe proteine și cât mai puține grăsimi și zaharuri pe porție.</strong> Pure Isolate are 87 g de proteine la 100 g, față de 81,5 g la concentratul Prime Whey (Bourbon Vanilla). Dacă tolerezi bine lactatele și te uiți la buget, concentratul din zer rămâne o alegere foarte bună.</p>

<h2>Cuprins</h2>
<ul>
  <li><a href="#diferenta">Ce diferă între izolat și concentrat</a></li>
  <li><a href="#tabel">Pure Isolate vs Prime Whey, cifră cu cifră</a></li>
  <li><a href="#ce-spun-studiile">Ce contează mai mult decât forma: totalul de proteine</a></li>
  <li><a href="#lactoza">Izolatul și lactoza</a></li>
  <li><a href="#cine-alege">Cine alege izolat și cine concentrat</a></li>
  <li><a href="#intrebari-frecvente">Întrebări frecvente</a></li>
</ul>

<h2 id="diferenta">Ce diferă între izolat și concentrat</h2>
<p>Concentratul și izolatul sunt două trepte de filtrare ale aceleiași proteine din zer. Izolatul trece printr-o filtrare suplimentară (la Pure Isolate, microfiltrare), care scoate o parte mai mare din grăsimi și din lactoză, așa că pe 100 g de pudră rămân mai multe proteine.</p>
<p>Ambele sunt proteine din lapte digerate rapid. Un studiu pe bărbați tineri sănătoși a găsit că proteina din zer a crescut sinteza proteinelor musculare mai mult decât cazeina și proteina din soia, atât în repaus, cât și după antrenament (${pubmed('19589961', 'Tang și colab., 2009')}); studiul a folosit zer hidrolizat, nu concentrat sau izolat, dar arată de ce zerul e alegerea uzuală după sală.</p>

<h2 id="tabel">Pure Isolate vs Prime Whey, cifră cu cifră</h2>
${table(['La 100 g de pudră', 'Pure Isolate (izolat)', 'Prime Whey 2 kg (concentrat, Bourbon Vanilla)'], [
  ['Proteine', '87,0 g', '81,5 g'],
  ['Grăsimi', '0,96 g', '6,6 g'],
  ['Carbohidrați, din care zaharuri', '0,96 g / 0,96 g', '4,4 g / 4,4 g'],
  ['Energie', '360,4 kcal', '403,0 kcal'],
  ['Porție de pe etichetă', '27 g → 23,5 g proteine, 97,3 kcal', '30 g → 24,4 g proteine, 120,9 kcal'],
  ['Porții în cutia de 2 kg', '74', '66'],
  ['Proteine totale în 2 kg (calcul aproximativ)', '≈ 1,74 kg', '≈ 1,63 kg'],
])}
<p>Când compari prețurile, împarte prețul la cantitatea totală de proteine din cutie, nu la kilogramul de pudră. Așa vezi cât plătești, de fapt, pentru fiecare gram de proteină. Ce mai verifici pe tub am scris în <a href="/blogs/news/citesti-eticheta-unei-proteine-whey-verifici">cum citești eticheta unei proteine whey</a>.</p>

${productBox({ handle: 'pure-isolate-2000g', img: IMG.isolate, title: 'Izolat proteic din zer Pure Isolate – 2 kg', line: 'Izolat microfiltrat: 23,5 g de proteine pe porția de 27 g, 0,26 g de zaharuri și 0,26 g de grăsimi pe porție, 74 de porții, 7 arome.', cta: 'Vezi Pure Isolate' })}

<h2 id="ce-spun-studiile">Ce contează mai mult decât forma: totalul de proteine</h2>
<p>Poziția oficială a International Society of Sports Nutrition recomandă, pentru majoritatea persoanelor care se antrenează, un total de 1,4–2,0 g de proteine pe kilogram de greutate pe zi, cu porții de 20–40 g distribuite la 3–4 ore (${pubmed('28642676', 'Jäger și colab., 2017')}).</p>
<p>O meta-analiză pe 49 de studii și 1.863 de participanți a arătat că suplimentele proteice adaugă un câștig mic, dar măsurabil, la antrenamentul de forță, iar peste un aport total de aproximativ 1,6 g/kg pe zi câștigul suplimentar nu a mai crescut (${pubmed('28698222', 'Morton și colab., 2018')}). Mesajul practic: întâi atingi totalul zilnic, apoi alegi forma care ți se potrivește la gust, digestie și buget.</p>
<p>Ambele produse au aceleași mențiuni autorizate în UE: proteinele contribuie la creșterea masei musculare, la menținerea masei musculare și la menținerea sănătății sistemului osos (<a href="https://eur-lex.europa.eu/eli/reg/2012/432/oj" rel="noopener">Regulamentul (UE) nr. 432/2012</a>). Calculul pe greutatea ta îl găsești în <a href="/blogs/news/cata-proteina-trebuie-zi-calcul-greutate-obiectiv">câtă proteină pe zi</a>.</p>

<h2 id="lactoza">Izolatul și lactoza</h2>
<p>Lactoza este zahărul din lapte și face parte din „zaharuri” în tabelul nutrițional. O porție de Pure Isolate are 0,26 g de zaharuri, iar una de Prime Whey are 1,3 g, deci lactoza din porție este cel mult atât.</p>
<p>O recenzie sistematică publicată în <em>Annals of Internal Medicine</em> a găsit că majoritatea adulților cu intoleranță la lactoză tolerează 12–15 g de lactoză, cam cât într-o cană de lapte (${pubmed('20404262', 'Shaukat și colab., 2010')}). Ambele produse sunt mult sub această cantitate, dar izolatul are de 5 ori mai puține zaharuri pe porție. Ambele conțin lapte (zer), deci nu sunt potrivite pentru alergia la proteinele din lapte. Detalii în <a href="/blogs/news/izolat-proteic-intoleranta-lactoza-trebuie-sa-stii">izolat proteic și intoleranța la lactoză</a>.</p>

<h2 id="cine-alege">Cine alege izolat și cine concentrat</h2>
<ul>
  <li><strong>Izolat:</strong> dacă numeri caloriile și grăsimile, dacă lactatele îți dau disconfort, dacă vrei 23,5 g de proteine în doar 97 kcal pe porție.</li>
  <li><strong>Concentrat:</strong> dacă tolerezi bine lactatele și bugetul contează mai mult decât câteva grame de grăsimi în plus pe porție.</li>
  <li><strong>Amândouă:</strong> la sportivii cu care lucrăm vedem des combinația izolat după antrenament și concentrat în rest, în funcție de aromă.</li>
</ul>
<p>Mod de folosire: o porție de Pure Isolate (27 g) amestecată cu apă sau lapte, după antrenament sau pe parcursul zilei; o porție de Prime Whey (30 g) cu 150–200 ml de apă sau lapte, 1–4 porții pe zi, în funcție de necesarul de proteine.</p>

${productBox({ handle: 'prime-whey-2000g', img: IMG.whey2, title: 'Prime Whey – proteină din zer, 2 kg', line: 'Concentrat proteic din zer: în jur de 24 g de proteine pe porția de 30 g, 66 de porții, 7 arome.', cta: 'Vezi Prime Whey' })}

<h2 id="intrebari-frecvente">Întrebări frecvente</h2>
<h3>Izolatul proteic este fără lactoză?</h3>
<p>Nu complet. Izolatul are foarte puțină lactoză (Pure Isolate: 0,26 g zaharuri pe porție), dar nu este etichetat „fără lactoză” și conține lapte (zer).</p>
<h3>Izolatul are mai puține calorii decât concentratul?</h3>
<p>Da: o porție de Pure Isolate are 97,3 kcal, iar una de Prime Whey are 120,9 kcal, în principal pentru că izolatul are mai puține grăsimi.</p>
<h3>Când se ia izolatul proteic?</h3>
<p>Eticheta Pure Isolate spune după antrenament sau pe parcursul zilei. Contează mai mult să atingi totalul zilnic de proteine; vezi și ghidul <a href="/blogs/news/cand-se-ia-proteina">când se ia proteina</a>.</p>
<h3>Izolatul se face cu apă sau cu lapte?</h3>
<p>Ambele variante sunt pe etichetă. Cu apă rămân cifrele din tabel; laptele adaugă calorii, proteine și lactoză. Am comparat cele două în <a href="/blogs/news/shake-proteic-apa-lapte-diferente-alegi">shake proteic cu apă sau cu lapte</a>.</p>
<h3>Pot amesteca izolatul cu concentratul?</h3>
<p>Da. Sunt aceeași proteină din zer, la grade diferite de filtrare, deci le poți alterna sau combina după aromă și buget.</p>

<p>Toate pudrele proteice sunt în colecția <a href="/collections/pudra-proteica">Pudră proteică</a>.</p>`,
  sources: [S.jager, S.morton, S.tang, S.shaukat, REG432],
  related: [REL.izolatLactoza, REL.cataProteina],
},

// ───────────────────────────── 5. MAGNEZIU BISGLICINAT ─────────────────────────────
{
  handle: 'magneziu-bisglicinat-cum-iti-dai-seama-daca', id: 'gid://shopify/Article/1023313150327',
  title: 'Magneziu bisglicinat: ce este, cum îl iei și cui i se potrivește',
  seoTitle: 'Magneziu bisglicinat: ce este și cum îl iei',
  seoDesc: 'Magneziu bisglicinat: ce înseamnă forma legată de glicină, ce arată studiile despre formele organice, doza de 3 capsule pe zi și pentru cine are sens.',
  summary: 'Magneziul bisglicinat este magneziu legat de aminoacidul glicină, o formă organică; o recenzie sistematică din 2021 a găsit că formele organice par mai bine absorbite decât cele anorganice. Capsulele Prime Health au 300 mg magneziu bisglicinat și 100 mg magneziu malat, iar doza zilnică este de 3 capsule.',
  imageAlt: '',
  image: null,
  watch: ['somn', 'stres', 'cramp', 'oboseal', 'anxiet', 'relax', 'tensiun', 'ficat'],
  short: [
    'Magneziul bisglicinat este magneziu legat de glicină, o formă organică de magneziu.',
    'O recenzie din 2021 a găsit că formele organice par mai bine absorbite decât cele anorganice (oxid, de exemplu).',
    'Capsula Prime Health: 300 mg magneziu bisglicinat (21,52% VNR) + 100 mg magneziu malat; doza zilnică e de 3 capsule.',
    'La 3 capsule pe zi: magneziul contribuie la funcționarea normală a sistemului muscular și a sistemului nervos și la menținerea sănătății psihice.',
  ],
  body: ({ pubmed, productBox, table }) => `<p><strong>Magneziul bisglicinat este o formă de magneziu legată de glicină, un aminoacid, adică o formă organică de magneziu.</strong> Capsulele Prime Health conțin 300 mg de magneziu bisglicinat (21,52% VNR) și 100 mg de magneziu malat, iar doza zilnică de pe etichetă este de 3 capsule. Se potrivește adulților activi care vor magneziul separat, nu într-un complex de vitamine.</p>

<h2>Cuprins</h2>
<ul>
  <li><a href="#ce-este">Ce este magneziul bisglicinat</a></li>
  <li><a href="#forme">Formele de magneziu: ce arată studiile</a></li>
  <li><a href="#sportivi">De ce vorbesc sportivii despre magneziu</a></li>
  <li><a href="#cum-il-iei">Cum iei magneziul bisglicinat Prime Health</a></li>
  <li><a href="#cui-se-potriveste">Cui i se potrivește și când întrebi medicul</a></li>
  <li><a href="#intrebari-frecvente">Întrebări frecvente</a></li>
</ul>

<h2 id="ce-este">Ce este magneziul bisglicinat</h2>
<p>Magneziul nu se găsește singur în suplimente, ci legat de o altă moleculă. În bisglicinat, un atom de magneziu este legat de două molecule de glicină. În malat, magneziul este legat de acidul malic. Ambele sunt forme organice.</p>
<p>Atenție la cifre: cele 300 mg și 100 mg de pe etichetă sunt masa compușilor, nu magneziu elementar. Procentul relevant este VNR-ul declarat pe etichetă: 21,52% pe capsulă pentru bisglicinat, adică aproximativ 64,5% la doza zilnică de 3 capsule. Ce înseamnă VNR și cum citești flaconul am explicat în <a href="/blogs/news/magneziu-sportivi-cat-iei-eticheta">magneziul la sportivi: cât iei și ce verifici pe etichetă</a>.</p>

<h2 id="forme">Formele de magneziu: ce arată studiile</h2>
<p>O recenzie sistematică din 2021 a comparat biodisponibilitatea diferitelor forme de magneziu din suplimente, pe 14 studii selectate din 433. Concluziile autorilor: formele anorganice par mai puțin biodisponibile decât cele organice, iar procentul absorbit depinde de doză (${pubmed('34111673', 'Pardo și colab., 2021')}).</p>
${table(['Tip', 'Exemple', 'Ce spune recenzia din 2021'], [
  ['Forme organice', 'bisglicinat, malat, citrat', 'par mai bine absorbite'],
  ['Forme anorganice', 'oxid, carbonat', 'par mai puțin biodisponibile'],
  ['Toate formele', '–', 'mențin nivelurile normale la persoanele sănătoase fără deficit'],
])}
<p>Ultimul rând e important: la o persoană sănătoasă, fără deficit, toate formele își fac treaba. Diferențele de absorbție contează mai mult când aportul din alimentație e scăzut.</p>

${productBox({ handle: 'magneziu-bisglicinat-80-caps', img: IMG.magneziu, title: 'Magneziu bisglicinat 300 mg – 80 de capsule', line: 'Două forme în fiecare capsulă: 300 mg magneziu bisglicinat (21,52% VNR) și 100 mg magneziu malat; 80 de capsule vegetale, aproximativ 26 de zile.', cta: 'Vezi produsul' })}

<h2 id="sportivi">De ce vorbesc sportivii despre magneziu</h2>
<p>Magneziul participă la peste 300 de reacții metabolice din organism, iar evaluarea lui la sportivi e mai dificilă decât pare, pentru că nivelul din sânge nu reflectă bine rezervele din corp (${pubmed('26166051', 'Volpe, 2015')}).</p>
<p>O recenzie despre magneziu și efort notează că antrenamentele intense cresc pierderile de magneziu prin urină și transpirație, iar necesarul ar putea crește cu 10–20%. Aceeași recenzie arată că suplimentarea la persoanele active care au deja un aport adecvat de magneziu nu a îmbunătățit performanța; diferența apare la cei cu aport scăzut (${pubmed('17172008', 'Nielsen și Lukaski, 2006')}).</p>
<p>Concluzia practică: întâi verifici ce mănânci. Semințele de dovleac, migdalele, legumele cu frunze verzi, leguminoasele, cerealele integrale și cacaoa sunt surse bune de magneziu din alimentație. Suplimentul completează o dietă cu aport scăzut, nu o înlocuiește.</p>
<p>La sportivii cu care lucrăm, întrebarea pe care o punem întâi nu e „ce formă de magneziu iei?”, ci „câte porții de semințe, nuci, legume verzi și cereale integrale mănânci pe zi?”. Dacă răspunsul e „aproape deloc” și antrenamentele sunt dese și transpirate, un supliment cu o formă organică, luat zilnic în doza de pe etichetă, este o completare rezonabilă.</p>

<h2 id="cum-il-iei">Cum iei magneziul bisglicinat Prime Health</h2>
<ul>
  <li><strong>Doza de pe etichetă:</strong> 3 capsule pe zi, sau cum îți recomandă specialistul; nu depăși 3 capsule pe zi.</li>
  <li><strong>Momentul:</strong> eticheta nu fixează ora. Le poți lua împreună, la o masă, sau împărțite pe parcursul zilei, cu apă.</li>
  <li><strong>Cât ține un flacon:</strong> 80 de capsule la 3 pe zi înseamnă aproximativ 26 de zile.</li>
  <li><strong>Ce primești la această doză:</strong> magneziul contribuie la funcționarea normală a sistemului muscular, la funcționarea normală a sistemului nervos și la menținerea sănătății psihice (<a href="https://eur-lex.europa.eu/eli/reg/2012/432/oj" rel="noopener">Regulamentul (UE) nr. 432/2012</a>).</li>
</ul>
<p>Mulți îl combină cu <a href="/products/vitamina-d3-k2">vitamina D3 + K2 Prime Health</a>, la aceeași masă; am explicat cum o iei pe aceasta în <a href="/blogs/news/cand-se-ia-vitamina-d3-k2">când se ia vitamina D3+K2</a>.</p>

<h2 id="cui-se-potriveste">Cui i se potrivește și când întrebi medicul</h2>
<ul>
  <li><strong>Are sens pentru:</strong> adulții activi care transpiră mult la antrenament și au o alimentație săracă în surse de magneziu.</li>
  <li><strong>Nu are sens ca înlocuitor:</strong> pentru o dietă dezechilibrată; suplimentele nu înlocuiesc o alimentație variată.</li>
  <li><strong>Întrebi medicul:</strong> dacă ai o afecțiune renală, iei medicamente sau ești însărcinată ori alăptezi. Ce semne pot indica un aport scăzut am adunat în <a href="/blogs/news/semne-deficit-magneziu-sa-urmaresti">semne de deficit de magneziu</a>.</li>
</ul>

<h2 id="intrebari-frecvente">Întrebări frecvente</h2>
<h3>Care e diferența dintre magneziu bisglicinat și citrat?</h3>
<p>Ambele sunt forme organice: bisglicinatul e legat de glicină, citratul de acid citric. Recenzia din 2021 le grupează pe amândouă la formele organice, care par mai bine absorbite decât formele anorganice, precum oxidul.</p>
<h3>Câte capsule de magneziu bisglicinat iau pe zi?</h3>
<p>Eticheta Prime Health recomandă 3 capsule pe zi, fără să depășești această doză. La 3 capsule ajungi la aproximativ 64,5% din VNR, conform etichetei.</p>
<h3>Când se ia magneziul bisglicinat?</h3>
<p>Eticheta nu fixează ora. Alege un moment pe care îl repeți zilnic, de exemplu la o masă, și ia capsulele cu apă.</p>
<h3>Pot lua magneziul împreună cu vitamina D3+K2?</h3>
<p>Da, le poți lua la aceeași masă. Sunt două suplimente separate din gama Prime Health.</p>
<h3>Magneziul bisglicinat conține și altceva?</h3>
<p>Fiecare capsulă mai conține 100 mg magneziu malat, 5 mg extract de bambus cu 70% siliciu și făină de orez ca agent de încărcare, într-o capsulă vegetală.</p>

<p>Toate suplimentele din gama Prime Health sunt în colecția <a href="/collections/prime-health">Prime Health</a>.</p>`,
  sources: [S.pardo, S.nielsen, S.volpe, REG432],
  related: [REL.magSportivi, REL.magDeficit],
},
];
