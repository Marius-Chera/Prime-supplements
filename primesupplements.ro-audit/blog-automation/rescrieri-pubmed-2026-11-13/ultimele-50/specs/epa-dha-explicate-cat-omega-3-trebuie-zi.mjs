import { L, REG } from '../sources.mjs';
export default {
  studies: { id: 'ce-spun-studiile', title: 'Ce spun studiile despre EPA și DHA', html: `
<p>EPA și DHA din pește sau din capsule ajung în sânge proporțional cu doza, arată un studiu pe voluntari sănătoși (${L('visioli')}). Timp de 6 săptămâni, 100 g de somon pe zi (383 mg EPA și 544 mg DHA) au crescut nivelurile din plasmă mai mult decât capsulele cu cantități apropiate, iar la capsule creșterea a urmat liniar doza.</p>
<p>La sportivi, o recenzie din 2019 a găsit dovezi insuficiente că omega-3 ajută creșterea masei musculare la antrenamentul de forță (${L('philpott')}). O altă recenzie a notat că studiile pe sportivi și amatori sunt puține și foarte diferite ca design, deci nu permit recomandări ferme (${L('thielecke')}).</p>
<p>De aceea, la Omega-3 Prime folosim doar mențiunea din ${REG}: EPA și DHA contribuie la funcționarea normală a inimii, la un consum zilnic de 250 mg. O capsulă aduce 300 mg, adică pragul este acoperit fără să crești doza.</p>` },
  sources: ['visioli', 'philpott', 'thielecke', 'reg'],
};
