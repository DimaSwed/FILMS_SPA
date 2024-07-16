// 'use client'
// import { FC, ReactNode, useEffect, useState } from 'react'
// import { useAppSelector } from './hooks'
// import { ThemeProvider } from '@emotion/react'
// import { CssBaseline } from '@mui/material'
// import { darkTheme, lightTheme } from '@/styles/theme'

// interface ProviderThemeProps {
//   children: ReactNode
//   theme?: any
// }

// export const ThemeWrapper: FC<ProviderThemeProps> = ({ children, theme }) => {
//   const currentTheme = useAppSelector((state) => state.theme.theme)

//   const [mount, setMount] = useState(false)
//   const [selectedTheme, setSelectedTheme] = useState(theme)

//   useEffect(() => {
//     if (!mount) {
//       setMount(true)
//       return
//     }
//     if (currentTheme !== selectedTheme) {
//       setSelectedTheme(currentTheme)
//     }
//   }, [currentTheme, selectedTheme, mount, theme])

//   const newSelectedTheme = selectedTheme === 'light' ? lightTheme : darkTheme

//   return (
//     <ThemeProvider theme={newSelectedTheme}>
//       <CssBaseline />
//       {children}
//     </ThemeProvider>
//   )
// }
'use client'
import { FC, ReactNode, useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from './hooks'
import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import { darkTheme, lightTheme } from '@/styles/theme'
import Cookies from 'js-cookie'
import { themeReducer } from '@/common/store'

interface ProviderThemeProps {
  children: ReactNode
  theme?: string
}

export const ThemeWrapper: FC<ProviderThemeProps> = ({ children, theme }) => {
  const dispatch = useAppDispatch()
  const currentTheme = useAppSelector((state) => state.theme.theme)
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null)

  useEffect(() => {
    const storedTheme = Cookies.get('theme') || theme || 'light'
    setSelectedTheme(storedTheme)
    if (storedTheme) {
      dispatch(themeReducer(storedTheme))
    }
  }, [theme, dispatch])

  useEffect(() => {
    if (currentTheme && currentTheme !== selectedTheme) {
      setSelectedTheme(currentTheme)
      Cookies.set('theme', currentTheme, { sameSite: 'None', secure: true })
    }
  }, [currentTheme, selectedTheme])

  if (!selectedTheme) return null

  const newSelectedTheme = selectedTheme === 'light' ? lightTheme : darkTheme

  return (
    <ThemeProvider theme={newSelectedTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
