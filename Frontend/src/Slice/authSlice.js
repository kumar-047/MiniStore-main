import { createSlice } from "@reduxjs/toolkit";

// Correcting the typo in initialState
const initialState = {
  userInfo: localStorage.getItem('userInfo') !== 'undefined'
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
  token: localStorage.getItem('accessToken') || null,
  searchTerm: '', // Correct state definition
};

const authSlice = createSlice({
  name: 'auth',
  initialState,  // Corrected here
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.userInfo = user;
      state.token = token;
      if (user) {
        localStorage.setItem('userInfo', JSON.stringify(user));
      } else {
        localStorage.removeItem('userInfo');
      }
      localStorage.setItem('accessToken', token);
    },
    clearCredentials: (state) => {
      state.userInfo = null;
      state.token = null;
      localStorage.removeItem('userInfo');
      localStorage.removeItem('accessToken');

    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  
  },
});

export const { setCredentials, clearCredentials, setSearchTerm} = authSlice.actions;
export default authSlice.reducer;
