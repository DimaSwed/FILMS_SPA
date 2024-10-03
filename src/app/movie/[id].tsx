import { useRouter } from 'next/router'
import { Box, Typography, Card, CardMedia, CardContent } from '@mui/material'
import { useFetchMovieByIdQuery } from '@/common/services/moviesApiTMDB'

export default function Movie() {
  const router = useRouter()
  const { id } = router.query
  const { data: movie, isLoading, error } = useFetchMovieByIdQuery(Number(id))

  if (isLoading) return <Box>Loading...</Box>
  if (error) return <Box>Error loading movie details.</Box>

  console.log('Movie data:', movie) // Добавляем вывод данных для проверки

  return (
    <Box>
      <Card>
        <CardMedia component="img" alt={movie?.title} height="500" image={movie?.image} />
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {movie?.title || 'Title not available'}
          </Typography>
          <Typography variant="body1">
            {movie?.description || 'No description available.'}
          </Typography>

          <Typography variant="h6" gutterBottom>
            Release Date: {movie?.genre || 'Genres date not available'}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Genre: {movie?.year || 'Release date not available'}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Rating: {movie?.rating || 'Rating not available'}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Duration: {movie?.duration || 'Duration not available'}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}
