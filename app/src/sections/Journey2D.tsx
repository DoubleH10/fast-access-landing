/**
 * Journey2D — the design bundle's sticky-scroll "How it works" experience.
 *
 * The section is intentionally tall (5.5 viewports). Inside, a sticky pane
 * holds two halves: a left column that swaps stage titles + bodies as you
 * scroll, and a right canvas where a coloured blob drifts, a floating
 * package wanders along a curving path, and a stack of frosted data cards
 * cross-fades one per stage.
 *
 * Replaces the heavier Three.js Journey — pure DOM, no WebGL, no risk of
 * blank scenes in headless / sandboxed browsers.
 */

import { useEffect, useRef, useState } from 'react';
import {
  Plug, Warehouse, PackageCheck, Truck, Activity, Package,
} from 'lucide-react';
import SectionChip from '../components/brand/SectionChip';
import { useT } from '../i18n/I18nContext';

type TitleToken = string | { accent: string };
interface CardRow { label: string; value: string; tone?: 'green' }
interface Stage {
  num: string;
  title: TitleToken[];
  body: string;
  icon: React.ReactNode;
  card: { title: string; sub: string; rows: CardRow[] };
  blob: { color: string; x: number; y: number };
}

const stagesByLocale: Record<'en' | 'ar', Stage[]> = {
  en: [
    {
      num: '01',
      title: ['Connect ', { accent: 'your store' }, '.'],
      body: 'One-click integration with Salla, Zid, Shopify, WooCommerce or our API. Orders flow into our system the moment a customer checks out.',
      icon: <Plug size={20} strokeWidth={1.8} />,
      card: {
        title: 'Salla store connected',
        sub: '4,218 SKUs synced · live order feed open',
        rows: [
          { label: 'API status',       value: 'OK',     tone: 'green' },
          { label: 'Webhook latency',  value: '63ms' },
          { label: 'Inventory diff',   value: '0 units' },
        ],
      },
      blob: { color: 'rgba(114,198,234,0.35)', x: 30, y: 28 },
    },
    {
      num: '02',
      title: [{ accent: 'Receive' }, ' & store.'],
      body: 'Your inventory arrives at the nearest hub. Counted, photographed, shelved — and visible in your dashboard within 90 minutes.',
      icon: <Warehouse size={20} strokeWidth={1.8} />,
      card: {
        title: 'Inbound · 1,240 units',
        sub: 'RYD-04 · Bay 12 · scanned',
        rows: [
          { label: 'QC pass rate', value: '99.7%', tone: 'green' },
          { label: 'Storage zone', value: 'A-3' },
          { label: 'Time to shelf', value: '74 min' },
        ],
      },
      blob: { color: 'rgba(241,91,65,0.35)', x: 65, y: 22 },
    },
    {
      num: '03',
      title: ['We ', { accent: 'pick & pack' }, '.'],
      body: 'Every order is picked, double-checked, and packed in your brand. Custom inserts, gift wrap and printed cards on request — no extra setup.',
      icon: <PackageCheck size={20} strokeWidth={1.8} />,
      card: {
        title: 'Wave #834 · 412 orders',
        sub: 'Picking in progress · 2.3min avg',
        rows: [
          { label: 'Accuracy',        value: '99.98%', tone: 'green' },
          { label: 'Avg pick→pack',   value: '2h 04' },
          { label: 'Custom packs',    value: '78' },
        ],
      },
      blob: { color: 'rgba(45,46,117,0.45)', x: 40, y: 70 },
    },
    {
      num: '04',
      title: ['Ship across ', { accent: 'KSA & the Gulf' }, '.'],
      body: 'Best-rate carrier picked per route, with same-day cloud-store delivery inside Riyadh, Jeddah & Dammam. International to 220+ countries.',
      icon: <Truck size={20} strokeWidth={1.8} />,
      card: {
        title: '12,408 in transit',
        sub: 'Carrier: SMSA, Aramex, DHL, FedEx',
        rows: [
          { label: 'On-time rate',     value: '99.8%', tone: 'green' },
          { label: 'Same-day cities',  value: '6' },
          { label: 'Carriers in play', value: '11' },
        ],
      },
      blob: { color: 'rgba(241,91,65,0.5)', x: 75, y: 62 },
    },
    {
      num: '05',
      title: [{ accent: 'Tracked' }, ' door-to-door.'],
      body: 'Every shipment streamed live to you and your customer. Performance reports flag bottlenecks before they cost a refund.',
      icon: <Activity size={20} strokeWidth={1.8} />,
      card: {
        title: 'Live dashboard',
        sub: '23,481 events today · 0 incidents',
        rows: [
          { label: 'Resolved auto',         value: '94%', tone: 'green' },
          { label: 'NPS (90 days)',         value: '72' },
          { label: 'Cust. updates / order', value: '4.2' },
        ],
      },
      blob: { color: 'rgba(107,216,160,0.30)', x: 35, y: 45 },
    },
  ],
  ar: [
    {
      num: '٠١',
      title: ['اربط ', { accent: 'متجرك' }, '.'],
      body: 'تكامل بنقرة واحدة مع سلة وزد وشوبيفاي وووكومرس أو API الخاص بنا. الطلبات تدخل نظامنا لحظة إتمام الشراء.',
      icon: <Plug size={20} strokeWidth={1.8} />,
      card: {
        title: 'متجر سلة متصل',
        sub: '4,218 SKU متزامن · بث طلبات مباشر',
        rows: [
          { label: 'حالة API',         value: 'OK',     tone: 'green' },
          { label: 'زمن الويب-هوك',    value: '63ms' },
          { label: 'فرق المخزون',      value: '0' },
        ],
      },
      blob: { color: 'rgba(114,198,234,0.35)', x: 30, y: 28 },
    },
    {
      num: '٠٢',
      title: [{ accent: 'استلام' }, ' وتخزين.'],
      body: 'بضاعتك تصل لأقرب مركز. تُعدّ وتُصوّر وتُخزّن — وتظهر في لوحتك خلال 90 دقيقة.',
      icon: <Warehouse size={20} strokeWidth={1.8} />,
      card: {
        title: 'وارد · 1,240 وحدة',
        sub: 'RYD-04 · رصيف 12 · تم المسح',
        rows: [
          { label: 'نسبة الفحص',      value: '99.7%', tone: 'green' },
          { label: 'منطقة التخزين',   value: 'A-3' },
          { label: 'وقت التخزين',     value: '74 د' },
        ],
      },
      blob: { color: 'rgba(241,91,65,0.35)', x: 65, y: 22 },
    },
    {
      num: '٠٣',
      title: ['نُجهّز و', { accent: 'نُغلّف' }, '.'],
      body: 'كل طلب يُجهّز، يُراجَع مرتين، ويُغلّف بهوية متجرك. كرتنات مخصصة، تغليف هدايا، بطاقات مطبوعة — بدون إعدادات إضافية.',
      icon: <PackageCheck size={20} strokeWidth={1.8} />,
      card: {
        title: 'موجة #834 · 412 طلباً',
        sub: 'التجهيز جارٍ · متوسط 2.3 د',
        rows: [
          { label: 'الدقة',            value: '99.98%', tone: 'green' },
          { label: 'متوسط الانتقاء',   value: '2س 04' },
          { label: 'تغليف مخصص',       value: '78' },
        ],
      },
      blob: { color: 'rgba(45,46,117,0.45)', x: 40, y: 70 },
    },
    {
      num: '٠٤',
      title: ['شحن داخل ', { accent: 'السعودية والخليج' }, '.'],
      body: 'أفضل ناقل لكل وجهة، مع توصيل من المتاجر السحابية في الرياض وجدة والدمام في نفس اليوم. ودولياً لـ 220+ دولة.',
      icon: <Truck size={20} strokeWidth={1.8} />,
      card: {
        title: '12,408 في الطريق',
        sub: 'ناقل: SMSA, Aramex, DHL, FedEx',
        rows: [
          { label: 'نسبة الالتزام',       value: '99.8%', tone: 'green' },
          { label: 'مدن نفس اليوم',       value: '6' },
          { label: 'ناقلون نشطون',        value: '11' },
        ],
      },
      blob: { color: 'rgba(241,91,65,0.5)', x: 75, y: 62 },
    },
    {
      num: '٠٥',
      title: [{ accent: 'متابعة' }, ' حتى الباب.'],
      body: 'كل شحنة تُبث مباشرةً لك ولعميلك. التقارير تُظهر الاختناقات قبل أن تكلّفك استرداداً.',
      icon: <Activity size={20} strokeWidth={1.8} />,
      card: {
        title: 'لوحة مباشرة',
        sub: '23,481 حدث اليوم · 0 حوادث',
        rows: [
          { label: 'حل آلي',             value: '94%', tone: 'green' },
          { label: 'NPS (90 يوم)',       value: '72' },
          { label: 'تحديثات/طلب',         value: '4.2' },
        ],
      },
      blob: { color: 'rgba(107,216,160,0.30)', x: 35, y: 45 },
    },
  ],
};

export default function Journey2D() {
  const { locale } = useT();
  const isAr = locale === 'ar';
  const stages = stagesByLocale[locale];
  const N = stages.length;
  const wrapRef = useRef<HTMLElement | null>(null);

  // Scroll progress through the section: 0 at top of section, 1 once the
  // bottom of the section reaches the bottom of the viewport.
  const [active, setActive] = useState(0);
  const [cur, setCur] = useState(0);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = r.height - vh;
      const passed = Math.max(0, -r.top);
      const p = total > 0 ? Math.min(1, Math.max(0, passed / total)) : 0;
      // Spread across stages with a small tail so the last stage holds.
      const stepFloat = Math.max(0, Math.min(N - 1, p * (N - 0.4)));
      const a = Math.min(N - 1, Math.floor(stepFloat));
      const c = stepFloat - a;
      setActive(a);
      setCur(c);
      raf = 0;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [N]);

  // stepFloat for animations — derived from active + cur to avoid re-deriving
  const stepFloat = active + cur;
  // Curving path for the floating package (offset around the canvas centre)
  const pkgX = Math.sin(stepFloat * 1.2) * 22;
  const pkgY = Math.cos(stepFloat * 0.9) * 12;
  const pkgRot = stepFloat * 24;

  // The section height defines how many viewports of scroll the journey gets.
  const wrapH = `${(N + 0.5) * 100}vh`;
  const cnum = String(active + 1).padStart(2, '0');
  const cof = String(N).padStart(2, '0');

  return (
    <section
      id="how-it-works"
      ref={wrapRef as React.Ref<HTMLElement>}
      className="fa-journey2"
      style={{ height: wrapH }}
    >
      <div className="fa-journey2-sticky">
        {/* LEFT — stage copy + progress bars */}
        <div className="fa-journey2-left text-left rtl:text-right">
          <div className="flex items-center gap-3">
            <SectionChip onDark>{isAr ? 'كيف نعمل' : 'How it works'}</SectionChip>
            <span className="fa-journey2-eyebrow">
              <span className="num tabular-nums">{cnum}</span>
              <span className="of"> / {cof}</span>
            </span>
          </div>

          <div className="fa-journey2-stage">
            {stages.map((s, i) => (
              <div key={i} className={`stage${i === active ? ' active' : ''}`}>
                <h2>
                  {s.title.map((t, j) =>
                    typeof t === 'string'
                      ? <span key={j}>{t}</span>
                      : <span key={j} className="accent">{t.accent}</span>
                  )}
                </h2>
                <p>{s.body}</p>
              </div>
            ))}
          </div>

          <div className="fa-journey2-nav">
            {stages.map((_, i) => (
              <span
                key={i}
                className={`nv${i < active ? ' done' : i === active ? ' active' : ''}`}
                style={{ ['--cur' as never]: i === active ? cur : 0 } as React.CSSProperties}
              >
                <span className="f" />
              </span>
            ))}
          </div>
        </div>

        {/* RIGHT — the moving visual canvas */}
        <div className="fa-journey2-right">
          <div className="fa-journey2-bg-grid" />
          <div
            className="fa-journey2-blob"
            style={{
              left: `${stages[active].blob.x}%`,
              top: `${stages[active].blob.y}%`,
              transform: `translate(-50%, -50%) scale(${1 + cur * 0.3})`,
              background: stages[active].blob.color,
            }}
          />
          <div
            className="fa-journey2-package"
            style={{ transform: `translate(${pkgX}vw, ${pkgY}vh) rotate(${pkgRot}deg)` }}
          >
            <Package size={26} strokeWidth={1.8} />
          </div>
          <div className="fa-journey2-canvas">
            {stages.map((s, i) => (
              <div key={i} className={`fa-journey2-card${i === active ? ' active' : ''}`}>
                <span className="ic-wrap">{s.icon}</span>
                <h4>{s.card.title}</h4>
                <p>{s.card.sub}</p>
                <div className="rows">
                  {s.card.rows.map((row, j) => (
                    <div className="row" key={j}>
                      <span>{row.label}</span>
                      <span className={`v${row.tone === 'green' ? ' green' : ''}`}>{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
