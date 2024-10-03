// 'use client'
// import React from 'react'
// import { useFetchMoviesByFiltersQuery } from '@/common/services/moviesApiTMDB'
// import MovieCard from '@/components/Films/MovieCard'
// import { Typography, Box, Button, CircularProgress, Skeleton } from '@mui/material'
// import Link from 'next/link'
// import 'slick-carousel/slick/slick.css'
// import 'slick-carousel/slick/slick-theme.css'
// import Slider from 'react-slick'
// import Head from 'next/head'

// interface GenreProps {
//   id: number
//   title: string
// }

// const Genre: React.FC<GenreProps> = ({ id, title }) => {
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

//   const { data, isLoading } = useFetchMoviesByFiltersQuery({
//     include_adult: 'true',
//     include_video: 'true',
//     language: 'ru-RU',
//     sort_by: 'popularity.desc',
//     primary_release_year: '2024',
//     certification_country: '%D0%A0%D0%BE%D1%81%D1%81%D0%B8%D1%8F',
//     region: 'RU',
//     page: 1,
//     with_genres: id
//   })

//   if (isLoading) {
//     return (
//       <Box key={title} sx={{ mb: 4 }}>
//         <Box
//           display="flex"
//           justifyContent="space-between"
//           alignItems="center"
//           sx={{ flexDirection: { xs: 'column', sm: 'row' }, padding: '0 10px' }}
//           mb={2}
//         >
//           <Typography variant="h5" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
//             {title}
//           </Typography>
//           <Link href={`/${title.toLowerCase().replace(/\s+/g, '-')}`}>
//             <Button variant="contained">Просмотреть все</Button>
//           </Link>
//         </Box>

//         <Slider {...settings}>
//           {Array.from({ length: 7 }).map((_, index) => (
//             <Box key={index} sx={{ width: 150, height: 225, p: 1, borderRadius: '10px' }}>
//               <Skeleton variant="rectangular" width="100%" height="100%" />
//             </Box>
//           ))}
//         </Slider>
//       </Box>
//     )
//   }

//   return (
//     <Box key={title} sx={{ mb: 4 }}>
//       <Box
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//         sx={{ flexDirection: { xs: 'column', sm: 'row' }, padding: '0 10px' }}
//         mb={2}
//       >
//         <Typography variant="h5" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
//           {title}
//         </Typography>

//         <Link href={`/${title.toLowerCase().replace(/\s+/g, '-')}`}>
//           <Button variant="contained">Просмотреть все</Button>
//         </Link>
//       </Box>

//       {data && (
//         <Slider {...settings}>
//           {data.map((movie) => (
//             <MovieCard key={movie.id} movie={movie} />
//           ))}
//         </Slider>
//       )}
//     </Box>
//   )
// }

// export default function Films() {
//   const genres = [
//     { id: 28, title: 'Боевики' },
//     { id: 12, title: 'Приключения' },
//     { id: 16, title: 'Анимация' },
//     { id: 35, title: 'Комедии' },
//     { id: 80, title: 'Криминал' },
//     { id: 99, title: 'Документальный' },
//     { id: 18, title: 'Драма' },
//     { id: 10751, title: 'Семейные' },
//     { id: 14, title: 'Фэнтези' },
//     { id: 36, title: 'Исторические' },
//     { id: 27, title: 'Ужасы' },
//     { id: 10749, title: 'Мелодрама' },
//     { id: 878, title: 'Научная фантастика' },
//     { id: 10770, title: 'Телевизионный фильм' },
//     { id: 53, title: 'Триллеры' },
//     { id: 10752, title: 'Военные' },
//     { id: 37, title: 'Вестерны' }
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

//         {genres.map((genre) => (
//           <Genre key={genre.id} id={genre.id} title={genre.title} />
//         ))}
//       </Box>
//     </>
//   )
// }
// ПОСЛЕДНИЙ РАБОЧИЙ ВАРИАНТ
import React, { FC } from 'react'
import Head from 'next/head'
import { Box, Typography } from '@mui/material'
import Genre from './components/Genre'
import Link from 'next/link'
import { MAIN_FILMS_GENRE_LIST } from '@/common/constants/constants'

const Films: FC = () => {
  const genres = MAIN_FILMS_GENRE_LIST

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
        {genres.map((genre) => (
          <Genre key={genre.id} id={genre.id} title={genre.title} />
        ))}
      </Box>
    </>
  )
}

export default Films
