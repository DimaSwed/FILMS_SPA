'use client'

import Head from 'next/head'
import '../styles/global.sass'
import Link from 'next/link'
import { ViewDay } from '@mui/icons-material'
import {
  Typography,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Rating
} from '@mui/material'
import {
  useFetchMoviesQuery,
  useFetchTopInRussiaQuery,
  useFetchPopularMoviesQuery,
  useFetchExpectedMoviesQuery,
  useFetchBestMoviesQuery
} from '@/common/services/moviesApi'

export default function Home() {
  // const { data: movies, isLoading: isLoadingMovies } = useFetchMoviesQuery()
  // const { data: topInRussia, isLoading: isLoadingTopInRussia } = useFetchTopInRussiaQuery()
  // const { data: popular, isLoading: isLoadingPopular } = useFetchPopularMoviesQuery()
  // const { data: expected, isLoading: isLoadingExpected } = useFetchExpectedMoviesQuery()
  // const { data: best, isLoading: isLoadingBest } = useFetchBestMoviesQuery()

  // if (
  //   isLoadingMovies ||
  //   isLoadingTopInRussia ||
  //   isLoadingPopular ||
  //   isLoadingExpected ||
  //   isLoadingBest
  // ) {
  //   return (
  //     <Typography component={'p'} width={'100%'}>
  //       Loading...
  //     </Typography>
  //   )
  // }

  const categories = [
    { title: 'В тренде', movies: movies?.trending || [] },
    { title: 'Топ 10 в России', movies: topInRussia || [] },
    { title: 'Популярные', movies: popular || [] },
    { title: 'Ожидаемые', movies: expected || [] },
    { title: 'Лучшие', movies: best || [] }
  ]

  return (
    <>
      <Head>
        <Link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        component="main"
        bgcolor={'primary.main'}
        minHeight={'100%'}
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

        <Box sx={{ mb: 4 }}>
          {categories.map(({ title, movies }) => (
            <Box key={title} sx={{ mb: 4 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h5">{title}</Typography>
                <Typography variant="body2" sx={{ cursor: 'pointer' }}>
                  Просмотреть все
                </Typography>
              </Box>
              <Grid container spacing={20}>
                {movies.map((movie, index) => (
                  <Grid item xs={7} sm={5} md={4} lg={1} key={`${movie.title}_${index}`}>
                    <Card sx={{ height: '225px', width: '150px' }}>
                      <CardActionArea>
                        {movie.image ? (
                          <CardMedia
                            component="img"
                            image={movie.image}
                            alt={movie.title}
                            sx={{
                              color: 'secondary.contrastText',
                              width: '100%',
                              height: '250px'
                            }}
                          />
                        ) : (
                          <Box
                            sx={{
                              width: '100%',
                              height: '250px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <ViewDay
                              sx={{
                                width: '80px',
                                height: '80px',
                                margin: '0 auto',
                                color: 'grey'
                              }}
                            />
                          </Box>
                        )}
                      </CardActionArea>
                      <CardContent>
                        <Typography variant="body2" color="secondary.contrastText" component="p">
                          {movie.title}
                        </Typography>
                        <Rating
                          name="read-only"
                          value={movie.rating / 2}
                          readOnly
                          precision={0.1}
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  )
}
// 'use client'

// import Head from 'next/head'
// import '../styles/global.sass'
// import Link from 'next/link'
// import { ViewDay } from '@mui/icons-material'
// import {
//   Typography,
//   Box,
//   Grid,
//   Card,
//   CardMedia,
//   CardContent,
//   CardActionArea,
//   Rating
// } from '@mui/material'
// import { useState, useEffect } from 'react'
// import {
//   fetchMovies,
//   fetchTopInRussia,
//   fetchPopularMovies,
//   fetchExpectedMovies,
//   fetchBestMovies
// } from '@/common/services/moviesService'
// import { Movie, MoviesResponse } from '@/common/types/types'

// export default function Home() {
//   const [movies, setMovies] = useState<MoviesResponse>({
//     trending: [],
//     forYou: [],
//     mostFavorited: []
//   })

//   const [topInRussia, setTopInRussia] = useState<Movie[]>([])
//   const [popular, setPopular] = useState<Movie[]>([])
//   const [expected, setExpected] = useState<Movie[]>([])
//   const [best, setBest] = useState<Movie[]>([])

//   useEffect(() => {
//     const loadMovies = async () => {
//       const data = await fetchMovies()
//       setMovies(data)
//       setTopInRussia(await fetchTopInRussia())
//       setPopular(await fetchPopularMovies())
//       setExpected(await fetchExpectedMovies())
//       setBest(await fetchBestMovies())
//     }
//     loadMovies()
//   }, [])

//   const categories = [
//     { title: 'В тренде', movies: movies.trending },
//     { title: 'Топ 10 в России', movies: topInRussia },
//     { title: 'Популярные', movies: popular },
//     { title: 'Ожидаемые', movies: expected },
//     { title: 'Лучшие', movies: best }
//   ]

//   return (
//     <>
//       <Head>
//         <Link rel="icon" href="/favicon.ico" />
//       </Head>
//       <Box
//         component="main"
//         bgcolor={'primary.main'}
//         minHeight={'100%'}
//         sx={{
//           padding: '30px',
//           color: 'secondary.contrastText',
//           bgcolor: 'background.paper',
//           width: '100%'
//         }}
//       >
//         <Typography variant="h4" gutterBottom>
//           Фильмы
//         </Typography>

//         <Box sx={{ mb: 4 }}>
//           {categories.map(({ title, movies }) => (
//             <Box key={title} sx={{ mb: 4 }}>
//               <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//                 <Typography variant="h5">{title}</Typography>
//                 <Typography variant="body2" sx={{ cursor: 'pointer' }}>
//                   Просмотреть все
//                 </Typography>
//               </Box>
//               <Grid container spacing={20}>
//                 {movies.map((movie, index) => (
//                   <Grid item xs={7} sm={5} md={4} lg={1} key={`${movie.title}_${index}`}>
//                     <Card sx={{ height: '225px', width: '150px' }}>
//                       <CardActionArea>
//                         {movie.image ? (
//                           <CardMedia
//                             component="img"
//                             image={movie.image}
//                             alt={movie.title}
//                             sx={{
//                               color: 'secondary.contrastText',
//                               width: '100%',
//                               height: '250px'
//                             }}
//                           />
//                         ) : (
//                           <Box
//                             sx={{
//                               width: '100%',
//                               height: '250px',
//                               display: 'flex',
//                               alignItems: 'center',
//                               justifyContent: 'center'
//                             }}
//                           >
//                             <ViewDay
//                               sx={{
//                                 width: '80px',
//                                 height: '80px',
//                                 margin: '0 auto',
//                                 color: 'grey'
//                               }}
//                             />
//                           </Box>
//                         )}
//                       </CardActionArea>
//                       <CardContent>
//                         <Typography variant="body2" color="secondary.contrastText" component="p">
//                           {movie.title}
//                         </Typography>
//                         <Rating
//                           name="read-only"
//                           value={movie.rating / 2}
//                           readOnly
//                           precision={0.1}
//                         />
//                       </CardContent>
//                     </Card>
//                   </Grid>
//                 ))}
//               </Grid>
//             </Box>
//           ))}
//         </Box>
//       </Box>
//     </>
//   )
// }
