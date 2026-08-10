import React from 'react';
import { useShop } from '../context/ShopContext';
import { formatCurrency } from '../utils/pricing';
import { CheckCircle2, ShoppingBag, Receipt, Sparkles, Printer, ArrowRight } from 'lucide-react';

export const OrderConfirmationModal = () => {
  const {
    isOrderConfirmed,
    setIsOrderConfirmed,
    lastOrderDetails
  } = useShop();

  if (!isOrderConfirmed || !lastOrderDetails) return null;

  const {
    orderId,
    orderDate,
    customer,
    items,
    totals,
    appliedCoupon
  } = lastOrderDetails;

  const handleClose = () => {
    setIsOrderConfirmed(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[92vh]">
        
        {/* Top Header Badge */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 p-6 text-white text-center space-y-2">
          <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto text-white shadow-lg">
            <CheckCircle2 className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight">Order Confirmed!</h2>
          <p className="text-xs text-emerald-100 font-medium">
            Thank you, <strong className="text-white">{customer.fullName}</strong>. Your purchase was successful!
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-800">
          
          {/* Order Info Row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-xs">
            <div>
              <span className="text-slate-400 font-bold block uppercase text-[10px]">Order Number</span>
              <span className="font-mono font-extrabold text-slate-900">{orderId}</span>
            </div>
            <div>
              <span className="text-slate-400 font-bold block uppercase text-[10px]">Date</span>
              <span className="font-semibold text-slate-800">{orderDate}</span>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="text-slate-400 font-bold block uppercase text-[10px]">Payment</span>
              <span className="font-semibold text-slate-800 capitalize">{customer.paymentMethod}</span>
            </div>
          </div>

          {/* Delivery Details */}
          <div className="space-y-1 text-xs">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Shipping To</h4>
            <p className="text-slate-600 leading-relaxed font-medium">
              {customer.fullName} &bull; {customer.email}<br />
              {customer.address}, {customer.city} {customer.zipCode}
            </p>
          </div>

          {/* Items Purchased List */}
          <div className="space-y-3 pt-3 border-t border-slate-100">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] flex items-center justify-between">
              <span>Items Receipt</span>
              <span className="text-slate-500 font-normal">{items.length} items</span>
            </h4>

            <div className="divide-y divide-slate-100 max-h-48 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.id} className="py-2.5 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-3">
                    <img src={item.thumbnail} alt="" className="w-10 h-10 object-contain bg-slate-50 rounded-lg p-0.5" />
                    <div>
                      <h5 className="font-bold text-slate-900 line-clamp-1">{item.title}</h5>
                      <span className="text-[11px] text-slate-400">Qty: {item.quantity} × {formatCurrency(item.price)}</span>
                    </div>
                  </div>
                  <span className="font-bold text-slate-900">{formatCurrency(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Price & GST Breakdown Table */}
          <div className="bg-slate-900 text-white rounded-2xl p-5 space-y-2.5 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Subtotal</span>
              <span className="font-semibold text-white">{formatCurrency(totals.subtotal)}</span>
            </div>

            {totals.discount > 0 && (
              <div className="flex justify-between text-emerald-400">
                <span>Discount ({appliedCoupon})</span>
                <span className="font-semibold">-{formatCurrency(totals.discount)}</span>
              </div>
            )}

            <div className="flex justify-between text-slate-400 pt-1 border-t border-slate-800">
              <span>Taxable Amount</span>
              <span className="font-semibold text-slate-200">{formatCurrency(totals.taxableAmount)}</span>
            </div>

            <div className="flex justify-between text-slate-300">
              <span>GST Tax ({totals.gstTaxRate}%)</span>
              <span className="font-semibold text-slate-200">{formatCurrency(totals.gstTaxAmount)}</span>
            </div>

            <div className="flex justify-between text-sm font-black text-white pt-2 border-t border-slate-700">
              <span>Total Paid</span>
              <span className="text-lg text-emerald-400 font-extrabold">{formatCurrency(totals.grandTotal)}</span>
            </div>
          </div>

        </div>

        {/* Footer Action */}
        <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-400 font-medium">Cart has been cleared.</span>
          <button
            onClick={handleClose}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center space-x-2"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};

export default OrderConfirmationModal;
