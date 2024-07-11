'use client'
import { Roboto } from 'next/font/google'
import { createTheme, ThemeOptions } from '@mui/material/styles'

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap'
})

const commonSettings: ThemeOptions = {
  breakpoints: { values: { xs: 360, sm: 600, md: 900, lg: 1200, xl: 1440 } },
  typography: {
    fontFamily: roboto.style.fontFamily,
    h1: {
      fontSize: '100px',
      transition: 'font-size 2s ease',
      '@media (max-width:1200px)': { fontSize: '80px' },
      '@media (max-width:900px)': { fontSize: '65px' },
      '@media (max-width:600px)': { fontWeight: 500, fontSize: '50px' },
      fontWeight: 400,
      fontStyle: 'normal',
      lineHeight: '130%',
      textTransform: 'none'
    },
    h2: {
      fontSize: '85px',
      transition: 'font-size 2s ease',
      '@media (max-width:1200px)': { fontSize: '70px' },
      '@media (max-width:900px)': { fontSize: '50px' },
      '@media (max-width:600px)': { fontSize: '35px' },
      fontWeight: 400,
      fontStyle: 'normal',
      lineHeight: '130%',
      letterSpacing: 0,
      textTransform: 'none'
    },
    h3: {
      fontSize: '70px',
      transition: 'font-size 2s ease',
      '@media (max-width:1200px)': { fontSize: '60px' },
      '@media (max-width:900px)': { fontSize: '40px' },
      '@media (max-width:600px)': { fontSize: '30px' },
      fontWeight: 400,
      fontStyle: 'normal',
      lineHeight: '42px',
      letterSpacing: 0,
      textTransform: 'none'
    },
    h4: {
      fontSize: '55px',
      transition: 'font-size 2s ease',
      '@media (max-width:1200px)': { fontSize: '35px' },
      '@media (max-width:900px)': { fontSize: '30px' },
      '@media (max-width:600px)': { fontSize: '25px' },
      fontWeight: 500,
      fontStyle: 'normal',
      letterSpacing: 0,
      textTransform: 'none'
    },
    h5: {
      fontSize: '40px',
      transition: 'font-size 2s ease',
      '@media (max-width:1200px)': { fontSize: '25px' },
      '@media (max-width:900px)': { fontSize: '20px' },
      '@media (max-width:600px)': { fontSize: '16px' },
      fontWeight: 400,
      fontStyle: 'normal',
      lineHeight: '130%',
      textTransform: 'none',
      letterSpacing: 0,
      textDecoration: 'none'
    },
    h6: {
      fontFamily: 'Open Sans, sans-serif',
      fontSize: '25px',
      transition: 'font-size 2s ease',
      '@media (max-width:1200px)': { fontSize: '18px' },
      '@media (max-width:900px)': { fontSize: '16px' },
      '@media (max-width:600px)': { fontSize: '14px' },
      fontWeight: 400,
      fontStyle: 'normal',
      lineHeight: '130%',
      textTransform: 'none',
      textDecoration: 'none'
    }
  }
}

const lightTheme = createTheme({
  ...commonSettings,
  palette: {
    mode: 'light',
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff'
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000'
    }
  }
})

const darkTheme = createTheme({
  ...commonSettings,
  palette: {
    mode: 'dark',
    primary: {
      light: '#7986cb', // светлый оттенок синего
      main: '#303f9f', // более насыщенный и темный синий
      dark: '#1a237e', // очень темный синий, почти черный
      contrastText: '#fff' // белый текст для контраста
    },
    secondary: {
      light: '#ff5131', // светлый оттенок красного
      main: '#d50000', // насыщенный красный
      dark: '#9b0000', // темный красный
      contrastText: '#fff' // белый текст для контраста
    }
  }
})

export { darkTheme, lightTheme }
