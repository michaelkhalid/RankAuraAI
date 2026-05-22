import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    // Check initial dark mode from localStorage or device
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('rankaura-theme');
      if (saved === 'light' || saved === 'dark') {
        return saved;
      }
      return 'dark'; // Cool cosmic dark mode by default for premium feel
    }
    return 'dark';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('rankaura-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <button
      id="theme-toggler"
      onClick={toggleTheme}
      className="p-2 mr-1 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-colors focus:outline-none border border-slate-200/50 dark:border-zinc-800/80 cursor-pointer"
      title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
      aria-label="Toggle Theme"
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5 text-purple-600" />
      ) : (
        <Sun className="w-5 h-5 text-yellow-500 animate-pulse" />
      )}
    </button>
  );
}
