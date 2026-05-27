import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Minus, MessageCircleQuestion, ArrowRight } from 'lucide-react';
import { useT } from '../i18n/I18nContext';
import SectionChip from '../components/brand/SectionChip';
import SpotlightCard from '../components/brand/SpotlightCard';
import BrandPattern from '../components/brand/BrandPattern';

// FAQ data with translations for all 17 slides questions and answers.
const faqItems = [
  {
    qEn: 'What services does Fast Access provide?',
    qAr: 'ما الخدمات التي تقدمها Fast Access؟',
    aEn: 'We provide end-to-end logistics solutions including storage, professional packaging, shipping, real-time tracking, cloud store fulfillment (2-4hr same-day delivery), and 24/7 customer support.',
    aAr: 'نقدم حلولاً لوجستية متكاملة تشمل التخزين، والتجهيز والتغليف، والشحن والتوصيل، والمتابعة اللحظية للطلبات، والمتاجر السحابية (التوصيل خلال 2-4 ساعات في نفس اليوم)، ودعم عملاء على مدار الساعة.',
  },
  {
    qEn: 'Who are the clients you work with?',
    qAr: 'من هم العملاء الذين تعملون معهم؟',
    aEn: 'We work with all types of e-commerce brands, commercial companies, and retailers looking for automated logistics and fast delivery inside Saudi Arabia and the Gulf.',
    aAr: 'نعمل مع جميع أصحاب المتاجر الإلكترونية، والشركات التجارية، وتجار التجزئة الذين يبحثون عن أتمتة عمليات الشحن وتوصيل سريع داخل المملكة ودول الخليج.',
  },
  {
    qEn: 'Do you support integration with e-commerce platforms?',
    qAr: 'هل تدعمون الربط مع منصات التجارة الإلكترونية؟',
    aEn: 'Yes! We support plug-and-play integrations with Salla, Zid, Shopify, WooCommerce, Magento, as well as a robust developer API for custom store platforms.',
    aAr: 'نعم! ندعم الربط المباشر والسريع مع أشهر المنصات مثل سلة، وزد، وشوبيفاي، وووكومرس، وماجينتو، بالإضافة إلى واجهة برمجة تطبيقات (API) للمنصات الخاصة.',
  },
  {
    qEn: 'How long is delivery inside Saudi cities and the Gulf?',
    qAr: 'كم مدة التوصيل داخل مدن المملكة ودول الخليج؟',
    aEn: 'Riyadh delivery is within 2-4 hours (via cloud stores). Main Saudi cities are next-day, and other regions take 2-3 business days. Gulf (GCC) delivery is completed within 3-5 business days.',
    aAr: 'التوصيل داخل الرياض يتم خلال 2 إلى 4 ساعات (عبر المتاجر السحابية). المدن الرئيسية في المملكة خلال اليوم التالي، والمناطق الأخرى خلال 2-3 أيام عمل. دول الخليج تستغرق 3-5 أيام عمل.',
  },
  {
    qEn: 'Do you ship worldwide?',
    qAr: 'هل يوجد شحن لدول العالم؟',
    aEn: 'Yes, we ship globally to over 220 countries through our strong partnerships with leading international carrier networks.',
    aAr: 'نعم، نوفر خدمات الشحن الدولي لأكثر من 220 دولة حول العالم بالتعاون مع أقوى شركاء الشحن والناقلين الدوليين.',
  },
  {
    qEn: 'How can I know shipping rates?',
    qAr: 'كيف يمكنني معرفة أسعار الشحن؟',
    aEn: 'We offer flexible customized pricing based on your product dimensions, monthly order volume, and packaging choice. Use our website savings calculator or click "Inquire Now" to get a transparent custom quote.',
    aAr: 'نوفر أسعاراً مرنة ومخصصة تناسب حجم نشاطك وتعتمد على طبيعة منتجاتك وحجم الطلبات ونوع التغليف. يمكنك استخدام الحاسبة التفاعلية أو الضغط على "تواصل معنا" للحصول على عرض سعر واضح.',
  },
  {
    qEn: 'Can you manage returns?',
    qAr: 'هل يمكنكم إدارة المرتجعات؟',
    aEn: 'Absolutely. We handle the entire reverse logistics chain: collecting returns from customers, inspecting their condition, restocking them in the warehouse, and updating your inventory instantly.',
    aAr: 'بالتأكيد. نتولى إدارة عمليات المرتجعات بالكامل: بدءاً من استلامها من العميل، وفحص جودتها، ثم إعادتها للمخازن وتحديث كميات المنتجات تلقائياً في لوحة تحكمك.',
  },
  {
    qEn: 'Do you provide reports and operational visibility?',
    qAr: 'هل توفرون تقارير ووضوح تشغيلي؟',
    aEn: 'Yes. Our user-friendly dashboard gives you complete live visibility on shipment stages, delivery performance, SLA on-time rates, and detailed inventory metrics.',
    aAr: 'نعم. نوفر لوحة تحكم متكاملة وسهلة الاستخدام تمنحك وضوحاً كاملاً وتقارير لحظية عن حالة الشحنات، وأداء التوصيل، ونسب الالتزام بالوقت، وحركة المخزون.',
  },
  {
    qEn: 'Can operations scale with our business growth?',
    qAr: 'هل يمكن للعمليات أن تتوسع مع نمو نشاطنا؟',
    aEn: 'Yes. Our infrastructure and fulfillment center network are built to scale with your store, handling seasonal peaks, sales events, and volume surges without delays.',
    aAr: 'نعم. بنيتنا التحتية وشبكة مستودعاتنا مصممة لتواكب نمو أعمالك ومبيعاتك، مع مرونة تامة لتغطية أوقات المواسم وضغط الطلبات العالية بدون تأخير.',
  },
  {
    qEn: 'Do you support custom operational requirements?',
    qAr: 'هل تدعمون المتطلبات التشغيلية الخاصة؟',
    aEn: 'Yes. We support custom kitting, bundle assembly, promotional inserts, custom branded gift packaging, and specific product preparation guidelines.',
    aAr: 'نعم. ندعم المتطلبات الخاصة مثل تجهيز الباقات، ودمج المنتجات، وإضافة كروت الهدايا والرسائل المخصصة، وتوفير التغليف التابع لهوية علامتك التجارية.',
  },
  {
    qEn: 'What is the warehouse size?',
    qAr: 'كم مساحة المستودع؟',
    aEn: 'We operate multiple fulfillment centers strategically located across major Saudi cities, featuring over 15,000+ square meters of storage capacity built to premium specifications.',
    aAr: 'نملك مستودعات ومراكز توزيع متعددة موزعة بشكل استراتيجي في المدن الكبرى في المملكة بمساحات تخزينية تتجاوز 15,000 متر مربع ومجهزة بأحدث الأنظمة.',
  },
  {
    qEn: 'Can I visit the warehouse?',
    qAr: 'هل يمكنني التردد على المستودع؟',
    aEn: 'Yes. Visits can be scheduled in advance with our account managers for inventory audits, quality reviews, or general facility tours.',
    aAr: 'نعم. يمكن جدولة زيارة المستودعات مسبقاً بالتنسيق مع مدير حسابك للقيام بعمليات جرد المخزون، أو معاينة الجودة، أو الجولات التعريفية.',
  },
  {
    qEn: 'Is there refrigerated storage?',
    qAr: 'هل يوجد تخزين مبرد؟',
    aEn: 'Yes, we have specialized climate-controlled zones built to store temperature-sensitive products under perfect conditions.',
    aAr: 'نعم، نوفر مساحات تخزين مخصصة ومكيفة لحفظ المنتجات الحساسة للحرارة لضمان بقائها في بيئة مثالية.',
  },
  {
    qEn: 'What is the temperature of the refrigerated storage?',
    qAr: 'كم درجة حرارة المستودع المبرد؟',
    aEn: 'We maintain controlled room temperatures (18°C - 22°C) for cosmetics, vitamins, and electronics, and cold-chain zones (2°C - 8°C) for pharmaceutical or sensitive goods.',
    aAr: 'نحافظ على درجات حرارة مكيفة (18-22 درجة مئوية) للعطور ومستحضرات التجميل والإلكترونيات، ونوفر مناطق تبريد مخصصة (2-8 درجات مئوية) للمنتجات الأكثر حساسية.',
  },
  {
    qEn: 'How is inventory picked up from me and how much do I pay?',
    qAr: 'كيف يتم استلام البضاعة مني لأخذها للمستودع وكم المبلغ المطلوب مني دفعه؟',
    aEn: 'We can arrange automated carrier pickups to transport your products directly from your supplier or location to our hubs. Inbound pricing is transparent and calculated based on pallet counts or shipment dimensions.',
    aAr: 'نقوم بالتنسيق لاستلام البضائع من موقعك أو من الموردين مباشرة ونقلها لمستودعاتنا. تكلفة الاستلام واضحة ومحسوبة بناءً على حجم الشحنة أو عدد المنصات (Pallets).',
  },
  {
    qEn: 'Do you have the SFDA certificate?',
    qAr: 'هل يوجد لديكم شهادة هيئة الصحة والغذاء؟',
    aEn: 'Yes! All our warehouses are fully certified and licensed by the Saudi Food and Drug Authority (SFDA) for cosmetics, health, and medical products.',
    aAr: 'نعم! جميع مستودعاتنا مرخصة وحاصلة على الشهادات اللازمة من الهيئة العامة للغذاء والدواء (SFDA) لتخزين مستحضرات التجميل والأغذية والمنتجات الطبية.',
  },
  {
    qEn: 'If a carrier damages my products, what is the compensation?',
    qAr: 'في حال أتلفت شركة الشحن منتجاتي كم قيمة التعويض؟',
    aEn: 'All shipments are covered by logistics insurance. In the rare event of damage or loss by a carrier, we handle the claims process and compensate you for the declared cost value of the products.',
    aAr: 'جميع الشحنات مغطاة بتأمين لوجستي. في حال تعرض المنتج للتلف أو الفقدان من قِبل شركة الشحن، نتولى إدارة تقديم المطالبة والتعويض المالي بناءً على القيمة التكلفية المسجلة للمنتج.',
  },
];

export default function FAQ() {
  const { locale } = useT();
  const isAr = locale === 'ar';
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative bg-fa-paper py-20 lg:py-28 border-t border-fa-hairline">
      <BrandPattern
        pattern="lozenge"
        tint="navy"
        opacity={0.035}
        className="absolute -top-[10%] -right-[12%] w-[54%] max-w-[760px] pointer-events-none"
      />

      <div className="container-main relative z-10">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-16 items-start">
          {/* Intro — sticky on desktop */}
          <div className="text-left rtl:text-right lg:sticky lg:top-28">
            <div className="inline-flex mb-5">
              <SectionChip>{isAr ? 'الأسئلة الشائعة' : 'FAQ'}</SectionChip>
            </div>
            <h2 className="font-display font-bold text-[30px] sm:text-[38px] lg:text-[46px] text-fa-liberty-blue leading-[1.08] tracking-[-0.02em]">
              {isAr ? (
                <>
                  تفاصيل أكثر ودك تعرفها عن <span className="text-fa-orange-soda">FAST ACCESS</span>
                </>
              ) : (
                <>
                  Everything you need to know about <span className="text-fa-orange-soda">FAST ACCESS</span>
                </>
              )}
            </h2>
            <p className="font-body mt-5 text-base text-fa-ink-muted leading-[1.6] max-w-[420px]">
              {isAr
                ? 'إجابات شاملة لجميع استفساراتك حول التخزين، التغليف، التوصيل، وأنظمتنا التقنية.'
                : 'Detailed answers to all your inquiries about warehousing, packaging, delivery, and our software integration.'}
            </p>

            {/* Still have questions — contact nudge */}
            <SpotlightCard
              radius={300}
              className="fa-card fa-card--glow group relative overflow-hidden mt-8 p-6 hidden lg:block max-w-[380px]"
            >
              <div className="relative z-10 flex items-start gap-4">
                <span className="fa-iconchip shrink-0">
                  <MessageCircleQuestion size={22} strokeWidth={1.8} />
                </span>
                <div>
                  <h3 className="font-display text-[16px] font-semibold text-fa-liberty-blue">
                    {isAr ? 'لم تجد إجابتك؟' : 'Still have a question?'}
                  </h3>
                  <p className="font-body mt-1.5 text-[13px] text-fa-ink-muted leading-[1.55]">
                    {isAr ? 'فريقنا يرد خلال يوم عمل واحد.' : 'Our team replies within one business day.'}
                  </p>
                  <Link
                    to="/contact"
                    className="group/link inline-flex items-center gap-1.5 mt-3 text-[12px] font-semibold uppercase tracking-[0.06em] text-fa-orange-soda font-body"
                  >
                    {isAr ? 'تواصل معنا' : 'Talk to us'}
                    <ArrowRight size={13} strokeWidth={2.4} className="transition-transform duration-200 group-hover/link:translate-x-1 rtl:rotate-180 rtl:group-hover/link:-translate-x-1" />
                  </Link>
                </div>
              </div>
            </SpotlightCard>
          </div>

          {/* Accordion */}
          <div className="space-y-3">
            {faqItems.map((item, i) => {
              const question = isAr ? item.qAr : item.qEn;
              const answer = isAr ? item.aAr : item.aEn;
              const isOpen = activeIndex === i;

              return (
                <div
                  key={i}
                  className={`rounded-xl border overflow-hidden transition-all duration-200 ${
                    isOpen
                      ? 'border-fa-orange-soda/30 bg-fa-surface shadow-[0_12px_32px_-14px_rgba(13,18,50,0.16)]'
                      : 'border-fa-hairline bg-fa-surface/50 hover:border-fa-orange-soda/20 hover:bg-fa-surface'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleAccordion(i)}
                    aria-expanded={isOpen}
                    className="group w-full flex items-center justify-between gap-4 p-5 lg:px-6 text-left rtl:text-right"
                  >
                    <span className={`font-display text-[15px] lg:text-base font-semibold transition-colors duration-200 ${isOpen ? 'text-fa-orange-soda' : 'text-fa-liberty-blue group-hover:text-fa-orange-soda'}`}>
                      {question}
                    </span>
                    <span
                      className={`relative shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isOpen ? 'bg-fa-orange-soda text-white' : 'bg-fa-orange-100 text-fa-orange-soda group-hover:bg-fa-orange-soda/15'
                      }`}
                    >
                      <Plus size={15} strokeWidth={2.5} className={`absolute transition-all duration-300 ${isOpen ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'}`} />
                      <Minus size={15} strokeWidth={2.5} className={`absolute transition-all duration-300 ${isOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'}`} />
                    </span>
                  </button>

                  {/* Animated collapsible answer panel */}
                  <div
                    className="transition-all duration-300 ease-in-out overflow-hidden"
                    style={{
                      maxHeight: isOpen ? '320px' : '0px',
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <div className="mx-5 lg:mx-6 mb-6 pt-4 text-sm text-fa-ink-muted leading-[1.65] border-t border-fa-hairline/55">
                      {answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
