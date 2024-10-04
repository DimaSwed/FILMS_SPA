'use client'
import { Box, Typography, SelectChangeEvent } from '@mui/material'
import React, { FC, useState, useMemo, useCallback } from 'react'
import {
  useGetWatchlistMoviesQuery,
  useRemoveMovieFromWatchlistMutation
} from '@/common/services/moviesApiTMDB'
import Filters from './components/Genre&YearFilter'
import LoadingOrError from './components/LoadingOrError'
import MovieCard from './components/WatchListCard'
import NoMovies from './components/NoMovies'
import Link from 'next/link'
import Head from 'next/head'

const AddToWatchList: FC = () => {
  const [selectedGenre, setSelectedGenre] = useState<string>('')
  const [selectedYear, setSelectedYear] = useState<string | ''>('')

  const {
    data: watchlistMovies,
    isFetching: isFetchingWatchlist,
    isError,
    error
  } = useGetWatchlistMoviesQuery(undefined, {
    refetchOnMountOrArgChange: true
  })

  const [removeMovieFromWatchlist] = useRemoveMovieFromWatchlistMutation()

  const filteredMovies = useMemo(() => {
    if (!watchlistMovies) return []

    const validMovies = watchlistMovies.filter(
      (movie) => movie.title && movie.rating > 0 && movie.year > 0
    )

    let updatedMovies = [...validMovies]

    if (selectedGenre) {
      updatedMovies = updatedMovies.filter(
        (movie) =>
          movie.genre &&
          (Array.isArray(movie.genre)
            ? movie.genre.includes(selectedGenre)
            : movie.genre.includes(selectedGenre))
      )
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
    // Сортировка по убыванию даты релиза (по полю release_date)
    updatedMovies.sort((a, b) => {
      if (a.releaseDate && b.releaseDate) {
        return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
      }
      // Если у какого-то фильма нет releaseDate, перемещаем его в конец
      if (!a.releaseDate) return 1
      if (!b.releaseDate) return -1
      return 0
    })

    return updatedMovies
  }, [watchlistMovies, selectedGenre, selectedYear])

  const handleGenreChange = useCallback((event: SelectChangeEvent<string>) => {
    setSelectedGenre(event.target.value)
  }, [])

  const handleYearChange = useCallback((event: SelectChangeEvent<string>) => {
    setSelectedYear(event.target.value)
  }, [])

  const handleResetFilters = useCallback(() => {
    setSelectedGenre('')
    setSelectedYear('')
  }, [])

  const handleRemoveFromWatchlist = useCallback(
    (movieId: number) => {
      removeMovieFromWatchlist({ movieId })
        .then(() => {})
        .catch((err) => {
          console.error('Failed to remove movie:', err)
        })
    },
    [removeMovieFromWatchlist]
  )

  return (
    <>
      <Head>
        <Link rel="icon" href="/favicon.ico" />
        <meta property="og:image" content="/logomain.jpg" />
      </Head>
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

        <Filters
          selectedGenre={selectedGenre}
          selectedYear={selectedYear}
          onGenreChange={handleGenreChange}
          onYearChange={handleYearChange}
          onResetFilters={handleResetFilters}
        />

        <LoadingOrError isLoading={isFetchingWatchlist} isError={isError} error={error} />

        {filteredMovies.length > 0 ? (
          <Box display="flex" flexDirection="column" gap={2}>
            {filteredMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onRemoveFromWatchlist={handleRemoveFromWatchlist}
              />
            ))}
          </Box>
        ) : (
          <NoMovies />
        )}
      </Box>
    </>
  )
}

export default AddToWatchList
