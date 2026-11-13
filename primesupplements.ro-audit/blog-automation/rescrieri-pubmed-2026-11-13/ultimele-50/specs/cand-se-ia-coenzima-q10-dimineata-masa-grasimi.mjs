import { L, REG } from '../sources.mjs';
export default {
  rep: [['<p><strong>Coenzima Q10</strong> se ia, conform etichetei Prime Health,', '<p>Când se ia coenzima Q10: conform etichetei Prime Health, se ia']],
  studies: { id: 'ce-spun-studiile', title: 'Ce spun studiile despre absorbția coenzimei Q10', html: `
<p>Coenzima Q10 se absoarbe încet și limitat, pentru că este o moleculă mare și liposolubilă. O recenzie de farmacocinetică arată că vârful în sânge apare la aproximativ 6 ore după administrare, iar timpul de înjumătățire este de aproximativ 33 de ore (${L('bhagavan')}); de aceea ora exactă din zi contează puțin, iar regularitatea contează mai mult.</p>
<p>O recenzie din 2020 explică etapele absorbției, de la stomac la intestin și limfă, și notează că formularea capsulei influențează mult cât se absoarbe (${L('mantle')}). Un studiu de laborator, pe un model de digestie, a arătat că Q10 trece mai ușor în miceliile formate din grăsimile digerate (${L('failla')}) – motivul practic pentru care o iei după o masă. Pentru coenzima Q10 nu există mențiuni de sănătate autorizate în ${REG}.</p>` },
  sources: ['bhagavan', 'mantle', 'failla', 'reg'],
};
