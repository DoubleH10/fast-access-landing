import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useT } from '../i18n/I18nContext';
import SectionChip from '../components/brand/SectionChip';

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
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none opacity-5 bg-step-grid" />

      <div className="container-main relative z-10">
        <div className="max-w-[800px] mx-auto text-center mb-14">
          <div className="inline-flex mb-5">
            <SectionChip>{isAr ? 'الأسئلة الشائعة' : 'FAQ'}</SectionChip>
          </div>
          <h2 className="font-display font-bold text-[32px] sm:text-[40px] lg:text-[52px] text-fa-liberty-blue leading-[1.05] tracking-[-0.02em]">
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
          <p className="font-body mt-5 text-base text-fa-ink-muted leading-[1.6]">
            {isAr
              ? 'إجابات شاملة لجميع استفساراتك حول التخزين، التغليف، التوصيل، وأنظمتنا التقنية.'
              : 'Detailed answers to all your inquiries about warehousing, packaging, delivery, and our software integration.'}
          </p>
        </div>

        {/* Accordion container */}
        <div className="max-w-[840px] mx-auto space-y-3">
          {faqItems.map((item, i) => {
            const question = isAr ? item.qAr : item.qEn;
            const answer = isAr ? item.aAr : item.aEn;
            const isOpen = activeIndex === i;

            return (
              <div
                key={i}
                className="bg-white border border-fa-hairline rounded-lg overflow-hidden transition-all duration-200"
                style={{
                  boxShadow: isOpen ? '0 8px 24px rgba(13,18,50,0.04)' : 'none',
                  borderColor: isOpen ? 'rgba(241,91,65,0.3)' : '#E8E6DE',
                }}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(i)}
                  className="w-full flex items-center justify-between p-5 lg:p-6 text-left rtl:text-right font-display text-base font-semibold text-fa-liberty-blue hover:text-fa-orange-soda transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle size={18} className="text-fa-orange-soda flex-shrink-0" />
                    <span>{question}</span>
                  </span>
                  <ChevronDown
                    size={16}
                    className="text-fa-liberty-blue/40 transition-transform duration-200"
                    style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  />
                </button>

                {/* Animated collapsible answer panel */}
                <div
                  className="transition-all duration-300 ease-in-out overflow-hidden"
                  style={{
                    maxHeight: isOpen ? '300px' : '0px',
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <div className="px-5 pb-6 lg:px-6 lg:pb-7 text-sm text-fa-ink-muted leading-[1.6] border-t border-fa-hairline/55 pt-4 pl-12 pr-6">
                    {answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
