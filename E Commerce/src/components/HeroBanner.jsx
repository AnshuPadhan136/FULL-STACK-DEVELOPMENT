import React from 'react';
import { useShop } from '../context/ShopContext';
import { Tag, ShieldCheck, Truck, Sparkles, ArrowRight } from 'lucide-react';

export const HeroBanner = () => {
  const { applyCoupon, setIsCartOpen, cart } = useShop();

  return (
    <div className="relative overflow-hidden bg-slate-900 text-white rounded-3xl my-6 mx-4 sm:mx-6 lg:mx-8 shadow-2xl">
      {/* Decorative Gradient Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 via-purple-900/80 to-slate-900/95 z-10" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl" />

      <div className="relative z-20 max-w-7xl mx-auto px-6 py-10 sm:py-14 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Left Content */}
        <div className="max-w-2xl space-y-4 text-center md:text-left">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Summer Sale Collection 2026</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            Discover Tech, Beauty & Lifestyle Essentials
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Shop real-time dynamic inventory directly with automatic discount coupons and itemized 18% GST tax breakdown at checkout.
          </p>

          {/* Coupon Code Shortcut Pills */}
          <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
            <div className="flex items-center space-x-2 bg-slate-800/80 border border-slate-700/80 rounded-xl p-2 pr-3 text-xs">
              <Tag className="w-4 h-4 text-emerald-400" />
              <div>
                <span className="font-bold font-mono text-emerald-300">SAVE10</span>
                <span className="text-slate-400 text-[11px] block">10% OFF Subtotal</span>
              </div>
            </div>

            <div className="flex items-center space-x-2 bg-slate-800/80 border border-slate-700/80 rounded-xl p-2 pr-3 text-xs">
              <Tag className="w-4 h-4 text-indigo-400" />
              <div>
                <span className="font-bold font-mono text-indigo-300">FLAT50</span>
                <span className="text-slate-400 text-[11px] block">$50 OFF (Orders &gt; $100)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Feature Highlights Card */}
        <div className="w-full md:w-auto flex flex-col sm:flex-row md:flex-col gap-3 min-w-[240px]">
          <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10">
            <Truck className="w-6 h-6 text-indigo-400 flex-shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-white">Express Delivery</h4>
              <p className="text-[11px] text-slate-300">Fast doorstep shipping</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10">
            <ShieldCheck className="w-6 h-6 text-emerald-400 flex-shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-white">Verified Pricing</h4>
              <p className="text-[11px] text-slate-300">Transparent 18% GST tax</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HeroBanner;
