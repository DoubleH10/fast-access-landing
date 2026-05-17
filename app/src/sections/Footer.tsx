import BrandLogo from '../components/brand/BrandLogo';
import BrandPattern from '../components/brand/BrandPattern';

export default function Footer() {
  // Nav structure from PPT slide 20 footer:
  // About · Logistics solutions · Pricing · FAQ · Blog · Contact
  const footerLinks = {
    Solutions: ['Storage', 'Packing', 'Shipping & Delivery', 'Real-time Tracking', 'Cloud Stores'],
    Company: ['About us', 'Mission & Vision', 'Industries served', 'Blog'],
    Resources: ['FAQ', 'Pricing', 'Help center', 'Privacy', 'Terms'],
    Contact: ['Get a quote', 'Talk to sales', 'WhatsApp', 'support@faccess.co'],
  };

  return (
    <footer className="bg-fa-liberty-blue pt-24 pb-10 relative overflow-hidden">
      {/* Pattern 1 — brand ribbon along the top, signature finishing mark */}
      <BrandPattern
        pattern="ribbon"
        tint="orange"
        opacity={0.2}
        className="absolute top-0 -right-[10%] w-[120%] max-w-none"
        style={{ transform: 'translateY(-30%)' }}
      />
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
              The fastest partner for your business growth.
            </div>
            <p className="font-body mt-3 text-sm text-fa-classic-chalk/55 leading-[1.65] max-w-[320px]">
              Storage, packing, shipping, real-time tracking, and same-day cloud-store delivery — built around the way your business actually ships.
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
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-[#8a8a9a] hover:text-[#F4F4F1] transition-colors duration-150"
                    >
                      {link}
                    </a>
                  </li>
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
