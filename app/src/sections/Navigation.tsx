import { useState, useEffect } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

const navLinks = [
  { label: 'Platform', href: '#platform' },
  { label: 'Services', href: '#services' },
  { label: 'Network', href: '#network' },
  { label: 'Pricing', href: '#pricing' },
];

const resourceLinks = ['Documentation', 'Status', 'Help center', 'Security', 'Privacy'];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className="fixed top-9 left-0 right-0 z-50 transition-all duration-300"
      style={{
        top: scrolled ? 0 : 36,
        backgroundColor: scrolled ? 'rgba(245,245,240,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        boxShadow: scrolled ? '0 1px 0 0 rgba(26,26,62,0.06)' : 'none',
      }}
    >
      <div className="container-main flex items-center justify-between h-16 lg:h-20">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <img
            src="/assets/logo-mark.png"
            alt="Fast Access"
            className="h-8 w-auto"
            style={{
              filter: scrolled ? 'none' : 'brightness(0) invert(1)',
              transition: 'filter 300ms',
            }}
          />
          <span
            className="font-display font-bold text-lg tracking-tight transition-colors duration-300"
            style={{ color: scrolled ? '#1a1a3e' : '#ffffff' }}
          >
            Fast Access
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative text-sm font-medium transition-colors duration-200 group"
              style={{ color: scrolled ? '#6b6b7b' : 'rgba(255,255,255,0.8)' }}
            >
              <span className="group-hover:text-[#ff6b35] transition-colors duration-200">
                {link.label}
              </span>
              <span
                className="absolute -bottom-1 left-0 w-full h-px origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-out"
                style={{ backgroundColor: '#ff6b35' }}
              />
            </a>
          ))}

          {/* Resources Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button
              className="flex items-center gap-1 text-sm font-medium transition-colors duration-200 group"
              style={{ color: scrolled ? '#6b6b7b' : 'rgba(255,255,255,0.8)' }}
            >
              <span className="group-hover:text-[#ff6b35] transition-colors duration-200">Resources</span>
              <ChevronDown
                size={14}
                className="transition-transform duration-200 group-hover:text-[#ff6b35]"
                style={{ transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
              />
            </button>
            {dropdownOpen && (
              <div
                className="absolute top-full left-0 mt-2 w-48 py-2 rounded-lg shadow-lg border border-[#e8e8e8] overflow-hidden"
                style={{
                  backgroundColor: scrolled ? 'rgba(245,245,240,0.98)' : 'rgba(26,26,62,0.98)',
                  backdropFilter: 'blur(12px)',
                  animation: 'fadeIn 200ms ease-out',
                }}
              >
                {resourceLinks.map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="block px-4 py-2 text-sm transition-colors duration-150"
                    style={{ color: scrolled ? '#6b6b7b' : 'rgba(255,255,255,0.7)' }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLElement).style.color = scrolled ? '#1a1a3e' : '#ffffff';
                      (e.target as HTMLElement).style.backgroundColor = scrolled ? 'rgba(232,232,232,0.5)' : 'rgba(255,255,255,0.08)';
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLElement).style.color = scrolled ? '#6b6b7b' : 'rgba(255,255,255,0.7)';
                      (e.target as HTMLElement).style.backgroundColor = 'transparent';
                    }}
                  >
                    {item}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right side */}
        <div className="hidden lg:flex items-center gap-5">
          <a
            href="#"
            className="text-sm font-medium transition-colors duration-200 hover:text-[#ff6b35]"
            style={{ color: scrolled ? '#6b6b7b' : 'rgba(255,255,255,0.8)' }}
          >
            Log in
          </a>
          <a
            href="#quote"
            className="group inline-flex items-center gap-2 px-5 py-2.5 bg-[#ff6b35] text-white text-sm font-semibold hover:bg-[#ff8c5a] transition-colors duration-200"
          >
            Get a quote
            <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
              <ArrowRight size={12} />
            </span>
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="lg:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-5 h-0.5 mb-1 last:mb-0 transition-all duration-200"
              style={{
                backgroundColor: scrolled ? '#1a1a3e' : '#ffffff',
                transform: mobileOpen
                  ? i === 0 ? 'rotate(45deg) translate(3px, 3px)' : i === 2 ? 'rotate(-45deg) translate(3px, -3px)' : 'none'
                  : 'none',
                opacity: mobileOpen && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="lg:hidden border-t"
          style={{
            backgroundColor: scrolled ? 'rgba(245,245,240,0.98)' : 'rgba(26,26,62,0.98)',
            backdropFilter: 'blur(16px)',
            borderColor: scrolled ? '#e8e8e8' : 'rgba(255,255,255,0.1)',
          }}
        >
          <div className="container-main py-6 flex flex-col gap-4">
            {[...navLinks, { label: 'Resources', href: '#' }].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-base font-medium transition-colors hover:text-[#ff6b35]"
                style={{ color: scrolled ? '#1a1a3e' : '#ffffff' }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="flex flex-col gap-3 pt-4 border-t" style={{ borderColor: scrolled ? '#e8e8e8' : 'rgba(255,255,255,0.1)' }}>
              <a
                href="#"
                className="text-base font-medium transition-colors"
                style={{ color: scrolled ? '#6b6b7b' : 'rgba(255,255,255,0.7)' }}
                onClick={() => setMobileOpen(false)}
              >
                Log in
              </a>
              <a
                href="#quote"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#ff6b35] text-white text-sm font-semibold"
                onClick={() => setMobileOpen(false)}
              >
                Get a quote
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
