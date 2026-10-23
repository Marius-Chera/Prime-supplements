# Ghidurile de categorie sub produse – temă de probă (23.10.2026)

- Temă de probă (nepublicată): **„Prime – PROBĂ ghiduri categorie (23.10)”**, `gid://shopify/OnlineStoreTheme/194006647159`, copie a temei active „Prime – tema activă (22.10)” (193996554615).
- Problema: textul de categorie din metafield-ul `custom.seo_text` nu apărea pe site. Șabloanele aveau o secțiune „Rich text” care îl afișa, dar era **dezactivată**, probabil pentru că textele vechi ale agenției aveau afirmații nepermise.

## Ce s-a schimbat în tema de probă
1. `snippets/ghid-categorie.liquid` (nou): afișează `custom.seo_text` imediat **sub grila de produse**, doar pe prima pagină de rezultate. Când metafield-ul e gol nu afișează nimic.
2. `snippets/schema-collection.liquid`: randează la început `ghid-categorie`. Snippet-ul e randat de `main-collection` după produse pe **toate** șabloanele de colecție, așa că ghidul apare peste tot fără modificarea celor 13 șabloane.
3. `templates/collection.json` și `templates/collection.pudre-proteice.json`: scoasă secțiunea „Rich text” dezactivată (ghidul vine acum din snippet).
4. `sections/ghid-categorie.liquid` a rămas în temă, dar nu mai e folosit. API-ul nu permite ștergerea fișierelor de temă; se poate șterge din editorul de cod, opțional.

## Ghidurile (metafield `custom.seo_text`, 23.10)
Rescrise conform (doar date de pe etichetă și mențiuni de sănătate autorizate în UE) pentru 17 colecții: Pudră proteică, Cremă de orez, Suplimente, Creatină, Aminoacizi, Pre-workout, Shoturi, Intra-workout, Batoane proteice, Vitamine și minerale, Prime Health, Arzătoare de grăsimi, Alimente sănătoase, Băuturi, Accesorii, Îmbrăcăminte, Haine MNX. Colecțiile tehnice (Reduceri, Cele mai vândute, Lansate recent, all etc.) nu au ghid.
Textele vechi ale agenției: `backups/colectii-seo-2026-10-23/toate-colectiile-seo_text-before.json` (+ `before.json`, `suplimente-sala-seo_text-before.json`).

## Previzualizare și publicare
- https://primesupplements.ro/collections/pudra-proteica?preview_theme_id=194006647159 (orice colecție, cu același parametru).
- Publicarea temei o face proprietarul (Shopify → Magazin online → Teme → „…” → Publică), după aprobare. API-ul nu publică teme.
