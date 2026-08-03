'use client';

import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { BookShelf } from './BookShelf';
import { PublicationItem } from './PublicationBook';
import { BookPreview } from './BookPreview';

export const PublicationsAndMedia: React.FC = () => {
  const [selectedPublication, setSelectedPublication] = useState<PublicationItem | null>(null);

  return (
    <section
      id="publications"
      className="py-14 sm:py-16 lg:py-20 lg:min-h-[80vh] flex flex-col justify-center bg-institutional-cream dark:bg-institutional-dark text-institutional-dark dark:text-institutional-light border-b border-institutional-dark/10 dark:border-white/10 overflow-hidden relative"
    >
      <div className="max-w-[1500px] w-full mx-auto px-6 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header: Digital Library & Knowledge Repository */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-3 mb-2">
            <span className="h-[1px] w-8 bg-institutional-accent" />
            <span className="text-[11px] uppercase tracking-[0.2em] font-space text-institutional-accent font-semibold">
              Preserving Knowledge
            </span>
            <span className="h-[1px] w-8 bg-institutional-accent" />
          </div>
          <h2 className="font-cormorant text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-institutional-dark dark:text-white">
            Institutional Publications
          </h2>
          <p className="font-manrope text-xs sm:text-sm text-institutional-mutedLight dark:text-gray-300 mt-1.5 leading-relaxed">
            The Foundation’s publications document decades of thought, culture, literature, achievements, and institutional history. They serve as an important archive preserving Odisha’s intellectual and cultural heritage.
          </p>
        </div>

        {/* Section 1: Digital Library 3D Bookshelf */}
        <div className="mb-6">
          <BookShelf onSelectBook={(book) => setSelectedPublication(book)} />
        </div>

        {/* View All Publications CTA Button */}
        <div className="text-center">
          <a
            href="#publications-archive"
            className="group inline-flex items-center gap-2.5 px-6 py-3 bg-institutional-dark dark:bg-white text-white dark:text-institutional-dark hover:bg-institutional-accent hover:text-institutional-dark dark:hover:bg-institutional-accent dark:hover:text-institutional-dark font-space text-xs font-semibold tracking-widest uppercase rounded-sm shadow transition-all duration-300 cursor-pointer"
          >
            <span>Explore Publications</span>
            <ArrowRight className="w-3.5 h-3.5 text-institutional-accent group-hover:text-institutional-dark group-hover:translate-x-1 transition-all duration-300" />
          </a>
        </div>
      </div>

      {/* Interactive Book Opening Preview Modal */}
      <BookPreview
        publication={selectedPublication}
        onClose={() => setSelectedPublication(null)}
      />
    </section>
  );
};

export default PublicationsAndMedia;
