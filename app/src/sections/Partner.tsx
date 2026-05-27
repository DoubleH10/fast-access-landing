/**
 * Partner — new-PPT slide 8. "More than a vendor." Two-column layout: the
 * statement on one side, the four promises on the other — deliberately not
 * another card grid, to vary the page rhythm.
 */

import { Cog, TrendingUp, Wind, HeartHandshake } from 'lucide-react';
import SectionChip from '../components/brand/SectionChip';
import Reveal from '../components/Reveal';
import { useT } from '../i18n/I18nContext';
import { content } from '../i18n/content';

interface Item { title: string; body: string }
const icons = [Cog, TrendingUp, Wind, HeartHandshake];

export default function Partner() {
  const { t, locale } = useT();
  const items = content[locale].partner.items as readonly Item[];

  return (
    <section className="relative bg-fa-cream-deep section-padding overflow-hidden">
      <div className="container-main relative z-10">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-20 items-start">
          {/* Statement */}
          <div className="text-left rtl:text-right lg:sticky lg:top-28">
            <Reveal className="mb-5"><SectionChip>{t('partner.chip')}</SectionChip></Reveal>
            <Reveal delay={80}>
              <h2 className="font-display font-bold text-[30px] sm:text-[38px] lg:text-[46px] text-fa-liberty-blue leading-[1.1] tracking-[-0.02em]">
                {t('partner.headlineA')}{' '}
                <span className="text-fa-orange-soda">{t('partner.headlineHighlight')}</span>
                {t('partner.headlineB')}
              </h2>
            </Reveal>
          </div>

          {/* Promises */}
          <div className="flex flex-col">
            {items.map((it, i) => {
              const Icon = icons[i];
              return (
                <Reveal
                  key={i}
                  delay={i * 90}
                  className="flex items-start gap-4 py-6 border-b border-fa-hairline last:border-0 text-left rtl:text-right"
                >
                  <span className="fa-iconchip shrink-0">
                    <Icon size={22} strokeWidth={1.8} />
                  </span>
                  <div>
                    <h3 className="font-display text-[19px] lg:text-[21px] font-semibold text-fa-liberty-blue tracking-[-0.01em]">{it.title}</h3>
                    <p className="font-body mt-1.5 text-[15px] text-fa-ink-muted leading-[1.6]">{it.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
