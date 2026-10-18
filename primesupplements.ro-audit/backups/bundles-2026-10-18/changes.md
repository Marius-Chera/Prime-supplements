# Bundles 18.10.2026
## Link-uri
Titlurile păstrează ®. Shopify a creat automat redirecturi de la link-urile vechi.

| Produs | Link vechi | Link nou |
|---|---|---|
| 15181804831095 | pachet-nitrox3d-creatina-creapure® | pachet-nitrox-3d-creatina-creapure |
| 15182186381687 | fiber-creatina-creapure® | pachet-fiber-creatina-creapure |

## Colecția Reduceri
Colecția /collections/reduceri există deja:
- e automată: tag „reduceri”, iar tipul produsului nu e giftbox_ghost_product;
- are acum 1 produs.

## În așteptare
- Strategia de pachete, după ce proprietarul actualizează prețurile individuale.
- Wi BOGO+ se dezinstalează prin extensie.

## 7 pachete noi (18.10.2026)
Pachetele sunt create prin API, ca bundle-uri native. Au tipul „Pachet” și tag-urile reduceri și pachet. Fiecare are minimum 15% reducere.

| Pachet | Componente | Preț / înainte |
|---|---|---|
| Pre-Workout Power | Nitrox 3D (4 arome) + Creapure 500 g | 309 / 370 |
| Daily Fit | Fiber + Creapure 500 g | 259 / 310 |
| Duo Capsule | Thermo Core + Water Out | 195 / 230 |
| Starter Forță | Prime Whey 2 kg (7 arome) + Creapure 500 g | 455 / 540 |
| Trio Cremă de orez | tort de ciocolată + biscuiți cu cremă + plăcintă cu cocos | 155 / 185 |
| Mic Dejun Proteic | Prime Whey 2 kg (7 arome) + cremă tort de ciocolată + cremă plăcintă cu cocos | 409 / 485 |
| Rutina Zilnică | Omega-3 + Magneziu bisglicinat + Vitamina C | 149 / 180 |

### Imagini
Imaginile sunt generate în img/.

### Pachetele vechi
Cele 3 pachete vechi (aplicația Bundles) sunt arhivate, cu 301 către cele noi.

### Coduri de reducere
- S-a creat colecția ascunsă `eligibile-coduri-reducere` (regula: TYPE != Pachet).
- 289 de coduri „toată comanda” au fost mutate pe această colecție. Lista de dinainte e în coduri-toata-comanda-inainte.txt.
- 218 coduri pe „toate colecțiile” au fost mutate tot pe ea. Lista e în coduri-colectii-inainte.txt; înainte, fiecare avea cele 19–23 de colecții.
- Rezultatul: codurile funcționează pe orice produs, cu excepția pachetelor.
- Funcția automată UpPromote („UpPromote discount function”) nu poate fi modificată din API. Excluderea se setează în UpPromote.

### Colecția Reduceri
- Regula: TYPE = Pachet ȘI tag pachet.
- Are descriere și SEO, apare în meniurile main-menu și main-menu-desktop.

## Încă 5 pachete (18.10.2026)
| Pachet | Componente | Preț / înainte |
|---|---|---|
| Set Hammer 3.0 | tricou oversized Hammer 3.0 (4 mărimi) + pantaloni scurți waffle Hammer 3.0 (5 mărimi) | 245 / 290 |
| Set Antrenament Hammer | maiou Edge (4 mărimi) + pantaloni de trening Hammer 3.0 (4 mărimi) | 229 / 270 |
| Recuperare | EAA (4 arome) + L-glutamină Kyowa (5 arome) | 285 / 340 |
| Mix 9 batoane | 3 × căpșuni + 3 × caramel sărat + 3 × cocos | 64 / 76,50 |
| Starter Începător | Prime Whey 1 kg (7 arome) + Creapure 500 g + Shaker Prime | 335 / 395 |

- Toate pachetele sunt excluse automat din `eligibile-coduri-reducere`, prin tipul Pachet.
- Pantalonii MNX Ribbed Hammer 2.0 white au fost scoși manual din colecția Reduceri, unde rămăseseră din regula veche. Am completat și productType=Îmbrăcăminte, care era gol.
