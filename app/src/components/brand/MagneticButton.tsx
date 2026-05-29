/**
 * MagneticButton — wraps BrandButton in a "magnetic" pull-to-cursor effect.
 * The button translates toward the cursor while it's inside an expanded hit
 * region around the button, with eased catch-up. Respects reduced-motion and
 * skips entirely on coarse pointers (touch).
 *
 *   <MagneticButton variant="filled" href="/contact">Get a quote</MagneticButton>
 *
 * Same prop surface as BrandButton.
 */

import { useEffect, useRef, type ComponentProps, type ReactNode } from 'react';
import BrandButton from './BrandButton';

type ButtonVariant = 'filled' | 'outline' | 'on-dark';

interface Props extends Omit<ComponentProps<'button'>, 'children'> {
  variant?: ButtonVariant;
  href?: string;
  children: ReactNode;
  arrow?: boolean;
  /** 0–1; how strongly the button is pulled. Default 0.25. */
  strength?: number;
}

export default function MagneticButton({ strength = 0.25, ...buttonProps }: Props) {
  const wrapRef = useRef<HTMLSpanElement | null>(null);
  const innerRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return;
    if (typeof window === 'undefined') return;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const coarse = window.matchMedia?.('(pointer: coarse)').matches;
    if (reduce || coarse) return;

    let raf = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;

    const tick = () => {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      inner.style.transform = `translate3d(${cx.toFixed(2)}px, ${cy.toFixed(2)}px, 0)`;
      if (Math.abs(tx - cx) > 0.05 || Math.abs(ty - cy) > 0.05) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
      }
    };
    const onMove = (e: MouseEvent) => {
      const r = wrap.getBoundingClientRect();
      const midX = r.left + r.width / 2;
      const midY = r.top + r.height / 2;
      tx = (e.clientX - midX) * strength;
      ty = (e.clientY - midY) * strength;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onLeave = () => {
      tx = 0;
      ty = 0;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    wrap.addEventListener('mousemove', onMove);
    wrap.addEventListener('mouseleave', onLeave);
    return () => {
      wrap.removeEventListener('mousemove', onMove);
      wrap.removeEventListener('mouseleave', onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [strength]);

  return (
    <span ref={wrapRef} className="mag-wrap" data-magnetic>
      <span ref={innerRef} className="mag-inner">
        <BrandButton {...buttonProps} />
      </span>
    </span>
  );
}
