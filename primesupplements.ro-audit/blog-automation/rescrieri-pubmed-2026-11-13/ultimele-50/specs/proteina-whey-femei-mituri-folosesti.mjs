import { L, REG } from '../sources.mjs';
export default {
  studies: { id: 'ce-spun-studiile', title: 'Ce spun studiile despre necesarul de proteine', html: `
<p>Recomandările de proteine se dau pe kilogram de greutate, nu pe sex. Poziția ISSN despre proteine indică 1,4–2,0 g/kg pe zi pentru majoritatea celor care se antrenează, în porții de 20–40 g la 3–4 ore (${L('jager')}).</p>
<p>O meta-analiză cu 49 de studii și 1.863 de participanți, femei și bărbați, a găsit că suplimentele proteice adaugă câștiguri mici de forță și masă slabă la antrenamentul de forță, iar peste aproximativ 1,6 g/kg pe zi nu s-a mai văzut un câștig suplimentar (${L('morton')}). O analiză din 2018 propune ca acest total să fie împărțit în cel puțin patru mese de câte 0,4 g/kg (${L('schoenfeld')}).</p>
<p>Pentru o femeie de 60 kg, asta înseamnă aproximativ 96 g de proteine pe zi și în jur de 24 g pe masă, cam cât o măsură de Prime Whey. Conform ${REG}, proteinele contribuie la creșterea și la menținerea masei musculare.</p>` },
  sources: ['jager', 'morton', 'schoenfeld', 'reg'],
};
