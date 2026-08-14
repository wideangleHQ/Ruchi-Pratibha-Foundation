'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, Download, ExternalLink, Calendar, Layers, FileText } from 'lucide-react';
import { PublicationItem } from './PublicationBook';

interface BookPreviewProps {
  publication: PublicationItem | null;
  onClose: () => void;
}

export const BookPreview: React.FC<BookPreviewProps> = ({ publication, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (publication) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [publication, onClose]);

  if (!publication) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop Fade */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
        />

        {/* Realistic Book Opening Modal Surface */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-[#FFFDF9] dark:bg-[#121824] text-institutional-dark dark:text-institutional-light rounded-sm border border-institutional-dark/15 dark:border-white/15 shadow-2xl overflow-hidden z-10 my-auto"
        >
          {/* Top Gold Line Accent */}
          <div className="h-1 w-full bg-institutional-accent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close Publication Preview"
            className="absolute top-4 right-4 p-2 rounded-full border border-institutional-dark/15 dark:border-white/15 hover:border-institutional-accent text-institutional-dark dark:text-white hover:text-institutional-accent transition-all duration-200 cursor-pointer z-20"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10 lg:p-12 items-center">
            {/* Left Column: 3D Unfolded Book Mockup */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center py-4">
              <div className="relative w-[200px] sm:w-[230px] h-[300px] sm:h-[340px] shadow-2xl rounded-r-sm overflow-hidden border border-white/20 p-6 flex flex-col justify-between"
                style={{ backgroundColor: publication.coverBg, color: publication.coverTextColor }}
              >
                <div className="absolute top-0 bottom-0 left-0 w-4 bg-gradient-to-r from-black/40 via-black/10 to-transparent" />
                <div className="relative z-10 flex items-center justify-between">
                  <span className="font-space text-[10px] tracking-widest uppercase font-semibold text-institutional-accent">
                    {publication.volume}
                  </span>
                  <span className="font-space text-[10px] text-gray-300">
                    {publication.year}
                  </span>
                </div>

                <div className="relative z-10 text-center my-auto">
                  <BookOpen className="w-8 h-8 text-institutional-accent mx-auto mb-3" />
                  <h3 className="font-cormorant text-3xl font-bold text-white leading-tight mb-1">
                    {publication.title}
                  </h3>
                  <p className="font-cormorant text-sm italic text-institutional-accent">
                    {publication.subtitle}
                  </p>
                </div>

                <div className="relative z-10 pt-3 border-t border-white/15 text-[9px] font-space text-gray-300 text-center uppercase tracking-wider">
                  Ruchi Prativa Foundation Archive
                </div>
              </div>
            </div>

            {/* Right Column: Publication Editorial Details & Actions */}
            <div className="lg:col-span-7 flex flex-col justify-between h-full">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-institutional-accent/15 border border-institutional-accent/30 text-institutional-accent text-[11px] font-space font-semibold uppercase tracking-wider mb-4">
                  <span>{publication.category}</span>
                  <span>•</span>
                  <span>{publication.volume}</span>
                </div>

                <h2 className="font-cormorant text-3xl sm:text-4xl font-bold text-institutional-dark dark:text-white mb-2 leading-tight">
                  {publication.title}
                </h2>
                <p className="font-cormorant text-lg italic text-institutional-accent mb-4">
                  {publication.subtitle}
                </p>

                {/* Metadata Row */}
                <div className="grid grid-cols-3 gap-3 py-3 border-y border-institutional-dark/10 dark:border-white/10 mb-5 text-xs font-space">
                  <div className="flex items-center gap-2 text-institutional-mutedLight dark:text-gray-400">
                    <Calendar className="w-4 h-4 text-institutional-accent" />
                    <span>{publication.year}</span>
                  </div>
                  <div className="flex items-center gap-2 text-institutional-mutedLight dark:text-gray-400">
                    <FileText className="w-4 h-4 text-institutional-accent" />
                    <span>{publication.pages} Pages</span>
                  </div>
                  <div className="flex items-center gap-2 text-institutional-mutedLight dark:text-gray-400">
                    <Layers className="w-4 h-4 text-institutional-accent" />
                    <span>Hardcover Edition</span>
                  </div>
                </div>

                {/* Summary Paragraph */}
                <p className="font-manrope text-xs sm:text-sm text-institutional-mutedLight dark:text-gray-300 leading-relaxed mb-6">
                  {publication.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-institutional-dark/10 dark:border-white/10">
                <a
                  href={publication.pdfUrl || '/publications'}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-institutional-dark dark:bg-white text-white dark:text-institutional-dark hover:bg-institutional-accent hover:text-institutional-dark dark:hover:bg-institutional-accent dark:hover:text-institutional-dark font-space text-xs font-semibold tracking-wider uppercase rounded-sm shadow transition-all duration-200 cursor-pointer"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Read Online Edition</span>
                </a>

                <a
                  href={publication.pdfUrl || '/publications'}
                  className="inline-flex items-center gap-2 px-6 py-3 border border-institutional-dark/20 dark:border-white/20 hover:border-institutional-accent text-institutional-dark dark:text-white hover:text-institutional-accent font-space text-xs font-semibold tracking-wider uppercase rounded-sm transition-all duration-200 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF</span>
                </a>

                <a
                  href="/publications"
                  className="inline-flex items-center gap-1.5 text-xs font-space font-semibold text-institutional-accent hover:underline ml-auto"
                >
                  <span>View Archive</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default BookPreview;
