'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { Search, X, ArrowUpDown, Sparkles, Filter, ChevronRight, Check } from 'lucide-react';
import { BRANDS_DATA } from '@/config/brands';
import { SEO_LANDING_PAGES, SEO_COMBINATION_PAGES } from '@/config/seoPages';

export default function CategoryProductsClient({
  mainCategory,
  subCategory,
  categoryTitle,
  initialProducts = [],
  subcategories = [],
}) {
  // Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedStyles, setSelectedStyles] = useState([]);
  const [selectedStrengths, setSelectedStrengths] = useState([]);
  const [selectedAusImport, setSelectedAusImport] = useState([]);
  const [selectedOrigins, setSelectedOrigins] = useState([]);
  const [selectedPackSizes, setSelectedPackSizes] = useState([]);
  const [selectedContainers, setSelectedContainers] = useState([]);
  const [selectedDietary, setSelectedDietary] = useState([]);
  const [selectedAvailability, setSelectedAvailability] = useState([]);
  const [maxPrice, setMaxPrice] = useState(500);

  // Sorting
  const [sortBy, setSortBy] = useState('popular');

  // Mobile filter drawer state
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Helper to extract ABV number safely
  const getProductAbv = (p) => {
    if (p.abv) {
      const clean = String(p.abv).replace('<', '').replace('%', '').trim();
      const parsed = parseFloat(clean);
      if (!isNaN(parsed)) return parsed;
    }
    if (p.attributes?.abv !== undefined) {
      const clean = String(p.attributes.abv).replace('<', '').replace('%', '').trim();
      const parsed = parseFloat(clean);
      if (!isNaN(parsed)) return parsed;
    }
    return 0;
  };

  // Helper to determine strength category
  const getStrengthCategory = (abv) => {
    if (abv === 0 || abv < 0.5) return 'Non-Alcoholic (<0.5%)';
    if (abv < 3.0) return 'Light / Low Alcohol (<3.0%)';
    if (abv >= 3.0 && abv <= 3.9) return 'Mid-Strength (3.0% - 3.9%)';
    if (abv >= 4.0 && abv <= 5.5) return 'Full Strength (4.0% - 5.5%)';
    return 'High ABV / Strong (5.6%+)';
  };

  // Relevant SEO Landing Pages & Brands for Quick Crawl / Discovery
  const relevantSeoPages = useMemo(() => {
    const all = [...SEO_LANDING_PAGES, ...SEO_COMBINATION_PAGES];
    if (subCategory) {
      return all.filter((p) => p.mainCategory === mainCategory && p.subCategory === subCategory);
    }
    return all.filter((p) => p.mainCategory === mainCategory);
  }, [mainCategory, subCategory]);

  const relevantBrands = useMemo(() => {
    return BRANDS_DATA.filter((b) => b.category === mainCategory);
  }, [mainCategory]);

  // Extract all distinct filter facets from initialProducts with counts
  const facetOptions = useMemo(() => {
    const brandsMap = new Map();
    const stylesMap = new Map();
    const strengthsMap = new Map();
    const ausImportMap = new Map();
    const originsMap = new Map();
    const packSizesMap = new Map();
    const containersMap = new Map();
    const dietaryMap = new Map();

    initialProducts.forEach((p) => {
      // Brand
      if (p.brand) {
        brandsMap.set(p.brand, (brandsMap.get(p.brand) || 0) + 1);
      }

      // Style / Variety
      const style = p.styleOrVariety || p.attributes?.style;
      if (style) {
        stylesMap.set(style, (stylesMap.get(style) || 0) + 1);
      }

      // Strength
      const abv = getProductAbv(p);
      const strLabel = getStrengthCategory(abv);
      strengthsMap.set(strLabel, (strengthsMap.get(strLabel) || 0) + 1);

      // Country / Origin / State
      const pOrigins = [p.countryOfOrigin, p.regionOrState, p.attributes?.region].filter(Boolean);
      pOrigins.forEach((origin) => {
        originsMap.set(origin, (originsMap.get(origin) || 0) + 1);
      });
      if (p.countryOfOrigin) {
        const isAus = p.countryOfOrigin.toLowerCase() === 'australia' ? 'Australian Beer' : 'Imported Beer';
        ausImportMap.set(isAus, (ausImportMap.get(isAus) || 0) + 1);
      }

      // Pack Sizes (including variants)
      const packs = new Set();
      if (p.packSize) packs.add(p.packSize);
      if (p.variants && p.variants.length > 0) {
        p.variants.forEach((v) => {
          if (v.packSize) packs.add(v.packSize);
        });
      }
      packs.forEach((pack) => {
        packSizesMap.set(pack, (packSizesMap.get(pack) || 0) + 1);
      });

      // Container Types (including variants)
      const containers = new Set();
      if (p.containerType) containers.add(p.containerType);
      if (p.variants && p.variants.length > 0) {
        p.variants.forEach((v) => {
          if (v.container) containers.add(v.container);
        });
      }
      containers.forEach((cont) => {
        containersMap.set(cont, (containersMap.get(cont) || 0) + 1);
      });

      // Dietary / Claims
      const diet = p.dietary || p.attributes?.dietaryClaims || [];
      diet.forEach((d) => {
        dietaryMap.set(d, (dietaryMap.get(d) || 0) + 1);
      });
    });

    return {
      brands: Array.from(brandsMap.entries())
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count),
      styles: Array.from(stylesMap.entries())
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count),
      strengths: Array.from(strengthsMap.entries())
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count),
      ausImport: Array.from(ausImportMap.entries())
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count),
      origins: Array.from(originsMap.entries())
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count),
      packSizes: Array.from(packSizesMap.entries())
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count),
      containers: Array.from(containersMap.entries())
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count),
      dietary: Array.from(dietaryMap.entries())
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count),
    };
  }, [initialProducts]);

  // Filter & Sort Products
  const filteredProducts = useMemo(() => {
    return initialProducts
      .filter((p) => {
        // Search term
        if (searchTerm) {
          const query = searchTerm.toLowerCase();
          const matchName = p.name.toLowerCase().includes(query);
          const matchBrand = (p.brand || '').toLowerCase().includes(query);
          const matchStyle = (p.styleOrVariety || p.attributes?.style || '').toLowerCase().includes(query);
          const matchDesc = (p.description || '').toLowerCase().includes(query);
          const matchOrigin = (p.countryOfOrigin || '').toLowerCase().includes(query);
          if (!matchName && !matchBrand && !matchStyle && !matchDesc && !matchOrigin) return false;
        }

        // Subcategory Filter
        if (selectedSubcategories.length > 0) {
          if (!selectedSubcategories.includes(p.primarySubcategory)) return false;
        }

        // Brand Filter
        if (selectedBrands.length > 0) {
          if (!selectedBrands.includes(p.brand)) return false;
        }

        // Style Filter
        if (selectedStyles.length > 0) {
          const pStyle = p.styleOrVariety || p.attributes?.style;
          if (!selectedStyles.includes(pStyle)) return false;
        }

        // Strength Filter
        if (selectedStrengths.length > 0) {
          const abv = getProductAbv(p);
          const strCat = getStrengthCategory(abv);
          if (!selectedStrengths.includes(strCat)) return false;
        }

        // Aus / Import Filter
        if (selectedAusImport.length > 0) {
          const origin = p.countryOfOrigin || p.attributes?.region || '';
          const isAus = origin.toLowerCase() === 'australia' ? 'Australian Beer' : 'Imported Beer';
          if (!selectedAusImport.includes(isAus)) return false;
        }

        // Origin / State Filter
        if (selectedOrigins.length > 0) {
          const pOrigins = [p.countryOfOrigin, p.regionOrState, p.attributes?.region].filter(Boolean);
          const hasMatch = selectedOrigins.some((o) => pOrigins.includes(o));
          if (!hasMatch) return false;
        }

        // Pack Size Filter (supports main pack size or variant pack sizes)
        if (selectedPackSizes.length > 0) {
          const packs = [p.packSize, ...(p.variants || []).map((v) => v.packSize)].filter(Boolean);
          const hasMatch = selectedPackSizes.some((ps) => packs.includes(ps));
          if (!hasMatch) return false;
        }

        // Container Type Filter (supports main container or variant containers)
        if (selectedContainers.length > 0) {
          const containers = [p.containerType, ...(p.variants || []).map((v) => v.container)].filter(Boolean);
          const hasMatch = selectedContainers.some((c) => containers.includes(c));
          if (!hasMatch) return false;
        }

        // Dietary / Claims Filter
        if (selectedDietary.length > 0) {
          const pDietary = p.dietary || p.attributes?.dietaryClaims || [];
          const hasMatch = selectedDietary.some((d) => pDietary.includes(d));
          if (!hasMatch) return false;
        }

        // Price Filter
        if (p.price > maxPrice) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'abv-low') return getProductAbv(a) - getProductAbv(b);
        if (sortBy === 'abv-high') return getProductAbv(b) - getProductAbv(a);
        if (sortBy === 'name-az') return a.name.localeCompare(b.name);
        // default: popular / featured
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [
    initialProducts,
    searchTerm,
    selectedSubcategories,
    selectedBrands,
    selectedStyles,
    selectedStrengths,
    selectedOrigins,
    selectedAusImport,
    selectedPackSizes,
    selectedContainers,
    selectedDietary,
    maxPrice,
    sortBy,
  ]);

  const activeFilterCount =
    selectedSubcategories.length +
    selectedBrands.length +
    selectedStyles.length +
    selectedStrengths.length +
    selectedOrigins.length +
    selectedPackSizes.length +
    selectedContainers.length +
    selectedDietary.length +
    (maxPrice < 500 ? 1 : 0);

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedSubcategories([]);
    setSelectedBrands([]);
    setSelectedStyles([]);
    setSelectedStrengths([]);
    setSelectedOrigins([]);
    setSelectedPackSizes([]);
    setSelectedContainers([]);
    setSelectedDietary([]);
    setMaxPrice(500);
  };

  const toggleArrayFilter = (setter, currentArray, value) => {
    if (currentArray.includes(value)) {
      setter(currentArray.filter((item) => item !== value));
    } else {
      setter([...currentArray, value]);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      
      {/* FILTER SIDEBAR (Desktop) */}
      <aside className="hidden lg:block space-y-6 rounded-2xl border border-[#1A3828] bg-[#0A1A12] p-6 h-fit sticky top-24 shadow-lg">
        <div className="flex items-center justify-between border-b border-[#1A3828] pb-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-[#D4AF37]" />
            <h2 className="font-serif font-bold text-white text-base">Filter Discovery</h2>
          </div>
          {activeFilterCount > 0 && (
            <button
              onClick={clearAllFilters}
              className="text-xs font-semibold text-[#D4AF37] hover:underline"
            >
              Reset All ({activeFilterCount})
            </button>
          )}
        </div>

        {/* Subcategories (when on main category page) */}
        {subcategories.length > 0 && !subCategory && (
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
              Shopping Subcategory
            </h3>
            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
              {subcategories.map((sub) => {
                const checked = selectedSubcategories.includes(sub.slug);
                return (
                  <label
                    key={`subcat-${sub.slug}`}
                    className="flex items-center justify-between text-xs text-gray-300 hover:text-white cursor-pointer py-0.5"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleArrayFilter(setSelectedSubcategories, selectedSubcategories, sub.slug)}
                        className="rounded border-[#1A3828] bg-[#08140E] text-[#D4AF37] focus:ring-[#D4AF37]"
                      />
                      <span>{sub.name}</span>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>
        )}

        {/* Style / Variety Filter */}
        {facetOptions.styles.length > 0 && (
          <div className="space-y-2 border-t border-[#1A3828] pt-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">Style / Variety</h3>
            <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
              {facetOptions.styles.map((item) => {
                const checked = selectedStyles.includes(item.name);
                return (
                  <label key={`style-${item.name}`} className="flex items-center justify-between text-xs text-gray-300 hover:text-white cursor-pointer py-0.5">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleArrayFilter(setSelectedStyles, selectedStyles, item.name)}
                        className="rounded border-[#1A3828] bg-[#08140E] text-[#D4AF37] focus:ring-[#D4AF37]"
                      />
                      <span>{item.name}</span>
                    </div>
                    <span className="text-[10px] text-gray-500 font-mono">({item.count})</span>
                  </label>
                );
              })}
            </div>
          </div>
        )}

        {/* Strength / Alcohol Category */}
        {facetOptions.strengths.length > 0 && (
          <div className="space-y-2 border-t border-[#1A3828] pt-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">Strength / Alcohol</h3>
            <div className="space-y-1.5">
              {facetOptions.strengths.map((item) => {
                const checked = selectedStrengths.includes(item.name);
                return (
                  <label key={`strength-${item.name}`} className="flex items-center justify-between text-xs text-gray-300 hover:text-white cursor-pointer py-0.5">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleArrayFilter(setSelectedStrengths, selectedStrengths, item.name)}
                        className="rounded border-[#1A3828] bg-[#08140E] text-[#D4AF37] focus:ring-[#D4AF37]"
                      />
                      <span>{item.name}</span>
                    </div>
                    <span className="text-[10px] text-gray-500 font-mono">({item.count})</span>
                  </label>
                );
              })}
            </div>
          </div>
        )}

        {/* Brand Filter */}
        {facetOptions.brands.length > 0 && (
          <div className="space-y-2 border-t border-[#1A3828] pt-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">Brand</h3>
            <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
              {facetOptions.brands.map((item) => {
                const checked = selectedBrands.includes(item.name);
                return (
                  <label key={`brand-${item.name}`} className="flex items-center justify-between text-xs text-gray-300 hover:text-white cursor-pointer py-0.5">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleArrayFilter(setSelectedBrands, selectedBrands, item.name)}
                        className="rounded border-[#1A3828] bg-[#08140E] text-[#D4AF37] focus:ring-[#D4AF37]"
                      />
                      <span>{item.name}</span>
                    </div>
                    <span className="text-[10px] text-gray-500 font-mono">({item.count})</span>
                  </label>
                );
              })}
            </div>
          </div>
        )}

        {/* Country of Origin Filter */}
        {facetOptions.origins.length > 0 && (
          <div className="space-y-2 border-t border-[#1A3828] pt-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">Origin / Country</h3>
            <div className="space-y-1.5">
              {facetOptions.origins.map((item) => {
                const checked = selectedOrigins.includes(item.name);
                return (
                  <label key={`origin-${item.name}`} className="flex items-center justify-between text-xs text-gray-300 hover:text-white cursor-pointer py-0.5">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleArrayFilter(setSelectedOrigins, selectedOrigins, item.name)}
                        className="rounded border-[#1A3828] bg-[#08140E] text-[#D4AF37] focus:ring-[#D4AF37]"
                      />
                      <span>{item.name}</span>
                    </div>
                    <span className="text-[10px] text-gray-500 font-mono">({item.count})</span>
                  </label>
                );
              })}
            </div>
          </div>
        )}

        {/* Pack Size */}
        {facetOptions.packSizes.length > 0 && (
          <div className="space-y-2 border-t border-[#1A3828] pt-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">Pack Size</h3>
            <div className="space-y-1.5">
              {facetOptions.packSizes.map((item) => {
                const checked = selectedPackSizes.includes(item.name);
                return (
                  <label key={`pack-${item.name}`} className="flex items-center justify-between text-xs text-gray-300 hover:text-white cursor-pointer py-0.5">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleArrayFilter(setSelectedPackSizes, selectedPackSizes, item.name)}
                        className="rounded border-[#1A3828] bg-[#08140E] text-[#D4AF37] focus:ring-[#D4AF37]"
                      />
                      <span>{item.name}</span>
                    </div>
                    <span className="text-[10px] text-gray-500 font-mono">({item.count})</span>
                  </label>
                );
              })}
            </div>
          </div>
        )}

        {/* Container Type */}
        {facetOptions.containers.length > 0 && (
          <div className="space-y-2 border-t border-[#1A3828] pt-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">Container Type</h3>
            <div className="space-y-1.5">
              {facetOptions.containers.map((item) => {
                const checked = selectedContainers.includes(item.name);
                return (
                  <label key={`cont-${item.name}`} className="flex items-center justify-between text-xs text-gray-300 hover:text-white cursor-pointer py-0.5">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleArrayFilter(setSelectedContainers, selectedContainers, item.name)}
                        className="rounded border-[#1A3828] bg-[#08140E] text-[#D4AF37] focus:ring-[#D4AF37]"
                      />
                      <span>{item.name}</span>
                    </div>
                    <span className="text-[10px] text-gray-500 font-mono">({item.count})</span>
                  </label>
                );
              })}
            </div>
          </div>
        )}

        {/* Dietary & Claims */}
        {facetOptions.dietary.length > 0 && (
          <div className="space-y-2 border-t border-[#1A3828] pt-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">Dietary & Attributes</h3>
            <div className="space-y-1.5">
              {facetOptions.dietary.map((item) => {
                const checked = selectedDietary.includes(item.name);
                return (
                  <label key={`dietary-${item.name}`} className="flex items-center justify-between text-xs text-gray-300 hover:text-white cursor-pointer py-0.5">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleArrayFilter(setSelectedDietary, selectedDietary, item.name)}
                        className="rounded border-[#1A3828] bg-[#08140E] text-[#D4AF37] focus:ring-[#D4AF37]"
                      />
                      <span>{item.name}</span>
                    </div>
                    <span className="text-[10px] text-gray-500 font-mono">({item.count})</span>
                  </label>
                );
              })}
            </div>
          </div>
        )}

        {/* Max Price Slider */}
        <div className="space-y-2 border-t border-[#1A3828] pt-4">
          <div className="flex justify-between text-xs text-gray-300">
            <span className="font-bold uppercase tracking-wider">Max Price</span>
            <span className="text-[#D4AF37] font-mono font-bold">${maxPrice} AUD</span>
          </div>
          <input
            type="range"
            min="15"
            max="500"
            step="5"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full accent-[#D4AF37] bg-[#08140E] rounded-lg cursor-pointer"
          />
        </div>

      </aside>

      {/* MAIN PRODUCTS AREA */}
      <main className="lg:col-span-3 space-y-6">
        
        {/* Curated SEO Styles & Brand Vaults Quick Crawl Section */}
        {relevantSeoPages.length > 0 && (
          <div className="rounded-xl border border-[#1A3828] bg-[#0E2017] p-4">
            <div className="flex items-center gap-1.5 text-[#D4AF37] text-xs font-mono uppercase tracking-wider mb-2.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Explore High-Intent {categoryTitle} Vaults & Styles</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {relevantSeoPages.map((sp) => (
                <Link
                  key={`seo-link-${sp.mainCategory}-${sp.subCategory}-${sp.slug}`}
                  href={`/${sp.mainCategory}/${sp.subCategory}/${sp.slug}/`}
                  className="inline-flex items-center gap-1 rounded-full border border-[#1A3828] bg-[#08140E] px-3 py-1 text-xs font-medium text-gray-300 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all"
                >
                  <span>{sp.name}</span>
                  <ChevronRight className="w-3 h-3 text-[#D4AF37]/70" />
                </Link>
              ))}
              {relevantBrands.slice(0, 4).map((b) => (
                <Link
                  key={`brand-vault-${b.slug}`}
                  href={`/brands/${b.slug}/`}
                  className="inline-flex items-center gap-1 rounded-full border border-[#D4AF37]/30 bg-[#122A1E] px-3 py-1 text-xs font-medium text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all"
                >
                  <span>{b.name} Vault</span>
                  <ChevronRight className="w-3 h-3 opacity-70" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between rounded-xl border border-[#1A3828] bg-[#0E2017] p-4">
          
          {/* Search within category */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder={`Search within ${categoryTitle} (${filteredProducts.length} items)...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-[#1A3828] bg-[#08140E] pl-9 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:border-[#D4AF37] focus:outline-none"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 justify-between sm:justify-end">
            {/* Mobile Filter Trigger */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="flex items-center gap-2 rounded-lg border border-[#1A3828] bg-[#08140E] px-3 py-2 text-xs font-semibold text-gray-200 lg:hidden min-h-[44px]"
            >
              <Filter className="h-4 w-4 text-[#D4AF37]" />
              <span>Filters {activeFilterCount > 0 ? `(${activeFilterCount})` : ''}</span>
            </button>

            {/* Sort Selector */}
            <div className="flex items-center gap-2">
              <ArrowUpDown className="h-4 w-4 text-[#D4AF37] hidden sm:block" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-lg border border-[#1A3828] bg-[#08140E] px-3 py-2 text-xs font-semibold text-gray-200 focus:border-[#D4AF37] focus:outline-none min-h-[44px] cursor-pointer"
              >
                <option value="popular">Featured & Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="abv-high">ABV: Highest Strength First</option>
                <option value="abv-low">ABV: Non/Low Alcohol First</option>
                <option value="name-az">Name: A to Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filters Badges Bar */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 rounded-xl border border-[#1A3828] bg-[#0A1A12] p-3 text-xs">
            <span className="text-gray-400 font-semibold mr-1">Active Filters:</span>
            
            {selectedSubcategories.map((sub) => (
              <span key={`active-sub-${sub}`} className="inline-flex items-center gap-1 rounded-full border border-[#D4AF37]/40 bg-[#122A1E] px-2.5 py-1 text-white">
                Subcategory: {sub}
                <X className="h-3 w-3 cursor-pointer text-[#D4AF37]" onClick={() => toggleArrayFilter(setSelectedSubcategories, selectedSubcategories, sub)} />
              </span>
            ))}

            {selectedStyles.map((s) => (
              <span key={`active-style-${s}`} className="inline-flex items-center gap-1 rounded-full border border-[#D4AF37]/40 bg-[#122A1E] px-2.5 py-1 text-white">
                Style: {s}
                <X className="h-3 w-3 cursor-pointer text-[#D4AF37]" onClick={() => toggleArrayFilter(setSelectedStyles, selectedStyles, s)} />
              </span>
            ))}

            {selectedStrengths.map((str) => (
              <span key={`active-str-${str}`} className="inline-flex items-center gap-1 rounded-full border border-[#D4AF37]/40 bg-[#122A1E] px-2.5 py-1 text-white">
                Strength: {str}
                <X className="h-3 w-3 cursor-pointer text-[#D4AF37]" onClick={() => toggleArrayFilter(setSelectedStrengths, selectedStrengths, str)} />
              </span>
            ))}

            {selectedBrands.map((b) => (
              <span key={`active-brand-${b}`} className="inline-flex items-center gap-1 rounded-full border border-[#D4AF37]/40 bg-[#122A1E] px-2.5 py-1 text-white">
                Brand: {b}
                <X className="h-3 w-3 cursor-pointer text-[#D4AF37]" onClick={() => toggleArrayFilter(setSelectedBrands, selectedBrands, b)} />
              </span>
            ))}

            {selectedOrigins.map((o) => (
              <span key={`active-orig-${o}`} className="inline-flex items-center gap-1 rounded-full border border-[#D4AF37]/40 bg-[#122A1E] px-2.5 py-1 text-white">
                Origin: {o}
                <X className="h-3 w-3 cursor-pointer text-[#D4AF37]" onClick={() => toggleArrayFilter(setSelectedOrigins, selectedOrigins, o)} />
              </span>
            ))}

            {selectedPackSizes.map((p) => (
              <span key={`active-pack-${p}`} className="inline-flex items-center gap-1 rounded-full border border-[#D4AF37]/40 bg-[#122A1E] px-2.5 py-1 text-white">
                Pack: {p}
                <X className="h-3 w-3 cursor-pointer text-[#D4AF37]" onClick={() => toggleArrayFilter(setSelectedPackSizes, selectedPackSizes, p)} />
              </span>
            ))}

            {selectedContainers.map((c) => (
              <span key={`active-cont-${c}`} className="inline-flex items-center gap-1 rounded-full border border-[#D4AF37]/40 bg-[#122A1E] px-2.5 py-1 text-white">
                Container: {c}
                <X className="h-3 w-3 cursor-pointer text-[#D4AF37]" onClick={() => toggleArrayFilter(setSelectedContainers, selectedContainers, c)} />
              </span>
            ))}

            {selectedDietary.map((d) => (
              <span key={`active-diet-${d}`} className="inline-flex items-center gap-1 rounded-full border border-[#D4AF37]/40 bg-[#122A1E] px-2.5 py-1 text-white">
                Dietary: {d}
                <X className="h-3 w-3 cursor-pointer text-[#D4AF37]" onClick={() => toggleArrayFilter(setSelectedDietary, selectedDietary, d)} />
              </span>
            ))}

            {maxPrice < 500 && (
              <span className="inline-flex items-center gap-1 rounded-full border border-[#D4AF37]/40 bg-[#122A1E] px-2.5 py-1 text-white">
                Max ${maxPrice} AUD
                <X className="h-3 w-3 cursor-pointer text-[#D4AF37]" onClick={() => setMaxPrice(500)} />
              </span>
            )}

            <button
              onClick={clearAllFilters}
              className="text-xs font-bold text-[#D4AF37] hover:underline ml-auto"
            >
              Clear All
            </button>
          </div>
        )}

        {/* Results Counter */}
        <div className="text-xs text-gray-400 flex items-center justify-between">
          <span>
            Showing <strong className="text-[#D4AF37] font-bold">{filteredProducts.length}</strong> of{' '}
            <strong className="text-white">{initialProducts.length}</strong> {categoryTitle} products
          </span>
          <span className="text-gray-500 hidden sm:inline">RSA Licensed Delivery • Australia Wide Fast Dispatch</span>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product, idx) => (
              <ProductCard
                key={product.slug ? `prod-card-${product.slug}` : `prod-card-idx-${idx}`}
                product={product}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-[#1A3828] bg-[#0A1A12] p-12 text-center space-y-4">
            <Filter className="h-10 w-10 text-gray-600 mx-auto" />
            <h3 className="text-lg font-serif font-bold text-white">No products match your current filters</h3>
            <p className="text-xs text-gray-400 max-w-md mx-auto">
              Try resetting some of your selected filters or search with a broader keyword to find what you need.
            </p>
            <button
              onClick={clearAllFilters}
              className="inline-flex items-center gap-2 rounded-xl gold-bg-gradient px-5 py-2.5 text-xs font-bold text-black"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </main>

      {/* MOBILE FILTER DRAWER */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm lg:hidden flex justify-end">
          <div className="w-full max-w-xs bg-[#0A1A12] h-full p-6 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b border-[#1A3828] pb-4">
              <h2 className="font-serif font-bold text-white text-base">Filter Discovery</h2>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="rounded-lg p-2 text-gray-400 hover:text-white min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Mobile Filter Accordions */}
            {facetOptions.styles.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">Style / Variety</h3>
                <div className="space-y-1.5 max-h-40 overflow-y-auto">
                  {facetOptions.styles.map((item) => {
                    const checked = selectedStyles.includes(item.name);
                    return (
                      <label key={`m-style-${item.name}`} className="flex items-center justify-between text-xs text-gray-300 py-1">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleArrayFilter(setSelectedStyles, selectedStyles, item.name)}
                            className="rounded border-[#1A3828] bg-[#08140E] text-[#D4AF37]"
                          />
                          <span>{item.name}</span>
                        </div>
                        <span className="text-[10px] text-gray-500">({item.count})</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}

            {facetOptions.strengths.length > 0 && (
              <div className="space-y-2 border-t border-[#1A3828] pt-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">Strength / Alcohol</h3>
                <div className="space-y-1.5">
                  {facetOptions.strengths.map((item) => {
                    const checked = selectedStrengths.includes(item.name);
                    return (
                      <label key={`m-str-${item.name}`} className="flex items-center justify-between text-xs text-gray-300 py-1">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleArrayFilter(setSelectedStrengths, selectedStrengths, item.name)}
                            className="rounded border-[#1A3828] bg-[#08140E] text-[#D4AF37]"
                          />
                          <span>{item.name}</span>
                        </div>
                        <span className="text-[10px] text-gray-500">({item.count})</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}

            {facetOptions.brands.length > 0 && (
              <div className="space-y-2 border-t border-[#1A3828] pt-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">Brand</h3>
                <div className="space-y-1.5 max-h-40 overflow-y-auto">
                  {facetOptions.brands.map((item) => {
                    const checked = selectedBrands.includes(item.name);
                    return (
                      <label key={`m-brand-${item.name}`} className="flex items-center justify-between text-xs text-gray-300 py-1">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleArrayFilter(setSelectedBrands, selectedBrands, item.name)}
                            className="rounded border-[#1A3828] bg-[#08140E] text-[#D4AF37]"
                          />
                          <span>{item.name}</span>
                        </div>
                        <span className="text-[10px] text-gray-500">({item.count})</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Price Slider */}
            <div className="space-y-2 border-t border-[#1A3828] pt-4">
              <div className="flex justify-between text-xs text-gray-300">
                <span className="font-bold uppercase tracking-wider">Max Price</span>
                <span className="text-[#D4AF37] font-mono font-bold">${maxPrice} AUD</span>
              </div>
              <input
                type="range"
                min="15"
                max="500"
                step="5"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#D4AF37]"
              />
            </div>

            <div className="space-y-2 pt-4">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full rounded-xl gold-bg-gradient py-3 text-xs font-bold text-black min-h-[44px]"
              >
                Apply Filters ({filteredProducts.length} Results)
              </button>
              {activeFilterCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="w-full rounded-xl border border-[#1A3828] py-2.5 text-xs font-bold text-gray-300 hover:text-white"
                >
                  Reset All Filters
                </button>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
