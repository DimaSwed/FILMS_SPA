// import { createApi, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
// import { Movie, MoviesResponse } from '@/common/types/types'

// // Создаем API с использованием RTK Query
// const API = process.env.NEXT_PUBLIC_KINOPOISK_API_KEY

// export const moviesApi = createApi({
//   // reducerPath: Имя reducer'а в хранилище.
//   reducerPath: 'moviesApi',
//   // baseQuery: Базовая конфигурация для выполнения запросов. Устанавливается базовый URL и заголовки, включая ключ API.
//   baseQuery: fetchBaseQuery({
//     baseUrl: 'https://api.kinopoisk.dev/v1.4/movie',
//     prepareHeaders: (headers) => {
//       if (API) {
//         headers.set('X-API-KEY', API)
//       }
//       return headers
//     }
//   }),
//   // Глобальные настройки кэширования и обновления данных
//   refetchOnMountOrArgChange: false,
//   // Создаются различные эндпоинты (функции для выполнения запросов к API):
//   endpoints: (builder) => ({
//     // Эндпоинт для получения отсортированных фильмов с заданными параметрами. Используется transformResponse для преобразования ответа API в нужный формат.
//     fetchSortedMovies: builder.query<Movie[], { [key: string]: any }>({
//       query: (params) => ({
//         url: '',
//         params
//       }),
//       transformResponse: (response: any) =>
//         response.docs.map((movie: any) => ({
//           title: movie.name,
//           rating: movie.rating.kp,
//           image: movie?.poster?.url
//         })),
//       keepUnusedDataFor: 86400 // Данные будут храниться в кэше 1 день (86400 секунд)
//     }),
//     // Эндпоинт для получения нескольких категорий фильмов: trending, forYou и mostFavorited. Использует асинхронную функцию queryFn, чтобы сделать несколько запросов и объединить результаты в один объект.
//     fetchMovies: builder.query<MoviesResponse, void>({
//       async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
//         try {
//           const trendingResult = await fetchWithBQ({
//             url: '',
//             params: { rating: '7-10', limit: 10 }
//           })
//           const forYouResult = await fetchWithBQ({
//             url: '',
//             params: { year: '2024', limit: 10 }
//           })
//           const mostFavoritedResult = await fetchWithBQ({
//             url: '',
//             params: { limit: 15 }
//           })

//           if (trendingResult.error) throw trendingResult.error
//           if (forYouResult.error) throw forYouResult.error
//           if (mostFavoritedResult.error) throw mostFavoritedResult.error

//           const trending = (trendingResult.data as any).docs.map((movie: any) => ({
//             title: movie.name,
//             rating: movie.rating.kp,
//             image: movie?.poster?.url
//           }))
//           const forYou = (forYouResult.data as any).docs.map((movie: any) => ({
//             title: movie.name,
//             rating: movie.rating.kp,
//             image: movie?.poster?.url
//           }))
//           const mostFavorited = (mostFavoritedResult.data as any).docs.map((movie: any) => ({
//             title: movie.name,
//             rating: movie.rating.kp,
//             image: movie?.poster?.url
//           }))

//           return { data: { trending, forYou, mostFavorited } }
//         } catch (error) {
//           return { error: error as FetchBaseQueryError }
//         }
//       },
//       keepUnusedDataFor: 86400
//     }),
//     // Эндпоинт для получения топ-10 фильмов в России. Преобразует ответ в нужный формат с помощью transformResponse.
//     fetchTopInRussia: builder.query<Movie[], void>({
//       query: () => ({
//         url: '',
//         params: { country: 'Россия', limit: 10 }
//       }),
//       transformResponse: (response: any) =>
//         response.docs.map((movie: any) => ({
//           title: movie.name,
//           rating: movie.rating.kp,
//           image: movie?.poster?.url
//         })),
//       keepUnusedDataFor: 86400
//     }),
//     // Эндпоинт для получения популярных фильмов. Преобразует ответ в нужный формат.
//     fetchPopularMovies: builder.query<Movie[], void>({
//       query: () => ({
//         url: '',
//         params: { limit: 10 }
//       }),
//       transformResponse: (response: any) =>
//         response.docs.map((movie: any) => ({
//           title: movie.name,
//           rating: movie.rating.kp,
//           image: movie?.poster?.url
//         })),
//       keepUnusedDataFor: 86400
//     }),
//     // Эндпоинт для получения ожидаемых фильмов 2024 года. Преобразует ответ в нужный формат.
//     fetchExpectedMovies: builder.query<Movie[], void>({
//       query: () => ({
//         url: '',
//         params: { year: '2024', limit: 10 }
//       }),
//       transformResponse: (response: any) =>
//         response.docs.map((movie: any) => ({
//           title: movie.name,
//           rating: movie.rating.kp,
//           image: movie?.poster?.url
//         })),
//       keepUnusedDataFor: 86400
//     }),
//     // Эндпоинт для получения лучших фильмов с рейтингом от 8 до 10. Преобразует ответ в нужный формат.
//     fetchBestMovies: builder.query<Movie[], void>({
//       query: () => ({
//         url: '',
//         params: { rating: '8-10', limit: 10 }
//       }),
//       transformResponse: (response: any) =>
//         response.docs.map((movie: any) => ({
//           title: movie.name,
//           rating: movie.rating.kp,
//           image: movie?.poster?.url
//         })),
//       keepUnusedDataFor: 86400
//     })
//   })
// })

// // Экспортируем автоматически сгенерированные хуки для каждого эндпоинта
// export const {
//   useFetchSortedMoviesQuery,
//   useFetchMoviesQuery,
//   useFetchTopInRussiaQuery,
//   useFetchPopularMoviesQuery,
//   useFetchExpectedMoviesQuery,
//   useFetchBestMoviesQuery
// } = moviesApi

import { createApi, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react'

export interface Movie {
  id: number
  title: string
  rating: number
  image: string
  year: number
}
export interface MoviesResponse {
  docs: Movie[]
  page: number
  limit: number
}

// Получаем API ключ из переменных окружения
const API = process.env.NEXT_PUBLIC_KINOPOISK_API_KEY

// Создаем API с использованием RTK Query
export const moviesApi = createApi({
  reducerPath: 'moviesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.kinopoisk.dev/v1.4/movie',
    prepareHeaders: (headers) => {
      if (API) {
        headers.set('X-API-KEY', API)
      }
      return headers
    }
  }),
  refetchOnMountOrArgChange: false,
  endpoints: (builder) => ({
    fetchMoviesByFilters: builder.query<Movie[], { [key: string]: any }>({
      query: (params) => ({
        url: '',
        params
      }),
      transformResponse: (response: { docs: any[] }) =>
        response.docs.map((movie: any) => ({
          id: movie.id,
          title: movie.name,
          rating: movie.rating.kp,
          image: movie?.poster?.url,
          year: movie.year
        })),
      keepUnusedDataFor: 86400
    }),
    fetchMovieById: builder.query<Movie, number>({
      query: (id) => ({
        url: `${id}`
      }),
      transformResponse: (response: any) => ({
        id: response.id,
        title: response.name,
        rating: response.rating.kp,
        image: response.poster.url,
        year: response.year
      }),
      keepUnusedDataFor: 86400
    }),
    fetchRandomMovie: builder.query<Movie, void>({
      query: () => ({
        url: 'random'
      }),
      transformResponse: (response: any) => ({
        id: response.id,
        title: response.name,
        rating: response.rating.kp,
        image: response.poster.url,
        year: response.year
      }),
      keepUnusedDataFor: 86400
    }),
    fetchRandomMovieWithFilters: builder.query<Movie, { [key: string]: any }>({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        try {
          // Выполняем первый запрос для получения количества страниц
          const firstQuery = {
            url: '',
            params: {
              select: ['id', 'name', 'rating', 'poster', 'year'],
              'poster.url': '!null',
              'videos.trailers.url': '!null',
              page: 1,
              limit: 1
            }
          }
          const firstRes = await fetchWithBQ(firstQuery)

          if (firstRes.error) throw firstRes.error

          // Выбираем случайную страницу
          const { pages } = firstRes.data as { pages: number }
          const randomPage = Math.floor(Math.random() * pages) + 1

          // Выполняем запрос на случайной странице
          const query = {
            url: '',
            params: {
              select: ['id', 'name', 'rating', 'poster', 'year'],
              'poster.url': '!null',
              'videos.trailers.url': '!null',
              page: randomPage,
              limit: 1
            }
          }

          const { data, error } = await fetchWithBQ(query)

          if (error) throw error

          return { data: (data as { docs: any[] }).docs[0] }
        } catch (error) {
          return { error: error as FetchBaseQueryError }
        }
      },
      keepUnusedDataFor: 86400
    }),
    searchMovies: builder.query<MoviesResponse, string>({
      query: (query) => ({
        url: '',
        params: {
          query,
          page: 1,
          limit: 10
        }
      }),
      transformResponse: (response: { docs: any[]; page: number; limit: number }) => ({
        docs: response.docs.map((movie: any) => ({
          id: movie.id,
          title: movie.name,
          rating: movie.rating.kp,
          image: movie?.poster?.url,
          year: movie.year
        })),
        page: response.page,
        limit: response.limit
      }),
      keepUnusedDataFor: 86400
    }),
    fetchGenres: builder.query<string[], void>({
      query: () => ({
        url: 'possible-values',
        params: {
          field: 'genres.name'
        }
      }),
      transformResponse: (response: { docs: any[] }) =>
        response.docs.map((genre: any) => genre.name),
      keepUnusedDataFor: 86400
    }),
    fetchCountries: builder.query<string[], void>({
      query: () => ({
        url: 'possible-values',
        params: {
          field: 'countries.name'
        }
      }),
      transformResponse: (response: { docs: any[] }) =>
        response.docs.map((country: any) => country.name),
      keepUnusedDataFor: 86400
    })
  })
})

// Экспортируем автоматически сгенерированные хуки для каждого эндпоинта
export const {
  useFetchMoviesByFiltersQuery,
  useFetchMovieByIdQuery,
  useFetchRandomMovieQuery,
  useFetchRandomMovieWithFiltersQuery,
  useSearchMoviesQuery,
  useFetchGenresQuery,
  useFetchCountriesQuery
} = moviesApi
