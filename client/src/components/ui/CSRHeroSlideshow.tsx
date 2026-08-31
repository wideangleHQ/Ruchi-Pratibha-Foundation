'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ALL_CSR_IMAGES, shuffleCSRImages } from '@/constants/csrImages';

export { ALL_CSR_IMAGES as CSR_HERO_SLIDES };

interface CSRHeroSlideshowProps {
  opacity?: number;
  intervalMs?: number;
  darkOverlay?: boolean;
  className?: string;
}

export const CSRHeroSlideshow: React.FC<CSRHeroSlideshowProps> = ({
  opacity = 0.4,
  intervalMs = 5000,
  darkOverlay = true,
  className = '',
}) => {
  const [slides, setSlides] = useState<string[]>(ALL_CSR_IMAGES);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [loadedIndices, setLoadedIndices] = useState<number[]>([0]);

  // Shuffle images on client mount so every page visit gets a fresh shuffled slideshow
  useEffect(() => {
    const shuffled = shuffleCSRImages(ALL_CSR_IMAGES);
    setSlides(shuffled);
  }, []);

  // Preload second slide progressively after first slide mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadedIndices((prev) => (prev.includes(1) ? prev : [...prev, 1]));
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % slides.length);
    }, intervalMs);
    return () => clearInterval(interval);
  }, [intervalMs, slides.length]);

  useEffect(() => {
    if (slides.length === 0) return;
    const nextIdx = (currentIdx + 1) % slides.length;
    if (!loadedIndices.includes(nextIdx)) {
      setLoadedIndices((prev) => [...prev, nextIdx]);
    }
  }, [currentIdx, loadedIndices, slides.length]);

  return (
    <div className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0 ${className}`}>
      {slides.map((src, idx) => {
        const isLoaded = loadedIndices.includes(idx);
        if (!isLoaded) return null;
        return (
          <div
            key={`${src}-${idx}`}
            className="absolute inset-0 w-full h-full transition-opacity ease-in-out duration-1000"
            style={{
              opacity: currentIdx === idx ? opacity : 0,
              zIndex: currentIdx === idx ? 1 : 0,
            }}
          >
            <Image
              src={src}
              alt="Ruchi Prativa Foundation CSR Activity Slide"
              fill
              sizes="100vw"
              className="object-cover object-center"
              priority={idx === 0}
              loading={idx === 0 ? 'eager' : 'lazy'}
            />
          </div>
        );
      })}

      {/* Subtle Geometric Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none z-10"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(197, 160, 89, 0.3) 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Cinematic Gradient Overlays */}
      {darkOverlay && (
        <>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-[#0B0F17]/60 to-black/40 pointer-events-none z-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-[#0B0F17]/80 pointer-events-none z-10" />
        </>
      )}
    </div>
  );
};

export default CSRHeroSlideshow;

