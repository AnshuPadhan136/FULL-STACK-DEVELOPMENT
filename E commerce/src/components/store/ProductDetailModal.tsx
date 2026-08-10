import React, { useState } from 'react';
import { 
  X, Star, ShoppingBag, ShieldCheck, Truck, RotateCcw, 
  Check, AlertCircle, MessageSquare, ThumbsUp 
} from 'lucide-react';
import { useEcommerce } from '../../context/EcommerceContext';

export const ProductDetailModal: React.FC = () => {
  const { 
    selectedProduct, setSelectedProduct, 
    addToCart, getProductReviews, addReview,
    setIsCheckoutOpen
  } = useEcommerce();

  if (!selectedProduct) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(selectedProduct.attributes?.colors?.[0] || '');
  const [selectedSize, setSelectedSize] = useState(selectedProduct.attributes?.sizes?.[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'reviews'>('specs');
  const [added, setAdded] = useState(false);

  // Review Form state
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const reviews = getProductReviews(selectedProduct.id);

  const handleAddToCart = () => {
    if (selectedProduct.stock <= 0) return;
    addToCart(selectedProduct, quantity, selectedColor, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleBuyNow = () => {
    if (selectedProduct.stock <= 0) return;
    addToCart(selectedProduct, quantity, selectedColor, selectedSize);
    setSelectedProduct(null);
    setIsCheckoutOpen(true);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    addReview(selectedProduct.id, newRating, newComment);
    setNewComment('');
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 2000);
  };

  const discountPercent = selectedProduct.originalPrice 
    ? Math.round(((selectedProduct.originalPrice - selectedProduct.price) / selectedProduct.originalPrice) * 100) 
    : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1A1A1A]/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#F9F8F6] border-2 border-[#1A1A1A] text-[#1A1A1A] shadow-[8px_8px_0px_#1A1A1A] overflow-hidden my-8 my-auto">
        
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 z-20 p-1.5 bg-white border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-8 max-h-[85vh] overflow-y-auto">
          
          {/* Left Column: Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-white border-2 border-[#1A1A1A] overflow-hidden shadow-[4px_4px_0px_#1A1A1A]">
              <img
                src={selectedProduct.images[activeImageIndex] || selectedProduct.images[0]}
                alt={selectedProduct.title}
                className="w-full h-full object-cover object-center"
              />
              {discountPercent > 0 && (
                <span className="absolute top-4 left-4 bg-[#1A1A1A] text-white font-bold text-xs px-2.5 py-1 border border-[#1A1A1A] uppercase font-mono">
                  -{discountPercent}% SPECIAL
                </span>
              )}
            </div>

            {/* Thumbnail Selector */}
            {selectedProduct.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {selectedProduct.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-20 bg-white border-2 overflow-hidden shrink-0 transition-all ${
                      activeImageIndex === idx ? 'border-[#1A1A1A] shadow-[2px_2px_0px_#1A1A1A]' : 'border-stone-300 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-2 text-[10px] uppercase font-bold text-[#5A5A40] pt-2 border-t border-[#1A1A1A]">
              <div className="flex items-center gap-1.5 p-2 bg-white border border-[#1A1A1A]">
                <Truck className="w-4 h-4 text-[#1A1A1A] shrink-0" />
                <span>Express Freight</span>
              </div>
              <div className="flex items-center gap-1.5 p-2 bg-white border border-[#1A1A1A]">
                <ShieldCheck className="w-4 h-4 text-[#1A1A1A] shrink-0" />
                <span>2-Year Guarantee</span>
              </div>
              <div className="flex items-center gap-1.5 p-2 bg-white border border-[#1A1A1A]">
                <RotateCcw className="w-4 h-4 text-[#1A1A1A] shrink-0" />
                <span>30-Day Policy</span>
              </div>
            </div>
          </div>

          {/* Right Column: Details & Actions */}
          <div className="space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              
              {/* Category & Brand */}
              <div className="flex items-center justify-between text-xs font-mono uppercase">
                <span className="text-[#5A5A40] font-bold">
                  {selectedProduct.categoryName}
                </span>
                {selectedProduct.attributes?.brand && (
                  <span className="text-[#1A1A1A] px-2 py-0.5 bg-white border border-[#1A1A1A]">
                    {selectedProduct.attributes.brand}
                  </span>
                )}
              </div>

              {/* Title */}
              <h2 className="text-xl md:text-2xl font-serif font-black text-[#1A1A1A] leading-tight uppercase">
                {selectedProduct.title}
              </h2>

              {/* Rating & Reviews Summary */}
              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1 bg-[#1A1A1A] text-white px-2.5 py-1 font-bold font-mono">
                  <Star className="w-4 h-4 fill-white text-white" />
                  <span>{selectedProduct.rating}</span>
                </div>
                <span className="text-[#5A5A40] font-bold uppercase text-[11px]">
                  Based on <strong>{selectedProduct.reviewCount}</strong> critiques
                </span>
              </div>

              {/* Pricing */}
              <div className="flex items-baseline gap-3 pt-1 font-serif">
                <span className="text-3xl font-black text-[#1A1A1A]">
                  ${selectedProduct.price.toFixed(2)}
                </span>
                {selectedProduct.originalPrice && (
                  <span className="text-base text-[#5A5A40] line-through">
                    ${selectedProduct.originalPrice.toFixed(2)}
                  </span>
                )}
                {discountPercent > 0 && (
                  <span className="text-xs font-bold font-mono text-emerald-800 uppercase">
                    Save ${(selectedProduct.originalPrice! - selectedProduct.price).toFixed(2)}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-xs text-[#1A1A1A] leading-relaxed">
                {selectedProduct.description}
              </p>

              {/* Stock Indicator */}
              <div className="space-y-1.5 pt-2 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-[#5A5A40] uppercase font-bold">Inventory Status:</span>
                  <span className={`font-bold uppercase ${
                    selectedProduct.stock > 10 ? 'text-emerald-800' : selectedProduct.stock > 0 ? 'text-amber-800' : 'text-rose-800'
                  }`}>
                    {selectedProduct.stock > 10 ? `In Stock (${selectedProduct.stock})` : selectedProduct.stock > 0 ? `Low Stock (${selectedProduct.stock})` : 'Sold Out'}
                  </span>
                </div>
                <div className="w-full bg-stone-300 h-2 border border-[#1A1A1A]">
                  <div 
                    className={`h-full ${
                      selectedProduct.stock > 10 ? 'bg-[#1A1A1A]' : selectedProduct.stock > 0 ? 'bg-[#5A5A40]' : 'bg-rose-700'
                    }`}
                    style={{ width: `${Math.min(100, (selectedProduct.stock / 30) * 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Color Selector */}
              {selectedProduct.attributes?.colors && (
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase text-[#1A1A1A]">
                    Edition: <strong className="font-mono text-[#5A5A40]">{selectedColor}</strong>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.attributes.colors.map(color => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-3 py-1.5 text-xs font-bold uppercase border transition-all ${
                          selectedColor === color 
                            ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-[2px_2px_0px_#5A5A40]' 
                            : 'bg-white border-[#1A1A1A] text-[#1A1A1A] hover:bg-stone-200'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selector */}
              {selectedProduct.attributes?.sizes && (
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase text-[#1A1A1A]">
                    Size: <strong className="font-mono text-[#5A5A40]">{selectedSize}</strong>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.attributes.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-10 h-10 text-xs font-mono font-bold border transition-all ${
                          selectedSize === size 
                            ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-[2px_2px_0px_#5A5A40]' 
                            : 'bg-white border-[#1A1A1A] text-[#1A1A1A] hover:bg-stone-200'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="space-y-2 pt-2">
                <label className="block text-xs font-bold uppercase text-[#1A1A1A]">Quantity:</label>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-[#1A1A1A] bg-white">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 hover:bg-stone-200 text-[#1A1A1A] font-bold flex items-center justify-center text-sm"
                    >
                      -
                    </button>
                    <span className="w-12 text-center text-xs font-mono font-bold text-[#1A1A1A]">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(selectedProduct.stock, quantity + 1))}
                      className="w-8 h-8 hover:bg-stone-200 text-[#1A1A1A] font-bold flex items-center justify-center text-sm"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

            </div>

            {/* CTA Buttons */}
            <div className="space-y-3 pt-4 border-t border-[#1A1A1A]">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={selectedProduct.stock <= 0}
                  className={`py-3 px-4 font-bold text-xs uppercase tracking-wider border border-[#1A1A1A] transition-all flex items-center justify-center gap-2 ${
                    added 
                      ? 'bg-emerald-800 text-white' 
                      : selectedProduct.stock <= 0
                      ? 'bg-stone-200 text-stone-500 cursor-not-allowed border-stone-300'
                      : 'bg-white text-[#1A1A1A] hover:bg-stone-200 shadow-[2px_2px_0px_#1A1A1A]'
                  }`}
                >
                  {added ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
                  {added ? 'Added to Bag!' : 'Add to Bag'}
                </button>

                <button
                  onClick={handleBuyNow}
                  disabled={selectedProduct.stock <= 0}
                  className="py-3 px-4 bg-[#1A1A1A] text-white font-bold text-xs uppercase tracking-[0.15em] border border-[#1A1A1A] shadow-[3px_3px_0px_#5A5A40] hover:bg-[#5A5A40] transition-all active:translate-x-0.5 active:translate-y-0.5 disabled:bg-stone-300 disabled:text-stone-500 disabled:cursor-not-allowed disabled:shadow-none"
                >
                  Instant Dispatch
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Tabbed Area: Specs & Reviews */}
        <div className="border-t-2 border-[#1A1A1A] bg-white p-6 md:p-8 space-y-6">
          <div className="flex border-b border-[#1A1A1A] gap-6">
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors ${
                activeTab === 'specs' ? 'border-[#1A1A1A] text-[#1A1A1A]' : 'border-transparent text-[#5A5A40] hover:text-[#1A1A1A]'
              }`}
            >
              Technical Specifications
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors flex items-center gap-2 ${
                activeTab === 'reviews' ? 'border-[#1A1A1A] text-[#1A1A1A]' : 'border-transparent text-[#5A5A40] hover:text-[#1A1A1A]'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" /> Published Critiques ({reviews.length})
            </button>
          </div>

          {activeTab === 'specs' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-3 bg-[#F9F8F6] border border-[#1A1A1A] space-y-1">
                <span className="text-[#5A5A40] font-bold uppercase">MATERIAL SPEC:</span>
                <p className="font-bold text-[#1A1A1A]">{selectedProduct.attributes?.material || 'Premium Studio Grade'}</p>
              </div>
              <div className="p-3 bg-[#F9F8F6] border border-[#1A1A1A] space-y-1">
                <span className="text-[#5A5A40] font-bold uppercase">GUARANTEE:</span>
                <p className="font-bold text-[#1A1A1A]">{selectedProduct.attributes?.warranty || '1-Year Limited Warranty'}</p>
              </div>
              <div className="p-3 bg-[#F9F8F6] border border-[#1A1A1A] space-y-1">
                <span className="text-[#5A5A40] font-bold uppercase">SECTION:</span>
                <p className="font-bold text-[#1A1A1A]">{selectedProduct.categoryName}</p>
              </div>
              <div className="p-3 bg-[#F9F8F6] border border-[#1A1A1A] space-y-1">
                <span className="text-[#5A5A40] font-bold uppercase">CLASSIFICATIONS:</span>
                <p className="font-bold text-[#1A1A1A] capitalize">{selectedProduct.tags.join(', ')}</p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* Write Review Form */}
              <form onSubmit={handleReviewSubmit} className="bg-[#F9F8F6] p-4 border border-[#1A1A1A] space-y-3">
                <h4 className="font-serif font-bold text-[#1A1A1A] text-xs uppercase">Submit Critical Critique</h4>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase text-[#5A5A40]">Rating:</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewRating(star)}
                        className="text-[#1A1A1A] focus:outline-none"
                      >
                        <Star className={`w-4 h-4 ${star <= newRating ? 'fill-[#1A1A1A]' : 'text-stone-300'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <textarea
                  rows={2}
                  placeholder="Draft review body for editorial log..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full bg-white border border-[#1A1A1A] p-2.5 text-xs text-[#1A1A1A] placeholder-[#5A5A40] focus:outline-none"
                ></textarea>

                <div className="flex items-center justify-between">
                  {reviewSubmitted && (
                    <span className="text-xs text-emerald-800 font-bold uppercase flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Critique logged!
                    </span>
                  )}
                  <button
                    type="submit"
                    className="ml-auto px-4 py-1.5 bg-[#1A1A1A] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#5A5A40]"
                  >
                    Publish Critique
                  </button>
                </div>
              </form>

              {/* Reviews List */}
              <div className="space-y-3">
                {reviews.map(rev => (
                  <div key={rev.id} className="bg-white p-4 border border-[#1A1A1A] space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-[#1A1A1A] text-white font-serif font-bold flex items-center justify-center">
                          {rev.userName[0]}
                        </div>
                        <div>
                          <span className="font-bold text-[#1A1A1A] block uppercase font-serif">{rev.userName}</span>
                          <span className="text-[10px] text-[#5A5A40] font-mono">{rev.createdAt}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-[#1A1A1A] font-mono font-bold">
                        <Star className="w-3.5 h-3.5 fill-[#1A1A1A]" />
                        <span>{rev.rating}.0</span>
                      </div>
                    </div>

                    <p className="text-[#1A1A1A] leading-relaxed pl-9">{rev.comment}</p>
                  </div>
                ))}
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
