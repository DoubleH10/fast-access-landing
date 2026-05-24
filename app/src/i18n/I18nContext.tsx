/**
 * Tiny in-memory i18n with localStorage persistence. Two locales: en, ar.
 * RTL is derived automatically from locale (ar → rtl).
 *
 * Usage:
 *   const { t, locale, setLocale, dir } = useT();
 *   <h1>{t('hero.headline')}</h1>
 */

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { content, type Locale } from './content';

interface Ctx {
  locale: Locale;
  setLocale: (l: Locale) => void;
  dir: 'ltr' | 'rtl';
  t: (path: string) => string;
}

const I18nContext = createContext<Ctx | null>(null);

function lookup(obj: unknown, path: string): string {
  return path.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object' && key in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj) as string | undefined ?? path;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window === 'undefined') return 'ar';
    const saved = window.localStorage.getItem('fa-locale') as Locale | null;
    return saved === 'ar' || saved === 'en' ? saved : 'ar';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.lang = locale;
    root.dir = locale === 'ar' ? 'rtl' : 'ltr';
    window.localStorage.setItem('fa-locale', locale);
  }, [locale]);

  const value = useMemo<Ctx>(() => {
    const dict = content[locale];
    return {
      locale,
      setLocale: setLocaleState,
      dir: locale === 'ar' ? 'rtl' : 'ltr',
      t: (path: string) => lookup(dict, path),
    };
  }, [locale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useT(): Ctx {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useT must be used inside <I18nProvider>');
  return ctx;
}
