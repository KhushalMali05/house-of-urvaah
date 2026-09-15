import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Heart, MapPin, Globe, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Logo } from '../common/Logo';

const MENU_ITEMS = [
  { label: 'BEST SELLERS', href: '#best-sellers', badge: 'POPULAR' },
  { label: 'RECOMMENDED FOR YOU', href: '#recommended' },
  { label: 'STEAL DEALS', href: '#steal-deals', isHighlight: true },
  { label: 'TRENDING ON THE GRAM', href: '#trending' },
  { label: "WHAT'S HOT RN?", href: '#whats-hot' },
  { label: 'EDITORIAL / REFINED TAILORING', href: '#editorial' },
  { label: 'ABOUT US / OUR STORY', isRoute: true, to: '/about' },
  { label: 'CONTACT US / CONCIERGE', isRoute: true, to: '/contact' }
];

export const MobileMenu = () => {
  const { isMobileMenuOpen, setIsMobileMenuOpen, wishlist, openAuthModal } = useCart();

  const handleNavClick = (e, item) => {
    setIsMobileMenuOpen(false);
    if (item.isRoute) return;

    e.preventDefault();
    const href = item.href;

    // If currently on another page, navigate home with hash
    if (window.location.pathname !== '/' && window.location.pathname !== '') {
      window.location.href = `/${href}`;
      return;
    }

    // Smooth scroll to target section on homepage
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      window.location.hash = href;
    }
  };

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

          {/* Side Drawer Panel */}
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
                className="p-2 hover:opacity-60 transition-opacity cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-6 h-6 stroke-[1.5]" />
              </button>
            </div>

            {/* Navigation Body */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
              <span className="text-[10px] tracking-[0.3em] text-neutral-400 font-serif uppercase block mb-3">
                COLLECTIONS & SECTIONS
              </span>

              {/* Clean Single-Level Navigation List */}
              <div className="flex flex-col border-t border-neutral-100">
                {MENU_ITEMS.map((item, idx) => {
                  const content = (
                    <>
                      <div className="flex items-center gap-2.5">
                        <span className={`text-sm sm:text-base md:text-lg font-serif font-medium tracking-[0.18em] uppercase transition-all duration-200 group-hover:translate-x-1.5 ${
                          item.isHighlight
                            ? 'text-red-800 font-semibold'
                            : 'text-neutral-900 group-hover:text-black'
                        }`}>
                          {item.label}
                        </span>
                        {item.badge && (
                          <span className="text-[9px] font-mono tracking-widest bg-neutral-900 text-white px-2 py-0.5 uppercase">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-neutral-800" />
                    </>
                  );

                  return item.isRoute ? (
                    <Link
                      key={idx}
                      to={item.to}
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        window.scrollTo({ top: 0, behavior: 'instant' });
                      }}
                      className="group py-4 border-b border-neutral-100 flex items-center justify-between transition-colors cursor-pointer"
                    >
                      {content}
                    </Link>
                  ) : (
                    <a
                      key={idx}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item)}
                      className="group py-4 border-b border-neutral-100 flex items-center justify-between transition-colors cursor-pointer"
                    >
                      {content}
                    </a>
                  );
                })}
              </div>

              {/* Utility links */}
              <div className="pt-6 space-y-3.5 text-xs tracking-widest uppercase font-medium">
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    openAuthModal('login');
                  }}
                  className="flex items-center gap-3 py-1.5 text-neutral-700 hover:text-black transition-colors w-full text-left cursor-pointer"
                >
                  <User className="w-4 h-4 text-neutral-500" />
                  MY ACCOUNT
                </button>
                <a
                  href="#wishlist"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 py-1.5 text-neutral-700 hover:text-black transition-colors"
                >
                  <Heart className="w-4 h-4 text-neutral-500" />
                  WISHLIST ({wishlist.length})
                </a>
                <a
                  href="#stores"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 py-1.5 text-neutral-700 hover:text-black transition-colors"
                >
                  <MapPin className="w-4 h-4 text-neutral-500" />
                  STORE LOCATOR
                </a>
              </div>
            </div>

            {/* Bottom Footer Info */}
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
