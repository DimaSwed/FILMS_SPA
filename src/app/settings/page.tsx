// pages/settings.tsx
import React, { FC } from 'react'
import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Stack
} from '@mui/material'
import { Settings, Star, Share, Support, Email, PrivacyTip } from '@mui/icons-material'
import SubscriptionInfo from '@/components/UI/SubscriptionInfo'
import Link from 'next/link'

const SettingsPage: FC = () => {
  return (
    <Stack
      sx={{
        padding: '30px',
        color: 'secondary.contrastText',
        bgcolor: 'background.paper',
        width: '100%'
      }}
    >
      <Container
        maxWidth="lg"
        sx={{ mt: 4, color: 'secondary.contrastText', bgcolor: 'background.paper' }}
      >
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
          Дополнительно
        </Typography>

        <SubscriptionInfo />

        <Divider sx={{ backgroundColor: '#444' }} />

        {/* <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Настройки приложения
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText primary="Общие" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText primary="Отображение" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText primary="Уведомления" />
              <Typography variant="body2" color="psecondary.contrastText" sx={{ ml: 'auto' }}>
                Плюс+
              </Typography>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText primary="Где посмотреть" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText primary="Расширенные" />
            </ListItem>
          </List>
        </Box>

        <Divider sx={{ backgroundColor: '#444', my: 4 }} /> */}

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            О нас
          </Typography>
          <Typography variant="body2">
            КиноТрекер - новая платформа для поиска онлайн-трансляций, которая поможет вам узнать,
            где вы можете смотреть фильмы легально. Что нового в кинематографе? Где можно посмотреть
            фильм, о котором вы говорили? Как не упустить премьеры и составить собственные списки? В
            нашем приложении вы найдете все это. Чтобы сделать это взаимодействие более удобным, вы
            можете настроить свои параметры и использовать простые фильтры для разных поставщиков,
            таких как Кинопоиск, и различных жанров или годов выпуска фильмов.
            <br />
            <br />
            Наша цель - обеспечить любителям кино доступ к их любимым фильмам по всему миру.
            <br />
            <br />
            КиноТрекер начинает свою работу как веб-приложение, оптимизированное для планшетов и
            смартфонов. Однако оно также совместимо с ноутбуками и компьютерами. Использование
            нашего сервиса для пользователей абсолютно бесплатно.
          </Typography>
        </Box>

        <Divider sx={{ backgroundColor: '#444', my: 4 }} />

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Ваша благодарность
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <Star />
              </ListItemIcon>
              <ListItemText primary="Поставить рейтинг" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Share />
              </ListItemIcon>
              <ListItemText primary="Рекомендовать друзьям" />
            </ListItem>
          </List>
        </Box>

        <Divider sx={{ backgroundColor: '#444', my: 4 }} />

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Обратная связь
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <Support />
              </ListItemIcon>
              <ListItemText primary="Подписаться @FilmTraker" />
            </ListItem>

            <Link href="mailto:vip-performance37@mail.ru">
              <ListItem button>
                <ListItemIcon>
                  <Email />
                </ListItemIcon>
                <ListItemText
                  primary="vip-performance37@mail.ru"
                  sx={{ color: 'secondary.contrastText' }}
                />
              </ListItem>
            </Link>
          </List>
        </Box>

        <Divider sx={{ backgroundColor: '#444', my: 4 }} />

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Важное
          </Typography>
          <List>
            <Link href="/legal-info" passHref style={{ textDecoration: 'none' }}>
              <ListItem>
                <ListItemIcon>
                  <PrivacyTip />
                </ListItemIcon>
                <ListItemText
                  sx={{ color: 'secondary.contrastText' }}
                  primary="Политика конфиденциальности"
                />
              </ListItem>
            </Link>
          </List>
        </Box>

        <Divider sx={{ backgroundColor: '#444', my: 4 }} />

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Источники информации
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText primary="Trakt.tv API" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText primary="TMDb API" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText primary="JustWatch" />
            </ListItem>
          </List>
        </Box>
      </Container>
    </Stack>
  )
}

export default SettingsPage
