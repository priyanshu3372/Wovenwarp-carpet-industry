'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const FIBER_SPECS = [
  {
    fiber: 'Wool',
    density: 'Hand-knotted',
    durability: 'Excellent',
    maintenance: 'Minimal',
    description: 'Premium natural wool with inherent stain resistance and natural elasticity for longevity.',
    image: '/images/rug-texture-v1.png',
  },
  {
    fiber: 'Silk Blend',
    density: 'Hand-loomed',
    durability: 'Very High',
    maintenance: 'Low',
    description: 'Luxury silk combined with wool creates luminous texture and extraordinary softness.',
    image: '/images/material-yarn-bundles-01.png',
  },
  {
    fiber: 'Cotton',
    density: 'Hand-woven',
    durability: 'Very High',
    maintenance: 'Easy',
    description: 'Organic cotton perfect for warm climates—breathable, washable, and naturally resilient.',
    image: '/images/studio-moodboard-sampling-01.png',
  },
];

export default function MaterialsCareSection() {
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
          { y: '-3%' },
          {
            y: '3%',
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
    <div ref={rootRef} id="materials-care" className="relative overflow-hidden bg-ink-950">
      {/* Fiber Specifications */}
      <section className="relative px-5 py-16 sm:px-6 lg:px-12">
        <div className="mx-auto max-w-[1500px]">
          <div data-reveal className="mb-16">
            <span className="mb-5 flex items-center gap-4 text-[10px] uppercase tracking-editorial text-gold-300/75">
              <span className="h-px w-10 bg-gold-300/50" />
              Fiber Guide
            </span>
            <h2 className="font-serif text-[clamp(2.8rem,6vw,6.4rem)] font-medium leading-[0.94] tracking-tightest text-bone">
              Material Excellence
            </h2>
          </div>

          <div className="space-y-16">
            {FIBER_SPECS.map((spec, idx) => (
              <motion.div
                key={spec.fiber}
                data-reveal
                className="grid gap-8 items-center lg:grid-cols-2 lg:gap-14"
              >
                {/* Text content container */}
                <div className={idx % 2 === 1 ? 'lg:order-2' : ''}>
                  <h3 className="font-serif text-4xl italic text-bone mb-6 md:text-5xl">
                    {spec.fiber}
                  </h3>
                  <p className="text-[15px] leading-[1.85] text-bone/70 mb-8">
                    {spec.description}
                  </p>
                  <div className="space-y-4">
                    <div>
                      <p className="text-[10px] uppercase tracking-editorial text-gold-300/70 mb-1">
                        Weaving
                      </p>
                      <p className="text-[14px] text-bone/80">{spec.density}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-editorial text-gold-300/70 mb-1">
                        Durability
                      </p>
                      <p className="text-[14px] text-bone/80">{spec.durability}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-editorial text-gold-300/70 mb-1">
                        Care
                      </p>
                      <p className="text-[14px] text-bone/80">{spec.maintenance}</p>
                    </div>
                  </div>
                </div>

                {/* Image container */}
                <motion.div
                  whileHover={{ scale: 0.99 }}
                  className={`relative min-h-[380px] overflow-hidden rounded-sm border border-bone/10 ${
                    idx % 2 === 1 ? 'lg:order-1' : ''
                  }`}
                >
                  <div data-parallax className="absolute inset-[-4%]">
                    <Image
                      src={spec.image}
                      alt={spec.fiber}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/40 to-transparent" />
                </motion.div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Warranty */}
      <section className="relative px-5 py-16 sm:px-6 lg:px-12">
        <div className="mx-auto max-w-[1500px] border-t border-bone/10 pt-16">
          <motion.div
            data-reveal
            className="grid gap-8 lg:grid-cols-12"
          >
            <div className="lg:col-span-6">
              <span className="mb-5 flex items-center gap-4 text-[10px] uppercase tracking-editorial text-gold-300/75">
                <span className="h-px w-10 bg-gold-300/50" />
                Guaranteed Quality
              </span>
              <h3 className="font-serif text-[clamp(2.4rem,5vw,5.8rem)] font-medium leading-[0.95] tracking-tightest text-bone">
                Lifetime Craftsmanship Promise
              </h3>
            </div>
            <div className="lg:col-span-6 flex flex-col justify-end">
              <div className="space-y-6">
                <div>
                  <p className="text-[10px] uppercase tracking-editorial text-gold-300/70 mb-3">
                    Structural Integrity
                  </p>
                  <p className="text-[15px] leading-relaxed text-bone/70">
                    We guarantee against manufacturing defects in weaving, knotting, and finishing for 10 years from purchase.
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-editorial text-gold-300/70 mb-3">
                    Repair & Restoration
                  </p>
                  <p className="text-[15px] leading-relaxed text-bone/70">
                    Professional repair services available for damage outside normal wear, with priority service for Wovenwarp rugs.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
