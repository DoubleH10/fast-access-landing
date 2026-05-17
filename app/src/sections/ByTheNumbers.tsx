import { useInView } from '../hooks/useInView';
import SectionChip from '../components/brand/SectionChip';
import StepRibbon from '../components/brand/StepRibbon';

const stats = [
  { value: '12', suffix: 'M', label: 'Orders shipped in 2025' },
  { value: '99.99', suffix: '%', label: 'Pick & pack accuracy' },
  { value: '$0.42', suffix: '', label: 'Avg. label savings vs. baseline' },
  { value: '1.2', suffix: 'd', label: 'Avg. coast-to-coast delivery' },
];

export default function ByTheNumbers() {
  const { ref, isInView } = useInView(0.2);

  return (
    <section
      ref={ref}
      id="numbers"
      className="relative bg-fa-classic-chalk section-padding border-t border-fa-hairline overflow-hidden"
    >
      {/* Faint stepped ribbon outline on the right — paper variant */}
      <StepRibbon
        variant="outline"
        color="#0D1232"
        opacity={0.06}
        strokeWidth={1}
        className="pointer-events-none absolute -top-10 -right-20 w-[55%] max-w-[800px]"
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
          Built for <span className="text-fa-orange-soda">operational</span> scale.
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
