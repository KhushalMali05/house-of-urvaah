import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../common/Button';

export const EditorialBanner = () => {
  return (
    <section className="my-16 py-12 bg-brand-sand text-brand-dark overflow-hidden font-serif">
      <div className="max-w-[1800px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Editorial Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 relative aspect-[16/10] md:aspect-[2/1] overflow-hidden bg-neutral-200"
          >
            <img
              src="/assets/Images/Outfit_Collage.png"
              alt="Editorial Campaign Lookbook"
              className="w-full h-full object-cover object-center filter brightness-95"
            />
            <div className="absolute inset-0 bg-black/10" />
            <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] tracking-[0.3em] font-serif uppercase">
              LOOKBOOK NO. 14 — W26
            </div>
          </motion.div>

          {/* Right Text Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col justify-center px-4 md:px-8 py-4"
          >
            <span className="text-[11px] md:text-xs tracking-[0.25em] uppercase text-neutral-500 font-serif mb-2">
              EDITORIAL VISION
            </span>
            <h2 className="text-2xl md:text-4xl font-serif tracking-[0.2em] uppercase font-normal text-brand-dark leading-[1.3] mb-4">
              THE ART OF<br />
              REFINED<br />
              TAILORING
            </h2>
            <p className="text-xs md:text-sm text-neutral-600 tracking-wider leading-relaxed mb-6 font-light max-w-sm">
              Defined by oversized silhouettes, fluid draping, and uncompromised material integrity. Designed for timeless elegance across seasonal transitions.
            </p>

            <div className="flex flex-wrap gap-3">
              <a href="#lookbook">
                <Button variant="primary">
                  DISCOVER THE COLLECTION
                </Button>
              </a>
              <a href="#campaign">
                <Button variant="outline">
                  VIEW CAMPAIGN FILM
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
