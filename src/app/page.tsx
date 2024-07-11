import Head from 'next/head'
import '../styles/global.sass'
import Link from 'next/link'
import { Box, Container, Typography } from '@mui/material'

export default function Home() {
  return (
    <>
      <Head>
        <Link rel="icon" href="/favicon.ico" />
      </Head>
      <Box component="main" bgcolor={'primary.main'} minHeight={'100%'}>
        <Container maxWidth="xl">
          <Typography>Главная страница</Typography>
        </Container>
      </Box>
    </>
  )
}
