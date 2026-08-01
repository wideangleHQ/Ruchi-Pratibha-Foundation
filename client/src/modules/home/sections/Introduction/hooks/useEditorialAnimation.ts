'use client';

import { Variants } from 'framer-motion';
import { useEffect, useState } from 'react';

export function useEditorialAnimation() {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const fadeInVariants: Variants = {
    hidden: prefersReduced ? { opacity: 0 } : { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReduced ? 0.01 : 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const imageVariants: Variants = {
    hidden: prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: 16 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: prefersReduced ? 0.01 : 0.9,
        ease: [0.22, 1, 0.36, 1],
        delay: prefersReduced ? 0 : 0.15,
      },
    },
  };

  return { fadeInVariants, imageVariants, prefersReduced };
}
