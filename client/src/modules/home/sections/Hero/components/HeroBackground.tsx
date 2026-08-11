'use client';
 
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
 
const HERO_SLIDES = [
  '/Odia Bazar/DSC05968.JPG',
  '/Odia Bazar/DSC05990.JPG',
  '/Odia Bazar/DSC06000.JPG',
  '/Sutahat/DSC05409.JPG',
  '/Sutahat/DSC05413.JPG',
  '/Sutahat/DSC05416.JPG',
];
 
export const HeroBackground: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [loadedIndices, setLoadedIndices] = useState<number[]>([0, 1]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000); // 6 seconds per slide
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const nextIdx = (currentIdx + 1) % HERO_SLIDES.length;
    if (!loadedIndices.includes(nextIdx)) {
      setLoadedIndices((prev) => [...prev, nextIdx]);
    }
  }, [currentIdx, loadedIndices]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-institutional-darker">
      {HERO_SLIDES.map((src, idx) => {
        const isLoaded = loadedIndices.includes(idx);
        if (!isLoaded) return null;
        return (
          <div
            key={src}
            className="absolute inset-0 w-full h-full transition-opacity ease-in-out"
            style={{
              opacity: currentIdx === idx ? 1 : 0,
              zIndex: currentIdx === idx ? 1 : 0,
              pointerEvents: currentIdx === idx ? 'auto' : 'none',
              transitionDuration: '800ms',
            }}
          >
            <Image
              src={src}
              alt="Ruchi Prativa Foundation CSR Event Slide"
              fill
              className="object-cover object-center"
              priority={idx === 0 || idx === 1} // Preload slide 0 and 1
              sizes="100vw"
              quality={85}
            />
          </div>
        );
      })}
 
      {/* Subtle geometric structural pattern overlay */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none z-10"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(197, 160, 89, 0.25) 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}
      />
 
      {/* Cinematic Gradient Overlays (dark overlay for contrast) */}
      <div className="absolute inset-0 bg-gradient-to-t from-institutional-darker via-institutional-darker/60 to-institutional-darker/30 pointer-events-none z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-institutional-darker pointer-events-none z-10" />
    </div>
  );
};
