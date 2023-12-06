import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import LockIcon from '@mui/icons-material/Lock'
import {
  Alert,
  Box,
  Button,
  Container,
  Paper,
  TextField,
  ThemeProvider,
  Typography
} from '@mui/material'

import { AppDispatch, RootState } from '../../redux/store'
import { User, fetchUsers, login } from '../../redux/slices/users/userSlice'
import theme from '../../styles/theme'

export const Login = ({ pathName }: { pathName: string }) => {
  const { users } = useSelector((state: RootState) => state.users)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  const navigate = useNavigate()
  const [user, setUser] = useState({
    email: '',
    password: ''
  })
  const [loginError, setLoginError] = useState<string | null>(null)

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Clear the error message when the user starts typing
    setLoginError(null)

    setUser((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value }
    })
  }

  const handleLogin = (foundUser: User) => {
    dispatch(login(foundUser))
    navigate(pathName ? pathName : `/dashboard/${foundUser.role}`)
  }

  const handleLoginSubmit = async (event: FormEvent) => {
    event.preventDefault()
    try {
      const foundUser = users.find((userData) => userData.email === user.email)

      if (foundUser) {
        if (foundUser.password === user.password) {
          // Successful login
          handleLogin(foundUser)
        } else {
          // Incorrect password
          setLoginError('Password is incorrect. Please try again.')
        }
      } else {
        // User does not exist
        setLoginError('User with this email does not exist.')
      }
    } catch (error) {
      console.log(error)
    }

    setUser({
      email: '',
      password: ''
    })
  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          paddingTop: '50px'
        }}>
        <Container component="main" maxWidth="xs">
          <Paper
            elevation={3}
            style={{
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
            <LockIcon style={{ fontSize: '48px' }} />

            <Typography component="h1" variant="h5">
              Login
            </Typography>
            {loginError && <Alert severity="error">{loginError}</Alert>}

            <form style={{ width: '100%', marginTop: '20px' }} onSubmit={handleLoginSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleOnChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleOnChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                style={{ marginTop: '20px' }}>
                Login
              </Button>
            </form>
            <p style={{ marginTop: '20px', marginBottom: '20px' }}>
              Don't have an account?{' '}
              <Link to="/register" style={{ textDecoration: 'none' }}>
                Register
              </Link>
            </p>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default Login
