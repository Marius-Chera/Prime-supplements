import { L, REG } from '../sources.mjs';
export default {
  noBold: true,
  rep: [['<strong>Eticheta unei creatine se citește în cinci pași:</strong>', '<strong>Eticheta creatinei se citește în cinci pași, la orice produs:</strong>']],
  studies: { id: 'ce-spun-studiile', title: 'De ce contează ce scrie pe eticheta creatinei', html: `
<p>Primul rând de pe etichetă, ingredientul, contează pentru că aproape toate studiile s-au făcut pe creatina monohidrată. O recenzie din 2021 a concluzionat că formele „noi” nu s-au dovedit mai bune decât monohidratul și că doza uzuală este de 3–5 g pe zi (${L('antonio21')}).</p>
<p>Poziția oficială ISSN notează că monohidratul a fost bine tolerat de persoanele sănătoase pe termen scurt și lung (${L('kreider')}). Doza zilnică are o explicație simplă: o parte din creatina din corp se transformă spontan în creatinină și se elimină, deci rezerva trebuie refăcută zi de zi (${L('brosnan')}).</p>
<p>La rubrica de mențiuni, singura formulare autorizată în ${REG} este cea despre performanța în eforturi scurte și intense, la 3 g pe zi. Orice altă promisiune de pe un ambalaj de creatină este un semnal să citești mai atent.</p>` },
  sources: ['antonio21', 'kreider', 'brosnan', 'reg'],
};
