import React, { useState } from 'react';
import { 
  SlidersHorizontal, Star, Search, RefreshCw, Sparkles, 
  Tag, Filter, Check, ArrowUpDown 
} from 'lucide-react';
import { useEcommerce } from '../../context/EcommerceContext';
import { ProductCard } from './ProductCard';

export const ProductGrid: React.FC = () => {
  const { 
    categories, filteredProducts, products,
    selectedCategory, setSelectedCategory,
    priceRange, setPriceRange,
    minRating, setMinRating,
    inStockOnly, setInStockOnly,
    sortBy, setSortBy,
    searchQuery, setSearchQuery,
    resetFilters
  } = useEcommerce();

  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const hasActiveFilters = 
    selectedCategory !== 'all' || 
    priceRange[0] > 0 || 
    priceRange[1] < 500 || 
    minRating > 0 || 
    inStockOnly || 
    searchQuery !== '';

  return (
    <div className="space-y-8">
      
      {/* Hero Banner - Editorial Architectural Header */}
      <div className="relative overflow-hidden bg-white border-2 border-[#1A1A1A] p-6 sm:p-10 shadow-[6px_6px_0px_#1A1A1A]">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1A1A1A] text-white text-[11px] font-bold uppercase tracking-[0.2em]">
            <Sparkles className="w-3.5 h-3.5" /> 01 / Enterprise Retail System
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-black text-[#1A1A1A] uppercase tracking-tight leading-none">
            Arch-Commerce Storefront
          </h1>
          <p className="text-[#5A5A40] text-xs sm:text-sm font-medium leading-relaxed max-w-2xl">
            High-performance curated catalog featuring real-time faceted filters, persistent state engine, Stripe API checkout simulation, and complete full-stack architecture specs.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-[#F9F8F6] border border-[#1A1A1A] px-3 py-1.5 text-xs text-[#1A1A1A] font-medium">
              <Tag className="w-3.5 h-3.5 text-[#5A5A40]" />
              <span>Promo Code: <strong className="font-mono font-bold uppercase">SAVE10</strong> for 10% off</span>
            </div>
            <div className="flex items-center gap-2 bg-[#F9F8F6] border border-[#1A1A1A] px-3 py-1.5 text-xs text-[#1A1A1A] font-medium">
              <Tag className="w-3.5 h-3.5 text-[#5A5A40]" />
              <span>Dispatch Code: <strong className="font-mono font-bold uppercase">FREESHIP</strong> for zero freight fee</span>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Navigation Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 text-xs font-bold uppercase tracking-wider whitespace-nowrap border transition-all ${
            selectedCategory === 'all'
              ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-[3px_3px_0px_#5A5A40]'
              : 'bg-white border-[#1A1A1A] text-[#1A1A1A] hover:bg-stone-100 shadow-[2px_2px_0px_#1A1A1A]'
          }`}
        >
          All Catalog ({products.length})
        </button>

        {categories.map(cat => {
          const count = products.filter(p => p.categoryId === cat.id).length;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider whitespace-nowrap border transition-all flex items-center gap-2 ${
                selectedCategory === cat.id
                  ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-[3px_3px_0px_#5A5A40]'
                  : 'bg-white border-[#1A1A1A] text-[#1A1A1A] hover:bg-stone-100 shadow-[2px_2px_0px_#1A1A1A]'
              }`}
            >
              <span>{cat.name}</span>
              <span className={`text-[10px] px-1.5 py-0.2 font-mono ${
                selectedCategory === cat.id ? 'bg-white text-[#1A1A1A]' : 'bg-[#1A1A1A] text-white'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Catalog Toolbar & Filters */}
      <div className="bg-white border border-[#1A1A1A] p-4 shadow-[4px_4px_0px_#1A1A1A] space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Active Results Summary */}
          <div className="flex items-center gap-3">
            <h2 className="font-serif font-bold text-[#1A1A1A] text-base flex items-center gap-2 uppercase">
              <Filter className="w-4 h-4 text-[#5A5A40]" /> Products Catalog 
              <span className="text-xs font-sans font-normal text-[#5A5A40]">({filteredProducts.length} items available)</span>
            </h2>

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-xs text-[#1A1A1A] hover:underline flex items-center gap-1 bg-[#F9F8F6] px-2.5 py-1 border border-[#1A1A1A] font-bold uppercase"
              >
                <RefreshCw className="w-3 h-3 text-[#5A5A40]" /> Reset Filters
              </button>
            )}
          </div>

          {/* Right Controls: Sort & Filter Toggle */}
          <div className="flex items-center gap-3 self-end md:self-auto">
            
            {/* Sort Selector */}
            <div className="flex items-center gap-2 bg-[#F9F8F6] border border-[#1A1A1A] px-3 py-1.5 text-xs text-[#1A1A1A] font-mono">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#5A5A40]" />
              <span className="text-[#5A5A40] hidden sm:inline uppercase">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-[#1A1A1A] font-bold focus:outline-none cursor-pointer uppercase"
              >
                <option value="featured">Featured First</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>

            {/* Filter Toggle Button */}
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-bold uppercase border transition-colors ${
                showMobileFilters 
                  ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' 
                  : 'bg-white text-[#1A1A1A] border-[#1A1A1A] hover:bg-stone-100'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" /> Filter Options
            </button>
          </div>
        </div>

        {/* Faceted Filter Drawer / Controls */}
        {showMobileFilters && (
          <div className="pt-4 border-t border-[#1A1A1A] grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 text-xs text-[#1A1A1A]">
            
            {/* Price Range Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center font-bold">
                <span className="text-[#5A5A40] uppercase">Max Price:</span>
                <span className="font-mono text-[#1A1A1A] text-sm">${priceRange[1]}</span>
              </div>
              <input
                type="range"
                min="0"
                max="500"
                step="10"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="w-full accent-[#1A1A1A] bg-stone-200 h-1.5 appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-[#5A5A40]">
                <span>$0</span>
                <span>$250</span>
                <span>$500</span>
              </div>
            </div>

            {/* Rating Filter */}
            <div className="space-y-2">
              <span className="text-[#5A5A40] font-bold uppercase block">Minimum Rating:</span>
              <div className="flex items-center gap-1">
                {[0, 3, 4, 4.5].map(stars => (
                  <button
                    key={stars}
                    onClick={() => setMinRating(stars)}
                    className={`px-2.5 py-1 text-[11px] font-bold border flex items-center gap-1 transition-colors ${
                      minRating === stars
                        ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                        : 'bg-white text-[#1A1A1A] border-[#1A1A1A] hover:bg-stone-100'
                    }`}
                  >
                    {stars === 0 ? 'All' : `${stars}+`} <Star className="w-3 h-3 fill-current text-amber-500" />
                  </button>
                ))}
              </div>
            </div>

            {/* Stock Toggle */}
            <div className="space-y-2">
              <span className="text-[#5A5A40] font-bold uppercase block">Availability:</span>
              <label className="flex items-center gap-2 cursor-pointer bg-[#F9F8F6] p-2 border border-[#1A1A1A]">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="accent-[#1A1A1A] w-4 h-4 cursor-pointer"
                />
                <span className="text-xs font-bold text-[#1A1A1A] uppercase">In Stock Items Only</span>
              </label>
            </div>

            {/* Active Query Tag */}
            <div className="space-y-2">
              <span className="text-[#5A5A40] font-bold uppercase block">Keyword Search:</span>
              <div className="relative">
                <input
                  type="text"
                  placeholder="FILTER BY KEYWORD..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#F9F8F6] border border-[#1A1A1A] px-3 py-1.5 text-xs font-mono text-[#1A1A1A] placeholder-[#5A5A40] focus:outline-none uppercase"
                />
              </div>
            </div>

          </div>
        )}
      </div>

      {/* Product Grid List */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white border-2 border-[#1A1A1A] shadow-[6px_6px_0px_#1A1A1A] p-12 text-center space-y-4 max-w-md mx-auto my-12">
          <div className="w-16 h-16 bg-[#1A1A1A] text-white flex items-center justify-center mx-auto border border-[#1A1A1A]">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="font-serif font-black text-[#1A1A1A] text-xl uppercase">No Catalog Matches</h3>
          <p className="text-xs text-[#5A5A40] leading-relaxed">
            No items in our catalog matched your search criteria or price filters.
          </p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 bg-[#1A1A1A] text-white font-bold text-xs uppercase tracking-wider border border-[#1A1A1A] shadow-[2px_2px_0px_#5A5A40] hover:bg-[#5A5A40] transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      )}

    </div>
  );
};
