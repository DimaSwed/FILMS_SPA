import { FC } from 'react'
import { List, ListItem, ListItemIcon, ListItemText, Avatar, Divider, Box } from '@mui/material'
import { Movie, Tv, Search, NewReleases, Info, PlaylistPlay } from '@mui/icons-material'
import SubscriptionInfo from './SubscriptionInfo'
import SidebarItem from './SidebarItem'

const Sidebar: FC = () => {
  return (
    <Box
      style={{
        width: '280px',
        backgroundColor: '#1c1c1c',
        color: '#fff',
        height: '100vh',
        padding: '10px'
      }}
    >
      <SubscriptionInfo />

      <Divider sx={{ backgroundColor: '#444' }} />

      <List component="nav">
        <SidebarItem primary="Ваши данные">
          <ListItem button sx={{ pl: 4 }}>
            <ListItemIcon>
              <Avatar />
            </ListItemIcon>
            <ListItemText primary="Профиль" />
          </ListItem>
        </SidebarItem>

        <SidebarItem primary="Просмотр">
          <ListItem button sx={{ pl: 4 }}>
            <ListItemIcon>
              <Movie />
            </ListItemIcon>
            <ListItemText primary="Фильмы" />
          </ListItem>
          <ListItem button sx={{ pl: 4 }}>
            <ListItemIcon>
              <Tv />
            </ListItemIcon>
            <ListItemText primary="Сериалы" />
          </ListItem>
          <ListItem button sx={{ pl: 4 }}>
            <ListItemIcon>
              <Search />
            </ListItemIcon>
            <ListItemText primary="Поиск" />
          </ListItem>
        </SidebarItem>

        <SidebarItem primary="Ознакомиться">
          <ListItem button sx={{ pl: 4 }}>
            <ListItemIcon>
              <NewReleases />
            </ListItemIcon>
            <ListItemText primary="Последние Трейлеры" />
          </ListItem>
          <ListItem button sx={{ pl: 4 }}>
            <ListItemIcon>
              <Info />
            </ListItemIcon>
            <ListItemText primary="Новости" />
          </ListItem>
        </SidebarItem>

        <SidebarItem primary="Списки">
          <ListItem button sx={{ pl: 4 }}>
            <ListItemIcon>
              <Movie />
            </ListItemIcon>
            <ListItemText primary="Список к просмотру" />
          </ListItem>
          <ListItem button sx={{ pl: 4 }}>
            <ListItemIcon>
              <PlaylistPlay />
            </ListItemIcon>
            <ListItemText primary="Список просмотренного" />
          </ListItem>
        </SidebarItem>
      </List>
    </Box>
  )
}

export default Sidebar
