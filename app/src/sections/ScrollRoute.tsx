import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionChip from '../components/brand/SectionChip';
import { useT } from '../i18n/I18nContext';

gsap.registerPlugin(ScrollTrigger);

const SCENES = [
  {
    progress: 0,
    time: '00:00',
    label: { en: 'Winter lane', ar: 'مسار بارد' },
    title: { en: 'The first scan locks the route.', ar: 'أول مسح يثبت مسار الطلب.' },
    metric: { en: 'Origin signal', ar: 'إشارة البداية' },
    detail: {
      en: 'When the terrain is cold or visibility drops, the order still starts with a clear pickup record.',
      ar: 'حتى مع الطريق البارد أو انخفاض الرؤية، يبدأ الطلب بسجل استلام واضح.',
    },
  },
  {
    progress: 0.27,
    time: '00:02',
    label: { en: 'Water crossing', ar: 'عبور ساحلي' },
    title: { en: 'A scenery change becomes an ETA update.', ar: 'تغير المشهد يتحول لتحديث وقت الوصول.' },
    metric: { en: 'ETA recalculated', ar: 'إعادة حساب الوصول' },
    detail: {
      en: 'The dashboard reads movement, not just milestones, so support knows what changed before the buyer asks.',
      ar: 'لوحة التحكم تقرأ الحركة وليس المحطات فقط، فيعرف الدعم ما تغيّر قبل سؤال العميل.',
    },
  },
  {
    progress: 0.54,
    time: '00:04',
    label: { en: 'Green stretch', ar: 'المسار الأخضر' },
    title: { en: 'The handoff stays visible between teams.', ar: 'تظل نقطة التسليم واضحة بين الفرق.' },
    metric: { en: 'Driver sync', ar: 'مزامنة السائق' },
    detail: {
      en: 'Warehouse, driver, and customer support see the same live route state as the truck crosses zones.',
      ar: 'المخزن والسائق والدعم يشاهدون نفس حالة المسار أثناء انتقال الشاحنة بين المناطق.',
    },
  },
  {
    progress: 0.78,
    time: '00:06',
    label: { en: 'Heat & last mile', ar: 'الحرارة وآخر ميل' },
    title: { en: 'Exceptions surface while there is still time.', ar: 'تظهر الاستثناءات قبل فوات الوقت.' },
    metric: { en: 'Action required', ar: 'إجراء مطلوب' },
    detail: {
      en: 'Traffic, capacity, and address issues become operational signals before they turn into missed delivery windows.',
      ar: 'مشاكل الطريق أو السعة أو العنوان تظهر كإشارات تشغيلية قبل أن تتحول إلى تأخير.',
    },
  },
] as const;

const VIDEO_DURATION = 12.041667;

export default function ScrollRoute() {
  const { locale } = useT();
  const isAr = locale === 'ar';
  const lang = isAr ? 'ar' : 'en';
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [activeScene, setActiveScene] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    const progress = progressRef.current;
    if (!section || !video || !progress) return;

    let duration = VIDEO_DURATION;
    let lastScene = 0;

    const updateActiveScene = (scrollProgress: number) => {
      const nextScene = SCENES.reduce((current, scene, index) => {
        return scrollProgress >= scene.progress ? index : current;
      }, 0);

      if (nextScene !== lastScene) {
        lastScene = nextScene;
        setActiveScene(nextScene);
      }
    };

    const handleMetadata = () => {
      if (Number.isFinite(video.duration) && video.duration > 0) {
        duration = video.duration;
      }
    };

    video.addEventListener('loadedmetadata', handleMetadata);
    video.pause();

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      // Eased catch-up (~1s) so the footage glides with the scroll instead of
      // snapping — paired with the all-intra (every-frame-keyframe) encode of the
      // mp4, every seek lands on an exact frame, so the scrub reads buttery.
      scrub: 1,
      onUpdate: (self) => {
        const nextTime = Math.min(duration - 0.05, Math.max(0, duration * self.progress));
        // ~half a frame at 24fps: tight enough to track every frame, loose enough
        // to avoid re-seeking within the same frame (which causes decode thrash).
        if (Math.abs(video.currentTime - nextTime) > 0.02) {
          video.currentTime = nextTime;
        }

        // Slow push-in: the frame settles from 1.10 → 1.0 across the section so
        // the static-ish footage keeps a sense of forward depth.
        if (!reduceMotion) {
          video.style.transform = `scale(${(1.1 - 0.1 * self.progress).toFixed(4)})`;
        }

        progress.style.transform = `scaleX(${self.progress})`;
        updateActiveScene(self.progress);
      },
    });

    updateActiveScene(0);

    return () => {
      video.removeEventListener('loadedmetadata', handleMetadata);
      trigger.kill();
    };
  }, []);

  const active = SCENES[activeScene];

  return (
    <section id="route-motion" ref={sectionRef} className="relative h-[460vh] bg-fa-liberty-blue text-fa-classic-chalk">
      <div className="sticky top-0 min-h-[100dvh] overflow-hidden">
        <div className="absolute inset-0">
          <video
            ref={videoRef}
            className="h-full w-full object-cover will-change-transform"
            style={{ transformOrigin: 'center 45%', objectPosition: 'center 60%' }}
            src="/assets/scroll-route-truck.mp4"
            poster="/assets/scroll-route-truck-poster.jpg"
            preload="auto"
            muted
            playsInline
            aria-hidden
          />
          {/* Side scrims keep the copy legible over the footage */}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,18,50,0.9)_0%,rgba(13,18,50,0.34)_36%,rgba(13,18,50,0.16)_62%,rgba(13,18,50,0.86)_100%)]" />
          {/* Bottom anchor so the scene rail + progress card sit on solid ground */}
          <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(11,15,42,0.92)_0%,rgba(11,15,42,0.45)_16%,transparent_42%)]" />
          {/* Top fade smooths the seam from the hero */}
          <div className="absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,rgba(11,15,42,0.7)_0%,transparent_100%)]" />
          {/* Warm key glow on the truck + cinematic vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_46%,rgba(241,91,65,0.14),transparent_32%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(125%_125%_at_50%_42%,transparent_52%,rgba(7,10,30,0.62)_100%)]" />
        </div>

        <div className="relative z-[1] flex min-h-[100dvh] flex-col justify-between px-5 py-20 sm:px-8 lg:px-16">
          <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[minmax(320px,0.9fr)_minmax(240px,0.8fr)_minmax(320px,0.72fr)] lg:items-start">
            <div className="max-w-[560px] pt-7">
              <SectionChip onDark>{isAr ? 'تغيرات الطريق' : 'Scenery signals'}</SectionChip>
              <h2 className="mt-5 font-display text-[34px] font-semibold leading-[0.98] tracking-[-0.025em] text-fa-classic-chalk sm:text-[50px] lg:text-[68px]">
                {isAr ? (
                  <>
                    عندما يتغير الطريق،{' '}
                    <span className="text-fa-orange-soda">تتغير المعلومة</span>.
                  </>
                ) : (
                  <>
                    When the scenery changes,{' '}
                    <span className="text-fa-orange-soda">the signal changes</span>.
                  </>
                )}
              </h2>
              <p className="mt-5 max-w-[34rem] font-body text-[14px] leading-[1.75] text-fa-classic-chalk/68 sm:text-base">
                {isAr
                  ? 'المشهد هنا ليس شرحاً جديداً للخطوات، بل قراءة تشغيلية لما يحدث حول الشاحنة أثناء انتقالها بين البيئات.'
                  : 'This is not another steps list. It is a live readout of what changes around the truck as it crosses each environment.'}
              </p>
            </div>

            <div className="hidden min-h-[50vh] lg:block" aria-hidden />

            <div className="route-active-panel mt-2 w-full max-w-[390px] justify-self-end overflow-hidden border border-fa-classic-chalk/18 bg-fa-liberty-blue/58 p-5 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.8)] backdrop-blur-xl lg:mt-20">
              <div key={activeScene} className="route-panel">
                <div className="route-panel__el flex items-center justify-between gap-4 border-b border-fa-classic-chalk/12 pb-4">
                  <span className="font-ui text-[11px] font-semibold uppercase tracking-[0.16em] text-fa-orange-soda">
                    {active.time}
                  </span>
                  <span className="font-ui text-[11px] font-semibold uppercase tracking-[0.14em] text-fa-classic-chalk/48">
                    <b className="text-fa-classic-chalk/70 tabular-nums">{String(activeScene + 1).padStart(2, '0')}</b>
                    <span className="mx-1 opacity-40">/</span>
                    {String(SCENES.length).padStart(2, '0')}
                    <span className="ms-2">· {active.label[lang]}</span>
                  </span>
                </div>
                <h3 className="route-panel__el mt-5 font-display text-[24px] font-semibold leading-[1.05] text-fa-classic-chalk sm:text-[28px]">
                  {active.title[lang]}
                </h3>
                <p className="route-panel__el mt-4 font-body text-[13px] leading-[1.65] text-fa-classic-chalk/62 sm:text-sm">
                  {active.detail[lang]}
                </p>
                <div className="route-panel__el mt-6 inline-flex items-center gap-2 border border-fa-orange-soda/35 bg-fa-orange-soda/12 px-3 py-2 font-ui text-[12px] font-semibold uppercase tracking-[0.12em] text-fa-classic-chalk">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-fa-orange-soda" />
                  {active.metric[lang]}
                </div>
              </div>
            </div>
          </div>

          {/* Slim scrubber pinned to the foreground road — kept low and
              minimal so it never sits over the truck itself */}
          <div className="pb-1">
            <div className="flex items-center gap-4 sm:gap-6">
              <span className="hidden whitespace-nowrap font-ui text-[10px] font-semibold uppercase tracking-[0.16em] text-fa-classic-chalk/55 sm:inline">
                {isAr ? 'تقدم المشهد' : 'Scenery scrub'}
              </span>
              <div className="relative flex-1">
                <div className="h-[3px] origin-left overflow-hidden rounded-full bg-fa-classic-chalk/16">
                  <div
                    ref={progressRef}
                    className="h-full origin-left scale-x-0 rounded-full bg-fa-orange-soda shadow-[0_0_12px_rgba(241,91,65,0.7)] will-change-transform"
                  />
                </div>
                {/* Scene ticks sit on the track at their scroll position */}
                {SCENES.map((scene, index) => (
                  <span
                    key={scene.label.en}
                    style={{ insetInlineStart: `${scene.progress * 100}%` }}
                    className={`absolute top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-fa-liberty-blue/70 transition-colors duration-300 ${
                      index <= activeScene ? 'bg-fa-orange-soda' : 'bg-fa-classic-chalk/35'
                    }`}
                    aria-label={scene.label[lang]}
                  />
                ))}
              </div>
              <span className="font-ui text-[11px] font-semibold uppercase tracking-[0.14em] tabular-nums text-fa-classic-chalk/65">
                {active.time}
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes routePanelIn {
          from { opacity: 0; transform: translateY(16px); filter: blur(3px); }
          to   { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        .route-panel__el {
          animation: routePanelIn 620ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .route-panel__el:nth-child(1) { animation-delay: 0ms; }
        .route-panel__el:nth-child(2) { animation-delay: 70ms; }
        .route-panel__el:nth-child(3) { animation-delay: 130ms; }
        .route-panel__el:nth-child(4) { animation-delay: 190ms; }
        @media (prefers-reduced-motion: reduce) {
          .route-panel__el { animation: none; }
        }
      `}</style>
    </section>
  );
}
