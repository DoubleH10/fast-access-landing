/**
 * Sectors — new-PPT slide 13. "Whatever you sell, Fast Access is built for you."
 * Industry tags as soft pills.
 */

import { Shirt, Sparkles, Smartphone, HeartPulse, UtensilsCrossed, Home } from 'lucide-react';
import SectionChip from '../components/brand/SectionChip';
import Reveal from '../components/Reveal';
import { useT } from '../i18n/I18nContext';
import { content } from '../i18n/content';

const icons = [Shirt, Sparkles, Smartphone, HeartPulse, UtensilsCrossed, Home];

export default function Sectors() {
  const { t, locale } = useT();
  const items = content[locale].sectors.items as readonly string[];

  return (
    <section className="relative bg-fa-cream-deep section-padding overflow-hidden">
      <div className="container-main relative z-10">
        <div className="max-w-[760px] text-left rtl:text-right">
          <Reveal className="mb-5"><SectionChip>{t('sectors.chip')}</SectionChip></Reveal>
          <Reveal delay={80}>
            <h2 className="font-display font-bold text-[30px] sm:text-[38px] lg:text-[48px] text-fa-liberty-blue leading-[1.08] tracking-[-0.02em]">
              {t('sectors.headlineA')}{' '}
              <span className="text-fa-orange-soda">{t('sectors.headlineHighlight')}</span>
              {t('sectors.headlineB')}
            </h2>
          </Reveal>
        </div>

        <div className="flex flex-wrap gap-3 mt-10">
          {items.map((label, i) => {
            const Icon = icons[i];
            return (
              <Reveal
                key={i}
                delay={i * 60}
                className="fa-card fa-card--hover inline-flex items-center gap-2.5 px-5 py-3"
              >
                <Icon size={18} strokeWidth={1.9} className="text-fa-orange-soda" />
                <span className="font-body text-[15px] font-medium text-fa-liberty-blue">{label}</span>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
