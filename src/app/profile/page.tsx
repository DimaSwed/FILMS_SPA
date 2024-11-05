'use client'

import { FC } from 'react'
import { Box, Typography, Avatar, Stack, Divider } from '@mui/material'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import avatar from '/public/avatar.png'
import { useGetUserDetailsQuery } from '@/common/services/moviesApiTMDB'
import { useSelector } from 'react-redux'
import { RootState } from '@/common/store'

const UserProfile: FC = () => {
  const sessionId = useSelector((state: RootState) => state.auth.sessionId)
  const {
    data: user,
    error,
    isLoading
  } = useGetUserDetailsQuery(sessionId!, {
    skip: !sessionId // пропускает запрос, если sessionId не определен
  })

  if (isLoading) return <Typography>Loading...</Typography>
  if (error) {
    const errorMessage =
      'status' in error && error.data ? error.data.toString() : 'An error occurred'
    return <Typography>Error: {errorMessage}</Typography>
  }

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
          {user?.avatar?.gravatar?.hash ? (
            <Avatar
              src={`https://www.gravatar.com/avatar/${user.avatar.gravatar.hash}`}
              alt={`${user.name}'s avatar`}
              style={{ margin: '0 auto 10px auto', width: '90px', height: '90px' }}
            />
          ) : (
            <Avatar
              src="/avatar.png"
              alt="User Avatar"
              sx={{ width: 100, height: 100, mx: 'auto', mb: '5px' }}
            />
          )}
          <Typography variant="h4">{user?.name || 'Неизвестно'}</Typography>
          <Typography variant="body1" color="secondary.contrastText">
            ID пользователя: {user?.id}
          </Typography>
          <Typography variant="body2"> {user?.email && user.email}</Typography>
          <Typography variant="body2" mb={1}>
            Авторизация с помощью : {user?.tmdb?.avatar_path == null ? 'TMDB' : ''}
          </Typography>
          <Typography variant="body2" mb={1}>
            Язык: {user?.iso_639_1}
          </Typography>
          <Typography variant="body2" mb={1}>
            Страна: {user?.iso_3166_1}
          </Typography>
          <Typography variant="body2" mb={1}>
            Имя пользователя: {user?.username}
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
