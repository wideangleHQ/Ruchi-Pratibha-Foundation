'use client';

import React from 'react';

interface InteractiveImageProps {
  children: React.ReactNode;
  className?: string;
  glareEffect?: boolean;
}

export const InteractiveImage: React.FC<InteractiveImageProps> = ({
  children,
  className = '',
  glareEffect = true,
}) => {
  return (
    <div
      className={`group relative overflow-hidden transform-gpu will-change-transform rounded-sm ${className}`}
    >
      {/* Glare Sheen Sweep Effect */}
      {glareEffect && (
        <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-1000 ease-out" />
        </div>
      )}

      {/* Lighting Reflection Vignette Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none" />

      {/* Image Content */}
      <div className="relative w-full h-full transition-transform duration-700 ease-out group-hover:scale-105">
        {children}
      </div>
    </div>
  );
};

export default InteractiveImage;
