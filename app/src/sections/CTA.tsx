import { useInView } from '../hooks/useInView';
import BrandButton from '../components/brand/BrandButton';
import SectionChip from '../components/brand/SectionChip';
import StepRibbon from '../components/brand/StepRibbon';

export default function CTA() {
  const { ref, isInView } = useInView(0.2);

  return (
    <section
      id="quote"
      ref={ref}
      className="relative bg-fa-liberty-blue section-padding overflow-hidden"
    >
      {/* Layered stepped ribbons — the signature "Built for Speed, Designed for Clarity" treatment */}
      <StepRibbon
        variant="outline"
        color="#F15B41"
        opacity={0.22}
        strokeWidth={1.4}
        className="pointer-events-none absolute top-1/4 -right-12 w-[80%] max-w-[1200px]"
      />
      <StepRibbon
        variant="outline"
        color="#F4F4F1"
        opacity={0.07}
        strokeWidth={1}
        className="pointer-events-none absolute -bottom-8 -left-12 w-[70%] max-w-[1000px]"
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
