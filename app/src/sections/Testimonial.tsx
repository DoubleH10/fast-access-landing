import { useInView } from '../hooks/useInView';
import { Clock3, PackageCheck, Route } from 'lucide-react';
import { useT } from '../i18n/I18nContext';
import BrandPattern from '../components/brand/BrandPattern';

const proof = {
  en: [
    { Icon: Clock3, label: 'Same-day city delivery', detail: 'Cloud stores keep urgent orders close to customers.' },
    { Icon: PackageCheck, label: 'Branded packing', detail: 'Every handoff protects the product and the merchant experience.' },
    { Icon: Route, label: 'One tracked operation', detail: 'Warehouse, carrier, and support activity stay visible in one flow.' },
  ],
  ar: [
    { Icon: Clock3, label: 'توصيل داخل المدينة في نفس اليوم', detail: 'المتاجر السحابية تجعل الطلبات العاجلة قريبة من العميل.' },
    { Icon: PackageCheck, label: 'تغليف بهوية علامتك', detail: 'كل خطوة تحمي المنتج وتجربة العميل مع علامتك.' },
    { Icon: Route, label: 'عملية واحدة متتبعة', detail: 'المستودع والناقل والدعم يظهرون في مسار واضح واحد.' },
  ],
};

export default function Testimonial() {
  const { ref, isInView } = useInView(0.2);
  const { locale } = useT();
  const isAr = locale === 'ar';
  const items = proof[locale];

  return (
    <section ref={ref} className="relative bg-fa-liberty-blue section-padding overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 18% 20%, rgba(241,91,65,0.10), transparent 34%), linear-gradient(180deg, rgba(45,46,117,0.28), rgba(13,18,50,0))',
        }}
      />
      <BrandPattern
        pattern="lozenge"
        tint="orange"
        opacity={0.055}
        className="absolute -top-[12%] -right-[10%] w-[48%] max-w-[760px] pointer-events-none"
      />

      <div className="container-main relative z-10">
        <div
          className="max-w-[860px] text-left rtl:text-right"
          style={{ opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 600ms ease-out' }}
        >
          <div className="mb-8 h-[3px] w-12 bg-fa-orange-soda" />
          <h2 className="font-display text-[30px] sm:text-[38px] lg:text-[50px] text-fa-classic-chalk leading-[1.12] tracking-[-0.015em]">
            {isAr ? (
              <>
                تجربة لوجستية يشعر بها العميل <span className="text-fa-orange-soda">من أول طلب.</span>
              </>
            ) : (
              <>
                Logistics your customers feel <span className="text-fa-orange-soda">on the first order.</span>
              </>
            )}
          </h2>
          <p className="font-body mt-5 text-base text-fa-classic-chalk/65 max-w-[620px] leading-[1.65]">
            {isAr
              ? 'عندما يكون التخزين والتغليف والشحن في عملية واحدة، تقل المتابعة اليدوية ويصل الطلب بالشكل الذي وعدت به عميلك.'
              : 'When storage, packing, and shipping run as one operation, your team spends less time chasing handoffs and customers get what you promised.'}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 lg:gap-6 mt-12">
          {items.map(({ Icon, label, detail }, i) => (
            <div
              key={label}
              className="bg-white/[0.045] border border-white/10 p-6 rounded-sm text-left rtl:text-right"
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 500ms ease-out ${160 + i * 90}ms`,
              }}
            >
              <Icon size={22} className="text-fa-orange-soda" strokeWidth={1.7} />
              <h3 className="font-display mt-6 text-[18px] font-semibold text-fa-classic-chalk tracking-[-0.01em]">
                {label}
              </h3>
              <p className="font-body mt-2 text-sm text-fa-classic-chalk/60 leading-[1.6]">
                {detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
