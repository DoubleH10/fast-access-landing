/**
 * BrandLogo — official Fast Access logo from the brand design system.
 * Uses the PNG assets shipped in public/brand/ rather than synthetic SVG.
 *
 * Variants:
 *  - `horizontal` — primary inline lockup (no tagline)
 *  - `full`       — horizontal lockup with "LOGISTICS SERVICES" tagline
 *  - `mark`       — icon-only brandmark (SVG)
 *
 * Modes:
 *  - `light` — navy + orange on light backgrounds
 *  - `dark`  — white + orange flag on dark backgrounds
 *  - `mono`  — pure white (use only when orange accent would clash)
 */

interface Props {
  variant?: 'horizontal' | 'full' | 'mark';
  mode?: 'light' | 'dark' | 'mono';
  className?: string;
  height?: number | string;
}

const SOURCES = {
  'horizontal-light': '/brand/logo-horizontal-light.png',  // Logo 4
  'horizontal-dark':  '/brand/logo-horizontal-dark.png',   // Logo 3
  'horizontal-mono':  '/brand/logo-full-mono-dark.png',    // fallback
  'full-light':       '/brand/logo-horizontal-light.png',  // light has same colored lockup (no separate tagline asset)
  'full-dark':        '/brand/logo-full-dark.png',         // Logo 11
  'full-mono':        '/brand/logo-full-mono-dark.png',    // Logo 9
  'mark-light':       '/brand/logo-mark.svg',
  'mark-dark':        '/brand/logo-mark.svg',
  'mark-mono':        '/brand/logo-mark.svg',
} as const;

export default function BrandLogo({
  variant = 'horizontal',
  mode = 'light',
  className,
  height = 36,
}: Props) {
  const src = SOURCES[`${variant}-${mode}` as keyof typeof SOURCES];
  return (
    <img
      src={src}
      alt="Fast Access — Logistics Services"
      className={className}
      style={{ height, width: 'auto' }}
    />
  );
}
