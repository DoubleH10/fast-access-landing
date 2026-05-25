import { useInView } from '../hooks/useInView';
import { Boxes, Clock, MapPin } from 'lucide-react';
import SectionChip from '../components/brand/SectionChip';
import { useT } from '../i18n/I18nContext';

/**
 * "What is Fast Access" — plain-language intro band. Tells a first-time visitor
 * what the company actually does before any feature detail.
 */
export default function WhatIsFA() {
  const { ref, isInView } = useInView(0.2);
  const { t } = useT();

  const points = [
    { icon: Boxes, label: t('whatis.point1') },
    { icon: Clock, label: t('whatis.point2') },
    { icon: MapPin, label: t('whatis.point3') },
  ];

  const fade = (delay: number) => ({
    opacity: isInView ? 1 : 0,
    transform: isInView ? 'translateY(0)' : 'translateY(20px)',
    transition: `all 600ms ease-out ${delay}ms`,
  });

  return (
    <section id="about" ref={ref} className="relative bg-fa-paper section-padding border-t border-fa-hairline overflow-hidden">
      <div className="container-main relative z-10">
        <div className="max-w-[760px] text-left rtl:text-right">
          <div className="mb-5" style={fade(0)}>
            <SectionChip>{t('whatis.chip')}</SectionChip>
          </div>
          <h2 className="font-display font-bold text-[30px] sm:text-[38px] lg:text-[48px] text-fa-liberty-blue leading-[1.08] tracking-[-0.02em]" style={fade(100)}>
            {t('whatis.headlineA')}{' '}
            <span className="text-fa-orange-soda">{t('whatis.headlineHighlight')}</span>
          </h2>
          <p className="font-body mt-6 text-base lg:text-lg text-fa-ink-muted leading-[1.7] max-w-[680px]" style={fade(200)}>
            {t('whatis.body')}
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-5 mt-12 max-w-[820px]" style={fade(300)}>
          {points.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-3 bg-white border border-fa-hairline rounded-sm px-5 py-4 text-left rtl:text-right"
            >
              <span className="flex-shrink-0 w-9 h-9 rounded-sm bg-fa-orange-soda/10 flex items-center justify-center">
                <Icon size={18} className="text-fa-orange-soda" strokeWidth={2} />
              </span>
              <span className="font-body text-sm font-medium text-fa-liberty-blue leading-snug">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
