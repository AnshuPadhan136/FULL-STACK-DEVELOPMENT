import React from 'react';
import { Star, ShoppingBag, Eye, Check, AlertCircle } from 'lucide-react';
import { Product } from '../../types/ecommerce';
import { useEcommerce } from '../../context/EcommerceContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { setSelectedProduct, addToCart } = useEcommerce();
  const [added, setAdded] = React.useState(false);

  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.stock <= 0) return;
    
    addToCart(
      product, 
      1, 
      product.attributes?.colors?.[0], 
      product.attributes?.sizes?.[0]
    );

    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div 
      onClick={() => setSelectedProduct(product)}
      className="group relative bg-white border border-[#1A1A1A] shadow-[4px_4px_0px_#1A1A1A] hover:shadow-[6px_6px_0px_#1A1A1A] hover:-translate-y-0.5 transition-all duration-200 flex flex-col cursor-pointer"
    >
      {/* Product Image Container */}
      <div className="relative aspect-square w-full bg-[#F9F8F6] border-b border-[#1A1A1A] overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Overlay preview tag */}
        <div className="absolute inset-0 bg-[#1A1A1A]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-3">
          <span className="text-[10px] font-bold tracking-widest uppercase text-white bg-[#1A1A1A] px-2.5 py-1 border border-white flex items-center gap-1">
            <Eye className="w-3 h-3" /> Inspect Item
          </span>
        </div>

        {/* Badges (Sale, New, Featured) */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {discountPercent > 0 && (
            <span className="bg-[#1A1A1A] text-white font-mono font-bold text-[10px] uppercase px-2 py-0.5 border border-[#1A1A1A] shadow-[2px_2px_0px_#5A5A40]">
              -{discountPercent}% OFF
            </span>
          )}
          {product.isNew && (
            <span className="bg-[#5A5A40] text-white font-bold text-[10px] uppercase px-2 py-0.5 border border-[#1A1A1A]">
              NEW
            </span>
          )}
          {product.featured && (
            <span className="bg-white text-[#1A1A1A] font-bold text-[10px] uppercase px-2 py-0.5 border border-[#1A1A1A]">
              Featured
            </span>
          )}
        </div>

        {/* Stock warning pill */}
        {product.stock <= 5 && product.stock > 0 && (
          <span className="absolute top-3 right-3 bg-amber-100 text-[#1A1A1A] font-bold text-[10px] px-2 py-0.5 border border-[#1A1A1A] flex items-center gap-1">
            <AlertCircle className="w-3 h-3 text-[#5A5A40]" /> {product.stock} left
          </span>
        )}

        {product.stock === 0 && (
          <div className="absolute inset-0 bg-[#F9F8F6]/90 backdrop-blur-[1px] flex items-center justify-center">
            <span className="bg-[#1A1A1A] text-white border border-[#1A1A1A] px-3 py-1 text-xs font-bold uppercase tracking-widest">
              Sold Out
            </span>
          </div>
        )}
      </div>

      {/* Card Info Details */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between text-[11px] mb-1.5">
            <span className="font-bold text-[#5A5A40] uppercase tracking-[0.18em]">{product.categoryName}</span>
            <div className="flex items-center gap-1 font-mono font-bold text-[#1A1A1A]">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>{product.rating}</span>
              <span className="text-[#5A5A40] text-[10px]">({product.reviewCount})</span>
            </div>
          </div>

          <h3 className="font-serif font-bold text-[#1A1A1A] text-base group-hover:text-[#5A5A40] transition-colors line-clamp-2 leading-tight">
            {product.title}
          </h3>
        </div>

        {/* Price & Action */}
        <div className="pt-3 border-t border-[#1A1A1A]/20 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif font-black text-[#1A1A1A] text-xl">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-xs text-[#5A5A40] line-through font-mono">${product.originalPrice.toFixed(2)}</span>
              )}
            </div>
          </div>

          <button
            onClick={handleQuickAdd}
            disabled={product.stock <= 0}
            className={`p-2.5 font-bold text-xs transition-all border border-[#1A1A1A] flex items-center justify-center ${
              added 
                ? 'bg-emerald-700 text-white border-emerald-700'
                : product.stock <= 0
                ? 'bg-stone-200 text-stone-400 border-stone-300 cursor-not-allowed'
                : 'bg-[#1A1A1A] hover:bg-[#5A5A40] text-white shadow-[2px_2px_0px_#5A5A40] active:translate-x-0.5 active:translate-y-0.5'
            }`}
            title="Add to cart"
          >
            {added ? (
              <Check className="w-4 h-4" />
            ) : (
              <ShoppingBag className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
