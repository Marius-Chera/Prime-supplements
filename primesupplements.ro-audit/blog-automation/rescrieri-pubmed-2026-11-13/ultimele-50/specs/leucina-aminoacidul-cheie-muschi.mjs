import { L, REG } from '../sources.mjs';
export default {
  tw: [['Printre cei trei aminoacizi ramificați', `Printre cei trei aminoacizi ramificați, leucina este cea mai discutată în nutriția sportivă. O recenzie din 2006 descrie cum, după efort, leucina din proteine sau din BCAA participă la reluarea sintezei proteinelor musculare, împreună cu insulina (${L('norton')}). Atenție însă: un mecanism descris în laborator nu este o promisiune pentru un supliment. Pentru leucina luată separat nu există mențiuni de sănătate autorizate în ${REG}, așa că nu îi atribuim efecte.`]],
  studies: { id: 'ce-spun-studiile', title: 'Ce spun studiile despre leucină și aminoacizi', html: `
<p>Leucina nu lucrează singură: pentru proteine noi, mușchiul are nevoie de toți cei nouă aminoacizi esențiali. O recenzie din 2017 a concluzionat că afirmația potrivit căreia BCAA luați singuri stimulează sinteza proteinelor musculare la oameni nu este susținută de date (${L('wolfe')}).</p>
<p>Poziția ISSN despre proteine recomandă porții de 20–40 g de proteine de calitate, care aduc în mod natural 700–3000 mg de leucină, la 3–4 ore (${L('jager')}). Practic, o masă cu 25–40 g de proteine din carne, ouă, lactate sau whey acoperă deja acest interval; o porție de Prime EAA aduce 1070 mg de leucină, conform etichetei.</p>` },
  sources: ['norton', 'wolfe', 'jager', 'reg'],
};
