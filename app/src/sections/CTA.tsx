import { useInView } from '../hooks/useInView';
import { ArrowRight } from 'lucide-react';

export default function CTA() {
  const { ref, isInView } = useInView(0.2);

  return (
    <section id="quote" ref={ref} className="bg-[#1a1a3e] section-padding relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-30"
        style={{ background: 'repeating-linear-gradient(90deg, transparent, transparent 48px, rgba(255,255,255,0.012) 48px, rgba(255,255,255,0.012) 49px)' }}
      />

      <div className="container-main text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 border rounded-full mb-6"
          style={{ borderColor: 'rgba(245,245,240,0.2)', opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 500ms ease-out' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b35]" />
          <span className="text-xs font-medium text-[#f5f5f0]">Ready when you are</span>
        </div>

        <h2 className="font-display font-black text-[44px] sm:text-[56px] lg:text-[64px] text-[#f5f5f0] leading-[1]" style={{ opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 600ms ease-out 100ms' }}>
          Ship faster. <span className="text-[#ff6b35]">Today.</span>
        </h2>

        <p className="mt-4 text-base lg:text-lg text-[#8a8a9a] max-w-[480px] mx-auto" style={{ opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 500ms ease-out 200ms' }}>
          Move your operations to a network that actually moves. Go live in 14 days.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mt-8" style={{ opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 500ms ease-out 300ms' }}>
          <a href="#" className="btn-orange">
            Get a quote
            <ArrowRight size={16} />
          </a>
          <a href="#" className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-medium text-[#f5f5f0] uppercase tracking-wider border transition-colors duration-150 hover:border-[#f5f5f0]" style={{ borderColor: 'rgba(245,245,240,0.2)' }}>
            Book a tour
          </a>
        </div>
      </div>
    </section>
  );
}
