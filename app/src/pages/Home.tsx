import { Helmet } from 'react-helmet-async';
import Hero from '../sections/Hero';
import WhatIsFA from '../sections/WhatIsFA';
import TrustedBy from '../sections/TrustedBy';
import KickerBar from '../sections/KickerBar';
import ServicesGrid from '../sections/ServicesGrid';
import ScrollRoute from '../sections/ScrollRoute';
import DashboardPreview from '../sections/DashboardPreview';
import Sectors from '../sections/Sectors';
import Coverage from '../sections/Coverage';
import StatStrip from '../sections/StatStrip';
import Results from '../sections/Results';
import Pricing from '../sections/Pricing';
import FAQ from '../sections/FAQ';
import CTA from '../sections/CTA';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Fast Access — Fulfillment & same-day delivery in Saudi Arabia</title>
        <meta
          name="description"
          content="Fast Access stores, packs, and ships your orders across Saudi Arabia and the Gulf — with same-day delivery from cloud stores. One partner, every order tracked."
        />
      </Helmet>
      <Hero />
      {/* Plain-language value prop first: tell visitors what we do */}
      <WhatIsFA />
      {/* Social proof high up: the platforms we plug into, right after the pitch */}
      <TrustedBy />
      <KickerBar />
      <ServicesGrid />
      {/* The journey beat: cinematic order-in-motion */}
      <ScrollRoute />
      {/* The platform: live-ops dashboard — follows the journey's
          "live readout" story with the tool that delivers it */}
      <DashboardPreview />
      <Sectors />
      {/* Navy "proof" block: network + the numbers */}
      <Coverage />
      <StatStrip />
      <Results />
      <Pricing />
      <FAQ />
      <CTA />
    </>
  );
}
