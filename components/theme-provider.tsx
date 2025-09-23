'use client';

import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    // Prefer current document state (set by inline script in layout) for perfect sync on first paint
    const isDocDark = document.documentElement.classList.contains('dark');
    if (isDocDark) {
      setTheme('dark');
    } else {
      const storedTheme = localStorage.getItem('theme') as Theme | null;
      if (storedTheme) {
        setTheme(storedTheme);
      } else {
        // Fallback to system preference if nothing stored (keeps behavior consistent with initial script)
        const prefers = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(prefers ? 'dark' : 'light');
      }
    }
    setMounted(true);
  }, []);

  // Follow system theme changes only if user has not set a preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Apply theme changes
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      window.dispatchEvent(new Event('themechange'));
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      window.dispatchEvent(new Event('themechange'));
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
