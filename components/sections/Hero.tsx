"use client";

import { useEffect, useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import AmbientLayer from '@/components/ui/AmbientLayer';
import CursorLight from '@/components/ui/CursorLight';
import LuxuryButton from '@/components/ui/LuxuryButton';
import HeritageSeal from '@/components/ui/HeritageSeal';
import { ScrollIndicator, VerticalSocials } from '@/components/ui/SideRails';

const HEADLINE_LINES: string[][] = [
  ['Quiet', 'Luxury,'],
  ['Handcrafted'],
  ['Through'],
  ['Generations'],
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.22]);
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const bgOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.38]);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-17%']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.82], [1, 0]);

  useLayoutEffect(() => {
    let ctx: any = null;
    let gsap: any = null;

    async function initGsap() {
      const gsapModule = await import('gsap');
      gsap = gsapModule.default ?? gsapModule;
      const rootEl = sectionRef.current;
      const bgEl = bgRef.current;
      if (!rootEl || !bgEl) return;

      ctx = gsap.context(() => {
        gsap.fromTo(
          bgEl,
          { scale: 1.24, filter: 'blur(12px) brightness(0.62)' },
          {
            scale: 1.08,
            filter: 'blur(0px) brightness(1)',
            duration: 2.4,
            delay: 0.45,
            ease: 'expo.out',
          }
        );

        gsap.fromTo(
          '.hero-eyebrow',
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 1.15, delay: 0.9, ease: 'power3.out' }
        );
      }, rootEl);
    }

    initGsap();

    return () => {
      if (ctx && typeof ctx.revert === 'function') ctx.revert();
    };
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    const bg = bgRef.current;
    if (!el || !bg) return;

    let raf = 0;
    const target = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      target.x = ((e.clientX - rect.left) / rect.width - 0.5) * 18;
      target.y = ((e.clientY - rect.top) / rect.height - 0.5) * 12;
    };

    const tick = () => {
      cur.x += (target.x - cur.x) * 0.05;
      cur.y += (target.y - cur.y) * 0.05;
      bg.style.transform = `translate3d(${cur.x}px, ${cur.y}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    el.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(tick);

    return () => {
      el.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="cursor-light relative min-h-[100svh] w-full overflow-hidden bg-ink-950 sm:min-h-[92svh]"
    >
      <CursorLight targetRef={sectionRef} />

      <motion.div
        style={{ scale: bgScale, y: bgY, opacity: bgOpacity }}
        className="absolute inset-0 z-0"
      >
        <motion.div
          ref={bgRef}
          className="absolute inset-[-4%] cinematic-bg will-change-transform"
          whileHover={{ scale: 1.012 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src="/images/hero-bg.png"
            alt="Handwoven rugs draped through a warm arched Mediterranean interior"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[68%_center] sm:object-[61%_center]"
          />
        </motion.div>
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(100deg, rgba(10,7,6,0.82) 0%, rgba(10,7,6,0.6) 28%, rgba(10,7,6,0.2) 54%, rgba(10,7,6,0.02) 82%)',
          }}
        />
        <div
          aria-hidden
          className="absolute inset-y-0 right-0 w-[36%] hidden sm:block"
          style={{
            background:
              'radial-gradient(ellipse at 62% 42%, rgba(255,190,100,0.14), transparent 64%)',
          }}
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-[30%]"
          style={{
            background:
              'linear-gradient(180deg, transparent 0%, rgba(10,7,6,0.58) 62%, rgba(10,7,6,0.92) 100%)',
          }}
        />
      </motion.div>

      <AmbientLayer />
      <VerticalSocials />

      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1600px] flex-col px-4 pb-[calc(env(safe-area-inset-bottom)+4.5rem)] pt-[8.25rem] sm:min-h-[92svh] sm:px-6 sm:pb-16 sm:pt-32 md:px-12 md:pt-36 lg:px-24 lg:pt-40"
      >
        <div className="grid flex-1 grid-cols-12 items-center gap-4 sm:gap-6">
          <div className="relative col-span-12 max-w-4xl lg:col-span-7 xl:col-span-7">
            <div className="hero-eyebrow mb-4 flex items-center gap-3 sm:mb-7 sm:gap-4 md:mb-8">
              <span className="h-px w-7 bg-gold-300/60 sm:w-10 md:w-12" />
              <span className="text-[0.66rem] uppercase tracking-[0.22em] text-bone/70 sm:text-[clamp(0.625rem,1.5vw,0.75rem)] sm:tracking-editorial">
                WOVEN INTO LEGACY
              </span>
            </div>

            <h1 className="max-w-[12ch] font-serif text-[clamp(2.25rem,13vw,7.6rem)] font-medium leading-[0.92] tracking-tightest text-bone sm:max-w-none sm:text-[clamp(3rem,8vw,7.6rem)]">
              {HEADLINE_LINES.map((line, lineIdx) => (
                <span key={lineIdx} className="block">
                  {line.map((word, wIdx) => {
                    const totalDelay = 0.95 + lineIdx * 0.16 + wIdx * 0.07;
                    const isAccent =
                      word === 'Luxury,' || word === 'Generations';

                    return (
                      <span key={`${lineIdx}-${wIdx}`} className="reveal-mask">
                        <motion.span
                          initial={{ y: '120%' }}
                          animate={{ y: '0%' }}
                          transition={{
                            duration: 1.15,
                            ease: [0.22, 1, 0.36, 1],
                            delay: totalDelay,
                          }}
                          className={`inline-block pr-[0.22em] ${isAccent ? 'font-light italic' : ''
                            }`}
                        >
                          {isAccent ? (
                            <span
                              style={{
                                background:
                                  'linear-gradient(180deg, #efe6d8 0%, #d8b89a 55%, #b8501c 120%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                              }}
                            >
                              {word}
                            </span>
                          ) : (
                            word
                          )}
                        </motion.span>
                      </span>
                    );
                  })}
                </span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.1,
                delay: 1.75,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-6 sm:mt-8 max-w-xl text-[clamp(0.875rem,2vw,1rem)] font-light leading-[1.7] text-bone/74 md:mt-10 md:leading-[1.75]"
            >
              Contemporary handcrafted rugs shaped by timeless weaving
              traditions, refined textures, and modern design sensibilities.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.1,
                delay: 1.95,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-6 flex w-full flex-col items-stretch gap-3 sm:mt-8 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 md:mt-9"
            >
              <LuxuryButton variant="primary" href="#collections">
                Explore Collections
              </LuxuryButton>
              <LuxuryButton variant="ghost" href="#our-heritage" showArrow={false}>
                Discover Heritage
              </LuxuryButton>
            </motion.div>

          </div>

          <div className="relative col-span-12 hidden h-full flex-col items-end justify-between pb-16 sm:pb-24 pt-8 sm:pt-12 lg:col-span-5 lg:flex">
            <HeritageSeal />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 2.2 }}
              className="max-w-[280px] sm:max-w-[320px] text-right text-sm sm:text-base"
            >
              <span className="mb-2 sm:mb-3 block text-[clamp(0.625rem,1.5vw,0.75rem)] uppercase tracking-editorial text-bone/55 whitespace-normal">
                Featured Piece
              </span>
              <span className="block font-serif text-[clamp(1rem,2vw,1.375rem)] italic leading-snug text-bone/85">
                Atlas No. 07, hand-knotted in undyed wool and natural madder,
                woven over ninety-four quiet days.
              </span>
              <div className="mt-4 sm:mt-5 flex items-center justify-end gap-2 sm:gap-3">
                <span className="h-px w-8 sm:w-10 bg-bone/35" />
                <span className="text-[clamp(0.625rem,1.5vw,0.75rem)] uppercase tracking-editorial text-bone/55 whitespace-nowrap">
                  Master Weaver
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="relative mt-auto hidden pt-6 sm:pt-8 sm:block">
          <div className="hairline h-px w-full" />
          <div className="mt-4 sm:mt-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 text-[clamp(0.625rem,1.5vw,0.75rem)] uppercase tracking-editorial text-bone/45">
            <span className="order-1 sm:order-none">Handwoven Rugs - Textiles - Timeless Spaces</span>
            <span className="hidden md:block">Wovenwarp - Heritage Atelier</span>
            <span className="hidden lg:block">Bhadohi, Uttar Pradesh, India</span>
          </div>
        </div>
      </motion.div>

      <ScrollIndicator />
    </section>
  );
}
