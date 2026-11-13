import { L, REG } from '../sources.mjs';
export default {
  noBold: true,
  rep: [['ambele în Regulamentul (UE) nr. 432/2012:', `ambele în ${REG}:`]],
  studies: { id: 'ce-spun-studiile', title: 'Ce spun studiile despre crom', html: `
<p>Mențiunea despre glicemie se referă la menținerea unor valori normale, nu la vreo afecțiune, iar cercetarea recentă explică de ce formularea este atât de prudentă. O recenzie din 2017 notează că efectele benefice ale cromului la oameni nu au fost stabilite fără echivoc, chiar dacă unele modele pe animale au arătat efecte (${L('vincent')}).</p>
<p>Pentru controlul greutății, o recenzie Cochrane a studiilor randomizate cu picolinat de crom la adulții supraponderali nu a găsit dovezi actuale și sigure pentru o decizie despre eficiență (${L('tian')}). La sportivi, un studiu dublu-orb pe 36 de bărbați a găsit că 8 săptămâni de crom, alături de antrenamentul de forță, nu au adus beneficii pentru compoziția corporală sau forță (${L('lukaski')}). De aceea nu promitem nimic în plus față de mențiunea autorizată.</p>` },
  sources: ['vincent', 'tian', 'lukaski', 'reg'],
};
