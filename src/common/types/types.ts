export interface Movie {
  id: number
  title: string
  rating: number
  image: string
  year: number
  genre: string | string[]
  duration: number
  description?: string
}

export interface Category {
  title: string
  movies: Movie[]
  isLoading: boolean
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

// Тип для элементов списка годов
export type YearLists =
  | 'до 1980'
  | '1980-1989'
  | '1990-1999'
  | '2000-2009'
  | '2010-2019'
  | '2020'
  | '2021'
  | '2022'
  | '2023'
  | '2024'

// Тип для объектов списка жанров
export interface GenreLists {
  id: number
  name: string
}
