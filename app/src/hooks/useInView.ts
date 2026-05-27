import { useEffect, useRef, useState } from 'react';

/**
 * Reveal-on-scroll hook, hardened so content never gets stuck hidden:
 *  - reduced-motion → reveal immediately (no animation)
 *  - already on-screen at mount (above the fold / refresh mid-page) → reveal now
 *  - below the fold → reveal when scrolled into view (IntersectionObserver)
 *  - safety net → if the observer never fires while the element is visible,
 *    reveal after a short delay so nothing stays invisible.
 *
 * This is the same guarantee as the <Reveal> component (used by the newer
 * sections); both keep the page present-by-default and calm.
 */
export function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setIsInView(true);
      return;
    }

    // Reveal straight away if the element is already within ~the viewport.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);

    // Safety net: never leave on-screen content hidden.
    const safety = window.setTimeout(() => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) setIsInView(true);
    }, 1600);

    return () => {
      observer.disconnect();
      window.clearTimeout(safety);
    };
  }, [threshold]);

  return { ref, isInView };
}
