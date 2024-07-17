// 'use client'
// import React, { FC, useEffect } from 'react'
// import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
// import DarkModeIcon from '@mui/icons-material/DarkMode'
// import LightModeIcon from '@mui/icons-material/LightMode'
// import { themeReducer } from '@/common/store'
// import { useAppDispatch, useAppSelector } from '@/common/store/hooks'
// import Cookies from 'js-cookie'
// // import dynamic from 'next/dynamic'

// // const DarkModeIcon = dynamic(() => import('@mui/icons-material/DarkMode'), { ssr: false })
// // const LightModeIcon = dynamic(() => import('@mui/icons-material/LightMode'), { ssr: false })

// const ChangeThemeButton: FC = () => {
//   const dispatch = useAppDispatch()
//   const darkTheme = useAppSelector((store) => store.theme.theme) === 'dark'

//   useEffect(() => {
//     const storedTheme = Cookies.get('theme')
//     if (storedTheme) {
//       dispatch(themeReducer(storedTheme))
//     }
//   }, [dispatch])

//   const toggleTheme = () => {
//     const newTheme = darkTheme ? 'light' : 'dark'
//     dispatch(themeReducer(newTheme))
//     Cookies.set('theme', newTheme, { sameSite: 'None', secure: true })
//   }

//   return (
//     <ListItem disablePadding sx={{ display: 'block' }}>
//       <ListItemButton
//         onClick={toggleTheme}
//         sx={{
//           minHeight: 48,
//           px: 2,
//           display: 'flex',
//           gap: 2,
//           backgroundColor: 'primary.light',
//           borderRadius: '20px'
//         }}
//       >
//         <ListItemIcon
//           sx={{
//             minWidth: 0,
//             justifyContent: 'center',
//             color: 'text.primary'
//           }}
//         >
//           {darkTheme ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
//         </ListItemIcon>
//         <ListItemText color="text.primary">
//           {darkTheme ? `${'Светлая тема'}` : `${'Темная тема'}`}
//         </ListItemText>
//       </ListItemButton>
//     </ListItem>
//   )
// }

// export default ChangeThemeButton

'use client'
import React, { FC, useEffect, useState } from 'react'
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import Cookies from 'js-cookie'
import { useAppDispatch, useAppSelector } from '@/common/store/hooks'
import { themeReducer } from '@/common/store'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'

const ChangeThemeButton: FC = () => {
  const dispatch = useAppDispatch()
  const darkTheme = useAppSelector((store) => store.theme.theme) === 'dark'
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const storedTheme = Cookies.get('theme')
    if (storedTheme) {
      dispatch(themeReducer(storedTheme))
    }
  }, [dispatch])

  const toggleTheme = () => {
    const newTheme = darkTheme ? 'light' : 'dark'
    dispatch(themeReducer(newTheme))
    Cookies.set('theme', newTheme, { sameSite: 'None', secure: true })
  }

  if (!isMounted) return null

  return (
    <ListItem disablePadding sx={{ display: 'block' }}>
      <ListItemButton
        onClick={toggleTheme}
        sx={{
          minHeight: 48,
          px: 2,
          display: 'flex',
          gap: 2,
          backgroundColor: 'primary.light',
          borderRadius: '20px'
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            justifyContent: 'center',
            color: 'text.primary'
          }}
        >
          {darkTheme ? <LightModeIcon /> : <DarkModeIcon />}
        </ListItemIcon>
        <ListItemText
          color="text.primary"
          sx={{
            display: { xs: 'none', sm: 'none', md: 'block' }
          }}
        >
          {darkTheme ? 'Светлая тема' : 'Темная тема'}
        </ListItemText>
      </ListItemButton>
    </ListItem>
  )
}

export default ChangeThemeButton
