'use client';

import { Variants } from 'framer-motion';
import { useEffect, useState } from 'react';

export function useHeroAnimation() {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReduced ? 0 : 0.18,
        delayChildren: prefersReduced ? 0 : 0.15,
      },
    },
  };

  const itemVariants: Variants = {
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

  return { containerVariants, itemVariants, prefersReduced };
}
