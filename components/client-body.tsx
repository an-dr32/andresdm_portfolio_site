'use client';

import { ThemeProvider } from './theme-provider';

export function ClientBody({ children }: { children: React.ReactNode }) {
  return (
    <body className="font-sans antialiased">
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </body>
  );
}
