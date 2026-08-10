import React from 'react';
import { useShop } from '../context/ShopContext';
import { formatCurrency } from '../utils/pricing';
import { ShieldCheck, Info, Tag } from 'lucide-react';

export const PriceSummary = ({ showCheckoutBtn = false, onCheckout = null }) => {
  const { orderTotals, appliedCoupon } = useShop();

  const {
    subtotal,
    discount,
    taxableAmount,
    gstTaxRate,
    gstTaxAmount,
    grandTotal,
    totalItemCount
  } = orderTotals;

  return (
    <div className="bg-slate-900 text-white rounded-2xl p-5 space-y-4 shadow-xl border border-slate-800">
      <h3 className="text-sm font-bold tracking-wider uppercase text-slate-300 pb-2 border-b border-slate-800 flex items-center justify-between">
        <span>Order Summary</span>
        <span className="text-xs text-slate-400 font-normal">{totalItemCount} {totalItemCount === 1 ? 'item' : 'items'}</span>
      </h3>

      <div className="space-y-2.5 text-xs font-medium text-slate-300">
        
        {/* 1. Subtotal */}
        <div className="flex items-center justify-between">
          <span className="text-slate-400">Subtotal</span>
          <span className="font-bold text-white">{formatCurrency(subtotal)}</span>
        </div>

        {/* 2. Coupon Discount */}
        {discount > 0 && (
          <div className="flex items-center justify-between text-emerald-400 bg-emerald-950/50 p-2 rounded-xl border border-emerald-800/40">
            <span className="flex items-center space-x-1">
              <Tag className="w-3.5 h-3.5" />
              <span>Discount ({appliedCoupon})</span>
            </span>
            <span className="font-bold">-{formatCurrency(discount)}</span>
          </div>
        )}

        {/* 3. Taxable Amount */}
        <div className="flex items-center justify-between pt-1 border-t border-slate-800/60">
          <span className="text-slate-400">Taxable Amount</span>
          <span className="font-semibold text-slate-200">{formatCurrency(taxableAmount)}</span>
        </div>

        {/* 4. GST Tax (18%) */}
        <div className="flex items-center justify-between text-slate-300">
          <span className="flex items-center space-x-1">
            <span>GST ({gstTaxRate}%)</span>
            <span className="text-[10px] text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">Standard Tax</span>
          </span>
          <span className="font-semibold text-slate-200">{formatCurrency(gstTaxAmount)}</span>
        </div>

        {/* 5. Grand Total */}
        <div className="pt-3 border-t border-slate-700/80 flex items-center justify-between text-base font-extrabold text-white">
          <span>Grand Total</span>
          <span className="text-xl text-indigo-400 font-black">{formatCurrency(grandTotal)}</span>
        </div>

      </div>

      {showCheckoutBtn && (
        <button
          onClick={onCheckout}
          disabled={totalItemCount === 0}
          className="w-full mt-2 py-3.5 px-6 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50 text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-900/50 transition-all focus:outline-none flex items-center justify-center space-x-2"
        >
          <ShieldCheck className="w-5 h-5" />
          <span>Proceed to Checkout</span>
        </button>
      )}
    </div>
  );
};

export default PriceSummary;
