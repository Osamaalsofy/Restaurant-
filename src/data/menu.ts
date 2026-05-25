/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MenuItem, ElixirIngredient } from '../types';

export const MENU_ITEMS: MenuItem[] = [
  // Appetizers
  {
    id: 'app-1',
    name: 'Wild Forest Mushrooms & Elderberry Carpaccio',
    description: 'Crisp hand-picked chanterelles, thin shaved white truffle, organic micro blossoms, elderberry reduction, rosemary-infused charcoal bread oil.',
    price: 18,
    calories: 190,
    category: 'Appetizers',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=700&q=80',
    tags: ['Vegan', 'Gluten-Free', 'House Special'],
    ingredients: ['Chanterelle Mushrooms', 'White Truffle', 'Elderberry Splash', 'Charcoal Infused Olive Oil', 'Micro Herbs'],
    chefSpecial: false
  },
  {
    id: 'app-2',
    name: 'Compressed Cucumber & Cedarwood Essence Gazpacho',
    description: 'Chilled essence of field cucumbers compressed under pressure with green apple, pine pollen, sorrel sorbet, drops of local pure golden honey.',
    price: 15,
    calories: 120,
    category: 'Appetizers',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=700&q=80',
    tags: ['Raw', 'Vegan', 'Organic'],
    ingredients: ['Compressed Cucumber', 'Green Apple', 'Pine Pollen extract', 'Wild Sorrel', 'Forest Honey drops'],
    chefSpecial: true
  },
  {
    id: 'app-3',
    name: 'Heirloom Radish Mosaic & Wild Garlic Emulsion',
    description: 'Paper-thin concentric rings of violet and candy-stripe beets, pickled mustard seeds, salted kelp, with a hand-emulsified wild clover blossom garlic cream.',
    price: 16,
    calories: 140,
    category: 'Appetizers',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=700&q=80',
    tags: ['Gluten-Free', 'Vegetarian'],
    ingredients: ['Candy Beets', 'Violet Radishes', 'Pickled Mustard Seed', 'Kelp Flakes', 'Wild Garlic blossom Cream'],
    chefSpecial: false
  },
  {
    id: 'app-4',
    name: 'Charcoal Sourdough with Sprouted Pine Needle Butter',
    description: 'House-made heirloom sourdough bread infused with active white birch charcoal, served alongside whip-aired butter containing young spring pine-needles and smoked crystal sea salts.',
    price: 12,
    calories: 220,
    category: 'Appetizers',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=700&q=80',
    tags: ['Vegetarian', 'House-Baked'],
    ingredients: ['Birch Charcoal Dough', 'Young Pine-needles', 'Whipped Sweet Butter', 'Smoked Sea Salt Crystals'],
    chefSpecial: false
  },
  {
    id: 'app-5',
    name: 'Sprouted Pulse Terrine with Yellow Clover Blossom',
    description: 'Pressed brick of sprouted organic green lentils and chickpeas, infused with crushed fennel pollen, surrounded by wild yellow clovers, tarragon tincture, and micro radish stems.',
    price: 14,
    calories: 160,
    category: 'Appetizers',
    image: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=700&q=80',
    tags: ['Raw', 'Vegan', 'Gluten-Free'],
    ingredients: ['Sprouted Lentils', 'Fennel Pollen', 'Yellow Clovers', 'Tarragon Tincture', 'Radish Shoots'],
    chefSpecial: false
  },

  // Mains
  {
    id: 'main-1',
    name: 'Charred Sunchoke & Roasted Acorn Platter',
    description: 'Embers-grilled sunchokes served over creamed hazelnut puree, baked acorn pulp glaze, roasted forest acorns, sea lettuce dust, wild sage infusion.',
    price: 32,
    calories: 420,
    category: 'Mains',
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=700&q=80',
    tags: ['Vegan', 'Gluten-Free', 'Nutrient Dense'],
    ingredients: ['Smoked Sunchokes', 'Wild Acorns', 'Hazelnuts', 'Sea Lettuce dust', 'Sage extract'],
    chefSpecial: true
  },
  {
    id: 'main-2',
    name: 'Smoked Heirloom Squash with Spruce Needle Confit',
    description: 'Slow beechwood-smoked kabocha pumpkin, wild spruce needle confit butter, parsnip crisps, fermented dandelion juice drizzle, popped amaranth crunch.',
    price: 29,
    calories: 360,
    category: 'Mains',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=700&q=80',
    tags: ['Vegan', 'Gluten-Free'],
    ingredients: ['Beachwood Kabocha pumpkin', 'Dandelion Greens', 'Parsnips', 'Amaranth grains', 'Spruce needle butter'],
    chefSpecial: false
  },
  {
    id: 'main-3',
    name: 'Ancient Spelt Risotto in Rose Petal Broth',
    description: 'Emmer starch spelt slowly simmered with fresh distilled damask rosewater, roasted purple cauliflowers, pistachio butter emulsification, topped with edible crispy sage.',
    price: 34,
    calories: 480,
    category: 'Mains',
    image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=700&q=80',
    tags: ['Organic', 'House Special'],
    ingredients: ['Spelt Grain', 'Damask Rosewater', 'Purple Cauliflower', 'Pistachios', 'Flash-crisped Sage'],
    chefSpecial: true
  },
  {
    id: 'main-4',
    name: 'Roasted Chestnuts & Wild Meadow Mushrooms Loaf',
    description: 'Pristine savory log of hand-ground mountain chestnuts, roasted porcini and wood-ear mushrooms, encased in direct fire-baked savoy cabbage leaves with red currants glaze.',
    price: 28,
    calories: 390,
    category: 'Mains',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=700&q=80',
    tags: ['Vegan', 'Gluten-Free', 'Nut-Rich'],
    ingredients: ['Ground Chestnuts', 'Porcini mushrooms', 'Wood-ear Mushrooms', 'Savoy Cabbage', 'Red Currant glaze'],
    chefSpecial: false
  },
  {
    id: 'main-5',
    name: 'Wild Clover Pasta with Smoked Beechwood Garlic',
    description: 'Artisanal hand-cut linguine infused with dark-green wild clover extract, tossed in charred beechwood oak garlic, organic cold-pressed walnut oil, and freshly shaved white truffles.',
    price: 36,
    calories: 450,
    category: 'Mains',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=700&q=80',
    tags: ['Vegetarian', 'House Specialty'],
    ingredients: ['Clover-infused Flour', 'Beechwood Smoked Garlic', 'Walnut Oil', 'Shaved White Truffles', 'Pecan crisps'],
    chefSpecial: true
  },

  // Desserts
  {
    id: 'dess-1',
    name: 'Charcoal Cocoa & Elderberry Gelée Sphere',
    description: 'Single-origin 85% raw dark cacao shell filled with lavender-scented mousse, an inner core of organic wild elderberry gelée, resting on roasted almond soil.',
    price: 18,
    calories: 290,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=700&q=80',
    tags: ['Vegan', 'Refined Sugar Free'],
    ingredients: ['85% Raw Cocoa', 'Lavender infusion', 'Elderberries', 'Almond flour soil', 'Blue agave sweetener'],
    chefSpecial: true
  },
  {
    id: 'dess-2',
    name: 'Steamed Wild Pear with Birch Sap reduction',
    description: 'Locally grown green bosc pear gently poached in high-proof pine honey and cardamom broth, glazed with organic mountain birch sap syrup, with clean coconut foam.',
    price: 16,
    calories: 210,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=700&q=80',
    tags: ['Vegan', 'Gluten-Free', 'Low Sugar'],
    ingredients: ['Bosc Pear', 'Birch Sap syrup', 'Coconut Cream foam', 'Cardamom pods', 'Pine honey extract'],
    chefSpecial: false
  },
  {
    id: 'dess-3',
    name: 'Cardamom Meadowsweet Tart with Raspberries',
    description: 'Flaky crust made of sprouted buckwheat flour, holding a rich paste of raw white-chocolate, infused with powdered wildcard meadowsweet blossoms and fresh raspberries.',
    price: 15,
    calories: 245,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=700&q=80',
    tags: ['Gluten-Free', 'Organic'],
    ingredients: ['Meadowsweet Blossoms', 'Sprouted Buckwheat', 'White Vegan Cocoa', 'Wild Raspberries', 'Cardamom Seed'],
    chefSpecial: true
  },
  {
    id: 'dess-4',
    name: 'Chilled Wild Thyme & Citrus Lemon Balm Shaved Ice',
    description: 'Incredibly fine snow shaved from cold-pressed lemon balm and apple-mint leaves, splashed with mountain wild thyme syrup, wild pansy flowers, and a pinch of lime extract.',
    price: 13,
    calories: 110,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=700&q=80',
    tags: ['Raw', 'Vegan', 'Gluten-Free', 'Refreshes Calorie'],
    ingredients: ['Lemon Balm Steeps', 'Apple Mint Essence', 'Wild Thyme Honey', 'Pansy blossoms', 'Key lime juice'],
    chefSpecial: false
  },
  {
    id: 'dess-5',
    name: 'Salty Blue Sea Kelp & Raw Cacao Crisps',
    description: 'Crispy dehydrated wild sea-kelp strips dredged in melted raw cocoa nibs, sweetened slightly with mountain maple syrup and seasoned with flower-petal coarse mineral salt crusts.',
    price: 14,
    calories: 140,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&w=700&q=80',
    tags: ['Raw', 'Vegan', 'Mineral-Dense'],
    ingredients: ['Sea Kelp strips', 'Raw Cocoa Nibs', 'Maple syrup', 'Rose petal sea salt', 'Toasted sesame'],
    chefSpecial: false
  },

  // Botanical Elixirs
  {
    id: 'elix-1',
    name: 'Midnight Lavender & Amethyst Chamomile Nectar',
    description: 'Organic chamomile flowers steeped with calming Provencal lavender, active butterfly pea flower extract, wild apple acid, and carbonated mountain spring water.',
    price: 12,
    calories: 45,
    category: 'Elixirs',
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=700&q=80',
    tags: ['Adaptogenic', 'Calming', 'Sugar-Free'],
    ingredients: ['Organic Chamomile', 'Fine Lavender buds', 'Butterfly Pea flower', 'Alkaline Spring Water'],
    chefSpecial: false
  },
  {
    id: 'elix-2',
    name: 'Siberian Ginseng & Forest Gold Pine Cordial',
    description: 'Ginseng roots matched with fresh spruce pine needle essence, wild sea buckthorn concentrate, sweet ginger juice, and filtered alkaline birch water.',
    price: 14,
    calories: 70,
    category: 'Elixirs',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=700&q=80',
    tags: ['Adaptogenic', 'Invigorates Wellness'],
    ingredients: ['Siberian Ginseng extract', 'Spruce Pine pine needles', 'Sea Buckthorn concentrate', 'Birch Water'],
    chefSpecial: true
  },
  {
    id: 'elix-3',
    name: 'Spiced Bitter Dandelion & Roasted Chicory Draft',
    description: 'Warm roasted chicory roots, crushed organic dandelion root tea, slow infusions of cinnamon barks, cayenne spikes, sweetened lightly with dark forest maple honey.',
    price: 13,
    calories: 85,
    category: 'Elixirs',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=700&q=80',
    tags: ['Detoxifying', 'Digestive', 'Warm-Infused'],
    ingredients: ['Roasted Chicory', 'Dandelion Roots', 'Ceylon Cinnamon bark', 'Cayenne seeds', 'Dark forest maple'],
    chefSpecial: false
  },
  {
    id: 'elix-4',
    name: 'Ruby Hibiscus Tea with Wild Angelica Root',
    description: 'Deep ruby tart tea made of sundried hibiscus sepals, infused with ground aromatic wild angelica roots, licorice extracts, and premium cold-spun birch bark honey.',
    price: 11,
    calories: 55,
    category: 'Elixirs',
    image: 'https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&w=700&q=80',
    tags: ['Antioxidant', 'Relaxant', 'Floral-Tart'],
    ingredients: ['Dried Hibiscus Sepals', 'Angelica Root extract', 'Organic Licorice', 'Birch Bark Honey', 'Mineral Ice'],
    chefSpecial: false
  },
  {
    id: 'elix-5',
    name: 'Emerald Gotu Kola & Wheatgrass Elixir Potent',
    description: 'Concentrated organic green juice of gotu kola leaves, live wheatgrass chlorophyll, raw lemon balm nectar, with sweet drops of fresh garden peppermint oil.',
    price: 15,
    calories: 40,
    category: 'Elixirs',
    image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=700&q=80',
    tags: ['Cognitive Boost', 'Alkalizing', 'Chlorophyll Concentrated'],
    ingredients: ['Live Gotu Kola extract', 'Sprouted Wheatgrass', 'Cold Lemon Balm', 'Peppermint oil drops'],
    chefSpecial: true
  }
];

export const ELIXIR_INGREDIENTS: ElixirIngredient[] = [
  // 1. Organic Pressed Fruits ("base")
  {
    id: 'base-1',
    name: 'Alphonso Mango Nectar',
    category: 'base',
    color: '#FFB300',
    description: 'Freshly pulped rich organic mango nectar, packed with active enzymes.',
    benefits: 'Tropical smoothness, natural sweetness catalyst, vitamin-dense',
    emoji: '🥭'
  },
  {
    id: 'base-2',
    name: 'Squeezed Pink Passionfruit',
    category: 'base',
    color: '#E040FB',
    description: 'Fresh purple passionfruit splash, yielding a delightful, crisp and exotic profile.',
    benefits: 'Floral tartness, dynamic throat feedback, anti-oxidants boost',
    emoji: '🍇'
  },
  {
    id: 'base-3',
    name: 'Gold Mountain Apple Nectar',
    category: 'base',
    color: '#81C784',
    description: 'Cold-pressed Honey-crisp green apple extract with lively organic acids.',
    benefits: 'Zesty malic acidity, clean mouthfeel, digestion enhancement',
    emoji: '🍏'
  },
  {
    id: 'base-4',
    name: 'Cold-Pressed Watermelon Splash',
    category: 'base',
    color: '#FF5252',
    description: 'Hydrating, cold-pressed raw summer watermelon flesh for peak crispness.',
    benefits: 'Extreme hydration, high lycopene content, incredibly light body',
    emoji: '🍉'
  },
  {
    id: 'base-5',
    name: 'Creamy Tropical Banana Nectar',
    category: 'base',
    color: '#FDD835',
    description: 'Puréed sweet organic Cavendish banana providing rich prebiotics.',
    benefits: 'Velvety smooth thickness, immediate potassium release, natural sweetness',
    emoji: '🍌'
  },
  {
    id: 'base-6',
    name: 'Sun-Ripened Golden Peach Splash',
    category: 'base',
    color: '#FF8A65',
    description: 'Plump tree-ripened yellow peaches squeezed into a fragrant liquid gold.',
    benefits: 'Aromatic summer flavor, rich dietary fibers, vitamins A and C boost',
    emoji: '🍑'
  },

  // 2. Premium Fruits & Berries Selection ("base")
  {
    id: 'bot-1',
    name: 'Wild Forest Strawberries',
    category: 'base',
    color: '#E53935',
    description: 'Sweet crimson wild strawberries packed with natural vitamin C.',
    benefits: 'Lively summer tang, collagen-boosting nutrients',
    emoji: '🍓'
  },
  {
    id: 'bot-2',
    name: 'Organic Blueberries & Blackberries',
    category: 'base',
    color: '#3F51B5',
    description: 'Antioxidant-rich purée of handpicked organic forest berries.',
    benefits: 'High antocyanins concentration, neural defense boost',
    emoji: '🫐'
  },
  {
    id: 'bot-3',
    name: 'Tangy Raspberries & Cranberries',
    category: 'base',
    color: '#D81B60',
    description: 'Sharp raspberries and cranberries pressed for vibrant balance.',
    benefits: 'Anti-inflammatory flavonoids, energetic metabolic kick',
    emoji: '🍒'
  },
  {
    id: 'bot-4',
    name: 'Fresh Pineapple Drizzle',
    category: 'base',
    color: '#FFB300',
    description: 'Golden crown pineapples rich in active bromelain enzymes.',
    benefits: 'Active digestive enzymes, crisp tropical flavor profile',
    emoji: '🍍'
  },
  {
    id: 'bot-5',
    name: 'Sweet Orange & Mandarin',
    category: 'base',
    color: '#FB8C00',
    description: 'Zesty sun-soaked California mandarin citrus juice containing active pulp fibers.',
    benefits: 'Immune defense charge, zesty citrus fragrance lift',
    emoji: '🍊'
  },
  {
    id: 'base-7',
    name: 'Glazed Black Cherries',
    category: 'base',
    color: '#880E4F',
    description: 'Sweet, tree-ripened plump cherries packed with active phytonutrients.',
    benefits: 'Deep fruit notes, anti-tension recovery acceleration',
    emoji: '🍒'
  },
  {
    id: 'base-8',
    name: 'Creamy Hass Avocado Blend',
    category: 'base',
    color: '#4CAF50',
    description: 'Rich, buttery organic avocados supplying healthy essential lipids.',
    benefits: 'Ultra-creamy velvet thickness, high-density nutrition',
    emoji: '🥑'
  },

  // 3. Milks & Creamy Bases ("essence")
  {
    id: 'esc-1',
    name: 'Creamy Spelt & Oat Cream Milk',
    category: 'essence',
    color: '#FFFDD0',
    description: 'Plump organic oat cream yielding a luscious, velvet smoothie thickness.',
    benefits: 'Soft milky texture, incredible digestive comfort, rich mouthfeel',
    emoji: '🥛'
  },
  {
    id: 'esc-2',
    name: 'Rich Island Coconut Cream Milk',
    category: 'essence',
    color: '#FFFFFF',
    description: 'Cold-pressed thick coconut flesh supplying medium-chain healthy fats.',
    benefits: 'Tropical aroma, velvety high-hydration lipids, natural creaminess',
    emoji: '🥥'
  },
  {
    id: 'esc-3',
    name: 'Silky Dark Chocolate Cream',
    category: 'essence',
    color: '#4E342E',
    description: 'Rich liquid cacao cream blended with natural vanilla orchid oils.',
    benefits: 'Deep endorphin trigger, mineral-dense cacao grounding',
    emoji: '🍫'
  },
  {
    id: 'esc-4',
    name: 'Whipped French Vanilla Yogurt',
    category: 'essence',
    color: '#FFFDE7',
    description: 'Greek style organic yogurt slow-whipped with cold vanilla beans.',
    benefits: 'Active probiotic cultures, smooth structure, delicious creamy tang',
    emoji: '🍦'
  },
  {
    id: 'esc-5',
    name: 'Roasted Almond Butter Cream',
    category: 'essence',
    color: '#D7CCC8',
    description: 'Stone-ground roasted whole organic almonds for a luxurious nuttiness.',
    benefits: 'Healthy proteins boost, high vitamin E skin protection',
    emoji: '🌰'
  },
  {
    id: 'esc-6',
    name: 'Velvet Sicilian Pistachio Cream',
    category: 'essence',
    color: '#C5E1A5',
    description: 'Nutty, organic wild green pistachio milk cream.',
    benefits: 'Highly aromatic healthy lipids, mineral energy replenishment',
    emoji: '🥛'
  },

  // 4. Sweeteners, Spices & Garnishes ("addon")
  {
    id: 'add-1',
    name: 'Beechwood Wildflower Honey',
    category: 'addon',
    color: '#FFD54F',
    description: 'Rich unfiltered wildflower honey harvested responsibly from mountain apiaries.',
    benefits: 'Natural antioxidant binder, wild biological sweetness',
    emoji: '🍯'
  },
  {
    id: 'add-2',
    name: 'Pure Thick Amber Maple Syrup',
    category: 'addon',
    color: '#FF8A65',
    description: 'Ethically tapped deep forest maple sap, rich in potassium and zinc.',
    benefits: 'Sustainable sweetness, wood-tinted trace minerals catalyst',
    emoji: '🍁'
  },
  {
    id: 'add-3',
    name: 'Organic Chia & Flax Seed Swirl',
    category: 'addon',
    color: '#9E9E9E',
    description: 'Gelatinous hydrating chia and golden flax seeds providing high omega-3s.',
    benefits: 'Added seed fiber, sustained energy delivery, beautiful gel swirl',
    emoji: '🧉'
  },
  {
    id: 'add-4',
    name: 'Grated Cocoa & Hazelnut Shavings',
    category: 'addon',
    color: '#5D4037',
    description: 'Finely grated organic raw cocoa nibs and crushed roasted hazelnuts.',
    benefits: 'Exquisite crispy chocolate crunch, premium dessert feel',
    emoji: '🍪'
  },
  {
    id: 'add-5',
    name: 'Fresh Garden Cool Mint Leaves',
    category: 'addon',
    color: '#4CAF50',
    description: 'Bruised organic spearmint leaves that infuse a cooling refreshing aroma.',
    benefits: 'Soothes digestion, ultimate clean palate refresh',
    emoji: '🌿'
  },
  {
    id: 'add-6',
    name: 'Crisp Butter Cookie Crumbs',
    category: 'addon',
    color: '#FFE082',
    description: 'Crunchy crushed organic shortbread cookies for a premium dessert bite.',
    benefits: 'Exquisitely satisfying crunchy biscuit highlights',
    emoji: '🍪'
  }
];
