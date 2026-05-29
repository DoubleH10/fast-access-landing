import { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '../sections/Hero';
import WhatIsFA from '../sections/WhatIsFA';
import KickerBar from '../sections/KickerBar';
import ServicesGrid from '../sections/ServicesGrid';
import PainPoints from '../sections/PainPoints';
import Partner from '../sections/Partner';
import Expand from '../sections/Expand';
import Steps from '../sections/Steps';
// Three.js is heavy (~the bulk of the bundle). Code-split the 3D journey so it
// loads on its own after first paint; the flat Steps shows while it streams in.
const Journey = lazy(() => import('../sections/Journey'));
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
      <KickerBar />
      <ServicesGrid />
      <PainPoints />
      <Partner />
      <Expand />
      {/* The 5-step logistics journey — the signature 3D moment.
          Falls back to the flat 5-step layout where WebGL is unavailable. */}
      <ErrorBoundary fallback={<Steps />}>
        <Suspense fallback={<Steps />}>
          <Journey />
        </Suspense>
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
