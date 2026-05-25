import { Link } from 'react-router-dom';
import BrandLogo from '../components/brand/BrandLogo';
import { useT } from '../i18n/I18nContext';

type FooterLink = { label: string; to: string };

export default function Footer() {
  const { t } = useT();
  // Nav structure from PPT slide 20 footer:
  // About · Logistics solutions · Pricing · FAQ · Blog · Contact
  // `to`: "/route" → SPA link · "mailto:"/"http" → external · "#" → not built yet.
  const footerLinks: Record<string, FooterLink[]> = {
    Solutions: [
      { label: 'Storage', to: '/solutions' },
      { label: 'Packing', to: '/solutions' },
      { label: 'Shipping & Delivery', to: '/solutions' },
      { label: 'Real-time Tracking', to: '/solutions' },
      { label: 'Cloud Stores', to: '/solutions' },
    ],
    Company: [
      { label: 'About us', to: '/about' },
      { label: 'Mission & Vision', to: '/about' },
      { label: 'Industries served', to: '#' },
      { label: 'Blog', to: '#' },
    ],
    Resources: [
      { label: 'FAQ', to: '/resources' },
      { label: 'Pricing', to: '/pricing' },
      { label: 'Help center', to: '/resources' },
      { label: 'Privacy', to: '#' },
      { label: 'Terms', to: '#' },
    ],
    Contact: [
      { label: 'Get a quote', to: '/contact' },
      { label: 'Talk to sales', to: '/contact' },
      { label: 'WhatsApp', to: '#' },
      { label: 'support@faccess.co', to: 'mailto:support@faccess.co' },
    ],
  };

  const linkClass = 'text-sm text-[#8a8a9a] hover:text-[#F4F4F1] transition-colors duration-150';
  const renderLink = ({ label, to }: FooterLink) =>
    to.startsWith('/') ? (
      <Link to={to} className={linkClass}>{label}</Link>
    ) : (
      <a href={to} className={linkClass}>{label}</a>
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
            <div className="font-display mt-5 text-base text-fa-classic-chalk font-semibold tracking-[-0.01em]">
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
                  <li key={link.label}>{renderLink(link)}</li>
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
            © 2026 Fast Access Logistics, Inc.
          </div>
          <div className="flex items-center gap-6">
            {['Privacy', 'Terms', 'Security', 'Cookies'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-[13px] text-[#8a8a9a] hover:text-[#F4F4F1] transition-colors duration-150"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
