import { L, REG } from '../sources.mjs';
export default {
  rep: [
    ['<p>Gustările proteice pentru birou sunt alimente mici', '<p>Gustări proteice pentru birou: acestea sunt alimente mici'],
    ['<p>Proteinele contribuie la creșterea și la menținerea masei musculare, una dintre mențiunile autorizate în UE', `<p>Proteinele contribuie la creșterea și la menținerea masei musculare, una dintre mențiunile autorizate în ${REG}`],
  ],
  studies: { id: 'ce-spun-studiile', title: 'Ce spun studiile despre gustările proteice', html: `
<p>Compoziția gustării contează, nu doar caloriile. Într-un studiu pe 23 de femei, două batoane cu aceleași calorii au fost comparate: cel cu mai multe proteine și fibre a redus cu 5% caloriile mâncate la prânz, față de batonul cu mai multe grăsimi și zahăr (${L('williams')}). Studiul a fost mic și scurt, deci îl iei ca pe un indiciu.</p>
<p>O recenzie despre proteine și controlul greutății notează că dietele cu 1,2–1,6 g/kg de proteine pe zi și cu aproximativ 25–30 g pe masă au fost asociate cu un apetit mai bine controlat (${L('leidy')}), iar poziția ISSN recomandă porții de 20–40 g la 3–4 ore pentru cei care se antrenează (${L('jager')}). O gustare de 20 g de proteine completează astfel ținta zilei, între mese.</p>` },
  sources: ['williams', 'leidy', 'jager', 'reg'],
};
