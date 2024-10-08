// 'use client'
// import React, { FC, useCallback, useEffect, useState } from 'react'
// import { AppBar, Box, Button, CssBaseline, Stack, Typography } from '@mui/material'
// import { SettingsButton } from './components/SettingsButton'
// import { ChangeThemeButton } from './components/ChangeThemeButton'
// import Link from 'next/link'
// import Image from 'next/image'
// import SearchMovieButton from './components/SearchMovieButton'
// import {
//   useCreateRequestTokenMutation,
//   useCreateSessionIdMutation
// } from '@/common/services/moviesApiTMDB'
// import { useRouter } from 'next/router'

// const Header: FC = () => {
//   const [createRequestToken] = useCreateRequestTokenMutation()
//   const [createSessionId] = useCreateSessionIdMutation()
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false) // Состояние авторизации
//   const router = useRouter()

//   // Функция для создания сессии
//   const handleSessionCreation = useCallback(
//     async (requestToken: string) => {
//       try {
//         const { session_id } = await createSessionId({ requestToken }).unwrap()
//         localStorage.setItem('session_id', session_id)
//         setIsAuthenticated(true)
//         console.log('Session ID:', session_id)
//         router.push('/')
//       } catch (error) {
//         console.error('Ошибка при создании session_id:', error)
//       }
//     },
//     [createSessionId, router]
//   )

//   // Проверка авторизации при монтировании компонента
//   useEffect(() => {
//     const session_id = localStorage.getItem('session_id')
//     if (session_id) {
//       setIsAuthenticated(true)
//     }

//     // Извлечение request_token из URL, если он есть
//     const { request_token, approved } = router.query
//     if (approved === 'true' && typeof request_token === 'string') {
//       handleSessionCreation(request_token)
//     }
//   }, [router.query, handleSessionCreation])

//   // Функция для авторизации через TMDB
//   const handleLogin = async () => {
//     try {
//       const { request_token } = await createRequestToken({}).unwrap()
//       const currentHost = window.location.origin
//       window.location.href = `https://www.themoviedb.org/authenticate/${request_token}?redirect_to=${currentHost}`
//     } catch (error) {
//       console.error('Ошибка при создании токена:', error)
//     }
//   }

//   // Функция для выхода из системы
//   const handleLogout = () => {
//     localStorage.removeItem('session_id') // Удаляем session_id из localStorage
//     setIsAuthenticated(false) // Обновляем состояние авторизации
//     router.push('/') // Перенаправляем пользователя на главную страницу
//   }

//   return (
//     <Stack direction="row">
//       <CssBaseline />
//       <AppBar
//         position="sticky"
//         sx={{
//           backgroundColor: 'primary.main',
//           backgroundImage: 'none',
//           padding: { xs: '15px', md: '15px 30px', lg: '15px 30px' },
//           display: 'flex',
//           gap: 2,
//           alignItems: 'center',
//           justifyContent: 'space-between',
//           margin: '0 auto',
//           width: '100%'
//         }}
//       >
//         <Box
//           component={'div'}
//           sx={{
//             display: 'flex',
//             gap: 2,
//             alignItems: 'center',
//             justifyContent: 'space-between',
//             margin: '0 auto',
//             width: '100%'
//           }}
//         >
//           <Box component={'div'}>
//             <Link
//               href="/"
//               passHref
//               style={{ display: 'flex', gap: 10, alignItems: 'center', textDecoration: 'none' }}
//             >
//               <Image
//                 src="/images/logo.jpg"
//                 alt="logo"
//                 width="70"
//                 height="50"
//                 style={{ borderRadius: '20px' }}
//               />
//               <Typography variant="h6" style={{ flexGrow: 1, fontWeight: 'bold', color: 'white' }}>
//                 КиноТрекер
//               </Typography>
//             </Link>
//           </Box>

//           <Box component={'div'} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
//             <ChangeThemeButton />
//           </Box>

//           <Box
//             component={'div'}
//             sx={{ display: { xs: 'none', sm: 'flex' }, gap: 3, alignItems: 'center' }}
//           >
//             <Stack
//               sx={{
//                 flexDirection: 'row',
//                 display: { xs: 'none', sm: 'flex' }
//               }}
//             >
//               {isAuthenticated ? (
//                 <Button onClick={handleLogout} sx={{ color: 'primary.contrastText' }}>
//                   Выйти
//                 </Button>
//               ) : (
//                 <>
//                   <Button onClick={handleLogin} sx={{ color: 'primary.contrastText' }}>
//                     Войти
//                   </Button>
//                   <Button sx={{ color: 'primary.contrastText' }}>Регистрация</Button>
//                 </>
//               )}
//               {/* <Link href="/login" passHref>
//                 <Button onClick={handleLogin} sx={{ color: 'primary.contrastText' }}>Войти</Button>
//               </Link>
//               <Link href="/register" passHref>
//                 <Button sx={{ color: 'primary.contrastText' }}>Регистрация</Button>
//               </Link> */}
//             </Stack>
//           </Box>
//           <Stack
//             sx={{
//               display: 'flex',
//               justifyContent: 'center',
//               alignItems: 'center',
//               flexDirection: 'row',
//               gap: 2
//             }}
//           >
//             <SearchMovieButton />
//             <Link href="/settings" passHref>
//               <SettingsButton />
//             </Link>
//           </Stack>
//         </Box>
//       </AppBar>
//     </Stack>
//   )
// }

// export default Header
'use client'
import React, { FC, useCallback, useEffect } from 'react'
import { AppBar, Box, Button, CssBaseline, Stack, Typography } from '@mui/material'
import { SettingsButton } from './components/SettingsButton'
import { ChangeThemeButton } from './components/ChangeThemeButton'
import Link from 'next/link'
import Image from 'next/image'
import SearchMovieButton from './components/SearchMovieButton'
import {
  moviesApi,
  useCreateRequestTokenMutation,
  useCreateSessionIdMutation
} from '@/common/services/moviesApiTMDB'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import Cookies from 'js-cookie' // Импортируем js-cookie
import { useDispatch, useSelector } from 'react-redux' // Импортируем useDispatch и useSelector
import { setAuthenticated } from '@/common/store/slices/slice-auth'
import { RootState } from '@/common/store'

const Header: FC = () => {
  const [createRequestToken] = useCreateRequestTokenMutation()
  const [createSessionId] = useCreateSessionIdMutation()
  const router = useRouter()
  const searchParams = useSearchParams()
  const dispatch = useDispatch() // Используем useDispatch
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated) // Получаем состояние из Redux

  // Функция для создания сессии
  const handleSessionCreation = useCallback(
    async (requestToken: string) => {
      console.log('Attempting to create session with requestToken:', requestToken) // Логируем токен
      try {
        const { session_id } = await createSessionId({ requestToken }).unwrap()
        console.log('Session ID received:', session_id) // Логируем полученный session_id
        Cookies.set('session_id', session_id, { expires: 7 })
        dispatch(setAuthenticated(true))
        console.log('User authenticated:', true)
        router.push('/')
      } catch (error) {
        console.error('Ошибка при создании session_id:', error)
      }
    },
    [createSessionId, router, dispatch]
  )

  // Проверка авторизации при монтировании компонента
  useEffect(() => {
    const session_id = Cookies.get('session_id') // Читаем session_id из куки
    console.log('Session ID from cookies:', session_id) // Log the session ID
    if (session_id) {
      dispatch(setAuthenticated(true)) // Устанавливаем isAuthenticated в Redux
      console.log('User authenticated from cookies:', true)
    } else {
      console.log('User not authenticated')
    }

    const request_token = searchParams.get('request_token')
    const approved = searchParams.get('approved')

    console.log('Request token:', request_token) // Log the request token
    console.log('Approved:', approved) // Log if approved

    if (approved === 'true' && typeof request_token === 'string') {
      handleSessionCreation(request_token)
    }
  }, [searchParams, handleSessionCreation, dispatch])

  // Функция для авторизации через TMDB
  const handleLogin = async () => {
    try {
      const { request_token } = await createRequestToken({}).unwrap()
      const currentHost = window.location.origin
      window.location.href = `https://www.themoviedb.org/authenticate/${request_token}?redirect_to=${currentHost}`
    } catch (error) {
      console.error('Ошибка при создании токена:', error)
    }
  }

  // Функция для выхода из системы
  const handleLogout = () => {
    Cookies.remove('session_id') // Удаляем session_id из куки
    dispatch(setAuthenticated(false)) // Устанавливаем isAuthenticated в Redux
    dispatch(moviesApi.util.resetApiState())
    console.log('User logged out')
    router.push('/')
  }

  return (
    <Stack direction="row">
      <CssBaseline />
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: 'primary.main',
          backgroundImage: 'none',
          padding: { xs: '15px', md: '15px 30px', lg: '15px 30px' },
          display: 'flex',
          gap: 2,
          alignItems: 'center',
          justifyContent: 'space-between',
          margin: '0 auto',
          width: '100%'
        }}
      >
        <Box
          component={'div'}
          sx={{
            display: 'flex',
            gap: 2,
            alignItems: 'center',
            justifyContent: 'space-between',
            margin: '0 auto',
            width: '100%'
          }}
        >
          <Box component={'div'}>
            <Link
              href="/"
              passHref
              style={{ display: 'flex', gap: 10, alignItems: 'center', textDecoration: 'none' }}
            >
              <Image
                src="/images/logo.jpg"
                alt="logo"
                width="70"
                height="50"
                style={{ borderRadius: '20px' }}
              />
              <Typography variant="h6" style={{ flexGrow: 1, fontWeight: 'bold', color: 'white' }}>
                КиноТрекер
              </Typography>
            </Link>
          </Box>

          <Box component={'div'} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <ChangeThemeButton />
          </Box>

          <Box
            component={'div'}
            sx={{ display: { xs: 'none', sm: 'flex' }, gap: 3, alignItems: 'center' }}
          >
            <Stack
              sx={{
                flexDirection: 'row',
                display: { xs: 'none', sm: 'flex' }
              }}
            >
              {isAuthenticated ? (
                <Button onClick={handleLogout} sx={{ color: 'primary.contrastText' }}>
                  Выйти
                </Button>
              ) : (
                <>
                  <Button onClick={handleLogin} sx={{ color: 'primary.contrastText' }}>
                    Войти
                  </Button>
                  <Button sx={{ color: 'primary.contrastText' }}>Регистрация</Button>
                </>
              )}
            </Stack>
          </Box>
          <Stack
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              gap: 2
            }}
          >
            <SearchMovieButton />
            <Link href="/settings" passHref>
              <SettingsButton />
            </Link>
          </Stack>
        </Box>
      </AppBar>
    </Stack>
  )
}

export default Header
