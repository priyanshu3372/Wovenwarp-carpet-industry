'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import LuxuryButton from '@/components/ui/LuxuryButton';

const CUSTOMIZATION_OPTIONS = [
  {
    title: 'Dimensions',
    description: 'From intimate accent pieces to grand hall rugs. Custom sizing for any space.',
    options: ['2x3 ft', '4x6 ft', '6x9 ft', '8x10 ft', 'Custom Size'],
  },
  {
    title: 'Materials',
    description: 'Select your fiber from premium natural options.',
    options: ['Premium Wool', 'Silk Blend', 'Organic Cotton', 'Mixed Fiber'],
  },
  {
    title: 'Colors',
    description: 'Choose from curated palettes or create your own.',
    options: ['Neutral Tones', 'Warm Earths', 'Muted Jewel', 'Custom Palette'],
  },
  {
    title: 'Pattern & Design',
    description: 'From minimalist to ornate. Create your artistic vision.',
    options: ['Solid Texture', 'Geometric', 'Traditional', 'Custom Pattern'],
  },
];

const COLOR_PALETTES = [
  {
    name: 'Forest & Moss',
    description: 'Organic greens, soft yellows, and stone greys inspired by deep woodland floors.',
    image: '/images/custom-color-1.jpg',
  },
  {
    name: 'Sunset & Ocean',
    description: 'Vibrant sunset oranges, warm corals, and gradient sky/ocean blues.',
    image: '/images/custom-color-2.jpg',
  },
  {
    name: 'Desert Rosewood',
    description: 'Earthy taupes, clay browns, and soft desert pinks.',
    image: '/images/custom-color-3.jpg',
  },
  {
    name: 'Royal Orchid',
    description: 'Lavenders, orchid purples, and deep plums blended with soft cream.',
    image: '/images/custom-color-4.jpg',
  },
  {
    name: 'Ochre & Horizon',
    description: 'Rich ochre yellows, warm rust, and cool horizon blues.',
    image: '/images/custom-color-5.jpg',
  },
];

const CUSTOM_PROJECTS = [
  {
    id: 1,
    title: 'Minimalist Milano Penthouse',
    type: 'Residential',
    description: '8x10 custom wool rug in warm beige with subtle geometric border. Designed to anchor the living room\'s modern minimalism.',
    image: '/images/lifestyle-living-room-01.png',
  },
  {
    id: 2,
    title: 'Luxury Boutique Hotel Lobby',
    type: 'Hospitality',
    description: 'Custom 12x16 handwoven rug featuring subtle pattern inspired by Japanese textile design. Creates serene luxury entrance.',
    image: '/images/studio-moodboard-sampling-01.png',
  },
];

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Initial Consultation',
    description: 'Connect with our design team to understand your space, aesthetic vision, and lifestyle needs.',
  },
  {
    step: '02',
    title: 'Concept Development',
    description: 'We create custom designs, material swatches, and mood boards inspired by your interior direction.',
  },
  {
    step: '03',
    title: 'Design Refinement',
    description: 'Collaborate on final specifications: size, colors, patterns, and texture preferences.',
  },
  {
    step: '04',
    title: 'Artisan Crafting',
    description: 'Your rug is handwoven by master artisans with meticulous attention to your custom specifications.',
  },
  {
    step: '05',
    title: 'Quality Assurance',
    description: 'Final inspection ensures your rug meets our exacting standards before delivery to your home.',
  },
  {
    step: '06',
    title: 'Delivery & Styling',
    description: 'Your custom rug arrives carefully packaged. Optional design consultation for placement and styling.',
  },
];

export default function CustomRugsSection() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [activeOption, setActiveOption] = useState(0);

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
    <div ref={rootRef} id="custom-rugs" className="relative overflow-hidden bg-ink-950">
      {/* Hero Section */}
      <section className="relative min-h-[65svh] px-5 py-20 sm:px-6 lg:px-12 flex items-center">
        <div className="absolute inset-0 bg-noise opacity-[0.025]" />
        <div className="mx-auto grid max-w-[1500px] w-full grid-cols-12 gap-8 items-center lg:gap-14">
          <div data-reveal className="col-span-12 lg:col-span-6">
            <span className="mb-6 flex items-center gap-4 text-[10px] uppercase tracking-editorial text-gold-300/75">
              <span className="h-px w-10 bg-gold-300/50" />
              Bespoke Creation
            </span>
            <h1 className="font-serif text-[clamp(3.2rem,8vw,7.4rem)] font-medium leading-[0.92] tracking-tightest text-bone mb-8">
              Your Rug, Your Story
            </h1>
            <p className="text-[15px] font-light leading-[1.9] text-bone/75 md:text-lg max-w-2xl mb-8">
              Commission a bespoke handwoven rug designed exclusively for your space. From intimate consultations to artisan craftsmanship, every custom rug is a collaboration between your vision and our expertise.
            </p>
            <p className="font-serif text-2xl italic text-bone/88 md:text-3xl max-w-xl">
              Designed around your lifestyle. Crafted for your home.
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
                src="/images/studio-moodboard-sampling-01.png"
                alt="Custom rug design consultation with luxury interior styling"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/72 via-transparent to-ink-950/20" />
          </motion.div>
        </div>
      </section>

      {/* Customization Options */}
      <section className="relative px-5 py-20 sm:px-6 lg:px-12">
        <div className="mx-auto max-w-[1500px]">
          <div data-reveal className="mb-16">
            <span className="mb-5 flex items-center gap-4 text-[10px] uppercase tracking-editorial text-gold-300/75">
              <span className="h-px w-10 bg-gold-300/50" />
              Personalized Design
            </span>
            <h2 className="font-serif text-[clamp(2.8rem,6vw,6.4rem)] font-medium leading-[0.94] tracking-tightest text-bone">
              Customize Every Element
            </h2>
          </div>

          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-start">
            {/* Options List */}
            <div className="space-y-4">
              {CUSTOMIZATION_OPTIONS.map((option, idx) => (
                <motion.button
                  key={option.title}
                  data-reveal
                  onClick={() => setActiveOption(idx)}
                  className={`w-full text-left p-6 rounded-sm border transition duration-500 ${activeOption === idx
                      ? 'border-gold-300/50 bg-gold-300/10'
                      : 'border-bone/10 hover:border-bone/20 bg-ink-900/30'
                    }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-serif text-2xl italic text-bone mb-2">
                        {option.title}
                      </h3>
                      <p className="text-[14px] text-bone/65">
                        {option.description}
                      </p>
                    </div>
                    <ArrowRight
                      size={20}
                      className={`shrink-0 mt-1 text-gold-300/70 transition ${activeOption === idx ? 'rotate-90' : ''
                        }`}
                    />
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Options Display */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeOption}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="p-8 rounded-sm border border-bone/10 bg-gradient-to-br from-gold-300/5 to-transparent"
              >
                <p className="text-[10px] uppercase tracking-editorial text-gold-300/75 mb-6">
                  {CUSTOMIZATION_OPTIONS[activeOption].title}
                </p>
                {CUSTOMIZATION_OPTIONS[activeOption].title === 'Colors' ? (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {COLOR_PALETTES.map((palette) => (
                      <motion.div
                        key={palette.name}
                        whileHover={{ y: -4 }}
                        className="group relative overflow-hidden rounded-sm border border-gold-300/10 bg-ink-900/60 p-3.5 transition-all duration-300 hover:border-gold-300/35"
                      >
                        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm mb-2.5">
                          <Image
                            src={palette.image}
                            alt={`${palette.name} yarn color pom-poms`}
                            fill
                            sizes="(min-width: 1024px) 25vw, 50vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                          />
                        </div>
                        <h4 className="font-serif text-base italic text-bone mb-0.5">
                          {palette.name}
                        </h4>
                        <p className="text-[11px] leading-relaxed text-bone/60">
                          {palette.description}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {CUSTOMIZATION_OPTIONS[activeOption].options.map((opt) => (
                      <motion.button
                        key={opt}
                        whileHover={{ scale: 1.05 }}
                        className="px-4 py-3 rounded-sm border border-gold-300/30 bg-gold-300/10 text-bone text-sm transition hover:bg-gold-300/20 hover:border-gold-300/50"
                      >
                        {opt}
                      </motion.button>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="relative px-5 py-20 sm:px-6 lg:px-12">
        <div className="mx-auto max-w-[1500px] border-t border-bone/10 pt-16">
          <div data-reveal className="mb-16">
            <span className="mb-5 flex items-center gap-4 text-[10px] uppercase tracking-editorial text-gold-300/75">
              <span className="h-px w-10 bg-gold-300/50" />
              The Journey
            </span>
            <h2 className="font-serif text-[clamp(2.8rem,6vw,6.4rem)] font-medium leading-[0.94] tracking-tightest text-bone">
              Six Steps to Perfection
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {PROCESS_STEPS.map((item) => (
              <motion.div
                key={item.step}
                data-reveal
                className="relative p-8 rounded-sm border border-bone/10 hover:border-gold-300/30 hover:bg-ink-900/60 transition duration-500"
              >
                <p className="font-serif text-5xl font-light italic text-gold-300/70 mb-4">
                  {item.step}
                </p>
                <h3 className="font-serif text-xl italic text-bone mb-3">
                  {item.title}
                </h3>
                <p className="text-[13px] leading-relaxed text-bone/68">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase Projects */}
      <section className="relative px-5 py-20 sm:px-6 lg:px-12">
        <div className="mx-auto max-w-[1500px] border-t border-bone/10 pt-16">
          <div data-reveal className="mb-16">
            <span className="mb-5 flex items-center gap-4 text-[10px] uppercase tracking-editorial text-gold-300/75">
              <span className="h-px w-10 bg-gold-300/50" />
              Recent Commissions
            </span>
            <h2 className="font-serif text-[clamp(2.8rem,6vw,6.4rem)] font-medium leading-[0.94] tracking-tightest text-bone">
              Custom Creations
            </h2>
          </div>

          <div className="space-y-16">
            {CUSTOM_PROJECTS.map((project, idx) => (
              <motion.article
                key={project.id}
                data-reveal
                className="grid gap-8 items-center lg:grid-cols-2 lg:gap-14"
              >
                {/* Text content container */}
                <div className={idx % 2 === 1 ? 'lg:order-2' : ''}>
                  <p className="text-[10px] uppercase tracking-editorial text-gold-300/70 mb-4">
                    {project.type}
                  </p>
                  <h3 className="font-serif text-4xl italic text-bone mb-6 md:text-5xl">
                    {project.title}
                  </h3>
                  <p className="text-[15px] leading-[1.85] text-bone/72 mb-8">
                    {project.description}
                  </p>
                </div>

                {/* Image container */}
                <motion.div
                  whileHover={{ scale: 0.99 }}
                  className={`relative min-h-[400px] overflow-hidden rounded-sm border border-bone/10 ${
                    idx % 2 === 1 ? 'lg:order-1' : ''
                  }`}
                >
                  <div data-parallax className="absolute inset-[-4%]">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/40 to-transparent" />
                </motion.div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-5 py-20 sm:px-6 lg:px-12">
        <div className="mx-auto max-w-[1500px] border-t border-bone/10 pt-16 text-center">
          <motion.div data-reveal>
            <span className="mb-6 inline-flex items-center gap-4 text-[10px] uppercase tracking-editorial text-gold-300/75">
              <span className="h-px w-10 bg-gold-300/50" />
              Begin Your Design Journey
              <span className="h-px w-10 bg-gold-300/50" />
            </span>
            <h2 className="font-serif text-[clamp(2.8rem,6vw,6.4rem)] font-medium leading-[0.94] tracking-tightest text-bone mb-8">
              Ready for Your Custom Rug?
            </h2>
            <p className="mx-auto max-w-2xl text-[15px] font-light leading-[1.85] text-bone/70 mb-10 md:text-lg">
              Let our design team help you create something extraordinary. Schedule a consultation to explore your custom possibilities.
            </p>
            <LuxuryButton variant="primary" href="/contact">
              Schedule Design Consultation
            </LuxuryButton>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
