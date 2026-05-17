import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './sections/Navigation';
import AnnouncementBar from './sections/AnnouncementBar';
import Hero from './sections/Hero';
import Calculator from './sections/Calculator';
import TrustedBy from './sections/TrustedBy';
import CloudStores from './sections/CloudStores';
import Journey from './sections/Journey';
import ByTheNumbers from './sections/ByTheNumbers';
import ServicesGrid from './sections/ServicesGrid';
import DashboardPreview from './sections/DashboardPreview';
import Coverage from './sections/Coverage';
import Pricing from './sections/Pricing';
import Testimonial from './sections/Testimonial';
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
      <AnnouncementBar />
      <Navigation />
      <main>
        <Hero />
        <Calculator />
        <TrustedBy />
        <CloudStores />
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
        <ByTheNumbers />
        <ServicesGrid />
        <DashboardPreview />
        <Coverage />
        <Pricing />
        <Testimonial />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
