import React, { FC } from 'react'
import { AppBar, Box, Button, CssBaseline, Stack, Typography } from '@mui/material'
import { SettingsButton } from './components/SettingsButton'
import { ChangeThemeButton } from './components/ChangeThemeButton'
import Link from 'next/link'
import Image from 'next/image'
import SearchMovieButton from './components/SearchMovieButton'

const Header: FC = () => {
  return (
    <Stack direction="row">
      <CssBaseline />
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: 'primary.main',
          backgroundImage: 'none',
          padding: { xs: '15px', md: '15px 30px', lg: '15px 30px' },
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
              />
              <Typography variant="h6" style={{ flexGrow: 1, fontWeight: 'bold', color: 'white' }}>
                КиноТрекер
              </Typography>
            </Link>
          </Box>

          <Box component={'div'} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <ChangeThemeButton />
          </Box>

          <Box
            component={'div'}
            sx={{ display: { xs: 'none', sm: 'flex' }, gap: 3, alignItems: 'center' }}
          >
            <Stack
              sx={{
                flexDirection: 'row',
                display: { xs: 'none', sm: 'flex' }
              }}
            >
              <Link href="/login" passHref>
                <Button sx={{ color: 'primary.contrastText' }}>Войти</Button>
              </Link>
              <Link href="/register" passHref>
                <Button sx={{ color: 'primary.contrastText' }}>Регистрация</Button>
              </Link>
            </Stack>
          </Box>
          <Stack
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              gap: 2
            }}
          >
            <SearchMovieButton />
            <Link href="/settings" passHref>
              <SettingsButton />
            </Link>
          </Stack>
        </Box>
      </AppBar>
    </Stack>
  )
}

export default Header
