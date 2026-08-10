import React, { useState } from 'react';
import { 
  X, ShoppingBag, Trash2, ArrowRight, Tag, 
  Sparkles, AlertCircle, Check, ShieldCheck 
} from 'lucide-react';
import { useEcommerce } from '../../context/EcommerceContext';

export const CartDrawer: React.FC = () => {
  const { 
    isCartOpen, setIsCartOpen, 
    cartItems, removeFromCart, updateCartQuantity, 
    clearCart, appliedDiscount, applyDiscountCode, removeDiscountCode,
    cartSubtotal, discountAmount, taxAmount, shippingFee, cartTotal,
    setIsCheckoutOpen
  } = useEcommerce();

  const [promoInput, setPromoInput] = useState('');
  const [promoFeedback, setPromoFeedback] = useState<{ success: boolean; message: string } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyDiscountCode(promoInput);
    setPromoFeedback(res);
    if (res.success) setPromoInput('');
  };

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#1A1A1A]/60 backdrop-blur-sm transition-opacity">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#F9F8F6] border-l-2 border-[#1A1A1A] text-[#1A1A1A] shadow-[8px_0px_0px_#1A1A1A] flex flex-col justify-between">
          
          {/* Cart Header */}
          <div className="p-5 border-b border-[#1A1A1A] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-[#1A1A1A] text-white">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-black text-[#1A1A1A] text-lg uppercase">Selected Items</h3>
                <p className="text-[11px] font-bold text-[#5A5A40] uppercase tracking-wider">
                  {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in dispatch bag
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {cartItems.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-xs font-bold uppercase text-[#5A5A40] hover:text-[#1A1A1A] hover:underline px-2 py-1"
                  title="Clear entire cart"
                >
                  Clear All
                </button>
              )}
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 bg-white border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-[#5A5A40] py-12">
                <div className="w-16 h-16 bg-white border border-[#1A1A1A] flex items-center justify-center text-[#1A1A1A]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-[#1A1A1A] text-base uppercase">Bag Is Currently Empty</h4>
                  <p className="text-xs text-[#5A5A40] mt-1 max-w-xs leading-relaxed">
                    Explore our curated storefront catalog and add items to experience instant checkout processing.
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-4 py-2 bg-[#1A1A1A] text-white font-bold text-xs uppercase tracking-wider border border-[#1A1A1A] shadow-[2px_2px_0px_#5A5A40] hover:bg-[#5A5A40]"
                >
                  Browse Storefront
                </button>
              </div>
            ) : (
              cartItems.map(item => (
                <div key={item.id} className="flex gap-3 bg-white p-3 border border-[#1A1A1A] shadow-[2px_2px_0px_#1A1A1A]">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.title}
                    className="w-16 h-16 border border-[#1A1A1A] object-cover bg-[#F9F8F6] shrink-0"
                  />
                  
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="font-serif font-bold text-[#1A1A1A] text-xs truncate">
                          {item.product.title}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#5A5A40] hover:text-[#1A1A1A] p-1 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {(item.selectedColor || item.selectedSize) && (
                        <p className="text-[10px] text-[#5A5A40] font-mono mt-0.5 uppercase">
                          {item.selectedColor && `Color: ${item.selectedColor}`}
                          {item.selectedColor && item.selectedSize && ` | `}
                          {item.selectedSize && `Size: ${item.selectedSize}`}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <span className="font-serif font-black text-[#1A1A1A] text-sm">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>

                      {/* Qty Selector */}
                      <div className="flex items-center border border-[#1A1A1A] bg-white">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 hover:bg-stone-200 text-[#1A1A1A] text-xs font-bold"
                        >
                          -
                        </button>
                        <span className="w-8 text-center text-xs font-mono font-bold text-[#1A1A1A]">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 hover:bg-stone-200 text-[#1A1A1A] text-xs font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              ))
            )}
          </div>

          {/* Checkout Breakdown Footer */}
          {cartItems.length > 0 && (
            <div className="p-5 border-t-2 border-[#1A1A1A] bg-white space-y-4">
              
              {/* Promo Code Input */}
              <div>
                {appliedDiscount ? (
                  <div className="flex items-center justify-between bg-[#5A5A40]/10 border border-[#1A1A1A] p-2.5 text-xs text-[#1A1A1A] font-bold">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-[#5A5A40]" />
                      <span>Code <strong className="font-mono">{appliedDiscount.code}</strong> active (-{appliedDiscount.discountPercent}%)</span>
                    </div>
                    <button onClick={removeDiscountCode} className="text-[#1A1A1A] hover:opacity-60">
                      ✕
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="PROMO CODE (e.g. SAVE10)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="flex-1 bg-[#F9F8F6] border border-[#1A1A1A] px-3 py-1.5 text-xs text-[#1A1A1A] uppercase font-mono placeholder-[#5A5A40] focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-[#1A1A1A] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#5A5A40]"
                    >
                      Apply
                    </button>
                  </form>
                )}

                {promoFeedback && !appliedDiscount && (
                  <p className={`text-[11px] mt-1.5 font-bold uppercase ${promoFeedback.success ? 'text-emerald-700' : 'text-rose-700'}`}>
                    {promoFeedback.message}
                  </p>
                )}
              </div>

              {/* Price Calculations */}
              <div className="space-y-1.5 text-xs border-t border-[#1A1A1A] pt-3 font-mono">
                <div className="flex justify-between text-[#5A5A40]">
                  <span>SUBTOTAL</span>
                  <span className="font-bold text-[#1A1A1A]">${cartSubtotal.toFixed(2)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-800 font-bold">
                    <span>DISCOUNT</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-[#5A5A40]">
                  <span>ESTIMATED TAX (8%)</span>
                  <span className="font-bold text-[#1A1A1A]">${taxAmount.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-[#5A5A40]">
                  <span>DISPATCH FREIGHT</span>
                  <span className="font-bold text-[#1A1A1A]">
                    {shippingFee === 0 ? <strong className="text-emerald-800 uppercase text-[10px]">FREE</strong> : `$${shippingFee.toFixed(2)}`}
                  </span>
                </div>

                <div className="flex justify-between text-base font-serif font-black text-[#1A1A1A] pt-2 border-t border-[#1A1A1A]">
                  <span>TOTAL DUE</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Trigger */}
              <button
                onClick={handleProceedCheckout}
                className="w-full py-3.5 bg-[#1A1A1A] text-white font-bold text-xs uppercase tracking-[0.15em] border border-[#1A1A1A] shadow-[4px_4px_0px_#5A5A40] hover:bg-[#5A5A40] flex items-center justify-center gap-2 transition-all active:translate-x-0.5 active:translate-y-0.5"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] font-bold uppercase text-[#5A5A40]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#1A1A1A]" />
                <span>256-Bit Encrypted Order Pipeline</span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
