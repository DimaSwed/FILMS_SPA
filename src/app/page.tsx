'use client'

import Head from 'next/head'
import '../styles/global.sass'
import { Typography, Box } from '@mui/material'
import {
  useFetchUpcomingMoviesQuery,
  useFetchTopRatedMoviesQuery,
  useFetchPopularMoviesQuery,
  useFetchNowPlayingMoviesQuery,
  useFetchTrendingMoviesQuery
} from '@/common/services/moviesApiTMDB'
import MovieCategory from '@/components/Films/MovieCategory'
import { Category } from '@/common/types/types'

const Home = () => {
  const { data: nowPlayingMovies, isLoading: isLoadingNowPlayingMovies } =
    useFetchNowPlayingMoviesQuery()
  const { data: popularMovies, isLoading: isLoadingPopularMovies } = useFetchPopularMoviesQuery()
  const { data: upcomingMovies, isLoading: isLoadingUpcomingMovies } = useFetchUpcomingMoviesQuery()
  const { data: topRatedMovies, isLoading: isLoadingTopRatedMovies } = useFetchTopRatedMoviesQuery()
  const { data: trendingMovies, isLoading: isLoadingTrendingMovies } = useFetchTrendingMoviesQuery()

  const categories: Category[] = [
    { title: 'Сейчас в тренде', movies: trendingMovies || [], isLoading: isLoadingTrendingMovies },
    {
      title: 'Сейчас в прокате',
      movies: nowPlayingMovies || [],
      isLoading: isLoadingNowPlayingMovies
    },
    {
      title: 'Популярные в этом месяце',
      movies: popularMovies || [],
      isLoading: isLoadingPopularMovies
    },
    {
      title: 'Самые ожидаемые премьеры',
      movies: upcomingMovies || [],
      isLoading: isLoadingUpcomingMovies
    },
    {
      title: 'Топ рейтинговые фильмы за все время',
      movies: topRatedMovies || [],
      isLoading: isLoadingTopRatedMovies
    }
  ]

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
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
          Фильмы
        </Typography>

        {categories.map(({ title, movies, isLoading }) => (
          <MovieCategory key={title} title={title} movies={movies} isLoading={isLoading} />
        ))}
      </Box>
    </>
  )
}

export default Home
