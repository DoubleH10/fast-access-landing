import { Helmet } from 'react-helmet-async';
import PageHeader from '../components/PageHeader';
import FAQ from '../sections/FAQ';
import { useT } from '../i18n/I18nContext';

export default function Resources() {
  const { t } = useT();
  return (
    <>
      <Helmet>
        <title>Resources — Fast Access</title>
        <meta name="description" content="Frequently asked questions about Fast Access fulfillment, storage, shipping, and same-day delivery across Saudi Arabia and the Gulf." />
      </Helmet>
      <PageHeader title={t('pages.resources.title')} sub={t('pages.resources.sub')} />
      <FAQ />
    </>
  );
}
