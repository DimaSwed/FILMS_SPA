import Head from 'next/head'
import '../styles/global.sass'
import Link from 'next/link'
import { Box } from '@mui/material'

export default function Home() {
  return (
    <>
      <Head>
        <Link rel="icon" href="/favicon.ico" />
      </Head>
      <Box component="main" bgcolor={'primary.main'} minHeight={'100%'}>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}></Box>
      </Box>
    </>
  )
}
