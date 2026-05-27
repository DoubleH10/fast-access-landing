import { Helmet } from 'react-helmet-async';
import BrandButton from '../components/brand/BrandButton';
import BrandPattern from '../components/brand/BrandPattern';
import SectionChip from '../components/brand/SectionChip';
import { useT } from '../i18n/I18nContext';

export default function NotFound() {
  const { locale } = useT();
  const isAr = locale === 'ar';

  return (
    <>
      <Helmet>
        <title>{isAr ? 'الصفحة غير موجودة — Fast Access' : 'Page not found — Fast Access'}</title>
        <meta
          name="description"
          content="The page you requested could not be found. Return to Fast Access logistics and fulfillment services."
        />
      </Helmet>
      <section className="relative min-h-[72svh] bg-fa-liberty-blue overflow-hidden pt-[132px] lg:pt-[160px] pb-20">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 76% 22%, rgba(241,91,65,0.12), transparent 34%), linear-gradient(180deg, rgba(45,46,117,0.22), rgba(13,18,50,0))',
          }}
        />
        <BrandPattern
          pattern="ribbon"
          tint="orange"
          opacity={0.12}
          className="absolute -right-[8%] bottom-[10%] w-[58%] max-w-[780px] pointer-events-none"
        />
        <div className="container-main relative z-10 text-left rtl:text-right">
          <SectionChip onDark>404</SectionChip>
          <h1 className="font-display font-bold text-[40px] sm:text-[56px] lg:text-[72px] text-fa-classic-chalk leading-[1.02] tracking-[-0.025em] mt-6 max-w-[820px]">
            {isAr ? 'لم نجد هذه الصفحة.' : 'This route is off the manifest.'}
          </h1>
          <p className="font-body mt-5 text-base lg:text-lg text-fa-classic-chalk/65 leading-[1.6] max-w-[560px]">
            {isAr
              ? 'ارجع للرئيسية أو اطلب عرض سعر وسنوصلك للفريق المناسب.'
              : 'Head back home or request a quote and we will route you to the right team.'}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <BrandButton variant="on-dark" href="/">
              {isAr ? 'العودة للرئيسية' : 'Back home'}
            </BrandButton>
            <BrandButton variant="filled" href="/contact">
              {isAr ? 'اطلب عرض سعر' : 'Get a quote'}
            </BrandButton>
          </div>
        </div>
      </section>
    </>
  );
}
