'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface InteractiveCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  glowAccent?: boolean;
  disableShadow?: boolean;
  spotlightColorLight?: string;
  spotlightColorDark?: string;
}

export const InteractiveCard: React.FC<InteractiveCardProps> = ({
  children,
  className = '',
  glowAccent = true,
  disableShadow = false,
  spotlightColorLight = 'rgba(197, 160, 89, 0.14)',
  spotlightColorDark = 'rgba(197, 160, 89, 0.22)',
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
      setIsTouchDevice(true);
    }
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    // Subtle 3D tilt calculation (max +/- 2.5 degrees)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = Number((((y - centerY) / centerY) * -2.5).toFixed(2));
    const rotateY = Number((((x - centerX) / centerX) * 2.5).toFixed(2));
    setTilt({ rotateX, rotateY });
  }, [isTouchDevice]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0 });
  }, []);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: isHovered && !isTouchDevice ? tilt.rotateX : 0,
        rotateY: isHovered && !isTouchDevice ? tilt.rotateY : 0,
        y: isHovered ? -5 : 0,
        scale: isHovered ? 1.006 : 1.0,
      }}
      whileTap={{ scale: 1.0 }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative overflow-hidden transform-gpu will-change-transform rounded-sm bg-white hover:bg-[#FFFDF9] dark:bg-institutional-surface/40 dark:hover:bg-institutional-surface/60 border border-institutional-dark/15 dark:border-white/10 transition-all duration-300 ease-out ${
        disableShadow
          ? 'shadow-none hover:shadow-none'
          : 'shadow-[0_4px_16px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.3)] hover:shadow-[0_16px_36px_rgba(11,15,23,0.10),0_0_24px_rgba(197,160,89,0.16)] dark:hover:shadow-[0_16px_36px_rgba(0,0,0,0.5),0_0_24px_rgba(197,160,89,0.22)]'
      } hover:border-institutional-dark/80 dark:hover:border-institutional-accent/80 ${className}`}
      {...props}
    >
      {/* Top subtle gold accent line */}
      {glowAccent && (
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-institutional-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-sm z-20 pointer-events-none" />
      )}

      {/* React Bits Inspired Spotlight Specular Lighting */}
      {!isTouchDevice && (
        <>
          <div
            className={`pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300 z-0 dark:hidden ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, ${spotlightColorLight}, transparent 80%)`,
            }}
          />
          <div
            className={`pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300 z-0 hidden dark:block ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, ${spotlightColorDark}, transparent 80%)`,
            }}
          />
        </>
      )}

      {/* React Bits Dynamic Illuminated Border Mask Layer */}
      {!isTouchDevice && (
        <div
          className={`pointer-events-none absolute inset-0 rounded-[inherit] border-2 border-institutional-dark dark:border-institutional-accent transition-opacity duration-300 z-10 ${
            isHovered ? 'opacity-70' : 'opacity-0'
          }`}
          style={{
            maskImage: `radial-gradient(220px circle at ${mousePos.x}px ${mousePos.y}px, black, transparent)`,
            WebkitMaskImage: `radial-gradient(220px circle at ${mousePos.x}px ${mousePos.y}px, black, transparent)`,
          }}
        />
      )}

      {/* Card Content Layer */}
      <div className="relative z-10 flex flex-col justify-between h-full">{children}</div>
    </motion.div>
  );
};

export default InteractiveCard;
