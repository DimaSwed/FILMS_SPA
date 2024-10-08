// 'use client'

// import React, { FC, useState } from 'react'
// import { Box, IconButton, TextField, InputAdornment, Fade } from '@mui/material'
// import SearchIcon from '@mui/icons-material/Search'
// import CloseIcon from '@mui/icons-material/Close'
// import { useRouter } from 'next/navigation'
// import { useLazySearchMoviesQuery } from '@/common/services/moviesApiTMDB'

// const SearchMovieButton: FC = () => {
//   const [searchOpen, setSearchOpen] = useState(false)
//   const [searchQuery, setSearchQuery] = useState('')
//   const [searchResults, setSearchResults] = useState<any[]>([])
//   const [triggerSearchMovies] = useLazySearchMoviesQuery()
//   const router = useRouter()

//   const handleSearchClick = () => {
//     setSearchOpen(true)
//   }

//   const handleCloseSearch = () => {
//     setSearchOpen(false)
//     setSearchQuery('')
//     setSearchResults([])
//   }

//   const handleSearchChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(event.target.value)
//     if (event.target.value.length >= 3) {
//       const result = await triggerSearchMovies(event.target.value)
//       setSearchResults(result.data?.docs || [])
//     } else {
//       setSearchResults([])
//     }
//   }

//   const handleMovieSelect = (id: number) => {
//     router.push(`/movie/${id}`)
//     handleCloseSearch()
//   }

//   return (
//     <Box sx={{ position: 'relative' }}>
//       {!searchOpen ? (
//         <IconButton sx={{ color: 'primary.contrastText' }} onClick={handleSearchClick}>
//           <SearchIcon />
//         </IconButton>
//       ) : (
//         <Fade in={searchOpen}>
//           <Box
//             component="div"
//             sx={{
//               display: 'flex',
//               flexDirection: 'column',
//               alignItems: 'center',
//               backgroundColor: 'background.paper',
//               borderRadius: 1,
//               width: '320px',
//               zIndex: 1000,
//               boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
//               position: 'absolute',
//               right: 0,
//               top: -25
//             }}
//           >
//             <TextField
//               variant="outlined"
//               placeholder="Введите название фильма"
//               value={searchQuery}
//               onChange={handleSearchChange}
//               sx={{
//                 width: '100%',
//                 '& .MuiInputBase-root': {
//                   color: 'text.primary'
//                 },
//                 '& .MuiOutlinedInput-root': {
//                   '& fieldset': {
//                     borderColor: 'text.primary'
//                   },
//                   '&:hover fieldset': {
//                     borderColor: 'text.primary'
//                   },
//                   '&.Mui-focused fieldset': {
//                     borderColor: 'text.primary'
//                   }
//                 }
//               }}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <SearchIcon sx={{ color: 'text.primary' }} />
//                   </InputAdornment>
//                 ),
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <IconButton onClick={handleCloseSearch}>
//                       <CloseIcon sx={{ color: 'text.primary' }} />
//                     </IconButton>
//                   </InputAdornment>
//                 )
//               }}
//             />
//             <Box sx={{ width: '100%', maxHeight: '400px', overflowY: 'auto' }}>
//               {searchResults.map((movie) => (
//                 <Box
//                   key={movie.id}
//                   sx={{
//                     padding: 1,
//                     cursor: 'pointer',
//                     '&:hover': { backgroundColor: 'grey.200', color: 'black' }
//                   }}
//                   onClick={() => handleMovieSelect(movie.id)}
//                 >
//                   &quot;{movie.title}&quot; {movie.year}
//                 </Box>
//               ))}
//             </Box>
//           </Box>
//         </Fade>
//       )}
//     </Box>
//   )
// }

// export default SearchMovieButton
'use client'

import React, { FC, useState, useEffect } from 'react'
import { Box, IconButton, TextField, InputAdornment, Fade } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import { useRouter } from 'next/navigation'
import { useLazySearchMoviesQuery } from '@/common/services/moviesApiTMDB'

const SearchMovieButton: FC = () => {
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [history, setHistory] = useState<string[]>([]) // Для хранения истории поиска
  const [triggerSearchMovies] = useLazySearchMoviesQuery()
  const router = useRouter()

  // Чтение истории поиска из localStorage при монтировании компонента
  useEffect(() => {
    const storedHistory = localStorage.getItem('film-search-history')
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory))
    }
  }, [])

  // Обновление истории в localStorage при изменении истории
  useEffect(() => {
    localStorage.setItem('film-search-history', JSON.stringify(history))
  }, [history])

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
    addToHistory(searchQuery) // Добавляем запрос в историю при выборе фильма
    router.push(`/movie/${id}`)
    handleCloseSearch()
  }

  // Добавление поискового запроса в историю
  const addToHistory = (query: string) => {
    if (!history.includes(query)) {
      const updatedHistory = [...history, query].slice(-10) // Хранить только последние 10 запросов
      setHistory(updatedHistory)
    }
  }

  // Обработка события нажатия клавиши Enter
  const handleSearchSubmit = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      addToHistory(searchQuery) // Добавляем запрос в историю
      setSearchQuery('') // Сбрасываем строку поиска
    }
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
              onKeyDown={handleSearchSubmit}
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
                  onClick={() => handleMovieSelect(movie.id)} // Выбор фильма мышью
                >
                  &quot;{movie.title}&quot; {movie.year}
                </Box>
              ))}
            </Box>
            <Box sx={{ width: '100%', maxHeight: '200px', overflowY: 'auto', mt: 2 }}>
              {history.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    padding: 1,
                    cursor: 'pointer',
                    '&:hover': { backgroundColor: 'grey.200', color: 'black' }
                  }}
                  onClick={() => setSearchQuery(item)} // Заполнение строки поиска при клике на элемент истории
                >
                  {item}
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
