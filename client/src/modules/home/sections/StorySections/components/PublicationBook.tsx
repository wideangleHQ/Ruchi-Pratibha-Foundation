'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Eye } from 'lucide-react';

export interface PublicationItem {
  id: string;
  title: string;
  subtitle: string;
  volume: string;
  year: string;
  category: string;
  coverBg: string;
  coverTextColor: string;
  accentColor: string;
  spineColor: string;
  description: string;
  pages: number;
  pdfUrl?: string;
}

interface PublicationBookProps {
  publication: PublicationItem;
  onSelect: (_publication: PublicationItem) => void;
}

export const PublicationBook: React.FC<PublicationBookProps> = ({ publication, onSelect }) => {
  return (
    <div className="group relative flex flex-col items-center cursor-pointer select-none py-3 px-1.5">
      {/* 3D Book Container with Perspective */}
      <div
        className="relative transition-all duration-500 ease-out"
        style={{ perspective: '1200px' }}
        onClick={() => onSelect(publication)}
      >
        <motion.div
          className="relative w-[150px] sm:w-[170px] lg:w-[180px] h-[220px] sm:h-[250px] lg:h-[265px] transform-gpu transition-all duration-500 ease-out"
          whileHover={{
            rotateY: -12,
            rotateX: 3,
            y: -10,
            scale: 1.03,
          }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Ambient Drop Shadow Resting on Shelf */}
          <div className="absolute -bottom-3 left-2 right-2 h-3.5 bg-black/40 blur-md rounded-full group-hover:bg-black/60 group-hover:blur-lg transition-all duration-500" />

          {/* Book Spine (Left 3D Fold) */}
          <div
            className="absolute top-0 bottom-0 left-0 w-[20px] origin-left transform -rotate-y-90 shadow-inner flex flex-col justify-between py-3.5 px-0.5 text-center rounded-l-sm"
            style={{
              backgroundColor: publication.spineColor,
              transform: 'rotateY(-90deg) translateZ(0px)',
            }}
          >
            <span className="font-space text-[6.5px] tracking-widest text-amber-200 uppercase rotate-180 [writing-mode:vertical-rl]">
              {publication.year}
            </span>
            <span className="font-cormorant text-[9px] font-bold text-white tracking-wider truncate [writing-mode:vertical-rl] rotate-180 my-auto">
              {publication.title}
            </span>
            <span className="font-space text-[6.5px] text-amber-300 font-semibold uppercase [writing-mode:vertical-rl] rotate-180">
              {publication.volume}
            </span>
          </div>

          {/* Hardcover Front Cover */}
          <div
            className="absolute inset-0 rounded-r-sm shadow-2xl border-r border-t border-b border-white/20 flex flex-col justify-between p-4 sm:p-4.5 overflow-hidden"
            style={{
              backgroundColor: publication.coverBg,
              color: publication.coverTextColor,
              transform: 'translateZ(10px)',
            }}
          >
            {/* Subtle Spine Crease Highlight */}
            <div className="absolute top-0 bottom-0 left-0 w-2.5 bg-gradient-to-r from-black/40 via-black/10 to-transparent" />

            {/* Gold Foil Accent Border Inside Cover */}
            <div
              className="absolute inset-1.5 border rounded-sm pointer-events-none opacity-40"
              style={{ borderColor: publication.accentColor }}
            />

            {/* Moving Specular Glare Sheen Sweep on Hover */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-700 pointer-events-none" />

            {/* Top Cover Header */}
            <div className="relative z-10 flex items-center justify-between">
              <span
                className="font-space text-[8px] uppercase tracking-widest font-semibold px-2 py-0.5 rounded-sm bg-black/30 backdrop-blur-sm"
                style={{ color: publication.accentColor }}
              >
                {publication.volume}
              </span>
              <span className="font-space text-[8px] text-gray-300 font-medium">
                {publication.year}
              </span>
            </div>

            {/* Center Title & Crest */}
            <div className="relative z-10 my-auto text-center px-1">
              <div
                className="w-7 h-7 rounded-full border flex items-center justify-center mx-auto mb-2 opacity-80"
                style={{ borderColor: publication.accentColor }}
              >
                <BookOpen className="w-3.5 h-3.5" style={{ color: publication.accentColor }} />
              </div>
              <h3 className="font-cormorant text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight mb-0.5">
                {publication.title}
              </h3>
              <p className="font-cormorant text-[11px] italic opacity-85" style={{ color: publication.accentColor }}>
                {publication.subtitle}
              </p>
            </div>

            {/* Bottom Foundation Emblem */}
            <div className="relative z-10 pt-1.5 border-t border-white/15 flex items-center justify-between">
              <span className="font-space text-[7.5px] tracking-wider uppercase text-gray-300">
                Ruchi Prativa
              </span>
              <span
                className="font-space text-[7.5px] uppercase tracking-wider font-semibold group-hover:underline flex items-center gap-1"
                style={{ color: publication.accentColor }}
              >
                <span>Read</span>
                <Eye className="w-2.5 h-2.5" />
              </span>
            </div>
          </div>

          {/* Realistic Page Stack Edge (Right Edge Thickness) */}
          <div
            className="absolute top-1 bottom-1 right-0 w-[18px] rounded-r-xs shadow-inner flex flex-col justify-between py-1"
            style={{
              backgroundColor: '#F7F5EE',
              backgroundImage: 'repeating-linear-gradient(90deg, #E6E2D5, #E6E2D5 1px, #F7F5EE 1px, #F7F5EE 3px)',
              transform: 'rotateY(90deg) translateZ(165px)',
            }}
          />
        </motion.div>
      </div>

      {/* Book Title Label Below Shelf */}
      <div className="mt-3 text-center max-w-[165px]">
        <h4 className="font-cormorant text-base sm:text-lg font-bold text-institutional-dark dark:text-white group-hover:text-institutional-accent transition-colors duration-300 truncate">
          {publication.title}
        </h4>
        <span className="font-space text-[9.5px] text-institutional-mutedLight dark:text-gray-400 block mt-0.5">
          {publication.category} • {publication.pages} P.
        </span>
      </div>
    </div>
  );
};

export default PublicationBook;
