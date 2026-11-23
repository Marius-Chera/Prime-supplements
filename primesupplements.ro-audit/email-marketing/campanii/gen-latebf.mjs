// Generează cele două e-mailuri Late Black Friday (25.11 și 28.11.2026) în designul aprobat.
// Rulare: node gen-latebf.mjs (din acest folder)
import { writeFileSync } from 'node:fs';
const F = 'Poppins,Arial,Helvetica,sans-serif';
const H = "Impact,'Arial Black',Arial,sans-serif";
const cards = [
  ['Prime Whey – proteină din zer, 2 kg', '390 lei', 'prime-whey-2000g', 'https://cdn.shopify.com/s/files/1/0917/5138/3415/files/ALL_MERCH_3_03.jpg?v=1794829000', 'Prime Whey 2 kg'],
  ['Creatină Creapure® monohidrată', 'de la 115 lei', 'creatina-creapure', 'https://cdn.shopify.com/s/files/1/0917/5138/3415/files/01_PRIME_CREATINE_Creapure_500g_front_508a0239-fe0e-4167-9d15-12bc1a93fc8c.jpg?v=1794828862', 'Creatină Creapure Prime'],
  ['Cremă de orez Prime Creamy Rice, 1 kg', '65 lei', 'crema-de-orez-tort-de-ciocolata', 'https://cdn.shopify.com/s/files/1/0917/5138/3415/files/7.jpg?v=1794828956', 'Cremă de orez Prime Creamy Rice, tort de ciocolată'],
  ['Aminoacizi esențiali EAA, 500 g', '175 lei', 'eaa-aminoacizi-esentiali', 'https://cdn.shopify.com/s/files/1/0917/5138/3415/files/01_PRIME_EAA_Blueberry_500g_front_69ace7f5-a663-4032-97c8-c94138efaa5a.jpg?v=1794828862', 'Aminoacizi esențiali EAA Prime'],
];
const card = ([n, p, h, img, alt]) => `<td width="50%" valign="top" style="padding:6px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f6f6f6" style="background-color:#f6f6f6;"><tr><td align="center" style="padding:18px 12px 6px 12px;"><a href="https://primesupplements.ro/products/${h}" style="text-decoration:none;"><img src="${img}" width="150" alt="${alt}" style="display:block;width:150px;max-width:100%;height:auto;border:0;"></a></td></tr><tr><td align="center" style="padding:6px 12px 2px 12px;font-family:${F};font-size:15px;line-height:21px;font-weight:bold;color:#111111;">${n}</td></tr><tr><td align="center" style="padding:4px 12px 18px 12px;font-family:${F};font-size:16px;line-height:22px;font-weight:bold;color:#111111;text-transform:uppercase;">${p}</td></tr></table></td>`;
const grid = `<tr><td style="padding:8px 18px 8px 18px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>${card(cards[0])}${card(cards[1])}</tr><tr>${card(cards[2])}${card(cards[3])}</tr></table></td></tr>`;
const btn = (t) => `<tr><td align="center" style="padding:8px 32px 28px 32px;"><table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center"><tr><td align="center" bgcolor="#ec1e24" style="background-color:#ec1e24;border-radius:3px;"><a href="https://primesupplements.ro" style="display:inline-block;padding:16px 30px;font-family:${F};font-size:15px;line-height:18px;font-weight:bold;color:#ffffff;text-decoration:none;text-transform:uppercase;border-radius:3px;">${t}</a></td></tr></table></td></tr>`;
const codeBox = (sub) => `<tr><td align="center" style="padding:4px 32px 24px 32px;"><table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="border:2px dashed #111111;"><tr><td align="center" style="padding:16px 34px 6px 34px;font-family:${H};font-size:38px;line-height:44px;color:#ec1e24;letter-spacing:3px;">LATEBF20</td></tr><tr><td align="center" style="padding:0 34px 16px 34px;font-family:${F};font-size:13px;line-height:19px;font-weight:bold;color:#111111;text-transform:uppercase;letter-spacing:2px;">${sub}</td></tr></table></td></tr>`;
const p = (t, pad = '0 40px 16px 40px', st = 'font-size:16px;line-height:25px;color:#222222;') => `<tr><td align="center" style="padding:${pad};font-family:${F};${st}">${t}</td></tr>`;
const page = ({ hero, heroAlt, label, title, body, sub, button }) => `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f6f6f6;"><tr><td align="center" style="padding:0;"><table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:100%;background-color:#ffffff;font-family:${F};color:#222222;">
<tr><td align="center" bgcolor="#000000" style="background-color:#000000;padding:22px 24px;border-bottom:4px solid #ec1e24;"><a href="https://primesupplements.ro" style="text-decoration:none;"><img src="https://cdn.shopify.com/s/files/1/0917/5138/3415/files/afiliati-logo-prime-alb.png" width="190" alt="Prime Supplements" style="display:block;width:190px;height:auto;border:0;"></a></td></tr>
<tr><td style="padding:0;"><a href="https://primesupplements.ro" style="text-decoration:none;"><img src="${hero}" width="600" alt="${heroAlt}" style="display:block;width:100%;max-width:600px;height:auto;border:0;"></a></td></tr>
<tr><td align="center" style="padding:28px 32px 6px 32px;font-family:${F};font-size:12px;line-height:16px;font-weight:bold;color:#ec1e24;text-transform:uppercase;letter-spacing:3px;">${label}</td></tr>
<tr><td align="center" style="padding:4px 32px 18px 32px;font-family:${H};font-size:34px;line-height:40px;color:#111111;text-transform:uppercase;letter-spacing:1px;">${title}</td></tr>
${body.map((t) => p(t)).join('\n')}
${codeBox(sub)}
${btn(button)}
${grid}
${p('Codul nu se cumulează cu alte coduri. Livrare gratuită peste 300 lei.', '16px 40px 8px 40px', 'font-size:13px;line-height:20px;color:#666666;')}
${p('Echipa Prime Supplements', '8px 40px 28px 40px')}
<tr><td align="center" bgcolor="#000000" style="background-color:#000000;padding:28px 32px;font-family:${F};font-size:12px;line-height:19px;color:#bbbbbb;"><div style="font-size:13px;line-height:20px;color:#ffffff;padding-bottom:12px;">contact@primesupplements.ro · 0775 286 584</div><div style="padding-bottom:12px;">PRIME SPORT SUPPLEMENTS SRL · CUI 46260823 · J32/1155/2022</div><div style="padding-bottom:12px;">Primești acest e-mail pentru că ești abonat la e-mailurile primesupplements.ro. <a href="{{unsubscribe_link}}" style="color:#ffffff;text-decoration:underline;">Nu mai vreau e-mailuri</a> · <a href="https://primesupplements.ro/policies/privacy-policy" style="color:#ffffff;text-decoration:underline;">Politica de confidențialitate</a></div><div>Supliment alimentar. Suplimentele alimentare nu înlocuiesc o dietă variată și echilibrată și un stil de viață sănătos. A nu se depăși doza zilnică recomandată. A nu se consuma de către copii, femeile însărcinate sau care alăptează fără avizul medicului. Consultați medicul înainte de utilizare în caz de afecțiuni sau tratament medicamentos.</div></td></tr>
</table></td></tr></table>
`;
writeFileSync('2026-11-25-late-black-friday-1.html', page({
  hero: 'https://cdn.shopify.com/s/files/1/0917/5138/3415/files/email-mihai-diaconu-crema-de-orez.jpg?v=1792738708',
  heroAlt: 'Sportiv în sala de forță, cu un borcan de cremă de orez Prime Creamy Rice',
  label: 'Late Black Friday · 25–28 noiembrie',
  title: 'Pentru cei care nu au apucat',
  body: [
    'Black Friday-ul nostru s-a încheiat pe 15 noiembrie. Dacă nu ai apucat să comanzi atunci, mai ai o ocazie.',
    'Facem un Late Black Friday: 4 zile, 20 % reducere cu codul <strong>LATEBF20</strong> la produsele din magazin (fără pachete). Cât să-ți faci proviziile pentru iarnă.',
    'Crema de orez Prime Creamy Rice e din nou în stoc, în patru arome: tort de ciocolată, biscuiți cu cremă, plăcintă cu cocos și brioșă cu afine.',
    'Codul e valabil până sâmbătă, 28 noiembrie, la 23:59, și poate fi folosit o singură dată de fiecare client.',
  ],
  sub: '−20 % · 25–28.11',
  button: 'Vreau 20 % reducere',
}));
writeFileSync('2026-11-28-late-black-friday-2.html', page({
  hero: 'https://cdn.shopify.com/s/files/1/0917/5138/3415/files/email-evo-gym-sportiv-sapca-produse.jpg?v=1792738708',
  heroAlt: 'Sportiv cu șapcă, în sala de forță, cu produse Prime',
  label: 'Late Black Friday · ultima zi',
  title: 'Mai ai până diseară',
  body: [
    'Late Black Friday se încheie azi.',
    'Dacă n-ai apucat încă: codul <strong>LATEBF20</strong> îți dă 20 % reducere la produsele din magazin (fără pachete), o singură dată, până azi, 28 noiembrie, la 23:59. De mâine codul nu mai funcționează.',
  ],
  sub: '−20 % · până azi la 23:59',
  button: 'Folosesc codul LATEBF20',
}));
