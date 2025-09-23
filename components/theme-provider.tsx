'use client';

import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    // Default to light if no stored preference
    setTheme(storedTheme ?? 'light');
    setMounted(true);
  }, []);

  // Apply theme changes
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  // Keep in sync if localStorage changes (other tabs) or our app dispatches a themechange event
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'theme' && e.newValue) {
        const next = e.newValue as Theme;
        setTheme(next);
      }
    };
    const onThemeChange = () => {
      const stored = (localStorage.getItem('theme') as Theme | null) ?? 'light';
      setTheme(stored);
    };
    window.addEventListener('storage', onStorage);
    window.addEventListener('themechange', onThemeChange as EventListener);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('themechange', onThemeChange as EventListener);
    };
  }, []);

  // Don't render the children until we know the theme to prevent flash
  if (!mounted) {
    return null;
  }

  return (
    <>
      {children}
    </>
  );
}
