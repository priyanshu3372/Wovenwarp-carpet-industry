'use client';

import { useEffect, useMemo, useRef } from 'react';

type Dust = {
  left: number;
  top: number;
  size: number;
  delay: number;
  dur: number;
  drift: number;
  opacity: number;
};

const seededRandom = (seed: number) => {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
};

const round = (value: number, decimals = 4) => Number(value.toFixed(decimals));

const makeDust = (index: number): Dust => ({
  left: round(seededRandom(index + 1) * 100, 5),
  top: round(seededRandom(index + 41) * 100, 5),
  size: round(1 + seededRandom(index + 81) * 3, 5),
  delay: round(seededRandom(index + 121) * -20, 5),
  dur: round(14 + seededRandom(index + 161) * 22, 5),
  drift: round((seededRandom(index + 201) - 0.5) * 60, 5),
  opacity: round(0.35 + seededRandom(index + 241) * 0.4, 5),
});

export default function AmbientLayer() {
  const dust = useMemo<Dust[]>(() => {
    return Array.from({ length: 28 }, (_, i) => makeDust(i));
  }, []);

  const grainRef = useRef<HTMLDivElement | null>(null);

  // continuous tiny shift of grain via rAF for organic feel
  useEffect(() => {
    let raf = 0;
    let t = 0;
    const tick = () => {
      t += 0.016;
      const el = grainRef.current;
      if (el) {
        const x = Math.sin(t * 0.7) * 12;
        const y = Math.cos(t * 0.9) * 14;
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <>
      {/* Radial warm light glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[3]"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 22% 38%, rgba(217,140,70,0.18) 0%, transparent 60%), radial-gradient(ellipse 45% 35% at 85% 70%, rgba(184,80,28,0.14) 0%, transparent 60%)',
        }}
      />

      {/* Vignette */}
      <div aria-hidden className="vignette" />

      {/* Grain */}
      <div ref={grainRef} aria-hidden className="grain-overlay" />

      {/* Floating dust particles */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-[7] overflow-hidden">
        {dust.map((d, i) => (
          <span
            key={i}
            className="dust"
            style={{
              left: `${d.left}%`,
              top: `${d.top}%`,
              width: `${d.size}px`,
              height: `${d.size}px`,
              opacity: d.opacity,
              animationName: 'dustFloat',
              animationDuration: `${d.dur}s`,
              animationTimingFunction: 'ease-in-out',
              animationDelay: `${d.delay}s`,
              animationIterationCount: 'infinite',
              animationDirection: 'alternate',
              ['--drift' as any]: `${d.drift}px`,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes dustFloat {
          0% {
            transform: translate3d(0, 0, 0);
            opacity: 0.2;
          }
          50% {
            opacity: 0.7;
          }
          100% {
            transform: translate3d(var(--drift), -120px, 0);
            opacity: 0.1;
          }
        }
      `}</style>
    </>
  );
}
