import { Helmet } from 'react-helmet-async';
import PageHeader from '../components/PageHeader';
import WhatIsFA from '../sections/WhatIsFA';
import Coverage from '../sections/Coverage';
import SectionChip from '../components/brand/SectionChip';
import { useT } from '../i18n/I18nContext';

export default function About() {
  const { t } = useT();
  return (
    <>
      <Helmet>
        <title>About — Fast Access</title>
        <meta name="description" content="Fast Access is the fastest fulfillment partner for fast-growing brands in Saudi Arabia and the Gulf — warehousing, packing, and last-mile delivery as one operation." />
      </Helmet>
      <PageHeader title={t('pages.about.title')} sub={t('pages.about.sub')} />
      <WhatIsFA />
      {/* Mission band */}
      <section className="relative bg-fa-classic-chalk section-padding border-t border-fa-hairline">
        <div className="container-main max-w-[820px] text-left rtl:text-right">
          <SectionChip>{t('pages.mission.title')}</SectionChip>
          <p className="font-display font-medium text-[24px] sm:text-[30px] lg:text-[38px] text-fa-liberty-blue leading-[1.3] tracking-[-0.015em] mt-6">
            {t('pages.mission.body')}
          </p>
        </div>
      </section>
      <Coverage />
    </>
  );
}
