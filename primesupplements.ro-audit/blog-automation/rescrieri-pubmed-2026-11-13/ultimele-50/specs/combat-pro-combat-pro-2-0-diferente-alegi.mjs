import { L, REG } from '../sources.mjs';
export default {
  noBold: true,
  cut: ['Nota din recenziile clienților, citită din magazin'],
  studies: { id: 'ce-spun-studiile', title: 'Ce spun studiile despre cafeină și sinefrină', html: `
<p>Cafeina este cel mai studiat ingredient din pre-workout-uri. Poziția ISSN despre cafeină notează că în studiile pe efort s-au folosit de regulă 3–6 mg pe kilogram corp și că răspunsul diferă mult de la o persoană la alta (${L('guest')}); pentru un adult de 70 kg, asta înseamnă 210–420 mg. O recenzie sistematică a efectelor nedorite a analizat separat adulții sănătoși, femeile însărcinate, adolescenții și copiii și a subliniat că persoanele cu afecțiuni preexistente pot fi mai sensibile (${L('wikoff')}).</p>
<p>Despre sinefrină, o recenzie a peste 20 de studii pe aproximativ 360 de persoane, multe cu 10–53 mg pe zi alături de cafeină, nu a raportat modificări importante ale pulsului sau tensiunii la dozele studiate (${L('stohs')}). Autorii cer însă studii mai lungi. Pentru cafeină și sinefrină nu există mențiuni de sănătate autorizate în ${REG}, deci alegi produsul după etichetă și toleranță, nu după promisiuni.</p>` },
  sources: ['guest', 'wikoff', 'stohs', 'reg'],
};
