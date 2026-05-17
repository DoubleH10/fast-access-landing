import { useInView } from '../hooks/useInView';
import BrandButton from '../components/brand/BrandButton';
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
          className="font-body mt-6 text-base lg:text-lg text-fa-classic-chalk/65 max-w-[520px] mx-auto leading-[1.55]"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 500ms ease-out 200ms',
          }}
        >
          Move your operations to a network that actually moves. Go live in 14 days.
        </p>

        <div
          className="flex flex-wrap items-center justify-center gap-3 mt-10"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 500ms ease-out 300ms',
          }}
        >
          <BrandButton variant="on-dark" href="#contact" className="!bg-fa-blue-rose">
            Inquire Now
          </BrandButton>
          <BrandButton variant="on-dark" href="#tour" arrow={false}>
            Book a tour
          </BrandButton>
        </div>
      </div>
    </section>
  );
}
