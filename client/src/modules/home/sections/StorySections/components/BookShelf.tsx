'use client';

import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PublicationBook, PublicationItem } from './PublicationBook';

export const PUBLICATIONS_DATA: PublicationItem[] = [
  {
    id: 'pub-1',
    title: 'Amaruchi Journal',
    subtitle: 'Literary & Cultural Anthology',
    volume: 'Vol. XXVIII',
    year: '2024 Edition',
    category: 'Annual Anthology',
    coverBg: '#1B1722',
    coverTextColor: '#FFFFFF',
    accentColor: '#C5A059',
    spineColor: '#120F18',
    description:
      'A celebrated annual anthology compiling critical essays, poetry, and research papers from Odisha’s premier literary figures, young scholars, and cultural historians.',
    pages: 340,
    pdfUrl: '#pdf-amaruchi-2024',
  },
  {
    id: 'pub-2',
    title: 'Prativayana Gazette',
    subtitle: 'Historical & Social Reform',
    volume: 'Special Edition',
    year: '2023 Edition',
    category: 'Historical Gazette',
    coverBg: '#2A1E17',
    coverTextColor: '#FFFFFF',
    accentColor: '#D4AF37',
    spineColor: '#1F1510',
    description:
      'Documenting three decades of grassroots social initiatives, rural transformation, and educational milestones spearheaded by the Ruchi Prativa Foundation.',
    pages: 280,
    pdfUrl: '#pdf-prativayana-2023',
  },
  {
    id: 'pub-3',
    title: 'Odia Sahitya Smaraki',
    subtitle: 'Classical Heritage Studies',
    volume: 'Collector’s Vol. IX',
    year: '2022 Edition',
    category: 'Heritage Research',
    coverBg: '#172421',
    coverTextColor: '#FFFFFF',
    accentColor: '#76C7C0',
    spineColor: '#0E1715',
    description:
      'In-depth academic monographs exploring ancient Odia palm-leaf manuscripts, folklore traditions, and classical literary preservation across Eastern India.',
    pages: 410,
    pdfUrl: '#pdf-odia-sahitya-2022',
  },
  {
    id: 'pub-4',
    title: 'Pratibha CSR Gazette',
    subtitle: 'Grassroots Community Impact',
    volume: 'Silver Jubilee Vol.',
    year: '2023 Edition',
    category: 'CSR Compendium',
    coverBg: '#231B28',
    coverTextColor: '#FFFFFF',
    accentColor: '#E5A93C',
    spineColor: '#17111C',
    description:
      'A comprehensive impact report detailing 25+ years of rural healthcare outposts, afforestation drives, and women artisan empowerment programs in Odisha.',
    pages: 220,
    pdfUrl: '#pdf-csr-report',
  },
  {
    id: 'pub-5',
    title: 'Amaruchi Youth Edition',
    subtitle: 'Emerging Rural Talent',
    volume: 'Vol. XXVII',
    year: '2023 Edition',
    category: 'Youth Anthology',
    coverBg: '#192231',
    coverTextColor: '#FFFFFF',
    accentColor: '#6BB5FF',
    spineColor: '#101621',
    description:
      'Showcasing original short stories, poetry, and essay entries from young Odia school and university scholars across rural districts.',
    pages: 195,
    pdfUrl: '#pdf-youth-edition',
  },
  {
    id: 'pub-6',
    title: 'Ruchi Monograph Series',
    subtitle: 'Environment & Agriculture',
    volume: 'Vol. IV Series',
    year: '2024 Edition',
    category: 'Environmental Monograph',
    coverBg: '#1F291E',
    coverTextColor: '#FFFFFF',
    accentColor: '#82D173',
    spineColor: '#131A12',
    description:
      'Scientific articles and community case studies on sustainable agriculture, native seed preservation, and sacred grove reforestation in Kendujhar.',
    pages: 260,
    pdfUrl: '#pdf-monograph-series',
  },
];

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
