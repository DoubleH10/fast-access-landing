import { Helmet } from 'react-helmet-async';
import CTA from '../sections/CTA';

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>Contact — Fast Access</title>
        <meta name="description" content="Tell us what you ship and we'll come back with a tailored fulfillment plan within one business day. Talk to the Fast Access team." />
      </Helmet>
      {/* Navy top pad clears the fixed header; blends seamlessly into CTA's navy. */}
      <div className="bg-fa-liberty-blue pt-[88px] lg:pt-[104px]">
        <CTA />
      </div>
    </>
  );
}
