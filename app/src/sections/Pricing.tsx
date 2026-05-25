import { useInView } from '../hooks/useInView';
import { Check, Box, Package, Gift, Layers } from 'lucide-react';
import SectionChip from '../components/brand/SectionChip';
import BrandButton from '../components/brand/BrandButton';
import BrandPattern from '../components/brand/BrandPattern';

/**
 * Pricing — pivot from fixed 3-tier model to custom-quote per PPT slide 17:
 * "Clear pricing, no hidden fees, customised to your needs."
 * Pricing depends on: product nature, order volume, packing type, extras.
 * The single CTA replaces the old Starter/Growth/Enterprise tiers.
 */
const factors = [
  { Icon: Box, label: 'Product nature', detail: 'Size, weight, fragility, temperature needs.' },
  { Icon: Layers, label: 'Order volume', detail: 'Daily and monthly throughput across your stores.' },
  { Icon: Package, label: 'Packing type', detail: 'Standard boxes, custom branded, or full unboxing.' },
  { Icon: Gift, label: 'Extra services', detail: 'Gift wrapping, printed cards, inserts, returns.' },
];

const inclusions = [
  'No long-term contracts',
  'No per-pick hidden fees',
  'No setup charge',
  'Volume-based discounts',
  'Pay only for what you ship',
  'Same pricing across all regions',
];

export default function Pricing() {
  const { ref, isInView } = useInView(0.15);

  return (
    <section id="pricing" ref={ref} className="relative bg-fa-classic-chalk section-padding border-t border-fa-hairline overflow-hidden">
      {/* Very subtle navy ribbon on the left — atmosphere only */}
      <BrandPattern
        pattern="ribbon"
        tint="navy"
        opacity={0.03}
        className="absolute top-[8%] -left-[25%] w-[80%] max-w-none"
      />
      <div className="container-main relative z-10">
        <div className="text-center mx-auto max-w-[720px]">
          <div
            className="inline-flex mb-5"
            style={{ opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 500ms ease-out' }}
          >
            <SectionChip>Plans &amp; Pricing</SectionChip>
          </div>
          <h2
            className="font-display font-bold text-[32px] sm:text-[40px] lg:text-[56px] text-fa-liberty-blue leading-[1.05] tracking-[-0.02em]"
            style={{ opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 600ms ease-out 100ms' }}
          >
            Clear pricing, <span className="text-fa-orange-soda">no hidden fees</span>.
          </h2>
          <p
            className="font-body mt-5 text-base text-fa-ink-muted leading-[1.6]"
            style={{ opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 500ms ease-out 200ms' }}
          >
            Your budget calculated precisely, before you sign. Fast Access tailors a quote to what you actually ship — no surprises later.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-8 mt-14">
          {/* LEFT — what pricing depends on */}
          <div
            className="bg-white border border-fa-hairline rounded-sm p-8 lg:p-12"
            style={{
              opacity: isInView ? 1 : 0,
              transform: isInView ? 'translateY(0)' : 'translateY(40px)',
              transition: 'opacity 400ms ease-out 100ms, transform 400ms ease-out 100ms',
            }}
          >
            <div className="text-[11px] font-semibold uppercase tracking-[0.1em] font-body text-fa-orange-soda">
              How we price
            </div>
            <h3 className="font-display mt-3 text-[22px] lg:text-[26px] font-semibold text-fa-liberty-blue tracking-[-0.01em]">
              Four factors. One transparent quote.
            </h3>
            <div className="grid sm:grid-cols-2 gap-6 mt-8">
              {factors.map(({ Icon, label, detail }) => (
                <div key={label} className="flex gap-4">
                  <Icon size={22} strokeWidth={1.6} className="text-fa-orange-soda flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-display text-[15px] font-semibold text-fa-liberty-blue tracking-[-0.01em]">
                      {label}
                    </div>
                    <div className="font-body text-[13px] text-fa-ink-muted mt-1 leading-[1.5]">
                      {detail}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — what's always included + CTA (the featured "navy" card) */}
          <div
            className="bg-fa-liberty-blue rounded-sm p-8 lg:p-12 text-fa-classic-chalk shadow-[0_24px_60px_rgba(13,18,50,0.18)] relative"
            style={{
              opacity: isInView ? 1 : 0,
              transform: isInView ? 'translateY(0)' : 'translateY(40px)',
              transition: 'opacity 400ms ease-out 200ms, transform 400ms ease-out 200ms',
            }}
          >
            <div className="text-[11px] font-semibold uppercase tracking-[0.1em] font-body text-fa-orange-soda">
              Always included
            </div>
            <h3 className="font-display mt-3 text-[22px] lg:text-[26px] font-semibold text-fa-classic-chalk tracking-[-0.01em]">
              Built around your business — not the other way round.
            </h3>
            <ul className="mt-8 grid sm:grid-cols-2 gap-3">
              {inclusions.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <Check size={14} className="text-fa-orange-soda mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                  <span className="font-body text-[13px] text-fa-classic-chalk/85 leading-[1.5]">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <BrandButton variant="on-dark" href="/contact">
                Get my quote
              </BrandButton>
              <span className="font-body text-[12px] text-fa-classic-chalk/55">
                Reply within one business day.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
