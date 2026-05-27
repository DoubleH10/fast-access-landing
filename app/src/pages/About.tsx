import { Helmet } from 'react-helmet-async';
import { Target, Telescope } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import Coverage from '../sections/Coverage';
import SectionChip from '../components/brand/SectionChip';
import Reveal from '../components/Reveal';
import { useT } from '../i18n/I18nContext';

export default function About() {
  const { t } = useT();
  return (
    <>
      <Helmet>
        <title>About — Fast Access</title>
        <meta name="description" content="Fast Access is an operational logistics company — the current that drives e-commerce growth across Saudi Arabia and the Gulf." />
      </Helmet>
      <PageHeader title={t('pages.about.title')} sub={t('pages.about.sub')} />

      {/* Who we are */}
      <section className="relative bg-fa-cream section-padding overflow-hidden">
        <div className="container-main relative z-10 max-w-[860px] text-left rtl:text-right">
          <Reveal className="mb-5"><SectionChip>{t('pages.mission.whoTitle')}</SectionChip></Reveal>
          <Reveal delay={80}>
            <p className="font-display font-medium text-[24px] sm:text-[30px] lg:text-[38px] text-fa-liberty-blue leading-[1.32] tracking-[-0.015em]">
              {t('pages.mission.whoBody')}
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
            <Reveal key={i} delay={i * 100} className="fa-card p-8 lg:p-10 text-left rtl:text-right">
              <span className="fa-iconchip"><b.icon size={24} strokeWidth={1.8} /></span>
              <h2 className="font-display mt-6 text-[24px] lg:text-[28px] font-bold text-fa-liberty-blue tracking-[-0.02em]">{b.title}</h2>
              <p className="font-body mt-3 text-[15px] lg:text-base text-fa-ink-muted leading-[1.7]">{b.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <Coverage />
    </>
  );
}
