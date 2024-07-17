// 'use client'
// import { FC } from 'react'
// import { List, ListItem, ListItemIcon, ListItemText, Avatar, Divider, Box } from '@mui/material'
// import { Movie, Tv, Search, NewReleases, PlaylistPlay } from '@mui/icons-material'
// import ListIcon from '@mui/icons-material/List'
// import FeaturedVideoIcon from '@mui/icons-material/FeaturedVideo'
// import SubscriptionInfo from '../UI/SubscriptionInfo'
// import SidebarItem from './SidebarItem'
// import { useRouter } from 'next/navigation'
// import { useTheme } from '@mui/material/styles'

// const Sidebar: FC = () => {
//   const router = useRouter()
//   const theme = useTheme()

//   return (
//     <Box
//       component="div"
//       sx={{
//         backgroundColor: 'primary.main',
//         position: 'sticky',
//         maxWidth: '280px',
//         width: '100%',
//         color: 'text.primary',
//         minHeight: '100vh',
//         padding: '10px',
//         boxShadow: theme.shadows[7]
//       }}
//     >
//       <Box sx={{ display: { xs: 'none', md: 'block' } }}>
//         <SubscriptionInfo />
//       </Box>

//       <Divider sx={{ display: { xs: 'none', md: 'block' }, backgroundColor: '#444' }} />

//       <List component="nav">
//         <SidebarItem primary="Ваши данные">
//           <ListItem onClick={() => router.push('/profile')} button sx={{ pl: 4 }}>
//             <ListItemIcon>
//               <Avatar />
//             </ListItemIcon>
//             <ListItemText primary="Профиль" />
//           </ListItem>
//         </SidebarItem>

//         <SidebarItem primary="Просмотр">
//           <ListItem onClick={() => router.push('/films')} button sx={{ pl: 4 }}>
//             <ListItemIcon>
//               <Movie sx={{ color: 'text.primary' }} />
//             </ListItemIcon>
//             <ListItemText primary="Фильмы" />
//           </ListItem>
//           <ListItem button sx={{ pl: 4 }}>
//             <ListItemIcon>
//               <Tv sx={{ color: 'text.primary' }} />
//             </ListItemIcon>
//             <ListItemText primary="Сериалы" />
//           </ListItem>
//           <ListItem button sx={{ pl: 4 }}>
//             <ListItemIcon>
//               <Search sx={{ color: 'text.primary' }} />
//             </ListItemIcon>
//             <ListItemText primary="Поиск" />
//           </ListItem>
//         </SidebarItem>

//         <SidebarItem primary="Ознакомиться">
//           <ListItem button sx={{ pl: 4 }}>
//             <ListItemIcon>
//               <FeaturedVideoIcon sx={{ color: 'text.primary' }} />
//             </ListItemIcon>
//             <ListItemText primary="Последние Трейлеры" />
//           </ListItem>
//           <ListItem button sx={{ pl: 4 }}>
//             <ListItemIcon>
//               <NewReleases sx={{ color: 'text.primary' }} />
//             </ListItemIcon>
//             <ListItemText primary="Новости" />
//           </ListItem>
//         </SidebarItem>

//         <SidebarItem primary="Списки">
//           <ListItem button sx={{ pl: 4 }}>
//             <ListItemIcon>
//               <ListIcon sx={{ color: 'text.primary' }} />
//             </ListItemIcon>
//             <ListItemText primary="Список к просмотру" />
//           </ListItem>
//           <ListItem button sx={{ pl: 4 }}>
//             <ListItemIcon>
//               <PlaylistPlay sx={{ color: 'text.primary' }} />
//             </ListItemIcon>
//             <ListItemText primary="Список просмотренного" />
//           </ListItem>
//         </SidebarItem>
//       </List>
//     </Box>
//   )
// }

// export default Sidebar

'use client'
import { FC } from 'react'
import { List, ListItem, ListItemIcon, ListItemText, Avatar, Divider, Box } from '@mui/material'
import { Movie, Tv, Search, NewReleases, PlaylistPlay } from '@mui/icons-material'
import ListIcon from '@mui/icons-material/List'
import FeaturedVideoIcon from '@mui/icons-material/FeaturedVideo'
import SubscriptionInfo from '../UI/SubscriptionInfo'
import SidebarItem from './SidebarItem'
import { useRouter } from 'next/navigation'
import { useTheme } from '@mui/material/styles'

const Sidebar: FC = () => {
  const router = useRouter()
  const theme = useTheme()

  return (
    <Box
      component="div"
      sx={{
        backgroundColor: 'primary.main',
        position: 'sticky',
        maxWidth: { xs: '50px', md: '280px' },
        width: '100%',
        color: 'text.primary',
        minHeight: '100vh',
        padding: { xs: '5px', md: '10px' },
        boxShadow: theme.shadows[7],
        transition: 'max-width 0.3s ease-in-out'
      }}
    >
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        <SubscriptionInfo />
      </Box>

      <Divider sx={{ display: { xs: 'none', md: 'block' }, backgroundColor: '#444' }} />

      <List
        component="nav"
        sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
      >
        <SidebarItem primary="Ваши данные">
          <ListItem onClick={() => router.push('/profile')} button sx={{ pl: { xs: 1, md: 4 } }}>
            <ListItemIcon sx={{ minWidth: { xs: 'auto', md: '56px' } }}>
              <Avatar sx={{ width: 24, height: 24 }} />
            </ListItemIcon>
            <ListItemText
              primary="Профиль"
              sx={{
                display: { xs: 'none', md: 'block' }
              }}
            />
          </ListItem>
        </SidebarItem>

        <SidebarItem primary="Просмотр">
          <ListItem onClick={() => router.push('/films')} button sx={{ pl: { xs: 1, md: 4 } }}>
            <ListItemIcon sx={{ minWidth: { xs: 'auto', md: '56px' } }}>
              <Movie sx={{ color: 'text.primary' }} />
            </ListItemIcon>
            <ListItemText
              primary="Фильмы"
              sx={{
                display: { xs: 'none', md: 'block' }
              }}
            />
          </ListItem>
          <ListItem button sx={{ pl: { xs: 1, md: 4 } }}>
            <ListItemIcon sx={{ minWidth: { xs: 'auto', md: '56px' } }}>
              <Tv sx={{ color: 'text.primary' }} />
            </ListItemIcon>
            <ListItemText
              primary="Сериалы"
              sx={{
                display: { xs: 'none', md: 'block' }
              }}
            />
          </ListItem>
          <ListItem button sx={{ pl: { xs: 1, md: 4 } }}>
            <ListItemIcon sx={{ minWidth: { xs: 'auto', md: '56px' } }}>
              <Search sx={{ color: 'text.primary' }} />
            </ListItemIcon>
            <ListItemText
              primary="Поиск"
              sx={{
                display: { xs: 'none', md: 'block' }
              }}
            />
          </ListItem>
        </SidebarItem>

        <SidebarItem primary="Ознакомиться">
          <ListItem button sx={{ pl: { xs: 1, md: 4 } }}>
            <ListItemIcon sx={{ minWidth: { xs: 'auto', md: '56px' } }}>
              <FeaturedVideoIcon sx={{ color: 'text.primary' }} />
            </ListItemIcon>
            <ListItemText
              primary="Последние Трейлеры"
              sx={{
                display: { xs: 'none', md: 'block' }
              }}
            />
          </ListItem>
          <ListItem button sx={{ pl: { xs: 1, md: 4 } }}>
            <ListItemIcon sx={{ minWidth: { xs: 'auto', md: '56px' } }}>
              <NewReleases sx={{ color: 'text.primary' }} />
            </ListItemIcon>
            <ListItemText
              primary="Новости"
              sx={{
                display: { xs: 'none', md: 'block' }
              }}
            />
          </ListItem>
        </SidebarItem>

        <SidebarItem primary="Списки">
          <ListItem button sx={{ pl: { xs: 1, md: 4 } }}>
            <ListItemIcon sx={{ minWidth: { xs: 'auto', md: '56px' } }}>
              <ListIcon sx={{ color: 'text.primary' }} />
            </ListItemIcon>
            <ListItemText
              primary="Список к просмотру"
              sx={{
                display: { xs: 'none', md: 'block' }
              }}
            />
          </ListItem>
          <ListItem button sx={{ pl: { xs: 1, md: 4 } }}>
            <ListItemIcon sx={{ minWidth: { xs: 'auto', md: '56px' } }}>
              <PlaylistPlay sx={{ color: 'text.primary' }} />
            </ListItemIcon>
            <ListItemText
              primary="Список просмотренного"
              sx={{
                display: { xs: 'none', md: 'block' }
              }}
            />
          </ListItem>
        </SidebarItem>
      </List>
    </Box>
  )
}

export default Sidebar

// 'use client'
// import { FC } from 'react'
// import { List, ListItem, ListItemIcon, ListItemText, Avatar, Divider, Box } from '@mui/material'
// import { Movie, Tv, Search, NewReleases, PlaylistPlay } from '@mui/icons-material'
// import ListIcon from '@mui/icons-material/List'
// import FeaturedVideoIcon from '@mui/icons-material/FeaturedVideo'
// import SubscriptionInfo from '../UI/SubscriptionInfo'
// import { useRouter } from 'next/navigation'
// import { useTheme } from '@mui/material/styles'

// const Sidebar: FC = () => {
//   const router = useRouter()
//   const theme = useTheme()

//   return (
//     <Box
//       component="div"
//       sx={{
//         backgroundColor: 'primary.main',
//         position: 'sticky',
//         maxWidth: { xs: '80px', md: '280px' },
//         width: '100%',
//         color: 'text.primary',
//         minHeight: '100vh',
//         padding: '10px',
//         boxShadow: theme.shadows[7],
//         transition: 'max-width 0.3s ease-in-out'
//       }}
//     >
//       <Box sx={{ display: { xs: 'none', md: 'block' } }}>
//         <SubscriptionInfo />
//       </Box>

//       <Divider sx={{ display: { xs: 'none', md: 'block' }, backgroundColor: '#444' }} />

//       <List component="nav">
//         <ListItem onClick={() => router.push('/profile')} button sx={{ pl: { xs: 1, md: 4 } }}>
//           <ListItemIcon>
//             <Avatar />
//           </ListItemIcon>
//           <ListItemText
//             primary="Профиль"
//             sx={{
//               display: { xs: 'none', md: 'block' }
//             }}
//           />
//         </ListItem>

//         <ListItem onClick={() => router.push('/films')} button sx={{ pl: { xs: 1, md: 4 } }}>
//           <ListItemIcon>
//             <Movie sx={{ color: 'text.primary' }} />
//           </ListItemIcon>
//           <ListItemText
//             primary="Фильмы"
//             sx={{
//               display: { xs: 'none', md: 'block' }
//             }}
//           />
//         </ListItem>

//         <ListItem button sx={{ pl: { xs: 1, md: 4 } }}>
//           <ListItemIcon>
//             <Tv sx={{ color: 'text.primary' }} />
//           </ListItemIcon>
//           <ListItemText
//             primary="Сериалы"
//             sx={{
//               display: { xs: 'none', md: 'block' }
//             }}
//           />
//         </ListItem>

//         <ListItem button sx={{ pl: { xs: 1, md: 4 } }}>
//           <ListItemIcon>
//             <Search sx={{ color: 'text.primary' }} />
//           </ListItemIcon>
//           <ListItemText
//             primary="Поиск"
//             sx={{
//               display: { xs: 'none', md: 'block' }
//             }}
//           />
//         </ListItem>

//         <ListItem button sx={{ pl: { xs: 1, md: 4 } }}>
//           <ListItemIcon>
//             <FeaturedVideoIcon sx={{ color: 'text.primary' }} />
//           </ListItemIcon>
//           <ListItemText
//             primary="Последние Трейлеры"
//             sx={{
//               display: { xs: 'none', md: 'block' }
//             }}
//           />
//         </ListItem>

//         <ListItem button sx={{ pl: { xs: 1, md: 4 } }}>
//           <ListItemIcon>
//             <NewReleases sx={{ color: 'text.primary' }} />
//           </ListItemIcon>
//           <ListItemText
//             primary="Новости"
//             sx={{
//               display: { xs: 'none', md: 'block' }
//             }}
//           />
//         </ListItem>

//         <ListItem button sx={{ pl: { xs: 1, md: 4 } }}>
//           <ListItemIcon>
//             <ListIcon sx={{ color: 'text.primary' }} />
//           </ListItemIcon>
//           <ListItemText
//             primary="Список к просмотру"
//             sx={{
//               display: { xs: 'none', md: 'block' }
//             }}
//           />
//         </ListItem>

//         <ListItem button sx={{ pl: { xs: 1, md: 4 } }}>
//           <ListItemIcon>
//             <PlaylistPlay sx={{ color: 'text.primary' }} />
//           </ListItemIcon>
//           <ListItemText
//             primary="Список просмотренного"
//             sx={{
//               display: { xs: 'none', md: 'block' }
//             }}
//           />
//         </ListItem>
//       </List>
//     </Box>
//   )
// }

// export default Sidebar
