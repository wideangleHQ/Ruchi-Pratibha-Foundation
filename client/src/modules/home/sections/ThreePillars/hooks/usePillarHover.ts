'use client';

import { useState } from 'react';

export function usePillarHover() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const handleMouseEnter = (id: string) => setHoveredId(id);
  const handleMouseLeave = () => setHoveredId(null);

  return {
    hoveredId,
    handleMouseEnter,
    handleMouseLeave,
  };
}
