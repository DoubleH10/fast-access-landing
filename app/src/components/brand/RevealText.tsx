/**
 * RevealText — splits a string into words; each word slides up + reveals with
 * a configurable per-word stagger when the line scrolls into view. The CSS
 * lives in index.css under .rv-* — words sit at translateY(110%) inside an
 * overflow-hidden wrapper, then translate to 0 when the parent gets .is-in.
 *
 *   <h2><RevealText accent="grow">Everything your business needs to grow.</RevealText></h2>
 *
 * Honors prefers-reduced-motion (renders immediately, no animation).
 */

import { useEffect, useRef, type ElementType } from 'react';

interface Props {
  children: string;
  /** Substring to render as the orange accent. */
  accent?: string;
  /** Per-word delay in ms (default 50). */
  stagger?: number;
  /** Base delay before the first word starts in ms. */
  baseDelay?: number;
  className?: string;
  as?: ElementType;
}

interface Token {
  kind: 'word' | 'space';
  text: string;
  accent?: boolean;
}

function tokenize(input: string, accent?: string): Token[] {
  const tokens: Token[] = [];
  const ranges: Array<{ accent: boolean; text: string }> = [];

  if (accent && input.includes(accent)) {
    const idx = input.indexOf(accent);
    if (idx > 0) ranges.push({ accent: false, text: input.slice(0, idx) });
    ranges.push({ accent: true, text: accent });
    if (idx + accent.length < input.length) {
      ranges.push({ accent: false, text: input.slice(idx + accent.length) });
    }
  } else {
    ranges.push({ accent: false, text: input });
  }

  for (const range of ranges) {
    const parts = range.text.split(/(\s+)/);
    for (const p of parts) {
      if (!p) continue;
      if (/^\s+$/.test(p)) tokens.push({ kind: 'space', text: ' ' });
      else tokens.push({ kind: 'word', text: p, accent: range.accent });
    }
  }
  return tokens;
}

export default function RevealText({
  children,
  accent,
  stagger = 50,
  baseDelay = 0,
  className = '',
  as: As = 'span',
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const tokens = tokenize(children, accent);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      el.classList.add('is-in');
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            el.classList.add('is-in');
            io.unobserve(el);
          }
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -8% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  let wordIdx = 0;
  return (
    <As
      ref={ref as React.Ref<HTMLElement>}
      className={`rv-line ${className}`.trim()}
    >
      {tokens.map((t, i) => {
        if (t.kind === 'space') return <span key={i} className="rv-space"> </span>;
        const delay = baseDelay + wordIdx * stagger;
        wordIdx += 1;
        return (
          <span key={i} className="rv-word-wrap">
            <span
              className={`rv-word${t.accent ? ' accent' : ''}`}
              style={{ transitionDelay: `${delay}ms` }}
            >
              {t.text}
            </span>
          </span>
        );
      })}
    </As>
  );
}
