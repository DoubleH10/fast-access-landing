import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnnouncementBar from '../sections/AnnouncementBar';
import Navigation from '../sections/Navigation';
import Footer from '../sections/Footer';
import ScrollToTop from './ScrollToTop';

/**
 * Shared site shell: fixed AnnouncementBar + Navigation, the routed page in
 * <Outlet>, and the Footer. Owns the global Lenis smooth-scroll + GSAP ticker.
 */
export default function Layout() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    const raf = (time: number) => { lenis.raf(time * 1000); };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);

  return (
    <div>
      <ScrollToTop />
      <AnnouncementBar />
      <Navigation />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
