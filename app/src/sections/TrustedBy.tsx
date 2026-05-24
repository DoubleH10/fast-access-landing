import { useInView } from '../hooks/useInView';
import { useT } from '../i18n/I18nContext';

const platforms = [
  { key: 0, weight: 700, letter: '-0.02em', hoverColor: '#00B68C' }, // Salla
  { key: 1, weight: 600, letter: '0.01em', hoverColor: '#5A2C85' },  // Zid
  { key: 2, weight: 700, letter: '-0.03em', hoverColor: '#7AB55C' }, // Shopify
  { key: 3, weight: 500, letter: '-0.01em', hoverColor: '#96588A' }, // WooCommerce
  { key: 4, weight: 600, letter: '0.02em', hoverColor: '#EE6723' },  // Magento
];

export default function TrustedBy() {
  const { ref, isInView } = useInView(0.2);
  const { t } = useT();

  return (
    <section ref={ref} className="bg-fa-classic-chalk border-t border-fa-hairline py-14 lg:py-18">
      <div className="container-main">
        <p
          className="text-center text-[12px] font-semibold text-[#8a8a9a] uppercase tracking-[0.14em] mb-9 font-body"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0)' : 'translateY(10px)',
            transition: 'all 500ms ease-out',
          }}
        >
          {t('integrations.title')}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 lg:gap-x-20">
          {platforms.map((p, i) => {
            const name = t(`integrations.platforms.${p.key}`);
            return (
              <div
                key={p.key}
                className="transition-all duration-300 cursor-default select-none text-[20px] lg:text-[24px] font-display"
                style={{
                  fontWeight: p.weight,
                  letterSpacing: p.letter,
                  color: '#0D1232',
                  opacity: isInView ? 0.35 : 0,
                  transform: isInView ? 'translateY(0)' : 'translateY(10px)',
                  transition: `opacity 500ms ease-out ${i * 70}ms, transform 500ms ease-out ${i * 70}ms, color 200ms, opacity 200ms`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = p.hoverColor;
                  e.currentTarget.style.opacity = '1';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#0D1232';
                  e.currentTarget.style.opacity = isInView ? '0.35' : '0';
                }}
              >
                {name}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
