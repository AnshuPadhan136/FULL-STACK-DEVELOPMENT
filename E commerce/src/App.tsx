import React from 'react';
import { EcommerceProvider, useEcommerce } from './context/EcommerceContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ProductGrid } from './components/store/ProductGrid';
import { ProductDetailModal } from './components/store/ProductDetailModal';
import { CartDrawer } from './components/store/CartDrawer';
import { CheckoutModal } from './components/store/CheckoutModal';
import { OrderTrackerModal } from './components/store/OrderTrackerModal';
import { OrderHistoryModal } from './components/store/OrderHistoryModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { BlueprintExplorer } from './components/blueprint/BlueprintExplorer';

const MainContent: React.FC = () => {
  const { viewMode } = useEcommerce();

  return (
    <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {viewMode === 'store' && <ProductGrid />}
      {viewMode === 'admin' && <AdminDashboard />}
      {viewMode === 'blueprint' && <BlueprintExplorer />}

      {/* Global Modals & Overlay Drawers */}
      <ProductDetailModal />
      <CartDrawer />
      <CheckoutModal />
      <OrderTrackerModal />
      <OrderHistoryModal />
    </main>
  );
};

export default function App() {
  return (
    <EcommerceProvider>
      <div className="min-h-screen bg-[#F9F8F6] text-[#1A1A1A] flex flex-col font-sans antialiased selection:bg-[#1A1A1A] selection:text-white">
        <Header />
        <MainContent />
        <Footer />
      </div>
    </EcommerceProvider>
  );
}
