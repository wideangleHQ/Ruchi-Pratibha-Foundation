'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Quote, ArrowRight } from 'lucide-react';

export const ChairmanMessage: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position values for 3D tilt and parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for natural 3D tilt motion
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const xPct = (e.clientX - rect.left) / width - 0.5;
    const yPct = (e.clientY - rect.top) / height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      id="chairmans-message"
      className="relative py-16 sm:py-20 lg:py-0 lg:h-screen lg:min-h-[720px] lg:max-h-[920px] flex items-center bg-institutional-cream dark:bg-institutional-surface/20 text-institutional-dark dark:text-institutional-light border-b border-institutional-dark/10 dark:border-white/10 overflow-hidden scroll-mt-24 sm:scroll-mt-28"
    >
      <div className="max-w-[1500px] w-full mx-auto px-6 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
          {/* Left: Founder Portrait with Interactive 3D Parallax & Subtle Hover Zoom */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex justify-center"
          >
            <motion.div
              animate={isHovered ? { y: 0 } : { y: [0, -6, 0] }}
              transition={{ repeat: isHovered ? 0 : Infinity, duration: 4.5, ease: 'easeInOut' }}
              className="w-full max-w-[290px] sm:max-w-md perspective-1000"
            >
              <motion.div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{
                  rotateX: isHovered ? rotateX : 0,
                  rotateY: isHovered ? rotateY : 0,
                  transformStyle: 'preserve-3d',
                }}
                className="group relative w-full aspect-[4/5] rounded-md bg-white dark:bg-institutional-surface/60 border border-institutional-dark/15 dark:border-white/15 hover:border-institutional-accent/50 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform-gpu"
              >
                {/* High Quality Founder Image */}
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src="/founder_portrait.png"
                    alt="Shri Sarat Kumar Sahoo - Founder & Managing Trustee"
                    width={600}
                    height={750}
                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                    priority
                  />
                  {/* Subtle Dark Vignette & Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-80" />

                  {/* Subtle Light Reflection Sheen on Hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-tr from-transparent via-white/10 to-transparent" />
                </div>

                {/* Top Badge Overlay */}
                <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between pointer-events-none">
                  <span className="px-2.5 py-1 text-[9px] uppercase tracking-widest font-space font-semibold text-white bg-black/50 backdrop-blur-md rounded-sm border border-white/15">
                    Founder&apos;s Perspective
                  </span>
                  <span className="text-[10px] font-space text-white/80 tracking-widest uppercase">
                    Est. 1997
                  </span>
                </div>

                {/* Bottom Founder Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 z-10 p-5 sm:p-6 text-white flex flex-col justify-end transform-gpu">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-institutional-accent/90 text-institutional-dark flex items-center justify-center flex-shrink-0 shadow-sm">
                      <Quote className="w-4 h-4 stroke-[2]" />
                    </div>
                    <div>
                      <h4 className="font-cormorant text-xl sm:text-2xl font-semibold tracking-tight text-white leading-tight">
                        Shri Sarat Kumar Sahoo
                      </h4>
                      <p className="font-space text-[10px] sm:text-xs text-institutional-accent font-medium tracking-wider uppercase">
                        Founder &amp; Managing Trustee
                      </p>
                    </div>
                  </div>
                  <div className="pt-2 mt-1 border-t border-white/15 flex items-center justify-between text-[9px] sm:text-[10px] font-space text-gray-300">
                    <span>Ruchi Prativa Foundation</span>
                    <span>Institutional Vision</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right: Personal Message Copy with Refined Mobile Centering & Typography */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 flex flex-col justify-center items-center lg:items-start text-center lg:text-left max-w-2xl mx-auto lg:mx-0"
          >
            {/* Kicker Badge */}
            <div className="inline-flex items-center gap-3 mb-3 sm:mb-4 justify-center lg:justify-start">
              <span className="h-[1px] w-8 bg-institutional-accent" />
              <span className="text-xs uppercase tracking-[0.2em] font-space text-institutional-accent font-semibold">
                Message From Our Founder
              </span>
              <span className="h-[1px] w-8 bg-institutional-accent lg:hidden" />
            </div>

            {/* Refined Section Title - Bold Weight & Scale Matching Homepage Section Hierarchy */}
            <h2 className="font-cormorant text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-institutional-dark dark:text-white tracking-tight mb-4 sm:mb-5 lg:mb-6 leading-[1.15]">
              A Vision That Continues To Inspire
            </h2>

            {/* Quote Paragraphs */}
            <div className="space-y-3 sm:space-y-4 font-manrope text-sm sm:text-base lg:text-lg text-institutional-mutedLight dark:text-gray-300 leading-relaxed mb-6 lg:mb-8">
              <p className="font-cormorant italic text-lg sm:text-xl text-institutional-accent">
                &ldquo;The true strength of any society lies in its people. When we recognise talent, encourage young minds, preserve our cultural values, and serve those in need, we build a stronger future for generations to come.&rdquo;
              </p>
              <p>
                The Foundation was established with the belief that social progress is achieved through compassion, education, cultural pride, and recognition of excellence. Every initiative undertaken by the Foundation reflects this enduring vision.
              </p>
            </div>

            {/* Action CTA */}
            <div>
              <a
                href="#message-full"
                className="group inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 text-xs uppercase tracking-widest font-space font-semibold text-black dark:text-white border border-black/30 dark:border-white/30 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-institutional-accent"
              >
                <span>Read Full Message</span>
                <ArrowRight className="w-4 h-4 text-institutional-accent group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
