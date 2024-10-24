import React from 'react'
import UserNavbar from './UserNavbar';
import Footer from './Footer';
import { useSelector } from 'react-redux';
import {   useFetchOrdersQuery } from "../Slice/UserApiSlice"

const Order = () => {
    const {userInfo}=useSelector((state)=>state.auth)
    const { data: orders = [], isLoading, error } = useFetchOrdersQuery(userInfo._id);
    if (isLoading) {
        return <div>Loading...</div>;
      }
      if (error) {
        return <div>Error loading orders: {error.message}</div>;
      } 
    return (
    <div>
         <UserNavbar />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
        <table className="w-full text-sm text-left rtl:text-right ">
          <thead className="text-sm bg-slate-400 text-black">
            <tr>
              <th scope="col" className="px-6 py-3">
                Customer Name
              </th>
              <th scope="col" className="px-6 py-3">
                Customer Phone
              </th>
              <th scope="col" className="px-6 py-3">
                Customer Address
              </th>
              <th scope="col" className="px-6 py-3">
                Products
              </th>
              <th scope="col" className="px-6 py-3">
                Amount 
              </th>
              <th scope="col" className="px-6 py-3">
                Delivery Date
              </th>   
            </tr>
          </thead>
          <tbody>
          {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id} className="bg-gray-100 border-b hover:bg-gray-200">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {order.customerName}
                  </th>
                  <td className="px-6 py-4">{order.customerPhone}</td>
                  <td className="px-6 py-4">{order.customerAddress}</td>
                  <td className="px-6 py-4">
                    {order.products.map((product) => (
                      <div key={product.productId}>
                        {product.productName} (Qty: {product.quantity})
                      </div>
                    ))}
                  </td>
                  <td className="px-6 py-4">${order.amount}</td>
                  <td className="px-6 py-4">
                  {new Date(order.deliveryDate).toLocaleDateString('en-GB')}
                    </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center px-6 py-4">No orders found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  )
}

export default Order
