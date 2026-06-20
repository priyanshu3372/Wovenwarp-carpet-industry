'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const PROJECTS = [
  {
    id: 1,
    title: 'Minimalist Milan Penthouse',
    type: 'Residential',
    location: 'Milan, Italy',
    description: 'Contemporary 4-bedroom residence featuring Wovenwarp\'s Minimal Neutral collection anchoring the living room with subtle sophistication.',
    image: '/images/lifestyle-living-room-01.png',
    featured: true,
  },
  {
    id: 2,
    title: 'Boutique Hotel Kyoto',
    type: 'Hospitality',
    location: 'Kyoto, Japan',
    description: 'Luxury 12-room boutique hotel where Wovenwarp\'s Contemporary Collection creates warm focal points in each guest suite.',
    image: '/images/editorial-heritage-v1.png',
    featured: true,
  },
  {
    id: 3,
    title: 'Desert Villa Marrakech',
    type: 'Residential',
    location: 'Marrakech, Morocco',
    description: 'Architect-designed villa with Persian Heritage collection defining the central courtyard lounge in authentic luxury.',
    image: '/images/rug-texture-v1.png',
    featured: false,
  },
  {
    id: 4,
    title: 'Corporate Headquarters Tokyo',
    type: 'Commercial',
    location: 'Tokyo, Japan',
    description: 'Modern office lobby design with curated Handwoven Artisan collection creating a welcoming luxury entrance experience.',
    image: '/images/studio-moodboard-sampling-01.png',
    featured: false,
  },
  {
    id: 5,
    title: 'London Townhouse',
    type: 'Residential',
    location: 'London, UK',
    description: 'Historic Georgian residence reimagined with modern interiors, featuring Luxury Wool collection in the drawing room.',
    image: '/images/craft-handknotting-01.png',
    featured: false,
  },
  {
    id: 6,
    title: 'Luxury Spa & Wellness',
    type: 'Hospitality',
    location: 'Barcelona, Spain',
    description: 'Serene 8-room spa facility where Designer Collaboration collection creates calming tactile spaces for guests.',
    image: '/images/material-yarn-bundles-01.png',
    featured: false,
  },
];

export default function ProjectsSection() {
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
    <div ref={rootRef} id="projects" className="relative overflow-hidden bg-ink-950">
      {/* Header */}
      <section className="relative px-5 py-24 sm:px-6 lg:px-12">
        <div className="absolute inset-0 bg-noise opacity-[0.025]" />
        <div className="mx-auto max-w-[1500px]">
          <div data-reveal>
            <span className="mb-5 flex items-center gap-4 text-[10px] uppercase tracking-editorial text-gold-300/75">
              <span className="h-px w-10 bg-gold-300/50" />
              Realized Interiors
            </span>
            <h1 className="font-serif text-[clamp(3rem,8vw,7rem)] font-medium leading-[0.92] tracking-tightest text-bone">
              Projects & Spaces
            </h1>
            <p className="mt-8 max-w-3xl text-[15px] font-light leading-[1.85] text-bone/70 md:text-lg">
              Wovenwarp rugs in luxury residences, boutique hotels, and architecturally significant interiors around the globe. Each project showcases our rugs as the emotional anchor of sophisticated spaces.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="relative px-5 sm:px-6 lg:px-12">
        <div className="mx-auto max-w-[1500px] space-y-12">
          {PROJECTS.map((project) => (
            <motion.article
              key={project.id}
              data-reveal
              className="grid gap-8 lg:grid-cols-12 lg:gap-12 items-center border-b border-bone/10 pb-12"
            >
              {/* Featured Badge */}
              {project.featured && (
                <span className="lg:col-span-12 mb-4 inline-block text-[8px] uppercase tracking-editorial text-gold-300/70 bg-gold-300/10 px-3 py-1 rounded-full border border-gold-300/20">
                  Featured Project
                </span>
              )}

              {/* Text Content */}
              <div className="lg:col-span-5">
                <p className="text-[10px] uppercase tracking-editorial text-gold-300/70 mb-3">
                  {project.type} • {project.location}
                </p>
                <h3 className="font-serif text-3xl italic text-bone mb-5 md:text-4xl">
                  {project.title}
                </h3>
                <p className="text-[15px] leading-[1.85] text-bone/68">
                  {project.description}
                </p>
              </div>

              {/* Image */}
              <motion.div
                whileHover={{ scale: 0.99 }}
                transition={{ duration: 0.9 }}
                className="relative lg:col-span-7 min-h-[340px] overflow-hidden rounded-sm border border-bone/10"
              >
                <div data-parallax className="absolute inset-[-4%]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(min-width: 1024px) 58vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/30 to-transparent" />
              </motion.div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-5 py-24 sm:px-6 lg:px-12">
        <div className="mx-auto max-w-[1500px] border-t border-bone/10 pt-14">
          <motion.div
            data-reveal
            className="grid gap-8 lg:grid-cols-12 lg:items-center"
          >
            <div className="lg:col-span-6">
              <p className="text-[10px] uppercase tracking-editorial text-gold-300/75 mb-4">
                <span className="h-px w-10 bg-gold-300/50 inline-block mr-4" />
                Interested in Wovenwarp?
              </p>
              <h2 className="font-serif text-[clamp(2.4rem,5vw,5.8rem)] font-medium leading-[0.95] tracking-tightest text-bone">
                Let's Create Your Space
              </h2>
            </div>
            <div className="lg:col-span-6 flex items-end">
              <p className="font-serif text-2xl italic leading-snug text-bone/82 md:text-3xl">
                Connect with our design team to explore collections for your project.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
