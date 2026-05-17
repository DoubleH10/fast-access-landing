export default function Footer() {
  const footerLinks = {
    Platform: ['Dashboard', 'Shipments', 'Inventory', 'Analytics', 'API'],
    Services: ['Fulfillment', 'Warehousing', 'Shipping', 'Returns', 'Unboxing'],
    Company: ['About', 'Careers', 'Press', 'Newsroom', 'Contact'],
    Resources: ['Documentation', 'Status', 'Help center', 'Security', 'Privacy'],
  };

  return (
    <footer className="bg-[#1a1a3e] pt-20 pb-10 relative overflow-hidden">
      {/* Background watermark */}
      <div
        className="absolute bottom-0 right-0 font-display font-black pointer-events-none select-none leading-none"
        style={{
          fontSize: 'clamp(120px, 15vw, 200px)',
          color: 'rgba(245,245,240,0.03)',
          transform: 'translate(5%, 20%)',
        }}
      >
        FAST ACCESS
      </div>

      <div className="container-main relative z-10">
        {/* Top section */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Logo & Description */}
          <div className="col-span-2">
            <div className="flex items-center gap-2.5">
              <img src="/assets/logo-mark.png" alt="Fast Access" className="h-7 w-auto opacity-80" />
              <span className="font-display font-bold text-xl text-[#f5f5f0]">
                Fast Access
              </span>
            </div>
            <p className="mt-4 text-sm text-[#8a8a9a] leading-relaxed max-w-[280px]">
              Fast Access is a tech-driven logistics company built to move businesses forward — connecting storage, fulfillment, and delivery through speed, precision, and innovation.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([header, links]) => (
            <div key={header}>
              <div className="text-xs font-semibold text-[#f5f5f0] uppercase tracking-[0.08em] mb-4">
                {header}
              </div>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-[#8a8a9a] hover:text-[#f5f5f0] transition-colors duration-150"
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
        <div className="my-12 h-px bg-[rgba(245,245,240,0.1)]" />

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
                className="text-[13px] text-[#8a8a9a] hover:text-[#f5f5f0] transition-colors duration-150"
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
