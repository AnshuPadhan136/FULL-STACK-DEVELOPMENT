import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import CategoryFilter from './components/CategoryFilter';
import SortSelector from './components/SortSelector';
import ProductCard from './components/ProductCard';
import ProductSkeletonGrid from './components/ProductSkeleton';
import ProductQuickViewModal from './components/ProductQuickViewModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import OrderConfirmationModal from './components/OrderConfirmationModal';
import ToastContainer from './components/Toast';
import Footer from './components/Footer';
import { ShoppingBag, SearchX, RefreshCw } from 'lucide-react';

const MainContent = () => {
  const {
    products,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory
  } = useShop();

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 w-full pb-12">
        <HeroBanner />

        <div className="space-y-4">
          <CategoryFilter />
          <SortSelector />

          {/* Error State */}
          {error && (
            <div className="bg-rose-50 border border-rose-200 text-rose-800 p-6 rounded-2xl text-center space-y-3 my-8">
              <p className="font-bold text-sm">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-rose-600 text-white rounded-xl text-xs font-bold shadow-md hover:bg-rose-700 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retry Loading</span>
              </button>
            </div>
          )}

          {/* Loading Skeletons */}
          {loading && <ProductSkeletonGrid count={8} />}

          {/* Products Grid */}
          {!loading && !error && products.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fade-in">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* Empty Products Search/Filter State */}
          {!loading && !error && products.length === 0 && (
            <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center max-w-md mx-auto my-12 space-y-4 shadow-sm">
              <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
                <SearchX className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-900">No products found</h3>
                <p className="text-xs text-slate-500">
                  {searchQuery
                    ? `No products match "${searchQuery}". Try another keyword.`
                    : `No products in "${selectedCategory}".`}
                </p>
              </div>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="px-5 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Modals & Overlays */}
      <ProductQuickViewModal />
      <CartDrawer />
      <CheckoutModal />
      <OrderConfirmationModal />
      <ToastContainer />

      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <MainContent />
    </ShopProvider>
  );
}
