/**
 * ScrollProgressBar — a 2px orange sliver fixed to the top of the viewport
 * that scales-X with how far you've scrolled through the page. Mounted once
 * in Layout. Skips animation under prefers-reduced-motion (stays at 0).
 */

import { useEffect, useRef } from 'react';

export default function ScrollProgressBar() {
  const fillRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fill = fillRef.current;
    if (!fill) return;
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    let raf = 0;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      fill.style.transform = `scaleX(${p.toFixed(4)})`;
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="fa-scroll-bar" aria-hidden>
      <div ref={fillRef} className="fa-scroll-bar__fill" />
    </div>
  );
}
