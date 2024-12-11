'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import React from 'react';

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system">
      {children}
    </NextThemesProvider>
  );
};

export default ThemeProvider;