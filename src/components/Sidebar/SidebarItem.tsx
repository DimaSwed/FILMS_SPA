// 'use client'

// import { FC, useState } from 'react'
// import { ListItem, ListItemText, Collapse, List } from '@mui/material'
// import { ExpandLess, ExpandMore } from '@mui/icons-material'

// interface SidebarItemProps {
//   primary: string
//   children: React.ReactNode
// }

// const SidebarItem: FC<SidebarItemProps> = ({ primary, children }) => {
//   const [open, setOpen] = useState(false)

//   const handleClick = () => {
//     setOpen(!open)
//   }

//   return (
//     <>
//       <ListItem button onClick={handleClick}>
//         <ListItemText primary={primary} />
//         {open ? <ExpandLess /> : <ExpandMore />}
//       </ListItem>
//       <Collapse in={open} timeout="auto" unmountOnExit>
//         <List component="div" disablePadding>
//           {children}
//         </List>
//       </Collapse>
//     </>
//   )
// }

// export default SidebarItem
'use client'

import { FC, useState } from 'react'
import { ListItem, ListItemText, Collapse, List, useMediaQuery, useTheme } from '@mui/material'
import { ExpandLess, ExpandMore } from '@mui/icons-material'

interface SidebarItemProps {
  primary: string
  children: React.ReactNode
}

const SidebarItem: FC<SidebarItemProps> = ({ primary, children }) => {
  const [open, setOpen] = useState(false)
  const theme = useTheme()
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'))

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <>
      {isMdUp && (
        <ListItem button onClick={handleClick}>
          <ListItemText primary={primary} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
      )}
      <Collapse in={open || !isMdUp} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {children}
        </List>
      </Collapse>
    </>
  )
}

export default SidebarItem
