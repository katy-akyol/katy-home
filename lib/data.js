// Sample content for the Phase 1 preview. Everything here is a placeholder
// Kate can rewrite — in Phase 3 it moves into a database she edits in the app.

import { toMinutes } from "./dates";

export const owner = "Kate";

/* ───────────── Scripture (King James Version, public domain) ───────────── */

export const verses = [
  { ref: "Psalm 46:10", text: "Be still, and know that I am God." },
  { ref: "Isaiah 26:3", text: "Thou wilt keep him in perfect peace, whose mind is stayed on thee: because he trusteth in thee." },
  { ref: "Matthew 11:28", text: "Come unto me, all ye that labour and are heavy laden, and I will give you rest." },
  { ref: "Lamentations 3:22–23", text: "His compassions fail not. They are new every morning: great is thy faithfulness." },
  { ref: "Psalm 23:1–2", text: "The LORD is my shepherd; I shall not want. He maketh me to lie down in green pastures: he leadeth me beside the still waters." },
  { ref: "John 14:27", text: "Peace I leave with you, my peace I give unto you: not as the world giveth, give I unto you." },
  { ref: "Proverbs 16:3", text: "Commit thy works unto the LORD, and thy thoughts shall be established." },
  { ref: "Psalm 90:12", text: "So teach us to number our days, that we may apply our hearts unto wisdom." },
  { ref: "Ecclesiastes 3:1", text: "To every thing there is a season, and a time to every purpose under the heaven." },
  { ref: "Psalm 118:24", text: "This is the day which the LORD hath made; we will rejoice and be glad in it." },
  { ref: "Isaiah 40:31", text: "They that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles." },
  { ref: "Philippians 4:7", text: "And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus." },
];

export const readingPlan = {
  title: "The Gospel of John",
  subtitle: "One chapter a day, slowly",
  book: "John",
  days: 21,
  startCompleted: 7,
};

export const journalEntry = {
  passage: "John 8:12",
  scripture: "I am the light of the world: he that followeth me shall not walk in darkness, but shall have the light of life.",
  observation: "Jesus says this right after showing mercy to the woman everyone else had already judged. The light comes with mercy, not before it.",
  application: "When the house feels loud today, I can choose to be light — a gentle voice instead of a sharp one.",
  prayer: "Lord, let my home be a place where the children see your light in me, especially in the hard moments.",
};

export const prayers = [
  { id: "p1", text: "Wisdom for this school year", since: "September" },
  { id: "p2", text: "Healing for Grandma's knee", since: "October" },
  { id: "p3", text: "Our church's new family ministry", since: "October" },
  { id: "p4", text: "Patience in the late afternoons", since: "Last week" },
  { id: "p5", text: "A safe trip for my sister's family", since: "August", answered: "Answered · Sept 2" },
];

export const memoryVerse = {
  ref: "Philippians 4:6",
  text: "Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God.",
};

/* ───────────── Kitchen: Turkish home cooking ───────────── */

export const recipes = [
  {
    slug: "karniyarik",
    title: "Karnıyarık",
    subtitle: "Stuffed eggplant with spiced beef",
    blurb: "Soft, silky eggplants split open and filled with a peppery beef and tomato filling. A Sunday favorite.",
    time: "1 hr 15 min",
    serves: 4,
    tags: ["Sunday", "Classic"],
    tone: "rose",
    ingredients: [
      { item: "Small eggplants", qty: "4", aisle: "Produce" },
      { item: "Ground beef", qty: "½ lb", aisle: "Meat & Fish" },
      { item: "Yellow onion", qty: "1", aisle: "Produce" },
      { item: "Tomatoes", qty: "2", aisle: "Produce" },
      { item: "Long green peppers", qty: "3", aisle: "Produce" },
      { item: "Garlic", qty: "2 cloves", aisle: "Produce" },
      { item: "Flat-leaf parsley", qty: "1 bunch", aisle: "Produce" },
      { item: "Tomato paste", qty: "2 tbsp", aisle: "Pantry" },
      { item: "Olive oil", qty: "for frying", aisle: "Pantry" },
      { item: "Plain yogurt", qty: "1 cup", aisle: "Dairy & Eggs" },
    ],
    steps: [
      "Peel the eggplants in stripes, like a zebra. Salt them and let them rest for 20 minutes, then pat dry.",
      "Fry or roast the eggplants in olive oil, turning, until soft and golden all over. Set them in a baking dish. Heat the oven to 375°F.",
      "For the filling, soften the chopped onion in a little oil. Add the beef and cook until browned.",
      "Stir in the garlic, one diced pepper, one diced tomato and 1 tbsp tomato paste. Cook for 5 minutes, then add the parsley, salt and pepper.",
      "Gently slit each eggplant lengthwise and press it open into a little boat. Spoon in the filling.",
      "Top each one with a slice of tomato and a strip of pepper. Loosen the remaining tomato paste with ½ cup of water and pour it around the eggplants.",
      "Bake for 25 minutes. Serve warm with rice and a spoonful of yogurt.",
    ],
  },
  {
    slug: "mercimek-corbasi",
    title: "Mercimek Çorbası",
    subtitle: "Red lentil soup",
    blurb: "The soup of every Turkish home. Velvety and golden, finished with sizzling butter, mint and a squeeze of lemon.",
    time: "40 min",
    serves: 6,
    tags: ["Weeknight", "Meatless"],
    tone: "honey",
    ingredients: [
      { item: "Red lentils", qty: "1½ cups", aisle: "Pantry" },
      { item: "Yellow onion", qty: "1", aisle: "Produce" },
      { item: "Carrot", qty: "1", aisle: "Produce" },
      { item: "Potato", qty: "1 small", aisle: "Produce" },
      { item: "Tomato paste", qty: "1 tbsp", aisle: "Pantry" },
      { item: "Chicken or vegetable broth", qty: "7 cups", aisle: "Pantry" },
      { item: "Ground cumin", qty: "1 tsp", aisle: "Pantry" },
      { item: "Butter", qty: "2 tbsp", aisle: "Dairy & Eggs" },
      { item: "Dried mint & pul biber", qty: "1 tsp each", aisle: "Pantry" },
      { item: "Lemons", qty: "1", aisle: "Produce" },
    ],
    steps: [
      "Rinse the lentils until the water runs clear.",
      "Soften the chopped onion and carrot in a little oil, about 6 minutes. Stir in the tomato paste and cumin for one minute.",
      "Add the lentils, the diced potato and the broth. Bring to a boil, then simmer for 25 minutes until everything is very soft.",
      "Blend until completely smooth. Season with salt and loosen with a little water if it is too thick.",
      "Melt the butter until it foams, then stir in the mint and pul biber.",
      "Ladle the soup into bowls, drizzle the red butter over the top and serve with lemon wedges.",
    ],
  },
  {
    slug: "izmir-kofte",
    title: "İzmir Köfte",
    subtitle: "Baked meatballs with potatoes and peppers",
    blurb: "Little meatballs baked between potatoes and peppers in a light tomato sauce. One pan, the whole family fed.",
    time: "1 hr",
    serves: 4,
    tags: ["One pan", "Kid favorite"],
    tone: "terracotta",
    ingredients: [
      { item: "Ground beef", qty: "1 lb", aisle: "Meat & Fish" },
      { item: "Yellow onion", qty: "1", aisle: "Produce" },
      { item: "Eggs", qty: "1", aisle: "Dairy & Eggs" },
      { item: "Breadcrumbs", qty: "⅓ cup", aisle: "Pantry" },
      { item: "Ground cumin", qty: "1 tsp", aisle: "Pantry" },
      { item: "Flat-leaf parsley", qty: "½ bunch", aisle: "Produce" },
      { item: "Potatoes", qty: "3 medium", aisle: "Produce" },
      { item: "Long green peppers", qty: "3", aisle: "Produce" },
      { item: "Tomatoes", qty: "2", aisle: "Produce" },
      { item: "Tomato paste", qty: "2 tbsp", aisle: "Pantry" },
    ],
    steps: [
      "Heat the oven to 400°F.",
      "Grate the onion and squeeze out its juice. Mix it with the beef, egg, breadcrumbs, cumin, chopped parsley, salt and pepper.",
      "Shape the mixture into small oval köfte. Ella can help with this part.",
      "Cut the potatoes into thick wedges and brown them lightly in a pan, along with the köfte.",
      "Arrange the köfte, potatoes, sliced tomatoes and peppers in rows in a baking dish.",
      "Whisk the tomato paste into 1½ cups of hot water with a pinch of salt, and pour it over everything.",
      "Bake for 35–40 minutes, until the potatoes are tender and the sauce has thickened.",
    ],
  },
  {
    slug: "tavuk-sis",
    title: "Tavuk Şiş & Bulgur Pilavı",
    subtitle: "Yogurt-marinated chicken skewers with bulgur pilaf",
    blurb: "Tender chicken soaked in yogurt and spices, charred at the edges, served with a buttery tomato bulgur.",
    time: "45 min + marinating",
    serves: 4,
    tags: ["Make-ahead", "Grill"],
    tone: "sage",
    ingredients: [
      { item: "Boneless chicken thighs", qty: "2 lb", aisle: "Meat & Fish" },
      { item: "Plain yogurt", qty: "½ cup", aisle: "Dairy & Eggs" },
      { item: "Tomato paste", qty: "1 tbsp", aisle: "Pantry" },
      { item: "Red pepper paste (biber salçası)", qty: "1 tbsp", aisle: "Pantry" },
      { item: "Garlic", qty: "3 cloves", aisle: "Produce" },
      { item: "Lemons", qty: "1", aisle: "Produce" },
      { item: "Coarse bulgur", qty: "1½ cups", aisle: "Pantry" },
      { item: "Yellow onion", qty: "1", aisle: "Produce" },
      { item: "Butter", qty: "2 tbsp", aisle: "Dairy & Eggs" },
      { item: "Chicken or vegetable broth", qty: "3 cups", aisle: "Pantry" },
    ],
    steps: [
      "Cut the chicken into bite-size pieces. Mix the yogurt, both pastes, grated garlic, lemon juice, a splash of olive oil, salt and paprika, and coat the chicken. Marinate for at least 2 hours, or overnight.",
      "Thread the chicken onto skewers. If you use wooden skewers, soak them first.",
      "For the pilaf, soften the chopped onion in butter. Stir in 1 tbsp tomato paste, then the bulgur.",
      "Add the hot broth and a pinch of salt. Cover and simmer gently for 15 minutes, then turn off the heat and let it rest for 10 minutes under a towel.",
      "Grill or broil the skewers for 10–12 minutes, turning, until charred at the edges and cooked through.",
      "Serve the skewers on the pilaf with a simple tomato and cucumber salad.",
    ],
  },
  {
    slug: "pide",
    title: "Friday Pide Night",
    subtitle: "Boat-shaped flatbreads, two ways",
    blurb: "Everyone shapes their own boat. Some with spiced beef, some with cheese, and a little egg cracked on top for the brave.",
    time: "1 hr",
    serves: 4,
    tags: ["Family", "Friday"],
    tone: "honey",
    ingredients: [
      { item: "Pizza dough", qty: "2 lb", aisle: "Bakery" },
      { item: "Ground beef", qty: "½ lb", aisle: "Meat & Fish" },
      { item: "Yellow onion", qty: "1", aisle: "Produce" },
      { item: "Tomatoes", qty: "1", aisle: "Produce" },
      { item: "Long green peppers", qty: "1", aisle: "Produce" },
      { item: "Flat-leaf parsley", qty: "½ bunch", aisle: "Produce" },
      { item: "Feta", qty: "6 oz", aisle: "Dairy & Eggs" },
      { item: "Mozzarella", qty: "8 oz", aisle: "Dairy & Eggs" },
      { item: "Eggs", qty: "4", aisle: "Dairy & Eggs" },
      { item: "Butter", qty: "2 tbsp", aisle: "Dairy & Eggs" },
    ],
    steps: [
      "Let the dough sit at room temperature for an hour. Heat the oven as hot as it goes, with a tray inside.",
      "For the beef filling, mix the raw beef with finely chopped onion, tomato, pepper, parsley, salt and pul biber.",
      "For the cheese filling, crumble the feta and mix it with the mozzarella.",
      "Divide the dough into 4 and roll each piece into a long oval. Spread the filling down the middle, leaving a border.",
      "Fold the long edges over the filling and pinch the ends into points to make a boat.",
      "Bake for 10–12 minutes. In the last 3 minutes, crack an egg into a cheese pide if you like.",
      "Brush the crusts with melted butter, slice and share.",
    ],
  },
  {
    slug: "menemen",
    title: "Menemen",
    subtitle: "Soft eggs with tomatoes and peppers",
    blurb: "A slow Saturday breakfast: peppers and ripe tomatoes cooked down, eggs folded in, warm bread for dipping.",
    time: "20 min",
    serves: 4,
    tags: ["Breakfast", "Quick"],
    tone: "terracotta",
    ingredients: [
      { item: "Eggs", qty: "6", aisle: "Dairy & Eggs" },
      { item: "Tomatoes", qty: "4", aisle: "Produce" },
      { item: "Long green peppers", qty: "2", aisle: "Produce" },
      { item: "Butter", qty: "1 tbsp", aisle: "Dairy & Eggs" },
      { item: "Feta", qty: "2 oz", aisle: "Dairy & Eggs" },
      { item: "Crusty bread", qty: "1 loaf", aisle: "Bakery" },
    ],
    steps: [
      "Slice the peppers thinly and soften them in butter and a little olive oil in a wide pan.",
      "Grate the tomatoes, discarding the skins, and add them to the pan. Simmer until thick and jammy, about 8 minutes. Season with salt and pul biber.",
      "Crack in the eggs. Stir slowly and gently. Take the pan off the heat while the eggs are still soft.",
      "Crumble feta on top and bring the pan straight to the table with warm bread.",
    ],
  },
  {
    slug: "sutlac",
    title: "Sütlaç",
    subtitle: "Turkish rice pudding",
    blurb: "Creamy, gently sweet and dusted with cinnamon. Make it in the afternoon and let it chill until dessert.",
    time: "45 min + chilling",
    serves: 6,
    tags: ["Dessert", "Make-ahead"],
    tone: "sage",
    ingredients: [
      { item: "Short-grain rice", qty: "½ cup", aisle: "Pantry" },
      { item: "Whole milk", qty: "4 cups", aisle: "Dairy & Eggs" },
      { item: "Sugar", qty: "¾ cup", aisle: "Pantry" },
      { item: "Rice flour or cornstarch", qty: "2 tbsp", aisle: "Pantry" },
      { item: "Vanilla", qty: "1 tsp", aisle: "Pantry" },
      { item: "Ground cinnamon", qty: "to dust", aisle: "Pantry" },
    ],
    steps: [
      "Simmer the rice in 1 cup of water until the water is absorbed, about 12 minutes.",
      "Add the milk and bring it to a gentle simmer, stirring often, for 15 minutes.",
      "Whisk the rice flour with a few spoonfuls of cold milk or water until smooth, then stir it into the pot.",
      "Add the sugar and keep stirring for 10 minutes, until it coats the back of a spoon. Stir in the vanilla.",
      "Pour into little bowls and let them cool, then chill for at least 2 hours.",
      "Dust with cinnamon just before serving.",
    ],
  },
];

/** Index = weekday (0 = Sunday). */
export const mealPlan = [
  { recipe: "karniyarik" },
  { recipe: "mercimek-corbasi" },
  { recipe: "izmir-kofte" },
  { title: "Leftovers & çoban salatası", note: "A night off" },
  { recipe: "tavuk-sis" },
  { recipe: "pide" },
  { recipe: "menemen", note: "Slow Saturday breakfast" },
];

export function recipeBySlug(slug) {
  return recipes.find((r) => r.slug === slug);
}

export function mealFor(weekday) {
  const m = mealPlan[weekday];
  const r = m.recipe ? recipeBySlug(m.recipe) : null;
  return r
    ? { title: r.title, subtitle: r.subtitle, note: m.note || r.time, href: `/kitchen/${r.slug}`, recipe: r }
    : { title: m.title, note: m.note };
}

export const AISLE_ORDER = ["Produce", "Bakery", "Meat & Fish", "Dairy & Eggs", "Frozen", "Pantry"];

const FRACTIONS = { "½": 0.5, "⅓": 1 / 3, "¼": 0.25, "¾": 0.75, "⅔": 2 / 3 };

function parseQty(q) {
  const m = q.match(/^(\d*)([½⅓¼¾⅔]?)\s*(.*)$/);
  if (!m || (!m[1] && !m[2])) return null;
  return { n: (m[1] ? Number(m[1]) : 0) + (m[2] ? FRACTIONS[m[2]] : 0), unit: m[3] };
}

function formatNum(n) {
  const whole = Math.floor(n + 1e-9);
  const rest = n - whole;
  const frac = Object.entries(FRACTIONS).find(([, v]) => Math.abs(v - rest) < 0.01);
  if (rest < 0.01) return String(whole);
  return frac ? `${whole || ""}${frac[0]}` : n.toFixed(1);
}

/** "2 cloves" + "3 cloves" -> "5 cloves"; mismatched units stay listed side by side. */
function combineQty(list) {
  const parsed = list.map(parseQty);
  if (parsed.every(Boolean) && parsed.every((p) => p.unit === parsed[0].unit)) {
    const total = parsed.reduce((t, p) => t + p.n, 0);
    return `${formatNum(total)}${parsed[0].unit ? " " + parsed[0].unit : ""}`;
  }
  return list.join(" + ");
}

/** Combine every planned recipe's ingredients into one list, grouped by aisle. */
export function groceryList() {
  const map = new Map();
  for (const m of mealPlan) {
    const r = m.recipe && recipeBySlug(m.recipe);
    if (!r) continue;
    for (const ing of r.ingredients) {
      const key = ing.item.toLowerCase();
      const existing = map.get(key);
      if (existing) {
        existing.qty.push(ing.qty);
        existing.for.add(r.title);
      } else {
        map.set(key, { id: key, item: ing.item, qty: [ing.qty], aisle: ing.aisle, for: new Set([r.title]) });
      }
    }
  }
  return AISLE_ORDER.map((aisle) => ({
    aisle,
    items: [...map.values()]
      .filter((i) => i.aisle === aisle)
      .map((i) => ({ id: i.id, item: i.item, qty: combineQty(i.qty), count: i.for.size }))
      .sort((a, b) => a.item.localeCompare(b.item)),
  })).filter((g) => g.items.length);
}

/* ───────────── Homeschool ───────────── */

export const student = { id: "ella", name: "Ella", age: 7, grade: "2nd grade", tone: "rose" };

const afternoonLoop = {
  1: { title: "Science", note: "Botany: how seeds travel" },
  2: { title: "Story writing", note: "Ella dictates, then copies her best sentence" },
  3: { title: "Nature walk & journal", note: "Draw one thing and label it" },
  4: { title: "Art & music", note: "Watercolor and a hymn study" },
  5: { title: "Letter writing", note: "A real letter to someone she loves" },
};

const blocks = [
  { id: "basket", time: "08:30", title: "Morning Basket", note: "Hymn, scripture and a poem, all together", log: true },
  { id: "writing", time: "09:00", title: "Writing workshop", note: "Handwriting warm-up, then copywork", log: true, writing: true },
  { id: "math", time: "09:40", title: "Math", note: "Hands-on, with blocks and counters", log: true },
  { id: "break", time: "10:15", title: "Snack & fresh air", note: "Outside if the weather allows" },
  { id: "reading", time: "10:45", title: "Reading together", note: "She reads a page, you read a page", log: true },
  { id: "lunch", time: "11:30", title: "Lunch & quiet time", note: "Books, puzzles, rest" },
  { id: "loop", time: "13:00", loop: true, log: true },
  { id: "readaloud", time: "14:00", title: "Read-aloud on the couch", note: "The Wind in the Willows", log: true },
];

export const SCHOOL_ENDS = "14:45";

export function rhythmFor(weekday) {
  if (weekday === 0 || weekday === 6) return null;
  return blocks.map((b) => (b.loop ? { ...b, ...afternoonLoop[weekday] } : b));
}

/** Index of the block happening now, or -1. */
export function currentBlockIndex(rhythm, minutes) {
  if (!rhythm || minutes >= toMinutes(SCHOOL_ENDS)) return -1;
  let idx = -1;
  rhythm.forEach((b, i) => {
    if (toMinutes(b.time) <= minutes) idx = i;
  });
  return idx;
}

/** Ella's path as a writer, from first letters to her own stories. */
export const writingJourney = [
  { title: "Forming letters neatly", note: "Lowercase and capitals, sitting on the line", state: "done" },
  { title: "Capitals & full stops", note: "Every sentence starts tall and ends with a dot", state: "done" },
  { title: "Complete sentences", note: "Who, and what they did", state: "now" },
  { title: "Describing words", note: "The *red* kite, the *sleepy* cat", state: "next" },
  { title: "Three sentences in order", note: "First, next, last", state: "next" },
  { title: "Writing a real letter", note: "Greeting, body, a loving sign-off", state: "next" },
  { title: "Her own short story", note: "Beginning, middle and end", state: "next" },
];

export const spellingWords = ["kite", "bike", "smile", "shine", "write", "time", "white", "slide"];

export const sentenceOfTheWeek = "The little bird sang a happy song in the tall green tree.";

export const curriculum = [
  { subject: "Handwriting", detail: "Practice book · page 34 of 80", done: 34, total: 80 },
  { subject: "Copywork", detail: "Week 9 of 36", done: 9, total: 36 },
  { subject: "Spelling", detail: "List 12 of 32 · long i with silent e", done: 12, total: 32 },
  { subject: "Reading", detail: "Reader · book 5 of 12", done: 5, total: 12 },
  { subject: "Math", detail: "Lesson 38 of 120", done: 38, total: 120 },
];

export const attendance = { done: 42, goal: 180 };

export const natureJournal = [
  { date: "Oct 29", title: "Maple seeds", text: "Ella counted 31 helicopters on the porch and wrote “They spin like dancers.” Her first simile!" },
  { date: "Oct 22", title: "First frost", text: "Spider webs looked like lace. She labeled her drawing: web, frost, leaf." },
  { date: "Oct 15", title: "Pond visit", text: "Two herons and a turtle. Ella wants to learn every bird by spring." },
];

export const wordsForTheWeek = ["Rest", "Patience", "Gratitude", "Joy", "Gentleness", "Faithfulness", "Trust", "Simplicity"];
