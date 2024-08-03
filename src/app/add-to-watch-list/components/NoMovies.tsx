import { Box, Typography } from '@mui/material'
import { FC } from 'react'

const NoMovies: FC = () => (
  <Box textAlign="center">
    <Typography variant="h5">Нет фильмов к просмотру</Typography>
    <Typography variant="body1">
      Найдите фильмы и сериалы и добавьте их к просмотру, чтобы напомнить себе посмотреть их позже.
    </Typography>
  </Box>
)

export default NoMovies
