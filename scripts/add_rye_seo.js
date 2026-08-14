const fs = require('fs');

const seoPageCode = `  , {
    url: '/spirits/whisky-whiskey/rye-whiskey/',
    slug: 'rye-whiskey',
    mainCategory: 'spirits',
    subCategory: 'whisky-whiskey',
    name: 'Rye Whiskey',
    h1: 'Rye Whiskey',
    title: 'Buy Rye Whiskey Online | Straight Rye & Malt Rye | [Store Name]',
    metaDescription: 'Shop our curated collection of Rye Whiskey online. Discover bold, spicy Straight Rye, Canadian Rye, and Rye Malt whiskies from leading global distilleries.',
    intro: 'Explore our comprehensive selection of Rye Whiskey. Known for its signature spicy and robust profile, rye whiskey spans from bold American Straight Rye to smooth Canadian varieties and innovative Rye Malt whiskies.',
    buyersGuide: \`Our Rye Whiskey collection highlights expressions that bring intense, spicy character to the forefront, making them perfect for classic cocktails and neat sipping alike.
    
### Understanding Rye Whiskey Styles
- **Straight Rye Whiskey**: Traditional American rye made from a mash bill of at least 51% rye grain, offering a bold, peppery, and spicy flavor profile.
- **Rye Malt Whisky**: Made from malted rye, which imparts a slightly softer, earthier, and sometimes chocolatey note compared to unmalted rye.
- **Canadian Rye Whisky**: Often smoother and lighter, Canadian whiskies have historically used rye as a flavoring grain, creating a more approachable yet distinctively spicy profile.
- **Bottled in Bond & Cask Strength**: High-proof expressions that deliver unfiltered, intense rye character directly from the barrel.\`,
    faqs: [
      {
        question: 'What is the difference between Rye Whiskey and Bourbon?',
        answer: 'The primary difference is the grain. Rye whiskey must be made from at least 51% rye, giving it a spicy, fruity, and bold flavor. Bourbon must be made from at least 51% corn, which imparts a sweeter, rounder profile.'
      },
      {
        question: 'How should I serve Rye Whiskey?',
        answer: 'Rye whiskey\\'s bold and spicy character makes it the traditional and ideal base for classic cocktails like the Manhattan, Old Fashioned, and Sazerac. Premium ryes are also excellent enjoyed neat or over a single large ice cube.'
      }
    ],
    filterCriteria: {
      category: 'spirits',
      subcategory: 'whisky-whiskey',
      styleKeywords: ['rye whiskey', 'straight rye whiskey', 'rye malt whisky', 'canadian rye whisky', 'rye whisky bottled in bond', 'cask strength rye whisky']
    },
    relatedLinks: [
      { name: 'Bourbon Vault', url: '/spirits/bourbon/' },
      { name: 'Single Malt Whisky', url: '/spirits/whisky-whiskey/single-malt-whisky/' }
    ]
  }`;

const content = fs.readFileSync('src/config/seoPages.js', 'utf8');

const lastBracket = content.lastIndexOf('];');
if (lastBracket !== -1) {
  const newContent = content.slice(0, lastBracket) + seoPageCode + '\\n];\\n';
  fs.writeFileSync('src/config/seoPages.js', newContent, 'utf8');
  console.log("Successfully added Rye Whiskey SEO page!");
} else {
  console.error("Could not find ]; in seoPages.js");
}
