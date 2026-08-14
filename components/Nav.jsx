'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, ShoppingBag, Menu, X, ChevronDown, Sparkles, Tag, Gift, Flame, PackageCheck } from 'lucide-react';
import { SITE, CATEGORIES, COLLECTIONS } from '@/config/site';
import Logo from '@/components/Logo';

export default function Nav({ onOpenCart }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isShopMegaOpen, setIsShopMegaOpen] = useState(false);
  const [activeCategoryTab, setActiveCategoryTab] = useState('beer');
  const [expandedMobileCategory, setExpandedMobileCategory] = useState(null);
  
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  const megaTimeoutRef = useRef(null);

  const updateCartStats = React.useCallback(() => {
    try {
      const stored = localStorage.getItem(SITE.cartKey);
      if (stored) {
        const items = JSON.parse(stored);
        const count = items.reduce((acc, i) => acc + i.quantity, 0);
        const total = items.reduce((acc, i) => acc + i.price * i.quantity, 0);
        setCartCount(count);
        setCartTotal(total);
      } else {
        setCartCount(0);
        setCartTotal(0);
      }
    } catch (e) {
      setCartCount(0);
      setCartTotal(0);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => updateCartStats(), 0);
    const handleCartUpdate = () => updateCartStats();
    window.addEventListener('liquor-locker-cart-update', handleCartUpdate);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('liquor-locker-cart-update', handleCartUpdate);
    };
  }, [updateCartStats]);

  const handleMouseEnterMega = () => {
    if (megaTimeoutRef.current) clearTimeout(megaTimeoutRef.current);
    setIsShopMegaOpen(true);
  };

  const handleMouseLeaveMega = () => {
    megaTimeoutRef.current = setTimeout(() => {
      setIsShopMegaOpen(false);
    }, 200);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#1A3828] bg-[#08140E]/95 backdrop-blur-md">
      {/* RSA Compliance Bar */}
      <div className="bg-[#050E0A] text-[10px] sm:text-xs text-gray-400 py-1 px-4 text-center border-b border-[#122A1E]">
        <span className="text-[#D4AF37] font-medium">LIQUOR LICENSE LIQP770010234:</span> It is an offence to sell or supply alcohol to persons under 18. Enjoy Responsibly.
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand Logo */}
        <Link href="/" className="group flex items-center shrink-0">
          <Logo size="md" />
        </Link>

        {/* TOP WEBSITE NAVIGATION */}
        <nav className="hidden lg:flex items-center gap-5 text-xs font-semibold uppercase tracking-wider text-gray-300">
          <Link href="/" className="hover:text-[#D4AF37] transition-colors py-2">
            Home
          </Link>

          {/* SHOP MEGA DROPDOWN TRIGGER */}
          <div
            className="relative"
            onMouseEnter={handleMouseEnterMega}
            onMouseLeave={handleMouseLeaveMega}
          >
            <Link
              href="/shop/"
              className={`flex items-center gap-1 py-2 transition-colors ${
                isShopMegaOpen ? 'text-[#D4AF37]' : 'hover:text-[#D4AF37]'
              }`}
            >
              Shop <ChevronDown className={`h-3.5 w-3.5 text-[#D4AF37] transition-transform duration-200 ${isShopMegaOpen ? 'rotate-180' : ''}`} />
            </Link>

            {/* FULL MEGA DROPDOWN MENU */}
            {isShopMegaOpen && (
              <div 
                className="absolute left-1/2 -translate-x-1/2 top-full w-[94vw] max-w-6xl rounded-2xl border border-[#D4AF37]/30 bg-[#0A1D13] p-6 shadow-2xl gold-border-glow grid grid-cols-12 gap-6 animate-in fade-in zoom-in-95 duration-150"
                onMouseEnter={handleMouseEnterMega}
                onMouseLeave={handleMouseLeaveMega}
              >
                
                {/* Left Column 1: SHOP ALL & QUICK COLLECTIONS */}
                <div className="col-span-3 border-r border-[#1A3828] pr-4 space-y-3">
                  <div className="text-[11px] font-bold uppercase tracking-widest text-[#D4AF37] flex items-center gap-1.5 pb-2 border-b border-[#1A3828]">
                    <Sparkles className="h-3.5 w-3.5" /> Shop Quick Links
                  </div>
                  <ul className="space-y-1 text-xs">
                    <li>
                      <Link
                        href="/shop/"
                        onClick={() => setIsShopMegaOpen(false)}
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-white hover:bg-[#122A1E] hover:text-[#D4AF37] transition-colors font-bold"
                      >
                        • Shop All Drinks
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/shop/collections/best-sellers/"
                        onClick={() => setIsShopMegaOpen(false)}
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-300 hover:bg-[#122A1E] hover:text-[#D4AF37] transition-colors"
                      >
                        <Flame className="h-3.5 w-3.5 text-amber-400" /> Best Sellers
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/shop/collections/new-arrivals/"
                        onClick={() => setIsShopMegaOpen(false)}
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-300 hover:bg-[#122A1E] hover:text-[#D4AF37] transition-colors"
                      >
                        <Sparkles className="h-3.5 w-3.5 text-emerald-400" /> New Arrivals
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/shop/specials/"
                        onClick={() => setIsShopMegaOpen(false)}
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-amber-400 font-bold hover:bg-[#122A1E] transition-colors"
                      >
                        <Tag className="h-3.5 w-3.5" /> Vault Specials
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/shop/collections/bundles-mixed-cases/"
                        onClick={() => setIsShopMegaOpen(false)}
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-300 hover:bg-[#122A1E] hover:text-[#D4AF37] transition-colors"
                      >
                        <PackageCheck className="h-3.5 w-3.5 text-cyan-400" /> Bundles & Mixed Cases
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/shop/gifts/"
                        onClick={() => setIsShopMegaOpen(false)}
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-300 hover:bg-[#122A1E] hover:text-[#D4AF37] transition-colors"
                      >
                        <Gift className="h-3.5 w-3.5 text-rose-400" /> Gift Packs & Sets
                      </Link>
                    </li>
                  </ul>

                  <div className="pt-3 border-t border-[#1A3828] text-[10px] text-gray-400">
                    <p className="font-semibold text-white mb-1">VIP Vault Guarantee</p>
                    <p>Free Express Shipping over $350 AUD • 10% Crypto Discount</p>
                  </div>
                </div>

                {/* Main Area: Category Selector Tabs + Subcategories Grid */}
                <div className="col-span-9 flex flex-col justify-between">
                  {/* Category Selector Tabs */}
                  <div className="flex items-center gap-1 border-b border-[#1A3828] pb-3 overflow-x-auto">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.slug}
                        onClick={() => setActiveCategoryTab(cat.slug)}
                        onMouseEnter={() => setActiveCategoryTab(cat.slug)}
                        className={`rounded-lg px-3 py-1.5 text-xs font-bold uppercase transition-all whitespace-nowrap ${
                          activeCategoryTab === cat.slug
                            ? 'gold-bg-gradient text-black shadow-md'
                            : 'text-gray-400 hover:text-white hover:bg-[#122A1E]'
                        }`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>

                  {/* Active Main Category Subcategories Content */}
                  <div className="py-4">
                    {CATEGORIES.filter((c) => c.slug === activeCategoryTab).map((currentCat) => (
                      <div key={currentCat.slug} className="space-y-3">
                        <div className="flex items-center justify-between border-b border-[#1A3828]/50 pb-2">
                          <div>
                            <Link
                              href={`/${currentCat.slug}/`}
                              onClick={() => setIsShopMegaOpen(false)}
                              className="text-sm font-serif font-bold text-white hover:text-[#D4AF37] flex items-center gap-2"
                            >
                              Explore All {currentCat.name} →
                            </Link>
                            <p className="text-[11px] text-gray-400 line-clamp-1 mt-0.5">
                              {currentCat.description}
                            </p>
                          </div>
                          <Link
                            href={`/${currentCat.slug}/`}
                            onClick={() => setIsShopMegaOpen(false)}
                            className="text-xs font-semibold text-[#D4AF37] hover:underline"
                          >
                            View All ({currentCat.subcategories.length} subcategories)
                          </Link>
                        </div>

                        {/* Subcategories Grid (Max 14 subcategories displayed cleanly) */}
                        <div className="grid grid-cols-3 gap-2 pt-2">
                          {currentCat.subcategories.map((sub) => (
                            <Link
                              key={sub.slug}
                              href={`/${currentCat.slug}/${sub.slug}/`}
                              onClick={() => setIsShopMegaOpen(false)}
                              className="group flex flex-col rounded-lg border border-[#163324] bg-[#08150E] p-2.5 transition-all hover:border-[#D4AF37]/50 hover:bg-[#10271B]"
                            >
                              <span className="text-xs font-semibold text-gray-200 group-hover:text-[#D4AF37]">
                                {sub.name}
                              </span>
                              <span className="text-[10px] text-gray-400 line-clamp-1 mt-0.5">
                                {sub.description}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Bottom Bar inside Mega Menu */}
                  <div className="border-t border-[#1A3828] pt-3 flex items-center justify-between text-[11px] text-gray-400">
                    <span>2-Level Permanent Taxonomy System • Direct Distillery Provenance</span>
                    <Link
                      href="/shop/"
                      onClick={() => setIsShopMegaOpen(false)}
                      className="text-[#D4AF37] font-semibold hover:underline"
                    >
                      Browse Full Vault Catalog →
                    </Link>
                  </div>
                </div>

              </div>
            )}
          </div>

          <Link href="/shop/specials/" className="hover:text-[#D4AF37] transition-colors py-2 text-amber-400 font-bold">
            Specials
          </Link>
          <Link href="/brands/" className="hover:text-[#D4AF37] transition-colors py-2">
            Brands
          </Link>
          <Link href="/shop/collections/new-arrivals/" className="hover:text-[#D4AF37] transition-colors py-2">
            New Arrivals
          </Link>
          <Link href="/shop/gifts/" className="hover:text-[#D4AF37] transition-colors py-2">
            Gifts
          </Link>
          <Link href="/blog/" className="hover:text-[#D4AF37] transition-colors py-2">
            Blog
          </Link>
          <Link href="/about/" className="hover:text-[#D4AF37] transition-colors py-2">
            About
          </Link>
          <Link href="/contact/" className="hover:text-[#D4AF37] transition-colors py-2">
            Contact
          </Link>
        </nav>

        {/* Right Action Icons */}
        <div className="flex items-center gap-3">
          {/* Search Trigger */}
          <Link
            href="/search/"
            className="flex items-center gap-1.5 rounded-lg border border-[#1A3828] bg-[#0E2017] px-3 py-1.5 text-xs text-gray-400 hover:border-[#D4AF37]/50 hover:text-white"
            title="Search Vault Catalog"
          >
            <Search className="h-3.5 w-3.5 text-[#D4AF37]" />
            <span className="hidden sm:inline">Search Vault...</span>
          </Link>

          {/* Cart Trigger */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 rounded-lg border border-[#D4AF37]/50 bg-[#12261C] px-3 py-1.5 text-xs font-semibold text-white hover:border-[#D4AF37] transition-all"
          >
            <div className="relative">
              <ShoppingBag className="h-4 w-4 text-[#D4AF37]" />
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#D4AF37] text-[10px] font-bold text-[#08140E]">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="hidden sm:inline font-mono text-[#D4AF37]">${cartTotal}</span>
          </button>

          {/* Mobile Hamburger Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="rounded-lg border border-[#1A3828] bg-[#0E2017] p-2 text-gray-300 lg:hidden min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* MOBILE NAVIGATION DRAWER */}
      {isMobileMenuOpen && (
        <div className="border-t border-[#1A3828] bg-[#0A1912] px-4 py-4 lg:hidden max-h-[85vh] overflow-y-auto animate-in slide-in-from-top-2">
          <div className="space-y-4 text-xs font-medium uppercase tracking-wider">
            
            {/* Quick Links */}
            <div className="grid grid-cols-2 gap-2 border-b border-[#1A3828] pb-3">
              <Link
                href="/shop/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-lg bg-[#122A1E] p-2.5 text-center font-bold text-white hover:text-[#D4AF37]"
              >
                Shop All Drinks
              </Link>
              <Link
                href="/shop/specials/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-lg gold-bg-gradient p-2.5 text-center font-bold text-black"
              >
                Specials
              </Link>
            </div>

            <div className="text-[11px] font-bold text-[#D4AF37] tracking-widest">
              Browse Categories
            </div>

            {/* Mobile Category Accordions */}
            <div className="space-y-2">
              {CATEGORIES.map((cat) => {
                const isExpanded = expandedMobileCategory === cat.slug;
                return (
                  <div key={cat.slug} className="rounded-xl border border-[#1A3828] bg-[#07130D] overflow-hidden">
                    <button
                      onClick={() => setExpandedMobileCategory(isExpanded ? null : cat.slug)}
                      className="w-full flex items-center justify-between p-3.5 text-left text-xs font-bold text-white hover:text-[#D4AF37] min-h-[44px]"
                    >
                      <span>{cat.name}</span>
                      <ChevronDown className={`h-4 w-4 text-[#D4AF37] transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    </button>

                    {isExpanded && (
                      <div className="border-t border-[#1A3828] bg-[#0C2217] p-2 space-y-1">
                        <Link
                          href={`/${cat.slug}/`}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block rounded-lg px-3 py-2 text-xs font-bold text-[#D4AF37] bg-[#122E20] min-h-[44px] flex items-center"
                        >
                          View All {cat.name} →
                        </Link>
                        {cat.subcategories.map((sub) => (
                          <Link
                            key={sub.slug}
                            href={`/${cat.slug}/${sub.slug}/`}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block rounded-lg px-3 py-2 text-xs text-gray-300 hover:text-white hover:bg-[#163626] min-h-[44px] flex items-center"
                          >
                            • {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Pages Navigation */}
            <div className="border-t border-[#1A3828] pt-3 space-y-2">
              <Link
                href="/brands/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 text-gray-200 hover:text-[#D4AF37] min-h-[44px] flex items-center"
              >
                Distillery & Winery Brands
              </Link>
              <Link
                href="/shop/collections/new-arrivals/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 text-gray-200 hover:text-[#D4AF37] min-h-[44px] flex items-center"
              >
                New Arrivals
              </Link>
              <Link
                href="/shop/gifts/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 text-gray-200 hover:text-[#D4AF37] min-h-[44px] flex items-center"
              >
                Gifts
              </Link>
              <Link
                href="/blog/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 text-gray-200 hover:text-[#D4AF37] min-h-[44px] flex items-center"
              >
                Blog
              </Link>
              <Link
                href="/about/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 text-gray-200 hover:text-[#D4AF37] min-h-[44px] flex items-center"
              >
                About
              </Link>
              <Link
                href="/contact/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 text-gray-200 hover:text-[#D4AF37] min-h-[44px] flex items-center"
              >
                Contact
              </Link>
            </div>

          </div>
        </div>
      )}
    </header>
  );
}
