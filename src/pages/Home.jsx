import React from 'react';
import { HeroParallaxBlock } from '../components/home/HeroParallaxBlock';
import { CategoryGrid } from '../components/home/CategoryGrid';
import { ProductCarousel } from '../components/home/ProductCarousel';
import { EditorialBanner } from '../components/home/EditorialBanner';
import { BestSellers } from '../components/home/BestSellers';
import { TrendingOnGram } from '../components/home/TrendingOnGram';
import { WhatsHot } from '../components/home/WhatsHot';
import { BrandStory } from '../components/home/BrandStory';
import { Newsletter } from '../components/home/Newsletter';
import { useCart } from '../context/CartContext';

export const Home = () => {
  const { setQuickViewProduct, setPdpProduct } = useCart();

  return (
    <main className="w-full min-h-screen bg-white">
      {/* Hero Video + Dual Campaign Banner Parallax Block with Pinned Logo Overlay */}
      <HeroParallaxBlock />

      {/* BEST SELLERS Section */}
      <section id="best-sellers" className="scroll-mt-20">
        <BestSellers onQuickView={(p) => setPdpProduct(p)} />
      </section>

      {/* TRENDING ON THE GRAM Section */}
      <section id="trending-on-gram" className="scroll-mt-20">
        <TrendingOnGram />
      </section>

      {/* WHAT'S HOT RN Section */}
      <section id="whats-hot" className="scroll-mt-20">
        <WhatsHot />
      </section>

      {/* 4.4 Category Grid / Shop by Category */}
      <section id="recommended-for-you" className="scroll-mt-20">
        <CategoryGrid />
      </section>

      {/* 4.5 Featured/New Arrivals Product Carousel */}
      <section id="new-in" className="scroll-mt-20">
        <ProductCarousel onQuickView={(p) => setQuickViewProduct(p)} />
      </section>

      {/* 4.6 Editorial/Lookbook Banner */}
      <EditorialBanner />

      {/* 4.8 Sustainability / Brand Story Strip */}
      <BrandStory />

      {/* 4.9 Newsletter Signup */}
      <Newsletter />
    </main>
  );
};
