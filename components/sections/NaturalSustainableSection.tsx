'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Leaf, Droplets, Heart } from 'lucide-react';

const NATURAL_PILLARS = [
  {
    icon: Leaf,
    title: 'Pure Natural Fibers',
    description: 'Organic wool, natural silk, and plant-based dyes create rugs that age beautifully, breathe naturally, and feel luxuriously soft underfoot.',
    image: '/images/material-yarn-bundles-01.png',
  },
  {
    icon: Heart,
    title: 'Ethical Craftsmanship',
    description: 'Every rug supports artisan communities with fair wages and safe working conditions, preserving weaving heritage for generations.',
    image: '/images/craft-handknotting-01.png',
  },
  {
    icon: Droplets,
    title: 'Minimal Environmental Impact',
    description: 'Sustainable production practices, water conservation, and eco-conscious dyes ensure our rugs honor the environment.',
    image: '/images/rug-texture-v1.png',
  },
];

const LONGEVITY_FEATURES = [
  {
    title: 'Timeless Over Trendy',
    description: 'Our rugs are designed to transcend seasons and trends. Each piece becomes more beautiful with age, developing character and patina.',
  },
  {
    title: 'Heirloom Quality',
    description: 'Built to last generations. A Wovenwarp rug is an investment in your home\'s future, meant to be passed down and treasured.',
  },
  {
    title: 'Slow Luxury Philosophy',
    description: 'Handcrafted over weeks and months, each rug embodies the slow luxury movement—quality over quantity, meaning over mass.',
  },
  {
    title: 'True Sustainability',
    description: 'The most sustainable product is one that lasts forever. Our rugs reduce waste by becoming lifelong pieces, not disposable goods.',
  },
];

export default function NaturalSustainableSection() {
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
    <div ref={rootRef} id="natural-sustainable" className="relative overflow-hidden bg-ink-950">
      {/* Hero Section */}
      <section className="relative min-h-[65svh] px-5 py-20 sm:px-6 lg:px-12 flex items-center">
        <div className="absolute inset-0 bg-noise opacity-[0.025]" />
        <div className="mx-auto grid max-w-[1500px] w-full grid-cols-12 gap-8 items-center lg:gap-14">
          <div data-reveal className="col-span-12 lg:col-span-6">
            <span className="mb-6 flex items-center gap-4 text-[10px] uppercase tracking-editorial text-gold-300/75">
              <span className="h-px w-10 bg-gold-300/50" />
              Pure Craftsmanship
            </span>
            <h1 className="font-serif text-[clamp(3.2rem,8vw,7.4rem)] font-medium leading-[0.92] tracking-tightest text-bone mb-8">
              Natural Luxury, Sustainable Beauty
            </h1>
            <p className="text-[15px] font-light leading-[1.9] text-bone/75 md:text-lg max-w-2xl mb-8">
              Crafted to last for generations. Every Wovenwarp rug begins with pure natural fibers, continues through ethical artisan hands, and emerges as a timeless piece designed to grow more beautiful with age.
            </p>
            <p className="font-serif text-2xl italic text-bone/88 md:text-3xl max-w-xl">
              True luxury is sustainable. Sustainability is timeless.
            </p>
          </div>

          <motion.div
            data-reveal
            whileHover={{ scale: 0.992 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative col-span-12 min-h-[500px] overflow-hidden rounded-sm border border-bone/10 bg-ink-900/40 lg:col-span-6 lg:min-h-[640px]"
          >
            <div data-parallax className="absolute inset-[-6%]">
              <Image
                src="/images/rug-texture-v1.png"
                alt="Close-up of natural handwoven rug texture and fibers"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/72 via-transparent to-ink-950/20" />
          </motion.div>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="relative px-5 py-20 sm:px-6 lg:px-12">
        <div className="mx-auto max-w-[1500px]">
          <div data-reveal className="mb-14">
            <span className="mb-5 flex items-center gap-4 text-[10px] uppercase tracking-editorial text-gold-300/75">
              <span className="h-px w-10 bg-gold-300/50" />
              Our Foundation
            </span>
            <h2 className="font-serif text-[clamp(2.8rem,6vw,6.4rem)] font-medium leading-[0.94] tracking-tightest text-bone">
              Built on Three Principles
            </h2>
          </div>

          <div className="grid gap-12 lg:grid-cols-3">
            {NATURAL_PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  data-reveal
                  className="group"
                >
                  <motion.div
                    whileHover={{ scale: 0.99 }}
                    transition={{ duration: 0.8 }}
                    className="relative mb-8 min-h-[320px] overflow-hidden rounded-sm border border-bone/10"
                  >
                    <div data-parallax className="absolute inset-[-4%]">
                      <Image
                        src={pillar.image}
                        alt={pillar.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950/50 to-transparent" />
                  </motion.div>

                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold-300/30 bg-gold-300/5">
                      <Icon size={20} className="text-gold-300/80" />
                    </div>
                    <div>
                      <h3 className="font-serif text-2xl italic text-bone mb-3">
                        {pillar.title}
                      </h3>
                      <p className="text-[14px] leading-relaxed text-bone/70">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Longevity Features */}
      <section className="relative px-5 py-20 sm:px-6 lg:px-12">
        <div className="mx-auto max-w-[1500px] border-t border-bone/10 pt-16">
          <div data-reveal className="mb-16 grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-5">
              <span className="mb-5 flex items-center gap-4 text-[10px] uppercase tracking-editorial text-gold-300/75">
                <span className="h-px w-10 bg-gold-300/50" />
                Designed to Last
              </span>
              <h2 className="font-serif text-[clamp(2.6rem,5.6vw,6rem)] font-medium leading-[0.95] tracking-tightest text-bone">
                Timeless, Not Temporary
              </h2>
            </div>
            <p className="lg:col-span-7 text-[15px] font-light leading-[1.85] text-bone/70 md:text-base">
              In a world of fast furniture, Wovenwarp stands apart. Each rug is engineered for longevity, designed to become more beautiful over time, and crafted to be passed down through generations.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {LONGEVITY_FEATURES.map((feature) => (
              <motion.div
                key={feature.title}
                data-reveal
                className="relative group p-8 rounded-sm border border-bone/10 hover:border-gold-300/30 hover:bg-ink-900/60 transition duration-500"
              >
                <h3 className="font-serif text-2xl italic text-bone mb-4">
                  {feature.title}
                </h3>
                <p className="text-[14px] leading-relaxed text-bone/68">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Texture Showcase */}
      <section className="relative px-5 py-20 sm:px-6 lg:px-12">
        <div className="mx-auto max-w-[1500px] border-t border-bone/10 pt-16">
          <div data-reveal className="mb-16">
            <span className="mb-5 flex items-center gap-4 text-[10px] uppercase tracking-editorial text-gold-300/75">
              <span className="h-px w-10 bg-gold-300/50" />
              Material Mastery
            </span>
            <h2 className="font-serif text-[clamp(2.8rem,6vw,6.4rem)] font-medium leading-[0.94] tracking-tightest text-bone mb-8">
              Feel the Difference
            </h2>
            <p className="max-w-3xl text-[15px] font-light leading-[1.85] text-bone/70">
              Natural fibers breathe, respond to your touch, and develop a beautiful patina over time. Our materials are selected for softness, durability, and their ability to age gracefully.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: 'Organic Wool', detail: 'Soft, resilient, naturally stain-resistant, handcarded for ultimate comfort' },
              { title: 'Natural Silk', detail: 'Luminous, delicate, creates subtle sheen that evolves with light and time' },
              { title: 'Eco Cotton', detail: 'Breathable, washable, perfect for warm spaces, naturally hypoallergenic' },
              { title: 'Plant Dyes', detail: 'Colors derived from natural madder, indigo, and organic sources for timeless palettes' },
              { title: 'Sustainable Source', detail: 'Ethically sourced from certified suppliers with environmental accountability' },
              { title: 'Zero Waste Goal', detail: 'Continuous reduction in production waste, commitment to circular practices' },
            ].map((item) => (
              <motion.div
                key={item.title}
                data-reveal
                className="p-6 rounded-sm border border-bone/10 hover:bg-ink-900/40 transition duration-500"
              >
                <p className="text-[10px] uppercase tracking-editorial text-gold-300/70 mb-3">
                  {item.title}
                </p>
                <p className="text-[14px] leading-relaxed text-bone/70">
                  {item.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Section */}
      <section className="relative px-5 py-20 sm:px-6 lg:px-12">
        <div className="mx-auto max-w-[1500px] border-t border-bone/10 pt-16 text-center">
          <motion.div data-reveal>
            <span className="mb-6 inline-flex items-center gap-4 text-[10px] uppercase tracking-editorial text-gold-300/75">
              <span className="h-px w-10 bg-gold-300/50" />
              The Difference
              <span className="h-px w-10 bg-gold-300/50" />
            </span>
            <h2 className="font-serif text-[clamp(2.8rem,6vw,6.4rem)] font-medium leading-[0.94] tracking-tightest text-bone mb-8">
              More Than a Purchase
            </h2>
            <p className="mx-auto max-w-3xl font-serif text-2xl italic leading-snug text-bone/86 md:text-3xl">
              You're not buying a rug. You're investing in conscious luxury, supporting artisan communities, and choosing a piece that will define your space for decades.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
