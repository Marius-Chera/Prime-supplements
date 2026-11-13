import { L, REG } from '../sources.mjs';
export default {
  cut: ['Avantajul practic este simplitatea', 'Obiecții frecvente', '„Cinci tablete și o capsulă', '„Pot lua plicul pe stomacul gol', '„Se potrivește oricui'],
  cutFaq: ['Ce alergeni apar pe eticheta', 'Cât ține un tub de multivitamine'],
  rep: [
    ['O multivitamină în plicuri adună într-o singură doză zilnică', 'Multivitamine în plicuri: un plic adună într-o singură doză zilnică'],
    [' La sportivii cu care lucrăm, greșeala frecventă este să adune produse fără să compare etichetele, de aceea recomandăm să le treci pe toate într-un tabel.', ''],
    ['Mențiunile autorizate se leagă de nutrient, nu de produs.', `Mențiunile autorizate din ${REG} se leagă de nutrient, nu de produs.`],
  ],
  studies: { id: 'ce-spun-studiile', title: 'Ce spun studiile despre multivitamine', html: `
<p>O multivitamină completează aportul din alimente, iar studiile pe populație arată atât folosul, cât și limita. O analiză pe 16.110 persoane a găsit că, fără alimente fortificate și suplimente, mulți nu atingeau aportul recomandat de micronutrienți, dar și că 10,3% depășeau limita maximă la niacină și 8,4% la zinc (${L('fulgoni')}).</p>
<p>O analiză pe 10.698 de adulți a găsit că folosirea suplimentelor a fost asociată cu aporturi mai mari la 15–16 din 19 nutrienți și cu mai puține aporturi insuficiente, plus o creștere mică, de regulă sub 5%, a celor peste limita maximă (${L('blumberg')}). Pentru vitamina C, un studiu de farmacocinetică a arătat că la doze unice de 500 mg sau mai mari absorbția scade și surplusul se elimină prin urină (${L('levine')}). De aceea recomandăm să aduni cantitățile din toate etichetele înainte să combini produse.</p>` },
  sources: ['fulgoni', 'blumberg', 'levine', 'reg'],
};
