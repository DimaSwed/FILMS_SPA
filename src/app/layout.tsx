import * as React from 'react'
import type { Metadata } from 'next'
import StoreProvider from '@/store/provider-store'
import { ThemeWrapper } from '@/store/provider-theme'
import { lightTheme } from '@/styles/theme'
import '../styles/global.sass'

export const metadata: Metadata = {
  // metadataBase: new URL(''),
  icons: '',
  title: 'Films App',
  description: 'My films unwatched list App',
  openGraph: {
    title: 'Films App',
    description: 'My films unwatched list App',
    url: '',
    images: ['']
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body>
        <StoreProvider>
          <ThemeWrapper theme={lightTheme}>{children}</ThemeWrapper>
        </StoreProvider>
      </body>
    </html>
  )
}
