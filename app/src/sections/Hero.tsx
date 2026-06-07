import { useEffect } from 'react';
import BrandPattern from '../components/brand/BrandPattern';
import MagneticButton from '../components/brand/MagneticButton';
import RevealText from '../components/brand/RevealText';
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
    <section className="relative min-h-[92svh] bg-fa-liberty-blue overflow-hidden flex items-center">
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

      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(ellipse at 70% 22%, rgba(241,91,65,0.13), transparent 36%), radial-gradient(ellipse at 20% 72%, rgba(114,198,234,0.07), transparent 34%)',
        }}
      />
      <BrandPattern
        pattern="ribbon"
        tint="orange"
        opacity={0.13}
        className="absolute -left-[10%] bottom-[18%] w-[56%] max-w-[760px] pointer-events-none z-0 hidden md:block"
      />

      {/* Content */}
      <div className="relative z-10 container-main pt-32 sm:pt-36 lg:pt-36 pb-16 lg:pb-20 min-h-[92svh] flex flex-col justify-center w-full">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-14 items-center">
          {/* LEFT — message column */}
          <div className="max-w-none text-left rtl:text-right">
            <h1 className="hero-fade font-display font-bold text-[38px] sm:text-[56px] lg:text-[68px] text-fa-classic-chalk leading-[1.0] tracking-[-0.025em] max-w-[680px]">
              <RevealText accent={t('hero.headlineHighlight')} stagger={60}>
                {`${t('hero.headlineA')} ${t('hero.headlineHighlight')} ${t('hero.headlineB')}`}
              </RevealText>
            </h1>

            <p className="hero-fade font-body mt-6 text-[15px] lg:text-lg text-fa-classic-chalk/70 max-w-[560px] leading-[1.65]">
              {t('hero.sub')}
            </p>

            <div className="hero-fade flex flex-wrap items-center gap-3 mt-8">
              <MagneticButton variant="filled" href="/contact">
                {t('hero.primaryCta')}
              </MagneticButton>
              <MagneticButton variant="on-dark" href="/pricing">
                {t('hero.secondaryCta')}
              </MagneticButton>
            </div>

            {/* Hero Stats */}
            <div className="hero-fade grid grid-cols-3 gap-0 mt-10 border-t border-fa-classic-chalk/15 pt-7 max-w-[560px]">
              {[
                { value: '99.8', unit: '%', label: t('hero.statOnTime') },
                { value: '2', unit: isAr ? 'ساعة' : 'hr', label: t('hero.statPickPack') },
                { value: '42', unit: '+', label: t('hero.statCenters') },
              ].map((stat, i) => (
                <div key={stat.label} className="flex items-stretch">
                  <div className="pe-3 sm:pe-8">
                    <div className="font-display text-[25px] sm:text-[30px] lg:text-[38px] text-fa-classic-chalk leading-none tracking-[-0.02em] font-semibold tabular-nums">
                      {stat.value}
                      <span className="text-fa-orange-soda font-medium text-[24px] lg:text-[28px] ms-0.5">{stat.unit}</span>
                    </div>
                    <div className="font-body text-[9px] sm:text-[10px] font-semibold text-fa-classic-chalk/60 uppercase tracking-[0.08em] mt-2 leading-snug">
                      {stat.label}
                    </div>
                  </div>
                  {i < 2 && <div className="w-px min-h-10 bg-fa-classic-chalk/15 me-3 sm:me-8" />}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — isometric backdrop + live-ops composition. The LIVE pill
              and the mini dispatch card sit on top of the pattern so the side
              reads as "real logistics in motion" instead of decorative art. */}
          <div className="hero-fade relative hidden lg:flex justify-end items-center">
            <div className="relative w-full max-w-[460px] aspect-square">
              {/* Outer glow plate */}
              <div
                className="absolute inset-0 rounded-[24px]"
                style={{
                  background:
                    'radial-gradient(closest-side, rgba(241,91,65,0.14), transparent 70%)',
                  filter: 'blur(40px)',
                }}
              />
              {/* Isometric pattern backdrop — faded behind the data cards. */}
              <BrandPattern
                pattern="isometric"
                tint="orange"
                opacity={0.45}
                className="absolute inset-0 w-full h-full object-contain"
              />
              <BrandPattern
                pattern="isometric"
                tint="navy"
                opacity={0.10}
                className="absolute inset-0 w-full h-full object-contain"
                style={{ transform: 'translate(12px, -12px) scale(0.96)' }}
              />

              {/* LIVE operations pill */}
              <div className="fa-hero-live absolute top-6 start-6 end-6">
                <span className="fa-hero-live__pulse" />
                <div>
                  <div className="fa-hero-live__lbl">{isAr ? 'العمليات المباشرة' : 'Live operations'}</div>
                  <div className="fa-hero-live__big">
                    <b className="tabular-nums">12,408</b>
                    {isAr ? ' طرد في الطريق الآن' : 'packages in transit now'}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-5 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 z-10 hidden sm:flex flex-col items-center pointer-events-none">
        <span className="font-body text-[10px] font-semibold text-fa-classic-chalk/45 uppercase tracking-[0.16em]">
          {t('hero.scrollHint')}
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
