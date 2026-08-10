import React from 'react';
import { ShieldCheck, Truck, RotateCcw, CreditCard, Code2, Heart } from 'lucide-react';
import { useEcommerce } from '../context/EcommerceContext';

export const Footer: React.FC = () => {
  const { setViewMode, setBlueprintTab } = useEcommerce();

  const handleOpenBlueprint = (tab: any) => {
    setViewMode('blueprint');
    setBlueprintTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#F9F8F6] border-t-2 border-[#1A1A1A] text-[#1A1A1A] text-xs">
      {/* Value Proposition Highlights */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-b border-[#1A1A1A]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-start gap-3 p-3 bg-white border border-[#1A1A1A] shadow-[2px_2px_0px_#1A1A1A]">
            <div className="p-2 bg-[#1A1A1A] text-white shrink-0">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-[#1A1A1A] text-xs uppercase tracking-wider">Express Delivery</h4>
              <p className="text-[#5A5A40] text-[11px] mt-0.5">Free dispatch on orders over $100 with live updates.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-white border border-[#1A1A1A] shadow-[2px_2px_0px_#1A1A1A]">
            <div className="p-2 bg-[#1A1A1A] text-white shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-[#1A1A1A] text-xs uppercase tracking-wider">Stripe Encryption</h4>
              <p className="text-[#5A5A40] text-[11px] mt-0.5">256-bit encrypted payments & Apple Pay integration.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-white border border-[#1A1A1A] shadow-[2px_2px_0px_#1A1A1A]">
            <div className="p-2 bg-[#1A1A1A] text-white shrink-0">
              <RotateCcw className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-[#1A1A1A] text-xs uppercase tracking-wider">30-Day Guarantee</h4>
              <p className="text-[#5A5A40] text-[11px] mt-0.5">Seamless return policy with immediate credit processing.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-white border border-[#1A1A1A] shadow-[2px_2px_0px_#1A1A1A]">
            <div className="p-2 bg-[#1A1A1A] text-white shrink-0">
              <Code2 className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-[#1A1A1A] text-xs uppercase tracking-wider">Full Specification</h4>
              <p className="text-[#5A5A40] text-[11px] mt-0.5">Explore PostgreSQL ER schema, API code & build roadmap.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#1A1A1A] text-white font-serif font-black text-lg flex items-center justify-center">
                A
              </div>
              <span className="font-serif font-black text-[#1A1A1A] text-base uppercase tracking-tight">Arch-Commerce</span>
            </div>
            <p className="text-[#5A5A40] leading-relaxed text-[11px]">
              An enterprise e-commerce reference architecture and live storefront built with React 19, Tailwind CSS, PostgreSQL Prisma Schema, Zustand, and Stripe API.
            </p>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-white border border-[#1A1A1A] text-[#1A1A1A] font-mono text-[10px] font-bold">REF: SEC-BLUE-PRINT-2026</span>
              <span className="px-2 py-0.5 bg-[#1A1A1A] text-white font-mono text-[10px] font-bold">PRODUCTION READY</span>
            </div>
          </div>

          {/* Blueprint Links */}
          <div>
            <h5 className="font-bold text-[#5A5A40] text-xs uppercase tracking-[0.2em] mb-3">01 / Specification</h5>
            <ul className="space-y-2 font-medium text-[11px]">
              <li>
                <button onClick={() => handleOpenBlueprint('architecture')} className="hover:underline hover:text-[#5A5A40]">
                  Tech Stack Rationale
                </button>
              </li>
              <li>
                <button onClick={() => handleOpenBlueprint('schema')} className="hover:underline hover:text-[#5A5A40]">
                  PostgreSQL & Prisma ER Schema
                </button>
              </li>
              <li>
                <button onClick={() => handleOpenBlueprint('folder')} className="hover:underline hover:text-[#5A5A40]">
                  Project Hierarchy & Folder Tree
                </button>
              </li>
              <li>
                <button onClick={() => handleOpenBlueprint('snippets')} className="hover:underline hover:text-[#5A5A40]">
                  Key Code Snippets & API Handlers
                </button>
              </li>
              <li>
                <button onClick={() => handleOpenBlueprint('roadmap')} className="hover:underline hover:text-[#5A5A40]">
                  6-Phase Implementation Roadmap
                </button>
              </li>
            </ul>
          </div>

          {/* Store Categories */}
          <div>
            <h5 className="font-bold text-[#5A5A40] text-xs uppercase tracking-[0.2em] mb-3">02 / Catalog</h5>
            <ul className="space-y-2 font-medium text-[11px]">
              <li className="hover:underline cursor-pointer">Electronics & Architectural Tech</li>
              <li className="hover:underline cursor-pointer">High-Fidelity Audio Gear</li>
              <li className="hover:underline cursor-pointer">Minimalist Tailored Apparel</li>
              <li className="hover:underline cursor-pointer">Modern Workspace Systems</li>
              <li className="hover:underline cursor-pointer">Smart Wearable Hardware</li>
            </ul>
          </div>

          {/* Platform Specs */}
          <div>
            <h5 className="font-bold text-[#5A5A40] text-xs uppercase tracking-[0.2em] mb-3">03 / Platform Specs</h5>
            <div className="bg-white p-3 border border-[#1A1A1A] shadow-[2px_2px_0px_#1A1A1A] space-y-2 text-[11px] font-mono">
              <div className="flex justify-between border-b border-stone-200 pb-1">
                <span className="text-[#5A5A40]">Frontend:</span>
                <span className="font-bold text-[#1A1A1A]">React + Tailwind</span>
              </div>
              <div className="flex justify-between border-b border-stone-200 pb-1">
                <span className="text-[#5A5A40]">Database:</span>
                <span className="font-bold text-[#1A1A1A]">PostgreSQL / Prisma</span>
              </div>
              <div className="flex justify-between border-b border-stone-200 pb-1">
                <span className="text-[#5A5A40]">Payments:</span>
                <span className="font-bold text-[#1A1A1A]">Stripe (Simulated)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5A5A40]">State Engine:</span>
                <span className="font-bold text-[#1A1A1A]">Zustand / LocalSync</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-4 border-t border-[#1A1A1A] flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-bold uppercase tracking-widest">
          <p className="text-[#5A5A40]">
            Arch-Commerce Blueprint • Enterprise Retail Ecosystems
          </p>
          <div className="flex gap-6 text-[#1A1A1A]">
            <span>Latency: &lt;100ms</span>
            <span>SEO Score: 100/100</span>
            <span>Accessibility: AA</span>
          </div>
          <div className="px-2 py-1 bg-[#1A1A1A] text-white">
            Deployment Ready
          </div>
        </div>
      </div>
    </footer>
  );
};
