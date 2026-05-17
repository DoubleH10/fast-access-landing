import { useEffect } from 'react';
import { Play } from 'lucide-react';
import BrandButton from '../components/brand/BrandButton';
import BrandPattern from '../components/brand/BrandPattern';

/**
 * Hero — full-bleed cinematic intro.
 *
 * Composition (brandbook-aligned):
 *  - Deep Liberty Blue base with a soft photo wash
 *  - Pattern 5 (isometric ribbon stack) as the right-side hero composition,
 *    replacing the earlier "operations dashboard" UI fiction
 *  - Pattern 1 (ribbon trail) as the lower-edge brand signature
 *  - Eyebrow chip → big confident headline → short subline → 2 CTAs → stats
 *  - No competing right-rail indicator (moved into Journey only)
 */
export default function Hero() {
  // Stagger fade-in once on mount
  useEffect(() => {
    const elements = document.querySelectorAll('.hero-fade');
    elements.forEach((el, i) => {
      const node = el as HTMLElement;
      node.style.opacity = '0';
      node.style.transform = 'translateY(24px)';
      window.setTimeout(() => {
        node.style.transition =
          'opacity 700ms cubic-bezier(0.22, 1, 0.36, 1), transform 700ms cubic-bezier(0.22, 1, 0.36, 1)';
        node.style.opacity = '1';
        node.style.transform = 'translateY(0)';
      }, 220 + i * 90);
    });
  }, []);

  return (
    <section className="relative min-h-screen bg-fa-liberty-blue overflow-hidden">
      {/* Background photograph — softened, behind everything */}
      <div className="absolute inset-0">
        <img
          src="/assets/hero-bg.jpg"
          alt=""
          aria-hidden
          className="w-full h-full object-cover opacity-60"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(13,18,50,0.78) 0%, rgba(13,18,50,0.60) 38%, rgba(13,18,50,0.78) 70%, rgba(13,18,50,0.96) 100%)',
          }}
        />
        {/* Subtle radial vignette pulling focus left */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(120% 80% at 70% 50%, transparent 0%, rgba(13,18,50,0.4) 100%)',
          }}
        />
      </div>

      {/* Pattern 1 — ribbon trail along the bottom edge (brand signature) */}
      <BrandPattern
        pattern="ribbon"
        tint="orange"
        opacity={0.22}
        className="absolute bottom-0 left-0 w-[120%] max-w-none"
        style={{ transform: 'translateY(35%)' }}
      />
      <BrandPattern
        pattern="ribbon"
        tint="white"
        opacity={0.06}
        className="absolute bottom-[28%] left-0 w-[100%] max-w-none"
      />

      {/* Content */}
      <div className="relative z-10 container-main pt-32 lg:pt-36 pb-24 min-h-screen flex flex-col justify-center">
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-14 lg:gap-16 items-center">
          {/* LEFT — message column */}
          <div className="max-w-[640px]">
            {/* Eyebrow chip */}
            <div
              className="hero-fade inline-flex items-center gap-2.5 px-3.5 py-2 rounded-full mb-7"
              style={{
                backgroundColor: 'rgba(244,244,241,0.06)',
                backdropFilter: 'blur(10px)',
                boxShadow: 'inset 0 0 0 1px rgba(244,244,241,0.12)',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-sm bg-fa-orange-soda" />
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.12em] text-fa-classic-chalk/85">
                Fulfillment, at the speed of click
              </span>
            </div>

            {/* Headline — large, confident, single orange highlight */}
            <h1 className="hero-fade font-display font-bold text-[48px] sm:text-[64px] lg:text-[80px] text-fa-classic-chalk leading-[0.96] tracking-[-0.028em]">
              Move every
              <br />
              package{' '}
              <span className="text-fa-orange-soda">forward.</span>
            </h1>

            {/* Subhead */}
            <p className="hero-fade font-body mt-6 text-base lg:text-lg text-fa-classic-chalk/65 max-w-[480px] leading-[1.55]">
              A tech-driven fulfillment network that stores your inventory,
              picks every order, and ships it across the country — on a single
              intelligent platform.
            </p>

            {/* CTAs */}
            <div className="hero-fade flex flex-wrap items-center gap-3 mt-9">
              <BrandButton variant="filled" href="#quote">
                Start shipping
              </BrandButton>
              <button
                type="button"
                className="inline-flex items-center gap-2.5 pl-5 pr-6 py-3 text-fa-classic-chalk/80 text-[12px] font-semibold uppercase tracking-[0.08em] hover:text-fa-classic-chalk transition-colors font-body"
                style={{
                  borderRadius: 4,
                  boxShadow: 'inset 0 0 0 1px rgba(244,244,241,0.22)',
                }}
              >
                <Play size={12} className="text-fa-orange-soda" fill="currentColor" />
                Watch the demo
              </button>
            </div>

            {/* Hero Stats */}
            <div className="hero-fade flex items-center gap-0 mt-12">
              {[
                { value: '99.8', unit: '%', label: 'On-time dispatch' },
                { value: '2', unit: 'hr', label: 'Avg. pick & pack' },
                { value: '42', unit: '+', label: 'Fulfillment centers' },
              ].map((stat, i) => (
                <div key={stat.label} className="flex items-center">
                  <div className="pr-6">
                    <div className="font-display text-[30px] lg:text-[36px] text-fa-classic-chalk leading-none tracking-[-0.02em]">
                      {stat.value}
                      <span className="text-fa-orange-soda">{stat.unit}</span>
                    </div>
                    <div className="font-body text-[10px] font-semibold text-fa-classic-chalk/45 uppercase tracking-[0.1em] mt-2">
                      {stat.label}
                    </div>
                  </div>
                  {i < 2 && <div className="w-px h-9 bg-fa-classic-chalk/15 mr-6" />}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Pattern 5 (isometric ribbons) hero composition.
              Replaces the previous "operations dashboard" card. The pattern is
              THE brand statement here. */}
          <div className="hero-fade relative hidden lg:flex justify-end items-center">
            <div className="relative w-full max-w-[560px] aspect-square">
              {/* Outer glow plate */}
              <div
                className="absolute inset-0 rounded-[24px]"
                style={{
                  background:
                    'radial-gradient(closest-side, rgba(241,91,65,0.18), transparent 70%)',
                  filter: 'blur(40px)',
                }}
              />
              {/* The isometric pattern, layered */}
              <BrandPattern
                pattern="isometric"
                tint="orange"
                opacity={0.55}
                className="absolute inset-0 w-full h-full object-contain"
              />
              <BrandPattern
                pattern="isometric"
                tint="white"
                opacity={0.18}
                className="absolute inset-0 w-full h-full object-contain"
                style={{ transform: 'translate(10px, -10px) scale(0.96)' }}
              />

              {/* Floating brand badge — minimal status indicator */}
              <div
                className="absolute top-6 right-6 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full"
                style={{
                  background: 'rgba(13,18,50,0.65)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: 'inset 0 0 0 1px rgba(244,244,241,0.12)',
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full bg-fa-orange-soda"
                  style={{ animation: 'pulse-glow 2s infinite' }}
                />
                <span className="font-body text-[10px] font-semibold tracking-[0.1em] text-fa-classic-chalk/90 uppercase">
                  Live · 12,408 in transit
                </span>
              </div>

              {/* Brand statement plate at the bottom of the composition */}
              <div
                className="absolute bottom-6 left-6 right-6 z-10 px-5 py-4 rounded-[14px]"
                style={{
                  background: 'rgba(13,18,50,0.72)',
                  backdropFilter: 'blur(12px)',
                  boxShadow:
                    '0 8px 32px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(244,244,241,0.1)',
                }}
              >
                <div className="font-body text-[10px] uppercase tracking-[0.14em] text-fa-orange-soda font-semibold">
                  The network, end-to-end
                </div>
                <div className="font-display text-base lg:text-lg text-fa-classic-chalk mt-1 leading-snug tracking-[-0.01em]">
                  Receive → Store → Pick → Pack → Ship → Deliver
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center pointer-events-none">
        <span className="font-body text-[10px] font-semibold text-fa-classic-chalk/40 uppercase tracking-[0.16em]">
          Scroll to see how it works
        </span>
      </div>

      <style>{`
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 4px rgba(241,91,65,0.5); }
          50%      { box-shadow: 0 0 14px rgba(241,91,65,0.95); }
        }
      `}</style>
    </section>
  );
}
