import { L, REG } from '../sources.mjs';
export default {
  noBold: true,
  studies: { id: 'ce-spun-studiile', title: 'Ce spun studiile despre vitamina C și fier', html: `
<p>Efectul vitaminei C asupra fierului este cel mai clar la nivelul unei singure mese. Un studiu pe 12 persoane a măsurat absorbția fierului din dieta completă, 5 zile la rând, cu aporturi de vitamina C între 51 și 247 mg pe zi; efectul a existat, dar a fost mult mai mic decât în testele cu o singură masă (${L('cook')}). Practic, contează să pui sursa de vitamina C în aceeași farfurie cu fierul vegetal, la fiecare masă.</p>
<p>Despre forma vitaminei, o recenzie a studiilor pe oameni nu a găsit diferențe de durată între vitamina C din alimente și cea sintetică (${L('carr')}). Un studiu de farmacocinetică a arătat că la doze unice de 500 mg sau mai mari absorbția scade și surplusul se elimină (${L('levine')}). Mențiunea „vitamina C crește absorbția fierului” este cea din ${REG}.</p>` },
  sources: ['cook', 'carr', 'levine', 'reg'],
};
