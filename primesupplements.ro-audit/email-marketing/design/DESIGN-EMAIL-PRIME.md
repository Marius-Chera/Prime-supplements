# Designul comun al e-mailurilor Prime Supplements (aprobat de proprietar, 23.10.2026)

Se aplică la ABSOLUT TOATE e-mailurile care pleacă din theMarketer: fluxuri (Welcome, coș, reaprovizionare etc.), campanii, newsletter, stoc revenit și e-mailurile pentru sportivii afiliați. Referința vizuală aleasă de proprietar: e-mailul „Bine de știut înainte să comanzi” (fluxul de coș).

## Elemente fixe
| Element | Regula |
|---|---|
| Antet | bandă neagră #000000, logo-ul alb oficial (HTML: `https://cdn.shopify.com/s/files/1/0917/5138/3415/files/afiliati-logo-prime-alb.png`, 190 px; în editorul theMarketer: `logo-site-alb.svg`, 200 px), linie roșie 4 px #ec1e24 dedesubt |
| Imagine principală | 600 px lățime (fișier 1200 px, sub 200 KB), imediat sub antet, cu text alternativ corect |
| Etichetă mică | roșu #ec1e24, 12 px, bold, MAJUSCULE, spațiere 3 px |
| Titlu | Impact (rezervă Arial Black), 28–36 px, #111, MAJUSCULE |
| Text | Poppins (rezervă Arial), 15–16 px, #222, centrat |
| Carduri | fundal #f6f6f6, numele produsului bold 15 px #111, prețul în MAJUSCULE + prețul pe porție/capsulă |
| Buton principal | unul singur, roșu #ec1e24, text alb 14–15 px bold MAJUSCULE, colțuri 3 px, padding 14–16 px × 20–30 px |
| Subsol | negru, logo alb mic, text #bbb 12 px, link-uri albe, datele firmei complete, dezabonare vizibilă, mențiunea legală pentru suplimente |
| Semnătură | „Echipa Prime Supplements” (Prime e o companie cu echipă, nu brandul unei persoane) |
| Interzis | preț tăiat, coduri noi, cuvântul „ofertă”, urgență falsă, superlative, mențiuni de sănătate neautorizate, cifre neverificabile (ex. număr de comenzi) |

## Imagini
- **Clienți:** cam 50% fotografii reale din ședințele foto și 50% imagini generate cu AI cu produsele Prime (stilul imaginilor de blog). Nu repetăm aceleași persoane în e-mailuri apropiate.
- **Afiliați:** doar imagini AI cu produsele Prime (fișierele `blog-*` din Shopify Files sau imagini noi generate în același stil), diferite de la lună la lună.
- **Persoane care nu mai colaborează cu Prime:** nu apar în niciun e-mail. Fotografia de grup de la Evo Gym (patru sportive cu fiole, `HILA_13_13_13_44_0669.jpg`) e exclusă: a doua din stânga (top verde) și ultima din dreapta nu mai sunt la Prime. Orice alt cadru cu ele e exclus.
- **Calitate:** fiecare imagine e verificată la mărire înainte de trimitere: fără margini zimțate, fără halou alb, fără bucăți lipsă (problemă întâlnită la decupajul borcanelor albe).

## Fotografii reale încărcate pentru e-mailuri (Shopify Files)
| Fișier | Conținut | Folosit în |
|---|---|---|
| `email-evo-gym-sportiva-rosu.jpg` (și același cadru la `email-evo-gym-echipa-sportive-prime.jpg`, temporar) | sportivă în maiou roșu Prime | Welcome E1 |
| `email-evo-gym-sportiv-proteina.jpg` | sportiv tatuat cu Nitrox | Welcome E2 |
| `sedinta-foto-sala-kettlebell-prime-whey.jpg` | Ana Savici, kettlebell, Prime Whey | Reaprovizionare |
| `email-evo-gym-cuplu-prime-whey.jpg`, `email-evo-gym-sportiv-whey-rosu.jpg`, `email-evo-gym-sportiv-sapca-produse.jpg`, `email-mihai-diaconu-crema-de-orez.jpg` | alte cadre | rezervă pentru campanii și newsletter |

Sursa fotografiilor: `D:\Prime Supplements` pe calculatorul proprietarului (Shooting foto evo gym, ana savici, Mihai Diaconu, Poze constanta).

## Cum se construiește
- **Fluxuri fără blocuri dinamice** (ex. Welcome): HTML complet din `email-marketing/fluxuri/`, importat în editorul theMarketer cu „Import HTML”. **Fără comentarii HTML** (`<!-- -->`): editorul le afișează ca text.
- **Fluxuri cu blocuri dinamice** (coș, reaprovizionare): se editează blocurile în editor (text Poppins, butoane roșii MAJUSCULE, subsol negru cu text personalizat).
- **Campanii și stoc revenit:** HTML ca `email-marketing/campanii/2026-10-stoc-revenit-d3-k2.html`.
- **Afiliați:** șabloanele din `afiliati/sabloane/` (folosite automat de rutina lunară).
- **Test obligatoriu:** orice e-mail nou sau modificat se trimite întâi la marius.chera@yahoo.com și adelina.chera@gmail.com.
