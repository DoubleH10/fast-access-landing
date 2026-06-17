import { useInView } from '../hooks/useInView';
import SectionChip from '../components/brand/SectionChip';
import RevealText from '../components/brand/RevealText';
import BrandPattern from '../components/brand/BrandPattern';
import { useT } from '../i18n/I18nContext';

/**
 * Coverage / Network map — simplified per client feedback ("make it simpler
 * and better looking: just the highlighted Kingdom and arrows out of it
 * showing international shipping; drop the live-operations data").
 *
 * No Leaflet, no tiles, no live counters. A self-contained SVG: the Saudi
 * Arabia outline highlighted in brand orange with one origin hub (Riyadh),
 * and animated shipping arrows fanning out to the world's regions.
 */

// ── Equirectangular projection tuned so the Kingdom sits centred in an
// 800×600 frame, leaving margins for the outbound arrows. Riyadh is the
// anchor point; longitude is cos-corrected at the Kingdom's mid-latitude.
const RX = 410;
const RY = 285;
const K = 20; // px per degree latitude
const KX = K * Math.cos((24.7136 * Math.PI) / 180); // px per degree longitude
const proj = (lat: number, lng: number): [number, number] => [
  RX + (lng - 46.6753) * KX,
  RY - (lat - 24.7136) * K,
];

// Simplified Saudi Arabia boundary ([lat, lng], Douglas–Peucker reduced).
const KSA_BOUNDARY: [number, number][] = [
  [32.155, 39.203], [31.501, 37.002], [30.501, 37.996], [29.998, 37.5], [29.869, 36.752],
  [29.185, 36.072], [29.355, 34.933], [27.941, 34.486], [27.737, 35.272], [25.923, 36.584],
  [25.572, 36.436], [25.26, 37.013], [24.242, 37.458], [23.483, 38.546], [22.584, 38.958],
  [21.974, 38.82], [20.977, 39.15], [19.467, 40.798], [18.151, 41.418], [17.387, 42.237],
  [16.42, 42.731], [16.647, 43.215], [17.524, 43.292], [17.288, 46.752], [16.957, 47.181],
  [18.167, 48.186], [18.62, 49.114], [19.0, 52.0], [20.002, 54.998], [22.002, 55.665],
  [22.706, 55.213], [22.94, 52.581], [24.257, 51.59], [24.317, 51.332], [24.64, 51.467],
  [24.545, 50.929], [26.04, 50.028], [26.154, 50.238], [26.686, 50.146], [26.962, 49.73],
  [27.311, 49.709], [27.369, 49.481], [27.159, 49.434], [27.512, 49.286], [27.677, 48.884],
  [28.495, 48.512], [28.524, 47.704], [29.0, 47.466], [29.203, 44.72], [31.12, 42.079],
  [31.945, 40.424], [32.155, 39.203],
];

const KSA_PATH =
  KSA_BOUNDARY.map(([lat, lng], i) => {
    const [x, y] = proj(lat, lng);
    return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(' ') + ' Z';

// The three main regional hubs. Outbound arrows emanate from whichever hub
// faces the destination, so the read is "three regions, out to the world".
type Hub = { x: number; y: number; lx: number; ly: number; anchor: 'start' | 'middle' | 'end'; en: string; ar: string };
const mkHub = (lat: number, lng: number, ldx: number, ldy: number, anchor: Hub['anchor'], en: string, ar: string): Hub => {
  const [x, y] = proj(lat, lng);
  return { x, y, lx: x + ldx, ly: y + ldy, anchor, en, ar };
};
const HUBS: Record<'jed' | 'ryd' | 'dmm', Hub> = {
  jed: mkHub(21.5433, 39.1728, 0, 20, 'middle', 'Jeddah', 'جدة'),
  ryd: mkHub(24.7136, 46.6753, 12, 4, 'start', 'Riyadh', 'الرياض'),
  dmm: mkHub(26.4207, 50.0888, 0, -13, 'middle', 'Dammam', 'الدمام'),
};

// Outbound shipping arrows — each fans from a hub toward a world region.
type Arrow = {
  from: 'jed' | 'ryd' | 'dmm';
  x: number; y: number; lx: number; ly: number;
  anchor: 'start' | 'middle' | 'end';
  en: string; ar: string;
};
const ARROWS: Arrow[] = [
  { from: 'jed', x: 150, y: 150, lx: 150, ly: 128, anchor: 'middle', en: 'Europe', ar: 'أوروبا' },
  { from: 'jed', x: 100, y: 300, lx: 94, ly: 300, anchor: 'end', en: 'Americas', ar: 'الأمريكتان' },
  { from: 'jed', x: 175, y: 505, lx: 175, ly: 528, anchor: 'middle', en: 'Africa', ar: 'أفريقيا' },
  { from: 'ryd', x: 400, y: 58, lx: 400, ly: 42, anchor: 'middle', en: 'Türkiye', ar: 'تركيا' },
  { from: 'dmm', x: 560, y: 515, lx: 560, ly: 537, anchor: 'middle', en: 'South Asia', ar: 'جنوب آسيا' },
  { from: 'dmm', x: 720, y: 322, lx: 712, ly: 322, anchor: 'end', en: 'East Asia', ar: 'شرق آسيا' },
];

// Gentle quadratic arc from a hub origin to an outbound endpoint.
function arrowPath(ox: number, oy: number, ex: number, ey: number): string {
  const mx = (ox + ex) / 2;
  const my = (oy + ey) / 2;
  const dx = ex - ox;
  const dy = ey - oy;
  const cx = mx - dy * 0.1;
  const cy = my + dx * 0.1;
  return `M${ox.toFixed(1)} ${oy.toFixed(1)} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${ex} ${ey}`;
}

const ACCENT = '#F15B41';

export default function Coverage() {
  const { ref, isInView } = useInView(0.15);
  const { t, locale } = useT();
  const isAr = locale === 'ar';
  const lang: 'en' | 'ar' = isAr ? 'ar' : 'en';

  // High-level reach — no live counts, just the coverage story.
  const stats = [
    { value: isAr ? 'السعودية' : 'KSA', label: isAr ? 'تغطية وطنية — كل المدن الرئيسية' : 'Nationwide — every major city' },
    { value: isAr ? 'الخليج' : 'GCC', label: isAr ? 'شحن سريع لجميع دول الخليج' : 'Fast shipping to all GCC countries' },
    { value: isAr ? 'دولي' : 'Global', label: isAr ? 'شحنات دولية عبر شركاء موثوقين' : 'International shipments worldwide' },
  ];

  return (
    <section id="network" ref={ref} className="bg-fa-liberty-blue section-padding relative overflow-hidden">
      <BrandPattern
        pattern="isometric"
        tint="orange"
        opacity={0.06}
        className="absolute -top-[10%] -right-[15%] w-[70%] max-w-[1100px]"
      />

      <div className="container-main relative z-10">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-16 items-center">
          {/* LEFT — copy + reach */}
          <div>
            <div className="mb-4" style={{ opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 500ms ease-out' }}>
              <SectionChip onDark>{t('coverage.chip')}</SectionChip>
            </div>
            <h2 className="font-display font-bold text-[32px] sm:text-[40px] lg:text-[52px] text-fa-classic-chalk leading-[1.05] tracking-[-0.02em]" style={{ opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 600ms ease-out 100ms' }}>
              <RevealText accent={t('coverage.headlineHighlight')} stagger={50}>
                {`${t('coverage.headlineA')} ${t('coverage.headlineHighlight')} ${t('coverage.headlineB')}`}
              </RevealText>
            </h2>
            <p className="font-body mt-5 text-base text-fa-classic-chalk/60 max-w-[480px] leading-[1.65]" style={{ opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 500ms ease-out 200ms' }}>
              {t('coverage.body')}
            </p>

            {/* Reach stats */}
            <div className="grid grid-cols-3 gap-4 mt-9 pt-8 border-t border-fa-classic-chalk/10 max-w-[460px]" style={{ opacity: isInView ? 1 : 0, transition: 'opacity 600ms ease-out 300ms' }}>
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="font-display font-semibold text-[34px] lg:text-[38px] text-fa-classic-chalk leading-none tracking-[-0.02em]">
                    {s.value}
                  </div>
                  <div className="mt-2 text-[11px] font-semibold text-fa-classic-chalk/55 uppercase tracking-[0.08em] font-body leading-snug">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — highlighted Kingdom + outbound arrows */}
          <div style={{ opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(40px)', transition: 'all 800ms ease-out 200ms' }}>
            <div className="fa-netmap-frame">
              <svg className="fa-reachmap" viewBox="0 0 800 600" role="img"
                aria-label={isAr ? 'خريطة تغطية: السعودية وشحن دولي' : 'Coverage map: Saudi Arabia shipping internationally'}>
                <defs>
                  <radialGradient id="ksaFill" cx="50%" cy="45%" r="65%">
                    <stop offset="0%" stopColor={ACCENT} stopOpacity="0.42" />
                    <stop offset="100%" stopColor={ACCENT} stopOpacity="0.16" />
                  </radialGradient>
                  <marker id="reachArrow" viewBox="0 0 10 10" refX="8" refY="5"
                    markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M0 0 L10 5 L0 10 z" fill={ACCENT} />
                  </marker>
                </defs>

                {/* Faint coordinate-dot backdrop */}
                <g opacity="0.05" fill="#FFFFFF">
                  {Array.from({ length: 15 }, (_, r) =>
                    Array.from({ length: 20 }, (_, c) => (
                      <circle key={`${r}-${c}`} cx={c * 42 + 20} cy={r * 42 + 18} r="1.1" />
                    )),
                  )}
                </g>

                {/* Reach rings emanating from the Kingdom */}
                {[150, 250, 350].map((rr) => (
                  <circle key={rr} cx={HUBS.ryd.x} cy={HUBS.ryd.y} r={rr} fill="none"
                    stroke={ACCENT} strokeOpacity="0.07" strokeWidth="1" />
                ))}

                {/* Highlighted Saudi Arabia */}
                <path d={KSA_PATH} fill="url(#ksaFill)" stroke={ACCENT}
                  strokeWidth="1.6" strokeLinejoin="round"
                  style={{ filter: 'drop-shadow(0 0 14px rgba(241,91,65,0.35))' }} />

                {/* Outbound shipping arrows — from the facing regional hub */}
                <g>
                  {ARROWS.map((a) => {
                    const o = HUBS[a.from];
                    return (
                      <g key={a.en}>
                        <path className="fa-reach-arrow" d={arrowPath(o.x, o.y, a.x, a.y)}
                          fill="none" stroke={ACCENT} strokeWidth="1.6"
                          markerEnd="url(#reachArrow)" />
                        <text className="fa-reach-label" x={a.lx} y={a.ly} textAnchor={a.anchor}>
                          {a[lang]}
                        </text>
                      </g>
                    );
                  })}
                </g>

                {/* Country label */}
                <text className="fa-reach-country" x={proj(19.9, 44.5)[0]} y={proj(19.9, 44.5)[1]} textAnchor="middle">
                  {isAr ? 'السعودية' : 'SAUDI ARABIA'}
                </text>

                {/* Three regional hubs — Jeddah · Riyadh · Dammam */}
                {(Object.values(HUBS) as Hub[]).map((h, i) => (
                  <g key={h.en}>
                    <circle className="fa-reach-ping" cx={h.x} cy={h.y} r="6" fill="none"
                      stroke={ACCENT} strokeWidth="1.5" style={{ animationDelay: `${i * 0.8}s` }} />
                    <circle cx={h.x} cy={h.y} r="4.5" fill={ACCENT} stroke="#fff" strokeWidth="1.5" />
                    <text className="fa-reach-hub" x={h.lx} y={h.ly} textAnchor={h.anchor}>
                      {h[lang]}
                    </text>
                  </g>
                ))}
              </svg>
              <div className="fa-netmap-vignette" aria-hidden />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
