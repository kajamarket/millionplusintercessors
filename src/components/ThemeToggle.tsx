import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark') {
        setIsDark(true);
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        setIsDark(false);
        document.documentElement.setAttribute('data-theme', 'light');
      }
    } catch {
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    const nextIsDark = !isDark;
    setIsDark(nextIsDark);
    try {
      if (nextIsDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
      }
    } catch {
      // ignore localStorage errors
    }
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className="relative w-8 h-8 rounded-full flex items-center justify-center text-muted hover:text-text-primary hover:bg-surface transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer shrink-0"
    >
      {mounted ? (
        isDark ? (
          <Sun className="w-4 h-4 text-accent transition-transform duration-300 hover:rotate-45" />
        ) : (
          <Moon className="w-4 h-4 text-heading transition-transform duration-300 hover:-rotate-12" />
        )
      ) : (
        <span className="w-4 h-4 block" aria-hidden="true" />
      )}
    </button>
  );
};
