/**
 * BrandButton — Fast Access signature button (brandbook pg 55).
 * Navy body + attached orange square containing a white arrow on the right.
 */

import { ArrowRight } from 'lucide-react';
import type { ComponentProps, ReactNode } from 'react';
import { Link } from 'react-router-dom';

type Variant = 'filled' | 'outline' | 'on-dark';

const variantClasses: Record<Variant, string> = {
  filled: 'btn-brand--filled',
  outline: 'btn-brand--outline',
  'on-dark': 'btn-brand--on-dark',
};

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
  const classes = `btn-brand ${variantClasses[variant]} ${className}`.trim();
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
    // Internal routes (start with "/") use SPA navigation; hash anchors and
    // external links fall back to a plain <a>.
    if (href.startsWith('/')) {
      return (
        <Link to={href} className={classes}>
          {content}
        </Link>
      );
    }
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
