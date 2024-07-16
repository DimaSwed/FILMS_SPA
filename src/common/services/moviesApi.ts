import { createApi, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import { Movie, MoviesResponse } from '@/common/types/types'

// Создаем API с использованием RTK Query
const API = process.env.NEXT_PUBLIC_KINOPOISK_API_KEY

export const moviesApi = createApi({
  // reducerPath: Имя reducer'а в хранилище.
  reducerPath: 'moviesApi',
  // baseQuery: Базовая конфигурация для выполнения запросов. Устанавливается базовый URL и заголовки, включая ключ API.
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.kinopoisk.dev/v1.4/movie',
    prepareHeaders: (headers) => {
      if (API) {
        headers.set('X-API-KEY', API)
      }
      return headers
    }
  }),
  // Глобальные настройки кэширования и обновления данных
  refetchOnMountOrArgChange: false,
  // Создаются различные эндпоинты (функции для выполнения запросов к API):
  endpoints: (builder) => ({
    // Эндпоинт для получения отсортированных фильмов с заданными параметрами. Используется transformResponse для преобразования ответа API в нужный формат.
    fetchSortedMovies: builder.query<Movie[], { [key: string]: any }>({
      query: (params) => ({
        url: '',
        params
      }),
      transformResponse: (response: any) =>
        response.docs.map((movie: any) => ({
          title: movie.name,
          rating: movie.rating.kp,
          image: movie?.poster?.url
        })),
      keepUnusedDataFor: 86400 // Данные будут храниться в кэше 1 день (86400 секунд)
    }),
    // Эндпоинт для получения нескольких категорий фильмов: trending, forYou и mostFavorited. Использует асинхронную функцию queryFn, чтобы сделать несколько запросов и объединить результаты в один объект.
    fetchMovies: builder.query<MoviesResponse, void>({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        try {
          const trendingResult = await fetchWithBQ({
            url: '',
            params: { rating: '7-10', limit: 10 }
          })
          const forYouResult = await fetchWithBQ({
            url: '',
            params: { year: '2024', limit: 10 }
          })
          const mostFavoritedResult = await fetchWithBQ({
            url: '',
            params: { limit: 15 }
          })

          if (trendingResult.error) throw trendingResult.error
          if (forYouResult.error) throw forYouResult.error
          if (mostFavoritedResult.error) throw mostFavoritedResult.error

          const trending = (trendingResult.data as any).docs.map((movie: any) => ({
            title: movie.name,
            rating: movie.rating.kp,
            image: movie?.poster?.url
          }))
          const forYou = (forYouResult.data as any).docs.map((movie: any) => ({
            title: movie.name,
            rating: movie.rating.kp,
            image: movie?.poster?.url
          }))
          const mostFavorited = (mostFavoritedResult.data as any).docs.map((movie: any) => ({
            title: movie.name,
            rating: movie.rating.kp,
            image: movie?.poster?.url
          }))

          return { data: { trending, forYou, mostFavorited } }
        } catch (error) {
          return { error: error as FetchBaseQueryError }
        }
      },
      keepUnusedDataFor: 86400
    }),
    // Эндпоинт для получения топ-10 фильмов в России. Преобразует ответ в нужный формат с помощью transformResponse.
    fetchTopInRussia: builder.query<Movie[], void>({
      query: () => ({
        url: '',
        params: { country: 'Россия', limit: 10 }
      }),
      transformResponse: (response: any) =>
        response.docs.map((movie: any) => ({
          title: movie.name,
          rating: movie.rating.kp,
          image: movie?.poster?.url
        })),
      keepUnusedDataFor: 86400
    }),
    // Эндпоинт для получения популярных фильмов. Преобразует ответ в нужный формат.
    fetchPopularMovies: builder.query<Movie[], void>({
      query: () => ({
        url: '',
        params: { limit: 10 }
      }),
      transformResponse: (response: any) =>
        response.docs.map((movie: any) => ({
          title: movie.name,
          rating: movie.rating.kp,
          image: movie?.poster?.url
        })),
      keepUnusedDataFor: 86400
    }),
    // Эндпоинт для получения ожидаемых фильмов 2024 года. Преобразует ответ в нужный формат.
    fetchExpectedMovies: builder.query<Movie[], void>({
      query: () => ({
        url: '',
        params: { year: '2024', limit: 10 }
      }),
      transformResponse: (response: any) =>
        response.docs.map((movie: any) => ({
          title: movie.name,
          rating: movie.rating.kp,
          image: movie?.poster?.url
        })),
      keepUnusedDataFor: 86400
    }),
    // Эндпоинт для получения лучших фильмов с рейтингом от 8 до 10. Преобразует ответ в нужный формат.
    fetchBestMovies: builder.query<Movie[], void>({
      query: () => ({
        url: '',
        params: { rating: '8-10', limit: 10 }
      }),
      transformResponse: (response: any) =>
        response.docs.map((movie: any) => ({
          title: movie.name,
          rating: movie.rating.kp,
          image: movie?.poster?.url
        })),
      keepUnusedDataFor: 86400
    })
  })
})

// Экспортируем автоматически сгенерированные хуки для каждого эндпоинта
export const {
  useFetchSortedMoviesQuery,
  useFetchMoviesQuery,
  useFetchTopInRussiaQuery,
  useFetchPopularMoviesQuery,
  useFetchExpectedMoviesQuery,
  useFetchBestMoviesQuery
} = moviesApi
