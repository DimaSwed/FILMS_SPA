'use client'
import React from 'react'
import { useFetchMoviesByFiltersQuery } from '@/common/services/moviesApiTMDB'
import { Box } from '@mui/material'
import FilmMovieCategory from './FilmMovieCategory'

interface GenreProps {
  id: number
  title: string
}

const Genre: React.FC<GenreProps> = ({ id, title }) => {
  const { data, isLoading } = useFetchMoviesByFiltersQuery({
    include_adult: 'true',
    include_video: 'true',
    language: 'ru-RU',
    sort_by: 'popularity.desc',
    primary_release_year: '2024',
    certification_country: '%D0%A0%D0%BE%D1%81%D1%81%D0%B8%D1%8F',
    region: 'RU',
    page: 1,
    with_genres: id
  })

  return (
    <Box key={title} sx={{ mb: 4 }}>
      <FilmMovieCategory title={title} data={data} isLoading={isLoading} />
    </Box>
  )
}

export default Genre
