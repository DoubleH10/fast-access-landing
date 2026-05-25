import { Helmet } from 'react-helmet-async';
import Hero from '../sections/Hero';
import WhatIsFA from '../sections/WhatIsFA';
import ServicesGrid from '../sections/ServicesGrid';
import Coverage from '../sections/Coverage';
import TrustedBy from '../sections/TrustedBy';
import Testimonial from '../sections/Testimonial';
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
      <ServicesGrid />
      <Coverage />
      <TrustedBy />
      <Testimonial />
      <CTA />
    </>
  );
}
