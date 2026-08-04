'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { DISTRICT_MEMORIES } from '../data/archiveData';
import { InteractiveCard } from '@/components/ui/InteractiveCard';

export const OdishaMemoryMap: React.FC = () => {
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>('cuttack');

  const selectedDist =
    DISTRICT_MEMORIES.find((d) => d.districtId === selectedDistrictId) ||
    DISTRICT_MEMORIES[0];

  return (
    <section
      id="odisha-memory-map"
      className="py-24 sm:py-36 bg-institutional-dark text-white border-b border-white/10 overflow-hidden relative scroll-mt-24"
    >
      <div className="max-w-[1500px] w-full mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="h-[1px] w-8 bg-institutional-accent" />
            <span className="text-xs uppercase tracking-[0.25em] font-space text-institutional-accent font-semibold">
              Section 09 • Interactive Geographic Memory
            </span>
            <span className="h-[1px] w-8 bg-institutional-accent" />
          </div>
          <h2 className="font-cormorant text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
            Odisha Memory Map
          </h2>
          <p className="font-manrope text-sm sm:text-base text-gray-300 mt-3 leading-relaxed">
            Click any district to explore localized activities, photo records, health camps, and community initiatives across Odisha.
          </p>
        </div>

        {/* Interactive Map & District Memory Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Interactive District Node Selector Grid */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <span className="font-space text-xs uppercase tracking-widest text-institutional-accent font-semibold mb-2">
              SELECT ODISHA DISTRICT NODE:
            </span>
            {DISTRICT_MEMORIES.map((dist) => {
              const active = dist.districtId === selectedDistrictId;
              return (
                <button
                  key={dist.districtId}
                  onClick={() => setSelectedDistrictId(dist.districtId)}
                  className={`w-full p-4 rounded-sm flex items-center justify-between text-left transition-all duration-300 cursor-pointer ${
                    active
                      ? 'bg-institutional-accent text-institutional-dark font-bold border-l-4 border-white shadow-lg'
                      : 'bg-white/5 border border-white/10 text-white hover:border-institutional-accent/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <MapPin className={`w-4 h-4 ${active ? 'text-institutional-dark' : 'text-institutional-accent'}`} />
                    <span className="font-cormorant text-xl font-bold">{dist.districtName}</span>
                  </div>
                  <span className="font-space text-xs uppercase tracking-wider opacity-80">
                    {dist.activitiesCount} Initiatives
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Column: Dynamic District Memory Exhibition Card */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedDist.districtId}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                <InteractiveCard className="bg-white/5 border border-white/15 rounded-sm p-6 sm:p-10 shadow-2xl">
                  {/* District Header */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-6">
                    <div>
                      <span className="font-space text-xs uppercase tracking-widest text-institutional-accent font-semibold block mb-1">
                        ODISHA DISTRICT MEMORY NODE
                      </span>
                      <h3 className="font-cormorant text-3xl sm:text-5xl font-bold text-white">
                        {selectedDist.districtName} District
                      </h3>
                    </div>
                    <span className="px-3.5 py-1.5 rounded text-xs font-space font-semibold uppercase tracking-wider text-institutional-accent bg-institutional-accent/15 border border-institutional-accent/30">
                      Active Vault Node
                    </span>
                  </div>

                  <p className="font-manrope text-base sm:text-lg text-gray-200 leading-relaxed mb-6 font-semibold">
                    {selectedDist.highlightStory}
                  </p>

                  {/* 4 Stat Badges */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                    <div className="p-3.5 rounded bg-white/5 border border-white/10 text-center">
                      <span className="font-space text-2xl font-bold text-institutional-accent block">
                        {selectedDist.activitiesCount}
                      </span>
                      <span className="font-space text-[9px] uppercase tracking-widest text-gray-400">
                        Initiatives
                      </span>
                    </div>

                    <div className="p-3.5 rounded bg-white/5 border border-white/10 text-center">
                      <span className="font-space text-2xl font-bold text-institutional-accent block">
                        {selectedDist.photosCount}
                      </span>
                      <span className="font-space text-[9px] uppercase tracking-widest text-gray-400">
                        Archival Photos
                      </span>
                    </div>

                    <div className="p-3.5 rounded bg-white/5 border border-white/10 text-center">
                      <span className="font-space text-2xl font-bold text-institutional-accent block">
                        {selectedDist.eventsCount}
                      </span>
                      <span className="font-space text-[9px] uppercase tracking-widest text-gray-400">
                        Conclaves
                      </span>
                    </div>

                    <div className="p-3.5 rounded bg-white/5 border border-white/10 text-center">
                      <span className="font-space text-2xl font-bold text-institutional-accent block">
                        {selectedDist.videosCount}
                      </span>
                      <span className="font-space text-[9px] uppercase tracking-widest text-gray-400">
                        Video Films
                      </span>
                    </div>
                  </div>

                  {/* Initiatives List */}
                  <div className="space-y-2 border-t border-white/10 pt-6">
                    <span className="text-[10px] font-space uppercase tracking-widest text-institutional-accent font-semibold block mb-2">
                      KEY INITIATIVES IN {selectedDist.districtName.toUpperCase()}:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {selectedDist.initiatives.map((init) => (
                        <span
                          key={init}
                          className="px-3 py-1 text-xs font-space rounded bg-white/5 border border-white/10 text-gray-300"
                        >
                          • {init}
                        </span>
                      ))}
                    </div>
                  </div>
                </InteractiveCard>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
