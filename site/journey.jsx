// site/journey.jsx — signature scroll-pinned package journey section
const { useEffect: useEffect_J, useState: useState_J, useRef: useRef_J, useMemo: useMemo_J } = React;

const STAGES = [
  {
    num: "01",
    name: "Receive",
    title: "Your inventory arrives — and Fast Access already knows.",
    body: "Inbound shipments are scanned, weighed, and slotted the moment they cross our door. Every SKU is in your dashboard before the truck pulls away.",
    stats: [{ n: "8m", u: "", l: "Avg. dock-to-shelf" }, { n: "100", u: "%", l: "Scan accuracy" }],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/>
        <path d="M15 18H9"/>
        <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/>
        <circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/>
      </svg>
    )
  },
  {
    num: "02",
    name: "Store",
    title: "Smart storage that knows what's coming.",
    body: "Slotting algorithms place fast-movers near pick-paths and seasonal inventory deeper in the network. Climate-controlled bays for sensitive SKUs.",
    stats: [{ n: "42", u: "", l: "Fulfillment centers" }, { n: "3.6", u: "M", l: "Sq. ft. capacity" }],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/>
        <path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>
      </svg>
    )
  },
  {
    num: "03",
    name: "Pick",
    title: "The right unit, from the right slot, every time.",
    body: "Pick paths optimize across orders in real time. Robotic assist for high-density zones, human accuracy where it matters.",
    stats: [{ n: "99.99", u: "%", l: "Pick accuracy" }, { n: "14", u: "s", l: "Avg. pick time" }],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m11 17 2 2a1 1 0 1 0 3-3"/>
        <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/>
        <path d="m21 3 1 11h-2"/>
        <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"/>
        <path d="M3 4h8"/>
      </svg>
    )
  },
  {
    num: "04",
    name: "Pack",
    title: "Packed with the right materials, the first time.",
    body: "Right-sized boxes, brand-matched inserts, and your own custom unboxing experience — at the same speed as a plain brown box.",
    stats: [{ n: "32", u: "%", l: "Less dunnage" }, { n: "100", u: "%", l: "Branded unboxing" }],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22V12"/><path d="M3.3 7 12 12l8.7-5"/><path d="m7.5 4.27 9 5.15"/>
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/>
      </svg>
    )
  },
  {
    num: "05",
    name: "Ship",
    title: "The optimal carrier — automatically.",
    body: "Rates from every major carrier, ranked against your service-level rules and the package's actual route. Cheapest, fastest, or greenest, your choice.",
    stats: [{ n: "11", u: "+", l: "Carrier integrations" }, { n: "18", u: "%", l: "Avg. label savings" }],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/>
        <path d="M15 18H9"/>
        <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/>
        <circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/>
      </svg>
    )
  },
  {
    num: "06",
    name: "Deliver",
    title: "On the doorstep — proven, photographed, signed.",
    body: "End-to-end tracking your shoppers actually read. Photo proof on delivery. Branded post-purchase comms that turn one order into the next.",
    stats: [{ n: "1.2", u: "d", l: "Avg. delivery time" }, { n: "4.8", u: "/5", l: "Customer CSAT" }],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/>
      </svg>
    )
  },
];

// Y-positions for each station (top %) — alternating peaks/valleys give the path a wavy feel
const STATION_X = [6.5, 23.5, 40.5, 57.5, 74.5, 91.5];
const STATION_Y = [65, 28, 65, 28, 65, 28];

function buildPath() {
  // SVG viewBox 1000x280. Curve through points (x%, y%).
  const W = 1000, H = 280;
  const pts = STATION_X.map((xp, i) => [
    (xp / 100) * W,
    (STATION_Y[i] / 100) * H,
  ]);
  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const [x1, y1] = pts[i];
    const [x2, y2] = pts[i + 1];
    const cx = (x1 + x2) / 2;
    d += ` C ${cx} ${y1}, ${cx} ${y2}, ${x2} ${y2}`;
  }
  return d;
}

function PackageJourney() {
  const wrapRef = useRef_J(null);
  const stickyRef = useRef_J(null);
  const pathRef = useRef_J(null);
  const [progress, setProgress] = useState_J(0);

  useEffect_J(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = wrapRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const total = r.height - vh;
        const scrolled = Math.min(Math.max(-r.top, 0), total);
        setProgress(total > 0 ? scrolled / total : 0);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);

  // active stage from progress
  const stageIdx = Math.min(STAGES.length - 1, Math.floor(progress * STAGES.length));
  const stage = STAGES[stageIdx];
  const pathD = useMemo_J(() => buildPath(), []);

  // package position along the path
  const [pkgPos, setPkgPos] = useState_J({ x: 0, y: 0 });
  useEffect_J(() => {
    if (!pathRef.current) return;
    const len = pathRef.current.getTotalLength();
    const pt = pathRef.current.getPointAtLength(len * progress);
    setPkgPos({ x: pt.x, y: pt.y });
  }, [progress, pathD]);

  // foreground (orange) path length for animated reveal
  const fgDashRef = useRef_J(null);
  useEffect_J(() => {
    if (!fgDashRef.current) return;
    const len = fgDashRef.current.getTotalLength();
    fgDashRef.current.style.strokeDasharray = `${len}`;
    fgDashRef.current.style.strokeDashoffset = `${len * (1 - progress)}`;
  }, [progress, pathD]);

  return (
    <section className="journey" id="journey" data-screen-label="Package Journey">
      <div ref={wrapRef} style={{ height: "400vh" }}>
        <div ref={stickyRef} className="journey-sticky">
          <div className="pattern-drift" style={{ top: "12%" }} aria-hidden="true"/>
          <div className="pattern-drift pattern-drift--reverse pattern-drift--slow" style={{ bottom: "10%" }} aria-hidden="true"/>
          <div className="container container--wide">
            <div className="journey-header">
              <div className="label-block">
                <div className="section-label on-dark">The Package Journey</div>
                <h2>Every order, <em>tracked</em> across six steps.</h2>
              </div>
              <div className="journey-progress">
                Stage
                <span className="num">{String(stageIdx + 1).padStart(2, "0")}</span>
                <span className="slash">/</span>
                <span>06</span>
              </div>
            </div>

            <div className="journey-track-wrap">
              <div className="journey-track">
                <svg viewBox="0 0 1000 280" preserveAspectRatio="none">
                  <path d={pathD} className="journey-path-bg" />
                  <path ref={pathRef} d={pathD} style={{ visibility: "hidden" }} />
                  <path ref={fgDashRef} d={pathD} className="journey-path-fg" />
                </svg>
                <div className="journey-stations">
                  {STAGES.map((s, i) => {
                    let cls = "journey-station";
                    if (i < stageIdx) cls += " done";
                    if (i === stageIdx) cls += " active";
                    return (
                      <div key={i} className={cls} style={{ left: `${STATION_X[i]}%`, top: `${STATION_Y[i]}%` }}>
                        <div className="station-marker">{s.icon}</div>
                        <div style={{ textAlign: "center" }}>
                          <div className="journey-station-num">{s.num}</div>
                          <div className="journey-station-name">{s.name}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="journey-package" style={{
                  // package is positioned in % space inside the viewBox
                  left: `calc(${(pkgPos.x / 1000) * 100}% - 22px)`,
                  top:  `calc(${(pkgPos.y / 280) * 100}% - 22px)`,
                }}>
                  <PackageIcon />
                </div>
              </div>
            </div>

            <div className="journey-content">
              <div>
                <h3><span className="stage-tag">{stage.num} · {stage.name}</span><br/>{stage.title}</h3>
              </div>
              <div>
                <p>{stage.body}</p>
                <div className="stats">
                  {stage.stats.map((s, i) => (
                    <div className="stat" key={i}>
                      <div className="num">{s.n}<sup>{s.u}</sup></div>
                      <div className="lbl">{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Floating right-edge progress indicator
function PackageIndicator() {
  const [pct, setPct] = useState_J(0);
  const [active, setActive] = useState_J(0);
  useEffect_J(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = Math.max(0, Math.min(1, window.scrollY / Math.max(1, h)));
      setPct(p);
      const idx = Math.min(STAGES.length - 1, Math.floor(p * STAGES.length));
      setActive(idx);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fa-package-indicator" aria-hidden="true">
      <div className="fa-package-indicator-track">
        <div className="fa-package-indicator-dot" style={{ top: `calc(${pct * 100}% - 7px)` }}/>
        <div className="fa-package-indicator-stages">
          {STAGES.map((s, i) => (
            <div key={i} className={`fa-package-indicator-stage ${i === active ? "active" : ""}`}>
              <span className="lbl">{s.name}</span>
              <span className="tick"/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { STAGES, PackageJourney, PackageIndicator });
