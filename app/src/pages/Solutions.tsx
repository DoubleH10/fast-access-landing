import { Helmet } from 'react-helmet-async';
import { PackageCheck, Boxes, Truck, Radar, Store, Headset } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import DashboardPreview from '../sections/DashboardPreview';
import SectionChip from '../components/brand/SectionChip';
import SpotlightCard from '../components/brand/SpotlightCard';
import RevealText from '../components/brand/RevealText';
import MagneticButton from '../components/brand/MagneticButton';
import Reveal from '../components/Reveal';
import { useT } from '../i18n/I18nContext';

export default function Solutions() {
  const { t, locale } = useT();
  const isAr = locale === 'ar';

  // How Fast Access plugs into a merchant's operation — page-specific, not on home
  const model = [
    {
      step: '01',
      title: isAr ? 'نستلم مخزونك' : 'We take your stock',
      body: isAr
        ? 'تصلنا بضاعتك إلى أقرب مركز، نفحصها ونرفّها ونسجّل كل صنف في نظامنا.'
        : 'Your inventory arrives at the nearest centre — we inspect, shelve, and log every SKU into the system.',
    },
    {
      step: '02',
      title: isAr ? 'نربط متجرك' : 'We connect your store',
      body: isAr
        ? 'تكامل مباشر مع سلة وزد وشوبيفاي — الطلبات تنزل إلينا تلقائيًا لحظة الشراء.'
        : 'Direct integration with Salla, Zid, and Shopify — orders flow to us automatically the moment a buyer checks out.',
    },
    {
      step: '03',
      title: isAr ? 'نشحن ونتابع' : 'We ship & track',
      body: isAr
        ? 'نجهّز ونغلّف ونسلّم — وكل طلب متتبَّع من الرف حتى باب العميل في لوحة واحدة.'
        : 'We pick, pack, and deliver — every order tracked from shelf to doorstep in one live dashboard.',
    },
  ];

  const capabilities = [
    { icon: Boxes, title: isAr ? 'تخزين مرن' : 'Flexible warehousing', body: isAr ? 'مساحات تتمدد مع موسمك، مع تخزين مبرّد عند الحاجة.' : 'Space that expands with your season, with cold storage on demand.', metric: isAr ? '10+ مراكز' : '10+ centres' },
    { icon: PackageCheck, title: isAr ? 'تجهيز وتغليف' : 'Pick & pack', body: isAr ? 'تغليف بهوية علامتك، جاهز لمواسم الذروة.' : 'Branded packing built for your identity, ready for peak.', metric: isAr ? '2 ساعة تجهيز' : '2-hr pick-pack' },
    { icon: Truck, title: isAr ? 'شحن وتوصيل' : 'Shipping & delivery', body: isAr ? 'شبكة نقل واسعة وتوصيل بنفس اليوم في المدن الكبرى.' : 'Wide carrier network with same-day in major cities.', metric: isAr ? '97% بالوقت' : '97% on-time' },
    { icon: Radar, title: isAr ? 'متابعة لحظية' : 'Live tracking', body: isAr ? 'كل حدث على الطلب يظهر مباشرة لك ولعميلك.' : 'Every order event surfaces live, for you and your buyer.', metric: isAr ? '5 مراحل' : '5 stages' },
    { icon: Store, title: isAr ? 'المتاجر السحابية' : 'Cloud stores', body: isAr ? 'مخزونك موزّع حيث يطلب عملاؤك فعلاً.' : 'Inventory pre-positioned where your customers actually order.', metric: isAr ? '6 مدن' : '6 cities' },
    { icon: Headset, title: isAr ? 'خدمة العملاء' : 'Customer care', body: isAr ? 'فريق دعم يتابع الاستثناءات قبل أن تتحول لشكاوى.' : 'A team that catches exceptions before they become complaints.', metric: isAr ? 'دعم 24/7' : '24/7 support' },
  ];

  const stack = ['Salla', 'Zid', 'Shopify', 'WooCommerce', 'Magento', 'Custom API'];

  return (
    <>
      <Helmet>
        <title>Solutions — Fast Access</title>
        <meta name="description" content="How Fast Access plugs into your store and runs fulfillment end to end — warehousing, pick & pack, shipping, live tracking, and same-day cloud-store delivery." />
      </Helmet>
      <PageHeader chip={t('services.chip')} title={t('pages.solutions.title')} sub={t('pages.solutions.sub')} bg="/assets/hero-solutions.jpg" />

      {/* Operating model — 3 steps */}
      <section className="relative bg-fa-cream section-padding overflow-hidden">
        <div className="container-main relative z-10">
          <Reveal className="mb-4"><SectionChip>{isAr ? 'كيف نعمل معك' : 'How it works with you'}</SectionChip></Reveal>
          <Reveal delay={80}>
            <h2 className="font-display font-bold text-[28px] sm:text-[36px] lg:text-[46px] text-fa-liberty-blue leading-[1.08] tracking-[-0.02em] max-w-[720px]">
              <RevealText accent={isAr ? 'منظومة واحدة' : 'one operation'} stagger={45}>
                {isAr ? 'ثلاث خطوات تربط متجرك بمنظومة واحدة.' : 'Three steps connect your store to one operation.'}
              </RevealText>
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {model.map((m, i) => (
              <Reveal key={m.step} delay={i * 100} className="h-full">
                <SpotlightCard className="fa-card fa-card--glow h-full p-8 lg:p-9 text-left rtl:text-right">
                  <span className="font-display text-[44px] font-bold text-fa-orange-soda/25 leading-none tabular-nums">{m.step}</span>
                  <h3 className="font-display mt-4 text-[21px] lg:text-[24px] font-bold text-fa-liberty-blue tracking-[-0.02em]">{m.title}</h3>
                  <p className="font-body mt-3 text-[15px] text-fa-ink-muted leading-[1.7]">{m.body}</p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities deep-dive */}
      <section className="relative bg-fa-cream-deep section-padding overflow-hidden">
        <div className="container-main relative z-10">
          <Reveal className="mb-4"><SectionChip>{isAr ? 'القدرات' : 'Capabilities'}</SectionChip></Reveal>
          <Reveal delay={80}>
            <h2 className="font-display font-bold text-[28px] sm:text-[36px] lg:text-[46px] text-fa-liberty-blue leading-[1.08] tracking-[-0.02em] max-w-[720px]">
              {isAr ? 'كل ما تحتاجه تجارتك، تحت سقف واحد.' : 'Everything your operation needs, under one roof.'}
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {capabilities.map((c, i) => (
              <Reveal key={c.title} delay={i * 70} className="h-full">
                <SpotlightCard className="fa-card fa-card--glow group h-full p-7 lg:p-8 text-left rtl:text-right">
                  <span className="fa-iconchip"><c.icon size={22} strokeWidth={1.8} /></span>
                  <h3 className="font-display mt-5 text-[19px] lg:text-[21px] font-bold text-fa-liberty-blue tracking-[-0.02em]">{c.title}</h3>
                  <p className="font-body mt-2.5 text-[14px] text-fa-ink-muted leading-[1.65]">{c.body}</p>
                  <div className="mt-5 inline-flex items-center gap-2 border-t border-fa-liberty-blue/10 pt-3 font-ui text-[12px] font-semibold uppercase tracking-[0.08em] text-fa-orange-soda">
                    {c.metric}
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <DashboardPreview />

      {/* Works with your stack */}
      <section className="relative bg-fa-cream section-padding overflow-hidden">
        <div className="container-main relative z-10 text-center">
          <Reveal className="mb-4 flex justify-center"><SectionChip>{isAr ? 'يعمل مع أدواتك' : 'Works with your stack'}</SectionChip></Reveal>
          <Reveal delay={80}>
            <h2 className="font-display font-bold text-[26px] sm:text-[34px] lg:text-[42px] text-fa-liberty-blue leading-[1.1] tracking-[-0.02em] max-w-[680px] mx-auto">
              {isAr ? 'يتصل بمنصتك في دقائق، لا أسابيع.' : 'Connects to your platform in minutes, not weeks.'}
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              {stack.map((s) => (
                <span key={s} className="rounded-full border border-fa-liberty-blue/12 bg-white/60 px-5 py-2.5 font-ui text-[14px] font-semibold text-fa-liberty-blue/80">
                  {s}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-12 flex justify-center">
              <MagneticButton variant="filled" href="/contact">
                {isAr ? 'ابدأ التكامل' : 'Start integrating'}
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
