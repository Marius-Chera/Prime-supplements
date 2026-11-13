import { L, REG } from '../sources.mjs';
export default {
  rep: [
    ['<p>Gainerul se ia amestecat într-un shaker', '<p>Cum iei gainerul: îl amesteci într-un shaker'],
    ['Proteinele contribuie la creșterea masei musculare și la menținerea masei musculare.', `Conform ${REG}, proteinele contribuie la creșterea masei musculare și la menținerea masei musculare.`],
  ],
  studies: { id: 'ce-spun-studiile', title: 'Ce spun studiile despre momentul și porțiile', html: `
<p>Momentul gainerului contează mai puțin decât totalul zilei. O recenzie despre alimentația culturiștilor naturali în perioada de masă recomandă 1,6–2,2 g de proteine pe kilogram pe zi, împărțite în 3–6 mese de câte 0,40–0,55 g/kg, inclusiv în cele 1–2 ore dinainte și de după antrenament, și un surplus de aproximativ 10–20% (${L('iraki')}).</p>
<p>Poziția ISSN despre momentul nutrienților arată că porțiile de 20–40 g de proteine la 3–4 ore au cele mai bune rezultate asupra sintezei proteice (${L('kerksick')}); cele două porții de pe eticheta Emperor Mass, dimineața și după antrenament, se încadrează în acest tipar. O altă recenzie notează că, atunci când trebuie să mănânci mai mult, sațietatea devine problema practică (${L('slater')}) – motiv pentru care un shake e mai ușor de luat decât încă o masă.</p>` },
  sources: ['iraki', 'kerksick', 'slater', 'reg'],
};
