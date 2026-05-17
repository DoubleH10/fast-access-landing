// site/utils.jsx — small primitives shared across the page
const { useState, useEffect, useRef } = React;

const ArrowRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 5l7 7-7 7"/>
  </svg>
);

const ChevronDown = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 9 6 6 6-6"/>
  </svg>
);

function Button({ variant = "primary", arrow = true, children, onClick, size }) {
  if (variant === "ghost") {
    return <button className="btn btn--ghost" onClick={onClick}>{children}</button>;
  }
  return (
    <button className={`btn btn--${variant}`} onClick={onClick}>
      <span className="btn-label">{children}</span>
      {arrow && <span className="btn-arrow"><ArrowRight /></span>}
    </button>
  );
}

function LogoMark({ size = 30 }) {
  return (
    <img
      src="assets/logo-mark.png"
      alt="Fast Access"
      style={{ width: size, height: "auto", display: "block" }}
    />
  );
}

function Brand({ size = 30 }) {
  return (
    <a href="#top" className="brand">
      <LogoMark size={size} />
      <span className="brand-word">FAST&nbsp;ACCESS</span>
    </a>
  );
}

// 3D-isometric package icon, used inside the hero animation and journey marker
function PackageIcon({ accent = "#F15B41", dark = "#0D1232" }) {
  return (
    <svg viewBox="0 0 100 100" fill="none">
      <defs>
        <linearGradient id="pkgTop" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%"  stopColor="#f3e6d4"/>
          <stop offset="100%" stopColor="#d4c4ac"/>
        </linearGradient>
        <linearGradient id="pkgLeft" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%"  stopColor="#b9a987"/>
          <stop offset="100%" stopColor="#8b7c5e"/>
        </linearGradient>
        <linearGradient id="pkgRight" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%"  stopColor="#a89876"/>
          <stop offset="100%" stopColor="#776a4e"/>
        </linearGradient>
      </defs>
      {/* top */}
      <path d="M50 12 L88 30 L50 48 L12 30 Z" fill="url(#pkgTop)"/>
      {/* left */}
      <path d="M12 30 L50 48 L50 88 L12 70 Z" fill="url(#pkgLeft)"/>
      {/* right */}
      <path d="M88 30 L50 48 L50 88 L88 70 Z" fill="url(#pkgRight)"/>
      {/* orange tape (top X) */}
      <path d="M50 12 L50 48" stroke={accent} strokeWidth="3"/>
      <path d="M30 21 L70 39" stroke={accent} strokeWidth="2.5" opacity="0.85"/>
      {/* orange tape running down front */}
      <path d="M50 48 L50 88" stroke={accent} strokeWidth="2.5"/>
      {/* small label */}
      <rect x="58" y="60" width="22" height="10" fill={accent} opacity="0.85"/>
    </svg>
  );
}

// expose to other Babel scripts via the window
Object.assign(window, {
  ArrowRight, ChevronDown, Button, LogoMark, Brand, PackageIcon,
});
