import { useEffect, useRef } from 'react';
import { useInView } from '../hooks/useInView';
import SectionChip from '../components/brand/SectionChip';
import BrandPattern from '../components/brand/BrandPattern';

const cities = [
  { name: 'San Francisco', x: 14, y: 38, region: 'us' },
  { name: 'Dallas', x: 24, y: 42, region: 'us' },
  { name: 'Chicago', x: 32, y: 36, region: 'us' },
  { name: 'New York', x: 40, y: 37, region: 'us' },
  { name: 'Atlanta', x: 35, y: 43, region: 'us' },
  { name: 'São Paulo', x: 30, y: 74, region: 'latam' },
  { name: 'London', x: 48, y: 30, region: 'eu' },
  { name: 'Berlin', x: 54, y: 31, region: 'eu' },
  { name: 'Istanbul', x: 60, y: 37, region: 'eu' },
  { name: 'Dubai', x: 66, y: 45, region: 'me' },
  { name: 'Mumbai', x: 72, y: 50, region: 'asia' },
  { name: 'Singapore', x: 78, y: 58, region: 'asia' },
  { name: 'Shanghai', x: 82, y: 40, region: 'asia' },
  { name: 'Tokyo', x: 88, y: 36, region: 'asia' },
  { name: 'Sydney', x: 90, y: 76, region: 'apac' },
  { name: 'Cape Town', x: 52, y: 80, region: 'africa' },
];

const connections: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], // US network
  [3, 6], // NY -> London
  [6, 7], [7, 8], // Europe
  [8, 9], [9, 10], // Istanbul -> Dubai -> Mumbai
  [10, 11], [11, 13], // Mumbai -> Singapore -> Tokyo
  [11, 14], // Singapore -> Sydney
  [12, 13], // Shanghai -> Tokyo
  [1, 5], // Dallas -> São Paulo
  [9, 15], // Dubai -> Cape Town
];

const stats = [
  { value: '42+', label: 'Fulfillment centers' },
  { value: '96%', label: 'US population reached in 2 days' },
  { value: '11', label: 'Carrier integrations' },
  { value: '24/7', label: 'Operations support' },
];

export default function Coverage() {
  const { ref, isInView } = useInView(0.15);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio, 2);
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;

    /**
     * Dot-stipple "landmass" hit test.
     * Each continent is approximated as an ellipse (cx, cy, rx, ry) in
     * normalised 0..1 coordinates. A dot is drawn if it falls inside any
     * ellipse. Cleaner and more premium than rough polygons.
     */
    const landmasses: Array<[number, number, number, number]> = [
      [0.18, 0.36, 0.13, 0.16], // North America
      [0.28, 0.72, 0.07, 0.16], // South America
      [0.52, 0.30, 0.07, 0.10], // Europe
      [0.55, 0.62, 0.06, 0.18], // Africa
      [0.72, 0.32, 0.13, 0.14], // Asia (north)
      [0.78, 0.52, 0.10, 0.10], // SE Asia / India
      [0.89, 0.74, 0.06, 0.07], // Australia
    ];
    const isLand = (nx: number, ny: number) =>
      landmasses.some(([cx, cy, rx, ry]) => {
        const dx = (nx - cx) / rx;
        const dy = (ny - cy) / ry;
        return dx * dx + dy * dy <= 1;
      });

    let animId: number;
    const animate = (time: number) => {
      ctx.clearRect(0, 0, w, h);

      // Dot-stipple world map — elegant landmass suggestion
      const stepX = 14;
      const stepY = 14;
      for (let x = stepX / 2; x < w; x += stepX) {
        for (let y = stepY / 2; y < h; y += stepY) {
          if (!isLand(x / w, y / h)) continue;
          ctx.beginPath();
          ctx.arc(x, y, 1.1, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(244,244,241,0.18)';
          ctx.fill();
        }
      }

      // Draw connections — BRIGHTER
      connections.forEach(([a, b]) => {
        const ca = cities[a];
        const cb = cities[b];
        const x1 = (ca.x / 100) * w;
        const y1 = (ca.y / 100) * h;
        const x2 = (cb.x / 100) * w;
        const y2 = (cb.y / 100) * h;

        // Animated dash
        const dashOffset = (time * 0.02) % 20;
        ctx.setLineDash([4, 8]);
        ctx.lineDashOffset = -dashOffset;
        ctx.strokeStyle = 'rgba(241,91,65,0.35)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.setLineDash([]);

        // Static faint line underneath
        ctx.strokeStyle = 'rgba(241,91,65,0.12)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      });

      // Draw city dots
      cities.forEach((city) => {
        const cx = (city.x / 100) * w;
        const cy = (city.y / 100) * h;
        const pulse = 0.5 + 0.5 * Math.sin(time * 0.002 + city.x * 0.1);

        // Outer glow ring
        ctx.beginPath();
        ctx.arc(cx, cy, 10 + pulse * 6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(241,91,65,${0.06 + pulse * 0.1})`;
        ctx.fill();

        // Middle ring
        ctx.beginPath();
        ctx.arc(cx, cy, 5 + pulse * 2, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(241,91,65,${0.25 + pulse * 0.2})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Center dot
        ctx.beginPath();
        ctx.arc(cx, cy, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#F15B41';
        ctx.fill();

        // Label (every city)
        ctx.font = '500 10px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillStyle = 'rgba(244,244,241,0.55)';
        ctx.fillText(city.name, cx, cy - 14);
      });

      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <section id="network" ref={ref} className="bg-fa-liberty-blue section-padding relative overflow-hidden">
      {/* Pattern 5 (isometric ribbons) — atmospheric brand mark behind the map */}
      <BrandPattern
        pattern="isometric"
        tint="orange"
        opacity={0.08}
        className="absolute -top-[10%] -right-[15%] w-[70%] max-w-[1100px]"
      />
      <div className="container-main relative z-10">
        <div className="mb-5" style={{ opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 500ms ease-out' }}>
          <SectionChip onDark>The Network</SectionChip>
        </div>
        <h2 className="font-display font-bold text-[32px] sm:text-[40px] lg:text-[56px] text-fa-classic-chalk leading-[1.05] tracking-[-0.02em]" style={{ opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 600ms ease-out 100ms' }}>
          One network. <span className="text-fa-orange-soda">Every market.</span>
        </h2>
        <p className="font-body mt-5 text-base text-fa-classic-chalk/55 max-w-[600px] leading-[1.6]" style={{ opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 500ms ease-out 200ms' }}>
          Hubs across North America, Europe, the Middle East, and Asia-Pacific. Local lanes, regional dispatch, zero handoffs you can feel.
        </p>

        {/* Map Canvas — borderless, lets the dot-stipple breathe into the section */}
        <div className="mt-12 relative" style={{ opacity: isInView ? 1 : 0, transition: 'opacity 800ms ease-out 300ms' }}>
          <div className="relative w-full" style={{ aspectRatio: '2.2/1', minHeight: 320 }}>
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
          </div>
        </div>

        {/* Stats row — matches ByTheNumbers treatment for visual consistency */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mt-14 pt-10 border-t border-fa-classic-chalk/10">
          {stats.map((stat, i) => {
            // Split number from unit so we can color-accent the unit
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
