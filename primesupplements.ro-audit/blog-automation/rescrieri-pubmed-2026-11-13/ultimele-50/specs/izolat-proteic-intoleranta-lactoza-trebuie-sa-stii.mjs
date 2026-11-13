import { L, REG } from '../sources.mjs';
export default {
  rep: [['nu este automat potrivit dacă ai intoleranță la lactoză.', 'nu este automat potrivit dacă ai intoleranță la lactoză: un izolat proteic are, de regulă, mai puțină lactoză decât un concentrat, dar nu zero.']],
  studies: { id: 'ce-spun-studiile', title: 'Ce spun studiile despre lactoză și proteina din zer', html: `
<p>O recenzie sistematică despre intoleranța la lactoză a găsit că majoritatea adulților cu intoleranță tolerează 12–15 g de lactoză odată, cam cât o cană de lapte (${L('shaukat')}). Pragul diferă de la om la om, iar recenzia nu s-a referit la pudrele proteice, deci nu îl poți folosi ca garanție pentru un produs anume.</p>
<p>Despre proteina din zer în sine, poziția ISSN recomandă porții de 20–40 g de proteine de calitate la 3–4 ore (${L('jager')}). Un studiu pe bărbați tineri a găsit că zerul hidrolizat a stimulat sinteza proteică musculară mai mult decât cazeina și soia, în repaus și după efort (${L('tang')}); atenție, a fost testat un hidrolizat, nu un izolat sau un concentrat.</p>
<p>Conform ${REG}, proteinele contribuie la creșterea și la menținerea masei musculare. Dacă ai intoleranță la lactoză sau alergie la proteinele din lapte, discută cu medicul înainte de prima porție.</p>` },
  sources: ['shaukat', 'jager', 'tang', 'reg'],
};
