import { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, TrendingUp } from 'lucide-react';
import { useT } from '../i18n/I18nContext';

export default function AnnouncementBar() {
  const { locale } = useT();
  const isAr = locale === 'ar';
  const [visible, setVisible] = useState(() => {
    return !sessionStorage.getItem('announcement-dismissed');
  });

  if (!visible) return null;

  const handleDismiss = () => {
    setVisible(false);
    sessionStorage.setItem('announcement-dismissed', 'true');
  };

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[49]"
      style={{
        backgroundColor: 'rgba(13,13,26,0.5)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        animation: 'slideDown 300ms ease-out',
      }}
    >
      <style>{`
        @keyframes slideDown {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
      <div className="container-main flex items-center justify-center min-h-9 py-2 relative">
        <div className="flex items-center justify-center gap-2 text-center max-w-[calc(100%-44px)]">
          <TrendingUp size={12} className="text-[#F15B41] flex-shrink-0" />
          <p className="text-[11px] sm:text-xs text-white/65 leading-snug">
            {isAr
              ? 'توصيل بنفس اليوم داخل المدن الرئيسية — خلّها علينا،'
              : 'Same-day cloud-store delivery is available in major Saudi cities'}
          </p>
          <Link
            to="/contact"
            className="text-xs font-semibold text-[#F15B41] hover:text-[#FB7C65] hover:underline underline-offset-2 transition-all duration-150"
          >
            {isAr ? 'واطلب عرضك' : 'Request quote'}
          </Link>
        </div>
        <button
          onClick={handleDismiss}
          className="absolute end-3 top-1/2 -translate-y-1/2 p-1 text-white/30 hover:text-white/70 transition-colors duration-150"
          aria-label="Dismiss announcement"
        >
          <X size={12} />
        </button>
      </div>
    </div>
  );
}
