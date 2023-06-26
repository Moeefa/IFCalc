'use client';

import { SessionProvider } from 'next-auth/react';
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <NextThemesProvider>
        <NextUIProvider>
          {children}
        </NextUIProvider>
      </NextThemesProvider>
    </SessionProvider>
  )
}
