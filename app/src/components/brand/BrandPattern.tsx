/**
 * BrandPattern — three official brand patterns (Pattern 1, 3, 5) from the
 * Fast Access brand book, derived from the logo geometry.
 *
 *  - `ribbon`     (Pattern 1)  — short stepped bar that connects to a long
 *                                horizontal track extending right. Use as a
 *                                hero corner accent, section divider, or
 *                                footer trim.
 *  - `lozenge`    (Pattern 3)  — overlapping lozenge stripe motif. Subtle
 *                                background texture for dashboard / coverage
 *                                / dense-content sections.
 *  - `isometric`  (Pattern 5)  — tilted perspective stack of ribbons.
 *                                Strong hero-side composition; the brand's
 *                                most distinctive treatment.
 *
 * Render colour by applying a CSS filter or by tinting via mix-blend-mode.
 * For navy outlines on a navy background, use opacity + a CSS filter that
 * shifts the line colour to the desired hue (or just rely on inverting via
 * filter: invert() when on dark surfaces).
 */

import type { CSSProperties } from 'react';

type Pattern = 'ribbon' | 'lozenge' | 'isometric';
type Tint = 'navy' | 'white' | 'orange';

interface Props {
  pattern: Pattern;
  tint?: Tint;
  opacity?: number;
  className?: string;
  style?: CSSProperties;
}

const SRC: Record<Pattern, string> = {
  ribbon:    '/brand/patterns/pattern-1.png',
  lozenge:   '/brand/patterns/pattern-3.png',
  isometric: '/brand/patterns/pattern-5.png',
};

/**
 * The source PNGs are navy outline on transparent. Use CSS filter to recolour:
 *  - navy   → no filter (source colour)
 *  - white  → brightness(0) invert(1)
 *  - orange → hue-rotate + saturate to shift navy → orange
 */
const FILTERS: Record<Tint, string> = {
  navy:   'none',
  white:  'brightness(0) invert(1)',
  orange: 'brightness(0) saturate(100%) invert(48%) sepia(78%) saturate(2476%) hue-rotate(335deg) brightness(101%) contrast(89%)',
};

export default function BrandPattern({
  pattern,
  tint = 'navy',
  opacity = 0.18,
  className,
  style,
}: Props) {
  return (
    <img
      src={SRC[pattern]}
      alt=""
      aria-hidden
      className={className}
      style={{
        opacity,
        filter: FILTERS[tint],
        pointerEvents: 'none',
        userSelect: 'none',
        ...style,
      }}
    />
  );
}
