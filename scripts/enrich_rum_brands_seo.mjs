import fs from 'fs';

// 1. Enrich BRANDS_DATA in src/config/brands.js
const newRumBrands = [
  {
    slug: 'bacardi',
    name: 'Bacardi',
    country: 'Puerto Rico',
    region: 'Cataño / San Juan',
    founded: '1862',
    category: 'spirits',
    tagline: 'The World’s Most Awarded Rum & Pioneer of Smooth Charcoal-Filtered White Rum',
    description: 'Founded in Santiago de Cuba in 1862 by Don Facundo Bacardí Massó and now distilled at the iconic "Cathedral of Rum" in Cataño, Puerto Rico. Bacardi revolutionized spirit making by inventing the charcoal filtration and white oak barrel aging process that gave birth to modern cocktail classics like the Mojito and Daiquiri.',
    highlights: ['Invented smooth charcoal-filtered light rum in 1862', 'Over 550 international awards for distilling excellence', 'Master of long oak maturation with Reserva Ocho and Gran Reserva Diez'],
    faqs: [
      {
        question: 'What is the signature production method of Bacardi Carta Blanca?',
        answer: 'Bacardi Carta Blanca is crafted from sugarcane molasses, fermented with an exclusive proprietary yeast strain, distilled in parallel column stills, and aged in charred American white oak barrels before undergoing secret coconut-shell charcoal filtration.'
      },
      {
        question: 'Is Bacardi Reserva Ocho aged for a minimum of 8 years?',
        answer: 'Yes, every blend inside Bacardi Reserva Ocho is matured for a minimum of 8 full tropical years in toasted American oak barrels.'
      }
    ]
  },
  {
    slug: 'captain-morgan',
    name: 'Captain Morgan',
    country: 'Jamaica',
    region: 'Caribbean',
    founded: '1944',
    category: 'spirits',
    tagline: 'The Global Icon of Caribbean Spiced Rum & Legendary Adventure',
    description: 'Named after the 17th-century Welsh privateer Sir Henry Morgan, Captain Morgan is the benchmark for spiced and dark Caribbean rums. Masterfully blending continuous column-distilled Caribbean rums with natural vanilla, cassia bark, clove, and indigenous Caribbean spices.',
    highlights: ['Global benchmark for spiced rum cocktails', 'Infused with natural vanilla, cinnamon, and Caribbean aromatics', 'Aged in charred white bourbon barrels for rich amber sweetness'],
    faqs: [
      {
        question: 'What gives Captain Morgan Original Spiced Gold its distinct flavour?',
        answer: 'It is crafted by blending continuous column distilled Caribbean rums with rich spices including natural vanilla, cinnamon, and clove, aged in charred bourbon barrels.'
      }
    ]
  },
  {
    slug: 'havana-club',
    name: 'Havana Club',
    country: 'Cuba',
    region: 'San José de Las Lajas, Mayabeque',
    founded: '1878',
    category: 'spirits',
    tagline: 'Authentic Cuban Rum Crafted by the Maestros del Ron Cubano',
    description: 'The authentic spirit of Cuba. Distilled from native Cuban sugarcane molasses and guarded by the strictly certified Maestros del Ron Cubano. Havana Club undergoes a dual-aging process in white oak casks under tropical Cuban humidity, creating unparalleled depth for classic Daiquiris and sipping neat.',
    highlights: ['Protected Cuban Denomination of Origin (D.O.P.)', '100% natural tropical aging overseen by certified Maestros', 'The essential ingredient in the authentic Cuban Mojito and Daiquiri'],
    faqs: [
      {
        question: 'What makes Havana Club 7 Años unique?',
        answer: 'Havana Club 7 Años is composed of aged base rums that are continuously blended and re-aged in oak casks over cycles of at least 7 full years under Cuba’s tropical climate.'
      }
    ]
  },
  {
    slug: 'plantation-planteray',
    name: 'Plantation (Planteray)',
    country: 'Barbados',
    region: 'Caribbean & Cognac, France',
    founded: '1989',
    category: 'spirits',
    tagline: 'Master of Double Cask Maturation: Tropical Caribbean Aging & French Ferrand Cognac Casks',
    description: 'Created by Alexandre Gabriel of Maison Ferrand, Plantation (Planteray) honors ancestral rum terroirs across Barbados, Jamaica, and Trinidad. Each rum is first matured in bourbon barrels in its tropical homeland before voyaging to the Château de Bonbonnet in Cognac, France for secondary aging in toasted French oak Ferrand Cognac casks.',
    highlights: ['Pioneer of dynamic double-cask maturation', 'Owns the historic West Indies Rum Distillery in Barbados (est. 1893)', 'Creator of the award-winning Stiggins’ Fancy Pineapple and XO 20th Anniversary'],
    faqs: [
      {
        question: 'What is Plantation’s signature Double Aging technique?',
        answer: 'Rum is first aged in tropical climates in bourbon casks to develop intense tropical esters, then transported to France to undergo finishing in small French oak Cognac casks for refined elegance.'
      }
    ]
  },
  {
    slug: 'flor-de-cana',
    name: 'Flor de Caña',
    country: 'Nicaragua',
    region: 'Chichigalpa',
    founded: '1890',
    category: 'spirits',
    tagline: 'Sustainably Produced & Naturally Aged at the Base of the San Cristóbal Volcano',
    description: 'Distilled at the foot of Nicaragua’s most active volcano since 1890, Flor de Caña is one of the world’s only Carbon Neutral and Fair Trade certified spirits. Matured naturally in bourbon barrels without artificial additives or added sugar.',
    highlights: ['100% Carbon Neutral and Fair Trade certified distillery', 'Naturally aged at the foot of the San Cristóbal volcano without added sugar', 'Family-owned for 5 generations since 1890'],
    faqs: [
      {
        question: 'Is Flor de Caña naturally aged without sugar?',
        answer: 'Yes, Flor de Caña is strictly naturally aged without artificial ingredients, accelerating agents, or added sugar, yielding an exceptionally dry, pure rum profile.'
      }
    ]
  },
  {
    slug: 'foursquare',
    name: 'Foursquare',
    country: 'Barbados',
    region: 'St. Philip, Barbados',
    founded: '1996',
    category: 'spirits',
    tagline: 'The Pappy of Rum: Master Distiller Richard Seale’s Pure Unadulterated Cask Strength Icons',
    description: 'Revered worldwide as the "Pappy Van Winkle of Rum", Foursquare Distillery in St. Philip, Barbados is run by fourth-generation Master Distiller Richard Seale. Foursquare produces 100% pure rum with zero added sugars, flavourings, or chill filtration, blending pot and column distillations aged in bespoke fortified wine casks.',
    highlights: ['Repeatedly voted Rum Producer of the Year at the International Spirits Challenge', 'Pure single rum philosophy with zero added sugars or artificial coloring', 'Highly allocated Exceptional Cask Selection vintage releases'],
    faqs: [
      {
        question: 'Why are Foursquare Exceptional Cask Selection rums so collectible?',
        answer: 'Foursquare ECS releases are limited vintage, cask-strength bottlings aged in unique combinations of Madeira, Port, Zinfandel, and ex-Bourbon casks with zero additives, celebrated for pristine purity and complexity.'
      }
    ]
  },
  {
    slug: 'husk-distillers',
    name: 'Husk Distillers',
    country: 'Australia',
    region: 'Northern Rivers, NSW',
    founded: '2012',
    category: 'spirits',
    tagline: 'Pioneers of Australian Farm-to-Bottle Cultivated Cane Agricole Rum',
    description: 'Located in the Caldera of the Tweed Valley in Tumbulgum NSW, Husk Distillers pioneered Australian Cultivated Cane Rum. Distilled from fresh, unrefined sugarcane juice grown on their family farm rather than industrial molasses, Husk crafts world-class Agricole-style pure cane spirits and Bam Bam Spiced rum.',
    highlights: ['First Australian farm-to-bottle pure cane Agricole distillery', 'Estate-grown sugarcane varieties harvested and crushed within hours', 'Creators of the famous botanical Bam Bam Spiced and Pure Cane spirits'],
    faqs: [
      {
        question: 'What is the difference between Husk Pure Cane Rum and traditional rum?',
        answer: 'Husk distills directly from fresh, raw sugarcane juice freshly pressed on their farm, creating grassy, vibrant, terroir-driven Agricole rum, whereas traditional rums distill from cooked industrial molasses.'
      }
    ]
  },
  {
    slug: 'bumbu',
    name: 'Bumbu',
    country: 'Barbados',
    region: 'Barbados & Panama',
    founded: '2016',
    category: 'spirits',
    tagline: 'Crafted from All-Natural Native Spices and Historic Caribbean Sugarcane',
    description: 'Based on an authentic 16th and 17th-century recipe used by Caribbean sailors, Bumbu crafts ultra-smooth, complex rums using select sugarcane from eight separate Caribbean nations. Aged in grade-A ex-bourbon casks and blended with natural native spices, Bumbu is recognized globally by its iconic heavy glass bottle and tarnished metal X cross.',
    highlights: ['Sugarcane sourced from 8 top Caribbean terroirs', 'Aged up to 15 years in Kentucky bourbon barrels', 'Distilled using historic coral-filtered Barbadian aquifer water'],
    faqs: [
      {
        question: 'Where is Bumbu rum made?',
        answer: 'Bumbu Original is blended and bottled at a historic distillery in Barbados that dates back to 1893, using natural spices and local spring water.'
      }
    ]
  },
  {
    slug: 'el-dorado',
    name: 'El Dorado',
    country: 'Guyana',
    region: 'Demerara River, Guyana',
    founded: '1670',
    category: 'spirits',
    tagline: 'Home of the Legendary Demerara Wooden Pot Stills & 100% Minimum Age Statements',
    description: 'Distilled by Demerara Distillers Limited (DDL) on the banks of the Demerara River in Guyana. Operating the world’s last remaining operational wooden heritage stills (including the famous Port Mourant double wooden pot still and Enmore wooden Coffey still), El Dorado delivers heavy, rich, dark Demerara rums with unmatched depth.',
    highlights: ['Sole producer operating 250-year-old wooden heritage stills', '100% true minimum age statements on all age-declared bottles', 'Rich Demerara molasses profile with dark brown sugar, fig, and tobacco notes'],
    faqs: [
      {
        question: 'What are the Demerara wooden stills?',
        answer: 'They are historic greenheart wood pot and column stills constructed in the 18th century, which impart unique rich oily esters, molasses warmth, and deep wood complexity found nowhere else in the world.'
      }
    ]
  },
  {
    slug: 'goslings',
    name: 'Goslings',
    country: 'Bermuda',
    region: 'Hamilton, Bermuda',
    founded: '1806',
    category: 'spirits',
    tagline: 'Bermuda’s National Spirit & The Official Rum of the Dark ’n Stormy® Cocktail',
    description: 'Bermuda’s oldest business, established in 1806 by William Gosling. Goslings Black Seal is an intensely rich, black rum aged in charred American oak casks, famed globally as the trademarked signature spirit in the authentic Dark ’n Stormy cocktail.',
    highlights: ['Bermuda’s oldest business and largest export', 'Holder of the trademark for the official Dark ’n Stormy® cocktail', 'Deep, rich molasses, butterscotch, and warm vanilla profile'],
    faqs: [
      {
        question: 'How do you make an authentic Dark ’n Stormy?',
        answer: 'Pour Goslings Black Seal Rum over ice and Goslings Stormy Ginger Beer with a fresh lime wedge; Goslings holds the registered trademark for this iconic cocktail.'
      }
    ]
  }
];

const brandsPath = 'src/config/brands.js';
let brandsContent = fs.readFileSync(brandsPath, 'utf8');

// Insert new rum brands if they don't already exist in brands.js
for (const brand of newRumBrands) {
  if (!brandsContent.includes(`slug: '${brand.slug}'`)) {
    const brandStr = `  ${JSON.stringify(brand, null, 2)},\n`;
    brandsContent = brandsContent.replace('export const BRANDS_DATA = [', `export const BRANDS_DATA = [\n${brandStr}`);
    console.log(`Added brand: ${brand.name}`);
  }
}

fs.writeFileSync(brandsPath, brandsContent, 'utf8');
console.log('Updated src/config/brands.js successfully.');

// 2. Add Rum SEO landing pages to src/config/seoPages.js
const rumSeoPages = [
  {
    slug: 'australian-rum',
    mainCategory: 'spirits',
    subCategory: 'rum',
    name: 'Australian Rum',
    h1: 'Australian Craft & Dark Rum Online Australia',
    title: 'Buy Australian Rum Online | Bundaberg, Beenleigh, Husk & Brix | Liquor Locker AU',
    metaDescription: 'Shop premium Australian rum online. Iconic Bundaberg UP, historic Beenleigh pot still, Husk cultivated cane agricole, and artisan craft rums delivered fast.',
    intro: 'Explore the bold spirit of Australian rum. From the iconic sugarcane fields of Bundaberg and historic 1884 pot stills of Beenleigh to innovative fresh-cane agricole distillers like Husk in the Tweed Valley, Australia produces some of the world’s most distinctive, full-bodied dark and craft rums.',
    buyersGuide: `### The Complete Guide to Australian Rum

Australia has a storied distilling heritage deeply intertwined with the fertile sugarcane belts of Queensland and Northern New South Wales. Today, Australian rum represents both beloved classic traditions and world-leading craft innovation.

#### The Pillars of Australian Rum
1. **Queensland Heritage Molasses Rums**: Distilleries like Bundaberg (est. 1888) and Beenleigh (est. 1884) craft rich, molasses-forward rums aged in handcrafted American oak vats and ex-bourbon casks.
2. **Cultivated Cane Agricole**: Modern craft distillers such as Husk Distillers crush fresh estate-grown sugarcane juice within hours of harvest, producing vibrant, vegetal, terroir-driven Agricole rums.
3. **Artisan Craft & Spiced Expressions**: Sydney's Brix Distillers, Western Australia's Illegal Tender, and Victoria's JimmyRum showcase creative barrel finishes in Australian red wine, sherry, and stout casks.

#### Tasting Notes & Serving Suggestions
Australian dark rums excel when enjoyed neat, with a splash of clear spring water, or paired with premium ginger beer and fresh lime for a classic Australian Dark & Stormy.`,
    faqs: [
      {
        question: 'What is the oldest operating rum distillery in Australia?',
        answer: 'Beenleigh Artisan Distillery on the Albert River in Queensland was established in 1884, making it Australia’s oldest registered operating distillery.'
      },
      {
        question: 'What defines Australian rum flavour?',
        answer: 'Australian molasses rums are celebrated for notes of rich Queensland golden syrup, dark treacle, charred oak vanillin, and bold warming spices.'
      }
    ],
    filterCriteria: {
      category: 'spirits',
      subcategory: 'rum',
      styleKeywords: ['australia', 'queensland', 'bundaberg', 'beenleigh', 'husk', 'brix']
    },
    relatedLinks: [
      { name: 'Spiced Rum', url: '/spirits/rum/spiced-rum/' },
      { name: 'Aged Dark Rum', url: '/spirits/rum/aged-dark-rum/' },
      { name: 'Overproof Rum', url: '/spirits/rum/overproof-rum/' }
    ]
  },
  {
    slug: 'spiced-rum',
    mainCategory: 'spirits',
    subCategory: 'rum',
    name: 'Spiced Rum',
    h1: 'Premium Spiced Rum Australia | Kraken, Captain Morgan, Sailor Jerry & Craft',
    title: 'Buy Spiced Rum Online Australia | Kraken, Captain Morgan & Artisan Spiced | Liquor Locker AU',
    metaDescription: 'Shop the best spiced rums online in Australia. The Kraken Black Spiced, Sailor Jerry, Brix Spiced, and premium spiced Caribbean rums delivered express.',
    intro: 'Elevate your highball with our curated vault of premium spiced rums. Infused with natural vanilla bean, cassia bark, nutmeg, roasted clove, and native botanicals, our spiced rum collection offers rich caramel sweetness and warming spice complexity.',
    buyersGuide: `### The Guide to Premium Spiced Rums

Spiced rum begins with quality oak-aged or pot-distilled rum, which is then infused with natural whole spices, botanicals, and subtle fruit peels.

#### Leading Styles of Spiced Rum
- **Black Spiced**: Heavy, dark, molasses-rich rums like The Kraken, offering intense espresso, dark chocolate, and clove.
- **Classic Golden Spiced**: Balanced, vanilla-accented spirits like Captain Morgan Original Spiced Gold and Sailor Jerry.
- **Craft Australian Botanical Spiced**: Small-batch releases infused with Australian native spices like wattleseed, cinnamon myrtle, and Tasmanian pepperberry.`,
    faqs: [
      {
        question: 'How should spiced rum be served?',
        answer: 'Spiced rum is delicious over ice with dry ginger ale, cola, or fresh apple cider, garnished with a wedge of lime or orange.'
      }
    ],
    filterCriteria: {
      category: 'spirits',
      subcategory: 'rum',
      styleKeywords: ['spiced', 'kraken', 'sailor jerry', 'captain morgan']
    },
    relatedLinks: [
      { name: 'Australian Rum', url: '/spirits/rum/australian-rum/' },
      { name: 'Aged Dark Rum', url: '/spirits/rum/aged-dark-rum/' }
    ]
  },
  {
    slug: 'aged-dark-rum',
    mainCategory: 'spirits',
    subCategory: 'rum',
    name: 'Aged Dark Rum',
    h1: 'Aged Dark & Solera Rum Vault Australia',
    title: 'Buy Aged Dark Rum Online Australia | Diplomatico, Ron Zacapa, Appleton | Liquor Locker AU',
    metaDescription: 'Explore aged dark rums from Jamaica, Barbados, Guatemala, and Australia. Solera 23, 12 Year Old, and XO sipping rums delivered nationwide.',
    intro: 'Discover the depth and sophistication of premium aged dark rums. Matured for decades in tropical barrel houses across the Caribbean, Central America, and Australia, these sipping spirits rival the finest single malts and cognacs.',
    buyersGuide: `### Discovering Fine Aged Dark Rum

Aged rums undergo tropical maturation where high ambient humidity and heat accelerate the interaction between wood and spirit, aging up to three times faster than spirits in cool European cellars.

#### World Benchmark Aged Rums
- **Solera Maturation**: Ron Zacapa 23 and Master Distillers Collections utilize fractional blending in sherry and port casks for silky sweetness.
- **Pure Minimum Age Statements**: Appleton Estate 12-Year and Flor de Caña guarantee that every drop was matured for the stated number of years.
- **Double Cask Cognac Finishes**: Plantation XO 20th Anniversary combines Caribbean bourbon aging with French oak Cognac finishing.`,
    faqs: [
      {
        question: 'Can aged dark rum be sipped neat like whisky?',
        answer: 'Absolutely. Premium aged rums aged 8 to 20+ years offer rich dried fruit, toasted oak, leather, and cocoa complexity meant to be savoured neat in a tulip glass.'
      }
    ],
    filterCriteria: {
      category: 'spirits',
      subcategory: 'rum',
      styleKeywords: ['aged', 'dark', 'solera', 'diplomatico', 'zacapa', 'appleton']
    },
    relatedLinks: [
      { name: 'Australian Rum', url: '/spirits/rum/australian-rum/' },
      { name: 'Overproof Rum', url: '/spirits/rum/overproof-rum/' }
    ]
  }
];

const seoPath = 'src/config/seoPages.js';
let seoContent = fs.readFileSync(seoPath, 'utf8');

for (const page of rumSeoPages) {
  if (!seoContent.includes(`slug: '${page.slug}'`)) {
    const pageStr = `  ${JSON.stringify(page, null, 2)},\n`;
    seoContent = seoContent.replace('export const SEO_LANDING_PAGES = [', `export const SEO_LANDING_PAGES = [\n${pageStr}`);
    console.log(`Added SEO page: ${page.name}`);
  }
}

fs.writeFileSync(seoPath, seoContent, 'utf8');
console.log('Updated src/config/seoPages.js successfully.');
