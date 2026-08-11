'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ARCHIVE_PHOTOS } from '../data/archiveData';
import { ArchivePhoto } from '../types';
import { LightboxModal } from './LightboxModal';
import { InteractiveCard } from '@/components/ui/InteractiveCard';

const PHOTO_CATEGORIES = ['All', 'Award Ceremonies', 'Education', 'Healthcare', 'Environment', 'Foundation History'];

export const PhotoArchive: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const filteredPhotos = useMemo(() => {
    if (selectedCategory === 'All') return ARCHIVE_PHOTOS;
    return ARCHIVE_PHOTOS.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  // Distribute items into 3 columns for desktop/laptop and 2 columns for mobile masonry
  const { desktopCols, mobileCols } = useMemo(() => {
    const dCols: ArchivePhoto[][] = [[], [], []];
    const mCols: ArchivePhoto[][] = [[], []];

    filteredPhotos.forEach((photo, idx) => {
      dCols[idx % 3].push(photo);
      mCols[idx % 2].push(photo);
    });

    return { desktopCols: dCols, mobileCols: mCols };
  }, [filteredPhotos]);

  const activePhoto = activeLightboxIndex !== null ? filteredPhotos[activeLightboxIndex] : null;

  const handlePrevPhoto = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((prev) => (prev! - 1 + filteredPhotos.length) % filteredPhotos.length);
    }
  };

  const handleNextPhoto = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((prev) => (prev! + 1) % filteredPhotos.length);
    }
  };

  return (
    <section
      id="gallery"
      className="py-24 sm:py-36 bg-institutional-cream dark:bg-institutional-surface/20 text-institutional-dark dark:text-white border-b border-institutional-dark/10 dark:border-white/10 overflow-hidden scroll-mt-24 sm:scroll-mt-28"
    >
      <div className="max-w-[1500px] w-full mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="h-[1px] w-8 bg-institutional-accent" />
            <span className="text-xs uppercase tracking-[0.25em] font-space text-institutional-accent font-semibold">
              Pinterest Editorial Masonry • Magnum Archive
            </span>
            <span className="h-[1px] w-8 bg-institutional-accent" />
          </div>
          <h2 className="font-cormorant text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-institutional-dark dark:text-white">
            Photo Archive &amp; Visual Catalog
          </h2>
          <p className="font-manrope text-sm sm:text-base text-institutional-mutedLight dark:text-gray-300 mt-3 leading-relaxed">
            Pinterest-inspired editorial masonry layout. Discover 30 years of archival captures with variable aspect ratios, rich story previews, and full-screen museum viewing.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12 sm:mb-16">
          {PHOTO_CATEGORIES.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-[11px] font-space uppercase tracking-wider px-4 py-2 rounded-sm transition-all duration-200 cursor-pointer ${
                  active
                    ? 'bg-institutional-accent text-institutional-dark font-bold shadow-xs'
                    : 'bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 text-institutional-dark dark:text-gray-300 hover:border-institutional-accent/40'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Desktop 3-Column Pinterest Masonry */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-8 items-start">
          {desktopCols.map((colPhotos, colIdx) => (
            <div key={`d-col-${colIdx}`} className="flex flex-col gap-6 lg:gap-8">
              {colPhotos.map((photo) => {
                const globalIndex = filteredPhotos.findIndex((p) => p.id === photo.id);
                const aspectClass =
                  photo.aspectRatio === 'portrait'
                    ? 'aspect-[3/4]'
                    : photo.aspectRatio === 'square'
                    ? 'aspect-square'
                    : photo.aspectRatio === 'wide'
                    ? 'aspect-[16/9]'
                    : 'aspect-[4/3]';

                return (
                  <motion.div
                    key={photo.id}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    onClick={() => setActiveLightboxIndex(globalIndex)}
                    className="cursor-pointer group"
                  >
                    <InteractiveCard className="flex flex-col justify-between h-full bg-white dark:bg-institutional-surface/40 border border-black/10 dark:border-white/10 rounded-sm p-6 hover:border-institutional-accent transition-all duration-300 shadow-sm hover:shadow-xl">
                      <div>
                        {/* Header Metadata */}
                        <div className="flex items-center justify-between border-b border-black/5 dark:border-white/10 pb-3 mb-4 text-[10px] font-space text-institutional-accent font-semibold uppercase tracking-widest">
                          <span>{photo.category}</span>
                          <span>{photo.year}</span>
                        </div>

                        {/* Image Frame with Variable Height */}
                        <div
                          className={`w-full ${aspectClass} rounded-sm border border-black/10 dark:border-white/10 mb-4 relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-300 bg-black/5 dark:bg-white/5`}
                        >
                          {photo.imageUrl ? (
                            <>
                              <Image
                                src={photo.imageUrl}
                                alt={photo.title}
                                fill
                                className="object-cover object-center"
                                sizes="(max-w-768px) 100vw, 33vw"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent opacity-90 transition-opacity duration-300 z-10 pointer-events-none" />
                              <div className="absolute inset-0 p-5 flex flex-col items-center justify-center text-center text-white z-10">
                                <span className="text-[10px] font-space uppercase tracking-[0.2em] text-institutional-accent font-semibold block mb-1">
                                  [ Archival Capture • {photo.year} ]
                                </span>
                                <h4 className="font-cormorant text-xl font-bold text-white mb-1">
                                  {photo.title}
                                </h4>
                                <span className="text-[9px] font-space text-gray-300">
                                  {photo.location}
                                </span>
                              </div>
                            </>
                          ) : (
                            <div className="w-full h-full p-5 flex flex-col items-center justify-center text-center text-white bg-gradient-to-br from-institutional-surface/95 via-institutional-dark to-institutional-darker">
                              <span className="text-[10px] font-space uppercase tracking-[0.2em] text-institutional-accent font-semibold block mb-1">
                                [ Archival Capture • {photo.year} ]
                              </span>
                              <h4 className="font-cormorant text-xl font-bold text-white mb-1">
                                {photo.title}
                              </h4>
                              <span className="text-[9px] font-space text-gray-400">
                                {photo.location}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Title & Short Story Preview */}
                        <h3 className="font-cormorant text-2xl font-bold text-institutional-dark dark:text-white mb-2 leading-tight group-hover:text-institutional-accent transition-colors">
                          {photo.title}
                        </h3>

                        <p className="font-manrope text-xs text-institutional-mutedLight dark:text-gray-300 leading-relaxed mb-4">
                          {photo.caption}
                        </p>
                      </div>

                      {/* Footer Link */}
                      <div className="pt-3 border-t border-black/5 dark:border-white/10 flex items-center justify-between text-[10px] font-space text-institutional-accent font-semibold">
                        <span>LOCATION: {photo.location.toUpperCase()}</span>
                        <span className="group-hover:underline">View Story &rarr;</span>
                      </div>
                    </InteractiveCard>
                  </motion.div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Mobile 2-Column Pinterest Adaptive Masonry */}
        <div className="grid grid-cols-2 md:hidden gap-3 items-start">
          {mobileCols.map((colPhotos, colIdx) => (
            <div key={`m-col-${colIdx}`} className="flex flex-col gap-3">
              {colPhotos.map((photo) => {
                const globalIndex = filteredPhotos.findIndex((p) => p.id === photo.id);
                const aspectClass =
                  photo.aspectRatio === 'portrait'
                    ? 'aspect-[3/4]'
                    : photo.aspectRatio === 'square'
                    ? 'aspect-square'
                    : 'aspect-[4/3]';

                return (
                  <div
                    key={photo.id}
                    onClick={() => setActiveLightboxIndex(globalIndex)}
                    className="cursor-pointer group bg-white dark:bg-institutional-surface/40 border border-black/10 dark:border-white/10 rounded-sm p-3 shadow-xs"
                  >
                    <div className="flex items-center justify-between border-b border-black/5 dark:border-white/10 pb-2 mb-2 text-[9px] font-space text-institutional-accent font-semibold uppercase tracking-wider">
                      <span>{photo.year}</span>
                      <span>{photo.category.split(' ')[0]}</span>
                    </div>

                    <div
                      className={`w-full ${aspectClass} rounded-xs border border-black/10 dark:border-white/10 mb-2 overflow-hidden relative bg-black/5 dark:bg-white/5`}
                    >
                      {photo.imageUrl ? (
                        <>
                          <Image
                            src={photo.imageUrl}
                            alt={photo.title}
                            fill
                            className="object-cover object-center"
                            sizes="45vw"
                          />
                        </>
                      ) : (
                        <div className="w-full h-full p-2 flex flex-col items-center justify-center text-center text-white bg-gradient-to-br from-institutional-surface/95 via-institutional-dark to-institutional-darker">
                          <span className="text-[8px] font-space uppercase text-institutional-accent font-semibold">
                            [ Photo ]
                          </span>
                        </div>
                      )}
                    </div>

                    <h4 className="font-cormorant text-sm font-bold text-institutional-dark dark:text-white leading-tight mb-1">
                      {photo.title}
                    </h4>

                    <span className="text-[9px] font-space text-institutional-accent font-semibold block pt-1 border-t border-black/5 dark:border-white/10">
                      View Story &rarr;
                    </span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Viewer Modal */}
      <LightboxModal
        photo={activePhoto}
        onClose={() => setActiveLightboxIndex(null)}
        onPrev={handlePrevPhoto}
        onNext={handleNextPhoto}
      />
    </section>
  );
};
