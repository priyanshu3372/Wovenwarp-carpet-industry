'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Compass, ArrowRight } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="relative flex min-h-[80vh] flex-col items-center justify-center bg-ink-950 px-4 py-24 text-center sm:px-6 lg:px-12">
        {/* Noise overlay */}
        <div className="absolute inset-0 bg-noise opacity-[0.025] pointer-events-none" />
        
        <div className="relative mx-auto max-w-2xl z-10 flex flex-col items-center">
          {/* Branded Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-gold-300/25 bg-ink-900/60"
          >
            <Compass className="h-8 w-8 text-gold-300/80 animate-spin-slow" style={{ animationDuration: '20s' }} />
          </motion.div>

          {/* Subheading / Category tag */}
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-4 inline-flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-gold-300/75"
          >
            <span className="h-px w-8 bg-gold-300/40" />
            Error 404
            <span className="h-px w-8 bg-gold-300/40" />
          </motion.span>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="font-serif text-[clamp(2.5rem,6vw,5.5rem)] font-medium leading-[1.05] tracking-tightest text-bone mb-6"
          >
            Lost in <br className="sm:hidden" /><span className="italic font-light">the Tapestry</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mx-auto max-w-md text-sm sm:text-base font-light leading-[1.75] text-bone/65 mb-10"
          >
            The path you are seeking has drifted outside our provenance registry. Let us guide you back to the home of artisan legacy.
          </motion.p>

          {/* Action Button */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <Link
              href="/"
              className="group inline-flex min-h-[44px] items-center gap-3 rounded-full border border-gold-300/35 bg-gold-300/10 px-6 py-3.5 text-xs uppercase tracking-[0.2em] text-bone transition-all duration-300 hover:border-gold-300/75 hover:bg-gold-300/20"
            >
              Return to Atelier
              <ArrowRight className="h-4.5 w-4.5 text-gold-300 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
