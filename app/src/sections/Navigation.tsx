import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import BrandLogo from '../components/brand/BrandLogo';
import BrandButton from '../components/brand/BrandButton';
import LangToggle from '../components/brand/LangToggle';
import ThemeToggle from '../components/brand/ThemeToggle';
import { useT } from '../i18n/I18nContext';

export default function Navigation() {
  const { t } = useT();
  const navLinks = [
    { label: t('nav.solutions'), href: '#services' },
    { label: t('nav.journey'), href: '#platform' },
    { label: t('nav.network'), href: '#network' },
    { label: t('nav.pricing'), href: '#pricing' },
  ];
  const resourceLinks = ['About us', 'Mission & Vision', 'FAQ', 'Blog', 'Contact'];
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
            mode="light"
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
              style={{ color: scrolled ? '#6b6b7b' : 'rgba(13,18,50,0.75)' }}
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
              style={{ color: scrolled ? '#6b6b7b' : 'rgba(13,18,50,0.75)' }}
            >
              <span className="group-hover:text-[#F15B41] transition-colors duration-200">{t('nav.resources')}</span>
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
                  backgroundColor: 'rgba(244,244,241,0.98)',
                  backdropFilter: 'blur(12px)',
                  animation: 'fadeIn 200ms ease-out',
                }}
              >
                {resourceLinks.map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="block px-4 py-2 text-sm transition-colors duration-150 text-[#6b6b7b]"
                    onMouseEnter={(e) => {
                      (e.target as HTMLElement).style.color = '#0D1232';
                      (e.target as HTMLElement).style.backgroundColor = 'rgba(232,232,232,0.5)';
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLElement).style.color = '#6b6b7b';
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
          <ThemeToggle tone="light" />
          <LangToggle tone="light" />
          <a
            href="#"
            className="text-sm font-medium transition-colors duration-200 hover:text-[#F15B41]"
            style={{ color: scrolled ? '#6b6b7b' : 'rgba(13,18,50,0.75)' }}
          >
            {t('nav.login')}
          </a>
          <BrandButton variant="filled" href="#quote">
            {t('nav.getQuote')}
          </BrandButton>
        </div>

        {/* Mobile menu button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? t('nav.closeMenu') : t('nav.openMenu')}
          >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-5 h-0.5 mb-1 last:mb-0 transition-all duration-200"
                style={{
                  backgroundColor: '#0D1232', // always dark for visibility
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
          <div className="lg:hidden border-t"
            style={{
              backgroundColor: 'rgba(244,244,241,0.98)',
              backdropFilter: 'blur(16px)',
              borderColor: '#e8e8e8',
            }}
          >
            <div className="container-main py-6 flex flex-col gap-4">
              {/* Add toggles at top of drawer */}
              <div className="flex items-center justify-between mb-4">
                <ThemeToggle tone="light" />
                <LangToggle tone="light" />
              </div>
              {[...navLinks, { label: t('nav.resources'), href: '#' }].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-base font-medium transition-colors hover:text-[#F15B41] text-[#0D1232]"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="flex flex-col gap-3 pt-4 border-t border-[#e8e8e8]">
                <a
                  href="#"
                  className="text-base font-medium transition-colors text-[#6b6b7b]"
                  onClick={() => setMobileOpen(false)}
                >
                  {t('nav.login')}
                </a>
                <BrandButton
                  variant="filled"
                  href="#quote"
                >
                  {t('nav.getQuote')}
                </BrandButton>
              </div>
            </div>
          </div>
        )}
    </nav>
  );
}
