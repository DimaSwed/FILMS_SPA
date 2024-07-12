'use client'

import { FC } from 'react'
import { Box, Button, Typography } from '@mui/material'
import Image from 'next/image'

const SubscriptionInfo: FC = () => {
  return (
    <Box
      style={{
        padding: '10px',
        textAlign: 'center',
        marginBottom: '20px'
      }}
    >
      <Image
        src="/images/logo_main.png"
        alt="logo"
        width="90"
        height="95"
        style={{ margin: '0 auto 20px auto' }}
      />
      <Typography variant="h6" mb={1}>
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
      </Button>
    </Box>
  )
}

export default SubscriptionInfo
