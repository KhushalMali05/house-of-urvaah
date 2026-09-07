import React from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { Logo } from '../common/Logo';

export const Footer = () => {
  return (
    <footer className="bg-white text-brand-dark border-t border-neutral-200 pt-16 pb-12 px-6 md:px-12 font-serif">
      <div className="max-w-7xl mx-auto">
        {/* Top Wordmark Banner */}
        <div className="border-b border-neutral-200 pb-12 mb-12 flex flex-col items-center justify-center text-center">
          <Logo className="h-14 sm:h-16 md:h-20" />
          <p className="text-xs tracking-[0.3em] text-neutral-400 uppercase mt-4">
            PARIS — NEW YORK — MUMBAI — TOKYO
          </p>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-16">
          {/* Column 1: HELP */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-brand-dark mb-5">
              HELP & SUPPORT
            </h4>
            <ul className="space-y-3 text-xs tracking-wider text-neutral-500 uppercase">
              <li><a href="#contact" className="hover:text-black transition-colors">Contact Us</a></li>
              <li><a href="#track" className="hover:text-black transition-colors">Track Order</a></li>
              <li><a href="#returns" className="hover:text-black transition-colors">Returns & Exchanges</a></li>
              <li><a href="#shipping" className="hover:text-black transition-colors">Shipping Information</a></li>
              <li><a href="#size-guide" className="hover:text-black transition-colors">Size Guide</a></li>
              <li><a href="#faqs" className="hover:text-black transition-colors">FAQs</a></li>
            </ul>
          </div>

          {/* Column 2: COMPANY */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-brand-dark mb-5">
              COMPANY
            </h4>
            <ul className="space-y-3 text-xs tracking-wider text-neutral-500 uppercase">
              <li><a href="#about" className="hover:text-black transition-colors">About Us</a></li>
              <li><a href="#sustainability" className="hover:text-black transition-colors">Join Life / Sustainability</a></li>
              <li><a href="#careers" className="hover:text-black transition-colors">Careers</a></li>
              <li><a href="#stores" className="hover:text-black transition-colors">Store Locator</a></li>
              <li><a href="#press" className="hover:text-black transition-colors">Press Room</a></li>
            </ul>
          </div>

          {/* Column 3: LEGAL */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-brand-dark mb-5">
              POLICIES
            </h4>
            <ul className="space-y-3 text-xs tracking-wider text-neutral-500 uppercase">
              <li><a href="#privacy" className="hover:text-black transition-colors">Privacy Policy</a></li>
              <li><a href="#terms" className="hover:text-black transition-colors">Terms of Purchase</a></li>
              <li><a href="#cookies" className="hover:text-black transition-colors">Cookie Settings</a></li>
              <li><a href="#accessibility" className="hover:text-black transition-colors">Accessibility</a></li>
            </ul>
          </div>

          {/* Column 4: SOCIAL & LOCATION */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-brand-dark mb-5">
              CONNECT
            </h4>
            <div className="flex items-center gap-4 text-neutral-700 mb-6">
              <a href="#instagram" aria-label="Instagram" className="hover:text-black transition-colors p-2 bg-neutral-100 rounded-full">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#facebook" aria-label="Facebook" className="hover:text-black transition-colors p-2 bg-neutral-100 rounded-full">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z"/>
                </svg>
              </a>
            </div>

            <h5 className="text-[10px] tracking-widest uppercase text-neutral-400 font-semibold mb-2">
              COUNTRY / REGION
            </h5>
            <div className="inline-flex items-center gap-2 border border-neutral-300 px-3 py-2 text-xs font-medium tracking-wider cursor-pointer hover:border-black transition-colors">
              <Globe className="w-3.5 h-3.5" />
              <span>INDIA (INR ₹)</span>
              <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-8 border-t border-neutral-100 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-neutral-400 tracking-widest uppercase">
          <p>© 2026 HOUSE OF URAAH. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-6">
            <span>SITEMAP</span>
            <span>PRIVACY STATEMENT</span>
            <span>TERMS & CONDITIONS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
