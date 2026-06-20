'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Award, Sparkles, Activity } from 'lucide-react';

const CRAFT_STAGES = [
  {
    stage: '01',
    title: 'Design & Commissioning',
    kicker: 'Loom Blueprinting',
    description: 'Each masterpiece begins with architectural commission blueprints. Master designers translate contemporary layouts into row-by-row color charts (talim) for the looms, mapping every single knot coordinate.',
    sop: 'Designer logs specifications into the registry workspace, generating a unique serialized Ledger ID to track the carpet\'s lifecycle.',
    image: '/images/studio-moodboard-sampling-01.png',
  },
  {
    stage: '02',
    title: 'Master Weaving on Looms',
    kicker: 'The Loom Setup',
    description: 'Weaving starts by tensioning the warp threads on traditional wooden upright looms. Master weavers work in pairs or trios, reading the talim and hand-knotting row by row using organic wool and silk yarn.',
    sop: 'Looms are audited daily for warp tension and knot consistency by floor managers to enforce quality standards.',
    image: '/images/craft-handknotting-01.png',
  },
  {
    stage: '03',
    title: 'High-Density Micro-Knotting',
    kicker: 'Zero Synthetic Compromise',
    description: 'Every square inch contains up to 250 individual knots. Weavers maintain uniform tension across months of work, resulting in maximum density and unparalleled textural durability.',
    sop: 'Weavers inspect yarn lots to ensure absolute dye consistency. No synthetic fibers or shortcuts are permitted on the loom floor.',
    image: '/images/material-yarn-bundles-01.png',
  },
  {
    stage: '04',
    title: 'Invisible Stitch (Tag Embedding)',
    kicker: 'Secure Hardware Integration',
    description: 'During finishing, an anti-tamper NFC/QR tag is embedded directly into the carpet\'s foundation. Weavers cross-stitch a premium velvet corner label over it, making the tag completely invisible yet easily scannable.',
    sop: 'Weaver affixes tag directly to warp base at the inner corner (Step 3.1), secures it with a tight wool cross-stitch cover (Step 3.2), and registers the hardware ID (Step 3.3).',
    image: '/images/editorial-heritage-v1.png',
  },
  {
    stage: '05',
    title: 'Documentation & Ledger Entry',
    kicker: 'The Living Ledger Registry',
    description: 'A digital ledger entry is generated for the piece. The record captures raw weaving hours, knot density, material certifications, and the names/portraits of the weavers who crafted it.',
    sop: 'Quality Control runs the dual-stage scan: Stage 1 records current transit location; Stage 2 maps invoice codes to cryptographically secure the record.',
    image: '/images/rug-texture-v1.png',
  },
  {
    stage: '06',
    title: 'Collector Handoff & Activation',
    kicker: 'Provenance Handover',
    description: 'The collector receives their masterwork and scans the hidden label. Entering their verification key locks the chronological provenance chain, claiming ownership and activating the Living Ledger certificate.',
    sop: 'Sales team verifies invoice completion, unlocking Stage 2 access. The collector\'s scan mints the active registry, linking weaver and collector forever.',
    image: '/images/cutout-rolled-rug-01.png',
  },
];

export default function CraftsmanshipSection() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <div id="craftsmanship" className="relative overflow-hidden bg-ink-950 py-16 sm:py-24 px-4 sm:px-6 lg:px-12 border-t border-bone/5">
      <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full bg-gold-400/[0.02] blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-[1500px]">
        {/* Header */}
        <div className="mb-12 md:mb-16 max-w-3xl">
          <span className="mb-4 flex items-center gap-3 text-[clamp(0.625rem,1.5vw,0.75rem)] uppercase tracking-editorial text-gold-300">
            <span className="h-px w-8 bg-gold-300/50" />
            Manufacturing Process
          </span>
          <h2 className="font-serif text-[clamp(2.2rem,6vw,6.5rem)] font-medium leading-[0.92] tracking-tightest text-bone">
            The Weaving Lifecycle
          </h2>
          <p className="mt-5 text-[clamp(0.875rem,2vw,1.05rem)] font-light leading-[1.7] text-bone/68">
            LM Carpet’s manufacturing blends generations of Bhadohi weaving craft with next-generation traceability. Explore the step-by-step process of crafting and authentication.
          </p>
        </div>

        {/* Interactive Dashboard Container */}
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12 items-start">
          {/* Left: Navigation Stepper */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative border-l border-bone/10 pl-5 sm:pl-7 py-2 space-y-6 sm:space-y-8">
              {/* Active line indicator overlay */}
              <div 
                className="absolute left-0 w-0.5 bg-gold-300 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{
                  top: `${(activeIdx * 100) / CRAFT_STAGES.length + 2}%`,
                  height: `${100 / CRAFT_STAGES.length - 4}%`,
                }}
              />

              {CRAFT_STAGES.map((stage, idx) => {
                const isActive = idx === activeIdx;
                return (
                  <button
                    key={stage.stage}
                    onClick={() => setActiveIdx(idx)}
                    className="group flex flex-col items-start text-left w-full focus:outline-none transition-opacity"
                    style={{ opacity: isActive ? 1 : 0.45 }}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`font-serif text-lg sm:text-xl italic font-light transition-colors ${isActive ? 'text-gold-300' : 'text-bone/50 group-hover:text-bone'}`}>
                        {stage.stage}
                      </span>
                      <h3 className={`font-serif text-lg sm:text-xl md:text-2xl transition-colors ${isActive ? 'text-bone font-medium' : 'text-bone/70 group-hover:text-bone'}`}>
                        {stage.title}
                      </h3>
                    </div>
                    <span className="mt-1 text-[10px] uppercase tracking-widest text-gold-300/60 block pl-8">
                      {stage.kicker}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Stage Detail Panel */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-sm border border-bone/10 bg-ink-900/50 p-6 sm:p-8 md:p-10 backdrop-blur-md shadow-[0_30px_90px_rgba(0,0,0,0.5)] flex flex-col gap-6 sm:gap-8"
              >
                {/* Visual Frame */}
                <div className="relative w-full h-[220px] sm:h-[320px] md:h-[380px] overflow-hidden rounded-sm border border-bone/5 bg-ink-950">
                  <Image
                    src={CRAFT_STAGES[activeIdx].image}
                    alt={CRAFT_STAGES[activeIdx].title}
                    fill
                    sizes="(min-width: 1024px) 55vw, 100vw"
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0706]/60 via-transparent to-transparent" />
                  
                  {/* Decorative badge */}
                  <div className="absolute top-4 right-4 flex items-center gap-2 rounded-full bg-ink-950/70 border border-gold-300/10 px-3.5 py-1.5 backdrop-blur-md">
                    <Activity size={12} className="text-gold-300 animate-pulse" />
                    <span className="text-[10px] uppercase tracking-widest text-gold-300/80">Active Protocol</span>
                  </div>
                </div>

                {/* Text Description */}
                <div>
                  <span className="text-xs uppercase tracking-[0.2em] text-gold-300/85">
                    {CRAFT_STAGES[activeIdx].kicker}
                  </span>
                  <h3 className="mt-2 font-serif text-2xl sm:text-3xl italic text-bone font-medium">
                    {CRAFT_STAGES[activeIdx].title}
                  </h3>
                  <p className="mt-4 text-[14px] sm:text-[15px] leading-[1.8] text-bone/70">
                    {CRAFT_STAGES[activeIdx].description}
                  </p>
                </div>

                {/* SOP Box */}
                <div className="border border-gold-300/20 bg-gold-300/5 p-4 sm:p-5 rounded-sm flex gap-3 sm:gap-4 items-start">
                  <ShieldAlert size={20} className="text-gold-300/90 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h4 className="text-[10px] uppercase tracking-widest text-gold-300 font-semibold">
                      Artisan SOP & Quality Control
                    </h4>
                    <p className="text-xs leading-[1.7] text-bone/66">
                      {CRAFT_STAGES[activeIdx].sop}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Closing Statement */}
        <div className="mt-16 sm:mt-24 border-t border-bone/10 pt-10 sm:pt-14">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <span className="mb-3 flex items-center gap-3 text-[10px] uppercase tracking-editorial text-gold-300/75">
                <Award size={12} className="text-gold-300" />
                Zero Compromise
              </span>
              <h2 className="font-serif text-[clamp(2.2rem,5vw,5.5rem)] font-medium leading-[0.95] tracking-tightest text-bone">
                Patience & Precision
              </h2>
            </div>
            <div className="lg:col-span-7">
              <p className="font-serif text-xl sm:text-2xl md:text-3xl italic leading-relaxed text-bone/80">
                "Our weavers tie up to 250 individual knots per square inch. A single piece requires between 90 to 120 days of focused weaving base work. We preserve pure handloom master craftsmanship."
              </p>
              <p className="mt-4 text-xs uppercase tracking-editorial text-gold-300/60 pl-1">
                — Yadav Family Weavers, Bhadohi Atelier
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
