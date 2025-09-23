'use client';

import { ThemeProvider } from './theme-provider';
import CommandPalette from './command-palette';

export function ClientBody({ children }: { children: React.ReactNode }) {
  return (
    <body className="font-sans antialiased" suppressHydrationWarning={true}>
      <ThemeProvider>
        {children}
        <CommandPalette />
      </ThemeProvider>
    </body>
  );
}
