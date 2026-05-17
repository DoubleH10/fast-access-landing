import { useInView } from '../hooks/useInView';

const brands = [
  { name: 'spotify', weight: 700, letter: '-0.04em' },
  { name: 'slack', weight: 400, letter: '0.02em' },
  { name: 'Dropbox', weight: 500, letter: '-0.02em' },
  { name: 'Webflow', weight: 600, letter: '-0.01em' },
  { name: 'Zoom', weight: 700, letter: '0.01em' },
  { name: 'Coinbase', weight: 500, letter: '-0.02em' },
];

export default function TrustedBy() {
  const { ref, isInView } = useInView(0.2);

  return (
    <section ref={ref} className="bg-fa-classic-chalk border-t border-fa-hairline py-12 lg:py-16">
      <div className="container-main">
        <p
          className="text-center text-[11px] font-medium text-[#8a8a9a] uppercase tracking-[0.12em] mb-7"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0)' : 'translateY(10px)',
            transition: 'all 400ms ease-out',
          }}
        >
          Trusted by leading e-commerce brands
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5 lg:gap-x-16">
          {brands.map((brand, i) => (
            <div
              key={brand.name}
              className="transition-all duration-200 hover:opacity-70 cursor-default select-none"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: brand.weight,
                letterSpacing: brand.letter,
                fontSize: '0.85rem',
                color: '#0D1232',
                opacity: isInView ? 0.3 : 0,
                filter: 'grayscale(100%)',
                transform: isInView ? 'translateY(0)' : 'translateY(10px)',
                transition: `all 400ms ease-out ${i * 60}ms`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.filter = 'grayscale(0%)';
                e.currentTarget.style.opacity = '0.65';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.filter = 'grayscale(100%)';
                e.currentTarget.style.opacity = isInView ? '0.3' : '0';
              }}
            >
              {brand.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
