export interface Movie {
  title: string
  rating: number
  watchers?: number
  forYou?: string
  image: string
}

export interface MoviesResponse {
  trending: Movie[]
  forYou: Movie[]
  mostFavorited: Movie[]
}
