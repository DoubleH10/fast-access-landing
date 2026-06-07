import type { ReactNode } from 'react';
import SectionChip from './brand/SectionChip';
import BrandPattern from './brand/BrandPattern';
import RevealText from './brand/RevealText';

interface Props {
  chip?: string;
  title: ReactNode;
  sub?: string;
  /** Optional cinematic background image (navy+orange dusk). A navy scrim is
   *  layered on top so the headline stays legible in both LTR and RTL. */
  bg?: string;
}

/**
 * Navy page-hero band for inner routes. Carries the top padding needed to clear
 * the fixed AnnouncementBar + Navigation, and gives every page a clear H1.
 */
export default function PageHeader({ chip, title, sub, bg }: Props) {
  return (
    <section className="relative bg-fa-liberty-blue overflow-hidden pt-[120px] lg:pt-[150px] pb-14 lg:pb-20">
      {bg && (
        <div className="absolute inset-0" aria-hidden>
          <img
            src={bg}
            alt=""
            className="h-full w-full object-cover object-center opacity-[0.5]"
            loading="eager"
            decoding="async"
          />
          {/* Navy wash + vignette: keeps the headline readable over any frame,
              direction-agnostic so it works for both English and Arabic. */}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,18,50,0.62)_0%,rgba(13,18,50,0.82)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(130%_120%_at_50%_0%,transparent_28%,rgba(13,18,50,0.72)_100%)]" />
        </div>
      )}
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
          {typeof title === 'string' ? <RevealText stagger={55}>{title}</RevealText> : title}
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
