import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Eye, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const ProductCard = ({ product, onQuickView }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isInWishlist, setPdpProduct } = useCart();
  const isWishlisted = isInWishlist(product.id);

  useEffect(() => {
    if (!product?.carouselImages || product.carouselImages.length <= 1) return;
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % product.carouselImages.length);
    }, 2500); // crossfade every 2.5s matching banner sections
    return () => clearInterval(interval);
  }, [product?.carouselImages]);

  const handleCardClick = () => {
    if (product?.id) {
      if (setPdpProduct) {
        setPdpProduct(product);
      } else {
        navigate(`/product/${product.id}`);
      }
    }
  };

  const formatPrice = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative flex flex-col cursor-pointer transition-all duration-300 editorial-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative w-full aspect-[3/4] bg-neutral-100 overflow-hidden mb-3">
        {/* Primary & Hover / Auto Carousel Images */}
        {product.carouselImages && product.carouselImages.length > 1 ? (
          product.carouselImages.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={`${product.name} ${i}`}
              className={`absolute inset-0 w-full h-full object-cover object-top filter brightness-[0.98] contrast-[1.02] transition-opacity duration-1000 ease-in-out ${
                i === carouselIndex ? 'opacity-100' : 'opacity-0'
              } transform group-hover:scale-105 transition-transform duration-700 ease-out`}
              loading="lazy"
            />
          ))
        ) : (
          <div className="relative w-full h-full">
            <img
              src={product.image}
              alt={product.name}
              className={`absolute inset-0 w-full h-full object-cover object-top transition-all duration-500 ease-out transform group-hover:scale-105 ${
                product.hoverImage && isHovered ? 'opacity-0' : 'opacity-100'
              }`}
              loading="lazy"
            />
            {product.hoverImage && (
              <img
                src={product.hoverImage}
                alt={`${product.name} hover view`}
                className={`absolute inset-0 w-full h-full object-cover object-top transition-all duration-500 ease-out transform group-hover:scale-105 ${
                  isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                loading="lazy"
              />
            )}
          </div>
        )}



        {/* Wishlist Icon Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          aria-label="Wishlist toggle"
          title="Save to Wishlist"
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-brand-dark transition-all duration-300 hover:bg-white hover:scale-110 shadow-sm"
        >
          <Heart
            className={`w-4 h-4 transition-colors duration-300 ${
              isWishlisted ? 'fill-red-700 text-red-700' : 'text-neutral-700'
            }`}
          />
        </button>

        {/* Quick Action Overlay Bar at bottom of card on hover */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            className="flex-1 bg-white text-brand-dark text-[11px] font-semibold tracking-wider uppercase py-2 px-3 hover:bg-neutral-100 transition-colors flex items-center justify-center gap-1.5 shadow-md"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            + Quick Add
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onQuickView) {
                onQuickView(product);
              } else if (setPdpProduct) {
                setPdpProduct(product);
              }
            }}
            title="Quick View"
            aria-label="Quick View"
            className="bg-black/80 hover:bg-black text-white p-2 transition-colors flex items-center justify-center shadow-md"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Details */}
      <div className="flex flex-col flex-1 px-1">
        <div className="flex justify-between items-start mb-1 gap-2">
          <h3 className="text-xs font-medium tracking-wider text-brand-dark uppercase line-clamp-1 group-hover:text-neutral-600 transition-colors">
            {product.name}
          </h3>
        </div>

        <div className="flex items-center gap-2 text-xs tracking-wider">
          <span className="font-normal text-brand-dark">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-neutral-400 line-through text-[11px]">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Color swatches preview */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex items-center gap-1 mt-2">
            {product.colors.map((color, idx) => (
              <span
                key={idx}
                className="w-2.5 h-2.5 rounded-full border border-black/20"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
