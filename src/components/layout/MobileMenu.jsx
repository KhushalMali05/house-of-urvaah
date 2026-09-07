import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, User, Heart, MapPin, Globe, ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../../data/mockProducts';
import { useCart } from '../../context/CartContext';
import { Logo } from '../common/Logo';

export const MobileMenu = () => {
  const { isMobileMenuOpen, setIsMobileMenuOpen, wishlist } = useCart();
  const [activeCategory, setActiveCategory] = useState(null);

  return (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs"
          />

          {/* Side Drawer Panel (Responsive for both Mobile & Desktop) */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 220 }}
            className="fixed top-0 left-0 z-50 h-full w-full max-w-md bg-white text-brand-dark shadow-2xl flex flex-col justify-between font-serif border-r border-neutral-200"
          >
            {/* Header: Logo + Close */}
            <div className="p-6 md:p-8 flex items-center justify-between border-b border-neutral-100">
              <Logo className="h-10 sm:h-12" />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 hover:opacity-60 transition-opacity"
                aria-label="Close menu"
              >
                <X className="w-6 h-6 stroke-[1.5]" />
              </button>
            </div>

            {/* Navigation Body */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
              <span className="text-[10px] tracking-[0.3em] text-neutral-400 font-serif uppercase block mb-2">
                NAVIGATION
              </span>

              <div className="space-y-1">
                {CATEGORIES.map((cat) => {
                  const isSale = cat.id === 'sale';
                  const isOpen = activeCategory === cat.id;

                  return (
                    <div key={cat.id} className="border-b border-neutral-100/80 pb-3 pt-1">
                      <button
                        onClick={() =>
                          setActiveCategory(isOpen ? null : cat.id)
                        }
                        className={`w-full flex items-center justify-between text-sm md:text-base font-medium tracking-[0.2em] uppercase text-left py-1.5 transition-colors ${
                          isSale
                            ? 'text-red-700 font-semibold'
                            : isOpen
                            ? 'text-brand-dark font-semibold'
                            : 'text-neutral-800 hover:text-black'
                        }`}
                      >
                        <span>{cat.name}</span>
                        <ChevronRight
                          className={`w-4 h-4 transition-transform duration-300 ${
                            isOpen ? 'rotate-90 text-brand-dark' : 'text-neutral-400'
                          }`}
                        />
                      </button>

                      {/* Expanding Accordion Subcategories & Campaign Promo */}
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pl-3 pt-3 space-y-4"
                        >
                          <ul className="space-y-2.5 text-xs text-neutral-600 tracking-wider uppercase">
                            {cat.subcategories.map((sub, idx) => (
                              <li key={idx}>
                                <a
                                  href={`#${cat.id}`}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className={`hover:text-black block py-1 transition-colors ${
                                    sub.featured ? 'font-semibold text-brand-dark' : ''
                                  }`}
                                >
                                  {sub.name}
                                </a>
                              </li>
                            ))}
                          </ul>

                          {/* Subcategory Campaign Promo */}
                          {cat.promo && (
                            <div className="mt-4 p-3 bg-neutral-50 border border-neutral-200/60 rounded-xs flex gap-3 items-center">
                              <img
                                src={cat.promo.image}
                                alt={cat.promo.title}
                                className="w-16 h-16 object-cover bg-neutral-200"
                              />
                              <div>
                                <span className="text-[9px] tracking-widest text-neutral-400 font-serif uppercase block">
                                  {cat.promo.subtitle}
                                </span>
                                <h5 className="text-xs font-semibold tracking-wider uppercase text-brand-dark">
                                  {cat.promo.title}
                                </h5>
                                <a
                                  href={`#${cat.id}`}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className="text-[10px] font-semibold tracking-widest uppercase text-brand-dark underline mt-1 inline-block"
                                >
                                  EXPLORE NOW →
                                </a>
                              </div>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Utility items */}
              <div className="pt-6 space-y-3 text-xs tracking-widest uppercase font-medium">
                <a
                  href="#account"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 py-2 text-neutral-700 hover:text-black"
                >
                  <User className="w-4 h-4 text-neutral-500" />
                  MY ACCOUNT
                </a>
                <a
                  href="#wishlist"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 py-2 text-neutral-700 hover:text-black"
                >
                  <Heart className="w-4 h-4 text-neutral-500" />
                  WISHLIST ({wishlist.length})
                </a>
                <a
                  href="#stores"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 py-2 text-neutral-700 hover:text-black"
                >
                  <MapPin className="w-4 h-4 text-neutral-500" />
                  STORE LOCATOR
                </a>
              </div>
            </div>

            {/* Bottom Footer info */}
            <div className="p-6 border-t border-neutral-100 bg-brand-sand/60 text-[11px] text-neutral-500 tracking-widest flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-medium text-brand-dark">
                <Globe className="w-3.5 h-3.5" />
                INDIA (INR ₹)
              </div>
              <span>ENGLISH</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
