'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import clsx from 'clsx';
import PreLaunchBanner from './PreLaunchBanner';
import { useWaitlist } from '@/components/providers/WaitlistProvider';

const NAV_ITEMS = [
  'Collections',
  'Living Ledger',
  'Gallery',
  'About Us',
];

const PHONE_TEL = '+918736911035';
const WHATSAPP_URL = `https://wa.me/${PHONE_TEL.replace('+', '')}`;

const toHref = (item: string) => {
  if (item === 'Collections') return '/collections';
  if (item === 'Gallery') return '/gallery';
  if (item === 'Living Ledger') return '/ledger';
  if (item === 'About Us') return '/about';
  return `/#${item.toLowerCase().replace(/\s+/g, '-')}`;
};


export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const { scrollY } = useScroll();
  const padY = useTransform(scrollY, [0, 220], [12, 8]);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Manage body scroll lock, focus trapping and accessibility for mobile menu
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const mainEl = document.querySelector('main');
    const restore = () => {
      document.body.style.overflow = prevOverflow || '';
      document.documentElement.style.overflow = prevHtmlOverflow || '';
      if (mainEl) mainEl.removeAttribute('aria-hidden');
    };

    if (mobileOpen) {
      // lock scroll on both html and body to prevent background scrolling
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      if (mainEl) mainEl.setAttribute('aria-hidden', 'true');

      // set focus into menu
      requestAnimationFrame(() => {
        const menu = menuRef.current;
        const focusable = menu?.querySelector<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        (focusable ?? menu)?.focus();
      });

      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setMobileOpen(false);
        if (e.key === 'Tab') {
          // simple focus trap
          const menu = menuRef.current;
          if (!menu) return;
          const nodes = Array.from(
            menu.querySelectorAll<HTMLElement>(
              'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
            )
          ).filter((n) => n.offsetParent !== null);
          if (nodes.length === 0) return;
          const first = nodes[0];
          const last = nodes[nodes.length - 1];
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      };

      document.addEventListener('keydown', onKey);
      return () => {
        document.removeEventListener('keydown', onKey);
        restore();
        // restore focus to hamburger
        menuButtonRef.current?.focus();
      };
    }

    // menu closed
    restore();
    return () => { };
  }, [mobileOpen]);

  const { openWaitlist } = useWaitlist();

  return (
    <div className="fixed left-0 right-0 top-0 z-50 w-full flex flex-col">
      <PreLaunchBanner />
      <motion.header
        ref={ref}
        style={{ paddingTop: padY, paddingBottom: padY }}
        className={clsx(
          'glass-nav transition-all duration-700 w-full relative border-t border-gold-300/5',
          scrolled && 'scrolled'
        )}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-3 px-3 sm:gap-5 sm:px-6 lg:px-12 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="group flex min-w-0 items-center gap-2 sm:gap-3 md:gap-4"
          >
            <Link
              href="/"
              aria-label="Wovenwarp - Woven Into Legacy"
              className="flex min-w-0 items-center gap-2 sm:gap-3 md:gap-4"
            >
              <div
                className="logo-symbol relative h-9 w-9 shrink-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06] sm:h-12 sm:w-12 md:h-14 md:w-14 lg:h-16 lg:w-16"
                style={{
                  backgroundImage: "url('/images/logo.webp')",
                  backgroundSize: '230% auto',
                  backgroundPosition: 'center 13%',
                  backgroundRepeat: 'no-repeat',
                }}
              />

              <div className="hidden flex-col leading-none sm:flex">
                <span className="font-serif text-[clamp(0.875rem,2.5vw,1.25rem)] font-medium tracking-[0.36em] [filter:drop-shadow(0_1px_18px_rgba(230,199,137,0.18))]">
                  <span className="wordmark-shimmer">WOVEN</span>
                  <span className="wordmark-shimmer-gold">WARP</span>
                </span>
                <span aria-hidden className="mt-2 flex items-center gap-2">
                  <span className="h-px w-4 bg-gradient-to-r from-transparent to-gold-400/70 sm:w-5" />
                  <span className="text-[clamp(0.5rem,1.5vw,0.55rem)] uppercase tracking-[0.38em] text-gold-300 [text-shadow:0_0_10px_rgba(230,199,137,0.4)]">
                    Woven Into Legacy
                  </span>
                  <span className="h-px w-4 bg-gradient-to-l from-transparent to-gold-400/70 sm:w-5" />
                </span>
              </div>
            </Link>
          </motion.div>

          <nav className="hidden items-center gap-4 xl:flex 2xl:gap-9 lg:gap-6">
            {NAV_ITEMS.map((item, i) => (
              <Link
                key={item}
                href={toHref(item)}
                className="nav-link whitespace-nowrap text-[clamp(0.6rem,1.2vw,0.75rem)] uppercase text-bone/75 transition-colors duration-300 hover:text-bone"
              >
                <motion.span
                  className="inline-block"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 1.2 + i * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {item}
                </motion.span>
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="xl:hidden flex items-center justify-center">
            <button
              ref={menuButtonRef}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMobileOpen((s) => !s)}
              className="inline-flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded p-2 text-bone/90 transition-colors hover:text-bone"
            >
              <Menu size={22} />
            </button>
          </div>

          <div className="hidden xl:block">
            <button
              onClick={openWaitlist}
              className="inline-flex min-h-[38px] items-center justify-center rounded-full border border-gold-300/30 bg-gold-300/10 px-5 text-[clamp(0.6rem,1.2vw,0.75rem)] font-semibold uppercase tracking-widest text-gold-300 hover:bg-gold-300 hover:text-ink-950 transition-all duration-300"
            >
              Request Access
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-stretch bg-[#0a0a0a]/[0.98] px-4 pb-[calc(env(safe-area-inset-bottom)+1.25rem)] pt-[calc(env(safe-area-inset-top)+1rem)] sm:px-6 sm:pt-6 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            id="mobile-navigation"
            onClick={() => setMobileOpen(false)}
          >
            <button
              type="button"
              aria-label="Exit menu"
              onClick={(event) => {
                event.stopPropagation();
                setMobileOpen(false);
              }}
              className="fixed right-4 top-[calc(env(safe-area-inset-top)+0.75rem)] z-[90] inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-gold-300/35 bg-ink-950/90 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-bone shadow-[0_12px_32px_rgba(0,0,0,0.35)] backdrop-blur-md transition hover:border-gold-300/70 hover:bg-gold-300/12 hover:text-gold-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-300/70 sm:right-6 sm:top-6 sm:px-5 md:right-8"
            >
              Exit
              <X size={16} aria-hidden />
            </button>

            <div
              ref={menuRef}
              onClick={(e) => e.stopPropagation()}
              className="relative mx-auto flex h-full w-full max-w-[780px] flex-col overflow-y-auto pt-14 sm:pt-16"
            >
              <div className="flex items-center justify-between py-4 sm:py-6">
                <Link href="/" className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
                  <div
                    className="logo-symbol h-12 w-12 shrink-0"
                    style={{
                      backgroundImage: "url('/images/logo.webp')",
                      backgroundSize: '230% auto',
                      backgroundPosition: 'center 13%',
                      backgroundRepeat: 'no-repeat',
                    }}
                  />
                  <span className="font-serif text-lg italic text-bone">Wovenwarp</span>
                </Link>
              </div>

              <nav className="mt-4 flex flex-col gap-3 px-2 sm:mt-8 sm:gap-6">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item}
                    href={toHref(item)}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-md px-2 py-3 text-[clamp(1.35rem,8vw,2.1rem)] uppercase leading-tight text-bone touch-manipulation hover:text-gold-300 sm:py-4"
                  >
                    {item}
                  </Link>
                ))}
              </nav>

              <div className="mt-auto px-2 py-8">
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    openWaitlist();
                  }}
                  className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-gold-300 px-6 py-3.5 text-center text-sm font-semibold uppercase tracking-wider text-ink-950 transition-colors hover:bg-gold-200"
                >
                  Request Waitlist Access
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
