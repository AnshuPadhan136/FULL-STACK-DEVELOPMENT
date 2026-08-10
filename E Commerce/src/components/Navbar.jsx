import React from 'react';
import { useShop } from '../context/ShopContext';
import { ShoppingBag, Search, Tag, Sparkles, X } from 'lucide-react';

export const Navbar = () => {
  const {
    cart,
    setIsCartOpen,
    searchQuery,
    setSearchQuery,
    orderTotals
  } = useShop();

  const cartItemCount = orderTotals.totalItemCount;

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white text-xs py-2 px-4 text-center font-medium tracking-wide flex items-center justify-center space-x-2">
        <Sparkles className="w-3.5 h-3.5 animate-pulse" />
        <span>
          Exclusive Savings: Use code <strong className="bg-white/20 px-1.5 py-0.5 rounded font-mono">SAVE10</strong> for 10% OFF or <strong className="bg-white/20 px-1.5 py-0.5 rounded font-mono">FLAT50</strong> ($50 OFF orders &gt; $100)!
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Brand Logo */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-200">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <a href="#" className="flex flex-col">
              <span className="text-xl font-extrabold bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-700 bg-clip-text text-transparent tracking-tight">
                AuraMart
              </span>
              <span className="text-[10px] text-indigo-600 font-semibold tracking-wider uppercase -mt-1">
                Store
              </span>
            </a>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products by title, description, or brand..."
                className="w-full pl-10 pr-10 py-2.5 bg-slate-100/80 hover:bg-slate-100 border border-slate-200/80 rounded-full text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Cart Icon & Actions */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 text-slate-700 hover:text-indigo-600 bg-slate-100 hover:bg-indigo-50 rounded-full transition-all flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="hidden sm:inline-block text-xs font-semibold pr-1">Cart</span>
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-indigo-600 to-pink-600 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-pulse">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Navbar;
