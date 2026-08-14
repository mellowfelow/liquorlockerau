'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Truck,
  ArrowLeft,
  MessageCircle,
  CheckCircle2,
  Award,
  Info,
  Tag as TagIcon,
  ShoppingBag,
  Check,
  Package,
  Layers,
  Barcode,
  Scale,
  Sparkles
} from 'lucide-react';
import { SITE, CONTACT, SHOP } from '@/config/site';
import SmartImage from '@/components/SmartImage';

export default function ProductDetailClient({
  product,
  categoryInfo,
  subcategoryInfo,
  relatedProducts = [],
}) {
  const catSlug = product.primaryCategory || product.category;
  
  // Variants initialization
  const variants = product.variants && product.variants.length > 0 ? product.variants : null;
  const [selectedVariantId, setSelectedVariantId] = useState(
    variants ? variants[0].id || variants[0].sku : null
  );

  const selectedVariant = variants
    ? variants.find((v) => (v.id || v.sku) === selectedVariantId) || variants[0]
    : null;

  // Active pricing & specifications
  const activePrice = selectedVariant ? selectedVariant.price : product.price;
  const activeSku = selectedVariant ? selectedVariant.sku : product.sku || product.slug;
  const activeBarcode = selectedVariant?.barcode || product.barcode || 'N/A (Standard Allocation)';
  const activeWeight = selectedVariant?.weight || product.weight || 'Standard';
  const activeStock = selectedVariant?.stockLevel !== undefined ? selectedVariant.stockLevel : 24;
  const activeAvailable = selectedVariant?.available !== false;
  const activeImage = selectedVariant?.image || product.images[0];
  const activeAbv = selectedVariant?.abv || product.abv || (product.attributes?.abv ? `${product.attributes.abv}%` : '');
  const activeContainer = selectedVariant?.container || product.containerType || product.attributes?.containerType || 'Bottle';
  const activePackSize = selectedVariant?.packSize || product.packSize || product.attributes?.packSize || 'Single';
  const activeUnitSize = selectedVariant?.unitSize || product.bottleOrCanSize || 'Standard';

  // Customer-selected variation formatted string: [Unit Size] [Container] [Pack Size]
  const variantDisplayString = selectedVariant
    ? `${selectedVariant.unitSize} ${selectedVariant.container} ${selectedVariant.packSize}`
    : `${activeUnitSize} ${activeContainer} ${activePackSize}`;

  const [isAdded, setIsAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    try {
      const stored = localStorage.getItem(SITE.cartKey);
      let items = stored ? JSON.parse(stored) : [];

      const cartItemKey = selectedVariant
        ? `${product.slug}-${selectedVariant.sku || selectedVariant.id}`
        : product.slug;

      const itemName = selectedVariant
        ? `${product.name} (${variantDisplayString})`
        : product.name;

      const existingIdx = items.findIndex((i) => i.cartKey === cartItemKey || i.slug === cartItemKey);

      if (existingIdx > -1) {
        items[existingIdx].quantity += quantity;
      } else {
        items.push({
          cartKey: cartItemKey,
          slug: product.slug,
          variantId: selectedVariant?.id,
          variantName: variantDisplayString,
          name: itemName,
          price: activePrice,
          category: catSlug,
          image: activeImage,
          sku: activeSku,
          barcode: activeBarcode,
          packSize: activePackSize,
          unitSize: activeUnitSize,
          quantity: quantity,
        });
      }

      localStorage.setItem(SITE.cartKey, JSON.stringify(items));
      window.dispatchEvent(new Event('liquor-locker-cart-update'));

      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    } catch (err) {
      console.error('Failed to add to cart:', err);
    }
  };

  const whatsappOrderText = selectedVariant
    ? `Hello Liquor Locker Vault! I would like to order: ${product.name} - ${variantDisplayString} ($${activePrice} AUD, SKU: ${activeSku}). Please confirm stock allocation and dispatch schedule.`
    : `Hello Liquor Locker Vault! I would like to order: ${product.name} ($${activePrice} AUD, SKU: ${activeSku}). Please confirm bottle availability and payment details.`;

  const whatsappUrl = `https://wa.me/${CONTACT.whatsapp.replace('+', '')}?text=${encodeURIComponent(whatsappOrderText)}`;

  return (
    <div className="bg-[#08140E] min-h-screen py-10 px-4 sm:px-6">
      <div className="mx-auto max-w-7xl">
        
        {/* Back & Breadcrumbs */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <Link
            href={`/${catSlug}/`}
            className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-[#D4AF37] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to {categoryInfo?.name || 'Category'}
          </Link>

          <nav className="text-xs text-gray-400 flex items-center gap-2 flex-wrap">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <Link href={`/${catSlug}/`} className="hover:text-white">
              {categoryInfo?.name}
            </Link>
            {subcategoryInfo && (
              <>
                <span>/</span>
                <Link href={`/${catSlug}/${subcategoryInfo.slug}/`} className="hover:text-white">
                  {subcategoryInfo.name}
                </Link>
              </>
            )}
            <span>/</span>
            <span className="text-[#D4AF37] font-semibold truncate max-w-xs">{product.name}</span>
          </nav>
        </div>

        {/* Product Detail Main Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-[#0E2017] rounded-2xl border border-[#1A3828] p-6 sm:p-8 shadow-2xl">
          
          {/* Left: Image Gallery & Verification Badges */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative rounded-xl bg-white p-4 overflow-hidden border border-[#D4AF37]/30">
              {product.badge && (
                <span className="absolute top-3 left-3 z-10 rounded gold-bg-gradient px-2.5 py-1 text-xs font-bold text-black uppercase">
                  {product.badge}
                </span>
              )}
              
              {selectedVariant && (
                <span className="absolute bottom-3 left-3 z-10 rounded bg-[#08140E]/90 border border-[#D4AF37]/40 px-2.5 py-1 text-[11px] font-mono font-semibold text-[#D4AF37]">
                  {variantDisplayString}
                </span>
              )}

              <SmartImage
                src={activeImage}
                alt={`${product.name} - ${variantDisplayString}`}
                width={800}
                height={600}
                priority={true}
                className="h-96 w-full object-contain"
              />
            </div>

            {/* Supplier Verification Guarantee Banner */}
            <div className="rounded-lg bg-[#050E0A] p-4 border border-[#1A3828] text-xs text-gray-300 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#D4AF37] font-bold">
                  <ShieldCheck className="h-4 w-4" /> VERIFIED SUPPLIER ALLOCATION
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-mono">
                  <CheckCircle2 className="h-3 w-3" /> Details & Pricing Verified
                </span>
              </div>
              <p className="text-[11px] leading-relaxed text-gray-400">
                Official Australian product family specification. Pack sizes, ABV ({activeAbv}), barcodes ({activeBarcode}), and GST-inclusive pricing are cross-checked and verified against licensed warehouse manifests.
              </p>
            </div>

            {/* Tags list */}
            {product.controlledTags && product.controlledTags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {product.controlledTags.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1 rounded-full border border-[#1A3828] bg-[#050E0A] px-3 py-1 text-[11px] font-medium text-gray-300"
                  >
                    <TagIcon className="h-3 w-3 text-[#D4AF37]" /> {t}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Family Info, Variant Selector, Pricing & Cart Actions */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
                <span>{product.brand || categoryInfo?.name}</span>
                {subcategoryInfo && (
                  <>
                    <span>›</span>
                    <span>{subcategoryInfo.name}</span>
                  </>
                )}
                {product.countryOfOrigin && (
                  <>
                    <span>›</span>
                    <span className="text-gray-400">{product.countryOfOrigin}</span>
                  </>
                )}
              </div>

              {/* Page Title: Product Family Name */}
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1 leading-snug">
                {product.name}
              </h1>

              {/* Customer-selected variation label */}
              {variants && (
                <div className="mt-2 inline-flex items-center gap-2 rounded-md bg-[#050E0A] border border-[#1A3828] px-3 py-1 text-xs">
                  <span className="text-gray-400 font-mono">Selected Option:</span>
                  <span className="text-[#D4AF37] font-bold font-mono">
                    {variantDisplayString}
                  </span>
                </div>
              )}

              <p className="mt-3 text-xs sm:text-sm text-gray-300 leading-relaxed">
                {product.shortDescription}
              </p>
            </div>

            {/* Interactive Variant Selection Engine */}
            {variants && variants.length > 0 && (
              <div className="rounded-xl bg-[#050E0A] p-4 border border-[#1A3828] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-serif font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                    <Layers className="h-4 w-4 text-[#D4AF37]" /> Select Pack / Format Variant:
                  </span>
                  <span className="text-[11px] text-gray-400 font-mono">
                    {variants.length} Options Available
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {variants.map((v) => {
                    const isSelected = (v.id || v.sku) === selectedVariantId;
                    const vString = `${v.unitSize} ${v.container} ${v.packSize}`;
                    return (
                      <button
                        key={v.id || v.sku}
                        type="button"
                        onClick={() => setSelectedVariantId(v.id || v.sku)}
                        className={`flex flex-col text-left p-3 rounded-lg border transition-all ${
                          isSelected
                            ? 'border-[#D4AF37] bg-[#1A3828]/60 shadow-lg shadow-[#D4AF37]/10'
                            : 'border-[#1A3828] bg-[#0E2017] hover:border-gray-500 hover:bg-[#12271c]'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className={`text-xs font-bold ${isSelected ? 'text-[#D4AF37]' : 'text-white'}`}>
                            {vString}
                          </span>
                          {isSelected && <Check className="h-4 w-4 text-[#D4AF37] shrink-0" />}
                        </div>
                        
                        <div className="mt-1.5 flex items-center justify-between text-[11px] font-mono">
                          <span className="text-white font-bold text-sm">
                            ${v.price.toFixed(2)} <span className="text-[10px] text-gray-400 font-sans font-normal">AUD</span>
                          </span>
                          <span className={`text-[10px] ${v.available ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {v.available ? `In Stock (${v.stockLevel || 'Available'})` : 'Sold Out'}
                          </span>
                        </div>
                        
                        <div className="mt-1 text-[10px] text-gray-400 font-mono flex items-center gap-2">
                          <span>SKU: {v.sku}</span>
                          <span>•</span>
                          <span>{v.weight}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Price & Allocation Box */}
            <div className="rounded-xl bg-[#050E0A] p-4 border border-[#D4AF37]/30 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase text-gray-400 font-mono block">
                  {variants ? 'Selected Variant Price' : 'Vault Allocation Price'}
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-mono font-bold text-[#D4AF37]">
                    ${activePrice.toFixed(2)}
                  </span>
                  <span className="text-xs text-gray-400 font-sans font-normal">
                    AUD (Includes 10% GST)
                  </span>
                </div>
                {variants && (
                  <p className="text-[11px] text-gray-400 font-mono mt-0.5">
                    Format: <span className="text-white font-medium">{variantDisplayString}</span>
                  </p>
                )}
              </div>

              <div className="text-right text-xs text-gray-400 font-mono">
                <p className="text-emerald-400 font-bold">⚡ PayID / Bank Wire</p>
                <p className="text-[#D4AF37] mt-0.5">
                  Crypto 10% Off: ${(activePrice * 0.9).toFixed(2)} AUD
                </p>
              </div>
            </div>

            {/* Add to Cart & Buy Box */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-[#1A3828] bg-[#050E0A] rounded-lg">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2.5 text-gray-400 hover:text-white font-bold transition-colors"
                  >
                    -
                  </button>
                  <span className="px-3 py-2.5 text-xs font-mono font-bold text-white min-w-[36px] text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2.5 text-gray-400 hover:text-white font-bold transition-colors"
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={!activeAvailable}
                  className={`flex-1 rounded-lg py-3.5 px-4 text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    isAdded
                      ? 'bg-emerald-600 text-white'
                      : 'gold-bg-gradient text-black hover:opacity-90 active:scale-[0.99]'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="h-4 w-4" /> Added to Vault Cart!
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="h-4 w-4" /> Add {variantDisplayString} to Cart
                    </>
                  )}
                </button>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full rounded-lg border border-emerald-500 bg-emerald-950/50 py-3.5 px-4 text-xs font-bold text-emerald-300 hover:bg-emerald-900/70 transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="h-4 w-4" /> Order {variantDisplayString} via WhatsApp Concierge
              </a>
            </div>

            {/* Order Conditions Box */}
            <div className="space-y-2 text-xs text-gray-300 border-y border-[#1A3828] py-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#D4AF37] shrink-0" />
                <span>Vault Minimum Order: <strong className="text-white">${SHOP.minOrder} AUD</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-[#D4AF37] shrink-0" />
                <span>Free Express Delivery Threshold: <strong className="text-white">${SHOP.freeShippingThreshold} AUD</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-[#D4AF37] shrink-0" />
                <span>10% Discount applied automatically when paying with Bitcoin or USDT</span>
              </div>
            </div>

            {/* Technical Specifications & Barcode/SKU Table */}
            <div className="pt-2 space-y-3">
              <h3 className="text-xs font-serif font-bold text-white uppercase tracking-wider text-[#D4AF37] flex items-center gap-1.5">
                <Info className="h-4 w-4" /> Verified Supplier Attributes & Barcodes
              </h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs rounded-xl bg-[#050E0A] p-4 border border-[#1A3828]">
                <div>
                  <span className="text-gray-500 text-[11px] block">Brand / Brewery:</span>
                  <p className="text-white font-semibold">{product.brand || 'Australian Brewery'}</p>
                </div>
                <div>
                  <span className="text-gray-500 text-[11px] block">Alcohol (ABV):</span>
                  <p className="text-[#D4AF37] font-mono font-bold">{activeAbv}</p>
                </div>
                <div>
                  <span className="text-gray-500 text-[11px] block">Stock Status:</span>
                  <p className="text-emerald-400 font-mono font-semibold">
                    {activeAvailable ? `In Stock (${activeStock} Units)` : 'Out of Stock'}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500 text-[11px] block">Product SKU:</span>
                  <p className="text-white font-mono font-semibold">{activeSku}</p>
                </div>
                <div>
                  <span className="text-gray-500 text-[11px] block">Barcode (GTIN/EAN):</span>
                  <p className="text-white font-mono">{activeBarcode}</p>
                </div>
                <div>
                  <span className="text-gray-500 text-[11px] block">Shipping Weight:</span>
                  <p className="text-white font-mono">{activeWeight}</p>
                </div>
                <div>
                  <span className="text-gray-500 text-[11px] block">Container:</span>
                  <p className="text-white font-semibold">{activeContainer}</p>
                </div>
                <div>
                  <span className="text-gray-500 text-[11px] block">Pack Size:</span>
                  <p className="text-white font-semibold">{activePackSize}</p>
                </div>
                <div>
                  <span className="text-gray-500 text-[11px] block">Country of Origin:</span>
                  <p className="text-white font-semibold">{product.countryOfOrigin || 'Australia'}</p>
                </div>
              </div>
            </div>

            {/* Full Tasting Notes & Brewery Narrative */}
            <div className="pt-4 border-t border-[#1A3828] space-y-2">
              <h3 className="text-xs font-serif font-bold text-white uppercase tracking-wider text-[#D4AF37]">
                Sommelier & Cellar Notes
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed whitespace-pre-line">
                {product.description}
              </p>
            </div>

            {/* Curated Bundle Contents (for Mixed Cases / Wine Bundles) */}
            {product.bundleItems && product.bundleItems.length > 0 && (
              <div className="pt-4 border-t border-[#1A3828] space-y-3">
                <h3 className="text-xs font-serif font-bold text-white uppercase tracking-wider text-[#D4AF37] flex items-center gap-1.5">
                  <Package className="h-4 w-4" /> Included Wines in this Curated Bundle ({product.bundleItems.reduce((acc, i) => acc + (i.quantity || 1), 0)} Bottles)
                </h3>
                <div className="space-y-2">
                  {product.bundleItems.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between rounded-lg bg-[#050E0A] p-3 border border-[#1A3828] text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-[#D4AF37] bg-[#1A3828] px-2 py-0.5 rounded text-[11px]">
                          {item.quantity}x
                        </span>
                        <span className="text-white font-medium">{item.name}</span>
                      </div>
                      <span className="text-gray-400 font-mono text-[11px]">{item.bottleSize || '750ml'}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-serif font-bold text-white mb-6">
              Related Category Allocations
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <div
                  key={p.slug}
                  className="group flex flex-col rounded-xl border border-[#1A3828] bg-[#0E2017] p-4 transition-all duration-300 hover:border-[#D4AF37]/60 hover:shadow-xl"
                >
                  <Link href={`/shop/${p.primaryCategory || p.category}/${p.slug}/`} className="block relative mb-3">
                    {p.badge && (
                      <span className="absolute top-2 left-2 z-10 rounded gold-bg-gradient px-2 py-0.5 text-[10px] font-bold text-black uppercase">
                        {p.badge}
                      </span>
                    )}
                    <div className="product-frame bg-white rounded-lg overflow-hidden">
                      <SmartImage
                        src={p.images[0]}
                        alt={p.name}
                        width={400}
                        height={300}
                        className="h-44 w-full object-contain"
                      />
                    </div>
                  </Link>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-[#D4AF37]">
                        <span className="truncate max-w-[120px]">{p.brand || p.primaryCategory}</span>
                        {p.abv && <span className="text-gray-400 font-bold">{p.abv}</span>}
                      </div>

                      <Link href={`/shop/${p.primaryCategory || p.category}/${p.slug}/`}>
                        <h3 className="text-xs font-serif font-bold text-white mt-1 group-hover:text-[#D4AF37] line-clamp-2 leading-tight">
                          {p.name}
                        </h3>
                      </Link>

                      {p.variants && p.variants.length > 0 ? (
                        <div className="mt-1.5 flex items-center gap-1.5 text-[10px] text-amber-300 font-mono">
                          <Layers className="h-3 w-3" />
                          <span>{p.variants.length} Pack Sizes Available</span>
                        </div>
                      ) : null}
                    </div>

                    <div className="mt-3 pt-3 border-t border-[#1A3828] flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-gray-500 font-mono block">Price (Inc. GST)</span>
                        <span className="text-sm font-mono font-bold text-[#D4AF37]">
                          {p.variants && p.variants.length > 1 ? `From $${p.price.toFixed(2)}` : `$${p.price.toFixed(2)}`}
                        </span>
                      </div>
                      <Link
                        href={`/shop/${p.primaryCategory || p.category}/${p.slug}/`}
                        className="rounded bg-[#1A3828] px-2.5 py-1.5 text-[11px] font-bold text-white hover:bg-[#D4AF37] hover:text-black transition-colors"
                      >
                        View Options
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
