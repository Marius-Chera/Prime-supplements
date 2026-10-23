# Ghidul de categorie sub produse – temă de probă (23.10.2026)

- Temă de probă (nepublicată): **„Prime – PROBĂ ghiduri categorie (23.10)”**, `gid://shopify/OnlineStoreTheme/194006647159`, copie a temei active „Prime – tema activă (22.10)” (193996554615).
- Problema: textul de categorie din metafield-ul `custom.seo_text` nu apărea pe site. În șabloane exista o secțiune „Rich text” care îl afișa, dar era **dezactivată** și pusă la finalul paginii.
- În tema de probă:
  1. secțiune nouă `sections/ghid-categorie.liquid`, care afișează `custom.seo_text` cu stilul secțiunii „Rich text” a temei și **nu afișează nimic** când metafield-ul e gol (fără spațiu alb);
  2. în `templates/collection.json` și `templates/collection.pudre-proteice.json`, vechea secțiune „Rich text” dezactivată a fost înlocuită cu „Ghid categorie”, pusă **imediat sub produse**. Restul șabloanelor de colecție nu au fost atinse.
- Unde apare ghidul: Pudră proteică (șablonul pudre-proteice), Cremă de orez și Suplimente (șablonul implicit). Celelalte colecții pe șablonul implicit au metafield-ul gol, deci nu se schimbă nimic la ele.
- Ghidul vechi al agenției pentru „Suplimente” (afirmații nepermise: „accelerează recuperarea”, „pudre vegetale”, „arderea grăsimilor”) a fost rescris conform; backup în `backups/colectii-seo-2026-10-23/suplimente-sala-seo_text-before.json`.
- Celelalte colecții cu șabloane proprii (arzătoare, intra-workout, prime-health, vitamine etc.) au tot texte vechi de agenție, unele neconforme. Ele **nu** apar, pentru că secțiunea lor rămâne dezactivată. Trebuie rescrise înainte de a le activa.
- Previzualizare: https://primesupplements.ro/collections/pudra-proteica?preview_theme_id=194006647159
- Publicarea temei o face proprietarul, după aprobare. API-ul nu publică teme.
