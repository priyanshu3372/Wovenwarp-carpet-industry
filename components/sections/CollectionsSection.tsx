'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';
import LuxuryButton from '@/components/ui/LuxuryButton';
import BehanceGalleryGrid from './BehanceGalleryGrid';
import { useWaitlist } from '@/components/providers/WaitlistProvider';


const COLLECTIONS = [
  {
    id: 'modern',
    name: 'Modern Rugs',
    description: 'Minimal palettes meet sculptural texture in designs for modern living.',
    image: '/images/modern-rug-01.png',
    galleryImages: [
      '/images/modern-rug-01.png',
      '/images/modern-rug-02.png',
      '/images/modern-rug-03.png',
      '/images/modern-rug-04.png',
      '/images/modern-rug-05.png',
    ],
    featured: true,
  },
  {
    id: 'contemporary',
    name: 'Contemporary Rugs',
    description: 'Time-honored patterns reimagined through a contemporary lens.',
    image: '/images/contemporary-rug-01.png',
    galleryImages: [
      '/images/contemporary-rug-01.png',
      '/images/contemporary-rug-02.png',
      '/images/contemporary-rug-03.png',
      '/images/contemporary-rug-04.png',
      '/images/contemporary-rug-05.png',
    ],
    featured: false,
  },
  {
    id: 'persian',
    name: 'Persian Rugs',
    description: 'Premium natural wool with hand-finished details and timeless elegance.',
    image: '/images/persian-rug-01.png',
    galleryImages: [
      '/images/persian-rug-01.png',
      '/images/persian-rug-02.png',
      '/images/persian-rug-03.png',
      '/images/persian-rug-04.png',
      '/images/persian-rug-05.png',
    ],
    featured: false,
  },
  {
    id: 'vintage',
    name: 'Vintage Rugs',
    description: 'Quiet sophistication through restrained color and textural depth.',
    image: '/images/vintage-rug-01.png',
    galleryImages: [
      '/images/vintage-rug-01.png',
      '/images/vintage-rug-02.png',
      '/images/vintage-rug-03.png',
      '/images/vintage-rug-04.png',
      '/images/vintage-rug-05.png',
    ],
    featured: false,
  },
  {
    id: 'transitional',
    name: 'Transitional Rugs',
    description: 'Exclusively handcrafted with visible artisan techniques and character.',
    image: '/images/transitional-rug-01.png',
    galleryImages: [
      '/images/transitional-rug-01.png',
      '/images/transitional-rug-02.png',
      '/images/transitional-rug-03.png',
      '/images/transitional-rug-04.png',
      '/images/transitional-rug-05.png',
    ],
    featured: false,
  },
  {
    id: 'floral',
    name: 'Floral Rugs',
    description: 'Curated partnerships with interior architects and design studios.',
    image: '/images/floral-rug-01.png',
    galleryImages: [
      '/images/floral-rug-01.png',
      '/images/floral-rug-02.png',
      '/images/floral-rug-03.png',
      '/images/floral-rug-04.png',
      '/images/floral-rug-05.png',
    ],
    featured: false,
  },
];

export default function CollectionsSection() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const scrollPositionRef = useRef(0);
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const { openWaitlist } = useWaitlist();
  const selectedCollectionData = selectedCollection
    ? COLLECTIONS.find((collection) => collection.id === selectedCollection)
    : undefined;

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const rootEl = rootRef.current;
    if (!rootEl) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
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
    }, rootEl);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!selectedCollection) return;

    const body = document.body;
    const html = document.documentElement;
    const scrollY = window.scrollY;
    const scrollbarWidth = window.innerWidth - html.clientWidth;
    const hadLenisStopped = html.classList.contains('lenis-stopped');

    // Stop Lenis smooth scroll if active
    if (typeof window !== 'undefined' && (window as any).lenis) {
      (window as any).lenis.stop();
    }

    const previousBodyStyles = {
      overflow: body.style.overflow,
      paddingRight: body.style.paddingRight,
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
    };
    const previousHtmlOverflow = html.style.overflow;

    scrollPositionRef.current = scrollY;
    html.classList.add('lenis-stopped');
    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.width = '100%';
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      html.style.overflow = previousHtmlOverflow;
      if (!hadLenisStopped) html.classList.remove('lenis-stopped');
      body.style.overflow = previousBodyStyles.overflow;
      body.style.paddingRight = previousBodyStyles.paddingRight;
      body.style.position = previousBodyStyles.position;
      body.style.top = previousBodyStyles.top;
      body.style.left = previousBodyStyles.left;
      body.style.right = previousBodyStyles.right;
      body.style.width = previousBodyStyles.width;

      // Resume Lenis smooth scroll if active
      if (typeof window !== 'undefined' && (window as any).lenis) {
        (window as any).lenis.start();
      }

      window.scrollTo(0, scrollPositionRef.current);
    };
  }, [selectedCollection]);

  return (
    <div ref={rootRef} id="collections" className="relative overflow-hidden bg-ink-950">
      <section className="relative px-4 py-12 sm:px-6 sm:py-16 lg:px-12">
        <div className="mx-auto max-w-[1500px]">
          {/* Header */}
          <div data-reveal className="mb-8 sm:mb-12 grid gap-6 sm:gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-6">
              <span className="mb-4 sm:mb-5 flex items-center gap-3 sm:gap-4 text-[clamp(0.625rem,1.5vw,0.75rem)] uppercase tracking-editorial text-gold-300/75">
                <span className="h-px w-8 sm:w-10 bg-gold-300/50" />
                Collections
              </span>
              <h2 className="font-serif text-[clamp(2rem,5.5vw,6.4rem)] font-medium leading-[0.94] tracking-tightest text-bone">
                Carefully Curated Design
              </h2>
              <p className="mt-6 sm:mt-7 max-w-3xl text-[clamp(0.875rem,2vw,1rem)] font-light leading-[1.7] sm:leading-[1.85] text-bone/68">
                Each collection represents a distinct design philosophy—from organic modernism to vintage artistry. Browse our curated collections or explore by entering your custom preferences.
              </p>
            </div>
            <motion.div
              whileHover={{ scale: 0.99 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative min-h-[240px] sm:min-h-[300px] lg:min-h-[320px] overflow-hidden rounded-sm border border-bone/10 lg:col-span-6"
            >
              <Image
                src="/images/lifestyle-living-room-01.png"
                alt="Luxury interior featuring handwoven Wovenwarp rug in modern space"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/40 to-transparent" />
            </motion.div>
          </div>

          {/* Collections Grid */}
          <div className="grid grid-cols-1 gap-px overflow-hidden border border-bone/10 bg-bone/10 sm:grid-cols-2 lg:grid-cols-3">
            {COLLECTIONS.map((collection) => (
              <motion.article
                key={collection.id}
                data-reveal
                whileHover={{ y: -8 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setSelectedCollection(collection.id)}
                className="group relative min-h-[240px] cursor-pointer overflow-hidden bg-ink-900 p-5 transition-all sm:min-h-[340px] sm:p-6 lg:min-h-[420px] lg:p-8"
              >
                {/* Background Image */}
                <div className="absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-100">
                  <Image
                    src={collection.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover opacity-38"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/50 to-transparent" />
                </div>

                {/* Content */}
                <div className="relative z-10 flex h-full flex-col justify-between">
                  <div>
                    {collection.featured && (
                      <span className="mb-4 sm:mb-5 lg:mb-6 inline-block text-[clamp(0.625rem,1.5vw,0.75rem)] uppercase tracking-editorial text-gold-300/70 bg-gold-300/10 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-gold-300/20">
                        Featured
                      </span>
                    )}
                    <h3 className="mt-3 sm:mt-4 font-serif text-[clamp(1.5rem,3vw,4rem)] italic text-bone">
                      {collection.name}
                    </h3>
                  </div>
                  <div>
                    <p className="max-w-sm text-[clamp(0.75rem,1.8vw,0.875rem)] leading-[1.6] text-bone/64 mb-4 sm:mb-5 lg:mb-6">
                      {collection.description}
                    </p>
                    <div className="h-1" />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            data-reveal
            className="mt-8 sm:mt-10 grid gap-6 sm:gap-8 lg:grid-cols-12 border-t border-bone/10 pt-8 sm:pt-10"
          >
            <div className="lg:col-span-6">
              <span className="mb-4 sm:mb-5 flex items-center gap-3 sm:gap-4 text-[clamp(0.625rem,1.5vw,0.75rem)] uppercase tracking-editorial text-gold-300/75">
                <span className="h-px w-8 sm:w-10 bg-gold-300/50" />
                Custom Rugs
              </span>
              <h3 className="font-serif text-[clamp(1.75rem,4.5vw,5.2rem)] font-medium leading-[0.95] tracking-tightest text-bone">
                Design Your Own
              </h3>
              <p className="mt-5 sm:mt-6 max-w-xl text-[clamp(0.875rem,2vw,1rem)] leading-[1.7] sm:leading-[1.8] text-bone/66">
                Commission a bespoke rug tailored to your space. Work with our design team to select size, color, materials, and custom patterns.
              </p>
              <div className="mt-6 sm:mt-8">
                <LuxuryButton variant="primary" href="/#custom-rugs">
                  Start Custom Design
                </LuxuryButton>
              </div>
            </div>
            <div className="lg:col-span-6 relative min-h-[220px] sm:min-h-[260px] lg:min-h-[300px] overflow-hidden rounded-sm border border-bone/10">
              <Image
                src="/images/studio-moodboard-sampling-01.png"
                alt="Custom rug design consultation and material sampling"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/40 to-transparent" />
            </div>
          </motion.div>

          <section data-reveal className="mt-10 sm:mt-14">
            <div className="grid gap-6">
              <div className="max-w-3xl">
                <span className="mb-4 inline-flex items-center gap-3 text-[clamp(0.625rem,1.5vw,0.75rem)] uppercase tracking-editorial text-gold-300/75">
                  <span className="h-px w-8 sm:w-10 bg-gold-300/50" />
                  Gallery
                </span>
                <h3 className="font-serif text-[clamp(1.75rem,4vw,3.8rem)] font-medium leading-[0.94] tracking-tightest text-bone">
                  Collection Portfolio
                </h3>
                <p className="mt-5 text-[clamp(0.875rem,2vw,1rem)] leading-[1.7] text-bone/68">
                  Discover curated visual work tied to our collections, from material studies to finished interiors.
                </p>
              </div>

            <div className="mt-4 sm:mt-6">
                <BehanceGalleryGrid />
              </div>
            </div>
          </section>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedCollection && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCollection(null)}
            data-lenis-prevent
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/80 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              data-lenis-prevent
              className="relative max-h-[88svh] w-full max-w-2xl overflow-y-auto overflow-x-hidden rounded-sm border border-bone/20 bg-ink-900 sm:max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedCollection(null)}
                className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10 flex h-10 w-10 min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-ink-950/60 text-bone/60 hover:bg-ink-950/90 hover:text-bone transition-all"
                aria-label="Close"
              >
                ✕
              </button>
              {selectedCollectionData && (
                <div>
                    <div className="relative h-44 sm:h-64 md:h-80 lg:h-96">
                    <Image
                      src={selectedCollectionData.image}
                      alt={selectedCollectionData.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-5 sm:p-8 md:p-10">
                    <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl italic text-bone mb-3 sm:mb-4">
                      {selectedCollectionData.name}
                    </h3>
                    <p className="text-[clamp(0.875rem,2vw,1rem)] leading-[1.7] sm:leading-[1.85] text-bone/70 mb-6">
                      {selectedCollectionData.description}
                    </p>

                    {'galleryImages' in selectedCollectionData && selectedCollectionData.galleryImages && (
                      <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {selectedCollectionData.galleryImages.map((image, index) => (
                          <div
                            key={image}
                            className="relative aspect-[4/3] overflow-hidden rounded-sm border border-bone/10 bg-ink-950"
                          >
                            <Image
                              src={image}
                              alt={`${selectedCollectionData.name} design ${index + 1}`}
                              fill
                              sizes="(min-width: 640px) 320px, 100vw"
                              className="object-cover transition duration-700 hover:scale-105"
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Living Ledger Teaser */}
                    <div className="mb-8 p-4 bg-ink-950/60 border border-gold-300/10 rounded-sm">
                      <div className="flex items-center gap-2 text-gold-300 text-[10px] uppercase tracking-widest font-semibold mb-2">
                        <ShieldCheck size={12} />
                        Living Ledger Provenance Registry
                      </div>
                      <p className="text-xs leading-relaxed text-bone/60">
                        This piece is serialized and tracked under the Wovenwarp registry. On handover, the hidden NFC tag unlocks its artisan lineage, weaving duration, and verified human story.
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <button
                        onClick={() => {
                          setSelectedCollection(null);
                          openWaitlist();
                        }}
                        className="w-full sm:w-auto inline-flex items-center justify-center bg-gold-300 py-3.5 px-6 text-xs font-semibold uppercase tracking-[0.2em] text-ink-950 transition hover:bg-gold-200"
                      >
                        Request Private Waitlist Access
                      </button>
                      <Link
                        href="/ledger"
                        className="w-full sm:w-auto inline-flex items-center justify-center border border-bone/15 px-6 py-3.5 text-xs uppercase tracking-widest text-bone/80 hover:border-gold-300/30 hover:text-gold-300 transition-colors"
                      >
                        Verify Provenance
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
