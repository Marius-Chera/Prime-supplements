import { L, REG } from '../sources.mjs';
export default {
  rep: [['Ce se știe despre toleranța NAC în studii și cum citești eticheta.', 'Ce se știe despre toleranța NAC și cum citești eticheta.']],
  studies: { id: 'ce-spun-studiile', title: 'Ce spun studiile despre doza de vitamina C', html: `
<p>Vitamina C pentru sportivi se dozează după aceleași reguli de absorbție ca la oricine. Într-un studiu de farmacocinetică, voluntari sănătoși internați 4–6 luni au primit doze între 30 și 2500 mg pe zi: plasma s-a saturat aproape complet la 1000 mg pe zi, iar la doze unice de 500 mg sau mai mari absorbția a scăzut și surplusul s-a eliminat prin urină (${L('levine')}).</p>
<p>O recenzie a studiilor pe oameni nu a găsit diferențe de durată între vitamina C din fructe și cea sintetică (${L('carr')}). Poziția comună a nutriționiștilor și a Colegiului American de Medicină Sportivă recomandă ca sportivii să-și acopere vitaminele întâi din alimentație și să folosească suplimente atunci când aportul nu ajunge (${L('thomas')}). Mențiunea pentru efortul intens este cea din ${REG}, la 200 mg pe zi peste aportul recomandat.</p>` },
  sources: ['levine', 'carr', 'thomas', 'reg'],
};
