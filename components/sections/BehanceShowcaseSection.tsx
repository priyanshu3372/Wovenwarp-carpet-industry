'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import BehanceMark from '@/components/ui/BehanceMark';

const BEHANCE_URL = 'https://www.behance.net/wovenwarp';

const BEHANCE_PROJECTS = [
  {
    title: 'Interior Stories',
    category: 'Rug Styling',
    image: '/images/lifestyle-living-room-01.webp',
  },
  {
    title: 'Heritage Motifs',
    category: 'Design Language',
    image: '/images/editorial-heritage-v1.webp',
  },
  {
    title: 'Material Studies',
    category: 'Wool & Yarn',
    image: '/images/material-yarn-bundles-01.webp',
  },
  {
    title: 'Craft Details',
    category: 'Hand Knotting',
    image: '/images/craft-handknotting-01.webp',
  },
];

export default function BehanceShowcaseSection() {
  return (
    <section id="behance" className="relative overflow-hidden bg-bone text-ink-950">
      <div className="absolute inset-0 bg-noise opacity-[0.035]" />
      <div className="relative mx-auto max-w-[1500px] px-4 py-12 sm:px-6 sm:py-16 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.05, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="mb-8 grid gap-6 sm:mb-12 lg:grid-cols-12 lg:items-end"
        >
          <div className="lg:col-span-7">
            <span className="mb-4 flex items-center gap-3 text-[clamp(0.625rem,1.5vw,0.75rem)] uppercase tracking-editorial text-ink-700/70 sm:mb-5 sm:gap-4">
              <span className="h-px w-8 bg-ink-700/25 sm:w-10" />
              Behance Portfolio
            </span>
            <h2 className="font-serif text-[clamp(2rem,5.5vw,6rem)] font-medium leading-[0.94] tracking-tightest text-ink-950">
              Recent Visual Work
            </h2>
          </div>
          <div className="lg:col-span-5 lg:flex lg:justify-end">
            <a
              href="/collections"
              className="group inline-flex min-h-[44px] items-center gap-3 rounded-full border border-ink-950/15 px-5 py-3 text-[clamp(0.625rem,1.5vw,0.75rem)] uppercase tracking-editorial text-ink-900 transition hover:border-ink-950/35 hover:bg-ink-950 hover:text-bone sm:px-6"
            >
              <BehanceMark size={18} />
              View Collections
              <ArrowUpRight
                size={15}
                className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                aria-hidden
              />
            </a>
          </div>
        </motion.div>

        <div className="grid gap-px overflow-hidden border border-ink-950/10 bg-ink-950/10 sm:grid-cols-2 lg:grid-cols-4">
          {BEHANCE_PROJECTS.map((project, index) => (
            <motion.a
              key={project.title}
              href={BEHANCE_URL}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.9,
                ease: 'easeOut',
                delay: index * 0.06,
              }}
              viewport={{ once: true }}
              className="group relative min-h-[280px] overflow-hidden bg-ink-950 sm:min-h-[320px] lg:min-h-[380px]"
            >
              <Image
                src={project.image}
                alt={`${project.title} from Wovenwarp Behance portfolio`}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/88 via-ink-950/16 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <p className="mb-2 text-[clamp(0.625rem,1.5vw,0.75rem)] uppercase tracking-editorial text-gold-300/80">
                  {project.category}
                </p>
                <div className="flex items-end justify-between gap-4">
                  <h3 className="font-serif text-[clamp(1.5rem,3vw,2.8rem)] italic leading-none text-bone">
                    {project.title}
                  </h3>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-bone/25 text-bone transition group-hover:border-gold-300/70 group-hover:text-gold-300">
                    <ArrowUpRight size={16} aria-hidden />
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
