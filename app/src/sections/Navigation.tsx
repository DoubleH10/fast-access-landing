import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import BrandLogo from '../components/brand/BrandLogo';
import BrandButton from '../components/brand/BrandButton';

// Nav IA per PPT slide 20 footer + slide 18 FAQ entry point
const navLinks = [
  { label: 'Solutions', href: '#services' },
  { label: 'Journey', href: '#platform' },
  { label: 'Network', href: '#network' },
  { label: 'Pricing', href: '#pricing' },
];

const resourceLinks = ['About us', 'Mission & Vision', 'FAQ', 'Blog', 'Contact'];

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
        backgroundColor: scrolled ? 'rgba(244,244,241,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        boxShadow: scrolled ? '0 1px 0 0 rgba(13,18,50,0.06)' : 'none',
      }}
    >
      <div className="container-main flex items-center justify-between h-16 lg:h-20">
        {/* Logo */}
        <a href="#" className="flex items-center group">
          <BrandLogo
            variant="horizontal"
            mode={scrolled ? 'light' : 'dark'}
            height={32}
          />
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
              <span className="group-hover:text-[#F15B41] transition-colors duration-200">
                {link.label}
              </span>
              <span
                className="absolute -bottom-1 left-0 w-full h-px origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-out"
                style={{ backgroundColor: '#F15B41' }}
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
              <span className="group-hover:text-[#F15B41] transition-colors duration-200">Resources</span>
              <ChevronDown
                size={14}
                className="transition-transform duration-200 group-hover:text-[#F15B41]"
                style={{ transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
              />
            </button>
            {dropdownOpen && (
              <div
                className="absolute top-full left-0 mt-2 w-48 py-2 rounded-lg shadow-lg border border-[#e8e8e8] overflow-hidden"
                style={{
                  backgroundColor: scrolled ? 'rgba(244,244,241,0.98)' : 'rgba(13,18,50,0.98)',
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
                      (e.target as HTMLElement).style.color = scrolled ? '#0D1232' : '#ffffff';
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
            className="text-sm font-medium transition-colors duration-200 hover:text-[#F15B41]"
            style={{ color: scrolled ? '#6b6b7b' : 'rgba(255,255,255,0.8)' }}
          >
            Log in
          </a>
          <BrandButton variant={scrolled ? 'filled' : 'on-dark'} href="#quote">
            Get a quote
          </BrandButton>
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
                backgroundColor: scrolled ? '#0D1232' : '#ffffff',
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
            backgroundColor: scrolled ? 'rgba(244,244,241,0.98)' : 'rgba(13,18,50,0.98)',
            backdropFilter: 'blur(16px)',
            borderColor: scrolled ? '#e8e8e8' : 'rgba(255,255,255,0.1)',
          }}
        >
          <div className="container-main py-6 flex flex-col gap-4">
            {[...navLinks, { label: 'Resources', href: '#' }].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-base font-medium transition-colors hover:text-[#F15B41]"
                style={{ color: scrolled ? '#0D1232' : '#ffffff' }}
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
              <BrandButton
                variant={scrolled ? 'filled' : 'on-dark'}
                href="#quote"
              >
                Get a quote
              </BrandButton>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
