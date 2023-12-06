import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { TextField, Button, Typography, Box, Paper, Grid } from '@mui/material'

import { updateUser, fetchUsers } from '../../redux/slices/users/userSlice'
import { AppDispatch, RootState } from '../../redux/store'

function UserProfile() {
  const dispatch = useDispatch<AppDispatch>()
  const userData = useSelector((state: RootState) => state.users.userData)
  const [editedUser, setEditedUser] = useState({ id: 0, firstName: '', lastName: '' })
  const [firstNameError, setFirstNameError] = useState('')
  const [lastNameError, setLastNameError] = useState('')

  useEffect(() => {
    if (userData) {
      setEditedUser(userData)
    }
    dispatch(fetchUsers())
  }, [userData, dispatch])

  const handleSave = () => {
    // Reset validation errors
    setFirstNameError('')
    setLastNameError('')

    // Validate first name
    if (editedUser.firstName.length < 2) {
      setFirstNameError('First name must be at least 2 characters long.')
      return
    }

    // Validate last name
    if (editedUser.lastName.length < 2) {
      setLastNameError('Last name must be at least 2 characters long.')
      return
    }

    dispatch(updateUser(editedUser))
  }

  return (
    <Box
      style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}
      display="flex"
      justifyContent="center"
      alignItems="center"
      padding={5}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h5" component="h1" gutterBottom>
              Edit User Profile
            </Typography>
            <br></br>
            <TextField
              label="First Name"
              fullWidth
              value={editedUser.firstName}
              onChange={(e) => setEditedUser({ ...editedUser, firstName: e.target.value })}
            />
            {firstNameError && (
              <Typography variant="body2" color="error">
                {firstNameError}
              </Typography>
            )}
            <br></br> <br></br>
            <TextField
              label="Last Name"
              fullWidth
              value={editedUser.lastName}
              onChange={(e) => setEditedUser({ ...editedUser, lastName: e.target.value })}
            />
            {lastNameError && (
              <Typography variant="body2" color="error">
                {lastNameError}
              </Typography>
            )}
            <br></br> <br></br>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save
            </Button>
          </Paper>
        </Grid>
        {userData && (
          <Grid item xs={12} sm={6}>
            <Paper elevation={3} style={{ padding: '20px' }}>
              <Typography variant="h5" component="h1" gutterBottom>
                User Information
              </Typography>
              <br></br>
              <Typography variant="body1">First Name: {userData.firstName}</Typography>
              <Typography variant="body1">Last Name: {userData.lastName}</Typography>
              <Typography variant="body1">Email: {userData.email}</Typography>
              <Typography variant="body1">Role: {userData.role}</Typography>
              <Typography variant="body1">Is Banned: {userData.isBanned ? 'Yes' : 'No'}</Typography>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Box>
  )
}

export default UserProfile
