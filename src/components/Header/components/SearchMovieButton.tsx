'use client'

import React, { FC, useState } from 'react'
import { Box, IconButton, TextField, InputAdornment, Fade, useTheme } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'

const SearchMovieButton: FC = () => {
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearchClick = () => {
    setSearchOpen(true)
  }

  const handleCloseSearch = () => {
    setSearchOpen(false)
    setSearchQuery('') // Clear the search input when closed
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
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
              alignItems: 'center',
              backgroundColor: 'background.paper',
              borderRadius: 1,
              position: 'absolute',
              right: 0,
              top: 0,
              bottom: 0,
              width: '400px',
              zIndex: 1000,
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)'
            }}
          >
            <TextField
              variant="outlined"
              placeholder="Введите название фильма"
              value={searchQuery}
              onChange={handleSearchChange}
              sx={{
                flexGrow: 1,
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
          </Box>
        </Fade>
      )}
    </Box>
  )
}

export default SearchMovieButton
