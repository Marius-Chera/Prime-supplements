# Prime Puncte – lista pentru ziua pornirii live

Totul de aici se face **doar după „da”-ul lui Marius pentru pornire**. Până atunci aplicația rămâne în mod umbră (vezi `APLICATIE-PUNCTE-2026-11-25.md`).

## Ce e deja gata (25.11.2026)
- aplicația instalată, webhook-urile abonate, Judge.me și theMarketer conectate;
- deciziile luate (§5b din document), regulamentul (`REGULAMENT-PRIME-PUNCTE.md`), e-mailurile aprobate;
- politica de confidențialitate publicată cu secțiunea Prime Puncte (25.11).

## Pașii, în ordine
1. **Testul în checkout**, cu acordul explicit al lui Marius (CLAUDE.md: „Nu intra în checkout pe site”), fără nicio comandă: §7 din `APLICATIE-PUNCTE-2026-11-25.md`.
2. **Data de pornire:** în Setări, `startAt` e acum 26.09.2026 (retroactiv 60 de zile față de 25.11). Dacă pornirea e mai târziu, decide Marius: păstrăm 26.09 sau mutăm la „ziua pornirii minus 60 de zile”.
3. **`MODE` = `live`** în `prime-puncte/wrangler.jsonc`, apoi `node scripts/wr.mjs deploy`.
4. **Linkul „Punctele mele”** în cele două meniuri (decizia lui Marius, 25.11: „La pornirea live”). Mutațiile sunt mai jos; se trimit cu conectorul Shopify (`menuUpdate`). Atenție: `menuUpdate` **înlocuiește toată lista**, așa că se trimit și elementele existente, cu id-urile lor. Înainte se recitesc meniurile (`menus { … }`), ca lista să fie cea de atunci, nu cea din 25.11.
5. Verificare pe site: linkul din subsol și din contul de client, pagina `/apps/puncte` logat și nelogat, regulamentul.
6. JURNAL, ISTORIC.

### 4a. Meniul contului de client (`customer-account-main-menu`, gid://shopify/Menu/294386237815)
```graphql
mutation M($id: ID!, $title: String!, $items: [MenuItemUpdateInput!]!) {
  menuUpdate(id: $id, title: $title, items: $items) { menu { id items { title url } } userErrors { field message } }
}
```
```json
{
  "id": "gid://shopify/Menu/294386237815",
  "title": "Customer account main menu",
  "items": [
    { "id": "gid://shopify/MenuItem/730723320183", "title": "Orders", "type": "CUSTOMER_ACCOUNT_PAGE", "resourceId": "gid://shopify/CustomerAccountPage/223869698423" },
    { "id": "gid://shopify/MenuItem/799294816631", "title": "Profile", "type": "CUSTOMER_ACCOUNT_PAGE", "resourceId": "gid://shopify/CustomerAccountPage/223869731191" },
    { "title": "Punctele mele", "type": "HTTP", "url": "https://primesupplements.ro/apps/puncte" }
  ]
}
```

### 4b. Subsolul, „Linkuri utile” (`meniu-footer`, gid://shopify/Menu/296171798903)
```json
{
  "id": "gid://shopify/Menu/296171798903",
  "title": "Meniu Footer",
  "items": [
    { "id": "gid://shopify/MenuItem/735131992439", "title": "Logare cont", "type": "HTTP", "url": "https://primesupplements.ro/account/login" },
    { "title": "Punctele mele", "type": "HTTP", "url": "https://primesupplements.ro/apps/puncte" },
    { "id": "gid://shopify/MenuItem/735132025207", "title": "Despre Noi", "type": "PAGE", "resourceId": "gid://shopify/Page/692417757559" },
    { "id": "gid://shopify/MenuItem/735132057975", "title": "Blog", "type": "BLOG", "resourceId": "gid://shopify/Blog/116352287095" },
    { "id": "gid://shopify/MenuItem/735132090743", "title": "Contact", "type": "PAGE", "resourceId": "gid://shopify/Page/691260457335" },
    { "id": "gid://shopify/MenuItem/836468474231", "title": "★ Recenzii pe Trustpilot", "type": "HTTP", "url": "https://www.trustpilot.com/review/primesupplements.ro" }
  ]
}
```
(„Punctele mele” stă imediat după „Logare cont”, pentru că ține de contul clientului.)

## Dacă trebuie oprit după pornire
`MODE` = `shadow` + deploy: nu se mai creează coduri noi. Codurile deja generate rămân valabile până expiră. Din meniuri se scoate linkul (aceeași mutație, fără elementul „Punctele mele”).
