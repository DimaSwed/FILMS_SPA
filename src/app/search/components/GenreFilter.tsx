'use client'
import { FC, useState } from 'react'
import {
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
  Stack,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  TextField
} from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select'
import { useFetchMoviesByFiltersQuery, useSearchMoviesQuery } from '@/common/services/moviesApiTMDB'
import { Movie } from '@/common/types/types'
import MovieCard from './SmallMovieCard'
import { GENRES_LIST, YEARS_LIST, COUNTRIES_LIST } from '@/common/constants/constants'

const GenreFilter: FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedGenre, setSelectedGenre] = useState<number | ''>('')
  const [selectedRecommendation, setSelectedRecommendation] = useState<string>('recommendations')
  const [additionalCriteria, setAdditionalCriteria] = useState<string[]>([])
  const [selectedCountry, setSelectedCountry] = useState<string>('')
  const [selectedYear, setSelectedYear] = useState<string>('')
  const { data: filteredMovies, isLoading: moviesLoading } = useFetchMoviesByFiltersQuery({
    genre: selectedGenre,
    recommendation: selectedRecommendation,
    criteria: additionalCriteria,
    country: selectedCountry,
    year: selectedYear,
    searchQuery
  })

  const { data, isLoading, error } = useSearchMoviesQuery(searchQuery, { skip: !searchQuery })
  // Обработчик для строки поиска
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  const handleGenreChange = (event: SelectChangeEvent<number | ''>) => {
    setSelectedGenre(event.target.value as number | '')
  }

  const handleRecommendationChange = (event: SelectChangeEvent<string>) => {
    setSelectedRecommendation(event.target.value)
  }

  const handleAdditionalCriteriaChange = (
    event: React.MouseEvent<HTMLElement>,
    newCriteria: string[]
  ) => {
    setAdditionalCriteria(newCriteria)
  }

  const handleCountryChange = (event: SelectChangeEvent<string>) => {
    setSelectedCountry(event.target.value as string)
  }

  const handleYearChange = (event: SelectChangeEvent<string>) => {
    setSelectedYear(event.target.value as string)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        bgcolor: 'background.paper',
        p: 2
      }}
    >
      <TextField
        label="Поиск по названию"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchChange}
        InputLabelProps={{
          sx: {
            color: 'secondary.contrastText',
            '&.Mui-focused': {
              color: 'secondary.contrastText'
            },
            '&.MuiInputLabel-shrink': {
              color: 'secondary.contrastText'
            }
          }
        }}
        InputProps={{
          sx: {
            color: 'secondary.contrastText',
            backgroundColor: 'background.paper',
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: '#444'
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'secondary.contrastText'
            }
          }
        }}
        sx={{
          width: '100%',
          maxWidth: '600px',
          mb: 1
        }}
      />

      <Stack
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
          bgcolor: 'background.paper',
          width: '100%'
        }}
      >
        <FormControl sx={{ maxWidth: '150px', width: '100%' }}>
          <InputLabel
            sx={{
              color: 'secondary.contrastText',
              '&.Mui-focused': {
                color: 'secondary.contrastText'
              },
              '&.MuiInputLabel-shrink': {
                color: 'secondary.contrastText'
              }
            }}
          >
            Рекомендуемые
          </InputLabel>
          <Select
            value={selectedRecommendation}
            onChange={handleRecommendationChange}
            label="Рекомендуемые"
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
            <MenuItem sx={{ color: 'secondary.contrastText' }} value="recommendations">
              Рекомендуемые
            </MenuItem>
            <MenuItem sx={{ color: 'secondary.contrastText' }} value="rating">
              По рейтингу
            </MenuItem>
            <MenuItem sx={{ color: 'secondary.contrastText' }} value="releaseDate">
              По дате выхода
            </MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ maxWidth: '150px', width: '100%' }}>
          <InputLabel
            sx={{
              color: 'secondary.contrastText',
              '&.Mui-focused': {
                color: 'secondary.contrastText'
              },
              '&.MuiInputLabel-shrink': {
                color: 'secondary.contrastText'
              }
            }}
          >
            Жанр
          </InputLabel>
          <Select
            value={selectedGenre}
            onChange={handleGenreChange}
            label="Выберите жанр"
            sx={{
              color: 'secondary.contrastText',
              backgroundColor: 'background.paper',
              '.MuiOutlinedInput-notchedOutline': { borderColor: '#444' }
            }}
          >
            <MenuItem sx={{ color: 'secondary.contrastText' }} value="">
              Все жанры
            </MenuItem>
            {GENRES_LIST.map((genre) => (
              <MenuItem sx={{ color: 'secondary.contrastText' }} key={genre.id} value={genre.id}>
                {genre.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ maxWidth: '150px', width: '100%' }}>
          <InputLabel
            sx={{
              color: 'secondary.contrastText',
              '&.Mui-focused': {
                color: 'secondary.contrastText'
              },
              '&.MuiInputLabel-shrink': {
                color: 'secondary.contrastText'
              }
            }}
          >
            Страна
          </InputLabel>
          <Select
            value={selectedCountry}
            onChange={handleCountryChange}
            label="Выберите страну"
            sx={{
              color: 'secondary.contrastText',
              backgroundColor: 'background.paper',
              '.MuiOutlinedInput-notchedOutline': { borderColor: '#444' }
            }}
          >
            <MenuItem sx={{ color: 'secondary.contrastText' }} value="">
              Все страны
            </MenuItem>
            {COUNTRIES_LIST.map((country, index) => (
              <MenuItem sx={{ color: 'secondary.contrastText' }} key={index} value={country}>
                {country}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ maxWidth: '150px', width: '100%' }}>
          <InputLabel
            sx={{
              color: 'secondary.contrastText',
              '&.Mui-focused': {
                color: 'secondary.contrastText'
              },
              '&.MuiInputLabel-shrink': {
                color: 'secondary.contrastText'
              }
            }}
          >
            Год
          </InputLabel>
          <Select
            value={selectedYear}
            onChange={handleYearChange}
            label="Выберите год"
            sx={{
              color: 'secondary.contrastText',
              backgroundColor: 'background.paper',
              '.MuiOutlinedInput-notchedOutline': { borderColor: '#444' }
            }}
          >
            <MenuItem sx={{ color: 'secondary.contrastText' }} value="">
              Все годы
            </MenuItem>
            {YEARS_LIST.map((year, index) => (
              <MenuItem sx={{ color: 'secondary.contrastText' }} key={index} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <ToggleButtonGroup
          value={additionalCriteria}
          onChange={handleAdditionalCriteriaChange}
          aria-label="additional criteria"
          sx={{
            '.MuiToggleButton-root': {
              color: 'secondary.contrastText',
              backgroundColor: 'background.paper',
              border: '1px solid #444',
              // maxWidth: '160px',
              // width: '100%',
              '&.Mui-selected': {
                color: 'text.primary',
                backgroundColor: 'primary.dark'
              },
              '&:hover': {
                backgroundColor: 'primary.light'
              }
            }
          }}
        >
          <ToggleButton value="new">Новое</ToggleButton>
          <ToggleButton value="highRating">Высокий рейтинг</ToggleButton>
          <ToggleButton value="best">Лучшее</ToggleButton>
        </ToggleButtonGroup>
      </Stack>

      {moviesLoading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2} sx={{ padding: '0 10px' }}>
          {filteredMovies?.map((movie: Movie) => <MovieCard key={movie.id} movie={movie} />)}
        </Grid>
      )}
    </Box>
  )
}

export default GenreFilter
