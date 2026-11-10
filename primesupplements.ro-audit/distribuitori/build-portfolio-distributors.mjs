// Prime Supplements – international B2B / distributor portfolio (English, A4, no prices).
// Data: distribuitori/data/products-2026-11-10.json (Shopify Admin API snapshot, 10.11.2026) + product-page texts read the same day.
// Rule: nothing invented. Client-ready version (10.11.2026): no placeholders; documents a prospect asks for are sent on request (see LA-CERERE.md).
// Run: node distribuitori/build-portfolio-distributors.mjs ; PDF: Chrome headless --print-to-pdf (see JURNAL 10.11.2026).
import { readFileSync, writeFileSync } from "node:fs";

const DATA = "2026-11-10";
const products = JSON.parse(readFileSync(new URL(`./data/products-${DATA}.json`, import.meta.url), "utf8"));
const byHandle = Object.fromEntries(products.map(p => [p.handle, p]));
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
const pimg = h => { if (!byHandle[h]) throw new Error("unknown product " + h); return `img/p-${h.replace(/[^a-z0-9_-]/gi, "")}.jpg`; };
const BG = JSON.parse(readFileSync(new URL("./data/img-bg.json", import.meta.url), "utf8").replace(/^\uFEFF/, ""));
const bgOf = h => h === "pantaloni-trening-barbati-hammer-3-0-prime-negri" ? "#fcfcfc" : (BG["p-" + h.replace(/[^a-z0-9_-]/gi, "")] || { bg: "#f2f2f2" }).bg;
const shot = (h, z) => `<span class="shot" style="background:${bgOf(h)}"><img src="${pimg(h)}" alt="" style="transform:scale(${z || 1.3})"></span>`;

/* ---------- catalogue data (texts written from the product pages; quantities as declared there) ---------- */
const catalogue = [
  { name: "Protein, gainer & functional foods", items: [
    { h: "emperor-mass_3000g", n: "Emperor Mass", size: "Gainer · 3 kg · Chocolate, Strawberry", d: "Gainer with 40% protein: 27.8 g protein and 29.0 g carbohydrates per 70 g serving, plus 1,750 mg creatine monohydrate, L-glutamine, BCAA 4:1:1 and DigeZyme®." },
    { h: "instant-oat-cream-800g-25-serv", n: "Instant Oat Cream", size: "Oat cream · 800 g · Chocolate Cream, Cookie Cream", d: "Instant cream made from oat flour. Add hot water or milk and let it hydrate for 1–3 minutes." },
    { wide: true, h: "baton-proteic-capsuni", n: "Prime Delicious Bar", size: "Protein bar · 55 g · single bar or box of 12", d: "20 g of protein in a 55 g bar, from whey protein concentrate, collagen peptides, soy protein isolate and whole milk powder. Four flavours: Strawberry, Salted Caramel, Coconut & Caramel, Chocolate & Forest Fruits. The strawberry bar is our third best-selling product by units.", imgs: ["baton-proteic-capsuni", "baton-proteic-caramel-sarat", "baton-proteic-cocos-si-caramel", "baton-proteic-ciocolata-fructe-de-padure"] },
    { h: "unt-de-arahide", n: "Peanut Butter", size: "Prime Health · 600 g glass jar", d: "100% roasted peanuts. No added sugar, salt, palm oil or preservatives. 26 g protein and 7 g fibre per 100 g.", stack: "Creamy Rice" },
    { h: "unt-de-migdale", n: "Almond Butter", size: "Prime Health · 600 g glass jar", d: "100% roasted almonds, nothing added. 21.2 g protein per 100 g.", stack: "Creamy Rice" },
    { h: "unt-de-caju", n: "Cashew Butter", size: "Prime Health · 600 g glass jar", d: "Cashew paste in a glass jar. 18 g protein per 100 g, 0 g salt." },
    { h: "fiber-blood-orange", n: "Fiber", size: "Fibre drink · 500 g · 50 servings · Blood Orange", d: "Instant drink with 7.4 g fibre per 10 g serving, from inulin, acacia fibre, bamboo fibre, oat flour and glucomannan.", stack: "Prime Whey" },
    { h: "scortisoara-ceylon-bio-200g", n: "Organic Ceylon Cinnamon", size: "Prime Health · 200 g", d: "Ground Ceylon cinnamon from organic farming, single ingredient, in a kraft paper pouch." },
  ]},
  { name: "Amino acids", items: [
    { h: "eaa-aminoacizi-esentiali", n: "EAA", size: "500 g · 83 servings · 4 flavours", d: "Eight essential amino acids, 5,350 mg per 6 g serving, including 1,070 mg L-leucine. 0 g carbohydrates.", stack: "Prime Whey" },
    { h: "recovery-bcaa-500g", n: "Recovery BCAA 4:1:1", size: "500 g · 62 servings · Cherry, Pear", d: "7,100 mg BCAA per 8 g serving in a 4:1:1 ratio, with vitamin B6 (106% NRV)." },
    { h: "recovery-glutamin", n: "Recovery Glutamin Kyowa®", size: "500 g · unflavoured or 4 flavours", d: "4,000 mg L-glutamine Kyowa® per serving. The unflavoured version has a single ingredient and 125 servings.", stack: "Prime Whey" },
    { h: "l-carnitine-1000-80-caps", n: "L-Carnitine 1000", size: "80 capsules", d: "1,000 mg L-carnitine tartrate per capsule, the only active ingredient." },
    { h: "taurine-80-caps", n: "Taurine 1000 mg", size: "80 capsules", d: "1,000 mg taurine per capsule." },
  ]},
  { name: "Pre-workout & intra-workout", items: [
    { h: "nitrox", n: "Nitrox 3D", size: "500 g · 25 servings · 4 flavours", d: "Per 20 g serving: 6,000 mg L-citrulline, 4,420 mg arginine AKG, 2,000 mg tri-creatine citrate, 2,000 mg beta-alanine, 200 mg caffeine.", stack: "Creatine Creapure®" },
    { h: "nitrox-no-stim", n: "Nitrox No-Stim", size: "Stimulant-free · 660 g · 30 servings", d: "No caffeine and no synephrine in the ingredient list. Per 22 g serving: 4,000 mg BCAA 2:1:1, 3,753 mg L-citrulline, 2,200 mg creatine monohydrate." },
    { h: "combat-pro", n: "Combat Pro", size: "500 g · 22 servings · 4 flavours", d: "Per 22 g serving: 7,000 mg L-citrulline, 4,000 mg beta-alanine, 4,000 mg L-arginine, 300 mg caffeine and 30 mg synephrine.", stack: "Creatine Creapure®" },
    { h: "combat-pro-2-0-660g-30-serv", n: "Combat Pro 2.0", size: "660 g · 30 servings · 2 flavours", d: "No caffeine in the ingredient list; contains 45 mg synephrine. Per 22 g serving: 5,600 mg L-citrulline, 3,900 mg beta-alanine." },
    { h: "cluster-bomb-1000g", n: "Cluster Bomb", size: "Intra-workout · 1 kg · 33 servings", d: "Cluster Dextrin® drink: 19.9 g carbohydrates per 30 g serving, plus 2,400 mg each of EAA, creatine monohydrate and L-citrulline.", stack: "EAA" },
    { h: "glycerol-max-pump-500g-125-serv", z: 1, n: "Glycerol Max Pump", size: "500 g · 125 servings · unflavoured", d: "Single ingredient: glycerol monostearate, 4,000 mg per 4 g serving." },
    { h: "energy-pump", n: "Energy Pump Shot", size: "25 ml vial · single or box of 20", d: "Ready to drink. Per vial: 4,000 mg citrulline malate, 4,000 mg arginine AKG 2:1, 3,000 mg beta-alanine, 100 mg caffeine." },
  ]},
  { name: "Definition range", items: [
    { h: "fat-burning-booster", n: "Fat Burning Booster Shot", size: "25 ml vial · single or box of 20 · Forest Fruits", d: "Per vial: 4,000 mg L-carnitine, green tea and green coffee extracts, 117.5 mg caffeine and 40 µg chromium (100% NRV)." },
    { h: "thermo-core-120-caps", n: "Thermo Core", size: "120 capsules · 40 servings", d: "Per 3 capsules: 1,125 mg L-carnitine, 618 mg green tea extract, citrus bioflavonoids, 45 mg synephrine and 50 µg chromium (125% NRV). Contains 49 mg caffeine." },
    { h: "water-out-120-caps", n: "Water Out", size: "120 capsules · 40 servings", d: "Per 3 capsules: 2,000 mg dry extracts from eight plants, with 375 mg potassium, 75 mg magnesium and 80 mg vitamin C (100% NRV). Contains green tea extract and 6 mg synephrine." },
    { h: "water-out-500-ml", n: "Water Out tincture", size: "Prime Health · 500 ml · 100 servings", d: "Tincture of eight plants (1:6 hydroethanolic extract), 5 ml per serving. Contains 30% vol. alcohol." },
  ]},
  { name: "Vitamins & minerals", items: [
    { h: "daily-vitamin-formula", n: "Daily Vitamin Formula", size: "30 daily sachets", d: "Each sachet holds five tablets and one capsule: 12 vitamins and 8 minerals with declared % NRV, plus DigeZyme® enzyme complex." },
    { h: "vitamina-d3-k2", n: "Vitamin D3 + K2", size: "Prime Health · 80 vegetable capsules", d: "100 µg (4,000 IU) vitamin D3 and 100 µg vitamin K2 (MK-7) per capsule. One capsule every two days.", stack: "Creatine Creapure®" },
    { h: "vitamin-c-1000-80-caps", n: "Vitamin C 1000 mg", size: "80 capsules", d: "1,000 mg vitamin C (ascorbic acid) per capsule, one capsule a day." },
    { h: "omega-3", n: "Omega-3", size: "80 softgels", d: "Concentrated fish oil: 180 mg EPA and 120 mg DHA per softgel, with 3 mg vitamin E." },
    { h: "magneziu-bisglicinat-80-caps", n: "Magnesium Bisglycinate", size: "Prime Health · 80 vegetable capsules", d: "Two forms of magnesium per capsule: 300 mg magnesium bisglycinate and 100 mg magnesium malate.", stack: "Prime Whey" },
    { h: "magnesium-citrate-80-caps", n: "Magnesium Citrate", size: "80 capsules · 40 servings", d: "225 mg magnesium per capsule (60% NRV), from magnesium citrate and carbonate." },
    { h: "zinc-citrate-80-caps", n: "Zinc Citrate 40 mg", size: "80 capsules", d: "40 mg zinc from zinc citrate per capsule, one capsule a day." },
    { h: "potassium-complex-80-caps", z: 1, n: "Potassium Complex", size: "80 capsules", d: "Per 3 capsules: 324 mg potassium and 240 mg magnesium, both from citrates." },
    { h: "supliment-alimentar-chromium-picolinate-80-caps", n: "Chromium Picolinate", size: "80 capsules", d: "200 µg chromium per capsule, from chromium picolinate." },
  ]},
  { name: "Health & herbal", items: [
    { h: "ashwagandha-ksm-66", n: "Ashwagandha KSM-66®", size: "Prime Health · 80 vegetable capsules", d: "500 mg KSM-66® ashwagandha root extract per capsule, standardised to 5% withanolides." },
    { h: "citrus-bergamot", n: "Citrus Bergamot", size: "Prime Health · 80 vegetable capsules", d: "500 mg Bergamonte® bergamot fruit extract per capsule, standardised to 38% polyphenols." },
    { h: "silimarina-80-caps", z: 1, n: "Silymarin", size: "80 capsules", d: "440 mg milk thistle seed extract per capsule, of which 352 mg silymarin." },
    { h: "turmeric-extract-80-caps", n: "Turmeric with Piperine", size: "80 capsules", d: "400 mg turmeric root extract (380 mg curcuminoids) and 5 mg piperine per capsule." },
    { h: "spirulina-80-caps", z: 1, n: "Spirulina", size: "80 capsules · 40 servings", d: "600 mg spirulina powder per capsule, two capsules a day." },
    { h: "coenzima-q10-80-caps", n: "Coenzyme Q10 200 mg", size: "Prime Health · 80 vegetable capsules", d: "200 mg coenzyme Q10 (ubiquinone) per capsule." },
    { h: "nac-80-caps", n: "NAC 500 mg", size: "80 capsules", d: "500 mg N-acetylcysteine per capsule, one capsule a day." },
    { h: "enzima-nattokinaza-80-caps", z: 1, n: "Nattokinase", size: "60 capsules", d: "100 mg nattokinase per capsule, with a declared activity of 2,000 FU." },
    { h: "complete-collagen", n: "Complete Collagen", size: "Prime Health · liquid · 500 ml", d: "6 g hydrolysed bovine collagen (Peptan®) per 15 ml dose, with plant extracts, aloe and vitamin C." },
    { h: "cardio-calm-500-ml", n: "Cardio Calm tincture", size: "Prime Health · 500 ml", d: "Tincture of seven plants, including hawthorn, hibiscus and valerian (1:6 hydroethanolic extract, 30% vol. alcohol)." },
    { h: "testo-revive-500-ml", n: "Testo Revive tincture", size: "Prime Health · 500 ml · 100 teaspoons", d: "Tincture with Korean ginseng and five other plants (1:6 hydroethanolic extract, 30% vol. alcohol)." },
  ]},
];
const gear = [
  ["prime-shaker-customised", "Prime Shaker 600 ml"], ["shaker-premium-accesorizat-500-ml", "Shaker with compartments 500 ml"], ["prosop-negru", "Gym towel 50 × 100 cm"], ["sapca-prime", "Prime cap"], ["centura-hardcore", "“Hardcore” leather lifting belt"],
  ["hanorac-prime-squad", "Prime Squad zip hoodie"], ["pantaloni-trening-barbati-hammer-3-0-prime-negri", "Hammer 3.0 sweatpants"], ["pantaloni-scurti-waffle-barbati-hammer-3-0-prime-negri", "Hammer 3.0 waffle shorts"], ["tricou-oversized-barbati-hammer-3-0-prime-negru", "Hammer 3.0 oversized T-shirt"], ["maieu-fitness-barbati-edge-prime-negru", "Edge tank top"],
  ["maiou-stringer", "Stringer, black"], ["maiou-stringer-white", "“Fuel Your Prime” stringer"], ["t-shirt-drop-shoulder-muscle", "Drop Shoulder Muscle tee, black"], ["t-shirt-drop-shoulder-muscle-white", "Drop Shoulder Muscle tee, white"], ["tricou-sala-suffer-to-dominate-bumbac-premium-negru", "“Suffer to Dominate” tee"],
  ["tricou-gym-supradimensionat-lejer-burgundy-prime", "Oversized tee, burgundy"], ["tricou-gym-supradimensionat-lejer-roz-pastel-prime", "Oversized tee, pastel pink"], ["tricou-sala-oversized-barbați-prime-galben-pastel", "Oversized tee, pastel yellow"], ["tricou-sala-oversized-barbați-prime-turcoaz-intense", "Oversized tee, turquoise"], ["prime-bodybuilding-classic-pants", "Bodybuilding Classic pants"],
];
// Stacks = bundles sold on primesupplements.ro (10.11.2026) that are built around the best sellers
const stacks = [
  { n: "Start", items: [["prime-whey-1000g", "Prime Whey 1 kg"], ["eaa-aminoacizi-esentiali", "EAA"]], d: "The entry stack: daily protein and an essential amino acid drink for training." },
  { n: "Complete", items: [["prime-whey-2000g", "Prime Whey 2 kg"], ["creatina-creapure", "Creapure® 300 g"], ["eaa-aminoacizi-esentiali", "EAA"]], d: "Protein, creatine and essential amino acids: the three staples in one order." },
  { n: "Mass", items: [["prime-whey-2000g", "Prime Whey 2 kg"], ["nitrox", "Nitrox 3D"]], d: "Protein for the day and a full pre-workout for the session." },
  { n: "Recovery", items: [["prime-whey-2000g", "Prime Whey 2 kg"], ["recovery-glutamin", "Glutamin Kyowa®"]], d: "Whey protein paired with L-glutamine Kyowa®." },
  { n: "Pre-Workout Power", items: [["nitrox", "Nitrox 3D"], ["creatina-creapure", "Creapure® 500 g"]], d: "Pre-workout plus daily Creapure® creatine." },
  { n: "Strength", items: [["creatina-creapure", "Creapure® 500 g"], ["magneziu-bisglicinat-80-caps", "Magnesium Bisglycinate"], ["vitamina-d3-k2", "Vitamin D3 + K2"]], d: "Creatine with magnesium bisglycinate and vitamin D3 + K2." },
  { n: "Balance", items: [["prime-whey-1000g", "Prime Whey 1 kg"], ["magneziu-bisglicinat-80-caps", "Magnesium Bisglycinate"], ["vitamina-d3-k2", "Vitamin D3 + K2"]], d: "Protein with magnesium and vitamin D3 + K2." },
  { n: "Fit", items: [["prime-whey-1000g", "Prime Whey 1 kg"], ["fiber-blood-orange", "Fiber"]], d: "Protein and a fibre drink." },
  { n: "Protein breakfast", items: [["prime-whey-1000g", "Prime Whey"], ["crema-de-orez-tort-de-ciocolata", "Creamy Rice"]], d: "Creamy Rice can be eaten on its own or added to protein shakes, as stated on its label; matching flavours (e.g. Salted Caramel) exist in both ranges." },
];

/* ---------- small builders ---------- */
const foot = (n, dark) => `<div class="foot${dark ? " dark" : ""}"><span>Prime Supplements · International distribution portfolio</span><span>${n}</span></div>`;
const nutri = (cols, rows, note) => `<table class="nutri"><thead><tr><th></th>${cols.map(c => `<th>${c}</th>`).join("")}</tr></thead><tbody>${rows.map(r => `<tr${r.sub ? ' class="sub"' : ""}><td>${r.l}</td>${r.v.map(v => `<td>${v}</td>`).join("")}</tr>`).join("")}</tbody></table>${note ? `<p class="tnote">${note}</p>` : ""}`;
const spec = pairs => `<dl class="spec">${pairs.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("")}</dl>`;
const chips = a => `<div class="chips">${a.map(x => `<span>${esc(x)}</span>`).join("")}</div>`;
const card = it => it.wide ? `
  <article class="ccard wide">
    <div class="cimgs">${it.imgs.map(h => shot(h, 1.2)).join("")}</div>
    <div class="ctext"><h4>${esc(it.n)}</h4><p class="size">${esc(it.size)}</p><p>${esc(it.d)}</p></div>
  </article>` : `
  <article class="ccard">
    <div class="cimg">${shot(it.h, it.z)}</div>
    <div class="ctext"><h4>${esc(it.n)}</h4><p class="size">${esc(it.size)}</p><p>${esc(it.d)}</p>${it.stack ? `<p class="stk">Stacks with: <b>${esc(it.stack)}</b></p>` : ""}</div>
  </article>`;
const catBlock = c => `<h3 class="cat">${esc(c.name)}</h3><div class="cgrid">${c.items.map(card).join("")}</div>`;

const nSupp = catalogue.reduce((s, c) => s + c.items.reduce((a, it) => a + (it.imgs ? it.imgs.length : 1), 0), 0) + 4 /*whey 1kg, 2kg, Go, isolate*/ + 7 /*rice*/ + 3 /*creatine*/;
const WHEY_FLAV = ["Blueberry Vanilla", "Bourbon Vanilla", "Chocolate Coconut", "Salted Caramel", "Strawberry Cheesecake", "Toffee Chocolate", "White Chocolate Raspberry"];
const ISO_FLAV = ["Bourbon Vanilla", "Caffè Latte", "Chocolate", "Salted Caramel", "Strawberry", "Strawberry Cheesecake", "White Chocolate Raspberry"];
const rice = [ // label name, handle, per 45 g: kcal, fat, sat, carbs, sugars, fibre, protein, salt
  ["Chocolate Cake", "crema-de-orez-tort-de-ciocolata", "155.8", "0.65", "0.25", "32.6", "0.3", "1.4", "4.2", "0.15"],
  ["Coconut Cream Pie", "crema-de-orez-plactina-cu-cocos", "166.2", "1.8", "1.4", "33.3", "0.3", "0.7", "3.7", "0.15"],
  ["Cookie Cream", "crema-de-orez-biscuiti-cu-crema", "155.7", "0.4", "0.13", "33.8", "0.3", "0.9", "3.4", "0.12"],
  ["Blueberry Muffin", "crema-de-orez-blueberry-muffin", "157.2", "0.27", "0.07", "34.7", "1.0", "0.8", "3.6", "0.15"],
  ["Salted Caramel", "crema-de-orez-caramel-sarat", "155.2", "0.5", "0.2", "33.4", "0.3", "1.0", "3.9", "0.4"],
  ["Maple Sugar", "crema-de-orez-sirop-de-artar", "155.4", "0.3", "0.07", "34.3", "0.3", "0.7", "3.6", "0.14"],
  ["Natur (unflavoured)", "crema-de-orez-fara-aroma", "158.8", "0.3", "0.07", "35.1", "0.3", "0.7", "3.6", "0.0"],
];

/* ---------- pages ---------- */
let pn = 1;
const pages = [];

// 1 COVER
pages.push(`<section class="page cover">
  <img class="bg" src="img/sala-whey-nitrox3d.jpg" alt="">
  <div class="shade"></div>
  <img class="logo" src="img/logo-prime-alb.svg" alt="Prime Supplements">
  <div class="ctxt">
    <p class="kicker">International distribution portfolio</p>
    <h1>Hardcore<br>Sports <span>Nutrition</span></h1>
    <p class="lead">Prime Supplements is a Romanian sports nutrition brand: protein, creatine, cream of rice and a complete range made in the European Union.</p>
  </div>
  <div class="foot dark"><span>PRIME SPORT SUPPLEMENTS SRL · Sibiu County, Romania · primesupplements.ro</span><span>November 2026 edition</span></div>
</section>`); pn++;

// 2 ABOUT
pages.push(`<section class="page">
  <p class="kicker">About the brand</p>
  <h1>Built in competitive bodybuilding, <span>made for every athlete.</span></h1>
  <div class="two">
    <div>
      <p class="big">Prime Supplements was founded in 2022 in Sibiu County, Romania. Our mission is to educate and inspire athletes and to improve their performance.</p>
      <p>The supplements are designed to support athletes up to the highest level of performance. The ranges serve both competitive athletes and people who train and want healthy, tailored nutrition.</p>
      <p>We analyse demand, athletes' needs and raw materials, and we keep raising quality. That is how we work towards our mission: to set a new standard in the supplement market, to support athletes on their way to peak performance and to offer products tailored to their nutritional needs.</p>
    </div>
    <img class="ph" src="img/sala-ramat.jpg" alt="Prime Whey in the gym" style="height:66mm">
  </div>
  <div class="facts">
    <div><b>2022</b><span>Year founded</span></div>
    <div><b>Romania</b><span>Cisnădie, Sibiu County</span></div>
    <div><b>${nSupp}</b><span>supplements and functional foods in the range</span></div>
    <div><b>EU</b><span>Made in the European Union</span></div>
  </div>
  <h3>Hardcore Sports Nutrition</h3>
  <p>Hardcore Sports Nutrition is our motto and the mindset behind the company. The formulas, with their micro- and macronutrients, were designed after many years of study and experience in competitive bodybuilding. For us it is more than a motto that pushed us to look for the right balance in our products: it is a mindset that drives anyone to go beyond their own limits through dedication to their goal, supported by the balance between nutrition and training.</p>
  <div class="values">
    <div><b>Educate</b>Clear labels and a product blog that explains what each product contains, how much to take and when.</div>
    <div><b>Inspire</b>A brand that comes from the gym floor and speaks the language of people who train.</div>
    <div><b>Perform</b>Formulas adapted to what athletes need before, during and after training.</div>
  </div>
  <div class="founder">
    <div>
      <p class="kicker">The founder</p>
      <h3 style="margin-top:0;border:0;padding:0">Marius Chera</h3>
      <p>Marius Chera founded Prime Supplements in 2022. He is one of the best-known bodybuilding coaches in Romania and the first Romanian coach to have prepared athletes who earned the PRO card within the NPC organisation. His experience in bodybuilding is the basis on which the products were optimised: the range he recommends to bodybuilders throughout their preparation is the Prime Supplements range.</p>
    </div>
  </div>
  ${foot(pn)}
</section>`); pn++;

// 3 WHY PRIME
pages.push(`<section class="page">
  <p class="kicker">Why Prime Supplements</p>
  <h1>Quality you can read <span>on the label.</span></h1>
  <p class="big">We work with leading suppliers in the supplement industry. Beyond processing technology and raw materials, we take pride in the recipes themselves.</p>
  <div class="why">
    <div><i>01</i><b>Formulas shaped by bodybuilding</b>Developed together with our founder and adapted to what bodybuilders need before, during and after training and throughout the day, with a reduced excipient content.</div>
    <div><i>02</i><b>Named, branded ingredients</b>Creapure® creatine, Kyowa® L-glutamine, KSM-66® ashwagandha, Cluster Dextrin®, Bergamonte®, Peptan® collagen, DigeZyme® and EnXtra® are declared by name on our labels. Prime Supplements is listed on creapure.com as a Creapure® partner brand for Romania.</div>
    <div><i>03</i><b>Documented quality</b>Products are made in the European Union; Prime Whey is produced in an ISO and HACCP certified facility. The raw materials come from leading suppliers, and their quality is backed by national and international certifications such as TÜV, IFS, HALAL and Cologne List for Athletes.</div>
    <div><i>04</i><b>Transparent labels</b>Active ingredients are declared by name and quantity on the label. Our product pages use only health claims authorised in the EU.</div>
    <div><i>05</i><b>One brand, a complete range</b>${nSupp} supplements and functional foods plus accessories and gym wear: from 10 g sachets and 25 ml shots to 3 kg tubs. A distributor can build a full sports nutrition shelf from a single partner.</div>
    <div><i>06</i><b>Proven on the home market</b>The best sellers in this portfolio are ranked by sales in our own online store. The brand is supported by professional photo shoots, detailed product pages and an educational blog.</div>
  </div>
  <h3>What the end customer gets</h3>
  <div class="values">
    <div><b>Taste and choice</b>Seven flavours of Prime Whey, seven of Creamy Rice, seven of Pure Isolate.</div>
    <div><b>A format for every need</b>Single-serve sachets and shots for the gym bag, 1 kg tubs to start, 2–3 kg tubs for daily users.</div>
    <div><b>Clear directions</b>Serving size, number of servings and directions for use on every product.</div>
  </div>
  ${foot(pn)}
</section>`); pn++;

// 4 BEST SELLERS OVERVIEW
pages.push(`<section class="page">
  <p class="kicker">Best sellers</p>
  <h1>Three product lines <span>lead our sales.</span></h1>
  <p class="big">Protein, cream of rice and creatine are the core of the brand. The next pages present each line in detail; the rest of the range follows as a compact catalogue.</p>
  <div class="bs3">
    <div><div class="bsimg">${shot("prime-whey-2000g", 1.5)}</div><b>Protein</b><span>Prime Whey 1&nbsp;kg and 2&nbsp;kg, Prime Whey Go sachets, Pure Isolate 2&nbsp;kg</span></div>
    <div><div class="bsimg">${shot("crema-de-orez-tort-de-ciocolata", 1.15)}</div><b>Cream of Rice</b><span>Prime Creamy Rice 1&nbsp;kg in seven flavours</span></div>
    <div><div class="bsimg">${shot("creatina-creapure", 1.5)}</div><b>Creatine</b><span>Creapure® 300&nbsp;g and 500&nbsp;g, micronised 300&nbsp;g, Ready To Go sachets</span></div>
  </div>
  <h3>Top sellers in our online store</h3>
  <ol class="rank">
    <li><b>Prime Whey 2 kg</b><span>whey protein concentrate</span></li>
    <li><b>Prime Whey 1 kg</b><span>whey protein concentrate</span></li>
    <li><b>Prime Delicious Bar, Strawberry</b><span>protein bar 55 g</span></li>
    <li><b>Creatine Creapure®</b><span>creatine monohydrate</span></li>
    <li><b>Creamy Rice, Chocolate Cake</b><span>cream of rice 1 kg</span></li>
    <li><b>Creamy Rice, Coconut Cream Pie</b><span>cream of rice 1 kg</span></li>
  </ol>
  <p class="tnote">Ranking by units sold on primesupplements.ro in the 12 months to 10 November 2026 (Shopify Analytics). Six of the seven Creamy Rice flavours are in the top 20.</p>
  <img class="ph" src="img/batoane-fiole.jpg" alt="" style="height:60mm;margin-top:5mm;object-position:50% 60%">
  ${foot(pn)}
</section>`); pn++;

// 5 PRIME WHEY
pages.push(`<section class="page bs">
  <div class="bshead"><p class="kicker">Best seller · Protein</p><h1>Prime Whey</h1><p class="sub">Whey protein concentrate · our best-selling product</p></div>
  <div class="hero2">
    <img class="ph" src="img/sala-kettlebell.jpg" alt="Prime Whey" style="height:78mm">
    <div class="prodshot">${shot("prime-whey-2000g", 1.5)}</div>
  </div>
  <div class="two t60">
    <div>
      <p class="big">Prime Whey is a whey protein concentrate powder with added glycine and L-lysine, with flavours and sweeteners. One 30 g scoop provides around 24 g of protein.</p>
      <h3>Key benefits</h3>
      <ul class="ticks">
        <li>Protein contributes to a growth in muscle mass.</li>
        <li>Protein contributes to the maintenance of muscle mass.</li>
        <li>Protein contributes to the maintenance of normal bones.</li>
        <li>Around 24 g of protein and about 120 kcal per 30 g serving; each flavour has its own nutrition table and amino acid profile printed on the tub.</li>
        <li>Seven flavours, the same across the 1 kg tub, the 2 kg tub and the single-serve sachet.</li>
      </ul>
      <h3>Directions for use</h3>
      <p>Mix one scoop (30 g) with 150–200 ml of water or milk in a shaker. The label recommends 1–4 servings a day, depending on protein needs.</p>
    </div>
    <div>
      <h3 style="margin-top:0">Nutrition declaration</h3>
      ${nutri(["per 30 g serving", "per 100 g"], [
        { l: "Energy", v: ["504.0 kJ / 120.6 kcal", "1680.0 kJ / 401.9 kcal"] },
        { l: "Fat", v: ["2.0 g", "6.6 g"] }, { l: "of which saturates", sub: 1, v: ["1.1 g", "3.5 g"] },
        { l: "Carbohydrate", v: ["1.3 g", "4.4 g"] }, { l: "of which sugars", sub: 1, v: ["1.3 g", "4.4 g"] },
        { l: "Fibre", v: ["0 g", "0 g"] },
        { l: "<b>Protein</b>", v: ["<b>24.4 g</b>", "<b>81.3 g</b>"] },
        { l: "Salt", v: ["0.12 g", "0.39 g"] },
      ], "Blueberry Vanilla, 1 kg tub. Other flavours have their own table, with similar values (around 23–24 g of protein per serving).")}
      ${spec([["Ingredients", "Whey protein concentrate, glycine, L-lysine, flavours, sweeteners (sucralose, acesulfame-K). The list varies slightly by flavour."], ["Allergens", "Milk (whey). Made in a facility that also processes egg, soy and wheat."], ["Origin", "Made in the EU, in an ISO and HACCP certified facility."]])}
    </div>
  </div>
  ${foot(pn)}
</section>`); pn++;

// 6 PRIME WHEY FORMATS
pages.push(`<section class="page bs">
  <div class="bshead"><p class="kicker">Best seller · Protein</p><h1>Prime Whey: three formats, seven flavours</h1></div>
  <div class="formats">
    <div><div class="fimg">${shot("prime-whey-2000g", 1.5)}</div><b>Prime Whey 2 kg</b><span class="size">2000 g · 66 servings of 30 g</span><p>The large tub for people who take protein almost daily and have found their flavour. Our number one product by units sold.</p></div>
    <div><div class="fimg">${shot("prime-whey-1000g", 1.5)}</div><b>Prime Whey 1 kg</b><span class="size">1000 g · 33 servings of 30 g</span><p>Suited to a first order, to trying a new flavour, or to people who take protein only on training days. About one month at one serving a day.</p></div>
    <div><div class="fimg">${shot("prime-whey-go", 1.4)}</div><b>Prime Whey Go</b><span class="size">30 g sachet · single or box of 15</span><p>Prime Whey in a single-serve sachet for the gym, the office or travel: no tub and no scoop to carry.</p></div>
  </div>
  <h3>Flavours</h3>
  ${chips(WHEY_FLAV)}
  <div class="two" style="margin-top:6mm">
    <div>
      <h3 style="margin-top:0">Who it is for</h3>
      <ul class="ticks">
        <li>Adults who train regularly and do not meet their protein needs from food alone.</li>
        <li>New customers: the 1 kg tub and the sachet are the entry point to the brand.</li>
        <li>Daily users: the 2 kg tub gives 66 servings.</li>
        <li>Retail and gym counters: the sachet is sold individually and doubles as a sample for the tubs.</li>
      </ul>
      <p class="tnote">Food supplement. Not recommended for children or for women during pregnancy or breastfeeding. Do not exceed the recommended daily dose.</p>
    </div>
    <img class="ph" src="img/sala-ramat-1.jpg" alt="" style="height:70mm">
  </div>
  ${foot(pn)}
</section>`); pn++;

// 7 PURE ISOLATE
pages.push(`<section class="page bs">
  <div class="bshead"><p class="kicker">Best seller · Protein</p><h1>Pure Isolate</h1><p class="sub">Microfiltered whey protein isolate · 2 kg · 74 servings</p></div>
  <div class="hero2">
    <img class="ph" src="img/blog-isolate.jpg" alt="Pure Isolate" style="height:70mm">
    <div class="prodshot" style="height:70mm">${shot("pure-isolate-2000g", 1.4)}</div>
  </div>
  <div class="two t60">
    <div>
      <p class="big">Pure Isolate is the only isolate in the Prime range: microfiltered whey protein isolate with the DigeZyme® enzyme complex. A 27 g serving provides 23.5 g of protein and 97.3 kcal.</p>
      <h3>Key benefits</h3>
      <ul class="ticks">
        <li>87.0 g of protein per 100 g; 23.5 g per 27 g serving.</li>
        <li>Per 100 g: 0.96 g carbohydrates and 0.96 g fat.</li>
        <li>Protein contributes to a growth in muscle mass and to the maintenance of muscle mass and of normal bones.</li>
        <li>Contains DigeZyme® enzyme complex: 40.5 mg per serving.</li>
        <li>Seven flavours; Caffè Latte, Chocolate and Strawberry are not available in Prime Whey.</li>
      </ul>
      <h3>Directions for use</h3>
      <p>Mix one 27 g serving with water or milk, after training or during the day.</p>
    </div>
    <div>
      <h3 style="margin-top:0">Nutrition declaration</h3>
      ${nutri(["per 27 g serving", "per 100 g"], [
        { l: "Energy", v: ["406.8 kJ / 97.3 kcal", "1506.5 kJ / 360.4 kcal"] },
        { l: "<b>Protein</b>", v: ["<b>23.5 g</b>", "<b>87.0 g</b>"] },
        { l: "Carbohydrate", v: ["0.26 g", "0.96 g"] }, { l: "of which sugars", sub: 1, v: ["0.26 g", "0.96 g"] },
        { l: "Fat", v: ["0.26 g", "0.96 g"] },
        { l: "Fibre", v: ["0 g", "0 g"] },
        { l: "Sodium", v: ["0.04 g", "0.14 g"] },
        { l: "DigeZyme®", v: ["40.5 mg", "150 mg"] },
      ])}
      <h3>Flavours</h3>
      ${chips(ISO_FLAV)}
      ${spec([["Ingredients", "Microfiltered whey protein isolate, cocoa (in the Chocolate flavour), flavours, enzyme complex (DigeZyme®), sweeteners (sucralose, acesulfame-K), colour (carmine, in the Strawberry flavour)."], ["Allergens", "Milk (whey)."], ["Who it is for", "Customers who want an isolate rather than a concentrate, with more protein and less carbohydrate and fat per 100 g."]])}
    </div>
  </div>
  ${foot(pn)}
</section>`); pn++;

// 8 CREAMY RICE
pages.push(`<section class="page bs">
  <div class="bshead"><p class="kicker">Best seller · Cream of Rice</p><h1>Prime Creamy Rice</h1><p class="sub">Instant cream of rice · 1 kg · 22 servings · seven flavours</p></div>
  <img class="ph" src="img/rice-athlete.jpg" alt="Prime Creamy Rice" style="height:100mm;object-position:50% 5%">
  <div class="two t60" style="margin-top:6mm">
    <div>
      <p class="big">Creamy Rice is an instant cream of rice: a powder based on pregelatinised rice flour. Because the starch is pregelatinised, it binds directly with cold liquid, with no cooking.</p>
      <h3>Key benefits</h3>
      <ul class="ticks">
        <li>Ready without cooking: powder, cold water or milk, stir.</li>
        <li>A food, not a food supplement: high in carbohydrates, with 32.6–35.1 g of carbohydrates and 155–166 kcal per 45 g serving.</li>
        <li>No added sugars (contains naturally occurring sugars), except Coconut Cream Pie, whose chocolate pieces (3%) contain sugar. Sweeteners in the flavoured versions: sucralose and acesulfame-K.</li>
        <li>The unflavoured version has a single ingredient: 100% pregelatinised rice flour.</li>
        <li>Can be eaten as it is or added to smoothies and protein shakes, as stated on the label.</li>
      </ul>
    </div>
    <div>
      <h3 style="margin-top:0">Directions for use</h3>
      <p>Put one 45 g serving (1 scoop) in a bowl or shaker, add 150–200 ml of cold water or milk and stir until creamy. With 150 ml it is thicker, like a pudding; with 200 ml it is more fluid.</p>
      <h3>Who it is for</h3>
      <p>People who want a fast carbohydrate meal: breakfast, a snack or a dessert without cooking. Athletes who mix it with their protein shake. The unflavoured version is a neutral base for sweet or savoury recipes.</p>
      ${spec([["Format", "1 kg tub · 22 servings of 45 g · measuring scoop"], ["Allergens", "May contain traces of milk, egg, soy, wheat and fish. Coconut Cream Pie contains soy (lecithin) and may also contain traces of tree nuts."]])}
    </div>
  </div>
  ${foot(pn)}
</section>`); pn++;

// 9 CREAMY RICE FLAVOURS
pages.push(`<section class="page bs">
  <div class="bshead"><p class="kicker">Best seller · Cream of Rice</p><h1>Seven flavours, one base</h1><p class="sub">Six of the seven flavours are among our 20 best-selling products.</p></div>
  <div class="rflav">${rice.map(r => `<figure><div>${shot(r[1], 1.12)}</div><figcaption>${esc(r[0])}</figcaption></figure>`).join("")}</div>
  <h3>Nutrition declaration per 45 g serving (1 scoop)</h3>
  <table class="nutri wide">
    <thead><tr><th>Flavour</th><th>Energy</th><th>Fat</th><th>of which saturates</th><th>Carbohydrate</th><th>of which sugars</th><th>Fibre</th><th>Protein</th><th>Salt</th></tr></thead>
    <tbody>${rice.map(r => `<tr><td><b>${esc(r[0])}</b></td><td>${r[2]} kcal</td><td>${r[3]} g</td><td>${r[4]} g</td><td><b>${r[5]} g</b></td><td>${r[6]} g</td><td>${r[7]} g</td><td>${r[8]} g</td><td>${r[9]} g</td></tr>`).join("")}</tbody>
  </table>
  <p class="tnote">Values from the nutrition declaration of each product. Per 100 g: 345–369 kcal depending on flavour.</p>
  <div class="two" style="margin-top:5mm">
    <div>
      <h3 style="margin-top:0">Ingredients</h3>
      <p><b>Flavoured:</b> pregelatinised rice flour, flavours, salt, sweeteners (sucralose, acesulfame-K); low-fat cocoa in Chocolate Cake, Cookie Cream and Salted Caramel; dried blueberry pieces (3%) in Blueberry Muffin; coconut milk powder and chocolate pieces (3%) in Coconut Cream Pie.</p>
      <p><b>Natur:</b> pregelatinised rice flour (100%). No flavours, no sweeteners.</p>
      <h3>Pairs with</h3>
      <p>Prime Whey in the matching flavour (Salted Caramel exists in both ranges), Prime Health peanut and almond butter, fresh fruit.</p>
    </div>
    <img class="ph" src="img/blog-rice-recipes.jpg" alt="" style="height:66mm">
  </div>
  ${foot(pn)}
</section>`); pn++;

// 10 CREAPURE
pages.push(`<section class="page bs">
  <div class="bshead"><p class="kicker">Best seller · Creatine</p><h1>Creatine Creapure®</h1><p class="sub">Creatine monohydrate · 300 g and 500 g · unflavoured</p></div>
  <div class="hero2">
    <img class="ph" src="img/blog-creapure-locker.jpg" alt="Creatine Creapure" style="height:78mm">
    <div class="prodshot">${shot("creatina-creapure", 1.5)}</div>
  </div>
  <div class="two t60">
    <div>
      <p class="big">A food supplement powder with a single ingredient: micronised creatine monohydrate (Creapure®). “Made of Creapure®” is printed on the front of the tub, and Prime Supplements is listed on creapure.com as a Creapure® partner brand for Romania.</p>
      <h3>Key benefits</h3>
      <ul class="ticks">
        <li>Creatine increases physical performance in successive bursts of short-term, high intensity exercise. The beneficial effect is obtained with a daily intake of 3 g of creatine.</li>
        <li>One ingredient: no flavours, sweeteners or colours in the ingredient list.</li>
        <li>Creapure® is a registered trade mark for creatine monohydrate and is declared on the label.</li>
        <li>Two sizes with the same ingredient: at 5 g a day, a tub lasts 60 or 100 days.</li>
      </ul>
      <h3>Who it is for</h3>
      <p>Adults who do high intensity training and want a creatine with a named, verifiable raw material. Not recommended for people under 18 or for women during pregnancy and breastfeeding.</p>
    </div>
    <div>
      <h3 style="margin-top:0">Per serving</h3>
      ${nutri(["per 5 g serving"], [{ l: "<b>Creatine monohydrate (Creapure®)</b>", v: ["<b>5 g</b>"] }, { l: "Recommended daily dose", v: ["3–5 g of creatine"] }])}
      <h3>Sizes</h3>
      ${nutri(["Servings", "EAN"], [{ l: "<b>300 g tub</b>", v: ["60 × 5 g", "6421766064404"] }, { l: "<b>500 g tub</b>", v: ["100 × 5 g", "6421766015109"] }])}
      <h3>Directions for use</h3>
      <p>3–5 g of creatine a day, mixed in water or in a protein shake. Drink enough fluids during the day and do not exceed the recommended daily dose.</p>
      ${spec([["Ingredients", "Micronised creatine monohydrate (Creapure®)."], ["Flavour", "Unflavoured."]])}
    </div>
  </div>
  ${foot(pn)}
</section>`); pn++;

// 11 MICRONISED + READY TO GO
pages.push(`<section class="page bs">
  <div class="bshead"><p class="kicker">Best seller · Creatine</p><h1>Creatine for every budget and routine</h1></div>
  <div class="duo">
    <div class="dcard">
      <div class="dimg">${shot("creatina-monohidrat-micronized-300g-fara-aroma", 1)}</div>
      <h2>Micronised Creatine Monohydrate</h2>
      <p class="size">300 g · 60 servings · unflavoured · scoop included</p>
      <p>A powder that contains 100% creatine monohydrate: one ingredient, no flavours, sweeteners or colours. “Micronized” and “Unflavoured” are printed on the front of the tub.</p>
      ${nutri(["per 5 g serving"], [{ l: "<b>Creatine monohydrate</b>", v: ["<b>5,000 mg</b>"] }])}
      <h3>Directions for use</h3>
      <p>Mix 5 g (½ scoop) in 300–500 ml of water in a shaker, or add it to a protein shake. The label describes a loading phase based on body weight and a maintenance period.</p>
      <h3>Who it is for</h3>
      <p>Adults who do high intensity training and want the simplest form of creatine. Not recommended for children or for women during pregnancy or breastfeeding.</p>
      ${spec([["Allergens", "May contain traces of milk, egg, soy, gluten."], ["EAN", "6421766064107"]])}
    </div>
    <div class="dcard">
      <div class="dimg">${shot("creatine-ready-to-go-plicuri-prime-supplements", 1.1)}</div>
      <h2>Creatine Ready To Go</h2>
      <p class="size">10 g effervescent sachet · single or box of 25 (250 g)</p>
      <p>Creatine in single-serve sachets for people who train away from home and do not want to measure powder. The effervescent formula dissolves in water.</p>
      ${nutri(["per 10 g sachet"], [{ l: "<b>Creatine monohydrate</b>", v: ["<b>5,000 mg</b>"] }, { l: "Vitamin C", v: ["200 mg (250% NRV)"] }])}
      <h3>Flavours</h3>
      ${chips(["Blue Moon (blueberry)", "Pink Madness (raspberry & lime)"])}
      <h3>Directions for use</h3>
      <p>One sachet a day, dissolved in 200–300 ml of water, about 30–60 minutes before training. After 8 weeks of regular use, take a 2–3 week break, as stated on the packaging.</p>
      <h3>Who it is for</h3>
      <p>Customers who want to try creatine without buying a tub; gym and retail counters, where it is sold individually.</p>
    </div>
  </div>
  <p class="claim">Creatine increases physical performance in successive bursts of short-term, high intensity exercise. The beneficial effect is obtained with a daily intake of 3 g of creatine. Vitamin C contributes to the normal function of the immune system.</p>
  ${foot(pn)}
</section>`); pn++;

// 12 STACKS
pages.push(`<section class="page">
  <p class="kicker">How the range works together</p>
  <h1>Stacks built around <span>the best sellers.</span></h1>
  <p class="big">Eight of these combinations have been sold as ready-made bundles on primesupplements.ro; the ninth, Protein breakfast, is a pairing suggested on our product pages. For a distributor they are a simple way to grow basket size: every stack starts from Prime Whey, Creamy Rice or creatine.</p>
  <div class="stacks">${stacks.map(s => `
    <div class="stack">
      <div class="simgs">${s.items.map(([h]) => shot(h, /orez/.test(h) ? 1.5 : 1.7)).join('<i>+</i>')}</div>
      <b>${esc(s.n)}</b>
      <p class="size">${s.items.map(([, n]) => esc(n).replace(/([0-9]) (k?g)$/, "$1&nbsp;$2")).join(" + ")}</p>
      <p>${esc(s.d)}</p>${s.note ? `<p class="size"><i>${esc(s.note)}</i></p>` : ""}
    </div>`).join("")}
  </div>
  <p class="tnote">Other bundles we have sold include Full Stack, Performance, Pump, Intra, Health, Cut, Focus and Energy.</p>
  ${foot(pn)}
</section>`); pn++;

// 13–16 CATALOGUE
const catPages = [[0], [1, 2], [3, 4], [5]];
catPages.forEach((idx, i) => {
  pages.push(`<section class="page">
  ${i === 0 ? `<p class="kicker">Full catalogue</p><h1>The rest of the range, <span>in brief.</span></h1><p class="big">All products are Prime Supplements branded. Quantities per serving are those declared on the product pages and labels.</p>` : `<p class="kicker">Full catalogue</p>`}
  ${idx.map(k => catBlock(catalogue[k])).join("")}
  ${foot(pn)}
</section>`); pn++;
});

// 17 GEAR
pages.push(`<section class="page">
  <p class="kicker">Full catalogue</p>
  <h1>Accessories & <span>gym wear.</span></h1>
  <p class="big">Prime-branded shakers, accessories and apparel that put the brand on the gym floor. Some of the apparel belongs to the “Prime by MNX Sportswear” collection. Sizes and availability on request.</p>
  <div class="gear">${gear.map(([h, n]) => `<figure><div>${shot(h, 1)}</div><figcaption>${esc(n)}</figcaption></figure>`).join("")}</div>
  ${foot(pn)}
</section>`); pn++;

// 18 PARTNERSHIP
pages.push(`<section class="page">
  <p class="kicker">B2B partnership</p>
  <h1>Distribute Prime Supplements <span>in your market.</span></h1>
  <div class="two">
    <div>
      <p class="big">We are looking for distribution partners who know their market and want a sports nutrition brand with a clear identity, a complete range and proven best sellers.</p>
      <h3>What a partner gets</h3>
      <ul class="ticks">
        <li>One brand that covers protein, creatine, cream of rice, amino acids, pre-workout, vitamins, health products, bars and accessories.</li>
        <li>Best sellers validated by our own online sales.</li>
        <li>Product data ready to use: full composition, nutrition tables, directions for use and EAN codes.</li>
        <li>Marketing assets: professional photo shoots, product images and educational blog content.</li>
      </ul>
    </div>
    <img class="ph" src="img/sala-nostim-detaliu.jpg" alt="" style="height:86mm">
  </div>
  <h3>How we start</h3>
  <div class="steps">
    <div><i>1</i><b>Introduction</b>Tell us about your market, channels and the categories you are interested in.</div>
    <div><i>2</i><b>Assortment</b>We agree a first selection, starting from the best sellers.</div>
    <div><i>3</i><b>Documents & terms</b>We share product documentation and the commercial offer.</div>
    <div><i>4</i><b>First order</b>We confirm quantities, labelling and delivery.</div>
  </div>
  <h3>Available on request</h3>
  <div class="onreq">
    <div><b>Commercial offer</b>Price list and trading terms for your market and volumes.</div>
    <div><b>Product documentation</b>Product specifications and the documents you need for your evaluation.</div>
    <div><b>Logistics data</b>Packaging units, carton and pallet details for the products you select.</div>
  </div>
  <p class="big" style="margin-top:6mm">Tell us what you need to evaluate the brand and we will send you exactly the documents you require.</p>
  ${foot(pn)}
</section>`); pn++;

// 19 CONTACT
pages.push(`<section class="page cover end">
  <img class="bg" src="img/ai-urban.jpg" alt="">
  <div class="shade full"></div>
  <img class="logo" src="img/logo-prime-alb.svg" alt="Prime Supplements">
  <div class="ctxt">
    <p class="kicker">Get in touch</p>
    <h1>Let's bring Prime<br>to <span>your market.</span></h1>
    <p class="lead">Tell us about your market and the product lines you are interested in. We will get back to you with product documentation and the next steps.</p>
    <div class="contact">
      <div><b>E-mail</b>contact@primesupplements.ro</div>
      <div><b>Phone / WhatsApp</b>+40 775 286 584</div>
      <div><b>Website</b>primesupplements.ro</div>
      <div><b>Head office</b>Cisnădie, Sibiu County, Romania</div>
    </div>
    <div class="contact">
      <div><b>Instagram</b>instagram.com/primesupplements_ro</div>
      <div><b>Facebook</b>facebook.com/primesupplementsro</div>
      <div><b>TikTok</b>tiktok.com/@primesupplements.ro</div>
      <div><b>YouTube</b>youtube.com/@primesupplementsro</div>
    </div>
    <p class="legal">PRIME SPORT SUPPLEMENTS SRL · Company ID (CUI) 46260823 · Trade Register J32/1155/2022<br>Str. Ioan Virgil Ispas nr. 17A, 555300 Cisnădie, Sibiu County, Romania</p>
  </div>
  <div class="foot dark"><span>Hardcore Sports Nutrition · Made in the European Union</span><span>${pn}</span></div>
</section>`);

/* ---------- document ---------- */
const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<title>Prime Supplements – International distribution portfolio</title>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
<style>
  :root { --red: #ec1e24; --ink: #111; --grey: #666; --line: #e4e4e4; --bg: #f3f3f3; }
  * { box-sizing: border-box; }
  html, body { margin: 0; background: #fff; color: var(--ink); font-family: Poppins, "Segoe UI", Arial, sans-serif; font-size: 9.6pt; line-height: 1.5; }
  img { display: block; }
  .page { position: relative; width: 210mm; height: 297mm; padding: 15mm 15mm 16mm; overflow: hidden; break-after: page; page-break-after: always; background: #fff; }
  .page:last-of-type { break-after: auto; page-break-after: auto; }
  .foot { position: absolute; left: 15mm; right: 15mm; bottom: 7mm; font-size: 7.4pt; color: #9a9a9a; display: flex; justify-content: space-between; letter-spacing: .2px; }
  .foot.dark { color: rgba(255,255,255,.75); }
  .kicker { color: var(--red); text-transform: uppercase; letter-spacing: 2.2px; font-weight: 700; font-size: 8pt; margin: 0 0 2mm; }
  h1 { font-size: 23pt; line-height: 1.12; margin: 0 0 4mm; font-weight: 800; letter-spacing: -.3px; }
  h1 span { color: var(--red); }
  h2 { font-size: 14pt; line-height: 1.2; margin: 0 0 1mm; font-weight: 800; }
  h3 { font-size: 9pt; text-transform: uppercase; letter-spacing: 1.4px; margin: 5.5mm 0 2mm; font-weight: 700; border-left: 3px solid var(--red); padding-left: 2.5mm; }
  h4 { font-size: 9.8pt; margin: 0; font-weight: 700; line-height: 1.25; }
  p { margin: 0 0 2mm; }
  p.big { font-size: 11pt; line-height: 1.5; color: #222; margin-bottom: 3mm; }
  p.sub { color: var(--grey); font-size: 10.5pt; margin: 0; }
  .size { color: var(--grey); font-size: 8.2pt; margin: 0 0 1.2mm; display: block; }
  .tnote { color: var(--grey); font-size: 7.8pt; margin-top: 2mm; }
  .ph { width: 100%; object-fit: cover; border-radius: 2.5mm; }
  /* cover */
  .cover { padding: 0; color: #fff; background: #111; }
  .cover .bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
  .cover .shade { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(0,0,0,.6) 0%, rgba(0,0,0,.05) 32%, rgba(0,0,0,.25) 52%, rgba(0,0,0,.92) 80%); }
  .cover .shade.full { background: rgba(0,0,0,.78); }
  .cover .logo { position: absolute; left: 15mm; top: 15mm; height: 15mm; }
  .cover .ctxt { position: absolute; left: 15mm; right: 15mm; bottom: 24mm; }
  .cover h1 { font-size: 44pt; text-transform: uppercase; color: #fff; letter-spacing: -.5px; line-height: 1.02; margin-bottom: 6mm; }
  .cover .kicker { color: #ff6b6f; font-size: 9pt; }
  .cover .lead { font-size: 12.5pt; font-weight: 300; max-width: 150mm; color: #fff; text-wrap: balance; }
  .end h1 { font-size: 34pt; }
  .end .ctxt { top: 62mm; bottom: auto; }
  .contact { display: grid; grid-template-columns: 1fr 1fr; gap: 4mm 8mm; margin-top: 9mm; border-top: 1px solid rgba(255,255,255,.25); padding-top: 6mm; font-size: 11pt; }
  .contact b { display: block; color: #ff6b6f; text-transform: uppercase; font-size: 7.6pt; letter-spacing: 1.4px; margin-bottom: .5mm; }
  .legal { margin-top: 10mm; font-size: 8.6pt; color: rgba(255,255,255,.75); }
  /* layout */
  .two { display: grid; grid-template-columns: 1fr 1fr; gap: 8mm; align-items: start; }
  .two.t60 { grid-template-columns: 1.08fr 1fr; margin-top: 5mm; }
  .facts { display: grid; grid-template-columns: repeat(4, 1fr); gap: 4mm; margin: 6mm 0 1mm; }
  .facts div { background: var(--ink); color: #fff; border-radius: 2mm; padding: 3mm 4mm; }
  .facts b { display: block; font-size: 17pt; font-weight: 800; color: #fff; line-height: 1.1; }
  .facts span { font-size: 7.8pt; color: #cfcfcf; }
  .values { display: grid; grid-template-columns: repeat(3, 1fr); gap: 4mm; margin-top: 3mm; }
  .values div { background: var(--bg); border-top: 3px solid var(--red); border-radius: 0 0 2mm 2mm; padding: 3.5mm 4mm; font-size: 8.8pt; }
  .values b { display: block; text-transform: uppercase; letter-spacing: 1px; font-size: 8.6pt; margin-bottom: 1mm; }
  .founder { margin-top: 4mm; border: 1px solid var(--line); border-radius: 2.5mm; padding: 4mm 5mm; }
  .founder p:last-child { margin: 0; }
  .why { display: grid; grid-template-columns: 1fr 1fr; gap: 4mm; margin-top: 4mm; }
  .why div { border: 1px solid var(--line); border-radius: 2.5mm; padding: 4mm 5mm 4mm 15mm; position: relative; font-size: 8.8pt; min-height: 39mm; }
  .why i { position: absolute; left: 4.5mm; top: 3.5mm; font-style: normal; font-weight: 800; font-size: 15pt; color: var(--red); }
  .why b { display: block; font-size: 10pt; margin-bottom: 1mm; }
  /* best sellers */
  .bs3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 5mm; margin-top: 5mm; }
  .bs3 > div { border: 1px solid var(--line); border-radius: 2.5mm; padding: 4mm; text-align: center; }
  .bsimg { border-radius: 2mm; height: 58mm; margin-bottom: 3mm; overflow: hidden; }
  .shot { display: block; width: 100%; height: 100%; overflow: hidden; border-radius: inherit; }
  .shot img { width: 100%; height: 100%; object-fit: contain; }
  .bs3 b { display: block; font-size: 13pt; font-weight: 800; text-transform: uppercase; }
  .bs3 span { font-size: 8.4pt; color: var(--grey); display: block; text-wrap: balance; }
  ol.rank { list-style: none; counter-reset: r; margin: 0; padding: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 2.5mm 8mm; }
  ol.rank li { counter-increment: r; display: flex; align-items: baseline; gap: 3mm; border-bottom: 1px solid var(--line); padding: 2mm 0; }
  ol.rank li::before { content: counter(r); font-weight: 800; font-size: 15pt; color: var(--red); width: 7mm; }
  ol.rank b { font-size: 10pt; } ol.rank span { color: var(--grey); font-size: 8.2pt; margin-left: auto; white-space: nowrap; }
  .bshead { border-bottom: 3px solid var(--ink); padding-bottom: 3.5mm; margin-bottom: 5mm; }
  .bshead h1 { font-size: 27pt; text-transform: uppercase; margin-bottom: 1mm; text-wrap: balance; }
  .hero2 { display: grid; grid-template-columns: 1fr 62mm; gap: 5mm; }
  .prodshot { border-radius: 2.5mm; height: 78mm; overflow: hidden; }
  ul.ticks { list-style: none; margin: 0; padding: 0; }
  ul.ticks li { position: relative; padding-left: 5mm; margin-bottom: 1.6mm; }
  ul.ticks li::before { content: ""; position: absolute; left: 0; top: 1.9mm; width: 2.2mm; height: 2.2mm; background: var(--red); border-radius: 50%; }
  table.nutri { width: 100%; border-collapse: collapse; font-size: 8.6pt; }
  table.nutri th { background: var(--ink); color: #fff; text-align: right; padding: 1.6mm 2.5mm; font-size: 7.4pt; text-transform: uppercase; letter-spacing: .5px; font-weight: 600; }
  table.nutri th:first-child, table.nutri td:first-child { text-align: left; }
  table.nutri td { padding: 1.3mm 2.5mm; border-bottom: 1px solid var(--line); text-align: right; white-space: nowrap; }
  table.nutri tr.sub td:first-child { padding-left: 6mm; color: var(--grey); }
  table.nutri.wide { font-size: 8.2pt; } table.nutri.wide th { font-size: 6.8pt; padding: 1.6mm 1.5mm; white-space: normal; line-height: 1.2; } table.nutri.wide td { padding: 1.5mm 1.5mm; }
  dl.spec { margin: 4mm 0 0; }
  dl.spec div { display: grid; grid-template-columns: 24mm 1fr; gap: 3mm; border-top: 1px solid var(--line); padding: 1.6mm 0; font-size: 8.4pt; }
  dl.spec dt { font-weight: 700; text-transform: uppercase; font-size: 7.2pt; letter-spacing: .6px; color: var(--grey); padding-top: .4mm; }
  dl.spec dd { margin: 0; }
  .chips { display: flex; flex-wrap: wrap; gap: 1.6mm; }
  .chips span { border: 1px solid var(--ink); border-radius: 10mm; padding: .7mm 3mm; font-size: 8.2pt; font-weight: 500; }
  .formats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 5mm; }
  .formats > div { border: 1px solid var(--line); border-radius: 2.5mm; padding: 4mm; font-size: 8.8pt; }
  .formats b { font-size: 12pt; font-weight: 800; display: block; }
  .fimg { border-radius: 2mm; height: 60mm; margin-bottom: 3mm; overflow: hidden; }
  .rflav { display: grid; grid-template-columns: repeat(7, 1fr); gap: 2.5mm; }
  .rflav figure, .gear figure { margin: 0; text-align: center; font-size: 7.8pt; font-weight: 600; line-height: 1.25; }
  .rflav figure div { border-radius: 2mm; height: 40mm; margin-bottom: 1.5mm; overflow: hidden; border: 1px solid var(--line); }
  .duo { display: grid; grid-template-columns: 1fr 1fr; gap: 6mm; }
  .dcard { border: 1px solid var(--line); border-radius: 2.5mm; padding: 5mm; font-size: 8.8pt; }
  .dimg { border-radius: 2mm; height: 50mm; margin-bottom: 4mm; overflow: hidden; border: 1px solid var(--line); }
  .dcard h3 { margin-top: 4mm; }
  .claim { margin-top: 5mm; background: var(--bg); border-left: 3px solid var(--red); padding: 3mm 4mm; font-size: 8.4pt; color: #333; }
  /* stacks */
  .stacks { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 4mm; margin-top: 4mm; }
  .stack { border: 1px solid var(--line); border-radius: 2.5mm; padding: 3.5mm; font-size: 8.2pt; }
  .stack b { font-size: 11pt; font-weight: 800; text-transform: uppercase; display: block; }
  .stack p:last-child { margin: 0; }
  .simgs { height: 20mm; display: flex; align-items: center; justify-content: flex-start; gap: 1mm; margin-bottom: 2.5mm; }
  .simgs .shot { width: 14mm; height: 20mm; border-radius: 1.5mm; flex: none; }
  .simgs i { font-style: normal; font-weight: 800; color: var(--red); font-size: 9pt; }
  /* catalogue */
  h3.cat { background: var(--ink); color: #fff; border: 0; padding: 1.6mm 3.5mm; border-radius: 1.5mm; margin: 4mm 0 2.5mm; letter-spacing: 1.6px; }
  .cgrid { display: grid; grid-template-columns: 1fr 1fr; gap: 2.5mm; }
  .ccard { display: grid; grid-template-columns: 23mm 1fr; gap: 3mm; border: 1px solid var(--line); border-radius: 2mm; padding: 2mm; font-size: 7.8pt; line-height: 1.38; align-items: start; }
  .ccard p { margin: 0 0 .8mm; } .ccard .size { font-size: 7.4pt; margin-bottom: .8mm; }
  .cimg { border-radius: 1.5mm; height: 23mm; overflow: hidden; }
  .ccard.wide { grid-column: 1 / -1; grid-template-columns: 94mm 1fr; }
  .cimgs { border-radius: 1.5mm; height: 23mm; display: grid; grid-template-columns: repeat(4, 1fr); gap: 1mm; overflow: hidden; }
  .stk { color: var(--grey); font-size: 7.4pt; } .stk b { color: var(--red); }
  .gear { display: grid; grid-template-columns: repeat(5, 1fr); gap: 3.5mm; margin-top: 5mm; }
  .gear figure div { border-radius: 2mm; height: 40mm; margin-bottom: 1.5mm; overflow: hidden; border: 1px solid var(--line); }
  /* partnership */
  .steps { display: grid; grid-template-columns: repeat(4, 1fr); gap: 4mm; }
  .steps div { background: var(--bg); border-radius: 2mm; padding: 3.5mm 4mm; font-size: 8.4pt; }
  .steps i { font-style: normal; font-weight: 800; font-size: 16pt; color: var(--red); display: block; line-height: 1; margin-bottom: 1mm; }
  .steps b { display: block; font-size: 9.4pt; }
  .onreq { display: grid; grid-template-columns: repeat(3, 1fr); gap: 4mm; }
  .onreq div { border: 1px solid var(--line); border-top: 3px solid var(--red); border-radius: 0 0 2mm 2mm; padding: 4mm; font-size: 8.8pt; }
  .onreq b { display: block; text-transform: uppercase; letter-spacing: 1px; font-size: 8.6pt; margin-bottom: 1mm; }
  @media print { @page { size: A4; margin: 0; } * { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
  @media screen { body { background: #777; padding: 10mm; } .page { margin: 0 auto 10mm; box-shadow: 0 4px 24px rgba(0,0,0,.3); } }
</style></head>
<body>
${pages.join("\n")}
<script>
  const n = +new URLSearchParams(location.search).get("page");
  if (n) { document.body.style.cssText = "background:#fff;padding:0;margin:0"; document.querySelectorAll(".page").forEach((s, i) => { if (i + 1 !== n) s.remove(); else s.style.margin = "0"; }); }
  // overflow check: report pages whose content is taller than the page (run with ?check=1)
  if (new URLSearchParams(location.search).get("check")) { const o = []; document.querySelectorAll(".page").forEach((s, i) => { const last = [...s.children].filter(c => !c.classList.contains("foot") && !c.classList.contains("bg") && !c.classList.contains("shade")).pop(); if (last) { const b = last.getBoundingClientRect().bottom - s.getBoundingClientRect().top, lim = s.clientHeight - 15 * 3.7795; if (b > lim + 1) o.push((i + 1) + ":" + Math.round((b - lim) / 3.7795) + "mm"); } }); document.title = "OVERFLOW " + (o.join(" ") || "none"); }
</script>
</body></html>`;

writeFileSync(new URL(`./PRIME-SUPPLEMENTS-Distributor-Portfolio-EN-${DATA}.html`, import.meta.url), "﻿" + html, "utf8");
console.log("pages", pages.length, "| supplements & foods", nSupp);
