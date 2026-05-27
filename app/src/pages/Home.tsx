import { Helmet } from 'react-helmet-async';
import Hero from '../sections/Hero';
import WhatIsFA from '../sections/WhatIsFA';
import ServicesGrid from '../sections/ServicesGrid';
import PainPoints from '../sections/PainPoints';
import Partner from '../sections/Partner';
import Expand from '../sections/Expand';
import Journey from '../sections/Journey';
import Steps from '../sections/Steps';
import TrustedBy from '../sections/TrustedBy';
import Sectors from '../sections/Sectors';
import Coverage from '../sections/Coverage';
import StatStrip from '../sections/StatStrip';
import Results from '../sections/Results';
import Pricing from '../sections/Pricing';
import FAQ from '../sections/FAQ';
import CTA from '../sections/CTA';
import ErrorBoundary from '../components/ErrorBoundary';

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
      <ServicesGrid />
      <PainPoints />
      <Partner />
      <Expand />
      {/* The 5-step logistics journey — the signature 3D moment.
          Falls back to the flat 5-step layout where WebGL is unavailable. */}
      <ErrorBoundary fallback={<Steps />}>
        <Journey />
      </ErrorBoundary>
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
