'use client';

import React, { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { ArchivePhoto } from '../types';

interface LightboxModalProps {
  photo: ArchivePhoto | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  photo,
  onClose,
  onPrev,
  onNext,
}) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!photo) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    },
    [photo, onClose, onPrev, onNext]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!photo) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-8"
      >
        {/* Top Control Bar */}
        <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between z-50 border-b border-white/10 bg-black/40">
          <div className="flex items-center gap-3">
            <span className="h-[1px] w-6 bg-institutional-accent" />
            <span className="font-space text-xs uppercase tracking-widest text-institutional-accent font-semibold">
              MUSEUM LIGHTBOX • YEAR {photo.year}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => alert(`Downloading high-res archive file: ${photo.title}`)}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-space uppercase tracking-wider text-institutional-accent border border-institutional-accent/40 rounded hover:bg-institutional-accent hover:text-institutional-dark transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </button>

            <button
              onClick={onClose}
              aria-label="Close Lightbox"
              className="w-10 h-10 rounded-full border border-white/20 text-white hover:bg-white hover:text-black flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Previous & Next Navigation Buttons */}
        <button
          onClick={onPrev}
          aria-label="Previous photograph"
          className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 flex items-center justify-center transition-all duration-200 cursor-pointer"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={onNext}
          aria-label="Next photograph"
          className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 flex items-center justify-center transition-all duration-200 cursor-pointer"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Content Container */}
        <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-16 pb-8">
          {/* Left: Large Photograph Viewer */}
          <div className="lg:col-span-7 flex justify-center w-full">
            <div className="w-full aspect-[4/3] rounded-sm border border-white/20 shadow-2xl relative overflow-hidden bg-black/5 dark:bg-white/5">
              {photo.imageUrl ? (
                <>
                  <Image
                    src={photo.imageUrl}
                    alt={photo.title}
                    fill
                    className="object-cover object-center"
                    sizes="(max-w-768px) 100vw, 600px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-90 pointer-events-none z-10" />
                  <div className="absolute inset-0 p-8 flex flex-col items-center justify-center text-center text-white z-10">
                    <span className="text-xs font-space uppercase tracking-[0.25em] text-institutional-accent font-semibold mb-2">
                      [ High-Resolution Archival Photograph ]
                    </span>
                    <h3 className="font-cormorant text-2xl sm:text-3xl font-bold text-white mb-2">
                      {photo.title}
                    </h3>
                    <span className="text-xs font-space text-gray-300">
                      {photo.location} • Year {photo.year}
                    </span>
                  </div>
                </>
              ) : (
                <div className="w-full h-full p-8 flex flex-col items-center justify-center text-center text-white bg-gradient-to-br from-institutional-surface/90 via-institutional-dark to-institutional-darker">
                  <span className="text-xs font-space uppercase tracking-[0.25em] text-institutional-accent font-semibold mb-2">
                    [ High-Resolution Archival Photograph ]
                  </span>
                  <h3 className="font-cormorant text-2xl sm:text-3xl font-bold text-white mb-2">
                    {photo.title}
                  </h3>
                  <span className="text-xs font-space text-gray-300">
                    {photo.location} • Year {photo.year}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Right: Detailed Archival Record Metadata */}
          <div className="lg:col-span-5 text-white flex flex-col justify-between space-y-6">
            <div>
              <span className="text-[10px] font-space uppercase tracking-widest text-institutional-accent font-semibold block mb-1">
                {photo.category} ARCHIVE RECORD
              </span>
              <h2 className="font-cormorant text-3xl font-bold text-white mb-3">
                {photo.title}
              </h2>
              <p className="font-manrope text-sm text-gray-300 leading-relaxed mb-4">
                {photo.description}
              </p>
            </div>

            {/* Metadata Badges */}
            <div className="space-y-3 pt-4 border-t border-white/15">
              {photo.peopleTagged && (
                <div>
                  <span className="text-[9px] font-space uppercase text-institutional-accent font-semibold block mb-1">
                    PEOPLE IN PHOTOGRAPH
                  </span>
                  <span className="font-manrope text-xs text-gray-200">
                    {photo.peopleTagged.join(', ')}
                  </span>
                </div>
              )}

              {photo.relatedAwardee && (
                <div>
                  <span className="text-[9px] font-space uppercase text-institutional-accent font-semibold block mb-1">
                    TAGGED LAUREATE
                  </span>
                  <span className="font-manrope text-xs text-gray-200">
                    {photo.relatedAwardee}
                  </span>
                </div>
              )}

              {photo.relatedPublication && (
                <div>
                  <span className="text-[9px] font-space uppercase text-institutional-accent font-semibold block mb-1">
                    TAGGED PUBLICATION
                  </span>
                  <span className="font-manrope text-xs text-gray-200">
                    {photo.relatedPublication}
                  </span>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-white/15 text-[10px] font-space text-gray-400 flex justify-between">
              <span>LOCATION: {photo.location}</span>
              <span>CATALOG # {photo.id}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
