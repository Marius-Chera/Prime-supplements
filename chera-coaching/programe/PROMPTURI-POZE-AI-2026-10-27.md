# Prompturi pentru pozele AI ale celor 6 programe (27.10.2026)

Cerut de proprietar: poze generate cu AI, sugestive pentru fiecare plan. Se generează într-o aplicație de imagini (ChatGPT, Gemini, Midjourney etc.), apoi fișierele vin în aplicația de pe calculator, unde `programe/genereaza-poze.mjs` pune peste ele ștampila, numele programului și prețul, ca să arate la fel ca restul site-ului.

Format: vertical 4:5 (1200×1500 sau mai mare). Fără text, fără logo-uri, fără fețe recognoscibile de persoane reale.

## Textul de lipit (o singură dată, înainte de prompturi)

Generează 6 fotografii separate, în același stil, pentru un site de coaching de culturism (negru, roșu, alb). Stil comun pentru toate: fotografie realistă, sală de forță întunecată, fundal aproape negru, o singură sursă de lumină laterală dură plus o lumină de contur roșie (#e1251b), contrast mare, granulație fină de film, profunzime mică de câmp. Format vertical 4:5. Fără niciun text, fără logo-uri sau mărci pe haine și echipamente, fără fețe clar vizibile (persoana e din spate, din profil în umbră sau cadrul e tăiat sub ochi). Lasă treimea de jos a imaginii mai întunecată și mai goală, pentru că pun eu text acolo. Dă-mi fiecare imagine separat, la rezoluția maximă.

1. **Program Bikini – fesieri de 3 ori pe săptămână:** o sportivă de fitness atletică, văzută din spate-lateral, la hip thrust cu bara pe banca de sală, fesieri și umeri bine definiți, echipament sport negru simplu, lumină roșie de contur pe linia spatelui.
2. **Program Classic Physique – avansați:** un culturist clasic, proporții estetice, talie mică, umeri și pulpe pline, făcând poza „front double biceps” în sala întunecată, văzut din trei sferturi, fața în umbră, pantaloni scurți de posing negri.
3. **Program Men's Physique:** un sportiv cu spate foarte lat și talie mică, din spate, la tracțiuni la bară fixă, în momentul de sus, lumina cade pe dorsali, pantaloni scurți lungi tip boardshorts negri.
4. **Program Bodybuilding Avansat:** un culturist masiv, din spate, poza „back double biceps” sub un spot de lumină, densitate musculară foarte mare, venele vizibile, fundal negru cu ceață ușoară.
5. **Program Intensitate Maximă:** prim-plan cu mâini cu cretă strângând o bară olimpică încărcată cu discuri negre, praf de cretă în aer luminat de roșu, senzație de efort maxim, o singură repetare grea.
6. **Program Hipertrofie – 5 zile:** un sportiv bine făcut, din profil în umbră, între serii, ținând gantere grele lângă rastelul de gantere, pompaj vizibil pe brațe și umeri, lumină roșie de contur.

## După generare
Salvează cele 6 imagini cu numele: `bikini.jpg`, `classic.jpg`, `mens.jpg`, `bodybuilding.jpg`, `intensitate.jpg`, `hipertrofie.jpg` și pune-le în `D:\Prime Supplements\chera-programe-ai\` (sau atașează-le în conversația din aplicația de pe calculator). De acolo le compun cu ștampila și le urc pe produse.

## Text pentru extensia Claude din Brave (Gemini)

Deschide https://gemini.google.com (sunt deja logat; dacă cere logare, oprește-te și spune-mi). Nu introduce parole, coduri sau date de card, nu cumpăra niciun abonament, nu accepta termeni noi fără să mă întrebi.

1. Pornește o conversație nouă. Generează pe rând, câte un mesaj pentru fiecare, cele 6 imagini de mai jos. Fiecare mesaj începe cu stilul comun și continuă cu descrierea imaginii.
   Stil comun: „Generează o fotografie realistă, format vertical 4:5, sală de forță întunecată, fundal aproape negru, o singură lumină laterală dură plus o lumină de contur roșie (#e1251b), contrast mare, granulație fină de film, profunzime mică de câmp. Fără niciun text, fără logo-uri sau mărci, fără fețe clar vizibile (persoana din spate, din profil în umbră sau cadrul tăiat sub ochi). Treimea de jos mai întunecată și goală.”
   - bikini: o sportivă de fitness atletică, din spate-lateral, la hip thrust cu bara pe bancă, fesieri și umeri definiți, echipament sport negru simplu, lumină roșie de contur pe linia spatelui.
   - classic: un culturist clasic, talie mică, umeri și pulpe pline, poza „front double biceps”, din trei sferturi, fața în umbră, pantaloni scurți de posing negri.
   - mens: un sportiv cu spate foarte lat și talie mică, din spate, la tracțiuni la bară fixă, sus, lumina pe dorsali, boardshorts negri.
   - bodybuilding: un culturist masiv, din spate, poza „back double biceps” sub un spot, densitate musculară mare, vene vizibile, ceață ușoară.
   - intensitate: prim-plan cu mâini cu cretă pe o bară olimpică încărcată cu discuri negre, praf de cretă luminat de roșu, efort maxim.
   - hipertrofie: un sportiv bine făcut, din profil în umbră, între serii, cu gantere grele lângă rastel, pompaj pe brațe și umeri, contur roșu.
2. Dacă o imagine are text, logo-uri, o față clară sau mâini/degete deformate, cere-i lui Gemini s-o refacă (maximum 2 încercări).
3. Descarcă fiecare imagine la rezoluția maximă (butonul de descărcare de pe imagine), în Downloads. Notează pentru fiecare numele fișierului descărcat și cărui program îi corespunde (bikini, classic, mens, bodybuilding, intensitate, hipertrofie).
4. La final dă-mi lista: program → numele fișierului din Downloads.
