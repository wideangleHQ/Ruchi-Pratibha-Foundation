'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ALL_CSR_IMAGES, shuffleCSRImages } from '@/constants/csrImages';

export const HeroBackground: React.FC = () => {
  const [slides, setSlides] = useState<string[]>(ALL_CSR_IMAGES);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [loadedIndices, setLoadedIndices] = useState<number[]>([0]);

  // Shuffle images on client mount so every home page visit gets a unique shuffled sequence
  useEffect(() => {
    const shuffled = shuffleCSRImages(ALL_CSR_IMAGES);
    setSlides(shuffled);
  }, []);

  // Preload second slide progressively after first slide mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadedIndices((prev) => (prev.includes(1) ? prev : [...prev, 1]));
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % slides.length);
    }, 6000); // 6 seconds per slide
    return () => clearInterval(interval);
  }, [slides.length]);

  useEffect(() => {
    if (slides.length === 0) return;
    const nextIdx = (currentIdx + 1) % slides.length;
    if (!loadedIndices.includes(nextIdx)) {
      setLoadedIndices((prev) => [...prev, nextIdx]);
    }
  }, [currentIdx, loadedIndices, slides.length]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-institutional-darker">
      {slides.map((src, idx) => {
        const isLoaded = loadedIndices.includes(idx);
        if (!isLoaded) return null;
        return (
          <div
            key={`${src}-${idx}`}
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

