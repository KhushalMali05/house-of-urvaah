import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Menu, Search, User, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Logo } from '../common/Logo';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const {
    cartCount,
    setIsCartOpen,
    setIsSearchOpen,
    setIsMobileMenuOpen,
  } = useCart();

  useEffect(() => {
    if (!isHomePage) {
      setIsScrolled(true);
      return;
    }

    const handleScroll = () => {
      const bestSellersSection = document.getElementById('best-sellers');
      if (bestSellersSection) {
        const rect = bestSellersSection.getBoundingClientRect();
        // Navbar becomes visible as Best Sellers section reaches top of viewport (threshold 100px)
        setIsScrolled(rect.top <= 100);
      } else {
        setIsScrolled(window.scrollY > 450);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [isHomePage]);

  return (
    <header className="fixed top-0 z-40 w-full font-serif select-none transition-all duration-300 ease-in-out">
      {/* 
        =====================================================
        STATE 1: TRANSPARENT HERO HEADER (BEFORE RECOMMENDED FOR YOU)
        =====================================================
      */}
      <div
        className={`w-full pt-6 pb-4 px-6 md:px-12 text-brand-dark transition-all duration-300 ease-in-out ${
          !isScrolled
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-2 pointer-events-none absolute inset-x-0 top-0'
        }`}
      >
        <div className="max-w-[1800px] mx-auto flex justify-between items-start">
          {/* Top-Left: Hamburger Icon Only */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-1 hover:opacity-60 transition-opacity text-brand-dark"
            aria-label="Open navigation drawer"
          >
            <Menu className="w-7 h-7 stroke-[2.25]" />
          </button>

          {/* Right Side: Search, Account/Log In, Bag Icons + Help */}
          <div className="flex items-center gap-4 md:gap-6 text-brand-dark">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-1 hover:opacity-60 transition-opacity text-brand-dark flex items-center"
              aria-label="Search"
              title="Search"
            >
              <Search className="w-5 h-5 md:w-6 md:h-6 stroke-[2.25]" />
            </button>

            <a
              href="#account"
              className="p-1 hover:opacity-60 transition-opacity text-brand-dark flex items-center"
              aria-label="Log In"
              title="Log In"
            >
              <User className="w-5 h-5 md:w-6 md:h-6 stroke-[2.25]" />
            </a>

            <button
              onClick={() => setIsCartOpen(true)}
              className="p-1 hover:opacity-60 transition-opacity text-brand-dark flex items-center gap-1.5"
              aria-label="Shopping Bag"
              title="Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5 md:w-6 md:h-6 stroke-[2.25]" />
              <span className="text-xs font-bold tracking-wider font-mono">
                [{cartCount}]
              </span>
            </button>

            <a
              href="#help"
              className="text-sm md:text-base font-bold tracking-[0.15em] uppercase text-brand-dark hover:opacity-60 transition-opacity flex items-center h-5 md:h-6 leading-none ml-0.5"
            >
              HELP
            </a>
          </div>
        </div>
      </div>

      {/* 
        =====================================================
        STATE 2: SOLID STICKY HEADER (WHEN RECOMMENDED FOR YOU REACHES TOP)
        =====================================================
      */}
      <div
        className={`w-full bg-white/95 backdrop-blur-md border-b border-neutral-200 text-brand-dark shadow-sm py-1 md:py-1.5 transition-all duration-300 ease-in-out ${
          isScrolled
            ? 'opacity-100 translate-y-0 pointer-events-auto relative'
            : 'opacity-0 -translate-y-2 pointer-events-none absolute inset-x-0 top-0'
        }`}
      >
        <div className="max-w-[1800px] mx-auto px-4 md:px-8 grid grid-cols-3 items-center min-h-[60px] md:min-h-[68px]">
          {/* Column 1 (Left): Hamburger Icon Only */}
          <div className="flex items-center justify-start">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-1 hover:opacity-60 transition-opacity text-brand-dark"
              aria-label="Open navigation drawer"
            >
              <Menu className="w-6 h-6 stroke-[2]" />
            </button>
          </div>

          {/* Column 2 (Center): house of URVAAH Logo Image */}
          <div className="flex items-center justify-center">
            <Link to="/" aria-label="House of Urvaah Home" className="inline-flex items-center justify-center">
              <Logo className="h-12 sm:h-14 md:h-16 lg:h-20" />
            </Link>
          </div>

          {/* Column 3 (Right): Search, Account, Bag Icons */}
          <div className="flex items-center justify-end gap-3 md:gap-5 text-brand-dark">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-1 hover:opacity-60 transition-opacity flex items-center"
              aria-label="Search"
              title="Search"
            >
              <Search className="w-5 h-5 md:w-6 md:h-6 stroke-[2]" />
            </button>

            <a
              href="#account"
              className="p-1 hover:opacity-60 transition-opacity flex items-center"
              aria-label="Account"
              title="Account"
            >
              <User className="w-5 h-5 md:w-6 md:h-6 stroke-[2]" />
            </a>

            <button
              onClick={() => setIsCartOpen(true)}
              className="p-1 hover:opacity-60 transition-opacity flex items-center gap-1.5"
              aria-label="Shopping Bag"
              title="Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5 md:w-6 md:h-6 stroke-[2]" />
              <span className="text-xs font-semibold tracking-wider font-mono">
                [{cartCount}]
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

