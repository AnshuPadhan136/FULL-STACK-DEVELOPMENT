import React from 'react';
import { useShop } from '../context/ShopContext';
import { ArrowUpDown } from 'lucide-react';

export const SortSelector = () => {
  const { sortBy, setSortBy, products } = useShop();

  return (
    <div className="flex items-center justify-between py-3 border-b border-slate-200 mb-6 flex-wrap gap-4">
      <div className="text-sm font-medium text-slate-600">
        Showing <span className="font-bold text-slate-900">{products.length}</span> products
      </div>

      <div className="flex items-center space-x-2">
        <ArrowUpDown className="w-4 h-4 text-slate-400" />
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Sort by:
        </span>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-white border border-slate-300 hover:border-slate-400 text-slate-800 text-xs font-semibold rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all cursor-pointer shadow-sm"
        >
          <option value="default">Featured / Default</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
          <option value="title">Alphabetical (A-Z)</option>
        </select>
      </div>
    </div>
  );
};

export default SortSelector;
