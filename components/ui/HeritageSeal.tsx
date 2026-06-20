'use client';

import { motion } from 'framer-motion';

export default function HeritageSeal() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, rotate: -8 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 1.4, delay: 2.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative h-[118px] w-[118px] select-none md:h-[142px] md:w-[142px]"
    >
      <div className="seal-ring absolute inset-0 animate-[spin_28s_linear_infinite]" />
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-0 animate-[spin_42s_linear_infinite] text-bone/65"
      >
        <defs>
          <path
            id="seal-circle"
            d="M 100, 100 m -78, 0 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0"
          />
        </defs>
        <text
          fill="currentColor"
          className="font-serif"
          style={{
            fontSize: 10.5,
            letterSpacing: '5.4px',
            textTransform: 'uppercase',
          }}
        >
          <textPath href="#seal-circle">
            HANDWOVEN WITH HERITAGE - Wovenwarp - LEGACY CRAFT -
          </textPath>
        </text>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[8px] uppercase tracking-editorial text-bone/55">
          Handwoven
        </span>
        <span className="mt-1 font-serif text-base italic leading-none text-bone/90 md:text-lg">
          Heritage
        </span>
        <span className="mt-1 h-px w-6 bg-bone/30" />
        <span className="mt-1 text-[8px] uppercase tracking-editorial text-bone/55">
          Wovenwarp
        </span>
      </div>
    </motion.div>
  );
}
