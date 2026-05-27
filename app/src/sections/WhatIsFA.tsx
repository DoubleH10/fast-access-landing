import { Boxes, Clock, MapPin } from 'lucide-react';
import SectionChip from '../components/brand/SectionChip';
import Reveal from '../components/Reveal';
import { useT } from '../i18n/I18nContext';

/**
 * "What is Fast Access" — plain-language intro band. Tells a first-time visitor
 * what the company actually does before any feature detail.
 */
export default function WhatIsFA() {
  const { t } = useT();

  const points = [
    { icon: Boxes, label: t('whatis.point1') },
    { icon: Clock, label: t('whatis.point2') },
    { icon: MapPin, label: t('whatis.point3') },
  ];

  return (
    <section id="about" className="relative bg-fa-cream section-padding overflow-hidden">
      <div className="container-main relative z-10">
        <div className="max-w-[760px] text-left rtl:text-right">
          <Reveal className="mb-5"><SectionChip>{t('whatis.chip')}</SectionChip></Reveal>
          <Reveal delay={80}>
            <h2 className="font-display font-bold text-[30px] sm:text-[38px] lg:text-[48px] text-fa-liberty-blue leading-[1.08] tracking-[-0.02em]">
              {t('whatis.headlineA')}{' '}
              <span className="text-fa-orange-soda">{t('whatis.headlineHighlight')}</span>
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="font-body mt-6 text-base lg:text-lg text-fa-ink-muted leading-[1.7] max-w-[680px]">
              {t('whatis.body')}
            </p>
          </Reveal>
        </div>

        <div className="grid sm:grid-cols-3 gap-5 mt-12 max-w-[820px]">
          {points.map(({ icon: Icon, label }, i) => (
            <Reveal
              key={label}
              delay={200 + i * 90}
              className="fa-card flex items-center gap-3.5 px-5 py-4 text-left rtl:text-right"
            >
              <span className="fa-iconchip shrink-0 w-10 h-10 rounded-xl">
                <Icon size={18} strokeWidth={2} />
              </span>
              <span className="font-body text-sm font-medium text-fa-liberty-blue leading-snug">{label}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
