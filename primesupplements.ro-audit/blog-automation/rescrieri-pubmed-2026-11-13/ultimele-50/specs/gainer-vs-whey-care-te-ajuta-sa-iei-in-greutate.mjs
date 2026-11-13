import { L, REG } from '../sources.mjs';
export default {
  rep: [
    ['<p><strong>Gainer sau whey?</strong> Gainerul este', '<p>Gainer sau whey: gainerul este'],
    ['Proteinele contribuie la creșterea și la menținerea masei musculare, indiferent', `Conform ${REG}, proteinele contribuie la creșterea și la menținerea masei musculare, indiferent`],
  ],
  studies: { id: 'ce-spun-studiile', title: 'Ce spun studiile despre surplusul caloric și proteine', html: `
<p>Pentru masă musculară contează două lucruri: un mic surplus de calorii și suficiente proteine. O recenzie despre alimentația culturiștilor naturali în perioada de masă recomandă un surplus de aproximativ 10–20%, o creștere de 0,25–0,5% din greutate pe săptămână și 1,6–2,2 g de proteine pe kilogram pe zi (${L('iraki')}).</p>
<p>O altă recenzie a notat că mărimea exactă a surplusului necesar nu se cunoaște încă și că, la cei cu apetit mic, problema practică este sațietatea când trebuie să mănânce mai mult (${L('slater')}); aici un gainer lichid ajută. Dacă îți lipsesc doar proteinele, o meta-analiză cu 49 de studii a găsit că suplimentele proteice adaugă câștiguri mici de forță și masă slabă, fără beneficiu peste aproximativ 1,6 g/kg pe zi (${L('morton')}), iar acolo whey-ul este alegerea mai simplă.</p>` },
  sources: ['iraki', 'slater', 'morton', 'reg'],
};
