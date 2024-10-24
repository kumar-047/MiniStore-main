import { apiSlice } from "./apiSlice";
const ADMIN_URL= '/api/admin'
const PRODUCT_URL='/api/products'

const adminApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register:builder.mutation({
            query:(data)=>({
                url:`${ADMIN_URL}/register`,
                method:'POST',
                body:data
                }),
            }),
            login:builder.mutation({
                query:(data)=>({
                    url:`${ADMIN_URL}/login`,
                    method:'POST',
                    body:data,

                }),
            }),
            updateAdmin:builder.mutation({
                query:(data)=>({
                    url:`${ADMIN_URL}/profile/${data.id}`,
                    method:'PUT',
                    body:data.body
                }),
            }),

            productAdd:builder.mutation({
               query:(data)=>({
                url:`${PRODUCT_URL}/addproduct`,
                method:'POST',
                body:data,
               }),
            }),

            fetchProducts:builder.query({
                query:()=>({
                    url:`${PRODUCT_URL}/getproducts`,
                    method:'GET',
                    }),
                    
            }),

            deleteProduct:builder.mutation({
                query:(id)=>({
                    url:`${PRODUCT_URL}/deleteproduct/${id}`,
                    method: 'DELETE',
                    }),
                    }),
            
                    updateProduct: builder.mutation({
                        query: ({ id, data }) => ({
                          url: `${PRODUCT_URL}/updateProduct/${id}`,
                          method: 'PUT',
                          body: data,
                        }),
                      }),

                      fetchCustomers:builder.query({
                        query:()=>({
                            url:`${ADMIN_URL}/getcustomers`,
                            method:'GET',
                            }),
                            
                    }),

                    fetchOrders:builder.query({
                        query:()=>({
                            url:`${ADMIN_URL}/getorders`,
                            method:'GET',
                            }),
                            
                    }),


        })
})

export const {
    useRegisterMutation,
    useLoginMutation,
    useUpdateAdminMutation,
    useProductAddMutation,
    useFetchProductsQuery,
    useDeleteProductMutation,
    useUpdateProductMutation,
    useFetchCustomersQuery,
    useFetchOrdersQuery,



}= adminApiSlice
