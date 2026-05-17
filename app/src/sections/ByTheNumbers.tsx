import { useInView } from '../hooks/useInView';

const stats = [
  { value: '12', suffix: 'M', label: 'Orders shipped in 2025' },
  { value: '99.99', suffix: '%', label: 'Pick \u0026 pack accuracy' },
  { value: '$0.42', suffix: '', label: 'Avg. label savings vs. baseline' },
  { value: '1.2', suffix: 'd', label: 'Avg. coast-to-coast delivery' },
];

export default function ByTheNumbers() {
  const { ref, isInView } = useInView(0.2);

  return (
    <section ref={ref} id="numbers" className="bg-[#f5f5f0] section-padding border-t border-[#e8e8e8]">
      <div className="container-main">
        <span className="eyebrow-label block mb-4" style={{ opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 500ms ease-out' }}>
          By the numbers
        </span>
        <h2 className="font-display font-bold text-[28px] sm:text-[36px] lg:text-[48px] text-[#1a1a3e] leading-[1.1] mb-10" style={{ opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 600ms ease-out 100ms' }}>
          Built for <span className="text-[#ff6b35] italic">operational</span> scale.
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={stat.label} style={{ opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(30px)', transition: `all 500ms ease-out ${150 + i * 150}ms` }}>
              <div className="w-10 h-px bg-[#ff6b35] mb-4" />
              <div className="font-mono text-[40px] lg:text-[48px] text-[#1a1a3e] leading-none">
                {stat.value}
                {stat.suffix && <span className="text-[22px] lg:text-[24px] text-[#ff6b35]">{stat.suffix}</span>}
              </div>
              <div className="mt-2 text-[10px] sm:text-[11px] font-medium text-[#8a8a9a] uppercase tracking-[0.08em]">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
