import { useInView } from '../hooks/useInView';
import SectionChip from '../components/brand/SectionChip';
import BrandPattern from '../components/brand/BrandPattern';

// PPT slide 15 KPIs. Real numbers TBD — see /tmp/fa-replace.md for the
// 5 placeholders that need real data from operations before launch.
const stats = [
  { value: 'TBD', suffix: '', label: 'Merchants growing with us' },
  { value: 'TBD', suffix: '', label: 'Products received daily' },
  { value: 'TBD', suffix: '', label: 'Orders delivered safely' },
  { value: 'TBD', suffix: '%', label: 'Positive customer ratings' },
];

export default function ByTheNumbers() {
  const { ref, isInView } = useInView(0.2);

  return (
    <section
      ref={ref}
      id="numbers"
      className="relative bg-fa-classic-chalk section-padding border-t border-fa-hairline overflow-hidden"
    >
      {/* Pattern 1 — feather-soft ribbon, pushed further right so it reads as background */}
      <BrandPattern
        pattern="ribbon"
        tint="navy"
        opacity={0.035}
        className="absolute -top-[20%] -right-[40%] w-[100%] max-w-none"
      />

      <div className="container-main relative z-10">
        <div
          className="mb-5"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 500ms ease-out',
          }}
        >
          <SectionChip>By the numbers</SectionChip>
        </div>
        <h2
          className="font-display font-bold text-[32px] sm:text-[40px] lg:text-[56px] text-fa-liberty-blue leading-[1.05] tracking-[-0.02em] mb-12 max-w-[780px]"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 600ms ease-out 100ms',
          }}
        >
          Every order we receive arrives at the customer — <span className="text-fa-orange-soda">safely</span>.
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 500ms ease-out ${150 + i * 100}ms`,
              }}
            >
              <div className="w-10 h-[3px] bg-fa-orange-soda mb-5" />
              <div className="font-display font-semibold text-[48px] lg:text-[60px] text-fa-liberty-blue leading-none tracking-[-0.02em]">
                {stat.value}
                {stat.suffix && <span className="text-[28px] lg:text-[32px] text-fa-orange-soda">{stat.suffix}</span>}
              </div>
              <div className="mt-3 text-[11px] font-semibold text-fa-ink-faint uppercase tracking-[0.08em] font-body">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
