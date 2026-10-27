# Programe gata făcute – PDF pe e-mail după plată (28.10.2026)

Cererea lui Marius: la programele gata făcute clientul nu mai lasă număr de WhatsApp, ci primește PDF-ul pe e-mail imediat după plată.

## Ce s-a făcut (live pe bp66vh-bq)
1. **Pagina programului** (`sections/main-product.liquid`): la produsele cu eticheta `program-digital` nu mai apare câmpul „Telefon WhatsApp”. În locul lui scrie: „După plată primești PDF-ul programului pe e-mail, la adresa cu care plătești (…). Îl găsești oricând și în contul tău, la „Programele mele”.” Coaching-ul și pregătirea de concurs păstrează câmpul WhatsApp.
2. **Adresa de e-mail**: checkout-ul magazinului cere cont de client (login cu e-mail), deci fiecare comandă are obligatoriu e-mailul clientului. Nu e nevoie de un câmp separat.
3. **E-mailul automat**: Settings → Notifications → Customer notifications → **Order confirmation** → Edit code. La finalul textului principal (înainte de `{% endcapture %}` din `{% capture email_body %}`) e blocul de mai jos. Când comanda conține un program cu eticheta `program-digital` și plata nu e în așteptare, e-mailul de confirmare are, pentru fiecare program, butonul „Descarcă PDF · <numele programului>”.
4. **Contul clientului**: „Programele mele” → „Descarcă PDF” (exista deja, `sections/main-account.liquid`).

PDF-ul vine din Content → Files, cu numele = handle-ul produsului (ex. `program-mens-physique.pdf`). Toate 6 verificate pe 28.10.2026: răspund 200, `application/pdf`.

## Blocul din șablonul Order confirmation
```liquid
  {%- comment -%} Chera Protocol: programele digitale (eticheta program-digital) primesc linkul PDF dupa plata {%- endcomment -%}
  {%- unless has_pending_payment -%}
    {%- assign chera_pdf_count = 0 -%}
    {%- for line in subtotal_line_items -%}{%- if line.product.tags contains 'program-digital' -%}{%- assign chera_pdf_count = chera_pdf_count | plus: 1 -%}{%- endif -%}{%- endfor -%}
    {%- if chera_pdf_count > 0 -%}
      <br><br><strong>Programul tău e gata. Îl descarci de aici:</strong><br>
      {%- for line in subtotal_line_items -%}{%- if line.product.tags contains 'program-digital' -%}
        <a href="{{ shop.url }}/cdn/shop/files/{{ line.product.handle }}.pdf" style="color:#ec1e24;font-weight:bold;text-decoration:underline">Descarcă PDF · {{ line.product.title }}</a><br>
      {%- endif -%}{%- endfor -%}
      Îl găsești oricând și în contul tău de pe site, la „Programele mele”. Spor la antrenamente! – Marius
    {%- endif -%}
  {%- endunless -%}
```

## Cum înlocuiești un PDF după revizuire
Content → Files → caută numele (ex. `program-mens-physique.pdf`) → „…” → **Replace file** și alegi PDF-ul nou. Adresa rămâne aceeași, deci linkul din e-mail și din cont dau automat noul PDF. Nu urca fișierul ca fișier nou (Shopify l-ar redenumi `…_1.pdf` și linkul nu l-ar mai găsi).

## Limite
- Shopify nu atașează fișiere la e-mailuri; se trimite linkul (standard la produsele digitale).
- Linkul PDF-ului e public: oricine are linkul îl poate deschide. Pentru protecție reală ar trebui o aplicație de produse digitale (ex. „Shopify Digital Downloads”, gratuită, dar trimite un e-mail separat) – doar cu acordul tău.
- Blocul nu se vede în „Preview” din admin (comanda de exemplu nu are programe). Se vede la prima comandă reală sau de test cu un program (Bogus Gateway, vezi `../SESIUNI-REZERVARI-GHID.md`).
- Restul e-mailului de confirmare e textul standard Shopify în engleză; dacă vrei, îl traducem separat.
