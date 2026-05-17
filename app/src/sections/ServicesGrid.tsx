import { useInView } from '../hooks/useInView';
import { Truck, Warehouse, Package, RefreshCw, BarChart3, Gift, ArrowRight } from 'lucide-react';

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
    <section id="services" ref={ref} className="bg-[#f5f5f0] section-padding">
      <div className="container-main">
        <span className="eyebrow-label block mb-4" style={{ opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 500ms ease-out' }}>What we do</span>
        <h2 className="font-display font-bold text-[28px] sm:text-[36px] lg:text-[48px] text-[#1a1a3e] leading-[1.1]" style={{ opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 600ms ease-out 100ms' }}>
          One platform, the whole back office.
        </h2>
        <p className="mt-4 text-sm sm:text-base text-[#6b6b7b] max-w-[560px] leading-relaxed" style={{ opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 500ms ease-out 200ms' }}>
          From the inbound dock to the customer's doorstep — and the journey back. Every step instrumented, every decision automated, every shipment yours to see.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <div key={service.number} className="group bg-white border border-[#e8e8e8] p-7 lg:p-8 transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-lg hover:border-transparent cursor-default"
                style={{ opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(40px)', transition: `opacity 400ms ease-out ${i * 80}ms, transform 400ms ease-out ${i * 80}ms, box-shadow 200ms ease-out, border-color 200ms ease-out` }}
              >
                <span className="font-mono text-[11px] text-[#ff6b35]">{service.number}</span>
                <Icon size={36} strokeWidth={1.5} className="mt-4 text-[#1a1a3e]" />
                <h3 className="mt-4 text-base font-semibold text-[#1a1a3e]">{service.title}</h3>
                <p className="mt-2 text-sm text-[#6b6b7b] leading-relaxed">{service.description}</p>
                <span className="inline-flex items-center gap-1 mt-4 text-[13px] font-medium text-[#ff6b35] group-hover:underline transition-all duration-150">
                  Learn more <ArrowRight size={13} />
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
