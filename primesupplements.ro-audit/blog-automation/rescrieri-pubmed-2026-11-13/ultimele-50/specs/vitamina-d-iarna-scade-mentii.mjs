import { L, REG } from '../sources.mjs';
export default {
  rep: [['<h2 id="surse">De unde', '<h2 id="surse-vitamina-d">De unde'], ['href="#surse"', 'href="#surse-vitamina-d"']],
  studies: { id: 'ce-spun-studiile', title: 'Ce spun studiile despre vitamina D iarna', html: `
<p>Un studiu clasic a măsurat cât produce pielea sub soarele de iarnă, la latitudini diferite (${L('webb')}). Pe zile senine, rezultatul a fost acesta:</p>
<table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
  <thead><tr style="background-color: #b65b5d; color: #ffffff;"><th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Oraș (latitudine)</th><th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Luni fără producție de vitamina D în piele</th></tr></thead>
  <tbody>
    <tr><td style="padding: 10px; border: 1px solid #ddd;">Boston (42° N)</td><td style="padding: 10px; border: 1px solid #ddd;">noiembrie–februarie</td></tr>
    <tr><td style="padding: 10px; border: 1px solid #ddd;">Edmonton (52° N)</td><td style="padding: 10px; border: 1px solid #ddd;">octombrie–martie</td></tr>
    <tr><td style="padding: 10px; border: 1px solid #ddd;">34° N și 18° N</td><td style="padding: 10px; border: 1px solid #ddd;">producție și în mijlocul iernii</td></tr>
  </tbody>
</table>
<p>România se află între 44° și 48° N, deci mai aproape de primele două rânduri. Ghidul Endocrine Society recomandă analiza 25(OH)D ca prim test la persoanele cu risc de deficit (${L('holick')}). Dacă iei un supliment, ia-l la o masă cu grăsimi: într-un studiu pe 50 de adulți, vârful de D3 din sânge a fost cu 32% mai mare decât la masa fără grăsimi (${L('dawson')}). Mențiunile pentru vitamina D sunt cele din ${REG}.</p>` },
  sources: ['webb', 'holick', 'dawson', 'reg'],
};
