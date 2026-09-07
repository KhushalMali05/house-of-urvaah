import React from 'react';
import { motion } from 'framer-motion';
import { BEST_SELLERS_PRODUCTS } from '../../data/mockProducts';
import { ProductCard } from '../common/ProductCard';

export const BestSellers = ({ onQuickView }) => {
  return (
    <section className="py-16 md:py-20 bg-white font-serif">
      <div className="max-w-[1800px] mx-auto px-4 md:px-8">
        {/* Section Heading */}
        <div className="mb-8 md:mb-12 border-b border-neutral-200 pb-5">
          <span className="text-[10px] tracking-[0.3em] uppercase text-neutral-400 font-serif block mb-1">
            CURATED ESSENTIALS
          </span>
          <h2 className="text-xl md:text-3xl font-serif tracking-[0.2em] uppercase font-normal text-brand-dark">
            BEST SELLERS
          </h2>
        </div>

        {/* Static 4-Column Product Grid (No scroll, no arrows) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {BEST_SELLERS_PRODUCTS.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
            >
              <ProductCard product={product} onQuickView={onQuickView} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
