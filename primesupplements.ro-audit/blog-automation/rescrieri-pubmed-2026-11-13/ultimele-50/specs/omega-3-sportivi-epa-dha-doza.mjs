import { L, REG } from '../sources.mjs';
export default {
  studies: { id: 'ce-spun-studiile', title: 'Ce spun studiile despre omega-3 la sportivi', html: `
<p>Omega-3 pentru sportivi este un subiect cu mult interes și cu puține concluzii ferme. O recenzie din 2019 a găsit dovezi insuficiente că suplimentarea ajută creșterea masei musculare la antrenamentul de forță sau păstrarea ei în deficit caloric (${L('philpott')}). O recenzie narativă din 2020 a notat că studiile pe sportivi și amatori sunt puține, au designuri foarte diferite și nu permit recomandări clare (${L('thielecke')}).</p>
<p>Ce se știe sigur este că EPA și DHA ajung în sânge proporțional cu doza: într-un studiu pe voluntari sănătoși, creșterea din plasmă la capsule a urmat liniar cantitatea luată (${L('visioli')}). De aceea pe eticheta Omega-3 Prime folosim doar mențiunea din ${REG}: EPA și DHA contribuie la funcționarea normală a inimii, de la 250 mg pe zi.</p>` },
  sources: ['philpott', 'thielecke', 'visioli', 'reg'],
};
