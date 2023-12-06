import { useDispatch, useSelector } from 'react-redux'
import { useState, ChangeEvent, FormEvent, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { ThemeProvider } from '@mui/material/styles'
import { Container, Paper, Typography, TextField, Button, Box, Alert, Stack } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import theme from '../../styles/theme'

import { addUser, fetchUsers } from '../../redux/slices/users/userSlice'
import { AppDispatch, RootState } from '../../redux/store'

const Register = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const users = useSelector((state: RootState) => state.users.users)

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'visitor',
    isBanned: false
  })

  const [validationMessages, setValidationMessages] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [successMessage, setSuccessMessage] = useState('')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setUser((prevUser) => {
      return { ...prevUser, [name]: value }
    })

    setValidationMessages((prevMessages) => ({
      ...prevMessages,
      [name]: validateField(name, value)
    }))
  }

  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'firstName':
        return value.length < 2 ? `The first name must be at least 2 characters.` : ''
      case 'lastName':
        return value.length < 2 ? `The last name must be at least 2 characters.` : ''
      case 'email':
        return isValidEmail(value) ? '' : 'Please provide a valid email.'
      case 'password':
        return value.length < 6 ? 'Password must be at least 6 characters.' : ''
      case 'confirmPassword':
        return user.password === value ? '' : 'Passwords do not match.'
      default:
        return ''
    }
  }

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    // Check for validation errors
    const fieldNames = ['firstName', 'lastName', 'email', 'password', 'confirmPassword']
    const messages = fieldNames.reduce((acc, name) => {
      const message = validateField(name, user[name])
      return { ...acc, [name]: message }
    }, {})

    if (Object.values(messages).some((message) => message !== '')) {
      setValidationMessages(messages)
      return
    }

    // Check if the user with the same email already exists
    const userExists = users.find((u) => u.email === user.email)
    if (userExists) {
      setValidationMessages({ ...messages, email: 'A user with this email already exists.' })
      return
    }

    const newUser = { id: new Date().getTime(), ...user }

    dispatch(fetchUsers()).then(() => {
      dispatch(addUser(newUser))
      setSuccessMessage('Account created successfully')
      setUser({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'visitor',
        isBanned: false
      })

      setTimeout(() => {
        setSuccessMessage('')
        navigate('/login')
      }, 2000)
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
            <AccountCircleIcon style={{ fontSize: '48px' }} />
            <Typography component="h1" variant="h5">
              Register
            </Typography>
            {successMessage && (
              <Stack spacing={2} sx={{ width: '100%' }}>
                <Alert variant="filled" severity="success">
                  {successMessage}
                </Alert>
              </Stack>
            )}
            <form style={{ width: '100%', marginTop: '20px' }} onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="firstName"
                label="First Name"
                name="firstName"
                autoComplete="firstName"
                value={user.firstName}
                onChange={handleChange}
                error={validationMessages.firstName !== ''}
                helperText={validationMessages.firstName}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lastName"
                value={user.lastName}
                onChange={handleChange}
                error={validationMessages.lastName !== ''}
                helperText={validationMessages.lastName}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="email"
                label="Email Address"
                type="email"
                id="email"
                autoComplete="email"
                value={user.email}
                onChange={handleChange}
                error={validationMessages.email !== ''}
                helperText={validationMessages.email}
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
                autoComplete="new-password"
                value={user.password}
                onChange={handleChange}
                error={validationMessages.password !== ''}
                helperText={validationMessages.password}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="confirmPassword"
                value={user.confirmPassword}
                onChange={handleChange}
                error={validationMessages.confirmPassword !== ''}
                helperText={validationMessages.confirmPassword}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                style={{ marginTop: '20px' }}>
                Register
              </Button>
            </form>
            <p style={{ marginTop: '20px', marginBottom: '20px' }}>
              Already have an account?{' '}
              <Link to="/login" style={{ textDecoration: 'none' }}>
                Login
              </Link>
            </p>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default Register
