import type { Metadata } from 'next'
import './globals.css'
import '@gentleduck/motion/css'
import { cn } from '@gentleduck/libs/cn'
import { ThemeProvider } from '~/components/providers'
import { Toaster } from '@gentleduck/registry-ui-duckui/sonner'
import { ThemeSwitcher } from '~/components/theme-switcher'
import { TailwindIndicator } from '~/components/layouts/tailwind-indicator'
import { KeyProvider } from '@gentleduck/vim/react'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="ltr" suppressHydrationWarning>
      <head>
        <link href="/fonts/Geist-VF.woff2" rel="preload" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link href="/fonts/JetBrainsMono-MD.woff2" rel="preload" as="font" type="font/woff2" crossOrigin="anonymous" />
        <script src="https://unpkg.com/react-scan/dist/auto.global.js" />
      </head>
      <body className={cn('min-h-svh bg-background font-sans antialiased duck')}>
        <KeyProvider timeoutMs={100}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            enableColorScheme>
            <div vaul-drawer-wrapper="">
              <div className="relative flex min-h-svh flex-col bg-background">{children}</div>
            </div>
            <ThemeSwitcher />
            <Toaster />
            {process.env.NODE_ENV === 'development' && <TailwindIndicator />}
          </ThemeProvider>
        </KeyProvider>
      </body>
    </html>
  )
}
