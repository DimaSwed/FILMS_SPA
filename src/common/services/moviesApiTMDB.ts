import { createApi, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import { Movie, MoviesResponse, Genre } from '../types/types'
import { GENRES_MAP } from '../constants/constants'
import Cookies from 'js-cookie'

// Получаем ACCOUNT_ID ключ из переменных окружения
// const API = process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN_AUTH as string
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY as string

// Создаем карту жанров
const genreMap = GENRES_MAP

// Создаем API с использованием RTK Query
export const moviesApi = createApi({
  reducerPath: 'moviesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.themoviedb.org/3',
    prepareHeaders: (headers) => {
      if (API_KEY) {
        headers.set('Authorization', `Bearer ${API_KEY}`)
      }
      headers.set('Content-Type', 'application/json')
      return headers
    }
  }),
  endpoints: (builder) => ({
    fetchMoviesByFilters: builder.query<Movie[], { [key: string]: any }>({
      query: (params) => ({
        url: '/discover/movie',
        params: {
          ...params,
          language: 'ru-RU',
          region: 'RU',
          query: params.searchQuery,
          api_key: API_KEY
        }
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

    fetchMovieTrailers: builder.query<any, number>({
      query: (id) => ({
        url: `/movie/${id}/videos`,
        params: { language: 'ru-RU', api_key: API_KEY }
      }),
      transformResponse: (response: { results: any[] }) => {
        return response.results.filter((video) => video.type === 'Trailer')
      },
      keepUnusedDataFor: 86400
    }),

    addMovieToWatchlist: builder.mutation<void, { movieId: number }>({
      query: ({ movieId }) => ({
        url: `/account/${API_KEY}/watchlist`,
        method: 'POST',
        body: {
          media_type: 'movie',
          media_id: movieId,
          watchlist: true
        },
        params: {
          api_key: API_KEY,
          session_id: Cookies.get('session_id')
        },
        headers: {
          'Content-Type': 'application/json'
        }
      }),
      async onQueryStarted({ movieId }, { dispatch, queryFulfilled }) {
        // Оптимистичное обновление кэша
        const patchResult = dispatch(
          moviesApi.util.updateQueryData('getWatchlistMovies', undefined, (draft) => {
            draft.push({
              id: movieId,
              title: '',
              rating: 0,
              image: '',
              year: 0,
              genre: '',
              duration: 0
            })
          })
        )

        try {
          await queryFulfilled
        } catch {
          // При ошибке отменяем обновление
          patchResult.undo()
        }
      }
    }),

    // Эндпоинт для получения фильмов из списка
    getWatchlistMovies: builder.query<Movie[], void>({
      query: () => ({
        url: `/account/21383295/watchlist/movies`,
        params: {
          language: 'ru-RU',
          // page: '999',
          sort_by: 'created_at.asc',
          api_key: API_KEY,
          session_id: Cookies.get('session_id')
        }
      }),
      transformResponse: (response: { results: any[] }) => {
        return response.results.map((movie: any) => {
          // console.log('Original movie data:', movie)

          const genres = movie.genre_ids.map((id: number) => genreMap[id] || 'Неизвестно')
          // console.log('Mapped genres:', genres)

          return {
            id: movie.id,
            title: movie.title,
            rating: movie.vote_average,
            image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            year: new Date(movie.release_date).getFullYear(),
            releaseDate: movie.release_date,
            genre: genres.join(', '),
            duration: movie.runtime ?? 0,
            description: movie.overview
          }
        })
      }
    }),

    removeMovieFromWatchlist: builder.mutation<void, { movieId: number }>({
      query: ({ movieId }) => ({
        url: `/account/21383295/watchlist`,
        method: 'POST',
        body: {
          media_type: 'movie',
          media_id: movieId,
          watchlist: false
        },
        params: { api_key: API_KEY, session_id: Cookies.get('session_id') },
        headers: {
          'Content-Type': 'application/json'
        }
      }),
      async onQueryStarted({ movieId }, { dispatch, queryFulfilled }) {
        // Оптимистичное обновление кэша
        const patchResult = dispatch(
          moviesApi.util.updateQueryData('getWatchlistMovies', undefined, (draft) => {
            return draft.filter((movie) => movie.id !== movieId)
          })
        )

        try {
          await queryFulfilled
        } catch {
          // При ошибке отменяем обновление
          patchResult.undo()
        }
      }
    }),

    fetchUpcomingMovies: builder.query<Movie[], void>({
      query: () => ({
        url: '/movie/upcoming',
        params: { language: 'ru-RU', page: '1', region: 'RU', api_key: API_KEY }
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
        params: { language: 'ru-RU', page: '1', region: 'RU', api_key: API_KEY }
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
        params: { language: 'ru-RU', api_key: API_KEY }
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

    // fetchMovieById: builder.query<Movie, number>({
    //   query: (id) => ({
    //     url: `/find/${id}`,
    //     // params: { language: 'ru-RU', region: 'RU' }
    //     params: {
    //       external_source: 'imdb_id', // Укажите источник внешнего идентификатора (например, IMDb ID),
    //       api_key: ACCOUNT_ID
    //     }
    //   }),

    //   transformResponse: (response: any) => {
    //     console.log('ACCOUNT_ID response:', response) // Добавьте это для проверки структуры ответа
    //     const movie = response.movie_results ? response.movie_results[0] : null

    //     // Возвращаем дефолтные значения, если фильм не найден
    //     if (!movie) {
    //       return {
    //         id: -1, // Дефолтное значение для идентификатора
    //         title: 'Не найдено',
    //         rating: 0,
    //         image: '', // Пустое значение изображения
    //         genre: 'Неизвестно',
    //         year: 0,
    //         duration: 0,
    //         description: 'Фильм не найден'
    //       }
    //     }

    //     return {
    //       id: movie.id,
    //       title: movie.title,
    //       rating: movie.vote_average,
    //       image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
    //       genre: movie.genre_ids.map((id: number) => genreMap[id] || 'Неизвестно').join(', '),
    //       year: new Date(movie.release_date).getFullYear(),
    //       duration: movie.runtime ?? 0,
    //       description: movie.overview
    //     }
    //   },
    //   keepUnusedDataFor: 86400
    // }),

    fetchMovieById: builder.query<Movie, number>({
      query: (id) => ({
        url: `/movie/${id}`, // Используем правильный эндпоинт
        params: {
          language: 'ru-RU',
          api_key: API_KEY // Добавляем ACCOUNT_ID ключ
        }
      }),
      transformResponse: (response: any) => {
        console.log('ACCOUNT_ID response fetchMovieById:', response) // Для проверки структуры ответа
        return {
          id: response.id,
          title: response.title,
          rating: response.vote_average,
          image: `https://image.tmdb.org/t/p/w500${response.poster_path}`,
          backgroundImage: `https://image.tmdb.org/t/p/original${response.backdrop_path}`,
          releaseDate: response.release_date,
          genre: response.genres.map((genre: any) => genre.name).join(', '),
          year: new Date(response.release_date).getFullYear(),
          duration: response.runtime ?? 0,
          description: response.overview
        }
      },
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
              region: 'RU',
              api_key: API_KEY
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
        params: { language: 'ru-RU', page: '1', region: 'RU', api_key: API_KEY }
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
              api_key: API_KEY,
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

    // searchMovies: builder.query<MoviesResponse, string>({
    //   query: (query) => ({
    //     url: '/search/movie',
    //     params: {
    //       query,
    //       page: 1,
    //       language: 'ru-RU',
    //       region: 'RU'
    //     }
    //   }),
    //   transformResponse: (response: { results: any[]; page: number; total_pages: number }) => ({
    //     docs: response.results.map((movie: any) => ({
    //       id: movie.id,
    //       title: movie.title,
    //       rating: movie.vote_average,
    //       image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
    //       year: new Date(movie.release_date).getFullYear(),
    //       genre: movie.genre_ids.map((id: number) => genreMap[id]).join(', '),
    //       duration: movie.runtime ?? 0
    //     })),
    //     page: response.page,
    //     limit: response.total_pages
    //   }),
    //   keepUnusedDataFor: 86400
    // }),

    searchMovies: builder.query<MoviesResponse, string>({
      query: (query) => ({
        url: '/search/movie',
        params: {
          query,
          page: 1,
          language: 'ru-RU',
          region: 'RU',
          api_key: API_KEY
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
        params: { language: 'ru-RU', region: 'RU', api_key: API_KEY }
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
        params: { language: 'ru-RU', page: '1', region: 'RU', api_key: API_KEY }
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
        params: { language: 'ru-RU', region: 'RU', api_key: API_KEY }
      }),
      transformResponse: (response: { countries: any[] }) =>
        response.countries.map((country: any) => country.english_name),
      keepUnusedDataFor: 86400
    }),

    createRequestToken: builder.mutation({
      query: () => ({
        url: '/authentication/token/new',
        method: 'GET',
        params: { api_key: API_KEY }
      })
    }),
    createSessionId: builder.mutation({
      query: (requestToken) => ({
        url: '/authentication/session/new',
        method: 'POST',
        body: { request_token: requestToken.requestToken },
        params: { api_key: API_KEY }
      })
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
  useFetchTrendingMoviesQuery,
  useFetchMovieTrailersQuery,
  useAddMovieToWatchlistMutation,
  useGetWatchlistMoviesQuery,
  useRemoveMovieFromWatchlistMutation,
  useLazySearchMoviesQuery,
  useCreateRequestTokenMutation,
  useCreateSessionIdMutation
} = moviesApi
