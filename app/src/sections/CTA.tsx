import { useInView } from '../hooks/useInView';
import SectionChip from '../components/brand/SectionChip';
import BrandPattern from '../components/brand/BrandPattern';
import { useT } from '../i18n/I18nContext';

export default function CTA() {
  const { t } = useT();
  const { ref, isInView } = useInView(0.2);

  return (
    <section
      id="quote"
      ref={ref}
      className="relative bg-fa-liberty-blue pt-24 pb-20 lg:pt-28 lg:pb-24 overflow-hidden"
    >
      {/* One single, confident ribbon — the brand pattern moment of the page. */}
      <BrandPattern
        pattern="ribbon"
        tint="orange"
        opacity={0.28}
        className="absolute top-[22%] -right-[8%] w-[110%] max-w-none"
      />

      <div className="container-main text-center relative z-10">
        <div
          className="inline-flex mb-6"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 500ms ease-out',
          }}
        >
          <SectionChip onDark>{t('cta.chip')}</SectionChip>
        </div>

        <h2
          className="font-display font-bold text-[44px] sm:text-[60px] lg:text-[76px] text-fa-classic-chalk leading-[0.98] tracking-[-0.025em]"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 600ms ease-out 100ms',
          }}
        >
          {t('cta.headlineA')} <span className="text-fa-orange-soda">{t('cta.headlineHighlight')}</span>{t('cta.headlineB')}
        </h2>

        <p
          className="font-body mt-6 text-base lg:text-lg text-fa-classic-chalk/65 max-w-[560px] mx-auto leading-[1.55]"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 500ms ease-out 200ms',
          }}
        >
          {t('cta.body')}
        </p>

        <div
          className="flex flex-wrap items-center justify-center gap-3 mt-10"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 500ms ease-out 300ms',
          }}
        >
          {/* Primary — bold orange, the unambiguous "click me" */}
          <a
            href="#contact"
            className="group inline-flex items-stretch font-body text-[12px] font-semibold uppercase tracking-[0.08em] rounded-[4px] overflow-hidden transition-transform duration-200 hover:-translate-y-0.5"
            style={{ backgroundColor: '#F15B41', color: '#F4F4F1' }}
          >
            <span className="px-5 py-3.5">{t('cta.primary')}</span>
            <span
              className="flex items-center justify-center px-3.5"
              style={{ backgroundColor: 'rgba(13,18,50,0.18)' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </span>
          </a>
          {/* Secondary — ghost with visible cream border */}
          <a
            href="#tour"
            className="inline-flex items-center px-5 py-3.5 font-body text-[12px] font-semibold uppercase tracking-[0.08em] text-fa-classic-chalk/90 rounded-[4px] transition-colors duration-200 hover:text-fa-classic-chalk"
            style={{ boxShadow: 'inset 0 0 0 1px rgba(244,244,241,0.28)' }}
          >
            {t('cta.secondary')}
          </a>
        </div>
      </div>
    </section>
  );
}
