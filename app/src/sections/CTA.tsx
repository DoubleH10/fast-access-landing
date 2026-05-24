import { useState } from 'react';
import { useInView } from '../hooks/useInView';
import SectionChip from '../components/brand/SectionChip';
import BrandPattern from '../components/brand/BrandPattern';
import { useT } from '../i18n/I18nContext';
import { Check, Mail, Phone, ArrowRight, Sparkles } from 'lucide-react';

const formFields = {
  en: {
    firstName: 'First Name',
    lastName: 'Last Name',
    brandName: 'Brand / Company Name',
    email: 'Email Address',
    mobile: 'Mobile Number',
    website: 'Website / Store URL',
    businessType: 'Business Type',
    businessTypePlaceholder: 'Select business type',
    orderVolume: 'Monthly Order Volume',
    orderVolumePlaceholder: 'Select order volume',
    services: 'Required Services',
    notes: 'Additional Notes / Requirements',
    submit: 'Submit Inquiry',
    submitting: 'Sending...',
    successTitle: 'Thank you for contacting Fast Access!',
    successSub: 'Our team will contact you within one business day to discuss your needs and partnership details.',
    types: ['E-Commerce Store', 'Retail Business', 'Startup', 'Other'],
    volumes: ['< 500 orders/month', '500 - 2,000 orders/month', '2,000 - 10,000 orders/month', '10,000+ orders/month'],
    serviceList: ['Storage', 'Packing & Prep', 'Shipping & Delivery', 'Real-time Tracking', 'Cloud Stores', 'Customer Support'],
  },
  ar: {
    firstName: 'الاسم الأول',
    lastName: 'اسم العائلة',
    brandName: 'اسم العلامة التجارية / الشركة',
    email: 'البريد الإلكتروني',
    mobile: 'رقم الجوال',
    website: 'رابط الموقع أو المتجر',
    businessType: 'نوع النشاط',
    businessTypePlaceholder: 'اختر نوع النشاط',
    orderVolume: 'حجم الطلبات الشهرية',
    orderVolumePlaceholder: 'اختر حجم الطلبات',
    services: 'الخدمات المطلوبة',
    notes: 'ملاحظات إضافية / متطلبات خاصة',
    submit: 'إرسال الطلب',
    submitting: 'جاري الإرسال...',
    successTitle: 'شكرًا لثقتك في Fast Access!',
    successSub: 'وبيننا تواصل قريب. فريقنا راح يتواصل معك خلال يوم عمل واحد لمناقشة احتياجاتك وتفاصيل التعاون.',
    types: ['متجر إلكتروني', 'شركة تجزئة', 'شركة ناشئة', 'أخرى'],
    volumes: ['أقل من 500 طلب / شهر', '500 - 2,000 طلب / شهر', '2,000 - 10,000 طلب / شهر', 'أكثر من 10,000 طلب / شهر'],
    serviceList: ['التخزين', 'التجهيز والتغليف', 'الشحن والتوصيل', 'المتابعة اللحظية', 'المتاجر السحابية', 'خدمة العملاء'],
  }
};

export default function CTA() {
  const { t, locale } = useT();
  const isAr = locale === 'ar';
  const f = formFields[locale];
  const { ref, isInView } = useInView(0.15);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    brandName: '',
    email: '',
    mobile: '',
    website: '',
    businessType: '',
    orderVolume: '',
    services: [] as string[],
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceChange = (serviceName: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(serviceName)
        ? prev.services.filter(s => s !== serviceName)
        : [...prev.services, serviceName]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      console.log('Lead submitted:', formData);
    }, 1200);
  };

  return (
    <section id="quote" ref={ref} className="relative bg-fa-liberty-blue pt-24 pb-20 lg:pt-28 lg:pb-28 overflow-hidden">
      {/* Pattern 1 — Ribbon background decoration */}
      <BrandPattern
        pattern="ribbon"
        tint="orange"
        opacity={0.16}
        className="absolute top-[15%] -right-[10%] w-[110%] max-w-none"
      />

      <div className="container-main relative z-10">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-start">
          
          {/* LEFT — Info & Texts */}
          <div className="text-left rtl:text-right lg:sticky lg:top-28">
            <div className="inline-flex mb-6" style={{ opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 500ms ease-out' }}>
              <SectionChip onDark>{t('cta.chip')}</SectionChip>
            </div>

            <h2 className="font-display font-bold text-[36px] sm:text-[48px] lg:text-[56px] text-fa-classic-chalk leading-[1.05] tracking-[-0.025em]" style={{ opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 600ms ease-out 100ms' }}>
              {t('cta.headlineA')} <span className="text-fa-orange-soda">{t('cta.headlineHighlight')}</span> {t('cta.headlineB')}
            </h2>

            <p className="font-body mt-6 text-base text-fa-classic-chalk/65 max-w-[500px] leading-[1.6]" style={{ opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 500ms ease-out 200ms' }}>
              {t('cta.body')}
            </p>

            {/* Direct Contact info */}
            <div className="mt-12 space-y-5 border-t border-white/10 pt-8 max-w-[440px]" style={{ opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 500ms ease-out 300ms' }}>
              <div className="flex items-center gap-4 text-fa-classic-chalk/85">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-fa-orange-soda">
                  <Mail size={16} />
                </div>
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-fa-classic-chalk/45">{isAr ? 'البريد الإلكتروني' : 'Email Address'}</div>
                  <a href="mailto:support@faccess.co" className="text-sm font-medium hover:underline hover:text-white transition-colors">support@faccess.co</a>
                </div>
              </div>

              <div className="flex items-center gap-4 text-fa-classic-chalk/85">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-fa-orange-soda">
                  <Phone size={16} />
                </div>
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-fa-classic-chalk/45">{isAr ? 'تواصل معنا' : 'Contact Support'}</div>
                  <a href="https://wa.me/966500000000" target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:underline hover:text-white transition-colors">{isAr ? 'تواصل عبر واتساب' : 'Chat via WhatsApp'}</a>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4 text-[11px] text-fa-orange-soda font-semibold uppercase tracking-wider font-body">
                <span className="w-1.5 h-1.5 rounded-full bg-fa-orange-soda animate-pulse" />
                {isAr ? 'الرد خلال يوم عمل واحد' : 'Reply within one business day'}
              </div>
            </div>
          </div>

          {/* RIGHT — Contact Form Card */}
          <div style={{ opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(30px)', transition: 'all 600ms ease-out 250ms' }}>
            <div 
              className="rounded-2xl p-6 sm:p-8 md:p-10 text-fa-classic-chalk relative overflow-hidden"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 24px 60px rgba(0,0,0,0.3), inset 0 0 0 1px rgba(255,255,255,0.08)',
              }}
            >
              {submitted ? (
                // Success State
                <div className="text-center py-10 px-4 animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-fa-orange-soda/10 border border-fa-orange-soda/20 flex items-center justify-center text-fa-orange-soda mx-auto mb-6">
                    <Sparkles size={32} className="animate-pulse" />
                  </div>
                  <h3 className="font-display font-semibold text-[24px] lg:text-[28px] text-white leading-snug tracking-tight mb-4">
                    {f.successTitle}
                  </h3>
                  <p className="font-body text-sm text-fa-classic-chalk/65 leading-relaxed max-w-[380px] mx-auto">
                    {f.successSub}
                  </p>
                </div>
              ) : (
                // Contact Form
                <form onSubmit={handleSubmit} className="space-y-6 text-left rtl:text-right">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-[10px] font-semibold text-fa-classic-chalk/50 uppercase tracking-wider mb-2">{f.firstName}</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2.5 text-sm text-white placeholder-white/20 focus:border-fa-orange-soda/50 focus:ring-2 focus:ring-fa-orange-soda/10 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-[10px] font-semibold text-fa-classic-chalk/50 uppercase tracking-wider mb-2">{f.lastName}</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2.5 text-sm text-white placeholder-white/20 focus:border-fa-orange-soda/50 focus:ring-2 focus:ring-fa-orange-soda/10 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="brandName" className="block text-[10px] font-semibold text-fa-classic-chalk/50 uppercase tracking-wider mb-2">{f.brandName}</label>
                    <input
                      type="text"
                      id="brandName"
                      name="brandName"
                      required
                      value={formData.brandName}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2.5 text-sm text-white placeholder-white/20 focus:border-fa-orange-soda/50 focus:ring-2 focus:ring-fa-orange-soda/10 outline-none transition-all"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-[10px] font-semibold text-fa-classic-chalk/50 uppercase tracking-wider mb-2">{f.email}</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2.5 text-sm text-white placeholder-white/20 focus:border-fa-orange-soda/50 focus:ring-2 focus:ring-fa-orange-soda/10 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="mobile" className="block text-[10px] font-semibold text-fa-classic-chalk/50 uppercase tracking-wider mb-2">{f.mobile}</label>
                      <input
                        type="tel"
                        id="mobile"
                        name="mobile"
                        required
                        value={formData.mobile}
                        onChange={handleInputChange}
                        className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2.5 text-sm text-white placeholder-white/20 focus:border-fa-orange-soda/50 focus:ring-2 focus:ring-fa-orange-soda/10 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="website" className="block text-[10px] font-semibold text-fa-classic-chalk/50 uppercase tracking-wider mb-2">{f.website}</label>
                    <input
                      type="url"
                      id="website"
                      name="website"
                      placeholder="https://example.com"
                      value={formData.website}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2.5 text-sm text-white placeholder-white/20 focus:border-fa-orange-soda/50 focus:ring-2 focus:ring-fa-orange-soda/10 outline-none transition-all"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="businessType" className="block text-[10px] font-semibold text-fa-classic-chalk/50 uppercase tracking-wider mb-2">{f.businessType}</label>
                      <select
                        id="businessType"
                        name="businessType"
                        required
                        value={formData.businessType}
                        onChange={handleInputChange}
                        className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2.5 text-sm text-white/80 focus:border-fa-orange-soda/50 focus:ring-2 focus:ring-fa-orange-soda/10 outline-none transition-all [&>option]:bg-fa-liberty-blue [&>option]:text-white"
                      >
                        <option value="" disabled className="text-white/30">{f.businessTypePlaceholder}</option>
                        {f.types.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="orderVolume" className="block text-[10px] font-semibold text-fa-classic-chalk/50 uppercase tracking-wider mb-2">{f.orderVolume}</label>
                      <select
                        id="orderVolume"
                        name="orderVolume"
                        required
                        value={formData.orderVolume}
                        onChange={handleInputChange}
                        className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2.5 text-sm text-white/80 focus:border-fa-orange-soda/50 focus:ring-2 focus:ring-fa-orange-soda/10 outline-none transition-all [&>option]:bg-fa-liberty-blue [&>option]:text-white"
                      >
                        <option value="" disabled className="text-white/30">{f.orderVolumePlaceholder}</option>
                        {f.volumes.map(v => <option key={v} value={v}>{v}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold text-fa-classic-chalk/50 uppercase tracking-wider mb-3">{f.services}</label>
                    <div className="grid grid-cols-2 gap-3">
                      {f.serviceList.map((service) => {
                        const isChecked = formData.services.includes(service);
                        return (
                          <label key={service} className="flex items-center gap-3 cursor-pointer select-none">
                            <span 
                              className={`w-4.5 h-4.5 border rounded flex items-center justify-center transition-all ${isChecked ? 'bg-fa-orange-soda border-fa-orange-soda text-white' : 'border-white/20 bg-white/5 hover:border-white/40'}`}
                            >
                              {isChecked && <Check size={11} strokeWidth={3} />}
                            </span>
                            <input
                              type="checkbox"
                              className="sr-only"
                              checked={isChecked}
                              onChange={() => handleServiceChange(service)}
                            />
                            <span className="text-xs text-fa-classic-chalk/85">{service}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="notes" className="block text-[10px] font-semibold text-fa-classic-chalk/50 uppercase tracking-wider mb-2">{f.notes}</label>
                    <textarea
                      id="notes"
                      name="notes"
                      rows={3}
                      value={formData.notes}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2.5 text-sm text-white placeholder-white/20 focus:border-fa-orange-soda/50 focus:ring-2 focus:ring-fa-orange-soda/10 outline-none transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full group flex items-stretch font-body text-[12px] font-semibold uppercase tracking-[0.08em] rounded-[4px] overflow-hidden transition-transform duration-200 hover:-translate-y-0.5"
                    style={{ backgroundColor: '#F15B41', color: '#F4F4F1' }}
                  >
                    <span className="flex-1 text-center py-3.5">{loading ? f.submitting : f.submit}</span>
                    <span
                      className="flex items-center justify-center px-4"
                      style={{ backgroundColor: 'rgba(13,18,50,0.18)' }}
                    >
                      <ArrowRight size={14} strokeWidth={2.4} className="group-hover:translate-x-0.5 transition-transform rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
                    </span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 350ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
      `}</style>
    </section>
  );
}
