import { useEffect, useRef } from 'react';
import { Play, ArrowRight, ChevronDown } from 'lucide-react';

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Entrance animation
  useEffect(() => {
    const elements = document.querySelectorAll('.hero-fade');
    elements.forEach((el, i) => {
      const htmlEl = el as HTMLElement;
      htmlEl.style.opacity = '0';
      htmlEl.style.transform = 'translateY(24px)';
      setTimeout(() => {
        htmlEl.style.transition = 'opacity 700ms cubic-bezier(0.22, 1, 0.36, 1), transform 700ms cubic-bezier(0.22, 1, 0.36, 1)';
        htmlEl.style.opacity = '1';
        htmlEl.style.transform = 'translateY(0)';
      }, 200 + i * 100);
    });
  }, []);

  // Package grid canvas
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

    const cols = 6;
    const rows = 6;
    const gap = (rect.width - 48) / (cols - 1);
    const vGap = (rect.height - 80) / (rows - 1);

    interface Cube { x: number; y: number; baseY: number; phase: number; speed: number; scale: number; hover: boolean }
    const cubes: Cube[] = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const baseY = 40 + r * vGap;
        cubes.push({
          x: 24 + c * gap,
          y: baseY,
          baseY,
          phase: Math.random() * Math.PI * 2,
          speed: 0.5 + Math.random() * 0.5,
          scale: 1,
          hover: false,
        });
      }
    }

    let animId: number;
    const animate = (time: number) => {
      ctx.clearRect(0, 0, rect.width, rect.height);
      cubes.forEach((cube) => {
        const t = time * 0.001 * cube.speed;
        const offset = Math.sin(t + cube.phase) * 3;
        const y = cube.baseY + offset;
        const size = 10 * cube.scale;
        ctx.save();
        ctx.translate(cube.x, y);

        // Front face
        ctx.fillStyle = cube.hover ? 'rgba(255,107,53,0.12)' : 'rgba(255,255,255,0.025)';
        ctx.strokeStyle = cube.hover ? '#ff6b35' : 'rgba(255,255,255,0.12)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.rect(-size / 2, -size / 2, size, size);
        ctx.fill();
        ctx.stroke();

        // Top face
        ctx.fillStyle = cube.hover ? 'rgba(255,107,53,0.08)' : 'rgba(255,255,255,0.015)';
        ctx.strokeStyle = cube.hover ? 'rgba(255,107,53,0.5)' : 'rgba(255,255,255,0.06)';
        ctx.beginPath();
        ctx.moveTo(-size / 2, -size / 2);
        ctx.lineTo(-size / 2 + size * 0.3, -size / 2 - size * 0.3);
        ctx.lineTo(size / 2 + size * 0.3, -size / 2 - size * 0.3);
        ctx.lineTo(size / 2, -size / 2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Right face
        ctx.fillStyle = cube.hover ? 'rgba(255,107,53,0.06)' : 'rgba(255,255,255,0.01)';
        ctx.strokeStyle = cube.hover ? 'rgba(255,107,53,0.4)' : 'rgba(255,255,255,0.05)';
        ctx.beginPath();
        ctx.moveTo(size / 2, -size / 2);
        ctx.lineTo(size / 2 + size * 0.3, -size / 2 - size * 0.3);
        ctx.lineTo(size / 2 + size * 0.3, size / 2 - size * 0.3);
        ctx.lineTo(size / 2, size / 2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.restore();
      });
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);

    const handleMouseMove = (e: MouseEvent) => {
      const bounds = canvas.getBoundingClientRect();
      const mx = e.clientX - bounds.left;
      const my = e.clientY - bounds.top;
      cubes.forEach((cube) => {
        const dist = Math.sqrt((mx - cube.x) ** 2 + (my - cube.y) ** 2);
        cube.hover = dist < 18;
        cube.scale = cube.hover ? 1.3 : 1;
      });
    };
    canvas.addEventListener('mousemove', handleMouseMove);
    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section className="relative min-h-screen bg-[#0d0d1a] overflow-hidden">
      {/* Background Image — cinematic full-bleed */}
      <div className="absolute inset-0">
        <img
          src="/assets/hero-bg.jpg"
          alt="Fast Access fulfillment center"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(180deg, rgba(13,18,50,0.65) 0%, rgba(13,18,50,0.35) 40%, rgba(13,18,50,0.50) 70%, rgba(13,18,50,0.85) 100%)
            `,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container-main pt-28 lg:pt-32 pb-8 min-h-screen flex flex-col justify-center">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* LEFT COLUMN */}
          <div>
            {/* Eyebrow chip */}
            <div
              className="hero-fade inline-flex items-center gap-2 px-3 py-1.5 border rounded-full mb-6"
              style={{ borderColor: 'rgba(255,255,255,0.2)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b35]" />
              <span className="text-xs font-medium text-white/70">
                Fulfillment, at the speed of click
              </span>
            </div>

            {/* Headline */}
            <h1 className="hero-fade font-display font-bold text-[40px] sm:text-[56px] lg:text-[68px] text-white leading-[0.95] tracking-tight">
              Move every package{' '}
              <span className="text-[#ff6b35]">forward.</span>
            </h1>

            {/* Subhead */}
            <p className="hero-fade mt-5 text-base lg:text-lg text-white/60 max-w-[480px] leading-relaxed">
              A tech-driven fulfillment network that stores your inventory, picks every order, and ships it across the country — all on a single intelligent platform.
            </p>

            {/* CTA Row */}
            <div className="hero-fade flex flex-wrap items-center gap-4 mt-8">
              <a href="#quote" className="group inline-flex items-center gap-2 px-6 py-3.5 bg-[#ff6b35] text-white text-sm font-semibold uppercase tracking-wider hover:bg-[#ff8c5a] transition-colors duration-200">
                Start shipping
                <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <ArrowRight size={10} />
                </span>
              </a>
              <button className="inline-flex items-center gap-2 px-6 py-3.5 border text-white/80 text-sm font-medium uppercase tracking-wider hover:border-white/50 hover:text-white transition-all duration-200" style={{ borderColor: 'rgba(255,255,255,0.2)' }}>
                <Play size={14} className="text-white/60" />
                Watch the demo
              </button>
            </div>

            {/* Hero Stats */}
            <div className="hero-fade flex items-center gap-0 mt-10">
              {[
                { value: '99.8%', label: 'On-time dispatch' },
                { value: '2 hr', label: 'Average pick \u0026 pack' },
                { value: '42+', label: 'Fulfillment centers' },
              ].map((stat, i) => (
                <div key={stat.label} className="flex items-center">
                  <div className="pr-5">
                    <div className="font-mono text-[22px] lg:text-[26px] text-white leading-none">{stat.value}</div>
                    <div className="text-[10px] font-medium text-white/40 uppercase tracking-[0.08em] mt-1.5">
                      {stat.label}
                    </div>
                  </div>
                  {i < 2 && <div className="w-px h-8 bg-white/15 mr-5" />}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN — Hero Card */}
          <div className="hero-fade relative flex justify-center lg:justify-end">
            <div
              className="relative w-full max-w-[400px] lg:max-w-[440px] rounded-2xl overflow-hidden"
              style={{
                backgroundColor: 'rgba(26,26,62,0.6)',
                backdropFilter: 'blur(16px)',
                boxShadow: '0 32px 64px rgba(0,0,0,0.35), inset 0 1px 0 0 rgba(255,255,255,0.08)',
                aspectRatio: '4/5',
              }}
            >
              {/* LIVE chip */}
              <div
                className="absolute top-4 right-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full"
                style={{ background: 'rgba(26,26,62,0.6)', backdropFilter: 'blur(8px)' }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full bg-[#ff6b35]"
                  style={{ animation: 'pulse-glow 2s infinite' }}
                />
                <span className="font-mono text-[9px] text-[#f5f5f0] tracking-wide">
                  LIVE &middot; 12,408 IN TRANSIT
                </span>
              </div>

              {/* Package grid canvas */}
              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
                style={{ cursor: 'pointer' }}
              />

              {/* Tracking Card Overlay */}
              <div
                className="absolute bottom-4 left-4 right-4 rounded-xl p-5"
                style={{
                  background: 'rgba(245,245,240,0.96)',
                  backdropFilter: 'blur(12px)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold text-[#1a1a3e]">Operations Dashboard</span>
                </div>
                <div className="space-y-3">
                  {[
                    { color: '#22c55e', label: 'Dispatched', date: '10 / 07' },
                    { color: '#ff6b35', label: 'In transit', date: '12 / 07' },
                    { color: '#d1d5db', label: 'Delivery', date: '15 / 07' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-[13px] text-[#6b6b7b]">{item.label}</span>
                      </div>
                      <span className="font-mono text-[11px] text-[#8a8a9a]">{item.date}</span>
                    </div>
                  ))}
                </div>
                {/* Progress bar */}
                <div className="flex h-1 mt-4 rounded-full overflow-hidden bg-[#e8e8e8]">
                  <div className="h-full rounded-l-full" style={{ width: '38%', backgroundColor: '#22c55e' }} />
                  <div className="h-full" style={{ width: '42%', backgroundColor: '#ff6b35' }} />
                  <div className="h-full rounded-r-full" style={{ width: '20%', backgroundColor: '#d1d5db' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="relative z-10 flex flex-col items-center pb-8">
        <span className="text-[11px] font-medium text-white/40 uppercase tracking-wider">
          Scroll to see how it works
        </span>
        <ChevronDown
          size={16}
          className="text-white/40 mt-2"
          style={{ animation: 'bounce-down 1.8s infinite ease-in-out' }}
        />
      </div>

      <style>{`
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 4px rgba(255,107,53,0.5); }
          50% { box-shadow: 0 0 12px rgba(255,107,53,0.9); }
        }
        @keyframes bounce-down {
          0%, 100% { transform: translateY(0); opacity: 0.5; }
          50% { transform: translateY(8px); opacity: 1; }
        }
      `}</style>
    </section>
  );
}
