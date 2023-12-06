import * as React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import {
  styled,
  useTheme,
  Theme,
  CSSObject,
  ThemeProvider,
  createTheme
} from '@mui/material/styles'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import CssBaseline from '@mui/material/CssBaseline'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import LogoutIcon from '@mui/icons-material/Logout'
import Inventory2Icon from '@mui/icons-material/Inventory2'
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn'
import GroupIcon from '@mui/icons-material/Group'
import HomeIcon from '@mui/icons-material/Home'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { Badge } from '@mui/material'

import { AppDispatch, RootState } from '../redux/store'
import { logout } from '../redux/slices/users/userSlice'
import Header from './Home/Header'
import { CartState } from '../redux/slices/cart/cartSlice'

const drawerWidth = 240

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  })
}))

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}))

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end'
}))

export default function PersistentDrawerLeft({ children }) {
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const { isLoggedIn, userData } = useSelector((state: RootState) => state.users)
  const cart = useSelector((state: { cart: CartState }) => state.cart)

  // Calculate the total number of products in the cart
  const totalProductsInCart = cart.cart.reduce((total, cartItem) => total + cartItem.quantity, 0)

  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout(logout))
    navigate('/login')
  }

  const customTheme = createTheme({
    ...theme,
    palette: {
      ...theme.palette,
      primary: {
        main: '#000'
      }
    }
  })
  return (
    <>
      {isLoggedIn ? (
        <ThemeProvider theme={customTheme}>
          <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  sx={{ mr: 2, ...(open && { display: 'none' }) }}>
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                  Hello {isLoggedIn ? userData?.firstName : ''}!
                </Typography>
              </Toolbar>
            </AppBar>
            <Drawer
              sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                  width: drawerWidth,
                  boxSizing: 'border-box'
                }
              }}
              variant="persistent"
              anchor="left"
              open={open}>
              <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                  {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
              </DrawerHeader>
              <Divider />
              <List>
                {isLoggedIn && userData?.role === 'admin'
                  ? [
                      { text: 'Home', icon: <HomeIcon />, link: '/' },
                      {
                        text: 'Management',
                        icon: <Inventory2Icon />,
                        link: '/dashboard/Admin/Manage'
                      },
                      {
                        text: 'Orders',
                        icon: <AssignmentTurnedInIcon />,
                        link: '/dashboard/Admin/ManageOrders'
                      },
                      { text: 'Users', icon: <GroupIcon />, link: '/dashboard/Admin/ManageUsers' }
                    ].map((item, index) => (
                      <ListItem key={item.text} disablePadding>
                        <ListItemButton component={Link} to={item.link}>
                          <ListItemIcon>{item.icon}</ListItemIcon>
                          <ListItemText primary={item.text} />
                        </ListItemButton>
                      </ListItem>
                    ))
                  : isLoggedIn && userData?.role === 'visitor'
                  ? [
                      { text: 'Home', icon: <HomeIcon />, link: '/' },
                      {
                        text: 'My Profile',
                        icon: <AccountCircleIcon />,
                        link: '/dashboard/visitor/UserProfile'
                      },
                      { text: 'Products', icon: <Inventory2Icon />, link: '/categories' },
                      {
                        text: 'User Cart',
                        icon: (
                          <Badge badgeContent={totalProductsInCart} color="secondary">
                            <ShoppingCartIcon />
                          </Badge>
                        ),
                        link: '/UserCart'
                      }
                    ].map((item, index) => (
                      <ListItem key={item.text} disablePadding>
                        <ListItemButton component={Link} to={item.link}>
                          <ListItemIcon>{item.icon}</ListItemIcon>
                          <ListItemText primary={item.text} />
                        </ListItemButton>
                      </ListItem>
                    ))
                  : null}
                {isLoggedIn ? (
                  <ListItem key="Logout" disablePadding>
                    <ListItemButton onClick={handleLogout}>
                      <ListItemIcon>
                        <LogoutIcon />
                      </ListItemIcon>
                      <ListItemText primary="Logout" />
                    </ListItemButton>
                  </ListItem>
                ) : null}
              </List>
            </Drawer>
            <Main open={open}>{children}</Main>
          </Box>
        </ThemeProvider>
      ) : (
        <>
          <Header />
          <Box>{children}</Box>
        </>
      )}
    </>
  )
}
