import { createApi, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import { Movie, MoviesResponse, Genre } from '../types/types'

// Получаем API ключ из переменных окружения
const API = process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN_AUTH as string

// Создаем карту жанров
const genreMap: { [key: number]: string } = {
  28: 'Боевик',
  12: 'Приключения',
  16: 'Анимация',
  35: 'Комедия',
  80: 'Криминал',
  18: 'Драма',
  10751: 'Семейный',
  14: 'Фэнтези',
  36: 'Исторический',
  27: 'Ужасы',
  10402: 'Музыка',
  9648: 'Детектив',
  10749: 'Романтика',
  878: 'Научная фантастика',
  10770: 'ТВ шоу',
  53: 'Триллер',
  10752: 'Военный',
  37: 'Вестерн'
}

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
          duration: movie.runtime ?? 0
        })),
      keepUnusedDataFor: 86400
    }),

    fetchUpcomingMovies: builder.query<Movie[], void>({
      query: () => ({
        url: '/movie/upcoming',
        params: { language: 'ru-RU', page: '1', region: 'RU' }
      }),
      transformResponse: (response: { results: any[] }) =>
        response.results.map((movie: any) => ({
          id: movie.id,
          title: movie.title,
          rating: movie.vote_average,
          image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          year: new Date(movie.release_date).getFullYear(),
          genre: movie.genre_ids.map((id: number) => genreMap[id]).join(', '),
          duration: movie.runtime ?? 0
        })),
      keepUnusedDataFor: 86400
    }),

    fetchTopRatedMovies: builder.query<Movie[], void>({
      query: () => ({
        url: '/movie/top_rated',
        params: { language: 'ru-RU', page: '1', region: 'RU' }
      }),
      transformResponse: (response: { results: any[] }) =>
        response.results.map((movie: any) => ({
          id: movie.id,
          title: movie.title,
          rating: movie.vote_average,
          image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          year: new Date(movie.release_date).getFullYear(),
          genre: movie.genre_ids.map((id: number) => genreMap[id]).join(', '),
          duration: movie.runtime ?? 0
        })),
      keepUnusedDataFor: 86400
    }),

    fetchTrendingMovies: builder.query<Movie[], void>({
      query: () => ({
        url: '/trending/movie/week',
        params: { language: 'ru-RU' }
      }),
      transformResponse: (response: { results: any[] }) =>
        response.results.map((movie: any) => ({
          id: movie.id,
          title: movie.title,
          rating: movie.vote_average,
          image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          year: new Date(movie.release_date).getFullYear(),
          genre: movie.genre_ids.map((id: number) => genreMap[id]).join(', '),
          duration: movie.runtime ?? 0
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
        genre: response.genre_ids.map((id: number) => genreMap[id]).join(', '),
        year: new Date(response.release_date).getFullYear(),
        duration: response.runtime
      }),
      keepUnusedDataFor: 86400
    }),

    fetchRandomMovie: builder.query<Movie, void>({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        try {
          // Выбираем случайную страницу от 1 до 500
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
              genre: randomMovie.genre_ids.map((id: number) => genreMap[id]).join(', '),
              year: new Date(randomMovie.release_date).getFullYear(),
              duration: randomMovie.runtime ?? 0
            }
          }
        } catch (error) {
          return { error: error as FetchBaseQueryError }
        }
      },
      keepUnusedDataFor: 86400
    }),

    fetchNowPlayingMovies: builder.query<Movie[], void>({
      query: () => ({
        url: '/movie/now_playing',
        params: { language: 'ru-RU', page: '1', region: 'RU' }
      }),
      transformResponse: (response: { results: any[] }) =>
        response.results.map((movie: any) => ({
          id: movie.id,
          title: movie.title,
          rating: movie.vote_average,
          image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          year: new Date(movie.release_date).getFullYear(),
          genre: movie.genre_ids.map((id: number) => genreMap[id]).join(', '),
          duration: movie.runtime ?? 0
        })),
      keepUnusedDataFor: 86400
    }),

    fetchRandomMovieWithFilters: builder.query<Movie, { [key: string]: any }>({
      async queryFn(params, _queryApi, _extraOptions, fetchWithBQ) {
        try {
          // Первый запрос для получения общего количества страниц
          const firstQuery = {
            url: '/discover/movie',
            params: {
              page: 1,
              language: 'ru-RU',
              region: 'RU',
              ...params
            } // Применяем переданные фильтры
          }
          const firstRes = await fetchWithBQ(firstQuery)

          if (firstRes.error) throw firstRes.error

          const totalPages = (firstRes.data as { total_pages: number }).total_pages
          const randomPage = Math.floor(Math.random() * totalPages) + 1

          // Второй запрос для получения случайного фильма
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
              genre: randomMovie.genre_ids.map((id: number) => genreMap[id]).join(', '),
              year: new Date(randomMovie.release_date).getFullYear(),
              duration: randomMovie.runtime ?? 0
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
          duration: movie.runtime ?? 0
        })),
        page: response.page,
        limit: response.total_pages
      }),
      keepUnusedDataFor: 86400
    }),

    fetchGenres: builder.query<Genre[], void>({
      query: () => ({
        url: '/genre/movie/list',
        params: { language: 'ru-RU', region: 'RU' }
      }),
      transformResponse: (response: { genres: any[] }) =>
        response.genres.map((genre: any) => ({
          id: genre.id,
          name: genre.name
        })),
      keepUnusedDataFor: 86400
    }),

    fetchPopularMovies: builder.query<Movie[], void>({
      query: () => ({
        url: '/movie/popular',
        params: { language: 'ru-RU', page: '1', region: 'RU' }
      }),
      transformResponse: (response: { results: any[] }) =>
        response.results.map((movie: any) => ({
          id: movie.id,
          title: movie.title,
          rating: movie.vote_average,
          image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          year: new Date(movie.release_date).getFullYear(),
          genre: movie.genre_ids.map((id: number) => genreMap[id]).join(', '),
          duration: movie.runtime ?? 0
        })),
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
  useFetchCountriesQuery,
  useFetchUpcomingMoviesQuery,
  useFetchTopRatedMoviesQuery,
  useFetchPopularMoviesQuery,
  useFetchNowPlayingMoviesQuery,
  useFetchTrendingMoviesQuery
} = moviesApi

// import { createApi, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
// import { Movie, MoviesResponse } from '@/common/types/types'

// // Создаем карту жанров
// const genreMap: { [key: number]: string } = {
//   28: 'Боевик',
//   12: 'Приключения',
//   16: 'Анимация',
//   35: 'Комедия',
//   80: 'Криминал',
//   18: 'Драма',
//   10751: 'Семейный',
//   14: 'Фэнтези',
//   36: 'Исторический',
//   27: 'Ужасы',
//   10402: 'Музыка',
//   9648: 'Детектив',
//   10749: 'Романтика',
//   878: 'Научная фантастика',
//   10770: 'ТВ шоу',
//   53: 'Триллер',
//   10752: 'Военный',
//   37: 'Вестерн'
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
//           year: new Date(movie.release_date).getFullYear(),
//           genre: movie.genre_ids.map((id: number) => genreMap[id]).join(', '),
//           duration: movie.runtime
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
//         year: new Date(response.release_date).getFullYear(),
//         genre: response.genres.map((genre: any) => genre.name).join(', '),
//         duration: response.runtime
//       }),
//       keepUnusedDataFor: 86400
//     }),
//     fetchRandomMovie: builder.query<Movie, void>({
//       async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
//         try {
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
//               year: new Date(randomMovie.release_date).getFullYear(),
//               genre: randomMovie.genre_ids.map((id: number) => genreMap[id]).join(', '),
//               duration: randomMovie.runtime
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
//           const firstQuery = {
//             url: '/discover/movie',
//             params: {
//               page: 1,
//               language: 'ru-RU',
//               region: 'RU',
//               ...params
//             }
//           }
//           const firstRes = await fetchWithBQ(firstQuery)

//           if (firstRes.error) throw firstRes.error

//           const totalPages = (firstRes.data as { total_pages: number }).total_pages
//           const randomPage = Math.floor(Math.random() * totalPages) + 1

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
//               year: new Date(randomMovie.release_date).getFullYear(),
//               genre: randomMovie.genre_ids.map((id: number) => genreMap[id]).join(', '),
//               duration: randomMovie.runtime
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
//           year: new Date(movie.release_date).getFullYear(),
//           genre: movie.genre_ids.map((id: number) => genreMap[id]).join(', '),
//           duration: movie.runtime
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
