import React from 'react';
import { X, Package, ChevronRight, Clock, Truck, CheckCircle2 } from 'lucide-react';
import { useEcommerce } from '../../context/EcommerceContext';

export const OrderHistoryModal: React.FC = () => {
  const { 
    isOrderHistoryOpen, setIsOrderHistoryOpen, 
    orders, currentUser, setTrackingOrder 
  } = useEcommerce();

  if (!isOrderHistoryOpen) return null;

  const userOrders = orders.filter(o => o.userEmail === currentUser.email || currentUser.role === 'admin');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1A1A1A]/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#F9F8F6] border-2 border-[#1A1A1A] text-[#1A1A1A] shadow-[8px_8px_0px_#1A1A1A] overflow-hidden my-auto">
        
        {/* Header */}
        <div className="p-5 border-b border-[#1A1A1A] flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#1A1A1A] text-white">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-black text-[#1A1A1A] text-base uppercase">Dispatch Archive</h3>
              <p className="text-[10px] font-bold text-[#5A5A40] uppercase">{currentUser.name} • {userOrders.length} DISPATCH RECORDS</p>
            </div>
          </div>

          <button
            onClick={() => setIsOrderHistoryOpen(false)}
            className="p-1.5 bg-white border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {userOrders.length === 0 ? (
            <div className="text-center py-12 text-[#5A5A40] space-y-2">
              <Package className="w-10 h-10 mx-auto text-[#1A1A1A]" />
              <p className="font-serif font-bold text-[#1A1A1A] text-base uppercase">No Archives Found</p>
              <p className="text-xs">Place an order in the storefront to track its fulfillment status here.</p>
            </div>
          ) : (
            userOrders.map(order => (
              <div 
                key={order.id} 
                className="bg-white p-4 border border-[#1A1A1A] shadow-[3px_3px_0px_#1A1A1A] space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1A1A1A] pb-3 text-xs">
                  <div>
                    <span className="font-mono font-bold text-[#1A1A1A] text-sm uppercase">{order.id}</span>
                    <span className="text-[#5A5A40] font-mono block text-[10px]">
                      LOGGED: {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 bg-[#F9F8F6] border border-[#1A1A1A] text-[10px] font-mono font-bold uppercase tracking-wider text-[#1A1A1A]">
                      {order.status.replace('_', ' ')}
                    </span>

                    <button
                      onClick={() => {
                        setIsOrderHistoryOpen(false);
                        setTrackingOrder(order);
                      }}
                      className="px-3 py-1 bg-[#1A1A1A] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#5A5A40] flex items-center gap-1 border border-[#1A1A1A]"
                    >
                      Track <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Items preview */}
                <div className="flex items-center justify-between text-xs text-[#1A1A1A]">
                  <div className="flex items-center gap-2">
                    <span className="text-[#5A5A40] uppercase font-bold text-[10px]">{order.items.length} {order.items.length === 1 ? 'ITEM' : 'ITEMS'}:</span>
                    <span className="font-serif font-semibold text-[#1A1A1A] truncate max-w-[250px]">
                      {order.items.map(i => i.product.title).join(', ')}
                    </span>
                  </div>
                  <span className="font-serif font-black text-[#1A1A1A] text-sm">${order.totalAmount.toFixed(2)}</span>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
