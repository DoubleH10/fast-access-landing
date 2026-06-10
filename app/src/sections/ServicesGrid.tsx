import { Link } from 'react-router-dom';
import { Warehouse, Package, Truck, Activity, Zap, Headphones, ArrowRight } from 'lucide-react';
import SectionChip from '../components/brand/SectionChip';
import BrandPattern from '../components/brand/BrandPattern';
import SpotlightCard from '../components/brand/SpotlightCard';
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

// Bento rhythm on the lg 3-col grid: the wide tiles (0, 3, 4) span two columns
// so each of the three rows fills cleanly as big-left / big-right / big-left.
// On md it falls back to an even 2-col grid, on mobile a single column.
const wideTiles = new Set([0, 3, 4]);

export default function ServicesGrid() {
  const { t } = useT();

  return (
    <section id="services" className="relative bg-fa-cream-deep section-padding overflow-hidden">
      {/* Pattern turned up ("maximal") per client feedback — it should read
          as a deliberate brand moment, not a barely-there texture. */}
      <BrandPattern
        pattern="lozenge"
        tint="navy"
        opacity={0.09}
        className="absolute -top-[10%] -right-[12%] w-[72%] max-w-[1050px]"
      />
      <BrandPattern
        pattern="ribbon"
        tint="orange"
        opacity={0.07}
        className="absolute -left-[10%] bottom-[-6%] w-[48%] max-w-[680px]"
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:auto-rows-fr">
          {serviceIcons.map((item, i) => {
            const Icon = item.icon;
            const isWide = wideTiles.has(i);
            const learnMore = (
              <Link
                to="/solutions"
                className="group/link inline-flex items-center gap-1.5 mt-6 lg:mt-auto lg:pt-6 text-[12px] font-semibold uppercase tracking-[0.06em] text-fa-orange-soda font-body"
              >
                {t('services.learnMore')}
                <ArrowRight
                  size={13}
                  strokeWidth={2.4}
                  className="transition-transform duration-200 group-hover/link:translate-x-1 rtl:rotate-180 rtl:group-hover/link:-translate-x-1"
                />
              </Link>
            );

            return (
              <Reveal
                key={item.number}
                delay={i * 70}
                className={isWide ? 'lg:col-span-2' : ''}
              >
                <SpotlightCard className="fa-card fa-card--glow group relative h-full overflow-hidden p-8 lg:p-9 text-left rtl:text-right">
                  {/* Editorial ghost number — adds depth on the wide tiles. */}
                  {isWide && (
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -bottom-7 -right-3 rtl:right-auto rtl:-left-3 font-display font-bold text-[150px] leading-none tracking-tight text-fa-liberty-blue/[0.035] select-none"
                    >
                      {item.number}
                    </span>
                  )}

                  {isWide ? (
                    // Wide tile: icon + title on the left, copy + link on the right.
                    <div className="relative z-10 flex h-full flex-col lg:flex-row lg:items-stretch lg:gap-10">
                      <div className="flex flex-col lg:w-[40%] lg:shrink-0">
                        <div className="flex items-start justify-between">
                          <span className="fa-iconchip">
                            <Icon size={24} strokeWidth={1.8} />
                          </span>
                          <span className="font-display text-[13px] text-fa-orange-soda/70 font-semibold tracking-[0.12em] mt-1 lg:hidden">{item.number}</span>
                        </div>
                        <h3 className="font-display mt-7 text-[21px] lg:text-[26px] font-semibold text-fa-liberty-blue tracking-[-0.01em] leading-[1.13]">
                          {t(`services.items.${i}.title`)}
                        </h3>
                        <span className="hidden lg:block font-display text-[13px] text-fa-orange-soda/70 font-semibold tracking-[0.12em] mt-auto pt-6">{item.number}</span>
                      </div>
                      <div className="flex flex-col mt-3 lg:mt-0 lg:flex-1 lg:border-s lg:border-fa-liberty-blue/[0.07] lg:ps-10">
                        <p className="font-body text-sm lg:text-[15px] text-fa-ink-muted leading-[1.65]">
                          {t(`services.items.${i}.body`)}
                        </p>
                        {learnMore}
                      </div>
                    </div>
                  ) : (
                    // Narrow tile: classic vertical card.
                    <div className="relative z-10 flex h-full flex-col">
                      <div className="flex items-start justify-between">
                        <span className="fa-iconchip">
                          <Icon size={24} strokeWidth={1.8} />
                        </span>
                        <span className="font-display text-[13px] text-fa-orange-soda/70 font-semibold tracking-[0.12em] mt-1">{item.number}</span>
                      </div>
                      <h3 className="font-display mt-7 text-[20px] lg:text-[22px] font-semibold text-fa-liberty-blue tracking-[-0.01em]">
                        {t(`services.items.${i}.title`)}
                      </h3>
                      <p className="font-body mt-3 text-sm text-fa-ink-muted leading-[1.6]">
                        {t(`services.items.${i}.body`)}
                      </p>
                      {learnMore}
                    </div>
                  )}
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
