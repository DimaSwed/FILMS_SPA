'use client'
import { Box, Typography, Card, CardMedia, Grid, Button, CircularProgress } from '@mui/material'
import {
  useAddMovieToWatchlistMutation,
  useFetchMovieByIdQuery
} from '@/common/services/moviesApiTMDB'
import StarIcon from '@mui/icons-material/Star'
import AddIcon from '@mui/icons-material/Add'

export default function Movie({ params }: { params: { id: string } }) {
  const { id } = params
  const { data: movie, isLoading, error } = useFetchMovieByIdQuery(Number(id))
  const [addMovieToWatchlist, { isLoading: addingToWatchlist, isError }] =
    useAddMovieToWatchlistMutation()

  const handleAddToWatchlist = async () => {
    try {
      await addMovieToWatchlist({ movieId: Number(id) }).unwrap()
    } catch (error) {
      console.error('Ошибка при добавлении в список просмотра:', error)
    }
  }

  if (isLoading)
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          width: '100%'
        }}
      >
        <CircularProgress />
      </Box>
    )
  if (error) return <Box>Ошибка при загрузке информации о фильме.</Box>

  return (
    <Box
      component="main"
      minHeight={'100%'}
      sx={{
        color: 'secondary.contrastText',
        bgcolor: 'background.paper',
        width: '100%',
        overflow: 'hidden',
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.9), rgba(0,0,0,0.3)), url(${movie?.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh'
      }}
    >
      <Grid
        container
        spacing={4}
        sx={{
          padding: { xs: '10px', sm: '15px', md: '30px' }
        }}
      >
        {/* Movie Poster */}
        <Grid item xs={12} md={4}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              alt={movie?.title || 'Movie Poster'}
              height="500"
              image={movie?.image}
            />
          </Card>
        </Grid>

        {/* Movie Details */}
        <Grid item xs={12} md={8} color={'white'}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              {`"${movie?.title}"` || 'Название не доступно'}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {movie?.description || 'Описание не доступно.'}
            </Typography>
          </Box>

          {/* Additional Details */}
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={6} md={3}>
              <Typography variant="subtitle1">
                {' '}
                <strong>Дата релиза:</strong>
              </Typography>
              <Typography variant="body2">
                {movie?.releaseDate
                  ? new Date(movie.releaseDate).toLocaleString('ru-RU', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })
                  : 'Не доступно'}
              </Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <Typography variant="subtitle1">
                <strong>Жанр:</strong>
              </Typography>
              <Typography variant="body2">{movie?.genre || 'Не доступно'}</Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <Typography variant="subtitle1">
                {' '}
                <strong>Рейтинг:</strong>
              </Typography>
              <Typography variant="body2">{movie?.rating.toFixed(1) || 'Не доступно'}</Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <Typography variant="subtitle1">
                {' '}
                <strong>Длительность фильма:</strong>
              </Typography>
              <Typography variant="body2">
                {movie?.duration
                  ? `${Math.floor(movie.duration / 60)} ч. ${movie.duration % 60} мин.`
                  : 'Не доступно'}
              </Typography>
            </Grid>
          </Grid>

          {/* Buttons (Watchlist, Rate, etc.) */}
          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <Button variant="contained" startIcon={<StarIcon />} color="primary">
              Rate
            </Button>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              color="primary"
              disabled={addingToWatchlist}
              onClick={handleAddToWatchlist}
            >
              {addingToWatchlist ? 'Добавление ...' : 'Добавить в список просмотра'}
              {isError && (
                <Typography color="error" variant="body2">
                  Ошибка при добавлении
                </Typography>
              )}
            </Button>

            {/* <IconButton color="primary" aria-label="watch later">
              <WatchLaterIcon />
            </IconButton> */}
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
