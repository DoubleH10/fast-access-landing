// site/app.jsx — root composition
function App() {
  React.useEffect(() => {
    document.body.classList.add("with-pattern");
    return () => document.body.classList.remove("with-pattern");
  }, []);
  return (
    <>
      <Announcement />
      <Header />
      <Hero />
      <TrustStrip />
      <PackageJourney />
      <StatsStrip />
      <Services />
      <Dashboard />
      <Coverage />
      <Pricing />
      <Testimonial />
      <BigCTA />
      <Footer />
      <PackageIndicator />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
