import type { ReactNode } from 'react';
import SectionChip from './brand/SectionChip';
import BrandPattern from './brand/BrandPattern';

interface Props {
  chip?: string;
  title: ReactNode;
  sub?: string;
}

/**
 * Navy page-hero band for inner routes. Carries the top padding needed to clear
 * the fixed AnnouncementBar + Navigation, and gives every page a clear H1.
 */
export default function PageHeader({ chip, title, sub }: Props) {
  return (
    <section className="relative bg-fa-liberty-blue overflow-hidden pt-[120px] lg:pt-[150px] pb-14 lg:pb-20">
      <BrandPattern
        pattern="lozenge"
        tint="orange"
        opacity={0.06}
        className="absolute -top-[20%] -right-[8%] w-[45%] max-w-[640px]"
      />
      <div className="container-main relative z-10 text-left rtl:text-right">
        {chip && (
          <div className="mb-5">
            <SectionChip onDark>{chip}</SectionChip>
          </div>
        )}
        <h1 className="font-display font-bold text-[34px] sm:text-[44px] lg:text-[56px] text-fa-classic-chalk leading-[1.05] tracking-[-0.02em] max-w-[820px]">
          {title}
        </h1>
        {sub && (
          <p className="font-body mt-5 text-base lg:text-lg text-fa-classic-chalk/65 leading-[1.55] max-w-[620px]">
            {sub}
          </p>
        )}
      </div>
    </section>
  );
}
