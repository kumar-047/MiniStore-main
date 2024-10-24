// src/Slice/CartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const calculateTotals = (cartItems) => {
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  const totalAmount = cartItems.reduce((total, item) => {
    const price = parseFloat(item.productPrice); // Ensure this is a number
    const quantity = item.quantity || 0; // Fallback to 0 if quantity is undefined
    return total + (price * quantity); // Calculate total amount
  }, 0);
  
  return { totalQuantity, totalAmount };
};


const initialState = {
  cartItems: [],  // Initially empty; will be populated from the backend
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart(state, action) {
      state.cartItems = action.payload;
      const { totalQuantity, totalAmount } = calculateTotals(state.cartItems);
      state.totalQuantity = totalQuantity;
      state.totalAmount = totalAmount;
      console.log('Updated Cart State:', state);
      console.log('Total Quantity:', totalQuantity);
      console.log('Total Amount:', totalAmount);
    },
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(item => item.productId === newItem.productId);

      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.productPrice;
      } else {
        state.cartItems.push({
          ...newItem,
          quantity: 1, // New item starts with 1 quantity
          totalPrice: newItem.productPrice,
        });
      }

      const { totalQuantity, totalAmount } = calculateTotals(state.cartItems);
      state.totalQuantity = totalQuantity;
      state.totalAmount = totalAmount;
    },
    removeFromCart(state, action) {
      const productId = action.payload;
      state.cartItems = state.cartItems.filter(item => item.productId !== productId);

      const { totalQuantity, totalAmount } = calculateTotals(state.cartItems);
      state.totalQuantity = totalQuantity;
      state.totalAmount = totalAmount;
    },
  },
});

export const { setCart, addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
