import { L } from '../sources.mjs';
export default {
  noBold: true,
  rep: [['<strong>O băutură fără zahăr îndulcită cu stevia este', '<strong>Băuturi fără zahăr îndulcite cu stevia: o astfel de băutură este']],
  studies: { id: 'ce-spun-studiile', title: 'Ce spun studiile despre stevia', html: `
<p>Stevia este unul dintre cei mai studiați îndulcitori fără calorii. O recenzie din 2016 a comparat drumul prin organism al principalilor îndulcitori (acesulfam-K, aspartam, zaharină, stevia, sucraloză) și amintește că siguranța lor a fost confirmată de autoritățile de reglementare din întreaga lume (${L('magnuson')}).</p>
<p>Într-un studiu pe 31 de adulți, o gustare îndulcită cu stevia (290 kcal) a fost comparată cu una îndulcită cu zahăr (493 kcal): participanții nu au mâncat mai mult la mesele următoare și au raportat o sațietate asemănătoare, deși gustarea cu stevia avea cu peste 200 kcal mai puțin (${L('anton')}). Despre alergii, o analiză a literaturii a găsit că reacțiile la extractele purificate de stevia sunt rare și nu justifică avertismente speciale (${L('urban')}).</p>` },
  sources: ['magnuson', 'anton', 'urban'],
};
