/* ============================================================
   products.js
   Product data array · Add-on catalog
   ============================================================ */

// ============================================================
// PRODUCT CATALOG
// ============================================================
const products = [

  // ── HOT BEVERAGES ──────────────────────────────────────────
  {
    id: 1, name: "Americano", category: "hot",
    image: "hot_beverages/hot_americano.png",
    prices: { Small: 79, Medium: 109 },
    description: "Bold and smooth espresso diluted with hot water — clean, strong, and satisfying.",
    calories: "~10 kcal", sizes: ["Small", "Medium"],
    about: "☕ Did you know? An Americano was popularized by American soldiers in Italy who diluted espresso to mimic drip coffee from home.",
    addons: ["extra_espresso", "whipped_cream"],
    featured: true
  },
  {
    id: 2, name: "Café Latte", category: "hot",
    image: "hot_beverages/hot_cafe_latte.png",
    prices: { Small: 89, Medium: 119 },
    description: "Espresso with velvety steamed milk — the ultimate comfort drink.",
    calories: "~150 kcal", sizes: ["Small", "Medium"],
    about: "☕ The word 'latte' literally means 'milk' in Italian. A classic café latte is 1/3 espresso and 2/3 steamed milk, topped with a light layer of foam.",
    addons: ["extra_espresso", "whipped_cream", "caramel_drizzle"],
    featured: true
  },
  {
    id: 3, name: "Cappuccino", category: "hot",
    image: "hot_beverages/hot_cappuccino.png",
    prices: { Small: 89, Medium: 119 },
    description: "Equal parts espresso, steamed milk, and thick frothy foam — a classic Italian favorite.",
    calories: "~120 kcal", sizes: ["Small", "Medium"],
    about: "☕ A traditional cappuccino is named after the Capuchin friars — the brown color of the drink resembles their robes.",
    addons: ["extra_espresso", "whipped_cream"],
    featured: false
  },
  {
    id: 4, name: "Mochaccino", category: "hot",
    image: "hot_beverages/hot_mochaccino.png",
    prices: { Small: 89, Medium: 119 },
    description: "The best of both worlds — espresso, chocolate, and creamy steamed milk.",
    calories: "~200 kcal", sizes: ["Small", "Medium"],
    about: "☕ Mochaccino combines the richness of espresso with the sweetness of chocolate syrup, making it a favorite for those who love a little indulgence.",
    addons: ["extra_espresso", "whipped_cream", "caramel_drizzle"],
    featured: false
  },
  {
    id: 5, name: "Premium Hot Chocolate", category: "hot",
    image: "hot_beverages/hot_premium_chocolate.png",
    prices: { Small: 69, Medium: 99 },
    description: "Rich Belgian cocoa blend with steamed milk — deeply comforting on cold days.",
    calories: "~220 kcal", sizes: ["Small", "Medium"],
    about: "☕ CloudCup's hot chocolate is made with premium Belgian cocoa powder — no shortcuts, just pure chocolatey goodness.",
    addons: ["whipped_cream", "caramel_drizzle"],
    featured: false
  },
  {
    id: 6, name: "Espresso", category: "hot",
    image: "hot_beverages/hot_espresso.png",
    prices: { Single: 109 },
    description: "A concentrated shot of pure coffee intensity — bold, aromatic, and powerful.",
    calories: "~5 kcal", sizes: ["Single"],
    about: "☕ A perfect espresso shot should have a golden crema on top — that layer of foam is the sign of freshly ground, well-extracted coffee.",
    addons: ["extra_espresso"],
    featured: false
  },
  {
    id: 7, name: "Espresso Macchiato", category: "hot",
    image: "hot_beverages/hot_espresso_macchiato.png",
    prices: { Single: 109 },
    description: "Espresso 'stained' with a dollop of foamy milk — small but mighty.",
    calories: "~15 kcal", sizes: ["Single"],
    about: "☕ 'Macchiato' means 'stained' in Italian — the espresso is just slightly marked with foam to soften the intensity.",
    addons: ["extra_espresso", "whipped_cream"],
    featured: false
  },

  // ── ICED BEVERAGES ─────────────────────────────────────────
  {
    id: 8, name: "Iced Americano", category: "iced",
    image: "cold_beverages/ice_americano.png",
    prices: { Medium: 99, Large: 124 },
    description: "Chilled espresso over ice — refreshing, clean, and dangerously easy to sip.",
    calories: "~10 kcal", sizes: ["Medium", "Large"],
    about: "🧊 An Iced Americano is different from cold brew — it's freshly pulled espresso shots poured over ice, giving it a slightly different, brighter flavor.",
    addons: ["extra_espresso", "whipped_cream", "caramel_drizzle"],
    featured: false
  },
  {
    id: 9, name: "Iced Latte", category: "iced",
    image: "cold_beverages/ice_latte.png",
    prices: { Medium: 124, Large: 154 },
    description: "Smooth espresso and cold milk over ice — refreshing, creamy, and endlessly satisfying.",
    calories: "~160 kcal", sizes: ["Medium", "Large"],
    about: "🧊 Iced lattes are one of the most popular café drinks worldwide. The key is freshly pulled espresso poured over cold milk and ice — not diluted cold coffee.",
    addons: ["extra_espresso", "whipped_cream", "caramel_drizzle", "oreo_crumbs"],
    featured: true
  },
  {
    id: 10, name: "Iced Mocha", category: "iced",
    image: "cold_beverages/ice_mocha.png",
    prices: { Medium: 124, Large: 154 },
    description: "Espresso meets chocolate in a cold, creamy dream — sweet and invigorating.",
    calories: "~250 kcal", sizes: ["Medium", "Large"],
    about: "🧊 Iced mochas are perfect for those who love coffee but also have a sweet tooth. Chocolate syrup, espresso, cold milk, and ice — what's not to love?",
    addons: ["extra_espresso", "whipped_cream", "caramel_drizzle", "oreo_crumbs"],
    featured: false
  },
  {
    id: 11, name: "Iced Chocolate", category: "iced",
    image: "cold_beverages/ice_chocolate.png",
    prices: { Medium: 124, Large: 144 },
    description: "Chilled chocolate milk with a rich cocoa base — no coffee, pure indulgence.",
    calories: "~240 kcal", sizes: ["Medium", "Large"],
    about: "🧊 CloudCup's Iced Chocolate uses premium chocolate sauce mixed into cold fresh milk for that perfect creamy chocolate experience.",
    addons: ["whipped_cream", "caramel_drizzle", "oreo_crumbs"],
    featured: false
  },

  // ── TEA ────────────────────────────────────────────────────
  {
    id: 12, name: "Jasmine Tea", category: "tea",
    image: "tea/tea_jasmine.png",
    prices: { Medium: 69 },
    description: "Delicately scented green tea infused with fresh jasmine blossoms — light and calming.",
    calories: "~0 kcal", sizes: ["Medium"],
    about: "🍵 Jasmine tea has been brewed in China for over 1,000 years. The tea leaves are layered with fresh jasmine flowers to absorb their natural fragrance.",
    addons: ["whipped_cream"],
    featured: false
  },
  {
    id: 13, name: "Peppermint Tea", category: "tea",
    image: "tea/tea_peppermint.png",
    prices: { Medium: 69 },
    description: "Cool, refreshing, and naturally caffeine-free — a soothing minty escape.",
    calories: "~0 kcal", sizes: ["Medium"],
    about: "🍵 Peppermint tea is naturally caffeine-free, making it a perfect evening drink. It's also known to help with digestion and ease headaches.",
    addons: [],
    featured: false
  },

  // ── BLENDED ────────────────────────────────────────────────
  {
    id: 15, name: "Double Chocolate Frappe", category: "blended",
    image: "blended_beverages/blended_double_chocolate.png",
    prices: { Medium: 159, Large: 174 },
    description: "A chocolate lover's dream — double the chocolate, double the happiness.",
    calories: "~380 kcal", sizes: ["Medium", "Large"],
    about: "🥤 Our Double Chocolate Frappe is made with dark chocolate syrup, chocolate powder, and real milk blended to creamy perfection — topped with whipped cream.",
    addons: ["whipped_cream", "chocolate_drizzle", "caramel_drizzle", "extra_oreo"],
    featured: false
  },
  {
    id: 16, name: "Mocha Frappe", category: "blended",
    image: "blended_beverages/blended_mocha.png",
    prices: { Medium: 159, Large: 174 },
    description: "Espresso and chocolate blended into a thick, icy cloud — smooth and rich.",
    calories: "~350 kcal", sizes: ["Medium", "Large"],
    about: "🥤 The Mocha Frappe balances strong espresso notes with sweet chocolate — blended with ice for that signature frappé texture.",
    addons: ["whipped_cream", "chocolate_drizzle", "caramel_drizzle"],
    featured: false
  },
  {
    id: 17, name: "Caramel Frappe", category: "blended",
    image: "blended_beverages/blended_caramel.png",
    prices: { Medium: 169, Large: 184 },
    description: "Sweet caramel, espresso, and milk blended into pure golden bliss.",
    calories: "~360 kcal", sizes: ["Medium", "Large"],
    about: "🥤 Our Caramel Frappe uses house-made caramel sauce blended with espresso and milk — finished with a caramel drizzle on top.",
    addons: ["whipped_cream", "caramel_drizzle", "chocolate_drizzle"],
    featured: true
  },
  {
    id: 18, name: "Mocha Oreo Frappe", category: "blended",
    image: "blended_beverages/blended_mocha_oreo.png",
    prices: { Medium: 169, Large: 184 },
    description: "Mocha frappe loaded with crushed Oreo cookies — bold, sweet, and irresistible.",
    calories: "~410 kcal", sizes: ["Medium", "Large"],
    about: "🥤 Oreo fans, this one's for you! Crushed Oreo cookies blended right into our Mocha Frappe, topped with Oreo crumbs and whipped cream.",
    addons: ["whipped_cream", "extra_oreo", "chocolate_drizzle"],
    featured: true
  },
  {
    id: 19, name: "Strawberry Frappe", category: "blended",
    image: "blended_beverages/blended_strawberry.png",
    prices: { Medium: 159, Large: 174 },
    description: "Fresh strawberry blended with milk and ice — bright, sweet, and refreshing.",
    calories: "~310 kcal", sizes: ["Medium", "Large"],
    about: "🥤 Our Strawberry Frappe is made with real strawberry jam and milk — no artificial flavors. Just pure fruity goodness blended cold.",
    addons: ["whipped_cream", "caramel_drizzle"],
    featured: false
  },

  // ── PASTRIES ───────────────────────────────────────────────
  {
    id: 20, name: "Blueberry Cheesecake", category: "pastry",
    image: "pastries/blueberry_cheesecake.png",
    prices: { Slice: 169 },
    description: "Creamy NY-style cheesecake topped with sweet blueberry compote.",
    calories: "~420 kcal", sizes: ["Slice"],
    about: "🥐 Baked fresh in-house daily, our Blueberry Cheesecake uses full-fat cream cheese on a buttery graham cracker base — topped with homemade blueberry jam.",
    addons: [],
    featured: false
  },
  {
    id: 21, name: "Oreo Cheesecake", category: "pastry",
    image: "pastries/oreo_cheesecake.png",
    prices: { Slice: 169 },
    description: "Classic cheesecake with crushed Oreo crust and Oreo cream filling — a fan favorite!",
    calories: "~450 kcal", sizes: ["Slice"],
    about: "🥐 Our signature Oreo Cheesecake features a double-Oreo experience — Oreo cookie base AND Oreo blended into the cream cheese filling.",
    addons: [],
    featured: true
  },
  {
    id: 22, name: "Dark Chocolate Cake", category: "pastry",
    image: "pastries/chocolate_cake.png",
    prices: { Slice: 99 },
    description: "Moist, rich dark chocolate cake with velvety ganache frosting.",
    calories: "~380 kcal", sizes: ["Slice"],
    about: "🥐 Baked using 70% dark cocoa, our Chocolate Cake is dense, moist, and perfectly bittersweet — pairs beautifully with a hot latte.",
    addons: [],
    featured: false
  },
  {
    id: 23, name: "Vanilla Cinnamon Bun", category: "pastry",
    image: "pastries/vanilla_cinnamon.png",
    prices: { Piece: 149 },
    description: "Fluffy spiral bun filled with cinnamon sugar, drizzled with sweet vanilla glaze.",
    calories: "~340 kcal", sizes: ["Piece"],
    about: "🥐 Our Cinnamon Buns are proof baked every morning — soft, pillowy, and filled with just the right amount of cinnamon sugar and vanilla icing.",
    addons: [],
    featured: false
  }
];


// ============================================================
// ADD-ON CATALOG
// ============================================================
const addonCatalog = {
  extra_espresso:    { label: "Extra Espresso", price: 20, emoji: "☕" },
  whipped_cream:     { label: "Whipped Cream",  price: 15, emoji: "🍦" },
  caramel_drizzle:   { label: "Caramel Drizzle", price: 15, emoji: "🍮" },
  oreo_crumbs:       { label: "Oreo Crumbs",    price: 20, emoji: "🍪" },
  chocolate_drizzle: { label: "Choco Drizzle",  price: 15, emoji: "🍫" },
  extra_oreo:        { label: "Extra Oreo",      price: 20, emoji: "🍪" }
};
