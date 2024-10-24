import { apiSlice } from "./apiSlice";
const USERS_URL='/api/user'
const ORDERS_URL='/api/payment'

export const UserApiSlice =apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: 'POST',
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/register`,
        method:'POST',
        body: data,
        }),
      }),
      updateUser:builder.mutation({
        query: (data) => ({
          url: `${USERS_URL}/profile/${data.id}`,
          method: 'PUT',
          body: data.body,
          }),
      }),
      fetchProducts:builder.query({
        query:()=>({
            url:`${USERS_URL}/getproducts`,
            method:'GET',
            }),  
            }),

            fetchProductById:builder.query({
              query:(productId)=>({
                url:`${USERS_URL}/fetchproduct/${productId}`,
                method:'GET',
              }),
             }),

             fetchOrders:builder.query({
              query:(userId)=>`${ORDERS_URL}/${userId}`
          }),

  }),
})

export const { 
  useLoginMutation,
  useRegisterMutation,
  useUpdateUserMutation,
  useFetchProductsQuery,
  useFetchProductByIdQuery,
  useFetchOrdersQuery,


 } = UserApiSlice