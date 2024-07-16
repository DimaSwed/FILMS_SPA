import { FC } from 'react'
import { Box, Button, Typography } from '@mui/material'
import Image from 'next/image'
import logo from '/public/logomain.jpg'

const SubscriptionInfo: FC = () => {
  return (
    <Box
      style={{
        padding: '10px',
        textAlign: 'center',
        color: 'text.primary'
      }}
    >
      <Image src={logo} alt="logo" width="90" height="95" style={{ margin: '0 auto 10px auto' }} />
      <Typography variant="body1">@dimaswed</Typography>
      <Typography variant="body2" mb={1}>
        swed88@mail.ru
      </Typography>
      <Typography variant="body2">Авторизация с помощью :</Typography>
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
