const fs = require('fs');
let code = fs.readFileSync('src/config/seoPages.js', 'utf8');

const targetStr = ", {    url: '/spirits/vodka/'";
const idx = code.lastIndexOf(targetStr);
if (idx !== -1) {
  code = code.slice(0, idx) + '];\n';
  fs.writeFileSync('src/config/seoPages.js', code);
  console.log('Removed broken block using string match');
} else {
  // Let's use regex
  code = code.replace(/,\s*\{\s*url:\s*'\/spirits\/vodka\/'.*\}\];/g, '];\n');
  fs.writeFileSync('src/config/seoPages.js', code);
  console.log('Removed broken block using regex');
}
