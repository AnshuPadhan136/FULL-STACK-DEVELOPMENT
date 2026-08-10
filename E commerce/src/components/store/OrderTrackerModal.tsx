import React from 'react';
import { 
  X, Package, Truck, CheckCircle2, Clock, 
  MapPin, ShieldCheck, FileText, ChevronRight 
} from 'lucide-react';
import { useEcommerce } from '../../context/EcommerceContext';
import { OrderStatus } from '../../types/ecommerce';

export const OrderTrackerModal: React.FC = () => {
  const { trackingOrder, setTrackingOrder } = useEcommerce();

  if (!trackingOrder) return null;

  const STATUS_STEPS: { status: OrderStatus; label: string; icon: any }[] = [
    { status: 'pending', label: 'Order Placed', icon: Clock },
    { status: 'payment_confirmed', label: 'Payment Confirmed', icon: ShieldCheck },
    { status: 'processing', label: 'Processing', icon: Package },
    { status: 'shipped', label: 'Shipped', icon: Truck },
    { status: 'delivered', label: 'Delivered', icon: CheckCircle2 }
  ];

  const getStepIndex = (status: OrderStatus) => {
    switch (status) {
      case 'pending': return 0;
      case 'payment_confirmed': return 1;
      case 'processing': return 2;
      case 'shipped': case 'out_for_delivery': return 3;
      case 'delivered': return 4;
      default: return 0;
    }
  };

  const currentStepIdx = getStepIndex(trackingOrder.status);

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
              <h3 className="font-serif font-black text-[#1A1A1A] text-base uppercase">Real-Time Dispatch Tracker</h3>
              <p className="text-[11px] font-mono font-bold text-[#5A5A40] uppercase">{trackingOrder.id}</p>
            </div>
          </div>

          <button
            onClick={() => setTrackingOrder(null)}
            className="p-1.5 bg-white border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 space-y-6">
          
          {/* Progress Tracker Stepper */}
          <div className="bg-white p-6 border border-[#1A1A1A] shadow-[3px_3px_0px_#1A1A1A] space-y-6">
            <div className="flex items-center justify-between relative">
              
              {/* Connecting Line */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-stone-300 -translate-y-1/2 z-0"></div>
              <div 
                className="absolute top-1/2 left-0 h-1 bg-[#1A1A1A] -translate-y-1/2 z-0 transition-all duration-500"
                style={{ width: `${(currentStepIdx / (STATUS_STEPS.length - 1)) * 100}%` }}
              ></div>

              {/* Step Nodes */}
              {STATUS_STEPS.map((step, idx) => {
                const IconComponent = step.icon;
                const isCompleted = idx <= currentStepIdx;
                const isCurrent = idx === currentStepIdx;

                return (
                  <div key={step.status} className="relative z-10 flex flex-col items-center">
                    <div className={`w-9 h-9 flex items-center justify-center transition-all border border-[#1A1A1A] ${
                      isCompleted 
                        ? 'bg-[#1A1A1A] text-white font-bold shadow-[2px_2px_0px_#5A5A40] scale-110' 
                        : 'bg-white text-stone-400'
                    }`}>
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <span className={`text-[10px] mt-2 font-bold uppercase ${
                      isCurrent ? 'text-[#1A1A1A]' : isCompleted ? 'text-[#5A5A40]' : 'text-stone-400'
                    }`}>
                      {step.label}
                    </span>
                  </div>
                );
              })}

            </div>

            {/* Tracking Meta Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs pt-4 border-t border-[#1A1A1A] font-mono">
              <div>
                <span className="text-[#5A5A40] block text-[10px] uppercase font-bold">Tracking Ref:</span>
                <span className="text-[#1A1A1A] font-bold">{trackingOrder.trackingNumber}</span>
              </div>
              <div>
                <span className="text-[#5A5A40] block text-[10px] uppercase font-bold">Logistics Partner:</span>
                <span className="text-[#1A1A1A] font-bold">{trackingOrder.carrier}</span>
              </div>
              <div>
                <span className="text-[#5A5A40] block text-[10px] uppercase font-bold">Est. Dispatch:</span>
                <span className="text-emerald-800 font-bold">{trackingOrder.estimatedDelivery}</span>
              </div>
            </div>
          </div>

          {/* Items Purchased in Order */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-[#1A1A1A] text-xs uppercase tracking-wider">Manifest Contents</h4>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {trackingOrder.items.map(item => (
                <div key={item.id} className="flex items-center justify-between bg-white p-3 border border-[#1A1A1A] text-xs">
                  <div className="flex items-center gap-3">
                    <img src={item.product.images[0]} alt="" className="w-10 h-10 border border-[#1A1A1A] object-cover bg-[#F9F8F6]" />
                    <div>
                      <p className="font-serif font-bold text-[#1A1A1A]">{item.product.title}</p>
                      <p className="text-[10px] font-mono text-[#5A5A40]">Qty: {item.quantity} × ${item.product.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <span className="font-mono font-bold text-[#1A1A1A]">${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Log Timeline */}
          <div className="space-y-3 pt-2">
            <h4 className="font-serif font-bold text-[#1A1A1A] text-xs uppercase tracking-wider">Audit Log Stream</h4>
            <div className="bg-white p-4 border border-[#1A1A1A] space-y-3 text-xs font-mono">
              {trackingOrder.history.map((hist, i) => (
                <div key={i} className="flex gap-3 text-[#1A1A1A]">
                  <div className="w-2 h-2 bg-[#1A1A1A] mt-1 shrink-0"></div>
                  <div>
                    <p className="font-bold text-[#1A1A1A] uppercase">{hist.status.replace('_', ' ')}</p>
                    <p className="text-[10px] text-[#5A5A40]">{new Date(hist.timestamp).toLocaleString()} • {hist.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
