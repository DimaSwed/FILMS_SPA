'use client'

import { FC } from 'react'
import { Box, Typography, Avatar, Stack, Divider } from '@mui/material'
import Head from 'next/head'
import Link from 'next/link'

const UserProfile: FC = () => {
  return (
    <>
      <Head>
        <Link rel="icon" href="/favicon.ico" />
        <meta property="og:image" content="/logomain.jpg" />
      </Head>
      <Stack
        sx={{
          padding: { xs: '10px', sm: '15px', md: '30px' },
          color: 'secondary.contrastText',
          bgcolor: 'background.paper',
          width: '100%'
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Avatar
            alt="User Avatar"
            src="/images/avaswed.JPG"
            sx={{ width: 100, height: 100, mx: 'auto', mb: 2 }}
          />
          <Typography variant="h4">Dima SWED</Typography>
          <Typography variant="body1" color="secondary.contrastText">
            @dimaswed
          </Typography>
          <Typography variant="body2">swed88@mail.ru</Typography>
          <Typography variant="body2" mb={1}>
            Авторизация с помощью :
          </Typography>
          <Typography variant="body2" color="secondary.contrastText">
            0 Подписчиков • 0 Подписок
          </Typography>
        </Box>

        <Divider sx={{ backgroundColor: '#444' }} />

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            История
          </Typography>
          <Typography variant="body1" color="secondary.contrastText">
            Добавьте несколько телешоу и фильмов в историю просмотров, и они появятся здесь.
          </Typography>
        </Box>

        <Divider sx={{ backgroundColor: '#444', my: 4 }} />

        <Box>
          <Typography variant="h5" gutterBottom>
            Избранные
          </Typography>
          <Typography variant="body1" color="secondary.contrastText">
            У вас пока нет избранных.
          </Typography>
        </Box>

        <Divider sx={{ backgroundColor: '#444', my: 4 }} />

        <Box>
          <Typography variant="h5" gutterBottom>
            Рейтинги
          </Typography>
          <Typography variant="body1" color="secondary.contrastText">
            Вы еще ничего не оценили.
          </Typography>
        </Box>

        <Divider sx={{ backgroundColor: '#444', my: 4 }} />

        <Box>
          <Typography variant="h5" gutterBottom>
            Просмотренные фильмы
          </Typography>
          <Typography variant="body1" color="secondary.contrastText">
            Вы еще не смотрели ни одного фильма.
          </Typography>
        </Box>

        <Divider sx={{ backgroundColor: '#444', my: 4 }} />

        <Box>
          <Typography variant="h5" gutterBottom>
            Просмотренные сериалы
          </Typography>
          <Typography variant="body1" color="secondary.contrastText">
            Вы еще не смотрели ни одного сериала.
          </Typography>
        </Box>
      </Stack>
    </>
  )
}

export default UserProfile
