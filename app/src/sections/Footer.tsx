import BrandLogo from '../components/brand/BrandLogo';
import StepRibbon from '../components/brand/StepRibbon';

export default function Footer() {
  const footerLinks = {
    Platform: ['Dashboard', 'Shipments', 'Inventory', 'Analytics', 'API'],
    Services: ['Fulfillment', 'Warehousing', 'Shipping', 'Returns', 'Unboxing'],
    Company: ['About', 'Careers', 'Press', 'Newsroom', 'Contact'],
    Resources: ['Documentation', 'Status', 'Help center', 'Security', 'Privacy'],
  };

  return (
    <footer className="bg-fa-liberty-blue pt-24 pb-10 relative overflow-hidden">
      {/* Subtle stepped ribbon accent */}
      <StepRibbon
        variant="outline"
        color="#F4F4F1"
        opacity={0.05}
        strokeWidth={1}
        className="pointer-events-none absolute top-1/4 right-0 w-[60%] max-w-[900px]"
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
            <BrandLogo variant="horizontal" mode="dark" height={40} showTagline />
            <p className="font-body mt-5 text-sm text-fa-classic-chalk/55 leading-[1.65] max-w-[300px]">
              Fast Access is a tech-driven logistics company built to move businesses forward — connecting storage, fulfillment, and delivery through speed, precision, and innovation.
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
