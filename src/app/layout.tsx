import * as React from 'react'
import type { Metadata } from 'next'
import StoreProvider from '@/common/store/provider-store'
import { ThemeWrapper } from '@/common/store/provider-theme'
import { lightTheme } from '@/styles/theme'
import Header from '@/components/Header/Header'
import Sidebar from '@/components/Sidebar/Sidebar'
import { Box } from '@mui/material'
import '../styles/global.sass'
import Cookies from 'js-cookie'

export const metadata: Metadata = {
  metadataBase: new URL('https://films-spa-dimas-projects-c1a0dfa7.vercel.app'),
  icons: '/public/logomain.jpg',
  title: 'Films App',
  description: 'My films unwatched list App',
  openGraph: {
    title: 'Films App',
    description: 'My films unwatched list App',
    url: 'https://films-spa-dimas-projects-c1a0dfa7.vercel.app',
    images: ['/public/logomain.jpg']
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const initialTheme = Cookies.get('theme') || 'light'

  return (
    <html lang="ru">
      <body>
        <StoreProvider>
          {/* <ThemeWrapper theme={lightTheme}> */}
          <ThemeWrapper theme={initialTheme}>
            <Header />
            <Box sx={{ display: 'flex' }}>
              {children}
              <Sidebar />
            </Box>
          </ThemeWrapper>
        </StoreProvider>
      </body>
    </html>
  )
}
