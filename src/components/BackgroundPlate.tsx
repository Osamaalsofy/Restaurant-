/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export default function BackgroundPlate() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll position of the entire window
  const { scrollYProgress } = useScroll();

  // Map scroll progress to scale, rotation, and custom opacity filters
  // Starts compact at 0.7x, zooms in to 1.8x at deep scroll.
  const scale = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [0.8, 1.25, 1.8, 2.3]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const yTranslate = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, -40, -100, -180]);
  
  // Opacity adjustments to let text shine on dense segments
  const plateOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.7, 0.9, 1],
    [0.75, 0.85, 0.45, 0.35, 0.45, 0.65]
  );

  // Subtle blur effect as it gets larger/closer
  const blurFilter = useTransform(
    scrollYProgress,
    [0, 0.4, 0.6, 0.8, 1],
    ['blur(0px)', 'blur(1px)', 'blur(3px)', 'blur(4px)', 'blur(0px)']
  );

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 flex items-center justify-center overflow-hidden"
    >
      {/* Organic background light spot blurs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-brand organic-blur-spot" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-accent-warm organic-blur-spot" />

      {/* Floating 3D Plate Wrapper */}
      <motion.div
        style={{
          scale,
          rotate,
          y: yTranslate,
          opacity: plateOpacity,
          filter: blurFilter,
        }}
        className="relative w-[340px] h-[340px] sm:w-[480px] sm:h-[480px] md:w-[580px] md:h-[580px] lg:w-[680px] lg:h-[680px] flex items-center justify-center transition-all duration-100 ease-out"
      >
        {/* Real 3D Ground/Depth Shadow */}
        <div className="absolute bottom-[-40px] left-[10%] right-[10%] h-[40px] rounded-full bg-brand-active/20 blur-[45px] transform scale-95" />
        <div className="absolute bottom-[-20px] left-[15%] right-[15%] h-[20px] rounded-full bg-neutral-900/15 blur-[20px] transform scale-90" />

        {/* Hand Glazed Outer Clay/Ceramic Rim Plate Frame */}
        <div className="absolute inset-0 rounded-full border-[18px] sm:border-[28px] border-[#1C221F] shadow-[inset_0_8px_32px_rgba(0,0,0,0.6),0_24px_72px_rgba(0,0,0,0.8)] bg-gradient-to-tr from-[#0B0F0C] to-[#1E2622] flex items-center justify-center overflow-hidden">
          {/* Inner Plate Ceramic Shadow Rim */}
          <div className="absolute inset-[4px] rounded-full border-[4px] border-[#F3C395]/10 shadow-[inner_0_2px_12px_rgba(0,0,0,0.4)] pointer-events-none z-10" />

          {/* Master Gourmet Botanical Artwork (The Plate Dish) */}
          <div className="w-full h-full rounded-full overflow-hidden relative">
            <img
              src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=82&w=1200"
              alt="Plantify Signature Harvest Plate"
              className="w-full h-full object-cover scale-[1.05] filter brightness-95 contrast-[1.05] saturate-[1.02]"
              referrerPolicy="no-referrer"
            />
            {/* Soft Overlay representing glass reflection */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-brand-active/10" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
