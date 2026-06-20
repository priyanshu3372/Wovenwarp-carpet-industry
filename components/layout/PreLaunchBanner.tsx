'use client';

import React from 'react';
import { useWaitlist } from '@/components/providers/WaitlistProvider';
import { Sparkles } from 'lucide-react';

export default function PreLaunchBanner() {
  const { openWaitlist } = useWaitlist();

  return (
    <div className="relative z-[60] w-full border-b border-gold-300/15 bg-[#0d0a08] px-3 py-2 text-center sm:px-4 sm:py-2.5">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-3 sm:justify-center sm:gap-4">
        <div className="flex min-w-0 items-center gap-2 text-[0.62rem] uppercase tracking-[0.14em] text-gold-300 sm:text-[clamp(0.65rem,1.8vw,0.725rem)] sm:tracking-[0.2em]">
          <Sparkles size={11} className="text-gold-300 animate-pulse shrink-0" />
          <span className="truncate">Ledger Launch: Dec 25, 2026</span>
        </div>
        <span className="hidden sm:inline text-gold-300/30">|</span>
        <p className="hidden text-[clamp(0.65rem,1.8vw,0.725rem)] font-light tracking-wide text-bone/80 md:block">
          The Global Living Ledger is open for historic and current registration. Access is restricted to the Private Waitlist.
        </p>
        <button
          onClick={openWaitlist}
          className="inline-flex min-h-[36px] shrink-0 items-center justify-center gap-1.5 border-b border-gold-300/60 px-2 pb-0.5 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-gold-300 transition-colors hover:border-gold-300 hover:text-gold-200 sm:min-h-[40px] sm:px-3 sm:text-[clamp(0.65rem,1.8vw,0.725rem)] sm:tracking-[0.2em]"
        >
          <span className="sm:hidden">Request</span>
          <span className="hidden sm:inline">Request Waitlist Access</span>
        </button>
      </div>
    </div>
  );
}
