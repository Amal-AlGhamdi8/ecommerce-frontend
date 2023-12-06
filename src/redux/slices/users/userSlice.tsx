import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../../api'

export type User = {
  id: number
  firstName: string
  lastName: string
  email: string
  password: string
  role: string
  isBanned: boolean
}
export type UsersState = {
  users: User[]
  error: null | string
  isLoading: boolean
  isLoggedIn: boolean
  userData: User | null
  isBanned: boolean
}

export const fetchUsers = createAsyncThunk('users/fetchCategories', async () => {
  try {
    const response = await api.get('/mock/e-commerce/users.json')
    return response.data
  } catch (error) {
    console.error('Error fetching users: ', error)
    throw error
  }
})

const data =
  localStorage.getItem('loginData') !== null
    ? JSON.parse(String(localStorage.getItem('loginData')))
    : []

const initialState: UsersState = {
  users: [],
  error: null,
  isLoading: false,
  isLoggedIn: data.isLoggedIn,
  userData: data.userData,
  isBanned: false
}
const UsersReducer = createSlice({
  name: 'User',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true
      state.userData = action.payload
      localStorage.setItem(
        'loginData',
        JSON.stringify({
          isLoggedIn: state.isLoggedIn,
          userData: state.userData
        })
      )
    },
    logout: (state, action) => {
      state.isLoggedIn = false
      state.userData = action.payload
      localStorage.setItem(
        'loginData',
        JSON.stringify({
          isLoggedIn: state.isLoggedIn,
          userData: state.userData
        })
      )
    },
    deleteUser: (state, action) => {
      const filterUsers = state.users.filter((user) => user.id !== action.payload)
      state.users = filterUsers
    },
    banUser: (state, action) => {
      const userId = action.payload
      const userToBan = state.users.find((user) => user.id === userId)
      if (userToBan) {
        userToBan.isBanned = true
      }
    },
    addUser: (state, action) => {
      // Calculate the next available ID
      const nextId = state.users.length > 0 ? state.users[state.users.length - 1].id + 1 : 1
      // Add the new user with the calculated ID
      state.users.push({ ...action.payload, id: nextId })
    },
    updateUser: (state, action) => {
      const { id, firstName, lastName, email } = action.payload
      const foundUser = state.users.find((user) => user.id === id)
      if (foundUser) {
        foundUser.firstName = firstName
        foundUser.lastName = lastName
        foundUser.email = email
        state.userData = foundUser
        localStorage.setItem(
          'signInData',
          JSON.stringify({ isLoggedIn: state.isLoggedIn, userData: state.userData })
        )
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload
        state.isLoading = false
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.isLoading = false
        state.error = 'error we can not fech Data'
      })
  }
})
export const { login, logout, deleteUser, addUser, updateUser, banUser } = UsersReducer.actions
export default UsersReducer.reducer
