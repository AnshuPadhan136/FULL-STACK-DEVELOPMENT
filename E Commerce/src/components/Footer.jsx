import React from 'react';
import { ShoppingBag, ShieldCheck, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="mt-16 bg-slate-900 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <span className="text-lg font-black text-white">AuraMart</span>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-sm">
              Modern single-page React e-commerce application powered by real-time data from DummyJSON API, featuring automatic promo coupons and itemized 18% GST tax breakdown.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Supported Coupons</h4>
            <ul className="space-y-2 text-slate-300 font-mono text-[11px]">
              <li><strong className="text-emerald-400">SAVE10</strong> — 10% Off Subtotal</li>
              <li><strong className="text-indigo-400">FLAT50</strong> — $50 Off Orders &gt; $100</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Tax Compliance</h4>
            <div className="flex items-start space-x-2 text-slate-400 leading-relaxed">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>Standard 18% GST is automatically calculated on post-discount taxable subtotal.</span>
            </div>
          </div>

        </div>

        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-slate-500 gap-4">
          <p>© 2026 AuraMart Store. Built with React & Tailwind CSS.</p>
          <div className="flex items-center space-x-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>for Senior Frontend Engineering</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
