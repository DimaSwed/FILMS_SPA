'use client'
import { FC } from 'react'
import { Box, Typography } from '@mui/material'

const ErrorWrapper: FC<{ error: Error }> = ({ error }) => {
  return (
    <Box
      bgcolor={'primary.main'}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
        minHeight: '100vh',
        color: 'white'
      }}
    >
      <Typography variant={'h4'} sx={{ textAlign: 'center' }}>
        Упс... Кажется произошла ошибка:
      </Typography>
      <Typography variant={'h6'} fontWeight={'bold'} color={'tomato'}>
        {error.message}
      </Typography>
    </Box>
  )
}

export default ErrorWrapper
