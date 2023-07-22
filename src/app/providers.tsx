'use client';

import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from 'next-auth/react';
import { TabContextProvider } from "@/src/context/tab";
import { ThemeProvider } from 'next-themes';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class">
      <SessionProvider>
        <NextUIProvider>
          <TabContextProvider>
            {children}
          </TabContextProvider>
        </NextUIProvider>
      </SessionProvider>
    </ThemeProvider>
  )
}
