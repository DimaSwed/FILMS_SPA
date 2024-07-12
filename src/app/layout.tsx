import * as React from 'react'
import type { Metadata } from 'next'
import StoreProvider from '@/common/store/provider-store'
import { ThemeWrapper } from '@/common/store/provider-theme'
import { lightTheme } from '@/styles/theme'
import Header from '@/components/Header/Header'
import Sidebar from '@/components/Sidebar/Sidebar'
import { Box } from '@mui/material'
import '../styles/global.sass'

export const metadata: Metadata = {
  metadataBase: new URL('https://films-spa-dimas-projects-c1a0dfa7.vercel.app/'),
  icons: '/public/images/logo_main.png',
  title: 'Films App',
  description: 'My films unwatched list App',
  openGraph: {
    title: 'Films App',
    description: 'My films unwatched list App',
    url: 'https://films-spa-dimas-projects-c1a0dfa7.vercel.app/',
    images: ['/public/images/logo_main.png']
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
            <Box sx={{ display: 'flex' }}>
              <Sidebar />
              {children}
            </Box>
          </ThemeWrapper>
        </StoreProvider>
      </body>
    </html>
  )
}
