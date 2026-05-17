import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './sections/Navigation';
import AnnouncementBar from './sections/AnnouncementBar';
import Hero from './sections/Hero';
import TrustedBy from './sections/TrustedBy';
import Journey from './sections/Journey';
import ByTheNumbers from './sections/ByTheNumbers';
import ServicesGrid from './sections/ServicesGrid';
import DashboardPreview from './sections/DashboardPreview';
import Coverage from './sections/Coverage';
import Pricing from './sections/Pricing';
import Testimonial from './sections/Testimonial';
import CTA from './sections/CTA';
import Footer from './sections/Footer';
import PackageIndicator from './sections/PackageIndicator';

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
        <TrustedBy />
        <Journey />
        <ByTheNumbers />
        <ServicesGrid />
        <DashboardPreview />
        <Coverage />
        <Pricing />
        <Testimonial />
        <CTA />
      </main>
      <Footer />
      <PackageIndicator />
    </div>
  );
}
