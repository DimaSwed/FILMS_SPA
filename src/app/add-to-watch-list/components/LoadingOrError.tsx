import { Box, CircularProgress, Typography } from '@mui/material'
import { FC } from 'react'

const LoadingOrError: FC<{ isLoading: boolean; isError: boolean; error?: any }> = ({
  isLoading,
  isError,
  error
}) => {
  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        sx={{ width: '100%', bgcolor: 'background.paper' }}
      >
        <CircularProgress sx={{ color: 'secondary.contrastText' }} />
      </Box>
    )
  }

  if (isError) {
    console.error('API Error:', error)
    return (
      <Box textAlign="center">
        <Typography variant="h5" color="error">
          Ошибка загрузки данных
        </Typography>
        <Typography variant="body1">
          Не удалось загрузить данные. Пожалуйста, попробуйте снова позже.
        </Typography>
      </Box>
    )
  }

  return null
}

export default LoadingOrError
