import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { COLLECTIONS, PRODUCTS, SITE } from '@/config/site';
import CategoryProductsClient from '@/components/CategoryProductsClient';
import JsonLd from '@/components/JsonLd';

export async function generateStaticParams() {
  return COLLECTIONS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const collection = COLLECTIONS.find((c) => c.slug === slug);
  if (!collection) return {};

  return {
    title: `${collection.name} | Liquor Locker AU Vault`,
    description: collection.description,
    openGraph: {
      title: collection.name,
      description: collection.description,
      url: `https://${SITE.domain}/shop/collections/${collection.slug}/`,
    },
    alternates: {
      canonical: `https://${SITE.domain}/shop/collections/${collection.slug}/`,
    },
  };
}

export default async function CollectionPage({ params }) {
  const { slug } = await params;
  const collection = COLLECTIONS.find((c) => c.slug === slug);

  if (!collection) {
    notFound();
  }

  // Filter products by collection tag or criteria
  let collectionProducts = [];
  if (slug === 'best-sellers') {
    collectionProducts = PRODUCTS.filter((p) => p.tags?.includes('Best Seller') || p.featured);
  } else if (slug === 'new-arrivals') {
    collectionProducts = PRODUCTS.filter((p) => p.tags?.includes('New Arrival'));
  } else if (slug === 'bundles-mixed-cases') {
    collectionProducts = PRODUCTS.filter(
      (p) =>
        p.attributes?.packSize === 'Slab / 24-Pack' ||
        p.attributes?.packSize === 'Case' ||
        p.attributes?.packSize === 'Mixed Dozen' ||
        p.tags?.includes('Bundle')
    );
  } else if (slug === 'gift-packs') {
    collectionProducts = PRODUCTS.filter((p) => p.tags?.includes('Gift Set') || p.primaryCategory === 'gifts');
  } else if (slug === 'craft-beer-discoveries') {
    collectionProducts = PRODUCTS.filter((p) => p.primaryCategory === 'beer');
  } else if (slug === 'australian-wine-showcase') {
    collectionProducts = PRODUCTS.filter((p) => p.primaryCategory === 'wine');
  } else if (slug === 'rare-spirits-vault') {
    collectionProducts = PRODUCTS.filter((p) => p.primaryCategory === 'spirits');
  } else if (slug === 'zero-alcohol-picks') {
    collectionProducts = PRODUCTS.filter((p) => p.primaryCategory === 'no-low-alcohol');
  } else if (slug === 'under-50-value') {
    collectionProducts = PRODUCTS.filter((p) => p.price <= 50);
  } else {
    collectionProducts = PRODUCTS;
  }

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
        name: 'Collections',
        item: `https://${SITE.domain}/shop/`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: collection.name,
        item: `https://${SITE.domain}/shop/collections/${collection.slug}/`,
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
            <Link href="/shop/" className="hover:text-white">Shop</Link>
            <span>/</span>
            <span className="text-[#D4AF37] font-semibold">{collection.name}</span>
          </nav>

          {/* Banner */}
          <div className="relative rounded-2xl border border-[#1A3828] bg-[#0E2017] p-6 sm:p-10 mb-10 overflow-hidden shadow-2xl">
            <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
              CURATED COLLECTION
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white mt-1">
              {collection.name}
            </h1>
            <p className="mt-3 text-xs sm:text-sm text-gray-300 leading-relaxed max-w-3xl">
              {collection.description}
            </p>
          </div>

          {/* Interactive Catalog */}
          <CategoryProductsClient
            mainCategory=""
            categoryTitle={collection.name}
            initialProducts={collectionProducts}
            subcategories={[]}
          />

        </div>
      </div>
    </>
  );
}
