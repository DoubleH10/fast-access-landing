import { useEffect, useState } from 'react';

const STAGES = ['Receive', 'Store', 'Pick', 'Pack', 'Ship', 'Deliver'];

export default function PackageIndicator() {
  const [pct, setPct] = useState(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = Math.max(0, Math.min(1, window.scrollY / Math.max(1, h)));
      setPct(p);
      setActive(Math.min(STAGES.length - 1, Math.floor(p * STAGES.length)));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className="hidden lg:flex fixed right-5 top-1/2 -translate-y-1/2 z-40 pointer-events-none"
      aria-hidden="true"
    >
      <div className="relative h-[260px] w-[140px]">
        {/* Vertical track */}
        <div className="absolute right-[18px] top-0 bottom-0 w-px bg-white/15" />

        {/* Moving dot */}
        <div
          className="absolute right-[14px] w-2 h-2 rounded-full bg-[#F15B41] transition-[top] duration-150 ease-out"
          style={{
            top: `calc(${pct * 100}% - 4px)`,
            boxShadow: '0 0 12px rgba(241,91,65,0.8)',
          }}
        />

        {/* Stage labels */}
        <div className="absolute inset-0 flex flex-col justify-between items-end pr-7">
          {STAGES.map((label, i) => (
            <div
              key={label}
              className="flex items-center gap-2 transition-opacity duration-200"
              style={{ opacity: i === active ? 1 : 0.35 }}
            >
              <span
                className={`font-mono text-[10px] uppercase tracking-wider ${
                  i === active ? 'text-[#F15B41]' : 'text-white/60'
                }`}
              >
                {label}
              </span>
              <span
                className={`block w-1.5 h-1.5 rounded-full ${
                  i <= active ? 'bg-[#F15B41]' : 'bg-white/25'
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
