# Pozele „studio alb” puse în magazin (16.11.2026)

Cerut de Marius: „pune toate pozele noi in magazin sa vedem cum arata si daca imi plac iti scriu verdictul aici”.

## Ce s-a făcut
- **43 de poze înlocuite pe loc** cu `fileUpdate` (`originalSource` = fișierul din `upload/`, servit de la un commit fix de pe GitHub). Media ID-urile, pozițiile în galerie, textul alternativ și legăturile cu aromele (variantele) au rămas neschimbate. Am verificat: selectarea aromei Toffee Chocolate la Prime Whey 2 kg arată poza corectă.
- Produse: Glycerol Max Pump, Potassium Complex, Silimarină, Spirulină, Nattokinază, Prime Whey Go (8), Prime Whey 2 kg (13), Prime Whey 1 kg (5), Daily Vitamin Formula (3), Combat Pro 2.0 (3), Nitrox No-Stim (3), Fiber (3).
- Potrivirea s-a făcut după numele fișierului: pozele din magazin aveau aceleași nume ca fișierele lui Hila (`ALL_MERCH_3_01.jpg` = `ALL MERCH 3 01.jpg` etc.). Lista completă e în `manifest-sursa.json` (`[mediaId, produs, urlVechi, fisierNou]`).
- **Nu au fost urcate** (n-au corespondent în magazin): `Produse noi hila/ALL MERCH2.png` (Fiber, acoperit de setul din iunie) și `ALL MERCH15.png` (grup de 4 flacoane).

## Copia de siguranță
Pozele vechi, exact cum erau în magazin: `D:\Prime Supplements\backup-poze-magazin-2026-11-16\` (43 de fișiere, 50 MB), index în `backup-index.json`.

## Cum se pune înapoi (dacă Marius nu le vrea)
1. Copiezi fișierele din backup în `magazin/restaurare/` (aceleași nume), faci commit și push.
2. Rulezi `fileUpdate` cu `originalSource` = `https://raw.githubusercontent.com/Marius-Chera/Prime-supplements/<SHA>/primesupplements.ro-audit/analiza-poze-genius/magazin/restaurare/<nume>` pentru fiecare `id` din `backup-index.json`.
3. Verifici că `image.width` revine la dimensiunea veche (2400 sau 3500 px).
Se poate face și pe bucăți (doar produsele care nu plac).
