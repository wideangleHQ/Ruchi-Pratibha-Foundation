'use client';
 
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
 
const HERO_SLIDES = [
  '/CSR Activites/Covid Precaution Shooting/DSC_1154.JPG',
  '/CSR Activites/Covid Precaution Shooting/DSC_1187.JPG',
  '/CSR Activites/Jajpur salute to corona warrior/DSC_0874.JPG',
  '/CSR Activites/Jajpur salute to corona warrior/DSC_0889.JPG',
  '/CSR Activites/Salute to corona warrioir Dhenkanal/DSC_3162.JPG',
  '/CSR Activites/Salute to corona warrioir Dhenkanal/DSC_3201.JPG',
];
 
export const HeroBackground: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [loadedIndices, setLoadedIndices] = useState<number[]>([0]);

  // Preload second slide progressively after first slide mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadedIndices((prev) => (prev.includes(1) ? prev : [...prev, 1]));
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

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
              priority={idx === 0}
              loading={idx === 0 ? 'eager' : 'lazy'}
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
