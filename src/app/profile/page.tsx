'use client'

import { FC } from 'react'
import { Box, Typography, Avatar, Stack, Divider } from '@mui/material'

const UserProfile: FC = () => {
  return (
    <Stack
      sx={{ padding: '30px', color: 'text.primary', bgcolor: 'background.default', width: '100%' }}
    >
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Avatar
          alt="User Avatar"
          src="/images/avaswed.JPG"
          sx={{ width: 100, height: 100, mx: 'auto', mb: 2 }}
        />
        <Typography variant="h4">Dima SWED</Typography>
        <Typography variant="body1" color="textSecondary">
          @dimaswed
        </Typography>
        <Typography variant="body2" color="textSecondary">
          0 Подписчиков • 0 Подписок
        </Typography>
      </Box>

      <Divider sx={{ backgroundColor: '#444' }} />

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          История
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Добавьте несколько телешоу и фильмов в историю просмотров, и они появятся здесь.
        </Typography>
      </Box>

      <Divider sx={{ backgroundColor: '#444', my: 4 }} />

      <Box>
        <Typography variant="h5" gutterBottom>
          Избранные
        </Typography>
        <Typography variant="body1" color="textSecondary">
          У вас пока нет избранных.
        </Typography>
      </Box>

      <Divider sx={{ backgroundColor: '#444', my: 4 }} />

      <Box>
        <Typography variant="h5" gutterBottom>
          Рейтинги
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Вы еще ничего не оценили.
        </Typography>
      </Box>

      <Divider sx={{ backgroundColor: '#444', my: 4 }} />

      <Box>
        <Typography variant="h5" gutterBottom>
          Просмотренные фильмы
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Вы еще не смотрели ни одного фильма.
        </Typography>
      </Box>

      <Divider sx={{ backgroundColor: '#444', my: 4 }} />

      <Box>
        <Typography variant="h5" gutterBottom>
          Просмотренные сериалы
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Вы еще не смотрели ни одного сериала.
        </Typography>
      </Box>
    </Stack>
  )
}

export default UserProfile
