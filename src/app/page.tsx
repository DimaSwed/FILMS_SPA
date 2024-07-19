'use client'

import Head from 'next/head'
import '../styles/global.sass'
import { Typography, Box, CircularProgress } from '@mui/material'
import {
  useFetchUpcomingMoviesQuery,
  useFetchTopRatedMoviesQuery,
  useFetchPopularMoviesQuery,
  useFetchNowPlayingMoviesQuery,
  useFetchTrendingMoviesQuery // Импортируем новый хук
} from '@/common/services/moviesApiTMDB'
import MovieCategory from '@/components/Films/MovieCategory'

const Home = () => {
  const today = new Date()
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
    .toISOString()
    .split('T')[0]
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)
    .toISOString()
    .split('T')[0]

  const { data: nowPlayingMovies, isLoading: isLoadingNowPlayingMovies } =
    useFetchNowPlayingMoviesQuery()
  const { data: popularMovies, isLoading: isLoadingPopularMovies } = useFetchPopularMoviesQuery()
  const { data: upcomingMovies, isLoading: isLoadingUpcomingMovies } = useFetchUpcomingMoviesQuery()
  const { data: topRatedMovies, isLoading: isLoadingTopRatedMovies } = useFetchTopRatedMoviesQuery()
  const { data: trendingMovies, isLoading: isLoadingTrendingMovies } = useFetchTrendingMoviesQuery() // Новый запрос

  if (
    isLoadingNowPlayingMovies ||
    isLoadingPopularMovies ||
    isLoadingUpcomingMovies ||
    isLoadingTopRatedMovies ||
    isLoadingTrendingMovies // Учитываем загрузку новых данных
  ) {
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

  const categories = [
    { title: 'Сейчас в тренде', movies: trendingMovies || [] }, // Новый раздел
    { title: 'Сейчас в прокате', movies: nowPlayingMovies || [] },
    { title: 'Популярные в этом месяце', movies: popularMovies || [] },
    { title: 'Самые ожидаемые премьеры', movies: upcomingMovies || [] },
    { title: 'Топ рейтинговые фильмы за все время', movies: topRatedMovies || [] }
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

        {categories.map(({ title, movies }) => (
          <MovieCategory key={title} title={title} movies={movies} />
        ))}
      </Box>
    </>
  )
}

export default Home

// 'use client'

// import Head from 'next/head'
// import '../styles/global.sass'
// import Link from 'next/link'
// import { ViewDay } from '@mui/icons-material'
// import {
//   Typography,
//   Box,
//   Card,
//   CardMedia,
//   CardContent,
//   CardActionArea,
//   Button,
//   CircularProgress
// } from '@mui/material'
// import { useFetchMoviesByFiltersQuery } from '@/common/services/moviesApiTMDB'
// import 'slick-carousel/slick/slick.css'
// import 'slick-carousel/slick/slick-theme.css'
// import Slider from 'react-slick'

// export default function Home() {
//   const settings = {
//     dots: false,
//     infinite: true,
//     speed: 600,
//     slidesToShow: 7,
//     slidesToScroll: 2,
//     draggable: true,
//     responsive: [
//       {
//         breakpoint: 1440,
//         settings: {
//           slidesToShow: 6,
//           slidesToScroll: 3
//         }
//       },
//       {
//         breakpoint: 1200,
//         settings: {
//           slidesToShow: 4,
//           slidesToScroll: 3
//         }
//       },
//       {
//         breakpoint: 900,
//         settings: {
//           slidesToShow: 3,
//           slidesToScroll: 1,
//           arrows: false
//         }
//       },
//       {
//         breakpoint: 600,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 1,
//           arrows: false
//         }
//       },
//       {
//         breakpoint: 400,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//           arrows: false
//         }
//       }
//     ]
//   }

//   const today = new Date()
//   const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
//     .toISOString()
//     .split('T')[0]
//   const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)
//     .toISOString()
//     .split('T')[0]

//   const { data: trendingMovies, isLoading: isLoadingTrendingMovies } = useFetchMoviesByFiltersQuery(
//     {
//       sort_by: 'popularity.desc',
//       'primary_release_date.gte': startOfMonth,
//       'primary_release_date.lte': endOfMonth,
//       with_original_language: 'ru',
//       page: 1
//     }
//   )

//   const { data: popularMovies, isLoading: isLoadingPopularMovies } = useFetchMoviesByFiltersQuery({
//     sort_by: 'popularity.desc',
//     page: 1,
//     with_original_language: 'ru'
//   })

//   const { data: topInRussiaMovies, isLoading: isLoadingTopInRussiaMovies } =
//     useFetchMoviesByFiltersQuery({
//       sort_by: 'vote_average.desc',
//       'primary_release_date.gte': startOfMonth,
//       'primary_release_date.lte': endOfMonth,
//       region: 'RU',
//       with_original_language: 'ru',
//       page: 1
//     })

//   const { data: expectedMovies, isLoading: isLoadingExpectedMovies } = useFetchMoviesByFiltersQuery(
//     {
//       sort_by: 'release_date.desc',
//       'release_date.gte': startOfMonth,
//       'release_date.lte': endOfMonth,
//       page: 1
//     }
//   )

//   const { data: bestMovies, isLoading: isLoadingBestMovies } = useFetchMoviesByFiltersQuery({
//     sort_by: 'vote_average.desc',
//     'primary_release_date.gte': startOfMonth,
//     'primary_release_date.lte': endOfMonth,
//     region: 'RU',
//     with_original_language: 'ru',
//     page: 1
//   })

//   if (
//     isLoadingTrendingMovies ||
//     isLoadingPopularMovies ||
//     isLoadingTopInRussiaMovies ||
//     isLoadingExpectedMovies ||
//     isLoadingBestMovies
//   ) {
//     return (
//       <Box
//         display="flex"
//         justifyContent="center"
//         alignItems="center"
//         minHeight="100vh"
//         sx={{
//           color: 'secondary.contrastText',
//           bgcolor: 'background.paper',
//           width: '100%',
//           overflow: 'hidden'
//         }}
//       >
//         <CircularProgress sx={{ color: 'secondary.contrastText' }} />
//       </Box>
//     )
//   }

//   const categories = [
//     { title: 'В тренде в этом месяце', movies: trendingMovies || [] },
//     { title: 'Популярные в этом месяце', movies: popularMovies || [] },
//     { title: 'Топ 10 в России в этом месяце', movies: topInRussiaMovies || [] },
//     { title: 'Самые ожидаемые премьеры в прокате и онлайн', movies: expectedMovies || [] },
//     { title: 'Лучшие фильмы', movies: bestMovies || [] }
//   ]

//   return (
//     <>
//       <Head>
//         <Link rel="icon" href="/favicon.ico" />
//         <meta property="og:image" content="/logomain.jpg" />
//       </Head>
//       <Box
//         component="main"
//         minHeight={'100%'}
//         sx={{
//           padding: { xs: '10px', sm: '15px', md: '30px' },
//           color: 'secondary.contrastText',
//           bgcolor: 'background.paper',
//           width: '100%',
//           overflow: 'hidden'
//         }}
//       >
//         <Typography variant="h3" gutterBottom textAlign={'center'} mb={5}>
//           Фильмы
//         </Typography>

//         {categories.map(({ title, movies }) => (
//           <Box key={title} sx={{ mb: 4 }}>
//             <Box
//               display="flex"
//               justifyContent="space-between"
//               alignItems="center"
//               sx={{ flexDirection: { xs: 'column', sm: 'row' }, padding: '0 10px' }}
//               mb={2}
//             >
//               <Typography variant="h5" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
//                 {title}
//               </Typography>

//               <Link href={`/${title.toLowerCase().replace(/\s+/g, '-')}`}>
//                 <Button variant="contained">Просмотреть все</Button>
//               </Link>
//             </Box>

//             <Slider {...settings}>
//               {movies.map((movie) => (
//                 <Box
//                   key={movie.id}
//                   sx={{
//                     padding: '10px',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     alignContent: 'center',
//                     transition: 'transform 0.3s ease-in-out',
//                     '&:hover': {
//                       transform: 'scale(1.05)'
//                     }
//                   }}
//                 >
//                   <Card
//                     sx={{
//                       height: '225px',
//                       width: '150px',
//                       borderRadius: '10px',
//                       position: 'relative',
//                       textAlign: 'center',
//                       margin: { xs: '0 auto', sm: '0' }
//                     }}
//                   >
//                     <CardActionArea>
//                       {movie.image ? (
//                         <CardMedia
//                           component="img"
//                           image={movie.image}
//                           alt={movie.title}
//                           sx={{
//                             color: 'secondary.contrastText',
//                             width: '100%',
//                             height: '225px',
//                             margin: '0 auto'
//                           }}
//                         />
//                       ) : (
//                         <Box
//                           sx={{
//                             width: '100%',
//                             height: '225px',
//                             display: 'flex',
//                             alignItems: 'center',
//                             justifyContent: 'center'
//                           }}
//                         >
//                           <ViewDay
//                             sx={{
//                               width: '60px',
//                               height: '60px',
//                               margin: '0 auto',
//                               color: 'grey'
//                             }}
//                           />
//                         </Box>
//                       )}
//                       <Box
//                         sx={{
//                           position: 'absolute',
//                           fontWeight: 'bold',
//                           top: 0,
//                           right: 0,
//                           backgroundColor: movie.rating < 7 ? 'orange' : 'green',
//                           color: 'white',
//                           padding: '2px 12px',
//                           borderRadius: '0 10px 0 10px'
//                         }}
//                       >
//                         {movie.rating}
//                       </Box>
//                     </CardActionArea>
//                   </Card>
//                   <CardContent
//                     sx={{
//                       padding: '0px',
//                       maxWidth: { xs: 'auto', sm: '150px' },
//                       display: 'flex',
//                       flexDirection: 'column',
//                       alignItems: 'center'
//                       // textAlign: { xs: 'center', sm: 'start' }
//                     }}
//                   >
//                     <Typography
//                       variant="body2"
//                       color="secondary.contrastText"
//                       fontWeight={'bold'}
//                       fontSize="16px"
//                       component="p"
//                       sx={{
//                         display: '-webkit-box',
//                         WebkitBoxOrient: 'vertical',
//                         WebkitLineClamp: 2,
//                         overflow: 'hidden',
//                         textOverflow: 'ellipsis',
//                         textAlign: 'center'
//                       }}
//                     >
//                       {movie.title}
//                     </Typography>
//                     <Typography variant="body2" color="secondary.contrastText" component="p">
//                       {movie.year}
//                     </Typography>

//                     <Link href={`/movies/${movie.id}`}>
//                       <Button variant="contained" size="small">
//                         Подробнее
//                       </Button>
//                     </Link>
//                   </CardContent>
//                 </Box>
//               ))}
//             </Slider>
//           </Box>
//         ))}
//       </Box>
//     </>
//   )
// }

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
// import {
//   useFetchMoviesQuery,
//   useFetchTopInRussiaQuery,
//   useFetchPopularMoviesQuery,
//   useFetchExpectedMoviesQuery,
//   useFetchBestMoviesQuery
// } from '@/common/services/moviesApi'

// export default function Home() {
//   const { data: movies, isLoading: isLoadingMovies } = useFetchMoviesQuery()
//   const { data: topInRussia, isLoading: isLoadingTopInRussia } = useFetchTopInRussiaQuery()
//   const { data: popular, isLoading: isLoadingPopular } = useFetchPopularMoviesQuery()
//   const { data: expected, isLoading: isLoadingExpected } = useFetchExpectedMoviesQuery()
//   const { data: best, isLoading: isLoadingBest } = useFetchBestMoviesQuery()

//   if (
//     isLoadingMovies ||
//     isLoadingTopInRussia ||
//     isLoadingPopular ||
//     isLoadingExpected ||
//     isLoadingBest
//   ) {
//     return (
//       <Typography component={'p'} width={'100%'}>
//         Loading...
//       </Typography>
//     )
//   }

//   const categories = [
//     { title: 'В тренде', movies: movies?.trending || [] },
//     { title: 'Топ 10 в России', movies: topInRussia || [] },
//     { title: 'Популярные', movies: popular || [] },
//     { title: 'Ожидаемые', movies: expected || [] },
//     { title: 'Лучшие', movies: best || [] }
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
