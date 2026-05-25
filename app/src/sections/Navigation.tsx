import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import BrandLogo from '../components/brand/BrandLogo';
import BrandButton from '../components/brand/BrandButton';
import LangToggle from '../components/brand/LangToggle';
import { useT } from '../i18n/I18nContext';

export default function Navigation() {
  const { t } = useT();
  const navLinks = [
    { label: t('nav.solutions'), to: '/solutions' },
    { label: t('nav.pricing'), to: '/pricing' },
    { label: t('nav.resources'), to: '/resources' },
    { label: t('nav.about'), to: '/about' },
  ];
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // At the top of every page the nav sits over a dark band (hero / page header),
  // so links are light; once scrolled onto the cream bar they go dark.
  const linkColor = (isActive: boolean) =>
    isActive ? '#F15B41' : scrolled ? '#6b6b7b' : 'rgba(244,244,241,0.82)';

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
        <Link to="/" className="flex items-center group" onClick={() => setMobileOpen(false)}>
          <BrandLogo variant="horizontal" mode={scrolled ? 'light' : 'dark'} height={32} />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              className="relative text-sm font-medium transition-colors duration-200 group"
            >
              {({ isActive }) => (
                <>
                  <span
                    className="group-hover:text-[#F15B41] transition-colors duration-200"
                    style={{ color: linkColor(isActive) }}
                  >
                    {link.label}
                  </span>
                  <span
                    className="absolute -bottom-1 left-0 w-full h-px origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-out"
                    style={{ backgroundColor: '#F15B41', ...(isActive ? { transform: 'scaleX(1)' } : {}) }}
                  />
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Right side */}
        <div className="hidden lg:flex items-center gap-5">
          <LangToggle tone={scrolled ? 'light' : 'dark'} />
          <BrandButton variant="filled" href="/contact">
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
                backgroundColor: scrolled || mobileOpen ? '#0D1232' : '#FAFBFC',
                transform: mobileOpen
                  ? i === 0 ? 'rotate(45deg) translate(3px, 3px)' : i === 2 ? 'rotate(-45deg) translate(3px, -3px)' : 'none'
                  : 'none',
                opacity: mobileOpen && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="lg:hidden border-t"
          style={{
            backgroundColor: 'rgba(244,244,241,0.98)',
            backdropFilter: 'blur(16px)',
            borderColor: '#e8e8e8',
          }}
        >
          <div className="container-main py-6 flex flex-col gap-4">
            <div className="flex items-center justify-end mb-2">
              <LangToggle tone="light" />
            </div>
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                className="text-base font-medium transition-colors hover:text-[#F15B41] text-[#0D1232]"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
            <div className="pt-4 border-t border-[#e8e8e8]">
              <BrandButton variant="filled" href="/contact">
                {t('nav.getQuote')}
              </BrandButton>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
