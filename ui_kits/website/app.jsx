// Fast Access — UI kit components, all in one file for simplicity
const { useState, useEffect } = React;

const Arrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 5l7 7-7 7"/>
  </svg>
);

function Button({ variant = "primary", arrow = true, children, onClick }) {
  if (variant === "ghost") {
    return <button className="fa-btn fa-btn--ghost" onClick={onClick}>{children}</button>;
  }
  return (
    <button className={`fa-btn fa-btn--${variant}`} onClick={onClick}>
      <span className="fa-btn-label">{children}</span>
      {arrow && <span className="fa-btn-arrow"><Arrow /></span>}
    </button>
  );
}

function LogoMark({ size = 28, invert = false }) {
  return (
    <img
      src="../../assets/logo-mark.png"
      alt="Fast Access"
      style={{ height: size, width: "auto", display: "block", filter: invert ? "brightness(0) invert(1)" : "none" }}
    />
  );
}

function Header() {
  return (
    <header className="fa-header">
      <div className="fa-container fa-header-inner">
        <a href="#" className="fa-logo">
          <span className="fa-logo-mark"><LogoMark size={26} /></span>
          <span className="fa-logo-word">FAST ACCESS</span>
        </a>
        <span className="fa-header-divider" />
        <nav className="fa-nav">
          <a href="#">Home</a>
          <a href="#">About Us</a>
          <a href="#">Get Quote</a>
          <a href="#">E-Commerce</a>
          <a href="#">Services
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="m6 9 6 6 6-6"/></svg>
          </a>
        </nav>
        <div className="fa-header-cta">
          <Button variant="ghost" arrow={false}>Log in</Button>
          <Button variant="primary">Contact Us</Button>
        </div>
      </div>
    </header>
  );
}

function TimelineCard() {
  return (
    <div className="fa-timeline-card">
      <div className="fa-timeline-row">
        <div className="l">
          <div className="fa-timeline-pip"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 5 5L20 7"/></svg></div>
          <div className="fa-timeline-lbl">Dispatch Date</div>
        </div>
        <div className="fa-timeline-date">10/07/2025</div>
      </div>
      <div className="fa-timeline-row">
        <div className="l">
          <div className="fa-timeline-pip"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 5 5L20 7"/></svg></div>
          <div className="fa-timeline-lbl">Transit Day</div>
        </div>
        <div className="fa-timeline-date">12/07/2025</div>
      </div>
      <div className="fa-timeline-row muted">
        <div className="l">
          <div className="fa-timeline-pip muted" />
          <div className="fa-timeline-lbl">Shipping Date</div>
        </div>
        <div className="fa-timeline-date">15/07/2025</div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="fa-hero">
      <div className="fa-container fa-hero-inner">
        <div className="fa-hero-copy">
          <span className="fa-eyebrow-chip">Delivering with Care</span>
          <h1 className="fa-hero-h1">Fast Access<br/>Your unwavering<br/>e-commerce ally</h1>
          <p className="fa-hero-sub">A tech-driven fulfillment network connecting storage, picking, and delivery — moving your products forward with speed and precision.</p>
          <div><Button variant="primary">Contact Us</Button></div>
          <div style={{ marginTop: 24 }}>
            <div className="fa-trust-lead">Trusted by leading e-Commerce Brands</div>
            <div className="fa-trust-row">
              <span className="fa-trust-logo">spotify</span>
              <span className="fa-trust-logo">slack</span>
              <span className="fa-trust-logo">Dropbox</span>
              <span className="fa-trust-logo">Webflow</span>
            </div>
          </div>
        </div>
        <div className="fa-hero-img-card">
          <TimelineCard />
          <div className="fa-timeline-logo"><LogoMark size={28} color="#2D2E75" /></div>
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const cards = [
    { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>,
      title: "We Store Your Inventory", body: "Protect your cargo inventory with state-of-the-art facilities and personal warehousing solutions." },
    { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="m9 12 2 2 4-4"/></svg>,
      title: "We Process Your Orders", body: "We process your order efficiently to meet your logistics needs end-to-end." },
    { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/></svg>,
      title: "We Ship Your Packages", body: "Multi-carrier routing, fully tracked from the moment we dispatch to the moment it arrives." },
  ];
  return (
    <section className="fa-process">
      <div className="fa-container fa-process-inner">
        <div>
          <div className="fa-process-eyebrow">Our Process</div>
          <h2>How Fast Access moves your packages forward.</h2>
          <p className="fa-process-lead">Fast Access logistic support is more than a company — it's your reliable partner for efficient, innovative, and sustainable logistics success.</p>
          <Button variant="primary">Learn More</Button>
        </div>
        <div className="fa-process-cards">
          {cards.map((c, i) => (
            <div className="fa-process-card" key={i}>
              <div className="fa-process-icon">{c.icon}</div>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MovingPackage() {
  const [pct, setPct] = useState(0);
  const [label, setLabel] = useState("Receiving");
  useEffect(() => {
    const stages = [
      [0,    "Receiving"],
      [0.18, "Storage"],
      [0.36, "Picking"],
      [0.54, "Packing"],
      [0.72, "Shipping"],
      [0.92, "Delivery"],
    ];
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = Math.max(0, Math.min(1, window.scrollY / Math.max(1, h)));
      setPct(p);
      const stage = stages.reduce((acc, s) => p >= s[0] ? s : acc, stages[0]);
      setLabel(stage[1]);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fa-package">
      <div className="fa-package-track">
        <div className="fa-package-dot" style={{ top: `calc(${pct * 100}% - 7px)` }} />
      </div>
      <div className="fa-package-label">{label}</div>
    </div>
  );
}

function App() {
  return (
    <>
      <div className="fa-announce">Fast Access Raises <b>$80m</b> from secua ventures &amp; Matrix partners</div>
      <Header />
      <Hero />
      <ProcessSection />
      <MovingPackage />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
