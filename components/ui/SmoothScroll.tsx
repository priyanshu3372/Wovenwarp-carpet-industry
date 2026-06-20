'use client';

import { useEffect } from 'react';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let lenis: any | null = null;
    let rafId = 0;

    const isTouchDevice = () => {
      return (
        typeof window !== 'undefined' &&
        ('ontouchstart' in window ||
          navigator.maxTouchPoints > 0 ||
          (navigator as any).msMaxTouchPoints > 0)
      );
    };

    async function init() {
      if (isTouchDevice()) return;

      const LenisModule = await import('@studio-freight/lenis');
      const Lenis = LenisModule.default ?? LenisModule;

      lenis = new Lenis({
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.1,
      });

      if (typeof window !== 'undefined') {
        (window as any).lenis = lenis;
      }

      const raf = (time: number) => {
        lenis!.raf(time);
        rafId = requestAnimationFrame(raf);
      };

      rafId = requestAnimationFrame(raf);
    }

    init();

    return () => {
      cancelAnimationFrame(rafId);
      if (lenis && typeof lenis.destroy === 'function') lenis.destroy();
      if (typeof window !== 'undefined' && (window as any).lenis === lenis) {
        (window as any).lenis = null;
      }
    };
  }, []);

  return <>{children}</>;
}
