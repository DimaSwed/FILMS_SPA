'use client'

import { ViewDay } from '@mui/icons-material'
import {
  Typography,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Stack
} from '@mui/material'
import { useState, useEffect } from 'react'

interface Movie {
  title: string
  rating: number
  watchers?: number
  forYou?: string
  image: string
}

const fetchMovies = async (): Promise<{
  trending: Movie[]
  forYou: Movie[]
  mostFavorited: Movie[]
}> => {
  // Имитация запроса на сервер
  return {
    trending: [
      {
        title: 'Aquaman and the Lost Kingdom',
        rating: 6.4,
        watchers: 124,
        image: ''
      },
      {
        title: 'Qwerty',
        rating: 9.4,
        watchers: 999,
        image: '/images/qwerty.jpg'
      }
      // Добавьте другие фильмы
    ],
    forYou: [
      {
        title: 'Mean Girls',
        rating: 6.9,
        forYou: '$12,000,000',
        image: '/images/mean-girls.jpg'
      }
      // Добавьте другие фильмы
    ],
    mostFavorited: [
      { title: 'Some Favorite Movie', rating: 8.2, image: '/images/favorite-movie.jpg' }
      // Добавьте другие фильмы
    ]
  }
}

export default function Films() {
  const [movies, setMovies] = useState<{
    trending: Movie[]
    forYou: Movie[]
    mostFavorited: Movie[]
  }>({
    trending: [],
    forYou: [],
    mostFavorited: []
  })

  useEffect(() => {
    const loadMovies = async () => {
      const data = await fetchMovies()
      setMovies(data)
    }
    loadMovies()
  }, [])

  return (
    <Stack
      sx={{
        padding: '30px',
        color: 'secondary.contrastText',
        bgcolor: 'background.paper',
        width: '100%'
      }}
    >
      <Typography variant="h4" gutterBottom>
        Фильмы
      </Typography>
      {Object.entries(movies).map(([category, movieList]) => (
        <Box key={category} sx={{ mb: 4 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h5">{category.replace(/([A-Z])/g, ' $1').trim()}</Typography>
            <Typography variant="body2" sx={{ cursor: 'pointer' }}>
              Просмотреть все
            </Typography>
          </Box>
          <Grid container spacing={2}>
            {movieList.map((movie) => (
              <Grid item xs={6} sm={4} md={3} lg={2} key={movie.title}>
                <Card>
                  <CardActionArea>
                    {movie.image ? (
                      <CardMedia
                        component="img"
                        height="140px"
                        image={movie.image}
                        alt={movie.title}
                        sx={{ color: 'secondary.contrastText' }}
                      />
                    ) : (
                      <Box
                        height="140px"
                        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        <ViewDay
                          sx={{
                            width: '80px',
                            height: '80px',
                            margin: '0 auto',
                            color: 'secondary.contrastText'
                          }}
                        />
                      </Box>
                    )}
                    <CardContent>
                      <Typography variant="body2" color="secondary.contrastText" component="p">
                        {movie.title}
                      </Typography>
                      <Typography variant="body2" color="secondary.contrastText">
                        {movie.rating}
                      </Typography>
                      {movie.watchers && (
                        <Typography variant="body2" color="secondary.contrastText">
                          {movie.watchers} watching
                        </Typography>
                      )}
                      {movie.forYou && (
                        <Typography variant="body2" color="secondary.contrastText">
                          {movie.forYou}
                        </Typography>
                      )}
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </Stack>
  )
}
