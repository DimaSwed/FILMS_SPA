// import axios from 'axios'
// import { MoviesResponse, Movie } from '@/common/types/types'

// const API = process.env.NEXT_PUBLIC_KINOPOISK_API_KEY
// const BASE_URL = 'https://api.kinopoisk.dev/v1.4/movie'

// const fetchSortedMovies = async (params: object): Promise<Movie[]> => {
//   if (!API) {
//     throw new Error('API key is missing')
//   }

//   const response = await axios.get(BASE_URL, {
//     headers: {
//       'X-API-KEY': API
//     },
//     params
//   })

//   return response.data.docs.map((movie: any) => ({
//     title: movie.name,
//     rating: movie.rating.kp,
//     image: movie?.poster?.url
//   }))
// }

// export const fetchMovies = async (): Promise<MoviesResponse> => {
//   const trending = await fetchSortedMovies({ rating: '7-10', limit: 10 })
//   const forYou = await fetchSortedMovies({ year: '2023', limit: 10 })
//   const mostFavorited = await fetchSortedMovies({ limit: 15 })

//   return { trending, forYou, mostFavorited }
// }

// export const fetchTopInRussia = async (): Promise<Movie[]> => {
//   return fetchSortedMovies({ country: 'Россия', limit: 10 })
// }

// export const fetchPopularMovies = async (): Promise<Movie[]> => {
//   return fetchSortedMovies({ limit: 10 })
// }

// export const fetchExpectedMovies = async (): Promise<Movie[]> => {
//   return fetchSortedMovies({ year: '2024', limit: 10 })
// }

// export const fetchBestMovies = async (): Promise<Movie[]> => {
//   return fetchSortedMovies({ rating: '8-10', limit: 10 })
// }
