# Metafield pentru pagina vizuală – definiție și scriere

**15.11.2026 (pilot aprobat de Marius):** definiția e creată (`gid://shopify/MetafieldDefinition/543946965367`), iar metafield-ul e scris pe 3 produse (Recovery BCAA, Creatină Creapure, Prime Whey 2 kg). Secțiunea e doar pe tema nepublicată „Prime – PILOT pagină vizuală (15.11)” (`194315649399`). Log: `applied/logs/pagina-vizuala/pilot-2026-11-15.json`.

## Definiția (o singură dată, cu aprobarea lui Marius)

Un singur metafield JSON pe produs, nu 10 câmpuri separate: se scrie dintr-o bucată (un apel pe produs), se poate
reveni ușor la versiunea veche (backup = fișierul JSON din repo) și nu rămân produse cu jumătate de date.

| Câmp | Valoare |
|---|---|
| Owner | PRODUCT |
| Namespace / key | `prime` / `pagina_vizuala` |
| Tip | `json` |
| Nume în admin | Pagină vizuală (JSON) |
| Acces storefront | nu e nevoie (Liquid citește oricum metafield-urile produsului) |

```graphql
mutation {
  metafieldDefinitionCreate(definition: {
    name: "Pagină vizuală (JSON)"
    namespace: "prime"
    key: "pagina_vizuala"
    type: "json"
    ownerType: PRODUCT
    description: "Datele secțiunii Prime – pagină vizuală. Se generează din pagina-produs-vizuala/date/<handle>.json, nu se editează de mână."
  }) {
    createdDefinition { id }
    userErrors { field message }
  }
}
```

De ce nu metaobjects: ar fi mai ușor de editat în admin (câte un rând pe card), dar noi nu edităm de mână,
edităm fișierele din repo (la fel ca la `custom.beneficii_cheie` & co. din octombrie). Metaobjects ar însemna
3–4 definiții, referințe și ~10 apeluri pe produs în loc de unul. Dacă ulterior colegii vor să editeze din admin,
se poate trece pe metaobjects fără să schimbăm designul (doar secțiunea citește altfel).

## Scrierea în masă (după aprobare, pe loturi de 25)

```graphql
mutation set($m: [MetafieldsSetInput!]!) {
  metafieldsSet(metafields: $m) { metafields { id key } userErrors { field message code } }
}
```
`$m` = până la 25 de elemente `{ ownerId: "gid://shopify/Product/…", namespace: "prime", key: "pagina_vizuala", type: "json", value: "<JSON ca text>" }`.

Ordinea, la fel ca la conținutul din octombrie (`applied/product-content/`):
1. `node pagina-produs-vizuala/scripts/valideaza-pagina-vizuala.mjs pagina-produs-vizuala/date` → zero erori (blocant: „DE VERIFICAT”, engleză, mențiuni de sănătate neautorizate, cuvinte interzise, cifre care nu apar în datele de etichetă).
2. Lotul 1 = 3 produse → scriere → citire înapoi și comparare (JSON egal) → verificare vizuală pe tema duplicat (`?preview_theme_id=…`), desktop + mobil.
3. OK de la Marius → restul în loturi de 25, cu log în `applied/logs/pagina-vizuala/`.
4. Pe tema live intră doar după ce Marius aprobă designul (secțiunea + CSS-ul, prin duplicat → Publish).

Alternativa fără API: importul CSV (Matrixify sau importul de produse Shopify) merge, dar JSON-ul pus într-o celulă CSV
se strică ușor (ghilimele dublate, diacritice în Excel). Recomand API-ul (conectorul Shopify sau Admin GraphQL), pe care îl folosim deja.
