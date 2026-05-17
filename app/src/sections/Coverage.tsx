import { useInView } from '../hooks/useInView';
import { ComposableMap, Geographies, Geography, Marker, Line } from 'react-simple-maps';
import SectionChip from '../components/brand/SectionChip';
import BrandPattern from '../components/brand/BrandPattern';

/**
 * Coverage map — real geography rendered via react-simple-maps + a TopoJSON
 * world atlas (countries-110m, ~120kb). Continents are drawn as muted
 * paper-tone outlines, cities as orange pins, and trade routes as dashed
 * orange arcs. Uses the geoEqualEarth projection — looks closer to a
 * "designer" world map than mercator's stretched poles.
 */

// CDN-hosted Natural Earth simplified countries (Mike Bostock's world-atlas)
const TOPO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

type City = { name: string; coords: [number, number]; hub?: boolean };

const cities: City[] = [
  { name: 'San Francisco', coords: [-122.42, 37.77], hub: true },
  { name: 'Dallas',        coords: [-96.80, 32.78] },
  { name: 'Chicago',       coords: [-87.63, 41.88], hub: true },
  { name: 'New York',      coords: [-74.01, 40.71], hub: true },
  { name: 'Atlanta',       coords: [-84.39, 33.75] },
  { name: 'São Paulo',     coords: [-46.63, -23.55] },
  { name: 'London',        coords: [-0.13, 51.51], hub: true },
  { name: 'Berlin',        coords: [13.40, 52.52] },
  { name: 'Istanbul',      coords: [28.98, 41.01] },
  { name: 'Riyadh',        coords: [46.68, 24.71], hub: true }, // KSA hub
  { name: 'Dubai',         coords: [55.27, 25.20], hub: true },
  { name: 'Mumbai',        coords: [72.88, 19.08] },
  { name: 'Singapore',     coords: [103.82, 1.35], hub: true },
  { name: 'Shanghai',      coords: [121.47, 31.23], hub: true },
  { name: 'Tokyo',         coords: [139.65, 35.68], hub: true },
  { name: 'Sydney',        coords: [151.21, -33.87] },
  { name: 'Cape Town',     coords: [18.42, -33.92] },
];

// Indexes refer to the cities array above
const routes: Array<[number, number]> = [
  [0, 1], [1, 2], [2, 3], [3, 4],        // US backbone
  [3, 6],                                  // NY → London
  [6, 7], [7, 8],                          // EU
  [8, 9], [9, 10],                         // Istanbul → Riyadh → Dubai
  [10, 11], [11, 12], [12, 14],            // ME → India → SEA → JP
  [12, 15],                                 // Singapore → Sydney
  [13, 14],                                 // Shanghai → Tokyo
  [1, 5],                                   // Dallas → São Paulo
  [10, 16],                                 // Dubai → Cape Town
];

const stats = [
  { value: 'TBD', label: 'Regions across Saudi Arabia' },
  { value: 'TBD', label: 'Countries we deliver to' },
  { value: 'TBD', label: 'Carrier partners' },
  { value: '24/7', label: 'Operations support' },
];

export default function Coverage() {
  const { ref, isInView } = useInView(0.15);

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
          <SectionChip onDark>The Network</SectionChip>
        </div>
        <h2 className="font-display font-bold text-[32px] sm:text-[40px] lg:text-[56px] text-fa-classic-chalk leading-[1.05] tracking-[-0.02em]" style={{ opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 600ms ease-out 100ms' }}>
          A wide logistics network across <span className="text-fa-orange-soda">Saudi Arabia</span> and beyond.
        </h2>
        <p className="font-body mt-5 text-base text-fa-classic-chalk/55 max-w-[600px] leading-[1.6]" style={{ opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 500ms ease-out 200ms' }}>
          From every region of the Kingdom to the Gulf, Europe, and beyond — through the strongest local and international carrier partners.
        </p>

        {/* Real-geography world map */}
        <div className="mt-12 relative" style={{ opacity: isInView ? 1 : 0, transition: 'opacity 800ms ease-out 300ms' }}>
          <ComposableMap
            projection="geoEqualEarth"
            projectionConfig={{ scale: 175, center: [25, 12] }}
            width={1200}
            height={520}
            style={{ width: '100%', height: 'auto', display: 'block' }}
          >
            <Geographies geography={TOPO_URL}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="rgba(244,244,241,0.04)"
                    stroke="rgba(244,244,241,0.18)"
                    strokeWidth={0.5}
                    style={{
                      default: { outline: 'none' },
                      hover:   { outline: 'none', fill: 'rgba(244,244,241,0.07)' },
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
                strokeWidth={1.2}
                strokeDasharray="4,4"
                strokeOpacity={0.55}
                strokeLinecap="round"
              />
            ))}

            {/* City markers */}
            {cities.map((city) => (
              <Marker key={city.name} coordinates={city.coords}>
                <circle r={city.hub ? 7 : 4} fill="rgba(241,91,65,0.18)" />
                <circle r={city.hub ? 3.5 : 2.5} fill="#F15B41" />
                <text
                  textAnchor="middle"
                  y={-12}
                  style={{
                    fontFamily: 'Inter Display, sans-serif',
                    fontSize: city.hub ? 10 : 8.5,
                    fontWeight: city.hub ? 600 : 500,
                    fill: city.hub ? 'rgba(244,244,241,0.85)' : 'rgba(244,244,241,0.55)',
                    pointerEvents: 'none',
                  }}
                >
                  {city.name}
                </text>
              </Marker>
            ))}
          </ComposableMap>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mt-14 pt-10 border-t border-fa-classic-chalk/10">
          {stats.map((stat, i) => {
            const match = stat.value.match(/^([\d.]+)(.*)$/);
            const num = match ? match[1] : stat.value;
            const unit = match ? match[2] : '';
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
                <div className="font-display font-semibold text-[40px] lg:text-[52px] text-fa-classic-chalk leading-none tracking-[-0.02em]">
                  {num}
                  {unit && <span className="text-fa-orange-soda">{unit}</span>}
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
