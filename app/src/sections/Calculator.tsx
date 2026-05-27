import { useEffect, useMemo, useState } from 'react';
import { Sparkles, TrendingUp, Clock, Wallet } from 'lucide-react';
import BrandButton from '../components/brand/BrandButton';
import { useT } from '../i18n/I18nContext';

/**
 * Calculator — interactive lead magnet, sits above the fold as the new
 * first section. The user inputs their current logistics reality and sees
 * what Fast Access would save them: $/month, hours/week, delivery speed,
 * and 12-month ROI. CTA at the bottom captures the lead with their inputs
 * already filled in.
 *
 * Math is intentionally conservative — the savings model assumes:
 *  - 18% reduction on per-order cost (Fast Access bulk carrier rates)
 *  - 70% reduction in weekly hours (we handle pick/pack/ship/ track)
 *  - Average delivery drops from N days to 1.5 days, or to 0.15 days
 *    (2-4hr) when same-day cloud stores are toggled on.
 */
export default function Calculator() {
  const { locale } = useT();
  const isAr = locale === 'ar';

  const [orders, setOrders] = useState(2000);
  const [costPerOrder, setCostPerOrder] = useState(30);
  const [weeklyHours, setWeeklyHours] = useState(20);
  const [deliveryDays, setDeliveryDays] = useState(3);
  const [cloudStores, setCloudStores] = useState(false);

  const results = useMemo(() => {
    const monthlyCost = orders * costPerOrder;
    const savedCostMonthly = monthlyCost * 0.18;
    const savedHoursWeekly = Math.round(weeklyHours * 0.7);
    const newDeliveryDays = cloudStores ? 0.15 : Math.min(deliveryDays, 1.5);
    const annualROI = Math.round(savedCostMonthly * 12);
    return { savedCostMonthly: Math.round(savedCostMonthly), savedHoursWeekly, newDeliveryDays, annualROI };
  }, [orders, costPerOrder, weeklyHours, deliveryDays, cloudStores]);

  // Tiny mount fade-in so the lead magnet doesn't pop in cold
  useEffect(() => {
    const els = document.querySelectorAll('.calc-fade');
    els.forEach((el, i) => {
      const n = el as HTMLElement;
      n.style.opacity = '0';
      n.style.transform = 'translateY(18px)';
      window.setTimeout(() => {
        n.style.transition = 'opacity 600ms cubic-bezier(0.22,1,0.36,1), transform 600ms cubic-bezier(0.22,1,0.36,1)';
        n.style.opacity = '1';
        n.style.transform = 'translateY(0)';
      }, 180 + i * 80);
    });
  }, []);

  const fmt = (n: number) => new Intl.NumberFormat(isAr ? 'ar-EG' : 'en-US').format(n);
  const fmtCurrency = (n: number) =>
    new Intl.NumberFormat(isAr ? 'ar-SA' : 'en-SA', { style: 'currency', currency: 'SAR', maximumFractionDigits: 0 }).format(n);

  return (
    <section className="relative bg-fa-paper overflow-hidden py-20 lg:py-28">
      <div className="container-main relative z-10">
        <div className="grid lg:grid-cols-[1fr_1.05fr] gap-12 lg:gap-16 items-start">
          {/* LEFT — tool label + inputs */}
          <div>
            <div className="calc-fade inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full mb-6"
              style={{ backgroundColor: 'rgba(13,18,50,0.04)', boxShadow: 'inset 0 0 0 1px rgba(13,18,50,0.10)' }}>
              <Sparkles size={12} className="text-fa-orange-soda" />
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.12em] text-fa-liberty-blue/70">
                {isAr ? 'حاسبة التوفير' : 'Savings calculator'}
              </span>
            </div>

            <h2 className="calc-fade font-display font-semibold text-[28px] sm:text-[34px] lg:text-[40px] text-fa-liberty-blue leading-[1.1] tracking-[-0.02em]">
              {isAr ? (
                <>
                  كم تخسر <span className="text-fa-orange-soda">شهرياً</span> على الشحن؟
                </>
              ) : (
                <>
                  How much are you{' '}
                  <span className="text-fa-orange-soda">losing</span> on shipping?
                </>
              )}
            </h2>

            <p className="calc-fade font-body mt-4 text-[15px] lg:text-base text-fa-liberty-blue/65 max-w-[500px] leading-[1.55]">
              {isAr
                ? 'حرّك المؤشرات لتشاهد كم توفّر من المال والوقت — وكم يتحسّن وقت التوصيل — مع Fast Access.'
                : 'Slide the inputs to see how much money and time you save — and how much faster your customers get their orders — with Fast Access.'}
            </p>

            {/* Inputs */}
            <div className="calc-fade mt-10 space-y-7">
              <RangeField
                label={isAr ? 'الطلبات الشهرية' : 'Monthly orders'}
                value={orders}
                onChange={setOrders}
                min={100}
                max={50000}
                step={100}
                format={(v) => fmt(v)}
              />
              <RangeField
                label={isAr ? 'تكلفة الشحن لكل طلب (ريال)' : 'Current cost per order (SAR)'}
                value={costPerOrder}
                onChange={setCostPerOrder}
                min={8}
                max={100}
                step={1}
                format={(v) => (isAr ? `${v} ر.س` : `${v} SAR`)}
              />
              <RangeField
                label={isAr ? 'الساعات الأسبوعية على العمليات' : 'Hours/week on shipping ops'}
                value={weeklyHours}
                onChange={setWeeklyHours}
                min={2}
                max={80}
                step={1}
                format={(v) => `${v} h`}
              />
              <RangeField
                label={isAr ? 'وقت التوصيل الحالي (أيام)' : 'Current avg delivery time (days)'}
                value={deliveryDays}
                onChange={setDeliveryDays}
                min={1}
                max={10}
                step={0.5}
                format={(v) => (isAr ? `${v} يوم` : `${v} d`)}
              />
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <span
                  className="relative inline-flex w-10 h-5 rounded-full transition-colors"
                  style={{ backgroundColor: cloudStores ? '#F15B41' : 'rgba(13,18,50,0.16)' }}
                  onClick={() => setCloudStores(!cloudStores)}
                >
                  <span
                    className="absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform"
                    style={{ transform: cloudStores ? 'translateX(22px)' : 'translateX(2px)' }}
                  />
                </span>
                <input type="checkbox" className="sr-only" checked={cloudStores} onChange={(e) => setCloudStores(e.target.checked)} />
                <span className="font-body text-sm text-fa-liberty-blue/80">
                  {isAr ? 'فعّل التوصيل من المتاجر السحابية (2–4 ساعات)' : 'Use cloud-store same-day delivery (2–4 hr)'}
                </span>
              </label>
              <p className="font-body text-[11px] text-fa-liberty-blue/45 leading-[1.5] -mt-3 pl-12">
                {isAr
                  ? 'حوالي ⅓ من المستهلكين في السعودية يفضلون التوصيل في اليوم التالي. متاجرنا السحابية توصل خلال 2–4 ساعات.'
                  : '~⅓ of Saudi consumers want it next day. Our cloud stores ship in 2–4 hours.'}
              </p>
            </div>
          </div>

          {/* RIGHT — results card, sticky so it follows while sliders move */}
          <div className="calc-fade lg:sticky lg:top-32">
            <div
              className="relative rounded-[20px] p-8 lg:p-10 bg-fa-liberty-blue"
              style={{
                background:
                  'linear-gradient(135deg, #0D1232 0%, #2D2E75 100%)',
                boxShadow: 'inset 0 0 0 1px rgba(244,244,241,0.10), 0 24px 60px rgba(13,18,50,0.18)',
              }}
            >
              <div className="flex items-center gap-2 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-fa-orange-soda" style={{ animation: 'pulse-glow 2s infinite' }} />
                <span className="font-body text-[10px] font-semibold uppercase tracking-[0.14em] text-fa-orange-soda">
                  {isAr ? 'تقدير لحظي' : 'Live estimate'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-6 lg:gap-8">
                <Stat
                  icon={<Wallet size={18} strokeWidth={1.7} />}
                  label={isAr ? 'وفرت شهرياً' : 'Saved per month'}
                  value={fmtCurrency(results.savedCostMonthly)}
                />
                <Stat
                  icon={<Clock size={18} strokeWidth={1.7} />}
                  label={isAr ? 'ساعات وفرتها أسبوعياً' : 'Hours saved/week'}
                  value={`${fmt(results.savedHoursWeekly)} ${isAr ? 'ساعة' : 'hrs'}`}
                />
              </div>

              <div className="mt-8 grid gap-6 sm:grid-cols-[minmax(0,1.35fr)_minmax(130px,0.65fr)] items-end">
                <Stat
                  icon={<TrendingUp size={18} strokeWidth={1.7} />}
                  label={isAr ? 'العائد السنوي' : 'Annual ROI'}
                  value={fmtCurrency(results.annualROI)}
                  highlight
                  className="min-w-0"
                />
                <Stat
                  icon={<Sparkles size={18} strokeWidth={1.7} />}
                  label={isAr ? 'وقت التوصيل الجديد' : 'New delivery time'}
                  value={
                    results.newDeliveryDays < 0.25
                      ? isAr
                        ? '2–4 ساعات'
                        : '2–4 hrs'
                      : isAr
                      ? `${results.newDeliveryDays} يوم`
                      : `${results.newDeliveryDays} d`
                  }
                />
              </div>

              <div className="mt-8 pt-7 border-t border-fa-classic-chalk/10 flex flex-wrap items-center gap-3 justify-between">
                <span className="font-body text-[12px] text-fa-classic-chalk/55 max-w-[260px] leading-[1.5]">
                  {isAr ? 'احصل على عرض سعر مخصص بناءً على هذه الأرقام.' : 'Get a tailored quote based on these numbers.'}
                </span>
                <BrandButton variant="filled" href="/contact">
                  {isAr ? 'اطلب عرضي' : 'Get my quote'}
                </BrandButton>
              </div>
            </div>

            <div className="mt-4 font-body text-[11px] text-fa-liberty-blue/45 text-center">
              {isAr
                ? 'تقديرات تعتمد على متوسط نتائج تجار Fast Access. النتائج الفعلية تختلف.'
                : 'Estimates based on average Fast Access merchant outcomes. Actual results vary.'}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse-glow { 0%,100%{box-shadow:0 0 4px rgba(241,91,65,0.5)} 50%{box-shadow:0 0 14px rgba(241,91,65,0.95)} }
      `}</style>
    </section>
  );
}

/* === Subcomponents === */

function RangeField({
  label,
  value,
  onChange,
  min,
  max,
  step,
  format,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
}) {
  return (
    <div>
      <div className="flex justify-between items-baseline mb-2">
        <label className="font-body text-[12px] uppercase tracking-[0.08em] text-fa-liberty-blue/55 font-semibold">{label}</label>
        <span className="font-display text-[20px] font-semibold text-fa-orange-soda tracking-[-0.01em]">{format(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full calc-range"
      />
      <style>{`
        .calc-range { -webkit-appearance: none; appearance: none; height: 2px; background: rgba(13,18,50,0.16); border-radius: 999px; outline: none; }
        .calc-range::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 18px; height: 18px; background: #F15B41; border-radius: 50%; cursor: pointer; box-shadow: 0 0 0 4px rgba(241,91,65,0.18); transition: box-shadow 150ms; }
        .calc-range::-webkit-slider-thumb:hover { box-shadow: 0 0 0 6px rgba(241,91,65,0.28); }
        .calc-range::-moz-range-thumb { width: 18px; height: 18px; background: #F15B41; border-radius: 50%; cursor: pointer; border: none; box-shadow: 0 0 0 4px rgba(241,91,65,0.18); }
      `}</style>
    </div>
  );
}

function Stat({
  icon,
  label,
  value,
  highlight = false,
  className = '',
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  highlight?: boolean;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`.trim()}>
      <div className="flex items-center gap-2 text-fa-orange-soda mb-3">{icon}</div>
      <div className={`font-display font-semibold leading-none tracking-[-0.02em] whitespace-nowrap ${highlight ? 'text-[36px] lg:text-[44px] xl:text-[48px] text-fa-orange-soda' : 'text-[28px] lg:text-[36px] text-fa-classic-chalk'}`}>
        {value}
      </div>
      <div className="mt-2 font-body text-[11px] uppercase tracking-[0.08em] text-fa-classic-chalk/55 font-semibold">{label}</div>
    </div>
  );
}
