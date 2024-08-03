// 'use client'
// import React from 'react'
// import { NextPage } from 'next'
// import {
//   Typography,
//   Grid,
//   Card,
//   CardMedia,
//   CardContent,
//   CircularProgress,
//   Box,
//   Stack,
//   Avatar
// } from '@mui/material'
// import { useFetchUpcomingMoviesQuery } from '@/common/services/moviesApiTMDB'

// const LatestTrailers: NextPage = () => {
//   const { data: movies, error, isLoading } = useFetchUpcomingMoviesQuery()

//   if (isLoading) return <CircularProgress sx={{ color: 'secondary.contrastText' }} />
//   if (error)
//     return (
//       <Typography color="secondary.contrastText">Произошла ошибка при загрузке данных.</Typography>
//     )

//   return (
//     <Stack
//       sx={{
//         padding: { xs: '10px', sm: '15px', md: '30px' },
//         color: 'secondary.contrastText',
//         bgcolor: 'background.paper',
//         width: '100%'
//       }}
//     >
//       <Box sx={{ textAlign: 'center', mb: 4 }}>
//         <Typography variant="h4" gutterBottom>
//           Последние трейлеры
//         </Typography>
//         <Grid container spacing={3}>
//           {movies?.map((movie) => (
//             <Grid item xs={12} sm={6} md={4} key={movie.id}>
//               <Card
//                 sx={{
//                   bgcolor: 'background.default',
//                   color: 'secondary.contrastText',
//                   borderRadius: 1,
//                   boxShadow: 3
//                 }}
//               >
//                 <CardMedia
//                   component="img"
//                   // height="140"
//                   image={movie.image}
//                   alt={movie.title}
//                   sx={{ borderRadius: 1, color: 'secondary.contrastText' }}
//                 />
//                 <CardContent>
//                   <Typography variant="h6" component="div" sx={{ color: 'secondary.contrastText' }}>
//                     {movie.title}
//                   </Typography>
//                   <Typography variant="body2" sx={{ color: 'secondary.contrastText' }}>
//                     {movie.year} | Рейтинг: {movie.rating}
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </Box>
//     </Stack>
//   )
// }

// export default LatestTrailers
'use client'
import React, { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { Typography, Grid, Card, CardContent, CircularProgress, Box, Stack } from '@mui/material'
import { useFetchUpcomingMoviesQuery } from '@/common/services/moviesApiTMDB'
const fetchMovieTrailers = async (movieId: number) => {
  try {
    const response = await fetch(`https://api.example.com/movies/${movieId}/trailers`)
    if (!response.ok) {
      throw new Error(`Ошибка сети: ${response.statusText}`)
    }
    return await response.json()
  } catch (error) {
    console.error(`Ошибка при запросе трейлеров для фильма с ID ${movieId}:`, error)
    throw error
  }
}

const LatestTrailers: NextPage = () => {
  const { data: movies, error, isLoading } = useFetchUpcomingMoviesQuery()
  const [trailerIds, setTrailerIds] = useState<{ [key: number]: string | null }>({})

  useEffect(() => {
    const fetchTrailers = async () => {
      if (movies) {
        try {
          const trailerPromises = movies.map(async (movie) => {
            try {
              const trailers = await fetchMovieTrailers(movie.id)
              const trailer = trailers?.[0]?.key || null
              return { id: movie.id, trailer }
            } catch (err) {
              console.error(`Ошибка при получении трейлеров для фильма с ID ${movie.id}:`, err)
              return { id: movie.id, trailer: null }
            }
          })

          const trailers = await Promise.all(trailerPromises)
          const trailerMap = trailers.reduce(
            (acc, { id, trailer }) => {
              acc[id] = trailer
              return acc
            },
            {} as { [key: number]: string | null }
          )

          setTrailerIds(trailerMap)
        } catch (err) {
          console.error('Ошибка при получении трейлеров:', err)
        }
      }
    }

    fetchTrailers()
  }, [movies])

  if (isLoading)
    return (
      <Box
        sx={{
          color: 'secondary.contrastText',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <CircularProgress sx={{ color: 'secondary.contrastText', width: '100%' }} />
      </Box>
    )
  if (error)
    return (
      <Typography color="secondary.contrastText">Произошла ошибка при загрузке данных.</Typography>
    )

  return (
    <Stack
      sx={{
        padding: { xs: '10px', sm: '15px', md: '30px' },
        color: 'secondary.contrastText',
        bgcolor: 'background.paper',
        width: '100%'
      }}
    >
      <Box sx={{ textAlign: 'center', mb: 4, width: '100%' }}>
        <Typography variant="h4" gutterBottom>
          Последние трейлеры
        </Typography>
        <Grid container spacing={3}>
          {movies?.map((movie) => (
            <Grid item xs={12} sm={6} md={4} key={movie.id}>
              <Card
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  bgcolor: 'background.default',
                  color: 'secondary.contrastText',
                  borderRadius: 1,
                  boxShadow: 3
                }}
              >
                <Box sx={{ position: 'relative', height: 140 }}>
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${trailerIds[movie.id]}`}
                    title={movie.title}
                    // frameBorder="0"
                    // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    // allowFullScreen
                    // style={{ borderRadius: '4px' }}
                  ></iframe>
                </Box>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="div" sx={{ color: 'secondary.contrastText' }}>
                    {movie.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'secondary.contrastText' }}>
                    {movie.year} | Рейтинг: {movie.rating}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Stack>
  )
}

export default LatestTrailers
