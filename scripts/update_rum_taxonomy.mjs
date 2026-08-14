import fs from 'fs';
import { EXACT_RUMS } from './exact_rum_catalog.mjs';

console.log('Starting Rum Taxonomy update...');
console.log(`Input catalog has ${EXACT_RUMS.length} verified rum expressions.`);

// 1. Format the 90 exact rum products for site.js
const formattedRums = EXACT_RUMS.map((r, index) => {
  const slug = r.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const variants = r.variants ? r.variants.map((v, i) => ({
    id: `${slug}-${v.size.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-bottle`,
    sku: `SPIRIT-RUM-${String(index + 1).padStart(3, '0')}-${v.size.toUpperCase()}`,
    unitSize: v.size,
    container: r.containerType || 'Bottle',
    packSize: `${v.size} ${r.containerType || 'Bottle'}`,
    price: v.price,
    stockLevel: 25 - i * 5,
    weight: v.size === '1L' ? '1.9kg' : '1.4kg',
    barcode: `931099308${String(index + 1).padStart(3, '0')}${i + 1}`,
    availability: 'https://schema.org/InStock',
    image: r.image
  })) : [
    {
      id: `${slug}-700ml-bottle`,
      sku: `SPIRIT-RUM-${String(index + 1).padStart(3, '0')}-700ML`,
      unitSize: r.size || '700ml',
      container: r.containerType || 'Bottle',
      packSize: `${r.size || '700ml'} ${r.containerType || 'Bottle'}`,
      price: r.price,
      stockLevel: 28,
      weight: '1.4kg',
      barcode: `931099308${String(index + 1).padStart(3, '0')}1`,
      availability: 'https://schema.org/InStock',
      image: r.image
    }
  ];

  const searchKeywords = `${r.name} ${r.brand} ${r.rumStyle} rum ${r.country} ${r.abv} 700ml ${(r.flavourProfile || []).join(' ')}`.toLowerCase();

  return {
    slug,
    name: r.name,
    price: r.price,
    primaryCategory: 'spirits',
    category: 'spirits',
    primarySubcategory: 'rum',
    subcategory: 'rum',
    brand: r.brand,
    countryOfOrigin: r.country,
    regionOrState: r.region || r.state || r.country,
    abv: r.abv,
    containerType: r.containerType || 'Bottle',
    bottleOrCanSize: r.size || '700ml',
    packSize: `${r.size || '700ml'} ${r.containerType || 'Bottle'}`,
    primaryProductType: 'Rum',
    rumStyle: r.rumStyle,
    styleOrVariety: `${r.rumStyle} Rum`,
    flavourProfile: r.flavourProfile || [],
    dietary: r.country === 'Australia' ? ['Australian Made', 'Spirits', 'Rum'] : ['Imported Spirit', 'Rum'],
    ageStatement: r.ageStatement || '',
    vintage: r.vintage || '',
    caskMaturation: r.caskMaturation || '',
    controlledTags: ['Spirits', 'Rum', r.brand, r.country, r.rumStyle, r.ageStatement || 'NAS'].filter(Boolean),
    collections: [
      'spirits',
      'rum',
      `${r.rumStyle.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-rum`,
      r.country === 'Australia' ? 'australian-rum' : 'caribbean-rum'
    ].filter(Boolean),
    seoUrl: `/spirits/rum/${slug}`,
    description: r.desc,
    shortDescription: r.shortDesc,
    searchKeywords,
    badge: r.badge || (r.featured ? 'Staff Pick' : ''),
    featured: r.featured || false,
    images: [r.image],
    image: r.image,
    variants
  };
});

// 2. Read src/config/site.js
const siteJsPath = 'src/config/site.js';
const siteJsContent = fs.readFileSync(siteJsPath, 'utf8');

// Parse products dynamically from site.js
import('../src/config/site.js').then(siteModule => {
  const existingProducts = siteModule.PRODUCTS || [];
  console.log(`Existing products before filter: ${existingProducts.length}`);

  // Remove anything that's categorized as rum or has category rum
  const nonRumProducts = existingProducts.filter(p => p.primarySubcategory !== 'rum' && p.category !== 'rum');
  console.log(`Preserved non-rum products: ${nonRumProducts.length}`);

  // Merge preserved non-rums with the new 90 exact rums
  const updatedProducts = [...nonRumProducts, ...formattedRums];
  console.log(`New total products: ${updatedProducts.length}`);

  // Now replace PRODUCTS array in site.js
  const pStart = siteJsContent.indexOf('export const PRODUCTS = [');
  if (pStart === -1) {
    throw new Error('Could not find export const PRODUCTS in src/config/site.js');
  }

  const postsStart = siteJsContent.indexOf('export const POSTS = [');
  if (postsStart === -1) {
    throw new Error('Could not find export const POSTS in src/config/site.js');
  }

  const headerPart = siteJsContent.substring(0, pStart);
  const footerPart = siteJsContent.substring(postsStart);

  const formattedProductsString = 'export const PRODUCTS = ' + JSON.stringify(updatedProducts, null, 2) + ';\n\n';

  const newSiteContent = headerPart + formattedProductsString + footerPart;
  fs.writeFileSync(siteJsPath, newSiteContent, 'utf8');
  console.log('Successfully updated src/config/site.js with 90 exact rum expressions.');
});
