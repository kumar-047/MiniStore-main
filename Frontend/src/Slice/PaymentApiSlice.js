import { apiSlice } from "./apiSlice";
const PAYMENT_URL = '/api/payment'

const paymentApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        createPayment:builder.mutation({
            query:(data)=>({
                url:`${PAYMENT_URL}/createpayment`,
                method:'POST',
                body:data,
            }),

        }),
        createOrder:builder.mutation({
            query:(data)=>({
                url:`${PAYMENT_URL}//createorder`,
                method:'POST',
                body:data,
                }),
        })
    }),
})

export const { 
    useCreatePaymentMutation,
    useCreateOrderMutation,
 }=paymentApiSlice