'use client'
import React, { FC, useEffect } from 'react'
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import { themeReducer } from '@/common/store'
import { useAppDispatch, useAppSelector } from '@/common/store/hooks'

const ChangeThemeButton: FC = () => {
  const dispatch = useAppDispatch()
  const darkTheme = useAppSelector((store) => store.theme.theme) === 'dark'

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme')
    if (storedTheme) {
      dispatch(themeReducer(storedTheme))
    }
  }, [dispatch])

  const toggleTheme = () => {
    const newTheme = darkTheme ? 'light' : 'dark'
    dispatch(themeReducer(newTheme))
    localStorage.setItem('theme', newTheme)
  }

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
        <ListItemText color="text.primary">
          {darkTheme ? `${'Светлая тема'}` : `${'Темная тема'}`}
        </ListItemText>
      </ListItemButton>
    </ListItem>
  )
}

export default ChangeThemeButton
