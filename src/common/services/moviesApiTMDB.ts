// import { createApi, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react'

// // Интерфейсы для структуры данных API
// export interface Movie {
//   id: number
//   title: string
//   rating: number
//   image: string
//   year: number
// }

// export interface MoviesResponse {
//   docs: Movie[]
//   page: number
//   limit: number
// }

// // Получаем API ключ из переменных окружения
// const API = process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN_AUTH as string // Приведение типа для уверенности

// // Создаем API с использованием RTK Query
// export const moviesApi = createApi({
//   reducerPath: 'moviesApi',
//   baseQuery: fetchBaseQuery({
//     baseUrl: 'https://api.themoviedb.org/3',
//     prepareHeaders: (headers) => {
//       if (API) {
//         headers.set('Authorization', `Bearer ${API}`)
//       }
//       headers.set('Content-Type', 'application/json')
//       return headers
//     }
//   }),
//   // refetchOnMountOrArgChange: false,
//   endpoints: (builder) => ({
//     fetchMoviesByFilters: builder.query<Movie[], { [key: string]: any }>({
//       query: (params) => ({
//         url: '/discover/movie',
//         params: { ...params, language: 'ru-RU', region: 'RU' }
//       }),
//       transformResponse: (response: { results: any[] }) =>
//         response.results.map((movie: any) => ({
//           id: movie.id,
//           title: movie.title,
//           rating: movie.vote_average,
//           image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
//           year: new Date(movie.release_date).getFullYear()
//         })),
//       keepUnusedDataFor: 86400
//     }),
//     fetchMovieById: builder.query<Movie, number>({
//       query: (id) => ({
//         url: `/movie/${id}`,
//         params: { language: 'ru-RU', region: 'RU' }
//       }),
//       transformResponse: (response: any) => ({
//         id: response.id,
//         title: response.title,
//         rating: response.vote_average,
//         image: `https://image.tmdb.org/t/p/w500${response.poster_path}`,
//         year: new Date(response.release_date).getFullYear()
//       }),
//       keepUnusedDataFor: 86400
//     }),
//     fetchRandomMovie: builder.query<Movie, void>({
//       async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
//         try {
//           // Выбираем случайную страницу от 1 до 500
//           const randomPage = Math.floor(Math.random() * 500) + 1
//           const query = {
//             url: '/discover/movie',
//             params: {
//               page: randomPage,
//               language: 'ru-RU',
//               region: 'RU'
//             }
//           }

//           const { data, error } = await fetchWithBQ(query)

//           if (error) throw error

//           const randomMovie = (data as { results: any[] }).results[0]

//           return {
//             data: {
//               id: randomMovie.id,
//               title: randomMovie.title,
//               rating: randomMovie.vote_average,
//               image: `https://image.tmdb.org/t/p/w500${randomMovie.poster_path}`,
//               year: new Date(randomMovie.release_date).getFullYear()
//             }
//           }
//         } catch (error) {
//           return { error: error as FetchBaseQueryError }
//         }
//       },
//       keepUnusedDataFor: 86400
//     }),
//     fetchRandomMovieWithFilters: builder.query<Movie, { [key: string]: any }>({
//       async queryFn(params, _queryApi, _extraOptions, fetchWithBQ) {
//         try {
//           // Первый запрос для получения общего количества страниц
//           const firstQuery = {
//             url: '/discover/movie',
//             params: {
//               page: 1,
//               language: 'ru-RU',
//               region: 'RU',
//               ...params
//             } // Применяем переданные фильтры
//           }
//           const firstRes = await fetchWithBQ(firstQuery)

//           if (firstRes.error) throw firstRes.error

//           const totalPages = (firstRes.data as { total_pages: number }).total_pages
//           const randomPage = Math.floor(Math.random() * totalPages) + 1

//           // Второй запрос для получения случайного фильма
//           const query = {
//             url: '/discover/movie',
//             params: {
//               page: randomPage,
//               language: 'ru-RU',
//               region: 'RU',
//               ...params
//             }
//           }

//           const { data, error } = await fetchWithBQ(query)

//           if (error) throw error

//           const randomMovie = (data as { results: any[] }).results[0]

//           return {
//             data: {
//               id: randomMovie.id,
//               title: randomMovie.title,
//               rating: randomMovie.vote_average,
//               image: `https://image.tmdb.org/t/p/w500${randomMovie.poster_path}`,
//               year: new Date(randomMovie.release_date).getFullYear()
//             }
//           }
//         } catch (error) {
//           return { error: error as FetchBaseQueryError }
//         }
//       },
//       keepUnusedDataFor: 86400
//     }),
//     searchMovies: builder.query<MoviesResponse, string>({
//       query: (query) => ({
//         url: '/search/movie',
//         params: {
//           query,
//           page: 1,
//           language: 'ru-RU',
//           region: 'RU'
//         }
//       }),
//       transformResponse: (response: { results: any[]; page: number; total_pages: number }) => ({
//         docs: response.results.map((movie: any) => ({
//           id: movie.id,
//           title: movie.title,
//           rating: movie.vote_average,
//           image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
//           year: new Date(movie.release_date).getFullYear()
//         })),
//         page: response.page,
//         limit: response.total_pages
//       }),
//       keepUnusedDataFor: 86400
//     }),
//     fetchGenres: builder.query<string[], void>({
//       query: () => ({
//         url: '/genre/movie/list',
//         params: { language: 'ru-RU', region: 'RU' }
//       }),
//       transformResponse: (response: { genres: any[] }) =>
//         response.genres.map((genre: any) => genre.name),
//       keepUnusedDataFor: 86400
//     }),
//     fetchCountries: builder.query<string[], void>({
//       query: () => ({
//         url: '/configuration/countries',
//         params: { language: 'ru-RU', region: 'RU' }
//       }),
//       transformResponse: (response: { countries: any[] }) =>
//         response.countries.map((country: any) => country.english_name),
//       keepUnusedDataFor: 86400
//     })
//   })
// })

// // Экспортируем автоматически сгенерированные хуки для каждого эндпоинта
// export const {
//   useFetchMoviesByFiltersQuery,
//   useFetchMovieByIdQuery,
//   useFetchRandomMovieQuery,
//   useFetchRandomMovieWithFiltersQuery,
//   useSearchMoviesQuery,
//   useFetchGenresQuery,
//   useFetchCountriesQuery
// } = moviesApi
import { createApi, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react'

// Интерфейсы для структуры данных API
export interface Movie {
  id: number
  title: string
  rating: number
  image: string
  year: number
  genre: string
  duration: number
}

export interface MoviesResponse {
  docs: Movie[]
  page: number
  limit: number
}

// Создаем карту жанров
const genreMap: { [key: number]: string } = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation'
  // добавьте все необходимые жанры
}

// Получаем API ключ из переменных окружения
const API = process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN_AUTH as string // Приведение типа для уверенности

// Создаем API с использованием RTK Query
export const moviesApi = createApi({
  reducerPath: 'moviesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.themoviedb.org/3',
    prepareHeaders: (headers) => {
      if (API) {
        headers.set('Authorization', `Bearer ${API}`)
      }
      headers.set('Content-Type', 'application/json')
      return headers
    }
  }),
  endpoints: (builder) => ({
    fetchMoviesByFilters: builder.query<Movie[], { [key: string]: any }>({
      query: (params) => ({
        url: '/discover/movie',
        params: { ...params, language: 'ru-RU', region: 'RU' }
      }),
      transformResponse: (response: { results: any[] }) =>
        response.results.map((movie: any) => ({
          id: movie.id,
          title: movie.title,
          rating: movie.vote_average,
          image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          year: new Date(movie.release_date).getFullYear(),
          genre: movie.genre_ids.map((id: number) => genreMap[id]).join(', '),
          duration: movie.runtime
        })),
      keepUnusedDataFor: 86400
    }),
    fetchMovieById: builder.query<Movie, number>({
      query: (id) => ({
        url: `/movie/${id}`,
        params: { language: 'ru-RU', region: 'RU' }
      }),
      transformResponse: (response: any) => ({
        id: response.id,
        title: response.title,
        rating: response.vote_average,
        image: `https://image.tmdb.org/t/p/w500${response.poster_path}`,
        year: new Date(response.release_date).getFullYear(),
        genre: response.genres.map((genre: any) => genre.name).join(', '),
        duration: response.runtime
      }),
      keepUnusedDataFor: 86400
    }),
    fetchRandomMovie: builder.query<Movie, void>({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        try {
          const randomPage = Math.floor(Math.random() * 500) + 1
          const query = {
            url: '/discover/movie',
            params: {
              page: randomPage,
              language: 'ru-RU',
              region: 'RU'
            }
          }

          const { data, error } = await fetchWithBQ(query)

          if (error) throw error

          const randomMovie = (data as { results: any[] }).results[0]

          return {
            data: {
              id: randomMovie.id,
              title: randomMovie.title,
              rating: randomMovie.vote_average,
              image: `https://image.tmdb.org/t/p/w500${randomMovie.poster_path}`,
              year: new Date(randomMovie.release_date).getFullYear(),
              genre: randomMovie.genre_ids.map((id: number) => genreMap[id]).join(', '),
              duration: randomMovie.runtime
            }
          }
        } catch (error) {
          return { error: error as FetchBaseQueryError }
        }
      },
      keepUnusedDataFor: 86400
    }),
    fetchRandomMovieWithFilters: builder.query<Movie, { [key: string]: any }>({
      async queryFn(params, _queryApi, _extraOptions, fetchWithBQ) {
        try {
          const firstQuery = {
            url: '/discover/movie',
            params: {
              page: 1,
              language: 'ru-RU',
              region: 'RU',
              ...params
            }
          }
          const firstRes = await fetchWithBQ(firstQuery)

          if (firstRes.error) throw firstRes.error

          const totalPages = (firstRes.data as { total_pages: number }).total_pages
          const randomPage = Math.floor(Math.random() * totalPages) + 1

          const query = {
            url: '/discover/movie',
            params: {
              page: randomPage,
              language: 'ru-RU',
              region: 'RU',
              ...params
            }
          }

          const { data, error } = await fetchWithBQ(query)

          if (error) throw error

          const randomMovie = (data as { results: any[] }).results[0]

          return {
            data: {
              id: randomMovie.id,
              title: randomMovie.title,
              rating: randomMovie.vote_average,
              image: `https://image.tmdb.org/t/p/w500${randomMovie.poster_path}`,
              year: new Date(randomMovie.release_date).getFullYear(),
              genre: randomMovie.genre_ids.map((id: number) => genreMap[id]).join(', '),
              duration: randomMovie.runtime
            }
          }
        } catch (error) {
          return { error: error as FetchBaseQueryError }
        }
      },
      keepUnusedDataFor: 86400
    }),
    searchMovies: builder.query<MoviesResponse, string>({
      query: (query) => ({
        url: '/search/movie',
        params: {
          query,
          page: 1,
          language: 'ru-RU',
          region: 'RU'
        }
      }),
      transformResponse: (response: { results: any[]; page: number; total_pages: number }) => ({
        docs: response.results.map((movie: any) => ({
          id: movie.id,
          title: movie.title,
          rating: movie.vote_average,
          image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          year: new Date(movie.release_date).getFullYear(),
          genre: movie.genre_ids.map((id: number) => genreMap[id]).join(', '),
          duration: movie.runtime
        })),
        page: response.page,
        limit: response.total_pages
      }),
      keepUnusedDataFor: 86400
    }),
    fetchGenres: builder.query<string[], void>({
      query: () => ({
        url: '/genre/movie/list',
        params: { language: 'ru-RU', region: 'RU' }
      }),
      transformResponse: (response: { genres: any[] }) =>
        response.genres.map((genre: any) => genre.name),
      keepUnusedDataFor: 86400
    }),
    fetchCountries: builder.query<string[], void>({
      query: () => ({
        url: '/configuration/countries',
        params: { language: 'ru-RU', region: 'RU' }
      }),
      transformResponse: (response: { countries: any[] }) =>
        response.countries.map((country: any) => country.english_name),
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
