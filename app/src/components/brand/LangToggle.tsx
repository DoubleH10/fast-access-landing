import { ChevronDown } from 'lucide-react';
import { useT } from '../../i18n/I18nContext';

/**
 * Language toggle — pill showing the current locale name + chevron, so it
 * reads as a real language selector instead of a tiny "EN | AR" pair. With
 * only two locales, a single click flips to the other. Adapts to light and
 * dark backgrounds via the `tone` prop (nav uses this when over the hero).
 */
export default function LangToggle({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const { locale, setLocale } = useT();
  const next = locale === 'en' ? 'ar' : 'en';
  const labels = { en: 'English', ar: 'العربية' } as const;

  const dark = tone === 'dark';
  const base =
    dark
      ? 'text-fa-classic-chalk/85 hover:text-fa-classic-chalk bg-white/[0.06] hover:bg-white/[0.10] ring-white/15 hover:ring-white/25'
      : 'text-fa-liberty-blue/85 hover:text-fa-liberty-blue bg-white hover:bg-white ring-fa-liberty-blue/10 hover:ring-fa-orange-soda/40';

  return (
    <button
      type="button"
      onClick={() => setLocale(next)}
      aria-label={`Switch to ${labels[next]}`}
      title={`Switch to ${labels[next]}`}
      className={`group inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-body text-[12px] font-semibold tracking-[0.02em] ring-1 transition-all duration-200 ${base}`}
    >
      <span className="inline-block w-1.5 h-1.5 rounded-full bg-fa-orange-soda" aria-hidden />
      <span>{labels[locale]}</span>
      <ChevronDown
        size={12}
        strokeWidth={2.4}
        className="transition-transform duration-200 group-hover:translate-y-0.5"
        aria-hidden
      />
    </button>
  );
}
