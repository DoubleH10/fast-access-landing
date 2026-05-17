// site/end.jsx — Coverage, Pricing, Testimonial, CTA, Footer

function CoverageMap() {
  // approximate city positions on the SVG viewBox (1000x500) — abstract world map
  const cities = [
    { x: 175, y: 230, label: "San Francisco", hub: true },
    { x: 235, y: 215, label: "Dallas",        hub: false },
    { x: 290, y: 200, label: "Chicago",       hub: true },
    { x: 320, y: 220, label: "New York",      hub: true },
    { x: 250, y: 270, label: "Atlanta",       hub: false },
    { x: 470, y: 180, label: "London",        hub: true },
    { x: 510, y: 195, label: "Berlin",        hub: false },
    { x: 540, y: 215, label: "Istanbul",      hub: false },
    { x: 580, y: 245, label: "Dubai",         hub: true },
    { x: 720, y: 235, label: "Mumbai",        hub: false },
    { x: 800, y: 245, label: "Singapore",     hub: true },
    { x: 830, y: 215, label: "Shanghai",      hub: true },
    { x: 870, y: 195, label: "Tokyo",         hub: true },
    { x: 215, y: 340, label: "São Paulo",     hub: false },
    { x: 555, y: 365, label: "Cape Town",     hub: false },
    { x: 870, y: 380, label: "Sydney",        hub: true },
  ];
  const hubs = cities.filter(c => c.hub);
  // sparse network of routes — curve from hub to hub
  // hubs (indices in `hubs` array, derived from filter above):
  //   0 SF, 1 Chicago, 2 NYC, 3 London, 4 Dubai, 5 Singapore, 6 Shanghai, 7 Tokyo, 8 Sydney
  const routes = [
    [hubs[0], hubs[1]], [hubs[1], hubs[2]], [hubs[2], hubs[3]],
    [hubs[3], hubs[4]], [hubs[4], hubs[5]], [hubs[5], hubs[6]],
    [hubs[6], hubs[7]], [hubs[5], hubs[8]], [hubs[0], hubs[7]],
    [hubs[3], hubs[2]], [hubs[4], hubs[3]],
  ];
  const softRoutes = [
    [cities[0], cities[1]], [cities[1], cities[4]], [cities[4], cities[3]],
    [cities[5], cities[6]], [cities[9], cities[10]], [cities[11], cities[12]],
    [cities[13], cities[8]], [cities[14], cities[8]], [cities[15], cities[10]],
  ];

  function arcPath(a, b) {
    const mx = (a.x + b.x) / 2;
    const my = (a.y + b.y) / 2 - Math.abs(b.x - a.x) * 0.15;
    return `M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`;
  }

  // dotted background grid of small dots (continent stand-in)
  const bgDots = [];
  for (let y = 60; y < 460; y += 22) {
    for (let x = 80; x < 940; x += 22) {
      // skip random regions to suggest landmasses
      const noise = Math.sin(x * 0.013) + Math.cos(y * 0.017) + Math.sin((x + y) * 0.009);
      if (noise > 0.6) bgDots.push([x, y]);
    }
  }

  return (
    <div className="coverage-map">
      <svg viewBox="0 0 1000 500" preserveAspectRatio="xMidYMid meet">
        {bgDots.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="1.4" className="map-dot"/>
        ))}
        {softRoutes.map((r, i) => (
          <path key={`s-${i}`} d={arcPath(r[0], r[1])} className="map-route map-route--soft"/>
        ))}
        {routes.map((r, i) => (
          <path key={`r-${i}`} d={arcPath(r[0], r[1])} className="map-route"/>
        ))}
        {cities.map((c, i) => c.hub ? (
          <g key={`c-${i}`}>
            <circle cx={c.x} cy={c.y} r="4" className="map-hub"/>
            <circle cx={c.x} cy={c.y} r="4" className="map-hub-ring"/>
          </g>
        ) : (
          <circle key={`c-${i}`} cx={c.x} cy={c.y} r="2.5" className="map-dot" fill="rgba(255,255,255,0.45)"/>
        ))}
      </svg>
    </div>
  );
}

function Coverage() {
  return (
    <section className="coverage" id="coverage" data-screen-label="Network">
      <div className="container container--wide coverage-inner">
        <div className="coverage-header">
          <div>
            <div className="section-label on-dark">The network</div>
            <h2>One network. <em>Every market.</em></h2>
          </div>
          <p>Hubs across North America, Europe, the Middle East, and Asia-Pacific. Local lanes, regional dispatch, zero handoffs you can feel.</p>
        </div>
        <CoverageMap />
        <div className="coverage-stats">
          <div className="coverage-stat"><div className="num">42<sup>+</sup></div><div className="lbl">Fulfillment centers</div></div>
          <div className="coverage-stat"><div className="num">96<sup>%</sup></div><div className="lbl">US population reached in 2 days</div></div>
          <div className="coverage-stat"><div className="num">11</div><div className="lbl">Carrier integrations</div></div>
          <div className="coverage-stat"><div className="num">24<sup>/7</sup></div><div className="lbl">Operations support</div></div>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const tiers = [
    {
      name: "Starter",
      currency: "$", price: "499", per: "/ mo",
      desc: "For brands shipping their first thousand orders a month. Stand up the platform in days, not quarters.",
      feats: ["Up to 1,000 orders / mo", "2 fulfillment centers", "Standard SLAs", "Email support", "Live tracking pages"],
      cta: "Start free trial",
      popular: false,
    },
    {
      name: "Growth", currency: "$", price: "1,899", per: "/ mo",
      desc: "For scaling operations that need national reach, faster lanes, and the unboxing experience to match.",
      feats: ["Up to 25,000 orders / mo", "8 fulfillment centers", "Priority SLAs + carrier savings", "Dedicated CSM", "Custom unboxing", "API + webhooks"],
      cta: "Talk to sales",
      popular: true,
    },
    {
      name: "Enterprise", currency: "", price: "Custom", per: "",
      desc: "For high-volume operations with dedicated lanes, custom integrations, and bespoke SLAs.",
      feats: ["Unlimited volume", "Full network access", "Custom SLAs + contracts", "24/7 named support", "Dedicated facility space", "VPC &amp; SSO"],
      cta: "Contact us",
      popular: false,
    },
  ];
  return (
    <section className="pricing" id="pricing" data-screen-label="Pricing">
      <div className="container">
        <div className="pricing-header">
          <div className="section-label" style={{ justifyContent: "center", display: "inline-flex" }}>Plans &amp; pricing</div>
          <h2>One platform. Three ways to <em>scale</em>.</h2>
          <p>No long-term contracts. No per-pick fees. Pay for the volume you ship — across every facility in the network.</p>
        </div>
        <div className="pricing-grid">
          {tiers.map((t, i) => (
            <div key={i} className={`price-card ${t.popular ? "popular" : ""}`}>
              {t.popular && <span className="price-tag">Most popular</span>}
              <div className="price-name">{t.name}</div>
              <div className="price-amount">
                {t.currency && <span className="currency">{t.currency}</span>}
                <span className="num">{t.price}</span>
                {t.per && <span className="per">{t.per}</span>}
              </div>
              <p className="price-desc">{t.desc}</p>
              <ul className="price-feats">
                {t.feats.map((f, j) => (<li key={j} dangerouslySetInnerHTML={{ __html: f }} />))}
              </ul>
              <div className="price-cta">
                <Button variant={t.popular ? "accent" : "primary"} arrow={!t.popular}>{t.cta}</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonial() {
  return (
    <section className="testimonial" id="testimonial">
      <div className="container testimonial-inner">
        <p className="testimonial-quote">
          "Fast Access did in eight weeks what our 3PL hadn't managed in two years. <span className="accent">Our shipping costs fell 22%</span> and our customers actually got their packages on time."
        </p>
        <div className="testimonial-author">
          <div className="avatar"/>
          <div className="meta">
            <div className="name">Olivia Martin</div>
            <div className="role">Head of Operations, Northwind Apparel</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BigCTA() {
  return (
    <section className="cta" id="cta">
      <div className="pattern-drift pattern-drift--slow" style={{ top: "20%" }} aria-hidden="true"/>
      <div className="pattern-drift pattern-drift--reverse" style={{ bottom: "20%" }} aria-hidden="true"/>
      <div className="container cta-inner">
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
          <span className="eyebrow eyebrow--on-dark">Ready when you are</span>
        </div>
        <h2>Ship faster. <em>Today.</em></h2>
        <p>Move your operations to a network that actually moves. Go live in 14 days.</p>
        <div className="cta-actions" style={{ justifyContent: "center", display: "inline-flex" }}>
          <Button variant="accent">Get a quote</Button>
          <Button variant="ghost"><span className="on-dark-ghost" style={{ color: "#fff" }}>Book a tour</span></Button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Brand />
            <p>Fast Access is a tech-driven logistics company built to move businesses forward — connecting storage, fulfillment, and delivery through speed, precision, and innovation.</p>
          </div>
          <div className="footer-col">
            <div className="footer-col-title">Platform</div>
            <ul>
              <li><a href="#">Dashboard</a></li>
              <li><a href="#">Shipments</a></li>
              <li><a href="#">Inventory</a></li>
              <li><a href="#">Analytics</a></li>
              <li><a href="#">API</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <div className="footer-col-title">Services</div>
            <ul>
              <li><a href="#">Fulfillment</a></li>
              <li><a href="#">Warehousing</a></li>
              <li><a href="#">Shipping</a></li>
              <li><a href="#">Returns</a></li>
              <li><a href="#">Unboxing</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <div className="footer-col-title">Company</div>
            <ul>
              <li><a href="#">About</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Press</a></li>
              <li><a href="#">Newsroom</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <div className="footer-col-title">Resources</div>
            <ul>
              <li><a href="#">Documentation</a></li>
              <li><a href="#">Status</a></li>
              <li><a href="#">Help center</a></li>
              <li><a href="#">Security</a></li>
              <li><a href="#">Privacy</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-wordmark">FAST&nbsp;ACCESS</div>
        <div className="footer-bottom">
          <span>© 2026 Fast Access Logistics, Inc.</span>
          <div className="footer-bottom-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Security</a>
            <a href="#">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Coverage, Pricing, Testimonial, BigCTA, Footer });
