import { apiSlice } from "./apiSlice";

const CART_URL = '/api/cart'

const cartApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addToCart:builder.mutation({
            query:(data)=>({
                url:`${CART_URL}/add`,
                method:'POST',
                body:data,
            })
        }),
        removeFromCart:builder.mutation({
            query:({ userId, productId })=>({
                url:`${CART_URL}/remove/${userId}/${productId}`,
                method:'POST',
                body:{ userId, productId },
            })
        }),
        fetchCart:builder.query({
            query:(userId)=>`${CART_URL}/${userId}`
        }),

        }),
    })
export const { 
    useAddToCartMutation,
    useRemoveFromCartMutation,
    useFetchCartQuery,
 }=cartApiSlice
