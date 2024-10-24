import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slice/authSlice";
import cartReducer from "./Slice/cartSlice"
import { apiSlice } from "./Slice/apiSlice";

const store = configureStore({
    reducer:{
        cart:cartReducer,
        auth:authReducer,
        [apiSlice.reducerPath]:apiSlice.reducer
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true,
})
export default store;