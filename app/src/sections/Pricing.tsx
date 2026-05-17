import { useInView } from '../hooks/useInView';
import { Check, ArrowRight } from 'lucide-react';

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
    features: ['Unlimited volume', 'Full network access', 'Custom SLAs + contracts', '24/7 named support', 'Dedicated facility space', 'VPC \u0026 SSO'],
    cta: 'Contact us', style: 'outlined' as const,
  },
];

export default function Pricing() {
  const { ref, isInView } = useInView(0.15);

  return (
    <section id="pricing" ref={ref} className="bg-[#f5f5f0] section-padding border-t border-[#e8e8e8]">
      <div className="container-main">
        <span className="eyebrow-label block mb-4" style={{ opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 500ms ease-out' }}>Plans \u0026 pricing</span>
        <h2 className="font-display font-bold text-[28px] sm:text-[36px] lg:text-[48px] text-[#1a1a3e] leading-[1.1]" style={{ opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 600ms ease-out 100ms' }}>
          One platform. Three ways to scale.
        </h2>
        <p className="mt-4 text-sm sm:text-base text-[#6b6b7b] max-w-[520px] leading-relaxed" style={{ opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 500ms ease-out 200ms' }}>
          No long-term contracts. No per-pick fees. Pay for the volume you ship — across every facility in the network.
        </p>

        <div className="grid md:grid-cols-3 gap-5 mt-10 items-start">
          {plans.map((plan, i) => (
            <div key={plan.name} className={`relative p-8 lg:p-10 transition-all duration-200 ease-out hover:-translate-y-1 ${
              plan.style === 'featured' ? 'bg-[#1a1a3e]' : plan.style === 'outlined' ? 'bg-white border border-[#e8e8e8]' : 'bg-white border border-[#e8e8e8]'
            }`} style={{ opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(40px)', transition: `opacity 400ms ease-out ${i * 100}ms, transform 400ms ease-out ${i * 100}ms, box-shadow 200ms ease-out`, marginTop: plan.style === 'featured' ? -8 : 0 }}>
              {plan.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#ff6b35] text-[#f5f5f0] text-[9px] font-semibold uppercase tracking-wide px-3 py-1 rounded-full">{plan.badge}</span>
              )}
              <div className={`text-[11px] font-semibold uppercase tracking-[0.08em] ${plan.style === 'featured' ? 'text-[#8a8a9a]' : 'text-[#8a8a9a]'}`}>{plan.name}</div>
              <div className="mt-4 flex items-baseline gap-0">
                <span className={`font-mono text-[42px] lg:text-[48px] leading-none ${plan.style === 'featured' ? 'text-[#f5f5f0]' : 'text-[#1a1a3e]'}`}>{plan.price}</span>
                {plan.period && <span className={`text-sm ${plan.style === 'featured' ? 'text-[#8a8a9a]' : 'text-[#8a8a9a]'}`}>{plan.period}</span>}
              </div>
              <p className={`mt-4 text-sm leading-relaxed ${plan.style === 'featured' ? 'text-[#8a8a9a]' : 'text-[#6b6b7b]'}`}>{plan.description}</p>
              <ul className="mt-5 space-y-2.5">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check size={14} className="text-[#ff6b35] mt-0.5 flex-shrink-0" />
                    <span className={`text-sm ${plan.style === 'featured' ? 'text-[#f5f5f0]' : 'text-[#6b6b7b]'}`}>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className={`w-full mt-8 flex items-center justify-center gap-2 py-3.5 text-sm font-semibold uppercase tracking-wider transition-colors duration-150 ${
                plan.style === 'featured' ? 'bg-[#ff6b35] text-[#f5f5f0] hover:bg-[#ff8c5a]' :
                plan.style === 'outlined' ? 'border border-[#1a1a3e] text-[#1a1a3e] hover:bg-[#1a1a3e] hover:text-[#f5f5f0]' :
                'bg-[#1a1a3e] text-[#f5f5f0] hover:bg-[#2a2a5a]'
              }`}>
                {plan.cta}
                <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
