'use client';

import { useEffect, useRef } from 'react';

export default function CursorLight({ targetRef }: { targetRef: React.RefObject<HTMLElement> }) {
  const raf = useRef<number | null>(null);
  const target = useRef({ x: 0.5, y: 0.5 });
  const current = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const el = targetRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      target.current.x = (e.clientX - rect.left) / rect.width;
      target.current.y = (e.clientY - rect.top) / rect.height;
    };

    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * 0.08;
      current.current.y += (target.current.y - current.current.y) * 0.08;
      el.style.setProperty('--cursor-x', `${current.current.x * 100}%`);
      el.style.setProperty('--cursor-y', `${current.current.y * 100}%`);
      raf.current = requestAnimationFrame(tick);
    };

    el.addEventListener('mousemove', onMove);
    raf.current = requestAnimationFrame(tick);

    return () => {
      el.removeEventListener('mousemove', onMove);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [targetRef]);

  return null;
}
