import { FC } from 'react'
import GenreFilter from '@/app/search/components/GenreFilter'
import { Box, Typography } from '@mui/material'

const SearchMoviesByGenres: FC = () => {
  return (
    <Box
      component="main"
      minHeight={'100%'}
      sx={{
        padding: { xs: '10px', sm: '15px', md: '30px' },
        color: 'secondary.contrastText',
        bgcolor: 'background.paper',
        width: '100%',
        overflow: 'hidden'
      }}
    >
      <Typography variant="h3" gutterBottom textAlign={'center'} mb={5}>
        Поиск фильма
      </Typography>

      <GenreFilter />
    </Box>
  )
}

export default SearchMoviesByGenres
