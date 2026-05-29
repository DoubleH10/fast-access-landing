/**
 * KickerBar — editorial marquee between WhatIsFA and Services. Big display
 * type that scrolls "Store ★ Pack ★ Ship ★ Track ★ Deliver" continuously,
 * with a slowly spinning orange star between verbs. Pauses on hover, reverses
 * under RTL, no animation under prefers-reduced-motion.
 *
 * Direct port of the design's <KickerBar/> — the "brand moment" of the page.
 */

import { useT } from '../i18n/I18nContext';

const verbsByLocale: Record<'en' | 'ar', string[]> = {
  en: ['Store', 'Pack', 'Ship', 'Track', 'Deliver'],
  ar: ['تخزين', 'تجهيز', 'شحن', 'تتبع', 'توصيل'],
};

function Star() {
  return (
    <svg
      className="fa-kicker-star"
      viewBox="0 0 24 24"
      width={56}
      height={56}
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 1.5 13.85 9.21 21.5 11.05 14.61 14.91 16.04 22.66 12 18 7.96 22.66 9.39 14.91 2.5 11.05 10.15 9.21Z" />
    </svg>
  );
}

export default function KickerBar() {
  const { locale } = useT();
  const verbs = verbsByLocale[locale];
  // Two identical sets so the linear-scroll animation can loop seamlessly.
  const sets = [0, 1];

  return (
    <section className="fa-kicker-bar" aria-hidden>
      <div className="fa-kicker-track">
        {sets.map((s) => (
          <div key={s} className="fa-kicker-item">
            {verbs.map((v, i) => (
              <span key={`${s}-${i}`} className="fa-kicker-item">
                {v}
                <Star />
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
