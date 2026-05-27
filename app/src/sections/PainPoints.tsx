/**
 * PainPoints — new-PPT slide 7. The merchant frustrations Fast Access removes,
 * then a strong closer that pivots to the solution.
 */

import { TriangleAlert } from 'lucide-react';
import SectionChip from '../components/brand/SectionChip';
import SpotlightCard from '../components/brand/SpotlightCard';
import Reveal from '../components/Reveal';
import { useT } from '../i18n/I18nContext';
import { content } from '../i18n/content';

export default function PainPoints() {
  const { t, locale } = useT();
  const items = content[locale].pain.items as readonly string[];

  return (
    <section className="relative bg-fa-cream section-padding overflow-hidden">
      <div className="container-main relative z-10">
        <div className="max-w-[760px] text-left rtl:text-right">
          <Reveal className="mb-5"><SectionChip>{t('pain.chip')}</SectionChip></Reveal>
          <Reveal delay={80}>
            <h2 className="font-display font-bold text-[30px] sm:text-[38px] lg:text-[48px] text-fa-liberty-blue leading-[1.08] tracking-[-0.02em]">
              {t('pain.headlineA')}{' '}
              <span className="text-fa-orange-soda">{t('pain.headlineHighlight')}</span>
              {t('pain.headlineB')}
            </h2>
          </Reveal>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
          {items.map((pain, i) => (
            <Reveal key={i} delay={i * 70} className="h-full">
              <SpotlightCard
                radius={320}
                className="fa-card fa-card--glow group relative h-full overflow-hidden flex items-start gap-3.5 px-5 py-5 text-left rtl:text-right"
              >
                <span className="fa-iconchip shrink-0 w-9 h-9 rounded-xl relative z-10">
                  <TriangleAlert size={17} strokeWidth={2} />
                </span>
                <p className="relative z-10 font-body text-[15px] text-fa-liberty-blue/85 leading-snug pt-1">“{pain}”</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} className="mt-12">
          <p className="font-display text-[22px] sm:text-[28px] lg:text-[32px] font-bold text-fa-liberty-blue tracking-[-0.02em] text-left rtl:text-right max-w-[760px]">
            {t('pain.closer')}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
