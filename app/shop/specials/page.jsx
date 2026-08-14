import React from 'react';
import Link from 'next/link';
import { PRODUCTS, SITE } from '@/config/site';
import CategoryProductsClient from '@/components/CategoryProductsClient';
import JsonLd from '@/components/JsonLd';

export const metadata = {
  title: 'Vault Specials & Allocation Deals | Liquor Locker AU',
  description: 'Exclusive vault deals, discounted mixed cases, and special prices on craft beer, Australian wine, and rare spirits.',
  openGraph: {
    title: 'Vault Specials - Liquor Locker AU',
    description: 'Exclusive deals on premium beer, wine, and spirits.',
    url: `https://${SITE.domain}/shop/specials/`,
  },
  alternates: {
    canonical: `https://${SITE.domain}/shop/specials/`,
  },
};

export default function SpecialsPage() {
  const specialProducts = PRODUCTS.filter(
    (p) => p.badge?.toLowerCase().includes('special') || p.badge?.toLowerCase().includes('deal') || p.tags?.includes('Special') || p.price <= 60
  );

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
        name: 'Specials',
        item: `https://${SITE.domain}/shop/specials/`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      <div className="bg-[#08140E] min-h-screen py-10 px-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          
          <nav className="mb-6 text-xs text-gray-400 flex items-center gap-2">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <span className="text-[#D4AF37] font-semibold">Vault Specials</span>
          </nav>

          <div className="relative rounded-2xl border border-[#1A3828] bg-[#0E2017] p-6 sm:p-10 mb-10 overflow-hidden shadow-2xl">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
              LIMITED TIME VAULT OFFERS
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white mt-1">
              Specials & Allocation Price Drops
            </h1>
            <p className="mt-3 text-xs sm:text-sm text-gray-300 leading-relaxed max-w-3xl">
              Enjoy discounted pricing on select craft beers, estate wines, and spirits allocations. Plus get an extra 10% discount when paying with Crypto (Bitcoin / USDT).
            </p>
          </div>

          <CategoryProductsClient
            mainCategory=""
            categoryTitle="Vault Specials"
            initialProducts={specialProducts}
            subcategories={[]}
          />

        </div>
      </div>
    </>
  );
}
