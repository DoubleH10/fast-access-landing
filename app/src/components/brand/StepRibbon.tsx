/**
 * StepRibbon — the Fast Access signature motif.
 *
 * Two stacked rounded parallelograms with a smooth diagonal "step" between them.
 * Derived from the logo's geometry (FA flag on top of box). Appears on every
 * brandbook divider page and across business cards, packaging, signage.
 *
 * Variants:
 *  - `solo`    — single ribbon, used as a corner accent (faint, decorative)
 *  - `outline` — line-only, hero-scale accent on dark backgrounds
 *  - `pair`    — two-bar version exactly like brandbook divider pages
 */

import type { CSSProperties } from 'react';

type Variant = 'solo' | 'outline' | 'pair';

interface Props {
  variant?: Variant;
  /** CSS color for fill (solo/pair) or stroke (outline). */
  color?: string;
  /** Opacity 0-1 */
  opacity?: number;
  /** Stroke width for outline variant */
  strokeWidth?: number;
  className?: string;
  style?: CSSProperties;
  'aria-hidden'?: boolean;
}

/**
 * Path geometry for the upper ribbon segment.
 * Coordinates tuned to match brandbook divider pages: rounded rectangle that
 * curves down on its right side to meet the lower segment.
 */
const UPPER_PATH =
  'M 0 30 L 360 30 Q 420 30 460 70 L 500 110 Q 540 150 600 150 L 1000 150 ' +
  'L 1000 90 L 600 90 Q 570 90 545 65 L 505 25 Q 470 -10 410 -10 L 0 -10 Z';

const LOWER_PATH =
  'M 0 220 L 540 220 Q 600 220 640 180 L 680 140 Q 720 100 780 100 L 1000 100 ' +
  'L 1000 160 L 780 160 Q 750 160 725 185 L 685 225 Q 650 260 590 260 L 0 260 Z';

export default function StepRibbon({
  variant = 'solo',
  color = 'currentColor',
  opacity = 0.15,
  strokeWidth = 1.5,
  className,
  style,
  'aria-hidden': ariaHidden = true,
}: Props) {
  if (variant === 'outline') {
    return (
      <svg
        viewBox="0 0 1000 280"
        preserveAspectRatio="xMidYMid meet"
        className={className}
        style={style}
        aria-hidden={ariaHidden}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeOpacity={opacity}
      >
        <path d={UPPER_PATH} />
        <path d={LOWER_PATH} />
      </svg>
    );
  }

  if (variant === 'pair') {
    return (
      <svg
        viewBox="0 0 1000 280"
        preserveAspectRatio="xMidYMid meet"
        className={className}
        style={style}
        aria-hidden={ariaHidden}
      >
        <g fill={color} fillOpacity={opacity}>
          <path d={UPPER_PATH} />
          <path d={LOWER_PATH} />
        </g>
      </svg>
    );
  }

  // solo: just the upper ribbon shape, perfect as a corner accent
  return (
    <svg
      viewBox="0 0 1000 160"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      style={style}
      aria-hidden={ariaHidden}
    >
      <path d={UPPER_PATH} fill={color} fillOpacity={opacity} />
    </svg>
  );
}

/**
 * StepRibbonGrid — tiled lattice of step-ribbon outlines, like brandbook page 70.
 * Used as a faint background pattern (Pricing card backs, packaging mockups).
 */
export function StepRibbonGrid({
  color = '#0D1232',
  opacity = 0.08,
  className,
  style,
}: Pick<Props, 'color' | 'opacity' | 'className' | 'style'>) {
  // Encoded SVG repeated via background-image at the parent
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='180' height='100' viewBox='0 0 180 100'>
    <g fill='none' stroke='${encodeURIComponent(color)}' stroke-opacity='${opacity}' stroke-width='1'>
      <path d='M 0 70 L 70 70 Q 90 70 105 55 L 130 30 Q 145 15 165 15 L 180 15'/>
      <path d='M 0 85 L 70 85 Q 90 85 105 70 L 130 45 Q 145 30 165 30 L 180 30'/>
    </g>
  </svg>`;
  const bg = `url("data:image/svg+xml;utf8,${svg.replace(/\n\s+/g, ' ').replace(/#/g, '%23')}")`;
  return (
    <div
      aria-hidden
      className={className}
      style={{ ...style, backgroundImage: bg, backgroundRepeat: 'repeat' }}
    />
  );
}
