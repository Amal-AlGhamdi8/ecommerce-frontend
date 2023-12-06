// cartSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../products/productSlice';

export interface CartProduct extends Product {
  quantity: number;
}

export interface CartState {
  cart: CartProduct[];
}

const loadCartState = (): CartState => {
  try {
    const serializedCartState = localStorage.getItem('cartState');
    if (serializedCartState === null) {
      return { cart: [] };
    }
    return JSON.parse(serializedCartState);
  } catch (error) {
    console.error('Error loading cart state from localStorage:', error);
    return { cart: [] };
  }
};

const initialState: CartState = loadCartState();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartProduct>) => {
      const { id, quantity } = action.payload;
      const existingProduct = state.cart.find((product) => product.id === id);

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        state.cart.push(action.payload);
      }

      // Save cart state to localStorage
      localStorage.setItem('cartState', JSON.stringify(state));
    },
    editCart: (state, action: PayloadAction<CartProduct>) => {
      const { id, quantity } = action.payload;
      const existingProduct = state.cart.find((product) => product.id === id);

      if (existingProduct) {
        existingProduct.quantity = quantity;
      }

      // Save cart state to localStorage
      localStorage.setItem('cartState', JSON.stringify(state));
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.cart = state.cart.filter((product) => product.id !== id);

      // Save cart state to localStorage
      localStorage.setItem('cartState', JSON.stringify(state));
    },
    resetCart: (state) => {
        state.cart = [];
  
        // Save cart state to localStorage
        localStorage.setItem('cartState', JSON.stringify(state));
      },
    
  },
  
});

export const { addToCart, editCart, removeFromCart , resetCart} = cartSlice.actions;

export default cartSlice.reducer;
