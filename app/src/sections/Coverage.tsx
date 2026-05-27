import { useInView } from '../hooks/useInView';
import { ComposableMap, Geographies, Geography, Marker, Line } from 'react-simple-maps';
import SectionChip from '../components/brand/SectionChip';
import BrandPattern from '../components/brand/BrandPattern';
import { useT } from '../i18n/I18nContext';
import { useMediaQuery } from '../hooks/useMediaQuery';

/**
 * Coverage map — real geography rendered via react-simple-maps + a TopoJSON
 * world atlas (countries-110m, ~120kb). Continents are drawn as muted
 * paper-tone outlines, cities as orange pins, and trade routes as dashed
 * orange arcs. Uses the geoEqualEarth projection — looks closer to a
 * "designer" world map than mercator's stretched poles.
 */

// CDN-hosted Natural Earth simplified countries (Mike Bostock's world-atlas)
const TOPO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

type City = {
  name: string;
  coords: [number, number];
  hub?: boolean;
  label?: boolean;
  labelDx?: number;
  labelDy?: number;
};

const cities: City[] = [
  { name: 'Riyadh', coords: [46.68, 24.71], hub: true, label: true, labelDy: -18 },
  { name: 'Jeddah', coords: [39.19, 21.49], hub: true, label: true, labelDx: -22, labelDy: 16 },
  { name: 'Dammam', coords: [50.10, 26.43], hub: true, label: true, labelDx: 26, labelDy: -4 },
  { name: 'Makkah', coords: [39.83, 21.39] },
  { name: 'Madinah', coords: [39.61, 24.47] },
  { name: 'Dubai', coords: [55.27, 25.20], hub: true, label: true, labelDx: 28, labelDy: 12 },
  { name: 'Doha', coords: [51.53, 25.29] },
  { name: 'Kuwait City', coords: [47.98, 29.38] },
  { name: 'Manama', coords: [50.59, 26.23] },
  { name: 'Muscat', coords: [58.41, 23.59] },
  { name: 'London', coords: [-0.13, 51.51], label: true },
  { name: 'Istanbul', coords: [28.98, 41.01], label: true, labelDy: -16 },
  { name: 'Singapore', coords: [103.82, 1.35], label: true, labelDx: 32 },
];

// Indexes refer to the cities array above
const routes: Array<[number, number]> = [
  [0, 1], [0, 2], [1, 3], [1, 4], [2, 7],
  [0, 5], [5, 6], [5, 8], [5, 9],
  [0, 11], [11, 10], [5, 12],
];

export default function Coverage() {
  const { ref, isInView } = useInView(0.15);
  const { t, locale } = useT();
  const isAr = locale === 'ar';
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
  const projectionScale = isMobile ? 900 : isTablet ? 390 : 245;
  const projectionCenter: [number, number] = isMobile ? [48, 24] : isTablet ? [44, 18] : [43, 18];

  const stats = [
    { value: '13', label: isAr ? 'منطقة داخل السعودية' : 'Saudi regions covered' },
    { value: 'GCC', label: isAr ? 'وصول خليجي' : 'Gulf reach' },
    { value: '2-4hr', label: isAr ? 'توصيل داخل المدن' : 'In-city delivery window' },
    { value: '24/7', label: isAr ? 'دعم تشغيلي' : 'Operations support' },
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
        <div className="mb-5" style={{ opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 500ms ease-out' }}>
          <SectionChip onDark>{t('coverage.chip')}</SectionChip>
        </div>
        <h2 className="font-display font-bold text-[32px] sm:text-[40px] lg:text-[56px] text-fa-classic-chalk leading-[1.05] tracking-[-0.02em]" style={{ opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 600ms ease-out 100ms' }}>
          {t('coverage.headlineA')} <span className="text-fa-orange-soda">{t('coverage.headlineHighlight')}</span> {t('coverage.headlineB')}
        </h2>
        <p className="font-body mt-5 text-base text-fa-classic-chalk/55 max-w-[600px] leading-[1.6]" style={{ opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 500ms ease-out 200ms' }}>
          {t('coverage.body')}
        </p>

        {/* Real-geography world map */}
        <div
          className="relative mx-auto mt-14 w-full lg:-mx-20 lg:w-[calc(100%+160px)]"
          style={{ opacity: isInView ? 1 : 0, transition: 'opacity 800ms ease-out 300ms' }}
        >
          <div
            className="relative overflow-hidden rounded-sm border border-fa-classic-chalk/10 px-4 py-6 sm:px-8 lg:px-10"
            style={{
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.045), rgba(255,255,255,0.012)), radial-gradient(ellipse at 56% 43%, rgba(241,91,65,0.12), transparent 34%)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06), 0 28px 80px rgba(0,0,0,0.18)',
            }}
          >
            <BrandPattern
              pattern="ribbon"
              tint="orange"
              opacity={0.055}
              className="absolute -left-[8%] bottom-[-18%] w-[42%] max-w-[620px] pointer-events-none"
            />
            <ComposableMap
              projection="geoEqualEarth"
              projectionConfig={{ scale: projectionScale, center: projectionCenter }}
              width={1300}
              height={560}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            >
              <Geographies geography={TOPO_URL}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="rgba(244,244,241,0.075)"
                      stroke="rgba(244,244,241,0.28)"
                      strokeWidth={0.45}
                      style={{
                        default: { outline: 'none' },
                        hover:   { outline: 'none', fill: 'rgba(244,244,241,0.085)' },
                        pressed: { outline: 'none' },
                      }}
                    />
                  ))
                }
              </Geographies>

              {/* Route arcs */}
              {routes.map(([a, b], i) => (
                <Line
                  key={`route-${i}`}
                  from={cities[a].coords}
                  to={cities[b].coords}
                  stroke="#F15B41"
                  strokeWidth={1.35}
                  strokeDasharray="5,5"
                  strokeOpacity={0.82}
                  strokeLinecap="round"
                />
              ))}

              {/* City markers */}
              {cities.map((city) => (
                <Marker key={city.name} coordinates={city.coords}>
                  <circle r={city.hub ? 9 : 4.5} fill="rgba(241,91,65,0.18)" />
                  <circle r={city.hub ? 4.2 : 2.6} fill="#F15B41" />
                  {city.label && (
                    <text
                      textAnchor="middle"
                      x={city.labelDx ?? 0}
                      y={city.labelDy ?? -13}
                      style={{
                        fontFamily: 'Inter Display, sans-serif',
                        fontSize: isMobile ? (city.hub ? 14 : 11) : city.hub ? 11 : 9.5,
                        fontWeight: city.hub ? 650 : 550,
                        fill: city.hub ? 'rgba(244,244,241,0.92)' : 'rgba(244,244,241,0.62)',
                        paintOrder: 'stroke',
                        stroke: 'rgba(13,18,50,0.85)',
                        strokeWidth: 3,
                        strokeLinejoin: 'round',
                        pointerEvents: 'none',
                      }}
                    >
                      {city.name}
                    </text>
                  )}
                </Marker>
              ))}
            </ComposableMap>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mt-14 pt-10 border-t border-fa-classic-chalk/10">
          {stats.map((stat, i) => {
            return (
              <div
                key={stat.label}
                style={{
                  opacity: isInView ? 1 : 0,
                  transform: isInView ? 'translateY(0)' : 'translateY(20px)',
                  transition: `all 500ms ease-out ${400 + i * 100}ms`,
                }}
              >
                <div className="w-10 h-[3px] bg-fa-orange-soda mb-5" />
                <div className="font-display font-semibold text-[40px] lg:text-[52px] text-fa-classic-chalk leading-none tracking-[-0.02em] tabular-nums">
                  {stat.value}
                </div>
                <div className="mt-3 text-[11px] font-semibold text-fa-classic-chalk/55 uppercase tracking-[0.08em] font-body">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
