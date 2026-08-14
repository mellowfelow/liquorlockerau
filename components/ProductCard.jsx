'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Check, Layers, MapPin } from 'lucide-react';
import { SITE, CATEGORIES } from '@/config/site';
import SmartImage from '@/components/SmartImage';

export default function ProductCard({ product }) {
  const [isAdded, setIsAdded] = useState(false);

  const catSlug = product.primaryCategory || product.category || 'beer';
  const subSlug = product.primarySubcategory || '';
  const productUrl = `/shop/${catSlug}/${product.slug}/`;
  const hasVariants = product.variants && product.variants.length > 0;
  const primaryVariant = hasVariants ? product.variants[0] : null;

  // Find human-readable category & subcategory names
  const categoryObj = CATEGORIES.find((c) => c.slug === catSlug);
  const categoryName = categoryObj ? categoryObj.name : catSlug.toUpperCase();
  const subCategoryObj = categoryObj?.subcategories?.find((s) => s.slug === subSlug);
  const subCategoryName = subCategoryObj ? subCategoryObj.name : subSlug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

  // Category Path string
  const categoryPath = subCategoryName ? `${categoryName} › ${subCategoryName}` : categoryName;

  // Primary Type / Style Badge
  const styleBadge = product.styleOrVariety || product.attributes?.style || product.primaryProductType || '';

  // Extract Key Discovery Badges (Max 3)
  const discoveryBadges = [];

  // 1. ABV Badge
  if (product.abv) {
    discoveryBadges.push(product.abv);
  } else if (product.attributes?.abv !== undefined) {
    discoveryBadges.push(`${product.attributes.abv}% ABV`);
  }

  // 2. Dietary / Claims (e.g. Low-Carb, Australian Made, Preservative Free)
  if (product.dietary && Array.isArray(product.dietary)) {
    product.dietary.forEach((d) => {
      if (discoveryBadges.length < 3 && !discoveryBadges.includes(d)) {
        discoveryBadges.push(d);
      }
    });
  } else if (product.attributes?.dietaryClaims) {
    product.attributes.dietaryClaims.forEach((d) => {
      if (discoveryBadges.length < 3 && !discoveryBadges.includes(d)) {
        discoveryBadges.push(d);
      }
    });
  }

  // 3. Controlled Tags (e.g. Craft, BBQ, Best Seller) or Country of Origin
  if (discoveryBadges.length < 3 && product.countryOfOrigin && product.countryOfOrigin !== 'Australia') {
    discoveryBadges.push(`Imported (${product.countryOfOrigin})`);
  }

  if (discoveryBadges.length < 3 && product.controlledTags && Array.isArray(product.controlledTags)) {
    product.controlledTags.forEach((t) => {
      if (discoveryBadges.length < 3 && !discoveryBadges.includes(t)) {
        discoveryBadges.push(t);
      }
    });
  }

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const stored = localStorage.getItem(SITE.cartKey);
      let items = stored ? JSON.parse(stored) : [];

      const cartItemKey = primaryVariant
        ? `${product.slug}-${primaryVariant.sku || primaryVariant.id}`
        : product.slug;

      const variantDisplay = primaryVariant
        ? `${primaryVariant.unitSize} ${primaryVariant.container} ${primaryVariant.packSize}`
        : '';

      const itemName = primaryVariant
        ? `${product.name} (${variantDisplay})`
        : product.name;

      const existingIdx = items.findIndex((i) => i.cartKey === cartItemKey || i.slug === cartItemKey);

      if (existingIdx > -1) {
        items[existingIdx].quantity += 1;
      } else {
        items.push({
          cartKey: cartItemKey,
          slug: product.slug,
          variantId: primaryVariant?.id,
          variantName: variantDisplay,
          name: itemName,
          price: primaryVariant ? primaryVariant.price : product.price,
          category: catSlug,
          image: primaryVariant?.image || product.images[0],
          sku: primaryVariant?.sku || product.sku || product.slug,
          quantity: 1,
        });
      }

      localStorage.setItem(SITE.cartKey, JSON.stringify(items));
      window.dispatchEvent(new Event('liquor-locker-cart-update'));

      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 1500);
    } catch (err) {
      console.error('Failed to add to cart:', err);
    }
  };

  return (
    <div className="group flex flex-col rounded-xl border border-[#1A3828] bg-[#0E2017] p-4 transition-all duration-300 hover:border-[#D4AF37]/60 hover:shadow-xl relative">
      
      {/* Top Media / Badge Section */}
      <Link href={productUrl} className="block relative mb-3">
        {product.badge && (
          <span className="absolute top-2 left-2 z-10 rounded gold-bg-gradient px-2 py-0.5 text-[10px] font-bold text-black uppercase tracking-wider shadow">
            {product.badge}
          </span>
        )}
        <div className="product-frame bg-white rounded-lg overflow-hidden flex items-center justify-center">
          <SmartImage
            src={product.images?.[0]}
            alt={product.name}
            width={400}
            height={300}
            className="h-44 w-full object-contain"
          />
        </div>
      </Link>

      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* 1. Category Path Label */}
          <div className="text-[10px] font-mono uppercase tracking-wider text-[#D4AF37] flex items-center justify-between">
            <span className="truncate max-w-[200px]" title={categoryPath}>
              {categoryPath}
            </span>
            {product.brand && (
              <span className="text-gray-400 font-sans font-semibold text-[10px] truncate max-w-[100px]">
                {product.brand}
              </span>
            )}
          </div>

          {/* Product Name */}
          <Link href={productUrl}>
            <h3 className="text-xs font-serif font-bold text-white mt-1.5 group-hover:text-[#D4AF37] line-clamp-2 leading-tight">
              {product.name}
            </h3>
          </Link>

          {/* 2. Style / Type Primary Badge */}
          {styleBadge && (
            <div className="mt-2">
              <span className="inline-flex items-center rounded-md bg-[#08140E] border border-[#1A3828] px-2 py-0.5 text-[10px] font-semibold text-gray-200">
                {styleBadge}
              </span>
            </div>
          )}

          {/* Short Description */}
          <p className="mt-1.5 text-[11px] text-gray-400 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>

          {/* 3. Key Discovery Badges (Max 3) */}
          <div className="mt-2.5 flex flex-wrap gap-1">
            {hasVariants && (
              <span 
                className="rounded bg-[#050E0A] px-1.5 py-0.5 border border-[#D4AF37]/40 text-[#D4AF37] font-mono text-[10px] flex items-center gap-1 max-w-[150px]"
                title={product.variants.map(v => v.packSize).filter(Boolean).join(' / ')}
              >
                <Layers className="h-2.5 w-2.5 flex-shrink-0" /> 
                <span className="truncate">{product.variants.map(v => v.packSize).filter(Boolean).join(' / ') || `${product.variants.length} Options`}</span>
              </span>
            )}
            {discoveryBadges.slice(0, 3).map((badgeText) => (
              <span
                key={`badge-${product.slug}-${badgeText}`}
                className="rounded bg-[#122A1E] px-1.5 py-0.5 border border-[#1A3828] text-[10px] font-mono text-gray-300"
              >
                {badgeText}
              </span>
            ))}
          </div>
        </div>

        {/* Price & Action Section */}
        <div className="mt-4 pt-3 border-t border-[#1A3828] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-gray-500 uppercase font-mono">Price (Inc. GST)</span>
            <span className="font-mono text-sm font-bold text-[#D4AF37]">
              {hasVariants && product.variants.length > 1
                ? `From $${product.price.toFixed(2)}`
                : `$${product.price.toFixed(2)}`}{' '}
              <span className="text-[10px] text-gray-400 font-sans font-normal">AUD</span>
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link
              href={productUrl}
              className="rounded border border-[#1A3828] bg-[#050E0A] py-2 text-center text-xs font-semibold text-gray-200 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all flex items-center justify-center min-h-[36px]"
            >
              {hasVariants ? 'Select Pack' : 'View Vault'}
            </Link>

            <button
              onClick={handleAddToCart}
              className={`rounded py-2 text-xs font-semibold transition-all flex items-center justify-center gap-1 min-h-[36px] ${
                isAdded
                  ? 'bg-emerald-600 text-white'
                  : 'gold-bg-gradient text-black hover:opacity-90 active:scale-95'
              }`}
            >
              {isAdded ? (
                <><Check className="h-3.5 w-3.5" /> Added</>
              ) : (
                <><ShoppingBag className="h-3.5 w-3.5" /> Add</>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
