import { Helmet } from 'react-helmet-async';
import Hero from '../sections/Hero';
import WhatIsFA from '../sections/WhatIsFA';
import KickerBar from '../sections/KickerBar';
import ServicesGrid from '../sections/ServicesGrid';
import PainPoints from '../sections/PainPoints';
import Partner from '../sections/Partner';
import Expand from '../sections/Expand';
import Journey2D from '../sections/Journey2D';
import TrustedBy from '../sections/TrustedBy';
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
      <WhatIsFA />
      <KickerBar />
      <ServicesGrid />
      <PainPoints />
      <Partner />
      <Expand />
      {/* "How it works" — sticky-scroll 2D scene: stage copy fades on the
          left, frosted data cards swap on the right, with a coloured blob
          and floating package drifting between them. */}
      <Journey2D />
      <TrustedBy />
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
