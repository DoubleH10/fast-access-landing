/**
 * BrandLogo — official Fast Access logo (brandmark + wordmark).
 * Inline SVG so we can recolor by CSS currentColor and avoid extra HTTP requests.
 *
 * Source: Brand Guideline - Fast Access.pdf, Logo section.
 * Geometry: angular hexagonal "package box" + "FA" flag silhouette on top.
 */

interface Props {
  variant?: 'horizontal' | 'stacked' | 'mark';
  /** Mode: light = navy mark on transparent, dark = white mark on transparent */
  mode?: 'light' | 'dark';
  className?: string;
  height?: number | string;
  showTagline?: boolean;
}

export default function BrandLogo({
  variant = 'horizontal',
  mode = 'light',
  className,
  height = 36,
  showTagline = false,
}: Props) {
  const navy = mode === 'light' ? '#0D1232' : '#F4F4F1';
  const orange = '#F15B41';
  const textColor = mode === 'light' ? '#0D1232' : '#F4F4F1';

  // Compact mark (hexagonal box + flag) — drawn to viewBox 60x60
  const Mark = (
    <g>
      {/* Orange flag detail on top */}
      <path d="M 8 12 L 22 12 L 24 18 L 10 18 Z" fill={orange} />
      <path d="M 26 12 L 30 12 L 32 18 L 28 18 Z" fill={orange} />
      {/* Hexagonal box body */}
      <path
        d="M 30 14 L 50 24 L 50 44 L 30 54 L 10 44 L 10 24 Z"
        fill={navy}
      />
      {/* Diamond inset to suggest box opening / "A" letter shape */}
      <path
        d="M 38 30 L 44 34 L 38 38 L 32 34 Z"
        fill={mode === 'light' ? '#F4F4F1' : '#0D1232'}
      />
    </g>
  );

  if (variant === 'mark') {
    return (
      <svg viewBox="0 0 60 60" height={height} className={className} aria-label="Fast Access">
        {Mark}
      </svg>
    );
  }

  if (variant === 'stacked') {
    return (
      <svg viewBox="0 0 160 140" height={height} className={className} aria-label="Fast Access">
        <g transform="translate(50,0)">{Mark}</g>
        <text
          x="80"
          y="92"
          textAnchor="middle"
          fontFamily="'Clash Grotesk', 'Geist', sans-serif"
          fontSize="22"
          fontWeight="700"
          letterSpacing="0.04em"
          fill={textColor}
        >
          FAST
        </text>
        <text
          x="80"
          y="116"
          textAnchor="middle"
          fontFamily="'Clash Grotesk', 'Geist', sans-serif"
          fontSize="22"
          fontWeight="700"
          letterSpacing="0.04em"
          fill={textColor}
        >
          ACCESS
        </text>
        {showTagline && (
          <text
            x="80"
            y="134"
            textAnchor="middle"
            fontFamily="'Inter Display', sans-serif"
            fontSize="7"
            fontWeight="600"
            letterSpacing="0.18em"
            fill={textColor}
            opacity="0.7"
          >
            LOGISTICS SERVICES
          </text>
        )}
      </svg>
    );
  }

  // horizontal lockup
  return (
    <svg
      viewBox={showTagline ? '0 0 280 72' : '0 0 280 60'}
      height={height}
      className={className}
      aria-label="Fast Access"
    >
      {Mark}
      <text
        x="68"
        y="40"
        fontFamily="'Clash Grotesk', 'Geist', sans-serif"
        fontSize="26"
        fontWeight="700"
        letterSpacing="0.02em"
        fill={textColor}
      >
        FAST ACCESS
      </text>
      {showTagline && (
        <text
          x="68"
          y="58"
          fontFamily="'Inter Display', sans-serif"
          fontSize="8"
          fontWeight="600"
          letterSpacing="0.22em"
          fill={textColor}
          opacity="0.7"
        >
          LOGISTICS SERVICES
        </text>
      )}
    </svg>
  );
}
