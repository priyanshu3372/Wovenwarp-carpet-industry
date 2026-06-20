'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Leaf, Droplet, Heart, Wind } from 'lucide-react';

const SUSTAINABILITY_PILLARS = [
  {
    icon: Leaf,
    title: 'Natural Materials',
    description: 'We exclusively select renewable, plant-based fibers—premium wool, organic cotton, and botanical dyes that return gracefully to the earth.',
  },
  {
    icon: Heart,
    title: 'Artisan Communities',
    description: 'Our heritage is built on the well-being of our weavers, supporting ethical livelihoods that preserve traditional mastery for generations.',
  },
  {
    icon: Droplet,
    title: 'Conscious Cycles',
    description: 'A commitment to minimal intervention, utilizing traditional water-preservation techniques and closed-loop natural dye processes.',
  },
];

const MATERIALS = [
  {
    name: 'Premium Wool',
    description: 'Hand-carded natural wool from sustainable farms, soft, durable, and naturally stain-resistant.',
    image: '/images/material-yarn-bundles-01.png',
  },
  {
    name: 'Organic Cotton',
    description: 'Sustainably grown cotton without synthetic pesticides, breathable and perfect for warm climates.',
    image: '/images/rug-texture-v1.png',
  },
  {
    name: 'Silk & Natural Dyes',
    description: 'Hand-dyed with natural madder, indigo, and organic plant pigments for timeless, fade-resistant colors.',
    image: '/images/studio-moodboard-sampling-01.png',
  },
];

export default function SustainabilitySection() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const rootEl = rootRef.current;
    if (!rootEl) return;

    const ctx = gsap.context(() => {
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

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} id="sustainability" className="relative overflow-hidden bg-ink-950">
      {/* Hero Section */}
      <section className="relative min-h-[60svh] px-5 py-16 sm:px-6 lg:px-12 flex items-center">
        <div className="absolute inset-0 bg-noise opacity-[0.025]" />
        <div className="mx-auto grid max-w-[1500px] w-full grid-cols-12 gap-8 items-center lg:gap-14">
          <div data-reveal className="col-span-12 lg:col-span-6">
            <span className="mb-5 flex items-center gap-4 text-[10px] uppercase tracking-editorial text-gold-300/75">
              <span className="h-px w-10 bg-gold-300/50" />
              Sustainability
            </span>
            <h1 className="font-serif text-[clamp(3rem,8vw,7rem)] font-medium leading-[0.92] tracking-tightest text-bone">
              The Soul of Slow Luxury
            </h1>
            <p className="mt-8 max-w-xl text-[15px] font-light leading-[1.85] text-bone/70 md:text-lg">
              True luxury is found in permanence. Every Wovenwarp piece is a meditation on natural materiality, conscious craftsmanship, and the quiet beauty of ethical production.
            </p>
          </div>

          <motion.div
            data-reveal
            whileHover={{ scale: 0.992 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative col-span-12 min-h-[480px] overflow-hidden rounded-sm border border-bone/10 bg-ink-900/40 lg:col-span-6 lg:min-h-[600px]"
          >
            <div data-parallax className="absolute inset-[-6%]">
              <Image
                src="/images/lifestyle-living-room-01.png"
                alt="Sustainable natural fibers and organic materials"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/72 via-transparent to-ink-950/20" />
          </motion.div>
        </div>
      </section>

      {/* Materials Showcase */}
      <section className="relative px-5 py-20 sm:px-6 lg:px-12">
        <div className="mx-auto max-w-[1500px]">
          <div data-reveal className="mb-16">
            <span className="mb-5 flex items-center gap-4 text-[10px] uppercase tracking-editorial text-gold-300/75">
              <span className="h-px w-10 bg-gold-300/50" />
              Natural Fibers
            </span>
            <h2 className="font-serif text-[clamp(2.8rem,6vw,6.4rem)] font-medium leading-[0.94] tracking-tightest text-bone">
              Material Integrity
            </h2>
            <p className="mt-8 max-w-3xl text-[15px] font-light leading-[1.85] text-bone/70">
              We seek out the finest natural fibers—organic wool that breathes, silk that reflects, and dyes born from the earth—ensuring each piece is a sensory connection to the natural world.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {MATERIALS.map((material, idx) => (
              <motion.div
                key={material.name}
                data-reveal
                className="group"
              >
                <motion.div
                  whileHover={{ scale: 0.99 }}
                  transition={{ duration: 0.8 }}
                  className="relative mb-6 min-h-[280px] overflow-hidden rounded-sm border border-bone/10"
                >
                  <div data-parallax className="absolute inset-[-4%]">
                    <Image
                      src={material.image}
                      alt={material.name}
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 to-transparent" />
                </motion.div>
                <h3 className="font-serif text-2xl italic text-bone mb-3">
                  {material.name}
                </h3>
                <p className="text-[14px] leading-relaxed text-bone/68">
                  {material.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Environmental Impact */}
      <section className="relative px-5 py-20 sm:px-6 lg:px-12">
        <div className="mx-auto max-w-[1500px] border-t border-bone/10 pt-16">
          <div className="grid gap-14 lg:grid-cols-12 lg:items-center">
            <motion.div
              data-reveal
              className="relative col-span-12 min-h-[400px] overflow-hidden rounded-sm border border-bone/10 lg:col-span-6 lg:min-h-[520px]"
            >
              <div data-parallax className="absolute inset-[-5%]">
                <Image
                  src="/images/craft-handknotting-01.png"
                  alt="Artisan community weaving sustainable rugs"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/50 to-transparent" />
            </motion.div>

            <div data-reveal className="col-span-12 lg:col-span-6 lg:pl-8">
              <span className="mb-5 flex items-center gap-4 text-[10px] uppercase tracking-editorial text-gold-300/75">
                <span className="h-px w-10 bg-gold-300/50" />
                Our Commitment
              </span>
              <h3 className="font-serif text-[clamp(2.4rem,5vw,5.8rem)] font-medium leading-[0.95] tracking-tightest text-bone mb-8">
                Ethical Production
              </h3>

              <div className="space-y-6">
                {[
                  { label: 'Sustainable Sourcing', detail: 'All materials from certified sustainable suppliers' },
                  { label: 'Fair Trade Practices', detail: 'Artisans paid 40% above industry standard wages' },
                  { label: 'Zero Waste Goal', detail: 'Continuously reducing waste in production' },
                  { label: 'Community Investment', detail: '5% of profits support weaver education programs' },
                ].map((item) => (
                  <motion.div key={item.label} data-reveal>
                    <p className="text-[10px] uppercase tracking-editorial text-gold-300/70 mb-2">
                      {item.label}
                    </p>
                    <p className="text-[14px] leading-relaxed text-bone/70">
                      {item.detail}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Longevity Message */}
      <section className="relative px-5 py-16 sm:px-6 lg:px-12">
        <div className="mx-auto max-w-[1500px] text-center border-t border-bone/10 pt-16">
          <motion.div data-reveal>
            <span className="mb-5 inline-flex items-center gap-4 text-[10px] uppercase tracking-editorial text-gold-300/75">
              <span className="h-px w-10 bg-gold-300/50" />
              Designed to Last
              <span className="h-px w-10 bg-gold-300/50" />
            </span>
            <h2 className="font-serif text-[clamp(2.8rem,6vw,6.4rem)] font-medium leading-[0.94] tracking-tightest text-bone mb-10">
              Timelessness as Virtue
            </h2>
            <p className="mx-auto max-w-3xl font-serif text-2xl italic leading-snug text-bone/85 md:text-3xl">
              A Wovenwarp rug doesn't follow trends—it transcends them. Designed to age beautifully over decades, each rug becomes a family heirloom, reducing waste and honoring true sustainability.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
