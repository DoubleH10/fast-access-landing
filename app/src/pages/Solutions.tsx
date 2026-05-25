import { Helmet } from 'react-helmet-async';
import PageHeader from '../components/PageHeader';
import ServicesGrid from '../sections/ServicesGrid';
import Journey from '../sections/Journey';
import DashboardPreview from '../sections/DashboardPreview';
import ErrorBoundary from '../components/ErrorBoundary';
import SectionChip from '../components/brand/SectionChip';
import { useT } from '../i18n/I18nContext';

export default function Solutions() {
  const { t } = useT();
  return (
    <>
      <Helmet>
        <title>Solutions — Fast Access</title>
        <meta name="description" content="Storage, packing, shipping, real-time tracking, and same-day cloud-store delivery — one coordinated fulfillment operation from Fast Access." />
      </Helmet>
      <PageHeader chip={t('services.chip')} title={t('pages.solutions.title')} sub={t('pages.solutions.sub')} />
      <ServicesGrid />
      <ErrorBoundary
        fallback={
          <section id="platform" className="bg-fa-liberty-blue section-padding">
            <div className="container-main">
              <SectionChip onDark>{t('journey.chip')}</SectionChip>
              <h2 className="font-display font-bold text-[32px] sm:text-[40px] lg:text-[56px] text-fa-classic-chalk leading-[1.05] tracking-[-0.02em] mt-5 max-w-[800px]">
                {t('journey.headlineA')} <span className="text-fa-orange-soda">{t('journey.headlineHighlight')}</span> {t('journey.headlineB')}
              </h2>
              <p className="font-body mt-5 text-base sm:text-lg text-fa-classic-chalk/65 max-w-[560px] leading-[1.55]">
                {t('journey.body')}
              </p>
            </div>
          </section>
        }
      >
        <Journey />
      </ErrorBoundary>
      <DashboardPreview />
    </>
  );
}
