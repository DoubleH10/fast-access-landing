# Fast Access — Website UI Kit

Pixel-aimed recreation of the Fast Access marketing site, based on the Brandbook 51 reference frame in the official Figma file. This is a presentational kit — not production code.

**Files**

- `index.html` — interactive demo page (homepage)
- `Header.jsx` — announcement bar + sticky nav with logo, links, log in, contact us CTA
- `Hero.jsx` — eyebrow chip + stacked headline + body + CTA + image card w/ floating timeline
- `TrustStrip.jsx` — "Trusted by leading e-Commerce Brands" + logo row
- `ProcessSection.jsx` — dark Liberty Blue band with 3 "We \_\_\_ Your \_\_\_" cards
- `MovingPackage.jsx` — the signature scroll-driven package indicator (right edge)
- `Button.jsx` — primary CTA with orange arrow tile

**Conventions**

- All colors and spacing pull from `../../colors_and_type.css` via CSS vars.
- Icons from Lucide via CDN (flagged substitution).
- React 18 + Babel inline. One global `window.FA` namespace shares components across script tags.

Open `index.html` to view.
