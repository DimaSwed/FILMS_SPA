import React, { FC } from 'react'
import { AppBar, Box, Button, CssBaseline, Stack, Toolbar, Typography } from '@mui/material'
import { SettingsButton } from '../UI/SettingsButton'
import Link from 'next/link'
import Image from 'next/image'
import ChangeThemeButton from '../UI/ChangeThemeButton'

const Header: FC = () => {
  return (
    <Stack direction="row">
      <CssBaseline />
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: 'primary.main',
          backgroundImage: 'none',
          padding: '15px 30px 15px 30px',
          display: 'flex',
          gap: 2,
          alignItems: 'center',
          justifyContent: 'space-between',
          margin: '0 auto',
          width: '100%'
        }}
      >
        <Box
          component={'div'}
          sx={{
            display: 'flex',
            gap: 2,
            alignItems: 'center',
            justifyContent: 'space-between',
            margin: '0 auto',
            width: '100%'
          }}
        >
          <Box component={'div'}>
            <Link
              href="/"
              passHref
              style={{ display: 'flex', gap: 10, alignItems: 'center', textDecoration: 'none' }}
            >
              <Image
                src="/images/logo.jpg"
                alt="logo"
                width="70"
                height="50"
                style={{ borderRadius: '20px' }}
              ></Image>
              <Typography variant="h6" style={{ flexGrow: 1, fontWeight: 'bold', color: 'white' }}>
                КиноТрекер
              </Typography>
            </Link>
          </Box>

          <Box component={'div'} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <ChangeThemeButton />
          </Box>

          <Box component={'div'} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Link href="/login" passHref>
              <Button sx={{ color: 'primary.contrastText' }}>Войти</Button>
            </Link>
            <Link href="/register" passHref>
              <Button sx={{ color: 'primary.contrastText' }}>Регистрация</Button>
            </Link>
            <Link href="/settings" passHref>
              <SettingsButton />
            </Link>
          </Box>
        </Box>
      </AppBar>
    </Stack>
  )
}

export default Header
