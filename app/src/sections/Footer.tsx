import { Link } from 'react-router-dom';
import BrandLogo from '../components/brand/BrandLogo';
import { useT } from '../i18n/I18nContext';

type FooterLink = { label: string; to: string };

export default function Footer() {
  const { t, locale } = useT();
  const isAr = locale === 'ar';
  // Nav structure from PPT slide 20 footer:
  // About · Logistics solutions · Pricing · FAQ · Blog · Contact
  // `to`: "/route" → SPA link · "mailto:"/"http" → external.
  const footerLinks: Record<string, FooterLink[]> = {
    [t('footer.cols.Solutions')]: [
      { label: isAr ? 'التخزين' : 'Storage', to: '/solutions' },
      { label: isAr ? 'التغليف' : 'Packing', to: '/solutions' },
      { label: isAr ? 'الشحن والتوصيل' : 'Shipping & Delivery', to: '/solutions' },
      { label: isAr ? 'المتابعة اللحظية' : 'Real-time Tracking', to: '/solutions' },
      { label: isAr ? 'المتاجر السحابية' : 'Cloud Stores', to: '/solutions' },
    ],
    [t('footer.cols.Company')]: [
      { label: isAr ? 'من نحن' : 'About us', to: '/about' },
      { label: isAr ? 'المهمة والرؤية' : 'Mission & Vision', to: '/about' },
      { label: isAr ? 'القطاعات التي نخدمها' : 'Industries served', to: '/solutions' },
      { label: isAr ? 'المصادر' : 'Resources', to: '/resources' },
    ],
    [t('footer.cols.Resources')]: [
      { label: isAr ? 'الأسئلة الشائعة' : 'FAQ', to: '/resources' },
      { label: isAr ? 'التسعير' : 'Pricing', to: '/pricing' },
      { label: isAr ? 'مركز المساعدة' : 'Help center', to: '/resources' },
      { label: isAr ? 'الخصوصية' : 'Privacy', to: '/resources#privacy' },
      { label: isAr ? 'الشروط' : 'Terms', to: '/resources#terms' },
    ],
    [t('footer.cols.Contact')]: [
      { label: isAr ? 'اطلب عرض سعر' : 'Get a quote', to: '/contact' },
      { label: isAr ? 'تحدث مع المبيعات' : 'Talk to sales', to: '/contact' },
      { label: isAr ? 'واتساب' : 'WhatsApp', to: 'https://wa.me/966500000000' },
      { label: 'support@faccess.co', to: 'mailto:support@faccess.co' },
    ],
  };

  // Subtle "slide on hover" feedback on every link so the column feels alive.
  const linkClass =
    'inline-flex items-center gap-1.5 text-sm text-[#8a8a9a] hover:text-[#F4F4F1] transition-all duration-200 rtl:flex-row-reverse hover:translate-x-0.5 rtl:hover:-translate-x-0.5';
  const renderLink = ({ label, to }: FooterLink) =>
    to.startsWith('/') ? (
      <Link to={to} className={linkClass}>
        <span className="opacity-0 -translate-x-1 transition-all duration-200 group-hover/li:opacity-60 group-hover/li:translate-x-0 rtl:translate-x-1 rtl:group-hover/li:-translate-x-0 text-fa-orange-soda">›</span>
        <span>{label}</span>
      </Link>
    ) : (
      <a href={to} className={linkClass}>
        <span className="opacity-0 -translate-x-1 transition-all duration-200 group-hover/li:opacity-60 group-hover/li:translate-x-0 rtl:translate-x-1 rtl:group-hover/li:-translate-x-0 text-fa-orange-soda">›</span>
        <span>{label}</span>
      </a>
    );

  return (
    <footer className="bg-fa-liberty-blue pt-24 pb-10 relative overflow-hidden">
      {/* No ribbon here — the CTA above is the pattern moment.
          Footer stays quiet: just the giant FAST ACCESS watermark + links. */}
      {/* Background watermark */}
      <div
        className="absolute bottom-0 right-0 font-display font-bold pointer-events-none select-none leading-none tracking-[-0.04em]"
        style={{
          fontSize: 'clamp(140px, 18vw, 260px)',
          color: 'rgba(244,244,241,0.04)',
          transform: 'translate(4%, 22%)',
        }}
      >
        FAST&nbsp;ACCESS
      </div>

      <div className="container-main relative z-10">
        {/* Top section */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Logo & Description */}
          <div className="col-span-2">
            <BrandLogo variant="full" mode="dark" height={56} />
            <div className="font-display mt-5 text-base text-fa-classic-chalk font-semibold tracking-[-0.01em] inline-flex items-center gap-2.5">
              <span
                className="w-1.5 h-1.5 rounded-full bg-fa-orange-soda inline-block"
                style={{ animation: 'fa-hero-pulse 2s ease-in-out infinite' }}
                aria-hidden
              />
              {t('footer.tagline')}
            </div>
            <p className="font-body mt-3 text-sm text-fa-classic-chalk/55 leading-[1.65] max-w-[320px]">
              {t('footer.body')}
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([header, links]) => (
            <div key={header}>
              <div className="text-xs font-semibold text-[#F4F4F1] uppercase tracking-[0.08em] mb-4">
                {header}
              </div>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label} className="group/li">{renderLink(link)}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="my-12 h-px bg-[rgba(244,244,241,0.1)]" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-[13px] text-[#8a8a9a]">
            {t('footer.copyright')}
          </div>
          <div className="flex items-center gap-6">
            {[
              { label: isAr ? 'الخصوصية' : 'Privacy', to: '/resources#privacy' },
              { label: isAr ? 'الشروط' : 'Terms', to: '/resources#terms' },
              { label: isAr ? 'الأمان' : 'Security', to: '/resources#security' },
              { label: isAr ? 'ملفات الارتباط' : 'Cookies', to: '/resources#cookies' },
            ].map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="text-[13px] text-[#8a8a9a] hover:text-[#F4F4F1] transition-colors duration-150"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
