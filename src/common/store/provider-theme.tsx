'use client'
import { FC, ReactNode, useEffect, useState } from 'react'
import { useAppSelector } from './hooks'
import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import { darkTheme, lightTheme } from '@/styles/theme'

interface ProviderThemeProps {
  children: ReactNode
  theme?: any
}

export const ThemeWrapper: FC<ProviderThemeProps> = ({ children, theme }) => {
  const currentTheme = useAppSelector((state) => state.theme.theme)

  const [mount, setMount] = useState(false)
  const [selectedTheme, setSelectedTheme] = useState(theme)

  useEffect(() => {
    if (!mount) {
      setMount(true)
      return
    }
    if (currentTheme !== selectedTheme) {
      setSelectedTheme(currentTheme)
    }
  }, [currentTheme, selectedTheme, mount, theme])

  const newSelectedTheme = selectedTheme === 'light' ? lightTheme : darkTheme

  return (
    <ThemeProvider theme={newSelectedTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
