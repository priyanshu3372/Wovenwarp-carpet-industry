'use client';

import { ReactNode, useRef, useState, MouseEvent } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { ArrowUpRight } from 'lucide-react';

type Variant = 'primary' | 'ghost';

type Props = {
  children: ReactNode;
  variant?: Variant;
  href?: string;
  className?: string;
  showArrow?: boolean;
};

export default function LuxuryButton({
  children,
  variant = 'primary',
  href = '#',
  className,
  showArrow = true,
}: Props) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const onMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPos({ x: x * 0.25, y: y * 0.4 });
  };

  const onLeave = () => setPos({ x: 0, y: 0 });

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 220, damping: 16, mass: 0.45 }}
      className={clsx(
        'btn-silk group relative inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-center text-[clamp(0.625rem,1.5vw,0.75rem)] uppercase tracking-[0.18em] transition-colors duration-500 sm:w-auto sm:gap-3 sm:px-7 sm:py-4 sm:tracking-editorial',
        variant === 'primary' && 'btn-silk-primary text-bone',
        variant === 'ghost' && 'btn-ghost text-bone/85 hover:text-bone',
        className
      )}
    >
      <span className="relative z-10 inline-flex items-center gap-2 sm:gap-3">
        <span className="font-medium leading-snug sm:whitespace-nowrap">{children}</span>
        {showArrow && (
          <span className="relative inline-flex h-5 w-5 items-center justify-center overflow-hidden">
            <ArrowUpRight
              size={14}
              className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-3 group-hover:-translate-y-3"
            />
            <ArrowUpRight
              size={14}
              className="absolute -translate-x-3 translate-y-3 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 group-hover:translate-y-0"
            />
          </span>
        )}
      </span>

      {/* elegant border animation for ghost */}
      {variant === 'ghost' && (
        <>
          <span className="pointer-events-none absolute inset-0 rounded-full">
            <span className="absolute inset-0 rounded-full border border-bone/15" />
            <span className="absolute inset-0 rounded-full border border-gold-400/0 group-hover:border-gold-400/40 transition-colors duration-700" />
          </span>
        </>
      )}
    </motion.a>
  );
}
