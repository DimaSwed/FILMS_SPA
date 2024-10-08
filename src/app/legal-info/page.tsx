import { FC } from 'react'
import { Stack, Container, Typography, Divider } from '@mui/material'
import Link from 'next/link'
import Head from 'next/head'

const LegalInfo: FC = () => {
  return (
    <>
      <Head>
        <Link rel="icon" href="/favicon.ico" />
        <meta property="og:image" content="/logomain.jpg" />
      </Head>

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
          <Typography variant="h6">
            КиноТрекер не участвует в процедурах альтернативного разрешения споров в потребительском
            арбитражном совете и не обязан это делать по закону.
          </Typography>
          <Divider sx={{ backgroundColor: '#444', my: 4 }} />
          <Typography variant="h6">Политика ответственного раскрытия информации</Typography>
          <br />
          <Typography>
            Мы стремимся поддерживать безопасность и конфиденциальность платформы JustWatch. Мы
            приветствуем исследователей безопасности из сообщества, которые хотят помочь нам
            улучшить наши услуги. Если вы обнаружите уязвимость безопасности, дайте нам возможность
            исправить ее, написав нам по адресу{' '}
            <Link
              style={{ textDecoration: 'none' }} // изменяем цвет и убираем подчеркивание
              href="mailto:vip-performance37@mail.ru"
            >
              vip-performance37@mail.ru
            </Link>
            . Публичное раскрытие уязвимости безопасности без предварительного уведомления ставит
            под угрозу остальную часть сообщества. Когда вы сообщите нам о потенциальной проблеме,
            мы будем работать с вами, чтобы убедиться, что мы понимаем масштаб и причину проблемы.
            Благодарим вас за вашу работу и интерес к тому, чтобы сделать наш сервис безопаснее и
            надежнее!
          </Typography>

          <Divider sx={{ backgroundColor: '#444', my: 4 }} />
          <Typography variant="h6">Контент, права на изображения и авторские права</Typography>
          <br />
          <Typography>
            Контент КиноТрекер защищен законом об авторском праве. Любое воспроизведение,
            редактирование и распространение, а также любой вид использования за пределами закона об
            авторском праве требуют письменного согласия соответствующего автора или создателя.
            КиноТрекер использует API TMDb для получения контента, но не имеет прав на контент.
            Листинг взят из TMDb. Изображения взяты из TMDb. Весь внешний контент остается
            собственностью законного владельца. © 2024 КиноТрекер. КиноТрекер GmbH сохраняет за
            собой все права на бренд КиноТрекер, включая, помимо прочего, логотипы, платформу,
            приложения и программное обеспечение.
          </Typography>
        </Container>
      </Stack>
    </>
  )
}

export default LegalInfo
