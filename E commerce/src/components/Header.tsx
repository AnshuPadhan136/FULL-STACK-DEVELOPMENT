import React, { useState } from 'react';
import { 
  ShoppingBag, Search, Shield, User as UserIcon, Code2, 
  Store, Package, ChevronDown, Check, LogOut, FileText 
} from 'lucide-react';
import { useEcommerce, AppViewMode } from '../context/EcommerceContext';
import { UserRole } from '../types/ecommerce';

export const Header: React.FC = () => {
  const { 
    viewMode, setViewMode, 
    currentUser, switchUserRole, 
    cartItems, setIsCartOpen, 
    searchQuery, setSearchQuery, 
    setIsOrderHistoryOpen,
    orders
  } = useEcommerce();

  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const userOrderCount = orders.filter(o => o.userEmail === currentUser.email).length;

  return (
    <header className="sticky top-0 z-40 bg-[#F9F8F6]/95 backdrop-blur-md border-b border-[#1A1A1A] text-[#1A1A1A] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo & Brand - Editorial Header */}
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setViewMode('store')} 
              className="flex items-center gap-3 text-left group focus:outline-none"
            >
              <div className="w-10 h-10 bg-[#1A1A1A] text-white flex items-center justify-center font-serif font-black text-xl border border-[#1A1A1A] shadow-[2px_2px_0px_#5A5A40] group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform">
                A
              </div>
              <div>
                <h1 className="font-serif font-black text-xl tracking-tight leading-none uppercase text-[#1A1A1A]">
                  Arch-Commerce
                </h1>
                <p className="text-[10px] font-bold tracking-[0.18em] uppercase mt-1 text-[#5A5A40]">
                  Enterprise E-Commerce Architecture
                </p>
              </div>
            </button>

            {/* Navigation Tabs (Store, Admin, Blueprint) */}
            <nav className="hidden md:flex items-center gap-1.5 p-1 bg-white border border-[#1A1A1A]">
              <button
                onClick={() => setViewMode('store')}
                className={`flex items-center gap-2 px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-all ${
                  viewMode === 'store' 
                    ? 'bg-[#1A1A1A] text-white' 
                    : 'text-[#1A1A1A] hover:bg-stone-100'
                }`}
              >
                <Store className="w-3.5 h-3.5" />
                Storefront
              </button>

              <button
                onClick={() => setViewMode('admin')}
                className={`flex items-center gap-2 px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-all ${
                  viewMode === 'admin' 
                    ? 'bg-[#1A1A1A] text-white' 
                    : 'text-[#1A1A1A] hover:bg-stone-100'
                }`}
              >
                <Shield className="w-3.5 h-3.5" />
                Admin Ops
              </button>

              <button
                onClick={() => setViewMode('blueprint')}
                className={`flex items-center gap-2 px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-all ${
                  viewMode === 'blueprint' 
                    ? 'bg-[#1A1A1A] text-white' 
                    : 'text-[#1A1A1A] hover:bg-stone-100'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                Architecture
              </button>
            </nav>
          </div>

          {/* Quick Search Bar (when in storefront) */}
          {viewMode === 'store' && (
            <div className="hidden lg:flex flex-1 max-w-xs relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#5A5A40]" />
              <input
                type="text"
                placeholder="SEARCH CATALOG..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-[#1A1A1A] pl-9 pr-4 py-1.5 text-xs font-mono text-[#1A1A1A] placeholder-[#5A5A40]/70 uppercase focus:outline-none focus:ring-1 focus:ring-[#1A1A1A]"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#1A1A1A] hover:opacity-60"
                >
                  ✕
                </button>
              )}
            </div>
          )}

          {/* User Controls & Cart */}
          <div className="flex items-center gap-3">
            
            {/* User Role Quick Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsRoleMenuOpen(!isRoleMenuOpen)}
                className="flex items-center gap-2 bg-white hover:bg-stone-100 border border-[#1A1A1A] px-3 py-1.5 text-xs font-bold text-[#1A1A1A] transition-all focus:outline-none shadow-[2px_2px_0px_#1A1A1A]"
              >
                <div className="w-4 h-4 bg-[#5A5A40] text-white flex items-center justify-center font-bold text-[9px] uppercase">
                  {currentUser.role[0]}
                </div>
                <span className="hidden sm:inline-block max-w-[100px] truncate uppercase">{currentUser.name}</span>
                <span className="text-[9px] px-1.5 py-0.2 bg-[#1A1A1A] text-white uppercase font-mono font-bold">
                  {currentUser.role}
                </span>
                <ChevronDown className="w-3 h-3 text-[#1A1A1A]" />
              </button>

              {/* Role Dropdown Menu */}
              {isRoleMenuOpen && (
                <div className="absolute right-0 mt-2 w-60 bg-white border-2 border-[#1A1A1A] shadow-[4px_4px_0px_#1A1A1A] p-2 z-50 text-xs">
                  <div className="px-2.5 py-1.5 border-b border-[#1A1A1A] mb-1">
                    <p className="text-[#5A5A40] text-[10px] font-bold uppercase tracking-[0.15em]">SIMULATED ROLE</p>
                    <p className="font-serif font-bold text-[#1A1A1A] text-sm">{currentUser.name}</p>
                  </div>

                  <button
                    onClick={() => { switchUserRole('customer'); setIsRoleMenuOpen(false); }}
                    className={`w-full flex items-center justify-between px-2.5 py-2 text-left transition-colors ${
                      currentUser.role === 'customer' ? 'bg-[#5A5A40]/10 font-bold border-l-2 border-[#1A1A1A]' : 'text-[#1A1A1A] hover:bg-stone-100'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <UserIcon className="w-3.5 h-3.5 text-[#5A5A40]" />
                      <div>
                        <p className="font-bold uppercase text-[11px]">Customer Demo</p>
                        <p className="text-[10px] text-[#5A5A40]">Store, Cart, Orders</p>
                      </div>
                    </div>
                    {currentUser.role === 'customer' && <Check className="w-3.5 h-3.5 text-[#1A1A1A]" />}
                  </button>

                  <button
                    onClick={() => { switchUserRole('admin'); setIsRoleMenuOpen(false); }}
                    className={`w-full flex items-center justify-between px-2.5 py-2 text-left transition-colors ${
                      currentUser.role === 'admin' ? 'bg-[#5A5A40]/10 font-bold border-l-2 border-[#1A1A1A]' : 'text-[#1A1A1A] hover:bg-stone-100'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Shield className="w-3.5 h-3.5 text-[#5A5A40]" />
                      <div>
                        <p className="font-bold uppercase text-[11px]">Admin Operations</p>
                        <p className="text-[10px] text-[#5A5A40]">CRUD, Analytics, Orders</p>
                      </div>
                    </div>
                    {currentUser.role === 'admin' && <Check className="w-3.5 h-3.5 text-[#1A1A1A]" />}
                  </button>

                  <button
                    onClick={() => { switchUserRole('guest'); setIsRoleMenuOpen(false); }}
                    className={`w-full flex items-center justify-between px-2.5 py-2 text-left transition-colors ${
                      currentUser.role === 'guest' ? 'bg-[#5A5A40]/10 font-bold border-l-2 border-[#1A1A1A]' : 'text-[#1A1A1A] hover:bg-stone-100'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <LogOut className="w-3.5 h-3.5 text-[#5A5A40]" />
                      <div>
                        <p className="font-bold uppercase text-[11px]">Guest Shopper</p>
                        <p className="text-[10px] text-[#5A5A40]">Unauthenticated checkout</p>
                      </div>
                    </div>
                    {currentUser.role === 'guest' && <Check className="w-3.5 h-3.5 text-[#1A1A1A]" />}
                  </button>
                </div>
              )}
            </div>

            {/* Order History Button */}
            {currentUser.role !== 'guest' && (
              <button
                onClick={() => setIsOrderHistoryOpen(true)}
                className="relative p-2 text-[#1A1A1A] hover:bg-stone-200/60 border border-[#1A1A1A] transition-colors"
                title="My Order History"
              >
                <Package className="w-4 h-4" />
                {userOrderCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#5A5A40] border border-white"></span>
                )}
              </button>
            )}

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 bg-[#1A1A1A] text-white font-bold uppercase tracking-wider px-4 py-2 text-xs border border-[#1A1A1A] shadow-[2px_2px_0px_#5A5A40] hover:bg-[#5A5A40] transition-all active:translate-x-0.5 active:translate-y-0.5"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline-block">Cart</span>
              {totalCartCount > 0 && (
                <span className="bg-white text-[#1A1A1A] text-[10px] px-1.5 py-0.2 font-mono font-black ml-0.5 border border-[#1A1A1A]">
                  {totalCartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile View Toggle Bar */}
        <div className="md:hidden flex items-center justify-around py-2 border-t border-[#1A1A1A] text-xs font-bold uppercase">
          <button
            onClick={() => setViewMode('store')}
            className={`flex items-center gap-1.5 px-3 py-1 ${
              viewMode === 'store' ? 'bg-[#1A1A1A] text-white' : 'text-[#1A1A1A]'
            }`}
          >
            <Store className="w-3.5 h-3.5" /> Storefront
          </button>
          <button
            onClick={() => setViewMode('admin')}
            className={`flex items-center gap-1.5 px-3 py-1 ${
              viewMode === 'admin' ? 'bg-[#1A1A1A] text-white' : 'text-[#1A1A1A]'
            }`}
          >
            <Shield className="w-3.5 h-3.5" /> Admin
          </button>
          <button
            onClick={() => setViewMode('blueprint')}
            className={`flex items-center gap-1.5 px-3 py-1 ${
              viewMode === 'blueprint' ? 'bg-[#1A1A1A] text-white' : 'text-[#1A1A1A]'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" /> Blueprint
          </button>
        </div>

      </div>
    </header>
  );
};
