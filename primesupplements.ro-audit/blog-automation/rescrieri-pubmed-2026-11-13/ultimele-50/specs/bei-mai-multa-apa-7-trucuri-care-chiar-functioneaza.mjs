import { L } from '../sources.mjs';
const td = s => `<td style="padding: 10px; border: 1px solid #ddd;">${s}</td>`;
const th = s => `<th style="padding: 12px; text-align: left; border: 1px solid #ddd;">${s}</th>`;
export default {
  rep: [['<p>Ca să bei mai multă apă, ai nevoie de un sistem simplu', '<p>Cum bei mai multă apă: ai nevoie de un sistem simplu']],
  studies: { id: 'ce-spun-studiile', title: 'Cum îți verifici hidratarea: ce spun studiile', html: `
<p>Necesarul de apă diferă de la om la om, iar o recenzie despre apă și sănătate notează că măsurarea aportului total de lichide și a hidratării la nivel de populație are încă multe goluri (${L('popkin')}). De aceea folosești câteva semne simple, verificate în studii:</p>
<table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
  <thead><tr style="background-color: #b65b5d; color: #ffffff;">${th('Ce verifici')}${th('Cum')}${th('Sursa')}</tr></thead>
  <tbody>
    <tr>${td('Culoarea urinei')}${td('deschisă, ca paiul, de-a lungul zilei')}${td(L('armstrong'))}</tr>
    <tr>${td('Greutatea înainte și după sport')}${td('pierderea să nu depășească 2% din greutate')}${td(L('acsm'))}</tr>
    <tr>${td('Ritmul de băut')}${td('treptat, nu mult deodată')}${td(L('acsm'))}</tr>
  </tbody>
</table>
<p>Trei studii de laborator și de teren au arătat că culoarea urinei se corelează bine cu densitatea și osmolalitatea ei, deci e un indicator practic, chiar dacă nu înlocuiește analizele de laborator (${L('armstrong')}). Poziția ACSM recomandă ca pierderea de apă prin transpirație să nu depășească 2% din greutate și ca planul de băut să fie adaptat fiecăruia (${L('acsm')}).</p>` },
  sources: ['popkin', 'armstrong', 'acsm'],
};
