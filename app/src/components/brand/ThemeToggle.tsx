import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../i18n/ThemeContext';

export default function ThemeToggle({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const { theme, toggle } = useTheme();
  const color = tone === 'dark' ? 'text-fa-classic-chalk/70 hover:text-fa-classic-chalk' : 'text-fa-ink-muted hover:text-fa-liberty-blue';
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      className={`p-1.5 transition-colors ${color}`}
    >
      {theme === 'dark' ? <Sun size={14} strokeWidth={2} /> : <Moon size={14} strokeWidth={2} />}
    </button>
  );
}
