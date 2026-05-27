/**
 * Ribbon — the Fast Access signature motif (stepped lane → track), drawn as
 * inline SVG so it stays crisp at any size and recolours with `color`.
 * Derived from brand Pattern 1. Use as a section divider seam or as the
 * connector line in the logistics-journey steps.
 *
 *   <Ribbon className="text-fa-orange-soda/30 w-full h-10" />
 *   <Ribbon lanes={2} className="text-fa-blue-rose/20 …" />
 */

interface Props {
  /** number of stacked parallel lanes (1 = single line, 2 = ribbon pair) */
  lanes?: 1 | 2;
  strokeWidth?: number;
  className?: string;
}

export default function Ribbon({ lanes = 1, strokeWidth = 2, className = '' }: Props) {
  // Stepped centerline across a 240×60 box: low track, smooth S-step up, high track.
  const path = 'M0 44 H84 C100 44 100 44 108 32 C116 20 116 20 132 20 H240';
  return (
    <svg
      viewBox="0 0 240 60"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden
      className={className}
    >
      <path d={path} stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      {lanes === 2 && (
        <path
          d="M0 54 H92 C108 54 108 54 116 42 C124 30 124 30 140 30 H240"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          opacity={0.55}
        />
      )}
    </svg>
  );
}
