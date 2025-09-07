'use client';

// This script must be inlined in the <head> of the document
export const themeScript = `
  (function() {
    // Set default theme to light
    let theme = 'light';
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Determine theme
    if (savedTheme) {
      theme = savedTheme;
    } else if (prefersDark) {
      theme = 'dark';
    }
    
    // Apply theme immediately
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.style.setProperty('--bg-color', '#111827');
      document.documentElement.style.setProperty('--text-color', '#f3f4f6');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.setProperty('--bg-color', '#ffffff');
      document.documentElement.style.setProperty('--text-color', '#111827');
    }
    
    // Store the theme in a data attribute for CSS to use
    document.documentElement.setAttribute('data-theme', theme);
  })();
`;

export const setTheme = (theme: 'light' | 'dark') => {
  if (typeof window === 'undefined') return;
  
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
    document.documentElement.style.setProperty('--bg-color', '#111827');
    document.documentElement.style.setProperty('--text-color', '#f3f4f6');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    document.documentElement.style.setProperty('--bg-color', '#ffffff');
    document.documentElement.style.setProperty('--text-color', '#111827');
    localStorage.setItem('theme', 'light');
  }
  document.documentElement.setAttribute('data-theme', theme);
};
