import { useInView } from '../hooks/useInView';
import { Check, ArrowRight } from 'lucide-react';

const sidebarOps = [
  { label: 'Dashboard', active: true, badge: null },
  { label: 'Shipments', active: false, badge: 128 },
  { label: 'Inventory', active: false, badge: null },
  { label: 'Analytics', active: false, badge: null },
];
const sidebarSettings = [
  { label: 'Integrations', active: false, badge: null },
  { label: 'Team', active: false, badge: null },
];

const kpis = [
  { label: 'Orders today', value: '2,841', delta: '12.4%', positive: true },
  { label: 'Shipped', value: '2,604', delta: '8.1%', positive: true },
  { label: 'On-time SLA', value: '99.8%', delta: '0.4 pts', positive: true },
  { label: 'Avg. label cost', value: '$6.42', delta: '$0.18', positive: false },
];

const chartPoints = [30, 45, 35, 55, 48, 62, 58, 75, 68, 82, 78, 90];

const shipments = [
  { id: 'FA-30482', name: 'Olivia Martin', status: 'In transit', color: '#ff6b35', time: '12m ago' },
  { id: 'FA-30481', name: 'Daniel Chen', status: 'Delivered', color: '#22c55e', time: '1h ago' },
  { id: 'FA-30480', name: 'Priya Reddy', status: 'In transit', color: '#ff6b35', time: '2h ago' },
  { id: 'FA-30479', name: 'Marcus Webb', status: 'Picking', color: '#8a8a9a', time: '2h ago' },
  { id: 'FA-30478', name: 'Sara Lindgren', status: 'Delivered', color: '#22c55e', time: '3h ago' },
];

export default function DashboardPreview() {
  const { ref, isInView } = useInView(0.15);

  return (
    <section ref={ref} className="bg-[#f5f5f0] section-padding">
      <div className="container-main">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          {/* Left Column */}
          <div className="lg:col-span-2 lg:pt-8">
            <span className="eyebrow-label block mb-4" style={{ opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 500ms ease-out' }}>
              The Platform
            </span>
            <h2 className="font-display font-bold text-[28px] sm:text-[36px] lg:text-[48px] text-[#1a1a3e] leading-[1.1]" style={{ opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 600ms ease-out 100ms' }}>
              One dashboard. Every package, always.
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#6b6b7b] leading-relaxed" style={{ opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 500ms ease-out 200ms' }}>
              Real-time visibility for your operations team. Beautiful tracking pages for your customers. APIs for everyone else.
            </p>
            <ul className="mt-6 space-y-2.5">
              {[
                'Live inventory counts across all locations',
                'Automated reorder alerts before stock runs low',
                'Shipment tracking from dock to doorstep',
              ].map((item, i) => (
                <li key={item} className="flex items-start gap-3 text-sm text-[#6b6b7b]" style={{ opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(10px)', transition: `all 400ms ease-out ${300 + i * 100}ms` }}>
                  <Check size={16} className="text-[#ff6b35] mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <a href="#" className="btn-primary mt-8 inline-flex" style={{ opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 400ms ease-out 500ms' }}>
              Explore the Platform
              <ArrowRight size={16} />
            </a>
          </div>

          {/* Right Column - Dashboard */}
          <div className="lg:col-span-3" style={{ opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(30px)', transition: 'all 600ms ease-out 200ms' }}>
            <div className="rounded-xl overflow-hidden bg-white" style={{ boxShadow: '0 24px 48px rgba(26,26,62,0.12)' }}>
              {/* Browser chrome */}
              <div className="h-9 bg-[#f0f0f0] flex items-center px-3 gap-2">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                </div>
                <div className="flex-1 flex justify-center">
                  <span className="text-[11px] text-[#8a8a9a] bg-white/80 px-3 py-0.5 rounded-md font-mono">
                    app.fastaccess.io / operations
                  </span>
                </div>
              </div>

              {/* Dashboard body */}
              <div className="flex" style={{ minHeight: 380 }}>
                {/* Sidebar */}
                <div className="w-44 bg-white border-r border-[#f0f0f0] p-3 hidden sm:block">
                  <div className="text-[9px] font-semibold text-[#8a8a9a] uppercase tracking-[0.1em] mb-2 px-2">Operations</div>
                  {sidebarOps.map((item) => (
                    <div key={item.label} className={`flex items-center justify-between px-2 py-1.5 text-[12px] rounded-md cursor-default ${item.active ? 'bg-[#1a1a3e] text-[#f5f5f0] font-medium' : 'text-[#6b6b7b] hover:bg-[#f5f5f0]'}`}>
                      {item.label}
                      {item.badge && <span className="text-[9px] bg-[#ff6b35] text-white px-1.5 py-0.5 rounded-full font-medium">{item.badge}</span>}
                    </div>
                  ))}
                  <div className="text-[9px] font-semibold text-[#8a8a9a] uppercase tracking-[0.1em] mb-2 mt-4 px-2">Settings</div>
                  {sidebarSettings.map((item) => (
                    <div key={item.label} className="flex items-center justify-between px-2 py-1.5 text-[12px] text-[#6b6b7b] rounded-md hover:bg-[#f5f5f0] cursor-default">
                      {item.label}
                    </div>
                  ))}
                </div>

                {/* Main */}
                <div className="flex-1 p-4">
                  {/* KPIs */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {kpis.map((kpi) => (
                      <div key={kpi.label} className="bg-white border border-[#f0f0f0] rounded-lg p-3">
                        <div className="text-[10px] font-medium text-[#8a8a9a] uppercase tracking-wide">{kpi.label}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="font-mono text-lg text-[#1a1a3e]">{kpi.value}</span>
                          <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${kpi.positive ? 'bg-[#dcfce7] text-[#166534]' : 'bg-[#fee2e2] text-[#991b1b]'}`}>
                            {kpi.positive ? '▲' : '▼'} {kpi.delta}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Chart */}
                  <div className="bg-white border border-[#f0f0f0] rounded-lg p-3 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-[#1a1a3e]">Shipments volume</span>
                      <div className="flex gap-0.5">
                        {['1D', '7D', '30D', '1Y'].map((period) => (
                          <span key={period} className={`text-[9px] px-2 py-0.5 rounded cursor-default ${period === '1Y' ? 'bg-[#1a1a3e] text-[#f5f5f0]' : 'text-[#8a8a9a] hover:bg-[#f5f5f0]'}`}>{period}</span>
                        ))}
                      </div>
                    </div>
                    <svg viewBox="0 0 400 100" className="w-full h-20">
                      <defs>
                        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#ff6b35" stopOpacity="0.2" />
                          <stop offset="100%" stopColor="#ff6b35" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path d={`M0,100 ${chartPoints.map((p, i) => `L${(i / (chartPoints.length - 1)) * 400},${100 - (p / 100) * 100}`).join(' ')} L400,100 Z`} fill="url(#chartGrad)" />
                      <polyline points={chartPoints.map((p, i) => `${(i / (chartPoints.length - 1)) * 400},${100 - (p / 100) * 100}`).join(' ')} fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>

                  {/* Recent shipments */}
                  <div>
                    <div className="text-[10px] font-semibold text-[#8a8a9a] uppercase tracking-wide mb-2">Recent shipments</div>
                    <div className="space-y-1.5">
                      {shipments.map((s) => (
                        <div key={s.id} className="flex items-center justify-between text-[11px]">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="font-mono text-[10px] text-[#8a8a9a] flex-shrink-0">{s.id}</span>
                            <span className="text-[#1a1a3e] truncate">{s.name}</span>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className="px-1.5 py-0.5 rounded-full text-[9px] font-medium" style={{ backgroundColor: s.color + '15', color: s.color }}>{s.status}</span>
                            <span className="text-[10px] text-[#8a8a9a] hidden sm:inline">{s.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
