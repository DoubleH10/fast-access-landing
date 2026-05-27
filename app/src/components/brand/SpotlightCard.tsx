/**
 * SpotlightCard — a card surface with a cursor-following radial glow.
 *
 * The glow tracks the pointer within the card and fades in on hover. Pair it
 * with `fa-card fa-card--glow` and a `group` class so the icon chip and arrow
 * micro-interactions fire together. Pure CSS + a tiny mouse handler, no deps.
 *
 *   <SpotlightCard className="fa-card fa-card--glow group relative overflow-hidden p-8">
 *     …content (wrap in `relative z-10`)…
 *   </SpotlightCard>
 */

import { useRef, useState, type CSSProperties, type MouseEvent, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  /** Glow colour (any CSS colour with alpha). Defaults to a soft Orange Soda. */
  glow?: string;
  /** Glow radius in px. Larger for big cards, smaller for compact ones. */
  radius?: number;
  style?: CSSProperties;
}

export default function SpotlightCard({
  children,
  className = '',
  glow = 'rgba(241,91,65,0.12)',
  radius = 380,
  style,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className={className}
      style={style}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 ease-out"
        style={{
          opacity: active ? 1 : 0,
          background: `radial-gradient(${radius}px circle at ${pos.x}px ${pos.y}px, ${glow}, transparent 62%)`,
        }}
      />
      {children}
    </div>
  );
}
