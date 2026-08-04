'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X } from 'lucide-react';
import { ARCHIVE_DOCUMENTARIES } from '../data/archiveData';
import { DocumentaryItem } from '../types';
import { InteractiveCard } from '@/components/ui/InteractiveCard';

const DOC_CATEGORIES = ['All', 'Foundation', 'Award Ceremonies', 'Community Stories', 'Healthcare', 'Education'];

export const DocumentaryCentre: React.FC = () => {
  const [selectedCat, setSelectedCat] = useState<string>('All');
  const [activeVideo, setActiveVideo] = useState<DocumentaryItem | null>(null);

  const filteredDocs = useMemo(() => {
    if (selectedCat === 'All') return ARCHIVE_DOCUMENTARIES;
    return ARCHIVE_DOCUMENTARIES.filter((d) => d.category === selectedCat);
  }, [selectedCat]);

  return (
    <section
      id="documentary-centre"
      className="py-24 sm:py-36 bg-institutional-dark text-white border-b border-white/10 overflow-hidden relative scroll-mt-24"
    >
      <div className="max-w-[1500px] w-full mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="h-[1px] w-8 bg-institutional-accent" />
            <span className="text-xs uppercase tracking-[0.25em] font-space text-institutional-accent font-semibold">
              Section 05 • Streaming Library
            </span>
            <span className="h-[1px] w-8 bg-institutional-accent" />
          </div>
          <h2 className="font-cormorant text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
            Documentary Streaming Centre
          </h2>
          <p className="font-manrope text-sm sm:text-base text-gray-300 mt-3 leading-relaxed">
            Netflix-inspired archival film streaming library preserving 30 years of oral histories, field operations, and convocation speeches.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12 sm:mb-16">
          {DOC_CATEGORIES.map((cat) => {
            const active = selectedCat === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`text-[11px] font-space uppercase tracking-wider px-4 py-2 rounded-sm transition-all duration-200 cursor-pointer ${
                  active
                    ? 'bg-institutional-accent text-institutional-dark font-bold shadow-md'
                    : 'bg-white/5 border border-white/10 text-gray-300 hover:border-institutional-accent/40'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Streaming Posters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {filteredDocs.map((doc, idx) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              onClick={() => setActiveVideo(doc)}
              className="cursor-pointer group"
            >
              <InteractiveCard className="flex flex-col justify-between h-full bg-white/5 border border-white/15 rounded-sm p-6 hover:border-institutional-accent transition-all duration-300 shadow-xl">
                <div>
                  {/* Category & Duration */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4 text-[10px] font-space text-institutional-accent uppercase tracking-widest font-semibold">
                    <span>{doc.category}</span>
                    <span className="px-2 py-0.5 rounded bg-institutional-accent/15 border border-institutional-accent/30">
                      {doc.duration}
                    </span>
                  </div>

                  {/* Cinematic Poster Thumbnail Frame with Play Hover Overlay */}
                  <div className="w-full aspect-[16/10] rounded-sm bg-gradient-to-br from-institutional-surface/90 via-institutional-dark to-institutional-darker border border-white/15 p-4 flex flex-col items-center justify-center text-center relative overflow-hidden mb-5 group-hover:border-institutional-accent/50 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-institutional-accent text-institutional-dark flex items-center justify-center mb-2 group-hover:scale-110 transition-transform shadow-lg">
                      <Play className="w-5 h-5 fill-institutional-dark ml-0.5" />
                    </div>
                    <span className="text-[10px] font-space uppercase tracking-[0.2em] text-institutional-accent font-semibold block">
                      [ STREAM FILM • YEAR {doc.year} ]
                    </span>
                  </div>

                  {/* Title & Director Note */}
                  <h3 className="font-cormorant text-2xl font-bold text-white mb-2 leading-snug group-hover:text-institutional-accent transition-colors">
                    {doc.title}
                  </h3>

                  <p className="font-manrope text-xs text-gray-300 leading-relaxed mb-4">
                    {doc.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 text-[9px] font-space text-gray-400">
                  <span>DIRECTOR NOTE: {doc.directorNote}</span>
                </div>
              </InteractiveCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Streaming Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-8"
          >
            <div className="max-w-4xl w-full bg-institutional-dark border border-white/20 rounded-sm p-6 sm:p-10 text-white relative shadow-2xl">
              <button
                onClick={() => setActiveVideo(null)}
                aria-label="Close video streaming modal"
                className="absolute top-4 right-4 w-10 h-10 rounded-full border border-white/20 text-white hover:bg-white hover:text-black flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6">
                <span className="text-xs font-space uppercase tracking-widest text-institutional-accent font-semibold block mb-1">
                  STREAMING ARCHIVAL FILM • {activeVideo.year} ({activeVideo.duration})
                </span>
                <h3 className="font-cormorant text-3xl sm:text-4xl font-bold text-white mb-2">
                  {activeVideo.title}
                </h3>
                <p className="font-manrope text-xs text-gray-300 leading-relaxed">
                  {activeVideo.summary}
                </p>
              </div>

              {/* Video Player Placeholder Frame */}
              <div className="w-full aspect-[16/9] rounded bg-gradient-to-br from-black via-institutional-surface/90 to-institutional-dark border border-institutional-accent/40 p-8 flex flex-col items-center justify-center text-center shadow-inner relative mb-6">
                <div className="w-16 h-16 rounded-full bg-institutional-accent text-institutional-dark flex items-center justify-center mb-4 shadow-xl">
                  <Play className="w-8 h-8 fill-institutional-dark ml-1" />
                </div>
                <span className="text-sm font-space uppercase tracking-widest text-institutional-accent font-semibold block mb-1">
                  [ Streaming Archival Film Player ]
                </span>
                <p className="text-xs text-gray-400 max-w-md">
                  Official digitized master copy from the Ruchi Prativa Foundation Audio-Visual Vault.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-space text-gray-400 border-t border-white/10 pt-4">
                <span>CATEGORY: {activeVideo.category}</span>
                <span>TAGS: {activeVideo.tags.join(' • ')}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
