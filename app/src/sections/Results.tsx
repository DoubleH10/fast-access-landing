/**
 * Results — new-PPT slide 16. Before/after stories from merchants. Each card
 * contrasts the old pain (muted) with the Fast Access outcome (bright).
 *
 * NOTE: the three stories are placeholders — replace with real testimonials.
 */

import { Check } from 'lucide-react';
import SectionChip from '../components/brand/SectionChip';
import Reveal from '../components/Reveal';
import { useT } from '../i18n/I18nContext';
import { content } from '../i18n/content';

interface Item { name: string; before: string; after: string }

export default function Results() {
  const { t, locale } = useT();
  const items = content[locale].results.items as readonly Item[];
  const isAr = locale === 'ar';
  const beforeLabel = isAr ? 'قبل' : 'Before';
  const afterLabel = isAr ? 'بعد' : 'After';

  return (
    <section className="relative bg-fa-cream section-padding overflow-hidden">
      <div className="container-main relative z-10">
        <div className="max-w-[760px] text-left rtl:text-right">
          <Reveal className="mb-5"><SectionChip>{t('results.chip')}</SectionChip></Reveal>
          <Reveal delay={80}>
            <h2 className="font-display font-bold text-[30px] sm:text-[38px] lg:text-[48px] text-fa-liberty-blue leading-[1.08] tracking-[-0.02em]">
              {t('results.headlineA')}{' '}
              <span className="text-fa-orange-soda">{t('results.headlineHighlight')}</span>
              {t('results.headlineB')}
            </h2>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-14">
          {items.map((it, i) => (
            <Reveal key={i} delay={i * 90} className="fa-card flex flex-col overflow-hidden text-left rtl:text-right">
              <div className="px-6 pt-6 pb-4">
                <div className="font-display text-[15px] font-semibold text-fa-liberty-blue">{it.name}</div>
              </div>
              {/* Before */}
              <div className="px-6 py-5 bg-fa-cream-deep/60">
                <span className="font-body text-[11px] font-semibold uppercase tracking-[0.1em] text-fa-ink-faint">{beforeLabel}</span>
                <p className="font-body text-[14px] text-fa-ink-muted leading-[1.55] mt-2">{it.before}</p>
              </div>
              {/* After */}
              <div className="px-6 py-5 flex-1">
                <span className="inline-flex items-center gap-1.5 font-body text-[11px] font-semibold uppercase tracking-[0.1em] text-fa-orange-soda">
                  <Check size={13} strokeWidth={3} /> {afterLabel}
                </span>
                <p className="font-body text-[14px] text-fa-liberty-blue/90 leading-[1.55] mt-2 font-medium">{it.after}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
