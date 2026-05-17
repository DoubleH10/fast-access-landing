import { useEffect, useRef } from 'react';
import { useInView } from '../hooks/useInView';

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

    let animId: number;
    const animate = (time: number) => {
      ctx.clearRect(0, 0, w, h);

      // Draw faint continental outlines (simplified)
      ctx.strokeStyle = 'rgba(255,255,255,0.04)';
      ctx.lineWidth = 1;
      ctx.fillStyle = 'rgba(255,255,255,0.015)';

      // North America
      ctx.beginPath();
      ctx.moveTo(w * 0.08, h * 0.25);
      ctx.lineTo(w * 0.45, h * 0.22);
      ctx.lineTo(w * 0.42, h * 0.55);
      ctx.lineTo(w * 0.15, h * 0.52);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // South America
      ctx.beginPath();
      ctx.moveTo(w * 0.22, h * 0.56);
      ctx.lineTo(w * 0.38, h * 0.58);
      ctx.lineTo(w * 0.35, h * 0.88);
      ctx.lineTo(w * 0.25, h * 0.82);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Europe
      ctx.beginPath();
      ctx.moveTo(w * 0.44, h * 0.22);
      ctx.lineTo(w * 0.62, h * 0.22);
      ctx.lineTo(w * 0.60, h * 0.42);
      ctx.lineTo(w * 0.46, h * 0.40);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Africa
      ctx.beginPath();
      ctx.moveTo(w * 0.46, h * 0.44);
      ctx.lineTo(w * 0.60, h * 0.44);
      ctx.lineTo(w * 0.58, h * 0.88);
      ctx.lineTo(w * 0.48, h * 0.82);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Asia
      ctx.beginPath();
      ctx.moveTo(w * 0.62, h * 0.20);
      ctx.lineTo(w * 0.92, h * 0.20);
      ctx.lineTo(w * 0.94, h * 0.55);
      ctx.lineTo(w * 0.72, h * 0.58);
      ctx.lineTo(w * 0.62, h * 0.44);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Australia
      ctx.beginPath();
      ctx.moveTo(w * 0.82, h * 0.65);
      ctx.lineTo(w * 0.94, h * 0.65);
      ctx.lineTo(w * 0.94, h * 0.82);
      ctx.lineTo(w * 0.82, h * 0.80);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

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
        ctx.strokeStyle = 'rgba(255,107,53,0.35)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.setLineDash([]);

        // Static faint line underneath
        ctx.strokeStyle = 'rgba(255,107,53,0.12)';
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
        ctx.fillStyle = `rgba(255,107,53,${0.06 + pulse * 0.1})`;
        ctx.fill();

        // Middle ring
        ctx.beginPath();
        ctx.arc(cx, cy, 5 + pulse * 2, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,107,53,${0.25 + pulse * 0.2})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Center dot
        ctx.beginPath();
        ctx.arc(cx, cy, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#ff6b35';
        ctx.fill();

        // Label (every city)
        ctx.font = '500 10px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillStyle = 'rgba(245,245,240,0.55)';
        ctx.fillText(city.name, cx, cy - 14);
      });

      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <section id="network" ref={ref} className="bg-[#1a1a3e] section-padding relative overflow-hidden">
      <div className="container-main relative z-10">
        <span className="eyebrow-label block mb-4" style={{ opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 500ms ease-out' }}>
          The network
        </span>
        <h2 className="font-display font-bold text-[28px] sm:text-[36px] lg:text-[48px] text-[#f5f5f0] leading-[1.1]" style={{ opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 600ms ease-out 100ms' }}>
          One network. Every market.
        </h2>
        <p className="mt-4 text-sm sm:text-base text-[#8a8a9a] max-w-[560px] leading-relaxed" style={{ opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 500ms ease-out 200ms' }}>
          Hubs across North America, Europe, the Middle East, and Asia-Pacific. Local lanes, regional dispatch, zero handoffs you can feel.
        </p>

        {/* Map Canvas */}
        <div className="mt-10 relative" style={{ opacity: isInView ? 1 : 0, transition: 'opacity 800ms ease-out 300ms' }}>
          <div className="relative w-full rounded-xl overflow-hidden border border-[rgba(255,255,255,0.06)]" style={{ aspectRatio: '2/1', minHeight: 280, background: 'rgba(0,0,0,0.2)' }}>
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {stats.map((stat, i) => (
            <div key={stat.label} style={{ opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(20px)', transition: `all 500ms ease-out ${400 + i * 100}ms` }}>
              <div className="w-8 h-px bg-[#ff6b35] mb-3" />
              <div className="font-mono text-[28px] lg:text-[36px] text-[#f5f5f0] leading-none">
                {stat.value}
              </div>
              <div className="mt-2 text-[10px] sm:text-[11px] font-medium text-[#8a8a9a] uppercase tracking-[0.08em]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Background watermark */}
      <div className="absolute bottom-0 right-0 font-display font-black pointer-events-none select-none leading-none" style={{ fontSize: 'clamp(80px, 12vw, 160px)', color: 'rgba(245,245,240,0.02)', transform: 'translate(10%, 25%)' }}>
        NETWORK
      </div>
    </section>
  );
}
