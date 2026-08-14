const fs = require('fs');

const seoPageCode = `  , {
    url: '/spirits/vodka/',
    slug: 'vodka',
    mainCategory: 'spirits',
    subCategory: 'vodka',
    name: 'Vodka',
    h1: 'Vodka',
    title: 'Buy Vodka Online Australia | Premium, Flavoured & Australian Vodka | [Store Name]',
    metaDescription: 'Shop vodka online in Australia, including classic, premium, organic, botanical, flavoured and Australian craft vodka from leading global and local distilleries.',
    intro: 'Shop vodka online in Australia. From classic triple-distilled and winter wheat expressions to premium copper-pot European vodkas and small-batch Australian botanical crafts, explore our extensive vodka catalogue.',
    buyersGuide: \`Our vodka catalogue spans everything from the world's most trusted classic brands to ultra-premium, single-estate and organically certified expressions.
    
### Understanding Vodka Styles
- **Classic**: Quintessential, pure spirits optimized for neutral, smooth cocktail bases.
- **Premium & Super Premium**: Small-batch, single-estate, or unique filtration methods (like copper pot or freeze filtration) offering enhanced texture, mouthfeel, and purity intended for sipping neat or in dry martinis.
- **Flavoured & Botanical**: Infused with natural ingredients—such as fresh fruits, botanicals, and native Australian flora—to create rich, nuanced profiles.

### Core Bases
- **Wheat & Rye**: Traditional European bases generally yielding a crisp, slightly spicy, and robust texture (e.g., Belvedere, Absolut, Grey Goose).
- **Corn**: Naturally gluten-free, often slightly sweeter and rounder on the palate (e.g., Tito's, Smirnoff, Crystal Head Original).
- **Sugarcane & Grape**: Found in ultra-premium and Australian crafts, delivering softer, more delicate mouthfeels (e.g., Cîroc, Husk Distillers).\`,
    faqs: [
      {
        question: 'Is all vodka gluten-free?',
        answer: 'While the distillation process removes gluten proteins, vodkas made from corn, potato, or grapes (like Tito\\'s or Cîroc) are naturally gluten-free from the source, making them popular for those with sensitivities.'
      },
      {
        question: 'What is the best way to serve premium vodka?',
        answer: 'Super-premium vodkas are best enjoyed neat, straight from the freezer, or stirred down in a classic, very dry Vodka Martini to appreciate their texture and purity.'
      }
    ],
    filterCriteria: {
      category: 'spirits',
      subcategory: 'vodka'
    },
    relatedLinks: [
      { name: 'Vodka Premix RTDs', url: '/premix-rtds/vodka-premix/' }
    ]
  }`;

const content = fs.readFileSync('src/config/seoPages.js', 'utf8');

const lastBracket = content.lastIndexOf('];');
if (lastBracket !== -1) {
  const newContent = content.slice(0, lastBracket) + seoPageCode + '\\n];\\n';
  fs.writeFileSync('src/config/seoPages.js', newContent, 'utf8');
  console.log("Successfully added Vodka SEO page!");
} else {
  console.error("Could not find ]; in seoPages.js");
}
