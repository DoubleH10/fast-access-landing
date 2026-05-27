import { Link } from 'react-router-dom';
import { Warehouse, Package, Truck, Activity, Zap, Headphones, ArrowRight } from 'lucide-react';
import SectionChip from '../components/brand/SectionChip';
import BrandPattern from '../components/brand/BrandPattern';
import Reveal from '../components/Reveal';
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
  const { t } = useT();

  return (
    <section id="services" className="relative bg-fa-cream-deep section-padding overflow-hidden">
      <BrandPattern
        pattern="lozenge"
        tint="navy"
        opacity={0.03}
        className="absolute -top-[8%] -right-[15%] w-[55%] max-w-[800px]"
      />
      <div className="container-main relative z-10">
        <div className="mb-14 max-w-[820px] text-left rtl:text-right">
          <Reveal className="mb-5"><SectionChip>{t('services.chip')}</SectionChip></Reveal>
          <Reveal delay={80}>
            <h2 className="font-display font-bold text-[32px] sm:text-[40px] lg:text-[52px] text-fa-liberty-blue leading-[1.05] tracking-[-0.02em]">
              {t('services.headlineA')}{' '}
              <span className="text-fa-orange-soda">{t('services.headlineHighlight')}</span>
              {t('services.headlineB')}
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="font-body mt-5 text-base lg:text-lg text-fa-ink-muted leading-[1.6] max-w-[640px]">
              {t('services.body')}
            </p>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceIcons.map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal
                key={item.number}
                delay={i * 70}
                className="fa-card fa-card--hover group p-8 lg:p-9 text-left rtl:text-right"
              >
                <div className="flex items-start justify-between">
                  <span className="fa-iconchip">
                    <Icon size={24} strokeWidth={1.8} />
                  </span>
                  <span className="font-display text-[13px] text-fa-orange-soda/70 font-semibold tracking-[0.12em] mt-1">{item.number}</span>
                </div>
                <h3 className="font-display mt-7 text-[20px] lg:text-[22px] font-semibold text-fa-liberty-blue tracking-[-0.01em]">
                  {t(`services.items.${i}.title`)}
                </h3>
                <p className="font-body mt-3 text-sm text-fa-ink-muted leading-[1.6] min-h-[72px]">
                  {t(`services.items.${i}.body`)}
                </p>
                <Link to="/solutions" className="inline-flex items-center gap-1.5 mt-6 text-[12px] font-semibold uppercase tracking-[0.06em] text-fa-orange-soda group-hover:gap-2 transition-all duration-200 font-body">
                  {t('services.learnMore')} <ArrowRight size={13} strokeWidth={2.4} className="rtl:rotate-180" />
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
