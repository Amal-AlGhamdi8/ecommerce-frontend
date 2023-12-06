// categoriesSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../../api'

export interface Category {
  id: number
  name: string
  image: string
}

export interface CategoriesState {
  categories: Category[]
  error: null | string
  isLoading: boolean
  singleCategory: Category
}

const initialCategory: Category = {
  id: 0,
  name: '',
  image: ''
}

const initialState: CategoriesState = {
  categories: [],
  error: null,
  isLoading: false,
  singleCategory: initialCategory
}

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  try {
    const response = await api.get('/mock/e-commerce/categories.json')
    return response.data
  } catch (error) {
    throw error
  }
})

const categorieSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    findCategoryById: (state, action) => {
      const id = action.payload
      const foundCategory = state.categories.find((category) => category.id === id)
      if (foundCategory) {
        state.singleCategory = foundCategory
      }
    },
     addCategory: (state, action) => {
      // Add the new category to the state
      state.categories.push(action.payload);
    },
    removeCategory: (state, action) => {
      // Remove the category from the state
      const categoryId = action.payload;
      state.categories = state.categories.filter((category) => category.id !== categoryId);
    },
    editCategory: (state, action) => {
      // Edit the category in the state
      const editedCategory = action.payload;
      const index = state.categories.findIndex((category) => category.id === editedCategory.id);
      if (index !== -1) {
        state.categories[index] = editedCategory;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload
        state.isLoading = false
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.isLoading = false
        state.error = 'error we can not fech Data'
      })
  }
})

export const { findCategoryById, addCategory, removeCategory, editCategory } = categorieSlice.actions

export default categorieSlice.reducer
