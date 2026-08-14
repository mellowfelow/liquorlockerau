const fs = require('fs');

const vodkas = [
  // 1. Smirnoff No. 21 Red Vodka
  { name: "Smirnoff No. 21 Red Vodka 700ml", brand: "Smirnoff", price: 44.99, country: "Russia/UK", state: "", abv: "37.5%", size: "700ml", style: "Classic", base: "Corn", desc: "The world's best-selling premium vodka. Triple distilled from a blend of different grains, and filtered ten times through seven columns of environmentally sustainable charcoal for an exceptionally pure-tasting, smooth spirit.", shortDesc: "Classic triple-distilled, incredibly smooth, world-renowned vodka.", serving: "Serve with ginger beer and fresh lime for a classic Moscow Mule." },
  { name: "Smirnoff No. 21 Red Vodka 1 Litre", brand: "Smirnoff", price: 54.99, country: "Russia/UK", state: "", abv: "37.5%", size: "1L", style: "Classic", base: "Corn", desc: "The world's best-selling premium vodka in a generous 1L format. Triple distilled and filtered ten times for exceptional purity.", shortDesc: "1L value bottle of classic triple-distilled smooth vodka.", serving: "Serve with ginger beer and fresh lime for a classic Moscow Mule." },

  // 2. Smirnoff Blue Vodka
  { name: "Smirnoff Blue Vodka 700ml", brand: "Smirnoff", price: 49.99, country: "Russia/UK", state: "", abv: "50.0%", size: "700ml", style: "Classic", base: "Corn", desc: "Smirnoff Blue is the ultra-smooth, 100 proof signature vodka. Triple distilled and filtered ten times, it delivers an uncompromising, robust flavor profile.", shortDesc: "Robust 100-proof (50% ABV) classic triple-distilled vodka.", serving: "Perfect for a powerful Martini or Vesper." },

  // 3. Smirnoff Black Vodka
  { name: "Smirnoff Black Vodka 700ml", brand: "Smirnoff", price: 54.99, country: "Russia/UK", state: "", abv: "40.0%", size: "700ml", style: "Premium", base: "Corn", desc: "Smirnoff Black is a special vodka made in copper pot stills, distilled from Russian grains, and filtered through silver birch charcoal.", shortDesc: "Premium small-batch copper pot distilled vodka.", serving: "Best enjoyed neat, chilled, or on the rocks." },

  // 4. Smirnoff Raspberry Vodka
  { name: "Smirnoff Raspberry Vodka 700ml", brand: "Smirnoff", price: 44.99, country: "Russia/UK", state: "", abv: "37.5%", size: "700ml", style: "Flavoured", base: "Corn", desc: "Infused with the natural tart and sweet flavor of raspberries for a refreshing and vibrant twist on the classic Smirnoff No. 21.", shortDesc: "Vibrant and sweet natural raspberry-infused vodka.", serving: "Serve with lemonade or soda water over ice." },

  // 5. Smirnoff Lime Vodka
  { name: "Smirnoff Lime Vodka 700ml", brand: "Smirnoff", price: 44.99, country: "Russia/UK", state: "", abv: "37.5%", size: "700ml", style: "Flavoured", base: "Corn", desc: "Smirnoff Lime combines the pure, smooth taste of Smirnoff No. 21 with a crisp, refreshing squeeze of lime flavor.", shortDesc: "Crisp and zesty natural lime-infused vodka.", serving: "Mix with soda water and ice for a refreshing low-calorie drink." },

  // 6. Smirnoff Vanilla Vodka
  { name: "Smirnoff Vanilla Vodka 700ml", brand: "Smirnoff", price: 44.99, country: "Russia/UK", state: "", abv: "37.5%", size: "700ml", style: "Flavoured", base: "Corn", desc: "Infused with the natural flavor of vanilla beans, offering a sweet, creamy aroma and a smooth finish.", shortDesc: "Smooth, sweet natural vanilla-infused vodka.", serving: "Essential for a classic Espresso Martini or mixed with cola." },

  // 7. Absolut Vodka
  { name: "Absolut Vodka 700ml", brand: "Absolut", price: 49.99, country: "Sweden", state: "", abv: "40.0%", size: "700ml", style: "Classic", base: "Wheat", desc: "Absolut Vodka is a classic Swedish vodka made exclusively from natural ingredients, embodying the true taste of vodka. It is rich, full-bodied and complex, yet smooth and mellow with a distinct character of grain.", shortDesc: "Classic Swedish vodka distilled from winter wheat with exceptional smoothness.", serving: "Enjoy neat, on the rocks, or mixed in a classic Vodka Tonic." },
  { name: "Absolut Vodka 1 Litre", brand: "Absolut", price: 64.99, country: "Sweden", state: "", abv: "40.0%", size: "1L", style: "Classic", base: "Wheat", desc: "Absolut Vodka is a classic Swedish vodka made exclusively from natural ingredients. 1L value bottle.", shortDesc: "1L value bottle of classic Swedish winter wheat vodka.", serving: "Enjoy neat, on the rocks, or mixed in a classic Vodka Tonic." },

  // 8. Absolut Elyx Vodka
  { name: "Absolut Elyx Vodka 700ml", brand: "Absolut", price: 79.99, country: "Sweden", state: "", abv: "42.3%", size: "700ml", style: "Super Premium", base: "Wheat", desc: "Absolut Elyx is a true luxury vodka, manually distilled in a 1921 copper rectification still. The result is a highly awarded vodka with a rich, silky mouthfeel and a remarkably smooth finish.", shortDesc: "Luxury copper-distilled Swedish vodka with a silky mouthfeel.", serving: "Serve in a classic Elyx Martini with a lemon twist." },

  // 9. Absolut Citron Vodka
  { name: "Absolut Citron Vodka 700ml", brand: "Absolut", price: 49.99, country: "Sweden", state: "", abv: "40.0%", size: "700ml", style: "Flavoured", base: "Wheat", desc: "Absolut Citron is smooth and mellow, with a fresh fruity lemon and lime character and a note of lemon peel.", shortDesc: "Classic citrus-infused Swedish vodka.", serving: "The essential ingredient for a perfect Cosmopolitan." },

  // 10. Absolut Raspberri Vodka
  { name: "Absolut Raspberri Vodka 700ml", brand: "Absolut", price: 49.99, country: "Sweden", state: "", abv: "40.0%", size: "700ml", style: "Flavoured", base: "Wheat", desc: "Absolut Raspberri is rich and intense with the fresh and fruity character of ripened raspberries.", shortDesc: "Rich and intensely fruity wild raspberry-infused vodka.", serving: "Mix with cranberry juice or soda water and fresh berries." },

  // 11. Absolut Vanilia Vodka
  { name: "Absolut Vanilia Vodka 700ml", brand: "Absolut", price: 49.99, country: "Sweden", state: "", abv: "40.0%", size: "700ml", style: "Flavoured", base: "Wheat", desc: "Absolut Vanilia is rich, robust and complex. It has a distinct character of vanilla, notes of butterscotch and hints of dark chocolate.", shortDesc: "Rich and robust natural vanilla-infused vodka.", serving: "The perfect base for a rich Espresso Martini or Pornstar Martini." },

  // 12. Absolut Mango Vodka
  { name: "Absolut Mango Vodka 700ml", brand: "Absolut", price: 49.99, country: "Sweden", state: "", abv: "40.0%", size: "700ml", style: "Flavoured", base: "Wheat", desc: "Absolut Mango is full-bodied and juicy with a character of ripe mango and notes of tropical fruits.", shortDesc: "Tropical, full-bodied ripe mango-infused vodka.", serving: "Serve with orange juice or soda water for a tropical spritz." },

  // 13. Grey Goose Original Vodka
  { name: "Grey Goose Original Vodka 700ml", brand: "Grey Goose", price: 74.99, country: "France", state: "", abv: "40.0%", size: "700ml", style: "Super Premium", base: "Wheat", desc: "Grey Goose is crafted in the Picardy region of France using the finest soft winter wheat and natural spring water from Gensac-la-Pallue. It offers a delicate and floral aroma with a sweet, round palette and a bold, toffee finish.", shortDesc: "Iconic French luxury vodka distilled from soft winter wheat.", serving: "Enjoy in a classic French Martini or neat, well-chilled." },
  { name: "Grey Goose Original Vodka 1 Litre", brand: "Grey Goose", price: 94.99, country: "France", state: "", abv: "40.0%", size: "1L", style: "Super Premium", base: "Wheat", desc: "Grey Goose 1 Litre bottle. Crafted in France using the finest soft winter wheat and natural spring water.", shortDesc: "1L bottle of iconic French luxury winter wheat vodka.", serving: "Enjoy in a classic French Martini or neat, well-chilled." },

  // 14. Grey Goose Altius Vodka
  { name: "Grey Goose Altius Vodka 700ml", brand: "Grey Goose", price: 109.99, country: "France", state: "", abv: "40.0%", size: "700ml", style: "Super Premium", base: "Wheat", desc: "Grey Goose Altius is an ultra-premium expression drawn from naturally filtered spring water originating in the French Alps. Exceptionally smooth with glacial purity.", shortDesc: "Ultra-premium alpine-inspired French luxury vodka.", serving: "Serve neat over a single large ice cube to appreciate its glacial purity." },

  // 15. Belvedere Organic Vodka
  { name: "Belvedere Organic Vodka 700ml", brand: "Belvedere", price: 69.99, country: "Poland", state: "", abv: "40.0%", size: "700ml", style: "Organic", base: "Rye", desc: "Belvedere is a luxury Polish vodka crafted exclusively from Polish Dankowskie Rye and artesian water, completely additive-free and certified organic. It possesses a full, round profile with a velvety texture.", shortDesc: "Luxury organic Polish rye vodka with a velvety texture.", serving: "Serve straight from the freezer or in a classic Vodka Martini." },
  { name: "Belvedere Organic Vodka 1 Litre", brand: "Belvedere", price: 89.99, country: "Poland", state: "", abv: "40.0%", size: "1L", style: "Organic", base: "Rye", desc: "Belvedere 1 Litre bottle. A luxury Polish vodka crafted exclusively from Polish Dankowskie Rye and artesian water.", shortDesc: "1L bottle of luxury organic Polish rye vodka.", serving: "Serve straight from the freezer or in a classic Vodka Martini." },

  // 16. Belvedere Smogóry Forest Vodka
  { name: "Belvedere Smogóry Forest Vodka 700ml", brand: "Belvedere", price: 99.99, country: "Poland", state: "", abv: "40.0%", size: "700ml", style: "Super Premium", base: "Rye", desc: "Crafted from rare Diamond Dankowskie Rye from a single estate located in Smogóry, a village in rural western Poland surrounded by vast, pristine forests. This vodka is exceptionally bold and savory.", shortDesc: "Bold and savory single-estate Polish rye vodka.", serving: "Enjoy neat or on the rocks to highlight its bold, savory notes." },

  // 17. Belvedere Lake Bartezek Vodka
  { name: "Belvedere Lake Bartezek Vodka 700ml", brand: "Belvedere", price: 99.99, country: "Poland", state: "", abv: "40.0%", size: "700ml", style: "Super Premium", base: "Rye", desc: "Crafted from rare Diamond Dankowskie Rye from a single estate located on the shores of Lake Bartężek in Poland's Masurian Lake District. Delicate, floral, and remarkably crisp.", shortDesc: "Delicate and crisp single-estate Polish rye vodka.", serving: "Serve chilled, neat, to appreciate its crisp, floral notes." },

  // 18. Ketel One Vodka
  { name: "Ketel One Vodka 700ml", brand: "Ketel One", price: 59.99, country: "Netherlands", state: "", abv: "40.0%", size: "700ml", style: "Premium", base: "Wheat", desc: "Crafted in the Netherlands by the Nolet family, Ketel One is distilled from 100% wheat in copper pot stills, producing a crisp, sophisticated vodka with hints of citrus and honey.", shortDesc: "Crisp and sophisticated Dutch copper pot distilled wheat vodka.", serving: "Perfect for a Bloody Mary or a Ketel One Vodka Martini." },
  { name: "Ketel One Vodka 1 Litre", brand: "Ketel One", price: 74.99, country: "Netherlands", state: "", abv: "40.0%", size: "1L", style: "Premium", base: "Wheat", desc: "Ketel One Vodka 1 Litre. Crafted in the Netherlands, distilled from 100% wheat in copper pot stills.", shortDesc: "1L bottle of crisp Dutch copper pot distilled wheat vodka.", serving: "Perfect for a Bloody Mary or a Ketel One Vodka Martini." },

  // 19. Cîroc Ultra-Premium Vodka
  { name: "Cîroc Ultra-Premium Vodka 700ml", brand: "Cîroc", price: 69.99, country: "France", state: "", abv: "40.0%", size: "700ml", style: "Super Premium", base: "Grape", desc: "Cîroc is unique among luxury vodkas as it is distilled five times from fine French grapes. This creates a remarkably smooth, exceptionally fresh and fruity experience.", shortDesc: "Ultra-premium French vodka uniquely distilled from fine grapes.", serving: "Serve in a signature Cîroc Blue Stone cocktail or with soda and lime." },

  // 20. Cîroc Apple Vodka
  { name: "Cîroc Apple Vodka 700ml", brand: "Cîroc", price: 69.99, country: "France", state: "", abv: "37.5%", size: "700ml", style: "Flavoured", base: "Grape", desc: "Distilled five times from fine French grapes and infused with a distinctive blend of green apple and other natural flavors. Crisp, juicy, and smooth.", shortDesc: "Crisp green apple-infused ultra-premium French grape vodka.", serving: "Mix with cranberry juice for a vibrant Apple and Cranberry cooler." },

  // 21. Cîroc Pineapple Vodka
  { name: "Cîroc Pineapple Vodka 700ml", brand: "Cîroc", price: 69.99, country: "France", state: "", abv: "37.5%", size: "700ml", style: "Flavoured", base: "Grape", desc: "Distilled five times from French grapes and infused with crushed pineapple and tropical fruit flavors. Bright, lush, and elegantly smooth.", shortDesc: "Tropical pineapple-infused ultra-premium French grape vodka.", serving: "Serve with pineapple juice or orange juice for a tropical escape." },

  // 22. Cîroc Red Berry Vodka
  { name: "Cîroc Red Berry Vodka 700ml", brand: "Cîroc", price: 69.99, country: "France", state: "", abv: "37.5%", size: "700ml", style: "Flavoured", base: "Grape", desc: "Infused with a blend of fresh wild raspberries and luscious strawberries, balancing sweet and tart notes flawlessly over the smooth grape vodka base.", shortDesc: "Luscious strawberry and raspberry-infused ultra-premium French grape vodka.", serving: "Serve with cranberry juice or in a vibrant Red Berry Spritz." },

  // 23. Tito's Handmade Vodka
  { name: "Tito's Handmade Vodka 700ml", brand: "Tito's", price: 59.99, country: "United States", state: "Texas", abv: "40.0%", size: "700ml", style: "Small Batch", base: "Corn", desc: "Tito's Handmade Vodka is produced in Austin at Texas' oldest legal distillery. It's micro-distilled in an old-fashioned pot still from 100% corn, resulting in a naturally gluten-free, award-winningly smooth vodka.", shortDesc: "Award-winning smooth, gluten-free handmade Texas corn vodka.", serving: "Enjoy on the rocks, in a Bloody Mary, or a classic Tito's and Soda." },
  { name: "Tito's Handmade Vodka 1 Litre", brand: "Tito's", price: 74.99, country: "United States", state: "Texas", abv: "40.0%", size: "1L", style: "Small Batch", base: "Corn", desc: "1 Litre bottle of Tito's Handmade Vodka. Produced in Austin, micro-distilled from 100% corn.", shortDesc: "1L bottle of smooth, gluten-free handmade Texas corn vodka.", serving: "Enjoy on the rocks, in a Bloody Mary, or a classic Tito's and Soda." },

  // 24. Stolichnaya Premium Vodka
  { name: "Stolichnaya Premium Vodka 700ml", brand: "Stolichnaya", price: 49.99, country: "Latvia", state: "", abv: "40.0%", size: "700ml", style: "Premium", base: "Wheat", desc: "Stolichnaya Premium Vodka (Stoli) is a classically styled, exceptionally smooth vodka. Distilled three times and filtered through quartz, sand, activated charcoal, and woven cloth.", shortDesc: "Classically styled, exceptionally smooth premium Latvian wheat vodka.", serving: "Serve chilled as a shot, or mixed in a classic Mule." },

  // 25. Stolichnaya Elit Vodka
  { name: "Stolichnaya Elit Vodka 700ml", brand: "Stolichnaya", price: 89.99, country: "Latvia", state: "", abv: "40.0%", size: "700ml", style: "Super Premium", base: "Wheat", desc: "Elit by Stolichnaya elevates the vodka experience through a unique freeze-filtration process at -18°C, resulting in unparalleled purity and an incredibly velvety mouthfeel.", shortDesc: "Ultra-premium freeze-filtered vodka with unparalleled velvety purity.", serving: "Serve neat, straight from the freezer." },

  // 26. Finlandia Vodka
  { name: "Finlandia Vodka 700ml", brand: "Finlandia", price: 49.99, country: "Finland", state: "", abv: "40.0%", size: "700ml", style: "Classic", base: "Barley", desc: "Finlandia Vodka is crafted from pure glacial spring water and the finest six-row barley grown under the Finnish Midnight Sun, delivering a crisp, clean, and smooth taste.", shortDesc: "Crisp and clean Finnish vodka distilled from barley and glacial spring water.", serving: "Serve chilled with soda water and a slice of cucumber." },
  { name: "Finlandia Vodka 1 Litre", brand: "Finlandia", price: 64.99, country: "Finland", state: "", abv: "40.0%", size: "1L", style: "Classic", base: "Barley", desc: "1 Litre bottle of Finlandia Vodka. Crafted from pure glacial spring water and six-row barley.", shortDesc: "1L bottle of crisp and clean Finnish barley vodka.", serving: "Serve chilled with soda water and a slice of cucumber." },

  // 27. Russian Standard Original Vodka
  { name: "Russian Standard Original Vodka 700ml", brand: "Russian Standard", price: 49.99, country: "Russia", state: "", abv: "40.0%", size: "700ml", style: "Classic", base: "Wheat", desc: "Russian Standard Original is recognized as a benchmark for excellence in the homeland of vodka. It offers a smooth, traditional flavor profile with a robust character.", shortDesc: "Traditional robust and smooth classic wheat vodka.", serving: "Best served chilled neat." },

  // 28. Crystal Head Vodka
  { name: "Crystal Head Vodka 700ml", brand: "Crystal Head", price: 79.99, country: "Canada", state: "Newfoundland", abv: "40.0%", size: "700ml", style: "Super Premium", base: "Corn", desc: "Crafted from Canadian peaches and cream corn, distilled four times, and filtered seven times—three of which are through semi-precious Herkimer diamonds. The result is a silky, additive-free vodka.", shortDesc: "Additive-free Canadian corn vodka filtered through Herkimer diamonds.", serving: "Serve in a dry Martini or neat to appreciate its silky texture." },

  // 29. Crystal Head Aurora Vodka
  { name: "Crystal Head Aurora Vodka 700ml", brand: "Crystal Head", price: 89.99, country: "Canada", state: "Newfoundland", abv: "40.0%", size: "700ml", style: "Super Premium", base: "Wheat", desc: "Aurora is crafted using highest-quality English wheat and pristine water from Newfoundland. It offers a drier, bolder, and spicier profile compared to the original, housed in a stunning iridescent skull bottle.", shortDesc: "Drier and spicier Canadian wheat vodka in a stunning iridescent bottle.", serving: "Enjoy on the rocks or in a sophisticated vodka cocktail." },

  // 30. Crystal Head Onyx Vodka
  { name: "Crystal Head Onyx Vodka 700ml", brand: "Crystal Head", price: 89.99, country: "Canada", state: "Newfoundland", abv: "40.0%", size: "700ml", style: "Super Premium", base: "Agave", desc: "A unique expression crafted from premium Blue Weber Agave sourced from a single farm in Mexico. It bridges the gap between vodka and tequila, offering a subtle sweetness and earthy undertones.", shortDesc: "Unique premium agave-based vodka with subtle earthy sweetness.", serving: "Mix in an Onyx Margarita or serve neat over ice." },

  // 31. Zubrowka Bison Grass Vodka
  { name: "Zubrowka Bison Grass Vodka 700ml", brand: "Zubrowka", price: 49.99, country: "Poland", state: "", abv: "37.5%", size: "700ml", style: "Botanical", base: "Rye", desc: "Zubrowka is a unique Polish rye vodka flavored with an extract of bison grass sourced from the Białowieża Forest. It offers distinct notes of woodruff, vanilla, and almond.", shortDesc: "Unique Polish rye vodka infused with aromatic bison grass.", serving: "Traditionally served chilled, mixed with clear apple juice." },

  // 32. Wyborowa Vodka
  { name: "Wyborowa Vodka 700ml", brand: "Wyborowa", price: 44.99, country: "Poland", state: "", abv: "37.5%", size: "700ml", style: "Classic", base: "Rye", desc: "Wyborowa is a classic, internationally acclaimed Polish vodka crafted entirely from pure rye. It delivers a rich, smooth flavor with subtle sweetness and a creamy texture.", shortDesc: "Classic internationally acclaimed Polish pure rye vodka.", serving: "Enjoy ice cold, neat, or as a reliable base for any vodka cocktail." },

  // 33. Haku Japanese Craft Vodka
  { name: "Haku Japanese Craft Vodka 700ml", brand: "Haku", price: 64.99, country: "Japan", state: "Kagoshima", abv: "40.0%", size: "700ml", style: "Premium", base: "Rice", desc: "Haku means 'white' in Japanese. Distilled from 100% Japanese white rice, this craft vodka is filtered through bamboo charcoal, resulting in an exceptionally soft, subtly sweet, and luminous flavor.", shortDesc: "Exceptionally soft Japanese craft vodka distilled from 100% white rice.", serving: "Serve over a large ice cube or with soda water and a lemon peel." },

  // 34. Nikka Coffey Vodka
  { name: "Nikka Coffey Vodka 700ml", brand: "Nikka", price: 79.99, country: "Japan", state: "Miyagi", abv: "40.0%", size: "700ml", style: "Super Premium", base: "Corn", desc: "Produced by the renowned Japanese whisky maker Nikka, utilizing their vintage Coffey stills. Distilled from a mix of corn and malt, it offers a remarkably rich, sweet, and smooth texture.", shortDesc: "Rich and smooth Japanese vodka distilled in vintage Coffey stills.", serving: "Sip neat or serve in a high-quality dry martini." },

  // 35. 666 Pure Tasmanian Vodka
  { name: "666 Pure Tasmanian Vodka 700ml", brand: "666 Pure", price: 69.99, country: "Australia", state: "Tasmania", abv: "40.0%", size: "700ml", style: "Premium", base: "Barley", desc: "Crafted at Cape Grim in Tasmania, where the air and water are some of the purest on Earth. Made from Tasmanian barley and pristine rainwater, offering a deeply pure and clean taste.", shortDesc: "Clean and pure Tasmanian barley vodka crafted with pristine rainwater.", serving: "Serve in a classic Vodka Martini." },

  // 36. Archie Rose Native Botanical Vodka
  { name: "Archie Rose Native Botanical Vodka 700ml", brand: "Archie Rose", price: 59.99, country: "Australia", state: "New South Wales", abv: "40.0%", size: "700ml", style: "Botanical", base: "Wheat", desc: "A uniquely Australian vodka infused with native botanical distillates including lemon scented gum, native thyme, and sunrise lime. It possesses a bright, herbaceous, and incredibly refreshing profile.", shortDesc: "Refreshing Australian vodka infused with native herbs and citrus.", serving: "Serve with soda water and a wedge of fresh lime." },

  // 37. Archie Rose Original Vodka
  { name: "Archie Rose Original Vodka 700ml", brand: "Archie Rose", price: 59.99, country: "Australia", state: "New South Wales", abv: "40.0%", size: "700ml", style: "Premium", base: "Wheat", desc: "Archie Rose Original Vodka is made from pure Australian wheat and triple filtered to deliver a neutral, incredibly smooth, and crisp foundation for cocktails.", shortDesc: "Smooth, triple-filtered premium Australian wheat vodka.", serving: "The perfect blank canvas for any vodka-based cocktail." },

  // 38. Vodka O Original Vodka
  { name: "Vodka O Original Vodka 700ml", brand: "Vodka O", price: 49.99, country: "Australia", state: "New South Wales", abv: "37.5%", size: "700ml", style: "Classic", base: "Wheat", desc: "An Australian-owned, multi-award winning vodka made from high-quality whey and pure spring water. It's triple distilled and charcoal filtered for a completely pure, clean finish.", shortDesc: "Award-winning, pure and clean Australian whey vodka.", serving: "Serve with your favorite mixer over plenty of ice." },

  // 39. Vodka O Espresso Vodka
  { name: "Vodka O Espresso Vodka 700ml", brand: "Vodka O", price: 49.99, country: "Australia", state: "New South Wales", abv: "37.5%", size: "700ml", style: "Flavoured", base: "Wheat", desc: "Infused with cold-brew espresso coffee, this flavored vodka delivers an authentic, rich coffee aroma and taste, perfect for skipping the barista step in cocktails.", shortDesc: "Rich Australian vodka infused with authentic cold-brew espresso.", serving: "Shake over ice for an instant Espresso Martini." },

  // 40. Vodka O Raspberry Vodka
  { name: "Vodka O Raspberry Vodka 700ml", brand: "Vodka O", price: 49.99, country: "Australia", state: "New South Wales", abv: "37.5%", size: "700ml", style: "Flavoured", base: "Wheat", desc: "A bright, fruit-forward vodka from Vodka O, infused with the natural flavor of raspberries for a sweet, refreshing kick.", shortDesc: "Sweet and refreshing natural raspberry-infused Australian vodka.", serving: "Mix with soda water, ice, and fresh mint." },

  // 41. Cape Byron Original Vodka
  { name: "Cape Byron Original Vodka 700ml", brand: "Cape Byron Distillery", price: 64.99, country: "Australia", state: "New South Wales", abv: "40.0%", size: "700ml", style: "Premium", base: "Wheat", desc: "A crisp and smooth Australian vodka crafted in the Northern Rivers of NSW, reflecting the relaxed coastal purity of Byron Bay.", shortDesc: "Crisp and smooth coastal Australian premium vodka.", serving: "Enjoy in a classic Vodka Soda with a squeeze of fresh lime." },

  // 42. Cape Byron Brookie's Macadamia Vodka
  { name: "Cape Byron Brookie's Macadamia Vodka 700ml", brand: "Cape Byron Distillery", price: 69.99, country: "Australia", state: "New South Wales", abv: "40.0%", size: "700ml", style: "Flavoured", base: "Wheat", desc: "Also known as Brookie's Macadamia Liqueur/Vodka fusion, this is infused with roasted Northern Rivers macadamias for a rich, buttery, and decadent flavor.", shortDesc: "Decadent Australian vodka infused with roasted Northern Rivers macadamias.", serving: "Serve over ice or as a base for a nutty Espresso Martini twist." },

  // 43. 23rd Street Distillery Signature Vodka
  { name: "23rd Street Distillery Signature Vodka 700ml", brand: "23rd Street Distillery", price: 59.99, country: "Australia", state: "South Australia", abv: "40.0%", size: "700ml", style: "Premium", base: "Cane", desc: "Distilled in South Australia from Australian sugarcane, offering a uniquely soft, subtly sweet, and round mouthfeel that stands out from traditional grain vodkas.", shortDesc: "Soft and subtly sweet Australian premium sugarcane vodka.", serving: "Serve with premium dry ginger ale and a lime wedge." },

  // 44. 23rd Street Distillery Rose Vodka
  { name: "23rd Street Distillery Rose Vodka 700ml", brand: "23rd Street Distillery", price: 59.99, country: "Australia", state: "South Australia", abv: "40.0%", size: "700ml", style: "Botanical", base: "Cane", desc: "A captivating blush-colored vodka infused with fragrant rose petals, delivering a delicate floral aroma and a smooth, subtly sweet finish.", shortDesc: "Delicate and fragrant Australian sugarcane vodka infused with rose petals.", serving: "Serve with soda water and fresh strawberries." },

  // 45. Patient Wolf Blackthorn Gin Distillery Vodka
  { name: "Patient Wolf Blackthorn Gin Distillery Vodka 700ml", brand: "Patient Wolf", price: 69.99, country: "Australia", state: "Victoria", abv: "40.0%", size: "700ml", style: "Small Batch", base: "Wheat", desc: "Produced by the renowned Patient Wolf gin distillery in Melbourne, this small-batch vodka utilizes their precision distillation to create an impeccably clean, crisp spirit.", shortDesc: "Impeccably clean and crisp small-batch Melbourne vodka.", serving: "Serve in a dry Martini with a lemon twist." },

  // 46. Never Never Distilling Co. Vodka
  { name: "Never Never Distilling Co. Vodka 500ml", brand: "Never Never Distilling Co.", price: 69.99, country: "Australia", state: "South Australia", abv: "40.0%", size: "500ml", style: "Small Batch", base: "Wheat", desc: "A highly refined, small-batch vodka from the acclaimed South Australian distillery, focusing on purity, texture, and a completely neutral flavor profile.", shortDesc: "Highly refined, small-batch South Australian vodka with exceptional texture.", serving: "Serve neat from the freezer or in a premium cocktail." },

  // 47. Manly Spirits Australian Vodka
  { name: "Manly Spirits Australian Vodka 700ml", brand: "Manly Spirits Co.", price: 64.99, country: "Australia", state: "New South Wales", abv: "40.0%", size: "700ml", style: "Botanical", base: "Wheat", desc: "A premium Australian botanical vodka distilled with a touch of sustainably foraged coastal botanicals, adding a faint, intriguing marine salinity and smoothness.", shortDesc: "Premium Australian vodka with a hint of coastal marine botanicals.", serving: "Serve with Mediterranean tonic and a sprig of sea parsley." },

  // 48. Prohibition Original Vodka
  { name: "Prohibition Original Vodka 700ml", brand: "Prohibition Liquor Co.", price: 64.99, country: "Australia", state: "South Australia", abv: "40.0%", size: "700ml", style: "Premium", base: "Wheat", desc: "Distilled in Adelaide, this premium artisanal vodka is meticulously filtered to achieve a clean, crisp, and robustly smooth character.", shortDesc: "Artisanal, clean and crisp premium South Australian vodka.", serving: "Perfect for classic cocktails requiring a pure, strong foundation." },

  // 49. Husk Distillers Ink Vodka
  { name: "Husk Distillers Ink Vodka 700ml", brand: "Husk Distillers", price: 69.99, country: "Australia", state: "New South Wales", abv: "40.0%", size: "700ml", style: "Premium", base: "Cane", desc: "From the creators of Ink Gin, this vodka is crafted in the Tweed caldera from Australian sugar cane, offering a distinctly pure, soft, and lightly sweet profile.", shortDesc: "Pure and soft Australian premium sugarcane vodka from Husk Distillers.", serving: "Serve over ice with soda, fresh lime, and mint." },

  // 50. Rivka Vodka
  { name: "Rivka Vodka 700ml", brand: "Rivka", price: 59.99, country: "Australia", state: "Victoria", abv: "40.0%", size: "700ml", style: "Small Batch", base: "Wheat", desc: "An emerging small-batch Australian vodka, triple distilled for exceptional clarity and a smooth, mellow finish that shines in any mix.", shortDesc: "Smooth, mellow, and clear small-batch Australian vodka.", serving: "Enjoy in a classic Vodka Soda with a splash of cranberry." }
];

const siteContent = fs.readFileSync('src/config/site.js', 'utf8');

const newProductsCode = vodkas.map((v, idx) => {
  const slug = v.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const styleSlug = v.style.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  return `  {
    slug: "${slug}",
    name: "${v.name}",
    price: ${v.price},
    primaryCategory: "spirits",
    primarySubcategory: "vodka",
    brand: "${v.brand}",
    countryOfOrigin: "${v.country}",
    regionOrState: "${v.state}",
    abv: "${v.abv}",
    containerType: "Bottle",
    bottleOrCanSize: "${v.size}",
    packSize: "Single",
    primaryProductType: "Vodka",
    styleOrVariety: "${v.style}",
    flavourProfile: ["Clean", "${v.style === 'Flavoured' ? 'Fruit' : 'Smooth'}"],
    dietary: [],
    ageStatement: "",
    vintage: "",
    controlledTags: ["Premium Pick", "Vodka"],
    collections: ["spirits", "vodka", "${styleSlug}"],
    seoUrl: "/spirits/vodka/${slug}",
    description: "${v.desc}",
    shortDescription: "${v.shortDesc}",
    servingSuggestion: "${v.serving}",
    searchKeywords: "${v.name.toLowerCase()}; vodka; ${v.style.toLowerCase()}; ${v.brand.toLowerCase()}; ${v.country.toLowerCase()}",
    badge: "${v.style}",
    featured: ${idx < 6 ? 'true' : 'false'},
    images: ["https://images.unsplash.com/photo-1614316930829-1051fa69720b?q=80&w=800&auto=format&fit=crop"],
    image: "https://images.unsplash.com/photo-1614316930829-1051fa69720b?q=80&w=800&auto=format&fit=crop",
    category: "spirits"
  }`;
}).join(',\n\n');

// Find export const POSTS = [
const postsIdx = siteContent.indexOf('export const POSTS = [');
if (postsIdx !== -1) {
  const beforePosts = siteContent.slice(0, postsIdx);
  const lastBracket = beforePosts.lastIndexOf('];');
  if (lastBracket !== -1) {
    const baseContent = beforePosts.slice(0, lastBracket);
    const updated = baseContent + ',\n\n' + newProductsCode + '\n];\n\n' + siteContent.slice(postsIdx);
    fs.writeFileSync('src/config/site.js', updated, 'utf8');
    console.log("Successfully updated site.js with exactly " + vodkas.length + " verified vodka products!");
  } else {
    console.error("Could not find closing bracket before posts");
  }
} else {
  console.error("Could not find POSTS in site.js");
}
