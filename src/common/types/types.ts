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

export interface Movie {
  id: number
  title: string
  rating: number
  image: string
  year: number
  genre: string | undefined
  duration: number
}

export interface MoviesResponse {
  docs: Movie[]
  page: number
  limit: number
}

export interface Genre {
  id: number
  name: string
}
