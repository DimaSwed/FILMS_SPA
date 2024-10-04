'use client'

import React, { FC, useState } from 'react'
import { Box, IconButton, TextField, InputAdornment, Fade } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import { useRouter } from 'next/navigation'
import { useLazySearchMoviesQuery } from '@/common/services/moviesApiTMDB'

const SearchMovieButton: FC = () => {
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [triggerSearchMovies] = useLazySearchMoviesQuery()
  const router = useRouter()

  const handleSearchClick = () => {
    setSearchOpen(true)
  }

  const handleCloseSearch = () => {
    setSearchOpen(false)
    setSearchQuery('')
    setSearchResults([])
  }

  const handleSearchChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
    if (event.target.value.length >= 3) {
      const result = await triggerSearchMovies(event.target.value)
      setSearchResults(result.data?.docs || [])
    } else {
      setSearchResults([])
    }
  }

  const handleMovieSelect = (id: number) => {
    router.push(`/movie/${id}`)
    handleCloseSearch()
  }

  return (
    <Box sx={{ position: 'relative' }}>
      {!searchOpen ? (
        <IconButton sx={{ color: 'primary.contrastText' }} onClick={handleSearchClick}>
          <SearchIcon />
        </IconButton>
      ) : (
        <Fade in={searchOpen}>
          <Box
            component="div"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: 'background.paper',
              borderRadius: 1,
              width: '320px',
              zIndex: 1000,
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
              position: 'absolute',
              right: 0,
              top: -25
            }}
          >
            <TextField
              variant="outlined"
              placeholder="Введите название фильма"
              value={searchQuery}
              onChange={handleSearchChange}
              sx={{
                width: '100%',
                '& .MuiInputBase-root': {
                  color: 'text.primary'
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'text.primary'
                  },
                  '&:hover fieldset': {
                    borderColor: 'text.primary'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'text.primary'
                  }
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'text.primary' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleCloseSearch}>
                      <CloseIcon sx={{ color: 'text.primary' }} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <Box sx={{ width: '100%', maxHeight: '400px', overflowY: 'auto' }}>
              {searchResults.map((movie) => (
                <Box
                  key={movie.id}
                  sx={{
                    padding: 1,
                    cursor: 'pointer',
                    '&:hover': { backgroundColor: 'grey.200', color: 'black' }
                  }}
                  onClick={() => handleMovieSelect(movie.id)}
                >
                  {movie.title}
                </Box>
              ))}
            </Box>
          </Box>
        </Fade>
      )}
    </Box>
  )
}

export default SearchMovieButton
