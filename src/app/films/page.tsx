'use client'

// import {
//   Typography,
//   Box,
//   Grid,
//   Card,
//   CardMedia,
//   CardContent,
//   CardActionArea,
//   Stack,
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
// import { ViewDay } from '@mui/icons-material'

export default function Films() {
  // const [movies, setMovies] = useState<MoviesResponse>({
  //   trending: [],
  //   forYou: [],
  //   mostFavorited: []
  // })
  // const [topInRussia, setTopInRussia] = useState<Movie[]>([])
  // const [popular, setPopular] = useState<Movie[]>([])
  // const [expected, setExpected] = useState<Movie[]>([])
  // const [best, setBest] = useState<Movie[]>([])
  // useEffect(() => {
  //   const loadMovies = async () => {
  //     const data = await fetchMovies()
  //     setMovies(data)
  //     setTopInRussia(await fetchTopInRussia())
  //     setPopular(await fetchPopularMovies())
  //     setExpected(await fetchExpectedMovies())
  //     setBest(await fetchBestMovies())
  //   }
  //   loadMovies()
  // }, [])
  // const categories = [
  //   { title: 'В тренде', movies: movies.trending },
  //   { title: 'Топ 10 в России', movies: topInRussia },
  //   { title: 'Популярные', movies: popular },
  //   { title: 'Ожидаемые', movies: expected },
  //   { title: 'Лучшие', movies: best }
  // ]
  // return (
  //   <Stack
  //     sx={{
  //       padding: '30px',
  //       color: 'secondary.contrastText',
  //       bgcolor: 'background.paper',
  //       width: '100%'
  //     }}
  //   >
  //     <Typography variant="h4" gutterBottom>
  //       Фильмы
  //     </Typography>
  //     {categories.map(({ title, movies }) => (
  //       <Box key={title} sx={{ mb: 4 }}>
  //         <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
  //           <Typography variant="h5">{title}</Typography>
  //           <Typography variant="body2" sx={{ cursor: 'pointer' }}>
  //             Просмотреть все
  //           </Typography>
  //         </Box>
  //         <Grid container spacing={20}>
  //           {movies.map((movie, index) => (
  //             <Grid item xs={7} sm={5} md={4} lg={1} key={`${movie.title}_${index}`}>
  //               <Card sx={{ height: '225px', width: '150px' }}>
  //                 <CardActionArea>
  //                   {movie.image ? (
  //                     <CardMedia
  //                       component="img"
  //                       image={movie.image}
  //                       alt={movie.title}
  //                       sx={{
  //                         color: 'secondary.contrastText',
  //                         width: '100%',
  //                         height: '250px'
  //                       }}
  //                     />
  //                   ) : (
  //                     <Box
  //                       sx={{
  //                         width: '100%',
  //                         height: '250px',
  //                         display: 'flex',
  //                         alignItems: 'center',
  //                         justifyContent: 'center'
  //                       }}
  //                     >
  //                       <ViewDay
  //                         sx={{
  //                           width: '80px',
  //                           height: '80px',
  //                           margin: '0 auto',
  //                           color: 'grey'
  //                         }}
  //                       />
  //                     </Box>
  //                   )}
  //                 </CardActionArea>
  //                 <CardContent>
  //                   <Typography variant="body2" color="secondary.contrastText" component="p">
  //                     {movie.title}
  //                   </Typography>
  //                   <Rating name="read-only" value={movie.rating / 2} readOnly precision={0.1} />
  //                 </CardContent>
  //               </Card>
  //             </Grid>
  //           ))}
  //         </Grid>
  //       </Box>
  //     ))}
  //   </Stack>
  // )
}

// 'use client'

// import { ViewDay } from '@mui/icons-material'
// import {
//   Typography,
//   Box,
//   Grid,
//   Card,
//   CardMedia,
//   CardContent,
//   CardActionArea,
//   Stack
// } from '@mui/material'
// import { useState, useEffect } from 'react'
// import axios from 'axios'

// interface Movie {
//   title: string
//   rating: number
//   watchers?: number
//   forYou?: string
//   image: string
// }

// const fetchMovies = async (): Promise<{
//   trending: Movie[]
//   forYou: Movie[]
//   mostFavorited: Movie[]
// }> => {
//   const API = process.env.NEXT_PUBLIC_KINOPOISK_API_KEY
//   const url = 'https://api.kinopoisk.dev/v1.4/movie'

//   // Пример запроса для получения трендовых фильмов
//   const trendingResponse = await axios.get(url, {
//     headers: {
//       'X-API-KEY': API
//     },
//     params: {
//       rating: '7-10',
//       limit: 10
//     }
//   })

//   // Пример запроса для получения фильмов "for you"
//   const forYouResponse = await axios.get(url, {
//     headers: {
//       'X-API-KEY': API
//     },
//     params: {
//       year: '2023',
//       limit: 10
//     }
//   })

//   // Пример запроса для получения самых популярных фильмов
//   const mostFavoritedResponse = await axios.get(url, {
//     headers: {
//       'X-API-KEY': API
//     },
//     params: {
//       limit: 15
//     }
//   })

//   // Преобразование данных для соответствия интерфейсу Movie
//   const trending = trendingResponse.data.docs.map((movie: any) => ({
//     title: movie.name,
//     rating: movie.rating.kp,
//     watchers: movie.watchers,
//     image: movie?.poster?.url
//   }))

//   // console.log(trending)

//   const forYou = forYouResponse.data.docs.map((movie: any) => ({
//     title: movie.name,
//     rating: movie.rating.kp,
//     forYou: movie?.boxOffice?.total?.amount,
//     image: movie?.poster?.url
//   }))

//   const mostFavorited = mostFavoritedResponse.data.docs.map((movie: any) => ({
//     title: movie.name,
//     rating: movie.rating.kp,
//     image: movie?.poster?.url
//   }))

//   return { trending, forYou, mostFavorited }
// }

// export default function Films() {
//   const [movies, setMovies] = useState<{
//     trending: Movie[]
//     forYou: Movie[]
//     mostFavorited: Movie[]
//   }>({
//     trending: [],
//     forYou: [],
//     mostFavorited: []
//   })

//   useEffect(() => {
//     const loadMovies = async () => {
//       const data = await fetchMovies()
//       setMovies(data)
//     }
//     loadMovies()
//   }, [])

//   return (
//     <Stack
//       sx={{
//         padding: '30px',
//         color: 'secondary.contrastText',
//         bgcolor: 'background.paper',
//         width: '100%'
//       }}
//     >
//       <Typography variant="h4" gutterBottom>
//         Фильмы
//       </Typography>
//       {Object.entries(movies).map(([category, movieList]) => (
//         <Box key={category} sx={{ mb: 4 }}>
//           <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//             <Typography variant="h5">{category.replace(/([A-Z])/g, ' $1').trim()}</Typography>
//             <Typography variant="body2" sx={{ cursor: 'pointer' }}>
//               Просмотреть все
//             </Typography>
//           </Box>
//           <Grid container spacing={20}>
//             {movieList.slice(1).map((movie, index) => (
//               <Grid item xs={7} sm={5} md={4} lg={1} key={`${movie.title}_${index}`}>
//                 <Card sx={{ height: '225px', width: '150px' }}>
//                   <CardActionArea>
//                     {movie.image ? (
//                       <CardMedia
//                         component="img"
//                         image={movie.image}
//                         alt={movie.title}
//                         sx={{
//                           color: 'secondary.contrastText',
//                           width: '100%',
//                           height: '250px'
//                         }}
//                       />
//                     ) : (
//                       <Box
//                         sx={{
//                           width: '100%',
//                           height: '250px',
//                           display: 'flex',
//                           alignItems: 'center',
//                           justifyContent: 'center'
//                         }}
//                       >
//                         <ViewDay
//                           sx={{
//                             width: '80px',
//                             height: '80px',
//                             margin: '0 auto',
//                             color: 'grey'
//                           }}
//                         />
//                       </Box>
//                     )}
//                   </CardActionArea>
//                   <CardContent sx={{ display: 'block', padding: 0, width: '100%' }}>
//                     <Typography variant="body2" color="secondary.contrastText" component="p">
//                       {movie.title}
//                     </Typography>
//                     <Typography variant="body2" color="secondary.contrastText">
//                       {movie.rating}
//                     </Typography>
//                     {movie.watchers && (
//                       <Typography variant="body2" color="secondary.contrastText">
//                         {movie.watchers} watching
//                       </Typography>
//                     )}
//                     {movie.forYou && (
//                       <Typography variant="body2" color="secondary.contrastText">
//                         {movie.forYou}
//                       </Typography>
//                     )}
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         </Box>
//       ))}
//     </Stack>
//   )
// }
