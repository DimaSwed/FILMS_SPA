// import { Box, Typography } from '@mui/material'
// import React, { FC } from 'react'

// const AddToWatchList: FC = () => {
//   return (
//     <Box
//       component="main"
//       minHeight={'100%'}
//       sx={{
//         padding: { xs: '10px', sm: '15px', md: '30px' },
//         color: 'secondary.contrastText',
//         bgcolor: 'background.paper',
//         width: '100%',
//         overflow: 'hidden'
//       }}
//     >
//       <Typography variant="h3" gutterBottom textAlign={'center'} mb={2}>
//         Список к просмотру
//       </Typography>
//     </Box>
//   )
// }

// export default AddToWatchList

'use client'
import {
  Box,
  Typography,
  Select,
  MenuItem,
  Card,
  CardMedia,
  Rating,
  CircularProgress,
  SelectChangeEvent,
  Button
} from '@mui/material'
import React, { FC, useState, useMemo } from 'react'
import {
  useGetWatchlistMoviesQuery,
  useRemoveMovieFromWatchlistMutation
} from '@/common/services/moviesApiTMDB'

export interface Movie {
  id: number
  title: string
  rating: number
  image: string
  year: number
  genre?: string | string[] // Используем массив строк, если это необходимо
  duration: number
}

export interface Genre {
  id: number
  name: string
}

const AddToWatchList: FC = () => {
  const [selectedGenre, setSelectedGenre] = useState<string>('')
  const [selectedYear, setSelectedYear] = useState<string | ''>('')

  const YEARS_LIST = [
    'до 1980',
    '1980-1989',
    '1990-1999',
    '2000-2009',
    '2010-2019',
    '2020',
    '2021',
    '2022',
    '2023',
    '2024'
  ]

  const GENRES_LIST = [
    { id: 28, name: 'Боевик' },
    { id: 12, name: 'Приключения' },
    { id: 16, name: 'Анимация' },
    { id: 35, name: 'Комедия' },
    { id: 80, name: 'Криминал' },
    { id: 18, name: 'Драма' },
    { id: 10751, name: 'Семейный' },
    { id: 14, name: 'Фэнтези' },
    { id: 36, name: 'Исторический' },
    { id: 27, name: 'Ужасы' },
    { id: 10402, name: 'Музыка' },
    { id: 9648, name: 'Детектив' },
    { id: 10749, name: 'Романтика' },
    { id: 878, name: 'Научная фантастика' },
    { id: 10770, name: 'ТВ шоу' },
    { id: 53, name: 'Триллер' },
    { id: 10752, name: 'Военный' },
    { id: 37, name: 'Вестерн' }
  ]

  const {
    data: watchlistMovies,
    isFetching: isFetchingWatchlist,
    isError,
    error
  } = useGetWatchlistMoviesQuery()
  const [removeMovieFromWatchlist] = useRemoveMovieFromWatchlistMutation()

  if (isError) {
    console.error('API Error:', error)
  }
  console.log(watchlistMovies)
  const filteredMovies = useMemo(() => {
    if (!watchlistMovies) return []

    let updatedMovies = [...watchlistMovies]

    if (selectedGenre) {
      updatedMovies = updatedMovies.filter((movie) => {
        if (movie.genre) {
          return movie.genre.includes(selectedGenre)
        } else {
          return false
        }
      })
    }

    if (selectedYear) {
      if (selectedYear === 'до 1980') {
        updatedMovies = updatedMovies.filter((movie) => movie.year < 1980)
      } else if (selectedYear.includes('-')) {
        const [startYear, endYear] = selectedYear.split('-').map(Number)
        updatedMovies = updatedMovies.filter(
          (movie) => movie.year >= startYear && movie.year <= endYear
        )
      } else {
        updatedMovies = updatedMovies.filter((movie) => movie.year === Number(selectedYear))
      }
    }

    return updatedMovies
  }, [watchlistMovies, selectedGenre, selectedYear])

  const handleGenreChange = (event: SelectChangeEvent<string>) => {
    setSelectedGenre(event.target.value)
  }

  const handleYearChange = (event: SelectChangeEvent<string>) => {
    setSelectedYear(event.target.value)
  }

  const handleResetFilters = () => {
    setSelectedGenre('')
    setSelectedYear('')
  }

  const handleRemoveFromWatchlist = (movieId: number) => {
    removeMovieFromWatchlist({ movieId })
      .then(() => {})
      .catch((err) => {
        console.error('Failed to remove movie:', err)
      })
  }

  if (isFetchingWatchlist || !GENRES_LIST || !watchlistMovies) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        sx={{ width: '100%', bgcolor: 'background.paper' }}
      >
        <CircularProgress sx={{ color: 'secondary.contrastText' }} />
      </Box>
    )
  }

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
        Список к просмотру
      </Typography>

      <Box display="flex" justifyContent="center" gap={2} mb={3}>
        <Select
          value={selectedGenre}
          onChange={handleGenreChange}
          displayEmpty
          sx={{
            color: 'secondary.contrastText',
            backgroundColor: 'background.paper',
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: '#444'
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'secondary.contrastText',
              color: 'secondary.contrastText'
            }
          }}
        >
          <MenuItem value="" sx={{ color: 'secondary.contrastText' }}>
            Все жанры
          </MenuItem>
          {GENRES_LIST?.map((genre) => (
            <MenuItem key={genre.id} value={genre.name} sx={{ color: 'secondary.contrastText' }}>
              {genre.name}
            </MenuItem>
          ))}
        </Select>

        <Select
          value={selectedYear}
          onChange={handleYearChange}
          displayEmpty
          sx={{
            color: 'secondary.contrastText',
            backgroundColor: 'background.paper',
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: '#444'
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'secondary.contrastText',
              color: 'secondary.contrastText'
            }
          }}
        >
          <MenuItem value="" sx={{ color: 'secondary.contrastText' }}>
            Все годы
          </MenuItem>
          {YEARS_LIST.map((year) => (
            <MenuItem key={year} value={year} sx={{ color: 'secondary.contrastText' }}>
              {year}
            </MenuItem>
          ))}
        </Select>

        <Button variant="contained" color="primary" onClick={handleResetFilters}>
          Сбросить фильтры
        </Button>
      </Box>

      {filteredMovies.length > 0 ? (
        <Box display="flex" flexDirection="column" gap={2}>
          {filteredMovies.map((movie) => (
            <Card key={movie.id} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <CardMedia
                component="img"
                sx={{ width: 150, height: 225 }}
                image={movie.image}
                alt={movie.title}
              />
              <Box sx={{ flex: 1, p: 2, display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" sx={{ color: 'secondary.contrastText' }}>
                  {movie.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'secondary.contrastText' }}>
                  Год: {movie.year}
                </Typography>
                <Typography variant="body2" sx={{ color: 'secondary.contrastText' }}>
                  Жанр: {movie.genre ?? 'Неизвестно'}
                </Typography>
                <Rating value={movie.rating} readOnly />
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleRemoveFromWatchlist(movie.id)}
                  sx={{ mt: 2, maxWidth: '170px' }}
                >
                  Убрать из списка
                </Button>
              </Box>
            </Card>
          ))}
        </Box>
      ) : (
        <Box textAlign="center">
          <Typography variant="h5">Нет фильмов к просмотру</Typography>
          <Typography variant="body1">
            Найдите фильмы и сериалы и добавьте их к просмотру, чтобы напомнить себе посмотреть их
            позже.
          </Typography>
        </Box>
      )}
    </Box>
  )
}

export default AddToWatchList
