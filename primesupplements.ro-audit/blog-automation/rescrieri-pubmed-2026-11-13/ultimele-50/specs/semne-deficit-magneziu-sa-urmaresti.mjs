import { L, REG } from '../sources.mjs';
export default {
  rep: [
    ['<p><strong>Deficitul de magneziu</strong> înseamnă', '<p>Semne de deficit de magneziu: deficitul înseamnă'],
    ['are menționate pe pagina produsului următoarele mențiuni autorizate:', `are menționate pe pagina produsului următoarele mențiuni autorizate în ${REG}:`],
  ],
  studies: { id: 'ce-spun-studiile', title: 'Ce spun studiile despre magneziu', html: `
<p>O recenzie despre magneziu și sport notează că statusul de magneziu este greu de evaluat, ceea ce explică de ce simptomele singure nu ajung (${L('volpe')}). O altă recenzie arată că efortul intens crește pierderile prin urină și transpirație, cu un necesar mai mare cu 10–20%, și că sportivii cu aport sub 260 mg pe zi (bărbați) sau 220 mg pe zi (femei) au risc de deficit (${L('nielsen')}).</p>
<p>Despre forme, o recenzie sistematică a 14 studii a găsit că formele organice par mai bine absorbite decât cele anorganice, dar și că toate formele mențin nivelurile la persoanele sănătoase fără deficit (${L('pardo')}).</p>` },
  sources: ['volpe', 'nielsen', 'pardo', 'reg'],
};
