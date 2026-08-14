import fs from 'fs';

const scotchesData = [
  {
    id: 1,
    name: 'Johnnie Walker Red Label Blended Scotch Whisky',
    brand: 'Johnnie Walker',
    whiskyType: 'Blended Scotch',
    region: 'Scotland',
    ageStatement: 'NAS',
    abv: '40.0%',
    peatSmoke: 'Subtle Smoke',
    caskFinish: 'Oak Cask',
    description: 'Johnnie Walker Red Label is the world’s best-selling Blended Scotch Whisky. Bursting with vibrant, fresh spice, vanilla, and a smoky finish.',
    badge: 'World No. 1 Scotch',
    variants: [
      { size: '700ml', format: 'Bottle', packSize: '700ml Bottle', price: 49.99, weight: '1.4kg' },
      { size: '1L', format: 'Bottle', packSize: '1L Bottle', price: 64.99, weight: '1.9kg' }
    ]
  },
  {
    id: 2,
    name: 'Johnnie Walker Black Label 12 Year Old Blended Scotch Whisky',
    brand: 'Johnnie Walker',
    whiskyType: 'Blended Scotch',
    region: 'Scotland',
    ageStatement: '12 Year Old',
    abv: '40.0%',
    peatSmoke: 'Medium Smoke',
    caskFinish: 'Aged Oak',
    description: 'Johnnie Walker Black Label is an icon created using whiskies aged for a minimum of 12 years. Rich, smooth, and balanced with dark fruit, sweet vanilla, and signature peat smoke.',
    badge: '12 Year Icon',
    variants: [
      { size: '700ml', format: 'Bottle', packSize: '700ml Bottle', price: 64.99, weight: '1.4kg' },
      { size: '700ml', format: 'Gift Box', packSize: '700ml Gift Box', price: 69.99, weight: '1.6kg' },
      { size: '1L', format: 'Bottle', packSize: '1L Bottle', price: 84.99, weight: '1.9kg' }
    ]
  },
  {
    id: 3,
    name: 'Johnnie Walker Double Black Blended Scotch Whisky',
    brand: 'Johnnie Walker',
    whiskyType: 'Blended Scotch',
    region: 'Scotland',
    ageStatement: 'NAS',
    abv: '40.0%',
    peatSmoke: 'Peated & Smoky',
    caskFinish: 'Deep Charred Oak',
    description: 'Johnnie Walker Double Black is inspired by the iconic Black Label, crafted with heavily peated West Coast and Islay malts matured in deeply charred oak casks.',
    badge: 'Double Charred Smoke',
    variants: [
      { size: '700ml', format: 'Bottle', packSize: '700ml Bottle', price: 74.99, weight: '1.4kg' }
    ]
  },
  {
    id: 4,
    name: 'Johnnie Walker Green Label 15 Year Old Blended Malt Scotch Whisky',
    brand: 'Johnnie Walker',
    whiskyType: 'Blended Malt',
    region: 'Scotland',
    ageStatement: '15 Year Old',
    abv: '43.0%',
    peatSmoke: 'Light Smoke',
    caskFinish: 'American & European Oak',
    description: 'Crafted entirely from single malts aged at least 15 years, including Talisker, Linkwood, Cragganmore, and Caol Ila. Offers crisp garden fruit, subtle sea spray, and cedar warmth.',
    badge: 'Pure Malt 15 Year',
    variants: [
      { size: '700ml', format: 'Bottle', packSize: '700ml Bottle', price: 99.99, weight: '1.5kg' }
    ]
  },
  {
    id: 5,
    name: 'Johnnie Walker Gold Label Reserve Blended Scotch Whisky',
    brand: 'Johnnie Walker',
    whiskyType: 'Blended Scotch',
    region: 'Scotland',
    ageStatement: 'Reserve',
    abv: '40.0%',
    peatSmoke: 'Unpeated / Smooth',
    caskFinish: 'Clynelish Gold Oak',
    description: 'A luxurious blend centering on single malt from Clynelish. Creamy honey, delicate vanilla, ripe peach, and a silky smooth finish.',
    badge: 'Gold Reserve',
    variants: [
      { size: '700ml', format: 'Bottle', packSize: '700ml Bottle', price: 99.99, weight: '1.5kg' },
      { size: '700ml', format: 'Gift Box', packSize: '700ml Gift Box', price: 104.99, weight: '1.7kg' }
    ]
  },
  {
    id: 6,
    name: 'Johnnie Walker Blue Label Blended Scotch Whisky',
    brand: 'Johnnie Walker',
    whiskyType: 'Blended Scotch',
    region: 'Scotland',
    ageStatement: 'Rare Reserve',
    abv: '40.0%',
    peatSmoke: 'Subtle Smoke',
    caskFinish: 'Rare Cask Selection',
    description: 'The pinnacle of blending excellence where only 1 in 10,000 casks meets the standard. Layers of honeyed fruit, dark chocolate, hazelnut, and wisps of velvet smoke.',
    badge: 'Prestige Gift Box',
    variants: [
      { size: '700ml', format: 'Gift Box', packSize: '700ml Gift Box', price: 299.99, weight: '2.2kg' }
    ]
  },
  {
    id: 7,
    name: 'Chivas Regal 12 Year Old Blended Scotch Whisky',
    brand: 'Chivas Regal',
    whiskyType: 'Blended Scotch',
    region: 'Speyside',
    ageStatement: '12 Year Old',
    abv: '40.0%',
    peatSmoke: 'Unpeated',
    caskFinish: 'Traditional Oak',
    description: 'Chivas Regal 12 is a classic Speyside-centered blend of malt and grain whiskies. Honey, ripe apples, vanilla, and butterscotch smoothness.',
    badge: 'Speyside Blend 12 Year',
    variants: [
      { size: '700ml', format: 'Bottle', packSize: '700ml Bottle', price: 59.99, weight: '1.4kg' },
      { size: '700ml', format: 'Gift Box', packSize: '700ml Gift Box', price: 64.99, weight: '1.6kg' },
      { size: '1L', format: 'Bottle', packSize: '1L Bottle', price: 79.99, weight: '1.9kg' }
    ]
  },
  {
    id: 8,
    name: 'Chivas Regal 18 Year Old Blended Scotch Whisky',
    brand: 'Chivas Regal',
    whiskyType: 'Blended Scotch',
    region: 'Speyside',
    ageStatement: '18 Year Old',
    abv: '40.0%',
    peatSmoke: 'Unpeated',
    caskFinish: 'Aged Oak Cask',
    description: 'Created by Master Blender Colin Scott with 85 distinct flavour notes. Rich, velvety dark chocolate, dried fruit, and warm sweet oak in an opulent presentation box.',
    badge: '18 Year Gold Signature',
    variants: [
      { size: '700ml', format: 'Gift Box', packSize: '700ml Gift Box', price: 139.99, weight: '1.7kg' }
    ]
  },
  {
    id: 9,
    name: "Ballantine's Finest Blended Scotch Whisky",
    brand: "Ballantine's",
    whiskyType: 'Blended Scotch',
    region: 'Scotland',
    ageStatement: 'NAS',
    abv: '40.0%',
    peatSmoke: 'Unpeated',
    caskFinish: 'Refill Oak Cask',
    description: "Ballantine's Finest is a subtle, sweet, and balanced Scotch whisky crafted from over 40 malt and grain whiskies. Milk chocolate, red apple, and vanilla notes.",
    badge: 'Classic Finest',
    variants: [
      { size: '700ml', format: 'Bottle', packSize: '700ml Bottle', price: 44.99, weight: '1.4kg' },
      { size: '1L', format: 'Bottle', packSize: '1L Bottle', price: 59.99, weight: '1.9kg' }
    ]
  },
  {
    id: 10,
    name: 'Monkey Shoulder Blended Malt Scotch Whisky',
    brand: 'Monkey Shoulder',
    whiskyType: 'Blended Malt',
    region: 'Speyside',
    ageStatement: 'NAS',
    abv: '40.0%',
    peatSmoke: 'Unpeated',
    caskFinish: 'Bourbon Cask',
    description: 'A 100% malt Scotch whisky blended in small batches from three top Speyside single malts. Rich vanilla, zesty orange, honey, and spiced oak ideal for mixing or sipping.',
    badge: 'Triple Malt Speyside',
    variants: [
      { size: '700ml', format: 'Bottle', packSize: '700ml Bottle', price: 69.99, weight: '1.4kg' }
    ]
  },
  {
    id: 11,
    name: 'The Famous Grouse Blended Scotch Whisky',
    brand: 'The Famous Grouse',
    whiskyType: 'Blended Scotch',
    region: 'Scotland',
    ageStatement: 'NAS',
    abv: '40.0%',
    peatSmoke: 'Unpeated',
    caskFinish: 'Seasoned Oak',
    description: "Scotland's favourite whisky for over 40 years. Blends fine single malts like Highland Park and The Macallan with sweet grain whiskies. Crisp apple, dried fruit, and oak.",
    badge: "Scotland's Favorite",
    variants: [
      { size: '700ml', format: 'Bottle', packSize: '700ml Bottle', price: 44.99, weight: '1.4kg' },
      { size: '1L', format: 'Bottle', packSize: '1L Bottle', price: 59.99, weight: '1.9kg' }
    ]
  },
  {
    id: 12,
    name: "Dewar's White Label Blended Scotch Whisky",
    brand: "Dewar's",
    whiskyType: 'Blended Scotch',
    region: 'Highland',
    ageStatement: 'NAS',
    abv: '40.0%',
    peatSmoke: 'Unpeated',
    caskFinish: 'Oak Cask Double Aged',
    description: "Dewar's White Label features up to 40 single malt and grain whiskies double aged for extra smoothness. Citrus, heather honey, vanilla, and pear aromas.",
    badge: 'Double Aged Smoothness',
    variants: [
      { size: '700ml', format: 'Bottle', packSize: '700ml Bottle', price: 44.99, weight: '1.4kg' },
      { size: '1L', format: 'Bottle', packSize: '1L Bottle', price: 59.99, weight: '1.9kg' }
    ]
  },
  {
    id: 13,
    name: 'Glenfiddich 12 Year Old Single Malt Scotch Whisky',
    brand: 'Glenfiddich',
    whiskyType: 'Single Malt',
    region: 'Speyside',
    ageStatement: '12 Year Old',
    abv: '40.0%',
    peatSmoke: 'Unpeated',
    caskFinish: 'American Bourbon & Oloroso Sherry Cask',
    description: 'The world’s most awarded single malt Scotch whisky. Flowery pear, subtle oak, and a long smooth, mellow finish aged 12 years in European sherry and American oak casks.',
    badge: '12 Year Signature',
    variants: [
      { size: '700ml', format: 'Bottle', packSize: '700ml Bottle', price: 79.99, weight: '1.4kg' },
      { size: '700ml', format: 'Gift Box', packSize: '700ml Gift Box', price: 84.99, weight: '1.6kg' },
      { size: '1L', format: 'Bottle', packSize: '1L Bottle', price: 104.99, weight: '1.9kg' }
    ]
  },
  {
    id: 14,
    name: 'Glenfiddich 15 Year Old Solera Single Malt Scotch Whisky',
    brand: 'Glenfiddich',
    whiskyType: 'Single Malt',
    region: 'Speyside',
    ageStatement: '15 Year Old',
    abv: '40.0%',
    peatSmoke: 'Unpeated',
    caskFinish: 'Solera Vat (Sherry, Bourbon & New Oak)',
    description: 'Matured in sherry, bourbon, and new oak casks before married in a unique Solera Vat inspired by Spanish bodega vats. Intriguing honey, cinnamon, marzipan, and dark fruit.',
    badge: 'Solera Vat 15 Year',
    variants: [
      { size: '700ml', format: 'Gift Box', packSize: '700ml Gift Box', price: 119.99, weight: '1.6kg' }
    ]
  },
  {
    id: 15,
    name: 'Glenfiddich 18 Year Old Single Malt Scotch Whisky',
    brand: 'Glenfiddich',
    whiskyType: 'Single Malt',
    region: 'Speyside',
    ageStatement: '18 Year Old',
    abv: '40.0%',
    peatSmoke: 'Unpeated',
    caskFinish: 'Oloroso Sherry & Bourbon Oak',
    description: 'Small-batch 18 year old single malt aged in Spanish Oloroso wood and American oak. Dried fruit, baked apple, dates, elegant oak spice, and incredible depth.',
    badge: '18 Year Small Batch',
    variants: [
      { size: '700ml', format: 'Gift Box', packSize: '700ml Gift Box', price: 169.99, weight: '1.7kg' }
    ]
  },
  {
    id: 16,
    name: 'The Glenlivet 12 Year Old Single Malt Scotch Whisky',
    brand: 'The Glenlivet',
    whiskyType: 'Single Malt',
    region: 'Speyside',
    ageStatement: '12 Year Old',
    abv: '40.0%',
    peatSmoke: 'Unpeated',
    caskFinish: 'European & American Oak',
    description: 'The single malt that started it all in Livet Valley. Smooth, fruity, and complex with aromas of pineapple, summer meadow, and delicate vanilla oak.',
    badge: 'The Original Speyside',
    variants: [
      { size: '700ml', format: 'Bottle', packSize: '700ml Bottle', price: 79.99, weight: '1.4kg' },
      { size: '700ml', format: 'Gift Box', packSize: '700ml Gift Box', price: 84.99, weight: '1.6kg' }
    ]
  },
  {
    id: 17,
    name: 'The Glenlivet 15 Year Old French Oak Reserve Single Malt Scotch Whisky',
    brand: 'The Glenlivet',
    whiskyType: 'Single Malt',
    region: 'Speyside',
    ageStatement: '15 Year Old',
    abv: '40.0%',
    peatSmoke: 'Unpeated',
    caskFinish: 'Limousin French Oak Finish',
    description: 'Selectively matured in French Limousin oak casks used for Cognac. Spicy, rich, and creamy with almond, buttery toast, and warm cinnamon spice.',
    badge: 'French Oak Reserve',
    variants: [
      { size: '700ml', format: 'Gift Box', packSize: '700ml Gift Box', price: 129.99, weight: '1.6kg' }
    ]
  },
  {
    id: 18,
    name: 'The Glenlivet 18 Year Old Single Malt Scotch Whisky',
    brand: 'The Glenlivet',
    whiskyType: 'Single Malt',
    region: 'Speyside',
    ageStatement: '18 Year Old',
    abv: '43.0%',
    peatSmoke: 'Unpeated',
    caskFinish: 'First & Second Fill American & Sherry Oak',
    description: 'Winner of two gold medals at San Francisco World Spirits Competition. Rich ripe raisin, fudge, bitter orange, and elegant spice.',
    badge: '18 Year Gold Medal',
    variants: [
      { size: '700ml', format: 'Gift Box', packSize: '700ml Gift Box', price: 199.99, weight: '1.7kg' }
    ]
  },
  {
    id: 19,
    name: 'Glenmorangie The Original 10 Year Old Single Malt Scotch Whisky',
    brand: 'Glenmorangie',
    whiskyType: 'Single Malt',
    region: 'Highland',
    ageStatement: '10 Year Old',
    abv: '40.0%',
    peatSmoke: 'Unpeated',
    caskFinish: 'First & Second Fill Bourbon Cask',
    description: 'Distilled in Scotland’s tallest stills and matured 10 years in ex-bourbon casks. Luscious peach, citrus, vanilla creme, and floral elegance.',
    badge: 'Highland 10 Year',
    variants: [
      { size: '700ml', format: 'Bottle', packSize: '700ml Bottle', price: 74.99, weight: '1.4kg' },
      { size: '700ml', format: 'Gift Box', packSize: '700ml Gift Box', price: 79.99, weight: '1.6kg' }
    ]
  },
  {
    id: 20,
    name: 'Glenmorangie Lasanta 12 Year Old Single Malt Scotch Whisky',
    brand: 'Glenmorangie',
    whiskyType: 'Single Malt',
    region: 'Highland',
    ageStatement: '12 Year Old',
    abv: '43.0%',
    peatSmoke: 'Unpeated',
    caskFinish: 'Oloroso & Pedro Ximénez Sherry Finish',
    description: 'Finished 2 years in Spanish Oloroso and PX sherry butts. Warm spicy notes of raisin, dark chocolate, hazelnut, honey, and spiced orange.',
    badge: 'Sherry Cask Finish',
    variants: [
      { size: '700ml', format: 'Gift Box', packSize: '700ml Gift Box', price: 99.99, weight: '1.6kg' }
    ]
  },
  {
    id: 21,
    name: 'Glenmorangie Quinta Ruban 14 Year Old Single Malt Scotch Whisky',
    brand: 'Glenmorangie',
    whiskyType: 'Single Malt',
    region: 'Highland',
    ageStatement: '14 Year Old',
    abv: '46.0%',
    peatSmoke: 'Unpeated',
    caskFinish: 'Ruby Port Cask Finish',
    description: 'Matured 10 years in bourbon casks then finished in Ruby Port pipes from Portugal. Dark mint chocolate, velvet mandarin, walnut, and spicy berry sweetness.',
    badge: '14 Year Ruby Port Finish',
    variants: [
      { size: '700ml', format: 'Gift Box', packSize: '700ml Gift Box', price: 109.99, weight: '1.6kg' }
    ]
  },
  {
    id: 22,
    name: 'The Macallan Double Cask 12 Year Old Single Malt Scotch Whisky',
    brand: 'The Macallan',
    whiskyType: 'Single Malt',
    region: 'Speyside',
    ageStatement: '12 Year Old',
    abv: '40.0%',
    peatSmoke: 'Unpeated',
    caskFinish: 'American & European Sherry Oak',
    description: 'Harmonising sherry-seasoned American and European oak. Creamy butterscotch, candied orange, vanilla custard, and warm oak spices.',
    badge: 'Double Cask 12 Year',
    variants: [
      { size: '700ml', format: 'Bottle', packSize: '700ml Bottle', price: 139.99, weight: '1.4kg' },
      { size: '700ml', format: 'Gift Box', packSize: '700ml Gift Box', price: 149.99, weight: '1.6kg' }
    ]
  },
  {
    id: 23,
    name: 'The Macallan Sherry Oak 12 Year Old Single Malt Scotch Whisky',
    brand: 'The Macallan',
    whiskyType: 'Single Malt',
    region: 'Speyside',
    ageStatement: '12 Year Old',
    abv: '40.0%',
    peatSmoke: 'Unpeated',
    caskFinish: '100% Sherry Seasoned Oak',
    description: 'Exclusively aged in hand-picked sherry seasoned oak casks from Jerez. Rich dried fruit, spice, ginger, wood smoke, and natural mahogany colour.',
    badge: '100% Sherry Oak',
    variants: [
      { size: '700ml', format: 'Gift Box', packSize: '700ml Gift Box', price: 169.99, weight: '1.6kg' }
    ]
  },
  {
    id: 24,
    name: 'The Macallan Double Cask 15 Year Old Single Malt Scotch Whisky',
    brand: 'The Macallan',
    whiskyType: 'Single Malt',
    region: 'Speyside',
    ageStatement: '15 Year Old',
    abv: '43.0%',
    peatSmoke: 'Unpeated',
    caskFinish: '15 Year Sherry Seasoned American & European Oak',
    description: 'Aged 15 years in balanced American and European sherry seasoned casks. Golden butterscotch, dried fruit, dark chocolate, and smooth warm finish.',
    badge: 'Double Cask 15 Year',
    variants: [
      { size: '700ml', format: 'Gift Box', packSize: '700ml Gift Box', price: 249.99, weight: '1.7kg' }
    ]
  },
  {
    id: 25,
    name: 'The Balvenie DoubleWood 12 Year Old Single Malt Scotch Whisky',
    brand: 'The Balvenie',
    whiskyType: 'Single Malt',
    region: 'Speyside',
    ageStatement: '12 Year Old',
    abv: '40.0%',
    peatSmoke: 'Unpeated',
    caskFinish: 'Ex-Bourbon & Spanish Oloroso Sherry',
    description: 'Matured 12 years in traditional whisky oak then transferred to Spanish Oloroso sherry casks. Sweet fruit, honey, cinnamon, and sherry oak depth.',
    badge: 'DoubleWood 12 Year',
    variants: [
      { size: '700ml', format: 'Bottle', packSize: '700ml Bottle', price: 109.99, weight: '1.4kg' },
      { size: '700ml', format: 'Gift Box', packSize: '700ml Gift Box', price: 114.99, weight: '1.6kg' }
    ]
  },
  {
    id: 26,
    name: 'The Balvenie Caribbean Cask 14 Year Old Single Malt Scotch Whisky',
    brand: 'The Balvenie',
    whiskyType: 'Single Malt',
    region: 'Speyside',
    ageStatement: '14 Year Old',
    abv: '43.0%',
    peatSmoke: 'Unpeated',
    caskFinish: 'Finished in West Indian Rum Casks',
    description: 'Matured 14 years in traditional oak then finished in casks that previously held West Indian rum. Sweet tropical fruit, passionfruit, toffee, and warm vanilla.',
    badge: '14 Year Rum Cask',
    variants: [
      { size: '700ml', format: 'Gift Box', packSize: '700ml Gift Box', price: 149.99, weight: '1.6kg' }
    ]
  },
  {
    id: 27,
    name: 'Dalmore 12 Year Old Single Malt Scotch Whisky',
    brand: 'Dalmore',
    whiskyType: 'Single Malt',
    region: 'Highland',
    ageStatement: '12 Year Old',
    abv: '40.0%',
    peatSmoke: 'Unpeated',
    caskFinish: 'American White Oak & 30 Year Old Matusalem Sherry Cask',
    description: 'Matured 9 years in ex-bourbon white oak then half finished in 30-year-old Matusalem Oloroso sherry casks. Citrus, chocolate, aromatic spice, and rich coffee.',
    badge: 'Highland Icon 12 Year',
    variants: [
      { size: '700ml', format: 'Bottle', packSize: '700ml Bottle', price: 109.99, weight: '1.4kg' },
      { size: '700ml', format: 'Gift Box', packSize: '700ml Gift Box', price: 114.99, weight: '1.6kg' }
    ]
  },
  {
    id: 28,
    name: 'Aberlour 12 Year Old Double Cask Matured Single Malt Scotch Whisky',
    brand: 'Aberlour',
    whiskyType: 'Single Malt',
    region: 'Speyside',
    ageStatement: '12 Year Old',
    abv: '40.0%',
    peatSmoke: 'Unpeated',
    caskFinish: 'Sherry Cask & Bourbon Oak Double Matured',
    description: 'Double matured in traditional oak and sherry casks. Rich fruit cake, apple, ginger spice, and chocolate raisins with a warm lingering finish.',
    badge: 'Speyside Double Cask',
    variants: [
      { size: '700ml', format: 'Bottle', packSize: '700ml Bottle', price: 89.99, weight: '1.4kg' }
    ]
  },
  {
    id: 29,
    name: 'GlenDronach 12 Year Old Original Single Malt Scotch Whisky',
    brand: 'GlenDronach',
    whiskyType: 'Single Malt',
    region: 'Highland',
    ageStatement: '12 Year Old',
    abv: '43.0%',
    peatSmoke: 'Unpeated',
    caskFinish: 'Pedro Ximénez & Oloroso Sherry Casks',
    description: 'Matured in fine Pedro Ximénez and Oloroso sherry casks from Andalucía. Sweet sherry fruit, dark plums, raisins, ginger, and spiced creamy oak.',
    badge: 'Sherry Cask Highland',
    variants: [
      { size: '700ml', format: 'Bottle', packSize: '700ml Bottle', price: 99.99, weight: '1.4kg' }
    ]
  },
  {
    id: 30,
    name: 'Highland Park 12 Year Old Viking Honour Single Malt Scotch Whisky',
    brand: 'Highland Park',
    whiskyType: 'Single Malt',
    region: 'Island',
    ageStatement: '12 Year Old',
    abv: '40.0%',
    peatSmoke: 'Balanced Peat & Heather Smoke',
    caskFinish: 'Sherry Seasoned European Oak',
    description: 'Distilled on the Orkney Islands. Heather honey, light peat smoke, fruitcake, and warm spice reflecting Viking heritage.',
    badge: 'Orkney Island Peat',
    variants: [
      { size: '700ml', format: 'Bottle', packSize: '700ml Bottle', price: 89.99, weight: '1.4kg' }
    ]
  },
  {
    id: 31,
    name: 'Talisker 10 Year Old Single Malt Scotch Whisky',
    brand: 'Talisker',
    whiskyType: 'Single Malt',
    region: 'Island',
    ageStatement: '10 Year Old',
    abv: '45.8%',
    peatSmoke: 'Peated & Maritime Smoke',
    caskFinish: 'American Oak Cask',
    description: 'Distilled beside the sea on the Isle of Skye. Famous for sea-salt maritime smoke, black pepper spice, barley sweetness, and a warming peated finish.',
    badge: 'Isle of Skye Maritime Peat',
    variants: [
      { size: '700ml', format: 'Bottle', packSize: '700ml Bottle', price: 99.99, weight: '1.4kg' }
    ]
  },
  {
    id: 32,
    name: 'Oban 14 Year Old Single Malt Scotch Whisky',
    brand: 'Oban',
    whiskyType: 'Single Malt',
    region: 'Highland',
    ageStatement: '14 Year Old',
    abv: '43.0%',
    peatSmoke: 'Light Coastal Peat',
    caskFinish: 'Oak Cask Matured',
    description: 'Crafted at one of Scotland’s oldest and smallest distilleries. Coastal sea salt, sweet orange, autumn fruit, honeycomb, and gentle peat smoke.',
    badge: 'Highland Coastal Classic',
    variants: [
      { size: '700ml', format: 'Bottle', packSize: '700ml Bottle', price: 149.99, weight: '1.4kg' }
    ]
  },
  {
    id: 33,
    name: 'Lagavulin 16 Year Old Single Malt Scotch Whisky',
    brand: 'Lagavulin',
    whiskyType: 'Single Malt',
    region: 'Islay',
    ageStatement: '16 Year Old',
    abv: '43.0%',
    peatSmoke: 'Heavy Islay Peat',
    caskFinish: 'Recharged Oak Cask',
    description: 'The definitive Islay single malt. Deep peat smoke, iodine, sweet dried fruit, sea salt, and a long majestic peaty finish aged 16 years.',
    badge: '16 Year Islay Icon',
    variants: [
      { size: '700ml', format: 'Bottle', packSize: '700ml Bottle', price: 179.99, weight: '1.5kg' }
    ]
  },
  {
    id: 34,
    name: 'Laphroaig 10 Year Old Single Malt Scotch Whisky',
    brand: 'Laphroaig',
    whiskyType: 'Single Malt',
    region: 'Islay',
    ageStatement: '10 Year Old',
    abv: '40.0%',
    peatSmoke: 'Medicinal Islay Peat',
    caskFinish: 'Ex-Bourbon Oak Cask',
    description: 'Distilled using floor-malted barley dried over Islay peat. Bold medicinal peat smoke, sea salt, iodine, and surprising barley sweetness.',
    badge: 'Classic Islay Peat',
    variants: [
      { size: '700ml', format: 'Bottle', packSize: '700ml Bottle', price: 99.99, weight: '1.4kg' }
    ]
  },
  {
    id: 35,
    name: 'Ardbeg 10 Year Old Single Malt Scotch Whisky',
    brand: 'Ardbeg',
    whiskyType: 'Single Malt',
    region: 'Islay',
    ageStatement: '10 Year Old',
    abv: '46.0%',
    peatSmoke: 'Intense Smoky Peat',
    caskFinish: 'Non Chill-Filtered Bourbon Oak',
    description: 'Revered as the most complex Islay malt. Intense smoky peat, zesty lemon, dark chocolate, black pepper, and espresso coffee non chill-filtered at 46% ABV.',
    badge: 'Intense Islay 10 Year',
    variants: [
      { size: '700ml', format: 'Bottle', packSize: '700ml Bottle', price: 109.99, weight: '1.4kg' }
    ]
  },
  {
    id: 36,
    name: 'Ardbeg Uigeadail Single Malt Scotch Whisky',
    brand: 'Ardbeg',
    whiskyType: 'Single Malt',
    region: 'Islay',
    ageStatement: 'NAS',
    abv: '54.2%',
    peatSmoke: 'High Peat & Cask Strength',
    caskFinish: 'Sherry Cask Finish',
    description: 'Named after the loch that supplies Ardbeg’s water. Bottled at cask strength (54.2% ABV) marrying peated malt with rich sherry cask sweetness. Christmas cake, dark treacle, and peat smoke.',
    badge: '54.2% Cask Strength',
    variants: [
      { size: '700ml', format: 'Bottle', packSize: '700ml Bottle', price: 149.99, weight: '1.5kg' }
    ]
  },
  {
    id: 37,
    name: 'Bowmore 12 Year Old Single Malt Scotch Whisky',
    brand: 'Bowmore',
    whiskyType: 'Single Malt',
    region: 'Islay',
    ageStatement: '12 Year Old',
    abv: '40.0%',
    peatSmoke: 'Balanced Islay Smoke',
    caskFinish: 'Ex-Bourbon & Sherry Wood',
    description: 'From Islay’s oldest distillery established in 1779. Gentle peat smoke, dark chocolate, tropical fruit, and honey sweetness.',
    badge: 'Islay 12 Year Classic',
    variants: [
      { size: '700ml', format: 'Bottle', packSize: '700ml Bottle', price: 89.99, weight: '1.4kg' }
    ]
  },
  {
    id: 38,
    name: 'Caol Ila 12 Year Old Single Malt Scotch Whisky',
    brand: 'Caol Ila',
    whiskyType: 'Single Malt',
    region: 'Islay',
    ageStatement: '12 Year Old',
    abv: '43.0%',
    peatSmoke: 'Clean Islay Peat',
    caskFinish: 'American Oak Refill Cask',
    description: 'Fresh citrus, clean maritime smoke, almond oil, and dark peat. Crisp, elegant, and perfectly balanced Islay single malt.',
    badge: '12 Year Maritime Islay',
    variants: [
      { size: '700ml', format: 'Bottle', packSize: '700ml Bottle', price: 129.99, weight: '1.4kg' }
    ]
  },
  {
    id: 39,
    name: 'The Singleton 12 Year Old Single Malt Scotch Whisky',
    brand: 'The Singleton',
    whiskyType: 'Single Malt',
    region: 'Speyside',
    ageStatement: '12 Year Old',
    abv: '40.0%',
    peatSmoke: 'Unpeated',
    caskFinish: 'European & American Oak',
    description: 'Slow-crafted in Dufftown, Speyside. Smooth and approachable with toasted nuts, baked apples, brown sugar, and sweet vanilla.',
    badge: 'Speyside Smooth 12 Year',
    variants: [
      { size: '700ml', format: 'Bottle', packSize: '700ml Bottle', price: 79.99, weight: '1.4kg' }
    ]
  },
  {
    id: 40,
    name: 'Auchentoshan American Oak Single Malt Scotch Whisky',
    brand: 'Auchentoshan',
    whiskyType: 'Single Malt',
    region: 'Lowland',
    ageStatement: 'NAS',
    abv: '40.0%',
    peatSmoke: 'Unpeated',
    caskFinish: 'First Fill Ex-Bourbon Barrels',
    description: 'Triple distilled in the Lowlands for delicate sweetness. Matured in first-fill ex-bourbon oak casks delivering vanilla, coconut, peach, and smooth zesty citrus.',
    badge: 'Triple Distilled Lowland',
    variants: [
      { size: '700ml', format: 'Bottle', packSize: '700ml Bottle', price: 74.99, weight: '1.4kg' }
    ]
  }
];

const whiskyImg = 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?q=80&w=800&auto=format&fit=crop';

async function main() {
  const { PRODUCTS } = await import('../src/config/site.js');
  const updatedProducts = [...PRODUCTS];

  for (const item of scotchesData) {
    const slug = item.name.toLowerCase().replace(/['"’\[\]]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

    const collections = ['whisky-whiskey', 'scotch-whisky'];
    if (item.whiskyType === 'Single Malt') collections.push('single-malt-scotch');
    if (item.whiskyType === 'Blended Scotch') collections.push('blended-scotch');
    if (item.whiskyType === 'Blended Malt') collections.push('blended-malt-scotch');
    if (item.region) collections.push(`${item.region.toLowerCase()}-whisky`);

    const variants = item.variants.map((v, index) => ({
      id: `${slug}-${v.size.toLowerCase()}-${v.format.toLowerCase().replace(/[^a-z0-9]/g, '')}`,
      sku: `SPIRIT-SCOTCH-${item.id.toString().padStart(3, '0')}-${v.size.toUpperCase()}${v.format === 'Gift Box' ? '-GB' : ''}`,
      unitSize: v.size,
      container: v.format,
      packSize: v.packSize,
      price: v.price,
      stockLevel: 32 - index * 4,
      weight: v.weight,
      barcode: `9310${(99300000 + item.id * 8811 + index * 101).toString().padStart(8, '0')}`,
      availability: 'InStock',
      image: whiskyImg
    }));

    const primaryVariant = variants[0];

    const productObj = {
      slug: slug,
      name: item.name,
      price: primaryVariant.price,
      primaryCategory: 'spirits',
      category: 'spirits',
      primarySubcategory: 'whisky-whiskey',
      subcategory: 'whisky-whiskey',
      brand: item.brand,
      countryOfOrigin: 'Scotland',
      regionOrState: item.region,
      abv: item.abv,
      containerType: primaryVariant.container,
      bottleOrCanSize: primaryVariant.unitSize,
      packSize: primaryVariant.packSize,
      primaryProductType: 'Whisky & Whiskey',
      whiskyStyle: 'Scotch Whisky',
      whiskyType: item.whiskyType,
      whiskyRegion: item.region,
      peatSmoke: item.peatSmoke,
      caskFinish: item.caskFinish,
      styleOrVariety: item.whiskyType,
      flavourProfile: [item.whiskyType, item.region, item.peatSmoke, 'Aged Oak'],
      dietary: ['Scotch Whisky', 'Imported Spirit', item.whiskyType],
      ageStatement: item.ageStatement !== 'NAS' ? item.ageStatement : '',
      vintage: '',
      controlledTags: ['Spirits', 'Whisky & Whiskey', 'Scotch Whisky', item.whiskyType, item.brand, item.region, item.ageStatement].filter(Boolean),
      collections: collections,
      seoUrl: `/spirits/whisky-whiskey/${slug}`,
      description: item.description,
      shortDescription: `${item.brand} ${item.whiskyType} (${item.region}, Scotland). ABV: ${item.abv}.`,
      badge: item.badge,
      featured: item.id === 2 || item.id === 6 || item.id === 13 || item.id === 22 || item.id === 33,
      images: [whiskyImg],
      variants: variants
    };

    const existingIdx = updatedProducts.findIndex(p => p.slug === slug || p.name.toLowerCase() === item.name.toLowerCase());

    if (existingIdx !== -1) {
      console.log(`Updating existing product ${updatedProducts[existingIdx].name}`);
      updatedProducts[existingIdx] = {
        ...updatedProducts[existingIdx],
        ...productObj,
        variants: variants
      };
    } else {
      console.log(`Adding new Scotch Whisky product: ${item.name}`);
      updatedProducts.push(productObj);
    }
  }

  console.log('Total PRODUCTS after Scotch Whisky update:', updatedProducts.length);

  const siteFile = fs.readFileSync('./src/config/site.js', 'utf8');
  const productsStartIdx = siteFile.indexOf('export const PRODUCTS = [');
  const postsStartIdx = siteFile.indexOf('export const POSTS = [');

  if (productsStartIdx === -1 || postsStartIdx === -1) {
    console.error('Could not locate PRODUCTS or POSTS bounds in site.js');
    process.exit(1);
  }

  const beforeProducts = siteFile.slice(0, productsStartIdx);
  const afterProducts = siteFile.slice(postsStartIdx);
  const newProductsJson = 'export const PRODUCTS = ' + JSON.stringify(updatedProducts, null, 2) + ';\n\n';

  fs.writeFileSync('./src/config/site.js', beforeProducts + newProductsJson + afterProducts);
  console.log('Successfully updated src/config/site.js with 40 Scotch Whiskies!');
}

main().catch(console.error);
