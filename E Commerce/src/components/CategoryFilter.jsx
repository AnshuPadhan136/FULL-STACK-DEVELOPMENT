import React from 'react';
import { useShop } from '../context/ShopContext';
import { LayoutGrid, Sparkles } from 'lucide-react';

export const CategoryFilter = () => {
  const { categories, selectedCategory, setSelectedCategory } = useShop();

  const formatCategoryName = (cat) => {
    if (cat === 'all') return 'All Products';
    return cat
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <div className="w-full my-4">
      <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-2 px-1">
        {/* All Products Tab */}
        <button
          onClick={() => setSelectedCategory('all')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
            selectedCategory === 'all'
              ? 'bg-slate-900 text-white shadow-md shadow-slate-300 scale-[1.02]'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <LayoutGrid className="w-3.5 h-3.5" />
          <span>All Products</span>
        </button>

        {/* Dynamic Categories */}
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`flex items-center space-x-1.5 px-4 py-2 rounded-full text-xs font-semibold capitalize whitespace-nowrap transition-all duration-200 ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 scale-[1.02]'
                  : 'bg-white text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 border border-slate-200'
              }`}
            >
              <span>{formatCategoryName(cat)}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryFilter;
