import { useInView } from '../hooks/useInView';
import { Warehouse, Package, Truck, Activity, Zap, Headphones, ArrowRight } from 'lucide-react';
import SectionChip from '../components/brand/SectionChip';
import BrandPattern from '../components/brand/BrandPattern';
import { useT } from '../i18n/I18nContext';

const serviceIcons = [
  { icon: Warehouse, number: '01' },
  { icon: Package, number: '02' },
  { icon: Truck, number: '03' },
  { icon: Activity, number: '04' },
  { icon: Zap, number: '05' },
  { icon: Headphones, number: '06' },
];

export default function ServicesGrid() {
  const { ref, isInView } = useInView(0.2);
  const { t } = useT();

  return (
    <section id="services" ref={ref} className="relative bg-fa-classic-chalk section-padding border-t border-fa-hairline overflow-hidden">
      <BrandPattern
        pattern="lozenge"
        tint="navy"
        opacity={0.03}
        className="absolute -top-[8%] -right-[15%] w-[55%] max-w-[800px]"
      />
      <div className="container-main relative z-10">
        <div className="mb-14 max-w-[820px] text-left rtl:text-right">
          <div className="mb-5" style={{ opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 500ms ease-out' }}>
            <SectionChip>{t('services.chip')}</SectionChip>
          </div>
          <h2 className="font-display font-bold text-[32px] sm:text-[40px] lg:text-[52px] text-fa-liberty-blue leading-[1.05] tracking-[-0.02em]" style={{ opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 600ms ease-out 100ms' }}>
            {t('services.headlineA')}{' '}
            <span className="text-fa-orange-soda">{t('services.headlineHighlight')}</span>{' '}
            {t('journey.headlineB')}
          </h2>
          <p className="font-body mt-5 text-base lg:text-lg text-fa-ink-muted leading-[1.6] max-w-[640px]" style={{ opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 500ms ease-out 200ms' }}>
            {t('services.body')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceIcons.map((item, i) => {
            const Icon = item.icon;
            const title = t(`services.items.${i}.title`);
            const description = t(`services.items.${i}.body`);
            return (
              <div
                key={item.number}
                className="group relative bg-[#FAF9F6] border border-fa-hairline p-8 lg:p-10 transition-all duration-200 ease-out hover:-translate-y-1 hover:bg-white hover:shadow-[0_16px_40px_rgba(13,18,50,0.08)] hover:border-fa-orange-soda/30 cursor-default rounded-sm text-left rtl:text-right"
                style={{
                  opacity: isInView ? 1 : 0,
                  transform: isInView ? 'translateY(0)' : 'translateY(40px)',
                  transition: `opacity 400ms ease-out ${i * 80}ms, transform 400ms ease-out ${i * 80}ms, box-shadow 200ms ease-out, border-color 200ms ease-out, background-color 200ms ease-out`,
                }}
              >
                <div className="flex items-start justify-between">
                  <span className="font-display text-[12px] text-fa-orange-soda font-semibold tracking-[0.12em]">{item.number}</span>
                  <Icon size={28} strokeWidth={1.6} className="text-fa-liberty-blue" />
                </div>
                <h3 className="font-display mt-8 text-[20px] lg:text-[22px] font-semibold text-fa-liberty-blue tracking-[-0.01em]">
                  {title}
                </h3>
                <p className="font-body mt-3 text-sm text-fa-ink-muted leading-[1.6] min-h-[72px]">{description}</p>
                <span className="inline-flex items-center gap-1.5 mt-6 text-[12px] font-semibold uppercase tracking-[0.06em] text-fa-orange-soda group-hover:gap-2 transition-all duration-200 font-body">
                  {t('services.learnMore')} <ArrowRight size={13} strokeWidth={2.4} className="rtl:rotate-180" />
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
