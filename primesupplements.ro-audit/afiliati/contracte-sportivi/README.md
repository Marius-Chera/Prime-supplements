# Contracte sportivi (afiliați) – refăcute pe 28.10.2026

Cerința proprietarului: comisionul strâns se dă **persoanelor fizice doar ca voucher**, pe care sportivul îl activează din **UpPromote Affiliates**; **numai PFA / II / SRL primesc bani**, prin transfer bancar, după ce emit factură pentru comision. Formulare juridică corectă.

## Fișiere
| Contract | Pentru cine | Comisionul |
|---|---|---|
| `CONTRACT PRIME PF` (.docx / .pdf) | persoană fizică, colaborare normală | doar voucher, generat din UpPromote la sold aprobat ≥ 500 lei |
| `CONTRACT PRIME PF PROBA` | persoană fizică, perioadă de probă | la fel + voucher unic la semnare |
| `CONTRACT PRIME SRL-PFA` | PFA / II / SRL, colaborare normală | bani, prin transfer, pe factură, de la 500 lei |
| `CONTRACT PRIME SRL-PFA PROBA` | PFA / II / SRL, probă 3 luni | la fel; contractul încetează dacă pragul de vânzări nu e atins |

Originalele (6 PDF-uri, dintre care 2 dubluri) sunt în `D:\Prime Supplements\contracte sportivi\`; variantele noi și în `D:\Prime Supplements\contracte sportivi\refacute 2026-10-28\`.
Regenerare: `node build-contracte.mjs <folder>` apoi `powershell -File converteste-word.ps1 -Dir <folder>` (Word face DOCX + PDF, cu logo în antet).

## Ce s-a schimbat față de originale
- Cap. IV „Sponsorizarea” devine „Remunerația și beneficiile prestatorului”: plata pentru servicii nu e sponsorizare (Legea 32/1994 are alt regim fiscal).
- PF: comision exclusiv în natură (voucher), fără numerar sau transfer, nici la încetare; aprobat în UpPromote până pe 15; voucherul îl generează sportivul din contul de afiliat; plan B: Prime emite voucherul în 5 zile lucrătoare dacă aplicația nu permite; la încetare soldul se poate converti în 30 de zile chiar sub 500 lei; penalitățile tot în voucher; clauză fiscală (venit în natură; Prime reține impozitul doar dacă legea îl face plătitor de venit).
- PFA/SRL: aprobare în UpPromote până pe 5, situația din aplicație = baza de facturare, factură (RO e-Factura după caz, plus TVA dacă e plătitor), plată în 10 zile de la primire, fără numerar, regularizare la retururi, plata soldului la încetare.
- Baza comisionului definită: valoarea comenzii după reducere, fără transport, doar comenzi livrate; fără comision la ofertele excluse în UpPromote (pachetele din Reduceri).
- Noi: definiții (Cod, Aplicație, Comision, Voucher), marcarea postărilor ca publicitate, fără mențiuni de sănătate neautorizate (Reg. 1924/2006), interdicția site-urilor de cupoane și a auto-comenzilor, GDPR, încetarea nu anulează comisionul aprobat, semnătură electronică permisă.
- Corecturi: site-ul era scris greșit „primesupplement.ro”; voucherul lunar era „generat de PRESTATOR” (acum îl emite Prime); temeiul legal (art. 1763–1765 Cod civil = contractul de schimb) completat cu art. 1166 și 1851 (prestări servicii); „contractul se anulează” la probă devine „încetează de drept”; s-au scos semnătura digitală și ștampila „FINAL”.

## De verificat de proprietar înainte de folosire
1. Contabilul: regimul fiscal al voucherelor date persoanelor fizice (impozit reținut de Prime sau declarat de sportiv) – art. 4.5 din contractele PF acoperă ambele variante.
2. UpPromote: dacă baza de calcul din aplicație include TVA și dacă sportivul poate transforma singur soldul în voucher (store credit / card cadou); dacă nu, se folosește plan B din art. 4.3 alin. (5).
3. Pragul de 3.000 lei/lună: UpPromote înregistrează comisionul automat, deci în lunile sub prag comisionul trebuie respins manual în aplicație (sau se renunță la prag pentru comision).
4. La SRL-PFA probă: pragul de vânzări pe perioada de probă e lăsat necompletat (și în original era).
5. Aviz de avocat recomandat înainte de semnare, mai ales pentru penalitățile de 0,5%/zi care pot depăși datoria și daunele de 5.000 lei la denunțare (preluate neschimbate din original).
