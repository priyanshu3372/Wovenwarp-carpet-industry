"use client";

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const HERITAGE_POINTS = [
  'Skilled artisan craftsmanship',
  'Traditional weaving techniques',
  'Carefully selected materials',
  'Timeless textile artistry',
  'Refined modern interpretation',
];

const DESIGN_PILLARS = [
  {
    title: 'Organic Modernism',
    kicker: 'Nature-led interiors',
    text: 'Soft palettes, fluid textures, and natural material expression create warmth, calmness, and effortless sophistication.',
  },
  {
    title: 'Sculptural Texture',
    kicker: 'Architectural depth',
    text: 'High-low pile, layered surfaces, hand-carved detailing, and organic movement bring tactile richness with visual subtlety.',
  },
  {
    title: 'Vintage Artistry',
    kicker: 'Aged character',
    text: 'Muted palettes, subtle distressing, and antique textile references are reinterpreted through a contemporary lens.',
  },
  {
    title: 'Artistic Minimalism',
    kicker: 'Warm restraint',
    text: 'Balanced proportion and quiet texture create minimalist rugs that feel inviting rather than sterile.',
  },
  {
    title: 'Boutique Hospitality',
    kicker: 'Immersive refinement',
    text: 'Inspired by curated residences, boutique hotels, and architecturally designed spaces that feel emotionally grounded.',
  },
];

const CRAFT_POINTS = [
  'Handknotted weaving',
  'Handloom techniques',
  'Precision finishing',
  'Textural detailing',
  'Artisan washing methods',
  'Natural fibre craftsmanship',
];

const QUALITY_POINTS = [
  'Natural texture',
  'Lasting quality',
  'Timeless palettes',
  'Comfort underfoot',
  'Refined craftsmanship',
];

const SUSTAINABILITY_POINTS = [
  'Handmade production methods',
  'Small-batch craftsmanship',
  'Reduced industrial processing',
  'Preservation of artisan communities',
  'Long-lasting quality',
  'Timeless rather than trend-driven design',
];

const GLOBAL_SPACES = [
  'Modern residences',
  'Boutique hospitality projects',
  'Organic modern interiors',
  'Minimal contemporary spaces',
  'Luxury apartments',
  'Curated design environments',
];

function PointList({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 sm:mt-7 grid gap-2 sm:gap-3 text-[clamp(0.75rem,2vw,0.875rem)] leading-[1.6] text-bone/64 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="flex gap-2 sm:gap-3">
          <span className="mt-1.5 sm:mt-2 h-px w-4 sm:w-5 shrink-0 bg-gold-300/55" />
          <span className="line-clamp-3">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function EditorialSections() {
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

        rootEl.querySelectorAll<HTMLElement>('[data-parallax-image]').forEach((el) => {
          gsap.fromTo(
            el,
            { y: '-6%', scale: 1.08 },
            {
              y: '6%',
              scale: 1.14,
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
    <div ref={rootRef} className="relative overflow-hidden bg-ink-950">
      <section id="about-us" className="relative px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:px-12">
        <div className="absolute inset-0 bg-noise opacity-[0.035]" />
        <div className="mx-auto grid max-w-[1500px] grid-cols-12 gap-6 sm:gap-8 lg:gap-14">
          <div data-reveal className="col-span-12 lg:col-span-5">
            <span className="mb-4 sm:mb-5 flex items-center gap-3 sm:gap-4 text-[clamp(0.625rem,1.5vw,0.75rem)] uppercase tracking-editorial text-gold-300/75">
              <span className="h-px w-8 sm:w-10 bg-gold-300/50" />
              Brand Introduction
            </span>
            <h2 className="max-w-xl font-serif text-[clamp(2rem,5.5vw,6.8rem)] font-medium leading-[0.94] tracking-tightest text-bone">
              Wovenwarp
            </h2>
          </div>

          <div data-reveal className="col-span-12 lg:col-span-7">
            <div className="max-w-3xl space-y-4 sm:space-y-5 md:space-y-6 text-[clamp(0.875rem,2vw,1rem)] font-light leading-[1.7] sm:leading-[1.8] md:leading-[1.85] text-bone/68">
              <p>
                Wovenwarp is a contemporary rug and textile studio founded
                upon the legacy of LM Carpets - a handknotted weaving house
                rooted in India's rich textile heritage since 1990.
              </p>
              <p>
                For more than three decades, our artisans have quietly crafted
                rugs for international exporters and global design houses while
                preserving the intricate traditions of Indian weaving.
              </p>
              <p>
                Today, Wovenwarp brings that craftsmanship directly into modern
                interiors through thoughtfully designed collections that balance
                artisanal heritage with contemporary aesthetics.
              </p>
              <p>
                Our rugs are created for spaces that value texture,
                authenticity, and understated sophistication - from refined
                residences to boutique hospitality environments around the
                world.
              </p>
            </div>
            <p className="mt-8 sm:mt-10 font-serif text-[clamp(1.75rem,4vw,5rem)] italic leading-snug text-bone">
              From weaving carpets to weaving stories.
            </p>
          </div>
        </div>
      </section>

      <section
        id="our-heritage"
        className="relative px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:px-12"
      >
        <div className="mx-auto grid max-w-[1500px] grid-cols-12 gap-6 sm:gap-8 lg:gap-14">
          <div className="col-span-12 lg:col-span-5">
            <div data-reveal className="sticky top-20 sm:top-24 lg:top-32">
              <span className="mb-4 sm:mb-5 flex items-center gap-3 sm:gap-4 text-[clamp(0.625rem,1.5vw,0.75rem)] uppercase tracking-editorial text-gold-300/75">
                <span className="h-px w-8 sm:w-10 bg-gold-300/50" />
                Heritage
              </span>
              <h2 className="max-w-xl font-serif text-[clamp(2rem,5.5vw,6.6rem)] font-medium leading-[0.94] tracking-tightest text-bone">
                A Legacy of Craftsmanship Since 1990
              </h2>
              <p className="mt-6 sm:mt-8 max-w-lg text-[clamp(0.875rem,2vw,1rem)] font-light leading-[1.7] sm:leading-[1.8] text-bone/66">
                Wovenwarp emerges from generations of weaving expertise
                cultivated through LM Carpets, a weaving house established in
                1990. Rather than replicating tradition, we reinterpret it for
                contemporary global interiors.
              </p>
              <PointList items={HERITAGE_POINTS} />
            </div>
          </div>

          <motion.div
            data-reveal
            whileHover={{ scale: 0.992 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative col-span-12 min-h-[300px] sm:min-h-[420px] md:min-h-[520px] overflow-hidden rounded-sm border border-bone/10 bg-ink-900/40 shadow-[0_40px_120px_rgba(0,0,0,0.42)] lg:col-span-7 lg:min-h-[760px]"
          >
            <div data-parallax-image className="absolute inset-[-8%]">
              <Image
                src="/images/editorial-heritage-v1.png"
                alt="Handwoven Wovenwarp rug in a contemporary living space with modern furniture"
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/76 via-transparent to-ink-950/20" />
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 lg:p-10">
              <div className="hairline mb-3 sm:mb-5 h-px w-full" />
              <p className="max-w-xl font-serif text-[clamp(1.25rem,3vw,4rem)] italic leading-snug text-bone/86">
                Built upon decades of artisanal knowledge, evolved for
                contemporary living.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="collections" className="relative px-4 py-12 sm:px-6 sm:py-16 lg:px-12">
        <div className="mx-auto max-w-[1500px]">
          <div data-reveal className="mb-8 sm:mb-12 grid gap-6 sm:gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-6">
              <span className="mb-4 sm:mb-5 flex items-center gap-3 sm:gap-4 text-[clamp(0.625rem,1.5vw,0.75rem)] uppercase tracking-editorial text-gold-300/75">
                <span className="h-px w-8 sm:w-10 bg-gold-300/50" />
                Design Philosophy
              </span>
              <h2 className="font-serif text-[clamp(2rem,5.5vw,6rem)] font-medium leading-[0.95] tracking-tightest text-bone">
                Designed with Quiet Sophistication
              </h2>
              <p className="mt-6 sm:mt-7 max-w-3xl text-[clamp(0.875rem,2vw,1rem)] font-light leading-[1.7] sm:leading-[1.85] text-bone/68">
                At Wovenwarp, design is approached with restraint, balance, and
                material sensitivity. Every piece is designed not to overpower a
                space, but to elevate it through texture, tonal depth, and
                timeless composition.
              </p>
            </div>
            <motion.div
              whileHover={{ scale: 0.99 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative min-h-[240px] sm:min-h-[300px] lg:min-h-[340px] overflow-hidden rounded-sm border border-bone/10 lg:col-span-6"
            >
              <Image
                src="/images/lifestyle-living-room-01.png"
                alt="Organic modern living room with a handwoven Wovenwarp rug"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/52 via-transparent to-transparent" />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 gap-px overflow-hidden border border-bone/10 bg-bone/10 sm:grid-cols-2 lg:grid-cols-5">
            {DESIGN_PILLARS.map((item, index) => (
              <motion.article
                data-reveal
                key={item.title}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="group relative min-h-[320px] sm:min-h-[380px] lg:min-h-[390px] overflow-hidden bg-ink-900 p-5 sm:p-6 md:p-7 lg:p-8"
              >
                <div className="absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-100">
                  <Image
                    src={
                      index === 0
                        ? '/images/lifestyle-living-room-01.png'
                        : index === 1
                          ? '/images/material-yarn-bundles-01.png'
                          : index === 2
                            ? '/images/rug-texture-v1.png'
                            : index === 3
                              ? '/images/craft-handknotting-01.png'
                              : '/images/studio-moodboard-sampling-01.png'
                    }
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 20vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover opacity-42"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/58 to-transparent" />
                </div>
                <div className="relative z-10 flex h-full flex-col justify-between">
                  <div>
                    <div className="mb-5 sm:mb-6 lg:mb-7 flex items-center justify-between">
                      <span className="text-[clamp(0.625rem,1.5vw,0.75rem)] uppercase tracking-editorial text-bone/42">
                        0{index + 1}
                      </span>
                      <Sparkles size={16} className="text-gold-300/60" />
                    </div>
                    <p className="text-[clamp(0.625rem,1.5vw,0.75rem)] uppercase tracking-editorial text-gold-300/65">
                      {item.kicker}
                    </p>
                    <h3 className="mt-3 sm:mt-4 font-serif text-[clamp(1.5rem,3vw,4rem)] italic text-bone">
                      {item.title}
                    </h3>
                  </div>
                  <div>
                    <p className="max-w-sm text-[clamp(0.75rem,1.8vw,0.875rem)] leading-[1.6] text-bone/62">
                      {item.text}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="craftsmanship"
        className="relative grid min-h-[65svh] sm:min-h-[75svh] lg:min-h-[85svh] items-center overflow-hidden px-4 py-12 sm:px-6 sm:py-16 lg:px-12"
      >
        <div data-parallax-image className="absolute inset-[-7%]">
          <Image
            src="/images/craft-handknotting-01.png"
            alt="Artisan hands handknotting a rug at a traditional loom"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_45%,rgba(10,7,6,0.28),rgba(10,7,6,0.94)_68%)]" />
        <div className="absolute inset-0 bg-noise opacity-[0.045]" />

        <div data-reveal className="relative z-10 mx-auto grid max-w-[1500px] grid-cols-12 gap-6 sm:gap-8">
          <div className="col-span-12 max-w-3xl lg:col-span-7">
            <span className="mb-5 sm:mb-6 flex items-center gap-3 sm:gap-4 text-[clamp(0.625rem,1.5vw,0.75rem)] uppercase tracking-editorial text-gold-300/75">
              <span className="h-px w-8 sm:w-10 bg-gold-300/50" />
              Craftsmanship
            </span>
            <h2 className="font-serif text-[clamp(2rem,5.5vw,7.4rem)] font-medium leading-[0.92] tracking-tightest text-bone">
              Handcrafted by Skilled Artisans
            </h2>
            <p className="mt-6 sm:mt-8 max-w-2xl text-[clamp(0.875rem,2vw,1rem)] font-light leading-[1.7] sm:leading-[1.85] text-bone/70">
              Every Wovenwarp rug is individually handcrafted by experienced
              artisans using traditional weaving techniques refined through
              generations. From knotting and weaving to washing and finishing,
              each stage is completed with patience, precision, and meticulous
              attention to detail.
            </p>
            <p className="mt-6 sm:mt-7 font-serif text-[clamp(1.75rem,4vw,5rem)] italic text-bone">
              No two rugs are exactly alike.
            </p>
          </div>
          <div className="col-span-12 self-end lg:col-span-5">
            <PointList items={CRAFT_POINTS} />
          </div>
        </div>
      </section>

      <section className="relative px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:px-12">
        <div className="mx-auto grid max-w-[1500px] grid-cols-12 gap-6 sm:gap-8 border-y border-bone/10 py-10 sm:py-14 md:py-20">
          <div data-reveal className="col-span-12 lg:col-span-6">
            <div className="relative mb-6 sm:mb-8 lg:mb-9 min-h-[220px] sm:min-h-[260px] md:min-h-[300px] overflow-hidden rounded-sm border border-bone/10">
              <Image
                src="/images/rug-texture-v1.png"
                alt="Premium handwoven rug in a contemporary bedroom setting"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/42 to-transparent" />
            </div>
            <span className="mb-4 sm:mb-5 flex items-center gap-3 sm:gap-4 text-[clamp(0.625rem,1.5vw,0.75rem)] uppercase tracking-editorial text-gold-300/75">
              <span className="h-px w-8 sm:w-10 bg-gold-300/50" />
              Materials & Quality
            </span>
            <h2 className="max-w-3xl font-serif text-[clamp(2rem,5.5vw,6.2rem)] font-medium leading-[0.94] tracking-tightest text-bone">
              Crafted for Texture and Longevity
            </h2>
            <p className="mt-6 sm:mt-7 max-w-xl text-[clamp(0.875rem,2vw,1rem)] leading-[1.7] sm:leading-[1.85] text-bone/66">
              True luxury begins with material integrity. Our rugs use carefully
              selected fibres chosen for softness, durability, and tactile
              richness, designed to age beautifully over time.
            </p>
            <PointList items={QUALITY_POINTS} />
          </div>
          <div data-reveal className="col-span-12 lg:col-span-6">
            <div className="relative mb-6 sm:mb-8 lg:mb-9 min-h-[220px] sm:min-h-[260px] md:min-h-[300px] overflow-hidden rounded-sm border border-bone/10">
              <Image
                src="/images/lifestyle-living-room-01.png"
                alt="Luxury interior showcasing handwoven Wovenwarp rug in a sophisticated living space"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/42 to-transparent" />
            </div>
            <span className="mb-4 sm:mb-5 flex items-center gap-3 sm:gap-4 text-[clamp(0.625rem,1.5vw,0.75rem)] uppercase tracking-editorial text-gold-300/75">
              <span className="h-px w-8 sm:w-10 bg-gold-300/50" />
              Sustainability
            </span>
            <h2 className="max-w-3xl font-serif text-[clamp(2rem,5.5vw,6.2rem)] font-medium leading-[0.94] tracking-tightest text-bone">
              Conscious Craftsmanship
            </h2>
            <p className="mt-6 sm:mt-7 max-w-xl text-[clamp(0.875rem,2vw,1rem)] leading-[1.7] sm:leading-[1.85] text-bone/66">
              Meaningful luxury should be enduring rather than disposable. By
              creating rugs designed to remain relevant for years, we encourage
              a more intentional approach to interior living.
            </p>
            <PointList items={SUSTAINABILITY_POINTS} />
          </div>
        </div>
      </section>

      <section id="contact" className="relative px-4 pb-12 sm:px-6 sm:pb-16 lg:px-12">
        <div
          data-reveal
          className="mx-auto max-w-[1500px] overflow-hidden rounded-sm border border-gold-300/20 bg-bone/[0.035] p-5 sm:p-8 md:p-10 lg:p-16 shadow-[0_40px_120px_rgba(0,0,0,0.34)] backdrop-blur-md"
        >
          <div className="grid gap-8 sm:gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="text-[clamp(0.625rem,1.5vw,0.75rem)] uppercase tracking-editorial text-gold-300/75">
                Wovenwarp
              </p>
              <h2 className="mt-4 sm:mt-5 max-w-4xl font-serif text-[clamp(2rem,5vw,5.8rem)] font-medium leading-[0.95] tracking-tightest text-bone">
                Handcrafted rugs rooted in heritage, designed for contemporary
                living.
              </h2>
              <p className="mt-6 sm:mt-8 max-w-2xl font-serif text-[clamp(1.5rem,3.5vw,4rem)] italic leading-snug text-bone/82">
                From Artisan Heritage to Contemporary Interiors.
              </p>
              <p className="mt-3 sm:mt-4 max-w-xl text-[clamp(0.875rem,2vw,1rem)] leading-[1.7] text-bone/62">
                Timeless craftsmanship woven for modern spaces.
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="relative mb-6 sm:mb-8 min-h-[220px] sm:min-h-[260px] md:min-h-[300px] overflow-hidden rounded-sm bg-bone/85">
                <Image
                  src="/images/cutout-rolled-rug-01.png"
                  alt="Rolled handwoven Wovenwarp rug showing fringe, edge finishing, and woven surface"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
