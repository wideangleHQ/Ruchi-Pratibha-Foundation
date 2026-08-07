'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const SUPPORTERS = [
  { name: 'UNICEF', sub: 'India Partner' },
  { name: 'TATA STEEL', sub: 'CSR Collaborator' },
  { name: 'NALCO', sub: 'Community Partner' },
  { name: 'HINDALCO', sub: 'Social Initiative' },
  { name: 'ODISHA TOURISM', sub: 'Heritage Partner' },
  { name: 'JINDAL STEEL', sub: 'Development Partner' },
];

export const SupportAndGiving: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      const cardWidth = scrollRef.current.children[0]?.getBoundingClientRect().width || 1;
      const index = Math.round(scrollLeft / (cardWidth + 16));
      setActiveIndex(Math.min(index, SUPPORTERS.length - 1));
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll);
    }
    return () => el?.removeEventListener('scroll', checkScroll);
  }, []);

  return (
    <section id="support" className="py-12 lg:py-16 bg-institutional-light dark:bg-[#151C2B] border-b border-gray-200 dark:border-white/10 scroll-mt-24 sm:scroll-mt-28 min-h-[40vh] flex flex-col justify-center">
      <div className="max-w-[1500px] w-full mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        
        {/* Header */}
        <div className="text-center mb-8 lg:mb-12">
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] font-space text-institutional-accent font-semibold block mb-2">
            Institutional Support
          </span>
          <h2 className="font-cormorant text-3xl lg:text-4xl font-bold tracking-tight text-institutional-dark dark:text-white">
            Our Supporters & CSR Partners
          </h2>
        </div>

        {/* Desktop responsive row (hidden on mobile, row on md+) */}
        <div className="hidden md:grid grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
          {SUPPORTERS.map((sup, idx) => (
            <motion.div
              key={sup.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="group p-6 bg-white dark:bg-[#121824] border border-gray-200 dark:border-white/10 rounded-sm hover:-translate-y-1.5 hover:scale-[1.03] hover:shadow-[0_4px_25px_rgba(197,160,89,0.08)] hover:border-institutional-accent/40 hover:bg-institutional-accent/[0.02] flex flex-col items-center justify-center text-center transition-all duration-300 h-[120px] cursor-pointer"
            >
              <span className="font-space text-base font-bold tracking-[0.15em] text-institutional-dark/80 dark:text-white/80 group-hover:text-institutional-accent transition-colors duration-300">
                {sup.name}
              </span>
              <span className="font-manrope text-[10px] text-gray-400 mt-1 uppercase tracking-wider">
                {sup.sub}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Mobile Horizontal Logo Slider */}
        <div className="block md:hidden">
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-none snap-x snap-mandatory pb-6 touch-pan-x"
          >
            {SUPPORTERS.map((sup) => (
              <div
                key={sup.name}
                className="flex-[0_0_65%] snap-start p-6 bg-white dark:bg-[#121824] border border-gray-200 dark:border-white/10 rounded-sm flex flex-col items-center justify-center text-center h-[110px]"
              >
                <span className="font-space text-sm font-bold tracking-[0.12em] text-institutional-dark/80 dark:text-white/80">
                  {sup.name}
                </span>
                <span className="font-manrope text-[9px] text-gray-450 mt-1 uppercase tracking-wider">
                  {sup.sub}
                </span>
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-1.5 mt-2">
            {SUPPORTERS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (scrollRef.current) {
                    const cardWidth = scrollRef.current.children[0]?.getBoundingClientRect().width || 200;
                    scrollRef.current.scrollTo({ left: idx * (cardWidth + 16), behavior: 'smooth' });
                  }
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${activeIndex === idx ? 'bg-institutional-accent w-4' : 'bg-gray-300 dark:bg-white/20'}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
