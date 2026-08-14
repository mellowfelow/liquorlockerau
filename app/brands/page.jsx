import React from 'react';
import Link from 'next/link';
import { SITE, CATEGORIES, PRODUCTS } from '@/config/site';
import { BRANDS_DATA } from '@/config/brands';
import JsonLd from '@/components/JsonLd';
import { Award, ShieldCheck, MapPin, Calendar, ChevronRight, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Distillery & Winery Brand Vaults | Liquor Locker AU',
  description: 'Browse premier Australian and international spirits distilleries, heritage wineries, and craft breweries in the Liquor Locker vault.',
  openGraph: {
    title: 'Distillery & Winery Brand Vaults | Liquor Locker AU',
    description: 'Browse premier Australian and international spirits distilleries, heritage wineries, and craft breweries.',
    url: `https://${SITE.domain}/brands/`,
    type: 'website',
  },
  alternates: {
    canonical: `https://${SITE.domain}/brands/`,
  },
  other: {
    'og:updated_time': new Date().toISOString(),
  },
};

export default function BrandsIndexPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `https://${SITE.domain}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Brand Vaults',
        item: `https://${SITE.domain}/brands/`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      <div className="bg-[#08140E] min-h-screen py-10 px-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6 text-xs text-gray-400 flex items-center gap-2">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-gray-600" />
            <span className="text-[#D4AF37] font-semibold">Distillery & Winery Vaults</span>
          </nav>

          {/* Hero Banner Header with Single H1 */}
          <header className="relative rounded-2xl border border-[#1A3828] bg-gradient-to-br from-[#0E2017] via-[#0B1A12] to-[#08140E] p-6 sm:p-10 mb-10 overflow-hidden shadow-2xl">
            <div className="relative z-10 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A3828]/60 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-mono tracking-wider uppercase mb-3">
                <Sparkles className="w-3 h-3" />
                <span>AUTHENTICATED BRAND DIRECTORY</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight leading-tight">
                Distillery, Winery & Craft Producer Vaults
              </h1>

              <p className="mt-4 text-sm sm:text-base text-gray-300 leading-relaxed">
                Discover the storied estates, master distillers, and boutique producers behind Australia’s finest spirits, iconic Barossa wines, Tasmanian single malts, and Japanese allocations.
              </p>
            </div>
          </header>

          {/* Brands Grid Grouped by Category */}
          <div className="space-y-12">
            {['spirits', 'wine', 'beer', 'premix-rtds', 'cider-ginger-beer', 'no-low-alcohol', 'mixers-snacks'].map((catKey) => {
              const catBrands = BRANDS_DATA.filter((b) => b.category === catKey);
              if (catBrands.length === 0) return null;

              const categoryObj = CATEGORIES.find((c) => c.slug === catKey);
              const catName = categoryObj ? categoryObj.name : catKey.replace('-', ' ').toUpperCase();

              return (
                <section key={catKey} className="space-y-4">
                  <div className="flex items-center justify-between border-b border-[#1A3828] pb-3">
                    <h2 className="text-xl sm:text-2xl font-serif font-bold text-white flex items-center gap-2">
                      <Award className="w-5 h-5 text-[#D4AF37]" />
                      <span>{catName} Producers</span>
                    </h2>
                    <Link
                      href={`/${catKey}/`}
                      className="text-xs text-[#D4AF37] hover:underline flex items-center gap-1"
                    >
                      View All {catName} <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {catBrands.map((brand) => {
                      const brandProductCount = PRODUCTS.filter(
                        (p) => p.brand?.toLowerCase() === brand.name.toLowerCase()
                      ).length;

                      return (
                        <Link
                          key={brand.slug}
                          href={`/brands/${brand.slug}/`}
                          className="group rounded-xl border border-[#1A3828] bg-[#0E2017] p-6 hover:border-[#D4AF37] hover:bg-[#11281D] transition-all flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <h3 className="text-lg font-serif font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                                {brand.name}
                              </h3>
                              <span className="rounded-full bg-[#08140E] border border-[#1A3828] px-2.5 py-0.5 text-[10px] font-mono text-[#D4AF37]">
                                {brand.country}
                              </span>
                            </div>

                            <p className="text-xs text-[#D4AF37] font-medium mb-3">
                              {brand.tagline}
                            </p>

                            <p className="text-xs text-gray-400 line-clamp-3 leading-relaxed mb-4">
                              {brand.description}
                            </p>
                          </div>

                          <div className="pt-4 border-t border-[#1A3828] flex items-center justify-between text-xs text-gray-400">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-[#D4AF37]" />
                              {brand.region}
                            </span>
                            <span className="text-[#D4AF37] font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                              Explore Vault <ChevronRight className="w-3 h-3" />
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>

        </div>
      </div>
    </>
  );
}
