import Head from 'next/head'
import '../styles/global.sass'
import Link from 'next/link'
import { Box, Container, Typography } from '@mui/material'
import Sidebar from '@/components/Sidebar/Sidebar'

export default function Home() {
  return (
    <>
      <Head>
        <Link rel="icon" href="/favicon.ico" />
      </Head>
      <Box component="main" bgcolor={'primary.main'} minHeight={'100%'}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {/* Основное содержимое страницы */}
        </Box>
      </Box>
    </>
  )
}
