export interface Movie {
  id: number
  title: string
  rating: number
  image: string
  year: number
  // genre: string
  // duration: number
}

export interface MoviesResponse {
  docs: Movie[]
  page: number
  limit: number
}
// export interface Movie {
//   id: number
//   title: string
//   rating: number
//   image: string
//   year: string
// }
