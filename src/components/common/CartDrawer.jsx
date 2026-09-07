import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Button } from './Button';

export const CartDrawer = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    freeShippingProgress,
  } = useCart();

  const formatPrice = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const freeShippingNeeded = Math.max(0, 2999 - cartSubtotal);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 z-50 h-full w-full max-w-md bg-white shadow-2xl flex flex-col justify-between font-serif text-brand-dark"
          >
            {/* Header */}
            <div className="p-5 border-b border-neutral-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                <h2 className="text-sm font-semibold tracking-widest uppercase">
                  SHOPPING BAG ({cart.reduce((a, b) => a + b.quantity, 0)})
                </h2>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-neutral-100 transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Meter */}
            <div className="bg-brand-sand px-5 py-3 border-b border-neutral-200/80">
              <div className="flex justify-between items-center text-xs tracking-wide mb-1.5 font-medium">
                <span>
                  {freeShippingNeeded === 0 ? (
                    <span className="text-emerald-700 font-semibold">
                      🎉 YOU QUALIFY FOR FREE EXPRESS SHIPPING!
                    </span>
                  ) : (
                    <span>
                      Add <strong className="text-black">{formatPrice(freeShippingNeeded)}</strong> more for FREE Shipping
                    </span>
                  )}
                </span>
                <span className="text-[11px] text-neutral-500">{freeShippingProgress}%</span>
              </div>
              <div className="w-full bg-neutral-200 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-brand-dark h-full transition-all duration-500"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-5 divide-y divide-neutral-100">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12 text-neutral-400">
                  <ShoppingBag className="w-12 h-12 stroke-[1] mb-4 text-neutral-300" />
                  <p className="text-sm tracking-wider uppercase mb-6 text-neutral-600">
                    YOUR SHOPPING BAG IS EMPTY
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setIsCartOpen(false)}
                    className="text-xs"
                  >
                    CONTINUE SHOPPING
                  </Button>
                </div>
              ) : (
                cart.map((item, idx) => (
                  <div key={`${item.product.id}-${item.selectedSize}-${idx}`} className="py-4 flex gap-4">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-24 object-cover object-top bg-neutral-100 flex-shrink-0"
                    />

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="text-xs font-medium uppercase tracking-wider text-brand-dark line-clamp-1">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                            className="text-neutral-400 hover:text-red-700 transition-colors p-1"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-[11px] text-neutral-500 tracking-wider mt-1">
                          SIZE: <span className="font-semibold text-brand-dark">{item.selectedSize}</span>
                        </p>
                        <p className="text-xs font-medium text-brand-dark mt-1">
                          {formatPrice(item.product.price)}
                        </p>
                      </div>

                      {/* Quantity selector */}
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-neutral-100">
                        <div className="flex items-center border border-neutral-200 text-xs">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.selectedSize, -1)}
                            className="p-1 px-2 hover:bg-neutral-100 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 font-semibold text-xs">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.selectedSize, 1)}
                            className="p-1 px-2 hover:bg-neutral-100 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="text-xs font-semibold">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer / Summary */}
            {cart.length > 0 && (
              <div className="p-5 border-t border-neutral-200 bg-white">
                <div className="flex justify-between items-center mb-2 text-xs tracking-wider">
                  <span className="text-neutral-500 uppercase">SUBTOTAL</span>
                  <span className="font-bold text-sm">{formatPrice(cartSubtotal)}</span>
                </div>
                <p className="text-[10px] text-neutral-400 tracking-wide mb-4">
                  Taxes and shipping calculated at checkout.
                </p>

                <Button
                  fullWidth
                  variant="primary"
                  className="group flex items-center justify-center gap-2 py-4"
                  onClick={() => {
                    alert('Proceeding to Checkout mock page!');
                  }}
                >
                  PROCEED TO CHECKOUT
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
