import React from 'react';
import Link from 'next/link';
import { CATEGORIES, PRODUCTS, COLLECTIONS, SITE } from '@/config/site';
import CategoryProductsClient from '@/components/CategoryProductsClient';
import JsonLd from '@/components/JsonLd';

export const metadata = {
  title: 'Shop All Drinks | Australian Online Bottle Shop | Liquor Locker AU',
  description: 'Browse Australia’s premier online bottle shop catalog. Craft beer, fine wine, rare spirits, premix RTDs, cider, non-alcoholic drinks and mixers with nationwide delivery.',
  openGraph: {
    title: 'Shop All Drinks - Liquor Locker AU Vault',
    description: 'Explore our complete collection of craft beer, Australian wine, spirits, RTDs and gifts.',
    url: `https://${SITE.domain}/shop/`,
  },
  alternates: {
    canonical: `https://${SITE.domain}/shop/`,
  },
};

export default function ShopIndexPage() {
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
        name: 'Shop',
        item: `https://${SITE.domain}/shop/`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      <div className="bg-[#08140E] min-h-screen py-10 px-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          
          {/* Breadcrumbs */}
          <nav className="mb-6 text-xs text-gray-400 flex items-center gap-2">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <span className="text-[#D4AF37] font-semibold">Shop All Drinks</span>
          </nav>

          {/* Header Title Banner */}
          <div className="relative rounded-2xl border border-[#1A3828] bg-[#0E2017] p-6 sm:p-10 mb-10 overflow-hidden shadow-2xl">
            <div className="relative z-10 max-w-3xl">
              <span className="text-xs uppercase font-semibold text-[#D4AF37] tracking-widest font-mono">
                AUSTRALIAN ONLINE BOTTLE SHOP CATALOG
              </span>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white mt-1">
                Shop All Craft Beer, Fine Wine & Spirits
              </h1>
              <p className="mt-3 text-xs sm:text-sm text-gray-300 leading-relaxed">
                Explore our full vault catalog. Filter by main category, subcategory, Australian region, ABV strength, pack size, container type, or dietary preference.
              </p>
            </div>

            {/* Quick Collections Hub */}
            <div className="mt-6 pt-6 border-t border-[#1A3828] flex flex-wrap gap-2 items-center">
              <span className="text-xs font-bold text-[#D4AF37] uppercase mr-2">Featured Collections:</span>
              {COLLECTIONS.map((col) => (
                <Link
                  key={col.slug}
                  href={`/shop/collections/${col.slug}/`}
                  className="rounded-full border border-[#1A3828] bg-[#08140E] px-3.5 py-1 text-xs font-medium text-gray-300 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all"
                >
                  {col.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Main Category Cards Row */}
          <div className="mb-10">
            <h2 className="text-sm font-serif font-bold text-white uppercase tracking-wider mb-4 border-b border-[#1A3828] pb-2 flex justify-between items-center">
              <span>Browse Main Categories</span>
              <span className="text-xs text-[#D4AF37] font-sans font-normal">2-Level Permanent Taxonomy</span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/${cat.slug}/`}
                  className="group flex flex-col items-center rounded-xl border border-[#1A3828] bg-[#0A1A12] p-3 text-center transition-all hover:border-[#D4AF37]/60 hover:bg-[#10261B]"
                >
                  <span className="text-xs font-serif font-bold text-gray-200 group-hover:text-[#D4AF37] line-clamp-1">
                    {cat.name}
                  </span>
                  <span className="text-[10px] text-gray-400 mt-0.5">
                    {cat.subcategories.length} subcategories
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Full Interactive Product Catalog with Sidebar Filters */}
          <CategoryProductsClient
            mainCategory=""
            categoryTitle="Full Vault Catalog"
            initialProducts={PRODUCTS}
            subcategories={[]}
          />

        </div>
      </div>
    </>
  );
}
