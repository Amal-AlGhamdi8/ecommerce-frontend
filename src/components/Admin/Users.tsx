import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, RootState } from '../../redux/store'
import { deleteUser, banUser, fetchUsers } from '../../redux/slices/users/userSlice'

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material'

const Users = () => {
  const { users, isLoading, error } = useSelector((state: RootState) => state.users)
  const dispatch = useDispatch<AppDispatch>()
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
  const [isBanDialogOpen, setBanDialogOpen] = useState(false)

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  const handleDelete = (id: number) => {
    dispatch(deleteUser(id))
  }

  const handleBan = (id: number) => {
    setSelectedUserId(id)
    setBanDialogOpen(true)
  }

  const handleConfirmBan = () => {
    if (selectedUserId !== null) {
      dispatch(banUser(selectedUserId))
      setSelectedUserId(null)
      setBanDialogOpen(false)
    }
  }

  const handleCancelBan = () => {
    setSelectedUserId(null)
    setBanDialogOpen(false)
  }

  if (isLoading) {
    return <p>Loading the Users...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <div>
      <h1 className="flex justify-center">All The users</h1>

      <div className="usersContainer flex justify-center m-12 space-x-3">
        {users.length > 0 &&
          users.map((user) => {
            return (
              <article key={user.id}>
                <h2>{user.firstName}</h2>
                <h2>{user.lastName}</h2>
                <p>{user.email}</p>
                <p>{user.role}</p>
                <Button
                  variant="contained"
                  size="small"
                  color="error"
                  onClick={() => handleDelete(user.id)}>
                  Remove User
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  color="error"
                  onClick={() => handleBan(user.id)}>
                  Ban User
                </Button>
              </article>
            )
          })}
      </div>

      <Dialog open={isBanDialogOpen} onClose={handleCancelBan}>
        <DialogTitle>Confirm Ban</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to ban this user?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelBan} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmBan} color="error">
            Ban
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Users
