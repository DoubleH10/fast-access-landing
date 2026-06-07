import { Helmet } from 'react-helmet-async';
import { Target, Telescope, Gauge, ShieldCheck, HeartHandshake, TrendingUp } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import SectionChip from '../components/brand/SectionChip';
import SpotlightCard from '../components/brand/SpotlightCard';
import RevealText from '../components/brand/RevealText';
import MagneticButton from '../components/brand/MagneticButton';
import Reveal from '../components/Reveal';
import { useT } from '../i18n/I18nContext';

export default function About() {
  const { t, locale } = useT();
  const isAr = locale === 'ar';

  const values = [
    { icon: Gauge, title: isAr ? 'السرعة أولًا' : 'Speed first', body: isAr ? 'نقيس أنفسنا بالساعات، لا الأيام — لأن عميلك ينتظر.' : 'We measure ourselves in hours, not days — because your customer is waiting.' },
    { icon: ShieldCheck, title: isAr ? 'موثوقية مطلقة' : 'Radical reliability', body: isAr ? 'كل طلب يُعامل كأنه يحمل اسمك، لأنه فعلًا يحمله.' : 'Every order is handled as if it carries your name — because it does.' },
    { icon: HeartHandshake, title: isAr ? 'شريك لا مورّد' : 'Partner, not vendor', body: isAr ? 'ننجح حين تنجح أنت، فنبني حولك لا حول أنفسنا.' : 'We win when you win, so we build around you — not us.' },
    { icon: TrendingUp, title: isAr ? 'مبنيّ للنمو' : 'Built for growth', body: isAr ? 'نمتص قفزات الطلب حتى لا يتحوّل التوسّع إلى فوضى.' : 'We absorb demand spikes so expansion never turns into chaos.' },
  ];

  const numbers = [
    { v: '42+', l: isAr ? 'مركز توزيع' : 'Fulfilment centres' },
    { v: '13', l: isAr ? 'منطقة في المملكة' : 'Regions in the Kingdom' },
    { v: '99.8%', l: isAr ? 'التزام بالوقت' : 'On-time rate' },
    { v: '24/7', l: isAr ? 'دعم تشغيلي' : 'Operations support' },
  ];

  return (
    <>
      <Helmet>
        <title>About — Fast Access</title>
        <meta name="description" content="Fast Access is an operational logistics company — the current that drives e-commerce growth across Saudi Arabia and the Gulf." />
      </Helmet>
      <PageHeader title={t('pages.about.title')} sub={t('pages.about.sub')} bg="/assets/hero-about.jpg" />

      {/* Who we are */}
      <section className="relative bg-fa-cream section-padding overflow-hidden">
        <div className="container-main relative z-10 max-w-[860px] text-left rtl:text-right">
          <Reveal className="mb-5"><SectionChip>{t('pages.whoTitle')}</SectionChip></Reveal>
          <Reveal delay={80}>
            <p className="font-display font-medium text-[24px] sm:text-[30px] lg:text-[38px] text-fa-liberty-blue leading-[1.32] tracking-[-0.015em]">
              {t('pages.whoBody')}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="relative bg-fa-cream-deep section-padding overflow-hidden">
        <div className="container-main relative z-10 grid md:grid-cols-2 gap-6">
          {[
            { icon: Target, title: t('pages.mission.title'), body: t('pages.mission.body') },
            { icon: Telescope, title: t('pages.vision.title'), body: t('pages.vision.body') },
          ].map((b, i) => (
            <Reveal key={i} delay={i * 100} className="h-full">
              <SpotlightCard className="fa-card fa-card--glow group relative h-full overflow-hidden p-8 lg:p-10 text-left rtl:text-right">
                <div className="relative z-10">
                  <span className="fa-iconchip"><b.icon size={24} strokeWidth={1.8} /></span>
                  <h2 className="font-display mt-6 text-[24px] lg:text-[28px] font-bold text-fa-liberty-blue tracking-[-0.02em]">
                    <RevealText stagger={45}>{b.title}</RevealText>
                  </h2>
                  <p className="font-body mt-3 text-[15px] lg:text-base text-fa-ink-muted leading-[1.7]">{b.body}</p>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* What we value */}
      <section className="relative bg-fa-cream section-padding overflow-hidden">
        <div className="container-main relative z-10">
          <Reveal className="mb-4"><SectionChip>{isAr ? 'ما نؤمن به' : 'What we value'}</SectionChip></Reveal>
          <Reveal delay={80}>
            <h2 className="font-display font-bold text-[28px] sm:text-[36px] lg:text-[46px] text-fa-liberty-blue leading-[1.08] tracking-[-0.02em] max-w-[720px]">
              {isAr ? 'المبادئ التي تحرّك كل طلب.' : 'The principles behind every order.'}
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 80} className="h-full">
                <SpotlightCard className="fa-card fa-card--glow group h-full p-7 text-left rtl:text-right">
                  <span className="fa-iconchip"><v.icon size={22} strokeWidth={1.8} /></span>
                  <h3 className="font-display mt-5 text-[18px] lg:text-[20px] font-bold text-fa-liberty-blue tracking-[-0.02em]">{v.title}</h3>
                  <p className="font-body mt-2.5 text-[14px] text-fa-ink-muted leading-[1.65]">{v.body}</p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* By the numbers + CTA */}
      <section className="relative bg-fa-liberty-blue section-padding overflow-hidden">
        <div className="container-main relative z-10">
          <Reveal className="mb-4"><SectionChip onDark>{isAr ? 'بالأرقام' : 'By the numbers'}</SectionChip></Reveal>
          <Reveal delay={80}>
            <h2 className="font-display font-bold text-[28px] sm:text-[36px] lg:text-[44px] text-fa-classic-chalk leading-[1.1] tracking-[-0.02em] max-w-[640px]">
              {isAr ? 'حضور تشغيلي عبر المملكة.' : 'An operational footprint across the Kingdom.'}
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mt-12 pt-10 border-t border-fa-classic-chalk/12">
            {numbers.map((n, i) => (
              <Reveal key={n.l} delay={i * 90}>
                <div className="w-10 h-[3px] bg-fa-orange-soda mb-5" />
                <div className="font-display font-semibold text-[40px] lg:text-[52px] text-fa-classic-chalk leading-none tracking-[-0.02em] tabular-nums">{n.v}</div>
                <div className="mt-3 text-[11px] font-semibold text-fa-classic-chalk/55 uppercase tracking-[0.08em] font-body">{n.l}</div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <div className="mt-14">
              <MagneticButton variant="filled" href="/contact">
                {isAr ? 'تحدث إلى فريقنا' : 'Talk to our team'}
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
