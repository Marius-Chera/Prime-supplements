import { L, REG } from '../sources.mjs';
export default {
  rep: [
    ['<p><strong>Shake-ul proteic cu apă sau cu lapte</strong> diferă mai ales prin calorii și textură.', '<p>Shake proteic cu apă sau cu lapte: diferența este mai ales de calorii și de textură.'],
    ['Proteinele contribuie la creșterea și la menținerea masei musculare, dar efectul', `Conform ${REG}, proteinele contribuie la creșterea și la menținerea masei musculare, dar efectul`],
  ],
  studies: { id: 'ce-spun-studiile', title: 'Ce spun studiile despre porția de proteine și lactoză', html: `
<p>Lichidul nu schimbă proteina din pudră, ci doar ce se adaugă lângă ea. Poziția ISSN recomandă porții de 20–40 g de proteine de calitate la 3–4 ore și 1,4–2,0 g/kg pe zi pentru cei care se antrenează (${L('jager')}); o meta-analiză cu 49 de studii nu a găsit beneficii suplimentare peste aproximativ 1,6 g/kg pe zi (${L('morton')}).</p>
<p>Dacă alegi laptele și ai intoleranță la lactoză, contează cantitatea: o recenzie sistematică a găsit că majoritatea adulților cu intoleranță tolerează 12–15 g de lactoză odată, cam cât o cană de lapte (${L('shaukat')}). Pragul diferă de la om la om, așa că apa rămâne varianta sigură dacă lactatele îți fac probleme.</p>` },
  sources: ['jager', 'morton', 'shaukat', 'reg'],
};
