/**
 * BrandButton — Fast Access signature button (brandbook pg 55).
 * Navy body + attached orange square containing a white arrow on the right.
 */

import { ArrowRight } from 'lucide-react';
import type { ComponentProps, ReactNode } from 'react';

type Variant = 'filled' | 'outline' | 'on-dark';

interface Props extends ComponentProps<'button'> {
  variant?: Variant;
  href?: string;
  children: ReactNode;
  arrow?: boolean;
}

export default function BrandButton({
  variant = 'filled',
  href,
  children,
  arrow = true,
  className = '',
  ...rest
}: Props) {
  const classes = `btn-brand btn-brand--${variant} ${className}`.trim();
  const content = (
    <>
      <span className="btn-brand__label">{children}</span>
      {arrow && (
        <span className="btn-brand__arrow" aria-hidden>
          <ArrowRight size={14} strokeWidth={2.4} />
        </span>
      )}
    </>
  );
  if (href) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    );
  }
  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  );
}
