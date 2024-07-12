import { AppBar, Box, Button, CssBaseline, Stack, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { SettingsButton } from '../UI/SettingsButton'
import Link from 'next/link'
import Image from 'next/image'

const Header = () => {
  return (
    <Stack direction="row">
      <CssBaseline />
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: 'primary.main',
          backgroundImage: 'none',
          padding: '15px 30px 15px 30px', // Убедиться, что здесь нет необходимости в дополнительной высоте
          display: 'flex',
          gap: 2,
          alignItems: 'center',
          justifyContent: 'space-between',
          margin: '0 auto',
          width: '100%'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            alignItems: 'center',
            justifyContent: 'space-between',
            margin: '0 auto',
            width: '100%'
          }}
        >
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Image
              src="/images/logo.jpg"
              alt="logo"
              width="70"
              height="50"
              style={{ borderRadius: '20px' }}
            ></Image>
            <Typography variant="h6" style={{ flexGrow: 1, fontWeight: 'bold' }}>
              КиноТрекер
            </Typography>
          </Box>
          {/* <Navbar /> */}

          {/* <Toolbar sx={{ gap: 3 }}>
            <Link href="/films" passHref>
              <Button sx={{ color: 'primary.contrastText', fontSize: '16px', fontWeight: 'bold' }}>
                Фильмы
              </Button>
            </Link>
            <Link href="/addfilm" passHref>
              <Button sx={{ color: 'primary.contrastText', fontSize: '16px', fontWeight: 'bold' }}>
                Добавить
              </Button>
            </Link>
            <Link href="/watched" passHref>
              <Button sx={{ color: 'primary.contrastText', fontSize: '16px', fontWeight: 'bold' }}>
                Просмотрено
              </Button>
            </Link>
          </Toolbar> */}

          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Link href="/login" passHref>
              <Button sx={{ color: 'primary.contrastText' }}>Войти</Button>
            </Link>
            <Link href="/register" passHref>
              <Button sx={{ color: 'primary.contrastText' }}>Регистрация</Button>
            </Link>
            <SettingsButton />
          </Box>
        </Box>
      </AppBar>
    </Stack>
  )
}

export default Header
