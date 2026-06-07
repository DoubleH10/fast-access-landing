import { useEffect, useMemo, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useInView } from '../hooks/useInView';
import SectionChip from '../components/brand/SectionChip';
import RevealText from '../components/brand/RevealText';
import BrandPattern from '../components/brand/BrandPattern';
import { useT } from '../i18n/I18nContext';

/**
 * Coverage / Network map — ported from the Claude Design handoff
 * (claude.ai/design "Landing Page.html"). Real geography via Leaflet +
 * CartoDB dark tiles (toned to the brand navy), custom DivIcon pins with a
 * pulse ring on same-day hubs, dashed routes that brighten for the active
 * hub, an animated package marker, a live counter and a legend.
 *
 * Scoped to Saudi Arabia: the map fits to the Kingdom's hubs only.
 */

type Size = 'mega' | 'lg' | 'sm';
type Bi = { en: string; ar: string };
type Hub = {
  id: string;
  city: Bi;
  lat: number;
  lng: number;
  size: Size;
  orders: string;
  same: boolean;
  primary?: boolean;
};

// KSA-only hub network (real lat/lng)
const HUBS: Hub[] = [
  { id: 'ryd', city: { en: 'Riyadh', ar: 'الرياض' }, lat: 24.7136, lng: 46.6753, size: 'mega', orders: '4,210', same: true, primary: true },
  { id: 'jed', city: { en: 'Jeddah', ar: 'جدة' }, lat: 21.5433, lng: 39.1728, size: 'mega', orders: '2,840', same: true, primary: true },
  { id: 'dmm', city: { en: 'Dammam', ar: 'الدمام' }, lat: 26.4207, lng: 50.0888, size: 'mega', orders: '1,520', same: true, primary: true },
  { id: 'mec', city: { en: 'Makkah', ar: 'مكة' }, lat: 21.3891, lng: 39.8579, size: 'lg', orders: '820', same: false },
  { id: 'med', city: { en: 'Madinah', ar: 'المدينة' }, lat: 24.5247, lng: 39.5692, size: 'lg', orders: '640', same: false },
  { id: 'tbk', city: { en: 'Tabuk', ar: 'تبوك' }, lat: 28.3998, lng: 36.5700, size: 'sm', orders: '180', same: false },
  { id: 'abh', city: { en: 'Abha', ar: 'أبها' }, lat: 18.2164, lng: 42.5053, size: 'sm', orders: '260', same: false },
];

const ROUTES: Array<[string, string]> = [
  ['ryd', 'jed'], ['ryd', 'dmm'], ['ryd', 'med'], ['ryd', 'mec'], ['ryd', 'abh'],
  ['jed', 'mec'], ['jed', 'med'], ['med', 'tbk'],
];

type Pt = [number, number];

/**
 * Smooth route arc between two hubs — a quadratic curve bulging perpendicular
 * to the chord, sampled as a polyline. Reads like a real logistics route map
 * instead of a straight ruler line.
 */
function curve([lat1, lng1]: Pt, [lat2, lng2]: Pt, bend = 0.09): Pt[] {
  const mx = (lat1 + lat2) / 2;
  const my = (lng1 + lng2) / 2;
  const dx = lat2 - lat1;
  const dy = lng2 - lng1;
  // control point offset perpendicular to the chord (consistent rotation)
  const cx = mx + -dy * bend;
  const cy = my + dx * bend;
  const N = 36;
  const pts: Pt[] = [];
  for (let i = 0; i <= N; i++) {
    const t = i / N;
    const u = 1 - t;
    pts.push([
      u * u * lat1 + 2 * u * t * cx + t * t * lat2,
      u * u * lng1 + 2 * u * t * cy + t * t * lng2,
    ]);
  }
  return pts;
}

const sizeRadius: Record<Size, number> = { mega: 12, lg: 10, sm: 6 };
const sizeName: Record<Size, Bi> = {
  mega: { en: 'Mega hub', ar: 'مركز رئيسي' },
  lg: { en: 'Large', ar: 'كبير' },
  sm: { en: 'Standard', ar: 'قياسي' },
};

const ACCENT = '#F15B41';

function makeHubIcon(hub: Hub, isActive: boolean, lang: 'en' | 'ar') {
  const r = sizeRadius[hub.size];
  const ring = hub.primary ? '<span class="hub-ring"></span>' : '';
  return L.divIcon({
    className: `fa-hub-icon${isActive ? ' active' : ''}${hub.primary ? ' primary' : ''}`,
    html: `
      <div class="hub-wrap">
        ${ring}
        <span class="hub-dot" style="width:${r * 2}px;height:${r * 2}px;background:${hub.primary ? ACCENT : '#FFFFFF'};">
          <span class="hub-core" style="background:${hub.primary ? '#fff' : '#0D1232'};"></span>
        </span>
        <span class="hub-label">${hub.city[lang]}</span>
      </div>
    `,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });
}

export default function Coverage() {
  const { ref, isInView } = useInView(0.15);
  const { t, locale } = useT();
  const isAr = locale === 'ar';
  const lang: 'en' | 'ar' = isAr ? 'ar' : 'en';

  const elRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Record<string, L.Marker>>({});
  const routesRef = useRef<Array<{ a: string; b: string; line: L.Polyline; halo: L.Polyline }>>([]);
  const [active, setActive] = useState('ryd');

  const byId = useMemo(() => Object.fromEntries(HUBS.map((h) => [h.id, h])) as Record<string, Hub>, []);
  const activeHub = byId[active];

  const stats = [
    { value: '42', unit: '+', label: isAr ? 'مركز توزيع' : 'Fulfilment centres' },
    { value: '13', unit: '', label: isAr ? 'منطقة مغطّاة' : 'Regions covered' },
    { value: '6', unit: '', label: isAr ? 'مدن توصيل بنفس اليوم' : 'Same-day cities' },
  ];

  // Init Leaflet once
  useEffect(() => {
    if (!elRef.current || mapRef.current) return;
    const map = L.map(elRef.current, {
      center: [24.2, 45.0],
      zoom: 5,
      minZoom: 4,
      maxZoom: 7,
      zoomControl: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      dragging: false,
      attributionControl: false,
      zoomSnap: 0.25,
    });

    // CartoDB dark, no labels — we draw our own
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
      subdomains: 'abcd',
      maxZoom: 19,
    }).addTo(map);

    // Navy wash over the tiles
    L.rectangle([[-90, -180], [90, 180]], {
      color: 'transparent', fillColor: '#0D1232', fillOpacity: 0.22, interactive: false,
    }).addTo(map);

    // Routes — curved arcs with a soft glowing halo under a dashed core
    ROUTES.forEach(([a, b]) => {
      const A = byId[a], B = byId[b];
      const pts = curve([A.lat, A.lng], [B.lat, B.lng]);
      const halo = L.polyline(pts, {
        color: '#F15B41', weight: 3.5, opacity: 0.07, lineCap: 'round', lineJoin: 'round', interactive: false,
      }).addTo(map);
      const line = L.polyline(pts, {
        color: 'rgba(241,91,65,0.5)', weight: 1, dashArray: '2 6', opacity: 0.7, lineCap: 'round', interactive: false,
      }).addTo(map);
      routesRef.current.push({ a, b, line, halo });
    });

    // Hubs
    HUBS.forEach((h) => {
      const m = L.marker([h.lat, h.lng], {
        icon: makeHubIcon(h, h.id === 'ryd', lang),
        riseOnHover: true,
        keyboard: false,
      }).addTo(map);
      m.on('mouseover click', () => setActive(h.id));
      markersRef.current[h.id] = m;
    });

    // Animated package marker travelling the same-day lanes
    const pkt = L.marker([HUBS[0].lat, HUBS[0].lng], {
      icon: L.divIcon({
        className: 'fa-pkt-icon',
        html: '<span class="pkt-core"></span><span class="pkt-trail"></span>',
        iconSize: [0, 0], iconAnchor: [0, 0],
      }),
      interactive: false, keyboard: false,
    }).addTo(map);

    const lanes = ROUTES.filter(([a, b]) => byId[a].primary || byId[b].primary);
    const laneCurves = lanes.map(([a, b]) => curve([byId[a].lat, byId[a].lng], [byId[b].lat, byId[b].lng]));
    let laneIdx = 0;
    let raf = 0;
    let start = performance.now();
    const DUR = 2600, PAUSE = 700;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    function step(now: number) {
      const tt = Math.max(0, Math.min(1, (now - start) / DUR));
      const eased = 1 - Math.pow(1 - tt, 3);
      // Follow the curved lane so the package rides the visible arc
      const pts = laneCurves[laneIdx];
      const fpos = eased * (pts.length - 1);
      const i0 = Math.floor(fpos);
      const i1 = Math.min(pts.length - 1, i0 + 1);
      const f = fpos - i0;
      pkt.setLatLng([
        pts[i0][0] + (pts[i1][0] - pts[i0][0]) * f,
        pts[i0][1] + (pts[i1][1] - pts[i0][1]) * f,
      ]);
      if (tt >= 1) {
        window.setTimeout(() => {
          laneIdx = (laneIdx + 1) % lanes.length;
          start = performance.now();
          raf = requestAnimationFrame(step);
        }, PAUSE);
        return;
      }
      raf = requestAnimationFrame(step);
    }
    if (!reduce) raf = requestAnimationFrame(step);

    // Fit tight to the Kingdom's hubs
    const bounds = L.latLngBounds(HUBS.map((h) => [h.lat, h.lng] as [number, number]));
    map.fitBounds(bounds, { padding: [42, 42], maxZoom: 6 });

    const ro = new ResizeObserver(() => map.invalidateSize());
    ro.observe(elRef.current);

    mapRef.current = map;
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      map.remove();
      mapRef.current = null;
      markersRef.current = {};
      routesRef.current = [];
    };
  }, [byId, lang]);

  // Highlight routes + active marker when selection (or language) changes
  useEffect(() => {
    routesRef.current.forEach(({ a, b, line, halo }) => {
      const involved = a === active || b === active;
      line.setStyle({
        color: involved ? '#F15B41' : 'rgba(241,91,65,0.32)',
        weight: involved ? 1.6 : 1,
        opacity: involved ? 1 : 0.5,
        dashArray: involved ? undefined : '2 6',
      });
      halo.setStyle({ opacity: involved ? 0.16 : 0.06, weight: involved ? 5 : 3.5 });
    });
    HUBS.forEach((h) => {
      const m = markersRef.current[h.id];
      if (m) m.setIcon(makeHubIcon(h, h.id === active, lang));
    });
  }, [active, lang]);

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
          {/* LEFT — copy + stats + active hub */}
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

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-9 pt-8 border-t border-fa-classic-chalk/10 max-w-[460px]" style={{ opacity: isInView ? 1 : 0, transition: 'opacity 600ms ease-out 300ms' }}>
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="font-display font-semibold text-[34px] lg:text-[38px] text-fa-classic-chalk leading-none tracking-[-0.02em] tabular-nums">
                    {s.value}
                    {s.unit && <span className="text-fa-orange-soda font-medium text-[24px] ms-0.5">{s.unit}</span>}
                  </div>
                  <div className="mt-2 text-[11px] font-semibold text-fa-classic-chalk/55 uppercase tracking-[0.08em] font-body leading-snug">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Active hub detail */}
            <div className="fa-netmap-active" style={{ opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 500ms ease-out 400ms' }}>
              <div className="fa-netmap-active-head">
                <span className="dot" style={{ background: activeHub.primary ? ACCENT : 'rgba(255,255,255,0.4)' }} />
                <span className="cy">{activeHub.city[lang]}</span>
                <span className="co">{isAr ? 'السعودية' : 'KSA'}</span>
              </div>
              <div className="fa-netmap-active-rows">
                <div className="row">
                  <span>{isAr ? 'طلبات / يوم' : 'Orders / day'}</span>
                  <span className="vv">{activeHub.orders}</span>
                </div>
                <div className="row">
                  <span>{isAr ? 'توصيل بنفس اليوم' : 'Same-day delivery'}</span>
                  <span className={`vv ${activeHub.same ? 'green' : ''}`}>{activeHub.same ? (isAr ? 'متاح' : 'Available') : '—'}</span>
                </div>
                <div className="row">
                  <span>{isAr ? 'فئة المركز' : 'Hub class'}</span>
                  <span className="vv">{sizeName[activeHub.size][lang]}</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — Leaflet map */}
          <div style={{ opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(40px)', transition: 'all 800ms ease-out 200ms' }}>
            <div className="fa-netmap-frame">
              <div ref={elRef} className="fa-netmap-leaflet" />
              <div className="fa-netmap-counter">
                <span className="pulse" />
                <span><b>12,408</b> {isAr ? 'طرد مباشر الآن' : 'packages live now'}</span>
              </div>
              <div className="fa-netmap-legend">
                <span><span className="lg-dot primary" />{isAr ? 'مركز توصيل بنفس اليوم' : 'Same-day hub'}</span>
                <span><span className="lg-dot" />{isAr ? 'مركز توزيع' : 'Fulfilment centre'}</span>
                <span><span className="lg-line" />{isAr ? 'مسار' : 'Lane'}</span>
              </div>
              <div className="fa-netmap-vignette" aria-hidden />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
