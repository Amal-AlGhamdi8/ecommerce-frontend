import { configureStore } from '@reduxjs/toolkit'

import productsReducer from './slices/products/productSlice'
import UsersReducer from './slices/users/userSlice'
import categoriesReducer from './slices/categories/categorieSlice'
import ordersReducer from './slices/orders/orderSlice'
import cartReducer from './slices/cart/cartSlice'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    users: UsersReducer,
    categories: categoriesReducer,
    orders: ordersReducer,
    cart: cartReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
