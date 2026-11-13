import { L, REG } from '../sources.mjs';
export default {
  rep: [['<p>Creapure® este o marcă înregistrată', '<p>Creapure® vs creatină monohidrată obișnuită: Creapure® este o marcă înregistrată']],
  studies: { id: 'ce-spun-studiile', title: 'Ce spun studiile despre creatina monohidrată', html: `
<p>Aproape toată cercetarea despre creatină s-a făcut pe creatina monohidrată, iar asta contează mai mult decât marca. Poziția oficială ISSN notează că suplimentarea pe termen scurt și lung, până la 30 g pe zi timp de 5 ani, a fost bine tolerată de persoanele sănătoase (${L('kreider')}).</p>
<p>O recenzie din 2021 care a răspuns la 12 întrebări frecvente despre creatină arată că doza uzuală este de 3–5 g pe zi (sau 0,1 g/kg) și că formele „noi” nu s-au dovedit mai bune decât monohidratul (${L('antonio21')}). O recenzie de biochimie explică de ce creatina trebuie luată zilnic: o parte din ea se transformă spontan în creatinină și se elimină, așa că rezerva se reface din dietă și din sinteza proprie (${L('brosnan')}).</p>
<p>Concluzia practică: între Creapure® și o creatină monohidrată obișnuită, molecula și mențiunea din ${REG} sunt aceleași; diferă proveniența declarată a ingredientului și ce scrie pe etichetă.</p>` },
  sources: ['kreider', 'antonio21', 'brosnan', 'reg'],
};
