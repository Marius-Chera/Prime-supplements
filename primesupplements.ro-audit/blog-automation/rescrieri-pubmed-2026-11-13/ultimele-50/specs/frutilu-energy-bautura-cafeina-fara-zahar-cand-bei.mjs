import { L } from '../sources.mjs';
export default {
  noBold: true,
  rep: [['<strong>La birou sau la studiu</strong>', '<strong>La birou sau la învățat</strong>']],
  studies: { id: 'ce-spun-studiile', title: 'Ce spun studiile despre cafeină și băuturi', html: `
<p>O recenzie sistematică a efectelor nedorite ale cafeinei, actualizare a evaluării Health Canada, a analizat separat adulții sănătoși, femeile însărcinate, adolescenții și copiii și a subliniat că persoanele cu afecțiuni preexistente pot fi mai sensibile (${L('wikoff')}); de aceea contează totalul zilei, din toate sursele. Poziția ISSN despre cafeină notează că răspunsul diferă mult de la o persoană la alta (${L('guest')}).</p>
<p>O recenzie despre apă și sănătate atrage atenția că o parte tot mai mare din lichidele zilei vine din băuturi cu calorii (${L('popkin')}); o băutură fără zahăr adăugat, preparată dintr-un plic, nu adaugă astfel de calorii, dar nu înlocuiește apa simplă.</p>` },
  sources: ['wikoff', 'guest', 'popkin'],
};
