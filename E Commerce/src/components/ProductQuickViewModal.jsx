import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { formatCurrency } from '../utils/pricing';
import { X, Star, ShoppingCart, Check, ShieldCheck, Truck, Plus, Minus } from 'lucide-react';

export const ProductQuickViewModal = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart } = useShop();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const images = quickViewProduct.images && quickViewProduct.images.length > 0
    ? quickViewProduct.images
    : [quickViewProduct.thumbnail];

  const handleAddToCart = () => {
    addToCart(quickViewProduct, quantity);
    setQuickViewProduct(null);
    setQuantity(1);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="relative bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col md:flex-row max-h-[90vh]">
        
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-white text-slate-500 hover:text-slate-900 rounded-full shadow-md transition-all focus:outline-none"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Gallery */}
        <div className="w-full md:w-1/2 bg-slate-50 p-6 flex flex-col justify-between items-center">
          <div className="w-full h-64 sm:h-72 flex items-center justify-center p-2">
            <img
              src={images[selectedImageIndex] || quickViewProduct.thumbnail}
              alt={quickViewProduct.title}
              className="max-h-full max-w-full object-contain drop-shadow-md transition-all"
            />
          </div>

          {images.length > 1 && (
            <div className="flex space-x-2 overflow-x-auto p-2 max-w-full no-scrollbar">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-14 h-14 rounded-xl border-2 overflow-hidden flex-shrink-0 p-1 bg-white transition-all ${
                    selectedImageIndex === idx
                      ? 'border-indigo-600 ring-2 ring-indigo-200'
                      : 'border-slate-200 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Specs & Info */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
                {quickViewProduct.category}
              </span>
              <span className="flex items-center space-x-1 text-xs font-semibold text-slate-700 bg-amber-50 px-2.5 py-1 rounded-md text-amber-800">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{quickViewProduct.rating?.toFixed(1)} / 5.0</span>
              </span>
            </div>

            <h2 className="text-2xl font-extrabold text-slate-900 leading-tight">
              {quickViewProduct.title}
            </h2>

            {quickViewProduct.brand && (
              <p className="text-xs text-slate-400 font-medium">
                Brand: <span className="text-slate-700 font-semibold">{quickViewProduct.brand}</span>
              </p>
            )}

            <div className="flex items-baseline space-x-3 pt-1">
              <span className="text-2xl font-black text-slate-900">
                {formatCurrency(quickViewProduct.price)}
              </span>
              {quickViewProduct.discountPercentage > 0 && (
                <span className="text-xs font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded">
                  {Math.round(quickViewProduct.discountPercentage)}% OFF
                </span>
              )}
            </div>

            <p className="text-xs text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
              {quickViewProduct.description}
            </p>
          </div>

          {/* Quantity & Actions */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700">Quantity</span>
              <div className="flex items-center space-x-3 bg-slate-100 rounded-xl p-1 border border-slate-200">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-6 text-center text-sm font-bold text-slate-900">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full py-3.5 px-6 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transition-all flex items-center justify-center space-x-2 focus:outline-none"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Add to Cart ({formatCurrency(quickViewProduct.price * quantity)})</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ProductQuickViewModal;
