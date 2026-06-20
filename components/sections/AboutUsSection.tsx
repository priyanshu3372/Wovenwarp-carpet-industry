"use client";

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const HERITAGE_TIMELINE = [
  { year: '1980s', event: 'Rampyare Yadav Foundation', desc: 'First-generation founder establishes LM Carpet in Bhadohi, India, preserving the absolute precision of pure hand-knotting.' },
  { year: '1990s', event: 'Mastery & Growth', desc: 'LM Carpet scales internal looms, developing a core group of weavers dedicated to zero synthetic compromise.' },
  { year: '2000s', event: 'Lalmani Yadav Scaling', desc: 'Second-generation leader expands global exports and distribution, establishing Bhadohi craftsmanship as global fine art.' },
  { year: '2026', event: 'Wovenwarp & The Day of Genesis', desc: 'Third-generation launch of Wovenwarp, introducing serialized luxury assets and the cryptographically secure Living Ledger.' },
];

export default function AboutUsSection() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    let ctx: any = null;
    let gsap: any = null;

    async function initGsap() {
      const gsapModule = await import('gsap');
      gsap = gsapModule.default ?? gsapModule;
      const ScrollTriggerMod = await import('gsap/ScrollTrigger');
      const ScrollTrigger = ScrollTriggerMod.ScrollTrigger ?? ScrollTriggerMod.default ?? ScrollTriggerMod;
      gsap.registerPlugin(ScrollTrigger);

      const rootEl = rootRef.current;
      if (!rootEl) return;

      ctx = gsap.context(() => {
        rootEl.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 42 },
            {
              opacity: 1,
              y: 0,
              duration: 1.25,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 82%',
              },
            }
          );
        });

        rootEl.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
          gsap.fromTo(
            el,
            { y: '-4%' },
            {
              y: '4%',
              ease: 'none',
              scrollTrigger: {
                trigger: el,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            }
          );
        });
      }, rootEl);
    }

    initGsap();

    return () => {
      if (ctx && typeof ctx.revert === 'function') ctx.revert();
    };
  }, []);

  return (
    <div ref={rootRef} id="about-us" className="relative overflow-hidden bg-ink-950">
      {/* Hero Section */}
      <section className="relative min-h-[50svh] sm:min-h-[65svh] lg:min-h-[72svh] px-4 py-12 sm:px-6 sm:py-16 lg:px-12">
        <div className="absolute inset-0 bg-noise opacity-[0.025]" />
        <div className="mx-auto grid max-w-[1500px] grid-cols-12 gap-6 sm:gap-8 items-center lg:gap-14">
          <div data-reveal className="col-span-12 lg:col-span-5">
            <span className="mb-4 sm:mb-5 flex items-center gap-3 sm:gap-4 text-[clamp(0.625rem,1.5vw,0.75rem)] uppercase tracking-editorial text-gold-300/75">
              <span className="h-px w-8 sm:w-10 bg-gold-300/50" />
              Our Story
            </span>
            <h1 className="font-serif text-[clamp(2rem,5.5vw,7rem)] font-medium leading-[0.92] tracking-tightest text-bone">
              Heritage Reimagined
            </h1>
            <p className="mt-6 sm:mt-8 max-w-xl text-[clamp(0.875rem,2vw,1rem)] font-light leading-[1.7] sm:leading-[1.85] text-bone/70">
              Bridging a 40-year Bhadohi weaving legacy with modern luxury asset creation. Wovenwarp elevates hand-knotted carpets into serialized luxury assets with absolute provenance and artisan recognition.
            </p>
          </div>

          <motion.div
            data-reveal
            whileHover={{ scale: 0.992 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative col-span-12 min-h-[280px] sm:min-h-[380px] md:min-h-[480px] overflow-hidden rounded-sm border border-bone/10 bg-ink-900/40 lg:col-span-7 lg:min-h-[680px]"
          >
            <video
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              crossOrigin="anonymous"
              poster="/images/hero-bg.webp"
            >
              <source
                src="/video/WhatsApp Video 2026-06-03 at 1.19.40 PM.mp4"
                type="video/mp4"
              />
              Your browser does not support HTML5 video.
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/72 via-transparent to-ink-950/20" />
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="our-heritage" className="relative px-4 py-12 sm:px-6 sm:py-16 lg:px-12">
        <div className="mx-auto max-w-[1500px]">
          <div data-reveal className="mb-12 sm:mb-16">
            <span className="mb-4 sm:mb-5 flex items-center gap-3 sm:gap-4 text-[clamp(0.625rem,1.5vw,0.75rem)] uppercase tracking-editorial text-gold-300/75">
              <span className="h-px w-8 sm:w-10 bg-gold-300/50" />
              Timeline
            </span>
            <h2 className="max-w-3xl font-serif text-[clamp(2rem,5.5vw,6rem)] font-medium leading-[0.95] tracking-tightest text-bone">
              A Legacy of Excellence
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4">
            {HERITAGE_TIMELINE.map((item, idx) => (
              <motion.div
                key={item.year}
                data-reveal
                whileHover={{ y: -6 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative group"
              >
                <div className="mb-5 sm:mb-6 pb-5 sm:pb-6 border-b border-bone/10 group-hover:border-gold-300/40 transition-colors duration-500">
                  <p className="font-serif text-4xl sm:text-5xl md:text-6xl font-light italic text-gold-300/90">
                    {item.year}
                  </p>
                  <p className="mt-3 sm:mt-4 font-serif text-lg sm:text-xl md:text-2xl italic text-bone">
                    {item.event}
                  </p>
                </div>
                <p className="text-[clamp(0.75rem,1.8vw,0.875rem)] leading-[1.6] text-bone/64">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="relative px-4 py-12 sm:px-6 sm:py-16 lg:px-12">
        <div className="mx-auto grid max-w-[1500px] grid-cols-12 gap-6 sm:gap-8 border-y border-bone/10 py-10 sm:py-14 md:py-20 lg:gap-14">
          <div data-reveal className="col-span-12 lg:col-span-6">
            <span className="mb-4 sm:mb-5 flex items-center gap-3 sm:gap-4 text-[clamp(0.625rem,1.5vw,0.75rem)] uppercase tracking-editorial text-gold-300/75">
              <span className="h-px w-8 sm:w-10 bg-gold-300/50" />
              Philosophy
            </span>
            <h2 className="max-w-3xl font-serif text-[clamp(2rem,5.5vw,6.2rem)] font-medium leading-[0.94] tracking-tightest text-bone">
              Tradition Meets Tomorrow
            </h2>
            <p className="mt-6 sm:mt-8 max-w-2xl text-[clamp(0.875rem,2vw,1rem)] font-light leading-[1.7] sm:leading-[1.85] text-bone/68">
              We honor the time-honored traditions of Indian weaving while embracing the sensibilities of contemporary design. Every Wovenwarp rug is a conversation between heritage and modernity—where artisanal techniques meet minimalist aesthetics.
            </p>
          </div>

          <div data-reveal className="col-span-12 lg:col-span-6 space-y-6 sm:space-y-8">
            {[
              { title: 'Generational Evolution', desc: 'Bridging a 40-year Bhadohi weaving heritage with modern luxury asset creation across three generations of Yadav family stewardship.' },
              { title: 'Artisanal Dignity', desc: 'Ensuring absolute recognition, credit, and fair compensation for the individual master weavers crafting our serialized assets.' },
              { title: 'Radical Traceability', desc: 'Securing the verified human story of each masterpiece from first knot to collector handover using cryptographic NFC tag ledgers.' },
              { title: 'Material Purity', desc: 'Zero synthetic compromise. High-density micro-knotting using pure hand-spun wool and museum-grade finishes.' },
            ].map((item) => (
              <motion.div
                key={item.title}
                data-reveal
                className="pb-5 sm:pb-6 border-b border-bone/10"
              >
                <h3 className="font-serif text-[clamp(1.25rem,3vw,2rem)] italic text-bone mb-2 sm:mb-3">
                  {item.title}
                </h3>
                <p className="text-[clamp(0.75rem,1.8vw,0.875rem)] leading-[1.6] text-bone/62">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="relative px-4 py-12 sm:px-6 sm:py-16 lg:px-12">
        <div className="mx-auto max-w-[1500px]">
          <div data-reveal className="mb-12 sm:mb-16 grid gap-6 sm:gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <span className="mb-4 sm:mb-5 flex items-center gap-3 sm:gap-4 text-[clamp(0.625rem,1.5vw,0.75rem)] uppercase tracking-editorial text-gold-300/75">
                <span className="h-px w-8 sm:w-10 bg-gold-300/50" />
                Vision
              </span>
              <h2 className="font-serif text-[clamp(2rem,5.5vw,6rem)] font-medium leading-[0.95] tracking-tightest text-bone">
                Craftsmanship with Soul
              </h2>
            </div>
            <div className="lg:col-span-7 flex flex-col justify-end">
              <p className="max-w-2xl font-serif text-[clamp(1.5rem,3.5vw,4rem)] italic leading-snug text-bone/88">
                "We don't create rugs. We weave stories - stories of heritage, artistry, and homes where life is lived beautifully."
              </p>
              <p className="mt-4 sm:mt-6 text-[clamp(0.75rem,1.8vw,0.875rem)] uppercase tracking-editorial text-bone/55">
                — Wovenwarp Studio
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
