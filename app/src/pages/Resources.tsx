import { Helmet } from 'react-helmet-async';
import { BookOpen, Truck, Boxes, RotateCcw, CalendarDays, Plug, ArrowUpRight } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import SectionChip from '../components/brand/SectionChip';
import SpotlightCard from '../components/brand/SpotlightCard';
import RevealText from '../components/brand/RevealText';
import MagneticButton from '../components/brand/MagneticButton';
import Reveal from '../components/Reveal';
import { useT } from '../i18n/I18nContext';

export default function Resources() {
  const { t, locale } = useT();
  const isAr = locale === 'ar';

  const guides = [
    { icon: Truck, tag: isAr ? 'شحن' : 'Shipping', title: isAr ? 'دليل الشحن للتجار' : 'The merchant shipping playbook', body: isAr ? 'كيف تختار سرعة الشحن المناسبة وتخفض تكلفة الطرد دون التأثير على التجربة.' : 'How to pick the right shipping speed and cut per-parcel cost without hurting experience.' },
    { icon: Boxes, tag: isAr ? 'تخزين' : 'Storage', title: isAr ? 'إدارة المخزون بذكاء' : 'Smart inventory management', body: isAr ? 'متى توزّع مخزونك على أكثر من مركز، وكيف تستعد لمواسم الذروة.' : 'When to split stock across centres, and how to prep for peak seasons.' },
    { icon: CalendarDays, tag: isAr ? 'مواسم' : 'Peak', title: isAr ? 'الاستعداد لموسم الذروة' : 'Surviving peak season', body: isAr ? 'قائمة تحقّق عملية لرمضان والجمعة البيضاء ومواسم التخفيضات.' : 'A practical checklist for Ramadan, White Friday, and sale seasons.' },
    { icon: RotateCcw, tag: isAr ? 'مرتجعات' : 'Returns', title: isAr ? 'تحويل المرتجعات لميزة' : 'Turning returns into an edge', body: isAr ? 'سياسة مرتجعات تبني الثقة وتقلّل الخسارة في آنٍ واحد.' : 'A returns policy that builds trust and reduces loss at the same time.' },
    { icon: Plug, tag: isAr ? 'تكامل' : 'Integration', title: isAr ? 'توصيل متجرك بـ Fast Access' : 'Connecting your store to Fast Access', body: isAr ? 'خطوات ربط سلة وزد وشوبيفاي ومزامنة الطلبات تلقائيًا.' : 'Steps to link Salla, Zid, and Shopify and sync orders automatically.' },
    { icon: BookOpen, tag: isAr ? 'مفاهيم' : 'Basics', title: isAr ? 'مصطلحات اللوجستيات' : 'A glossary of logistics terms', body: isAr ? 'من 3PL إلى المتجر السحابي — المفاهيم التي تحتاجها بلغة بسيطة.' : 'From 3PL to cloud store — the concepts you need, in plain language.' },
  ];

  return (
    <>
      <Helmet>
        <title>Resources — Fast Access</title>
        <meta name="description" content="Guides on shipping, storage, returns, peak season, and integrations — everything merchants need to grow with Fast Access." />
      </Helmet>
      <PageHeader title={t('pages.resources.title')} sub={t('pages.resources.sub')} bg="/assets/hero-resources.jpg" />

      {/* Guides library */}
      <section className="relative bg-fa-cream section-padding overflow-hidden">
        <div className="container-main relative z-10">
          <Reveal className="mb-4"><SectionChip>{isAr ? 'أدلة ومقالات' : 'Guides & playbooks'}</SectionChip></Reveal>
          <Reveal delay={80}>
            <h2 className="font-display font-bold text-[28px] sm:text-[36px] lg:text-[46px] text-fa-liberty-blue leading-[1.08] tracking-[-0.02em] max-w-[720px]">
              <RevealText accent={isAr ? 'تنمو بها' : 'to grow with'} stagger={45}>
                {isAr ? 'مصادر عملية تنمو بها تجارتك.' : 'Practical resources to grow with.'}
              </RevealText>
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {guides.map((g, i) => (
              <Reveal key={g.title} delay={i * 70} className="h-full">
                <SpotlightCard className="fa-card fa-card--glow group h-full p-7 lg:p-8 text-left rtl:text-right cursor-pointer">
                  <div className="flex items-center justify-between">
                    <span className="fa-iconchip"><g.icon size={22} strokeWidth={1.8} /></span>
                    <ArrowUpRight size={18} className="text-fa-liberty-blue/30 transition group-hover:text-fa-orange-soda rtl:-scale-x-100" />
                  </div>
                  <span className="mt-5 inline-block font-ui text-[11px] font-semibold uppercase tracking-[0.1em] text-fa-orange-soda">{g.tag}</span>
                  <h3 className="font-display mt-2 text-[19px] lg:text-[21px] font-bold text-fa-liberty-blue tracking-[-0.02em]">{g.title}</h3>
                  <p className="font-body mt-2.5 text-[14px] text-fa-ink-muted leading-[1.65]">{g.body}</p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Still have questions */}
      <section className="relative bg-fa-liberty-blue section-padding overflow-hidden">
        <div className="container-main relative z-10 text-center">
          <Reveal>
            <h2 className="font-display font-bold text-[26px] sm:text-[34px] lg:text-[44px] text-fa-classic-chalk leading-[1.12] tracking-[-0.02em] max-w-[640px] mx-auto">
              {isAr ? 'لم تجد ما تبحث عنه؟ اسأل فريقنا مباشرة.' : 'Didn’t find what you need? Ask our team directly.'}
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="font-body mt-5 text-base text-fa-classic-chalk/60 max-w-[480px] mx-auto leading-[1.65]">
              {isAr ? 'نرد على أسئلة التجار خلال يوم عمل واحد.' : 'We answer merchant questions within one business day.'}
            </p>
          </Reveal>
          <Reveal delay={180}>
            <div className="mt-10 flex justify-center">
              <MagneticButton variant="filled" href="/contact">
                {isAr ? 'تواصل معنا' : 'Get in touch'}
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
