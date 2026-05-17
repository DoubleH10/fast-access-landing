// site/header-hero.jsx
const { useEffect: useEffect_HH, useState: useState_HH, useRef: useRef_HH } = React;

function Announcement() {
  return (
    <div className="announce">
      Fast Access raises <strong>$80M</strong> from secua ventures &amp; Matrix partners
      <span className="accent">↗ Read announcement</span>
    </div>
  );
}

function Header() {
  return (
    <header className="header">
      <div className="container header-inner">
        <Brand />
        <nav className="nav">
          <a className="nav-link" href="#">Platform</a>
          <a className="nav-link" href="#services">Services</a>
          <a className="nav-link" href="#coverage">Network</a>
          <a className="nav-link" href="#pricing">Pricing</a>
          <a className="nav-link" href="#">Resources <ChevronDown /></a>
        </nav>
        <div className="header-cta">
          <Button variant="ghost" arrow={false}>Log in</Button>
          <Button variant="primary">Get a quote</Button>
        </div>
      </div>
    </header>
  );
}

function WarehouseVisual() {
  // Generative inner warehouse panel — pixel-perfect at 4:5 aspect
  // Rows of shelves with box silhouettes inside.
  const rows = [
    { y: 18, boxes: [12, 32, 56, 78] },
    { y: 35, boxes: [8, 28, 52, 72] },
    { y: 55, boxes: [16, 38, 60, 82] },
    { y: 75, boxes: [22, 44, 64, 86] },
  ];
  // highlight which box is the "tracked" one — second row, third box
  const accentRow = 1, accentBox = 2;
  return (
    <>
      <div className="warehouse-grid"/>
      <div className="warehouse-shelves">
        {rows.map((r, ri) => (
          <div key={ri} className="shelf" style={{ top: `${r.y}%` }}>
            {r.boxes.map((x, bi) => (
              <div
                key={bi}
                className={`box ${ri === accentRow && bi === accentBox ? "box--accent" : ""}`}
                style={{ left: `${x}%` }}
              />
            ))}
          </div>
        ))}
      </div>
      <svg className="hero-trail" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M 18 22 Q 60 18, 70 45 T 28 78" />
      </svg>
    </>
  );
}

function HeroLiveChip() {
  return (
    <div className="hero-live">
      <span className="dot"/>
      <span>Live · 12,408 in transit</span>
    </div>
  );
}

function HeroInfoCard() {
  return (
    <div className="hero-info">
      <div className="hero-info-row">
        <div className="hero-info-pip"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 5 5L20 7"/></svg></div>
        <div className="hero-info-lbl">Dispatched</div>
        <div className="hero-info-date">10 / 07</div>
      </div>
      <div className="hero-info-row">
        <div className="hero-info-pip"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 5 5L20 7"/></svg></div>
        <div className="hero-info-lbl">In transit</div>
        <div className="hero-info-date">12 / 07</div>
      </div>
      <div className="hero-info-row muted">
        <div className="hero-info-pip muted"/>
        <div className="hero-info-lbl">Delivery</div>
        <div className="hero-info-date">15 / 07</div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="pattern-hero-overlay" aria-hidden="true"/>
      <div className="container hero-inner">
        <div className="hero-copy">
          <div className="hero-eyebrow">
            <span className="eyebrow">Fulfillment, at the speed of click</span>
          </div>
          <h1>
            Move every package <em className="accent-word">forward.</em>
          </h1>
          <p className="hero-sub">
            A tech-driven fulfillment network that stores your inventory, picks every order, and ships it across the country — all on a single intelligent platform.
          </p>
          <div className="hero-cta-row">
            <Button variant="primary">Start shipping</Button>
            <Button variant="ghost" arrow={false}>Watch the demo &nbsp;▸</Button>
          </div>
          <div className="hero-stats">
            <div>
              <div className="hero-stat-num">99.8<sup>%</sup></div>
              <div className="hero-stat-lbl">On-time dispatch</div>
            </div>
            <div>
              <div className="hero-stat-num">2 hr</div>
              <div className="hero-stat-lbl">Average pick &amp; pack</div>
            </div>
            <div>
              <div className="hero-stat-num">42<sup>+</sup></div>
              <div className="hero-stat-lbl">Fulfillment centers</div>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <WarehouseVisual />
          <div className="hero-package">
            <PackageIcon />
          </div>
          <HeroLiveChip />
          <HeroInfoCard />
        </div>
      </div>
      <div className="scroll-cue">Scroll to see how it works</div>
    </section>
  );
}

function TrustStrip() {
  const logos = ["spotify", "slack", "Dropbox", "Webflow", "Zoom", "Coinbase"];
  return (
    <section className="trust">
      <div className="container">
        <div className="trust-lead">Trusted by leading e-commerce brands</div>
        <div className="trust-row">
          {logos.map((l, i) => (
            <div key={i} className="trust-logo">{l}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Announcement, Header, Hero, TrustStrip });
