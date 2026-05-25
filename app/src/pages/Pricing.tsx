import { Helmet } from 'react-helmet-async';
import PageHeader from '../components/PageHeader';
import PricingSection from '../sections/Pricing';
import Calculator from '../sections/Calculator';
import { useT } from '../i18n/I18nContext';

export default function Pricing() {
  const { t } = useT();
  return (
    <>
      <Helmet>
        <title>Pricing — Fast Access</title>
        <meta name="description" content="Clear, custom pricing with no hidden fees. Estimate your fulfillment costs and get an exact quote from Fast Access within one business day." />
      </Helmet>
      <PageHeader chip={t('pricing.chip')} title={t('pages.pricing.title')} sub={t('pages.pricing.sub')} />
      <Calculator />
      <PricingSection />
    </>
  );
}
