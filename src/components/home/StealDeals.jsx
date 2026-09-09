import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const STEAL_DEALS = [
  {
    id: 'steal-1',
    label: 'EVERYTHING UNDER',
    price: '10,000',
    image: '/assets/Images/Blue02.png',
    alt: 'Everything under 10,000 - Clothing Apparel',
    link: '#sale'
  },
  {
    id: 'steal-2',
    label: 'TOPS UNDER',
    price: '8,000',
    image: '/assets/Images/Brown02.png',
    alt: 'Tops under 8,000',
    link: '#sale'
  },
  {
    id: 'steal-3',
    label: 'JEWELLERY UNDER',
    price: '5,000',
    image: '/assets/Images/Peach02.png', // Clean close-up product image without baked-in graphic text overlay
    alt: 'Jewellery under 5,000',
    link: '#sale'
  }
];

// Botanical Leaf Branch SVG component for subtle decorative background accent
const BotanicalDeco = ({ className = "" }) => (
  <svg
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M20 180 C 50 140, 80 110, 160 30"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <path
      d="M60 140 C 45 125, 40 105, 50 95 C 65 105, 70 125, 60 140 Z"
      stroke="currentColor"
      strokeWidth="1"
    />
    <path
      d="M85 118 C 95 100, 115 95, 125 105 C 115 120, 95 125, 85 118 Z"
      stroke="currentColor"
      strokeWidth="1"
    />
    <path
      d="M100 105 C 85 90, 80 70, 90 60 C 105 70, 110 90, 100 105 Z"
      stroke="currentColor"
      strokeWidth="1"
    />
    <path
      d="M125 80 C 135 62, 155 57, 165 67 C 155 82, 135 87, 125 80 Z"
      stroke="currentColor"
      strokeWidth="1"
    />
    <path
      d="M140 65 C 128 48, 128 30, 140 20 C 152 32, 152 50, 140 65 Z"
      stroke="currentColor"
      strokeWidth="1"
    />
    <path
      d="M40 160 C 25 150, 15 135, 25 125 C 35 135, 45 150, 40 160 Z"
      stroke="currentColor"
      strokeWidth="1"
    />
  </svg>
);

const FULL_TEXT = "STEAL DEALS";

export const StealDeals = () => {
  const [displayText, setDisplayText] = React.useState('');
  const [isDeleting, setIsDeleting] = React.useState(false);

  React.useEffect(() => {
    let timer;

    if (!isDeleting && displayText.length < FULL_TEXT.length) {
      // Type out character by character (~90ms per character)
      timer = setTimeout(() => {
        setDisplayText(FULL_TEXT.slice(0, displayText.length + 1));
      }, 90);
    } else if (!isDeleting && displayText.length === FULL_TEXT.length) {
      // Pause at full text for 1.8 seconds
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 1800);
    } else if (isDeleting && displayText.length > 0) {
      // Delete character by character (~50ms per character)
      timer = setTimeout(() => {
        setDisplayText(FULL_TEXT.slice(0, displayText.length - 1));
      }, 50);
    } else if (isDeleting && displayText.length === 0) {
      // Pause when empty for 0.5 seconds before re-typing
      timer = setTimeout(() => {
        setIsDeleting(false);
      }, 500);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting]);

  return (
    <section id="steal-deals" className="relative py-16 md:py-24 lg:py-28 bg-[#F7F4EF] overflow-hidden font-serif scroll-mt-20">
      {/* Subtle Botanical Leaf Line-Art in Far Right Edge */}
      <div className="absolute bottom-0 right-0 w-40 md:w-64 text-neutral-400/30 pointer-events-none translate-y-6 translate-x-6 scale-x-[-1]">
        <BotanicalDeco className="w-full h-auto" />
      </div>

      <div className="relative max-w-[1700px] mx-auto px-4 sm:px-6 md:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Content Block (Left-aligned text + Body Copy + Urgency + Solid dark button) */}
          <motion.div
            className="lg:col-span-4 flex flex-col items-start text-left pr-0 lg:pr-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs md:text-sm tracking-[0.35em] uppercase text-neutral-400 font-serif block mb-2">
              THE URVAAH
            </span>
            {/* Typewriter animated section heading with reserved container width */}
            <h2 
              className="section-heading text-neutral-900 mb-4 md:mb-5 relative inline-block"
              aria-label="STEAL DEALS"
            >
              {/* Invisible ghost text locking full width & height to prevent layout reflow */}
              <span className="invisible select-none pointer-events-none" aria-hidden="true">
                STEAL DEALS
                <span className="inline-block w-[2px] md:w-[3px] h-[0.75em] ml-1 sm:ml-1.5" />
              </span>

              {/* Overlaid typing text & blinking cursor */}
              <span className="absolute left-0 top-0 bottom-0 flex items-center pointer-events-none" aria-hidden="true">
                <span className="whitespace-pre">{displayText}</span>
                <motion.span
                  className="inline-block w-[2px] md:w-[3px] h-[0.75em] bg-neutral-900 ml-1 sm:ml-1.5 align-middle"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </span>
            </h2>
            <p className="text-xs sm:text-base italic font-light tracking-[0.18em] text-neutral-600 font-serif uppercase mb-4">
              STYLES YOU'LL LOVE, PRICES YOU'LL ADORE.
            </p>
            
            {/* Supporting Body Copy */}
            <p className="text-xs sm:text-base font-serif font-normal text-neutral-600 leading-relaxed max-w-[420px] mb-8">
              Limited-time drops on our most-loved pieces. Refresh your wardrobe without breaking the bank.
            </p>

            {/* Urgency Badge & Solid Dark SHOP SALE Button */}
            <div className="flex flex-col items-start gap-2.5">
              <span className="text-[11px] md:text-xs font-serif tracking-[0.25em] uppercase text-brand-accent font-medium">
                OFFER ENDS SOON
              </span>
              <a
                href="#sale"
                className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-2.5 sm:py-3 bg-neutral-900 text-white hover:bg-white hover:text-neutral-900 border-2 border-neutral-900 text-xs font-serif tracking-[0.2em] uppercase transition-colors duration-350 ease-[cubic-bezier(0.4,0,0.2,1)] shadow-sm group overflow-hidden"
              >
                {/* Vertical swap text container with strict line height clipping */}
                <div className="relative h-4 overflow-hidden inline-flex items-center">
                  {/* Invisible ghost span reserving container width */}
                  <span className="invisible opacity-0 select-none pointer-events-none whitespace-nowrap" aria-hidden="true">
                    SHOP SALE
                  </span>

                  {/* Primary Default Text: SHOP SALE */}
                  <span className="absolute inset-0 inline-flex items-center justify-center leading-none whitespace-nowrap translate-y-0 group-hover:-translate-y-full transition-transform duration-350 ease-[cubic-bezier(0.4,0,0.2,1)]">
                    SHOP SALE
                  </span>

                  {/* Secondary Hover Text: SHOP NOW */}
                  <span className="absolute inset-0 inline-flex items-center justify-center leading-none whitespace-nowrap translate-y-full group-hover:translate-y-0 transition-transform duration-350 ease-[cubic-bezier(0.4,0,0.2,1)]">
                    SHOP NOW
                  </span>
                </div>

                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-350 ease-[cubic-bezier(0.4,0,0.2,1)]" />
              </a>
            </div>
          </motion.div>

          {/* Right Image Strip (3 Significantly Larger Arch-Shaped Overlay Cards side by side) */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {STEAL_DEALS.map((deal, idx) => (
                <motion.div
                  key={deal.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.12 }}
                  className="group cursor-pointer flex flex-col"
                >
                  {/* Arch-Shaped Image Frame with Light Blur and Hover Interaction */}
                  <div className="relative aspect-[3/4.4] w-full bg-white rounded-t-full overflow-hidden shadow-md border-2 border-transparent transition-all duration-500 group-hover:border-black group-hover:shadow-xl">
                    <img
                      src={deal.image}
                      alt={deal.alt}
                      className="w-full h-full object-cover transition-all duration-500 ease-out blur-[2.5px] group-hover:blur-none scale-105 group-hover:scale-110"
                    />

                    {/* Light Gradient Scrim & Overlaid Soft Dark Text */}
                    <div className="absolute inset-x-0 bottom-0 pt-28 md:pt-36 pb-7 sm:pb-8 px-3 sm:px-5 bg-gradient-to-t from-white/95 via-white/75 to-transparent text-center flex flex-col items-center justify-end z-20 pointer-events-none">
                      <span 
                        className="font-serif tracking-[0.15em] uppercase font-medium text-[#444444] mb-1 block w-full text-center"
                        style={{ fontSize: 'clamp(18px, 2.25vw, 30px)', lineHeight: '1.2', textShadow: '0px 1px 2px rgba(255,255,255,0.9)' }}
                      >
                        {deal.label}
                      </span>
                      <div 
                        className="font-bold font-serif text-[#383838] flex items-baseline justify-center text-center w-full"
                        style={{ fontSize: 'clamp(46px, 6vw, 84px)', lineHeight: '1', textShadow: '0px 1px 3px rgba(255,255,255,0.9)' }}
                      >
                        <span className="font-normal mr-1 text-[#444444]" style={{ fontSize: 'clamp(28px, 3.6vw, 50px)' }}>₹</span>
                        {deal.price}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default StealDeals;
