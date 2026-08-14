import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CATEGORIES, PRODUCTS, SITE, getProductsForCategory } from '@/config/site';
import CategoryProductsClient from '@/components/CategoryProductsClient';
import JsonLd from '@/components/JsonLd';

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }) {
  const { category } = await params;
  const cat = CATEGORIES.find((c) => c.slug === category);
  if (!cat) return {};

  return {
    title: `${cat.name} | Australian Online Bottle Shop | Liquor Locker AU`,
    description: cat.description,
    openGraph: {
      title: `${cat.name} - Liquor Locker AU`,
      description: cat.description,
      url: `https://${SITE.domain}/shop/${cat.slug}/`,
    },
    alternates: {
      canonical: `https://${SITE.domain}/shop/${cat.slug}/`,
    },
  };
}

export default async function CategoryPage({ params }) {
  const { category } = await params;
  const cat = CATEGORIES.find((c) => c.slug === category);

  if (!cat) {
    notFound();
  }

  const categoryProducts = getProductsForCategory(category);

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
      {
        '@type': 'ListItem',
        position: 3,
        name: cat.name,
        item: `https://${SITE.domain}/shop/${cat.slug}/`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      <div className="bg-[#08140E] min-h-screen py-10 px-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          
          {/* Breadcrumbs */}
          <nav className="text-xs text-gray-400 mb-6 flex items-center gap-2">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <Link href="/shop/" className="hover:text-white">Shop</Link>
            <span>/</span>
            <span className="text-[#D4AF37] font-semibold">{cat.name}</span>
          </nav>

          {/* Category Banner Header */}
          <div className="rounded-2xl border border-[#1A3828] bg-[#0E2017] p-6 sm:p-8 mb-10 relative overflow-hidden shadow-2xl">
            <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
              MAIN CATEGORY
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white mt-1">
              {cat.name}
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-gray-300 max-w-2xl leading-relaxed">
              {cat.description}
            </p>

            {/* Subcategories Links */}
            {cat.subcategories && cat.subcategories.length > 0 && (
              <div className="mt-6 pt-4 border-t border-[#1A3828] flex flex-wrap gap-2 items-center">
                <span className="text-xs font-bold text-[#D4AF37] uppercase mr-2">Subcategories:</span>
                {cat.subcategories.map((sub) => (
                  <Link
                    key={sub.slug}
                    href={`/${cat.slug}/${sub.slug}/`}
                    className="rounded-full border border-[#1A3828] bg-[#08140E] px-3.5 py-1 text-xs font-medium text-gray-300 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all"
                  >
                    {sub.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Filterable Products Grid */}
          <CategoryProductsClient
            mainCategory={cat.slug}
            categoryTitle={cat.name}
            initialProducts={categoryProducts}
            subcategories={cat.subcategories}
          />

        </div>
      </div>
    </>
  );
}
