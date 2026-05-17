import { useInView } from '../hooks/useInView';
import { Clock, MapPin, Zap } from 'lucide-react';
import SectionChip from '../components/brand/SectionChip';
import BrandPattern from '../components/brand/BrandPattern';

/**
 * Cloud Stores — same-day delivery highlight from PPT slide 10.
 * The brand's standout claim: "1/3 of KSA consumers want next-day.
 * Fast Access ships in 2–4 hours, same day, from cloud stores inside
 * the city." This section makes that promise loud and unmissable.
 */
export default function CloudStores() {
  const { ref, isInView } = useInView(0.2);

  return (
    <section
      ref={ref}
      className="relative bg-fa-liberty-blue section-padding overflow-hidden border-t border-fa-classic-chalk/5"
    >
      {/* Pattern 1 ribbon — speed/momentum suggestion */}
      <BrandPattern
        pattern="ribbon"
        tint="orange"
        opacity={0.18}
        className="absolute top-1/2 -right-[10%] w-[100%] max-w-none -translate-y-1/2"
      />

      <div className="container-main relative z-10">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-center">
          {/* LEFT — the claim */}
          <div>
            <div
              className="mb-5"
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 500ms ease-out',
              }}
            >
              <SectionChip onDark>Cloud Stores · Same-Day Delivery</SectionChip>
            </div>

            <h2
              className="font-display font-bold text-[32px] sm:text-[44px] lg:text-[60px] text-fa-classic-chalk leading-[1.04] tracking-[-0.02em]"
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 600ms ease-out 100ms',
              }}
            >
              ~⅓ of Saudi consumers want it next day.
              <br />
              <span className="text-fa-orange-soda">We deliver in 2–4 hours.</span>
            </h2>

            <p
              className="font-body mt-6 text-base lg:text-lg text-fa-classic-chalk/65 max-w-[520px] leading-[1.55]"
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 500ms ease-out 200ms',
              }}
            >
              Cloud warehouses inside Saudi cities — purpose-built for urgent
              daily orders, peak hours, and holidays. The fastest way to win a
              new customer's loyalty on their very first order.
            </p>

            <ul
              className="mt-8 space-y-3 font-body text-sm text-fa-classic-chalk/75"
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 500ms ease-out 300ms',
              }}
            >
              {[
                'Best option for urgent daily orders',
                'Wins customer loyalty from the first order',
                'Covers peak hours and holiday surges',
              ].map((line) => (
                <li key={line} className="flex items-start gap-3">
                  <span className="mt-2 w-1.5 h-1.5 rounded-sm bg-fa-orange-soda flex-shrink-0" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT — visual stat plate */}
          <div
            className="relative"
            style={{
              opacity: isInView ? 1 : 0,
              transform: isInView ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 700ms ease-out 250ms',
            }}
          >
            <div
              className="relative rounded-[20px] p-8 lg:p-12"
              style={{
                background:
                  'linear-gradient(135deg, rgba(241,91,65,0.16) 0%, rgba(45,46,117,0.4) 100%)',
                boxShadow:
                  'inset 0 0 0 1px rgba(244,244,241,0.08), 0 24px 60px rgba(0,0,0,0.3)',
                backdropFilter: 'blur(8px)',
              }}
            >
              {/* Headline stat */}
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 bg-fa-orange-soda/15 border border-fa-orange-soda/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-fa-orange-soda animate-pulse" />
                  <span className="font-body text-[10px] font-semibold tracking-[0.12em] text-fa-orange-soda uppercase">
                    Live · Same-day window
                  </span>
                </div>
                <div className="font-display font-bold text-[88px] lg:text-[112px] text-fa-classic-chalk leading-[0.9] tracking-[-0.04em]">
                  2–4<span className="text-fa-orange-soda">hr</span>
                </div>
                <div className="font-body mt-3 text-sm text-fa-classic-chalk/70 uppercase tracking-[0.14em] font-semibold">
                  From order to your customer's door
                </div>
              </div>

              {/* Sub-metrics */}
              <div className="grid grid-cols-3 gap-4 mt-10 pt-8 border-t border-fa-classic-chalk/10">
                {[
                  { Icon: Clock, value: 'Same day', label: 'Delivery' },
                  { Icon: MapPin, value: 'In-city', label: 'Cloud stores' },
                  { Icon: Zap, value: '24/7', label: 'Operations' },
                ].map(({ Icon, value, label }) => (
                  <div key={label} className="text-center">
                    <Icon
                      size={18}
                      strokeWidth={1.6}
                      className="text-fa-orange-soda mx-auto"
                    />
                    <div className="font-display text-sm text-fa-classic-chalk mt-2 font-semibold tracking-[-0.01em]">
                      {value}
                    </div>
                    <div className="font-body text-[10px] uppercase tracking-[0.1em] text-fa-classic-chalk/50 font-semibold mt-1">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
