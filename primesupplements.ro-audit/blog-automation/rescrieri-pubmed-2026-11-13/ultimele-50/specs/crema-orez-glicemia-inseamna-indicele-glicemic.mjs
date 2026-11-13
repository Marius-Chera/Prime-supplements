import { L } from '../sources.mjs';
export default {
  tw: [['Studiile arată că răspunsul glicemic al unei mese', `Răspunsul glicemic al unei mese depinde de întreaga masă, nu doar de un ingredient. Încă din studiul care a definit indicele glicemic, pe 62 de alimente, creșterea glicemiei a fost mai mică atunci când alimentul avea mai multe proteine și grăsimi (${L('jenkins')}). Dacă vrei idei de combinații, vezi <a href="/blogs/news/retete-crema-orez-6-idei-dulci-proteice">rețetele cu cremă de orez: 6 idei dulci și proteice, fără foc</a>.`]],
  studies: { id: 'ce-spun-studiile', title: 'Ce spun tabelele internaționale de indice glicemic', html: `
<p>Indicele glicemic se măsoară pe oameni, după un protocol standard, iar valorile publicate sunt adunate în tabele internaționale. Ediția din 2008 a adunat peste 2.480 de alimente și a notat că pâinea, cerealele de mic dejun și orezul, inclusiv cel integral, există atât în variante cu IG mare, cât și cu IG mic (${L('atkinson')}). Asta înseamnă că nu poți ghici IG-ul unui produs din orez după ingrediente.</p>
<p>Tabelul din 2002 a introdus și încărcătura glicemică, care ține cont de cantitatea de glucide dintr-o porție, nu doar de tipul lor (${L('fosterpowell')}). De aceea, pentru crema de orez, cifra utilă de pe tub rămâne cantitatea de glucide pe porția de 45 g.</p>` },
  sources: ['jenkins', 'atkinson', 'fosterpowell'],
};
