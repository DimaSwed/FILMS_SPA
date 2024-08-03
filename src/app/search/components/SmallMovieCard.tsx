// 'use client'
// import { FC, useState } from 'react'
// import {
//   Box,
//   Typography,
//   Button,
//   Grid,
//   IconButton,
//   CardMedia,
//   Card,
//   CardContent,
//   CardActionArea
// } from '@mui/material'
// import { Movie } from '@/common/types/types'
// import { Favorite, FavoriteBorder } from '@mui/icons-material'

// interface MovieCardProps {
//   movie: Movie
// }

// const MovieCard: FC<MovieCardProps> = ({ movie }) => {
//   const [isHovered, setIsHovered] = useState(false)
//   const [isFavorite, setIsFavorite] = useState(false)

//   const handleMouseEnter = () => setIsHovered(true)
//   const handleMouseLeave = () => setIsHovered(false)

//   const handleFavoriteToggle = () => setIsFavorite(!isFavorite)

//   const ratingColor = movie.rating < 7 ? 'warning.main' : 'success.main'

//   return (
//     <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
//       <Card
//         sx={{
//           width: '100%',
//           // maxHeight: '300px',
//           bgcolor: 'background.paper',
//           borderRadius: '15px',
//           overflow: 'hidden',
//           border: '1px solid #444',
//           position: 'relative',
//           transition: 'transform 0.3s ease',
//           '&:hover': {
//             transform: 'scale(1.05)'
//           }
//         }}
//         onMouseEnter={handleMouseEnter}
//         onMouseLeave={handleMouseLeave}
//       >
//         <CardActionArea>
//           <CardMedia
//             component="img"
//             image={movie.image}
//             alt={movie.title}
//             sx={{
//               objectFit: 'cover',
//               borderRadius: '15px'
//             }}
//           />

//           {isHovered && (
//             <CardContent
//               sx={{
//                 width: '100%',
//                 height: '100%',
//                 position: 'absolute',
//                 bottom: 0,
//                 left: 0,
//                 right: 0,
//                 bgcolor: 'background.paper',
//                 p: 2,
//                 borderTop: '1px solid #444',
//                 opacity: 1,
//                 color: 'secondary.contrastText',
//                 transform: 'translateY(0)',
//                 transition: 'opacity 0.3s ease, transform 0.3s ease'
//               }}
//             >
//               <Typography sx={{ mb: 1, color: ratingColor, fontWeight: 'bold' }}>
//                 Рейтинг: {movie.rating}
//               </Typography>
//               <Typography variant="body2" sx={{ mb: 1, fontWeight: 'bold' }}>
//                 {movie.title}
//               </Typography>
//               <Typography variant="body2" sx={{ mb: 1 }}>
//                 Год: {movie.year}
//               </Typography>
//               <Typography variant="body2" sx={{ mb: 1 }}>
//                 Жанр: {movie.genre}
//               </Typography>
//               {/* <Typography variant="body2" sx={{ mt: 1 }}>
//               Длительность: {movie.duration} мин
//             </Typography> */}

//               <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//                 <IconButton onClick={handleFavoriteToggle}>
//                   {isFavorite ? (
//                     <Favorite sx={{ color: 'red' }} />
//                   ) : (
//                     <FavoriteBorder sx={{ color: 'grey' }} />
//                   )}
//                 </IconButton>
//                 <Typography variant="body2">Добавить в список просмотра</Typography>
//               </Box>

//               <Button
//                 variant="contained"
//                 color="primary"
//                 sx={{ mt: 1, width: '100%' }}
//                 onClick={() => console.log('Перейти к странице фильма')}
//               >
//                 Подробнее
//               </Button>
//             </CardContent>
//           )}
//         </CardActionArea>
//       </Card>
//     </Grid>
//   )
// }

// export default MovieCard
'use client'
import { FC, useState } from 'react'
import {
  Box,
  Typography,
  Button,
  Grid,
  IconButton,
  CardMedia,
  Card,
  CardContent,
  CardActionArea
} from '@mui/material'
import { Movie } from '@/common/types/types'
import { Favorite, FavoriteBorder } from '@mui/icons-material'
import { useAddMovieToWatchlistMutation } from '@/common/services/moviesApiTMDB'

interface MovieCardProps {
  movie: Movie
}

const MovieCard: FC<MovieCardProps> = ({ movie }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [addMovieToWatchlist, { isLoading, isError }] = useAddMovieToWatchlistMutation() // Используем хук

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => setIsHovered(false)

  const handleFavoriteToggle = () => setIsFavorite(!isFavorite)

  const handleAddToWatchlist = async () => {
    try {
      await addMovieToWatchlist({ movieId: movie.id }).unwrap()
      // Если нужно, можно обновить состояние, например:
      // setIsFavorite(true)
    } catch (error) {
      console.error('Ошибка при добавлении в список просмотра:', error)
    }
  }

  const ratingColor = movie.rating < 7 ? 'warning.main' : 'success.main'

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
      <Card
        sx={{
          width: '100%',
          bgcolor: 'background.paper',
          borderRadius: '15px',
          overflow: 'hidden',
          border: '1px solid #444',
          position: 'relative',
          transition: 'transform 0.3s ease',
          '&:hover': {
            transform: 'scale(1.05)'
          }
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            image={movie.image}
            alt={movie.title}
            sx={{
              objectFit: 'cover',
              borderRadius: '15px'
            }}
          />

          {isHovered && (
            <CardContent
              sx={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                bgcolor: 'background.paper',
                p: 2,
                borderTop: '1px solid #444',
                opacity: 1,
                color: 'secondary.contrastText',
                transform: 'translateY(0)',
                transition: 'opacity 0.3s ease, transform 0.3s ease'
              }}
            >
              <Typography sx={{ mb: 1, color: ratingColor, fontWeight: 'bold' }}>
                Рейтинг: {movie.rating}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 'bold' }}>
                {movie.title}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Год: {movie.year}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Жанр: {movie.genre}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <IconButton onClick={handleFavoriteToggle}>
                  {isFavorite ? (
                    <Favorite sx={{ color: 'red' }} />
                  ) : (
                    <FavoriteBorder sx={{ color: 'grey' }} />
                  )}
                </IconButton>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ ml: 1 }}
                  onClick={handleAddToWatchlist}
                  disabled={isLoading} // Делаем кнопку неактивной во время загрузки
                >
                  {isLoading ? 'Добавление...' : 'Добавить в список просмотра'}
                </Button>
                {isError && (
                  <Typography color="error" variant="body2">
                    Ошибка при добавлении
                  </Typography>
                )}
              </Box>

              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 1, width: '100%' }}
                onClick={() => console.log('Перейти к странице фильма')}
              >
                Подробнее
              </Button>
            </CardContent>
          )}
        </CardActionArea>
      </Card>
    </Grid>
  )
}

export default MovieCard
