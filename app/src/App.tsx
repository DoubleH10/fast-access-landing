import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './sections/Navigation';
import { Helmet } from 'react-helmet-async';
import AnnouncementBar from './sections/AnnouncementBar';
import Hero from './sections/Hero';
import Calculator from './sections/Calculator';
import TrustedBy from './sections/TrustedBy';
import Journey from './sections/Journey';
import ServicesGrid from './sections/ServicesGrid';
import DashboardPreview from './sections/DashboardPreview';
import Coverage from './sections/Coverage';
import Pricing from './sections/Pricing';
import Testimonial from './sections/Testimonial';
import FAQ from './sections/FAQ';
import CTA from './sections/CTA';
import Footer from './sections/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import SectionChip from './components/brand/SectionChip';


gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    const raf = (time: number) => { lenis.raf(time * 1000); };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return (
    <div>
      <Helmet>
        <title>Fast Access — Move Every Package Forward</title>
        <meta name="description" content="Fast Access provides cloud storage and delivery features, optimized for businesses and influencers." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Fast Access — Move Every Package Forward" />
        <meta property="og:description" content="Fast Access provides cloud storage and delivery features, optimized for businesses and influencers." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fastaccess.example.com" />
        <meta property="og:image" content="/assets/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Fast Access — Move Every Package Forward" />
        <meta name="twitter:description" content="Fast Access provides cloud storage and delivery features, optimized for businesses and influencers." />
        <meta name="twitter:image" content="/assets/og-image.png" />
      </Helmet>
      <AnnouncementBar />
      <Navigation />
      <main>
        <Hero />
        <ServicesGrid />
        <ErrorBoundary
          fallback={
            <section id="platform" className="bg-fa-liberty-blue section-padding">
              <div className="container-main">
                <SectionChip onDark>The Package Journey</SectionChip>
                <h2 className="font-display font-bold text-[32px] sm:text-[40px] lg:text-[56px] text-fa-classic-chalk leading-[1.05] tracking-[-0.02em] mt-5 max-w-[800px]">
                  Every order, <span className="text-fa-orange-soda">tracked</span> across six steps.
                </h2>
                <p className="font-body mt-5 text-base sm:text-lg text-fa-classic-chalk/65 max-w-[560px] leading-[1.55]">
                  Receive → Store → Pick → Pack → Ship → Deliver. Real-time visibility at every stage.
                </p>
              </div>
            </section>
          }
        >
          <Journey />
        </ErrorBoundary>
        <Calculator />
        <DashboardPreview />
        <Coverage />
        <TrustedBy />
        <Pricing />
        <Testimonial />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
