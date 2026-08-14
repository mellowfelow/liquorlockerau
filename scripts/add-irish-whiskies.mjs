import fs from 'fs';

const irishWhiskiesData = [
  {
    id: 1,
    name: 'Jameson Irish Whiskey',
    brand: 'Jameson',
    whiskyType: 'Blended',
    country: 'Ireland',
    ageStatement: '',
    abv: '40.0%',
    peatSmoke: 'Unpeated',
    caskFinish: 'Bourbon & Sherry Cask',
    description: 'Jameson Irish Whiskey is the world’s bestselling Irish whiskey. Triple distilled and aged for a minimum of 4 years in oak casks, delivering notes of sweet vanilla, toasted wood, and smooth orchard fruits.',
    badge: 'World No. 1 Irish Whiskey',
    variants: [
      { size: '700ml', format: 'Bottle', packSize: '700ml Bottle', price: 49.99, weight: '1.4kg' },
      { size: '1L', format: 'Bottle', packSize: '1L Bottle', price: 64.99, weight: '1.9kg' }
    ]
  },
  {
    id: 2,
    name: 'Jameson Black Barrel Irish Whiskey',
    brand: 'Jameson',
    whiskyType: 'Blended',
    country: 'Ireland',
    ageStatement: '',
    abv: '40.0%',
    peatSmoke: 'Unpeated',
    caskFinish: 'Double Charred Bourbon Casks',
    description: 'Jameson Black Barrel is a triple distilled blend of grain and rare pot still whiskey matured in double-charred bourbon barrels. Rich notes of butterscotch, fudge, toasted wood, and warm spice.',
    badge: 'Double Charred Finish',
    variants: [
      { size: '700ml', format: 'Bottle', packSize: '700ml Bottle', price: 69.99, weight: '1.4kg' }
    ]
  },
  {
    id: 3,
    name: 'Jameson Caskmates Stout Edition Irish Whiskey',
    brand: 'Jameson',
    whiskyType: 'Blended',
    country: 'Ireland',
    ageStatement: '',
    abv: '40.0%',
    peatSmoke: 'Unpeated',
    caskFinish: 'Craft Stout Seasoned Oak Barrels',
    description: 'Jameson Irish Whiskey finished in craft stout beer seasoned barrels. Subtle notes of cocoa, coffee, milk chocolate, and butterscotch mingled with smooth triple-distilled Irish whiskey.',
    badge: 'Craft Stout Cask',
    variants: [
      { size: '700ml', format: 'Bottle', packSize: '700ml Bottle', price: 64.99, weight: '1.4kg' }
    ]
  },
  {
    id: 4,
    name: 'Jameson Caskmates IPA Edition Irish Whiskey',
    brand: 'Jameson',
    whiskyType: 'Blended',
    country: 'Ireland',
    ageStatement: '',
    abv: '40.0%',
    peatSmoke: 'Unpeated',
    caskFinish: 'Craft IPA Seasoned Oak Barrels',
    description: 'Triple distilled Jameson finished in craft IPA seasoned oak casks. Crisp hops, green apple, zesty citrus, and subtle herbal spice over smooth toasted wood.',
    badge: 'Craft IPA Cask',
    variants: [
      { size: '700ml', format: 'Bottle', packSize: '700ml Bottle', price: 64.99, weight: '1.4kg' }
    ]
  },
  {
    id: 5,
    name: 'Jameson 18 Year Old Limited Reserve Irish Whiskey',
    brand: 'Jameson',
    whiskyType: 'Blended',
    country: 'Ireland',
    ageStatement: '18 Year Old',
    abv: '40.0%',
    peatSmoke: 'Unpeated',
    caskFinish: 'Bourbon & Oloroso Sherry Cask, First-Fill Bourbon Finish',
    description: 'An exceptional rare blend matured for at least 18 years in hand-selected bourbon and sherry casks before a final finish in first-fill bourbon barrels. Velvety fudge, toffee, dark spice, and rich leather.',
    badge: '18 Year Reserve',
    variants: [
      { size: '700ml', format: 'Gift Box', packSize: '700ml Gift Box', price: 299.99, weight: '1.7kg' }
    ]
  },
  {
    id: 6,
    name: 'Bushmills Original Irish Whiskey',
    brand: 'Bushmills',
    whiskyType: 'Blended',
    country: 'Ireland',
    ageStatement: '',
    abv: '40.0%',
    peatSmoke: 'Unpeated',
    caskFinish: 'American Oak Bourbon & Sherry Cask',
    description: 'The cornerstone of Ireland’s oldest licensed distillery (1608). A blend of triple distilled single malt and lighter grain whiskey. Crisp fruit, honeyed vanilla, and warm spice.',
    badge: "Ireland's Oldest Distillery",
    variants: [
      { size: '700ml', format: 'Bottle', packSize: '700ml Bottle', price: 49.99, weight: '1.4kg' },
      { size: '1L', format: 'Bottle', packSize: '1L Bottle', price: 64.99, weight: '1.9kg' }
    ]
  },
  {
    id: 7,
    name: 'Bushmills Black Bush Irish Whiskey',
    brand: 'Bushmills',
    whiskyType: 'Blended',
    country: 'Ireland',
    ageStatement: '',
    abv: '40.0%',
    peatSmoke: 'Unpeated',
    caskFinish: 'High Proportion Oloroso Sherry Cask',
    description: 'Black Bush combines up to 80% triple distilled single malt aged in Oloroso sherry casks with sweet grain whiskey. Deep mahogany tone, dried fruit, dark chocolate, and silky sherry sweetness.',
    badge: 'Oloroso Sherry Rich',
    variants: [
      { size: '700ml', format: 'Bottle', packSize: '700ml Bottle', price: 59.99, weight: '1.4kg' }
    ]
  },
  {
    id: 8,
    name: 'Bushmills 10 Year Old Single Malt Irish Whiskey',
    brand: 'Bushmills',
    whiskyType: 'Single Malt',
    country: 'Ireland',
    ageStatement: '10 Year Old',
    abv: '40.0%',
    peatSmoke: 'Unpeated',
    caskFinish: 'Bourbon & Oloroso Sherry Casks',
    description: '100% unpeated malted barley triple distilled and matured for a minimum of 10 years in ex-bourbon and sherry casks. Honey, ripe fruit, milk chocolate, and toasted wood.',
    badge: '10 Year Single Malt',
    variants: [
      { size: '700ml', format: 'Bottle', packSize: '700ml Bottle', price: 89.99, weight: '1.4kg' }
    ]
  },
  {
    id: 9,
    name: 'Bushmills 16 Year Old Single Malt Irish Whiskey',
    brand: 'Bushmills',
    whiskyType: 'Single Malt',
    country: 'Ireland',
    ageStatement: '16 Year Old',
    abv: '40.0%',
    peatSmoke: 'Unpeated',
    caskFinish: 'Bourbon & Sherry, Ruby Port Pipe Finish',
    description: 'Matured 16 years in a combination of bourbon and sherry casks before a final 6-month finish in Ruby Port pipes. Layers of juicy red berries, dark chocolate, honey, and toasted nuts.',
    badge: '16 Year Ruby Port Finish',
    variants: [
      { size: '700ml', format: 'Gift Box', packSize: '700ml Gift Box', price: 179.99, weight: '1.7kg' }
    ]
  },
  {
    id: 10,
    name: 'Bushmills 21 Year Old Single Malt Irish Whiskey',
    brand: 'Bushmills',
    whiskyType: 'Single Malt',
    country: 'Ireland',
    ageStatement: '21 Year Old',
    abv: '40.0%',
    peatSmoke: 'Unpeated',
    caskFinish: 'Bourbon & Sherry, Madeira Cask Finish',
    description: 'Aged 19 years in ex-bourbon and Oloroso sherry casks then married in genuine Madeira wine casks for two additional years. Opulent dried fruit, dark chocolate, mango, and spiced oak.',
    badge: '21 Year Madeira Cask',
    variants: [
      { size: '700ml', format: 'Gift Box', packSize: '700ml Gift Box', price: 349.99, weight: '1.8kg' }
    ]
  },
  {
    id: 11,
    name: 'Tullamore D.E.W. Original Irish Whiskey',
    brand: 'Tullamore D.E.W.',
    whiskyType: 'Blended',
    country: 'Ireland',
    ageStatement: '',
    abv: '40.0%',
    peatSmoke: 'Unpeated',
    caskFinish: 'Triple Distilled, Refill, Bourbon & Sherry Wood',
    description: 'Famous triple distilled blend combining grain, malt, and single pot still whiskies matured in refill, bourbon, and sherry casks. Early green apple, sweet citrus, vanilla, and gentle spice.',
    badge: 'Triple Distilled Original',
    variants: [
      { size: '700ml', format: 'Bottle', packSize: '700ml Bottle', price: 49.99, weight: '1.4kg' },
      { size: '1L', format: 'Bottle', packSize: '1L Bottle', price: 64.99, weight: '1.9kg' }
    ]
  },
  {
    id: 12,
    name: 'Tullamore D.E.W. 12 Year Old Special Reserve Irish Whiskey',
    brand: 'Tullamore D.E.W.',
    whiskyType: 'Blended',
    country: 'Ireland',
    ageStatement: '12 Year Old',
    abv: '40.0%',
    peatSmoke: 'Unpeated',
    caskFinish: 'Ex-Bourbon & Oloroso Sherry Casks',
    description: 'A rich triple-distilled blend containing a high proportion of pot still and malt whiskies aged 12 to 15 years in bourbon and sherry casks. Dried fruits, praline, wood spice, and dark chocolate.',
    badge: '12 Year Special Reserve',
    variants: [
      { size: '700ml', format: 'Bottle', packSize: '700ml Bottle', price: 79.99, weight: '1.4kg' }
    ]
  },
  {
    id: 13,
    name: 'Tullamore D.E.W. 14 Year Old Single Malt Irish Whiskey',
    brand: 'Tullamore D.E.W.',
    whiskyType: 'Single Malt',
    country: 'Ireland',
    ageStatement: '14 Year Old',
    abv: '41.3%',
    peatSmoke: 'Unpeated',
    caskFinish: 'Finished in 4 Casks (Bourbon, Oloroso Sherry, Port & Madeira)',
    description: 'Triple distilled single malt matured for 14 years and finished in 4 distinct cask types: Bourbon, Oloroso Sherry, Port, and Madeira. Ripe fruit, spiced apple, vanilla, and oak warmth.',
    badge: '14 Year Four-Cask Finish',
    variants: [
      { size: '700ml', format: 'Gift Box', packSize: '700ml Gift Box', price: 119.99, weight: '1.6kg' }
    ]
  },
  {
    id: 14,
    name: 'Redbreast 12 Year Old Single Pot Still Irish Whiskey',
    brand: 'Redbreast',
    whiskyType: 'Single Pot Still',
    country: 'Ireland',
    ageStatement: '12 Year Old',
    abv: '40.0%',
    peatSmoke: 'Unpeated',
    caskFinish: 'Bourbon & Oloroso Sherry Casks',
    description: 'The benchmark Single Pot Still Irish Whiskey. Made from malted and unmalted barley triple distilled in copper pot stills and aged 12 years in bourbon and Oloroso sherry casks. Complex fruit, toasted oak, and signature pot still spice.',
    badge: 'Single Pot Still Benchmark',
    variants: [
      { size: '700ml', format: 'Bottle', packSize: '700ml Bottle', price: 139.99, weight: '1.4kg' },
      { size: '700ml', format: 'Gift Box', packSize: '700ml Gift Box', price: 149.99, weight: '1.6kg' }
    ]
  },
  {
    id: 15,
    name: 'Redbreast 12 Year Old Cask Strength Irish Whiskey',
    brand: 'Redbreast',
    whiskyType: 'Single Pot Still',
    country: 'Ireland',
    ageStatement: '12 Year Old',
    abv: '58.1%',
    peatSmoke: 'Unpeated',
    caskFinish: 'First-Fill Oloroso Sherry & Bourbon Casks',
    description: 'Bottled straight from the cask without water dilution or chill-filtration. Explosive dried fruit, fig, dark chocolate, toasted wood, and intense pot still spice at 58.1% ABV.',
    badge: '58.1% Cask Strength',
    variants: [
      { size: '700ml', format: 'Bottle', packSize: '700ml Bottle', price: 199.99, weight: '1.5kg' }
    ]
  },
  {
    id: 16,
    name: 'Redbreast 15 Year Old Single Pot Still Irish Whiskey',
    brand: 'Redbreast',
    whiskyType: 'Single Pot Still',
    country: 'Ireland',
    ageStatement: '15 Year Old',
    abv: '46.0%',
    peatSmoke: 'Unpeated',
    caskFinish: 'First-Fill & Refill Bourbon & Sherry Casks',
    description: 'Matured for 15 years in first-fill and refill oak casks. Fuller, darker, and more wood-forward with succulent berry fruit, sweet vanilla, and rich toasted oak.',
    badge: '15 Year Single Pot Still',
    variants: [
      { size: '700ml', format: 'Gift Box', packSize: '700ml Gift Box', price: 219.99, weight: '1.6kg' }
    ]
  },
  {
    id: 17,
    name: 'Redbreast 21 Year Old Single Pot Still Irish Whiskey',
    brand: 'Redbreast',
    whiskyType: 'Single Pot Still',
    country: 'Ireland',
    ageStatement: '21 Year Old',
    abv: '46.0%',
    peatSmoke: 'Unpeated',
    caskFinish: 'First-Fill Oloroso Sherry & Ex-Bourbon Barrels',
    description: 'The pinnacle of the Redbreast range. Aged 21 years in first-fill sherry and bourbon casks. Incredible depth of tropical fruit, dark plum, toasted nut, leather, and lingering oak spice.',
    badge: '21 Year Masterpiece',
    variants: [
      { size: '700ml', format: 'Gift Box', packSize: '700ml Gift Box', price: 499.99, weight: '1.8kg' }
    ]
  },
  {
    id: 18,
    name: 'Green Spot Single Pot Still Irish Whiskey',
    brand: 'Mitchell & Son',
    whiskyType: 'Single Pot Still',
    country: 'Ireland',
    ageStatement: '',
    abv: '40.0%',
    peatSmoke: 'Unpeated',
    caskFinish: 'Ex-Bourbon & Sherry Casks',
    description: 'Historic Single Pot Still Irish Whiskey produced exclusively for Mitchell & Son wine merchants. Matured 7 to 10 years in ex-bourbon and sherry casks. Fresh green apple, papaya, clove, and toasted oak.',
    badge: 'Historic Pot Still',
    variants: [
      { size: '700ml', format: 'Bottle', packSize: '700ml Bottle', price: 119.99, weight: '1.4kg' }
    ]
  },
  {
    id: 19,
    name: 'Yellow Spot 12 Year Old Single Pot Still Irish Whiskey',
    brand: 'Mitchell & Son',
    whiskyType: 'Single Pot Still',
    country: 'Ireland',
    ageStatement: '12 Year Old',
    abv: '46.0%',
    peatSmoke: 'Unpeated',
    caskFinish: 'American Bourbon, Spanish Sherry & Malaga Casks',
    description: 'Aged 12 years in three distinct cask types: American bourbon, Spanish Oloroso sherry, and Spanish Malaga sweet wine casks. Exotic red apple, peach, honey, clove spice, and sweet mocha.',
    badge: '12 Year Malaga Cask',
    variants: [
      { size: '700ml', format: 'Bottle', packSize: '700ml Bottle', price: 169.99, weight: '1.4kg' }
    ]
  },
  {
    id: 20,
    name: 'Red Spot 15 Year Old Single Pot Still Irish Whiskey',
    brand: 'Mitchell & Son',
    whiskyType: 'Single Pot Still',
    country: 'Ireland',
    ageStatement: '15 Year Old',
    abv: '46.0%',
    peatSmoke: 'Unpeated',
    caskFinish: 'Bourbon, Oloroso Sherry & Sicilian Marsala Wine Casks',
    description: 'Matured for a minimum of 15 years in American oak bourbon casks, Spanish Oloroso sherry butts, and Italian Sicilian Marsala wine casks. Baked apple, black pepper, mango, sweet fruit, and toasted oak.',
    badge: '15 Year Marsala Cask',
    variants: [
      { size: '700ml', format: 'Gift Box', packSize: '700ml Gift Box', price: 299.99, weight: '1.7kg' }
    ]
  },
  {
    id: 21,
    name: 'Teeling Small Batch Irish Whiskey',
    brand: 'Teeling',
    whiskyType: 'Blended',
    country: 'Ireland',
    ageStatement: '',
    abv: '46.0%',
    peatSmoke: 'Unpeated',
    caskFinish: 'Finished in Central American Rum Casks',
    description: 'Hand-selected casks of grain and malt whiskey married in Central American rum casks for 12 months. Bottled at 46% non chill-filtered with notes of dried fruit, vanilla, wood spice, and sweet rum notes.',
    badge: 'Rum Cask Finish 46%',
    variants: [
      { size: '700ml', format: 'Bottle', packSize: '700ml Bottle', price: 69.99, weight: '1.4kg' }
    ]
  },
  {
    id: 22,
    name: 'Teeling Single Grain Irish Whiskey',
    brand: 'Teeling',
    whiskyType: 'Single Grain',
    country: 'Ireland',
    ageStatement: '',
    abv: '46.0%',
    peatSmoke: 'Unpeated',
    caskFinish: 'Matured Exclusively in Californian Cabernet Sauvignon Casks',
    description: 'Distilled from maize/corn grain and aged exclusively in ex-Californian Cabernet Sauvignon red wine casks. Vibrant spice, berry fruit, sweet red apple, butterscotch, and oak.',
    badge: 'Cabernet Cask Grain',
    variants: [
      { size: '700ml', format: 'Bottle', packSize: '700ml Bottle', price: 79.99, weight: '1.4kg' }
    ]
  },
  {
    id: 23,
    name: 'Teeling Single Malt Irish Whiskey',
    brand: 'Teeling',
    whiskyType: 'Single Malt',
    country: 'Ireland',
    ageStatement: '',
    abv: '46.0%',
    peatSmoke: 'Unpeated',
    caskFinish: 'Finished in 5 Wine Casks (Sherry, Port, Madeira, White Burgundy, Cabernet)',
    description: 'Crafted from 100% malted barley and matured in five wine cask finishes: Sherry, Port, Madeira, White Burgundy, and Cabernet Sauvignon. Melon, fig, toffee, dried fruit, and zesty citrus.',
    badge: '5-Cask Single Malt',
    variants: [
      { size: '700ml', format: 'Bottle', packSize: '700ml Bottle', price: 99.99, weight: '1.4kg' }
    ]
  },
  {
    id: 24,
    name: 'Teeling Pot Still Irish Whiskey',
    brand: 'Teeling',
    whiskyType: 'Single Pot Still',
    country: 'Ireland',
    ageStatement: '',
    abv: '46.0%',
    peatSmoke: 'Unpeated',
    caskFinish: 'Matured in Virgin Oak, Ex-Bourbon & Sherry Casks',
    description: 'The first Dublin-distilled Single Pot Still in over 50 years. Crafted using a traditional recipe of 50% malted and 50% unmalted barley, aged in virgin oak, bourbon, and sherry casks. Hibiscus tea, grapefruit, white pepper, and toasted oak.',
    badge: 'Dublin Pot Still',
    variants: [
      { size: '700ml', format: 'Bottle', packSize: '700ml Bottle', price: 109.99, weight: '1.4kg' }
    ]
  },
  {
    id: 25,
    name: 'Teeling Blackpitts Peated Single Malt Irish Whiskey',
    brand: 'Teeling',
    whiskyType: 'Peated',
    country: 'Ireland',
    ageStatement: '',
    abv: '46.0%',
    peatSmoke: 'Peated Irish Malt',
    caskFinish: 'Ex-Bourbon & Sauternes Wine Casks',
    description: 'Named after Dublin’s historic Blackpitts area. Double distilled peated single malt aged in ex-bourbon and Sauternes wine casks. Barbecue smoke, grilled pineapple, honey sweetness, and salted caramel.',
    badge: 'Peated Dublin Malt',
    variants: [
      { size: '700ml', format: 'Bottle', packSize: '700ml Bottle', price: 109.99, weight: '1.4kg' }
    ]
  },
  {
    id: 26,
    name: 'Powers Gold Label Irish Whiskey',
    brand: 'Powers',
    whiskyType: 'Blended',
    country: 'Ireland',
    ageStatement: '',
    abv: '40.0%',
    peatSmoke: 'Unpeated',
    caskFinish: 'Second & Third Fill American Oak Casks',
    description: 'A legendary Irish whiskey first distilled at John’s Lane in Dublin. High pot still content non chill-filtered at 40% ABV. Cinnamon spice, green apple, honeycomb, and firm oak background.',
    badge: 'Classic Powers Gold',
    variants: [
      { size: '700ml', format: 'Bottle', packSize: '700ml Bottle', price: 59.99, weight: '1.4kg' }
    ]
  },
  {
    id: 27,
    name: 'Powers Three Swallow Irish Whiskey',
    brand: 'Powers',
    whiskyType: 'Single Pot Still',
    country: 'Ireland',
    ageStatement: '',
    abv: '40.0%',
    peatSmoke: 'Unpeated',
    caskFinish: 'Second & Third Fill Bourbon Casks & Oloroso Sherry Casks',
    description: 'A representation of the traditional Powers single pot still style. Matured in second and third-fill bourbon casks with a touch of sherry wood. Green pepper, toasted cedar, citrus, and banana fruit.',
    badge: 'Single Pot Still Classic',
    variants: [
      { size: '700ml', format: 'Bottle', packSize: '700ml Bottle', price: 79.99, weight: '1.4kg' }
    ]
  },
  {
    id: 28,
    name: "Powers John's Lane 12 Year Old Irish Whiskey",
    brand: 'Powers',
    whiskyType: 'Single Pot Still',
    country: 'Ireland',
    ageStatement: '12 Year Old',
    abv: '46.0%',
    peatSmoke: 'Unpeated',
    caskFinish: 'First-Fill Ex-Bourbon & Oloroso Sherry Casks',
    description: 'Celebrates the original Powers distillery on John’s Lane. Aged 12 years predominantly in first-fill ex-bourbon casks with Oloroso sherry wood. Rich earthy spice, dark chocolate, leather, and lingering honey.',
    badge: '12 Year Pot Still',
    variants: [
      { size: '700ml', format: 'Bottle', packSize: '700ml Bottle', price: 129.99, weight: '1.4kg' }
    ]
  },
  {
    id: 29,
    name: 'The Sexton Single Malt Irish Whiskey',
    brand: 'The Sexton',
    whiskyType: 'Single Malt',
    country: 'Ireland',
    ageStatement: '',
    abv: '40.0%',
    peatSmoke: 'Unpeated',
    caskFinish: 'Aged in First-Fill Oloroso Sherry Casks',
    description: 'Crafted from 100% Irish malted barley triple distilled in copper pot stills and aged 4 years in first-fill Oloroso sherry butts. Presented in a striking hexagonal bottle with dried fruit, honeycomb, and dark chocolate.',
    badge: 'Sherry Cask Hexagonal',
    variants: [
      { size: '700ml', format: 'Bottle', packSize: '700ml Bottle', price: 69.99, weight: '1.4kg' }
    ]
  },
  {
    id: 30,
    name: 'Connemara Peated Single Malt Irish Whiskey',
    brand: 'Connemara',
    whiskyType: 'Peated',
    country: 'Ireland',
    ageStatement: '',
    abv: '40.0%',
    peatSmoke: 'Peated Irish Malt',
    caskFinish: 'Bourbon Barrels',
    description: 'The pioneer of peated Irish single malts. Double distilled over peat fires in copper pot stills and aged in bourbon barrels. Sweet herbal peat smoke, honeyed malt, vanilla, and gentle oak.',
    badge: 'Peated Irish Single Malt',
    variants: [
      { size: '700ml', format: 'Bottle', packSize: '700ml Bottle', price: 89.99, weight: '1.4kg' }
    ]
  },
  {
    id: 31,
    name: 'Kilbeggan Traditional Irish Whiskey',
    brand: 'Kilbeggan',
    whiskyType: 'Blended',
    country: 'Ireland',
    ageStatement: '',
    abv: '40.0%',
    peatSmoke: 'Unpeated',
    caskFinish: 'Ex-Bourbon Casks',
    description: 'Crafted at Ireland’s oldest continually licensed distillery. Double distilled in historic pot stills and aged in ex-bourbon barrels. Sweet caramel, vanilla, hazelnut, and toasted wood.',
    badge: 'Traditional Irish Blend',
    variants: [
      { size: '700ml', format: 'Bottle', packSize: '700ml Bottle', price: 54.99, weight: '1.4kg' }
    ]
  },
  {
    id: 32,
    name: "Writers' Tears Copper Pot Irish Whiskey",
    brand: "Writers' Tears",
    whiskyType: 'Single Pot Still',
    country: 'Ireland',
    ageStatement: '',
    abv: '40.0%',
    peatSmoke: 'Unpeated',
    caskFinish: 'American Oak Bourbon Barrels',
    description: 'A unique boutique vatting of 60% Single Pot Still and 40% Single Malt whiskey with 0% grain whiskey. Triple distilled and aged in bourbon casks. Honey, green apple, ginger spice, and creamy vanilla.',
    badge: 'Copper Pot Pure Malt',
    variants: [
      { size: '700ml', format: 'Bottle', packSize: '700ml Bottle', price: 89.99, weight: '1.4kg' }
    ]
  },
  {
    id: 33,
    name: 'The Irishman The Harvest Irish Whiskey',
    brand: 'The Irishman',
    whiskyType: 'Single Pot Still',
    country: 'Ireland',
    ageStatement: '',
    abv: '40.0%',
    peatSmoke: 'Unpeated',
    caskFinish: 'American Oak Bourbon Barrels',
    description: 'Formerly known as Founder’s Reserve. A blend of 70% Single Malt and 30% Single Pot Still with no grain whiskey. Triple distilled and matured in bourbon casks. Zesty spice, peach, vanilla, and toasted oak.',
    badge: '70% Malt / 30% Pot Still',
    variants: [
      { size: '700ml', format: 'Bottle', packSize: '700ml Bottle', price: 79.99, weight: '1.4kg' }
    ]
  },
  {
    id: 34,
    name: 'Dingle Original Irish Whiskey',
    brand: 'Dingle',
    whiskyType: 'Single Malt',
    country: 'Ireland',
    ageStatement: '',
    abv: '46.3%',
    peatSmoke: 'Unpeated',
    caskFinish: 'Bourbon & Oloroso Sherry Casks',
    description: 'Triple distilled in small copper pot stills on the Dingle Peninsula. Matured in bourbon and Oloroso sherry casks non chill-filtered at 46.3% ABV. Mint, cut grass, lime, and warm vanilla spice.',
    badge: 'Dingle Peninsula Craft',
    variants: [
      { size: '700ml', format: 'Bottle', packSize: '700ml Bottle', price: 99.99, weight: '1.4kg' }
    ]
  },
  {
    id: 35,
    name: 'The Busker Triple Cask Triple Smooth Irish Whiskey',
    brand: 'The Busker',
    whiskyType: 'Blended',
    country: 'Ireland',
    ageStatement: '',
    abv: '40.0%',
    peatSmoke: 'Unpeated',
    caskFinish: 'Bourbon, Marsala & Sherry Casks',
    description: 'Crafted at Royal Oak Distillery combining Grain, Malt, and Pot Still whiskies matured in Bourbon, Sherry, and rare Sicilian Marsala wine casks. Tropical fruit, cinnamon, vanilla, and sweet caramel.',
    badge: 'Triple Cask Marsala',
    variants: [
      { size: '700ml', format: 'Bottle', packSize: '700ml Bottle', price: 54.99, weight: '1.4kg' }
    ]
  },
  {
    id: 36,
    name: 'Method and Madness Single Pot Still Irish Whiskey',
    brand: 'Method and Madness',
    whiskyType: 'Single Pot Still',
    country: 'Ireland',
    ageStatement: '',
    abv: '46.0%',
    peatSmoke: 'Unpeated',
    caskFinish: 'Sherry & Bourbon Casks, Finished in French Chestnut Casks',
    description: 'Experimental release from Midleton Micro Distillery. Single Pot Still whiskey aged in sherry and bourbon barrels then finished in French Chestnut wood. Fresh wood, herbal tea, green clove, and sweet toasted chestnuts.',
    badge: 'French Chestnut Finish',
    variants: [
      { size: '700ml', format: 'Bottle', packSize: '700ml Bottle', price: 129.99, weight: '1.4kg' }
    ]
  },
  {
    id: 37,
    name: 'Midleton Very Rare Irish Whiskey',
    brand: 'Midleton',
    whiskyType: 'Blended',
    country: 'Ireland',
    ageStatement: 'Allocation Reserve',
    abv: '40.0%',
    peatSmoke: 'Unpeated',
    caskFinish: 'Lightly Charred Ex-Bourbon American Oak Barrels',
    description: 'The pinnacle of Irish distilling. An annual vintage release selected by Master Distiller Kevin O’Gorman from rare hand-selected casks aged 12 to 30 years. Vanilla, floral nectar, orchard fruits, and silky oak finish.',
    badge: 'Master Distiller Reserve',
    variants: [
      { size: '700ml', format: 'Gift Box', packSize: '700ml Gift Box', price: 399.99, weight: '1.8kg' }
    ]
  }
];

const whiskyImg = 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?q=80&w=800&auto=format&fit=crop';

async function main() {
  const { PRODUCTS } = await import('../src/config/site.js');
  const updatedProducts = [...PRODUCTS];

  for (const item of irishWhiskiesData) {
    const slug = item.name.toLowerCase().replace(/['"’\[\]]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

    const collections = ['whisky-whiskey', 'irish-whiskey'];
    if (item.whiskyType === 'Single Malt') collections.push('single-malt-irish-whiskey');
    if (item.whiskyType === 'Single Pot Still') collections.push('single-pot-still-irish-whiskey');
    if (item.whiskyType === 'Single Grain') collections.push('single-grain-irish-whiskey');
    if (item.whiskyType === 'Peated') collections.push('peated-irish-whiskey');

    const variants = item.variants.map((v, index) => ({
      id: `${slug}-${v.size.toLowerCase()}-${v.format.toLowerCase().replace(/[^a-z0-9]/g, '')}`,
      sku: `SPIRIT-IRISH-${item.id.toString().padStart(3, '0')}-${v.size.toUpperCase()}${v.format === 'Gift Box' ? '-GB' : ''}`,
      unitSize: v.size,
      container: v.format,
      packSize: v.packSize,
      price: v.price,
      stockLevel: 28 - index * 4,
      weight: v.weight,
      barcode: `9310${(99400000 + item.id * 8811 + index * 101).toString().padStart(8, '0')}`,
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
      countryOfOrigin: 'Ireland',
      regionOrState: 'Ireland',
      abv: item.abv,
      containerType: primaryVariant.container,
      bottleOrCanSize: primaryVariant.unitSize,
      packSize: primaryVariant.packSize,
      primaryProductType: 'Whisky & Whiskey',
      whiskyStyle: 'Irish Whiskey',
      whiskyType: item.whiskyType,
      whiskyRegion: 'Ireland',
      peatSmoke: item.peatSmoke,
      caskFinish: item.caskFinish,
      styleOrVariety: item.whiskyType,
      flavourProfile: [item.whiskyType, 'Ireland', item.peatSmoke, 'Triple Distilled'],
      dietary: ['Irish Whiskey', 'Imported Spirit', item.whiskyType, ...(item.variants.some(v => v.format === 'Gift Box') ? ['Gift Box'] : [])],
      ageStatement: item.ageStatement && item.ageStatement !== 'NAS' ? item.ageStatement : '',
      vintage: '',
      controlledTags: ['Spirits', 'Whisky & Whiskey', 'Irish Whiskey', item.whiskyType, item.brand, item.ageStatement].filter(Boolean),
      collections: collections,
      seoUrl: `/spirits/whisky-whiskey/${slug}`,
      description: item.description,
      shortDescription: `${item.brand} ${item.whiskyType} Irish Whiskey (Ireland). ABV: ${item.abv}.`,
      badge: item.badge,
      featured: item.id === 1 || item.id === 14 || item.id === 18 || item.id === 21 || item.id === 37,
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
      console.log(`Adding new Irish Whiskey product: ${item.name}`);
      updatedProducts.push(productObj);
    }
  }

  console.log('Total PRODUCTS after Irish Whiskey update:', updatedProducts.length);

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
  console.log('Successfully updated src/config/site.js with 37 Irish Whiskies!');
}

main().catch(console.error);
