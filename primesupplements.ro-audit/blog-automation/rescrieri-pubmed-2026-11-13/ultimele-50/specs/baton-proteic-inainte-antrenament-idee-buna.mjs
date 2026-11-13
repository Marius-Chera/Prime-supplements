import { L, REG } from '../sources.mjs';
export default {
  rep: [['Proteinele contribuie la creșterea masei musculare și la menținerea ei.', `Conform ${REG}, proteinele contribuie la creșterea masei musculare și la menținerea ei.`]],
  studies: { id: 'ce-spun-studiile', title: 'Ce spun studiile despre gustarea dinainte de antrenament', html: `
<p>Poziția ISSN despre momentul nutrienților arată că o masă sau o gustare cu proteine și carbohidrați înainte de antrenament este o opțiune bună, iar momentul exact ține mult de toleranța fiecăruia (${L('kerksick')}). Aceeași organizație recomandă porții de 20–40 g de proteine la 3–4 ore (${L('jager')}); un baton Prime Delicious Bar de 55 g are 20 g, deci se încadrează în capătul de jos al intervalului.</p>
<p>Un studiu pe 23 de femei a comparat două batoane cu aceleași calorii: cel cu mai multe proteine și fibre a redus cu 5% caloriile mâncate la prânzul următor, față de batonul cu mai multe grăsimi și zahăr (${L('williams')}). Studiul a fost mic și pe termen scurt, dar arată de ce contează compoziția de pe etichetă, nu doar caloriile.</p>` },
  sources: ['kerksick', 'jager', 'williams', 'reg'],
};
