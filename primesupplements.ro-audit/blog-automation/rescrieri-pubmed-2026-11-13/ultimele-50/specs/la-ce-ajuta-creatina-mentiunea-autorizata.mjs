import { L, REG } from '../sources.mjs';
export default {
  rep: [['<p>Creatina este un compus care se găsește', '<p>La ce ajută creatina, pe scurt: creatina este un compus care se găsește'], ['Despre masa musculară se vorbește la proteine', `Conform ${REG}, despre masa musculară se vorbește la proteine`]],
  tw: [],
  rep2: 0,
  studies: { id: 'ce-spun-studiile', title: 'La ce ajută creatina: ce spun studiile', html: `
<p>La ce ajută creatina se vede din felul în care lucrează: crește rezerva de fosfocreatină din mușchi, folosită pentru a reface rapid ATP-ul în eforturile scurte și intense (${L('brosnan')}). Un studiu clasic pe 31 de bărbați a arătat că 20 g pe zi timp de 6 zile cresc creatina din mușchi cu aproximativ 20%, iar 3 g pe zi ajung la aceeași creștere în aproximativ 28 de zile (${L('hultman')}).</p>
<p>Poziția oficială ISSN consideră creatina monohidrată suplimentul cu cele mai multe dovezi pentru eforturile de mare intensitate și notează că a fost bine tolerată de persoanele sănătoase pe termen scurt și lung (${L('kreider')}). O recenzie din 2021 a analizat 12 mituri frecvente (apă, rinichi, păr, crampe) și a concluzionat că dovezile nu le susțin (${L('antonio21')}).</p>` },
  sources: ['brosnan', 'hultman', 'kreider', 'antonio21', 'reg'],
};
