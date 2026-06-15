import Reveal from '../components/Reveal';
import { useT } from '../i18n/I18nContext';

/** Wordmark weights/letter-spacing tuned per platform so the strip reads like
 *  real logos, not a uniform text list. */
const platforms = [
  { key: 0, weight: 700, letter: '-0.02em', color: '#00B68C' }, // Salla
  { key: 1, weight: 600, letter: '0.01em', color: '#5A2C85' },  // Zid
  { key: 2, weight: 700, letter: '-0.03em', color: '#7AB55C' }, // Shopify
  { key: 3, weight: 500, letter: '-0.01em', color: '#96588A' }, // WooCommerce
  { key: 4, weight: 600, letter: '0.02em', color: '#EE6723' },  // Magento
];

export default function TrustedBy() {
  const { t } = useT();
  // Eight copies: the loop shifts by -50% (4 sets), so the remaining 4 must
  // cover any viewport width — keeps the seam invisible (no whitespace).
  const loop = Array.from({ length: 8 }, () => platforms).flat();

  return (
    <section className="bg-fa-cream py-16 lg:py-20 overflow-hidden">
      <div className="container-main">
        <Reveal>
          <p className="text-center text-[12px] font-semibold text-fa-ink-faint uppercase tracking-[0.16em] mb-10 font-body">
            {t('integrations.title')}
          </p>
        </Reveal>
      </div>

      <Reveal
        // overflow-hidden + contain:paint clip the wide GPU-animated marquee
        // track here at its own wrapper; the mask only fades the edges, it does
        // not clip, so without this the track bleeds past and lets the whole page
        // scroll sideways into white space on iOS Safari.
        className="group relative overflow-hidden [contain:paint]"
        // soft fade on both edges so wordmarks dissolve instead of clipping
        style={{
          WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)',
          maskImage: 'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)',
        }}
      >
        <div className="fa-marquee flex w-max items-center group-hover:[animation-play-state:paused]">
          {loop.map((p, i) => (
            <span
              key={i}
              className="fa-marquee__item font-display text-[22px] lg:text-[26px] mx-8 lg:mx-12 cursor-default select-none transition-colors duration-300"
              style={{ fontWeight: p.weight, letterSpacing: p.letter, color: '#0D1232' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = p.color; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#0D1232'; }}
            >
              {t(`integrations.platforms.${p.key}`)}
            </span>
          ))}
        </div>
      </Reveal>

      <style>{`
        .fa-marquee {
          animation: fa-marquee-scroll 136s linear infinite;
          opacity: 0.4;
        }
        .fa-marquee:hover { opacity: 0.85; }
        .fa-marquee__item:hover { opacity: 1; }
        @keyframes fa-marquee-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        html[dir='rtl'] .fa-marquee { animation-direction: reverse; }
        @media (prefers-reduced-motion: reduce) {
          .fa-marquee { animation: none; opacity: 0.5; flex-wrap: wrap; justify-content: center; }
        }
      `}</style>
    </section>
  );
}
