import { useInView } from '../hooks/useInView';
import SectionChip from '../components/brand/SectionChip';
import BrandPattern from '../components/brand/BrandPattern';

export default function CTA() {
  const { ref, isInView } = useInView(0.2);

  return (
    <section
      id="quote"
      ref={ref}
      className="relative bg-fa-liberty-blue section-padding overflow-hidden"
    >
      {/* Pattern 1 (ribbon) — the signature "Built for Speed, Designed for Clarity"
          treatment from brandbook pg 71. Two layered passes for depth. */}
      <BrandPattern
        pattern="ribbon"
        tint="orange"
        opacity={0.32}
        className="absolute top-[18%] -right-[8%] w-[110%] max-w-none"
      />
      <BrandPattern
        pattern="ribbon"
        tint="white"
        opacity={0.06}
        className="absolute bottom-[10%] -left-[10%] w-[110%] max-w-none"
        style={{ transform: 'scaleX(-1)' }}
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
          <SectionChip onDark>Ready when you are</SectionChip>
        </div>

        <h2
          className="font-display font-bold text-[44px] sm:text-[60px] lg:text-[76px] text-fa-classic-chalk leading-[0.98] tracking-[-0.025em]"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 600ms ease-out 100ms',
          }}
        >
          Built for <span className="text-fa-orange-soda">Speed</span>,<br />
          Designed for Clarity.
        </h2>

        <p
          className="font-body mt-6 text-base lg:text-lg text-fa-classic-chalk/65 max-w-[560px] mx-auto leading-[1.55]"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 500ms ease-out 200ms',
          }}
        >
          Tell us about your business. We'll come back with a tailored plan within one business day.
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
            <span className="px-5 py-3.5">Inquire Now</span>
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
            Book a tour
          </a>
        </div>
      </div>
    </section>
  );
}
