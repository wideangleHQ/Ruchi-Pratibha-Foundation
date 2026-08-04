'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { KNOWLEDGE_NODES } from '../data/publicationsData';

export const RelatedKnowledgeGraph: React.FC = () => {
  const [activeMobileIndex, setActiveMobileIndex] = useState<number>(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const cardWidth = container.scrollWidth / KNOWLEDGE_NODES.length;
    const scrollPos = container.scrollLeft;
    const index = Math.round(scrollPos / cardWidth);
    if (index >= 0 && index < KNOWLEDGE_NODES.length) {
      setActiveMobileIndex(index);
    }
  };

  const scrollToIndex = (idx: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const cardWidth = container.scrollWidth / KNOWLEDGE_NODES.length;
    container.scrollTo({
      left: idx * cardWidth,
      behavior: 'smooth',
    });
    setActiveMobileIndex(idx);
  };

  return (
    <section
      id="related-reading"
      className="py-24 sm:py-32 bg-institutional-light dark:bg-institutional-surface/20 text-institutional-dark dark:text-white border-b border-institutional-dark/10 dark:border-white/10 overflow-hidden scroll-mt-24 sm:scroll-mt-28"
    >
      <div className="max-w-[1500px] w-full mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="h-[1px] w-8 bg-institutional-accent" />
            <span className="text-xs uppercase tracking-[0.25em] font-space text-institutional-accent font-semibold">
              Interconnected Knowledge System
            </span>
            <span className="h-[1px] w-8 bg-institutional-accent" />
          </div>
          <h2 className="font-cormorant text-3xl sm:text-5xl font-bold tracking-tight text-institutional-dark dark:text-white">
            Continue Exploring
          </h2>
          <p className="font-manrope text-sm sm:text-base text-institutional-mutedLight dark:text-gray-300 mt-3 leading-relaxed">
            Discover how every publication, historical article, founder address, and community timeline item connects into a unified digital knowledge ecosystem.
          </p>
        </div>

        {/* 1. DESKTOP & TABLET KNOWLEDGE CARDS GRID (hidden on mobile, grid on md+) */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {KNOWLEDGE_NODES.map((node, idx) => (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <div className="flex flex-col justify-between h-full bg-white dark:bg-institutional-surface/40 border border-black/10 dark:border-white/10 rounded-sm p-6 sm:p-7 hover:border-institutional-accent/50 transition-all duration-300 shadow-sm hover:shadow-md">
                <div>
                  <div className="flex items-center justify-between border-b border-black/5 dark:border-white/5 pb-3 mb-4">
                    <span className="font-space text-[10px] uppercase tracking-widest text-institutional-accent font-semibold">
                      • {node.type}
                    </span>
                    <span className="font-space text-[9px] text-gray-400">{node.category}</span>
                  </div>

                  <h3 className="font-cormorant text-2xl font-bold text-institutional-dark dark:text-white mb-2 leading-tight">
                    {node.title}
                  </h3>

                  <p className="font-manrope text-xs sm:text-sm text-institutional-mutedLight dark:text-gray-300 leading-relaxed mb-6">
                    {node.summary}
                  </p>

                  <div className="space-y-2 mb-4 pt-3 border-t border-black/5 dark:border-white/5">
                    <span className="text-[9px] font-space uppercase tracking-widest text-institutional-accent font-semibold block">
                      CONNECTED KNOWLEDGE NODES
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {node.relatedItems.map((rel) => (
                        <a
                          key={rel.label}
                          href={rel.link}
                          className="text-[10px] font-space px-2.5 py-1 rounded bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-institutional-dark dark:text-gray-200 hover:border-institutional-accent/50 transition-colors"
                        >
                          → {rel.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-xs font-space text-institutional-accent font-semibold">
                  <a href={node.targetHash} className="inline-flex items-center gap-1 hover:underline">
                    <span>Explore Connections</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 2. MOBILE FULL-BLEED HORIZONTAL CAROUSEL (320px-480px, visible on md:hidden) */}
        <div className="block md:hidden">
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="w-[100vw] -ml-6 px-6 overflow-x-auto overflow-y-hidden scrollbar-none snap-x snap-mandatory flex gap-4 pt-2 pb-4 touch-pan-x"
          >
            {KNOWLEDGE_NODES.map((node) => (
              <div
                key={node.id}
                className="w-[78vw] shrink-0 snap-center flex flex-col justify-between bg-white dark:bg-institutional-surface/40 border border-black/10 dark:border-white/10 rounded-sm p-6 shadow-none"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-black/5 dark:border-white/5 pb-2.5 mb-3">
                    <span className="font-space text-[9px] uppercase tracking-widest text-institutional-accent font-semibold">
                      • {node.type}
                    </span>
                    <span className="font-space text-[8px] text-gray-400">{node.category}</span>
                  </div>

                  <h3 className="font-cormorant text-xl font-bold text-institutional-dark dark:text-white mb-2 leading-snug">
                    {node.title}
                  </h3>

                  <p className="font-manrope text-xs text-institutional-mutedLight dark:text-gray-300 leading-relaxed mb-4">
                    {node.summary}
                  </p>

                  <div className="space-y-1.5 mb-3 pt-2 border-t border-black/5 dark:border-white/5">
                    <span className="text-[8px] font-space uppercase tracking-widest text-institutional-accent font-semibold block">
                      CONNECTIONS
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {node.relatedItems.map((rel) => (
                        <a
                          key={rel.label}
                          href={rel.link}
                          className="text-[9px] font-space px-2 py-0.5 rounded bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-institutional-dark dark:text-gray-200"
                        >
                          → {rel.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-[11px] font-space text-institutional-accent font-semibold min-h-[40px]">
                  <a href={node.targetHash} className="inline-flex items-center gap-1 hover:underline">
                    <span>Explore Connections</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Pagination Indicator Dots */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {KNOWLEDGE_NODES.map((node, idx) => {
              const active = activeMobileIndex === idx;
              return (
                <button
                  key={node.id}
                  onClick={() => scrollToIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    active
                      ? 'w-6 h-2 bg-institutional-accent shadow-sm'
                      : 'w-2 h-2 bg-black/20 dark:bg-white/20 hover:bg-institutional-accent/50'
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
