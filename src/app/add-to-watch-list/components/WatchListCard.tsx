import { Box, Card, CardMedia, Typography, Rating, Button } from '@mui/material'
import { FC } from 'react'
import { Movie } from '@/common/types/types'

interface MovieCardProps {
  movie: Movie
  onRemoveFromWatchlist: (movieId: number) => void
}

const MovieCard: FC<MovieCardProps> = ({ movie, onRemoveFromWatchlist }) => (
  <Card
    sx={{
      display: 'flex',
      alignItems: 'center',
      mb: 2,
      boxShadow: 4,
      borderRadius: 2,
      bgcolor: 'background.paper'
    }}
  >
    <CardMedia
      component="img"
      sx={{ width: 150, height: 225 }}
      image={movie.image}
      alt={movie.title}
    />
    <Box sx={{ flex: 1, p: 2, display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6" sx={{ color: 'secondary.contrastText' }}>
        {movie.title}
      </Typography>
      <Typography variant="body2" sx={{ color: 'secondary.contrastText' }}>
        Год: {movie.year}
      </Typography>
      <Typography variant="body2" sx={{ color: 'secondary.contrastText' }}>
        Жанр: {movie.genre ?? 'Неизвестно'}
      </Typography>
      <Rating value={movie.rating} readOnly />
      <Button
        variant="contained"
        color="error"
        onClick={() => onRemoveFromWatchlist(movie.id)}
        sx={{ mt: 2, maxWidth: '170px' }}
      >
        Убрать из списка
      </Button>
    </Box>
  </Card>
)

export default MovieCard
