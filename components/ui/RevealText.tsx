'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import clsx from 'clsx';

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  as?: 'span' | 'div';
};

export default function RevealText({
  children,
  className,
  delay = 0,
  duration = 1.1,
  as = 'span',
}: Props) {
  const Wrapper: any = as;
  return (
    <Wrapper className={clsx('reveal-mask align-bottom', className)}>
      <motion.span
        initial={{ y: '120%' }}
        animate={{ y: '0%' }}
        transition={{
          duration,
          ease: [0.22, 1, 0.36, 1],
          delay,
        }}
        className="inline-block"
      >
        {children}
      </motion.span>
    </Wrapper>
  );
}
