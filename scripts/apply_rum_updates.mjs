import fs from 'fs';
import { RUM_PRODUCTS } from './add_rum_products.mjs';

console.log(`Processing ${RUM_PRODUCTS.length} rum products...`);

// 1. Format PRODUCTS for site.js
const formattedProducts = RUM_PRODUCTS.map(r => {
  const slug = r.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const seoUrl = `/${r.category}/${r.primarySubcategory}/${slug}`;
  const keywords = `${r.name.toLowerCase()}; ${r.brand.toLowerCase()}; ${r.productType.toLowerCase()}; rum; ${r.primarySubcategory}; ${r.country.toLowerCase()}; ${r.flavourProfile.join(', ').toLowerCase()}`;

  return `  {
    slug: "${slug}",
    name: "${r.name}",
    price: ${r.price},
    primaryCategory: "${r.primaryCategory}",
    primarySubcategory: "${r.primarySubcategory}",
    brand: "${r.brand}",
    countryOfOrigin: "${r.country}",
    regionOrState: "${r.region}",
    abv: "${r.abv}",
    containerType: "${r.containerType}",
    bottleOrCanSize: "${r.size}",
    packSize: "${r.packSize}",
    primaryProductType: "${r.productType}",
    styleOrVariety: "${r.style}",
    flavourProfile: ${JSON.stringify(r.flavourProfile)},
    dietary: [],
    ageStatement: "${r.ageStatement || ''}",
    vintage: "${r.vintage || ''}",
    controlledTags: ${JSON.stringify(r.tags || ["Premium Pick"])},
    collections: ${JSON.stringify(r.collections || ["spirits", "rum"])},
    seoUrl: "${seoUrl}",
    description: "${r.desc.replace(/"/g, '\\"')}",
    shortDescription: "${r.shortDesc.replace(/"/g, '\\"')}",
    searchKeywords: "${keywords.replace(/"/g, '\\"')}",
    badge: "${r.badge || ''}",
    featured: ${r.featured ? 'true' : 'false'},
    images: ["${r.image}"],
    image: "${r.image}",
    category: "${r.category}"
  }`;
});

// 2. Read and update src/config/site.js
let siteContent = fs.readFileSync('src/config/site.js', 'utf8');

// Check if rum collections are in COLLECTIONS
const rumCollectionsToAdd = [
  `  { slug: 'rum', name: 'Rum', type: 'seo', description: 'Aged dark rums, spiced Caribbean rums, and Australian craft rums.' }`,
  `  { slug: 'spiced-rum', name: 'Spiced Rum', type: 'seo', description: 'Vanilla, cinnamon, and allspice infused dark and golden rums.' }`,
  `  { slug: 'dark-rum', name: 'Dark Rum', type: 'seo', description: 'Rich, molasses-driven barrel aged dark rums.' }`,
  `  { slug: 'australian-rum', name: 'Australian Rum', type: 'seo', description: 'Iconic Queensland and artisanal craft rums distilled in Australia.' }`,
  `  { slug: 'rum-premix', name: 'Rum Premix', type: 'seo', description: 'Aged dark rum & cola cans, spiced rum RTDs, and slab packs.' }`
];

for (const col of rumCollectionsToAdd) {
  const slugMatch = col.match(/slug:\s*['"]([^'"]+)['"]/);
  if (slugMatch && !siteContent.includes(`slug: '${slugMatch[1]}'`) && !siteContent.includes(`slug: "${slugMatch[1]}"`)) {
    siteContent = siteContent.replace('export const COLLECTIONS = [', `export const COLLECTIONS = [\n${col},`);
    console.log(`Added collection: ${slugMatch[1]}`);
  }
}

// Append products to PRODUCTS array in site.js
const targetStr = 'export const POSTS = [';
const targetIdx = siteContent.indexOf(targetStr);
if (targetIdx === -1) {
  console.error("Could not find export const POSTS in site.js");
  process.exit(1);
}

const sliceBeforePosts = siteContent.slice(0, targetIdx);
const lastClosingBracketIdx = sliceBeforePosts.lastIndexOf('];');
if (lastClosingBracketIdx === -1) {
  console.error("Could not find closing bracket of PRODUCTS array");
  process.exit(1);
}

const newProductsBlock = ',\n\n' + formattedProducts.join(',\n\n') + '\n';
siteContent = siteContent.slice(0, lastClosingBracketIdx) + newProductsBlock + siteContent.slice(lastClosingBracketIdx);

fs.writeFileSync('src/config/site.js', siteContent, 'utf8');
console.log(`Successfully updated src/config/site.js with ${formattedProducts.length} rum products.`);

// 3. Update src/config/brands.js with iconic rum brands if not already present
let brandsContent = fs.readFileSync('src/config/brands.js', 'utf8');

const RUM_BRANDS = [
  {
    slug: 'bundaberg-rum',
    name: 'Bundaberg Rum',
    country: 'Australia',
    region: 'Bundaberg, Queensland',
    founded: '1888',
    category: 'spirits',
    tagline: 'Australia’s Most Iconic Spirit: Handcrafted in Queensland Since 1888',
    description: 'Born in 1888 when a collective of sugar millers in Bundaberg, Queensland, devised a plan to turn surplus cane molasses into premium spirit. Over 135 years later, Bundaberg Rum is an undisputed Australian cultural icon, celebrated for its legendary UP Rum, Small Batch Reserve, Red Gum charcoal filtration, and Master Distillers Solera releases.',
    highlights: [
      'World-famous Australian distillery established in 1888',
      'Distilled from 100% Queensland sugar cane molasses',
      'Matured in hand-coopered American oak vats in Bundaberg'
    ],
    faqs: [
      {
        question: 'What makes Bundaberg Rum unique among world rums?',
        answer: 'Bundaberg Rum is distilled exclusively from sweet Queensland sugarcane molasses and matured in massive 50,000-litre handcrafted American white oak vats, imparting rich, distinctive toffee and wood notes.'
      },
      {
        question: 'What is the best way to enjoy Bundaberg Small Batch Reserve?',
        answer: 'Bundaberg Small Batch Reserve is crafted for neat sipping or serving over a large clear ice sphere to appreciate its complex notes of roasted macadamia, fig, and dark chocolate.'
      }
    ]
  },
  {
    slug: 'beenleigh',
    name: 'Beenleigh Artisan Distillers',
    country: 'Australia',
    region: 'Beenleigh, Queensland',
    founded: '1884',
    category: 'spirits',
    tagline: 'Australia’s Oldest Registered Distillery: Copper Pot Distillation Since 1884',
    description: 'Located on the banks of the Albert River in Queensland, Beenleigh is Australia’s oldest registered operating distillery (est. 1884). Pioneering true copper pot distillation, Beenleigh matures its rums in ex-brandy vats and charred American oak barrels in the warm sub-tropical Queensland climate.',
    highlights: [
      'Australia’s oldest registered distillery (est. 1884)',
      'Traditional sub-tropical copper pot still aging',
      'Acclaimed 5-Year Double Cask and 10-Year Single Barrel releases'
    ],
    faqs: [
      {
        question: 'How old is Beenleigh Distillery in Queensland?',
        answer: 'Beenleigh was officially registered in 1884, making it Australia’s oldest continuously operating registered rum distillery.'
      }
    ]
  },
  {
    slug: 'brix-distillers',
    name: 'Brix Distillers',
    country: 'Australia',
    region: 'Surry Hills, Sydney, NSW',
    founded: '2017',
    category: 'spirits',
    tagline: 'Sydney Urban Craft Rum: Native Botanicals & Australian Wine Cask Aging',
    description: 'Established in 2017 in Surry Hills, Sydney, Brix Distillers was founded to challenge the conventions of rum and revive Australia’s craft rum culture. Distilled in a bespoke Australian copper pot still, Brix crafts pure pot still White, Gold, and Native Botanical Spiced rums using 100% Australian sugarcane molasses.',
    highlights: [
      'Independent urban craft distillery in Surry Hills, Sydney',
      'Infused with native Australian botanicals like lemon myrtle',
      'Aged in Australian ex-red wine and bourbon casks'
    ],
    faqs: [
      {
        question: 'What botanicals are used in Brix Spiced Australian Rum?',
        answer: 'Brix Spiced Rum is infused with native Australian lemon myrtle, cinnamon quills, roasted grapefruit peel, and whole vanilla beans.'
      }
    ]
  },
  {
    slug: 'the-kraken',
    name: 'The Kraken',
    country: 'Trinidad & Tobago',
    region: 'Caribbean',
    founded: '2010',
    category: 'spirits',
    tagline: 'Release the Beast: Caribbean Black Spiced Rum with 11 Secret Spices',
    description: 'Named after the colossal mythical sea monster of maritime folklore. The Kraken Black Spiced Rum is distilled in Trinidad and Tobago from sweet Caribbean molasses and infused with 11 secret warming spices, pouring ink-black with rich notes of vanilla, cinnamon, and espresso.',
    highlights: [
      'World’s #1 selling black spiced Caribbean rum',
      'Iconic Victorian double-handled glass flagon bottle',
      'Infused with 11 exotic spices and dark caramel'
    ],
    faqs: [
      {
        question: 'What is the best mixer for The Kraken Black Spiced Rum?',
        answer: 'The Kraken pairs exceptionally with fiery dry ginger ale or ginger beer with a squeeze of fresh lime (The Perfect Storm), or with premium cola.'
      }
    ]
  },
  {
    slug: 'diplomatico',
    name: 'Diplomático',
    country: 'Venezuela',
    region: 'La Miel, Lara State',
    founded: '1959',
    category: 'spirits',
    tagline: 'World-Acclaimed Venezuelan Sipping Rum: Reserva Exclusiva & Solera Craft',
    description: 'Nestled at the foot of the Andes Mountains in La Miel, Venezuela, Diplomático is globally renowned for crafting some of the finest sipping rums on Earth. Utilizing rich sugar cane honeys and pure mountain spring water, their heavy copper pot still rums are aged up to 12 years in small oak barrels.',
    highlights: [
      'Iconic Reserva Exclusiva aged up to 12 years',
      'Pioneer of sugar cane honey fermentation and pot distillation',
      'DOC Ron de Venezuela protected geographic status'
    ],
    faqs: [
      {
        question: 'Why is Diplomático Reserva Exclusiva considered a benchmark sipping rum?',
        answer: 'It is crafted from 80% heavy copper pot still rums aged up to 12 years, yielding exceptional richness, maple syrup sweetness, and candied orange complexity.'
      }
    ]
  },
  {
    slug: 'ron-zacapa',
    name: 'Ron Zacapa',
    country: 'Guatemala',
    region: 'Quetzaltenango (2,300m)',
    founded: '1976',
    category: 'spirits',
    tagline: 'Aged Above the Clouds: Guatemalan Solera 23 & XO Decanters',
    description: 'Created in 1976 in Guatemala to celebrate the centenary of the city of Zacapa. Matured in the mystical ‘House Above the Clouds’ at 2,300 metres altitude in a Sistema Solera using ex-whiskey, Pedro Ximénez, and fine Cognac casks.',
    highlights: [
      'Aged at 2,300m elevation in the Guatemalan highlands',
      'Distilled exclusively from first-crush virgin sugarcane honey',
      'Each bottle wrapped in handwoven royal Petate palm band'
    ],
    faqs: [
      {
        question: 'What is the significance of aging rum ‘above the clouds’ in Guatemala?',
        answer: 'The cool mountain air at 2,300m slows the aging process, allowing deep oak extraction and preventing excess evaporation for unmatched smoothness.'
      }
    ]
  },
  {
    slug: 'mount-gay',
    name: 'Mount Gay',
    country: 'Barbados',
    region: 'St. Lucy, Barbados',
    founded: '1703',
    category: 'spirits',
    tagline: 'The Rum That Invented Rum: Oldest Commercial Distillery in the World (Est. 1703)',
    description: 'With historical deeds dating back to 1703 in St. Lucy, Barbados, Mount Gay is the oldest continuously operating commercial rum distillery on the planet. Masterfully blending copper pot and column distillates matured in ocean-aired cellars.',
    highlights: [
      'World’s oldest verified rum distillery (est. 1703)',
      'Historic coral-filtered subterranean artesian spring water',
      'Pioneer of Triple Cask and XO pot-still blending'
    ],
    faqs: [
      {
        question: 'What is the oldest rum distillery in the world?',
        answer: 'Mount Gay in Barbados is officially documented as the oldest rum distillery in the world, founded in 1703.'
      }
    ]
  },
  {
    slug: 'appleton-estate',
    name: 'Appleton Estate',
    country: 'Jamaica',
    region: 'Nassau Valley',
    founded: '1749',
    category: 'spirits',
    tagline: 'Jamaica’s Nassau Valley Heritage: True Minimum Age Statements & Copper Pot Funk',
    description: 'Nestled in the lush Nassau Valley of Jamaica since 1749. Led by Master Blender Joy Spence (the spirits industry’s first female Master Blender), Appleton Estate guarantees strict minimum age statements on all aged bottles.',
    highlights: [
      'Over 270 years of Jamaican distilling heritage (est. 1749)',
      'Strict minimum age statements on 12-Year and 21-Year bottles',
      'Iconic copper pot still distillation with limestone spring water'
    ],
    faqs: [
      {
        question: 'Does the age statement on Appleton Estate 12 Year Rum mean minimum age?',
        answer: 'Yes, under Jamaican rum law, every drop of rum in an Appleton Estate age-stated bottle is aged at least the number of years on the label in tropical conditions.'
      }
    ]
  }
];

let brandsAdded = 0;
for (const brand of RUM_BRANDS) {
  if (!brandsContent.includes(`slug: '${brand.slug}'`) && !brandsContent.includes(`slug: "${brand.slug}"`)) {
    const brandCode = `  {
    slug: '${brand.slug}',
    name: '${brand.name.replace(/'/g, "\\'")}',
    country: '${brand.country}',
    region: '${brand.region}',
    founded: '${brand.founded}',
    category: '${brand.category}',
    tagline: '${brand.tagline.replace(/'/g, "\\'")}',
    description: '${brand.description.replace(/'/g, "\\'")}',
    highlights: ${JSON.stringify(brand.highlights)},
    faqs: ${JSON.stringify(brand.faqs, null, 6)}
  },`;

    const lastClosingBracket = brandsContent.lastIndexOf('];');
    if (lastClosingBracket !== -1) {
      brandsContent = brandsContent.slice(0, lastClosingBracket) + brandCode + '\n' + brandsContent.slice(lastClosingBracket);
      brandsAdded++;
    }
  }
}

fs.writeFileSync('src/config/brands.js', brandsContent, 'utf8');
console.log(`Updated src/config/brands.js with ${brandsAdded} new rum brands.`);

// 4. Update src/config/seoPages.js with Rum SEO Landing pages
let seoContent = fs.readFileSync('src/config/seoPages.js', 'utf8');

const RUM_SEO_PAGES = [
  {
    slug: 'australian-rum',
    mainCategory: 'spirits',
    subCategory: 'rum',
    name: 'Australian Rum',
    h1: 'Australian Rum Online: Queensland & Craft Distilleries',
    title: 'Buy Australian Rum Online Australia | Liquor Locker AU',
    metaDescription: 'Shop premium Australian rums online. From iconic Queensland Bundaberg & Beenleigh to urban craft Brix and Husk Agricole, delivered climate-controlled across Australia.',
    intro: 'Australia boasts a rich, century-old rum heritage rooted in the sun-drenched sugarcane fields of Queensland and innovative coastal distilleries. Explore our curated vault of dark vatted rums, small-batch reserves, and pure cane Agricole spirits.',
    buyersGuide: `### The Complete Guide to Australian Rum

Australian rum distilling is intimately tied to the nation's agricultural history, beginning in the late 19th century when Queensland sugarcane mills began fermenting surplus molasses.

#### Key Australian Rum Styles
1. **Queensland Dark Rum**: Traditional molasses-based rums matured in massive American white oak vats (such as Bundaberg and Beenleigh), delivering bold caramel, treacle, and toasted oak warmth.
2. **Urban Craft & Solera Rums**: Contemporary craft distilleries like Brix in Sydney and JimmyRum in Victoria utilizing bespoke copper pot stills and Australian red wine or sherry cask finishes.
3. **Cultivated Pure Cane (Agricole)**: Distilled directly from freshly pressed virgin sugarcane juice in volcanic river valleys (such as Husk Distillers in the Tweed Valley).`,
    faqs: [
      {
        question: 'What is the oldest operating rum distillery in Australia?',
        answer: 'Beenleigh Artisan Distillers in Queensland is Australia’s oldest registered operating distillery, officially established in 1884.'
      },
      {
        question: 'How is Australian rum distilled and aged?',
        answer: 'Most Australian rums are distilled from 100% local sugar cane molasses in copper pot or continuous column stills, and aged in American oak vats or bourbon casks for at least two years.'
      }
    ],
    filterCriteria: {
      category: 'spirits',
      subcategory: 'rum',
      styleKeywords: ['australian', 'bundaberg', 'beenleigh', 'brix', 'husk']
    },
    relatedLinks: [
      { name: 'Spiced Rum', url: '/spirits/rum/spiced-rum/' },
      { name: 'Dark Rum', url: '/spirits/rum/dark-rum/' },
      { name: 'Bundaberg Rum', url: '/brands/bundaberg-rum/' },
      { name: 'All Spirits Vault', url: '/spirits/' }
    ]
  },
  {
    slug: 'spiced-rum',
    mainCategory: 'spirits',
    subCategory: 'rum',
    name: 'Spiced Rum',
    h1: 'Spiced Rum Australia: Caribbean & Australian Craft',
    title: 'Buy Spiced Rum Online Australia | Liquor Locker AU',
    metaDescription: 'Buy premium spiced rum online in Australia. From The Kraken, Sailor Jerry, and Captain Morgan to native botanical Australian spiced rums, delivered to your door.',
    intro: 'Spiced rum combines dark, golden, or overproof rum with aromatic infusions of natural vanilla, cinnamon, nutmeg, citrus peel, and exotic botanicals. Perfect for mixing with fiery dry ginger beer, fresh lime, or classic cola.',
    buyersGuide: `### Discover the World of Spiced Rum

Spiced rum originated in maritime seafaring history, when sailors steeped Caribbean rums in vanilla, ginger, and spices to enhance flavor and preserve barrels at sea.

#### Popular Spiced Profiles
- **Black Spiced**: Inky, rich, and high proof (like The Kraken), featuring heavy vanilla, roasted coffee, and clove.
- **Classic Navy Spiced**: High proof 40% spirit (like Sailor Jerry) with bold cinnamon, nutmeg, and toffee.
- **Native Australian Spiced**: Infused with native lemon myrtle, wattleseed, and citrus zest for a vibrant, botanical twist.`,
    faqs: [
      {
        question: 'What is the best mixer for spiced rum?',
        answer: 'Spiced rum pairs exceptionally with dry ginger ale, fiery ginger beer with fresh lime (a Dark & Stormy style highball), or premium cola.'
      },
      {
        question: 'Is spiced rum sweet?',
        answer: 'Most spiced rums feature sweet aromatic notes of vanilla, caramel, and brown sugar, balanced by warming wood spices like cinnamon and clove.'
      }
    ],
    filterCriteria: {
      category: 'spirits',
      subcategory: 'rum',
      styleKeywords: ['spiced', 'kraken', 'sailor jerry', 'captain morgan']
    },
    relatedLinks: [
      { name: 'Australian Rum', url: '/spirits/rum/australian-rum/' },
      { name: 'Dark Rum', url: '/spirits/rum/dark-rum/' },
      { name: 'The Kraken Rum', url: '/brands/the-kraken/' }
    ]
  },
  {
    slug: 'dark-rum',
    mainCategory: 'spirits',
    subCategory: 'rum',
    name: 'Dark Rum',
    h1: 'Aged Dark Rum & Sipping Rums Australia',
    title: 'Buy Aged Dark Rum Online Australia | Liquor Locker AU',
    metaDescription: 'Shop aged dark rums and prestige sipping rums online in Australia. Venezuelan Diplomático, Guatemalan Zacapa Solera, Jamaican Appleton Estate, and Queensland Bundy.',
    intro: 'Deep, rich, and full-bodied. Aged dark rums spend years in heavily charred oak barrels, bourbon casks, and sherry butts, developing luxurious layers of molasses, dark chocolate, tobacco leaf, and dried fruits.',
    buyersGuide: `### The Art of Aged Sipping Rums

Dark rum gains its deep amber and mahogany color through extended maturation in charred oak barrels and rich sugarcane molasses.

#### World Benchmark Dark Rums
- **Venezuelan & Central American Solera**: Exceptionally smooth, sweet, and complex (Diplomático, Ron Zacapa).
- **Jamaican Pot Still**: Renowned for bold tropical fruit 'funk' (hogo), heavy ester concentration, and minimum age statements (Appleton Estate).
- **Barbados Double Aged**: Refined balance aged in tropical bourbon casks and finished in French Cognac casks (Plantation / Planteray XO).`,
    faqs: [
      {
        question: 'How should I drink premium aged dark rum?',
        answer: 'Serve neat at room temperature in a tulip or glencairn glass, or over a single large ice cube to appreciate the complex aromas and layered finish.'
      },
      {
        question: 'What is the difference between dark rum and gold rum?',
        answer: 'Dark rums are typically aged longer in heavily charred oak barrels or double-casked in sherry/cognac barrels, resulting in a fuller body and darker molasses-driven flavor profile.'
      }
    ],
    filterCriteria: {
      category: 'spirits',
      subcategory: 'rum',
      styleKeywords: ['dark', 'aged', 'reserva', 'solera', 'diplomatico', 'zacapa']
    },
    relatedLinks: [
      { name: 'Australian Rum', url: '/spirits/rum/australian-rum/' },
      { name: 'Spiced Rum', url: '/spirits/rum/spiced-rum/' },
      { name: 'Diplomático Rum', url: '/brands/diplomatico/' }
    ]
  }
];

let seoPagesAdded = 0;
for (const page of RUM_SEO_PAGES) {
  if (!seoContent.includes(`slug: '${page.slug}'`) && !seoContent.includes(`slug: "${page.slug}"`)) {
    const pageCode = `  {
    slug: '${page.slug}',
    mainCategory: '${page.mainCategory}',
    subCategory: '${page.subCategory}',
    name: '${page.name}',
    h1: '${page.h1.replace(/'/g, "\\'")}',
    title: '${page.title.replace(/'/g, "\\'")}',
    metaDescription: '${page.metaDescription.replace(/'/g, "\\'")}',
    intro: '${page.intro.replace(/'/g, "\\'")}',
    buyersGuide: \`${page.buyersGuide.replace(/`/g, "\\`")}\`,
    faqs: ${JSON.stringify(page.faqs, null, 6)},
    filterCriteria: ${JSON.stringify(page.filterCriteria, null, 6)},
    relatedLinks: ${JSON.stringify(page.relatedLinks, null, 6)}
  },`;

    const lastClosingBracket = seoContent.lastIndexOf('];');
    if (lastClosingBracket !== -1) {
      seoContent = seoContent.slice(0, lastClosingBracket) + pageCode + '\n' + seoContent.slice(lastClosingBracket);
      seoPagesAdded++;
    }
  }
}

fs.writeFileSync('src/config/seoPages.js', seoContent, 'utf8');
console.log(`Updated src/config/seoPages.js with ${seoPagesAdded} rum SEO landing pages.`);
console.log("ALL RUM DATA APPLIED SUCCESSFULLY.");
