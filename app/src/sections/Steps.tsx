/**
 * Steps — the new-PPT "5 logistics steps" journey.
 * The brand ribbon runs underneath the row as the connector between steps
 * (the one ownable device), echoing the order's path through the network.
 */

import { PlugZap, GraduationCap, Warehouse, PackageCheck, Truck } from 'lucide-react';
import SectionChip from '../components/brand/SectionChip';
import Reveal from '../components/Reveal';
import Ribbon from '../components/brand/Ribbon';
import { useT } from '../i18n/I18nContext';

const icons = [PlugZap, GraduationCap, Warehouse, PackageCheck, Truck];

export default function Steps() {
  const { t } = useT();
  const items = icons.map((Icon, i) => ({
    Icon,
    n: String(i + 1).padStart(2, '0'),
    title: t(`steps.items.${i}.title`),
    body: t(`steps.items.${i}.body`),
  }));

  return (
    <section id="how-it-works" className="relative bg-fa-cream section-padding overflow-hidden">
      <div className="container-main relative z-10">
        <div className="max-w-[760px] text-left rtl:text-right">
          <Reveal><SectionChip>{t('steps.chip')}</SectionChip></Reveal>
          <Reveal delay={80}>
            <h2 className="font-display font-bold text-[32px] sm:text-[40px] lg:text-[52px] text-fa-liberty-blue leading-[1.05] tracking-[-0.02em] mt-5">
              {t('steps.headlineA')}{' '}
              <span className="text-fa-orange-soda">{t('steps.headlineHighlight')}</span>
              {t('steps.headlineB')}
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="font-body mt-5 text-base lg:text-lg text-fa-ink-muted leading-[1.6] max-w-[600px]">
              {t('steps.body')}
            </p>
          </Reveal>
        </div>

        {/* Steps row with the ribbon connector behind it */}
        <div className="relative mt-16">
          {/* Connector: ribbon on desktop, runs through the icon-chip band */}
          <div className="hidden lg:block absolute left-0 right-0 top-[26px] -z-0 pointer-events-none">
            <Ribbon className="w-full h-12 text-fa-orange-soda/35" strokeWidth={2} />
          </div>

          <ol className="grid gap-y-12 gap-x-6 sm:grid-cols-2 lg:grid-cols-5 relative z-10">
            {items.map((s, i) => (
              <Reveal as="li" delay={i * 90} key={s.n} className="text-left rtl:text-right">
                <div className="flex items-center gap-3 lg:block">
                  <span className="fa-iconchip shrink-0 bg-fa-surface shadow-[0_8px_24px_-12px_rgba(13,18,50,0.35)] ring-1 ring-fa-hairline">
                    <s.Icon size={24} strokeWidth={1.8} className="text-fa-orange-soda" />
                  </span>
                  <span className="font-display text-[13px] font-semibold tracking-[0.14em] text-fa-orange-soda lg:mt-5 lg:block">
                    {s.n}
                  </span>
                </div>
                <h3 className="font-display mt-3 lg:mt-2 text-[18px] lg:text-[20px] font-semibold text-fa-liberty-blue tracking-[-0.01em]">
                  {s.title}
                </h3>
                <p className="font-body mt-2 text-sm text-fa-ink-muted leading-[1.6]">
                  {s.body}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
