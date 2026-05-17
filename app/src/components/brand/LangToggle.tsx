import { useT } from '../../i18n/I18nContext';

/**
 * EN | AR toggle. Persists via localStorage in the i18n context.
 * Renders adaptively on light/dark backgrounds via the `tone` prop.
 */
export default function LangToggle({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const { locale, setLocale } = useT();
  const baseText = tone === 'dark' ? 'text-fa-classic-chalk/70' : 'text-fa-ink-muted';
  const activeText = tone === 'dark' ? 'text-fa-classic-chalk' : 'text-fa-liberty-blue';
  return (
    <div className={`inline-flex items-center gap-1 font-body text-[12px] font-semibold uppercase tracking-[0.08em] ${baseText}`}>
      <button
        type="button"
        onClick={() => setLocale('en')}
        className={`px-1.5 py-1 transition-colors ${locale === 'en' ? activeText : 'hover:' + activeText}`}
      >
        EN
      </button>
      <span className="opacity-40">/</span>
      <button
        type="button"
        onClick={() => setLocale('ar')}
        className={`px-1.5 py-1 transition-colors ${locale === 'ar' ? activeText : 'hover:' + activeText}`}
      >
        AR
      </button>
    </div>
  );
}
