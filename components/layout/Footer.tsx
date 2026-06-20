"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MessageCircle,
  MapPin,
  Phone,
  Youtube,
} from 'lucide-react';
import BehanceMark from '@/components/ui/BehanceMark';
import { useWaitlist } from '@/components/providers/WaitlistProvider';


const CONTACT_EMAILS = ['info@wovenwarp.com', 'contact@wovenwarp.com'];
const PHONE_DISPLAY = '+91 87369 11035';
const PHONE_TEL = '+918736911035';
const WHATSAPP_URL = `https://wa.me/${PHONE_TEL.replace('+', '')}`;

const FOOTER_LINKS = [
  {
    title: 'Explore',
    links: [
      { label: 'Collections', href: '/collections' },
      { label: 'Living Ledger', href: '/ledger' },
      { label: 'Gallery', href: '/gallery' },
    ],
  },
  {
    title: 'Atelier',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Heritage Archive', href: '/lmcarpets' },
      { label: 'Contact Atelier', href: '/contact' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Waitlist Registration', href: '#waitlist-trigger' },
      { label: 'Provenance Query', href: '/ledger' },
      { label: 'WhatsApp Help', href: WHATSAPP_URL },
    ],
  },
];


const SOCIAL_LINKS = [
  {
    icon: Instagram,
    label: 'Instagram',
    handle: '@wovenwarp',
    href: 'https://www.instagram.com/wovenwarp?igsh=NDBnOTRkODJuM3l6',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    handle: '@wovenwarp',
    href: 'https://www.linkedin.com/company/wovenwarp/about/?viewAsMember=true',
  },
  {
    icon: Facebook,
    label: 'Facebook',
    handle: '@wovenwarp',
    href: 'https://www.facebook.com/share/1BbCVUk2mH/',
  },
  {
    icon: BehanceMark,
    label: 'Behance',
    handle: '@wovenwarp',
    href: 'https://www.behance.net/wovenwarp',
  },
  {
    icon: Youtube,
    label: 'YouTube',
    handle: '@wovenwarp',
    href: 'https://youtube.com/@wovenwarp?si=2xN0KuOCKFeC2jUu',
  },
];

export default function Footer() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const { openWaitlist } = useWaitlist();
  return (
    <footer className="relative overflow-hidden border-t border-bone/10 bg-ink-950">
      <div className="absolute inset-0 bg-noise opacity-[0.018]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-300/40 to-transparent" />

      <div className="relative mx-auto max-w-[1600px] px-4 py-16 sm:px-6 sm:py-20 md:py-24 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="grid gap-8 sm:gap-10 border-b border-bone/10 pb-10 sm:pb-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-end"
        >
          <div>
            <p className="mb-4 sm:mb-5 flex items-center gap-3 sm:gap-4 text-[clamp(0.625rem,1.5vw,0.75rem)] uppercase tracking-editorial text-gold-300/75">
              <span className="h-px w-8 sm:w-10 bg-gold-300/50" />
              The Atelier Notes
            </p>
            <h2 className="max-w-3xl font-serif text-[clamp(2rem,5vw,5.4rem)] font-medium leading-[0.95] tracking-tightest text-bone">
              Woven for homes with memory, texture, and soul.
            </h2>
          </div>
        </motion.div>

        <div className="grid gap-8 sm:gap-10 md:gap-12 py-10 sm:py-14 md:grid-cols-12 lg:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.05, ease: 'easeOut', delay: 0.05 }}
            viewport={{ once: true }}
            className="md:col-span-5 lg:col-span-4"
          >
            <a href="/" className="group inline-flex items-center gap-3 sm:gap-4">
              <span
                className="logo-symbol h-12 w-12 sm:h-14 sm:w-14 shrink-0 transition-transform duration-700 group-hover:scale-[1.04]"
                style={{
                  backgroundImage: "url('/images/logo.png')",
                  backgroundSize: '230% auto',
                  backgroundPosition: 'center 13%',
                  backgroundRepeat: 'no-repeat',
                }}
              />
              <span className="flex flex-col leading-none">
                <span className="font-serif text-[clamp(1rem,2.5vw,1.25rem)] font-medium tracking-[0.3em] text-bone">
                  <span className="wordmark-shimmer">WOVEN</span>
                  <span className="wordmark-shimmer-gold">WARP</span>
                </span>
                <span className="mt-1.5 sm:mt-2 text-[clamp(0.5rem,1.5vw,0.55rem)] uppercase tracking-[0.36em] text-gold-300/75">
                  Woven Into Legacy
                </span>
              </span>
            </a>

            <p className="mt-6 sm:mt-7 max-w-sm text-[clamp(0.75rem,1.8vw,0.875rem)] leading-[1.7] text-bone/64">
              Contemporary handcrafted rugs shaped by heritage weaving,
              considered materials, and bespoke design sensibilities.
            </p>

            <div className="mt-6 sm:mt-8">
              <p className="text-[clamp(0.625rem,1.5vw,0.75rem)] uppercase tracking-editorial text-gold-300/70">
                Social Handle
              </p>
              <a
                href="https://www.instagram.com/wovenwarp?igsh=NDBnOTRkODJuM3l6"
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex items-center gap-2 font-serif text-[clamp(1.25rem,2.5vw,2rem)] italic text-bone transition hover:text-gold-300"
              >
                @wovenwarp
                <ArrowUpRight size={18} aria-hidden />
              </a>
            </div>
          </motion.div>

          {FOOTER_LINKS.map((column, index) => (
            <motion.nav
              key={column.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.05,
                ease: 'easeOut',
                delay: 0.1 + index * 0.04,
              }}
              viewport={{ once: true }}
              aria-label={column.title}
              className="md:col-span-4 lg:col-span-2"
            >
              <h3 className="mb-4 sm:mb-6 text-[clamp(0.625rem,1.5vw,0.75rem)] font-semibold uppercase tracking-editorial text-gold-300/75">
                <button
                  type="button"
                  onClick={() => setOpenIdx(openIdx === index ? null : index)}
                  className="flex w-full items-center justify-between md:justify-start"
                >
                  <span>{column.title}</span>
                  <span className="md:hidden text-bone/60">{openIdx === index ? '\u2013' : '+'}</span>
                </button>
              </h3>

              <ul
                className={
                  `space-y-2 sm:space-y-3 md:block overflow-hidden transition-all duration-300 ` +
                  (openIdx === index ? 'max-h-72 py-2' : 'max-h-0') +
                  ' md:max-h-full'
                }
                aria-hidden={openIdx !== index}
              >
                {column.links.map((link) => (
                  <li key={link.label}>
                    {link.href === '#waitlist-trigger' ? (
                      <button
                        onClick={openWaitlist}
                        className="text-[clamp(0.75rem,1.8vw,0.875rem)] text-bone/62 transition hover:text-gold-300 block py-1 min-h-[44px] flex items-center text-left"
                      >
                        {link.label}
                      </button>
                    ) : (
                      <a
                        href={link.href}
                        className="text-[clamp(0.75rem,1.8vw,0.875rem)] text-bone/62 transition hover:text-gold-300 block py-1 min-h-[44px] flex items-center"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </motion.nav>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.05, ease: 'easeOut', delay: 0.22 }}
            viewport={{ once: true }}
            className="md:col-span-7 lg:col-span-2"
          >
            <h3 className="mb-4 sm:mb-6 text-[clamp(0.625rem,1.5vw,0.75rem)] font-semibold uppercase tracking-editorial text-gold-300/75">
              Visit & Connect
            </h3>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex gap-2 sm:gap-3 text-[clamp(0.75rem,1.8vw,0.875rem)] leading-[1.6] text-bone/64 min-h-[44px] items-start">
                <MapPin size={16} className="mt-1 sm:mt-0.5 shrink-0 text-gold-300/70" />
                <span>
                  Bhadohi, Uttar Pradesh, India
                </span>
              </li>
              <li className="flex gap-2 sm:gap-3 min-h-[44px] items-start">
                <Mail size={16} className="mt-1 sm:mt-0.5 shrink-0 text-gold-300/70" />
                <span className="flex flex-col gap-1">
                  {CONTACT_EMAILS.map((email) => (
                    <a
                      key={email}
                      href={`mailto:${email}`}
                      className="text-[clamp(0.75rem,1.8vw,0.875rem)] text-bone/64 transition hover:text-bone break-all"
                    >
                      {email}
                    </a>
                  ))}
                </span>
              </li>
              <li className="flex gap-2 sm:gap-3 min-h-[44px] items-start">
                <Phone size={16} className="mt-1 sm:mt-0.5 shrink-0 text-gold-300/70" />
                <a
                  href={`tel:${PHONE_TEL}`}
                  className="text-[clamp(0.75rem,1.8vw,0.875rem)] text-bone/64 transition hover:text-bone"
                >
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li className="flex gap-2 sm:gap-3 min-h-[44px] items-start">
                <MessageCircle
                  size={16}
                  className="mt-1 sm:mt-0.5 shrink-0 text-gold-300/70"
                />
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[clamp(0.75rem,1.8vw,0.875rem)] text-bone/64 transition hover:text-bone"
                >
                  WhatsApp {PHONE_DISPLAY}
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.15 }}
          viewport={{ once: true }}
          className="flex flex-col gap-6 sm:gap-8 border-t border-bone/10 pt-6 sm:pt-8 lg:flex-row lg:items-center lg:justify-between"
        >
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {SOCIAL_LINKS.map((social) => {
              const Icon = social.icon;

              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${social.label}: ${social.handle}`}
                  className="group inline-flex min-h-[44px] min-w-[44px] items-center gap-2 sm:gap-3 rounded-full border border-bone/15 px-3 sm:px-4 py-2 text-bone/62 transition hover:border-gold-300/55 hover:text-gold-300"
                >
                  <Icon size={16} aria-hidden />
                  <span className="hidden sm:inline text-[clamp(0.625rem,1.5vw,0.75rem)] uppercase tracking-[0.18em]">
                    {social.handle}
                  </span>
                </a>
              );
            })}
          </div>

          <div className="flex flex-col gap-2 text-[clamp(0.625rem,1.5vw,0.75rem)] uppercase tracking-editorial text-bone/42 sm:flex-row sm:items-center sm:gap-4 lg:gap-5">
            <p>Copyright 2026 Wovenwarp. All rights reserved.</p>
            <span className="hidden h-3 w-px bg-bone/12 sm:block" />
            <p>Handwoven Rugs / Textiles / Timeless Spaces</p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
