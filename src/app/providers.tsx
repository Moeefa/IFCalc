"use client"

import { SWRConfig } from "swr"
import { ThemeProvider } from "next-themes"

export default function Providers({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
    >
      <SWRConfig
        value={{
          errorRetryCount: 3,
          fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
        }}
      >
        {children}
      </SWRConfig>
    </ThemeProvider>
  )
}