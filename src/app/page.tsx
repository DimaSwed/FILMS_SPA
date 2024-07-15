import Head from 'next/head'
import '../styles/global.sass'
import Link from 'next/link'
import { ViewDay } from '@mui/icons-material'
import { Typography, Box, Grid, Card, CardContent, CardActionArea } from '@mui/material'

export default function Home() {
  return (
    <>
      <Head>
        <Link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        component="main"
        bgcolor={'primary.main'}
        minHeight={'100%'}
        sx={{
          padding: '30px',
          color: 'secondary.contrastText',
          bgcolor: 'background.paper',
          width: '100%'
        }}
      >
        <Typography variant="h4" gutterBottom>
          Фильмы
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h5">Name</Typography>
            <Typography variant="body2" sx={{ cursor: 'pointer' }}>
              Просмотреть все
            </Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={6} sm={4} md={3} lg={2}>
              <Card>
                <CardActionArea>
                  <Box
                    height="140px"
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <ViewDay
                      sx={{
                        width: '80px',
                        height: '80px',
                        margin: '0 auto',
                        color: 'secondary.contrastText'
                      }}
                    />
                  </Box>

                  <CardContent>
                    <Typography variant="body2" color="secondary.contrastText" component="p">
                      Заголовок
                    </Typography>
                    <Typography variant="body2" color="secondary.contrastText">
                      Рейтинг
                    </Typography>

                    <Typography variant="body2" color="secondary.contrastText">
                      Просмотренные
                    </Typography>

                    <Typography variant="body2" color="secondary.contrastText">
                      Подборка для Вас
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  )
}
