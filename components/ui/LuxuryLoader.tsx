'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';

export default function LuxuryLoader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setDone(true), 2400);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-950"
        >
          {/* layered curtain bars exiting */}
          <div className="absolute inset-0 flex">
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ scaleY: 1 }}
                animate={{ scaleY: 1 }}
                exit={{ scaleY: 0 }}
                transition={{
                  delay: 0.1 + i * 0.08,
                  duration: 1.05,
                  ease: [0.76, 0, 0.24, 1],
                }}
                className="loader-bar flex-1 bg-ink-900"
              />
            ))}
          </div>

          <div className="relative z-10 flex flex-col items-center gap-7">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, filter: 'blur(12px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-[260px] w-[390px] md:h-[320px] md:w-[480px] select-none"
            >
              <Image
                src="/images/logo.png"
                alt="Wovenwarp — Woven Into Legacy"
                fill
                priority
                sizes="(min-width: 768px) 480px, 390px"
                className="object-contain"
              />
              {/* warm ember glow behind the mark */}
              <div
                aria-hidden
                className="absolute inset-0 -z-10 blur-3xl opacity-50"
                style={{
                  background:
                    'radial-gradient(closest-side, rgba(184,80,28,0.32), rgba(10,7,6,0) 70%)',
                }}
              />
            </motion.div>
            <div className="relative h-[1px] w-48 overflow-hidden bg-bone/10">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 1.8, delay: 0.4, ease: 'easeInOut' }}
                className="absolute inset-y-0 w-full bg-gradient-to-r from-transparent via-gold-400 to-transparent"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
