import React, { FC } from 'react'
import Head from 'next/head'
import { Box, Typography } from '@mui/material'
import Genre from './components/Genre'
import Link from 'next/link'
import { MAIN_FILMS_GENRE_LIST } from '@/common/constants/constants'

const Films: FC = () => {
  const genres = MAIN_FILMS_GENRE_LIST

  return (
    <>
      <Head>
        <Link rel="icon" href="/favicon.ico" />
        <meta property="og:image" content="/logomain.jpg" />
      </Head>
      <Box
        component="main"
        minHeight={'100%'}
        sx={{
          padding: { xs: '10px', sm: '15px', md: '30px' },
          color: 'secondary.contrastText',
          bgcolor: 'background.paper',
          width: '100%',
          overflow: 'hidden'
        }}
      >
        <Typography variant="h3" gutterBottom textAlign={'center'} mb={5}>
          Фильмы
        </Typography>
        {genres.map((genre) => (
          <Genre key={genre.id} id={genre.id} title={genre.title} />
        ))}
      </Box>
    </>
  )
}

export default Films
