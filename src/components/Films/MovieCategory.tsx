// БЕЗ СКЕЛЕТОНА
// 'use client'

// import { FC, useState, useEffect } from 'react'
// import { Box, Typography, Button } from '@mui/material'
// import Link from 'next/link'
// import 'slick-carousel/slick/slick.css'
// import 'slick-carousel/slick/slick-theme.css'
// import Slider from 'react-slick'
// import MovieCard from './MovieCard'
// import { Movie } from '@/common/types/types'
// import './arrow.sass'
// import { SkeletonMovieCard } from './SkeletonLoader'

// interface MovieCategoryProps {
//   title: string
//   movies: Movie[]
// }

// const MovieCategory: FC<MovieCategoryProps> = ({ title, movies }) => {
//   // Состояние загрузки
//   const [isLoading, setIsLoading] = useState(true)

//   // Эмуляция загрузки данных
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsLoading(false)
//     }, 2000) // Установите время ожидания, которое вам нужно

//     return () => clearTimeout(timer)
//   }, [])
//   const settings = {
//     dots: false,
//     infinite: true,
//     speed: 600,
//     slidesToShow: 7,
//     slidesToScroll: 2,
//     draggable: true,
//     arrows: true,
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
//   return (
//     <Box sx={{ mb: 4 }}>
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

//       {/* <Slider {...settings}>
//         {movies.map((movie) => (
//           <MovieCard key={movie.id} movie={movie} />
//         ))}
//       </Slider> */}
//       <Slider {...settings}>
//         {isLoading
//           ? Array.from(new Array(7)).map((_, index) => <SkeletonMovieCard key={index} />)
//           : movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
//       </Slider>
//     </Box>
//   )
// }

// export default MovieCategory
'use client'

import { FC } from 'react'
import { Box, Typography, Button } from '@mui/material'
import Link from 'next/link'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import MovieCard from './MovieCard'
import { Movie } from '@/common/types/types'
import './arrow.sass'
import { SkeletonMovieCard } from '../../common/utils/SkeletonMovieCard'

interface MovieCategoryProps {
  title: string
  movies: Movie[]
  isLoading: boolean
}

const MovieCategory: FC<MovieCategoryProps> = ({ title, movies, isLoading }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 7,
    slidesToScroll: 2,
    draggable: true,
    arrows: true,
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

  return (
    <Box sx={{ mb: 4 }}>
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
        {isLoading
          ? Array.from(new Array(7)).map((_, index) => <SkeletonMovieCard key={index} />)
          : movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </Slider>
    </Box>
  )
}

export default MovieCategory
