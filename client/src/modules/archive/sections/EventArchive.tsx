'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, FolderOpen, Tag } from 'lucide-react';
import { EVENT_FOLDERS } from '../data/archiveData';

export const EventArchive: React.FC = () => {
  const [openFolderId, setOpenFolderId] = useState<string | null>(EVENT_FOLDERS[0].id);

  const toggleFolder = (id: string) => {
    setOpenFolderId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="event-archive"
      className="py-24 sm:py-36 bg-[#121824] text-white border-b border-white/10 overflow-hidden scroll-mt-24"
    >
      <div className="max-w-[1500px] w-full mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="h-[1px] w-8 bg-institutional-accent" />
            <span className="text-xs uppercase tracking-[0.25em] font-space text-institutional-accent font-semibold">
              Physical Archival Boxes • Museum Storage
            </span>
            <span className="h-[1px] w-8 bg-institutional-accent" />
          </div>
          <h2 className="font-cormorant text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
            Institutional Archival Vault Boxes
          </h2>
          <p className="font-manrope text-sm sm:text-base text-gray-300 mt-3 leading-relaxed">
            Crafted like physical museum document boxes. Hover or tap any archival box to open the lid and inspect the enclosed convocations, photo records, and publication releases.
          </p>
        </div>

        {/* Desktop View: Archival Box Shelf Display */}
        <div className="hidden md:block max-w-4xl mx-auto space-y-6">
          {EVENT_FOLDERS.map((folder) => {
            const isOpen = openFolderId === folder.id;

            return (
              <motion.div
                key={folder.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="perspective-1000"
              >
                {/* Physical Archival Box Structure */}
                <div
                  className={`relative rounded-sm border transition-all duration-300 overflow-hidden shadow-2xl ${
                    isOpen
                      ? 'border-institutional-accent bg-[#171F2E]'
                      : 'border-white/20 bg-[#151C2B] hover:border-institutional-accent/60'
                  }`}
                >
                  {/* Gold Foil Brass Stamp Header (Box Tab) */}
                  <div
                    onClick={() => toggleFolder(folder.id)}
                    className="w-full p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 cursor-pointer select-none relative bg-[radial-gradient(ellipse_at_top_right,rgba(197,160,89,0.12),transparent_70%)] group"
                  >
                    {/* Archival Folder Tab Notch */}
                    <div className="absolute top-0 left-8 px-4 py-1 bg-institutional-accent text-institutional-dark text-[9px] font-space uppercase tracking-[0.25em] font-bold rounded-b-xs shadow-md">
                      ARCHIVAL VAULT BOX • {folder.year}
                    </div>

                    <div className="flex items-center gap-5 pt-3 sm:pt-0">
                      {/* Physical Folder Icon Frame */}
                      <div className="w-14 h-14 rounded-xs bg-[#1F293D] border border-institutional-accent/40 text-institutional-accent flex flex-col items-center justify-center font-space font-bold shrink-0 shadow-inner group-hover:scale-105 transition-transform">
                        <span className="text-xs tracking-widest uppercase font-semibold">EST.</span>
                        <span className="text-base text-white">{folder.year}</span>
                      </div>

                      <div>
                        <span className="text-[10px] font-space uppercase tracking-widest text-institutional-accent font-semibold block mb-0.5">
                          {folder.ceremonyName}
                        </span>
                        <h3 className="font-cormorant text-2xl sm:text-3xl font-bold text-white group-hover:text-institutional-accent transition-colors leading-tight">
                          {folder.title}
                        </h3>
                      </div>
                    </div>

                    {/* Metadata Summary Pill Badges */}
                    <div className="flex items-center gap-4 self-end sm:self-center">
                      <div className="hidden sm:flex items-center gap-2 text-xs font-space text-gray-300 bg-white/5 border border-white/10 px-3 py-1.5 rounded">
                        <Tag className="w-3.5 h-3.5 text-institutional-accent" />
                        <span>{folder.photosCount} Photos</span>
                        <span>•</span>
                        <span>{folder.videosCount} Videos</span>
                      </div>

                      <div className="flex items-center gap-2 text-xs font-space text-institutional-accent font-semibold uppercase tracking-wider">
                        <FolderOpen className="w-4 h-4" />
                        <span>{isOpen ? 'Close Box' : 'Open Box'}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-institutional-accent transition-transform duration-300 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Inside Archival Box Content */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-white/15 p-6 sm:p-8 bg-[#0F141F] space-y-6"
                      >
                        {/* Summary & Narrative */}
                        <div className="border-l-2 border-institutional-accent pl-4">
                          <span className="text-[10px] font-space uppercase tracking-widest text-institutional-accent font-semibold block mb-1">
                            ARCHIVAL RECORD SUMMARY
                          </span>
                          <p className="font-manrope text-sm sm:text-base text-gray-200 leading-relaxed">
                            {folder.summary}
                          </p>
                        </div>

                        {/* Nested Archival Document Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                          <div className="p-4 rounded-xs bg-white/5 border border-white/10">
                            <span className="text-[9px] font-space uppercase text-institutional-accent font-semibold block mb-1">
                              CONVOCATION VENUE
                            </span>
                            <span className="font-manrope text-xs text-gray-200 block">
                              {folder.location}
                            </span>
                          </div>

                          <div className="p-4 rounded-xs bg-white/5 border border-white/10">
                            <span className="text-[9px] font-space uppercase text-institutional-accent font-semibold block mb-1">
                              DISTINGUISHED GUESTS
                            </span>
                            <span className="font-manrope text-xs text-gray-200 block">
                              {folder.distinguishedGuests.join(' • ')}
                            </span>
                          </div>

                          <div className="p-4 rounded-xs bg-white/5 border border-white/10">
                            <span className="text-[9px] font-space uppercase text-institutional-accent font-semibold block mb-1">
                              PUBLICATIONS RELEASED
                            </span>
                            <span className="font-manrope text-xs text-gray-200 block">
                              {folder.publicationsReleased.join(' • ')}
                            </span>
                          </div>

                          <div className="p-4 rounded-xs bg-white/5 border border-white/10">
                            <span className="text-[9px] font-space uppercase text-institutional-accent font-semibold block mb-1">
                              PRESS &amp; MEDIA RELEASES
                            </span>
                            <span className="font-manrope text-xs text-gray-200 block">
                              {folder.mediaCoverageCount} Archival Reports
                            </span>
                          </div>
                        </div>

                        {/* Key Moments Bar */}
                        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-space text-gray-300">
                          <div>
                            <span className="text-institutional-accent font-semibold mr-2">KEY MOMENTS:</span>
                            <span>{folder.keyMoments.join(' • ')}</span>
                          </div>
                          <a
                            href="#photo-archive"
                            className="text-institutional-accent font-semibold hover:underline shrink-0"
                          >
                            Browse Year {folder.year} Vault Records &rarr;
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile View: Horizontal Swipeable Archive Shelf */}
        <div className="block md:hidden">
          <div className="w-[100vw] -ml-4 px-4 overflow-x-auto overflow-y-hidden scrollbar-none snap-x snap-mandatory flex gap-4 pt-2 pb-6 touch-pan-x">
            {EVENT_FOLDERS.map((folder) => {
              const isOpen = openFolderId === folder.id;

              return (
                <div
                  key={folder.id}
                  className="w-[85vw] shrink-0 snap-center rounded-sm border border-white/20 bg-[#151C2B] p-5 shadow-xl flex flex-col justify-between"
                >
                  <div>
                    <div className="inline-block px-3 py-0.5 bg-institutional-accent text-institutional-dark text-[8px] font-space uppercase tracking-widest font-bold rounded-xs mb-3">
                      ARCHIVAL VAULT BOX • {folder.year}
                    </div>

                    <h3 className="font-cormorant text-2xl font-bold text-white mb-2 leading-tight">
                      {folder.title}
                    </h3>

                    <p className="font-manrope text-xs text-gray-300 line-clamp-3 mb-4">
                      {folder.summary}
                    </p>

                    <div className="flex flex-wrap gap-2 text-[9px] font-space text-institutional-accent mb-4">
                      <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">
                        {folder.photosCount} Photos
                      </span>
                      <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">
                        {folder.videosCount} Videos
                      </span>
                      <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">
                        {folder.honoreesCount} Honorees
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleFolder(folder.id)}
                    className="w-full py-2.5 text-xs font-space uppercase tracking-widest text-institutional-dark bg-institutional-accent font-semibold rounded-xs cursor-pointer text-center"
                  >
                    {isOpen ? 'Close Box Contents' : 'Open Vault Box'}
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 pt-4 border-t border-white/15 text-xs font-manrope text-gray-200 space-y-2"
                      >
                        <p><strong>Venue:</strong> {folder.location}</p>
                        <p><strong>Publications:</strong> {folder.publicationsReleased.join(', ')}</p>
                        <p><strong>Guests:</strong> {folder.distinguishedGuests.join(', ')}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
