'use client'

import Head from 'next/head'
import Link from 'next/link'
import { Typography, Box, Button, CircularProgress } from '@mui/material'
import { useFetchMoviesByFiltersQuery } from '@/common/services/moviesApiTMDB'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import MovieCard from '@/components/Films/MovieCard'

export default function Films() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 7,
    slidesToScroll: 2,
    draggable: true,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          arrows: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false
        }
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false
        }
      }
    ]
  }

  const today = new Date()
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
    .toISOString()
    .split('T')[0]
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)
    .toISOString()
    .split('T')[0]

  const { data: genreMovies, isLoading: isLoadinggenreMovies } = useFetchMoviesByFiltersQuery({
    sort_by: 'vote_average.desc',
    'primary_release_date.gte': startOfMonth,
    'primary_release_date.lte': endOfMonth,
    region: 'RU',
    with_original_language: 'ru',
    page: 1
  })

  if (isLoadinggenreMovies) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        sx={{
          color: 'secondary.contrastText',
          bgcolor: 'background.paper',
          width: '100%',
          overflow: 'hidden'
        }}
      >
        <CircularProgress sx={{ color: 'secondary.contrastText' }} />
      </Box>
    )
  }

  // Создаем карту жанров
  const genreMap: { [key: number]: string } = {
    28: 'Боевик',
    12: 'Приключения',
    16: 'Анимация',
    35: 'Комедия',
    80: 'Криминал',
    18: 'Драма',
    10751: 'Семейный',
    14: 'Фэнтези',
    36: 'Исторический',
    27: 'Ужасы',
    10402: 'Музыка',
    9648: 'Детектив',
    10749: 'Романтика',
    878: 'Научная фантастика',
    10770: 'ТВ шоу',
    53: 'Триллер',
    10752: 'Военный',
    37: 'Вестерн'
  }

  const categories = [
    { title: 'Боевики', movies: genreMovies || [] },
    { title: 'Приключения', movies: genreMovies || [] },
    { title: 'Комедии', movies: genreMovies || [] },
    { title: 'Ужасы', movies: genreMovies || [] },
    { title: 'Криминал', movies: genreMovies || [] },
    { title: 'Анимация', movies: genreMovies || [] },
    { title: 'Драма', movies: genreMovies || [] },
    { title: 'Семейные', movies: genreMovies || [] },
    { title: 'Фэнтези', movies: genreMovies || [] },
    { title: 'Исторические', movies: genreMovies || [] },
    { title: 'Детективы', movies: genreMovies || [] },
    { title: 'Романтические', movies: genreMovies || [] },
    { title: 'Фантастика', movies: genreMovies || [] },
    { title: 'Триллеры', movies: genreMovies || [] },
    { title: 'Военные', movies: genreMovies || [] },
    { title: 'Вестерны', movies: genreMovies || [] },
    { title: 'ТВ Шоу', movies: genreMovies || [] },
    { title: 'Мьюзикл', movies: genreMovies || [] }
  ]

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
          Фильмы
        </Typography>

        {categories.map(({ title, movies }) => (
          <Box key={title} sx={{ mb: 4 }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{ flexDirection: { xs: 'column', sm: 'row' }, padding: '0 10px' }}
              mb={2}
            >
              <Typography variant="h5" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                {title}
              </Typography>

              <Link href={`/${title.toLowerCase().replace(/\s+/g, '-')}`}>
                <Button variant="contained">Просмотреть все</Button>
              </Link>
            </Box>

            <Slider {...settings}>
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </Slider>
          </Box>
        ))}
      </Box>
    </>
  )
}
