'use client';

import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Book } from 'lucide-react';
import { PublicationBook, PublicationItem } from './PublicationBook';

export const PUBLICATIONS_DATA: PublicationItem[] = [];

interface BookShelfProps {
  onSelectBook: (publication: PublicationItem) => void;
}

export const BookShelf: React.FC<BookShelfProps> = ({ onSelectBook }) => {
  const shelfRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (shelfRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = shelfRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scrollBy = (offset: number) => {
    if (shelfRef.current) {
      shelfRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  if (PUBLICATIONS_DATA.length === 0) {
    return (
      <div className="relative w-full py-6">
        <div className="flex items-center gap-2 mb-6">
          <span className="h-2 w-2 rounded-full bg-institutional-accent animate-pulse" />
          <span className="font-space text-[11px] uppercase tracking-widest text-institutional-accent font-semibold">
            Interactive Hardcover Library
          </span>
        </div>
        <div className="border border-dashed border-black/10 dark:border-white/10 rounded-sm p-12 text-center bg-white/40 dark:bg-white/5 max-w-2xl mx-auto">
          <Book className="w-10 h-10 mx-auto text-institutional-accent mb-4 opacity-80" />
          <p className="font-manrope text-sm text-institutional-mutedLight dark:text-gray-300 leading-relaxed">
            Publications will appear here as they are added to the Foundation&apos;s digital archive.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full py-1">
      {/* Navigation Controls Row */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-institutional-accent animate-pulse" />
          <span className="font-space text-[11px] uppercase tracking-widest text-institutional-accent font-semibold">
            Interactive Hardcover Library
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => scrollBy(-300)}
            disabled={!canScrollLeft}
            aria-label="Scroll Books Left"
            className="p-2 rounded-full border border-institutional-dark/15 dark:border-white/15 disabled:opacity-30 hover:border-institutional-accent text-institutional-dark dark:text-white hover:text-institutional-accent transition-all duration-200 cursor-pointer disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scrollBy(300)}
            disabled={!canScrollRight}
            aria-label="Scroll Books Right"
            className="p-2 rounded-full border border-institutional-dark/15 dark:border-white/15 disabled:opacity-30 hover:border-institutional-accent text-institutional-dark dark:text-white hover:text-institutional-accent transition-all duration-200 cursor-pointer disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Bookshelf Container */}
      <div className="relative">
        <div
          ref={shelfRef}
          onScroll={checkScroll}
          className="flex items-end gap-5 sm:gap-7 lg:gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-2 pt-2 px-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {PUBLICATIONS_DATA.map((publication) => (
            <div key={publication.id} className="snap-center shrink-0">
              <PublicationBook publication={publication} onSelect={onSelectBook} />
            </div>
          ))}
        </div>

        {/* Subtle Luxury Bookshelf Anchor Bar */}
        <div className="relative w-full mt-2">
          {/* Top Edge Shadow of Shelf */}
          <div className="h-1 w-full bg-gradient-to-r from-transparent via-amber-900/30 dark:via-amber-400/20 to-transparent" />
          {/* Main Shelf Plank Line */}
          <div className="h-3 w-full bg-gradient-to-r from-institutional-accent/20 via-institutional-accent/70 to-institutional-accent/20 rounded-full shadow-md" />
          {/* Under-Shelf Ambient Glow */}
          <div className="h-4 w-full bg-gradient-to-b from-black/15 dark:from-black/40 to-transparent blur-sm" />
        </div>
      </div>
    </div>
  );
};

export default BookShelf;
