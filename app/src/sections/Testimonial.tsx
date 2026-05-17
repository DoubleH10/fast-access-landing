import { useInView } from '../hooks/useInView';

export default function Testimonial() {
  const { ref, isInView } = useInView(0.2);

  return (
    <section ref={ref} className="bg-[#1a1a3e] section-padding">
      <div className="container-main max-w-[800px] text-center">
        <div style={{ opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 600ms ease-out' }}>
          <span className="font-display text-[48px] text-[#ff6b35] leading-none">&ldquo;</span>
          <blockquote className="font-display text-[22px] sm:text-[28px] lg:text-[32px] text-[#f5f5f0] leading-[1.4] -mt-4">
            Fast Access did in eight weeks what our 3PL hadn't managed in two years. Our shipping costs fell 22% and our customers actually got their packages on time.
          </blockquote>
        </div>
        <div className="mt-8 flex flex-col items-center" style={{ opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 500ms ease-out 200ms' }}>
          <div className="w-12 h-12 rounded-full flex items-center justify-center text-[#6b6b7b] font-semibold text-base" style={{ background: 'linear-gradient(135deg, #e8e8e8, #d0d0d0)' }}>
            OM
          </div>
          <div className="mt-3 text-base font-semibold text-[#f5f5f0]">Olivia Martin</div>
          <div className="text-sm text-[#8a8a9a]">Head of Operations, Northwind Apparel</div>
        </div>
      </div>
    </section>
  );
}
