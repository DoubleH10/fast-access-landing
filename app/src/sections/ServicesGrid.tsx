import { useInView } from '../hooks/useInView';
import { Truck, Warehouse, Package, RefreshCw, BarChart3, Gift, ArrowRight } from 'lucide-react';
import SectionChip from '../components/brand/SectionChip';

const services = [
  { icon: Truck, number: '01', title: 'Smart Fulfillment', description: 'End-to-end orchestration from cart to doorstep, with intelligent routing that picks the right facility for every order.' },
  { icon: Warehouse, number: '02', title: 'Network Warehousing', description: '42 fulfillment centers, climate-controlled bays, and dedicated lanes — without the lease.' },
  { icon: Package, number: '03', title: 'Multi-carrier Shipping', description: 'Rate-shop every label across 11+ carriers in real time. Service rules you set; savings you keep.' },
  { icon: RefreshCw, number: '04', title: 'Returns \u0026 Reverse', description: 'One-click returns portal for shoppers, automated grading and restocking for you. Closed-loop inventory in hours, not days.' },
  { icon: BarChart3, number: '05', title: 'Inventory Intelligence', description: 'Demand forecasting and replenishment alerts that look at your sales velocity, lead times, and seasonality.' },
  { icon: Gift, number: '06', title: 'Branded Unboxing', description: 'Custom inserts, packaging, and post-purchase comms that make every delivery feel intentional.' },
];

export default function ServicesGrid() {
  const { ref, isInView } = useInView(0.2);

  return (
    <section id="services" ref={ref} className="bg-fa-classic-chalk section-padding border-t border-fa-hairline">
      <div className="container-main">
        <div className="grid lg:grid-cols-12 gap-8 items-end mb-14">
          <div className="lg:col-span-7">
            <div className="mb-5" style={{ opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 500ms ease-out' }}>
              <SectionChip>What we do</SectionChip>
            </div>
            <h2 className="font-display font-bold text-[32px] sm:text-[40px] lg:text-[56px] text-fa-liberty-blue leading-[1.05] tracking-[-0.02em]" style={{ opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 600ms ease-out 100ms' }}>
              One platform, the whole <span className="text-fa-orange-soda">back office</span>.
            </h2>
          </div>
          <p className="font-body lg:col-span-5 text-base text-fa-ink-muted leading-[1.6]" style={{ opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 500ms ease-out 200ms' }}>
            From the inbound dock to the customer's doorstep — and the journey back. Every step instrumented, every decision automated, every shipment yours to see.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <div
                key={service.number}
                className="group relative bg-white border border-fa-hairline p-8 lg:p-10 transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(13,18,50,0.08)] hover:border-fa-orange-soda/30 cursor-default rounded-sm"
                style={{
                  opacity: isInView ? 1 : 0,
                  transform: isInView ? 'translateY(0)' : 'translateY(40px)',
                  transition: `opacity 400ms ease-out ${i * 80}ms, transform 400ms ease-out ${i * 80}ms, box-shadow 200ms ease-out, border-color 200ms ease-out`,
                }}
              >
                <div className="flex items-start justify-between">
                  <span className="font-display text-[12px] text-fa-orange-soda font-semibold tracking-[0.12em]">{service.number}</span>
                  <Icon size={28} strokeWidth={1.6} className="text-fa-liberty-blue" />
                </div>
                <h3 className="font-display mt-8 text-[20px] lg:text-[22px] font-semibold text-fa-liberty-blue tracking-[-0.01em]">
                  {service.title}
                </h3>
                <p className="font-body mt-3 text-sm text-fa-ink-muted leading-[1.6]">{service.description}</p>
                <span className="inline-flex items-center gap-1.5 mt-6 text-[12px] font-semibold uppercase tracking-[0.06em] text-fa-orange-soda group-hover:gap-2 transition-all duration-200 font-body">
                  Learn more <ArrowRight size={13} strokeWidth={2.4} />
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
