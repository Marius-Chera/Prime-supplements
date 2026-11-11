// Ghidul recepției în engleză (EN) și maghiară (HU), cu pagină de prezentare a brandului
// (textul de brand preluat din portofoliul pentru distribuitori, 10.11.2026).
// Stilurile se iau din build-ghid-receptii.mjs (aceeași machetă). Imagini: agenti/GHID-RECEPTII-img/.
// Rulare: node agenti/build-ghid-receptii-intl.mjs ; PDF: Chrome headless --print-to-pdf.
import { readFileSync, writeFileSync } from "node:fs";

const DATA = "2026-11-11";
const IMG = "GHID-RECEPTII-img";
const N_SUPP = 61; // ca în portofoliul pentru distribuitori din 10.11.2026
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
const baseCss = readFileSync(new URL("./build-ghid-receptii.mjs", import.meta.url), "utf8").match(/<style>([\s\S]*?)<\/style>/)[1];
const extraCss = `
  .two { display: grid; grid-template-columns: 1fr 1fr; gap: 7mm; align-items: start; }
  .ph { width: 100%; object-fit: cover; border-radius: 2.5mm; }
  p.big { font-size: 11pt; line-height: 1.5; color: #222; margin-bottom: 3mm; }
  .facts { display: grid; grid-template-columns: repeat(4, 1fr); gap: 4mm; margin: 5mm 0 1mm; }
  .facts div { background: var(--ink); color: #fff; border-radius: 2mm; padding: 3mm 4mm; }
  .facts b { display: block; font-size: 16pt; font-weight: 800; color: #fff; line-height: 1.1; }
  .facts span { font-size: 7.8pt; color: #cfcfcf; }
  .values { display: grid; grid-template-columns: repeat(3, 1fr); gap: 4mm; margin-top: 3mm; }
  .values div { background: var(--bg); border-top: 3px solid var(--red); border-radius: 0 0 2mm 2mm; padding: 3.5mm 4mm; font-size: 8.8pt; }
  .values b { display: block; text-transform: uppercase; letter-spacing: 1px; font-size: 8.6pt; margin-bottom: 1mm; }
  .founder { margin-top: 4mm; border: 1px solid var(--line); border-radius: 2.5mm; padding: 4mm 5mm; font-size: 9.5pt; }
  .founder p:last-child { margin: 0; }
  .brand h1 { font-size: 22pt; } .brand p { font-size: 9.2pt; } .brand .founder { margin-top: 3mm; } .brand p.big { font-size: 10.6pt; } .brand .values div { font-size: 8.5pt; }
  .how .steps div, .how .zones div, .how ul.rules { font-size: 8.9pt; } .how > p { font-size: 9.8pt; } .how h3 { margin-top: 5mm; }
`;

const L = {
  en: {
    lang: "en", file: "GHID-RECEPTII-EN", title: "Reception guide – Prime Supplements",
    footLabel: "Prime reception guide", edition: "Edition 11.11.2026",
    labels: { arome: "Flavours", varianta: "Variant", cine: "Who it is for", cand: "When to take it", spui: "What to say at the desk", expunere: "Where to display it" },
    cover: { kicker: "For partner gyms", h1: "The Prime <span>reception</span> guide",
      p: "Which products to keep at the front desk, who they are for, when to take them and what to tell a member in ten seconds. Bars, shots, sachets and the small products that sell themselves." },
    brand: { kicker: "About the brand", h1: "Built in competitive bodybuilding, <span>made for every athlete.</span>",
      big: "Prime Supplements was founded in 2022 in Sibiu County, Romania. Our mission is to educate and inspire athletes and to improve their performance.",
      p: ["The supplements are designed to support athletes up to the highest level of performance. The ranges serve both competitive athletes and people who train and want healthy, tailored nutrition.",
        "We analyse demand, athletes' needs and raw materials, and we keep raising quality. That is how we work towards our mission: to set a new standard in the supplement market, to support athletes on their way to peak performance and to offer products tailored to their nutritional needs."],
      facts: [["2022", "Year founded"], ["Romania", "Cisnădie, Sibiu County"], [String(N_SUPP), "supplements and functional foods in the range"], ["EU", "Made in the European Union"]],
      motto: "Hardcore Sports Nutrition is our motto and the mindset behind the company. The formulas, with their micro- and macronutrients, were designed after many years of study and experience in competitive bodybuilding. For us it is more than a motto that pushed us to look for the right balance in our products: it is a mindset that drives anyone to go beyond their own limits through dedication to their goal, supported by the balance between nutrition and training.",
      values: [["Educate", "Clear labels and a product blog that explains what each product contains, how much to take and when."], ["Inspire", "A brand that comes from the gym floor and speaks the language of people who train."], ["Perform", "Formulas adapted to what athletes need before, during and after training."]],
      founderKicker: "The founder",
      founder: "Marius Chera founded Prime Supplements in 2022. He is one of the best-known bodybuilding coaches in Romania and the first Romanian coach to have prepared athletes who earned the PRO card within the NPC organisation. His experience in bodybuilding is the basis on which the products were optimised: the range he recommends to bodybuilders throughout their preparation is the Prime Supplements range." },
    how: { kicker: "How to use the guide", h1: "Three questions and a well-stocked shelf.",
      p: "The front desk sells most when it asks, not when it waits. Every product in this guide comes with a sentence ready to say. We don't promise effects: we say what the product contains, who it is for and when to take it.",
      h3q: "The three front-desk questions",
      steps: [["What are you training today?", "Strength or heavy → creatine, pre-workout (vial or Nitrox). Cardio or a class → Fat Burning Shot, EAA in the water bottle."],
        ["Have you eaten before / will you eat after?", "Hasn't eaten → Creamy Rice or a bar now. Nothing to eat afterwards → bar, Prime Whey Go sachet, shaker."],
        ["What do you already take?", "Nothing → start with the bar and a sachet. Protein → creatine. Creatine → Creapure or pre-workout. All of it → vitamins, D3 + K2 in winter."]],
      h3z: "What goes where",
      zones: [["Counter, next to the till (impulse)", "Bars, all 4 flavours, in the open box. Sachet holder: Creatine Ready To Go and Prime Whey Go. The Prime shaker."],
        ["Drinks fridge", "Energy Pump Shot and Fat Burning Booster Shot, cold, on the eye-level shelf next to the water."],
        ["Shelf behind the desk (in sight)", "Prime Whey 1 kg (2–3 flavours), Creamy Rice, Creapure and micronised creatine, Nitrox 3D, EAA, Instant Oat Cream."],
        ["At the till, seasonal", "Autumn–winter: Vitamin D3 + K2 and Daily Vitamin Formula, with a small sign. Summer: the shots and EAA up front."]],
      h3r: "House rules",
      rules: ["The sample sells the tub: the Prime Whey Go sachet is the sample for Prime Whey 1 kg, the Energy Pump vial is the sample for Nitrox 3D.",
        "Caffeinated products (shots, Nitrox 3D) are not recommended late in the evening, for minors, pregnant women or people sensitive to caffeine.",
        "Supplements do not replace a varied diet. We don't promise weight loss, muscle gain or results; we describe the product and the dose on the label.",
        "The bar box and the sachet holders are refilled every morning; an empty shelf doesn't sell.",
        "Restocking orders: through your Prime agent or at contact@primesupplements.ro · +40 775 286 584."] },
    bars: { h3: "How to sell the bars", rules: ["Open box on the counter with all flavours in sight; a missing flavour means missing sales.",
      "The golden question after training: “Have you eaten anything?”", "A pack of 3 bars for members who come three times a week.",
      "The flavour to try first: salted caramel; for those who don't like it too sweet: chocolate & forest fruits."] },
    faq: { kicker: "Frequently asked at the desk", h1: "Short, correct answers.", items: [
      ["“Is creatine bad for my kidneys?”", "For healthy adults, 3–5 g a day is the dose on the label and the one that has been studied. Anyone with a medical condition or taking medication should ask their doctor. We don't give medical advice at the desk."],
      ["“Should I take creatine before or after training?”", "The time doesn't matter, taking it every day does. With water or in a shake, rest days included."],
      ["“Does protein make you fat?”", "Protein is a food, not a medicine: one serving of Prime Whey is roughly a large yoghurt. What counts is the day's total, not the shake."],
      ["“Can I drink two vials?”", "One vial a day. They contain caffeine: not in the evening, not with a lot of coffee, not for minors or during pregnancy."],
      ["“Is the bar good for weight loss?”", "It's a protein snack, a better choice than a wafer. Weight loss comes from total calories and training, not from a bar."],
      ["“Which flavour is the best?”", "Prime Whey and Whey Go: Salted Caramel and Strawberry Cheesecake. Bars: salted caramel. Creamy Rice: chocolate cake. Nitrox: Cherry."],
      ["“Where can I see the ingredients?”", "On the label and on primesupplements.ro: every product has its own page with the nutrition table and a blog article explaining how to use it."],
      ["“Is it made in Romania?”", "The brand is Romanian, from Sibiu; the products are made in the European Union."]],
      contact: "<b>Restocking and questions:</b> your gym's Prime agent · contact@primesupplements.ro · +40 775 286 584 (WhatsApp too) · primesupplements.ro<br>Shelf prices are set by the gym; the B2B price list and the recommended retail prices are in the separate document you receive from your agent.",
      foot: "Prime reception guide · Made in the European Union" },
    produse: [
      { tag: "Front-desk star", name: "Prime Delicious Bar", sub: "protein bar, 55 g · box of 12", arome: ["Strawberry", "Salted caramel", "Coconut & caramel", "Chocolate & forest fruits"],
        ce: "Coated protein bar: the protein snack for after training or on the go.",
        cine: "All members, including those who don't take supplements. The easiest product to sell at the front desk.",
        cand: "After training or as a snack between meals, when there is no time for a proper meal.",
        spui: "“Have you eaten anything after your workout? We have the Prime bar, with protein, in four flavours. Salted caramel is the gym's favourite.”",
        expunere: "On the counter, next to the till, with all four flavours in sight. Restock daily." },
      { tag: "Before training", name: "Energy Pump Shot", sub: "liquid pre-workout, 25 ml vial · box of 20", arome: ["Wild Berries"],
        ce: "Liquid pre-workout with caffeine, ready to drink: one vial = one serving. No shaker or water needed.",
        cine: "Members who arrive tired, in the evening after work, or who don't want a powder.",
        cand: "15–20 minutes before training. Not late in the evening (contains caffeine).",
        spui: "“Coming straight from work? Take an Energy Pump vial, drink it here at the desk and go train.”",
        expunere: "In the drinks fridge (best served cold) or on the counter, next to the bars." },
      { tag: "Cutting", name: "Fat Burning Booster Shot", sub: "25 ml vial · box of 20", arome: ["Forest Fruits"],
        ce: "Liquid shot with L-carnitine and caffeine, one vial = one serving, for cutting phases and cardio sessions.",
        cine: "Members doing cardio or group classes and those trying to lose weight (no promises: the product goes with the training, it doesn't replace it).",
        cand: "Before cardio or training. Not late in the evening (contains caffeine).",
        spui: "“Doing cardio today? We have the L-carnitine shot, you drink it before, straight from the vial.”",
        expunere: "In the fridge, next to Energy Pump. The two vials sell well together." },
      { tag: "Sachet", name: "Creatine Ready To Go", sub: "effervescent 10 g sachet · box of 25", arome: ["Blue Moon", "Pink Madness"],
        ce: "Flavoured creatine monohydrate in an effervescent sachet: it dissolves in a glass of water, no powder and no scoop.",
        cine: "Members who want to try creatine without buying a tub, or who left their creatine at home.",
        cand: "One sachet a day (a daily intake of 3 g of creatine increases physical performance in successive bursts of short-term, high-intensity exercise), rest days included.",
        spui: "“Do you take creatine? We have it in sachets too, one a day, it dissolves in water. Try one today after your workout.”",
        expunere: "In a sachet holder on the counter, next to the till, with both flavours." },
      { tag: "Sachet", name: "Prime Whey Go", sub: "whey protein sachet, 30 g · box of 15", arome: ["Chocolate Coconut", "Bourbon Vanilla", "Strawberry Cheesecake", "White Chocolate Raspberry", "Toffee Chocolate", "Salted Caramel", "Blueberry Vanilla"],
        ce: "Prime Whey as a 30 g single serving: one sachet, a shaker of water, the post-workout shake.",
        cine: "New members who don't have protein yet, and those who want to taste the flavours before buying the 1 kg tub.",
        cand: "After training or as a snack, whenever the day is short on protein.",
        spui: "“No protein with you? A Prime Whey Go sachet in the shaker with water and you're done. It's also how you choose the flavour for the big tub.”",
        expunere: "Sachet holder on the counter, next to the creatine sachets. The Prime shaker next to it." },
      { tag: "The core product", name: "Prime Whey 1 kg", sub: "whey protein concentrate, 33 servings", arome: ["Blueberry Vanilla", "Chocolate Coconut", "Salted Caramel", "Strawberry Cheesecake", "Toffee Chocolate", "White Chocolate Raspberry", "Bourbon Vanilla"],
        ce: "Prime whey protein, the 1 kg tub. Protein contributes to a growth in muscle mass and to the maintenance of muscle mass.",
        cine: "Anyone who trains regularly and doesn't cover their protein needs from food. The product most people start with.",
        cand: "One serving (30 g) after training or instead of a snack; 1–2 servings a day, depending on meals.",
        spui: "“How much protein do you eat a day? If you don't reach 1.6 g per kilo of body weight, a Prime Whey shake covers the gap. There are 7 flavours, here's a sachet to taste.”",
        expunere: "On the shelf behind the desk, in sight, 2–3 flavours. The Prime Whey Go sachet is its sample." },
      { tag: "Breakfast", name: "Creamy Rice", sub: "cream of rice, 1 kg, 22 servings", arome: ["Chocolate cake", "Blueberry muffin", "Salted caramel", "Coconut cream pie", "Maple syrup", "Cookies & cream", "Unflavoured"],
        ce: "Pregelatinised cream of rice: easily digested carbohydrates, ready in one minute with water or milk, no cooking.",
        cine: "Members who train in the morning, those in a bulking phase and anyone who wants a quick, filling breakfast.",
        cand: "Breakfast or the pre-workout meal (60–90 minutes before). It also works with a sachet of Prime Whey stirred in.",
        spui: "“What do you eat before training? Cream of rice is ready in a minute, you can even make it at the office. Chocolate cake is the most popular.”",
        expunere: "On the shelf, next to Prime Whey. It sells well together with the protein (a protein breakfast)." },
      { tag: "Creatine", name: "Micronised creatine", sub: "unflavoured creatine monohydrate, 300 g, 60 servings", arome: ["Unflavoured"],
        ce: "Micronised creatine monohydrate, unflavoured, to mix into a shake or any drink. The affordable creatine.",
        cine: "Members who want the simplest creatine at the best price per serving, or who mix it into their protein.",
        cand: "One scoop (5 g) a day, every day, at any time; the hour doesn't matter, consistency does.",
        spui: "“Creatine is the most studied supplement in the gym: 3 g a day, every day. This is the unflavoured one, you add it to your shake.”",
        expunere: "On the shelf, next to Creapure. The white tub stands out among the black ones." },
      { tag: "Premium creatine", name: "Creatine Creapure®", sub: "Creapure® creatine monohydrate, 300 g or 500 g", arome: ["Unflavoured · 300 g (60 servings)", "Unflavoured · 500 g (100 servings)"],
        ce: "Creapure® branded creatine monohydrate, made in Germany, with purity guaranteed by the manufacturer.",
        cine: "Members who know what they're looking for and ask for Creapure, competitive athletes, those who want “the best”.",
        cand: "3–5 g a day, every day, with water or in a shake, rest days included.",
        spui: "“If you want the creatine with the best reputation, Creapure is the German brand the professionals use. Same creatine, verified purity.”",
        expunere: "On the shelf, at eye level. The 300 g tub is the entry point, the 500 g one is for regulars." },
      { tag: "Before training", name: "Nitrox 3D", sub: "pre-workout powder, 500 g", arome: ["Cherry", "Pineapple Mango", "Passion Fruit", "Strawberry Lime"],
        ce: "A complete pre-workout with caffeine, citrulline, beta-alanine and creatine. One scoop in a shaker of water before training.",
        cine: "Advanced members who train hard and want a “real” pre-workout, not just a vial.",
        cand: "20–30 minutes before training. Not late in the evening. Beginners start with half a scoop.",
        spui: "“The vial is for today; if you want a pre-workout every day, Nitrox 3D works out cheaper per serving and comes in four flavours.”",
        expunere: "On the shelf, next to the shakers. The Energy Pump vial on the counter is its sample." },
      { tag: "Recovery", name: "EAA amino acids", sub: "essential amino acid powder, 500 g, 83 servings", arome: ["Peach Ice Tea", "Blueberry", "Strawberry & Kiwi", "Tropical"],
        ce: "All nine essential amino acids in a soft-drink flavoured powder. Drink it during training or instead of juice.",
        cine: "Members who train for long sessions, people doing intermittent fasting and those who don't want a protein shake at the gym.",
        cand: "During training (in the water bottle) or between meals.",
        spui: "“What do you drink while you train? EAA is like a juice, but with amino acids. Peach Ice Tea is the flavour you can't go wrong with.”",
        expunere: "On the shelf, next to Nitrox 3D." },
      { tag: "Every day", name: "Daily Vitamin Formula", sub: "vitamins and minerals in sachets, 30 sachets", arome: ["Flavoured drink sachets"],
        ce: "Multivitamins and minerals in sachets, one dose a day dissolved in water. One box = one month.",
        cine: "Members who already take vitamins, people who eat on the run, the cold season.",
        cand: "One sachet a day, in the morning, with water.",
        spui: "“Do you take vitamins? These come in sachets, one a day, and a box lasts a month. They sell a lot in autumn.”",
        expunere: "On the shelf or at the till in the cold season, next to Vitamin D3 + K2." },
      { tag: "Cold season", name: "Vitamin D3 + K2", sub: "80 capsules, Prime Health", arome: ["Capsules"],
        ce: "Vitamin D3 with K2, one capsule every other day. Vitamin D contributes to the normal function of the immune system and to the maintenance of normal bones.",
        cine: "All members, from October to March, when there isn't enough sun. The most requested product of the cold season.",
        cand: "One capsule every other day, with a meal that contains fat.",
        spui: "“In winter you can't get vitamin D from the sun. One capsule every other day, and the bottle lasts almost half a year.”",
        expunere: "At the till in the cold season, with a small “Vitamin D for winter” sign." },
      { tag: "Breakfast", name: "Instant Oat Cream", sub: "instant oat cream, 800 g, 25 servings", arome: ["Chocolate", "Cookie"],
        ce: "Finely ground, flavoured instant oats: made with water or milk, without cooking, like a cream.",
        cine: "Those who want oats for breakfast but have no time to cook them; the alternative to cream of rice.",
        cand: "Breakfast or the pre-workout meal.",
        spui: "“Do you eat oats in the morning? This one is ready in a minute, no cooking, in chocolate or cookie flavour.”",
        expunere: "On the shelf, next to Creamy Rice." },
      { tag: "Accessory", name: "Prime Shaker", sub: "600 ml, transparent black", arome: ["Transparent black, Prime logo"],
        ce: "The 600 ml Prime shaker with a strainer, for protein, creatine or EAA.",
        cine: "New members, those who left their shaker at home, those buying their first tub of protein.",
        cand: "With every powder sale: “Do you have a shaker?”",
        spui: "“Do you have a shaker? Take ours, 600 ml, with a strainer, and you've got today's protein sachet too.”",
        expunere: "On the counter next to the sachets, and on the shelf next to the tubs. It carries the brand around the gym." },
    ],
  },
  hu: {
    lang: "hu", file: "GHID-RECEPTII-HU", title: "Recepciós kézikönyv – Prime Supplements",
    footLabel: "Prime recepciós kézikönyv", edition: "Kiadás: 2026.11.11.",
    labels: { arome: "Ízek", varianta: "Változat", cine: "Kinek szól", cand: "Mikor fogyasszák", spui: "Mit mondj a recepción", expunere: "Hol helyezd el" },
    cover: { kicker: "Partnertermeknek", h1: "A Prime <span>recepciós</span> kézikönyv",
      p: "Mely termékeket tarts a recepción, kinek szólnak, mikor kell fogyasztani őket, és mit mondj a tagnak tíz másodperc alatt. Szeletek, shotok, tasakok és azok a kis termékek, amelyek maguktól fogynak." },
    brand: { kicker: "A márkáról", h1: "A versenyszintű testépítésből született, <span>minden sportolónak.</span>",
      big: "A Prime Supplements 2022-ben alakult Romániában, Szeben megyében. Küldetésünk, hogy tanítsuk és inspiráljuk a sportolókat, és javítsuk a teljesítményüket.",
      p: ["Étrend-kiegészítőink a legmagasabb teljesítményszintig támogatják a sportolókat. Termékcsaládjaink a versenysportolóknak és azoknak egyaránt szólnak, akik edzenek, és egészséges, testre szabott táplálkozásra vágynak.",
        "Elemezzük a keresletet, a sportolók igényeit és az alapanyagokat, és folyamatosan emeljük a minőséget. Így dolgozunk a küldetésünkön: új mércét állítani az étrend-kiegészítők piacán, támogatni a sportolókat a csúcsteljesítmény felé vezető úton, és a táplálkozási igényeikhez igazított termékeket kínálni."],
      facts: [["2022", "Az alapítás éve"], ["Románia", "Nagydisznód, Szeben megye"], [String(N_SUPP), "étrend-kiegészítő és funkcionális élelmiszer a kínálatban"], ["EU", "Az Európai Unióban gyártva"]],
      motto: "A Hardcore Sports Nutrition a mottónk és a cég mögötti szemlélet. A mikro- és makrotápanyagokat tartalmazó formulák a versenyszintű testépítésben szerzett sokéves tanulás és tapasztalat alapján készültek. Számunkra ez több egy mottónál, amely a termékeink megfelelő egyensúlyának keresésére ösztönzött: olyan szemlélet, amely bárkit arra sarkall, hogy a célja iránti elkötelezettséggel, a táplálkozás és az edzés egyensúlyára támaszkodva túllépjen a saját határain.",
      values: [["Tanítás", "Világos címkék és termékblog, amely elmagyarázza, mit tartalmaz az egyes termék, mennyit és mikor kell fogyasztani belőle."], ["Inspiráció", "Az edzőteremből jött márka, amely az edzők és az edzésre járók nyelvén beszél."], ["Teljesítmény", "Formulák, amelyek a sportolók edzés előtti, alatti és utáni igényeihez igazodnak."]],
      founderKicker: "Az alapító",
      founder: "Marius Chera 2022-ben alapította a Prime Supplements márkát. Románia egyik legismertebb testépítő edzője, és az első román edző, akinek felkészítésével sportolók PRO kártyát szereztek az NPC szervezetében. Testépítésben szerzett tapasztalata az alapja a termékek optimalizálásának: a versenyfelkészülés teljes ideje alatt a Prime Supplements termékeit ajánlja a testépítőknek." },
    how: { kicker: "Hogyan használd a kézikönyvet", h1: "Három kérdés és egy jól berendezett polc.",
      p: "A recepció akkor ad el a legtöbbet, ha kérdez, nem ha vár. A kézikönyvben minden termékhez tartozik egy kimondásra kész mondat. Hatásokat nem ígérünk: elmondjuk, mit tartalmaz a termék, kinek szól, és mikor kell fogyasztani.",
      h3q: "A recepció három kérdése",
      steps: [["Mit edzel ma?", "Erősítés, nehéz edzés → kreatin, edzés előtti (ampulla vagy Nitrox). Kardió vagy csoportos óra → Fat Burning Shot, EAA a kulacsba."],
        ["Ettél előtte / eszel utána?", "Nem evett → Creamy Rice vagy egy szelet most. Nincs mit ennie utána → szelet, Prime Whey Go tasak, shaker."],
        ["Mit szedsz már?", "Semmit → kezdje a szelettel és egy tasakkal. Fehérjét → kreatin. Kreatint → Creapure vagy edzés előtti. Mindent → vitaminok, télen D3 + K2."]],
      h3z: "Mi hova kerül",
      zones: [["Pult, a kassza mellett (impulzusvásárlás)", "Szeletek, mind a 4 íz, a nyitott dobozban. Tasaktartó: Creatine Ready To Go és Prime Whey Go. A Prime shaker."],
        ["Italhűtő", "Energy Pump Shot és Fat Burning Booster Shot, hidegen, szemmagasságban, a víz mellett."],
        ["A recepció mögötti polc (jól látható)", "Prime Whey 1 kg (2–3 íz), Creamy Rice, Creapure és mikronizált kreatin, Nitrox 3D, EAA, Instant Oat Cream."],
        ["A kasszánál, szezonálisan", "Ősz–tél: D3 + K2-vitamin és Daily Vitamin Formula, egy kis felirattal. Nyár: a shotok és az EAA elöl."]],
      h3r: "Házirend",
      rules: ["A minta eladja a dobozt: a Prime Whey Go tasak a Prime Whey 1 kg mintája, az Energy Pump ampulla a Nitrox 3D mintája.",
        "A koffeintartalmú termékek (shotok, Nitrox 3D) nem ajánlottak késő este, kiskorúaknak, várandós nőknek és koffeinérzékenyeknek.",
        "Az étrend-kiegészítők nem helyettesítik a változatos étrendet. Nem ígérünk fogyást, izomtömeget vagy eredményt; a terméket és a címkén szereplő adagot írjuk le.",
        "A szeletes dobozt és a tasaktartókat minden reggel feltöltjük; az üres polc nem ad el.",
        "Utánrendelés: a Prime üzletkötőn keresztül vagy a contact@primesupplements.ro címen · +40 775 286 584."] },
    bars: { h3: "Hogyan adjuk el a szeleteket", rules: ["Nyitott doboz a pulton, minden íz jól látható; egy hiányzó íz kieső eladást jelent.",
      "Az aranykérdés edzés után: „Ettél már valamit?”", "3 szeletes csomag azoknak, akik hetente háromszor jönnek.",
      "Elsőnek kipróbálandó íz: sós karamell; akik nem szeretik a túl édeset: csokoládé és erdei gyümölcs."] },
    faq: { kicker: "Gyakori kérdések a recepción", h1: "Rövid, helyes válaszok.", items: [
      ["„Árt a kreatin a vesémnek?”", "Egészséges felnőtteknél a napi 3–5 g a címkén szereplő és a vizsgált adag. Akinek betegsége van vagy gyógyszert szed, kérdezze meg az orvosát. A recepción nem adunk orvosi tanácsot."],
      ["„Edzés előtt vagy után kell bevenni a kreatint?”", "Nem az időpont számít, hanem hogy minden nap. Vízzel vagy shake-ben, a pihenőnapokon is."],
      ["„Hízlal a fehérje?”", "A fehérje élelmiszer, nem gyógyszer: egy adag Prime Whey nagyjából egy nagy joghurtnak felel meg. A nap teljes bevitele számít, nem egy shake."],
      ["„Ihatok két ampullát?”", "Napi egy ampullát. Koffeint tartalmaznak: este nem, sok kávé mellett nem, kiskorúaknak és várandósság alatt nem."],
      ["„Jó a szelet fogyáshoz?”", "Fehérjés nasi, jobb választás egy ostyánál. A fogyás az összes kalóriából és az edzésből jön, nem egy szeletből."],
      ["„Melyik íz a legjobb?”", "Prime Whey és Whey Go: Salted Caramel és Strawberry Cheesecake. Szeletek: sós karamell. Creamy Rice: csokoládétorta. Nitrox: Cherry."],
      ["„Hol látom az összetételt?”", "A címkén és a primesupplements.ro oldalon: minden terméknek saját oldala van tápértéktáblázattal, és egy blogcikk is elmagyarázza a használatát."],
      ["„Romániában készül?”", "A márka román, Szebenből való; a termékek az Európai Unióban készülnek."]],
      contact: "<b>Utánrendelés és kérdések:</b> a terem Prime üzletkötője · contact@primesupplements.ro · +40 775 286 584 (WhatsAppon is) · primesupplements.ro<br>A polci árakat a terem határozza meg; a B2B árlista és az ajánlott fogyasztói árak az üzletkötőtől kapott külön dokumentumban szerepelnek.",
      foot: "Prime recepciós kézikönyv · Az Európai Unióban gyártva" },
    produse: [
      { tag: "A recepció sztárja", name: "Prime Delicious Bar", sub: "fehérjeszelet, 55 g · 12 db-os doboz", arome: ["Eper", "Sós karamell", "Kókusz és karamell", "Csokoládé és erdei gyümölcs"],
        ce: "Bevonatos fehérjeszelet: fehérjés nasi edzés után vagy útközben.",
        cine: "Minden tag, azok is, akik nem szednek étrend-kiegészítőt. A recepción a legkönnyebben eladható termék.",
        cand: "Edzés után vagy két étkezés között, amikor nincs idő egy rendes étkezésre.",
        spui: "„Ettél valamit edzés után? Itt a Prime fehérjeszelet, négy ízben. A sós karamell a terem kedvence.”",
        expunere: "A pulton, a kassza mellett, mind a négy íz jól látható. Naponta feltölteni." },
      { tag: "Edzés előtt", name: "Energy Pump Shot", sub: "folyékony edzés előtti ital, 25 ml-es ampulla · 20 db-os doboz", arome: ["Wild Berries (erdei gyümölcs)"],
        ce: "Koffeintartalmú, ivásra kész edzés előtti ital: egy ampulla = egy adag. Nem kell hozzá shaker, sem víz.",
        cine: "Azok a tagok, akik fáradtan érkeznek, este munka után, vagy akik nem szeretik a port.",
        cand: "15–20 perccel edzés előtt. Késő este nem ajánlott (koffeint tartalmaz).",
        spui: "„Egyenesen a munkából jössz? Igyál meg itt a pultnál egy Energy Pump ampullát, és mehetsz edzeni.”",
        expunere: "Az italhűtőben (hidegen a legjobb) vagy a pulton, a szeletek mellett." },
      { tag: "Szálkásítás", name: "Fat Burning Booster Shot", sub: "25 ml-es ampulla · 20 db-os doboz", arome: ["Forest Fruits (erdei gyümölcs)"],
        ce: "Folyékony shot L-karnitinnel és koffeinnel, egy ampulla = egy adag, szálkásító időszakokra és kardióedzésekhez.",
        cine: "Akik kardióznak vagy csoportos órákra járnak, és akik fogyni szeretnének (ígéretek nélkül: a termék az edzést kíséri, nem helyettesíti).",
        cand: "Kardió vagy edzés előtt. Késő este nem ajánlott (koffeint tartalmaz).",
        spui: "„Ma kardiózol? Van L-karnitines shotunk, előtte kell meginni, egyenesen az ampullából.”",
        expunere: "A hűtőben, az Energy Pump mellett. A két ampulla jól fogy együtt." },
      { tag: "Tasakos", name: "Creatine Ready To Go", sub: "10 g-os pezsgő tasak · 25 db-os doboz", arome: ["Blue Moon", "Pink Madness"],
        ce: "Ízesített kreatin-monohidrát pezsgő tasakban: egy pohár vízben feloldódik, por és adagolókanál nélkül.",
        cine: "Akik doboz vásárlása nélkül szeretnék kipróbálni a kreatint, vagy otthon felejtették a sajátjukat.",
        cand: "Napi 1 tasak (a napi 3 g kreatin fokozza a fizikai teljesítményt rövid ideig tartó, nagy intenzitású, ismételt edzések során), a pihenőnapokon is.",
        spui: "„Szedsz kreatint? Tasakban is van, napi egy, vízben oldódik. Próbálj ki egyet ma edzés után.”",
        expunere: "Tasaktartóban a pulton, a kassza mellett, mindkét ízzel." },
      { tag: "Tasakos", name: "Prime Whey Go", sub: "tejsavófehérje tasakban, 30 g · 15 db-os doboz", arome: ["Chocolate Coconut", "Bourbon Vanilla", "Strawberry Cheesecake", "White Chocolate Raspberry", "Toffee Chocolate", "Salted Caramel", "Blueberry Vanilla"],
        ce: "Prime Whey 30 g-os egyadagos kiszerelésben: egy tasak, egy shaker víz, és kész az edzés utáni shake.",
        cine: "Új tagok, akiknek még nincs fehérjéjük, és akik az 1 kg-os doboz előtt szeretnék megkóstolni az ízeket.",
        cand: "Edzés után vagy nasiként, amikor a napból hiányzik a fehérje.",
        spui: "„Nincs nálad fehérje? Egy Prime Whey Go tasak a shakerbe vízzel, és kész. Így a nagy dobozhoz is kiválaszthatod az ízt.”",
        expunere: "Tasaktartóban a pulton, a kreatintasakok mellett. Mellé a Prime shaker." },
      { tag: "Az alaptermék", name: "Prime Whey 1 kg", sub: "tejsavófehérje-koncentrátum, 33 adag", arome: ["Blueberry Vanilla", "Chocolate Coconut", "Salted Caramel", "Strawberry Cheesecake", "Toffee Chocolate", "White Chocolate Raspberry", "Bourbon Vanilla"],
        ce: "A Prime tejsavófehérje 1 kg-os dobozban. A fehérjék hozzájárulnak az izomtömeg növekedéséhez és fenntartásához.",
        cine: "Bárki, aki rendszeresen edz, és étkezésből nem fedezi a fehérjeszükségletét. A legtöbben ezzel kezdenek.",
        cand: "Egy adag (30 g) edzés után vagy nasi helyett; napi 1–2 adag, az étkezésektől függően.",
        spui: "„Mennyi fehérjét eszel naponta? Ha nem éred el a testsúlykilogrammonkénti 1,6 g-ot, egy Prime Whey shake pótolja a hiányt. 7 íz van, adok egy tasakot kóstolni.”",
        expunere: "A recepció mögötti polcon, jól láthatóan, 2–3 íz. A Prime Whey Go tasak a mintája." },
      { tag: "Reggeli", name: "Creamy Rice", sub: "rizskrém, 1 kg, 22 adag", arome: ["Csokoládétorta", "Áfonyás muffin", "Sós karamell", "Kókuszkrémes pite", "Juharszirup", "Kekszes krém", "Ízesítetlen"],
        ce: "Előzselatinizált rizskrém: könnyen emészthető szénhidrát, vízzel vagy tejjel egy perc alatt kész, főzés nélkül.",
        cine: "Akik reggel edzenek, akik tömegnövelő időszakban vannak, és bárki, aki gyors, laktató reggelit szeretne.",
        cand: "Reggelire vagy az edzés előtti étkezésként (60–90 perccel előtte). Egy tasak Prime Whey is keverhető bele.",
        spui: "„Mit eszel edzés előtt? A rizskrém egy perc alatt kész, akár az irodában is. A csokoládétortás a legkeresettebb.”",
        expunere: "A polcon, a Prime Whey mellett. A fehérjével együtt jól fogy (fehérjés reggeli)." },
      { tag: "Kreatin", name: "Mikronizált kreatin", sub: "ízesítetlen kreatin-monohidrát, 300 g, 60 adag", arome: ["Ízesítetlen"],
        ce: "Mikronizált kreatin-monohidrát, ízesítetlen, shake-be vagy bármilyen italba keverhető. A kedvező árú kreatin.",
        cine: "Akik a legegyszerűbb kreatint szeretnék a legjobb adagonkénti áron, vagy a fehérjéjükbe keverik.",
        cand: "Napi egy adagolókanál (5 g), minden nap, bármikor; nem az időpont számít, hanem a rendszeresség.",
        spui: "„A kreatin a legtöbbet kutatott étrend-kiegészítő a teremben: napi 3 g, minden nap. Ez az ízesítetlen, a shake-edbe teszed.”",
        expunere: "A polcon, a Creapure mellett. A fehér doboz kitűnik a feketék közül." },
      { tag: "Prémium kreatin", name: "Creapure® kreatin", sub: "Creapure® kreatin-monohidrát, 300 g vagy 500 g", arome: ["Ízesítetlen · 300 g (60 adag)", "Ízesítetlen · 500 g (100 adag)"],
        ce: "Creapure® márkájú kreatin-monohidrát, Németországban gyártva, a gyártó által garantált tisztasággal.",
        cine: "Akik tudják, mit keresnek, és Creapure-t kérnek, a versenysportolók, és akik „a legjobbat” akarják.",
        cand: "Napi 3–5 g, minden nap, vízzel vagy shake-ben, a pihenőnapokon is.",
        spui: "„Ha a legjobb hírű kreatint szeretnéd: a Creapure az a német márka, amelyet a profik használnak. Ugyanaz a kreatin, ellenőrzött tisztaság.”",
        expunere: "A polcon, szemmagasságban. A 300 g-os doboz a belépő, az 500 g-os a visszatérő vásárlóknak." },
      { tag: "Edzés előtt", name: "Nitrox 3D", sub: "edzés előtti por, 500 g", arome: ["Cherry", "Pineapple Mango", "Passion Fruit", "Strawberry Lime"],
        ce: "Teljes értékű edzés előtti formula koffeinnel, citrullinnal, béta-alaninnal és kreatinnal. Egy adagolókanál egy shaker vízben, edzés előtt.",
        cine: "Haladó tagok, akik keményen edzenek, és „igazi” edzés előtti terméket akarnak, nem csak egy ampullát.",
        cand: "20–30 perccel edzés előtt. Késő este nem ajánlott. A kezdők fél adagolókanállal kezdjenek.",
        spui: "„Az ampulla a mai napra jó; ha minden nap kell edzés előtti, a Nitrox 3D adagonként kedvezőbb, és négy íze van.”",
        expunere: "A polcon, a shakerek mellett. A pulton lévő Energy Pump ampulla a mintája." },
      { tag: "Regeneráció", name: "EAA aminosavak", sub: "esszenciális aminosav por, 500 g, 83 adag", arome: ["Peach Ice Tea", "Blueberry", "Strawberry & Kiwi", "Tropical"],
        ce: "Mind a kilenc esszenciális aminosav, üdítő ízű por formájában. Edzés közben vagy üdítő helyett fogyasztható.",
        cine: "Akik hosszan edzenek, akik időszakos böjtöt tartanak, és akik a teremben nem kérnek fehérjeshake-et.",
        cand: "Edzés közben (a kulacsban) vagy étkezések között.",
        spui: "„Mit iszol edzés közben? Az EAA olyan, mint egy üdítő, csak aminosavakkal. A Peach Ice Tea ízzel nem lehet mellényúlni.”",
        expunere: "A polcon, a Nitrox 3D mellett." },
      { tag: "Minden nap", name: "Daily Vitamin Formula", sub: "vitaminok és ásványi anyagok tasakban, 30 tasak", arome: ["Ízesített, vízben oldható tasakok"],
        ce: "Multivitamin és ásványi anyagok tasakban, napi egy adag vízben feloldva. Egy doboz = egy hónap.",
        cine: "Akik már szednek vitamint, akik rohanva étkeznek, és mindenki a hideg évszakban.",
        cand: "Napi egy tasak, reggel, vízzel.",
        spui: "„Szedsz vitamint? Ez tasakos, napi egy, a doboz egy hónapig tart. Ősszel nagyon fogy.”",
        expunere: "A polcon vagy a hideg évszakban a kasszánál, a D3 + K2-vitamin mellett." },
      { tag: "Hideg évszak", name: "D3 + K2-vitamin", sub: "80 kapszula, Prime Health", arome: ["Kapszula"],
        ce: "D3-vitamin K2-vel, kétnaponta egy kapszula. A D-vitamin hozzájárul az immunrendszer normál működéséhez és a normál csontozat fenntartásához.",
        cine: "Minden tag októbertől márciusig, amikor kevés a napfény. A hideg évszak legkeresettebb terméke.",
        cand: "Kétnaponta egy kapszula, zsiradékot tartalmazó étkezéshez.",
        spui: "„Télen a napból nem jutsz elég D-vitaminhoz. Kétnaponta egy kapszula, az üveg majdnem fél évig tart.”",
        expunere: "A kasszánál a hideg évszakban, egy kis „D-vitamin télre” felirattal." },
      { tag: "Reggeli", name: "Instant Oat Cream", sub: "instant zabkrém, 800 g, 25 adag", arome: ["Chocolate (csokoládé)", "Cookie (keksz)"],
        ce: "Finomra őrölt, ízesített instant zab: vízzel vagy tejjel, főzés nélkül krémesre elkészíthető.",
        cine: "Akik reggelire zabot ennének, de nincs idejük megfőzni; a rizskrém alternatívája.",
        cand: "Reggelire vagy az edzés előtti étkezésként.",
        spui: "„Zabot eszel reggel? Ez egy perc alatt kész, főzés nélkül, csokoládé vagy keksz ízben.”",
        expunere: "A polcon, a Creamy Rice mellett." },
      { tag: "Kiegészítő", name: "Prime shaker", sub: "600 ml, áttetsző fekete", arome: ["Áttetsző fekete, Prime logóval"],
        ce: "A 600 ml-es Prime shaker szűrőbetéttel, fehérjéhez, kreatinhoz vagy EAA-hoz.",
        cine: "Új tagok, akik otthon felejtették a shakerüket, és akik az első fehérjés dobozukat veszik.",
        cand: "Minden porvásárlásnál: „Van shakered?”",
        spui: "„Van shakered? Vidd a miénket, 600 ml, szűrővel, és a mai fehérjetasak is megvan hozzá.”",
        expunere: "A pulton a tasakok mellett és a polcon a dobozok mellett. Viszi a márkát a teremben." },
    ],
  },
};

// imaginile sunt aceleași pentru ambele limbi, în ordinea produselor
const IMGS = ["produs-baton-proteic-ciocolata-fructe-de-padure", "produs-energy-pump", "produs-fat-burning-booster", "produs-creatine-ready-to-go-plicuri-prime-supplements",
  "produs-prime-whey-go", "produs-prime-whey-1000g", "produs-crema-de-orez-tort-de-ciocolata", "produs-creatina-monohidrat-micronized-300g-fara-aroma", "produs-creatina-creapure",
  "produs-nitrox", "produs-eaa-aminoacizi-esentiali", "produs-daily-vitamin-formula", "produs-vitamina-d3-k2", "produs-instant-oat-cream-800g-25-serv", "produs-prime-shaker-customised"];
const BAR_IMGS = ["produs-baton-proteic-capsuni", "produs-baton-proteic-caramel-sarat", "produs-baton-proteic-cocos-si-caramel", "produs-baton-proteic-ciocolata-fructe-de-padure"];

function build(T) {
  const lb = T.labels;
  const foot = n => `<div class="foot"><span>${esc(T.footLabel)}</span><span>${n}</span></div>`;
  const card = (p, i) => `
<article class="card">
  <div class="pic"><img src="${IMG}/${IMGS[i]}.jpg" alt="${esc(p.name)}"></div>
  <div class="body">
    <p class="tag">${esc(p.tag)}</p>
    <h2>${esc(p.name)}</h2>
    <p class="sub">${esc(p.sub)}</p>
    <p class="ce">${esc(p.ce)}</p>
    ${i === 0 ? `<div class="arome-img">${BAR_IMGS.map((f, k) => `<figure><img src="${IMG}/${f}.jpg" alt=""><figcaption>${esc(p.arome[k])}</figcaption></figure>`).join("")}</div>`
      : `<div class="arome"><b>${p.arome.length > 1 ? lb.arome : lb.varianta}:</b> ${p.arome.map(esc).join(" · ")}</div>`}
    <dl>
      <div><dt>${lb.cine}</dt><dd>${esc(p.cine)}</dd></div>
      <div><dt>${lb.cand}</dt><dd>${esc(p.cand)}</dd></div>
      <div class="spui"><dt>${lb.spui}</dt><dd>${esc(p.spui)}</dd></div>
      <div><dt>${lb.expunere}</dt><dd>${esc(p.expunere)}</dd></div>
    </dl>
  </div>
</article>`;
  const B = T.brand, H = T.how, P = T.produse;
  let n = 2;
  const pages = [];
  pages.push(`<section class="page cover">
  <img class="hero" src="${IMG}/batoane-fiole.jpg" alt="">
  <div class="shade"></div>
  <img class="logo" src="${IMG}/logo-prime-alb.svg" alt="Prime Supplements">
  <div class="text">
    <p class="kicker" style="color:#ff6b6f">${esc(T.cover.kicker)}</p>
    <h1>${T.cover.h1}</h1>
    <p>${esc(T.cover.p)}</p>
  </div>
  <div class="foot"><span>Prime Sport Supplements SRL · primesupplements.ro</span><span>${esc(T.edition)}</span></div>
</section>`);
  pages.push(`<section class="page brand">
  <p class="kicker">${esc(B.kicker)}</p>
  <h1>${B.h1}</h1>
  <div class="two">
    <div><p class="big">${esc(B.big)}</p>${B.p.map(x => `<p>${esc(x)}</p>`).join("")}</div>
    <img class="ph" src="${IMG}/sala-ramat.jpg" alt="" style="height:60mm">
  </div>
  <div class="facts">${B.facts.map(([b, s]) => `<div><b>${esc(b)}</b><span>${esc(s)}</span></div>`).join("")}</div>
  <h3>Hardcore Sports Nutrition</h3>
  <p>${esc(B.motto)}</p>
  <div class="values">${B.values.map(([b, s]) => `<div><b>${esc(b)}</b>${esc(s)}</div>`).join("")}</div>
  <div class="founder"><p class="kicker">${esc(B.founderKicker)}</p><h3 style="margin-top:0;border:0;padding:0">Marius Chera</h3><p>${esc(B.founder)}</p></div>
  ${foot(n++)}
</section>`);
  pages.push(`<section class="page how">
  <p class="kicker">${esc(H.kicker)}</p>
  <h1>${esc(H.h1)}</h1>
  <p>${esc(H.p)}</p>
  <h3>${esc(H.h3q)}</h3>
  <div class="steps">${H.steps.map(([b, s], k) => `<div><i>${k + 1}</i><b>${esc(b)}</b>${esc(s)}</div>`).join("")}</div>
  <h3>${esc(H.h3z)}</h3>
  <div class="zones">${H.zones.map(([b, s]) => `<div><b>${esc(b)}</b>${esc(s)}</div>`).join("")}</div>
  <h3>${esc(H.h3r)}</h3>
  <ul class="rules">${H.rules.map(r => `<li>${esc(r)}</li>`).join("")}</ul>
  <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:3mm;margin-top:3mm"><img src="${IMG}/sala-instant-oats.jpg" alt="" style="width:100%;height:26mm;object-fit:cover;border-radius:2mm"><img src="${IMG}/sala-whey-nitrox3d.jpg" alt="" style="width:100%;height:26mm;object-fit:cover;border-radius:2mm"><img src="${IMG}/sala-nostim-portret.jpg" alt="" style="width:100%;height:26mm;object-fit:cover;border-radius:2mm"></div>
  ${foot(n++)}
</section>`);
  pages.push(`<section class="page">${card(P[0], 0)}<h3>${esc(T.bars.h3)}</h3><ul class="rules">${T.bars.rules.map(r => `<li>${esc(r)}</li>`).join("")}</ul><img src="${IMG}/plaja-bar-5.jpg" alt="" style="width:100%;height:78mm;object-fit:cover;border-radius:3mm;margin-top:5mm">${foot(n++)}</section>`);
  for (let i = 1; i < P.length; i += 2) pages.push(`<section class="page">${card(P[i], i)}${P[i + 1] ? card(P[i + 1], i + 1) : ""}${foot(n++)}</section>`);
  pages.push(`<section class="page">
  <p class="kicker">${esc(T.faq.kicker)}</p>
  <h1>${esc(T.faq.h1)}</h1>
  <div class="faq">${T.faq.items.map(([q, a]) => `<div><b>${esc(q)}</b>${esc(a)}</div>`).join("")}</div>
  <img src="${IMG}/sala-nostim-detaliu.jpg" alt="" style="width:100%;height:52mm;object-fit:cover;border-radius:3mm;margin-top:5mm">
  <div class="contact">${T.faq.contact}</div>
  <div class="foot"><span>${esc(T.faq.foot)}</span><span>${n}</span></div>
</section>`);
  return `<!doctype html>
<html lang="${T.lang}"><head><meta charset="utf-8">
<title>${esc(T.title)}</title>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;800&display=swap" rel="stylesheet">
<style>${baseCss}${extraCss}</style></head>
<body>
${pages.join("\n")}
<script>
  const n = +new URLSearchParams(location.search).get("page");
  if (location.search.includes("check")) addEventListener("load", () => { const mm = 297 * 96 / 25.4 + 2; document.body.setAttribute("data-check", [...document.querySelectorAll(".page")].map((s, i) => (i + 1) + ":" + Math.round(s.getBoundingClientRect().height) + (s.getBoundingClientRect().height > mm ? "!PREA-LUNG" : "")).join(" ")); });
  if (n) { document.body.style.cssText = "background:#fff;padding:0;margin:0"; document.querySelectorAll(".page").forEach((s, i) => { if (i + 1 !== n) s.remove(); else s.style.margin = "0"; }); }
</script>
</body></html>`;
}

for (const T of Object.values(L)) {
  if (T.produse.length !== IMGS.length) throw new Error(`${T.lang}: ${T.produse.length} produse, ${IMGS.length} imagini`);
  writeFileSync(new URL(`./${T.file}-${DATA}.html`, import.meta.url), "﻿" + build(T), "utf8");
  console.log("scris", T.file, "produse:", T.produse.length);
}
