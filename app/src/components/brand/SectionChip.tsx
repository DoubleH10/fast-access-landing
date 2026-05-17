/**
 * SectionChip — small orange-dot pill used as eyebrow above every section
 * heading (brandbook pg 56: "Introduction", "Logo", "Colors", "Typeface",
 * "Visual Elements", "Brand Applications").
 */

import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  onDark?: boolean;
  className?: string;
}

export default function SectionChip({ children, onDark = false, className = '' }: Props) {
  return (
    <span className={`section-chip${onDark ? ' section-chip--on-dark' : ''} ${className}`.trim()}>
      {children}
    </span>
  );
}
