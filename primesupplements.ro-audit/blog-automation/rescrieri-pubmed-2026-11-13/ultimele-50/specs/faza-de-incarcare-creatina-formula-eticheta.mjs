import { L, REG } from '../sources.mjs';
export default {
  studies: { id: 'ce-spun-studiile', title: 'Ce spun studiile despre faza de încărcare', html: `
<p>Faza de încărcare are la bază un studiu clasic pe 31 de bărbați: 20 g de creatină pe zi timp de 6 zile au crescut creatina din mușchi cu aproximativ 20%, iar nivelul s-a menținut apoi cu 2 g pe zi; aceeași creștere a apărut și cu 3 g pe zi, dar în aproximativ 28 de zile (${L('hultman')}).</p>
<p>O recenzie din 2021 despre întrebările frecvente a concluzionat că încărcarea nu este obligatorie: scurtează timpul până la saturare, dar o doză zilnică de 3–5 g ajunge la același rezultat în câteva săptămâni (${L('antonio21')}). Poziția oficială ISSN descrie ambele variante și notează că suplimentarea a fost bine tolerată de persoanele sănătoase (${L('kreider')}).</p>
<p>Mențiunea din ${REG} se referă la un consum zilnic de 3 g. Formula de pe eticheta Prime (greutatea ÷ 3) se încadrează în aceste date, dar nu depăși doza recomandată.</p>` },
  sources: ['hultman', 'antonio21', 'kreider', 'reg'],
};
