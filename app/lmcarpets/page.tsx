'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Award, BookOpen, Calendar, Compass, History, Sparkles } from 'lucide-react';
import { useWaitlist } from '@/components/providers/WaitlistProvider';

const HISTORIC_COMMISSIONS = [
  {
    id: 'comm-1984',
    title: 'The Parliament Suite',
    year: '1984',
    dimensions: '8ft x 12ft',
    knots: '160 knots per sq. inch',
    dye: 'Natural Indigo Vat & Madder Root',
    weavers: 'Rampyare Yadav & 3 Master Apprentices',
    description: 'Commissioned for the State Assembly Chamber. A dense hand-knotted masterpiece utilizing geometric floral motifs. The piece required 180 days of continuous loom labor and represents the first major institutional project of the Bhadohi workshop.',
    status: 'Lost to Private Records (No Digital Trace)',
    image: '/images/craft-handknotting-01.png',
  },
  {
    id: 'comm-1995',
    title: 'The Delhi Palace Court',
    year: '1995',
    dimensions: '12ft x 18ft',
    knots: '140 knots per sq. inch',
    dye: 'Organic Pomegranate Peel & Walnut Husk',
    weavers: 'Yadav Family Looms',
    description: 'Designed for a renovated royal estate reception hall. Features heavy distress washing to highlight the organic variations of the hand-carded sheep wool. Traded through intermediate export agencies.',
    status: 'Ownership Chain Unmapped (Historical Records Only)',
    image: '/images/editorial-heritage-v1.png',
  },
  {
    id: 'comm-2008',
    title: 'The London Embassy Arches',
    year: '2008',
    dimensions: '10ft x 14ft',
    knots: '200 knots per sq. inch (High-Density Wool/Silk)',
    dye: 'Sourced Madder Root & Pure Undyed Wool',
    weavers: 'Lalmani Yadav & Lead Weavers',
    description: 'A custom sculptural architectural rug featuring layered borders. Exported during the second-generation expansion. Represented our first integration of fine mulberry silk highlighting raised textures.',
    status: 'In Private Collection (Location Unknown)',
    image: '/images/lifestyle-living-room-01.png',
  },
];

export default function HeritageArchivePage() {
  const { openWaitlist } = useWaitlist();

  return (
    <>
      <main className="relative min-h-screen bg-[#0e0a08] pt-24 sm:pt-28 pb-0 px-4 sm:px-6 lg:px-12 text-[#efe6d8]">
        <Navbar />
        
        <div className="absolute inset-0 bg-noise opacity-[0.025] pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-gold-300/[0.02] to-transparent pointer-events-none" />

        <div className="mx-auto max-w-[1300px]">
          
          {/* Main Editorial Header */}
          <div className="border-b border-[#efe6d8]/15 pb-8 mb-12 text-center max-w-4xl mx-auto">
            <span className="mb-4 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-gold-300 font-sans">
              <History size={12} />
              LM Carpet Heritage Archive (Est. 1980)
            </span>
            <h1 className="font-serif text-[clamp(2.5rem,7vw,7rem)] font-light leading-[0.9] tracking-tightest text-[#efe6d8] mt-3">
              The Yadav Chronicles
            </h1>
            <p className="mt-5 font-serif italic text-base sm:text-lg text-[#efe6d8]/70 max-w-2xl mx-auto leading-relaxed">
              "We don't create rugs. We weave stories - stories of heritage, artistry, and homes where life is lived beautifully."
            </p>
          </div>

          {/* Generational Lineage Section */}
          <section className="grid gap-12 lg:grid-cols-12 items-start py-8">
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-36">
              <span className="text-[10px] uppercase tracking-widest text-gold-300 block font-sans font-semibold">
                Atelier Lineage
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl italic leading-tight">
                Generations of Craft
              </h2>
              <p className="text-xs leading-relaxed text-[#efe6d8]/60 font-sans font-light">
                LM Carpet’s history is rooted in the weaving soil of Bhadohi. For forty years, the Yadav family has maintained the core looms, passing down precision techniques and an unyielding commitment to material purity.
              </p>
              
              <div className="border border-gold-300/15 bg-gold-300/[0.02] p-4 rounded-sm space-y-2.5 font-sans">
                <div className="flex gap-2.5 items-center">
                  <Award size={14} className="text-gold-300" />
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-gold-300">
                    Heritage Standards
                  </span>
                </div>
                <p className="text-[11px] leading-relaxed text-[#efe6d8]/75">
                  Every historical piece in this archive was verified hand-knotted, using pure high-density techniques and zero synthetic fibers.
                </p>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-8 font-serif leading-relaxed text-base sm:text-lg text-[#efe6d8]/80">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="border-t border-[#efe6d8]/15 pt-6 space-y-4">
                  <span className="text-[10px] font-sans uppercase tracking-widest text-gold-300 block">First Generation</span>
                  <h3 className="text-xl italic text-[#efe6d8]">Rampyare Yadav</h3>
                  <span className="text-xs font-sans text-gold-300/70 block uppercase tracking-wider -mt-2">"Foundation of Precision"</span>
                  <p className="text-xs leading-relaxed text-[#efe6d8]/70 font-sans font-light">
                    In the early 1980s, Rampyare Yadav established the first looms in Bhadohi. During a period when synthetic dye shortcuts and machine weaving began threatening the local industry, he preserved the absolute precision of pure hand-knotting, setting an uncompromising standard.
                  </p>
                </div>

                <div className="border-t border-[#efe6d8]/15 pt-6 space-y-4">
                  <span className="text-[10px] font-sans uppercase tracking-widest text-gold-300 block">Second Generation</span>
                  <h3 className="text-xl italic text-[#efe6d8]">Lalmani Yadav</h3>
                  <span className="text-xs font-sans text-gold-300/70 block uppercase tracking-wider -mt-2">"Scale of Fine Art"</span>
                  <p className="text-xs leading-relaxed text-[#efe6d8]/70 font-sans font-light">
                    Expanding in the late 1990s and 2000s, Lalmani Yadav scaled exports globally without diluting the core craftsmanship. He connected Bhadohi master weavers directly with international design houses, showing that scale could coexist with premium artistic integrity.
                  </p>
                </div>
              </div>

              <div className="border-t border-[#efe6d8]/15 pt-8 space-y-4">
                <span className="text-[10px] font-sans uppercase tracking-widest text-gold-300 block">Third Generation</span>
                <h3 className="text-xl italic text-[#efe6d8]">Wovenwarp (2026)</h3>
                <span className="text-xs font-sans text-gold-300/70 block uppercase tracking-wider -mt-2">"The Digital Genesis"</span>
                <p className="text-xs leading-relaxed text-[#efe6d8]/70 font-sans font-light">
                  Today, the Yadav family launches Wovenwarp. We elevate hand-knotted carpets into serialized luxury assets. By combining the 40-year physical precision with the digital Living Ledger authentication gateway, we ensure that every masterpiece’s human story remains forever secure and verifiable.
                </p>
              </div>
            </div>
          </section>

          {/* Essay Section: Tragedy of Unmapped Masterpieces */}
          <section className="border-t border-[#efe6d8]/15 py-12 mt-12 grid gap-10 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7 space-y-6 font-serif">
              <span className="text-[10px] font-sans uppercase tracking-widest text-gold-300 block font-semibold">
                Editorial Essay
              </span>
              <h2 className="text-3xl sm:text-5xl italic leading-[1.05] text-[#efe6d8] tracking-tight">
                The Tragedy of Unmapped Masterpieces
              </h2>
              <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-[#efe6d8]/70 font-sans font-light">
                <p>
                  Over forty years of operations, the Bhadohi looms produced hundreds of masterpieces. These carpets were dispatched to private estates, foreign embassies, and global luxury hotels. In those days, a carpet left the workshop with nothing but a paper invoice and a packing slip.
                </p>
                <p>
                  As decades passed, these papers were lost. The names of the weavers who sat for three months tying 200,000 knots were forgotten. The yarn dye batches faded from records, and ownership passed from family to family with no absolute proof of provenance.
                </p>
                <p>
                  We call this the <strong className="text-[#efe6d8] font-normal">Tragedy of Unmapped Masterpieces</strong>. It is a loss of history, a dilution of artisan dignity, and a problem for collectors who own what should be recognized as a valuable heritage asset.
                </p>
                <p>
                  This tragedy is the direct inspiration for the launch of Wovenwarp and the development of the <strong className="text-[#efe6d8] font-normal">Living Ledger</strong>. By permanently binding an NFC micro-tag into the very weave of every carpet, we ensure history will never repeat itself. Every hand-knotted knot is logged, every masterweaver credited, and every ownership transfer secured chronologically.
                </p>
              </div>
            </div>
            
            <div className="lg:col-span-5 relative h-[300px] sm:h-[400px] md:h-[450px] overflow-hidden border border-[#efe6d8]/10 rounded-sm">
              <Image
                src="/images/material-yarn-bundles-01.png"
                alt="Yarn bundles representing natural dyes"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0a08]/80 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-left font-serif p-4 bg-[#0e0a08]/60 backdrop-blur-sm border border-[#efe6d8]/10 rounded-sm">
                <span className="text-[9px] font-sans uppercase tracking-widest text-gold-300 block mb-1">Archival Fragment</span>
                <span className="text-xs leading-normal italic text-[#efe6d8]/90">
                  "Prior to 2026, millions of knots were tied without record. This archive is a tribute to those unmapped masterpieces."
                </span>
              </div>
            </div>
          </section>

          {/* Lost Masterpieces List */}
          <section className="border-t border-[#efe6d8]/15 py-12 mt-12">
            <div className="mb-10 text-center max-w-2xl mx-auto">
              <span className="text-[10px] uppercase tracking-widest text-gold-300 block font-sans font-semibold mb-3">
                Archival Records
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl italic">
                Lost Masterpieces Registry
              </h2>
              <p className="mt-4 font-sans text-xs text-[#efe6d8]/60 font-light leading-relaxed">
                A documentary reconstruction of known past commissions between 1980 and 2025. These designs lack the digital security of the Living Ledger but represent our foundation.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {HISTORIC_COMMISSIONS.map((comm) => (
                <div
                  key={comm.id}
                  className="rounded-sm border border-[#efe6d8]/10 bg-[#0d0907] p-5 flex flex-col justify-between gap-6"
                >
                  <div className="space-y-4">
                    {/* Visual box */}
                    <div className="relative w-full h-[180px] overflow-hidden rounded-sm border border-[#efe6d8]/5">
                      <Image
                        src={comm.image}
                        alt={comm.title}
                        fill
                        className="object-cover grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-75"
                      />
                      <div className="absolute top-3 left-3 bg-[#0e0a08]/80 border border-gold-300/25 px-2 py-0.5 rounded-sm">
                        <span className="font-mono text-[10px] text-gold-300">{comm.year}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <span className="text-[9px] font-sans uppercase tracking-widest text-gold-300/80 block">Commission ID: {comm.id}</span>
                      <h3 className="font-serif text-lg italic text-[#efe6d8]">{comm.title}</h3>
                    </div>

                    <p className="text-xs leading-[1.65] text-[#efe6d8]/64 font-sans font-light">
                      {comm.description}
                    </p>

                    <div className="text-[10px] font-mono space-y-1 border-t border-[#efe6d8]/5 pt-3 text-[#efe6d8]/50">
                      <p><span className="text-gold-300/50 font-serif not-italic uppercase tracking-wider text-[8px] block">Dimensions:</span> {comm.dimensions}</p>
                      <p><span className="text-gold-300/50 font-serif not-italic uppercase tracking-wider text-[8px] block">Master Weaver:</span> {comm.weavers}</p>
                    </div>
                  </div>

                  <div className="border border-red-400/20 bg-red-400/5 p-3 rounded-sm text-[9px] uppercase tracking-wider font-sans text-red-400 font-semibold text-center">
                    {comm.status}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Call to Action: The Shift to Ledger */}
          <section className="border-t border-[#efe6d8]/15 pt-12 mt-12 text-center max-w-3xl mx-auto space-y-6">
            <h2 className="font-serif text-3xl sm:text-4xl font-light italic leading-tight">
              Begin Provenance Mapping
            </h2>
            <p className="text-xs leading-relaxed text-[#efe6d8]/60 font-sans font-light">
              We have closed the unmapped legacy era. Every Wovenwarp masterpiece carries absolute traceability. Review active ledger registries or join the Private Waitlist to secure upcoming commissions.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <button
                onClick={openWaitlist}
                className="w-full sm:w-auto inline-flex items-center justify-center bg-gold-300 py-3.5 px-8 text-xs font-semibold uppercase tracking-[0.2em] text-ink-950 transition hover:bg-gold-200"
              >
                Request Waitlist Access
              </button>
              <Link
                href="/ledger"
                className="w-full sm:w-auto inline-flex items-center justify-center border border-[#efe6d8]/15 px-8 py-3.5 text-xs uppercase tracking-widest text-[#efe6d8]/85 hover:border-gold-300/30 hover:text-gold-300 transition-colors"
              >
                Go to Registry
              </Link>
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </>
  );
}
