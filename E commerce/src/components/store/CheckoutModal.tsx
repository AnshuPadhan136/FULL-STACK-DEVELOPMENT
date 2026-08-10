import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, Check, CreditCard, ShieldCheck, Truck, Lock, 
  ArrowRight, Sparkles, AlertCircle, Copy, Terminal, CheckCircle2 
} from 'lucide-react';
import { useEcommerce } from '../../context/EcommerceContext';
import { ShippingAddress } from '../../types/ecommerce';

export const CheckoutModal: React.FC = () => {
  const { 
    isCheckoutOpen, setIsCheckoutOpen, 
    currentUser, cartItems, cartSubtotal, discountAmount, 
    taxAmount, shippingFee, cartTotal, createOrder,
    setTrackingOrder
  } = useEcommerce();

  if (!isCheckoutOpen) return null;

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1); // 1: Shipping, 2: Payment, 3: Processing API Simulation, 4: Success
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    fullName: currentUser.name !== 'Guest Shopper' ? currentUser.name : 'Alex Morgan',
    email: currentUser.email,
    phone: '+1 (555) 234-5678',
    street: '742 Evergreen Terrace',
    city: 'Seattle',
    state: 'WA',
    zipCode: '98101',
    country: 'United States'
  });

  const [paymentType, setPaymentType] = useState<'card' | 'paypal' | 'apple_pay'>('card');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');

  // API Log Simulation steps
  const [processingLogs, setProcessingLogs] = useState<string[]>([]);
  const [createdOrderNumber, setCreatedOrderNumber] = useState('');

  const autofillDemoAddress = () => {
    setShippingAddress({
      fullName: 'Alex Morgan',
      email: 'alex.morgan@example.com',
      phone: '+1 (555) 234-5678',
      street: '742 Evergreen Terrace',
      city: 'Seattle',
      state: 'WA',
      zipCode: '98101',
      country: 'United States'
    });
  };

  const handleStartPaymentProcessing = () => {
    setStep(3);
    setProcessingLogs(['Initializing Stripe PaymentIntent session...']);

    setTimeout(() => {
      setProcessingLogs(prev => [...prev, 'POST /api/checkout -> Recalculating server authoritative subtotal ($' + cartSubtotal.toFixed(2) + ')...']);
    }, 600);

    setTimeout(() => {
      setProcessingLogs(prev => [...prev, 'Stripe PaymentIntent generated: pi_3M1x7L2eZvKYlo2C1g9aXz...']);
    }, 1200);

    setTimeout(() => {
      setProcessingLogs(prev => [...prev, '3D Secure 2.0 Auth Passed. Transaction approved!']);
    }, 1800);

    setTimeout(() => {
      setProcessingLogs(prev => [...prev, 'Persisting order in PostgreSQL database...']);
      const newOrd = createOrder(shippingAddress, paymentType === 'card' ? 'Visa Card ending 4242' : paymentType === 'paypal' ? 'PayPal Checkout' : 'Apple Pay');
      setCreatedOrderNumber(newOrd.id);
      
      // Fire confetti celebration
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // fallback ignore if canvas fails
      }

      setStep(4);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1A1A1A]/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#F9F8F6] border-2 border-[#1A1A1A] text-[#1A1A1A] shadow-[8px_8px_0px_#1A1A1A] overflow-hidden my-auto">
        
        {/* Header */}
        <div className="p-5 border-b border-[#1A1A1A] flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#1A1A1A] text-white font-serif font-black flex items-center justify-center text-sm border border-[#1A1A1A]">
              0{step}
            </div>
            <div>
              <h3 className="font-serif font-black text-[#1A1A1A] text-base uppercase">
                {step === 1 && 'Shipping Address & Contact'}
                {step === 2 && 'Payment Method & Authorization'}
                {step === 3 && 'Simulating Stripe Payment API Route...'}
                {step === 4 && 'Order Confirmed & Payment Successful'}
              </h3>
              <p className="text-[10px] font-bold text-[#5A5A40] uppercase tracking-widest">Step {step} of 4 • Secure Order Pipeline</p>
            </div>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1.5 bg-white border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8">
          
          {/* Step 1: Shipping Address */}
          {step === 1 && (
            <div className="space-y-5">
              <div className="flex justify-between items-center">
                <h4 className="font-serif font-bold text-[#1A1A1A] text-sm uppercase">Customer Dispatch Information</h4>
                <button
                  type="button"
                  onClick={autofillDemoAddress}
                  className="text-xs text-[#1A1A1A] hover:underline font-bold uppercase bg-white px-2.5 py-1 border border-[#1A1A1A] shadow-[2px_2px_0px_#1A1A1A]"
                >
                  ⚡ Autofill Demo Address
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <label className="block text-[#5A5A40] font-bold uppercase text-[10px] mb-1">Full Name</label>
                  <input
                    type="text"
                    value={shippingAddress.fullName}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, fullName: e.target.value })}
                    className="w-full bg-white border border-[#1A1A1A] p-2.5 text-[#1A1A1A] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#5A5A40] font-bold uppercase text-[10px] mb-1">Email Address</label>
                  <input
                    type="email"
                    value={shippingAddress.email}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, email: e.target.value })}
                    className="w-full bg-white border border-[#1A1A1A] p-2.5 text-[#1A1A1A] focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[#5A5A40] font-bold uppercase text-[10px] mb-1">Street Address</label>
                  <input
                    type="text"
                    value={shippingAddress.street}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, street: e.target.value })}
                    className="w-full bg-white border border-[#1A1A1A] p-2.5 text-[#1A1A1A] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#5A5A40] font-bold uppercase text-[10px] mb-1">City</label>
                  <input
                    type="text"
                    value={shippingAddress.city}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                    className="w-full bg-white border border-[#1A1A1A] p-2.5 text-[#1A1A1A] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#5A5A40] font-bold uppercase text-[10px] mb-1">State / Zip Code</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={shippingAddress.state}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                      className="bg-white border border-[#1A1A1A] p-2.5 text-[#1A1A1A] focus:outline-none"
                    />
                    <input
                      type="text"
                      value={shippingAddress.zipCode}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, zipCode: e.target.value })}
                      className="bg-white border border-[#1A1A1A] p-2.5 text-[#1A1A1A] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Order Summary Mini Box */}
              <div className="bg-white p-4 border border-[#1A1A1A] shadow-[2px_2px_0px_#1A1A1A] space-y-2 text-xs font-mono">
                <div className="flex justify-between text-[#5A5A40]">
                  <span>BAG ITEMS ({cartItems.length}):</span>
                  <span className="font-bold text-[#1A1A1A]">${cartSubtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#5A5A40]">
                  <span>FREIGHT & TAX:</span>
                  <span className="font-bold text-[#1A1A1A]">${(taxAmount + shippingFee).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base font-serif font-black text-[#1A1A1A] pt-2 border-t border-[#1A1A1A]">
                  <span>TOTAL DUE:</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full py-3.5 bg-[#1A1A1A] text-white font-bold text-xs uppercase tracking-[0.15em] border border-[#1A1A1A] shadow-[3px_3px_0px_#5A5A40] hover:bg-[#5A5A40] flex items-center justify-center gap-2"
              >
                <span>Continue to Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Step 2: Payment Selector */}
          {step === 2 && (
            <div className="space-y-5">
              <h4 className="font-serif font-bold text-[#1A1A1A] text-sm uppercase">Select Payment Method</h4>

              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setPaymentType('card')}
                  className={`p-3 border text-left transition-all flex flex-col justify-between h-20 ${
                    paymentType === 'card' ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' : 'bg-white border-[#1A1A1A] text-[#1A1A1A]'
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  <span className="font-bold text-xs uppercase">Credit Card</span>
                </button>

                <button
                  onClick={() => setPaymentType('paypal')}
                  className={`p-3 border text-left transition-all flex flex-col justify-between h-20 ${
                    paymentType === 'paypal' ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' : 'bg-white border-[#1A1A1A] text-[#1A1A1A]'
                  }`}
                >
                  <span className="font-black text-sm italic font-serif">PayPal</span>
                  <span className="font-bold text-xs uppercase">PayPal Express</span>
                </button>

                <button
                  onClick={() => setPaymentType('apple_pay')}
                  className={`p-3 border text-left transition-all flex flex-col justify-between h-20 ${
                    paymentType === 'apple_pay' ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' : 'bg-white border-[#1A1A1A] text-[#1A1A1A]'
                  }`}
                >
                  <span className="font-extrabold text-sm"> Pay</span>
                  <span className="font-bold text-xs uppercase">Apple Pay</span>
                </button>
              </div>

              {/* Card Inputs */}
              {paymentType === 'card' && (
                <div className="bg-white p-4 border border-[#1A1A1A] space-y-3 text-xs font-mono">
                  <div>
                    <label className="block text-[#5A5A40] font-bold uppercase text-[10px] mb-1">Card Number (Simulated)</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full bg-[#F9F8F6] border border-[#1A1A1A] p-2.5 font-mono text-[#1A1A1A]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[#5A5A40] font-bold uppercase text-[10px] mb-1">Expiry Date</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full bg-[#F9F8F6] border border-[#1A1A1A] p-2.5 font-mono text-[#1A1A1A]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#5A5A40] font-bold uppercase text-[10px] mb-1">CVC / CVV</label>
                      <input
                        type="text"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        className="w-full bg-[#F9F8F6] border border-[#1A1A1A] p-2.5 font-mono text-[#1A1A1A]"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setStep(1)}
                  className="w-1/3 py-3 bg-white border border-[#1A1A1A] text-[#1A1A1A] font-bold text-xs uppercase tracking-wider hover:bg-stone-100"
                >
                  Back
                </button>
                <button
                  onClick={handleStartPaymentProcessing}
                  className="w-2/3 py-3 bg-[#1A1A1A] text-white font-bold text-xs uppercase tracking-[0.15em] border border-[#1A1A1A] shadow-[3px_3px_0px_#5A5A40] hover:bg-[#5A5A40] flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  Pay ${cartTotal.toFixed(2)}
                </button>
              </div>
            </div>
          )}

        {/* Step 3: Processing API Simulation Log */}
        {step === 3 && (
          <div className="space-y-4 py-6 text-center">
            <div className="w-12 h-12 border-4 border-[#1A1A1A] border-t-transparent animate-spin mx-auto"></div>
            <h4 className="font-serif font-black text-[#1A1A1A] text-lg uppercase">Authorizing Order Payment...</h4>

            {/* Console log box */}
            <div className="bg-[#1A1A1A] border-2 border-[#1A1A1A] p-4 text-left font-mono text-[11px] text-emerald-400 space-y-2 max-h-48 overflow-y-auto">
              <div className="flex items-center gap-2 text-stone-400 border-b border-stone-800 pb-2">
                <Terminal className="w-3.5 h-3.5" />
                <span>API Execution Stream</span>
              </div>
              {processingLogs.map((log, i) => (
                <p key={i} className="leading-tight">
                  <span className="text-stone-400">[{new Date().toLocaleTimeString()}]</span> {log}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Success Confirmation */}
        {step === 4 && (
          <div className="space-y-6 text-center py-4">
            <div className="w-16 h-16 bg-[#1A1A1A] text-white border-2 border-[#1A1A1A] flex items-center justify-center mx-auto shadow-[4px_4px_0px_#5A5A40]">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h3 className="text-2xl font-serif font-black text-[#1A1A1A] uppercase">Order Confirmed</h3>
              <p className="text-xs text-[#5A5A40] mt-1 uppercase font-mono">
                Order Tracking Ref: <strong className="text-[#1A1A1A]">{createdOrderNumber}</strong>
              </p>
            </div>

            <div className="bg-white p-4 border border-[#1A1A1A] text-left text-xs space-y-2 max-w-md mx-auto font-mono">
              <p className="text-[#1A1A1A]">
                Dispatch confirmation sent to <strong className="text-[#1A1A1A]">{shippingAddress.email}</strong>.
              </p>
              <div className="pt-2 border-t border-[#1A1A1A] flex justify-between text-[#5A5A40]">
                <span>DESTINATION:</span>
                <span className="text-[#1A1A1A] font-bold">{shippingAddress.city}, {shippingAddress.state}</span>
              </div>
              <div className="flex justify-between text-[#5A5A40]">
                <span>DISPATCH ESTIMATE:</span>
                <span className="text-emerald-800 font-bold">3 Business Days</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2">
              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="w-full py-3 bg-[#1A1A1A] text-white font-bold text-xs uppercase tracking-wider border border-[#1A1A1A] hover:bg-[#5A5A40]"
              >
                Return To Storefront
              </button>
            </div>
          </div>
        )}

        </div>

      </div>
    </div>
  );
};
