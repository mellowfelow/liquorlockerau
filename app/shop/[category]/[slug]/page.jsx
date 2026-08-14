import React from 'react';
import { notFound } from 'next/navigation';
import { PRODUCTS, CATEGORIES, SITE } from '@/config/site';
import JsonLd from '@/components/JsonLd';
import ProductDetailClient from '@/components/ProductDetailClient';

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ category: p.primaryCategory || p.category, slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) return {};

  const catSlug = product.primaryCategory || product.category;

  return {
    title: `${product.name} | Liquor Locker AU Vault`,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: [{ url: (product.images && product.images[0]) || product.image }],
      url: `https://${SITE.domain}/shop/${catSlug}/${product.slug}/`,
    },
    alternates: {
      canonical: `https://${SITE.domain}/shop/${catSlug}/${product.slug}/`,
    },
    other: {
      'og:updated_time': new Date().toISOString(),
    },
  };
}

export default async function ProductDetailPage({ params }) {
  const { category, slug } = await params;
  const product = PRODUCTS.find(
    (p) => p.slug === slug && (p.primaryCategory === category || p.category === category)
  );

  if (!product) {
    notFound();
  }

  const categoryInfo = CATEGORIES.find((c) => c.slug === (product.primaryCategory || category));
  const subcategoryInfo = categoryInfo?.subcategories?.find(
    (s) => s.slug === product.primarySubcategory
  );

  const relatedProducts = PRODUCTS.filter(
    (p) => (p.primaryCategory || p.category) === category && p.slug !== slug
  ).slice(0, 4);

  const catSlug = product.primaryCategory || category;

  // Rich Schema.org markup
  const offersSchema = product.variants && product.variants.length > 0
    ? {
        '@type': 'AggregateOffer',
        url: `https://${SITE.domain}/shop/${catSlug}/${product.slug}/`,
        priceCurrency: 'AUD',
        lowPrice: Math.min(...product.variants.map((v) => v.price)),
        highPrice: Math.max(...product.variants.map((v) => v.price)),
        offerCount: product.variants.length,
        offers: product.variants.map((v) => ({
          '@type': 'Offer',
          name: `${product.name} - ${v.unitSize} ${v.container} ${v.packSize}`,
          sku: v.sku,
          gtin13: v.barcode,
          price: v.price,
          priceCurrency: 'AUD',
          itemCondition: 'https://schema.org/NewCondition',
          availability: v.available ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
          url: `https://${SITE.domain}/shop/${catSlug}/${product.slug}/`,
        })),
      }
    : {
        '@type': 'Offer',
        url: `https://${SITE.domain}/shop/${catSlug}/${product.slug}/`,
        priceCurrency: 'AUD',
        price: product.price,
        itemCondition: 'https://schema.org/NewCondition',
        availability: 'https://schema.org/InStock',
      };

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: (product.images && product.images.length > 0) ? product.images : (product.image ? [product.image] : []),
    description: product.description,
    sku: product.sku || product.slug,
    brand: {
      '@type': 'Brand',
      name: product.brand || SITE.name,
    },
    offers: offersSchema,
  };

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
        name: categoryInfo?.name || 'Category',
        item: `https://${SITE.domain}/${catSlug}/`,
      },
      ...(subcategoryInfo
        ? [
            {
              '@type': 'ListItem',
              position: 3,
              name: subcategoryInfo.name,
              item: `https://${SITE.domain}/${catSlug}/${subcategoryInfo.slug}/`,
            },
            {
              '@type': 'ListItem',
              position: 4,
              name: product.name,
              item: `https://${SITE.domain}/shop/${catSlug}/${product.slug}/`,
            },
          ]
        : [
            {
              '@type': 'ListItem',
              position: 3,
              name: product.name,
              item: `https://${SITE.domain}/shop/${catSlug}/${product.slug}/`,
            },
          ]),
    ],
  };

  return (
    <>
      <JsonLd data={productSchema} />
      <JsonLd data={breadcrumbSchema} />

      <ProductDetailClient
        product={product}
        categoryInfo={categoryInfo}
        subcategoryInfo={subcategoryInfo}
        relatedProducts={relatedProducts}
      />
    </>
  );
}

