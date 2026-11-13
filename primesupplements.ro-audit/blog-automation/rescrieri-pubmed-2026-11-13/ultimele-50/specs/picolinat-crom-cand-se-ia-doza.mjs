import { L, REG } from '../sources.mjs';
export default {
  noBold: true,
  rep: [['<p>Pentru crom, UE a autorizat două mențiuni de sănătate:', `<p>Pentru crom, ${REG} a autorizat două mențiuni de sănătate:`]],
  studies: { id: 'ce-spun-studiile', title: 'Ce spun studiile despre picolinatul de crom', html: `
<p>Picolinatul de crom a fost promovat ani la rând pentru slăbit și pentru masă musculară, iar studiile nu au confirmat aceste promisiuni. O recenzie Cochrane a studiilor randomizate la adulții supraponderali nu a găsit dovezi actuale și sigure despre eficiența lui pentru greutate (${L('tian')}).</p>
<p>Într-un studiu dublu-orb pe 36 de bărbați care făceau antrenament de forță, 8 săptămâni de crom au crescut cromul din sânge, dar nu au adus beneficii pentru forță sau compoziția corporală (${L('lukaski')}). O recenzie din 2017 notează că efectele benefice la oameni nu au fost stabilite fără echivoc (${L('vincent')}). Practic, iei picolinatul pentru aportul de crom și pentru mențiunile autorizate, la doza de pe etichetă, nu pentru alte efecte.</p>` },
  sources: ['tian', 'lukaski', 'vincent', 'reg'],
};
