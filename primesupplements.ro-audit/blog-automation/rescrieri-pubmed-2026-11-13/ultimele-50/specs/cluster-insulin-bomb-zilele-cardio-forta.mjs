import { L, REG } from '../sources.mjs';
export default {
  studies: { id: 'ce-spun-studiile', title: 'Ce spun studiile despre carbohidrați și lichide la antrenament', html: `
<p>Recomandările despre carbohidrații din timpul efortului depind de durată. O recenzie din 2014 propune cantități mici sau chiar doar clătirea gurii la eforturile de aproximativ o oră, până la 60 g pe oră la eforturile de 2–3 ore și până la 90 g pe oră la cele foarte lungi (${L('jeukendrup')}). O altă recenzie notează că aceste ținte se aplică mai ales sesiunilor lungi sau intense, unde contează disponibilitatea carbohidraților (${L('burke')}).</p>
<p>Pentru lichide, poziția ACSM recomandă evitarea unei pierderi de peste 2% din greutate prin deshidratare și notează că băuturile cu carbohidrați și electroliți pot avea avantaje față de apă în anumite situații (${L('acsm')}). O porție Cluster Bomb în 300–400 ml de apă se încadrează în acest tip de plan; produsul nu are însă o mențiune de sănătate proprie în ${REG}, deci îl folosești pentru cifrele de pe etichetă.</p>` },
  sources: ['jeukendrup', 'burke', 'acsm', 'reg'],
};
