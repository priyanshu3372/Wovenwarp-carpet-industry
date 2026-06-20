'use client';

import { useRef, useState, ReactNode, MouseEvent } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

type Props = {
  children: ReactNode;
  className?: string;
  strength?: number;
  as?: 'a' | 'button';
  href?: string;
  onClick?: () => void;
};

export default function MagneticLink({
  children,
  className,
  strength = 0.35,
  as = 'a',
  href = '#',
  onClick,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPos({ x: x * strength, y: y * strength });
  };

  const handleLeave = () => setPos({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 180, damping: 14, mass: 0.4 }}
      className={clsx('inline-flex', className)}
    >
      {as === 'a' ? (
        <a href={href} className="contents">
          {children}
        </a>
      ) : (
        <button type="button" onClick={onClick} className="contents">
          {children}
        </button>
      )}
    </motion.div>
  );
}
