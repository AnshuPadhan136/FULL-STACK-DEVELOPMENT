import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Tag, Check, X, Sparkles } from 'lucide-react';

export const CouponInput = () => {
  const { appliedCoupon, applyCoupon, removeCoupon } = useShop();
  const [inputCode, setInputCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    setLoading(true);
    setTimeout(() => {
      applyCoupon(inputCode);
      setInputCode('');
      setLoading(false);
    }, 200);
  };

  const handleQuickApply = (code) => {
    applyCoupon(code);
  };

  return (
    <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-slate-800 flex items-center space-x-1.5 uppercase tracking-wider">
          <Tag className="w-4 h-4 text-indigo-600" />
          <span>Promo / Coupon Code</span>
        </label>
        {appliedCoupon && (
          <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center space-x-1">
            <Check className="w-3 h-3" />
            <span>Code Active</span>
          </span>
        )}
      </div>

      {appliedCoupon ? (
        <div className="flex items-center justify-between bg-emerald-500/10 border border-emerald-200 p-3 rounded-xl">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <div>
              <span className="font-mono font-bold text-xs text-emerald-950 uppercase">{appliedCoupon}</span>
              <span className="text-[11px] text-emerald-700 block">Coupon discount applied!</span>
            </div>
          </div>
          <button
            onClick={removeCoupon}
            className="text-xs font-semibold text-rose-600 hover:text-rose-700 bg-white hover:bg-rose-50 border border-rose-200 px-2.5 py-1 rounded-lg transition-colors flex items-center space-x-1"
          >
            <X className="w-3.5 h-3.5" />
            <span>Remove</span>
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            placeholder="Enter code (e.g. SAVE10)"
            className="flex-1 px-3.5 py-2 text-xs font-mono font-semibold uppercase bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-slate-400"
          />
          <button
            type="submit"
            disabled={!inputCode.trim() || loading}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-md transition-all focus:outline-none"
          >
            Apply
          </button>
        </form>
      )}

      {/* Suggested Quick Apply Codes */}
      {!appliedCoupon && (
        <div className="pt-1 flex items-center space-x-2 text-[11px]">
          <span className="text-slate-400 font-medium">Try:</span>
          <button
            onClick={() => handleQuickApply('SAVE10')}
            className="font-mono font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-2 py-0.5 rounded transition-colors"
          >
            SAVE10 (10% Off)
          </button>
          <button
            onClick={() => handleQuickApply('FLAT50')}
            className="font-mono font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-2 py-0.5 rounded transition-colors"
          >
            FLAT50 ($50 Off &gt; $100)
          </button>
        </div>
      )}
    </div>
  );
};

export default CouponInput;
