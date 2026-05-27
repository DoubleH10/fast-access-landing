import { Helmet } from 'react-helmet-async';
import PageHeader from '../components/PageHeader';
import ServicesGrid from '../sections/ServicesGrid';
import DashboardPreview from '../sections/DashboardPreview';
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
      <DashboardPreview />
    </>
  );
}
