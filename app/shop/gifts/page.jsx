import React from 'react';
import Link from 'next/link';
import { PRODUCTS, SITE } from '@/config/site';
import CategoryProductsClient from '@/components/CategoryProductsClient';
import JsonLd from '@/components/JsonLd';

export const metadata = {
  title: 'Liquor Gift Packs & Sets | Australian Online Bottle Shop',
  description: 'Curated liquor gift sets, whisky gift packs, craft beer tasting boxes, and premium wine presentation boxes with express nationwide delivery.',
  openGraph: {
    title: 'Gifts & Presentation Sets - Liquor Locker AU',
    description: 'Find the perfect alcohol gift set for any occasion.',
    url: `https://${SITE.domain}/shop/gifts/`,
  },
  alternates: {
    canonical: `https://${SITE.domain}/shop/gifts/`,
  },
};

export default function GiftsPage() {
  const giftProducts = PRODUCTS.filter(
    (p) => p.tags?.includes('Gift Set') || p.primaryCategory === 'gifts' || p.badge?.toLowerCase().includes('gift')
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
        name: 'Gifts',
        item: `https://${SITE.domain}/shop/gifts/`,
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
            <span className="text-[#D4AF37] font-semibold">Gifts & Presentation Sets</span>
          </nav>

          <div className="relative rounded-2xl border border-[#1A3828] bg-[#0E2017] p-6 sm:p-10 mb-10 overflow-hidden shadow-2xl">
            <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
              CURATED ALCOHOL GIFTS
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white mt-1">
              Gifts & Collector Sets
            </h1>
            <p className="mt-3 text-xs sm:text-sm text-gray-300 leading-relaxed max-w-3xl">
              Delight colleagues, friends, or family with luxury whisky presentation sets, craft beer discovery packs, and champagne gift boxes shipped directly anywhere in Australia.
            </p>
          </div>

          <CategoryProductsClient
            mainCategory=""
            categoryTitle="Liquor Gifts"
            initialProducts={giftProducts.length > 0 ? giftProducts : PRODUCTS}
            subcategories={[]}
          />

        </div>
      </div>
    </>
  );
}
