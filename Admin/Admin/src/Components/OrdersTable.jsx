import React from 'react'
import {  useFetchOrdersQuery } from '../Slice/AdminApiSlice'

const OrdersTable = () => {
    const { data: orders, error, isLoading } = useFetchOrdersQuery();

    if (isLoading) return <p>Loading orders...</p>;
    if (error) return <p>Error loading orders</p>;
  return (
    <div>
        <h1 className='text-black font-bold text-2xl mb-5 underline'>Orders Table</h1>
        

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-h-80"> 
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Customer Name
                </th>
                <th scope="col" class="px-6 py-3">
                    Customer Phone
                </th>
                <th scope="col" class="px-6 py-3">
                    Customer Address
                </th>
                <th scope="col" class="px-6 py-3">
                  Products
                </th>
                <th scope="col" class="px-6 py-3">
                  Transaction ID
                </th>
                <th scope="col" class="px-6 py-3">
                  Amount
                </th>
                <th scope="col" class="px-6 py-3">
                  Delivery Date
                </th>
            </tr>
        </thead>
        <tbody>
        {orders?.map((order) => (
                            <tr key={order._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {order.customerName} {/* Assuming order has customerName property */}
                                </td>
                                <td className="px-6 py-4">
                                    {order.customerPhone} {/* Assuming order has customerPhone property */}
                                </td>
                                <td className="px-6 py-4">
                                    {order.customerAddress} {/* Assuming order has customerAddress property */}
                                </td>
                                <td className="px-6 py-4">
                                    {order.products?.map((product) => (
                                        <div key={product._id}>
                                            {product.productName} ({product.quantity})
                                        </div>
                                    ))}
                                </td>
                                <td className="px-6 py-4">
                                    {order.transactionId} 
                                </td>
                                <td className="px-6 py-4">
                                    ${order.amount} 
                                </td>
                                <td className="px-6 py-4">
                                {new Date(order.deliveryDate).toLocaleDateString('en-GB')}
                                </td>
                            </tr>
                        ))}
            
        </tbody>
    </table>
</div>

      
    </div>
  )
}

export default OrdersTable 
