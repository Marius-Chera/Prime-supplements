import { L, REG } from '../sources.mjs';
export default {
  rep: [['Proteinele contribuie la creșterea masei musculare și la menținerea masei musculare.', `Conform ${REG}, proteinele contribuie la creșterea masei musculare și la menținerea masei musculare.`]],
  studies: { id: 'ce-spun-studiile', title: 'Ce spun studiile despre surplusul caloric', html: `
<p>Un gainer funcționează doar prin caloriile pe care le adaugă, deci primul pas e să știi câte îți trebuie. Ecuația Mifflin-St Jeor, obținută din măsurători pe 498 de adulți sănătoși, estimează metabolismul de repaus din greutate, înălțime, vârstă și sex (${L('mifflin')}); rezultatul îl înmulțești cu un factor de activitate.</p>
<p>Peste acest necesar, o recenzie despre culturiștii naturali recomandă un surplus de aproximativ 10–20% și o creștere de 0,25–0,5% din greutate pe săptămână, cu 1,6–2,2 g de proteine pe kilogram (${L('iraki')}). O altă recenzie notează că surplusul exact nu se cunoaște și că cei cu apetit mic se lovesc mai ales de sațietate (${L('slater')}) – exact situația în care un gainer are sens.</p>` },
  sources: ['mifflin', 'iraki', 'slater', 'reg'],
};
