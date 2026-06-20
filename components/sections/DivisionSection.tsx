'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function DivisionSection() {
  return (
    <section className="relative overflow-hidden bg-[#f3ece3] py-16 sm:py-24 px-4 sm:px-6 lg:px-12 border-t border-[#3d2f26]/5 text-[#3d2f26]">
      {/* Decorative background noise */}
      <div className="absolute inset-0 bg-noise opacity-[0.015] pointer-events-none" />

      <div className="relative mx-auto max-w-[1200px] grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        {/* Thin vertical separator line in the center for desktop */}
        <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-px bg-[#3d2f26]/10 -translate-x-1/2" />

        {/* Left Side: Division Text */}
        <div className="flex flex-col items-center text-center py-6">
          <h2 className="font-serif text-[clamp(2.2rem,5vw,4.5rem)] font-light tracking-[0.34em] text-[#3d2f26] uppercase leading-none">
            Division
          </h2>
          
          {/* Subtle line with a diamond in the center */}
          <div className="my-6 flex items-center justify-center gap-4 w-44">
            <span className="h-px bg-[#3d2f26]/20 flex-1" />
            <span className="w-1.5 h-1.5 rotate-45 bg-[#ab5022]" />
            <span className="h-px bg-[#3d2f26]/20 flex-1" />
          </div>
          
          <p className="text-[10px] tracking-[0.38em] text-[#3d2f26]/60 uppercase font-sans">
            Root Division
          </p>
        </div>

        {/* Right Side: Emblem Card & Button */}
        <div className="flex flex-col items-center w-full">
          {/* Square Card */}
          <div className="w-full max-w-[380px] aspect-square bg-[#fcfaf7] shadow-[0_15px_45px_rgba(61,47,38,0.06)] rounded-sm border border-[#3d2f26]/5 p-8 flex flex-col items-center justify-between">
            <div className="relative w-full aspect-square max-w-[240px] flex items-center justify-center">
              <Image
                src="/images/lm-carpets-logo.png"
                alt="L.M. Carpets Logo"
                fill
                sizes="(max-width: 768px) 240px, 240px"
                className="object-contain"
                priority
              />
            </div>

            {/* Bottom division subtitle in card */}
            <div className="flex items-center justify-center gap-3 text-[9px] tracking-[0.25em] text-[#3d2f26]/50 uppercase font-sans w-full mt-4">
              <span className="h-px bg-[#3d2f26]/10 w-6" />
              <span className="w-1 h-1 rotate-45 bg-[#ab5022]/50" />
              <span>Root Division</span>
              <span className="w-1 h-1 rotate-45 bg-[#ab5022]/50" />
              <span className="h-px bg-[#3d2f26]/10 w-6" />
            </div>
          </div>

          {/* Button CTA */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-center w-full max-w-[380px] sm:max-w-none">
            <Link
              href="/lmcarpets"
              className="group inline-flex w-full sm:w-auto min-h-[44px] items-center justify-center gap-4 bg-[#ab5022] hover:bg-[#90411a] text-[#fcfaf7] px-8 py-3 text-xs font-semibold uppercase tracking-[0.22em] transition-all duration-300 shadow-[0_10px_25px_rgba(171,80,34,0.18)]"
            >
              Explore Heritage Archive
              <span className="transform group-hover:translate-x-1.5 transition-transform duration-300 font-sans">→</span>
            </Link>
            <a
              href="https://www.lmcarpets.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex w-full sm:w-auto min-h-[44px] items-center justify-center gap-4 border border-[#3d2f26]/25 hover:border-[#3d2f26]/60 text-[#3d2f26] px-8 py-3 text-xs font-semibold uppercase tracking-[0.22em] transition-all duration-300 hover:bg-[#3d2f26]/5"
            >
              Visit LM Carpets
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
