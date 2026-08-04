'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight } from 'lucide-react';
import {
  ARCHIVE_PHOTOS,
  EVENT_FOLDERS,
  ARCHIVE_DOCUMENTARIES,
  HISTORICAL_MOMENTS,
  MEDIA_CLIPPINGS,
} from '../data/archiveData';
import { SearchQueryResult } from '../types';

interface GlobalUniversalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlobalUniversalSearch: React.FC<GlobalUniversalSearchProps> = ({
  isOpen,
  onClose,
}) => {
  const [query, setQuery] = useState('');

  // Index all archive items into a unified search dataset
  const searchDataset = useMemo<SearchQueryResult[]>(() => {
    const results: SearchQueryResult[] = [];

    ARCHIVE_PHOTOS.forEach((p) => {
      results.push({
        id: `photo-${p.id}`,
        type: 'Photo',
        title: p.title,
        year: p.year,
        category: p.category,
        snippet: `${p.caption} — ${p.location}`,
        targetHash: '#photo-archive',
      });
    });

    EVENT_FOLDERS.forEach((e) => {
      results.push({
        id: `event-${e.id}`,
        type: 'Event',
        title: e.title,
        year: e.year,
        category: 'Convocation Assembly',
        snippet: `${e.summary} — Guests: ${e.distinguishedGuests.join(', ')}`,
        targetHash: '#event-archive',
      });
    });

    ARCHIVE_DOCUMENTARIES.forEach((d) => {
      results.push({
        id: `doc-${d.id}`,
        type: 'Documentary',
        title: d.title,
        year: d.year,
        category: d.category,
        snippet: `${d.summary} — ${d.duration}`,
        targetHash: '#documentary-centre',
      });
    });

    HISTORICAL_MOMENTS.forEach((h) => {
      results.push({
        id: `moment-${h.id}`,
        type: 'Article',
        title: h.title,
        year: h.year,
        category: h.milestoneType,
        snippet: h.summary,
        targetHash: '#historical-moments',
      });
    });

    MEDIA_CLIPPINGS.forEach((m) => {
      results.push({
        id: `media-${m.id}`,
        type: 'Article',
        title: m.headline,
        year: m.dateStr,
        category: m.publicationName,
        snippet: m.previewSnippet,
        targetHash: '#media-coverage',
      });
    });

    return results;
  }, []);

  const searchResults = useMemo(() => {
    if (!query.trim()) return searchDataset.slice(0, 5);
    const q = query.toLowerCase();
    return searchDataset.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.snippet.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.year.toString().toLowerCase().includes(q)
    );
  }, [query, searchDataset]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-start justify-center bg-black/90 backdrop-blur-md pt-20 px-4 sm:px-6"
      >
        <div className="max-w-3xl w-full bg-institutional-dark border border-white/20 rounded-sm p-6 sm:p-8 text-white relative shadow-2xl">
          {/* Top Header & Search Input */}
          <div className="flex items-center justify-between border-b border-white/15 pb-4 mb-6">
            <div className="flex items-center gap-3 w-full mr-4">
              <Search className="w-5 h-5 text-institutional-accent shrink-0" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Universal Search across Photos, Awardees, Publications, Events, Years..."
                className="w-full bg-transparent text-sm sm:text-base font-space text-white placeholder-gray-500 focus:outline-none"
              />
            </div>

            <button
              onClick={onClose}
              aria-label="Close search overlay"
              className="w-9 h-9 rounded-full border border-white/20 text-white hover:bg-white hover:text-black flex items-center justify-center transition-colors shrink-0 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Results Summary */}
          <div className="text-[10px] font-space uppercase tracking-widest text-institutional-accent font-semibold mb-4">
            {query.trim()
              ? `Found ${searchResults.length} Archival Results for "${query}"`
              : 'Featured Archival Entries'}
          </div>

          {/* Search Results List */}
          <div className="max-h-[60vh] overflow-y-auto space-y-3 pr-2 scrollbar-none">
            {searchResults.length > 0 ? (
              searchResults.map((res) => (
                <a
                  key={res.id}
                  href={res.targetHash}
                  onClick={onClose}
                  className="p-4 rounded bg-white/5 border border-white/10 hover:border-institutional-accent flex items-center justify-between transition-colors block group"
                >
                  <div className="pr-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[9px] font-space uppercase tracking-widest text-institutional-accent font-semibold">
                        {res.type} • {res.year}
                      </span>
                      <span className="text-[8px] font-space text-gray-400">• {res.category}</span>
                    </div>

                    <h4 className="font-cormorant text-xl font-bold text-white group-hover:text-institutional-accent transition-colors leading-tight mb-1">
                      {res.title}
                    </h4>

                    <p className="font-manrope text-xs text-gray-300 line-clamp-1">
                      {res.snippet}
                    </p>
                  </div>

                  <ArrowRight className="w-4 h-4 text-institutional-accent shrink-0 group-hover:translate-x-1 transition-transform" />
                </a>
              ))
            ) : (
              <div className="p-8 text-center text-gray-400 font-manrope text-xs">
                No matching archival records found for &ldquo;{query}&rdquo;.
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
