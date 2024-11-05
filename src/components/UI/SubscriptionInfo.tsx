import { FC } from 'react'
import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import avatar from '/public/avatar.png'
import { useGetUserDetailsQuery } from '@/common/services/moviesApiTMDB'
import { useSelector } from 'react-redux'
import { RootState } from '@/common/store'

const SubscriptionInfo: FC = () => {
  const sessionId = useSelector((state: RootState) => state.auth.sessionId)
  const {
    data: user,
    error,
    isLoading
  } = useGetUserDetailsQuery(sessionId!, {
    skip: !sessionId // пропускает запрос, если sessionId не определен
  })

  console.log('user: ', user)

  if (isLoading) return <Typography>Loading...</Typography>
  if (error) {
    const errorMessage =
      'status' in error && error.data ? error.data.toString() : 'An error occurred'
    return <Typography>Error: {errorMessage}</Typography>
  }

  return (
    <Box
      style={{
        padding: '10px',
        textAlign: 'center',
        color: 'text.primary'
      }}
    >
      {user?.tmdb?.avatar_path ? (
        <Image
          src={`https://image.tmdb.org/t/p/w500${user?.tmdb?.avatar_path}`}
          alt="avatar"
          width="90"
          height="95"
          priority
          style={{ margin: '0 auto 10px auto' }}
        />
      ) : (
        <Image
          src={avatar}
          alt="logo"
          width="90"
          height="95"
          priority
          style={{ margin: '0 auto 10px auto' }}
        />
      )}

      <Typography variant="body1" mb={1}>
        {user?.username}
      </Typography>
      <Typography variant="body2" mb={1}>
        ID: {user?.id}
      </Typography>
      <Typography variant="body2" mb={1}>
        {user?.email}
      </Typography>
      {/* <Typography variant="body2">Авторизация с помощью :</Typography> */}
      {/* <Typography variant="h6" mb={1}>
        Название подписки
      </Typography>
      <Typography variant="body2" mb={1}>
        Разблокировать все функции. Поддержка КиноТрекер.
      </Typography>
      <Button
        variant="contained"
        sx={{ textTransform: 'uppercase', bgcolor: 'primary.light', borderRadius: '20px' }}
      >
        Попробовать бесплатно
      </Button> */}
    </Box>
  )
}

export default SubscriptionInfo
