import * as React from 'react'
import type { Metadata } from 'next'
import StoreProvider from '@/common/store/provider-store'
import { ThemeWrapper } from '@/common/store/provider-theme'
import { lightTheme } from '@/styles/theme'
import '../styles/global.sass'
import Header from '@/components/Header/Header'

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
          <ThemeWrapper theme={lightTheme}>
            <Header />
            {children}
          </ThemeWrapper>
        </StoreProvider>
      </body>
    </html>
  )
}
