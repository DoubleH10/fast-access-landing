import { useEffect } from 'react';
import BrandButton from '../components/brand/BrandButton';
import BrandPattern from '../components/brand/BrandPattern';
import { useT } from '../i18n/I18nContext';

export default function Hero() {
  const { t, locale } = useT();
  const isAr = locale === 'ar';

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
    <section className="relative min-h-screen bg-fa-liberty-blue overflow-hidden flex items-center">
      {/* Background photograph — softened, behind everything */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/hero-bg.jpg"
          alt=""
          aria-hidden
          className="w-full h-full object-cover opacity-[0.62]"
        />
        {/* Lighter on the right so the photo reads clearly; darker left + bottom for headline legibility and the seam into the next section */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(105deg, rgba(13,18,50,0.90) 0%, rgba(13,18,50,0.66) 42%, rgba(13,18,50,0.34) 100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(13,18,50,0.20) 0%, rgba(13,18,50,0) 30%, rgba(13,18,50,0) 70%, rgba(13,18,50,0.55) 100%)',
          }}
        />
      </div>

      {/* Ambient gradient blobs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Soft orange soda blob in top-right */}
        <div 
          className="absolute -top-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-fa-orange-soda/10 blur-[120px] animate-float-slow"
        />
        {/* Soft blue rose blob in bottom-left */}
        <div
          className="absolute -bottom-[10%] -left-[10%] w-[55%] h-[55%] rounded-full bg-fa-blue-rose/5 blur-[120px] animate-float-medium"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container-main pt-32 lg:pt-36 pb-24 min-h-screen flex flex-col justify-center w-full">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-14 items-center">
          {/* LEFT — message column */}
          <div className="max-w-none text-left rtl:text-right">
            <h1 className="hero-fade font-display font-bold text-[44px] sm:text-[56px] lg:text-[68px] text-fa-classic-chalk leading-[1.0] tracking-[-0.025em] max-w-[640px]">
              {t('hero.headlineA')}{' '}
              <span className="text-fa-orange-soda">{t('hero.headlineHighlight')}</span>{' '}
              {t('hero.headlineB')}
            </h1>

            <p className="hero-fade font-body mt-6 text-base lg:text-lg text-fa-classic-chalk/65 max-w-[520px] leading-[1.55]">
              {t('hero.sub')}
            </p>

            <div className="hero-fade flex flex-wrap items-center gap-3 mt-9">
              <BrandButton variant="filled" href="/contact">
                {t('hero.primaryCta')}
              </BrandButton>
              <BrandButton variant="outline" href="/pricing">
                {t('hero.secondaryCta')}
              </BrandButton>
            </div>

            {/* Hero Stats */}
            <div className="hero-fade flex items-center gap-0 mt-12 border-t border-fa-classic-chalk/15 pt-8 max-w-[520px]">
              {[
                { value: '99.8', unit: '%', label: t('hero.statOnTime') },
                { value: '2', unit: isAr ? 'ساعة' : 'hr', label: t('hero.statPickPack') },
                { value: '42', unit: '+', label: t('hero.statCenters') },
              ].map((stat, i) => (
                <div key={stat.label} className="flex items-center">
                  <div className="pe-8">
                    <div className="font-display text-[30px] lg:text-[38px] text-fa-classic-chalk leading-none tracking-[-0.02em] font-semibold">
                      {stat.value}
                      <span className="text-fa-orange-soda font-medium text-[24px] lg:text-[28px] ms-0.5">{stat.unit}</span>
                    </div>
                    <div className="font-body text-[10px] font-semibold text-fa-classic-chalk/55 uppercase tracking-[0.1em] mt-2">
                      {stat.label}
                    </div>
                  </div>
                  {i < 2 && <div className="w-px h-9 bg-fa-classic-chalk/15 me-8" />}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Pattern 5 (isometric ribbons) hero composition. */}
          <div className="hero-fade relative hidden lg:flex justify-end items-center">
            <div className="relative w-full max-w-[480px] aspect-square">
              {/* Outer glow plate */}
              <div
                className="absolute inset-0 rounded-[24px]"
                style={{
                  background:
                    'radial-gradient(closest-side, rgba(241,91,65,0.14), transparent 70%)',
                  filter: 'blur(40px)',
                }}
              />
              {/* The isometric pattern, layered */}
              <BrandPattern
                pattern="isometric"
                tint="orange"
                opacity={0.65}
                className="absolute inset-0 w-full h-full object-contain"
              />
              <BrandPattern
                pattern="isometric"
                tint="navy"
                opacity={0.12}
                className="absolute inset-0 w-full h-full object-contain"
                style={{ transform: 'translate(12px, -12px) scale(0.96)' }}
              />

              {/* Floating brand badge — minimal status indicator */}
              <div
                className="absolute top-6 right-6 z-10 flex items-center gap-2 px-3.5 py-2 rounded-full"
                style={{
                  background: 'rgba(255,255,255,0.85)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 4px 20px rgba(13,18,50,0.06), inset 0 0 0 1px rgba(13,18,50,0.08)',
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full bg-fa-orange-soda"
                  style={{ animation: 'pulse-glow 2s infinite' }}
                />
                <span className="font-body text-[10px] font-semibold tracking-[0.1em] text-fa-liberty-blue/90 uppercase">
                  {t('hero.livePill')}
                </span>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center pointer-events-none">
        <span className="font-body text-[10px] font-semibold text-fa-classic-chalk/45 uppercase tracking-[0.16em]">
          {t('hero.scrollHint')}
        </span>
      </div>

      <style>{`
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 4px rgba(241,91,65,0.5); }
          50%      { box-shadow: 0 0 14px rgba(241,91,65,0.95); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) scale(1); }
          50%      { transform: translateY(-15px) scale(1.03); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px) scale(1); }
          50%      { transform: translateY(15px) scale(0.97); }
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        .animate-float-medium {
          animation: float-medium 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
