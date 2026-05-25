import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
  isRtl: boolean;
  translateItemName: (name: string) => string;
  translateDescription: (desc: string) => string;
  translateIngredient: (ing: string) => string;
  translateTag: (tag: string) => string;
  translateBenefits: (benefits: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const DICTIONARY: Record<Language, Record<string, string>> = {
  en: {
    // Nav items
    philosophy: 'Philosophy',
    menu: 'The Menu',
    fruitSmoothie: 'Fruit Smoothie',
    bookTable: 'Book Table',
    tableRsvp: 'Table RSVP',
    
    // Hero
    heroSubtitle: 'SEEDS OF OLD EARTH',
    heroTitleRow1: 'Plantify',
    heroTitleRow2: 'Seed to Glass Sanctuary',
    heroDescription: 'Embark on an artisanal odyssey. We craft non-carbonated organic elixirs, wood-charred root plates, and botanical cordials imbued with pristine adaptogen essences.',
    exploreMenuBtn: 'Explore Culinary Arcana',
    designSmoothieBtn: 'Forging Smoothie Lab',
    scrollDown: 'Scroll to Enter the Green',

    // Philosophy
    philosophyHeader: 'Our Culinary Philosophy',
    philosophySubtitle: 'Gastronomy is not merely standard digestion; it is an active physical dialogue between our biological cells and the ancient, quiet intelligence of forest root networks.',
    ecoTitle: 'Biodynamic Root Ecology',
    ecoDesc: 'We respect soil microbiomes. Every sunchoke, wild parsnip, and heirloom radish is hand-drawn from farms certified in non-interventionist biodynamic rotation.',
    beechTitle: 'Slow Beechwood Charring',
    beechDesc: 'We reject high-voltage induction cooking. Our hearth is kept active with white beechwood coals, imparting rich caramelized oils, cedar smokes, and historic flavor.',
    adaptTitle: 'Adaptogenic Infusions',
    adaptDesc: 'Our carbonations are natural, filtered through active limestone layers and loaded with wild butterfly peas, tiger ginseng, and lavender syrups to refresh the spirit.',
    michelinTitle: 'Michelin Rated Craft',
    respectTruth: 'Respecting the raw botanical truth.',
    chefQuote: 'Head Chef Elian Vance, planting seedlings inside our culinary reserve.',
    factTitle: 'Sourcing Fact',
    factDesc: '100% of our mushrooms and pine twigs are hand-foraged daily by local forest ecologist groups.',

    // Lab Intro
    labSubtitle: 'THE ELIXIR COMPOUNDING LAB',
    labTitle: 'Smoothie Alchemist',
    labDesc: 'Craft your custom botanical smoothie. Layer enzyme-active cold-pressed bases, pure adaptogens, and wild forest essential spices.',
    craftBtn: 'Enter Alchemical Lab',
    craftFeature1: 'Enzyme Active Bases',
    craftFeature2: 'Adaptogenic Tonics',
    craftFeature3: 'Hand-Foraged Berries',

    // Menu View
    menuTitle: 'The Botanical Harvest Menu',
    appetizersTab: 'Appetizers',
    mainsTab: 'Mains',
    dessertsTab: 'Desserts',
    elixirsTab: 'Elixirs',
    backBtn: 'Back to Sanctuary',
    addToOrderBtn: 'Add To Order Base',
    caloriesLabel: 'Calories',
    ingredientsLabel: 'Botanical Ingredients',
    chefSpecialLabel: 'CHEF SPECIAL',
    reserveWithThisDish: '✨ Reserve Table with this Dish',
    customNotesPlaceholder: 'Engrave custom adaptogenic notes or dietary requests (e.g. no nuts, honey splash)...',

    // Mixer View
    mixerBackBtn: 'Back to Sanctuary',
    step1: 'STEP ONE: Select Fruit/Berry Nectar Base',
    step2: 'STEP TWO: Select Creamy Emulsion Milk',
    step3: 'STEP THREE: Select Herbal Addon & Spices',
    step4: 'STEP FOUR: Alchemical Compounding Transmutation',
    selectedBase: 'Selected Nectar Base',
    selectedMilk: 'Selected Creamy Milk',
    selectedAddon: 'Selected Herbal Addon',
    customBase: 'Select Base',
    customMilk: 'Select Milk',
    customAddon: 'Select Addon',
    startCompounding: 'Begin Compounding Formulation',
    resetBtn: 'Disenchant Formula',
    compoundingProgress: 'Fusing ingredients and extracting adaptogenic bounds...',
    compoundReady: 'Alchemical Formulation Transmuted Successfully!',
    recipeLabel: 'Formulation Blueprint Receipt:',
    claimTicketLabel: '✨ Reserve Table with this Blend',
    viewAllIngredients: 'View Alchemical Blueprint Specs',
    alchemistTitle: 'Master Smoothie Alchemist Machine',

    // Booking View
    bookTitle: 'Book your table',
    bookSub: '"Experience our zero-mile botanical gastronomy live from the Beechwood hearth."',
    reservationHeading: 'Live Reservations Engine',
    partyCount: 'Party Count',
    sessionDate: 'Session Date',
    startTime: 'Start Time',
    selectTimeSlot: 'Select Time Slot',
    bookingAlert: 'Selected Dishes for Order',
    specialRequestLabel: 'Dietary Allegiances & Adaptogen Requests',
    specialRequestPlaceholder: 'Specify dietary requirements, special allergies, or other custom requests...',
    contactNum: 'Contact Phone Number',
    guestEmail: 'Guest Principle Email',
    rsvpBtn: 'Lock Dynamic RSVP Placement',
    textReceipt: 'TICKET RECEIPT REGISTERED',
    orderConfirmed: 'Order & Seat Confirmed',
    tokenSerial: 'Token Serial Number',
    clearListBtn: 'Clear All List',
    listReceiptDesc: '*These items are generated in the message below. Feel free to customize or add arbitrary special diet requirements.',
    nameLabel: 'Guest Principle Name',
    cancelBookingBtn: 'Release Ticket Placement',
    guestsCount: 'Guests',
    addNotes: 'Click a course to begin adding it, or type anything.',
  },
  ar: {
    // Nav items
    philosophy: 'الفلسفة',
    menu: 'قائمة الطعام',
    fruitSmoothie: 'خلاط العصائر',
    bookTable: 'حجز طاولة',
    tableRsvp: 'حجز طاولة مباشر',
    
    // Hero
    heroSubtitle: 'بذور من الأرض القديمة 🌱',
    heroTitleRow1: 'بلانتيفاي',
    heroTitleRow2: 'ملاذ الطهي العضوي المتميز',
    heroDescription: 'انطلق في رحلة ملحمية لغذاء الجسد والروح. نصنع بكل حب أطباق الجذور والمشروبات غير المكربنة المنعشة المليئة بجزيئات النباتات التكيفية المفيدة.',
    exploreMenuBtn: 'استكشاف أسرار القائمة والوجبات',
    designSmoothieBtn: 'مختبر ابتكار العصائر وعلم الخيمياء',
    scrollDown: 'انزل للأسفل لدخول المحمية الخضراء',

    // Philosophy
    philosophyHeader: 'فلسفتنا ومبادئ طهينا',
    philosophySubtitle: 'فن الطهي الحقيقي ليس مجرد هضم اعتيادي للمواد؛ إنه حوار فسيولوجي نشط واستثنائي بين خلايانا الحيوية والذكاء الهادئ لجذور الطبيعة والمزرعة.',
    ecoTitle: 'الزراعة الحيوية المتناغمة مع التربة',
    ecoDesc: 'نحن نولي التربة عناية فائقة. كل ثمرة طرية نقتطفها يدويًا تأتي من حقول محلية تتبع دورة حيوية ديناميكية تخلو من أي مبيدات أو تدخلات كيميائية ضارة.',
    beechTitle: 'الموقد الحطب والأخشاب الطبيعية',
    beechDesc: 'نحن نرفض استخدام مواقد الحث الكهربائية الحديثة. جميع أطعمتنا تُطهى على جمر خشب الزان الأبيض الطبيعي الهادئ، لتكتسب تلك النكهة العميقة الفاخرة.',
    adaptTitle: 'تسريب مستخلص النباتات التكيفية',
    adaptDesc: 'نقع مشروباتنا المنعشة طبيعي بالكامل، يُصفى عبر طبقات الحجر الجيري العضوي، المعزز بوريقات شجر الجينسنغ وورد البازلاء الفراشية لإعادة الاتزان.',
    michelinTitle: 'حرفة حائزة على نجوم ميشلان الفاخرة',
    respectTruth: 'احترام نقاء وحقائق المكون الطبيعي الخام.',
    chefQuote: 'كبير الطهاة إيليان فانس، يعتني بالشتلات داخل حوض الزراعة بمطعمنا.',
    factTitle: 'حقيقة المصدر',
    factDesc: '100٪ من الفطر الخاص بنا وبراعم الصنوبر يتم جنيها يدويًا يوميًا بواسطة خبراء البيئة في غاباتنا المحلية.',

    // Lab Intro
    labSubtitle: 'مختبر دمج العناصر والنكتار النباتي',
    labTitle: 'كيميائي العصائر والعلم القديم',
    labDesc: 'اصنع الآن توليفة العصير النباتية الفريدة والخاصة بك. اختر طبقات النكتار الغني بالإنزيمات والمستحلبات، وعززها بقطرات التكيف الطبيعية الحصرية.',
    craftBtn: 'دخول مختبر الخيمياء والتوليف',
    craftFeature1: 'قواعد نكتار الفاكهة النشطة',
    craftFeature2: 'منشطات الأعشاب التكيفية',
    craftFeature3: 'ثمار برية تجمع يدويًا',

    // Menu View
    menuTitle: 'قائمة الحصاد والمورثات النباتية',
    appetizersTab: 'المقبلات والشوربات',
    mainsTab: 'الأطباق الرئيسية المغذية',
    dessertsTab: 'الحلويات المبتكرة العضوية',
    elixirsTab: 'الترياق والمشروبات البرية',
    backBtn: 'العودة لملاذ بلانتيفاي الرئيسي',
    addToOrderBtn: 'إضافة إلى طلب الطاولة',
    caloriesLabel: 'السعرات الحرارية',
    ingredientsLabel: 'العناصر والمكونات العشبية',
    chefSpecialLabel: 'طبق خاص ومتميز للشريف',
    reserveWithThisDish: '✨ احجز طاولة مع هذا الطبق الفاخر',
    customNotesPlaceholder: 'اكتب هنا ملاحظاتك وتفضيلاتك (مثال: حساسية من المكسرات، إضافة القليل من العسل)...',

    // Mixer View
    mixerBackBtn: 'العودة لملاذ بلانتيفاي الرئيسي',
    step1: 'الخطوة الأولى: اختر قاعدة الترياق ونكتار المانجو أو الشغف',
    step2: 'الخطوة الثانية: حدد حليب اللوز أو جوز الهند الاستوائي الكريمي',
    step3: 'الخطوة الثالثة: اختر الإضافات المقرمشة والتوابل العطرة',
    step4: 'الخطوة الرابعة: الانصهار النبيل والتحول الخيميائي المتكامل',
    selectedBase: 'قاعدة النكتار المختارة',
    selectedMilk: 'مستحلب الحليب المختار',
    selectedAddon: 'إضافتكم العشبية المختارة',
    customBase: 'اختر قاعدة',
    customMilk: 'اختر الحليب',
    customAddon: 'اختر الإضافة',
    startCompounding: 'بدء دمج وبلورة المكونات معًا',
    resetBtn: 'تفكيك وإلغاء توليفة المزيج الحالية',
    compoundingProgress: 'جارٍ دمج الأنسجة واستخلاص روابط المواد التكيفية...',
    compoundReady: 'تمت توليفة العصير الخيميائي الخاص بك بنجاح باهر!',
    recipeLabel: 'المخطط البنائي للمزيج المبتكر:',
    claimTicketLabel: '✨ حجز طاولة مع هذا المزيج اللذيذ',
    viewAllIngredients: 'عرض وتحليل تفاصيل وفوائد التوليفة المبتكرة',
    alchemistTitle: 'آلة الخيمياء ومزج المكونات النشطة',

    // Booking View
    bookTitle: 'حجز طاولتكم الخاصة',
    bookSub: '"استمتعوا بفن طهينا الطبيعي الفاخر، مباشرة من الموقد وجمر خشب الزان."',
    reservationHeading: 'محرك ونظام الحجوزات الفوري',
    partyCount: 'عدد الأفراد والضيوف',
    sessionDate: 'تاريخ وتوقيت الحجز',
    startTime: 'ساعة الانطلاق والبدء',
    selectTimeSlot: 'اختر الفترة الزمنية الدقيقة',
    bookingAlert: 'الأطباق والوجبات المختارة في طلبك',
    specialRequestLabel: 'الحساسية والطلبات الخاصة بالأغذية والأعشاب',
    specialRequestPlaceholder: 'يرجى كتابة أي طلبات خاصة، نظام غذائي معين، أو حساسيات تجاه بعض المكونات...',
    contactNum: 'رقم هاتف الاتصال المباشر',
    guestEmail: 'البريد الإلكتروني للضيف الرئيسي',
    rsvpBtn: 'أكد وثبت حجز طاولتك المباشر الآن',
    textReceipt: 'تذكرة الحجز وإيصال الطلب المسجل',
    orderConfirmed: 'تم تأكيد مقعدك وحجز الوجبات بنجاح',
    tokenSerial: 'الرقم المتسلسل للتذكرة الحصرية',
    clearListBtn: 'مسح قائمة الأطباق كاملة',
    listReceiptDesc: '*تظهر هذه الوجبات تلقائياً كوسيلة تذكير في تذكرة الحجز المرسلة لضمان تقديم أفضل تجربة ضيافة.',
    nameLabel: 'اسم الضيف الرئيسي الكامل',
    cancelBookingBtn: 'إلغاء وتحرير تذكرة الحجز بالكامل',
    guestsCount: 'ضيوف',
    addNotes: 'انقر فوق طبق للبدء في حجزه، أو اكتب مباشرة لإعلامنا.',
  }
};

const ITEM_NAME_AR: Record<string, string> = {
  // Appetizers
  'Wild Forest Mushrooms & Elderberry Carpaccio': 'فطر الغابة البري وكارباتشيو التوت الأسود 🍄',
  'Compressed Cucumber & Cedarwood Essence Gazpacho': 'غاسباتشو الخيار المضغوط وجوهر خشب الأرز 🥒',
  'Heirloom Radish Mosaic & Wild Garlic Emulsion': 'لوحة الفجل المعتق ومستحلب الثوم البري',
  'Charcoal Sourdough with Sprouted Pine Needle Butter': 'خبز العجين المخمر بالفحم مع زبدة إبر الصنوبر',
  'Sprouted Pulse Terrine with Yellow Clover Blossom': 'تيرين البقوليات المستنبتة مع زهور البرسيم الأصفر',

  // Mains
  'Charred Sunchoke & Roasted Acorn Platter': 'طبق جذور عباد الشمس المتفحم وبلوط الصنوبر المحمص 🍽️',
  'Smoked Heirloom Squash with Spruce Needle Confit': 'قرع معسل مدخن مع كونفيت إبر الصنوبر 🎃',
  'Ancient Spelt Risotto in Rose Petal Broth': 'ريزوتو الحنطة البرية المعزز ببتلات الورد 🌹',
  'Roasted Chestnuts & Wild Meadow Mushrooms Loaf': 'قالب الكستناء المحمصة وفطور المروج البرية 🌰',
  'Wild Clover Pasta with Smoked Beechwood Garlic': 'باستا البرسيم البري مع ثوم خشب الزان المدخن 🍝',

  // Desserts
  'Charcoal Cocoa & Elderberry Gelée Sphere': 'كرة كاكاو الفحم المدهشة وجيلي نبات البيلسان 🍫',
  'Steamed Wild Pear with Birch Sap reduction': 'كمثرى برية مطهوة على البخار بمرق عصارة خشب البتولا 🍐',
  'Cardamom Meadowsweet Tart with Raspberries': 'تارت الهيل وحلوى المروج مع ثمار العليق 🍰',
  'Chilled Wild Thyme & Citrus Lemon Balm Shaved Ice': 'مبشور الجليد ببلسم الليمون وزعتر الجبال البري 🍧',
  'Salty Blue Sea Kelp & Raw Cacao Crisps': 'رقائق عشب البحر المالح والكاكاو الخام 🍫',

  // Botanical Elixirs
  'Midnight Lavender & Amethyst Chamomile Nectar': 'رحيق بابونج الجمشت ولافندر منتصف الليل المنعش 💜',
  'Siberian Ginseng & Forest Gold Pine Cordial': 'شراب صنوبر الغابة الذهبي وجينسنغ سيبيريا 🌲',
  'Spiced Bitter Dandelion & Roasted Chicory Draft': 'منقوع الهندباء المرة المحمصة والبهارات الحارة 🧉',
  'Ruby Hibiscus Tea with Wild Angelica Root': 'شاي الكركديه الياقوتي مع جذور حشيشة الملاك 🌺',
  'Emerald Gotu Kola & Wheatgrass Elixir Potent': 'ترياق عشبة القمح الأخضر وغوتو كولا الزمردي 🟢',

  // Custom smoothie compounds:
  'Alphonso Mango Nectar': 'رحيق مانجو ألفونسو الطيب',
  'Squeezed Pink Passionfruit': 'عصير باشن فروت الوردي المنعش',
  'Gold Mountain Apple Nectar': 'رحيق تفاح الجبل الأخضر الدسم',
  'Cold-Pressed Watermelon Splash': 'عصير بطيخ بارد ومروي',
  'Creamy Tropical Banana Nectar': 'موز استوائي كريمي ناعم',
  'Sun-Ripened Golden Peach Splash': 'خوخ صيفي ذهبي طبيعي',
  'Wild Forest Strawberries': 'فراولة الغابة الطبيعية',
  'Organic Blueberries & Blackberries': 'توت بري عضوي ممتاز',
  'Tangy Raspberries & Cranberries': 'عليق حامض وكرانبيري غني',
  'Fresh Pineapple Drizzle': 'سائل أناناس استوائي حلو',
  'Sweet Orange & Mandarin': 'برتقال ويوسفي كاليفورنيا الحامض واللذيذ',
  'Glazed Black Cherries': 'حبات كرز أسود بري ممتازة',
  'Creamy Hass Avocado Blend': 'مزج أفوكادو هاس الفاخر دسم القوام',
  'Creamy Spelt & Oat Cream Milk': 'حليب الشوفان والحنطة الكريمي المغذي',
  'Rich Island Coconut Cream Milk': 'حليب جوز الهند الاستوائي المرطب',
  'Silky Dark Chocolate Cream': 'شوكولاتة داكنة حريرية القوام',
  'Whipped French Vanilla Yogurt': 'زبادي مخفوق بالفانيليا الفرنسية العطرة',
  'Roasted Almond Butter Cream': 'زبدة لوز مطحونة ومحمصة ومغذية',
  'Velvet Sicilian Pistachio Cream': 'مخمل فستق صقلية الأخضر الشهي',
  'Beechwood Wildflower Honey': 'عسل زهور الزان الجبلية البرية',
  'Pure Thick Amber Maple Syrup': 'شراب قيقب طبيعي نقي وخام',
  'Organic Chia & Flax Seed Swirl': 'توليفة بذور الشيا والكتان الغنية بالأوميجا 3',
  'Grated Cocoa & Hazelnut Shavings': 'برش الشوكولاتة الداكنة الخام وحبيبات البندق',
  'Fresh Garden Cool Mint Leaves': 'أوراق نعناع حديقتنا الأخضر المنعش',
  'Crisp Butter Cookie Crumbs': 'فتات البسكويت المقرمش اللذيذ',

  // Sub-ingredients within standard dishes
  'Chanterelle Mushrooms': 'فطر الشانتريل البري',
  'White Truffle': 'الفقع الأبيض (الكمأ)',
  'Elderberry Splash': 'عصير البيلسان المركز',
  'Charcoal Infused Olive Oil': 'زيت الزيتون المنعش بالفحم',
  'Micro Herbs': 'الأعشاب الدقيقة العضوية',
  'Compressed Cucumber': 'الخيار المضغوط البارد',
  'Green Apple': 'التفاح الأخضر المنعش',
  'Pine Pollen extract': 'مستخلص لقاح الصنوبر',
  'Wild Sorrel': 'الحميض البري',
  'Forest Honey drops': 'قطرات عسل الغابة',
  'Candy Beets': 'بنجر السكر المقرمش',
  'Violet Radishes': 'الفجل الأرجواني الملون',
  'Pickled Mustard Seed': 'بذور الخردل المخللة',
  'Kelp Flakes': 'رقائق عشب البحر المالح',
  'Wild Garlic blossom Cream': 'كريمة زهر الثوم البري',
  'Birch Charcoal Dough': 'عجين فحم البتولا',
  'Young Pine-needles': 'إبر الصنوبر الفتية',
  'Whipped Sweet Butter': 'الزبدة الحلوة المخفوقة',
  'Smoked Sea Salt Crystals': 'كريستالات الملح البحري المدخن',
  'Sprouted Lentils': 'عدس مستنبت غني بالبروتين',
  'Fennel Pollen': 'لقاح الشمر الطبيعي',
  'Yellow Clovers': 'أزهار البرسيم الأصفر',
  'Tarragon Tincture': 'صبغة نبات الطرخون',
  'Radish Shoots': 'براعم الفجل الدقيقة',
  'Smoked Sunchokes': 'جذور عباد الشمس المدخنة',
  'Wild Acorns': 'بلوط الغابة البري',
  'Hazelnuts': 'البندق المحمص',
  'Sea Lettuce dust': 'مسحوق خس البحر الغني باليود',
  'Sage extract': 'مستخلص نبات الميرمية',
  'Beachwood Kabocha pumpkin': 'قرع كابوتشا المدخن بخشب الزان',
  'Dandelion Greens': 'أوراق الهندباء البرية',
  'Parsnips': 'جزر الجزر الأبيض',
  'Amaranth grains': 'حبوب القطيفة (الآمارانث)',
  'Spruce needle butter': 'زبدة إبر الصنوبر البرية',
  'Spelt Grain': 'حبوب الحنطة القديمة',
  'Damask Rosewater': 'ماء الورد الدمشقي المقطر',
  'Purple Cauliflower': 'القرنبيط الأرجواني الفاخر',
  'Pistachios': 'فستق حلبي مطحون',
  'Flash-crisped Sage': 'ميرمية مقرمشة على اللهب',
  'Ground Chestnuts': 'كستناء الجبال المطحونة',
  'Porcini mushrooms': 'فطر البورشيني الفاخر',
  'Wood-ear Mushrooms': 'فطر أذن الخشب البري',
  'Savoy Cabbage': 'أوراق ملفوف السافوي',
  'Red Currant glaze': 'تلميعة التوت الأحمر العطرة',
  'Clover-infused Flour': 'طحين منقوع بالبرسيم البري',
  'Beechwood Smoked Garlic': 'ثوم مدخن بخشب الزان الموقد',
  'Walnut Oil': 'زيت الجوز المعصور على البارد',
  'Shaved White Truffles': 'رقائق الكمأ الأبيض الطازجة',
  'Pecan crisps': 'مقرمشات جوز البيكان',
  '85% Raw Cocoa': '٨٥٪ كاكاو خام بلجيكي',
  'Lavender infusion': 'تسريب اللافندر المهدئ للأعصاب',
  'Elderberries': 'ثمار البيلسان البرية',
  'Almond flour soil': 'تراب دقيق اللوز المحمص',
  'Blue agave sweetener': 'محلي الصبار الأزرق العضوي',
  'Bosc Pear': 'أجاص (كمثرى) البوسك الخضراء',
  'Birch Sap syrup': 'شراب عصارة خشب البتولا النقي',
  'Coconut Cream foam': 'رغوة كريمة جوز الهند الكثيفة',
  'Cardamom pods': 'حبات الهيل الفواحة',
  'Pine honey extract': 'مستخلص عسل الصنوبر الجبلي',
  'Meadowsweet Blossoms': 'زهور حلوى المروج العطرة',
  'Sprouted Buckwheat': 'الحنطة السوداء المستنبتة',
  'White Vegan Cocoa': 'الكاكاو الأبيض النباتي',
  'Wild Raspberries': 'توت العليق البري الطازج',
  'Cardamom Seed': 'بذور الهيل الفاخرة',
  'Lemon Balm Steeps': 'منقوع بلسم الليمون المنظف',
  'Apple Mint Essence': 'جوهر نعناع التفاح النقي',
  'Wild Thyme Honey': 'عسل الزعتر البري الجبلي',
  'Pansy blossoms': 'زهور الثالوث البرية الصالحة للأكل',
  'Key lime juice': 'عصير الليمون الأخضر المنعش',
  'Sea Kelp strips': 'شرائح عشب البحر الطبيعي',
  'Raw Cocoa Nibs': 'حبيبات الكاكاو الخام المقرمشة',
  'Maple syrup': 'شراب القيقب العضوي النقي',
  'Rose petal sea salt': 'ملح البحر المنكه ببتلات الورد',
  'Toasted sesame': 'السمسم المحمص العطري',
  'Organic Chamomile': 'أزهار البابونج العضوي المهدوئ',
  'Fine Lavender buds': 'براعم اللافندر الفرنسي الناعمة',
  'Butterfly Pea flower': 'أزهار البازلاء الفراشية الأرجوانية',
  'Alkaline Spring Water': 'مياه الينابيع القلوية المفلترة',
  'Siberian Ginseng extract': 'مستخلص جينسنغ سيبيريا المنشط',
  'Spruce Pine pine needles': 'إبر صنوبر التنوب البري',
  'Sea Buckthorn concentrate': 'مركز نبق البحر الغني بمضادات الأكسدة',
  'Birch Water': 'مياه البتولا الطبيعية',
  'Roasted Chicory': 'جذور الهندباء البرية المحمصة المريحة',
  'Dandelion Roots': 'جذور الهندباء العضوية',
  'Ceylon Cinnamon bark': 'لحاء القرفة السيلانية الفاخرة',
  'Cayenne seeds': 'بذور فلفل كايين الحارة',
  'Dark forest maple': 'شراب القيقب الغامق الفاخر',
  'Dried Hibiscus Sepals': 'أوراق برعم الكركديه المجفف',
  'Angelica Root extract': 'مستخلص جذور حشيشة الملاك العطرة',
  'Organic Licorice': 'عرق السوس العضوي النقي',
  'Birch Bark Honey': 'عسل لحاء البتولا الجبلية',
  'Mineral Ice': 'ثلج معدني مبشور نقي',
  'Live Gotu Kola extract': 'مستخلص غوتو كولا الذهني',
  'Sprouted Wheatgrass': 'عشب القمح المستنبت الغني بالكلوروفيل',
  'Cold Lemon Balm': 'بلسم الليمون البارد المروي',
  'Peppermint oil drops': 'قطرات زيت النعناع الفواح الجبلي'
};

const ITEM_DESC_AR: Record<string, string> = {
  'Crisp hand-picked chanterelles, thin shaved white truffle, organic micro blossoms, elderberry reduction, rosemary-infused charcoal bread oil.': 'فطر شانتريل بري منتقى بعناية، مع شرائح بيضاء رقيقة من التوت البري الفاخر، زهور برية، وزيت الفحم المعتق بإكليل الجبل.',
  'Chilled essence of field cucumbers compressed under pressure with green apple, pine pollen, sorrel sorbet, drops of local pure golden honey.': 'جوهر الخيار البارد المعالج بضغط الهواء مع التفاح الأخضر، لقاح الصنوبر، سوربيه الحميض البري، وقطرات عسل النحل المحلي الفاخر.',
  'Paper-thin concentric rings of violet and candy-stripe beets, pickled mustard seeds, salted kelp, with a hand-emulsified wild clover blossom garlic cream.': 'شرائح دائرية رقيقة كخيوط الحرير من الفجل الملون والبنجر، مع بذور الخردل المخللة، وعشب البحر المالح، وكريمة الثوم المصنوعة يدويًا من البرسيم البري.',
  'House-made heirloom sourdough bread infused with active white birch charcoal, served alongside whip-aired butter containing young spring pine-needles and smoked crystal sea salts.': 'خبز العجين المخمر التقليدي الغني بفحم البتولا الأبيض المحضر بالمنزل، يقدم إلى جانب زبدة مخفوقة بأبر الصنوبر الغضة الكريستالية والمستخلصة في فصل الربيع والأملاح الغنية.',
  'Pressed brick of sprouted organic green lentils and chickpeas, infused with crushed fennel pollen, surrounded by wild yellow clovers, tarragon tincture, and micro radish stems.': 'قالب من البقوليات العضوية المستنبتة من العدس الأخضر والحمص، مع حبوب لقاح الشمر المطحونة، تحيط به باقة البرسيم الأصفر والترخون.',
  'Embers-grilled sunchokes served over creamed hazelnut puree, baked acorn pulp glaze, roasted forest acorns, sea lettuce dust, wild sage infusion.': 'جذور عباد الشمس المشوية على الجمر، تقدم فوق بيوريه البندق الناعم، مع مزيج البلوط المحمص، ومسحوق خس البحر، ونقع الميرمية البرية المطهر للجسم.',
  'Slow beechwood-smoked kabocha pumpkin, wild spruce needle confit butter, parsnip crisps, fermented dandelion juice drizzle, popped amaranth crunch.': 'يقطين كابوتشا مدخن ببطء على خشب الزان، مع زبدة كونفيت إبر التنوب البرية، وشرائح الجزر الأبيض المقرمشة، قطرات من عصير الهندباء الغني بالفوائد.',
  'Emmer starch spelt slowly simmered with fresh distilled damask rosewater, roasted purple cauliflowers, pistachio butter emulsification, topped with edible crispy sage.': 'حنطة برية مطهوة على نار هادئة بماء الورد الدمشقي المقطر، مع طهاة القرنبيط الأرجواني المحمص، زبدة الفستق الدمجية والميرمية البرية المقرمشة.',
  'Pristine savory log of hand-ground mountain chestnuts, roasted porcini and wood-ear mushrooms, encased in direct fire-baked savoy cabbage leaves with red currants glaze.': 'قالب معبأ بالنكهات الفاخرة من كستناء الجبال المطحونة يدويًا، مع فطر البورشيني البري وفطر أذن الخشب المغلف بأوراق الكرنب المطهو على لهب مشتعل.',
  'Artisanal hand-cut linguine infused with dark-green wild clover extract, tossed in charred beechwood oak garlic, organic cold-pressed walnut oil, and freshly shaved white truffles.': 'باستا لينغويني حرفية مصنوعة يدويًا مع مستخلص زهرة البرسيم، منقوعة في ثوم خشب البلوط والزان المدخن، زيت الجوز العضوي وشرائح الكمأ الأبيض الفاخرة.',
  'Single-origin 85% raw dark cacao shell filled with lavender-scented mousse, an inner core of organic wild elderberry gelée, resting on roasted almond soil.': 'قشرة كاكاو خام بلجيكية بنسبة 85% محشوة بموس اللافندر العطر، وقلب من جيلي البيلسان البري يستريح على تراب اللوز المحمص.',
  'Locally grown green bosc pear gently poached in high-proof pine honey and cardamom broth, glazed with organic mountain birch sap syrup, with clean coconut foam.': 'كمثرى خضراء تنمو محليًا مطبوخة بلطف في عسل الصنوبر ومرق الهيل، مع غطاء غني من شراب البتولا ورغوة حليب جوز الهند العضوية الناعمة.',
  'Flaky crust made of sprouted buckwheat flour, holding a rich paste of raw white-chocolate, infused with powdered wildcard meadowsweet blossoms and fresh raspberries.': 'فطيرة مذهلة ذات قوام مقرمش محضرة من دقيق الحنطة السوداء، تحتوي على كريمة غنية بالشوكولاتة البيضاء الخام، مغطاة بزهور المروج العطرة والكراميل وثمار العليق.',
  'Incredibly fine snow shaved from cold-pressed lemon balm and apple-mint leaves, splashed with mountain wild thyme syrup, wild pansy flowers, and a pinch of lime extract.': 'ثلج جبل ناعم ومبشور مصنوع من بلسم الليمون المعصور باردًا وأوراق النعناع والتفاح الزكية، مغمور بشراب الزعتر الجبلي البري وقرصة من مستخلص الليمون.',
  'Crispy dehydrated wild sea-kelp strips dredged in melted raw cocoa nibs, sweetened slightly with mountain maple syrup and seasoned with flower-petal coarse mineral salt crusts.': 'رقائق عشب البحر المجفف المقرمشة مغموسة في كاكاو الشوكولاتة الخام، محلاة بالقليل من شراب غابات القيقب النقي، متبلة بملح البتلات البحري المعدني الزكي.',
  'Organic chamomile flowers steeped with calming Provencal lavender, active butterfly pea flower extract, wild apple acid, and carbonated mountain spring water.': 'أزهار البابونج العضوية منقوعة مع لافندر بروفنسال المهيب المريح، مستخلص البازلاء الفراشية الاستوائي والجليد البارد النقي لصحة العقل والجسد.',
  'Ginseng roots matched with fresh spruce pine needle essence, wild sea buckthorn concentrate, sweet ginger juice, and filtered alkaline birch water.': 'جذور الجينسنغ الغامضة ممتزجة مع جوهر إبر صنوبر التنوب المنعش، عصير الزنجبيل وعصارة أشجار البتولا الألكالاين ذات التوازن الرائع والممتاز للطاقة.',
  'Warm roasted chicory roots, crushed organic dandelion root tea, slow infusions of cinnamon barks, cayenne spikes, sweetened lightly with dark forest maple honey.': 'جذور الهندباء البرية الفاخرة، مع شاي نبات الباك المهدئ، ولحام القرفة السريلانكية، بذور الكايين والفلفل المحلاة بعسل الغابة لراحة الجهاز الهضمي والأمعاء.',
  'Deep ruby tart tea made of sundried hibiscus sepals, infused with ground aromatic wild angelica roots, licorice extracts, and premium cold-spun birch bark honey.': 'شاي كركديه ياقوتي دافئ مصنوع من الكؤوس المجففة تحت أشعة الشمس البرية، مخلوط بجذور حشيشة الملاك العطرة، عرق السوس، وعسل البتولا البارد والمنعش.',
  'Concentrated organic green juice of gotu kola leaves, live wheatgrass chlorophyll, raw lemon balm nectar, with sweet drops of fresh garden peppermint oil.': 'عصير أخضر غني ومركز مصمم لتقوية خلايا الدماغ والذاكرة من أوراق غوتو كولا، الكلوروفيل النشط لعشب القمح وعصير النعناع المعتق لتطهير الجسد بالكامل.',

  // Smoothie Ingredients descriptions:
  'Freshly pulped rich organic mango nectar, packed with active enzymes.': 'نكتار مانجو عضوي طازج غني بالإنزيمات الحيوية النشطة.',
  'Fresh purple passionfruit splash, yielding a delightful, crisp and exotic profile.': 'رذاذ عصير الباشن فروت الأرجواني الطازج، يمنح نكهة استوائية منعشة ومثيرة.',
  'Cold-pressed Honey-crisp green apple extract with lively organic acids.': 'مستخلص التفاح الأخضر المقرمش المعصور بارداً مع الأحماض العضوية الحيوية.',
  'Hydrating, cold-pressed raw summer watermelon flesh for peak crispness.': 'عصير بطيخ صيفي نقي معصور بارداً للترطيب الأقصى والانتعاش.',
  'Puréed sweet organic Cavendish banana providing rich prebiotics.': 'بيوريه الموز العضوي الحلو المغذي الغني بالبريبايوتكس الطبيعية.',
  'Plump tree-ripened yellow peaches squeezed into a fragrant liquid gold.': 'دراق أصفر ناضج معصور ليتحول إلى سائل ذهبي عطري فواح.',
  'Sweet crimson wild strawberries packed with natural vitamin C.': 'فراولة برية حمراء حلوة غنية بفيتامين ج الطبيعي.',
  'Antioxidant-rich purée of handpicked organic forest berries.': 'بيوريه غني بمضادات الأكسدة من التوت البري العضوي المقطوف يدوياً.',
  'Sharp raspberries and cranberries pressed for vibrant balance.': 'عصير التوت البري وعليق العليق المعصورين لتوازن حيوي ممتاز.',
  'Golden crown pineapples rich in active bromelain enzymes.': 'عصير أناناس ذهبي منعش غني بإنزيمات البروميلين النشطة.',
  'Zesty sun-soaked California mandarin citrus juice containing active pulp fibers.': 'عصير يوسفي وحمضيات البرتقال المشمس مع ألياف اللب النشطة.',
  'Sweet, tree-ripened plump cherries packed with active phytonutrients.': 'كرز أسود حلو ناضج مليء بالمغذيات النباتية الحيوية والنشطة.',
  'Rich, buttery organic avocados supplying healthy essential lipids.': 'أفوكادو هاس العضوي الزبدي الغني بالدهون الحيوية المغذية.',
  'Plump organic oat cream yielding a luscious, velvet smoothie thickness.': 'حليب كريمة الشوفان والحنطة العضوية لقوام مخملي فاخر وعميق.',
  'Cold-pressed thick coconut flesh supplying medium-chain healthy fats.': 'حليب وجوز الهند الاستوائي الكثيف المعصور على البارد المغذي بالدهون الصحية.',
  'Rich liquid cacao cream blended with natural vanilla orchid oils.': 'كريمة الكاكاو السائلة الغنية الممزوجة بزيت الفانيليا الأوركيد العطرية الطبيعية.',
  'Greek style organic yogurt slow-whipped with cold vanilla beans.': 'زبادي عضوي مخفوق ببطء على الطريقة اليونانية بقرون الفانيليا الفرنسية.',
  'Stone-ground roasted whole organic almonds for a luxurious nuttiness.': 'زبدة اللوز الكامل المحمص والمطحون ببطء لنكهة مكسرات فاخرة وغنية.',
  'Nutty, organic wild green pistachio milk cream.': 'كريمة وحليب فستق صقلية الأخضر العضوي والبري اللذيذ.',
  'Rich unfiltered wildflower honey harvested responsibly from mountain apiaries.': 'عسل زهور برية نقي غير مصفى يتم جنيها بمسؤولية من المناحل الجبلية.',
  'Ethically tapped deep forest maple sap, rich in potassium and zinc.': 'شراب القيقب الكثيف والنقي من عمق الغابة، غني بالبوتاسيوم والزنك.',
  'Gelatinous hydrating chia and golden flax seeds providing high omega-3s.': 'بذور الشيا والكتان العضوية والذهبية التي تمد الجسم بالأوميغا 3.',
  'Finely grated organic raw cocoa nibs and crushed roasted hazelnuts.': 'برش كاكاو خام عضوي ناعم مع حبيبات البندق المحمص والمقرمش.',
  'Bruised organic spearmint leaves that infuse a cooling refreshing aroma.': 'أوراق نعناع بري منعش تضفي رائحة ونكهة باردة تريح النفس.',
  'Crunchy crushed organic shortbread cookies for a premium dessert bite.': 'فتات البسكويت العضوي المقرمش واللذيذ لنكهة مخبوزات ممتازة.'
};

const BENEFITS_AR: Record<string, string> = {
  'Tropical smoothness, natural sweetness catalyst, vitamin-dense': 'نعومة استوائية، محفز طبيعي للحلاوة، غني بالفيتامينات',
  'Floral tartness, dynamic throat feedback, anti-oxidants boost': 'حموضة زهرية، ملمس ديناميكي منعش، تعزيز قوي لمضادات الأكسدة',
  'Zesty malic acidity, clean mouthfeel, digestion enhancement': 'حموضة حيوية، إحساس منعش ونظيف للفم، تحسين الهضم',
  'Extreme hydration, high lycopene content, incredibly light body': 'ترطيب فائق، غني بالليكوبين، قوام خفيف للغاية ومنعش',
  'Velvety smooth thickness, immediate potassium release, natural sweetness': 'قوام مخملي كثيف، إمداد فوري بالبوتاسيوم، حلاوة طبيعية',
  'Aromatic summer flavor, rich dietary fibers, vitamins A and C boost': 'نكهة صيفية عطرية، غني بالألياف الغذائية، يعزز فيتامين أ و ج',
  'Lively summer tang, collagen-boosting nutrients': 'نكهة صيفية حيوية، مغذيات معززة للكولاجين',
  'High antocyanins concentration, neural defense boost': 'تركيز عالٍ من الأنثوسيانين، يعزز الحماية العصبية والذهنية',
  'Anti-inflammatory flavonoids, energetic metabolic kick': 'فلافونويدات مضادة للالتهابات، دفعة منشطة لعملية التمثيل الغذائي',
  'Active digestive enzymes, crisp tropical flavor profile': 'إنزيمات هاضمة نشطة، نكهة استوائية مقرمشة ومميزة',
  'Immune defense charge, zesty citrus fragrance lift': 'شحنة دفاعية للمناعة، عبير حمضيات منعش ومبهج',
  'Deep fruit notes, anti-tension recovery acceleration': 'نكهة فاكهة عميقة، تسريع التخلص من التوتر وإجهاد العضلات',
  'Ultra-creamy velvet thickness, high-density nutrition': 'كثافة مخملية فائقة النعومة، تغذية عالية الكثافة والفوائد',
  'Soft milky texture, incredible digestive comfort, rich mouthfeel': 'ملمس حليبي ناعم، راحة هضمية فائقة، مذاق غني',
  'Tropical aroma, velvety high-hydration lipids, natural creaminess': 'عبير استوائي، دهون مرطبة فائقة النعومة، قوام كريمي طبيعي',
  'Deep endorphin trigger, mineral-dense cacao grounding': 'محفز طبيعي للإندورفين والسعادة، كاكاو غني بالمعادن الأساسية',
  'Active probiotic cultures, smooth structure, delicious creamy tang': 'خمائر بروبيوتيك نشطة، قوام متماسك وناعم، طعم كريمي لذيذ',
  'Healthy proteins boost, high vitamin E skin protection': 'دفعة بروتينات صحية، حماية ممتازة للبشرة بفضل فيتامين هـ',
  'Highly aromatic healthy lipids, mineral energy replenishment': 'دهون صحية عطرية للغاية، تجديد الطاقة والنشاط بالمعادن',
  'Natural antioxidant binder, wild biological sweetness': 'مضاد طبيعي للأكسدة، حلاوة بيولوجية برية نقية',
  'Sustainable sweetness, wood-tinted trace minerals catalyst': 'حلاوة مستدامة ومغذية، محفز للمعادن النادرة والفريدة',
  'Added seed fiber, sustained energy delivery, beautiful gel swirl': 'ألياف غذائية غنية من البذور، طاقة حيوية مستدامة، تموج جل رائع',
  'Exquisite crispy chocolate crunch, premium dessert feel': 'قرمشة شوكولاتة رائعة، تضفي لمسة حلويات فاخرة كلياً',
  'Soothes digestion, ultimate clean palate refresh': 'يهدئ الجهاز الهضمي، انتعاش ونظافة تامة للفم والأنف',
  'Exquisitely satisfying crunchy biscuit highlights': 'تضفي قرمشة البسكويت اللذيذة والفريدة لمذاق عصير مميز'
};

const TAG_AR: Record<string, string> = {
  'Vegan': 'نباتي بالكامل %100 🍃',
  'Vegetarian': 'نباتي 🥦',
  'Gluten-Free': 'خالٍ من الغلوتين 🌾',
  'House Special': 'خاص بالمطعم ⭐',
  'Raw': 'عضوي نيء 🥗',
  'Organic': 'عضوي %100 🌱',
  'House-Baked': 'مخبوز طازج لدينا 🥖',
  'Nutrient Dense': 'غني بالمغذيات 💪',
  'House Specialty': 'توقيع كبير الطهاة 🌟',
  'Refined Sugar Free': 'خالٍ من السكر المكرر 🍯',
  'Low Sugar': 'سكر خفيف منخفض 🍎',
  'Refreshes Calorie': 'عصير منعش مغذٍ ❄️',
  'Mineral-Dense': 'مليء بالمعادن الحيوية 🌊',
  'Adaptogenic': 'نبات تكيفي متزن 🧘',
  'Calming': 'مهدئ للأعصاب 💤',
  'Sugar-Free': 'خالٍ من السكر 🍯',
  'Invigorates Wellness': 'منشط للبدن والصحة ⚡',
  'Detoxifying': 'مطهر ومنقٍ للسموم 🧪',
  'Digestive': 'مساعد للهضم ومريح 🍵',
  'Warm-Infused': 'منقوع ساخن ولذيذ ☕',
  'Antioxidant': 'مضاد قوي للأكسدة 🍇',
  'Relaxant': 'مرخٍ للعضلات ومريح 🧘',
  'Floral-Tart': 'زهري عطر متميز 🌸',
  'Cognitive Boost': 'منشط للدماغ والذاكرة 🧠',
  'Alkalizing': 'قلوي وصحي العيار 🔋',
  'Chlorophyll Concentrated': 'كلوروفيل مركز 🧪',
  'House Specialty ': 'توقيع كبير الطهاة 🌟',
  'Nut-Rich': 'غني بالمكسرات الصحية 🌰',
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  // Load preferred language if saved in localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('plantify_language');
      if (saved === 'en' || saved === 'ar') {
        setLanguage(saved);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const toggleLanguage = () => {
    const nextLang: Language = language === 'en' ? 'ar' : 'en';
    setLanguage(nextLang);
    try {
      localStorage.setItem('plantify_language', nextLang);
    } catch (e) {
      console.error(e);
    }
  };

  const isRtl = language === 'ar';

  useEffect(() => {
    // Dynamically apply direction and language metadata on the HTML root
    // Keep it always "ltr" to avoid shifting components and items from left-to-right or right-to-left
    document.documentElement.dir = 'ltr';
    document.documentElement.lang = language;
    
    // Add layout adjustments on body tag
    if (isRtl) {
      document.body.classList.add('lang-ar');
      document.body.classList.remove('lang-en');
    } else {
      document.body.classList.add('lang-en');
      document.body.classList.remove('lang-ar');
    }
  }, [language, isRtl]);

  const t = (key: string): string => {
    const text = DICTIONARY[language]?.[key] || DICTIONARY['en']?.[key];
    return text !== undefined ? text : key;
  };

  const translateItemName = (name: string): string => {
    if (language === 'ar') {
      return ITEM_NAME_AR[name] || ITEM_NAME_AR[name.trim()] || name;
    }
    return name;
  };

  const translateDescription = (desc: string): string => {
    if (language === 'ar') {
      return ITEM_DESC_AR[desc] || ITEM_DESC_AR[desc.trim()] || desc;
    }
    return desc;
  };

  const translateIngredient = (ing: string): string => {
    if (language === 'ar') {
      return ITEM_NAME_AR[ing] || ITEM_NAME_AR[ing.trim()] || ing;
    }
    return ing;
  };

  const translateTag = (tag: string): string => {
    if (language === 'ar') {
      return TAG_AR[tag] || TAG_AR[tag.trim()] || tag;
    }
    return tag;
  };

  const translateBenefits = (benefits: string): string => {
    if (language === 'ar') {
      return BENEFITS_AR[benefits] || BENEFITS_AR[benefits.trim()] || benefits;
    }
    return benefits;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        toggleLanguage,
        t,
        isRtl,
        translateItemName,
        translateDescription,
        translateIngredient,
        translateTag,
        translateBenefits,
      }}
    >
      <div style={{ fontFamily: isRtl ? "'Cairo', sans-serif" : undefined }}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
