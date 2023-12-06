import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  Typography,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  IconButton,
  Box,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Divider,
  TablePagination,
  Alert
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import BlockIcon from '@mui/icons-material/BlockOutlined'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import AddIcon from '@mui/icons-material/Add'

import { AppDispatch, RootState } from '../../redux/store'
import { deleteUser, fetchUsers, banUser, addUser } from '../../redux/slices/users/userSlice'

const ManageUsers = () => {
  const { users, isLoading, error } = useSelector((state: RootState) => state.users)
  const dispatch = useDispatch<AppDispatch>()

  const [isDialogOpen, setDialogOpen] = useState(false)

  const openDialog = () => {
    setDialogOpen(true)
  }

  const closeDialog = () => {
    setDialogOpen(false)
  }

  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: 'visitor',
    isBanned: false
  })

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [addUserError, setAddUserError] = useState(''); // State for error message


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target
    setNewUser({
      ...newUser,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  const handleAddUser = () => {
    if (!newUser.firstName || !newUser.lastName || !newUser.email) {
      setAddUserError('Please fill out all required fields.');
      return;
    }
    dispatch(addUser(newUser))
    closeDialog()
  }
 
  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  const handleDelete = (id: number) => {
    dispatch(deleteUser(id))
  }

  const handleBan = (id: number) => {
    dispatch(banUser(id))
  }

  if (isLoading) {
    return <p>Loading the Users ...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  const startIndex = page * rowsPerPage
  const endIndex = startIndex + rowsPerPage

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <div>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h4" component="h1" gutterBottom>
            Manage Users
          </Typography>
          <Fab color="primary" aria-label="add" onClick={openDialog}>
            <AddIcon />
          </Fab>
        </Box>
        <br />
        <Divider />

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Banned</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.slice(startIndex, endIndex).map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    {user.firstName} {user.lastName}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.isBanned ? 'Yes' : 'No'}</TableCell>
                  <TableCell>
                    <IconButton color="error" onClick={() => handleDelete(user.id)}>
                      <DeleteIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleBan(user.id)}>
                      {user.isBanned ? <RemoveCircleOutlineIcon /> : <BlockIcon />}
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10))
            setPage(0)
          }}
        />
      </div>

      <Dialog open={isDialogOpen} onClose={closeDialog} fullWidth maxWidth="sm">
        <DialogTitle>Add User</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              label="First Name"
              name="firstName"
              value={newUser.firstName}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Last Name"
              name="lastName"
              value={newUser.lastName}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Email"
              name="email"
              value={newUser.email}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
            />
           {addUserError && <Alert severity="error">{addUserError}</Alert>} 

            <Button variant="contained" color="primary" onClick={handleAddUser} fullWidth>
              Add User
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  )
}

export default ManageUsers
