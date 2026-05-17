// site/middle.jsx — Stats, Services, Dashboard preview
const { useState: useState_M, useEffect: useEffect_M } = React;

function StatsStrip() {
  return (
    <section className="stats-strip">
      <div className="container">
        <div className="stats-strip-inner">
          <div>
            <div className="section-label">By the numbers</div>
            <h2>Built for <em>operational</em> scale.</h2>
          </div>
          <div className="stats-strip-grid">
            <div className="stat-card">
              <div className="num">12<sup>M</sup></div>
              <div className="lbl">Orders shipped in 2025</div>
            </div>
            <div className="stat-card">
              <div className="num">99.99<sup>%</sup></div>
              <div className="lbl">Pick &amp; pack accuracy</div>
            </div>
            <div className="stat-card">
              <div className="num">$0.42</div>
              <div className="lbl">Avg. label savings vs. baseline</div>
            </div>
            <div className="stat-card">
              <div className="num">1.2<sup>d</sup></div>
              <div className="lbl">Avg. coast-to-coast delivery</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const SERVICES = [
  {
    num: "01", title: "Smart Fulfillment", body: "End-to-end orchestration from cart to doorstep, with intelligent routing that picks the right facility for every order.",
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="m9 12 2 2 4-4"/></svg>),
  },
  {
    num: "02", title: "Network Warehousing", body: "42 fulfillment centers, climate-controlled bays, and dedicated lanes — without the lease.",
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>),
  },
  {
    num: "03", title: "Multi-carrier Shipping", body: "Rate-shop every label across 11+ carriers in real time. Service rules you set; savings you keep.",
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/></svg>),
  },
  {
    num: "04", title: "Returns &amp; Reverse", body: "One-click returns portal for shoppers, automated grading and restocking for you. Closed-loop inventory in hours, not days.",
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 3.34-7"/><path d="M3 4v5h5"/></svg>),
  },
  {
    num: "05", title: "Inventory Intelligence", body: "Demand forecasting and replenishment alerts that look at your sales velocity, lead times, and seasonality.",
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m7 14 4-4 4 4 5-5"/></svg>),
  },
  {
    num: "06", title: "Branded Unboxing", body: "Custom inserts, packaging, and post-purchase comms that make every delivery feel intentional.",
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22V12"/><path d="M3.3 7 12 12l8.7-5"/><path d="m7.5 4.27 9 5.15"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/></svg>),
  },
];

function Services() {
  return (
    <section className="services" id="services" data-screen-label="Services">
      <div className="container">
        <div className="services-header">
          <div>
            <div className="section-label">What we do</div>
            <h2>One platform, the whole <em>back office</em>.</h2>
          </div>
          <p>From the inbound dock to the customer's doorstep — and the journey back. Every step instrumented, every decision automated, every shipment yours to see.</p>
        </div>
        <div className="services-grid">
          {SERVICES.map((s, i) => (
            <div key={i} className="service-card">
              <div className="service-num">{s.num}</div>
              <div className="service-icon">{s.icon}</div>
              <h3 className="service-title" dangerouslySetInnerHTML={{ __html: s.title }} />
              <p className="service-body" dangerouslySetInnerHTML={{ __html: s.body }} />
              <a className="service-link" href="#">Learn more <ArrowRight /></a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// === Dashboard preview ===

function DashboardChart() {
  // sparkline: 24 data points with subtle wave
  const pts = [];
  const W = 600, H = 160;
  const data = [18, 22, 19, 26, 32, 28, 34, 39, 36, 44, 50, 47, 55, 60, 56, 64, 70, 68, 76, 80, 78, 85, 92, 88];
  const max = Math.max(...data), min = Math.min(...data);
  data.forEach((v, i) => {
    const x = (i / (data.length - 1)) * W;
    const y = H - ((v - min) / (max - min)) * H;
    pts.push([x, y]);
  });
  const linePath = pts.map((p, i) => (i === 0 ? `M ${p[0]} ${p[1]}` : `L ${p[0]} ${p[1]}`)).join(" ");
  const areaPath = linePath + ` L ${W} ${H} L 0 ${H} Z`;
  return (
    <div className="dashboard-chart-canvas">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
        <defs>
          <linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#F15B41" stopOpacity="0.4"/>
            <stop offset="100%" stopColor="#F15B41" stopOpacity="0"/>
          </linearGradient>
        </defs>
        <path d={areaPath} fill="url(#chartFill)"/>
        <path d={linePath} fill="none" stroke="#F15B41" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round"/>
        {/* end dot */}
        <circle cx={pts[pts.length-1][0]} cy={pts[pts.length-1][1]} r="5" fill="#F15B41"/>
        <circle cx={pts[pts.length-1][0]} cy={pts[pts.length-1][1]} r="10" fill="#F15B41" opacity="0.25"/>
      </svg>
    </div>
  );
}

function Dashboard() {
  const orders = [
    { id: "FA-30482", customer: "Olivia Martin", status: "transit", statusLabel: "In transit", time: "12m ago" },
    { id: "FA-30481", customer: "Daniel Chen",  status: "delivered", statusLabel: "Delivered",  time: "1h ago" },
    { id: "FA-30480", customer: "Priya Reddy",   status: "transit", statusLabel: "In transit", time: "2h ago" },
    { id: "FA-30479", customer: "Marcus Webb",   status: "pending", statusLabel: "Picking",    time: "2h ago" },
    { id: "FA-30478", customer: "Sara Lindgren", status: "delivered", statusLabel: "Delivered", time: "3h ago" },
  ];
  return (
    <section className="dashboard" id="platform" data-screen-label="Platform">
      <div className="container container--wide">
        <div className="dashboard-header">
          <div className="section-label" style={{ justifyContent: "center", display: "inline-flex" }}>The Platform</div>
          <h2>One dashboard. <em>Every package</em>, always.</h2>
          <p>Real-time visibility for your operations team. Beautiful tracking pages for your customers. APIs for everyone else.</p>
        </div>
        <div className="dashboard-frame">
          <div className="dashboard-chrome">
            <span className="dot"/><span className="dot"/><span className="dot"/>
            <span className="url">app.fastaccess.io / operations</span>
          </div>
          <div className="dashboard-body">
            <aside className="dashboard-sidebar">
              <div>
                <div className="dashboard-sidebar-section">Operations</div>
                <div className="dashboard-sidebar-item active">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/></svg>
                  Dashboard
                </div>
                <div className="dashboard-sidebar-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/></svg>
                  Shipments
                  <span className="badge">128</span>
                </div>
                <div className="dashboard-sidebar-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
                  Inventory
                </div>
                <div className="dashboard-sidebar-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m7 14 4-4 4 4 5-5"/></svg>
                  Analytics
                </div>
              </div>
              <div>
                <div className="dashboard-sidebar-section">Settings</div>
                <div className="dashboard-sidebar-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
                  Integrations
                </div>
                <div className="dashboard-sidebar-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                  Team
                </div>
              </div>
            </aside>
            <main className="dashboard-main">
              <div className="dashboard-row">
                <div className="dashboard-kpi"><div className="lbl">Orders today</div><div className="num">2,841</div><div className="delta up">▲ 12.4%</div></div>
                <div className="dashboard-kpi"><div className="lbl">Shipped</div><div className="num">2,604</div><div className="delta up">▲ 8.1%</div></div>
                <div className="dashboard-kpi"><div className="lbl">On-time SLA</div><div className="num">99.8<sup>%</sup></div><div className="delta up">▲ 0.4 pts</div></div>
                <div className="dashboard-kpi"><div className="lbl">Avg. label cost</div><div className="num">$6.42</div><div className="delta down">▼ $0.18</div></div>
              </div>
              <div className="dashboard-chart">
                <div className="dashboard-chart-head">
                  <div className="dashboard-chart-title">Shipments volume</div>
                  <div className="dashboard-chart-tabs">
                    <span>1D</span><span>7D</span><span className="active">30D</span><span>1Y</span>
                  </div>
                </div>
                <DashboardChart />
              </div>
              <div className="dashboard-orders">
                <div className="dashboard-orders-head">
                  <div className="dashboard-orders-title">Recent shipments</div>
                </div>
                {orders.map((o, i) => (
                  <div className="dashboard-orders-row" key={i}>
                    <span className="id">{o.id}</span>
                    <span>{o.customer}</span>
                    <span className={`status ${o.status}`}><span className="d"/>{o.statusLabel}</span>
                    <span className="time">{o.time}</span>
                  </div>
                ))}
              </div>
            </main>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { StatsStrip, Services, Dashboard });
