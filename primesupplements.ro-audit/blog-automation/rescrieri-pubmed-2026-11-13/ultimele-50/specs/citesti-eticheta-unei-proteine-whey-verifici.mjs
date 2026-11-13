import { L, REG } from '../sources.mjs';
export default {
  rep: [
    ['<p>Eticheta unei proteine whey se citește în patru pași:', '<p>Cum citești eticheta unei proteine whey: se citește în patru pași, adică'],
    ['<p>Proteinele contribuie la creșterea și la menținerea masei musculare, dar această mențiune', `<p>Conform ${REG}, proteinele contribuie la creșterea și la menținerea masei musculare, dar această mențiune`],
  ],
  studies: { id: 'ce-spun-studiile', title: 'De ce contează cifrele de pe etichetă: ce spun studiile', html: `
<p>Cifra de proteine pe porție contează pentru că recomandările se dau în grame. Poziția ISSN despre proteine recomandă porții de 20–40 g de proteine de calitate la 3–4 ore și 1,4–2,0 g/kg pe zi pentru cei care se antrenează (${L('jager')}); o meta-analiză cu 49 de studii nu a găsit câștiguri suplimentare peste aproximativ 1,6 g/kg pe zi (${L('morton')}).</p>
<p>Tipul de proteină de pe etichetă contează și el: un studiu pe bărbați tineri a găsit că zerul hidrolizat a stimulat sinteza proteică musculară mai mult decât cazeina și soia (${L('tang')}). Studiul a testat un hidrolizat, nu un concentrat, dar arată de ce merită să știi ce sursă de proteină cumperi.</p>` },
  sources: ['jager', 'morton', 'tang', 'reg'],
};
