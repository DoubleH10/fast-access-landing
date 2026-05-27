/**
 * Expand — new-PPT slide 9. "Scale without second-guessing." Six benefits as a
 * light, borderless icon grid (no boxed cards) so it reads differently from the
 * Services section.
 */

import { Clock, Warehouse, Users, Tag, LayoutDashboard, Headphones } from 'lucide-react';
import SectionChip from '../components/brand/SectionChip';
import Reveal from '../components/Reveal';
import { useT } from '../i18n/I18nContext';
import { content } from '../i18n/content';

interface Item { title: string; body: string }
const icons = [Clock, Warehouse, Users, Tag, LayoutDashboard, Headphones];

export default function Expand() {
  const { t, locale } = useT();
  const items = content[locale].expand.items as readonly Item[];

  return (
    <section className="relative bg-fa-cream section-padding overflow-hidden">
      <div className="container-main relative z-10">
        <div className="max-w-[760px] text-left rtl:text-right">
          <Reveal className="mb-5"><SectionChip>{t('expand.chip')}</SectionChip></Reveal>
          <Reveal delay={80}>
            <h2 className="font-display font-bold text-[30px] sm:text-[38px] lg:text-[48px] text-fa-liberty-blue leading-[1.08] tracking-[-0.02em]">
              {t('expand.headlineA')}{' '}
              <span className="text-fa-orange-soda">{t('expand.headlineHighlight')}</span>
              {t('expand.headlineB')}
            </h2>
          </Reveal>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10 mt-14">
          {items.map((it, i) => {
            const Icon = icons[i];
            return (
              <Reveal key={i} delay={i * 70} className="group text-left rtl:text-right">
                <span className="fa-iconchip">
                  <Icon size={22} strokeWidth={1.8} />
                </span>
                <h3 className="font-display mt-5 text-[19px] lg:text-[21px] font-semibold text-fa-liberty-blue tracking-[-0.01em] transition-colors duration-300 group-hover:text-fa-orange-soda">{it.title}</h3>
                <p className="font-body mt-2 text-[15px] text-fa-ink-muted leading-[1.6] max-w-[340px]">{it.body}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
