import { useInView } from '../hooks/useInView';
import BrandPattern from '../components/brand/BrandPattern';

export default function Testimonial() {
  const { ref, isInView } = useInView(0.2);

  return (
    <section ref={ref} className="relative bg-fa-liberty-blue section-padding overflow-hidden">
      <BrandPattern
        pattern="isometric"
        tint="orange"
        opacity={0.14}
        className="absolute -top-[10%] -right-[10%] w-[55%] max-w-[800px]"
      />
      <BrandPattern
        pattern="isometric"
        tint="white"
        opacity={0.04}
        className="absolute -bottom-[10%] -left-[10%] w-[55%] max-w-[800px]"
        style={{ transform: 'scaleX(-1)' }}
      />

      <div className="container-main max-w-[860px] text-center relative z-10">
        <div style={{ opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 600ms ease-out' }}>
          <span className="font-display text-[64px] text-fa-orange-soda leading-none block mb-2">&ldquo;</span>
          <blockquote className="font-display text-[26px] sm:text-[32px] lg:text-[40px] text-fa-classic-chalk leading-[1.25] tracking-[-0.015em]">
            Fast Access did in eight weeks what our 3PL hadn't managed in two years.{' '}
            <span className="text-fa-orange-soda">Our shipping costs fell 22%</span>{' '}
            and our customers actually got their packages on time.
          </blockquote>
        </div>
        <div
          className="mt-10 flex flex-col items-center"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 500ms ease-out 200ms',
          }}
        >
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-fa-liberty-blue font-semibold text-base font-display"
            style={{ background: 'linear-gradient(135deg, #FECAC1, #FB7C65)' }}
          >
            OM
          </div>
          <div className="font-body mt-4 text-base font-semibold text-fa-classic-chalk">Olivia Martin</div>
          <div className="font-body text-sm text-fa-classic-chalk/55">Head of Operations, Northwind Apparel</div>
        </div>
      </div>
    </section>
  );
}
