import { useInView } from '../hooks/useInView';
import { Warehouse, Package, Truck, Activity, Zap, Headphones, ArrowRight } from 'lucide-react';
import SectionChip from '../components/brand/SectionChip';
import BrandPattern from '../components/brand/BrandPattern';

/**
 * 6-service taxonomy mirrors PPT slides 6 and 24-25.
 * Order matters: storage → packing → shipping → tracking → cloud → support
 * traces the operational arc the customer experiences.
 */
const services = [
  {
    icon: Warehouse,
    number: '01',
    title: 'Storage',
    description:
      'Spacious warehouses equipped with the latest monitoring and safety systems. Climate control keeps temperature-sensitive products in perfect condition.',
  },
  {
    icon: Package,
    number: '02',
    title: 'Packing & Preparation',
    description:
      'A trained team packs every order in durable materials and stamps it with your brand identity — custom inserts, cards, and gift options on request.',
  },
  {
    icon: Truck,
    number: '03',
    title: 'Shipping & Delivery',
    description:
      'Fast delivery across every region of Saudi Arabia and beyond, through the best local and international carrier partners.',
  },
  {
    icon: Activity,
    number: '04',
    title: 'Real-time Tracking',
    description:
      'A clean, easy dashboard tracks every shipment from receipt to handover — with performance reports that give you the data to grow.',
  },
  {
    icon: Zap,
    number: '05',
    title: 'Cloud Stores',
    description:
      'Cloud warehouses in city centers deliver in 2 to 4 hours, same day. Built for urgent daily orders, peak hours, and holidays.',
  },
  {
    icon: Headphones,
    number: '06',
    title: 'Customer Support',
    description:
      '24/7 customer service for questions, urgent supply-chain issues, and operational advice on the logistics you run with us.',
  },
];

export default function ServicesGrid() {
  const { ref, isInView } = useInView(0.2);

  return (
    <section id="services" ref={ref} className="relative bg-fa-classic-chalk section-padding border-t border-fa-hairline overflow-hidden">
      <BrandPattern
        pattern="lozenge"
        tint="navy"
        opacity={0.03}
        className="absolute -top-[8%] -right-[15%] w-[55%] max-w-[800px]"
      />
      <div className="container-main relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 items-end mb-14">
          <div className="lg:col-span-7">
            <div className="mb-5" style={{ opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 500ms ease-out' }}>
              <SectionChip>What we do</SectionChip>
            </div>
            <h2 className="font-display font-bold text-[32px] sm:text-[40px] lg:text-[56px] text-fa-liberty-blue leading-[1.05] tracking-[-0.02em]" style={{ opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 600ms ease-out 100ms' }}>
              Everything your business needs to <span className="text-fa-orange-soda">grow</span>, in one place.
            </h2>
          </div>
          <p className="font-body lg:col-span-5 text-base text-fa-ink-muted leading-[1.6]" style={{ opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 500ms ease-out 200ms' }}>
            Stop juggling vendors. Fast Access runs storage, packing, shipping, tracking, and customer support as one tightly-coordinated operation — so every order arrives the way you sold it.
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
