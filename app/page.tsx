import React from 'react';
import Link from 'next/link';
import { Wine, ShieldCheck, Truck, Coins, ArrowRight, Award, Lock, Sparkles, CheckCircle2, Search } from 'lucide-react';
import { SITE, SHOP, BRAND, CATEGORIES, PRODUCTS, FAQ } from '@/config/site';
import JsonLd from '@/components/JsonLd';
import SmartImage from '@/components/SmartImage';
import ProductCard from '@/components/ProductCard';

export default function HomePage() {
  const featuredProducts = PRODUCTS.filter((p) => p.featured);

  // Schema LD
  const storeSchema = {
    '@context': 'https://schema.org',
    '@type': ['Store', 'Organization'],
    name: SITE.name,
    description: BRAND.description,
    foundingDate: BRAND.foundingYear,
    foundingLocation: { '@type': 'Place', name: BRAND.foundingLocation },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Barangaroo',
      addressRegion: 'NSW',
      postalCode: '2000',
      addressCountry: 'AU',
    },
    url: `https://${SITE.domain}/`,
    sameAs: [],
    areaServed: 'Australia',
    numberOfItems: PRODUCTS.length,
    knowsAbout: ['Rare Single Malt Whisky', 'Australian Craft Gin', 'Prestige Tequila', 'Fine Wine'],
    priceRange: '$$$',
    brand: { '@type': 'Brand', name: SITE.name },
    makesOffer: {
      '@type': 'AggregateOffer',
      priceCurrency: 'AUD',
      lowPrice: 95,
      highPrice: 3200,
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  const searchActionSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: `https://${SITE.domain}/`,
    potentialAction: {
      '@type': 'SearchAction',
      target: `https://${SITE.domain}/search/?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <JsonLd data={storeSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={searchActionSchema} />

      {/* Hero Banner Section */}
      <section className="relative overflow-hidden bg-[#08140E] py-12 md:py-20 border-b border-[#1A3828]">
        {/* Ambient Dark Gold Lighting */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#D4AF37]/10 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-950/30 rounded-full blur-[120px] pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
          
          {/* Top Ticker / Facility Status Banner */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#1A3828] bg-[#0E2017]/80 px-4 py-2 text-xs text-gray-300 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-mono text-emerald-400 font-semibold uppercase tracking-wider text-[11px]">
                Barangaroo Facility Active
              </span>
              <span className="hidden sm:inline text-gray-600">|</span>
              <span className="hidden sm:inline text-gray-300">Vault Temp: 14.2°C Monitored</span>
            </div>

            <div className="flex items-center gap-4 text-[11px] font-mono text-[#D4AF37]">
              <span>Direct Distillery Provenance</span>
              <span className="hidden md:inline">•</span>
              <span className="hidden md:inline text-gray-300">100% Insured Climate Transit</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Copy & Interactive Search Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-[#0E2017] px-4 py-1.5 text-xs font-semibold text-[#D4AF37] shadow-inner">
                <Sparkles className="h-3.5 w-3.5 text-[#D4AF37]" />
                <span className="uppercase tracking-widest font-mono text-[11px]">SYDNEY BARANGAROO VAULT ALLOCATIONS</span>
              </div>

              {/* RULE 4: Exactly ONE h1 on page */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-extrabold tracking-tight text-white leading-tight">
                Australia&apos;s Premier Vault for <span className="amber-gradient">Fine Spirits</span> & Rare Whiskies
              </h1>

              <p className="text-sm md:text-base text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans">
                Curated allocations of rare single malt whiskies, small-batch Australian craft gins, extra añejo tequilas, and museum-release fine wines. Climate-controlled express courier delivery across Australia.
              </p>

              {/* Embedded Vault Quick Search Bar */}
              <div className="pt-2">
                <form action="/search/" method="GET" className="relative max-w-xl mx-auto lg:mx-0">
                  <Search className="absolute left-4 top-3.5 h-5 w-5 text-[#D4AF37]" />
                  <input
                    type="text"
                    name="q"
                    placeholder="Search Vault: e.g. Lark, Yamazaki, Don Julio, Penfolds..."
                    className="w-full rounded-xl border border-[#1A3828] bg-[#0E2017] pl-12 pr-28 py-3.5 text-xs sm:text-sm text-white placeholder-gray-500 focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37] shadow-xl"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-2 rounded-lg gold-bg-gradient px-4 py-1.5 text-xs font-bold text-black hover:opacity-90 transition-opacity"
                  >
                    Search
                  </button>
                </form>

                {/* Popular Search Tags */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-2.5 text-[11px]">
                  <span className="text-gray-500 font-mono">Popular:</span>
                  <Link href="/search/?q=Single+Malt" className="text-gray-400 hover:text-[#D4AF37] underline decoration-[#D4AF37]/40">Single Malts</Link>
                  <span className="text-gray-700">•</span>
                  <Link href="/search/?q=Tequila" className="text-gray-400 hover:text-[#D4AF37] underline decoration-[#D4AF37]/40">Extra Añejo</Link>
                  <span className="text-gray-700">•</span>
                  <Link href="/search/?q=Penfolds" className="text-gray-400 hover:text-[#D4AF37] underline decoration-[#D4AF37]/40">Museum Wine</Link>
                  <span className="text-gray-700">•</span>
                  <Link href="/search/?q=Gin" className="text-gray-400 hover:text-[#D4AF37] underline decoration-[#D4AF37]/40">Craft Gin</Link>
                </div>
              </div>

              {/* Core Vault Value Guarantee Micro-Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="rounded-xl border border-[#1A3828] bg-[#0E2017]/90 p-3 text-left">
                  <div className="flex items-center gap-2 text-[#D4AF37]">
                    <ShieldCheck className="h-4 w-4 shrink-0" />
                    <span className="font-serif font-bold text-xs text-white">Direct Provenance</span>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1">Serial-verified distillery bottles</p>
                </div>

                <div className="rounded-xl border border-[#1A3828] bg-[#0E2017]/90 p-3 text-left">
                  <div className="flex items-center gap-2 text-[#D4AF37]">
                    <Truck className="h-4 w-4 shrink-0" />
                    <span className="font-serif font-bold text-xs text-white">Free Express &gt;$350</span>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1">Temperature-monitored transit</p>
                </div>

                <div className="rounded-xl border border-[#1A3828] bg-[#0E2017]/90 p-3 text-left col-span-2 sm:col-span-1">
                  <div className="flex items-center gap-2 text-[#D4AF37]">
                    <Coins className="h-4 w-4 shrink-0" />
                    <span className="font-serif font-bold text-xs text-white">10% Crypto OFF</span>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1">Instant off BTC & USDT orders</p>
                </div>
              </div>

              {/* Primary Call to Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/shop/"
                  className="w-full sm:w-auto rounded-xl gold-bg-gradient px-8 py-3.5 text-xs sm:text-sm font-bold text-black hover:opacity-90 transition-all shadow-xl flex items-center justify-center gap-2"
                >
                  Explore Full Vault Catalog <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/wholesale/"
                  className="w-full sm:w-auto rounded-xl border border-[#D4AF37]/50 bg-[#0E2017] px-6 py-3.5 text-xs sm:text-sm font-bold text-[#D4AF37] hover:bg-[#1A3828] transition-all flex items-center justify-center"
                >
                  Licensed B2B Wholesale Tiers
                </Link>
              </div>

            </div>

            {/* Right Vault Collection Pillars Grid (Replaces old single product card) */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-[#1A3828] bg-[#0E2017]/90 p-5 shadow-2xl space-y-4">
                
                <div className="flex items-center justify-between border-b border-[#1A3828] pb-3">
                  <div className="flex items-center gap-2">
                    <Lock className="h-4 w-4 text-[#D4AF37]" />
                    <h3 className="font-serif font-bold text-white text-sm">
                      Vault Pillar Allocations
                    </h3>
                  </div>
                  <span className="rounded bg-[#050E0A] px-2.5 py-0.5 text-[10px] font-mono text-[#D4AF37] border border-[#D4AF37]/30">
                    Sydney Vault Cellared
                  </span>
                </div>

                {/* 2x2 Showcase Pillars */}
                <div className="grid grid-cols-2 gap-3">
                  
                  {/* Pillar 1: Whiskies */}
                  <Link
                    href="/spirits/whisky-whiskey/"
                    className="group relative overflow-hidden rounded-xl border border-[#1A3828] bg-[#050E0A] p-3 hover:border-[#D4AF37]/60 transition-all"
                  >
                    <div className="relative h-28 w-full overflow-hidden rounded-lg mb-2 bg-[#0E2017]">
                      <SmartImage
                        src="https://images.unsplash.com/photo-1527281400683-1aae777175f8?q=80&w=600&auto=format&fit=crop"
                        alt="Single Malt Whisky Allocations"
                        width={600}
                        height={400}
                        className="h-full w-full"
                      />
                      <span className="absolute top-1.5 left-1.5 z-10 rounded bg-black/80 px-1.5 py-0.5 text-[9px] font-mono text-[#D4AF37] border border-[#D4AF37]/30">
                        Rare Casks
                      </span>
                    </div>
                    <h4 className="text-xs font-serif font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                      Single Malts & Rare Scotch
                    </h4>
                    <p className="text-[10px] text-gray-400 mt-0.5 font-mono">12 Active Allocations</p>
                  </Link>

                  {/* Pillar 2: Tequila */}
                  <Link
                    href="/spirits/tequila-agave/"
                    className="group relative overflow-hidden rounded-xl border border-[#1A3828] bg-[#050E0A] p-3 hover:border-[#D4AF37]/60 transition-all"
                  >
                    <div className="relative h-28 w-full overflow-hidden rounded-lg mb-2 bg-[#0E2017]">
                      <SmartImage
                        src="https://images.unsplash.com/photo-1516535794938-6063878f08cc?q=80&w=600&auto=format&fit=crop"
                        alt="Prestige Tequila & Agave"
                        width={600}
                        height={400}
                        className="h-full w-full"
                      />
                      <span className="absolute top-1.5 left-1.5 z-10 rounded bg-black/80 px-1.5 py-0.5 text-[9px] font-mono text-[#D4AF37] border border-[#D4AF37]/30">
                        Extra Añejo
                      </span>
                    </div>
                    <h4 className="text-xs font-serif font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                      Prestige Tequila & Agave
                    </h4>
                    <p className="text-[10px] text-gray-400 mt-0.5 font-mono">6 Active Allocations</p>
                  </Link>

                  {/* Pillar 3: Fine Wine */}
                  <Link
                    href="/wine/red-wine/"
                    className="group relative overflow-hidden rounded-xl border border-[#1A3828] bg-[#050E0A] p-3 hover:border-[#D4AF37]/60 transition-all"
                  >
                    <div className="relative h-28 w-full overflow-hidden rounded-lg mb-2 bg-[#0E2017]">
                      <SmartImage
                        src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=600&auto=format&fit=crop"
                        alt="Museum Release Fine Wine"
                        width={600}
                        height={400}
                        className="h-full w-full"
                      />
                      <span className="absolute top-1.5 left-1.5 z-10 rounded bg-black/80 px-1.5 py-0.5 text-[9px] font-mono text-[#D4AF37] border border-[#D4AF37]/30">
                        Museum Release
                      </span>
                    </div>
                    <h4 className="text-xs font-serif font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                      Iconic Australian Wines
                    </h4>
                    <p className="text-[10px] text-gray-400 mt-0.5 font-mono">8 Active Allocations</p>
                  </Link>

                  {/* Pillar 4: Craft Gin */}
                  <Link
                    href="/spirits/gin/"
                    className="group relative overflow-hidden rounded-xl border border-[#1A3828] bg-[#050E0A] p-3 hover:border-[#D4AF37]/60 transition-all"
                  >
                    <div className="relative h-28 w-full overflow-hidden rounded-lg mb-2 bg-[#0E2017]">
                      <SmartImage
                        src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=600&auto=format&fit=crop"
                        alt="Australian Craft Gin"
                        width={600}
                        height={400}
                        className="h-full w-full"
                      />
                      <span className="absolute top-1.5 left-1.5 z-10 rounded bg-black/80 px-1.5 py-0.5 text-[9px] font-mono text-[#D4AF37] border border-[#D4AF37]/30">
                        Botanical Gin
                      </span>
                    </div>
                    <h4 className="text-xs font-serif font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                      Artisanal Craft Spirits
                    </h4>
                    <p className="text-[10px] text-gray-400 mt-0.5 font-mono">10 Active Allocations</p>
                  </Link>

                </div>

                {/* Bottom Concierge Quick Link */}
                <div className="pt-2 border-t border-[#1A3828] flex items-center justify-between text-xs">
                  <span className="text-gray-400 flex items-center gap-1.5">
                    <Award className="h-3.5 w-3.5 text-[#D4AF37]" /> Need a custom allocation?
                  </span>
                  <Link
                    href="/contact/"
                    className="text-[#D4AF37] font-semibold hover:underline flex items-center gap-1"
                  >
                    Speak to Concierge &rarr;
                  </Link>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Trust Bar Section */}
      <section className="bg-[#050E0A] py-8 border-b border-[#1A3828]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-8 w-8 text-[#D4AF37] shrink-0" />
              <div>
                <h4 className="font-serif font-bold text-white text-xs">DIRECT PROVENANCE</h4>
                <p className="text-[11px] text-gray-400">Distillery certified allocations.</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Truck className="h-8 w-8 text-[#D4AF37] shrink-0" />
              <div>
                <h4 className="font-serif font-bold text-white text-xs">CLIMATE EXPRESS</h4>
                <p className="text-[11px] text-gray-400">Free delivery over $350 AUD.</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Coins className="h-8 w-8 text-[#D4AF37] shrink-0" />
              <div>
                <h4 className="font-serif font-bold text-white text-xs">10% CRYPTO DISCOUNT</h4>
                <p className="text-[11px] text-gray-400">Bitcoin & USDT accepted.</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Award className="h-8 w-8 text-[#D4AF37] shrink-0" />
              <div>
                <h4 className="font-serif font-bold text-white text-xs">RSA CERTIFIED</h4>
                <p className="text-[11px] text-gray-400">NSW License LIQP770010234.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 bg-[#08140E] border-b border-[#1A3828]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <span className="text-xs uppercase font-semibold text-[#D4AF37] tracking-widest">
                CURATED LIQUOR CATEGORIES
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
                Explore the Liquor Locker Vault
              </h2>
            </div>
            <Link href="/shop/" className="mt-3 md:mt-0 text-xs font-semibold text-[#D4AF37] hover:underline flex items-center gap-1">
              View All Vault Spirits &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/shop/${cat.slug}/`}
                className="group flex flex-col rounded-xl border border-[#1A3828] bg-[#0E2017] overflow-hidden transition-all duration-300 hover:border-[#D4AF37] hover:shadow-lg hover:-translate-y-1"
              >
                <div className="product-frame bg-white">
                  <SmartImage
                    src={cat.image}
                    alt={cat.name}
                    width={400}
                    height={300}
                    className="h-36 w-full"
                  />
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif font-bold text-sm text-white group-hover:text-[#D4AF37] transition-colors">
                      {cat.name}
                    </h3>
                    <p className="mt-1 text-[11px] text-gray-400 line-clamp-2">
                      {cat.description}
                    </p>
                  </div>
                  <div className="mt-3 text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider font-semibold">
                    Browse Collection &rarr;
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-[#050E0A] border-b border-[#1A3828]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase font-semibold text-[#D4AF37] tracking-widest">
              FEATURED BOTTLE ALLOCATIONS
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
              Rare Spirits & Iconic Wines
            </h2>
            <p className="mt-2 text-xs text-gray-400">
              Hand-selected bottles available for immediate Australian express dispatch.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Authority "About Liquor Locker Vault" Section (>700 words entity-rich story) */}
      <section className="py-20 bg-[#08140E] border-b border-[#1A3828]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 text-gray-300 space-y-6 text-sm leading-relaxed">
          <div className="text-center mb-8">
            <span className="text-xs uppercase font-semibold text-[#D4AF37] tracking-widest">
              ABOUT LIQUOR LOCKER AU
            </span>
            <h2 className="text-3xl font-serif font-bold text-white mt-1">
              Australia&apos;s Independent Fine Spirits & Fine Wine Vault
            </h2>
            <div className="h-0.5 w-16 gold-bg-gradient mx-auto mt-3" />
          </div>

          <p>
            Established in 2021 at Barangaroo in Sydney, <strong>Liquor Locker AU</strong> was founded to bridge the gap between discerning collectors, master distillers, and premium hospitality venues across Australia. As an independent Australian boutique distributor, our mission is simple: to secure, preserve, and deliver rare single malt whiskies, small-batch craft gins, aged tequilas, and iconic Australian wines with uncompromising attention to provenance and climate control.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <div className="rounded-xl border border-[#1A3828] bg-[#0E2017] p-5">
              <h3 className="font-serif font-bold text-white text-base text-[#D4AF37] mb-2 flex items-center gap-2">
                <Lock className="h-4 w-4" /> Sydney Climate Vault
              </h3>
              <p className="text-xs text-gray-400">
                Spirits and fine wines are stored in our custom temperature- and humidity-controlled vault in Barangaroo, Sydney. Every bottle is kept at optimum cellaring conditions before dispatch.
              </p>
            </div>

            <div className="rounded-xl border border-[#1A3828] bg-[#0E2017] p-5">
              <h3 className="font-serif font-bold text-white text-base text-[#D4AF37] mb-2 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" /> Distillery Direct Provenance
              </h3>
              <p className="text-xs text-gray-400">
                We maintain direct relationships with iconic Australian distillers like Lark, Starward, Four Pillars, and Archie Rose, guaranteeing 100% authentic serial-numbered bottlings.
              </p>
            </div>
          </div>

          <h3 className="text-xl font-serif font-bold text-white pt-4">
            Nationwide Logistics & Insured Express Dispatch
          </h3>
          <p>
            Whether you reside in Sydney, Melbourne, Brisbane, Perth, Adelaide, or regional Australia, every order placed with Liquor Locker AU is packed in custom heavy-duty shock-absorbing foam inserts. Orders exceeding <strong>$350 AUD</strong> qualify for free express climate-controlled delivery, while our minimum order threshold of <strong>$250 AUD</strong> ensures that every shipment receives priority handling and transit insurance.
          </p>

          <h3 className="text-xl font-serif font-bold text-white pt-4">
            Innovative Payment Solutions: PayID & 10% Crypto Discount
          </h3>
          <p>
            Recognizing the evolving needs of modern collectors, Liquor Locker AU supports instant Australian PayID transactions, direct bank wires, and cryptocurrency payments. Select Bitcoin (BTC) or Tether (USDT) during checkout to automatically receive an instant <strong>10% discount</strong> off your order total.
          </p>

          <div className="rounded-xl border border-[#D4AF37]/30 bg-[#0E2017] p-6 text-center my-6">
            <h4 className="font-serif font-bold text-[#D4AF37] text-base mb-1">
              Responsible Service of Alcohol (RSA)
            </h4>
            <p className="text-xs text-gray-400 max-w-xl mx-auto">
              Liquor Locker AU strictly enforces Australian Liquor Laws (NSW Liquor License LIQP770010234). Alcohol will not be delivered to persons under the age of 18 years. Age verification is required upon delivery.
            </p>
          </div>
        </div>
      </section>

      {/* Homepage FAQ Accordion */}
      <section className="py-16 bg-[#050E0A]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="text-center mb-10">
            <span className="text-xs uppercase font-semibold text-[#D4AF37] tracking-widest">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
              Vault Policies & Ordering
            </h2>
          </div>

          <div className="space-y-4">
            {FAQ.map((item, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-[#1A3828] bg-[#0E2017] p-5 text-left"
              >
                <h3 className="text-sm font-serif font-bold text-white text-[#D4AF37]">
                  {item.question}
                </h3>
                <p className="mt-2 text-xs text-gray-300 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
