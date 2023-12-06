// orderSlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../../api';

type Order = {
  id: number;
  productId: number;
  userId: number;
  purchasedAt: string;
};

type OrderState = {
  orders: Order[];
  isLoading: boolean;
  error: string | null;
};

const initialState: OrderState = {
  orders: [],
  isLoading: false,
  error: null,
};


// Create async thunk action to fetch orders
export const fetchOrders = createAsyncThunk('users/fetchOrders', async () => {
    try {
      const response = await api.get('/mock/e-commerce/orders.json')
      return response.data
    } catch (error) {
      console.error('Error fetching orders: ', error)
      throw error
    }
  })

  const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchOrders.pending, (state) => {
          state.isLoading = true
        })
        .addCase(fetchOrders.fulfilled, (state, action) => {
          state.orders = action.payload
          state.isLoading = false
        })
        .addCase(fetchOrders.rejected, (state) => {
          state.isLoading = false
          state.error = 'error we can not fech Data'
        })
    }
  })
  
//  export const { fetchOrders } = categorieSlice.actions
  
  export default orderSlice.reducer;
