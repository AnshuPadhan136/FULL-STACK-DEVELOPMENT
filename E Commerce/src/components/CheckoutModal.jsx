import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { formatCurrency } from '../utils/pricing';
import PriceSummary from './PriceSummary';
import { X, CreditCard, User, Mail, MapPin, CheckCircle, ShieldCheck } from 'lucide-react';

export const CheckoutModal = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    orderTotals,
    placeOrder
  } = useShop();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    paymentMethod: 'card',
  });

  const [errors, setErrors] = useState({});

  if (!isCheckoutOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Valid Email is required';
    if (!formData.address.trim()) newErrors.address = 'Shipping Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP Code is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      placeOrder(formData);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col lg:flex-row max-h-[92vh]">
        
        {/* Close Button */}
        <button
          onClick={() => setIsCheckoutOpen(false)}
          className="absolute top-4 right-4 z-10 p-2 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Customer Form */}
        <div className="w-full lg:w-7/12 p-6 sm:p-8 overflow-y-auto space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
              Secure Checkout
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 mt-2">Shipping Information</h2>
            <p className="text-xs text-slate-500 mt-1">Please enter your shipping address and payment preferences.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Full Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border text-xs font-medium rounded-xl focus:outline-none focus:ring-2 focus:bg-white transition-all ${
                    errors.fullName ? 'border-rose-400 focus:ring-rose-500' : 'border-slate-200 focus:ring-indigo-500'
                  }`}
                />
              </div>
              {errors.fullName && <p className="text-[11px] text-rose-500 mt-1">{errors.fullName}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border text-xs font-medium rounded-xl focus:outline-none focus:ring-2 focus:bg-white transition-all ${
                    errors.email ? 'border-rose-400 focus:ring-rose-500' : 'border-slate-200 focus:ring-indigo-500'
                  }`}
                />
              </div>
              {errors.email && <p className="text-[11px] text-rose-500 mt-1">{errors.email}</p>}
            </div>

            {/* Address */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Street Address *
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="123 Shopping Avenue, Suite 400"
                  className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border text-xs font-medium rounded-xl focus:outline-none focus:ring-2 focus:bg-white transition-all ${
                    errors.address ? 'border-rose-400 focus:ring-rose-500' : 'border-slate-200 focus:ring-indigo-500'
                  }`}
                />
              </div>
              {errors.address && <p className="text-[11px] text-rose-500 mt-1">{errors.address}</p>}
            </div>

            {/* City & Zip */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="New York"
                  className={`w-full px-3.5 py-2.5 bg-slate-50 border text-xs font-medium rounded-xl focus:outline-none focus:ring-2 focus:bg-white transition-all ${
                    errors.city ? 'border-rose-400 focus:ring-rose-500' : 'border-slate-200 focus:ring-indigo-500'
                  }`}
                />
                {errors.city && <p className="text-[11px] text-rose-500 mt-1">{errors.city}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  ZIP / Postal Code *
                </label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  placeholder="10001"
                  className={`w-full px-3.5 py-2.5 bg-slate-50 border text-xs font-medium rounded-xl focus:outline-none focus:ring-2 focus:bg-white transition-all ${
                    errors.zipCode ? 'border-rose-400 focus:ring-rose-500' : 'border-slate-200 focus:ring-indigo-500'
                  }`}
                />
                {errors.zipCode && <p className="text-[11px] text-rose-500 mt-1">{errors.zipCode}</p>}
              </div>
            </div>

            {/* Payment Method */}
            <div className="pt-2">
              <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                Payment Option
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'card', label: 'Credit Card', icon: CreditCard },
                  { id: 'paypal', label: 'PayPal', icon: ShieldCheck },
                  { id: 'cod', label: 'Cash on Delivery', icon: CheckCircle },
                ].map((pm) => {
                  const Icon = pm.icon;
                  const selected = formData.paymentMethod === pm.id;
                  return (
                    <button
                      key={pm.id}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, paymentMethod: pm.id }))}
                      className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center justify-center space-y-1 transition-all ${
                        selected
                          ? 'border-indigo-600 bg-indigo-50/70 text-indigo-900 ring-2 ring-indigo-200'
                          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${selected ? 'text-indigo-600' : 'text-slate-400'}`} />
                      <span>{pm.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-extrabold text-sm rounded-2xl shadow-xl shadow-indigo-200 transition-all flex items-center justify-center space-x-2 mt-4"
            >
              <ShieldCheck className="w-5 h-5" />
              <span>Place Order ({formatCurrency(orderTotals.grandTotal)})</span>
            </button>
          </form>
        </div>

        {/* Right: Order Summary Breakdown */}
        <div className="w-full lg:w-5/12 bg-slate-900 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <PriceSummary />

          {/* Quick Items Preview */}
          <div className="space-y-3 pt-4 border-t border-slate-800">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Items in Order ({cart.length})
            </h4>
            <div className="max-h-48 overflow-y-auto space-y-2 pr-1 no-scrollbar">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between text-xs text-slate-300">
                  <span className="truncate max-w-[180px] font-medium">{item.title}</span>
                  <span className="font-mono text-slate-400">
                    {item.quantity} × {formatCurrency(item.price)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CheckoutModal;
