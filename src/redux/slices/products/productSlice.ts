//productSlice.tsx
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import api from '../../../api'

export type Product = {
  id: number
  name: string
  image: string
  description: string
  categories: number[]
  variants: string[]
  sizes: string[]
  price: number
}

export type ProductState = {
  categories: any
  products: Product[]
  error: null | string
  isLoading: boolean
  searchTerm: string
  singleProduct: Product
  currentPage: number
  itemsPerPage: number
}

const initialProduct: Product = {
  id: 0,
  name: '',
  image: '',
  description: '',
  categories: [],
  variants: [],
  sizes: [],
  price: 0
}

const initialState: ProductState = {
  products: [],
  error: null,
  isLoading: false,
  searchTerm: '',
  singleProduct: initialProduct,
  currentPage: 1,
  itemsPerPage: 5,
  categories: undefined,
}

export const fetchProducts = createAsyncThunk('Products/fetchProducts', async () => {
  try {
    const response = await api.get('/mock/e-commerce/products.json')
    return response.data
  } catch (error) {
    console.error('Error fetching products: ', error)
  }
})

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload
    },
    findProductById: (state, action) => {
      const id = action.payload
      const foundProduct = state.products.find((product) => product.id === id)
      if (foundProduct) {
        state.singleProduct = foundProduct
      }
    },
    productsRequest: (state) => {
      state.isLoading = true
    },
    productsSuccess: (state, action) => {
      state.isLoading = false
      state.products = action.payload
    },
    searchProducts: (state, action) => {
      state.searchTerm = action.payload
    },

    sortProducts: (state, action) => {
      const sortingCriteria = action.payload
      if (sortingCriteria === 'AscendingPrice') {
        state.products.sort((a, b) => a.price - b.price)
      } else if (sortingCriteria === 'DescendingPrice') {
        state.products.sort((a, b) => b.price - a.price)
      } else if (sortingCriteria === 'A-Z') {
        state.products.sort((a,b) => a.name.localeCompare(b.name));
        } else if (sortingCriteria === 'Z-A') {
          state.products.sort((a,b) => b.name.localeCompare(a.name)); }
    },
    addProduct: (state, action: { payload: { product: Product } }) => {
      // let's append the new product to the beginning of the array
      state.products = [action.payload.product, ...state.products]
    },
    removeProduct: (state, action: { payload: { productId: number } }) => {
      const filteredItems = state.products.filter(
        (product) => product.id !== action.payload.productId
      )
      state.products = filteredItems
    },
    editProduct: (state, action) => {
      const editedProduct = action.payload.product;
      const index = state.products.findIndex((product) => product.id === editedProduct.id);
      if (index !== -1) {
        state.products[index] = editedProduct;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false
        state.products = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'An error occurred while fetching products'
      })
  }
})
export const {
  removeProduct,
  addProduct,
  editProduct,
  productsRequest,
  productsSuccess,
  sortProducts,
  searchProducts,
  findProductById,
  setPage
} = productSlice.actions

export default productSlice.reducer
