import React from 'react';
import { useShop } from '../context/ShopContext';
import { formatCurrency } from '../utils/pricing';
import { Star, ShoppingCart, Eye, Tag } from 'lucide-react';

export const ProductCard = ({ product }) => {
  const { addToCart, cart, setQuickViewProduct } = useShop();

  const cartItem = cart.find((item) => item.id === product.id);
  const cartQuantity = cartItem ? cartItem.quantity : 0;

  // Calculate original price before discount
  const originalPrice = product.discountPercentage
    ? product.price / (1 - product.discountPercentage / 100)
    : product.price;

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col justify-between overflow-hidden">
      
      {/* Top Badges */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        {product.discountPercentage > 0 ? (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-rose-500 text-white text-[11px] font-bold shadow-md">
            <Tag className="w-3 h-3" />
            <span>-{Math.round(product.discountPercentage)}%</span>
          </span>
        ) : (
          <span />
        )}

        <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/80 text-slate-800 text-xs font-semibold shadow-sm">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{product.rating?.toFixed(1) || '4.5'}</span>
        </span>
      </div>

      {/* Image Container */}
      <div className="relative w-full h-52 bg-slate-50 overflow-hidden flex items-center justify-center p-4 group-hover:bg-slate-100/50 transition-colors">
        <img
          src={product.thumbnail || product.images?.[0]}
          alt={product.title}
          loading="lazy"
          className="max-h-full max-w-full object-contain transform group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Hover Quick View Overlay */}
        <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2">
          <button
            onClick={() => setQuickViewProduct(product)}
            className="flex items-center space-x-1.5 px-4 py-2 bg-white text-slate-900 rounded-full text-xs font-bold shadow-lg hover:bg-slate-100 transition-all transform hover:scale-105"
          >
            <Eye className="w-4 h-4 text-indigo-600" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <span className="text-[10px] font-bold tracking-wider uppercase text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
            {product.category}
          </span>

          <h3
            onClick={() => setQuickViewProduct(product)}
            className="text-base font-bold text-slate-900 mt-2 line-clamp-1 cursor-pointer hover:text-indigo-600 transition-colors"
            title={product.title}
          >
            {product.title}
          </h3>

          <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Pricing & Add to Cart */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400 line-through">
              {product.discountPercentage > 0 && formatCurrency(originalPrice)}
            </div>
            <div className="text-lg font-extrabold text-slate-900">
              {formatCurrency(product.price)}
            </div>
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            className={`flex items-center space-x-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              cartQuantity > 0
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-200'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200 hover:shadow-md'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>{cartQuantity > 0 ? `In Cart (${cartQuantity})` : 'Add to Cart'}</span>
          </button>
        </div>

      </div>

    </div>
  );
};

export default ProductCard;
