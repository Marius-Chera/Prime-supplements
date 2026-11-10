# Pozele din ședințele foto – sursă și evidență

**Regulă de la proprietar (10.11.2026):** sursa pozelor reale pentru articolele de pe site este folderul `D:\Prime Supplements` de pe calculatorul lui. Acolo urcă mereu pozele de la ședințele foto noi. Claude alege din ele, le urcă în Shopify Files cu numele `sedinta-foto-…` și de acolo le folosesc articolele (rutina zilnică de blog le găsește singură, vezi `GHID-REDACTIONAL.md`, secțiunea 4c).

## Cum se lucrează când apar poze noi (din aplicația de pe calculator)
1. Compară folderele din `D:\Prime Supplements` cu tabelele de mai jos (folder nou sau fișiere care nu apar aici = poze noi).
2. Fă planșe cu miniaturi și uită-te la ele; alege cadrele clare, cu produsul lizibil, fără dubluri apropiate. Prioritate: produse care nu au încă nicio poză de ședință.
3. Redimensionează la 2000 px pe latura lungă, JPEG calitate 88 (System.Drawing din PowerShell; pe PC nu există Python).
4. Nume: `sedinta-foto-<loc>-<produs sau scenă>-<nr>.jpg`, cu `<loc>` = `sala`, `plaja` sau `exterior`. Text alternativ în română, care descrie ce se vede și numește produsul.
5. Urcare: `stagedUploadsCreate` → POST multipart → `fileCreate` (conectorul Shopify). Verifică `fileStatus: READY`.
6. Adaugă rândurile în tabelele de mai jos și treci în `JURNAL.md`.

## Ce NU se urcă
- Cadre cu persoane care nu mai colaborează cu Prime (vezi `email-marketing/design/DESIGN-EMAIL-PRIME.md`). Confirmat de proprietar pe 10.11.2026: sportiva blondă în negru de la Evo Gym este soția lui, Paula Adelina Chera, și colaborează cu Prime; cadrele cu sportiva în echipament alb se pot folosi și ele.
- Poze de studio pe fond alb sau gri (`Poze jpg silviu popa produse studio`, `Hila poze noi 12 iunie`, `Produse noi hila`, `Creatina Micronizata + plicuri poze`, `Crema de orez poze`, `Randari Produse`): sunt pozele de produs de pe site, nu poze de ședință.
- Haine (`MNX POZELE LOR`, `colectie noue Prime By MNX`, `tricouri colorate`, `Poze tricouri noi Geo`): nu sunt pentru articolele despre suplimente.
- Costume de baie și cadre prea decoltate: nu se potrivesc cu tonul articolelor.

## Stare la 10.11.2026
126 de poze `sedinta-foto-*` în Shopify Files: 35 urcate pe 13–15.10 (10 din sală, 25 de la Constanța) și 91 urcate pe 10.11 (tabelele de mai jos; ultimele 12 după confirmarea proprietarului).

Produse care au acum poze de ședință și nu aveau: cremă de orez (Creamy Rice), creatină (Creatine Creapure), Cluster, Complete Collagen, Thermo Core, Combat Pro 2.0, EAA, Recovery, Silymarin, Spirulina, Potassium Complex, L-Carnitine, plicuri Prime Whey, Glycerol Max Pump cu sportiv. În plus, 8 cadre de antrenament fără produs (pentru articolele despre exerciții).

Încă fără poze de ședință: Frutilu, unturile de arahide/migdale/caju, omega-3 (apare doar într-un cadru de grup), multivitaminele și restul gamei Prime Health în mâna unui sportiv, batoanele în sală.

## Pozele urcate pe 10.11.2026
### ana savici (23)

| Fișier în Shopify Files | Fișier sursă |
|---|---|
| `sedinta-foto-sala-cluster-1.jpg` | `hila_1119_154233_3477.jpg` |
| `sedinta-foto-sala-cluster-2.jpg` | `hila_1119_154241_3482.jpg` |
| `sedinta-foto-sala-cluster-3.jpg` | `hila_1119_165207_4406.jpg` |
| `sedinta-foto-sala-cluster-shaker-de-sus.jpg` | `hila_1119_165057_4368.jpg` |
| `sedinta-foto-sala-complete-collagen-1.jpg` | `hila_1119_164143_4262.jpg` |
| `sedinta-foto-sala-complete-collagen-2.jpg` | `hila_1119_164135_4258.jpg` |
| `sedinta-foto-sala-fandare-instant-oats-1.jpg` | `hila_1119_154822_3501.jpg` |
| `sedinta-foto-sala-franghii-cluster-1.jpg` | `hila_1119_162949_4072.jpg` |
| `sedinta-foto-sala-franghii-cluster-shaker-2.jpg` | `hila_1119_163344_4185.jpg` |
| `sedinta-foto-sala-gantera-instant-oats-3.jpg` | `hila_1119_155003_3555.jpg` |
| `sedinta-foto-sala-genuflexiune-instant-oats-2.jpg` | `hila_1119_154848_3514.jpg` |
| `sedinta-foto-sala-glycerol-max-pump-shaker-1.jpg` | `hila_1119_160545_3672.jpg` |
| `sedinta-foto-sala-nitrox-no-stim-3.jpg` | `hila_1119_155906_3612.jpg` |
| `sedinta-foto-sala-plic-prime-whey-2.jpg` | `hila_1119_161824_3972.jpg` |
| `sedinta-foto-sala-plic-prime-whey-3.jpg` | `hila_1119_162039_4000.jpg` |
| `sedinta-foto-sala-plicuri-prime-whey-1.jpg` | `hila_1119_155420_3581.jpg` |
| `sedinta-foto-sala-shaker-prime-1.jpg` | `hila_1119_160644_3721.jpg` |
| `sedinta-foto-sala-shaker-prime-2.jpg` | `hila_1119_160823_3776.jpg` |
| `sedinta-foto-sala-shaker-prime-3.jpg` | `hila_1119_164050_4239.jpg` |
| `sedinta-foto-sala-shaker-prime-prosop-4.jpg` | `hila_1119_165421_4450.jpg` |
| `sedinta-foto-sala-thermo-core-1.jpg` | `hila_1119_164329_4276.jpg` |
| `sedinta-foto-sala-thermo-core-water-out-1.jpg` | `hila_1119_161509_3916.jpg` |
| `sedinta-foto-sala-thermo-core-water-out-2.jpg` | `hila_1119_161611_3939.jpg` |

### Mihai Diaconu crema de orez (6)

| Fișier în Shopify Files | Fișier sursă |
|---|---|
| `sedinta-foto-sala-crema-de-orez-1.jpg` | `401A42E7-A61D-48AE-A2B3-F8BF132CAF44.jpeg` |
| `sedinta-foto-sala-crema-de-orez-2.jpg` | `77F3CC99-23F9-4FCD-B1C3-47F064B307B4.jpeg` |
| `sedinta-foto-sala-crema-de-orez-3.jpg` | `838AD9BD-5624-4F94-8AD2-265206A836D0.jpeg` |
| `sedinta-foto-sala-crema-de-orez-4.jpg` | `925418A3-C43C-4009-9F5D-A9BDE6AF8A8A.jpeg` |
| `sedinta-foto-sala-crema-de-orez-5.jpg` | `96606008-97A8-44F5-BB1A-1BAB7A9850B4.jpeg` |
| `sedinta-foto-sala-crema-de-orez-6.jpg` | `DD4455EC-4966-4251-8F99-DC4DA06FAF8E.jpeg` |

### Shooting foto evo gym\shooting evo gym (27)

| Fișier în Shopify Files | Fișier sursă |
|---|---|
| `sedinta-foto-sala-antrenament-biceps-gantera-1.jpg` | `HILA_13_14_11_19_1089.jpg` |
| `sedinta-foto-sala-antrenament-cabluri-piept-1.jpg` | `HILA_13_14_19_41_1157.jpg` |
| `sedinta-foto-sala-antrenament-presa-piept-1.jpg` | `HILA_13_15_44_49_1814.jpg` |
| `sedinta-foto-sala-antrenament-tractiuni-helcometru-1.jpg` | `HILA_13_14_14_46_1119.jpg` |
| `sedinta-foto-sala-antrenament-tractiuni-spate-1.jpg` | `HILA_13_15_33_05_1755.jpg` |
| `sedinta-foto-sala-antrenament-umeri-gantere-1.jpg` | `HILA_13_15_40_31_1798.jpg` |
| `sedinta-foto-sala-cuplu-prime-whey-1.jpg` | `HILA_13_13_21_07_0718.jpg` |
| `sedinta-foto-sala-eaa-1.jpg` | `HILA_13_12_35_07_0381.jpg` |
| `sedinta-foto-sala-eaa-recovery-aparat-1.jpg` | `HILA_13_13_59_43_0961.jpg` |
| `sedinta-foto-sala-glycerol-max-pump-2.jpg` | `HILA_13_14_21_26_1176.jpg` |
| `sedinta-foto-sala-nitrox-3d-1.jpg` | `HILA_13_15_09_47_1526.jpg` |
| `sedinta-foto-sala-nitrox-3d-2.jpg` | `HILA_13_15_56_29_1930.jpg` |
| `sedinta-foto-sala-nitrox-no-stim-4.jpg` | `HILA_13_15_03_17_1447.jpg` |
| `sedinta-foto-sala-produse-capsule-omega-silymarin-spirulina-1.jpg` | `HILA_13_17_00_18_2140.jpg` |
| `sedinta-foto-sala-produse-potassium-complex-l-carnitina-1.jpg` | `HILA_13_17_02_17_2149.jpg` |
| `sedinta-foto-sala-produse-prime-whey-1.jpg` | `HILA_13_16_42_37_2102.jpg` |
| `sedinta-foto-sala-produse-recovery-eaa-shaker-1.jpg` | `HILA_13_16_35_43_2090.jpg` |
| `sedinta-foto-sala-prosop-prime-aparat-1.jpg` | `HILA_13_16_05_21_2000.jpg` |
| `sedinta-foto-sala-ramat-gantera-nitrox-no-stim-1.jpg` | `HILA_13_15_18_36_1624.jpg` |
| `sedinta-foto-sala-shaker-prime-5.jpg` | `HILA_13_13_55_19_0933.jpg` |
| `sedinta-foto-sala-silymarin-spirulina-1.jpg` | `HILA_13_14_03_52_0992.jpg` |
| `sedinta-foto-sala-silymarin-spirulina-2.jpg` | `HILA_13_14_04_40_1010.jpg` |
| `sedinta-foto-sala-sportiv-prime-whey-1.jpg` | `HILA_13_15_00_56_1399.jpg` |
| `sedinta-foto-sala-sportiv-prime-whey-2.jpg` | `HILA_13_15_06_30_1471.jpg` |
| `sedinta-foto-sala-sportiv-prime-whey-3.jpg` | `HILA_13_15_26_00_1684.jpg` |
| `sedinta-foto-sala-sportiv-prime-whey-4.jpg` | `HILA_13_15_50_46_1872.jpg` |
| `sedinta-foto-sala-sportiva-biceps-produs-prime-1.jpg` | `HILA_13_12_36_36_0383.jpg` |

### Poze constanta (16)

| Fișier în Shopify Files | Fișier sursă |
|---|---|
| `sedinta-foto-exterior-combat-pro-1.jpg` | `DSC09936.jpg` |
| `sedinta-foto-exterior-creatina-combat-pro-shaker-1.jpg` | `DSC09954.jpg` |
| `sedinta-foto-exterior-creatina-creapure-nitrox-3d-vitamina-c-1.jpg` | `DSC09494.jpg` |
| `sedinta-foto-exterior-cutie-plicuri-prime-whey-1.jpg` | `DSC09940.jpg` |
| `sedinta-foto-exterior-recovery-eaa-nac-1.jpg` | `DSC09503.jpg` |
| `sedinta-foto-exterior-recovery-eaa-nac-nitrox-creatina-1.jpg` | `DSC09490.jpg` |
| `sedinta-foto-plaja-antrenament-benzi-elastice-1.jpg` | `DSC00163.jpg` |
| `sedinta-foto-plaja-antrenament-benzi-elastice-2.jpg` | `DSC00275.jpg` |
| `sedinta-foto-plaja-cuplu-sezlong-shaker-1.jpg` | `DSC00753.jpg` |
| `sedinta-foto-plaja-energy-pump-shot-2.jpg` | `DSC00300.jpg` |
| `sedinta-foto-plaja-energy-pump-shot-prime-whey-2.jpg` | `DSC00080.jpg` |
| `sedinta-foto-plaja-fiole-fat-burning-energy-pump-3.jpg` | `DSC09998.jpg` |
| `sedinta-foto-plaja-pure-isolate-prime-whey-2.jpg` | `DSC00092.jpg` |
| `sedinta-foto-plaja-recovery-shaker-masura-1.jpg` | `DSC00310.jpg` |
| `sedinta-foto-plaja-shaker-masura-pudra-2.jpg` | `DSC00338.jpg` |
| `sedinta-foto-plaja-shaker-prime-5.jpg` | `DSC00390.jpg` |

### Poze constanta\poze fete (7)

| Fișier în Shopify Files | Fișier sursă |
|---|---|
| `sedinta-foto-exterior-eaa-2.jpg` | `DSC09422.jpg` |
| `sedinta-foto-exterior-eaa-shaker-masura-1.jpg` | `DSC09688.jpg` |
| `sedinta-foto-exterior-eaa-vitamina-c-1.jpg` | `DSC09418.jpg` |
| `sedinta-foto-exterior-prime-whey-4.jpg` | `DSC09401.jpg` |
| `sedinta-foto-exterior-prime-whey-eaa-1.jpg` | `DSC09379.jpg` |
| `sedinta-foto-exterior-vitamina-c-1.jpg` | `DSC09647.jpg` |
| `sedinta-foto-plaja-sportiva-shaker-prime-1.jpg` | `DSC09715.jpg` |

### Shooting foto evo gym – cadre urcate după confirmarea proprietarului (12)

| Fișier în Shopify Files | Fișier sursă |
|---|---|
| `sedinta-foto-sala-cuplu-prime-whey-nitrox-3d-2.jpg` | `HILA_13_13_24_47_0746.jpg` |
| `sedinta-foto-sala-cuplu-prime-whey-nitrox-3d-3.jpg` | `HILA_13_13_25_30_0764.jpg` |
| `sedinta-foto-sala-nitrox-no-stim-5.jpg` | `HILA_13_12_29_40_0332.jpg` |
| `sedinta-foto-sala-sportiva-instant-oats-banca-3.jpg` | `HILA_13_12_45_04_0447.jpg` |
| `sedinta-foto-sala-sportiva-instant-oats-prime-health-1.jpg` | `HILA_13_12_43_04_0431.jpg` |
| `sedinta-foto-sala-sportiva-instant-oats-prime-health-2.jpg` | `HILA_13_12_43_10_0436.jpg` |
| `sedinta-foto-sala-sportiva-nitrox-3d-prime-whey-1.jpg` | `HILA_13_12_40_29_0407.jpg` |
| `sedinta-foto-sala-sportiva-nitrox-3d-prime-whey-2.jpg` | `HILA_13_12_40_53_0418.jpg` |
| `sedinta-foto-sala-sportiva-nitrox-no-stim-1.jpg` | `HILA_13_12_27_07_0316.jpg` |
| `sedinta-foto-sala-sportiva-nitrox-no-stim-prime-whey-1.jpg` | `HILA_13_12_28_58_0323.jpg` |
| `sedinta-foto-sala-sportiva-sac-box-nitrox-no-stim-1.jpg` | `HILA_13_13_41_58_0862.jpg` |
| `sedinta-foto-sala-sportiva-sac-box-nitrox-no-stim-2.jpg` | `HILA_13_13_42_53_0875.jpg` |