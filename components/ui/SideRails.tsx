'use client';

import { motion } from 'framer-motion';

const SOCIALS = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/wovenwarp?igsh=NDBnOTRkODJuM3l6',
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com/@wovenwarp?si=2xN0KuOCKFeC2jUu',
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/share/1BbCVUk2mH/',
  },
  {
    label: 'Behance',
    href: 'https://www.behance.net/wovenwarp',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/wovenwarp/about/?viewAsMember=true',
  },
];

export function VerticalSocials() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 2.5 }}
      className="absolute right-6 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-8 xl:flex"
    >
      <span className="h-20 w-px bg-bone/20" />
      {SOCIALS.map((s, i) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noreferrer"
          className="group relative text-[10px] tracking-editorial uppercase text-bone/55 hover:text-bone transition-colors duration-500"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          <span className="relative">
            {s.label}
            <span className="absolute -left-1 top-0 h-0 w-px bg-bone/70 group-hover:h-full transition-all duration-700" />
          </span>
        </a>
      ))}
      <span className="h-20 w-px bg-bone/20" />
    </motion.div>
  );
}

export function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 2.7 }}
      className="absolute bottom-8 left-1/2 z-30 hidden -translate-x-1/2 flex-col items-center gap-3 sm:flex"
    >
      <span className="text-[10px] tracking-editorial uppercase text-bone/55">
        Scroll
      </span>
      <div className="relative h-12 w-px bg-bone/15 overflow-hidden">
        <span className="absolute inset-x-0 top-0 h-full w-px bg-bone animate-scroll-line" />
      </div>
    </motion.div>
  );
}
