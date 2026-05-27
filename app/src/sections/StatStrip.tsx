/**
 * StatStrip — new-PPT "by the numbers" counters. Rendered on navy as one of
 * the two dark anchor moments (the rest of the page is cream-dominant).
 * Numbers count up once when scrolled into view; respects reduced-motion.
 *
 * NOTE: the figures are placeholders — replace with real metrics.
 */

import { useEffect, useState } from 'react';
import SectionChip from '../components/brand/SectionChip';
import Reveal from '../components/Reveal';
import { useInView } from '../hooks/useInView';
import { useT } from '../i18n/I18nContext';
import { content } from '../i18n/content';

interface Stat { value: number; suffix?: string; prefix?: string; label: string }

function format(n: number, decimals: number) {
  return decimals > 0 ? n.toFixed(decimals) : Math.round(n).toLocaleString();
}

function CountUp({ value, prefix = '', suffix = '' }: { value: number; prefix?: string; suffix?: string }) {
  const { ref, isInView } = useInView(0.4);
  const [display, setDisplay] = useState(0);
  const decimals = value % 1 !== 0 ? 1 : 0;

  useEffect(() => {
    if (!isInView) return;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { setDisplay(value); return; }
    const duration = 1400;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setDisplay(value * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isInView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {format(display, decimals)}
      <span className="text-fa-orange-soda">{suffix}</span>
    </span>
  );
}

export default function StatStrip() {
  const { t, locale } = useT();
  const items = content[locale].stats.items as readonly Stat[];

  return (
    <section className="relative bg-fa-liberty-blue section-padding overflow-hidden">
      <div className="container-main relative z-10">
        <div className="max-w-[720px] text-left rtl:text-right">
          <Reveal><SectionChip onDark>{t('stats.chip')}</SectionChip></Reveal>
          <Reveal delay={80}>
            <h2 className="font-display font-bold text-[30px] sm:text-[38px] lg:text-[48px] text-fa-classic-chalk leading-[1.08] tracking-[-0.02em] mt-5">
              {t('stats.headlineA')}{' '}
              <span className="text-fa-orange-soda">{t('stats.headlineHighlight')}</span>
              {t('stats.headlineB')}
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="font-body mt-5 text-base lg:text-lg text-fa-classic-chalk/60 leading-[1.6] max-w-[540px]">
              {t('stats.body')}
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-x-6 gap-y-10 mt-14 border-t border-fa-classic-chalk/15 pt-12">
          {items.map((s, i) => (
            <Reveal key={s.label} delay={i * 80} className="text-left rtl:text-right">
              <div className="font-display text-[38px] sm:text-[44px] lg:text-[52px] font-semibold text-fa-classic-chalk leading-none tracking-[-0.02em]">
                <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} />
              </div>
              <div className="font-body text-[12px] lg:text-[13px] text-fa-classic-chalk/55 mt-3 leading-snug max-w-[180px]">
                {s.label}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
