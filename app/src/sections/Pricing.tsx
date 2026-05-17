import { useInView } from '../hooks/useInView';
import { Check } from 'lucide-react';
import SectionChip from '../components/brand/SectionChip';
import BrandButton from '../components/brand/BrandButton';

const plans = [
  {
    name: 'Starter', price: '$499', period: '/mo',
    description: 'For brands shipping their first thousand orders a month. Stand up the platform in days, not quarters.',
    features: ['Up to 1,000 orders / mo', '2 fulfillment centers', 'Standard SLAs', 'Email support', 'Live tracking pages'],
    cta: 'Start free trial', style: 'normal' as const,
  },
  {
    name: 'Growth', price: '$1,899', period: '/mo',
    description: 'For scaling operations that need national reach, faster lanes, and the unboxing experience to match.',
    features: ['Up to 25,000 orders / mo', '8 fulfillment centers', 'Priority SLAs + carrier savings', 'Dedicated CSM', 'Custom unboxing', 'API + webhooks'],
    cta: 'Talk to sales', style: 'featured' as const, badge: 'Most popular',
  },
  {
    name: 'Enterprise', price: 'Custom', period: '',
    description: 'For high-volume operations with dedicated lanes, custom integrations, and bespoke SLAs.',
    features: ['Unlimited volume', 'Full network access', 'Custom SLAs + contracts', '24/7 named support', 'Dedicated facility space', 'VPC & SSO'],
    cta: 'Contact us', style: 'outlined' as const,
  },
];

export default function Pricing() {
  const { ref, isInView } = useInView(0.15);

  return (
    <section id="pricing" ref={ref} className="bg-fa-classic-chalk section-padding border-t border-fa-hairline">
      <div className="container-main">
        <div className="text-center mx-auto max-w-[640px]">
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
            One platform.<br />
            Three ways to <span className="text-fa-orange-soda">scale</span>.
          </h2>
          <p
            className="font-body mt-5 text-base text-fa-ink-muted leading-[1.6]"
            style={{ opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 500ms ease-out 200ms' }}
          >
            No long-term contracts. No per-pick fees. Pay for the volume you ship — across every facility in the network.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-14 items-start">
          {plans.map((plan, i) => {
            const isFeatured = plan.style === 'featured';
            return (
              <div
                key={plan.name}
                className={`relative p-8 lg:p-10 rounded-sm transition-all duration-200 ease-out hover:-translate-y-1 ${
                  isFeatured
                    ? 'bg-fa-liberty-blue text-fa-classic-chalk shadow-[0_24px_60px_rgba(13,18,50,0.18)]'
                    : 'bg-white border border-fa-hairline'
                }`}
                style={{
                  opacity: isInView ? 1 : 0,
                  transform: isInView ? 'translateY(0)' : 'translateY(40px)',
                  transition: `opacity 400ms ease-out ${i * 100}ms, transform 400ms ease-out ${i * 100}ms, box-shadow 200ms ease-out`,
                  marginTop: isFeatured ? -8 : 0,
                }}
              >
                {plan.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-fa-orange-soda text-fa-classic-chalk text-[10px] font-semibold uppercase tracking-[0.08em] px-3 py-1 rounded-sm font-body">
                    {plan.badge}
                  </span>
                )}
                <div className={`text-[11px] font-semibold uppercase tracking-[0.1em] font-body ${isFeatured ? 'text-fa-orange-soda' : 'text-fa-ink-faint'}`}>
                  {plan.name}
                </div>
                <div className="mt-5 flex items-baseline gap-1">
                  <span className={`font-display font-semibold text-[48px] lg:text-[60px] leading-none tracking-[-0.02em] ${isFeatured ? 'text-fa-classic-chalk' : 'text-fa-liberty-blue'}`}>
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className={`text-sm font-body ${isFeatured ? 'text-fa-classic-chalk/55' : 'text-fa-ink-faint'}`}>
                      {plan.period}
                    </span>
                  )}
                </div>
                <p className={`font-body mt-5 text-sm leading-[1.6] ${isFeatured ? 'text-fa-classic-chalk/65' : 'text-fa-ink-muted'}`}>
                  {plan.description}
                </p>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check size={14} className="text-fa-orange-soda mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                      <span className={`font-body text-sm ${isFeatured ? 'text-fa-classic-chalk/85' : 'text-fa-ink-muted'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-10">
                  <BrandButton
                    variant={isFeatured ? 'on-dark' : plan.style === 'outlined' ? 'outline' : 'filled'}
                    className="w-full justify-between"
                  >
                    {plan.cta}
                  </BrandButton>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
