/**
 * Reveal — present-by-default scroll reveal.
 *
 * Children are always rendered. The `.reveal` class only hides them once
 * <html> has the `anim-ready` class (added in index.html at first paint),
 * then `.is-in` is applied when the element scrolls into view. If JS never
 * runs, content stays visible — see index.css "Reveal-on-scroll".
 *
 *   <Reveal>…</Reveal>                 // fades up when in view
 *   <Reveal delay={90}>…</Reveal>      // staggered
 *   <Reveal as="li" className="…">…</Reveal>
 */

import { type CSSProperties, type ElementType, type ReactNode } from 'react';
import { useInView } from '../hooks/useInView';

interface Props {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
  threshold?: number;
  style?: CSSProperties;
}

export default function Reveal({
  children,
  as: Tag = 'div',
  delay = 0,
  className = '',
  threshold = 0.15,
  style,
}: Props) {
  const { ref, isInView } = useInView(threshold);
  return (
    <Tag
      ref={ref}
      className={`reveal ${isInView ? 'is-in' : ''} ${className}`.trim()}
      style={{ ...style, ...(delay ? { transitionDelay: `${delay}ms` } : null) }}
    >
      {children}
    </Tag>
  );
}
