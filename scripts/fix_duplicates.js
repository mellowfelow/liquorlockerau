const fs = require('fs');

const content = fs.readFileSync('src/config/site.js', 'utf8');

// Let's locate export const PRODUCTS = [ ... ];
const prodStartIdx = content.indexOf('export const PRODUCTS = [');
if (prodStartIdx === -1) {
  console.error("Could not find PRODUCTS export");
  process.exit(1);
}

// Let's find where PRODUCTS ends and POSTS or other exports begin
const postsStartIdx = content.indexOf('export const POSTS = [');
if (postsStartIdx === -1) {
  console.error("Could not find POSTS export");
  process.exit(1);
}

const beforeProducts = content.slice(0, prodStartIdx);
const productsSection = content.slice(prodStartIdx, postsStartIdx);
const afterPosts = content.slice(postsStartIdx);

// We can parse or evaluate or extract product objects safely using a regex or by evaluating the array string
// Actually, let's parse objects or deduplicate by extracting each product object literal { ... }
// Or even simpler: we can use vm or regex matching /{\s*slug:\s*"([^"]+)",[\s\S]*?\n\s*}/g

const productRegex = /\{\s*slug:\s*"([^"]+)",[\s\S]*?\n\s*\}/g;
let match;
const seenSlugs = new Set();
let cleanProductsCode = "export const PRODUCTS = [\n";
let duplicateCount = 0;

// To be robust, let's extract all product object strings between export const PRODUCTS = [ and the closing bracket before POSTS
const arrayContent = productsSection.replace('export const PRODUCTS = [', '').trim();

// Instead of fragile regex parsing of multiline objects, let's write a parser or use an array of objects by requiring site.js or safely evaluating it if possible, OR parse block by block.
// Wait, can we require or eval site.js? site.js imports brands.js and seoPages.js.
// Let's write a helper script that reads site.js text, splits into individual product blocks (e.g. starting with "  {\n    slug:"), and deduplicates by slug!

// Let's split productsSection by `  {` or `{\n    slug:`
const parts = productsSection.split(/\n\s*\{\s*\n\s*slug:/);
console.log("Found product blocks:", parts.length);

const uniqueProducts = [];
const slugSet = new Set();

// First part before the first product
const headerPart = parts[0];

for (let i = 1; i < parts.length; i++) {
  const block = "  {slug:" + parts[i];
  // extract slug
  const slugMatch = block.match(/slug:\s*"([^"]+)"/);
  if (slugMatch) {
    const slug = slugMatch[1];
    if (slugSet.has(slug)) {
      duplicateCount++;
      console.log("Removing duplicate slug:", slug);
    } else {
      slugSet.add(slug);
      uniqueProducts.push(block);
    }
  } else {
    uniqueProducts.push(block);
  }
}

console.log(`Removed ${duplicateCount} duplicate products. Remaining unique products: ${uniqueProducts.length}`);

// Reconstruct productsSection
const newProductsSection = headerPart + uniqueProducts.join("");

const newContent = beforeProducts + newProductsSection + "\n\n" + afterPosts;

fs.writeFileSync('src/config/site.js', newContent, 'utf8');
console.log("Successfully rewrote src/config/site.js with deduplicated products!");
